import React from 'react'
import { Sparkles, ArrowRight, ShieldCheck, Play, TrendingUp, Award } from 'lucide-react'
import { playTactileClick } from '../utils/sound'

interface HeroProps {
  onOpenAudit: () => void
  onOpenBook: () => void
  onExploreStudio: () => void
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAudit,
  onOpenBook,
  onExploreStudio
}) => {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background radial glows and atmospheric luxury lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-mesh-glow opacity-80 blur-[130px] pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161a26]/90 border border-white/10 shadow-xl backdrop-blur-md text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-semibold text-white">2026 Sovereign Presence Release:</span>
            <span className="text-amber-300 hidden sm:inline">Generative Engine Optimization (GEO) Included</span>
            <button
              onClick={() => {
                playTactileClick()
                onOpenAudit()
              }}
              className="text-amber-400 hover:text-amber-200 font-semibold underline underline-offset-2 ml-1"
            >
              Audit Yours →
            </button>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-serif tracking-tight text-white leading-[1.08] sm:leading-[1.06]">
            Architecting <span className="text-gradient-gold">Sovereign Presence</span> For Elite Visionaries
          </h1>
          
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            We transform high-stakes founders, venture partners, and keynoters into indelible market institutions. Bespoke digital identity, LLM knowledge-graph domination, and 3D sovereign passes.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <button
              onClick={() => {
                playTactileClick()
                onExploreStudio()
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Launch Live Studio</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                playTactileClick()
                onOpenAudit()
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm shadow-lg backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2 hover:border-amber-400/40"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Score Your Gravitas</span>
            </button>
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-[#0f131d]/60 border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-white flex items-center gap-1.5">
                <span>$420M+</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                Client Capital Mobilized
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f131d]/60 border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-white flex items-center gap-1.5">
                <span>99.4%</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                GEO Knowledge Graph Lock
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f131d]/60 border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-white flex items-center gap-1.5">
                <span>4.8x</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                Deal Inbound Acceleration
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f131d]/60 border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-white flex items-center gap-1.5">
                <span>100%</span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                White-Glove Discretion
              </div>
            </div>
          </div>

          {/* Social Proof Mentions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-500 text-xs font-semibold uppercase tracking-widest">
            <span>Representing Leaders Featured In:</span>
            <span className="text-slate-400 hover:text-slate-200 transition-colors">Forbes</span>
            <span className="text-slate-400 hover:text-slate-200 transition-colors">Bloomberg</span>
            <span className="text-slate-400 hover:text-slate-200 transition-colors">TechCrunch</span>
            <span className="text-slate-400 hover:text-slate-200 transition-colors">Financial Times</span>
            <span className="text-slate-400 hover:text-slate-200 transition-colors">Wired</span>
          </div>

        </div>

      </div>
    </section>
  )
}
