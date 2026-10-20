import React, { useState } from 'react'
import { Sparkles, Copy, Check, Type, Layers, Code, Palette } from 'lucide-react'
import { playTactileClick } from '../utils/sound'

export const BrandKitShowcase: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const colors = [
    { name: 'Imperial Gold', hex: '#E6C374', role: 'Primary Accent & Royalty Seal' },
    { name: 'Obsidian Velvet', hex: '#07090E', role: 'Deep Sovereign Background' },
    { name: 'Titanium Graphite', hex: '#161B29', role: 'Glassmorphism Cards' },
    { name: 'Emerald Genesis', hex: '#10B981', role: 'Growth & Verified Status' },
    { name: 'Astral Violet', hex: '#8B5CF6', role: 'GEO & Frontier Intelligence' }
  ]

  const handleCopy = (hex: string) => {
    playTactileClick()
    navigator.clipboard.writeText(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 2000)
  }

  const jsonLdSample = `{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Marcus Vance",
  "jobTitle": "Chief AI Strategist",
  "alumniOf": "MIT CSAIL",
  "knowsAbout": ["Generative AI", "Venture Capital", "Quantum Compute"],
  "sameAs": [
    "https://linkedin.com/in/marcusvance",
    "https://forbes.com/councils/marcusvance"
  ]
}`

  return (
    <section id="identity" className="py-24 relative bg-[#090b13]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
            <Palette className="w-3.5 h-3.5" />
            <span>Design System Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            The <span className="text-gradient-aurora">Sovereign Identity</span> System
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light">
            Every pixel, serif, and chromatic tone is precision-calibrated to convey undisputed stature, cognitive clarity, and technological leadership.
          </p>
        </div>

        {/* 3 Pillar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Pillar 1: Chromatic Architecture */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0e121c] border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-amber-400">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-serif">Chromatic Authority</h3>
                <p className="text-[11px] text-slate-400">Curated high-contrast luxury swatches</p>
              </div>
            </div>

            <div className="space-y-3">
              {colors.map((c) => (
                <div
                  key={c.hex}
                  onClick={() => handleCopy(c.hex)}
                  className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl shadow-md border border-white/20 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{c.name}</div>
                      <div className="text-[10px] text-slate-400">{c.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-amber-300 font-mono">
                    <span>{c.hex}</span>
                    {copiedHex === c.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 2: Haute Typography */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0e121c] border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                  <Type className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif">Editorial Typography</h3>
                  <p className="text-[11px] text-slate-400">Harmonizing classic serif with modern sans</p>
                </div>
              </div>

              {/* Display Typography Sample */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-4">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                  Primary Display (Playfair / Editorial)
                </div>
                <div className="text-2xl font-serif font-bold text-amber-200">
                  "Authority is whispered, not shouted."
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Used for executive titles, keynote headings, and impact statements.
                </div>
              </div>

              {/* Body Typography Sample */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                  Functional System (Plus Jakarta Sans)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High x-height and geometric legibility ensures flawless clarity across high-resolution retina screens, mobile passes, and printed event programs.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Licensed for Commercial Distribution</span>
              <span className="text-amber-400 font-semibold">Included</span>
            </div>
          </div>

          {/* Pillar 3: Semantic GEO Machine Code */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0e121c] border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-indigo-400">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif">LLM Semantic Injection</h3>
                  <p className="text-[11px] text-slate-400">Schema.org / JSON-LD for AI search engines</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/60 border border-white/5 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
                <pre>{jsonLdSample}</pre>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              We encode structured schema into your digital presence so Perplexity, OpenAI, and Google understand your exact credentials without hallucination.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
