import {
  CheckCircle2,
  CircleAlert,
  CircleDashed,
  CircleDot,
  CircleHelp,
  MinusCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PRIORITY_LABELS, SCHEME_MATCH_LABELS, STATUS_LABELS } from "@/lib/format"
import type { Priority, ResultStatus, SchemeMatchStatus } from "@/types"

const STATUS_STYLES: Record<ResultStatus, { cls: string; Icon: typeof CheckCircle2 }> = {
  likely_applicable: {
    cls: "bg-info-soft text-info border-info/25",
    Icon: CircleDot,
  },
  may_apply: {
    cls: "bg-warning-soft text-warning border-warning/25",
    Icon: CircleAlert,
  },
  conditional: {
    cls: "bg-secondary text-secondary-foreground border-border",
    Icon: CircleHelp,
  },
  review_needed: {
    cls: "bg-warning-soft text-warning border-warning/25",
    Icon: CircleAlert,
  },
  not_identified: {
    cls: "bg-muted text-muted-foreground border-border",
    Icon: CircleDashed,
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

const MATCH_STYLES: Record<SchemeMatchStatus, { cls: string; Icon: typeof CheckCircle2 }> = {
  strong: {
    cls: "bg-success-soft text-success border-success/25",
    Icon: CheckCircle2,
  },
  potential: {
    cls: "bg-info-soft text-info border-info/25",
    Icon: CircleDot,
  },
  needs_verification: {
    cls: "bg-warning-soft text-warning border-warning/25",
    Icon: CircleAlert,
  },
  low: {
    cls: "bg-muted text-muted-foreground border-border",
    Icon: CircleDashed,
  },
}

export function SchemeMatchBadge({
  status,
  className,
}: {
  status: SchemeMatchStatus
  className?: string
}) {
  const { cls, Icon } = MATCH_STYLES[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        cls,
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {SCHEME_MATCH_LABELS[status]}
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
