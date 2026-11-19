import { createContext, useContext } from 'react'

export type Lang = 'pt-BR' | 'en' | 'es'

export const LANG_LABELS: Record<Lang, string> = {
  'pt-BR': 'PT',
  en: 'EN',
  es: 'ES',
}

export const LANG_STORAGE_KEY = 'zoji-lang'

export function detectDefaultLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY)
    if (stored === 'pt-BR' || stored === 'en' || stored === 'es') return stored
  } catch {
    // localStorage indisponível (modo privado, etc.) — ignora e usa detecção do navegador
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'pt-BR'
  if (nav.startsWith('en')) return 'en'
  if (nav.startsWith('es')) return 'es'
  return 'pt-BR'
}

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void } | null>(null)

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang precisa estar dentro de <LanguageProvider>')
  return ctx
}
