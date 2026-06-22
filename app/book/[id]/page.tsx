import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { books, getBookById, getCoverUrl, type Genre } from '@/lib/books'
import { AddToCart } from './AddToCart'
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

  const related = books
    .filter((b) => b.genre === book.genre && b.id !== book.id)
    .slice(0, 4)

  const displayYear = book.year < 0
    ? `${Math.abs(book.year)} BC`
    : String(book.year)

  return (
    <div className="pt-20">
      {/* Main content */}
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
            <div
              className="relative w-64 sm:w-80 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/60"
              style={{ background: PALETTE_BG[book.palette] }}
            >
              <Image
                src={getCoverUrl(book, 'L')}
                alt={book.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 256px, 320px"
              />
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
            <p className="text-lg text-secondary mb-6">{book.author}</p>

            {/* Meta */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-line">
              <div>
                <p className="text-xs text-secondary uppercase tracking-wide mb-1">Rating</p>
                <p className="text-sm font-medium text-primary">{book.rating.toFixed(1)} / 5</p>
              </div>
              <div>
                <p className="text-xs text-secondary uppercase tracking-wide mb-1">Pages</p>
                <p className="text-sm font-medium text-primary">{book.pages}</p>
              </div>
              <div>
                <p className="text-xs text-secondary uppercase tracking-wide mb-1">Published</p>
                <p className="text-sm font-medium text-primary">{displayYear}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-secondary leading-relaxed mb-10">
              {book.description}
            </p>

            {/* Add to cart */}
            <AddToCart book={book} />
          </div>
        </div>

        {/* Related books */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-3xl font-semibold text-primary mb-8">
              More {book.genre}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((b) => (
                <Link key={b.id} href={`/book/${b.id}`} className="group block">
                  <div className="overflow-hidden rounded-lg border border-line hover:border-accent/40 transition-all">
                    <div
                      className="relative aspect-[2/3]"
                      style={{ background: PALETTE_BG[b.palette] }}
                    >
                      <Image
                        src={getCoverUrl(b, 'M')}
                        alt={b.title}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-display text-sm font-semibold text-primary line-clamp-2">{b.title}</p>
                      <p className="text-xs text-secondary mt-0.5">{b.author}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
