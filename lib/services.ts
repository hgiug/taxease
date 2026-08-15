import type { BusinessProfile } from "@/types"
import { MOCK_BUSINESS_PROFILE } from "@/data/mock-business"
import { getTaxRules } from "@/data/mock-rules"
import { getRegistrations } from "@/data/mock-registrations"
import { getSchemes } from "@/data/mock-schemes"
import { analyzeBusiness } from "@/lib/rules-engine"

/**
 * SERVICE LAYER.
 *
 * All data access flows through these functions. Today they read from mock
 * data files; later they can read from PostgreSQL/Supabase without changing
 * any callers (API routes / UI). This is the seam for the future database
 * (tables: businesses, business_profiles, tax_rules, registration_rules,
 * government_schemes, sources, assessments, action_items, rule_versions).
 */

export function getDefaultBusiness(): BusinessProfile {
  return MOCK_BUSINESS_PROFILE
}

export function listRules() {
  return getTaxRules()
}

export function listRegistrations() {
  return getRegistrations()
}

export function listSchemes() {
  return getSchemes()
}

export function runAnalysis(profile: BusinessProfile) {
  return analyzeBusiness(profile)
}
