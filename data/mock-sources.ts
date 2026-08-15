import type { Source } from "@/types"

/**
 * DEMO DATA — placeholder sources only.
 * No real government URLs are used. When the research team provides verified
 * data, replace these objects (keeping the same ids) with real authorities,
 * URLs, effective dates and verification dates.
 */
export const MOCK_SOURCES: Source[] = [
  {
    id: "src-gst-threshold",
    sourceName: "OFFICIAL_SOURCE_PLACEHOLDER",
    authority: "PLACEHOLDER_AUTHORITY",
    sourceUrl: null,
    effectiveDate: null,
    lastVerified: null,
    ruleVersion: "demo-0.1",
  },
  {
    id: "src-income-tax",
    sourceName: "OFFICIAL_SOURCE_PLACEHOLDER",
    authority: "PLACEHOLDER_AUTHORITY",
    sourceUrl: null,
    effectiveDate: null,
    lastVerified: null,
    ruleVersion: "demo-0.1",
  },
  {
    id: "src-tds",
    sourceName: "OFFICIAL_SOURCE_PLACEHOLDER",
    authority: "PLACEHOLDER_AUTHORITY",
    sourceUrl: null,
    effectiveDate: null,
    lastVerified: null,
    ruleVersion: "demo-0.1",
  },
  {
    id: "src-udyam",
    sourceName: "OFFICIAL_SOURCE_PLACEHOLDER",
    authority: "PLACEHOLDER_AUTHORITY",
    sourceUrl: null,
    effectiveDate: null,
    lastVerified: null,
    ruleVersion: "demo-0.1",
  },
  {
    id: "src-fssai",
    sourceName: "OFFICIAL_SOURCE_PLACEHOLDER",
    authority: "PLACEHOLDER_AUTHORITY",
    sourceUrl: null,
    effectiveDate: null,
    lastVerified: null,
    ruleVersion: "demo-0.1",
  },
  {
    id: "src-shops-est",
    sourceName: "OFFICIAL_SOURCE_PLACEHOLDER",
    authority: "PLACEHOLDER_AUTHORITY",
    sourceUrl: null,
    effectiveDate: null,
    lastVerified: null,
    ruleVersion: "demo-0.1",
  },
  {
    id: "src-scheme-credit",
    sourceName: "OFFICIAL_SOURCE_PLACEHOLDER",
    authority: "PLACEHOLDER_AUTHORITY",
    sourceUrl: null,
    effectiveDate: null,
    lastVerified: null,
    ruleVersion: "demo-0.1",
  },
  {
    id: "src-scheme-skilling",
    sourceName: "OFFICIAL_SOURCE_PLACEHOLDER",
    authority: "PLACEHOLDER_AUTHORITY",
    sourceUrl: null,
    effectiveDate: null,
    lastVerified: null,
    ruleVersion: "demo-0.1",
  },
  {
    id: "src-scheme-digital",
    sourceName: "OFFICIAL_SOURCE_PLACEHOLDER",
    authority: "PLACEHOLDER_AUTHORITY",
    sourceUrl: null,
    effectiveDate: null,
    lastVerified: null,
    ruleVersion: "demo-0.1",
  },
]

export function getSourceById(id: string): Source | undefined {
  return MOCK_SOURCES.find((s) => s.id === id)
}
