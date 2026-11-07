import { createFileRoute } from '@tanstack/react-router'

import { CtaBand } from '@/components/sections/cta-band'
import { Hero } from '@/components/sections/hero'
import { Industries } from '@/components/sections/industries'
import { Intro } from '@/components/sections/intro'
import { Process } from '@/components/sections/process'
import { Projects } from '@/components/sections/projects'
import { Services } from '@/components/sections/services'
import { WhyBcon } from '@/components/sections/why-bcon'
import { siteConfig } from '@/config/site'
import { pageHead } from '@/lib/seo'
import { organizationSchema, websiteSchema } from '@/lib/structured-data'

export const Route = createFileRoute('/')({
  head: () =>
    pageHead({
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description:
        'BCON builds and modernizes digital solutions for businesses — high-performance websites, custom ERP and CRM systems, and the technology to keep it all running.',
      path: '/',
      structuredData: [organizationSchema(), websiteSchema()],
    }),
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <WhyBcon />
      <Process />
      <Projects />
      <Industries />
      <CtaBand />
    </>
  )
}
