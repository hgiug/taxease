import {
  Building2,
  FileCheck2,
  LayoutDashboard,
  ListChecks,
  Landmark,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  /** Short label for compact mobile bottom nav. */
  short: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, short: "Home" },
  { label: "My Business", href: "/profile", icon: Building2, short: "Business" },
  { label: "Compliance", href: "/compliance", icon: FileCheck2, short: "Tax" },
  { label: "Registrations", href: "/registrations", icon: ScrollText, short: "Reg." },
  { label: "Benefits", href: "/benefits", icon: Landmark, short: "Benefits" },
  { label: "Action Plan", href: "/action-plan", icon: ListChecks, short: "Actions" },
  { label: "Sources", href: "/sources", icon: ShieldCheck, short: "Sources" },
]

/** Items surfaced in the compact mobile bottom bar (kept to 5 for space). */
export const MOBILE_PRIMARY: NavItem[] = [
  NAV_ITEMS[0],
  NAV_ITEMS[2],
  NAV_ITEMS[3],
  NAV_ITEMS[4],
  NAV_ITEMS[5],
]
