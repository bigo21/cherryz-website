import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroWall from "@/components/wall/HeroWall";
import BrokerFlow from "@/components/wall/BrokerFlow";
import BandwidthConsole from "@/components/wall/BandwidthConsole";
import StepsRail from "@/components/wall/StepsRail";
import OfferPanels from "@/components/wall/OfferPanels";
import CoverageWall from "@/components/wall/CoverageWall";
import ClientWall from "@/components/wall/ClientWall";
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
      <HeroWall />
      <BrokerFlow />
      <BandwidthConsole />
      <StepsRail />
      <OfferPanels />
      <CoverageWall />
      <ClientWall />
      <ContactClose quoteHref={QUOTE.hub} />
    </>
  );
}
