import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroCoverage from "@/components/map/HeroCoverage";
import MapCountry from "@/components/map/MapCountry";
import LinkBudget from "@/components/map/LinkBudget";
import FieldTrail from "@/components/map/FieldTrail";
import OffersMap from "@/components/map/OffersMap";
import CoverageZones from "@/components/map/CoverageZones";
import ClientBand from "@/components/map/ClientBand";
import ContactClose from "@/components/site/ContactClose";
import { QUOTE } from "@/lib/site/site";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Home.meta");
  return pageMetadata("/", { title: t("title"), description: t("description") });
}

export default function Home() {
  return (
    <>
      <HeroCoverage />
      <MapCountry />
      <LinkBudget />
      <FieldTrail />
      <OffersMap />
      <CoverageZones />
      <ClientBand />
      <ContactClose quoteHref={QUOTE.hub} />
    </>
  );
}
