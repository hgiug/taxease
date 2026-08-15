import type { BusinessCategory, BusinessStructure } from "@/types"

export const CATEGORY_OPTIONS: { value: BusinessCategory; label: string }[] = [
  { value: "food_business", label: "Food business" },
  { value: "retail", label: "Retail / shop" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "services", label: "Services" },
  { value: "trading", label: "Trading" },
  { value: "transport", label: "Transport" },
  { value: "freelancing", label: "Freelancing" },
  { value: "agriculture", label: "Agriculture" },
  { value: "other", label: "Other" },
]

export const STRUCTURE_OPTIONS: { value: BusinessStructure; label: string }[] = [
  { value: "sole_proprietorship", label: "Sole proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "llp", label: "LLP" },
  { value: "private_limited", label: "Private limited" },
  { value: "opc", label: "One person company" },
  { value: "huf", label: "HUF" },
  { value: "unregistered", label: "Not sure / unregistered" },
]

export const STATE_OPTIONS: string[] = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

export const AGE_OPTIONS: { value: number; label: string }[] = [
  { value: 6, label: "Less than 1 year" },
  { value: 24, label: "1 – 3 years" },
  { value: 48, label: "3 – 5 years" },
  { value: 84, label: "More than 5 years" },
]

export const PENDING_KEY = "taxease.pending.v1"
