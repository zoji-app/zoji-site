import { useLang, type Lang } from '../lib/lang'

const t: Record<Lang, { title: string; subtitle: string; availableOn: string; availableOnG: string; requirements: string }> = {
  'pt-BR': {
    title: 'Baixe agora',
    subtitle: 'Gratuito para iOS e Android. Comece a conversar em emojis hoje mesmo. 🚀',
    availableOn: 'Disponível na',
    availableOnG: 'Disponível no',
    requirements: 'iOS 16+ · Android 8.0+',
  },
  en: {
    title: 'Download now',
    subtitle: 'Free for iOS and Android. Start chatting in emojis today. 🚀',
    availableOn: 'Available on the',
    availableOnG: 'Available on',
    requirements: 'iOS 16+ · Android 8.0+',
  },
  es: {
    title: 'Descarga ahora',
    subtitle: 'Gratis para iOS y Android. Empieza a chatear con emojis hoy mismo. 🚀',
    availableOn: 'Disponible en',
    availableOnG: 'Disponible en',
    requirements: 'iOS 16+ · Android 8.0+',
  },
}

export default function Download() {
  const { lang } = useLang()
  const s = t[lang]

  return (
    <section
      id="download"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #16224D 0%, #0A1330 100%)' }}
    >
      {/* Background emojis */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {['🎊', '🥳', '🎈', '✨', '🎉', '💥'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-5xl opacity-10"
            style={{
              top: `${15 + i * 13}%`,
              left: `${8 + i * 16}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <img src="/logo.png" alt="Zoji" width={256} height={256} loading="lazy" className="w-24 h-24 mx-auto mb-6 drop-shadow-2xl animate-float" />

        <h2 className="font-zoji text-5xl md:text-6xl text-white drop-shadow-md mb-4">
          {s.title}
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-sm mx-auto">
          {s.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* App Store */}
          <a
            href="https://apps.apple.com/br/app/zoji/id6762674303"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:scale-105 hover:shadow-black/30 transition-all duration-200"
          >
            <svg className="w-8 h-8 flex-none" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-xs text-white/70 leading-none">{s.availableOn}</div>
              <div className="text-lg font-bold leading-tight">App Store</div>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="https://play.google.com/store/apps/details?id=dev.de4araujo.zoji"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white text-neutral-900 px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:scale-105 hover:shadow-black/20 transition-all duration-200"
          >
            <svg className="w-8 h-8 flex-none" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.22.99.14l12.47-7.18L13.01 13l-9.83 10.76zm-1.7-20.32C1.19 3.83 1 4.28 1 4.86v14.29c0 .58.19 1.03.48 1.41L14.02 12 1.48 3.44zM20.49 10.31l-2.76-1.59-3.65 3.28 3.65 3.27 2.79-1.6c.8-.46.8-1.83-.03-2.36zM4.17.1L16.64 7.28 13.01 10.9 4.17.1z" />
            </svg>
            <div className="text-left">
              <div className="text-xs text-neutral-500 leading-none">{s.availableOnG}</div>
              <div className="text-lg font-bold leading-tight">Google Play</div>
            </div>
          </a>
        </div>

        <p className="text-white/50 text-sm mt-8">
          {s.requirements}
        </p>
      </div>
    </section>
  )
}
