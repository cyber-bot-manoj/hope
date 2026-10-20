import React from 'react'
import { FileText, QrCode, Download, Share2, ShieldCheck, HeartPulse, Plus } from 'lucide-react'
import { EmergencyProfileData } from '../types/hope'
import { playClick } from '../utils/emergencyAudio'

interface DocumentsQrViewProps {
  profile: EmergencyProfileData
}

export const DocumentsQrView: React.FC<DocumentsQrViewProps> = ({ profile }) => {
  const handleDownloadQr = () => {
    playClick()
    alert('Emergency Medical QR Pass saved to downloads! Keep this on your lock screen for instant paramedic scanning.')
  }

  const sampleDocs = [
    { name: 'Ayushman Bharat Golden Card (PM-JAY)', date: 'Verified 2026', size: '1.2 MB' },
    { name: 'Latest Baseline 12-Lead ECG Report', date: 'Aug 2026', size: '2.4 MB' },
    { name: 'Asthma Prescription & SOS Inhaler Protocol', date: 'Jul 2026', size: '850 KB' },
  ]

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs tracking-wider uppercase">
          <FileText className="w-4 h-4" />
          <span>Paramedic Fast-Scan Passport</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Emergency QR & Medical Vault
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Lock-screen ready QR code accessible without device PIN in high-trauma emergencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left: QR Code Card (5 cols) */}
        <div className="md:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-3">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>

          <h3 className="text-sm font-bold text-slate-900">Universal Emergency QR</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 mb-4">Scan with any smartphone camera</p>

          {/* QR Code SVG */}
          <div className="w-44 h-44 bg-white p-3 rounded-2xl border-2 border-slate-800 shadow-md flex items-center justify-center mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" fill="#ffffff"/>
              <path d="M10 10h30v30h-30z M15 15h20v20h-20z M20 20h10v10h-10z" fill="#0f172a"/>
              <path d="M60 10h30v30h-30z M65 15h20v20h-20z M70 20h10v10h-10z" fill="#0f172a"/>
              <path d="M10 60h30v30h-30z M15 65h20v20h-20z M20 70h10v10h-10z" fill="#0f172a"/>
              <rect x="45" y="10" width="8" height="20" fill="#0f172a"/>
              <rect x="50" y="35" width="15" height="10" fill="#e11d48"/>
              <rect x="10" y="45" width="20" height="8" fill="#0f172a"/>
              <rect x="45" y="45" width="10" height="10" fill="#0d9488"/>
              <rect x="60" y="55" width="30" height="8" fill="#0f172a"/>
              <rect x="45" y="65" width="15" height="25" fill="#0f172a"/>
              <rect x="70" y="70" width="20" height="20" fill="#0f172a"/>
            </svg>
          </div>

          <div className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1 text-left mb-4">
            <div><span className="text-slate-400">Patient:</span> <strong>{profile.fullName}</strong></div>
            <div><span className="text-slate-400">Blood Group:</span> <strong className="text-rose-600 font-bold">{profile.bloodGroup}</strong></div>
            <div><span className="text-slate-400">Emergency Call:</span> <strong>{profile.primaryContactPhone}</strong></div>
          </div>

          <button
            onClick={handleDownloadQr}
            className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Lock-Screen Pass</span>
          </button>
        </div>

        {/* Right: Medical Documents Vault (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Stored Medical Records</h3>
              <button
                onClick={() => alert('Document upload modal opened. Choose PDF/Image of prescription or lab report.')}
                className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
            </div>

            <div className="space-y-3">
              {sampleDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-teal-700 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                      <p className="text-[11px] text-slate-500">{doc.date} · {doc.size}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => playClick()}
                    className="p-2 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
