/**
 * Traces the BCON mark into a clean SVG path.
 *
 * The source raster is a JPEG with a baked-in background and glow, so it is
 * thresholded by scripts/trace-logo.py first and vectorised here with potrace.
 * The result is normalised onto a 100x100 grid so it can be dropped into the
 * site as a reusable SVG component.
 */
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const potrace = require('potrace')

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MASK = join(ROOT, '.ogwork', 'mark.png')
const OUT = join(ROOT, '.ogwork', 'mark.svg')

const SIZE = 100

/** Rescales a potrace path from bitmap space onto a centred 100x100 grid. */
function normalise(d) {
  const ARITY = { M: 2, L: 2, C: 6 }
  const segments = []
  const tokens = d.match(/[MLC]|-?\d+(?:\.\d+)?/g) ?? []

  let index = 0
  while (index < tokens.length) {
    const command = tokens[index]
    if (!(command in ARITY)) {
      index += 1
      continue
    }
    const count = ARITY[command]
    const values = tokens
      .slice(index + 1, index + 1 + count)
      .map((token) => Number(token))
    if (values.length < count) break

    segments.push({ command, values })
    index += 1 + count
  }

  const flat = segments.flatMap((segment) => segment.values)
  const xs = flat.filter((_, position) => position % 2 === 0)
  const ys = flat.filter((_, position) => position % 2 === 1)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const scale = SIZE / Math.max(maxX - minX, maxY - minY)
  const offsetX = (SIZE - (maxX - minX) * scale) / 2 - minX * scale
  const offsetY = (SIZE - (maxY - minY) * scale) / 2 - minY * scale

  const round = (value) => Math.round(value * 100) / 100
  const mapX = (value) => round(value * scale + offsetX)
  const mapY = (value) => round(value * scale + offsetY)

  return segments
    .map(({ command, values }) => {
      if (command === 'C') {
        return `C${mapX(values[0])} ${mapY(values[1])} ${mapX(values[2])} ${mapY(
          values[3],
        )} ${mapX(values[4])} ${mapY(values[5])}`
      }
      return `${command}${mapX(values[0])} ${mapY(values[1])}`
    })
    .join(' ')
}

const trace = new potrace.Potrace()
trace.setParameters({
  threshold: 128,
  turdSize: 40,
  optCurve: true,
  optTolerance: 0.15,
  alphaMax: 1.2,
  turnPolicy: 'black',
})

trace.loadImage(MASK, function (err) {
  if (err) throw err

  const raw = this.getPathTag()
  const data = raw.slice(raw.indexOf('d="') + 3, raw.lastIndexOf('"'))
  const path = normalise(data)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <path d="${path}" />
</svg>
`

  writeFileSync(OUT, svg)
  console.log(`wrote ${OUT} (${svg.length} bytes)`)
})
