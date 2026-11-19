import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang, type Lang } from '../lib/lang'

// Página pública de status (P4-3). Lê os /health da API e do MCP direto do
// navegador — por isso o CSP do site precisa liberar mcp.zoji.app em
// connect-src (ver deploy/nginx-headers.conf). Não mostra nada sensível: só
// up/down e latência, os mesmos dados que os endpoints já expõem.

const API_HEALTH = `${import.meta.env.VITE_API_URL ?? 'https://api.zoji.app'}/health`
const MCP_HEALTH = 'https://mcp.zoji.app/health'
const POLL_MS = 30000
const TIMEOUT_MS = 8000

type State = 'up' | 'down' | 'checking'

interface ApiHealth {
  ok?: boolean
  checks?: { db?: boolean; ws?: { up?: boolean; connected?: number } }
}

interface Probe<T> {
  ok: boolean
  ms: number | null
  body: T | null
}

async function probe<T>(url: string): Promise<Probe<T>> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  const start = performance.now()
  try {
    const res = await fetch(url, { signal: ctrl.signal, cache: 'no-store' })
    const ms = Math.round(performance.now() - start)
    const body = (await res.json().catch(() => null)) as T | null
    return { ok: res.ok, ms, body }
  } catch {
    return { ok: false, ms: null, body: null }
  } finally {
    clearTimeout(timer)
  }
}

const t: Record<
  Lang,
  {
    back: string
    title: string
    subtitle: string
    allUp: string
    someDown: string
    checking: string
    up: string
    down: string
    api: string
    apiDesc: string
    db: string
    dbDesc: string
    ws: string
    wsDesc: string
    mcp: string
    mcpDesc: string
    updated: string
    connected: string
  }
> = {
  'pt-BR': {
    back: 'Voltar',
    title: 'Status do Zoji',
    subtitle: 'Estado dos serviços em tempo real — atualiza sozinho a cada 30 segundos.',
    allUp: 'Todos os sistemas operando normalmente',
    someDown: 'Alguns serviços estão com problemas',
    checking: 'Verificando…',
    up: 'Operando',
    down: 'Fora do ar',
    api: 'API',
    apiDesc: 'Login, contatos e envio de mensagens',
    db: 'Banco de dados',
    dbDesc: 'Armazenamento de contas e mensagens',
    ws: 'Tempo real',
    wsDesc: 'Entrega instantânea de mensagens',
    mcp: 'Agentes de IA (MCP)',
    mcpDesc: 'Conexão de assistentes como o Claude',
    updated: 'Última verificação às',
    connected: 'conectados agora',
  },
  en: {
    back: 'Back',
    title: 'Zoji Status',
    subtitle: 'Live service status — refreshes on its own every 30 seconds.',
    allUp: 'All systems operational',
    someDown: 'Some services are having issues',
    checking: 'Checking…',
    up: 'Operational',
    down: 'Down',
    api: 'API',
    apiDesc: 'Login, contacts and sending messages',
    db: 'Database',
    dbDesc: 'Account and message storage',
    ws: 'Real time',
    wsDesc: 'Instant message delivery',
    mcp: 'AI agents (MCP)',
    mcpDesc: 'Connecting assistants like Claude',
    updated: 'Last checked at',
    connected: 'connected now',
  },
  es: {
    back: 'Volver',
    title: 'Estado de Zoji',
    subtitle: 'Estado de los servicios en vivo — se actualiza solo cada 30 segundos.',
    allUp: 'Todos los sistemas funcionan con normalidad',
    someDown: 'Algunos servicios tienen problemas',
    checking: 'Verificando…',
    up: 'Operativo',
    down: 'Caído',
    api: 'API',
    apiDesc: 'Inicio de sesión, contactos y envío de mensajes',
    db: 'Base de datos',
    dbDesc: 'Almacenamiento de cuentas y mensajes',
    ws: 'Tiempo real',
    wsDesc: 'Entrega instantánea de mensajes',
    mcp: 'Agentes de IA (MCP)',
    mcpDesc: 'Conexión de asistentes como Claude',
    updated: 'Última verificación a las',
    connected: 'conectados ahora',
  },
}

function StatusDot({ state }: { state: State }) {
  const color = state === 'up' ? 'bg-emerald-500' : state === 'down' ? 'bg-red-500' : 'bg-navy-text-secondary'
  return (
    <span className="relative inline-flex h-3 w-3 flex-none">
      {state === 'up' && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
      )}
      <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`} />
    </span>
  )
}

function ComponentRow({
  name,
  desc,
  state,
  label,
  detail,
}: {
  name: string
  desc: string
  state: State
  label: string
  detail?: string
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <StatusDot state={state} />
      <div className="flex-1 min-w-0">
        <p className="text-navy-text font-semibold text-sm md:text-base">{name}</p>
        <p className="text-navy-text-secondary text-xs md:text-sm">{desc}</p>
      </div>
      <div className="text-right flex-none">
        <p
          className={`text-sm font-semibold ${
            state === 'up' ? 'text-emerald-400' : state === 'down' ? 'text-red-400' : 'text-navy-text-secondary'
          }`}
        >
          {label}
        </p>
        {detail && <p className="text-navy-text-secondary text-xs tabular-nums">{detail}</p>}
      </div>
    </div>
  )
}

export default function Status() {
  const { lang } = useLang()
  const s = t[lang]
  const [api, setApi] = useState<Probe<ApiHealth> | null>(null)
  const [mcp, setMcp] = useState<Probe<{ ok?: boolean }> | null>(null)
  const [checkedAt, setCheckedAt] = useState<Date | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [a, m] = await Promise.all([probe<ApiHealth>(API_HEALTH), probe<{ ok?: boolean }>(MCP_HEALTH)])
      if (cancelled) return
      setApi(a)
      setMcp(m)
      setCheckedAt(new Date())
    }
    load()
    const interval = setInterval(load, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  // A API responde 503 com o mesmo JSON quando o banco cai, então os checks
  // internos valem mesmo com res.ok falso. Sem resposta nenhuma, tudo que
  // depende da API conta como fora do ar.
  const apiState: State = !api ? 'checking' : api.ok && api.body?.ok ? 'up' : 'down'
  const dbState: State = !api ? 'checking' : api.body?.checks?.db ? 'up' : 'down'
  const wsState: State = !api ? 'checking' : api.body?.checks?.ws?.up ? 'up' : 'down'
  const mcpState: State = !mcp ? 'checking' : mcp.ok && mcp.body?.ok ? 'up' : 'down'

  const states = [apiState, dbState, wsState, mcpState]
  const overall: State = states.includes('checking') ? 'checking' : states.includes('down') ? 'down' : 'up'
  const labelFor = (st: State) => (st === 'up' ? s.up : st === 'down' ? s.down : s.checking)
  const msDetail = (p: Probe<unknown> | null) => (p?.ms != null ? `${p.ms} ms` : undefined)
  const connected = api?.body?.checks?.ws?.connected

  return (
    <div className="min-h-screen bg-navy-page">
      <title>{s.title}</title>
      <meta name="description" content={s.subtitle} />
      <header className="sticky top-0 z-10 bg-navy-card border-b border-navy-hairline px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-navy-text-secondary hover:text-navy-text transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {s.back}
          </Link>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Zoji" width={256} height={256} className="w-7 h-7" />
            <span className="font-zoji text-2xl text-navy-text">Zoji</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="font-zoji text-3xl text-navy-text mb-2">{s.title}</h1>
          <p className="text-navy-text-secondary text-sm">{s.subtitle}</p>
        </div>

        <section
          className={`rounded-2xl border p-6 mb-8 flex items-center justify-center gap-3 ${
            overall === 'up'
              ? 'bg-emerald-500/10 border-emerald-500/40'
              : overall === 'down'
                ? 'bg-red-500/10 border-red-500/40'
                : 'bg-navy-card border-navy-hairline'
          }`}
          aria-live="polite"
        >
          <StatusDot state={overall} />
          <p className="text-navy-text font-semibold text-base md:text-lg text-center">
            {overall === 'up' ? s.allUp : overall === 'down' ? s.someDown : s.checking}
          </p>
        </section>

        <section className="bg-navy-card rounded-2xl border border-navy-hairline divide-y divide-navy-hairline mb-6">
          <ComponentRow name={s.api} desc={s.apiDesc} state={apiState} label={labelFor(apiState)} detail={msDetail(api)} />
          <ComponentRow name={s.db} desc={s.dbDesc} state={dbState} label={labelFor(dbState)} />
          <ComponentRow
            name={s.ws}
            desc={s.wsDesc}
            state={wsState}
            label={labelFor(wsState)}
            detail={wsState === 'up' && typeof connected === 'number' ? `${connected} ${s.connected}` : undefined}
          />
          <ComponentRow name={s.mcp} desc={s.mcpDesc} state={mcpState} label={labelFor(mcpState)} detail={msDetail(mcp)} />
        </section>

        {checkedAt && (
          <p className="text-center text-navy-text-secondary text-xs">
            {s.updated} {checkedAt.toLocaleTimeString(lang)}
          </p>
        )}
      </main>
    </div>
  )
}
