import React from 'react'
import { Search, Heart, ShoppingBag, User, ChevronDown, Sparkles } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useWishlistStore } from '../../store/useWishlistStore'
import { useUIStore } from '../../store/useUIStore'

export const Navbar: React.FC = () => {
  const totalCartCount = useCartStore((state) => state.totalCount())
  const wishlistItems = useWishlistStore((state) => state.items)
  const { openCart, openSearch, setActiveBrandFilter } = useUIStore()

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => {
              setActiveBrandFilter(null)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-navy-900 flex items-center justify-center p-1 border border-blue-500/30 shadow-md group-hover:shadow-glow transition-all duration-300">
              <img
                src="/assets/macbro-logo.png"
                alt="MacBro Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                MacBro
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-blue-600 -mt-1">
                Premium Store
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button
              onClick={() => {
                setActiveBrandFilter(null)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Bosh sahifa
            </button>

            <button
              onClick={() => scrollToSection('popular-smartphones')}
              className="hover:text-blue-600 transition-colors flex items-center gap-1 group"
            >
              <span>Smartfonlar</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:rotate-180" />
            </button>

            <button
              onClick={() => scrollToSection('shop-by-brand')}
              className="hover:text-blue-600 transition-colors"
            >
              Brendlar
            </button>

            <button
              onClick={() => scrollToSection('best-deals')}
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-rose-600"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aksiyalar</span>
            </button>

            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-blue-600 transition-colors"
            >
              Afzalliklar
            </button>
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <button
              onClick={openSearch}
              aria-label="Qidiruv"
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => scrollToSection('popular-smartphones')}
              aria-label="Sevimlilar"
              className="relative w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-scale">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              aria-label="Savat"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all font-semibold text-xs border border-blue-100"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Savat</span>
              <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            </button>

            {/* User Profile */}
            <button
              aria-label="Profil"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors overflow-hidden border border-slate-200"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
