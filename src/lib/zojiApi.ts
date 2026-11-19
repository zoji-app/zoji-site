const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'https://api.zoji.app'

export class ZojiApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ZojiApiError'
    this.status = status
  }
}

async function postJson<T>(path: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new ZojiApiError(res.status, data?.error ?? 'Erro desconhecido')
  }
  return data as T
}

export interface OAuthClientInfo {
  client_name: string
  redirect_uris: string[]
}

// GET /oauth/clients/:clientId — dados públicos do agente pedindo conexão
export async function getClientInfo(clientId: string): Promise<OAuthClientInfo> {
  const res = await fetch(`${API_BASE_URL}/oauth/clients/${clientId}`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ZojiApiError(res.status, data?.error ?? 'Client não encontrado')
  return data as OAuthClientInfo
}

export function sendCode(phoneNumber: string) {
  return postJson<{ message?: string; retry_after?: number }>('/auth/send-code', {
    phone_number: phoneNumber,
  })
}

export interface VerifyCodeResult {
  access_token: string
  refresh_token: string
  user: { id: number; nickname: string | null; profile_complete: boolean }
}

export function verifyCode(phoneNumber: string, code: string) {
  return postJson<VerifyCodeResult>('/auth/verify-code', { phone_number: phoneNumber, code })
}

export interface ApproveParams {
  client_id: string
  redirect_uri: string
  code_challenge: string
  code_challenge_method: string
  scope: string
  state?: string
}

// POST /oauth/authorize/approve — autenticado com o access_token do login OTP
// feito aqui na própria página (nunca persistido; some quando a aba fecha)
export function approveAuthorization(params: ApproveParams, accessToken: string) {
  return postJson<{ redirect_url: string }>('/oauth/authorize/approve', params, accessToken)
}

export interface PairResult {
  pairing_token: string
  expires_in: number
}

// POST /oauth/pair — cria a sessão de pareamento antes de renderizar o QR.
// Público (o navegador ainda não fez login OTP nesse ponto).
export function createPairingSession(params: ApproveParams) {
  return postJson<PairResult>('/oauth/pair', params)
}

export type PairStatusResult =
  | { status: 'pending' }
  | { status: 'resolved'; redirect_url: string }
  | { status: 'expired' }

// GET /oauth/pair/:token/status — polling enquanto o QR está na tela,
// esperando o app aprovar via POST /oauth/authorize/approve.
export async function getPairingStatus(pairingToken: string): Promise<PairStatusResult> {
  const res = await fetch(`${API_BASE_URL}/oauth/pair/${pairingToken}/status`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ZojiApiError(res.status, data?.error ?? 'Erro ao consultar pareamento')
  return data as PairStatusResult
}

export interface PublicStats {
  total_messages: number
  messages_today: number
  messages_by_day: { date: string; total: number }[]
  total_users: number
  users_ios: number
  users_android: number
  connected_now: number
  top_emojis: { emoji: string; count: number }[]
  generated_at: number
}

// GET /app/public-stats — público, sem auth, cacheado 10s no servidor.
// Usado pela página /estatisticas (dados agregados pra exibição na palestra).
export async function getPublicStats(): Promise<PublicStats> {
  const res = await fetch(`${API_BASE_URL}/app/public-stats`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ZojiApiError(res.status, data?.error ?? 'Erro ao carregar estatísticas')
  return data as PublicStats
}

/** Normalização simples para o formato internacional exigido por /auth/send-code (+55DDXXXXXXXXX). */
export function normalizePhoneNumber(input: string): string {
  let digits = input.replace(/\D/g, '')
  if (!digits.startsWith('55') && (digits.length === 10 || digits.length === 11)) {
    digits = '55' + digits
  }
  return '+' + digits
}
