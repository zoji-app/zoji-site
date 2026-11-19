import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Hero from './sections/Hero'
import Features from './sections/Features'
import Screenshots from './sections/Screenshots'
import Download from './sections/Download'
import Footer from './sections/Footer'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import SecurityIncident from './pages/SecurityIncident'
import Stats from './pages/Stats'
import Status from './pages/Status'
import AddContact from './pages/AddContact'
import OAuthAuthorize from './pages/OAuthAuthorize'
import { registerWebMcpTools } from './webmcp'
import { LanguageProvider } from './lib/i18n'
import { useLang, type Lang } from './lib/lang'
import LanguageSwitcher from './components/LanguageSwitcher'
import { trackPageview } from './lib/gtag'
import './index.css'

const homeTitle: Record<Lang, string> = {
  'pt-BR': 'Zoji — Fale com emojis',
  en: 'Zoji — Chat with emojis',
  es: 'Zoji — Habla con emojis',
}

function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageview(location.pathname + location.search)
  }, [location.pathname, location.search])

  return null
}

// React Router não reseta o scroll ao trocar de rota (só acontece sozinho em
// navegação tradicional com reload de página) — sem isso, uma página aberta
// rolada até o fim carregava a próxima também rolada até o fim.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function Home() {
  const { lang } = useLang()

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <title>{homeTitle[lang]}</title>
      <main>
        <Hero />
        <Features />
        <Screenshots />
        <Download />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  useEffect(() => {
    registerWebMcpTools()
  }, [])

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnalyticsTracker />
        <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
          <LanguageSwitcher />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/aviso-seguranca" element={<SecurityIncident />} />
          <Route path="/estatisticas" element={<Stats />} />
          <Route path="/status" element={<Status />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/oauth/authorize" element={<OAuthAuthorize />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
