'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { getBookById, getCoverUrl, books } from '@/lib/books'
import { useCurrencyStore } from '@/store/currency'
import { formatPrice } from '@/lib/currency'
import { Stars } from '@/components/Stars'
import { BookCard } from '@/components/BookCard'
import { getSample } from '@/lib/samples'

export default function LibraryPage() {
  const items   = useCartStore((s) => s.items)
  const wishIds = useWishlistStore((s) => s.ids)
  const country = useCurrencyStore((s) => s.country)

  const ownedItems = items.filter((i) => i.type === 'buy')
  const rentedItems = items.filter((i) => i.type === 'rent7' || i.type === 'rent30')
  const wishlistBooks = wishIds.map((id) => getBookById(id)).filter(Boolean)

  // Genre affinity → recommendations
  const ownedGenres = ownedItems
    .map((i) => getBookById(i.bookId)?.genre)
    .filter(Boolean) as string[]
  const genreCounts = ownedGenres.reduce<Record<string, number>>((acc, g) => {
    acc[g] = (acc[g] ?? 0) + 1; return acc
  }, {})
  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
  const ownedIds  = new Set(items.map((i) => i.bookId))
  const recommended = topGenre
    ? books.filter((b) => b.genre === topGenre && !ownedIds.has(b.id)).slice(0, 4)
    : books.filter((b) => !ownedIds.has(b.id)).slice(0, 4)

  const hasBooks = ownedItems.length > 0 || rentedItems.length > 0

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">Your account</p>
          <h1 className="font-display text-4xl font-semibold text-primary">My Library</h1>
        </div>

        {!hasBooks ? (
          <EmptyLibrary />
        ) : (
          <>
            {/* Owned */}
            {ownedItems.length > 0 && (
              <section className="mb-16">
                <h2 className="font-display text-2xl font-semibold text-primary mb-6 flex items-center gap-3">
                  Owned
                  <span className="text-sm font-sans font-normal text-secondary">{ownedItems.length} book{ownedItems.length !== 1 ? 's' : ''}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ownedItems.map((item) => {
                    const book = getBookById(item.bookId)
                    if (!book) return null
                    const hasSample = Boolean(getSample(book.id))
                    return (
                      <LibraryBookRow key={item.bookId} book={book} label="Owned" hasSample={hasSample} country={country} />
                    )
                  })}
                </div>
              </section>
            )}

            {/* Rented */}
            {rentedItems.length > 0 && (
              <section className="mb-16">
                <h2 className="font-display text-2xl font-semibold text-primary mb-6 flex items-center gap-3">
                  Rented
                  <span className="text-sm font-sans font-normal text-secondary">{rentedItems.length} book{rentedItems.length !== 1 ? 's' : ''}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rentedItems.map((item) => {
                    const book = getBookById(item.bookId)
                    if (!book) return null
                    const days = item.type === 'rent7' ? 7 : 30
                    const hasSample = Boolean(getSample(book.id))
                    return (
                      <LibraryBookRow key={item.bookId} book={book} label={`${days}-day rental`} hasSample={hasSample} country={country} />
                    )
                  })}
                </div>
              </section>
            )}
          </>
        )}

        {/* Wishlist */}
        {wishlistBooks.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl font-semibold text-primary mb-6 flex items-center gap-3">
              Saved for later
              <span className="text-sm font-sans font-normal text-secondary">{wishlistBooks.length}</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistBooks.map((book) => book && <BookCard key={book.id} book={book} />)}
            </div>
          </section>
        )}

        {/* Recommendations */}
        {recommended.length > 0 && (
          <section>
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-1">Personalised</p>
              <h2 className="font-display text-2xl font-semibold text-primary">
                {topGenre ? `More ${topGenre}` : 'You might like'}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommended.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

const PALETTE_BG: Record<string, string> = {
  ember:   'linear-gradient(150deg, #5c2510, #2a0e04)',
  twilight:'linear-gradient(150deg, #2e1650, #0e0520)',
  ocean:   'linear-gradient(150deg, #0d3f5c, #04151e)',
  gold:    'linear-gradient(150deg, #4a3208, #1a1204)',
  forest:  'linear-gradient(150deg, #133520, #050f09)',
  dusk:    'linear-gradient(150deg, #351545, #0f0418)',
  rose:    'linear-gradient(150deg, #4a1528, #1a040d)',
  slate:   'linear-gradient(150deg, #1e2d45, #080e1a)',
}

function LibraryBookRow({ book, label, hasSample, country }: {
  book: ReturnType<typeof getBookById> & object
  label: string
  hasSample: boolean
  country: string
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-line bg-surface p-4">
      <Link href={`/book/${book.id}`} className="flex-shrink-0">
        <div
          className="relative w-16 aspect-[2/3] rounded-lg overflow-hidden"
          style={{ background: PALETTE_BG[book.palette] }}
        >
          <Image
            src={getCoverUrl(book, 'S')}
            alt={book.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      </Link>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[10px] font-medium uppercase tracking-widest text-accent mb-1">{label}</span>
        <Link href={`/book/${book.id}`} className="font-display text-base font-semibold text-primary hover:text-accent transition-colors leading-tight line-clamp-2 mb-0.5">
          {book.title}
        </Link>
        <p className="text-xs text-secondary mb-2 truncate">{book.author}</p>
        <Stars rating={book.rating} size="sm" />
        {hasSample && (
          <Link
            href={`/read/${book.id}`}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Read now
          </Link>
        )}
      </div>
    </div>
  )
}

function EmptyLibrary() {
  return (
    <div className="text-center py-20">
      <svg className="mx-auto mb-6 opacity-20" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
      <h2 className="font-display text-2xl font-semibold text-primary mb-3">Your library is empty</h2>
      <p className="text-secondary mb-8 max-w-sm mx-auto">
        Books you buy or rent will appear here. Start with a free sample — no account needed.
      </p>
      <Link
        href="/browse"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors"
      >
        Browse books
      </Link>
    </div>
  )
}
