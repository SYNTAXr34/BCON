import type { ReactNode } from 'react'
import { cn } from 'cn'

export function Section({
  id,
  className,
  children,
  'aria-labelledby': ariaLabelledBy,
}: {
  id?: string
  className?: string
  children: ReactNode
  'aria-labelledby'?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('py-20 md:py-28 lg:py-32', className)}
    >
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  id?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow text-brand">{eyebrow}</p> : null}
      <h2
        id={id}
        className="max-w-3xl text-3xl leading-[1.08] font-semibold text-balance sm:text-4xl lg:text-[2.9rem]"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
