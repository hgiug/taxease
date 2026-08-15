import Link from "next/link"
import { Logo } from "@/components/brand/logo"
import { Disclaimer } from "@/components/disclaimer"

export function MarketingFooter() {
  return (
    <footer className="bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm space-y-3">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              An AI-powered tax-simplicity advisor for small and informal businesses in India. Working name: TaxEase.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm" aria-label="Footer">
            <Link href="/assessment" className="text-muted-foreground hover:text-foreground">
              Assessment
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/benefits" className="text-muted-foreground hover:text-foreground">
              Benefits
            </Link>
            <Link href="/sources" className="text-muted-foreground hover:text-foreground">
              Sources
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-border pt-6">
          <Disclaimer className="max-w-3xl" />
          <p className="mt-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} TaxEase (demo). Uses illustrative mock data. Not affiliated with any government
            body.
          </p>
        </div>
      </div>
    </footer>
  )
}
