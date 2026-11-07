"""Extract the BCON brand artwork as transparent PNGs.

Reads the source artwork and writes two files:

  public/logo-lockup.png  mark + "BCON" + "TECHNOLOGIES"
  public/logo-mark.png    the mark on its own

The square app icons are drawn from the vector mark by
`scripts/generate-icons.mjs` instead, because the raster mark is too small in
the source artwork to fill a 512px icon.

The source is a JPEG on a flat #141A30 canvas — the same colour as the site's
page background. That makes background removal straightforward: alpha comes
from how far each pixel's luminance sits above the background, and the colour is
un-premultiplied so the PNG composites back to the original.

The decorative sparkle in the bottom-right corner is excluded by restricting
the search to the upper band of the canvas.
"""

from __future__ import annotations

import os
import pathlib
import sys

from PIL import Image, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = pathlib.Path(
    os.environ.get(
        "BCON_LOGO_SOURCE",
        r"C:\Users\acer\Downloads\WhatsApp Image 2026-11-06 at 15.52.27.jpeg",
    )
)
LOCKUP_OUT = ROOT / "public" / "logo-lockup.png"
MARK_OUT = ROOT / "public" / "logo-mark.png"

BG = (20, 26, 48)

# The lockup occupies the upper band of the canvas; the sparkle sits below.
LOCKUP_BAND = (0, 360)

# Luminance of the brightest logo pixel, used as the top of the alpha ramp.
REF_LUMA = 210.0
# Below this the pixel is treated as background.
FLOOR_LUMA = 34.0

PAD = 6

# The source artwork is a 512px JPEG and the lockup occupies 374x122 of it, so
# 1:1 is the real resolution. Upscaling past that only interpolates, and the
# header shows the lockup at ~135 CSS px, which a 374px source already covers
# on a 2x display.
SCALE = 1


def luma(r: int, g: int, b: int) -> float:
    return 0.299 * r + 0.587 * g + 0.114 * b


def to_rgba(
    image: Image.Image, box: tuple[int, int, int, int], bg_luma: float
) -> Image.Image:
    """Crops to `box` and converts the pixels to straight-alpha RGBA."""
    left, top, right, bottom = box
    rgba = Image.new("RGBA", (right - left + 1, bottom - top + 1))
    out = rgba.load()
    pixels = image.load()

    for y in range(top, bottom + 1):
        for x in range(left, right + 1):
            r, g, b = pixels[x, y]
            alpha = (luma(r, g, b) - bg_luma) / (REF_LUMA - bg_luma)
            alpha = max(0.0, min(1.0, alpha))

            if alpha <= 0.02:
                out[x - left, y - top] = (0, 0, 0, 0)
                continue

            # Un-premultiply against the known background so the PNG composites
            # back to the original over #141A30.
            inv = 1.0 - alpha
            out[x - left, y - top] = (
                max(0, min(255, round((r - inv * BG[0]) / alpha))),
                max(0, min(255, round((g - inv * BG[1]) / alpha))),
                max(0, min(255, round((b - inv * BG[2]) / alpha))),
                round(alpha * 255),
            )

    # The source is a JPEG, so edges carry compression ringing. Smooth the
    # alpha channel only — that removes the ringing halo without touching the
    # logo's own shading — then upscale with Lanczos.
    smoothed = rgba.getchannel("A").filter(ImageFilter.GaussianBlur(0.6))
    result = rgba.convert("RGB")
    result.putalpha(smoothed)
    return result.resize(
        (result.width * SCALE, result.height * SCALE), Image.LANCZOS
    )


def components(
    image: Image.Image, band: tuple[int, int], floor: float
) -> list[tuple[int, int, int, int, int]]:
    """8-connected components of lit pixels, as (x0, y0, x1, y1, area).

    Labelling beats column profiling here: the mark and the wordmark are only
    two pixels apart, so no gap threshold can separate them. Connected
    components can, because the lettering resolves into individual glyphs.
    """
    band_top, band_bottom = band
    pixels = image.load()
    height = image.height
    width = image.width

    lit = [
        [luma(*pixels[x, y]) > floor for x in range(width)]
        for y in range(height)
    ]

    seen = [[False] * width for _ in range(height)]
    found: list[tuple[int, int, int, int, int]] = []

    for y in range(band_top, min(band_bottom, height)):
        for x in range(width):
            if not lit[y][x] or seen[y][x]:
                continue
            stack = [(x, y)]
            seen[y][x] = True
            x0 = x1 = x
            y0 = y1 = y
            area = 0
            while stack:
                cx, cy = stack.pop()
                area += 1
                x0, x1 = min(x0, cx), max(x1, cx)
                y0, y1 = min(y0, cy), max(y1, cy)
                for ny in range(max(0, cy - 1), min(height, cy + 2)):
                    for nx in range(max(0, cx - 1), min(width, cx + 2)):
                        if lit[ny][nx] and not seen[ny][nx]:
                            seen[ny][nx] = True
                            stack.append((nx, ny))
            found.append((x0, y0, x1, y1, area))

    return found


def wordmark_edge(parts: list[tuple[int, int, int, int, int]]) -> int:
    """Left edge of the lettering, which is where the mark ends.

    The wordmark glyphs share a height and a baseline; the mark does not. The
    most common height among the substantial components therefore identifies
    the lettering, and the leftmost of those glyphs marks the boundary.
    """
    substantial = [p for p in parts if p[4] >= 500]
    if not substantial:
        return 0

    heights = [p[3] - p[1] + 1 for p in substantial]
    modal = max(set(heights), key=heights.count)
    band = [p for p in substantial if 0.8 * modal <= p[3] - p[1] + 1 <= 1.3 * modal]
    if not band:
        return 0
    return min(p[0] for p in band)


def main() -> int:
    if not SOURCE.exists():
        print(f"source logo not found: {SOURCE}", file=sys.stderr)
        return 1

    image = Image.open(SOURCE).convert("RGB")
    width, height = image.size
    pixels = image.load()
    bg_luma = luma(*BG)

    band_top, band_bottom = LOCKUP_BAND

    left, top, right, bottom = width, height, 0, 0
    for y in range(band_top, min(band_bottom, height)):
        for x in range(width):
            if luma(*pixels[x, y]) > FLOOR_LUMA:
                left = min(left, x)
                right = max(right, x)
                top = min(top, y)
                bottom = max(bottom, y)

    if right <= left:
        print("no lockup pixels found", file=sys.stderr)
        return 1

    lockup_box = (
        max(0, left - PAD),
        max(0, top - PAD),
        min(width - 1, right + PAD),
        min(height - 1, bottom + PAD),
    )
    print(f"lockup bbox: {lockup_box}")

    lockup = to_rgba(image, lockup_box, bg_luma)
    LOCKUP_OUT.parent.mkdir(parents=True, exist_ok=True)
    lockup.save(LOCKUP_OUT, optimize=True)
    print(f"wrote {LOCKUP_OUT} ({lockup.width}x{lockup.height})")

    parts = components(image, LOCKUP_BAND, FLOOR_LUMA)
    for part in sorted(parts, key=lambda p: p[0]):
        print(f"  component {part}")

    split = wordmark_edge(parts)
    print(f"wordmark starts at x={split}")
    if split <= 0:
        print("could not locate the wordmark", file=sys.stderr)
        return 1

    mark_parts = [p for p in parts if p[0] < split]
    if not mark_parts:
        print("no mark components found", file=sys.stderr)
        return 1

    mark_left = min(p[0] for p in mark_parts)
    mark_right = max(p[2] for p in mark_parts)
    mark_top = min(p[1] for p in mark_parts)
    mark_bottom = max(p[3] for p in mark_parts)

    # The right edge stops at the wordmark even if padding would cross it,
    # otherwise a sliver of the first letter bleeds into the mark.
    mark_box = (
        max(0, mark_left - PAD),
        max(0, mark_top - PAD),
        min(split - 1, mark_right + PAD),
        min(height - 1, mark_bottom + PAD),
    )
    print(f"mark bbox: {mark_box}")

    mark = to_rgba(image, mark_box, bg_luma)
    mark.save(MARK_OUT, optimize=True)
    print(f"wrote {MARK_OUT} ({mark.width}x{mark.height})")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
