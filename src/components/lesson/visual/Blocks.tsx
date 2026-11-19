import type { CSSProperties } from 'react'
import { cn } from '@/components/ui'
import type { Tone } from '@/data/topicLessonTypes'
import { fmtIN } from '@/lib/format'
import { Frame, TONE, unitJoin, type Spec } from './shared'

const tone = (t?: Tone): Tone => t ?? 'neutral'
const accent = (t?: Tone) => (t && t !== 'neutral' ? TONE[t].hex : 'rgba(255,255,255,0.28)')

/* ─────────────────────────────── flow ─────────────────────────────── */
function Arrow() {
  return (
    <span aria-hidden className="flex shrink-0 items-center justify-center text-gold/70 max-md:h-7 md:w-7">
      <svg viewBox="0 0 24 24" className="h-5 w-5 max-md:rotate-90" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </span>
  )
}

export function FlowVisual({ spec }: { spec: Spec<'flow'> }) {
  const label = `Process flow with ${spec.steps.length} steps: ${spec.steps.map((s, i) => `${i + 1}. ${s.label}${s.note ? ` (${s.note})` : ''}`).join('; ')}.`
  return (
    <Frame title={spec.title} caption={spec.caption} label={label}>
      <ol className="flex list-none flex-col items-stretch p-0 max-md:mx-auto max-md:max-w-sm md:flex-row md:flex-wrap md:items-stretch md:gap-y-3">
        {spec.steps.map((s, i) => {
          const t = TONE[tone(s.tone)]
          return (
            <li key={i} className="flex flex-col items-stretch md:flex-1 md:basis-[9.5rem] md:flex-row">
              <div className="relative flex min-w-0 flex-1 flex-col gap-1.5 rounded-xl border border-line bg-surface/80 px-4 pb-3.5 pt-4" style={{ borderTop: `2px solid ${accent(s.tone)}` }}>
                <span className="flex items-center gap-2">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/50 bg-gold/10 font-mono text-[0.72rem] text-gold">{i + 1}</span>
                  {t.glyph && s.tone !== 'neutral' ? <span aria-hidden className={cn('text-xs', t.text)}>{t.glyph}</span> : null}
                </span>
                <span className="font-display text-[0.95rem] font-semibold leading-snug text-fg">{s.label}</span>
                {s.note ? <span className="text-[0.8rem] leading-relaxed text-fg-2">{s.note}</span> : null}
              </div>
              {i < spec.steps.length - 1 ? <Arrow /> : null}
            </li>
          )
        })}
      </ol>
    </Frame>
  )
}

/* ─────────────────────────────── compare ─────────────────────────────── */
function Side({ side }: { side: Spec<'compare'>['left'] }) {
  const t = TONE[tone(side.tone)]
  return (
    <div className="min-w-0 rounded-xl border border-line bg-surface/70 p-4 sm:p-5" style={{ boxShadow: `inset 0 2px 0 ${accent(side.tone)}` }}>
      <div className="flex items-center gap-2">
        {t.glyph && side.tone !== 'neutral' ? <span aria-hidden className={cn('text-sm', t.text)}>{t.glyph}</span> : null}
        <h5 className="font-display text-base font-semibold text-fg">{side.head}</h5>
      </div>
      <ul className="mt-3 flex list-none flex-col gap-2.5 p-0">
        {side.points.map((p, i) => (
          <li key={i} className="flex gap-2.5 text-[0.86rem] leading-relaxed text-fg-2">
            <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rotate-45 bg-gold" />
            <span className="min-w-0">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CompareVisual({ spec }: { spec: Spec<'compare'> }) {
  const label = `Comparison of ${spec.left.head} versus ${spec.right.head}. ${spec.left.head}: ${spec.left.points.join('; ')}. ${spec.right.head}: ${spec.right.points.join('; ')}.`
  return (
    <Frame title={spec.title} caption={spec.caption} label={label}>
      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
        <Side side={spec.left} />
        <div aria-hidden className="flex items-center justify-center md:flex-col">
          <span className="h-px w-full flex-1 bg-line md:h-full md:w-px md:flex-1" />
          <span className="mx-3 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 bg-bg-2 font-display text-[0.8rem] italic text-gold md:my-3 md:mx-0">vs</span>
          <span className="h-px w-full flex-1 bg-line md:h-full md:w-px md:flex-1" />
        </div>
        <Side side={spec.right} />
      </div>
    </Frame>
  )
}

/* ─────────────────────────────── bars ─────────────────────────────── */
export function BarsVisual({ spec }: { spec: Spec<'bars'> }) {
  const vals = spec.items.map((i) => i.value)
  const lo = Math.min(0, ...vals)
  const hi = Math.max(0, ...vals)
  const span = hi - lo || 1
  const fmt = (v: number) => unitJoin(`${v < 0 ? '−' : ''}${fmtIN(Math.abs(v), Number.isInteger(v) ? 0 : 2)}`, spec.unit)
  const zero = ((0 - lo) / span) * 100
  const label = `Bar chart: ${spec.items.map((i) => `${i.label} ${fmt(i.value)}`).join('; ')}.`
  return (
    <Frame title={spec.title} caption={spec.caption} label={label}>
      <ul className="flex list-none flex-col gap-3.5 p-0">
        {spec.items.map((it, i) => {
          const t = tone(it.tone === undefined ? (i === 0 ? 'gold' : 'ice') : it.tone)
          const color = t === 'neutral' ? '#929DA9' : TONE[t].hex
          const a = ((Math.min(it.value, 0) - lo) / span) * 100
          const w = (Math.abs(it.value) / span) * 100
          return (
            <li key={i} className="grid grid-cols-[1fr_auto] items-end gap-x-3 gap-y-1.5 sm:grid-cols-[minmax(7rem,30%)_1fr_auto] sm:items-center">
              <span className="min-w-0 text-[0.86rem] leading-snug text-fg max-sm:col-span-1">{it.label}</span>
              <span className="num text-right text-[0.86rem] text-fg sm:order-3 sm:min-w-[4.5rem]">
                {TONE[t].glyph && (t === 'bull' || t === 'bear') ? <span aria-hidden className={cn('mr-1', TONE[t].text)}>{TONE[t].glyph}</span> : null}
                {fmt(it.value)}
              </span>
              <span className="relative col-span-2 h-3 overflow-hidden rounded-full bg-white/[0.05] sm:order-2 sm:col-span-1">
                <span className="absolute inset-y-0 rounded-full" style={{ left: `${a}%`, width: `${Math.max(w, 1)}%`, background: `linear-gradient(90deg, ${color}99, ${color})` } as CSSProperties} />
                {lo < 0 ? <span aria-hidden className="absolute inset-y-0 w-px bg-fg/40" style={{ left: `${zero}%` }} /> : null}
              </span>
            </li>
          )
        })}
      </ul>
    </Frame>
  )
}

/* ─────────────────────────────── ladder ─────────────────────────────── */
type Money = 'ITM' | 'ATM' | 'OTM'
export function LadderVisual({ spec }: { spec: Spec<'ladder'> }) {
  const { optType, spot } = spec
  const strikes = [...new Set(spec.strikes)].sort((a, b) => b - a)
  const nearest = strikes.reduce((b, k) => (Math.abs(k - spot) < Math.abs(b - spot) ? k : b), strikes[0] ?? spot)
  const maxDist = Math.max(1, ...strikes.map((k) => Math.abs(k - spot)))
  const money = (k: number): Money => (k === nearest ? 'ATM' : optType === 'CE' ? (k < spot ? 'ITM' : 'OTM') : k > spot ? 'ITM' : 'OTM')
  const MT: Record<Money, { color: string; text: string; bar: string }> = {
    ITM: { color: TONE.ice.hex, text: 'text-ice', bar: 'bg-ice/70' },
    ATM: { color: TONE.gold.hex, text: 'text-gold', bar: 'bg-gold' },
    OTM: { color: '#929DA9', text: 'text-fg-2', bar: 'bg-white/25' },
  }
  const intrinsic = (k: number) => Math.max(optType === 'CE' ? spot - k : k - spot, 0)
  // Spot row sits between the two strikes it falls between (strikes are sorted high → low).
  const spotIdx = strikes.findIndex((k) => k <= spot)
  const insertAt = spotIdx === -1 ? strikes.length : spotIdx
  const spotRow = (
    <li key="spot" className="relative flex items-center gap-2 py-1" aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-gold via-gold/70 to-transparent" />
      <span className="rounded-full border border-gold/60 bg-gold/10 px-2.5 py-0.5 font-mono text-[0.72rem] text-gold">SPOT {fmtIN(spot)}</span>
      <span className="h-px w-6 bg-gold/60 sm:w-24" />
    </li>
  )
  const rows = strikes.map((k) => {
    const m = money(k)
    const d = k - spot
    return (
      <li key={k} className="grid grid-cols-[5.25rem_1fr_auto] items-center gap-3 rounded-lg px-2 py-1.5 sm:grid-cols-[6.5rem_1fr_11rem]" style={m === 'ATM' ? { background: 'rgba(201,168,106,0.07)', boxShadow: 'inset 2px 0 0 #C9A86A' } : undefined}>
        <span className={cn('num text-[0.95rem]', m === 'ATM' ? 'font-semibold text-gold' : 'text-fg')}>
          {fmtIN(k)} <span className="text-[0.7rem] text-fg-3">{optType}</span>
        </span>
        <span className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
          <span className={cn('block h-full rounded-full', MT[m].bar)} style={{ width: `${Math.max(4, (Math.abs(d) / maxDist) * 100)}%` }} />
        </span>
        <span className="flex items-center justify-end gap-2 text-right">
          <span className={cn('w-9 font-mono text-[0.78rem] font-medium', MT[m].text)}>{m}</span>
          <span className="num hidden text-[0.72rem] text-fg-3 sm:inline">{m === 'ITM' ? `intrinsic ${fmtIN(intrinsic(k))}` : m === 'ATM' ? 'nearest spot' : 'no intrinsic'}</span>
          <span className="num w-14 text-[0.72rem] text-fg-2">{d === 0 ? '0.0%' : `${d > 0 ? '+' : '−'}${Math.abs((d / spot) * 100).toFixed(1)}%`}</span>
        </span>
      </li>
    )
  })
  const items = [...rows.slice(0, insertAt), spotRow, ...rows.slice(insertAt)]
  const rule = optType === 'CE' ? 'A call (CE) is in the money when its strike is below spot.' : 'A put (PE) is in the money when its strike is above spot.'
  const label = `Strike ladder for ${optType} at spot ${fmtIN(spot)}. ${rule} ${strikes.map((k) => `${fmtIN(k)} is ${money(k)}`).join('; ')}.`
  return (
    <Frame title={spec.title} caption={spec.caption} label={label}>
      <p className="mb-3 text-[0.82rem] text-fg-2">
        {rule} <span className="text-fg-3">Moneyness describes strike vs spot, not market direction.</span>
      </p>
      <ul className="flex list-none flex-col gap-0.5 p-0">{items}</ul>
      <ul className="mt-4 flex list-none flex-wrap gap-x-5 gap-y-1.5 p-0 text-xs text-fg-2">
        {(['ITM', 'ATM', 'OTM'] as Money[]).map((m) => (
          <li key={m} className="flex items-center gap-2">
            <span className={cn('h-2 w-5 rounded-full', MT[m].bar)} />
            {m === 'ITM' ? 'In the money' : m === 'ATM' ? 'At the money (nearest strike)' : 'Out of the money'}
          </li>
        ))}
      </ul>
    </Frame>
  )
}

/* ─────────────────────────────── matrix ─────────────────────────────── */
export function MatrixVisual({ spec }: { spec: Spec<'matrix'> }) {
  const cells = [0, 1, 2, 3].map((i) => spec.cells[i] ?? { head: '—' })
  const label = `Two by two matrix. Columns: ${spec.xLabels.join(' and ')}. Rows: ${spec.yLabels.join(' and ')}. ${cells.map((c, i) => `${spec.yLabels[i < 2 ? 0 : 1]} / ${spec.xLabels[i % 2]}: ${c.head}${c.note ? ` — ${c.note}` : ''}`).join('; ')}.`
  const axis = 'font-mono text-[0.7rem] uppercase tracking-[0.1em] text-fg-2'
  return (
    <Frame title={spec.title} caption={spec.caption} label={label}>
      <div className="grid grid-cols-[1.6rem_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-2 sm:gap-3">
        <span />
        {spec.xLabels.map((x, i) => (
          <span key={i} className={cn(axis, 'text-center')}>
            {i === 1 ? `${x} →` : x}
          </span>
        ))}
        {[0, 1].map((r) => (
          <div key={r} className="contents">
            <span className={cn(axis, 'flex items-center justify-center text-center [writing-mode:vertical-rl] rotate-180')}>{spec.yLabels[r]}{r === 0 ? ' ↑' : ''}</span>
            {[0, 1].map((c) => {
              const cell = cells[r * 2 + c]
              const t = TONE[tone(cell.tone)]
              return (
                <div key={c} className="flex min-h-[6.5rem] min-w-0 flex-col justify-center gap-1.5 rounded-xl border border-line p-3.5 sm:p-4" style={{ background: `linear-gradient(160deg, ${cell.tone && cell.tone !== 'neutral' ? `${t.hex}1f` : 'rgba(255,255,255,0.04)'}, rgba(17,24,32,0.7))`, boxShadow: `inset 0 2px 0 ${accent(cell.tone)}` }}>
                  <span className="flex items-center gap-1.5 font-display text-[0.95rem] font-semibold leading-snug text-fg">
                    {t.glyph && (cell.tone === 'bull' || cell.tone === 'bear') ? <span aria-hidden className={cn('text-xs', t.text)}>{t.glyph}</span> : null}
                    {cell.head}
                  </span>
                  {cell.note ? <span className="text-[0.8rem] leading-relaxed text-fg-2">{cell.note}</span> : null}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ─────────────────────────────── timeline ─────────────────────────────── */
export function TimelineVisual({ spec }: { spec: Spec<'timeline'> }) {
  const label = `Timeline with ${spec.events.length} events: ${spec.events.map((e) => `${e.when} — ${e.what}`).join('; ')}.`
  return (
    <Frame title={spec.title} caption={spec.caption} label={label}>
      <ol className="relative m-0 list-none p-0">
        <span aria-hidden className="absolute bottom-2 left-[0.45rem] top-2 w-px bg-gradient-to-b from-gold/70 via-line-strong to-transparent md:left-[8.2rem]" />
        {spec.events.map((e, i) => {
          const t = TONE[tone(e.tone)]
          const dot = e.tone && e.tone !== 'neutral' ? t.hex : '#C9A86A'
          return (
            <li key={i} className="relative pb-5 pl-7 last:pb-0 md:grid md:grid-cols-[7.2rem_1fr] md:gap-x-9 md:pl-0">
              <span aria-hidden className="absolute left-0 top-[0.32rem] h-[0.95rem] w-[0.95rem] rounded-full border-2 bg-bg-2 md:left-[7.72rem]" style={{ borderColor: dot }} />
              <span className="num block text-[0.78rem] font-medium leading-6 tracking-wide text-gold md:pr-1 md:text-right">{e.when}</span>
              <span className="block min-w-0 text-[0.9rem] leading-relaxed text-fg md:pl-4">
                {t.glyph && (e.tone === 'bull' || e.tone === 'bear') ? <span aria-hidden className={cn('mr-1.5 text-xs', t.text)}>{t.glyph}</span> : null}
                {e.what}
              </span>
            </li>
          )
        })}
      </ol>
    </Frame>
  )
}

/* ─────────────────────────────── layers ─────────────────────────────── */
function Nest({ layers, i }: { layers: Spec<'layers'>['layers']; i: number }) {
  const l = layers[i]
  const t = TONE[tone(l.tone)]
  const last = i === layers.length - 1
  return (
    <div className="rounded-[1.6rem] border p-3 sm:p-4" style={{ borderColor: l.tone && l.tone !== 'neutral' ? `${t.hex}66` : 'rgba(255,255,255,0.14)', background: `rgba(${i % 2 ? '255,255,255,0.025' : '255,255,255,0.045'})` }}>
      <div className={cn('flex flex-wrap items-baseline gap-x-3 gap-y-0.5 px-1', last ? 'py-2 text-center justify-center' : 'mb-3')}>
        <span className="num text-[0.7rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
        <span className="font-display text-[0.95rem] font-semibold text-fg">{l.label}</span>
        {l.note ? <span className="text-[0.8rem] text-fg-2">{l.note}</span> : null}
      </div>
      {!last ? <Nest layers={layers} i={i + 1} /> : null}
    </div>
  )
}

export function LayersVisual({ spec }: { spec: Spec<'layers'> }) {
  const n = spec.layers.length
  const label = `Layers from widest to narrowest: ${spec.layers.map((l, i) => `${i + 1}. ${l.label}${l.note ? ` (${l.note})` : ''}`).join('; ')}.`
  return (
    <Frame title={spec.title} caption={spec.caption} label={label}>
      <div className="hidden md:block">{n ? <Nest layers={spec.layers} i={0} /> : null}</div>
      <ol className="m-0 flex list-none flex-col items-center gap-2 p-0 md:hidden">
        {spec.layers.map((l, i) => {
          const t = TONE[tone(l.tone)]
          const w = n > 1 ? 100 - (i * 28) / (n - 1) : 100
          return (
            <li key={i} className="w-full rounded-xl border px-3.5 py-3 text-center" style={{ width: `${w}%`, borderColor: l.tone && l.tone !== 'neutral' ? `${t.hex}66` : 'rgba(255,255,255,0.14)', background: `rgba(255,255,255,${0.05 - i * 0.004})` }}>
              <span className="num mr-2 text-[0.7rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-[0.9rem] font-semibold text-fg">{l.label}</span>
              {l.note ? <span className="mt-0.5 block text-[0.78rem] leading-snug text-fg-2">{l.note}</span> : null}
            </li>
          )
        })}
      </ol>
    </Frame>
  )
}

/* ─────────────────────────────── order book ─────────────────────────────── */
export function OrderBookVisual({ spec }: { spec: Spec<'orderBook'> }) {
  const bids = [...spec.bids].sort((a, b) => b[0] - a[0])
  const asks = [...spec.asks].sort((a, b) => a[0] - b[0])
  const n = Math.max(bids.length, asks.length)
  const maxQ = Math.max(1, ...bids.map((b) => b[1]), ...asks.map((a) => a[1]))
  const bestBid = bids[0]?.[0]
  const bestAsk = asks[0]?.[0]
  const spread = bestBid !== undefined && bestAsk !== undefined ? bestAsk - bestBid : undefined
  const sum = (a: [number, number][]) => a.reduce((s, r) => s + r[1], 0)
  const dp = (v: number) => (Number.isInteger(v) ? 0 : 2)
  const label = `Order book. Best bid ${bestBid ?? 'none'}, best ask ${bestAsk ?? 'none'}${spread !== undefined ? `, spread ${spread.toFixed(2)}` : ''}. Total bid quantity ${fmtIN(sum(bids))}, total ask quantity ${fmtIN(sum(asks))}.`
  return (
    <Frame title={spec.title} caption={spec.caption} label={label}>
      <div className="mx-auto max-w-xl">
        <div className="grid grid-cols-2 gap-2 pb-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg-2">
          <div className="flex justify-between px-2"><span className="text-bull">▲ Bids · Qty</span><span>Price</span></div>
          <div className="flex justify-between px-2"><span>Price</span><span className="text-bear">Qty · Asks ▼</span></div>
        </div>
        {spread !== undefined ? (
          <div className="mb-2 flex items-center justify-center gap-2 rounded-lg border border-gold/40 bg-gold/[0.08] py-1.5 font-mono text-[0.76rem] text-gold">
            <span aria-hidden>◂</span> Spread <span className="num font-semibold">{fmtIN(spread, 2)}</span> <span className="text-fg-2">(best ask − best bid)</span> <span aria-hidden>▸</span>
          </div>
        ) : null}
        <div className="flex flex-col gap-1">
          {Array.from({ length: n }, (_, i) => {
            const b = bids[i]
            const a = asks[i]
            return (
              <div key={i} className="grid grid-cols-2 gap-2">
                <div className="relative flex h-8 items-center justify-between overflow-hidden rounded-md bg-white/[0.025] px-2 font-mono text-[0.8rem]">
                  {b ? <span aria-hidden className="absolute inset-y-0 right-0 bg-bull/20" style={{ width: `${(b[1] / maxQ) * 100}%` }} /> : null}
                  {b ? (
                    <>
                      <span className="num relative text-fg">{fmtIN(b[1])}</span>
                      <span className={cn('num relative', i === 0 ? 'font-semibold text-bull' : 'text-fg')}>{fmtIN(b[0], dp(b[0]) || (b[0] % 1 ? 2 : 0))}</span>
                    </>
                  ) : null}
                </div>
                <div className="relative flex h-8 items-center justify-between overflow-hidden rounded-md bg-white/[0.025] px-2 font-mono text-[0.8rem]">
                  {a ? <span aria-hidden className="absolute inset-y-0 left-0 bg-bear/20" style={{ width: `${(a[1] / maxQ) * 100}%` }} /> : null}
                  {a ? (
                    <>
                      <span className={cn('num relative', i === 0 ? 'font-semibold text-bear' : 'text-fg')}>{fmtIN(a[0], dp(a[0]) || (a[0] % 1 ? 2 : 0))}</span>
                      <span className="num relative text-fg">{fmtIN(a[1])}</span>
                    </>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[0.74rem] text-fg-2">
          <span className="px-2"><span className="text-bull">▲</span> Total bid qty <span className="num text-fg">{fmtIN(sum(bids))}</span></span>
          <span className="px-2 text-right">Total ask qty <span className="num text-fg">{fmtIN(sum(asks))}</span> <span className="text-bear">▼</span></span>
        </div>
      </div>
    </Frame>
  )
}
