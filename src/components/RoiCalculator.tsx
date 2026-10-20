import React, { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Sparkles, ArrowRight } from 'lucide-react'
import { playTactileClick } from '../utils/sound'

interface RoiCalculatorProps {
  onOpenBook: () => void
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBook }) => {
  const [dealSize, setDealSize] = useState<number>(50000)
  const [monthlyInbounds, setMonthlyInbounds] = useState<number>(4)
  const [multiplierTier, setMultiplierTier] = useState<number>(2.4)

  // Real-time calculations
  const currentAnnualPipeline = dealSize * monthlyInbounds * 12
  const projectedBoost = Math.round(currentAnnualPipeline * (multiplierTier - 1))
  const totalProjected = currentAnnualPipeline + projectedBoost

  return (
    <section id="roi-engine" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Quantitative Authority Modeling</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            The <span className="text-gradient-gold">Executive Gravitas</span> ROI Engine
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light">
            Model how elevating your digital perception accelerates high-ticket advisory mandates, speaking fees, and venture allocations.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d1017]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          {/* Sliders Input Panel (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Slider 1: Deal Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Average Deal, Advisory, or Mandate Size
                </label>
                <span className="font-serif font-bold text-amber-300 text-lg">
                  ${dealSize.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="250000"
                step="5000"
                value={dealSize}
                onChange={(e) => {
                  playTactileClick()
                  setDealSize(Number(e.target.value))
                }}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>$10,000 (Speaking/Board)</span>
                <span>$250,000+ (Institutional Mandate)</span>
              </div>
            </div>

            {/* Slider 2: Monthly Inbounds */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Current High-Value Monthly Inbounds / Leads
                </label>
                <span className="font-serif font-bold text-amber-300 text-lg">
                  {monthlyInbounds} Opportunities / mo
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={monthlyInbounds}
                onChange={(e) => {
                  playTactileClick()
                  setMonthlyInbounds(Number(e.target.value))
                }}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>1 per month</span>
                <span>20 per month</span>
              </div>
            </div>

            {/* Multiplier Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Select AURA Transformation Intensity
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { tier: 1.8, label: 'Standard Upgrade', lift: '+80% Impact' },
                  { tier: 2.4, label: 'Executive Suite', lift: '+140% Impact' },
                  { tier: 3.5, label: 'Sovereign Titan', lift: '+250% Impact' }
                ].map((item) => (
                  <button
                    key={item.tier}
                    onClick={() => {
                      playTactileClick()
                      setMultiplierTier(item.tier)
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      multiplierTier === item.tier
                        ? 'bg-amber-400/20 border-amber-400/50 text-white shadow-md'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[11px] text-amber-300 font-semibold mt-0.5">{item.lift}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Real-time Math Output (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#131722] to-[#0c0e16] border border-amber-500/30 p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-[50px] pointer-events-none" />

            <div className="text-[11px] uppercase tracking-widest font-semibold text-slate-400 mb-1">
              Projected Annual Authority Upside
            </div>

            <div className="text-4xl sm:text-5xl font-extrabold font-serif text-white tracking-tight my-3">
              +${(projectedBoost / 1000).toFixed(0)}k
            </div>

            <p className="text-xs text-slate-300 mb-6 font-light leading-relaxed">
              Based on closing higher deal sizes with shortened closing latency when counter-parties perceive tier-1 gravitas.
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-left mb-6">
              <div className="flex justify-between text-slate-300">
                <span>Baseline Annual Pipeline:</span>
                <span className="font-semibold text-white">${(currentAnnualPipeline / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated Pipeline with AURA:</span>
                <span className="font-semibold text-amber-300">${(totalProjected / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Trust Diligence Speedup:</span>
                <span className="font-semibold text-emerald-400">~62% Faster Close</span>
              </div>
            </div>

            <button
              onClick={() => {
                playTactileClick()
                onOpenBook()
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Capture This Value Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
