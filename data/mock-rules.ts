import type { TaxRule } from "@/types"

/**
 * DEMO DATA — illustrative tax/compliance items only.
 * These do NOT represent real Indian tax law, thresholds, or brackets.
 * The research team's verified rules will replace this file's contents
 * (keeping the same shape) later.
 */
export const MOCK_TAX_RULES: TaxRule[] = [
  {
    id: "tax-gst",
    category: "gst",
    title: "Goods & Services Tax (GST)",
    status: "review_needed",
    reason:
      "Based on your reported turnover and online sales, GST registration may be worth reviewing. Thresholds vary and must be confirmed against verified rules.",
    detail:
      "GST obligations can depend on turnover, the type of goods or services, and whether you sell across state lines or through online marketplaces. This is a demo assessment — confirm the current threshold and any category-specific requirements with an official source or professional before acting.",
    sourceId: "src-gst-threshold",
  },
  {
    id: "tax-income",
    category: "income_tax",
    title: "Income Tax",
    status: "likely_applicable",
    reason:
      "Businesses generally need to report income and file returns. The specific slabs, presumptive-taxation options and due dates depend on your structure.",
    detail:
      "As a sole proprietorship, business income is typically taxed as part of the owner's personal income. Presumptive taxation schemes may simplify filing for eligible small businesses. Exact slabs and eligibility are placeholders in this demo and must be verified.",
    sourceId: "src-income-tax",
  },
  {
    id: "tax-tds",
    category: "tds",
    title: "TDS / Withholding",
    status: "no_action",
    reason:
      "With your current profile, tax-deducted-at-source obligations are unlikely to apply immediately, but this can change as you grow or make certain payments.",
    detail:
      "TDS can apply when a business makes specific payments above certain limits (for example to contractors, rent, or professional fees). This is a demo result — reassess if your payment patterns change.",
    sourceId: "src-tds",
  },
]

export function getTaxRules(): TaxRule[] {
  return MOCK_TAX_RULES
}
