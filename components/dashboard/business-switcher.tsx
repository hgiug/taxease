"use client"

import Link from "next/link"
import { Building2, Check, Plus, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { CATEGORY_LABELS, formatINR } from "@/lib/format"

/**
 * "My Businesses" — lets the user keep and switch between multiple business
 * profiles. State lives in the client store today; it will move to the
 * database later without changing this component.
 */
export function BusinessSwitcher() {
  const { businesses, activeId, switchBusiness, removeBusiness } = useStore()

  return (
    <section aria-labelledby="my-businesses" className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 id="my-businesses" className="font-heading text-base font-semibold text-foreground">
            My businesses
          </h2>
          <p className="text-sm text-muted-foreground">Switch between profiles or add another business.</p>
        </div>
        <Button asChild size="sm" variant="outline" className="gap-1.5">
          <Link href="/assessment">
            <Plus className="size-4" />
            Add business
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {businesses.map((b) => {
          const active = b.id === activeId
          const p = b.profile
          return (
            <Card
              key={b.id}
              className={cn(
                "relative transition-colors",
                active ? "border-primary ring-1 ring-primary/30" : "hover:border-primary/40",
              )}
            >
              <CardContent className="p-4">
                <button
                  type="button"
                  onClick={() => switchBusiness(b.id)}
                  className="flex w-full items-start gap-3 text-left"
                  aria-pressed={active}
                >
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                    <Building2 className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-foreground">
                        {p.businessName ?? CATEGORY_LABELS[p.businessCategory]}
                      </span>
                      {active && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          <Check className="size-3" /> Active
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {[p.city, p.state].filter(Boolean).join(", ") || "Location not set"}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {formatINR(p.annualTurnover)} · {p.employees} staff
                    </span>
                  </span>
                </button>

                {businesses.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${p.businessName ?? "business"}`}
                    className="absolute right-1.5 top-1.5 size-7 text-muted-foreground hover:text-destructive"
                    onClick={() => removeBusiness(b.id)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
