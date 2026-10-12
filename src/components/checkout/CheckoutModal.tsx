import React, { useState } from 'react'
import { X, Check, ArrowRight, ShieldCheck, CreditCard, Truck, Wallet, CheckCircle2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useCartStore } from '../../store/useCartStore'
import { useUIStore } from '../../store/useUIStore'
import { useOrderStore } from '../../store/useOrderStore'
import { formatPrice } from '../../utils/formatCurrency'

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, closeCheckout, openTracking } = useUIStore()
  const { items, subtotal, shippingFee, total, clearCart } = useCartStore()
  const { setOrder } = useOrderStore()

  const [step, setStep] = useState<1 | 2 | 3>(1) // 1: Shipping, 2: Payment, 3: Success

  // Form State
  const [fullName, setFullName] = useState('Sarah Ahmed')
  const [phone, setPhone] = useState('+998 (90) 123-45-67')
  const [city, setCity] = useState('Toshkent shahri')
  const [address, setAddress] = useState('Amir Temur shox ko\'chasi, 12-uy')
  const [postalCode, setPostalCode] = useState('100000')

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'payme' | 'click' | 'card' | 'uzum_nasiya' | 'cash'>('payme')
  const [cardNumber, setCardNumber] = useState('8600 4912 3456 7890')
  const [expiry, setExpiry] = useState('04/28')
  const [cvv, setCvv] = useState('123')

  if (!isCheckoutOpen) return null

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleConfirmOrder = () => {
    // Generate order
    const orderId = `#MB-${Math.floor(100000 + Math.random() * 900000)}`
    setOrder({
      id: orderId,
      items: [...items],
      customer: {
        fullName,
        phone,
        address,
        city,
        postalCode,
      },
      paymentMethod,
      subtotal: subtotal(),
      shippingFee: shippingFee(),
      total: total(),
      createdAt: 'Bugun, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedDelivery: 'Bugun, 2-3 soat ichida',
      status: 'out_for_delivery',
      currentCoordinates: [41.3190, 69.2780],
    })

    // Trigger celebratory confetti!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#60a5fa', '#3b82f6', '#10b981', '#f59e0b'],
    })

    clearCart()
    setStep(3)
  }

  const handleOpenTrackingFromSuccess = () => {
    closeCheckout()
    openTracking()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col">
        {/* Header with Stepper */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {step === 3 ? "Buyurtma Muvaffaqiyatli Qabul Qilindi!" : "Buyurtmani Rasmiylashtirish"}
            </h2>
            {step !== 3 && (
              <p className="text-xs text-slate-500 mt-0.5">
                Tez va xavfsiz rasmiylashtiruv jarayoni
              </p>
            )}
          </div>

          <button
            onClick={closeCheckout}
            aria-label="Yopish"
            className="w-9 h-9 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        {step !== 3 && (
          <div className="px-6 py-3 bg-blue-50/50 border-b border-blue-100/60 flex items-center justify-between text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Yetkazib berish</span>
            </div>
            <div className="flex-1 h-0.5 mx-4 bg-slate-200">
              <div
                className={`h-full bg-blue-600 transition-all duration-300 ${
                  step === 2 ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                2
              </span>
              <span>To'lov usuli</span>
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Qabul qiluvchi ma'lumotlari</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    To'liq ism-familiyangiz
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Masalan: Sarah Ahmed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telefon raqami
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="+998 (90) 123-45-67"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Shahar / Viloyat
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Toshkent shahri">Toshkent shahri (Ekspress 2 soatda)</option>
                    <option value="Samarqand">Samarqand viloyati</option>
                    <option value="Buxoro">Buxoro viloyati</option>
                    <option value="Andijon">Andijon viloyati</option>
                    <option value="Farg'ona">Farg'ona viloyati</option>
                    <option value="Namangan">Namangan viloyati</option>
                    <option value="Qashqadaryo">Qashqadaryo viloyati</option>
                    <option value="Surxondaryo">Surxondaryo viloyati</option>
                    <option value="Xorazm">Xorazm viloyati</option>
                    <option value="Navoiy">Navoiy viloyati</option>
                    <option value="Jizzax">Jizzax viloyati</option>
                    <option value="Sirdaryo">Sirdaryo viloyati</option>
                    <option value="Qoraqalpog'iston">Qoraqalpog'iston Resp.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pochta indeksi
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="100000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Aniq yetkazish manzili (Ko'cha, uy, xonadon, mo'ljal)
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Amir Temur ko'chasi, 12-uy, 45-xonadon"
                />
              </div>

              {/* Order total preview */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Jami to'lov:</span>
                  <span className="text-lg font-black text-slate-900">{formatPrice(total())}</span>
                </div>
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-glow flex items-center gap-2 transition-all"
                >
                  <span>To'lovga o'tish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-600" />
                <span>To'lov turini tanlang</span>
              </h3>

              {/* Payment Radio Options */}
              <div className="space-y-3">
                {/* Payme */}
                <label
                  onClick={() => setPaymentMethod('payme')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'payme'
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'payme'}
                      onChange={() => setPaymentMethod('payme')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <span className="font-bold text-sm text-slate-900 block">Payme</span>
                      <span className="text-xs text-slate-500">Ilova orqali bir tegish bilan to'lov</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white text-xs font-black">
                    Payme
                  </span>
                </label>

                {/* Click */}
                <label
                  onClick={() => setPaymentMethod('click')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'click'
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'click'}
                      onChange={() => setPaymentMethod('click')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <span className="font-bold text-sm text-slate-900 block">Click Evolution</span>
                      <span className="text-xs text-slate-500">Click orqali tezkor va xavfsiz to'lash</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-sky-500 text-white text-xs font-black">
                    CLICK
                  </span>
                </label>

                {/* Uzum Nasiya */}
                <label
                  onClick={() => setPaymentMethod('uzum_nasiya')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'uzum_nasiya'
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'uzum_nasiya'}
                      onChange={() => setPaymentMethod('uzum_nasiya')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <span className="font-bold text-sm text-slate-900 block">Uzum Nasiya (Muddatli to'lov)</span>
                      <span className="text-xs text-slate-500">12 oyga foizsiz bo'lib to'lash</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-xs font-black">
                    UZUM
                  </span>
                </label>

                {/* Credit / Debit Card (Uzcard / Humo / Visa) */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border flex flex-col cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">Bank Kartasi</span>
                        <span className="text-xs text-slate-500">Uzcard, Humo, Visa, Mastercard</span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-slate-400" />
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-4 border-t border-blue-200/60 space-y-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Karta raqami
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="8600 0000 0000 0000"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                            Amal qilish muddati
                          </label>
                          <input
                            type="text"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                            CVV / SMS kod
                          </label>
                          <input
                            type="password"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="123"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* Cash on delivery */}
                <label
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <span className="font-bold text-sm text-slate-900 block">Yetkazilganda naqd to'lash</span>
                      <span className="text-xs text-slate-500">Mahsulotni tekshirib olgach to'lang</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">Qulay</span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  ← Manzilga qaytish
                </button>

                <button
                  onClick={handleConfirmOrder}
                  className="py-3.5 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-glow flex items-center gap-2 active:scale-95 transition-all"
                >
                  <span>To'lovni Tasdiqlash</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Barcha to'lov ma'lumotlari SSL shifrlangan va himoyalangan</span>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER SUCCESS CELEBRATION */}
          {step === 3 && (
            <div className="text-center py-4 flex flex-col items-center">
              {/* Checkmark Icon with Glow */}
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-glow mb-4 animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Buyurtmangiz Qabul Qilindi!
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">
                Xaridingiz uchun tashakkur. Buyurtmangiz zudlik bilan rasmiylashtirildi va kuryerga topshirilmoqda.
              </p>

              <div className="my-5 px-5 py-2.5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 font-mono font-bold text-sm inline-flex items-center gap-2">
                <span>Buyurtma ID:</span>
                <span className="text-blue-900 font-extrabold">#MB-784512</span>
              </div>

              {/* Order Success Visual Unboxing Card */}
              <div className="w-full max-w-md rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-6">
                <img
                  src="/assets/order-success.png"
                  alt="Yangi telefoningiz muborak bo'lsin!"
                  className="w-full h-auto object-cover max-h-[220px]"
                />
              </div>

              {/* Navigation buttons */}
              <div className="w-full max-w-md space-y-3">
                <button
                  onClick={handleOpenTrackingFromSuccess}
                  className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Truck className="w-4 h-4" />
                  <span>Buyurtmani Jonli Xaritada Kuzatish</span>
                </button>

                <button
                  onClick={closeCheckout}
                  className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Xaridni davom ettirish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
