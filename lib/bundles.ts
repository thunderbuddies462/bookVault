import type { Book } from './books'

export interface Bundle {
  id: string
  title: string
  tagline: string
  bookIds: number[]
  discountPct: number // percentage off combined buy price
}

export const BUNDLES: Bundle[] = [
  {
    id: 'stoic-trio',
    title: 'The Stoic Trilogy',
    tagline: 'Marcus Aurelius, Plato, and Frankl — three pillars of examined living.',
    bookIds: [10, 5, 14],
    discountPct: 20,
  },
  {
    id: 'founder-shelf',
    title: 'The Founder\'s Shelf',
    tagline: 'Zero to One, Lean Startup, and Good to Great — read by every great founder.',
    bookIds: [7, 17, 24],
    discountPct: 18,
  },
  {
    id: 'mind-mastery',
    title: 'Mind Mastery',
    tagline: 'Atomic Habits, Thinking Fast and Slow, and Never Split the Difference.',
    bookIds: [4, 6, 13],
    discountPct: 22,
  },
  {
    id: 'sci-fi-canon',
    title: 'The Sci-Fi Canon',
    tagline: 'Dune, Project Hail Mary, and Neuromancer — the three pillars.',
    bookIds: [3, 9, 29],
    discountPct: 20,
  },
]

export function getBundlePrice(bundle: Bundle, books: Book[]): { original: number; discounted: number; savings: number } {
  const bundleBooks = bundle.bookIds
    .map((id) => books.find((b) => b.id === id))
    .filter((b): b is Book => Boolean(b))
  const original = bundleBooks.reduce((sum, b) => sum + b.buyPrice, 0)
  const discounted = original * (1 - bundle.discountPct / 100)
  const savings = original - discounted
  return { original, discounted, savings }
}
