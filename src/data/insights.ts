/**
 * Editorial content for the Insights section.
 * Articles are written in-house and reflect BCON's delivery method.
 */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }

export type Insight = {
  slug: string
  title: string
  category: string
  excerpt: string
  /** ISO date. */
  date: string
  readingMinutes: number
  author: string
  body: Block[]
}

export const insights: Insight[] = [
  {
    slug: 'the-real-cost-of-legacy-systems',
    title: 'The real cost of holding on to legacy systems',
    category: 'Modernization',
    excerpt:
      'Legacy platforms rarely fail loudly. They fail slowly — through lost deals, unmaintainable code and a growing gap between what the business needs and what the system allows.',
    date: '2026-02-18',
    readingMinutes: 6,
    author: 'BCON Engineering',
    body: [
      {
        type: 'p',
        text: 'There is a specific kind of risk that comes with a system nobody wants to talk about. It does not go down on a Tuesday afternoon. It simply becomes less capable, year after year, until the gap between the business and its tooling is so wide that nobody can point to when it opened.',
      },
      {
        type: 'h2',
        text: 'The cost is rarely the license',
      },
      {
        type: 'p',
        text: 'When organizations price up modernization, the first question is usually about the software. License fees are visible, comparable and easy to build a business case around. But in our experience the larger cost sits somewhere else entirely, and it rarely appears on an invoice.',
      },
      {
        type: 'ul',
        items: [
          'Changes that take weeks because the original knowledge is gone, and every modification carries a risk nobody can price.',
          'Features that cannot ship because the architecture will not allow them, turning a roadmap into a wish list.',
          'Recruitment costs, as senior people avoid joining a team that maintains unfamiliar and fragile code.',
          'Opportunity cost — the projects that were never started because the platform was not considered ready.',
        ],
      },
      {
        type: 'p',
        text: 'The reason this compounds is that legacy systems are rarely bad because they were badly built. They are bad because they were built correctly for a business that no longer exists. The assumption that a successful modernization begins with "rewrite it" usually comes from a frustration with the second-order cost of change.',
      },
      {
        type: 'h2',
        text: 'Modernization is a sequencing problem, not a rewrite',
      },
      {
        type: 'p',
        text: 'A rewrite attempts to reach a future state while the current state still has to work. Everything about it is risky: the old and new systems must coexist, the data has to survive the crossing, and the business has to operate normally throughout. It is a large bet with a single outcome.',
      },
      {
        type: 'p',
        text: 'Phased modernization replaces the single bet with a sequence of small ones. Each phase delivers something usable, each phase removes a specific source of risk, and at any point the business has a working system. If priorities change, the work that has been done still stands.',
      },
      {
        type: 'ol',
        items: [
          'Assess what is actually constraining you — dependencies, runtime support, performance, data model, team knowledge.',
          'Separate urgent risk from valuable improvement. They need different urgencies and different budgets.',
          'Deal with the highest-risk items first, so the remaining work is improvement rather than firefighting.',
          'Instrument as you go. Performance and error data collected during the migration tells you what to fix next.',
          'Document continuously. The system that is easiest to change is the one someone still understands.',
        ],
      },
      {
        type: 'h2',
        text: 'Deciding whether to replace rather than repair',
      },
      {
        type: 'p',
        text: 'Sometimes repair is the wrong answer, and a client deserves to hear that plainly. Replacement makes sense when the vendor no longer supports the platform, when the data model encodes assumptions that are now wrong at a structural level, or when every change to the system costs more than the system delivers.',
      },
      {
        type: 'quote',
        text: 'The question is never "is this old?". It is "is this structurally incapable of what we now need, and can we change it in steps we can afford?"',
      },
      {
        type: 'p',
        text: 'That framing tends to produce better decisions than either default position — the one that says never touch a working system, and the one that says everything should be rebuilt on the latest stack.',
      },
    ],
  },
  {
    slug: 'why-websites-lose-inquiries-before-they-load',
    title: 'Why business websites lose inquiries before they finish loading',
    category: 'Web Development',
    excerpt:
      'Most website problems are performance problems wearing a disguise. Here is what actually happens between a click and a completed inquiry.',
    date: '2026-01-22',
    readingMinutes: 5,
    author: 'BCON Engineering',
    body: [
      {
        type: 'p',
        text: 'A website does not fail at checkout or on the contact form. It fails much earlier, in the seconds before a visitor has decided that this business is worth their time. By the time somebody is complaining about a form that "does not work", the traffic problem has usually been running for months.',
      },
      {
        type: 'h2',
        text: 'The first three seconds decide the rest',
      },
      {
        type: 'p',
        text: 'The distance between a first click and a rendered page is the highest-stakes moment in the entire journey. If the page is still blank while the visitor is already forming an opinion, that opinion will be formed about you and it will not be about your product.',
      },
      {
        type: 'p',
        text: 'The usual causes are unglamorous: a JavaScript bundle that arrives before anything visible, hero images shipped at the resolution of a billboard, third-party scripts blocking the main thread, and font loading that hides the headline until the font settles.',
      },
      {
        type: 'ul',
        items: [
          'Render the primary content on the server so the page is meaningful before any script executes.',
          'Treat hero images as a budget item, not a design detail. Compress, resize and preload exactly one.',
          'Load third-party scripts after the page is interactive, and audit whether each one earns its place.',
          'Use font-display swap so text appears immediately in a fallback face.',
        ],
      },
      {
        type: 'h2',
        text: 'Weight is a business metric, not a technical one',
      },
      {
        type: 'p',
        text: 'Performance work is often described in technical units — largest contentful paint, interaction to next paint, cumulative layout shift. These matter, but the business equivalent is simpler: how many potential customers are still on the page when it becomes usable?',
      },
      {
        type: 'p',
        text: 'This framing changes what gets prioritized. A 400 KB image that delays the headline is worse for the business than a slightly heavier component library, even if the numbers say otherwise. The measurement is a means; the inquiry is the point.',
      },
      {
        type: 'h2',
        text: 'A useful sequence for existing sites',
      },
      {
        type: 'p',
        text: 'For a site that already exists, the fastest wins are rarely the ambitious ones. In order, they usually are: measure a real baseline rather than a lab score, fix the largest assets on the most-visited pages, remove blocking third-party scripts, and make sure the server is sending a complete document rather than an empty shell.',
      },
      {
        type: 'p',
        text: 'None of that is exciting, and all of it compounds. A site that is fast, structurally correct and clear about what it does will outperform a more beautiful one that is slow to a degree most visitors will not wait out.',
      },
    ],
  },
  {
    slug: 'designing-erp-around-the-process',
    title: 'Designing ERP around the process, not the org chart',
    category: 'ERP & CRM',
    excerpt:
      'Off-the-shelf ERP fails in a predictable way: the software assumes a process, and the organization bends. Here is what changes when you build the other way round.',
    date: '2025-12-09',
    readingMinutes: 6,
    author: 'BCON Engineering',
    body: [
      {
        type: 'p',
        text: 'The most common reason an ERP implementation struggles is not technical. It is that the software was chosen before the process was properly understood, and the gap between the two had to be closed by somebody. Usually by the people doing the work.',
      },
      {
        type: 'h2',
        text: 'Where the workarounds come from',
      },
      {
        type: 'p',
        text: 'A standard product encodes a specific sequence of steps: quote, order, fulfill, invoice. That sequence is reasonable. But if your business quotes in a different order, or handles part fulfillment, or splits a shipment across warehouses, then every one of those exceptions needs somewhere to go.',
      },
      {
        type: 'ul',
        items: [
          'A shared spreadsheet becomes the unofficial system of record.',
          'Duplicate records appear because two departments each created their own view of a customer.',
          'Reporting is assembled by hand, so it arrives late and cannot be trusted.',
          'The system starts being described as "the thing that does not fit" rather than the thing that runs the business.',
        ],
      },
      {
        type: 'h2',
        text: 'Map the process before you model the data',
      },
      {
        type: 'p',
        text: 'The useful artefact at the start of an ERP engagement is not a requirements document. It is a map of how work and information actually move through the business — including the parts the org chart does not show.',
      },
      {
        type: 'p',
        text: 'The right sequence is: observe the current process, identify which steps are genuinely variable and which are genuinely fixed, and only then decide where the software should enforce a standard and where it should allow flexibility. A system that enforces the wrong standard is worse than no system, because people route around it.',
      },
      {
        type: 'h2',
        text: 'One record per entity',
      },
      {
        type: 'p',
        text: 'Most ERP pain traces back to a single structural failure: more than one authoritative record for the same thing. Two customer tables, two stock figures, two price lists. Each looks locally reasonable, and together they make every report ambiguous.',
      },
      {
        type: 'p',
        text: 'Designing for one record per entity — with every module reading from it — resolves an enormous amount of downstream frustration, and it is a data model decision rather than a feature decision. It is much cheaper to get right at the start.',
      },
      {
        type: 'h2',
        text: 'Automate the exceptions, not just the happy path',
      },
      {
        type: 'p',
        text: 'Automation that only handles the straightforward cases produces a system that works beautifully until the first exception, at which point everyone goes back to the spreadsheet. The valuable work is in deciding which exceptions need a person, what that person should see, and how the outcome gets recorded.',
      },
      {
        type: 'p',
        text: 'That is why we map the process before writing the software. The rules of a business are usually implicit, and the software is where they either get made explicit or get lost.',
      },
    ],
  },
  {
    slug: 'design-systems-need-written-rules',
    title: 'A design system fails without written rules',
    category: 'Design & UX',
    excerpt:
      'Component libraries are the easy part. What determines whether a design system actually holds is what happens when someone uses it wrong.',
    date: '2025-11-04',
    readingMinutes: 5,
    author: 'BCON Design',
    body: [
      {
        type: 'p',
        text: 'There is a common pattern where a company invests in a design system, builds a tidy component library, and then watches it decay anyway. The library is not the hard part. The hard part is everything that determines whether people use it correctly when nobody is watching.',
      },
      {
        type: 'h2',
        text: 'A component without a decision is a suggestion',
      },
      {
        type: 'p',
        text: 'A dropdown with seven props and no guidance on when to use which option has not removed a decision — it has relocated it, to the person assembling the screen, who has far less context than the designer who wrote the component.',
      },
      {
        type: 'p',
        text: 'The components that hold up across a team share a common trait: each one answers the question a developer would otherwise have to guess at. Which variant? What happens in the empty state? What is the focus behavior? Does it work at 320 pixels?',
      },
      {
        type: 'ul',
        items: [
          'State coverage: every component defines loading, empty, error and disabled behavior up front.',
          'Responsive rules: the breakpoint behavior is specified, not discovered per screen.',
          'Accessibility: focus order, keyboard interaction and contrast are decided by the system.',
          'Composition: the patterns for how components combine are documented with real examples.',
        ],
      },
      {
        type: 'h2',
        text: 'Tokens are what make it survive',
      },
      {
        type: 'p',
        text: 'A component library with hard-coded values still drifts, because the next designer invents a slightly different gray. Tokens — named values for color, spacing, radius and type — decouple the decision from the implementation, and they are what lets a rebrand happen in an afternoon instead of a quarter.',
      },
      {
        type: 'h2',
        text: 'Adoption is a design problem',
      },
      {
        type: 'p',
        text: 'Systems fail quietly when the alternative is easier. If using the system requires more effort than copying something from an old screen, most people will copy. The system has to be the fastest route to a good result, not the most correct route on paper.',
      },
      {
        type: 'p',
        text: 'That means good defaults, sensible examples, and a contribution path that is not blocked behind a committee. It also means treating the design system as a product with users, not a document with readers.',
      },
    ],
  },
  {
    slug: 'websites-your-team-can-update',
    title: 'Building a website your team can update without a developer',
    category: 'Web Development',
    excerpt:
      'The handover moment matters more than the launch. A site that only the agency can change becomes an expensive line item every month.',
    date: '2025-10-16',
    readingMinutes: 5,
    author: 'BCON Engineering',
    body: [
      {
        type: 'p',
        text: 'A launch is a moment. A website is a long relationship with an owner who is not the team that built it. That relationship usually starts badly when the person who has to publish a price change discovers the change requires a developer and a deployment.',
      },
      {
        type: 'h2',
        text: 'The cost of a locked-in site',
      },
      {
        type: 'p',
        text: 'The most expensive sites to maintain are not the technically worst ones. They are the ones where routine changes are impossible, because each one becomes an engineering task with a lead time measured in days.',
      },
      {
        type: 'p',
        text: 'This produces a predictable failure pattern. The marketing team works around the site — separate landing pages hosted elsewhere, a campaign microsite on a different platform, images edited directly in the CMS. The site slowly stops being the source of truth, and the organization ends up maintaining three or four versions of its own message.',
      },
      {
        type: 'h2',
        text: 'What "editable" actually requires',
      },
      {
        type: 'p',
        text: 'Putting a content management system in front of a site is not the same as making it editable. The distinction is that editing is a content problem, while the surrounding implementation is an engineering problem.',
      },
      {
        type: 'ul',
        items: [
          'The content model should match how the team thinks, not how the database is normalized.',
          'Every editable element needs a purpose-built field, not a free-form rich-text box.',
          'Media should be handled automatically — resized, compressed and served in modern formats on upload.',
          'Publishing should be reversible, with a preview of what is live and a record of what changed.',
        ],
      },
      {
        type: 'h2',
        text: 'Hand over the ability, not just the code',
      },
      {
        type: 'p',
        text: 'Documentation that gets read once at handover is not documentation. A short, task-oriented guide — "how to publish a news post", "how to change a price", "how to add a new landing page" — written for the person who will actually do the work, is what makes the difference.',
      },
      {
        type: 'p',
        text: 'Then there is the question of support. Systems do not stay current on their own. An ongoing maintenance arrangement is what keeps the site secure, fast and consistent with the rest of the business technology, and it is far cheaper than the emergency rebuild that follows two years of drift.',
      },
    ],
  },
]

export const getInsight = (slug: string) =>
  insights.find((insight) => insight.slug === slug)
