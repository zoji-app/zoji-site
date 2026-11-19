import { useEffect } from 'react'
import { useLang, type Lang } from '../lib/lang'

const t: Record<Lang, { title: string; subtitle: string; haveApp: string; openNow: string }> = {
  'pt-BR': {
    title: 'Baixe o Zoji',
    subtitle: 'Alguém quer te adicionar como contato no Zoji. Baixe o app para aceitar o convite.',
    haveApp: 'Já tem o app?',
    openNow: 'Abrir agora',
  },
  en: {
    title: 'Download Zoji',
    subtitle: 'Someone wants to add you as a contact on Zoji. Download the app to accept the invite.',
    haveApp: 'Already have the app?',
    openNow: 'Open now',
  },
  es: {
    title: 'Descarga Zoji',
    subtitle: 'Alguien quiere agregarte como contacto en Zoji. Descarga la app para aceptar la invitación.',
    haveApp: '¿Ya tienes la app?',
    openNow: 'Abrir ahora',
  },
}

export default function AddContact() {
  const { lang } = useLang()
  const s = t[lang]
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      // Tenta abrir o app silenciosamente — se abrir, o browser fecha e o usuário nunca vê esta página
      window.location.href = `zoji://add-contact?token=${token}`
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 px-6 text-center">
      <title>{s.title}</title>
      <img src="/logo.png" alt="Zoji" width={256} height={256} className="w-20 h-20 rounded-2xl mb-6 shadow" />

      <h1 className="text-2xl font-bold text-neutral-900 mb-2">{s.title}</h1>
      <p className="text-neutral-500 text-sm mb-8 max-w-xs leading-relaxed">
        {s.subtitle}
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <a
          href="https://apps.apple.com/app/zoji/id6737014827"
          className="flex items-center justify-center gap-2 bg-black text-white text-sm font-medium py-3.5 px-6 rounded-xl"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          App Store
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=dev.de4araujo.zoji"
          className="flex items-center justify-center gap-2 bg-primary-700 text-white text-sm font-medium py-3.5 px-6 rounded-xl"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.18 23.76c.3.16.65.19.98.08l12.49-7.19-2.61-2.61-10.86 9.72zM.54 1.96C.2 2.3 0 2.83 0 3.53v16.94c0 .7.2 1.23.54 1.57l.08.08 9.49-9.49v-.22L.62 1.88l-.08.08zM20.27 10.5l-2.67-1.54-2.93 2.93 2.93 2.93 2.68-1.55c.77-.44.77-1.33-.01-1.77zM3.18.24L15.67 7.43l-2.61 2.61L2.21.32c.3-.19.68-.18.97-.08z"/>
          </svg>
          Google Play
        </a>
      </div>

      <p className="text-neutral-500 text-xs mt-8">
        {s.haveApp}{' '}
        <button
          onClick={() => {
            const params = new URLSearchParams(window.location.search)
            const token = params.get('token')
            if (token) window.location.href = `zoji://add-contact?token=${token}`
          }}
          className="text-primary-700 underline"
        >
          {s.openNow}
        </button>
      </p>
    </div>
  )
}
