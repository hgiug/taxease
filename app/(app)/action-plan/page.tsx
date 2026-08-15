"use client"

import { CheckCircle2, Circle, CircleDot, Info } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PriorityBadge } from "@/components/status-badge"
import { SourceDialog } from "@/components/source-dialog"
import { Disclaimer } from "@/components/disclaimer"
import { getSourceById } from "@/data/sources"
import { useStore } from "@/lib/store"
import { ACTION_STATUS_LABELS } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { ActionItem, ActionStatus } from "@/types"

const NEXT_STATUS: Record<ActionStatus, ActionStatus> = {
  not_started: "in_progress",
  in_progress: "done",
  done: "not_started",
}

function StatusToggle({ status, onClick }: { status: ActionStatus; onClick: () => void }) {
  const Icon = status === "done" ? CheckCircle2 : status === "in_progress" ? CircleDot : Circle
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Mark step (currently ${ACTION_STATUS_LABELS[status]})`}
      className={cn(
        "mt-0.5 shrink-0 rounded-full transition-colors",
        status === "done" ? "text-success" : status === "in_progress" ? "text-info" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="size-5" />
    </button>
  )
}

function ActionRow({ item, onToggle }: { item: ActionItem; onToggle: () => void }) {
  const source = getSourceById(item.sourceId)
  return (
    <Card className={cn(item.status === "done" && "opacity-70")}>
      <CardContent className="flex gap-3 p-5">
        <StatusToggle status={item.status} onClick={onToggle} />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="grid size-5 place-items-center rounded-full bg-muted text-[11px] font-semibold tabular-nums text-muted-foreground">
              {item.order}
            </span>
            <h3
              className={cn(
                "font-heading text-base font-semibold text-foreground",
                item.status === "done" && "line-through",
              )}
            >
              {item.title}
            </h3>
            <PriorityBadge priority={item.priority} />
            <span className="ml-auto text-xs font-medium text-muted-foreground">
              {ACTION_STATUS_LABELS[item.status]}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-foreground/90 text-pretty">{item.description}</p>

          <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3">
            <Info className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground text-pretty">{item.whyItMatters}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
            {item.relevantInfo && <span className="text-xs text-muted-foreground">{item.relevantInfo}</span>}
            {source && (
              <SourceDialog
                source={source}
                ruleTitle={item.title}
                trigger={
                  <button className="rounded-md text-xs font-medium text-primary hover:underline">Source</button>
                }
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ActionPlanPage() {
  const { result, setActionStatus } = useStore()
  const items = result.actionItems
  const done = items.filter((a) => a.status === "done").length
  const pct = items.length ? Math.round((done / items.length) * 100) : 0

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your action plan"
        description="A personalised, prioritised checklist generated from your business analysis. Tap the circle to track your progress."
      />

      <Card>
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Progress</p>
              <p className="text-sm tabular-nums text-muted-foreground">
                {done} of {items.length} done
              </p>
            </div>
            <Progress value={pct} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {items.map((item) => (
          <ActionRow key={item.id} item={item} onToggle={() => setActionStatus(item.id, NEXT_STATUS[item.status])} />
        ))}
      </div>

      <Disclaimer />
    </div>
  )
}
