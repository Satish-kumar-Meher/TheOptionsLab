import type { ModuleLesson } from '../topicLessonTypes'

/* Module 14.2 — Why Buyers Purchase Options.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). Premiums are Black-Scholes values
 * (r 6.5%, q 1.3%, IV 14% unless stated) rounded; real premiums differ. */
const m: ModuleLesson = {
  moduleId: '14.2',
  intro: `People buy options for very different reasons: to bet on direction, to control a large position with a small outlay, to cap their loss, to trade a volatility jump, or to insure a portfolio. The reason decides how the trade should be sized, how long it should be held and what counts as success. This module lists the ten common motives and shows what each one really costs.`,
  introHi: `Log options kai alag wajah se khareedte hain: direction par bet, chhote outlay se bada position control, loss limit karna, volatility ke jump ko trade karna, ya portfolio ko insure karna. Wajah se hi decide hota hai ki size kitna ho, kitna time hold karna hai aur success ka matlab kya hai. Is module mein 10 common motives aur unki asli cost dikhayi gayi hai.`,
  steps: {
    concept: `A buyer purchases an option because its payoff has a shape that suits a purpose. The loss is capped at the premium, the gain can be large if the move is big enough, and the position gains from higher volatility. These features are useful, but they come with a daily cost (time decay) and a need for the move to be fast and large enough.`,
    conceptHi: `Buyer option isliye khareedta hai kyunki uska payoff ek khaas shape ka hota hai. Loss premium tak limited hai, move bada ho toh gain bada ho sakta hai, aur volatility badhne se position ko fayda hota hai. Yeh features kaam ke hain, lekin inki cost roz ka time decay hai aur move ka tez aur kaafi bada hona zaroori hai.`,
    mechanism: `Each motive leans on a different Greek. Directional buyers use delta, leverage buyers use the small premium relative to contract value, event buyers use vega, breakout buyers use gamma and delta together, and hedgers use the put's negative delta against a portfolio. Theta works against all of them, so the question is always whether the benefit arrives before decay eats the premium.`,
    example: {
      title: 'One call, several motives (illustrative)',
      text: `With NIFTY at 24,000 and 3 days to expiry, the 24,100 CE costs about ₹82, so one lot (65) costs 82 × 65 = ₹5,330. A directional trader buys it expecting a rise. A leverage-minded trader likes that ₹5,330 gives exposure to a ₹15,60,000 contract (24,000 × 65). An event trader buys it before a policy announcement hoping IV rises. A cautious trader prefers it to a futures long because the worst loss is ₹5,330. Same instrument, four motives, four different definitions of a good outcome.`,
    },
    chart: {
      kind: 'layers',
      title: 'Ten motives, grouped by what the buyer wants',
      caption: 'Read top to bottom: from pure speculation to pure insurance.',
      layers: [
        { label: 'Speculation on direction', note: 'Directional view, breakout, breakdown, leverage', tone: 'gold' },
        { label: 'Speculation on volatility', note: 'Volatility expansion, event trades, gamma', tone: 'ice' },
        { label: 'Controlled risk', note: 'Limited premium risk replaces a stop-loss gap', tone: 'neutral' },
        { label: 'Insurance', note: 'Portfolio protection and hedging', tone: 'ice' },
      ],
    },
    optionChain: `On the option chain a buyer's motive is invisible. Rising volume in an OTM call may be directional buying, event buying or a hedge for a short position elsewhere, and OI alone cannot show who initiated the trade. What the chain does show is where activity is concentrated, how wide the bid-ask spread is and how IV differs across strikes, which tells you what a motive costs today.`,
    psychology: `Directional buyers are driven by conviction and sometimes by the excitement of a large multiple on a small outlay. Hedgers are driven by fear of a large loss and accept a small certain cost. The common mistake is mixing motives: buying a cheap OTM option as a "hedge" with no link to any actual exposure, or holding a hedge as if it were a profit trade and judging it by profit alone.`,
    scenarios: {
      bullish: `Directional and breakout buyers of calls may gain if the rise is quick; leverage amplifies that. Hedging puts lose their premium, which is the normal cost of protection. Volatility buyers need IV to hold or rise, which a calm rally may not provide.`,
      bearish: `Put buyers, breakdown traders and hedgers may gain, and a hedge does its job when losses elsewhere are reduced. Falls often lift IV, helping long-vega positions. Call buyers lose, usually up to the full premium.`,
      sideways: `Time decay hurts every buyer. Event and volatility buyers may be hurt twice if IV falls after the event. Hedgers lose premium by design, and that is not a failure.`,
    },
    practice: [
      {
        q: `One lot (65) of the 24,100 CE costs ₹82 with NIFTY at 24,000. Find the premium outlay as a percentage of the contract value of a NIFTY futures lot at 24,000.`,
        a: `Outlay = 82 × 65 = ₹5,330. Contract value = 24,000 × 65 = ₹15,60,000. Ratio = 5,330 / 15,60,000 = 0.34%. This is leverage in the sense of notional exposure per rupee paid; the option's delta (about 0.39) means the actual exposure is smaller.`,
      },
      {
        q: `A buyer holds the 24,100 CE bought at ₹82. NIFTY expires at 24,260. Find profit or loss per lot.`,
        a: `Value at expiry = 24,260 − 24,100 = 160. Profit = (160 − 82) × 65 = 78 × 65 = ₹5,070. Breakeven was 24,182.`,
      },
      {
        q: `A 3-lot hedger (195 units) buys 23,800 PE at ₹71. NIFTY falls to 23,300 at expiry. What is the put's profit, and what is the total premium paid?`,
        a: `Put value = 23,800 − 23,300 = 500. Profit = (500 − 71) × 195 = 429 × 195 = ₹83,655. Premium paid = 71 × 195 = ₹13,845, already included in that profit. The portfolio's own loss is separate and is not shown here.`,
      },
      {
        q: `The 24,100 CE (3 days left) costs ₹49.37 at IV 10% and ₹82.11 at IV 14%, spot unchanged. What does the IV rise add per lot?`,
        a: `Difference = 82.11 − 49.37 = ₹32.74 per unit. Per lot = 32.74 × 65 = ₹2,128 (rounded). This is pure vega effect with spot and days held constant.`,
      },
    ],
    assignment: `Write down your last five option purchases. Next to each, write the motive from this module's list of ten (one only). Then write what result would have made that motive "successful" before you entered. Note which trades had no clear motive; these are the ones to stop taking.`,
  },
  topics: [
    {
      t: 1,
      def: `Directional speculation means buying an option because you have a view that the index will move up (call) or down (put). The buyer wants the move to be large and quick enough to beat the premium paid. It is the most common reason for buying options.`,
      hi: `Directional speculation ka matlab hai option isliye khareedna kyunki aapka view hai ki index upar jayega (call) ya neeche jayega (put). Buyer chahta hai ki move itna bada aur tez ho ki premium nikal jaye. Option khareedne ka yeh sabse common reason hai.`,
      how: `The buyer chooses a strike and expiry that match the view. A call profits at expiry if the index ends above strike plus premium; a put if it ends below strike minus premium. Before expiry the position also moves with delta, and loses value each day through theta. So a correct view with slow timing can still lose. Direction, size of move and timing must all be right.`,
      eg: {
        title: 'Buying the 24,100 CE on a bullish view (illustrative)',
        text: `NIFTY 24,000; the 24,100 CE with 3 days left costs ₹82, so one lot (65) costs ₹5,330. Breakeven at expiry is 24,182. If NIFTY expires at 24,300, profit = (200 − 82) × 65 = ₹7,670. If NIFTY ends at 24,150, the option is worth 50 and the loss is (82 − 50) × 65 = ₹2,080, even though the view of "up" was right.`,
      },
      tip: `Being right on direction is not enough; the move must beat the premium before expiry. Compute the breakeven before you click buy.`,
      visual: { kind: 'payoff', title: 'Long 24,100 CE at expiry', caption: 'Loss limited to ₹82 per unit; profit starts above 24,182.', spot: 24000, legs: [{ type: 'CE', side: 1, strike: 24100, premium: 82 }] },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 82, expiryPrice: 24300, lotSize: 65, lots: 1 }, why: 'Reproduces the ₹7,670 profit at 24,300 and the ₹2,080 loss at 24,150 when you change the expiry price.' },
    },
    {
      t: 2,
      def: `Leverage means a small amount of money controls exposure to a much larger value. An option buyer pays only the premium, not the full value of the underlying contract. The percentage gain or loss on the premium can therefore be much larger than the percentage move in the index.`,
      hi: `Leverage ka matlab hai thoda paisa lagakar bade value ka exposure control karna. Option buyer sirf premium deta hai, poore contract ka value nahi. Isliye index ke percentage move ke mukable premium par percentage gain ya loss bahut bada ho sakta hai.`,
      how: `A NIFTY futures lot at 24,000 has a contract value of 24,000 × 65 = ₹15,60,000 and needs margin set by SPAN and exposure rules. A call lot costs only the premium. When the index moves, the option's percentage change is large because the premium is small, but the same applies in the other direction. Leverage does not create returns; it magnifies both outcomes, and the whole premium can go to zero.`,
      eg: {
        title: 'Same 1% move, option vs index (illustrative)',
        text: `NIFTY rises 1% from 24,000 to 24,240 and stays there at expiry. The 24,100 CE (bought at ₹82) is worth 140, a profit of 58 × 65 = ₹3,770 on ₹5,330, or about 71% of premium. A 1% fall to 23,760 leaves the call worth zero: a 100% loss of premium. The index moved 1% in both cases; the option moved +71% and −100%.`,
      },
      tip: `Leverage is not extra money for free; it is the same risk compressed into a small premium. Size the premium as capital you can lose in full.`,
      visual: { kind: 'compare', title: 'Futures vs call: capital and outcome', caption: 'Both track the index; the call limits the loss but has a decay cost.', left: { head: 'Long futures lot', tone: 'gold', points: ['Contract value about ₹15,60,000', 'Needs margin (SPAN + exposure)', '+1% = +₹15,600, −1% = −₹15,600', 'Loss can exceed the margin'] }, right: { head: 'Long 24,100 CE lot', tone: 'ice', points: ['Premium ₹5,330 paid upfront', '+1% = about +₹3,770', '−1% = −₹5,330 (full premium)', 'Loss never exceeds premium'] } },
      calc: { id: 'lot-value', preset: { premium: 82, lotSize: 65, lots: 1, spot: 24000 }, why: 'Shows the ₹5,330 premium against the contract value of the lot.' },
    },
    {
      t: 3,
      def: `Limited premium risk means the most an option buyer can lose is the premium paid. Unlike a short futures or short option position, the loss cannot grow beyond that amount. This makes the worst case known before you enter.`,
      hi: `Limited premium risk ka matlab hai option buyer ka maximum loss wahi hai jitna premium usne diya. Short futures ya short option ki tarah loss premium se aage nahi badh sakta. Isse worst case entry se pehle hi pata hota hai.`,
      how: `Because the buyer has a right and not an obligation, he lets the option expire if it is worthless. The exchange does not ask him for further margin. The clearing corporation (NSCCL) is protected by the writer's margin, not the buyer's. Limited does not mean small: a position can lose 100% of the premium repeatedly, and a gap against a futures stop-loss may be worse than a premium loss, which is a reason traders prefer buying options around gap risk.`,
      eg: {
        title: 'A gap-down overnight (illustrative)',
        text: `A trader is long one NIFTY futures lot at 24,000 with a stop-loss at 23,950. The market opens at 23,700 next morning; the stop fills near 23,700, a loss of 300 × 65 = ₹19,500. A trader who instead bought the 24,000 CE for ₹198 risks 198 × 65 = ₹12,870 at most, and a similar gap makes that option nearly worthless but no more than ₹12,870 lost. The cost of this cap was the premium and its daily decay.`,
      },
      tip: `A capped loss is not a free loss; the cap is paid for with theta. Do not use "limited risk" as a reason to over-size the position.`,
      visual: { kind: 'payoff', title: 'Long 24,000 CE vs long futures', caption: 'The call line flattens at −₹198 per unit; the futures line keeps falling.', spot: 24000, legs: [{ type: 'CE', side: 1, strike: 24000, premium: 198 }, { type: 'FUT', side: 1, strike: 24000 }] },
    },
    {
      t: 4,
      def: `Volatility expansion means a rise in implied volatility (IV), the market's expected size of future moves. Option prices rise when IV rises, even if the index does not move. A buyer who expects IV to rise can profit from that alone, which is called a long-vega position.`,
      hi: `Volatility expansion ka matlab hai implied volatility (IV) badhna, yaani market ka expected move bada hona. IV badhne par index na hile tab bhi option ka price badhta hai. Jo buyer IV badhne ki ummeed rakhta hai woh sirf us se bhi kama sakta hai, ise long-vega position kehte hain.`,
      how: `Vega measures the change in an option's price for a one-point change in IV. ATM options have the highest vega and longer-dated ones more than short-dated. IV usually rises when the market falls fast or before big events and drops when things calm down. India VIX shows expected volatility for the next 30 days, not direction. A volatility buyer needs IV to rise by more than theta takes away.`,
      eg: {
        title: 'IV 10% to 14% (illustrative)',
        text: `The 24,100 CE with 3 days left, spot 24,000, is worth about ₹49.37 at IV 10% and ₹82.11 at IV 14%. The IV rise adds 32.74 per unit, or 32.74 × 65 = ₹2,128 per lot, with the index unchanged. If IV later falls back to 10% the same ₹2,128 is lost, so a volatility trade has two ways to go wrong: IV not rising, and IV rising and then falling.`,
      },
      tip: `Before buying for a volatility rise, check whether IV is already high compared with its own recent range. Buying expensive IV is a common reason that the "right" trade loses.`,
      visual: { kind: 'curve', title: 'Vega: option value rises with IV', caption: 'ATM options gain the most per IV point; far OTM options gain least in rupees.', curve: 'vega' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24100, days: 3, iv: 14, rate: 6.5 }, why: 'Change IV from 14 to 10 to see the ₹32.74 difference.' },
    },
    {
      t: 5,
      def: `Breakout anticipation means buying calls when the index is about to break above a resistance level, expecting a strong move once it does. The buyer wants a fast, large move after the break. The risk is a false breakout where price returns into the range.`,
      hi: `Breakout anticipation ka matlab hai resistance ke upar break hone se pehle call khareedna, is ummeed mein ki break ke baad tez aur bada move aayega. Buyer chahta hai ki break ke baad move tez ho. Risk false breakout ka hota hai jab price wapas range mein aa jata hai.`,
      how: `Price sitting in a range compresses; traders mark the range high and place buy orders above it. Option buyers like breakouts because a fast move raises delta and gamma helps, while the risk is limited to the premium. But many breakouts fail, and time decay keeps running while price consolidates. Many traders wait for a close or a retest beyond the level rather than buying inside the range.`,
      eg: {
        title: 'Range 23,900–24,100 (illustrative)',
        text: `NIFTY has traded between 23,900 and 24,100 for three sessions. A trader buys the 24,100 CE at ₹82 for a break. If NIFTY runs to 24,250 and expires there, profit = (150 − 82) × 65 = ₹4,420. If the break fails and NIFTY returns to 24,000, the option is worth zero at expiry and the loss is ₹5,330. The level itself does not guarantee either outcome.`,
      },
      tip: `Decide in advance what a failed breakout looks like (for example, a close back inside the range) and exit there instead of hoping.`,
      visual: { kind: 'candles', title: 'Range, then breakout', caption: 'Buyers pay for the possibility of the move; false breakouts are part of the cost.', pattern: 'breakout', level: { price: 24100, label: 'Range high 24,100' } },
    },
    {
      t: 6,
      def: `Breakdown anticipation means buying puts when the index is about to fall below a support level, expecting a sharp fall once it does. The put gains value as the index falls. The risk is a false breakdown that reverses.`,
      hi: `Breakdown anticipation ka matlab hai support ke neeche toot-ne se pehle put khareedna, is ummeed mein ki toot-ne ke baad tez girawat aayegi. Index girne par put ki value badhti hai. Risk false breakdown ka hai jo wapas palat jata hai.`,
      how: `Falls tend to be faster than rises, and IV often rises as the index drops, so a put can gain from both delta and vega. That is why put buyers sometimes see sharper percentage gains. The same speed also means that after a fall the premium may already be expensive, and a quick rebound can erase the gain. Entry timing and exit rules matter more than for slow moves.`,
      eg: {
        title: 'Buying the 23,800 PE (illustrative)',
        text: `NIFTY 24,000; the 23,800 PE with 5 days left costs about ₹71, so one lot (65) costs ₹4,615 (71 × 65 = 4,615). Breakeven at expiry is 23,800 − 71 = 23,729. If NIFTY expires at 23,600, profit = (200 − 71) × 65 = ₹8,385. If NIFTY stays above 23,800, the loss is the full ₹4,615.`,
      },
      tip: `Falls can lift IV, which helps a put buyer, but a sharp rebound can crush both delta and IV together. Take planned partial profits rather than assuming the fall continues.`,
      visual: { kind: 'candles', title: 'Support breaks', caption: 'A close below support is evidence, not a guarantee.', pattern: 'breakdown', level: { price: 23900, label: 'Support 23,900' } },
      calc: { id: 'breakeven', preset: { optType: 'PE', side: 'buy', strike: 23800, premium: 71 }, why: 'Gives the put buyer breakeven at 23,729.' },
    },
    {
      t: 7,
      def: `An event-based trade is a position taken before a known event such as an RBI policy announcement, the Union Budget, election results or quarterly results. The buyer expects a big move or a rise in IV around the event. After the event the uncertainty ends and IV often falls sharply.`,
      hi: `Event-based trade woh position hai jo kisi known event se pehle li jaati hai, jaise RBI policy, Union Budget, election results ya quarterly results. Buyer ko bada move ya IV mein badhat ki ummeed hoti hai. Event ke baad uncertainty khatam ho jaati hai aur IV aksar tez gir jaata hai.`,
      how: `Before a scheduled event, the market raises IV because the outcome is uncertain. Option prices embed that expected move. If the actual move is smaller than what was priced, buyers lose even when the direction is right; this fall in IV after the event is called IV crush. The event buyer therefore needs a move bigger than the implied move, or must exit before the event is released. Compare the move the market is pricing with the moves similar events delivered before.`,
      eg: {
        title: 'IV crush after an event (illustrative)',
        text: `Before an announcement, the 24,000 CE with 5 days left is priced at IV 18%, about ₹210. After the event NIFTY has not moved, and IV falls to 12%; the call, with days held constant to isolate the effect, is worth about ₹143. That is a fall of 67 per unit or 67 × 65 = ₹4,355 per lot (rounded) without any adverse move. NIFTY would need a real rise to offset it.`,
      },
      tip: `You are not just betting on direction; you are betting that the move will exceed what is already priced in. Compare the straddle price with the move you expect.`,
      visual: { kind: 'timeline', title: 'IV around a scheduled event', caption: 'The shape is typical, not a rule; sizes differ by event.', events: [{ when: 'Days before', what: 'IV starts rising as the event nears', tone: 'gold' }, { when: 'Event day', what: 'IV at its peak; premiums are rich', tone: 'gold' }, { when: 'Result', what: 'Uncertainty resolves; IV drops quickly', tone: 'ice' }, { when: 'After', what: 'Move may or may not pay for the lost IV', tone: 'neutral' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 5, iv: 18, rate: 6.5 }, why: 'Change IV to 12 to see the premium fall from about 210 to 143.' },
    },
    {
      t: 8,
      def: `Portfolio protection means buying put options to limit the loss on a stock portfolio if the market falls. The premium is the cost of insurance. A put gains value as the index falls, offsetting part of the portfolio's loss.`,
      hi: `Portfolio protection ka matlab hai stock portfolio ka loss limit karne ke liye put options khareedna. Premium insurance ki cost hai. Index girne par put ki value badhti hai aur portfolio ke loss ka kuch hissa cover ho jaata hai.`,
      how: `An investor with a diversified portfolio that moves roughly with NIFTY can buy index puts, choosing the strike as the level of loss he can accept. The put does not match the portfolio exactly because a portfolio has its own beta and stock-specific moves, so the hedge is approximate. Protection is bought for a fixed period and rolled, and the repeated premium is an ongoing cost, the same way an insurance premium is.`,
      eg: {
        title: 'Hedging a ₹46.8 lakh portfolio (illustrative)',
        text: `A portfolio tracks 3 NIFTY lots: 3 × 65 × 24,000 = ₹46,80,000. He buys three 23,800 puts at ₹71: cost = 71 × 195 = ₹13,845, about 0.30% of the portfolio. If NIFTY falls 5% to 22,800, the portfolio loses about ₹2,34,000 and the puts pay (1,000 − 71) × 195 = ₹1,81,155, a net loss of about ₹52,845. Without the puts, the loss would have been ₹2,34,000 (assuming the portfolio moves exactly with NIFTY).`,
      },
      tip: `Judge a hedge by the loss it prevented in a bad outcome, not by the premium it "wasted" in a good one.`,
      visual: { kind: 'payoff', title: 'Protective put at expiry', caption: 'The put limits the downside below 23,800 at a cost of the premium.', spot: 24000, legs: [{ type: 'PE', side: 1, strike: 23800, premium: 71 }] },
      calc: { id: 'option-pnl', preset: { optType: 'PE', side: 'buy', strike: 23800, premium: 71, expiryPrice: 22800, lotSize: 65, lots: 3 }, why: 'Reproduces the ₹1,81,155 put gain at NIFTY 22,800.' },
    },
    {
      t: 9,
      def: `Gamma exposure for a buyer means being long gamma: as the index moves in your favour, delta grows, so the position gains faster; as it moves against you, delta shrinks, so losses slow down. Option buyers are always long gamma. It is strongest in ATM options close to expiry.`,
      hi: `Buyer ke liye gamma exposure ka matlab hai woh long gamma hota hai: index aapke favour mein jaye toh delta badhta hai aur gain tez hota hai, khilaf jaye toh delta ghatta hai aur loss slow hota hai. Option buyer hamesha long gamma hota hai. Yeh sabse zyada expiry ke paas ATM options mein hota hai.`,
      how: `Gamma is the change in delta for a one-point move in the index. Near expiry, ATM gamma is high, so a small move can turn the option from nearly worthless to valuable. The price paid is theta, which is also highest then. So gamma and theta are two sides of one trade: the buyer pays decay each day for the chance of an accelerating gain. This is why expiry-day buying can pay off on a big move and lose on a quiet day.`,
      eg: {
        title: 'ATM call one day before expiry (illustrative)',
        text: `The 24,000 CE with 1 day left costs about ₹72, with delta about 0.51, gamma about 0.0023 per point and theta about −₹37 per day. If NIFTY rises 50 points, delta rises by about 0.0023 × 50 = 0.115 to about 0.62, so the gain per unit is more than 50 × 0.51. The cost is the ₹37 of decay per unit per day: on a flat day, 37 × 65 = ₹2,405 per lot is lost.`,
      },
      tip: `Long gamma is a trade-off, not an edge: you earn it only when the index moves more than the decay you pay.`,
      visual: { kind: 'curve', title: 'Gamma is highest at the money', caption: 'Delta changes fastest near the strike, especially close to expiry.', curve: 'gamma' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 1, iv: 14, rate: 6.5 }, why: 'Shows the high gamma and large theta of an ATM option one day before expiry.' },
    },
    {
      t: 10,
      def: `Hedging with options means buying an option to cap the risk of another position, such as a short option or futures. The bought option limits the loss if the market moves against the main position. It reduces risk but costs premium.`,
      hi: `Options se hedging ka matlab hai kisi dusre position ka risk limit karne ke liye option khareedna, jaise short option ya futures ke saath. Khareeda hua option tab loss limit karta hai jab market main position ke khilaf jaye. Isse risk kam hota hai par premium ki cost lagti hai.`,
      how: `A writer who sells an option has undefined risk on the call side. Buying a further OTM option as a "wing" turns the position into a defined-risk spread. The same logic protects futures. The hedge reduces the worst case and often also reduces margin, because SPAN margin recognises the offset. In exchange the trader gives up part of the premium he collected.`,
      eg: {
        title: 'Hedging a short call with a wing (illustrative)',
        text: `Sell the 24,000 CE at ₹198 and buy the 24,200 CE at ₹111 (7 days left). Net credit = 198 − 111 = ₹87 per unit, or 87 × 65 = ₹5,655 per lot. Maximum profit is ₹5,655 if NIFTY ends at or below 24,000. Maximum loss = (200 − 87) × 65 = ₹7,345 if NIFTY ends at or above 24,200. Without the bought call, the loss above 24,198 would have no upper limit.`,
      },
      tip: `A hedge is bought for protection, not profit. Decide the maximum premium you will pay for it and the exposure it covers before you place the trade.`,
      visual: { kind: 'payoff', title: 'Short 24,000 CE hedged with long 24,200 CE', caption: 'Profit and loss are both capped; the bought call is the hedge.', spot: 24000, legs: [{ type: 'CE', side: -1, strike: 24000, premium: 198 }, { type: 'CE', side: 1, strike: 24200, premium: 111 }] },
    },
  ],
  tools: [{ id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 82, expiryPrice: 24200, lotSize: 65, lots: 1 }, why: 'Test any buyer motive at different expiry prices.' }],
}
export default m
