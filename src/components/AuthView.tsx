import React, { useState } from 'react'
import { 
  HeartPulse, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react'
import { playClick, playEmergencyPulse } from '../utils/emergencyAudio'

interface AuthViewProps {
  onLoginSuccess: (user: { name: string; phone?: string; email: string; bloodGroup?: string }) => void
}

interface StoredUser {
  name: string
  phone: string
  email: string
  password: string
  bloodGroup: string
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Sign In State
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  // Sign Up State
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [bloodGroup, setBloodGroup] = useState('O+')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  // Helper to get registered users from localStorage
  const getRegisteredUsers = (): StoredUser[] => {
    try {
      const stored = localStorage.getItem('hope_registered_users_db')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // Handle Sign In submission
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    const cleanId = identifier.trim()
    if (!cleanId) {
      setError('Please enter your registered mobile number or email.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)
    playClick()

    setTimeout(() => {
      setLoading(false)
      const users = getRegisteredUsers()

      // Check if matches a registered user
      const matched = users.find(
        (u) =>
          (u.phone.replace(/\D/g, '') === cleanId.replace(/\D/g, '') ||
           u.email.toLowerCase() === cleanId.toLowerCase() ||
           u.phone === cleanId) &&
          u.password === password
      )

      if (matched) {
        playEmergencyPulse()
        onLoginSuccess({
          name: matched.name,
          email: matched.email,
          phone: matched.phone,
          bloodGroup: matched.bloodGroup
        })
        return
      }

      // Default demo fallback account (9876543210 / password123)
      if (
        (cleanId === '9876543210' || cleanId.toLowerCase() === 'aarav@hope.in') &&
        password === 'password123'
      ) {
        playEmergencyPulse()
        onLoginSuccess({
          name: 'Aarav Sharma',
          email: 'aarav@hope.in',
          phone: '+91 98765 43210',
          bloodGroup: 'O+'
        })
        return
      }

      setError('Incorrect mobile number/email or password. Please check your credentials or create a new account.')
    }, 600)
  }

  // Handle Sign Up submission -> switches to Sign In with credentials!
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!fullName.trim()) {
      setError('Please enter your full legal name for emergency medical identification.')
      return
    }
    if (!phone.trim()) {
      setError('Please enter your 10-digit mobile number.')
      return
    }
    if (!signUpPassword || signUpPassword.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }
    if (!agreeTerms) {
      setError('Please agree to emergency response telemetry terms.')
      return
    }

    setLoading(true)
    playClick()

    setTimeout(() => {
      setLoading(false)
      const cleanPhone = phone.trim()
      const cleanName = fullName.trim()
      const cleanEmail = email.trim() || `${cleanPhone}@hope.in`

      const newUser: StoredUser = {
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        password: signUpPassword,
        bloodGroup
      }

      // Save to localStorage users db
      const existingUsers = getRegisteredUsers()
      // Filter out duplicate if same phone exists
      const updated = [newUser, ...existingUsers.filter((u) => u.phone !== cleanPhone && u.email !== cleanEmail)]
      localStorage.setItem('hope_registered_users_db', JSON.stringify(updated))

      playEmergencyPulse()

      // Pre-fill Sign In fields with newly registered credentials
      setIdentifier(cleanPhone)
      setPassword('')
      setSuccessMessage(`Account created successfully for ${cleanName}! Please enter your password to sign in.`)

      // Switch to Sign In tab!
      setMode('signin')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#07131e] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      
      {/* Dynamic Ambient Glow Behind Card */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Glassmorphic Auth Box */}
      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 mb-3 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-teal-300">
              Emergency Medical Grid
            </span>
          </div>

          <div className="flex items-center justify-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-3xl font-black text-white tracking-wider">HOPE</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Direct lifeline to instant ambulance dispatch, live ICU beds & emergency triage.
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Top Border Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-rose-500" />

          {/* Tab Switcher: Sign In vs Create Account */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-5">
            <button
              type="button"
              onClick={() => {
                playClick()
                setMode('signin')
                setError('')
              }}
              className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
                mode === 'signin'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                playClick()
                setMode('signup')
                setError('')
                setSuccessMessage('')
              }}
              className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Success Banner after Creating Account */}
          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Content */}
          {mode === 'signin' ? (
            /* SIGN IN FORM */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                  Registered Mobile / Email
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 9876543210 or your email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      playClick()
                      alert('If you created an account, use your chosen password. For default testing: 9876543210 / password123')
                    }}
                    className="text-[11px] text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember checkbox */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 bg-slate-950 border-slate-700 focus:ring-teal-500"
                  />
                  <span>Remember me on this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to HOPE Grid</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* CREATE ACCOUNT (SIGN UP) FORM */
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wide">
                  Full Legal Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wide">
                    Mobile Number (+91)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wide">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Blood Group Quick Select */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1.5">
                  Blood Group (Emergency Transfusion Match)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {bloodGroups.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => {
                        playClick()
                        setBloodGroup(bg)
                      }}
                      className={`py-1 rounded-lg text-xs font-bold border transition-all ${
                        bloodGroup === bg
                          ? 'bg-rose-600 border-rose-500 text-white shadow-sm'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wide">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms checkbox */}
              <label className="flex items-start gap-2 pt-1 text-[11px] text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-teal-600 bg-slate-950 border-slate-700"
                />
                <span>I agree to emergency response telemetry sharing with authorized hospitals & paramedics during SOS.</span>
              </label>

              {/* Submit Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Create Account & Proceed to Sign In</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Bottom Trust Badges */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-500 select-none">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
            <span>256-Bit Encrypted</span>
          </span>
          <span>·</span>
          <span>&lt;10s SOS Ready</span>
          <span>·</span>
          <span>Lucknow ER Network</span>
        </div>

      </div>
    </div>
  )
}
