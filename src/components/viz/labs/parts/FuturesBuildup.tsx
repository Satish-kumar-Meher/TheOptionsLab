import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { GlassPanel, Badge, cn } from '@/components/ui'
import { Callout, Eyebrow, Takeaways } from './LabKit'

interface Quad { id: string; name: string; price: 'up' | 'down'; oi: 'up' | 'down'; reading: string; explain: string; confirm: string[]; invalidate: string[] }
const QUADS: Quad[] = [
  { id: 'lb', name: 'Long build-up', price: 'up', oi: 'up', reading: 'New long positions may be entering.', explain: 'Price rises while open contracts rise. New buyers and new sellers have both entered, and the buyers are willing to pay up. It is consistent with fresh long buying, but sellers entering at higher prices are part of the same OI.', confirm: ['Futures volume rises with the price move.', 'Price holds above the breakout area on pullbacks.', 'Spot and futures move together (basis stays sensible).'], invalidate: ['Price falls back through the entry zone while OI is still high (trapped longs).', 'OI starts falling quickly: the build-up is being closed.'] },
  { id: 'sb', name: 'Short build-up', price: 'down', oi: 'up', reading: 'New short positions may be entering.', explain: 'Price falls while open contracts rise. New sellers are pressing the price down and new buyers are taking the other side. It is consistent with fresh short selling, not proof of it.', confirm: ['Futures volume rises on the down move.', 'Rallies fail near prior support turned resistance.', 'Spot confirms the weakness.'], invalidate: ['A sharp reversal up with OI dropping (short covering).', 'Price reclaims the breakdown level and holds.'] },
  { id: 'sc', name: 'Short covering', price: 'up', oi: 'down', reading: 'Existing shorts may be closing.', explain: 'Price rises while open contracts fall. The rise is helped by sellers buying back positions, not by new buying. Such moves can run fast but may fade once the covering is done.', confirm: ['OI keeps falling as price rises.', 'Volume spikes in short bursts, then cools.', 'No fresh long build-up follows.'], invalidate: ['OI starts rising again with price (turns into long build-up).', 'Price stalls and OI rebuilds on the short side.'] },
  { id: 'lu', name: 'Long unwinding', price: 'down', oi: 'down', reading: 'Existing longs may be closing.', explain: 'Price falls while open contracts fall. Holders are exiting rather than new sellers arriving. It signals reduced exposure, which does not by itself mean a new downtrend.', confirm: ['OI keeps falling as price slips.', 'Volume is moderate, without aggressive new selling.', 'Price steadies once the exits finish.'], invalidate: ['OI rises while price falls (becomes short build-up).', 'Price recovers and OI turns up (longs re-enter).'] },
]

const Arrow = ({ dir }: { dir: 'up' | 'down' }) => (dir === 'up' ? <ArrowUp aria-hidden className="size-3.5" /> : <ArrowDown aria-hidden className="size-3.5" />)

export function FuturesBuildup() {
  const [sel, setSel] = useState('lb')
  const reduce = useReducedMotion()
  const q = QUADS.find((x) => x.id === sel) ?? QUADS[0]
  // grid layout: columns = OI down | OI up ; rows = price up | price down
  const cell = (price: 'up' | 'down', oi: 'up' | 'down') => QUADS.find((x) => x.price === price && x.oi === oi) as Quad
  const grid = [cell('up', 'down'), cell('up', 'up'), cell('down', 'down'), cell('down', 'up')]
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-4">
        <Callout title="For futures, not for blind use on option OI" tone="gold">
          This 2×2 describes <strong className="font-medium text-fg">futures</strong> price versus futures OI (Module 12.2). Option OI is split across strikes and calls/puts, where each contract has its own buyer and seller and premium also depends on IV and time. Do not apply these four labels to option-chain OI without the checks in the other tabs.
        </Callout>
        <div>
          <div className="mb-2 grid grid-cols-[2.5rem_1fr_1fr] gap-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-3">
            <span />
            <span className="text-center">OI falls</span>
            <span className="text-center">OI rises</span>
          </div>
          <div className="grid grid-cols-[2.5rem_1fr_1fr] gap-2" role="radiogroup" aria-label="Futures price and OI combination">
            {[0, 1].map((row) => (
              <div key={row} className="contents">
                <span className="flex items-center justify-center font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-3 [writing-mode:vertical-rl] rotate-180">{row === 0 ? 'Price rises' : 'Price falls'}</span>
                {grid.slice(row * 2, row * 2 + 2).map((c) => {
                  const active = c.id === sel
                  return (
                    <button key={c.id} type="button" role="radio" aria-checked={active} onClick={() => setSel(c.id)}
                      className={cn('relative flex min-h-[8.5rem] flex-col justify-between rounded-2xl border p-4 text-left transition-colors', active ? 'border-gold bg-gold/[0.08]' : 'border-line bg-surface/60 hover:border-line-strong')}>
                      <span className="flex items-center gap-2 font-mono text-[0.68rem] text-fg-2">
                        <span className={cn('inline-flex items-center gap-0.5', c.price === 'up' ? 'text-bull' : 'text-bear')}>Price<Arrow dir={c.price} /></span>
                        <span className="inline-flex items-center gap-0.5 text-ice">OI<Arrow dir={c.oi} /></span>
                      </span>
                      <span className="font-display text-[1.05rem] font-semibold leading-tight text-fg">{c.name}</span>
                      {active && !reduce && <motion.span layoutId="fq-glow" className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-gold/60" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <GlassPanel className="flex flex-col gap-5" aria-live="polite">
        <div className="flex flex-wrap items-center gap-2">
          <Eyebrow>Reading</Eyebrow>
          <Badge tone={q.price === 'up' ? 'bull' : 'bear'} icon={<Arrow dir={q.price} />}>Price {q.price === 'up' ? 'up' : 'down'}</Badge>
          <Badge tone="ice" icon={<Arrow dir={q.oi} />}>OI {q.oi === 'up' ? 'up' : 'down'}</Badge>
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-fg">{q.name}</h3>
          <p className="mt-1 text-[0.95rem] text-gold">{q.reading}</p>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-fg-2">{q.explain}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Takeaways title="Confirm with" items={q.confirm} />
          <Takeaways title="Invalidated if" items={q.invalidate} />
        </div>
        <p className="text-[0.78rem] leading-relaxed text-fg-3">Why “may be”: OI cannot show who initiated the trade. Futures volume and price context raise or lower confidence; they never remove the uncertainty.</p>
      </GlassPanel>
    </div>
  )
}
