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
import { getSample } from '@/lib/samples'

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

const PALETTE_TEXT: Record<string, string> = {
  ember: '#f5c4a8', twilight: '#c4aaf5', ocean: '#a8d4f5',
  gold: '#f5dfa8', forest: '#a8f5c4', dusk: '#d4a8f5',
  rose: '#f5a8c4', slate: '#a8c4f5',
}

export function FeaturedSpotlight({ hero, rest }: { hero: Book; rest: Book[] }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const country = useCurrencyStore((s) => s.country)
  const hasSample = Boolean(getSample(hero.id))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
      {/* Hero book — large */}
      <Link
        href={`/book/${hero.id}`}
        className="group lg:col-span-2 block overflow-hidden rounded-xl border border-line bg-surface hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
      >
        <div className="flex flex-col h-full">
          {/* Cover */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${imgLoaded && !imgError ? 'opacity-0' : 'opacity-100'}`}
              style={{ background: PALETTE_BG[hero.palette] }}
            >
              {imgError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <p className="font-display text-xl font-semibold leading-tight mb-1" style={{ color: PALETTE_TEXT[hero.palette] }}>{hero.title}</p>
                  <p className="text-sm opacity-60" style={{ color: PALETTE_TEXT[hero.palette] }}>{hero.author}</p>
                </div>
              )}
            </div>
            {!imgError && (
              <Image
                src={getCoverUrl(hero, 'L')}
                alt={hero.title}
                fill
                className={`object-cover object-top transition-all duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                onLoad={() => setImgLoaded(true)}
                onError={() => { setImgError(true); setImgLoaded(true) }}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
            <div className="absolute top-3 right-3" onClick={(e) => e.preventDefault()}>
              <WishlistButton bookId={hero.id} />
            </div>
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col flex-1">
            <span className="text-[10px] font-medium uppercase tracking-widest text-accent mb-2">{hero.genre}</span>
            <h3 className="font-display text-2xl font-semibold text-primary leading-tight mb-1">{hero.title}</h3>
            <p className="text-sm text-secondary mb-3">{hero.author}</p>
            <Stars rating={hero.rating} size="md" showNumber count={undefined} />
            <p className="text-sm text-secondary leading-relaxed mt-3 line-clamp-3 flex-1">{hero.description}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
              <p className="font-mono text-base font-medium text-primary tabular-nums">
                {formatPrice(hero.buyPrice, country)}
                <span className="font-sans text-xs text-secondary ml-1">/ buy</span>
              </p>
              {hasSample && (
                <Link
                  href={`/read/${hero.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-accent hover:underline"
                >
                  Read sample →
                </Link>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Small grid */}
      <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 content-start">
        {rest.map((book) => (
          <SmallCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}

function SmallCard({ book }: { book: Book }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const country = useCurrencyStore((s) => s.country)

  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div className="overflow-hidden rounded-xl bg-surface border border-line transition-all duration-300 group-hover:border-accent/30 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/50">
        <div className="relative aspect-[2/3] overflow-hidden">
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${imgLoaded && !imgError ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: PALETTE_BG[book.palette] }}
          >
            {imgError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                <p className="font-display text-xs font-semibold leading-tight" style={{ color: PALETTE_TEXT[book.palette] }}>{book.title}</p>
              </div>
            )}
          </div>
          {!imgError && (
            <Image
              src={getCoverUrl(book, 'M')}
              alt={book.title}
              fill
              className={`object-cover transition-all duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 45vw, 25vw"
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true) }}
            />
          )}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <WishlistButton bookId={book.id} />
          </div>
        </div>
        <div className="p-3">
          <span className="text-[10px] font-medium uppercase tracking-widest text-accent block mb-1">{book.genre}</span>
          <h3 className="font-display text-sm font-semibold text-primary leading-tight line-clamp-2 mb-0.5">{book.title}</h3>
          <p className="text-xs text-secondary truncate mb-2">{book.author}</p>
          <p className="font-mono text-xs font-medium text-primary tabular-nums">
            {formatPrice(book.buyPrice, country)}
          </p>
        </div>
      </div>
    </Link>
  )
}
