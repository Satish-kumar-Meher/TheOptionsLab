import { motion } from 'motion/react'
import { cn } from '@/components/ui'
import { chart } from '@/lib/chartTheme'
import { fmtIN } from '@/lib/format'
import { AXIS, EASE, FG, FG2, FG3, Frame, GRID, MONO, TONE, Tag, useReduced, useWidth, type Spec } from './shared'

/* ─────────────────────────────── candles ─────────────────────────────── */
type Row = [gap: number, body: number, upWick: number, downWick: number]
interface C {
  o: number
  h: number
  l: number
  c: number
}
const build = (rows: Row[], start = 100): C[] => {
  let p = start
  return rows.map(([g, b, u, l]) => {
    const o = p + g
    const c = o + b
    p = c
    return { o, c, h: Math.max(o, c) + u, l: Math.min(o, c) - l }
  })
}
const mirror = (rows: Row[]): Row[] => rows.map(([g, b, u, l]) => [-g, -b, l, u])

const UP: Row[] = [[0, 2, 0.6, 0.4], [0, 1.5, 0.5, 0.8], [0, -1.2, 0.5, 0.4], [0, 2.5, 0.4, 0.5], [0, 2, 0.6, 0.3], [0, -1, 0.4, 0.7], [0, 2.8, 0.5, 0.3], [0, 1.2, 0.7, 0.4], [0, -1.5, 0.3, 0.6], [0, 3, 0.5, 0.3], [0, 1.5, 0.5, 0.5], [0, -0.8, 0.4, 0.5], [0, 2.5, 0.6, 0.3], [0, 2, 0.5, 0.4]]
const RANGE: Row[] = [[0, 2, 0.8, 0.8], [0, 2, 0.6, 1], [0, -2.5, 0.8, 0.6], [0, -2, 0.5, 0.9], [0, 2.2, 0.7, 0.5], [0, 2.5, 0.9, 0.4], [0, -2, 0.7, 0.7], [0, -2.3, 0.4, 1], [0, 2, 0.8, 0.5], [0, 2.2, 0.8, 0.5], [0, -2.4, 0.6, 0.6], [0, -1.8, 0.4, 0.9]]
const FLAT: Row[] = [[0, 1, 0.5, 0.5], [0, -0.8, 0.4, 0.5], [0, 1.2, 0.5, 0.4], [0, -1, 0.4, 0.5], [0, 0.8, 0.5, 0.4], [0, 0.5, 0.4, 0.4]]
const ACC: Row[] = [...mirror(UP).slice(0, 6), [0, 0.8, 0.5, 0.5], [0, -0.9, 0.5, 0.5], [0, 0.9, 0.5, 0.4], [0, -1, 0.4, 0.5], [0, -0.9, 0.3, 2.6], [0, 1.5, 0.4, 0.3], [0, 0.8, 0.5, 0.4], [0, -0.7, 0.5, 0.4], [0, 2.5, 0.5, 0.3], [0, 2.2, 0.4, 0.3], [0, 1.8, 0.5, 0.3]]

interface Pat {
  rows: Row[]
  mark: [index: number, text: string]
  level: (cs: C[]) => number
  desc: string
}
const maxH = (cs: C[], a: number, b: number) => Math.max(...cs.slice(a, b + 1).map((c) => c.h))
const minL = (cs: C[], a: number, b: number) => Math.min(...cs.slice(a, b + 1).map((c) => c.l))

const PATTERNS: Record<Spec<'candles'>['pattern'], Pat> = {
  uptrend: { rows: UP, mark: [5, 'Higher low'], level: (cs) => minL(cs, 8, 13), desc: 'Candles make higher highs and higher lows with small pullbacks.' },
  downtrend: { rows: mirror(UP), mark: [5, 'Lower high'], level: (cs) => maxL(cs), desc: 'Candles make lower highs and lower lows with small bounces.' },
  range: { rows: RANGE, mark: [5, 'Range high'], level: (cs) => maxH(cs, 0, 11), desc: 'Price oscillates between a floor and a ceiling without progress.' },
  breakout: { rows: [...RANGE.slice(0, 8), [0, 3.5, 0.6, 0.2], [0, 2.5, 0.5, 0.3], [0, -1.2, 0.3, 0.6], [0, 3, 0.5, 0.2], [0, 2.5, 0.4, 0.3]], mark: [8, 'Closes above range'], level: (cs) => maxH(cs, 0, 7), desc: 'A range holds, then a strong candle closes above the ceiling and price holds the retest.' },
  breakdown: { rows: [...mirror(RANGE).slice(0, 8), ...mirror([[0, 3.5, 0.6, 0.2], [0, 2.5, 0.5, 0.3], [0, -1.2, 0.3, 0.6], [0, 3, 0.5, 0.2], [0, 2.5, 0.4, 0.3]])], mark: [8, 'Closes below range'], level: (cs) => minL(cs, 0, 7), desc: 'A range holds, then a strong candle closes below the floor and a bounce fails.' },
  falseBreakout: { rows: [...RANGE.slice(0, 8), [0, 2, 4, 0.3], [0, -2.5, 0.4, 0.5], [0, -3, 0.3, 0.4], [0, -2, 0.4, 0.5], [0, -1, 0.3, 0.6]], mark: [8, 'Wick above, closes back'], level: (cs) => maxH(cs, 0, 7), desc: 'Price pokes above the ceiling, fails to hold, closes back inside the range and then falls.' },
  gapUp: { rows: [...FLAT, [2.5, 2, 0.5, 0.3], [0, 1.5, 0.4, 0.4], [0, -1, 0.3, 0.5], [0, 2, 0.5, 0.3], [0, 1.5, 0.4, 0.3]], mark: [6, 'Gap up'], level: (cs) => maxH(cs, 0, 5), desc: 'A candle opens well above the previous high, leaving an empty gap on the chart.' },
  gapDown: { rows: [...mirror(FLAT), ...mirror([[2.5, 2, 0.5, 0.3], [0, 1.5, 0.4, 0.4], [0, -1, 0.3, 0.5], [0, 2, 0.5, 0.3], [0, 1.5, 0.4, 0.3]])], mark: [6, 'Gap down'], level: (cs) => minL(cs, 0, 5), desc: 'A candle opens well below the previous low, leaving an empty gap on the chart.' },
  doji: { rows: [...UP.slice(0, 8), [0, 0.1, 2.2, 2], [0, -2, 0.4, 0.5], [0, -2.5, 0.3, 0.6], [0, -1, 0.4, 0.6]], mark: [8, 'Doji: open ≈ close'], level: (cs) => cs[8].l, desc: 'After a rise, one candle opens and closes at almost the same price with long wicks, showing indecision.' },
  hammer: { rows: [...mirror(UP).slice(0, 7), [0, 0.8, 0.2, 3.8], [0, 2.5, 0.4, 0.3], [0, 2, 0.4, 0.4], [0, 1.5, 0.5, 0.3]], mark: [7, 'Long lower wick'], level: (cs) => cs[7].l, desc: 'After a fall, one candle trades far lower but closes near its high, leaving a long lower wick.' },
  engulfing: { rows: [[0, -1.2, 0.5, 0.5], [0, -1.5, 0.4, 0.5], [0, -1, 0.5, 0.6], [0, -1.8, 0.4, 0.4], [0, -1.2, 0.5, 0.5], [0, -1, 0.4, 0.5], [-0.3, 3.6, 0.4, 0.3], [0, 2, 0.4, 0.3], [0, 1.5, 0.5, 0.3], [0, -0.8, 0.3, 0.5]], mark: [6, 'Body engulfs prior'], level: (cs) => cs[6].l, desc: 'After small falling candles, a large rising candle has a body that covers the previous candle body.' },
  accumulation: { rows: ACC, mark: [10, 'Dip below, recovers'], level: (cs) => minL(cs, 6, 9), desc: 'After a fall, price moves sideways near the lows, makes one brief dip below support, then rises.' },
  distribution: { rows: mirror(ACC), mark: [10, 'Poke above, fails'], level: (cs) => maxH(cs, 6, 9), desc: 'After a rise, price moves sideways near the highs, makes one brief poke above resistance, then falls.' },
}
function maxL(cs: C[]) {
  return maxH(cs, 8, 13)
}

export function CandlesVisual({ spec }: { spec: Spec<'candles'> }) {
  const reduce = useReduced()
  const [ref, w] = useWidth(260)
  const pat = PATTERNS[spec.pattern]
  const cs = build(pat.rows)
  const lvl = pat.level(cs)
  const h = w < 480 ? 250 : 310
  const m = { t: 30, r: 12, b: 14, l: 12 }
  const hi = Math.max(...cs.map((c) => c.h))
  const lo = Math.min(...cs.map((c) => c.l))
  const pad = (hi - lo) * 0.08
  const sy = (v: number) => m.t + ((hi + pad - v) / (hi - lo + pad * 2)) * (h - m.t - m.b)
  const slot = (w - m.l - m.r) / cs.length
  const bw = Math.min(slot * 0.62, 22)
  const cx = (i: number) => m.l + slot * (i + 0.5)
  const [mi, mt] = pat.mark
  const mk = cs[mi]
  const below = sy(mk.h) < m.t + 14
  const label = `Illustrative candlestick chart, pattern: ${spec.pattern}. ${pat.desc}${spec.level ? ` A dashed gold line marks ${spec.level.label} at ${fmtIN(spec.level.price)}.` : ''} Annotation: ${mt}.`
  return (
    <Frame title={spec.title} caption={spec.caption} label={label} badge="Illustrative">
      <div ref={ref} className="w-full min-w-0">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block max-w-full" aria-hidden>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={m.l} x2={w - m.r} y1={m.t + f * (h - m.t - m.b)} y2={m.t + f * (h - m.t - m.b)} stroke={GRID} strokeDasharray="3 5" />
          ))}
          {spec.pattern === 'gapUp' || spec.pattern === 'gapDown' ? (
            <rect x={cx(5)} width={cx(6) - cx(5)} y={Math.min(sy(cs[5].c), sy(cs[6].o))} height={Math.abs(sy(cs[5].c) - sy(cs[6].o))} fill={FG} fillOpacity={0.08} stroke={FG2} strokeDasharray="3 3" strokeOpacity={0.5} />
          ) : null}
          {spec.level ? (
            <g>
              <line x1={m.l} x2={w - m.r} y1={sy(lvl)} y2={sy(lvl)} stroke={chart.gold} strokeWidth={1.5} strokeDasharray="6 5" />
              <Tag x={w - m.r} y={sy(lvl) + (sy(lvl) > h * 0.5 ? 16 : -14)} anchor="end" text={`${spec.level.label} ${fmtIN(spec.level.price)}`} color={chart.gold} bounds={[m.l, w - m.r]} />
            </g>
          ) : null}
          {cs.map((c, i) => {
            const up = c.c >= c.o
            const col = up ? chart.bull : chart.bear
            const top = sy(Math.max(c.o, c.c))
            const bot = sy(Math.min(c.o, c.c))
            return (
              <motion.g key={i} initial={reduce ? false : { opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : i * 0.03 }}>
                <line x1={cx(i)} x2={cx(i)} y1={sy(c.h)} y2={sy(c.l)} stroke={col} strokeWidth={1.5} />
                <rect x={cx(i) - bw / 2} y={top} width={bw} height={Math.max(bot - top, 1.5)} rx={1.5} fill={up ? col : '#0B1015'} fillOpacity={up ? 0.85 : 1} stroke={col} strokeWidth={1.5} />
              </motion.g>
            )
          })}
          <Tag x={cx(mi)} y={below ? sy(mk.l) + 16 : sy(mk.h) - 12} text={mt} color={FG} bounds={[m.l, w - m.r]} />
        </svg>
      </div>
      <ul className="mt-3 flex list-none flex-wrap gap-x-5 gap-y-1.5 p-0 text-xs text-fg-2">
        <li><span aria-hidden className="mr-1.5 text-bull">▲</span>Filled body: closed higher than it opened</li>
        <li><span aria-hidden className="mr-1.5 text-bear">▼</span>Hollow body: closed lower than it opened</li>
      </ul>
      <p className="mt-2 text-[0.76rem] leading-relaxed text-fg-3">Hand-drawn shape for teaching, not real market data. Real charts are noisier.</p>
    </Frame>
  )
}

/* ─────────────────────────────── oi ─────────────────────────────── */
export function OiVisual({ spec }: { spec: Spec<'oi'> }) {
  const rows = [...spec.rows].sort((a, b) => b.strike - a.strike)
  const maxV = Math.max(1, ...rows.map((r) => Math.max(r.ce, r.pe)))
  const maxCe = Math.max(...rows.map((r) => r.ce))
  const maxPe = Math.max(...rows.map((r) => r.pe))
  const spot = spec.spot
  const spotIdx = spot === undefined ? -1 : rows.findIndex((r) => r.strike <= spot)
  const insertAt = spot === undefined ? -1 : spotIdx === -1 ? rows.length : spotIdx
  const peK = rows.find((r) => r.pe === maxPe)?.strike
  const ceK = rows.find((r) => r.ce === maxCe)?.strike
  const label = `Illustrative open interest by strike. Highest put OI at ${peK === undefined ? 'n/a' : fmtIN(peK)} (${fmtIN(maxPe)}), highest call OI at ${ceK === undefined ? 'n/a' : fmtIN(ceK)} (${fmtIN(maxCe)}).${spot !== undefined ? ` Spot ${fmtIN(spot)}.` : ''} ${rows.map((r) => `${fmtIN(r.strike)}: PE ${fmtIN(r.pe)}, CE ${fmtIN(r.ce)}`).join('; ')}.`
  const bar = (v: number, side: 'pe' | 'ce', top: boolean) => (
    <div className={cn('flex min-w-0 items-center gap-1.5', side === 'pe' ? 'flex-row-reverse' : 'flex-row')}>
      <span className={cn('h-4 shrink-0 rounded-sm', side === 'pe' ? 'bg-bull/80' : 'bg-bear/80', top && 'ring-1 ring-fg/70')} style={{ width: `calc(${(v / maxV) * 100}% * 0.5)` }} />
      <span className={cn('num whitespace-nowrap text-[0.74rem]', top ? 'font-semibold text-fg' : 'text-fg-2')}>{fmtIN(v)}</span>
    </div>
  )
  const items: React.ReactNode[] = rows.map((r) => (
    <li key={r.strike} className="grid grid-cols-[1fr_4.2rem_1fr] items-center gap-2 py-1">
      {bar(r.pe, 'pe', r.pe === maxPe)}
      <span className="num rounded-md bg-white/[0.04] py-0.5 text-center text-[0.8rem] text-fg">{fmtIN(r.strike)}</span>
      {bar(r.ce, 'ce', r.ce === maxCe)}
    </li>
  ))
  if (spot !== undefined) {
    items.splice(
      insertAt,
      0,
      <li key="spot" aria-hidden className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-0.5">
        <span className="h-px bg-gradient-to-l from-gold to-transparent" />
        <span className="rounded-full border border-gold/60 bg-gold/10 px-2.5 py-0.5 font-mono text-[0.7rem] text-gold">SPOT {fmtIN(spot)}</span>
        <span className="h-px bg-gradient-to-r from-gold to-transparent" />
      </li>,
    )
  }
  return (
    <Frame title={spec.title} caption={spec.caption} label={label} badge="Illustrative">
      <div className="grid grid-cols-[1fr_4.2rem_1fr] gap-2 border-b border-line pb-2 font-mono text-[0.68rem] uppercase tracking-[0.08em]">
        <span className="text-right text-bull">Put OI ▲</span>
        <span className="text-center text-fg-3">Strike</span>
        <span className="text-bear">▼ Call OI</span>
      </div>
      <ul className="m-0 mt-1 flex list-none flex-col p-0">{items}</ul>
      <p className="mt-3 text-[0.76rem] leading-relaxed text-fg-3">
        Outlined bars mark the largest OI on each side. High OI can act as a possible support or resistance zone, not a guarantee, and OI alone cannot show who opened the positions.
      </p>
    </Frame>
  )
}

/* ─────────────────────────────── gauge ─────────────────────────────── */
export function GaugeVisual({ spec }: { spec: Spec<'gauge'> }) {
  const { min, max, unit } = spec
  const value = Math.min(max, Math.max(min, spec.value))
  const W = 340
  const cxp = W / 2
  const cyp = 168
  const R = 128
  const rw = 24
  const ang = (v: number) => Math.PI * (1 - (v - min) / (max - min || 1))
  const pt = (v: number, r: number): [number, number] => [cxp + r * Math.cos(ang(v)), cyp - r * Math.sin(ang(v))]
  const arc = (a: number, b: number) => {
    const [x1, y1] = pt(a, R)
    const [x2, y2] = pt(b, R)
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}A${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`
  }
  const zones = spec.zones.map((z) => ({ ...z, from: Math.max(min, z.from), to: Math.min(max, z.to) }))
  const cur = zones.find((z) => value >= z.from && value <= z.to)
  const [nx, ny] = pt(value, R - 12)
  const v = `${fmtIN(spec.value, Number.isInteger(spec.value) ? 0 : 2)}${unit ? (/^[%x×]/.test(unit) ? unit : ` ${unit}`) : ''}`
  const label = `Gauge from ${min} to ${max}. Current value ${v}${cur ? `, in the "${cur.label}" zone` : ''}. Zones: ${zones.map((z) => `${z.label} ${z.from} to ${z.to}`).join('; ')}.`
  const reduce = useReduced()
  return (
    <Frame title={spec.title} caption={spec.caption} label={label}>
      <div className="mx-auto grid max-w-3xl items-center gap-5 md:grid-cols-[minmax(0,22rem)_1fr]">
        <svg viewBox={`0 0 ${W} 196`} className="mx-auto block w-full max-w-[22rem]" aria-hidden>
          <path d={arc(min, max)} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={rw + 6} strokeLinecap="butt" />
          {zones.map((z, i) => {
            const t = z.tone ?? 'neutral'
            const col = t === 'neutral' ? '#5B6672' : TONE[t].hex
            return <path key={i} d={arc(z.from + (max - min) * 0.004, z.to - (max - min) * 0.004)} fill="none" stroke={col} strokeOpacity={cur === z ? 1 : 0.55} strokeWidth={rw} />
          })}
          <text x={pt(min, R)[0]} y={cyp + 20} textAnchor="middle" fontSize={12} fontFamily={MONO} fill={FG2}>{min}</text>
          <text x={pt(max, R)[0]} y={cyp + 20} textAnchor="middle" fontSize={12} fontFamily={MONO} fill={FG2}>{max}</text>
          <motion.g initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
            <line x1={cxp} y1={cyp} x2={nx} y2={ny} stroke={FG} strokeWidth={3} strokeLinecap="round" />
            <circle cx={cxp} cy={cyp} r={7} fill="#0B1015" stroke={FG} strokeWidth={2.5} />
          </motion.g>
          <text x={cxp} y={cyp - 38} textAnchor="middle" fontSize={26} fontWeight={600} fontFamily={MONO} fill={FG}>{v}</text>
        </svg>
        <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
          {zones.map((z, i) => {
            const t = z.tone ?? 'neutral'
            const on = cur === z
            return (
              <li key={i} className={cn('flex items-center gap-3 rounded-lg border px-3 py-2 text-[0.86rem]', on ? 'border-gold/60 bg-gold/[0.08]' : 'border-line bg-surface/50')}>
                <span aria-hidden className="h-3 w-3 shrink-0 rounded-sm" style={{ background: t === 'neutral' ? '#5B6672' : TONE[t].hex }} />
                <span className="min-w-0 flex-1 text-fg">
                  {TONE[t].glyph && (t === 'bull' || t === 'bear') ? <span aria-hidden className={cn('mr-1.5 text-xs', TONE[t].text)}>{TONE[t].glyph}</span> : null}
                  {z.label}
                </span>
                <span className="num text-[0.76rem] text-fg-2">{z.from}–{z.to}</span>
                {on ? <span className="font-mono text-[0.68rem] uppercase tracking-wide text-gold">now</span> : null}
              </li>
            )
          })}
        </ul>
      </div>
    </Frame>
  )
}

export { AXIS, FG3 }
