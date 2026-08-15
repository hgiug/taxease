import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { WhyDialog } from "@/components/why-dialog"
import { SourceDialog } from "@/components/source-dialog"
import { getSourceById } from "@/data/mock-sources"
import type { TaxRule } from "@/types"

export function TaxCard({ rule }: { rule: TaxRule }) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-base font-semibold text-foreground">{rule.title}</h3>
          <StatusBadge status={rule.status} />
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">{rule.reason}</p>
        <div className="flex items-center gap-1 border-t border-border pt-3">
          <WhyDialog title={rule.title} reason={rule.reason} detail={rule.detail} />
          <SourceDialog source={getSourceById(rule.sourceId)} ruleTitle={rule.title} trigger={<button className="ml-auto rounded-md px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-accent">View source</button>} />
        </div>
      </CardContent>
    </Card>
  )
}
