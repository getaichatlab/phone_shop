import { create } from 'zustand'
import { Order, OrderStatus } from '../types'

interface OrderStore {
  currentOrder: Order
  setOrder: (order: Order) => void
  updateStatus: (status: OrderStatus) => void
  updateCoordinates: (coordinates: [number, number]) => void
}

export const useOrderStore = create<OrderStore>((set) => ({
  currentOrder: {
    id: '#MB-784512',
    items: [],
    customer: {
      fullName: 'Sarah Ahmed',
      phone: '+998 (90) 123-45-67',
      address: 'Amir Temur ko\'chasi, 12-uy',
      city: 'Toshkent shahri',
      postalCode: '100000',
    },
    paymentMethod: 'payme',
    subtotal: 29498000,
    shippingFee: 0,
    total: 29498000,
    createdAt: 'Bugun, 10:36',
    estimatedDelivery: 'Bugun, 14:00 - 15:00',
    status: 'out_for_delivery',
    // MacBro Tashkent flagship to delivery destination coordinates
    currentCoordinates: [41.3280, 69.2820],
  },
  setOrder: (order) => set({ currentOrder: order }),
  updateStatus: (status) =>
    set((state) => ({
      currentOrder: { ...state.currentOrder, status },
    })),
  updateCoordinates: (coordinates) =>
    set((state) => ({
      currentOrder: { ...state.currentOrder, currentCoordinates: coordinates },
    })),
}))
