import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '2.2',
  intro:
    `Two people can look at the same NIFTY chart and place opposite trades, and both can be rational, because they want different things. This module explains why retailers buy options, why professionals sell them, why institutions hedge, why market makers quote prices, why arbitrageurs chase small gaps and why time horizon changes everything. Once you see the objective behind a trade, OI and volume stop looking like secret signals and start looking like a mix of motives.`,
  introHi:
    `Do log ek hi NIFTY chart dekh kar ulta trade kar sakte hain aur dono sahi ho sakte hain, kyunki dono ka maksad alag hai. Is module mein dekhenge ki retail option kyun buy karta hai, professional kyun sell karta hai, institution hedge kyun karta hai, market maker quotes kyun deta hai, arbitrageur chhote gap kyun pakadta hai aur time horizon se sab kaise badalta hai. Jab trade ke peeche ka objective samajh aata hai, tab OI aur volume ko padhna kaafi saaf ho jaata hai.`,
  steps: {
    concept:
      `An objective is the reason a participant trades: speculation (profit from a view), income (collect premium), hedging (reduce an existing risk), liquidity provision (earn the bid-ask spread), arbitrage (earn a pricing gap) or long-term investing. The same instrument, say a NIFTY put, can be speculation for one person and insurance for another. That is why a single OI or volume number can never tell you the intention behind it.`,
    conceptHi:
      `Objective matlab trade ka kaaran: speculation (view par profit), income (premium collect karna), hedging (existing risk kam karna), liquidity provide karna (bid-ask spread kamana), arbitrage (price gap kamana) ya long-term investing. Ek hi NIFTY put kisi ke liye speculation hai aur kisi ke liye insurance. Isiliye sirf OI ya volume dekh kar trade ka intention nahi bataya ja sakta.`,
    mechanism:
      `Each objective maps to a typical structure. Speculators take outright positions (buy a call or put, or trade futures). Income sellers write options and hold a margin with the broker and clearing corporation, collecting premium as time value decays. Hedgers hold a cash portfolio and add an opposite derivatives position. Market makers post bid and ask quotes on both sides and hedge the resulting delta. Arbitrageurs hold offsetting positions across spot, futures and options so that the net exposure to direction is close to zero. Long-term investors mostly stay in cash equity or mutual funds and rarely use derivatives except to hedge.`,
    example: {
      title: 'One NIFTY put, two very different reasons (illustrative)',
      text: `NIFTY is at 24,000 and a 23,500 PE trades at ₹110 (illustrative). A retail trader buys 1 lot (65): premium paid = 110 × 65 = ₹7,150 for a short-term bearish view. A fund holding ₹10 crore of shares buys 64 lots of the same put as insurance: 110 × 65 × 64 = ₹4,57,600, about 0.46% of the portfolio. Same contract, same premium per unit, opposite intentions. If NIFTY rises, the trader is disappointed; the fund simply paid for insurance it did not need. The current NIFTY lot is 65; always check the NSE contract specification before trading.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Objective versus typical derivative action',
      caption: 'Read the columns as intention (take risk or reduce risk) and the rows as how long the position is meant to last. Illustrative grouping, not an official classification.',
      xLabels: ['Takes market risk', 'Reduces or neutralises risk'],
      yLabels: ['Short horizon (minutes to days)', 'Long horizon (months to years)'],
      cells: [
        { head: 'Retail speculators, prop desks', note: 'Option buying, intraday futures, premium selling', tone: 'gold' },
        { head: 'Market makers, arbitrageurs', note: 'Spread capture, basis trades, delta hedging', tone: 'ice' },
        { head: 'Directional FPIs, hedge funds', note: 'Index futures views, macro bets', tone: 'gold' },
        { head: 'Institutional hedgers', note: 'Futures shorts and put protection against a cash portfolio', tone: 'ice' },
      ],
    },
    optionChain:
      `On the chain, objectives show up indirectly. Heavy volume in far OTM options with small premiums often comes from speculators chasing cheap lottery tickets. Large OI at deep OTM puts may include portfolio protection. Tight bid-ask spreads in near-the-money strikes point to active market makers. A big OI number alone does not reveal who is long or short, so use it as a level of interest, not as a list of intentions.`,
    psychology:
      `Retail buyers often like small, known risk and large imagined reward. Sellers like a high probability of keeping premium, and may forget that one fast move can erase many small gains. Institutions think about benchmarks, redemptions and mandates; a fund manager may hedge because a committee is nervous, not because the market will fall. Market makers and arbitrageurs think about spreads and costs per trade, and care little about the direction.`,
    scenarios: {
      bullish:
        `In a rally, speculative call buyers profit while option sellers on the call side face losses. Hedgers lose a little on their futures shorts or puts, but their cash portfolio gains more, which is the intended trade-off. Arbitrageurs stay roughly neutral, and market makers earn spread while managing delta.`,
      bearish:
        `In a fall, put buyers and portfolio hedgers gain, while put sellers face losses that can exceed the premium collected. Market makers widen spreads as volatility rises. Long-term investors may keep buying through SIPs, which is a long horizon choice rather than a bullish call.`,
      sideways:
        `In a quiet range, option buyers lose time value, option sellers earn it, hedgers pay a small cost of protection and arbitrageurs and market makers keep collecting small edges. Sideways markets are where costs and time decay matter more than opinions.`,
    },
    practice: [
      {
        q: `A retail trader buys 1 lot of a 24,100 CE at ₹80 (lot 65). What are the premium paid, the breakeven and the profit if NIFTY expires at 24,400?`,
        a: `Premium = 80 × 65 = ₹5,200. Breakeven = 24,100 + 80 = 24,180. At 24,400 the option is worth 24,400 − 24,100 = 300. Profit = (300 − 80) × 65 = 220 × 65 = ₹14,300, before charges.`,
      },
      {
        q: `A fund holds ₹50 crore of shares with beta 1.0. One NIFTY futures lot is ₹15,60,000 notional (24,000 × 65). How many lots hedge it fully?`,
        a: `Lots = 50,00,00,000 ÷ 15,60,000 ≈ 320.5, so about 320 lots. Real hedges adjust for beta, basis and limits.`,
      },
      {
        q: `A market maker quotes a 24,000 CE bid ₹100.00 and ask ₹100.50. How much does a round trip earn on 2,000 lots (lot 65)?`,
        a: `Spread = 0.50 per unit. Per lot = 0.50 × 65 = ₹32.50. For 2,000 lots = ₹65,000, before costs and before any loss from price moving while the position is held.`,
      },
      {
        q: `Why can a rise in put OI mean either bearish speculation or hedging?`,
        a: `Because OI counts open contracts, not intentions. A speculator buying puts and a portfolio manager buying protective puts both add to put OI. You need more evidence (cash exposure, futures, participant data) to separate them.`,
      },
    ],
    assignment:
      `Pick one trading day. Write down NIFTY's move, India VIX change and two option strikes with big OI change. For each, list two possible objectives (for example "speculation" and "hedge") and one piece of data that would help choose between them.`,
  },
  topics: [
    {
      t: 1,
      def: `Retail traders usually buy options because the most they can lose is the premium, the capital needed is small, and the payoff can be large if the move is big and fast. An option lets them take a view on NIFTY without buying the whole index worth lakhs of rupees.`,
      hi: `Retail trader option buy isliye karta hai kyunki maximum loss sirf premium tak limited hota hai, capital kam lagta hai aur agar move bada aur tez ho toh payoff bhi bada ho sakta hai. Pura NIFTY khareedne ki zarurat nahi, sirf premium dekar view lena hota hai.`,
      how: `A buyer pays the premium upfront to the seller through the exchange; the clearing corporation (NSCCL) guarantees the trade. No margin is blocked for the buyer, only the premium. The buyer needs the move to happen before expiry and to be big enough to cover the premium, because time value decays every day. This is why many small buyers lose even when they guess the direction right but the move arrives late. Index options on NSE are European and cash-settled, so there is no share delivery at expiry.`,
      eg: {
        title: 'Buying a NIFTY 24,100 CE (illustrative)',
        text: `NIFTY = 24,000. A trader buys 1 lot of the 24,100 CE at ₹80 (lot 65). Premium = 80 × 65 = ₹5,200, which is the maximum loss. Breakeven at expiry = 24,100 + 80 = 24,180. If NIFTY expires at 24,400, intrinsic value is 300, profit = (300 − 80) × 65 = ₹14,300. If NIFTY expires at 24,100 or below, the whole ₹5,200 is lost. Charges extra; current NIFTY lot is 65, so verify on NSE.`,
      },
      tip: `Limited risk does not mean low probability of loss. Time decay works against the buyer every day, so a right view with wrong timing still loses.`,
      visual: {
        kind: 'payoff',
        title: 'Long 24,100 CE at ₹80, payoff at expiry',
        caption: 'The loss is flat at the premium below the strike; profit starts after the breakeven at 24,180.',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24100, premium: 80 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 80, expiryPrice: 24400, lotSize: 65, lots: 1 },
        why: 'Reproduces the ₹14,300 profit and ₹5,200 maximum loss.',
      },
    },
    {
      t: 2,
      def: `Professional traders and prop desks often sell (write) options to earn premium. They are paid for taking the risk that the market moves against the buyer, and they benefit from time decay when the market stays calm. They use margin, position sizing and hedges so that one bad move does not wipe them out.`,
      hi: `Professional traders aur prop desks aksar option sell karte hain taaki premium kamayein. Unhe is baat ka paisa milta hai ki woh market ke against jaane ka risk le rahe hain, aur agar market shaant rahe toh time decay unke favour mein kaam karta hai. Woh margin, position size aur hedge se risk control karte hain, taaki ek bad move sab kuch na le jaaye.`,
      how: `A seller receives premium but must block margin (SPAN plus exposure margin, set by the exchange and broker). The risk of a short option is large: a short call has no cap on loss, and a short put loses a lot if the index collapses. Professionals therefore sell far OTM options, spread them with bought options to define risk, or hedge delta with futures. The win rate can be high, but the loss on a bad day is typically much larger than the premium of one trade. Sellers do not always win; they only win if their sizing and risk limits survive the tail event.`,
      eg: {
        title: 'Selling a NIFTY 24,500 CE (illustrative)',
        text: `NIFTY = 24,000. A desk sells 1 lot of the 24,500 CE at ₹30 (lot 65) and collects 30 × 65 = ₹1,950. Breakeven = 24,500 + 30 = 24,530. If NIFTY expires at or below 24,500 the desk keeps ₹1,950. If NIFTY expires at 24,800, the option is worth 300, loss = (300 − 30) × 65 = ₹17,550, about nine times the premium collected. Margin must also be blocked; check the broker's margin calculator.`,
      },
      tip: `A high win rate is not an edge by itself. Check the average loss against the average win before you call premium selling "safe".`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,500 CE at ₹30, payoff at expiry',
        caption: 'Profit is capped at the premium; loss grows without limit as NIFTY rises above 24,530.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24500, premium: 30 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24500, premium: 30, expiryPrice: 24800, lotSize: 65, lots: 1 },
        why: 'Shows how a small premium can turn into a loss many times larger.',
      },
    },
    {
      t: 3,
      def: `Institutions hedge because they hold large portfolios and cannot (or do not want to) sell everything when they fear a fall. A hedge is an opposite position, such as short index futures or bought puts, that offsets part of the loss if the market drops.`,
      hi: `Institutions ke paas bade portfolios hote hain aur woh dar ke maare sab kuch bech nahi sakte. Isliye woh hedge karte hain, yaani ulta position jaise short index futures ya put buy karna, taaki market girne par portfolio ka loss kuch kam ho jaaye.`,
      how: `A mutual fund or FPI sells index futures against its stock portfolio, because selling a whole basket of shares is slow, costly and may move prices. Futures need only margin, are very liquid and can be closed in seconds. The number of futures contracts is set by the portfolio value and its beta against NIFTY. The hedge is never perfect: the portfolio may not track NIFTY, the futures basis changes and contract sizes are discrete. The hedge also removes the upside, which is the cost of protection.`,
      eg: {
        title: 'Hedging a ₹50 crore portfolio (illustrative)',
        text: `Portfolio = ₹50 crore, beta 1.0. NIFTY futures at 24,000 with lot 65 means notional per lot = 24,000 × 65 = ₹15,60,000. Lots to sell = 50,00,00,000 ÷ 15,60,000 ≈ 320. If NIFTY falls 2% (480 points), the futures gain about 320 × 65 × 480 = 20,800 × 480 = ₹99,84,000 (about ₹1 crore), offsetting the roughly ₹1 crore loss on the portfolio. If NIFTY rises 2%, the same hedge gives up about ₹1 crore of gains.`,
      },
      tip: `A big FII short futures position can simply be a hedge on a large long cash portfolio. Do not read it as a bearish call by itself.`,
      visual: {
        kind: 'flow',
        title: 'How a portfolio hedge is built',
        caption: 'Size comes from portfolio value, beta and the notional of one lot.',
        steps: [
          { label: 'Stock portfolio', note: '₹50 crore, beta 1.0', tone: 'ice' },
          { label: 'Notional per lot', note: '24,000 × 65 = ₹15,60,000', tone: 'neutral' },
          { label: 'Lots to sell', note: '≈ 320 NIFTY futures', tone: 'gold' },
          { label: 'Net market risk', note: 'Much lower; upside also capped', tone: 'ice' },
        ],
      },
      calc: {
        id: 'hedge-ratio',
        preset: { portfolio: 500000000, beta: 1, futuresNotional: 1560000 },
        why: 'Gives the number of futures lots for a beta hedge.',
      },
    },
    {
      t: 4,
      def: `Market makers provide liquidity: they keep buy (bid) and sell (ask) quotes on the screen so that you can trade at any moment. They earn the small gap between the two prices, called the bid-ask spread, and do not need to guess direction.`,
      hi: `Market maker liquidity provide karte hain: woh screen par hamesha buy (bid) aur sell (ask) quote lagaye rakhte hain taaki aap kabhi bhi trade kar sakein. Unki kamaai bid aur ask ke beech ke chhote gap, yaani spread, se hoti hai. Unhe direction guess karne ki zarurat nahi hoti.`,
      how: `Market makers (and designated liquidity providers) quote two-sided prices across many strikes and expiries. When a retail trader buys at their ask, they sell, and then hedge the resulting delta, often with futures or the underlying. They earn the spread many thousand times a day but take risks: a sudden jump in prices, a volatility spike or a thin book can create losses. In stressed markets they widen spreads or step back, which is why liquidity can disappear exactly when you want it. Their positions usually offset across strikes, so their OI is not a directional bet.`,
      eg: {
        title: 'Spread capture in the 24,000 CE (illustrative)',
        text: `A market maker quotes bid ₹100.00 and ask ₹100.50. A buyer lifts the ask and a seller hits the bid. The maker earns 0.50 per unit; for one lot (65), 0.50 × 65 = ₹32.50. On 2,000 lots that is 2,000 × 32.50 = ₹65,000. For the retail trader the same 0.50 is a cost: on 1 lot, a round trip loses ₹32.50 to the spread before brokerage.`,
      },
      tip: `The spread is a real cost for you. Prefer liquid strikes and limit orders, and expect wider spreads at the open, near news and in deep OTM strikes.`,
      visual: {
        kind: 'orderBook',
        title: 'A tight two-sided quote',
        caption: 'The gap between the best bid and best ask is the market maker\'s payment (illustrative quantities in units).',
        bids: [[100.0, 1300], [99.9, 2600], [99.8, 3900]],
        asks: [[100.5, 1300], [100.6, 2600], [100.7, 3250]],
      },
      calc: {
        id: 'spread-cost',
        preset: { bid: 100, ask: 100.5, qty: 1, lotSize: 65 },
        why: 'Shows what the bid-ask gap costs one lot.',
      },
    },
    {
      t: 5,
      def: `Arbitrageurs look for the same or related thing trading at two different prices, buy the cheaper one and sell the dearer one, and keep the difference when the prices converge. Their trades pull prices back towards fair value, so they act like a quiet correction mechanism.`,
      hi: `Arbitrageur woh hota hai jo ek hi cheez (ya related cheez) do alag prices par dekhta hai, sasta wala buy karta hai, mehenga wala sell karta hai aur price barabar hone par difference kamata hai. Unke trades prices ko fair value ke paas wapas kheenchte hain.`,
      how: `The most common Indian example is cash-and-carry: if NIFTY futures trade above fair value (spot plus cost of carry minus expected dividends), the arbitrageur buys the stock basket (or an index ETF) and sells futures, holding until expiry when the two converge. If futures trade below fair value, the reverse trade is attempted. The gap must exceed brokerage, STT, financing and slippage, so only large players with low costs usually succeed. The profit is small per unit and is earned in volume, and it still carries execution and basis risk.`,
      eg: {
        title: 'Futures above fair value (illustrative)',
        text: `NIFTY spot = 24,000, rate 6.5%, dividend yield 1.3%, 30 days to expiry. Fair value ≈ 24,000 × e^((0.065 − 0.013) × 30/365) ≈ 24,102.8. If futures trade at 24,150, the gap is about 47 points. Per lot that is 47.2 × 65 ≈ ₹3,068 before costs. After brokerage, charges and slippage the net may be much smaller, and it disappears if the leg execution is not simultaneous.`,
      },
      tip: `An arbitrage gap is not free money. Costs, financing and execution risk can erase it, and the trade is not risk-free in practice.`,
      visual: {
        kind: 'flow',
        title: 'Cash-and-carry in four steps',
        steps: [
          { label: 'Spot 24,000 · Futures 24,150', note: 'Futures above fair value 24,103', tone: 'gold' },
          { label: 'Buy basket, sell futures', note: 'Direction exposure nearly cancels', tone: 'ice' },
          { label: 'Hold to expiry', note: 'Basis converges to zero', tone: 'neutral' },
          { label: 'Keep the gap minus costs', note: '≈ 47 points before costs', tone: 'gold' },
        ],
      },
      calc: {
        id: 'basis-fair-value',
        preset: { spot: 24000, futures: 24150, rate: 6.5, days: 30, dividend: 1.3 },
        why: 'Computes fair value and the mispricing in points.',
      },
    },
    {
      t: 6,
      def: `Foreign portfolio investors (FPIs/FIIs) trade index futures because futures are cheap in capital, very liquid and quick to adjust. They use them to hedge a cash portfolio, to change India exposure without selling shares, or to express a short-term view.`,
      hi: `FII/FPI index futures isliye trade karte hain kyunki futures mein capital kam lagta hai, liquidity bahut hoti hai aur position jaldi badli ja sakti hai. Woh ise hedge ke liye, India exposure badalne ke liye ya short-term view ke liye use karte hain.`,
      how: `Selling ₹1,000 crore of shares moves prices and takes days. Selling an equal notional of NIFTY futures takes minutes and needs only margin. FPIs report to NSE as a category (FII) in the participant-wise data, but the report does not show whether a position is a hedge, an arbitrage or a view. For cash-segment flows and derivatives positions you must read them together. Position limits for FPIs in index derivatives are set by SEBI/NSE, so check the latest limits before assuming a number.`,
      eg: {
        title: 'Cutting India exposure by ₹1,000 crore (illustrative)',
        text: `An FPI wants to reduce market exposure by ₹1,000 crore for a few weeks. One NIFTY futures lot has notional 24,000 × 65 = ₹15,60,000. ₹1,000 crore = 10,00,00,00,000 rupees, and 10,00,00,00,000 ÷ 15,60,000 ≈ 641 lots. It sells about 641 lots, and may later buy them back. The margin blocked is a fraction of the notional (say about 12% for illustration, check the NSE margin), roughly ₹120 crore.`,
      },
      tip: `Net FII index futures change is one input. Without the cash portfolio, the motive is a guess.`,
      visual: {
        kind: 'compare',
        title: 'Why futures instead of selling shares',
        left: { head: 'Sell the share basket', tone: 'neutral', points: ['Takes days', 'Impacts many stock prices', 'Triggers tax and delivery work'] },
        right: { head: 'Sell index futures', tone: 'ice', points: ['Minutes to execute', 'Only margin blocked', 'Easy to reverse'] },
      },
      calc: {
        id: 'hedge-ratio',
        preset: { portfolio: 10000000000, beta: 1, futuresNotional: 1560000 },
        why: 'Counts how many lots equal ₹1,000 crore of exposure.',
      },
    },
    {
      t: 7,
      def: `Institutions buy put options as portfolio insurance: for a known premium, they get the right to sell the index at a fixed strike, which caps how much they lose below that level. Unlike futures hedges, puts keep the upside.`,
      hi: `Institutions portfolio insurance ke liye put options khareedte hain. Ek tay premium dekar unhe ek fixed strike par index bechne ka right milta hai, toh us level ke neeche loss limited ho jaata hai. Futures hedge ke ulat, put mein upside bhi bacha rehta hai.`,
      how: `The cost of protection is the premium, which rises when India VIX is high. Funds choose the strike and expiry to match how much loss they can tolerate and how long they fear risk. Deep OTM puts are cheaper but only help in large falls. A put hedge does not match the portfolio perfectly because stocks and NIFTY move differently. Heavy OTM put OI on the chain can reflect this hedging demand, but the chain alone cannot prove it.`,
      eg: {
        title: 'Insuring ₹10 crore with a 23,500 PE (illustrative)',
        text: `Portfolio = ₹10 crore, NIFTY = 24,000, lot 65. Lots needed ≈ 10,00,00,000 ÷ 15,60,000 ≈ 64. Buy 64 lots of 23,500 PE at ₹110: cost = 110 × 65 × 64 = ₹4,57,600 (about 0.46%). If NIFTY falls 5% to 22,800, the portfolio loses about ₹50 lakh. The put pays (23,500 − 22,800) × 65 × 64 = ₹29,12,000, net ₹24,54,400 after premium. The protection is partial, because the first 500 points down (24,000 to 23,500) are not covered. If NIFTY rises, only the ₹4,57,600 premium is lost.`,
      },
      tip: `Protection has a price and a deductible. Compare the premium with the loss you are really trying to avoid.`,
      visual: {
        kind: 'payoff',
        title: 'Long 23,500 PE at ₹110 as portfolio insurance',
        caption: 'Gains build up only below the strike; the loss when the market rises is limited to the premium.',
        spot: 24000,
        legs: [{ type: 'PE', side: 1, strike: 23500, premium: 110 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'buy', strike: 23500, premium: 110, expiryPrice: 22800, lotSize: 65, lots: 64 },
        why: 'Shows the put payoff for the hedge size in the example.',
      },
    },
    {
      t: 8,
      def: `Time horizon is how long a participant plans to hold a position. A scalper may hold for seconds, an options trader for a day or a week, a hedge fund for a few months and a pension fund for decades. Each reads the same price move differently.`,
      hi: `Time horizon matlab position kitne samay ke liye rakhni hai. Scalper kuch seconds, option trader ek din ya hafta, hedge fund kuch mahine aur pension fund saalon tak rakhta hai. Ek hi price move sab ke liye alag matlab rakhta hai.`,
      how: `Short-horizon traders care about spreads, intraday volatility and time decay. Medium-horizon traders watch earnings, events like Budget or RBI policy, and expiry cycles. Long-horizon investors care about earnings growth and valuation, and a 3% dip is noise to them. Options add a clock: a weekly option has days to live, so a 1% move arriving after expiry is worth nothing. Mixing horizons is a classic mistake: a long-term view does not justify a short-dated option.`,
      eg: {
        title: 'Same dip, three horizons (illustrative)',
        text: `NIFTY falls 3% from 24,000 to 23,280. An intraday trader sees a 720-point move that can make or lose thousands within hours. An option buyer with weekly 24,000 calls may lose most of the premium. A long-term SIP investor sees a small dip in a 10-year plan: ₹1,00,000 growing to ₹2,59,374 over 10 years is a CAGR of 10% (1.10^10 = 2.5937). Illustrative figures, not a forecast.`,
      },
      tip: `Match the instrument's life to your view's life. A months-long view does not belong in an option that expires this week.`,
      visual: {
        kind: 'timeline',
        title: 'Typical horizons of participants',
        events: [
          { when: 'Seconds to minutes', what: 'Market makers, high-frequency and scalping algos', tone: 'ice' },
          { when: 'Days to weeks', what: 'Retail option traders, prop desks, swing traders', tone: 'gold' },
          { when: 'Months', what: 'Hedge funds, tactical FPI allocations, event traders', tone: 'neutral' },
          { when: 'Years to decades', what: 'Mutual fund SIPs, pension and insurance money', tone: 'ice' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 100000, end: 259374, years: 10 },
        why: 'Turns a long-horizon outcome into an annual rate.',
      },
    },
  ],
  tools: [
    { id: 'option-pnl', why: 'Test buyer and seller payoffs for any strike and expiry price.' },
    { id: 'hedge-ratio', why: 'Size a futures hedge for a portfolio.' },
  ],
}
export default m
