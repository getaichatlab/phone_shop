export interface Product {
  id: string
  name: string
  brand: 'Apple' | 'Samsung' | 'Google' | 'OnePlus' | 'Xiaomi' | 'Realme'
  category: 'smartphones' | 'tablets' | 'watches' | 'accessories'
  storage: string
  color: string
  colorHex?: string
  price: number // in UZS (so'm)
  originalPrice?: number // in UZS (so'm)
  discountPercent?: number
  rating: number
  reviewsCount: number
  image: string
  galleryImages?: string[]
  isBestSeller?: boolean
  isNewArrival?: boolean
  description: string
  specs: {
    display: string
    storage: string
    chip: string
    connectivity: string
    camera?: string
    battery?: string
  }
  availableColors: {
    name: string
    hex: string
    image?: string
  }[]
  availableStorage: string[]
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor: string
  selectedStorage: string
}

export type OrderStatus = 'placed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered'

export interface Order {
  id: string
  items: CartItem[]
  customer: {
    fullName: string
    phone: string
    address: string
    city: string
    postalCode: string
    notes?: string
  }
  paymentMethod: 'card' | 'payme' | 'click' | 'uzum_nasiya' | 'cash'
  paymentDetails?: {
    cardNumber?: string
    expiry?: string
  }
  subtotal: number
  shippingFee: number
  total: number
  createdAt: string
  estimatedDelivery: string
  status: OrderStatus
  currentCoordinates: [number, number] // [lat, lng]
}
