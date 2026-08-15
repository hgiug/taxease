import { CheckCircle2, CircleAlert, CircleDot, MinusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { PRIORITY_LABELS, STATUS_LABELS } from "@/lib/format"
import type { Priority, ResultStatus } from "@/types"

const STATUS_STYLES: Record<ResultStatus, { cls: string; Icon: typeof CheckCircle2 }> = {
  likely_applicable: {
    cls: "bg-info-soft text-info border-info/25",
    Icon: CircleDot,
  },
  review_needed: {
    cls: "bg-warning-soft text-warning border-warning/25",
    Icon: CircleAlert,
  },
  no_action: {
    cls: "bg-success-soft text-success border-success/25",
    Icon: CheckCircle2,
  },
}

export function StatusBadge({ status, className }: { status: ResultStatus; className?: string }) {
  const { cls, Icon } = STATUS_STYLES[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        cls,
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  )
}

const PRIORITY_STYLES: Record<Priority, string> = {
  high: "bg-destructive/10 text-destructive border-destructive/25",
  medium: "bg-warning-soft text-warning border-warning/25",
  low: "bg-muted text-muted-foreground border-border",
}

export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        PRIORITY_STYLES[priority],
        className,
      )}
    >
      <MinusCircle className="size-3.5" aria-hidden="true" />
      {PRIORITY_LABELS[priority]} priority
    </span>
  )
}
