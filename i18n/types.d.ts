import type messages from "@/messages/fr.json";
import type { Locale } from "@/lib/i18n/config";

// Typed keys and locales for next-intl: French is the reference catalog.
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
