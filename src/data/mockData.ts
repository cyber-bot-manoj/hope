import { ExecutiveProfile, ServiceItem, CaseStudy, Testimonial, AssessmentQuestion } from '../types'

export const defaultProfile: ExecutiveProfile = {
  name: "Marcus Vance, Ph.D.",
  title: "Chief AI Strategist & Venture Partner",
  organization: "Vance Vanguard / Ex-MIT CSAIL",
  bio: "Architecting high-stakes digital influence and strategic authority for deep-tech founders, board directors, and frontier AI visionaries.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  theme: "gold",
  verificationStatus: true,
  location: "San Francisco, CA & Zurich",
  badges: ["Forbes Technology Council", "Top 100 AI Voice", "TEDx Speaker", "Angel Investor"],
  metrics: [
    { label: "Global Reach", value: "340K+" },
    { label: "Capital Mobilized", value: "$180M" },
    { label: "Keynote Engagements", value: "48+" },
    { label: "Media Citations", value: "120+" }
  ],
  socials: {
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    email: "marcus@vancevanguard.com",
    website: "https://vancevanguard.com"
  }
}

export const servicesData: ServiceItem[] = [
  {
    id: "executive-identity",
    title: "Executive Brand Architecture",
    subtitle: "Complete Digital Aura Transformation",
    category: "Signature Tier",
    badge: "Most Requested",
    description: "A comprehensive teardown and reimagination of your digital presence. We align your online footprint with your career pinnacle, crafting a bespoke visual identity, narrative bio, and high-impact digital business card.",
    features: [
      "Custom Typography & Chromatic Identity System",
      "Executive Narrative Positioning & Pitch Architecture",
      "High-Fidelity 3D Digital Card with NFC / Apple Wallet",
      "Multi-Platform Banner & Profile Asset Generation",
      "Press Kit & High-Resolution Headshot Direction"
    ],
    timeline: "2 - 3 Weeks",
    priceStarting: "$4,500",
    iconName: "Crown"
  },
  {
    id: "geo-ai-presence",
    title: "Generative Engine Optimization (GEO)",
    subtitle: "Commanding AI Knowledge Graphs",
    category: "Frontier Tech",
    badge: "2026 Breakthrough",
    description: "Ensure that when Perplexity, ChatGPT, Gemini, and Claude are queried about your industry's thought leaders, your name and credentials appear at the very summit.",
    features: [
      "Entity Resolution & Semantic Knowledge Graph Embedding",
      "LLM Bias & Citation Optimization for your Name",
      "Wikipedia & Wikidata Authority Structuring",
      "Digital Footprint Disambiguation & Sentiment Protection",
      "Monthly Generative Search Share-of-Voice Audit"
    ],
    timeline: "Ongoing Sprint",
    priceStarting: "$3,800",
    iconName: "Sparkles"
  },
  {
    id: "keynote-media-kit",
    title: "Keynote & Speaker Presence Kit",
    subtitle: "For Global Stages & Davos-Level Summits",
    category: "Speaker Tier",
    description: "Equip event organizers with an irresistible, world-class media packet. Turn speaking invites into lucrative advisory roles and high-conviction deal flow.",
    features: [
      "Cinematic Speaker One-Sheet (Interactive & PDF)",
      "High-Conversion Keynote Pitch Decks",
      "Stage Video Showreel Direction & Curation",
      "Speaker Rider, Tech Spec & Host Interview Script",
      "Direct VIP Booking Funnel & Calendar Integration"
    ],
    timeline: "10 Days",
    priceStarting: "$3,200",
    iconName: "Mic"
  },
  {
    id: "thought-leadership-ghostwriting",
    title: "Executive Ghostwriting & Authority Flow",
    subtitle: "High-Caliber Essays & Boardroom Articles",
    category: "Editorial",
    description: "We translate your proprietary insights into viral, peer-reviewed caliber essays on LinkedIn, Substack, Forbes, and tech journals without taking more than 30 minutes of your time per month.",
    features: [
      "Bi-Weekly Ghostwritten Deep-Dive Essays",
      "Custom Data Visualizations & Infographics",
      "Strategic Engagement Orchestration with Tier-1 Peers",
      "Syndication to Major Business Outlets",
      "Algorithmic Timing & Amplification Sprints"
    ],
    timeline: "Quarterly Retainer",
    priceStarting: "$5,000/mo",
    iconName: "PenTool"
  }
]

export const caseStudiesData: CaseStudy[] = [
  {
    id: "series-b-fintech",
    clientName: "Elena Rostova",
    role: "Founding CEO, Qredo Vault",
    domain: "Autonomous Decentralized Custody",
    challenge: "Elena was a brilliant cryptographer and engineer, but her digital footprint was sparse and outdated, causing tier-1 institutional VCs to hesitate during early diligence.",
    solution: "Overhauled her executive digital presence into a crisp, high-status thought-leader portal. Positioned her as the premier voice on institutional cryptographic safety with custom visual branding.",
    results: [
      { metric: "$38M", label: "Series B Closed" },
      { metric: "14x", label: "Organic Inbound Dealflow" },
      { metric: "#1 Voice", label: "Financial Security (2025)" }
    ],
    quote: "AURA transformed my public profile from an obscure GitHub account into an authoritative brand that institutional allocators took seriously before our first Zoom call.",
    author: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    featuredImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
    tags: ["Series B", "Venture Capital", "Fintech"]
  },
  {
    id: "ai-director-venture",
    clientName: "Dr. Kaelen Thorne",
    role: "Managing Partner, Synapse Capital",
    domain: "Frontier Compute & Robotics",
    challenge: "Transitioning from Principal Research Director at a Big Tech lab to launching a $75M debut venture fund required rapid credibility with limited partners.",
    solution: "Designed a sovereign digital presence with interactive research whitepapers, an executive keynote portal, and Generative Engine Optimization.",
    results: [
      { metric: "100%", label: "LP Target Oversubscribed" },
      { metric: "62K+", label: "Targeted Newsletter Subs" },
      { metric: "Davos '25", label: "Mainstage Speaker Invite" }
    ],
    quote: "The return on investment was instantaneous. When LPs Googled or asked ChatGPT about me, the clarity and elegance of my brand closed the trust gap in minutes.",
    author: "Dr. Kaelen Thorne",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    tags: ["Venture Fund", "AI Research", "Keynote"]
  }
]

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Soraya Sterling",
    title: "Global Head of Brand Strategy",
    company: "Apex Media Group",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    quote: "In the modern economy, your digital presence is your balance sheet before anyone opens your financial statements. AURA executes with perfection.",
    verified: true,
    rating: 5,
    pressMention: "Featured in Fast Company"
  },
  {
    id: "2",
    name: "Harrison Vance",
    title: "Managing Partner",
    company: "Meridian Horizon Capital",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    quote: "The interactive digital presence kit alone booked us three enterprise advisory mandates within 48 hours of deployment.",
    verified: true,
    rating: 5,
    pressMention: "Forbes 30 Under 30"
  },
  {
    id: "3",
    name: "Dr. Mei-Ling Zhou",
    title: "Founder & Chief Scientist",
    company: "Bioloom Synthesis",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300",
    quote: "The Generative Engine Optimization is black magic. Perplexity and Gemini now quote my research as the foundational benchmark in synthetic biology.",
    verified: true,
    rating: 5,
    pressMention: "MIT Tech Review Innovator"
  }
]

export const assessmentQuestionsData: AssessmentQuestion[] = [
  {
    id: 1,
    question: "When a potential investor, board member, or client searches your name on Google and ChatGPT, what appears first?",
    category: "clarity",
    options: [
      { label: "Scattered links, outdated job titles, or someone else with my name", score: 10, description: "Low digital footprint with ambiguity" },
      { label: "A standard LinkedIn profile and maybe an old conference slide deck", score: 25, description: "Generic presence lacking commanding gravitas" },
      { label: "A bespoke, verified website and recognized thought-leadership essays", score: 40, description: "High authority and instant recognition" }
    ]
  },
  {
    id: 2,
    question: "How visually consistent and modern is your executive brand collateral (headshots, decks, digital card)?",
    category: "visuals",
    options: [
      { label: "Inconsistent; 5-year-old cropped photo and default template slides", score: 10, description: "Outdated visual cues signal lagging innovation" },
      { label: "Clean but standard; feels like a typical corporate employee", score: 25, description: "Competent, but not distinct from peers" },
      { label: "Art-directed, high-end editorial aesthetic with bespoke typography & dark luxury styling", score: 40, description: "Top 1% executive presence aesthetic" }
    ]
  },
  {
    id: 3,
    question: "How is your voice positioned in AI answer engines (ChatGPT, Perplexity, Claude)?",
    category: "reach",
    options: [
      { label: "I have no idea or AI gives hallucinations/sparse info", score: 10, description: "Missing from modern generative discovery" },
      { label: "AI knows my company, but barely recognizes my personal leadership", score: 25, description: "Brand equity trapped in entity, not founder" },
      { label: "AI actively cites me as a premier domain expert with verified citations", score: 40, description: "Fully GEO-optimized digital authority" }
    ]
  },
  {
    id: 4,
    question: "When networking at high-level summits, how do you exchange contact and executive credentials?",
    category: "authority",
    options: [
      { label: "Paper business cards (which get lost) or manually typing my handle", score: 10, description: "Friction-heavy and easily forgotten" },
      { label: "QR code directly to standard LinkedIn profile", score: 25, description: "Functional, but misses opportunity to impress" },
      { label: "Interactive 3D digital card with 1-tap save to Apple Wallet and instant vCard", score: 40, description: "Unforgettable, instant high-status impression" }
    ]
  }
]

export const livePulseActivities = [
  { text: "Sarah Al-Mansoor (Dubai) launched Executive Presence Card", time: "just now" },
  { text: "Julian Ross (London) secured $12M seed following brand overhaul", time: "4m ago" },
  { text: "Dr. Eric Zhao (Singapore) ran Executive GEO Audit (Score: 94/100)", time: "9m ago" },
  { text: "Cynthia Sterling (New York) booked Executive Advisory Sprint", time: "14m ago" },
  { text: "Henrik Lindqvist (Stockholm) downloaded 3D Digital Wallet Pass", time: "21m ago" }
]
