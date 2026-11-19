import { useEffect, useState, type ReactNode } from 'react'
import { LangContext, detectDefaultLang, LANG_STORAGE_KEY, type Lang } from './lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectDefaultLang)

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l)
    } catch {
      // per-viewer convenience only — sem problema se não persistir
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}
