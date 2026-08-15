import type {
  ActionItem,
  BusinessProfile,
  RegistrationResult,
  SchemeMatch,
  TaxRule,
} from "@/types"

interface AnalysisInputs {
  registrations: RegistrationResult[]
  schemes: SchemeMatch[]
  taxResults: TaxRule[]
}

/**
 * ACTION-PLAN GENERATOR.
 *
 * Builds a personalised, ordered next-steps list from the analysis — the
 * steps genuinely change with the business. High-priority applicable
 * registrations, GST review, MSME status and the best-matching scheme all
 * surface dynamically.
 */
export function generateActionPlan(profile: BusinessProfile, inputs: AnalysisInputs): ActionItem[] {
  const { registrations, schemes, taxResults } = inputs
  const items: Omit<ActionItem, "order">[] = []
  const context = `Based on your ${profile.businessActivity || profile.businessCategory.replace("_", " ")} in ${profile.city ? profile.city + ", " : ""}${profile.state}.`

  // 1) Review the applicable registrations (always a good starting point).
  const applicableRegs = registrations.filter(
    (r) => r.status === "likely_applicable" || r.status === "may_apply",
  )
  items.push({
    id: "action-review-registrations",
    title: "Review your registrations & licences",
    priority: "high",
    description:
      applicableRegs.length > 0
        ? `We flagged ${applicableRegs.length} registration${applicableRegs.length > 1 ? "s" : ""} that may apply, including ${applicableRegs
            .slice(0, 2)
            .map((r) => r.rule.name)
            .join(" and ")}.`
        : "Confirm which registrations your business currently holds and which may still be needed.",
    whyItMatters: "Knowing your registration status is the foundation for tax, compliance and scheme eligibility.",
    status: "not_started",
    sourceId: applicableRegs[0]?.rule.sourceId,
    relevantInfo: context,
  })

  // 2) GST-specific step when relevant.
  const gst = taxResults.find((t) => t.category === "gst")
  if (gst && (gst.status === "likely_applicable" || gst.status === "conditional")) {
    items.push({
      id: "action-check-gst",
      title: profile.gstRegistered ? "Keep your GST filings current" : "Check whether GST registration applies",
      priority: gst.status === "likely_applicable" ? "high" : "medium",
      description: gst.reason,
      whyItMatters: "Getting GST right early avoids penalties and keeps you eligible to sell online and across states.",
      status: "not_started",
      sourceId: gst.sourceId,
      relevantInfo: context,
    })
  }

  // 3) MSME / Udyam status.
  if (!profile.udyamRegistered) {
    items.push({
      id: "action-udyam",
      title: "Consider Udyam (MSME) registration",
      priority: "medium",
      description:
        "Udyam registration is a free self-declaration that formally recognises you as an MSME and supports credit and scheme applications.",
      whyItMatters: "Several schemes and lenders ask for MSME status, and some subsidies require it.",
      status: "not_started",
      sourceId: "src-udyam",
      relevantInfo: context,
    })
  }

  // 4) Review the strongest funding opportunity.
  const topScheme = schemes.find((s) => s.status === "strong") ?? schemes[0]
  if (topScheme) {
    items.push({
      id: "action-review-funding",
      title: `Review funding: ${topScheme.scheme.name}`,
      priority: topScheme.status === "strong" ? "high" : "medium",
      description: `This program appears relevant based on your profile (${topScheme.matchScore}% reference match). ${topScheme.reasons[0] ?? ""}`,
      whyItMatters:
        "The right scheme can reduce costs or improve access to credit. Verify the current eligibility requirements before applying.",
      status: "not_started",
      sourceId: topScheme.scheme.sourceId,
      relevantInfo: context,
    })
  }

  // 5) Prepare documents.
  items.push({
    id: "action-documents",
    title: "Prepare your core documents",
    priority: "low",
    description:
      "Gather identity, address, PAN and bank documents commonly needed across registrations and scheme applications.",
    whyItMatters: "Having documents ready makes every registration and application far faster.",
    status: "not_started",
    relevantInfo: context,
  })

  // 6) Verify everything against official sources.
  items.push({
    id: "action-verify",
    title: "Verify details against official sources",
    priority: "medium",
    description:
      "Everything here is reference information. Confirm the current rules, thresholds and eligibility on the official portals before acting.",
    whyItMatters: "Rules vary by state, turnover and activity, and change over time.",
    status: "not_started",
    relevantInfo: context,
  })

  return items.map((item, i) => ({ ...item, order: i + 1 }))
}
