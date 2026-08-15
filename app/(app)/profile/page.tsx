"use client"

import Link from "next/link"
import { Pencil } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { BusinessSummaryCard } from "@/components/business-summary-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Disclaimer } from "@/components/disclaimer"
import { useStore } from "@/lib/store"
import { CATEGORY_LABELS, STRUCTURE_LABELS, formatINR, salesModel } from "@/lib/format"

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm font-medium text-foreground">{value}</dd>
    </div>
  )
}

function yesNo(v: boolean) {
  return v ? "Yes" : "No"
}

export default function ProfilePage() {
  const { profile } = useStore()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your business profile"
        description="This is the understanding we built from your description. Everything on the other pages is based on these details — keep them accurate for the best results."
        action={
          <Button asChild className="gap-1.5">
            <Link href="/assessment">
              <Pencil className="size-4" />
              Update details
            </Link>
          </Button>
        }
      />

      <BusinessSummaryCard profile={profile} showEdit={false} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Business details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-border">
              <DetailRow label="Category" value={CATEGORY_LABELS[profile.businessCategory]} />
              <DetailRow label="Activity" value={profile.businessActivity} />
              <DetailRow label="Structure" value={STRUCTURE_LABELS[profile.businessStructure]} />
              <DetailRow label="Location" value={`${profile.city}, ${profile.state}`} />
              <DetailRow label="Annual turnover" value={formatINR(profile.annualTurnover)} />
              <DetailRow label="Employees" value={String(profile.employees)} />
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sales & registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-border">
              <DetailRow label="Sales channels" value={salesModel(profile.onlineSales, profile.offlineSales)} />
              <DetailRow label="Sells in other states" value={yesNo(profile.interstateSales)} />
              <DetailRow label="Imports goods" value={yesNo(profile.imports)} />
              <DetailRow label="Exports goods" value={yesNo(profile.exports)} />
              <Separator className="my-0" />
              <DetailRow label="GST registered" value={yesNo(profile.gstRegistered)} />
              <DetailRow label="Udyam (MSME) registered" value={yesNo(profile.udyamRegistered)} />
            </dl>
          </CardContent>
        </Card>
      </div>

      {profile.rawDescription && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">What you told us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="rounded-lg bg-muted p-4 text-sm leading-relaxed text-foreground">
              {profile.rawDescription}
            </p>
          </CardContent>
        </Card>
      )}

      <Disclaimer />
    </div>
  )
}
