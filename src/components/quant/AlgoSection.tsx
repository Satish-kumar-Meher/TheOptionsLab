import { ArrowRight, ArrowDown, ShieldAlert, Gauge, Layers, WifiOff, Octagon } from 'lucide-react'
import { Badge } from '@/components/ui'
import { QSection } from './shared'

const STAGES = [
  { n: '1', h: 'Signal generation', p: 'Turns market data into a proposed intent such as "reduce delta" or "enter spread". It outputs an intent, never an order.' },
  { n: '2', h: 'Risk checks', p: 'Every intent must pass limits on size, margin, exposure and data freshness. A failed check rejects the intent, and the reason is logged.' },
  { n: '3', h: 'Order management', p: 'Tracks order state: new, acknowledged, partially filled, filled, rejected, cancelled. Prevents duplicates with idempotency keys.' },
  { n: '4', h: 'Execution API', p: 'The thin adapter to a broker API. It is the only component with credentials, and it should be the easiest to replace.' },
  { n: '5', h: 'Position monitoring', p: 'Reconciles the broker position with the internal one, tracks P&L and Greeks, and feeds back into the risk checks.' },
]

const CONTROLS = [
  { icon: Octagon, h: 'Kill-switch', p: 'One manual and one automatic path that cancels working orders and blocks new ones. It is tested before it is needed, and it does not depend on the signal code being healthy.' },
  { icon: Gauge, h: 'Order-rate throttle', p: 'A cap on orders per second and per minute. A bug that loops should hit a ceiling in seconds, not exhaust a day of exchange and broker limits.' },
  { icon: Layers, h: 'Position and loss limits', p: 'Hard limits on lots per instrument, net delta, margin used, and daily loss. The limits sit outside the strategy logic, so strategy code cannot raise them.' },
  { icon: WifiOff, h: 'Stale-data guard', p: 'If quotes, the option chain or the VIX feed are older than a set age, signals are suppressed. Acting on a frozen chain is how phantom edges turn into real losses.' },
]

export function AlgoSection() {
  return (
    <QSection id="algo" eyebrow="24.7 — Algorithmic trading infrastructure" title={<>Architecture, <span className="text-gold-gradient">not an order button</span></>} lead="A conceptual map of how automated systems are layered so that no single component can act alone. This page shows no live trading and contains no code that places an order.">
      <ol aria-label="Algorithmic trading pipeline" className="grid gap-3 lg:grid-cols-5 lg:gap-0">
        {STAGES.map((s, i) => (
          <li key={s.n} className="relative flex flex-col lg:pr-0">
            <div className="glass-solid flex h-full flex-col gap-2 p-5 lg:rounded-none lg:first:rounded-l-[var(--radius-xl)] lg:last:rounded-r-[var(--radius-xl)] lg:border-r-0 lg:last:border-r">
              <span className="num text-[0.72rem] text-gold">0{s.n}</span>
              <h3 className="font-display text-[1.02rem] font-semibold">{s.h}</h3>
              <p className="text-[0.84rem] leading-relaxed text-fg-2">{s.p}</p>
            </div>
            {i < STAGES.length - 1 && (
              <>
                <ArrowDown className="mx-auto mt-3 size-4 text-fg-3 lg:hidden" aria-hidden />
                <ArrowRight className="absolute -right-2 top-1/2 z-10 hidden size-4 -translate-y-1/2 rounded-full bg-bg text-gold lg:block" aria-hidden />
              </>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-4 flex flex-wrap items-center gap-2 text-[0.82rem] text-fg-2"><Badge tone="gold">Feedback</Badge> Position monitoring feeds back into the risk checks, so limits always see the current book, not the one from the last signal.</p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[18rem_1fr]">
        <div>
          <h3 className="flex items-center gap-2 font-display text-xl font-semibold"><ShieldAlert className="size-5 text-gold" aria-hidden />Automated risk controls</h3>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-fg-2">Controls live outside the strategy and fail safe: when something is uncertain, the system stops trading rather than guessing. Check the broker's and exchange's current rules for algorithmic and API trading before building anything.</p>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:grid-cols-2">
          {CONTROLS.map((c) => (
            <li key={c.h} className="flex flex-col gap-2 bg-surface p-5">
              <c.icon className="size-5 text-gold" aria-hidden />
              <h4 className="font-display font-semibold">{c.h}</h4>
              <p className="text-[0.84rem] leading-relaxed text-fg-2">{c.p}</p>
            </li>
          ))}
        </ul>
      </div>
    </QSection>
  )
}
