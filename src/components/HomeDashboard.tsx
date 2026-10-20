import React, { useState } from 'react'
import { 
  AlertCircle, 
  MapPin, 
  Building2, 
  Truck, 
  User, 
  FileText, 
  CheckCircle2, 
  Phone, 
  ExternalLink,
  ChevronRight,
  Info,
  Edit2,
  Clock,
  ShieldCheck,
  Check,
  Navigation
} from 'lucide-react'
import { Droplet } from 'lucide-react'
import { Hospital, EmergencyRequest, TrustedContact, AppView } from '../types/hope'
import { playClick, playEmergencyPulse } from '../utils/emergencyAudio'

interface HomeDashboardProps {
  hospitals: Hospital[]
  currentLocation: { 
    address: string
    coords: string
    lat: number
    lng: number
    isManual: boolean
    isDetecting?: boolean 
  }
  onOpenEditLocation: () => void
  onDetectLocation: () => void
  onTriggerSos: () => void
  onNavigateView: (view: AppView) => void
  activeEmergencies: EmergencyRequest[]
  trustedContacts: TrustedContact[]
  preparednessItems: { id: string; label: string; completed: boolean }[]
  onTogglePreparedness: (id: string) => void
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  hospitals,
  currentLocation,
  onOpenEditLocation,
  onDetectLocation,
  onTriggerSos,
  onNavigateView,
  activeEmergencies,
  trustedContacts,
  preparednessItems,
  onTogglePreparedness
}) => {
  const completedCount = preparednessItems.filter((i) => i.completed).length
  const totalPreparedness = preparednessItems.length

  const handleSosClick = () => {
    playEmergencyPulse()
    onTriggerSos()
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner / Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Your Direct Lifeline to the Right Medical Help in Every Emergency.
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-2xl font-medium">
          Instant emergency SOS, live ambulance dispatch, and real-time hospital ICU bed tracking — when every second matters.
        </p>
      </div>

      {/* TOP ROW: SOS Card + Current Location Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Emergency SOS Card (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#091829] text-white p-6 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            {/* Red Badge */}
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30 mb-4">
              Emergency
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Pulsing SOS Button */}
              <button
                onClick={handleSosClick}
                className="relative group shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 hover:from-rose-600 hover:to-red-400 text-white font-black text-2xl tracking-wider shadow-2xl shadow-rose-600/50 flex items-center justify-center cursor-pointer transition-transform active:scale-95 mx-auto sm:mx-0"
              >
                {/* Pulsing rings */}
                <span className="absolute inset-0 rounded-full border-2 border-rose-400/80 animate-ping pointer-events-none" />
                <span className="absolute -inset-2 rounded-full border border-rose-500/40 animate-pulse pointer-events-none" />
                <span>SOS</span>
              </button>

              {/* Text Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                  Need help right now?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                  Tap SOS to start a guided emergency flow. You'll confirm before anything is created — accidental taps are safe.
                </p>
                
                {/* Emergency Direct Call Pills */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <a
                    href="tel:112"
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-rose-400" />
                    <span>Call 112</span>
                  </a>
                  <a
                    href="tel:108"
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ambulance 108</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Ambient background glow */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Right: Current Location Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Current location
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playClick()
                    onDetectLocation()
                  }}
                  disabled={currentLocation.isDetecting}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 active:scale-95"
                  title="Detect live satellite location"
                >
                  <Navigation className={`w-3 h-3 text-teal-600 ${currentLocation.isDetecting ? 'animate-spin' : ''}`} />
                  <span>{currentLocation.isDetecting ? 'Detecting...' : 'Detect GPS'}</span>
                </button>

                <button
                  onClick={() => {
                    playClick()
                    onOpenEditLocation()
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 mb-3">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-slate-900 leading-snug">
                  {currentLocation.address}
                </div>
                <div className="text-[11px] text-slate-500">
                  {currentLocation.coords} · {!currentLocation.isManual ? 'Live device GPS coordinates' : 'Selected area'}
                </div>
              </div>
            </div>
          </div>

          {/* Real Live Map Frame (OpenStreetMap) */}
          <div className="w-full h-36 rounded-xl border border-slate-200 relative overflow-hidden bg-slate-100 shadow-inner">
            <iframe
              title="Live Emergency Map"
              className="w-full h-full border-0"
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${currentLocation.lng - 0.008}%2C${currentLocation.lat - 0.008}%2C${currentLocation.lng + 0.008}%2C${currentLocation.lat + 0.008}&layer=mapnik&marker=${currentLocation.lat}%2C${currentLocation.lng}`}
            />
            
            {/* Live GPS Beacon Overlay */}
            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-700 shadow-sm border border-slate-200 flex items-center gap-1 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Real-Time Map</span>
            </div>
          </div>
        </div>

      </div>

      {/* MIDDLE ROW: 4 Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Find hospitals', icon: Building2, view: 'hospitals' as AppView },
          ...(activeEmergencies.length > 0
            ? [{ label: 'Track Ambulance (LIVE)', icon: Truck, view: 'ambulance' as AppView }]
            : [{ label: 'Blood Availability', icon: Droplet, view: 'blood' as AppView }]),
          { label: 'Emergency profile', icon: User, view: 'profile' as AppView },
          { label: 'Documents & QR', icon: FileText, view: 'documents' as AppView },
        ].map((item, idx) => {
          const Icon = item.icon
          return (
            <button
              key={idx}
              onClick={() => {
                playClick()
                onNavigateView(item.view)
              }}
              className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 hover:border-teal-500/50 hover:bg-teal-50/20 text-slate-800 transition-all shadow-sm flex items-center gap-3 font-semibold text-xs sm:text-sm active:scale-95 group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-teal-100 text-slate-700 group-hover:text-teal-700 flex items-center justify-center shrink-0 transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* LOWER GRID: Recommended Facilities (Left) + Preparedness & Contacts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column (7 cols): Recommended Facilities + Last Emergency Request */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Recommended Facilities */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">
                Recommended nearby facilities
              </h3>
              <button
                onClick={() => {
                  playClick()
                  onNavigateView('hospitals')
                }}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View all
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mb-4">
              Ranked by proximity and real-time ER readiness
            </p>

            {/* List */}
            <div className="divide-y divide-slate-100">
              {hospitals.slice(0, 3).map((hosp) => (
                <div
                  key={hosp.id}
                  onClick={() => {
                    playClick()
                    onNavigateView('hospitals')
                  }}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-slate-50/70 p-2 rounded-xl cursor-pointer transition-colors"
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 hover:text-teal-700 transition-colors">
                      {hosp.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {hosp.distanceKm} km · ~{hosp.etaMins} mins · {hosp.speciality}
                    </p>
                  </div>

                  <div className="shrink-0 ml-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${
                        hosp.status === 'available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {hosp.status} {hosp.availabilityScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Last Emergency Request Card */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Last emergency request
            </h3>

            {activeEmergencies.length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                No emergency requests yet.
              </p>
            ) : (
              <div className="space-y-3">
                {activeEmergencies.map((em) => (
                  <div
                    key={em.id}
                    className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-rose-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                        <span>{em.emergencyType}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-200 text-rose-800 font-semibold">
                          {em.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-rose-700 mt-1">
                        {em.location} · {em.timestamp}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playClick()
                        onNavigateView('ambulance')
                      }}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm"
                    >
                      <span>Track</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column (5 cols): Preparedness + Trusted Contacts */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Preparedness Checklist */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                Preparedness
              </h3>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {completedCount}/{totalPreparedness}
              </span>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5">
              {preparednessItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    playClick()
                    onTogglePreparedness(item.id)
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      item.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 group-hover:border-slate-400'
                    }`}
                  >
                    {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span
                    className={`text-xs ${
                      item.completed
                        ? 'text-slate-400 line-through'
                        : 'text-slate-700 font-medium'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted Contacts */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Trusted contacts
              </h3>
              <button
                onClick={() => {
                  playClick()
                  onNavigateView('contacts')
                }}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                Manage
              </button>
            </div>

            {trustedContacts.length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                No contacts saved yet.
              </p>
            ) : (
              <div className="space-y-2">
                {trustedContacts.slice(0, 2).map((contact) => (
                  <div
                    key={contact.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800">
                        {contact.name} ({contact.relationship})
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {contact.phone}
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      onClick={() => playClick()}
                      className="p-1.5 rounded-lg bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors"
                      title="Direct Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  )
}
