import { NextResponse } from "next/server"
import { getDefaultBusiness } from "@/lib/services"

// GET /api/business — returns the current (demo) business profile.
export async function GET() {
  return NextResponse.json({ business: getDefaultBusiness(), isDemo: true })
}
