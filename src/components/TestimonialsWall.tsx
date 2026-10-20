import React from 'react'
import { Star, ShieldCheck, Quote } from 'lucide-react'
import { testimonialsData, livePulseActivities } from '../data/mockData'

export const TestimonialsWall: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Peer Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
            Trusted By <span className="text-gradient-gold">C-Suite Visionaries</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#0e121b] border border-white/10 shadow-xl flex flex-col justify-between hover:border-amber-400/30 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{t.name}</span>
                      {t.verified && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <div className="text-[11px] text-slate-400">{t.title}</div>
                    <div className="text-[10px] text-slate-500">{t.company}</div>
                  </div>
                </div>

                {t.pressMention && (
                  <span className="text-[10px] font-semibold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    {t.pressMention}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Live Ticker Pulse */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="uppercase tracking-wider text-slate-400 text-[10px]">Real-Time Pulse:</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-8 animate-marquee whitespace-nowrap text-xs text-slate-300">
              {livePulseActivities.concat(livePulseActivities).map((act, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{act.text}</span>
                  <span className="text-slate-500 text-[10px]">({act.time})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
