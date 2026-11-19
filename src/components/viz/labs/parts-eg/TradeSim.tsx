import { useMemo } from 'react'
import { Callout, Eyebrow } from '../parts/LabKit'
import { ChartContainer, DataTable, GlassPanel, Slider, type Column } from '@/components/ui'
import { chart } from '@/lib/chartTheme'
import { fmtRupee } from '@/lib/format'
import { STEPS, minuteLabel, optionAt, runTrade, type LegResult, type ModelParams, type TradeParams } from '@/lib/expirySim'
import { Legend, TimeChart, type Row } from './Charts'
import { NumField } from './NumField'
import { Pnl, Stat } from './Stat'

export const DEFAULT_TRADE: TradeParams = { entry: 110, exit: 135, lots: 1, lotSize: 65, slippage: 0.5, trailPct: 30 }

export function TradeSim({ path, model, trade, setTrade }: { path: number[]; model: ModelParams; trade: TradeParams; setTrade: (t: TradeParams) => void }) {
  const t = useMemo<TradeParams>(() => ({ ...trade, exit: Math.max(trade.exit, trade.entry + 1) }), [trade])
  const set = (patch: Partial<TradeParams>) => setTrade({ ...trade, ...patch })
  const res = useMemo(() => runTrade(path, model, t), [path, model, t])
  const bothLose = res.ce.pnl < 0 && res.pe.pnl < 0

  const { rows, max } = useMemo(() => {
    let m = 1
    const r: Row[] = []
    for (let i = t.entry; i < STEPS; i++) {
      const ce = optionAt('CE', path[i], res.strike, i, model).price
      const pe = optionAt('PE', path[i], res.strike, i, model).price
      m = Math.max(m, ce, pe)
      r.push({ i, ce, pe })
    }
    return { rows: r, max: m }
  }, [path, model, res.strike, t.entry])

  const cols: Column<LegResult>[] = [
    { key: 'type', header: 'Leg', render: (l) => <span className="text-fg">{l.type} {l.strike}</span> },
    { key: 'entry', header: 'Buy ₹', align: 'right', mono: true, render: (l) => l.entryPrice.toFixed(2) },
    { key: 'exit', header: 'Sell ₹', align: 'right', mono: true, render: (l) => l.exitPrice.toFixed(2) },
    { key: 'when', header: 'Exit', align: 'right', mono: true, render: (l) => `${minuteLabel(l.exitIdx)} · ${l.reason}` },
    { key: 'pnl', header: 'P&L', align: 'right', render: (l) => <Pnl value={l.pnl} fmt={(v) => fmtRupee(v)} /> },
  ]

  const refs = [
    { x: t.entry, label: 'Entry', color: chart.fg, pos: 'insideTopLeft' as const },
    { x: res.ce.exitIdx, label: `CE exit`, color: chart.ice, pos: 'insideTopRight' as const },
    { x: res.pe.exitIdx, label: `PE exit`, color: chart.gold, pos: 'insideTopLeft' as const },
  ]
  if (res.ce.exitIdx === res.pe.exitIdx) refs.splice(2, 1)

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <GlassPanel className="flex flex-col gap-5">
          <Eyebrow>Two-sided buying simulator</Eyebrow>
          <p className="text-[0.86rem] leading-relaxed text-fg-2">Buy the at-the-money call and put at the entry time, trail each leg from its own peak premium, and exit anything still open at the time exit.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Slider label="Entry time" value={t.entry} min={0} max={145} onChange={(v) => set({ entry: v })} format={minuteLabel} />
            <Slider label="Time exit" value={t.exit} min={t.entry + 1} max={STEPS - 1} onChange={(v) => set({ exit: v })} format={minuteLabel} />
            <Slider label="Trailing stop per leg" value={t.trailPct} min={5} max={80} step={5} onChange={(v) => set({ trailPct: v })} format={(v) => `${v}%`} hint="Exit a leg when its premium falls this far below its peak." />
            <NumField label="Slippage per leg (₹ / unit)" value={t.slippage} min={0} max={20} step={0.05} onChange={(v) => set({ slippage: v })} hint="Paid on entry and again on exit." />
            <NumField label="Lots" value={t.lots} min={1} max={100} onChange={(v) => set({ lots: Math.round(v) })} />
            <NumField label="Lot size" value={t.lotSize} min={1} max={1000} onChange={(v) => set({ lotSize: Math.round(v) })} hint="Default 65. Check the current NSE contract specification." />
          </div>
        </GlassPanel>

        <div className="flex min-w-0 flex-col gap-5">
          <GlassPanel className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <Stat label="Combined P&L" value={<Pnl value={res.total} fmt={(v) => fmtRupee(v)} className="text-[inherit]" />} sub={`${t.lots} lot × ${t.lotSize} units, strike ${res.strike}`} />
              <Stat label="Cost at entry" value={fmtRupee((res.ce.entryPrice + res.pe.entryPrice) * t.lots * t.lotSize)} sub="Premium paid for both legs, before charges" />
            </div>
            <DataTable<LegResult> columns={cols} rows={[res.ce, res.pe]} rowKey={(l) => l.type} dense caption="Per-leg result of the simulated two-sided buy" />
          </GlassPanel>
          {bothLose ? (
            <Callout title="Both legs lost money on this path">Theta and IV decay punish two-sided buyers on pinning days. Spot has to travel further than the combined premium paid, and late in the day each leg loses time value every minute.</Callout>
          ) : (
            <Callout title="One path is not a result">
              Even when a leg wins, the other leg is usually bought to lose most of its premium. Change the scenario or seed above and see how often the combined result is positive: the next section does that for hundreds of paths.
            </Callout>
          )}
        </div>
      </div>

      <ChartContainer
        title="Leg premiums, entry to close"
        subtitle="Each leg's premium on the simulated path with the entry and exits marked."
        height={260}
        footer={<Legend items={[{ name: `${res.strike} CE`, color: chart.ice }, { name: `${res.strike} PE`, color: chart.gold }]} />}
      >
        <TimeChart data={rows} cursor={t.entry} refs={refs} height={260} domain={[0, Math.ceil(max * 1.08)]} yFmt={(v) => v.toFixed(0)} tipFmt={(v) => `₹${v.toFixed(2)}`} ariaLabel={`Premium of the ${res.strike} call and put from ${minuteLabel(t.entry)} to the close`} series={[{ key: 'ce', name: 'CE premium', color: chart.ice }, { key: 'pe', name: 'PE premium', color: chart.gold }]} />
      </ChartContainer>
    </div>
  )
}
