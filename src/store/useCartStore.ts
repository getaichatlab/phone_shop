import { create } from 'zustand'
import { CartItem, Product } from '../types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, selectedColor?: string, selectedStorage?: string) => void
  removeItem: (productId: string, color: string, storage: string) => void
  updateQuantity: (productId: string, color: string, storage: string, quantity: number) => void
  clearCart: () => void
  totalCount: () => number
  subtotal: () => number
  shippingFee: () => number
  total: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  // Default mock state with items matching the design preview for an instant populated realistic look!
  items: [
    {
      product: {
        id: 'iphone-16-pro',
        name: 'iPhone 16 Pro',
        brand: 'Apple',
        category: 'smartphones',
        storage: '256GB',
        color: 'Titanium Blue',
        price: 15499000,
        rating: 4.9,
        reviewsCount: 2540,
        image: '/assets/product-iphone-16-pro.png',
        description: 'iPhone 16 Pro — A18 Pro protsessori va yangi titan korpus.',
        specs: {
          display: '6.3" Super Retina XDR',
          storage: '256GB',
          chip: 'A18 Pro',
          connectivity: '5G Ready',
        },
        availableColors: [{ name: 'Titanium Blue', hex: '#3b5368' }],
        availableStorage: ['256GB'],
      },
      quantity: 1,
      selectedColor: 'Titanium Blue',
      selectedStorage: '256GB',
    },
    {
      product: {
        id: 'samsung-s24-ultra',
        name: 'Samsung Galaxy S24 Ultra',
        brand: 'Samsung',
        category: 'smartphones',
        storage: '256GB',
        color: 'Phantom Black',
        price: 13999000,
        rating: 4.8,
        reviewsCount: 1950,
        image: '/assets/product-samsung-s24.png',
        description: 'Galaxy AI va 200MP kamera bilan qurollangan S24 Ultra.',
        specs: {
          display: '6.8" Dynamic AMOLED',
          storage: '256GB',
          chip: 'Snapdragon 8 Gen 3',
          connectivity: '5G Ready',
        },
        availableColors: [{ name: 'Phantom Black', hex: '#25262a' }],
        availableStorage: ['256GB'],
      },
      quantity: 1,
      selectedColor: 'Phantom Black',
      selectedStorage: '256GB',
    },
  ],

  addItem: (product, selectedColor, selectedStorage) => {
    const color = selectedColor || product.color
    const storage = selectedStorage || product.storage

    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedStorage === storage
      )

      if (existingIndex > -1) {
        const newItems = [...state.items]
        newItems[existingIndex].quantity += 1
        return { items: newItems }
      }

      return {
        items: [
          ...state.items,
          {
            product,
            quantity: 1,
            selectedColor: color,
            selectedStorage: storage,
          },
        ],
      }
    })
  },

  removeItem: (productId, color, storage) => {
    set((state) => ({
      items: state.items.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedStorage === storage
          )
      ),
    }))
  },

  updateQuantity: (productId, color, storage, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, color, storage)
      return
    }

    set((state) => ({
      items: state.items.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === color &&
          item.selectedStorage === storage
        ) {
          return { ...item, quantity }
        }
        return item
      }),
    }))
  },

  clearCart: () => set({ items: [] }),

  totalCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  subtotal: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  },

  shippingFee: () => {
    const sub = get().subtotal()
    if (sub === 0) return 0
    return sub >= 1000000 ? 0 : 45000 // Free shipping over 1M UZS
  },

  total: () => {
    return get().subtotal() + get().shippingFee()
  },
}))
