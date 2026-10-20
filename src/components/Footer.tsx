import React, { useState } from 'react'
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react'
import { playTactileClick, playSuccessChime } from '../utils/sound'
import { triggerConfetti } from '../utils/confetti'

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    playSuccessChime()
    triggerConfetti()
    setSubscribed(true)
  }

  return (
    <footer className="pt-20 pb-12 border-t border-white/10 bg-[#06080d] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter Card */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#121622] via-[#0e111a] to-[#151325] border border-amber-500/20 shadow-2xl mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Sovereign Dispatch</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
              Curated Intelligence for Elite Leaders
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Bi-weekly analysis on Generative Engine Optimization, board positioning, and high-status digital architecture. Zero noise, high signal.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px]">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter executive email..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Subscribed. Welcome to The Sovereign Dispatch.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Nav & Brand */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 p-[1px]">
                <div className="w-full h-full bg-[#0d1017] rounded-[11px] flex items-center justify-center">
                  <span className="font-serif font-black text-amber-300 text-base">A</span>
                </div>
              </div>
              <span className="font-display font-bold tracking-widest text-sm text-white">
                AURA<span className="text-[10px] text-amber-400 font-sans ml-1">STUDIO</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm mb-4">
              A bespoke digital architecture studio specializing in high-status executive identities, 3D passes, and generative AI search authority.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Encrypted & Confidential Architecture</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Practices</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Executive Identity</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">GEO Optimization</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Keynote Systems</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Board Ghostwriting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Interactive Studio</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#studio" className="hover:text-amber-300 transition-colors">3D Card Creator</a></li>
              <li><a href="#roi-engine" className="hover:text-amber-300 transition-colors">ROI Engine</a></li>
              <li><a href="#identity" className="hover:text-amber-300 transition-colors">Design System</a></li>
              <li><a href="#case-studies" className="hover:text-amber-300 transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Headquarters</h4>
            <div className="text-xs text-slate-400 space-y-1">
              <div>San Francisco • 555 Mission St</div>
              <div>London • Mayfair W1K</div>
              <div>Zurich • Paradeplatz 4</div>
              <div className="pt-2 text-amber-400 font-medium">concierge@aura-studio.com</div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} AURA™ Professional Presence Design. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy & Discretion</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Engagement</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Disclosures</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
