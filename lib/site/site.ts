// Shared site constants (contact, RDV links, navigation).

export const CAL_IP = "https://cal.com/vireel/cherryzip";
export const CAL_WIFI = "https://cal.com/vireel/cherryz";

export const CONTACT = {
  address: "Quartier Fouda, Yaoundé, Cameroun",
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
