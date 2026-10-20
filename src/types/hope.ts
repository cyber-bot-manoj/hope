export type AppView = 
  | 'home'
  | 'sos'
  | 'hospitals'
  | 'ambulance'
  | 'profile'
  | 'contacts'
  | 'documents'
  | 'blood'
  | 'history'
  | 'hospital-portal'
  | 'settings'

export interface Hospital {
  id: string
  name: string
  category: string
  distanceKm: number
  etaMins: number
  speciality: string
  address: string
  phone: string
  availabilityScore: number
  status: 'available' | 'limited' | 'full'
  icuBedsAvailable: number
  oxygenAvailable: boolean
  traumaLevel: 'Level 1' | 'Level 2' | 'General'
  emergencyRating: number
  lat?: number
  lng?: number
  ventilatorsAvailable?: number
  bloodBankAttached?: boolean
  cathLab24x7?: boolean
  features?: string[]
}

export interface Ambulance {
  id: string
  vehicleNumber: string
  driverName: string
  driverPhone: string
  type: 'Advanced Life Support (ALS)' | 'Basic Life Support (BLS)' | 'Cardiac Care'
  currentStatus: 'idle' | 'dispatched' | 'en_route' | 'arrived'
  etaMins: number
  currentLat: number
  currentLng: number
  hospitalAssigned: string
}

export interface EmergencyRequest {
  id: string
  timestamp: string
  emergencyType: string
  severity: 'Critical' | 'Severe' | 'Moderate'
  location: string
  patientName: string
  ambulanceAssigned?: string
  hospitalAssigned?: string
  status: 'Active' | 'Dispatched' | 'En Route' | 'Resolved'
  etaMinutes?: number
}

export interface TrustedContact {
  id: string
  name: string
  relationship: string
  phone: string
  isPrimary: boolean
  notifyOnSos: boolean
}

export interface EmergencyProfileData {
  fullName: string
  age: number
  gender: string
  bloodGroup: string
  allergies: string
  chronicConditions: string
  medications: string
  primaryContactName: string
  primaryContactPhone: string
  isOrganDonor: boolean
  insuranceProvider: string
  policyNumber: string
}

export interface BloodStock {
  id: string
  bloodBankName: string
  area: string
  phone: string
  distanceKm: number
  units: {
    'A+': number
    'A-': number
    'B+': number
    'B-': number
    'O+': number
    'O-': number
    'AB+': number
    'AB-': number
  }
}
