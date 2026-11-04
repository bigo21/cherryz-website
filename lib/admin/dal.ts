import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseSessionClient } from "@/lib/supabase/session";

export interface Member {
  userId: string;
  displayName: string;
  role: "admin" | "commercial";
}

/** Where to go once signed in: a dashboard page, never another site. */
export function safeNext(suite: unknown): string {
  return typeof suite === "string" && suite.startsWith("/admin") && !suite.startsWith("//") ? suite : "/admin";
}

/**
 * Who is asking, and how far they got: no session, a session that is not a
 * Cherryz team member, a member who still owes the second factor (to set up or
 * to enter), or a member at aal2. Cached for one render pass.
 *
 * The member row is read at aal1 on purpose: the database lets each account
 * read its own row whatever its level (team_members_select_soi), so the site
 * can tell a member who must enter a code from an account with no access.
 */
export const getAdminState = cache(async () => {
  const supabase = await createSupabaseSessionClient();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return { step: "signed-out" as const, supabase };

  const { data: row, error } = await supabase
    .schema("cherryz")
    .from("team_members")
    .select("user_id, display_name, role")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw new Error(`team_members lookup failed: ${error.code}`);
  if (!row) return { step: "not-member" as const, supabase, email: user.email ?? "" };

  const member: Member = { userId: row.user_id, displayName: row.display_name, role: row.role };
  // Two-factor authentication is required: a password alone opens nothing.
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal?.currentLevel !== "aal2") {
    const step = aal?.nextLevel === "aal2" ? ("verify" as const) : ("enroll" as const);
    return { step, supabase, member };
  }
  return { step: "ready" as const, supabase, member };
});

/**
 * For every dashboard page and action: a member at aal2, or a redirect to the
 * step they are missing. The database checks the same thing again through RLS.
 */
export async function requireMember(here = "/admin") {
  const state = await getAdminState();
  const suite = `?suite=${encodeURIComponent(here)}`;
  if (state.step === "signed-out") redirect(`/admin/connexion${suite}`);
  if (state.step === "not-member") redirect("/admin/refus");
  if (state.step === "verify") redirect(`/admin/verification${suite}`);
  if (state.step === "enroll") redirect(`/admin/securite${suite}`);
  return { supabase: state.supabase, member: state.member };
}
