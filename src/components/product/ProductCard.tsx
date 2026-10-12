import React from 'react'
import { Heart, ShoppingBag, Star, Check } from 'lucide-react'
import { Product } from '../../types'
import { formatPrice, formatInstallment } from '../../utils/formatCurrency'
import { useCartStore } from '../../store/useCartStore'
import { useWishlistStore } from '../../store/useWishlistStore'
import { useUIStore } from '../../store/useUIStore'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAdded, setIsAdded] = React.useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const { toggleWishlist, isWishlisted } = useWishlistStore()
  const openProductModal = useUIStore((state) => state.openProductModal)

  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <div
      onClick={() => openProductModal(product)}
      className="group relative bg-white rounded-3xl p-5 border border-slate-100/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top badges & Wishlist */}
      <div className="flex items-center justify-between w-full mb-3 z-10">
        <div className="flex items-center gap-1.5">
          {product.isBestSeller && (
            <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Eng Xaridorgir
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        <button
          onClick={handleToggleWishlist}
          aria-label="Sevimlilarga qo'shish"
          className="w-9 h-9 rounded-full bg-slate-50 hover:bg-rose-50 flex items-center justify-center transition-colors text-slate-400 hover:text-rose-500 border border-slate-100"
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 active:scale-125 ${
              wishlisted ? 'fill-rose-500 text-rose-500' : ''
            }`}
          />
        </button>
      </div>

      {/* Image container */}
      <div className="relative w-full aspect-square flex items-center justify-center mb-4 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50/50 to-transparent p-2">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-md"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-end">
        {/* Title and Storage */}
        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          {product.storage} • {product.color}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </div>
          <span className="text-xs font-semibold text-slate-800">{product.rating}</span>
          <span className="text-[11px] text-slate-400">({product.reviewsCount} ta baho)</span>
        </div>

        {/* Price and Installment */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-blue-600 font-semibold mt-0.5">
              {formatInstallment(product.price)}
            </p>
          </div>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className={`w-full mt-4 py-2.5 px-4 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-glow'
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
  )
}
