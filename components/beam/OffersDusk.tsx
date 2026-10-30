import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";

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

/** The two offers as two full-bleed photographs, their specs set low on each one. */
export default async function OffersDusk() {
  const t = await getTranslations("Home");
  const tb = await getTranslations("InternetB2B.ip.usages");
  const tc = await getTranslations("WifiZone.cases");
  const lang = await getLocale();

  const offer = (key: "ip" | "wifi", photo: string, quote: string, page: string, extra: React.ReactNode) => {
    const label = t(`offers.${key}.label`);
    return (
      <article className="relative overflow-hidden bg-night">
        <Image src={photo} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night from-50% via-night/75 via-[68%] to-night/0" />
        <div className="relative px-4 pb-12 pt-[300px] sm:px-8 sm:pt-[380px] lg:px-12 lg:pb-14 lg:pt-[440px]">
          <h3 className="m-0 font-condensed text-[clamp(40px,4vw,60px)] font-bold leading-[0.95]">{label}</h3>
          <p className="m-0 mt-2 max-w-[34ch] font-sans text-[19px] leading-[1.4] text-haze">{t(`offers.${key}.title`)}</p>
          <dl className="m-0 mt-6 border-t border-white/15">
            {ROWS.map((r) => (
              <div key={r} className="grid grid-cols-1 gap-1 border-b border-white/15 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                <dt className="font-sans text-[14.5px] font-semibold text-haze/75">{t(`offers.${key}.rows.${r}.term`)}</dt>
                <dd className="m-0 font-sans text-[16px] text-white">{t(`offers.${key}.rows.${r}.detail`)}</dd>
              </div>
            ))}
          </dl>
          {extra}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={localize(lang, quote)}
              className="inline-flex items-center gap-3 bg-cherry px-6 py-4 font-condensed text-[19px] font-semibold text-white transition-colors hover:bg-cherry-dark"
            >
              {t("offers.quote")}
              <ArrowRightIcon aria-hidden className="text-[19px]" />
            </Link>
            <Link href={localize(lang, page)} className="font-sans text-[16px] font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">
              {t("offers.discover", { label })}
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="services" className="beam-page bg-night text-white" aria-labelledby="offers-title">
      <h2 id="offers-title" className="m-0 mx-auto max-w-[1360px] px-4 pb-12 pt-20 font-condensed text-[clamp(38px,4.6vw,64px)] font-bold leading-[0.95] tracking-[-0.015em] sm:px-6 md:px-12 md:pt-28">
        {t("offers.title")}
      </h2>
      <div className="grid grid-cols-1 gap-[3px] bg-beam lg:grid-cols-2">
        {offer(
          "ip",
          "/photos/service-ip.jpg",
          QUOTE.ip,
          "/internet-b2b",
          <div className="mt-7">
            <h4 className="m-0 font-sans text-[14.5px] font-semibold text-haze/75">{t("usagesTitle")}</h4>
            <ul className="m-0 mt-3 grid list-none grid-cols-2 gap-x-3 gap-y-4 p-0 sm:grid-cols-5">
              {USAGES.map((u) => (
                <li key={u.key}>
                  <Image src={u.src} alt="" width={110} height={110} className="aspect-square h-auto w-full max-w-[110px] object-cover" />
                  <span className="mt-2 block font-sans text-[13.5px] font-semibold leading-snug">{tb(`${u.key}.title`)}</span>
                </li>
              ))}
            </ul>
          </div>,
        )}
        {offer(
          "wifi",
          "/photos/service-wifizone.jpg",
          QUOTE.wifi,
          "/wifi-zone",
          <div className="mt-7">
            <h4 className="m-0 font-sans text-[14.5px] font-semibold text-haze/75">{tc("sheet")}</h4>
            <ul className="m-0 mt-3 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
              {CASES.map((c) => (
                <li key={c.key} className="grid grid-cols-[96px_1fr] gap-3 sm:block">
                  <div className="relative aspect-[16/10]">
                    <Image src={c.src} alt="" fill sizes="(max-width: 640px) 96px, 200px" className="object-cover" />
                  </div>
                  <div className="sm:mt-2">
                    <span className="block font-sans text-[13.5px] font-semibold text-haze/80">{tc(`items.${c.key}.who`)}</span>
                    <span className="block font-condensed text-[24px] font-bold leading-tight tabular-nums text-white">{tc(`items.${c.key}.stat`)}</span>
                    <span className="block font-sans text-[13.5px] text-haze/80">{tc(`items.${c.key}.unit`)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="m-0 mt-3 font-sans text-[13px] text-haze/65">{tc("footnote")}</p>
          </div>,
        )}
      </div>
    </section>
  );
}
