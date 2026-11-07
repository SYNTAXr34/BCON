import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/ui/reveal'
import { serviceIcons, services } from '@/data/services'

export function Services() {
  return (
    <section
      className="border-t border-border py-20 md:py-28 lg:py-32"
      aria-labelledby="services-heading"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">What we do</p>
            <h2
              id="services-heading"
              className="mt-6 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl lg:text-[2.9rem]"
            >
              Six practices, one accountable team.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
          >
            All services
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <ul className="mt-14 border-t border-border">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.slug]
            return (
              <li key={service.slug}>
                <Reveal delay={Math.min(index, 3) * 0.05}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="group grid items-start gap-5 border-b border-border py-8 transition-colors hover:bg-white/[0.025] sm:grid-cols-[4rem_1fr_auto] sm:gap-8 sm:px-2 lg:py-10"
                  >
                    <span className="font-mono text-xs text-muted-foreground/70 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-white/[0.03] text-brand transition-colors group-hover:border-brand/40 group-hover:bg-brand/10">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="flex flex-col gap-2">
                        <span className="font-heading text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
                          {service.name}
                        </span>
                        <span className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {service.summary}
                        </span>
                        <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                          {service.capabilities
                            .slice(0, 3)
                            .map((capability) => (
                              <span
                                key={capability}
                                className="text-xs text-muted-foreground/80"
                              >
                                {capability}
                              </span>
                            ))}
                        </span>
                      </span>
                    </span>

                    <span className="flex items-center gap-2 self-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-brand sm:self-start sm:pt-1">
                      Explore
                      <ArrowUpRight
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
