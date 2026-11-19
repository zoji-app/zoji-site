import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import QRCode from 'qrcode'
import {
  approveAuthorization,
  createPairingSession,
  getClientInfo,
  getPairingStatus,
  normalizePhoneNumber,
  sendCode,
  verifyCode,
  ZojiApiError,
  type OAuthClientInfo,
} from '../lib/zojiApi'
import { useLang, type Lang } from '../lib/lang'

const pageTitle: Record<Lang, string> = {
  'pt-BR': 'Autorizar acesso — Zoji',
  en: 'Authorize access — Zoji',
  es: 'Autorizar acceso — Zoji',
}

const SCOPE_LABELS: Record<Lang, Record<string, string>> = {
  'pt-BR': {
    'contacts:read': 'Ver sua lista de contatos (apelido e emoji de perfil)',
    'messages:read': 'Ler suas conversas (mensagens de emoji) com seus contatos',
    'messages:send': 'Enviar mensagens de emoji para seus contatos em seu nome',
    'status:write': 'Definir o emoji do seu status',
    'groups:read': 'Ler as mensagens dos seus grupos',
    'groups:send': 'Enviar mensagens de emoji nos seus grupos em seu nome',
  },
  en: {
    'contacts:read': 'View your contact list (nickname and profile emoji)',
    'messages:read': 'Read your conversations (emoji messages) with your contacts',
    'messages:send': 'Send emoji messages to your contacts on your behalf',
    'status:write': 'Set your status emoji',
    'groups:read': 'Read messages in your groups',
    'groups:send': 'Send emoji messages in your groups on your behalf',
  },
  es: {
    'contacts:read': 'Ver tu lista de contactos (apodo y emoji de perfil)',
    'messages:read': 'Leer tus conversaciones (mensajes de emoji) con tus contactos',
    'messages:send': 'Enviar mensajes de emoji a tus contactos en tu nombre',
    'status:write': 'Definir el emoji de tu estado',
    'groups:read': 'Leer los mensajes de tus grupos',
    'groups:send': 'Enviar mensajes de emoji en tus grupos en tu nombre',
  },
}

// Escopos de escrita (write) são destacados na tela de consentimento com uma cor
// de aviso, pra diferenciar de escopos só-leitura. O texto de aviso é específico
// por escopo porque nem toda escrita tem confirmação em 2 passos (status não tem).
const WRITE_SCOPES = new Set(['messages:send', 'status:write', 'groups:send'])
const WRITE_SCOPE_NOTES: Record<Lang, Record<string, string>> = {
  'pt-BR': {
    'messages:send': 'Cada mensagem exige sua confirmação antes de ser enviada.',
    'status:write': 'Substitui seu status atual, visível aos seus contatos (some sozinho em 24h).',
    'groups:send': 'Cada mensagem exige sua confirmação antes de ser enviada. Não inclui ler mensagens nem administrar o grupo.',
  },
  en: {
    'messages:send': 'Each message requires your confirmation before being sent.',
    'status:write': 'Replaces your current status, visible to your contacts (disappears on its own after 24h).',
    'groups:send': 'Each message requires your confirmation before being sent. Does not include reading messages or managing the group.',
  },
  es: {
    'messages:send': 'Cada mensaje requiere tu confirmación antes de enviarse.',
    'status:write': 'Reemplaza tu estado actual, visible para tus contactos (desaparece solo en 24h).',
    'groups:send': 'Cada mensaje requiere tu confirmación antes de enviarse. No incluye leer mensajes ni administrar el grupo.',
  },
}

const t: Record<
  Lang,
  {
    loading: string
    invalidTitle: string
    invalidBody: string
    incompleteTitle: string
    incompleteBody: string
    wantsToConnect: (name: string) => string
    aiAgentFallback: string
    thisAgentFallback: string
    qrInstructions: string
    qrAlt: string
    expiresIn: string
    sameDevice: string
    noApp: string
    qrExpiredTitle: string
    qrExpiredBody: string
    generateNewQr: string
    enterWithNumber: string
    enterWithNumberSubtitle: string
    phonePlaceholder: string
    sending: string
    sendCode: string
    sendCodeError: string
    codeTitle: string
    codeSubtitle: (phone: string) => string
    confirming: string
    confirm: string
    invalidCode: string
    useAnotherNumber: string
    wantsToConnectAccount: (name: string) => string
    canDo: string
    connecting: string
    allow: string
    deny: string
    authorizeError: string
    disconnectHint: string
  }
> = {
  'pt-BR': {
    loading: 'Carregando…',
    invalidTitle: 'Link inválido',
    invalidBody: 'Este link de conexão está incompleto, expirado ou não é reconhecido. Peça para o assistente de IA gerar um novo link de conexão com o Zoji.',
    incompleteTitle: 'Termine seu cadastro no Zoji',
    incompleteBody: 'Esse número ainda não tem um perfil completo no Zoji. Baixe o app, termine seu cadastro (nickname e emoji de perfil) e depois peça pro assistente de IA gerar um novo link de conexão.',
    wantsToConnect: (name) => `${name} quer se conectar`,
    aiAgentFallback: 'Um assistente de IA',
    thisAgentFallback: 'Este assistente',
    qrInstructions: 'Abra a Câmera do seu celular e aponte pro código — o Zoji precisa já estar instalado e você logado.',
    qrAlt: 'QR code para autorizar pelo app Zoji',
    expiresIn: 'Expira em',
    sameDevice: 'Está no mesmo celular? Abrir direto no app',
    noApp: 'Não tem o app no celular? Entrar com número',
    qrExpiredTitle: 'O QR expirou',
    qrExpiredBody: 'Ficou muito tempo na tela. Gera um novo pra continuar.',
    generateNewQr: 'Gerar novo QR',
    enterWithNumber: 'Entrar com número',
    enterWithNumberSubtitle: 'Entre com seu número do Zoji para continuar.',
    phonePlaceholder: '+55 11 99999-9999',
    sending: 'Enviando…',
    sendCode: 'Enviar código',
    sendCodeError: 'Não foi possível enviar o código. Tente novamente.',
    codeTitle: 'Digite o código',
    codeSubtitle: (phone) => `Enviamos um código de verificação para ${phone}.`,
    confirming: 'Confirmando…',
    confirm: 'Confirmar',
    invalidCode: 'Código inválido.',
    useAnotherNumber: 'Usar outro número',
    wantsToConnectAccount: (name) => `${name} quer se conectar à sua conta Zoji`,
    canDo: 'Vai poder:',
    connecting: 'Conectando…',
    allow: 'Permitir',
    deny: 'Negar',
    authorizeError: 'Não foi possível autorizar. Tente novamente.',
    disconnectHint: 'Você pode desconectar este agente a qualquer momento em Configurações → Agentes conectados, no app.',
  },
  en: {
    loading: 'Loading…',
    invalidTitle: 'Invalid link',
    invalidBody: 'This connection link is incomplete, expired, or not recognized. Ask the AI assistant to generate a new connection link with Zoji.',
    incompleteTitle: 'Finish setting up your Zoji account',
    incompleteBody: 'This number doesn’t have a complete profile on Zoji yet. Download the app, finish setting up your account (nickname and profile emoji), and then ask the AI assistant to generate a new connection link.',
    wantsToConnect: (name) => `${name} wants to connect`,
    aiAgentFallback: 'An AI assistant',
    thisAgentFallback: 'This assistant',
    qrInstructions: 'Open your phone’s camera and point it at the code — Zoji needs to already be installed and you need to be logged in.',
    qrAlt: 'QR code to authorize via the Zoji app',
    expiresIn: 'Expires in',
    sameDevice: 'On the same phone? Open directly in the app',
    noApp: 'Don’t have the app on this phone? Sign in with your number',
    qrExpiredTitle: 'The QR code expired',
    qrExpiredBody: 'It stayed on screen too long. Generate a new one to continue.',
    generateNewQr: 'Generate new QR code',
    enterWithNumber: 'Sign in with number',
    enterWithNumberSubtitle: 'Enter your Zoji number to continue.',
    phonePlaceholder: '+1 555 123-4567',
    sending: 'Sending…',
    sendCode: 'Send code',
    sendCodeError: 'Could not send the code. Please try again.',
    codeTitle: 'Enter the code',
    codeSubtitle: (phone) => `We sent a verification code to ${phone}.`,
    confirming: 'Confirming…',
    confirm: 'Confirm',
    invalidCode: 'Invalid code.',
    useAnotherNumber: 'Use another number',
    wantsToConnectAccount: (name) => `${name} wants to connect to your Zoji account`,
    canDo: 'Will be able to:',
    connecting: 'Connecting…',
    allow: 'Allow',
    deny: 'Deny',
    authorizeError: 'Could not authorize. Please try again.',
    disconnectHint: 'You can disconnect this agent at any time in Settings → Connected agents, in the app.',
  },
  es: {
    loading: 'Cargando…',
    invalidTitle: 'Enlace inválido',
    invalidBody: 'Este enlace de conexión está incompleto, ha expirado o no es reconocido. Pídele al asistente de IA que genere un nuevo enlace de conexión con Zoji.',
    incompleteTitle: 'Termina tu registro en Zoji',
    incompleteBody: 'Este número aún no tiene un perfil completo en Zoji. Descarga la app, termina tu registro (apodo y emoji de perfil) y luego pídele al asistente de IA que genere un nuevo enlace de conexión.',
    wantsToConnect: (name) => `${name} quiere conectarse`,
    aiAgentFallback: 'Un asistente de IA',
    thisAgentFallback: 'Este asistente',
    qrInstructions: 'Abre la cámara de tu celular y apunta al código — Zoji ya debe estar instalado y debes haber iniciado sesión.',
    qrAlt: 'Código QR para autorizar desde la app Zoji',
    expiresIn: 'Expira en',
    sameDevice: '¿Estás en el mismo celular? Abrir directo en la app',
    noApp: '¿No tienes la app en este celular? Entra con tu número',
    qrExpiredTitle: 'El QR expiró',
    qrExpiredBody: 'Estuvo demasiado tiempo en la pantalla. Genera uno nuevo para continuar.',
    generateNewQr: 'Generar nuevo QR',
    enterWithNumber: 'Entrar con número',
    enterWithNumberSubtitle: 'Ingresa tu número de Zoji para continuar.',
    phonePlaceholder: '+52 55 1234-5678',
    sending: 'Enviando…',
    sendCode: 'Enviar código',
    sendCodeError: 'No se pudo enviar el código. Inténtalo de nuevo.',
    codeTitle: 'Ingresa el código',
    codeSubtitle: (phone) => `Enviamos un código de verificación a ${phone}.`,
    confirming: 'Confirmando…',
    confirm: 'Confirmar',
    invalidCode: 'Código inválido.',
    useAnotherNumber: 'Usar otro número',
    wantsToConnectAccount: (name) => `${name} quiere conectarse a tu cuenta Zoji`,
    canDo: 'Podrá:',
    connecting: 'Conectando…',
    allow: 'Permitir',
    deny: 'Denegar',
    authorizeError: 'No se pudo autorizar. Inténtalo de nuevo.',
    disconnectHint: 'Puedes desconectar este agente en cualquier momento desde Configuración → Agentes conectados, en la app.',
  },
}

type Step =
  | 'loading'
  | 'invalid'
  | 'qr'
  | 'qr_expired'
  | 'phone'
  | 'code'
  | 'incomplete_profile'
  | 'consent'
  | 'approving'

const PAIR_POLL_INTERVAL_MS = 2000

// Função de módulo (fora do componente) — o plugin react-compiler do eslint
// trata atribuição a window.location dentro de handlers async do componente
// como mutação de valor externo; isolar aqui evita o falso positivo.
function redirectTo(url: string) {
  window.location.href = url
}

function Card({ children }: { children: React.ReactNode }) {
  const { lang } = useLang()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 px-6">
      <title>{pageTitle[lang]}</title>
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src="/logo.png" alt="Zoji" className="w-8 h-8" />
          <span className="font-zoji text-3xl text-neutral-900">Zoji</span>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">{children}</div>
      </div>
    </div>
  )
}

export default function OAuthAuthorize() {
  const { lang } = useLang()
  const s = t[lang]
  const scopeLabels = SCOPE_LABELS[lang]
  const writeScopeNotes = WRITE_SCOPE_NOTES[lang]

  const [params] = useSearchParams()
  const clientId = params.get('client_id') ?? ''
  const redirectUri = params.get('redirect_uri') ?? ''
  const codeChallenge = params.get('code_challenge') ?? ''
  const codeChallengeMethod = params.get('code_challenge_method') ?? ''
  const scope = params.get('scope') ?? ''
  const state = params.get('state') ?? ''
  const scopes = scope.split(' ').filter(Boolean)
  const paramsValid = Boolean(
    clientId && redirectUri && codeChallenge && codeChallengeMethod === 'S256' && scopes.length > 0,
  )

  const [step, setStep] = useState<Step>(paramsValid ? 'loading' : 'invalid')
  const [client, setClient] = useState<OAuthClientInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const [pairingToken, setPairingToken] = useState<string | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)

  // URL do Universal Link que o QR encodifica — mesma usada pelo botão de
  // "mesmo aparelho" abaixo. Derivada, não precisa de estado próprio.
  const pairingUrl = useMemo(() => {
    if (!pairingToken) return null
    const qrParams = new URLSearchParams(params)
    qrParams.set('pairing_token', pairingToken)
    return `${window.location.origin}/oauth/authorize?${qrParams.toString()}`
  }, [pairingToken, params])
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)

  const authorizeParams = {
    client_id: clientId,
    redirect_uri: redirectUri,
    code_challenge: codeChallenge,
    code_challenge_method: codeChallengeMethod,
    scope,
    state: state || undefined,
  }

  // Carrega os dados do agente e já abre uma sessão de pareamento — o QR vira
  // a opção padrão, "entrar com número" é o fallback pra quem não tem o app.
  useEffect(() => {
    if (!paramsValid) return
    getClientInfo(clientId)
      .then(async (info) => {
        if (!info.redirect_uris.includes(redirectUri)) {
          setStep('invalid')
          return
        }
        setClient(info)
        const pairing = await createPairingSession(authorizeParams)
        setPairingToken(pairing.pairing_token)
        setSecondsLeft(pairing.expires_in)
        setStep('qr')
      })
      .catch(() => setStep('invalid'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsValid, clientId, redirectUri])

  // Renderiza o QR — a URL é o mesmo /oauth/authorize de sempre, só com o
  // pairing_token a mais. Universal Link já registrado desde ada31a0.
  useEffect(() => {
    if (step !== 'qr' || !pairingUrl) return
    QRCode.toDataURL(pairingUrl, { width: 220, margin: 1, color: { dark: '#101C1F', light: '#FFFFFFFF' } })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null))
  }, [step, pairingUrl])

  // Contador visível de expiração — some sozinho depois de expires_in segundos.
  useEffect(() => {
    if (step !== 'qr' || secondsLeft === null) return
    if (secondsLeft <= 0) {
      const timeout = setTimeout(() => setStep('qr_expired'), 0)
      return () => clearTimeout(timeout)
    }
    const timeout = setTimeout(() => setSecondsLeft((sec) => (sec !== null ? sec - 1 : null)), 1000)
    return () => clearTimeout(timeout)
  }, [step, secondsLeft])

  // Polling — espera o app resolver o pareamento via approve(). Quando resolve,
  // o navegador é quem navega pro redirect_url (não o celular).
  useEffect(() => {
    if (step !== 'qr' || !pairingToken) return
    const interval = setInterval(async () => {
      try {
        const result = await getPairingStatus(pairingToken)
        if (result.status === 'resolved') {
          clearInterval(interval)
          redirectTo(result.redirect_url)
        } else if (result.status === 'expired') {
          clearInterval(interval)
          setStep('qr_expired')
        }
      } catch {
        // falha de rede pontual — tenta de novo no próximo tick
      }
    }, PAIR_POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [step, pairingToken])

  async function handleRegenerateQr() {
    setStep('loading')
    try {
      const pairing = await createPairingSession(authorizeParams)
      setPairingToken(pairing.pairing_token)
      setSecondsLeft(pairing.expires_in)
      setStep('qr')
    } catch {
      setStep('qr_expired')
    }
  }

  async function handleSendCode(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await sendCode(normalizePhoneNumber(phone))
      setStep('code')
    } catch (err) {
      setError(err instanceof ZojiApiError ? err.message : s.sendCodeError)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleVerifyCode(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const result = await verifyCode(normalizePhoneNumber(phone), code)
      setAccessToken(result.access_token)
      setStep(result.user.profile_complete ? 'consent' : 'incomplete_profile')
    } catch (err) {
      setError(err instanceof ZojiApiError ? err.message : s.invalidCode)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleApprove() {
    if (!accessToken) return
    setError(null)
    setStep('approving')
    try {
      const { redirect_url } = await approveAuthorization(
        {
          client_id: clientId,
          redirect_uri: redirectUri,
          code_challenge: codeChallenge,
          code_challenge_method: codeChallengeMethod,
          scope,
          state: state || undefined,
        },
        accessToken,
      )
      redirectTo(redirect_url)
    } catch (err) {
      if (err instanceof ZojiApiError && err.message === 'profile_incomplete') {
        setStep('incomplete_profile')
        return
      }
      setError(err instanceof ZojiApiError ? err.message : s.authorizeError)
      setStep('consent')
    }
  }

  function handleDeny() {
    const separator = redirectUri.includes('?') ? '&' : '?'
    let url = `${redirectUri}${separator}error=access_denied`
    if (state) url += `&state=${encodeURIComponent(state)}`
    redirectTo(url)
  }

  if (step === 'loading') {
    return (
      <Card>
        <p className="text-center text-neutral-500 text-sm py-4">{s.loading}</p>
      </Card>
    )
  }

  if (step === 'invalid') {
    return (
      <Card>
        <h1 className="text-lg font-bold text-neutral-900 mb-2 text-center">{s.invalidTitle}</h1>
        <p className="text-neutral-500 text-sm text-center leading-relaxed">
          {s.invalidBody}
        </p>
      </Card>
    )
  }

  if (step === 'incomplete_profile') {
    return (
      <Card>
        <h1 className="text-lg font-bold text-neutral-900 mb-2 text-center">{s.incompleteTitle}</h1>
        <p className="text-neutral-500 text-sm text-center leading-relaxed">
          {s.incompleteBody}
        </p>
      </Card>
    )
  }

  if (step === 'qr') {
    const minutes = secondsLeft !== null ? Math.floor(secondsLeft / 60) : 0
    const seconds = secondsLeft !== null ? secondsLeft % 60 : 0
    return (
      <Card>
        <h1 className="text-lg font-bold text-neutral-900 mb-1 text-center">
          {s.wantsToConnect(client?.client_name ?? s.aiAgentFallback)}
        </h1>
        <p className="text-neutral-500 text-sm text-center mb-5 leading-relaxed">
          {s.qrInstructions}
        </p>
        <div className="flex justify-center mb-4">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={s.qrAlt}
              width={220}
              height={220}
              className="rounded-xl border border-neutral-100"
            />
          ) : (
            <div className="w-[220px] h-[220px] rounded-xl bg-neutral-100 animate-pulse" />
          )}
        </div>
        {secondsLeft !== null && (
          <p className="text-neutral-500 text-xs text-center mb-4">
            {s.expiresIn} {minutes}:{seconds.toString().padStart(2, '0')}
          </p>
        )}
        {pairingUrl && (
          // Precisa ser um <a href> de verdade, não onClick + window.location:
          // Universal Links (iOS/Android) só interceptam navegação disparada
          // por um clique direto em link — navegação via JS não é reconhecida
          // como app link e cai direto no navegador.
          <a
            href={pairingUrl}
            className="bg-primary-700 text-white text-sm font-medium py-3.5 px-4 rounded-xl w-full mb-3 block text-center"
          >
            {s.sameDevice}
          </a>
        )}
        <button
          type="button"
          onClick={() => setStep('phone')}
          className="text-neutral-500 text-sm underline block mx-auto"
        >
          {s.noApp}
        </button>
      </Card>
    )
  }

  if (step === 'qr_expired') {
    return (
      <Card>
        <h1 className="text-lg font-bold text-neutral-900 mb-2 text-center">{s.qrExpiredTitle}</h1>
        <p className="text-neutral-500 text-sm text-center mb-6 leading-relaxed">
          {s.qrExpiredBody}
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleRegenerateQr}
            className="bg-primary-700 text-white text-sm font-medium py-3.5 rounded-xl"
          >
            {s.generateNewQr}
          </button>
          <button
            type="button"
            onClick={() => setStep('phone')}
            className="text-neutral-500 text-sm font-medium py-3 rounded-xl"
          >
            {s.enterWithNumber}
          </button>
        </div>
      </Card>
    )
  }

  if (step === 'phone') {
    return (
      <Card>
        <h1 className="text-lg font-bold text-neutral-900 mb-1 text-center">
          {s.wantsToConnect(client?.client_name ?? s.aiAgentFallback)}
        </h1>
        <p className="text-neutral-500 text-sm text-center mb-6 leading-relaxed">
          {s.enterWithNumberSubtitle}
        </p>
        <form onSubmit={handleSendCode} className="flex flex-col gap-3">
          <input
            type="tel"
            required
            placeholder={s.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-700"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary-700 text-white text-sm font-medium py-3.5 rounded-xl disabled:opacity-50"
          >
            {submitting ? s.sending : s.sendCode}
          </button>
        </form>
      </Card>
    )
  }

  if (step === 'code') {
    return (
      <Card>
        <h1 className="text-lg font-bold text-neutral-900 mb-1 text-center">{s.codeTitle}</h1>
        <p className="text-neutral-500 text-sm text-center mb-6 leading-relaxed">
          {s.codeSubtitle(phone)}
        </p>
        <form onSubmit={handleVerifyCode} className="flex flex-col gap-3">
          <input
            type="text"
            inputMode="numeric"
            required
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className="border border-neutral-300 rounded-xl px-4 py-3 text-sm text-center tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-primary-700"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary-700 text-white text-sm font-medium py-3.5 rounded-xl disabled:opacity-50"
          >
            {submitting ? s.confirming : s.confirm}
          </button>
          <button
            type="button"
            onClick={() => setStep('phone')}
            className="text-neutral-500 text-xs underline"
          >
            {s.useAnotherNumber}
          </button>
        </form>
      </Card>
    )
  }

  // consent | approving
  return (
    <Card>
      <h1 className="text-lg font-bold text-neutral-900 mb-1 text-center">
        {s.wantsToConnectAccount(client?.client_name ?? s.thisAgentFallback)}
      </h1>
      <p className="text-neutral-500 text-sm text-center mb-5 leading-relaxed">{s.canDo}</p>
      <ul className="flex flex-col gap-2 mb-6">
        {scopes.map((sc) => (
          <li key={sc} className="flex items-start gap-2 text-sm text-neutral-700">
            <span className={`mt-0.5 ${WRITE_SCOPES.has(sc) ? 'text-amber-500' : 'text-primary-700'}`}>
              {WRITE_SCOPES.has(sc) ? '⚠' : '✓'}
            </span>
            <span>
              {scopeLabels[sc] ?? sc}
              {writeScopeNotes[sc] && (
                <span className="block text-xs text-amber-600 mt-0.5">{writeScopeNotes[sc]}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleApprove}
          disabled={step === 'approving'}
          className="bg-primary-700 text-white text-sm font-medium py-3.5 rounded-xl disabled:opacity-50"
        >
          {step === 'approving' ? s.connecting : s.allow}
        </button>
        <button
          onClick={handleDeny}
          disabled={step === 'approving'}
          className="text-neutral-500 text-sm font-medium py-3 rounded-xl disabled:opacity-50"
        >
          {s.deny}
        </button>
      </div>
      <p className="text-neutral-500 text-xs text-center mt-4 leading-relaxed">
        {s.disconnectHint}
      </p>
    </Card>
  )
}
