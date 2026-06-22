# Architecture

## Overview

bookVault is a **Next.js 15 App Router** application rendered as static HTML at build time (SSG). There is no custom backend — data is compile-time static, state is client-side (Zustand), and auth is delegated to Supabase.

```
Browser
  │
  ├── Static HTML (pre-rendered at build time)
  ├── Client components (React islands hydrated on load)
  │     ├── Zustand stores (cart, currency, wishlist) → localStorage
  │     └── Supabase browser client → auth session
  │
  └── Supabase (external)
        └── Auth only (no custom tables)
```

---

## Rendering model

| Route | Strategy | Why |
|---|---|---|
| `/` | SSG | Static homepage, no per-user data |
| `/browse` | SSG shell + client filter | Filter/search is client-side JS |
| `/book/[id]` | SSG via `generateStaticParams` | All 30 books pre-rendered |
| `/read/[id]` | SSG via `generateStaticParams` | Sample content is static |
| `/lists/[slug]` | SSG via `generateStaticParams` | Curated lists are static |
| `/library` | Client component | Reads Zustand (localStorage) — can't SSR |
| `/cart` | Client component | Cart state is localStorage-only |
| `/checkout` | Client component | Protected by middleware |
| `/auth/*` | Client component | Supabase auth flows |

---

## Data flow

### Book data

All 30 books live in `lib/books.ts` as a TypeScript array. No API calls, no database reads. Accessed at build time and baked into static HTML.

```
lib/books.ts → getBookById(), getBooksByGenre(), featuredIds[]
             ↓
app/book/[id]/page.tsx (server component, static)
             ↓
<BookCoverImage book={book} /> (client, handles 404 fallback)
```

### Cover images

Fetched at runtime from Open Library CDN:

```
getCoverUrl(book, size) → https://covers.openlibrary.org/b/isbn/{isbn}-{size}.jpg
```

If the ISBN doesn't exist in Open Library, the `<BookCoverImage>` client component catches the `onError` and renders a designed gradient fallback (title + author typeset on a palette-matched gradient).

### Cart / wishlist / currency

Pure client state. Zustand stores with `persist` middleware write to `localStorage` under these keys:

| Store | Key |
|---|---|
| Cart | `bookvault-cart` |
| Currency | `bookvault-currency` |
| Wishlist | `bookvault-wishlist` |
| Reader progress | `reader-progress-{bookId}` |
| Theme | `bookvault-theme` |
| Consent | `bookvault-consent` |

### Auth

Supabase SSR pattern:
- `lib/supabase/client.ts` — browser client for client components
- `lib/supabase/server.ts` — server client (reads cookies via `next/headers`) for server components and middleware
- Both return `null` when env vars are absent, allowing the app to run without Supabase configured

---

## Middleware

`middleware.ts` runs on every request matching `/(checkout)`. It:
1. Early-returns `NextResponse.next()` if Supabase env vars are absent (demo mode)
2. Creates a Supabase server client and checks the session
3. Redirects unauthenticated users to `/auth/login?redirect=/checkout`

---

## Component patterns

### Server components (default)
Page files and layout files are server components. They receive `params`/`searchParams` as props (Promises in Next.js 15) and can import server-only libs.

### Client components (`'use client'`)
Used when: hooks, event handlers, browser APIs (localStorage, scroll events), Zustand stores.

### The `BookCard` pattern
`BookCard` is a client component that reads the currency store directly via `useCurrencyStore()`. This is intentional — it avoids the prop-drilling pattern that previously caused currency changes not to reflect on the homepage (the server rendered the page with a fixed `country` prop).

---

## Theme system

```
localStorage['bookvault-theme'] = 'dark' | 'light'
                    ↓
<script> in <head> reads this before first paint → sets data-theme on <html>
                    ↓
CSS [data-theme="light"] { ... } overrides @theme tokens
```

The `suppressHydrationWarning` on `<html>` prevents React from complaining that the server rendered `data-theme="dark"` but the client may restore `"light"`.

---

## Reader architecture

`/read/[id]` is a two-file pattern:

- `app/read/[id]/page.tsx` — server component, fetches book + sample data, renders `<ReaderClient>`
- `app/read/[id]/ReaderClient.tsx` — client component, owns all reader state (font, theme, progress)

This keeps the heavy reader UI client-side while the data fetch stays server-side.

---

## Key constraints (do not change without understanding why)

1. **Buy + Rent always visible together** — all three price fields shown wherever pricing appears. This is a deliberate product decision.
2. **Checkout is UI-only** — no Stripe wired. Do not add a live payment processor without also adding proper webhook handling and order storage.
3. **No API routes** — the app has zero `app/api/` routes. Add them only when integrating a real payment processor or backend service.
4. **Cover images must not be committed** — all 30 covers are fetched at runtime from Open Library. This keeps the repo size small and makes adding new books trivial.
5. **Supabase graceful degradation** — both `createClient()` helpers return `null` when env vars are absent. Every caller must guard `if (!supabase) return`. Do not remove this pattern.
