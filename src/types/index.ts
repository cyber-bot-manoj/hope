export type BrandTheme = 'obsidian' | 'emerald' | 'gold' | 'aurora'

export interface ExecutiveProfile {
  name: string
  title: string
  organization: string
  bio: string
  avatarUrl: string
  theme: BrandTheme
  verificationStatus: boolean
  location: string
  badges: string[]
  metrics: {
    label: string
    value: string
  }[]
  socials: {
    linkedin?: string
    twitter?: string
    email?: string
    website?: string
  }
}

export interface ServiceItem {
  id: string
  title: string
  subtitle: string
  category: string
  description: string
  features: string[]
  timeline: string
  priceStarting: string
  badge?: string
  iconName: string
}

export interface CaseStudy {
  id: string
  clientName: string
  role: string
  domain: string
  challenge: string
  solution: string
  results: {
    metric: string
    label: string
  }[]
  quote: string
  author: string
  avatar: string
  featuredImage: string
  tags: string[]
}

export interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  avatar: string
  quote: string
  verified: boolean
  rating: number
  pressMention?: string
}

export interface AssessmentQuestion {
  id: number
  question: string
  category: 'clarity' | 'authority' | 'visuals' | 'reach'
  options: {
    label: string
    score: number
    description: string
  }[]
}

export interface AssessmentScore {
  totalScore: number
  categoryScores: {
    clarity: number
    authority: number
    visuals: number
    reach: number
  }
  tier: 'Emerging Voice' | 'Established Leader' | 'Industry Titan'
  verdict: string
  keyRecommendations: string[]
}
