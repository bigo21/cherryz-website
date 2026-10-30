import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { Fact, Section } from "@/components/site/LegalPage";
import { HOST, LEGAL } from "@/lib/site/legal";
import { CONTACT } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Mentions légales | Cherryz",
  description: "Identification de l'éditeur du site cherryz.tech, hébergement, propriété intellectuelle et droit applicable.",
};

const link = "font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy";

export default function MentionsLegales() {
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
