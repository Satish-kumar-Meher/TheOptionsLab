import type { ModuleLesson } from '../topicLessonTypes'

/* Module 3.4 — Four Core Option Positions.
 * Curriculum has no numbered topics: t1-4 = table rows (Buy CE, Sell CE, Buy PE, Sell PE),
 * t5-10 = the six "understand each position in depth" checklist items.
 * Illustrative numbers follow the course PDF: NIFTY 24,000, lot 75 (illustrative; the current NIFTY lot is 65), premium Rs 100. */
const m: ModuleLesson = {
  moduleId: '3.4',
  intro: `Almost every options strategy is built from four basic positions: Buy CE, Sell CE, Buy PE and Sell PE. This module shows what each one means, what it earns, what it can lose and where it breaks even, all on one common NIFTY example. Learn these four well and spreads, straddles and condors become simple combinations.`,
  introHi: `Options ki lagbhag har strategy sirf chaar positions se bani hoti hai: Buy CE, Sell CE, Buy PE aur Sell PE. Is module mein hum ek hi NIFTY example par chaaron ka profit, loss aur breakeven samjhenge. Yeh chaar clear ho gaye toh spread, straddle jaisi strategies sirf inka combination lagengi.`,
  steps: {
    concept: `An option buyer pays a premium and gets a right. An option seller receives a premium and accepts an obligation. Add the two option types (CE and PE) and you get four positions: Buy CE (bullish), Sell CE (neutral to bearish), Buy PE (bearish) and Sell PE (neutral to bullish). The buyer's loss is limited to the premium paid; the seller's loss can be far larger than the premium received.`,
    conceptHi: `Option buyer premium deta hai aur ek right leta hai. Option seller premium leta hai aur ek obligation uthata hai. CE aur PE ko buy/sell se jodo toh chaar positions bante hain. Buyer ka maximum loss premium tak limited hota hai, lekin seller ka loss received premium se bahut bada ho sakta hai.`,
    mechanism: `Every position is settled by one formula at expiry. For a call: intrinsic value = max(S - K, 0). For a put: intrinsic value = max(K - S, 0). The buyer's P&L is intrinsic value minus premium; the seller's P&L is premium minus intrinsic value. So the seller's profit is the buyer's loss and vice versa (before charges). Breakeven is strike + premium for calls and strike - premium for puts, for both buyer and seller. You can also close any position before expiry by doing the opposite trade, and the P&L then depends on the premium at exit, not on intrinsic value.`,
    example: {
      title: 'One snapshot, four positions',
      text: `Illustrative snapshot: NIFTY 24,000, 24,100 CE at Rs 100, 23,900 PE at Rs 100, lot 75 (illustrative; the current NIFTY lot is 65, so check the live contract). One lot of premium = 100 x 75 = Rs 7,500. If NIFTY expires at 24,300: Buy CE earns (200 - 100) x 75 = +Rs 7,500, Sell CE loses Rs 7,500. If NIFTY expires at 23,500: Buy PE earns (400 - 100) x 75 = +Rs 22,500 and Sell PE loses Rs 22,500. Between 23,900 and 24,100 both options expire worthless, so both buyers lose Rs 7,500 and both sellers keep Rs 7,500, before charges.`,
    },
    chart: {
      kind: 'payoff',
      title: 'Buy CE (24,100 at Rs 100): expiry payoff',
      caption: 'Loss is capped at the premium below 24,100; profit starts after the 24,200 breakeven. Flip the sign for the Sell CE payoff.',
      spot: 24000,
      legs: [{ type: 'CE', side: 1, strike: 24100, premium: 100 }],
    },
    optionChain: `On the option chain you see all four positions on one screen. The call side (CE) sits on one half and the put side (PE) on the other, each with its LTP (last traded price), OI and volume per strike. Buying means you hit the ask price of that strike; selling means you hit the bid. The LTP you see is the premium that goes into the formulas above. Remember that OI on a strike shows how many contracts are open, not whether the market is buying or selling them.`,
    psychology: `Buyers often hope for one big move and are tempted to buy cheap OTM options that usually expire worthless. Sellers enjoy frequent small wins and can become overconfident, then suffer one sharp loss that wipes out many small gains. Institutions and professional desks usually sell options as part of hedged structures, not naked, so do not copy a naked seller just because the premium looks easy.`,
    scenarios: {
      bullish: `NIFTY rallies strongly. Buy CE gains and can profit without a fixed upper limit. Sell PE keeps its premium. Sell CE and Buy PE lose, and a Sell CE loss can grow without a fixed ceiling.`,
      bearish: `NIFTY falls sharply. Buy PE gains. Sell CE keeps its premium. Buy CE loses its premium. Sell PE can lose heavily because the put moves deep in the money.`,
      sideways: `NIFTY stays between roughly 23,900 and 24,100. Both option buyers lose time value and may lose the whole premium by expiry; both sellers can keep the premium. This is the situation that favours sellers, but a sudden breakout can reverse it quickly.`,
    },
    practice: [
      {
        q: `You buy 1 lot of 24,100 CE at Rs 100 (lot 75). NIFTY expires at 24,350. What is your net P&L before charges?`,
        a: `Intrinsic value = 24,350 - 24,100 = Rs 250. Net per unit = 250 - 100 = Rs 150. For 75 units: 150 x 75 = +Rs 11,250.`,
      },
      {
        q: `You sell 1 lot of 23,900 PE at Rs 100 (lot 75). NIFTY expires at 23,650. What is your P&L?`,
        a: `Intrinsic value = 23,900 - 23,650 = Rs 250. Net per unit = 100 - 250 = -Rs 150. For 75 units: -150 x 75 = -Rs 11,250. Breakeven is 23,900 - 100 = 23,800, and 23,650 is below it, so this is a loss.`,
      },
      {
        q: `You sold a 24,100 CE at Rs 100 and the premium rises to Rs 130 before you buy it back. What is the result for 75 units?`,
        a: `You sold at 100 and bought back at 130, so you lost 30 per unit: (100 - 130) x 75 = -Rs 2,250 before charges.`,
      },
      {
        q: `Which of the four positions have a capped maximum loss, and what is it for the buyer in this example?`,
        a: `Buy CE and Buy PE: the maximum loss is the premium paid, 100 x 75 = Rs 7,500. Sell CE has a theoretically unlimited loss. Sell PE has a very large loss, finite because NIFTY cannot fall below zero.`,
      },
    ],
    assignment: `Open a live NIFTY option chain (or a paper-trading account). Pick one CE and one PE about 100 points out of the money and write down, for all four positions: premium per unit, one-lot premium, breakeven and the P&L at three expiry prices of your choice. Check every number with the calculator.`,
  },
  topics: [
    {
      t: 1,
      def: `Buy CE (Long Call) means you pay a premium to buy a call option. You get the right, but not the obligation, to buy the underlying at the strike price. It is a bullish position: it gains when the market rises enough.`,
      hi: `Buy CE tab karte ho jab tumhe lagta hai market upar jayega. Tum premium dete ho aur ek right kharidte ho. Agar NIFTY achha upar gaya toh profit ho sakta hai, aur galat nikla toh loss sirf premium tak limited rehta hai.`,
      how: `You pay the premium to the seller through the exchange; NSCCL (the clearing corporation) guarantees settlement, so you do not deal with the seller directly. Your maximum loss is the premium paid. Profit grows as NIFTY rises above the breakeven (strike + premium), and in theory has no upper limit. Because index options are European and cash-settled, an ITM call at expiry is settled in cash, not in index units. Most traders close the position before expiry by selling the same call.`,
      eg: {
        title: 'Buy 24,100 CE at Rs 100',
        text: `NIFTY 24,000, strike 24,100, premium Rs 100, lot 75 (illustrative; the current lot is 65). Premium paid = 100 x 75 = Rs 7,500, which is also the maximum loss. Breakeven = 24,100 + 100 = 24,200. At expiry: 24,100 -> -Rs 7,500; 24,150 -> (50 - 100) x 75 = -Rs 3,750; 24,200 -> Rs 0; 24,300 -> +Rs 7,500; 24,500 -> +Rs 22,500. Before charges.`,
      },
      tip: `NIFTY rising is not enough. It must rise past strike + premium before expiry, so the bought option's time decay is working against you every day.`,
      visual: {
        kind: 'payoff',
        title: 'Buy CE: expiry payoff',
        caption: 'Flat loss of the premium up to 24,100, breakeven at 24,200, then profit rises point for point.',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24100, premium: 100 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 100, expiryPrice: 24300, lotSize: 75, lots: 1 },
        why: `Reproduces the course table: Rs 7,500 profit at a 24,300 expiry.`,
      },
    },
    {
      t: 2,
      def: `Sell CE (Short Call) means you sell a call option and receive the premium, accepting the obligation to pay the buyer if the option finishes in the money. It is a neutral-to-bearish position: it wants NIFTY to stay below the strike.`,
      hi: `Sell CE tab karte ho jab tumhe lagta hai market strike ke upar nahi jayega. Tumhe premium turant mil jata hai, lekin position open rehti hai. Market sideways ya neeche rahe toh premium bach sakta hai, par sharp rally aaye toh loss bahut bada ho sakta hai.`,
      how: `The seller (also called the writer) receives the premium but must keep margin with the broker; the exchange uses SPAN plus exposure margin, and the amount changes with volatility and market conditions. Maximum profit is the premium. Loss starts above the breakeven (strike + premium) and in theory has no limit. Delta and gamma work against the seller in a rally: as the option moves toward and into the money its price can rise faster and faster, especially close to expiry.`,
      eg: {
        title: 'Sell 24,100 CE at Rs 100',
        text: `Premium received = 100 x 75 = Rs 7,500 (illustrative lot 75; the current lot is 65). Maximum profit = Rs 7,500, kept if NIFTY expires at or below 24,100. Breakeven = 24,200. At expiry: 24,200 -> Rs 0; 24,300 -> -Rs 7,500; 24,500 -> -Rs 22,500. If you buy it back at Rs 40, profit = (100 - 40) x 75 = Rs 4,500; if you buy it back at Rs 160, loss = Rs 4,500. Before charges.`,
      },
      tip: `The premium you receive today is not your profit. It is yours only if the option expires worthless or you buy it back cheaper. A naked short call has no ceiling on loss.`,
      visual: {
        kind: 'payoff',
        title: 'Sell CE: expiry payoff',
        caption: 'Small capped gain on the left, an open-ended loss to the right of 24,200.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24100, premium: 100 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24100, premium: 100, expiryPrice: 24300, lotSize: 75, lots: 1 },
        why: `Shows the -Rs 7,500 loss at 24,300 and the mirror of the Buy CE result.`,
      },
    },
    {
      t: 3,
      def: `Buy PE (Long Put) means you pay a premium to buy a put option. You get the right, but not the obligation, to sell the underlying at the strike price. It is a bearish position: it gains when the market falls enough.`,
      hi: `Buy PE tab karte ho jab tumhe lagta hai market neeche girega. NIFTY girne par PE ka premium badh sakta hai. Agar market upar chala gaya ya fall nahi aaya, toh premium kam hota hai aur maximum loss sirf paid premium hota hai.`,
      how: `Like a call buyer, you pay the premium upfront and your loss cannot exceed it. Breakeven is strike - premium. Profit grows as NIFTY falls below that level, up to a maximum when the index would hit zero, so it is large but finite. Many investors also buy puts as insurance for a portfolio, which is called hedging. The put gains value when fear rises, but its premium can also shrink if time passes and the market does not fall.`,
      eg: {
        title: 'Buy 23,900 PE at Rs 100',
        text: `NIFTY 24,000, strike 23,900, premium Rs 100, lot 75 (illustrative; the current lot is 65). Premium paid = Rs 7,500 = maximum loss. Breakeven = 23,900 - 100 = 23,800. At expiry: 23,900 or above -> -Rs 7,500; 23,850 -> (50 - 100) x 75 = -Rs 3,750; 23,800 -> Rs 0; 23,700 -> +Rs 7,500; 23,500 -> +Rs 22,500. Before charges.`,
      },
      tip: `A fall that is too small or too slow still loses money. NIFTY has to finish below strike - premium, and a falling market can also bring higher volatility that you cannot count on.`,
      visual: {
        kind: 'payoff',
        title: 'Buy PE: expiry payoff',
        caption: 'Loss stays at the premium above 23,900; profit builds below the 23,800 breakeven.',
        spot: 24000,
        legs: [{ type: 'PE', side: 1, strike: 23900, premium: 100 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'buy', strike: 23900, premium: 100, expiryPrice: 23500, lotSize: 75, lots: 1 },
        why: `Reproduces the course table: Rs 22,500 profit at a 23,500 expiry.`,
      },
    },
    {
      t: 4,
      def: `Sell PE (Short Put) means you sell a put option and receive the premium, accepting the obligation to pay the buyer if the option finishes in the money. It is a neutral-to-bullish position: it wants NIFTY to stay above the strike.`,
      hi: `Sell PE tab karte ho jab tumhe lagta hai market support ke neeche nahi jayega. Premium mil jata hai, aur market sideways ya upar rahe toh profit ho sakta hai. Lekin market sharply gir gaya toh loss bahut bada ho sakta hai.`,
      how: `You collect the premium and block margin. Maximum profit is the premium; the maximum loss is very large but finite, because NIFTY cannot go below zero. Breakeven is strike - premium. In a fast fall, the put moves deep in the money, delta rises and implied volatility often jumps too, so the buy-back price can climb quickly. Selling puts is not an income machine: it earns small amounts often and can lose a lot in one bad week.`,
      eg: {
        title: 'Sell 23,900 PE at Rs 100',
        text: `Premium received = 100 x 75 = Rs 7,500 (illustrative lot 75; the current lot is 65). Maximum profit = Rs 7,500 if NIFTY expires at or above 23,900. Breakeven = 23,800. At expiry: 23,800 -> Rs 0; 23,700 -> -Rs 7,500; 23,500 -> (100 - 400) x 75 = -Rs 22,500. Before charges.`,
      },
      tip: `Do not treat support as a guarantee. If the support breaks, a short put loses faster than it earned, and one loss can erase many small premiums.`,
      visual: {
        kind: 'payoff',
        title: 'Sell PE: expiry payoff',
        caption: 'Capped gain above 23,900; the loss grows as NIFTY falls below 23,800.',
        spot: 24000,
        legs: [{ type: 'PE', side: -1, strike: 23900, premium: 100 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 23900, premium: 100, expiryPrice: 23500, lotSize: 75, lots: 1 },
        why: `Shows the -Rs 22,500 loss at a 23,500 expiry for the same lot.`,
      },
    },
    {
      t: 5,
      def: `Why does the participant enter? Each position matches a different reason: buyers want to gain from a move with a limited, known risk; sellers want to collect premium and time decay. Sellers can also be hedging or running a volatility view, so selling does not always mean predicting direction.`,
      hi: `Har position ke peeche alag wajah hoti hai. Buyer chahta hai ki limited risk mein bade move ka fayda mile, aur seller premium aur time decay collect karna chahta hai. Seller hamesha direction ki bet nahi lagata; kabhi woh hedge karta hai ya volatility par view rakhta hai.`,
      how: `Buy CE: expecting a breakout above resistance, news or a short-covering rally. Buy PE: expecting a breakdown below support or an event-driven fall. Sell CE: expecting resistance to hold and the premium to decay. Sell PE: expecting support to hold. Large participants often sell options as part of a hedged position, and a spread (one bought leg and one sold leg) is a common way to limit the seller's risk. The four positions describe your option exposure, not your whole portfolio strategy.`,
      eg: {
        title: 'Same chart, four different reasons',
        text: `NIFTY is at 24,000 with resistance near 24,100 and support near 23,900 (illustrative levels). A breakout trader buys 24,100 CE at Rs 100 risking Rs 7,500 per lot. Another trader expects resistance to hold and sells the same 24,100 CE to collect Rs 7,500 but must keep margin and accept open-ended risk. Neither is right or wrong in advance; they are choosing different risk-reward profiles.`,
      },
      tip: `Pick the position from your view AND from how much you can afford to lose. A good view with the wrong position size is still a bad trade.`,
      visual: {
        kind: 'compare',
        title: 'Buyer vs seller motive',
        caption: 'Same contract, opposite sides of the trade.',
        left: { head: 'Option buyer', tone: 'ice', points: [`Pays premium, gets a right`, `Wants a decent move`, `Loss limited to premium`, `Time decay works against them`] },
        right: { head: 'Option seller', tone: 'gold', points: [`Receives premium, takes an obligation`, `Wants a quiet or favourable market`, `Loss can far exceed the premium`, `Time decay works for them`] },
      },
    },
    {
      t: 6,
      def: `What market movement does each participant expect? Buy CE expects a rise, Sell CE expects no rise above the strike, Buy PE expects a fall and Sell PE expects no fall below the strike. A buyer needs the move to be large enough to beat the premium paid and the remaining time.`,
      hi: `Buy CE ko upar move chahiye, Sell CE ko chahiye ki market strike ke upar na jaye. Buy PE ko neeche move chahiye, Sell PE ko chahiye ki market strike ke neeche na jaye. Buyer ke liye sirf direction sahi hona kaafi nahi hai; move itna bada ho ki premium nikal jaye.`,
      how: `The buyer is paid for a move that is big enough and fast enough. The seller is paid for the market not moving against them; they win in more situations but with smaller gains. Other factors matter too: implied volatility (the market's expected size of moves) lifts premiums when it rises, and time decay (theta) reduces them every day. So a buyer can lose even when the direction is right, if the move is slow or small.`,
      eg: {
        title: 'Right direction, still a loss',
        text: `You buy 24,100 CE at Rs 100. NIFTY rises only 10 points and the premium may not rise enough to give a profit. At expiry NIFTY must finish above 24,200 (strike + premium) for you to profit. A seller of the same call earns its Rs 100 as long as NIFTY finishes at or below 24,100, and still breaks even up to 24,200.`,
      },
      tip: `Describe your view in three parts: direction, size of move and time frame. A buyer needs all three to be right; a seller mainly needs the market not to go against them.`,
      visual: {
        kind: 'matrix',
        title: 'Which view fits which position',
        caption: 'Rows: you buy or sell. Columns: call or put.',
        xLabels: ['Call (CE)', 'Put (PE)'],
        yLabels: ['Buy', 'Sell'],
        cells: [
          { head: 'Buy CE', note: 'Expects a rise', tone: 'bull' },
          { head: 'Buy PE', note: 'Expects a fall', tone: 'bear' },
          { head: 'Sell CE', note: 'Expects no rise above strike', tone: 'gold' },
          { head: 'Sell PE', note: 'Expects no fall below strike', tone: 'gold' },
        ],
      },
    },
    {
      t: 7,
      def: `When do they book profit? A buyer books profit by selling the option at a higher premium; a seller books profit by buying it back at a lower premium or by letting it expire worthless. You do not have to wait for expiry; you can close the position in any trading session, subject to liquidity.`,
      hi: `Profit book karne ke liye expiry tak rukna zaroori nahi hai. Buyer option ko zyada premium par bech deta hai, aur seller use kam premium par buy back kar leta hai. Dono apni planned target par ya premium ke move ke baad exit kar sakte hain.`,
      how: `Closing means placing the opposite order in the same contract: sell to close a long, buy to close a short. P&L = (exit premium - entry premium) x quantity for a buyer, and (entry premium - exit premium) x quantity for a seller. Premium can rise even before a big spot move if implied volatility rises, and it can fall even when spot is flat because of time decay. Profit targets and stop-losses are usually decided on the premium, in advance.`,
      eg: {
        title: 'Four profitable exits (lot 75)',
        text: `Buy CE from 100, sell at 140 (or 150): +Rs 3,000 (or +Rs 3,750). Buy PE from 100, sell at 160: (160 - 100) x 75 = +Rs 4,500. Sell CE at 100, buy back at 40: (100 - 40) x 75 = +Rs 4,500. All before charges; the course lot of 75 is illustrative and the current NIFTY lot is 65.`,
      },
      tip: `Decide your target and your stop in rupees per lot before you click. Booking part of the profit early is a rule, not a failure.`,
      visual: {
        kind: 'bars',
        title: 'Profit from closing early, per lot of 75 (Rs)',
        caption: 'Premium moves convert into rupees through the lot size.',
        unit: ' Rs',
        items: [
          { label: 'Buy CE 100 to 140', value: 3000, tone: 'bull' },
          { label: 'Buy CE 100 to 150', value: 3750, tone: 'bull' },
          { label: 'Buy PE 100 to 160', value: 4500, tone: 'bull' },
          { label: 'Sell CE 100 to 40', value: 4500, tone: 'bull' },
          { label: 'Sell PE 100 to 40', value: 4500, tone: 'bull' },
        ],
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 100, lotSize: 75, lots: 1 },
        why: `Turns a premium change into rupees: each Rs 1 move on a lot of 75 is Rs 75.`,
      },
    },
    {
      t: 8,
      def: `When do they exit at a loss? A buyer exits when the premium falls to the planned stop-loss, the market setup becomes invalid or the remaining reward no longer justifies the risk. A seller exits when the buy-back price rises too far, or hedges or adjusts the position per a risk plan.`,
      hi: `Loss mein exit tab karte hain jab stop-loss hit ho, setup invalid ho jaye ya risk-reward theek na rahe. Buyer ka loss premium se zyada nahi ho sakta, lekin seller ko pehle se stop-loss ya hedge ka plan chahiye kyunki uska loss bahut tez badh sakta hai.`,
      how: `For a buyer, losing the full premium is the worst case, but a disciplined trader often exits earlier, for example at a fall of 40 percent in premium. For a seller, there is no natural floor to the loss, so risk must be set by a stop-loss, by a hedge (buying a further OTM option) or by position size. Brokers may also square off a short position if margin runs short. Slippage on a fast-moving option can make the actual exit worse than the stop price.`,
      eg: {
        title: 'The same Rs 100 trade, four losing exits (lot 75)',
        text: `Buy CE from 100, premium falls to 60: (100 - 60) x 75 = -Rs 3,000. Buy PE from 100 to 60: -Rs 3,000. Sell CE at 100, buy back at 160: (100 - 160) x 75 = -Rs 4,500. Sell PE at 100, buy back at 160: -Rs 4,500. Note that a seller can lose more than the buyer for the same Rs 60 premium move once the market runs, because a seller's premium has no ceiling.`,
      },
      tip: `Never decide your exit after the loss has grown. Write down the maximum rupee loss per trade before entering, then size the lots from that.`,
      visual: {
        kind: 'bars',
        title: 'Loss at the planned exit, per lot of 75 (Rs)',
        caption: 'A fall of Rs 40 hurts a buyer; a rise of Rs 60 hurts a seller.',
        unit: ' Rs',
        items: [
          { label: 'Buy CE 100 to 60', value: -3000, tone: 'bear' },
          { label: 'Buy PE 100 to 60', value: -3000, tone: 'bear' },
          { label: 'Sell CE 100 to 160', value: -4500, tone: 'bear' },
          { label: 'Sell PE 100 to 160', value: -4500, tone: 'bear' },
        ],
      },
      calc: {
        id: 'position-size',
        preset: { capital: 100000, riskPct: 3, entry: 100, stop: 60, lotSize: 75 },
        why: `A Rs 40 stop on a lot of 75 risks Rs 3,000, which is 3 percent of Rs 1,00,000, so the plan allows exactly one lot.`,
      },
    },
    {
      t: 9,
      def: `What happens when the underlying moves against them? A buyer's option loses value and the loss stops at the premium paid. A seller's option gains value, so the seller's loss keeps growing the further the market moves against them.`,
      hi: `Jab market ulta chalta hai, toh buyer ka option sasta hota jata hai aur loss premium par ruk jata hai. Seller ke case mein option mehenga hota jata hai, isliye loss badhta rehta hai aur tez bhi ho sakta hai.`,
      how: `For a bought option going out of the money, intrinsic value stays at zero, time value decays and implied volatility may drop, so the premium falls toward zero. For a sold option going into the money, intrinsic value rises one rupee per point, delta rises toward 1 (or -1 for a put) and gamma makes delta change faster near the strike and near expiry. A sharp fall can also push implied volatility up, making a short put more expensive to buy back.`,
      eg: {
        title: 'NIFTY moves 400 points against you (lot 75)',
        text: `Short 24,100 CE at Rs 100: NIFTY rallies from 24,000 to 24,400. At expiry the call is worth 300, so the loss is (100 - 300) x 75 = -Rs 15,000. Long 24,100 CE at Rs 100 with NIFTY falling to 23,600: the call expires worthless and the loss is only Rs 7,500. Short 23,900 PE with NIFTY falling to 23,500: loss = (100 - 400) x 75 = -Rs 22,500, versus -Rs 7,500 for a long put holder who guessed the wrong way the other day.`,
      },
      tip: `Your maximum loss as a buyer is known on day one. As a seller, find out the worst plausible gap move for your lot size before you sell.`,
      visual: {
        kind: 'compare',
        title: 'When the market goes against you',
        caption: 'Same adverse move, very different consequence.',
        left: { head: 'Buyer (long option)', tone: 'ice', points: [`Option moves out of the money`, `Intrinsic value stays zero`, `Time value decays`, `Loss stops at the premium`] },
        right: { head: 'Seller (short option)', tone: 'gold', points: [`Option moves into the money`, `Intrinsic value rises point for point`, `Delta and gamma speed up the loss`, `Loss can become very large`] },
      },
    },
    {
      t: 10,
      def: `What happens near expiry? On expiry day an in-the-money option is worth its intrinsic value and an out-of-the-money option is worth zero. Time value disappears, and prices of nearby strikes can swing sharply, which hurts sellers most when a market moves toward their strike.`,
      hi: `Expiry ke paas option ya toh intrinsic value tak simat jata hai ya zero ho jata hai. Time value khatam ho jati hai aur ATM options ka premium bahut tez upar-neeche ho sakta hai. Isliye expiry ko safe samajhna galat hai.`,
      how: `Index options are European and cash-settled, so at expiry the exchange compares the final settlement price with your strike and settles the difference in cash. If the call is at or below the strike (or the put at or above it) it expires worthless. Gamma is highest near the strike on expiry day, so a few points of movement can change an option's value by a lot. Both the buyer and the seller of a given option have the same breakeven; they only sit on opposite sides of it.`,
      eg: {
        title: 'The same expiry at 24,300 (lot 75)',
        text: `NIFTY settles at 24,300. Buy 24,100 CE at Rs 100: (200 - 100) x 75 = +Rs 7,500. Sell the same CE: -Rs 7,500. Buy 23,900 PE at Rs 100: it expires worthless, loss -Rs 7,500. Sell the same PE: keeps +Rs 7,500. Breakevens: 24,200 for the call pair and 23,800 for the put pair.`,
      },
      tip: `Do not hold a position into expiry just because the premium looks small. Gamma can turn a Rs 5 option into Rs 50 in minutes, and a Rs 50 option into zero.`,
      visual: {
        kind: 'bars',
        title: 'Expiry at 24,300: P&L of the four positions (Rs, lot 75)',
        caption: 'Buyers and sellers of the same option are exact mirrors.',
        unit: ' Rs',
        items: [
          { label: 'Buy CE', value: 7500, tone: 'bull' },
          { label: 'Sell CE', value: -7500, tone: 'bear' },
          { label: 'Buy PE', value: -7500, tone: 'bear' },
          { label: 'Sell PE', value: 7500, tone: 'bull' },
        ],
      },
      calc: {
        id: 'breakeven',
        preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 100 },
        why: `Confirms the 24,200 expiry breakeven used throughout this module.`,
      },
    },
  ],
  tools: [
    { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 100, expiryPrice: 24300, lotSize: 75, lots: 1 }, why: `Test any of the four positions at any expiry price.` },
    { id: 'breakeven', preset: { optType: 'PE', side: 'sell', strike: 23900, premium: 100 }, why: `Breakeven for all four positions.` },
  ],
}
export default m
