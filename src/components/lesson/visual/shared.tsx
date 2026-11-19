import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Badge, cn } from '@/components/ui'
import type { Tone, VisualSpec } from '@/data/topicLessonTypes'
import { chart } from '@/lib/chartTheme'

export type Spec<K extends VisualSpec['kind']> = Extract<VisualSpec, { kind: K }>

/** Tone → classes + hex. green/red only for bull/bear; everything else is gold / ice / neutral grey. */
export const TONE: Record<Tone, { hex: string; text: string; border: string; bg: string; dot: string; glyph: string }> = {
  bull: { hex: chart.bull, text: 'text-bull', border: 'border-bull/45', bg: 'bg-bull/[0.07]', dot: 'bg-bull', glyph: '▲' },
  bear: { hex: chart.bear, text: 'text-bear', border: 'border-bear/45', bg: 'bg-bear/[0.07]', dot: 'bg-bear', glyph: '▼' },
  gold: { hex: chart.gold, text: 'text-gold', border: 'border-gold/45', bg: 'bg-gold/[0.07]', dot: 'bg-gold', glyph: '' },
  ice: { hex: chart.ice, text: 'text-ice', border: 'border-ice/45', bg: 'bg-ice/[0.07]', dot: 'bg-ice', glyph: '' },
  neutral: { hex: '#929DA9', text: 'text-fg-2', border: 'border-line-strong', bg: 'bg-white/[0.03]', dot: 'bg-fg-3', glyph: '' },
}

export const EASE = [0.16, 1, 0.3, 1] as const

export function useReduced(): boolean {
  return useReducedMotion() ?? false
}

/** Observe the width of a block so SVG charts can be drawn in real pixels (text stays ≥ 11px at any width). */
export function useWidth(min = 240, initial = 640) {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(initial)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const set = () => setW(Math.max(min, Math.round(el.clientWidth)))
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [min])
  return [ref, w] as const
}

export function Frame({ title, caption, label, badge, className, children }: { title: string; caption?: string; label: string; badge?: string; className?: string; children: ReactNode }) {
  const reduce = useReduced()
  const cls = cn('relative my-6 overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-surface-2/70 to-surface/90 p-4 shadow-[var(--shadow-glass)] sm:p-6', className)
  const inner = (
    <>
      <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="mb-4 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <span className="eyebrow">Figure</span>
          <h4 className="mt-1.5 font-display text-[1.05rem] font-semibold leading-snug text-fg">{title}</h4>
        </div>
        {badge ? <Badge tone="gold">{badge}</Badge> : null}
      </div>
      <div role="img" aria-label={label} className="min-w-0">
        {children}
      </div>
      {caption ? <figcaption className="mt-4 border-t border-line pt-3 text-sm leading-relaxed text-fg-2">{caption}</figcaption> : null}
    </>
  )
  if (reduce) return <figure className={cls}>{inner}</figure>
  return (
    <motion.figure className={cls} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, ease: EASE }}>
      {inner}
    </motion.figure>
  )
}

export function niceTicks(lo: number, hi: number, target: number): number[] {
  const span = hi - lo || 1
  const raw = span / target
  const pow = 10 ** Math.floor(Math.log10(raw))
  const f = raw / pow
  const step = (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * pow
  const out: number[] = []
  for (let v = Math.ceil(lo / step - 1e-9) * step; v <= hi + 1e-9; v += step) out.push(Math.abs(v) < step * 1e-9 ? 0 : v)
  return out
}

export const signed = (v: number, dp = 0) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v).toLocaleString('en-IN', { maximumFractionDigits: dp, minimumFractionDigits: dp })}`

export function Swatch({ color, dash, className }: { color: string; dash?: string; className?: string }) {
  return (
    <svg width="22" height="8" viewBox="0 0 22 8" aria-hidden className={cn('shrink-0', className)}>
      <line x1="1" y1="4" x2="21" y2="4" stroke={color} strokeWidth="2.2" strokeDasharray={dash} strokeLinecap="round" />
    </svg>
  )
}

export function Legend({ items }: { items: { name: string; color: string; dash?: string }[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-fg-2">
      {items.map((s) => (
        <li key={s.name} className="flex items-center gap-2">
          <Swatch color={s.color} dash={s.dash} />
          {s.name}
        </li>
      ))}
    </ul>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3', className)}>{children}</span>
}

export const MONO = "'JetBrains Mono Variable', ui-monospace, monospace"
export const FG = '#F4F7FA'
export const FG2 = '#929DA9'
export const FG3 = '#66717D'
export const GRID = 'rgba(255,255,255,0.06)'
export const AXIS = 'rgba(255,255,255,0.16)'
export const BG = '#0B1015'

/** SVG label pill (opaque, so text stays legible over lines). `anchor` positions the pill relative to x. */
export function Tag({ x, y, text, color = FG, anchor = 'middle', bounds }: { x: number; y: number; text: string; color?: string; anchor?: 'start' | 'middle' | 'end'; bounds?: [number, number] }) {
  const w = text.length * 6.7 + 10
  let x0 = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2
  if (bounds) x0 = Math.min(Math.max(x0, bounds[0]), bounds[1] - w)
  return (
    <g>
      <rect x={x0} y={y - 9} width={w} height={18} rx={5} fill={BG} fillOpacity={0.92} stroke={color} strokeOpacity={0.45} />
      <text x={x0 + w / 2} y={y + 4} textAnchor="middle" fontSize={11} fontFamily={MONO} fill={color}>
        {text}
      </text>
    </g>
  )
}

export const unitJoin = (n: string, unit?: string) => (!unit ? n : /^[%x×σ]/.test(unit) ? `${n}${unit}` : `${n} ${unit}`)
