import Link from "next/link"
import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="TaxEase home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex" aria-label="Marketing">
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#trust" className="transition-colors hover:text-foreground">
            Why TaxEase
          </a>
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            Demo dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/dashboard">View demo</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/assessment">Analyze my business</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
