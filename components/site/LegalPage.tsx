import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { TODO } from "@/lib/site/legal";

/** Long-form legal page: navy title band, then a readable text column. */
export default async function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  const t = await getTranslations("Legal");
  return (
    <>
      <header className="bg-navy pb-14 pt-[140px] text-white">
        <div className="mx-auto max-w-[860px] px-4 sm:px-6">
          <h1 className="m-0 font-condensed text-[clamp(38px,5vw,56px)] font-bold leading-[1] tracking-[-0.015em]">
            {title}
          </h1>
          <p className="mt-4 font-sans text-[15px] text-white/70">{t("updated", { date: new Date(`${updatedAt}T12:00:00Z`) })}</p>
        </div>
      </header>
      <div className="bg-white py-14 md:py-20">
        <article className="legal mx-auto max-w-[860px] px-4 font-sans text-[16.5px] leading-[1.7] text-navy sm:px-6">
          {children}
        </article>
      </div>
    </>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-navy/10 py-8 first:border-t-0 first:pt-0">
      <h2 className="m-0 mb-4 font-condensed text-[26px] font-bold leading-[1.15] text-navy">{title}</h2>
      <div className="flex max-w-[68ch] flex-col gap-3 text-navy/80">{children}</div>
    </section>
  );
}

/** A company fact; renders visibly as missing until Cherryz fills it in lib/site/legal.ts. */
export async function Fact({ value }: { value: string }) {
  const t = await getTranslations("Legal");
  return value === TODO ? (
    <mark className="rounded-[4px] bg-cherry/10 px-1 text-cherry">[{t("todo")}]</mark>
  ) : (
    <>{value}</>
  );
}
