import React from 'react'
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useUIStore } from '../../store/useUIStore'
import { formatPrice } from '../../utils/formatCurrency'

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, openCheckout } = useUIStore()
  const { items, updateQuantity, removeItem, clearCart, totalCount, subtotal, shippingFee, total } =
    useCartStore()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Savatingiz ({totalCount()})
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-500 hover:text-rose-600 font-semibold px-2 py-1"
                >
                  Tozalash
                </button>
              )}
              <button
                onClick={closeCart}
                aria-label="Yopish"
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Savatingiz bo'sh</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  O'zingizga yoqqan smartfon yoki aksessuarni katalogdan tanlab qo'shing.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  Xaridni boshlash
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.product.id}-${idx}`} className="py-4 flex gap-4 items-center">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 p-2 flex items-center justify-center border border-slate-100 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain drop-shadow-sm"
                    />
                  </div>

                  {/* Info & Counter */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-sm text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.selectedColor, item.selectedStorage)
                        }
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        aria-label="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.selectedStorage} • {item.selectedColor}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-extrabold text-sm text-slate-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity counter */}
                      <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 px-2 py-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.selectedStorage,
                              item.quantity - 1
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-blue-600 font-bold"
                          aria-label="Kamaytirish"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.selectedStorage,
                              item.quantity + 1
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-blue-600 font-bold"
                          aria-label="Oshirish"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Mahsulotlar summasi:</span>
                  <span className="font-bold text-slate-800">{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Yetkazib berish:</span>
                  <span className="font-bold text-emerald-600">
                    {shippingFee() === 0 ? 'Bepul' : formatPrice(shippingFee())}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                  <span>Jami to'lov:</span>
                  <span className="text-blue-600">{formatPrice(total())}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% rasmiy kafolat va xavfsiz to'lov himoyasi</span>
              </div>

              <button
                onClick={openCheckout}
                className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-glow hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Rasmiylashtirishga o'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
