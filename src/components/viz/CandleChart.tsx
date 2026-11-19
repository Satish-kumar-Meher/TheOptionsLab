import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { Candle } from '@/lib/rng'
import { fmtIN } from '@/lib/format'
import { cn } from '@/components/ui'

export type ChartTone = 'bull' | 'bear' | 'gold' | 'ice'
export interface ChartLevel { price: number; label: string; tone: ChartTone; dashed?: boolean }
export interface ChartZone { from: number; to: number; label: string; tone: ChartTone }
export interface ChartMarker { index: number; label: string; tone: ChartTone; /** place below the low instead of above the high */ below?: boolean }

export interface CandleChartProps {
  candles: Candle[]
  height?: number
  levels?: ChartLevel[]
  zones?: ChartZone[]
  markers?: ChartMarker[]
  /** Show a volume sub-pane under the price pane. */
  showVolume?: boolean
  /** Replay: only the first N candles are drawn; the x-scale stays fixed to candles.length. */
  visibleCount?: number
  /** Label for a bar index, e.g. "09:15". */
  timeLabel?: (index: number) => string
  /** Short description used for the accessible summary. */
  summaryLabel?: string
  className?: string
}

const TONE: Record<ChartTone, string> = { bull: '#00E58A', bear: '#F04444', gold: '#C9A86A', ice: '#8FB4D9' }
const FG2 = '#929DA9'
const MONO = "'JetBrains Mono Variable', ui-monospace, monospace"

function niceTicks(lo: number, hi: number, target: number): number[] {
  const span = hi - lo || 1
  const raw = span / target
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const f = raw / mag
  const step = (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * mag
  const out: number[] = []
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6)
  return out
}

export function CandleChart({ candles, height = 380, levels = [], zones = [], markers = [], showVolume = false, visibleCount, timeLabel, summaryLabel = 'Candlestick chart', className }: CandleChartProps) {
  const uid = useId().replace(/:/g, '')
  const wrapRef = useRef<HTMLDivElement>(null)
  const focused = useRef(false)
  const [width, setWidth] = useState(640)
  const [cursor, setCursor] = useState<number | null>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0].contentRect.width)
      if (w > 40) setWidth(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const total = candles.length
  const vis = Math.max(0, Math.min(visibleCount ?? total, total))
  const label = useCallback((i: number) => (timeLabel ? timeLabel(i) : `#${i + 1}`), [timeLabel])

  const compact = width < 520
  const padR = compact ? 52 : 64
  const padT = 10
  const axisH = 22
  const volH = showVolume ? Math.round(height * 0.2) : 0
  const gap = showVolume ? 8 : 0
  const priceH = height - axisH - volH - gap - padT
  const plotW = Math.max(40, width - padR - 4)

  const { lo, hi } = useMemo(() => {
    let l = Infinity
    let h = -Infinity
    for (const c of candles) { if (c.l < l) l = c.l; if (c.h > h) h = c.h }
    for (const v of levels) { if (v.price < l) l = v.price; if (v.price > h) h = v.price }
    for (const z of zones) { l = Math.min(l, z.from, z.to); h = Math.max(h, z.from, z.to) }
    if (!Number.isFinite(l)) { l = 0; h = 1 }
    const pad = (h - l) * 0.06 || 1
    return { lo: l - pad, hi: h + pad }
  }, [candles, levels, zones])
  const maxVol = useMemo(() => candles.reduce((m, c) => Math.max(m, c.v), 1), [candles])

  const slot = plotW / Math.max(1, total)
  const bodyW = Math.max(1.5, Math.min(18, slot * 0.64))
  const x = (i: number) => (i + 0.5) * slot
  const y = (p: number) => padT + (1 - (p - lo) / (hi - lo)) * priceH
  const volTop = padT + priceH + gap
  const yTicks = useMemo(() => niceTicks(lo, hi, Math.max(3, Math.floor(priceH / 54))), [lo, hi, priceH])
  const xEvery = Math.max(1, Math.ceil(total / Math.max(2, Math.floor(plotW / 70))))

  const active = cursor !== null && cursor < vis ? cursor : vis > 0 ? vis - 1 : null
  const ac = active !== null ? candles[active] : null

  const idxFromPointer = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * width
    return Math.max(0, Math.min(vis - 1, Math.floor(px / slot)))
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (vis === 0) return
    const cur = cursor !== null && cursor < vis ? cursor : vis - 1
    let next = cur
    if (e.key === 'ArrowLeft') next = cur - 1
    else if (e.key === 'ArrowRight') next = cur + 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = vis - 1
    else return
    e.preventDefault()
    setCursor(Math.max(0, Math.min(vis - 1, next)))
  }

  const summary = useMemo(() => {
    if (vis === 0) return `${summaryLabel}. No bars revealed yet.`
    const seen = candles.slice(0, vis)
    const hh = Math.max(...seen.map((c) => c.h))
    const ll = Math.min(...seen.map((c) => c.l))
    const f = seen[0]
    const l = seen[vis - 1]
    return `${summaryLabel}. ${vis} of ${total} bars shown, ${label(0)} to ${label(vis - 1)}. Opened ${fmtIN(f.o)}, latest close ${fmtIN(l.c)}, high ${fmtIN(hh)}, low ${fmtIN(ll)}. Use arrow keys on the chart to read each bar.`
  }, [candles, vis, total, label, summaryLabel])

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex min-h-[2.6rem] flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-[0.74rem] text-fg-2" aria-live="off">
        {ac && active !== null ? (
          <>
            <span className="text-fg">{label(active)}</span>
            <span>O <b className="font-medium text-fg">{fmtIN(ac.o, 2)}</b></span>
            <span>H <b className="font-medium text-fg">{fmtIN(ac.h, 2)}</b></span>
            <span>L <b className="font-medium text-fg">{fmtIN(ac.l, 2)}</b></span>
            <span>C <b className="font-medium text-fg">{fmtIN(ac.c, 2)}</b></span>
            <span style={{ color: ac.c >= ac.o ? TONE.bull : TONE.bear }}>{ac.c >= ac.o ? '▲' : '▼'} {ac.c >= ac.o ? '+' : '−'}{Math.abs(ac.c - ac.o).toFixed(1)}</span>
            {showVolume && <span>Vol <b className="font-medium text-fg">{fmtIN(ac.v)}</b></span>}
          </>
        ) : (
          <span>Press play or drag the scrubber to reveal bars. Hover or use arrow keys to read a bar.</span>
        )}
      </div>
      <div
        ref={wrapRef}
        tabIndex={0}
        role="group"
        aria-label={`${summaryLabel} — interactive, arrow keys move the crosshair`}
        onKeyDown={onKey}
        onFocus={() => { focused.current = true; if (cursor === null && vis > 0) setCursor(vis - 1) }}
        onBlur={() => { focused.current = false; setCursor(null) }}
        className="relative w-full overflow-hidden rounded-xl border border-line outline-offset-2"
        style={{ height, background: 'linear-gradient(180deg, rgba(143,180,217,0.05) 0%, rgba(7,10,13,0.0) 55%), #0B1015' }}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={summary}
          className="block touch-pan-y select-none"
          onPointerMove={(e) => { if (vis > 0) setCursor(idxFromPointer(e)) }}
          onPointerLeave={() => { if (!focused.current) setCursor(null) }}
        >
          <defs>
            <clipPath id={`${uid}-clip`}><rect x={0} y={0} width={plotW} height={height} /></clipPath>
          </defs>
          {/* grid + y axis */}
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={0} x2={plotW} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
              <text x={plotW + 6} y={y(t) + 3.5} fill={FG2} fontSize={10.5} fontFamily={MONO}>{fmtIN(t)}</text>
            </g>
          ))}
          {/* x axis */}
          {candles.map((_, i) => (i % xEvery === 0 ? (
            <g key={i}>
              <line x1={x(i)} x2={x(i)} y1={padT} y2={padT + priceH + (showVolume ? gap + volH : 0)} stroke="rgba(255,255,255,0.035)" />
              <text x={x(i)} y={height - 6} fill={FG2} fontSize={10.5} fontFamily={MONO} textAnchor="middle">{label(i)}</text>
            </g>
          ) : null))}

          {/* zones */}
          {zones.map((z) => {
            const y1 = y(Math.max(z.from, z.to))
            const y2 = y(Math.min(z.from, z.to))
            return (
              <g key={`${z.label}-${z.from}`}>
                <rect x={0} y={y1} width={plotW} height={Math.max(2, y2 - y1)} fill={TONE[z.tone]} opacity={0.09} />
                <line x1={0} x2={plotW} y1={y1} y2={y1} stroke={TONE[z.tone]} opacity={0.35} strokeDasharray="2 4" />
                <text x={6} y={y1 + 12} fill={TONE[z.tone]} fontSize={10} fontFamily={MONO} opacity={0.95}>{z.label}</text>
              </g>
            )
          })}

          {/* levels */}
          {levels.map((lv) => (
            <g key={`${lv.label}-${lv.price}`}>
              <line x1={0} x2={plotW} y1={y(lv.price)} y2={y(lv.price)} stroke={TONE[lv.tone]} strokeWidth={1.2} strokeDasharray={lv.dashed === false ? undefined : '6 4'} opacity={0.85} />
              <text x={plotW - 4} y={y(lv.price) - 4} fill={TONE[lv.tone]} fontSize={10} fontFamily={MONO} textAnchor="end">{lv.label}</text>
              <rect x={plotW + 2} y={y(lv.price) - 8} width={padR - 2} height={16} rx={3} fill={TONE[lv.tone]} />
              <text x={plotW + 2 + (padR - 2) / 2} y={y(lv.price) + 3.5} fill="#070A0D" fontSize={10.5} fontWeight={600} fontFamily={MONO} textAnchor="middle">{fmtIN(lv.price)}</text>
            </g>
          ))}

          {/* volume pane */}
          {showVolume && (
            <g clipPath={`url(#${uid}-clip)`}>
              <line x1={0} x2={plotW} y1={volTop} y2={volTop} stroke="rgba(255,255,255,0.08)" />
              {candles.slice(0, vis).map((c, i) => {
                const h = Math.max(1, (c.v / maxVol) * (volH - 4))
                const up = c.c >= c.o
                return <rect key={i} x={x(i) - bodyW / 2} y={volTop + volH - h} width={bodyW} height={h} fill={up ? TONE.bull : TONE.bear} opacity={up ? 0.55 : 0.4} />
              })}
              <text x={6} y={volTop + 11} fill={FG2} fontSize={9.5} fontFamily={MONO}>VOL</text>
            </g>
          )}

          {/* candles */}
          <g clipPath={`url(#${uid}-clip)`}>
            {candles.slice(0, vis).map((c, i) => {
              const up = c.c >= c.o
              const col = up ? TONE.bull : TONE.bear
              const top = y(Math.max(c.o, c.c))
              const bot = y(Math.min(c.o, c.c))
              const bh = Math.max(1.2, bot - top)
              return (
                <g key={i}>
                  <line x1={x(i)} x2={x(i)} y1={y(c.h)} y2={y(c.l)} stroke={col} strokeWidth={1} />
                  {up
                    ? <rect x={x(i) - bodyW / 2} y={top} width={bodyW} height={bh} fill={col} />
                    : <rect x={x(i) - bodyW / 2 + 0.5} y={top + 0.5} width={Math.max(1, bodyW - 1)} height={Math.max(1, bh - 1)} fill="#0B1015" stroke={col} strokeWidth={1.1} />}
                </g>
              )
            })}
          </g>

          {/* markers */}
          {markers.filter((m) => m.index >= 0 && m.index < vis).map((m, k) => {
            const c = candles[m.index]
            const below = m.below === true
            const py = below ? y(c.l) + 8 : y(c.h) - 8
            const col = TONE[m.tone]
            const anchor = m.index > total * 0.8 ? 'end' : m.index < total * 0.1 ? 'start' : 'middle'
            return (
              <g key={`${m.index}-${k}`}>
                <path d={below ? `M${x(m.index)} ${py - 3} l-4 7 h8 z` : `M${x(m.index)} ${py + 3} l-4 -7 h8 z`} fill={col} />
                <text x={x(m.index)} y={below ? py + 16 : py - 7} fill={col} fontSize={10} fontFamily={MONO} textAnchor={anchor} fontWeight={600}>{m.label}</text>
              </g>
            )
          })}

          {/* crosshair */}
          {ac && active !== null && cursor !== null && (
            <g pointerEvents="none">
              <line x1={x(active)} x2={x(active)} y1={padT} y2={height - axisH} stroke="rgba(244,247,250,0.4)" strokeDasharray="3 4" />
              <line x1={0} x2={plotW} y1={y(ac.c)} y2={y(ac.c)} stroke="rgba(244,247,250,0.28)" strokeDasharray="3 4" />
              <rect x={plotW + 2} y={y(ac.c) - 8} width={padR - 2} height={16} rx={3} fill="#F4F7FA" />
              <text x={plotW + 2 + (padR - 2) / 2} y={y(ac.c) + 3.5} fill="#070A0D" fontSize={10.5} fontWeight={600} fontFamily={MONO} textAnchor="middle">{fmtIN(ac.c)}</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

export default CandleChart
