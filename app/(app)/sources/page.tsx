"use client"

import { ExternalLink, ShieldAlert, ShieldCheck } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Disclaimer } from "@/components/disclaimer"
import { useStore } from "@/lib/store"
import { SOURCE_TYPE_LABELS } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Source } from "@/types"

function VerificationBadge({ verified }: { verified: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        verified
          ? "bg-success-soft text-success border-success/25"
          : "bg-warning-soft text-warning border-warning/25",
      )}
    >
      {verified ? <ShieldCheck className="size-3.5" /> : <ShieldAlert className="size-3.5" />}
      {verified ? "Verified" : "Verification pending"}
    </span>
  )
}

function SourceRow({ source }: { source: Source }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-base font-semibold text-foreground text-balance">{source.name}</h3>
            <VerificationBadge verified={source.verified} />
          </div>
          {source.authority && <p className="text-sm text-muted-foreground">{source.authority}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
            <span>{SOURCE_TYPE_LABELS[source.sourceType]}</span>
            <span>Last verified: {source.lastVerified ?? "To be verified"}</span>
            {source.effectiveDate && <span>Effective: {source.effectiveDate}</span>}
          </div>
          {!source.verified && (
            <p className="pt-1 text-xs leading-relaxed text-warning">
              Reference data — verification pending. Confirm on the official source before acting.
            </p>
          )}
        </div>
        {source.url ? (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-accent"
          >
            Open source <ExternalLink className="size-3.5" />
          </a>
        ) : (
          <span className="shrink-0 text-xs text-muted-foreground">Link not yet available</span>
        )}
      </CardContent>
    </Card>
  )
}

export default function SourcesPage() {
  const { result } = useStore()
  const sources = result.sources
  const verifiedCount = sources.filter((s) => s.verified).length

  return (
    <div className="space-y-8">
      <PageHeader
        title="Sources & verification"
        description="Every registration, scheme and tax item on TaxEase links back to a source. These are seeded from a reference dataset and are being independently verified."
      />

      <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" />
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {verifiedCount} of {sources.length} sources backing your analysis are verified. Items marked{" "}
          <span className="font-medium text-warning">verification pending</span> come from the reference spreadsheet
          and should be confirmed on the official portal before you act on them.
        </p>
      </div>

      <div className="space-y-3">
        {sources.map((s) => (
          <SourceRow key={s.id} source={s} />
        ))}
      </div>

      <Disclaimer />
    </div>
  )
}
