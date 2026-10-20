import React, { useState } from 'react'
import { X, MapPin, Navigation, Check } from 'lucide-react'
import { playClick } from '../utils/emergencyAudio'

interface LocationEditModalProps {
  isOpen: boolean
  onClose: () => void
  currentLocation: { 
    address: string
    coords: string
    lat: number
    lng: number
    isManual: boolean
    isDetecting?: boolean 
  }
  onSaveLocation: (loc: { address: string; coords: string; lat: number; lng: number; isManual: boolean }) => void
  onDetectLocation: () => void
}

export const LocationEditModal: React.FC<LocationEditModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSaveLocation,
  onDetectLocation
}) => {
  const [address, setAddress] = useState(currentLocation.address)
  const [coords, setCoords] = useState(currentLocation.coords)
  const [lat, setLat] = useState(currentLocation.lat)
  const [lng, setLng] = useState(currentLocation.lng)

  if (!isOpen) return null

  const presets = [
    { address: 'Hazratganj, Lucknow', coords: '26.8505, 80.9462', lat: 26.8505, lng: 80.9462 },
    { address: 'Gomti Nagar, Lucknow', coords: '26.8540, 80.9984', lat: 26.8540, lng: 80.9984 },
    { address: 'Alambagh, Lucknow', coords: '26.8124, 80.8988', lat: 26.8124, lng: 80.8988 },
    { address: 'Indira Nagar, Lucknow', coords: '26.8833, 80.9856', lat: 26.8833, lng: 80.9856 },
    { address: 'Chowk, Old Lucknow', coords: '26.8680, 80.9064', lat: 26.8680, lng: 80.9064 }
  ]

  const handleApplyPreset = (p: typeof presets[0]) => {
    playClick()
    setAddress(p.address)
    setCoords(p.coords)
    setLat(p.lat)
    setLng(p.lng)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    playClick()
    onSaveLocation({ address, coords, lat, lng, isManual: true })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">Set Current Emergency Location</h3>
          </div>
          <button onClick={() => onClose()} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live GPS Auto Detect Button */}
        <div className="mt-4 p-3 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
              <span>Auto-Detect Browser GPS</span>
            </div>
            <p className="text-[11px] text-teal-700 mt-0.5">Use your device's live satellite positioning</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onDetectLocation()
              onClose()
            }}
            className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
          >
            <Navigation className="w-3 h-3" />
            <span>Locate Me</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Area / Landmark</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">GPS Coordinates (Lat, Lng)</label>
            <input
              type="text"
              required
              value={coords}
              onChange={(e) => {
                setCoords(e.target.value)
                const parts = e.target.value.split(',').map(s => parseFloat(s.trim()))
                if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                  setLat(parts[0])
                  setLng(parts[1])
                }
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-mono"
            />
          </div>

          <div>
            <span className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Quick Presets (Lucknow)</span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.address}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  {p.address.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
            >
              Update Location
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
