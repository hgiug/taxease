import { ClipboardList, Cpu, ListChecks } from "lucide-react"

const STEPS = [
  {
    icon: ClipboardList,
    title: "Tell us about your business",
    body: "Describe your business in your own words, or answer a few simple questions. No paperwork, no jargon.",
  },
  {
    icon: Cpu,
    title: "We analyze your situation",
    body: "We turn your answers into a clear business profile and check it against tax, registration and benefit rules.",
  },
  {
    icon: ListChecks,
    title: "Get a personalized action plan",
    body: "See what likely applies to you, why it matters, and the exact next steps — each backed by a source.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">How it works</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground text-balance">
            From plain language to a clear plan in three steps
          </h2>
        </div>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <li key={step.title} className="relative rounded-xl border border-border bg-background p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-heading text-sm font-bold text-muted-foreground">Step {i + 1}</span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
