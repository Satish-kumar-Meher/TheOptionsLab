import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/components/ui'
import { QSection } from './shared'

interface Comp { id: string; name: string; inputs: string; outputs: string; to: string; toLabel: string }
const COMPS: Comp[] = [
  { id: 'data', name: 'Market data', inputs: 'Exchange and broker feeds, historical files', outputs: 'Clean, timestamped spot, futures and VIX series', to: '/quant#data', toLabel: 'Data section (24.1)' },
  { id: 'chain', name: 'Option-chain engine', inputs: 'Chain snapshots by strike, expiry, CE and PE', outputs: 'Normalised chain with bid, ask, LTP, OI, volume', to: '/labs/option-chain', toLabel: 'Option-chain lab' },
  { id: 'oi', name: 'OI analytics', inputs: 'OI and OI change per strike', outputs: 'Potential support and resistance zones, PCR', to: '/labs/open-interest', toLabel: 'Open-interest lab' },
  { id: 'greeks', name: 'Greeks and IV engine', inputs: 'Option prices, spot, rate, expiry', outputs: 'IV, delta, gamma, theta, vega per strike', to: '/labs/greeks', toLabel: 'Greeks lab' },
  { id: 'structure', name: 'Market-structure engine', inputs: 'Price series, VIX, expiry calendar', outputs: 'Trend, range and volatility regime labels', to: '/labs/market-structure', toLabel: 'Market-structure lab' },
  { id: 'signal', name: 'Signal engine', inputs: 'Chain, OI, Greeks and regime features', outputs: 'Trade intents with a stated rationale', to: '/curriculum/24', toLabel: 'Level 24' },
  { id: 'backtest', name: 'Backtest engine', inputs: 'Historical data, rules, cost model', outputs: 'Trade list and equity curve', to: '/quant#backtest', toLabel: 'Backtest studio' },
  { id: 'risk', name: 'Risk engine', inputs: 'Intents, positions, margin, limits', outputs: 'Approve, resize or reject decisions', to: '/risk', toLabel: 'Risk page' },
  { id: 'exec', name: 'Execution engine', inputs: 'Approved orders', outputs: 'Order state and fills', to: '/quant#algo', toLabel: 'Algo architecture' },
  { id: 'position', name: 'Position tracker', inputs: 'Fills, marks, broker positions', outputs: 'Net Greeks, P&L, reconciliation breaks', to: '/quant#algo', toLabel: 'Algo architecture' },
  { id: 'journal', name: 'Trade journal', inputs: 'Every trade, rationale and outcome', outputs: 'Review notes and tagged mistakes', to: '/risk#journal', toLabel: 'Risk journal' },
  { id: 'report', name: 'Reporting', inputs: 'Trades, metrics, validation results', outputs: 'A backtest report you can audit', to: '/quant#metrics', toLabel: 'Metrics' },
]

const CHECKLIST = [
  'Data source, date range, instruments and any adjustments',
  'Entry, exit and sizing rules written before testing',
  'Brokerage, statutory charges and slippage assumptions',
  'Number of trades, not just the headline return',
  'Max drawdown, loss streaks and time to recover',
  'Out-of-sample or walk-forward results, shown beside in-sample',
  'Parameter sensitivity, to show the result is not a lone peak',
  'Results by regime: VIX level, expiry and non-expiry days',
  'How many variants were tried to find this one',
  'Known limits: look-ahead risks, liquidity, gap risk',
]

export function EngineBlueprint() {
  const [sel, setSel] = useState(COMPS[1].id)
  const c = COMPS.find((x) => x.id === sel) ?? COMPS[0]
  return (
    <QSection id="engine" tint eyebrow="24.8 — The complete engine" title={<>Twelve parts, <span className="text-gold-gradient">one honest pipeline</span></>} lead="Select a component to see what goes in, what comes out and where on this site you can practise it.">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <ul role="list" aria-label="Engine components" className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {COMPS.map((x, i) => {
            const on = x.id === sel
            return (
              <li key={x.id}>
                <button type="button" aria-pressed={on} onClick={() => setSel(x.id)} className={cn('flex min-h-[4.5rem] w-full flex-col items-start gap-1 rounded-[var(--radius-xl)] border p-3.5 text-left transition-colors', on ? 'border-gold/60 bg-gold/[0.08]' : 'border-line bg-surface hover:border-line-strong')}>
                  <span className={cn('num text-[0.7rem]', on ? 'text-gold' : 'text-fg-3')}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[0.88rem] font-medium leading-snug text-fg">{x.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <div className="glass-solid flex flex-col gap-4 p-5 sm:p-6 lg:sticky lg:top-36 lg:self-start" aria-live="polite">
          <h3 className="font-display text-xl font-semibold">{c.name}</h3>
          <dl className="flex flex-col gap-3 text-[0.88rem]">
            <div><dt className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg-2">Inputs</dt><dd className="mt-1 text-fg">{c.inputs}</dd></div>
            <div><dt className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg-2">Outputs</dt><dd className="mt-1 text-fg">{c.outputs}</dd></div>
          </dl>
          <Link to={c.to} className="inline-flex min-h-10 items-center gap-1.5 text-[0.88rem] font-medium text-gold underline-offset-4 hover:underline">{c.toLabel}<ArrowUpRight className="size-4" aria-hidden /></Link>
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-xl font-semibold">What a trustworthy backtest report contains</h3>
          <ul className="mt-5 flex flex-col gap-2.5">
            {CHECKLIST.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[0.9rem] leading-snug text-fg-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />{t}</li>
            ))}
          </ul>
        </div>
        <div role="note" className="self-start rounded-[var(--radius-xl)] border border-gold/40 bg-gold/[0.07] p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-gold"><AlertTriangle className="size-5" aria-hidden />Overfitting warning</h3>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-fg-2">Try enough rules on one history and some will look brilliant by chance. A beautiful equity curve is a hypothesis, not a result. Count how many variants you tried, hold back data you never touched, and expect live results to be worse than the backtest. Nothing here is a recommendation or a promise of profit.</p>
        </div>
      </div>
    </QSection>
  )
}
