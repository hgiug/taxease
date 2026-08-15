import type { BusinessProfile, BusinessType } from "@/types"
import { BUSINESS_TYPES, getBusinessTypeById } from "@/data/business-types"
import { DEMO_BUSINESS_PROFILE } from "@/data/mock-business"

/**
 * Business-profile helpers.
 *
 * Resolves a profile to a seeded BusinessType so the engines know which
 * registrations/schemes are candidate-relevant. Resolution order:
 *   1. explicit `businessTypeId`
 *   2. keyword match against the free-text activity/description
 *   3. first business type in the same category
 */
export function resolveBusinessType(profile: BusinessProfile): BusinessType | undefined {
  const explicit = getBusinessTypeById(profile.businessTypeId)
  if (explicit) return explicit

  const haystack = `${profile.businessActivity} ${profile.rawDescription ?? ""} ${
    (profile.specialCharacteristics ?? []).join(" ")
  }`.toLowerCase()

  let best: { type: BusinessType; score: number } | null = null
  for (const type of BUSINESS_TYPES) {
    let score = 0
    for (const kw of type.keywords) {
      if (haystack.includes(kw.toLowerCase())) score += kw.split(" ").length // multi-word keywords weigh more
    }
    if (score > 0 && (!best || score > best.score)) best = { type, score }
  }
  if (best) return best.type

  return BUSINESS_TYPES.find((t) => t.category === profile.businessCategory)
}

export function isNewBusiness(profile: BusinessProfile): boolean {
  if (typeof profile.businessAgeMonths === "number") return profile.businessAgeMonths <= 12
  return false
}

export { DEMO_BUSINESS_PROFILE }

export function newProfileId(): string {
  return `biz-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}
