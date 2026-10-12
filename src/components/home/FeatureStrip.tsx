import React from 'react'
import { Truck, ShieldCheck, Headphones, RotateCcw } from 'lucide-react'

export const FeatureStrip: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Bepul Yetkazib Berish',
      subtitle: "1 000 000 so'mdan yuqori xaridlarga",
    },
    {
      icon: ShieldCheck,
      title: '100% Xavfsiz To\'lov',
      subtitle: 'Payme, Click, Uzum Nasiya',
    },
    {
      icon: Headphones,
      title: '24/7 Qo\'llab-quvvatlash',
      subtitle: 'Mutaxassislarimiz yordamga tayyor',
    },
    {
      icon: RotateCcw,
      title: 'Rasmiy Kafolat',
      subtitle: '1 yillik bepul servis xizmati',
    },
  ]

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feat, idx) => {
          const IconComponent = feat.icon
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{feat.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{feat.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
