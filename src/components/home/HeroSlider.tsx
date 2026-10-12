import React, { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { HERO_SLIDES } from '../../data/products'
import { useUIStore } from '../../store/useUIStore'
import { POPULAR_PRODUCTS } from '../../data/products'

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const openProductModal = useUIStore((state) => state.openProductModal)

  // Auto advance slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const slide = HERO_SLIDES[currentSlide]

  const handleCtaClick = () => {
    const product = POPULAR_PRODUCTS.find((p) => p.id === slide.productId)
    if (product) {
      openProductModal(product)
    } else {
      document.getElementById('popular-smartphones')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 border border-slate-800/80 shadow-2xl min-h-[440px] sm:min-h-[500px] flex items-center">
        {/* Ambient neon backdrop glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 blur-[100px] rounded-full pointer-events-none" />

        {/* Slide 1: Main generated hero banner */}
        {currentSlide === 0 ? (
          <div className="relative w-full h-full">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-12 lg:p-16">
              {/* Left Column: Text & CTA */}
              <div className="lg:col-span-6 z-20 flex flex-col items-start space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[11px] sm:text-xs font-bold text-blue-300 uppercase tracking-wider">
                    {slide.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl font-medium text-blue-200/90">
                    {slide.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed font-normal">
                  {slide.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleCtaClick}
                    className="group px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-300 shadow-glow flex items-center gap-2.5 active:scale-95"
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      document.getElementById('best-deals')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all duration-200 border border-white/15 backdrop-blur-md"
                  >
                    Barcha aksiyalar
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Image with 3D feel */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
                  <img
                    src="/assets/hero-iphone-16-pro.png"
                    alt="iPhone 16 Pro Hero"
                    className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_20px_50px_rgba(37,99,235,0.35)] hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Other slides */
          <div className="relative w-full h-full z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-12 lg:p-16">
            <div className="lg:col-span-6 z-20 flex flex-col items-start space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 backdrop-blur-md">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  {slide.badge}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                {slide.title}
              </h2>
              <p className="text-lg font-medium text-blue-200/90">{slide.subtitle}</p>
              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                {slide.description}
              </p>
              <button
                onClick={handleCtaClick}
                className="group px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-glow flex items-center gap-2.5"
              >
                <span>{slide.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="lg:col-span-6 relative flex items-center justify-center p-4">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-h-[380px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        )}

        {/* Carousel controls: Dots & Prev/Next */}
        <div className="absolute bottom-5 left-6 sm:left-12 flex items-center gap-2 z-30">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slayd ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-5 right-6 sm:right-12 flex items-center gap-2 z-30">
          <button
            onClick={prevSlide}
            aria-label="Oldingi slayd"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all backdrop-blur-md active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Keyingi slayd"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all backdrop-blur-md active:scale-90"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
