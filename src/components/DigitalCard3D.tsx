import React, { useState, useRef } from 'react'
import { 
  ShieldCheck, 
  Share2, 
  QrCode, 
  Download, 
  Check, 
  ExternalLink,
  Linkedin,
  Twitter,
  Mail,
  Sparkles
} from 'lucide-react'
import { ExecutiveProfile } from '../types'
import { playTactileClick, playSuccessChime } from '../utils/sound'
import { triggerConfetti } from '../utils/confetti'

interface DigitalCard3DProps {
  profile: ExecutiveProfile
}

export const DigitalCard3D: React.FC<DigitalCard3DProps> = ({ profile }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)

  // 3D tilt effect on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const multiplier = 18
    setRotation({
      x: -(y / (rect.height / 2)) * multiplier,
      y: (x / (rect.width / 2)) * multiplier
    })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  // Theme styling helpers
  const getThemeGlow = () => {
    switch (profile.theme) {
      case 'emerald':
        return 'from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/30'
      case 'aurora':
        return 'from-purple-500/20 via-indigo-500/10 to-pink-500/10 border-indigo-500/30'
      case 'obsidian':
        return 'from-slate-600/20 via-slate-800/10 to-transparent border-slate-500/30'
      case 'gold':
      default:
        return 'from-amber-500/25 via-yellow-500/10 to-transparent border-amber-500/40'
    }
  }

  const getThemeAccentText = () => {
    switch (profile.theme) {
      case 'emerald': return 'text-emerald-400'
      case 'aurora': return 'text-purple-300'
      case 'obsidian': return 'text-slate-200'
      case 'gold':
      default: return 'text-amber-300'
    }
  }

  // Download real vCard .vcf
  const handleDownloadVCard = () => {
    playSuccessChime()
    triggerConfetti()
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.title}
ORG:${profile.organization}
NOTE:${profile.bio}
EMAIL;TYPE=INTERNET:${profile.socials.email || ''}
URL:${profile.socials.website || ''}
ADR;TYPE=WORK:;;${profile.location};;;;
END:VCARD`

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${profile.name.replace(/\s+/g, '_')}_ExecutivePass.vcf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShareLink = () => {
    playTactileClick()
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Perspective Container */}
      <div 
        className="w-full max-w-md perspective-1000 py-4 select-none"
        style={{ perspective: '1200px' }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
          className={`relative rounded-3xl p-6 sm:p-8 backdrop-blur-2xl bg-gradient-to-br from-[#121622]/95 via-[#0b0e15]/95 to-[#161b29]/95 border shadow-2xl transition-shadow ${getThemeGlow()}`}
        >
          {/* Subtle Ambient Refraction Sheen */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.02] pointer-events-none" />

          {/* Top Badge & Verified Mark */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-slate-400">
                AURA Sovereign Pass
              </span>
            </div>
            {profile.verificationStatus && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Executive</span>
              </div>
            )}
          </div>

          {/* Profile Header (Avatar + Name) */}
          <div className="flex items-start gap-4 mb-5">
            <div className="relative group">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg relative bg-slate-800">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-black flex items-center justify-center text-xs shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-black" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight truncate">
                {profile.name}
              </h3>
              <p className={`text-xs sm:text-sm font-semibold tracking-wide mt-0.5 ${getThemeAccentText()}`}>
                {profile.title}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 truncate">
                {profile.organization}
              </p>
            </div>
          </div>

          {/* Executive Bio */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-light border-l-2 border-white/10 pl-3">
            "{profile.bio}"
          </p>

          {/* Badges / Accreditations */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {profile.badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/5 border border-white/10 text-slate-300 tracking-wide"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Executive Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 px-3.5 rounded-2xl bg-black/40 border border-white/5 mb-6">
            {profile.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className={`text-sm sm:text-base font-bold font-serif ${getThemeAccentText()}`}>
                  {m.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Location & Social Icons */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400">
            <span className="flex items-center gap-1 truncate text-[11px]">
              📍 {profile.location}
            </span>
            <div className="flex items-center gap-2">
              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playTactileClick()}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.socials.twitter && (
                <a
                  href={profile.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playTactileClick()}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.socials.email && (
                <a
                  href={`mailto:${profile.socials.email}`}
                  onClick={() => playTactileClick()}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Micro-actions bar */}
      <div className="w-full max-w-md flex items-center justify-center gap-2 sm:gap-3 mt-2">
        <button
          onClick={handleDownloadVCard}
          className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Save to Contacts (.vcf)</span>
        </button>

        <button
          onClick={() => {
            playTactileClick()
            setShowQr(!showQr)
          }}
          className="py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
        >
          <QrCode className="w-3.5 h-3.5 text-slate-300" />
          <span>QR Code</span>
        </button>

        <button
          onClick={handleShareLink}
          className="py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-300" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* QR Code Popover */}
      {showQr && (
        <div className="mt-4 p-5 rounded-2xl bg-[#121622] border border-amber-400/30 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-36 h-36 bg-white p-3 rounded-xl shadow-inner flex items-center justify-center mb-3">
            {/* SVG Simulated QR code */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" fill="#ffffff"/>
              <path d="M10 10h30v30h-30z M15 15h20v20h-20z M20 20h10v10h-10z" fill="#000000"/>
              <path d="M60 10h30v30h-30z M65 15h20v20h-20z M70 20h10v10h-10z" fill="#000000"/>
              <path d="M10 60h30v30h-30z M15 65h20v20h-20z M20 70h10v10h-10z" fill="#000000"/>
              <rect x="45" y="10" width="8" height="20" fill="#000000"/>
              <rect x="50" y="35" width="15" height="10" fill="#000000"/>
              <rect x="10" y="45" width="20" height="8" fill="#000000"/>
              <rect x="45" y="45" width="10" height="10" fill="#000000"/>
              <rect x="60" y="55" width="30" height="8" fill="#000000"/>
              <rect x="45" y="65" width="15" height="25" fill="#000000"/>
              <rect x="70" y="70" width="20" height="20" fill="#000000"/>
            </svg>
          </div>
          <p className="text-xs font-semibold text-white">Scan for Instant Sovereign Pass</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Compatible with iOS & Android camera</p>
        </div>
      )}
    </div>
  )
}
