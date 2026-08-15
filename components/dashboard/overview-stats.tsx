import Link from "next/link"
import { ClipboardList, FileCheck2, Landmark, Receipt } from "lucide-react"
import type { AnalysisResult } from "@/types"

function StatCard({
  href,
  icon: Icon,
  value,
  label,
  hint,
}: {
  href: string
  icon: typeof Receipt
  value: number
  label: string
  hint: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
    >
      <div className="flex items-center justify-between">
        <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <span className="font-heading text-3xl font-bold tabular-nums text-foreground">{value}</span>
      </div>
      <p className="mt-3 text-sm font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </Link>
  )
}

export function OverviewStats({ result }: { result: AnalysisResult }) {
  const applicableTax = result.taxResults.filter((t) => t.status !== "not_identified").length
  const pendingReg = result.registrations.filter(
    (r) => r.status === "likely_applicable" || r.status === "may_apply" || r.status === "conditional",
  ).length
  const relevantSchemes = result.schemes.filter((s) => s.status !== "low").length
  const openActions = result.actionItems.filter((a) => a.status !== "done").length

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      <StatCard href="/compliance" icon={Receipt} value={applicableTax} label="Tax items" hint="may apply to you" />
      <StatCard
        href="/registrations"
        icon={FileCheck2}
        value={pendingReg}
        label="Registrations"
        hint="worth reviewing"
      />
      <StatCard
        href="/benefits"
        icon={Landmark}
        value={relevantSchemes}
        label="Schemes"
        hint="potentially relevant"
      />
      <StatCard
        href="/action-plan"
        icon={ClipboardList}
        value={openActions}
        label="Action steps"
        hint="still to do"
      />
    </div>
  )
}
