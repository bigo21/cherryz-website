import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

// Shared chrome for the public marketing site (Accueil, Internet B2B, WiFi Zone, Contact).
// The nav is fixed/transparent and overlays each page's dark hero.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteNav />
      {children}
      <SiteFooter />
    </>
  );
}
