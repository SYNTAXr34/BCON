"""Build a binary mask of the BCON mark from the supplied logo raster.

Reads the source logo, isolates the mark (left of the wordmark), and writes a
black-and-white PNG that potrace can vectorise.

Run with a Python that has Pillow installed:

    BCON_LOGO_SOURCE=/path/to/logo.jpeg python scripts/trace-logo.py
"""

from __future__ import annotations

import os
import pathlib
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = pathlib.Path(
    os.environ.get(
        "BCON_LOGO_SOURCE",
        r"C:\Users\acer\Downloads\WhatsApp Image 2026-11-06 at 15.52.27.jpeg",
    )
)
OUT = ROOT / ".ogwork" / "mark.png"

# Mark region in the source image, excluding the wordmark and the sparkle.
REGION = (76, 198, 201, 314)
# Pixels brighter than this (on blue-minus-green) belong to the mark.
MIN_BLUE_MINUS_GREEN = 16
MIN_BLUE = 100
MIN_RED = 66


def main() -> int:
    if not SOURCE.exists():
        print(f"source logo not found: {SOURCE}", file=sys.stderr)
        return 1

    image = Image.open(SOURCE).convert("RGB").crop(REGION)
    width, height = image.size
    pixels = image.load()

    mask = Image.new("L", (width, height), 255)
    mask_pixels = mask.load()
    covered = 0
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            if (
                b > MIN_BLUE
                and b - g > MIN_BLUE_MINUS_GREEN
                and r > MIN_RED
            ):
                mask_pixels[x, y] = 0
                covered += 1

    OUT.parent.mkdir(parents=True, exist_ok=True)
    mask.save(OUT)

    print(f"wrote {OUT} ({width}x{height}, {covered} mark pixels)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
