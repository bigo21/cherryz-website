import type { Metadata } from "next";
import QuoteWizard from "@/components/quote/QuoteWizard";
import DemandeHeader from "@/components/quote/DemandeHeader";

export const metadata: Metadata = {
  title: "Demande de cotation IP Publique Dédiée | Cherryz",
  description:
    "Formulaire de demande de devis Internet professionnel avec IP publique dédiée. ± 3 minutes, réponse sous 48h, sans engagement.",
};

export default function DemandeInternetB2B() {
  return (
    <>
      <DemandeHeader title="Demande de devis Internet avec IP publique dédiée" facts={["± 3 minutes", "Réponse sous 48h", "Sans engagement"]} />
      <section className="pb-24">
        <div className="mx-auto -mt-16 max-w-[760px] px-4 sm:px-6">
          <QuoteWizard type="ip" />
        </div>
      </section>
    </>
  );
}
