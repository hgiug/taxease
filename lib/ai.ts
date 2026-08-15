import type { BusinessProfile, BusinessStructure } from "@/types"
import { BUSINESS_TYPES } from "@/data/business-types"

/**
 * AI PROFILE EXTRACTION INTERFACE.
 *
 * `extractBusinessProfile` is the single seam where a real LLM
 * (Gemini / OpenAI / etc.) plugs in later. For the demo it uses lightweight
 * keyword heuristics over the user's text to build a structured profile.
 *
 * IMPORTANT: the model's ONLY job is to turn free text into a structured
 * `BusinessProfile` (facts). It must NOT determine tax/legal outcomes — that
 * is the job of the deterministic engines (`analyzeBusiness`).
 *
 *   User description → extractBusinessProfile → BusinessProfile → engines
 */
export async function extractBusinessProfile(text: string): Promise<BusinessProfile> {
  // Simulate model latency for a realistic demo experience.
  await new Promise((r) => setTimeout(r, 400))

  const lower = text.toLowerCase()

  // Start from an empty-ish profile with conservative defaults; we only set
  // facts we can reasonably infer from the text.
  const profile: BusinessProfile = {
    id: "user-business",
    businessCategory: "other",
    businessActivity: "",
    state: "",
    city: "",
    annualTurnover: 0,
    employees: 0,
    businessStructure: "sole_proprietorship",
    onlineSales: false,
    offlineSales: false,
    interstateSales: false,
    imports: false,
    exports: false,
    gstRegistered: false,
    udyamRegistered: false,
    specialCharacteristics: [],
    rawDescription: text,
  }

  // --- Business type detection via catalog keywords ---
  const matched = detectBusinessType(lower)
  if (matched) {
    profile.businessTypeId = matched.id
    profile.businessCategory = matched.category
    profile.businessActivity = matched.label.toLowerCase()
  }

  // --- Location ---
  const city = matchCity(lower)
  if (city) {
    profile.city = city.city
    profile.state = city.state
  }

  // --- Numbers ---
  const turnover = parseTurnover(lower)
  if (turnover) profile.annualTurnover = turnover
  const employees = parseEmployees(lower)
  if (employees !== null) profile.employees = employees

  // --- Sales / trade characteristics ---
  if (/online|website|instagram|amazon|flipkart|e-commerce|ecommerce|deliver/.test(lower)) profile.onlineSales = true
  if (/shop|store|counter|offline|physical|premises|outlet|stall/.test(lower)) profile.offlineSales = true
  if (/other state|interstate|across india|different state|out of state/.test(lower)) profile.interstateSales = true
  if (/import/.test(lower)) profile.imports = true
  if (/export/.test(lower)) profile.exports = true
  if (/gst registered|have gst|gstin|registered for gst/.test(lower)) profile.gstRegistered = true
  if (/udyam|msme registered|registered as msme/.test(lower)) profile.udyamRegistered = true
  if (/new business|just started|recently started|starting up|startup|about to start/.test(lower)) {
    profile.businessAgeMonths = 6
  }

  // --- Structure ---
  if (/partnership/.test(lower)) profile.businessStructure = "partnership"
  else if (/private limited|pvt ltd|pvt\.? ltd/.test(lower)) profile.businessStructure = "private_limited"
  else if (/\bllp\b/.test(lower)) profile.businessStructure = "llp"
  else if (/one person company|\bopc\b/.test(lower)) profile.businessStructure = "opc"
  else if (/proprietor|sole|solo|myself|just me/.test(lower)) profile.businessStructure = "sole_proprietorship"

  // If no premises/online signal at all, assume offline (most common).
  if (!profile.onlineSales && !profile.offlineSales) profile.offlineSales = true

  return profile
}

function detectBusinessType(text: string) {
  let best: { id: string; category: BusinessProfile["businessCategory"]; label: string; score: number } | null = null
  for (const type of BUSINESS_TYPES) {
    let score = 0
    for (const kw of type.keywords) {
      if (text.includes(kw.toLowerCase())) score += kw.split(" ").length
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { id: type.id, category: type.category, label: type.label, score }
    }
  }
  return best
}

const CITIES: { city: string; state: string; keys: string[] }[] = [
  { city: "Jaipur", state: "Rajasthan", keys: ["jaipur"] },
  { city: "Jodhpur", state: "Rajasthan", keys: ["jodhpur"] },
  { city: "Mumbai", state: "Maharashtra", keys: ["mumbai", "bombay"] },
  { city: "Pune", state: "Maharashtra", keys: ["pune"] },
  { city: "Delhi", state: "Delhi", keys: ["delhi", "new delhi"] },
  { city: "Bengaluru", state: "Karnataka", keys: ["bengaluru", "bangalore"] },
  { city: "Chennai", state: "Tamil Nadu", keys: ["chennai", "madras"] },
  { city: "Hyderabad", state: "Telangana", keys: ["hyderabad"] },
  { city: "Ahmedabad", state: "Gujarat", keys: ["ahmedabad"] },
  { city: "Surat", state: "Gujarat", keys: ["surat"] },
  { city: "Kolkata", state: "West Bengal", keys: ["kolkata", "calcutta"] },
  { city: "Lucknow", state: "Uttar Pradesh", keys: ["lucknow"] },
  { city: "Kanpur", state: "Uttar Pradesh", keys: ["kanpur"] },
  { city: "Indore", state: "Madhya Pradesh", keys: ["indore"] },
  { city: "Patna", state: "Bihar", keys: ["patna"] },
  { city: "Chandigarh", state: "Punjab", keys: ["chandigarh"] },
  { city: "Kochi", state: "Kerala", keys: ["kochi", "cochin"] },
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
  const m = text.match(/(\d+)\s*(employee|staff|worker|people|helper)/)
  if (m) return parseInt(m[1], 10)
  return null
}
