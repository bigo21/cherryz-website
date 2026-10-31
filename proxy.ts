import { NextResponse, type NextRequest } from "next/server";
import { splitLocale } from "@/lib/i18n/config";

// Public gate (Next.js 16 Proxy, ex-Middleware).
//
// When MAINTENANCE_MODE === "on", only the maintenance page is reachable; every
// other URL is rewritten to /maintenance with a 503. The flag is set PER ENVIRONMENT
// on Vercel (Production = "on" → cherryz.tech shows maintenance only; Preview = unset
// → the preview domain shows the full work-in-progress site). See .env.example.
const PREVIEW_COOKIE = "chz_preview";

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // French is the canonical, unprefixed locale: /fr/... is only an internal route.
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  const { lang, path } = splitLocale(pathname);

  // Serve the request: English URLs map onto app/[lang] directly, French ones are
  // rewritten to /fr/... so the visible URL stays unprefixed.
  const pass = () =>
    lang === "fr"
      ? NextResponse.rewrite(new URL(`/fr${path === "/" ? "" : path}${req.nextUrl.search}`, req.url))
      : NextResponse.next();

  // Always reachable, even during maintenance: the maintenance page, the quote
  // request flow (/demandes) and the legal pages.
  if (
    path === "/maintenance" ||
    path === "/demandes" ||
    path.startsWith("/demandes/") ||
    path === "/mentions-legales" ||
    path === "/confidentialite"
  ) {
    return pass();
  }

  // Always allow Server Actions: the quote form POSTs to its current route and
  // must keep working even while the gate is closed.
  if (req.method === "POST" && req.headers.has("next-action")) {
    return pass();
  }

  // Fail-safe: default the gate ON in Vercel Production (so cherryz.tech never
  // exposes the WIP site if the flag is forgotten), OFF everywhere else. An explicit
  // MAINTENANCE_MODE ("on"/"off") always wins.
  const flag = process.env.MAINTENANCE_MODE;
  const maintenance = flag
    ? flag === "on"
    : process.env.VERCEL_ENV === "production";
  if (!maintenance) {
    return pass();
  }

  // Optional bypass to preview the real site on a gated domain: hit any URL once
  // with ?preview=<PREVIEW_SECRET> to set a cookie, then browse normally.
  const secret = process.env.PREVIEW_SECRET;
  if (secret) {
    if (searchParams.get("preview") === secret) {
      const res = pass();
      res.cookies.set(PREVIEW_COOKIE, secret, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
      return res;
    }
    if (req.cookies.get(PREVIEW_COOKIE)?.value === secret) {
      return pass();
    }
  }

  // Gate closed → serve the maintenance page for every other URL, as a 503.
  return NextResponse.rewrite(new URL(`/${lang}/maintenance`, req.url), {
    status: 503,
  });
}

export const config = {
  // Run on everything except Next internals and static files we always want served.
  matcher: [
    // Every page; static files (any path with an extension: /photos, /logos, /brand,
    // icon.png...) are served as is and never gated.
    "/((?!_next/static|_next/image|.*\\..*).*)",
  ],
};
