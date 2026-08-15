import { CheckCircle2, ExternalLink, IndianRupee, Percent, Sparkles, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SchemeMatchBadge } from "@/components/status-badge"
import { SourceDialog } from "@/components/source-dialog"
import { getSourceById } from "@/data/sources"
import { SCHEME_TYPE_LABELS } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { SchemeMatch } from "@/types"

function MatchBar({ value, status }: { value: number; status: SchemeMatch["status"] }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-1.5 w-24 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            status === "strong"
              ? "bg-success"
              : status === "potential"
                ? "bg-info"
                : status === "needs_verification"
                  ? "bg-warning"
                  : "bg-muted-foreground",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-sm font-semibold tabular-nums text-foreground">{value}%</span>
    </div>
  )
}

function KeyFact({ icon: Icon, label, value }: { icon: typeof IndianRupee; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground/90">{value}</p>
      </div>
    </div>
  )
}

export function SchemeCard({ match }: { match: SchemeMatch }) {
  const { scheme, matchScore, status, matchedConditions, missingConditions, reasons } = match

  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary">
              {SCHEME_TYPE_LABELS[scheme.type]}
            </span>
            <h3 className="mt-2 font-heading text-base font-semibold text-foreground text-balance">{scheme.name}</h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <SchemeMatchBadge status={status} />
          <MatchBar value={matchScore} status={status} />
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {reasons[0] ?? scheme.description}
        </p>

        <div className="grid grid-cols-1 gap-3 rounded-lg border border-border bg-muted/40 p-3 sm:grid-cols-2">
          {scheme.loanAmount && <KeyFact icon={IndianRupee} label="Amount" value={scheme.loanAmount} />}
          {scheme.subsidy && <KeyFact icon={Sparkles} label="Subsidy / benefit" value={scheme.subsidy} />}
          {scheme.interestRate && <KeyFact icon={Percent} label="Interest" value={scheme.interestRate} />}
        </div>

        {matchedConditions.length > 0 && (
          <ul className="space-y-1.5">
            {matchedConditions.slice(0, 3).map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-foreground/90">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" />
                {c}
              </li>
            ))}
          </ul>
        )}

        {missingConditions.length > 0 && (
          <ul className="space-y-1.5">
            {missingConditions.slice(0, 3).map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                <XCircle className="mt-0.5 size-3.5 shrink-0 text-warning" />
                {c}
              </li>
            ))}
          </ul>
        )}

        <p className="rounded-md bg-muted/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          This program appears relevant based on the information provided. Verify the current eligibility
          requirements before applying.
        </p>

        <div className="mt-auto flex items-center gap-1 border-t border-border pt-3">
          <SourceDialog
            source={getSourceById(scheme.sourceId)}
            ruleTitle={scheme.name}
            trigger={
              <button className="rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                Source
              </button>
            }
          />
          {scheme.officialUrl && (
            <a
              href={scheme.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-accent"
            >
              Official details <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
