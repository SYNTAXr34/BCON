import type { ReactNode } from 'react'

import { cn } from 'cn'

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-border',
        className,
      )}
    >
      <div
        className="grid-field pointer-events-none absolute inset-0 -z-10 opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-[28rem] w-[48rem] rounded-full bg-brand/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="shell py-18 md:py-24 lg:py-28">
        {eyebrow ? <p className="eyebrow text-brand">{eyebrow}</p> : null}
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.04] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.75rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  )
}
