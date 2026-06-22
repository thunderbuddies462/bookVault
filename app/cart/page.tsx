'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore, type CartItemType } from '@/store/cart'
import { useCurrencyStore } from '@/store/currency'
import { formatPrice } from '@/lib/currency'
import { COUPONS } from '@/lib/coupons'
import { getBookById, getCoverUrl } from '@/lib/books'

const TYPE_LABEL: Record<CartItemType, string> = {
  buy:    'Buy — permanent',
  rent7:  'Rent — 7 days',
  rent30: 'Rent — 30 days',
}

export default function CartPage() {
  const { items, removeItem, couponCode, discount, applyCoupon, removeCoupon, subtotal, total } = useCartStore()
  const { country } = useCurrencyStore()
  const [couponInput, setCouponInput] = useState('')
  const [couponMessage, setCouponMessage] = useState<{ text: string; ok: boolean } | null>(null)

  function handleApplyCoupon() {
    const result = applyCoupon(couponInput.trim())
    setCouponMessage({ text: result.message, ok: result.success })
    if (result.success) setCouponInput('')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-sm">
          {/* Empty cart illustration */}
          <svg className="mx-auto mb-6 opacity-20" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h1 className="font-display text-3xl font-semibold text-primary mb-3">Your cart is empty</h1>
          <p className="text-secondary mb-8 leading-relaxed">
            Nothing here yet. Browse the collection, try a free sample, or check your wishlist.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <Link href="/browse" className="w-full sm:w-auto inline-flex justify-center px-6 py-3 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors">
              Browse books
            </Link>
            <Link href="/library" className="w-full sm:w-auto inline-flex justify-center px-6 py-3 rounded-full border border-line text-primary text-sm font-medium hover:border-accent/40 transition-colors">
              My Library
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const sub = subtotal()
  const tot = total()
  const savings = sub - tot

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
      <h1 className="font-display text-4xl font-semibold text-primary mb-10">Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={`${item.bookId}-${item.type}`} className="flex gap-4 p-4 bg-surface border border-line rounded-xl">
              <div className="relative w-16 aspect-[2/3] rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={getCoverUrl(getBookById(item.bookId)!, 'S')}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-base font-semibold text-primary leading-tight mb-0.5">
                  {item.title}
                </p>
                <p className="text-xs text-secondary mb-2">{item.author}</p>
                <span className="text-xs font-medium uppercase tracking-wide text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  {TYPE_LABEL[item.type]}
                </span>
              </div>
              <div className="flex flex-col items-end justify-between flex-shrink-0">
                <p className="font-mono text-lg font-medium text-primary tabular-nums">
                  {formatPrice(item.usdPrice, country)}
                </p>
                <button
                  onClick={() => removeItem(item.bookId, item.type)}
                  className="text-xs text-secondary hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-6">

          {/* Coupon */}
          <div className="bg-surface border border-line rounded-xl p-5">
            <p className="text-sm font-medium text-primary mb-3">Coupon code</p>
            {couponCode ? (
              <div className="flex items-center justify-between bg-accent/10 border border-accent/30 rounded-lg px-3 py-2.5">
                <div>
                  <p className="text-sm font-semibold text-accent">{couponCode}</p>
                  <p className="text-xs text-secondary">{COUPONS[couponCode]?.description}</p>
                </div>
                <button
                  onClick={() => { removeCoupon(); setCouponMessage(null) }}
                  className="text-secondary hover:text-primary transition-colors ml-3"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponMessage(null) }}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 rounded-lg bg-elevated border border-line text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-accent/60 transition-colors"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-3 py-2 rounded-lg bg-accent text-black text-sm font-medium hover:bg-accent-alt transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            {couponMessage && (
              <p className={`text-xs mt-2 ${couponMessage.ok ? 'text-green-400' : 'text-red-400'}`}>
                {couponMessage.text}
              </p>
            )}
            <p className="text-[11px] text-secondary mt-3">
              Try: VAULT10, VAULT20, NEWREADER, ANNUAL30
            </p>
          </div>

          {/* Order summary */}
          <div className="bg-surface border border-line rounded-xl p-5 space-y-3">
            <p className="text-sm font-medium text-primary mb-4">Order summary</p>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
              <span className="font-mono tabular-nums text-primary">{formatPrice(sub, country)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-400">Discount ({discount}%)</span>
                <span className="font-mono tabular-nums text-green-400">-{formatPrice(savings, country)}</span>
              </div>
            )}
            <div className="border-t border-line pt-3 flex justify-between">
              <span className="font-medium text-primary">Total</span>
              <span className="font-mono text-xl font-medium text-primary tabular-nums">{formatPrice(tot, country)}</span>
            </div>
            <Link
              href="/checkout"
              className="w-full mt-2 flex items-center justify-center py-3 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
