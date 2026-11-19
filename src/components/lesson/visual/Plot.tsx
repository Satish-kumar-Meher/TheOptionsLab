import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { AXIS, EASE, FG2, FG3, GRID, MONO, Tag, niceTicks, useReduced, useWidth } from './shared'

export interface Series {
  name: string
  pts: [number, number][]
  color: string
  dash?: string
}

export const PM = { top: 16, right: 16, bottom: 36, left: 54 }

export const pathOf = (pts: [number, number][], sx: (x: number) => number, sy: (y: number) => number) =>
  pts.map(([x, y], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`).join('')

export function DrawPath({ d, color, dash, width = 2.2 }: { d: string; color: string; dash?: string; width?: number }) {
  const reduce = useReduced()
  if (reduce || dash) return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinejoin="round" strokeLinecap="round" />
  return <motion.path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }} />
}

export interface PlotProps {
  xDomain: [number, number]
  yDomain: [number, number]
  series?: Series[]
  xFmt?: (v: number) => string
  yFmt?: (v: number) => string
  xTicks?: number[]
  xLabel?: string
  yLabel?: string
  zeroLine?: boolean
  height?: number
  /** Extra drawing: receives scale functions + plot box. `under` renders behind the series. */
  under?: (g: PlotGeom) => ReactNode
  over?: (g: PlotGeom) => ReactNode
}

export interface PlotGeom {
  w: number
  h: number
  sx: (x: number) => number
  sy: (y: number) => number
  x0: number
  x1: number
  y0: number
  y1: number
}

export function Plot({ xDomain, yDomain, series = [], xFmt = (v) => String(v), yFmt = (v) => String(v), xTicks, xLabel, yLabel, zeroLine, height, under, over }: PlotProps) {
  const [ref, w] = useWidth(260)
  const h = height ?? (w < 480 ? 250 : 300)
  const x0 = PM.left
  const x1 = w - PM.right
  const y0 = PM.top
  const y1 = h - PM.bottom
  const [xa, xb] = xDomain
  const [ya, yb] = yDomain
  const sx = (x: number) => x0 + ((x - xa) / (xb - xa || 1)) * (x1 - x0)
  const sy = (y: number) => y1 - ((y - ya) / (yb - ya || 1)) * (y1 - y0)
  const g: PlotGeom = { w, h, sx, sy, x0, x1, y0, y1 }
  const yT = niceTicks(Math.min(ya, yb), Math.max(ya, yb), 5)
  const xT = xTicks ?? niceTicks(Math.min(xa, xb), Math.max(xa, xb), w < 480 ? 4 : 6)
  return (
    <div ref={ref} className="w-full min-w-0">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block max-w-full" aria-hidden>
        {yT.map((t) => (
          <g key={`y${t}`}>
            <line x1={x0} x2={x1} y1={sy(t)} y2={sy(t)} stroke={GRID} strokeDasharray="3 5" />
            <text x={x0 - 8} y={sy(t) + 4} textAnchor="end" fontSize={11} fontFamily={MONO} fill={FG2}>
              {yFmt(t)}
            </text>
          </g>
        ))}
        {xT.map((t) => (
          <g key={`x${t}`}>
            <line x1={sx(t)} x2={sx(t)} y1={y1} y2={y1 + 4} stroke={AXIS} />
            <text x={sx(t)} y={y1 + 18} textAnchor="middle" fontSize={11} fontFamily={MONO} fill={FG2}>
              {xFmt(t)}
            </text>
          </g>
        ))}
        <line x1={x0} x2={x1} y1={y1} y2={y1} stroke={AXIS} />
        <line x1={x0} x2={x0} y1={y0} y2={y1} stroke={AXIS} />
        {zeroLine && 0 > Math.min(ya, yb) && 0 < Math.max(ya, yb) ? <line x1={x0} x2={x1} y1={sy(0)} y2={sy(0)} stroke="rgba(255,255,255,0.32)" /> : null}
        {under?.(g)}
        {series.map((s) => (
          <DrawPath key={s.name} d={pathOf(s.pts, sx, sy)} color={s.color} dash={s.dash} />
        ))}
        {over?.(g)}
        {xLabel ? (
          <text x={(x0 + x1) / 2} y={h - 4} textAnchor="middle" fontSize={11} fontFamily={MONO} fill={FG3}>
            {xLabel}
          </text>
        ) : null}
        {yLabel ? (
          <text transform={`translate(12 ${(y0 + y1) / 2}) rotate(-90)`} textAnchor="middle" fontSize={11} fontFamily={MONO} fill={FG3}>
            {yLabel}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

export { Tag }
