import type { ReactNode } from 'react'
import { cn } from '@/components/ui'
import { fmtIN, fmtRupee } from '@/lib/format'

/* Shared building blocks for the calculator registry. */

export type Vals = Record<string, string>
export type Preset = Record<string, number | string>

export interface Ctx {
  n: (k: string) => number
  s: (k: string) => string
  label: (k: string) => string
}

export interface FieldDef {
  key: string
  label: string
  kind: 'num' | 'enum' | 'text'
  options?: { value: string; label: string }[]
  hint?: string
  group?: 'rates'
}

export interface CalcDef {
  title: string
  blurb: string
  defaults: Preset
  fields: FieldDef[]
  formula: string
  caveat?: string
  result: (c: Ctx) => ReactNode
}

export type Tone = 'fg' | 'gold' | 'ice' | 'bull' | 'bear' | 'dim'
const toneCls: Record<Tone, string> = {
  fg: 'text-fg',
  gold: 'text-gold',
  ice: 'text-ice',
  bull: 'text-bull',
  bear: 'text-bear',
  dim: 'text-fg-2',
}

export const NUM = (key: string, label: string, hint?: string, group?: 'rates'): FieldDef => ({ key, label, kind: 'num', hint, group })
export const ENUM = (key: string, label: string, options: [string, string][]): FieldDef => ({
  key,
  label,
  kind: 'enum',
  options: options.map(([value, l]) => ({ value, label: l })),
})
export const TEXT = (key: string, label: string, hint?: string): FieldDef => ({ key, label, kind: 'text', hint })

export const OPT_TYPE = ENUM('optType', 'Option type', [['CE', 'Call (CE)'], ['PE', 'Put (PE)']])
export const SIDE_BS = ENUM('side', 'Position', [['buy', 'Buy'], ['sell', 'Sell']])

/* ── formatting ── */
export const r2 = (x: number) => fmtIN(x, 2)
export const r0 = (x: number) => fmtIN(x, 0)
export const dp = (x: number, d: number) => (Number.isFinite(x) ? x.toFixed(d) : '—')
export const pct = (x: number, d = 2) => (Number.isFinite(x) ? `${x.toFixed(d)}%` : '—')
export const money = (x: number, d = 0) => fmtRupee(x, d)
export const plain = (x: number, d = 2) => (Number.isFinite(x) ? `${x < 0 ? '−' : ''}${fmtIN(Math.abs(x), d === 0 ? 0 : 2)}` : '—')

/** Signed value with ▲/▼ so direction never relies on colour alone. */
export function signed(x: number, fmt: (v: number) => string): string {
  if (!Number.isFinite(x)) return '—'
  if (Math.abs(x) < 1e-9) return fmt(0)
  return `${x > 0 ? '▲ +' : '▼ −'}${fmt(Math.abs(x))}`
}
export const pnlTone = (x: number): Tone => (!Number.isFinite(x) || Math.abs(x) < 1e-9 ? 'fg' : x > 0 ? 'bull' : 'bear')

/* ── result primitives ── */
export function Row({ label, value, tone = 'fg', big, sub }: { label: string; value: ReactNode; tone?: Tone; big?: boolean; sub?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line/60 py-1.5 last:border-b-0">
      <dt className="min-w-0 text-[0.8rem] leading-snug text-fg-2">
        {label}
        {sub && <span className="block text-[0.7rem] text-fg-3">{sub}</span>}
      </dt>
      <dd className={cn('num min-w-0 text-right break-words', big ? 'text-[1.35rem] leading-tight font-semibold' : 'text-[0.9rem]', toneCls[tone])}>{value}</dd>
    </div>
  )
}
export const Rows = ({ children }: { children: ReactNode }) => <dl className="m-0">{children}</dl>

export const Hint = ({ children }: { children: ReactNode }) => (
  <p className="rounded-lg border border-gold/25 bg-gold/[0.06] px-3 py-2 text-[0.8rem] leading-snug text-fg-2">{children}</p>
)
export const Note = ({ children, tone = 'dim' }: { children: ReactNode; tone?: Tone }) => (
  <p className={cn('mt-3 text-[0.8rem] leading-relaxed', toneCls[tone])}>{children}</p>
)

/** Validate inputs. Returns a gentle hint node for the first invalid input, else null. */
export function bad(c: Ctx, spec: Record<string, 'pos' | 'nonneg' | 'num'>): ReactNode | null {
  for (const k of Object.keys(spec)) {
    const v = c.n(k)
    const rule = spec[k]
    if (!Number.isFinite(v)) return <Hint>Enter a number for “{c.label(k)}”.</Hint>
    if (rule === 'pos' && v <= 0) return <Hint>“{c.label(k)}” must be greater than zero.</Hint>
    if (rule === 'nonneg' && v < 0) return <Hint>“{c.label(k)}” cannot be negative.</Hint>
  }
  return null
}

/** Parse "a:b;c:d" strips. Returns rows with exactly `cols` finite numbers, plus a count of skipped chunks. */
export function parseRows(src: string, cols: number): { rows: number[][]; skipped: number } {
  const rows: number[][] = []
  let skipped = 0
  for (const chunk of src.split(/[;\n]/)) {
    const t = chunk.trim()
    if (!t) continue
    const parts = t.split(':').map((p) => Number(p.trim().replace(/,/g, '')))
    if (parts.length === cols && parts.every((p) => Number.isFinite(p) && p >= 0)) rows.push(parts)
    else skipped++
  }
  return { rows, skipped }
}

/** Stacked horizontal bar of non-negative segments. */
export function StackBar({ parts }: { parts: { label: string; value: number; cls: string }[] }) {
  const total = parts.reduce((a, p) => a + Math.max(p.value, 0), 0)
  if (total <= 0) return null
  return (
    <div className="mt-3">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/[0.05]" role="img" aria-label={parts.map((p) => `${p.label} ${r2(p.value)}`).join(', ')}>
        {parts.map((p) => (
          <div key={p.label} className={p.cls} style={{ width: `${(Math.max(p.value, 0) / total) * 100}%` }} />
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] text-fg-2">
        {parts.map((p) => (
          <span key={p.label} className="inline-flex items-center gap-1.5">
            <span className={cn('inline-block size-2 rounded-sm', p.cls)} />
            {p.label} <span className="num text-fg">{r2(p.value)}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/** Tiny hand-built expiry payoff chart (per unit). */
export function PayoffMini({ fn, lo, hi, breakeven, marker }: { fn: (x: number) => number; lo: number; hi: number; breakeven: number; marker: number }) {
  const W = 300
  const H = 120
  const pad = 14
  const N = 60
  const xs = Array.from({ length: N + 1 }, (_, i) => lo + ((hi - lo) * i) / N)
  const ys = xs.map(fn)
  const ymin = Math.min(0, ...ys)
  const ymax = Math.max(0, ...ys)
  const span = ymax - ymin || 1
  const X = (x: number) => pad + ((x - lo) / (hi - lo)) * (W - 2 * pad)
  const Y = (y: number) => pad + (1 - (y - ymin) / span) * (H - 2 * pad)
  const pts = xs.map((x, i) => `${X(x).toFixed(1)},${Y(ys[i]).toFixed(1)}`).join(' ')
  const my = fn(marker)
  const inRange = (x: number) => x >= lo && x <= hi
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-auto w-full max-w-full" role="img" aria-label="Payoff at expiry per unit, with breakeven and expiry price marked">
      <line x1={pad} x2={W - pad} y1={Y(0)} y2={Y(0)} className="stroke-line-strong" strokeWidth="1" />
      <text x={W - pad} y={Y(0) - 4} textAnchor="end" className="fill-fg-3" fontSize="9">0</text>
      <polyline points={pts} fill="none" className="stroke-gold" strokeWidth="2" strokeLinejoin="round" />
      {inRange(breakeven) && (
        <g>
          <line x1={X(breakeven)} x2={X(breakeven)} y1={pad - 4} y2={H - pad + 4} className="stroke-ice" strokeWidth="1" strokeDasharray="3 3" />
          <text x={X(breakeven)} y={H - 2} textAnchor="middle" className="fill-ice" fontSize="9">BE</text>
        </g>
      )}
      {inRange(marker) && (
        <g>
          <circle cx={X(marker)} cy={Y(my)} r="4.5" className={my > 0 ? 'fill-bull' : my < 0 ? 'fill-bear' : 'fill-fg'} />
          <text x={X(marker)} y={Math.max(Y(my) - 8, 10)} textAnchor="middle" className="fill-fg" fontSize="9">expiry</text>
        </g>
      )}
    </svg>
  )
}

export const LOT_DEFAULT = 65
export const STRIKE_STEP = 50

/** ITM / ATM / OTM with ATM = within half a strike step. */
export function classify(type: 'CE' | 'PE', spot: number, strike: number): 'ITM' | 'ATM' | 'OTM' {
  if (Math.abs(spot - strike) <= STRIKE_STEP / 2) return 'ATM'
  const itm = type === 'CE' ? spot > strike : spot < strike
  return itm ? 'ITM' : 'OTM'
}
