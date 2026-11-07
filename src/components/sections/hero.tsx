import { Link } from '@tanstack/react-router'
import { ArrowRight, Blocks, LifeBuoy, RefreshCcw, Sprout } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

const pillars = [
  { label: siteConfig.motto[0], icon: Blocks },
  { label: siteConfig.motto[1], icon: RefreshCcw },
  { label: siteConfig.motto[2], icon: LifeBuoy },
  { label: siteConfig.motto[3], icon: Sprout },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="grid-field grid-field-fade pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[68rem] -translate-x-1/2 rounded-full bg-brand/12 blur-[140px]"
        aria-hidden="true"
      />

      <div className="shell relative pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-32">
        <p className="eyebrow text-brand">
          BCON · Digital Solutions &amp; Technology
        </p>

        <h1 className="mt-7 max-w-5xl text-[2.65rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.75rem]">
          Your Vision. <span className="text-brand">Our Technology.</span>{' '}
          Better Business.
        </h1>

        <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,38rem)_1fr] lg:gap-16">
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            From high-performance websites to custom business software, BCON
            helps businesses build, modernize, and maintain the technology they
            need to move forward.
          </p>

          <div className="flex flex-wrap items-start gap-3 lg:justify-end">
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
        </div>
      </div>

      <div className="relative border-y border-border bg-white/[0.015]">
        <div className="shell grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.label}
              className={`flex items-center gap-3 py-5 sm:px-6 sm:first:pl-0 lg:py-6 ${
                index > 0 ? 'sm:border-l sm:border-border' : ''
              }`}
            >
              <pillar.icon
                className="size-4.5 shrink-0 text-brand"
                aria-hidden="true"
              />
              <span className="font-heading text-sm font-medium tracking-[0.14em] text-foreground uppercase">
                {pillar.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
