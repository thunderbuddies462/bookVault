'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistStore {
  ids: number[]
  _hasHydrated: boolean
  setHasHydrated: (v: boolean) => void
  toggle: (id: number) => void
  has: (id: number) => boolean
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),
      toggle: (id) => set((s) => ({
        ids: s.ids.includes(id) ? s.ids.filter((i) => i !== id) : [...s.ids, id],
      })),
      has: (id) => get().ids.includes(id),
    }),
    {
      name: 'bookvault-wishlist',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
