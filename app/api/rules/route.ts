import { NextResponse } from "next/server"
import { listRules } from "@/lib/services"

// GET /api/rules — returns demo tax/compliance rules.
export async function GET() {
  return NextResponse.json({ rules: listRules(), isDemo: true })
}
