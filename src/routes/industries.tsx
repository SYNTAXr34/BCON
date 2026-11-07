import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { industries } from '@/data/industries'
import { pageHead } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'

export const Route = createFileRoute('/industries')({
  head: () =>
    pageHead({
      title: 'Industries — BCON',
      description:
        'BCON builds digital solutions for retail, manufacturing, professional services, healthcare, financial services, education, hospitality, real estate, logistics and software companies.',
      path: '/industries',
      structuredData: [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
        ]),
      ],
    }),
  component: IndustriesPage,
})

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Sector context, applied to your specific situation."
        description="Every industry has its own pressures, constraints and vocabulary. Knowing them means we can ask better questions before proposing anything — and build something that fits the way the sector actually operates."
      />

      <Section>
        <div className="shell">
          <ul className="space-y-6">
            {industries.map((industry) => (
              <li
                key={industry.slug}
                id={industry.slug}
                className="scroll-mt-28"
              >
                <Reveal>
                  <article className="grid gap-8 rounded-xl border border-border bg-white/[0.02] p-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-14 lg:p-12">
                    <div>
                      <span className="flex size-12 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                        <industry.icon
                          className="size-5.5"
                          aria-hidden="true"
                        />
                      </span>
                      <h2 className="mt-6 font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
                        {industry.name}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {industry.summary}
                      </p>
                    </div>

                    <div className="grid gap-10 sm:grid-cols-2">
                      <div>
                        <h3 className="eyebrow text-muted-foreground">
                          Common pressures
                        </h3>
                        <ul className="mt-5 space-y-3">
                          {industry.pressures.map((pressure) => (
                            <li
                              key={pressure}
                              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                            >
                              <span
                                className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-brand"
                                aria-hidden="true"
                              />
                              {pressure}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="eyebrow text-muted-foreground">
                          How we help
                        </h3>
                        <ul className="mt-5 space-y-5">
                          {industry.approaches.map((approach) => (
                            <li key={approach.title}>
                              <p className="text-sm font-semibold text-foreground">
                                {approach.title}
                              </p>
                              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                {approach.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-2 lg:col-start-2">
                      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-6">
                        <span className="eyebrow mr-2 text-muted-foreground">
                          Typical engagements
                        </span>
                        {industry.engagements.map((engagement) => (
                          <span
                            key={engagement}
                            className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {engagement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-border bg-white/[0.015]">
        <div className="shell">
          <Reveal className="flex flex-col gap-8 rounded-xl border border-border p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand">Your sector not listed?</p>
              <h2 className="mt-5 text-2xl leading-tight font-semibold text-balance sm:text-3xl">
                The work is the same, whatever the sector.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                If your industry is not here, that usually means we have not
                written it up yet. The capability still applies — tell us what
                you are working with.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 shrink-0 rounded-md px-7 text-base"
            >
              <Link to="/contact">
                Start a Project
                <ArrowRight className="ml-1 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
