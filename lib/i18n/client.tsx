"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "./config";

const LangContext = createContext<Locale>(defaultLocale);

export function LangProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** The current locale, in Client Components. */
export const useLang = () => useContext(LangContext);
