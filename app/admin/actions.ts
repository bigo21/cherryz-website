"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminState, requireMember, safeNext } from "@/lib/admin/dal";
import { isStatut } from "@/lib/admin/labels";
import { createSupabaseSessionClient } from "@/lib/supabase/session";

export interface FormState {
  message?: string;
  email?: string;
}

/** E-mail and password. The second factor comes next (verification or securite). */
export async function signIn(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return { email, message: "E-mail et mot de passe requis." };

  const supabase = await createSupabaseSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // Supabase Auth limits attempts on its side; its message is not shown as is.
    return { email, message: "E-mail ou mot de passe incorrect." };
  }
  redirect(safeNext(form.get("suite")));
}

/**
 * Checks the authenticator app's code for a TOTP factor. On success the
 * session becomes aal2 (the cookies are rewritten) and the member goes on.
 * Used both on first set-up (securite, the factor being enrolled) and at each
 * sign-in (verification, the verified factor).
 */
export async function verifyCode(_: FormState, form: FormData): Promise<FormState> {
  const code = String(form.get("code") ?? "").replace(/\s/g, "");
  if (!/^\d{6}$/.test(code)) return { message: "Le code compte 6 chiffres." };

  const state = await getAdminState();
  if (state.step !== "verify" && state.step !== "enroll") redirect("/admin");

  let factorId = String(form.get("factorId") ?? "");
  if (state.step === "verify") {
    const { data } = await state.supabase.auth.mfa.listFactors();
    factorId = data?.totp?.[0]?.id ?? "";
  }
  if (!factorId) return { message: "Rechargez la page et recommencez." };

  const { error } = await state.supabase.auth.mfa.challengeAndVerify({ factorId, code });
  if (error) return { message: "Code incorrect ou expiré. Saisissez le code affiché maintenant." };
  redirect(safeNext(form.get("suite")));
}

/**
 * Signs out of THIS browser only (scope local): accounts are shared with the
 * other Umdeny sites, whose sessions must not be revoked from here.
 */
export async function signOut() {
  const supabase = await createSupabaseSessionClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/admin/connexion");
}

/** Commercial follow-up of one request: status, reason when lost, adviser. */
export async function updateStatus(_: FormState, form: FormData): Promise<FormState> {
  const id = String(form.get("statutId") ?? "");
  const { supabase } = await requireMember(`/admin/demandes/${id}`);

  const statut = form.get("statut");
  if (!isStatut(statut)) return { message: "Statut inconnu." };
  const motif = String(form.get("motif") ?? "").trim().slice(0, 500);
  const conseiller = String(form.get("conseiller") ?? "") || null;

  // RLS lets members update only statut, motif_perte and conseiller; the
  // database stamps who and when, and keeps the history.
  const { data, error } = await supabase
    .schema("cherryz")
    .from("demande_statut")
    .update({ statut, motif_perte: statut === "perdu" ? motif || null : null, conseiller })
    .eq("id", id)
    .select("id");
  if (error || !data?.length) return { message: "Le statut n'a pas pu être enregistré. Réessayez." };

  revalidatePath("/admin");
  revalidatePath(`/admin/demandes/${id}`);
  return { message: "Enregistré." };
}
