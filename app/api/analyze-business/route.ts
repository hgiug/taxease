import { NextResponse } from "next/server"
import type { BusinessProfile } from "@/types"
import { extractBusinessProfile } from "@/lib/ai"
import { runAnalysis, getDefaultBusiness } from "@/lib/services"

/**
 * POST /api/analyze-business
 *
 * Accepts either:
 *  - { description: string }  -> mock AI extracts a profile, then analyzes it
 *  - { profile: BusinessProfile } -> analyzes the provided structured profile
 *
 * Returns a structured AssessmentResult (demo data).
 */
export async function POST(request: Request) {
  let body: { description?: string; profile?: BusinessProfile } = {}
  try {
    body = await request.json()
  } catch {
    // ignore, fall through to defaults
  }

  let profile: BusinessProfile
  if (body.profile) {
    profile = body.profile
  } else if (typeof body.description === "string" && body.description.trim().length > 0) {
    profile = await extractBusinessProfile(body.description)
  } else {
    profile = getDefaultBusiness()
  }

  const result = runAnalysis(profile)
  return NextResponse.json(result)
}
