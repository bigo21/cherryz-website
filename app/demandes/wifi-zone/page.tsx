import type { Metadata } from "next";
import Link from "next/link";
import QuoteWizard from "@/components/quote/QuoteWizard";
import { WifiIcon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Demande de cotation WiFi Zone — Cherryz",
  description:
    "Formulaire pour lancer votre WiFi Zone monétisable (immeuble, hôtel, quartier…). ± 3 minutes, réponse sous 48h, diagnostic gratuit.",
};

export default function DemandeWifiZone() {
  return (
    <>
      <header className="relative overflow-hidden bg-navy-deep pb-[60px] pt-[140px]">
        <div
          className="absolute bottom-0 right-0 top-0 z-0 w-[38%] opacity-90"
          style={{ background: "linear-gradient(135deg,rgba(162,3,45,.85),rgba(125,3,35,.78))", clipPath: "polygon(45% 0,100% 0,100% 100%,18% 100%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[900px] px-6">
          <Link
            href="/demandes"
            className="mb-[18px] inline-flex items-center gap-[7px] font-condensed text-[14px] font-semibold tracking-[0.5px] text-white/60 transition-colors hover:text-white"
          >
            ← Toutes les demandes
          </Link>
          <div className="mb-[18px] flex w-fit items-center gap-[9px] rounded-full border border-white/[0.22] bg-white/[0.04] px-[14px] py-[7px]">
            <WifiIcon className="text-[15px] text-white" />
            <span className="font-condensed text-[12px] font-semibold tracking-[1.4px] text-white/90">
              INTERNET · WIFI ZONE
            </span>
          </div>
          <h1 className="m-0 font-condensed text-[clamp(32px,4.4vw,42px)] font-bold leading-[1.05] tracking-[-0.3px] text-white">
            Je veux lancer ma WiFi Zone
          </h1>
          <p className="mt-[14px] font-sans text-[17px] leading-[1.55] text-white/75">
            ± 3 minutes · Réponse sous 48h · Diagnostic gratuit
          </p>
        </div>
      </header>

      <section className="pb-[100px] pt-[50px]">
        <div className="mx-auto -mt-10 max-w-[700px] px-6">
          <QuoteWizard type="wifi" />
        </div>
      </section>
    </>
  );
}
