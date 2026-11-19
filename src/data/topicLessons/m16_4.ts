import type { ModuleLesson } from '../topicLessonTypes'

/* Module 16.4 — Advanced Institutional Concepts.
 * Illustrative numbers: NIFTY 24,000, lot 65 (check the current NSE contract specification), IV 14%, r 6.5%, dividend yield 1.3% (Black–Scholes, src/lib/bs.ts).
 * 24,000 CE, 7 days: price 197.69, delta 0.5242, gamma 0.000856, theta −14.99/day, vega 13.23 per vol point. 10 lots = 650 units:
 * delta 340.8 units (5.24 lots), gamma 0.556 delta-units per point, theta −9,743/day, vega 8,600 per vol point.
 * Break-even daily move for long gamma = sqrt(2 × 9,743 / 0.556) = 187 points. 30-day futures fair value 24,102.79; 7-day 24,023.95; 37-day 24,126.84.
 * Parity (no dividend, 7 days): C 200.85, P 170.95, C−P = 29.90 = S − K·e^(−rT). */
const m: ModuleLesson = {
  moduleId: '16.4',
  intro: `This module introduces the techniques that large trading desks and quant funds use: staying neutral to direction, trading volatility itself, and exploiting small mispricings between related instruments. Most of these need low costs, fast execution and big capital, so the point for a retail trader is to understand them and recognise their footprints, not to copy them. Every idea here rests on relationships you already know: delta, gamma, vega, cost of carry and put-call parity.`,
  introHi: `Is module mein un techniques ki baat hai jo bade trading desks aur quant funds use karte hain: direction se neutral rehna, volatility ko hi trade karna, aur related instruments ke beech chhoti mispricing ka fayda uthana. Inme se zyadatar ke liye low cost, fast execution aur bada capital chahiye, isliye retail trader ka maqsad inhe samajhna hai, copy karna nahi. Saari ideas aapke jaane-pehchaane relationships par tiki hain: delta, gamma, vega, cost of carry aur put-call parity.`,
  steps: {
    concept: `Professional desks usually do not bet on whether Nifty goes up or down. They try to earn from something narrower: volatility being mispriced, two related prices drifting apart, or a rule (like put-call parity) being briefly broken. The profit per trade is small, so size, speed and low cost matter more than a market opinion.`,
    conceptHi: `Professional desks aksar yeh bet nahi lagate ki Nifty upar jayega ya neeche. Woh kuch narrow cheez se kamane ki koshish karte hain: volatility ka galat price hona, do related prices ka alag ho jana, ya put-call parity jaise rule ka thodi der ke liye tootna. Har trade ka profit chhota hota hai, isliye size, speed aur low cost market opinion se zyada matter karte hain.`,
    mechanism: `The common machinery is: (1) measure the exposure with the Greeks, (2) remove the exposure you do not want (usually direction) with futures or opposite options, (3) keep the one you want (volatility, spread, or a pricing gap), and (4) re-hedge as the exposure drifts. Costs such as brokerage, STT, exchange charges, bid-ask spread and slippage are paid on every re-hedge, so a strategy only works if the edge is bigger than the friction.`,
    example: {
      title: 'Hedging a long 24,000 CE position to delta-neutral',
      text: `A desk buys 10 lots of the 7-day 24,000 CE at 197.69 (IV 14%). That is 650 units, delta 0.5242, so the position is long about 340.8 delta units, which is 5.24 lots of futures. It sells 5 lots of Nifty futures (325 units). Net delta is 340.8 minus 325 = about +15.8 units, close to flat for small moves. The position now earns from gamma if Nifty moves a lot (0.556 delta-units per point, about ₹695 for a 50-point move: 0.5 × 0.556 × 50² = 695) and loses theta of about ₹9,743 a day (14.99 × 650). It needs roughly a 187-point daily move just to break even on gamma versus theta. Illustrative; excludes costs.`,
    },
    chart: {
      kind: 'flow',
      title: 'The institutional hedging loop',
      caption: 'Measure, remove the unwanted exposure, keep the wanted one, re-hedge. Each pass costs money.',
      steps: [
        { label: 'Take a position', note: 'options, futures, stocks', tone: 'gold' },
        { label: 'Measure Greeks', note: 'net delta, gamma, vega', tone: 'ice' },
        { label: 'Hedge the unwanted', note: 'usually direction', tone: 'neutral' },
        { label: 'Hold the wanted', note: 'volatility or spread', tone: 'gold' },
        { label: 'Re-hedge', note: 'costs paid each time', tone: 'ice' },
      ],
    },
    optionChain: `The option chain gives the raw inputs institutions work with: last prices, IV per strike, OI and the bid-ask spread. You can check put-call parity across a strike, compare IV between strikes and expiries, and see the spread cost of crossing the market. You cannot see anyone's hedges, so the chain never proves that an institution is delta-neutral or running a dispersion trade.`,
    psychology: `Retail traders think in stories about direction. Desks think in exposures and probabilities, accept many small wins and occasional hard losses, and treat each trade as one draw from a long series. The behaviour to borrow is discipline about exposure: knowing exactly what you are long and short. The behaviour not to borrow is leverage: strategies with thin margins can be ruined by one gap or one bad fill.`,
    scenarios: {
      bullish: `A delta-neutral long-gamma book gains if the market rallies sharply, but only if the move is big enough to beat theta; a slow grind up may lose money. A risk reversal (sell put, buy call) is the directional version of this idea.`,
      bearish: `The same book gains from a sharp fall, again only if the move is large. A short-vol dispersion or short-gamma book can lose heavily in a fast fall because correlation and volatility jump together.`,
      sideways: `Delta-neutral long gamma bleeds theta in a quiet range. Delta-neutral short gamma earns theta but is exposed to the first breakout. Pure arbitrage trades do not care about direction and may be unaffected, if the mispricing exists and costs are low.`,
    },
    practice: [
      { q: `A desk is long 10 lots (650 units) of an option with delta 0.52. How many 65-unit futures lots neutralise the delta?`, a: `Delta = 0.52 × 650 = 338 units. 338 ÷ 65 = 5.2 lots, so sell about 5 lots of futures (leaving about 13 units of residual delta).` },
      { q: `Nifty futures trade at 24,140 and fair value is 24,102.79. What is the mispricing and why may it not be a free profit?`, a: `24,140 − 24,102.79 = 37.21 points. Brokerage, STT, exchange charges, the cost of buying a 50-stock basket, bid-ask spreads and slippage all reduce it, and the gap can close before both legs are filled.` },
      { q: `Call 200.85, put 170.95, strike 24,000, spot 24,000, 7 days, r 6.5% (no dividend). Does parity hold?`, a: `C − P = 29.90. S − K·e^(−rT) = 24,000 − 24,000 × e^(−0.065 × 7/365) = 29.90. Yes, parity holds.` },
      { q: `A long-gamma position has gamma 0.556 per point and theta −₹9,743 a day. What daily move breaks even?`, a: `Gamma P&L = 0.5 × 0.556 × x² = 9,743, so x² = 35,046 and x ≈ 187 points, about 0.78% of 24,000.` },
    ],
    assignment: `Pick one 7-day ATM Nifty call from today's chain. Using the greeks calculator, note its delta, gamma and theta, then write how many lots of futures would make 5 lots of it delta-neutral, and the one-day move at which gamma would offset theta. State which of these you can observe and which are model outputs.`,
  },
  topics: [
    {
      t: 1,
      def: `Delta-neutral means the combined delta of all positions is close to zero, so a small move in the index does not change the position's value much. Delta is the change in an option's price for a 1-point move in the index. A trader reaches neutrality by pairing options with futures, or with opposite options.`,
      hi: `Delta-neutral ka matlab hai ki aapke saare positions ka combined delta zero ke aas-paas hai, toh index ke chhote move se position ki value zyada nahi badalti. Delta batata hai ki index 1 point hilne par option ka price kitna badlega. Neutral banane ke liye options ke saath futures ya opposite options pair kiye jaate hain.`,
      how: `Net delta is the sum of delta × units across all positions. A desk long 650 units of a 0.5242-delta call is long 340.8 units of delta and offsets it by selling about 5 lots of Nifty futures on NSE. Neutrality is local and temporary: as spot moves, gamma changes the option delta, so the hedge must be adjusted. Delta-neutral does not mean risk-free; the position is still exposed to gamma, theta, vega and gaps.`,
      eg: {
        title: 'Neutralising 10 lots of 24,000 CE',
        text: `10 lots × 65 = 650 units × delta 0.5242 = 340.8 delta units. Selling 5 lots of futures (325 units) leaves +15.8 units. If Nifty rises 50 points, the option gains about 0.5242 × 50 = 26.21 per unit from delta, ₹17,037 on 650 units, while the short futures lose 50 × 325 = ₹16,250. Net from delta is about +₹787, which is the 15.8 residual units × 50; gamma adds a further gain of roughly ₹695. Illustrative; costs ignored.`,
      },
      tip: `Delta-neutral removes direction only at this moment and this price. The risk that remains is gamma, theta, vega and gaps.`,
      visual: { kind: 'bars', title: 'Net delta before and after the hedge (units)', unit: ' units', caption: 'Illustrative: 10 lots of 24,000 CE hedged with 5 lots of futures.', items: [{ label: 'Long 650 CE (delta 0.5242)', value: 341, tone: 'ice' }, { label: 'Short 5 lots futures', value: -325, tone: 'neutral' }, { label: 'Net delta', value: 16, tone: 'gold' }] },
      calc: { id: 'portfolio-delta', preset: { d1: 0.5242, q1: 650, d2: 1, q2: -325, d3: 0, q3: 0 }, why: 'Sums delta × quantity across the call and the short futures.' },
    },
    {
      t: 2,
      def: `Gamma scalping is hedging a long-option position repeatedly so the gains from gamma are locked in as the market moves. You buy options (long gamma), stay delta-neutral, and trade the futures back to neutral each time spot moves. The profit comes from the market moving more than the option's price assumed.`,
      hi: `Gamma scalping mein aap option buy karke long gamma rakhte ho, aur delta-neutral rehne ke liye har move ke baad futures trade karte ho. Jab market jyada hilta hai, toh upar jaane par aap futures sell karte ho aur neeche jaane par buy, yaani mehenga bechna aur sasta kharidna. Profit tab hota hai jab market option ke price mein assume kiye gaye move se zyada hilta hai.`,
      how: `A long-gamma book gets longer delta as spot rises and shorter as it falls. Re-hedging means selling futures into rises and buying into falls, which locks in small gains. Theta is the daily cost of holding the gamma, so the strategy only profits if realised movement is larger than what the option's implied volatility priced. Every re-hedge costs brokerage, STT on option-side trades, exchange charges and spread, so hedging too often can destroy the edge.`,
      eg: {
        title: 'Scalping 10 lots of the 7-day 24,000 CE',
        text: `Gamma is 0.000856 × 650 = 0.556 delta-units per point. After a 50-point rise, delta has grown by about 27.8 units, so the desk sells about 28 units (under half a lot, so in practice it waits for a bigger move or uses a fraction via options). Gamma gain on a 50-point move is 0.5 × 0.556 × 50² = ₹695. Theta costs ₹9,743 a day. The desk needs about 187 points of movement in the day (0.5 × 0.556 × 187² ≈ 9,720) to cover theta. Illustrative.`,
      },
      tip: `Gamma scalping is a bet that realised volatility will beat implied volatility. If the market sits still, theta wins.`,
      visual: { kind: 'compare', title: 'Long gamma: who pays, who earns', left: { head: 'Earns', tone: 'bull', points: ['Large intraday swings', 'Back-and-forth moves that return the hedge profit', 'Rising realised volatility'] }, right: { head: 'Pays', tone: 'bear', points: ['Theta every day', 'Spread and charges on every re-hedge', 'Quiet, range-bound days'] } },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Shows the gamma and theta that set the break-even move.' },
    },
    {
      t: 3,
      def: `Volatility arbitrage means trading the gap between implied volatility (what option prices assume) and the volatility you expect to be realised. If options look cheap relative to your forecast, you buy them and hedge direction. If they look expensive, you sell them and hedge. The bet is on the volatility number, not on direction.`,
      hi: `Volatility arbitrage mein aap implied volatility (option price mein jo assume hai) aur apne forecast ki realised volatility ke gap ko trade karte ho. Agar options sasta lag raha hai toh buy karke direction hedge kar dete ho, aur mehenga lag raha hai toh sell karke hedge karte ho. Bet volatility ke number par hai, direction par nahi.`,
      how: `A desk estimates future realised volatility from past price data, scheduled events and its own models, then compares it with the IV on the chain or with India VIX. If IV is 12% and the forecast is 15%, buying vega and hedging delta may pay if the forecast is right. The word arbitrage is loose here: unlike a true arbitrage there is no locked profit, only a statistical edge that can be wrong. Vega changes with time and level, and realised volatility is only known after the fact.`,
      eg: {
        title: 'Buying cheap vol: the vega in rupees',
        text: `Ten lots of the 7-day 24,000 CE have vega 13.23 per unit per vol point, so 650 × 13.23 = ₹8,600 per 1-point change in IV. A desk that buys at IV 12% and sees IV rise to 14% would gain about 2 × 8,600 = ₹17,200 from vega alone (illustrative: vega changes as IV and time change). If IV instead falls to 10%, it loses about the same. Delta is hedged with futures so direction matters less.`,
      },
      tip: `Never call a volatility view an arbitrage. It is a forecast, and forecasts of volatility are often wrong when they matter most.`,
      visual: { kind: 'gauge', title: 'Implied vs your forecast of realised volatility', unit: '%', min: 8, max: 24, value: 12, caption: 'Illustrative: IV 12% against a forecast of 15% suggests options may be cheap. It is a view, not a guarantee.', zones: [{ from: 8, to: 12, label: 'Cheap vs forecast', tone: 'ice' }, { from: 12, to: 16, label: 'Fair zone', tone: 'gold' }, { from: 16, to: 24, label: 'Expensive', tone: 'neutral' }] },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 7 }, why: 'Turns a volatility level into the index move it implies.' },
    },
    {
      t: 4,
      def: `Statistical arbitrage trades baskets or pairs of related securities whose prices usually move together, betting that an unusual gap will shrink. The edge comes from a statistical model, not from a guaranteed link. Many small trades are made, and each has a probability of working, not a certainty.`,
      hi: `Statistical arbitrage mein related securities ke pairs ya baskets trade hote hain jinke prices aam taur par saath chalte hain, aur bet yeh hoti hai ki koi unusual gap wapas chhota hoga. Edge ek statistical model se aata hai, kisi guaranteed link se nahi. Bahut saare chhote trades lagte hain aur har trade ke kaam karne ki sirf probability hoti hai.`,
      how: `A typical pair is two stocks in the same sector, for example two large private banks. The desk tracks the price ratio or spread over time, computes its average and standard deviation, and trades when the spread moves far from average, buying the cheaper leg and selling the dearer. The stock futures on NSE make shorting easy and keep the margin efficient. The risk is that the relationship breaks (a result, a regulatory action, a merger), and then the spread can keep widening.`,
      eg: {
        title: 'A pair at two standard deviations',
        text: `Illustrative: the spread between two bank stocks has averaged 0 with a standard deviation of ₹12 over a year. Today it is +₹24. The z-score is (24 − 0) ÷ 12 = 2.0. The desk sells the dearer stock and buys the other in equal rupee value. If the spread returns to 0 it earns about ₹24 per share-pair before costs; if one stock has company-specific bad news the spread may widen to 36 or more and the pair loses.`,
      },
      tip: `A statistical relationship is an observed habit, not a law. Always define in advance the spread at which you accept the model is wrong.`,
      visual: { kind: 'bars', title: 'Spread z-score (illustrative)', unit: ' sd', caption: 'Trade when the spread is far from its own average; exit if it keeps going.', items: [{ label: 'Typical band', value: 1, tone: 'neutral' }, { label: 'Entry signal', value: 2, tone: 'gold' }, { label: 'Stop (model broken)', value: 3, tone: 'bear' }] },
    },
    {
      t: 5,
      def: `Index arbitrage exploits a gap between an index future and the basket of stocks that make up the index. If the future is more expensive than fair value, a trader sells the future and buys the stocks; if cheaper, the reverse. The two should converge by expiry.`,
      hi: `Index arbitrage mein index future aur us index ke stocks ke basket ke beech ke gap ka fayda uthaya jata hai. Agar future fair value se mehenga hai toh future sell karke stocks buy karte hain, aur sasta hai toh ulta. Dono expiry tak converge hone chahiye.`,
      how: `Fair value is spot × e^((r − dividend yield) × days/365). For Nifty at 24,000, 30 days, r 6.5% and dividend yield 1.3%, fair value is 24,102.79. If the future trades well above that, cash-and-carry applies: buy the 50 stocks in index weights, sell the future, hold to expiry. The basket purchase is costly and slow, and stocks may be sold short only through futures or stock-lending, so only well-equipped desks do this. Where the basket cannot be traded cleanly the gap may persist.`,
      eg: {
        title: 'A 37-point premium before costs',
        text: `Nifty spot 24,000; 30-day fair value 24,102.79. If the future trades at 24,140 the premium over fair value is 37.21 points, or ₹2,419 per lot of 65 (37.21 × 65 = 2,418.65). A desk must pay costs on the basket and the future, and bid-ask spreads on all 50 stocks. If those add up to 15 points the net edge is about 22 points per unit, about ₹1,430 a lot. Illustrative; real costs vary.`,
      },
      tip: `A premium over fair value is only an opportunity if it survives costs and execution. Retail traders rarely beat the desks that do this.`,
      visual: { kind: 'bars', title: 'Futures price vs fair value (30 days)', caption: 'Illustrative; spot 24,000, r 6.5%, dividend yield 1.3%.', items: [{ label: 'Spot', value: 24000, tone: 'neutral' }, { label: 'Fair value', value: 24102.79, tone: 'gold' }, { label: 'Traded future', value: 24140, tone: 'ice' }] },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24140, rate: 6.5, days: 30, dividend: 1.3 }, why: 'Computes the fair value and the mispricing.' },
    },
    {
      t: 6,
      def: `Calendar arbitrage trades the price difference between futures (or options) of different expiries on the same underlying. The near and far contracts should differ by about the cost of carry for the extra time. If the spread is far from that, a desk buys one expiry and sells the other.`,
      hi: `Calendar arbitrage mein same underlying ke alag-alag expiry ke futures (ya options) ke price ka difference trade hota hai. Near aur far contract ka gap lagbhag extra time ke cost of carry jitna hona chahiye. Agar spread usse bahut door hai toh desk ek expiry buy karta hai aur doosri sell.`,
      how: `For futures the fair spread is the carry for the extra days. At r 6.5% and dividend yield 1.3% on 24,000, the 7-day fair value is 24,023.95 and the 37-day is 24,126.84, so the fair calendar spread for 30 extra days is 102.90. A spread trader sells the far and buys the near if the market spread is higher than that, expecting convergence. Margin on spread positions is lower than outright, but SEBI removed the calendar-spread margin benefit for contracts on their expiry day in its October 2024 measures, so check current rules.`,
      eg: {
        title: 'Spread of 125 versus fair 102.90',
        text: `Near futures at 24,030, far futures at 24,155. Market spread = 125. Fair spread = 24,126.84 − 24,023.95 = 102.89. The spread is 22.11 points rich. A desk buys the near contract and sells the far one: 22.11 × 65 = ₹1,437 per lot if the spread converges to fair value. If the market keeps widening the spread, the trade loses. Illustrative.`,
      },
      tip: `Calendar spreads reduce directional risk but not spread risk. A spread can move against you even when the index barely moves.`,
      visual: { kind: 'timeline', title: 'Near and far contract on one clock', events: [{ when: 'Today', what: 'Near 24,030 and far 24,155 trade; spread 125', tone: 'gold' }, { when: 'Fair', what: 'Carry for 30 extra days = about 102.9', tone: 'ice' }, { when: 'Near expiry', what: 'Near contract settles to spot; spread shrinks toward the carry', tone: 'neutral' }] },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24155, rate: 6.5, days: 37, dividend: 1.3 }, why: 'Prices the far contract against its fair value.' },
    },
    {
      t: 7,
      def: `Put-call parity is the rule that a call and a put at the same strike and expiry are linked: call minus put equals spot minus the present value of the strike. It holds because a long call plus a short put copies a futures position. If it does not hold, arbitrageurs step in.`,
      hi: `Put-call parity ka rule hai ki same strike aur expiry ke call aur put aapas mein linked hote hain: call minus put barabar hota hai spot minus strike ki present value ke. Yeh isliye hota hai ki long call aur short put milkar futures position jaisa banta hai. Agar yeh rule toot jaye toh arbitrageur turant fayda uthate hain.`,
      how: `For European options, C − P = S − K·e^(−rT) (adjusted for dividends). NSE index options are European, so the rule applies tightly. Desks scan chains for strikes where the gap deviates by more than costs, and also use it to infer the market's implied forward. Retail traders mostly see it when the 'synthetic' futures price from the chain differs from the traded future.`,
      eg: {
        title: 'Checking parity on the 24,000 strike',
        text: `7 days, r 6.5%, no dividend. Call 200.85, put 170.95. C − P = 29.90. S − K·e^(−rT) = 24,000 − 24,000 × e^(−0.065 × 7/365) = 24,000 − 23,970.10 = 29.90. Parity holds. If the call was 205 and the put 170.95, C − P = 34.05, which is 4.15 above fair: sell the call, buy the put, buy the underlying or future. That is 4.15 × 65 = ₹270 a lot before costs. Illustrative.`,
      },
      tip: `Parity gaps on liquid Nifty strikes are tiny and short-lived. A wide gap on an illiquid strike is usually a spread problem, not free money.`,
      visual: { kind: 'flow', title: 'Parity as an identity', steps: [{ label: 'Long call', note: 'right to buy at K', tone: 'ice' }, { label: 'Short put', note: 'obligation to buy at K', tone: 'ice' }, { label: '= Synthetic future', note: 'pay K, own the index', tone: 'gold' }, { label: 'Value = S − PV(K)', note: 'must match C − P', tone: 'neutral' }] },
      calc: { id: 'put-call-parity', preset: { spot: 24000, strike: 24000, days: 7, rate: 6.5, call: 200.85, put: 170.95 }, why: 'Tests whether a call-put pair satisfies parity.' },
    },
    {
      t: 8,
      def: `A synthetic future is a position built from options that behaves like a futures contract. Long synthetic future = buy a call and sell a put at the same strike and expiry. Short synthetic future = sell the call and buy the put. It is a direct use of put-call parity.`,
      hi: `Synthetic future ek aisa position hai jo options se bana hota hai par futures ki tarah chalta hai. Long synthetic future ka matlab hai same strike aur expiry par call buy aur put sell. Short synthetic future mein call sell aur put buy hota hai. Yeh put-call parity ka seedha use hai.`,
      how: `At expiry, long call minus short put pays S − K whatever the index does. The net premium paid or received shifts the effective entry price. Traders use it to get futures-like exposure with different margin treatment, to roll positions, or to build a hedge where futures are not convenient. Risk is unlimited on the short put side, margin is blocked under SPAN, and liquidity at the chosen strike must be good for both legs.`,
      eg: {
        title: 'Synthetic long at 24,000',
        text: `Buy 24,000 CE at 200.85 and sell 24,000 PE at 170.95 (7 days). Net debit 29.90. The position behaves like a long future with effective entry 24,000 + 29.90 = 24,029.90. If Nifty expires at 24,300 the payoff is 300 − 29.90 = 270.10 per unit, ₹17,556 on 65 units. If it expires at 23,700 the loss is 300 + 29.90 = 329.90, ₹21,444 a lot. Illustrative.`,
      },
      tip: `Synthetic does not mean safer. The short put makes the downside as large as a futures position.`,
      visual: { kind: 'payoff', title: 'Synthetic long future', spot: 24000, caption: 'Long 24,000 CE at 200.85 plus short 24,000 PE at 170.95.', legs: [{ type: 'CE', side: 1, strike: 24000, premium: 200.85 }, { type: 'PE', side: -1, strike: 24000, premium: 170.95 }] },
      calc: { id: 'futures-pnl', preset: { side: 'long', entry: 24029.9, exit: 24300, lotSize: 65, lots: 1 }, why: 'The synthetic behaves like futures entered at 24,029.90.' },
    },
    {
      t: 9,
      def: `A risk reversal is selling an out-of-the-money put and buying an out-of-the-money call (bullish), or the reverse (bearish). It is a low-cost or zero-cost way to express a directional view. In the options market, the price gap between OTM calls and puts, or skew, is also called the risk-reversal level.`,
      hi: `Risk reversal mein OTM put sell kiya jata hai aur OTM call buy (bullish), ya iska ulta (bearish). Yeh kam ya zero cost mein direction ki view lene ka tareeka hai. Options market mein OTM call aur put ke IV ka gap, yaani skew, ko bhi risk-reversal level kaha jata hai.`,
      how: `Because OTM puts in India usually carry a higher IV than equivalent OTM calls, selling a put and buying a call can often be done for little or no net premium. Funds use it to hedge or to take a view; some use it to collar a long portfolio in reverse. The seller of the put takes on the large downside of a futures-like position below the strike, so margin is significant and losses can be big in a sharp fall.`,
      eg: {
        title: 'Zero-cost-style bullish reversal',
        text: `7 days, spot 24,000. With flat IV 14%, 24,200 CE costs 111.40 and 23,800 PE costs 94.03: net debit 17.37. With a skew (call IV 13%, put IV 16%) the call is 99.07 and the put 117.85, so selling the put and buying the call collects 18.78. The skew pays you to take the downside. If Nifty falls to 23,500 at expiry, the short 23,800 PE loses 300 − 117.85 = 182.15 per unit, ₹11,840 a lot (182.15 × 65). Illustrative.`,
      },
      tip: `A free-looking structure is paid for with tail risk. Know the loss if the index falls 5% before you sell the put.`,
      visual: { kind: 'payoff', title: 'Bullish risk reversal', spot: 24000, caption: 'Short 23,800 PE at 117.85, long 24,200 CE at 99.07 (skewed IV, illustrative).', legs: [{ type: 'PE', side: -1, strike: 23800, premium: 117.85 }, { type: 'CE', side: 1, strike: 24200, premium: 99.07 }] },
      calc: { id: 'option-pnl', preset: { optType: 'PE', side: 'sell', strike: 23800, premium: 117.85, expiryPrice: 23500, lotSize: 65, lots: 1 }, why: 'Shows the loss on the short-put leg in a fall.' },
    },
    {
      t: 10,
      def: `Dispersion trading is a volatility strategy based on correlation: sell index options and buy options on the index's constituent stocks. It profits when the individual stocks move a lot but in different directions, so the index stays calmer than the stocks. It is a bet that implied correlation is too high.`,
      hi: `Dispersion trading correlation par based volatility strategy hai: index ke options sell karo aur index ke constituent stocks ke options buy karo. Yeh tab kaam karti hai jab alag-alag stocks bahut hilte hain par alag directions mein, toh index shant rehta hai. Yeh bet hai ki implied correlation zyada hai.`,
      how: `Index variance depends on the weights, the single-stock volatilities and how correlated the stocks are. When correlation is high the index is as volatile as its stocks; when low the index is calmer. A dispersion desk sells index vol and buys stock vol, hedges delta, and earns if realised correlation is lower than implied. It needs many positions, vega balance and heavy capital, and in a market-wide shock correlation jumps toward 1, which is when the trade can lose badly.`,
      eg: {
        title: 'Two-stock correlation maths',
        text: `Illustrative index of two equal-weight stocks with volatility 20% and 30%. At correlation 0.5, index volatility is sqrt(0.25×0.04 + 0.25×0.09 + 2×0.25×0.5×0.2×0.3) = sqrt(0.0475) = 21.8%. The weighted average stock volatility is 25%. At correlation 0.9 index volatility is 24.4%. A desk long stock vol at 25% and short index vol at 24.4% loses if correlation stays high, and earns if it falls to 0.5 and the index volatility falls toward 21.8%.`,
      },
      tip: `Dispersion is a correlation bet. It tends to fail in crashes, when everything falls together.`,
      visual: { kind: 'bars', title: 'Index volatility vs correlation (two-stock example)', unit: '%', caption: 'Weights 50/50, stock vols 20% and 30%. Illustrative.', items: [{ label: 'Weighted average stock vol', value: 25, tone: 'gold' }, { label: 'Index vol at correlation 0.9', value: 24.4, tone: 'ice' }, { label: 'Index vol at correlation 0.5', value: 21.8, tone: 'ice' }] },
    },
  ],
  tools: [
    { id: 'portfolio-delta', why: 'Check net delta before and after a hedge.' },
    { id: 'put-call-parity', why: 'Test a call and put pair for parity.' },
  ],
}
export default m
