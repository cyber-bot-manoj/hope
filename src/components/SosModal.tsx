import React, { useState, useEffect } from 'react'
import { 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  Phone, 
  MapPin, 
  HeartPulse, 
  CarFront, 
  Wind, 
  Baby, 
  Flame, 
  CheckCircle2,
  Clock
} from 'lucide-react'
import { emergencyTypes } from '../data/hopeData'
import { playCountdownTick, playEmergencyPulse, playClick } from '../utils/emergencyAudio'

interface SosModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmSos: (emergencyType: string, severity: 'Critical' | 'Severe' | 'Moderate') => void
  currentLocation: string
}

export const SosModal: React.FC<SosModalProps> = ({
  isOpen,
  onClose,
  onConfirmSos,
  currentLocation
}) => {
  const [countdown, setCountdown] = useState<number>(10)
  const [selectedType, setSelectedType] = useState<string>(emergencyTypes[0].id)
  const [isCounting, setIsCounting] = useState<boolean>(true)

  useEffect(() => {
    if (!isOpen) {
      setCountdown(10)
      setIsCounting(true)
      return
    }

    playEmergencyPulse()

    let timer: ReturnType<typeof setTimeout>
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => {
        playCountdownTick()
        setCountdown((c) => c - 1)
      }, 1000)
    } else if (isCounting && countdown === 0) {
      // 10s timer cleared: immediately dispatch and open ambulance tracking
      triggerEmergencyDispatch()
    }

    return () => clearTimeout(timer)
  }, [isOpen, isCounting, countdown])

  if (!isOpen) return null

  const handleCancelCountdown = () => {
    playClick()
    setIsCounting(false)
    onClose()
  }

  const triggerEmergencyDispatch = () => {
    const selected = emergencyTypes.find((t) => t.id === selectedType) || emergencyTypes[0]
    playEmergencyPulse()
    onConfirmSos(selected.label, selected.priority as 'Critical' | 'Severe' | 'Moderate')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-[96%] sm:w-full max-w-lg bg-[#0a1826] border border-rose-500/40 rounded-3xl p-5 sm:p-8 text-white shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Ambient red pulse glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/20 rounded-full blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Emergency SOS Protocol</h3>
              <p className="text-[11px] text-slate-400">Automated dispatch & priority alert trigger</p>
            </div>
          </div>
          <button
            onClick={handleCancelCountdown}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          
          {/* Countdown Banner (10s Accidental Tap Safety) */}
          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-rose-300 font-semibold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-rose-400" />
                  <span>Auto-Dispatching Ambulance in:</span>
                </div>
                <div className="text-3xl font-black text-rose-400 mt-1">
                  00:{countdown < 10 ? '0' : ''}{countdown}s
                </div>
                <div className="text-[10px] text-rose-300/80 mt-0.5">
                  Tap 'Cancel SOS' if triggered by mistake
                </div>
              </div>

              <button
                onClick={handleCancelCountdown}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all active:scale-95"
              >
                Cancel SOS
              </button>
            </div>

            {/* 10s Visual Progress Bar */}
            <div className="w-full h-2 rounded-full bg-rose-950 border border-rose-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-rose-400 transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(countdown / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Select Nature of Emergency */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Select Medical Emergency Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {emergencyTypes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    playClick()
                    setSelectedType(t.id)
                  }}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    selectedType === t.id
                      ? 'bg-rose-500/20 border-rose-500 text-white ring-1 ring-rose-500/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-white text-xs">{t.label}</div>
                  <div className="text-[10px] text-rose-300 mt-0.5">{t.priority}</div>
                </button>
              ))}
            </div>
          </div>

          {/* GPS Telemetry Bar */}
          <div className="p-3 rounded-xl bg-black/40 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="truncate">Transmitting Coordinates: <span className="text-white font-semibold">{currentLocation}</span></span>
          </div>

          {/* Trigger Immediately Button */}
          <button
            onClick={triggerEmergencyDispatch}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-rose-600/40 active:scale-95 transition-all"
          >
            Confirm & Open Live Ambulance Tracking Now
          </button>
        </div>

      </div>
    </div>
  )
}
