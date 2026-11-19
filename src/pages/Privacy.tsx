import { Link } from 'react-router-dom'
import { useLang, type Lang } from '../lib/lang'

type RetentionRow = { data: string; period: string }

const content: Record<
  Lang,
  {
    title: string
    updated: string
    back: string
    s1Title: string
    s1: string
    s2Title: string
    s2Intro: string
    s2Items: React.ReactNode[]
    s3Title: string
    s3p1: React.ReactNode
    s3p2: React.ReactNode
    s4Title: string
    s4Intro: string
    s4Items: string[]
    s4p1: string
    botTitle: string
    botP1: string
    s5Title: string
    s5: string
    aiTitle: string
    aiP1: string
    aiP2: React.ReactNode
    aiP3: React.ReactNode
    s6Title: string
    s6Intro: string
    retentionHeaderData: string
    retentionHeaderPeriod: string
    retentionRows: RetentionRow[]
    s7Title: string
    s7Intro: string
    s7Items: string[]
    s7p1: React.ReactNode
    s8Title: string
    s8: string
    s9Title: string
    s9Intro: string
    s9Items: string[]
    s9p1: string
    s10Title: string
    s10: string
    s11Title: string
    s11: string
    s12Title: string
    s12: React.ReactNode
  }
> = {
  'pt-BR': {
    title: 'Política de Privacidade',
    updated: 'Última atualização: novembro de 2026',
    back: 'Voltar',
    s1Title: '1. Introdução',
    s1: 'O Zoji respeita a sua privacidade. Esta Política descreve quais dados coletamos, como os utilizamos e como os protegemos, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).',
    s2Title: '2. Dados Coletados',
    s2Intro: 'Coletamos apenas o mínimo necessário para o funcionamento do serviço:',
    s2Items: [
      <><strong>Número de telefone</strong> — para autenticação via SMS/WhatsApp;</>,
      <><strong>Nickname e emoji de perfil</strong> — escolhidos por você;</>,
      <><strong>Contatos da agenda</strong> — processados localmente conforme descrito na seção 3;</>,
      <><strong>Mensagens (emojis)</strong> — armazenadas para entrega e histórico;</>,
      <><strong>Token de push</strong> — para envio de notificações.</>,
    ],
    s3Title: '3. Pesquisa de Contatos',
    s3p1: (
      <>
        Para descobrir quais contatos da sua agenda usam o Zoji, os números de telefone são
        convertidos <strong>localmente no seu dispositivo</strong> em códigos criptográficos (hash
        SHA-256). Apenas esses códigos anônimos são enviados ao servidor — os números reais{' '}
        <strong>nunca saem do seu dispositivo em texto puro</strong>.
      </>
    ),
    s3p2: (
      <>
        Após a verificação, os códigos são descartados e não ficam armazenados. O Zoji{' '}
        <strong>não armazena, não lê e não compartilha</strong> nomes, fotos ou quaisquer outros
        dados da sua agenda. Nomes e demais informações dos seus contatos permanecem
        exclusivamente no seu dispositivo.
      </>
    ),
    s4Title: '4. Uso dos Dados',
    s4Intro: 'Seus dados são utilizados exclusivamente para:',
    s4Items: [
      'Autenticar sua identidade e manter sua sessão;',
      'Entregar mensagens em tempo real;',
      'Identificar contatos da sua agenda que também usam o Zoji (ver seção 3);',
      'Enviar notificações push sobre novas mensagens.',
    ],
    s4p1: 'Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins comerciais.',
    botTitle: 'Contato automático de boas-vindas',
    botP1: 'Ao criar sua conta, você pode receber uma mensagem inicial da conta oficial "Zoji", enviada automaticamente para ajudar você a começar a usar o app. Esse processo usa seus dados de perfil (apelido, emoji) e o estado da conversa (quais mensagens já foram enviadas, quantas tentativas) para decidir a próxima ação — dados mantidos enquanto sua conta estiver ativa e apagados junto com ela. A conta é identificada no aplicativo com um aviso indicando que se trata de um contato automatizado, não uma pessoa.',
    s5Title: '5. Compartilhamento de Dados',
    s5: 'Seus dados podem ser compartilhados apenas com prestadores de serviço essenciais (como Infobip, para envio de SMS e WhatsApp) e quando exigido por lei ou ordem judicial.',
    aiTitle: 'Agentes de IA conectados',
    aiP1: 'O Zoji permite, de forma opcional, conectar um assistente de inteligência artificial de terceiros (por exemplo, Claude, ChatGPT ou Alexa) à sua conta. A conexão só acontece por sua iniciativa e autorização explícita, e você escolhe quais permissões concede — como ler contatos, ler ou enviar mensagens, ou definir seu status.',
    aiP2: (
      <>
        Enquanto um agente estiver conectado, os dados dentro das permissões concedidas são
        compartilhados com o provedor desse assistente, que os trata conforme a própria política
        de privacidade e infraestrutura — que <strong>podem estar fora do Brasil</strong>. O Zoji
        não controla o que esse provedor faz com os dados; recomendamos ler a política dele antes
        de conectar. Os números de telefone dos seus contatos{' '}
        <strong>não são enviados</strong> aos agentes (apenas apelidos e identificadores
        anônimos).
      </>
    ),
    aiP3: (
      <>
        Para essa finalidade, o Zoji emite um <strong>token de acesso restrito e revogável</strong>,
        específico para o agente — nunca a credencial da sua sessão no aplicativo. Você pode ver
        os agentes conectados, reduzir as permissões ou revogar o acesso a qualquer momento em{' '}
        <em>Configurações → Agentes conectados</em>; a revogação tem efeito imediato.
      </>
    ),
    s6Title: '6. Retenção de Dados',
    s6Intro: 'O histórico completo das conversas fica salvo somente no seu dispositivo, sob seu controle. No servidor, guardamos cada dado pelo menor tempo possível:',
    retentionHeaderData: 'Dado',
    retentionHeaderPeriod: 'Período de retenção',
    retentionRows: [
      { data: 'Mensagens diretas (1 a 1) entregues', period: 'Excluídas automaticamente assim que o destinatário lê' },
      { data: 'Mensagens diretas (1 a 1) ainda não lidas', period: 'Até a entrega, o cancelamento pelo remetente, ou no máximo 30 dias — o que ocorrer primeiro' },
      { data: 'Mensagens em grupo', period: 'Até 90 dias (servem de histórico do grupo), mesmo após lidas por todos os membros; excluídas antes se o remetente apagar a mensagem ou o grupo for excluído' },
      { data: 'Códigos de verificação (OTP) e IP da solicitação', period: 'Até 7 dias' },
      { data: 'Registros de envio de SMS/WhatsApp (número de destino e status)', period: 'Até 90 dias' },
      { data: 'Registros técnicos de acesso ao servidor (sem conteúdo de mensagens)', period: 'Até 90 dias' },
      { data: 'Registros de denúncias', period: 'Até 90 dias após o registro' },
      { data: 'Tokens de agentes de IA revogados ou expirados', period: 'Até 30 dias' },
      { data: 'Cópias de segurança criptografadas do banco de dados', period: 'Até 30 dias' },
      { data: 'Estatísticas agregadas de uso (contagens diárias, sem conteúdo nem identificação individual)', period: 'Prazo indeterminado' },
      { data: 'Conta (número, apelido, emoji)', period: 'Enquanto a conta estiver ativa' },
      { data: 'Dados pessoais após exclusão da conta', period: 'Apagados imediatamente dos servidores; cópias de segurança que ainda os contenham expiram nos prazos acima; histórico de conversas preservado para os outros participantes sem qualquer identificação' },
    ],
    s7Title: '7. Seus Direitos (LGPD)',
    s7Intro: 'Você tem direito a:',
    s7Items: [
      'Acessar os dados que temos sobre você;',
      'Corrigir dados incompletos ou desatualizados;',
      'Solicitar a exclusão dos seus dados;',
      'Revogar o consentimento para tratamento de dados a qualquer momento.',
    ],
    s7p1: 'Para exercer esses direitos, entre em contato:',
    s8Title: '8. Segurança',
    s8: 'Adotamos medidas técnicas para proteger seus dados, incluindo comunicação criptografada (HTTPS/TLS) e armazenamento seguro de tokens de autenticação. Nenhum sistema é 100% seguro, mas nos comprometemos a notificá-lo em caso de incidente relevante.',
    s9Title: '9. Faixa Etária e Classificação',
    s9Intro: 'O Zoji é classificado da seguinte forma nas lojas de aplicativos:',
    s9Items: [
      'App Store (Brasil): A12 — indicado para maiores de 12 anos;',
      'App Store (outros países): 4+;',
      'Google Play: Classificação Livre.',
    ],
    s9p1: 'O aplicativo não é destinado a menores de 12 anos. Se tomarmos conhecimento de que um menor forneceu dados sem consentimento parental, removeremos tais dados prontamente.',
    s10Title: '10. Cookies e Rastreamento',
    s10: 'O Zoji não utiliza cookies de rastreamento nem tecnologias de análise comportamental de terceiros.',
    s11Title: '11. Alterações nesta Política',
    s11: 'Podemos atualizar esta Política periodicamente. Notificaremos você pelo aplicativo sobre mudanças relevantes. O uso continuado implica aceitação da versão vigente.',
    s12Title: '12. Contato',
    s12: (
      <>
        O controlador dos dados é a <strong>De Araujo Desenvolvimento LTDA</strong> (CNPJ
        51.296.106/0001-15), Porto Alegre/RS. Dúvidas sobre privacidade ou solicitações sobre seus
        dados? Entre em contato:{' '}
        <a href="mailto:contato@zoji.app" className="text-primary-500 underline hover:opacity-80">
          contato@zoji.app
        </a>
      </>
    ),
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: November 2026',
    back: 'Back',
    s1Title: '1. Introduction',
    s1: 'Zoji respects your privacy. This Policy describes what data we collect, how we use it, and how we protect it, in accordance with Brazil’s General Data Protection Law (LGPD — Law No. 13,709/2018).',
    s2Title: '2. Data We Collect',
    s2Intro: 'We collect only the minimum necessary for the service to work:',
    s2Items: [
      <><strong>Phone number</strong> — for authentication via SMS/WhatsApp;</>,
      <><strong>Nickname and profile emoji</strong> — chosen by you;</>,
      <><strong>Address book contacts</strong> — processed locally as described in section 3;</>,
      <><strong>Messages (emojis)</strong> — stored for delivery and history;</>,
      <><strong>Push token</strong> — for sending notifications.</>,
    ],
    s3Title: '3. Contact Discovery',
    s3p1: (
      <>
        To find out which contacts in your address book use Zoji, phone numbers are converted{' '}
        <strong>locally on your device</strong> into cryptographic codes (SHA-256 hash). Only these
        anonymous codes are sent to the server — real numbers{' '}
        <strong>never leave your device in plain text</strong>.
      </>
    ),
    s3p2: (
      <>
        After verification, the codes are discarded and not stored. Zoji{' '}
        <strong>does not store, read, or share</strong> names, photos, or any other data from your
        address book. Names and other information about your contacts stay exclusively on your
        device.
      </>
    ),
    s4Title: '4. How We Use Data',
    s4Intro: 'Your data is used exclusively to:',
    s4Items: [
      'Authenticate your identity and maintain your session;',
      'Deliver messages in real time;',
      'Identify contacts in your address book who also use Zoji (see section 3);',
      'Send push notifications about new messages.',
    ],
    s4p1: 'We do not sell, rent, or share your data with third parties for commercial purposes.',
    botTitle: 'Automatic welcome contact',
    botP1: 'When you create your account, you may receive an initial message from the official "Zoji" account, sent automatically to help you get started with the app. This process uses your profile data (nickname, emoji) and conversation state (which messages have been sent, how many attempts) to decide the next action — data kept while your account is active and deleted along with it. This account is identified in the app with a notice indicating it is an automated contact, not a person.',
    s5Title: '5. Data Sharing',
    s5: 'Your data may only be shared with essential service providers (such as Infobip, for sending SMS and WhatsApp messages) and when required by law or court order.',
    aiTitle: 'Connected AI Agents',
    aiP1: 'Zoji optionally lets you connect a third-party AI assistant (for example, Claude, ChatGPT, or Alexa) to your account. The connection only happens on your initiative and with your explicit authorization, and you choose which permissions to grant — such as reading contacts, reading or sending messages, or setting your status.',
    aiP2: (
      <>
        While an agent is connected, data within the granted permissions is shared with that
        assistant’s provider, which processes it under its own privacy policy and
        infrastructure — which <strong>may be located outside Brazil</strong>. Zoji does not
        control what that provider does with the data; we recommend reading its policy before
        connecting. Your contacts’ phone numbers{' '}
        <strong>are not sent</strong> to agents (only nicknames and anonymous identifiers).
      </>
    ),
    aiP3: (
      <>
        For this purpose, Zoji issues a <strong>restricted, revocable access token</strong>,
        specific to the agent — never your app session credential. You can view connected agents,
        reduce their permissions, or revoke access at any time in{' '}
        <em>Settings → Connected agents</em>; revocation takes effect immediately.
      </>
    ),
    s6Title: '6. Data Retention',
    s6Intro: 'Your full conversation history is saved only on your device, under your control. On the server, we keep each piece of data for the shortest time possible:',
    retentionHeaderData: 'Data',
    retentionHeaderPeriod: 'Retention period',
    retentionRows: [
      { data: 'Delivered direct (1-to-1) messages', period: 'Automatically deleted as soon as the recipient reads it' },
      { data: 'Unread direct (1-to-1) messages', period: 'Until delivered, canceled by the sender, or a maximum of 30 days — whichever comes first' },
      { data: 'Group messages', period: 'Up to 90 days (serving as the group’s history), even after being read by all members; deleted earlier if the sender deletes the message or the group is deleted' },
      { data: 'Verification codes (OTP) and request IP', period: 'Up to 7 days' },
      { data: 'SMS/WhatsApp send logs (destination number and status)', period: 'Up to 90 days' },
      { data: 'Technical server access logs (no message content)', period: 'Up to 90 days' },
      { data: 'Report records', period: 'Up to 90 days after the report' },
      { data: 'Revoked or expired AI agent tokens', period: 'Up to 30 days' },
      { data: 'Encrypted database backups', period: 'Up to 30 days' },
      { data: 'Aggregated usage statistics (daily counts, no content or individual identification)', period: 'Indefinite' },
      { data: 'Account (number, nickname, emoji)', period: 'While the account is active' },
      { data: 'Personal data after account deletion', period: 'Immediately deleted from servers; backups that still contain it expire per the periods above; conversation history preserved for other participants without any identification' },
    ],
    s7Title: '7. Your Rights (LGPD)',
    s7Intro: 'You have the right to:',
    s7Items: [
      'Access the data we hold about you;',
      'Correct incomplete or outdated data;',
      'Request deletion of your data;',
      'Withdraw consent for data processing at any time.',
    ],
    s7p1: 'To exercise these rights, get in touch:',
    s8Title: '8. Security',
    s8: 'We adopt technical measures to protect your data, including encrypted communication (HTTPS/TLS) and secure storage of authentication tokens. No system is 100% secure, but we commit to notifying you in the event of a relevant incident.',
    s9Title: '9. Age Range and Rating',
    s9Intro: 'Zoji is rated as follows on the app stores:',
    s9Items: [
      'App Store (Brazil): A12 — recommended for ages 12+;',
      'App Store (other countries): 4+;',
      'Google Play: Rated for Everyone.',
    ],
    s9p1: 'The app is not intended for children under 12. If we become aware that a minor provided data without parental consent, we will promptly remove that data.',
    s10Title: '10. Cookies and Tracking',
    s10: 'Zoji does not use tracking cookies or third-party behavioral analytics technologies.',
    s11Title: '11. Changes to This Policy',
    s11: 'We may update this Policy periodically. We will notify you through the app about material changes. Continued use implies acceptance of the current version.',
    s12Title: '12. Contact',
    s12: (
      <>
        The data controller is <strong>De Araujo Desenvolvimento LTDA</strong> (Brazilian CNPJ
        51.296.106/0001-15), Porto Alegre, Brazil. Questions about privacy or requests about your
        data? Get in touch:{' '}
        <a href="mailto:contato@zoji.app" className="text-primary-500 underline hover:opacity-80">
          contato@zoji.app
        </a>
      </>
    ),
  },
  es: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: noviembre de 2026',
    back: 'Volver',
    s1Title: '1. Introducción',
    s1: 'Zoji respeta tu privacidad. Esta Política describe qué datos recopilamos, cómo los usamos y cómo los protegemos, en conformidad con la Ley General de Protección de Datos de Brasil (LGPD — Ley n.º 13.709/2018).',
    s2Title: '2. Datos Recopilados',
    s2Intro: 'Recopilamos solo lo mínimo necesario para el funcionamiento del servicio:',
    s2Items: [
      <><strong>Número de teléfono</strong> — para autenticación vía SMS/WhatsApp;</>,
      <><strong>Apodo y emoji de perfil</strong> — elegidos por ti;</>,
      <><strong>Contactos de la agenda</strong> — procesados localmente según se describe en la sección 3;</>,
      <><strong>Mensajes (emojis)</strong> — almacenados para entrega e historial;</>,
      <><strong>Token de push</strong> — para el envío de notificaciones.</>,
    ],
    s3Title: '3. Búsqueda de Contactos',
    s3p1: (
      <>
        Para identificar qué contactos de tu agenda usan Zoji, los números de teléfono se
        convierten <strong>localmente en tu dispositivo</strong> en códigos criptográficos (hash
        SHA-256). Solo esos códigos anónimos se envían al servidor — los números reales{' '}
        <strong>nunca salen de tu dispositivo en texto plano</strong>.
      </>
    ),
    s3p2: (
      <>
        Después de la verificación, los códigos se descartan y no se almacenan. Zoji{' '}
        <strong>no almacena, no lee ni comparte</strong> nombres, fotos ni ningún otro dato de tu
        agenda. Los nombres y demás información de tus contactos permanecen exclusivamente en tu
        dispositivo.
      </>
    ),
    s4Title: '4. Uso de los Datos',
    s4Intro: 'Tus datos se utilizan exclusivamente para:',
    s4Items: [
      'Autenticar tu identidad y mantener tu sesión;',
      'Entregar mensajes en tiempo real;',
      'Identificar contactos de tu agenda que también usan Zoji (ver sección 3);',
      'Enviar notificaciones push sobre nuevos mensajes.',
    ],
    s4p1: 'No vendemos, alquilamos ni compartimos tus datos con terceros con fines comerciales.',
    botTitle: 'Contacto automático de bienvenida',
    botP1: 'Al crear tu cuenta, puedes recibir un mensaje inicial de la cuenta oficial "Zoji", enviado automáticamente para ayudarte a empezar a usar la app. Este proceso usa tus datos de perfil (apodo, emoji) y el estado de la conversación (qué mensajes ya se enviaron, cuántos intentos) para decidir la próxima acción — datos que se conservan mientras tu cuenta esté activa y se eliminan junto con ella. Esta cuenta se identifica en la aplicación con un aviso que indica que se trata de un contacto automatizado, no una persona.',
    s5Title: '5. Compartición de Datos',
    s5: 'Tus datos solo pueden compartirse con proveedores de servicios esenciales (como Infobip, para el envío de SMS y WhatsApp) y cuando lo exija la ley o una orden judicial.',
    aiTitle: 'Agentes de IA conectados',
    aiP1: 'Zoji permite, de forma opcional, conectar un asistente de inteligencia artificial de terceros (por ejemplo, Claude, ChatGPT o Alexa) a tu cuenta. La conexión solo ocurre por tu iniciativa y autorización explícita, y tú eliges qué permisos otorgas — como leer contactos, leer o enviar mensajes, o definir tu estado.',
    aiP2: (
      <>
        Mientras un agente esté conectado, los datos dentro de los permisos otorgados se comparten
        con el proveedor de ese asistente, que los trata conforme a su propia política de
        privacidad e infraestructura — que <strong>pueden estar fuera de Brasil</strong>. Zoji no
        controla lo que ese proveedor hace con los datos; recomendamos leer su política antes de
        conectar. Los números de teléfono de tus contactos{' '}
        <strong>no se envían</strong> a los agentes (solo apodos e identificadores anónimos).
      </>
    ),
    aiP3: (
      <>
        Para este fin, Zoji emite un <strong>token de acceso restringido y revocable</strong>,
        específico para el agente — nunca la credencial de tu sesión en la aplicación. Puedes ver
        los agentes conectados, reducir sus permisos o revocar el acceso en cualquier momento en{' '}
        <em>Configuración → Agentes conectados</em>; la revocación tiene efecto inmediato.
      </>
    ),
    s6Title: '6. Retención de Datos',
    s6Intro: 'El historial completo de las conversaciones se guarda solo en tu dispositivo, bajo tu control. En el servidor, guardamos cada dato durante el menor tiempo posible:',
    retentionHeaderData: 'Dato',
    retentionHeaderPeriod: 'Período de retención',
    retentionRows: [
      { data: 'Mensajes directos (1 a 1) entregados', period: 'Se eliminan automáticamente en cuanto el destinatario los lee' },
      { data: 'Mensajes directos (1 a 1) aún no leídos', period: 'Hasta la entrega, la cancelación por el remitente, o un máximo de 30 días — lo que ocurra primero' },
      { data: 'Mensajes de grupo', period: 'Hasta 90 días (sirven de historial del grupo), incluso después de ser leídos por todos los miembros; se eliminan antes si el remitente borra el mensaje o el grupo es eliminado' },
      { data: 'Códigos de verificación (OTP) e IP de la solicitud', period: 'Hasta 7 días' },
      { data: 'Registros de envío de SMS/WhatsApp (número de destino y estado)', period: 'Hasta 90 días' },
      { data: 'Registros técnicos de acceso al servidor (sin contenido de mensajes)', period: 'Hasta 90 días' },
      { data: 'Registros de denuncias', period: 'Hasta 90 días después del registro' },
      { data: 'Tokens de agentes de IA revocados o expirados', period: 'Hasta 30 días' },
      { data: 'Copias de seguridad cifradas de la base de datos', period: 'Hasta 30 días' },
      { data: 'Estadísticas agregadas de uso (conteos diarios, sin contenido ni identificación individual)', period: 'Plazo indeterminado' },
      { data: 'Cuenta (número, apodo, emoji)', period: 'Mientras la cuenta esté activa' },
      { data: 'Datos personales tras la eliminación de la cuenta', period: 'Se eliminan de inmediato de los servidores; las copias de seguridad que aún los contengan expiran según los plazos anteriores; el historial de conversaciones se conserva para los demás participantes sin ninguna identificación' },
    ],
    s7Title: '7. Tus Derechos (LGPD)',
    s7Intro: 'Tienes derecho a:',
    s7Items: [
      'Acceder a los datos que tenemos sobre ti;',
      'Corregir datos incompletos o desactualizados;',
      'Solicitar la eliminación de tus datos;',
      'Revocar el consentimiento para el tratamiento de datos en cualquier momento.',
    ],
    s7p1: 'Para ejercer estos derechos, contáctanos:',
    s8Title: '8. Seguridad',
    s8: 'Adoptamos medidas técnicas para proteger tus datos, incluyendo comunicación cifrada (HTTPS/TLS) y almacenamiento seguro de tokens de autenticación. Ningún sistema es 100% seguro, pero nos comprometemos a notificarte en caso de un incidente relevante.',
    s9Title: '9. Edad Mínima y Clasificación',
    s9Intro: 'Zoji está clasificado de la siguiente manera en las tiendas de aplicaciones:',
    s9Items: [
      'App Store (Brasil): A12 — recomendado para mayores de 12 años;',
      'App Store (otros países): 4+;',
      'Google Play: Clasificación para todo público.',
    ],
    s9p1: 'La aplicación no está dirigida a menores de 12 años. Si tomamos conocimiento de que un menor proporcionó datos sin consentimiento parental, eliminaremos dichos datos con prontitud.',
    s10Title: '10. Cookies y Rastreo',
    s10: 'Zoji no utiliza cookies de rastreo ni tecnologías de análisis de comportamiento de terceros.',
    s11Title: '11. Cambios en esta Política',
    s11: 'Podemos actualizar esta Política periódicamente. Te notificaremos a través de la aplicación sobre cambios relevantes. El uso continuado implica la aceptación de la versión vigente.',
    s12Title: '12. Contacto',
    s12: (
      <>
        El responsable del tratamiento de los datos es <strong>De Araujo Desenvolvimento LTDA</strong>
        (CNPJ de Brasil 51.296.106/0001-15), Porto Alegre, Brasil. ¿Dudas sobre privacidad o
        solicitudes sobre tus datos? Contáctanos:{' '}
        <a href="mailto:contato@zoji.app" className="text-primary-500 underline hover:opacity-80">
          contato@zoji.app
        </a>
      </>
    ),
  },
}

export default function Privacy() {
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
            <p>{t.s2Intro}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {t.s2Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s3Title}</h2>
            <p>{t.s3p1}</p>
            <p className="mt-3">{t.s3p2}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s4Title}</h2>
            <p>{t.s4Intro}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {t.s4Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{t.s4p1}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.botTitle}</h2>
            <p>{t.botP1}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s5Title}</h2>
            <p>{t.s5}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.aiTitle}</h2>
            <p>{t.aiP1}</p>
            <p className="mt-3">{t.aiP2}</p>
            <p className="mt-3">{t.aiP3}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s6Title}</h2>
            <p>{t.s6Intro}</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-navy-hairline text-left">
                    <th className="py-2 pr-4 font-semibold text-navy-text">{t.retentionHeaderData}</th>
                    <th className="py-2 font-semibold text-navy-text">{t.retentionHeaderPeriod}</th>
                  </tr>
                </thead>
                <tbody className="[&>tr]:border-b [&>tr]:border-navy-hairline">
                  {t.retentionRows.map((row, i) => (
                    <tr key={i}>
                      <td className="py-2 pr-4">{row.data}</td>
                      <td className="py-2">{row.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s7Title}</h2>
            <p>{t.s7Intro}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {t.s7Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">
              {t.s7p1}{' '}
              <a href="mailto:contato@zoji.app" className="text-primary-500 underline hover:opacity-80">
                contato@zoji.app
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s8Title}</h2>
            <p>{t.s8}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s9Title}</h2>
            <p>{t.s9Intro}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {t.s9Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{t.s9p1}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s10Title}</h2>
            <p>{t.s10}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s11Title}</h2>
            <p>{t.s11}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-text mb-3">{t.s12Title}</h2>
            <p>{t.s12}</p>
          </section>

        </div>
      </main>
    </div>
  )
}
