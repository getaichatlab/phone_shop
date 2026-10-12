import { create } from 'zustand'
import { Product } from '../types'

interface WishlistStore {
  items: Product[]
  toggleWishlist: (product: Product) => void
  isWishlisted: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  toggleWishlist: (product) => {
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id)
      if (exists) {
        return { items: state.items.filter((item) => item.id !== product.id) }
      }
      return { items: [...state.items, product] }
    })
  },
  isWishlisted: (productId) => {
    return get().items.some((item) => item.id === productId)
  },
  clearWishlist: () => set({ items: [] }),
}))
