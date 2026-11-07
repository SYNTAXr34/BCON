/**
 * Portfolio entries.
 *
 * `status` distinguishes work that can be shown as a client engagement from
 * demonstration builds produced by BCON. Both are labeled on screen so the
 * distinction is never left to guesswork.
 */
export type ProjectStatus = 'demonstration' | 'client'

export type Project = {
  slug: string
  name: string
  status: ProjectStatus
  /** One-line description shown on the card. */
  summary: string
  /** What the build actually does. */
  detail: string
  /** The specific problem it was built to solve. */
  challenge: string
  /** The technologies and disciplines involved. */
  stack: string[]
  /** Which service lines it demonstrates. */
  services: string[]
  /** Optional externally reachable URL. */
  url?: string
}

export const projects: Project[] = [
  {
    slug: 'meridian-commerce',
    name: 'Meridian Commerce',
    status: 'demonstration',
    summary:
      'A storefront reference build for multi-category retail — fast on mobile, and structured so merchandising happens without a deploy.',
    detail:
      'A full commerce front end with category navigation, filtering, product detail, cart and checkout flows, built to demonstrate BCON’s approach to performance and to handing marketing control of content.',
    challenge:
      'Demonstrating how a catalog-heavy storefront can stay fast while giving a non-technical team day-to-day control of merchandising.',
    stack: [
      'React',
      'TanStack Start',
      'TypeScript',
      'Tailwind CSS',
      'Server rendering',
    ],
    services: ['Web Development', 'UI/UX & Digital Design'],
  },
  {
    slug: 'atlas-ops-console',
    name: 'Atlas Operations Console',
    status: 'demonstration',
    summary:
      'An internal operations console for distribution — stock, orders and supplier status in one live view.',
    detail:
      'A multi-module internal application with role-based access, live operational dashboards and workflow automation for order exceptions.',
    challenge:
      'Demonstrating how a bespoke ERP front end can replace spreadsheet-based coordination without replacing the systems underneath.',
    stack: ['React', 'TanStack Start', 'TypeScript', 'Zod', 'Server functions'],
    services: ['ERP & CRM Solutions', 'Custom Software Development'],
  },
  {
    slug: 'northwind-legacy-migration',
    name: 'Northwind Platform Migration',
    status: 'demonstration',
    summary:
      'A reference migration from a legacy server-rendered stack to a modern, observable application architecture.',
    detail:
      'A worked example of phased modernization — incremental delivery, regression-tested changes and an audit trail showing what changed and why.',
    challenge:
      'Demonstrating that modernization does not require a high-risk rewrite, and that each phase leaves the system in a working state.',
    stack: ['TypeScript', 'TanStack Start', 'Testing', 'CI/CD'],
    services: ['Technology Modernization'],
  },
  {
    slug: 'signal-design-system',
    name: 'Signal Design System',
    status: 'demonstration',
    summary:
      'A component library and documentation set demonstrating accessible, production-ready interface patterns.',
    detail:
      'A token-driven component library with defined states, dark and light variants, keyboard interaction patterns and written usage guidance.',
    challenge:
      'Demonstrating how a design system prevents an interface from drifting as a product grows and more people work on it.',
    stack: ['React', 'TypeScript', 'Radix UI', 'Tailwind CSS', 'Storybook'],
    services: ['UI/UX & Digital Design'],
  },
  {
    slug: 'bastion-secure-portal',
    name: 'Bastion Client Portal',
    status: 'demonstration',
    summary:
      'A client-facing portal demonstrating audit trails, role-based access and clear status communication.',
    detail:
      'A secure document and case portal with per-client isolation, access audit trails and a status model that removes the need for status-update emails.',
    challenge:
      'Demonstrating how regulated sectors can give clients visibility without exposing data they should not see.',
    stack: ['React', 'TanStack Start', 'TypeScript', 'Zod', 'RBAC'],
    services: ['Custom Software Development', 'ERP & CRM Solutions'],
  },
  {
    slug: 'lumen-performance-audit',
    name: 'Lumen Performance Program',
    status: 'demonstration',
    summary:
      'A performance and SEO engagement model, from baseline measurement through prioritized remediation.',
    detail:
      'A structured audit framework covering Core Web Vitals, crawlability, metadata, internal linking and structured data — the same method BCON applies to live engagements.',
    challenge:
      'Demonstrating that marketing investment compounds when the technical foundation is fixed first.',
    stack: ['Core Web Vitals', 'Structured data', 'Technical SEO', 'Analytics'],
    services: ['Digital Marketing', 'Technology Modernization'],
  },
]

export const projectStatusLabel: Record<ProjectStatus, string> = {
  demonstration: 'Demonstration build',
  client: 'Client engagement',
}

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug)
