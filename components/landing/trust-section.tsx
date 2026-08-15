import Link from "next/link"
import { ArrowRight, BookOpenCheck, MessageSquareText, ShieldCheck, Store } from "lucide-react"
import { Button } from "@/components/ui/button"

const POINTS = [
  {
    icon: MessageSquareText,
    title: "Simple language",
    body: "Everything is explained the way you'd explain it to a friend — no legalese, no confusing forms.",
  },
  {
    icon: Store,
    title: "Personalized guidance",
    body: "Recommendations are shaped by your specific business — its size, location, structure and how you sell.",
  },
  {
    icon: BookOpenCheck,
    title: "Source-backed",
    body: "Every recommendation is designed to link to an official source, effective date and verification date.",
  },
  {
    icon: ShieldCheck,
    title: "Made for small businesses",
    body: "Built for shop owners, makers and informal businesses — not accountants or large enterprises.",
  },
]

export function TrustSection() {
  return (
    <section id="trust" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Why TaxEase</p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground text-balance">
              Guidance you can trust, in language you actually understand
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
              TaxEase helps you understand what may apply to your business and what to do next. It is informational
              guidance — not a substitute for professional tax, legal or financial advice.
            </p>
            <Button asChild className="mt-6 gap-2">
              <Link href="/assessment">
                Start your assessment
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {POINTS.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="rounded-xl border border-border bg-card p-5">
                  <span className="grid size-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
