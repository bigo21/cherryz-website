// Placeholder home page (Accueil). To be replaced by the real design.
// Publicly gated by proxy.ts (visible only on the preview domain / with a preview bypass)
// until MAINTENANCE_MODE is turned off in production.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-navy px-6 text-center text-white">
      <h1 className="font-condensed text-4xl font-bold uppercase tracking-tight">
        Accueil — en construction
      </h1>
      <p className="max-w-md font-sans text-white/70">
        Cette page (et les autres pages du site) est en cours de développement.
        Elle n&apos;est visible que sur le domaine de préversion.
      </p>
      <span className="mt-2 font-condensed font-semibold tracking-[0.6px] text-accent">
        Cherryz — Vous connecte !
      </span>
    </main>
  );
}
