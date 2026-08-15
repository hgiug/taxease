import { NextResponse } from "next/server"
import { listSchemes } from "@/lib/services"

// GET /api/schemes — returns demo government schemes.
export async function GET() {
  return NextResponse.json({ schemes: listSchemes(), isDemo: true })
}
