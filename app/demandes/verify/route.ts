// TEMPORARY runtime check — confirms the Supabase env vars are set on this
// deployment (no DB write, no secrets exposed). Delete after testing.
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ supabaseConfigured: createSupabaseServerClient() !== null });
}
