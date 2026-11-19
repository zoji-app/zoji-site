import { Link } from 'react-router-dom'
import { useLang, type Lang } from '../lib/lang'

const t: Record<Lang, { terms: string; privacy: string; contact: string; madeIn: string; by: string }> = {
  'pt-BR': { terms: 'Termos de Uso', privacy: 'Política de Privacidade', contact: 'Contato', madeIn: 'Feito com 😊 no Brasil.', by: 'Desenvolvido por' },
  en: { terms: 'Terms of Use', privacy: 'Privacy Policy', contact: 'Contact', madeIn: 'Made with 😊 in Brazil.', by: 'Developed by' },
  es: { terms: 'Términos de Uso', privacy: 'Política de Privacidad', contact: 'Contacto', madeIn: 'Hecho con 😊 en Brasil.', by: 'Desarrollado por' },
}

export default function Footer() {
  const { lang } = useLang()
  const s = t[lang]

  return (
    <footer className="bg-navy-page text-navy-text-secondary py-12 px-6 border-t border-navy-hairline">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Zoji" width={256} height={256} loading="lazy" className="w-10 h-10 rounded-xl" />
            <span className="font-zoji text-3xl text-white">Zoji</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <Link to="/terms" className="hover:text-white transition-colors">
              {s.terms}
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              {s.privacy}
            </Link>
            <a
              href="mailto:contato@zoji.app"
              className="hover:text-white transition-colors"
            >
              {s.contact}
            </a>
          </nav>

          {/* Store badges small */}
          <div className="flex gap-3">
            <a
              href="https://apps.apple.com/br/app/zoji/id6762674303"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              iOS
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=dev.de4araujo.zoji"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.22.99.14l12.47-7.18L13.01 13l-9.83 10.76zm-1.7-20.32C1.19 3.83 1 4.28 1 4.86v14.29c0 .58.19 1.03.48 1.41L14.02 12 1.48 3.44zM20.49 10.31l-2.76-1.59-3.65 3.28 3.65 3.27 2.79-1.6c.8-.46.8-1.83-.03-2.36zM4.17.1L16.64 7.28 13.01 10.9 4.17.1z" />
              </svg>
              Android
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Zoji. {s.madeIn}
          <br />
          {s.by}{' '}
          <a
            href="https://deAraujo.dev.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            deAraujo.dev.br
          </a>
        </div>
      </div>
    </footer>
  )
}
