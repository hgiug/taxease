"use client"

import { useRouter } from "next/navigation"
import { RotateCcw, TriangleAlert } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Disclaimer } from "@/components/disclaimer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"

export default function SettingsPage() {
  const router = useRouter()
  const { reset } = useStore()

  const handleReset = () => {
    reset()
    router.push("/")
  }

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your session and learn how TaxEase handles your information."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">About this demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            TaxEase is a demonstration of an AI-powered tax-simplicity advisor for small and informal businesses. All
            tax items, registrations, schemes and sources shown are illustrative placeholders — not real legal or tax
            information.
          </p>
          <p>
            Your business details are kept only for this browser session so the pages can share them. Nothing is sent
            to a permanent database in this version.
          </p>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TriangleAlert className="size-4 text-destructive" />
            Reset session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Clear your current business profile and analysis, then start a fresh assessment.
          </p>
          <Button variant="outline" className="gap-1.5" onClick={handleReset}>
            <RotateCcw className="size-4" />
            Reset and start over
          </Button>
        </CardContent>
      </Card>

      <Disclaimer />
    </div>
  )
}
