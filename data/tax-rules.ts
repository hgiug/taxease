import type { BusinessProfile, TaxRule } from "@/types"

/**
 * TAX MODULE (reference only).
 *
 * Tax rules are being verified separately by the research team. This module is
 * intentionally structured so verified rules (thresholds, slabs, rates) can be
 * dropped in later WITHOUT any frontend change. Until then every item is
 * `verified: false`, which the UI renders as
 * "Tax rules are currently being verified."
 *
 * We deliberately do NOT hardcode any tax rate, threshold or bracket here.
 */

export function evaluateTaxRules(profile: BusinessProfile): TaxRule[] {
  const rules: TaxRule[] = []

  // --- GST ---
  const gstLikely = profile.interstateSales || profile.onlineSales
  rules.push({
    id: "tax-gst",
    category: "gst",
    title: "Goods & Services Tax (GST)",
    status: profile.gstRegistered ? "review_needed" : gstLikely ? "likely_applicable" : "conditional",
    reason: profile.gstRegistered
      ? "You indicated you are already GST registered. Keep filings and returns up to date; the exact obligations depend on verified thresholds."
      : gstLikely
        ? "Because you sell online or across state lines, GST registration is often relevant. Thresholds vary and must be confirmed against verified rules."
        : "Whether GST registration is required depends on your turnover and the nature of your goods/services. This is conditional and needs verification.",
    detail:
      "GST obligations can depend on turnover, the type of goods or services, interstate supply, and sales through online marketplaces. The specific thresholds are being verified by the research team and are not shown here.",
    sourceId: "src-gst",
    verified: false,
  })

  // --- Income Tax ---
  rules.push({
    id: "tax-income",
    category: "income_tax",
    title: "Income Tax",
    status: "likely_applicable",
    reason:
      "Businesses generally need to report income and file returns. The specific slabs, presumptive-taxation options and due dates depend on your structure and are being verified.",
    detail:
      "How business income is taxed depends on your business structure (for example a sole proprietorship is usually taxed as part of the owner's personal income). Presumptive-taxation options may simplify filing for eligible small businesses. Exact slabs and eligibility are being verified and are not shown here.",
    sourceId: "src-income-tax",
    verified: false,
  })

  // --- TDS / other ---
  rules.push({
    id: "tax-tds",
    category: "tds",
    title: "TDS / Withholding",
    status: profile.employees > 0 ? "review_needed" : "conditional",
    reason:
      profile.employees > 0
        ? "Because you reported employees or contractors, tax-deducted-at-source obligations may become relevant on certain payments."
        : "TDS obligations are unlikely to apply immediately but can arise as you grow or make certain payments.",
    detail:
      "TDS can apply when a business makes specific payments above certain limits (for example salaries, contractor payments, rent or professional fees). The applicable limits are being verified and are not shown here.",
    sourceId: "src-income-tax",
    verified: false,
  })

  return rules
}
