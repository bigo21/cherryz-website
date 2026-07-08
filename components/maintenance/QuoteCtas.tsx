"use client";

import { useState } from "react";
import type { QuoteType } from "@/lib/quote/schemas";
import QuoteFormModal from "@/components/quote/QuoteFormModal";

export default function QuoteCtas() {
  const [active, setActive] = useState<QuoteType | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-[14px] animate-fade [animation-delay:0.34s]">
        <button
          type="button"
          onClick={() => setActive("ip")}
          className="inline-flex cursor-pointer items-center gap-[10px] rounded-[10px] border-none bg-cherry px-7 py-4 font-condensed text-[17px] font-bold tracking-[0.5px] text-white shadow-cherry transition-transform hover:-translate-y-[2px] hover:bg-cherry-dark"
        >
          Demander une cotation IP Publique Dédiée
        </button>
        <button
          type="button"
          onClick={() => setActive("wifi")}
          className="inline-flex cursor-pointer items-center gap-[10px] rounded-[10px] border-[1.6px] border-cherry bg-transparent px-7 py-4 font-condensed text-[17px] font-bold tracking-[0.5px] text-cherry transition-colors hover:bg-cherry hover:text-white"
        >
          Demander une cotation WiFi Zone
        </button>
      </div>

      {active && (
        <QuoteFormModal type={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}
