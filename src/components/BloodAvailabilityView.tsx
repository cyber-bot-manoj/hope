import React, { useState } from 'react'
import { Droplet, Phone, MapPin, Search, AlertCircle, CheckCircle2 } from 'lucide-react'
import { BloodStock } from '../types/hope'
import { bloodBanksData } from '../data/hopeData'
import { playClick } from '../utils/emergencyAudio'

export const BloodAvailabilityView: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('B+')
  const groups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <div className="flex items-center gap-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
          <Droplet className="w-4 h-4" />
          <span>Real-Time Regional Blood Bank Network</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Live Blood & Platelet Availability
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Direct stock telemetry from accredited blood centers across Lucknow.
        </p>
      </div>

      {/* Blood Group Selectors */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Select Required Blood Group:
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {groups.map((bg) => (
            <button
              key={bg}
              onClick={() => {
                playClick()
                setSelectedGroup(bg)
              }}
              className={`py-2.5 rounded-xl font-black text-sm border transition-all ${
                selectedGroup === bg
                  ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      {/* Blood Bank Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bloodBanksData.map((bb) => {
          const count = bb.units[selectedGroup as keyof typeof bb.units] || 0
          const isSurplus = count > 10

          return (
            <div
              key={bb.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{bb.bloodBankName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{bb.area} ({bb.distanceKm} km)</span>
                    </p>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      isSurplus ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isSurplus ? 'In Stock' : 'Critical'}
                  </span>
                </div>

                {/* Units Counter */}
                <div className="my-5 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-center">
                  <div className="text-3xl font-black text-rose-600">
                    {count} <span className="text-sm font-normal text-slate-600">Units</span>
                  </div>
                  <div className="text-[11px] font-bold text-rose-800 uppercase tracking-wider mt-1">
                    {selectedGroup} Whole Blood Available
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">24x7 Emergency Desk</span>
                <a
                  href={`tel:${bb.phone}`}
                  onClick={() => playClick()}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>Call Bank</span>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
