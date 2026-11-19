import { useId, useMemo, useState } from 'react'
import { Slider, Tabs, Badge, cn } from '@/components/ui'
import { gaussian, mulberry32 } from '@/lib/rng'
import { Note, Stat, inr } from './shared'

interface StopType {
  id: string
  label: string
  how: string
  when: string
  fail: string
  example: string
}

const TYPES: StopType[] = [
  {
    id: 'fixed', label: 'Fixed',
    how: 'You decide one rupee loss (or one price) before entering and exit when it is hit. It does not move.',
    when: 'You want a hard, pre-agreed maximum loss per trade, and the position size is already derived from it.',
    fail: 'A level picked from the amount you are willing to lose, not from where the trade is proven wrong, tends to sit inside normal noise and gets hit repeatedly.',
    example: 'Buy 1 lot (65 qty) of a 24,000 CE at ₹100 with a fixed stop at ₹70: planned loss is ₹30 × 65 = ₹1,950 before costs and slippage.',
  },
  {
    id: 'percentage', label: 'Percentage',
    how: 'The exit is a fixed percentage move against entry, for example 25% of the premium paid.',
    when: 'You trade many similar-priced setups and want one consistent rule that scales with premium.',
    fail: 'Premium percentages mean very different things for a ₹15 and a ₹300 option; cheap options can move 25% on a single tick or spread widening.',
    example: 'Buy at ₹120, stop at 25%: exit at ₹90. On 65 qty the planned loss is ₹30 × 65 = ₹1,950.',
  },
  {
    id: 'premium', label: 'Premium-based',
    how: 'The trigger is the option premium itself falling to a set value, regardless of what the index is doing.',
    when: 'You are a buyer with defined risk and want the exit tied to what the position is actually worth.',
    fail: 'Premium also falls from theta and an IV drop even when the index has not moved against you, so a premium stop can fire on a thesis that is still intact.',
    example: 'Bought a weekly 24,100 CE at ₹85 with the stop at ₹55. IV falls after an event and the premium drops to ₹55 with the index flat: the stop fires although direction was unchanged.',
  },
  {
    id: 'underlying', label: 'Underlying-based',
    how: 'The exit triggers when the index or stock crosses a chart level, such as a swing low or a closing level, not when the premium does.',
    when: 'The trade thesis is a level (support, resistance, range break) and the option is just the instrument.',
    fail: 'The premium loss at that level is not fixed: it depends on delta, theta and IV on the day, and a spot stop cannot be placed as an exchange order on the option itself.',
    example: 'Long a 24,000 CE on a breakout above 24,050. Exit if Nifty closes a 15-minute candle back below 24,020. The rupee loss on the option is only known when you exit.',
  },
  {
    id: 'trailing', label: 'Trailing',
    how: 'The stop follows the best price reached at a set distance and only ever moves in your favour. It never loosens.',
    when: 'A trade is working and you want to protect open profit while still letting a trend run.',
    fail: 'In a choppy retrace a tight trail exits a good trade early, and a gap through the stop fills at the gap price, not the trail level. The demo below shows both.',
    example: 'Premium runs from ₹100 to ₹160 with a 20% trail: stop sits at ₹128. A fall to ₹128 exits with about ₹28 per unit locked in, before costs.',
  },
  {
    id: 'time', label: 'Time-based',
    how: 'You exit after a set time or on a set day if the trade has not worked, whatever the price is.',
    when: 'The edge is expected to play out within a window, and the position decays while you wait (buyers) or event risk rises (sellers).',
    fail: 'A time stop alone has no price limit: a position can lose heavily before the clock runs out, so it normally supplements a price stop rather than replacing it.',
    example: 'You buy a weekly call expecting a move within two hours. At 12:30 premium is still flat: you exit because theta has been eating the position, not because a price level broke.',
  },
  {
    id: 'volatility', label: 'Volatility-based',
    how: 'Distance is scaled to current volatility, such as a multiple of ATR or of the expected move, so the stop widens in wild markets and tightens in quiet ones.',
    when: 'Market conditions change between trades and one fixed distance would be too tight on volatile days and too loose on calm ones.',
    fail: 'Wider stops mean a larger loss per unit, so position size must shrink to keep rupee risk constant. Widening the stop without reducing size only increases risk.',
    example: 'If Nifty 15-minute ATR is 30 points, a 1.5 × ATR stop is 45 points beyond entry. When ATR doubles to 60, the stop is 90 points and quantity should roughly halve.',
  },
  {
    id: 'partial', label: 'Partial exit',
    how: 'You close part of the position at a trigger and keep the rest with a defined stop, instead of an all-or-nothing exit.',
    when: 'Trade management matters more than precision: reduce exposure at a risk point, or bank part of a gain, and keep some exposure to a trend.',
    fail: 'It can become a way to avoid taking the full stop: if the remainder is left without a rule, the loss is merely deferred. Smaller exits also pay costs more than once.',
    example: 'Hold 4 lots. At the first adverse level, exit 2 lots and keep 2 with the stop moved to the thesis-invalidation level. Risk is reduced immediately, not removed.',
  },
  {
    id: 'slippage', label: 'Slippage',
    how: 'Slippage is the gap between your stop price and the price you actually get. A stop-loss order only sets the trigger, not the fill.',
    when: 'Always plan for it: widen your assumed loss when trading illiquid strikes, near events, at the open or close, and on expiry day.',
    fail: 'Stop-loss-market orders on a wide bid-ask spread can fill far from the trigger, and the realised loss can be larger than the loss you sized for.',
    example: 'Stop at ₹70 on a strike quoted ₹66 / ₹74. The market order fills at ₹66: ₹4 × 65 = ₹260 worse than planned per lot. Wider spreads make this larger.',
  },
  {
    id: 'failure', label: 'Execution failure',
    how: 'The stop is not executed as expected: the order is rejected, the platform or connection fails, the price jumps past a limit, or trading in the contract halts.',
    when: 'Build for it ahead of time: place the stop order at the broker rather than only watching it, size for a larger loss, and keep a manual exit plan.',
    fail: 'A stop-loss-limit order can remain unfilled if price gaps through the limit, leaving the position open and still losing. A stop is not a guarantee of exit at any price.',
    example: 'Stop-limit sell with trigger ₹70 and limit ₹68. The premium gaps from ₹74 to ₹60. The limit is never reached, the order stays open, and the position keeps losing until you act.',
  },
]

/* ---------------- seeded trailing-stop demo ---------------- */
const N = 70
const ENTRY = 100
const GAP_AT = 52

function buildPath(): number[] {
  const rng = mulberry32(2207)
  const out: number[] = [ENTRY]
  for (let i = 1; i < N; i++) {
    let drift = 0.004
    if (i > 22 && i < 40) drift = 0.011
    if (i >= 40) drift = -0.007
    let r = drift + gaussian(rng) * 0.016
    if (i === GAP_AT) r = -0.105
    out.push(Math.max(8, out[i - 1] * (1 + r)))
  }
  return out
}

interface Sim { stops: number[]; peaks: number[]; exit: number; fill: number }
function simulate(path: number[], trail: number): Sim {
  const stops: number[] = []
  const peaks: number[] = []
  let peak = path[0]
  let exit = -1
  let fill = path[path.length - 1]
  for (let i = 0; i < path.length; i++) {
    const prevStop = i === 0 ? peak * (1 - trail) : stops[i - 1]
    if (i > 0 && exit < 0 && path[i] <= prevStop) {
      exit = i
      fill = path[i]
    }
    if (exit < 0) peak = Math.max(peak, path[i])
    peaks.push(peak)
    stops.push(exit < 0 ? Math.max(prevStop, peak * (1 - trail)) : prevStop)
  }
  return { stops, peaks, exit, fill }
}

function TrailingDemo() {
  const [trail, setTrail] = useState(20)
  const path = useMemo(buildPath, [])
  const sim = useMemo(() => simulate(path, trail / 100), [path, trail])
  const uid = useId()
  const W = 640
  const H = 280
  const pad = { l: 44, r: 14, t: 14, b: 26 }
  const lo = 60
  const hi = Math.max(...path) * 1.04
  const x = (i: number) => pad.l + (i / (N - 1)) * (W - pad.l - pad.r)
  const y = (v: number) => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b)
  const line = (arr: number[], end = arr.length - 1) => arr.slice(0, end + 1).map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(Math.max(lo, v)).toFixed(1)}`).join('')
  const exited = sim.exit >= 0
  const stopAtExit = exited ? sim.stops[sim.exit - 1] ?? sim.stops[sim.exit] : sim.stops[N - 1]
  const lockedPerUnit = sim.fill - ENTRY
  const qty = 65
  const beyond = exited ? stopAtExit - sim.fill : 0
  const ticks = [60, 80, 100, 120, 140, 160].filter((t) => t < hi)
  const peakNow = exited ? sim.peaks[sim.exit] : sim.peaks[N - 1]

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="glass-solid flex flex-col gap-6 p-5 sm:p-7 lg:col-span-4">
        <div>
          <span className="eyebrow">Interactive demo</span>
          <h4 className="mt-3 font-display text-[1.35rem] font-semibold leading-tight text-fg">Watch a trailing stop ratchet</h4>
          <p className="mt-2 text-[0.86rem] leading-relaxed text-fg-2">A long option bought at ₹100 on a simulated premium path. The stop trails the highest premium by your chosen percentage and never moves down.</p>
        </div>
        <Slider label="Trail distance" value={trail} min={5} max={40} step={1} onChange={setTrail} format={(v) => `${v}%`} hint="Tight trails exit sooner; wide trails give back more before exit." />
        <div className="grid grid-cols-2 gap-5 border-t border-line pt-5">
          <Stat label="Exit premium" value={exited ? `₹${sim.fill.toFixed(1)}` : 'No exit'} sub={exited ? `bar ${sim.exit}` : 'stop never hit'} />
          <Stat label="Peak premium" value={`₹${peakNow.toFixed(1)}`} sub="before exit" tone="ice" />
          <Stat
            label="P&L per unit"
            value={`${lockedPerUnit >= 0 ? '▲ +' : '▼ −'}₹${Math.abs(lockedPerUnit).toFixed(1)}`}
            tone={lockedPerUnit >= 0 ? 'bull' : 'bear'}
            sub={exited ? 'locked in at exit' : 'open, marked at last bar'}
          />
          <Stat label={`1 lot (${qty})`} value={inr(lockedPerUnit * qty)} tone={lockedPerUnit >= 0 ? 'bull' : 'bear'} sub="before costs" />
        </div>
        {exited && beyond > 0.5 && (
          <Badge tone="gold">Filled ₹{beyond.toFixed(1)} below the stop (gap)</Badge>
        )}
      </div>

      <figure className="glass-solid m-0 flex flex-col gap-3 p-4 sm:p-6 lg:col-span-8">
        <figcaption className="flex flex-wrap items-center gap-2.5">
          <h4 className="text-[1.02rem] font-semibold text-fg">Premium vs trailing stop</h4>
          <Badge tone="neutral">Simulated data</Badge>
        </figcaption>
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
          <title id={`${uid}-t`}>Simulated option premium with a trailing stop</title>
          <desc id={`${uid}-d`}>
            {exited
              ? `With a ${trail}% trail the stop is hit on bar ${sim.exit} and the position exits at about ${sim.fill.toFixed(1)} rupees against an entry of 100, a result of ${lockedPerUnit.toFixed(1)} rupees per unit. The premium peaked at ${peakNow.toFixed(1)}.`
              : `With a ${trail}% trail the stop is never hit in this path.`}
          </desc>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" />
              <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" className="num" fontSize="10.5" fill="#929DA9">{t}</text>
            </g>
          ))}
          <line x1={pad.l} x2={W - pad.r} y1={y(ENTRY)} y2={y(ENTRY)} stroke="#F4F7FA" strokeOpacity="0.35" strokeDasharray="2 4" />
          <text x={W - pad.r} y={y(ENTRY) - 5} textAnchor="end" fontSize="10" fill="#929DA9">entry ₹100</text>
          {/* full path, dimmed after exit */}
          <path d={line(path)} fill="none" stroke="#8FB4D9" strokeOpacity={exited ? 0.3 : 1} strokeWidth="1.6" />
          {exited && <path d={line(path, sim.exit)} fill="none" stroke="#8FB4D9" strokeWidth="2" />}
          {/* ratcheting stop */}
          <path d={line(sim.stops, exited ? sim.exit : N - 1)} fill="none" stroke="#C9A86A" strokeWidth="1.8" strokeDasharray="5 3" />
          {exited && (
            <g>
              <line x1={x(sim.exit)} x2={x(sim.exit)} y1={pad.t} y2={H - pad.b} stroke="#C9A86A" strokeOpacity="0.4" />
              <circle cx={x(sim.exit)} cy={y(sim.fill)} r="6" fill="#070A0D" stroke="#F4F7FA" strokeWidth="2" />
              {beyond > 0.5 && <circle cx={x(sim.exit)} cy={y(Math.max(lo, stopAtExit))} r="3.5" fill="#C9A86A" />}
            </g>
          )}
          <text x={pad.l} y={H - 6} fontSize="10.5" fill="#929DA9">bar 0</text>
          <text x={W - pad.r} y={H - 6} textAnchor="end" fontSize="10.5" fill="#929DA9">bar {N - 1}</text>
        </svg>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[0.78rem] text-fg-2">
          <span className="inline-flex items-center gap-2"><span aria-hidden className="h-0.5 w-5 bg-ice" />Premium</span>
          <span className="inline-flex items-center gap-2"><span aria-hidden className="h-0 w-5 border-t-2 border-dashed border-gold" />Trailing stop (ratchets up only)</span>
          <span className="inline-flex items-center gap-2"><span aria-hidden className="size-2.5 rounded-full border-2 border-fg" />Exit fill</span>
        </div>
        <Note>
          A stop is a trigger, not a guaranteed price. If the premium gaps or the strike is illiquid, the fill can land well beyond the stop, as it does around bar {GAP_AT} in this path. Options can also move through a level with no trade at it. Also note that a trailing stop does nothing for you if the trade never gets into profit.
        </Note>
      </figure>
    </div>
  )
}

export function StopLossTool() {
  const [id, setId] = useState(TYPES[0].id)
  const t = TYPES.find((s) => s.id === id) ?? TYPES[0]
  const idx = TYPES.indexOf(t)
  const rows: { k: string; v: string; tone: string }[] = [
    { k: 'How it works', v: t.how, tone: 'text-fg' },
    { k: 'Best used when', v: t.when, tone: 'text-fg' },
    { k: 'Failure mode', v: t.fail, tone: 'text-fg' },
  ]
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Tabs ariaLabel="Stop-loss types" tabs={TYPES.map((s) => ({ id: s.id, label: s.label }))} value={id} onChange={setId} className="max-w-full" />
        <div role="tabpanel" aria-label={t.label} className="glass-solid mt-5 grid gap-0 overflow-hidden lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-6 border-b border-line p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <div>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">Type {String(idx + 1).padStart(2, '0')} / {TYPES.length}</span>
              <h3 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-none text-fg">{t.label}</h3>
              <p className="mt-2 text-[0.84rem] text-fg-3">stop-loss</p>
            </div>
            <div className="rounded-xl border border-line bg-white/[0.03] p-4">
              <div className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">Worked example</div>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-fg-2">{t.example}</p>
            </div>
          </div>
          <dl className="divide-y divide-line lg:col-span-8">
            {rows.map((r) => (
              <div key={r.k} className="grid gap-1 p-5 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:p-6">
                <dt className={cn('font-mono text-[0.72rem] uppercase tracking-[0.12em]', r.k === 'Failure mode' ? 'text-gold' : 'text-fg-3')}>{r.k}</dt>
                <dd className={cn('text-[0.94rem] leading-relaxed', r.tone)}>{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-3 text-[0.78rem] leading-relaxed text-fg-3">Examples use round illustrative numbers and a lot of 65 (check the current NSE contract specification). Costs, taxes and slippage are excluded.</p>
      </div>
      <TrailingDemo />
    </div>
  )
}
