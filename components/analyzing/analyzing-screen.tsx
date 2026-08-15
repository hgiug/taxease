"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { PENDING_KEY } from "@/components/assessment/options"
import type { AnalysisResult, BusinessProfile } from "@/types"

const STEPS = [
  "Reading your business details",
  "Matching against tax rules",
  "Checking registration requirements",
  "Finding government schemes you may qualify for",
  "Building your personalised action plan",
]

type PendingPayload = { description: string } | { profile: BusinessProfile }

export function AnalyzingScreen() {
  const router = useRouter()
  const { setResultDirect } = useStore()
  const [active, setActive] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    let payload: PendingPayload | null = null
    try {
      const raw = window.sessionStorage.getItem(PENDING_KEY)
      if (raw) payload = JSON.parse(raw) as PendingPayload
    } catch {
      payload = null
    }

    // Animate the checklist regardless of network speed.
    const stepTimers: ReturnType<typeof setTimeout>[] = []
    STEPS.forEach((_, i) => {
      stepTimers.push(setTimeout(() => setActive(i + 1), 550 * (i + 1)))
    })

    const analyze = async () => {
      let result: AnalysisResult | null = null
      try {
        const res = await fetch("/api/analyze-business", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload ?? { description: "" }),
        })
        if (res.ok) {
          result = (await res.json()) as AnalysisResult
        }
      } catch {
        result = null
      }

      // Ensure the animation has had time to feel deliberate.
      const minDelay = new Promise<void>((r) => setTimeout(r, STEPS.length * 550 + 400))
      await minDelay

      if (result) {
        setResultDirect(result)
        try {
          window.sessionStorage.removeItem(PENDING_KEY)
        } catch {
          // ignore
        }
      }
      router.replace("/dashboard")
    }

    void analyze()

    return () => {
      stepTimers.forEach(clearTimeout)
    }
  }, [router, setResultDirect])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden />
            </span>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Analysing your business</h1>
              <p className="text-sm text-muted-foreground">This usually takes a few seconds</p>
            </div>
          </div>

          <ol className="space-y-3" aria-live="polite">
            {STEPS.map((label, i) => {
              const done = i < active
              const current = i === active
              return (
                <li
                  key={label}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    done && "text-foreground",
                    current && "bg-secondary text-foreground",
                    !done && !current && "text-muted-foreground",
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />
                  ) : current ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" aria-hidden />
                  ) : (
                    <span className="h-4 w-4 shrink-0 rounded-full border border-border" aria-hidden />
                  )}
                  <span>{label}</span>
                </li>
              )
            })}
          </ol>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground text-pretty">
          TaxEase provides simplified, general information for demo purposes only. It is not legal, tax, or financial
          advice.
        </p>
      </div>
    </div>
  )
}
