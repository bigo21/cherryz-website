import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Public gate (Next.js 16 Proxy, ex-Middleware).
//
// When MAINTENANCE_MODE === "on", only the maintenance page is reachable; every
// other URL is rewritten to /maintenance with a 503. The flag is set PER ENVIRONMENT
// on Vercel (Production = "on" → cherryz.tech shows maintenance only; Preview = unset
// → the preview domain shows the full work-in-progress site). See .env.example.
const PREVIEW_COOKIE = "chz_preview";

/**
 * Team dashboard (/admin): refreshes the Supabase session cookies before the
 * page renders (Server Components cannot write cookies). Access itself is
 * decided by the pages and by the database's RLS, never here.
 */
async function refreshAdminSession(req: NextRequest) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  let res = NextResponse.next({ request: req });
  if (!url || !key) return res;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list) => {
        for (const { name, value } of list) req.cookies.set(name, value);
        res = NextResponse.next({ request: req });
        for (const { name, value, options } of list) res.cookies.set(name, value, options);
      },
    },
  });
  // getUser() validates the token with Supabase Auth and refreshes it if needed.
  await supabase.auth.getUser();
  // Never cached, never indexed.
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // The team dashboard stays reachable during maintenance.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return refreshAdminSession(req);
  }

  // Always reachable, even during maintenance: the maintenance page, the quote
  // request flow (/demandes), and directly-served brand assets.
  if (
    pathname === "/maintenance" ||
    pathname === "/demandes" ||
    pathname.startsWith("/demandes/") ||
    pathname.startsWith("/brand")
  ) {
    return NextResponse.next();
  }

  // Always allow Server Actions: the quote form POSTs to its current route and
  // must keep working even while the gate is closed.
  if (req.method === "POST" && req.headers.has("next-action")) {
    return NextResponse.next();
  }

  // Fail-safe: default the gate ON in Vercel Production (so cherryz.tech never
  // exposes the WIP site if the flag is forgotten), OFF everywhere else. An explicit
  // MAINTENANCE_MODE ("on"/"off") always wins.
  const flag = process.env.MAINTENANCE_MODE;
  const maintenance = flag
    ? flag === "on"
    : process.env.VERCEL_ENV === "production";
  if (!maintenance) {
    return NextResponse.next();
  }

  // Optional bypass to preview the real site on a gated domain: hit any URL once
  // with ?preview=<PREVIEW_SECRET> to set a cookie, then browse normally.
  const secret = process.env.PREVIEW_SECRET;
  if (secret) {
    if (searchParams.get("preview") === secret) {
      const res = NextResponse.next();
      res.cookies.set(PREVIEW_COOKIE, secret, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
      return res;
    }
    if (req.cookies.get(PREVIEW_COOKIE)?.value === secret) {
      return NextResponse.next();
    }
  }

  // Gate closed → serve the maintenance page for every other URL, as a 503.
  return NextResponse.rewrite(new URL("/maintenance", req.url), {
    status: 503,
  });
}

export const config = {
  // Run on everything except Next internals and static files we always want served.
  matcher: [
    "/((?!_next/static|_next/image|icon.png|apple-icon.png|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
