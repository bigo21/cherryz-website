import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "@/lib/i18n/config";

// next-intl request config: the locale comes from an explicit `locale` (server
// actions and emails), else from the [lang] root segment, else from
// setRequestLocale (the global 404, rendered outside app/[lang]).
// `params.requestLocale` is only touched in that last case: reading it falls back
// to request headers, which would make every page dynamic instead of static.
export default getRequestConfig(async (params) => {
  const current = params.locale ?? (await lang()) ?? (await params.requestLocale);
  if (!hasLocale(current)) notFound();
  return {
    locale: current,
    timeZone: "Africa/Douala",
    messages: (await import(`../messages/${current}.json`)).default,
  };
});
