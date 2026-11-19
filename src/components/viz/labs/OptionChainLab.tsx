import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts'
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react'
import { Button, ChartContainer, GlassPanel, Segmented, Slider, Tip } from '@/components/ui'
import { axisProps, chart, gridProps, tooltipStyle } from '@/lib/chartTheme'
import { fmtCompactIN, fmtIN, fmtNum } from '@/lib/format'
import { CHAIN_EXPIRY_LABEL, CHAIN_LOT, CHAIN_SNAPSHOTS, chainStats, type CompareMode } from '@/data/optionChainSim'
import { Callout, Eyebrow, IntroStrip, Takeaways } from './parts/LabKit'
import { ChainTable } from './parts/ChainTable'

const GLOSSARY: { term: string; tip: string }[] = [
  { term: 'Open interest', tip: 'Contracts that are open (not closed or expired). Every open contract has one buyer and one seller.' },
  { term: 'Change in OI', tip: 'Open contracts now minus open contracts at the reference point. It nets out new positions and closures.' },
  { term: 'Volume', tip: 'Contracts traded today. High volume with little OI change often means positions are opened and closed within the day.' },
  { term: 'OI PCR', tip: 'Total put OI divided by total call OI. A ratio, not a forecast; its meaning depends on context.' },
  { term: 'Straddle', tip: 'ATM call LTP plus ATM put LTP. Divided by spot it gives a rough market-implied move to expiry.' },
  { term: 'ATM', tip: 'At the money: the strike nearest the current spot.' },
]

const sign = (n: number) => (n > 0 ? '+' : n < 0 ? '−' : '')

function Stat({ label, value, sub, tip }: { label: string; value: string; sub?: string; tip?: string }) {
  const l = <span className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-3">{label}</span>
  return (
    <div className="bg-surface p-4">
      {tip ? <Tip content={tip} side="bottom"><span className="underline decoration-dotted underline-offset-4">{l}</span></Tip> : l}
      <p className="num mt-2 text-[1.35rem] leading-none text-fg">{value}</p>
      {sub && <p className="mt-1.5 text-[0.74rem] leading-snug text-fg-2">{sub}</p>}
    </div>
  )
}

export default function OptionChainLab() {
  const [idx, setIdx] = useState(0)
  const [mode, setMode] = useState<CompareMode>('prev')
  const [playing, setPlaying] = useState(false)
  const last = CHAIN_SNAPSHOTS.length - 1
  const snap = CHAIN_SNAPSHOTS[idx]
  const stats = useMemo(() => chainStats(snap, mode), [snap, mode])
  const refLabel = mode === 'prev' ? (idx === 0 ? 'the day’s open' : `${CHAIN_SNAPSHOTS[idx - 1].time}`) : 'the day’s open'

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setIdx((i) => (i >= last ? i : i + 1)), 1400)
    return () => window.clearInterval(id)
  }, [playing, last])
  useEffect(() => { if (idx >= last) setPlaying(false) }, [idx, last])

  const profile = useMemo(() => snap.rows.map((r) => ({ strike: r.strike, ce: -r.ce.oi, pe: r.pe.oi })), [snap])
  const spotDelta = snap.spot - CHAIN_SNAPSHOTS[0].spot
  const mvName = (m: { strike: number; side: string; chg: number }) => `${fmtIN(m.strike)} ${m.side} (${sign(m.chg)}${fmtCompactIN(Math.abs(m.chg))})`

  return (
    <div className="flex flex-col gap-8">
      <IntroStrip>
        A seeded, simulated NIFTY weekly chain with every column from Module 8.2. Step through twelve 5-minute snapshots from 09:20 and watch open interest, change in OI and PCR evolve. None of it is live market data.
      </IntroStrip>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.8rem] text-fg-2">
        <Eyebrow className="mr-1">Glossary</Eyebrow>
        {GLOSSARY.map((g) => (
          <Tip key={g.term} content={g.tip} side="bottom"><span className="rounded-full border border-line px-3 py-1.5 text-fg-2 hover:text-fg">{g.term}</span></Tip>
        ))}
      </div>

      <GlassPanel className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
            <div>
              <Eyebrow>Snapshot {idx + 1} of {CHAIN_SNAPSHOTS.length}</Eyebrow>
              <p className="num mt-1.5 font-display text-5xl leading-none text-fg" aria-live="polite">{snap.time}</p>
            </div>
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-3">NIFTY spot (sim)</p>
              <p className="num mt-1.5 text-2xl leading-none text-fg">{fmtIN(snap.spot)}</p>
              <p className="num mt-1 text-[0.76rem] text-fg-2"><span aria-hidden>{spotDelta > 0 ? '▲' : spotDelta < 0 ? '▼' : '–'}</span> {sign(spotDelta)}{Math.abs(spotDelta)} since 09:20</p>
            </div>
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-3">India VIX (sim)</p>
              <p className="num mt-1.5 text-2xl leading-none text-fg">{fmtNum(snap.vix, 1)}</p>
            </div>
          </div>
          <p className="text-[0.8rem] text-fg-3">{CHAIN_EXPIRY_LABEL} · lot size {CHAIN_LOT} (check the current NSE contract specification)</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => { setPlaying(false); setIdx((i) => Math.max(0, i - 1)) }} disabled={idx === 0} aria-label="Previous snapshot"><ChevronLeft className="size-4" />Back</Button>
            {idx >= last && !playing ? (
              <Button variant="secondary" size="sm" onClick={() => { setIdx(0); setPlaying(true) }}><RotateCcw className="size-4" />Replay</Button>
            ) : (
              <Button variant="primary" size="sm" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>{playing ? <><Pause className="size-4" />Pause</> : <><Play className="size-4" />Play</>}</Button>
            )}
            <Button variant="secondary" size="sm" onClick={() => { setPlaying(false); setIdx((i) => Math.min(last, i + 1)) }} disabled={idx === last} aria-label="Next snapshot">Next<ChevronRight className="size-4" /></Button>
          </div>
          <Slider label="Snapshot time" value={idx} min={0} max={last} step={1} onChange={(v) => { setPlaying(false); setIdx(v) }} format={(i) => CHAIN_SNAPSHOTS[i].time} />
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[0.82rem] text-fg-2" id="cmp-label">Compare change in OI against</span>
            <Segmented ariaLabel="Compare change in OI against" value={mode} onChange={setMode} options={[{ value: 'prev', label: 'Previous snapshot' }, { value: 'open', label: 'Day open' }]} />
          </div>
        </div>
      </GlassPanel>

      <Callout title={`${snap.time} · what changed`} tone="ice">{snap.note}</Callout>

      <section aria-label="Option chain table" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">NIFTY weekly chain</h3>
          <p className="text-[0.78rem] text-fg-3">Chg OI is versus {refLabel} · bars: call OI in red, put OI in green · gold #1–#3 = largest OI on that side · scroll sideways on small screens</p>
        </div>
        <ChainTable snap={snap} stats={stats} mode={mode} />
      </section>

      <section aria-label="Derived metrics" className="flex flex-col gap-3">
        <Eyebrow>Derived from this snapshot</Eyebrow>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line md:grid-cols-4">
          <Stat label="Total CE OI" value={fmtCompactIN(stats.totalCE)} sub={`${sign(stats.chgCE)}${fmtCompactIN(Math.abs(stats.chgCE))} vs ${refLabel}`} />
          <Stat label="Total PE OI" value={fmtCompactIN(stats.totalPE)} sub={`${sign(stats.chgPE)}${fmtCompactIN(Math.abs(stats.chgPE))} vs ${refLabel}`} />
          <Stat label="OI PCR" value={fmtNum(stats.pcrOI, 2)} tip="Put OI ÷ call OI across the 21 strikes shown." sub="PE OI ÷ CE OI" />
          <Stat label="Volume PCR" value={fmtNum(stats.pcrVol, 2)} tip="Put volume ÷ call volume today. Volume counts trades, including those that close positions." sub="PE volume ÷ CE volume" />
          <Stat label="Highest CE OI" value={fmtIN(stats.maxCE.strike)} sub={`${fmtCompactIN(stats.maxCE.oi)} · potential resistance`} tip="The call strike with the most open contracts. A potential resistance area, not a guarantee." />
          <Stat label="Highest PE OI" value={fmtIN(stats.maxPE.strike)} sub={`${fmtCompactIN(stats.maxPE.oi)} · potential support`} tip="The put strike with the most open contracts. A potential support area, not a guarantee." />
          <Stat label={`ATM straddle (${fmtIN(stats.atmStrike)})`} value={`₹${fmtNum(stats.straddle, 1)}`} sub={`Implied move ≈ ±${fmtNum(stats.impliedMovePct, 2)}% (≈ ±${fmtIN(Math.round((stats.impliedMovePct / 100) * snap.spot))} pts) to expiry`} tip="ATM CE LTP + ATM PE LTP. A rough market-implied range to expiry; not a prediction of direction." />
          <Stat label="Largest OI add / cut" value={mvName(stats.biggestAdd)} sub={`Cut: ${mvName(stats.biggestCut)}`} tip="Biggest increase and decrease in OI at a single strike and side, versus the reference selected above." />
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <ChartContainer title="OI profile by strike" subtitle="Call OI extends left, put OI right. Dashed gold line marks the ATM strike." height={580}
          footer={<span>Text summary: highest call OI at {fmtIN(stats.maxCE.strike)} ({fmtCompactIN(stats.maxCE.oi)}), highest put OI at {fmtIN(stats.maxPE.strike)} ({fmtCompactIN(stats.maxPE.oi)}).</span>}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profile} layout="vertical" stackOffset="sign" margin={{ top: 4, right: 12, left: 4, bottom: 0 }} barCategoryGap={2}>
              <CartesianGrid {...gridProps} horizontal={false} vertical />
              <XAxis type="number" {...axisProps} tickFormatter={(v: number) => fmtCompactIN(Math.abs(v))} />
              <YAxis type="category" dataKey="strike" reversed width={52} {...axisProps} interval={1} tickFormatter={(v: number) => fmtIN(v)} />
              <RTooltip {...tooltipStyle} formatter={(v, n) => [fmtIN(Math.abs(Number(v))), String(n)]} labelFormatter={(l) => `Strike ${fmtIN(Number(l))}`} />
              <Legend wrapperStyle={{ fontSize: 12, color: chart.fg2 }} />
              <ReferenceLine y={stats.atmStrike} stroke={chart.gold} strokeDasharray="4 4" />
              <ReferenceLine x={0} stroke={chart.axis} />
              <Bar dataKey="ce" name="Call OI" stackId="oi" fill={chart.bearDeep} isAnimationActive={false} />
              <Bar dataKey="pe" name="Put OI" stackId="oi" fill={chart.bullDeep} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex flex-col gap-5">
          <GlassPanel>
            <Takeaways title="Reading this honestly" items={[
              <>A strike with large OI is a <strong className="font-medium text-fg">potential</strong> support or resistance area. It is not guaranteed to hold, and walls can be crossed or removed, as the 09:55 snapshot shows.</>,
              <>OI alone cannot show who initiated a trade: every open contract has a buyer and a seller. Rising call OI is <em>consistent with</em> call writing, not proof of it.</>,
              <>PCR is one ratio with limits: it ignores strike location, expiry mix and hedging, and the same value can mean different things on different days.</>,
              <>Cross-check OI with price, volume and IV before forming a view; and treat the straddle-implied move as a range estimate, not a direction.</>,
            ]} />
          </GlassPanel>
          <Callout title="Try this">
            Step to 09:55 with compare set to “Previous snapshot”: calls at 24,100 lose OI as spot trades through. Switch to “Day open” and see how much of the earlier build remains.
          </Callout>
        </div>
      </div>
    </div>
  )
}
