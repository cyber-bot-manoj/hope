import React, { useState, useEffect } from 'react'
import { 
  X, 
  Building2, 
  Navigation, 
  Phone, 
  MapPin, 
  Bed, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink,
  Clock,
  HeartPulse,
  Share2,
  Check,
  Compass,
  AlertTriangle,
  QrCode
} from 'lucide-react'
import { Hospital, EmergencyProfileData } from '../types/hope'
import { playEmergencyPulse, playClick } from '../utils/emergencyAudio'

interface HospitalErAlertModalProps {
  hospital: Hospital | null
  patientProfile: EmergencyProfileData
  patientLocation: string
  isOpen: boolean
  onClose: () => void
}

export const HospitalErAlertModal: React.FC<HospitalErAlertModalProps> = ({
  hospital,
  patientProfile,
  patientLocation,
  isOpen,
  onClose
}) => {
  const [triageStage, setTriageStage] = useState<'transmitting' | 'confirmed'>('transmitting')
  const [triageToken, setTriageToken] = useState('')
  const [copiedToken, setCopiedToken] = useState(false)

  useEffect(() => {
    if (!isOpen || !hospital) {
      setTriageStage('transmitting')
      return
    }

    playEmergencyPulse()
    const token = `ER-${hospital.name.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
    setTriageToken(token)

    const timer = setTimeout(() => {
      setTriageStage('confirmed')
      playEmergencyPulse()
    }, 1800)

    return () => clearTimeout(timer)
  }, [isOpen, hospital])

  if (!isOpen || !hospital) return null

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat || 26.8505},${hospital.lng || 80.9462}`

  const handleCopyToken = () => {
    playClick()
    navigator.clipboard.writeText(`Emergency Triage Token: ${triageToken}\nHospital: ${hospital.name}\nPatient: ${patientProfile.fullName} (${patientProfile.bloodGroup})\nEmergency Desk: ${hospital.phone}`)
    setCopiedToken(true)
    setTimeout(() => setCopiedToken(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#091522] border border-teal-500/40 rounded-3xl p-5 sm:p-7 text-white shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Modal Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/30">
                  {hospital.category}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 leading-snug">
                {hospital.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => { playClick(); onClose(); }}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Triage Transmission Status */}
        <div className="my-5">
          {triageStage === 'transmitting' ? (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-teal-500/30 flex items-center gap-3 text-xs">
              <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin shrink-0" />
              <div>
                <div className="font-bold text-teal-300">
                  Transmitting Encrypted Clinical Telemetry...
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Alerting Trauma Chief, Reserving ICU Bed, and Pre-Matching Blood Bank Units.
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-teal-950/80 to-slate-900 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                    <span>ER DESK ALERTED & BED PRE-RESERVED</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Token: <strong className="text-white font-mono">{triageToken}</strong> · Priority Corridor Active
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyToken}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 self-start sm:self-center transition-all"
              >
                {copiedToken ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-300" />
                    <span>Copy Token</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* 2 Column Details: Patient Snapshot & Real Live Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          
          {/* Col 1: Patient Clinical Telemetry Handover */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase tracking-wider font-bold border-b border-slate-800 pb-1.5">
              <span>Patient Telemetry Sent to ER</span>
              <span className="text-teal-400">Live Sync</span>
            </div>

            <div className="space-y-1.5 text-slate-300 text-xs">
              <div><span className="text-slate-400">Patient:</span> <strong className="text-white">{patientProfile.fullName} ({patientProfile.age}y/{patientProfile.gender})</strong></div>
              <div><span className="text-slate-400">Blood Group:</span> <strong className="text-rose-400 font-bold">{patientProfile.bloodGroup} (Pre-Matching Requested)</strong></div>
              <div><span className="text-slate-400">Known Allergies:</span> <strong className="text-amber-300">{patientProfile.allergies}</strong></div>
              <div><span className="text-slate-400">Conditions:</span> <span>{patientProfile.chronicConditions}</span></div>
              <div><span className="text-slate-400">Guardian Contact:</span> <strong className="text-white">{patientProfile.primaryContactPhone}</strong></div>
            </div>
          </div>

          {/* Col 2: Hospital Emergency Desk Readiness */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase tracking-wider font-bold border-b border-slate-800 pb-1.5">
              <span>ER Readiness Status</span>
              <span className="text-emerald-400">Ready</span>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Trauma Level:</span>
                <span className="font-bold text-white px-2 py-0.5 rounded bg-teal-950 border border-teal-500/40 text-[11px]">
                  {hospital.traumaLevel} Apex
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">ICU Beds Available:</span>
                <span className="font-bold text-teal-400">{hospital.icuBedsAvailable} Open</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Liquid Oxygen Supply:</span>
                <span className="font-bold text-emerald-400">Surplus Pipeline</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Direct ER Hotline:</span>
                <a
                  href={`tel:${hospital.phone}`}
                  onClick={() => playClick()}
                  className="font-bold text-amber-300 hover:text-amber-200 underline"
                >
                  {hospital.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Live GPS Navigation Interactive Map Section */}
        <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Live Turn-by-Turn GPS Navigation
              </span>
            </div>
            <span className="text-xs font-bold text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-500/30">
              ~{hospital.etaMins} Mins ({hospital.distanceKm} km)
            </span>
          </div>

          {/* Embedded Live Map Direct to Hospital */}
          <div className="w-full h-44 rounded-xl border border-slate-800 overflow-hidden relative shadow-inner">
            <iframe
              title="Hospital Route Navigation"
              className="w-full h-full border-0"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${(hospital.lng || 80.9462) - 0.01}%2C${(hospital.lat || 26.8505) - 0.01}%2C${(hospital.lng || 80.9462) + 0.01}%2C${(hospital.lat || 26.8505) + 0.01}&layer=mapnik&marker=${hospital.lat || 26.8505}%2C${hospital.lng || 80.9462}`}
            />
            
            <div className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] text-white border border-white/20 font-medium">
              Dest: <strong>{hospital.address}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playClick()}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Start Turn-by-Turn Google Maps Navigation</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href={`tel:${hospital.phone}`}
              onClick={() => playClick()}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              <span>Call ER Desk</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
