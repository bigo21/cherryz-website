import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale, locales } from "@/lib/i18n/config";
import { PALETTE } from "@/lib/site/palette";

// Share image (Open Graph) of every page, one per language: navy ground, the
// cherry diagonal of the final calls, the logo and the site's promise. Pages
// reference it through pageMetadata (lib/i18n/server.ts).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: hasLocale(lang) ? lang : "fr", namespace: "Site.og" });
  const [bold, regular, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/BarlowCondensed-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Barlow-Regular.ttf")),
    readFile(join(process.cwd(), "public/brand/cherryz-logo-blanc.svg")),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: PALETTE.navy }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 470,
            background: PALETTE.cherry,
            clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", width: 860 }}>
          <img src={`data:image/svg+xml;base64,${logo.toString("base64")}`} alt="" width={155} height={56} />
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: "Barlow Condensed", fontSize: 76, lineHeight: 0.98, color: "#fff" }}>{t("title")}</div>
            <div style={{ fontFamily: "Barlow", fontSize: 30, lineHeight: 1.4, color: PALETTE.onDark2 }}>{t("lead")}</div>
          </div>
          <div style={{ fontFamily: "Barlow Condensed", fontSize: 26, letterSpacing: 2, color: PALETTE.onDark2 }}>WWW.CHERRYZ.TECH</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Barlow Condensed", data: bold, weight: 700, style: "normal" },
        { name: "Barlow", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
