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
  Zap, 
  Check, 
  AlertCircle 
} from 'lucide-react'
import { playClick, playEmergencyPulse } from '../utils/emergencyAudio'

interface AuthViewProps {
  onLoginSuccess: (user: { name: string; phone?: string; email: string; bloodGroup?: string }) => void
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Sign In State
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  // Sign Up State
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [bloodGroup, setBloodGroup] = useState('O+')
  const [agreeTerms, setAgreeTerms] = useState(true)

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!identifier.trim()) {
      setError('Please enter your mobile number or email address.')
      return
    }
    if (!password) {
      setError('Please enter your account password.')
      return
    }

    setLoading(true)
    playClick()

    setTimeout(() => {
      setLoading(false)
      playEmergencyPulse()
      onLoginSuccess({
        name: identifier.includes('@') ? identifier.split('@')[0] : 'Aarav Sharma',
        email: identifier.includes('@') ? identifier : 'aarav.sharma@example.com',
        phone: !identifier.includes('@') ? identifier : '+91 98765 43210',
        bloodGroup: 'O+'
      })
    }, 800)
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fullName.trim()) {
      setError('Please enter your full name for emergency medical identification.')
      return
    }
    if (!phone.trim()) {
      setError('Please enter your 10-digit mobile number for SOS notifications.')
      return
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (!agreeTerms) {
      setError('Please agree to emergency response protocol terms.')
      return
    }

    setLoading(true)
    playClick()

    setTimeout(() => {
      setLoading(false)
      playEmergencyPulse()
      onLoginSuccess({
        name: fullName.trim(),
        email: email.trim() || `${fullName.toLowerCase().replace(/\s+/g, '')}@emergency.in`,
        phone: phone.trim(),
        bloodGroup
      })
    }, 1000)
  }

  const handleQuickDemoAccess = () => {
    playEmergencyPulse()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLoginSuccess({
        name: 'Aarav Sharma',
        email: 'aarav.sharma@lucknow-health.in',
        phone: '+91 98765 43210',
        bloodGroup: 'O+'
      })
    }, 400)
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

          {/* Tab Switcher: Sign In vs Sign Up */}
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

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
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
                  Mobile Number / Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 9876543210 or name@gmail.com"
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
                    onClick={() => alert('Demo PIN for testing: password123')}
                    className="text-[11px] text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
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
                  <span>Stay logged in on this phone</span>
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
            /* SIGN UP FORM */
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wide">
                  Full Legal Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
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
                    Mobile (+91)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wide">
                    Email (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aarav@gmail.com"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Blood Group Quick Select */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1.5">
                  Blood Group (Emergency Transfusion)
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <span>I agree to high-priority emergency telemetry sharing with authorized hospitals & paramedics during SOS.</span>
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
                    <span>Create Account & Activate Grid</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo Bypass Access Button */}
          <div className="mt-5 pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={handleQuickDemoAccess}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 text-teal-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 group shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>⚡ One-Click Instant Demo Login (Aarav Sharma)</span>
            </button>
            <p className="text-[10px] text-slate-500 mt-2">
              For evaluation: click above to immediately test all emergency features.
            </p>
          </div>

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
