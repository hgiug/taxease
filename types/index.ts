// Core domain types for TaxEase.
// These are intentionally verbose and stable so the mock data/service layer
// can later be swapped for a real database + rules engine without UI changes.

export type BusinessCategory =
  | "food_business"
  | "retail"
  | "manufacturing"
  | "services"
  | "trading"
  | "freelancing"
  | "agriculture"
  | "other"

export type BusinessStructure =
  | "sole_proprietorship"
  | "partnership"
  | "llp"
  | "private_limited"
  | "opc"
  | "huf"
  | "unregistered"

/**
 * Structured representation of a business. This is the object a real LLM
 * (via `extractBusinessProfile`) will populate, and the object the rules
 * engine consumes. Keep this shape stable.
 */
export interface BusinessProfile {
  id?: string
  businessName?: string
  businessCategory: BusinessCategory
  businessActivity: string
  state: string
  city: string
  annualTurnover: number // in INR
  employees: number
  businessStructure: BusinessStructure
  businessAgeMonths?: number
  onlineSales: boolean
  offlineSales: boolean
  interstateSales: boolean
  imports: boolean
  exports: boolean
  gstRegistered: boolean
  udyamRegistered: boolean
  otherRegistrations?: string[]
  /** Free-text description the user originally provided, if any. */
  rawDescription?: string
}

export type ResultStatus = "likely_applicable" | "review_needed" | "no_action"

/**
 * A source/evidence object. For the demo these use placeholder values.
 * Real official sources are inserted later without changing the shape.
 */
export interface Source {
  id: string
  sourceName: string // e.g. "OFFICIAL_SOURCE_PLACEHOLDER"
  authority: string | null
  sourceUrl: string | null
  effectiveDate: string | null
  lastVerified: string | null
  ruleVersion?: string
}

export interface TaxRule {
  id: string
  category: "gst" | "income_tax" | "tds" | "other"
  title: string
  status: ResultStatus
  reason: string
  detail: string
  sourceId: string
}

export interface RegistrationRule {
  id: string
  title: string
  status: ResultStatus
  reason: string
  detail: string
  documents: string[]
  applicationHint: string
  sourceId: string
}

export interface GovernmentScheme {
  id: string
  name: string
  matchPercentage: number
  whyItMatches: string
  potentialBenefit: string
  eligibility: string[]
  documents: string[]
  sourceId: string
}

export type Priority = "high" | "medium" | "low"
export type ActionStatus = "not_started" | "in_progress" | "done"

export interface ActionItem {
  id: string
  order: number
  title: string
  priority: Priority
  description: string
  whyItMatters: string
  status: ActionStatus
  sourceId: string
}

/**
 * The full output of the rules engine for a given profile.
 */
export interface AssessmentResult {
  profile: BusinessProfile
  taxResults: TaxRule[]
  registrationResults: RegistrationRule[]
  schemeMatches: GovernmentScheme[]
  actionItems: ActionItem[]
  sources: Source[]
  /** Flags that this result is demo/mock data, never real legal advice. */
  isDemo: boolean
  generatedAt: string
}
