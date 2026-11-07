import {
  Accessibility,
  Compass,
  FileCode2,
  Handshake,
  Gauge,
  MessageSquareWarning,
} from 'lucide-react'

import { Reveal } from '@/components/ui/reveal'
import { differentiators } from '@/data/process'

const icons = [
  Compass,
  FileCode2,
  Handshake,
  Accessibility,
  Gauge,
  MessageSquareWarning,
]

export function WhyBcon() {
  return (
    <section
      className="border-t border-border bg-white/[0.015] py-20 md:py-28 lg:py-32"
      aria-labelledby="why-heading"
    >
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-brand">Why BCON</p>
          <h2
            id="why-heading"
            className="mt-6 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl lg:text-[2.9rem]"
          >
            The difference is how the work gets done.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We would rather describe what we actually do well than attach
            numbers to claims we cannot substantiate.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, index) => {
            const Icon = icons[index % icons.length]
            return (
              <li key={item.title} className="bg-background">
                <Reveal delay={Math.min(index, 5) * 0.04} className="h-full">
                  <div className="flex h-full flex-col p-7 lg:p-8">
                    <span className="flex size-10 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-heading text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
