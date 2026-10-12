import React from 'react'
import { BRANDS } from '../../data/products'
import { useUIStore } from '../../store/useUIStore'

export const BrandFilter: React.FC = () => {
  const { activeBrandFilter, setActiveBrandFilter } = useUIStore()

  return (
    <section id="shop-by-brand" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Brendlar Bo'yicha Tanlash
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            O'zingizga yoqqan rasmiy brend modellarini ko'ring.
          </p>
        </div>

        {activeBrandFilter && (
          <button
            onClick={() => setActiveBrandFilter(null)}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Barchasini ko'rsatish
          </button>
        )}
      </div>

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {BRANDS.map((b) => {
          const isActive = activeBrandFilter?.toLowerCase() === b.name.toLowerCase()
          return (
            <button
              key={b.name}
              onClick={() => {
                setActiveBrandFilter(isActive ? null : b.name)
                document.getElementById('popular-smartphones')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-glow scale-105'
                  : 'bg-white text-slate-800 border-slate-100 hover:border-blue-200 hover:shadow-card hover:-translate-y-0.5'
              }`}
            >
              {/* Stylized Brand Logo badge */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 font-black text-sm tracking-wider ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-900 border border-slate-100'
                }`}
              >
                {b.name === 'Apple' && ''}
                {b.name === 'Samsung' && 'S'}
                {b.name === 'Google' && 'G'}
                {b.name === 'OnePlus' && '1+'}
                {b.name === 'Xiaomi' && 'mi'}
                {b.name === 'Realme' && 'R'}
              </div>

              <span className="font-bold text-xs sm:text-sm">{b.name}</span>
              <span
                className={`text-[10px] mt-0.5 font-medium ${
                  isActive ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                {b.count} ta model
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
