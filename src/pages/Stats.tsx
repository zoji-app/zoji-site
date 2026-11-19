import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPublicStats, type PublicStats } from '../lib/zojiApi'
import { useLang, type Lang } from '../lib/lang'

const POLL_MS = 15000
const ACCENT = '#00B2FF' // primary-500 — usado em atributos SVG crus, fora do alcance das classes Tailwind

const t: Record<
  Lang,
  {
    back: string
    title: string
    subtitle: string
    totalMessages: string
    users: string
    connectedNow: string
    messagesToday: string
    dailyTitle: string
    platformTitle: string
    topEmojiTitle: string
    topEmojiEmpty: string
    updated: string
    live: string
  }
> = {
  'pt-BR': {
    back: 'Voltar',
    title: 'Zoji em números',
    subtitle: 'Dados ao vivo da plataforma — atualiza sozinho a cada 15 segundos.',
    totalMessages: 'Mensagens trocadas',
    users: 'Usuários no Zoji',
    connectedNow: 'Conectados agora',
    messagesToday: 'Mensagens hoje',
    dailyTitle: 'Mensagens por dia (últimos 30 dias)',
    platformTitle: 'iOS vs Android',
    topEmojiTitle: 'Emojis mais usados',
    topEmojiEmpty: 'Ainda não há dados suficientes.',
    updated: 'Atualizado às',
    live: 'ao vivo',
  },
  en: {
    back: 'Back',
    title: 'Zoji by the numbers',
    subtitle: 'Live platform data — refreshes on its own every 15 seconds.',
    totalMessages: 'Messages exchanged',
    users: 'Users on Zoji',
    connectedNow: 'Connected now',
    messagesToday: 'Messages today',
    dailyTitle: 'Messages per day (last 30 days)',
    platformTitle: 'iOS vs Android',
    topEmojiTitle: 'Most used emojis',
    topEmojiEmpty: 'Not enough data yet.',
    updated: 'Updated at',
    live: 'live',
  },
  es: {
    back: 'Volver',
    title: 'Zoji en números',
    subtitle: 'Datos en vivo de la plataforma — se actualiza solo cada 15 segundos.',
    totalMessages: 'Mensajes intercambiados',
    users: 'Usuarios en Zoji',
    connectedNow: 'Conectados ahora',
    messagesToday: 'Mensajes hoy',
    dailyTitle: 'Mensajes por día (últimos 30 días)',
    platformTitle: 'iOS vs Android',
    topEmojiTitle: 'Emojis más usados',
    topEmojiEmpty: 'Aún no hay suficientes datos.',
    updated: 'Actualizado a las',
    live: 'en vivo',
  },
}

function useCountUp(value: number, durationMs = 700): number {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    if (from === to) return
    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return display
}

function HeroNumber({ value, label }: { value: number; label: string }) {
  const display = useCountUp(value)
  return (
    <div className="text-center">
      <div
        className="font-bold tabular-nums text-navy-text leading-none"
        style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
      >
        {display.toLocaleString('pt-BR')}
      </div>
      <p className="text-navy-text-secondary text-sm md:text-base mt-2">{label}</p>
    </div>
  )
}

function StatTile({ value, label, icon }: { value: number; label: string; icon?: string }) {
  const display = useCountUp(value)
  return (
    <div className="bg-navy-card rounded-2xl border border-navy-hairline p-5 text-center">
      {icon && <div className="text-2xl mb-1">{icon}</div>}
      <div className="text-3xl font-bold tabular-nums text-navy-text">{display.toLocaleString('pt-BR')}</div>
      <p className="text-navy-text-secondary text-xs md:text-sm mt-1">{label}</p>
    </div>
  )
}

function LiveDot() {
  return (
    <span className="relative inline-flex h-2 w-2 mr-1.5 align-middle">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
  )
}

function DailyLineChart({ data }: { data: { date: string; total: number }[] }) {
  if (data.length < 2) return null

  const width = 640
  const height = 200
  const padding = 24
  const max = Math.max(...data.map((d) => d.total), 1)

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - (d.total / max) * (height - padding * 2)
    return { x, y, ...d }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${height - padding} L ${points[0].x.toFixed(1)} ${height - padding} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="Gráfico de mensagens por dia">
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#2B3A66" strokeWidth={1} />
      <path d={areaPath} fill={ACCENT} opacity={0.12} />
      <path d={linePath} fill="none" stroke={ACCENT} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 4 : 3} fill={ACCENT}>
          <title>{`${p.date}: ${p.total}`}</title>
        </circle>
      ))}
    </svg>
  )
}

function TopEmojiBars({ items, emptyLabel }: { items: { emoji: string; count: number }[]; emptyLabel: string }) {
  if (items.length === 0) {
    return <p className="text-navy-text-secondary text-sm text-center py-6">{emptyLabel}</p>
  }
  const max = Math.max(...items.map((e) => e.count), 1)
  return (
    <div className="flex flex-col gap-3">
      {items.map((e) => (
        <div key={e.emoji} className="flex items-center gap-3">
          <span className="text-4xl w-12 flex-none text-center">{e.emoji}</span>
          <div className="flex-1 bg-navy-hairline/40 rounded-full h-5 overflow-hidden">
            <div
              className="h-full rounded-full flex items-center justify-end pr-2"
              style={{ width: `${Math.max(8, (e.count / max) * 100)}%`, backgroundColor: ACCENT }}
            >
              <span className="text-white text-xs font-semibold tabular-nums">{e.count}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Stats() {
  const { lang } = useLang()
  const s = t[lang]
  const [stats, setStats] = useState<PublicStats | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const data = await getPublicStats()
        if (!cancelled) setStats(data)
      } catch {
        // silencioso — mantém os últimos dados na tela até a próxima tentativa
      }
    }
    load()
    const interval = setInterval(load, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  const iosPct = stats && stats.users_ios + stats.users_android > 0
    ? Math.round((stats.users_ios / (stats.users_ios + stats.users_android)) * 100)
    : null
  const androidPct = iosPct !== null ? 100 - iosPct : null

  return (
    <div className="min-h-screen bg-navy-page">
      <title>{s.title}</title>
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

        {stats && (
          <>
            <section className="mb-10">
              <HeroNumber value={stats.total_messages} label={s.totalMessages} />
            </section>

            <section className="grid grid-cols-3 gap-3 mb-10">
              <StatTile value={stats.total_users} label={s.users} icon="👥" />
              <StatTile value={stats.connected_now} label={s.connectedNow} icon="🟢" />
              <StatTile value={stats.messages_today} label={s.messagesToday} icon="💬" />
            </section>

            <section className="bg-navy-card rounded-2xl border border-navy-hairline p-6 mb-10">
              <h2 className="text-sm font-semibold text-navy-text mb-4">{s.dailyTitle}</h2>
              <DailyLineChart data={stats.messages_by_day} />
            </section>

            <section className="grid grid-cols-2 gap-3 mb-10">
              <div className="bg-navy-card rounded-2xl border border-navy-hairline p-5 text-center">
                <div className="text-2xl mb-1">🍎</div>
                <div className="text-3xl font-bold tabular-nums text-navy-text">{iosPct ?? '–'}%</div>
                <p className="text-navy-text-secondary text-xs md:text-sm mt-1">iOS</p>
              </div>
              <div className="bg-navy-card rounded-2xl border border-navy-hairline p-5 text-center">
                <div className="text-2xl mb-1">🤖</div>
                <div className="text-3xl font-bold tabular-nums text-navy-text">{androidPct ?? '–'}%</div>
                <p className="text-navy-text-secondary text-xs md:text-sm mt-1">Android</p>
              </div>
            </section>

            <section className="bg-navy-card rounded-2xl border border-navy-hairline p-6 mb-6">
              <h2 className="text-sm font-semibold text-navy-text mb-4">{s.topEmojiTitle}</h2>
              <TopEmojiBars items={stats.top_emojis} emptyLabel={s.topEmojiEmpty} />
            </section>

            <p className="text-center text-navy-text-secondary text-xs">
              <LiveDot />
              {s.live} · {s.updated} {new Date(stats.generated_at * 1000).toLocaleTimeString('pt-BR')}
            </p>
          </>
        )}
      </main>
    </div>
  )
}
