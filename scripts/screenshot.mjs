import { mkdirSync } from 'node:fs'
import puppeteer from 'puppeteer'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = '.ogwork/shots'
mkdirSync(OUT, { recursive: true })

const targets = process.argv.slice(2)
const pages = targets.length
  ? targets
  : [
      '/',
      '/about',
      '/services',
      '/services/web-development',
      '/services/ui-ux-design',
      '/services/technology-modernization',
      '/services/erp-crm-solutions',
      '/services/custom-software',
      '/services/digital-marketing',
      '/industries',
      '/projects',
      '/projects/meridian-commerce',
      '/insights',
      '/insights/the-real-cost-of-legacy-systems',
      '/insights/why-websites-lose-inquiries-before-they-load',
      '/contact',
      '/legal/privacy',
      '/legal/terms',
    ]

const VIEWPORTS = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
]

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const issues = []

for (const path of pages) {
  const slug =
    path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '-')

  for (const [label, width, height] of VIEWPORTS) {
    const page = await browser.newPage()
    await page.setViewport({ width, height })

    page.on('console', (message) => {
      if (message.type() === 'error') {
        issues.push(`${path} [${label}] console: ${message.text()}`)
      }
    })
    page.on('pageerror', (error) => {
      issues.push(`${path} [${label}] pageerror: ${error.message}`)
    })

    await page.goto(`${BASE}${path}`, { waitUntil: 'load', timeout: 45000 })
    await page.evaluate(() => document.fonts.ready)

    // Scroll through so IntersectionObserver reveals fire.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((resolve) => setTimeout(resolve, 110))
      }
      window.scrollTo(0, 0)
    })

    // Above-the-fold capture.
    await new Promise((resolve) => setTimeout(resolve, 600))
    await page.screenshot({ path: `${OUT}/${slug}-${label}-fold.png` })

    // Full-page capture: grow the viewport to the document height so every
    // section is inside the viewport, then re-render and capture.
    const fullHeight = await page.evaluate(() =>
      Math.min(document.body.scrollHeight, 12000),
    )
    await page.setViewport({ width, height: fullHeight })
    await page.evaluate(() => window.scrollTo(0, 0))
    await new Promise((resolve) => setTimeout(resolve, 1200))
    await page.screenshot({ path: `${OUT}/${slug}-${label}-full.png` })

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    if (overflow.scrollWidth > overflow.clientWidth + 1) {
      issues.push(
        `${path} [${label}] horizontal overflow: ${overflow.scrollWidth} > ${overflow.clientWidth}`,
      )
    }

    const invisible = await page.evaluate(() => {
      const nodes = [...document.querySelectorAll('[style*="opacity"]')]
      return nodes.filter((n) => Number(getComputedStyle(n).opacity) < 0.9)
        .length
    })
    if (invisible > 0) {
      issues.push(
        `${path} [${label}] ${invisible} element(s) still transparent`,
      )
    }

    await page.close()
  }
}

await browser.close()

if (issues.length) {
  console.log('--- issues ---')
  for (const issue of issues) console.log(issue)
} else {
  console.log('clean: no console errors, overflow, or hidden sections')
}
