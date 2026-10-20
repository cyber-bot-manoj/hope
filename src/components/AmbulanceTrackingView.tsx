import React, { useState, useEffect } from 'react'
import { 
  Truck, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Navigation,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Ambulance } from '../types/hope'
import { playClick, playEmergencyPulse } from '../utils/emergencyAudio'

interface AmbulanceTrackingViewProps {
  ambulance: Ambulance
  patientLocation: string
}

export const AmbulanceTrackingView: React.FC<AmbulanceTrackingViewProps> = ({
  ambulance,
  patientLocation
}) => {
  const [eta, setEta] = useState(ambulance.etaMins)
  const [statusStep, setStatusStep] = useState<number>(2) // 1: Dispatched, 2: En Route, 3: Arrived
  const [ambulancePos, setAmbulancePos] = useState({ x: 25, y: 35 })

  // Live simulation of ambulance moving along road map
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulancePos((prev) => {
        const nextX = prev.x < 70 ? prev.x + 1.2 : prev.x
        const nextY = prev.y < 65 ? prev.y + 0.9 : prev.y
        return { x: nextX, y: nextY }
      })
    }, 1500)

    const etaInterval = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1))
    }, 12000)

    return () => {
      clearInterval(interval)
      clearInterval(etaInterval)
    }
  }, [])

  const steps = [
    { title: 'SOS Received & Triaged', time: '11:21 AM', done: true },
    { title: 'Ambulance Dispatched (ALS)', time: '11:23 AM', done: true },
    { title: 'En Route to Hazratganj', time: 'Live', done: true, active: true },
    { title: 'Paramedic On-Scene Handover', time: `~${eta} mins`, done: false }
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs tracking-wider uppercase">
          <Truck className="w-4 h-4" />
          <span>Live GPS Telemetry & ALS Dispatch</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Live Ambulance Dispatch Tracking
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time vehicle telemetry connecting to Uttar Pradesh 108 Emergency Network.
        </p>
      </div>

      {/* Main Grid: Map (Left) + Driver / Status (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Interactive Live Route Map (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Live GPS Satellite Feed
              </span>
            </div>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              ETA: ~{eta} Minutes
            </span>
          </div>

          {/* Interactive Map Box */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#0b1928] overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center select-none">
            {/* Map Roads Vector */}
            <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-dark" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dark)" />
              {/* Main Arterial Roadways of Lucknow */}
              <path d="M 50 80 Q 200 180 400 120 T 700 280" fill="none" stroke="#38bdf8" strokeWidth="6" strokeDasharray="6,6" className="animate-pulse" />
              <path d="M 120 20 Q 280 200 350 350" fill="none" stroke="#475569" strokeWidth="5" />
              <path d="M 400 120 L 550 40" fill="none" stroke="#475569" strokeWidth="4" />
            </svg>

            {/* Destination Patient Pin (Hazratganj) */}
            <div className="absolute top-[65%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-8 h-8 rounded-full bg-rose-500/30 animate-ping absolute" />
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white text-xs z-10">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="mt-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur text-[10px] text-white font-bold whitespace-nowrap border border-white/20">
                Patient: {patientLocation}
              </span>
            </div>

            {/* Dynamic Moving Ambulance Pin */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 flex flex-col items-center"
              style={{ top: `${ambulancePos.y}%`, left: `${ambulancePos.x}%` }}
            >
              <div className="w-9 h-9 rounded-2xl bg-teal-500 text-black flex items-center justify-center shadow-xl border-2 border-white text-xs font-black z-20">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="mt-1 px-2 py-0.5 rounded bg-teal-950/90 text-[10px] text-teal-300 font-bold whitespace-nowrap border border-teal-500/40">
                {ambulance.vehicleNumber} (Moving)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Dispatched From: <strong className="text-slate-800">{ambulance.hospitalAssigned}</strong></span>
            <span>Speed: <strong className="text-slate-800">54 km/h</strong></span>
          </div>
        </div>

        {/* Right: Driver Card + Live Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Driver Info Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
              {ambulance.type}
            </span>

            <div className="flex items-center justify-between mt-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border-2 border-teal-500 flex items-center justify-center font-bold text-slate-700">
                  RY
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {ambulance.driverName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Emergency Paramedic Pilot
                  </p>
                </div>
              </div>

              <a
                href={`tel:${ambulance.driverPhone}`}
                onClick={() => playClick()}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Driver</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Vehicle Reg:</span>
                <span className="font-bold text-slate-800">{ambulance.vehicleNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Equipment:</span>
                <span className="font-bold text-slate-800">Ventilator + Defibrillator</span>
              </div>
            </div>
          </div>

          {/* Timeline Pipeline */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
              Live Dispatch Milestones
            </h4>

            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0 ${
                      step.done
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${step.active ? 'text-teal-700' : 'text-slate-800'}`}>
                        {step.title}
                      </span>
                      <span className="text-[11px] text-slate-500">{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
