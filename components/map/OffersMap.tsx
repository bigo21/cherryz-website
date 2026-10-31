import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon } from "@/components/site/icons";

const ROWS = ["audience", "deliverable", "edge"] as const;

// The original 220 px usage photos, kept small, round like the pins of a map key.
const USAGES = [
  { key: "vpn", src: "/photos/fond-vpn.jpg" },
  { key: "servers", src: "/photos/fond-serveurs.jpg" },
  { key: "voip", src: "/photos/fond-callcenter.jpg" },
  { key: "compliance", src: "/photos/fond-conformite.jpg" },
  { key: "cctv", src: "/photos/fond-video.jpg" },
] as const;

// Typical WiFi Zone projects (indicative results, labelled as such).
const CASES = [
  { key: "building", src: "/photos/cas-immeuble.jpg", lobe: "lobe" },
  { key: "neighbourhood", src: "/photos/cas-quartier.jpg", lobe: "lobe-b" },
  { key: "hotel", src: "/photos/cas-hotel.jpg", lobe: "lobe-c" },
] as const;

/** The two offers as two flat districts of the plan, each with its place cropped in a lobe. */
export default async function OffersMap() {
  const t = await getTranslations("Home");
  const tb = await getTranslations("InternetB2B.ip.usages");
  const tc = await getTranslations("WifiZone.cases");
  const lang = await getLocale();

  const district = (key: "ip" | "wifi", photo: string, quote: string, page: string, extra: React.ReactNode) => {
    const label = t(`offers.${key}.label`);
    const ip = key === "ip";
    return (
      <article className={`relative px-4 pb-14 sm:px-8 lg:px-12 ${ip ? "bg-navy" : "bg-cherry"}`}>
        <div className={`${ip ? "lobe" : "lobe-b"} relative -mt-16 aspect-[4/3] w-[86%] max-w-[560px] overflow-hidden border-[6px] sm:-mt-24 ${ip ? "border-navy" : "ml-auto border-cherry"}`}>
          <Image src={photo} alt="" fill sizes="(max-width: 1024px) 86vw, 560px" className="object-cover" />
        </div>
        <h3 className="m-0 mt-8 font-condensed text-[clamp(40px,4vw,60px)] font-bold leading-[0.95]">{label}</h3>
        <p className="m-0 mt-2 max-w-[34ch] font-sans text-[19px] leading-[1.4] text-white/85">{t(`offers.${key}.title`)}</p>
        <dl className="m-0 mt-6 border-t border-white/20">
          {ROWS.map((r) => (
            <div key={r} className="grid grid-cols-1 gap-1 border-b border-white/20 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
              <dt className="font-sans text-[14.5px] font-semibold text-white/70">{t(`offers.${key}.rows.${r}.term`)}</dt>
              <dd className="m-0 font-sans text-[16px] text-white">{t(`offers.${key}.rows.${r}.detail`)}</dd>
            </div>
          ))}
        </dl>
        {extra}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={localize(lang, quote)}
            className={[
              "inline-flex items-center gap-3 px-6 py-4 font-condensed text-[19px] font-semibold transition-colors",
              ip ? "bg-cherry text-white hover:bg-cherry-dark" : "bg-white text-cherry hover:bg-sand",
            ].join(" ")}
          >
            {t("offers.quote")}
            <ArrowRightIcon aria-hidden className="text-[19px]" />
          </Link>
          <Link href={localize(lang, page)} className="font-sans text-[16px] font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
            {t("offers.discover", { label })}
          </Link>
        </div>
      </article>
    );
  };

  return (
    <section id="services" className="map-page bg-sand text-white" aria-labelledby="offers-title">
      <h2 id="offers-title" className="m-0 mx-auto max-w-[1360px] px-4 pb-36 pt-20 font-condensed text-[clamp(38px,4.6vw,64px)] font-bold leading-[0.95] tracking-[-0.015em] text-navy sm:px-6 sm:pb-44 md:px-12 md:pt-28">
        {t("offers.title")}
      </h2>
      <div className="grid grid-cols-1 gap-y-24 bg-sand lg:grid-cols-2 lg:gap-y-0">
        {district(
          "ip",
          "/photos/service-ip.jpg",
          QUOTE.ip,
          "/internet-b2b",
          <div className="mt-7">
            <h4 className="m-0 font-sans text-[14.5px] font-semibold text-white/70">{t("usagesTitle")}</h4>
            <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-x-3 gap-y-5 p-0 sm:grid-cols-5">
              {USAGES.map((u) => (
                <li key={u.key} className="flex items-center gap-3 sm:block">
                  <Image src={u.src} alt="" width={88} height={88} className="aspect-square h-auto w-[64px] flex-none rounded-full border-[3px] border-white object-cover sm:w-full sm:max-w-[88px]" />
                  <span className="block font-sans text-[13.5px] font-semibold leading-snug sm:mt-2">{tb(`${u.key}.title`)}</span>
                </li>
              ))}
            </ul>
          </div>,
        )}
        {district(
          "wifi",
          "/photos/service-wifizone.jpg",
          QUOTE.wifi,
          "/wifi-zone",
          <div className="mt-7">
            <h4 className="m-0 font-sans text-[14.5px] font-semibold text-white/70">{tc("sheet")}</h4>
            <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
              {CASES.map((c) => (
                <li key={c.key} className="grid grid-cols-[104px_1fr] items-center gap-4 sm:block">
                  <div className={`${c.lobe} relative aspect-[4/3] overflow-hidden`}>
                    <Image src={c.src} alt="" fill sizes="(max-width: 640px) 104px, 200px" className="object-cover" />
                  </div>
                  <div className="sm:mt-3">
                    <span className="block font-sans text-[13.5px] font-semibold text-white/80">{tc(`items.${c.key}.who`)}</span>
                    <span className="block font-condensed text-[26px] font-bold leading-tight tabular-nums text-white">{tc(`items.${c.key}.stat`)}</span>
                    <span className="block font-sans text-[13.5px] text-white/80">{tc(`items.${c.key}.unit`)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="m-0 mt-4 font-sans text-[13px] text-white/75">{tc("footnote")}</p>
          </div>,
        )}
      </div>
    </section>
  );
}
