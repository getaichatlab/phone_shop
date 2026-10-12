import React from 'react'
import { Search, X, Star, ArrowRight } from 'lucide-react'
import { useUIStore } from '../../store/useUIStore'
import { ALL_PRODUCTS } from '../../data/products'
import { formatPrice } from '../../utils/formatCurrency'

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery, openProductModal } = useUIStore()

  if (!isSearchOpen) return null

  const filtered = searchQuery.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.color.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : ALL_PRODUCTS.slice(0, 4) // Recommended products when query is empty

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/75 backdrop-blur-md flex items-start justify-center p-4 sm:pt-20">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Smartfon nomi yoki brendni qidiring (masalan: iPhone 16 Pro, S24, Pixel)..."
            className="w-full text-base sm:text-lg font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 p-1 font-bold"
            >
              Tozalash
            </button>
          )}
          <button
            onClick={closeSearch}
            className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            {searchQuery.trim() ? `Natijalar (${filtered.length} ta)` : 'Tavsiya etilgan modellar:'}
          </p>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              <p className="text-sm">"{searchQuery}" bo'yicha hech narsa topilmadi.</p>
              <p className="text-xs text-slate-400 mt-1">Boshqa so'z bilan qidirib ko'ring.</p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  closeSearch()
                  openProductModal(product)
                }}
                className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 px-3 rounded-2xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 p-1.5 flex items-center justify-center border border-slate-100 shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {product.storage} • {product.color}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5 text-amber-500 text-xs">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="font-semibold text-[11px] text-slate-700">{product.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <span className="font-extrabold text-sm text-slate-900">
                    {formatPrice(product.price)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
