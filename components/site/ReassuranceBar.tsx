import { getTranslations } from "next-intl/server";
import { CheckBadgeIcon } from "./icons";

const items = ["art", "partners", "discount", "ip", "test"] as const;

// Dark reassurance strip shown under the Internet B2B hero.
export default async function ReassuranceBar() {
  const t = await getTranslations("Chrome.reassurance");
  return (
    <section className="bg-navy py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 md:px-12">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-3">
            {i > 0 && (
              <span className="mr-4 hidden h-6 w-px bg-white/15 lg:inline-block" />
            )}
            <CheckBadgeIcon />
            <span className="font-condensed text-body font-semibold tracking-wide text-white">
              {t(item)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
