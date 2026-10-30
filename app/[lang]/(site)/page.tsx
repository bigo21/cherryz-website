import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroBeam from "@/components/beam/HeroBeam";
import BeamRelay from "@/components/beam/BeamRelay";
import LinkBudget from "@/components/beam/LinkBudget";
import FieldRoute from "@/components/beam/FieldRoute";
import OffersDusk from "@/components/beam/OffersDusk";
import CoverageDusk from "@/components/beam/CoverageDusk";
import ClientBand from "@/components/beam/ClientBand";
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
      <HeroBeam />
      <BeamRelay />
      <LinkBudget />
      <FieldRoute />
      <OffersDusk />
      <CoverageDusk />
      <ClientBand />
      <ContactClose quoteHref={QUOTE.hub} />
    </>
  );
}
