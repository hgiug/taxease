import type { BusinessType } from "@/types"

/**
 * BUSINESS TYPE CATALOG.
 *
 * Seeded from the reference spreadsheet's rows. Each type links to the
 * registration and scheme catalog ids that MAY be relevant. This is the
 * data-driven spine of the platform: adding a new business type here (with the
 * right registration/scheme ids) makes it flow through the whole app — no new
 * pages or components required.
 */
export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: "grocery_shop",
    label: "Grocery shop",
    category: "retail",
    keywords: ["grocery", "kirana", "provision", "general store", "supermarket"],
    description: "A retail shop selling groceries and daily provisions.",
    registrationIds: ["trade_license", "shops_establishment", "fssai", "gst", "udyam"],
    schemeIds: ["pm_mudra"],
    taxNote: "GST may apply once turnover or other conditions are met. Income tax applies on business income.",
    referenceSourceIds: ["src-mudra", "src-fssai", "src-gst"],
  },
  {
    id: "clothing_shop",
    label: "Clothing shop",
    category: "retail",
    keywords: ["clothing", "clothes", "garment shop", "boutique", "apparel", "fashion", "textile shop"],
    description: "A retail shop selling clothing and apparel.",
    registrationIds: ["trade_license", "shops_establishment", "gst", "udyam"],
    schemeIds: ["pm_mudra"],
    taxNote: "GST may apply once turnover conditions are met. Income tax applies on business income.",
    referenceSourceIds: ["src-mudra", "src-gst", "src-udyam"],
  },
  {
    id: "street_vendor",
    label: "Street vendor",
    category: "retail",
    keywords: ["street vendor", "hawker", "cart", "footpath", "vending"],
    description: "A mobile or roadside vendor selling goods.",
    registrationIds: ["vending_certificate", "fssai", "gst"],
    schemeIds: ["pm_svanidhi"],
    taxNote: "GST usually only applies when specific conditions are met. Income tax applies on income.",
    referenceSourceIds: ["src-svanidhi", "src-fssai", "src-gst"],
  },
  {
    id: "tea_stall",
    label: "Tea stall",
    category: "food_business",
    keywords: ["tea stall", "chai", "tea shop", "kiosk"],
    description: "A small tea / beverage stall, often serving light snacks.",
    registrationIds: ["trade_license", "shops_establishment", "fssai", "gst", "udyam"],
    schemeIds: ["pm_mudra", "pmegp"],
    taxNote: "FSSAI registration/licence depends on turnover. GST may apply when conditions are met.",
    referenceSourceIds: ["src-fssai", "src-mudra", "src-pmegp"],
  },
  {
    id: "food_street_vendor",
    label: "Food street vendor",
    category: "food_business",
    keywords: ["food vendor", "food cart", "street food", "snack stall", "food hawker"],
    description: "A street vendor selling prepared food.",
    registrationIds: ["vending_certificate", "fssai", "gst"],
    schemeIds: ["pm_svanidhi", "pm_mudra"],
    taxNote: "FSSAI registration up to a turnover threshold, licence above it. GST when conditions are met.",
    referenceSourceIds: ["src-svanidhi", "src-fssai", "src-gst"],
  },
  {
    id: "small_restaurant",
    label: "Small restaurant",
    category: "food_business",
    keywords: ["restaurant", "eatery", "dhaba", "cafe", "diner", "food outlet"],
    description: "A restaurant or eatery serving food on premises.",
    registrationIds: ["trade_license", "shops_establishment", "fssai", "gst", "udyam"],
    schemeIds: ["pm_mudra", "pmegp"],
    taxNote: "FSSAI licence tier depends on turnover. Local fire/health approvals may apply. GST when applicable.",
    referenceSourceIds: ["src-fssai", "src-mudra", "src-pmegp"],
  },
  {
    id: "catering_service",
    label: "Catering service",
    category: "food_business",
    keywords: ["catering", "caterer", "tiffin", "banquet food", "event food"],
    description: "A catering business preparing and serving food for events.",
    registrationIds: ["trade_license", "shops_establishment", "fssai", "gst", "udyam"],
    schemeIds: ["pm_mudra", "pmegp"],
    taxNote: "Caterers usually require an FSSAI licence rather than basic registration. GST when applicable.",
    referenceSourceIds: ["src-fssai", "src-mudra", "src-pmegp"],
  },
  {
    id: "electrician_service",
    label: "Electrician service",
    category: "services",
    keywords: ["electrician", "electrical service", "wiring", "electrical contractor"],
    description: "An electrical services / contracting business.",
    registrationIds: ["trade_license", "shops_establishment", "electrical_contractor_license", "gst", "udyam"],
    schemeIds: ["pm_mudra", "pmegp"],
    taxNote: "An electrical-contractor licence may be needed for regulated work. GST when applicable.",
    referenceSourceIds: ["src-mudra", "src-pmegp"],
  },
  {
    id: "barber_salon",
    label: "Barber / salon",
    category: "services",
    keywords: ["barber", "salon", "hair", "beauty parlour", "spa", "naai"],
    description: "A barber shop, salon or beauty parlour.",
    registrationIds: ["trade_license", "shops_establishment", "gst", "udyam"],
    schemeIds: ["pm_vishwakarma", "pm_mudra", "pmegp"],
    taxNote: "Local health/sanitation rules may apply. GST when turnover conditions are met.",
    referenceSourceIds: ["src-vishwakarma", "src-mudra"],
  },
  {
    id: "mobile_computer_repair",
    label: "Mobile / computer repair",
    category: "services",
    keywords: ["mobile repair", "computer repair", "laptop repair", "phone repair", "electronics repair"],
    description: "A shop repairing mobiles, computers and electronics.",
    registrationIds: ["trade_license", "shops_establishment", "ewaste_compliance", "gst", "udyam"],
    schemeIds: ["pm_mudra", "pmegp"],
    taxNote: "Follow e-waste handling rules if discarding e-waste. GST when applicable.",
    referenceSourceIds: ["src-mudra", "src-ewaste"],
  },
  {
    id: "garment_manufacturing",
    label: "Garment manufacturing",
    category: "manufacturing",
    keywords: ["garment manufacturing", "tailoring unit", "stitching", "apparel manufacturing", "darzi"],
    description: "A unit manufacturing garments or textiles.",
    registrationIds: ["trade_license", "shops_establishment", "udyam", "factory_license", "pollution_consent", "gst"],
    schemeIds: ["pm_mudra", "pmegp", "pm_vishwakarma"],
    taxNote: "Factory registration may apply at worker/power thresholds; pollution consent if processing/dyeing.",
    referenceSourceIds: ["src-mudra", "src-pmegp", "src-vishwakarma"],
  },
  {
    id: "furniture_manufacturing",
    label: "Furniture manufacturing",
    category: "manufacturing",
    keywords: ["furniture manufacturing", "carpentry unit", "woodwork", "furniture making", "suthar", "badhai"],
    description: "A unit manufacturing furniture or wood products.",
    registrationIds: ["trade_license", "shops_establishment", "udyam", "factory_license", "pollution_consent", "gst"],
    schemeIds: ["pm_mudra", "pmegp", "pm_vishwakarma"],
    taxNote: "Factory registration and pollution consent may apply depending on scale and finishing processes.",
    referenceSourceIds: ["src-mudra", "src-pmegp", "src-vishwakarma"],
  },
  {
    id: "handmade_products",
    label: "Handmade products",
    category: "manufacturing",
    keywords: ["handmade", "handicraft", "artisan", "craft", "pottery", "toys", "basket"],
    description: "A workshop making handmade / handicraft products.",
    registrationIds: ["trade_license", "shops_establishment", "udyam", "factory_license", "pollution_consent", "gst"],
    schemeIds: ["pm_mudra", "pmegp", "pm_vishwakarma"],
    taxNote: "PM Vishwakarma applies only to covered traditional trades. Factory/pollution approvals depend on scale.",
    referenceSourceIds: ["src-mudra", "src-pmegp", "src-vishwakarma"],
  },
  {
    id: "local_transport",
    label: "Local transport (passenger / goods)",
    category: "transport",
    keywords: ["transport", "taxi", "cab", "goods carrier", "tempo", "logistics", "auto rickshaw", "delivery van"],
    description: "A local passenger or goods transport business.",
    registrationIds: ["vehicle_permit", "gst", "udyam"],
    schemeIds: ["pm_mudra", "pmegp"],
    taxNote: "A transport permit is required for commercial vehicles. GST/trade registration may apply by model.",
    referenceSourceIds: ["src-vehicle-permit", "src-mudra"],
  },
  {
    id: "professional_services",
    label: "Professional services (consulting / IT / design / accounting)",
    category: "services",
    keywords: [
      "consulting",
      "consultant",
      "it services",
      "software",
      "developer",
      "designer",
      "design studio",
      "accounting",
      "accountant",
      "legal",
      "architect",
      "agency",
      "freelance",
    ],
    description: "A professional / knowledge-services business.",
    registrationIds: ["shops_establishment", "professional_license", "gst", "udyam"],
    schemeIds: ["pm_mudra", "pmegp"],
    taxNote: "Profession-specific licences apply where the law requires them. GST when applicable.",
    referenceSourceIds: ["src-mudra", "src-pmegp"],
  },
  {
    id: "small_repair_business",
    label: "Small repair business (appliance / electrical)",
    category: "services",
    keywords: ["repair", "appliance repair", "electrical repair", "servicing", "workshop repair"],
    description: "A general appliance / electrical repair business.",
    registrationIds: ["trade_license", "shops_establishment", "ewaste_compliance", "gst", "udyam"],
    schemeIds: ["pm_mudra", "pmegp"],
    taxNote: "Follow e-waste rules if handling e-waste; state electrical permissions may apply. GST when applicable.",
    referenceSourceIds: ["src-mudra", "src-pmegp"],
  },
]

const TYPE_INDEX = new Map(BUSINESS_TYPES.map((t) => [t.id, t]))

export function getBusinessTypeById(id: string | undefined): BusinessType | undefined {
  if (!id) return undefined
  return TYPE_INDEX.get(id)
}

export function listBusinessTypes(): BusinessType[] {
  return BUSINESS_TYPES
}

/** Returns business types belonging to a category. */
export function businessTypesByCategory(category: string) {
  return BUSINESS_TYPES.filter((t) => t.category === category)
}
