'use client'
import { useState } from 'react'
import type { Book } from '@/lib/books'
import { useCartStore, type CartItemType } from '@/store/cart'
import { useCurrencyStore } from '@/store/currency'
import { formatPrice } from '@/lib/currency'
import Link from 'next/link'

interface AddToCartProps {
  book: Book
}

const OPTIONS: { type: CartItemType; label: string; sublabel: string; price: (b: Book) => number }[] = [
  { type: 'buy',    label: 'Buy',         sublabel: 'Permanent access', price: (b) => b.buyPrice    },
  { type: 'rent7',  label: 'Rent 7 days', sublabel: 'Expires in 7 days', price: (b) => b.rentPrice7  },
  { type: 'rent30', label: 'Rent 30 days',sublabel: 'Expires in 30 days',price: (b) => b.rentPrice30 },
]

export function AddToCart({ book }: AddToCartProps) {
  const [selected, setSelected] = useState<CartItemType>('buy')
  const [added, setAdded] = useState(false)
  const { addItem, items } = useCartStore()
  const { country } = useCurrencyStore()

  const selectedOption = OPTIONS.find((o) => o.type === selected)!
  const alreadyInCart = items.some((i) => i.bookId === book.id && i.type === selected)

  function handleAdd() {
    addItem({
      bookId: book.id,
      type: selected,
      usdPrice: selectedOption.price(book),
      title: book.title,
      author: book.author,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {/* Pricing options */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {OPTIONS.map((opt) => (
          <button
            key={opt.type}
            onClick={() => setSelected(opt.type)}
            className={`rounded-lg border p-3 text-left transition-all ${
              selected === opt.type
                ? 'border-accent bg-accent/10'
                : 'border-line bg-surface hover:border-accent/40'
            }`}
          >
            <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${selected === opt.type ? 'text-accent' : 'text-secondary'}`}>
              {opt.label}
            </p>
            <p className="font-mono text-lg font-medium text-primary tabular-nums">
              {formatPrice(opt.price(book), country)}
            </p>
            <p className="text-[11px] text-secondary mt-0.5">{opt.sublabel}</p>
          </button>
        ))}
      </div>

      {/* Action */}
      {alreadyInCart ? (
        <Link
          href="/cart"
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-accent text-accent text-sm font-medium hover:bg-accent hover:text-black transition-all"
        >
          View in cart
        </Link>
      ) : (
        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-all"
        >
          {added ? 'Added to cart' : 'Add to cart'}
        </button>
      )}
    </div>
  )
}
