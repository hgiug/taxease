import { NextResponse } from "next/server"
import { listRegistrations } from "@/lib/services"

// GET /api/registrations — returns demo registration rules.
export async function GET() {
  return NextResponse.json({ registrations: listRegistrations(), isDemo: true })
}
