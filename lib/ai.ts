import type { BusinessProfile } from "@/types"
import { MOCK_BUSINESS_PROFILE } from "@/data/mock-business"

/**
 * AI PROFILE EXTRACTION INTERFACE.
 *
 * `extractBusinessProfile` is the single seam where a real LLM
 * (Gemini / OpenAI / etc.) plugs in later. For the demo it uses light-weight
 * keyword heuristics over the user's text and falls back to a sample profile.
 *
 * IMPORTANT: the LLM's only job is to turn free text into a structured
 * `BusinessProfile`. It must NOT determine tax/legal outcomes — that is the
 * job of the deterministic rules engine (`analyzeBusiness`).
 */
export async function extractBusinessProfile(text: string): Promise<BusinessProfile> {
  // Simulate model latency for a realistic demo experience.
  await new Promise((r) => setTimeout(r, 400))

  const lower = text.toLowerCase()
  const profile: BusinessProfile = { ...MOCK_BUSINESS_PROFILE, rawDescription: text }

  // --- Very light keyword heuristics (DEMO ONLY) ---
  if (/bakery|cafe|restaurant|food|kitchen|sweets|dairy/.test(lower)) {
    profile.businessCategory = "food_business"
    profile.businessActivity = matchWord(lower, ["bakery", "cafe", "restaurant", "food"]) ?? "food business"
  } else if (/shop|store|retail|kirana|boutique/.test(lower)) {
    profile.businessCategory = "retail"
    profile.businessActivity = "retail shop"
  } else if (/manufactur|factory|production|workshop/.test(lower)) {
    profile.businessCategory = "manufacturing"
    profile.businessActivity = "manufacturing"
  } else if (/freelanc|consult|designer|developer|writer/.test(lower)) {
    profile.businessCategory = "freelancing"
    profile.businessActivity = "freelancing"
  } else if (/service|salon|repair|agency/.test(lower)) {
    profile.businessCategory = "services"
    profile.businessActivity = "services"
  }

  const city = matchCity(lower)
  if (city) {
    profile.city = city.city
    profile.state = city.state
  }

  const turnover = parseTurnover(lower)
  if (turnover) profile.annualTurnover = turnover

  const employees = parseEmployees(lower)
  if (employees !== null) profile.employees = employees

  if (/online|website|instagram|amazon|flipkart|e-commerce|ecommerce|deliver/.test(lower)) profile.onlineSales = true
  if (/shop|store|counter|offline|physical/.test(lower)) profile.offlineSales = true
  if (/other state|interstate|across india|different state/.test(lower)) profile.interstateSales = true
  if (/import/.test(lower)) profile.imports = true
  if (/export/.test(lower)) profile.exports = true
  if (/gst registered|have gst|gstin/.test(lower)) profile.gstRegistered = true
  if (/udyam|msme registered/.test(lower)) profile.udyamRegistered = true

  if (/partnership/.test(lower)) profile.businessStructure = "partnership"
  else if (/private limited|pvt ltd|pvt\.? ltd/.test(lower)) profile.businessStructure = "private_limited"
  else if (/\bllp\b/.test(lower)) profile.businessStructure = "llp"
  else if (/proprietor|sole|solo|myself|just me/.test(lower)) profile.businessStructure = "sole_proprietorship"

  return profile
}

function matchWord(text: string, words: string[]): string | null {
  for (const w of words) if (text.includes(w)) return w
  return null
}

const CITIES: { city: string; state: string; keys: string[] }[] = [
  { city: "Jaipur", state: "Rajasthan", keys: ["jaipur"] },
  { city: "Mumbai", state: "Maharashtra", keys: ["mumbai", "bombay"] },
  { city: "Delhi", state: "Delhi", keys: ["delhi", "new delhi"] },
  { city: "Bengaluru", state: "Karnataka", keys: ["bengaluru", "bangalore"] },
  { city: "Chennai", state: "Tamil Nadu", keys: ["chennai", "madras"] },
  { city: "Hyderabad", state: "Telangana", keys: ["hyderabad"] },
  { city: "Ahmedabad", state: "Gujarat", keys: ["ahmedabad"] },
  { city: "Pune", state: "Maharashtra", keys: ["pune"] },
  { city: "Kolkata", state: "West Bengal", keys: ["kolkata", "calcutta"] },
  { city: "Lucknow", state: "Uttar Pradesh", keys: ["lucknow"] },
]

function matchCity(text: string): { city: string; state: string } | null {
  for (const c of CITIES) if (c.keys.some((k) => text.includes(k))) return { city: c.city, state: c.state }
  return null
}

/** Parses phrases like "12 lakh", "1.2 crore", "₹5,00,000". DEMO heuristic. */
function parseTurnover(text: string): number | null {
  const lakh = text.match(/(\d+(?:\.\d+)?)\s*lakh/)
  if (lakh) return Math.round(parseFloat(lakh[1]) * 100000)
  const crore = text.match(/(\d+(?:\.\d+)?)\s*crore/)
  if (crore) return Math.round(parseFloat(crore[1]) * 10000000)
  const rupees = text.match(/₹\s*([\d,]{5,})/)
  if (rupees) return parseInt(rupees[1].replace(/,/g, ""), 10)
  return null
}

function parseEmployees(text: string): number | null {
  const m = text.match(/(\d+)\s*(employee|staff|worker|people)/)
  if (m) return parseInt(m[1], 10)
  return null
}
