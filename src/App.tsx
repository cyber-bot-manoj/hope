import React, { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { HomeDashboard } from './components/HomeDashboard'
import { SosModal } from './components/SosModal'
import { FindHospitalsView } from './components/FindHospitalsView'
import { AmbulanceTrackingView } from './components/AmbulanceTrackingView'
import { EmergencyProfileView } from './components/EmergencyProfileView'
import { TrustedContactsView } from './components/TrustedContactsView'
import { DocumentsQrView } from './components/DocumentsQrView'
import { BloodAvailabilityView } from './components/BloodAvailabilityView'
import { EmergencyHistoryView } from './components/EmergencyHistoryView'
import { HospitalPortalView } from './components/HospitalPortalView'
import { SettingsView } from './components/SettingsView'
import { LocationEditModal } from './components/LocationEditModal'
import { MobileHeader } from './components/MobileHeader'
import { MobileBottomNav } from './components/MobileBottomNav'
import { AuthView } from './components/AuthView'
import { 
  initialHospitals, 
  initialAmbulance, 
  initialProfileData, 
  initialContacts 
} from './data/hopeData'
import { 
  AppView, 
  Hospital, 
  EmergencyRequest, 
  TrustedContact, 
  EmergencyProfileData, 
  Ambulance 
} from './types/hope'
import { playClick, playEmergencyPulse } from './utils/emergencyAudio'

export const App: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('hope_auth_logged_in') === 'true'
  })
  const [currentUser, setCurrentUser] = useState<{
    name: string
    phone?: string
    email: string
    bloodGroup?: string
  } | null>(() => {
    const saved = localStorage.getItem('hope_user')
    return saved ? JSON.parse(saved) : null
  })

  const [currentView, setCurrentView] = useState<AppView>('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals)
  const [ambulance, setAmbulance] = useState<Ambulance>(initialAmbulance)
  const [profile, setProfile] = useState<EmergencyProfileData>(() => {
    const savedUser = localStorage.getItem('hope_user')
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser)
        return {
          ...initialProfileData,
          fullName: parsed.name || initialProfileData.fullName,
          bloodGroup: parsed.bloodGroup || initialProfileData.bloodGroup,
          primaryContactPhone: parsed.phone || initialProfileData.primaryContactPhone
        }
      } catch {
        return initialProfileData
      }
    }
    return initialProfileData
  })

  const handleLoginSuccess = (user: { name: string; phone?: string; email: string; bloodGroup?: string }) => {
    localStorage.setItem('hope_auth_logged_in', 'true')
    localStorage.setItem('hope_user', JSON.stringify(user))
    setIsAuthenticated(true)
    setCurrentUser(user)
    if (user.name) {
      setProfile((prev) => ({
        ...prev,
        fullName: user.name,
        bloodGroup: user.bloodGroup || prev.bloodGroup,
        primaryContactPhone: user.phone || prev.primaryContactPhone
      }))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('hope_auth_logged_in')
    localStorage.removeItem('hope_user')
    setIsAuthenticated(false)
    setCurrentUser(null)
    setCurrentView('home')
  }
  const [contacts, setContacts] = useState<TrustedContact[]>(initialContacts)
  const [activeEmergencies, setActiveEmergencies] = useState<EmergencyRequest[]>([])
  const [currentLocation, setCurrentLocation] = useState({
    address: 'Hazratganj, Lucknow',
    coords: '26.8505, 80.9462',
    lat: 26.8505,
    lng: 80.9462,
    isManual: true,
    isDetecting: false
  })

  // Live GPS geolocation detection from browser
  const detectLiveLocation = () => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.')
      return
    }

    setCurrentLocation((prev) => ({ ...prev, isDetecting: true }))

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        let resolvedAddress = `Live Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`

        try {
          // OpenStreetMap Reverse Geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          )
          if (response.ok) {
            const data = await response.json()
            const parts = [
              data.address?.suburb || data.address?.neighbourhood || data.address?.road,
              data.address?.city || data.address?.town || data.address?.state_district,
              data.address?.state
            ].filter(Boolean)
            if (parts.length > 0) {
              resolvedAddress = parts.join(', ')
            }
          }
        } catch {
          // fallback to coordinates
        }

        setCurrentLocation({
          address: resolvedAddress,
          coords: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          lat,
          lng,
          isManual: false,
          isDetecting: false
        })
      },
      (err) => {
        console.warn('Geolocation access status:', err.message)
        setCurrentLocation((prev) => ({ ...prev, isDetecting: false }))
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }

  // Attempt auto-detect on initial load
  React.useEffect(() => {
    detectLiveLocation()
  }, [])

  const [isSosModalOpen, setIsSosModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  // Preparedness checklist
  const [preparednessItems, setPreparednessItems] = useState([
    { id: 'p1', label: 'Complete your emergency profile', completed: false },
    { id: 'p2', label: 'Add at least one trusted contact', completed: false },
    { id: 'p3', label: 'Add blood group (optional)', completed: false },
    { id: 'p4', label: 'Store an important document', completed: false }
  ])

  const handleTogglePreparedness = (id: string) => {
    setPreparednessItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        }
        return item
      })
    )
  }

  // Trigger SOS flow
  const handleOpenSos = () => {
    setIsSosModalOpen(true)
  }

  const handleConfirmSos = (emergencyType: string, severity: 'Critical' | 'Severe' | 'Moderate') => {
    const newRequest: EmergencyRequest = {
      id: `em-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      emergencyType,
      severity,
      location: currentLocation.address,
      patientName: profile.fullName,
      ambulanceAssigned: ambulance.vehicleNumber,
      hospitalAssigned: hospitals[0].name,
      status: 'Active',
      etaMinutes: ambulance.etaMins
    }

    setActiveEmergencies([newRequest, ...activeEmergencies])
    setAmbulance((prev) => ({
      ...prev,
      currentStatus: 'en_route',
      etaMins: 8
    }))

    // Switch to ambulance tracking view
    setCurrentView('ambulance')
  }

  const handleSelectHospital = (hosp: Hospital) => {
    alert(`Alert sent to ${hosp.name} Emergency Desk! ER triage bed reserved for patient arrival.`)
  }

  // FIRST SCREEN: If user is not logged in, show the Login / Sign Up Page first!
  if (!isAuthenticated) {
    return <AuthView onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col md:flex-row font-sans selection:bg-teal-500/20 selection:text-teal-900 overflow-x-hidden">
      
      {/* Mobile Top Header (Phones < 768px) */}
      <MobileHeader
        currentLocation={currentLocation}
        onOpenEditLocation={() => setIsLocationModalOpen(true)}
        onTriggerSos={handleOpenSos}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Sticky Left Sidebar Navigation (Desktop) + Slide-out Drawer (Mobile) */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onTriggerSos={handleOpenSos}
        activeEmergencyCount={activeEmergencies.length}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto px-3.5 py-4 sm:p-6 lg:p-8 min-h-screen pt-16 md:pt-6 pb-24 md:pb-8 w-full max-w-full overflow-x-hidden">
        {currentView === 'home' && (
          <HomeDashboard
            hospitals={hospitals}
            currentLocation={currentLocation}
            onOpenEditLocation={() => setIsLocationModalOpen(true)}
            onDetectLocation={detectLiveLocation}
            onTriggerSos={handleOpenSos}
            onNavigateView={setCurrentView}
            activeEmergencies={activeEmergencies}
            trustedContacts={contacts}
            preparednessItems={preparednessItems}
            onTogglePreparedness={handleTogglePreparedness}
          />
        )}

        {currentView === 'hospitals' && (
          <FindHospitalsView
            hospitals={hospitals}
            patientProfile={profile}
            patientLocation={currentLocation.address}
          />
        )}

        {currentView === 'ambulance' && (
          <AmbulanceTrackingView
            ambulance={ambulance}
            patientLocation={currentLocation.address}
          />
        )}

        {currentView === 'profile' && (
          <EmergencyProfileView
            profile={profile}
            onSaveProfile={(updated) => {
              setProfile(updated)
              setPreparednessItems((prev) =>
                prev.map((i) => (i.id === 'p1' || i.id === 'p3' ? { ...i, completed: true } : i))
              )
            }}
          />
        )}

        {currentView === 'contacts' && (
          <TrustedContactsView
            contacts={contacts}
            patientLocation={currentLocation.address}
            onAddContact={(c) => {
              setContacts([...contacts, c])
              setPreparednessItems((prev) =>
                prev.map((i) => (i.id === 'p2' ? { ...i, completed: true } : i))
              )
            }}
            onDeleteContact={(id) => setContacts(contacts.filter((c) => c.id !== id))}
          />
        )}

        {currentView === 'documents' && (
          <DocumentsQrView profile={profile} />
        )}

        {currentView === 'blood' && (
          <BloodAvailabilityView />
        )}

        {currentView === 'history' && (
          <EmergencyHistoryView
            emergencies={activeEmergencies}
            onTriggerSos={handleOpenSos}
          />
        )}

        {currentView === 'hospital-portal' && (
          <HospitalPortalView
            hospitals={hospitals}
            activeEmergencies={activeEmergencies}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView onLogout={handleLogout} />
        )}
      </main>

      {/* SOS Guided Flow Modal */}
      <SosModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
        onConfirmSos={handleConfirmSos}
        currentLocation={currentLocation.address}
      />

      {/* Edit Current Location Modal */}
      <LocationEditModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSaveLocation={(loc) => setCurrentLocation({ ...loc, isDetecting: false })}
        onDetectLocation={detectLiveLocation}
      />

      {/* Mobile Bottom Navigation Bar (Phones < 768px) */}
      <MobileBottomNav
        currentView={currentView}
        setCurrentView={setCurrentView}
        onTriggerSos={handleOpenSos}
        activeEmergencyCount={activeEmergencies.length}
        onOpenMore={() => setIsMobileMenuOpen(true)}
      />
    </div>
  )
}

export default App
