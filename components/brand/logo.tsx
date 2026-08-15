import { cn } from "@/lib/utils"

export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground"
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-5" strokeWidth={2.2} stroke="currentColor">
          <path d="M4 20V9.5a1 1 0 0 1 .4-.8l7-5.3a1 1 0 0 1 1.2 0l7 5.3a1 1 0 0 1 .4.8V20" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 20h18" strokeLinecap="round" />
          <path d="M9.5 13.5l1.8 1.8L15 11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-heading text-lg font-bold tracking-tight text-foreground">TaxEase</span>
      )}
    </span>
  )
}
