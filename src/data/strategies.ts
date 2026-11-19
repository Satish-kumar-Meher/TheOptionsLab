/** Options strategy library — mirrors Level 20 (modules 20.1–20.6) and module 3.4 of the curriculum.
 *  Educational only. Leg offsets are in "width units" (see `@/lib/payoff`). No rupee margin figures are ever quoted. */
import type { Leg } from '@/lib/payoff'

export type StrategyCategory = 'buying' | 'selling' | 'vertical' | 'volatility' | 'advanced'
export type Outlook = 'bullish' | 'bearish' | 'neutral' | 'volatile' | 'range-bound'
export type Bias = 'long' | 'short' | 'neutral' | 'mixed'

export interface Strategy {
  slug: string
  name: string
  category: StrategyCategory
  outlook: Outlook
  /** One-line hook shown in the rail. */
  tagline: string
  /** Plain-English construction. */
  construction: string
  legs: Leg[]
  /** Strike steps per width unit when the page opens. */
  defaultUnit: number
  conditions: string[]
  /** VIX / IV regime where the structure is usually discussed. */
  regime: string
  greeks: { gamma: Bias; theta: Bias; vega: Bias; note: string }
  maxRisk: string
  margin: string
  wrong: string[]
  /** Curriculum module id, e.g. '20.3'. */
  module: string
  variants?: { name: string; note: string }[]
}

export const CATEGORY_LABEL: Record<StrategyCategory, string> = { buying: 'Buying', selling: 'Selling', vertical: 'Verticals', volatility: 'Volatility', advanced: 'Advanced' }
export const OUTLOOK_LABEL: Record<Outlook, string> = { bullish: 'Bullish', bearish: 'Bearish', neutral: 'Neutral', volatile: 'Volatile', 'range-bound': 'Range-bound' }
export const MODULE_TITLE: Record<string, string> = {
  '3.4': 'Four Core Option Positions',
  '20.1': 'Basic Option Buying Strategies',
  '20.2': 'Basic Option Selling Strategies',
  '20.3': 'Vertical Spreads',
  '20.4': 'Volatility Strategies',
  '20.5': 'Advanced Strategies',
  '20.6': 'Strategy Selection',
}

const o = (type: 'CE' | 'PE', side: 1 | -1, strikeOffset: number, qty = 1, expiry: 'near' | 'far' = 'near'): Leg => ({ type, side, strikeOffset, qty, expiry })
const u = (side: 1 | -1): Leg => ({ type: 'UNDERLYING', side, strikeOffset: 0, qty: 1, expiry: 'near' })

const M_BUY = 'Buying options needs only the premium paid up front; no margin is blocked. The premium is the most you can lose.'
const M_SELL = 'Selling options with undefined risk needs margin set by the exchange and your broker. It can be large, it changes with volatility and spot, and a sharp move can trigger a margin call. Use your broker’s margin calculator; this page never quotes a figure.'
const M_SPREAD = 'Hedged (defined-risk) spreads usually need much less margin than a naked short leg because the long leg caps the loss, but the amount is exchange- and broker-set and can change. Check your broker’s margin calculator before trading.'
const M_MIXED = 'Margin is set by the exchange and your broker and depends on how the legs offset each other. Hedged structures usually need less than naked ones, but rules differ by broker and change over time. Use your broker’s margin calculator.'

const SELL_VARIANTS = [
  { name: 'ATM option selling', note: 'Collects the most premium and the fastest theta, but delta and gamma are highest, so a small move hurts quickly.' },
  { name: 'OTM option selling', note: 'Higher probability of expiring worthless, but small premiums and a fat tail: rare large moves can wipe out many small wins.' },
  { name: 'Intraday premium selling', note: 'Squared off the same day to avoid overnight gaps. Works against intraday decay but stop-loss slippage in fast markets is real.' },
  { name: 'Positional premium selling', note: 'Held for days to expiry. Earns more theta in total, but carries overnight and event gap risk and larger margin.' },
]

export const STRATEGIES: Strategy[] = [
  // ───────── 20.1 buying ─────────
  {
    slug: 'long-call', name: 'Long Call', category: 'buying', outlook: 'bullish', module: '20.1',
    tagline: 'Pay a premium for upside exposure with a capped loss.',
    construction: 'Buy one call option (CE). You pay the premium today. If the index finishes above strike + premium at expiry you are in profit; if it finishes below the strike the premium is lost.',
    legs: [o('CE', 1, 0)], defaultUnit: 2,
    conditions: ['A directional bullish view with a timeframe shorter than the option’s life.', 'Lower or moderate IV: you are buying volatility, so cheap premium helps.', 'Needs the move to be big enough and quick enough to beat time decay.'],
    regime: 'Generally discussed when India VIX is low or falling-from-spike and IV is not stretched versus its own history.',
    greeks: { gamma: 'long', theta: 'short', vega: 'long', note: 'Positive delta, long gamma and vega, but you pay theta every day.' },
    maxRisk: 'Limited to the premium paid. Profit is open-ended on the upside.',
    margin: M_BUY,
    wrong: ['Spot goes sideways: theta erodes the premium even if you are not "wrong" on direction.', 'IV falls after an event (IV crush) and the option loses value despite a favourable move.', 'The move comes after expiry, or is smaller than the breakeven distance.'],
    variants: [
      { name: 'ATM call buying', note: 'Delta near 0.5, balanced cost and responsiveness. Highest time value, so decay is meaningful.' },
      { name: 'OTM momentum buying', note: 'Cheap and high leverage, but needs a large, fast move; most expire worthless. Position size must be small.' },
      { name: 'Breakout buying', note: 'Entered when price clears a defined resistance with volume. A failed breakout can reverse fast, so define the invalidation level first.' },
      { name: 'Intraday scalping', note: 'Very short holding periods for small moves. Spread, brokerage and slippage are a large share of the edge.' },
      { name: 'Positional buying', note: 'Held over days. Choose a later expiry or deeper strike to lessen decay, at a higher premium.' },
      { name: 'Event-based buying', note: 'Bought ahead of a scheduled event. IV is usually already elevated and often collapses after the event.' },
    ],
  },
  {
    slug: 'long-put', name: 'Long Put', category: 'buying', outlook: 'bearish', module: '20.1',
    tagline: 'Pay a premium to profit from a fall, or to hedge.',
    construction: 'Buy one put option (PE). You pay the premium. The put gains value as the index falls below the strike; at expiry you profit if spot is below strike minus premium.',
    legs: [o('PE', 1, 0)], defaultUnit: 2,
    conditions: ['A bearish view or a wish to protect a long portfolio.', 'IV not already spiking: puts get expensive in sell-offs.', 'Move needs to happen within the option’s lifetime.'],
    regime: 'Often bought when VIX is low (cheap protection) or as a tactical bet; buying after a VIX spike means paying up.',
    greeks: { gamma: 'long', theta: 'short', vega: 'long', note: 'Negative delta, long gamma and vega, negative theta. IV usually rises when markets fall, which can help.' },
    maxRisk: 'Limited to the premium paid. Maximum gain is large but bounded, because the index cannot fall below zero.',
    margin: M_BUY,
    wrong: ['Market rises or drifts: the premium decays.', 'You buy after a panic when IV is already high, then IV falls as the market stabilises.', 'Timing: a correct but slow fall can still lose after decay.'],
    variants: [
      { name: 'ATM put buying', note: 'Balanced cost and responsiveness; most sensitive to time decay.' },
      { name: 'OTM momentum buying', note: 'Cheap, high leverage, low probability. Needs a sharp fall.' },
      { name: 'Breakdown buying', note: 'Entered when price breaks defined support. False breakdowns can snap back, so know your exit.' },
      { name: 'Intraday scalping', note: 'Very short holds; costs and slippage matter more than usual.' },
      { name: 'Positional buying', note: 'Held over days; later expiries decay slower but cost more.' },
      { name: 'Event-based buying', note: 'Ahead of scheduled events; IV is normally elevated beforehand and drops afterwards.' },
    ],
  },
  // ───────── 20.2 selling ─────────
  {
    slug: 'naked-call', name: 'Naked Call (Short Call)', category: 'selling', outlook: 'bearish', module: '20.2',
    tagline: 'Collect premium betting the index stays below a strike.',
    construction: 'Sell one call without owning any hedge. You receive the premium; you keep it all if spot finishes at or below the strike, and lose more the higher spot goes.',
    legs: [o('CE', -1, 1)], defaultUnit: 2,
    conditions: ['A neutral-to-bearish view, with an OTM strike above a level you expect to hold.', 'Elevated IV improves the premium collected.', 'Only for traders with strict stop-loss rules and ample margin.'],
    regime: 'Often considered when IV is rich relative to realised volatility; dangerous when a volatility expansion is likely.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Negative delta, short gamma and vega; time decay works for you.' },
    maxRisk: 'Theoretically unlimited: the loss grows without bound as the index rises.',
    margin: M_SELL,
    wrong: ['A gap-up or rally through the strike: losses accelerate because of short gamma.', 'IV spikes: the short option reprices higher even before spot moves.', 'Stop-loss slippage in a fast market.'],
    variants: SELL_VARIANTS,
  },
  {
    slug: 'naked-put', name: 'Naked Put (Short Put)', category: 'selling', outlook: 'bullish', module: '20.2',
    tagline: 'Collect premium betting the index holds above a strike.',
    construction: 'Sell one put without a hedge. You receive the premium and keep it all if spot finishes at or above the strike; below it you lose more as the index falls.',
    legs: [o('PE', -1, -1)], defaultUnit: 2,
    conditions: ['A neutral-to-bullish view with a strike below a support you trust.', 'Elevated IV (but not in a crash regime) increases the premium.', 'Needs margin and a pre-defined exit.'],
    regime: 'Premium is richest when VIX is high, which is also when large down-moves are most likely. Treat that as a warning, not an invitation.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Positive delta, short gamma and vega, positive theta.' },
    maxRisk: 'Very large: the loss grows as the index falls, down to zero. It is far larger than the premium.',
    margin: M_SELL,
    wrong: ['A sharp sell-off or gap-down through the strike.', 'IV expansion alongside a fall: both delta and vega work against you.', 'Margin calls forcing an exit at the worst point.'],
    variants: SELL_VARIANTS,
  },
  {
    slug: 'covered-call', name: 'Covered Call', category: 'selling', outlook: 'range-bound', module: '20.2',
    tagline: 'Hold the underlying and sell a call against it for income.',
    construction: 'Hold one lot of the underlying (modelled here as a long position at today’s spot) and sell an OTM call. The premium cushions small falls and you give up gains above the strike.',
    legs: [u(1), o('CE', -1, 1)], defaultUnit: 2,
    conditions: ['Mildly bullish to neutral on a holding you intend to keep.', 'Decent IV so the call pays well.', 'Willing to have the upside capped.'],
    regime: 'Moderate to elevated IV is usually more attractive for the seller.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Delta is reduced by the short call; you earn theta but are short vega and gamma.' },
    maxRisk: 'Large: the underlying can fall a long way; the premium only offsets a small part. Upside is capped at the strike plus premium.',
    margin: 'Holding the underlying or futures carries its own cost or margin, and the short call is considered against it. Rules are set by the exchange and broker and change; check your broker.',
    wrong: ['A sharp fall: the premium barely softens the loss.', 'A strong rally: you give up gains above the strike.', 'Assignment-style surprises at expiry if the call finishes in the money.'],
  },
  {
    slug: 'cash-secured-put', name: 'Cash-Secured Put', category: 'selling', outlook: 'bullish', module: '20.2',
    tagline: 'Sell a put while holding the cash to buy if assigned.',
    construction: 'Sell a put and keep enough cash to cover the purchase if it finishes in the money. The payoff is that of a short put; the difference is that capital is set aside for the obligation.',
    legs: [o('PE', -1, -1)], defaultUnit: 2,
    conditions: ['You would genuinely be willing to buy the underlying near the strike.', 'Neutral-to-bullish view, support below the strike.', 'Moderate to high IV for a better premium.'],
    regime: 'Seen more often when IV is elevated; remember falling markets and rising IV tend to come together.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Same Greeks as a short put; capital is tied up while the trade is open.' },
    maxRisk: 'Large: strike minus premium per unit if the index went to zero. Cash cover does not remove the loss, it only means it is funded.',
    margin: 'Capital is set aside by you; any exchange or broker margin is separate and can change. Index options settle in cash, so there is no share delivery, but the loss is the same.',
    wrong: ['A crash through the strike: you hold a loss equal to the fall less the premium.', 'Capital is locked and cannot be used elsewhere.', 'IV spikes and the mark-to-market loss grows before expiry.'],
  },
  // ───────── 20.3 verticals ─────────
  {
    slug: 'bull-call-spread', name: 'Bull Call Spread', category: 'vertical', outlook: 'bullish', module: '20.3',
    tagline: 'Debit spread: buy a call, sell a higher call to cut the cost.',
    construction: 'Buy a lower-strike call and sell a higher-strike call. The short call reduces cost but caps profit at the width of the spread minus the net debit.',
    legs: [o('CE', 1, 0), o('CE', -1, 1)], defaultUnit: 2,
    conditions: ['Moderately bullish with a target near the short strike.', 'IV elevated: the short call offsets the high cost of the long.', 'Prefer defined risk over an uncapped long call.'],
    regime: 'Useful when IV is moderate to high and outright call buying looks expensive.',
    greeks: { gamma: 'mixed', theta: 'neutral', vega: 'neutral', note: 'Positive delta; theta, vega and gamma largely offset between the two legs.' },
    maxRisk: 'Limited to the net debit paid.',
    margin: M_SPREAD,
    wrong: ['Index falls or stalls: the debit is lost.', 'It overshoots the short strike: the extra gain is forgone.', 'Wide bid-ask on two legs eats edge.'],
  },
  {
    slug: 'bear-put-spread', name: 'Bear Put Spread', category: 'vertical', outlook: 'bearish', module: '20.3',
    tagline: 'Debit spread: buy a put, sell a lower put.',
    construction: 'Buy a higher-strike put and sell a lower-strike put. The short put cuts the cost and caps the profit at the width minus the debit.',
    legs: [o('PE', 1, 0), o('PE', -1, -1)], defaultUnit: 2,
    conditions: ['Moderately bearish with a target near the short strike.', 'IV elevated after a sell-off, so outright put buying is expensive.', 'Want defined risk and a lower cost.'],
    regime: 'Often considered when IV is already high and a plain long put costs a lot.',
    greeks: { gamma: 'mixed', theta: 'neutral', vega: 'neutral', note: 'Negative delta; the two legs largely cancel gamma, theta and vega.' },
    maxRisk: 'Limited to the net debit paid.',
    margin: M_SPREAD,
    wrong: ['Market rises: the debit is lost.', 'A fall beyond the short strike adds nothing.', 'Slow decline into expiry.'],
  },
  {
    slug: 'bull-put-spread', name: 'Bull Put Spread', category: 'vertical', outlook: 'bullish', module: '20.3',
    tagline: 'Credit spread: sell a put, buy a lower put for protection.',
    construction: 'Sell a higher-strike put and buy a lower-strike put. You receive a net credit; the long put caps the loss at width minus credit.',
    legs: [o('PE', -1, 0), o('PE', 1, -1)], defaultUnit: 2,
    conditions: ['Neutral-to-bullish; you expect spot to stay above the short strike.', 'Elevated IV so the credit is worth collecting.', 'Defined risk rather than a naked put.'],
    regime: 'Generally discussed when IV is elevated and expected to mean-revert.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Net positive delta, small positive theta, short vega and gamma.' },
    maxRisk: 'Limited: spread width minus the credit. Often larger than the maximum profit.',
    margin: M_SPREAD,
    wrong: ['A drop below the short strike: loss approaches the maximum.', 'Maximum loss is bigger than maximum profit; a few losses can undo many wins.', 'IV rising in a sell-off.'],
  },
  {
    slug: 'bear-call-spread', name: 'Bear Call Spread', category: 'vertical', outlook: 'bearish', module: '20.3',
    tagline: 'Credit spread: sell a call, buy a higher call for protection.',
    construction: 'Sell a lower-strike call and buy a higher-strike call. You collect a net credit and your loss is capped at width minus credit.',
    legs: [o('CE', -1, 0), o('CE', 1, 1)], defaultUnit: 2,
    conditions: ['Neutral-to-bearish, expecting spot to stay below the short strike.', 'Elevated IV improves the credit.', 'Defined risk rather than an uncapped short call.'],
    regime: 'Generally considered when IV is elevated and a ceiling is expected to hold.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Net negative delta, small positive theta, short vega and gamma.' },
    maxRisk: 'Limited: spread width minus the credit.',
    margin: M_SPREAD,
    wrong: ['A rally through both strikes: loss approaches the maximum.', 'Gap-ups can skip your stop-loss.', 'A falling IV gives smaller than expected gains if the market also stays high.'],
  },
  // ───────── 20.4 volatility ─────────
  {
    slug: 'long-straddle', name: 'Long Straddle', category: 'volatility', outlook: 'volatile', module: '20.4',
    tagline: 'Buy a call and a put at the same strike: bet on a big move.',
    construction: 'Buy an ATM call and an ATM put with the same expiry. You profit if spot finishes far enough from the strike in either direction to cover both premiums.',
    legs: [o('CE', 1, 0), o('PE', 1, 0)], defaultUnit: 2,
    conditions: ['You expect a large move but not its direction.', 'IV is low relative to the likely move.', 'Often considered before known catalysts, but IV is usually elevated then.'],
    regime: 'Better when VIX is low and a volatility expansion is plausible. Buying after VIX has jumped is expensive.',
    greeks: { gamma: 'long', theta: 'short', vega: 'long', note: 'Delta-neutral at entry, long gamma and vega, heavy negative theta.' },
    maxRisk: 'Limited to the total premium paid (both legs).',
    margin: M_BUY,
    wrong: ['Spot stays near the strike: both premiums decay.', 'IV collapses after the event even if the move happens.', 'Breakevens are wide, so the move must be larger than the market already prices in.'],
  },
  {
    slug: 'short-straddle', name: 'Short Straddle', category: 'volatility', outlook: 'range-bound', module: '20.4',
    tagline: 'Sell a call and a put at the same strike: bet on calm.',
    construction: 'Sell an ATM call and an ATM put. You collect two premiums and profit most if spot ends at the strike; losses are open-ended in both directions.',
    legs: [o('CE', -1, 0), o('PE', -1, 0)], defaultUnit: 2,
    conditions: ['You expect a quiet, range-bound market.', 'IV rich relative to expected realised volatility.', 'Experienced trader with a firm risk plan.'],
    regime: 'Premium is highest when VIX is high, but so is the chance of a large move. Not a free lunch.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Delta-neutral at entry, strongly short gamma and vega, strongly positive theta.' },
    maxRisk: 'Unlimited on the upside and very large on the downside.',
    margin: M_SELL,
    wrong: ['A trending day or gap beyond the breakevens.', 'IV expansion while holding short vega.', 'Event risk overnight.'],
  },
  {
    slug: 'long-strangle', name: 'Long Strangle', category: 'volatility', outlook: 'volatile', module: '20.4',
    tagline: 'Buy an OTM call and OTM put: cheaper than a straddle.',
    construction: 'Buy an OTM call and an OTM put. It costs less than a straddle but needs a bigger move before it pays.',
    legs: [o('CE', 1, 1), o('PE', 1, -1)], defaultUnit: 2,
    conditions: ['Expecting a big move in either direction.', 'Want a lower cost than a straddle and accept a larger breakeven distance.', 'IV low versus the expected move.'],
    regime: 'Similar to a straddle: more attractive when IV is subdued.',
    greeks: { gamma: 'long', theta: 'short', vega: 'long', note: 'Near delta-neutral, long gamma and vega, negative theta (less than a straddle).' },
    maxRisk: 'Limited to the total premium paid.',
    margin: M_BUY,
    wrong: ['Spot finishes between the strikes: both options expire worthless.', 'IV falls.', 'A move that is big but not big enough.'],
  },
  {
    slug: 'short-strangle', name: 'Short Strangle', category: 'volatility', outlook: 'range-bound', module: '20.4',
    tagline: 'Sell an OTM call and OTM put: a wider profit zone.',
    construction: 'Sell an OTM call and an OTM put. You collect less than a straddle but profit anywhere between the breakevens.',
    legs: [o('CE', -1, 1), o('PE', -1, -1)], defaultUnit: 2,
    conditions: ['Expecting a range-bound market.', 'IV elevated relative to expected movement.', 'Strong risk controls and margin.'],
    regime: 'Commonly sold when IV is rich; large moves still cause losses on one side.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Delta-neutral at entry, short gamma and vega, positive theta.' },
    maxRisk: 'Unlimited on the upside and very large on the downside.',
    margin: M_SELL,
    wrong: ['A breakout through either breakeven.', 'Volatility expansion.', 'Adjusting late: the tested side keeps growing.'],
  },
  {
    slug: 'iron-condor', name: 'Iron Condor', category: 'volatility', outlook: 'range-bound', module: '20.4',
    tagline: 'A short strangle with wings: range income with a cap on loss.',
    construction: 'Sell an OTM put and OTM call, then buy a further-OTM put and call as protection. You receive a net credit and the wings cap the loss.',
    legs: [o('PE', 1, -3), o('PE', -1, -2), o('CE', -1, 2), o('CE', 1, 3)], defaultUnit: 2,
    conditions: ['Expecting spot to stay between the short strikes.', 'Elevated IV that you expect to ease.', 'Want defined risk rather than a naked strangle.'],
    regime: 'Often discussed when IV is elevated and the market is range-bound.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Near delta-neutral, short gamma and vega, positive theta.' },
    maxRisk: 'Limited: wing width minus the net credit. Usually several times the maximum profit.',
    margin: M_SPREAD,
    wrong: ['A breakout beyond either wing: maximum loss.', 'Losses are larger than the maximum gain, so win rate must be high.', 'IV rises after entry.'],
  },
  {
    slug: 'iron-butterfly', name: 'Iron Butterfly', category: 'volatility', outlook: 'neutral', module: '20.4',
    tagline: 'Short straddle with wings: a pinpoint profit zone.',
    construction: 'Sell an ATM call and put and buy OTM wings on each side. The maximum profit is at the centre strike and the wings cap the loss.',
    legs: [o('PE', 1, -2), o('PE', -1, 0), o('CE', -1, 0), o('CE', 1, 2)], defaultUnit: 2,
    conditions: ['Expecting very little movement.', 'High IV that should fall.', 'Want defined risk.'],
    regime: 'Elevated IV with an expected contraction.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Delta-neutral, short gamma and vega, positive theta, highest at the centre.' },
    maxRisk: 'Limited: wing width minus the credit.',
    margin: M_SPREAD,
    wrong: ['Any meaningful move away from the centre strike.', 'Narrow profit zone.', 'Gap risk.'],
  },
  {
    slug: 'long-butterfly', name: 'Long Butterfly', category: 'volatility', outlook: 'neutral', module: '20.4',
    tagline: 'Cheap, defined-risk bet that spot pins a strike.',
    construction: 'Buy one lower call, sell two middle calls, buy one higher call (equal spacing). The cost is small and the maximum profit is at the middle strike at expiry.',
    legs: [o('CE', 1, -1), o('CE', -1, 0, 2), o('CE', 1, 1)], defaultUnit: 2,
    conditions: ['A view that spot will end near a particular level.', 'Low cost, defined risk.', 'Time passing helps if spot is near the middle.'],
    regime: 'Works best when IV is elevated and expected to settle.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Near the centre: short gamma, positive theta, short vega. Away from it, the reverse.' },
    maxRisk: 'Limited to the net debit paid.',
    margin: M_SPREAD,
    wrong: ['Spot ends outside the wings: the debit is lost.', 'A narrow profit zone.', 'Four legs mean more costs.'],
  },
  {
    slug: 'short-butterfly', name: 'Short Butterfly', category: 'volatility', outlook: 'volatile', module: '20.4',
    tagline: 'Defined-risk bet that spot leaves a central strike.',
    construction: 'Sell one lower call, buy two middle calls, sell one higher call. You receive a credit and profit if spot ends away from the middle.',
    legs: [o('CE', -1, -1), o('CE', 1, 0, 2), o('CE', -1, 1)], defaultUnit: 2,
    conditions: ['Expecting a breakout from a tight range.', 'Defined risk with limited reward.'],
    regime: 'Low IV can make the credit small; usually viewed as a niche structure.',
    greeks: { gamma: 'long', theta: 'short', vega: 'long', note: 'Near the centre: long gamma, negative theta, long vega.' },
    maxRisk: 'Limited: wing width minus the credit. Maximum loss occurs if spot pins the middle strike.',
    margin: M_SPREAD,
    wrong: ['Spot pins the middle strike at expiry.', 'Reward is small relative to risk.', 'Many legs and costs.'],
  },
  {
    slug: 'calendar-spread', name: 'Calendar Spread', category: 'volatility', outlook: 'neutral', module: '20.4',
    tagline: 'Sell near-expiry, buy later expiry at the same strike.',
    construction: 'Sell a near-expiry ATM call and buy a later-expiry call at the same strike. The near leg decays faster, so profit builds if spot stays close to the strike. Payoff is shown when the near leg expires.',
    legs: [o('CE', -1, 0, 1, 'near'), o('CE', 1, 0, 1, 'far')], defaultUnit: 2,
    conditions: ['Expecting a quiet near term.', 'Low IV that may rise (long vega).', 'Time decay differential is the engine.'],
    regime: 'Favoured by many when IV is low and the term structure is flat or upward sloping.',
    greeks: { gamma: 'short', theta: 'long', vega: 'long', note: 'Short near-term gamma, positive theta, long vega from the far leg.' },
    maxRisk: 'Limited to the net debit paid (under the model assumptions).',
    margin: M_MIXED,
    wrong: ['A large move in either direction drags both options away from the strike.', 'IV falls: the long far leg loses more than the short.', 'Model assumes a flat IV; real term structures differ.'],
  },
  {
    slug: 'diagonal-spread', name: 'Diagonal Spread', category: 'volatility', outlook: 'bullish', module: '20.4',
    tagline: 'A calendar with different strikes and a directional tilt.',
    construction: 'Buy a later-expiry call and sell a near-expiry call at a higher strike. It is a calendar with a directional bias: profit if spot drifts toward the short strike.',
    legs: [o('CE', 1, 0, 1, 'far'), o('CE', -1, 1, 1, 'near')], defaultUnit: 2,
    conditions: ['Mildly bullish with a slow grind higher.', 'Wants to finance a long-dated call by selling near-term premium.'],
    regime: 'Moderate IV; long vega from the far leg.',
    greeks: { gamma: 'mixed', theta: 'long', vega: 'long', note: 'Positive delta, short near-term gamma, positive theta, long vega.' },
    maxRisk: 'Limited to the net debit (under the model assumptions).',
    margin: M_MIXED,
    wrong: ['Spot falls: the far call loses value.', 'A sharp rally through the short strike.', 'IV falls.'],
  },
  // ───────── 20.5 advanced ─────────
  {
    slug: 'ratio-spread', name: 'Call Ratio Spread', category: 'advanced', outlook: 'neutral', module: '20.5',
    tagline: 'Buy one, sell two further out: a peak at the short strike.',
    construction: 'Buy one lower-strike call and sell two higher-strike calls. It can be entered for little or a credit; profit peaks at the short strike but losses are uncapped above.',
    legs: [o('CE', 1, 0), o('CE', -1, 2, 2)], defaultUnit: 2,
    conditions: ['Mildly bullish with a specific target level.', 'High IV on the short strikes.', 'Experienced traders who can manage the naked leg.'],
    regime: 'Usually considered when IV is elevated.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Positive delta near entry, turning negative as spot rises through the short strike.' },
    maxRisk: 'Unlimited on the upside because one short call is uncovered.',
    margin: M_SELL,
    wrong: ['A strong rally beyond the short strike.', 'Margin on the uncovered leg.', 'Gap risk.'],
  },
  {
    slug: 'backspread', name: 'Call Backspread', category: 'advanced', outlook: 'volatile', module: '20.5',
    tagline: 'Sell one, buy two further out: long convexity.',
    construction: 'Sell one lower-strike call and buy two higher-strike calls. It profits from a large rally, with a loss zone near the long strikes.',
    legs: [o('CE', -1, 0), o('CE', 1, 1, 2)], defaultUnit: 2,
    conditions: ['Expecting a sharp upward move.', 'IV is low or moderate.', 'Often entered for a small debit or credit.'],
    regime: 'Better when IV is low; vega is net long.',
    greeks: { gamma: 'long', theta: 'short', vega: 'long', note: 'Net long gamma and vega with negative theta; delta turns positive on a rally.' },
    maxRisk: 'Limited, but there is a maximum-loss zone if spot ends at the long strike. Upside is open-ended.',
    margin: M_MIXED,
    wrong: ['Spot finishes near the long strike: the maximum loss.', 'A modest rally is not enough.', 'Falling IV.'],
  },
  {
    slug: 'broken-wing-butterfly', name: 'Broken Wing Butterfly', category: 'advanced', outlook: 'neutral', module: '20.5',
    tagline: 'A butterfly with one wing pushed further out.',
    construction: 'A butterfly with unequal wing distances: buy a lower call, sell two middle calls and buy a more distant upper call. It can be entered for a credit, so there is no risk on one side but extra risk on the other.',
    legs: [o('CE', 1, -1), o('CE', -1, 0, 2), o('CE', 1, 2)], defaultUnit: 2,
    conditions: ['Neutral to mildly bullish.', 'Wants a low-cost or credit entry.', 'Accepts a one-sided risk.'],
    regime: 'Elevated IV with a view that spot will not run far.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Near the body: short gamma, positive theta, short vega.' },
    maxRisk: 'Limited, and concentrated on the wide-wing side.',
    margin: M_SPREAD,
    wrong: ['A strong rally past the far wing.', 'Spot pins neither the body nor the zone.', 'Four legs.'],
  },
  {
    slug: 'jade-lizard', name: 'Jade Lizard', category: 'advanced', outlook: 'neutral', module: '20.5',
    tagline: 'Short put plus a short call spread: no upside risk by design.',
    construction: 'Sell an OTM put and a short call spread (sell an OTM call, buy a higher call). If the credit exceeds the width of the call spread, there is no loss on the upside, but the downside is very large.',
    legs: [o('PE', -1, -1), o('CE', -1, 1), o('CE', 1, 2)], defaultUnit: 2,
    conditions: ['Neutral to bullish.', 'High IV on both sides.', 'Willing to take downside risk.'],
    regime: 'Elevated IV with a limited expectation of upside spikes.',
    greeks: { gamma: 'short', theta: 'long', vega: 'short', note: 'Positive delta from the short put, short gamma and vega, positive theta.' },
    maxRisk: 'Very large on the downside because of the naked short put.',
    margin: M_SELL,
    wrong: ['A sharp sell-off.', 'If the credit is smaller than the call-spread width, the upside is not riskless.', 'IV expansion.'],
  },
  {
    slug: 'christmas-tree', name: 'Christmas Tree Spread', category: 'advanced', outlook: 'bullish', module: '20.5',
    tagline: 'Call tree: buy 1, sell 3, buy 2 across three strikes.',
    construction: 'Buy one call at the lowest strike, sell three at the middle strike and buy two at the highest strike. The profit zone is around the middle strike; the extra long calls cap the tail.',
    legs: [o('CE', 1, 0), o('CE', -1, 1, 3), o('CE', 1, 2, 2)], defaultUnit: 2,
    conditions: ['A view that spot lands near the middle strike.', 'Complexity and cost: many legs.', 'Elevated IV for the short strikes.'],
    regime: 'Elevated IV.',
    greeks: { gamma: 'mixed', theta: 'long', vega: 'mixed', note: 'A shape that changes sign with spot; check the live Greeks above.' },
    maxRisk: 'Limited in this construction; other tree variants may carry uncovered risk.',
    margin: M_MIXED,
    wrong: ['Spot exits the profit zone.', 'Transaction costs across six lots.', 'Different variants differ materially.'],
  },
  {
    slug: 'double-calendar', name: 'Double Calendar', category: 'advanced', outlook: 'range-bound', module: '20.5',
    tagline: 'A put calendar and a call calendar for a wider range.',
    construction: 'Sell near-expiry OTM call and put and buy the same strikes in a later expiry. It profits if spot stays between the short strikes, with long vega.',
    legs: [o('PE', -1, -1, 1, 'near'), o('PE', 1, -1, 1, 'far'), o('CE', -1, 1, 1, 'near'), o('CE', 1, 1, 1, 'far')], defaultUnit: 2,
    conditions: ['Range-bound near term.', 'Low IV that may rise.', 'Wants a wider profit zone than a single calendar.'],
    regime: 'Low to moderate IV.',
    greeks: { gamma: 'short', theta: 'long', vega: 'long', note: 'Positive theta and vega, short near-term gamma.' },
    maxRisk: 'Limited to the net debit (under the model assumptions).',
    margin: M_MIXED,
    wrong: ['A big move in either direction.', 'IV falls.', 'Four legs and costs.'],
  },
  {
    slug: 'synthetic-long', name: 'Synthetic Long', category: 'advanced', outlook: 'bullish', module: '20.5',
    tagline: 'Long call + short put at the same strike mimics a future.',
    construction: 'Buy an ATM call and sell an ATM put with the same strike and expiry. The payoff resembles a long futures position with little net premium.',
    legs: [o('CE', 1, 0), o('PE', -1, 0)], defaultUnit: 2,
    conditions: ['A bullish view without paying the full call premium.', 'Comfort with linear, uncapped downside.'],
    regime: 'Mostly independent of IV because vega nets out.',
    greeks: { gamma: 'neutral', theta: 'neutral', vega: 'neutral', note: 'Delta close to +1; gamma, theta and vega roughly cancel.' },
    maxRisk: 'Very large: the loss grows as the index falls.',
    margin: M_SELL,
    wrong: ['A fall in the index: losses are linear and large.', 'Margin calls.', 'Net premium may not be zero.'],
  },
  {
    slug: 'synthetic-short', name: 'Synthetic Short', category: 'advanced', outlook: 'bearish', module: '20.5',
    tagline: 'Long put + short call at the same strike mimics a short future.',
    construction: 'Buy an ATM put and sell an ATM call. The payoff resembles a short futures position.',
    legs: [o('PE', 1, 0), o('CE', -1, 0)], defaultUnit: 2,
    conditions: ['A bearish view without paying the full put premium.', 'Comfort with linear, uncapped upside risk.'],
    regime: 'Mostly independent of IV.',
    greeks: { gamma: 'neutral', theta: 'neutral', vega: 'neutral', note: 'Delta close to −1; the other Greeks roughly cancel.' },
    maxRisk: 'Unlimited on the upside.',
    margin: M_SELL,
    wrong: ['A rally.', 'Margin calls.', 'Gaps.'],
  },
  {
    slug: 'risk-reversal', name: 'Risk Reversal', category: 'advanced', outlook: 'bullish', module: '20.5',
    tagline: 'Sell an OTM put to fund an OTM call.',
    construction: 'Sell an OTM put and buy an OTM call (or the reverse for a bearish version). It can cost little or nothing, with a flat zone in the middle.',
    legs: [o('PE', -1, -1), o('CE', 1, 1)], defaultUnit: 2,
    conditions: ['A directional view with a tolerance for downside risk.', 'Put skew can make the put rich versus the call, helping financing.'],
    regime: 'When put IV is richer than call IV, the structure is cheaper.',
    greeks: { gamma: 'mixed', theta: 'neutral', vega: 'mixed', note: 'Positive delta; low net theta.' },
    maxRisk: 'Very large on the downside.',
    margin: M_SELL,
    wrong: ['A fall below the put strike.', 'Flat markets: little gain.', 'Margin.'],
  },
  {
    slug: 'collar', name: 'Collar', category: 'advanced', outlook: 'neutral', module: '20.5',
    tagline: 'Holding the underlying with a put floor and a call cap.',
    construction: 'Hold the underlying (modelled as a long position at spot), buy an OTM put and sell an OTM call. The call premium funds some or all of the put. Loss and gain are both bounded.',
    legs: [u(1), o('PE', 1, -1), o('CE', -1, 1)], defaultUnit: 2,
    conditions: ['Protecting an existing holding.', 'Accepting an upside cap in return for lower cost.'],
    regime: 'Any; more attractive when protection is expensive and calls are rich.',
    greeks: { gamma: 'mixed', theta: 'neutral', vega: 'neutral', note: 'Delta reduced; low net theta and vega.' },
    maxRisk: 'Limited: the distance to the put strike plus net cost.',
    margin: 'The underlying and the hedge are margined by the exchange and broker, often with some offset. Rules change; check with your broker.',
    wrong: ['A strong rally: gains stop at the call strike.', 'A fall to the put strike: you lose that distance.', 'Costs over time.'],
  },
]

export const STRATEGY_BY_SLUG: Record<string, Strategy> = Object.fromEntries(STRATEGIES.map((s) => [s.slug, s]))
export const DEFAULT_SLUG = 'long-call'
