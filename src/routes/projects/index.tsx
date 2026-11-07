import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Info } from 'lucide-react'

import { PageHero } from '@/components/ui/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { projectStatusLabel, projects } from '@/data/projects'
import { pageHead } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'

export const Route = createFileRoute('/projects/')({
  head: () =>
    pageHead({
      title: 'Projects — BCON',
      description:
        'A selection of work built by BCON — including demonstration projects that show how we approach web, software, ERP, design and performance engagements.',
      path: '/projects',
      structuredData: [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ]),
      ],
    }),
  component: ProjectsIndex,
})

function ProjectsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work that shows the approach."
        description="Every entry below is a real build by BCON. Demonstration projects are labeled as such; client engagements appear only once the client has approved them for publication."
      />

      <Section>
        <div className="shell">
          <div className="flex items-start gap-3.5 rounded-lg border border-brand/25 bg-brand/[0.07] p-5">
            <Info
              className="mt-0.5 size-4.5 shrink-0 text-brand"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-foreground/90">
              <span className="font-medium text-foreground">
                On demonstration builds:
              </span>{' '}
              these are projects BCON designed and engineered to demonstrate a
              specific capability. They are reference implementations, not
              client work, and are labeled individually below so there is no
              ambiguity about what they represent.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <Reveal delay={Math.min(index, 5) * 0.05} className="h-full">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white/[0.02] transition-colors hover:border-brand/35"
                  >
                    <span className="relative block h-40 overflow-hidden border-b border-border">
                      <span
                        className="grid-field absolute inset-0 opacity-60"
                        aria-hidden="true"
                      />
                      <span
                        className="absolute -right-5 -bottom-12 font-heading text-[8rem] leading-none font-semibold text-white/[0.05]"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="absolute top-3.5 left-3.5 inline-flex items-center rounded-md border border-brand/25 bg-brand/10 px-2.5 py-1 text-[0.6875rem] font-medium text-brand">
                        {projectStatusLabel[project.status]}
                      </span>
                    </span>

                    <span className="flex flex-1 flex-col p-6">
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-heading text-lg font-semibold text-foreground">
                          {project.name}
                        </span>
                        <ArrowUpRight
                          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {project.summary}
                      </span>
                      <span className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
