"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, MessageSquareText, Sparkles, ListChecks } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { BusinessCategory, BusinessProfile, BusinessStructure } from "@/types"
import { MOCK_BUSINESS_PROFILE } from "@/data/mock-business"
import {
  AGE_OPTIONS,
  CATEGORY_OPTIONS,
  PENDING_KEY,
  STATE_OPTIONS,
  STRUCTURE_OPTIONS,
} from "@/components/assessment/options"

const EXAMPLE =
  "I run a small bakery in Jaipur. We make around ₹12 lakh per year, have 3 employees and sell both from our shop and online."

interface Answers {
  businessCategory?: BusinessCategory
  businessActivity: string
  state?: string
  city: string
  annualTurnover: string
  employees: string
  businessStructure?: BusinessStructure
  businessAgeMonths?: number
  onlineSales: boolean
  offlineSales: boolean
  interstateSales: boolean
  imports: boolean
  exports: boolean
  gstRegistered: boolean
  udyamRegistered: boolean
}

const EMPTY: Answers = {
  businessActivity: "",
  city: "",
  annualTurnover: "",
  employees: "",
  onlineSales: false,
  offlineSales: false,
  interstateSales: false,
  imports: false,
  exports: false,
  gstRegistered: false,
  udyamRegistered: false,
}

function YesNo({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3.5 py-2.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex overflow-hidden rounded-md border border-border" role="group" aria-label={label}>
        {[
          { v: true, t: "Yes" },
          { v: false, t: "No" },
        ].map((opt) => (
          <button
            key={opt.t}
            type="button"
            aria-pressed={value === opt.v}
            onClick={() => onChange(opt.v)}
            className={cn(
              "px-3 py-1 text-sm font-medium transition-colors",
              value === opt.v ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted",
            )}
          >
            {opt.t}
          </button>
        ))}
      </div>
    </div>
  )
}

const STEP_TITLES = ["The basics", "Scale & structure", "Sales & registrations"]

export function AssessmentFlow() {
  const router = useRouter()
  const [mode, setMode] = useState<"describe" | "guided">("describe")
  const [description, setDescription] = useState("")
  const [step, setStep] = useState(0)
  const [a, setA] = useState<Answers>(EMPTY)

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => setA((prev) => ({ ...prev, [key]: value }))

  const guidedProgress = useMemo(() => {
    const fields = [
      a.businessCategory,
      a.state,
      a.annualTurnover,
      a.employees,
      a.businessStructure,
      a.onlineSales || a.offlineSales,
    ]
    const filled = fields.filter(Boolean).length
    return Math.round((filled / fields.length) * 100)
  }, [a])

  const startAnalysis = (payload: { description: string } | { profile: BusinessProfile }) => {
    try {
      window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(payload))
    } catch {
      // ignore
    }
    router.push("/analyzing")
  }

  const submitDescribe = () => {
    startAnalysis({ description: description.trim() || EXAMPLE })
  }

  const submitGuided = () => {
    const profile: BusinessProfile = {
      ...MOCK_BUSINESS_PROFILE,
      id: "user-business",
      businessName: undefined,
      businessCategory: a.businessCategory ?? MOCK_BUSINESS_PROFILE.businessCategory,
      businessActivity: a.businessActivity || MOCK_BUSINESS_PROFILE.businessActivity,
      state: a.state ?? MOCK_BUSINESS_PROFILE.state,
      city: a.city || MOCK_BUSINESS_PROFILE.city,
      annualTurnover: a.annualTurnover ? Number(a.annualTurnover) : MOCK_BUSINESS_PROFILE.annualTurnover,
      employees: a.employees ? Number(a.employees) : MOCK_BUSINESS_PROFILE.employees,
      businessStructure: a.businessStructure ?? MOCK_BUSINESS_PROFILE.businessStructure,
      businessAgeMonths: a.businessAgeMonths ?? MOCK_BUSINESS_PROFILE.businessAgeMonths,
      onlineSales: a.onlineSales,
      offlineSales: a.offlineSales,
      interstateSales: a.interstateSales,
      imports: a.imports,
      exports: a.exports,
      gstRegistered: a.gstRegistered,
      udyamRegistered: a.udyamRegistered,
      rawDescription: undefined,
    }
    startAnalysis({ profile })
  }

  return (
    <div className="w-full max-w-2xl">
      <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="describe" className="gap-1.5">
            <MessageSquareText className="size-4" />
            Describe it
          </TabsTrigger>
          <TabsTrigger value="guided" className="gap-1.5">
            <ListChecks className="size-4" />
            Answer questions
          </TabsTrigger>
        </TabsList>

        {/* Option A — free text */}
        <TabsContent value="describe" className="mt-4">
          <Card>
            <CardContent className="space-y-4 p-5 sm:p-6">
              <div>
                <Label htmlFor="desc" className="text-base font-semibold">
                  Tell us about your business in your own words
                </Label>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mention what you do, where you are, roughly how much you earn, and how you sell. Skip anything you
                  don&apos;t know.
                </p>
              </div>
              <Textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={EXAMPLE}
                className="min-h-40 resize-none text-base leading-relaxed"
              />
              <button
                type="button"
                onClick={() => setDescription(EXAMPLE)}
                className="text-xs font-medium text-primary hover:underline"
              >
                Use the example
              </button>
              <div className="flex justify-end">
                <Button size="lg" className="gap-2" onClick={submitDescribe}>
                  <Sparkles className="size-4" />
                  Analyze my business
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Option B — guided */}
        <TabsContent value="guided" className="mt-4">
          <Card>
            <CardContent className="space-y-5 p-5 sm:p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">
                    Step {step + 1} of {STEP_TITLES.length} · {STEP_TITLES[step]}
                  </span>
                  <span className="text-muted-foreground">{guidedProgress}% complete</span>
                </div>
                <Progress value={((step + 1) / STEP_TITLES.length) * 100} />
              </div>

              {step === 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Business category">
                    <Select
                      value={a.businessCategory}
                      onValueChange={(v) => set("businessCategory", v as BusinessCategory)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="What do you do?" hint="e.g. bakery, tailoring">
                    <Input
                      value={a.businessActivity}
                      onChange={(e) => set("businessActivity", e.target.value)}
                      placeholder="Business activity"
                    />
                  </Field>
                  <Field label="State">
                    <Select value={a.state} onValueChange={(v) => set("state", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATE_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="City / district">
                    <Input value={a.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. Jaipur" />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Annual turnover (₹)" hint="Rough yearly sales">
                    <Input
                      inputMode="numeric"
                      value={a.annualTurnover}
                      onChange={(e) => set("annualTurnover", e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="e.g. 1200000"
                    />
                  </Field>
                  <Field label="Number of employees">
                    <Input
                      inputMode="numeric"
                      value={a.employees}
                      onChange={(e) => set("employees", e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="e.g. 3"
                    />
                  </Field>
                  <Field label="Business structure">
                    <Select
                      value={a.businessStructure}
                      onValueChange={(v) => set("businessStructure", v as BusinessStructure)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {STRUCTURE_OPTIONS.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="How long have you been running?">
                    <Select
                      value={a.businessAgeMonths ? String(a.businessAgeMonths) : undefined}
                      onValueChange={(v) => set("businessAgeMonths", Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {AGE_OPTIONS.map((o) => (
                          <SelectItem key={o.value} value={String(o.value)}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-3">
                  <YesNo label="Do you sell online?" value={a.onlineSales} onChange={(v) => set("onlineSales", v)} />
                  <YesNo
                    label="Do you sell from a shop / offline?"
                    value={a.offlineSales}
                    onChange={(v) => set("offlineSales", v)}
                  />
                  <YesNo
                    label="Do you sell to other states?"
                    value={a.interstateSales}
                    onChange={(v) => set("interstateSales", v)}
                  />
                  <YesNo label="Do you import goods?" value={a.imports} onChange={(v) => set("imports", v)} />
                  <YesNo label="Do you export goods?" value={a.exports} onChange={(v) => set("exports", v)} />
                  <YesNo
                    label="Are you already GST registered?"
                    value={a.gstRegistered}
                    onChange={(v) => set("gstRegistered", v)}
                  />
                  <YesNo
                    label="Do you have Udyam / MSME registration?"
                    value={a.udyamRegistered}
                    onChange={(v) => set("udyamRegistered", v)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between border-t border-border pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="gap-1.5"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
                {step < STEP_TITLES.length - 1 ? (
                  <Button onClick={() => setStep((s) => s + 1)} className="gap-1.5">
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button onClick={submitGuided} className="gap-1.5">
                    <Sparkles className="size-4" />
                    Analyze my business
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        You don&apos;t need to answer everything. We&apos;ll fill in reasonable assumptions and you can edit later.
      </p>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
