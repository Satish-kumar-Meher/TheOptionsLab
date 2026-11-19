import { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Button, ChartContainer, Slider, Tex, cn } from '@/components/ui'
import { axisProps, chart, gridProps, tooltipStyle } from '@/lib/chartTheme'
import { fmtRupee } from '@/lib/format'
import { NumField, Note, Stat } from './shared'

export function ExpectancyTool() {
  const [win, setWin] = useState(45)
  const [avgWin, setAvgWin] = useState(3000)
  const [avgLoss, setAvgLoss] = useState(1500)
  const [n, setN] = useState(100)

  const r = useMemo(() => {
    const p = win / 100
    const rr = avgLoss > 0 ? avgWin / avgLoss : 0
    const be = avgWin + avgLoss > 0 ? avgLoss / (avgWin + avgLoss) : 1
    const exp = p * avgWin - (1 - p) * avgLoss
    const curve = Array.from({ length: 101 }, (_, i) => ({ w: i, e: Number(((i / 100) * rr - (1 - i / 100)).toFixed(4)) }))
    return { p, rr, be, exp, expR: avgLoss > 0 ? exp / avgLoss : 0, curve, total: exp * n }
  }, [win, avgWin, avgLoss, n])

  const positive = r.exp > 0
  const trap = win >= 70 && r.exp <= 0

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="glass-solid flex flex-col gap-5 p-5 sm:p-6">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">Inputs · your trade log, averaged</span>
        <Slider label="Win rate (probability of profit)" value={win} min={5} max={95} step={1} onChange={setWin} format={(v) => `${v}%`} />
        <NumField label="Average win (₹)" value={avgWin} onChange={setAvgWin} min={1} step={100} prefix="₹" />
        <NumField label="Average loss (₹, enter as positive)" value={avgLoss} onChange={setAvgLoss} min={1} step={100} prefix="₹" />
        <Slider label="Number of trades" value={n} min={10} max={500} step={10} onChange={setN} />
        <div className="flex flex-wrap gap-2 border-t border-line pt-4">
          <span className="w-full text-[0.74rem] text-fg-3">Try a preset</span>
          <Button variant="secondary" size="sm" onClick={() => { setWin(80); setAvgWin(500); setAvgLoss(3000) }}>High win rate, small wins</Button>
          <Button variant="secondary" size="sm" onClick={() => { setWin(35); setAvgWin(4500); setAvgLoss(1500) }}>Low win rate, big wins</Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="glass-solid grid gap-6 p-5 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-10 sm:p-8">
          <div>
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">Expectancy per trade</div>
            <div className={cn('num mt-2 text-[clamp(2.6rem,7vw,4.4rem)] font-medium leading-none', positive ? 'text-bull' : 'text-bear')} aria-live="polite">
              {positive ? '▲ ' : '▼ '}{fmtRupee(r.exp)}
            </div>
            <div className="num mt-2 text-[0.84rem] text-fg-2">{r.expR >= 0 ? '+' : '−'}{Math.abs(r.expR).toFixed(2)} R · {positive ? 'positive edge on these inputs' : 'no edge on these inputs'}</div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <Stat label="Reward : risk" value={`${r.rr.toFixed(2)} : 1`} sub="avg win ÷ avg loss" tone="gold" />
            <Stat label="Breakeven win rate" value={`${(r.be * 100).toFixed(1)}%`} sub={win / 100 >= r.be ? `you are ${(win - r.be * 100).toFixed(1)} pts above` : `you are ${(r.be * 100 - win).toFixed(1)} pts below`} tone="ice" />
            <Stat label={`Over ${n} trades`} value={fmtRupee(r.total)} sub="before costs, taxes, slippage" />
            <Stat label="Max loss / win" value={`${fmtRupee(avgLoss)} / ${fmtRupee(avgWin)}`} sub="per trade, as entered" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass-solid p-5">
            <Tex block>{String.raw`E = p\cdot W - (1-p)\cdot L`}</Tex>
            <Tex block>{String.raw`p_{\text{breakeven}} = \dfrac{L}{W+L} = \dfrac{1}{1+R}`}</Tex>
          </div>
          <Note tone={trap ? 'gold' : 'ice'}>
            <strong className="text-fg">A high win rate does not make a system profitable.</strong> Winning 80% of trades with ₹500 wins and ₹3,000 losses is negative: 0.8 × 500 − 0.2 × 3,000 = −₹200 per trade. Reward vs probability must always be read together.
          </Note>
        </div>
      </div>

      <div className="lg:col-span-2">
        <ChartContainer
          title="Expectancy vs win rate at your reward : risk"
          subtitle={`Expectancy in R (multiples of average loss) for R:R = ${r.rr.toFixed(2)}. Above zero the edge is positive; the line crosses zero at the breakeven win rate. Your inputs are the marked point.`}
          height={300}
          footer={`Text summary: at ${win}% win rate and ${r.rr.toFixed(2)}:1 reward-to-risk, expectancy is ${r.expR.toFixed(2)} R per trade; breakeven win rate is ${(r.be * 100).toFixed(1)}%.`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={r.curve} margin={{ top: 10, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="w" type="number" domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickFormatter={(v: number) => `${v}%`} {...axisProps} />
              <YAxis {...axisProps} width={44} tickFormatter={(v: number) => `${v.toFixed(1)}R`} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${Number(v).toFixed(2)} R`, 'Expectancy']} labelFormatter={(l) => `Win rate ${l}%`} />
              <ReferenceLine y={0} stroke={chart.fg2} strokeDasharray="4 4" />
              <ReferenceLine x={Number((r.be * 100).toFixed(1))} stroke={chart.gold} strokeDasharray="2 4" label={{ value: 'breakeven', fill: chart.gold, fontSize: 11, position: 'insideTopRight' }} />
              <Line type="linear" dataKey="e" stroke={chart.ice} strokeWidth={2.2} dot={false} isAnimationActive={false} />
              <ReferenceDot x={win} y={Number(r.expR.toFixed(4))} r={6} fill={chart.gold} stroke={chart.fg} strokeWidth={1.5} ifOverflow="extendDomain" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
