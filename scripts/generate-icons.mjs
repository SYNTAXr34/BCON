/**
 * Renders the square app icons from the traced vector mark.
 *
 * The raster artwork only carries about 140px of mark, which is far too little
 * to fill a 512px icon, so the icons use the vector trace instead. That keeps
 * them crisp at every size, at the cost of the bevelled shading — which the
 * favicon has always used anyway.
 *
 * Run after `node scripts/vectorize-logo.mjs`, which writes public/favicon.svg.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Resvg } from '@resvg/resvg-js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const FAVICON = join(ROOT, 'public', 'favicon.svg')

const BACKGROUND = '#141A30'
const GRADIENT = ['#6B5FA8', '#9D8ECB', '#EED7FF']

/**
 * name, edge length, corner radius (0 for square), mark scale.
 *
 * iOS rounds the apple-touch-icon itself, so that one is a plain square.
 * The maskable icon keeps a wide margin because platforms crop it to an
 * arbitrary shape.
 */
const ICONS = [
  { name: 'icon-192.png', edge: 192, radius: 0.22, scale: 0.76 },
  { name: 'icon-512.png', edge: 512, radius: 0.22, scale: 0.76 },
  { name: 'apple-touch-icon.png', edge: 180, radius: 0, scale: 0.76 },
  { name: 'icon-maskable.png', edge: 512, radius: 0, scale: 0.52 },
]

const favicon = readFileSync(FAVICON, 'utf-8')
const path = favicon.match(/<path d="([^"]+)"/)?.[1]
if (!path) {
  console.error(`No mark path found in ${FAVICON}.`)
  process.exit(1)
}

for (const icon of ICONS) {
  const offset = (100 - 100 * icon.scale) / 2
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${icon.edge}" height="${icon.edge}" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bcon" x1="6" y1="94" x2="94" y2="8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${GRADIENT[0]}" />
      <stop offset="0.45" stop-color="${GRADIENT[1]}" />
      <stop offset="1" stop-color="${GRADIENT[2]}" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="${icon.radius * 100}" fill="${BACKGROUND}" />
  <g transform="translate(${offset} ${offset}) scale(${icon.scale})">
    <path d="${path}" fill="url(#bcon)" />
  </g>
</svg>
`

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: icon.edge } })
  const out = join(ROOT, 'public', icon.name)
  writeFileSync(out, resvg.render().asPng())
  console.log(`wrote ${out} (${icon.edge}x${icon.edge})`)
}
