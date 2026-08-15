"use client"

import { PageHeader } from "@/components/page-header"
import { TaxCard } from "@/components/cards/tax-card"
import { Disclaimer, DemoBadge } from "@/components/disclaimer"
import { useStore } from "@/lib/store"

export default function CompliancePage() {
  const { result } = useStore()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tax & compliance"
        description="Areas of tax and compliance that may apply to your business. Each item explains why it may matter and links to the source behind it."
        action={<DemoBadge />}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {result.taxResults.map((rule) => (
          <TaxCard key={rule.id} rule={rule} />
        ))}
      </div>

      <Disclaimer />
    </div>
  )
}
