import { NextResponse } from "next/server"
import { getRegistrationCatalog } from "@/lib/services"

// GET /api/registrations — returns the reference registration catalog.
export async function GET() {
  return NextResponse.json({ registrations: getRegistrationCatalog(), isReferenceData: true })
}
