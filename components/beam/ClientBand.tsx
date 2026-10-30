import { getTranslations } from "next-intl/server";

const CLIENTS = [
  ["afriland-first-bank", "Afriland First Bank"],
  ["belgocam", "Belgocam S.A."],
  ["sudcam", "Sud Cameroun Hevea (SUDCAM)"],
  ["hotel-mansel", "Hotel Mansel"],
  ["vallee-des-princes-hotel", "Vallée des Princes Hotel"],
  ["jouvence-international-hotel", "Jouvence International Hotel"],
  ["star-land-hotel", "Star Land Hotel"],
  ["kny-groupe", "KNY Groupe"],
  ["inoni-tech", "Inoni Tech"],
  ["cinetpay", "CinetPay"],
  ["kalitas", "Kalitas"],
  ["socokem", "Socokem"],
  ["carlcare", "Carlcare"],
  ["best-dental", "Best Dental"],
  ["dpg-kennel", "DPG Kennel"],
  ["aaltelsolutions", "AALTELSOLUTIONS"],
  ["1xbet", "1xBet"],
] as const;

/** Client references: every logo on its own white tile, on the light ground. */
export default async function ClientBand() {
  const t = await getTranslations("Home.clients");
  return (
    <section className="bg-dawn py-20 text-night md:py-24" aria-labelledby="clients-title">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-night pb-4">
          <h2 id="clients-title" className="m-0 font-condensed text-[clamp(30px,3.4vw,44px)] font-bold leading-[1.02]">{t("title")}</h2>
          <span className="font-sans text-[15px] text-ink-soft">{t("note")}</span>
        </div>
        <ul className="m-0 mt-8 grid list-none grid-cols-2 gap-[3px] p-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CLIENTS.map(([file, name]) => (
            <li key={file} className="flex h-[104px] items-center justify-center bg-white px-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/trim/${file}.png`} alt={name} loading="lazy" className="max-h-[46px] max-w-[120px] object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
