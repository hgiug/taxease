import { Building2, CircleAlert, ExternalLink, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge, PriorityBadge } from "@/components/status-badge"
import { WhyDialog } from "@/components/why-dialog"
import { SourceDialog } from "@/components/source-dialog"
import { getSourceById } from "@/data/sources"
import type { RegistrationResult } from "@/types"

export function RegistrationCard({ result }: { result: RegistrationResult }) {
  const { rule, status, priority, whyApplies, whatToVerify } = result

  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-base font-semibold text-foreground text-balance">{rule.name}</h3>
          <StatusBadge status={status} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <PriorityBadge priority={priority} />
          {rule.stateSpecific && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <Building2 className="size-3" />
              State-specific
            </span>
          )}
        </div>

        <div className="rounded-lg border border-border bg-muted/40 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Why this may apply</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90 text-pretty">{whyApplies}</p>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-warning/20 bg-warning-soft/40 p-3">
          <CircleAlert className="mt-0.5 size-3.5 shrink-0 text-warning" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-warning">What to verify</p>
            <p className="mt-0.5 text-sm leading-relaxed text-foreground/90 text-pretty">{whatToVerify}</p>
          </div>
        </div>

        {rule.documents && rule.documents.length > 0 && (
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <FileText className="size-3.5" />
              Typical documents
            </p>
            <ul className="mt-2 space-y-1">
              {rule.documents.map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex items-center gap-1 border-t border-border pt-3">
          <WhyDialog title={rule.name} reason={whyApplies} detail={rule.description} />
          {rule.officialUrl ? (
            <a
              href={rule.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-accent"
            >
              Official portal <ExternalLink className="size-3.5" />
            </a>
          ) : (
            <SourceDialog
              source={getSourceById(rule.sourceId)}
              ruleTitle={rule.name}
              trigger={
                <button className="ml-auto rounded-md px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-accent">
                  View source
                </button>
              }
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
