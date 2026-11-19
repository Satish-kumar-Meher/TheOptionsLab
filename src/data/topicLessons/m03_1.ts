import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '3.1',
  intro:
    `A derivative is a contract whose value comes from some other asset, called the underlying. This module explains what derivatives are, the four families (futures, options, forwards, swaps) and the three reasons people use them: hedging, speculation and arbitrage. Everything later in options trading rests on these ideas. Note: the worked examples use an illustrative NIFTY lot of 75; the current NSE NIFTY lot is 65, so rupee figures will change if you use 65.`,
  introHi:
    `Derivative ek aisa contract hai jiski value kisi doosre asset se aati hai, jise underlying kehte hain. Is module mein hum dekhenge ki futures, options, forwards aur swaps kya hain, aur log inhe hedging, speculation ya arbitrage ke liye kyun use karte hain. Aage ka poora options course isi foundation par khada hai. Dhyan rahe: examples mein lot size 75 illustrative hai, abhi NIFTY ka current lot 65 hai.`,
  steps: {
    concept:
      `A derivative has no value of its own. Its price follows an underlying: an index like NIFTY 50, a share like Reliance, a commodity, a currency or an interest rate. Derivatives exist so that people can lock in prices, transfer risk or take a view on direction without owning the underlying. They are tools, and a tool can protect you or hurt you depending on how it is used.`,
    conceptHi:
      `Derivative ki apni koi independent value nahi hoti. Uska price underlying ke price ke saath chalta hai, jaise NIFTY, Reliance, gold ya USD/INR. Derivatives isliye bane taaki log price lock kar sakein, risk transfer kar sakein ya bina asset khareede direction par view le sakein. Yeh tool hai, aur tool protect bhi kar sakta hai aur nuksaan bhi.`,
    mechanism:
      `Futures and options are listed on an exchange (NSE) and cleared by a clearing corporation (NSCCL), which stands between buyer and seller and collects margin. Forwards and swaps are private (OTC) agreements negotiated directly, usually with banks. In every case the contract price moves because the underlying moves, but the contract has its own price: NIFTY spot, NIFTY futures and a NIFTY option premium are three different numbers.`,
    example: {
      title: 'One NIFTY, four different prices (illustrative)',
      text: `Suppose NIFTY spot = 24,000, NIFTY futures = 24,050, the 24,100 CE premium = ₹100 and the 23,900 PE premium = ₹90. All four are connected to NIFTY but are not the same number. One futures lot of 75 (illustrative) has notional value 24,050 × 75 = ₹18,03,750. One call lot costs 100 × 75 = ₹7,500 in premium. If futures rise 100 points the long futures holder gains 100 × 75 = ₹7,500, before charges. Figures are hypothetical, not live quotes. With the current NIFTY lot of 65 the same futures move would be 100 × 65 = ₹6,500.`,
    },
    chart: {
      kind: 'flow',
      title: 'Underlying and its derivatives',
      caption: 'Read left to right: one underlying (NIFTY 50) feeds several contracts, each with its own price. Hypothetical prices.',
      steps: [
        { label: 'NIFTY 50 spot', note: '24,000', tone: 'gold' },
        { label: 'NIFTY futures', note: '24,050', tone: 'ice' },
        { label: '24,100 CE', note: 'premium ₹100', tone: 'ice' },
        { label: '23,900 PE', note: 'premium ₹90', tone: 'ice' },
      ],
    },
    optionChain:
      `The option chain is a table of derivatives that all share one underlying. Each row is a strike, with CE and PE premiums on the two sides. The spot or futures price shown at the top is the underlying; every premium in the table is a derivative price. Seeing that distinction on the chain is the first practical step in reading it.`,
    psychology:
      `Hedgers pay a small known cost to avoid a large unknown loss. Speculators accept risk for a possible gain and are tempted by leverage, because a small margin controls a big notional. Arbitrageurs look for tiny, repeatable price gaps and care about costs and speed. Most beginner mistakes come from using a speculative tool while believing it is a safe one.`,
    scenarios: {
      bullish:
        `If NIFTY rises, a long futures holder gains point for point (100 points × 75 = ₹7,500 in the illustration), and a call buyer's premium may rise, with maximum loss capped at the premium paid. A hedger holding shares gains on the shares and loses only the small put premium.`,
      bearish:
        `If NIFTY falls, a long futures holder loses point for point and may face margin top-ups, while a call buyer loses at most the premium. A put buyer or a hedger holding puts may gain, which is why protective puts exist.`,
      sideways:
        `If NIFTY goes nowhere, futures show little profit or loss, but an option buyer can still lose premium to time decay. A hedger sees the put expire worthless, which is the cost of protection, not a mistake.`,
    },
    practice: [
      {
        q: `NIFTY futures = 24,050, lot = 75 (illustrative). What is the notional value, and what margin is needed at an illustrative 12%?`,
        a: `Notional = 24,050 × 75 = ₹18,03,750. Margin at 12% = 18,03,750 × 0.12 = ₹2,16,450. The 12% is only an example; real margin is set by the exchange and broker and changes with market conditions.`,
      },
      {
        q: `You are long one futures lot at 24,050 and the day's settlement price is 24,100. What is your MTM?`,
        a: `(24,100 − 24,050) × 75 = 50 × 75 = +₹3,750 positive MTM. Had the settlement been 24,000, the MTM would be −₹3,750. Futures are settled daily this way, before charges.`,
      },
      {
        q: `You buy a 24,100 CE at ₹100. What is the breakeven at expiry, and the maximum loss per lot of 75?`,
        a: `Breakeven = strike + premium = 24,100 + 100 = 24,200. Maximum loss = premium paid = 100 × 75 = ₹7,500 plus charges, which happens if NIFTY expires at or below 24,100.`,
      },
      {
        q: `You own 100 Reliance shares at ₹1,000 and buy a 950 put at ₹20. Reliance falls to ₹900 at expiry. What is the net result?`,
        a: `Shares lose (1,000 − 900) × 100 = ₹10,000. Put gains (950 − 900) × 100 = ₹5,000, minus premium 20 × 100 = ₹2,000, so +₹3,000. Net loss = −10,000 + 3,000 = −₹7,000. Without the put the loss would be ₹10,000. The maximum possible loss with the put is (1,000 − 950) × 100 + 2,000 = ₹7,000, before costs.`,
      },
    ],
    assignment:
      `Open a NIFTY option chain on NSE or your broker app. Write down the spot price, the nearest futures price, one CE premium and one PE premium. Label which number is the underlying and which are derivatives, and note that no two of them are equal.`,
  },
  topics: [
    {
      t: 1,
      def: `A derivative is a financial contract whose value is derived from another asset, called the underlying asset. The contract has no standalone value; its price moves because the underlying moves. Futures, options, forwards and swaps are the four main families.`,
      hi: `Derivative ka apna independent value source nahi hota. Iski value kisi doosre asset ke price se derive hoti hai. Jaise NIFTY 50 ka price move karta hai, toh NIFTY futures aur options ki value bhi change ho sakti hai.`,
      how: `Derivatives were created to solve real problems. A farmer wants to lock a selling price before harvest, a food company wants to lock a buying price, and a trader wants to benefit from price moves without storing wheat. Today the same logic works for Indian indices, stocks, gold, crude and USD/INR. Exchange-traded contracts trade on NSE and are cleared by NSCCL. Participants use them to hedge, speculate, arbitrage, manage portfolio exposure and lock in future prices.`,
      eg: {
        title: 'Wheat and NIFTY, same logic',
        text: `A farmer expects 100 tonnes of wheat in three months and fears a price fall, so he wants to sell at today's price. A food company fears a price rise and wants to buy at today's price. A trader simply expects wheat to rise. All three can use derivative contracts on wheat. In the stock market the same roles appear: a mutual fund hedges a portfolio, a trader buys a NIFTY call, and an arbitrageur trades the gap between spot and futures.`,
      },
      tip: `A derivative is a contract on a price, not the asset itself. Never confuse its price with the underlying's price.`,
      visual: {
        kind: 'flow',
        title: 'Where a derivative gets its value',
        caption: 'The underlying moves first; the contract follows according to its own terms.',
        steps: [
          { label: 'Underlying asset', note: 'NIFTY 50, Reliance, gold', tone: 'gold' },
          { label: 'Contract terms', note: 'strike, expiry, lot', tone: 'neutral' },
          { label: 'Derivative price', note: 'futures / option / forward', tone: 'ice' },
        ],
      },
    },
    {
      t: 2,
      def: `The underlying asset is the security, commodity or reference value on which a derivative is based. For a NIFTY option it is the NIFTY 50 index; for a Reliance stock option it is Reliance shares. Common underlyings are indices, stocks, commodities, currencies and interest rates or bonds.`,
      hi: `Underlying asset woh asset hai jiske price ke basis par derivative ki value change hoti hai. NIFTY option ka underlying NIFTY 50 hai, Reliance option ka underlying Reliance share hai. Underlying aur derivative ka price kabhi same nahi hota, yeh yaad rakhna.`,
      how: `Indices (NIFTY 50, BANK NIFTY, SENSEX) and individual stocks (Reliance, HDFC Bank, Infosys, TCS) are the most traded underlyings in Indian equity derivatives. Commodities such as gold, silver, crude oil and natural gas serve producers, consumers and traders. Currency derivatives like USD/INR help manage forex risk, and interest-rate or bond-linked contracts exist as well. The underlying price and the derivative price differ: NIFTY can be 24,000 while its futures trade at 24,025 and a call at ₹100.`,
      eg: {
        title: 'NIFTY as underlying',
        text: `NIFTY 50 = 24,000. You buy a 24,100 call for a premium of ₹100. The underlying is NIFTY at 24,000, the strike is 24,100 and the premium is ₹100. The option's value depends on NIFTY's price, time left to expiry, volatility and interest rates. The same NIFTY may have futures at 24,025 and the option at ₹100, so there are three different prices linked to one underlying. These figures are illustrative, not live quotes.`,
      },
      tip: `When you see a price, ask first: is this the underlying, the futures, or an option premium? Mixing them up causes wrong strike and P&L calculations.`,
      visual: {
        kind: 'layers',
        title: 'Types of underlying assets',
        caption: 'Wider layers are the ones you will meet most in Indian options trading.',
        layers: [
          { label: 'Stock indices', note: 'NIFTY 50, BANK NIFTY, SENSEX', tone: 'gold' },
          { label: 'Individual stocks', note: 'Reliance, HDFC Bank, Infosys, TCS', tone: 'ice' },
          { label: 'Commodities', note: 'gold, silver, crude oil, natural gas', tone: 'neutral' },
          { label: 'Currencies', note: 'USD/INR, EUR/INR, GBP/INR', tone: 'neutral' },
          { label: 'Interest rates and bonds', note: 'G-sec, yields', tone: 'neutral' },
        ],
      },
    },
    {
      t: 3,
      def: `A futures contract is a standardized, exchange-traded agreement to buy or sell an underlying at a fixed price on a set future date. Both buyer and seller have obligations. Profit or loss is the price change times the lot size, and a margin deposit is needed instead of the full value.`,
      hi: `Futures ek standardized contract hai jo exchange par trade hota hai. Isme buyer aur seller dono ki obligation hoti hai. Long futures matlab aapko lagta hai market upar jayega, short futures matlab aapko lagta hai market neeche jayega. Poora notional value nahi dena padta, sirf margin dena hota hai.`,
      how: `The exchange fixes the terms: lot size, expiry and tick size. You buy at an agreed price, and a clearing corporation (NSCCL) guarantees the trade. You post margin, which depends on the contract and market conditions; the 12% used in the PDF is just an example. Profit or loss is settled daily through mark-to-market (MTM): the difference between entry and the day's settlement price times lot size. For long futures P/L = (exit − entry) × lot size; for short futures it is (entry − exit) × lot size. Losses can be large and can exceed the initial margin.`,
      eg: {
        title: 'One NIFTY futures lot (illustrative lot 75)',
        text: `Spot 24,000, futures 24,050, lot 75 (illustrative). Notional = 24,050 × 75 = ₹18,03,750. At an illustrative 12% margin you need about ₹2,16,450. If you buy at 24,050 and exit at 24,150, profit = 100 × 75 = ₹7,500; exit at 23,950 and the loss is the same ₹7,500, before charges. If the day's settlement is 24,100, MTM = 50 × 75 = +₹3,750. With the current NIFTY lot of 65, the 100-point move would be ₹6,500.`,
      },
      tip: `Margin is a deposit, not the cost of the trade. Your exposure and your potential loss are based on the full notional.`,
      visual: {
        kind: 'payoff',
        title: 'Long futures payoff per unit',
        caption: 'A straight line: every point up is a point gained, every point down is a point lost. Entry 24,050.',
        spot: 24000,
        legs: [{ type: 'FUT', side: 1, strike: 24050 }],
      },
      calc: {
        id: 'futures-pnl',
        preset: { side: 'long', entry: 24050, exit: 24150, lotSize: 75, lots: 1 },
        why: `Opens with the PDF's long-futures example: 100 points × 75 = ₹7,500.`,
      },
    },
    {
      t: 4,
      def: `An option gives the buyer the right, but not the obligation, to buy (call, CE) or sell (put, PE) the underlying at a strike price on or before expiry. The buyer pays a premium; the seller (writer) receives it and takes on the obligation. A buyer's maximum loss is the premium paid.`,
      hi: `Option mein buyer ko right milta hai, obligation nahi. Call (CE) mein buy karne ka right, Put (PE) mein sell karne ka right. Buyer premium deta hai, seller premium leta hai aur obligation uthata hai. Buyer ka maximum loss sirf premium hota hai, lekin seller ka loss bahut bada ho sakta hai.`,
      how: `A call buyer benefits when the underlying rises; a put buyer benefits when it falls. At expiry a call is worth max(S − K, 0) and a put is worth max(K − S, 0), so P/L = (that value − premium) × lot. Breakeven is strike + premium for a call and strike − premium for a put. The same contract has two sides: you pay ₹100 and the seller receives ₹100. Options are not only bets; they are also used for hedging, spreads and risk management. The seller must maintain margin.`,
      eg: {
        title: '24,100 CE and 23,900 PE (illustrative lot 75)',
        text: `NIFTY 24,000, you buy a 24,100 CE at ₹100: cost 100 × 75 = ₹7,500, breakeven 24,200. At expiry 24,000 or 24,100 the loss is ₹100 per unit; at 24,300 the intrinsic value is 200 so net +₹100 per unit. For a 23,900 PE at ₹100: breakeven 23,800; at 23,700 intrinsic 200, net +₹100 per unit; at 23,900 or 24,000 the loss is ₹100 per unit. All before costs.`,
      },
      tip: `A bought option can lose value even when the market moves your way, because of time decay and falling volatility. Direction alone is not enough.`,
      visual: {
        kind: 'payoff',
        title: 'Long 24,100 CE at expiry',
        caption: 'Loss is capped at the premium (₹100). Profit starts above 24,200 and has no fixed cap.',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24100, premium: 100 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 100, expiryPrice: 24300, lotSize: 75, lots: 1 },
        why: `Reproduces the PDF's 24,300 expiry row: intrinsic 200, net +100 per unit.`,
      },
    },
    {
      t: 5,
      def: `Futures and options differ in who is obligated, what you pay and how much you can lose. In futures both sides are obligated and you post margin; in options the buyer has a right, pays a premium and risks only that premium. Time decay matters for options but not in the same way for futures.`,
      hi: `Futures mein dono parties ki obligation hoti hai, aur margin dena padta hai. Options mein buyer ko right milta hai, premium dena padta hai aur loss premium tak limited hota hai. Futures mein direction sahi hona important hai, options mein direction ke saath timing, strike, premium, volatility aur time decay bhi matter karte hain.`,
      how: `A futures buyer posts margin and carries daily MTM; losses can be substantial and can exceed the initial margin. An option buyer pays the premium upfront and cannot lose more than that (plus charges). An option seller receives premium but can face very large losses and must maintain margin. Options have time decay and depend on implied volatility; futures do not have option-style decay. Neither is universally better: futures give direct exposure without premium, options give a defined-risk long position or a structured payoff.`,
      eg: {
        title: 'Expecting NIFTY +300 points (illustrative lot 75)',
        text: `Choice A, buy futures at 24,050: exit at 24,350 earns 300 × 75 = ₹22,500, but a 300-point fall loses ₹22,500. Choice B, buy the 24,100 CE at ₹100: premium paid ₹7,500, which is the maximum loss if it expires worthless. If NIFTY rises, the option may profit, but its premium also depends on time left and implied volatility. Costs are ignored here, and with the current lot of 65 the futures figure would be 300 × 65 = ₹19,500.`,
      },
      tip: `Futures need only the right direction. Options need direction, timing and the right price. That is why option buyers can be correct on direction and still lose.`,
      visual: {
        kind: 'compare',
        title: 'Futures vs options',
        caption: 'Same view (bullish), different risk shape.',
        left: {
          head: 'Futures',
          tone: 'ice',
          points: ['Both sides obligated', 'Buyer posts margin', 'Loss potentially very large', 'No option-style time decay'],
        },
        right: {
          head: 'Options',
          tone: 'gold',
          points: ['Buyer has right, seller obligation', 'Buyer pays premium', 'Buyer loss limited to premium', 'Time decay and IV matter'],
        },
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 100, lotSize: 75, lots: 1, spot: 24000, marginPct: 12 },
        why: `Shows the cost of one call lot (₹7,500) next to the notional exposure of the underlying.`,
      },
    },
    {
      t: 6,
      def: `A forward is a privately negotiated (OTC) agreement to buy or sell an asset at a set price on a future date, with customisable terms. A futures contract does the same job but is standardized, traded on an exchange and guaranteed by a clearing corporation.`,
      hi: `Forward contract mein buyer aur seller directly apni requirement ke according deal banate hain, yeh OTC hota hai. Futures exchange ke predefined rules aur standardized lot size ke saath trade hota hai. Forward mein counterparty risk zyada, futures mein clearing corporation ki wajah se kam.`,
      how: `In a forward the two parties choose the amount, date and price themselves, so it can fit a company's exact need, for example USD 137,500 in 73 days. The cost is more direct counterparty risk and usually lower liquidity. A futures contract has exchange-fixed terms, daily MTM and a clearing corporation between the parties, which reduces counterparty risk through margins. Forwards are common between banks and corporates, especially in currency; futures are what retail traders use on NSE.`,
      eg: {
        title: 'Company locks USD/INR with a bank (illustrative)',
        text: `An Indian company must pay USD 100,000 in three months. Today USD/INR is ₹84. It enters a forward with a bank to buy at ₹85. Agreed payment = 100,000 × 85 = ₹85,00,000. If USD/INR rises to ₹88, the company still pays ₹85 per dollar; buying at ₹88 would have cost ₹88,00,000, so the forward saves ₹3,00,000 in that case. If USD/INR had instead fallen to ₹83 the company would still pay ₹85, so a forward gives certainty, not the best price.`,
      },
      tip: `A hedge buys certainty, not profit. A forward can end up worse than the spot price and that is not a failure.`,
      visual: {
        kind: 'compare',
        title: 'Forward vs futures',
        caption: 'Customisation versus standardisation and clearing safety.',
        left: {
          head: 'Forward (OTC)',
          tone: 'neutral',
          points: ['Privately negotiated', 'Customisable terms', 'Direct counterparty risk', 'Settled mainly at maturity'],
        },
        right: {
          head: 'Futures (exchange)',
          tone: 'ice',
          points: ['Standardized contract', 'Clearing corporation in between', 'Daily MTM and margin', 'Generally more transparent'],
        },
      },
    },
    {
      t: 7,
      def: `A swap is a derivative in which two parties agree to exchange cash flows over a period of time on agreed terms. Common types are interest rate swaps, currency swaps, commodity swaps and credit default swaps. Banks, institutions and large corporations are the main users.`,
      hi: `Swap mein do parties ek period ke liye apne cash flows exchange karne ka agreement karti hain. Jaise ek company floating rate loan ko fixed jaisa bana sakti hai. Yeh mostly banks aur badi companies use karti hain, retail trader ko abhi swap pricing master karne ki zaroorat nahi.`,
      how: `In an interest rate swap one party pays a fixed rate and receives a floating rate on an agreed notional amount, changing its interest-rate exposure without changing the original loan. A currency swap exchanges cash flows (often principal and interest) in two currencies, for example an Indian company needing USD and a US company needing INR. A commodity swap exchanges fixed and floating commodity-linked payments, for example an airline managing fuel cost. A credit default swap transfers specified credit risk in return for a premium; it resembles insurance but is not identical in a legal or regulatory sense.`,
      eg: {
        title: 'Interest rate swap in words',
        text: `Company A has a floating-rate loan and wants predictable payments. Company B has a fixed-rate loan and is happy to take floating exposure. They agree on a notional amount and exchange interest cash flows: A pays fixed and receives floating; B does the opposite. Neither loan changes, only the net interest-rate exposure of each company. No numbers are needed at this stage; swap pricing is beyond this module.`,
      },
      tip: `You will rarely trade a swap as a retail trader. Know what it is so that you understand how banks and corporates manage risk.`,
      visual: {
        kind: 'flow',
        title: 'Interest rate swap: who pays what',
        caption: 'Only the interest cash flows are exchanged on the agreed notional, not the loans themselves.',
        steps: [
          { label: 'Company A', note: 'has floating loan, wants predictable cost', tone: 'ice' },
          { label: 'Swap agreement', note: 'A pays fixed, B pays floating', tone: 'gold' },
          { label: 'Company B', note: 'has fixed loan, wants floating exposure', tone: 'ice' },
        ],
      },
    },
    {
      t: 8,
      def: `Hedging reduces risk on an existing or expected exposure. Speculation takes a position to profit from an expected price move. Arbitrage tries to profit from a price difference between related assets or markets. These are the three main reasons derivatives are used.`,
      hi: `Hedging ka matlab hai apne existing investment ko loss se protect karna, maximum profit banana nahi. Speculation mein aap direction predict karke profit kamane ki koshish karte ho, aur prediction galat bhi ho sakti hai. Arbitrage mein related markets ke price difference se kamaane ki koshish hoti hai, lekin costs ke baad woh gap aksar gayab ho jaata hai.`,
      how: `A hedger holds or expects an exposure and adds an opposite position, such as a protective put on shares owned; risk is reduced, not eliminated. A speculator has no existing exposure and takes a directional view, so the result depends on being right and on strategy. An arbitrageur buys cheap and sells dear in related markets, for example cash-and-carry between spot and futures, index arbitrage or cross-exchange. Real arbitrage profit must be net of brokerage, exchange charges, taxes, bid-ask spread, slippage, financing cost and execution risk, so a visible gap is not automatically risk-free.`,
      eg: {
        title: 'Protective put on Reliance (illustrative)',
        text: `You own 100 Reliance shares at ₹1,000 (₹1,00,000 invested). You buy a 950 put at ₹20 per share, costing 100 × 20 = ₹2,000. If Reliance falls to ₹900 at expiry, shares lose ₹10,000, the put is worth (950 − 900) × 100 = ₹5,000, minus the ₹2,000 premium, so the put gains ₹3,000. Net loss is ₹7,000 instead of ₹10,000. If Reliance instead rises, you lose only the ₹2,000 premium on the put. Arbitrage check: buying at ₹100 and selling at ₹102 on 1,000 units is a gross ₹2,000, but costs may shrink or erase it.`,
      },
      tip: `Hedging has a cost, and a hedge that expires unused did its job. Do not call it speculation or a loss.`,
      visual: {
        kind: 'payoff',
        title: 'Shares plus protective put (per share)',
        caption: 'The put (strike 950, premium ₹20) puts a floor under the loss; shares are shown as a long position at 1,000.',
        spot: 1000,
        legs: [
          { type: 'FUT', side: 1, strike: 1000 },
          { type: 'PE', side: 1, strike: 950, premium: 20 },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'buy', strike: 950, premium: 20, expiryPrice: 900, lotSize: 100, lots: 1 },
        why: `Reproduces the put leg of the hedge: (950 − 900) × 100 − 2,000 = +₹3,000.`,
      },
    },
  ],
}
export default m
