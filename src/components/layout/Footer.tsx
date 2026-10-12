import React from 'react'
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react'
import { useUIStore } from '../../store/useUIStore'

export const Footer: React.FC = () => {
  const openTracking = useUIStore((state) => state.openTracking)

  return (
    <footer className="bg-navy-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-navy-900 border border-blue-500/40 p-1 flex items-center justify-center">
                <img
                  src="/assets/macbro-logo.png"
                  alt="MacBro Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">MacBro</span>
                <span className="block text-[10px] tracking-widest uppercase font-semibold text-blue-500 -mt-1">
                  Premium Store
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              O'zbekistonda 100% original Apple va flagman gadjetlarining eng ishonchli do'koni. Rasmiy kafolat, tezkor yetkazib berish va qulay muddatli to'lov.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Toshkent sh., Amir Temur shox ko'chasi, 12-uy</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+998 (71) 200-00-20</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>support@macbro.uz</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4">Tezkor Havolalar</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a href="#popular-smartphones" className="hover:text-blue-400 transition-colors">
                  Ommabop smartfonlar
                </a>
              </li>
              <li>
                <a href="#shop-by-brand" className="hover:text-blue-400 transition-colors">
                  Rasmiy brendlar
                </a>
              </li>
              <li>
                <a href="#best-deals" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-rose-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Katta chegirmalar</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4">Kategoriyalar</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#popular-smartphones" className="hover:text-blue-400 transition-colors">
                  Apple iPhone
                </a>
              </li>
              <li>
                <a href="#popular-smartphones" className="hover:text-blue-400 transition-colors">
                  Samsung Galaxy
                </a>
              </li>
              <li>
                <a href="#popular-smartphones" className="hover:text-blue-400 transition-colors">
                  Google Pixel
                </a>
              </li>
              <li>
                <a href="#popular-smartphones" className="hover:text-blue-400 transition-colors">
                  OnePlus Flagmanlari
                </a>
              </li>
              <li>
                <a href="#popular-smartphones" className="hover:text-blue-400 transition-colors">
                  Original Aksessuarlar
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service & Live Order Tracking Button */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4">Mijozlarga Xizmat</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#features" className="hover:text-blue-400 transition-colors">
                  Yetkazib berish shartlari
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-400 transition-colors">
                  Kafolat va qaytarish
                </a>
              </li>
              <li>
                <button
                  onClick={openTracking}
                  className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 underline underline-offset-4"
                >
                  📍 Buyurtmani Jonli Kuzatish
                </button>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-400 transition-colors">
                  Muddatli to'lov (Nasiya)
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-300 block mb-2">
                Qabul qilinadigan to'lovlar:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                <span className="px-2 py-1 rounded bg-slate-800 text-blue-400 border border-slate-700">Payme</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-sky-400 border border-slate-700">Click</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-purple-400 border border-slate-700">Uzum</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700">Naqd</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-amber-400 border border-slate-700">Uzcard / Humo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 MacBro Uzbekistan. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="#" className="hover:text-slate-200">Maxfiylik siyosati</a>
            <a href="#" className="hover:text-slate-200">Foydalanish shartlari</a>
            <a href="#" className="hover:text-slate-200">Ommaviy oferta</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
