import { FileText, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { WhyDialog } from "@/components/why-dialog"
import { SourceDialog } from "@/components/source-dialog"
import { getSourceById } from "@/data/mock-sources"
import type { RegistrationRule } from "@/types"

export function RegistrationCard({ reg }: { reg: RegistrationRule }) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-base font-semibold text-foreground">{reg.title}</h3>
          <StatusBadge status={reg.status} />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{reg.reason}</p>

        <div className="rounded-lg border border-border bg-muted/40 p-3">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <FileText className="size-3.5" />
            Typical documents
          </p>
          <ul className="mt-2 space-y-1">
            {reg.documents.map((doc) => (
              <li key={doc} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        <p className="flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
          <Send className="mt-0.5 size-3.5 shrink-0" />
          {reg.applicationHint}
        </p>

        <div className="mt-auto flex items-center gap-1 border-t border-border pt-3">
          <WhyDialog title={reg.title} reason={reg.reason} detail={reg.detail} />
          <SourceDialog
            source={getSourceById(reg.sourceId)}
            ruleTitle={reg.title}
            trigger={
              <button className="ml-auto rounded-md px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-accent">
                View source
              </button>
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
