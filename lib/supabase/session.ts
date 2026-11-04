import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Supabase client acting as the signed-in team member (dashboard /admin), its
 * session kept in cookies. Every read goes through the cherryz schema's RLS
 * with this person's JWT: membership and the second factor are checked by the
 * database itself (cherryz.is_team_member()), not only by these pages.
 *
 * In a Server Component the cookies are read-only: a refreshed token cannot be
 * written back there, which is why proxy.ts refreshes the session on every
 * /admin request first. Server Actions and Route Handlers can write them.
 */
export async function createSupabaseSessionClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase is not configured (SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY).");

  const store = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) store.set(name, value, options);
        } catch {
          // Server Component: read-only cookies; proxy.ts has refreshed them.
        }
      },
    },
  });
}
