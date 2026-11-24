"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendContactEmails } from "@/lib/email/contact-notifications";
import { EMAIL_INVALIDE, looksLikeRobot, sentTooFast } from "@/lib/forms/checks";
import { insertError, type SubmitError } from "@/lib/forms/submit-errors";
import { cleanContact, validateContact, type ContactErrors } from "@/lib/forms/contact";
import { DOMAINE_INVALIDE, emailDomainAcceptsMail } from "@/lib/forms/email-domain";

export interface ContactInput {
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  besoin?: string;
  message?: string;
  tracking?: Record<string, unknown>;
  /** Honeypot field (hidden; only robots fill it) and time spent on the form, in ms. */
  trap?: string;
  elapsedMs?: number;
}

export interface SubmitResult {
  ok: boolean;
  error?: SubmitError;
  /** Field-level reasons when the server refuses a value. */
  fields?: ContactErrors;
}

export async function submitContactMessage(
  input: ContactInput,
): Promise<SubmitResult> {
  // A robot is answered as if all went well; nothing is stored or sent.
  if (looksLikeRobot(input?.trap)) {
    console.warn("[contact] submission dropped as automated.");
    return { ok: true };
  }
  if (sentTooFast(input?.elapsedMs)) return { ok: false, error: "too_fast" };

  // Server-side validation (Server Actions are reachable via direct POST).
  const f = cleanContact(input ?? {});
  const fields = validateContact(f);
  if (Object.keys(fields).length > 0) return { ok: false, error: "validation", fields };
  if (!(await emailDomainAcceptsMail(f.email))) {
    return { ok: false, error: "validation", fields: { email: DOMAINE_INVALIDE } };
  }

  const record = {
    full_name: f.full_name,
    email: f.email,
    phone: f.phone || null,
    company: f.company || null,
    besoin: f.besoin,
    message: f.message || null,
  };

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    console.warn("[contact] Supabase not configured: message not persisted.");
    return { ok: false, error: "unavailable" };
  }

  // La table contact_messages vit dans le schéma dédié "cherryz" (et non "public").
  const { error } = await supabase.schema("cherryz").from("contact_messages").insert({
    ...record,
    tracking: input.tracking ?? {},
  });
  if (error) {
    console.error(`[contact] insert failed (${error.code}):`, error.message);
    const cause = insertError(error);
    if (cause.rule === "email_format") return { ok: false, error: "rejected", fields: { email: EMAIL_INVALIDE } };
    if (cause.rule === "besoin") return { ok: false, error: "rejected", fields: { besoin: "Choisissez votre besoin dans la liste." } };
    return { ok: false, error: cause.error };
  }

  await sendContactEmails(record);
  return { ok: true };
}
