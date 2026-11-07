import { z } from 'zod'

/**
 * Honeypot field name. Real users never see it and never fill it in.
 */
export const HONEYPOT_FIELD = 'website'

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name')
    .max(100, 'Please keep this under 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(200, 'Please keep this under 200 characters'),
  company: z
    .string()
    .trim()
    .max(150, 'Please keep this under 150 characters')
    .optional(),
  phone: z
    .string()
    .trim()
    .max(40, 'Please keep this under 40 characters')
    .optional(),
  service: z
    .string()
    .trim()
    .min(1, 'Please choose the service you need')
    .max(100),
  message: z
    .string()
    .trim()
    .min(20, 'Please describe your project in a little more detail')
    .max(4000, 'Please keep this under 4000 characters'),
  /** Honeypot — must stay empty. Checked in the server handler, not here. */
  website: z.string().max(500).optional().default(''),
  /** Epoch ms captured when the form was rendered, used for the timing check. */
  startedAt: z.number().int().nonnegative(),
})

export type EnquiryInput = z.input<typeof enquirySchema>
export type EnquiryData = z.output<typeof enquirySchema>

export const serviceOptions = [
  'Web Development',
  'UI/UX & Digital Design',
  'Technology Modernization',
  'ERP & CRM Solutions',
  'Custom Software Development',
  'Digital Marketing & Growth',
  'Not sure yet',
] as const
