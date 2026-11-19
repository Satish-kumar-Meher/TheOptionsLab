import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, ComposedChart, Area, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Play } from 'lucide-react'
import { Button, ChartContainer, DataTable, GlassPanel, Segmented, Slider, Tex, type Column } from '@/components/ui'
import { axisProps, chart, gridProps, tooltipStyle } from '@/lib/chartTheme'
import { fmtCompactIN, fmtNum, fmtPct, fmtRupee } from '@/lib/format'
import { heatGrid, monteCarlo, regimeBreakdown, walkForward, type MCResult, type RegimeRow, type SurfaceKind, type Trade } from '@/lib/backtest'
import { CAPITAL, ChartSummary, QSection, SyntheticBanner } from './shared'

/* diverging, muted: red (loss) ←→ green (profit) through a neutral dark mid */
function heatColor(v: number, lim: number): string {
  const t = Math.max(-1, Math.min(1, v / lim))
  const a = Math.abs(t)
  const [r, g, b] = t >= 0 ? [30, 150, 105] : [190, 62, 70]
  const mix = (c: number, base: number) => Math.round(base + (c - base) * a)
  return `rgb(${mix(r, 24)},${mix(g, 30)},${mix(b, 38)})`
}

/* ------------------------------ walk-forward ------------------------------ */
function WalkForward({ pnls }: { pnls: number[] }) {
  const [isLen, setIsLen] = useState(80)
  const [oosLen, setOosLen] = useState(40)
  const [variants, setVariants] = useState(12)
  const wf = useMemo(() => walkForward(pnls, isLen, oosLen, variants, 77), [pnls, isLen, oosLen, variants])
  const data = wf.windows.map((w) => ({ name: `W${w.k}`, IS: Math.round(w.isExp), OOS: Math.round(w.oosExp) }))
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_1fr]">
      <GlassPanel className="flex flex-col gap-5">
        <h3 className="font-display text-lg font-semibold">Walk-forward settings</h3>
        <Slider label="In-sample window (trades)" value={isLen} min={40} max={160} step={10} onChange={setIsLen} />
        <Slider label="Out-of-sample window (trades)" value={oosLen} min={20} max={80} step={10} onChange={setOosLen} />
        <Slider label="Candidate filters tried per window" value={variants} min={1} max={40} onChange={setVariants} hint="More candidates means more selection bias: in-sample improves, out-of-sample does not." />
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
          <div className="bg-surface p-3"><div className="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-fg-2">Efficiency</div><div className="num mt-1 text-[1.4rem] text-fg">{Number.isFinite(wf.efficiency) ? fmtPct(wf.efficiency, 0) : '—'}</div></div>
          <div className="bg-surface p-3"><div className="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-fg-2">OOS windows positive</div><div className="num mt-1 text-[1.4rem] text-fg">{fmtPct(wf.oosPositive, 0)}</div></div>
        </div>
        <div className="overflow-x-auto text-[0.9rem]"><Tex>{String.raw`\text{Efficiency} = \frac{\overline{E}_{OOS}}{\overline{E}_{IS}}`}</Tex></div>
        <p className="text-[0.76rem] leading-relaxed text-fg-3">Efficiency near 100% suggests the in-sample edge carried over. Far below it, or negative, is the signature of overfitting.</p>
      </GlassPanel>
      <ChartContainer title="Expectancy per window: in-sample vs out-of-sample" subtitle="Net ₹ per trade, using the trades from the studio. Each window picks its best candidate filter in-sample, then applies it unseen." height={320}>
        <ChartSummary>{wf.windows.length} walk-forward windows. Average in-sample expectancy {fmtRupee(wf.avgIS)}, average out-of-sample {fmtRupee(wf.avgOOS)}.</ChartSummary>
        {wf.windows.length === 0 ? <p className="text-fg-2">Windows are longer than the trade list. Add trades or shorten the windows.</p> : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} aria-hidden>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" {...axisProps} />
              <YAxis {...axisProps} width={52} tickFormatter={fmtCompactIN} />
              <Tooltip {...tooltipStyle} formatter={(v) => fmtRupee(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 12, color: chart.fg2 }} />
              <ReferenceLine y={0} stroke={chart.axis} />
              <Bar dataKey="IS" name="In-sample" fill={chart.ice} radius={[3, 3, 0, 0]} isAnimationActive={false} />
              <Bar dataKey="OOS" name="Out-of-sample" fill={chart.gold} radius={[3, 3, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>
    </div>
  )
}

/* -------------------------------- heatmap -------------------------------- */
function Sensitivity() {
  const [kind, setKind] = useState<SurfaceKind>('plateau')
  const g = useMemo(() => heatGrid(kind, 9, 9), [kind])
  const lim = Math.max(Math.abs(g.min), Math.abs(g.max))
  const S = 9
  const cell = 44
  const pad = 40
  const W = pad + S * cell
  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_20rem]">
      <figure className="glass-solid m-0 p-5 sm:p-6">
        <figcaption className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-[1.02rem] font-semibold">Parameter sensitivity heatmap</h3>
            <p className="mt-1 text-[0.82rem] text-fg-2">Expectancy (₹ per trade) over stop-loss multiple (x) and profit-target multiple (y). Synthetic surface, illustration only.</p>
          </div>
          <Segmented ariaLabel="Surface type" value={kind} onChange={setKind} options={[{ value: 'plateau', label: 'Broad plateau' }, { value: 'spike', label: 'Sharp peak' }]} />
        </figcaption>
        <ChartSummary>Heatmap of expectancy across {S} by {S} parameter pairs. Best cell {fmtRupee(g.peak.v)}; its neighbours average {fmtPct(g.neighbourRatio, 0)} of that.</ChartSummary>
        <div className="mt-4 overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${pad + S * cell}`} className="mx-auto block w-full min-w-[22rem] max-w-[32rem]" role="img" aria-label="Parameter sensitivity heatmap" fontFamily="'JetBrains Mono Variable', monospace">
            {g.values.map((row, r) => row.map((v, c) => {
              const x = pad + c * cell
              const y = (S - 1 - r) * cell
              const isPeak = r === g.peak.r && c === g.peak.c
              return (
                <g key={`${r}-${c}`}>
                  <rect x={x + 1} y={y + 1} width={cell - 2} height={cell - 2} rx={4} fill={heatColor(v, lim)} stroke={isPeak ? '#C9A86A' : 'none'} strokeWidth={2.5} />
                  <text x={x + cell / 2} y={y + cell / 2 + 4} textAnchor="middle" fontSize={11} fill="#F4F7FA">{v >= 0 ? '▲' : '▼'}{Math.abs(Math.round(v))}</text>
                </g>
              )
            }))}
            {g.xs.map((x, c) => <text key={`x${c}`} x={pad + c * cell + cell / 2} y={S * cell + 18} textAnchor="middle" fontSize={10} fill="#929DA9">{x}</text>)}
            {g.ys.map((y, r) => <text key={`y${r}`} x={pad - 6} y={(S - 1 - r) * cell + cell / 2 + 4} textAnchor="end" fontSize={10} fill="#929DA9">{y}</text>)}
          </svg>
        </div>
        <p className="mt-3 text-[0.78rem] text-fg-3">▲ profit, ▼ loss, gold outline = best cell. Colour is diverging: red below zero, green above.</p>
      </figure>
      <div className="flex flex-col gap-4 self-start text-[0.9rem] leading-relaxed text-fg-2">
        <h3 className="font-display text-lg font-semibold text-fg">How to read it</h3>
        <p><strong className="text-fg">Sharp peak = overfit.</strong> One bright cell surrounded by dull or red ones means the result depends on exact parameter values. A small change in the market would break it.</p>
        <p><strong className="text-fg">Broad plateau = robust.</strong> Many neighbouring settings give similar results, so the edge does not hinge on a lucky number. Pick the middle of the plateau, not its highest point.</p>
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg-2">Best cell vs its neighbours</div>
          <div className="num mt-1 text-[1.5rem] text-fg">{Number.isFinite(g.neighbourRatio) ? fmtPct(Math.max(0, g.neighbourRatio), 0) : '—'}</div>
          <p className="mt-1 text-[0.78rem] text-fg-3">Neighbours average this share of the peak value. Near 100% is a plateau; near 0% is a needle.</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------- Monte Carlo ------------------------------ */
function MonteCarlo({ pnls }: { pnls: number[] }) {
  const [runs, setRuns] = useState(500)
  const [thr, setThr] = useState(40000)
  const [res, setRes] = useState<MCResult | null>(null)
  const [stale, setStale] = useState(false)
  const run = () => { setRes(monteCarlo(pnls, runs, thr, CAPITAL, 4242)); setStale(false) }
  const fan = res?.fan.map((f) => ({ i: f.i, p5: f.p5, band90: [f.p5, f.p95] as [number, number], band50: [f.p25, f.p75] as [number, number], p50: f.p50, p95: f.p95 }))
  const note = res && (stale ? 'Inputs changed since this run. Run again to refresh.' : null)
  return (
    <div className="mt-14">
      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        <GlassPanel className="flex flex-col gap-5">
          <h3 className="font-display text-lg font-semibold">Monte Carlo</h3>
          <p className="text-[0.84rem] leading-relaxed text-fg-2">Reshuffles the same trades with replacement to show how much of the result was the lucky order. It cannot create information the trades do not contain.</p>
          <Slider label="Simulations" value={runs} min={500} max={1000} step={100} onChange={(v) => { setRuns(v); setStale(true) }} />
          <Slider label="Drawdown threshold (₹)" value={thr} min={10000} max={150000} step={5000} onChange={(v) => { setThr(v); setStale(true) }} format={fmtRupee} />
          <Button icon={<Play className="size-4" aria-hidden />} onClick={run}>{res ? 'Run again' : `Run ${runs} simulations`}</Button>
          {note && <p role="status" className="text-[0.78rem] text-gold">{note}</p>}
        </GlassPanel>
        <div className="min-w-0">
          {!res || !fan ? (
            <div className="glass-solid flex h-full min-h-64 items-center justify-center p-8 text-center text-[0.9rem] text-fg-2">Press the button to run {runs} resamples of the {pnls.length} synthetic trades. Nothing runs until you ask.</div>
          ) : (
            <ChartContainer title="Equity fan" subtitle={`${res.runs} resampled paths · bands show 5–95% and 25–75% of outcomes at each trade count`} height={320}>
              <ChartSummary>Monte Carlo fan over {res.horizon} trades. Median final P&L {fmtRupee(res.finalP50)}, 5th percentile {fmtRupee(res.finalP5)}, 95th {fmtRupee(res.finalP95)}.</ChartSummary>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={fan} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} aria-hidden>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="i" {...axisProps} minTickGap={40} />
                  <YAxis {...axisProps} width={56} tickFormatter={fmtCompactIN} />
                  <Tooltip {...tooltipStyle} formatter={(v) => (Array.isArray(v) ? `${fmtRupee(Number(v[0]))} to ${fmtRupee(Number(v[1]))}` : fmtRupee(Number(v)))} labelFormatter={(l) => `Trade ${l}`} />
                  <ReferenceLine y={0} stroke={chart.axis} />
                  <Area dataKey="band90" name="5–95%" stroke="none" fill={chart.ice} fillOpacity={0.14} isAnimationActive={false} />
                  <Area dataKey="band50" name="25–75%" stroke="none" fill={chart.ice} fillOpacity={0.25} isAnimationActive={false} />
                  <Line dataKey="p50" name="Median" stroke={chart.gold} strokeWidth={2} dot={false} isAnimationActive={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </div>
      </div>
      {res && (
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line lg:grid-cols-5">
          {[
            [`P(max drawdown ≥ ${fmtRupee(thr)})`, fmtPct(res.probDD, 1)],
            ['Median max drawdown', fmtRupee(-res.ddP50)],
            ['95th-pct max drawdown', fmtRupee(-res.ddP95)],
            ['P(ending below zero)', fmtPct(res.probLoss, 1)],
            ['Final P&L, 5th to 95th', `${fmtCompactIN(res.finalP5)} to ${fmtCompactIN(res.finalP95)}`],
          ].map(([l, v]) => (
            <div key={l} className="bg-surface p-4"><div className="font-mono text-[0.64rem] uppercase leading-snug tracking-[0.08em] text-fg-2">{l}</div><div className="num mt-1.5 text-[1.2rem] text-fg">{v}</div></div>
          ))}
        </div>
      )}
    </div>
  )
}

/* --------------------------------- regimes -------------------------------- */
function Regimes({ trades }: { trades: Trade[] }) {
  const rb = useMemo(() => regimeBreakdown(trades), [trades])
  const cols: Column<RegimeRow>[] = [
    { key: 'label', header: 'Bucket', render: (r) => <span className="text-fg">{r.label}</span> },
    { key: 'n', header: 'Trades', mono: true, align: 'right' },
    { key: 'winRate', header: 'Win rate', mono: true, align: 'right', render: (r) => fmtPct(r.winRate, 0) },
    { key: 'expectancy', header: 'Expectancy ₹', mono: true, align: 'right', render: (r) => <span className={r.expectancy > 0 ? 'text-bull' : r.expectancy < 0 ? 'text-bear' : ''}>{r.expectancy > 0 ? '▲ ' : r.expectancy < 0 ? '▼ ' : ''}{fmtRupee(r.expectancy)}</span> },
    { key: 'total', header: 'Total ₹', mono: true, align: 'right', render: (r) => fmtRupee(r.total) },
    { key: 'noisy', header: 'Signal?', render: (r) => <span className="text-fg-2">{r.noisy ? 'Within noise' : 'Distinguishable'}</span> },
  ]
  return (
    <div className="mt-14">
      <h3 className="font-display text-xl font-semibold">Regime performance</h3>
      <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-fg-2">The same trades, split by India VIX bucket and by expiry day. India VIX measures expected volatility, not direction, so a bucket describes conditions and does not predict the next trade. Small buckets are noisy: a difference inside about two standard errors is probably chance.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div><h4 className="mb-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-fg-2">By India VIX bucket (synthetic labels)</h4><DataTable caption="Synthetic performance by India VIX bucket" dense columns={cols} rows={rb.vix} rowKey={(r) => r.key} /></div>
        <div><h4 className="mb-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-fg-2">Expiry vs non-expiry day</h4><DataTable caption="Synthetic performance by expiry day" dense columns={cols} rows={rb.expiry} rowKey={(r) => r.key} /></div>
      </div>
      <p className="mt-3 text-[0.78rem] text-fg-3">Based on {fmtNum(rb.vix.reduce((s, r) => s + r.n, 0), 0)} synthetic trades. Regime tags are assigned by the generator, not taken from real VIX history.</p>
    </div>
  )
}

export function AdvancedTesting({ trades }: { trades: Trade[] }) {
  const pnls = useMemo(() => trades.map((t) => t.net), [trades])
  return (
    <>
      <QSection id="walk-forward" eyebrow="24.6 — Advanced testing · walk-forward" title={<>Test on data the strategy <span className="text-gold-gradient">has never seen</span></>} lead="Optimise on one window, judge on the next, then roll forward. If out-of-sample results collapse, the in-sample edge was probably fitted to noise.">
        <SyntheticBanner />
        <WalkForward pnls={pnls} />
        <Sensitivity />
      </QSection>
      <QSection id="monte-carlo" tint eyebrow="24.6 — Advanced testing · Monte Carlo" title={<>How much was <span className="text-gold-gradient">luck of the order</span>?</>} lead="One backtest is one path. Resampling gives a range of paths, and the drawdown you should plan for is usually deeper than the one you saw.">
        <SyntheticBanner />
        <MonteCarlo pnls={pnls} />
      </QSection>
      <QSection id="regimes" eyebrow="24.6 — Advanced testing · regimes" title={<>Where does it work, <span className="text-gold-gradient">and where does it not</span>?</>} lead="Averages hide regimes. Splitting results by volatility level and by expiry day shows whether the edge is broad or lives in one corner.">
        <SyntheticBanner />
        <Regimes trades={trades} />
      </QSection>
    </>
  )
}
