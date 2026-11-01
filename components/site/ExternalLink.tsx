import type { AnchorHTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { ExternalIcon } from "./icons";

/**
 * A link that opens a new tab and says so: an icon, and « (nouvel onglet) » for
 * screen readers. `icon={false}` drops the visible icon where the design already
 * shows one (social icons), never the spoken warning.
 */
export default function ExternalLink({
  children,
  icon = true,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { icon?: boolean }) {
  const t = useTranslations("Chrome");
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      {icon && <ExternalIcon className="ml-1 inline-block align-baseline text-small" />}
      <span className="sr-only"> {t("newTab")}</span>
    </a>
  );
}
