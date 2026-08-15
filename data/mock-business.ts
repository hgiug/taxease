import type { BusinessProfile } from "@/types"

/**
 * DEMO DATA — a representative sample business profile.
 * Used as the default when the user has not completed the assessment,
 * and as the fallback result of the mock AI extraction.
 */
export const MOCK_BUSINESS_PROFILE: BusinessProfile = {
  id: "demo-business-1",
  businessName: "Sunrise Bakery",
  businessCategory: "food_business",
  businessActivity: "bakery",
  state: "Rajasthan",
  city: "Jaipur",
  annualTurnover: 1200000,
  employees: 3,
  businessStructure: "sole_proprietorship",
  businessAgeMonths: 30,
  onlineSales: true,
  offlineSales: true,
  interstateSales: false,
  imports: false,
  exports: false,
  gstRegistered: false,
  udyamRegistered: false,
  otherRegistrations: [],
  rawDescription:
    "I run a small bakery in Jaipur. We make around ₹12 lakh per year, have 3 employees and sell both from our shop and online.",
}
