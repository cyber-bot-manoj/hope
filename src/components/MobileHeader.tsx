import React from 'react'
import { Menu, HeartPulse, MapPin, AlertTriangle, ChevronDown } from 'lucide-react'
import { playClick, playEmergencyPulse } from '../utils/emergencyAudio'

interface MobileHeaderProps {
  currentLocation: {
    address: string
    isDetecting?: boolean
  }
  onOpenEditLocation: () => void
  onTriggerSos: () => void
  onOpenMenu: () => void
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentLocation,
  onOpenEditLocation,
  onTriggerSos,
  onOpenMenu
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-[#0a1826]/95 backdrop-blur-md border-b border-slate-800/80 px-3 flex items-center justify-between md:hidden select-none">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => {
            playClick()
            onOpenMenu()
          }}
          className="p-2 rounded-xl bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700/80 active:scale-95 transition-all"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 shrink-0">
            <HeartPulse className="w-4 h-4 animate-pulse" />
          </div>
          <span className="font-extrabold text-white text-base tracking-wider">HOPE</span>
        </div>
      </div>

      {/* Center: Tap to Edit Location Pill */}
      <button
        onClick={() => {
          playClick()
          onOpenEditLocation()
        }}
        className="max-w-[150px] sm:max-w-[200px] px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 flex items-center gap-1.5 text-[11px] truncate active:scale-95 transition-all"
        title="Tap to change or detect location"
      >
        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
        <span className="truncate font-medium">{currentLocation.address}</span>
        <ChevronDown className="w-2.5 h-2.5 text-slate-400 shrink-0" />
      </button>

      {/* Right: Quick SOS Emergency Pill */}
      <button
        onClick={() => {
          playEmergencyPulse()
          onTriggerSos()
        }}
        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs shadow-md shadow-rose-600/40 flex items-center gap-1 animate-pulse active:scale-95 transition-all shrink-0"
      >
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>SOS</span>
      </button>
    </header>
  )
}
