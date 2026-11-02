/**
 * Registry of provisional content. Each item shows a "à remplacer" tag
 * (PlaceholderTag, marked `data-placeholder`) in previews, and blocks the
 * production build until it is replaced by Cherryz's own material: next.config.ts
 * fails while this registry is not empty, PlaceholderTag throws when rendered in
 * production. See docs/lot-5-contenus-provisoires.md.
 *
 * Photos: free licence (Wikimedia Commons, CC BY-SA 4.0), credited in their tag.
 */

/** Provisional copy and data, by tag kind. Remove an entry once it is replaced. */
export const PLACEHOLDER_CONTENT = {
  figures: "Home.proof (messages/*.json)",
  cities: "CITIES (lib/site/coverage.ts)",
  testimonials: "Home.testimonials (messages/*.json)",
} as const;

export type PlaceholderKind = "photo" | keyof typeof PLACEHOLDER_CONTENT;

/** True on Vercel's production deployments, where no placeholder may remain. */
export const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

/** Everything still provisional, for the production build guard. */
export function remainingPlaceholders(): string[] {
  return [
    ...Object.values(PLACEHOLDER_PHOTOS).map((p) => p.src),
    ...Object.values(PLACEHOLDER_CONTENT),
  ];
}

export type PlaceholderPhoto = {
  src: string;
  author: string;
  license: string;
  source: string;
};

export const PLACEHOLDER_PHOTOS = {
  home: {
    src: "/photos/provisoire/accueil-hero.jpg",
    author: "Johnkekam",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Agent_telecoms.jpg",
  },
  b2b: {
    src: "/photos/provisoire/b2b-hero.jpg",
    author: "Minette Lontsie",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Ernest_Chi_Masterclass_Photograhie_au_cameroun_-_Projet_Nos_Jardins.jpg",
  },
  wifi: {
    src: "/photos/provisoire/wifi-hero.jpg",
    author: "Minette Lontsie",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Groupe_de_wikimediens_dans_un_restaurant_%C3%A0_Douala_apr%C3%A8s_sortie_photo_Wiki_Loves_Africa.jpg",
  },
} satisfies Record<string, PlaceholderPhoto>;
