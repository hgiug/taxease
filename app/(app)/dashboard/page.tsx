"use client"

import Link from "next/link"
import { ArrowRight, FlaskConical, Landmark, ScrollText } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { BusinessSummaryCard } from "@/components/business-summary-card"
import { OverviewStats } from "@/components/dashboard/overview-stats"
import { NextSteps } from "@/components/dashboard/next-steps"
import { BusinessSwitcher } from "@/components/dashboard/business-switcher"
import { SchemeCard } from "@/components/cards/scheme-card"
import { RegistrationCard } from "@/components/cards/registration-card"
import { Button } from "@/components/ui/button"
import { Disclaimer } from "@/components/disclaimer"
import { useStore } from "@/lib/store"

function SectionHeader({
  title,
  description,
  href,
  cta,
}: {
  title: string
  description: string
  href: string
  cta: string
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground text-pretty">{description}</p>
      </div>
      <Button asChild variant="ghost" size="sm" className="shrink-0 gap-1.5 text-primary">
        <Link href={href}>
          {cta}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  )
}

export default function DashboardPage() {
  const { profile, result, hasCompletedAssessment } = useStore()

  const topRegistrations = result.registrations
    .filter((r) => r.status === "likely_applicable" || r.status === "may_apply")
    .slice(0, 2)
  const topSchemes = result.schemes.filter((s) => s.status !== "low").slice(0, 2)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your business dashboard"
        description="A personalised view of the registrations, compliance and funding that may be relevant to your business."
        action={
          <Button asChild variant="outline" className="gap-1.5">
            <Link href="/assessment">Re-run assessment</Link>
          </Button>
        }
      />

      {!hasCompletedAssessment && (
        <div className="flex items-start gap-3 rounded-xl border border-dashed border-border bg-muted/50 p-4">
          <FlaskConical className="mt-0.5 size-4 shrink-0 text-warning" />
          <div className="flex-1 text-sm">
            <p className="font-medium text-foreground">You&apos;re viewing a sample business.</p>
            <p className="text-muted-foreground text-pretty">
              This is a demo profile running through the same analysis as any real business. Describe your own to see
              your personalised results.
            </p>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <Link href="/assessment">Start yours</Link>
          </Button>
        </div>
      )}

      <BusinessSummaryCard profile={profile} />

      <OverviewStats result={result} />

      <BusinessSwitcher />

      <NextSteps items={result.actionItems} />

      <section className="space-y-4">
        <SectionHeader
          title="Registrations to review"
          description="Based on your business type, location and profile."
          href="/registrations"
          cta="All registrations"
        />
        {topRegistrations.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {topRegistrations.map((r) => (
              <RegistrationCard key={r.rule.id} result={r} />
            ))}
          </div>
        ) : (
          <p className="flex items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
            <ScrollText className="size-4" />
            No high-priority registrations identified yet. Review the full list to be sure.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Funding you may qualify for"
          description="Potential loans, subsidies and schemes matched to your profile."
          href="/benefits"
          cta="All benefits"
        />
        {topSchemes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {topSchemes.map((s) => (
              <SchemeCard key={s.scheme.id} match={s} />
            ))}
          </div>
        ) : (
          <p className="flex items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
            <Landmark className="size-4" />
            No strongly matching schemes yet. Browse all benefits to explore options.
          </p>
        )}
      </section>

      <Disclaimer />
    </div>
  )
}
