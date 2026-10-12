import React from 'react'
import { ArrowRight, Flame } from 'lucide-react'
import { POPULAR_PRODUCTS } from '../../data/products'
import { ProductCard } from '../product/ProductCard'
import { useUIStore } from '../../store/useUIStore'

export const PopularSmartphones: React.FC = () => {
  const { activeBrandFilter, setActiveBrandFilter } = useUIStore()

  const filteredProducts = activeBrandFilter
    ? POPULAR_PRODUCTS.filter((p) => p.brand.toLowerCase() === activeBrandFilter.toLowerCase())
    : POPULAR_PRODUCTS

  return (
    <section id="popular-smartphones" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 fill-blue-600" />
            <span>Eng Ko'p Sotilganlar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ommabop Smartfonlar
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Mijozlarimiz tomonidan eng yuqori baholangan flagman qurilmalar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeBrandFilter && (
            <button
              onClick={() => setActiveBrandFilter(null)}
              className="text-xs font-semibold text-rose-500 hover:underline mr-2"
            >
              Filtrni tozalash ({activeBrandFilter})
            </button>
          )}

          <button
            onClick={() => {
              document.getElementById('best-deals')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Barchasini ko'rish</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
