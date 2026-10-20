import React, { useState } from 'react'
import { 
  Building2, 
  Search, 
  MapPin, 
  Phone, 
  Navigation, 
  ShieldCheck, 
  Activity, 
  Bed, 
  Wind,
  CheckCircle2,
  ChevronRight,
  Star,
  ExternalLink,
  HeartPulse,
  Droplet,
  Radio
} from 'lucide-react'
import { Hospital, EmergencyProfileData } from '../types/hope'
import { playClick } from '../utils/emergencyAudio'
import { HospitalErAlertModal } from './HospitalErAlertModal'

interface FindHospitalsViewProps {
  hospitals: Hospital[]
  patientProfile: EmergencyProfileData
  patientLocation: string
}

export const FindHospitalsView: React.FC<FindHospitalsViewProps> = ({
  hospitals,
  patientProfile,
  patientLocation
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedHospitalForAlert, setSelectedHospitalForAlert] = useState<Hospital | null>(null)

  const filterTags = [
    'All',
    'Level 1 Apex Trauma',
    'Cardiac & Cath Lab',
    'Quaternary Care',
    'Paediatrics & NICU',
    'Govt Super-Speciality'
  ]

  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch = 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === 'All') return matchesSearch
    if (activeFilter === 'Level 1 Apex Trauma') return matchesSearch && h.traumaLevel === 'Level 1'
    if (activeFilter === 'Cardiac & Cath Lab') return matchesSearch && (h.cathLab24x7 || h.speciality.toLowerCase().includes('cardiac'))
    if (activeFilter === 'Quaternary Care') return matchesSearch && (h.category.toLowerCase().includes('quaternary') || h.category.toLowerCase().includes('jci'))
    if (activeFilter === 'Paediatrics & NICU') return matchesSearch && h.speciality.toLowerCase().includes('paediatric')
    if (activeFilter === 'Govt Super-Speciality') return matchesSearch && (h.category.toLowerCase().includes('govt') || h.category.toLowerCase().includes('apex'))
    return matchesSearch
  })

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* View Header */}
      <div>
        <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs tracking-wider uppercase">
          <Building2 className="w-4 h-4" />
          <span>Lucknow Regional Emergency Network</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Top Verified Emergency Hospitals
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Pre-Arrival ER Triage, Real-Time ICU Bed Allocation & Direct Paramedic Navigation.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search premier hospitals (Medanta, SGPGI, Apollomedics, KGMU Trauma Center, RMLIMS)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                playClick()
                setActiveFilter(tag)
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === tag
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredHospitals.map((hosp) => (
          <div
            key={hosp.id}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Top: Badges & Title */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                      {hosp.category}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{hosp.emergencyRating}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5 group-hover:text-teal-700 transition-colors">
                    {hosp.name}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{hosp.address}</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      hosp.status === 'available'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {hosp.status} {hosp.availabilityScore}
                  </span>
                  <div className="text-[11px] text-teal-700 font-bold mt-1">
                    ~{hosp.etaMins} mins ({hosp.distanceKm} km)
                  </div>
                </div>
              </div>

              {/* Speciality text */}
              <p className="text-xs text-slate-600 font-medium my-2.5 line-clamp-2">
                {hosp.speciality}
              </p>

              {/* Critical Capability Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 my-3 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">ICU Beds</div>
                  <div className="text-xs sm:text-sm font-black text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                    <Bed className="w-3.5 h-3.5 text-teal-600" />
                    <span>{hosp.icuBedsAvailable} Open</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Ventilators</div>
                  <div className="text-xs sm:text-sm font-black text-teal-700 flex items-center justify-center gap-1 mt-0.5">
                    <Wind className="w-3.5 h-3.5 text-teal-600" />
                    <span>{hosp.ventilatorsAvailable || 10} Units</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Trauma Level</div>
                  <div className="text-xs sm:text-sm font-black text-rose-700 mt-0.5">
                    {hosp.traumaLevel}
                  </div>
                </div>
              </div>

              {/* Feature Tags */}
              {hosp.features && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {hosp.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/80"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions: Direct Dial + Alert ER & Navigate */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <a
                href={`tel:${hosp.phone}`}
                onClick={() => playClick()}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>Call {hosp.phone}</span>
              </a>

              <button
                onClick={() => {
                  playClick()
                  setSelectedHospitalForAlert(hosp)
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 text-white text-xs font-black shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all group/btn"
              >
                <Radio className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                <span>Alert ER & Navigate</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Trauma Pre-Arrival Handover Modal */}
      <HospitalErAlertModal
        hospital={selectedHospitalForAlert}
        patientProfile={patientProfile}
        patientLocation={patientLocation}
        isOpen={selectedHospitalForAlert !== null}
        onClose={() => setSelectedHospitalForAlert(null)}
      />
    </div>
  )
}
