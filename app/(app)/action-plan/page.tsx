"use client"

import { CheckCircle2, Circle, CircleDashed, Info } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { PriorityBadge } from "@/components/status-badge"
import { SourceDialog } from "@/components/source-dialog"
import { Disclaimer, DemoBadge } from "@/components/disclaimer"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { getSourceById } from "@/data/mock-sources"
import { useStore } from "@/lib/store"
import type { ActionItem, ActionStatus } from "@/types"

const STATUS_CYCLE: Record<ActionStatus, ActionStatus> = {
  not_started: "in_progress",
  in_progress: "done",
  done: "not_started",
}

function StatusButton({ status, onClick }: { status: ActionStatus; onClick: () => void }) {
  const config = {
    not_started: { Icon: Circle, label: "Mark as started", cls: "text-muted-foreground" },
    in_progress: { Icon: CircleDashed, label: "Mark as done", cls: "text-info" },
    done: { Icon: CheckCircle2, label: "Reset step", cls: "text-success" },
  }[status]
  const { Icon, label, cls } = config
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full border border-border transition-colors hover:bg-accent",
        cls,
      )}
    >
      <Icon className="size-5" />
    </button>
  )
}

function ActionRow({
  item,
  onCycle,
}: {
  item: ActionItem
  onCycle: (id: string, next: ActionStatus) => void
}) {
  return (
    <Card className={cn(item.status === "done" && "opacity-70")}>
      <CardContent className="flex gap-4 p-5">
        <div className="flex flex-col items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary tabular-nums">
            {item.order}
          </span>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3
              className={cn(
                "font-heading text-base font-semibold text-foreground",
                item.status === "done" && "line-through",
              )}
            >
              {item.title}
            </h3>
            <PriorityBadge priority={item.priority} />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{item.description}</p>

          <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3">
            <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p className="text-sm text-foreground/90">
              <span className="font-medium">Why it matters: </span>
              {item.whyItMatters}
            </p>
          </div>

          <div className="flex items-center gap-2 border-t border-border pt-3">
            <SourceDialog
              source={getSourceById(item.sourceId)}
              ruleTitle={item.title}
              trigger={
                <button className="rounded-md px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-accent">
                  View source
                </button>
              }
            />
            <span className="ml-auto text-xs font-medium text-muted-foreground">
              {item.status === "not_started" && "Not started"}
              {item.status === "in_progress" && "In progress"}
              {item.status === "done" && "Done"}
            </span>
            <StatusButton status={item.status} onClick={() => onCycle(item.id, STATUS_CYCLE[item.status])} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ActionPlanPage() {
  const { result, setActionStatus } = useStore()
  const items = [...result.actionItems].sort((a, b) => a.order - b.order)
  const doneCount = items.filter((a) => a.status === "done").length
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your recommended next steps"
        description="A prioritised checklist built from your profile. Work through it top to bottom — tap the circle on each step to track progress."
        action={<DemoBadge />}
      />

      <Card>
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">
              {doneCount} of {items.length} steps done
            </p>
            <p className="text-sm text-muted-foreground">Your progress is saved for this session.</p>
          </div>
          <div className="flex items-center gap-3 sm:w-64">
            <Progress value={pct} className="flex-1" />
            <span className="text-sm font-semibold tabular-nums text-foreground">{pct}%</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {items.map((item) => (
          <ActionRow key={item.id} item={item} onCycle={setActionStatus} />
        ))}
      </div>

      <Disclaimer />
    </div>
  )
}
