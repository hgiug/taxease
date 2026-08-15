import type { AnalysisResult, BusinessProfile, Source } from "@/types"
import { resolveBusinessType } from "@/lib/business-profile"
import { evaluateRegistrations } from "@/lib/registration-engine"
import { matchSchemes } from "@/lib/matching-engine"
import { generateActionPlan } from "@/lib/action-plan"
import { evaluateTaxRules } from "@/data/tax-rules"
import { getSourceById } from "@/data/sources"

/**
 * ANALYSIS ORCHESTRATOR.
 *
 * The single pipeline every business flows through:
 *   profile -> resolve business type -> registration engine
 *                                    -> scheme matching engine
 *                                    -> tax module
 *                                    -> action-plan generator
 *   => one AnalysisResult that the entire dashboard renders from.
 *
 * When verified rules/data arrive, only the individual engines/data files
 * change — this orchestrator and the UI stay intact.
 */
export function analyzeBusiness(profile: BusinessProfile): AnalysisResult {
  const businessType = resolveBusinessType(profile)

  const taxResults = evaluateTaxRules(profile)
  const registrations = evaluateRegistrations(profile, businessType)
  const schemes = matchSchemes(profile, businessType)
  const actionItems = generateActionPlan(profile, { registrations, schemes, taxResults })

  const sources = collectSources({
    taxSourceIds: taxResults.map((t) => t.sourceId),
    regSourceIds: registrations.map((r) => r.rule.sourceId),
    schemeSourceIds: schemes.map((s) => s.scheme.sourceId),
  })

  return {
    profile: { ...profile, businessTypeId: profile.businessTypeId ?? businessType?.id },
    businessTypeId: businessType?.id,
    taxResults,
    registrations,
    schemes,
    actionItems,
    sources,
    isReferenceData: true,
    generatedAt: new Date().toISOString(),
  }
}

function collectSources(args: {
  taxSourceIds: (string | undefined)[]
  regSourceIds: (string | undefined)[]
  schemeSourceIds: (string | undefined)[]
}): Source[] {
  const ids = new Set<string>()
  for (const id of [...args.taxSourceIds, ...args.regSourceIds, ...args.schemeSourceIds]) {
    if (id) ids.add(id)
  }
  const out: Source[] = []
  for (const id of ids) {
    const s = getSourceById(id)
    if (s) out.push(s)
  }
  return out
}

/** Backwards-compatible alias for older imports. */
export const analyze = analyzeBusiness
