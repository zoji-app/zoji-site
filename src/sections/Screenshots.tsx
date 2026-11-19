import { useLang, type Lang } from '../lib/lang'

type Screen = { src: string; width: number; height: number; label: string; description: string }

const screensByLang: Record<Lang, Screen[]> = {
  'pt-BR': [
    { src: '/screen-login.webp', width: 360, height: 779, label: 'Login', description: 'Entre com seu número de telefone. Sem senhas, sem e-mail.' },
    { src: '/screen-verification.webp', width: 360, height: 779, label: 'Verificação', description: 'Confirme com o código enviado por WhatsApp ou SMS.' },
    { src: '/screen-friends.webp', width: 360, height: 779, label: 'Amigos', description: 'Veja todos os seus contatos no Zoji em um só lugar.' },
    { src: '/screen-new-contact.webp', width: 360, height: 779, label: 'Novo Contato', description: 'Adicione amigos pelo número de telefone ou compartilhe seu QR Code.' },
    { src: '/screen-chat.webp', width: 360, height: 779, label: 'Chat', description: 'Conversas rápidas e expressivas, apenas com emojis.' },
    { src: '/screen-emoji-panel.webp', width: 360, height: 779, label: 'Painel de emojis', description: 'Selecione emojis de um painel completo, organizado por categorias, e mande sua mensagem em segundos.' },
    { src: '/screen-settings.webp', width: 360, height: 779, label: 'Configurações', description: 'Controle sua privacidade, idioma e notificações com facilidade.' },
    { src: '/screen-widget.webp', width: 360, height: 779, label: 'Widget', description: 'Acompanhe o status dos seus amigos direto na tela inicial do iPhone.' },
  ],
  en: [
    { src: '/screen-login.webp', width: 360, height: 779, label: 'Login', description: 'Sign in with your phone number. No passwords, no email.' },
    { src: '/screen-verification.webp', width: 360, height: 779, label: 'Verification', description: 'Confirm with the code sent via WhatsApp or SMS.' },
    { src: '/screen-friends.webp', width: 360, height: 779, label: 'Friends', description: "See all your Zoji contacts in one place." },
    { src: '/screen-new-contact.webp', width: 360, height: 779, label: 'New Contact', description: 'Add friends by phone number or share your QR Code.' },
    { src: '/screen-chat.webp', width: 360, height: 779, label: 'Chat', description: 'Quick, expressive conversations, using only emojis.' },
    { src: '/screen-emoji-panel.webp', width: 360, height: 779, label: 'Emoji panel', description: 'Pick emojis from a full panel, organized by category, and send your message in seconds.' },
    { src: '/screen-settings.webp', width: 360, height: 779, label: 'Settings', description: 'Easily control your privacy, language, and notifications.' },
    { src: '/screen-widget.webp', width: 360, height: 779, label: 'Widget', description: "Keep up with your friends' status right on your iPhone home screen." },
  ],
  es: [
    { src: '/screen-login.webp', width: 360, height: 779, label: 'Iniciar sesión', description: 'Entra con tu número de teléfono. Sin contraseñas, sin correo.' },
    { src: '/screen-verification.webp', width: 360, height: 779, label: 'Verificación', description: 'Confirma con el código enviado por WhatsApp o SMS.' },
    { src: '/screen-friends.webp', width: 360, height: 779, label: 'Amigos', description: 'Mira todos tus contactos en Zoji en un solo lugar.' },
    { src: '/screen-new-contact.webp', width: 360, height: 779, label: 'Nuevo Contacto', description: 'Agrega amigos por número de teléfono o comparte tu código QR.' },
    { src: '/screen-chat.webp', width: 360, height: 779, label: 'Chat', description: 'Conversaciones rápidas y expresivas, solo con emojis.' },
    { src: '/screen-emoji-panel.webp', width: 360, height: 779, label: 'Panel de emojis', description: 'Elige emojis de un panel completo, organizado por categorías, y envía tu mensaje en segundos.' },
    { src: '/screen-settings.webp', width: 360, height: 779, label: 'Ajustes', description: 'Controla tu privacidad, idioma y notificaciones con facilidad.' },
    { src: '/screen-widget.webp', width: 360, height: 779, label: 'Widget', description: 'Sigue el estado de tus amigos directo en la pantalla de inicio de tu iPhone.' },
  ],
}

const headings: Record<Lang, { title: string; subtitle: string }> = {
  'pt-BR': { title: 'Veja como funciona', subtitle: 'Uma interface limpa e intuitiva, pensada para comunicação em segundos.' },
  en: { title: 'See how it works', subtitle: 'A clean, intuitive interface, built for communication in seconds.' },
  es: { title: 'Mira cómo funciona', subtitle: 'Una interfaz limpia e intuitiva, pensada para comunicarte en segundos.' },
}

export default function Screenshots() {
  const { lang } = useLang()
  const screens = screensByLang[lang]
  const h = headings[lang]

  return (
    <section
      className="py-24 px-6"
      style={{ background: 'linear-gradient(180deg, #0A1330 0%, #0F1940 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-zoji text-5xl md:text-6xl text-navy-text mb-4">
            {h.title}
          </h2>
          <p className="text-navy-text-secondary text-lg max-w-lg mx-auto">
            {h.subtitle}
          </p>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <div className="flex gap-6 snap-x snap-mandatory w-max mx-auto py-10 px-6">
          {screens.map((s) => (
            <div
              key={s.label}
              className="flex-none snap-center flex flex-col items-center gap-4"
            >
              <div
                className="w-40 md:w-44 rounded-[44px] overflow-hidden"
                style={{
                  boxShadow:
                    '0 0 0 2px #1a1a1a, 0 0 0 6px #2a2a2a, 0 8px 24px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src={s.src}
                  alt={`Tela ${s.label} do Zoji`}
                  width={s.width}
                  height={s.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block"
                />
              </div>
              <div className="text-center max-w-[180px]">
                <p className="font-semibold text-navy-text text-sm">{s.label}</p>
                <p className="text-navy-text-secondary text-xs leading-relaxed mt-1">{s.description}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
