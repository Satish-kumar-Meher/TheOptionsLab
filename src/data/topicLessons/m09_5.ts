import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '9.5',
  intro:
    `India VIX is the market's expected volatility, and implied volatility (IV) is one of the main ingredients of every option premium. When VIX and IV move, premiums move even if the index does not. This module connects VIX to CE and PE premiums, shows why a right directional call can still lose money, and explains why option buyers and sellers need to watch volatility and not just direction. All numbers below are illustrative Black-Scholes values (Nifty 24,000, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `India VIX market ki expected volatility batata hai, aur implied volatility (IV) har option premium ka ek bada hissa hota hai. Jab VIX ya IV badalta hai, toh index na hile tab bhi premium badal jaata hai. Is module mein dekhenge ki VIX CE aur PE premium se kaise juda hai, direction sahi hone par bhi loss kyun ho sakta hai, aur buyer ya seller ko sirf direction nahi, volatility bhi kyun dekhni chahiye. Saare numbers illustrative Black-Scholes values hain (Nifty 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `An option premium has two parts: intrinsic value (what it is worth if exercised now) and time value. Time value depends on how much time is left and on how much the market expects the underlying to move, which is implied volatility. India VIX summarises that expectation for Nifty options over the next 30 calendar days. Higher expected movement makes both calls and puts costlier, because both have more chance of ending in the money. VIX says how big a move is expected, not which way.`,
    conceptHi:
      `Option premium ke do hisse hote hain: intrinsic value (abhi exercise karein toh kitna milega) aur time value. Time value time bacha hua aur market kitna hilne wala hai, yaani implied volatility, par depend karti hai. India VIX agle 30 calendar days ke liye Nifty options ki yeh expectation ek number mein batata hai. Zyada expected movement ka matlab CE aur PE dono mehnge, kyunki dono ke in-the-money ending ke chances badh jaate hain. VIX bada move batata hai, direction nahi.`,
    mechanism:
      `The sensitivity of a premium to a one-point change in IV is called vega. At-the-money options with more time left have the largest vega; options close to expiry have small vega but large theta. Vega affects calls and puts in the same direction: when IV rises, both gain; when IV falls, both lose. Theta works against the buyer every day, so the net result on any given day is the sum of delta (direction), vega (volatility) and theta (time). VIX is a 30-day index measure, while an individual strike's IV can move differently from VIX, especially near expiry.`,
    example: {
      title: 'Nifty 24,000 ATM, 7 days to expiry (illustrative)',
      text: `At IV 14% the 24,000 CE costs about ₹200.85 and the 24,000 PE about ₹170.95. If IV rises to 18% with spot and time unchanged, the CE becomes about ₹253.76 and the PE about ₹223.86. Each gains ₹52.91, which is 4 points × vega 13.22. For one lot of 65 that is about ₹3,439 on each side. The index did not move at all.`,
    },
    chart: {
      kind: 'bars',
      title: '7-day ATM premium at different IV (illustrative, ₹)',
      caption: 'Calls and puts both get costlier as IV rises. The straddle (CE + PE) at IV 12, 14 and 18.',
      unit: ' ₹',
      items: [
        { label: 'Straddle at IV 10%', value: 266.09, tone: 'ice' },
        { label: 'Straddle at IV 12%', value: 318.92, tone: 'ice' },
        { label: 'Straddle at IV 14%', value: 371.79, tone: 'gold' },
        { label: 'Straddle at IV 18%', value: 477.63, tone: 'gold' },
      ],
    },
    optionChain:
      `The chain shows an IV column per strike. When VIX jumps, compare the same strike's premium and IV with yesterday: if LTP rose while spot is flat, IV did most of the work. Watch which side's IV rises faster; downside strikes often carry higher IV in stress, a topic covered under skew. Do not assume the whole chain moves in lockstep with VIX; near-expiry strikes can show IV that differs a lot from the 30-day VIX number.`,
    psychology:
      `Buyers focus on direction and forget that they are also paying for expected volatility. When VIX is high, premiums feel "expensive" but the fear of missing a big move pushes many to buy anyway. Sellers see fat premiums and feel safe, ignoring that expected movement is high for a reason. A useful habit is to ask two questions before every trade: what is my view on direction, and is the volatility I am paying or collecting fairly priced?`,
    scenarios: {
      bullish:
        `A steady rally with falling VIX (calm up-move) often helps a call buyer less than expected because vega works against them while delta helps. A sharp rally with rising VIX helps the call on both counts.`,
      bearish:
        `Falls are usually accompanied by rising VIX, so a put buyer often gains from both delta and vega at the same time. A slow bleed with falling VIX can still leave the put with a smaller gain than the index move suggests.`,
      sideways:
        `If the market stays in a range but IV rises ahead of an event, premiums can rise for buyers even without a move. If IV drifts down and time passes, both CE and PE lose value and sellers may benefit.`,
    },
    practice: [
      {
        q: `ATM vega is ₹13.22 per lot-unit per IV point. By how much does a 24,000 CE move if IV rises 3 points, and what is that for one lot of 65?`,
        a: `3 × 13.22 = ₹39.66 per unit. For one lot: 39.66 × 65 = about ₹2,578 (other things unchanged).`,
      },
      {
        q: `The 7-day 24,000 straddle costs ₹371.79 (IV 14%). Find the two expiry breakeven levels.`,
        a: `Lower breakeven = 24,000 − 371.79 = 23,628.21. Upper = 24,000 + 371.79 = 24,371.79. The index must finish outside this band at expiry for the buyer to profit.`,
      },
      {
        q: `A 24,000 CE bought at ₹200.85 (7 days, IV 14%) is worth ₹233.89 one day later with spot unchanged and IV 18%. Split the change into vega and theta effects.`,
        a: `Total = 233.89 − 200.85 = +₹33.04. With IV held at 14% the option would be ₹184.89 (theta −15.96). IV rise adds 233.89 − 184.89 = +49.00. So −15.96 + 49.00 = +33.04.`,
      },
      {
        q: `Which has more vega: a 1-day or a 30-day ATM call? Use vega 5.01 (1 day) and 27.13 (30 days).`,
        a: `The 30-day call: 27.13 vs 5.01 per IV point. Long-dated options are far more sensitive to volatility, while near-expiry options are more sensitive to time decay and spot.`,
      },
    ],
    assignment:
      `Open a Black-Scholes or the Greeks calculator on this site. Price a 24,000 CE and PE for 7 days at IV 12, 14, 16 and 18. Record premium, vega and theta in a table, then compute the straddle at each IV and the percentage increase from 12 to 18. Write two sentences on what this means for someone planning to buy options before an event.`,
  },
  topics: [
    {
      t: 1,
      def: `A call premium rises when implied volatility rises and falls when it drops, other things unchanged. A higher chance of a big move increases the chance that the call ends in the money, so sellers demand more and buyers accept paying more.`,
      hi: `Implied volatility badhne par call premium badhta hai aur girne par ghatta hai, baaki cheezein same rakhein toh. Bade move ka chance badhta hai toh call ke in-the-money jaane ke chances badhte hain, isliye seller zyada maangta hai aur buyer dene ko ready hota hai.`,
      how: `Vega is the Greek that measures this, and it is positive for every long option. An ATM call with a week to go has a vega of about ₹13 per IV point per unit on Nifty; OTM calls have somewhat smaller vega in rupee terms but can change by a bigger percentage of their price. In Indian markets IV on calls is often lower than on equidistant puts in the index, so a VIX spike tends to lift puts more in percentage terms, but calls still gain. VIX changes are a 30-day measure; the weekly expiry strike's IV can differ.`,
      eg: {
        title: '24,200 CE with 14 days to go',
        text: `At IV 14% a 24,200 CE costs about ₹199.29 (spot 24,000). If IV rises to 18% and nothing else changes, it costs about ₹273.20, up ₹73.91. For one lot of 65 that is ₹4,804.15 of extra premium with the index at the same level. This is illustrative; real IV changes are rarely this clean.`,
      },
      tip: `A call buyer is long vega. A rise in VIX helps even if spot does not move; a fall in VIX hurts even if spot rises a little.`,
      visual: {
        kind: 'curve',
        title: 'Vega is largest near the money',
        caption: 'Calls and puts at the same strike share the same vega.',
        curve: 'vega',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24200, days: 14, iv: 14, rate: 6.5 },
        why: `Change IV from 14 to 18 and watch the 24,200 CE premium move with spot fixed.`,
      },
    },
    {
      t: 2,
      def: `A put premium also rises when implied volatility rises. Volatility is about the size of the move, so more expected movement raises the value of protection on the downside as well as the upside bet.`,
      hi: `Put ka premium bhi tab badhta hai jab implied volatility badhti hai. Volatility move ke size ki baat karti hai, isliye zyada expected movement se downside protection ki value bhi badhti hai, sirf call wali bet ki nahi.`,
      how: `Put and call at the same strike and expiry have the same vega, a result that follows from put-call parity. In the real market, falls tend to come with rising VIX, so put buyers often earn from both falling spot (delta) and rising IV (vega). Institutions that buy index puts to hedge portfolios push demand into puts before events, which can lift put IV sooner than call IV. That does not mean puts will always be profitable; a fast IV drop after the event can erase a gain.`,
      eg: {
        title: '23,800 PE with 14 days to go',
        text: `At IV 14% a 23,800 PE costs about ₹151.69 with spot 24,000. At IV 18% it costs about ₹221.86, up ₹70.17, or ₹4,561 per lot of 65. If the market also fell 100 points at the same time, the put would gain on delta too. Numbers are illustrative.`,
      },
      tip: `Puts are not only a falling-market tool; they are also a volatility position. Buying puts when VIX is already high means paying a rich price for protection.`,
      visual: {
        kind: 'compare',
        title: 'Same vega, different delta',
        caption: 'Both gain from a volatility rise; direction decides the rest.',
        left: { head: 'Long CE', tone: 'bull', points: ['Delta positive', 'Vega positive', 'Theta negative'] },
        right: { head: 'Long PE', tone: 'bear', points: ['Delta negative', 'Vega positive', 'Theta negative'] },
      },
    },
    {
      t: 3,
      def: `When expected volatility rises, premiums on both sides of the option chain tend to rise together. This is why a trader who is neither bullish nor bearish but expects big movement can buy a CE and a PE, and why sellers on both sides can lose at once if volatility jumps.`,
      hi: `Jab expected volatility badhti hai, option chain ke dono taraf ke premium saath mein badhte hain. Isiliye jo trader bullish ya bearish nahi hai par bade move ki ummeed rakhta hai woh CE aur PE dono khareed sakta hai, aur dono taraf ke sellers ek saath loss mein ja sakte hain jab volatility achanak badhe.`,
      how: `The straddle price is a good summary: it is roughly 0.8 times the one-standard-deviation expected move, so a rise in IV scales the whole straddle up. A short straddle seller therefore faces two risks: a big move in either direction and a rise in IV that increases the mark-to-market value of what they sold. SPAN margin on short options also tends to rise when volatility rises, so a seller may face higher margin requirements just when the position is under stress.`,
      eg: {
        title: '7-day straddle as IV rises',
        text: `With spot 24,000 and 7 days left, the 24,000 straddle is about ₹371.79 at IV 14% (CE 200.85 + PE 170.95) and about ₹477.63 at IV 18% (CE 253.76 + PE 223.86). That is ₹105.84 more per unit, or ₹6,880 per lot of 65. A short-straddle seller would see that as a mark-to-market loss before any index move.`,
      },
      tip: `Check both sides of the chain after a VIX jump. If both CE and PE rose, the gain came from volatility, not direction.`,
      visual: {
        kind: 'bars',
        title: '24,000 straddle at 7 days (₹)',
        unit: ' ₹',
        items: [
          { label: 'IV 14%', value: 371.79, tone: 'ice' },
          { label: 'IV 18%', value: 477.63, tone: 'gold' },
        ],
      },
      calc: {
        id: 'straddle-move',
        preset: { spot: 24000, cePrice: 200.85, pePrice: 170.95, strike: 24000 },
        why: `Converts the straddle price into the implied move and breakeven levels.`,
      },
    },
    {
      t: 4,
      def: `Premium can rise in a market that goes nowhere if implied volatility rises faster than time decay eats the premium. Traders expecting an event, a gap or a sudden news flow bid up options even though the index is still flat.`,
      hi: `Market sideways rahe tab bhi premium badh sakta hai agar implied volatility time decay se tez badhe. Jab traders ko koi event, gap ya news aane ki ummeed hoti hai toh woh options ko bid karte hain, chahe index abhi flat ho.`,
      how: `Each day theta removes some premium, but a rise in IV adds premium via vega. Whichever is bigger decides the day's result. This is common in the days before a Budget, RBI policy, US Fed decision, election results or major earnings. Index sellers who assumed "nothing is happening, so premium will fall" are sometimes hit by exactly this IV expansion. The reverse also applies: a quiet calendar with falling VIX lets premiums bleed even if the index wiggles.`,
      eg: {
        title: 'One flat day before an event',
        text: `A 24,000 CE with 7 days left at IV 14% is worth ₹200.85. One day later, spot is still 24,000 and IV has risen to 18%. The same option with 6 days left is worth ₹233.89, up ₹33.04. With IV unchanged it would have been ₹184.89, a loss of ₹15.96 to theta. IV added ₹49.00. Illustrative.`,
      },
      tip: `Sideways does not mean premiums fall. Check whether IV is rising before assuming time decay will pay the seller.`,
      visual: {
        kind: 'timeline',
        title: 'Flat index, rising premium',
        events: [
          { when: 'Day 1', what: 'Spot 24,000, IV 14%, CE ₹200.85', tone: 'ice' },
          { when: 'Day 2', what: 'Spot 24,000, IV 18%, CE ₹233.89', tone: 'gold' },
          { when: 'Cause', what: 'Vega +49.00 outweighs theta −15.96', tone: 'neutral' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 6, iv: 18, rate: 6.5 },
        why: `Price the same strike at IV 14 and 18 with 6 days left and compare.`,
      },
    },
    {
      t: 5,
      def: `You can be right about direction and still lose on the option, because premium also depends on time and implied volatility. If IV falls and time passes while spot moves only a little, the loss from those two can exceed the gain from delta.`,
      hi: `Direction sahi ho tab bhi option mein loss ho sakta hai, kyunki premium time aur implied volatility par bhi depend karta hai. Agar IV gire aur time nikle jabki spot thoda hi hila ho, toh in dono ka loss delta ke gain se bada ho sakta hai.`,
      how: `Think of a day's change in premium as three pieces: delta times spot move, vega times IV change, theta for one day. A small favourable spot move gives a small delta gain. A drop of several IV points can take away much more. This is most common when buying OTM options after IV has already been elevated, such as after a news-driven jump. The fix is to buy when IV is low or reasonable relative to history, choose a strike and expiry that give the move room to pay, or use spreads that cancel part of the vega.`,
      eg: {
        title: 'Right direction, losing option',
        text: `A trader buys a 24,100 CE with 3 days left at IV 16% when spot is 24,000. Price is about ₹99.89. Next day spot rises 60 points to 24,060 (correct view) but IV falls to 12% with 2 days left. The CE is now about ₹70.53, a loss of ₹29.36 per unit, or ₹1,908 per lot of 65. Had IV stayed at 16%, it would be about ₹98.74, roughly flat.`,
      },
      tip: `Being right about direction is necessary but not sufficient for an option buyer. You also need the move to be big enough and fast enough to beat theta and any IV drop.`,
      visual: {
        kind: 'flow',
        title: 'Why a correct view can still lose',
        steps: [
          { label: 'Spot +60 pts', note: 'Delta gain', tone: 'bull' },
          { label: 'IV 16% to 12%', note: 'Vega loss', tone: 'bear' },
          { label: '1 day passes', note: 'Theta loss', tone: 'bear' },
          { label: 'Premium ₹99.89 to ₹70.53', note: 'Net −₹29.36', tone: 'neutral' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24060, strike: 24100, days: 2, iv: 12, rate: 6.5 },
        why: `Compare with IV 16 to see how much of the loss is volatility.`,
      },
    },
    {
      t: 6,
      def: `Vega is how much an option's price changes for a one-percentage-point change in implied volatility. VIX is the index of expected Nifty volatility, so VIX movements are a rough signal of what IV is doing across the chain.`,
      hi: `Vega batata hai ki implied volatility mein ek percentage point ke badlav se option ka price kitna badalta hai. VIX Nifty ki expected volatility ka index hai, isliye VIX ka move poori chain mein IV ke kya ho raha hai uska ek rough signal deta hai.`,
      how: `Vega is highest for ATM options and grows with time to expiry (it scales with the square root of time). An ATM 30-day call has about five times the vega of an ATM 1-day call in the example below. Vega is not constant: as IV or spot changes, vega itself changes. VIX is built from near and next-month Nifty option prices, so it follows the front of the surface; a weekly strike's IV can move more or less than VIX in a given session, and the relationship is not one-to-one.`,
      eg: {
        title: 'Vega across expiries (illustrative)',
        text: `ATM 24,000 CE at IV 14%: with 1 day left vega is about ₹5.01 per unit per IV point; with 7 days, ₹13.22; with 30 days, ₹27.13. For one lot of 65, a 7-day ATM call changes by about ₹860 per IV point (13.22 × 65 = 859.3 roughly), while a 30-day call changes by about ₹1,763.`,
      },
      tip: `Long-dated options are the vega instruments; near-expiry options are the gamma and theta instruments. Match the option to the view you want.`,
      visual: {
        kind: 'bars',
        title: 'ATM CE vega by days to expiry (₹ per IV point)',
        unit: ' ₹',
        items: [
          { label: '1 day', value: 5.01, tone: 'ice' },
          { label: '7 days', value: 13.22, tone: 'ice' },
          { label: '30 days', value: 27.13, tone: 'gold' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 30, iv: 14, rate: 6.5 },
        why: `Vary days to see how vega scales with time.`,
      },
    },
    {
      t: 7,
      def: `IV crush is the sharp fall in implied volatility right after a known event passes, because the uncertainty has been resolved. Option premiums can drop heavily even if the event moves the index.`,
      hi: `IV crush matlab kisi known event ke baad implied volatility ka achanak gir jaana, kyunki uncertainty khatam ho gayi. Event se index hile tab bhi option premium kaafi gir sakta hai.`,
      how: `Before an event such as the Union Budget, an RBI policy, the US Fed decision or Lok Sabha result day, traders pay up for options and IV rises. Once the news is out, the unknown becomes known and IV usually drops quickly. The buyer needs a move large enough to overcome both the drop in IV and the passing of time. The seller may collect much of the crush, but takes the risk that the event move is bigger than priced. In June 2024 the Nifty fell about 6% on the election-result day, an example of how a big event move and a volatility spike can arrive together; every event differs, so do not copy a past pattern.`,
      eg: {
        title: 'Straddle before and after an event (illustrative)',
        text: `Three days before the event, IV is 22% and the 24,000 straddle costs ₹381.96 (CE 197.39 + PE 184.57). After the event, IV falls to 14% with 2 days left. If Nifty stays at 24,000, the straddle is worth ₹198.53, a fall of ₹183.43 per unit (₹11,923 per lot of 65). If Nifty rises 50 points to 24,050, the CE is ₹131.32 and the PE is ₹72.77, totalling ₹204.09. The CE bought at ₹197.39 is down ₹66.07 even though the index rose.`,
      },
      tip: `Buying options just before a known event means you pay the highest IV of the cycle. The move must beat the crush, not just the direction.`,
      visual: {
        kind: 'timeline',
        title: 'IV around a known event',
        events: [
          { when: 'Run-up', what: 'IV rises, premiums expand', tone: 'gold' },
          { when: 'Event', what: 'Spot gaps or moves; uncertainty resolved', tone: 'neutral' },
          { when: 'After', what: 'IV falls; premiums can drop even on a move', tone: 'bear' },
        ],
      },
      calc: {
        id: 'straddle-move',
        preset: { spot: 24000, cePrice: 197.39, pePrice: 184.57, strike: 24000 },
        why: `See the implied move the market was pricing before the event.`,
      },
    },
    {
      t: 8,
      def: `Option sellers earn when premium decays, and in a calm market they often do. Volatility matters because a rise in IV makes the position more costly to hold, and a large move can cause losses far bigger than the premium collected.`,
      hi: `Option seller ko tab kamai hoti hai jab premium decay hota hai, aur calm market mein aksar hota bhi hai. Volatility isliye matter karti hai kyunki IV badhne se position hold karna mehnga ho jaata hai, aur bada move aaye toh loss collected premium se bahut zyada ho sakta hai.`,
      how: `Selling when IV is high collects more premium and gives a wider breakeven, but high IV exists because the market sees a bigger risk. Selling when IV is low gives thin premium for the same risk of a sudden move. Sellers must provide margin (SPAN plus exposure) to the clearing corporation, and that margin can rise when volatility rises, forcing sellers to add funds or cut the position. Undefined-risk short options can lose many times the premium; defined-risk spreads cap the loss but also cap the reward. Selling is not "safe" or "high win rate equals profit"; it is a trade of frequent small gains against occasional large losses.`,
      eg: {
        title: 'Short 24,000 straddle for 7 days (illustrative)',
        text: `Sell at IV 14%: collect ₹371.80 (about ₹24,167 per lot of 65). One day later, spot unchanged: if IV rises to 18% the straddle is worth ₹442.15, a mark-to-market loss of ₹70.35 (₹4,573 per lot). If IV instead falls to 11% it is worth ₹270.69, a gain of ₹101.11 (₹6,572 per lot). The seller's breakevens at expiry are about 23,628 and 24,372; a move beyond them loses money.`,
      },
      tip: `A seller is short vega. Before selling, ask what a 4-point IV rise and a 2x expected move would cost you, not only what the premium pays.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,000 straddle at expiry',
        caption: 'Maximum gain is the premium; the loss grows on both sides.',
        spot: 24000,
        legs: [
          { type: 'CE', side: -1, strike: 24000, premium: 200.85 },
          { type: 'PE', side: -1, strike: 24000, premium: 170.95 },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24000, premium: 200.85, expiryPrice: 24372, lotSize: 65, lots: 1 },
        why: `Test the short call leg at a large move beyond the breakeven.`,
      },
    },
    {
      t: 9,
      def: `Option buyers pay premium for the right to benefit from a move. Volatility matters because they pay for expected movement in advance; if actual movement is less than what was priced in, they lose even if direction is right.`,
      hi: `Option buyer premium dekar move ka fayda lene ka right kharidta hai. Volatility isliye matter karti hai kyunki woh expected movement ka daam pehle hi chukata hai; agar asli movement priced-in se kam nikli toh direction sahi hone par bhi loss hota hai.`,
      how: `The buyer's profit needs realised movement to exceed what implied volatility had priced. Buying when IV is low relative to its own recent range, or when a big move is likely but not yet fully priced, improves the odds a little; buying after IV has spiked costs more for the same payoff. Buyers have limited loss (the premium) but time works against them every day. Many buyers reduce vega risk by choosing spreads, such as buying one strike and selling a further one, which gives away some upside to cut the cost and the sensitivity to IV.`,
      eg: {
        title: 'Long 24,000 CE with a rally (illustrative)',
        text: `Buy a 24,000 CE at ₹200.85 with 7 days left (IV 14%). A day later Nifty is 24,150, so the market has moved your way by 150 points. If IV stays 14%, the call is about ₹274.17 (gain ₹73.32). If IV slips to 12%, it is about ₹251.82 (gain ₹50.97). The 2-point IV fall took away about ₹22.35 per unit, roughly ₹1,453 per lot of 65.`,
      },
      tip: `Buy volatility when it is cheap, not just when you are bullish or bearish. Check the IV percentile before paying up.`,
      visual: {
        kind: 'matrix',
        title: 'Buyer outcomes: direction and volatility',
        xLabels: ['IV rises', 'IV falls'],
        yLabels: ['Direction right', 'Direction wrong'],
        cells: [
          { head: 'Strong gain', note: 'Delta and vega both help', tone: 'bull' },
          { head: 'Gain may shrink', note: 'Vega takes part of it', tone: 'gold' },
          { head: 'Loss may be cushioned', note: 'Vega offsets delta loss', tone: 'ice' },
          { head: 'Largest loss', note: 'Delta, vega and theta all hurt', tone: 'bear' },
        ],
      },
    },
  ],
  tools: [
    { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: `Price and vega for any strike, IV and days.` },
    { id: 'straddle-move', preset: { spot: 24000, cePrice: 200.85, pePrice: 170.95, strike: 24000 }, why: `Implied move from the ATM straddle.` },
  ],
}
export default m
