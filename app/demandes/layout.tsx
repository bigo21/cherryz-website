import Image from "next/image";
import Link from "next/link";

// Standalone "mini-site" chrome for the quote request flow (/demandes).
// Independent from the marketing nav/footer so it works even during maintenance.
export default function DemandesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-ground">
      <nav className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-navy">
        <div className="mx-auto flex max-w-[1280px] items-center justify-center px-4 py-[18px] sm:px-6 md:px-12">
          <Link href="/" aria-label="Cherryz, retour à l'accueil">
            <Image
              src="/brand/logo-white.png"
              alt="Cherryz"
              width={93}
              height={38}
              priority
              className="block h-[38px] w-auto"
            />
          </Link>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-navy px-4 py-9 text-center">
        <span className="font-condensed text-[16px] font-semibold tracking-[0.02em] text-white">
          Cherryz — Vous connecte !
        </span>
        <div className="mt-2 font-sans text-[13px] text-white/60">
          © 2026 Cherryz. Tous droits réservés.
          <span aria-hidden> · </span>
          <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
          <span aria-hidden> · </span>
          <Link href="/confidentialite" className="hover:text-white">Confidentialité</Link>
        </div>
      </footer>
    </div>
  );
}
