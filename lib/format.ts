import type {
  ActionStatus,
  BusinessCategory,
  BusinessStructure,
  Priority,
  ResultStatus,
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
  review_needed: "Review needed",
  no_action: "No immediate action",
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
