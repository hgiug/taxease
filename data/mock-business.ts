import type { BusinessProfile } from "@/types"

/**
 * SAMPLE PROFILE ONLY.
 *
 * This is one example business used to seed an empty session so the UI is
 * never blank. It carries NO special status — it flows through exactly the
 * same extraction → engines → analysis pipeline as any business the user
 * creates. No UI should ever assume these specific values.
 */
export const DEMO_BUSINESS_PROFILE: BusinessProfile = {
  id: "sample-business",
  businessName: "Sample Bakery",
  businessTypeId: "small_restaurant",
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
  specialCharacteristics: [],
  rawDescription:
    "I run a small bakery in Jaipur. We make around ₹12 lakh per year, have 3 employees and sell both from our shop and online.",
}

/** Backwards-compatible alias. */
export const MOCK_BUSINESS_PROFILE = DEMO_BUSINESS_PROFILE
