import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '13.2',
  intro:
    `Writers are not all trying to do the same thing. Some want income, some want to hedge a portfolio, some earn a spread as market makers, and some simply take a directional view by selling instead of buying. Understanding the motive tells you how a writer is likely to behave when the market moves. Writers earn only the premium while carrying large risk, so the reasons below are motives, not guarantees. Numbers are illustrative Black-Scholes values (Nifty 24,000, IV 14%, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `Saare writers ek hi maqsad se nahi bechte. Kuch ko income chahiye, kuch portfolio hedge karte hain, kuch market maker ban kar spread kamate hain, aur kuch buy karne ki jagah sell karke apna directional view lete hain. Motive samajhne se pata chalta hai ki market hilne par writer kaise behave karega. Writers ko sirf premium milta hai jabki risk bada hota hai, isliye neeche ke reasons motives hain, guarantees nahi. Numbers illustrative Black-Scholes values hain (Nifty 24,000, IV 14%, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `A writer sells an option because the premium received looks like fair or better payment for the risk taken. The ten reasons in this module fall into four families: income (premium, time decay, yield), edge (volatility risk premium, arbitrage, market making), protection (hedging, portfolio protection) and views (range-bound or directional expectations). Each comes with a cost: capped gains, margin, gap risk and the chance that the market does something the writer did not expect.`,
    conceptHi:
      `Writer option isliye bechta hai kyunki mile hue premium ko risk ke badle sahi ya behtar payment lagta hai. Is module ke das reasons chaar families mein aate hain: income (premium, time decay, yield), edge (volatility risk premium, arbitrage, market making), protection (hedging, portfolio protection) aur views (range-bound ya directional expectation). Har ek ke saath cost judi hai: capped gains, margin, gap risk aur yeh chance ki market writer ki umeed ke ulta kare.`,
    mechanism:
      `Every writer's trade rests on one of three statements. "The market will not move far" (range-bound), "the price paid for risk is more than the risk is worth" (volatility risk premium), or "I already carry the risk, so selling the option changes it" (hedging, covered calls, collars). The premium is received upfront, but the payoff is settled later and margin is held in between. Time decay works in the writer's favour every day only if spot stays within breakevens; a large move can wipe out the gains of many days.`,
    example: {
      title: 'Time decay helps a writer, until the move comes (illustrative)',
      text: `An ATM 24,000 CE with 7 days left costs about ₹200.85. With spot unchanged, it is worth about ₹148.98 after 3 days, ₹72.31 with 1 day left and zero at expiry. The writer gains ₹51.87 per unit in the first 3 days, and ₹76.67 in the next 3. For one lot of 65 that is about ₹3,372 and ₹4,984. If Nifty rallies 300 points early, all those days of decay are overwhelmed by the loss.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Why writers sell: four families of motive',
      caption: 'Each motive has its own risk to check before copying it.',
      xLabels: ['Mainly for the premium', 'Mainly for protection or a view'],
      yLabels: ['Earning an edge', 'Earning income'],
      cells: [
        { head: 'Volatility premium, arbitrage, market making', note: 'Needs skill, speed and hedging', tone: 'ice' },
        { head: 'Directional or range view', note: 'Needs a correct view and sizing', tone: 'gold' },
        { head: 'Premium, time decay, yield', note: 'Small gains, tail risk', tone: 'ice' },
        { head: 'Hedging, portfolio protection', note: 'Gives up some upside or pays a cost', tone: 'gold' },
      ],
    },
    optionChain:
      `On the chain, writing shows up as OI building at strikes where premiums are attractive relative to distance. Far-OTM strikes attract writers seeking high-probability premium; ATM and near-ATM strikes attract market makers and volatility traders. Heavy OI does not reveal the motive: the same OI may be a hedge, an income trade or a directional bet. Treat it as a hint about where positions are concentrated and look at price and IV for context.`,
    psychology:
      `Premium is a certain, visible gain today; the risk is uncertain and out of sight. That gap tempts many writers to overweight the income and underweight the tail. Professionals ask the opposite question first: how much can I lose, and can I afford it. Hedgers feel relief when the hedge works; speculators feel regret when the rally they sold into keeps going. Discipline in size is what separates the motives that last from those that blow up.`,
    scenarios: {
      bullish:
        `Call writers (income, directional or covered) face pressure as the market rises: covered callers give up gains above the strike, naked ones lose. Put writers collect their premium as their options lose value.`,
      bearish:
        `Put writers face the pressure, with rising IV adding to losses. Call writers collect their premium as their options decay. Writers who hedged with long puts are cushioned.`,
      sideways:
        `Range-bound conditions reward most writers: time decay, falling IV and a stable market help income writers, market makers and volatility sellers. The danger is complacency before a breakout.`,
    },
    practice: [
      {
        q: `The 7-day 24,200 CE sells at ₹113.55 and the 23,800 PE at ₹92.18. A writer sells both. What is the total credit per lot of 65, and the breakeven range at expiry?`,
        a: `Credit per unit = 113.55 + 92.18 = ₹205.73; per lot = 205.73 × 65 = ₹13,372.45. Upper breakeven = 24,200 + 205.73 = 24,405.73. Lower breakeven = 23,800 − 205.73 = 23,594.27.`,
      },
      {
        q: `An ATM 24,000 CE falls from ₹200.85 (7 days left) to ₹148.98 (4 days left) with spot unchanged. What percentage of the premium has decayed, and what is the gain for a writer of one lot?`,
        a: `Decay = 200.85 − 148.98 = ₹51.87 per unit, which is 51.87 / 200.85 = 25.8%. For one lot: 51.87 × 65 = ₹3,371.55.`,
      },
      {
        q: `A portfolio holder sells a 24,500 CE (30 days) for ₹230.21 against a holding worth 24,000 × 65 = ₹15,60,000. What is the premium as a percentage of the holding, and above what Nifty level does the covered call stop gaining?`,
        a: `Premium per lot = 230.21 × 65 = ₹14,963.65, which is 14,963.65 / 15,60,000 = 0.96%. Total value stops rising above 24,500 + 230.21 = 24,730.21 (cap on gains) at expiry, ignoring other costs.`,
      },
      {
        q: `A put writer sells the 23,800 PE for ₹92.18 and a buyer buys the 24,000 CE for ₹200.85. What breakeven does each need at expiry, and which breakeven is closer to the current spot of 24,000?`,
        a: `Put writer's breakeven = 23,800 − 92.18 = 23,707.82 (292.18 below spot). Call buyer's breakeven = 24,000 + 200.85 = 24,200.85 (200.85 above spot). The call buyer's breakeven is closer in points but requires a rise; the put writer only needs the market not to fall below 23,707.82.`,
      },
    ],
    assignment:
      `Choose three motives from the list (for example yield enhancement, portfolio protection and market making). For each, write a one-line trade on today's NIFTY chain, compute the premium per lot, the breakeven and the maximum loss or the cap on gains, and name one situation in which the motive would fail. Finish with two lines on which of the three you could actually afford to run.`,
  },
  topics: [
    {
      t: 1,
      def: `The simplest motive is to collect premium: the writer receives money today and keeps it if the option expires worthless. It is attractive because the gain is known upfront and the probability of keeping it is often high.`,
      hi: `Sabse simple motive premium collect karna hai: writer ko aaj paise milte hain aur option worthless expire ho jaaye toh woh rakh leta hai. Yeh attractive isliye hai ki gain pehle se pata hota hai aur use rakhne ki probability aksar high hoti hai.`,
      how: `The premium is credited to the writer's account when the trade is done, and margin is blocked against it. A high chance of keeping the premium usually goes together with a small premium, because the option is far from the money. The reverse is also true: a rich premium comes with a real chance of loss. A trade that wins often but loses large can still lose money over time, so look at expected result, not just the win rate.`,
      eg: {
        title: 'Premium on a 24,200 CE (illustrative)',
        text: `A writer sells one lot of the 7-day 24,200 CE for ₹113.55 and collects ₹7,380.75. If Nifty ends at or below 24,200 the option expires worthless and the writer keeps the full amount. If Nifty ends at 24,500 the loss is (300 − 113.55) = ₹186.45 per unit, ₹12,119.25 per lot, which is about 1.6 times the premium.`,
      },
      tip: `A premium is a price, not a gift. Ask what risk you are being paid to take and whether the price is enough.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,200 CE',
        caption: 'The premium is the most that can be earned.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24200, premium: 113.55 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24200, premium: 113.55, expiryPrice: 24500, lotSize: 65, lots: 1 },
        why: 'Compare the kept premium with the loss at 24,500.',
      },
    },
    {
      t: 2,
      def: `Time decay (theta) means an option loses time value every day as expiry nears, all else equal. The writer, who is short the option, gains as it decays.`,
      hi: `Time decay (theta) ka matlab hai ki expiry paas aate hi option har din time value kho deta hai, baaki sab same rahe toh. Writer, jo option short hai, decay se gain karta hai.`,
      how: `Decay is not even: it speeds up as expiry approaches, especially for ATM options. That is why many writers prefer weekly options, and why the last few days carry the most decay per day and also the most gamma risk. Decay only helps if spot and IV stay put. A move toward the strike or a rise in IV can erase several days of decay in a single session.`,
      eg: {
        title: 'ATM call losing value by the day (illustrative)',
        text: `Spot 24,000, IV 14%. The 24,000 CE is worth about ₹200.85 with 7 days left, ₹148.98 with 4 days left, ₹72.31 with 1 day left and zero at expiry if spot ends at 24,000. The first 3 days remove ₹51.87, the next 3 days remove ₹76.67 and the last day ₹72.31. Per lot of 65 the last day alone is about ₹4,700.`,
      },
      tip: `Decay is fastest when gamma risk is highest. The best-paid days of a writer are also the most dangerous ones.`,
      visual: {
        kind: 'bars',
        title: '24,000 CE value as expiry approaches, spot unchanged (illustrative)',
        caption: 'Decay accelerates near expiry.',
        unit: ' ₹',
        items: [
          { label: '7 days left', value: 200.85, tone: 'gold' },
          { label: '4 days left', value: 148.98, tone: 'neutral' },
          { label: '1 day left', value: 72.31, tone: 'ice' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 4, iv: 14, rate: 6.5 },
        why: 'Check price and theta at different days to expiry.',
      },
    },
    {
      t: 3,
      def: `The volatility risk premium means implied volatility has tended to be higher than the volatility that actually follows, so options sold at implied levels have, on average, been worth more to sellers than they cost them. It is an average and not a promise.`,
      hi: `Volatility risk premium ka matlab hai ki implied volatility aam taur par aage aane wali asli volatility se zyada rahi hai, isliye implied level par bechne wale option sellers ko average mein faayda hua hai. Yeh average hai, promise nahi.`,
      how: `Buyers pay for insurance and for the chance of a big move, so options tend to be priced above their statistical average value. Writers who sell options at these prices and survive the bad days have historically collected this difference. The catch is the bad days: rare, large moves in realized volatility can give back many months of gains. Selling volatility is a bet that price is high relative to what will happen, not that nothing can happen.`,
      eg: {
        title: 'IV 16 against realized 13 (illustrative)',
        text: `The 7-day 24,000 straddle costs about ₹424.70 at IV 16% and would be worth about ₹345.35 at a realized 13%. The ₹79.35 difference per unit is about ₹5,158 per lot of 65. A seller would keep that if realized volatility is 13% and delta is hedged. If realized volatility is instead 20%, the straddle is worth more than was collected, and the seller loses.`,
      },
      tip: `The volatility risk premium rewards patience and punishes oversizing. Track both implied and realized volatility before and after the trade.`,
      visual: {
        kind: 'bars',
        title: '7-day 24,000 straddle at implied and realized IV (illustrative)',
        caption: 'The gap is the premium a seller may earn on average.',
        unit: ' ₹',
        items: [
          { label: 'Sold at IV 16%', value: 424.7, tone: 'gold' },
          { label: 'Worth at realized 13%', value: 345.35, tone: 'ice' },
        ],
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 13, days: 7 },
        why: 'Compare the range implied by 16% with the range implied by realized 13%.',
      },
    },
    {
      t: 4,
      def: `Writers sell options when they expect the market to stay inside a range. If the index stays between the sold strikes, the options decay and the writer keeps the premium.`,
      hi: `Writers tab options bechte hain jab unhe lagta hai ki market ek range ke andar rahega. Index bechne wale strikes ke beech rahe toh options decay ho jaate hain aur writer premium rakh leta hai.`,
      how: `A range view is usually expressed with a strangle or an iron condor: sell an OTM call above and an OTM put below. The combined premium lowers both breakevens' distance from spot, so the range the writer needs is the strikes plus and minus the premium. A range view can come from recent price action, OI concentration or low VIX, but a breakout can end it abruptly. Defined-risk versions cost some premium to buy protection.`,
      eg: {
        title: 'Selling a range 23,800 to 24,200 (illustrative)',
        text: `Sell the 23,800 PE at ₹92.18 and the 24,200 CE at ₹113.55: credit ₹205.73 per unit, ₹13,372.45 per lot of 65. The breakeven range is 23,594.27 to 24,405.73. Nifty finishing between 23,800 and 24,200 gives the full credit. A close at 24,600 would lose (400 − 205.73) = ₹194.27 per unit, ₹12,627.55 per lot.`,
      },
      tip: `A range is a guess about the future. Define in rupees what you do if the market leaves it, before you sell.`,
      visual: {
        kind: 'payoff',
        title: 'Short 23,800 PE and short 24,200 CE',
        caption: 'Profit inside the range, loss outside the breakevens.',
        spot: 24000,
        legs: [
          { type: 'PE', side: -1, strike: 23800, premium: 92.18 },
          { type: 'CE', side: -1, strike: 24200, premium: 113.55 },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24200, premium: 113.55, expiryPrice: 24600, lotSize: 65, lots: 1 },
        why: 'Call-side loss at 24,600; add the put side (zero here) for the total.',
      },
    },
    {
      t: 5,
      def: `Writers hedge existing positions by selling options against what they already hold. The premium received offsets part of a fall, or earns something on a position that is not expected to move much.`,
      hi: `Writers apni existing positions ko hedge karne ke liye unke against options bechte hain. Mila hua premium girawat ke ek hisse ko offset karta hai, ya aisi position par kuch kamata hai jiske zyada hilne ki umeed nahi hai.`,
      how: `A holder of shares or a Nifty-linked portfolio can sell calls against it (covered call). If the market falls, the premium cushions part of the loss; if it rises past the strike, the gains above the strike are given up. The cushion is small: it protects only down to the premium amount. It is a partial hedge, not an insurance policy, and the holder still faces most of the downside.`,
      eg: {
        title: 'A call sold against a holding (illustrative)',
        text: `A holder with a Nifty-linked portfolio worth about ₹15,60,000 sells one lot of the 7-day 24,300 CE at ₹81.99, collecting ₹5,329.35. The premium offsets a fall of 81.99 points, about 0.34% of 24,000. Below that, the portfolio loses more than the premium; above 24,381.99 the gain is given up beyond the cap.`,
      },
      tip: `A covered call hedges only as much as the premium collected. It is not downside insurance.`,
      visual: {
        kind: 'compare',
        title: 'Covered call as a hedge',
        caption: 'What it does and does not do.',
        left: { head: 'What it gives', tone: 'ice', points: ['Premium income', 'A small cushion for falls', 'Works best in flat or mildly rising markets'] },
        right: { head: 'What it costs', tone: 'gold', points: ['Gains above the strike are given up', 'Most downside remains', 'Does not protect against a crash'] },
      },
      calc: {
        id: 'breakeven',
        preset: { optType: 'CE', side: 'sell', strike: 24300, premium: 81.99 },
        why: 'Find the level above which the covered call stops participating.',
      },
    },
    {
      t: 6,
      def: `Yield enhancement means selling options against assets already held to earn extra income on top of any dividends or growth. The extra return comes from the premium; the cost is a cap on gains.`,
      hi: `Yield enhancement ka matlab hai pehle se held assets ke against options bechkar extra income kamana. Yeh extra return premium se aata hai; cost yeh hai ki gains cap ho jaate hain.`,
      how: `Funds and long-term holders repeat covered calls cycle after cycle, selling a slightly out-of-the-money call each expiry. In flat or slowly rising markets this adds a steady layer of income. In sharp rallies it underperforms the holding, and in falls it provides only a small cushion. The premium rate depends on IV; low IV pays little. SEBI permits mutual fund schemes to write covered calls within defined limits; the exact conditions are in SEBI's circulars.`,
      eg: {
        title: 'Monthly covered call (illustrative)',
        text: `A holder with a Nifty-linked portfolio worth ₹15,60,000 sells a 30-day 24,500 CE at IV 14% for ₹230.21, collecting ₹14,963.65 per lot of 65, which is about 0.96% of the holding. If Nifty ends the month at or below 24,500 the holder keeps it. Above 24,500 the holder gets only the gain up to 24,500 plus the premium, a cap at 24,730.21.`,
      },
      tip: `Yield is paid in exchange for upside. In a strong rally a covered-call holder will lag the plain holder.`,
      visual: {
        kind: 'payoff',
        title: 'Covered call (long Nifty-linked holding, short 24,500 CE)',
        caption: 'Upside is capped near the strike plus premium. Shown here with the futures leg standing in for the holding.',
        spot: 24000,
        legs: [
          { type: 'FUT', side: 1, strike: 24000 },
          { type: 'CE', side: -1, strike: 24500, premium: 230.21 },
        ],
      },
    },
    {
      t: 7,
      def: `Market-making is quoting both buy and sell prices to earn the bid-ask spread. In doing so, market makers often end up short options, which they hedge quickly so that direction does not matter to them.`,
      hi: `Market-making ka matlab hai buy aur sell dono prices quote karke bid-ask spread kamana. Aisa karte hue market makers aksar options short ho jaate hain, jinhe woh jaldi hedge kar dete hain taaki direction unke liye matter na kare.`,
      how: `When buyers lift the market maker's offer, the maker is short options and therefore short delta (for calls). They buy index futures or other options to bring the net exposure near zero, and repeat as the market moves. Income comes from the spread, not from the market going up or down. Risks are fast gap moves, sudden jumps in IV and the cost of constant hedging. In stress, quotes get wide or vanish, which is a risk for retail orders.`,
      eg: {
        title: 'Hedging a short call position (illustrative)',
        text: `A market maker sells 100 lots of 24,000 CE and the option delta is about 0.53. Short exposure is 100 × 65 × 0.53 = about 3,445 units of Nifty, which is about 53 lots of futures. Buying roughly 53 lots of futures brings delta near zero. The remaining risk is gamma: if Nifty moves, the delta changes and the hedge must be adjusted again.`,
      },
      tip: `A market maker's price is not a prediction. It reflects the cost of hedging risk plus a spread.`,
      visual: {
        kind: 'flow',
        title: 'How a market maker stays neutral',
        caption: 'Quote, get filled, hedge, repeat.',
        steps: [
          { label: 'Quote bid and ask', note: 'Earn the spread', tone: 'ice' },
          { label: 'Buyer lifts offer', note: 'Maker is short the call', tone: 'gold' },
          { label: 'Hedge delta', note: 'Buy futures for the delta', tone: 'ice' },
          { label: 'Re-hedge', note: 'As spot moves, delta changes', tone: 'gold' },
        ],
      },
      calc: {
        id: 'portfolio-delta',
        preset: { d1: 0.53, q1: -6500, d2: 1, q2: 3445, d3: 0, q3: 0 },
        why: 'Net delta of a short 100-lot call position hedged with about 53 lots of futures.',
      },
    },
    {
      t: 8,
      def: `Arbitrage means locking a small risk-free-looking gain from a price mismatch between related instruments, such as an option, its put and the futures. Writers can take part by selling the overpriced leg and buying the cheaper one.`,
      hi: `Arbitrage ka matlab hai related instruments, jaise option, uska put aur futures, ke beech price mismatch se chhota sa lagbhag locked gain pakadna. Writers overpriced leg bechkar aur sasti leg khareedkar isme hissa le sakte hain.`,
      how: `The main relationship is put-call parity: call minus put should equal spot minus the discounted strike (for index options, futures are generally used instead of spot). If the call is quoted too high, an arbitrageur sells the call and buys the put and the underlying (or futures). Real mismatches are tiny, vanish quickly, and are eaten by brokerage, STT, margin and bid-ask costs, so this is a professional game of speed and scale, not a retail strategy.`,
      eg: {
        title: 'Parity check (illustrative)',
        text: `Spot 24,000, strike 24,000, 7 days, rate 6.5%. Parity gives C − P = 24,000 − 24,000 × e^(−0.065 × 7/365) = about ₹29.90. The model has C = ₹200.85 and P = ₹170.95, a difference of ₹29.90, so no gap. If the call were quoted at ₹206 with the put at ₹170.95, C − P = ₹35.05, which is ₹5.15 above parity. After costs, that tiny gap may not be profitable at all.`,
      },
      tip: `Apparent arbitrage often disappears after costs and execution risk. Trust only gaps you have measured net of every charge.`,
      visual: {
        kind: 'flow',
        title: 'A put-call parity arbitrage',
        caption: 'Sell the overpriced side, buy the cheap side, hold to expiry.',
        steps: [
          { label: 'Find mismatch', note: 'Call too dear vs put and spot', tone: 'ice' },
          { label: 'Sell call, buy put, buy underlying', note: 'Lock the difference', tone: 'gold' },
          { label: 'Hold to expiry', note: 'Positions net out', tone: 'ice' },
          { label: 'Net of costs', note: 'Often too small to matter', tone: 'gold' },
        ],
      },
      calc: {
        id: 'put-call-parity',
        preset: { spot: 24000, strike: 24000, days: 7, rate: 6.5, call: 206, put: 170.95 },
        why: 'Measure how far a quoted call sits above parity.',
      },
    },
    {
      t: 9,
      def: `Portfolio protection through writing means financing a protective put by selling a call, creating a collar. The call premium pays for the put, so protection costs little or nothing in cash, but gains are capped.`,
      hi: `Writing se portfolio protection ka matlab hai call bechkar protective put ka kharcha nikalna, jisse collar banta hai. Call ka premium put ke paise bhar deta hai, isliye protection ka cash cost bahut kam ya zero hota hai, lekin gains cap ho jaate hain.`,
      how: `A holder buys an OTM put to floor losses and sells an OTM call to receive premium. Between the strikes the holder keeps the market's movement; outside them, losses and gains stop. The cost is the difference between the premiums plus the upside given up. Collars are used by investors who want to protect a large position without selling it, with tax and cost considerations that depend on the investor. Check current charges and rules before trading.`,
      eg: {
        title: 'A nearly free collar (illustrative)',
        text: `On a Nifty-linked holding worth ₹15,60,000, sell the 24,500 CE at ₹39.20 and buy the 23,500 PE at ₹28.56 (7 days). Net credit is ₹10.64 per unit, ₹691.60 per lot of 65. The holder is protected below 23,500 (a 500-point fall, 2.08%) and gives up gains above 24,500 (a 500-point rise). Between 23,500 and 24,500 the holding moves normally.`,
      },
      tip: `Protection that costs nothing in cash usually costs something in upside. Know which side you are paying with.`,
      visual: {
        kind: 'payoff',
        title: 'Collar: long holding, long 23,500 PE, short 24,500 CE',
        caption: 'Losses below 23,500 and gains above 24,500 are capped. The futures leg stands in for the holding.',
        spot: 24000,
        legs: [
          { type: 'FUT', side: 1, strike: 24000 },
          { type: 'PE', side: 1, strike: 23500, premium: 28.56 },
          { type: 'CE', side: -1, strike: 24500, premium: 39.2 },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'buy', strike: 23500, premium: 28.56, expiryPrice: 23000, lotSize: 65, lots: 1 },
        why: 'The put leg\'s payoff at 23,000 (add the holding\'s loss and the call premium for the net).',
      },
    },
    {
      t: 10,
      def: `Directional speculation by writing means selling an option to profit from a view: sell puts when bullish or sell calls when bearish. Profit is capped at the premium while a wrong view can cost much more.`,
      hi: `Writing se directional speculation ka matlab hai view ke hisaab se option bechna: bullish ho toh put bechna, bearish ho toh call bechna. Profit premium tak capped hota hai jabki galat view mein loss kaafi zyada ho sakta hai.`,
      how: `Selling a put is a bullish view that does not need the market to rise, only not to fall below the breakeven. That is why it wins more often than buying a call but pays less per win. The risk is asymmetry: many small wins and one large loss. The same applies to selling calls on a bearish view. Because losses can be large, directional writing needs strict position size and an exit plan.`,
      eg: {
        title: 'Short put versus long call as a bullish view (illustrative)',
        text: `A bullish trader sells the 23,800 PE at ₹92.18, with breakeven 23,707.82, a level 292.18 points below spot. A buyer of the 24,000 CE at ₹200.85 needs 24,200.85, which is 200.85 points above spot. The put writer profits in a flat or rising market, up to ₹5,991.70 per lot. If Nifty falls to 23,400, the writer loses ₹20,008.30 per lot while the call buyer loses at most ₹13,055.25.`,
      },
      tip: `Selling instead of buying changes the odds, not the risk. You win more often and lose bigger. Size the position for the loss.`,
      visual: {
        kind: 'compare',
        title: 'Bullish view: short put or long call',
        caption: 'Different breakevens and different loss profiles.',
        left: { head: 'Short 23,800 PE', tone: 'bull', points: ['Wins if Nifty stays above 23,707.82', 'Max profit ₹92.18 per unit', 'Loss grows below the breakeven'] },
        right: { head: 'Long 24,000 CE', tone: 'bull', points: ['Needs Nifty above 24,200.85', 'Max loss ₹200.85 per unit', 'Profit is open-ended'] },
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 23800, premium: 92.18, expiryPrice: 23400, lotSize: 65, lots: 1 },
        why: 'See the put writer\'s loss at 23,400.',
      },
    },
  ],
}

export default m
