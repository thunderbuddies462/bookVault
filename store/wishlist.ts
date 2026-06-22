'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistStore {
  ids: number[]
  toggle: (id: number) => void
  has: (id: number) => boolean
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set((s) => ({
        ids: s.ids.includes(id) ? s.ids.filter((i) => i !== id) : [...s.ids, id],
      })),
      has: (id) => get().ids.includes(id),
    }),
    { name: 'bookvault-wishlist' }
  )
)
