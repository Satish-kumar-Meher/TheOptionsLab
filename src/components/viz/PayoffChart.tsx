import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { chart } from '@/lib/chartTheme'
import { fmtCompactIN, fmtIN, fmtRupee } from '@/lib/format'
import { sampleAt, type Analysis } from '@/lib/payoff'
import { cn } from '@/components/ui'

export interface PayoffChartProps {
  analysis: Analysis
  spot: number
  /** Optional second structure drawn as an overlay (expiry curve only). */
  compare?: Analysis
  name?: string
  compareName?: string
  showToday?: boolean
  className?: string
}

const M = { top: 14, right: 14, bottom: 30, left: 52 }

function niceTicks(lo: number, hi: number, target: number): number[] {
  const span = hi - lo || 1
  const raw = span / target
  const pow = 10 ** Math.floor(Math.log10(raw))
  const f = raw / pow
  const step = (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * pow
  const out: number[] = []
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(Math.abs(v) < step * 1e-9 ? 0 : v)
  return out
}

const signed = (v: number) => `${v > 0 ? '+' : v < 0 ? '−' : ''}₹${fmtIN(Math.abs(v))}`
const tickRupee = (v: number) => (v === 0 ? '0' : `${v < 0 ? '−' : ''}${fmtCompactIN(Math.abs(v))}`)

function describe(a: Analysis, name: string, spot: number): string {
  const mp = typeof a.maxProfit === 'number' ? fmtRupee(a.maxProfit) : a.maxProfit
  const ml = typeof a.maxLoss === 'number' ? fmtRupee(Math.abs(a.maxLoss)) : a.maxLoss
  const be = a.breakevens.length ? a.breakevens.map((b) => fmtIN(b)).join(' and ') : 'none in range'
  return `${name} payoff at expiry for spot between ${fmtIN(a.lo)} and ${fmtIN(a.hi)}. Maximum profit ${mp}, maximum loss ${ml}, breakeven ${be}. Current spot ${fmtIN(spot)}.`
}

export function PayoffChart({ analysis, spot, compare, name = 'Strategy', compareName = 'Comparison', showToday = true, className }: PayoffChartProps) {
  const uid = useId().replace(/:/g, '')
  const wrap = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(640)
  const [hover, setHover] = useState<number | null>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const ro = new ResizeObserver((e) => setW(Math.max(280, Math.round(e[0].contentRect.width))))
    ro.observe(el)
    setW(Math.max(280, Math.round(el.clientWidth)))
    return () => ro.disconnect()
  }, [])

  const h = w < 480 ? 280 : 360
  const lo = compare ? Math.min(analysis.lo, compare.lo) : analysis.lo
  const hi = compare ? Math.max(analysis.hi, compare.hi) : analysis.hi

  const g = useMemo(() => {
    const vals: number[] = [0, ...analysis.expiry]
    if (showToday) vals.push(...analysis.today)
    if (compare) vals.push(...compare.expiry)
    let yMin = Math.min(...vals)
    let yMax = Math.max(...vals)
    const pad = (yMax - yMin || 1) * 0.08
    yMin -= pad
    yMax += pad
    const iw = w - M.left - M.right
    const ih = h - M.top - M.bottom
    const sx = (x: number) => M.left + ((x - lo) / (hi - lo)) * iw
    const sy = (y: number) => M.top + ((yMax - y) / (yMax - yMin)) * ih
    const line = (xs: number[], ys: number[]) => xs.map((x, i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(ys[i]).toFixed(1)}`).join('')
    const y0 = sy(0)
    const expiryPath = line(analysis.xs, analysis.expiry)
    const area = `${expiryPath}L${sx(analysis.xs[analysis.xs.length - 1]).toFixed(1)} ${y0.toFixed(1)}L${sx(analysis.xs[0]).toFixed(1)} ${y0.toFixed(1)}Z`
    return {
      iw,
      ih,
      sx,
      sy,
      y0,
      yMin,
      yMax,
      expiryPath,
      area,
      todayPath: showToday ? line(analysis.xs, analysis.today) : '',
      comparePath: compare ? line(compare.xs, compare.expiry) : '',
      yTicks: niceTicks(yMin, yMax, 5),
      xTicks: niceTicks(lo, hi, w < 480 ? 3 : 6),
    }
  }, [analysis, compare, showToday, w, h, lo, hi])

  const setFromEvent = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      const r = e.currentTarget.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * w
      const x = lo + ((px - M.left) / g.iw) * (hi - lo)
      setHover(Math.min(hi, Math.max(lo, x)))
    },
    [w, lo, hi, g.iw],
  )

  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    const stepPts = (hi - lo) / 80
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const cur = hover ?? spot
      setHover(Math.min(hi, Math.max(lo, cur + (e.key === 'ArrowRight' ? stepPts : -stepPts))))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setHover(lo)
    } else if (e.key === 'End') {
      e.preventDefault()
      setHover(hi)
    } else if (e.key === 'Escape') setHover(null)
  }

  const probe = hover ?? spot
  const aE = sampleAt(analysis.xs, analysis.expiry, probe)
  const aT = sampleAt(analysis.xs, analysis.today, probe)
  const bE = compare ? sampleAt(compare.xs, compare.expiry, probe) : 0
  const spotX = g.sx(spot)
  const iw = g.iw

  const Dir = ({ v }: { v: number }) => (
    <span className={cn('num', v > 0.5 ? 'text-bull' : v < -0.5 ? 'text-bear' : 'text-fg-2')}>
      {v > 0.5 ? '▲ ' : v < -0.5 ? '▼ ' : ''}
      {signed(Math.round(v))}
    </span>
  )

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex min-h-[3.1rem] flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[0.78rem]" aria-live="off">
        <span className="text-fg-2">
          {hover === null ? 'Spot' : 'At'} <span className="num text-fg">{fmtIN(probe)}</span>
        </span>
        <span className="text-fg-2">
          <span aria-hidden className="mr-1.5 inline-block h-0.5 w-4 -translate-y-0.5 bg-fg align-middle" />
          {compare ? name : 'Expiry'} <Dir v={aE} />
        </span>
        {showToday && (
          <span className="text-fg-2">
            <span aria-hidden className="mr-1.5 inline-block w-4 -translate-y-0.5 border-t-2 border-dashed border-ice align-middle" />
            Today (T+0) <Dir v={aT} />
          </span>
        )}
        {compare && (
          <span className="text-fg-2">
            <span aria-hidden className="mr-1.5 inline-block h-0.5 w-4 -translate-y-0.5 bg-gold align-middle" />
            {compareName} <Dir v={bE} />
          </span>
        )}
      </div>
      <div ref={wrap} className="w-full">
        <svg
          role="img"
          aria-label={`${describe(analysis, name, spot)}${compare ? ' ' + describe(compare, compareName, spot) : ''} Use left and right arrow keys to read values along the curve.`}
          tabIndex={0}
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="block max-w-full touch-pan-y select-none rounded-lg outline-offset-2"
          onPointerMove={setFromEvent}
          onPointerDown={setFromEvent}
          onPointerLeave={() => setHover(null)}
          onKeyDown={onKey}
        >
          <defs>
            <clipPath id={`${uid}-up`}>
              <rect x={M.left} y={M.top} width={iw} height={Math.max(0, g.y0 - M.top)} />
            </clipPath>
            <clipPath id={`${uid}-dn`}>
              <rect x={M.left} y={g.y0} width={iw} height={Math.max(0, M.top + g.ih - g.y0)} />
            </clipPath>
            <clipPath id={`${uid}-plot`}>
              <rect x={M.left} y={M.top} width={iw} height={g.ih} />
            </clipPath>
          </defs>

          {g.yTicks.map((t) => (
            <g key={`y${t}`}>
              <line x1={M.left} x2={M.left + iw} y1={g.sy(t)} y2={g.sy(t)} stroke={t === 0 ? 'rgba(255,255,255,0.32)' : chart.grid} strokeDasharray={t === 0 ? undefined : '3 5'} />
              <text x={M.left - 8} y={g.sy(t) + 4} textAnchor="end" fill={chart.fg2} fontSize={11} fontFamily="'JetBrains Mono Variable', monospace">
                {tickRupee(t)}
              </text>
            </g>
          ))}
          {g.xTicks.map((t) => (
            <text key={`x${t}`} x={g.sx(t)} y={h - 10} textAnchor={g.sx(t) > w - 28 ? 'end' : g.sx(t) < M.left + 20 ? 'start' : 'middle'} fill={chart.fg2} fontSize={11} fontFamily="'JetBrains Mono Variable', monospace">
              {fmtIN(t)}
            </text>
          ))}

          <g clipPath={`url(#${uid}-plot)`}>
            <g clipPath={`url(#${uid}-up)`}>
              <path d={g.area} fill={chart.bull} fillOpacity={compare ? 0.1 : 0.2} />
            </g>
            <g clipPath={`url(#${uid}-dn)`}>
              <path d={g.area} fill={chart.bear} fillOpacity={compare ? 0.1 : 0.2} />
            </g>
            {compare && <path d={g.comparePath} fill="none" stroke={chart.gold} strokeWidth={2} strokeLinejoin="round" />}
            {showToday && <path d={g.todayPath} fill="none" stroke={chart.ice} strokeWidth={1.8} strokeDasharray="6 5" strokeLinejoin="round" />}
            <path d={g.expiryPath} fill="none" stroke={chart.fg} strokeWidth={2.2} strokeLinejoin="round" />
          </g>

          <text x={M.left + 6} y={M.top + 12} fill={chart.bull} fontSize={10.5} fontFamily="'JetBrains Mono Variable', monospace" opacity={0.9}>▲ PROFIT</text>
          <text x={M.left + 6} y={M.top + g.ih - 6} fill={chart.bear} fontSize={10.5} fontFamily="'JetBrains Mono Variable', monospace" opacity={0.9}>▼ LOSS</text>

          {spot >= lo && spot <= hi && (
            <g>
              <line x1={spotX} x2={spotX} y1={M.top} y2={M.top + g.ih} stroke={chart.gold} strokeWidth={1.2} strokeDasharray="2 4" />
              <text x={spotX + 5} y={M.top + 12} textAnchor="start" fill={chart.gold} fontSize={10} fontFamily="'JetBrains Mono Variable', monospace">SPOT</text>
            </g>
          )}

          {analysis.breakevens.map((b) => (
            <g key={`be${b}`}>
              <circle cx={g.sx(b)} cy={g.y0} r={5} fill="#070A0D" stroke={chart.fg} strokeWidth={1.8} />
              <text x={g.sx(b)} y={g.y0 - 10} textAnchor="middle" fill={chart.fg} fontSize={10.5} fontFamily="'JetBrains Mono Variable', monospace">
                {fmtIN(Math.round(b))}
              </text>
            </g>
          ))}

          {hover !== null && (
            <g pointerEvents="none">
              <line x1={g.sx(hover)} x2={g.sx(hover)} y1={M.top} y2={M.top + g.ih} stroke="rgba(255,255,255,0.35)" strokeDasharray="3 4" />
              <circle cx={g.sx(hover)} cy={g.sy(aE)} r={4.5} fill={chart.fg} stroke="#070A0D" strokeWidth={2} />
              {showToday && <circle cx={g.sx(hover)} cy={g.sy(aT)} r={4} fill={chart.ice} stroke="#070A0D" strokeWidth={2} />}
              {compare && <circle cx={g.sx(hover)} cy={g.sy(bE)} r={4} fill={chart.gold} stroke="#070A0D" strokeWidth={2} />}
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
