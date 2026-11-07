/**
 * Normalises the site copy to American English.
 *
 * The brand terms supplied by BCON ("Build. Modernize. Maintain. Grow." and
 * "Technology Modernization") are American, so the surrounding prose uses the
 * same spelling rather than mixing dialects.
 *
 * Only whole words are replaced, and words that are part of a module path or
 * a longer identifier are left untouched.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// Plural forms are listed explicitly: the suffix guard below rejects a match
// followed by a word character, so "organisations" would otherwise survive.
const REPLACEMENTS = [
  ['modernisations', 'modernizations'],
  ['modernisation', 'modernization'],
  ['modernising', 'modernizing'],
  ['modernises', 'modernizes'],
  ['modernise', 'modernize'],
  ['unoptimised', 'unoptimized'],
  ['optimisations', 'optimizations'],
  ['optimisation', 'optimization'],
  ['optimised', 'optimized'],
  ['optimises', 'optimizes'],
  ['optimise', 'optimize'],
  ['behaviours', 'behaviors'],
  ['behaviour', 'behavior'],
  ['prioritised', 'prioritized'],
  ['prioritise', 'prioritize'],
  ['organisations', 'organizations'],
  ['organisation', 'organization'],
  ['normalised', 'normalized'],
  ['vectorised', 'vectorized'],
  ['digitisation', 'digitization'],
  ['digitised', 'digitized'],
  ['recognising', 'recognizing'],
  ['recognised', 'recognized'],
  ['recognise', 'recognize'],
  ['penalises', 'penalizes'],
  ['stabilise', 'stabilize'],
  ['catalogues', 'catalogs'],
  ['catalogue', 'catalog'],
  ['licences', 'licenses'],
  ['licence', 'license'],
  ['centre', 'center'],
  ['programmes', 'programs'],
  ['programme', 'program'],
  ['fulfilment', 'fulfillment'],
  ['fulfil', 'fulfill'],
  ['colours', 'colors'],
  ['colour', 'color'],
  ['labelled', 'labeled'],
  ['grey', 'gray'],
  ['enquiries', 'inquiries'],
  ['enquiry', 'inquiry'],
]

// "enquiry-schema", "@/server/enquiry" and similar must not be rewritten.
const PATH_GUARD = '(?<![\\w/-])'
const SUFFIX_GUARD = '(?![\\w-])'

const changes = []

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(path)
      continue
    }
    if (!entry.name.endsWith('.ts') && !entry.name.endsWith('.tsx')) continue

    let source = readFileSync(path, 'utf8')
    const original = source

    for (const [from, to] of REPLACEMENTS) {
      const pattern = new RegExp(`${PATH_GUARD}${from}${SUFFIX_GUARD}`, 'gi')
      source = source.replace(pattern, (match) => {
        let replacement = to
        if (match === match.toUpperCase() && match.length > 1) {
          replacement = to.toUpperCase()
        } else if (match[0] === match[0].toUpperCase()) {
          replacement = to[0].toUpperCase() + to.slice(1)
        }
        changes.push({ path, from: match, to: replacement })
        return replacement
      })
    }

    if (source !== original) {
      writeFileSync(path, source)
    }
  }
}

walk('src')

const tally = new Map()
for (const change of changes) {
  const key = `${change.from} -> ${change.to}`
  tally.set(key, (tally.get(key) ?? 0) + 1)
}

console.log(
  [...tally.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => `${String(count).padStart(4)}  ${key}`)
    .join('\n'),
)
console.log(`\n${changes.length} replacement(s)`)
