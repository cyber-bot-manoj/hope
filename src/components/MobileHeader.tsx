import React from 'react'
import { Menu, HeartPulse } from 'lucide-react'
import { playClick } from '../utils/emergencyAudio'

interface MobileHeaderProps {
  currentLocation?: {
    address: string
    isDetecting?: boolean
  }
  onOpenEditLocation?: () => void
  onTriggerSos?: () => void
  onOpenMenu: () => void
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onOpenMenu }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-[#0a1826]/95 backdrop-blur-md border-b border-slate-800/80 px-4 flex items-center justify-between md:hidden select-none">
      {/* Left: HOPE Brand Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 shrink-0">
          <HeartPulse className="w-4.5 h-4.5 animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-black text-white text-lg tracking-wider">HOPE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>

      {/* Right: 3-line Hamburger Menu Button */}
      <button
        onClick={() => {
          playClick()
          onOpenMenu()
        }}
        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 active:scale-95 transition-all flex items-center justify-center"
        aria-label="Open Navigation Menu"
      >
        <Menu className="w-5 h-5" />
      </button>
    </header>
  )
}
