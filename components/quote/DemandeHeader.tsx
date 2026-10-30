import Link from "next/link";
import { ArrowRightIcon } from "@/components/site/icons";

/** Navy title band of a questionnaire page; the wizard sheet overlaps its lower edge. */
export default function DemandeHeader({ title, facts }: { title: string; facts: string[] }) {
  return (
    <header className="bg-navy pb-24 pt-[118px] text-white md:pt-[132px]">
      <div className="mx-auto max-w-[760px] px-4 sm:px-6">
        <Link
          href="/demandes"
          className="inline-flex items-center gap-2 font-sans text-[15px] font-semibold text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowRightIcon aria-hidden className="rotate-180 text-[16px]" />
          Toutes les demandes
        </Link>
        <h1 className="m-0 mt-5 font-condensed text-[clamp(34px,5vw,52px)] font-bold leading-[1] tracking-[-0.015em] [text-wrap:balance]">
          {title}
        </h1>
        <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-sans text-[15px] text-white/70">
          {facts.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-white/45" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
