import { useId } from 'react'
import { chart } from '@/lib/chartTheme'
import { DEFAULT_INPUTS, sparkCurve } from '@/lib/payoff'
import type { Strategy } from '@/data/strategies'

const cache = new Map<string, { path: string; area: string; y0: number }>()
const W = 100
const H = 40

function shape(s: Strategy) {
  const hit = cache.get(s.slug)
  if (hit) return hit
  const { xs, ys } = sparkCurve(s.legs, { ...DEFAULT_INPUTS, unit: s.defaultUnit })
  const lo = Math.min(0, ...ys)
  const hi = Math.max(0, ...ys)
  const span = hi - lo || 1
  const px = (i: number) => ((xs[i] - xs[0]) / (xs[xs.length - 1] - xs[0])) * W
  const py = (v: number) => 4 + ((hi - v) / span) * (H - 8)
  const path = ys.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join('')
  const y0 = py(0)
  const area = `${path}L${W} ${y0.toFixed(1)}L0 ${y0.toFixed(1)}Z`
  const out = { path, area, y0 }
  cache.set(s.slug, out)
  return out
}

/** Tiny expiry-payoff silhouette, unique per structure. Decorative: the name next to it carries the meaning. */
export function Sparkline({ strategy, active, className }: { strategy: Strategy; active?: boolean; className?: string }) {
  const uid = useId().replace(/:/g, '')
  const { path, area, y0 } = shape(strategy)
  return (
    <svg aria-hidden viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={className}>
      <defs>
        <clipPath id={`${uid}u`}><rect x="0" y="0" width={W} height={y0} /></clipPath>
        <clipPath id={`${uid}d`}><rect x="0" y={y0} width={W} height={H - y0} /></clipPath>
      </defs>
      <g clipPath={`url(#${uid}u)`}><path d={area} fill={chart.bull} fillOpacity="0.22" /></g>
      <g clipPath={`url(#${uid}d)`}><path d={area} fill={chart.bear} fillOpacity="0.22" /></g>
      <line x1="0" x2={W} y1={y0} y2={y0} stroke="rgba(255,255,255,0.22)" strokeWidth="0.6" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
      <path d={path} fill="none" stroke={active ? chart.gold : chart.fg} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
