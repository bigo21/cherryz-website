import Image from "next/image";
import Link from "next/link";
import { CAL_IP, CAL_WIFI, CONTACT, NAV_LINKS } from "@/lib/site/site";
import {
  CalendarIcon,
  FacebookIcon,
  GlobeIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./icons";

const colTitle =
  "mb-4 font-condensed text-[15px] font-bold uppercase tracking-[1.4px] text-white/50";
const linkCls =
  "font-sans text-[15.5px] text-white/[0.78] transition-colors hover:text-white";

export default function SiteFooter() {
  return (
    <footer className="bg-navy px-6 pb-8 pt-16 text-white md:px-0">
      <div className="mx-auto max-w-[1280px] px-0 md:px-12">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-11 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/brand/logo-white.png"
              alt="Cherryz"
              width={98}
              height={40}
              className="mb-4 block h-10 w-auto"
            />
            <p className="max-w-[280px] font-sans text-[15.5px] leading-[1.6] text-white/[0.62]">
              Votre Internet Professionnel. Accessible. Partout au Cameroun.
            </p>
            <p className="mt-[14px] font-condensed text-[16px] font-semibold tracking-[0.5px] text-accent-vivid">
              Cherryz — Vous connecte !
            </p>
          </div>

          <div>
            <div className={colTitle}>Navigation</div>
            <div className="flex flex-col gap-[11px]">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className={colTitle}>Rendez-vous</div>
            <div className="flex flex-col gap-[11px]">
              <a href={CAL_IP} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <CalendarIcon className="mr-1 inline-block align-[-0.14em]" /> Devis
                Internet B2B
              </a>
              <a href={CAL_WIFI} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <CalendarIcon className="mr-1 inline-block align-[-0.14em]" /> RDV WiFi
                Zone
              </a>
            </div>
          </div>

          <div>
            <div className={colTitle}>Contact</div>
            <div className="flex flex-col gap-[11px] font-sans text-[15px] leading-[1.4] text-white/[0.78]">
              <span>
                <PinIcon className="mr-1 inline-block align-[-0.14em]" /> {CONTACT.address}
              </span>
              <a href={CONTACT.phoneHref} className={linkCls}>
                <PhoneIcon className="mr-1 inline-block align-[-0.14em]" />{" "}
                {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.emailHref} className={linkCls}>
                <MailIcon className="mr-1 inline-block align-[-0.14em]" /> {CONTACT.email}
              </a>
              <a href={CONTACT.siteHref} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <GlobeIcon className="mr-1 inline-block align-[-0.14em]" /> {CONTACT.site}
              </a>
            </div>
            <div className="mt-4 flex gap-[14px]">
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/70 transition-colors hover:text-white">
                <LinkedInIcon />
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/70 transition-colors hover:text-white">
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <div className="flex flex-wrap gap-5">
            <Link href="/" className="font-sans text-[14px] text-white/55 hover:text-white">
              Mentions légales
            </Link>
            <Link href="/" className="font-sans text-[14px] text-white/55 hover:text-white">
              Politique de confidentialité
            </Link>
          </div>
          <div className="font-sans text-[14px] text-white/45">
            © 2026 Cherryz. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
