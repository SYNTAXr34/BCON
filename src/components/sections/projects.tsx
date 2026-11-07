import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/ui/reveal'
import { projectStatusLabel, projects } from '@/data/projects'

export function Projects() {
  return (
    <section
      className="border-t border-border py-20 md:py-28 lg:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">Selected work</p>
            <h2
              id="projects-heading"
              className="mt-6 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl lg:text-[2.9rem]"
            >
              Projects built to demonstrate real capability.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Demonstration builds produced by BCON. They are published as proof
              of approach and are labeled as such — client engagements appear
              here once they are approved for release.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
          >
            View all projects
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={index * 0.06} className="h-full">
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white/[0.02] transition-colors hover:border-brand/35"
                >
                  <span className="relative block h-36 overflow-hidden border-b border-border bg-white/[0.02]">
                    <span
                      className="grid-field absolute inset-0 opacity-60"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute -right-6 -bottom-10 font-heading text-[7rem] leading-none font-semibold text-white/[0.045]"
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
                      {project.stack.slice(0, 3).map((tech) => (
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
    </section>
  )
}
