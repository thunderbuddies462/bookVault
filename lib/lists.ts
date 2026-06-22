export interface CuratedList {
  slug: string
  title: string
  description: string
  curator: string
  bookIds: number[]
  tag: string
}

export const LISTS: CuratedList[] = [
  {
    slug: 'read-before-30',
    title: 'Read Before You\'re 30',
    description: 'Ten books that reframe how you think — about time, people, money, and meaning. The ones that hit differently when you\'re still building everything.',
    curator: 'bookVault Editorial',
    bookIds: [2, 4, 6, 9, 14, 7, 10, 3, 1, 12],
    tag: 'Essential',
  },
  {
    slug: 'staff-picks',
    title: 'Staff Picks — June 2026',
    description: 'What we\'re reading this month, argued over in the team chat, and eventually agreed upon as genuinely great.',
    curator: 'bookVault Team',
    bookIds: [9, 8, 1, 14, 4, 27, 3, 2],
    tag: 'Staff Picks',
  },
  {
    slug: 'stoic-foundations',
    title: 'The Stoic Shelf',
    description: 'Marcus Aurelius, Plato, Frankl — the books that have helped people endure, reflect, and act better for 2,400 years.',
    curator: 'bookVault Editorial',
    bookIds: [10, 5, 14, 6, 11],
    tag: 'Philosophy',
  },
  {
    slug: 'sharpen-your-mind',
    title: 'Sharpen Your Mind',
    description: 'Behavioural economics, cognitive psychology, and the science of decision-making. Understand yourself before the world does.',
    curator: 'bookVault Editorial',
    bookIds: [6, 4, 13, 7, 12, 2],
    tag: 'Non-Fiction',
  },
  {
    slug: 'worlds-worth-living-in',
    title: 'Worlds Worth Living In',
    description: 'The fiction titles that feel like places you actually move to. You will mourn leaving each of them.',
    curator: 'bookVault Editorial',
    bookIds: [3, 8, 9, 1, 16, 28, 29, 27],
    tag: 'Fiction',
  },
]

export function getList(slug: string): CuratedList | undefined {
  return LISTS.find((l) => l.slug === slug)
}
