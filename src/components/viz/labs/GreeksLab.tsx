import { useMemo, useState } from 'react'
import { GlassPanel, Segmented, Slider, Tip } from '@/components/ui'
import { bs, intrinsic, type OptType } from '@/lib/bs'
import { fmtIN, fmtNum } from '@/lib/format'
import { Eyebrow, IntroStrip, SignCue } from './parts/LabKit'
import { GreeksExplorer } from './parts/GreeksExplorer'
import { ExpectedMovePanel, IvCrushDemo } from './parts/GreeksExtras'

/** Finer steps close to expiry, where the Greeks change fastest. */
const DTE_STEPS = [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 17, 21, 25, 30, 35, 40, 45, 50, 55, 60]
const DEFAULT_DTE_IDX = DTE_STEPS.indexOf(7)
const fmtDte = (d: number) => (d === 0 ? 'Expiry day' : `${d} ${d === 1 ? 'day' : 'days'}`)

interface TileDef { key: 'delta' | 'gamma' | 'theta' | 'vega' | 'rho'; sym: string; name: string; value: number; dp: number; unit: string; tip: string }

export default function GreeksLab() {
  const [type, setType] = useState<OptType>('CE')
  const [spot, setSpot] = useState(24000)
  const [strike, setStrike] = useState(24000)
  const [dteIdx, setDteIdx] = useState(DEFAULT_DTE_IDX)
  const [ivPct, setIvPct] = useState(14)
  const [ratePct, setRatePct] = useState(6.5)

  const dte = DTE_STEPS[dteIdx]
  // BSM needs T > 0; on expiry day we model a sliver of time (0.1 day) instead of a degenerate zero.
  const dteEff = Math.max(dte, 0.1)
  const iv = ivPct / 100
  const rate = ratePct / 100

  const g = useMemo(() => bs(type, spot, strike, dteEff / 365, rate, iv), [type, spot, strike, dteEff, rate, iv])
  const intr = intrinsic(type, spot, strike)
  const timeVal = Math.max(g.price - intr, 0)
  const total = Math.max(g.price, 0.0001)
  const money = spot === strike ? 'At the money' : (type === 'CE' ? spot > strike : spot < strike) ? 'In the money' : 'Out of the money'

  const tiles: TileDef[] = [
    { key: 'delta', sym: 'Δ', name: 'Delta', value: g.delta, dp: 3, unit: 'per 1 pt of spot', tip: 'Rupees the premium moves for a 1-point move in Nifty. Positive for a CE, negative for a PE.' },
    { key: 'gamma', sym: 'Γ', name: 'Gamma', value: g.gamma, dp: 5, unit: 'delta per 1 pt', tip: 'How much delta itself changes for a 1-point move. Highest near the strike and close to expiry.' },
    { key: 'theta', sym: 'Θ', name: 'Theta / day', value: g.theta, dp: 2, unit: '₹ per day', tip: 'Premium lost to the passing of one calendar day, with everything else unchanged. Negative for a long option.' },
    { key: 'vega', sym: 'ν', name: 'Vega / 1% IV', value: g.vega, dp: 2, unit: '₹ per IV point', tip: 'Premium change for a one-point change in implied volatility. Positive for both CE and PE.' },
    { key: 'rho', sym: 'ρ', name: 'Rho / 1% rate', value: g.rho, dp: 3, unit: '₹ per rate point', tip: 'Premium change for a one-point change in the interest rate. Small for short-dated index options.' },
  ]

  return (
    <div className="flex flex-col gap-8">
      <IntroStrip>
        Price a Nifty option with Black–Scholes and move spot, strike, time, IV and rate to see how each Greek responds. Premiums are theoretical model values, not live quotes.
      </IntroStrip>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <GlassPanel className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <Eyebrow>Inputs</Eyebrow>
            <Segmented ariaLabel="Option type" value={type} onChange={setType} options={[{ value: 'CE', label: 'Call (CE)' }, { value: 'PE', label: 'Put (PE)' }]} />
          </div>
          <Slider label="Spot (Nifty)" value={spot} min={22000} max={26000} step={10} onChange={setSpot} format={fmtIN} />
          <Slider label="Strike" value={strike} min={22000} max={26000} step={50} onChange={setStrike} format={fmtIN} />
          <Slider label="Days to expiry" value={dteIdx} min={0} max={DTE_STEPS.length - 1} step={1} onChange={setDteIdx} format={(i) => fmtDte(DTE_STEPS[i])} hint={dte === 0 ? 'Modelled as 0.1 day left so the Greeks stay defined.' : 'Steps get finer near expiry, where Greeks move fastest.'} />
          <Slider label="Implied volatility" value={ivPct} min={6} max={40} step={0.5} onChange={setIvPct} format={(v) => `${fmtNum(v, 1)}%`} />
          <Slider label="Interest rate" value={ratePct} min={0} max={12} step={0.25} onChange={setRatePct} format={(v) => `${fmtNum(v, 2)}%`} />
        </GlassPanel>

        <div className="flex flex-col gap-5">
          <GlassPanel className="flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Theoretical premium · {strike === spot ? 'ATM' : money}</Eyebrow>
                <p className="num mt-2 font-display text-[2.6rem] leading-none text-fg sm:text-5xl" aria-live="polite">₹{fmtNum(g.price, 2)}</p>
                <p className="mt-1 text-[0.8rem] text-fg-2">per unit · Nifty {fmtIN(strike)} {type} · {fmtDte(dte)}</p>
              </div>
              <p className="num text-right text-[0.78rem] text-fg-2">
                <span className="block">Intrinsic ₹{fmtNum(intr, 2)}</span>
                <span className="block">Time value ₹{fmtNum(timeVal, 2)}</span>
              </p>
            </div>
            <div>
              <div className="flex h-4 overflow-hidden rounded-full bg-white/[0.05]" role="img" aria-label={`Premium ${fmtNum(g.price, 2)} rupees: intrinsic ${fmtNum(intr, 2)}, time value ${fmtNum(timeVal, 2)}`}>
                <span className="h-full bg-ice transition-[width] duration-500" style={{ width: `${(intr / total) * 100}%` }} />
                <span className="h-full bg-gold transition-[width] duration-500" style={{ width: `${(timeVal / total) * 100}%` }} />
              </div>
              <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.72rem] text-fg-2">
                <li className="inline-flex items-center gap-2"><span aria-hidden className="size-2.5 rounded-sm bg-ice" />Intrinsic value · {fmtNum((intr / total) * 100, 0)}%</li>
                <li className="inline-flex items-center gap-2"><span aria-hidden className="size-2.5 rounded-sm bg-gold" />Time value · {fmtNum((timeVal / total) * 100, 0)}%</li>
              </ul>
            </div>
            <p className="text-[0.82rem] leading-relaxed text-fg-2">
              Intrinsic value is what the option would be worth if exercised now; the rest is time value, which falls to zero by expiry. Out-of-the-money options are all time value.
            </p>
          </GlassPanel>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:grid-cols-3 xl:grid-cols-5">
            {tiles.map((t) => (
              <div key={t.key} className="bg-surface p-4">
                <div className="flex items-center justify-between gap-2">
                  <Tip content={t.tip} side="bottom"><span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg-3 underline decoration-dotted underline-offset-4">{t.name}</span></Tip>
                  <span aria-hidden className="font-display text-sm text-gold">{t.sym}</span>
                </div>
                <p className="num mt-2.5 text-[1.3rem] leading-none text-fg">
                  <SignCue value={t.value} className="mr-1.5 text-[0.7rem] text-fg-2" />
                  {t.value < 0 ? '−' : ''}{fmtNum(Math.abs(t.value), t.dp)}
                </p>
                <p className="mt-1.5 text-[0.7rem] text-fg-3">{t.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <GreeksExplorer type={type} spot={spot} strike={strike} dte={dteEff} iv={iv} rate={rate} g={g} />
      <IvCrushDemo type={type} spot={spot} strike={strike} dte={dteEff} rate={rate} />
      <ExpectedMovePanel spot={spot} dte={dte} />
    </div>
  )
}
