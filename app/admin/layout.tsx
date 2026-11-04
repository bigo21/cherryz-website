import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAdminState } from "@/lib/admin/dal";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Espace équipe | Cherryz",
  robots: { index: false, follow: false },
};

// Chrome of the team dashboard. It only shows who is signed in: each page
// checks access itself (requireMember), and the database checks it again.
export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const state = await getAdminState();
  const member = state.step === "ready" ? state.member : null;
  return (
    <div className="min-h-screen bg-surface text-navy">
      <header className="border-b border-white/[0.08] bg-navy">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-12">
          <Link href="/admin" className="flex items-center gap-3" aria-label="Espace équipe Cherryz, demandes">
            <Image src="/brand/logo-white.png" alt="" width={93} height={38} className="block h-[34px] w-auto" />
            <span className="font-condensed text-[15px] font-semibold tracking-[1px] text-white/70">ESPACE ÉQUIPE</span>
          </Link>
          {member && (
            <div className="flex items-center gap-4">
              <span className="font-sans text-[14.5px] text-white/80">{member.displayName}</span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="min-h-11 cursor-pointer rounded-full border border-white/25 px-4 py-2 font-condensed text-[15px] font-semibold tracking-[0.4px] text-white transition-colors hover:bg-white/10"
                >
                  Se déconnecter
                </button>
              </form>
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-[1280px] px-6 py-10 md:px-12">{children}</main>
    </div>
  );
}
