import { NextResponse } from "next/server"
import { getTaxCatalog } from "@/lib/services"

// GET /api/rules — returns reference tax/compliance rules (verification pending).
export async function GET() {
  return NextResponse.json({ rules: getTaxCatalog(), isReferenceData: true })
}
