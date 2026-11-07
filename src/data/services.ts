import type { LucideIcon } from 'lucide-react'
import {
  Blocks,
  Code2,
  Gauge,
  Layers,
  LineChart,
  MonitorSmartphone,
} from 'lucide-react'

export type ServiceSlug =
  | 'web-development'
  | 'ui-ux-design'
  | 'technology-modernization'
  | 'erp-crm-solutions'
  | 'custom-software'
  | 'digital-marketing'

/**
 * Icons live outside the service records so the data stays serializable —
 * route loaders send this data across the SSR hydration boundary.
 */
export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  'web-development': Code2,
  'ui-ux-design': MonitorSmartphone,
  'technology-modernization': Layers,
  'erp-crm-solutions': Blocks,
  'custom-software': Gauge,
  'digital-marketing': LineChart,
}

export type Service = {
  slug: ServiceSlug
  name: string
  shortName: string
  /** One line used in cards and navigation. */
  summary: string
  /** The opening paragraph of the service page. */
  intro: string
  /** The problem statement block. */
  problems: { title: string; description: string }[]
  /** Our solution block. */
  solution: { title: string; description: string; points: string[] }
  capabilities: string[]
  benefits: { title: string; description: string }[]
  /** How the work is actually delivered. */
  process: { title: string; description: string }[]
  deliverables: string[]
  /** Industries this service is most often applied in. */
  industries: string[]
  /** Short call to action used at the end of the page. */
  cta: string
}

export const services: Service[] = [
  {
    slug: 'web-development',
    name: 'Web Development',
    shortName: 'Web Development',
    summary:
      'Business websites, e-commerce and custom web applications, engineered to be fast, accessible and easy to run.',
    intro:
      'Your website is the part of your business that works every hour of every day. We build it to load quickly, rank well, convert visitors into inquiries, and stay maintainable long after launch. That covers everything from a focused business website to a multi-product e-commerce storefront or a bespoke internal web application.',
    problems: [
      {
        title: 'The site is slow and visitors leave',
        description:
          'Unoptimized pages, oversized media and blocking scripts push you out of search results and cost you inquiries before the page has finished loading.',
      },
      {
        title: 'It no longer represents the business',
        description:
          'A site built years ago for a smaller company can hold back a team that has grown, rebranded or changed what it sells.',
      },
      {
        title: 'Content updates need a developer',
        description:
          'When a landing page, product or price cannot be changed without a code deploy, marketing loses the ability to move quickly.',
      },
      {
        title: 'The build is hard to extend',
        description:
          'One-off templates rarely survive a second feature, a new region, or a new team member taking over.',
      },
    ],
    solution: {
      title: 'A website your team can actually operate',
      description:
        'We build on a modern, well-supported stack and hand it over documented and structured so the next change is routine rather than a project.',
      points: [
        'Server-rendered pages that load fast on real devices and real networks.',
        'A component and content structure that makes routine updates straightforward.',
        'Accessibility built in from the first component, not patched on at the end.',
        'Analytics, search console and structured data wired in from day one.',
      ],
    },
    capabilities: [
      'Business and corporate websites',
      'B2B and B2C sites',
      'E-commerce storefronts and catalogs',
      'Custom web applications',
      'Landing pages and campaign sites',
      'Website redevelopment',
      'Website maintenance retainers',
      'Core Web Vitals and performance optimization',
      'Content management systems',
      'Third-party and payment integrations',
    ],
    benefits: [
      {
        title: 'Faster first impression',
        description:
          'Lean bundles, optimized assets and server rendering give visitors a page that responds immediately on mobile connections.',
      },
      {
        title: 'Findable in search',
        description:
          'Semantic structure, metadata and clean performance work together so the pages you want seen are the pages that rank.',
      },
      {
        title: 'Easier to change',
        description:
          'A structured codebase and clear content model mean updates happen without rewriting the site.',
      },
      {
        title: 'Owned by you',
        description:
          'You keep the code, the hosting and the domain. Nothing is held hostage by the agency that built it.',
      },
    ],
    process: [
      {
        title: 'Discovery',
        description:
          'We look at your goals, your customers and what already exists, and agree what the site has to achieve.',
      },
      {
        title: 'Strategy and structure',
        description:
          'Sitemap, page hierarchy and content plan are laid out before any visual work starts.',
      },
      {
        title: 'Design',
        description:
          'Responsive layouts and interface design are produced and reviewed against real content, not placeholders.',
      },
      {
        title: 'Develop',
        description:
          'The build proceeds in reviewable increments so you can see progress rather than wait for a reveal.',
      },
      {
        title: 'Test',
        description:
          'Cross-browser, device, accessibility and performance testing, with fixes applied before launch.',
      },
      {
        title: 'Deploy',
        description:
          'Staged production release with redirects, metadata and monitoring configured so nothing breaks on go-live.',
      },
      {
        title: 'Maintain and improve',
        description:
          'Ongoing updates, monitoring and iteration as the site gathers real usage data.',
      },
    ],
    deliverables: [
      'Responsive, accessible site built on a modern framework',
      'Documented codebase handed over in full',
      'CMS set up and configured for your team',
      'Analytics, search console and sitemap setup',
      'Performance and accessibility report',
    ],
    industries: [
      'Retail & E-commerce',
      'Professional Services',
      'Manufacturing',
      'Hospitality',
    ],
    cta: 'Tell us what your website needs to do, and we will map the path.',
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX & Digital Design',
    shortName: 'UI/UX & Design',
    summary:
      'Research-led interface design and design systems that make products easier to use and far easier to build.',
    intro:
      'Good design is not decoration — it is the difference between a product people complete and a product people abandon. We combine user research, interface design and design systems so the result is not only attractive in a presentation, but workable for your team and your users on the screens they actually use.',
    problems: [
      {
        title: 'Users cannot find what they came for',
        description:
          'Unclear hierarchy and unstructured navigation turn interested visitors into lost ones, usually at the point of decision.',
      },
      {
        title: 'The product works only for the people who built it',
        description:
          'When nobody observed real users, the interface encodes internal habits rather than customer behavior.',
      },
      {
        title: 'Every new screen is a fresh argument',
        description:
          'Without a shared system, each new page invents its own spacing, buttons and states, and the product drifts.',
      },
      {
        title: 'Design and development keep colliding',
        description:
          'Static mockups that ignore real content, real data and real states guarantee a rework phase later.',
      },
    ],
    solution: {
      title: 'Design grounded in evidence, delivered as a system',
      description:
        'We research the users and their tasks, design against real scenarios and constraints, and package the outcome in a design system that development can build from directly.',
      points: [
        'Research findings that justify design decisions rather than guesswork.',
        'Wireframes and interactive prototypes reviewed before visual design commits.',
        'A component library with states, variants and usage rules.',
        'Accessibility and responsive behavior specified at component level.',
      ],
    },
    capabilities: [
      'User research and usability testing',
      'Information architecture',
      'Wireframing',
      'Interactive prototyping',
      'UI design and visual systems',
      'Design systems and component libraries',
      'Website and product redesign',
      'Application interface design',
      'Responsive design',
      'Accessibility and inclusive design',
    ],
    benefits: [
      {
        title: 'Interfaces people complete',
        description:
          'Screens designed around real user tasks convert better than screens designed around internal structure.',
      },
      {
        title: 'Consistency across the product',
        description:
          'A design system removes the guesswork and makes every new feature look like it belongs.',
      },
      {
        title: 'Faster, cheaper builds',
        description:
          'Specified components mean less back-and-forth and fewer redesigns once development is underway.',
      },
      {
        title: 'Accessible by construction',
        description:
          'Contrast, focus states, target sizes and motion preferences are decided in the system, not retrofitted.',
      },
    ],
    process: [
      {
        title: 'Discover',
        description:
          'Interviews, observation and an audit of what already exists to find the real constraints.',
      },
      {
        title: 'Define',
        description:
          'User journeys and information architecture agreed and validated before visual work begins.',
      },
      {
        title: 'Wireframe',
        description:
          'Low-fidelity structure reviewed fast, so expensive decisions are made on cheap artefacts.',
      },
      {
        title: 'Prototype',
        description:
          'Interactive prototypes tested with real users to validate flows before visual polish.',
      },
      {
        title: 'Design',
        description:
          'High-fidelity visual design and the component system, reviewed in context on real devices.',
      },
      {
        title: 'Deliver',
        description:
          'Assets, specs and tokens handed to development with a documented handoff.',
      },
      {
        title: 'Evolve',
        description:
          'The system is maintained as a living product, with patterns extended rather than duplicated.',
      },
    ],
    deliverables: [
      'Research summary with actionable findings',
      'Information architecture and user flows',
      'Wireframes and interactive prototype',
      'High-fidelity responsive designs',
      'Component library and usage documentation',
    ],
    industries: [
      'SaaS & Software',
      'Healthcare',
      'Financial Services',
      'Education',
    ],
    cta: 'Share your product or website with us and we will show you where the friction is.',
  },
  {
    slug: 'technology-modernization',
    name: 'Technology Modernization',
    shortName: 'Modernization',
    summary:
      'Legacy migration, stack upgrades and restructuring that remove the risk and cost of holding on to old technology.',
    intro:
      'Most business software is not failing because it was badly built — it is failing because it was built for a business that no longer exists. We modernize systems in place: keeping what works, replacing what does not, and leaving you with a platform your current team can maintain.',
    problems: [
      {
        title: 'The original developers are gone',
        description:
          'Knowledge of how the system works left with people who built it, and every change now carries risk.',
      },
      {
        title: 'Upgrades are blocked',
        description:
          'An outdated framework or unsupported runtime means security patches and features cannot be applied.',
      },
      {
        title: 'Performance degrades as data grows',
        description:
          'Queries, reports and workflows slow to a crawl once the database passes a certain size.',
      },
      {
        title: 'The system constrains the business',
        description:
          'Features the roadmap needs cannot be delivered because the underlying architecture will not allow it.',
      },
    ],
    solution: {
      title: 'Modernization without a rewrite gamble',
      description:
        'We audit the estate, modernize the highest-risk areas first, and use the process to lift performance and reduce cost as we go.',
      points: [
        'A clear assessment of risk, cost and effort before any code changes.',
        'Incremental migration so the business keeps running throughout.',
        'Targeted replacement of the components that actually cause the risk.',
        'Modern tooling, automated tests and documentation to support future change.',
      ],
    },
    capabilities: [
      'Legacy code and application audit',
      'Application migration and re-platforming',
      'Frontend and backend modernization',
      'Technology stack upgrades',
      'Database schema and platform migration',
      'Performance optimization',
      'Application restructuring',
      'API integration and service extraction',
      'Technical debt reduction',
      'Developer documentation and handover',
    ],
    benefits: [
      {
        title: 'Lower running cost',
        description:
          'Modern supported platforms cost less to host, license and maintain than the systems they replace.',
      },
      {
        title: 'Reduced risk',
        description:
          'Unsupported frameworks and libraries are one of the most common avoidable causes of downtime.',
      },
      {
        title: 'Room to grow',
        description:
          'A current architecture lets new features ship without a rebuild.',
      },
      {
        title: 'A maintainable codebase',
        description:
          'Documented, tested code means the next change is a normal engineering task, not an incident.',
      },
    ],
    process: [
      {
        title: 'Audit',
        description:
          'We inspect the codebase, infrastructure, dependencies and data flows to find the real constraints.',
      },
      {
        title: 'Assess',
        description:
          'You get a prioritized assessment: what is urgent, what is valuable, and what can wait.',
      },
      {
        title: 'Plan',
        description:
          'A phased roadmap that sequences the work so each phase leaves the system in a working state.',
      },
      {
        title: 'Migrate',
        description:
          'Incremental delivery with regression testing around every change.',
      },
      {
        title: 'Optimize',
        description:
          'Targeted performance work on the paths that matter to the business.',
      },
      {
        title: 'Stabilize',
        description:
          'Testing, monitoring and documentation to make the new state dependable.',
      },
      {
        title: 'Maintain',
        description:
          'Ongoing upgrades and support so the platform does not drift back into the same problem.',
      },
    ],
    deliverables: [
      'Technical assessment with a prioritized roadmap',
      'Phased migration executed against that roadmap',
      'Automated test coverage for critical paths',
      'Updated infrastructure and deployment pipeline',
      'Developer and operations documentation',
    ],
    industries: [
      'Financial Services',
      'Manufacturing',
      'Healthcare',
      'Public Sector',
    ],
    cta: 'If your current system is holding you back, we will tell you exactly where.',
  },
  {
    slug: 'erp-crm-solutions',
    name: 'ERP & CRM Solutions',
    shortName: 'ERP & CRM',
    summary:
      'Custom ERP, CRM, inventory and workflow systems that fit how your business actually operates.',
    intro:
      'Off-the-shelf business software assumes your process matches the vendor’s. When it does not, teams end up working around the software — in spreadsheets, in chat messages, in memory. We build ERP and CRM systems around the way you already work, so the software supports the business instead of dictating to it.',
    problems: [
      {
        title: 'The real process lives in spreadsheets',
        description:
          'Orders, stock levels and customer records are spread across files that only one person fully understands.',
      },
      {
        title: 'Systems do not talk to each other',
        description:
          'Sales, stock and accounting live in separate tools, so every handoff is a manual copy and a chance for error.',
      },
      {
        title: 'No single source of truth',
        description:
          'Teams report different numbers because each one is working from their own version of the data.',
      },
      {
        title: 'Generic software bends badly',
        description:
          'Forcing an unusual process into a standard product produces workarounds that cost more than a purpose-built system.',
      },
    ],
    solution: {
      title: 'Business software built around your process',
      description:
        'We map the current process, identify what should be automated and where human judgement should stay, then build a system that reflects the result.',
      points: [
        'Process mapping before any software is written.',
        'One authoritative record per entity, shared across the modules that need it.',
        'Automation for the repetitive work, with clear visibility when something needs a person.',
        'Reporting that draws from live data instead of end-of-week exports.',
      ],
    },
    capabilities: [
      'Custom ERP development',
      'CRM development and pipeline management',
      'Inventory and stock management',
      'Customer and supplier management',
      'Workflow automation',
      'Business process digitization',
      'Reporting and business dashboards',
      'Custom software integrations',
      'Role-based access and audit trails',
      'Document and quote generation',
    ],
    benefits: [
      {
        title: 'One version of the truth',
        description:
          'Shared records remove the reconciliation work that eats the week at the end of every month.',
      },
      {
        title: 'Fewer manual handoffs',
        description:
          'Automating the steps between systems removes the copy-paste errors that quietly cost money.',
      },
      {
        title: 'Built around your operation',
        description:
          'The software matches the way the business works, so adoption does not depend on everyone changing how they work.',
      },
      {
        title: 'Scales with the business',
        description:
          'Custom systems are designed to absorb growth in volume, headcount and complexity.',
      },
    ],
    process: [
      {
        title: 'Process discovery',
        description:
          'We document how work and information actually move through the business today.',
      },
      {
        title: 'Requirements',
        description:
          'Modules, roles, data model and reporting requirements are agreed and signed off.',
      },
      {
        title: 'Architecture',
        description:
          'Data model, integrations and technical foundation are designed before feature work begins.',
      },
      {
        title: 'Build',
        description:
          'Delivered in functional slices, each one usable and reviewable on its own.',
      },
      {
        title: 'Integrate',
        description:
          'Connections to accounting, payments, email and existing tools are implemented and verified.',
      },
      {
        title: 'Trial and train',
        description:
          'A live pilot with real users, followed by role-based training and handover.',
      },
      {
        title: 'Support and extend',
        description:
          'Post-launch support with a roadmap for the modules and reports you will need next.',
      },
    ],
    deliverables: [
      'Documented process map and data model',
      'Working ERP or CRM system with your core modules',
      'Integration layer for your existing tools',
      'Role-based access model and audit trail',
      'Live dashboards and scheduled reporting',
      'Training sessions and administrator documentation',
    ],
    industries: [
      'Manufacturing',
      'Distribution',
      'Professional Services',
      'Real Estate',
    ],
    cta: 'Describe the process that keeps breaking, and we will design the system that fixes it.',
  },
  {
    slug: 'custom-software',
    name: 'Custom Software Development',
    shortName: 'Custom Software',
    summary:
      'Purpose-built platforms, integrations and internal tools for problems no off-the-shelf product solves.',
    intro:
      'Some problems simply have no ready-made answer. A platform built around a distinctive commercial model, an internal tool that connects systems nobody else connects, a workflow that has to work exactly your way — these are what custom software is for. We build systems that are deliberately yours, and that remain maintainable after we hand them over.',
    problems: [
      {
        title: 'No product fits the way you work',
        description:
          'Closest-fit software always leaves your team working around it, and the workaround costs more than the license.',
      },
      {
        title: 'Your systems cannot talk to each other',
        description:
          'Critical data is moved by hand between tools that were never designed to integrate.',
      },
      {
        title: 'Growth has outgrown the tools',
        description:
          'Manual processes that were fine at ten people now consume the week at fifty.',
      },
      {
        title: 'Ownership is unclear',
        description:
          'Custom-built tools created years ago have no documentation and no original authors left.',
      },
    ],
    solution: {
      title: 'Software that is genuinely specific to you',
      description:
        'We scope tightly, build in visible increments and design every component to be documented and maintainable.',
      points: [
        'A short, deliberate scope that delivers a complete working slice before widening.',
        'Clean separation of concerns so parts can be replaced without a rebuild.',
        'Documentation, tests and a deployment pipeline from the first sprint.',
        'APIs and integrations designed so the system can extend later.',
      ],
    },
    capabilities: [
      'Custom web and platform development',
      'Internal tools and admin panels',
      'API development and third-party integrations',
      'Workflow and automation engines',
      'Data pipelines and reporting tools',
      'Payment, billing and subscription systems',
      'Marketplace and multi-sided platforms',
      'Prototype development',
      'Technical architecture and stack selection',
      'Maintenance and feature extension',
    ],
    benefits: [
      {
        title: 'Exactly fits the requirement',
        description:
          'Built software removes the compromises that come with bending a general product into shape.',
      },
      {
        title: 'Systems that connect',
        description:
          'Integration work that vendors rarely cover, delivered as a first-class part of the build.',
      },
      {
        title: 'A foundation to extend',
        description:
          'Documented architecture means the next version is an evolution, not a rebuild.',
      },
      {
        title: 'No licensing ceiling',
        description:
          'The system keeps working as volume grows, without per-seat pricing that penalizes success.',
      },
    ],
    process: [
      {
        title: 'Frame',
        description:
          'We isolate the specific problem, define what success looks like and rule out simpler alternatives.',
      },
      {
        title: 'Scope',
        description:
          'A deliberately narrow first release, with everything else sequenced behind it.',
      },
      {
        title: 'Design',
        description:
          'Architecture, data model and interface design agreed before the build starts.',
      },
      {
        title: 'Build',
        description: 'Short cycles, working software at the end of each one.',
      },
      {
        title: 'Integrate',
        description:
          'Connections to payment, messaging, data and third-party APIs are implemented and tested.',
      },
      {
        title: 'Harden',
        description:
          'Security, performance and accessibility are addressed before launch, not after.',
      },
      {
        title: 'Operate',
        description:
          'Deployment, monitoring and an ongoing plan for extending the platform.',
      },
    ],
    deliverables: [
      'Working software covering the agreed first release',
      'Documented architecture and codebase',
      'Integration layer for your existing systems',
      'Automated test suite and CI pipeline',
      'Deployment and monitoring configuration',
    ],
    industries: ['SaaS & Software', 'Logistics', 'Healthcare', 'Education'],
    cta: 'Tell us the problem that has no off-the-shelf answer.',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing & Growth',
    shortName: 'Digital Marketing',
    summary:
      'SEO, conversion optimization and content strategy that turn existing traffic into measurable inquiries.',
    intro:
      'Marketing works best when it is measured. We improve the assets you already have — the pages, the structure, the content, the technical foundations — and connect them to a clear conversion path. The goal is not traffic for its own sake; it is inquiries that the business can act on.',
    problems: [
      {
        title: 'Traffic arrives but nobody converts',
        description:
          'The site gets visits but the journey has no clear next step, so most of the traffic leaves without enquiring.',
      },
      {
        title: 'The wrong pages are being found',
        description:
          'Search visibility is spent on pages that do not sell, instead of the ones that answer a buying question.',
      },
      {
        title: 'Content is published and forgotten',
        description:
          'Posts go out without a plan, a target reader, or a reason to believe, and they never earn traffic.',
      },
      {
        title: 'Nothing is measured properly',
        description:
          'Reporting shows totals rather than outcomes, so it is impossible to know which work actually pays.',
      },
    ],
    solution: {
      title: 'Measured, repeatable growth',
      description:
        'We fix the technical and content foundations, improve the pages that convert, and instrument everything so each cycle informs the next.',
      points: [
        'Technical SEO work that makes the site crawlable, fast and indexable.',
        'Content mapped to what your buyers actually search for.',
        'Conversion optimization on the pages that receive traffic.',
        'Reporting tied to inquiries and pipeline, not impressions.',
      ],
    },
    capabilities: [
      'Digital marketing strategy',
      'Search engine optimization',
      'Technical SEO audits and remediation',
      'Online brand development',
      'Conversion rate optimization',
      'Content strategy and production',
      'Digital campaign management',
      'Analytics and tracking setup',
      'Landing page creation',
      'Marketing performance reporting',
    ],
    benefits: [
      {
        title: 'Traffic that matches demand',
        description:
          'Ranking for the questions your buyers ask brings people who are genuinely looking for you.',
      },
      {
        title: 'Better conversion from the same traffic',
        description:
          'Improving the page you already have is usually cheaper than buying more of it.',
      },
      {
        title: 'Compounding content',
        description:
          'A structured content plan builds an asset base that keeps producing inquiries over time.',
      },
      {
        title: 'Decisions with evidence',
        description:
          'Proper tracking and reporting show which work is worth repeating and which to stop.',
      },
    ],
    process: [
      {
        title: 'Audit',
        description:
          'Technical, content and competitor review to establish the real starting position.',
      },
      {
        title: 'Strategy',
        description:
          'Prioritized plan tied to commercial goals, not a list of tactics.',
      },
      {
        title: 'Technical foundations',
        description:
          'Crawlability, speed, structured data and internal linking fixed first.',
      },
      {
        title: 'Content and pages',
        description:
          'Pages written for real buying questions and optimized for both search and conversion.',
      },
      {
        title: 'Campaign',
        description:
          'Promotion and campaign work coordinated with the content and landing pages.',
      },
      {
        title: 'Measure',
        description:
          'Tracking, dashboards and reporting that connect activity to inquiries.',
      },
      {
        title: 'Optimize',
        description:
          'Ongoing testing and iteration based on what the data actually shows.',
      },
    ],
    deliverables: [
      'Technical and content audit with priorities',
      'Keyword and content strategy',
      'Technical SEO remediation',
      'Optimized landing and conversion pages',
      'Analytics and conversion tracking',
      'Monthly reporting tied to inquiries',
    ],
    industries: [
      'Retail & E-commerce',
      'Education',
      'Hospitality',
      'Professional Services',
    ],
    cta: 'Bring us the traffic you already have and we will find where it is leaking.',
  },
]

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug)
