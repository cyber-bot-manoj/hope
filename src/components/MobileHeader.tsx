import React from 'react'
import { Menu, HeartPulse, MapPin, ChevronDown } from 'lucide-react'
import { playClick } from '../utils/emergencyAudio'

interface MobileHeaderProps {
  currentLocation: {
    address: string
    isDetecting?: boolean
  }
  onOpenEditLocation: () => void
  onTriggerSos?: () => void
  onOpenMenu: () => void
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentLocation,
  onOpenEditLocation,
  onOpenMenu
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-[#0a1826]/95 backdrop-blur-md border-b border-slate-800/80 px-3.5 flex items-center justify-between md:hidden select-none">
      {/* Left: HOPE Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 shrink-0">
          <HeartPulse className="w-4.5 h-4.5 animate-pulse" />
        </div>
        <div className="flex items-center gap-1">
          <span className="font-black text-white text-lg tracking-wider">HOPE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>

      {/* Center: Tap to Edit Location Pill */}
      <button
        onClick={() => {
          playClick()
          onOpenEditLocation()
        }}
        className="max-w-[150px] sm:max-w-[200px] px-2.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 flex items-center gap-1.5 text-[11px] truncate active:scale-95 transition-all"
        title="Tap to change or detect location"
      >
        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
        <span className="truncate font-medium">{currentLocation.address}</span>
        <ChevronDown className="w-2.5 h-2.5 text-slate-400 shrink-0" />
      </button>

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
