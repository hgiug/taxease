"use client"

import { PageHeader } from "@/components/page-header"
import { RegistrationCard } from "@/components/cards/registration-card"
import { Disclaimer, DemoBadge } from "@/components/disclaimer"
import { useStore } from "@/lib/store"

export default function RegistrationsPage() {
  const { result } = useStore()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Registrations"
        description="Registrations that may be relevant to your business. These are illustrative — confirm the exact requirements against an official source before applying."
        action={<DemoBadge />}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {result.registrationResults.map((reg) => (
          <RegistrationCard key={reg.id} reg={reg} />
        ))}
      </div>

      <Disclaimer />
    </div>
  )
}
