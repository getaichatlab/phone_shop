import React from 'react'
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useWishlistStore } from '../../store/useWishlistStore'
import { useUIStore } from '../../store/useUIStore'

export const MobileBottomBar: React.FC = () => {
  const totalCartCount = useCartStore((state) => state.totalCount())
  const wishlistCount = useWishlistStore((state) => state.items.length)
  const { openCart, openSearch } = useUIStore()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors py-1"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Bosh</span>
      </button>

      <button
        onClick={() => scrollTo('popular-smartphones')}
        className="flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors py-1"
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Katalog</span>
      </button>

      <button
        onClick={openSearch}
        className="flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors py-1"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Qidiruv</span>
      </button>

      <button
        onClick={() => scrollTo('popular-smartphones')}
        className="relative flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors py-1"
      >
        <Heart className="w-5 h-5" />
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
        <span className="text-[10px] font-semibold">Sevimlilar</span>
      </button>

      <button
        onClick={openCart}
        className="relative flex flex-col items-center gap-1 text-blue-600 transition-colors py-1 font-bold"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalCartCount > 0 && (
          <span className="absolute top-0 right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
            {totalCartCount}
          </span>
        )}
        <span className="text-[10px] font-semibold">Savat</span>
      </button>
    </div>
  )
}
