import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts'
import { axisProps, chart, gridProps, tooltipStyle } from '@/lib/chartTheme'
import { STEPS, minuteLabel } from '@/lib/expirySim'

export interface SeriesDef { key: string; name: string; color: string; dash?: string; width?: number }
export interface RefDef { y?: number; x?: number; label: string; color: string; dash?: string; pos?: 'left' | 'right' | 'insideTopRight' | 'insideTopLeft' }
export type Row = { i: number } & Record<string, number | undefined>

const ticks = [0, 30, 60, 90, 120, 150]

/** Time-series line chart on the 13:00–15:30 axis. Rows beyond the scrub position simply have no values. */
export function TimeChart({ data, series, cursor, refs = [], yFmt, domain, height = 240, ariaLabel, tipFmt }: {
  data: Row[]
  series: SeriesDef[]
  cursor: number
  refs?: RefDef[]
  yFmt: (v: number) => string
  domain?: [number | string, number | string]
  height?: number
  ariaLabel: string
  tipFmt?: (v: number) => string
}) {
  return (
    <div style={{ height }} role="img" aria-label={ariaLabel} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 28, bottom: 0, left: 0 }}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="i" type="number" domain={[0, STEPS - 1]} ticks={ticks} tickFormatter={(v: number) => minuteLabel(v)} {...axisProps} />
          <YAxis domain={domain ?? ['auto', 'auto']} tickFormatter={yFmt} width={58} {...axisProps} />
          <RTooltip {...tooltipStyle} labelFormatter={(v) => minuteLabel(Number(v))} formatter={(v, n) => [tipFmt ? tipFmt(Number(v)) : yFmt(Number(v)), String(n)]} isAnimationActive={false} />
          {refs.map((r) => (
            <ReferenceLine key={`${r.label}-${r.y ?? r.x}`} y={r.y} x={r.x} stroke={r.color} strokeDasharray={r.dash ?? '4 4'} strokeOpacity={0.7} label={{ value: r.label, fill: r.color, fontSize: 10, position: r.pos ?? 'insideTopRight' }} ifOverflow="hidden" />
          ))}
          <ReferenceLine x={cursor} stroke={chart.fg} strokeOpacity={0.55} />
          {series.map((s) => (
            <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={s.width ?? 1.8} strokeDasharray={s.dash} dot={false} isAnimationActive={false} connectNulls={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function Legend({ items }: { items: { name: string; color: string; dash?: boolean }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] text-fg-2">
      {items.map((it) => (
        <li key={it.name} className="inline-flex items-center gap-2">
          <svg width="18" height="6" aria-hidden><line x1="0" x2="18" y1="3" y2="3" stroke={it.color} strokeWidth="2" strokeDasharray={it.dash ? '4 3' : undefined} /></svg>
          {it.name}
        </li>
      ))}
    </ul>
  )
}
