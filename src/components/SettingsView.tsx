import React, { useState } from 'react'
import { Settings, Volume2, Globe, Shield, Moon, Sun, Bell, RefreshCw } from 'lucide-react'
import { playEmergencyPulse, playClick } from '../utils/emergencyAudio'

export const SettingsView: React.FC = () => {
  const [lang, setLang] = useState<'hi' | 'en'>('hi')
  const [smsAlerts, setSmsAlerts] = useState(true)
  const [sirenVolume, setSirenVolume] = useState(80)

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs tracking-wider uppercase">
          <Settings className="w-4 h-4" />
          <span>Application Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Settings & Privacy Controls
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize telemetry, alerts, language, and emergency SOS protocol preferences.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        
        {/* Language Selection */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Primary Language</h4>
            <p className="text-xs text-slate-500">Choose between Hindi and English for emergency prompts</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { playClick(); setLang('hi'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                lang === 'hi' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-700'
              }`}
            >
              हिन्दी (Hindi)
            </button>
            <button
              onClick={() => { playClick(); setLang('en'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                lang === 'en' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-700'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Siren Sound Test */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Acoustic Siren Synthesizer</h4>
            <p className="text-xs text-slate-500">Test the emergency siren tone triggered during SOS countdown</p>
          </div>
          <button
            onClick={() => playEmergencyPulse()}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-rose-600" />
            <span>Test Audio Siren</span>
          </button>
        </div>

        {/* SMS Guardian Broadcast */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Automatic Guardian SMS Broadcast</h4>
            <p className="text-xs text-slate-500">Instantly send encrypted Google Map coordinates to trusted contacts</p>
          </div>
          <input
            type="checkbox"
            checked={smsAlerts}
            onChange={(e) => setSmsAlerts(e.target.checked)}
            className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
          />
        </div>

        {/* Reset State */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Reset Application State</h4>
            <p className="text-xs text-slate-500">Clear active dispatches and refresh Lucknow emergency network</p>
          </div>
          <button
            onClick={() => {
              playClick()
              window.location.reload()
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

      </div>
    </div>
  )
}
