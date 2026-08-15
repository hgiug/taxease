"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { BusinessSummaryCard } from "@/components/business-summary-card"
import { OverviewStats } from "@/components/dashboard/overview-stats"
import { NextSteps } from "@/components/dashboard/next-steps"
import { TaxCard } from "@/components/cards/tax-card"
import { SchemeCard } from "@/components/cards/scheme-card"
import { Button } from "@/components/ui/button"
import { Disclaimer, DemoBadge } from "@/components/disclaimer"
import { useStore } from "@/lib/store"

function SectionHeader({
  title,
  hint,
  href,
  linkLabel,
}: {
  title: string
  hint: string
  href: string
  linkLabel: string
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
      <Button asChild variant="ghost" size="sm" className="gap-1.5 text-primary">
        <Link href={href}>
          {linkLabel}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  )
}

export default function DashboardPage() {
  const { profile, result } = useStore()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your business overview"
        description="A plain-language snapshot of what may apply to your business — taxes, registrations, benefits and the steps to take next."
        action={<DemoBadge />}
      />

      <BusinessSummaryCard profile={profile} />

      <OverviewStats result={result} />

      <NextSteps items={result.actionItems} />

      <section className="space-y-4">
        <SectionHeader
          title="Tax & compliance"
          hint="What may apply based on your profile."
          href="/compliance"
          linkLabel="View all"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result.taxResults.map((rule) => (
            <TaxCard key={rule.id} rule={rule} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Government benefits"
          hint="Schemes matched to your business."
          href="/benefits"
          linkLabel="View all"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result.schemeMatches.slice(0, 3).map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </section>

      <Disclaimer />
    </div>
  )
}
