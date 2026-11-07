import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/ui/reveal'
import { industries } from '@/data/industries'

export function Industries() {
  return (
    <section
      className="border-t border-border bg-white/[0.015] py-20 md:py-28 lg:py-32"
      aria-labelledby="industries-heading"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">Industries</p>
            <h2
              id="industries-heading"
              className="mt-6 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl lg:text-[2.9rem]"
            >
              Sector knowledge, applied to your situation.
            </h2>
          </div>
          <Link
            to="/industries"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
          >
            All industries
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry, index) => (
            <li key={industry.slug} className="bg-background">
              <Reveal delay={Math.min(index, 6) * 0.03} className="h-full">
                <Link
                  to="/industries"
                  hash={industry.slug}
                  className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-white/[0.03]"
                >
                  <industry.icon
                    className="size-5 text-brand/80 transition-colors group-hover:text-brand"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-snug font-medium text-foreground">
                    {industry.name}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
