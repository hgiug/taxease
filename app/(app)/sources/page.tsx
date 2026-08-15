"use client"

import { ExternalLink, ShieldCheck } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Disclaimer, DemoBadge } from "@/components/disclaimer"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import type { Source } from "@/types"

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground break-words">{value}</p>
    </div>
  )
}

function SourceRow({ source }: { source: Source }) {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
              <ShieldCheck className="size-4" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">{source.sourceName}</p>
              <p className="text-xs text-muted-foreground">Rule version: {source.ruleVersion ?? "—"}</p>
            </div>
          </div>
          {source.sourceUrl ? (
            <a
              href={source.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-accent"
            >
              Open
              <ExternalLink className="size-3.5" />
            </a>
          ) : (
            <span className="rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground">
              URL pending
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
          <Field label="Authority" value={source.authority ?? "To be verified"} />
          <Field label="Effective date" value={source.effectiveDate ?? "To be verified"} />
          <Field label="Last verified" value={source.lastVerified ?? "To be verified"} />
          <Field label="Official URL" value={source.sourceUrl ?? "Not yet available"} />
        </div>
      </CardContent>
    </Card>
  )
}

export default function SourcesPage() {
  const { result } = useStore()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Sources & evidence"
        description="Every recommendation in TaxEase is designed to trace back to an official source. These are placeholders for the demo — verified authorities, URLs and dates will be attached before anything is presented as guidance."
        action={<DemoBadge />}
      />

      <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">How this works: </span>
        Each rule, registration and scheme references a source record with an authority, an official URL, an effective
        date and a last-verified date. The structure is fixed so verified research can be dropped in without changing
        the app.
      </div>

      <div className="space-y-4">
        {result.sources.map((source) => (
          <SourceRow key={source.id} source={source} />
        ))}
      </div>

      <Disclaimer />
    </div>
  )
}
