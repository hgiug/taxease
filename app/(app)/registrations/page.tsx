"use client"

import { useMemo, useState } from "react"
import { Search, ScrollText } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { RegistrationCard } from "@/components/cards/registration-card"
import { Disclaimer } from "@/components/disclaimer"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/lib/store"
import { STATUS_LABELS } from "@/lib/format"
import type { ResultStatus } from "@/types"

const STATUS_FILTERS: (ResultStatus | "all")[] = [
  "all",
  "likely_applicable",
  "may_apply",
  "conditional",
  "review_needed",
]

const STATUS_ITEMS: Record<string, string> = {
  all: "All statuses",
  likely_applicable: STATUS_LABELS.likely_applicable,
  may_apply: STATUS_LABELS.may_apply,
  conditional: STATUS_LABELS.conditional,
  review_needed: STATUS_LABELS.review_needed,
}

export default function RegistrationsPage() {
  const { result } = useStore()
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<ResultStatus | "all">("all")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return result.registrations.filter((r) => {
      if (status !== "all" && r.status !== status) return false
      if (!q) return true
      return (
        r.rule.name.toLowerCase().includes(q) ||
        r.rule.description.toLowerCase().includes(q) ||
        r.whyApplies.toLowerCase().includes(q)
      )
    })
  }, [result.registrations, query, status])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Registrations & licences"
        description="Registrations that may apply to your business, based on your type, location and profile. Each is conditional — always verify before acting."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search registrations…"
            className="pl-9"
            aria-label="Search registrations"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as ResultStatus | "all")} items={STATUS_ITEMS}>
          <SelectTrigger className="sm:w-56" aria-label="Filter by status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTERS.map((s) => (
              <SelectItem key={s} value={s}>
                {s === "all" ? "All statuses" : STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((r) => (
            <RegistrationCard key={r.rule.id} result={r} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 py-16 text-center">
          <ScrollText className="size-8 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">No registrations match your filters</p>
            <p className="text-sm text-muted-foreground">Try a different search term or status.</p>
          </div>
        </div>
      )}

      <Disclaimer />
    </div>
  )
}
