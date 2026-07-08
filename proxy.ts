import { NextResponse, type NextRequest } from "next/server";

// Public gate (Next.js 16 Proxy, ex-Middleware).
//
// When MAINTENANCE_MODE === "on", only the maintenance page is reachable; every
// other URL is rewritten to /maintenance with a 503. The flag is set PER ENVIRONMENT
// on Vercel (Production = "on" → cherryz.tech shows maintenance only; Preview = unset
// → the preview domain shows the full work-in-progress site). See .env.example.
const PREVIEW_COOKIE = "chz_preview";

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Always allow the maintenance page itself + directly-served brand assets.
  if (pathname === "/maintenance" || pathname.startsWith("/brand")) {
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
