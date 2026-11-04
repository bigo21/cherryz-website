import { redirect } from "next/navigation";
import { CodeForm } from "@/components/admin/AuthForms";
import { card } from "@/components/admin/ui";
import { getAdminState, safeNext } from "@/lib/admin/dal";

// Each sign-in: after the password, the code from the member's authenticator app.
export default async function Verification({ searchParams }: { searchParams: Promise<{ suite?: string }> }) {
  const suite = safeNext((await searchParams).suite);
  const state = await getAdminState();
  if (state.step === "signed-out") redirect("/admin/connexion");
  if (state.step === "not-member") redirect("/admin/refus");
  if (state.step === "enroll") redirect(`/admin/securite?suite=${encodeURIComponent(suite)}`);
  if (state.step === "ready") redirect(suite);

  return (
    <div className={`${card} mx-auto max-w-[440px] px-6 py-8 sm:px-9`}>
      <h1 className="m-0 font-condensed text-[32px] font-bold leading-[1.05]">Double authentification</h1>
      <p className="mb-6 mt-2 font-sans text-[15.5px] text-navy/70">
        Saisissez le code affiché par votre application d&apos;authentification
        pour Cherryz équipe.
      </p>
      <CodeForm suite={suite} />
    </div>
  );
}
