import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/ui/reveal'

const principles = [
  {
    title: 'Technology is an enabler, not the goal',
    body: 'We start from the business outcome, then work backwards to the stack. The technology follows the problem.',
  },
  {
    title: 'Built to be maintained by you',
    body: 'Documented code, clear structure and a handover your team can actually pick up. No black boxes.',
  },
  {
    title: 'A single partner, start to finish',
    body: 'Discovery, design, build and maintenance stay with the same team. Nothing is passed to someone new.',
  },
]

export function Intro() {
  return (
    <section
      className="border-t border-border py-20 md:py-28 lg:py-32"
      aria-labelledby="intro-heading"
    >
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-brand">Who BCON is</p>
          <h2
            id="intro-heading"
            className="mt-6 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl"
          >
            A technology partner, not a website vendor.
          </h2>
          <Link
            to="/about"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
          >
            More about BCON
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              BCON works with organizations that need technology to keep pace
              with them — whether that means launching a business website,
              rebuilding a customer-facing platform, modernizing a legacy
              system, or designing the business software the organization has
              outgrown.
            </p>
            <p>
              We are set up to take responsibility for the whole lifecycle. That
              means an engagement can start with a website and continue into
              maintenance, or begin with an internal system that eventually
              becomes the center of the business. Either way, the same team owns
              the outcome.
            </p>
            <p>
              Our philosophy is simple:{' '}
              <span className="text-foreground">build</span>,{' '}
              <span className="text-foreground">modernize</span>,{' '}
              <span className="text-foreground">maintain</span>,{' '}
              <span className="text-foreground">grow</span>. Not as four
              separate products, but as one continuous relationship with the
              systems a business depends on.
            </p>
          </div>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.title} className="bg-background p-6">
                <dt className="text-sm font-semibold text-foreground">
                  {principle.title}
                </dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
