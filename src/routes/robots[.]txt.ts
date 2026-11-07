import { createFileRoute } from '@tanstack/react-router'

import { siteConfig } from '@/config/site'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const base = siteConfig.url.replace(/\/$/, '')

        const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`

        return new Response(body, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
