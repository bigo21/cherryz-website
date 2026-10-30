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

/** The questionnaire matching the page the visitor is on (the choice page otherwise). Takes a locale-free path. */
export function quoteHrefFor(path: string): string {
  if (path.startsWith("/internet-b2b")) return QUOTE.ip;
  if (path.startsWith("/wifi-zone")) return QUOTE.wifi;
  return QUOTE.hub;
}

export const CONTACT = {
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

/** Main navigation; labels live in content/chrome.ts under `nav`. */
export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "ip", href: "/internet-b2b" },
  { key: "wifi", href: "/wifi-zone" },
  { key: "contact", href: "/contact" },
] as const;
