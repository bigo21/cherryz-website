import type { Metadata } from "next";
import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import PageHero, { btnPrimary, btnGhost } from "@/components/site/PageHero";
import ReassuranceBar from "@/components/site/ReassuranceBar";
import SectionEyebrow from "@/components/site/SectionEyebrow";
import FinalCta from "@/components/site/FinalCta";
import Reveal from "@/components/site/Reveal";
import ExternalLink from "@/components/site/ExternalLink";
import { ClipboardIcon, GlobeIcon, PhoneIcon, PinIcon } from "@/components/site/icons";
import { CAL_IP, QUOTE } from "@/lib/site/site";
import { localize } from "@/lib/i18n/config";
import { rich } from "@/lib/i18n/rich";
import { pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("InternetB2B.meta");
  return pageMetadata("/internet-b2b", { title: t("title"), description: t("description") });
}

const l = (p: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const, ...p,
});
const Bolt = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M13 2L3 14h7l-1 8 10-12h-7z" /></svg>);
const Lock = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>);
const Flask = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M10 2h4v6l4 10a2 2 0 0 1-2 3H8a2 2 0 0 1-2-3l4-10z" /></svg>);
const ShieldCheck = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>);
const Users = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M16 3.1a4 4 0 0 1 0 7.8M8 3.1a4 4 0 0 0 0 7.8" /><circle cx="12" cy="16" r="4" /><path d="M4 21a6 6 0 0 1 16 0" /></svg>);
const Router = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 10v4M18 10v4" /></svg>);
const Sparkle = (p: SVGProps<SVGSVGElement>) => (<svg {...l(p)}><path d="M12 3l1.7 4.5L18 9l-4.3 1.5L12 15l-1.7-4.5L6 9l4.3-1.5z" /><path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" /></svg>);

// Copy of each list lives under `InternetB2B.*` in messages, keyed like below.
const usages = [
  { key: "vpn", img: "/photos/fond-vpn.jpg" },
  { key: "servers", img: "/photos/fond-serveurs.jpg" },
  { key: "voip", img: "/photos/fond-callcenter.jpg" },
  { key: "compliance", img: "/photos/fond-conformite.jpg" },
  { key: "video", img: "/photos/fond-video.jpg" },
] as const;

const features = [
  { Icon: Bolt, key: "install" },
  { Icon: Lock, key: "ip" },
  { Icon: Flask, key: "test" },
  { Icon: GlobeIcon, key: "coverage" },
  { Icon: ShieldCheck, key: "support" },
] as const;

const steps = [
  { Icon: ClipboardIcon, key: "request" },
  { Icon: PhoneIcon, key: "contact" },
  { Icon: PinIcon, key: "visit" },
  { Icon: Router, key: "quote" },
  { Icon: Sparkle, key: "install" },
  { Icon: Sparkle, key: "result", result: true },
] as const;

export default async function InternetB2B() {
  const lang = await getLocale();
  const t = await getTranslations("InternetB2B");
  const tc = await getTranslations("Chrome");
  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        image="/photos/b2b-hero.jpg"
        imageAlt={t("hero.imageAlt")}
        title={t.rich("hero.title", rich)}
        subtitle={t("hero.subtitle")}
        actions={
          <>
            <Link href={localize(lang, QUOTE.ip)} className={btnPrimary}>
              {tc("quoteFree")} →
            </Link>
            <a href="#comment" className={btnGhost}>{t("hero.how")} ↓</a>
          </>
        }
      />
      <ReassuranceBar />

      {/* QU'EST-CE QU'UNE IP DÉDIÉE */}
      <section className="bg-white pb-24 pt-[104px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-[60px] px-6 md:px-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <SectionEyebrow label={t("basics.eyebrow")} />
            <h2 className="m-0 font-condensed text-[44px] font-bold leading-[1.03] tracking-[-0.3px]">
              {t.rich("basics.title", rich)}
            </h2>
            <p className="mt-[18px] max-w-[520px] font-sans text-[16.5px] leading-[1.6] text-navy/[0.68]">
              {t("basics.lead")}
            </p>
            <div className="relative mt-[26px] overflow-hidden rounded-2xl bg-navy px-7 py-[26px]">
              <div className="absolute -right-10 -top-10 h-[150px] w-[150px] rounded-full" style={{ background: "radial-gradient(circle,rgba(160,4,45,.4),transparent 68%)" }} />
              <div className="relative">
                <div className="flex items-center gap-[10px]">
                  <Lock className="text-[22px] text-accent-on-dark" />
                  <span className="font-condensed text-[22px] font-bold text-white">
                    {t("basics.dedicatedTitle")}
                  </span>
                </div>
                <p className="mt-[9px] font-sans text-[15.5px] leading-[1.55] text-white/[0.72]">
                  {t("basics.dedicatedBody")}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal className="flex flex-col gap-[14px]" delay={0.08}>
            {usages.map(({ key, img }) => (
              <div key={key} className="flex items-start gap-4 rounded-[14px] border border-navy/[0.07] bg-surface px-[22px] py-5 transition-all hover:translate-x-1 hover:border-cherry/30">
                <div className="relative h-[46px] w-[46px] flex-none overflow-hidden rounded-xl">
                  <Image src={img} alt={t(`basics.usages.${key}.alt`)} fill sizes="46px" className="object-cover" />
                </div>
                <div>
                  <h3 className="m-0 font-condensed text-[20px] font-bold">{t(`basics.usages.${key}.t`)}</h3>
                  <p className="mt-[3px] font-sans text-[14.5px] leading-[1.45] text-navy/60">{t(`basics.usages.${key}.d`)}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CE QUE CHERRYZ VOUS APPORTE */}
      <section className="bg-surface py-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
            <SectionEyebrow label={t("brings.eyebrow")} centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              {t.rich("brings.title", rich)}
            </h2>
          </Reveal>
          <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" delay={0.05}>
            <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-cherry p-[30px] text-white sm:col-span-2">
              <div className="absolute -right-8 -top-10 h-[170px] w-[170px] rounded-full bg-white/[0.08]" />
              <div className="relative">
                <div className="font-condensed text-[13px] font-semibold tracking-[1.4px] text-white/75">{t("brings.priceLabel")}</div>
                <div className="mt-1 font-condensed text-[46px] font-bold leading-none">
                  {t("brings.priceValue")} <span className="text-[22px] font-semibold">{t("brings.priceUnit")}</span>
                </div>
                <p className="mt-[10px] max-w-[360px] font-sans text-[15.5px] leading-[1.5] text-white/85">
                  {t("brings.priceNote")}
                </p>
              </div>
            </div>
            {features.map(({ Icon, key }) => (
              <div key={key} className="rounded-2xl border border-navy/[0.06] bg-white px-6 py-[26px] transition-all hover:-translate-y-[5px] hover:shadow-[0_26px_50px_-34px_rgba(16,27,40,.5)]">
                <div className="mb-[14px] flex h-11 w-11 items-center justify-center rounded-[11px] bg-cherry/[0.08]">
                  <Icon className="text-[22px] text-cherry" />
                </div>
                <h3 className="m-0 font-condensed text-[20px] font-bold">{t(`brings.features.${key}.t`)}</h3>
                <p className="mt-[5px] font-sans text-[14.5px] leading-[1.5] text-navy/[0.62]">{t(`brings.features.${key}.d`)}</p>
              </div>
            ))}
            <div className="relative flex items-center gap-[22px] overflow-hidden rounded-2xl bg-navy p-[30px] text-white sm:col-span-2">
              <div className="absolute -bottom-[50px] -left-8 h-[170px] w-[170px] rounded-full" style={{ background: "radial-gradient(circle,rgba(160,4,45,.35),transparent 68%)" }} />
              <div className="relative flex h-[58px] w-[58px] flex-none items-center justify-center rounded-[14px] bg-white/[0.08]">
                <Users className="text-[28px] text-accent-on-dark" />
              </div>
              <div className="relative">
                <h3 className="m-0 font-condensed text-[24px] font-bold">{t("brings.multiTitle")}</h3>
                <p className="mt-[5px] max-w-[340px] font-sans text-[15.5px] leading-[1.5] text-white/75">
                  {t.rich("brings.multiBody", { strong: (c) => <strong className="font-semibold text-white">{c}</strong> })}
                </p>
              </div>
            </div>
          </Reveal>
          <p className="mx-1 mt-4 font-sans text-[13px] text-navy/50">
            {tc("testNote")}
          </p>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="comment" className="scroll-mt-20 bg-white pb-24 pt-[104px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
            <SectionEyebrow label={t("how.eyebrow")} centered />
            <h2 className="m-0 font-condensed text-[46px] font-bold leading-[1.02] tracking-[-0.3px]">
              {t("how.title")}
            </h2>
          </Reveal>
          <Reveal className="relative grid grid-cols-2 gap-[14px] sm:grid-cols-3 lg:grid-cols-6" delay={0.05}>
            <div className="absolute left-[8%] right-[8%] top-[26px] z-0 hidden h-[2px] lg:block" style={{ background: "repeating-linear-gradient(90deg,rgba(160,4,45,.35) 0 10px,transparent 10px 18px)" }} />
            {steps.map((s, i) => (
              <div key={s.key} className="relative z-[1] text-center">
                <div
                  className="mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-full text-[22px] text-white"
                  style={{
                    background: "result" in s ? "#101b28" : "#a0042d",
                    boxShadow: "result" in s ? "0 12px 24px -12px rgba(16,27,40,.6)" : "0 12px 24px -12px rgba(160,4,45,.9)",
                  }}
                >
                  <s.Icon />
                </div>
                <div className="mt-3 font-condensed text-[12px] font-semibold tracking-[1px]" style={{ color: "result" in s ? "#101b28" : "#a0042d" }}>
                  {"result" in s ? t("how.result") : t("how.step", { n: i + 1 })}
                </div>
                <div className="mt-[2px] font-condensed text-[17px] font-bold">{t(`how.steps.${s.key}`)}</div>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-[52px] text-center" delay={0.1}>
            <Link href={localize(lang, QUOTE.ip)} className={btnPrimary}>
              {t("how.cta")} →
            </Link>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={t.rich("final.title", rich)}
        subtitle={tc("visitLead")}
        actions={
          <>
            <Link href={localize(lang, QUOTE.ip)} className={btnPrimary}>
              {tc("quoteLabel")} →
            </Link>
            <ExternalLink href={CAL_IP} className={btnGhost}>
              {tc("preferCall")}
            </ExternalLink>
          </>
        }
      />
    </>
  );
}
