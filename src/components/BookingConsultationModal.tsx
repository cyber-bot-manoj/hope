import React, { useState } from 'react'
import { 
  X, 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Building,
  Mail,
  User
} from 'lucide-react'
import { ServiceItem } from '../types'
import { servicesData } from '../data/mockData'
import { playTactileClick, playSuccessChime } from '../utils/sound'
import { triggerConfetti } from '../utils/confetti'

interface BookingConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  selectedService?: ServiceItem | null
}

export const BookingConsultationModal: React.FC<BookingConsultationModalProps> = ({
  isOpen,
  onClose,
  selectedService
}) => {
  const [serviceId, setServiceId] = useState<string>(
    selectedService ? selectedService.id : servicesData[0].id
  )
  const [selectedDay, setSelectedDay] = useState<string>('Tomorrow')
  const [selectedTime, setSelectedTime] = useState<string>('02:00 PM EST')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    notes: ''
  })
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const days = [
    { label: 'Tomorrow', date: 'Wed, Oct 22' },
    { label: 'Thu', date: 'Oct 23' },
    { label: 'Fri', date: 'Oct 24' },
    { label: 'Mon', date: 'Oct 27' },
    { label: 'Tue', date: 'Oct 28' },
  ]

  const times = [
    '09:30 AM EST',
    '11:00 AM EST',
    '02:00 PM EST',
    '04:30 PM EST',
    '06:00 PM EST'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email) return

    playSuccessChime()
    triggerConfetti()
    setIsSuccess(true)
  }

  const handleResetAndClose = () => {
    setIsSuccess(false)
    setFormData({ fullName: '', email: '', company: '', notes: '' })
    onClose()
  }

  const activeService = servicesData.find((s) => s.id === serviceId) || servicesData[0]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f131d] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif">Executive Advisory Consultation</h3>
              <p className="text-[11px] text-slate-400">Strictly confidential private partner briefing (30 Min)</p>
            </div>
          </div>
          <button
            onClick={() => { playTactileClick(); onClose(); }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            
            {/* Service Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Select Practice / Mandate
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {servicesData.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      playTactileClick()
                      setServiceId(s.id)
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      serviceId === s.id
                        ? 'bg-amber-400/20 border-amber-400/50 text-white shadow-sm ring-1 ring-amber-400/30'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold text-white">{s.title}</div>
                    <div className="text-[10px] text-amber-300 mt-0.5">{s.priceStarting} • {s.timeline}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Preferred Date
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {days.map((d) => (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => {
                        playTactileClick()
                        setSelectedDay(d.label)
                      }}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        selectedDay === d.label
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-bold">{d.label}</div>
                      <div className="text-[9px] opacity-75">{d.date}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Session Slot
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {times.slice(0, 4).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        playTactileClick()
                        setSelectedTime(t)
                      }}
                      className={`py-2 px-1 text-center rounded-xl text-[11px] font-semibold border transition-all ${
                        selectedTime === t
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Cynthia Sterling"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Executive Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@organization.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                Organization / Strategic Objectives
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Series B Prep, Keynote Showreel, Forbes Authority Positioning"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Footer submit */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NDA & Discretion Protected</span>
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-black text-xs font-extrabold shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>Confirm Advisory Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="mt-8 text-center py-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-bold font-serif text-white mb-2">
              Advisory Briefing Confirmed
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Partner invitation and private Google Meet link dispatched to <span className="text-amber-300 font-semibold">{formData.email}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto text-left text-xs text-slate-300 my-6 space-y-1.5">
              <div><span className="text-slate-400">Mandate:</span> <span className="font-semibold text-white">{activeService.title}</span></div>
              <div><span className="text-slate-400">Time:</span> <span className="font-semibold text-amber-300">{selectedDay} @ {selectedTime}</span></div>
              <div><span className="text-slate-400">Host:</span> <span className="font-semibold text-white">Senior Managing Partner</span></div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs active:scale-95 transition-all"
            >
              Done & Return to Studio
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
