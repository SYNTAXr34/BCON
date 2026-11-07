import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { contactConfig } from '@/config/site'
import { enquirySchema } from '@/lib/enquiry-schema'

export type EnquiryDelivery = 'email' | 'whatsapp' | 'none'

export type EnquiryResult = {
  ok: boolean
  deliveredVia: EnquiryDelivery[]
  /** Prefilled WhatsApp link, present when WhatsApp is the only channel. */
  whatsappUrl?: string
  /** Human-readable outcome shown to the visitor. */
  message: string
  /** Field-level validation messages. */
  fieldErrors?: Record<string, string>
}

/** Minimum time between rendering and submitting, in ms. Below this we treat the submission as automated. */
const MIN_SUBMIT_DURATION_MS = 1200
/** Submissions allowed per IP per window. */
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

const rateLimitStore = new Map<string, number[]>()

function getClientIp(headers: Headers) {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown'
  return headers.get('x-real-ip') ?? 'unknown'
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const timestamps = (rateLimitStore.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  )

  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  rateLimitStore.set(ip, timestamps)
  return false
}

function buildMessage(input: {
  name: string
  email: string
  company?: string
  phone?: string
  service: string
  message: string
}) {
  return [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.company ? `Company: ${input.company}` : null,
    input.phone ? `Phone: ${input.phone}` : null,
    `Service required: ${input.service}`,
    '',
    'Project details:',
    input.message,
  ]
    .filter((line) => line !== null)
    .join('\n')
}

function buildWhatsAppText(input: Parameters<typeof buildMessage>[0]) {
  return encodeURIComponent(
    [
      `New inquiry for BCON`,
      ``,
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      input.company ? `Company: ${input.company}` : null,
      input.phone ? `Phone: ${input.phone}` : null,
      `Service required: ${input.service}`,
      ``,
      `Project details:`,
      input.message,
    ]
      .filter((line) => line !== null)
      .join('\n'),
  )
}

async function deliverByEmail(input: Parameters<typeof buildMessage>[0]) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_TO_EMAIL ?? contactConfig.email
  const from = process.env.ENQUIRY_FROM_EMAIL

  if (!apiKey || !from) return false

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `New ${input.service} inquiry — ${input.name}`,
      text: buildMessage(input),
    }),
  })

  if (!response.ok) {
    console.error('[inquiry] email delivery failed', response.status)
    return false
  }

  return true
}

async function deliverByWhatsApp(input: Parameters<typeof buildMessage>[0]) {
  const token = process.env.WHATSAPP_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const to = process.env.WHATSAPP_TO_NUMBER

  if (!token || !phoneNumberId || !to) return false

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: buildMessage(input) },
      }),
    },
  )

  if (!response.ok) {
    console.error('[inquiry] whatsapp delivery failed', response.status)
    return false
  }

  return true
}

export const submitEnquiry = createServerFn({ method: 'POST' })
  .validator(enquirySchema)
  .handler(async ({ data }): Promise<EnquiryResult> => {
    const headers = getRequestHeaders()
    const ip = getClientIp(headers)

    if (isRateLimited(ip)) {
      return {
        ok: false,
        deliveredVia: [],
        message:
          'Too many inquiries have been sent from this connection. Please try again in a few minutes, or email us directly.',
      }
    }

    const elapsed = Date.now() - data.startedAt
    const looksAutomated =
      data.website !== '' || elapsed < MIN_SUBMIT_DURATION_MS

    if (looksAutomated) {
      // Accept silently so automated clients do not learn what triggered it.
      return {
        ok: true,
        deliveredVia: [],
        message:
          'Thank you — your inquiry has been received. We will be in touch shortly.',
      }
    }

    const payload = {
      name: data.name,
      email: data.email,
      company: data.company || undefined,
      phone: data.phone || undefined,
      service: data.service,
      message: data.message,
    }

    const deliveredVia: EnquiryDelivery[] = []

    const [emailed, whatsapped] = await Promise.all([
      deliverByEmail(payload),
      deliverByWhatsApp(payload),
    ])

    if (emailed) deliveredVia.push('email')
    if (whatsapped) deliveredVia.push('whatsapp')

    if (deliveredVia.length === 0) {
      // WhatsApp "click to chat" fallback: hand a prefilled link back to the browser.
      const whatsappNumber =
        process.env.WHATSAPP_NUMBER ?? contactConfig.whatsapp
      if (whatsappNumber) {
        return {
          ok: true,
          deliveredVia: ['none'],
          whatsappUrl: `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${buildWhatsAppText(payload)}`,
          message:
            'Your inquiry is ready to send. Continue in WhatsApp to deliver it to our team.',
        }
      }

      console.log(
        '[inquiry] recorded (no delivery channel configured)',
        payload,
      )

      return {
        ok: true,
        deliveredVia: ['none'],
        message:
          'Your inquiry has been recorded. Our email delivery is not yet configured on this site, so please email us directly and we will respond straight away.',
      }
    }

    return {
      ok: true,
      deliveredVia,
      message:
        'Thank you — your inquiry has been sent. We will review it and get back to you shortly.',
    }
  })
