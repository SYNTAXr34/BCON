import { Link } from '@tanstack/react-router'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'

import { Logo } from '@/components/layout/logo'
import {
  contactConfig,
  footerNav,
  servicesNav,
  siteConfig,
  socialConfig,
} from '@/config/site'
import { cn } from 'cn'

const socialLinks = [
  { label: 'LinkedIn', href: socialConfig.linkedin },
  { label: 'X', href: socialConfig.x },
  { label: 'GitHub', href: socialConfig.github },
  { label: 'Instagram', href: socialConfig.instagram },
].filter((social) => social.href)

const addressLines = [
  contactConfig.address.street,
  contactConfig.address.city,
  contactConfig.address.region,
  contactConfig.address.postalCode,
  contactConfig.address.country,
].filter(Boolean)

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          <div className="max-w-sm">
            <Logo heightClass="h-11" />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            {socialLinks.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="eyebrow text-muted-foreground">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {servicesNav.map((service) => (
                <li key={service.to}>
                  <Link
                    to={service.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="eyebrow text-muted-foreground">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-muted-foreground">Contact</h2>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="group flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-brand/70"
                    aria-hidden="true"
                  />
                  {contactConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactConfig.phoneHref}`}
                  className="group flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone
                    className="mt-0.5 size-4 shrink-0 text-brand/70"
                    aria-hidden="true"
                  />
                  {contactConfig.phone}
                </a>
              </li>
              {addressLines.length > 0 ? (
                <li className="flex items-start gap-2.5 text-muted-foreground">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-brand/70"
                    aria-hidden="true"
                  />
                  <span className="flex flex-col">
                    {addressLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </li>
              ) : null}
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <Clock
                  className="mt-0.5 size-4 shrink-0 text-brand/70"
                  aria-hidden="true"
                />
                {contactConfig.hours}
              </li>
            </ul>
          </div>
        </div>

        <div
          className={cn(
            'mt-14 flex flex-col gap-4 border-t border-border pt-8',
            'sm:flex-row sm:items-center sm:justify-between',
          )}
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerNav.legal.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
