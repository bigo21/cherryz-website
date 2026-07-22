import Image from "next/image";
import Link from "next/link";

// Standalone "mini-site" chrome for the quote request flow (/demandes).
// Independent from the marketing nav/footer so it works even during maintenance.
export default function DemandesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed inset-x-0 top-0 z-[100] border-b border-white/[0.08] bg-navy shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-center px-6 py-[18px] md:px-12">
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

      {children}

      <footer className="bg-navy py-9 text-center">
        <span className="font-condensed text-[16px] font-semibold tracking-[0.5px] text-accent-vivid">
          Cherryz — Vous connecte !
        </span>
        <div className="mt-2 font-sans text-[13px] text-white/40">
          © 2026 Cherryz. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
