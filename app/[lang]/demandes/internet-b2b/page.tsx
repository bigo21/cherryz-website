import type { Metadata } from "next";
import QuoteWizard from "@/components/quote/QuoteWizard";
import DemandeHeader from "@/components/quote/DemandeHeader";
import { quote } from "@/content/quote";
import { getLang, pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return pageMetadata(lang, "/demandes/internet-b2b", quote[lang].ip.meta);
}

export default async function DemandeInternetB2B() {
  const t = quote[await getLang()].ip;
  return (
    <>
      <DemandeHeader title={t.title} facts={t.facts} />
      <section className="pb-24">
        <div className="mx-auto -mt-16 max-w-[760px] px-4 sm:px-6">
          <QuoteWizard type="ip" />
        </div>
      </section>
    </>
  );
}
