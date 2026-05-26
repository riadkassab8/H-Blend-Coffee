# BLEND Coffee

A luxury specialty coffee brand website for "BLEND" — Cairo's premium single-origin coffee experience. Presentation-first React+Vite app with cinematic dark aesthetic, rich animations, and Playfair Display typography.

## Run & Operate

- `pnpm --filter @workspace/blend-coffee run dev` — run the frontend (assigned port via `PORT` env)
- `pnpm --filter @workspace/blend-coffee run typecheck` — typecheck the frontend
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite 7, Tailwind CSS v4
- Routing: wouter
- Animations: framer-motion
- Carousel: embla-carousel-react + embla-carousel-autoplay
- Icons: lucide-react
- No backend — all data is static/hardcoded

## Where things live

```
artifacts/blend-coffee/
  src/
    App.tsx                    — Router, AnimatePresence, ThemeProvider, LoadingScreen
    index.css                  — Tailwind v4 config, CSS custom props (HSL space-separated)
    components/
      ThemeProvider.tsx        — Dark/light mode context + localStorage persistence
      layout/
        Navbar.tsx             — Sticky glassmorphism nav, mobile overlay, dark toggle
        Footer.tsx             — 4-col footer
      ui/
        LoadingScreen.tsx      — 2.2s intro screen with steam + progress bar
        CustomCursor.tsx       — Gold dot + ring cursor (desktop only, framer-motion spring)
    data/
      products.ts              — 16 mock products with categories + EGP prices
      testimonials.ts          — 5 customer testimonials
      blogPosts.ts             — 6 blog articles
    pages/
      Home.tsx                 — Hero, featured, why-blend, carousel, counters, testimonials, gallery, newsletter
      Menu.tsx                 — Category filter tabs + 16 product cards + quick-view modal
      About.tsx                — Brand story, philosophy, timeline, team, origins
      Reservations.tsx         — Booking form with success state
      Blog.tsx                 — Articles grid with search + category filters
      Contact.tsx              — Contact form + branch info + WhatsApp
      not-found.tsx            — Branded 404 page
```

## Architecture decisions

- **No backend** — pure static presentation site; all data hardcoded in `src/data/`
- **Dark mode default** — ThemeProvider initializes to "dark", persists to `localStorage` as `"blend-theme"`; `.dark` class toggled on `<html>`
- **CSS custom properties** — HSL values are space-separated without `hsl()` wrapper (e.g. `--primary: 22 45% 28%`), used with Tailwind v4's `hsl(var(--primary))` resolution
- **Google Fonts** — `@import url(...)` must be the absolute first line of `index.css` before any other imports
- **Loading screen** — uses `sessionStorage` key `"blend-loaded"` so it only shows once per browser session (not on every navigation)
- **Nested Link fix** — wouter's `<Link>` renders as `<a>`; never wrap in another `<a>`. Pass `className`/`data-testid` directly to `<Link>`

## Product

Six-page luxury coffee brand site:
- **Home** — cinematic hero with floating coffee bean particles, featured products, "Why BLEND" 4-col, Embla best-sellers carousel, scroll-triggered animated stat counters, testimonials carousel, gallery grid, newsletter CTA
- **Menu** — 16 products, 6 category filters, product modal with quantity selector
- **About** — brand story, philosophy pillars, animated timeline, team, origins
- **Reservations** — full booking form with branch select and success confirmation
- **Blog** — search + category filters, featured post banner, article cards
- **Contact** — dual-column form + WhatsApp + branch list + hours

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Run `pnpm --filter @workspace/blend-coffee run typecheck` (not `build`) to verify types — `build` requires workflow env vars (`PORT`, `BASE_PATH`)
- `embla-carousel-autoplay` must be installed separately from `embla-carousel-react`
- All Tailwind color values come from CSS custom properties; do not hardcode colors — use `text-accent`, `bg-primary`, etc.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
