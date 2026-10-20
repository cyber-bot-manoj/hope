import React from 'react'
import { 
  Home, 
  Building2, 
  AlertTriangle, 
  Truck, 
  Users, 
  Menu 
} from 'lucide-react'
import { AppView } from '../types/hope'
import { playClick, playEmergencyPulse } from '../utils/emergencyAudio'

interface MobileBottomNavProps {
  currentView: AppView
  setCurrentView: (view: AppView) => void
  onTriggerSos: () => void
  activeEmergencyCount: number
  onOpenMore: () => void
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  setCurrentView,
  onTriggerSos,
  activeEmergencyCount,
  onOpenMore
}) => {
  const handleItemClick = (id: AppView) => {
    playClick()
    setCurrentView(id)
  }

  const handleSosClick = () => {
    playEmergencyPulse()
    onTriggerSos()
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-3 py-1.5 flex items-center justify-around md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))] select-none">
      
      {/* 1. Home */}
      <button
        onClick={() => handleItemClick('home')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          currentView === 'home'
            ? 'text-teal-700 font-bold scale-105'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className={`w-5 h-5 ${currentView === 'home' ? 'text-teal-600 stroke-[2.5]' : ''}`} />
        <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
      </button>

      {/* 2. Hospitals */}
      <button
        onClick={() => handleItemClick('hospitals')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          currentView === 'hospitals'
            ? 'text-teal-700 font-bold scale-105'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Building2 className={`w-5 h-5 ${currentView === 'hospitals' ? 'text-teal-600 stroke-[2.5]' : ''}`} />
        <span className="text-[10px] mt-0.5 tracking-tight">Hospitals</span>
      </button>

      {/* 3. Center Elevated SOS Button */}
      <div className="relative -top-5 flex flex-col items-center">
        <button
          onClick={handleSosClick}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 text-white font-black text-sm flex flex-col items-center justify-center shadow-xl shadow-rose-600/50 border-4 border-[#f8fafc] active:scale-90 transition-transform"
          aria-label="Emergency SOS"
        >
          {/* Animated ping ring */}
          <span className="absolute inset-0 rounded-full border-2 border-rose-400/80 animate-ping pointer-events-none" />
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[9px] font-black tracking-wider leading-none mt-0.5">SOS</span>
        </button>
      </div>

      {/* 4. Ambulance (if active) OR Contacts */}
      {activeEmergencyCount > 0 ? (
        <button
          onClick={() => handleItemClick('ambulance')}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            currentView === 'ambulance'
              ? 'text-rose-600 font-bold scale-105'
              : 'text-rose-500 hover:text-rose-600'
          }`}
        >
          <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <Truck className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[10px] mt-0.5 tracking-tight font-extrabold text-rose-600">Ambulance</span>
        </button>
      ) : (
        <button
          onClick={() => handleItemClick('contacts')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            currentView === 'contacts'
              ? 'text-teal-700 font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className={`w-5 h-5 ${currentView === 'contacts' ? 'text-teal-600 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Contacts</span>
        </button>
      )}

      {/* 5. More Menu */}
      <button
        onClick={() => {
          playClick()
          onOpenMore()
        }}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-800 transition-all"
        aria-label="More navigation options"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] mt-0.5 tracking-tight">Menu</span>
      </button>

    </nav>
  )
}
