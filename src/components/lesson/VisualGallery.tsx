import type { VisualSpec } from '@/data/topicLessonTypes'
import { Visual } from './Visual'

type Pattern = Extract<VisualSpec, { kind: 'candles' }>['pattern']
type CurveName = Extract<VisualSpec, { kind: 'curve' }>['curve']

const patterns: [Pattern, string][] = [
  ['uptrend', 'Uptrend'], ['downtrend', 'Downtrend'], ['range', 'Range'], ['breakout', 'Breakout'], ['breakdown', 'Breakdown'], ['falseBreakout', 'False breakout'],
  ['gapUp', 'Gap up'], ['gapDown', 'Gap down'], ['doji', 'Doji'], ['hammer', 'Hammer'], ['engulfing', 'Bullish engulfing'], ['accumulation', 'Accumulation'], ['distribution', 'Distribution'],
]
const curves: [CurveName, string][] = [
  ['delta', 'Delta across strikes'], ['gamma', 'Gamma peaks at the money'], ['theta', 'Theta accelerates into expiry'], ['vega', 'Vega by moneyness'], ['timeValue', 'Premium = intrinsic + time value'], ['iv-smile', 'Implied volatility smile'],
  ['payoff-call', 'Long call at expiry'], ['payoff-put', 'Long put at expiry'], ['normal', 'Normal distribution'], ['drawdown', 'Drawdown'], ['equity', 'Equity curve'], ['sCurve', 'Cumulative probability S-curve'],
]

export const samples: VisualSpec[] = [
  { kind: 'flow', title: 'Life of an order', caption: 'Each step must complete before the next one starts.', steps: [
    { label: 'Order placed', note: 'Broker app sends it to the exchange' }, { label: 'Matched', note: 'Price-time priority on the order book' },
    { label: 'Trade', note: 'Contract note issued' }, { label: 'Clearing', note: 'Clearing corporation guarantees it' }, { label: 'Settlement', note: 'Cash settled in rupees', tone: 'gold' } ] },
  { kind: 'compare', title: 'Futures vs options', caption: 'Both are derivatives; the risk shape differs.', left: { head: 'Futures', tone: 'ice', points: ['Obligation to buy or sell', 'Margin blocked up front', 'Loss can exceed the margin'] }, right: { head: 'Options (buyer)', tone: 'gold', points: ['Right, not obligation', 'Pay premium, no margin', 'Loss limited to the premium'] } },
  { kind: 'bars', title: 'Premium by moneyness (illustrative)', unit: '₹', caption: 'ATM options carry the most time value.', items: [{ label: '23,800 CE (ITM)', value: 310 }, { label: '24,000 CE (ATM)', value: 190 }, { label: '24,200 CE (OTM)', value: 95 }, { label: '24,400 CE (OTM)', value: 40 }] },
  { kind: 'bars', title: 'Day P&L by leg (illustrative)', unit: '₹', items: [{ label: 'Long call', value: 1800, tone: 'bull' }, { label: 'Short put', value: -950, tone: 'bear' }, { label: 'Hedge future', value: 420, tone: 'ice' }] },
  { kind: 'ladder', title: 'Which strikes are in the money? (call)', optType: 'CE', spot: 24020, strikes: [24300, 24200, 24100, 24000, 23900, 23800, 23700] },
  { kind: 'ladder', title: 'Which strikes are in the money? (put)', optType: 'PE', spot: 24020, strikes: [24300, 24200, 24100, 24000, 23900, 23800, 23700] },
  { kind: 'payoff', title: 'Long straddle at expiry', spot: 24000, caption: 'Needs a large move in either direction to pay off.', legs: [{ type: 'CE', side: 1, strike: 24000, premium: 190 }, { type: 'PE', side: 1, strike: 24000, premium: 170 }] },
  { kind: 'payoff', title: 'Bull call spread at expiry', spot: 24000, legs: [{ type: 'CE', side: 1, strike: 24000, premium: 190 }, { type: 'CE', side: -1, strike: 24300, premium: 70 }] },
  { kind: 'payoff', title: 'Long futures', spot: 24000, legs: [{ type: 'FUT', side: 1, strike: 24000 }] },
  { kind: 'payoff', title: 'Short put', spot: 24000, legs: [{ type: 'PE', side: -1, strike: 23800, premium: 120 }] },
  ...patterns.map(([pattern, name]): VisualSpec => ({ kind: 'candles', title: `Candles: ${name}`, pattern, ...(pattern === 'breakout' || pattern === 'falseBreakout' ? { level: { price: 24200, label: 'Resistance' } } : {}) })),
  { kind: 'oi', title: 'Open interest by strike (illustrative)', spot: 24020, rows: [{ strike: 24400, ce: 820000, pe: 150000 }, { strike: 24300, ce: 640000, pe: 210000 }, { strike: 24200, ce: 510000, pe: 330000 }, { strike: 24100, ce: 390000, pe: 450000 }, { strike: 24000, ce: 300000, pe: 760000 }, { strike: 23900, ce: 210000, pe: 590000 }, { strike: 23800, ce: 140000, pe: 880000 }] },
  ...curves.map(([curve, name]): VisualSpec => ({ kind: 'curve', title: name, curve })),
  { kind: 'matrix', title: 'Price and open interest', xLabels: ['OI falls', 'OI rises'], yLabels: ['Price rises', 'Price falls'], cells: [{ head: 'Short covering', note: 'Shorts exiting', tone: 'bull' }, { head: 'Long build-up', note: 'New longs entering', tone: 'bull' }, { head: 'Long unwinding', note: 'Longs exiting', tone: 'bear' }, { head: 'Short build-up', note: 'New shorts entering', tone: 'bear' }] },
  { kind: 'gauge', title: 'India VIX zones (illustrative)', min: 0, max: 40, value: 14.5, unit: '', caption: 'VIX shows expected volatility, not direction.', zones: [{ from: 0, to: 12, label: 'Calm', tone: 'ice' }, { from: 12, to: 20, label: 'Normal', tone: 'gold' }, { from: 20, to: 40, label: 'Stressed', tone: 'neutral' }] },
  { kind: 'orderBook', title: 'Order book depth (illustrative)', bids: [[24000, 1300], [23999.5, 2100], [23999, 3400], [23998.5, 900], [23998, 2800]], asks: [[24000.5, 1100], [24001, 2600], [24001.5, 1800], [24002, 3900], [24002.5, 1400]] },
  { kind: 'timeline', title: 'Weekly expiry day', events: [{ when: '09:15', what: 'Market opens; premiums set the tone' }, { when: '12:00', what: 'Time value decays faster', tone: 'gold' }, { when: '15:20', what: 'Last minutes: gamma risk is highest' }, { when: '15:30', what: 'Market closes; contracts settle' }] },
  { kind: 'layers', title: 'Who is in the market', caption: 'Widest group first.', layers: [{ label: 'All participants', note: 'Retail, institutions, proprietary desks' }, { label: 'Institutions', note: 'FPIs, DIIs, mutual funds' }, { label: 'Market makers', note: 'Quote both sides', tone: 'gold' }] },
]

export default function VisualGallery() {
  return (
    <div className="container-x mx-auto max-w-4xl py-10">
      <h2 className="font-display text-2xl font-semibold text-fg">Lesson illustrations</h2>
      <div className="mt-4 grid gap-2 md:grid-cols-2 md:gap-x-6">
        {samples.map((s, i) => (
          <Visual key={`${s.kind}-${i}`} spec={s} className={s.kind === 'candles' || s.kind === 'curve' ? '' : 'md:col-span-2'} />
        ))}
      </div>
    </div>
  )
}
