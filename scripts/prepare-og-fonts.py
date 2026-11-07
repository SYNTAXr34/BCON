"""Instance the brand variable fonts to static weights for the OG image renderer.

resvg (fontdb) cannot read woff2 and does not apply variation axes, so the
variable fonts shipped by @fontsource-variable are converted here to static
TTFs at the weights the OG layout needs.

Run with a Python that has `brotli` and `fonttools` installed.
"""

from __future__ import annotations

import pathlib
import sys

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parent.parent
NODE_MODULES = ROOT / "node_modules"
OUT_DIR = ROOT / "scripts" / "fonts"

SOURCES = [
    (
        "@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
        "space-grotesk-700.ttf",
        700,
    ),
    (
        "@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
        "space-grotesk-500.ttf",
        500,
    ),
    (
        "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
        "geist-400.ttf",
        400,
    ),
    (
        "@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
        "jetbrains-mono-500.ttf",
        500,
    ),
]


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for relative_source, filename, weight in SOURCES:
        source = NODE_MODULES / relative_source
        if not source.exists():
            print(f"missing source font: {source}", file=sys.stderr)
            return 1

        target = OUT_DIR / filename
        font = TTFont(source)
        instancer.instantiateVariableFont(font, {"wght": weight}, inplace=True)
        font.flavor = None
        font.save(target)
        print(f"{filename} <- {relative_source} @ wght {weight}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
