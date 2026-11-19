import { LANG_LABELS, useLang, type Lang } from '../lib/lang'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full bg-navy-card/95 backdrop-blur-sm shadow-md border border-navy-hairline p-1 ${className}`}
    >
      <span className="pl-1.5 pr-0.5 text-navy-text-secondary text-xs select-none" aria-hidden="true">
        🌐
      </span>
      {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ${
            lang === l
              ? 'bg-primary-500 text-navy-page'
              : 'text-navy-text-secondary hover:text-navy-text hover:bg-navy-hairline/40'
          }`}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  )
}
