import React, { useState } from 'react'
import { X, Star, Heart, Check, Plus, Minus, ShoppingBag, ShieldCheck, Zap } from 'lucide-react'
import { useUIStore } from '../../store/useUIStore'
import { useCartStore } from '../../store/useCartStore'
import { useWishlistStore } from '../../store/useWishlistStore'
import { formatPrice, formatInstallment } from '../../utils/formatCurrency'

export const ProductModal: React.FC = () => {
  const { selectedProduct, closeProductModal, openCart } = useUIStore()
  const addItem = useCartStore((state) => state.addItem)
  const { toggleWishlist, isWishlisted } = useWishlistStore()

  if (!selectedProduct) return null

  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.availableColors[0]?.name || selectedProduct.color
  )
  const [selectedStorage, setSelectedStorage] = useState(
    selectedProduct.availableStorage[0] || selectedProduct.storage
  )
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(selectedProduct.image)
  const [isAdded, setIsAdded] = useState(false)

  const wishlisted = isWishlisted(selectedProduct.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(selectedProduct, selectedColor, selectedStorage)
    }
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      closeProductModal()
      openCart()
    }, 800)
  }

  const gallery = selectedProduct.galleryImages || [selectedProduct.image]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          aria-label="Yopish"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery & Image Showcase */}
        <div className="md:w-1/2 p-6 sm:p-8 bg-slate-50/70 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-slate-100">
          <div className="relative w-full aspect-square flex items-center justify-center p-4">
            <img
              src={activeImage}
              alt={selectedProduct.name}
              className="max-h-full max-w-full object-contain drop-shadow-xl transition-all duration-300"
            />
          </div>

          {/* Thumbnails row */}
          {gallery.length > 1 && (
            <div className="flex gap-2.5 mt-4">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-xl p-1 bg-white border-2 flex items-center justify-center transition-all ${
                    activeImage === img ? 'border-blue-600 shadow-md scale-105' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info, Specs & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Header badges */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full">
                {selectedProduct.brand} Original
              </span>
              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className="w-9 h-9 rounded-full bg-slate-50 hover:bg-rose-50 flex items-center justify-center text-slate-400 hover:text-rose-500 border border-slate-100 transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
                />
              </button>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {selectedProduct.name}
            </h2>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="text-xs font-bold text-slate-800">{selectedProduct.rating}</span>
              <span className="text-xs text-slate-400">({selectedProduct.reviewsCount} ta sharh)</span>
            </div>

            {/* Price */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
              </div>
              <span className="inline-block mt-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                Nasiya: {formatInstallment(selectedProduct.price)}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Key Specs Pills (Grid) */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] font-semibold text-slate-400 block">Ekran</span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1">{selectedProduct.specs.display}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] font-semibold text-slate-400 block">Protsessor</span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1">{selectedProduct.specs.chip}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] font-semibold text-slate-400 block">Xotira</span>
                <span className="text-xs font-bold text-slate-800">{selectedStorage}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] font-semibold text-slate-400 block">Aloqa</span>
                <span className="text-xs font-bold text-slate-800">{selectedProduct.specs.connectivity}</span>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="mt-4">
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Rang: <span className="font-semibold text-blue-600">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {selectedProduct.availableColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColor(c.name)
                      if (c.image) setActiveImage(c.image)
                    }}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === c.name ? 'border-blue-600 scale-110 shadow-sm' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColor === c.name && (
                      <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage selection */}
            <div className="mt-4">
              <label className="text-xs font-bold text-slate-700 block mb-2">Xotira hajmi:</label>
              <div className="flex gap-2">
                {selectedProduct.availableStorage.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStorage(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedStorage === st
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom quantity & Add to cart */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
            {/* Quantity */}
            <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50 px-3 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-blue-600"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-bold text-sm text-slate-800">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-blue-600"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-glow ${
                isAdded ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Savatga qo'shildi!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Savatga qo'shish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
