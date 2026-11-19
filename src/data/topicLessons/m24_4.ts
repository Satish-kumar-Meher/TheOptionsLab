import type { ModuleLesson } from '../topicLessonTypes'

/* Module 24.4 - Backtesting Fundamentals.
 * Running example (illustrative): buy ATM-area CE at premium 120, stop 90 (-25%), target 180 (+50%), lot 65 (check the current NSE contract specification).
 * Risk per lot = 30 x 65 = 1,950; reward per lot = 60 x 65 = 3,900.
 * Cost assumption: Rs 150 per lot round trip all-in (illustrative; check current STT, exchange fees, GST, brokerage). */
const m: ModuleLesson = {
  moduleId: '24.4',
  intro: `Backtesting means running a written trading rule over past data to see how it would have behaved. It cannot predict the future, but it can quickly reject ideas that never worked and show how big the losses and the dry spells were. This module covers the building blocks: rules, entries, exits, stops, sizing and the real costs that make a backtest honest.`,
  introHi: `Backtesting ka matlab hai ek likhe hue trading rule ko purane data par chala ke dekhna ki woh kaise behave karta. Yeh future predict nahi karta, lekin jo ideas kabhi kaam hi nahi kiye unhe jaldi reject kar deta hai aur dikhata hai ki losses aur dry spells kitne bade the. Is module mein building blocks dekhenge: rules, entry, exit, stop, sizing aur woh real costs jo backtest ko imaandaar banate hain.`,
  steps: {
    concept: `A backtest is a simulation: given fixed rules and historical data, what trades would have been taken and what would the results be? Its value is not the final profit number but the shape of the results: how often it wins, how large the losses are, how deep the worst drawdown goes and how much costs take away.`,
    conceptHi: `Backtest ek simulation hai: fixed rules aur historical data ke saath dekhna ki kaun se trades lete aur result kya hota. Iski value final profit number mein nahi, balki results ki shape mein hai: kitni baar jeet, losses kitne bade, worst drawdown kitna gehra aur costs kitna kha gaye.`,
    mechanism: `The engine walks through the data bar by bar. At each bar it asks, in order: is a position open? If yes, check the stop, then the target, then the time exit. If no, check the entry condition. If a signal appears at the close of a bar, the simulated order fills at the next bar's price (never at the same bar's close), with a spread and slippage applied. Then brokerage and charges are subtracted, the position size is set by the sizing rule, and the trade is logged with its entry, exit, reason and net P&L.`,
    example: {
      title: 'Costs change the verdict (illustrative)',
      text: `A rule buys a call at ₹120 with a stop at ₹90 and a target at ₹180, one lot of 65. A full stop loses 30 × 65 = ₹1,950, and a target gains 60 × 65 = ₹3,900. Over 40 trades, 18 hit the target and 22 hit the stop: gross P&L = 18 × 3,900 − 22 × 1,950 = 70,200 − 42,900 = ₹27,300. Now take off ₹150 a trade for charges (40 × 150 = ₹6,000) and ₹130 a trade for spread slippage (40 × 130 = ₹5,200). Net P&L = 27,300 − 11,200 = ₹16,100. Costs removed 41% of the gross profit, and this is with a stop that fills at its price.`,
    },
    chart: {
      kind: 'flow',
      title: 'One bar of a backtest',
      caption: 'The order of checks matters. A stop must be tested before a target when both could be touched in the same bar.',
      steps: [
        { label: 'Open position?', tone: 'ice' },
        { label: 'Stop, target, time exit', note: 'if yes', tone: 'bear' },
        { label: 'Entry signal', note: 'if no', tone: 'gold' },
        { label: 'Fill next bar', note: 'spread + slippage', tone: 'neutral' },
        { label: 'Charges, log trade', tone: 'neutral' },
      ],
    },
    optionChain: `For an options backtest the chain is the price source: you need the bid, ask and last price of the exact strike and expiry that your rule would have chosen at that minute. If you only have spot data, you must model option prices (for example with Black–Scholes), and then the result depends on the volatility you assumed. A backtest on modelled prices is weaker than one on stored chain snapshots, and you should say which you used.`,
    psychology: `A backtest tempts you to see only the final profit and fall in love with the curve. The disciplined reading goes the other way: study the worst losing streak and ask whether you would actually keep trading through it. Many strategies are abandoned in real life at the exact point the backtest says they would have recovered.`,
    scenarios: {
      bullish: `In a trending-up sample, a long-call breakout rule looks excellent because every dip is bought. Check whether the rule was tested on enough different phases; a bull-only sample proves little.`,
      bearish: `A sharp fall tests stops: gaps and fast moves fill stops worse than the stop price. A backtest that fills at the exact stop will understate losses in such a period.`,
      sideways: `In a range, breakout rules suffer repeated small stops while costs keep adding up. This is where slippage and charges decide whether a rule survives.`,
    },
    practice: [
      {
        q: `A long call is bought at ₹120 with a stop at ₹90 and a target at ₹180. Lot size is 65. What is the risk per lot, the reward per lot and the reward-to-risk ratio?`,
        a: `Risk = (120 − 90) × 65 = 30 × 65 = ₹1,950. Reward = (180 − 120) × 65 = 60 × 65 = ₹3,900. Reward-to-risk = 3,900 / 1,950 = 2.0. The breakeven win rate before costs is 1 / (1 + 2) = 33.3%.`,
      },
      {
        q: `Capital is ₹5,00,000 and you risk 1% a trade with the stop above. How many lots?`,
        a: `Risk budget = 5,00,000 × 1% = ₹5,000. Risk per lot = ₹1,950. Lots = floor(5,000 / 1,950) = floor(2.56) = 2. Planned loss at stop = 2 × 1,950 = ₹3,900 (0.78% of capital).`,
      },
      {
        q: `Quote is bid 119, ask 121. Your simulator buys at the ask and sells at the bid. What is the round-trip spread cost per lot?`,
        a: `Spread = 2 points. Buying at 121 and selling at 119 costs 2 × 65 = ₹130 per lot compared with trading at the mid (120) both ways.`,
      },
      {
        q: `Gross P&L of a backtest is ₹27,300 over 40 trades. Costs are ₹150 and slippage ₹130 per trade. What is net P&L and what share did costs take?`,
        a: `Costs = 40 × (150 + 130) = ₹11,200. Net = 27,300 − 11,200 = ₹16,100. Share = 11,200 / 27,300 = 41.0%.`,
      },
    ],
    assignment: `Write one complete rule set on a single page: entry, exit, stop, target, time exit, position size and the instrument. Then take 10 past trading days of 5-minute NIFTY data and apply the rule by hand in a spreadsheet, noting the fill price you would realistically have got. Record gross P&L, costs and net P&L.`,
  },
  topics: [
    {
      t: 1,
      def: `Backtesting is testing a trading rule on past market data to see how it would have performed. It uses history to judge an idea before risking real money.`,
      hi: `Backtesting ka matlab hai ek trading rule ko purane market data par test karna ki woh kaisa perform karta. Real paisa lagane se pehle history se idea ko judge karna.`,
      how: `You define the rules exactly, load the data for the period, simulate the trades in order and compute the results. It answers questions such as: how many trades, how often did it win, what was the worst drawdown. It does not prove future profit, because markets change, data may be incomplete and the rules may have been fitted to the past. Use it as a filter: a rule that loses in backtest is unlikely to make money live, while a rule that wins in a backtest is only a candidate for more testing.`,
      eg: { title: 'A filter, not a promise', text: `You test a rule on 100 trading days and it produces 62 trades with net P&L ₹16,100 after costs. That is ₹16,100 / 62 = about ₹260 per trade. It is a candidate worth testing further on other periods, not evidence that you will earn ₹260 per trade in future.` },
      tip: `A good backtest earns the right to the next test (out-of-sample, paper trading), not the right to real capital.`,
      visual: { kind: 'flow', title: 'Where a backtest sits', steps: [{ label: 'Idea', tone: 'ice' }, { label: 'Backtest', tone: 'gold' }, { label: 'Out-of-sample test', tone: 'gold' }, { label: 'Paper trade', tone: 'ice' }, { label: 'Small real size', tone: 'neutral' }] },
    },
    {
      t: 2,
      def: `Strategy rules are the written, exact instructions that say what to trade, when to enter, when to exit and how much to risk. A rule is complete only if a computer could follow it without judgement.`,
      hi: `Strategy rules woh likhe hue exact instructions hain jo batate hain ki kya trade karna hai, kab enter karna hai, kab exit karna hai aur kitna risk lena hai. Rule tabhi poora hai jab computer bina judgement ke use follow kar sake.`,
      how: `Vague rules such as "buy when the market looks strong" cannot be tested. Write each rule with numbers and time: instrument (NIFTY weekly options), signal (5-minute close above the first 30-minute high), filter (India VIX below 18), time window (9:45 to 14:30), stop, target, time exit and position size. Write the rule before you look at results. Changing rules after seeing the backtest and re-running is called curve fitting, and it makes the final numbers look better than they will be.`,
      eg: { title: 'One-page rule sheet', text: `Instrument: NIFTY weekly CE nearest ATM. Signal: 5-minute close above the first 30-minute high of 24,050. Filter: VIX below 18. Window: 9:45 to 14:30. Entry premium about ₹120, stop ₹90, target ₹180, time exit 15:15. Size: 1% of ₹5,00,000 risk, giving 2 lots. Any item that cannot be filled with a number is not yet a rule.` },
      tip: `If two people reading your rules could take different trades, the rules are not finished.`,
      visual: { kind: 'layers', title: 'Parts of a complete rule set', layers: [{ label: 'Instrument and expiry', tone: 'ice' }, { label: 'Entry signal and filters', tone: 'gold' }, { label: 'Stop, target, time exit', tone: 'bear' }, { label: 'Position size', tone: 'neutral' }] },
    },
    {
      t: 3,
      def: `Entry conditions are the tests that must all be true before a trade is opened, such as a price breaking a level, a volatility filter and a time window.`,
      hi: `Entry conditions woh tests hain jo sab true hone chahiye tabhi trade open hota hai, jaise price ka kisi level ko todna, volatility filter aur time window.`,
      how: `Use as few conditions as are needed, each with a reason. A typical option entry combines a price trigger, a filter on volatility or time, and a contract choice. In the simulator, decide whether the signal is read at the close of a bar and filled on the next bar. Using a signal that needs the bar's close and filling at that same close gives you a price you could not actually have got. Also test that the contract you pick (strike, expiry) is liquid enough at that minute.`,
      eg: { title: 'Breakout entry', text: `The first 30-minute high is 24,050. A 5-minute candle closes at 24,062, which satisfies the trigger. India VIX is 14.2, below the 18 filter, and the time is 10:20, inside 9:45 to 14:30. The order is filled at the next bar's price: the call's ask at 10:25 is ₹121, so the entry is ₹121, not the ₹118 last seen at 10:20.` },
      tip: `Signal at the bar close, fill at the next bar; filling at the same close is look-ahead.`,
      visual: { kind: 'candles', title: 'Entry on a close above a level', pattern: 'breakout', level: { price: 24050, label: 'First 30-min high' } },
    },
    {
      t: 4,
      def: `Exit conditions say when an open trade is closed: a stop, a target, a time limit or a signal that the idea no longer holds.`,
      hi: `Exit conditions batate hain ki open trade kab close hoga: stop, target, time limit ya woh signal jo kehta hai ki idea ab kaam nahi kar raha.`,
      how: `Every trade needs at least three exits: a loss exit (stop), a profit exit (target or trail) and a time exit. For options a time exit is especially important, because theta keeps removing value and expiry-day premiums can vanish in minutes. When more than one exit could trigger in the same bar of data (for example both the stop and the target are inside one candle's range), you cannot know which came first; the cautious convention is to assume the stop was hit first.`,
      eg: { title: 'Stop and target in one candle', text: `A call bought at ₹120 has a stop at ₹90 and a target at ₹180. The next 5-minute candle shows a low of ₹88 and a high of ₹185. Both levels were touched. Assuming the stop first books −30 × 65 = −₹1,950; assuming the target first books +60 × 65 = +₹3,900. The conservative rule records the loss, because with only candle data the order is unknown.` },
      tip: `When one candle touches both stop and target, assume the stop came first unless you have tick data.`,
      visual: { kind: 'flow', title: 'Exit checks in order', steps: [{ label: 'Stop hit?', tone: 'bear' }, { label: 'Target hit?', tone: 'bull' }, { label: 'Time exit?', tone: 'gold' }, { label: 'Else hold', tone: 'neutral' }] },
    },
    {
      t: 5,
      def: `A stop-loss condition is a pre-set level or rule at which you accept a loss and close the trade, so that one bad trade cannot become a large one.`,
      hi: `Stop-loss condition ek pehle se tay level ya rule hai jahan aap loss accept karke trade close kar dete ho, taaki ek kharab trade bada loss na ban jaye.`,
      how: `Stops for options can be set on the option premium (exit if it falls 25%), on the index level (exit if NIFTY closes below a level) or on time. Premium stops are easy to simulate but can be triggered by a wide spread or a short-lived dip. Index-based stops tie the exit to your actual idea. Remember that a stop-loss order may fill worse than its price in a fast market or a gap, so your simulator should add slippage to stop exits and should never assume a perfect fill.`,
      eg: { title: 'Stop slippage', text: `Premium ₹120, stop trigger ₹90. In a sharp move the next available price is ₹86. The loss is (120 − 86) × 65 = ₹2,210 and not the planned ₹1,950, which is 13.3% larger. If your backtest records only the planned ₹1,950, it understates the real loss on every gap.` },
      tip: `Model stop exits with slippage; a backtest where every stop fills exactly is too kind.`,
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 120, stop: 90, lotSize: 65 }, why: `Turns a stop distance into a planned loss and a number of lots.` },
      visual: { kind: 'bars', title: 'Planned vs actual loss per lot', unit: ' ₹', items: [{ label: 'Planned (stop 90)', value: 1950, tone: 'gold' }, { label: 'Actual (fill 86)', value: 2210, tone: 'bear' }] },
    },
    {
      t: 6,
      def: `Profit booking is the rule for taking gains: a fixed target, a partial exit, a trailing stop or a time exit.`,
      hi: `Profit booking woh rule hai jisse aap profit lete ho: fixed target, partial exit, trailing stop ya time exit.`,
      how: `A fixed target caps gains but is simple to test. A partial exit (close half at a first target, trail the rest) lowers variance but also lowers the average win. A trailing stop follows price and lets winners run, but gives back some profit at the turn. There is no universal best choice; test each on the same data and compare drawdown as well as profit. In options also keep a time exit, since a profitable call can lose its gains to theta if the move stalls.`,
      eg: { title: 'Partial exit', text: `Two lots bought at ₹120. Half (one lot) is sold at ₹150 for +30 × 65 = ₹1,950. The stop on the remaining lot moves to ₹120 (cost). If the rest then hits ₹180 it adds 60 × 65 = ₹3,900, total ₹5,850. If it falls back to ₹120 it adds ₹0 and the total is ₹1,950, versus ₹7,800 for taking both lots to ₹180.` },
      tip: `Compare exit styles on drawdown and consistency, not only on total profit.`,
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 120, expiryPrice: 24180, lotSize: 65, lots: 2 }, why: `Checks the P&L of the bought lots at the exit price you choose.` },
    },
    {
      t: 7,
      def: `Position sizing decides how many lots you trade, usually so that a loss at the stop is a small fixed share of capital.`,
      hi: `Position sizing tay karta hai ki aap kitne lots trade karoge, aam taur par aise ki stop par loss capital ka ek chhota fixed hissa ho.`,
      how: `Fixed-risk sizing divides a risk budget (for example 1% of capital) by the loss per lot at the stop. This keeps each trade's planned loss similar, whatever the premium. Fixed-lot sizing is simpler but lets risk drift with premium. Sizing changes the equity curve more than many entry tweaks, so a backtest must use the same sizing rule you intend to use live. Lot size can change by NSE revision, so size in lots using the lot size valid on that date.`,
      eg: { title: '1% rule', text: `Capital ₹5,00,000, risk 1% = ₹5,000. Loss per lot at the stop = 30 × 65 = ₹1,950. Lots = floor(5,000 / 1,950) = 2, so the planned loss is 2 × 1,950 = ₹3,900, which is 0.78% of capital. A string of 5 stops in a row costs ₹19,500, or 3.9% of capital.` },
      tip: `Pick the sizing rule first, then test; sizing is part of the strategy, not an afterthought.`,
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 120, stop: 90, lotSize: 65 }, why: `Gives the lots allowed by your risk budget.` },
    },
    {
      t: 8,
      def: `Brokerage and charges are the costs of every trade: broker fee, STT, exchange transaction charges, SEBI fee, GST and stamp duty. A backtest must subtract them.`,
      hi: `Brokerage aur charges har trade ka cost hain: broker fee, STT, exchange transaction charges, SEBI fee, GST aur stamp duty. Backtest mein inhe minus karna zaroori hai.`,
      how: `Charges are small per trade but add up for a strategy that trades often, and they are a larger share of profit when premiums are low. The rates (STT on option premium, exchange charges, GST, stamp duty) are set by the government and exchanges and have been revised before, so check the current rates on your broker's or NSE's published page rather than using old numbers. In a backtest model costs per order and per lot, apply them on both entry and exit, and keep them as a parameter you can change.`,
      eg: { title: 'Charges eat small edges', text: `Suppose all-in charges are ₹150 per lot round trip (an assumption; check the current rates). A strategy with 200 trades a month pays 200 × 150 = ₹30,000 a month. If the gross edge is ₹200 per trade (₹40,000), the net is ₹10,000, so charges took 75% of the edge.` },
      tip: `The more often a rule trades, the more its edge depends on costs; test with costs above your estimate.`,
      calc: { id: 'charges', preset: { premium: 120, lotSize: 65, lots: 2, side: 'buy', brokerage: 20 }, why: `Shows the cost components for one trade; check that rates are current.` },
    },
    {
      t: 9,
      def: `Slippage is the difference between the price you expected and the price you actually got. In options it mostly comes from the bid-ask spread and from thin order books.`,
      hi: `Slippage woh farak hai jo aapke expected price aur actual mile hue price ke beech hota hai. Options mein yeh zyadatar bid-ask spread aur patli order book se aata hai.`,
      how: `If you buy at the ask and sell at the bid, you pay the full spread on a round trip. Slippage is larger on far strikes, near the open and close, during news, and on expiry day. A simple model charges half the spread each way and adds extra points for stops and market orders. For larger quantities you can walk the book to see the average fill. Test the strategy with double your slippage assumption; if the edge disappears, it is too fragile.`,
      eg: { title: 'Spread on a round trip', text: `Bid 119, ask 121. Buying at 121 and selling at 119 costs 2 points, or 2 × 65 = ₹130 per lot, even if the premium itself did not move. For 40 trades that is ₹5,200. If the spread is 4 points on a far strike, the cost doubles to ₹260 per lot.` },
      tip: `Double your slippage estimate in a stress test; a strategy that only works at zero slippage does not work.`,
      calc: { id: 'spread-cost', preset: { bid: 119, ask: 121, qty: 1, lotSize: 65 }, why: `Computes the round-trip spread cost for your lot count.` },
      visual: { kind: 'orderBook', title: 'Buying at the ask, selling at the bid', bids: [[119, 650], [118.5, 975], [118, 1300]], asks: [[121, 650], [121.5, 780], [122, 1170]] },
    },
    {
      t: 10,
      def: `Realistic execution simulation means modelling how orders would really have been filled: next-bar prices, spreads, partial fills, freeze limits, gaps and rejections.`,
      hi: `Realistic execution simulation ka matlab hai yeh model karna ki orders asal mein kaise fill hote: next-bar price, spread, partial fills, freeze limits, gaps aur rejections.`,
      how: `The aim is to remove flattering assumptions. Fill signals on the next bar. Use bid for sells and ask for buys. Respect the lot size and exchange quantity freeze limits for large orders (check NSE's current values). Skip trades when the spread is wider than a limit or the strike has no volume. Do not trade in the first minutes if your data has stale quotes there. Run the test with costs and slippage higher than expected, and compare backtest results with a small paper-trading run to measure how far reality differs.`,
      eg: { title: 'Idealised vs realistic', text: `An idealised run fills at the signal bar's close of ₹118, with no costs: a target at 180 gains 62 × 65 = ₹4,030 per lot. A realistic run fills at the next ask ₹121, sells at the bid 2 points lower on the way out (₹178 for a target of 180), and pays ₹150 charges: (178 − 121) × 65 − 150 = ₹3,555. Realism cut the per-trade gain by 11.8%.` },
      tip: `Measure the gap between backtest fills and paper-trade fills; that gap is your hidden cost.`,
      visual: { kind: 'compare', title: 'Idealised vs realistic fills', left: { head: 'Idealised', tone: 'gold', points: ['Fill at signal close', 'No spread, no charges', 'Stops fill exactly'] }, right: { head: 'Realistic', tone: 'ice', points: ['Fill at next bar ask / bid', 'Charges on every leg', 'Stops slip in fast moves'] } },
    },
  ],
  tools: [{ id: 'position-size', why: `Size trades from a risk budget.` }, { id: 'risk-reward', why: `Test win rate against reward-to-risk.` }],
}
export default m
