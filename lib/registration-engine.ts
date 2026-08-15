import type {
  BusinessProfile,
  BusinessType,
  Priority,
  RegistrationResult,
  RegistrationRule,
  ResultStatus,
} from "@/types"
import { REGISTRATIONS, getRegistrationById } from "@/data/registrations"

/**
 * REGISTRATION ENGINE.
 *
 * Deterministic, profile-aware. It decides — per registration — a
 * non-absolute status, a priority, a plain-language "why this may apply" and a
 * "what to verify" note. Results genuinely vary by business type, category,
 * state and profile facts. This is a reference engine, not verified law.
 */
export function evaluateRegistrations(
  profile: BusinessProfile,
  businessType?: BusinessType,
): RegistrationResult[] {
  // Candidate registrations: those linked to the business type, plus any whose
  // catalog rules apply to the profile's category or business type.
  const candidateIds = new Set<string>(businessType?.registrationIds ?? [])
  for (const reg of REGISTRATIONS) {
    if (reg.applicableCategories?.includes(profile.businessCategory)) candidateIds.add(reg.id)
    if (businessType && reg.applicableBusinessTypes?.includes(businessType.id)) candidateIds.add(reg.id)
  }

  const results: RegistrationResult[] = []
  for (const id of candidateIds) {
    const rule = getRegistrationById(id)
    if (!rule) continue
    results.push(evaluateOne(rule, profile, businessType))
  }

  // Order by priority then status severity for a sensible default sort.
  const priorityRank: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
  const statusRank: Record<ResultStatus, number> = {
    likely_applicable: 0,
    may_apply: 1,
    conditional: 2,
    review_needed: 3,
    not_identified: 4,
  }
  return results.sort(
    (a, b) => priorityRank[a.priority] - priorityRank[b.priority] || statusRank[a.status] - statusRank[b.status],
  )
}

function evaluateOne(
  rule: RegistrationRule,
  profile: BusinessProfile,
  businessType?: BusinessType,
): RegistrationResult {
  const loc = `${profile.city ? profile.city + ", " : ""}${profile.state}`
  const verifyState = rule.stateSpecific
    ? `Rules vary by state — confirm the exact requirement for ${profile.state}.`
    : "Confirm the current threshold and process on the official portal."

  switch (rule.id) {
    case "gst": {
      const likely = profile.interstateSales || profile.onlineSales
      if (profile.gstRegistered) {
        return build(rule, "review_needed", "medium",
          "You told us you are already GST registered, so keep returns and filings current.",
          "Verify your filing frequency and that your registration still matches your activity.")
      }
      return build(
        rule,
        likely ? "likely_applicable" : "conditional",
        likely ? "high" : "medium",
        likely
          ? "You sell online or across state lines, which commonly triggers GST registration regardless of turnover."
          : "GST registration depends on your turnover and what you sell — it is conditional for your profile.",
        "GST thresholds are being verified. Confirm the current registration threshold before acting.",
      )
    }
    case "udyam": {
      return build(rule, profile.udyamRegistered ? "review_needed" : "may_apply",
        "medium",
        profile.udyamRegistered
          ? "You indicated you already have Udyam/MSME registration — keep the details updated."
          : "Udyam registration is optional but recommended: it formally recognises you as an MSME and supports scheme/credit applications.",
        "It is a free self-declaration. Confirm your enterprise still qualifies as micro/small on the official portal.")
    }
    case "fssai": {
      const isFood = profile.businessCategory === "food_business"
      return build(rule, isFood ? "likely_applicable" : "conditional",
        isFood ? "high" : "low",
        isFood
          ? "Your business handles or sells food, so a food-safety registration or licence is usually required."
          : "A food-safety registration/licence only applies if you handle or sell food.",
        "The tier (registration vs State/Central licence) depends on turnover and scale — verify which applies to you.")
    }
    case "shops_establishment": {
      const relevant = profile.offlineSales || profile.employees > 0
      return build(rule, relevant ? "may_apply" : "review_needed",
        relevant ? "medium" : "low",
        relevant
          ? `You reported a physical premises or employees, so ${profile.state}'s Shops & Establishments rules may apply.`
          : "This may apply if you operate from a commercial premises or hire staff.",
        verifyState)
    }
    case "trade_license": {
      return build(rule, profile.offlineSales ? "may_apply" : "conditional",
        profile.offlineSales ? "medium" : "low",
        profile.offlineSales
          ? `Operating a trade from a fixed premises in ${loc} usually needs a local trade licence.`
          : "A local trade licence typically applies when you operate from a fixed premises.",
        "Local trade licences are issued locally — confirm requirements with your municipal body.")
    }
    case "vending_certificate": {
      return build(rule, "likely_applicable", "high",
        "As a street vendor, a Certificate of Vending or Letter of Recommendation is typically needed to trade and to apply for PM SVANidhi.",
        "Obtained from your local Urban Local Body / Town Vending Committee — confirm the local process.")
    }
    case "factory_license": {
      return build(rule, "review_needed", "medium",
        "Manufacturing units may need factory registration once they cross worker-count or power-usage thresholds.",
        `Thresholds are state-specific — confirm whether your unit crosses them in ${profile.state}.`)
    }
    case "pollution_consent": {
      return build(rule, "review_needed", "medium",
        "Depending on your process (for example dyeing or wood finishing), consent from the State Pollution Control Board may be required.",
        `Confirm with the ${profile.state} Pollution Control Board whether your process needs consent.`)
    }
    case "vehicle_permit": {
      return build(rule, "likely_applicable", "high",
        "Operating commercial vehicles requires registration, insurance, PUC, fitness and a transport permit.",
        "Confirm the permit category for your vehicles and routes on the Parivahan portal.")
    }
    case "electrical_contractor_license": {
      return build(rule, "review_needed", "medium",
        "Regulated electrical installation or contract work may require a state electrical-contractor licence.",
        `Confirm whether your work is regulated in ${profile.state} and which licence class applies.`)
    }
    case "professional_license": {
      return build(rule, "review_needed", "medium",
        "If you practise a regulated profession (for example CA, advocate or architect), membership/licence from the regulator is required.",
        "Confirm the specific requirements of your professional regulator.")
    }
    case "ewaste_compliance": {
      return build(rule, "may_apply", "low",
        "If you collect or discard electronic waste, local e-waste handling rules apply.",
        "Confirm the applicable e-waste handling obligations for your volumes.")
    }
    default: {
      return build(rule, "review_needed", "low", rule.description, verifyState)
    }
  }
}

function build(
  rule: RegistrationRule,
  status: ResultStatus,
  priority: Priority,
  whyApplies: string,
  whatToVerify: string,
): RegistrationResult {
  return { rule, status, priority, whyApplies, whatToVerify }
}
