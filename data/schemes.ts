import type { BusinessScheme } from "@/types"

/**
 * SCHEME / LOAN / BENEFIT CATALOG.
 *
 * Seeded from the reference spreadsheet. Amounts, rates and eligibility are
 * reproduced from that reference sheet and are NOT verified — the matching
 * engine and UI always frame these as "potentially relevant, verify before
 * applying". No scheme details are invented beyond what the sheet contained.
 */
export const SCHEMES: BusinessScheme[] = [
  {
    id: "pm_mudra",
    name: "PM MUDRA (Pradhan Mantri MUDRA Yojana)",
    type: "loan",
    description:
      "Collateral-free loans for micro and small non-farm businesses — for setup, equipment and working capital. Delivered through banks, NBFCs and MFIs.",
    // Broadly relevant to small businesses across categories.
    applicableCategories: [
      "food_business",
      "retail",
      "manufacturing",
      "services",
      "trading",
      "transport",
    ],
    states: undefined, // national
    eligibilityConditions: [
      "Micro or small non-farm business",
      "Viable business plan / cost estimate",
      "Valid identity, address and bank documents",
    ],
    loanAmount: "₹50,000 – ₹10 lakh; up to ₹20 lakh under Tarun Plus for eligible repeat borrowers.",
    subsidy: "No direct subsidy — loans are collateral-free.",
    interestRate: "Not fixed. Set by the bank / NBFC / MFI under its lending policy.",
    benefits: ["Collateral-free credit", "Term loan and working-capital options"],
    documents: ["Identity proof", "Address proof", "Bank statements", "Business plan / cost estimate"],
    sourceId: "src-mudra",
    officialUrl: "https://financialservices.gov.in/index.php/pradhan-mantri-mudra-yojana-pmmy",
    lastVerified: null,
  },
  {
    id: "pm_svanidhi",
    name: "PM SVANidhi",
    type: "credit_support",
    description:
      "Collateral-free working-capital micro-credit designed specifically for street vendors, released in progressive tranches on timely repayment.",
    applicableBusinessTypes: ["street_vendor", "food_street_vendor"],
    states: undefined,
    eligibilityConditions: [
      "Operates as a street vendor",
      "Holds a Certificate of Vending (CoV) or Letter of Recommendation",
      "Timely repayment to unlock higher tranches",
    ],
    loanAmount: "Progressive tranches: ₹15,000, then ₹25,000, then ₹50,000 after timely repayment.",
    subsidy: "7% yearly interest subsidy for timely repayment; digital-transaction cashback.",
    interestRate: "Lender's prevailing rate, less 7% interest subsidy when repayments are timely.",
    benefits: [
      "Collateral-free credit",
      "Interest subsidy on timely repayment",
      "Digital-payment cashback",
      "Eligible vendors may access a UPI-linked RuPay credit facility",
    ],
    documents: ["Certificate of Vending / Letter of Recommendation", "Identity proof", "Bank account details"],
    sourceId: "src-svanidhi",
    officialUrl: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2267102&lang=1&reg=3",
    lastVerified: null,
  },
  {
    id: "pmegp",
    name: "PMEGP (Prime Minister's Employment Generation Programme)",
    type: "subsidy",
    description:
      "A credit-linked subsidy scheme for setting up NEW micro-enterprises. Provides margin-money subsidy on eligible project cost for new viable units.",
    applicableCategories: ["food_business", "manufacturing", "services", "retail"],
    states: undefined,
    eligibilityConditions: [
      "New viable micro-enterprise (existing units generally ineligible)",
      "Has not already received another government subsidy for the same unit",
      "Udyam registration before margin-money adjustment",
      "Class VIII education for larger projects (service > ₹5 lakh, manufacturing > ₹10 lakh)",
    ],
    loanAmount:
      "Eligible project cost up to ₹20 lakh (service) / ₹50 lakh (manufacturing) for subsidy purposes.",
    subsidy:
      "Margin-money subsidy generally 15%–35% of eligible project cost depending on category and location (urban/rural).",
    interestRate: "Bank-loan rate is lender-set.",
    benefits: ["Margin-money subsidy for new units", "Support for job-creating microenterprises"],
    documents: ["Project report", "Udyam registration", "Identity & education proof", "Quotations / cost estimate"],
    sourceId: "src-pmegp",
    officialUrl: "https://pmegp.msme.gov.in/Home/Index",
    lastVerified: null,
  },
  {
    id: "pm_vishwakarma",
    name: "PM Vishwakarma",
    type: "training",
    description:
      "Support for eligible traditional artisans and craftspeople across 18 covered trades (for example barber, tailor, carpenter, potter, goldsmith). Combines skill training, a toolkit incentive and concessional credit.",
    applicableBusinessTypes: [
      "barber_salon",
      "garment_manufacturing",
      "furniture_manufacturing",
      "handmade_products",
    ],
    states: undefined,
    eligibilityConditions: [
      "Works in one of the 18 covered traditional trades",
      "Individual artisan / craftsperson",
      "Meets scheme conditions for the second loan tranche",
    ],
    loanAmount: "₹1 lakh first tranche + ₹2 lakh second tranche (up to ₹3 lakh total).",
    subsidy: "Toolkit incentive up to ₹15,000, plus training support and digital-payment incentive.",
    interestRate: "Concessional 5% for eligible artisan loans.",
    benefits: ["Skill training with stipend", "Toolkit incentive", "Concessional credit", "Digital-payment incentive"],
    documents: ["Identity proof", "Proof of traditional trade", "Bank account details"],
    sourceId: "src-vishwakarma",
    officialUrl: "https://pmvishwakarma.gov.in/",
    lastVerified: null,
  },
]

const SCHEME_INDEX = new Map(SCHEMES.map((s) => [s.id, s]))

export function getSchemeById(id: string): BusinessScheme | undefined {
  return SCHEME_INDEX.get(id)
}

export function listSchemes(): BusinessScheme[] {
  return SCHEMES
}
