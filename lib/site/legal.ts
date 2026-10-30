// Company identification used by the legal pages (mentions légales, confidentialité).
// Every value set to TODO must be filled in by Cherryz before these pages go live:
// they are legal statements and must not be guessed.
export const TODO = "à compléter";

export const LEGAL = {
  companyName: TODO, // raison sociale exacte, ex. « CHERRYZ SARL »
  legalForm: TODO, // forme juridique (SARL, SA, SAS…)
  capital: TODO, // capital social, en XAF
  rccm: TODO, // numéro RCCM
  niu: TODO, // numéro d'identifiant unique (NIU)
  address: TODO, // adresse précise du siège, Yaoundé
  publicationDirector: TODO, // nom et fonction du directeur de la publication
  artLicence: TODO, // référence de l'agrément / autorisation ART
  retention: TODO, // durée de conservation des demandes (ex. « 3 ans après le dernier contact »)
  updatedAt: "2026-10-30", // ISO date, formatted per locale on the page
} as const;

export const HOST = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  site: "https://vercel.com",
} as const;

/** Whether every company field has been filled in. */
export const legalComplete = Object.values(LEGAL).every((v) => v !== TODO);
