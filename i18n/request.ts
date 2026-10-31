import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "@/lib/i18n/config";

// next-intl request config: the locale comes from the [lang] root segment, or from
// an explicit `locale` (server actions and emails, where root params don't exist).
export default getRequestConfig(async ({ locale }) => {
  const current = locale ?? (await lang());
  if (!hasLocale(current)) notFound();
  return {
    locale: current,
    timeZone: "Africa/Douala",
    messages: (await import(`../messages/${current}.json`)).default,
  };
});
