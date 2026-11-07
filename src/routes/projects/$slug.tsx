import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { getProject, projects } from '@/data/projects'
import { pageHead } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return project
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData
        ? `${loaderData.name} — BCON Projects`
        : 'Project — BCON',
      description:
        loaderData?.summary ??
        'A selection of work built by BCON, including labeled demonstration projects.',
      path: loaderData ? `/projects/${loaderData.slug}` : '/projects',
      structuredData: loaderData
        ? [
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: loaderData.name, path: `/projects/${loaderData.slug}` },
            ]),
          ]
        : undefined,
    }),
  component: ProjectRoute,
})

function ProjectRoute() {
  const project = Route.useLoaderData()
  const related = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2)

  return (
    <>
      <PageHero
        eyebrow="Project"
        title={project.name}
        description={project.summary}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-md border border-brand/25 bg-brand/10 px-3 py-1.5 text-xs font-medium text-brand">
            {project.status === 'demonstration'
              ? 'Demonstration build'
              : 'Client engagement'}
          </span>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All projects
          </Link>
        </div>
      </PageHero>

      <Section className="border-b border-border">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-20">
          <Reveal>
            <div className="space-y-10">
              <div>
                <p className="eyebrow text-brand">The challenge</p>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {project.challenge}
                </p>
              </div>

              <div>
                <p className="eyebrow text-brand">What was built</p>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {project.detail}
                </p>
              </div>

              {project.status === 'demonstration' ? (
                <div className="flex items-start gap-3.5 rounded-lg border border-border bg-white/[0.02] p-5">
                  <Info
                    className="mt-0.5 size-4.5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    This is a demonstration project produced by BCON. It is not
                    client work and no client results are claimed for it. It is
                    published to show how we approach this category of build.
                  </p>
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="rounded-xl border border-border bg-white/[0.02] p-7">
              <h2 className="eyebrow text-muted-foreground">Technology</h2>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <h2 className="eyebrow mt-8 text-muted-foreground">Services</h2>
              <ul className="mt-5 space-y-2.5">
                {project.services.map((service) => (
                  <li key={service} className="text-sm text-foreground/90">
                    {service}
                  </li>
                ))}
              </ul>

              <Button asChild className="mt-8 h-10 w-full rounded-md">
                <Link to="/contact">
                  Discuss a project
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </Link>
              </Button>
            </aside>
          </Reveal>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section>
          <div className="shell">
            <h2 className="text-xl font-semibold text-foreground">
              More from the portfolio
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: item.slug }}
                    className="group flex h-full flex-col rounded-lg border border-border bg-white/[0.02] p-7 transition-colors hover:border-brand/35"
                  >
                    <span className="font-heading text-lg font-semibold text-foreground">
                      {item.name}
                    </span>
                    <span className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                      View project
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}
    </>
  )
}
