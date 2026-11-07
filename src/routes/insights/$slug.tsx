import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Section } from '@/components/ui/section'
import { getInsight, insights } from '@/data/insights'
import { pageHead } from '@/lib/seo'
import { articleSchema, breadcrumbSchema } from '@/lib/structured-data'

export const Route = createFileRoute('/insights/$slug')({
  loader: ({ params }) => {
    const insight = getInsight(params.slug)
    if (!insight) throw notFound()
    return insight
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData
        ? `${loaderData.title} — BCON Insights`
        : 'Insight — BCON',
      description:
        loaderData?.excerpt ??
        'Practical writing from BCON on web development, technology modernization, ERP design, UI/UX and digital marketing.',
      path: loaderData ? `/insights/${loaderData.slug}` : '/insights',
      type: 'article',
      structuredData: loaderData
        ? [
            articleSchema(loaderData),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Insights', path: '/insights' },
              { name: loaderData.title, path: `/insights/${loaderData.slug}` },
            ]),
          ]
        : undefined,
    }),
  component: InsightRoute,
})

function InsightRoute() {
  const insight = Route.useLoaderData()
  const related = insights
    .filter((item) => item.slug !== insight.slug)
    .slice(0, 2)

  return (
    <>
      <PageHero
        eyebrow={insight.category}
        title={insight.title}
        description={insight.excerpt}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span>{insight.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={insight.date}>
            {new Intl.DateTimeFormat('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format(new Date(insight.date))}
          </time>
          <span aria-hidden="true">·</span>
          <span>{insight.readingMinutes} min read</span>
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All insights
          </Link>
        </div>
      </PageHero>

      <Section className="border-b border-border">
        <div className="shell">
          <article className="mx-auto max-w-2xl">
            {insight.body.map((block, index) => {
              switch (block.type) {
                case 'h2':
                  return (
                    <h2
                      key={index}
                      className="mt-12 mb-5 text-2xl leading-tight font-semibold text-foreground"
                    >
                      {block.text}
                    </h2>
                  )
                case 'h3':
                  return (
                    <h3
                      key={index}
                      className="mt-9 mb-4 text-lg font-semibold text-foreground"
                    >
                      {block.text}
                    </h3>
                  )
                case 'p':
                  return (
                    <p
                      key={index}
                      className="mb-5 text-base leading-[1.75] text-muted-foreground"
                    >
                      {block.text}
                    </p>
                  )
                case 'ul':
                  return (
                    <ul key={index} className="mb-6 space-y-3">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3.5 text-base leading-[1.7] text-muted-foreground"
                        >
                          <span
                            className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-brand"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )
                case 'ol':
                  return (
                    <ol key={index} className="mb-6 space-y-3">
                      {block.items.map((item, itemIndex) => (
                        <li
                          key={item}
                          className="flex gap-3.5 text-base leading-[1.7] text-muted-foreground"
                        >
                          <span className="font-mono text-xs text-brand tabular-nums">
                            {String(itemIndex + 1).padStart(2, '0')}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  )
                case 'quote':
                  return (
                    <blockquote
                      key={index}
                      className="my-9 border-l-2 border-brand pl-6 text-lg leading-relaxed font-medium text-foreground"
                    >
                      {block.text}
                    </blockquote>
                  )
              }
            })}
          </article>
        </div>
      </Section>

      <Section>
        <div className="shell">
          <div className="flex flex-col gap-8 rounded-xl border border-border bg-white/[0.02] p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand">Have a similar situation?</p>
              <h2 className="mt-5 text-2xl leading-tight font-semibold text-balance sm:text-3xl">
                We work through these problems with our clients every week.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                If any of this sounds familiar, a conversation about your
                specific situation is the fastest way to find out what to do
                next.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 shrink-0 rounded-md px-7 text-base"
            >
              <Link to="/contact">
                Talk to BCON
                <ArrowRight className="ml-1 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {related.length > 0 ? (
            <div className="mt-16">
              <h2 className="text-xl font-semibold text-foreground">
                Keep reading
              </h2>
              <ul className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to="/insights/$slug"
                      params={{ slug: item.slug }}
                      className="group flex h-full flex-col rounded-lg border border-border bg-white/[0.02] p-7 transition-colors hover:border-brand/35"
                    >
                      <span className="text-xs font-medium text-muted-foreground">
                        {item.category}
                      </span>
                      <span className="mt-3 font-heading text-lg leading-snug font-semibold text-foreground">
                        {item.title}
                      </span>
                      <span className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.excerpt}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Section>
    </>
  )
}
