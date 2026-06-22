import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LISTS, getList } from '@/lib/lists'
import { books, getBookById } from '@/lib/books'
import { BookCard } from '@/components/BookCard'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return LISTS.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const list = getList(slug)
  if (!list) return {}
  return {
    title: `${list.title} — bookVault`,
    description: list.description,
  }
}

export default async function ListPage({ params }: Props) {
  const { slug } = await params
  const list = getList(slug)
  if (!list) notFound()

  const listBooks = list.bookIds.map((id) => getBookById(id)).filter(Boolean)

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors mb-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="inline-block text-[10px] font-medium uppercase tracking-widest text-accent border border-accent/30 rounded-full px-2 py-0.5 mb-4">
            {list.tag}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary mb-4 text-balance">
            {list.title}
          </h1>
          <p className="text-base text-secondary leading-relaxed">{list.description}</p>
          <p className="text-sm text-secondary mt-3">
            Curated by <span className="text-primary">{list.curator}</span>
            {' · '}{listBooks.length} books
          </p>
        </div>

        {/* Books grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {listBooks.map((book, i) => book && (
            <div key={book.id} className="relative">
              {/* Position badge */}
              <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <span className="text-[10px] font-mono font-medium text-accent">{i + 1}</span>
              </div>
              <BookCard book={book} />
            </div>
          ))}
        </div>

        {/* Other lists */}
        <div className="mt-24">
          <h2 className="font-display text-2xl font-semibold text-primary mb-6">More collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LISTS.filter((l) => l.slug !== list.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/lists/${other.slug}`}
                className="group rounded-xl border border-line bg-surface p-5 hover:border-accent/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="inline-block text-[10px] font-medium uppercase tracking-widest text-accent border border-accent/30 rounded-full px-2 py-0.5 mb-3">
                  {other.tag}
                </span>
                <h3 className="font-display text-lg font-semibold text-primary mb-1 group-hover:text-accent transition-colors">
                  {other.title}
                </h3>
                <p className="text-xs text-secondary line-clamp-2">{other.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
