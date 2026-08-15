"use client"

import { FileText, ShieldCheck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Source } from "@/types"

function Row({ label, value }: { label: string; value: string }) {
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
            <ShieldCheck className="size-4 text-primary" />
            Source &amp; evidence
          </DialogTitle>
          <DialogDescription>Evidence supporting: {ruleTitle}</DialogDescription>
        </DialogHeader>
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-2">
          <Row label="Source" value={source?.sourceName ?? "—"} />
          <Row label="Authority" value={source?.authority ?? "—"} />
          <Row label="Official URL" value={source?.sourceUrl ?? "Not yet available"} />
          <Row label="Effective date" value={source?.effectiveDate ?? "To be verified"} />
          <Row label="Last verified" value={source?.lastVerified ?? "To be verified"} />
          <Row label="Rule version" value={source?.ruleVersion ?? "—"} />
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          This is demo data. Verified official sources, effective dates and verification dates will be attached to each
          recommendation before any of this is presented as guidance.
        </p>
      </DialogContent>
    </Dialog>
  )
}
