"use server";

import { getSchema, type Answers, type QuoteType } from "@/lib/quote/schemas";
import { bizlinkPhone, cleanAnswers, validateSubmission } from "@/lib/quote/validation";
import { EMAIL_INVALIDE, looksLikeRobot, sentTooFast } from "@/lib/forms/checks";
import { insertError, type SubmitError } from "@/lib/forms/submit-errors";
import { DOMAINE_INVALIDE, emailDomainAcceptsMail } from "@/lib/forms/email-domain";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendQuoteEmails } from "@/lib/email/quote-notifications";

export interface SubmitPayload {
  type: QuoteType;
  answers: Answers;
  tracking?: Record<string, unknown>;
  /** Honeypot field (hidden; only robots fill it) and time spent on the form, in ms. */
  trap?: string;
  elapsedMs?: number;
}

export interface SubmitResult {
  ok: boolean;
  error?: SubmitError;
  /** Field-level reasons, keyed by question id, when the server refuses a value. */
  fields?: Record<string, string>;
}

/** Pull the key contact fields out of the answers, for easy querying/indexing. */
function extractContact(type: QuoteType, a: Answers) {
  const str = (id: string) => {
    const v = a[id];
    return typeof v === "string" && v.trim() ? v.trim() : null;
  };
  if (type === "ip") {
    return {
      full_name: str("q16"),
      email: str("q21"),
      phone: str("q20"),
      company: str("q18"),
    };
  }
  if (type === "bizlink") {
    return {
      full_name: str("q1"),
      email: str("q6"),
      phone: str("q5"),
      company: str("q3"),
    };
  }
  // wifi
  return {
    full_name: str("q16"),
    email: str("q18"),
    phone: str("q17"),
    company: str("q19"),
  };
}

/**
 * Persist a quote request. Server Actions are reachable via direct POST, so we
 * re-validate the whole submission here regardless of any client-side checks.
 */
export async function submitQuoteRequest(
  payload: SubmitPayload,
): Promise<SubmitResult> {
  const { type, tracking } = payload ?? ({} as SubmitPayload);
  if (type !== "ip" && type !== "wifi" && type !== "bizlink") {
    return { ok: false, error: "invalid_type" };
  }

  // A robot is answered as if all went well, so it learns nothing, and
  // nothing is stored or sent.
  if (looksLikeRobot(payload?.trap)) {
    console.warn(`[quote] ${type}: submission dropped as automated.`);
    return { ok: true };
  }
  if (sentTooFast(payload?.elapsedMs)) return { ok: false, error: "too_fast" };

  let answers = cleanAnswers(type, payload?.answers ?? {});
  const errors = validateSubmission(type, answers);
  if (Object.keys(errors).length > 0) {
    return { ok: false, error: "validation", fields: errors };
  }

  // The e-mail's domain must receive mail (DNS; accepted when it cannot tell).
  const emailQ = getSchema(type).flatMap((s) => s.questions).find((q) => q.type === "email");
  if (emailQ && answers[emailQ.id] && !(await emailDomainAcceptsMail(String(answers[emailQ.id])))) {
    return { ok: false, error: "validation", fields: { [emailQ.id]: DOMAINE_INVALIDE } };
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    console.warn(
      "[quote] Supabase not configured (missing SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY): submission not persisted.",
    );
    return { ok: false, error: "unavailable" };
  }

  // BizLink: store the phone in E.164 (dial code + number) and its country.
  if (type === "bizlink") {
    const phone = bizlinkPhone(answers);
    if ("e164" in phone) answers = { ...answers, q5: phone.e164, pays: phone.pays };
  }

  const contact = extractContact(type, answers);
  // La table quote_requests vit dans le schéma dédié "cherryz" (et non "public").
  const { error } = await supabase.schema("cherryz").from("quote_requests").insert({
    type,
    answers,
    tracking: tracking ?? {},
    ...contact,
  });

  if (error) {
    console.error(`[quote] insert failed (${error.code}):`, error.message);
    const cause = insertError(error);
    if (cause.rule === "email_format" && emailQ) {
      return { ok: false, error: "rejected", fields: { [emailQ.id]: EMAIL_INVALIDE } };
    }
    return { ok: false, error: cause.error };
  }

  // Best-effort emails: never fail the submission if sending errors out.
  await sendQuoteEmails({ type, contact, answers, tracking: tracking ?? {} });

  return { ok: true };
}
