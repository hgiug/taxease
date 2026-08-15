// Core domain types for TaxEase.
//
// These types describe a DATA-DRIVEN platform: adding a new business type,
// registration, or scheme means adding data records — never new UI or new
// hardcoded pages. The mock/reference data behind these shapes can later be
// replaced by a verified database without any UI changes.

/* -------------------------------------------------------------------------- */
/*  Business profile                                                          */
/* -------------------------------------------------------------------------- */

export type BusinessCategory =
  | "food_business"
  | "retail"
  | "manufacturing"
  | "services"
  | "trading"
  | "transport"
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
 * (via `extractBusinessProfile`) will populate, and the object every engine
 * consumes. Keep this shape stable — engines and UI depend on it.
 */
export interface BusinessProfile {
  id?: string
  businessName?: string
  /** Optional link to a seeded BusinessType (see data/business-types.ts). */
  businessTypeId?: string
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
  specialCharacteristics?: string[]
  /** Free-text description the user originally provided, if any. */
  rawDescription?: string
}

/* -------------------------------------------------------------------------- */
/*  Business type catalog                                                     */
/* -------------------------------------------------------------------------- */

/**
 * A seeded business type. This is the "spine" of the data-driven system:
 * it links a recognisable business to the registrations, schemes and tax
 * notes that MAY be relevant to it.
 */
export interface BusinessType {
  id: string
  label: string
  category: BusinessCategory
  /** Words used by the mock extractor to recognise this type in free text. */
  keywords: string[]
  description: string
  /** Registration catalog ids potentially relevant to this business type. */
  registrationIds: string[]
  /** Scheme catalog ids potentially relevant to this business type. */
  schemeIds: string[]
  /** Short plain-language note about tax considerations (unverified). */
  taxNote?: string
  /** Source ids backing this reference row. */
  referenceSourceIds?: string[]
}

/* -------------------------------------------------------------------------- */
/*  Status vocabularies                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Deliberately non-absolute status vocabulary. We never assert that something
 * legally applies unless it has been verified.
 */
export type ResultStatus =
  | "likely_applicable"
  | "may_apply"
  | "conditional"
  | "review_needed"
  | "not_identified"

export type SchemeMatchStatus = "strong" | "potential" | "needs_verification" | "low"

export type Priority = "high" | "medium" | "low"
export type ActionStatus = "not_started" | "in_progress" | "done"

/* -------------------------------------------------------------------------- */
/*  Sources                                                                   */
/* -------------------------------------------------------------------------- */

export type SourceType =
  | "government_portal"
  | "scheme_guideline"
  | "reference_sheet"
  | "press_release"
  | "other"

/**
 * A source/evidence object. URLs that appear here come from the reference
 * spreadsheet and are NOT independently verified yet (`verified: false`).
 */
export interface Source {
  id: string
  name: string
  authority?: string | null
  url?: string | null
  sourceType: SourceType
  effectiveDate?: string | null
  lastVerified?: string | null
  /** When false the UI shows "Reference data — verification pending". */
  verified: boolean
}

/* -------------------------------------------------------------------------- */
/*  Registrations                                                             */
/* -------------------------------------------------------------------------- */

/** Catalog record: a registration/licence that may apply to some businesses. */
export interface RegistrationRule {
  id: string
  name: string
  description: string
  applicableBusinessTypes?: string[]
  applicableCategories?: BusinessCategory[]
  conditions?: string[]
  stateSpecific?: boolean
  authority?: string
  documents?: string[]
  officialUrl?: string | null
  sourceId?: string
  effectiveFrom?: string | null
  lastVerified?: string | null
}

/** Engine output: how a registration rule applies to a specific profile. */
export interface RegistrationResult {
  rule: RegistrationRule
  status: ResultStatus
  priority: Priority
  whyApplies: string
  whatToVerify: string
}

/* -------------------------------------------------------------------------- */
/*  Schemes / loans / benefits                                                */
/* -------------------------------------------------------------------------- */

export type SchemeType = "loan" | "subsidy" | "credit_support" | "training" | "incentive" | "other"

/** Catalog record: a government scheme / loan / benefit. */
export interface BusinessScheme {
  id: string
  name: string
  type: SchemeType
  description: string
  applicableBusinessTypes?: string[]
  applicableCategories?: BusinessCategory[]
  /** undefined ⇒ available nationally. */
  states?: string[]
  eligibilityConditions?: string[]
  loanAmount?: string
  subsidy?: string
  interestRate?: string
  benefits?: string[]
  documents?: string[]
  sourceId?: string
  officialUrl?: string | null
  lastVerified?: string | null
}

/** Engine output: how well a scheme matches a specific profile. */
export interface SchemeMatch {
  scheme: BusinessScheme
  matchScore: number
  status: SchemeMatchStatus
  matchedConditions: string[]
  missingConditions: string[]
  reasons: string[]
}

/* -------------------------------------------------------------------------- */
/*  Tax                                                                       */
/* -------------------------------------------------------------------------- */

export type TaxCategory = "gst" | "income_tax" | "tds" | "other"

export interface TaxRule {
  id: string
  category: TaxCategory
  title: string
  status: ResultStatus
  reason: string
  detail: string
  sourceId: string
  /** false ⇒ "Tax rules are currently being verified." */
  verified: boolean
}

/* -------------------------------------------------------------------------- */
/*  Action plan                                                               */
/* -------------------------------------------------------------------------- */

export interface ActionItem {
  id: string
  order: number
  title: string
  priority: Priority
  description: string
  whyItMatters: string
  status: ActionStatus
  sourceId?: string
  /** Relevant business context, e.g. "Based on your food business in Jaipur". */
  relevantInfo?: string
}

/* -------------------------------------------------------------------------- */
/*  Analysis result — the single object the whole dashboard renders from      */
/* -------------------------------------------------------------------------- */

export interface AnalysisResult {
  profile: BusinessProfile
  businessTypeId?: string
  taxResults: TaxRule[]
  registrations: RegistrationResult[]
  schemes: SchemeMatch[]
  actionItems: ActionItem[]
  sources: Source[]
  /** Flags that this result is built from reference/mock data, not verified law. */
  isReferenceData: boolean
  generatedAt: string
}

/** A business the user is tracking (supports the "My Businesses" feature). */
export interface SavedBusiness {
  id: string
  profile: BusinessProfile
  result: AnalysisResult
  createdAt: string
}
