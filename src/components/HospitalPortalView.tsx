import React from 'react'
import { Stethoscope, Activity, Bed, Users, AlertCircle, Phone } from 'lucide-react'
import { Hospital, EmergencyRequest } from '../types/hope'

interface HospitalPortalViewProps {
  hospitals: Hospital[]
  activeEmergencies: EmergencyRequest[]
}

export const HospitalPortalView: React.FC<HospitalPortalViewProps> = ({
  hospitals,
  activeEmergencies
}) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div>
        <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs tracking-wider uppercase">
          <Stethoscope className="w-4 h-4" />
          <span>Emergency Room Coordination Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Hospital ER Triage Terminal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time intake stream for Trauma Doctors, ER Nurses, and Bed Management Staff.
        </p>
      </div>

      {/* Top ER Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Incoming Ambulances</div>
          <div className="text-2xl font-black text-rose-600 mt-1">
            {activeEmergencies.length > 0 ? activeEmergencies.length : 1} Inbound
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Lucknow ICU Beds</div>
          <div className="text-2xl font-black text-teal-600 mt-1">75 Open</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Avg Triage Response</div>
          <div className="text-2xl font-black text-slate-800 mt-1">4.2 Mins</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Oxygen Grid Status</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">100% Stable</div>
        </div>
      </div>

      {/* Hospital Bed Status Live Grid */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4">
          Lucknow Network Real-Time Bed Allotment
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-bold">Hospital Name</th>
                <th className="pb-3 font-bold">Category</th>
                <th className="pb-3 font-bold">ICU Beds</th>
                <th className="pb-3 font-bold">Oxygen</th>
                <th className="pb-3 font-bold">Trauma Level</th>
                <th className="pb-3 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hospitals.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/80">
                  <td className="py-3 font-bold text-slate-900">{h.name}</td>
                  <td className="py-3 text-slate-500">{h.category}</td>
                  <td className="py-3 font-bold text-teal-700">{h.icuBedsAvailable} Available</td>
                  <td className="py-3 text-emerald-600 font-semibold">100% Liquid O2</td>
                  <td className="py-3 font-semibold text-slate-700">{h.traumaLevel}</td>
                  <td className="py-3 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {h.status} {h.availabilityScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
