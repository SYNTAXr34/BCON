import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  TriangleAlert,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { EnquiryInput } from '@/lib/enquiry-schema'
import {
  HONEYPOT_FIELD,
  enquirySchema,
  serviceOptions,
} from '@/lib/enquiry-schema'
import type { EnquiryResult } from '@/server/enquiry'
import { submitEnquiry } from '@/server/enquiry'
import { cn } from 'cn'

const fieldClass = 'h-11 rounded-md bg-white/[0.03] px-3'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-xs text-destructive">
      {message}
    </p>
  )
}

export function EnquiryForm() {
  const [result, setResult] = useState<EnquiryResult | null>(null)
  const startedAt = useRef(0)

  const form = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: '',
      website: '',
      startedAt: 0,
    },
  })

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = handleSubmit(async (values) => {
    setResult(null)

    try {
      const response = await submitEnquiry({
        data: {
          ...values,
          startedAt: startedAt.current || Date.now(),
        },
      })
      setResult(response)

      if (response.ok && response.deliveredVia.length > 0) {
        reset()
        startedAt.current = Date.now()
      }
    } catch {
      setResult({
        ok: false,
        deliveredVia: [],
        message:
          'Something went wrong while sending your inquiry. Please try again, or email us directly.',
      })
    }
  })

  if (result?.ok && result.deliveredVia.length > 0) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-5 rounded-xl border border-brand/30 bg-brand/[0.07] p-8"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-brand/15 text-brand">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground">
            Inquiry received
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
            {result.message}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setResult(null)}
          className="h-10 rounded-md border-border/80 bg-white/[0.03] px-5"
        >
          Send another inquiry
        </Button>
      </div>
    )
  }

  if (result?.ok && result.whatsappUrl) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-5 rounded-xl border border-brand/30 bg-brand/[0.07] p-8"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-brand/15 text-brand">
          <MessageCircle className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground">
            One last step
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
            {result.message}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-11 rounded-md px-6">
            <a
              href={result.whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Open WhatsApp
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setResult(null)}
            className="h-11 rounded-md border-border/80 bg-white/[0.03] px-6"
          >
            Back to the form
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {result && !result.ok ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-destructive/35 bg-destructive/10 p-4"
        >
          <TriangleAlert
            className="mt-0.5 size-4.5 shrink-0 text-destructive"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-foreground/90">
            {result.message}
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(fieldClass, errors.name && 'border-destructive')}
            {...register('name')}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>

        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(fieldClass, errors.email && 'border-destructive')}
            {...register('email')}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div>
          <Label
            htmlFor="company"
            className="text-sm font-medium text-foreground"
          >
            Company <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="company"
            autoComplete="organization"
            placeholder="Company name"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={cn(fieldClass, errors.company && 'border-destructive')}
            {...register('company')}
          />
          <FieldError id="company-error" message={errors.company?.message} />
        </div>

        <div>
          <Label
            htmlFor="phone"
            className="text-sm font-medium text-foreground"
          >
            Phone <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+00 000 000 0000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={cn(fieldClass, errors.phone && 'border-destructive')}
            {...register('phone')}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <Label
          htmlFor="service"
          className="text-sm font-medium text-foreground"
        >
          Service required <span className="text-destructive">*</span>
        </Label>
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="service"
                onBlur={field.onBlur}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? 'service-error' : undefined}
                className={cn(
                  fieldClass,
                  'w-full justify-between bg-white/[0.03] text-base',
                  !field.value && 'text-muted-foreground',
                  errors.service && 'border-destructive',
                )}
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError id="service-error" message={errors.service?.message} />
      </div>

      <div>
        <Label
          htmlFor="message"
          className="text-sm font-medium text-foreground"
        >
          Project description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          rows={7}
          placeholder="What are you trying to achieve, what exists today, and what is not working?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'message-error message-hint' : 'message-hint'
          }
          className={cn(
            'rounded-md bg-white/[0.03] px-3 py-3 leading-relaxed',
            errors.message && 'border-destructive',
          )}
          {...register('message')}
        />
        {errors.message ? (
          <FieldError id="message-error" message={errors.message.message} />
        ) : (
          <p id="message-hint" className="mt-2 text-xs text-muted-foreground">
            A few sentences is enough to start. We will ask for detail later.
          </p>
        )}
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register(HONEYPOT_FIELD)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 rounded-md px-7 text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send inquiry'
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          We use your details only to respond to this inquiry.
        </p>
      </div>
    </form>
  )
}
