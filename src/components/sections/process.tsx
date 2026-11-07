import { Reveal } from '@/components/ui/reveal'
import { processSteps } from '@/data/process'

export function Process() {
  return (
    <section
      className="border-t border-border py-20 md:py-28 lg:py-32"
      aria-labelledby="process-heading"
    >
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-brand">How we work</p>
          <h2
            id="process-heading"
            className="mt-6 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl lg:text-[2.9rem]"
          >
            A delivery method you can follow.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            The same seven stages apply whether the project is a five-page
            website or a multi-year software program.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-x-10 gap-y-12 lg:grid-cols-7">
          {processSteps.map((step, index) => (
            <li key={step.number} className="relative">
              <Reveal delay={Math.min(index, 6) * 0.05}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-widest text-brand tabular-nums">
                    {step.number}
                  </span>
                  <span className="h-px flex-1 bg-border" aria-hidden="true" />
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
    </section>
  )
}
