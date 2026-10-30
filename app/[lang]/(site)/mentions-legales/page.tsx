import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { Fact, Section } from "@/components/site/LegalPage";
import { HOST, LEGAL } from "@/lib/site/legal";
import { CONTACT } from "@/lib/site/site";
import { getLang, pageMetadata } from "@/lib/i18n/server";

const META = {
  fr: {
    title: "Mentions légales | Cherryz",
    description: "Identification de l'éditeur du site cherryz.tech, hébergement, propriété intellectuelle et droit applicable.",
  },
  en: {
    title: "Legal notice | Cherryz",
    description: "Identification of the publisher of cherryz.tech, hosting, intellectual property and governing law.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return pageMetadata(lang, "/mentions-legales", META[lang]);
}

const link = "font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy";

export default async function MentionsLegales() {
  return (await getLang()) === "en" ? <MentionsLegalesEn /> : <MentionsLegalesFr />;
}

function MentionsLegalesFr() {
  return (
    <LegalPage title="Mentions légales" updatedAt={LEGAL.updatedAt}>
      <Section title="Éditeur du site">
        <p className="m-0">
          Le site <strong>cherryz.tech</strong> est édité par <Fact value={LEGAL.companyName} />,{" "}
          <Fact value={LEGAL.legalForm} /> au capital de <Fact value={LEGAL.capital} />.
        </p>
        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          <li>RCCM : <Fact value={LEGAL.rccm} /></li>
          <li>NIU : <Fact value={LEGAL.niu} /></li>
          <li>Siège : <Fact value={LEGAL.address} />, Yaoundé, Cameroun</li>
          <li>
            Téléphone et WhatsApp : <a className={link} href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
          </li>
          <li>
            Email : <a className={link} href={CONTACT.emailHref}>{CONTACT.email}</a>
          </li>
        </ul>
        <p className="m-0">
          Directeur de la publication : <Fact value={LEGAL.publicationDirector} />.
        </p>
      </Section>

      <Section title="Activité réglementée">
        <p className="m-0">
          Cherryz est un courtier en connectivité : il sélectionne et négocie,
          pour le compte de ses clients, les offres d&apos;opérateurs de
          télécommunications partenaires. Son activité est placée sous le
          contrôle de l&apos;Agence de Régulation des Télécommunications (ART)
          du Cameroun. Référence : <Fact value={LEGAL.artLicence} />.
        </p>
      </Section>

      <Section title="Hébergement">
        <p className="m-0">
          Le site est hébergé par {HOST.name}, {HOST.address} (
          <a className={link} href={HOST.site} target="_blank" rel="noopener noreferrer">vercel.com</a>).
          Les demandes envoyées depuis le site sont stockées chez Supabase ; le
          détail figure dans la{" "}
          <Link className={link} href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p className="m-0">
          Les textes, le logo, le pictogramme et la charte graphique de Cherryz
          sont protégés. Toute reproduction, totale ou partielle, sans
          autorisation écrite préalable est interdite.
        </p>
        <p className="m-0">
          Les noms et logos des opérateurs partenaires et des clients cités
          appartiennent à leurs titulaires respectifs et sont reproduits à
          titre de référence.
        </p>
      </Section>

      <Section title="Estimations et informations du site">
        <p className="m-0">
          Les prix, économies et recettes affichés sur le site sont des
          estimations indicatives. Seul le devis établi par Cherryz après
          l&apos;étude de votre site a une valeur contractuelle.
        </p>
      </Section>

      <Section title="Liens externes">
        <p className="m-0">
          Le site renvoie vers des services tiers (prise de rendez-vous Cal.com,
          WhatsApp, réseaux sociaux). Cherryz n&apos;est pas responsable de leur
          contenu ni de leurs pratiques en matière de données.
        </p>
      </Section>

      <Section title="Droit applicable">
        <p className="m-0">
          Les présentes mentions sont régies par le droit camerounais. Tout
          litige relatif au site relève de la compétence des juridictions de
          Yaoundé.
        </p>
      </Section>
    </LegalPage>
  );
}

// English translation, for information. The French version prevails.
function MentionsLegalesEn() {
  return (
    <LegalPage title="Legal notice" updatedAt={LEGAL.updatedAt}>
      <Section title="Publisher">
        <p className="m-0">
          The website <strong>cherryz.tech</strong> is published by <Fact value={LEGAL.companyName} />,{" "}
          <Fact value={LEGAL.legalForm} /> with a share capital of <Fact value={LEGAL.capital} />.
        </p>
        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          <li>Trade register (RCCM): <Fact value={LEGAL.rccm} /></li>
          <li>Taxpayer number (NIU): <Fact value={LEGAL.niu} /></li>
          <li>Registered office: <Fact value={LEGAL.address} />, Yaoundé, Cameroon</li>
          <li>
            Phone and WhatsApp: <a className={link} href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
          </li>
          <li>
            Email: <a className={link} href={CONTACT.emailHref}>{CONTACT.email}</a>
          </li>
        </ul>
        <p className="m-0">
          Publication director: <Fact value={LEGAL.publicationDirector} />.
        </p>
      </Section>

      <Section title="Regulated activity">
        <p className="m-0">
          Cherryz is a connectivity broker: on behalf of its clients, it selects
          and negotiates the offers of partner telecommunications operators. Its
          activity is supervised by Cameroon&apos;s Telecommunications Regulatory
          Board (ART). Reference: <Fact value={LEGAL.artLicence} />.
        </p>
      </Section>

      <Section title="Hosting">
        <p className="m-0">
          The website is hosted by {HOST.name}, {HOST.address} (
          <a className={link} href={HOST.site} target="_blank" rel="noopener noreferrer">vercel.com</a>).
          Requests sent from the website are stored with Supabase; details are
          given in the{" "}
          <Link className={link} href="/en/confidentialite">privacy policy</Link>.
        </p>
      </Section>

      <Section title="Intellectual property">
        <p className="m-0">
          Cherryz&apos;s texts, logo, pictogram and visual identity are protected.
          Any reproduction, in whole or in part, without prior written permission
          is prohibited.
        </p>
        <p className="m-0">
          The names and logos of the partner operators and clients mentioned
          belong to their respective owners and are shown for reference.
        </p>
      </Section>

      <Section title="Estimates and website information">
        <p className="m-0">
          The prices, savings and revenues shown on the website are indicative
          estimates. Only the quote issued by Cherryz after surveying your site is
          contractually binding.
        </p>
      </Section>

      <Section title="External links">
        <p className="m-0">
          The website links to third-party services (Cal.com booking, WhatsApp,
          social networks). Cherryz is not responsible for their content or their
          data practices.
        </p>
      </Section>

      <Section title="Governing law">
        <p className="m-0">
          This notice is governed by Cameroonian law. Any dispute relating to the
          website falls under the jurisdiction of the courts of Yaoundé. This
          English version is a translation provided for information; the French
          version prevails.
        </p>
      </Section>
    </LegalPage>
  );
}
