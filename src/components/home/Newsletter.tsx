import React, { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 5000)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-slate-800 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left: Content and Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 z-10 flex flex-col justify-center">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
              Eksklyuziv Takliflar
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Aloqada Bo'ling
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-md leading-relaxed">
              Eng so'nggi yangiliklar, maxsus chegirmalar va yangi kelgan original Apple qurilmalari haqida birinchi bo'lib xabardor bo'ling.
            </p>

            {isSubscribed ? (
              <div className="mt-8 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 backdrop-blur-md">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span className="text-sm font-semibold">
                  Rahmat! Siz muvaffaqiyatli obuna bo'ldingiz. Yangiliklarni kuzatib boring!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Elektron pochta manzilingiz..."
                    required
                    className="w-full px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-glow flex items-center justify-center gap-2 active:scale-95 shrink-0"
                >
                  <span>Obuna bo'lish</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-xs text-slate-500 mt-4">
              Spam yo'q. Faqat foydali chegirmalar va rasmiy xabarnomalar.
            </p>
          </div>

          {/* Right: Atmospheric Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center p-6 sm:p-10">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80">
              <img
                src="/assets/banner-newsletter.png"
                alt="Aloqada Bo'ling Banner"
                className="w-full h-auto object-cover max-h-[340px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
