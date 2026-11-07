export type ProcessStep = {
  number: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We start by understanding the business, not the brief. Goals, customers, constraints, and what already exists — including the systems and code nobody has looked at in a while.',
  },
  {
    number: '02',
    title: 'Strategize',
    description:
      'Findings turn into a plan: what to build, what to leave alone, what to sequence first, and what success will be measured against. Agreed before the first line is drawn.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Structure, interface and interaction are designed against real content and real edge cases, and reviewed before they are expensive to change.',
  },
  {
    number: '04',
    title: 'Develop',
    description:
      'The build runs in short, reviewable increments. You see working software throughout, not a reveal at the end.',
  },
  {
    number: '05',
    title: 'Test',
    description:
      'Cross-browser, device, accessibility and performance testing, with every issue found and fixed before anything reaches production.',
  },
  {
    number: '06',
    title: 'Deploy',
    description:
      'A staged release with redirects, metadata, monitoring and rollback prepared, so launch is a controlled step rather than an event.',
  },
  {
    number: '07',
    title: 'Maintain and improve',
    description:
      'Updates, monitoring and iteration once real usage data exists. Systems improve with use, and the relationship continues after launch.',
  },
]

export type Differentiator = {
  title: string
  description: string
}

export const differentiators: Differentiator[] = [
  {
    title: 'One partner across the whole lifecycle',
    description:
      'The same team carries a project from discovery through design, build and maintenance. Nothing gets handed to a new team that has to learn it.',
  },
  {
    title: 'Technology chosen for the problem',
    description:
      'We recommend stacks based on what the project actually needs and what your team can maintain afterwards — not on what happens to be fashionable.',
  },
  {
    title: 'You own everything',
    description:
      'Code, infrastructure, content and accounts are yours. If we stop working together, nothing falls apart and nothing has to be bought back.',
  },
  {
    title: 'Accessibility built in',
    description:
      'WCAG AA is the baseline we design and test to, not a service we sell separately or bolt on at the end.',
  },
  {
    title: 'Performance treated as a feature',
    description:
      'Speed, search visibility and stability are designed for from the start, because they are far cheaper to build in than to retrofit.',
  },
  {
    title: 'Scoped honestly',
    description:
      'We say what a project will realistically achieve, and we say when a problem does not need custom software. A partner who pushes back is worth keeping.',
  },
]
