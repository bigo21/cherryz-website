"use client";

import { usePathname } from "next/navigation";
import { BIZLINK, CONTACT } from "@/lib/site/site";
import { PhoneIcon } from "./icons";

// Footer phone line: BizLink has its own number, the rest of the site the main one.
export default function FooterPhone({ className }: { className: string }) {
  const bizlink = usePathname()?.startsWith(BIZLINK.href) ?? false;
  return (
    <a href={bizlink ? BIZLINK.phoneHref : CONTACT.phoneHref} className={className}>
      <PhoneIcon className="mr-1 inline-block align-[-0.14em]" />{" "}
      {bizlink ? BIZLINK.whatsappDisplay : CONTACT.phoneDisplay}
    </a>
  );
}
