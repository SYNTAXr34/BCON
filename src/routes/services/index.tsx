import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { serviceIcons, services } from '@/data/services'
import { pageHead } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'

export const Route = createFileRoute('/services/')({
  head: () =>
    pageHead({
      title: 'Services — BCON',
      description:
        'Web development, UI/UX design, technology modernization, ERP and CRM solutions, custom software and digital marketing — delivered by one accountable team.',
      path: '/services',
      structuredData: [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]),
      ],
    }),
  component: ServicesIndex,
})

function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything needed to build, modernize and run digital operations."
        description="BCON covers the full lifecycle of business technology. Whether you need one service or a partner across several, the same team owns the outcome from first conversation to ongoing maintenance."
      />

      <Section aria-labelledby="services-list-heading">
        <div className="shell">
          <h2 id="services-list-heading" className="sr-only">
            Service categories
          </h2>

          <ul className="grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.slug]
              return (
                <li key={service.slug}>
                  <Reveal delay={Math.min(index, 3) * 0.06} className="h-full">
                    <article className="group flex h-full flex-col rounded-xl border border-border bg-white/[0.02] p-8 transition-colors hover:border-brand/35 lg:p-10">
                      <div className="flex items-start justify-between gap-6">
                        <span className="flex size-12 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                          <Icon className="size-5.5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-xs text-muted-foreground/60 tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="mt-7 font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
                        <Link
                          to="/services/$slug"
                          params={{ slug: service.slug }}
                          className="after:absolute after:inset-0"
                        >
                          {service.name}
                        </Link>
                      </h3>
                      <p className="mt-3.5 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {service.summary}
                      </p>

                      <ul className="mt-7 flex flex-wrap gap-1.5">
                        {service.capabilities.slice(0, 4).map((capability) => (
                          <li
                            key={capability}
                            className="rounded-md border border-border px-2.5 py-1 font-mono text-[0.6875rem] text-muted-foreground/90"
                          >
                            {capability}
                          </li>
                        ))}
                      </ul>

                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand">
                        Explore {service.shortName}
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-border bg-white/[0.015]">
        <div className="shell">
          <Reveal className="flex flex-col gap-8 rounded-xl border border-border p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand">Not sure where to start?</p>
              <h2 className="mt-5 text-2xl leading-tight font-semibold text-balance sm:text-3xl">
                Describe the problem and we will tell you what it needs.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Not every problem needs a new platform, and some need a
                different one entirely. That assessment is part of the work, not
                an upsell.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 shrink-0 rounded-md px-7 text-base"
            >
              <Link to="/contact">Talk to BCON</Link>
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
