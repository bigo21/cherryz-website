import type { Metadata } from "next";
import LegalPage, { Fact, Section } from "@/components/site/LegalPage";
import { HOST, LEGAL } from "@/lib/site/legal";
import { CONTACT } from "@/lib/site/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Cherryz",
  description:
    "Quelles données Cherryz collecte via ses formulaires, pourquoi, avec qui elles sont partagées, combien de temps elles sont conservées et comment exercer vos droits.",
};

const link = "font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy";
const list = "m-0 flex list-disc flex-col gap-1 pl-5";

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité" updatedAt={LEGAL.updatedAt}>
      <Section title="Qui est responsable de vos données">
        <p className="m-0">
          <Fact value={LEGAL.companyName} /> (Cherryz), dont le siège est situé{" "}
          <Fact value={LEGAL.address} />, Yaoundé, Cameroun, est responsable des
          traitements décrits ici. Pour toute question :{" "}
          <a className={link} href={CONTACT.emailHref}>{CONTACT.email}</a>.
        </p>
        <p className="m-0">
          Cette politique s&apos;applique dans le cadre de la loi n° 2024/017 du
          23 décembre 2024 relative à la protection des données à caractère
          personnel au Cameroun.
        </p>
      </Section>

      <Section title="Les données que nous collectons">
        <p className="m-0">
          Nous ne collectons que ce que vous nous transmettez volontairement :
        </p>
        <ul className={list}>
          <li>
            <strong>Questionnaire de devis</strong> (Internet B2B ou WiFi Zone) : nom,
            fonction, entreprise, email, téléphone, ville et quartier, et vos
            réponses sur votre projet (connexion actuelle, besoins, budget,
            site à équiper…).
          </li>
          <li>
            <strong>Localisation précise</strong>, uniquement si vous cliquez sur
            « Utiliser ma position actuelle » et l&apos;autorisez dans votre
            navigateur ; sinon, la description que vous saisissez.
          </li>
          <li>
            <strong>Formulaire de contact</strong> : nom, email, téléphone,
            entreprise, besoin et message.
          </li>
          <li>
            <strong>Informations techniques jointes à chaque demande</strong> : page
            d&apos;envoi, site d&apos;origine, paramètres de campagne (UTM), type
            de navigateur, date et heure.
          </li>
        </ul>
        <p className="m-0">
          Le site n&apos;utilise ni cookie publicitaire ni outil de mesure
          d&apos;audience. Vos réponses au questionnaire sont enregistrées sur
          votre appareil pendant que vous le remplissez, pour ne pas les perdre
          ; elles ne nous parviennent qu&apos;au moment où vous envoyez la
          demande.
        </p>
      </Section>

      <Section title="Pourquoi nous les utilisons">
        <ul className={list}>
          <li>étudier votre besoin et établir votre devis ;</li>
          <li>vous recontacter et organiser, si besoin, une visite technique ;</li>
          <li>vous envoyer un email confirmant la bonne réception de votre demande.</li>
        </ul>
        <p className="m-0">
          Ces traitements reposent sur votre consentement, donné en cochant la
          case prévue avant l&apos;envoi, et sur les mesures préalables à un
          éventuel contrat que vous nous demandez. Vos données ne sont ni
          vendues ni utilisées à des fins publicitaires.
        </p>
      </Section>

      <Section title="Qui y a accès">
        <p className="m-0">
          Seule l&apos;équipe Cherryz chargée de traiter les demandes y a accès.
          Nous faisons appel aux prestataires techniques suivants, qui agissent
          pour notre compte :
        </p>
        <ul className={list}>
          <li>{HOST.name} : hébergement du site ;</li>
          <li>Supabase : stockage sécurisé des demandes ;</li>
          <li>Resend : envoi des emails de notification et de confirmation.</li>
        </ul>
        <p className="m-0">
          Si vous réservez un créneau via Cal.com ou nous écrivez sur WhatsApp,
          ces services traitent vos données selon leurs propres politiques.
          Ces prestataires peuvent héberger des données hors du Cameroun ; nous
          les choisissons pour leurs garanties de sécurité.
        </p>
      </Section>

      <Section title="Combien de temps nous les gardons">
        <p className="m-0">
          Vos demandes sont conservées <Fact value={LEGAL.retention} />, puis
          supprimées. Si vous devenez client, les données nécessaires au contrat
          sont conservées pendant la durée de la relation et les délais légaux
          qui s&apos;y appliquent.
        </p>
      </Section>

      <Section title="Comment nous les protégeons">
        <p className="m-0">
          Les échanges avec le site sont chiffrés (HTTPS). Les demandes sont
          stockées dans une base dont la lecture est fermée au public : le
          formulaire peut enregistrer une demande, mais personne ne peut la
          relire depuis le site.
        </p>
      </Section>

      <Section title="Vos droits">
        <p className="m-0">
          Vous pouvez à tout moment demander l&apos;accès à vos données, leur
          rectification ou leur effacement, vous opposer à leur traitement ou
          retirer votre consentement. Écrivez-nous à{" "}
          <a className={link} href={CONTACT.emailHref}>{CONTACT.email}</a> en
          précisant l&apos;email utilisé dans votre demande ; nous répondons dans
          les meilleurs délais.
        </p>
        <p className="m-0">
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          saisir l&apos;Autorité de protection des données à caractère personnel
          (APDP) du Cameroun.
        </p>
      </Section>
    </LegalPage>
  );
}
