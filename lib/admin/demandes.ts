import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Answers } from "@/lib/quote/schemas";
import { summarizeAnswers } from "@/lib/quote/summary";
import { isOffre, isStatut } from "./labels";

/** One row of cherryz.demandes (all requests, all sources). */
export interface Demande {
  statut_id: string;
  source: "quote_requests" | "contact_messages";
  demande_id: string;
  offre: string;
  created_at: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  answers: Record<string, unknown>;
  tracking: Record<string, unknown>;
  statut: string;
  motif_perte: string | null;
  conseiller: string | null;
  statut_modifie_le: string;
  ghl_status: string | null;
  ghl_contact_id: string | null;
}

export interface Filtres {
  offre?: string;
  statut?: string;
  q?: string;
}

/** Keeps only known values; anything else is dropped rather than passed to the query. */
export function lireFiltres(params: Record<string, string | string[] | undefined>): Filtres {
  const one = (k: string) => (typeof params[k] === "string" ? (params[k] as string) : undefined);
  const q = one("q")?.trim().slice(0, 80);
  return {
    offre: isOffre(one("offre")) ? one("offre") : undefined,
    statut: isStatut(one("statut")) ? one("statut") : undefined,
    q: q || undefined,
  };
}

/** Same filters as a query string, for links (export, clearing one filter). */
export function versQuery(f: Filtres, change: Partial<Filtres> = {}): string {
  const all = { ...f, ...change };
  const p = new URLSearchParams();
  for (const k of ["offre", "statut", "q"] as const) if (all[k]) p.set(k, all[k] as string);
  const s = p.toString();
  return s ? `?${s}` : "";
}

/** The most recent requests matching the filters (newest first). */
export async function listerDemandes(supabase: SupabaseClient, f: Filtres, limite = 300) {
  let query = supabase.schema("cherryz").from("demandes").select("*").order("created_at", { ascending: false }).limit(limite);
  if (f.offre) query = query.eq("offre", f.offre);
  if (f.statut) query = query.eq("statut", f.statut);
  if (f.q) {
    // PostgREST's or() syntax treats , ( ) * as operators: strip them from the search.
    const t = f.q.replace(/[,()*%\\]/g, " ").trim();
    if (t) query = query.or(["full_name", "email", "company", "phone"].map((c) => `${c}.ilike.*${t}*`).join(","));
  }
  const { data, error } = await query;
  if (error) throw new Error(`demandes query failed: ${error.code}`);
  return (data ?? []) as Demande[];
}

/** Counts per offer and per status, over all requests (for the filter chips). */
export async function compterDemandes(supabase: SupabaseClient) {
  const { data, error } = await supabase.schema("cherryz").from("demandes").select("offre, statut");
  if (error) throw new Error(`demandes count failed: ${error.code}`);
  const parOffre: Record<string, number> = {};
  const parStatut: Record<string, number> = {};
  for (const r of data ?? []) {
    parOffre[r.offre] = (parOffre[r.offre] ?? 0) + 1;
    parStatut[r.statut] = (parStatut[r.statut] ?? 0) + 1;
  }
  return { total: data?.length ?? 0, parOffre, parStatut };
}

/** City of a request, from the question that holds it in each form. */
export function villeDe(d: Demande): string {
  const q = d.offre === "bizlink" ? "q4" : d.offre === "ip" || d.offre === "wifi" ? "q13" : null;
  const v = q ? d.answers?.[q] : undefined;
  return typeof v === "string" ? v : "";
}

/** The request's answers as label/value pairs, in the form's order. */
export function reponsesLisibles(d: Demande): { label: string; value: string }[] {
  if (d.offre === "contact") {
    return [
      { label: "Besoin", value: String(d.answers?.besoin ?? "") },
      { label: "Message", value: String(d.answers?.message ?? "") },
    ].filter((r) => r.value);
  }
  if (d.offre === "ip" || d.offre === "wifi" || d.offre === "bizlink") {
    return summarizeAnswers(d.offre, d.answers as Answers);
  }
  return Object.entries(d.answers ?? {}).map(([label, v]) => ({ label, value: String(v) }));
}
