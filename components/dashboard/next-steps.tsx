import Link from "next/link"
import { ArrowRight, Circle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PriorityBadge } from "@/components/status-badge"
import type { ActionItem } from "@/types"

export function NextSteps({ items }: { items: ActionItem[] }) {
  const top = items.filter((a) => a.status !== "done").slice(0, 3)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-base">Your next steps</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Start here — we ordered these by priority.</p>
        </div>
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-primary">
          <Link href="/action-plan">
            View all
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {top.map((item) => (
          <Link
            key={item.id}
            href="/action-plan"
            className="flex items-start gap-3 rounded-lg border border-border p-3.5 transition-colors hover:bg-accent/40"
          >
            <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <PriorityBadge priority={item.priority} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">{item.description}</p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
