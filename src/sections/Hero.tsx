import { useLang, type Lang } from '../lib/lang'

const t: Record<Lang, { subtitle: string; available: string }> = {
  'pt-BR': {
    subtitle: 'O jeito mais divertido e expressivo de se comunicar. Sem palavras. Só sentimentos.',
    available: 'Disponível para iOS e Android',
  },
  en: {
    subtitle: 'The most fun and expressive way to communicate. No words. Just feelings.',
    available: 'Available for iOS and Android',
  },
  es: {
    subtitle: 'La forma más divertida y expresiva de comunicarte. Sin palabras. Solo sentimientos.',
    available: 'Disponible para iOS y Android',
  },
}

export default function Hero() {
  const { lang } = useLang()
  const s = t[lang]

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{ background: 'linear-gradient(160deg, #16224D 0%, #0A1330 100%)' }}
    >
      {/* Floating emoji background decoration */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {['😂', '🥰', '🔥', '👋', '😎', '🎉', '❤️', '🙌', '😜', '💫', '👀', '🤩'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-3xl opacity-15"
            style={{
              top: `${10 + (i * 7.5) % 80}%`,
              left: `${5 + (i * 11) % 90}%`,
              animationDelay: `${i * 0.4}s`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Logo + title */}
      <div className="relative flex flex-col items-center gap-4 z-10 text-center">
        <img
          src="/logo-wordmark.png"
          alt="Zoji — Conecte-se de verdade"
          width={920}
          height={507}
          fetchPriority="high"
          className="w-52 md:w-64 h-auto drop-shadow-2xl animate-float"
        />

        <p className="text-white/70 text-base md:text-lg max-w-sm">
          {s.subtitle}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href="https://apps.apple.com/br/app/zoji/id6762674303"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-black text-white px-7 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:scale-105 transition-transform"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=dev.de4araujo.zoji"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white text-neutral-900 px-7 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:scale-105 transition-transform"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.22.99.14l12.47-7.18L13.01 13l-9.83 10.76zm-1.7-20.32C1.19 3.83 1 4.28 1 4.86v14.29c0 .58.19 1.03.48 1.41L14.02 12 1.48 3.44zM20.49 10.31l-2.76-1.59-3.65 3.28 3.65 3.27 2.79-1.6c.8-.46.8-1.83-.03-2.36zM4.17.1L16.64 7.28 13.01 10.9 4.17.1z" />
            </svg>
            Google Play
          </a>
        </div>

        <p className="text-white/60 text-sm mt-2">{s.available}</p>
      </div>

      {/* Phone preview */}
      <div className="relative z-10 mt-16 flex justify-center">
        <div className="phone-mockup w-52 md:w-64 animate-float-slow">
          <img
            src="/screen-hero.webp"
            alt="Tela de amigos do Zoji"
            width={520}
            height={1126}
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
