import React from 'react'
import { 
  Home, 
  AlertTriangle, 
  Building2, 
  Truck, 
  User, 
  Users, 
  FileText, 
  Droplet, 
  History, 
  Stethoscope, 
  Settings,
  HeartPulse,
  PhoneCall,
  X,
  LogOut
} from 'lucide-react'
import { AppView } from '../types/hope'
import { playClick } from '../utils/emergencyAudio'

interface SidebarProps {
  currentView: AppView
  setCurrentView: (view: AppView) => void
  onTriggerSos: () => void
  activeEmergencyCount: number
  isMobileOpen?: boolean
  onCloseMobile?: () => void
  onLogout?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  onTriggerSos,
  activeEmergencyCount,
  isMobileOpen = false,
  onCloseMobile,
  onLogout
}) => {
  const menuItems: { id: AppView; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'sos', label: 'Emergency SOS', icon: AlertTriangle, badge: activeEmergencyCount > 0 ? 'ACTIVE' : undefined },
    { id: 'hospitals', label: 'Find Hospitals', icon: Building2 },
    ...(activeEmergencyCount > 0
      ? [{ id: 'ambulance' as AppView, label: 'Ambulance Tracking', icon: Truck, badge: 'LIVE' }]
      : []),
    { id: 'profile', label: 'Emergency Profile', icon: User },
    { id: 'contacts', label: 'Trusted Contacts', icon: Users },
    { id: 'documents', label: 'Documents & QR', icon: FileText },
    { id: 'blood', label: 'Blood Availability', icon: Droplet },
    { id: 'history', label: 'Emergency History', icon: History },
    { id: 'hospital-portal', label: 'Hospital Portal', icon: Stethoscope },
    { id: 'settings', label: 'Settings & Privacy', icon: Settings },
  ]

  const handleNavClick = (id: AppView) => {
    playClick()
    if (onCloseMobile) onCloseMobile()
    if (id === 'sos') {
      onTriggerSos()
    } else {
      setCurrentView(id)
    }
  }

  // Common content rendered inside both desktop sidebar and mobile drawer
  const renderNavContent = (isMobile = false) => (
    <>
      <div>
        {/* Brand Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20 text-white shrink-0">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-lg tracking-wider">HOPE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          {isMobile && onCloseMobile && (
            <button
              onClick={() => {
                playClick()
                onCloseMobile()
              }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            const isSos = item.id === 'sos'

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-[#142d42] text-teal-300 shadow-md font-semibold'
                    : isSos
                    ? 'text-rose-400 hover:bg-rose-500/10 hover:text-rose-300'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-teal-400' : isSos ? 'text-rose-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}

          {onLogout && (
            <button
              onClick={() => {
                playClick()
                if (onCloseMobile) onCloseMobile()
                onLogout()
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all group mt-2"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-400 transition-colors" />
                <span>Sign Out</span>
              </div>
            </button>
          )}
        </nav>
      </div>

      {/* Footer Info / Emergency Call Bar */}
      <div className="p-4 border-t border-slate-800/60 text-slate-400 text-[11px] bg-[#07131e]">
        <div className="flex items-center gap-2 mb-2">
          <PhoneCall className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="text-white font-semibold">Emergency Speed Dials:</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          <a
            href="tel:112"
            className="py-1 px-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-center font-bold hover:bg-rose-500 hover:text-white transition-all text-xs"
          >
            Police: 112
          </a>
          <a
            href="tel:108"
            className="py-1 px-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-center font-bold hover:bg-emerald-500 hover:text-white transition-all text-xs"
          >
            Ambulance: 108
          </a>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          24/7 emergency speed dials 112 or 108.
        </p>
      </div>
    </>
  )

  return (
    <>
      {/* 1. Desktop Permanent Sidebar (Hidden on Mobile screens < 768px) */}
      <aside className="hidden md:flex md:w-64 bg-[#0a1826] text-slate-300 flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-800/80 select-none overflow-y-auto">
        {renderNavContent(false)}
      </aside>

      {/* 2. Mobile Drawer & Backdrop (Rendered only when open on mobile) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          
          {/* Slide-out Drawer */}
          <aside className="relative z-10 w-72 max-w-[82vw] bg-[#0a1826] text-slate-300 flex flex-col justify-between h-full border-r border-slate-800 shadow-2xl select-none overflow-y-auto animate-in slide-in-from-left duration-200">
            {renderNavContent(true)}
          </aside>
        </div>
      )}
    </>
  )
}
