import { CheckBadgeIcon } from "./icons";

const items = [
  "Régulée ART",
  "Partenaire Camtel · Orange · MTN",
  "Jusqu'à -50%",
  "IP dédiée & sécurisée",
  "Test avant engagement",
];

// Dark reassurance strip shown under the hero on Accueil and Internet B2B.
export default function ReassuranceBar() {
  return (
    <section className="bg-navy py-6">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-[18px] px-6 md:px-12">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-[11px]">
            {i > 0 && (
              <span className="mr-[18px] hidden h-[22px] w-px bg-white/[0.14] lg:inline-block" />
            )}
            <CheckBadgeIcon />
            <span className="font-condensed text-[15.5px] font-semibold tracking-[0.4px] text-white">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
