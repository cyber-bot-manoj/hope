import React, { useState } from 'react'
import { Users, Phone, Plus, Trash2, Send, CheckCircle2, ShieldCheck } from 'lucide-react'
import { TrustedContact } from '../types/hope'
import { playClick } from '../utils/emergencyAudio'

interface TrustedContactsViewProps {
  contacts: TrustedContact[]
  onAddContact: (contact: TrustedContact) => void
  onDeleteContact: (id: string) => void
  patientLocation: string
}

export const TrustedContactsView: React.FC<TrustedContactsViewProps> = ({
  contacts,
  onAddContact,
  onDeleteContact,
  patientLocation
}) => {
  const [name, setName] = useState('')
  const [relationship, setRelationship] = useState('Parent')
  const [phone, setPhone] = useState('')
  const [simulatedSms, setSimulatedSms] = useState<string | null>(null)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return
    playClick()
    onAddContact({
      id: `c-${Date.now()}`,
      name,
      relationship,
      phone,
      isPrimary: contacts.length === 0,
      notifyOnSos: true
    })
    setName('')
    setPhone('')
  }

  const handleTestSms = (contact: TrustedContact) => {
    playClick()
    const sms = `[HOPE EMERGENCY ALERT]: ${contact.name}, Aarav has triggered an Emergency SOS near ${patientLocation}. Paramedics have been dispatched. Live GPS Coordinates: https://maps.google.com/?q=26.8505,80.9462`
    setSimulatedSms(sms)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs tracking-wider uppercase">
          <Users className="w-4 h-4" />
          <span>Priority Emergency Guardians</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Trusted Emergency Contacts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          These contacts are instantly notified via high-priority SMS and automated call whenever you press SOS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Contacts List (7 cols) */}
        <div className="md:col-span-7 space-y-3">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold text-sm">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>
                    {c.isPrimary && (
                      <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{c.relationship} · {c.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTestSms(c)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                  title="Test SMS Alert"
                >
                  <Send className="w-3 h-3 text-teal-600" />
                  <span className="hidden sm:inline">Test Alert</span>
                </button>

                <button
                  onClick={() => {
                    playClick()
                    onDeleteContact(c.id)
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Test SMS popover */}
          {simulatedSms && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-teal-400 font-bold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simulated SMS Dispatched</span>
                </span>
                <button onClick={() => setSimulatedSms(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <p className="font-mono bg-black/40 p-2.5 rounded-lg text-slate-300 text-[11px] leading-relaxed">
                {simulatedSms}
              </p>
            </div>
          )}
        </div>

        {/* Add Contact Form (5 cols) */}
        <div className="md:col-span-5">
          <form onSubmit={handleAdd} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Add Trusted Guardian</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Verma (Physician)"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Relationship</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
              >
                <option value="Parent">Parent</option>
                <option value="Spouse">Spouse</option>
                <option value="Sibling">Sibling</option>
                <option value="Family Doctor">Family Doctor</option>
                <option value="Friend">Friend</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98390 XXXXX"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Save Contact</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
