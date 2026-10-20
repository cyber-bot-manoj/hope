import React, { useState } from 'react'
import { 
  X, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  BarChart3, 
  Compass, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react'
import { assessmentQuestionsData } from '../data/mockData'
import { AssessmentScore } from '../types'
import { playTactileClick, playSuccessChime } from '../utils/sound'
import { triggerConfetti } from '../utils/confetti'

interface PresenceAuditorModalProps {
  isOpen: boolean
  onClose: () => void
  onBookCall: () => void
}

export const PresenceAuditorModal: React.FC<PresenceAuditorModalProps> = ({
  isOpen,
  onClose,
  onBookCall
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [scoreResult, setScoreResult] = useState<AssessmentScore | null>(null)
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const totalQuestions = assessmentQuestionsData.length
  const isLastQuestion = currentStep === totalQuestions - 1
  const currentQ = assessmentQuestionsData[currentStep]

  const handleSelectOption = (questionId: number, score: number) => {
    playTactileClick()
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: score
    }))
  }

  const handleNext = () => {
    playTactileClick()
    if (isLastQuestion) {
      calculateFinalResults()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    playTactileClick()
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const calculateFinalResults = () => {
    let total = 0
    let clarity = 0
    let authority = 0
    let visuals = 0
    let reach = 0

    assessmentQuestionsData.forEach((q) => {
      const s = selectedAnswers[q.id] || 15
      total += s
      if (q.category === 'clarity') clarity = s
      if (q.category === 'authority') authority = s
      if (q.category === 'visuals') visuals = s
      if (q.category === 'reach') reach = s
    })

    // Normalized to 100
    const normalizedTotal = Math.round((total / 160) * 100)

    let tier: AssessmentScore['tier'] = 'Emerging Voice'
    let verdict = ''
    let keyRecommendations: string[] = []

    if (normalizedTotal >= 82) {
      tier = 'Industry Titan'
      verdict = 'Your foundation is formidable. You now require sovereign micro-optimizations: dominating generative search knowledge graphs and launching Davos-grade speaker collateral.'
      keyRecommendations = [
        'Embed verified entity structures in Wikidata & Knowledge Vaults for 100% LLM accuracy.',
        'Convert keynote engagements into high-ticket advisory and board mandates.',
        'Distribute syndicated thought-leadership essays to Tier-1 financial media.'
      ]
    } else if (normalizedTotal >= 55) {
      tier = 'Established Leader'
      verdict = 'Strong domain capability, but significant brand equity is currently leaking. Your achievements outshine your digital footprint, creating a trust latency with Tier-1 partners.'
      keyRecommendations = [
        'Upgrade to an art-directed 3D digital presence card with instant Apple Wallet integration.',
        'Systematize bi-weekly thought leadership ghostwriting to dominate executive algorithms.',
        'Harmonize your visual identity across all public touchpoints with bespoke typography.'
      ]
    } else {
      tier = 'Emerging Voice'
      verdict = 'High vulnerability to digital obscurity. In an era where AI and institutional partners diligence you in seconds, an outdated or generic presence directly penalizes your capital and deal flow.'
      keyRecommendations = [
        'Execute a full Executive Brand Architecture teardown and repositioning sprint.',
        'Eliminate legacy, inconsistent web traces and establish one commanding sovereign hub.',
        'Audit name ambiguity across Google Search and generative LLMs.'
      ]
    }

    setScoreResult({
      totalScore: normalizedTotal,
      categoryScores: {
        clarity: Math.round((clarity / 40) * 100),
        authority: Math.round((authority / 40) * 100),
        visuals: Math.round((visuals / 40) * 100),
        reach: Math.round((reach / 40) * 100)
      },
      tier,
      verdict,
      keyRecommendations
    })

    playSuccessChime()
    triggerConfetti()
  }

  const resetAudit = () => {
    playTactileClick()
    setCurrentStep(0)
    setSelectedAnswers({})
    setScoreResult(null)
  }

  const handleCopyReport = () => {
    if (!scoreResult) return
    playTactileClick()
    const reportText = `AURA Executive Presence Audit Report
Overall Score: ${scoreResult.totalScore}/100 (${scoreResult.tier})
Clarity: ${scoreResult.categoryScores.clarity}% | Authority: ${scoreResult.categoryScores.authority}% | Visuals: ${scoreResult.categoryScores.visuals}% | GEO Reach: ${scoreResult.categoryScores.reach}%

Verdict:
${scoreResult.verdict}

Recommended Roadmap:
${scoreResult.keyRecommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
Audited via AURA Professional Presence Design Studio.`

    navigator.clipboard.writeText(reportText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0e121b] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif">Executive Presence Score Audit</h3>
              <p className="text-[11px] text-slate-400">Diagnostic appraisal of your digital gravitas & AI discoverability</p>
            </div>
          </div>
          <button
            onClick={() => { playTactileClick(); onClose(); }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: Questions or Result */}
        {!scoreResult ? (
          <div className="mt-6">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Question {currentStep + 1} of {totalQuestions}</span>
              <span className="text-amber-400 font-semibold">{Math.round(((currentStep + 1) / totalQuestions) * 100)}% Complete</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 mb-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h4 className="text-lg sm:text-xl font-bold text-white mb-6 font-serif leading-snug">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.score
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, opt.score)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400/50 text-white ring-1 ring-amber-400/30'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/20 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-400 bg-amber-400 text-black' : 'border-white/20'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{opt.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{opt.description}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQ.id]}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-black text-xs font-bold shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 active:scale-95 transition-all"
              >
                <span>{isLastQuestion ? 'Generate Executive Score' : 'Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="mt-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Top Score Display */}
            <div className="text-center p-6 rounded-3xl bg-black/40 border border-white/10 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold mb-2">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{scoreResult.tier}</span>
              </div>
              <div className="text-5xl font-black font-serif text-white tracking-tight">
                {scoreResult.totalScore}
                <span className="text-xl font-sans font-normal text-slate-400"> / 100</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-lg mx-auto font-light leading-relaxed">
                {scoreResult.verdict}
              </p>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {[
                { label: 'Narrative Clarity', score: scoreResult.categoryScores.clarity },
                { label: 'C-Suite Authority', score: scoreResult.categoryScores.authority },
                { label: 'Visual Hierarchy', score: scoreResult.categoryScores.visuals },
                { label: 'Generative Reach', score: scoreResult.categoryScores.reach },
              ].map((c, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <div className="text-xs text-slate-400">{c.label}</div>
                  <div className="text-base font-bold text-amber-300 font-serif mt-1">{c.score}%</div>
                  <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${c.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <h5 className="text-xs uppercase tracking-wider text-amber-300 font-bold mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Priority Action Roadmap</span>
              </h5>
              <ul className="space-y-2">
                {scoreResult.keyRecommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={resetAudit}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                <button
                  onClick={handleCopyReport}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied Report</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Audit</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => {
                  playTactileClick()
                  onClose()
                  onBookCall()
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-black text-xs font-bold shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                Discuss Custom Roadmap With Partners
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
