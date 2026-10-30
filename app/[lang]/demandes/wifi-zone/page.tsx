import type { Metadata } from "next";
import QuoteWizard from "@/components/quote/QuoteWizard";
import DemandeHeader from "@/components/quote/DemandeHeader";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Quote.wifi.meta");
  return pageMetadata("/demandes/wifi-zone", { title: t("title"), description: t("description") });
}

export default async function DemandeWifiZone() {
  const t = await getTranslations("Quote.wifi");
  return (
    <>
      <DemandeHeader title={t("title")} facts={(["duration", "reply", "survey"] as const).map((k) => t(`facts.${k}`))} />
      <section className="pb-24">
        <div className="mx-auto -mt-16 max-w-[760px] px-4 sm:px-6">
          <QuoteWizard type="wifi" />
        </div>
      </section>
    </>
  );
}
