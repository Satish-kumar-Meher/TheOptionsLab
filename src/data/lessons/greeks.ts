import type { Lesson } from '../lessonTypes'
import { IV, LOT, RATE, SPOT, bs, f, g, sg } from './util'

const D1 = (type: 'CE' | 'PE', K: number, days: number, iv = IV, S = SPOT) => bs(type, S, K, days / 365, RATE, iv)
const MODEL = 'Model values: Black–Scholes, Nifty spot 24,000, IV 14%, r 6.5%, calendar-day time. Real premiums differ.'

// ---------- 6.2 Delta ----------
const dRow = (label: string, type: 'CE' | 'PE', K: number) =>
  `${label}: 7 days Δ = ${f(g(type, K, 7).delta, 3)}  |  1 day Δ = ${f(g(type, K, 1).delta, 3)}`

const atm7 = g('CE', 24000, 7)
const up100 = D1('CE', 24000, 7, IV, SPOT + 100)
const deltaOnly = atm7.delta * 100
const withGamma = deltaOnly + 0.5 * atm7.gamma * 100 * 100
const actualMove = up100.price - atm7.price

const ceLadder = [24000, 24100, 24200, 24300, 24400].map((k) => ({ k, d: g('CE', k, 7).delta }))
const pick30 = ceLadder.reduce((a, b) => (Math.abs(b.d - 0.3) < Math.abs(a.d - 0.3) ? b : a))

const hedgeCe = g('CE', 24000, 7).delta
const hedgeLots = 2
const posDelta = hedgeCe * LOT * hedgeLots
const futLotsToSell = posDelta / LOT
const residual = posDelta - LOT * 1

export const lesson62: Lesson = {
  moduleId: '6.2',
  summary:
    'Delta measures how much an option’s price is expected to change for a one-point move in the underlying, and equivalently how much directional exposure one option carries. Calls have positive delta, puts negative, ATM options sit near 0.5 in absolute terms, and the sign you actually hold depends on whether you bought or sold. Delta is a local estimate that changes as the market moves, which is where gamma comes in.',
  objectives: [
    'Define delta and state its range for calls (0 to +1) and puts (-1 to 0), and its value near ATM, ITM and OTM.',
    'Work out the sign of position delta for the four core positions (long/short call, long/short put).',
    'Estimate the premium change from a given index move using delta, and explain why the estimate drifts for large moves.',
    'Use delta as a rough guide for strike selection, including its limits as a "probability" proxy.',
    'Compute portfolio delta in index units and size a futures hedge to neutralise it.',
    'Describe how delta moves toward 0 or ±1 as expiry nears.',
  ],
  concepts: [
    { term: 'Delta (Δ)', definition: 'Approximate change in option premium per 1-point change in the underlying, all else equal. A 0.50 delta call gains about 0.50 points when Nifty rises 1 point.' },
    { term: 'Delta of CE and PE', definition: 'Call delta lies between 0 and +1; put delta lies between -1 and 0. For a European option without dividends, call delta minus put delta at the same strike and expiry equals about 1.' },
    { term: 'ATM / ITM / OTM delta', definition: 'ATM options have |delta| near 0.5. ITM options move toward 1 (a deep ITM call behaves almost like the index itself). OTM options have small |delta| and respond weakly until the index gets near the strike.' },
    { term: 'Position delta (buyer vs seller)', definition: 'Multiply the option delta by +1 if you are long it and by -1 if you are short it. Short call: negative delta. Short put: positive delta. A seller’s sign is the opposite of the buyer’s on the same contract.' },
    { term: 'Delta as a probability proxy', definition: 'Traders often read |delta| as a rough chance of finishing in the money. This is only a loose approximation of the model’s risk-neutral probability, not a forecast.' },
    { term: 'Portfolio delta', definition: 'Sum of (option delta × lots × lot size × direction) across positions, in index units. It tells you how many Nifty units your book behaves like.' },
    { term: 'Delta hedging', definition: 'Adding an offsetting position (usually futures) so net delta is close to zero. It removes small-move directional exposure but not gamma, theta or vega, and it must be re-balanced as delta changes.' },
  ],
  formulas: [
    { label: 'Delta definition', tex: String.raw`\Delta = \frac{\partial V}{\partial S}\approx\frac{\text{change in premium}}{\text{change in index}}` },
    { label: 'Black–Scholes call and put delta (no dividends)', tex: String.raw`\Delta_{CE}=N(d_1),\qquad \Delta_{PE}=N(d_1)-1`, note: 'N is the standard normal CDF; d1 = [ln(S/K) + (r + σ²/2)T] / (σ√T).' },
    { label: 'First-order premium estimate', tex: String.raw`\Delta V \approx \Delta\cdot \Delta S`, note: 'Add 1/2·Γ·ΔS² for a better estimate on larger moves (see Gamma).' },
    { label: 'Portfolio delta (index units)', tex: String.raw`\Delta_{\text{port}}=\sum_i \text{sign}_i\cdot \Delta_i\cdot \text{lots}_i\cdot \text{lot size}` },
  ],
  examples: [
    {
      title: 'Delta by moneyness and time (model values)',
      given: [MODEL, 'Delta shown for a 7-day and a 1-day option'],
      steps: [
        dRow('24,000 CE (ATM)', 'CE', 24000),
        dRow('24,200 CE (OTM)', 'CE', 24200),
        dRow('23,800 CE (ITM)', 'CE', 23800),
        dRow('24,000 PE (ATM)', 'PE', 24000),
        dRow('23,800 PE (OTM)', 'PE', 23800),
        dRow('24,200 PE (ITM)', 'PE', 24200),
        'Reading across: ATM delta stays near ±0.5; OTM delta shrinks toward 0 as expiry nears; ITM delta moves toward ±1.',
        `Same strike, opposite type: 24,000 CE Δ ${f(g('CE', 24000, 7).delta, 3)} minus 24,000 PE Δ ${f(g('PE', 24000, 7).delta, 3)} = ${f(g('CE', 24000, 7).delta - g('PE', 24000, 7).delta, 3)} (≈ 1).`,
      ],
      takeaway: 'Delta is not a fixed property of a strike. It depends on how far the strike is from spot relative to the time and volatility left.',
    },
    {
      title: 'Using delta to estimate a premium change',
      given: [MODEL, `24,000 CE with 7 days left: premium ${f(atm7.price, 2)}, Δ = ${f(atm7.delta, 3)}, Γ = ${f(atm7.gamma, 6)}`, 'Nifty rises 100 points to 24,100 instantly (time and IV unchanged)'],
      steps: [
        `Delta-only estimate = ${f(atm7.delta, 3)} × 100 = ${f(deltaOnly, 1)} points.`,
        `Gamma correction = ½ × ${f(atm7.gamma, 6)} × 100² = ${f(0.5 * atm7.gamma * 100 * 100, 1)} points. Corrected estimate = ${f(withGamma, 1)} points.`,
        `Model reprice at 24,100: ${f(up100.price, 2)}, an actual gain of ${f(actualMove, 1)} points.`,
        `Per lot (${LOT}): gain ≈ ${f(actualMove * LOT)} rupees for a long call; the short call loses the same amount.`,
        `Delta alone under-predicts by ${f(actualMove - deltaOnly, 1)} points because delta itself rose while the index moved.`,
      ],
      takeaway: 'Delta is a first-order estimate. It is good for small moves; for larger moves the curvature (gamma) matters, and it works in favour of the owner of the option.',
    },
    {
      title: 'Delta-based strike selection',
      given: [MODEL, '7-day call deltas for strikes above spot'],
      steps: [
        ...ceLadder.map((r) => `${f(r.k)} CE: Δ = ${f(r.d, 3)}, premium ${f(g('CE', r.k, 7).price, 1)}`),
        `Closest to a 0.30 delta target: ${f(pick30.k)} CE (Δ ${f(pick30.d, 3)}).`,
        'A lower-delta strike is cheaper but needs a larger move; a higher-delta strike costs more and tracks the index more closely. Choose by the move you expect and the loss you can accept, not by delta alone.',
      ],
      takeaway: 'Delta turns the vague idea of "how far OTM" into a number, but it is a guide to sensitivity, not a probability guarantee.',
    },
    {
      title: 'Portfolio delta and a futures hedge',
      given: [MODEL, `Long ${hedgeLots} lots of 24,000 CE (7 days), lot size ${LOT}`, `Nifty futures lot = ${LOT} units, delta 1 per unit`],
      steps: [
        `Option delta = ${f(hedgeCe, 3)}.`,
        `Position delta = ${f(hedgeCe, 3)} × ${hedgeLots} × ${LOT} = ${f(posDelta, 1)} index units (it behaves like being long about ${f(posDelta, 1)} Nifty).`,
        `Hedge: sell ${f(futLotsToSell, 2)} futures lots' worth. In whole lots, sell 1 lot (${LOT} units): residual delta = ${f(posDelta, 1)} - ${LOT} = ${sg(residual, 1)} units.`,
        'The hedge is only valid at today’s delta. If Nifty moves, delta changes (gamma), and the hedge must be re-balanced. It also leaves theta and vega unchanged.',
      ],
      takeaway: 'Delta hedging converts a directional bet into a bet on volatility and time. It is not risk-free: you still hold gamma, theta and vega.',
    },
  ],
  scenarios: {
    bullish: { text: 'Long calls and short puts have positive delta. A 24,000 CE at Δ 0.53 gains about 53 points on a 100-point rally, while a short 23,800 PE at Δ -0.31 gains about 31 points of premium decline on the same move, but carries downside risk if the rally fails.' },
    bearish: { text: 'Long puts and short calls have negative delta. A long 24,000 PE at Δ -0.47 gains about 47 points on a 100-point fall; a short call benefits from the fall only up to the premium collected.' },
    sideways: { text: 'Delta-neutral books (for example a short straddle or a hedged long call) have little directional exposure, but they depend on the index staying quiet; a large move turns delta against a short-gamma book quickly.' },
  },
  pitfalls: [
    'Reading delta as a promise: a 0.30 delta option does not "have a 30% chance" in any forecasting sense; it is a model output that shifts with every tick.',
    'Forgetting the sign when selling: a short call has negative delta even though the call’s own delta is positive.',
    'Assuming delta is constant over a big move. It changes as spot, time and IV change; use gamma to see how fast.',
    'Over-trusting a delta hedge: net delta zero does not mean zero risk (gamma, theta, vega, gaps and costs remain).',
    'Comparing deltas across different expiries without noticing that a 1-day 0.3 delta strike is far closer to spot than a 30-day 0.3 delta strike.',
  ],
  practice: [
    { q: 'A 24,000 CE has Δ 0.53 and premium 200. Estimate the premium if Nifty rises 40 points, ignoring other effects.', a: 'ΔV ≈ 0.53 × 40 = 21.2, so the premium is about 221.2. Gamma and time would adjust this slightly.' },
    { q: 'You are short 3 lots of a 24,000 PE with Δ -0.47. What is your position delta in index units (lot 65)?', a: `The put’s delta is -0.47, and being short flips the sign: +0.47. Position delta = +0.47 × 3 × 65 = ${f(0.47 * 3 * 65, 1)} units (net long exposure).` },
    { q: 'Why does a 24,200 CE usually show a smaller delta with 1 day left than with 7 days left?', a: `With less time the index is less likely to travel the 200 points, so the model’s sensitivity falls: Δ ${f(g('CE', 24200, 1).delta, 3)} at 1 day vs ${f(g('CE', 24200, 7).delta, 3)} at 7 days (model values).` },
    { q: 'Your book is long 130 units of delta (index units). How many Nifty futures lots should you sell to be roughly neutral, lot 65?', a: '130 / 65 = 2 lots. Re-check after any significant move because delta will have changed.' },
  ],
  assignment:
    'In the Greeks lab set spot 24,000 and IV 14%. Record call and put delta for five strikes at 7 days and at 1 day. Then build a two-leg position of your choice, compute its portfolio delta by hand and compare it with the lab. Write three sentences on what would happen to that delta if Nifty moved 150 points.',
  lab: { to: '/labs/greeks', label: 'Open the Greeks lab' },
}

// ---------- 6.3 Gamma ----------
const gA7 = g('CE', 24000, 7)
const gA1 = g('CE', 24000, 1)
const gO7 = g('CE', 24200, 7)
const gO1 = g('CE', 24200, 1)
const gA1up = D1('CE', 24000, 1, IV, SPOT + 100)
const gA1dn = D1('CE', 24000, 1, IV, SPOT - 100)
const gammaPnl = 0.5 * gA1.gamma * 100 * 100
const shortLossPerLot = (gA1up.price - gA1.price) * LOT
const deltaOnlyLoss = gA1.delta * 100 * LOT
const futCover = -(gA1up.price - gA1.price)

export const lesson63: Lesson = {
  moduleId: '6.3',
  summary:
    'Gamma is the rate at which delta changes as the index moves; it is the curvature of an option’s payoff. It is highest for ATM options and grows sharply as expiry approaches, which is why short-dated ATM options reward and punish moves so quickly. Buyers hold positive gamma and sellers hold negative gamma, and that asymmetry drives much of expiry-day behaviour.',
  objectives: [
    'Define gamma and explain how it links to delta (change in delta per 1-point move).',
    'Explain why gamma peaks near ATM and rises as expiry approaches.',
    'Compare gamma at 7 days and 1 day for ATM and OTM options using model numbers.',
    'Distinguish positive gamma (long options) from negative gamma (short options) and say what each does to a delta-hedged book.',
    'Quantify the extra gain or loss caused by gamma on a given move using ½·Γ·ΔS².',
    'Describe gamma scalping, a gamma squeeze and gamma exposure (GEX) and state their limits.',
  ],
  concepts: [
    { term: 'Gamma (Γ)', definition: 'The change in delta for a 1-point change in the underlying. Same for calls and puts at the same strike and expiry.' },
    { term: 'Why ATM is highest', definition: 'At ATM the option is closest to flipping between "likely worthless" and "likely in the money", so delta changes fastest. Deep ITM and far OTM options have delta close to 1 or 0 and barely change.' },
    { term: 'Gamma near expiry', definition: 'As time shrinks, the transition zone narrows and gets steeper. ATM gamma rises roughly with 1/√T, while OTM gamma collapses toward zero unless the index moves close to the strike.' },
    { term: 'Positive gamma (long options)', definition: 'Delta moves in your favour: delta rises as the index rises and falls as it falls. Gains accelerate and losses slow down, but you pay for it through theta.' },
    { term: 'Negative gamma (short options)', definition: 'Delta moves against you: a short call becomes more negative as the index rises. Losses accelerate on large moves in either direction; the seller is compensated by theta.' },
    { term: 'Gamma explosion / gamma risk for sellers', definition: 'A sudden jump in the rate of loss on a short ATM option when the index rapidly moves through the strike near expiry. Margin and slippage can make exits harder at that moment.' },
    { term: 'Gamma scalping', definition: 'A delta-hedged long-option strategy that re-hedges as the index moves, harvesting realised movement against theta. It profits only if realised movement exceeds what the option price implied, and costs add up.' },
    { term: 'Gamma squeeze and GEX', definition: 'A squeeze is forced re-hedging that can reinforce a move. Gamma exposure (GEX) tries to sum gamma across open interest, but OI does not tell who is long or short, so any GEX figure rests on assumptions and should be treated as a hypothesis, not a fact.' },
  ],
  formulas: [
    { label: 'Gamma definition', tex: String.raw`\Gamma=\frac{\partial \Delta}{\partial S}=\frac{\partial^2 V}{\partial S^2}` },
    { label: 'Black–Scholes gamma (call and put)', tex: String.raw`\Gamma=\frac{\varphi(d_1)}{S\,\sigma\sqrt{T}}`, note: 'φ is the standard normal density; it is largest at d1 ≈ 0 (near ATM) and rises as T falls.' },
    { label: 'Second-order premium estimate', tex: String.raw`\Delta V \approx \Delta\cdot\Delta S+\tfrac12\,\Gamma\,(\Delta S)^2`, note: 'The gamma term is always positive for a long option and negative for a short option, whichever way the index moves.' },
    { label: 'Updated delta', tex: String.raw`\Delta_{\text{new}}\approx\Delta+\Gamma\cdot\Delta S` },
  ],
  examples: [
    {
      title: 'Gamma at 7 days vs 1 day (model values)',
      given: [MODEL],
      steps: [
        `24,000 CE (ATM): 7 days Γ = ${f(gA7.gamma, 6)}, 1 day Γ = ${f(gA1.gamma, 6)} (ratio ${f(gA1.gamma / gA7.gamma, 2)}×).`,
        `24,200 CE (OTM): 7 days Γ = ${f(gO7.gamma, 6)}, 1 day Γ = ${f(gO1.gamma, 6)} (ratio ${f(gO1.gamma / gO7.gamma, 2)}×).`,
        `Delta change for a 50-point rise, 1 day, ATM: ΔΔ ≈ ${f(gA1.gamma, 6)} × 50 = ${f(gA1.gamma * 50, 3)}.`,
        `For the OTM 24,200 CE, the 1-day delta is only ${f(gO1.delta, 3)}; the ATM option’s gamma is ${f(gA1.gamma / gO1.gamma, 2)}× larger than the OTM option’s.`,
      ],
      takeaway: 'ATM gamma is the largest and rises as expiry approaches. OTM gamma at 1 day is smaller than at 7 days at this distance, because the strike is practically out of reach unless the index moves.',
    },
    {
      title: 'What gamma does on a 100-point move (1 day to expiry, ATM)',
      given: [MODEL, `24,000 CE with 1 day left: premium ${f(gA1.price, 2)}, Δ ${f(gA1.delta, 3)}, Γ ${f(gA1.gamma, 6)}`, 'Nifty rises 100 points to 24,100 instantly (time and IV unchanged)'],
      steps: [
        `Premium at 24,100 = ${f(gA1up.price, 2)}; at 23,900 = ${f(gA1dn.price, 2)}.`,
        `Long call, up move: ${sg(gA1up.price - gA1.price, 1)} points. Delta-only estimate ${f(gA1.delta * 100, 1)}; gamma term ½·Γ·100² = ${f(gammaPnl, 1)}.`,
        `Long call, down move: ${sg(gA1dn.price - gA1.price, 1)} points. The option lost less than delta alone suggests (${f(-gA1.delta * 100, 1)}) because delta shrank as the index fell.`,
        `Short 1 lot, up move: loss ≈ ${f(-shortLossPerLot)} rupees (${f(deltaOnlyLoss)} from delta alone plus ${f(gammaPnl * LOT)} from negative gamma), i.e. ${f(-futCover, 1)} points × ${LOT}.`,
        'A long futures position hedges the first-order delta of that short call, but the gamma loss remains on the up move and also appears on the down move.',
      ],
      takeaway: 'Long gamma gains slightly more than delta predicts and loses slightly less; short gamma does the opposite. The size of the difference grows with the square of the move and with gamma.',
    },
  ],
  scenarios: {
    bullish: { text: 'A strong, fast rally through an ATM strike near expiry lifts a long call’s delta toward 1, and each further point is worth nearly a full point; a short call at that strike sees its loss accelerate.' },
    bearish: { text: 'A fast fall through the strike turns a long put’s delta toward -1 and rewards the holder quickly; a short put at that strike sees losses compound with a falling market.' },
    sideways: { text: 'If the index stays near the strike but oscillates, long gamma can be harvested by re-hedging, while short gamma earns theta as long as the swings stay small; large swings hurt the seller first.' },
  },
  pitfalls: [
    'Assuming gamma is a benefit for free: long gamma is paid for by theta, and the premium already reflects expected movement.',
    'Reading GEX or "gamma levels" from open interest as facts. OI does not reveal who is long or short, so dealer positioning is an assumption, not data.',
    'Thinking only sellers face gamma risk. Buyers can face rapid decay when the index stalls, and any position can suffer slippage near the strike.',
    'Quoting a single "ATM gamma" without the time to expiry. The number moves several-fold between 7 days and 1 day.',
    'Holding short ATM options into the last hour without a plan: jumps can happen faster than manual exits.',
  ],
  practice: [
    { q: 'An option has Δ 0.40 and Γ 0.002. Estimate the new delta after a 30-point rise.', a: 'Δ_new ≈ 0.40 + 0.002 × 30 = 0.46.' },
    { q: 'Using ΔV ≈ Δ·ΔS + ½Γ(ΔS)², estimate the premium change for Δ 0.50, Γ 0.002 and ΔS = +60.', a: 'Delta term 0.50 × 60 = 30; gamma term ½ × 0.002 × 3,600 = 3.6. Total ≈ +33.6 points.' },
    { q: 'Same option, ΔS = -60. Does gamma help or hurt a long call?', a: 'Delta term -30, gamma term +3.6, total ≈ -26.4. Gamma helps the long call by reducing the loss relative to delta alone.' },
    { q: 'Why is a seller of an ATM option with 1 day left more exposed than with 7 days left, even though the premium is smaller?', a: `Gamma is several times larger at 1 day (model: ${f(gA1.gamma, 6)} vs ${f(gA7.gamma, 6)}), so delta, and hence the rate of loss, changes much faster on a move.` },
  ],
  assignment:
    'Using the Greeks lab, record ATM gamma at 7, 3, 1 days and then compute the delta change for a 50-point move at each. Write a half-page note on why a seller’s risk limit should be set in rupees and in gamma terms, not only in premium collected.',
  lab: { to: '/labs/greeks', label: 'Open the Greeks lab' },
}

// ---------- 6.4 Theta ----------
const th = (type: 'CE' | 'PE', K: number, d: number) => g(type, K, d).theta
const ladderDays = [28, 14, 7, 3, 1]
const fri = g('CE', 24000, 5)
const mon = g('CE', 24000, 2)

export const lesson64: Lesson = {
  moduleId: '6.4',
  summary:
    'Theta is the premium an option loses per day purely from the passage of time, all else equal. It is a cost for buyers and an income stream for sellers, and it speeds up as expiry nears, especially for ATM options. Because time decay is paid for by taking gamma risk, theta income is never free.',
  objectives: [
    'Define theta and state its sign for buyers and sellers.',
    'Compare theta of ATM and OTM options at 7 days and 1 day in rupees per lot.',
    'Explain why decay accelerates near expiry and why it is not linear.',
    'Interpret weekend and holiday decay in a calendar-time model and its limits in real markets.',
    'Relate theta to the risk taken by the option seller (gamma, gaps, IV spikes).',
  ],
  concepts: [
    { term: 'Theta (Θ)', definition: 'Change in option premium per calendar day, holding spot and IV constant. In this site it is shown per calendar day; long options have negative theta.' },
    { term: 'Time decay', definition: 'The gradual loss of time value as expiry nears. At expiry only intrinsic value remains.' },
    { term: 'ATM vs OTM theta', definition: 'ATM options have the most time value and the largest absolute theta. Far OTM options have little premium and so little to decay in rupees, although their percentage decay can be total.' },
    { term: 'Accelerated decay', definition: 'ATM theta grows roughly like 1/√T, so the last few days carry a disproportionate share of the decay; the final day is the steepest.' },
    { term: 'Theta for buyers', definition: 'A cost: the index must move enough, and soon enough, to beat the daily decay.' },
    { term: 'Theta for sellers', definition: 'Income that is the reward for bearing short-gamma and short-vega risk. It is earned only if the index does not move more than the option implied.' },
    { term: 'Weekend and holiday decay', definition: 'A calendar-time model charges theta for every calendar day, including closed days. Real premiums may already be marked down in advance, so the Monday price depends on spot and IV as well as the calendar.' },
  ],
  formulas: [
    { label: 'Theta (per year, call)', tex: String.raw`\Theta_{CE}=-\frac{S\,\varphi(d_1)\,\sigma}{2\sqrt{T}}-rKe^{-rT}N(d_2)` },
    { label: 'Per-day theta', tex: String.raw`\Theta_{\text{day}}=\frac{\Theta_{\text{year}}}{365}` },
    { label: 'Theta–gamma relation (r ≈ 0)', tex: String.raw`\Theta_{\text{year}}+\tfrac12\,\sigma^2S^2\,\Gamma\approx 0`, note: 'For a delta-hedged option, time decay and gamma are two sides of the same coin.' },
    { label: 'Per-lot theta', tex: String.raw`\text{Theta per lot}=\Theta_{\text{day}}\times\text{lot size}` },
  ],
  examples: [
    {
      title: 'Daily theta, ATM vs OTM, 7 days vs 1 day (model values)',
      given: [MODEL, `Lot size ${LOT}`],
      steps: [
        `24,000 CE (ATM): 7d Θ = ${f(th('CE', 24000, 7), 2)}/day (${f(th('CE', 24000, 7) * LOT)} per lot) | 1d Θ = ${f(th('CE', 24000, 1), 2)}/day (${f(th('CE', 24000, 1) * LOT)} per lot).`,
        `24,000 PE (ATM): 7d Θ = ${f(th('PE', 24000, 7), 2)}/day | 1d Θ = ${f(th('PE', 24000, 1), 2)}/day.`,
        `24,200 CE (OTM): 7d Θ = ${f(th('CE', 24200, 7), 2)}/day | 1d Θ = ${f(th('CE', 24200, 1), 2)}/day.`,
        `23,800 PE (OTM): 7d Θ = ${f(th('PE', 23800, 7), 2)}/day | 1d Θ = ${f(th('PE', 23800, 1), 2)}/day.`,
        `A buyer of the ATM call loses about ${f(-th('CE', 24000, 1) * LOT)} rupees per lot on the last day if nothing else changes; a seller of it earns that, in exchange for gamma risk.`,
      ],
      takeaway: 'The ATM option’s daily decay (as a share of its premium) is far larger on the last day than a week earlier. Theta in rupees is largest where the time value is.',
    },
    {
      title: 'How decay accelerates (ATM 24,000 CE, spot and IV unchanged)',
      given: [MODEL],
      steps: [
        ...ladderDays.map((d) => `${d} days to expiry: premium ${f(g('CE', 24000, d).price, 1)}, Θ ${f(th('CE', 24000, d), 2)}/day (${f((-th('CE', 24000, d) / g('CE', 24000, d).price) * 100, 1)}% of premium per day).`),
        'Premium falls with the square root of time, not linearly; the percentage lost per day rises as expiry nears.',
      ],
      takeaway: 'A buyer who is wrong about timing pays more per day the closer expiry is. A seller’s daily income is higher near expiry, but so is the risk of a jump.',
    },
    {
      title: 'Weekend effect in a calendar-time model',
      given: [MODEL, 'Friday close with 5 days to expiry; Monday with 2 days; spot and IV unchanged'],
      steps: [
        `Friday premium (5d): ${f(fri.price, 1)}. Monday premium (2d): ${f(mon.price, 1)}.`,
        `Model decay over the weekend = ${f(fri.price - mon.price, 1)} points (${f((fri.price - mon.price) * LOT)} rupees per lot).`,
        'In practice, many traders mark IV down on Friday, so part of this decay may already be in the Friday price. The result on Monday depends on the actual spot, IV and bid-ask.',
      ],
      takeaway: 'Do not assume a fixed weekend premium drop; compare the model with what the market actually printed.',
    },
  ],
  scenarios: {
    bullish: { text: 'A long call needs a rally big enough to outrun daily decay: with 1 day to go, the ATM call loses about 37 points a day in the model, so a slow grind up can still lose money.' },
    bearish: { text: 'A long put suffers the same decay if the fall is slow; a sharp, early fall is the case where the buyer gains faster than theta can erode.' },
    sideways: { text: 'Both buyers lose time value and sellers collect it. The sideways case is the best case for theta sellers only until a sudden move arrives.' },
  },
  pitfalls: [
    'Treating theta as guaranteed income. It is the compensation for short gamma and short vega risk; a single gap can exceed weeks of decay.',
    'Assuming linear decay. Decay accelerates; a 28-day option does not lose the same rupees per day as a 1-day option.',
    'Comparing theta across strikes in rupees without looking at percentage of premium and at the delta-adjusted risk.',
    'Applying the weekend model blindly: actual IV adjustments around weekends and holidays vary.',
    'Ignoring that theta is a model sensitivity at constant spot and IV; reality moves both.',
  ],
  practice: [
    { q: 'An ATM option has Θ -15 per day. Lot 65, you are long 2 lots. What is your daily theta in rupees?', a: '-15 × 65 × 2 = -1,950 rupees per day, other things equal.' },
    { q: 'You are short 1 lot of an option with Θ -20. What is your daily theta?', a: 'Short flips the sign: +20 × 65 = +1,300 rupees per day (model), with gamma and vega risk attached.' },
    { q: 'Why does a far OTM option have small rupee theta but can still lose all of its value?', a: 'There is little premium to lose per day, but if the index does not approach the strike, the whole premium decays to zero by expiry.' },
    { q: 'Using the model premiums 200.9 (7d) and 72.3 (1d) for the ATM call, how much of the premium is lost over the last 6 days if nothing else changes?', a: '200.9 - 72.3 = 128.6 points, about 64% of the 7-day premium (model values).' },
  ],
  assignment:
    'In the Greeks lab, set spot 24,000, IV 14%. Tabulate ATM premium and theta at 28, 14, 7, 3 and 1 days. Plot or sketch premium vs days left and state where the curve is steepest. Add a note on the weekend: record Friday and Monday values if you have access to real data, and explain any difference from the model.',
  lab: { to: '/labs/greeks', label: 'Open the Greeks lab' },
}

// ---------- 6.5 Vega ----------
const vg = (type: 'CE' | 'PE', K: number, d: number) => g(type, K, d).vega
const v7 = g('CE', 24000, 7)
const v7hi = D1('CE', 24000, 7, 0.16)
const crushFrom = D1('CE', 24000, 7, 0.18)
const crushTo = D1('CE', 24000, 7, 0.14)
const v1 = g('CE', 24000, 1)
const v1hi = D1('CE', 24000, 1, 0.16)

export const lesson65: Lesson = {
  moduleId: '6.5',
  summary:
    'Vega measures how much an option’s premium changes for a one-point change in implied volatility. Buyers are long vega and benefit from volatility expansion; sellers are short vega and benefit from contraction. Vega is largest for ATM options with more time left and shrinks quickly toward expiry, so volatility risk is mainly a feature of longer-dated positions.',
  objectives: [
    'Define vega and its sign for long and short options.',
    'Compute vega for ATM and OTM options at 7 days and 1 day and convert to rupees per lot.',
    'Explain why vega is larger for ATM and longer-dated options.',
    'Estimate the premium change when IV expands or contracts, and recognise the IV-crush pattern around events.',
    'Describe practical vega risk management for buyers and sellers.',
  ],
  concepts: [
    { term: 'Vega (ν)', definition: 'Change in option premium per 1 percentage point change in implied volatility, holding spot and time constant. Calls and puts at the same strike and expiry have the same vega.' },
    { term: 'Implied volatility (IV)', definition: 'The volatility implied by the option’s price. It is expected movement, not direction. India VIX is a summary of near-month IV on Nifty options.' },
    { term: 'Positive vega (buyers)', definition: 'Long options gain when IV rises and lose when IV falls, regardless of the direction of the index.' },
    { term: 'Negative vega (sellers)', definition: 'Short options lose when IV rises and gain when IV falls. A spot move can be small and still produce a loss if IV jumps.' },
    { term: 'ATM vs OTM vega', definition: 'Vega is highest at the money. Far OTM and deep ITM options have lower vega, because IV matters less when the outcome is nearly decided.' },
    { term: 'Vega near expiry', definition: 'Vega shrinks as time falls (it scales with √T), so a 1-day option barely reacts to IV changes compared with a 7-day option.' },
    { term: 'Volatility expansion and contraction', definition: 'Expansion (IV rising, often on fear or before events) raises premiums; contraction (IV falling, often after events pass) deflates them, the "IV crush".' },
  ],
  formulas: [
    { label: 'Black–Scholes vega (call and put)', tex: String.raw`\nu=S\,\varphi(d_1)\sqrt{T}`, note: 'Per 1.00 change in σ; divide by 100 for a 1-percentage-point change, as used on this site.' },
    { label: 'Premium change from IV', tex: String.raw`\Delta V\approx \nu\cdot\Delta\sigma_{\text{pts}}`, note: 'Δσ in percentage points; the estimate drifts for large changes in IV.' },
    { label: 'Vega per lot', tex: String.raw`\text{Vega per lot}=\nu\times\text{lot size}` },
  ],
  examples: [
    {
      title: 'Vega across strikes and time (model values)',
      given: [MODEL, `Lot size ${LOT}`],
      steps: [
        `24,000 CE/PE (ATM): 7d ν = ${f(vg('CE', 24000, 7), 2)} (${f(vg('CE', 24000, 7) * LOT)} per lot per vol point) | 1d ν = ${f(vg('CE', 24000, 1), 2)} (${f(vg('CE', 24000, 1) * LOT)} per lot).`,
        `24,200 CE (OTM): 7d ν = ${f(vg('CE', 24200, 7), 2)} | 1d ν = ${f(vg('CE', 24200, 1), 2)}.`,
        `23,800 PE (OTM): 7d ν = ${f(vg('PE', 23800, 7), 2)} | 1d ν = ${f(vg('PE', 23800, 1), 2)}.`,
        `Vega of the 1-day ATM option is ${f((vg('CE', 24000, 1) / vg('CE', 24000, 7)) * 100)}% of the 7-day value.`,
      ],
      takeaway: 'Volatility risk is concentrated in ATM, longer-dated options. A one-day option mainly trades gamma and theta, not vega.',
    },
    {
      title: 'IV expansion: +2 points on a 7-day ATM call',
      given: [MODEL, `24,000 CE, 7 days: premium ${f(v7.price, 2)} at 14% IV, ν = ${f(v7.vega, 2)}`, 'IV rises from 14% to 16%; spot and time unchanged'],
      steps: [
        `Vega estimate = ${f(v7.vega, 2)} × 2 = ${f(v7.vega * 2, 2)} points.`,
        `Model reprice at 16%: ${f(v7hi.price, 2)}, an actual gain of ${f(v7hi.price - v7.price, 2)} points (${f((v7hi.price - v7.price) * LOT)} per lot).`,
        `For the 1-day option the same IV rise adds only ${f(v1hi.price - v1.price, 2)} points (${f((v1hi.price - v1.price) * LOT)} per lot).`,
        'A seller of the 7-day option loses that amount on the IV rise even if the index has not moved.',
      ],
      takeaway: 'IV changes alone can move premium by more than a normal day’s theta, which is why vega risk deserves its own limit.',
    },
    {
      title: 'IV crush after an event',
      given: [MODEL, 'Before an event IV = 18%; after it IV = 14%; Nifty unchanged at 24,000; 7 days left (time passage ignored)'],
      steps: [
        `Premium before: ${f(crushFrom.price, 2)}; after: ${f(crushTo.price, 2)}.`,
        `Loss for a buyer = ${f(crushFrom.price - crushTo.price, 2)} points = ${f((crushFrom.price - crushTo.price) * LOT)} rupees per lot, even though spot did not move.`,
        'A buyer who expected a move must also be right about its size relative to what the option already priced in.',
      ],
      takeaway: 'Buying options before known events often means paying a high IV. The index must move by more than the option implied for the buyer to profit.',
    },
  ],
  scenarios: {
    bullish: { text: 'A rally with falling IV can leave a long call flat or lower: the delta gain is offset by vega loss. A rally with rising IV (a fast, fearful move) benefits long options on two counts.' },
    bearish: { text: 'A sell-off usually lifts IV, which helps long puts on delta and vega, and hurts short puts and short strangles on both. This tendency is not guaranteed in every market.' },
    sideways: { text: 'A quiet market tends to see IV drift down; short-vega sellers collect from both theta and falling IV, but a sudden IV jump can reverse weeks of gains.' },
  },
  pitfalls: [
    'Confusing IV with direction. A high IV means large expected movement in either direction, not a bearish or bullish view.',
    'Buying options only because "IV is low". Low IV can stay low; compare IV with the move you expect and with the premium you pay.',
    'Ignoring that vega changes as spot and time change; the estimate ν·Δσ is local.',
    'Assuming all strikes share one IV. Skew means different strikes can have different IV, and they may move by different amounts.',
    'Selling options into an event and expecting only theta; a vega loss from IV rising can swamp theta.',
  ],
  practice: [
    { q: 'An ATM option has ν 13.2 and lot size 65. Compute the rupee gain per lot if IV rises 1.5 points.', a: '13.2 × 1.5 = 19.8 points; 19.8 × 65 = 1,287 rupees per lot (estimate).' },
    { q: 'Who benefits when IV rises: a short strangle or a long straddle? Why?', a: 'The long straddle. Both of its legs are long vega, so premium rises; a short strangle is short vega and loses on an IV rise, all else equal.' },
    { q: 'Why does a 1-day option react less to an IV change than a 7-day option?', a: 'Vega scales with √T; with less time, volatility has less room to matter. Model ν: 5.01 at 1 day vs 13.22 at 7 days (ATM).' },
    { q: 'A trader buys a call ahead of results and Nifty rises 30 points, but IV falls 3 points. Net outcome?', a: 'Delta gain ≈ 0.5 × 30 = 15 points, vega loss ≈ 13 × 3 = about 39 points: a net loss of about 24 points, before theta. The IV drop outweighed the rise.' },
  ],
  assignment:
    'In the Greeks lab, hold spot and time fixed and move IV from 12% to 20% in 2-point steps for an ATM call at 7 days and 1 day. Tabulate premium and the change per step. Write one paragraph on how you would size and hedge a short-vega position ahead of a known event.',
  lab: { to: '/labs/greeks', label: 'Open the Greeks lab' },
}
