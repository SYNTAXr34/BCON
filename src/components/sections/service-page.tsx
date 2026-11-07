import { Link } from '@tanstack/react-router'
import { ArrowRight, Check, TriangleAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionHeading } from '@/components/ui/section'
import type { Service } from '@/data/services'

export function ServicePage({ service }: { service: Service }) {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.name}
        description={service.intro}
      >
        <div className="flex flex-wrap gap-2">
          {service.capabilities.slice(0, 6).map((capability) => (
            <span
              key={capability}
              className="rounded-md border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground"
            >
              {capability}
            </span>
          ))}
        </div>
      </PageHero>

      <Section
        aria-labelledby="problems-heading"
        className="border-b border-border"
      >
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-brand">The problem</p>
            <h2
              id="problems-heading"
              className="mt-6 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl"
            >
              What this usually looks like.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Most engagements begin with one of these. Recognizing it early is
              what keeps the scope honest.
            </p>
          </Reveal>

          <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {service.problems.map((problem) => (
              <li key={problem.title} className="bg-background p-7">
                <TriangleAlert
                  className="size-4.5 text-brand/70"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {problem.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {problem.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        aria-labelledby="solution-heading"
        className="border-b border-border bg-white/[0.015]"
      >
        <div className="shell grid gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-brand">Our solution</p>
            <h2
              id="solution-heading"
              className="mt-6 max-w-2xl text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl"
            >
              {service.solution.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {service.solution.description}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="space-y-4">
              {service.solution.points.map((point) => (
                <li key={point} className="flex gap-3.5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/12 text-brand">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/90">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section
        aria-labelledby="capabilities-heading"
        className="border-b border-border"
      >
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              id="capabilities-heading"
              title="Everything this service covers."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {service.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-3 text-sm text-foreground/90"
                >
                  <span
                    className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-brand"
                    aria-hidden="true"
                  />
                  {capability}
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-lg border border-border bg-white/[0.02] p-7">
              <h3 className="font-heading text-base font-semibold text-foreground">
                What you receive
              </h3>
              <ul className="mt-5 space-y-3">
                {service.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        aria-labelledby="benefits-heading"
        className="border-b border-border bg-white/[0.015]"
      >
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionHeading
              eyebrow="Benefits"
              id="benefits-heading"
              title="What changes for the business."
            />
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <li key={benefit.title} className="bg-background p-7 lg:p-8">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        aria-labelledby="process-heading"
        className="border-b border-border"
      >
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionHeading
              eyebrow="Delivery"
              id="process-heading"
              title={`How we deliver ${service.name.toLowerCase()}.`}
              description="The same discipline on every engagement, adapted to the size and shape of the work."
            />
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {service.process.map((step, index) => (
              <li key={step.title} className="bg-background p-7">
                <span className="font-mono text-xs text-brand tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section aria-labelledby="cta-heading" className="border-b border-border">
        <div className="shell">
          <Reveal className="flex flex-col gap-8 rounded-xl border border-border bg-white/[0.02] p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand">Next step</p>
              <h2
                id="cta-heading"
                className="mt-5 text-2xl leading-tight font-semibold text-balance sm:text-3xl"
              >
                {service.cta}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Tell us about the project and we will come back with an honest
                view of scope, approach and what it will take.
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
                <Link to="/services">All services</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
