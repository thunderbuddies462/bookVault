'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CountryCode } from '@/lib/currency'

interface CurrencyStore {
  country: CountryCode
  setCountry: (country: CountryCode) => void
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      country: 'US',
      setCountry: (country) => set({ country }),
    }),
    { name: 'bookvault-currency' }
  )
)
