import Link from "next/link"
import {
  Building2,
  Coins,
  MapPin,
  Pencil,
  ShoppingBag,
  Users,
  Briefcase,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CATEGORY_LABELS, STRUCTURE_LABELS, formatINR, salesModel } from "@/lib/format"
import type { BusinessProfile } from "@/types"

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  )
}

export function BusinessSummaryCard({
  profile,
  showEdit = true,
}: {
  profile: BusinessProfile
  showEdit?: boolean
}) {
  return (
    <Card>
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Business</p>
            <h2 className="mt-1 font-heading text-xl font-bold text-foreground">
              {profile.businessName ?? CATEGORY_LABELS[profile.businessCategory]}
            </h2>
            <p className="text-sm text-muted-foreground">
              {CATEGORY_LABELS[profile.businessCategory]} · {profile.businessActivity}
            </p>
          </div>
          {showEdit && (
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/assessment">
                <Pencil className="size-3.5" />
                Edit
              </Link>
            </Button>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Fact icon={MapPin} label="Location" value={`${profile.city}, ${profile.state}`} />
          <Fact icon={Coins} label="Annual turnover" value={formatINR(profile.annualTurnover)} />
          <Fact icon={Users} label="Employees" value={String(profile.employees)} />
          <Fact icon={Briefcase} label="Structure" value={STRUCTURE_LABELS[profile.businessStructure]} />
          <Fact icon={ShoppingBag} label="Sales" value={salesModel(profile.onlineSales, profile.offlineSales)} />
          <Fact
            icon={Building2}
            label="Registrations"
            value={
              [profile.gstRegistered && "GST", profile.udyamRegistered && "Udyam"].filter(Boolean).join(", ") || "None yet"
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
