// Quote wizard schemas, ported from design_handoff_site_cherryz/Cherryz Maintenance.dc.html
// (DCLogic.schemaIP / schemaWifi). The conditional logic (`cond`) must also be
// enforced server-side before persisting.
//
// Only the structure and the stored option values live here. Step titles, questions,
// placeholders and option labels are in messages/{fr,en}.json under
// `Questionnaire.<type>`, option labels in the same order as `options`.

export type QuoteType = "ip" | "wifi";

export type FieldType =
  | "single"
  | "multi"
  | "scale"
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "geo"
  | "consent";

export type Answers = Record<string, unknown>;

export interface Question {
  id: string;
  type: FieldType;
  required?: boolean;
  hasOther?: boolean;
  /** Stored values (French). What the visitor reads comes from the catalogs. */
  options?: string[];
  /** When present, the question is only shown/validated if this returns true. */
  cond?: (a: Answers) => boolean;
}

export interface Step {
  questions: Question[];
}

/** WiFi branch marker: "I already have a WiFi Zone to improve". */
export const WIFI_ALREADY =
  "J'ai déjà une WiFi Zone et je veux l'améliorer";

const hasExistingConnection = (a: Answers) =>
  a.q1 === "Oui, nous avons déjà un opérateur" ||
  a.q1 === "Nous avons une connexion mais elle est insuffisante";

export const schemaIP: Step[] = [
  {
    questions: [
      { id: "q1", type: "single", required: true, options: ["Oui, nous avons déjà un opérateur", "Non, nous cherchons une première solution", "Nous avons une connexion mais elle est insuffisante"] },
      { id: "q2", type: "single", required: true, hasOther: true, cond: hasExistingConnection, options: ["Camtel", "Matrix Telecom", "Creolink", "MTN", "Orange", "Plusieurs opérateurs", "Je ne sais pas", "Autre"] },
      { id: "q3", type: "scale", required: true, cond: hasExistingConnection },
      { id: "q4", type: "multi", required: false, hasOther: true, cond: hasExistingConnection, options: ["Débit trop faible", "Coupures fréquentes / instabilité", "Latence élevée (visio, VPN...)", "Prix trop élevé", "Support technique insatisfaisant", "Adresse IP non fournie ou partagée", "Autre"] },
      { id: "q5", type: "single", required: true, cond: hasExistingConnection, options: ["Moins de 5 Mbps", "5 – 20 Mbps", "20 – 50 Mbps", "50 – 100 Mbps", "Plus de 100 Mbps", "Je ne connais pas mon débit"] },
      { id: "q6", type: "single", required: true, cond: hasExistingConnection, options: ["Moins de 500 000 XAF", "500 000 – 1 000 000 XAF", "1 000 000 – 2 000 000 XAF", "2 000 000 – 3 000 000 XAF", "Plus de 3 000 000 XAF", "Je préfère ne pas répondre"] },
    ],
  },
  {
    questions: [
      { id: "q7", type: "single", required: true, options: ["1 – 10 postes", "11 – 30 postes", "31 – 50 postes", "51 – 100 postes", "Plus de 100 postes", "Je ne sais pas encore"] },
      { id: "q8", type: "single", required: true, hasOther: true, options: ["Bureau / Siège administratif", "Agence bancaire / Guichet", "Data center / Salle serveur", "Site industriel / Usine", "Call center", "Autre"] },
      { id: "q9", type: "multi", required: false, hasOther: true, options: ["Navigation web & emails", "Téléphonie IP / VoIP / Call Center", "VPN entre agences ou sites distants", "Vidéoconférence (Teams, Zoom, Meet...)", "Hébergement de serveurs internes", "Caméras de surveillance à distance", "Transactions bancaires / ERP / Logiciels métier", "Cloud / Sauvegarde en ligne", "Autre"] },
      { id: "q10", type: "single", required: false, options: ["Oui, c'est indispensable pour nous", "Non, ce n'est pas notre priorité", "Je ne sais pas, j'aimerais en savoir plus"] },
      { id: "q11", type: "single", required: false, options: ["Oui", "Non", "Pas encore mais c'est prévu"] },
      { id: "q12", type: "single", required: false, options: ["Oui, je veux tester avant de décider", "Non, je suis prêt à migrer directement", "Je veux d'abord avoir plus d'informations"] },
    ],
  },
  {
    questions: [
      { id: "q13", type: "text", required: true },
      { id: "q14", type: "single", required: true, options: ["Centre", "Littoral", "Ouest", "Nord-Ouest", "Sud-Ouest", "Sud", "Est", "Adamaoua", "Nord", "Extrême-Nord"] },
      { id: "q15", type: "geo", required: true },
    ],
  },
  {
    questions: [
      { id: "q16", type: "text", required: true },
      { id: "q17", type: "single", required: true, hasOther: true, options: ["Directeur Général (DG) / PDG", "Directeur Informatique (DSI)", "Responsable Système d'Information (RSI)", "Directeur Administratif et Financier (DAF)", "Responsable Achats / Logistique", "Gérant / Propriétaire", "Autre"] },
      { id: "q18", type: "text", required: true },
      { id: "q19", type: "single", required: true, hasOther: true, options: ["Banque / Assurance", "Microfinance (EMF)", "Call Center / Centre d'appels", "Hôtel / Restauration / Tourisme", "Clinique / Santé / Pharmacie", "Université / École / Formation", "ONG / Organisation Internationale", "Industrie / Production", "PME / Commerce / Distribution", "Administration publique / Parapublic", "Autre"] },
      { id: "q20", type: "tel", required: true },
      { id: "q21", type: "email", required: true },
    ],
  },
  {
    questions: [
      { id: "q22", type: "textarea", required: false },
      { id: "q23", type: "consent", required: true },
    ],
  },
];

export const schemaWifi: Step[] = [
  {
    questions: [
      { id: "q1", type: "single", required: true, options: ["Idée en cours de réflexion", "J'ai identifié un emplacement", "J'ai déjà un accord avec un bailleur", "Je suis prêt à démarrer", WIFI_ALREADY] },
      { id: "q2", type: "single", required: true, options: ["Moins de 1 000 000 XAF", "1 000 000 – 2 000 000 XAF", "2 000 000 – 3 000 000 XAF", "À définir avec l'équipe Cherryz"] },
      { id: "q3", type: "single", required: true, options: ["Oui, je sais ce que c'est", "J'en ai entendu parler mais je ne connais pas les détails", "Non, c'est la première fois que j'en entends parler"] },
      { id: "q4", type: "single", required: true, options: ["Oui, je l'ai suivie", "Je suis en train de la suivre", "Non, pas encore", "Je ne savais pas qu'elle existait"] },
    ],
  },
  {
    questions: [
      { id: "q6", type: "multi", required: true, hasOther: true, options: ["Quartier résidentiel", "Immeuble / Résidence", "Marché / Zone commerciale", "Campus / École", "Clinique / Centre de santé", "Restaurant / Café / Espace public", "Autre"] },
      { id: "q7", type: "single", required: true, cond: (a) => a.q1 !== WIFI_ALREADY, options: ["Oui, j'ai déjà un accord", "En cours de négociation", "Non, pas encore", "C'est mon propre espace"] },
      { id: "q8", type: "single", required: true, options: ["Moins de 20 utilisateurs", "20 – 50 utilisateurs", "50 – 100 utilisateurs", "Plus de 100 utilisateurs", "Je ne sais pas encore"] },
      { id: "q9", type: "single", required: true, cond: (a) => a.q1 !== WIFI_ALREADY, options: ["Oui, j'ai déjà une connexion", "Non, pas encore", "En cours d'installation"] },
      { id: "q10", type: "single", required: false, cond: (a) => a.q1 !== WIFI_ALREADY, options: ["Oui, j'ai déjà du matériel", "Partiellement (quelques équipements)", "Non, je pars de zéro"] },
      { id: "q11b", type: "multi", required: true, hasOther: true, cond: (a) => a.q1 === WIFI_ALREADY, options: ["Débit / capacité", "Couverture de la zone", "Système de paiement / tickets", "Stabilité de la connexion", "Ajout d'équipements", "Autre"] },
      { id: "q11", type: "multi", required: false, options: ["Vente de tickets / vouchers prépayés", "Abonnement mensuel aux utilisateurs", "Gratuit, financé par la publicité", "Gratuit, service offert (immeuble, hôtel...)", "Je ne sais pas encore, j'aimerais des conseils"] },
      { id: "q12", type: "single", required: false, options: ["Oui, électricité stable (ENEO fiable)", "Oui mais avec coupures fréquentes", "Non, pas encore d'électricité sur site", "J'ai un groupe électrogène / solaire en secours"] },
    ],
  },
  {
    questions: [
      { id: "q13", type: "text", required: true },
      { id: "q14", type: "single", required: true, options: ["Centre", "Littoral", "Ouest", "Nord-Ouest", "Sud-Ouest", "Sud", "Est", "Adamaoua", "Nord", "Extrême-Nord"] },
      { id: "q15", type: "geo", required: true },
    ],
  },
  {
    questions: [
      { id: "q16", type: "text", required: true },
      { id: "q17", type: "tel", required: true },
      { id: "q18", type: "email", required: true },
      { id: "q19", type: "text", required: false },
      { id: "q5", type: "textarea", required: false },
    ],
  },
  {
    questions: [{ id: "q20", type: "consent", required: true }],
  },
];

export function getSchema(type: QuoteType): Step[] {
  return type === "wifi" ? schemaWifi : schemaIP;
}

export const sessionKey = (type: QuoteType) =>
  type === "ip" ? "chz_form_ip_v2" : "chz_form_wifi_v2";
