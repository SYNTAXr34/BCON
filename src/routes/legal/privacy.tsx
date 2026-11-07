import { createFileRoute } from '@tanstack/react-router'

import { LegalLayout } from '@/components/layout/legal-layout'
import { contactConfig } from '@/config/site'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/legal/privacy')({
  head: () =>
    pageHead({
      title: 'Privacy Policy — BCON',
      description:
        'How BCON collects, uses and protects personal information submitted through this website.',
      path: '/legal/privacy',
    }),
  component: Privacy,
})

function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="This policy explains what information we collect through this website, why we collect it, and what we do with it."
      updated="6 November 2026"
      sections={[
        {
          heading: 'Who we are',
          body: (
            <p>
              BCON provides digital development, technology modernization and
              business software services. This policy applies to this website
              and to the inquiries submitted through it. For questions about
              this policy, contact us at{' '}
              <a
                href={`mailto:${contactConfig.email}`}
                className="text-foreground underline underline-offset-4"
              >
                {contactConfig.email}
              </a>
              .
            </p>
          ),
        },
        {
          heading: 'What we collect',
          body: (
            <>
              <p>
                When you submit an inquiry we collect the information you
                provide: your name, email address, optional company name,
                optional phone number, the service you are interested in, and
                the description you write.
              </p>
              <p>
                We also collect limited technical information needed to operate
                the site securely, including IP address used for rate limiting
                and abuse prevention, and standard request logs.
              </p>
            </>
          ),
        },
        {
          heading: 'Why we use it',
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>To respond to your inquiry and prepare a useful reply.</li>
              <li>To keep the website secure and prevent automated abuse.</li>
              <li>
                To understand which services are of interest, in aggregate form,
                so we can improve what we offer.
              </li>
            </ul>
          ),
        },
        {
          heading: 'How long we keep it',
          body: (
            <p>
              Inquiry information is retained for as long as needed to respond
              to the inquiry and to maintain a record of the business
              conversation. You can ask us to delete it at any time.
            </p>
          ),
        },
        {
          heading: 'Who we share it with',
          body: (
            <p>
              We do not sell your information. We share it only with the
              providers we use to run the business — our email delivery service,
              our hosting provider, and our messaging provider where you choose
              to continue a conversation through WhatsApp. Each provider
              processes data under its own terms and our agreement with them.
            </p>
          ),
        },
        {
          heading: 'Your rights',
          body: (
            <p>
              Depending on where you live, you may have the right to access,
              correct, delete or export the personal information we hold about
              you, and to object to how it is used. Contact us at{' '}
              <a
                href={`mailto:${contactConfig.email}`}
                className="text-foreground underline underline-offset-4"
              >
                {contactConfig.email}
              </a>{' '}
              and we will respond.
            </p>
          ),
        },
        {
          heading: 'Cookies',
          body: (
            <p>
              This website does not set advertising or cross-site tracking
              cookies. If analytics are introduced in future, this policy will
              be updated before they are enabled.
            </p>
          ),
        },
        {
          heading: 'Changes to this policy',
          body: (
            <p>
              We update this policy when our practices change. The date at the
              top of the page shows when it was last revised.
            </p>
          ),
        },
      ]}
    />
  )
}
