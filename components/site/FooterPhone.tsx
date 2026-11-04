"use client";

import { usePathname } from "next/navigation";
import { BIZLINK, CONTACT } from "@/lib/site/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

// Footer phone line: BizLink has its own WhatsApp number, the rest of the site the main phone.
export default function FooterPhone({ className }: { className: string }) {
  const bizlink = usePathname()?.startsWith(BIZLINK.href) ?? false;
  if (bizlink) {
    return (
      <a href={BIZLINK.whatsapp} target="_blank" rel="noopener noreferrer" className={className}>
        <WhatsAppIcon className="mr-1 inline-block h-[1em] w-[1em] align-[-0.14em]" /> WhatsApp{" "}
        {BIZLINK.whatsappDisplay}
      </a>
    );
  }
  return (
    <a href={CONTACT.phoneHref} className={className}>
      <PhoneIcon className="mr-1 inline-block align-[-0.14em]" /> {CONTACT.phoneDisplay}
    </a>
  );
}
