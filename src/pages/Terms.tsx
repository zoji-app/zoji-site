import { Link } from 'react-router-dom'
import { useLang, type Lang } from '../lib/lang'

const content: Record<
  Lang,
  {
    title: string
    updated: string
    back: string
    s1Title: string
    s1: string
    s2Title: string
    s2: string
    s2bTitle: string
    s2b: string
    s3Title: string
    s3p1: React.ReactNode
    s3p2: string
    s3Items: React.ReactNode[]
    s4Title: string
    s4: string
    s5Title: string
    s5Intro: string
    s5Items: string[]
    s6Title: string
    s6p1: React.ReactNode
    s6p2: React.ReactNode
    s7Title: string
    s7: string
    s8Title: string
    s8: string
    s9Title: string
    s9: string
    s10Title: string
    s10: string
    s11Title: string
    s11: React.ReactNode
  }
> = {
  'pt-BR': {
    title: 'Termos de Uso',
    updated: 'Última atualização: setembro de 2026',
    back: 'Voltar',
    s1Title: '1. Aceitação dos Termos',
    s1: 'Ao baixar, instalar ou utilizar o aplicativo Zoji, você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize o aplicativo.',
    s2Title: '2. Descrição do Serviço',
    s2: 'O Zoji é um aplicativo de mensagens que permite a comunicação entre usuários exclusivamente por meio de emojis. O serviço inclui troca de mensagens em tempo real, gerenciamento de contatos via agenda do dispositivo e notificações push.',
    s2bTitle: 'Contato automático de boas-vindas',
    s2b: 'A conta oficial "Zoji" pode aparecer nos seus contatos e iniciar uma conversa automaticamente logo após você criar sua conta, para ajudar você a começar a usar o app. As mensagens seguem um roteiro fixo com emojis, respeitam horário (8h–22h) e têm um limite de tentativas. Essa conta é identificada no aplicativo com um aviso indicando que se trata de um contato automatizado, não uma pessoa.',
    s3Title: '3. Elegibilidade e Faixa Etária',
    s3p1: (
      <>
        Você deve ter pelo menos <strong>12 anos de idade</strong> para usar o Zoji. Ao criar uma
        conta, você declara que atende a este requisito mínimo de idade.
      </>
    ),
    s3p2: 'Classificação nas lojas de aplicativos:',
    s3Items: [
      <><strong>App Store (Brasil):</strong> A12 — indicado para maiores de 12 anos;</>,
      <><strong>App Store (outros países):</strong> 4+;</>,
      <><strong>Google Play:</strong> Classificação Livre.</>,
    ],
    s4Title: '4. Cadastro e Conta',
    s4: 'O acesso ao Zoji é feito por número de telefone, verificado via código SMS ou WhatsApp. Você é responsável por manter a confidencialidade do seu acesso e por todas as atividades realizadas na sua conta.',
    s5Title: '5. Uso Aceitável',
    s5Intro: 'Você concorda em não utilizar o Zoji para:',
    s5Items: [
      'Enviar conteúdo abusivo, ofensivo ou que viole direitos de terceiros;',
      'Praticar assédio, bullying ou qualquer forma de violência;',
      'Violar leis ou regulamentos aplicáveis;',
      'Tentar acessar sistemas ou dados de outros usuários sem autorização.',
    ],
    s6Title: '6. Privacidade e Pesquisa de Contatos',
    s6p1: (
      <>
        O tratamento dos seus dados pessoais é regido pela nossa{' '}
        <Link to="/privacy" className="text-primary-500 underline hover:opacity-80">
          Política de Privacidade
        </Link>
        , que integra estes Termos de Uso.
      </>
    ),
    s6p2: (
      <>
        Para identificar quais contatos da sua agenda usam o Zoji, os números de telefone são
        convertidos localmente em códigos criptográficos (hash SHA-256). Os números reais
        <strong> nunca saem do seu dispositivo em texto puro</strong>, e nenhum dado de nome ou
        informação adicional da agenda é armazenado. Consulte a Política de Privacidade para mais
        detalhes.
      </>
    ),
    s7Title: '7. Propriedade Intelectual',
    s7: 'O Zoji, sua marca, logotipo e todo o conteúdo do aplicativo são de propriedade exclusiva dos seus desenvolvedores. É vedada a reprodução, distribuição ou modificação sem autorização prévia por escrito.',
    s8Title: '8. Limitação de Responsabilidade',
    s8: 'O Zoji é fornecido "como está", sem garantias de qualquer tipo. Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso ou incapacidade de uso do serviço, incluindo perda de dados ou interrupções.',
    s9Title: '9. Encerramento de Conta',
    s9: 'Você pode encerrar sua conta a qualquer momento nas configurações do aplicativo. Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos.',
    s10Title: '10. Alterações nos Termos',
    s10: 'Podemos atualizar estes Termos periodicamente. Notificaremos sobre mudanças relevantes pelo aplicativo. O uso continuado do Zoji após as alterações implica aceitação dos novos termos.',
    s11Title: '11. Contato',
    s11: (
      <>
        Dúvidas sobre estes Termos? Entre em contato:{' '}
        <a href="mailto:contato@zoji.app" className="text-primary-500 underline hover:opacity-80">
          contato@zoji.app
        </a>
      </>
    ),
  },
  en: {
    title: 'Terms of Use',
    updated: 'Last updated: September 2026',
    back: 'Back',
    s1Title: '1. Acceptance of Terms',
    s1: 'By downloading, installing, or using the Zoji app, you agree to these Terms of Use. If you do not agree with any part of these terms, do not use the app.',
    s2Title: '2. Description of the Service',
    s2: 'Zoji is a messaging app that lets users communicate exclusively through emojis. The service includes real-time messaging, contact management via the device’s address book, and push notifications.',
    s2bTitle: 'Automatic welcome contact',
    s2b: 'The official "Zoji" account may appear among your contacts and start a conversation automatically right after you create your account, to help you get started with the app. Its messages follow a fixed emoji script, respect quiet hours (8am–10pm), and are capped after a limited number of attempts. This account is identified in the app with a notice indicating it is an automated contact, not a person.',
    s3Title: '3. Eligibility and Age',
    s3p1: (
      <>
        You must be at least <strong>12 years old</strong> to use Zoji. By creating an account,
        you declare that you meet this minimum age requirement.
      </>
    ),
    s3p2: 'App store ratings:',
    s3Items: [
      <><strong>App Store (Brazil):</strong> A12 — recommended for ages 12+;</>,
      <><strong>App Store (other countries):</strong> 4+;</>,
      <><strong>Google Play:</strong> Rated for Everyone.</>,
    ],
    s4Title: '4. Registration and Account',
    s4: 'Access to Zoji is by phone number, verified via an SMS or WhatsApp code. You are responsible for keeping your access confidential and for all activity carried out on your account.',
    s5Title: '5. Acceptable Use',
    s5Intro: 'You agree not to use Zoji to:',
    s5Items: [
      'Send abusive, offensive content, or content that violates the rights of others;',
      'Engage in harassment, bullying, or any form of violence;',
      'Violate applicable laws or regulations;',
      'Attempt to access other users’ systems or data without authorization.',
    ],
    s6Title: '6. Privacy and Contact Discovery',
    s6p1: (
      <>
        The processing of your personal data is governed by our{' '}
        <Link to="/privacy" className="text-primary-500 underline hover:opacity-80">
          Privacy Policy
        </Link>
        , which is part of these Terms of Use.
      </>
    ),
    s6p2: (
      <>
        To identify which contacts in your address book use Zoji, phone numbers are converted
        locally into cryptographic codes (SHA-256 hash). Real numbers
        <strong> never leave your device in plain text</strong>, and no name or other address book
        data is stored. See the Privacy Policy for more details.
      </>
    ),
    s7Title: '7. Intellectual Property',
    s7: 'Zoji, its brand, logo, and all content within the app are the exclusive property of its developers. Reproduction, distribution, or modification without prior written authorization is prohibited.',
    s8Title: '8. Limitation of Liability',
    s8: 'Zoji is provided "as is", without warranties of any kind. We are not liable for direct or indirect damages arising from the use or inability to use the service, including data loss or interruptions.',
    s9Title: '9. Account Termination',
    s9: 'You may close your account at any time in the app’s settings. We reserve the right to suspend or terminate accounts that violate these Terms.',
    s10Title: '10. Changes to the Terms',
    s10: 'We may update these Terms periodically. We will notify you of material changes through the app. Continued use of Zoji after changes take effect implies acceptance of the new terms.',
    s11Title: '11. Contact',
    s11: (
      <>
        Questions about these Terms? Get in touch:{' '}
        <a href="mailto:contato@zoji.app" className="text-primary-500 underline hover:opacity-80">
          contato@zoji.app
        </a>
      </>
    ),
  },
  es: {
    title: 'Términos de Uso',
    updated: 'Última actualización: septiembre de 2026',
    back: 'Volver',
    s1Title: '1. Aceptación de los Términos',
    s1: 'Al descargar, instalar o usar la aplicación Zoji, aceptas estos Términos de Uso. Si no estás de acuerdo con alguna parte de estos términos, no uses la aplicación.',
    s2Title: '2. Descripción del Servicio',
    s2: 'Zoji es una aplicación de mensajería que permite la comunicación entre usuarios exclusivamente mediante emojis. El servicio incluye intercambio de mensajes en tiempo real, gestión de contactos a través de la agenda del dispositivo y notificaciones push.',
    s2bTitle: 'Contacto automático de bienvenida',
    s2b: 'La cuenta oficial "Zoji" puede aparecer entre tus contactos e iniciar una conversación automáticamente justo después de crear tu cuenta, para ayudarte a empezar a usar la app. Sus mensajes siguen un guion fijo con emojis, respetan un horario (8h–22h) y tienen un límite de intentos. Esta cuenta se identifica en la aplicación con un aviso que indica que se trata de un contacto automatizado, no una persona.',
    s3Title: '3. Elegibilidad y Edad Mínima',
    s3p1: (
      <>
        Debes tener al menos <strong>12 años de edad</strong> para usar Zoji. Al crear una cuenta,
        declaras que cumples con este requisito mínimo de edad.
      </>
    ),
    s3p2: 'Clasificación en las tiendas de aplicaciones:',
    s3Items: [
      <><strong>App Store (Brasil):</strong> A12 — recomendado para mayores de 12 años;</>,
      <><strong>App Store (otros países):</strong> 4+;</>,
      <><strong>Google Play:</strong> Clasificación para todo público.</>,
    ],
    s4Title: '4. Registro y Cuenta',
    s4: 'El acceso a Zoji se realiza mediante número de teléfono, verificado por código SMS o WhatsApp. Eres responsable de mantener la confidencialidad de tu acceso y de toda actividad realizada en tu cuenta.',
    s5Title: '5. Uso Aceptable',
    s5Intro: 'Aceptas no utilizar Zoji para:',
    s5Items: [
      'Enviar contenido abusivo, ofensivo o que viole derechos de terceros;',
      'Practicar acoso, bullying o cualquier forma de violencia;',
      'Violar leyes o normativas aplicables;',
      'Intentar acceder a sistemas o datos de otros usuarios sin autorización.',
    ],
    s6Title: '6. Privacidad y Búsqueda de Contactos',
    s6p1: (
      <>
        El tratamiento de tus datos personales se rige por nuestra{' '}
        <Link to="/privacy" className="text-primary-500 underline hover:opacity-80">
          Política de Privacidad
        </Link>
        , que forma parte de estos Términos de Uso.
      </>
    ),
    s6p2: (
      <>
        Para identificar qué contactos de tu agenda usan Zoji, los números de teléfono se
        convierten localmente en códigos criptográficos (hash SHA-256). Los números reales
        <strong> nunca salen de tu dispositivo en texto plano</strong>, y no se almacena ningún
        dato de nombre ni información adicional de la agenda. Consulta la Política de Privacidad
        para más detalles.
      </>
    ),
    s7Title: '7. Propiedad Intelectual',
    s7: 'Zoji, su marca, logotipo y todo el contenido de la aplicación son propiedad exclusiva de sus desarrolladores. Se prohíbe la reproducción, distribución o modificación sin autorización previa por escrito.',
    s8Title: '8. Limitación de Responsabilidad',
    s8: 'Zoji se proporciona "tal cual", sin garantías de ningún tipo. No nos hacemos responsables por daños directos o indirectos derivados del uso o la imposibilidad de uso del servicio, incluyendo pérdida de datos o interrupciones.',
    s9Title: '9. Cierre de Cuenta',
    s9: 'Puedes cerrar tu cuenta en cualquier momento desde la configuración de la aplicación. Nos reservamos el derecho de suspender o cerrar cuentas que infrinjan estos Términos.',
    s10Title: '10. Cambios en los Términos',
    s10: 'Podemos actualizar estos Términos periódicamente. Notificaremos los cambios relevantes a través de la aplicación. El uso continuado de Zoji tras las modificaciones implica la aceptación de los nuevos términos.',
    s11Title: '11. Contacto',
    s11: (
      <>
        ¿Dudas sobre estos Términos? Contáctanos:{' '}
        <a href="mailto:contato@zoji.app" className="text-primary-500 underline hover:opacity-80">
          contato@zoji.app
        </a>
      </>
    ),
  },
}

export default function Terms() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <div className="min-h-screen bg-navy-page">
      <title>{`${t.title} — Zoji`}</title>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-navy-card border-b border-navy-hairline px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-navy-text-secondary hover:text-navy-text transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.back}
          </Link>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Zoji" width={256} height={256} className="w-7 h-7" />
            <span className="font-zoji text-2xl text-navy-text">Zoji</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-navy-text mb-2">{t.title}</h1>
        <p className="text-sm text-navy-text-secondary mb-10">{t.updated}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-navy-text leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s1Title}</h2>
            <p>{t.s1}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s2Title}</h2>
            <p>{t.s2}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s2bTitle}</h2>
            <p>{t.s2b}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s3Title}</h2>
            <p>{t.s3p1}</p>
            <p className="mt-3">{t.s3p2}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {t.s3Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s4Title}</h2>
            <p>{t.s4}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s5Title}</h2>
            <p>{t.s5Intro}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {t.s5Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s6Title}</h2>
            <p>{t.s6p1}</p>
            <p className="mt-3">{t.s6p2}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s7Title}</h2>
            <p>{t.s7}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s8Title}</h2>
            <p>{t.s8}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s9Title}</h2>
            <p>{t.s9}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s10Title}</h2>
            <p>{t.s10}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s11Title}</h2>
            <p>{t.s11}</p>
          </section>

        </div>
      </main>
    </div>
  )
}
