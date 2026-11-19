import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartContainer, DataTable, Slider, Tex, type Column } from '@/components/ui'
import { axisProps, chart, gridProps, tooltipStyle } from '@/lib/chartTheme'
import { fmtRupee } from '@/lib/format'
import { NumField, Note } from './shared'

const need = (d: number) => (d / (1 - d)) * 100
const rows = [10, 20, 30, 50, 70].map((d) => ({ d, gain: need(d / 100) }))
const cols: Column<(typeof rows)[number]>[] = [
  { key: 'd', header: 'Drawdown', mono: true, render: (r) => `▼ ${r.d}%` },
  { key: 'left', header: 'Equity left of ₹100', mono: true, align: 'right', render: (r) => `₹${100 - r.d}` },
  { key: 'gain', header: 'Gain needed to recover', mono: true, align: 'right', render: (r) => `▲ ${r.gain.toFixed(1)}%` },
  { key: 'x', header: 'Multiple needed', mono: true, align: 'right', render: (r) => `${(1 + r.gain / 100).toFixed(2)}×` },
]

export function DrawdownTool() {
  const [dd, setDd] = useState(30)
  const [profit, setProfit] = useState(240000)
  const [maxDd, setMaxDd] = useState(80000)
  const gain = need(dd / 100)
  const data = useMemo(() => Array.from({ length: 86 }, (_, i) => ({ d: i + 5, g: Number(need((i + 5) / 100).toFixed(2)) })), [])
  const rf = maxDd > 0 ? profit / maxDd : NaN

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="glass-solid flex flex-col gap-6 p-5 sm:p-8 lg:col-span-5">
        <Slider label="Drawdown from peak equity" value={dd} min={5} max={90} step={1} onChange={setDd} format={(v) => `▼ ${v}%`} />
        <div>
          <div className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">Gain required to get back to the peak</div>
          <div className="num mt-2 text-[clamp(3rem,8vw,5rem)] font-medium leading-none text-fg" aria-live="polite">{gain.toFixed(1)}%</div>
          <p className="mt-3 text-[0.86rem] leading-relaxed text-fg-2">Losses and gains are asymmetric: after a {dd}% fall you hold {100 - dd}% of your capital, and must grow it by {gain.toFixed(1)}% — not {dd}% — just to break even.</p>
        </div>
        <Tex block>{String.raw`\text{gain required}=\dfrac{d}{1-d}`}</Tex>
        <Note>This ignores costs and assumes you can trade at the same size, risk and discipline while recovering. In practice, deep drawdowns also damage confidence and tempt larger bets — which is the usual way a drawdown becomes permanent.</Note>
      </div>

      <div className="lg:col-span-7">
        <ChartContainer title="The recovery curve is convex" subtitle="Required gain rises slowly at first, then explodes beyond about 50% drawdown." height={300} footer={`Text summary: a ${dd}% drawdown needs a ${gain.toFixed(1)}% gain; a 50% drawdown needs 100%; a 90% drawdown needs 900%.`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 16, bottom: 4, left: 0 }}>
              <defs>
                <linearGradient id="ddg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chart.ice} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={chart.ice} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="d" type="number" domain={[5, 90]} ticks={[10, 30, 50, 70, 90]} tickFormatter={(v: number) => `${v}%`} {...axisProps} />
              <YAxis {...axisProps} scale="sqrt" domain={[0, 900]} ticks={[0, 25, 100, 300, 900]} width={50} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${Number(v).toFixed(1)}%`, 'Gain needed']} labelFormatter={(l) => `Drawdown ${l}%`} />
              <Area type="monotone" dataKey="g" stroke={chart.ice} strokeWidth={2.2} fill="url(#ddg)" isAnimationActive={false} />
              <ReferenceDot x={dd} y={Number(gain.toFixed(2))} r={6} fill={chart.gold} stroke={chart.fg} strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="lg:col-span-7">
        <DataTable caption="Gain required to recover from common drawdowns" columns={cols} rows={rows} rowKey={(r) => r.d} />
      </div>
      <div className="glass-solid flex flex-col gap-4 p-5 sm:p-6 lg:col-span-5">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">Recovery factor</span>
        <Tex block>{String.raw`\text{recovery factor}=\dfrac{\text{net profit}}{\text{maximum drawdown}}`}</Tex>
        <div className="grid grid-cols-2 gap-4">
          <NumField label="Net profit (₹)" value={profit} onChange={setProfit} step={10000} prefix="₹" />
          <NumField label="Max drawdown (₹)" value={maxDd} onChange={setMaxDd} min={1} step={10000} prefix="₹" />
        </div>
        <div className="num text-[2.2rem] font-medium leading-none text-fg" aria-live="polite">{Number.isFinite(rf) ? rf.toFixed(2) : '—'}</div>
        <p className="text-[0.8rem] leading-relaxed text-fg-2">
          Your history made {fmtRupee(profit)} against a worst peak-to-trough fall of {fmtRupee(maxDd)}. Higher means profit was earned with less pain, but it is backward-looking: a future drawdown can exceed any past one.
        </p>
      </div>
    </div>
  )
}
