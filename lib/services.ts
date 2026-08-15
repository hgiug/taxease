import type { BusinessProfile } from "@/types"
import { DEMO_BUSINESS_PROFILE } from "@/data/mock-business"
import { listRegistrations } from "@/data/registrations"
import { listSchemes } from "@/data/schemes"
import { listBusinessTypes } from "@/data/business-types"
import { listSources } from "@/data/sources"
import { evaluateTaxRules } from "@/data/tax-rules"
import { analyzeBusiness } from "@/lib/rules-engine"

/**
 * SERVICE LAYER.
 *
 * The single seam between the app and its data. Today these functions read
 * from the local reference catalogs; later they can read from a verified
 * database (tables: business_types, registrations, schemes, sources,
 * tax_rules, businesses, assessments, action_items) without changing any
 * caller (API routes / UI).
 */

export function getDefaultBusiness(): BusinessProfile {
  return DEMO_BUSINESS_PROFILE
}

export function getBusinessTypes() {
  return listBusinessTypes()
}

export function getRegistrationCatalog() {
  return listRegistrations()
}

export function getSchemeCatalog() {
  return listSchemes()
}

export function getSourceCatalog() {
  return listSources()
}

/** Reference tax rules evaluated for the sample business (used by /api/rules). */
export function getTaxCatalog() {
  return evaluateTaxRules(DEMO_BUSINESS_PROFILE)
}

export function runAnalysis(profile: BusinessProfile) {
  return analyzeBusiness(profile)
}
