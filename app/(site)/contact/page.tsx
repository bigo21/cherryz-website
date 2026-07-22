import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { CalendarIcon, GlobeIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/site/icons";
import { CAL_IP, CAL_WIFI, CONTACT } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Contact | Cherryz",
  description:
    "Parlons de votre projet : devis Internet B2B, WiFi Zone ou toute autre demande. Réponse sous 24h, déplacement gratuit partout au Cameroun. Basés à Yaoundé.",
};

const coords = [
  { Icon: PinIcon, k: "ADRESSE", v: CONTACT.address, href: undefined },
  { Icon: PhoneIcon, k: "TÉLÉPHONE", v: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  { Icon: MailIcon, k: "EMAIL", v: CONTACT.email, href: CONTACT.emailHref },
  { Icon: GlobeIcon, k: "SITE WEB", v: CONTACT.site, href: CONTACT.siteHref },
];

export default function Contact() {
  return (
    <>
      {/* HEADER */}
      <header className="relative overflow-hidden bg-navy-deep pb-[70px] pt-[150px]">
        <div
          className="absolute bottom-0 right-0 top-0 z-0 w-[42%] opacity-90"
          style={{ background: "linear-gradient(135deg,rgba(160,4,45,.9),rgba(125,3,35,.82))", clipPath: "polygon(42% 0,100% 0,100% 100%,14% 100%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-[22px] inline-flex items-center gap-[9px] rounded-full border border-white/[0.22] bg-white/[0.04] px-[15px] py-2">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-accent-pink shadow-[0_0_10px_1px_#e11d63]" />
            <span className="font-condensed text-[12.5px] font-semibold tracking-[1.6px] text-white/90">CONTACT</span>
          </div>
          <h1 className="m-0 font-condensed text-[clamp(42px,6vw,66px)] font-bold leading-[0.98] tracking-[-0.4px] text-white">
            Parlons de votre projet.
          </h1>
          <p className="mt-[18px] max-w-[560px] font-sans text-[19px] leading-[1.55] text-white/[0.78]">
            Une question, un devis, une idée de WiFi Zone ? Notre équipe vous
            répond sous 24h et se déplace gratuitement, partout au Cameroun.
          </p>
        </div>
      </header>

      {/* FORM + SIDEBAR */}
      <section className="bg-surface pb-[100px] pt-20">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 px-6 md:px-12 lg:grid-cols-[1.35fr_1fr]">
          <ContactForm />

          <div className="flex flex-col gap-[18px]">
            <div className="relative overflow-hidden rounded-[20px] bg-navy px-[30px] py-8 text-white">
              <div className="absolute -right-10 -top-10 h-[150px] w-[150px] rounded-full" style={{ background: "radial-gradient(circle,rgba(160,4,45,.4),transparent 68%)" }} />
              <div className="relative">
                <h3 className="mb-5 font-condensed text-[24px] font-bold">Nos coordonnées</h3>
                <div className="flex flex-col gap-4">
                  {coords.map((c) => (
                    <div key={c.k} className="flex items-start gap-[13px]">
                      <span className="text-[19px] leading-[1.3] text-white/80">
                        <c.Icon className="align-[-0.14em]" />
                      </span>
                      <div>
                        <div className="font-condensed text-[13px] font-semibold tracking-[0.8px] text-white/50">{c.k}</div>
                        {c.href ? (
                          <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-sans text-[15.5px] text-white transition-colors hover:text-accent-vivid">
                            {c.v}
                          </a>
                        ) : (
                          <div className="font-sans text-[15.5px] text-white">{c.v}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-navy/[0.08] bg-white px-[30px] py-7">
              <h3 className="mb-[6px] font-condensed text-[22px] font-bold">Réserver un créneau</h3>
              <p className="mb-[18px] font-sans text-[14.5px] text-navy/60">
                Prenez rendez-vous en ligne, directement.
              </p>
              {[
                { label: "Internet B2B", href: CAL_IP },
                { label: "WiFi Zone", href: CAL_WIFI },
              ].map((rdv, i) => (
                <a
                  key={rdv.label}
                  href={rdv.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between gap-3 rounded-xl border border-navy/[0.08] bg-surface px-[18px] py-4 transition-colors hover:border-cherry-alt hover:bg-white ${i === 0 ? "mb-3" : ""}`}
                >
                  <span className="flex items-center gap-[11px]">
                    <CalendarIcon className="text-[20px] text-navy" />
                    <span className="font-condensed text-[17px] font-bold text-navy">{rdv.label}</span>
                  </span>
                  <span className="font-condensed text-[18px] font-bold text-cherry-alt">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
