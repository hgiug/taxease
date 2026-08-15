import { NextResponse } from "next/server"
import { getSchemeCatalog } from "@/lib/services"

// GET /api/schemes — returns the reference scheme/loan/benefit catalog.
export async function GET() {
  return NextResponse.json({ schemes: getSchemeCatalog(), isReferenceData: true })
}
