'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { User } from '@supabase/supabase-js'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { getBookById, getCoverUrl, books } from '@/lib/books'
import { useCurrencyStore } from '@/store/currency'
import { Stars } from '@/components/Stars'
import { BookCard } from '@/components/BookCard'
import { getSample } from '@/lib/samples'
import { createClient } from '@/lib/supabase/client'

export default function LibraryPage() {
  const [user, setUser]       = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  const items      = useCartStore((s) => s.items)
  const wishIds    = useWishlistStore((s) => s.ids)
  const hasHydrated = useWishlistStore((s) => s._hasHydrated)
  const country    = useCurrencyStore((s) => s.country)

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) {
      // Demo mode — no Supabase configured → treat as logged out
      setAuthLoading(false)
      return
    }
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const ownedItems  = items.filter((i) => i.type === 'buy')
  const rentedItems = items.filter((i) => i.type === 'rent7' || i.type === 'rent30')
  const wishlistBooks = wishIds.map((id) => getBookById(id)).filter(Boolean)

  // Genre-affinity recommendations (only shown when logged in)
  const ownedGenres = ownedItems.map((i) => getBookById(i.bookId)?.genre).filter(Boolean) as string[]
  const genreCounts = ownedGenres.reduce<Record<string, number>>((acc, g) => { acc[g] = (acc[g] ?? 0) + 1; return acc }, {})
  const topGenre    = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
  const ownedIds    = new Set(items.map((i) => i.bookId))
  const recommended = topGenre
    ? books.filter((b) => b.genre === topGenre && !ownedIds.has(b.id)).slice(0, 4)
    : books.filter((b) => !ownedIds.has(b.id)).slice(0, 4)

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">Your account</p>
          <h1 className="font-display text-4xl font-semibold text-primary">My Library</h1>
        </div>

        {/* ── Auth-gated book shelves ───────────────────────────── */}
        {authLoading ? (
          <LibrarySkeleton />
        ) : !user ? (
          <SignInGate />
        ) : (
          <>
            {ownedItems.length === 0 && rentedItems.length === 0 ? (
              <EmptyLibrary />
            ) : (
              <>
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
                        return <LibraryBookRow key={item.bookId} book={book} label="Owned" hasSample={Boolean(getSample(book.id))} country={country} />
                      })}
                    </div>
                  </section>
                )}

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
                        return <LibraryBookRow key={item.bookId} book={book} label={`${days}-day rental`} hasSample={Boolean(getSample(book.id))} country={country} />
                      })}
                    </div>
                  </section>
                )}
              </>
            )}

            {/* Recommendations */}
            {recommended.length > 0 && (
              <section className="mb-16">
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
          </>
        )}

        {/* ── Favourites — always visible (pre- and post-login) ─── */}
        {hasHydrated && wishlistBooks.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold text-primary flex items-center gap-3">
                Saved for later
                <span className="text-sm font-sans font-normal text-secondary">{wishlistBooks.length}</span>
              </h2>
              <Link href="/favourites" className="text-sm text-accent hover:underline">
                View all favourites →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistBooks.slice(0, 4).map((book) => book && <BookCard key={book.id} book={book} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────

function SignInGate() {
  return (
    <div className="mb-16 rounded-2xl border border-line bg-surface p-10 text-center max-w-md mx-auto">
      <svg className="mx-auto mb-5 opacity-30" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      <h2 className="font-display text-2xl font-semibold text-primary mb-3">Sign in to view your library</h2>
      <p className="text-secondary text-sm mb-6 leading-relaxed">
        Books you buy or rent are tied to your account. Sign in to access them from any device.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/auth/login?redirect=/library"
          className="px-6 py-3 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/auth/sign-in?redirect=/library"
          className="px-6 py-3 rounded-full border border-line text-primary text-sm font-medium hover:border-accent/40 transition-colors"
        >
          Create account
        </Link>
      </div>
    </div>
  )
}

function LibrarySkeleton() {
  return (
    <div className="mb-16 space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-24 rounded-xl bg-surface border border-line animate-pulse" />
      ))}
    </div>
  )
}

function EmptyLibrary() {
  return (
    <div className="text-center py-16 mb-16">
      <svg className="mx-auto mb-6 opacity-20" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
      <h2 className="font-display text-2xl font-semibold text-primary mb-3">Your library is empty</h2>
      <p className="text-secondary mb-8 max-w-sm mx-auto">Books you buy or rent will appear here.</p>
      <Link
        href="/browse"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors"
      >
        Browse books
      </Link>
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
        <div className="relative w-16 aspect-[2/3] rounded-lg overflow-hidden" style={{ background: PALETTE_BG[book.palette] }}>
          <Image src={getCoverUrl(book, 'S')} alt={book.title} fill className="object-cover" sizes="64px" />
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
          <Link href={`/read/${book.id}`} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
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
