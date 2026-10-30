import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";
import LinkLine from "./LinkLine";

const OFFERS = [
  { key: "ip", photo: "/photos/service-ip.jpg", page: "/internet-b2b", quote: QUOTE.ip },
  { key: "wifi", photo: "/photos/wifi-hero.jpg", page: "/wifi-zone", quote: QUOTE.wifi },
] as const;
const ROWS = ["audience", "deliverable", "edge"] as const;

// The original 220 px usage photos, kept at a size where they stay sharp.
const USAGES = [
  { key: "vpn", src: "/photos/fond-vpn.jpg" },
  { key: "servers", src: "/photos/fond-serveurs.jpg" },
  { key: "voip", src: "/photos/fond-callcenter.jpg" },
  { key: "compliance", src: "/photos/fond-conformite.jpg" },
  { key: "cctv", src: "/photos/fond-video.jpg" },
] as const;

// Typical WiFi Zone projects (indicative results, labelled as such).
const CASES = [
  { key: "building", src: "/photos/cas-immeuble.jpg" },
  { key: "neighbourhood", src: "/photos/cas-quartier.jpg" },
  { key: "hotel", src: "/photos/cas-hotel.jpg" },
] as const;

/** The two offers side by side, each a photo tile over its own spec panel. */
export default async function OfferPanels() {
  const t = await getTranslations("Home");
  const tb = await getTranslations("InternetB2B.ip.usages");
  const tc = await getTranslations("WifiZone.cases");
  const lang = await getLocale();
  return (
    <section id="services" className="wall-page bg-seam text-white" aria-labelledby="offers-title">
      <h2 id="offers-title" className="m-0 mx-auto max-w-[1320px] px-4 pb-10 pt-20 font-condensed text-[clamp(36px,4.2vw,56px)] font-bold leading-[0.98] tracking-[-0.015em] sm:px-6 md:px-12 md:pt-28">
        {t("offers.title")}
      </h2>
      <div className="grid grid-cols-1 gap-[2px] lg:grid-cols-2">
        {OFFERS.map((o) => {
          const label = t(`offers.${o.key}.label`);
          return (
            <article key={o.key} className="flex flex-col bg-tile">
              <figure data-link="online" className="relative m-0 aspect-[16/10] overflow-hidden">
                <Image src={o.photo} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-seam/85 px-4 py-2 font-sans text-[13.5px] font-semibold">
                  <LinkLine className="text-signal" /> {label}
                </figcaption>
              </figure>
              <div className="flex flex-1 flex-col px-5 pb-10 pt-8 sm:px-10">
                <h3 className="m-0 font-condensed text-[clamp(32px,3vw,42px)] font-bold leading-[1.02]">{label}</h3>
                <p className="mt-2 font-sans text-[18px] text-readout/80">{t(`offers.${o.key}.title`)}</p>
                <dl className="m-0 mt-6 flex-1 border-t border-white/12">
                  {ROWS.map((r) => (
                    <div key={r} className="grid grid-cols-1 gap-1 border-b border-white/12 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                      <dt className="font-sans text-[14.5px] font-semibold text-readout/70">{t(`offers.${o.key}.rows.${r}.term`)}</dt>
                      <dd className="m-0 font-sans text-[16px] text-white">{t(`offers.${o.key}.rows.${r}.detail`)}</dd>
                    </div>
                  ))}
                </dl>
                {o.key === "ip" && (
                  <div className="mt-7">
                    <h4 className="m-0 font-sans text-[14.5px] font-semibold text-readout/70">{t("usagesTitle")}</h4>
                    <ul className="m-0 mt-3 grid list-none grid-cols-3 gap-[2px] p-0 sm:grid-cols-5">
                      {USAGES.map((u) => (
                        <li key={u.key} className="bg-seam">
                          <Image src={u.src} alt="" width={110} height={110} className="aspect-square h-auto w-full object-cover" />
                          <span className="block px-2 py-2 font-sans text-[12.5px] leading-tight text-readout/85">{tb(`${u.key}.title`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {o.key === "wifi" && (
                  <div className="mt-7">
                    <h4 className="m-0 font-sans text-[14.5px] font-semibold text-readout/70">{tc("sheet")}</h4>
                    <ul className="m-0 mt-3 grid list-none grid-cols-1 gap-[2px] p-0 sm:grid-cols-3">
                      {CASES.map((c) => (
                        <li key={c.key} className="bg-seam">
                          <span className="relative block aspect-[16/10]">
                            <Image src={c.src} alt="" fill sizes="(max-width: 640px) 100vw, 220px" className="object-cover" />
                          </span>
                          <span className="block px-3 pb-3 pt-2">
                            <span className="block font-sans text-[13px] text-readout/75">{tc(`items.${c.key}.who`)}</span>
                            <span className="block font-mono text-[17px] font-bold text-white">{tc(`items.${c.key}.stat`)}</span>
                            <span className="block font-sans text-[12.5px] text-readout/75">{tc(`items.${c.key}.unit`)}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-0 mt-2 font-sans text-[12.5px] text-readout/60">{tc("footnote")}</p>
                  </div>
                )}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href={localize(lang, o.quote)} className="inline-flex items-center gap-2 bg-cherry px-5 py-[14px] font-condensed text-[18px] font-semibold text-white transition-colors hover:bg-cherry-dark">
                    {t("offers.quote")}
                    <ArrowRightIcon aria-hidden className="text-[18px]" />
                  </Link>
                  <Link href={localize(lang, o.page)} className="font-sans text-[16px] font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">
                    {t("offers.discover", { label })}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
