# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Next.js dev server on localhost:3000
npm run build     # Type-check + production build (use as type-check gate)
npm run start     # Serve production build
```

No tests. `npm run build` is the type-check gate.

## Architecture

bookVault is a **Next.js 15 App Router** ebook store (static multi-page rendering). No backend beyond Supabase auth.

| Route | Purpose |
|-------|---------|
| `/` | Homepage: scroll-driven hero + featured grid + genre grid |
| `/browse` | Filterable/searchable catalog (client component) |
| `/book/[id]` | Book detail + buy/rent pricing + add-to-cart |
| `/auth/sign-in` | Register new account (Supabase) |
| `/auth/login` | Log in (Supabase) |
| `/cart` | Cart with coupon codes (Zustand, persisted to localStorage) |
| `/checkout` | Payment UI only — no live processor wired yet |
| `/legal/terms` `/legal/privacy` `/legal/refund` | Legal pages |

### Data layer

`lib/books.ts` — single source of truth: 30 `Book` objects, `getBookById`, `getBooksByGenre`, `genres[]`, `featuredIds[]`. No API calls; compile-time data. All 30 cover JPGs live in `public/covers/{id}.jpg`.

### State

- `store/cart.ts` — Zustand + persist middleware. Holds cart items, coupon code, discount. `applyCoupon(code)` validates against `lib/coupons.ts`. Item key is `(bookId, type)` pair.
- `store/currency.ts` — Zustand + persist. Stores selected `CountryCode`. `lib/currency.ts` has `CURRENCIES` map and `formatPrice(usdPrice, country)`.

### Auth

Supabase (`@supabase/ssr`). Two client helpers:
- `lib/supabase/client.ts` — browser client via `createBrowserClient`
- `lib/supabase/server.ts` — server component client via `createServerClient` + `next/headers`

`middleware.ts` protects `/checkout` — redirects unauthenticated users to `/auth/login?redirect=/checkout`.

### Styling

Tailwind v4 via `@tailwindcss/postcss`. Custom design tokens in `app/globals.css` under `@theme`:

| Token | Value | Tailwind utility |
|-------|-------|-----------------|
| `--color-base` | `#09090b` | `bg-base` |
| `--color-surface` | `#18181b` | `bg-surface` |
| `--color-elevated` | `#27272a` | `bg-elevated` |
| `--color-line` | `#3f3f46` | `border-line` |
| `--color-primary` | `#fafafa` | `text-primary` |
| `--color-secondary` | `#a1a1aa` | `text-secondary` |
| `--color-accent` | `#f59e0b` | `text-accent`, `bg-accent` |
| `--font-display` | Cormorant Garamond | `font-display` |

Display font loaded via `next/font/google` and injected as `--font-display` CSS variable in `<head>` inline style.

### Hero scroll animation

`components/HeroSection.tsx`: wrapper `height: 160vh`, sticky inner `h-screen`. JS scroll listener computes `progress = -rect.top / (wrapperHeight - viewportHeight)`. Three book cover divs are animated by mutating `style.opacity` and `style.transform` directly (no React state — avoids re-renders).

## Key constraints

- **Buy + Rent always visible together.** All three price fields (`buyPrice`, `rentPrice7`, `rentPrice30`) shown wherever pricing appears.
- **Checkout requires auth** — enforced in middleware and the UI.
- **No payment processor** wired yet — checkout form is UI-only. Add Stripe when ready.
- **Supabase env vars required** to run auth: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.local.example`).
- **Mobile is primary.** Test any UI change at 390 px. Three.js shelf removed; hero is CSS/JS scroll-driven.
