# bookVault

A premium e-book storefront built with Next.js 15. Buy or rent from a curated catalogue of 30 titles — no subscription required.

**Live routes:** homepage · browse/filter · book detail · in-browser reader · my library · curated lists · cart + coupons · checkout · auth · legal

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, static generation) |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` |
| State | Zustand 5 + `persist` middleware (localStorage) |
| Auth | Supabase (`@supabase/ssr`) |
| Fonts | Cormorant Garamond · Plus Jakarta Sans · DM Mono (via `next/font/google`) |
| Animation | Framer Motion |
| Covers | Open Library CDN (`covers.openlibrary.org`) |
| Deployment | Vercel (recommended) or any Node.js host |

---

## Quick start

### Prerequisites

- Node.js 18+
- npm 9+ (or pnpm / yarn)
- A [Supabase](https://supabase.com) project (free tier works; optional for local dev without auth)

### 1. Clone and install

```bash
git clone https://github.com/thunderbuddies462/bookVault.git
cd bookVault
npm install
```

### 2. Environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

`.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **Without these vars** the app runs in demo mode — browse, cart, and reader work; auth and checkout redirect to sign-in gracefully.

### 3. Run dev server

```bash
npm run dev
# → http://localhost:3000
```

### 4. Build for production

```bash
npm run build   # type-check + static generation
npm run start   # serve the production build
```

---

## Project structure

```
app/
  page.tsx              # Homepage (hero + spotlight + collections + bundles)
  browse/               # Filterable catalogue (client component)
  book/[id]/            # Book detail + pricing + reviews
  read/[id]/            # In-browser reader (dark/sepia/light, font controls)
  library/              # My Library (owned, rented, wishlist, recommendations)
  lists/[slug]/         # Curated editorial collections
  cart/                 # Cart + coupon codes
  checkout/             # Payment UI (Stripe not wired — UI only)
  auth/                 # Sign-in + register (Supabase)
  legal/                # Terms · Privacy · Refund

components/
  Navbar.tsx            # Responsive nav with genre dropdown + wishlist count
  HeroSection.tsx       # Scroll-driven hero animation
  BookCard.tsx          # Card with hover elevation, cover zoom, wishlist toggle
  FeaturedSpotlight.tsx # Editorial spotlight layout (large hero + small grid)
  AnimatedGrid.tsx      # Framer-motion stagger-fade grid
  Stars.tsx             # Star rating (filled/half/empty)
  WishlistButton.tsx    # Heart toggle (Zustand)
  BookCoverImage.tsx    # Client cover with designed fallback on 404
  ThemeToggle.tsx       # Light/dark toggle (localStorage, no-flash)
  ConsentBanner.tsx     # GDPR consent banner

lib/
  books.ts              # 30 books, genres, featured IDs, cover URL helper
  reviews.ts            # Seeded reader reviews keyed by book ID
  samples.ts            # Original sample chapter content for 7 books
  lists.ts              # 5 curated editorial collections
  bundles.ts            # 4 value bundles with discount logic
  coupons.ts            # Coupon validation
  currency.ts           # 10-currency formatter
  supabase/             # browser + server Supabase client helpers

store/
  cart.ts               # Cart items, coupon, totals (Zustand + persist)
  currency.ts           # Selected country code (Zustand + persist)
  wishlist.ts           # Wishlist IDs (Zustand + persist)

middleware.ts           # Protects /checkout — redirects to /auth/login
```

---

## Features

### Storefront
- Browse 30 titles with genre filter, search, and sort
- Three pricing tiers per book: **Buy** (permanent), **Rent 7 days**, **Rent 30 days**
- Cart with coupon code support (`WELCOME10`, `SAVE20`, etc.)
- 10-currency selector (USD, EUR, GBP, INR, JPY, CAD, AUD, CHF, SGD, AED)
- Wishlist (heart on every card, persisted to localStorage)

### Reader
- In-browser reading at `/read/[id]`
- Font family toggle (serif Cormorant / sans Jakarta)
- Font size slider (14px – 24px)
- Theme picker (dark · sepia · light)
- Scroll progress bar + localStorage bookmark
- Buy gate at end of free sample

### Discovery
- Editorial spotlight on homepage (1 large featured + 5 small)
- Curated collections at `/lists/[slug]` (Staff Picks, Read Before 30, etc.)
- Value bundles section (Stoic Trilogy, Founder's Shelf, etc.)
- Star ratings + reader reviews on book detail pages
- Genre-affinity recommendations in My Library

### Auth + persistence
- Supabase email auth — register and log in
- `/checkout` protected by middleware
- All cart / wishlist / currency / reader progress persisted to `localStorage`

---

## Coupon codes (demo)

| Code | Discount |
|---|---|
| `WELCOME10` | 10% off |
| `SAVE20` | 20% off |
| `HALFOFF` | 50% off |

---

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for full Vercel and Render guides.

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | For auth | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For auth | Supabase anon/public key |

No other env vars are needed. The app runs in demo mode without Supabase.

---

## Contributing

See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).

---

## License

MIT
