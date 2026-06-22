'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { Book } from '@/lib/books'
import { getCoverUrl } from '@/lib/books'

const PALETTE_TEXT: Record<string, string> = {
  ember: '#f5c4a8', twilight: '#c4aaf5', ocean: '#a8d4f5',
  gold: '#f5dfa8', forest: '#a8f5c4', dusk: '#d4a8f5',
  rose: '#f5a8c4', slate: '#a8c4f5',
}

export function BookCoverImage({ book }: { book: Book }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <p className="font-display text-lg font-semibold leading-tight mb-1" style={{ color: PALETTE_TEXT[book.palette] }}>
          {book.title}
        </p>
        <p className="text-xs opacity-60" style={{ color: PALETTE_TEXT[book.palette] }}>
          {book.author}
        </p>
      </div>
    )
  }

  return (
    <Image
      src={getCoverUrl(book, 'L')}
      alt={book.title}
      fill
      className="object-cover"
      priority
      sizes="(max-width: 640px) 256px, 288px"
      onError={() => setError(true)}
    />
  )
}
