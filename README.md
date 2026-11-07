# BCON — Corporate Website

The official website for **BCON**, a digital solutions and technology company.

> **Build. Modernize. Maintain. Grow.**
> Your Vision. Our Technology. Better Business.

Built with [TanStack Start](https://tanstack.com/start), [TanStack Router](https://tanstack.com/router), React 19, Tailwind CSS v4 and TypeScript in strict mode. The site is server-rendered, with route-level code splitting and SEO metadata generated per page.

---

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:3000>.

| Script              | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Start the dev server on port 3000                            |
| `npm run build`     | Production build (client + server + SSR bundles)             |
| `npm run preview`   | Serve the production build locally                           |
| `npm run typecheck` | TypeScript, no emit                                          |
| `npm run lint`      | ESLint (flat config, `@tanstack/eslint-config`)              |
| `npm run check`     | Prettier format check                                        |
| `npm run format`    | Prettier write + ESLint autofix                              |
| `npm run og`        | Regenerate `public/og.png` (see [OG image](#og-image))       |
| `npm run icons`     | Regenerate the app icons (see [Brand assets](#brand-assets)) |

Site copy is written in American English, matching the brand terms. To check or
re-apply that convention:

```bash
node scripts/normalize-spelling.mjs
```

---

## Project structure

```
src/
  components/
    layout/     Header, footer, logo, legal page layout
    sections/   Homepage + service-page sections
    forms/      Enquiry form
    ui/         Shared primitives (button, input, select, reveal, …)
  config/       site.ts — company identity, contact details, navigation
  data/         Content: services, industries, projects, insights, process
  lib/          SEO helpers, structured data, enquiry schema
  routes/       File-based routes
  server/       Server-only code (enquiry delivery)
  styles.css    Design tokens + Tailwind theme
scripts/        Brand asset pipeline, OG generation, visual checks
```

### Adding a service

Service pages are data-driven. Add an entry to `src/data/services.ts` and create
`src/routes/services/$slug.tsx` — it already resolves any slug in that list, so
a new service needs no new route file. The service index page, the header
dropdown, the footer and the sitemap pick it up automatically.

> Icons are kept in a separate `serviceIcons` map rather than on the service
> records themselves. Route loader data is serialized across the SSR hydration
> boundary, and React components cannot be serialized.

### Adding a page

Create a file in `src/routes/` — TanStack Router generates the route tree.
Use `pageHead()` from `src/lib/seo.ts` for titles, descriptions, canonical
URLs and Open Graph tags, and `breadcrumbSchema()` from
`src/lib/structured-data.ts` for JSON-LD.

---

## Configuration

### Company details

`src/config/site.ts` is the single source of truth for the brand name, tagline,
motto, canonical URL, contact channels and navigation.

**Before launch, replace every placeholder in that file:**

- `siteConfig.url` — currently `https://bcon.example.com`. This is the origin
  used for canonical URLs, Open Graph images and the sitemap, so it must be the
  real production domain.
- `contactConfig.email`, `.phone`, `.phoneHref`, `.whatsapp`, `.address`
- `socialConfig.linkedin`, `.x`, `.github`, `.instagram`
- `contactConfig.hours`

### Enquiry delivery

The contact form posts to a server function (`src/server/enquiry.ts`) that
validates the payload on the server, applies a honeypot check and a per-IP rate
limit, and then delivers the enquiry through whichever channels are configured.

Copy `.env.example` to `.env` and set what you use:

| Variable                   | Enables                                           |
| -------------------------- | ------------------------------------------------- |
| `RESEND_API_KEY`           | Email delivery (needs the next two too)           |
| `ENQUIRY_FROM_EMAIL`       | Verified sender for email delivery                |
| `ENQUIRY_TO_EMAIL`         | Enquiry inbox (defaults to `contactConfig.email`) |
| `WHATSAPP_TOKEN`           | WhatsApp Cloud API delivery                       |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp sending number ID                        |
| `WHATSAPP_TO_NUMBER`       | WhatsApp destination number                       |
| `WHATSAPP_NUMBER`          | "Click to chat" fallback number                   |

**If no channel is configured, the site says so.** It does not claim an
enquiry was sent — it tells the visitor to email directly and logs the
submission server-side. Configure at least one channel before launch so the
form delivers where you want it.

---

## SEO

- Unique `<title>` and meta description per page, plus Open Graph and Twitter card tags.
- Canonical URL on every page (`src/lib/seo.ts`).
- JSON-LD structured data: `Organization` and `WebSite` sitewide, `Service` on service pages, `Article` on insights, `BreadcrumbList` on interior pages.
- `sitemap.xml` and `robots.txt` are served from route handlers built from the same content data as the pages.
- Custom 404 page.
- OG image at `public/og.png`.

---

## OG image

`public/og.png` (1200×630) is generated from an inline SVG:

```bash
npm run og
```

resvg cannot read `woff2` and does not apply variable-font axes, so the brand
fonts are first instanced to static TTFs into `scripts/fonts/`. Regenerate
those with a Python that has `brotli` and `fonttools` installed:

```bash
python scripts/prepare-og-fonts.py
```

The generated TTFs are build artifacts and are not committed.

---

## Brand assets

The lockup in the header and footer is the supplied brand artwork, used
as-is rather than rebuilt from a vector mark and live type — the bevelled
lettering cannot be reproduced in a web font. `scripts/extract-logo.py`
converts the source JPEG into transparent PNGs:

```bash
python scripts/extract-logo.py
```

It writes:

| File                     | Use                                                      |
| ------------------------ | -------------------------------------------------------- |
| `public/logo-lockup.png` | mark + "BCON" + "TECHNOLOGIES", in the header and footer |
| `public/logo-mark.png`   | the mark alone                                           |

The source is a JPEG on a flat `#141A30` canvas — the same colour as the page
background. Alpha therefore comes from how far each pixel's luminance sits
above that background, and the colour is un-premultiplied so the PNG composites
back to the original over any surface of the same colour. Only the alpha
channel is smoothed, which removes the JPEG ringing without touching the
bevel shading.

The mark and the wordmark sit two pixels apart, so they cannot be separated by
a column gap. The script labels 8-connected components instead and uses the
lettering's shared glyph height to find where the wordmark begins.

Everything small is drawn from a traced vector of the same mark, which stays
sharp at any size:

```bash
BCON_LOGO_SOURCE=/path/to/logo.jpeg python scripts/trace-logo.py   # → .ogwork/mark.png
node scripts/vectorize-logo.mjs                                  # → .ogwork/mark.svg
npm run icons                                                    # → public/icon-*.png
```

`trace-logo.py` isolates the mark from its baked-in background and glow by
keying on the blue channel, and writes an 8-bit grayscale PNG. `vectorize-logo.mjs`
traces that mask with potrace and rescales the result onto a centred 100×100
grid. `generate-icons.mjs` renders that path with resvg into the square app
icons:

| File                                         | Use                                 |
| -------------------------------------------- | ----------------------------------- |
| `public/favicon.svg`                         | browser tab                         |
| `public/icon-192.png`, `public/icon-512.png` | PWA icons                           |
| `public/icon-maskable.png`                   | PWA icon for platforms that crop it |
| `public/apple-touch-icon.png`                | iOS home screen                     |

The theme was then resampled from the artwork rather than chosen by eye. The
tokens in `src/styles.css` — canvas `#141A30`, brand `#B9A5F5`, and the
`#6B5FA8 → #9D8ECB → #EED7FF` gradient — come from the logo itself.

To change the artwork, drop the new file at the path in `SOURCE` (or update
that constant) and rerun the script, then `npm run og` to refresh the social
card, which embeds the lockup.

---

## Visual checks

`scripts/screenshot.mjs` drives Puppeteer over every route at desktop and
mobile widths, capturing above-the-fold and full-page screenshots into
`.ogwork/shots/`, and fails loudly on console errors, horizontal overflow, or
sections still left transparent by their scroll reveal.

```bash
node scripts/screenshot.mjs                    # all routes
node scripts/screenshot.mjs /services /contact  # selected routes
```

> On Git Bash, prefix with `MSYS_NO_PATHCONV=1` — MSYS rewrites the leading
> `/` in route arguments into a Windows path.

---

## Deployment

The build uses Nitro, so the output runs on any Node-compatible host:

```bash
npm run build
node .output/server/index.mjs
```

Deploy the `.output/` directory to Render, Fly.io, a VPS or similar. Set the
environment variables listed above on the host. For platform-specific presets
(Vercel, Netlify, Cloudflare, AWS Lambda) see the
[Nitro deployment guide](https://v3.nitro.build/deploy).

---

## Accessibility

- Semantic HTML landmarks and a skip-to-content link.
- Keyboard-operable navigation, including the services dropdown and mobile menu.
- Visible focus states on all interactive elements.
- Form fields use real `<label>` elements, `aria-invalid`, and `aria-describedby`
  for error text; validation messages are announced.
- Colour contrast meets WCAG AA against the dark theme.
- Motion respects `prefers-reduced-motion`.

---

## Legal

`/legal/privacy` and `/legal/terms` are template pages. They must be reviewed
and replaced with text that reflects how BCON actually handles data before
launch.
