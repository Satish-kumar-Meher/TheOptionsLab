import { useId } from 'react'
import { Badge } from '@/components/ui'
import { Note } from './shared'

interface RiskRow { name: string; risk: string; fix: string }

const BUYER: RiskRow[] = [
  { name: 'Total premium loss', risk: 'An option that expires out of the money is worth zero; the whole premium paid can be lost.', fix: 'Size so a full loss is an acceptable fraction of capital; never risk more than the premium you planned.' },
  { name: 'Theta decay', risk: 'Time value erodes every day and fastest near expiry, even if the index goes nowhere.', fix: 'Need a move that is large and fast enough to beat decay; avoid holding far out-of-the-money options as time runs out.' },
  { name: 'IV crush', risk: 'Implied volatility can fall after an event, cutting the premium even when direction was right.', fix: 'Check IV relative to its history before event trades; consider spreads that offset vega.' },
  { name: 'Low liquidity', risk: 'Thin strikes make entry and exit hard and prices unreliable.', fix: 'Prefer strikes with high volume and open interest; check depth before sizing.' },
  { name: 'Wide bid-ask spread', risk: 'You pay the spread on entry and exit, which is an immediate cost against the trade.', fix: 'Use limit orders; skip contracts where the spread is large relative to the premium.' },
  { name: 'Wrong strike selection', risk: 'Too far out-of-the-money needs an unlikely move; too deep in-the-money raises capital at risk.', fix: 'Match strike to expected move and to the delta you want; compare breakeven with realistic range.' },
  { name: 'Wrong expiry selection', risk: 'A short expiry makes decay and timing errors costly; a long one costs more premium.', fix: 'Give the thesis enough time to play out; compare premium per day of expected holding.' },
  { name: 'Overtrading', risk: 'Many low-quality trades compound costs, taxes and decision fatigue.', fix: 'Set a daily trade and loss cap; trade only pre-defined setups.' },
  { name: 'Averaging losing positions', risk: 'Adding to a loser turns a small defined loss into a large one and ignores decay.', fix: 'Add only by pre-written rules on a winning trade; honour the original stop.' },
  { name: 'Expiry-day premium collapse', risk: 'Out-of-the-money premiums can fall to near zero within hours on expiry day.', fix: 'Treat expiry-day buying as high-risk: use small size, a time stop and avoid holding to the close.' },
]

const SELLER: RiskRow[] = [
  { name: 'Unlimited naked call risk', risk: 'A short call has no cap on loss if the underlying rises sharply.', fix: 'Buy a higher call to cap the loss (a spread); set a hard loss limit and exit rule.' },
  { name: 'Large put-selling risk', risk: 'A short put can lose heavily in a fall, bounded only by the underlying reaching zero.', fix: 'Buy a lower put as protection; size by loss at a stressed move, not by premium collected.' },
  { name: 'Gap risk', risk: 'Overnight or event gaps can jump through stops and hedges.', fix: 'Avoid naked positions through events; use defined-risk structures.' },
  { name: 'Gamma risk', risk: 'Near expiry delta changes quickly, so losses accelerate as price moves against you.', fix: 'Reduce size or hedge as expiry nears; avoid being short at-the-money gamma without a plan.' },
  { name: 'Vega risk', risk: 'A rise in implied volatility increases the value of the options you sold.', fix: 'Do not sell volatility into rising stress; use spreads to limit vega.' },
  { name: 'Overnight risk', risk: 'Positions carry news, global-market and policy risk while you cannot act.', fix: 'Reduce or hedge before close; keep margin buffer for gap moves.' },
  { name: 'Margin expansion', risk: 'Required margin can rise with volatility, forcing exits or additional funds at a bad moment.', fix: 'Keep a large unused cash buffer; never use all available margin.' },
  { name: 'Liquidity risk', risk: 'In fast markets you may be unable to buy back at a reasonable price.', fix: 'Trade liquid index strikes; keep hedges that can be exited separately.' },
  { name: 'Expiry settlement risk', risk: 'Deep in-the-money positions at expiry can create large settlement obligations; far out-of-the-money options can also gap in value.', fix: 'Close or roll positions before expiry; understand the exchange settlement rules.' },
  { name: 'Hedging', risk: 'Hedges can be mis-sized, expire at a different time, or add cost and complexity.', fix: 'Define the hedge before entry; recheck it as price, time and volatility change.' },
]

function RiskPanel({ title, sub, rows, tag, accent }: { title: string; sub: string; rows: RiskRow[]; tag: string; accent: 'ice' | 'gold' }) {
  return (
    <section aria-label={title} className="glass-solid overflow-hidden">
      <header className="flex items-start justify-between gap-3 border-b border-line bg-white/[0.02] px-5 py-4 sm:px-6">
        <div>
          <h3 className="font-display text-[1.25rem] font-semibold text-fg">{title}</h3>
          <p className="mt-1 text-[0.82rem] text-fg-2">{sub}</p>
        </div>
        <Badge tone={accent}>{tag}</Badge>
      </header>
      <ol className="divide-y divide-line">
        {rows.map((r, i) => (
          <li key={r.name} className="grid grid-cols-[2rem_1fr] gap-x-3 px-5 py-4 sm:px-6">
            <span className="num pt-0.5 text-[0.72rem] text-fg-3">{String(i + 1).padStart(2, '0')}</span>
            <div className="min-w-0">
              <div className="text-[0.94rem] font-medium text-fg">{r.name}</div>
              <p className="mt-1 text-[0.84rem] leading-relaxed text-fg-2">{r.risk}</p>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-fg-2"><span className={accent === 'gold' ? 'font-mono text-[0.68rem] uppercase tracking-[0.1em] text-gold' : 'font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ice'}>Mitigate </span>{r.fix}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Hand-built payoff-at-expiry diagram. kind 'buyer' = long call, 'seller' = short call. Illustrative, not to scale. */
function Payoff({ kind }: { kind: 'buyer' | 'seller' }) {
  const uid = useId()
  const W = 320
  const H = 190
  const zero = 92
  const kx = 150 // strike x
  const buyer = kind === 'buyer'
  // profit region = above zero line (up is profit)
  const flat = buyer ? zero + 22 : zero - 22
  const end = buyer ? zero - 80 : zero + 80
  const bx = buyer ? kx + 22 : kx + 22
  const line = buyer ? `M24 ${flat} H${kx} L${kx + 150} ${end}` : `M24 ${flat} H${kx} L${kx + 150} ${end}`
  const title = buyer ? 'Long call: loss limited to premium paid' : 'Naked short call: gain capped at premium, loss can grow without limit'
  return (
    <figure className="m-0 flex flex-col gap-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby={uid}>
        <title id={uid}>{title}</title>
        <line x1="14" x2={W - 8} y1={zero} y2={zero} stroke="rgba(255,255,255,0.25)" />
        <line x1={kx} x2={kx} y1="10" y2={H - 14} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 4" />
        {/* shade profit above axis, loss below */}
        <path d={buyer ? `M24 ${flat} H${kx} L${kx + 22} ${zero} H24Z` : `M${kx + 22} ${zero} L${kx + 150} ${end} V${zero}Z`} fill="#F04444" fillOpacity="0.14" />
        {buyer
          ? <path d={`M${kx + 22} ${zero} L${kx + 150} ${end} V${zero}Z`} fill="#00E58A" fillOpacity="0.12" />
          : <path d={`M24 ${flat} H${kx} L${kx + 22} ${zero} H24Z`} fill="#00E58A" fillOpacity="0.12" />}
        <path d={line} fill="none" stroke="#F4F7FA" strokeWidth="2" strokeLinejoin="round" />
        <circle cx={bx} cy={zero} r="3.5" fill="#C9A86A" />
        <text x={bx} y={zero + (buyer ? -8 : 16)} textAnchor="middle" fontSize="10" fill="#C9A86A">breakeven</text>
        <text x="28" y={buyer ? flat + 15 : flat - 8} fontSize="10.5" fill="#929DA9">{buyer ? '▼ max loss = premium paid' : '▲ max gain = premium received'}</text>
        <text x={kx + 4} y={H - 4} fontSize="10" fill="#929DA9">strike</text>
        <text x={W - 10} y={buyer ? end + 14 : end - 8} textAnchor="end" fontSize="10.5" fill="#929DA9">{buyer ? '▲ gain can grow if price rises' : '▼ loss grows as price rises'}</text>
        <text x={W - 10} y={zero + 14} textAnchor="end" fontSize="9.5" fill="#929DA9">underlying at expiry →</text>
      </svg>
      <figcaption className="text-[0.8rem] leading-relaxed text-fg-2">{title}. Schematic at expiry, not to scale; costs excluded.</figcaption>
    </figure>
  )
}

export function BuyerSellerTool() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7"><RiskPanel title="Option buyer risks" sub="Defined loss, but a high chance of losing it." rows={BUYER} tag="Module 22.5" accent="ice" /></div>
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <div className="glass-solid flex flex-col gap-6 p-5 sm:p-6">
            <div>
              <span className="eyebrow">Payoff shape</span>
              <h3 className="mt-3 font-display text-[1.3rem] font-semibold text-fg">Limited loss vs a long tail</h3>
            </div>
            <Payoff kind="buyer" />
            <Payoff kind="seller" />
            <Note>Premium received is not profit in advance. A seller wins small amounts often but can take a large loss in one move; both sides can lose money, and neither role is safe.</Note>
          </div>
        </div>
      </div>
      <RiskPanel title="Option seller risks" sub="Small capped reward, large and sometimes unlimited loss." rows={SELLER} tag="Module 22.4" accent="gold" />
    </div>
  )
}
