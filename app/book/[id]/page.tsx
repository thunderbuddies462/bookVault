import Link from 'next/link'
import { notFound } from 'next/navigation'
import { books, getBookById } from '@/lib/books'
import { AddToCart } from './AddToCart'
import { Stars } from '@/components/Stars'
import { WishlistButton } from '@/components/WishlistButton'
import { BookCoverImage } from '@/components/BookCoverImage'
import { getReviews, getAverageRating } from '@/lib/reviews'
import { getSample } from '@/lib/samples'
import { BookCard } from '@/components/BookCard'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return books.map((b) => ({ id: String(b.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const book = getBookById(Number(id))
  if (!book) return {}
  return {
    title: `${book.title} by ${book.author}`,
    description: book.description,
    openGraph: {
      title: `${book.title} — bookVault`,
      description: book.description,
      type: 'book',
    },
  }
}

const PALETTE_BG: Record<string, string> = {
  ember:   'linear-gradient(135deg, #5c2510, #1a0a04)',
  twilight:'linear-gradient(135deg, #2e1650, #0e0520)',
  ocean:   'linear-gradient(135deg, #0d3f5c, #04151e)',
  gold:    'linear-gradient(135deg, #4a3208, #1a1204)',
  forest:  'linear-gradient(135deg, #133520, #050f09)',
  dusk:    'linear-gradient(135deg, #351545, #0f0418)',
  rose:    'linear-gradient(135deg, #4a1528, #1a040d)',
  slate:   'linear-gradient(135deg, #1e2d45, #080e1a)',
}

export default async function BookPage({ params }: Props) {
  const { id } = await params
  const book = getBookById(Number(id))
  if (!book) notFound()

  const related  = books.filter((b) => b.genre === book.genre && b.id !== book.id).slice(0, 4)
  const reviews  = getReviews(book.id)
  const avgRating = getAverageRating(book.id) ?? book.rating
  const sample   = getSample(book.id)
  const readingMinutes = Math.round(book.pages * 1.5)

  const displayYear = book.year < 0 ? `${Math.abs(book.year)} BC` : String(book.year)

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back */}
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors mb-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Cover */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div
                className="relative w-64 sm:w-72 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/60"
                style={{ background: PALETTE_BG[book.palette] }}
              >
                <BookCoverImage book={book} />
              </div>
              {/* Wishlist button */}
              <div className="absolute top-3 right-3">
                <WishlistButton bookId={book.id} />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4">
              {book.genre}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary text-balance mb-2">
              {book.title}
            </h1>
            <p className="text-lg text-secondary mb-4">{book.author}</p>

            {/* Stars + rating */}
            <div className="flex items-center gap-3 mb-8">
              <Stars rating={avgRating} size="md" showNumber count={reviews.length || undefined} />
              {reviews.length > 0 && (
                <a href="#reviews" className="text-xs text-secondary hover:text-accent transition-colors">
                  {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </a>
              )}
            </div>

            {/* Meta strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 pb-8 border-b border-line text-sm">
              <div>
                <p className="text-xs text-secondary uppercase tracking-wide mb-1">Pages</p>
                <p className="font-medium text-primary">{book.pages}</p>
              </div>
              <div>
                <p className="text-xs text-secondary uppercase tracking-wide mb-1">Reading time</p>
                <p className="font-medium text-primary">~{readingMinutes < 60 ? `${readingMinutes}m` : `${Math.round(readingMinutes / 60)}h`}</p>
              </div>
              <div>
                <p className="text-xs text-secondary uppercase tracking-wide mb-1">Published</p>
                <p className="font-medium text-primary">{displayYear}</p>
              </div>
              {sample && (
                <div className="flex items-end">
                  <Link
                    href={`/read/${book.id}`}
                    className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:underline"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                    Read free sample
                  </Link>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-base text-secondary leading-relaxed mb-10">
              {book.description}
            </p>

            {/* Add to cart */}
            <AddToCart book={book} />
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div id="reviews" className="mt-24">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-primary mb-6">
              Reader reviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-line bg-surface p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-primary text-sm">{review.name}</p>
                      <p className="text-xs text-secondary">{review.date}</p>
                    </div>
                    <Stars rating={review.rating} size="sm" />
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related books */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-primary mb-8">
              More {book.genre}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
