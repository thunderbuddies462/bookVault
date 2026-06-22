'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Book } from '@/lib/books'
import { getCoverUrl } from '@/lib/books'
import { useCurrencyStore } from '@/store/currency'
import { formatPrice } from '@/lib/currency'

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

export function BookCard({ book }: { book: Book }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError]   = useState(false)
  const country = useCurrencyStore((s) => s.country)

  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-surface border border-line transition-all duration-300 group-hover:border-accent/40 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-black/40">

        {/* Cover */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: PALETTE_BG[book.palette] }}
          >
            <div className="absolute inset-0 animate-pulse bg-white/5" />
          </div>

          {!imgError && (
            <Image
              src={getCoverUrl(book, 'M')}
              alt={book.title}
              fill
              className={`object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true) }}
            />
          )}

          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Info */}
        <div className="p-3 sm:p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium uppercase tracking-widest text-accent">
              {book.genre}
            </span>
            <span className="text-[10px] text-secondary tabular-nums">
              {book.rating.toFixed(1)}
            </span>
          </div>
          <h3 className="font-display text-sm sm:text-base font-semibold text-primary leading-tight line-clamp-2 mb-0.5">
            {book.title}
          </h3>
          <p className="text-xs text-secondary mb-3 truncate">{book.author}</p>
          <p className="font-mono text-sm font-medium text-primary tabular-nums">
            {formatPrice(book.buyPrice, country)}
            <span className="text-xs text-secondary font-normal ml-1 font-sans">/ buy</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
