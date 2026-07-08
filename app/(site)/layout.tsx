// Shared chrome for the public marketing site (Accueil, Internet B2B, WiFi Zone, Contact).
// The designed nav + footer will be built here when the first real page is implemented.
// Kept minimal for now so the pages render on the preview domain.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
