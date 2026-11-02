/**
 * Provisional content, shown with a visible "à remplacer" tag (PlaceholderTag) and
 * marked `data-placeholder` in the HTML. Everything listed here must be replaced by
 * Cherryz's own material before going live; see docs/lot-5-contenus-provisoires.md.
 *
 * Photos: free licence (Wikimedia Commons, CC BY-SA 4.0), credited in their tag.
 */
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
