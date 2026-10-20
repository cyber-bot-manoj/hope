import React, { useState } from 'react'
import { Sparkles, ArrowUpRight, CheckCircle2, Quote, ExternalLink, X } from 'lucide-react'
import { caseStudiesData } from '../data/mockData'
import { CaseStudy } from '../types'
import { playTactileClick } from '../utils/sound'

export const CaseStudiesShowcase: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null)

  const tags = ['All', 'Venture Capital', 'Fintech', 'AI Research', 'Keynote']

  const filteredStudies = selectedTag === 'All'
    ? caseStudiesData
    : caseStudiesData.filter((c) => c.tags.includes(selectedTag))

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden bg-[#07090f]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Market Capitalization</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
              Executive <span className="text-gradient-emerald">Transformations</span>
            </h2>
            <p className="mt-3 text-slate-300 text-base max-w-xl font-light">
              Explore how visionary leaders transitioned from digital obscurity to commanding multi-million dollar deals and international acclaim.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  playTactileClick()
                  setSelectedTag(tag)
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 shadow-sm'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="group relative rounded-3xl overflow-hidden bg-[#0e121c] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-2xl flex flex-col justify-between"
            >
              {/* Image banner with overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={study.featuredImage}
                  alt={study.clientName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e121c] via-[#0e121c]/60 to-transparent" />
                
                {/* Client Avatar Floating */}
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <img
                    src={study.avatar}
                    alt={study.clientName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
                  />
                  <div>
                    <h3 className="text-xl font-bold font-serif text-white">
                      {study.clientName}
                    </h3>
                    <p className="text-xs text-emerald-300 font-medium">
                      {study.role}
                    </p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex gap-1.5">
                  {study.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Domain: <span className="text-white">{study.domain}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mt-3 mb-6">
                    {study.challenge}
                  </p>

                  {/* Impact Results */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
                    {study.results.map((r, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xl sm:text-2xl font-bold font-serif text-emerald-300">
                          {r.metric}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border-l-2 border-emerald-400 text-xs italic text-slate-300 leading-relaxed">
                    "{study.quote}"
                  </div>
                </div>

                {/* Footer link */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Validated Outcome</span>
                  <button
                    onClick={() => {
                      playTactileClick()
                      setActiveModalStudy(study)
                    }}
                    className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 group/btn"
                  >
                    <span>Read Full Architecture Breakdown</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal */}
        {activeModalStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
            <div className="relative w-full max-w-xl bg-[#0f131e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-3">
                  <img
                    src={activeModalStudy.avatar}
                    alt={activeModalStudy.clientName}
                    className="w-12 h-12 rounded-xl object-cover border border-white/20"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">{activeModalStudy.clientName}</h3>
                    <p className="text-xs text-emerald-400">{activeModalStudy.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModalStudy(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Challenge</h4>
                  <p className="p-3 rounded-xl bg-white/5">{activeModalStudy.challenge}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">The AURA Solution</h4>
                  <p className="p-3 rounded-xl bg-white/5">{activeModalStudy.solution}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Metrics Generated</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {activeModalStudy.results.map((r, i) => (
                      <div key={i} className="p-3 rounded-xl bg-black/40 text-center border border-white/5">
                        <div className="text-lg font-bold text-emerald-400 font-serif">{r.metric}</div>
                        <div className="text-[10px] text-slate-400">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveModalStudy(null)}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
