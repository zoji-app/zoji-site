import { useLang, type Lang } from '../lib/lang'

type Feature = { emoji: string; title: string; description: string }

const featuresByLang: Record<Lang, Feature[]> = {
  'pt-BR': [
    { emoji: '😂', title: 'Só emojis', description: 'Nada de texto longo. Expresse tudo que sente com os emojis que você já usa todo dia.' },
    { emoji: '📱', title: 'Via agenda', description: 'Encontre seus contatos automaticamente. Se eles têm o Zoji, você já pode mandar mensagem.' },
    { emoji: '🔒', title: 'Privacidade', description: 'Ative o modo de consentimento e só receba mensagens de quem você aprovar.' },
    { emoji: '⚡', title: 'Tempo real', description: 'Mensagens entregues instantaneamente via WebSocket. Notificações push no iOS e Android.' },
    { emoji: '📲', title: 'Widget de status', description: 'Veja o status dos seus amigos direto na tela inicial do iPhone ou Android, sem abrir o app.' },
    { emoji: '🌍', title: 'Multilíngue', description: 'Interface em Português, Inglês e Espanhol. Para você se comunicar com o mundo.' },
  ],
  en: [
    { emoji: '😂', title: 'Emojis only', description: 'No long texts. Express everything you feel with the emojis you already use every day.' },
    { emoji: '📱', title: 'Via contacts', description: 'Find your contacts automatically. If they have Zoji, you can already message them.' },
    { emoji: '🔒', title: 'Privacy', description: 'Turn on consent mode and only receive messages from people you approve.' },
    { emoji: '⚡', title: 'Real time', description: 'Messages delivered instantly via WebSocket. Push notifications on iOS and Android.' },
    { emoji: '📲', title: 'Status widget', description: 'See your friends’ status right on your iPhone or Android home screen, without opening the app.' },
    { emoji: '🌍', title: 'Multilingual', description: 'Interface in Portuguese, English and Spanish. So you can talk to the world.' },
  ],
  es: [
    { emoji: '😂', title: 'Solo emojis', description: 'Nada de textos largos. Expresa todo lo que sientes con los emojis que ya usas todos los días.' },
    { emoji: '📱', title: 'Vía contactos', description: 'Encuentra a tus contactos automáticamente. Si tienen Zoji, ya puedes enviarles mensajes.' },
    { emoji: '🔒', title: 'Privacidad', description: 'Activa el modo de consentimiento y recibe mensajes solo de quien tú apruebes.' },
    { emoji: '⚡', title: 'Tiempo real', description: 'Mensajes entregados al instante vía WebSocket. Notificaciones push en iOS y Android.' },
    { emoji: '📲', title: 'Widget de estado', description: 'Mira el estado de tus amigos directo en la pantalla de inicio de tu iPhone o Android, sin abrir la app.' },
    { emoji: '🌍', title: 'Multilingüe', description: 'Interfaz en portugués, inglés y español. Para que hables con el mundo.' },
  ],
}

const headings: Record<Lang, { title: string; subtitle: string }> = {
  'pt-BR': { title: 'Por que Zoji?', subtitle: 'Uma forma nova de se comunicar — mais rápida, mais divertida, mais humana.' },
  en: { title: 'Why Zoji?', subtitle: 'A new way to communicate — faster, more fun, more human.' },
  es: { title: '¿Por qué Zoji?', subtitle: 'Una forma nueva de comunicarte — más rápida, más divertida, más humana.' },
}

export default function Features() {
  const { lang } = useLang()
  const features = featuresByLang[lang]
  const h = headings[lang]

  return (
    <section className="py-24 px-6 bg-navy-page">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-4xl">✨</span>
          <h2 className="font-zoji text-5xl md:text-6xl text-navy-text mt-3 mb-4">
            {h.title}
          </h2>
          <p className="text-navy-text-secondary text-lg max-w-xl mx-auto">
            {h.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl p-7 border border-navy-hairline hover:border-primary-500/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-navy-card hover:bg-gradient-to-br hover:from-primary-500/10 hover:to-primary-700/5"
            >
              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="font-bold text-navy-text text-xl mb-2">{f.title}</h3>
              <p className="text-navy-text-secondary text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
