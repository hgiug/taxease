import { CheckCircle2, CircleAlert, CircleDot, MapPin } from "lucide-react"

export function HeroPreview() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-accent/40 blur-2xl" aria-hidden="true" />
      <div className="relative rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Business overview</p>
            <p className="mt-0.5 font-heading text-lg font-bold text-foreground">Sunrise Bakery</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            <MapPin className="size-3" />
            Jaipur, Rajasthan
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { k: "Turnover", v: "₹12 lakh" },
            { k: "Employees", v: "3" },
            { k: "Structure", v: "Proprietor" },
          ].map((s) => (
            <div key={s.k} className="rounded-lg border border-border bg-background px-3 py-2">
              <p className="text-[11px] text-muted-foreground">{s.k}</p>
              <p className="text-sm font-semibold text-foreground">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          {[
            { title: "Income Tax", Icon: CircleDot, cls: "text-info bg-info-soft border-info/25", label: "Likely applicable" },
            { title: "GST", Icon: CircleAlert, cls: "text-warning bg-warning-soft border-warning/25", label: "Review needed" },
            { title: "TDS / Withholding", Icon: CheckCircle2, cls: "text-success bg-success-soft border-success/25", label: "No immediate action" },
          ].map(({ title, Icon, cls, label }) => (
            <div key={title} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5">
              <span className="text-sm font-medium text-foreground">{title}</span>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}>
                <Icon className="size-3" />
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground">
          Illustration with demo data. Real recommendations are backed by verified sources.
        </div>
      </div>
    </div>
  )
}
