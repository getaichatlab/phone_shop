import { create } from 'zustand'
import { Product } from '../types'

interface UIStore {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void

  selectedProduct: Product | null
  openProductModal: (product: Product) => void
  closeProductModal: () => void

  isCheckoutOpen: boolean
  openCheckout: () => void
  closeCheckout: () => void

  isTrackingOpen: boolean
  openTracking: () => void
  closeTracking: () => void

  isSearchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void

  activeBrandFilter: string | null
  setActiveBrandFilter: (brand: string | null) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  selectedProduct: null,
  openProductModal: (product) => set({ selectedProduct: product }),
  closeProductModal: () => set({ selectedProduct: null }),

  isCheckoutOpen: false,
  openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false }),
  closeCheckout: () => set({ isCheckoutOpen: false }),

  isTrackingOpen: false,
  openTracking: () => set({ isTrackingOpen: true, isCheckoutOpen: false }),
  closeTracking: () => set({ isTrackingOpen: false }),

  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  activeBrandFilter: null,
  setActiveBrandFilter: (brand) => set({ activeBrandFilter: brand }),
}))
