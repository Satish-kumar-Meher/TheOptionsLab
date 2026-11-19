import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartContainer, DataTable, Segmented, type Column } from '@/components/ui'
import { axisProps, chart, gridProps, tooltipStyle } from '@/lib/chartTheme'
import { fmtIN, fmtNum, fmtPct, fmtRupee } from '@/lib/format'
import { tradePnl, type PeriodRow, type SetupRow, type Stats } from '@/lib/journal'

const tone = (n: number): string => (n > 0 ? 'text-bull' : n < 0 ? 'text-bear' : 'text-fg')
const arrow = (n: number): string => (n > 0 ? '▲ ' : n < 0 ? '▼ ' : '')

export function Pnl({ value, dp = 0 }: { value: number; dp?: number }) {
  return <span className={`num ${tone(value)}`}>{arrow(value)}{fmtRupee(value, dp)}</span>
}

function Metric({ label, children, sub }: { label: string; children: React.ReactNode; sub?: string }) {
  return (
    <div className="min-w-0 border-t border-line pt-3">
      <dt className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-2">{label}</dt>
      <dd className="mt-1 text-[1.25rem] font-medium text-fg">{children}</dd>
      {sub && <p className="mt-0.5 text-[0.74rem] text-fg-3">{sub}</p>}
    </div>
  )
}

const pfText = (v: number): string => (v === Number.POSITIVE_INFINITY ? 'No losing trades' : Number.isNaN(v) ? '—' : fmtNum(v, 2))

export function Performance({ stats }: { stats: Stats }) {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const rows: PeriodRow[] = stats[period]
  const mistakeData = useMemo(() => stats.mistakes.filter((m) => m.mistake !== 'none' && m.count > 0).map((m) => ({ name: m.mistake, count: m.count, pnl: m.pnl })), [stats.mistakes])
  const dd = stats.maxDrawdown

  const setupCols: Column<SetupRow>[] = [
    { key: 'setup', header: 'Setup', render: (r) => <span className="text-fg">{r.setup}</span> },
    { key: 'trades', header: 'Trades', align: 'right', mono: true },
    { key: 'winRate', header: 'Win rate', align: 'right', mono: true, render: (r) => fmtPct(r.winRate, 0) },
    { key: 'avg', header: 'Avg / trade', align: 'right', render: (r) => <Pnl value={r.avg} /> },
    { key: 'pf', header: 'Profit factor', align: 'right', mono: true, render: (r) => pfText(r.profitFactor) },
    { key: 'total', header: 'Total', align: 'right', render: (r) => <Pnl value={r.total} /> },
  ]
  const periodCols: Column<PeriodRow>[] = [
    { key: 'key', header: period === 'weekly' ? 'Week starting' : period === 'monthly' ? 'Month' : 'Day', mono: true },
    { key: 'trades', header: 'Trades', align: 'right', mono: true },
    { key: 'pnl', header: 'P&L', align: 'right', render: (r) => <Pnl value={r.pnl} /> },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-end">
        <div>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-gold">Total P&amp;L · {stats.count} trade{stats.count === 1 ? '' : 's'}</span>
          <p className={`num mt-2 text-[clamp(2.4rem,7vw,4rem)] font-medium leading-none ${tone(stats.total)}`}>{arrow(stats.total)}{fmtRupee(stats.total)}</p>
          <p className="mt-3 max-w-sm text-[0.82rem] leading-relaxed text-fg-3">Gross of brokerage, taxes and slippage. Past results in a journal describe what happened, not what will happen.</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
          <Metric label="Win rate" sub={`${stats.wins}W · ${stats.losses}L · ${stats.breakeven}BE`}><span className="num">{fmtPct(stats.winRate, 0)}</span></Metric>
          <Metric label="Loss rate"><span className="num">{fmtPct(stats.lossRate, 0)}</span></Metric>
          <Metric label="Profit factor" sub="Gross profit ÷ gross loss"><span className="num">{pfText(stats.profitFactor)}</span></Metric>
          <Metric label="Avg win"><Pnl value={stats.avgWin} /></Metric>
          <Metric label="Avg loss"><Pnl value={stats.avgLoss} /></Metric>
          <Metric label="Expectancy" sub="Average ₹ per trade"><Pnl value={stats.expectancy} /></Metric>
          <Metric label="Max drawdown" sub="Peak to trough of the curve"><span className="num text-fg">{dd > 0 ? '▼ ' : ''}{fmtRupee(dd)}</span></Metric>
          <Metric label="Best trade">{stats.best ? <Pnl value={tradePnl(stats.best)} /> : '—'}</Metric>
          <Metric label="Worst trade">{stats.worst ? <Pnl value={tradePnl(stats.worst)} /> : '—'}</Metric>
        </dl>
      </div>

      <ChartContainer title="Cumulative P&L" subtitle="Running total after each trade, oldest to newest." simulated={false} height={260}
        footer={<span>Text summary: {stats.count} trades, ending at {fmtRupee(stats.total)} with a maximum drawdown of {fmtRupee(dd)}.</span>}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stats.curve} margin={{ top: 8, right: 28, bottom: 0, left: 0 }}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="n" {...axisProps} tickMargin={8} />
            <YAxis {...axisProps} width={56} tickFormatter={(v: number) => fmtIN(v)} />
            <ReferenceLine y={0} stroke={chart.axis} />
            <Tooltip {...tooltipStyle} formatter={(v) => [fmtRupee(Number(v)), 'Cumulative']} labelFormatter={(_, p) => (p && p[0] ? `Trade ${p[0].payload.n} · ${p[0].payload.label}` : '')} />
            <Line type="monotone" dataKey="cum" stroke={chart.gold} strokeWidth={2} dot={false} activeDot={{ r: 4 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-[1.1rem] font-semibold text-fg">P&amp;L by period</h3>
            <Segmented ariaLabel="Period" value={period} onChange={setPeriod} options={[{ value: 'daily', label: 'Daily' }, { value: 'weekly', label: 'Weekly' }, { value: 'monthly', label: 'Monthly' }]} />
          </div>
          <div className="max-h-[22rem] overflow-y-auto rounded-[var(--radius-xl)]">
            <DataTable dense caption={`P&L by ${period} period`} columns={periodCols} rows={rows} rowKey={(r) => r.key} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-[1.1rem] font-semibold text-fg">Setup-wise results</h3>
          <DataTable dense caption="Results by setup" columns={setupCols} rows={stats.bySetup} rowKey={(r) => r.setup} />
        </div>
      </div>

      <ChartContainer title="Mistake frequency" simulated={false} height={Math.max(120, mistakeData.length * 38 + 30)}
        subtitle="How often each tag from module 25.3 shows up. Fewer repeats of the same mistake is the goal, not a perfect record."
        footer={mistakeData.length === 0 ? 'No mistakes tagged in the current trades.' : <span>{mistakeData.map((m) => `${m.name}: ${m.count}`).join(' · ')}</span>}>
        {mistakeData.length === 0 ? (
          <p className="flex h-full items-center text-[0.9rem] text-fg-2">Nothing to chart yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mistakeData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid {...gridProps} horizontal={false} vertical />
              <XAxis type="number" allowDecimals={false} {...axisProps} />
              <YAxis type="category" dataKey="name" width={130} {...axisProps} />
              <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} formatter={(v, _n, p) => [`${String(v)} trade(s) · ${fmtRupee(Number(p.payload.pnl))}`, 'Count']} />
              <Bar dataKey="count" fill={chart.ice} radius={[0, 4, 4, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>
    </div>
  )
}
