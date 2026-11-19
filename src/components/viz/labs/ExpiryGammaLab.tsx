import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { Pause, Play, RotateCcw, Shuffle } from 'lucide-react'
import { Accordion, Button, ChartContainer, DataTable, GlassPanel, Segmented, Slider, type Column } from '@/components/ui'
import { chart } from '@/lib/chartTheme'
import { fmtIN } from '@/lib/format'
import { getModule } from '@/data/curriculum'
import {
  DEFAULT_MODEL, EXPIRY_SCENARIOS, STEPS, STRIKE_STEP, genPath, minuteLabel, optionAt, roundStrike,
  type ExpiryScenario, type ModelParams, type TradeParams,
} from '@/lib/expirySim'
import { Callout, Eyebrow, IntroStrip } from './parts/LabKit'
import { Legend, TimeChart, type Row } from './parts-eg/Charts'
import { DistributionBlock } from './parts-eg/DistributionBlock'
import { Stat } from './parts-eg/Stat'
import { DEFAULT_TRADE, TradeSim } from './parts-eg/TradeSim'

type Side = 'CE' | 'PE'

interface StrikeRow { strike: number; tag: string; ceP: number; ceD: number; peP: number; peD: number; gamma: number; atm: boolean }

const OTM_OFFSETS = [-200, -100, 0, 100, 200]

export default function ExpiryGammaLab() {
  const reduce = useReducedMotion()
  const [scn, setScn] = useState<ExpiryScenario>('pin')
  const [seed, setSeed] = useState(1)
  const [ivPct, setIvPct] = useState(14)
  const [crushPct, setCrushPct] = useState(0)
  const [rvMult, setRvMult] = useState(1)
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [side, setSide] = useState<Side>('CE')
  const [trade, setTrade] = useState<TradeParams>(DEFAULT_TRADE)

  const model = useMemo<ModelParams>(() => ({ ...DEFAULT_MODEL, iv: ivPct / 100, crush: crushPct / 100, rvMult }), [ivPct, crushPct, rvMult])
  const path = useMemo(() => genPath(scn, seed, model.iv * model.rvMult), [scn, seed, model.iv, model.rvMult])
  const k0 = useMemo(() => roundStrike(path[0]), [path])
  const blurb = EXPIRY_SCENARIOS.find((s) => s.id === scn)?.blurb ?? ''

  // Playback: 1 minute per tick; with reduced motion, coarser jumps at a calmer cadence.
  useEffect(() => {
    if (!playing) return
    const stepSize = reduce ? 10 : 1
    const id = window.setInterval(() => {
      setIdx((i) => Math.min(STEPS - 1, i + stepSize))
    }, reduce ? 700 : 90)
    return () => window.clearInterval(id)
  }, [playing, reduce])

  useEffect(() => { if (idx >= STEPS - 1) setPlaying(false) }, [idx])

  const togglePlay = () => {
    if (playing) { setPlaying(false); return }
    if (idx >= STEPS - 1) setIdx(0)
    setPlaying(true)
  }

  /* ---- full-day series (cheap: 151 points) ---- */
  const full = useMemo(() => {
    const spot: Row[] = []
    const prem: Row[] = []
    const greeks: Row[] = []
    let sMin = Infinity, sMax = -Infinity, pMax = 1, gMax = 0, tMin = 0
    for (let i = 0; i < STEPS; i++) {
      const s = path[i]
      sMin = Math.min(sMin, s); sMax = Math.max(sMax, s)
      spot.push({ i, spot: s })
      const p: Row = { i }
      for (const t of ['CE', 'PE'] as const) {
        const sgn = t === 'CE' ? 1 : -1
        for (const off of [0, 100, 200]) {
          const v = optionAt(t, s, k0 + sgn * off, i, model).price
          p[`${t}${off}`] = v
          pMax = Math.max(pMax, v)
        }
      }
      prem.push(p)
      const atm = roundStrike(s)
      const ce = optionAt('CE', s, atm, i, model)
      const pe = optionAt('PE', s, atm, i, model)
      const thCe = ce.theta / 24
      const thPe = pe.theta / 24
      gMax = Math.max(gMax, ce.gamma)
      tMin = Math.min(tMin, thCe, thPe)
      greeks.push({ i, gamma: ce.gamma, thCe, thPe })
    }
    return { spot, prem, greeks, sMin, sMax, pMax, gMax, tMin }
  }, [path, k0, model])

  const upTo = <T,>(a: T[]) => a.slice(0, idx + 1)
  const spotRows = useMemo(() => upTo(full.spot), [full.spot, idx]) // eslint-disable-line react-hooks/exhaustive-deps
  const premRows = useMemo(() => upTo(full.prem), [full.prem, idx]) // eslint-disable-line react-hooks/exhaustive-deps
  const greekRows = useMemo(() => upTo(full.greeks), [full.greeks, idx]) // eslint-disable-line react-hooks/exhaustive-deps

  const spot = path[idx]
  const atmNow = roundStrike(spot)
  const atmCe = optionAt('CE', spot, atmNow, idx, model)
  const atmPe = optionAt('PE', spot, atmNow, idx, model)
  const straddle = atmCe.price + atmPe.price

  const table = useMemo<StrikeRow[]>(
    () => OTM_OFFSETS.map((o) => {
      const strike = k0 + o
      const ce = optionAt('CE', spot, strike, idx, model)
      const pe = optionAt('PE', spot, strike, idx, model)
      const atm = strike === atmNow
      const tag = atm ? 'ATM' : strike > spot ? `CE OTM · PE ITM` : `PE OTM · CE ITM`
      return { strike, tag, ceP: ce.price, ceD: ce.delta, peP: pe.price, peD: pe.delta, gamma: ce.gamma, atm }
    }),
    [k0, spot, idx, model, atmNow],
  )

  const cols: Column<StrikeRow>[] = [
    { key: 'k', header: 'Strike', mono: true, render: (r) => <span className={r.atm ? 'text-gold' : 'text-fg'}>{fmtIN(r.strike)}</span> },
    { key: 'tag', header: 'Moneyness', render: (r) => <span className="whitespace-nowrap text-[0.78rem] text-fg-2">{r.tag}</span> },
    { key: 'cp', header: 'CE ₹', align: 'right', mono: true, render: (r) => r.ceP.toFixed(2) },
    { key: 'cd', header: 'CE Δ', align: 'right', mono: true, render: (r) => r.ceD.toFixed(2) },
    { key: 'pp', header: 'PE ₹', align: 'right', mono: true, render: (r) => r.peP.toFixed(2) },
    { key: 'pd', header: 'PE Δ', align: 'right', mono: true, render: (r) => r.peD.toFixed(2) },
    { key: 'g', header: 'Gamma', align: 'right', mono: true, render: (r) => r.gamma.toFixed(5) },
  ]

  const mod = getModule('19.5')
  const topics = mod?.topics ?? []

  const premSeries = side === 'CE'
    ? [{ key: 'CE0', name: `${k0} CE (ATM)`, color: chart.fg }, { key: 'CE100', name: `${k0 + 100} CE (+100 OTM)`, color: chart.ice }, { key: 'CE200', name: `${k0 + 200} CE (+200 OTM)`, color: chart.gold }]
    : [{ key: 'PE0', name: `${k0} PE (ATM)`, color: chart.fg }, { key: 'PE100', name: `${k0 - 100} PE (−100 OTM)`, color: chart.ice }, { key: 'PE200', name: `${k0 - 200} PE (−200 OTM)`, color: chart.gold }]

  const strikeRefs = [-100, 0, 100].map((o) => ({ y: k0 + o, label: `${k0 + o}`, color: o === 0 ? chart.gold : chart.fg, dash: o === 0 ? '2 3' : '4 6', pos: 'insideTopLeft' as const }))
  const pad = Math.max(40, STRIKE_STEP)
  const spotDomain: [number, number] = [Math.floor((Math.min(full.sMin, k0 - 100) - pad / 2) / 10) * 10, Math.ceil((Math.max(full.sMax, k0 + 100) + pad / 2) / 10) * 10]

  const resetAll = () => { setPlaying(false); setIdx(0) }

  return (
    <div className="flex flex-col gap-8">
      <IntroStrip>
        An expiry-day afternoon from 13:00 to 15:30, priced minute by minute with Black–Scholes. Watch gamma rise and time value drain near the strike. Flat implied vol, no skew, no spreads: a model for learning, not a forecast.
      </IntroStrip>

      {/* ---------------------------------------------------------- controls */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <GlassPanel className="flex flex-col gap-4">
          <Eyebrow>Scenario</Eyebrow>
          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <Segmented ariaLabel="Expiry scenario" value={scn} onChange={(v) => { setScn(v); resetAll() }} options={EXPIRY_SCENARIOS.map((s) => ({ value: s.id, label: s.label }))} />
          </div>
          <p className="min-h-[3.2rem] text-[0.88rem] leading-relaxed text-fg-2" aria-live="polite">{blurb}</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm" icon={<Shuffle size={15} aria-hidden />} onClick={() => { setSeed((s) => s + 1); resetAll() }}>New random path</Button>
            <span className="self-center font-mono text-[0.72rem] text-fg-3">Path #{seed} · ATM at 13:00 = {fmtIN(k0)}</span>
          </div>
        </GlassPanel>
        <GlassPanel className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <Slider label="Implied vol" value={ivPct} min={8} max={40} step={1} onChange={setIvPct} format={(v) => `${v}%`} hint="Flat IV used for all strikes." />
          <Slider label="IV crush by close" value={crushPct} min={0} max={50} step={5} onChange={setCrushPct} format={(v) => `${v}%`} hint="IV falls linearly to this much lower by 15:30." />
          <Slider label="Intraday vol vs IV" value={rvMult} min={0.5} max={2} step={0.1} onChange={setRvMult} format={(v) => `${v.toFixed(1)}×`} hint="Realised path vol as a multiple of IV." />
        </GlassPanel>
      </div>

      {/* ---------------------------------------------------------- scrubber */}
      <GlassPanel className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" onClick={togglePlay} icon={playing ? <Pause size={15} aria-hidden /> : <Play size={15} aria-hidden />}>{playing ? 'Pause' : idx >= STEPS - 1 ? 'Replay' : 'Play'}</Button>
          <Button size="sm" variant="ghost" onClick={resetAll} icon={<RotateCcw size={15} aria-hidden />}>Back to 13:00</Button>
          <p className="font-mono text-[0.72rem] text-fg-3">{reduce ? 'Reduced motion: playback jumps 10 minutes at a time.' : 'Playback moves 1 simulated minute per tick.'}</p>
        </div>
        <Slider label="Time of day" value={idx} min={0} max={STEPS - 1} onChange={(v) => { setPlaying(false); setIdx(v) }} format={minuteLabel} hint={`${STEPS - 1 - idx} minutes to the close.`} />
        <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4">
          <Stat label={`Spot @ ${minuteLabel(idx)}`} value={fmtIN(spot, 2)} sub={`ATM strike ${fmtIN(atmNow)}`} />
          <Stat label="ATM call" value={`₹${atmCe.price.toFixed(2)}`} sub={`Δ ${atmCe.delta.toFixed(2)}`} />
          <Stat label="ATM put" value={`₹${atmPe.price.toFixed(2)}`} sub={`Δ ${atmPe.delta.toFixed(2)}`} />
          <Stat label="ATM straddle" value={`₹${straddle.toFixed(2)}`} sub={`Gamma ${atmCe.gamma.toFixed(5)}`} />
        </div>
      </GlassPanel>

      {/* ---------------------------------------------------------- charts */}
      <ChartContainer title="Simulated Nifty spot" subtitle="Dashed lines are strikes around the 13:00 ATM." height={280} footer={<Legend items={[{ name: 'Spot', color: chart.ice }, { name: 'Strikes', color: chart.gold, dash: true }]} />}>
        <TimeChart data={spotRows} cursor={idx} refs={strikeRefs} height={280} domain={spotDomain} yFmt={(v) => fmtIN(v)} tipFmt={(v) => fmtIN(v, 2)} ariaLabel={`Simulated spot from 13:00 to ${minuteLabel(idx)}, now ${spot.toFixed(1)}`} series={[{ key: 'spot', name: 'Spot', color: chart.ice, width: 2 }]} />
      </ChartContainer>

      <ChartContainer
        title="Premium vs time"
        subtitle="Fixed strikes chosen at 13:00. Out-of-the-money premium can fall to near zero quickly."
        height={280}
        actions={<Segmented ariaLabel="Option side" value={side} onChange={setSide} options={[{ value: 'CE' as Side, label: 'Calls' }, { value: 'PE' as Side, label: 'Puts' }]} />}
        footer={<Legend items={premSeries.map((s) => ({ name: s.name, color: s.color }))} />}
      >
        <TimeChart data={premRows} cursor={idx} height={280} domain={[0, Math.ceil(full.pMax * 1.05)]} yFmt={(v) => v.toFixed(0)} tipFmt={(v) => `₹${v.toFixed(2)}`} ariaLabel={`${side === 'CE' ? 'Call' : 'Put'} premiums for the ATM and two OTM strikes up to ${minuteLabel(idx)}`} series={premSeries} />
      </ChartContainer>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartContainer title="ATM gamma" subtitle="Change in delta per 1 index point, at the nearest strike to spot." height={240}>
          <TimeChart data={greekRows} cursor={idx} height={240} domain={[0, Math.max(0.001, full.gMax * 1.08)]} yFmt={(v) => v.toFixed(3)} tipFmt={(v) => v.toFixed(5)} ariaLabel="ATM gamma over the afternoon, rising toward the close" series={[{ key: 'gamma', name: 'ATM gamma', color: chart.gold }]} />
        </ChartContainer>
        <ChartContainer title="ATM theta per hour" subtitle="₹ per unit lost to time each hour, at the nearest strike (daily theta ÷ 24)." height={240} footer={<Legend items={[{ name: 'CE', color: chart.ice }, { name: 'PE', color: chart.gold }]} />}>
          <TimeChart data={greekRows} cursor={idx} height={240} domain={[Math.floor(full.tMin * 1.08), 0]} yFmt={(v) => v.toFixed(0)} tipFmt={(v) => `₹${v.toFixed(2)} / hr`} ariaLabel="ATM theta per hour for the call and put, becoming steeper toward the close" series={[{ key: 'thCe', name: 'CE theta / hr', color: chart.ice }, { key: 'thPe', name: 'PE theta / hr', color: chart.gold }]} />
        </ChartContainer>
      </div>

      {/* ---------------------------------------------------------- table */}
      <div className="flex flex-col gap-3">
        <Eyebrow>At {minuteLabel(idx)}: ATM vs OTM</Eyebrow>
        <DataTable<StrikeRow> columns={cols} rows={table} rowKey={(r) => r.strike} dense caption={`Premium, delta and gamma by strike at ${minuteLabel(idx)}`} rowClassName={(r) => (r.atm ? 'bg-gold/[0.06]' : undefined)} />
        <p className="text-[0.78rem] leading-relaxed text-fg-3">Gamma is the same for a call and put at one strike. Delta moves fastest at the strike, which is why small spot changes can swing ATM premiums a lot near the close.</p>
      </div>

      {/* ---------------------------------------------------------- trade + distribution */}
      <section className="flex flex-col gap-5" aria-labelledby="eg-trade">
        <h3 id="eg-trade" className="font-display text-[1.25rem] tracking-tight text-fg">Two-sided buying on this path</h3>
        <TradeSim path={path} model={model} trade={trade} setTrade={setTrade} />
      </section>

      <section className="flex flex-col gap-5" aria-labelledby="eg-dist">
        <h3 id="eg-dist" className="font-display text-[1.25rem] tracking-tight text-fg">Many afternoons, not one</h3>
        <DistributionBlock model={model} trade={trade} />
      </section>

      <Callout tone="ice" title="Lot size">Lot size is editable in the simulator above (default {DEFAULT_TRADE.lotSize}). Check the current NSE contract specification.</Callout>

      {/* ---------------------------------------------------------- observe */}
      <Accordion
        items={[{
          id: 'observe',
          title: 'What to observe',
          meta: `Module 19.5 · ${topics.length} topics`,
          content: (
            <div className="flex flex-col gap-4">
              <p className="text-[0.88rem] leading-relaxed text-fg-2">The case study in module 19.5 covers these topics. This lab only simulates the premium, Greek and trade-mechanics ones; OI, VIX and futures behaviour need real data and are not modelled here.</p>
              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {topics.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.86rem] leading-snug text-fg-2">
                    <span aria-hidden className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-gold" />
                    <span>{t.replace(/\.$/, '')}</span>
                  </li>
                ))}
              </ul>
              <Link to="/learn/19.5" className="inline-flex min-h-11 items-center self-start rounded-full border border-gold/40 px-5 text-[0.88rem] text-gold transition-colors hover:bg-gold/10">Open module 19.5</Link>
            </div>
          ),
        }]}
      />
    </div>
  )
}
