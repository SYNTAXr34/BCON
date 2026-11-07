import { createFileRoute } from '@tanstack/react-router'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { EnquiryForm } from '@/components/forms/enquiry-form'
import { PageHero } from '@/components/ui/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { contactConfig } from '@/config/site'
import { pageHead } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'

export const Route = createFileRoute('/contact')({
  head: () =>
    pageHead({
      title: 'Contact — BCON',
      description:
        'Tell BCON about your project. Share what you need and we will come back with an honest view of scope, approach and next steps.',
      path: '/contact',
      structuredData: [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]),
      ],
    }),
  component: Contact,
})

const expectations = [
  {
    title: 'We read it properly',
    body: 'Every inquiry is reviewed by someone at BCON. You will not get an automated sequence.',
  },
  {
    title: 'We reply with a view, not a brochure',
    body: 'Expect a response about your specific situation — including an honest answer if we are not the right fit.',
  },
  {
    title: 'No obligation',
    body: 'A first conversation is free and carries no commitment. We will tell you if a different approach would serve you better.',
  },
]

function Contact() {
  const addressLines = [
    contactConfig.address.street,
    contactConfig.address.city,
    contactConfig.address.region,
    contactConfig.address.postalCode,
    contactConfig.address.country,
  ].filter(Boolean)

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are trying to build."
        description="Give us as much or as little as you have. A rough description of the problem is enough to start the conversation."
      />

      <Section>
        <div className="shell grid gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16">
          <Reveal>
            <div className="rounded-xl border border-border bg-white/[0.02] p-7 sm:p-10">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Project inquiry
              </h2>
              <p className="mt-2 mb-8 text-sm text-muted-foreground">
                Fields marked with an asterisk are required.
              </p>
              <EnquiryForm />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col gap-8">
              <div className="rounded-xl border border-border bg-white/[0.02] p-7">
                <h2 className="eyebrow text-muted-foreground">
                  Direct contact
                </h2>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href={`mailto:${contactConfig.email}`}
                      className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Mail
                        className="mt-0.5 size-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      {contactConfig.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${contactConfig.phoneHref}`}
                      className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Phone
                        className="mt-0.5 size-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      {contactConfig.phone}
                    </a>
                  </li>
                  {contactConfig.whatsapp ? (
                    <li>
                      <a
                        href={`https://wa.me/${contactConfig.whatsapp.replace(/[^\d]/g, '')}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <MessageCircle
                          className="mt-0.5 size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        WhatsApp
                      </a>
                    </li>
                  ) : null}
                  {addressLines.length > 0 ? (
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <MapPin
                        className="mt-0.5 size-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <span className="flex flex-col">
                        {addressLines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </span>
                    </li>
                  ) : null}
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <Clock
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    {contactConfig.hours}
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-white/[0.02] p-7">
                <h2 className="eyebrow text-muted-foreground">
                  What happens next
                </h2>
                <ul className="mt-6 space-y-6">
                  {expectations.map((item, index) => (
                    <li key={item.title} className="flex gap-4">
                      <span className="font-mono text-xs text-brand tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
