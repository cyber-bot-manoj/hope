import React, { useState } from 'react'
import { 
  Sparkles, 
  Palette, 
  UserCheck, 
  Layers, 
  Award, 
  RefreshCw, 
  Zap,
  Globe,
  Plus,
  Trash2
} from 'lucide-react'
import { ExecutiveProfile, BrandTheme } from '../types'
import { DigitalCard3D } from './DigitalCard3D'
import { playTactileClick, playSuccessChime } from '../utils/sound'
import { triggerLuxuryGlowCelebration } from '../utils/confetti'

interface LivePresenceStudioProps {
  initialProfile: ExecutiveProfile
  onOpenBook: () => void
}

const presets: Record<string, Partial<ExecutiveProfile>> = {
  'Tech Founder': {
    name: 'Alexis Vance',
    title: 'Founder & CEO, Synthetix AI',
    organization: 'Y-Combinator Alumni • Ex-DeepMind',
    bio: 'Pioneering multimodal foundation agents for physical automation. Scaling sovereign enterprise intelligence.',
    theme: 'emerald',
    badges: ['Forbes 30 Under 30', 'MIT Innovator', 'AI Visionary', 'Angel Investor'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Valuation', value: '$85M' },
      { label: 'Active Users', value: '1.2M' },
      { label: 'Patents Filed', value: '14' },
      { label: 'Team Size', value: '45' }
    ]
  },
  'Venture Partner': {
    name: 'Harrison Sterling',
    title: 'Managing General Partner',
    organization: 'Aetheria Horizons Capital ($350M AUM)',
    bio: 'Investing in frontier deep-tech, silicon photonics, and neuro-symbolic compute systems for the next century.',
    theme: 'gold',
    badges: ['Midas List Contender', 'Stanford Board', 'Keynote Speaker', 'Davos 2026'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Portfolio IPOs', value: '6' },
      { label: 'Fund Vintage', value: 'Fund III' },
      { label: 'Investments', value: '42' },
      { label: 'TVPI Return', value: '4.8x' }
    ]
  },
  'Keynote Headliner': {
    name: 'Elena Rostova, Ph.D.',
    title: 'Global Keynote Speaker & Futurist',
    organization: 'World Economic Forum Contributor',
    bio: 'Demystifying the algorithmic paradigm for Fortune 100 boards, heads of state, and sovereign wealth entities.',
    theme: 'aurora',
    badges: ['TEDx 4M+ Views', 'WSJ Bestselling Author', 'Top Voice 2025', 'Davos Speaker'],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Keynotes Given', value: '180+' },
      { label: 'Attendees', value: '250K+' },
      { label: 'Countries', value: '38' },
      { label: 'Rating Score', value: '9.9/10' }
    ]
  }
}

export const LivePresenceStudio: React.FC<LivePresenceStudioProps> = ({
  initialProfile,
  onOpenBook
}) => {
  const [profile, setProfile] = useState<ExecutiveProfile>(initialProfile)
  const [newBadge, setNewBadge] = useState('')
  const [activeTab, setActiveTab] = useState<'profile' | 'theme' | 'metrics'>('profile')

  // Calculate live dynamic Presence Gravitas Score
  const calculateGravitasScore = () => {
    let score = 50
    if (profile.name.length > 5) score += 10
    if (profile.title.length > 10) score += 10
    if (profile.bio.length > 40) score += 10
    if (profile.badges.length >= 3) score += 10
    if (profile.verificationStatus) score += 10
    return Math.min(100, score)
  }

  const gravitasScore = calculateGravitasScore()

  const handleApplyPreset = (name: string) => {
    playTactileClick()
    const p = presets[name]
    if (p) {
      setProfile((prev) => ({
        ...prev,
        ...p
      }))
      triggerLuxuryGlowCelebration()
    }
  }

  const handleThemeChange = (theme: BrandTheme) => {
    playTactileClick()
    setProfile((prev) => ({ ...prev, theme }))
  }

  const handleAddBadge = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBadge.trim()) return
    playTactileClick()
    setProfile((prev) => ({
      ...prev,
      badges: [...prev.badges, newBadge.trim()]
    }))
    setNewBadge('')
  }

  const handleRemoveBadge = (idx: number) => {
    playTactileClick()
    setProfile((prev) => ({
      ...prev,
      badges: prev.badges.filter((_, i) => i !== idx)
    }))
  }

  return (
    <section id="studio" className="py-20 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Real-Time Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Design Your <span className="text-gradient-gold">Executive Aura</span> In Real Time
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Test and customize your digital sovereign card. Witness how elite typography, chromatic themes, and high-impact micro-credentials instantly elevate your perception.
          </p>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mr-1">
              Load Persona:
            </span>
            {Object.keys(presets).map((presetName) => (
              <button
                key={presetName}
                onClick={() => handleApplyPreset(presetName)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:border-amber-400/40 hover:text-amber-200 transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{presetName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Studio Grid: Controls Left, Live 3D Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0f131d]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            {/* Top Score Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Real-Time Gravitas Score</span>
                </div>
                <div className="text-2xl font-serif font-black text-white mt-1">
                  {gravitasScore} <span className="text-sm font-sans font-normal text-slate-400">/ 100</span>
                </div>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Executive Influence Tier</span>
                  <span className="text-amber-400 font-semibold">
                    {gravitasScore >= 90 ? 'Tier-1 Sovereign' : 'High Authority'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${gravitasScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Studio Navigation Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-4 mb-6">
              <button
                onClick={() => { playTactileClick(); setActiveTab('profile'); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-amber-400/20 border border-amber-400/40 text-amber-200'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Identity & Bio</span>
              </button>

              <button
                onClick={() => { playTactileClick(); setActiveTab('theme'); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'theme'
                    ? 'bg-amber-400/20 border border-amber-400/40 text-amber-200'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Chromatic Aura</span>
              </button>

              <button
                onClick={() => { playTactileClick(); setActiveTab('metrics'); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'metrics'
                    ? 'bg-amber-400/20 border border-amber-400/40 text-amber-200'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Badges & Proof</span>
              </button>
            </div>

            {/* TAB 1: Profile Details */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Executive Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="e.g. Elena Vance, Ph.D."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Executive Title / Designation
                    </label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="e.g. Chief Executive Officer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Organization / Venture
                    </label>
                    <input
                      type="text"
                      value={profile.organization}
                      onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="e.g. Vance Horizons • Ex-Goldman"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Global Hub / Location
                    </label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="e.g. London & Geneva"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Strategic Executive Pitch / Bio
                  </label>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    placeholder="Describe your sovereign impact and market domain..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Avatar Image URL (or Headshot)
                  </label>
                  <input
                    type="text"
                    value={profile.avatarUrl}
                    onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Chromatic Themes */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Select Digital Aura Atmosphere
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'gold', name: 'Imperial Gold', hex: '#e6c374', desc: 'Luxury C-Suite & Wall St' },
                      { id: 'emerald', name: 'Sovereign Emerald', hex: '#10b981', desc: 'Deep Tech & Sustainable Capital' },
                      { id: 'aurora', name: 'Cosmic Aurora', hex: '#8b5cf6', desc: 'Frontier AI & Keynote Star' },
                      { id: 'obsidian', name: 'Obsidian Stealth', hex: '#94a3b8', desc: 'Minimalist Titanium' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleThemeChange(t.id as BrandTheme)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          profile.theme === t.id
                            ? 'bg-white/10 border-white/40 shadow-lg ring-2 ring-amber-400/40'
                            : 'bg-black/30 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full mb-2 shadow-inner"
                          style={{ backgroundColor: t.hex }}
                        />
                        <div className="text-xs font-bold text-white">{t.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-200">Verified Executive Seal</span>
                    <button
                      onClick={() => {
                        playTactileClick()
                        setProfile({ ...profile, verificationStatus: !profile.verificationStatus })
                      }}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        profile.verificationStatus ? 'bg-amber-400 justify-end' : 'bg-white/20 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-black shadow-md" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Displays cryptographic sovereign verification badge on your card.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: Badges & Social Proof */}
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Active Badges & Accreditations
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200"
                      >
                        <span>{b}</span>
                        <button
                          onClick={() => handleRemoveBadge(idx)}
                          className="text-slate-400 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <form onSubmit={handleAddBadge} className="flex gap-2">
                    <input
                      type="text"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      placeholder="Add custom badge (e.g. Forbes Council, TEDx, Board Member)"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </form>
                </div>

                {/* Key Metrics Editor */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Key Metric Milestones (Display on Card)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {profile.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/30 border border-white/5">
                        <input
                          type="text"
                          value={m.value}
                          onChange={(e) => {
                            const newM = [...profile.metrics]
                            newM[idx].value = e.target.value
                            setProfile({ ...profile, metrics: newM })
                          }}
                          className="w-full bg-transparent text-sm font-bold text-amber-300 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={m.label}
                          onChange={(e) => {
                            const newM = [...profile.metrics]
                            newM[idx].label = e.target.value
                            setProfile({ ...profile, metrics: newM })
                          }}
                          className="w-full bg-transparent text-[10px] uppercase tracking-wider text-slate-400 focus:outline-none mt-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Studio Action Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Live Rendering in Real-Time Engine</span>
              </div>
              <button
                onClick={() => {
                  playTactileClick()
                  onOpenBook()
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                Deploy This Identity System
              </button>
            </div>
          </div>

          {/* Live Preview Panel (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full text-center mb-3">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-amber-400/90">
                Live Interactive 3D Card Preview
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Hover / tilt card to inspect specular reflections
              </p>
            </div>

            <DigitalCard3D profile={profile} />
          </div>

        </div>
      </div>
    </section>
  )
}
