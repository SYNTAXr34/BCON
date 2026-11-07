/**
 * Single source of truth for company identity, contact details and navigation.
 * Swap the PLACEHOLDER values below with real details before launch.
 */

export const siteConfig = {
  name: 'BCON',
  legalName: 'BCON Technologies',
  tagline: 'Your Vision. Our Technology. Better Business.',
  motto: ['Build', 'Modernize', 'Maintain', 'Grow'],
  description:
    'BCON builds and modernizes digital solutions for businesses — from high-performance websites to custom ERP, CRM and business software.',
  url: 'https://bcon.example.com',
  locale: 'en',
} as const

/**
 * Contact channels. `email` and `phone` are placeholders — the inquiry form
 * will not deliver anywhere until these are replaced and the mail provider
 * is configured (see src/server/enquiry.ts).
 */
export const contactConfig = {
  email: 'hello@bcon.example.com',
  phone: '+00 000 000 0000',
  phoneHref: '+000000000000',
  whatsapp: '',
  address: {
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
  },
  /** Business hours shown on the contact page. */
  hours: 'Monday – Friday, 09:00 – 18:00',
}

export const socialConfig = {
  linkedin: '',
  x: '',
  github: '',
  instagram: '',
}

export type NavItem = {
  label: string
  to: string
  description?: string
}

export const servicesNav: NavItem[] = [
  {
    label: 'Web Development',
    to: '/services/web-development',
    description: 'Business websites, e-commerce and custom web applications.',
  },
  {
    label: 'UI/UX & Digital Design',
    to: '/services/ui-ux-design',
    description: 'Research, interface design and scalable design systems.',
  },
  {
    label: 'Technology Modernization',
    to: '/services/technology-modernization',
    description: 'Legacy migration, stack upgrades and performance work.',
  },
  {
    label: 'ERP & CRM Solutions',
    to: '/services/erp-crm-solutions',
    description: 'Custom ERP, CRM, inventory and workflow automation.',
  },
  {
    label: 'Custom Software',
    to: '/services/custom-software',
    description: 'Purpose-built platforms, integrations and internal tools.',
  },
  {
    label: 'Digital Marketing',
    to: '/services/digital-marketing',
    description: 'SEO, conversion optimization and content strategy.',
  },
]

export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Projects', to: '/projects' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav = {
  company: [
    { label: 'About BCON', to: '/about' },
    { label: 'Industries', to: '/industries' },
    { label: 'Projects', to: '/projects' },
    { label: 'Insights', to: '/insights' },
    { label: 'Contact', to: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '/legal/privacy' },
    { label: 'Terms of Use', to: '/legal/terms' },
  ],
} as const
