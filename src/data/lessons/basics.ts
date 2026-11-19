import type { Lesson } from '../lessonTypes'
import { LOT, SPOT, f, g, sg, impliedVol, RATE } from './util'

// ---------- 3.4 Four Core Option Positions ----------
const K = 24000
const P = 150
const spots = [23500, 23700, 23850, 24000, 24150, 24300, 24500]
const buyCE = (s: number) => Math.max(s - K, 0) - P
const buyPE = (s: number) => Math.max(K - s, 0) - P
const row = (fn: (s: number) => number) => spots.map((s) => `${f(s)}: ${sg(fn(s))}`).join(' | ')

export const lesson34: Lesson = {
  moduleId: '3.4',
  summary:
    'Every option strategy is built from four building blocks: buy a call, sell a call, buy a put, sell a put. Buyers pay a premium and risk only that premium; sellers collect the premium and take on obligations whose risk can be very large. Knowing each payoff at expiry, and why a participant would choose it, is the base for everything that follows.',
  objectives: [
    'State the market outlook, maximum profit, maximum loss and breakeven for each of Buy CE, Sell CE, Buy PE and Sell PE.',
    'Compute the expiry payoff of any of the four positions for a given strike, premium and final index level.',
    'Explain why option buyers and sellers have mirror-image payoffs (one side’s gain is the other side’s loss, before costs).',
    'Describe what happens to each position when the underlying moves against it and as expiry approaches.',
    'Convert a per-unit payoff into a per-lot rupee figure using the lot size (65 here; check the current NSE contract specification).',
  ],
  concepts: [
    { term: 'Long call (Buy CE)', definition: 'You pay a premium for the right to buy the index at the strike. Profit grows as the index rises above strike + premium; the most you can lose is the premium paid.' },
    { term: 'Short call (Sell CE)', definition: 'You receive a premium and take the obligation to pay out if the index finishes above the strike. Profit is capped at the premium; loss grows without a ceiling as the index rises.' },
    { term: 'Long put (Buy PE)', definition: 'You pay a premium for the right to sell at the strike. It gains as the index falls below strike - premium; the most you can lose is the premium.' },
    { term: 'Short put (Sell PE)', definition: 'You receive a premium and take the obligation to buy at the strike. Profit is capped at the premium; loss is large (the index can fall to zero at most) and grows as the index falls.' },
    { term: 'Breakeven', definition: 'The index level at expiry where the position’s profit is exactly zero: strike + premium for a call, strike - premium for a put (for both buyer and seller).' },
    { term: 'Payoff at expiry', definition: 'Profit or loss per unit when the option is held to expiry, ignoring brokerage, taxes and margin cost: intrinsic value at expiry minus premium paid (buyer) or the reverse (seller).' },
    { term: 'Zero-sum (before costs)', definition: 'For each option contract, the buyer’s payoff plus the seller’s payoff is zero; costs and taxes make the pair slightly negative overall.' },
  ],
  formulas: [
    { label: 'Long call payoff per unit', tex: String.raw`\max(S_T - K,\,0) - \text{Premium}`, note: 'Breakeven at S_T = K + premium.' },
    { label: 'Long put payoff per unit', tex: String.raw`\max(K - S_T,\,0) - \text{Premium}`, note: 'Breakeven at S_T = K - premium.' },
    { label: 'Short positions', tex: String.raw`\text{Payoff}_{\text{short}} = -\,\text{Payoff}_{\text{long}}`, note: 'The seller’s payoff is the exact mirror of the buyer’s.' },
    { label: 'Per-lot rupee P&L', tex: String.raw`\text{P\&L}_{\text{lot}} = \text{Payoff per unit} \times \text{Lot size}` },
  ],
  examples: [
    {
      title: 'Expiry payoff table: strike 24,000, premium 150 (illustrative)',
      given: [`Strike K = ${f(K)} for both a call and a put`, `Premium paid or received = ${P} points on each`, `Lot size = ${LOT} (check the current NSE contract specification)`, `Final index levels at expiry S_T: ${spots.map(f).join(', ')}`],
      steps: [
        `Buy CE payoff per unit  -> ${row(buyCE)}`,
        `Sell CE payoff per unit -> ${row((s) => -buyCE(s))}`,
        `Buy PE payoff per unit  -> ${row(buyPE)}`,
        `Sell PE payoff per unit -> ${row((s) => -buyPE(s))}`,
        `Breakevens: call side ${f(K + P)}, put side ${f(K - P)}.`,
        `Buy CE: max loss = ${P} x ${LOT} = ${f(P * LOT)} per lot (any S_T at or below ${f(K)}); max profit unlimited.`,
        `Sell CE: max profit = ${f(P * LOT)} per lot; max loss unlimited. At S_T = 24,500 the loss is ${f((24500 - K - P) * LOT)} per lot.`,
        `Buy PE: max loss = ${f(P * LOT)} per lot; max profit occurs if the index fell to 0: (${f(K - P)}) x ${LOT} = ${f((K - P) * LOT)} (theoretical bound).`,
        `Sell PE: max profit = ${f(P * LOT)} per lot; max loss if the index fell to 0 = ${f((K - P) * LOT)} per lot. At S_T = 23,500 the loss is ${f((K - P - 23500) * LOT)}.`,
      ],
      takeaway:
        'A buyer’s loss is capped at the premium; a seller’s profit is capped at the premium. Sellers win often in small amounts but carry the tail risk, which is why they need margin and a risk plan.',
    },
    {
      title: 'Same premium, very different risk per lot',
      given: [`Premium = ${P}`, `Lot = ${LOT}`],
      steps: [
        `Buyer’s worst case: ${f(P * LOT)}. Seller’s best case: ${f(P * LOT)}.`,
        `If Nifty finishes 500 points past the breakeven (call side: ${f(K + P + 500)}), the buyer earns ${f(500 * LOT)} and the seller loses ${f(500 * LOT)}.`,
        `Scaling: each additional 100 points beyond breakeven costs the seller ${f(100 * LOT)} per lot.`,
      ],
      takeaway: 'Payoff asymmetry is the heart of option risk: a limited gain is paired with an open-ended loss on the short side, so sellers must size and hedge before they trade.',
    },
  ],
  scenarios: {
    bullish: { text: 'Buy CE and Sell PE gain from a rise; Buy CE has capped risk (the premium), while Sell PE earns only the premium but can lose heavily if the rise reverses into a fall.' },
    bearish: { text: 'Buy PE and Sell CE gain from a fall; Sell CE is exposed to a sharp rally, which is the worst case for it, so a stop-loss or a hedge is essential.' },
    sideways: { text: 'Sell CE and Sell PE keep the premium if the index stays inside the breakevens (here 23,850 to 24,150); Buy CE and Buy PE slowly lose value to time decay.' },
  },
  pitfalls: [
    'Thinking “sellers always win because most options expire worthless”. The frequent small gains can be erased by one large move; writers do not always win.',
    'Quoting the maximum loss of a short put as unlimited. It is large but bounded (the index cannot go below zero); a short call’s loss is theoretically unlimited.',
    'Ignoring breakeven: a long call is not profitable just because the index is above the strike, it must be above strike + premium at expiry.',
    'Using the payoff diagram before expiry. The expiry payoff is a floor-and-cap shape; before expiry the P&L is a smooth curve that depends on time and volatility.',
    'Forgetting costs, taxes, slippage and margin blocked for short positions.',
  ],
  practice: [
    { q: 'You buy a 24,000 CE at 120. Find breakeven, maximum loss per lot (65) and the P&L per lot if Nifty expires at 24,300.', a: `Breakeven = 24,000 + 120 = 24,120. Max loss = 120 x 65 = ${f(120 * 65)}. At 24,300: intrinsic = 300, payoff = 300 - 120 = 180 per unit; 180 x 65 = ${f(180 * 65)}.` },
    { q: 'You sell a 24,000 PE at 150. Nifty expires at 23,700. What is the P&L per lot?', a: `Intrinsic at expiry = 24,000 - 23,700 = 300. The seller’s payoff = 150 - 300 = -150 per unit. -150 x 65 = ${sg(-150 * 65)} per lot. Breakeven was 23,850, and expiry is 150 points beyond it.` },
    { q: 'Why can a short call and a long call at the same strike and premium never both profit?', a: 'Their payoffs are exact mirrors: payoff_short = -payoff_long at every expiry level. Where one is positive the other is negative by the same amount (before costs).' },
    { q: 'Which of the four positions has a theoretically unlimited maximum loss, and which has an unlimited maximum profit?', a: 'Sell CE has unlimited loss (no upper bound on the index). Buy CE has unlimited profit. Buy PE and Sell PE are bounded by the index reaching zero.' },
  ],
  assignment:
    'In a spreadsheet, build the four payoff columns for strikes 23,900 and 24,100 using the premiums from the Greeks lab. For each position write one sentence for each curriculum prompt: why the participant enters, what they expect, when they book profit, when they exit at a loss, what happens if the index moves against them, and what happens near expiry.',
  lab: { to: '/strategies', label: 'Open the strategy payoff builder' },
}

// ---------- 4.4 Option Premium Calculation ----------
const D = 7
const ceRows = [23800, 24000, 24200].map((k) => {
  const r = g('CE', k, D)
  const iv = Math.max(SPOT - k, 0)
  return { k, p: r.price, iv, tv: r.price - iv }
})
const peRows = [23800, 24000, 24200].map((k) => {
  const r = g('PE', k, D)
  const iv = Math.max(k - SPOT, 0)
  return { k, p: r.price, iv, tv: r.price - iv }
})
const fmtRow = (type: string, r: { k: number; p: number; iv: number; tv: number }, tag: string) =>
  `${type} ${f(r.k)} (${tag}): premium ${f(r.p, 1)} = intrinsic ${f(r.iv, 1)} + time value ${f(r.tv, 1)}`
const model = g('CE', 24000, D).price
const traded = Math.round(model) + 10
const impl = impliedVol('CE', traded, SPOT, 24000, D / 365, RATE)
const far = g('CE', 24000, 28)
const farTv = far.price

export const lesson44: Lesson = {
  moduleId: '4.4',
  summary:
    'An option’s premium is the sum of two things: the value you could capture today by exercising (intrinsic value) and the extra you pay for the chance that things move further before expiry (time value). Understanding the split explains why ATM options carry the most time value, why OTM options are cheap but can expire worthless, and why a traded price differs from a model price.',
  objectives: [
    'Split any call or put premium into intrinsic value and time value.',
    'Classify strikes as ITM, ATM or OTM for calls and puts, and predict which has the most time value.',
    'Compute the premium of a call and a put with the Black–Scholes model for given spot, strike, days, IV and rate.',
    'Explain why the market premium can differ from the theoretical (model) premium, and how implied volatility bridges the two.',
    'Predict how time value shrinks as expiry approaches.',
  ],
  concepts: [
    { term: 'Intrinsic value', definition: 'What the option would be worth if exercised right now: max(S - K, 0) for a call and max(K - S, 0) for a put. Never negative.' },
    { term: 'Time value (extrinsic value)', definition: 'Premium minus intrinsic value. It pays for the chance of a favourable move and reflects time left, volatility and interest; it reaches zero at expiry.' },
    { term: 'ITM / ATM / OTM', definition: 'In the money: positive intrinsic value. At the money: strike nearest the spot. Out of the money: zero intrinsic value (all premium is time value).' },
    { term: 'Theoretical premium', definition: 'The price a model such as Black–Scholes gives from spot, strike, time, volatility and rate. It is a reference, not a quote.' },
    { term: 'Traded premium', definition: 'The price actually printed on the exchange, shaped by supply and demand, bid-ask spread, skew and event expectations.' },
    { term: 'Implied volatility (IV)', definition: 'The volatility that, when put into the model, reproduces the traded premium. It is how the market’s pricing is expressed in model terms.' },
  ],
  formulas: [
    { label: 'Premium decomposition', tex: String.raw`\text{Premium} = \text{Intrinsic Value} + \text{Time Value}` },
    { label: 'Call and put intrinsic value', tex: String.raw`\text{IV}_{CE} = \max(S-K,0),\qquad \text{IV}_{PE} = \max(K-S,0)` },
    { label: 'Black–Scholes call price', tex: String.raw`C = S\,N(d_1) - K e^{-rT} N(d_2)`, note: 'd1 = [ln(S/K) + (r + sigma^2/2)T] / (sigma sqrt T), d2 = d1 - sigma sqrt T. Index options are European, so the model is a fair educational reference.' },
    { label: 'Black–Scholes put price', tex: String.raw`P = K e^{-rT} N(-d_2) - S\,N(-d_1)` },
  ],
  examples: [
    {
      title: 'Premium split for a 7-day option (model values)',
      given: [`Nifty spot = ${f(SPOT)}`, `Days to expiry = ${D}`, 'India VIX / IV = 14%', 'Risk-free rate = 6.5%', 'Model values, rounded to one decimal'],
      steps: [
        fmtRow('CE', ceRows[0], 'ITM'),
        fmtRow('CE', ceRows[1], 'ATM'),
        fmtRow('CE', ceRows[2], 'OTM'),
        fmtRow('PE', peRows[0], 'OTM'),
        fmtRow('PE', peRows[1], 'ATM'),
        fmtRow('PE', peRows[2], 'ITM'),
        `The ATM call carries the highest time value (${f(ceRows[1].tv, 1)}); the ITM call’s time value (${f(ceRows[0].tv, 1)}) is smaller despite a higher total premium.`,
      ],
      takeaway: 'Time value peaks at the money, where the outcome is least certain. ITM options are mostly intrinsic; OTM options are purely time value and can fall to zero.',
    },
    {
      title: 'Theoretical vs traded premium and implied volatility',
      given: [`Model price of 24,000 CE at 14% IV, 7 days = ${f(model, 1)}`, `Suppose the market is quoting ${traded} (illustrative)`],
      steps: [
        `Difference = ${traded} - ${f(model, 1)} = ${f(traded - model, 1)} points.`,
        `Solve for the IV that reproduces ${traded}: implied volatility ≈ ${f(impl * 100, 2)}%.`,
        `So the market is pricing a volatility of about ${f((impl - 0.14) * 100, 2)} points above the 14% input; this is what “richer than the model” means.`,
        `Time value shrinks with time: the same call with 28 days left has a model premium of ${f(farTv, 1)}, against ${f(model, 1)} with 7 days.`,
      ],
      takeaway: 'Model price is a yardstick. IV is the language that turns a traded premium back into a model input, so comparing IV across strikes and days is more meaningful than comparing raw premiums.',
    },
  ],
  scenarios: {
    bullish: { text: 'If Nifty rallies, a call’s intrinsic value rises point for point once ITM, while its time value is largest around the strike; an OTM call needs the move to be large enough to cross the strike just to gain any intrinsic value.' },
    bearish: { text: 'If Nifty falls, put intrinsic value builds while call premiums shrink toward their time-value floor; a long call loses both intrinsic value and time value in a fall.' },
    sideways: { text: 'If Nifty drifts, intrinsic value barely changes and time value erodes; ATM options, with the most time value, give up the most premium in absolute terms.' },
  },
  pitfalls: [
    'Calling an option “cheap” because its price is low. A low OTM premium is all time value and usually reflects a low probability, not a bargain.',
    'Treating the model price as the real price. Skew, event risk, bid-ask spread and demand move traded premiums away from Black–Scholes values.',
    'Assuming time value is constant. It falls with time and rises with volatility, so the same strike has a different premium tomorrow.',
    'Forgetting that deep ITM options trade close to intrinsic value with little time value left.',
  ],
  practice: [
    { q: 'Nifty is 24,000. A 23,800 CE trades at 235. Find its intrinsic value and time value.', a: 'Intrinsic = max(24,000 - 23,800, 0) = 200. Time value = 235 - 200 = 35.' },
    { q: 'Nifty is 24,000. A 24,200 PE trades at 245. Is it ITM or OTM? Split its premium.', a: 'A put is ITM when K > S; 24,200 > 24,000, so it is ITM. Intrinsic = 24,200 - 24,000 = 200; time value = 245 - 200 = 45.' },
    { q: 'A 24,300 CE (spot 24,000) trades at 18. What is its intrinsic value, and what is the minimum Nifty level at expiry for a buyer to break even?', a: 'It is OTM so intrinsic = 0 and the whole 18 is time value. Breakeven at expiry = 24,300 + 18 = 24,318.' },
    { q: 'Why does an ATM option lose more rupees of time value per day than a far OTM option with the same expiry?', a: 'ATM options hold the largest time value, so they have the most to lose; far OTM options have little premium to decay. In percentage terms, however, OTM options can lose most of their value.' },
  ],
  assignment:
    'Using the Greeks lab, record the call and put premium for five strikes (two ITM, ATM, two OTM) at 7 days and at 1 day to expiry. For each, write intrinsic value, time value and a short note on how the time-value pattern changes between the two expiries. Then pick one strike and find the IV that reproduces a premium 10 points above the model price.',
  lab: { to: '/labs/greeks', label: 'Open the Greeks lab' },
}
