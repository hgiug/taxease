"use client"

import { ExternalLink, FileText, ShieldAlert, ShieldCheck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SOURCE_TYPE_LABELS } from "@/lib/format"
import type { Source } from "@/types"

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

export function SourceDialog({
  source,
  ruleTitle,
  trigger,
}: {
  source: Source | undefined
  ruleTitle: string
  trigger?: React.ReactNode
}) {
  const verified = source?.verified ?? false

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileText className="size-3.5" />
            View source
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {verified ? (
              <ShieldCheck className="size-4 text-success" />
            ) : (
              <ShieldAlert className="size-4 text-warning" />
            )}
            Source &amp; evidence
          </DialogTitle>
          <DialogDescription>Evidence supporting: {ruleTitle}</DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-border bg-muted/40 px-4 py-2">
          <Row label="Source" value={source?.name ?? "—"} />
          <Row label="Authority" value={source?.authority ?? "—"} />
          <Row
            label="Type"
            value={source ? SOURCE_TYPE_LABELS[source.sourceType] : "—"}
          />
          <Row
            label="Official link"
            value={
              source?.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  Open <ExternalLink className="size-3" />
                </a>
              ) : (
                "Not yet available"
              )
            }
          />
          <Row label="Effective date" value={source?.effectiveDate ?? "To be verified"} />
          <Row label="Last verified" value={source?.lastVerified ?? "To be verified"} />
        </div>

        {verified ? (
          <p className="flex items-start gap-2 rounded-md bg-success-soft/60 px-3 py-2 text-xs leading-relaxed text-success">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0" />
            Verified against the official source shown above.
          </p>
        ) : (
          <p className="flex items-start gap-2 rounded-md bg-warning-soft/60 px-3 py-2 text-xs leading-relaxed text-warning">
            <ShieldAlert className="mt-0.5 size-3.5 shrink-0" />
            Reference data — verification pending. The research team is still confirming this
            information; verify it on the official portal before acting.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
