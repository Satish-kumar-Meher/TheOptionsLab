import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Dices, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, ChartContainer, DataTable, GlassPanel, Segmented, Slider, type Column } from '@/components/ui'
import { axisProps, chart, gridProps, tooltipStyle } from '@/lib/chartTheme'
import { fmtCompactIN, fmtIN, fmtPct, fmtRupee } from '@/lib/format'
import { DEFAULT_PARAMS, breakEvenWinRate, type CurvePoint, type Trade, type TradeParams } from '@/lib/backtest'
import { CAPITAL, ChartSummary, QSection, SyntheticBanner } from './shared'

type View = 'net' | 'gross' | 'both'
const PAGE = 12

export function BacktestStudio({ params, setParams, trades, curve }: { params: TradeParams; setParams: (p: TradeParams) => void; trades: Trade[]; curve: CurvePoint[] }) {
  const [view, setView] = useState<View>('both')
  const [page, setPage] = useState(0)
  const set = <K extends keyof TradeParams>(k: K, v: TradeParams[K]) => { setParams({ ...params, [k]: v }); setPage(0) }
  const cost = (params.charges + params.slippage)
  const be = breakEvenWinRate(params.avgWin, params.avgLoss, cost)
  const last = curve[curve.length - 1]
  const drag = trades.reduce((s, t) => s + t.cost, 0)
  const pages = Math.max(1, Math.ceil(trades.length / PAGE))
  const p = Math.min(page, pages - 1)
  const rows = useMemo(() => trades.slice(p * PAGE, p * PAGE + PAGE), [trades, p])

  const cols: Column<Trade>[] = [
    { key: 'i', header: '#', mono: true, align: 'right', width: '4rem' },
    { key: 'side', header: 'Result', render: (t) => <span className={t.net > 0 ? 'text-bull' : 'text-bear'}>{t.net > 0 ? '▲ Win' : '▼ Loss'}</span> },
    { key: 'gross', header: 'Gross ₹', mono: true, align: 'right', render: (t) => fmtRupee(t.gross) },
    { key: 'cost', header: 'Costs ₹', mono: true, align: 'right', render: (t) => <span className="text-fg-2">{fmtRupee(-t.cost)}</span> },
    { key: 'net', header: 'Net ₹', mono: true, align: 'right', render: (t) => <span className={t.net > 0 ? 'text-bull' : 'text-bear'}>{fmtRupee(t.net)}</span> },
    { key: 'vix', header: 'VIX regime', render: (t) => <span className="capitalize text-fg-2">{t.vix}</span> },
    { key: 'expiry', header: 'Day', render: (t) => <span className="text-fg-2">{t.expiry ? 'Expiry' : 'Regular'}</span> },
  ]

  return (
    <QSection id="backtest" eyebrow="24.4 — Backtesting fundamentals" title={<>A strategy lab that <span className="text-gold-gradient">cannot</span> flatter you</>} lead="Set a win rate and payoff, then watch brokerage, charges and slippage eat into the curve. The trades are random draws from your inputs, so nothing here describes how any real strategy would have done.">
      <SyntheticBanner />
      <div className="mt-8 grid gap-6 lg:grid-cols-[22rem_1fr]">
        <GlassPanel className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-lg font-semibold">Inputs</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" icon={<Dices className="size-4" aria-hidden />} onClick={() => set('seed', Math.floor(Math.random() * 1e6))} aria-label="Draw a new random trade sequence">New seed</Button>
              <Button size="sm" variant="ghost" icon={<RotateCcw className="size-4" aria-hidden />} onClick={() => { setParams(DEFAULT_PARAMS); setPage(0) }} aria-label="Reset all inputs">Reset</Button>
            </div>
          </div>
          <Slider label="Number of trades" value={params.n} min={50} max={1000} step={50} onChange={(v) => set('n', v)} />
          <Slider label="Win rate" value={params.winRate} min={0.3} max={0.8} step={0.01} onChange={(v) => set('winRate', v)} format={(v) => fmtPct(v, 0)} />
          <Slider label="Average win (₹ per lot)" value={params.avgWin} min={500} max={4000} step={100} onChange={(v) => set('avgWin', v)} format={fmtRupee} />
          <Slider label="Average loss (₹ per lot)" value={params.avgLoss} min={500} max={4000} step={100} onChange={(v) => set('avgLoss', v)} format={fmtRupee} />
          <Slider label="Trade-size noise" value={params.noise} min={0} max={0.8} step={0.05} onChange={(v) => set('noise', v)} format={(v) => fmtPct(v, 0)} hint="How much each trade's size varies around the average." />
          <Slider label="Brokerage + charges (₹ per lot)" value={params.charges} min={0} max={300} step={10} onChange={(v) => set('charges', v)} format={fmtRupee} />
          <Slider label="Slippage (₹ per lot)" value={params.slippage} min={0} max={300} step={10} onChange={(v) => set('slippage', v)} format={fmtRupee} />
          <Slider label="Position size (lots)" value={params.lots} min={1} max={10} onChange={(v) => set('lots', v)} />
          <p className="text-[0.76rem] leading-relaxed text-fg-3">Starting capital is fixed at {fmtRupee(CAPITAL)} for drawdown percentages. Seed {params.seed} keeps the sequence repeatable.</p>
        </GlassPanel>

        <div className="flex min-w-0 flex-col gap-6">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:grid-cols-4">
            {[
              ['Gross P&L', fmtRupee(last.gross), last.gross],
              ['Net P&L', fmtRupee(last.net), last.net],
              ['Total costs', fmtRupee(-drag), 0],
              ['Break-even win rate', fmtPct(be, 1), 0],
            ].map(([l, v, n]) => (
              <div key={String(l)} className="bg-surface p-4">
                <div className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-2">{l}</div>
                <div className={`num mt-1.5 text-[1.3rem] ${Number(n) > 0 ? 'text-bull' : Number(n) < 0 ? 'text-bear' : 'text-fg'}`}>{v}</div>
              </div>
            ))}
          </div>
          <p className="-mt-3 text-[0.8rem] leading-relaxed text-fg-2">
            With these inputs each trade must win about <span className="num text-fg">{fmtPct(be, 1)}</span> of the time just to break even after <span className="num text-fg">{fmtRupee(cost)}</span> of costs per lot. Your set win rate is <span className="num text-fg">{fmtPct(params.winRate, 0)}</span>; regime effects shift it slightly trade to trade.
          </p>

          <ChartContainer title="Equity curve" subtitle="Cumulative P&L in rupees. The gap between the lines is the cost of trading." height={300}
            actions={<Segmented ariaLabel="Equity view" value={view} onChange={setView} options={[{ value: 'both', label: 'Both' }, { value: 'net', label: 'Net' }, { value: 'gross', label: 'Gross' }]} />}>
            <ChartSummary>Equity curve over {trades.length} synthetic trades. Gross P&L ends at {fmtRupee(last.gross)}; net P&L after costs ends at {fmtRupee(last.net)}.</ChartSummary>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curve} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} aria-hidden>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="i" {...axisProps} minTickGap={40} />
                <YAxis {...axisProps} width={56} tickFormatter={fmtCompactIN} />
                <Tooltip {...tooltipStyle} formatter={(v) => fmtRupee(Number(v))} labelFormatter={(l) => `Trade ${l}`} />
                <ReferenceLine y={0} stroke={chart.axis} />
                {view !== 'net' && <Line type="monotone" dataKey="gross" name="Gross" stroke={chart.ice} strokeWidth={1.6} dot={false} isAnimationActive={false} />}
                {view !== 'gross' && <Line type="monotone" dataKey="net" name="Net" stroke={chart.gold} strokeWidth={2} dot={false} isAnimationActive={false} />}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Net drawdown" subtitle="Distance below the running equity peak, in rupees." height={190}>
            <ChartSummary>Net drawdown chart. Deepest point is {fmtRupee(Math.min(...curve.map((c) => c.dd)))} below the peak.</ChartSummary>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={curve} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} aria-hidden>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="i" {...axisProps} minTickGap={40} />
                <YAxis {...axisProps} width={56} tickFormatter={fmtCompactIN} />
                <Tooltip {...tooltipStyle} formatter={(v) => fmtRupee(Number(v))} labelFormatter={(l) => `Trade ${l}`} />
                <Area type="monotone" dataKey="dd" name="Drawdown" stroke={chart.bear} fill={chart.bear} fillOpacity={0.16} strokeWidth={1.4} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold">Trade log</h3>
            <p className="text-[0.82rem] text-fg-2">Synthetic · {fmtIN(trades.length)} trades · rows {p * PAGE + 1}–{Math.min(trades.length, p * PAGE + PAGE)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" disabled={p === 0} onClick={() => setPage(p - 1)} icon={<ChevronLeft className="size-4" aria-hidden />} aria-label="Previous page">Prev</Button>
            <span className="num min-w-16 text-center text-[0.82rem] text-fg-2" aria-live="polite">{p + 1} / {pages}</span>
            <Button size="sm" variant="secondary" disabled={p >= pages - 1} onClick={() => setPage(p + 1)} iconRight={<ChevronRight className="size-4" aria-hidden />} aria-label="Next page">Next</Button>
          </div>
        </div>
        <DataTable caption="Synthetic trade log" dense columns={cols} rows={rows} rowKey={(t) => t.i} />
      </div>
    </QSection>
  )
}
