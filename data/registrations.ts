import type { RegistrationRule } from "@/types"

/**
 * REGISTRATION CATALOG.
 *
 * Normalised from the reference spreadsheet's free-text "Required
 * registrations / licences" column into structured, reusable records. These
 * are CONDITIONAL — the registration engine decides how (and whether) each one
 * applies to a specific business profile. Nothing here is a determination that
 * a registration legally applies.
 */
export const REGISTRATIONS: RegistrationRule[] = [
  {
    id: "gst",
    name: "GST Registration",
    description:
      "Registration under the Goods & Services Tax regime. Whether it is required depends on turnover thresholds, the type of goods/services, interstate supply and sales through online marketplaces.",
    conditions: [
      "Turnover crosses the applicable registration threshold",
      "Selling to other states (interstate supply)",
      "Selling through online marketplaces",
    ],
    stateSpecific: false,
    authority: "GST Network",
    documents: ["PAN", "Business address proof", "Bank account details", "Owner identity proof"],
    officialUrl: "https://www.gst.gov.in/",
    sourceId: "src-gst",
    lastVerified: null,
  },
  {
    id: "udyam",
    name: "Udyam (MSME) Registration",
    description:
      "A free self-declaration that formally recognises a business as a micro, small or medium enterprise. Often optional, but useful for accessing MSME schemes and can be mandatory before certain subsidy adjustments.",
    conditions: ["Business qualifies as a micro/small/medium enterprise"],
    stateSpecific: false,
    authority: "Ministry of MSME",
    documents: ["Aadhaar of proprietor/partner", "PAN", "Business bank account details"],
    officialUrl: "https://udyamregistration.gov.in/",
    sourceId: "src-udyam",
    lastVerified: null,
  },
  {
    id: "fssai",
    name: "FSSAI Registration / Licence",
    description:
      "Food-safety registration or licence for any business that handles, makes or sells food. Basic registration, State licence or Central licence applies depending on turnover and scale.",
    applicableCategories: ["food_business"],
    conditions: ["Business handles, prepares or sells food"],
    stateSpecific: false,
    authority: "Food Safety and Standards Authority of India",
    documents: ["Identity proof", "Business premises details", "List of food products"],
    officialUrl: "https://foscos.fssai.gov.in/",
    sourceId: "src-fssai",
    lastVerified: null,
  },
  {
    id: "shops_establishment",
    name: "Shops & Establishments Registration",
    description:
      "State-level registration covering commercial premises, working hours and employee welfare. Rules and thresholds vary significantly between states.",
    conditions: ["Operates from a commercial premises", "Employs workers"],
    stateSpecific: true,
    authority: "State labour department",
    documents: ["Business address proof", "Owner identity proof", "Employee details"],
    officialUrl: null,
    sourceId: "src-shops-establishment",
    lastVerified: null,
  },
  {
    id: "trade_license",
    name: "Local Trade Licence",
    description:
      "Permission from the local municipal body to carry out a trade or business at a location. Requirements and fees are set locally.",
    conditions: ["Operates a trade from a fixed local premises"],
    stateSpecific: true,
    authority: "Municipal / local body",
    documents: ["Address proof", "Identity proof", "Premises documents"],
    officialUrl: null,
    sourceId: "src-trade-license",
    lastVerified: null,
  },
  {
    id: "vending_certificate",
    name: "Certificate of Vending (CoV) / Letter of Recommendation",
    description:
      "Recognition from the Urban Local Body / Town Vending Committee that allows a street vendor to trade and is typically needed to apply for PM SVANidhi.",
    applicableBusinessTypes: ["street_vendor", "food_street_vendor"],
    conditions: ["Operates as a street vendor"],
    stateSpecific: true,
    authority: "Urban Local Body / Town Vending Committee",
    documents: ["Identity proof", "Vending location details"],
    officialUrl: null,
    sourceId: "src-vending-certificate",
    lastVerified: null,
  },
  {
    id: "factory_license",
    name: "Factory Registration / Licence",
    description:
      "Registration under factory law that may apply once a manufacturing unit crosses worker-count or power-usage thresholds.",
    applicableCategories: ["manufacturing"],
    conditions: ["Manufacturing unit crosses the worker / power threshold"],
    stateSpecific: true,
    authority: "State factories & boilers department",
    documents: ["Premises plan", "List of machinery", "Worker details"],
    officialUrl: null,
    sourceId: "src-factory-license",
    lastVerified: null,
  },
  {
    id: "pollution_consent",
    name: "Pollution Control Consent",
    description:
      "Consent to establish/operate from the State Pollution Control Board, which may apply to processes such as dyeing, wood finishing or other activities with environmental impact.",
    applicableCategories: ["manufacturing"],
    conditions: ["Process involves emissions, effluent or regulated materials"],
    stateSpecific: true,
    authority: "State Pollution Control Board",
    documents: ["Process details", "Premises details", "Effluent/emission details"],
    officialUrl: null,
    sourceId: "src-pollution-consent",
    lastVerified: null,
  },
  {
    id: "vehicle_permit",
    name: "Vehicle Registration & Transport Permit",
    description:
      "Commercial vehicle registration, insurance, PUC, fitness certificate and a transport permit are typically needed to operate a passenger or goods transport business.",
    applicableCategories: ["transport"],
    conditions: ["Operates commercial passenger or goods vehicles"],
    stateSpecific: true,
    authority: "Ministry of Road Transport & Highways",
    documents: ["Vehicle documents", "Insurance", "Driving licence", "PUC certificate"],
    officialUrl: "https://parivahan.gov.in/en/content/permanent-registration",
    sourceId: "src-vehicle-permit",
    lastVerified: null,
  },
  {
    id: "electrical_contractor_license",
    name: "Electrical Contractor Licence",
    description:
      "State licence/permit that may be required to undertake regulated electrical installation or contract work.",
    applicableBusinessTypes: ["electrician_service"],
    conditions: ["Undertakes regulated electrical installation / contract work"],
    stateSpecific: true,
    authority: "State electrical inspectorate",
    documents: ["Qualification proof", "Experience proof", "Identity proof"],
    officialUrl: null,
    sourceId: "src-electrical-license",
    lastVerified: null,
  },
  {
    id: "professional_license",
    name: "Professional Body Membership / Licence",
    description:
      "Where the law requires it, a professional must hold membership or a licence from the relevant regulator (for example CA, advocate or architect).",
    applicableBusinessTypes: ["professional_services"],
    conditions: ["Practises a regulated profession"],
    stateSpecific: false,
    authority: "Relevant professional regulator",
    documents: ["Qualification certificates", "Regulator membership proof"],
    officialUrl: null,
    sourceId: "src-professional-license",
    lastVerified: null,
  },
  {
    id: "ewaste_compliance",
    name: "E-waste Handling Compliance",
    description:
      "Businesses that collect or discard electronic waste should follow local e-waste handling rules.",
    applicableBusinessTypes: ["mobile_computer_repair", "small_repair_business"],
    conditions: ["Collects or discards electronic waste"],
    stateSpecific: false,
    authority: "Central Pollution Control Board",
    documents: ["E-waste handling records"],
    officialUrl: "https://cpcb.nic.in/e-waste/",
    sourceId: "src-ewaste",
    lastVerified: null,
  },
]

const REGISTRATION_INDEX = new Map(REGISTRATIONS.map((r) => [r.id, r]))

export function getRegistrationById(id: string): RegistrationRule | undefined {
  return REGISTRATION_INDEX.get(id)
}

export function listRegistrations(): RegistrationRule[] {
  return REGISTRATIONS
}
