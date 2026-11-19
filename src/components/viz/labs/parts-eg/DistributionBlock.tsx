import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts'
import { Button, ChartContainer, GlassPanel, Segmented } from '@/components/ui'
import { axisProps, chart, gridProps, tooltipStyle } from '@/lib/chartTheme'
import { fmtPct, fmtRupee } from '@/lib/format'
import { EXPIRY_SCENARIOS, MAX_SIMS, runDistribution, type ExpiryScenario, type ModelParams, type TradeParams } from '@/lib/expirySim'
import { Callout, Eyebrow } from '../parts/LabKit'
import { NumField } from './NumField'
import { Pnl, Stat } from './Stat'

type Mode = ExpiryScenario | 'mixed'
interface Snapshot { mode: Mode; n: number; model: ModelParams; trade: TradeParams }
const key = (s: Snapshot) => JSON.stringify(s)

export function DistributionBlock({ model, trade }: { model: ModelParams; trade: TradeParams }) {
  const [mode, setMode] = useState<Mode>('mixed')
  const [n, setN] = useState(300)
  const [snap, setSnap] = useState<Snapshot | null>(null)

  const effTrade = useMemo<TradeParams>(() => ({ ...trade, exit: Math.max(trade.exit, trade.entry + 1) }), [trade])
  const current: Snapshot = { mode, n: Math.max(1, Math.min(MAX_SIMS, Math.round(n))), model, trade: effTrade }
  const dist = useMemo(() => (snap ? runDistribution(snap.mode, snap.n, snap.model, snap.trade) : null), [snap])
  const stale = snap !== null && key(snap) !== key(current)

  const data = useMemo(() => (dist ? dist.bins.map((b, i) => ({ i, mid: (b.from + b.to) / 2, count: b.count })) : []), [dist])
  const zeroIdx = useMemo(() => {
    if (!dist) return 0
    const w = dist.bins[0].to - dist.bins[0].from
    return (0 - dist.bins[0].from) / w - 0.5
  }, [dist])

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <GlassPanel className="flex flex-col gap-5">
          <Eyebrow>Many seeded afternoons</Eyebrow>
          <p className="text-[0.86rem] leading-relaxed text-fg-2">Run the same two-sided trade (entry, exit, lots, slippage and trailing stop from above) through many random expiry afternoons. Results move with implied vol, realised vol, IV crush, trail % and slippage.</p>
          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <Segmented ariaLabel="Scenario mix" value={mode} onChange={setMode} options={[{ value: 'mixed' as Mode, label: 'Mixed' }, ...EXPIRY_SCENARIOS.map((s) => ({ value: s.id as Mode, label: s.label }))]} />
          </div>
          <NumField label={`Simulated afternoons (max ${MAX_SIMS})`} value={n} min={10} max={MAX_SIMS} step={10} onChange={setN} />
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => setSnap(current)}>{snap ? 'Re-run simulation' : `Run ${current.n} simulations`}</Button>
            {stale && <p role="status" className="text-[0.78rem] text-gold">Inputs changed since the last run.</p>}
          </div>
        </GlassPanel>

        {dist ? (
          <GlassPanel className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3">
            <Stat label="Hit rate" value={fmtPct(dist.hitRate, 0)} sub={`${dist.n} afternoons`} />
            <Stat label="Average win" value={<Pnl value={dist.avgWin} fmt={(v) => fmtRupee(v)} className="text-[inherit]" />} />
            <Stat label="Average loss" value={<Pnl value={dist.avgLoss} fmt={(v) => fmtRupee(v)} className="text-[inherit]" />} />
            <Stat label="Expectancy" value={<Pnl value={dist.expectancy} fmt={(v) => fmtRupee(v)} className="text-[inherit]" />} sub="Mean P&L per afternoon" />
            <Stat label="Worst case" value={<Pnl value={dist.worst} fmt={(v) => fmtRupee(v)} className="text-[inherit]" />} sub={`Best ${fmtRupee(dist.best)} · median ${fmtRupee(dist.median)}`} />
            <Stat label="Both legs lost" value={fmtPct(dist.bothLoseShare, 0)} sub="Share of afternoons" />
          </GlassPanel>
        ) : (
          <GlassPanel className="grid place-items-center text-center">
            <p className="max-w-xs text-[0.88rem] leading-relaxed text-fg-2">Press the button to simulate. Nothing runs until you do, and the same inputs always give the same result.</p>
          </GlassPanel>
        )}
      </div>

      {dist && (
        <ChartContainer title="Distribution of combined P&L" subtitle="Number of simulated afternoons in each P&L bucket. Bars left of zero are losses." height={280} footer={`Buckets are about ${fmtRupee(dist.bins[0].to - dist.bins[0].from)} wide. Total ${dist.n} afternoons.`}>
          <div role="img" aria-label={`Histogram of ${dist.n} simulated P&L results. Hit rate ${fmtPct(dist.hitRate, 0)}, expectancy ${fmtRupee(dist.expectancy)}, worst ${fmtRupee(dist.worst)}.`} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 28, bottom: 0, left: 0 }} barCategoryGap={2}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="i" tickFormatter={(i: number) => fmtRupee(data[i]?.mid ?? 0)} interval="preserveStartEnd" minTickGap={28} {...axisProps} />
                <YAxis allowDecimals={false} width={36} {...axisProps} />
                <RTooltip {...tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.05)' }} labelFormatter={(i) => `≈ ${fmtRupee(data[Number(i)]?.mid ?? 0)}`} formatter={(v) => [String(v), 'Afternoons']} isAnimationActive={false} />
                <ReferenceLine x={Math.min(data.length - 1, Math.max(0, Math.round(zeroIdx + 0.5)))} stroke={chart.fg} strokeOpacity={0.4} strokeDasharray="3 4" />
                <Bar dataKey="count" radius={[3, 3, 0, 0]} isAnimationActive={false}>
                  {data.map((d) => <Cell key={d.i} fill={d.mid >= 0 ? chart.bull : chart.bear} fillOpacity={0.8} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      )}

      <Callout title="Simplified model — not evidence any real strategy is profitable.">Real fills, spreads, taxes and charges differ. This ignores skew, bid-ask spreads, brokerage, STT and exchange charges, and slippage that grows when everyone trades at once.</Callout>
    </div>
  )
}
