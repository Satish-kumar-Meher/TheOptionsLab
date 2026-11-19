import type { ModuleLesson } from '../topicLessonTypes'

/* Module 24.7 - Algo Trading. Illustrative numbers.
 * BS (NIFTY 24,000, ATM CE, 4 days, IV 14%, r 6.5%, q 1.3%): price 147.2, delta 0.518, theta -19.27/day, vega 10.0 per vol point. 1-day 1-sigma move 175.9.
 * Rule: premium 150, SL 30% = 45/unit x 65 = 2,925; target 60% = 90 x 65 = 5,850.
 * Chain strip (lakh): CE 12+20+55+48+62 = 197; PE 58+46+52+22+14 = 192; PCR 0.975. OI change 62 -> 70 = +8 (12.9%).
 * Fills: 40 @ 150 + 25 @ 151 = 9,775 / 65 = 150.38. MTM: (120-150) x 65 = -1,950. Daily loss cap 2% of 5,00,000 = 10,000.
 * Sizing: 1% = 5,000; risk per lot 45 x 65 = 2,925; 5,000/2,925 = 1.7 -> 1 lot. */
const m: ModuleLesson = {
  moduleId: '24.7',
  intro: `Algorithmic trading means a program, not your finger on the button, applies your rules to market data and sends orders. This module walks through the building blocks: rules, signals, data handling, live Greeks and OI, execution through broker APIs, order and position management and automatic risk controls. It also covers how SEBI's retail algo framework changes what an individual may do.`,
  introHi: `Algorithmic trading matlab aapki ungli ki jagah ek program market data par aapke rules lagata hai aur orders bhejta hai. Is module mein building blocks hain: rules, signals, data handling, live Greeks aur OI, broker API se execution, order aur position management aur automatic risk controls. Yeh bhi dekhenge ki SEBI ka retail algo framework ek individual ke liye kya badalta hai.`,
  steps: {
    concept: `An algo is a precise rule set turned into code. It removes hesitation and some emotion, but it also repeats mistakes at machine speed. If the rule has no edge, automation only loses money faster. Build the rule, test it properly (the previous module), then automate with guard rails.`,
    conceptHi: `Algo ek precise rule set hai jo code mein badla gaya hai. Yeh hichkichahat aur thodi emotion hatata hai, lekin galtiyan bhi machine speed se repeat karta hai. Agar rule mein edge nahi hai toh automation sirf paisa tezi se khoyega. Pehle rule banao, achhe se test karo (pichla module), phir guard rails ke saath automate karo.`,
    mechanism: `A typical pipeline: market data feed (spot, futures, option chain, India VIX) → cleaning and storage → indicators and Greeks → signal logic → risk check → order placed through the broker's API → order status tracked → positions reconciled → logs and alerts. Under SEBI's retail algo framework (circular of February 2025, rolled out in phases through 2025-26; verify the current status with your broker and SEBI), brokers are responsible for algos that run through their APIs, algos above an exchange-set order-rate threshold must be registered with the exchange and carry an algo identifier, and black-box strategies sold to clients need extra regulatory approval.`,
    example: {
      title: 'A tiny rule-based entry (illustrative)',
      text: `Rule: at 9:30, if NIFTY spot is above the previous day's high and India VIX is below 16, buy one lot (65 units) of the ATM call. Entry premium ₹150. Stop-loss at 30% = ₹45 per unit, so maximum planned loss = 45 × 65 = ₹2,925. Target at 60% = ₹90 per unit, or 90 × 65 = ₹5,850, so the reward-to-risk is 2. The program checks the rule, checks that the daily loss cap is not hit, sends a limit order, tracks the fill and places the stop. This is a teaching example, not a recommendation.`,
    },
    chart: {
      kind: 'flow',
      title: 'An algo pipeline',
      caption: 'Every arrow is a place where something can fail. Good systems log and alert at each step.',
      steps: [
        { label: 'Market data', note: 'Spot, option chain, VIX', tone: 'ice' },
        { label: 'Signal logic', note: 'Rules and filters', tone: 'gold' },
        { label: 'Risk check', note: 'Limits and size', tone: 'neutral' },
        { label: 'Broker API', note: 'Order sent', tone: 'ice' },
        { label: 'Exchange', note: 'NSE matches', tone: 'neutral' },
        { label: 'Monitor', note: 'Fills, P&L, alerts', tone: 'gold' },
      ],
    },
    optionChain: `The option chain is the main raw material for an options algo. Your program downloads or streams strike-wise LTP, bid, ask, volume, OI and IV, filters out stale or zero-bid strikes, and computes derived numbers like PCR, OI change and Greeks. Remember the curriculum cautions: OI alone cannot show who initiated a trade, and a large OI strike is a possible level, not a guaranteed one.`,
    psychology: `Automation does not remove psychology; it moves it. The temptation shifts to overriding the program after a few losses, tweaking it every day, or removing the risk limits because they stopped a good trade once. Decide which situations allow manual intervention in advance and log every change.`,
    scenarios: {
      bullish: `A steady rise triggers the entry rule often. Watch that the algo does not keep adding exposure beyond the maximum lots, and that profit targets or trailing rules are working.`,
      bearish: `A sudden fall can spike VIX and widen spreads, so fills worsen and the stop may execute well below the planned level. The VIX filter and the daily loss cap are there for these days.`,
      sideways: `Whipsaw days produce repeated small stops. A cap on trades per day stops the algo from bleeding through many tiny losses.`,
    },
    practice: [
      {
        q: `An algo buys an ATM call at ₹150 (lot 65) with a 30% stop and a 60% target. What are the planned loss, planned profit and reward-to-risk?`,
        a: `Stop distance = 0.30 × 150 = ₹45; loss = 45 × 65 = ₹2,925. Target distance = 0.60 × 150 = ₹90; profit = 90 × 65 = ₹5,850. Reward-to-risk = 5,850 / 2,925 = 2.0.`,
      },
      {
        q: `An order for 65 units at limit ₹150 fills 40 units at ₹150 and 25 units at ₹151. What is the average price?`,
        a: `Cost = 40 × 150 + 25 × 151 = 6,000 + 3,775 = 9,775. Average = 9,775 / 65 = ₹150.38.`,
      },
      {
        q: `Capital is ₹5,00,000, risk per trade is 1% and risk per lot is ₹2,925. How many lots may the algo trade?`,
        a: `Risk budget = 1% × 5,00,000 = ₹5,000. Lots = 5,000 / 2,925 = 1.71, which rounds down to 1 lot (the risk of 2 lots would be ₹5,850, above the budget).`,
      },
      {
        q: `Your daily loss cap is 2% of ₹5,00,000. At what loss does the algo stop trading for the day?`,
        a: `2% × 5,00,000 = ₹10,000. When realised plus open loss reaches ₹10,000, the program should cancel pending orders, flatten positions as per your rule and block new entries until the next day.`,
      },
    ],
    assignment: `Write your own rule as plain-English if-then statements: entry, filter, stop, target, maximum lots, maximum trades per day, daily loss cap. Draw the pipeline on paper, and for each step write what happens if it fails (data stops, order rejected, internet drops). Do not connect real money.`,
  },
  topics: [
    {
      t: 1,
      def: `Rule-based trading means every decision (when to enter, how much, where to exit) is written as a clear rule that gives the same answer for the same inputs. There is no judgement in the moment.`,
      hi: `Rule-based trading matlab har decision (kab enter karna, kitna, kahan exit) ek clear rule ke roop mein likha hota hai jo same inputs par same jawab deta hai. Us waqt mein koi guesswork nahi hota.`,
      how: `A usable rule covers entry, filter, size, stop, target, time exit and what to do if data or the broker fails. Rules must be testable: if you cannot code it, you cannot backtest it. Write them so a stranger could execute them. Fewer, simpler rules are easier to test and less prone to overfitting. Rules should also respect exchange constraints such as lot size, strike availability, expiry day and the freeze quantity per order, which NSE publishes and revises.`,
      eg: { title: 'A written rule', text: `Entry: 9:30, NIFTY above previous day high, VIX below 16. Instrument: ATM call, nearest Tuesday expiry. Size: 1 lot (65). Stop: 30% of premium (₹45 on ₹150, risk ₹2,925). Target: 60% (₹90, reward ₹5,850). Time exit: 3:15 pm. Max 2 trades per day. Daily loss cap ₹10,000. Each line can be coded and tested, which is the point (illustrative).` },
      tip: `If a rule contains the word "feel" or "looks strong", rewrite it with a number before automating.`,
      visual: { kind: 'flow', title: 'Anatomy of a rule', steps: [{ label: 'Filter', note: 'VIX below 16', tone: 'ice' }, { label: 'Entry', note: 'Spot above prior high', tone: 'gold' }, { label: 'Size', note: '1 lot', tone: 'neutral' }, { label: 'Stop / target', note: '30% / 60%', tone: 'neutral' }, { label: 'Time exit', note: '3:15 pm', tone: 'ice' }] },
    },
    {
      t: 2,
      def: `Signal generation is the step where the program turns market data into an instruction: buy, sell or do nothing. A signal is the output of a rule, not a certainty about the future.`,
      hi: `Signal generation woh step hai jahan program market data ko instruction mein badalta hai: buy, sell ya kuch nahi. Signal ek rule ka output hota hai, future ki guarantee nahi.`,
      how: `Inputs can be price (breakout above a level, moving-average crossover), volatility (VIX or IV level), option-chain data (OI change, PCR) or time. Signals are usually computed on closed candles to avoid acting on a bar that is still forming, which would give flickering signals. Combine a small number of independent conditions rather than many correlated ones. Every signal should be logged with the inputs that produced it so you can later audit why a trade happened.` ,
      eg: { title: 'Three-condition signal', text: `At 9:30 spot is 24,050, the previous day high is 24,030 (condition 1 true), VIX is 13.8 which is below 16 (condition 2 true) and the 24,000 put OI has risen by 6% in the last 15 minutes (condition 3 true). All three are true, so the signal is BUY CALL. If VIX had been 17.2, the signal would stay "no trade". The log stores 24,050 / 24,030 / 13.8 / +6% (illustrative).` },
      tip: `Compute signals on closed candles and log the exact inputs behind each one.`,
      visual: { kind: 'matrix', title: 'Signal logic: two conditions', xLabels: ['Spot above prior high', 'Spot below prior high'], yLabels: ['VIX below 16', 'VIX above 16'], cells: [{ head: 'Buy call signal', note: 'Both true', tone: 'bull' }, { head: 'No trade', note: 'Price condition missing', tone: 'neutral' }, { head: 'No trade', note: 'VIX filter blocks', tone: 'neutral' }, { head: 'No trade', note: 'Both fail', tone: 'neutral' }] },
    },
    {
      t: 3,
      def: `Option-chain data processing means collecting the chain from your data source, cleaning it, and turning it into numbers your rules can use, such as strike-wise OI, PCR and implied volatility.`,
      hi: `Option-chain data processing matlab chain ko apne data source se lena, saaf karna, aur use aise numbers mein badalna jo aapke rules use kar sakein, jaise strike-wise OI, PCR aur implied volatility.`,
      how: `Data arrives from a broker API, a data vendor or the exchange feed. Clean it: drop rows with zero bid or zero volume, handle missing values, align every strike to the same timestamp and match each strike to the right expiry. Store snapshots so you can compare now versus 15 minutes ago. Be careful with free web scrapers, which can be delayed or rate-limited; for a strategy that depends on timing, test the data latency first.` ,
      eg: { title: 'PCR from a five-strike strip', text: `OI in lakh contracts at 23,800 / 23,900 / 24,000 / 24,100 / 24,200. Calls: 12, 20, 55, 48, 62 (total 197). Puts: 58, 46, 52, 22, 14 (total 192). PCR = 192 / 197 = 0.975. Calls are heavier at higher strikes and puts at lower ones, a pattern that may indicate potential resistance above and support below; it does not prove who sold or bought (illustrative numbers).` },
      tip: `Dirty data gives confident wrong signals; build the cleaning step before the strategy.`,
      calc: { id: 'pcr', preset: { putOI: 192, callOI: 197, putVol: 0, callVol: 0 }, why: `Computes PCR from the example strip.` },
      visual: { kind: 'oi', title: 'Strip used in the example (lakh contracts)', rows: [{ strike: 23800, ce: 12, pe: 58 }, { strike: 23900, ce: 20, pe: 46 }, { strike: 24000, ce: 55, pe: 52 }, { strike: 24100, ce: 48, pe: 22 }, { strike: 24200, ce: 62, pe: 14 }], spot: 24000 },
    },
    {
      t: 4,
      def: `Real-time OI analysis tracks how open interest at each strike changes during the day, so the program can react to build-up or unwinding as it happens.`,
      hi: `Real-time OI analysis har strike par open interest ka din bhar ka change track karta hai, taaki program build-up ya unwinding ke saath hi react kar sake.`,
      how: `Exchanges publish OI with a delay, so "real-time" OI is near-real-time and updates every few minutes. Store snapshots and compute change over fixed windows (15 or 30 minutes) and since the previous close. Pair OI change with the price move of the same option, but remember that OI cannot tell who initiated the trade; rising OI with rising premium could be fresh buyers or short covering mixed in. The futures build-up rules apply to futures, not blindly to option OI.` ,
      eg: { title: 'OI change in 15 minutes', text: `The 24,200 call OI is 62 lakh at 10:00 and 70 lakh at 10:15, a change of +8 lakh or 8 / 62 = 12.9%. Its premium fell from ₹42 to ₹36. Rising OI with falling premium may suggest fresh selling at that strike, but it could also be hedged or part of a spread. The algo should only flag it, not trade on it alone (illustrative).` },
      tip: `Treat OI change as a flag to examine with price, not as a standalone buy or sell command.`,
      calc: { id: 'oi-buildup', preset: { priceChangePct: -14, oiChangePct: 12.9 }, why: `Classifies price and OI direction; valid for futures, shown only as a vocabulary aid for options.` },
    },
    {
      t: 5,
      def: `Real-time Greeks calculation means the program computes delta, gamma, theta and vega continuously from live prices, so exposure is known at every moment.`,
      hi: `Real-time Greeks calculation matlab program live prices se delta, gamma, theta aur vega lagataar nikalta rehta hai, taaki exposure har pal pata rahe.`,
      how: `Some brokers send Greeks; many do not, so you compute them using Black-Scholes with the current spot, strike, time to expiry, interest rate and the implied volatility backed out from the live premium. Recompute whenever spot or IV changes. Sum position Greeks across legs: delta times quantity gives the net rupee move per point. Greeks computed from stale or illiquid quotes are unreliable, so use the mid of a tight bid-ask and skip dead strikes.` ,
      eg: { title: 'Greeks of the ATM call', text: `NIFTY 24,000, strike 24,000 call, 4 days to expiry, IV 14%, rate 6.5%, dividend 1.3% (illustrative inputs). Black-Scholes gives price ₹147.2, delta 0.518, theta about −₹19.3 per day, vega about ₹10.0 per volatility point. One lot (65): delta exposure = 0.518 × 65 = 33.7 units, so a 10-point NIFTY move changes value by roughly ₹337, and one day of decay costs about 19.3 × 65 = ₹1,252 if nothing else changes.` },
      tip: `Greeks are estimates from a model; refresh them often and distrust numbers from stale quotes.`,
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 4, iv: 14, rate: 6.5 }, why: `Reproduces the example's Greeks.` },
    },
    {
      t: 6,
      def: `VIX monitoring means watching India VIX during the day and using it as a filter or alarm. VIX measures expected volatility priced into NIFTY options, not direction.`,
      hi: `VIX monitoring matlab din bhar India VIX ko dekhna aur use filter ya alarm ki tarah use karna. VIX NIFTY options ki expected volatility naapta hai, direction nahi.`,
      how: `India VIX is calculated by NSE from NIFTY option prices. A program can read it from the same feed as spot. Typical uses: block new entries above a VIX level, shrink size when VIX rises sharply from the open, and flag that option premiums have changed regime. Use the percentage change as well as the level, because a jump from 13 to 15.6 is a bigger event than a drift from 18 to 18.5. VIX is itself delayed or noisy at times, so require a confirmation over a few readings before acting.` ,
      eg: { title: 'VIX jump alarm', text: `Rule: if VIX rises more than 10% above the day's open, pause new entries. The open is 13.0, so the trigger is 13.0 × 1.10 = 14.3. At 11:00 VIX reads 15.6, a rise of (15.6 − 13.0) / 13.0 = 20%, which is above the trigger, so the algo stops new trades and sends an alert. At VIX 14 the one-day expected move is about 24,000 × 0.14 × √(1/365) ≈ 176 points (illustrative).` },
      tip: `Use both the VIX level and its speed of change, and remember it says how much, not which way.`,
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: `Converts VIX into an expected one-day NIFTY move.` },
      visual: { kind: 'gauge', title: 'India VIX alarm bands (illustrative)', min: 8, max: 30, value: 15.6, zones: [{ from: 8, to: 14.3, label: 'Normal', tone: 'ice' }, { from: 14.3, to: 18, label: 'Pause entries', tone: 'gold' }, { from: 18, to: 30, label: 'Stand aside', tone: 'bear' }] },
    },
    {
      t: 7,
      def: `Trade execution APIs are the interfaces broker platforms provide so that your program can place, modify and cancel orders and read positions without using the app.`,
      hi: `Trade execution APIs woh interfaces hain jo broker platforms dete hain taaki aapka program app use kiye bina orders place, modify aur cancel kar sake aur positions padh sake.`,
      how: `Most Indian brokers expose a REST API for orders and a WebSocket for live prices. You authenticate with keys and a daily token, send an order with instrument, quantity, side, price type and product, and receive an order ID. SEBI's retail algo framework (February 2025 circular, phased implementation; verify current status) makes the broker responsible for retail algos on its API, requires algos above an exchange-set orders-per-second limit to be registered and tagged with an algo ID, and brokers may ask you to register a fixed IP address. Use limit orders with sensible protection, respect the NSE freeze quantity and never hard-code secrets in shared code.` ,
      eg: { title: 'An order request', text: `Your program sends: NIFTY 24000 CE, Tuesday expiry, BUY, quantity 65 (1 lot), limit price ₹150, product intraday. The API returns an order ID within milliseconds. Placed by a program at far below the exchange's order-rate threshold, this is ordinary API trading for your own account; the broker's terms and the current SEBI framework decide what is allowed, so read them before going live.` },
      tip: `Read your broker's API terms and the latest SEBI algo rules before automating; the framework has been rolling out in stages.`,
      visual: { kind: 'flow', title: 'Order path through an API', steps: [{ label: 'Your program', note: 'Builds the order', tone: 'gold' }, { label: 'Broker API', note: 'Checks and risk', tone: 'ice' }, { label: 'NSE', note: 'Matches the order', tone: 'neutral' }, { label: 'Confirmation', note: 'Order ID and status', tone: 'ice' }] },
    },
    {
      t: 8,
      def: `Order management is tracking each order from placement to its final state: open, partly filled, filled, cancelled or rejected, and reacting correctly to each one.`,
      hi: `Order management matlab har order ko placement se final state tak track karna: open, partly filled, filled, cancelled ya rejected, aur har ek par sahi react karna.`,
      how: `The program must treat the exchange's status as the truth, not its own assumption. Partial fills are common in less liquid strikes, so keep the filled quantity and the average price. Handle rejections (insufficient margin, price outside range, freeze quantity) without blindly retrying. Use an order timeout: if a limit order is not filled in a set time, cancel or modify it by a rule. Avoid duplicate orders caused by retries by tagging each order with a unique reference.` ,
      eg: { title: 'Partial fills', text: `A buy order of 65 units at limit ₹150 fills 40 units at ₹150, then 25 units at ₹151. Average price = (40 × 150 + 25 × 151) / 65 = 9,775 / 65 = ₹150.38. The stop-loss must be sized to the filled 65 units, at 30% of 150.38 = ₹45.11 below entry. If only 40 had filled before the timeout, the stop would cover 40 units and the rest of the order would be cancelled.` },
      tip: `Always size the stop and the target to the quantity actually filled, never the quantity requested.`,
      calc: { id: 'vwap-twap', preset: { fills: '150:40;151:25' }, why: `Average fill price for the partial fills.` },
      visual: { kind: 'timeline', title: 'Order states', events: [{ when: 'Sent', what: 'Order placed, status pending', tone: 'neutral' }, { when: 'Open', what: 'Resting in the order book', tone: 'ice' }, { when: 'Partial', what: '40 of 65 filled', tone: 'gold' }, { when: 'Complete', what: 'All 65 filled at average 150.38', tone: 'ice' }] },
    },
    {
      t: 9,
      def: `Position monitoring means constantly checking what you actually hold, its profit or loss and its risk, and comparing it with what the program thinks you hold.`,
      hi: `Position monitoring matlab lagataar check karna ki aapke paas asal mein kya hai, uska profit ya loss aur risk kitna hai, aur use program ki soch se match karna.`,
      how: `Poll the broker's position book regularly and reconcile it with your internal record. A mismatch (for example, an order that filled while your connection was down) is an emergency. Track mark-to-market P&L per position and for the day, net delta and margin used. Raise an alert if a position exists that the program did not create. Log everything with timestamps to reconstruct what happened later.` ,
      eg: { title: 'MTM check', text: `The program bought 65 units at ₹150. The live price is ₹120. MTM = (120 − 150) × 65 = −₹1,950. The stop at ₹105 would produce −₹2,925 (loss of 45 × 65). The program's record says 65 units; the broker shows 65 units, so reconciliation passes. If the broker had shown 0 because the stop already triggered, the program must detect it and update its own state.` },
      tip: `Reconcile with the broker's position book every cycle; never trust only your own variables.`,
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 150, expiryPrice: 24120, lotSize: 65, lots: 1 }, why: `Shows the P&L of a bought call at a chosen expiry price.` },
    },
    {
      t: 10,
      def: `Automated risk controls are limits coded into the program that act without asking you: maximum position size, daily loss cap, trade count limit and a kill switch.`,
      hi: `Automated risk controls woh limits hain jo program mein code hote hain aur bina poochhe kaam karte hain: maximum position size, daily loss cap, trade count limit aur ek kill switch.`,
      how: `Controls are checked before every order and continuously during the day. Typical set: maximum lots per order and in total, maximum premium at risk per trade, daily loss cap, maximum trades per day, no new entries after a set time, VIX filter and a kill switch that cancels open orders and closes positions on a data failure or an unusual number of rejected orders. Exchange-side protections such as the NSE freeze quantity exist, but they are a last line, not your plan. Test every control with fake data before going live. Remember that SEBI's own studies show most individual F&O traders lose money, which is the reason to have limits that cannot be argued with.` ,
      eg: { title: 'Daily cap and sizing', text: `Capital ₹5,00,000. Risk 1% per trade = ₹5,000. One lot risks 45 × 65 = ₹2,925, so lots = 5,000 / 2,925 = 1.7, rounded down to 1. Daily loss cap 2% = ₹10,000, which is about 3.4 maximum-loss trades. After the cap is hit the program cancels orders, blocks entries and sends an alert (illustrative).` },
      tip: `Put limits in code, outside the strategy logic, so that a bug in the strategy cannot switch them off.`,
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 150, stop: 105, lotSize: 65 }, why: `Calculates the number of lots from capital and risk per trade.` },
      visual: { kind: 'layers', title: 'Layers of protection', layers: [{ label: 'Strategy rule', note: 'Stop and target per trade', tone: 'gold' }, { label: 'Program limits', note: 'Lots, trades, daily loss cap', tone: 'ice' }, { label: 'Kill switch', note: 'Cancel and flatten on failure', tone: 'neutral' }, { label: 'Broker and exchange checks', note: 'Margin, freeze quantity', tone: 'neutral' }] },
    },
  ],
  tools: [{ id: 'position-size', why: `Lots from capital and risk per trade.` }, { id: 'greeks', why: `Live-style Greeks for the position.` }],
}
export default m
