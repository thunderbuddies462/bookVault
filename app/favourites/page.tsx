'use client'
import Link from 'next/link'
import { useWishlistStore } from '@/store/wishlist'
import { getBookById } from '@/lib/books'
import { BookCard } from '@/components/BookCard'
import { WishlistButton } from '@/components/WishlistButton'

export default function FavouritesPage() {
  const ids          = useWishlistStore((s) => s.ids)
  const hasHydrated  = useWishlistStore((s) => s._hasHydrated)

  // Don't render list until localStorage has rehydrated — avoids flash of empty
  if (!hasHydrated) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">Your account</p>
            <h1 className="font-display text-4xl font-semibold text-primary">Favourites</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-surface border border-line animate-pulse aspect-[2/3]" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const books = ids.map((id) => getBookById(id)).filter(Boolean)

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">Your account</p>
            <h1 className="font-display text-4xl font-semibold text-primary">Favourites</h1>
          </div>
          {books.length > 0 && (
            <p className="text-sm text-secondary hidden sm:block">
              {books.length} saved book{books.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {books.length === 0 ? (
          <EmptyFavourites />
        ) : (
          <>
            <p className="text-xs text-secondary mb-8 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
              Saved on this device — your favourites stay with you after signing in.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              {books.map((book) => book && <BookCard key={book.id} book={book} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function EmptyFavourites() {
  return (
    <div className="text-center py-20">
      <svg className="mx-auto mb-6 opacity-20" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      <h2 className="font-display text-2xl font-semibold text-primary mb-3">No favourites yet</h2>
      <p className="text-secondary mb-8 max-w-sm mx-auto leading-relaxed">
        Heart any book to save it here. Favourites are stored on this device and carry over when you sign in.
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
