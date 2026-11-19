import { useId, useMemo, useState } from 'react'
import { Slider, Tex } from '@/components/ui'
import { bs, expectedMove, type OptType } from '@/lib/bs'
import { fmtIN, fmtNum, fmtSigned } from '@/lib/format'
import { Callout, Eyebrow } from './LabKit'

interface CrushProps { type: OptType; spot: number; strike: number; dte: number; rate: number }

/** IV crush: the option buyer is right about direction yet the premium falls because implied volatility collapses. */
export function IvCrushDemo({ type, spot, strike, dte, rate }: CrushProps) {
  const [ivBefore, setIvBefore] = useState(24)
  const [ivAfter, setIvAfter] = useState(13)
  const [move, setMove] = useState(40)
  const T = dte / 365
  const r = useMemo(() => {
    const sAfter = type === 'CE' ? spot + move : spot - move
    const p0 = bs(type, spot, strike, T, rate, ivBefore / 100).price
    const pMid = bs(type, sAfter, strike, T, rate, ivBefore / 100).price
    const p1 = bs(type, sAfter, strike, T, rate, ivAfter / 100).price
    return { sAfter, p0, pMid, p1, fromMove: pMid - p0, fromIv: p1 - pMid, total: p1 - p0 }
  }, [type, spot, strike, T, rate, ivBefore, ivAfter, move])

  const scale = Math.max(Math.abs(r.fromMove), Math.abs(r.fromIv), Math.abs(r.total), 1)
  const bars: { label: string; v: number; note: string }[] = [
    { label: 'Direction (spot move)', v: r.fromMove, note: `Spot ${fmtIN(spot)} → ${fmtIN(r.sAfter)}` },
    { label: 'IV change', v: r.fromIv, note: `IV ${ivBefore}% → ${ivAfter}%` },
    { label: 'Net change in premium', v: r.total, note: `₹${fmtNum(r.p0, 1)} → ₹${fmtNum(r.p1, 1)}` },
  ]
  const wrong = r.total < 0 && move > 0
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="glass-solid flex flex-col gap-5 p-5 sm:p-6">
        <div>
          <Eyebrow>IV crush demo</Eyebrow>
          <h3 className="mt-2 font-display text-lg font-semibold">Right on direction, still down on premium</h3>
          <p className="mt-1.5 text-[0.86rem] leading-relaxed text-fg-2">
            You bought the {fmtIN(strike)} {type} before an event. Time is held still so only two things act: the move you were right about, and the fall in implied volatility once the uncertainty is resolved (module 4.6, 9.5).
          </p>
        </div>
        <Slider label="IV before the event" value={ivBefore} min={6} max={40} step={0.5} onChange={setIvBefore} format={(v) => `${fmtNum(v, 1)}%`} />
        <Slider label="IV after the event" value={ivAfter} min={6} max={40} step={0.5} onChange={setIvAfter} format={(v) => `${fmtNum(v, 1)}%`} />
        <Slider label={`Move in your favour (${type === 'CE' ? 'up' : 'down'})`} value={move} min={0} max={200} step={5} onChange={setMove} format={(v) => `${v} pts`} hint="Spot is held at your Greeks-lab input before the move." />
      </div>
      <div className="glass-solid flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-4" role="img" aria-label={`Premium change split: direction ${fmtSigned(r.fromMove, 1)} rupees, IV change ${fmtSigned(r.fromIv, 1)} rupees, net ${fmtSigned(r.total, 1)} rupees per unit.`}>
          {bars.map((b, i) => (
            <div key={b.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[0.82rem]">
                <span className={i === 2 ? 'font-medium text-fg' : 'text-fg-2'}>{b.label}</span>
                <span className="num text-fg">{b.v >= 0 ? '▲' : '▼'} {fmtSigned(b.v, 1)}</span>
              </div>
              <div className="relative h-3 rounded-full bg-white/[0.05]">
                <span aria-hidden className="absolute inset-y-[-3px] left-1/2 w-px bg-white/25" />
                <span
                  aria-hidden
                  className={i === 2 ? 'absolute inset-y-0 rounded-full bg-gold transition-[width,left] duration-500' : 'absolute inset-y-0 rounded-full bg-ice/80 transition-[width,left] duration-500'}
                  style={{ width: `${(Math.abs(b.v) / scale) * 50}%`, left: b.v >= 0 ? '50%' : `${50 - (Math.abs(b.v) / scale) * 50}%` }}
                />
              </div>
              <p className="num mt-1 text-[0.72rem] text-fg-3">{b.note}</p>
            </div>
          ))}
        </div>
        <Callout tone={wrong ? 'gold' : 'ice'} title={wrong ? 'Direction right, premium lower' : 'Both effects are working for you here'}>
          {wrong
            ? `In this simulation the vega loss (${fmtSigned(r.fromIv, 1)}) outweighs the delta gain (${fmtSigned(r.fromMove, 1)}), so the premium falls by ₹${fmtNum(Math.abs(r.total), 1)} per unit even though Nifty moved ${move} points your way. This is IV crush.`
            : 'Lower the IV-after slider or shrink the move to see the volatility drop overpower a correct directional view. Real premiums also carry skew and bid-ask costs.'}
        </Callout>
      </div>
    </div>
  )
}

/** Expected move from India VIX: spot × VIX% × √(days/365). */
export function ExpectedMovePanel({ spot, dte }: { spot: number; dte: number }) {
  const [vix, setVix] = useState(14)
  const id = useId()
  const rows = [
    { label: '1 day', days: 1 },
    { label: dte >= 0.5 ? `${fmtNum(dte, dte < 10 ? 1 : 0)} days to expiry` : 'Expiry day (≈ 0.1 day)', days: Math.max(dte, 0.1) },
  ]
  const calc = rows.map((x) => {
    const m = expectedMove(spot, vix / 100, x.days)
    return { ...x, m, lo: spot - m, hi: spot + m, pct: (m / spot) * 100 }
  })
  return (
    <section className="glass-solid flex flex-col gap-5 p-5 sm:p-6" aria-label="Expected move from India VIX">
      <div>
        <Eyebrow>Expected move</Eyebrow>
        <h3 className="mt-2 font-display text-lg font-semibold">What India VIX implies for the range</h3>
        <p className="mt-1.5 max-w-prose text-[0.86rem] leading-relaxed text-fg-2">A one-standard-deviation range implied by annualised volatility. Sample VIX values are typically 13–16.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor={id} className="text-[0.82rem] text-fg-2">India VIX (sample value)</label>
            <div className="mt-1.5 flex items-center gap-2">
              <input id={id} type="number" inputMode="decimal" min={5} max={80} step={0.1} value={vix} onChange={(e) => { const v = Number(e.target.value); if (Number.isFinite(v)) setVix(Math.min(80, Math.max(5, v))) }} className="num h-11 w-28 rounded-xl border border-line-strong bg-white/[0.04] px-3 text-[1rem] text-fg" />
              <span className="text-fg-3">%</span>
            </div>
          </div>
          <Tex block>{String.raw`\text{move} = S \times \frac{\text{VIX}}{100} \times \sqrt{\frac{\text{days}}{365}}`}</Tex>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {calc.map((c) => (
            <div key={c.label} className="rounded-xl border border-line bg-white/[0.02] p-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-3">{c.label}</p>
              <p className="num mt-2 font-display text-[1.7rem] leading-none text-fg">± {fmtIN(c.m)} <span className="text-[0.85rem] text-fg-2">pts</span></p>
              <p className="num mt-2 text-[0.82rem] text-fg-2">{fmtIN(c.lo)} – {fmtIN(c.hi)}</p>
              <p className="num mt-0.5 text-[0.76rem] text-fg-3">±{fmtNum(c.pct, 2)}% of spot</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[0.8rem] leading-relaxed text-fg-2">1σ in this model covers roughly two-thirds of outcomes if returns were normal. Real markets have fat tails, so larger moves happen more often than this suggests. <strong className="font-medium text-fg">India VIX measures expected volatility, not direction</strong> — a ± range says nothing about whether the move is up or down.</p>
    </section>
  )
}
