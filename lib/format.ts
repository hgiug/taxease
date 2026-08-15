import type {
  ActionStatus,
  BusinessCategory,
  BusinessStructure,
  Priority,
  ResultStatus,
  SchemeMatchStatus,
  SchemeType,
  SourceType,
} from "@/types"

/** Formats an INR amount into a readable "₹12 lakh" style string. */
export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000
    return `₹${trimNumber(cr)} crore`
  }
  if (amount >= 100000) {
    const l = amount / 100000
    return `₹${trimNumber(l)} lakh`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

function trimNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1)
}

export const CATEGORY_LABELS: Record<BusinessCategory, string> = {
  food_business: "Food Business",
  retail: "Retail",
  manufacturing: "Manufacturing",
  services: "Services",
  trading: "Trading",
  transport: "Transport",
  freelancing: "Freelancing",
  agriculture: "Agriculture",
  other: "Other",
}

export const STRUCTURE_LABELS: Record<BusinessStructure, string> = {
  sole_proprietorship: "Sole Proprietorship",
  partnership: "Partnership",
  llp: "LLP",
  private_limited: "Private Limited",
  opc: "One Person Company",
  huf: "HUF",
  unregistered: "Unregistered",
}

export const STATUS_LABELS: Record<ResultStatus, string> = {
  likely_applicable: "Likely applicable",
  may_apply: "May apply",
  conditional: "Conditional",
  review_needed: "Review needed",
  not_identified: "Not identified",
}

export const SCHEME_MATCH_LABELS: Record<SchemeMatchStatus, string> = {
  strong: "Strong potential match",
  potential: "Potential match",
  needs_verification: "Needs verification",
  low: "Low match",
}

export const SCHEME_TYPE_LABELS: Record<SchemeType, string> = {
  loan: "Loan",
  subsidy: "Subsidy",
  credit_support: "Credit support",
  training: "Training",
  incentive: "Incentive",
  other: "Other benefit",
}

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  government_portal: "Government portal",
  scheme_guideline: "Scheme guideline",
  reference_sheet: "Reference sheet",
  press_release: "Press release",
  other: "Other",
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
}

export const ACTION_STATUS_LABELS: Record<ActionStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  done: "Done",
}

export function salesModel(online: boolean, offline: boolean): string {
  if (online && offline) return "Offline + Online"
  if (online) return "Online"
  if (offline) return "Offline"
  return "Not specified"
}
