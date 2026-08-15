import type {
  BusinessProfile,
  BusinessScheme,
  BusinessType,
  SchemeMatch,
  SchemeMatchStatus,
} from "@/types"
import { SCHEMES } from "@/data/schemes"
import { isNewBusiness } from "@/lib/business-profile"

/**
 * SCHEME MATCHING ENGINE.
 *
 * Scores each scheme against a profile and returns a non-absolute status.
 * Scores are heuristic and for reference only — the copy always tells the user
 * to verify current eligibility before applying. We never guarantee approval.
 */
export function matchSchemes(
  profile: BusinessProfile,
  businessType?: BusinessType,
  schemes: BusinessScheme[] = SCHEMES,
): SchemeMatch[] {
  return schemes
    .map((scheme) => scoreScheme(profile, scheme, businessType))
    .sort((a, b) => b.matchScore - a.matchScore)
}

function scoreScheme(
  profile: BusinessProfile,
  scheme: BusinessScheme,
  businessType?: BusinessType,
): SchemeMatch {
  let score = 0
  const reasons: string[] = []
  const matchedConditions: string[] = []
  const missingConditions: string[] = []

  // --- Business-type / category relevance (max ~45) ---
  const typeLinked =
    (businessType && scheme.applicableBusinessTypes?.includes(businessType.id)) ?? false
  const categoryLinked = scheme.applicableCategories?.includes(profile.businessCategory) ?? false
  const linkedViaType = businessType?.schemeIds.includes(scheme.id) ?? false

  if (typeLinked) {
    score += 45
    reasons.push(`Designed for businesses like ${businessType?.label ?? "yours"}.`)
    matchedConditions.push("Business type is in the scheme's target group")
  } else if (linkedViaType) {
    score += 38
    reasons.push("Commonly used by businesses similar to yours.")
    matchedConditions.push("Business type commonly uses this scheme")
  } else if (categoryLinked) {
    score += 28
    reasons.push(`Applies broadly to ${profile.businessCategory.replace("_", " ")} businesses.`)
    matchedConditions.push("Your business category is eligible")
  } else {
    missingConditions.push("This scheme mainly targets other business types")
  }

  // --- Geographic availability (max 20) ---
  if (!scheme.states || scheme.states.length === 0) {
    score += 20
    matchedConditions.push("Available nationally")
  } else if (scheme.states.includes(profile.state)) {
    score += 20
    matchedConditions.push(`Available in ${profile.state}`)
  } else {
    missingConditions.push(`May not be available in ${profile.state}`)
  }

  // --- Size / MSME fit (max 15) ---
  const smallEnough = profile.annualTurnover <= 50000000 // ≤ ₹5 crore ~ small
  if (smallEnough) {
    score += 12
    matchedConditions.push("Business size fits micro/small enterprise programmes")
  } else {
    missingConditions.push("Turnover may exceed typical micro/small thresholds")
  }
  if (profile.udyamRegistered) {
    score += 3
    matchedConditions.push("Udyam/MSME registered")
  }

  // --- Scheme-specific nuance (max ~20) ---
  switch (scheme.id) {
    case "pmegp": {
      if (isNewBusiness(profile)) {
        score += 15
        reasons.push("PMEGP targets new units — your business appears to be recently started.")
        matchedConditions.push("New unit (PMEGP is for new microenterprises)")
      } else {
        score -= 10
        missingConditions.push("PMEGP is generally for NEW units; existing units are usually ineligible")
      }
      if (!profile.udyamRegistered) {
        missingConditions.push("Udyam registration needed before margin-money adjustment")
      }
      break
    }
    case "pm_svanidhi": {
      const isVendor =
        businessType?.id === "street_vendor" || businessType?.id === "food_street_vendor"
      if (isVendor) {
        score += 15
        reasons.push("PM SVANidhi is built specifically for street vendors.")
      } else {
        score -= 20
        missingConditions.push("PM SVANidhi is only for street vendors")
      }
      break
    }
    case "pm_vishwakarma": {
      if (typeLinked) {
        score += 10
        missingConditions.push("Confirm your exact craft is one of the 18 covered traditional trades")
      } else {
        score -= 15
        missingConditions.push("Only eligible traditional artisan trades qualify")
      }
      break
    }
    case "pm_mudra": {
      score += 8
      reasons.push("MUDRA is broadly available to small non-farm businesses.")
      break
    }
  }

  const matchScore = clamp(Math.round(score), 0, 100)
  return {
    scheme,
    matchScore,
    status: toStatus(matchScore),
    matchedConditions,
    missingConditions,
    reasons: reasons.length ? reasons : ["Reference match based on the details you provided."],
  }
}

function toStatus(score: number): SchemeMatchStatus {
  if (score >= 75) return "strong"
  if (score >= 55) return "potential"
  if (score >= 35) return "needs_verification"
  return "low"
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}
