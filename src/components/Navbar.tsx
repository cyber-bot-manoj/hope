import React, { useState, useEffect } from 'react'
import { Sparkles, Volume2, VolumeX, ArrowRight, ShieldCheck, Menu, X } from 'lucide-react'
import { playTactileClick, isSoundEnabled, setSoundEnabled } from '../utils/sound'

interface NavbarProps {
  onOpenAudit: () => void
  onOpenBook: () => void
  activeSection: string
  setActiveSection: (section: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAudit,
  onOpenBook,
  activeSection,
  setActiveSection
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    setSoundEnabled(next)
    if (next) playTactileClick()
  }

  const navItems = [
    { id: 'studio', label: 'Live Studio' },
    { id: 'services', label: 'Services' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'roi-engine', label: 'ROI Calculator' },
    { id: 'identity', label: 'Brand Architecture' }
  ]

  const handleNavClick = (id: string) => {
    playTactileClick()
    setActiveSection(id)
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                playTactileClick()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-[1px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                <div className="w-full h-full bg-[#0d1017] rounded-[11px] flex items-center justify-center">
                  <span className="font-serif font-black text-amber-300 text-lg tracking-tighter">A</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold tracking-widest text-sm text-white flex items-center gap-1.5">
                  AURA<span className="text-[10px] text-amber-400 font-sans tracking-normal font-semibold">STUDIO</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium -mt-0.5">
                  Presence Architecture
                </span>
              </div>
            </a>

            {/* Live Indicator Badge */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Runtime Active</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121622]/60 border border-white/5 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const active = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    active
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Actions & CTAs */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundOn ? 'Tactile Sound: ON' : 'Tactile Sound: OFF'}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-amber-300 transition-colors text-xs flex items-center justify-center"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Presence Auditor CTA */}
            <button
              onClick={() => {
                playTactileClick()
                onOpenAudit()
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all hover:border-amber-400/40 hover:text-amber-200 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Audit Presence</span>
            </button>

            {/* Main Action Button */}
            <button
              onClick={() => {
                playTactileClick()
                onOpenBook()
              }}
              className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-bold text-black transition-all bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <span className="flex items-center gap-1.5">
                <span>Book Advisory</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#0f131d] border border-white/10 shadow-2xl flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5 hover:text-amber-300"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenAudit()
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 text-amber-200 text-xs font-medium border border-amber-400/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Run Executive Presence Audit</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
