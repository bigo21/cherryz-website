import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * Uses the publishable anon key (safe to expose): writes are constrained by
 * the row-level security policies defined in the migration
 * (`supabase/migrations/*_quote_requests.sql`): anonymous callers may INSERT a
 * quote request but cannot read any row back.
 *
 * Returns `null` when the environment is not configured yet, so callers can
 * degrade gracefully instead of throwing at build/runtime.
 */
export function createSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !publishableKey) return null;

  return createClient(url, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
