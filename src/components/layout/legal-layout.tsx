import type { ReactNode } from 'react'

import { PageHero } from '@/components/ui/page-hero'
import { Section } from '@/components/ui/section'
import { contactConfig, siteConfig } from '@/config/site'

export type LegalSection = {
  heading: string
  body: ReactNode
}

export function LegalLayout({
  title,
  intro,
  updated,
  sections,
}: {
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={intro} />

      <Section>
        <div className="shell">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm text-muted-foreground">
              Last updated: {updated}
            </p>

            <div className="mt-10 space-y-12">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-16 rounded-xl border border-border bg-white/[0.02] p-7">
              <h2 className="font-heading text-base font-semibold text-foreground">
                Contact
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Questions about this page can be sent to{' '}
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="text-foreground underline underline-offset-4"
                >
                  {contactConfig.email}
                </a>{' '}
                or by post to {siteConfig.legalName}.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
