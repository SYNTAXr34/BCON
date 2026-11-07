import { createFileRoute, notFound } from '@tanstack/react-router'

import { ServicePage } from '@/components/sections/service-page'
import { getService } from '@/data/services'
import { pageHead } from '@/lib/seo'
import { breadcrumbSchema, serviceSchema } from '@/lib/structured-data'

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => {
    const service = getService(params.slug)
    if (!service) throw notFound()
    return service
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData
        ? `${loaderData.name} — BCON Services`
        : 'Service — BCON',
      description:
        loaderData?.summary ??
        'BCON builds and modernizes the websites, software and digital systems that businesses run on.',
      path: loaderData ? `/services/${loaderData.slug}` : '/services',
      structuredData: loaderData
        ? [
            serviceSchema(loaderData),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: loaderData.name, path: `/services/${loaderData.slug}` },
            ]),
          ]
        : undefined,
    }),
  component: ServiceRoute,
})

function ServiceRoute() {
  const service = Route.useLoaderData()
  return <ServicePage service={service} />
}
