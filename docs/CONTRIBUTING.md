# Contributing

## Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, deployable. Direct pushes blocked. |
| `feat/nextjs-rewrite` | Active development branch. |
| `feat/*` | Feature branches — open PRs against `main`. |
| `fix/*` | Bug fix branches. |

Always branch from `main`, work on your branch, then open a PR.

---

## Local setup

```bash
git clone https://github.com/thunderbuddies462/bookVault.git
cd bookVault
npm install
cp .env.local.example .env.local   # fill in Supabase vars (optional)
npm run dev
```

---

## Type-check gate

There are no unit tests. The type-check + build is the gate:

```bash
npm run build
```

This must pass before any commit that touches TypeScript. Run it locally before pushing — CI will also run it.

---

## Code conventions

### File placement

| What | Where |
|---|---|
| Page routes | `app/<route>/page.tsx` |
| Client-only UI components | `components/*.tsx` with `'use client'` at top |
| Server-only components | `components/*.tsx` (no directive) |
| Compile-time data | `lib/*.ts` |
| Zustand stores | `store/*.ts` |

### Server vs client components

- Default to **server components**. Add `'use client'` only when you need hooks, event handlers, or browser APIs.
- Never import a client component directly into a server component that does data fetching — wrap it or pass data as props.
- Event handlers (`onError`, `onClick`, etc.) cannot be passed through server component boundaries.

### Styling

Use Tailwind utility classes. Custom design tokens live in `app/globals.css` under `@theme`:

```css
--color-accent: #c9a448;
--color-base:   #0c0a09;
/* etc. */
```

Reference tokens via Tailwind utilities (`bg-accent`, `text-secondary`, `border-line`). Do not hardcode hex values in components — use the token.

### State

All persistent client state lives in Zustand stores under `store/`. Use `persist` middleware for anything that should survive a page refresh.

### Data

All book data is compile-time static in `lib/books.ts`. Add new books there. Cover images are fetched from Open Library CDN at runtime — no images are committed to the repo.

---

## Commit style

```
type: short description (imperative, under 72 chars)

Optional longer explanation. Wrap at 72 chars.
Explain WHY, not what — the diff shows what.
```

Types: `feat` · `fix` · `docs` · `refactor` · `chore` · `style` · `perf`

Examples:
```
feat: add reading streak tracker to My Library
fix: prevent currency selector from closing on outside click in iOS Safari
docs: add Render deployment guide
chore: bump framer-motion to 12.x
```

---

## Adding a new book

1. Open `lib/books.ts`.
2. Append a `Book` object to the `books` array. Required fields: `id`, `title`, `author`, `description`, `genre`, `pages`, `year`, `rating`, `buyPrice`, `rentPrice7`, `rentPrice30`, `isbn`, `palette`.
3. `palette` must be one of: `ember` · `twilight` · `ocean` · `gold` · `forest` · `dusk` · `rose` · `slate`.
4. `isbn` is used to fetch the cover from Open Library. If no ISBN exists, the gradient fallback renders automatically.
5. To add a sample chapter, add an entry to `lib/samples.ts`.
6. To add reviews, add an entry to `lib/reviews.ts`.

---

## Adding a curated list

Add an entry to `lib/lists.ts`:

```ts
{
  slug: 'my-list',           // URL: /lists/my-list
  title: 'My List',
  description: '...',
  curator: 'bookVault Editorial',
  bookIds: [1, 3, 5, 7],    // references lib/books.ts ids
  tag: 'Fiction',
}
```

No other changes needed — `generateStaticParams` picks it up automatically.

---

## Adding a bundle

Add an entry to `lib/bundles.ts`:

```ts
{
  id: 'my-bundle',
  title: 'My Bundle',
  tagline: '...',
  bookIds: [1, 3, 5],
  discountPct: 20,
}
```

The homepage renders all bundles automatically.

---

## Wiring Stripe (future)

`app/checkout/page.tsx` is currently UI-only. To wire live payments:

1. `npm install @stripe/stripe-js @stripe/react-stripe-js`
2. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` to env.
3. Create a route handler at `app/api/checkout/route.ts` to create a `PaymentIntent`.
4. Replace the static form in `app/checkout/page.tsx` with a Stripe `Elements` provider.

The cart total and discount logic in `store/cart.ts` is already correct — pass `total()` to the PaymentIntent amount.
