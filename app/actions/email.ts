"use server";

import { checkEmail, normalizeEmail, suggestEmail } from "@/lib/forms/checks";
import { DOMAINE_INVALIDE, emailDomainAcceptsMail } from "@/lib/forms/email-domain";

export interface EmailCheck {
  /** Why the address is refused, for the visitor. */
  error?: string;
  /** A likely correction of a typo in a common domain (not a refusal). */
  suggestion?: string;
}

/**
 * Checks an e-mail before a form moves on: strict syntax, then whether its
 * domain receives mail (DNS, fail-open). Called when the visitor leaves the
 * step or submits; the submit actions check again on their own.
 */
export async function checkEmailAddress(raw: string): Promise<EmailCheck> {
  const email = normalizeEmail(raw);
  const error = checkEmail(email);
  if (error) return { error, suggestion: suggestEmail(email) ?? undefined };
  if (!(await emailDomainAcceptsMail(email))) {
    return { error: DOMAINE_INVALIDE, suggestion: suggestEmail(email) ?? undefined };
  }
  return { suggestion: suggestEmail(email) ?? undefined };
}
