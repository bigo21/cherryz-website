import Image from "next/image";
import MaintenanceIllustration from "./MaintenanceIllustration";
import QuoteCtas from "./QuoteCtas";

export default function MaintenanceScreen() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-navy text-white">
      {/* Decorative halos + diagonal band */}
      <div
        className="absolute -right-[140px] -top-[180px] z-0 h-[620px] w-[620px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(162,3,45,.34), transparent 66%)",
        }}
      />
      <div
        className="absolute -bottom-[220px] -left-[160px] z-0 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(197,12,79,.18), transparent 66%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 top-0 z-0 w-[40%]"
        style={{
          background:
            "linear-gradient(135deg, rgba(162,3,45,.16), rgba(124,5,48,.05))",
          clipPath: "polygon(45% 0, 100% 0, 100% 100%, 18% 100%)",
        }}
      />

      {/* Illustration — background layer, anchored right, does not affect the text width */}
      <div className="pointer-events-none absolute inset-y-0 -right-10 z-[1] hidden items-center lg:flex">
        <div className="w-[clamp(560px,62vw,980px)] animate-fade [animation-delay:0.3s]">
          <MaintenanceIllustration />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-[2] flex flex-wrap items-center gap-4 px-[6vw] pt-[34px]">
        <Image
          src="/brand/logo-white.png"
          alt="Cherryz"
          width={107}
          height={44}
          priority
          className="block h-11 w-auto animate-fade"
        />
      </header>

      {/* Content */}
      <div className="relative z-[2] flex w-full flex-1 items-center px-[6vw] py-10">
        <div className="w-full max-w-none lg:max-w-[720px]">
          <h1 className="m-0 font-condensed text-[clamp(44px,6.4vw,84px)] font-bold uppercase leading-[0.98] tracking-[-0.5px] animate-fade [animation-delay:0.1s]">
            Site en
            <br />
            maintenance
          </h1>
          <p className="mt-6 max-w-[600px] font-sans text-[clamp(17px,2vw,21px)] font-normal leading-[1.55] text-white/[0.76] animate-fade [animation-delay:0.2s]">
            Notre site est actuellement en cours d&apos;amélioration afin de
            vous offrir une expérience encore plus performante. Nous serons de
            retour très prochainement avec un service optimisé.
          </p>

          <p className="mb-[14px] mt-[34px] font-condensed text-[15px] font-semibold uppercase tracking-[1px] text-white/55 animate-fade [animation-delay:0.28s]">
            En attendant, vous pouvez déjà faire votre demande :
          </p>

          <QuoteCtas />

          <div className="mt-[38px] border-t border-white/[0.12] pt-7 animate-fade [animation-delay:0.42s]">
            <p className="mb-[14px] font-condensed text-[15px] font-semibold uppercase tracking-[1px] text-white/55">
              Vous pouvez également nous contactez directement via :
            </p>
            <div className="flex flex-wrap gap-[14px]">
              <a
                href="https://wa.me/237242014664"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[13px] rounded-[10px] border border-white/[0.16] bg-white/[0.06] px-[22px] py-[14px] text-white transition-colors hover:border-accent hover:bg-white/[0.11]"
              >
                <span className="inline-flex text-whatsapp">
                  <svg viewBox="0 0 24 24" width="27" height="27" fill="currentColor">
                    <path d="M17.47 14.38c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.21-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.76 1.17 2.95.15.19 2.01 3.08 4.88 4.32.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
                    <path d="M12 2a10 10 0 0 0-8.53 15.26L2 22l4.85-1.27A10 10 0 1 0 12 2zm0 18.2a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1 1 12 20.2z" />
                  </svg>
                </span>
                <span>
                  <span className="block font-condensed text-[11.5px] font-semibold tracking-[1px] text-white/55">
                    WHATSAPP
                  </span>
                  <span className="font-sans text-[16px] font-semibold">
                    +237 242 01 46 64
                  </span>
                </span>
              </a>
              <a
                href="mailto:support@cherryz.tech"
                className="inline-flex items-center gap-[13px] rounded-[10px] border border-white/[0.16] bg-white/[0.06] px-[22px] py-[14px] text-white transition-colors hover:border-accent hover:bg-white/[0.11]"
              >
                <span className="inline-flex text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    width="27"
                    height="27"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <span>
                  <span className="block font-condensed text-[11.5px] font-semibold tracking-[1px] text-white/55">
                    EMAIL
                  </span>
                  <span className="font-sans text-[16px] font-semibold">
                    support@cherryz.tech
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-[2] px-[6vw] pb-10 pt-6 text-center">
        <span className="font-condensed text-[19px] font-semibold tracking-[0.6px] text-accent">
          Cherryz — Vous connecte !
        </span>
      </footer>
    </main>
  );
}
