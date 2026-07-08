"use server";

import type { Answers, QuoteType } from "@/lib/quote/schemas";
import { validateSubmission } from "@/lib/quote/validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendQuoteEmails } from "@/lib/email/quote-notifications";

export interface SubmitPayload {
  type: QuoteType;
  answers: Answers;
  tracking?: Record<string, unknown>;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
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
  const { type, answers, tracking } = payload ?? ({} as SubmitPayload);

  if (type !== "ip" && type !== "wifi") {
    return { ok: false, error: "invalid_type" };
  }

  const errors = validateSubmission(type, answers ?? {});
  if (Object.keys(errors).length > 0) {
    return { ok: false, error: "validation" };
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    console.warn(
      "[quote] Supabase not configured (missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) — submission not persisted.",
    );
    return { ok: false, error: "not_configured" };
  }

  const contact = extractContact(type, answers);
  const { error } = await supabase.from("quote_requests").insert({
    type,
    answers,
    tracking: tracking ?? {},
    ...contact,
  });

  if (error) {
    console.error("[quote] insert failed:", error.message);
    return { ok: false, error: "db" };
  }

  // Best-effort emails: never fail the submission if sending errors out.
  await sendQuoteEmails({ type, contact, answers, tracking: tracking ?? {} });

  return { ok: true };
}
