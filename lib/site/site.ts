// Shared site constants (contact, RDV links, navigation).

export const CAL_IP = "https://cal.com/vireel/cherryzip";
export const CAL_WIFI = "https://cal.com/vireel/cherryz";

// Quote questionnaires: the primary call to action everywhere on the site.
// Cal.com bookings stay available as the secondary "prefer a call" option.
export const QUOTE = {
  hub: "/demandes",
  ip: "/demandes/internet-b2b",
  wifi: "/demandes/wifi-zone",
} as const;

export const QUOTE_LABEL = "Obtenir mon devis";

/** Promo BizLink: a sub-page of Internet B2B, with its own form and WhatsApp line. */
export const BIZLINK = {
  href: "/internet-b2b/bizlink",
  formHref: "/internet-b2b/bizlink#formulaire",
  cta: "Profiter de la promo",
  whatsappDisplay: "+237 658 60 20 54",
  whatsapp: "https://wa.me/237658602054",
} as const;

/** The questionnaire matching the page the visitor is on (the choice page otherwise). */
export function quoteHrefFor(pathname: string | null): string {
  if (pathname?.startsWith(BIZLINK.href)) return BIZLINK.formHref;
  if (pathname?.startsWith("/internet-b2b")) return QUOTE.ip;
  if (pathname?.startsWith("/wifi-zone")) return QUOTE.wifi;
  return QUOTE.hub;
}

export const CONTACT = {
  address: "Yaoundé, Cameroun",
  phoneDisplay: "+237 242 01 46 64",
  phoneHref: "tel:+237242014664",
  whatsapp: "https://wa.me/237242014664",
  email: "support@cherryz.tech",
  emailHref: "mailto:support@cherryz.tech",
  site: "www.cherryz.tech",
  siteHref: "https://www.cherryz.tech",
  linkedin: "https://linkedin.com/company/cherryztech",
  facebook: "https://facebook.com/cherryz.tech",
} as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Internet B2B", href: "/internet-b2b" },
  { label: "WiFi Zone", href: "/wifi-zone" },
  { label: "Contact", href: "/contact" },
] as const;
