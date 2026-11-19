import { useEffect, useMemo, useState } from 'react'
import { Area, CartesianGrid, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Button, ChartContainer, Slider } from '@/components/ui'
import { axisProps, chart, gridProps, tooltipStyle } from '@/lib/chartTheme'
import { mulberry32, percentile } from '@/lib/rng'
import { Note, Stat } from './shared'

interface Params { win: number; rr: number; riskPct: number; trades: number; ruin: number; seed: number }
const PATHS = 300

function simulate(p: Params) {
  const rng = mulberry32(p.seed)
  const f = p.riskPct / 100
  const winP = p.win / 100
  const floor = 1 - p.ruin / 100
  const steps = p.trades
  const cols: number[][] = Array.from({ length: steps + 1 }, () => [])
  const maxDds: number[] = []
  let hit = 0
  for (let i = 0; i < PATHS; i++) {
    let eq = 1
    let peak = 1
    let mdd = 0
    let touched = false
    cols[0].push(100)
    for (let t = 1; t <= steps; t++) {
      eq *= rng() < winP ? 1 + f * p.rr : 1 - f
      if (eq > peak) peak = eq
      const dd = 1 - eq / peak
      if (dd > mdd) mdd = dd
      if (eq <= floor) touched = true
      cols[t].push(eq * 100)
    }
    if (touched) hit++
    maxDds.push(mdd)
  }
  const data = cols.map((c, t) => {
    const s = [...c].sort((a, b) => a - b)
    const q = (x: number) => percentile(s, x)
    return { t, p5: q(0.05), p25: q(0.25), p50: q(0.5), p75: q(0.75), p95: q(0.95), band90: [q(0.05), q(0.95)] as [number, number], band50: [q(0.25), q(0.75)] as [number, number] }
  })
  const dd = [...maxDds].sort((a, b) => a - b)
  const last = data[data.length - 1]
  return { data, pRuin: hit / PATHS, medDd: percentile(dd, 0.5), p95Dd: percentile(dd, 0.95), endMed: last.p50, endP5: last.p5, endP95: last.p95 }
}

export function RuinTool() {
  const [win, setWin] = useState(45)
  const [rr, setRr] = useState(1.5)
  const [riskPct, setRiskPct] = useState(2)
  const [trades, setTrades] = useState(200)
  const [ruin, setRuin] = useState(50)
  const [seed, setSeed] = useState(2024)
  const [applied, setApplied] = useState<Params>({ win: 45, rr: 1.5, riskPct: 2, trades: 200, ruin: 50, seed: 2024 })
  const [auto, setAuto] = useState(true)

  const live: Params = { win, rr, riskPct, trades, ruin, seed }
  const dirty = JSON.stringify(live) !== JSON.stringify(applied)

  useEffect(() => {
    if (!auto || !dirty) return
    const id = window.setTimeout(() => setApplied(live), 450)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, win, rr, riskPct, trades, ruin, seed])

  const res = useMemo(() => simulate(applied), [applied])
  const edge = (applied.win / 100) * applied.rr - (1 - applied.win / 100)
  const floorLevel = 100 - applied.ruin

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="glass-solid flex flex-col gap-5 p-5 sm:p-6 lg:col-span-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">Monte Carlo · {PATHS} paths</span>
        <Slider label="Win rate" value={win} min={20} max={80} step={1} onChange={setWin} format={(v) => `${v}%`} />
        <Slider label="Reward : risk" value={rr} min={0.5} max={4} step={0.1} onChange={setRr} format={(v) => `${v.toFixed(1)} : 1`} />
        <Slider label="Risk per trade, % of current equity" value={riskPct} min={0.5} max={20} step={0.5} onChange={setRiskPct} format={(v) => `${v.toFixed(1)}%`} />
        <Slider label="Trades per path" value={trades} min={50} max={500} step={10} onChange={setTrades} />
        <Slider label="Ruin threshold (drawdown from start)" value={ruin} min={20} max={80} step={5} onChange={setRuin} format={(v) => `−${v}%`} />
        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <Button size="sm" onClick={() => { setSeed((s) => s + 1); setApplied({ ...live, seed: seed + 1 }) }}>Run new random paths</Button>
          <label className="flex min-h-10 cursor-pointer items-center gap-2 text-[0.8rem] text-fg-2">
            <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} className="size-4 accent-[#C9A86A]" />
            Re-run automatically
          </label>
          {!auto && dirty && <Button size="sm" variant="secondary" onClick={() => setApplied(live)}>Apply changes</Button>}
        </div>
        <p className="text-[0.74rem] text-fg-3" aria-live="polite">{dirty ? 'Inputs changed — results pending…' : `Showing seed ${applied.seed}, ${applied.trades} trades × ${PATHS} paths.`}</p>
      </div>

      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="glass-solid grid gap-6 p-5 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-end sm:p-8">
          <Stat big label={`P(equity touches −${applied.ruin}%)`} value={`${(res.pRuin * 100).toFixed(1)}%`} sub={`${Math.round(res.pRuin * PATHS)} of ${PATHS} simulated paths`} tone="gold" />
          <Stat label="Median max drawdown" value={`▼ ${(res.medDd * 100).toFixed(1)}%`} sub="peak-to-trough, typical path" />
          <Stat label="95th-pct max drawdown" value={`▼ ${(res.p95Dd * 100).toFixed(1)}%`} sub="1 path in 20 was worse" />
        </div>
        <div role="alert" className="rounded-xl border border-gold/30 bg-gold/[0.07] px-4 py-3 text-[0.84rem] leading-relaxed text-fg-2">
          <strong className="text-fg">These results depend on assumptions that real markets violate.</strong> Trades here are independent, the win rate and reward : risk are fixed and known, and sizing is exact. Real edges drift or vanish, losses cluster, and gaps and slippage fatten the tails — so real ruin risk can be higher than shown.
        </div>
        {edge <= 0 && <Note tone="ice">With these inputs the per-trade edge is {edge.toFixed(2)} R (zero or negative): over many trades equity tends to drift down, and ruin becomes a matter of time.</Note>}
      </div>

      <div className="lg:col-span-12">
        <ChartContainer
          title="Equity fan — percentile bands across paths"
          subtitle={`Start = 100. Bands show the 5–95th and 25–75th percentile of equity at each trade; line is the median. Dashed line is the −${applied.ruin}% ruin level.`}
          height={340}
          footer={`Text summary: after ${applied.trades} trades the median path ends near ${res.endMed.toFixed(0)}, the 5th percentile near ${res.endP5.toFixed(0)} and the 95th near ${res.endP95.toFixed(0)}. ${(res.pRuin * 100).toFixed(1)}% of paths touched ${floorLevel}.`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={res.data} margin={{ top: 10, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="t" type="number" domain={[0, applied.trades]} {...axisProps} tickFormatter={(v: number) => `${v}`} />
              <YAxis {...axisProps} width={46} domain={[0, 'auto']} allowDataOverflow />
              <Tooltip {...tooltipStyle} labelFormatter={(l) => `After ${l} trades`} formatter={(v, name) => [Array.isArray(v) ? `${Number(v[0]).toFixed(0)} – ${Number(v[1]).toFixed(0)}` : Number(v).toFixed(1), String(name)]} />
              <ReferenceLine y={100} stroke={chart.fg2} strokeDasharray="2 4" />
              <ReferenceLine y={floorLevel} stroke={chart.gold} strokeDasharray="5 4" label={{ value: 'ruin level', fill: chart.gold, fontSize: 11, position: 'insideBottomRight' }} />
              <Area type="monotone" dataKey="band90" name="5–95th pct" stroke="none" fill={chart.ice} fillOpacity={0.14} isAnimationActive={false} />
              <Area type="monotone" dataKey="band50" name="25–75th pct" stroke="none" fill={chart.ice} fillOpacity={0.26} isAnimationActive={false} />
              <Line type="monotone" dataKey="p50" name="Median" stroke={chart.fg} strokeWidth={2} dot={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
