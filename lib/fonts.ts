import { Barlow, Barlow_Condensed } from "next/font/google";

// The two widths of the brand font, shared by the root layout and the global 404.
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

/** Classes to put on <html>: they declare --font-barlow and --font-barlow-condensed. */
export const fontVariables = `${barlow.variable} ${barlowCondensed.variable}`;
