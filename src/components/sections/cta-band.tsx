import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { siteConfig } from '@/config/site'

export function CtaBand() {
  return (
    <section
      className="relative overflow-hidden border-t border-border"
      aria-labelledby="cta-heading"
    >
      <div
        className="grid-field pointer-events-none absolute inset-0 -z-10 opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-brand/12 to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative py-24 text-center md:py-32">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center">
          <p className="eyebrow text-brand">Start a conversation</p>
          <h2
            id="cta-heading"
            className="mt-7 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.5rem]"
          >
            Tell us what you are trying to build.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Whether you have a defined brief or an unresolved problem, we will
            start with a conversation about what the technology actually needs
            to do for your business.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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

          <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {siteConfig.motto.map((word, index) => (
              <li key={word} className="flex items-center gap-3">
                <span className="font-heading text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                  {word}
                </span>
                {index < siteConfig.motto.length - 1 ? (
                  <span
                    className="size-1 rounded-full bg-border"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
