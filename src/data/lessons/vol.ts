import type { Lesson } from '../lessonTypes'
import { IV, LOT, SPOT, f, gm, sg } from './util'

const MODEL = 'Model values: Black–Scholes, Nifty spot 24,000, r 6.5%, calendar-time convention. Real premiums differ.'

// ---------- 9.2 India VIX ----------
const em = (vix: number, days: number, S = SPOT) => S * (vix / 100) * Math.sqrt(days / 365)
const emT = (vix: number, tdays: number, S = SPOT) => S * (vix / 100) * Math.sqrt(tdays / 252)

export const lesson92: Lesson = {
  moduleId: '9.2',
  summary:
    'India VIX is NSE’s index of the market’s expected volatility of Nifty over the next 30 calendar days, derived from near-month and next-month Nifty option prices and quoted as an annualised percentage. It measures how large a move the option market is pricing, not which way the index will go. Converting a VIX level into an expected one-standard-deviation range is a core skill, as is knowing what the range cannot tell you.',
  objectives: [
    'Define India VIX and say what it is derived from.',
    'Explain why VIX is called the fear gauge and why that does not mean it forecasts direction.',
    'Convert a VIX level into an expected daily and weekly Nifty range using σ√t.',
    'Interpret low, moderate and high VIX levels without treating thresholds as rules.',
    'Describe the usual negative relationship between VIX and Nifty and its exceptions.',
    'State what VIX cannot tell you.',
  ],
  concepts: [
    { term: 'India VIX', definition: 'NSE’s volatility index computed from the order book of near and next-month Nifty options. It expresses the annualised volatility the options market is pricing for roughly the next 30 days.' },
    { term: 'Annualised volatility', definition: 'VIX is quoted as a yearly figure. A VIX of 14 means an expected one-standard-deviation move of about 14% over a year, which is scaled down to shorter horizons by √t.' },
    { term: 'Fear gauge', definition: 'VIX tends to rise when traders pay more for protection, usually in falling or uncertain markets. The name describes demand for options, not a prediction of falls.' },
    { term: 'Relation to Nifty', definition: 'The relationship is often negative: VIX tends to rise in sharp falls and ease in calm rallies. It is not a rule. VIX can rise before events while the index climbs, and fall while the index falls slowly.' },
    { term: 'Expected range', definition: 'One standard deviation covers about 68% of outcomes under a normal assumption. Actual returns have fatter tails, so moves beyond the range are more common than the model suggests.' },
    { term: 'Historical and intraday VIX', definition: 'VIX history lets you place today’s level in context (percentile versus recent months). Intraday VIX moves with option prices; spikes around events often mean-revert after the event.' },
    { term: 'What VIX is not', definition: 'VIX is not a forecast of direction, timing or realised volatility. It is a price of options, and it can overstate or understate what then happens.' },
  ],
  formulas: [
    { label: 'Expected move over t days (calendar)', tex: String.raw`\text{Move}_{1\sigma}\approx S\cdot\frac{\text{VIX}}{100}\cdot\sqrt{\frac{t}{365}}`, note: 'Some practitioners use 252 trading days instead of 365; state which you use.' },
    { label: 'Daily move from VIX (rule of thumb)', tex: String.raw`\text{Daily}\approx \frac{\text{VIX}}{\sqrt{365}}\ \text{or}\ \frac{\text{VIX}}{\sqrt{252}}\ \text{percent}` },
  ],
  examples: [
    {
      title: 'Expected daily and weekly range at VIX 14',
      given: ['Nifty spot 24,000, India VIX 14 (illustrative level)'],
      steps: [
        `Daily (1 calendar day): 24,000 × 0.14 × √(1/365) = ${f(em(14, 1), 0)} points (${f((em(14, 1) / SPOT) * 100, 2)}%).`,
        `Daily (trading-day basis, 252): 24,000 × 0.14 × √(1/252) = ${f(emT(14, 1), 0)} points (${f((emT(14, 1) / SPOT) * 100, 2)}%).`,
        `Weekly (7 calendar days): 24,000 × 0.14 × √(7/365) = ${f(em(14, 7), 0)} points, i.e. roughly 23,535 to 24,465.`,
        `Weekly (5 trading days, 252 basis): ${f(emT(14, 5), 0)} points.`,
        `Compared with VIX 16: daily ${f(em(16, 1), 0)} points, weekly ${f(em(16, 7), 0)} points. A 2-point VIX change widens the weekly range by ${f(em(16, 7) - em(14, 7), 0)} points.`,
      ],
      takeaway: 'The same VIX produces slightly different ranges on different day-count bases, so always state the convention. These are one-standard-deviation ranges, not limits.',
    },
    {
      title: 'What a 2-sigma and a tail move mean',
      given: ['Spot 24,000, VIX 14, 1 trading day (252 basis): 1σ ≈ ' + f(emT(14, 1), 0) + ' points'],
      steps: [
        `2σ ≈ ${f(2 * emT(14, 1), 0)} points. Under a normal model a move beyond 2σ in either direction happens about 4.6% of days (roughly 1 day in 22).`,
        'Real index returns have fatter tails and clustering, so moves outside the range happen more often than that during stressed periods.',
        'Hence VIX-based ranges are best treated as a reference for sizing and strike selection, not as a promise of where the index will close.',
      ],
      takeaway: 'Use VIX to scale expectations and risk, never to forecast direction.',
    },
  ],
  scenarios: {
    bullish: { text: 'Nifty rises steadily while VIX drifts lower. The option market is pricing less risk, and sellers are paid less; buyers of options face cheaper premiums but also smaller expected movement.' },
    bearish: { text: 'Nifty falls sharply and VIX jumps. Premiums rise for both calls and puts, which hurts short-vega positions and can make hedges costly; the spike often fades once the move stabilises.' },
    sideways: { text: 'Nifty stays in a narrow range and VIX decays. Time decay and falling IV together reward option sellers in this simulation, until a break out of the range reverses the trade.' },
  },
  pitfalls: [
    'Reading a high VIX as "market will fall" or a low VIX as "market will rise". VIX measures expected size of moves, not direction.',
    'Using fixed thresholds ("below 12 is cheap, above 20 is expensive") without context of recent history.',
    'Forgetting the scaling: VIX 14 is the annual figure, not the expected daily move.',
    'Treating the 1σ range as a boundary. Roughly one day in three falls outside it even in a normal model.',
    'Assuming VIX equals realised volatility. Realised can be lower or higher.',
  ],
  practice: [
    { q: 'VIX is 16 and Nifty is 24,000. Estimate the 1σ move over 5 trading days (252 basis).', a: `24,000 × 0.16 × √(5/252) = ${f(emT(16, 5), 0)} points.` },
    { q: 'What is the approximate 1-day 1σ move in percent at VIX 14 (365 basis)?', a: `14 ÷ √365 = ${f(14 / Math.sqrt(365), 2)}%.` },
    { q: 'VIX jumps from 13 to 19 in one session. Can you conclude the index will fall?', a: 'No. VIX shows that options are pricing larger moves, not their direction. A jump often accompanies falls, but also event risk and hedging demand.' },
    { q: 'Why are moves outside the 1σ range not surprising?', a: 'About 32% of outcomes fall outside 1σ even under a normal model, and real returns have fatter tails.' },
  ],
  assignment:
    'Download 60 days of India VIX closes and Nifty closes. For each day, compute VIX ÷ √252 and compare it with the absolute Nifty daily return. Report how often the absolute return exceeded the VIX-implied 1σ, and comment on whether it is near 32%.',
  lab: { to: '/labs/market-structure', label: 'Open the Market Structure lab' },
}

// ---------- 19.2 Expiry-day Greeks ----------
const A90 = gm('CE', 24000, 90)
const A30 = gm('CE', 24000, 30)
const A10 = gm('CE', 24000, 10)
const O90 = gm('CE', 24100, 90)
const O30 = gm('CE', 24100, 30)
const O10 = gm('CE', 24100, 10)
const I10 = gm('CE', 23800, 10)
const up20_10 = gm('CE', 24000, 10, IV, SPOT + 20)
const dn20_10 = gm('CE', 24000, 10, IV, SPOT - 20)
const up20_90 = gm('CE', 24000, 90, IV, SPOT + 20)
const dn20_90 = gm('CE', 24000, 90, IV, SPOT - 20)
const s10 = A10.price + gm('PE', 24000, 10).price
const s90 = A90.price + gm('PE', 24000, 90).price
const vegaA90 = A90.vega
const vegaA10 = A10.vega
const hit10 = gm('CE', 24000, 10, IV + 0.02)

export const lesson192: Lesson = {
  moduleId: '19.2',
  summary:
    'On expiry day the Greeks change by orders of magnitude within hours. ATM gamma and theta accelerate as the close approaches, OTM gamma collapses unless the index moves toward the strike, and deep ITM options behave like the underlying. This lesson tracks those changes numerically at 90, 30 and 10 minutes to the close, and states what they mean for sellers and buyers.',
  objectives: [
    'Explain gamma acceleration and theta acceleration on expiry day.',
    'Compare ATM, OTM and deep ITM gamma and delta in the final hour.',
    'Quantify, using model numbers, how a 20-point move changes an ATM premium at 90 and 10 minutes.',
    'Describe gamma risk for sellers and for buyers, and the gamma–theta trade-off.',
    'Explain why vega matters less near close, and where IV can still matter.',
    'State the limits of the model at the very end of the session.',
  ],
  concepts: [
    { term: 'Gamma acceleration', definition: 'ATM gamma scales roughly with 1/√T, so as minutes remain fall it rises sharply. Delta can swing from about 0.1 to 0.9 on a small move through the strike.' },
    { term: 'Theta acceleration', definition: 'ATM time value decays roughly with √T, so the premium lost per minute is largest at the end. Theta quoted per day greatly understates the speed of decay in the last hour.' },
    { term: 'Delta changes', definition: 'Near expiry delta behaves like a switch: well above the strike it approaches 1, well below it approaches 0, and it flips quickly around the strike.' },
    { term: 'ATM gamma', definition: 'The largest of any strike and the main source of both opportunity and risk. The premium is small but moves in percentage terms very fast.' },
    { term: 'OTM gamma', definition: 'Collapses toward zero when the strike is out of reach in the remaining minutes. It becomes large only if the index moves close to the strike, which is why far-OTM options look "cheap" and mostly expire worthless.' },
    { term: 'Deep ITM gamma', definition: 'Close to zero; the option behaves like a futures position with delta close to 1. Gamma is not the concern there; execution and margin are.' },
    { term: 'Gamma risk for sellers', definition: 'Negative gamma means losses accelerate on a fast move through the strike. Losses can exceed the premium collected multiple times, and exits may be hard in a fast tape.' },
    { term: 'Gamma risk for buyers', definition: 'Positive gamma, but the buyer is paying the fastest theta. Without a move large enough to cover the decay, the premium goes to zero. A move in the right direction can multiply the premium.' },
    { term: 'Gamma–theta interaction', definition: 'Gamma gains and theta losses are two sides of the same trade. A long option profits when realised movement exceeds what the premium priced in; a short option profits when it does not.' },
    { term: 'Vega on expiry day', definition: 'Vega shrinks toward zero with time, so IV changes matter less for ATM premium in the last minutes, though IV spikes can still shift the premium of a rapidly moving strike.' },
  ],
  formulas: [
    { label: 'ATM gamma scaling', tex: String.raw`\Gamma_{ATM}\approx\frac{0.4}{S\,\sigma\sqrt{T}}`, note: 'Approximation at d1 ≈ 0 (0.4 ≈ φ(0)). Gamma rises as T falls.' },
    { label: 'ATM premium scaling', tex: String.raw`V_{ATM}\approx 0.4\,S\,\sigma\sqrt{T}`, note: 'At the money, time value falls like √T, so decay per minute is largest at the close.' },
    { label: 'Second-order premium change', tex: String.raw`\Delta V\approx\Delta\,\Delta S+\tfrac12\,\Gamma\,(\Delta S)^2+\Theta\,\Delta t` },
  ],
  examples: [
    {
      title: 'ATM and OTM Greeks at 90, 30 and 10 minutes to close',
      given: [MODEL, 'IV 14% held constant; 24,000 CE is ATM, 24,100 CE is 100 points OTM, 23,800 CE is 200 points ITM'],
      steps: [
        `24,000 CE: 90 min premium ${f(A90.price, 2)}, Δ ${f(A90.delta, 3)}, Γ ${f(A90.gamma, 5)}; 30 min premium ${f(A30.price, 2)}, Γ ${f(A30.gamma, 5)}; 10 min premium ${f(A10.price, 2)}, Γ ${f(A10.gamma, 5)}.`,
        `ATM gamma rises ${f(A10.gamma / A90.gamma, 1)}× from 90 to 10 minutes; ATM premium falls from ${f(A90.price, 2)} to ${f(A10.price, 2)} even if spot has not moved.`,
        `24,100 CE (OTM): Γ ${f(O90.gamma, 6)} at 90 min, ${f(O30.gamma, 6)} at 30 min, ${f(O10.gamma, 8)} at 10 min. Its premium falls from ${f(O90.price, 2)} to ${f(O30.price, 2)} to ${f(O10.price, 2)}.`,
        `23,800 CE (deep ITM) at 10 min: Δ ${f(I10.delta, 3)}, Γ ≈ ${f(I10.gamma, 6)}: it moves point-for-point with the index.`,
        `Interpretation: the ATM strike gets more sensitive each minute; the 100-point OTM strike has almost no gamma left at 10 minutes, so it needs a large move to matter.`,
      ],
      takeaway: 'Compare gamma at the same strike across time and across strikes at the same time. ATM gamma rises, OTM gamma falls away, ITM gamma is negligible.',
    },
    {
      title: 'What a 20-point move does to an ATM call',
      given: [MODEL, 'Spot 24,000; 24,000 CE; IV constant', 'Lot size 65 (check the current NSE contract specification)'],
      steps: [
        `At 90 min: premium ${f(A90.price, 2)} → up 20 points ${f(up20_90.price, 2)} (${sg(up20_90.price - A90.price, 2)}); down 20 points ${f(dn20_90.price, 2)} (${sg(dn20_90.price - A90.price, 2)}).`,
        `At 10 min: premium ${f(A10.price, 2)} → up 20 points ${f(up20_10.price, 2)} (${sg(up20_10.price - A10.price, 2)}); down 20 points ${f(dn20_10.price, 2)} (${sg(dn20_10.price - A10.price, 2)}).`,
        `In percentage terms, the 10-minute option gains ${f(((up20_10.price - A10.price) / A10.price) * 100, 0)}% on the 20-point rise, while the 90-minute option gains ${f(((up20_90.price - A90.price) / A90.price) * 100, 0)}%.`,
        `One lot (65): the 10-minute short call loses ${f((up20_10.price - A10.price) * LOT)} rupees on a 20-point rally, against ${f(A10.price * LOT)} rupees of maximum premium collected.`,
        `Straddle (CE+PE) at 90 min costs ${f(s90, 2)}; at 10 min it is ${f(s10, 2)}, so a spot unchanged for 80 minutes costs the buyer ${f(s90 - s10, 2)} points.`,
      ],
      takeaway: 'Small absolute premiums can move several hundred percent. The short seller’s loss per point is bounded only by the index movement, whereas the premium collected is small.',
    },
    {
      title: 'Vega and IV in the last minutes',
      given: [MODEL],
      steps: [
        `ATM vega at 90 min = ${f(vegaA90, 3)} per vol point; at 10 min = ${f(vegaA10, 3)}.`,
        `A 2-point IV rise at 10 minutes changes the ATM premium from ${f(A10.price, 2)} to ${f(hit10.price, 2)}, a gain of ${f(hit10.price - A10.price, 2)} points.`,
        'In practice IV near close is also affected by the pricing of the final move; quoted IV can move more than the model suggests because bid-ask spreads widen.',
      ],
      takeaway: 'Vega fades with time, but spreads and quote quality become the practical issue rather than IV changes.',
    },
  ],
  scenarios: {
    bullish: { text: 'A sharp move up through the strike in the last hour lifts the ATM call’s delta toward 1 and can multiply its premium. A short ATM call or a short straddle sees losses accelerate and may find exits poorly priced.' },
    bearish: { text: 'A sharp move down through the strike works symmetrically with puts: a long put gains quickly and a short put at that strike takes the loss, with delta moving toward -1.' },
    sideways: { text: 'If spot hovers around the strike, both ATM options lose time value rapidly. Sellers retain more of the premium, but a sudden move late in the session can remove it quickly; buyers see decay without any compensating move.' },
  },
  pitfalls: [
    'Quoting theta per day for the last hour. The rate in the last minutes is far larger than the daily number implies.',
    'Assuming OTM options are cheap tickets. Their gamma has almost vanished, and the move required is large relative to the remaining time.',
    'Treating model premiums as tradable prices. Spreads, liquidity and the last-minute auction behaviour differ from the model.',
    'Ignoring the tail: a seller’s loss on a fast move can exceed the premium by a large multiple.',
    'Forgetting the lot size and exchange-specific changes in contract specifications: check the current NSE contract specification.',
  ],
  practice: [
    { q: `In the model, ATM gamma at 90 min is ${f(A90.gamma, 5)} and at 10 min ${f(A10.gamma, 5)}. By roughly what factor did it rise, and what does √9 = 3 predict?`, a: `Actual ratio ≈ ${f(A10.gamma / A90.gamma, 1)}×. Since Γ ∝ 1/√T, going from 90 to 10 minutes (T falls by 9) predicts about 3×.` },
    { q: 'Why does a far-OTM option at 10 minutes to close have almost zero gamma?', a: 'The index would need to travel a large distance in minutes to reach the strike, so delta barely changes for any realistic move. Gamma is concentrated where the strike is within the plausible range.' },
    { q: 'A seller has short 24,000 CE and Nifty is 24,000 with 10 minutes left. Nifty rises 20 points. Using the figures here, what is the loss per lot at the model price?', a: `${f(up20_10.price, 2)} − ${f(A10.price, 2)} = ${f(up20_10.price - A10.price, 2)} points × 65 = ${f((up20_10.price - A10.price) * LOT)} rupees.` },
    { q: 'Why can a buyer lose even if the market moves a little in their favour?', a: 'Theta runs at its fastest. The move must exceed the decay of the remaining time value; if the net is smaller than the premium paid, the position loses.' },
  ],
  assignment:
    'In the Expiry Gamma lab, set IV to 14% and note ATM premium, delta and gamma at 90, 60, 30, 15 and 5 minutes. Plot gamma and premium against minutes remaining. Then repeat for strikes 100 and 200 points away and write what changes.',
  lab: { to: '/labs/expiry-gamma', label: 'Open the Expiry Gamma lab' },
}

// ---------- 19.5 Expiry-day gamma approach: case-study framework ----------
const C40 = gm('CE', 24000, 40)
const P40 = gm('PE', 24000, 40)
const S40 = C40.price + P40.price
const C15 = gm('CE', 24000, 15)
const P15 = gm('PE', 24000, 15)
const S15 = C15.price + P15.price
const sd = (min: number) => SPOT * IV * Math.sqrt(min / 525600)
const C40_30 = gm('CE', 24000, 40, IV, SPOT + 30)
const C25_cmp = gm('CE', 24000, 25)
const P25_cmp = gm('PE', 24000, 25)
const S25 = C25_cmp.price + P25_cmp.price

export const lesson195: Lesson = {
  moduleId: '19.5',
  summary:
    'The expiry-day gamma approach is a hypothesis: that in the final hour of expiry day, option premiums near the money can expand sharply on fast index moves, and that this may be observed and tested. This module is not a recommendation. It is a case-study framework for observing the market conditions, defining rules in advance, and evaluating the idea on historical data with costs, so you can judge whether it has any edge.',
  objectives: [
    'State the approach as a testable hypothesis and name what would falsify it.',
    'List the market conditions and data you would monitor (spot, futures, VIX, ATM and OTM strikes, CE and PE OI, writer exits, fresh positions).',
    'Describe the 2:50 PM to 3:15 PM window and why it is only an observation window, not a signal.',
    'Explain two-sided buying, why both legs can lose, and how theta and IV affect it.',
    'Compute the break-even move and cost of a two-sided position from model values.',
    'Design a historical evaluation that includes costs, slippage and execution near the close.',
  ],
  concepts: [
    { term: 'Hypothesis, not strategy', definition: 'The claim is conditional and testable: for some market environments, the late-session move in the index exceeds what the remaining-time premium implies. It may be false, may have faded after becoming widely known, and may depend on liquidity or costs.' },
    { term: 'Expiry-day environment', definition: 'Record the context: gap or no gap at open, VIX level versus its recent range, news or event risk, distance of spot from major OI strikes, and whether the day is also a monthly expiry or a weekly one. Different environments need separate samples.' },
    { term: 'Spot and futures', definition: 'Track spot and the near-month future together. A futures premium or discount change, and the speed of moves in each, helps you see whether a move is broad or concentrated.' },
    { term: 'India VIX', definition: 'Watch whether VIX drifts, jumps or stays flat into the close. VIX measures expected volatility, not direction, so use it to scale expectations rather than to call a side.' },
    { term: 'ATM and nearby OTM strikes', definition: 'Log premium, bid-ask spread and volume for ATM and one or two strikes either side. Premium expansion that is not accompanied by a spot move may reflect spreads or thin liquidity.' },
    { term: 'CE and PE OI, writer exits, fresh positions', definition: 'Falling OI at a strike may reflect writers or buyers closing; rising OI may reflect new writing or new buying. OI alone cannot show who initiated, so use OI as context and verify with price and volume.' },
    { term: 'Sudden premium expansion', definition: 'A rapid rise in ATM or near-ATM premium. It can come from a spot move (delta and gamma), an IV jump, or a quote widening. Decompose it before treating it as a signal.' },
    { term: '2:50 PM–3:15 PM behaviour', definition: 'The session closes at 3:30 PM, so these minutes are about 40 to 15 minutes before the close. Treat them as a window to observe how price, spreads and premiums behave, and to test whether any pattern repeats.' },
    { term: 'Two-sided option buying', definition: 'Holding a call and a put (a straddle or strangle) means you pay both premiums and profit only if the move beyond the break-even is large enough. One leg usually expires worthless.' },
    { term: 'Why both legs can lose', definition: 'If spot stays near the strike, both options decay. If spot moves but not enough, the winning leg gains less than the total premium paid. Costs make it worse.' },
    { term: 'Trailing stop-loss', definition: 'A stop that follows the favourable premium or spot, defined in advance. In fast, illiquid quotes stops can fill far from their trigger, so a trailing rule must be tested with realistic slippage.' },
    { term: 'Execution near the close', definition: 'Spreads widen, quotes thin out and orders may not fill at expected prices. Include slippage, brokerage, STT and exchange charges in every test, and note exchange rules on expiry-day settlement.' },
  ],
  formulas: [
    { label: 'One-standard-deviation move in the remaining time', tex: String.raw`\text{Move}_{1\sigma}= S\,\sigma\sqrt{\frac{m}{525{,}600}}`, note: 'm = minutes remaining, using the calendar-minute convention of the model.' },
    { label: 'Straddle break-evens at entry', tex: String.raw`S^{\ast}_{\pm}=K\pm(\text{Call premium}+\text{Put premium})` },
    { label: 'Per-trade result (include costs)', tex: String.raw`\text{P\&L}=\text{exit value}-\text{entry premium}-\text{costs}-\text{slippage}` },
  ],
  examples: [
    {
      title: 'What a two-sided position needs: break-even versus expected move',
      given: [MODEL, 'Illustration of arithmetic only; it is not a trade recommendation', 'Buy 24,000 CE and 24,000 PE at 2:50 PM (40 minutes to close), spot 24,000'],
      steps: [
        `Model premiums at 40 minutes: CE ${f(C40.price, 2)} + PE ${f(P40.price, 2)} = straddle ${f(S40, 2)} points (${f(S40 * LOT)} rupees per lot of 65 before costs).`,
        `Break-evens at expiry: 24,000 ± ${f(S40, 2)} → ${f(24000 - S40, 0)} and ${f(24000 + S40, 0)}.`,
        `The model 1σ move over the remaining 40 minutes is ${f(sd(40), 1)} points. The straddle price is about ${f(S40 / sd(40), 2)} of that, meaning the market premium already prices roughly this much movement.`,
        `So the position needs the realised move to exceed about ${f(S40, 1)} points by the close, plus costs, simply to break even. It is not enough that "gamma is high".`,
        `If nothing moves, holding to 3:15 PM (15 minutes left) leaves a straddle worth ${f(S15, 2)}, a decay of ${f(S40 - S15, 2)} points in 25 minutes; to 3:30 PM it decays to zero.`,
      ],
      takeaway: 'The question for historical testing is not whether gamma is large, but whether realised late-session moves exceed the premium paid often enough, and by enough, to cover costs.',
    },
    {
      title: 'One leg only: how big a move is needed',
      given: [MODEL, 'Buy 24,000 CE at 2:50 PM with 40 minutes left, premium ' + f(C40.price, 2)],
      steps: [
        `Break-even at expiry: 24,000 + ${f(C40.price, 2)} = ${f(24000 + C40.price, 1)}. A 30-point rally with 40 minutes still left gives a premium of ${f(C40_30.price, 2)} (${sg(C40_30.price - C40.price, 2)}).`,
        `Waiting 15 minutes with spot unchanged: premium falls to ${f(gm('CE', 24000, 25).price, 2)}.`,
        `A ${f(S25, 1)}-point straddle at 25 minutes gives context: the combined premium falls as minutes pass, so being right about direction but late can still lose.`,
        'The comparison with the straddle shows why a one-leg view needs a directional hypothesis that must be tested, not only a volatility view.',
      ],
      takeaway: 'Direction and timing both matter. Test directional rules separately from volatility rules.',
    },
    {
      title: 'Test design (no results claimed)',
      given: ['A sample of expiry days from your own data source', 'Pre-registered rules written before you look at results'],
      steps: [
        'Define the environment filter (for example VIX band, gap size, day of week) before testing.',
        'Define entry time (for example 2:50 PM), strikes (ATM ± n), size in lots, exit rule (time or trailing stop) and cost model.',
        'Record every qualifying day, including losses, in a table: date, entry premium, exit, costs, net result, environment tags.',
        'Report win rate, average win, average loss, expectancy, maximum drawdown and the number of days. A small sample proves nothing.',
        'Split the data in two (earlier and later periods) and check whether the result holds out of sample.',
      ],
      takeaway: 'An idea is not evidence. Evidence is a pre-defined rule, a cost-inclusive result on data you did not tune on, and honest sample sizes.',
    },
  ],
  scenarios: {
    bullish: { text: 'A late rally through the strike with falling short call OI and rising call premium would be the pattern to log. The hypothesis is that such moves are large enough to repay the premium; the test is how often that occurs and with what slippage.' },
    bearish: { text: 'A late fall through the strike with put premium rising and put OI falling is the mirror pattern. The same questions apply: how often, how large, and after what costs.' },
    sideways: { text: 'Spot oscillates around the strike and both legs decay, so a two-sided buyer loses most of the premium. The test should show how frequent these days are, because they decide whether the approach has any value.' },
  },
  pitfalls: [
    'Treating the window as a signal. Observation windows describe where to look; they do not predict direction or size.',
    'Testing without costs and slippage. Near the close, spreads widen and fills can be far from displayed quotes.',
    'Selecting only days that worked. Include every qualifying day in the sample.',
    'Tuning rules (time, strike, stop) until the history looks good, then reading the result as evidence. Use separate in-sample and out-of-sample periods.',
    'Using one leg or two without stating the loss when spot stays still. Both legs can lose, and the maximum loss on a long position is the premium paid.',
    'Selling instead of buying near the close without sizing for gap and gamma risk. Short gamma can lose several multiples of the premium collected.',
    'Ignoring rule changes such as contract specifications, expiry days, lot sizes and settlement procedures; verify with exchange circulars.',
  ],
  practice: [
    { q: `Using the model figures, a straddle at 40 minutes costs ${f(S40, 2)} points. What spot levels does it need at expiry just to break even before costs?`, a: `24,000 ± ${f(S40, 2)}, i.e. below ${f(24000 - S40, 1)} or above ${f(24000 + S40, 1)}.` },
    { q: 'List three things you would record on every observed expiry day in addition to the final result.', a: 'Examples: VIX level and change, gap at open, spot–futures spread, ATM premium and bid-ask at the entry time, CE/PE OI change near spot, and the actual exit slippage.' },
    { q: 'Why is a strategy that "won on three expiry days" not evidence?', a: 'Three observations are too few to separate skill from chance, they are likely selected, and costs and losing days may be missing. Evidence needs many days, pre-set rules and out-of-sample checks.' },
    { q: 'A long straddle loses when spot stays near the strike. Why can it also lose when spot moves 20 points?', a: `The premium paid was about ${f(S40, 0)} points, so a 20-point move leaves the straddle below its cost, and costs are added on top.` },
  ],
  assignment:
    'Write a one-page test plan for this hypothesis: the environment filter, entry time, instruments, exit rule, cost model and sample you will use, and what result would make you reject it. Then log ten expiry days of observation only (no trading), noting the spot path from 2:50 to 3:30 PM and the ATM straddle price at 2:50, 3:05 and 3:15 PM.',
  lab: { to: '/labs/expiry-gamma', label: 'Open the Expiry Gamma lab' },
}
