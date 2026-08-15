import type { RegistrationRule } from "@/types"

/**
 * DEMO DATA — illustrative registrations only.
 * These examples are not a determination that any registration legally applies
 * to a given business. Verified eligibility rules replace this later.
 */
export const MOCK_REGISTRATIONS: RegistrationRule[] = [
  {
    id: "reg-udyam",
    title: "Udyam (MSME) Registration",
    status: "likely_applicable",
    reason:
      "Small businesses often register as an MSME to access benefits and formal recognition. Your reported size suggests this is worth exploring.",
    detail:
      "Udyam registration is a common step for micro and small enterprises and can unlock scheme eligibility and easier access to credit. This demo does not confirm your specific eligibility.",
    documents: ["Business owner identity proof", "Business address proof", "Bank account details"],
    applicationHint: "Typically an online self-declaration process. Confirm the current official portal and steps.",
    sourceId: "src-udyam",
  },
  {
    id: "reg-fssai",
    title: "Food Business Licence / Registration",
    status: "likely_applicable",
    reason:
      "Businesses that handle or sell food usually need a food-safety registration or licence appropriate to their scale.",
    detail:
      "The type of food-safety registration or licence generally depends on turnover and the nature of the food operations. This demo flags it because the sample business is a bakery — verify the exact requirement for your case.",
    documents: ["Identity proof", "Business premises details", "Details of food products"],
    applicationHint: "Applied for through the relevant food-safety authority. Confirm the applicable tier and forms.",
    sourceId: "src-fssai",
  },
  {
    id: "reg-shops",
    title: "Shops & Establishment Registration",
    status: "review_needed",
    reason:
      "Many states require businesses with a commercial premises or employees to register locally. Requirements differ by state.",
    detail:
      "Shops & Establishment rules are state-specific and can relate to working hours, employee welfare and premises. Because you reported employees and a physical shop, this is worth reviewing for your state.",
    documents: ["Business address proof", "Owner identity proof", "Employee details"],
    applicationHint: "Handled at the state/municipal level. Confirm your state's specific portal and timelines.",
    sourceId: "src-shops-est",
  },
]

export function getRegistrations(): RegistrationRule[] {
  return MOCK_REGISTRATIONS
}
