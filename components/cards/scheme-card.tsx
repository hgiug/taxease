import { ArrowRight, CheckCircle2, FileText, Gift } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SourceDialog } from "@/components/source-dialog"
import { getSourceById } from "@/data/mock-sources"
import { cn } from "@/lib/utils"
import type { GovernmentScheme } from "@/types"

function MatchRing({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-1.5 w-24 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            value >= 75 ? "bg-success" : value >= 60 ? "bg-info" : "bg-warning",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-sm font-semibold tabular-nums text-foreground">{value}%</span>
    </div>
  )
}

export function SchemeCard({ scheme }: { scheme: GovernmentScheme }) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-base font-semibold text-foreground text-balance">{scheme.name}</h3>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">Match</p>
          <MatchRing value={scheme.matchPercentage} />
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{scheme.whyItMatches}</p>

        <div className="flex items-start gap-2 rounded-lg border border-success/20 bg-success-soft/60 p-3">
          <Gift className="mt-0.5 size-4 shrink-0 text-success" />
          <p className="text-sm font-medium text-foreground">{scheme.potentialBenefit}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Eligibility (demo)</p>
          <ul className="mt-2 space-y-1.5">
            {scheme.eligibility.map((e) => (
              <li key={e} className="flex items-start gap-2 text-sm text-foreground/90">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" />
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <FileText className="size-3.5" />
          {scheme.documents.length} documents typically needed
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-border pt-3">
          <Button size="sm" className="gap-1.5">
            Explore
            <ArrowRight className="size-3.5" />
          </Button>
          <SourceDialog
            source={getSourceById(scheme.sourceId)}
            ruleTitle={scheme.name}
            trigger={
              <button className="ml-auto rounded-md px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-accent">
                Official source
              </button>
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
