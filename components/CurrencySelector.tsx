'use client'
import { useState, useRef, useEffect } from 'react'
import { useCurrencyStore } from '@/store/currency'
import { CURRENCIES, type CountryCode } from '@/lib/currency'

export function CurrencySelector() {
  const { country, setCountry } = useCurrencyStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-secondary hover:text-primary hover:bg-elevated transition-colors"
      >
        <span className="font-medium">{CURRENCIES[country].code}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-elevated border border-line rounded-lg shadow-2xl z-50 overflow-hidden animate-fade-in">
          {(Object.entries(CURRENCIES) as [CountryCode, typeof CURRENCIES[CountryCode]][]).map(
            ([code, c]) => (
              <button
                key={code}
                onClick={() => { setCountry(code); setOpen(false) }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-surface ${
                  country === code ? 'text-accent' : 'text-secondary hover:text-primary'
                }`}
              >
                <span>{c.name}</span>
                <span className="font-medium tabular-nums">{c.code} {c.symbol}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
