'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Book } from '@/lib/books'
import { getCoverUrl } from '@/lib/books'
import { useCurrencyStore } from '@/store/currency'
import { formatPrice } from '@/lib/currency'
import { Stars } from './Stars'
import { WishlistButton } from './WishlistButton'

const PALETTE_BG: Record<string, string> = {
  ember:   'linear-gradient(150deg, #5c2510 0%, #2a0e04 100%)',
  twilight:'linear-gradient(150deg, #2e1650 0%, #0e0520 100%)',
  ocean:   'linear-gradient(150deg, #0d3f5c 0%, #04151e 100%)',
  gold:    'linear-gradient(150deg, #4a3208 0%, #1a1204 100%)',
  forest:  'linear-gradient(150deg, #133520 0%, #050f09 100%)',
  dusk:    'linear-gradient(150deg, #351545 0%, #0f0418 100%)',
  rose:    'linear-gradient(150deg, #4a1528 0%, #1a040d 100%)',
  slate:   'linear-gradient(150deg, #1e2d45 0%, #080e1a 100%)',
}

const PALETTE_TEXT: Record<string, string> = {
  ember: '#f5c4a8', twilight: '#c4aaf5', ocean: '#a8d4f5',
  gold: '#f5dfa8', forest: '#a8f5c4', dusk: '#d4a8f5',
  rose: '#f5a8c4', slate: '#a8c4f5',
}

export function BookCard({ book }: { book: Book }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError]   = useState(false)
  const country = useCurrencyStore((s) => s.country)

  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div className="overflow-hidden rounded-xl bg-surface border border-line transition-all duration-300 group-hover:border-accent/30 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/50">

        {/* Cover */}
        <div className="relative aspect-[2/3] overflow-hidden">
          {/* Gradient fallback */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${imgLoaded && !imgError ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: PALETTE_BG[book.palette] }}
          >
            {imgError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <p
                  className="font-display text-sm font-semibold leading-tight mb-1"
                  style={{ color: PALETTE_TEXT[book.palette] }}
                >
                  {book.title}
                </p>
                <p className="text-[10px] opacity-60" style={{ color: PALETTE_TEXT[book.palette] }}>
                  {book.author}
                </p>
              </div>
            )}
            {!imgError && <div className="absolute inset-0 animate-pulse bg-white/[0.03]" />}
          </div>

          {/* Cover image — zooms on hover */}
          {!imgError && (
            <Image
              src={getCoverUrl(book, 'M')}
              alt={book.title}
              fill
              className={`object-cover transition-all duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true) }}
            />
          )}

          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Wishlist — appears on hover */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <WishlistButton bookId={book.id} />
          </div>
        </div>

        {/* Info */}
        <div className="p-3 sm:p-3.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-medium uppercase tracking-widest text-accent">
              {book.genre}
            </span>
            <Stars rating={book.rating} size="sm" />
          </div>
          <h3 className="font-display text-sm sm:text-base font-semibold text-primary leading-tight line-clamp-2 mb-0.5">
            {book.title}
          </h3>
          <p className="text-xs text-secondary mb-2.5 truncate">{book.author}</p>
          <p className="font-mono text-sm font-medium text-primary tabular-nums">
            {formatPrice(book.buyPrice, country)}
            <span className="text-xs text-secondary font-normal ml-1 font-sans">/ buy</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
