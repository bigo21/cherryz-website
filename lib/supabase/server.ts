import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client. Used ONLY from Server Actions, so the env vars
 * are server-only (no NEXT_PUBLIC_ prefix → the key is never shipped to the
 * browser). Writes are constrained by the row-level security policies in the
 * cherryz schema: anonymous callers may INSERT but cannot read any row back.
 *
 * Returns `null` when the environment is not configured yet, so callers can
 * degrade gracefully instead of throwing at build/runtime.
 */
export function createSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const publishableKey =
    process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!url || !publishableKey) return null;

  return createClient(url, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
