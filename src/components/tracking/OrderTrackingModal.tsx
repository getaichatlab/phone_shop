import React, { useEffect, useRef } from 'react'
import { X, CheckCircle2, Clock, Truck, MapPin, Package, PhoneCall, ShieldCheck } from 'lucide-react'
import L from 'leaflet'
import { useUIStore } from '../../store/useUIStore'
import { useOrderStore } from '../../store/useOrderStore'

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, closeTracking } = useUIStore()
  const { currentOrder } = useOrderStore()
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!isTrackingOpen || !mapContainerRef.current) return

    // Clean up previous map if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    // Coordinates in Tashkent
    // 1. MacBro Showroom (Amir Temur, Tashkent Center)
    const storeCoords: [number, number] = [41.3111, 69.2797]
    // 2. Customer Destination (Yunusobod, Tashkent)
    const destCoords: [number, number] = [41.3450, 69.2890]
    // 3. Live Courier initial location
    let courierCoords: [number, number] = [41.3280, 69.2840]

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [41.3280, 69.2840],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true,
    })

    // Beautiful CartoDB Voyager Tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 19,
    }).addTo(map)

    // Store Custom Marker
    const storeIcon = L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div style="background: #0f172a; color: white; padding: 6px; border-radius: 9999px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid #2563eb; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px;">
          <span style="font-size: 14px; font-weight: bold;">🏢</span>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    })

    const storeMarker = L.marker(storeCoords, { icon: storeIcon }).addTo(map)
    storeMarker.bindPopup('<b>MacBro Flagship Shourum</b><br>Amir Temur shox ko\'chasi, Toshkent').openPopup()

    // Destination Custom Marker
    const destIcon = L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div style="background: #10b981; color: white; padding: 6px; border-radius: 9999px; box-shadow: 0 4px 12px rgba(16,185,129,0.4); border: 2px solid white; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px;">
          <span style="font-size: 14px;">📍</span>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    })

    const destMarker = L.marker(destCoords, { icon: destIcon }).addTo(map)
    destMarker.bindPopup(`<b>Yetkazish manzili:</b><br>${currentOrder.customer.fullName}<br>${currentOrder.customer.address}`)

    // Route Polyline through real Tashkent avenues
    const routeCoords: [number, number][] = [
      storeCoords,
      [41.3160, 69.2810],
      [41.3220, 69.2825],
      [41.3280, 69.2840],
      [41.3340, 69.2860],
      [41.3400, 69.2875],
      destCoords,
    ]

    L.polyline(routeCoords, {
      color: '#2563eb',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8',
    }).addTo(map)

    // Animated Live Courier Van Marker
    const courierIcon = L.divIcon({
      className: 'courier-map-icon',
      html: `
        <div style="background: #2563eb; color: white; border-radius: 9999px; box-shadow: 0 0 20px #2563eb; border: 3px solid white; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
          <span style="font-size: 18px;">🚚</span>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21],
    })

    const courierMarker = L.marker(courierCoords, { icon: courierIcon }).addTo(map)
    courierMarker.bindPopup('<b>Kuryer Farrux</b><br>Harakatlanmoqda: 15 daqiqada yetib boradi')

    // Animated movement simulation along coordinates
    let stepIndex = 3
    const moveInterval = setInterval(() => {
      stepIndex = (stepIndex + 1) % routeCoords.length
      courierMarker.setLatLng(routeCoords[stepIndex])
    }, 3500)

    mapInstanceRef.current = map

    return () => {
      clearInterval(moveInterval)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isTrackingOpen, currentOrder])

  if (!isTrackingOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-glow">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Buyurtmani Kuzatish
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold font-mono">
                  {currentOrder.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Kuryer harakatini real vaqt rejimida jonli xaritada kuzating
              </p>
            </div>
          </div>

          <button
            onClick={closeTracking}
            aria-label="Yopish"
            className="w-9 h-9 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Grid: Left Timeline + Right Real Map */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* Left Column: Timeline & Info (5 cols) */}
          <div className="lg:col-span-5 p-6 space-y-6">
            {/* Timeline Stepper */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Yetkazib berish holati
              </h3>

              <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
                {/* 1. Placed */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shadow-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Buyurtma Qabul Qilindi</h4>
                    <span className="text-[10px] text-slate-400 block">Bugun, 10:36</span>
                  </div>
                </div>

                {/* 2. Processing */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shadow-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Omborda Qadoqlandi</h4>
                    <span className="text-[10px] text-slate-400 block">Bugun, 11:15</span>
                  </div>
                </div>

                {/* 3. Shipped */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shadow-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Kuryerga Topshirildi</h4>
                    <span className="text-[10px] text-slate-400 block">Bugun, 11:45</span>
                  </div>
                </div>

                {/* 4. Out for delivery (Active Pulsing) */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shadow-glow animate-pulse">
                    🚚
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-blue-600">Yo'lda (Yetkazilmoqda)</h4>
                    <span className="text-[10px] text-blue-500 font-semibold block">
                      Taxminiy vaqt: 15-20 daqiqa
                    </span>
                  </div>
                </div>

                {/* 5. Delivered */}
                <div className="relative flex items-start gap-3 opacity-50">
                  <div className="absolute -left-6 w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px]">
                    ○
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">Mijozga Yetkazildi</h4>
                    <span className="text-[10px] text-slate-400 block">Kutilmoqda</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Courier & Customer Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                    FK
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Kuryer: Farrux K.</span>
                    <span className="text-[10px] text-slate-500">Chevrolet Damas (01 A 777 BA)</span>
                  </div>
                </div>
                <a
                  href="tel:+998901234567"
                  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
                  aria-label="Kuryerga qo'ng'iroq qilish"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-600 space-y-1">
                <p>
                  <span className="text-slate-400">Manzil: </span>
                  <span className="font-semibold text-slate-800">{currentOrder.customer.address}</span>
                </p>
                <p>
                  <span className="text-slate-400">Qabul qiluvchi: </span>
                  <span className="font-semibold text-slate-800">{currentOrder.customer.fullName}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: REAL INTERACTIVE TASHKENT LEAFLET MAP (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-[380px] lg:h-auto min-h-[380px] relative bg-slate-100">
            {/* Real Map Container */}
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Map badge overlay */}
            <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Toshkent shahri (Jonli GPS)</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>MacBro kafolati: Mahsulotni yetkazib beruvchidan qabul qilib olguncha to'liq himoyadasiz</span>
          </div>

          <button
            onClick={closeTracking}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  )
}
