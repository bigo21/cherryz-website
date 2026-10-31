import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import B2BHero from "@/components/beam/b2b/B2BHero";
import IpUsages from "@/components/beam/b2b/IpUsages";
import FeatureStage from "@/components/beam/b2b/FeatureStage";
import StepsBeam from "@/components/beam/b2b/StepsBeam";
import ClientBand from "@/components/beam/ClientBand";
import ContactClose from "@/components/site/ContactClose";
import { CAL_IP, QUOTE } from "@/lib/site/site";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("InternetB2B.meta");
  return pageMetadata("/internet-b2b", { title: t("title"), description: t("description") });
}

export default async function InternetB2B() {
  const t = await getTranslations("InternetB2B");
  return (
    <>
      <B2BHero />
      <IpUsages />
      <FeatureStage />
      <StepsBeam />
      <ClientBand />
      <ContactClose quoteHref={QUOTE.ip} callHref={CAL_IP} title={t("close")} />
    </>
  );
}
