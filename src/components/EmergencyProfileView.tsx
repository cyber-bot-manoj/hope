import React, { useState } from 'react'
import { User, ShieldCheck, Heart, AlertCircle, Save, Check } from 'lucide-react'
import { EmergencyProfileData } from '../types/hope'
import { playClick } from '../utils/emergencyAudio'

interface EmergencyProfileViewProps {
  profile: EmergencyProfileData
  onSaveProfile: (updated: EmergencyProfileData) => void
}

export const EmergencyProfileView: React.FC<EmergencyProfileViewProps> = ({
  profile,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<EmergencyProfileData>(profile)
  const [saved, setSaved] = useState(false)

  const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    playClick()
    onSaveProfile(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs tracking-wider uppercase">
          <User className="w-4 h-4" />
          <span>Medical Identity & Emergency Data</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Emergency Health Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          This critical health data is shared instantly with first responders and ER doctors during SOS emergencies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        
        {/* Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Age</label>
            <input
              type="number"
              required
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Blood Group Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
            Blood Group (Critical for Transfusion)
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {bloodGroups.map((bg) => (
              <button
                key={bg}
                type="button"
                onClick={() => {
                  playClick()
                  setFormData({ ...formData, bloodGroup: bg })
                }}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  formData.bloodGroup === bg
                    ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* Medical Alerts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Known Drug & Food Allergies
            </label>
            <textarea
              rows={2}
              value={formData.allergies}
              onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              placeholder="e.g. Penicillin, Peanuts, Sulfa drugs"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Chronic Conditions & Implants
            </label>
            <textarea
              rows={2}
              value={formData.chronicConditions}
              onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
              placeholder="e.g. Diabetes Type 2, Hypertension, Pacemaker"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>
        </div>

        {/* Insurance & Organ Donor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Health Insurance Policy</label>
            <input
              type="text"
              value={formData.policyNumber}
              onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
              placeholder="Policy ID / TPA Number"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="donor"
              checked={formData.isOrganDonor}
              onChange={(e) => setFormData({ ...formData, isOrganDonor: e.target.checked })}
              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
            />
            <label htmlFor="donor" className="text-xs font-bold text-slate-800">
              Registered Organ Donor (NOTTO / India)
            </label>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end border-t border-slate-100">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Profile Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Emergency Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
