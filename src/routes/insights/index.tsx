import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { PageHero } from '@/components/ui/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { insights } from '@/data/insights'
import { pageHead } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'

export const Route = createFileRoute('/insights/')({
  head: () =>
    pageHead({
      title: 'Insights — BCON',
      description:
        'Practical writing from BCON on web development, technology modernization, ERP design, UI/UX and digital marketing.',
      path: '/insights',
      structuredData: [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
        ]),
      ],
    }),
  component: InsightsIndex,
})

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso))
}

function InsightsIndex() {
  const featured = insights.at(0)
  const rest = insights.slice(1)

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes on building and running technology that works."
        description="We write about the problems we actually solve: modernizing legacy systems, designing ERP around real processes, making websites fast, and building design systems that hold."
      />

      <Section>
        <div className="shell">
          {featured ? (
            <Reveal>
              <Link
                to="/insights/$slug"
                params={{ slug: featured.slug }}
                className="group grid gap-8 rounded-xl border border-border bg-white/[0.02] p-8 transition-colors hover:border-brand/35 lg:grid-cols-[1fr_20rem] lg:gap-14 lg:p-12"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md border border-brand/25 bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
                      {featured.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(featured.date)} · {featured.readingMinutes}{' '}
                      min read
                    </span>
                  </div>
                  <h2 className="mt-6 font-heading text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-3xl lg:text-[2.35rem]">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand">
                    Read the article
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <div className="relative hidden overflow-hidden rounded-lg border border-border lg:block">
                  <span
                    className="grid-field absolute inset-0 opacity-70"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-brand/15 to-transparent"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </Reveal>
          ) : null}

          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((insight, index) => (
              <li key={insight.slug}>
                <Reveal delay={Math.min(index, 5) * 0.05} className="h-full">
                  <Link
                    to="/insights/$slug"
                    params={{ slug: insight.slug }}
                    className="group flex h-full flex-col rounded-lg border border-border bg-white/[0.02] p-7 transition-colors hover:border-brand/35"
                  >
                    <span className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground self-start">
                      {insight.category}
                    </span>
                    <span className="mt-6 font-heading text-lg leading-snug font-semibold text-foreground">
                      {insight.title}
                    </span>
                    <span className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {insight.excerpt}
                    </span>
                    <span className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground/80">
                      {formatDate(insight.date)} · {insight.readingMinutes} min
                      read
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
