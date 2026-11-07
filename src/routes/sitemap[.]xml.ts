import { createFileRoute } from '@tanstack/react-router'

import { insights } from '@/data/insights'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { canonicalUrl } from '@/lib/seo'

type SitemapEntry = {
  path: string
  lastmod?: string
  changefreq: string
  priority: string
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const entries: SitemapEntry[] = [
          { path: '/', changefreq: 'weekly', priority: '1.0' },
          { path: '/about', changefreq: 'monthly', priority: '0.7' },
          { path: '/services', changefreq: 'monthly', priority: '0.9' },
          ...services.map((service) => ({
            path: `/services/${service.slug}`,
            changefreq: 'monthly' as const,
            priority: '0.8',
          })),
          { path: '/industries', changefreq: 'monthly', priority: '0.7' },
          { path: '/projects', changefreq: 'monthly', priority: '0.7' },
          ...projects.map((project) => ({
            path: `/projects/${project.slug}`,
            changefreq: 'monthly' as const,
            priority: '0.6',
          })),
          { path: '/insights', changefreq: 'weekly', priority: '0.7' },
          ...insights.map((insight) => ({
            path: `/insights/${insight.slug}`,
            lastmod: insight.date,
            changefreq: 'monthly' as const,
            priority: '0.6',
          })),
          { path: '/contact', changefreq: 'yearly', priority: '0.8' },
          { path: '/legal/privacy', changefreq: 'yearly', priority: '0.3' },
          { path: '/legal/terms', changefreq: 'yearly', priority: '0.3' },
        ]

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${canonicalUrl(entry.path)}</loc>
${entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : ''}    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

        return new Response(body, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
