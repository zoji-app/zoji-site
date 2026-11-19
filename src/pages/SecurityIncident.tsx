import { Link } from 'react-router-dom'
import { useLang, type Lang } from '../lib/lang'

const content: Record<
  Lang,
  {
    title: string
    publishedLabel: string
    back: string
    intro: string
    s1Title: string
    s1p1: React.ReactNode
    s1p2: string
    s2Title: string
    s2Intro: string
    s2Items: string[]
    s2p1: string
    s2p2: React.ReactNode
    s3Title: string
    s3Intro: string
    s3Items: string[]
    s4Title: string
    s4Intro: string
    s4Items: string[]
    s5Title: string
    s5p1: React.ReactNode
    s5p2: React.ReactNode
    privacyLinkLabel: string
  }
> = {
  'pt-BR': {
    title: 'Aviso de Segurança',
    publishedLabel: 'Publicado em: 15 de setembro de 2026',
    back: 'Voltar',
    intro:
      'Estamos entrando em contato para avisar sobre um incidente de segurança que identificamos e já corrigimos no Zoji. Não é necessário nenhuma ação urgente da sua parte, mas recomendamos ler este aviso até o fim.',
    s1Title: 'O que aconteceu',
    s1p1: (
      <>
        No dia <strong>2 de setembro de 2026</strong>, durante uma auditoria de segurança feita
        por iniciativa própria, identificamos uma falha de configuração no servidor que hospeda o
        Zoji. Por um período de tempo que não conseguimos determinar com precisão (pelo menos
        desde 19 de agosto de 2026), alguns arquivos internos do sistema — que normalmente não
        ficam acessíveis pela internet — puderam ser acessados por terceiros.
      </>
    ),
    s1p2: 'Assim que identificamos o problema, bloqueamos o acesso a esses arquivos e trocamos todas as credenciais e chaves de segurança do sistema, no mesmo dia.',
    s2Title: 'Quais dados podem ter sido afetados',
    s2Intro: 'Entre os arquivos expostos estavam chaves internas do sistema que, na prática, poderiam ter permitido a alguém:',
    s2Items: [
      'Acessar o número de telefone associado a contas do Zoji;',
      'Em tese, acessar o conteúdo de mensagens ainda não entregues no momento de um eventual acesso indevido.',
    ],
    s2p1: 'Não temos evidência de que esses dados tenham sido efetivamente acessados ou usados por alguém — o problema foi encontrado por nós mesmos, de forma preventiva, e não a partir de uma denúncia ou de um ataque identificado.',
    s2p2: (
      <>
        Um ponto importante sobre as mensagens: o Zoji guarda o conteúdo de uma mensagem no
        servidor apenas até ela ser entregue (no caso de mensagens diretas, até 30 dias se o
        destinatário não abrir o app antes disso). Depois disso, a mensagem existe somente nos
        aparelhos de quem participou da conversa. Ou seja, o histórico completo das suas
        conversas nunca esteve exposto — no máximo, mensagens que estivessem pendentes de
        entrega num momento específico.
      </>
    ),
    s3Title: 'Riscos e o que fazer',
    s3Intro:
      'O principal risco prático é receber contatos indesejados (SMS, WhatsApp ou ligações) de golpistas que tenham obtido seu número por essa via, se passando por bancos, empresas conhecidas ou até por conhecidos seus. Recomendamos:',
    s3Items: [
      'Desconfiar de mensagens ou ligações não solicitadas pedindo dados pessoais, senhas ou códigos de verificação — nem o Zoji, nem bancos legítimos pedem isso por telefone ou mensagem;',
      'Nunca compartilhar códigos de verificação (SMS/WhatsApp) recebidos, mesmo que a pessoa do outro lado pareça conhecida ou confiável;',
      'Se receber algo suspeito citando o Zoji, nos avisar pelo contato abaixo.',
    ],
    s4Title: 'O que já fizemos',
    s4Intro: 'Desde a identificação do problema, em 02/09/2026, adotamos uma série de medidas, entre elas:',
    s4Items: [
      'Bloqueio imediato do acesso público aos arquivos internos afetados;',
      'Troca de todas as credenciais e chaves de segurança do sistema;',
      'Reforço do firewall e das defesas do servidor contra acessos automatizados;',
      'Implementação de backups automáticos do banco de dados, com monitoramento contínuo;',
      'Reforço da autenticação do painel administrativo, incluindo verificação em duas etapas;',
      'Comunicação formal do incidente à Autoridade Nacional de Proteção de Dados (ANPD), conforme exige a LGPD.',
    ],
    s5Title: 'Dúvidas?',
    s5p1: (
      <>
        Se tiver qualquer dúvida sobre este aviso, fale diretamente com a
        equipe do Zoji pelo canal de privacidade:{' '}
        <a href="mailto:contato@zoji.app" className="text-primary-500 underline hover:opacity-80">
          contato@zoji.app
        </a>
      </>
    ),
    s5p2: <>Para saber mais sobre como tratamos seus dados em geral, consulte nossa{' '}</>,
    privacyLinkLabel: 'Política de Privacidade',
  },
  en: {
    title: 'Security Notice',
    publishedLabel: 'Published: September 15, 2026',
    back: 'Back',
    intro:
      "We're reaching out to let you know about a security incident we identified and have already fixed in Zoji. No urgent action is required on your part, but we recommend reading this notice in full.",
    s1Title: 'What happened',
    s1p1: (
      <>
        On <strong>September 2, 2026</strong>, during a security audit we carried out on our own
        initiative, we identified a server misconfiguration affecting the infrastructure that
        hosts Zoji. For a period of time we cannot determine with precision (at least since
        August 19, 2026), some internal system files — which are normally not accessible from the
        internet — could be accessed by third parties.
      </>
    ),
    s1p2: 'As soon as we identified the problem, we blocked access to those files and rotated all system credentials and security keys, on the same day.',
    s2Title: 'What data may have been affected',
    s2Intro: 'Among the exposed files were internal system keys that, in practice, could have allowed someone to:',
    s2Items: [
      "Access the phone number associated with Zoji accounts;",
      'In theory, access the content of messages not yet delivered at the moment of a potential unauthorized access.',
    ],
    s2p1: "We have no evidence that this data was actually accessed or used by anyone — the issue was found by us, proactively, and not as a result of a report or an identified attack.",
    s2p2: (
      <>
        One important point about messages: Zoji only keeps a message's content on the server
        until it is delivered (for direct messages, up to 30 days if the recipient doesn't open
        the app before then). After that, the message exists only on the devices of the people
        who took part in the conversation. In other words, your full conversation history was
        never exposed — at most, messages that happened to be pending delivery at a specific
        moment.
      </>
    ),
    s3Title: 'Risks and what to do',
    s3Intro:
      'The main practical risk is receiving unwanted contact (SMS, WhatsApp, or calls) from scammers who obtained your number this way, posing as banks, known companies, or even people you know. We recommend:',
    s3Items: [
      "Being wary of unsolicited messages or calls asking for personal data, passwords, or verification codes — neither Zoji nor legitimate banks ask for this by phone or message;",
      'Never sharing verification codes (SMS/WhatsApp) you receive, even if the person on the other end seems familiar or trustworthy;',
      'Letting us know via the contact below if you receive anything suspicious mentioning Zoji.',
    ],
    s4Title: 'What we have already done',
    s4Intro: 'Since identifying the issue on 09/02/2026, we have taken a number of measures, including:',
    s4Items: [
      'Immediately blocking public access to the affected internal files;',
      "Rotating all of the system's credentials and security keys;",
      "Strengthening the server's firewall and defenses against automated access;",
      'Implementing automated database backups with continuous monitoring;',
      'Strengthening authentication on the admin panel, including two-factor verification;',
      "Formally reporting the incident to Brazil's National Data Protection Authority (ANPD), as required by the LGPD.",
    ],
    s5Title: 'Questions?',
    s5p1: (
      <>
        If you have any questions about this notice, please contact the Zoji team
        directly through our privacy channel:{' '}
        <a href="mailto:contato@zoji.app" className="text-primary-500 underline hover:opacity-80">
          contato@zoji.app
        </a>
      </>
    ),
    s5p2: <>To learn more about how we handle your data in general, see our{' '}</>,
    privacyLinkLabel: 'Privacy Policy',
  },
  es: {
    title: 'Aviso de Seguridad',
    publishedLabel: 'Publicado el: 15 de septiembre de 2026',
    back: 'Volver',
    intro:
      'Te escribimos para avisarte sobre un incidente de seguridad que identificamos y ya corregimos en Zoji. No es necesario que tomes ninguna acción urgente, pero te recomendamos leer este aviso hasta el final.',
    s1Title: 'Qué pasó',
    s1p1: (
      <>
        El <strong>2 de septiembre de 2026</strong>, durante una auditoría de seguridad realizada
        por iniciativa propia, identificamos un error de configuración en el servidor que aloja
        Zoji. Durante un período de tiempo que no podemos determinar con precisión (al menos
        desde el 19 de agosto de 2026), algunos archivos internos del sistema —que normalmente no
        son accesibles desde internet— pudieron ser accedidos por terceros.
      </>
    ),
    s1p2: 'En cuanto identificamos el problema, bloqueamos el acceso a esos archivos y cambiamos todas las credenciales y claves de seguridad del sistema, ese mismo día.',
    s2Title: 'Qué datos pueden haberse visto afectados',
    s2Intro: 'Entre los archivos expuestos había claves internas del sistema que, en la práctica, podrían haber permitido a alguien:',
    s2Items: [
      'Acceder al número de teléfono asociado a cuentas de Zoji;',
      'En teoría, acceder al contenido de mensajes aún no entregados en el momento de un eventual acceso indebido.',
    ],
    s2p1: 'No tenemos evidencia de que estos datos hayan sido efectivamente accedidos o usados por alguien: el problema lo encontramos nosotros mismos, de forma preventiva, y no a partir de una denuncia o un ataque identificado.',
    s2p2: (
      <>
        Un punto importante sobre los mensajes: Zoji guarda el contenido de un mensaje en el
        servidor solo hasta que se entrega (en el caso de mensajes directos, hasta 30 días si el
        destinatario no abre la app antes de eso). Después de eso, el mensaje existe únicamente
        en los dispositivos de quienes participaron en la conversación. Es decir, el historial
        completo de tus conversaciones nunca estuvo expuesto — como mucho, mensajes que
        estuvieran pendientes de entrega en un momento específico.
      </>
    ),
    s3Title: 'Riesgos y qué hacer',
    s3Intro:
      'El principal riesgo práctico es recibir contactos no deseados (SMS, WhatsApp o llamadas) de estafadores que hayan obtenido tu número por esta vía, haciéndose pasar por bancos, empresas conocidas o incluso conocidos tuyos. Recomendamos:',
    s3Items: [
      'Desconfiar de mensajes o llamadas no solicitadas que pidan datos personales, contraseñas o códigos de verificación — ni Zoji ni los bancos legítimos piden esto por teléfono o mensaje;',
      'Nunca compartir códigos de verificación (SMS/WhatsApp) que recibas, aunque la persona del otro lado parezca conocida o confiable;',
      'Avisarnos por el contacto de abajo si recibes algo sospechoso que mencione a Zoji.',
    ],
    s4Title: 'Qué hicimos ya',
    s4Intro: 'Desde la identificación del problema, el 02/09/2026, adoptamos una serie de medidas, entre ellas:',
    s4Items: [
      'Bloqueo inmediato del acceso público a los archivos internos afectados;',
      'Cambio de todas las credenciales y claves de seguridad del sistema;',
      'Refuerzo del firewall y las defensas del servidor contra accesos automatizados;',
      'Implementación de copias de seguridad automáticas de la base de datos, con monitoreo continuo;',
      'Refuerzo de la autenticación del panel administrativo, incluyendo verificación en dos pasos;',
      'Comunicación formal del incidente a la Autoridad Nacional de Protección de Datos de Brasil (ANPD), según exige la LGPD.',
    ],
    s5Title: '¿Dudas?',
    s5p1: (
      <>
        Si tienes alguna duda sobre este aviso, contacta directamente al equipo
        de Zoji por nuestro canal de privacidad:{' '}
        <a href="mailto:contato@zoji.app" className="text-primary-500 underline hover:opacity-80">
          contato@zoji.app
        </a>
      </>
    ),
    s5p2: <>Para saber más sobre cómo tratamos tus datos en general, consulta nuestra{' '}</>,
    privacyLinkLabel: 'Política de Privacidad',
  },
}

export default function SecurityIncident() {
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
        <p className="text-sm text-navy-text-secondary mb-10">{t.publishedLabel}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-navy-text leading-relaxed">

          <section className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-5">
            <p className="text-amber-200">{t.intro}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s1Title}</h2>
            <p>{t.s1p1}</p>
            <p className="mt-3">{t.s1p2}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s2Title}</h2>
            <p>{t.s2Intro}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {t.s2Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{t.s2p1}</p>
            <p className="mt-3">{t.s2p2}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s3Title}</h2>
            <p>{t.s3Intro}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {t.s3Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s4Title}</h2>
            <p>{t.s4Intro}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {t.s4Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s5Title}</h2>
            <p>{t.s5p1}</p>
            <p className="mt-3">
              {t.s5p2}
              <Link to="/privacy" className="text-primary-500 underline hover:opacity-80">
                {t.privacyLinkLabel}
              </Link>
              .
            </p>
          </section>

        </div>
      </main>
    </div>
  )
}
