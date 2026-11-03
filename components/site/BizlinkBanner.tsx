import Link from "next/link";
import { BIZLINK } from "@/lib/site/site";

// Promo BizLink band, shown under the reassurance strip on Accueil and Internet B2B.
export default function BizlinkBanner() {
  return (
    <section className="bg-white pt-14">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <Link
          href={BIZLINK.href}
          className="group relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-2xl bg-cherry-alt px-[30px] py-7 text-white shadow-[0_18px_40px_-16px_rgba(160,4,45,.95)] transition-transform hover:-translate-y-[2px]"
        >
          <div className="absolute -right-8 -top-10 h-[170px] w-[170px] rounded-full bg-white/[0.08]" />
          <div className="relative">
            <div className="font-condensed text-[13px] font-semibold tracking-[1.4px] text-white/75">
              OFFRE PROMO · BIZLINK
            </div>
            <p className="mt-1 font-condensed text-[28px] font-bold leading-[1.1]">
              Internet entreprises à 75 000 FCFA / mois TTC, jusqu&apos;à 250 Mbps
            </p>
            <p className="mt-[6px] font-sans text-[15.5px] leading-[1.5] text-white/85">
              Écoles · Hôtels 1 et 2 étoiles · Microfinances
            </p>
          </div>
          <span className="relative inline-block rounded-full bg-white px-[26px] py-[14px] font-condensed text-[17px] font-semibold tracking-[0.5px] text-cherry-alt transition-colors group-hover:bg-white/90">
            Découvrir la promo →
          </span>
        </Link>
      </div>
    </section>
  );
}
