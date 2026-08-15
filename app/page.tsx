import { MarketingHeader } from "@/components/landing/marketing-header"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { TrustSection } from "@/components/landing/trust-section"
import { MarketingFooter } from "@/components/landing/marketing-footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <TrustSection />
      </main>
      <MarketingFooter />
    </div>
  )
}
