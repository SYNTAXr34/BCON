import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Package,
  ShoppingBag,
  Truck,
  Users,
} from 'lucide-react'

export type Industry = {
  slug: string
  name: string
  icon: LucideIcon
  summary: string
  /** The pressures this sector operates under. */
  pressures: string[]
  /** How BCON's capability set maps onto them. */
  approaches: { title: string; description: string }[]
  /** Typical first engagements. */
  engagements: string[]
}

export const industries: Industry[] = [
  {
    slug: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    icon: ShoppingBag,
    summary:
      'Storefronts that load fast on a phone in a signal-poor shop, and back-office systems that keep stock honest across every channel.',
    pressures: [
      'Mobile shoppers abandon pages that take more than a few seconds to load.',
      'Stock levels drift apart between the storefront, the warehouse and the marketplace.',
      'Seasonal campaigns require site changes that need a developer every time.',
      'Peak trading periods expose performance limits that were never tested.',
    ],
    approaches: [
      {
        title: 'Storefront performance',
        description:
          'Server-rendered catalog pages, image pipelines and caching tuned so seasonal traffic does not degrade the experience.',
      },
      {
        title: 'Connected commerce',
        description:
          'Inventory, orders and customer records unified across channels so what the customer sees is what the warehouse has.',
      },
      {
        title: 'Campaign agility',
        description:
          'Landing pages and merchandising that marketing can publish without a code release.',
      },
    ],
    engagements: [
      'E-commerce build',
      'Performance optimization',
      'ERP & inventory integration',
    ],
  },
  {
    slug: 'manufacturing-distribution',
    name: 'Manufacturing & Distribution',
    icon: Factory,
    summary:
      'Production, stock and supplier systems that behave predictably when the plan changes mid-week.',
    pressures: [
      'Bills of material, production orders and stock live in separate systems.',
      'Changes to a production plan ripple through orders nobody can see.',
      'Field and plant teams record the same data twice, in different formats.',
      'Reporting takes longer to produce than the decisions it is meant to support.',
    ],
    approaches: [
      {
        title: 'Operational ERP',
        description:
          'A single model for production, stock and suppliers, with workflow automation replacing manual re-keying.',
      },
      {
        title: 'Plant and field tooling',
        description:
          'Interfaces built for the environments they are used in, including handheld and offline-capable access.',
      },
      {
        title: 'Live reporting',
        description:
          'Dashboards that read from operational data directly, so the numbers are current when the meeting starts.',
      },
    ],
    engagements: [
      'Custom ERP',
      'Inventory management system',
      'Legacy modernization',
    ],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    icon: Users,
    summary:
      'Digital presence and internal tooling for firms whose credibility is the product.',
    pressures: [
      'The website no longer reflects how the firm actually works.',
      'New business comes through referrals, with no system to capture it.',
      'Time and billing live in spreadsheets that only one person understands.',
      'Onboarding new clients has no repeatable process.',
    ],
    approaches: [
      {
        title: 'Authority-building website',
        description:
          'Clear positioning, structured case material and a path to inquiry that matches how clients buy professional advice.',
      },
      {
        title: 'Client and pipeline CRM',
        description:
          'A lightweight CRM that captures inquiries, tracks opportunities and makes referral relationships visible.',
      },
      {
        title: 'Delivery tooling',
        description:
          'Engagement management, resourcing and knowledge systems fitted to the firm’s own method.',
      },
    ],
    engagements: [
      'Corporate website',
      'CRM development',
      'Custom client portal',
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: HeartPulse,
    summary:
      'Patient-facing and internal systems built around privacy, clarity and accessibility.',
    pressures: [
      'Disjointed systems mean patients repeat information at every contact.',
      'Strict privacy and compliance requirements constrain how data can be moved.',
      'Interfaces must work for staff of very different levels of digital confidence.',
      'Legacy systems limit what can be digitized safely.',
    ],
    approaches: [
      {
        title: 'Accessible interfaces',
        description:
          'Every screen designed to WCAG AA as a baseline, because patients and staff use a wide range of devices and abilities.',
      },
      {
        title: 'Consent-aware data',
        description:
          'Data flows designed around explicit consent, with access controls and audit trails built in from the start.',
      },
      {
        title: 'Care pathway tooling',
        description:
          'Systems that connect appointments, records and follow-up so patients do not fall between services.',
      },
    ],
    engagements: [
      'Patient portal',
      'Accessibility audit & remediation',
      'System integration',
    ],
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    icon: Landmark,
    summary:
      'Secure, auditable platforms and interfaces built for regulated environments.',
    pressures: [
      'Legacy cores are expensive to change and risky to touch.',
      'Compliance and audit requirements slow down every release.',
      'Customer journeys span systems that were never designed to work together.',
      'Onboarding is slow, and abandonment happens quietly.',
    ],
    approaches: [
      {
        title: 'Incremental modernization',
        description:
          'Phased migration with regression testing around every change, so nothing that matters is put at risk.',
      },
      {
        title: 'Auditability by design',
        description:
          'Role-based access, immutable logs and traceable workflows built into the system rather than added later.',
      },
      {
        title: 'Journey integration',
        description:
          'Onboarding and servicing flows that cross institutional boundaries without asking customers to repeat themselves.',
      },
    ],
    engagements: [
      'Legacy modernization',
      'Compliance-ready platforms',
      'Customer onboarding systems',
    ],
  },
  {
    slug: 'education-training',
    name: 'Education & Training',
    icon: GraduationCap,
    summary:
      'Learning platforms and enrolment journeys that work on the devices students actually own.',
    pressures: [
      'Courses are delivered from platforms that were never designed for learning.',
      'Administrative reporting consumes staff time that should go to teaching.',
      'Content lives in formats that are hard to reuse and impossible to track.',
      'Budget constraints rule out large platform replacements.',
    ],
    approaches: [
      {
        title: 'Course delivery',
        description:
          'Learning experiences designed for completion rates, not just content volume, with progress tracked properly.',
      },
      {
        title: 'Enrolment and administration',
        description:
          'Registration, assessment and reporting brought into one coherent system.',
      },
      {
        title: 'Measurable engagement',
        description:
          'Analytics that show where learners stop, so content improves based on behavior rather than assumption.',
      },
    ],
    engagements: [
      'Learning platform',
      'Enrolment system',
      'Content strategy & SEO',
    ],
  },
  {
    slug: 'hospitality-travel',
    name: 'Hospitality & Travel',
    icon: Hotel,
    summary:
      'Booking experiences and guest systems designed to convert on a phone, and run on site without IT support.',
    pressures: [
      'Booking journeys are long, and every extra step loses guests.',
      'Property management, channel and booking systems do not reconcile.',
      'Guest-facing content changes need to go live the same day.',
      'Seasonal staffing means systems must be learnable quickly.',
    ],
    approaches: [
      {
        title: 'Conversion-focused booking',
        description:
          'Booking journeys designed around the guest’s decision, with friction measured and removed deliberately.',
      },
      {
        title: 'Channel integration',
        description:
          'Availability and rates kept consistent across every channel, without manual reconciliation.',
      },
      {
        title: 'Fast content changes',
        description:
          'Offers, events and seasonal content published by the team, not the agency.',
      },
    ],
    engagements: [
      'Booking experience rebuild',
      'PMS integration',
      'Conversion optimization',
    ],
  },
  {
    slug: 'real-estate-property',
    name: 'Real Estate & Property',
    icon: Building2,
    summary:
      'Listing and management platforms that keep the marketing site and the operational data in agreement.',
    pressures: [
      'Listings live on a marketing site while management happens in a separate system.',
      'Large property portfolios are slow to publish and slow to update.',
      'Prospects need self-serve tools, and there is no way to prioritize them.',
      'Portfolio reporting requires manual consolidation each month.',
    ],
    approaches: [
      {
        title: 'Portfolio publishing',
        description:
          'Listings, availability and media managed once and published everywhere, including to partner portals.',
      },
      {
        title: 'Lead capture and routing',
        description:
          'Inquiries qualified, assigned and tracked from the first contact.',
      },
      {
        title: 'Owner reporting',
        description:
          'Performance and financials assembled automatically for every property in the portfolio.',
      },
    ],
    engagements: ['Property portal', 'Listing platform', 'CRM & lead routing'],
  },
  {
    slug: 'logistics-supply-chain',
    name: 'Logistics & Supply Chain',
    icon: Truck,
    summary:
      'Tracking, planning and workflow systems that hold up when the plan changes mid-route.',
    pressures: [
      'Visibility stops at the first handover between carriers and partners.',
      'Planning tools live in spreadsheets that only planners fully understand.',
      'Proof of delivery and invoicing are reconciled manually.',
      'Real-time updates are promised but rarely delivered.',
    ],
    approaches: [
      {
        title: 'End-to-end visibility',
        description:
          'A single timeline from dispatch to delivery, with exceptions surfaced rather than buried.',
      },
      {
        title: 'Planning tooling',
        description:
          'Constraint-aware planning that the team can adjust, instead of a black box that produces a plan nobody trusts.',
      },
      {
        title: 'Automated reconciliation',
        description:
          'Proof of delivery and billing matched automatically, with discrepancies flagged for review.',
      },
    ],
    engagements: ['Custom platform', 'Workflow automation', 'API integration'],
  },
  {
    slug: 'saas-technology',
    name: 'SaaS & Technology',
    icon: Package,
    summary:
      'Product engineering, design systems and internal platforms for software companies shipping at speed.',
    pressures: [
      'Release velocity is limited by a codebase nobody wants to touch.',
      'The design system and the product have drifted apart.',
      'Internal tooling is rebuilt repeatedly by each new team.',
      'Infrastructure costs grow faster than revenue.',
    ],
    approaches: [
      {
        title: 'Product engineering',
        description:
          'Feature development on a codebase with the tests, pipeline and documentation to keep pace.',
      },
      {
        title: 'Design system delivery',
        description:
          'A component library with real states and usage rules, adopted by design and engineering together.',
      },
      {
        title: 'Platform consolidation',
        description:
          'Shared internal services replacing per-team duplicates, reducing both cost and duplication.',
      },
    ],
    engagements: [
      'Custom software',
      'Design systems',
      'Platform modernization',
    ],
  },
]

export const getIndustry = (slug: string) =>
  industries.find((industry) => industry.slug === slug)
