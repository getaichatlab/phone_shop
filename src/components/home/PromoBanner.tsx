import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export const PromoBanner: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Desktop and responsive visual banner */}
        <div className="relative w-full overflow-hidden">
          <img
            src="/assets/banner-discount-30.png"
            alt="30% Gacha Chegirma Aksiya Banneri"
            className="w-full h-auto min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] object-cover object-center"
          />

          {/* Interactive Overlay click target */}
          <div className="absolute inset-0 bg-transparent flex items-end p-6 sm:p-12">
            <button
              onClick={() => {
                document.getElementById('best-deals')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs sm:text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/40"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Aksiyalar Katalogiga O'tish</span>
              <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
