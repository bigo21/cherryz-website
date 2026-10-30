import type { Metadata } from "next";
import QuoteWizard from "@/components/quote/QuoteWizard";
import DemandeHeader from "@/components/quote/DemandeHeader";

export const metadata: Metadata = {
  title: "Demande de cotation WiFi Zone | Cherryz",
  description:
    "Formulaire pour lancer votre WiFi Zone monétisable (immeuble, hôtel, quartier…). ± 3 minutes, réponse sous 48h, diagnostic gratuit.",
};

export default function DemandeWifiZone() {
  return (
    <>
      <DemandeHeader title="Je veux lancer ma WiFi Zone" facts={["± 3 minutes", "Réponse sous 48h", "Diagnostic gratuit"]} />
      <section className="pb-24">
        <div className="mx-auto -mt-16 max-w-[760px] px-4 sm:px-6">
          <QuoteWizard type="wifi" />
        </div>
      </section>
    </>
  );
}
