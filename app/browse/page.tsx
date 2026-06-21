'use client'
import { useState, useMemo } from 'react'
import { books, genres, type Genre } from '@/lib/books'
import { BookCard } from '@/components/BookCard'
import { useCurrencyStore } from '@/store/currency'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function BrowseContent() {
  const searchParams = useSearchParams()
  const initialGenre = searchParams.get('genre') as Genre | null

  const { country } = useCurrencyStore()
  const [query, setQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState<Genre | 'All'>(
    initialGenre && genres.includes(initialGenre) ? initialGenre : 'All'
  )

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchGenre = activeGenre === 'All' || b.genre === activeGenre
      const q = query.toLowerCase().trim()
      const matchSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
      return matchGenre && matchSearch
    })
  }, [query, activeGenre])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">
          {filtered.length} titles
        </p>
        <h1 className="font-display text-5xl font-semibold text-primary">
          Browse
        </h1>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="Search by title, author, or genre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-lg bg-surface border border-line text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-accent/60 transition-colors"
        />
      </div>

      {/* Genre filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {(['All', ...genres] as const).map((g) => (
          <button
            key={g}
            onClick={() => setActiveGenre(g as Genre | 'All')}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              activeGenre === g
                ? 'bg-accent text-black font-medium'
                : 'bg-surface border border-line text-secondary hover:text-primary hover:border-accent/40'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-2xl text-primary mb-2">No results</p>
          <p className="text-sm text-secondary">Try a different search or genre.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function BrowsePage() {
  return (
    <Suspense>
      <BrowseContent />
    </Suspense>
  )
}
