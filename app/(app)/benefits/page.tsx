"use client"

import { PageHeader } from "@/components/page-header"
import { SchemeCard } from "@/components/cards/scheme-card"
import { Disclaimer, DemoBadge } from "@/components/disclaimer"
import { useStore } from "@/lib/store"

export default function BenefitsPage() {
  const { result } = useStore()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Government benefits"
        description="Schemes and benefits that may match your business profile, ranked by how closely they fit. Eligibility must be confirmed with the official source."
        action={<DemoBadge />}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {result.schemeMatches.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </div>

      <Disclaimer />
    </div>
  )
}
