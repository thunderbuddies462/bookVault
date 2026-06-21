'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { COUPONS } from '@/lib/coupons'

export type CartItemType = 'buy' | 'rent7' | 'rent30'

export interface CartItem {
  bookId: number
  type: CartItemType
  usdPrice: number
  title: string
  author: string
}

interface CartStore {
  items: CartItem[]
  couponCode: string
  discount: number
  addItem: (item: CartItem) => void
  removeItem: (bookId: number, type: CartItemType) => void
  clearCart: () => void
  applyCoupon: (code: string) => { success: boolean; message: string }
  removeCoupon: () => void
  subtotal: () => number
  total: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      discount: 0,

      addItem: (item) =>
        set((state) => {
          const exists = state.items.find(
            (i) => i.bookId === item.bookId && i.type === item.type
          )
          if (exists) return state
          return { items: [...state.items, item] }
        }),

      removeItem: (bookId, type) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.bookId === bookId && i.type === type)
          ),
        })),

      clearCart: () => set({ items: [], couponCode: '', discount: 0 }),

      applyCoupon: (code) => {
        const coupon = COUPONS[code.toUpperCase()]
        if (!coupon) {
          return { success: false, message: 'Invalid coupon code.' }
        }
        set({ couponCode: code.toUpperCase(), discount: coupon.discount })
        return { success: true, message: `${coupon.description} applied.` }
      },

      removeCoupon: () => set({ couponCode: '', discount: 0 }),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.usdPrice, 0),

      total: () => {
        const subtotal = get().subtotal()
        const discount = get().discount
        return subtotal * (1 - discount / 100)
      },
    }),
    { name: 'bookvault-cart' }
  )
)
