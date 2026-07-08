"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendContactEmails } from "@/lib/email/contact-notifications";

export interface ContactInput {
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  besoin?: string;
  message?: string;
  tracking?: Record<string, unknown>;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function submitContactMessage(
  input: ContactInput,
): Promise<SubmitResult> {
  const full_name = (input?.full_name ?? "").trim();
  const email = (input?.email ?? "").trim();
  const besoin = (input?.besoin ?? "").trim();

  // Server-side validation (Server Actions are reachable via direct POST).
  if (!full_name) return { ok: false, error: "validation" };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "validation" };
  if (!besoin) return { ok: false, error: "validation" };

  const record = {
    full_name,
    email,
    phone: input.phone?.trim() || null,
    company: input.company?.trim() || null,
    besoin,
    message: input.message?.trim() || null,
  };

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    console.warn("[contact] Supabase not configured — message not persisted.");
    return { ok: false, error: "not_configured" };
  }

  const { error } = await supabase.from("contact_messages").insert({
    ...record,
    tracking: input.tracking ?? {},
  });
  if (error) {
    console.error("[contact] insert failed:", error.message);
    return { ok: false, error: "db" };
  }

  await sendContactEmails(record);
  return { ok: true };
}
