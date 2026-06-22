'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'
import { useCurrencyStore } from '@/store/currency'
import { formatPrice } from '@/lib/currency'
import type { CartItemType } from '@/store/cart'
import { getBookById, getCoverUrl } from '@/lib/books'

const TYPE_LABEL: Record<CartItemType, string> = {
  buy:    'Buy',
  rent7:  'Rent 7d',
  rent30: 'Rent 30d',
}

export default function CheckoutPage() {
  const { items, total, subtotal, discount, couponCode, clearCart } = useCartStore()
  const { country } = useCurrencyStore()

  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '', country: 'US',
    card: '', expiry: '', cvv: '',
  })
  const [placing, setPlacing] = useState(false)
  const [placed, setPlaced]   = useState(false)
  const [errors, setErrors]   = useState<Record<string, string>>({})

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => { const n = { ...e }; delete n[field]; return n })
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim())     e.name    = 'Required'
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (!form.address.trim())  e.address  = 'Required'
    if (!form.city.trim())     e.city     = 'Required'
    if (form.card.replace(/\s/g,'').length < 16) e.card = 'Enter a valid 16-digit card number'
    if (!form.expiry.match(/^\d{2}\/\d{2}$/))    e.expiry = 'MM/YY format'
    if (form.cvv.length < 3)   e.cvv      = 'Enter CVV'
    return e
  }

  async function handlePlace(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setPlacing(true)
    await new Promise((r) => setTimeout(r, 1800))
    setPlacing(false)
    setPlaced(true)
    clearCart()
  }

  function formatCard(v: string) {
    return v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  }

  function formatExpiry(v: string) {
    const d = v.replace(/\D/g,'').slice(0,4)
    return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d
  }

  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16 text-center">
        <div>
          <h1 className="font-display text-3xl font-semibold text-primary mb-4">Nothing to checkout</h1>
          <Link href="/browse" className="text-sm text-accent hover:text-accent-alt">Browse books</Link>
        </div>
      </div>
    )
  }

  if (placed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="font-display text-4xl font-semibold text-primary mb-3">Order placed</h1>
          <p className="text-sm text-secondary mb-8">
            Your books are ready to read. Check your email for download links.
          </p>
          <Link href="/browse" className="inline-flex px-6 py-3 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors">
            Continue browsing
          </Link>
        </div>
      </div>
    )
  }

  const sub = subtotal()
  const tot = total()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
      <h1 className="font-display text-4xl font-semibold text-primary mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Form */}
        <form onSubmit={handlePlace} className="lg:col-span-2 space-y-8">

          {/* Contact */}
          <section>
            <h2 className="font-display text-xl font-semibold text-primary mb-4">Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.name}>
                <input
                  type="text" placeholder="Jane Smith" value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={inputCls(errors.name)}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email" placeholder="jane@example.com" value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  className={inputCls(errors.email)}
                />
              </Field>
            </div>
          </section>

          {/* Billing address */}
          <section>
            <h2 className="font-display text-xl font-semibold text-primary mb-4">Billing address</h2>
            <div className="space-y-4">
              <Field label="Street address" error={errors.address}>
                <input
                  type="text" placeholder="123 Main St" value={form.address}
                  onChange={(e) => set('address', e.target.value)}
                  className={inputCls(errors.address)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" error={errors.city}>
                  <input
                    type="text" placeholder="New York" value={form.city}
                    onChange={(e) => set('city', e.target.value)}
                    className={inputCls(errors.city)}
                  />
                </Field>
                <Field label="ZIP / Postal code" error={errors.zip}>
                  <input
                    type="text" placeholder="10001" value={form.zip}
                    onChange={(e) => set('zip', e.target.value)}
                    className={inputCls(errors.zip)}
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="font-display text-xl font-semibold text-primary mb-4">Payment</h2>
            <div className="bg-surface border border-line rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-secondary">Card details are not stored or processed — demo only.</p>
                <div className="flex gap-1.5 text-secondary">
                  <CardChip label="VISA" />
                  <CardChip label="MC" />
                </div>
              </div>
              <Field label="Card number" error={errors.card}>
                <input
                  type="text" placeholder="1234 5678 9012 3456" value={form.card}
                  onChange={(e) => set('card', formatCard(e.target.value))}
                  maxLength={19}
                  className={`${inputCls(errors.card)} font-mono tracking-widest`}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry date" error={errors.expiry}>
                  <input
                    type="text" placeholder="MM/YY" value={form.expiry}
                    onChange={(e) => set('expiry', formatExpiry(e.target.value))}
                    maxLength={5}
                    className={`${inputCls(errors.expiry)} font-mono`}
                  />
                </Field>
                <Field label="CVV" error={errors.cvv}>
                  <input
                    type="text" placeholder="123" value={form.cvv}
                    onChange={(e) => set('cvv', e.target.value.replace(/\D/g,'').slice(0,4))}
                    maxLength={4}
                    className={`${inputCls(errors.cvv)} font-mono`}
                  />
                </Field>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={placing}
            className="w-full py-4 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {placing ? 'Processing...' : `Place order — ${formatPrice(tot, country)}`}
          </button>
        </form>

        {/* Order summary */}
        <div>
          <div className="bg-surface border border-line rounded-xl p-5 sticky top-24">
            <p className="text-sm font-medium text-primary mb-4">Order summary</p>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={`${item.bookId}-${item.type}`} className="flex gap-3 items-center">
                  <div className="relative w-10 aspect-[2/3] rounded overflow-hidden flex-shrink-0">
                    <Image src={getCoverUrl(getBookById(item.bookId)!, 'S')} alt={item.title} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-primary line-clamp-1">{item.title}</p>
                    <p className="text-[10px] text-secondary">{TYPE_LABEL[item.type]}</p>
                  </div>
                  <p className="text-xs font-medium text-primary flex-shrink-0">
                    {formatPrice(item.usdPrice, country)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-line pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Subtotal</span>
                <span className="text-primary">{formatPrice(sub, country)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Coupon ({couponCode})</span>
                  <span className="text-green-400">-{formatPrice(sub - tot, country)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-line">
                <span className="font-medium text-primary">Total</span>
                <span className="font-display text-xl font-semibold text-primary">{formatPrice(tot, country)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function inputCls(error?: string) {
  return `w-full px-4 py-3 rounded-lg bg-elevated border text-sm text-primary placeholder:text-secondary focus:outline-none transition-colors ${
    error ? 'border-red-500/60 focus:border-red-400' : 'border-line focus:border-accent/60'
  }`
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-secondary uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}

function CardChip({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-bold px-1.5 py-0.5 border border-line rounded text-secondary">
      {label}
    </span>
  )
}
