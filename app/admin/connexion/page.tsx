import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/AuthForms";
import { card } from "@/components/admin/ui";
import { getAdminState, safeNext } from "@/lib/admin/dal";

export default async function Connexion({ searchParams }: { searchParams: Promise<{ suite?: string }> }) {
  const suite = safeNext((await searchParams).suite);
  const state = await getAdminState();
  if (state.step === "ready") redirect(suite);
  if (state.step === "verify") redirect(`/admin/verification?suite=${encodeURIComponent(suite)}`);
  if (state.step === "enroll") redirect(`/admin/securite?suite=${encodeURIComponent(suite)}`);
  if (state.step === "not-member") redirect("/admin/refus");

  return (
    <div className={`${card} mx-auto max-w-[440px] px-6 py-8 sm:px-9`}>
      <h1 className="m-0 font-condensed text-[32px] font-bold leading-[1.05]">Connexion</h1>
      <p className="mb-6 mt-2 font-sans text-[15.5px] text-navy/70">
        Espace réservé à l&apos;équipe Cherryz. Un code de votre application
        d&apos;authentification vous sera ensuite demandé.
      </p>
      <LoginForm suite={suite} />
    </div>
  );
}
