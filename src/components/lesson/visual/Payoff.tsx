import { useId, useMemo } from 'react'
import { chart } from '@/lib/chartTheme'
import { fmtIN } from '@/lib/format'
import { FG, Frame, Legend, Tag, signed, type Spec } from './shared'
import { DrawPath, Plot, pathOf } from './Plot'

type Leg = Spec<'payoff'>['legs'][number]

export const legPnl = (l: Leg, s: number): number => {
  if (l.type === 'FUT') return l.side * (s - l.strike)
  const intrinsic = l.type === 'CE' ? Math.max(s - l.strike, 0) : Math.max(l.strike - s, 0)
  return l.side * (intrinsic - (l.premium ?? 0))
}

export const legName = (l: Leg) => `${l.side === 1 ? 'Long' : 'Short'} ${fmtIN(l.strike)} ${l.type === 'FUT' ? 'futures' : l.type}${l.type !== 'FUT' && l.premium !== undefined ? ` @ ${l.premium}` : ''}`

export interface PayoffAnalysis {
  pts: [number, number][]
  lo: number
  hi: number
  yMin: number
  yMax: number
  breakevens: number[]
  maxProfit: string
  maxLoss: string
}

export function analyse(legs: Leg[], spot: number): PayoffAnalysis {
  const ls = legs.slice(0, 4)
  const ks = [...ls.map((l) => l.strike), spot]
  const mn = Math.min(...ks)
  const mx = Math.max(...ks)
  const span = Math.max(mx - mn, spot * 0.05)
  const lo = Math.round(mn - span * 0.7)
  const hi = Math.round(mx + span * 0.7)
  const xs = new Set<number>([lo, hi, ...ls.map((l) => l.strike)])
  for (let i = 0; i <= 240; i++) xs.add(lo + ((hi - lo) * i) / 240)
  const sorted = [...xs].sort((a, b) => a - b)
  const pts = sorted.map((x): [number, number] => [x, ls.reduce((s, l) => s + legPnl(l, x), 0)])
  const be: number[] = []
  for (let i = 1; i < pts.length; i++) {
    const [xa, ya] = pts[i - 1]
    const [xb, yb] = pts[i]
    if (ya === 0 && i === 1) be.push(xa)
    if (yb === 0) be.push(xb)
    else if (ya !== 0 && ya * yb < 0) be.push(xa + ((xb - xa) * -ya) / (yb - ya))
  }
  const breakevens = [...new Set(be.map((b) => Math.round(b * 100) / 100))]
  const ys = pts.map((p) => p[1])
  const yMax = Math.max(...ys)
  const yMin = Math.min(...ys)
  const sl = pts[1][1] - pts[0][1]
  const sr = pts[pts.length - 1][1] - pts[pts.length - 2][1]
  const eps = 1e-6
  const fmt = (v: number) => `${signed(v, Number.isInteger(v) ? 0 : 1)}`
  const at0 = ls.reduce((s, l) => s + legPnl(l, 0), 0)
  const openProfit = sr > eps || sl < -eps
  const openLoss = sr < -eps || sl > eps
  return {
    pts,
    lo,
    hi,
    yMin,
    yMax,
    breakevens,
    maxProfit: openProfit ? (sr > eps ? 'Open-ended' : `Up to ${fmt(at0)} (if spot → 0)`) : fmt(Math.max(yMax, 0)),
    maxLoss: openLoss ? (sr < -eps ? 'Open-ended' : `Up to ${fmt(at0)} (if spot → 0)`) : fmt(Math.min(yMin, 0)),
  }
}

export function PayoffPlot({ legs, spot }: { legs: Leg[]; spot: number }) {
  const uid = useId().replace(/:/g, '')
  const a = useMemo(() => analyse(legs, spot), [legs, spot])
  const pad = (a.yMax - a.yMin || 1) * 0.12
  const yDomain: [number, number] = [Math.min(a.yMin, 0) - pad, Math.max(a.yMax, 0) + pad]
  return (
    <Plot
      xDomain={[a.lo, a.hi]}
      yDomain={yDomain}
      xFmt={(v) => fmtIN(v)}
      yFmt={(v) => (v === 0 ? '0' : signed(v))}
      xLabel="Nifty at expiry"
      yLabel="P&L per unit (₹)"
      zeroLine
      under={(g) => {
        const line = pathOf(a.pts, g.sx, g.sy)
        const z = g.sy(0)
        const area = `${line}L${g.sx(a.hi).toFixed(1)} ${z.toFixed(1)}L${g.sx(a.lo).toFixed(1)} ${z.toFixed(1)}Z`
        return (
          <g>
            <clipPath id={`${uid}p`}>
              <rect x={g.x0} y={g.y0} width={g.x1 - g.x0} height={Math.max(0, z - g.y0)} />
            </clipPath>
            <clipPath id={`${uid}l`}>
              <rect x={g.x0} y={z} width={g.x1 - g.x0} height={Math.max(0, g.y1 - z)} />
            </clipPath>
            <path d={area} fill={chart.bull} fillOpacity={0.2} clipPath={`url(#${uid}p)`} />
            <path d={area} fill={chart.bear} fillOpacity={0.22} clipPath={`url(#${uid}l)`} />
            <line x1={g.sx(spot)} x2={g.sx(spot)} y1={g.y0} y2={g.y1} stroke={chart.gold} strokeDasharray="4 4" />
          </g>
        )
      }}
      over={(g) => (
        <g>
          <DrawPath d={pathOf(a.pts, g.sx, g.sy)} color={FG} width={2.4} />
          <Tag x={g.sx(spot)} y={g.y0 + 10} text={`Spot ${fmtIN(spot)}`} color={chart.gold} bounds={[g.x0, g.x1]} />
          {a.breakevens.map((b, i) => (
            <g key={b}>
              <circle cx={g.sx(b)} cy={g.sy(0)} r={4.5} fill="#0B1015" stroke={FG} strokeWidth={2} />
              <Tag x={g.sx(b)} y={g.sy(0) + (i % 2 ? -18 : 20)} text={`BE ${fmtIN(b)}`} bounds={[g.x0, g.x1]} />
            </g>
          ))}
        </g>
      )}
    />
  )
}

export function PayoffVisual({ spec }: { spec: Spec<'payoff'> }) {
  const legs = spec.legs.slice(0, 4)
  const a = useMemo(() => analyse(legs, spec.spot), [legs, spec.spot])
  const be = a.breakevens.length ? a.breakevens.map((b) => fmtIN(b)).join(' and ') : 'none in range'
  const label = `Expiry payoff per unit for ${legs.map(legName).join(', ')}. Spot ${fmtIN(spec.spot)}. Maximum profit ${a.maxProfit}, maximum loss ${a.maxLoss}, breakeven ${be}. Profit is shaded above the zero line, loss below it.`
  return (
    <Frame title={spec.title} caption={spec.caption} label={label} badge="Illustrative">
      <PayoffPlot legs={legs} spot={spec.spot} />
      <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
        {legs.map((l, i) => (
          <li key={i} className="num rounded-full border border-line-strong bg-white/[0.03] px-3 py-1 text-[0.76rem] text-fg">
            {legName(l)}
          </li>
        ))}
      </ul>
      <dl className="mt-3 grid grid-cols-1 gap-2 text-[0.82rem] sm:grid-cols-3">
        <Stat k="Max profit" v={a.maxProfit} glyph="▲" cls="text-bull" />
        <Stat k="Max loss" v={a.maxLoss} glyph="▼" cls="text-bear" />
        <Stat k="Breakeven" v={be} />
      </dl>
      <Legend
        items={[
          { name: 'Payoff at expiry', color: FG },
          { name: 'Spot', color: chart.gold, dash: '4 4' },
        ]}
      />
      <p className="mt-2 text-[0.76rem] leading-relaxed text-fg-3">Per unit, at expiry, before lot size, charges and slippage. Shaded green above zero = profit, red below = loss.</p>
    </Frame>
  )
}

function Stat({ k, v, glyph, cls }: { k: string; v: string; glyph?: string; cls?: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface/60 px-3 py-2">
      <dt className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-3">{k}</dt>
      <dd className="num m-0 mt-0.5 text-[0.95rem] text-fg">
        {glyph ? <span aria-hidden className={`mr-1.5 text-xs ${cls ?? ''}`}>{glyph}</span> : null}
        {v}
      </dd>
    </div>
  )
}
