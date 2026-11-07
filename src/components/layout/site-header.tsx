import { useEffect, useRef, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Dialog } from 'radix-ui'
import { ChevronDown, Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/layout/logo'
import { mainNav, servicesNav } from '@/config/site'
import { cn } from 'cn'

const navLinkClass =
  'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground'

function ServicesDropdown() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        containerRef.current
          ?.querySelector<HTMLButtonElement>('[data-services-trigger]')
          ?.focus()
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 140)
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        type="button"
        data-services-trigger
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="services-menu"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          navLinkClass,
          'group',
          open && 'bg-white/5 text-foreground',
        )}
      >
        Services
        <ChevronDown
          className={cn(
            'ml-1 inline-block size-3.5 transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id="services-menu"
        hidden={!open}
        className="absolute top-full left-1/2 z-50 mt-2 w-[min(46rem,calc(100vw-2.5rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-popover p-2 shadow-2xl shadow-black/50"
      >
        <ul className="grid gap-1 sm:grid-cols-2">
          {servicesNav.map((service) => (
            <li key={service.to}>
              <Link
                to={service.to}
                className="group block rounded-lg px-3.5 py-3 transition-colors hover:bg-white/5"
              >
                <span className="flex items-center justify-between gap-3 text-sm font-medium text-foreground">
                  {service.label}
                  <span
                    className="text-brand opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
                {service.description ? (
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {service.description}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-1 border-t border-border px-3.5 py-3">
          <Link
            to="/services"
            className="text-sm font-medium text-brand transition-colors hover:text-brand/80"
          >
            View all services →
          </Link>
        </div>
      </div>
    </div>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-9 rounded-md border-border bg-white/5 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-4.5" aria-hidden="true" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col bg-background outline-none"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>

          <div className="shell flex h-18 shrink-0 items-center justify-between">
            <Logo heightClass="h-11" />
            <Dialog.Close asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-md border-border bg-white/5"
                aria-label="Close menu"
              >
                <X className="size-4.5" aria-hidden="true" />
              </Button>
            </Dialog.Close>
          </div>

          <nav
            className="shell flex-1 overflow-y-auto pb-10"
            aria-label="Mobile navigation"
          >
            <ul className="divide-y divide-border">
              {mainNav.map((item) =>
                item.label === 'Services' ? (
                  <li key={item.to} className="py-1">
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-lg font-medium text-foreground">
                        {item.label}
                        <ChevronDown
                          className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <ul className="pb-3 pl-1">
                        {servicesNav.map((service) => (
                          <li key={service.to}>
                            <Link
                              to={service.to}
                              className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {service.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            to="/services"
                            className="block py-2 text-sm font-medium text-brand"
                          >
                            All services
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={item.to} className="py-1">
                    <Link
                      to={item.to}
                      className="block py-3.5 text-lg font-medium text-foreground"
                      activeProps={{ className: 'text-brand' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <Button
              asChild
              size="lg"
              className="mt-8 h-12 w-full rounded-md text-base"
            >
              <Link to="/contact">Start a Project</Link>
            </Button>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled
          ? 'border-border bg-background/80 backdrop-blur-xl'
          : 'border-transparent bg-background',
      )}
    >
      <div className="shell flex h-18 items-center justify-between gap-4">
        <Logo heightClass="h-9 sm:h-10 lg:h-11" />

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Main navigation"
        >
          {mainNav.map((item) =>
            item.label === 'Services' ? (
              <ServicesDropdown key={item.to} />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={navLinkClass}
                activeOptions={{ exact: item.to === '/' }}
                activeProps={{ className: 'text-foreground' }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden h-10 rounded-md px-5 font-medium sm:inline-flex"
          >
            <Link to="/contact">Start a Project</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
