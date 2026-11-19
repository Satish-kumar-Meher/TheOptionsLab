import { useMemo, useState } from 'react'
import { Segmented, Slider, cn } from '@/components/ui'
import { fmtRupee } from '@/lib/format'
import { NumField, Note, Stat } from './shared'

type StopMode = 'points' | 'percent'

function LimitRow({ label, pct, capital, used, onPct, onUsed, unitRisk }: {
  label: string; pct: number; capital: number; used: number; onPct: (v: number) => void; onUsed: (v: number) => void; unitRisk: number
}) {
  const limit = (capital * pct) / 100
  const ratio = limit > 0 ? Math.min(1, used / limit) : 0
  const breached = limit > 0 && used >= limit
  const left = Math.max(0, limit - used)
  const tradesLeft = unitRisk > 0 ? Math.floor(left / unitRisk) : 0
  return (
    <div className="grid gap-4 border-t border-line py-5 first:border-t-0 md:grid-cols-[11rem_1fr_1fr_1.4fr] md:items-center">
      <div>
        <div className="font-display text-[1.05rem] font-semibold text-fg">{label}</div>
        <div className="num mt-0.5 text-[0.78rem] text-fg-3">limit {fmtRupee(limit)}</div>
      </div>
      <Slider label="Limit, % of capital" value={pct} min={0.5} max={label === 'Daily' ? 5 : label === 'Weekly' ? 10 : 20} step={0.5} onChange={onPct} format={(v) => `${v.toFixed(1)}%`} />
      <NumField label="Loss booked so far (₹)" value={used} onChange={onUsed} min={0} step={500} prefix="₹" />
      <div>
        <div className="flex items-baseline justify-between text-[0.76rem] text-fg-2">
          <span className="num">{fmtRupee(used)} used</span>
          <span className={cn('num', breached && 'text-bear')}>{breached ? '▼ limit hit — stop for the period' : `${fmtRupee(left)} left`}</span>
        </div>
        <div
          role="progressbar"
          aria-label={`${label} loss limit used`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(ratio * 100)}
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/[0.07]"
        >
          <div className={cn('h-full rounded-full transition-[width] duration-500', breached ? 'bg-bear' : ratio > 0.66 ? 'bg-gold' : 'bg-ice')} style={{ width: `${ratio * 100}%` }} />
        </div>
        <div className="num mt-1.5 text-[0.72rem] text-fg-3">≈ {tradesLeft} full-risk trade{tradesLeft === 1 ? '' : 's'} of headroom</div>
      </div>
    </div>
  )
}

export function SizingTool() {
  const [capital, setCapital] = useState(500000)
  const [riskPct, setRiskPct] = useState(1)
  const [premium, setPremium] = useState(120)
  const [stopMode, setStopMode] = useState<StopMode>('percent')
  const [stopPts, setStopPts] = useState(30)
  const [stopPct, setStopPct] = useState(25)
  const [lot, setLot] = useState(65)
  const [dPct, setDPct] = useState(2)
  const [wPct, setWPct] = useState(4)
  const [mPct, setMPct] = useState(8)
  const [dUsed, setDUsed] = useState(0)
  const [wUsed, setWUsed] = useState(0)
  const [mUsed, setMUsed] = useState(0)

  const r = useMemo(() => {
    const stopPoints = Math.min(premium, stopMode === 'points' ? stopPts : (premium * stopPct) / 100)
    const riskRs = (capital * riskPct) / 100
    const lossPerLot = stopPoints * lot
    const maxLots = lossPerLot > 0 ? Math.floor(riskRs / lossPerLot) : 0
    const deployed = maxLots * lot * premium
    const actualRisk = maxLots * lossPerLot
    const perLotCost = premium * lot
    return { stopPoints, riskRs, lossPerLot, maxLots, deployed, actualRisk, perLotCost, deployedPct: capital > 0 ? (deployed / capital) * 100 : 0, riskPctActual: capital > 0 ? (actualRisk / capital) * 100 : 0 }
  }, [capital, riskPct, premium, stopMode, stopPts, stopPct, lot])

  const dailyLimit = (capital * dPct) / 100
  const unitRisk = r.maxLots > 0 ? r.actualRisk : r.riskRs
  const consecutive = unitRisk > 0 ? Math.floor(dailyLimit / unitRisk) : 0
  const blocks = Math.min(12, Math.max(consecutive, 1))

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="glass-solid flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">Inputs · sizing ticket</span>
        </div>
        <NumField label="Trading capital" value={capital} onChange={setCapital} min={10000} step={10000} prefix="₹" />
        <Slider label="Risk per trade" value={riskPct} min={0.25} max={5} step={0.25} onChange={setRiskPct} format={(v) => `${v.toFixed(2)}% of capital`} hint="Many professionals keep this small so that a long losing streak stays survivable." />
        <NumField label="Entry premium (₹ per unit)" value={premium} onChange={setPremium} min={1} step={1} prefix="₹" />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.82rem] text-fg-2">Stop-loss defined as</span>
            <Segmented ariaLabel="Stop-loss unit" value={stopMode} onChange={setStopMode} options={[{ value: 'percent', label: '% of premium' }, { value: 'points', label: 'Points' }]} />
          </div>
          {stopMode === 'points' ? (
            <NumField label="Stop-loss distance (premium points)" value={stopPts} onChange={setStopPts} min={0.5} step={0.5} suffix="pts" hint="Capped at the premium paid: a bought option cannot lose more than its premium." />
          ) : (
            <Slider label="Stop-loss distance" value={stopPct} min={5} max={100} step={5} onChange={setStopPct} format={(v) => `${v}% of premium`} />
          )}
        </div>
        <NumField label="Lot size (units)" value={lot} onChange={(v) => setLot(Math.max(1, Math.round(v)))} min={1} step={1} hint="Default 65 for Nifty. Check the current NSE contract specification — lot sizes are revised from time to time." />
      </div>

      <div className="flex flex-col gap-6">
        <div className="glass-solid relative overflow-hidden p-5 sm:p-8">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-16 size-64 rounded-full bg-gold/[0.07] blur-3xl" />
          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            <div>
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">Max lots (rounded down)</div>
              <div className="num mt-2 text-[clamp(3.4rem,9vw,6rem)] font-medium leading-none text-fg" aria-live="polite">{r.maxLots}</div>
              <div className="num mt-2 text-[0.84rem] text-fg-2">{r.maxLots * lot} units</div>
            </div>
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              <Stat label="Risk budget" value={fmtRupee(r.riskRs)} sub={`${riskPct.toFixed(2)}% of capital`} tone="gold" />
              <Stat label="Loss per lot" value={fmtRupee(r.lossPerLot)} sub={`${r.stopPoints.toFixed(1)} pts × ${lot}`} />
              <Stat label="Cost per lot" value={fmtRupee(r.perLotCost)} sub="premium × lot size" />
              <Stat label="Capital deployed" value={fmtRupee(r.deployed)} sub={`${r.deployedPct.toFixed(1)}% of capital`} tone="ice" />
              <Stat label="Capital at risk" value={fmtRupee(r.actualRisk)} sub={`${r.riskPctActual.toFixed(2)}% if stop fills`} tone="gold" />
              <Stat label="Worst case" value={fmtRupee(r.deployed)} sub="premium can go to zero" tone="bear" />
            </div>
          </div>
          {r.maxLots === 0 && (
            <p role="alert" className="mt-6 rounded-xl border border-gold/30 bg-gold/[0.07] px-4 py-3 text-[0.84rem] text-fg-2">
              One lot already risks more than your budget at this stop. Options: widen the budget only if it is still survivable, tighten the stop, pick a cheaper premium, or skip the trade — do not round up.
            </p>
          )}
        </div>
        <Note tone="ice">
          <strong className="text-fg">Stops are not guarantees.</strong> The &ldquo;capital at risk&rdquo; line assumes the stop fills at its price. Gaps, fast markets and thin option books can fill beyond it, so the loss can be larger — which is why the last tile shows the full-premium worst case.
          <span className="mt-2 block">
            <strong className="text-fg">Margin utilisation.</strong> For long options the premium is the cost. For sold or spread positions the broker blocks margin that can change with volatility and exchange rules, so keep part of your capital unused as a buffer and check the broker&rsquo;s margin calculator before sizing.
          </span>
        </Note>
      </div>

      <div className="glass-solid p-5 sm:p-8 lg:col-span-2">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">Loss-limit tracker</span>
            <h3 className="mt-2 font-display text-[1.4rem] font-semibold text-fg">Max daily, weekly &amp; monthly loss</h3>
          </div>
          <div className="text-right">
            <div className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">Consecutive full-risk losses to daily limit</div>
            <div className="num text-[2.2rem] font-medium leading-none text-fg" aria-live="polite">{consecutive}</div>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-1.5" role="img" aria-label={`${consecutive} losing trades at ${fmtRupee(unitRisk)} each reach the daily limit of ${fmtRupee(dailyLimit)}`}>
          {Array.from({ length: blocks }).map((_, i) => (
            <div key={i} className={cn('flex h-9 flex-1 items-center justify-center rounded-md border font-mono text-[0.68rem]', i < consecutive ? 'border-bear/30 bg-bear/10 text-bear' : 'border-line bg-white/[0.03] text-fg-3')}>
              {i < consecutive ? '▼' : '·'}
            </div>
          ))}
        </div>
        <p className="mt-2 text-[0.78rem] text-fg-3">Each block is one trade losing its full risk budget ({fmtRupee(unitRisk)}). {consecutive > 12 ? 'Showing the first 12. ' : ''}Real losses can exceed the budget when stops slip.</p>
        <div className="mt-4">
          <LimitRow label="Daily" pct={dPct} capital={capital} used={dUsed} onPct={setDPct} onUsed={setDUsed} unitRisk={unitRisk} />
          <LimitRow label="Weekly" pct={wPct} capital={capital} used={wUsed} onPct={setWPct} onUsed={setWUsed} unitRisk={unitRisk} />
          <LimitRow label="Monthly" pct={mPct} capital={capital} used={mUsed} onPct={setMPct} onUsed={setMUsed} unitRisk={unitRisk} />
        </div>
      </div>
    </div>
  )
}
