import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroPreview } from "@/components/landing/hero-preview"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            Built for small &amp; informal businesses in India
          </span>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl">
            Understand your business obligations. Without the jargon.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
            An AI-powered assistant that helps small businesses understand taxes, registrations, compliance and
            government benefits in simple language.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/assessment">
                Analyze my business
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            No sign-up required for the demo. We don&apos;t claim legal or tax certification.
          </p>
        </div>

        <HeroPreview />
      </div>
    </section>
  )
}
