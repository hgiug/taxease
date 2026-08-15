import type { Metadata } from "next"
import Link from "next/link"
import { AssessmentFlow } from "@/components/assessment/assessment-flow"
import { Logo } from "@/components/brand/logo"
import { DemoBadge } from "@/components/disclaimer"

export const metadata: Metadata = {
  title: "Business assessment",
  description: "Tell us about your business and get a clear, plain-language tax and compliance overview.",
}

export default function AssessmentPage() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border bg-card/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/" aria-label="TaxEase home">
            <Logo />
          </Link>
          <DemoBadge />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <AssessmentFlow />
      </main>
    </div>
  )
}
