import type { ActionItem, AssessmentResult, BusinessProfile } from "@/types"
import { getTaxRules } from "@/data/mock-rules"
import { getRegistrations } from "@/data/mock-registrations"
import { getSchemes } from "@/data/mock-schemes"
import { MOCK_SOURCES } from "@/data/mock-sources"

/**
 * MOCK RULES ENGINE.
 *
 * This is a deliberately simple, deterministic placeholder. It does NOT encode
 * real Indian tax law. When verified rules arrive, this function is the single
 * place to replace: keep the `AssessmentResult` shape and the UI stays intact.
 *
 * The real pipeline will be:
 *   raw description -> LLM -> BusinessProfile -> analyzeBusiness() -> results
 * The LLM never decides legal outcomes; this deterministic engine does.
 */
export function analyzeBusiness(profile: BusinessProfile): AssessmentResult {
  const taxResults = getTaxRules()
  const registrationResults = getRegistrations()
  const schemeMatches = getSchemes().slice().sort((a, b) => b.matchPercentage - a.matchPercentage)

  const actionItems = buildActionItems()

  return {
    profile,
    taxResults,
    registrationResults,
    schemeMatches,
    actionItems,
    sources: MOCK_SOURCES,
    isDemo: true,
    generatedAt: new Date().toISOString(),
  }
}

function buildActionItems(): ActionItem[] {
  return [
    {
      id: "action-1",
      order: 1,
      title: "Review your business registration status",
      priority: "high",
      description: "Confirm which registrations your business currently holds and which may still be needed.",
      whyItMatters: "Knowing your current status prevents surprises and is the foundation for every other step.",
      status: "not_started",
      sourceId: "src-udyam",
    },
    {
      id: "action-2",
      order: 2,
      title: "Check applicable tax requirements",
      priority: "high",
      description: "Review whether GST and income-tax obligations apply to you based on verified thresholds.",
      whyItMatters: "Understanding tax obligations early helps you avoid penalties and plan cash flow.",
      status: "not_started",
      sourceId: "src-gst-threshold",
    },
    {
      id: "action-3",
      order: 3,
      title: "Prepare required business documents",
      priority: "medium",
      description: "Gather identity, address and bank documents commonly needed for registrations and schemes.",
      whyItMatters: "Having documents ready makes registrations and scheme applications far faster.",
      status: "not_started",
      sourceId: "src-udyam",
    },
    {
      id: "action-4",
      order: 4,
      title: "Review potential government benefits",
      priority: "medium",
      description: "Explore the schemes matched to your profile and confirm eligibility with official sources.",
      whyItMatters: "The right scheme can reduce costs or improve access to credit for your business.",
      status: "not_started",
      sourceId: "src-scheme-credit",
    },
    {
      id: "action-5",
      order: 5,
      title: "Complete relevant registrations",
      priority: "low",
      description: "Once confirmed, complete the registrations that apply to your business.",
      whyItMatters: "Formal registration unlocks benefits and keeps your business compliant as it grows.",
      status: "not_started",
      sourceId: "src-shops-est",
    },
  ]
}
