import type { Source } from "@/types"

/**
 * SOURCE CATALOG.
 *
 * URLs below are copied verbatim from the uploaded reference spreadsheet
 * (`india_business_loan_reference.xlsx`). They are provided for convenience
 * and evidence trails, but every record is marked `verified: false` because
 * the research team is still confirming them. The UI must therefore always
 * show "Reference data — verification pending" for these until verified.
 *
 * No URLs are invented here — anything without a spreadsheet URL keeps `url:
 * null`. When verified data arrives, flip `verified` to true and set
 * `lastVerified` / `effectiveDate` (keeping the same ids).
 */
export const SOURCES: Source[] = [
  // --- Scheme sources ---
  {
    id: "src-mudra",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    authority: "Department of Financial Services",
    url: "https://financialservices.gov.in/index.php/pradhan-mantri-mudra-yojana-pmmy",
    sourceType: "scheme_guideline",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-svanidhi",
    name: "PM SVANidhi (press information)",
    authority: "Press Information Bureau",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2267102&lang=1&reg=3",
    sourceType: "press_release",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    authority: "Ministry of MSME / KVIC",
    url: "https://pmegp.msme.gov.in/Home/Index",
    sourceType: "scheme_guideline",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-vishwakarma",
    name: "PM Vishwakarma scheme booklet",
    authority: "Ministry of MSME",
    url: "https://pmvishwakarma.gov.in/",
    sourceType: "scheme_guideline",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },

  // --- Registration / licence sources ---
  {
    id: "src-gst",
    name: "Goods & Services Tax portal",
    authority: "GST Network",
    url: "https://www.gst.gov.in/",
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-udyam",
    name: "Udyam Registration portal",
    authority: "Ministry of MSME",
    url: "https://udyamregistration.gov.in/",
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-fssai",
    name: "FSSAI / FoSCoS registration",
    authority: "Food Safety and Standards Authority of India",
    url: "https://foscos.fssai.gov.in/",
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-shops-establishment",
    name: "State Shops & Establishments registration",
    authority: "State labour department (varies by state)",
    url: null,
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-trade-license",
    name: "Local trade licence",
    authority: "Municipal / local body (varies by location)",
    url: null,
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-factory-license",
    name: "Factory registration / licence",
    authority: "State factories & boilers department (varies by state)",
    url: null,
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-pollution-consent",
    name: "Pollution control consent",
    authority: "State Pollution Control Board (varies by state)",
    url: null,
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-vending-certificate",
    name: "Certificate of Vending (CoV) / Letter of Recommendation",
    authority: "Urban Local Body / Town Vending Committee",
    url: null,
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-vehicle-permit",
    name: "Vehicle registration & transport permit (Parivahan)",
    authority: "Ministry of Road Transport & Highways",
    url: "https://parivahan.gov.in/en/content/permanent-registration",
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-electrical-license",
    name: "Electrical contractor licence",
    authority: "State electrical inspectorate (varies by state)",
    url: null,
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-professional-license",
    name: "Professional body membership / licence",
    authority: "Relevant professional regulator (e.g. ICAI, BCI, CoA)",
    url: null,
    sourceType: "other",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
  {
    id: "src-ewaste",
    name: "E-waste handling guidance",
    authority: "Central Pollution Control Board",
    url: "https://cpcb.nic.in/e-waste/",
    sourceType: "government_portal",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },

  // --- Tax sources (placeholders — verified separately) ---
  {
    id: "src-income-tax",
    name: "Income tax (verification pending)",
    authority: "Income Tax Department",
    url: null,
    sourceType: "other",
    effectiveDate: null,
    lastVerified: null,
    verified: false,
  },
]

const SOURCE_INDEX = new Map(SOURCES.map((s) => [s.id, s]))

export function getSourceById(id: string | undefined): Source | undefined {
  if (!id) return undefined
  return SOURCE_INDEX.get(id)
}

export function listSources(): Source[] {
  return SOURCES
}
