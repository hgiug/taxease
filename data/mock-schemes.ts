import type { GovernmentScheme } from "@/types"

/**
 * DEMO DATA — illustrative, non-real scheme examples.
 * Names, benefits and eligibility below are placeholders for layout purposes
 * and must NOT be presented as real government schemes. Verified scheme data
 * replaces this file later.
 */
export const MOCK_SCHEMES: GovernmentScheme[] = [
  {
    id: "scheme-credit",
    name: "Small Business Credit Support (Demo)",
    matchPercentage: 82,
    whyItMatches:
      "Your business size and structure resemble the profile that credit-support programmes typically target.",
    potentialBenefit: "Easier access to working-capital credit and potentially lower collateral requirements.",
    eligibility: [
      "Registered as a micro or small enterprise",
      "Operating for a minimum period",
      "Valid business bank account",
    ],
    documents: ["MSME/Udyam registration", "Bank statements", "Business identity proof"],
    sourceId: "src-scheme-credit",
  },
  {
    id: "scheme-skilling",
    name: "Workforce Skilling Support (Demo)",
    matchPercentage: 64,
    whyItMatches: "You reported employees, which is the kind of business skilling programmes are designed to support.",
    potentialBenefit: "Subsidised training for staff and possible reimbursement of certain training costs.",
    eligibility: ["Employs a minimum number of workers", "Registered business", "Training with approved providers"],
    documents: ["Business registration proof", "Employee records", "Training plan"],
    sourceId: "src-scheme-skilling",
  },
  {
    id: "scheme-digital",
    name: "Digital Adoption Incentive (Demo)",
    matchPercentage: 58,
    whyItMatches: "Because you sell online, digital-adoption incentives may be relevant to your operations.",
    potentialBenefit: "Support for adopting digital payments, e-commerce tools or accounting software.",
    eligibility: ["Small business with online presence", "Registered business", "Uses eligible digital tools"],
    documents: ["Business registration proof", "Proof of online sales channel", "Bank account details"],
    sourceId: "src-scheme-digital",
  },
]

export function getSchemes(): GovernmentScheme[] {
  return MOCK_SCHEMES
}
