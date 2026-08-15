"use client"

import { FlaskConical } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { TaxCard } from "@/components/cards/tax-card"
import { Disclaimer } from "@/components/disclaimer"
import { useStore } from "@/lib/store"
import type { TaxCategory, TaxRule } from "@/types"

const SECTIONS: { category: TaxCategory; title: string; description: string }[] = [
  { category: "gst", title: "GST", description: "Goods & Services Tax registration and filing considerations." },
  {
    category: "income_tax",
    title: "Income tax",
    description: "How business income is likely taxed for your structure.",
  },
  { category: "tds", title: "TDS", description: "Tax deducted at source obligations that may apply." },
  { category: "other", title: "Other compliance", description: "Other tax-related items worth reviewing." },
]

function TaxSection({ title, description, rules }: { title: string; description: string; rules: TaxRule[] }) {
  if (rules.length === 0) return null
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground text-pretty">{description}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {rules.map((rule) => (
          <TaxCard key={rule.id} rule={rule} />
        ))}
      </div>
    </section>
  )
}

export default function CompliancePage() {
  const { result } = useStore()
  const anyUnverified = result.taxResults.some((t) => !t.verified)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tax & compliance"
        description="A modular view of the tax areas relevant to your business. Verified thresholds and rates will appear here as the research team confirms them."
      />

      {anyUnverified && (
        <div className="flex items-start gap-3 rounded-xl border border-warning/20 bg-warning-soft/40 p-4">
          <FlaskConical className="mt-0.5 size-4 shrink-0 text-warning" />
          <p className="text-sm leading-relaxed text-foreground/90 text-pretty">
            <span className="font-medium text-warning">Tax rules are currently being verified.</span> We show which
            areas are likely relevant to your business, but exact thresholds, rates and brackets are intentionally not
            displayed until confirmed against official sources.
          </p>
        </div>
      )}

      {SECTIONS.map((s) => (
        <TaxSection
          key={s.category}
          title={s.title}
          description={s.description}
          rules={result.taxResults.filter((t) => t.category === s.category)}
        />
      ))}

      <Disclaimer />
    </div>
  )
}
