import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Blocks, LifeBuoy, RefreshCcw, Sprout } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionHeading } from '@/components/ui/section'
import { differentiators, processSteps } from '@/data/process'
import { siteConfig } from '@/config/site'
import { pageHead } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead({
      title: 'About BCON — Digital Solutions & Technology',
      description:
        'BCON is a technology partner helping businesses build, modernize, maintain and grow their digital presence and business infrastructure.',
      path: '/about',
      structuredData: [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]),
      ],
    }),
  component: About,
})

const philosophy = [
  {
    label: siteConfig.motto[0],
    icon: Blocks,
    title: 'Build',
    description:
      'New websites, platforms and business systems, designed and engineered to solve a specific problem rather than to fill a template.',
  },
  {
    label: siteConfig.motto[1],
    icon: RefreshCcw,
    title: 'Modernize',
    description:
      'Legacy platforms, outdated stacks and manual processes brought up to a standard the business can build on and maintain confidently.',
  },
  {
    label: siteConfig.motto[2],
    icon: LifeBuoy,
    title: 'Maintain',
    description:
      'Ongoing support, updates and monitoring so the technology keeps performing after launch, with a team that already knows it.',
  },
  {
    label: siteConfig.motto[3],
    icon: Sprout,
    title: 'Grow',
    description:
      'Continuous improvement driven by real usage data — new capability added where it moves the business forward.',
  },
]

function About() {
  return (
    <>
      <PageHero
        eyebrow="About BCON"
        title="A technology partner for the systems your business depends on."
        description="BCON works with organizations that need technology to keep pace with them — from a business website through to custom business software and the modernization work that keeps both healthy."
      />

      <Section className="border-b border-border">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-brand">What we are</p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl">
              We take responsibility for the whole lifecycle.
            </h2>
          </Reveal>

          <Reveal
            delay={0.08}
            className="space-y-6 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              Most technology problems are not caused by a missing tool. They
              are caused by a gap between what the business needs and what it
              currently runs on — a website that no longer represents the
              company, a legacy platform nobody dares change, or a critical
              process that still lives in somebody&apos;s spreadsheet.
            </p>
            <p>
              BCON exists to close that gap and then keep it closed. We are set
              up to take a problem from the first conversation through strategy,
              design and engineering, and on into the maintenance that keeps it
              working. The same team stays with it throughout.
            </p>
            <p>
              That structure matters. It means nobody hands a project to a
              junior team once the contract is signed, and it means the
              documentation, the code and the handover are treated as part of
              the deliverable rather than an afterthought.
            </p>
            <p>
              We work with startups, small and medium businesses, established
              companies and enterprises, as well as individual entrepreneurs and
              creators who need a professional digital presence. The engagements
              differ in scale, but the standard of the work is the same.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section
        aria-labelledby="philosophy-heading"
        className="border-b border-border bg-white/[0.015]"
      >
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionHeading
              eyebrow="Our philosophy"
              id="philosophy-heading"
              title="Build. Modernize. Maintain. Grow."
              description="Four commitments that describe what we do and, more usefully, how we decide what to do."
            />
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.map((item) => (
              <li key={item.title} className="bg-background">
                <Reveal className="h-full">
                  <div className="flex h-full flex-col p-7 lg:p-8">
                    <span className="flex size-11 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                      <item.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-heading text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        aria-labelledby="method-heading"
        className="border-b border-border"
      >
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionHeading
              eyebrow="Our method"
              id="method-heading"
              title="Seven stages, applied to every engagement."
              description="The stages scale with the project, but none of them are optional."
            />
          </Reveal>

          <ol className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-7">
            {processSteps.map((step, index) => (
              <li key={step.number}>
                <Reveal delay={Math.min(index, 6) * 0.04}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tracking-widest text-brand tabular-nums">
                      {step.number}
                    </span>
                    <span
                      className="h-px flex-1 bg-border"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 font-heading text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section
        aria-labelledby="principles-heading"
        className="border-b border-border bg-white/[0.015]"
      >
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionHeading
              eyebrow="How we operate"
              id="principles-heading"
              title="The commitments we hold ourselves to."
            />
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <li key={item.title} className="bg-background">
                <Reveal className="h-full">
                  <div className="h-full p-7 lg:p-8">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="shell">
          <Reveal className="flex flex-col gap-8 rounded-xl border border-border bg-white/[0.02] p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand">Get in touch</p>
              <h2 className="mt-5 text-2xl leading-tight font-semibold text-balance sm:text-3xl">
                If any of this sounds like your situation, let&apos;s talk.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A short conversation is usually enough to establish whether we
                are the right partner, and what the first step should be.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-md px-7 text-base"
              >
                <Link to="/contact">
                  Start a Project
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-md border-border/80 bg-white/[0.03] px-7 text-base hover:bg-white/[0.07]"
              >
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
