"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { ArrowRightIcon, CheckLineIcon } from "@/components/site/icons";
import { gsap, MOTION_OK, useGSAP } from "../gsap";

// Each usage, its original 220 px photo, and the matching answer of question 9 of
// the Internet B2B questionnaire (answers are stored as the schema's French values).
const USAGES = [
  { key: "vpn", src: "/photos/fond-vpn.jpg", q9: "VPN entre agences ou sites distants" },
  { key: "servers", src: "/photos/fond-serveurs.jpg", q9: "Hébergement de serveurs internes" },
  { key: "voip", src: "/photos/fond-callcenter.jpg", q9: "Téléphonie IP / VoIP / Call Center" },
  { key: "compliance", src: "/photos/fond-conformite.jpg", q9: "Transactions bancaires / ERP / Logiciels métier" },
  { key: "cctv", src: "/photos/fond-video.jpg", q9: "Caméras de surveillance à distance" },
] as const;
type Usage = (typeof USAGES)[number]["key"];

const STORAGE_KEY = "chz_demande_ip_v1";

/** Carry the chosen usages into the questionnaire, without touching a finished one. */
function prefill(chosen: string[]) {
  if (!chosen.length) return;
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null") as {
      step?: number;
      answers?: Record<string, unknown>;
      done?: boolean;
    } | null;
    if (saved?.done) return;
    const answers = saved?.answers ?? {};
    const previous = Array.isArray(answers.q9) ? (answers.q9 as string[]) : [];
    const q9 = [...new Set([...previous, ...chosen])];
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step: saved?.step ?? 1, answers: { ...answers, q9 }, done: false }));
  } catch {
    /* private mode: the questionnaire simply starts empty */
  }
}

/**
 * What a dedicated public IP is, beside the offices that depend on one, then the
 * five uses it unlocks: the visitor taps theirs and the quote button carries them
 * into the questionnaire.
 */
export default function IpUsages() {
  const t = useTranslations("InternetB2B");
  const lang = useLocale();
  const [chosen, setChosen] = useState<Usage[]>([]);
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-photo]",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", ease: "power2.out", scrollTrigger: { trigger: "[data-photo]", start: "top 90%", end: "top 40%", scrub: 0.5 } },
        );
        gsap.from("[data-usage]", {
          x: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-usages]", start: "top 75%", toggleActions: "play none none reverse" },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  const toggle = (k: Usage) => setChosen((c) => (c.includes(k) ? c.filter((x) => x !== k) : [...c, k]));
  const values = USAGES.filter((u) => chosen.includes(u.key)).map((u) => u.q9);

  return (
    <section ref={scope} className="beam-page bg-dawn py-20 text-night md:py-28" aria-labelledby="ip-title">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-12 px-4 sm:px-6 md:px-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="ip-title" className="m-0 max-w-[16ch] font-condensed text-[clamp(38px,4.4vw,62px)] font-bold leading-[0.95] tracking-[-0.015em] [text-wrap:balance]">
            {t("ip.title")}
          </h2>
          <p className="mt-6 max-w-[52ch] font-sans text-[17.5px] leading-[1.65] text-ink-soft">{t("ip.lead")}</p>
          <p className="mt-6 max-w-[52ch] border-l-[3px] border-cherry pl-5 font-sans text-[17.5px] font-semibold leading-[1.55]">{t("ip.point")}</p>
          <div data-photo className="relative mt-9 aspect-[4/3] overflow-hidden bg-night">
            <Image src="/photos/service-ip.jpg" alt={t("pick.photoAlt")} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
        </div>

        <div data-usages className="lg:col-span-7 lg:pt-2">
          <h3 className="m-0 border-b-2 border-night pb-3 font-condensed text-[28px] font-bold">{t("ip.sheet")}</h3>
          <p className="m-0 mt-4 font-sans text-[15.5px] text-ink-soft">{t("pick.hint")}</p>
          <ul className="m-0 mt-5 grid list-none gap-[3px] p-0">
            {USAGES.map((u) => {
              const on = chosen.includes(u.key);
              return (
                <li key={u.key} data-usage>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(u.key)}
                    className={[
                      "grid w-full cursor-pointer grid-cols-[72px_1fr_auto] items-center gap-4 border-l-[4px] py-3 pl-3 pr-4 text-left transition-colors sm:grid-cols-[96px_1fr_auto] sm:gap-5",
                      on ? "border-cherry bg-white" : "border-transparent bg-white/55 hover:bg-white",
                    ].join(" ")}
                  >
                    <Image src={u.src} alt="" width={96} height={96} className="aspect-square h-auto w-full object-cover" />
                    <span>
                      <span className="block font-condensed text-[21px] font-bold leading-tight">{t(`ip.usages.${u.key}.title`)}</span>
                      <span className="mt-1 block font-sans text-[15.5px] leading-[1.45] text-ink-soft">{t(`ip.usages.${u.key}.text`)}</span>
                    </span>
                    <span
                      aria-hidden
                      className={[
                        "flex h-[28px] w-[28px] items-center justify-center border-2 transition-colors",
                        on ? "border-cherry bg-cherry text-white" : "border-night/30 text-transparent",
                      ].join(" ")}
                    >
                      <CheckLineIcon className="text-[16px]" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <Link
            href={localize(lang, QUOTE.ip)}
            onClick={() => prefill(values)}
            className="mt-7 inline-flex items-center gap-3 bg-cherry px-6 py-4 font-condensed text-[19px] font-semibold text-white transition-colors hover:bg-cherry-dark"
          >
            {t("pick.cta", { count: chosen.length })}
            <ArrowRightIcon aria-hidden className="text-[19px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
