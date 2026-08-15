"use client"

import { useMemo, useState } from "react"
import { Landmark, Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { SchemeCard } from "@/components/cards/scheme-card"
import { Disclaimer } from "@/components/disclaimer"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/lib/store"
import { SCHEME_TYPE_LABELS } from "@/lib/format"
import type { SchemeType } from "@/types"

const TYPE_FILTERS: (SchemeType | "all")[] = [
  "all",
  "loan",
  "subsidy",
  "credit_support",
  "training",
  "incentive",
  "other",
]

const TYPE_ITEMS: Record<string, string> = {
  all: "All types",
  loan: SCHEME_TYPE_LABELS.loan,
  subsidy: SCHEME_TYPE_LABELS.subsidy,
  credit_support: SCHEME_TYPE_LABELS.credit_support,
  training: SCHEME_TYPE_LABELS.training,
  incentive: SCHEME_TYPE_LABELS.incentive,
  other: SCHEME_TYPE_LABELS.other,
}

type SortKey = "relevance" | "name"

const SORT_ITEMS: Record<SortKey, string> = {
  relevance: "Sort: Relevance",
  name: "Sort: Name",
}

export default function BenefitsPage() {
  const { result, profile } = useStore()
  const [query, setQuery] = useState("")
  const [type, setType] = useState<SchemeType | "all">("all")
  const [sort, setSort] = useState<SortKey>("relevance")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = result.schemes.filter((m) => {
      if (type !== "all" && m.scheme.type !== type) return false
      if (!q) return true
      return (
        m.scheme.name.toLowerCase().includes(q) ||
        m.scheme.description.toLowerCase().includes(q) ||
        (m.scheme.benefits ?? []).some((b) => b.toLowerCase().includes(q))
      )
    })
    if (sort === "name") {
      return [...list].sort((a, b) => a.scheme.name.localeCompare(b.scheme.name))
    }
    return [...list].sort((a, b) => b.matchScore - a.matchScore)
  }, [result.schemes, query, type, sort])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Benefits & funding"
        description={`Loans, subsidies and government schemes that may be relevant to your ${profile.businessActivity || "business"}. Match scores are reference estimates — verify eligibility before applying.`}
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search schemes…"
            className="pl-9"
            aria-label="Search schemes"
          />
        </div>
        <Select value={type} onValueChange={(v) => setType(v as SchemeType | "all")} items={TYPE_ITEMS}>
          <SelectTrigger className="lg:w-48" aria-label="Filter by scheme type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TYPE_FILTERS.map((t) => (
              <SelectItem key={t} value={t}>
                {t === "all" ? "All types" : SCHEME_TYPE_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)} items={SORT_ITEMS}>
          <SelectTrigger className="lg:w-44" aria-label="Sort schemes">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Sort: Relevance</SelectItem>
            <SelectItem value="name">Sort: Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((m) => (
            <SchemeCard key={m.scheme.id} match={m} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 py-16 text-center">
          <Landmark className="size-8 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">No schemes match your filters</p>
            <p className="text-sm text-muted-foreground">Try a different search term or scheme type.</p>
          </div>
        </div>
      )}

      <Disclaimer />
    </div>
  )
}
