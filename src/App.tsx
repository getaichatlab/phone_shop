import React from 'react'
import { Navbar } from './components/layout/Navbar'
import { HeroSlider } from './components/home/HeroSlider'
import { FeatureStrip } from './components/home/FeatureStrip'
import { PopularSmartphones } from './components/home/PopularSmartphones'
import { PromoBanner } from './components/home/PromoBanner'
import { BrandFilter } from './components/home/BrandFilter'
import { BestDeals } from './components/home/BestDeals'
import { Newsletter } from './components/home/Newsletter'
import { Footer } from './components/layout/Footer'
import { MobileBottomBar } from './components/layout/MobileBottomBar'

// Overlays & Modals
import { CartDrawer } from './components/cart/CartDrawer'
import { ProductModal } from './components/product/ProductModal'
import { CheckoutModal } from './components/checkout/CheckoutModal'
import { OrderTrackingModal } from './components/tracking/OrderTrackingModal'
import { SearchModal } from './components/search/SearchModal'

export function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-16 md:pb-0">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Home Page Sections */}
      <main className="flex-1">
        <HeroSlider />
        <FeatureStrip />
        <PopularSmartphones />
        <PromoBanner />
        <BrandFilter />
        <BestDeals />
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Bar */}
      <MobileBottomBar />

      {/* Interactive Global Modals and Drawers */}
      <CartDrawer />
      <ProductModal />
      <CheckoutModal />
      <OrderTrackingModal />
      <SearchModal />
    </div>
  )
}

export default App
