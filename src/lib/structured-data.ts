import { contactConfig, siteConfig, socialConfig } from '@/config/site'
import { canonicalUrl } from '@/lib/seo'

const SITE_URL = siteConfig.url.replace(/\/$/, '')

const socialProfiles = [
  socialConfig.linkedin,
  socialConfig.x,
  socialConfig.github,
  socialConfig.instagram,
].filter((href) => href.length > 0)

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo-lockup.png`,
      contentUrl: `${SITE_URL}/logo-lockup.png`,
      width: 374,
      height: 122,
      caption: siteConfig.name,
    },
    image: `${SITE_URL}/icon-512.png`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: contactConfig.email,
    telephone: contactConfig.phone,
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: contactConfig.email,
        telephone: contactConfig.phone,
        availableLanguage: siteConfig.locale,
      },
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function serviceSchema(service: {
  name: string
  summary: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    serviceType: service.name,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Worldwide',
    url: canonicalUrl(`/services/${service.slug}`),
  }
}

export function articleSchema(insight: {
  title: string
  excerpt: string
  slug: string
  date: string
  author: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.date,
    author: { '@type': 'Person', name: insight.author },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: canonicalUrl(`/insights/${insight.slug}`),
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.path),
    })),
  }
}
