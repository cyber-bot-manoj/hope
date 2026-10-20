import React from 'react'
import { History, ShieldAlert, CheckCircle2, MapPin, Clock } from 'lucide-react'
import { EmergencyRequest } from '../types/hope'

interface EmergencyHistoryViewProps {
  emergencies: EmergencyRequest[]
  onTriggerSos: () => void
}

export const EmergencyHistoryView: React.FC<EmergencyHistoryViewProps> = ({
  emergencies,
  onTriggerSos
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs tracking-wider uppercase">
          <History className="w-4 h-4" />
          <span>Incident Audit Trail</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Emergency Dispatch History
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Historical record of all SOS triggers, medical handovers, and hospital communications.
        </p>
      </div>

      {emergencies.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Incidents Recorded</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            You currently have no emergency dispatches on file.
          </p>
          <button
            onClick={() => onTriggerSos()}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors"
          >
            Test SOS Protocol
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {emergencies.map((em) => (
            <div
              key={em.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-900 text-sm">{em.emergencyType}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                    {em.severity}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                    {em.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {em.timestamp}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {em.location}
                  </span>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="text-slate-400 block text-[10px] uppercase">Unit Assigned:</span>
                <span className="font-bold text-slate-800">{em.ambulanceAssigned || 'UP-32-EG-0108 (ALS)'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
