import { createFileRoute } from '@tanstack/react-router'

import { LegalLayout } from '@/components/layout/legal-layout'
import { contactConfig } from '@/config/site'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/legal/terms')({
  head: () =>
    pageHead({
      title: 'Terms of Use — BCON',
      description:
        'The terms that apply to the use of this website and to inquiries submitted through it.',
      path: '/legal/terms',
    }),
  component: Terms,
})

function Terms() {
  return (
    <LegalLayout
      title="Terms of Use"
      intro="These terms cover your use of this website. Specific services are governed by a separate written agreement between BCON and the client."
      updated="6 November 2026"
      sections={[
        {
          heading: 'About these terms',
          body: (
            <p>
              By using this website you agree to these terms. If you do not
              agree with them, please stop using the site. These terms apply to
              the website only — work carried out for clients is governed by the
              agreement signed for that engagement.
            </p>
          ),
        },
        {
          heading: 'Information on this site',
          body: (
            <p>
              We take care to keep the information here accurate and current,
              but it is provided for general information. It does not constitute
              technical, legal or financial advice, and it should not be relied
              on as a commitment to deliver any specific result.
            </p>
          ),
        },
        {
          heading: 'Demonstration work',
          body: (
            <p>
              Projects labeled as demonstration builds are reference
              implementations produced by BCON to demonstrate a particular
              approach. They are not client engagements, and no client results
              are represented or implied in relation to them.
            </p>
          ),
        },
        {
          heading: 'Intellectual property',
          body: (
            <p>
              The content, design and code of this website belong to BCON or are
              used with permission. You may view, print and link to pages for
              your own business purposes. You may not reproduce substantial
              parts of the site, or use its content commercially, without
              written permission.
            </p>
          ),
        },
        {
          heading: 'Inquiries and acceptable use',
          body: (
            <p>
              When you submit an inquiry you agree that the information you
              provide is accurate and that you have the right to share it. You
              must not attempt to interfere with the operation of the site,
              probe it for vulnerabilities without permission, or submit
              automated or malicious content.
            </p>
          ),
        },
        {
          heading: 'Availability and liability',
          body: (
            <p>
              We work to keep the site available and error-free, but we do not
              guarantee uninterrupted access. To the extent permitted by law,
              BCON is not liable for loss arising from the use of, or reliance
              on, information published on this website.
            </p>
          ),
        },
        {
          heading: 'Governing law',
          body: (
            <p>
              These terms are governed by the laws of the jurisdiction in which
              BCON is registered. Questions about them can be sent to{' '}
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
      ]}
    />
  )
}
