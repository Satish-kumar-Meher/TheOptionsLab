import type { ModuleLesson } from '../topicLessonTypes'

/* Module 3.5 — Option Contract Specifications (follows the course PDF: lot 75 illustrative in most examples,
 * the charges example uses lot 65; charge rates are as published in the PDF — verify current rates). */
const m: ModuleLesson = {
  moduleId: '3.5',
  intro: `Being right about direction is not enough in options. You also need to know the contract itself: how many units are in a lot, which strikes exist, when the contract dies, how it settles and what the trade really costs after charges. This module is the pre-trade checklist for every CE or PE order you will ever place.`,
  introHi: `Options mein sirf direction sahi hona kaafi nahi hai. Aapko contract bhi pata hona chahiye: ek lot mein kitni quantity hai, kaun se strikes available hain, expiry kab hai, settlement kaise hota hai aur charges kitne lagte hain. Yeh module har CE ya PE order se pehle ki checklist hai.`,
  steps: {
    concept: `Every exchange-traded option is a standard contract with fixed fields: underlying, CE or PE, strike, expiry, lot size, tick size and settlement style. The exchange (NSE) defines these, not your broker. Misreading any field can turn a correct view into a loss, an unexpected delivery obligation or a trade whose charges eat the profit.`,
    conceptHi: `Har exchange-traded option ek standard contract hota hai: underlying, CE ya PE, strike, expiry, lot size, tick size aur settlement style. Yeh sab NSE tay karta hai, broker nahi. Koi ek field galat padh liya toh sahi view hone par bhi loss, delivery ki obligation ya charges se profit khatam ho sakta hai.`,
    mechanism: `NSE publishes contract specifications and a daily contract file. New expiries and strikes are introduced as older ones expire, following the exchange's strike scheme. Rules such as lot size, expiry day and charges can change through exchange circulars and SEBI rules, so the contract file is the source of truth. Index options (NIFTY) are cash-settled, while individual stock options are physically settled. NSE index derivative expiries currently fall on Tuesday, moving to the previous trading day if Tuesday is a holiday. Every trade then attracts brokerage, STT, exchange charges, GST, SEBI fee and stamp duty.`,
    example: {
      title: 'Reading one contract: NIFTY | 10-Nov-2026 | 24000 | CE',
      text: `Illustrative. This line says: underlying NIFTY, expiry Tuesday 10 November 2026, strike 24,000, Call. With an illustrative lot of 75 (the current NIFTY lot is 65, so verify in the contract file) and premium Rs 100, one lot costs 100 x 75 = Rs 7,500, and two lots cost Rs 15,000. Premium moves in steps of Rs 0.05 (tick size). If NIFTY settles at 24,200 on expiry, the cash-settled value is (200 - 100) x 75 = Rs 7,500 profit before charges. No index units change hands.`,
    },
    chart: {
      kind: 'compare',
      title: 'Cash settlement vs physical settlement',
      caption: 'Index options settle in money; stock options settle in shares. This changes your risk near expiry.',
      left: { head: 'Index option (NIFTY)', tone: 'ice', points: ['Cash-settled, European style', 'Profit or loss paid as money', 'No shares delivered', 'Example: NIFTY 24,000 CE'] },
      right: { head: 'Stock option (Reliance)', tone: 'gold', points: ['Physically settled at expiry', 'Shares delivered or received', 'ITM positions can create big funds or share obligations', 'Close before the broker cutoff if you do not want delivery'] },
    },
    optionChain: `The option chain is built directly from these specifications: the strike column shows the strike interval, each row is a separate contract for the selected expiry, and the expiry drop-down lists the weekly and monthly series that exist. Lot size, tick size and quantity freeze are not shown on every chain, so confirm them in the broker's contract details or the NSE contract file. Always inspect the real strike ladder instead of assuming a Rs 50 gap.`,
    psychology: `Beginners often focus only on direction and ignore lot size, expiry day and charges, then get surprised by a bigger rupee loss, a weekly contract with only a few days of life, or a net profit much smaller than expected. Scalpers who trade 20 times a day feel charges most. A calm routine of ticking the contract checklist before every order removes many avoidable errors.`,
    scenarios: {
      bullish: `NIFTY rises. A bought call is worth more, but the weekly contract has less time, so a late rally may not clear breakeven. In a stock option, an ITM call held to expiry can lead to a share-purchase obligation, so know the cutoff.`,
      bearish: `NIFTY falls. A bought put gains and is settled in cash at expiry. A short ITM stock put can mean having to buy the shares at the strike, which needs funds or margin.`,
      sideways: `NIFTY stays flat. Option sellers may keep the premium, but each trade still pays brokerage and STT on the sell side, and time decay is fastest in the final days of a weekly contract.`,
    },
    practice: [
      {
        q: `One lot is 65 units. You buy 3 lots at a premium of Rs 100. What is the premium outlay, and what is the P&L if the premium rises by Rs 10?`,
        a: `Units = 3 x 65 = 195. Outlay = 100 x 195 = Rs 19,500. A Rs 10 rise gives 10 x 195 = Rs 1,950 gross profit, before charges.`,
      },
      {
        q: `A Reliance 1,400 CE (250 shares, illustrative) is held to expiry and the settlement price is Rs 1,500. What is the intrinsic value and what could the long holder have to do?`,
        a: `Intrinsic value per share = 1,500 - 1,400 = Rs 100, so 100 x 250 = Rs 25,000 of value. As stock options are physically settled, the long holder may have to take delivery of 250 shares by paying 1,400 x 250 = Rs 3,50,000, so funds must be available or the position closed earlier.`,
      },
      {
        q: `Using the PDF rates, what is the STT on selling 1 lot (65 units) of an option at Rs 150?`,
        a: `Sell turnover = 150 x 65 = Rs 9,750. STT = 0.15% x 9,750 = Rs 14.625, about Rs 14.63. Verify current rates before relying on this.`,
      },
      {
        q: `A quantity freeze of 1,800 units (illustrative) applies and the lot is 75. You want 3,600 units. What do you do?`,
        a: `3,600 / 75 = 48 lots, and 1,800 / 75 = 24 lots per order. So you place at least 2 orders of 24 lots each, subject to exchange and broker rules.`,
      },
    ],
    assignment: `Download or open the NSE contract specification and contract information for NIFTY. Write down the current lot size, strike interval, weekly and monthly expiry dates, tick size and quantity freeze. Then run the charges calculator on a buy-then-sell example and record gross P&L, charges and net P&L.`,
  },
  topics: [
    {
      t: 1,
      def: `Lot size is the fixed number of units in one exchange-traded derivative contract. You can trade only in whole lots, never a part of a lot. Your rupee outlay and your P&L both scale with lot size.`,
      hi: `Lot size matlab ek contract mein fixed units ki quantity. Aap sirf poore lots mein trade kar sakte ho, aadha lot nahi. Isliye aapka paisa aur P&L dono lot size ke hisaab se badhte hain.`,
      how: `NSE decides lot sizes and revises them periodically through circulars, and they differ between NIFTY, BANKNIFTY, SENSEX (BSE) and each stock. Total units = lot size x number of lots, and premium outlay = premium x units. Because P&L = premium change x units, a Rs 10 move on 75 units is Rs 750 per lot. Never copy a lot size from an old post; read the current contract file.`,
      eg: {
        title: 'Premium Rs 100, 2 lots of 75',
        text: `Illustrative lot size 75 (the current NIFTY lot is 65, so rupee figures would be lower). 1 lot = 75 units, 2 lots = 150 units, 5 lots = 375 units. Premium outlay for 2 lots = 100 x 75 x 2 = Rs 15,000. If the premium rises by Rs 10, P&L is 10 x 75 = Rs 750 for one lot and 10 x 75 x 5 = Rs 3,750 for five lots, before charges.`,
      },
      tip: `Before you pick a quantity, convert every lot into rupees of risk. Never assume two underlyings share a lot size.`,
      visual: {
        kind: 'bars',
        title: 'Premium outlay at Rs 100 premium, lot 75',
        caption: 'Outlay grows in step with the number of lots.',
        unit: ' Rs',
        items: [
          { label: '1 lot (75 units)', value: 7500, tone: 'gold' },
          { label: '2 lots (150 units)', value: 15000, tone: 'gold' },
          { label: '5 lots (375 units)', value: 37500, tone: 'gold' },
        ],
      },
      calc: { id: 'lot-value', preset: { premium: 100, lotSize: 75, lots: 2, spot: 24000 }, why: 'Reproduces the PDF lot-size calculator: Rs 100 x 75 x 2 = Rs 15,000.' },
    },
    {
      t: 2,
      def: `Strike interval is the gap between two consecutive strike prices of an underlying. It decides which ATM, ITM and OTM strikes you can pick. It can differ between indices, stocks and price levels.`,
      hi: `Strike interval do consecutive strikes ke beech ka gap hota hai. Isi se tay hota hai ki aap kaun sa ATM, ITM ya OTM strike chun sakte ho. Yeh har index aur stock mein alag ho sakta hai.`,
      how: `NSE publishes a strike scheme for each underlying, and strikes near the spot are usually closely spaced while far strikes can be spaced wider. Not every possible strike is always listed. When the spot moves, the exchange adds new strikes according to its scheme. Your strategy choices (ATM, spreads, hedges) depend on the real list, so check the option chain rather than assuming Rs 50.`,
      eg: {
        title: 'NIFTY strikes at a 50-point gap',
        text: `Illustrative chain: 23,800, 23,850, 23,900, 23,950, 24,000, 24,050, 24,100. The interval is 24,050 - 24,000 = Rs 50. With NIFTY at 24,000, the 24,000 strike is ATM. For calls, 23,900 and 23,950 are ITM and 24,050 and 24,100 are OTM. A call spread between 24,000 and 24,100 is therefore 2 strike steps wide.`,
      },
      tip: `Never hard-code a strike gap in your head or your code. Read the listed strikes for that expiry.`,
      visual: { kind: 'ladder', title: 'Strike ladder for a call, spot 24,000', caption: 'Below spot is ITM for a call, above spot is OTM.', optType: 'CE', spot: 24000, strikes: [23900, 23950, 24000, 24050, 24100] },
      calc: { id: 'moneyness', preset: { optType: 'CE', spot: 24000, strike: 24100 }, why: 'Classifies a strike on the ladder as ITM, ATM or OTM.' },
    },
    {
      t: 3,
      def: `A weekly option is a contract that expires within the same week on a fixed weekday. Each weekly expiry is a separate contract with its own premium, OI and option chain. Weekly contracts give short-duration exposure.`,
      hi: `Weekly option woh contract hota hai jo usi hafte ek fixed din expire ho jata hai. Har weekly expiry alag contract hai, uska apna premium aur OI hota hai. Isse short-term trading ke mauke milte hain.`,
      how: `As per the NSE specifications quoted in the course PDF, NIFTY 50 has weekly options, other NSE indices have monthly expiries, and NSE index derivative expiry is on Tuesday (previous trading day if it is a holiday). SEBI's framework allows weekly options on one benchmark index per exchange, so weekly series are not available for every index or stock. Traders use weeklies for event trades, expiry-day moves and short-term hedges. They decay fast, so a late view can fail even when direction is right.`,
      eg: {
        title: 'Four separate NIFTY weekly contracts',
        text: `Hypothetical schedule: Tuesday 10 November, 17 November, 24 November and 1 December 2026. A 24,000 CE for 10 November and a 24,000 CE for 17 November share a strike but are different contracts, each with its own price. On 4 November, the 10 November contract has 6 days left and the 17 November one has 13 days left. Always confirm dates in the NSE contract file.`,
      },
      tip: `A weekly contract is not a cheaper way to be right; it is a shorter one. Less time means less room to be wrong.`,
      visual: {
        kind: 'timeline',
        title: 'Hypothetical NIFTY weekly series',
        caption: 'Each Tuesday expiry is its own contract. Confirm real dates on the NSE contract file.',
        events: [
          { when: 'Tue 10 Nov 2026', what: 'Weekly expiry 1' },
          { when: 'Tue 17 Nov 2026', what: 'Weekly expiry 2' },
          { when: 'Tue 24 Nov 2026', what: 'Weekly expiry 3 (also the monthly in this example)' },
          { when: 'Tue 1 Dec 2026', what: 'Weekly expiry 4' },
        ],
      },
    },
    {
      t: 4,
      def: `A monthly option expires on the exchange's designated monthly expiry date, not 30 days after you buy it. It usually has more time remaining than a weekly contract. That is why its premium usually carries more time value.`,
      hi: `Monthly option exchange ki tay ki hui monthly expiry date par expire hota hai, kharidne ke 30 din baad nahi. Isme usually weekly se zyada time hota hai. Isliye iska premium aksar zyada time value rakhta hai.`,
      how: `The monthly expiry sits in the designated expiry week of the month; for NIFTY the course PDF says the last Tuesday of the month under the published NSE schedule. Longer-dated contracts suit traders who want time for a view to play out and those hedging for longer. Theta (daily time decay) also speeds up as monthly expiry approaches. Premiums are also driven by implied volatility and interest rates, not by time alone, so a longer contract is not always priced higher.`,
      eg: {
        title: 'Weekly vs monthly 24,000 CE on 4 November',
        text: `Illustrative. NIFTY is 24,000 on 4 November. The weekly 24,000 CE expires 10 November (6 days) and the monthly 24,000 CE expires 24 November (20 days). Both have the same strike, but the monthly generally carries more time value, so its premium need not equal the weekly premium. For example, the weekly may trade near Rs 70 and the monthly near Rs 150, which are made-up numbers for comparison only.`,
      },
      tip: `Choose expiry based on how long your view needs. Buying too little time is a common reason a right view still loses.`,
      visual: {
        kind: 'compare',
        title: 'Weekly vs monthly option',
        left: { head: 'Weekly', tone: 'gold', points: ['Every eligible week', 'Shorter life', 'Lower time value', 'Rapid decay near expiry', 'Short-term trading'] },
        right: { head: 'Monthly', tone: 'ice', points: ['Designated month-end expiry', 'Longer life', 'More time value', 'Decay also speeds up near expiry', 'Longer views and hedging'] },
      },
    },
    {
      t: 5,
      def: `An expiry calendar lists the scheduled expiry dates of each derivative contract. It tells you when time decay, gamma risk, OI changes and settlement will peak. Always use the exchange's calendar rather than memory.`,
      hi: `Expiry calendar mein har derivative contract ki scheduled expiry dates hoti hain. Isse pata chalta hai ki time decay, gamma risk aur settlement kab sabse zyada hoga. Hamesha exchange ka calendar dekho, yaad par bharosa mat karo.`,
      how: `NSE publishes expiry dates in its contract specifications, contract information and option chain pages. If the scheduled Tuesday is an exchange holiday, the expiry moves to the previous trading day under the rule quoted in the PDF. The calendar also affects strategy: expiry-day trades, rollovers and margin planning all depend on the real date. Old screenshots and some broker calendars can be out of date.`,
      eg: {
        title: 'Holiday shift',
        text: `Hypothetical schedule: NIFTY weekly on 10 and 17 November 2026, monthly on 24 November and a quarterly contract on 29 December 2026. Suppose the scheduled Tuesday were an exchange holiday. The expiry would then move to Monday, the previous trading day, so a plan to hold until Tuesday would end a day earlier. Verify on NSE before planning an expiry-day trade.`,
      },
      tip: `Check the expiry date on the order ticket, not just the strike. The wrong expiry is an easy and expensive mistake.`,
      visual: {
        kind: 'flow',
        title: 'Expiry when Tuesday is a holiday',
        steps: [
          { label: 'Scheduled expiry: Tuesday', tone: 'gold' },
          { label: 'Tuesday is an exchange holiday', tone: 'bear' },
          { label: 'Expiry moves to previous trading day', note: 'Monday', tone: 'ice' },
        ],
      },
    },
    {
      t: 6,
      def: `Contract introduction means the exchange makes a new contract available. Discontinuation means a contract, strike or whole underlying stops being offered. Every contract is identified by its underlying, expiry, strike, CE or PE and lot size.`,
      hi: `Contract introduction matlab exchange ek naya contract trading ke liye start karta hai. Discontinuation matlab koi contract, strike ya poora underlying band ho jata hai. Har contract ki pehchaan underlying, expiry, strike, CE/PE aur lot size se hoti hai.`,
      how: `New contracts appear after older ones expire, following the exchange's schedule and strike scheme. A stock can be removed from the F&O list if it stops meeting eligibility rules; then NSE may stop adding new contracts while existing ones run to expiry under the circular. NSE publishes an F&O introduction and exclusion tracker. If you collect option-chain data, store symbol, underlying, expiry, strike, CE/PE, lot size, introduction date, status and last trading date. Otherwise your backtest may use contracts that did not exist on that date, creating look-ahead or survivorship bias.`,
      eg: {
        title: 'Identifying one contract',
        text: `NIFTY | 10-Nov-2026 | 24000 | CE describes one call contract. Imagine a data collector that saves only today's strikes: a backtest of an earlier month would wrongly treat strikes listed later as if they existed then. The fix is to save a versioned row per contract with its introduction date, lot size at that time and status (active, expired, discontinued).`,
      },
      tip: `Never assume today's contract list equals the historical one. Version contract details by effective date.`,
      visual: {
        kind: 'flow',
        title: 'Contract lifecycle',
        steps: [
          { label: 'Introduced', note: 'New expiry and strikes listed', tone: 'ice' },
          { label: 'Active', note: 'Trades daily', tone: 'gold' },
          { label: 'Expiry or discontinuation', note: 'Settled or removed by rule', tone: 'neutral' },
        ],
      },
    },
    {
      t: 7,
      def: `ITM options have intrinsic value, OTM options have none and ATM options are close to zero intrinsic value. For a call, intrinsic value is max(S - K, 0); for a put it is max(K - S, 0). In-the-money European options are automatically exercised at expiry.`,
      hi: `ITM option mein intrinsic value hoti hai, OTM mein zero aur ATM mein lagbhag zero. Call ke liye intrinsic value max(S - K, 0) aur put ke liye max(K - S, 0) hoti hai. ITM European option expiry par apne aap exercise ho jata hai.`,
      how: `Moneyness is judged at the final settlement price. For a call, a strike below spot is ITM and above spot is OTM; for a put it is reversed. At expiry, an ITM option is automatically exercised under the European-style rules, so you do not need to submit an exercise request. How it settles then depends on the contract: cash for index options and physical delivery for stock options. Do not assume an ITM stock option can simply be ignored.`,
      eg: {
        title: 'NIFTY at 24,000: calls vs puts',
        text: `Spot 24,000. Calls: 23,800 and 23,900 ITM, 24,000 ATM, 24,100 and 24,200 OTM. Puts: 24,100 and 24,200 ITM, 24,000 ATM, 23,800 and 23,900 OTM. If you buy the 24,000 CE at Rs 100 (lot 75, illustrative) and NIFTY settles at 24,200, intrinsic value is 200 and net profit is (200 - 100) x 75 = Rs 7,500 before charges.`,
      },
      tip: `Intrinsic value is not the same as profit. Subtract the premium you paid.`,
      visual: { kind: 'ladder', title: 'Put strikes at spot 24,000', caption: 'For a put the logic is reversed: strikes above spot are ITM.', optType: 'PE', spot: 24000, strikes: [23800, 23900, 24000, 24100, 24200] },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 100, expiryPrice: 24200, lotSize: 75, lots: 1 }, why: 'Shows the PDF figure: intrinsic 200, net (200 - 100) x 75 = Rs 7,500.' },
    },
    {
      t: 8,
      def: `Cash settlement pays profit or loss in money and no underlying is delivered. Physical settlement means shares are actually delivered or received. In India, index options are cash-settled and individual stock options are physically settled at expiry.`,
      hi: `Cash settlement mein profit ya loss paise mein settle hota hai, underlying deliver nahi hota. Physical settlement mein shares sach mein deliver ya receive hote hain. India mein index options cash-settled hain aur stock options physically settled.`,
      how: `For NIFTY options, the clearing corporation computes the cash difference using the expiry settlement value, with no index units delivered. For stock options held ITM to expiry, a long call can mean paying strike x quantity to receive shares, a short call can mean delivering shares, a long put can mean delivering shares and a short put can mean buying shares. These obligations run through the clearing and settlement system and can bring large funds needs, additional margin, penalties or broker square-off. Check your broker's expiry cutoff policy.`,
      eg: {
        title: 'NIFTY cash vs Reliance delivery',
        text: `NIFTY expiry settlement value 24,200, 24,000 CE bought at Rs 100, 75 units (illustrative): cash settlement value (200 - 100) x 75 = Rs 7,500. No NIFTY units are delivered. Now a Reliance 1,400 CE (250 shares, illustrative) with settlement at Rs 1,500 is ITM by Rs 100. If held, the long holder faces buying 250 shares at 1,400 = Rs 3,50,000 of delivery obligation, far more than the premium paid.`,
      },
      tip: `If you do not want delivery of shares, close stock option positions before your broker's cutoff. Never assume only the premium difference is settled.`,
      visual: {
        kind: 'compare',
        title: 'Index option vs stock option',
        left: { head: 'Index option (NIFTY CE)', tone: 'ice', points: ['Underlying is an index', 'Cash settlement', 'No share delivery', 'Expiry obligation is cash'] },
        right: { head: 'Stock option (Reliance CE)', tone: 'gold', points: ['Underlying is a company share', 'Physical settlement', 'Share delivery or receipt when applicable', 'Can create large funds or share needs'] },
      },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 100, expiryPrice: 24200, lotSize: 75, lots: 1 }, why: 'Cash-settled NIFTY example from the PDF: Rs 7,500 net.' },
    },
    {
      t: 9,
      def: `Exchange contract specifications are the official fields that define every contract: underlying, instrument type, symbol, expiry, strike, option type, lot size, strike interval, tick size and quantity freeze. They are your source of truth. Tick size is the minimum premium step; quantity freeze is the maximum quantity in a single order.`,
      hi: `Exchange contract specifications woh official fields hain jo har contract ko define karti hain: underlying, symbol, expiry, strike, lot size, tick size, quantity freeze waghera. Tick size premium ka minimum step hai aur quantity freeze ek order ki maximum quantity.`,
      how: `NSE publishes equity derivatives contract specifications, contract information with permitted lot sizes and a live option chain. The PDF quotes a published index-option premium tick size of Rs 0.05, so valid prices are 100.00, 100.05 and 100.10, but not 100.03. Quantity freeze is different from lot size: a large order above the freeze must be split into several orders, subject to exchange and broker rules. If you build a trading application, store specifications versioned by effective date so history keeps the rules that applied then.`,
      eg: {
        title: 'Tick size and quantity freeze',
        text: `Tick size Rs 0.05: a limit price of Rs 100.03 is invalid, Rs 100.05 is valid. Quantity freeze (illustrative 1,800 units): with lot 75, that is 24 lots per order. An order for 3,600 units is 48 lots, so it needs at least 2 orders. Lot size says how much is in one contract; quantity freeze says how much one order can carry.`,
      },
      tip: `Lot size and quantity freeze are different. Keep both, with tick size, in your contract record.`,
      visual: {
        kind: 'compare',
        title: 'Lot size vs quantity freeze',
        left: { head: 'Lot size', tone: 'gold', points: ['Units in one contract', 'Example: 75 (illustrative)', 'Sets the minimum tradable quantity'] },
        right: { head: 'Quantity freeze', tone: 'ice', points: ['Maximum units in one order', 'Example: 1,800 (illustrative)', 'Bigger orders are split'] },
      },
    },
    {
      t: 10,
      def: `Brokerage and transaction charges are the costs between your gross P&L and what you actually keep. They include brokerage, STT, exchange charges, GST, SEBI turnover fee and stamp duty. For options, exchange charges and most taxes are computed on premium turnover, not on the full notional value.`,
      hi: `Brokerage aur transaction charges woh costs hain jo gross P&L aur aapke asli profit ke beech aate hain. Isme brokerage, STT, exchange charges, GST, SEBI fee aur stamp duty aate hain. Options mein exchange charges aur zyadatar taxes premium turnover par lagte hain, poori notional value par nahi.`,
      how: `As per the course PDF (verify current rates): STT is 0.15% of premium on the sale of an option, paid by the seller, plus 0.15% of intrinsic value if an option is exercised, paid by the purchaser. NSE's published equity options transaction charge, including IPFT, is Rs 3,553 per crore of premium turnover per side, SEBI turnover fee is Rs 10 per crore, stamp duty is 0.003% on the buy side and GST is 18% on brokerage, exchange charges and SEBI fee. Brokerage depends on your broker's tariff, for example an assumed Rs 20 per executed order. Actual contract notes can differ in rounding and other levies.`,
      eg: {
        title: 'Round trip: buy at Rs 100, sell at Rs 150, lot 65',
        text: `Illustrative, using the PDF's assumptions. Gross profit = (150 - 100) x 65 = Rs 3,250. Buy turnover = 6,500 and sell turnover = 9,750, total 16,250. Brokerage 20 x 2 = Rs 40.00. STT 0.15% x 9,750 = Rs 14.63. NSE charges 3,553 per crore x 16,250 = Rs 5.76. SEBI fee Rs 0.02. Stamp duty 0.003% x 6,500 = Rs 0.20. GST 18% x (40 + 5.77 + 0.02) = Rs 8.24. Total charges are about Rs 68.85, so net P&L is about Rs 3,181.15.`,
      },
      tip: `Estimate charges before the trade. A small premium move can be wiped out by costs, especially when you scalp 20 trades a day.`,
      visual: {
        kind: 'bars',
        title: 'Charges on the round-trip example',
        caption: 'Brokerage is the biggest part here; STT is next. Total about Rs 68.85.',
        unit: ' Rs',
        items: [
          { label: 'Brokerage (2 orders)', value: 40, tone: 'gold' },
          { label: 'STT on sell', value: 14.63, tone: 'gold' },
          { label: 'GST', value: 8.24, tone: 'neutral' },
          { label: 'NSE charges + IPFT', value: 5.76, tone: 'neutral' },
          { label: 'Stamp duty', value: 0.2, tone: 'ice' },
          { label: 'SEBI fee', value: 0.02, tone: 'ice' },
        ],
      },
      calc: { id: 'charges', preset: { premium: 150, lotSize: 65, lots: 1, side: 'sell', brokerage: 20 }, why: 'Sell leg of the PDF example (turnover Rs 9,750, STT Rs 14.63); run the buy leg at Rs 100 too and add them.' },
    },
  ],
  tools: [
    { id: 'lot-value', preset: { premium: 100, lotSize: 75, lots: 2, spot: 24000 }, why: 'Premium outlay for any lot count.' },
    { id: 'charges', preset: { premium: 100, lotSize: 65, lots: 1, side: 'buy', brokerage: 20 }, why: 'Buy leg of the round-trip example.' },
  ],
}
export default m
