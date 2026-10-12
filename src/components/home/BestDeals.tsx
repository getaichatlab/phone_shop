import React from 'react'
import { ArrowRight, Tag } from 'lucide-react'
import { BEST_DEAL_PRODUCTS } from '../../data/products'
import { ProductCard } from '../product/ProductCard'

export const BestDeals: React.FC = () => {
  return (
    <section id="best-deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-rose-500 text-xs font-bold uppercase tracking-wider mb-1">
            <Tag className="w-4 h-4 fill-rose-500" />
            <span>Katta Chegirmalar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Eng Yaxshi Takliflar
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Cheklangan muddatli maxsus arzonlashtirilgan narxlar va sovg'alar.
          </p>
        </div>

        <button
          onClick={() => {
            document.getElementById('popular-smartphones')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="group inline-flex items-center gap-1.5 text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
        >
          <span>Barcha aksiyalar</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BEST_DEAL_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
