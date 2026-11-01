// Company facts shown on the legal pages (mentions légales, confidentialité).
// They are legal statements and must not be guessed: until Cherryz provides one,
// it stays a marker that the page shows as « [à compléter] », « [à vérifier] »
// or « [à valider par le juriste…] ». Facts that are sentences (retention period)
// go into messages/*.json instead, in both languages, once known.
export const TODO = "todo";
export const VERIFY = "toVerify";
export const COUNSEL = "transfers";
export type Marker = typeof TODO | typeof VERIFY | typeof COUNSEL;

export const LEGAL = {
  legalForm: TODO, // forme juridique (SARL, SA, SAS…)
  capital: TODO, // capital social, en XAF
  rccm: TODO, // numéro RCCM
  niu: TODO, // numéro d'identifiant unique (NIU)
  address: "Quartier Fouda, Yaoundé", // siège social
  publicationDirector: TODO, // nom et fonction du directeur de la publication
  artLicence: TODO, // intitulé exact de l'agrément ART
  artNumber: TODO, // numéro de l'agrément ART
  retention: TODO, // durée de conservation des demandes
  rightsDelay: TODO, // délai de réponse aux demandes d'accès, en jours
  vercelRegion: VERIFY, // région Vercel choisie
  supabaseRegion: VERIFY, // région du projet Supabase
  resendRegion: VERIFY, // région Resend
  transfers: COUNSEL, // formalités des transferts hors du Cameroun (loi n° 2024/017)
  updatedAt: "2026-11-01", // ISO date, formatted per locale on the page
} as const;

export const isMarker = (value: string): value is Marker =>
  value === TODO || value === VERIFY || value === COUNSEL;
