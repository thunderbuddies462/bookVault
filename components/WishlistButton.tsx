'use client'
import { useWishlistStore } from '@/store/wishlist'

interface WishlistButtonProps {
  bookId: number
  className?: string
}

export function WishlistButton({ bookId, className = '' }: WishlistButtonProps) {
  const { has, toggle } = useWishlistStore()
  const saved = has(bookId)

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(bookId) }}
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`p-1.5 rounded-full transition-all duration-200 ${
        saved
          ? 'text-red-400 bg-red-400/10'
          : 'text-secondary hover:text-red-400 hover:bg-red-400/10 bg-black/30'
      } ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
