"use client"

import { useRouter } from "next/navigation"
import { Database, RotateCcw, ShieldCheck } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Disclaimer } from "@/components/disclaimer"
import { useStore } from "@/lib/store"

export default function SettingsPage() {
  const router = useRouter()
  const { businesses, reset } = useStore()

  const handleReset = () => {
    reset()
    router.push("/")
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your session data and learn how TaxEase handles information."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="size-4 text-primary" />
            Your data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            You currently have {businesses.length} business profile{businesses.length === 1 ? "" : "s"} stored in this
            browser session. TaxEase does not yet save data to an account — profiles live in your browser and clear
            when the session ends. A verified database will replace this later.
          </p>
          <Button variant="outline" className="gap-1.5" onClick={handleReset}>
            <RotateCcw className="size-4" />
            Reset all data
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="size-4 text-primary" />
            Data & verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground text-pretty">
          <p>
            The registrations, schemes and tax notes shown across TaxEase are seeded from a reference dataset. They are
            clearly labelled as reference data until the research team verifies them against official government
            sources.
          </p>
          <p>
            TaxEase provides informational guidance only. It is not a substitute for professional tax, legal or
            financial advice, and it never guarantees eligibility for any scheme or loan.
          </p>
        </CardContent>
      </Card>

      <Disclaimer />
    </div>
  )
}
