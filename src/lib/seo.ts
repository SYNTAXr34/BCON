import type { JSX } from 'react'

import { siteConfig } from '@/config/site'

type MetaTag = JSX.IntrinsicElements['meta']
type LinkTag = JSX.IntrinsicElements['link']
type ScriptTag = JSX.IntrinsicElements['script']

/**
 * PLACEHOLDER origin — replace with the production domain before launch.
 * Used for canonical URLs, Open Graph tags, sitemap and robots.txt.
 */
const SITE_URL = siteConfig.url.replace(/\/$/, '')

export const canonicalUrl = (path: string) =>
  path === '/' ? SITE_URL : `${SITE_URL}${path}`

export const absoluteUrl = (path: string) => canonicalUrl(path)

export function pageMeta({
  title,
  description,
  path,
  type = 'website',
}: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
}): MetaTag[] {
  const url = canonicalUrl(path)
  const image = `${SITE_URL}/og.png`

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: siteConfig.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'en' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ]
}

export function canonicalLink(path: string): LinkTag {
  return { rel: 'canonical', href: canonicalUrl(path) }
}

export function pageHead({
  title,
  description,
  path,
  type = 'website',
  structuredData,
}: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  structuredData?: Record<string, unknown>[]
}) {
  return {
    meta: pageMeta({ title, description, path, type }),
    links: [canonicalLink(path)],
    ...(structuredData ? { scripts: structuredData.map(jsonLd) } : {}),
  }
}

export function jsonLd(data: Record<string, unknown>): ScriptTag {
  return {
    type: 'application/ld+json',
    children: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
}
