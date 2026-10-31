import type { ReactNode } from "react";

/** Tags shared by the rich messages of the catalogs (`t.rich(key, rich)`). */
export const rich = {
  br: () => <br />,
  accent: (chunks: ReactNode) => <span className="text-accent-on-dark">{chunks}</span>,
};
