import type { ModuleLesson } from '../topicLessonTypes'

/* Module 16.3 — Dealer and Gamma Exposure.
 * Illustrative numbers: NIFTY 24,000, lot 65 (check the current NSE contract specification), IV 14%, 5 days, r 6.5%, q 1.3% (Black–Scholes, src/lib/bs.ts).
 * Illustrative book (OI in lots, dealer sign ASSUMED): short CE 24,000 (30,000), short CE 24,200 (50,000), short CE 24,400 (40,000),
 * long PE 23,800 (60,000), long PE 23,600 (40,000), long PE 24,000 (25,000). Net dealer gamma (delta-units per index point) at spot:
 * 23,800 = +2,958; 23,900 = +1,509; 24,000 = −117; 24,100 = −1,675; 24,200 = −2,945. Zero crossing ≈ 23,993.
 * NSE does not publish who is long or short, so any real-world GEX figure rests on an assumption about dealer positions. */
const m: ModuleLesson = {
  moduleId: '16.3',
  intro: `Dealers (market makers and trading desks) hedge the options they hold, and the way they hedge depends on whether they are net long or net short gamma. When they are long gamma, hedging tends to calm the market; when they are short gamma, hedging can push the market further in the direction it is already moving. This module explains that mechanism and, just as important, why any gamma-exposure number for India is an estimate and not a fact.`,
  introHi: `Dealers (market makers aur trading desks) apne options ko hedge karte hain, aur kaise hedge karte hain yeh is par depend karta hai ki woh net long gamma hain ya short gamma. Long gamma mein hedging market ko shaant karti hai; short gamma mein hedging market ko usi direction mein aur dhakel sakti hai jisme woh pehle se chal raha hai. Yeh module is mechanism ko samjhata hai, aur yeh bhi ki India ke liye koi bhi gamma-exposure number ek anuman hai, fact nahi.`,
  steps: {
    concept: `Gamma is the rate at which an option's delta changes when the index moves. Add up the gamma of every option a dealer holds, with the sign (long positive, short negative), and you get the dealer's net gamma. The sign decides whether their hedging trades fight the market's move or add to it.`,
    conceptHi: `Gamma woh rate hai jisse index move hone par option ka delta badalta hai. Dealer ke saare options ka gamma sign ke saath jod do (long positive, short negative), toh dealer ka net gamma milta hai. Yeh sign tay karta hai ki unke hedging trades market ke move ka virodh karenge ya usse badhayenge.`,
    mechanism: `A dealer who is long gamma gets longer delta when spot rises, so it sells futures to get back to neutral; when spot falls it buys. That is selling high and buying low, which dampens moves. A dealer who is short gamma does the opposite: it buys as the market rises and sells as it falls, which amplifies moves. The size of the effect depends on the amount of gamma, the distance from the strikes and the time to expiry. The inputs to any estimate are open interest by strike, a model for gamma and an assumption about which side dealers are on; the exchange does not publish the last.`,
    example: {
      title: 'An illustrative dealer book, net gamma by spot level',
      text: `Assume dealers are short 30,000 lots of 24,000 CE, 50,000 of 24,200 CE and 40,000 of 24,400 CE, and long 60,000 lots of 23,800 PE, 40,000 of 23,600 PE and 25,000 of 24,000 PE (lot 65, 5 days to expiry, IV 14%). Net gamma, in delta-units per index point, is +2,958 at spot 23,800, +1,509 at 23,900, −117 at 24,000, −1,675 at 24,100 and −2,945 at 24,200. The sign flips near 23,993. Below that spot the book is long gamma (hedging tends to dampen); above it the book is short gamma (hedging tends to amplify). The sign assumption is the whole story: change who is long and short and the picture reverses.`,
    },
    chart: {
      kind: 'bars',
      title: 'Illustrative net dealer gamma by spot (delta-units per point)',
      caption: 'Positive = long gamma (dampening), negative = short gamma (amplifying). Based on an assumed book; not observed data.',
      items: [
        { label: '23,800', value: 2958, tone: 'ice' },
        { label: '23,900', value: 1509, tone: 'ice' },
        { label: '24,000', value: -117, tone: 'gold' },
        { label: '24,100', value: -1675, tone: 'neutral' },
        { label: '24,200', value: -2945, tone: 'neutral' },
      ],
    },
    optionChain: `The chain gives you the raw ingredient, open interest by strike, but not the sign. Large OI at a strike near spot means the strike may carry large gamma, especially close to expiry, so hedging flows can be large around it. Whether those flows stabilise or accelerate depends on whether dealers are long or short those options, which OI alone cannot show. High OI is a potential level, not guaranteed support or resistance.`,
    psychology: `Retail traders see a market that "refuses to move" or "suddenly runs" and imagine a villain. Often it is mechanical: a long-gamma market tends to feel sticky and mean-reverting, which tempts people to sell premium; a short-gamma market tends to feel jumpy, which tempts people to chase. The danger is overconfidence in a model of something that cannot be observed directly.`,
    scenarios: {
      bullish: `If spot rises into a short-gamma zone, hedge buying may add to the rise and speed it up; the same rise into a long-gamma zone may meet hedge selling and slow down. A bullish view should state which zone price is entering, and what happens if the estimate is wrong.`,
      bearish: `A fall into a short-gamma zone may be accelerated by hedge selling and can overshoot. A fall into a long-gamma zone may attract hedge buying and stabilise. Remember that real volatility, news and institutional flows act at the same time.`,
      sideways: `When dealers are net long gamma and spot sits near heavy strikes, price often drifts in a narrow range as hedging pushes it back. That is a tendency, not a promise, and a news shock can break it.`,
    },
    practice: [
      { q: `A dealer is long 10,000 units of gamma 0.001 per point. Spot rises 50 points. How many delta-units must it sell to stay neutral?`, a: `Delta change = 10,000 × 0.001 × 50 = 500 units. As a long-gamma dealer its delta rose, so it sells 500 units, about 7.7 lots of 65 (500 ÷ 65 = 7.69).` },
      { q: `The same dealer is short that gamma. Spot rises 50 points. What does it do?`, a: `Its delta falls by 500 units, so it buys 500 units (about 7.7 lots). It buys into a rise, which can amplify the move.` },
      { q: `Net gamma is +1,509 at 23,900 and −117 at 24,000. Find the approximate flip level.`, a: `Linear interpolation: 23,900 + 100 × 1,509 ÷ (1,509 + 117) = 23,900 + 100 × 0.928 ≈ 23,993.` },
      { q: `Why can't you read a real GEX figure straight from the NSE option chain?`, a: `The chain shows OI but not who is long or short. A GEX figure needs an assumption about dealer positions, and the result depends on that assumption.` },
    ],
    assignment: `Take today's NIFTY chain for the nearest expiry. Choose three strikes with large OI and, using the greeks calculator, note the gamma of each at current spot. Write two lines on which strike has the most gamma per contract and why, and state that you do not know the dealers' side.`,
  },
  topics: [
    {
      t: 1,
      def: `Dealer positioning means the options and hedges that market makers and trading desks hold, net. It matters because their hedging is mechanical, and it depends on what they hold.`,
      hi: `Dealer positioning ka matlab hai market makers aur trading desks ke paas jo options aur hedges hain, net basis par. Yeh isliye matter karta hai ki unki hedging mechanical hoti hai aur woh unki holding par depend karti hai.`,
      how: `Dealers take the other side of client flow. If clients mostly buy puts for protection and sell covered calls, dealers may end up long calls and short puts; if clients mostly buy calls, dealers end up short calls. These patterns are plausible, not certain, and change daily. NSE's participant-wise OI data separates client, proprietary, FII and DII categories, which is useful but is not a view of dealer books. Any statement about "dealer positioning" in India is therefore an inference.`,
      eg: {
        title: 'Two possible dealer books, one chain',
        text: `Suppose the 24,200 CE has 50,000 lots of OI. If clients are net buyers, dealers are short 50,000 lots (3,25,000 units of 65), and at gamma 0.00091 that is −2,957 delta-units per point (0.00091 × 3,25,000 = 295.75, then ×10 because 50,000 lots... use the totals directly: 325,000 × 0.00091 = 295.75). Hence short gamma of about 296 per point if only the net of one side, which is far smaller than the book total quoted in the module header; the point is the sign: if clients were net sellers instead, the same OI would give +296.`,
      },
      tip: `Positioning is inferred, not observed. Treat any dealer-flow story as a hypothesis with a stated assumption.`,
      visual: { kind: 'compare', title: 'Same OI, opposite dealer sign', left: { head: 'Clients net buy calls', tone: 'gold', points: ['Dealers short calls', 'Short gamma', 'Hedge with the move'] }, right: { head: 'Clients net sell calls', tone: 'ice', points: ['Dealers long calls', 'Long gamma', 'Hedge against the move'] } },
    },
    {
      t: 2,
      def: `A dealer is long gamma when it owns more option convexity than it has sold. Its delta moves in the direction of price, so to stay neutral it must trade against the move.`,
      hi: `Dealer long gamma tab hota hai jab uske paas bechne se zyada option convexity hoti hai. Uska delta price ki direction mein badalta hai, isliye neutral rehne ke liye use move ke against trade karna padta hai.`,
      how: `Long options (calls or puts) have positive gamma. As spot rises, a long call's delta rises, so the dealer is longer and sells some futures; as spot falls it buys. Each such trade locks in a small profit relative to the re-hedge price, which is the benefit of being long gamma, paid for by the theta it loses each day. The result for the market is selling into rallies and buying into dips.`,
      eg: {
        title: 'Hedging as a long-gamma dealer',
        text: `A dealer is long 6,500 units of ATM calls, hedged at spot 24,000. Gamma 0.00101 means delta moves 6.565 units per point. Spot rises 50 points: delta rises by 328 units, so it sells 328 units (about 5 lots) at 24,050. If spot then falls back to 24,000, it buys 328 units back at 24,000: a profit of 50 × 328 = ₹16,400 from the round trip, against theta paid of about ₹1,13,199 per day (model figure), so it needs several such swings to cover the time decay.`,
      },
      tip: `Long gamma earns from movement and pays time decay; short gamma is the reverse.`,
      visual: { kind: 'flow', title: 'Long-gamma hedge loop', steps: [{ label: 'Spot rises', tone: 'bull' }, { label: 'Dealer delta rises', note: 'long call', tone: 'gold' }, { label: 'Dealer sells futures', note: 'to neutralise', tone: 'gold' }, { label: 'Selling slows the rise', note: 'dampening', tone: 'neutral' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 5, iv: 14, rate: 6.5 }, why: 'Read the gamma that sets the size of the hedge trade.' },
    },
    {
      t: 3,
      def: `A dealer is short gamma when it has sold more option convexity than it owns. Its delta moves against the price move, so it must trade with the move to stay neutral.`,
      hi: `Dealer short gamma tab hota hai jab usne kharide hue se zyada option convexity bechi hoti hai. Uska delta price move ke against badalta hai, isliye neutral rehne ke liye use move ke saath trade karna padta hai.`,
      how: `Short options have negative gamma. When spot rises, a short call's delta (for the dealer) becomes more negative, so the dealer buys futures; when spot falls it sells. This is buying after a rise and selling after a fall, which costs money each time, and is paid for by theta. Short gamma is most dangerous when moves are large and fast, close to expiry and near heavy strikes.`,
      eg: {
        title: 'Hedging as a short-gamma dealer',
        text: `A dealer is short 6,500 units of ATM calls. Spot rises 50 points and its delta moves by −328 units, so it buys 328 units at 24,050. If spot then reverses to 24,000, it sells those 328 units at 24,000 and books a loss of 50 × 328 = ₹16,400. Over a day with several such swings, that loss can exceed the theta of ₹1,13,199 earned from the same position.`,
      },
      tip: `Short gamma looks profitable on quiet days because theta flows in; the loss is rare and large.`,
      visual: { kind: 'flow', title: 'Short-gamma hedge loop', steps: [{ label: 'Spot rises', tone: 'bull' }, { label: 'Dealer delta falls', note: 'short call', tone: 'gold' }, { label: 'Dealer buys futures', note: 'to neutralise', tone: 'gold' }, { label: 'Buying adds to the rise', note: 'amplifying', tone: 'neutral' }] },
    },
    {
      t: 4,
      def: `Positive gamma exposure (positive GEX) is an estimate that dealers as a group are net long gamma. In that state their hedging tends to dampen price moves.`,
      hi: `Positive gamma exposure (positive GEX) ek anuman hai ki dealers ka group net long gamma hai. Is state mein unki hedging price moves ko dabane ki taraf jaati hai.`,
      how: `Under positive GEX, rallies meet hedge selling and dips meet hedge buying, so realised volatility tends to be lower and the index may stay in a range, "pinned" near heavy strikes. Option sellers do well in such conditions, and long option buyers pay time decay with little movement. This is an observed tendency across markets, not a law, and large news can override it. The size of any effect also depends on how much dealer gamma there is compared with other flows such as institutions.`,
      eg: {
        title: 'Net gamma at 23,800',
        text: `In the illustrative book, net gamma at spot 23,800 is +2,958 delta-units per point. If spot rises 20 points to 23,820, dealer delta rises by roughly 2,958 × 20 = 59,160 units (about 910 lots of 65), which they sell. That selling is against the move. The positive sign is the cause; the 910-lot size shows why it can matter for NIFTY futures.`,
      },
      tip: `Positive GEX does not forbid a big move; it only changes how dealer hedging responds to a move.`,
      visual: { kind: 'candles', title: 'Positive GEX: range-bound tendency', pattern: 'range' },
    },
    {
      t: 5,
      def: `Negative gamma exposure (negative GEX) is an estimate that dealers as a group are net short gamma. Their hedging then tends to push price in the direction it is already moving.`,
      hi: `Negative gamma exposure (negative GEX) ek anuman hai ki dealers ka group net short gamma hai. Tab unki hedging price ko usi direction mein aur dhakel sakti hai jisme woh pehle se chal raha hai.`,
      how: `Under negative GEX, rallies meet hedge buying and falls meet hedge selling, so moves can extend, gaps can run and intraday swings can be larger than usual. This is more pronounced near expiry when gamma is high. For buyers of options this can mean cheaper-than-expected movement paying off; for sellers it is the environment of greatest risk. Because the estimate is uncertain, treat it as a reason for caution rather than a signal.`,
      eg: {
        title: 'Net gamma at 24,100',
        text: `At spot 24,100, the illustrative book has −1,675 delta-units per point. If spot rises from 24,000 (−117) to 24,100 (−1,675), average gamma is about (−117 − 1,675) ÷ 2 = −896 per point, so dealer delta changes by about −896 × 100 = −89,600 units (about 1,378 lots), which they buy. That buying happens as price is already rising.`,
      },
      tip: `Under negative gamma, do not assume that a sharp move will quickly reverse; wait for evidence of a turn.`,
      visual: { kind: 'candles', title: 'Negative GEX: extension tendency', pattern: 'breakout' },
    },
    {
      t: 6,
      def: `Gamma exposure estimation is the process of computing net gamma from open interest, a pricing model and an assumed sign for dealers. The result is a profile of net gamma across possible spot levels.`,
      hi: `Gamma exposure estimation ka matlab hai open interest, ek pricing model aur dealers ke liye maane gaye sign se net gamma nikalna. Result ek profile hota hai jo alag-alag spot levels par net gamma dikhata hai.`,
      how: `Steps: take OI at each strike from NSE; for each strike compute gamma by Black–Scholes at the current IV and days to expiry; multiply by OI and lot size; apply the assumed sign (for example, dealers short calls and long puts); sum, and repeat at different spot levels. Weak points: the sign assumption, using one IV for all strikes, ignoring positions held at other expiries and the fact that OI is a stock, not who initiated the trade. Treat it as a map drawn with stated assumptions.`,
      eg: {
        title: 'One strike, one number',
        text: `24,200 CE: gamma 0.00091 per point per unit, OI 50,000 lots × 65 = 32,50,000 units. Gamma exposure = 0.00091 × 32,50,000 = 2,957.5 delta-units per point. Under the assumed sign (dealers short calls) it is −2,957.5; summed with the other strikes of the book it forms the net figure in the table.`,
      },
      tip: `Always write the assumptions next to the number: expiry, IV, sign convention. A GEX figure without them cannot be checked.`,
      visual: { kind: 'flow', title: 'Estimating GEX', steps: [{ label: 'OI by strike', note: 'from NSE', tone: 'ice' }, { label: 'Gamma per strike', note: 'Black–Scholes', tone: 'ice' }, { label: 'Multiply by OI and lot', tone: 'gold' }, { label: 'Apply assumed sign', note: 'the weak link', tone: 'neutral' }, { label: 'Sum across strikes', note: 'repeat at other spots', tone: 'gold' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24200, days: 5, iv: 14, rate: 6.5 }, why: 'Get the gamma of one strike for the estimate.' },
    },
    {
      t: 7,
      def: `The gamma flip level is the spot price at which estimated net dealer gamma changes sign. Above it, the model says dealers are short gamma; below it, long gamma (or the reverse, depending on the book).`,
      hi: `Gamma flip level woh spot price hai jahan estimated net dealer gamma ka sign badalta hai. Iske upar model kehta hai dealers short gamma hain; neeche long gamma (ya ulta, book ke hisaab se).`,
      how: `You find it by recomputing net gamma on a grid of spot prices and locating the zero crossing. Traders treat it as a zone where behaviour may change from calm to jumpy, so they watch whether price accepts above or below it. It moves every day as OI and expiry time change, and it can be wrong. It is not a support or resistance level by itself.`,
      eg: {
        title: 'Finding the flip',
        text: `Net gamma +1,509 at 23,900 and −117 at 24,000. Linear interpolation: flip = 23,900 + 100 × 1,509 ÷ (1,509 + 117) = 23,900 + 92.8 = 23,992.8, which we round to about 23,993. A trader would say "model flip near 23,990 to 24,000 zone", not a precise level.`,
      },
      tip: `Think of the flip as a zone, not a line. Moves of 20 to 30 points in either direction are within the noise of the estimate.`,
      visual: { kind: 'bars', title: 'Net gamma crosses zero near 24,000 (illustrative)', items: [{ label: '23,900', value: 1509, tone: 'ice' }, { label: '24,000', value: -117, tone: 'gold' }, { label: '24,100', value: -1675, tone: 'neutral' }] },
    },
    {
      t: 8,
      def: `Dealer hedging flows are the futures and spot trades that dealers make to stay delta-neutral as the index moves. They are mechanical, driven by the size of their gamma and the move.`,
      hi: `Dealer hedging flows woh futures aur spot trades hain jo dealers index move hone par delta-neutral rehne ke liye karte hain. Yeh mechanical hote hain aur unke gamma ke size aur move par depend karte hain.`,
      how: `Flow = net gamma × change in spot, in delta-units. Divide by the lot size (65) to count NIFTY futures lots. Compare it to normal futures volume to judge importance: a flow equal to a small share of the day's volume is minor, while a flow equal to a large share can matter. Dealers also hedge in baskets or Bank Nifty and may spread trades through the day, so the effect is smoother than the arithmetic suggests.`,
      eg: {
        title: 'Sizing a hedge flow',
        text: `Net short gamma of 1,675 units per point at 24,100 and a further 40-point rise: flow ≈ 1,675 × 40 = 67,000 units, which is 67,000 ÷ 65 = 1,031 lots of futures bought. Whether that is large depends on the day's futures volume; the same lots spread across an hour are far less visible.`,
      },
      tip: `Convert any flow into lots and compare with that day's volume before calling it important.`,
      visual: { kind: 'flow', title: 'From a spot move to a hedge order', steps: [{ label: 'Spot moves', tone: 'ice' }, { label: 'Delta changes', note: 'gamma × move', tone: 'gold' }, { label: 'Dealer trades futures', note: 'in lots of 65', tone: 'gold' }, { label: 'Order hits the market', tone: 'neutral' }] },
      calc: { id: 'portfolio-delta', preset: { d1: -0.26, q1: 6500, d2: 0, q2: 0, d3: 0, q3: 0 }, why: 'Compute a net delta from a position and convert to hedge size.' },
    },
    {
      t: 9,
      def: `Delta-hedging feedback is the loop in which hedging trades move the price, and the price move changes delta, which triggers more hedging. In short-gamma conditions the loop tends to amplify, and in long-gamma conditions it tends to damp.`,
      hi: `Delta-hedging feedback ek loop hai jisme hedging trades price ko move karte hain, price move se delta badalta hai, aur woh aur hedging trigger karta hai. Short gamma mein loop badhne ki taraf jaata hai aur long gamma mein dabne ki taraf.`,
      how: `The feedback strength depends on gamma, the speed of the move and how much liquidity absorbs the hedge orders. A thin market near the close of expiry day can make the loop stronger. Feedback does not need manipulation; it follows from many participants hedging by the same rule. Observing it from outside is hard, so look for confirmation: rising volume, widening spreads and moves that overshoot news.`,
      eg: {
        title: 'One cycle of the loop',
        text: `Short-gamma book at −1,675 units per point. Spot ticks up 10 points; dealers buy 16,750 units (258 lots). If that buying itself lifts price a further 3 points, they must buy a further 1,675 × 3 = 5,025 units (77 lots), and that in turn lifts price again. The loop converges if the extra move gets smaller each time; it explodes only if liquidity is thin and the extra move is as large as the first.`,
      },
      tip: `A feedback loop is a possible explanation of an overshoot, not proof of one. Check volume and spreads before attributing a move to it.`,
      visual: { kind: 'flow', title: 'The feedback loop', steps: [{ label: 'Price moves', tone: 'ice' }, { label: 'Delta changes', tone: 'gold' }, { label: 'Hedge order', tone: 'gold' }, { label: 'Price moves again', note: 'same or opposite direction', tone: 'neutral' }] },
    },
    {
      t: 10,
      def: `Gamma-related acceleration is a faster-than-normal move that coincides with short-gamma hedging; stabilisation is a muted, range-bound move that coincides with long-gamma hedging. Both are tendencies that can be overridden.`,
      hi: `Gamma-related acceleration ka matlab hai normal se tez move jo short-gamma hedging ke saath hota hai; stabilisation ka matlab hai dabi hui, range wali move jo long-gamma hedging ke saath hoti hai. Dono sirf tendencies hain jo override ho sakti hain.`,
      how: `Acceleration is most likely when: the book is short gamma, the expiry is near, price is moving through heavily traded strikes and news pushes spot in one direction. Stabilisation is most likely when the book is long gamma and price sits among heavy strikes. In both cases, other participants such as FIIs, DIIs and retail also trade, and their flows can dominate. A practical rule is to match your strategy to the regime: avoid being short premium in suspected short-gamma moves, and avoid paying time decay when stabilisation looks likely.`,
      eg: {
        title: 'Comparing two regimes with the same move',
        text: `Spot moves 100 points. Long-gamma regime near 23,800: net gamma about +2,200 per point on average, so about 2,200 × 100 = 2,20,000 units (about 3,385 lots) of hedge selling. Short-gamma regime near 24,100: about −900 to −2,945 per point, roughly −1,800 on average, so about 1,80,000 units (about 2,769 lots) of hedge buying. The same 100-point move therefore meets selling in one place and buying in the other.`,
      },
      tip: `Match the strategy to the regime: premium buying suits possible acceleration, premium selling suits possible stabilisation. Neither is guaranteed.`,
      visual: { kind: 'matrix', title: 'Gamma regime and what it tends to look like', xLabels: ['Long gamma', 'Short gamma'], yLabels: ['Calm news', 'Big news'], cells: [{ head: 'Pinned, range', note: 'sellers comfortable', tone: 'ice' }, { head: 'Jumpy, overshoots', note: 'sellers at risk', tone: 'gold' }, { head: 'Dips bought, rallies sold', note: 'moves may fade', tone: 'ice' }, { head: 'Fast trend', note: 'gaps can run', tone: 'gold' }] },
    },
  ],
  tools: [{ id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 5, iv: 14, rate: 6.5 }, why: 'Gamma and delta for the module\'s reference contract.' }],
}
export default m
