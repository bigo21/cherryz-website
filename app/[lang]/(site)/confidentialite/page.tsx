import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LegalPage from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Legal.privacy.meta");
  return pageMetadata("/confidentialite", { title: t("title"), description: t("description") });
}

export default function Confidentialite() {
  return <LegalPage doc="privacy" />;
}
