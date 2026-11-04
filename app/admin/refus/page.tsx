import { redirect } from "next/navigation";
import { btnSecondary, card } from "@/components/admin/ui";
import { getAdminState } from "@/lib/admin/dal";
import { signOut } from "../actions";

// A valid account (accounts are shared with the other Umdeny sites) that is
// not on the Cherryz team. Signing out here only affects this browser.
export default async function Refus() {
  const state = await getAdminState();
  if (state.step === "signed-out") redirect("/admin/connexion");
  if (state.step !== "not-member") redirect("/admin");

  return (
    <div className={`${card} mx-auto max-w-[480px] px-6 py-8 sm:px-9`}>
      <h1 className="m-0 font-condensed text-[32px] font-bold leading-[1.05]">Accès refusé</h1>
      <p className="mb-6 mt-2 font-sans text-[15.5px] text-navy/75">
        Le compte {state.email} n&apos;a pas accès à l&apos;espace équipe Cherryz.
        Si vous en faites partie, demandez à un administrateur de vous ajouter.
      </p>
      <form action={signOut}>
        <button type="submit" className={btnSecondary}>Se déconnecter</button>
      </form>
    </div>
  );
}
