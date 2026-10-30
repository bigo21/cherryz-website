import type { Localized } from "@/lib/i18n/config";

const fr = {
  meta: {
    title: "WiFi Zone monétisable clé en main | Cherryz",
    description:
      "Lancez votre business WiFi : immeuble, quartier, hôtel, campus, marché… Cherryz diagnostique, dimensionne, déploie et automatise la monétisation (vouchers, paiement mobile). Agrément ART, SAV de proximité.",
  },
  hero: {
    title: "Lancez votre business WiFi.",
    lead: "Bâtiment, quartier, hôtel, campus, marché : Cherryz vous accompagne de l'idée à la rentabilité. On diagnostique, on dimensionne, on déploie et on automatise l'encaissement.",
    method: "Voir la méthode",
    facts: ["Agrément ART installeur et revendeur", "Diagnostic sur site gratuit", "Paiement mobile intégré"],
  },
  zones: {
    title: "Peu importe la taille. On la dimensionne.",
    lead: "Chaque espace a sa densité, sa portée et sa façon de payer. On conçoit la WiFi Zone pour le vôtre.",
    point: "Vous avez une zone et une ambition ? C'est tout ce qu'il nous faut pour commencer.",
    sheet: "Les espaces qu'on équipe",
    items: [
      { t: "Bâtiment / Immeuble", sub: "Résidences, immeubles de bureaux, co-living", d: "Couverture intérieure multi-étages, portail captif par locataire." },
      { t: "Quartier", sub: "Zone résidentielle, cité, lotissement", d: "Antennes extérieures longue portée, distribution multi-foyers." },
      { t: "Hôtel / Auberge", sub: "Hôtels, motels, maisons d'hôtes", d: "WiFi premium par chambre, gestion par vouchers." },
      { t: "Campus / École", sub: "Universités, lycées, centres de formation", d: "Haute densité, gestion de bande passante par zone." },
      { t: "Marché / Zone commerciale", sub: "Marchés, galeries marchandes, gares", d: "Points d'accès robustes, monétisation par session." },
      { t: "Site industriel / Chantier", sub: "Usines, entrepôts, bases vie", d: "Couverture étendue, connexion stable pour opérations." },
      { t: "Clinique / Centre de santé", sub: "Hôpitaux, pharmacies, laboratoires", d: "Réseau sécurisé, séparation flux patients/staff." },
      { t: "Votre idée", sub: "Tout autre espace", d: "On étudie, on propose, on déploie." },
    ],
  },
  method: {
    title: "On ne vous vend pas du matériel. On vous monte un business.",
    lead: "Vous n'avez pas besoin d'être technicien. Vous avez besoin d'un partenaire, et c'est exactement ce qu'on est.",
    cols: { step: "Étape", do: "Ce qu'on fait", get: "Ce que vous obtenez" },
    getShort: "Vous obtenez",
    items: [
      { t: "Diagnostic", d: "On visite votre site, on analyse l'environnement, la densité, le potentiel.", obtain: "Une vision claire de la faisabilité et du marché." },
      { t: "Dimensionnement", d: "On calcule la bande passante nécessaire, le nombre de points d'accès, la couverture.", obtain: "Un plan technique adapté à votre zone exacte." },
      { t: "Modèle économique", d: "On structure vos tarifs, vos offres (vouchers, abonnements, forfaits) et vos marges.", obtain: "Un business plan concret avec projection de revenus." },
      { t: "Déploiement", d: "On installe l'infrastructure complète : antennes, routeurs, câblage, portail captif.", obtain: "Une WiFi Zone opérationnelle, prête à vendre." },
      { t: "Automatisation", d: "On configure la monétisation automatique : paiement mobile, vouchers, portail.", obtain: "Vos clients paient et vous encaissez, sans intervention manuelle." },
      { t: "Suivi & SAV", d: "Monitoring à distance, maintenance, optimisation continue.", obtain: "Un business qui tourne, même quand vous dormez." },
    ],
    cta: "Demander mon diagnostic gratuit",
  },
  diffs: {
    title: "Ce qui nous différencie ? On reste après l'installation.",
    items: [
      { t: "Bande passante au meilleur prix", d: "Apportez votre propre connectivité, ou laissez Cherryz s'en occuper : on agrège les meilleures offres Camtel, Orange et MTN, et votre marge est maximisée dès le premier jour." },
      { t: "Accompagnement de A à Z", d: "Du diagnostic terrain jusqu'à l'automatisation de vos revenus." },
      { t: "Business structuré", d: "On ne vous laisse pas avec du matériel, on vous livre un modèle économique clé en main." },
      { t: "100% légal", d: "Agrément installeur et revendeur ART : zéro risque juridique." },
      { t: "Évolutif", d: "Commencez avec 1 antenne, étendez à tout un quartier, on grandit avec vous." },
      { t: "SAV de proximité", d: "Équipe technique réactive, monitoring continu, intervention rapide." },
    ],
  },
  cases: {
    title: "Ce que ça peut donner.",
    lead: "Trois projets types, pour situer l'ordre de grandeur. Le vôtre sera chiffré après le diagnostic sur site.",
    sheet: "Projets types",
    items: [
      { who: "Propriétaire d'immeuble", place: "24 appartements, Yaoundé", setup: "WiFi par étage + vouchers mensuels", stat: "+150 000 XAF", unit: "de revenu par mois" },
      { who: "Entrepreneur de quartier", place: "Zone résidentielle dense, Douala", setup: "3 antennes, couverture 500 m", stat: "+200 clients", unit: "en 2 mois" },
      { who: "Gérant d'hôtel", place: "Hôtel 30 chambres", setup: "WiFi premium inclus dans le tarif chambre", stat: "+40 %", unit: "de satisfaction client" },
    ],
    footnote: "Résultats indicatifs basés sur des projets types. Chaque projet est unique.",
  },
  close: {
    title: "Vous avez un espace. Nous avons la méthode.",
    lead: "Dites-nous où, dites-nous votre ambition, on s'occupe du reste. Diagnostic gratuit, déplacement sur site, partout au Cameroun.",
  },
};

const en: typeof fr = {
  meta: {
    title: "Turnkey, revenue-generating WiFi Zone | Cherryz",
    description:
      "Launch your WiFi business: building, neighbourhood, hotel, campus, market… Cherryz surveys, sizes, deploys and automates the billing (vouchers, mobile money). ART-licensed, local after-sales support.",
  },
  hero: {
    title: "Launch your WiFi business.",
    lead: "Building, neighbourhood, hotel, campus, market: Cherryz takes you from the idea to a profitable business. We survey, size, deploy and automate the payments.",
    method: "See the method",
    facts: ["ART-licensed installer and reseller", "Free on-site survey", "Mobile money built in"],
  },
  zones: {
    title: "Whatever the size, we scale it.",
    lead: "Every space has its own density, range and way of paying. We design the WiFi Zone for yours.",
    point: "Got a space and an ambition? That's all we need to get started.",
    sheet: "Spaces we equip",
    items: [
      { t: "Building / Apartment block", sub: "Residences, office buildings, co-living", d: "Multi-floor indoor coverage, captive portal per tenant." },
      { t: "Neighbourhood", sub: "Residential area, estate, housing development", d: "Long-range outdoor antennas, multi-household distribution." },
      { t: "Hotel / Guesthouse", sub: "Hotels, motels, guesthouses", d: "Premium WiFi per room, managed with vouchers." },
      { t: "Campus / School", sub: "Universities, secondary schools, training centres", d: "High density, bandwidth management by zone." },
      { t: "Market / Shopping area", sub: "Markets, shopping arcades, stations", d: "Rugged access points, pay-per-session billing." },
      { t: "Industrial site / Worksite", sub: "Factories, warehouses, worker camps", d: "Wide coverage, a stable connection for operations." },
      { t: "Clinic / Health centre", sub: "Hospitals, pharmacies, laboratories", d: "Secure network, separate patient and staff traffic." },
      { t: "Your idea", sub: "Any other space", d: "We study it, propose, and deploy." },
    ],
  },
  method: {
    title: "We don't sell you equipment. We build you a business.",
    lead: "You don't need to be a technician. You need a partner, and that's exactly what we are.",
    cols: { step: "Step", do: "What we do", get: "What you get" },
    getShort: "You get",
    items: [
      { t: "Survey", d: "We visit your site and assess the environment, the density and the potential.", obtain: "A clear view of feasibility and of the market." },
      { t: "Sizing", d: "We work out the bandwidth needed, the number of access points and the coverage.", obtain: "A technical plan fitted to your exact area." },
      { t: "Business model", d: "We set up your prices, your offers (vouchers, subscriptions, bundles) and your margins.", obtain: "A concrete business plan with revenue projections." },
      { t: "Deployment", d: "We install the full infrastructure: antennas, routers, cabling, captive portal.", obtain: "A working WiFi Zone, ready to sell." },
      { t: "Automation", d: "We set up automatic billing: mobile money, vouchers, portal.", obtain: "Your customers pay and you collect, with no manual work." },
      { t: "Monitoring & support", d: "Remote monitoring, maintenance, continuous optimisation.", obtain: "A business that runs, even while you sleep." },
    ],
    cta: "Request my free survey",
  },
  diffs: {
    title: "What sets us apart? We stay after the installation.",
    items: [
      { t: "Bandwidth at the best price", d: "Bring your own connectivity, or let Cherryz handle it: we pool the best Camtel, Orange and MTN offers, and your margin is maximised from day one." },
      { t: "Support from A to Z", d: "From the site survey to automating your revenue." },
      { t: "A structured business", d: "We don't leave you with hardware; we hand you a turnkey business model." },
      { t: "100% legal", d: "ART installer and reseller licence: zero legal risk." },
      { t: "Scalable", d: "Start with 1 antenna, grow to a whole neighbourhood; we grow with you." },
      { t: "Local after-sales support", d: "A responsive technical team, continuous monitoring, fast response." },
    ],
  },
  cases: {
    title: "What it can look like.",
    lead: "Three typical projects, to give you an order of magnitude. Yours will be priced after the on-site survey.",
    sheet: "Typical projects",
    items: [
      { who: "Building owner", place: "24 apartments, Yaoundé", setup: "WiFi per floor + monthly vouchers", stat: "+150,000 XAF", unit: "revenue per month" },
      { who: "Neighbourhood entrepreneur", place: "Dense residential area, Douala", setup: "3 antennas, 500 m coverage", stat: "+200 customers", unit: "in 2 months" },
      { who: "Hotel manager", place: "30-room hotel", setup: "Premium WiFi included in the room rate", stat: "+40%", unit: "customer satisfaction" },
    ],
    footnote: "Indicative results based on typical projects. Every project is different.",
  },
  close: {
    title: "You have a space. We have the method.",
    lead: "Tell us where, tell us your ambition, and we'll handle the rest. Free survey, site visit, anywhere in Cameroon.",
  },
};

export const wifiZone: Localized<typeof fr> = { fr, en };
