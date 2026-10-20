import React, { useState } from 'react'
import { 
  Crown, 
  Sparkles, 
  Mic, 
  PenTool, 
  Check, 
  ArrowRight, 
  Clock, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { servicesData } from '../data/mockData'
import { ServiceItem } from '../types'
import { playTactileClick } from '../utils/sound'

interface ServicesBentoProps {
  onSelectService: (service: ServiceItem) => void
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onSelectService }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const getIcon = (name: string) => {
    switch (name) {
      case 'Crown':
        return <Crown className="w-5 h-5 text-amber-300" />
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-400" />
      case 'Mic':
        return <Mic className="w-5 h-5 text-rose-400" />
      case 'PenTool':
      default:
        return <PenTool className="w-5 h-5 text-emerald-400" />
    }
  }

  const toggleExpand = (id: string) => {
    playTactileClick()
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-4">
            <Crown className="w-3.5 h-3.5" />
            <span>Curated Sovereign Practices</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Comprehensive <span className="text-gradient-gold">Presence Architecture</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light">
            Every engagement is bespoke, executed with Swiss-watch precision, extreme aesthetic discipline, and direct partner oversight.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service, index) => {
            const isExpanded = expandedId === service.id
            const isFeatured = index === 0

            return (
              <div
                key={service.id}
                className={`group relative rounded-3xl p-7 sm:p-9 transition-all duration-300 border flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-gradient-to-br from-[#121624] via-[#0d1017] to-[#171426] border-amber-500/30 shadow-2xl hover:border-amber-400/60'
                    : 'bg-[#0f131d]/90 border-white/10 hover:border-white/20 hover:bg-[#131824]'
                }`}
              >
                {/* Ambient glow for card */}
                {isFeatured && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
                )}

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {getIcon(service.iconName)}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                          {service.category}
                        </span>
                        <div className="text-xs text-amber-300/90 font-medium">
                          {service.subtitle}
                        </div>
                      </div>
                    </div>

                    {service.badge && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/15 border border-amber-400/30 text-amber-300">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold font-serif text-white tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Meta & Action */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Timeline</span>
                      <span className="font-semibold text-white flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {service.timeline}
                      </span>
                    </div>
                    <div className="h-6 w-px bg-white/10" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Investment</span>
                      <span className="font-serif font-bold text-amber-300 text-sm mt-0.5">
                        {service.priceStarting}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playTactileClick()
                      onSelectService(service)
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-black border border-white/10 hover:border-amber-400 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                  >
                    <span>Reserve Sprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
