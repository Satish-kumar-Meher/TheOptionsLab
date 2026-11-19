import type { ModuleLesson } from '../topicLessonTypes'

/* Module 24.6 - Advanced Backtesting. All performance numbers are illustrative.
 * Walk-forward: 36 months, train 12, test 3, step 3 -> (36-12)/3 = 8 windows, 24 months out-of-sample.
 * Overfit search: 10 x 8 x 6 x 5 = 2,400 combinations; 5% false positives = 120.
 * Monte Carlo: 10-trade log of module 24.5; losses first -> drawdown 9,100 (1.82% of 5,00,000).
 * Regimes: 30 x 1,400 = 42,000; 50 x 300 = 15,000; 20 x -450 = -9,000; total 48,000 (480/trade).
 * Expiry: 20 x -250 = -5,000; 80 x 700 = 56,000; total 51,000. VIX: 25 x -200 = -5,000; 45 x 600 = 27,000; 30 x 200 = 6,000; total 28,000.
 * Sensitivity: 585 - 130 = 455; 585 - 390 = 195. Robustness: 100 trades x 585 = 58,500; top 5 = 30,000 -> 28,500. */
const m: ModuleLesson = {
  moduleId: '24.6',
  intro: `A simple backtest asks one question: did the rule make money on past data? Advanced backtesting asks harder ones: would it have survived data it never saw, is the result just a lucky fit, and does it break when conditions or costs change? This module covers the methods that separate a real edge from a pretty equity curve.`,
  introHi: `Simple backtest sirf yeh poochta hai ki rule ne purane data par paisa banaya ya nahi. Advanced backtesting zyada mushkil sawal poochta hai: kya rule us data par chalta jo usne dekha hi nahi, kya result sirf lucky fit hai, aur kya conditions ya costs badalne par rule toot jaata hai? Is module mein woh methods hain jo asli edge ko sundar equity curve se alag karte hain.`,
  steps: {
    concept: `A backtest is evidence, not proof. The more rules, parameters and attempts you use, the easier it is to find something that fits the past by chance. Advanced methods deliberately try to break the strategy: test it on unseen data, shuffle its trades, change its inputs and split the results by market condition. What survives is more believable, though never guaranteed.`,
    conceptHi: `Backtest evidence hota hai, proof nahi. Jitne zyada rules, parameters aur koshishen, utna aasan hai ki past ko chance se fit karne wala kuch mil jaye. Advanced methods strategy ko jaan-bujhkar todne ki koshish karte hain: unseen data par test, trades ko shuffle, inputs badalna aur results ko market condition ke hisaab se baantna. Jo bach jaata hai woh zyada bharosemand hota hai, par guaranteed kabhi nahi.`,
    mechanism: `Split history into a part used to design the rule (in-sample) and a part kept hidden until the rule is frozen (out-of-sample). Walk-forward repeats this in rolling windows. Then stress the result: re-order the trades (Monte Carlo), vary parameters (sensitivity), split by VIX level, expiry day and trend or range regime, and add extra costs. Throughout, use realistic inputs: the lot size, expiry day and weekly-expiry rules that applied at that time (NSE and SEBI have changed these more than once), bid-ask spreads and charges.`,
    example: {
      title: 'Walk-forward on 36 months (illustrative)',
      text: `You have 36 months of NIFTY option data. Optimise on months 1-12, trade the best setting on months 13-15 without changes, then slide everything forward by 3 months. Number of test windows = (36 − 12) / 3 = 8, covering 24 months of purely out-of-sample trading. If in-sample expectancy was ₹1,200 per trade and the stitched out-of-sample expectancy is ₹360, only 360 / 1,200 = 30% of the edge carried over. That is the honest number to plan with, and it may still be positive.`,
    },
    chart: {
      kind: 'bars',
      title: 'Expectancy per trade: in-sample vs out-of-sample (₹, illustrative)',
      caption: 'A big gap between the bars is the usual sign of curve-fitting. A small gap is encouraging, not proof.',
      unit: ' ₹',
      items: [
        { label: 'In-sample', value: 1200, tone: 'gold' },
        { label: 'Out-of-sample', value: 360, tone: 'ice' },
        { label: 'After extra costs', value: 195, tone: 'neutral' },
      ],
    },
    optionChain: `Backtests on options are only as good as the historical chain behind them. Good data has each strike's bid, ask, OI and IV at the time of entry. If you backtest on last traded price alone, you ignore the spread and the illiquid far strikes where fills at that price were not possible. Check that old expiry dates, lot sizes and strike steps in your data match what the exchange actually listed then.`,
    psychology: `Everyone wants the backtest to say yes. After weeks of work it is hard to accept that the edge was a fit. The discipline is to decide the test rules before looking at results, to count how many ideas you tried, and to treat a surprisingly good curve with suspicion first and excitement second.`,
    scenarios: {
      bullish: `A long-biased rule tested only on a strong uptrend will look excellent. Regime testing forces you to see how it behaved in the flat and falling phases the sample also contains.`,
      bearish: `A sharp fall (for example, the March 2020 crash) is a stress test your data may contain only once. Check drawdown and gap behaviour there separately and do not assume it will not repeat.`,
      sideways: `Range-bound phases quietly kill many breakout and trend rules and suit premium-selling rules. Regime-wise results tell you which phase you are really being paid in.`,
    },
    practice: [
      {
        q: `You have 36 months of data and run walk-forward with 12 months training, 3 months testing and a 3-month step. How many test windows and how many months of out-of-sample data?`,
        a: `Windows = (36 − 12) / 3 = 8. Out-of-sample months = 8 × 3 = 24.`,
      },
      {
        q: `You test 10 × 8 × 6 × 5 parameter combinations. If each had a 5% chance of looking good by luck alone, how many lucky winners should you expect?`,
        a: `Combinations = 10 × 8 × 6 × 5 = 2,400. Expected lucky winners = 2,400 × 0.05 = 120. Picking the single best of 2,400 is therefore weak evidence by itself.`,
      },
      {
        q: `In-sample expectancy is ₹1,200 per trade and out-of-sample is ₹360. What fraction of the edge held, and what do you plan with?`,
        a: `360 / 1,200 = 30%. Plan with the out-of-sample figure (₹360 before the extra costs), not the in-sample one.`,
      },
      {
        q: `Your 10-trade log has five wins (₹14,950 in total) and five losses (₹9,100 in total). In the worst reshuffle, all losses come first. What is the drawdown on a ₹5,00,000 account?`,
        a: `Drawdown = 9,100 = 9,100 / 5,00,000 = 1.82%. The original order showed only ₹3,250, so the observed drawdown understated what the same trades could produce.`,
      },
    ],
    assignment: `Take any strategy you have backtested. Split the data 70/30, freeze the rule on the first part and run it once on the second. Then repeat the test with ₹130 of extra cost per lot per round trip. Write down the three expectancy figures (in-sample, out-of-sample, out-of-sample after costs) and one reason you would or would not trade it.`,
  },
  topics: [
    {
      t: 1,
      def: `Walk-forward testing optimises a strategy on one window of history, tests it on the next unseen window, then rolls both windows forward and repeats. The stitched-together test windows form one out-of-sample record.`,
      hi: `Walk-forward testing mein strategy ko history ki ek window par optimise karte hain, phir agli unseen window par test karte hain, aur dono windows ko aage khiskakar repeat karte hain. Sab test windows jodkar ek out-of-sample record banta hai.`,
      how: `You choose a training length (say 12 months), a test length (say 3 months) and a step (3 months). Each cycle finds the best parameters on the training window and applies them unchanged to the test window. Markets change, so a rule that is re-tuned regularly and still works in each unseen window is more believable than one tuned once on everything. Walk-forward is not perfect: you still choose the window lengths, and each choice is another degree of freedom. Record how stable the chosen parameters are from window to window; if they jump around wildly, the edge may be noise.`,
      eg: { title: 'Rolling windows', text: `With 36 months of data, 12 months training and 3 months test with a 3-month step, there are (36 − 12) / 3 = 8 test windows. Window 1 trains on months 1-12 and tests months 13-15; window 8 trains on months 22-33 and tests months 34-36. Illustrative result: 6 of 8 test windows are profitable and the stitched record has expectancy of ₹360 per trade.` },
      tip: `Judge the strategy by the stitched out-of-sample record only; never by the in-sample numbers.`,
      visual: { kind: 'timeline', title: 'Rolling walk-forward (months)', events: [{ when: 'Window 1', what: 'Train months 1-12, test 13-15', tone: 'ice' }, { when: 'Window 2', what: 'Train months 4-15, test 16-18', tone: 'ice' }, { when: '...', what: 'Roll forward by 3 months each time', tone: 'neutral' }, { when: 'Window 8', what: 'Train months 22-33, test 34-36', tone: 'gold' }] },
    },
    {
      t: 2,
      def: `In-sample data is the history used to design and tune the rule. Out-of-sample data is history kept aside and used once, after the rule is frozen, to see how it behaves on something new.`,
      hi: `In-sample data woh history hai jisse rule banaya aur tune kiya jaata hai. Out-of-sample data woh history hai jo alag rakhi jaati hai aur rule freeze hone ke baad sirf ek baar use hoti hai, yeh dekhne ke liye ki naye data par rule kaisa chalta hai.`,
      how: `A common split is 70% in-sample and 30% out-of-sample, split by time (never random shuffling, because that leaks the future into the past). The out-of-sample test can be used once honestly. If you look at the result, tweak the rule and test again, that data has become in-sample. Better still is a final period never touched until the end, or forward testing on paper for a few weeks. Compare the two sets of numbers: win rate, average win, average loss, expectancy and drawdown.`,
      eg: { title: 'A 70/30 split', text: `1,000 trading days are split into 700 in-sample and 300 out-of-sample days. In-sample result: expectancy ₹1,200 per trade, profit factor 1.9. Out-of-sample: expectancy ₹360, profit factor 1.2. Retention = 360 / 1,200 = 30%. The edge shrank but did not vanish; with fewer than about 100 out-of-sample trades the uncertainty is still large (illustrative numbers).` },
      tip: `Use the out-of-sample set once. Every re-test after peeking turns it into in-sample data.`,
      visual: { kind: 'compare', title: 'In-sample vs out-of-sample', left: { head: 'In-sample (70%)', tone: 'gold', points: ['Used to design and tune', 'Results always look good', 'Expectancy ₹1,200 (illustrative)'] }, right: { head: 'Out-of-sample (30%)', tone: 'ice', points: ['Used once, after freezing', 'Shows what carries over', 'Expectancy ₹360 (illustrative)'] } },
    },
    {
      t: 3,
      def: `Overfitting means a strategy is tuned so closely to past data that it captures noise instead of a repeatable pattern. It looks brilliant in the backtest and disappoints in live trading.`,
      hi: `Overfitting matlab strategy ko past data par itna fit kar dena ki woh repeatable pattern ki jagah noise pakad le. Backtest mein shandaar dikhti hai aur live trading mein nirash karti hai.`,
      how: `The danger grows with the number of parameters and the number of tries. Every extra filter (time of day, VIX band, OI ratio, weekday) lets the rule bend towards the past. Warning signs: many parameters relative to trades, results that collapse when a setting moves slightly, a perfect equity curve and a rule you cannot explain in plain words. Defences: fewer parameters, a reason for each rule before testing it, out-of-sample testing, and honest counting of every variation you tried.` ,
      eg: { title: 'The 2,400 tries problem', text: `You test 10 entry times × 8 stop levels × 6 target levels × 5 VIX filters = 2,400 combinations. Even if none has any real edge, a 5% false-positive chance per test means about 2,400 × 0.05 = 120 combinations will look good by luck. Choosing the top one and trading it is picking the luckiest, not the best (illustrative).` },
      tip: `If you cannot explain why a rule should work, a good backtest is not a reason to trust it.`,
      visual: { kind: 'matrix', title: 'Complexity vs result quality', xLabels: ['Few parameters', 'Many parameters'], yLabels: ['Holds on new data', 'Fails on new data'], cells: [{ head: 'Plausible edge', note: 'Simple and explainable', tone: 'ice' }, { head: 'Lucky or truly strong', note: 'Needs extra proof', tone: 'gold' }, { head: 'Honest failure', note: 'Learn and move on', tone: 'neutral' }, { head: 'Classic overfit', note: 'Great backtest, poor live', tone: 'bear' }] },
    },
    {
      t: 4,
      def: `Parameter optimisation searches for the settings (stop-loss, target, entry time, strike distance) that gave the best past results. Done carefully, it finds a stable zone; done carelessly, it finds the luckiest spike.`,
      hi: `Parameter optimisation un settings ko dhoondhta hai (stop-loss, target, entry time, strike distance) jinhone past mein best result diya. Dhyaan se karo toh stable zone milta hai; laparwahi se karo toh sabse lucky spike milta hai.`,
      how: `Run the strategy across a grid of values for one or two parameters at a time and plot the result. Prefer a broad plateau where neighbouring values also work, and choose the middle of it, rather than a lone peak. A parameter whose best value sits at the edge of the tested range needs a wider test. Keep the number of optimised parameters small, and let the out-of-sample or walk-forward test, not the optimiser, decide whether the choice is acceptable.` ,
      eg: { title: 'Stop-loss grid (illustrative)', text: `Net P&L in ₹ over 100 trades for stops at 20% / 30% / 40% / 50% / 60% of premium: 18,000 / 42,000 / 45,000 / 43,000 / 20,000. The peak is at 40% but 30% and 50% are nearly as good, forming a plateau from 30% to 50%. Choosing 40% sits in the middle. Had the results been 5,000 / 8,000 / 45,000 / 9,000 / 6,000, the lone spike would be a warning.` },
      tip: `Pick the centre of a plateau, not the tallest spike.`,
      visual: { kind: 'bars', title: 'Net P&L by stop-loss % (₹, illustrative)', unit: ' ₹', items: [{ label: '20%', value: 18000, tone: 'neutral' }, { label: '30%', value: 42000, tone: 'ice' }, { label: '40%', value: 45000, tone: 'gold' }, { label: '50%', value: 43000, tone: 'ice' }, { label: '60%', value: 20000, tone: 'neutral' }] },
    },
    {
      t: 5,
      def: `Monte Carlo simulation re-orders or resamples your historical trades many times to see the range of outcomes, especially drawdowns, that the same trades could have produced.`,
      hi: `Monte Carlo simulation aapke historical trades ko baar-baar alag order mein ya resample karke dekhta hai ki wahi trades kitne alag outcomes de sakte the, khaaskar drawdown mein.`,
      how: `Your backtest shows one path, but trade order is partly luck. Shuffle the trade results (or sample with replacement) a thousand times, build an equity curve each time and record the maximum drawdown and ending equity. Look at the distribution: the median, the 5th percentile and the worst case. If the 95th percentile drawdown is far larger than the historical one, size positions for the larger figure. Monte Carlo cannot fix a bad dataset; it assumes the trades are independent and drawn from the same distribution, which fails in a regime change.` ,
      eg: { title: 'One log, many orders', text: `The 10-trade log has five wins totalling ₹14,950 and five losses totalling ₹9,100. In the original order, maximum drawdown was ₹3,250. If all five losses came first, drawdown would be ₹9,100, which is 1.82% of a ₹5,00,000 account and 2.8 times the observed figure. A real simulation would use 100 or more trades; with only 10 the exercise just shows the idea (illustrative).` },
      tip: `Plan your position size around the 95th percentile drawdown, not the one your backtest happened to show.`,
      calc: { id: 'drawdown-recovery', preset: { drawdownPct: 20 }, why: `Shows how much harder recovery gets as the simulated drawdown deepens.` },
    },
    {
      t: 6,
      def: `Regime-based testing splits results by market condition such as trending, range-bound or high-volatility, to see where the strategy earns and where it bleeds.`,
      hi: `Regime-based testing results ko market condition ke hisaab se baantta hai, jaise trending, range-bound ya high-volatility, taaki dikhe ki strategy kahan kamati hai aur kahan paisa khoti hai.`,
      how: `Define regimes with objective rules fixed in advance, for example a 20-day trend filter, the ADX or the size of the previous day's range, and the India VIX level. Tag every trade with its regime and compute expectancy and drawdown per regime. A strategy that earns only in one regime is not broken, but it needs a rule to switch off or shrink outside that regime. Beware of defining regimes after seeing the results, which is just another overfit. Make sure each regime has enough trades to mean something.` ,
      eg: { title: 'Three regimes (illustrative)', text: `Of 100 trades, 30 were in trends (average +₹1,400, total ₹42,000), 50 in ranges (average +₹300, total ₹15,000) and 20 in sudden volatility spikes (average −₹450, total −₹9,000). Net = 42,000 + 15,000 − 9,000 = ₹48,000, or ₹480 per trade. Most of the profit came from trends, so a trend filter becomes the key rule to investigate.` },
      tip: `Know which regime pays you; the same rule can be a winner in one and a loser in another.`,
      visual: { kind: 'bars', title: 'Total P&L by regime (₹, illustrative)', unit: ' ₹', items: [{ label: 'Trending', value: 42000, tone: 'bull' }, { label: 'Range', value: 15000, tone: 'bull' }, { label: 'Vol spike', value: -9000, tone: 'bear' }] },
    },
    {
      t: 7,
      def: `Expiry-wise performance splits results by how far a trade is from expiry: expiry day, the day before, early in the week or the monthly expiry. Time to expiry changes how options behave.`,
      hi: `Expiry-wise performance results ko expiry se doori ke hisaab se baantta hai: expiry day, usse pehle ka din, hafte ki shuruaat ya monthly expiry. Expiry se samay badalne par options ka behaviour badal jaata hai.`,
      how: `Theta and gamma change sharply near expiry, so the same rule can behave very differently on expiry day than three days before. NSE index expiries currently fall on Tuesday (the previous trading day if it is a holiday), but expiry days and the number of weekly expiries have changed over the years under NSE and SEBI rules, so a backtest must tag each trade with days to expiry using the calendar that applied then, not today's. Compare expiry day, 1 day to expiry, 2-4 days and the monthly series separately, and note spreads and fill quality on expiry day.` ,
      eg: { title: 'Expiry vs non-expiry (illustrative)', text: `Out of 100 trades, 20 were taken on expiry day with an average of −₹250 (total −₹5,000), and 80 on other days with an average of +₹700 (total ₹56,000). Net = 56,000 − 5,000 = ₹51,000. Dropping expiry-day trades lifts net to ₹56,000 and removes the most volatile days, though 20 trades is a small sample.` },
      tip: `Always record days to expiry with every trade, and use the expiry calendar of that time.`,
      visual: { kind: 'bars', title: 'Average P&L per trade by timing (₹, illustrative)', unit: ' ₹', items: [{ label: 'Expiry day', value: -250, tone: 'bear' }, { label: 'Other days', value: 700, tone: 'bull' }] },
    },
    {
      t: 8,
      def: `VIX-based performance groups trades by the India VIX level at entry, to see whether the strategy prefers calm or nervous markets. VIX shows expected volatility, not direction.`,
      hi: `VIX-based performance trades ko entry par India VIX ke level ke hisaab se group karta hai, taaki dikhe ki strategy shaant ya ghabraye hue market mein behtar chalti hai. VIX expected volatility batata hai, direction nahi.`,
      how: `India VIX is NSE's measure of the volatility implied by NIFTY option prices. Option premiums are larger when VIX is high, which changes the cost of buying and the cash a seller collects. Choose buckets before looking (for example below 12, 12 to 16, above 16) and compute expectancy in each. Buyers often struggle in very low VIX if movement does not follow; sellers face rare but heavy losses when VIX jumps. Because the VIX level trends over years, also check that buckets are not just proxies for a particular year.` ,
      eg: { title: 'Three VIX buckets (illustrative)', text: `25 trades with VIX below 12 averaged −₹200 (total −₹5,000); 45 trades with VIX 12-16 averaged +₹600 (total ₹27,000); 30 trades with VIX above 16 averaged +₹200 (total ₹6,000). Net = −5,000 + 27,000 + 6,000 = ₹28,000. The rule seems to need a moderate VIX; a filter of VIX 12-16 would be a hypothesis to test out-of-sample, not a conclusion.` },
      tip: `A VIX filter found on past data is a hypothesis; confirm it on unseen data before using it.`,
      visual: { kind: 'gauge', title: 'India VIX buckets used in the test (illustrative)', min: 8, max: 30, value: 14, zones: [{ from: 8, to: 12, label: 'Low', tone: 'ice' }, { from: 12, to: 16, label: 'Moderate', tone: 'gold' }, { from: 16, to: 30, label: 'High', tone: 'bear' }] },
    },
    {
      t: 9,
      def: `Sensitivity analysis changes one input at a time (stop, entry time, costs, slippage) to see how much the result moves. A robust strategy bends a little; a fragile one breaks.`,
      hi: `Sensitivity analysis ek-ek input badalta hai (stop, entry time, costs, slippage) aur dekhta hai ki result kitna hilta hai. Robust strategy thodi jhukti hai; fragile strategy toot jaati hai.`,
      how: `Move each parameter up and down by a modest amount, such as ±10% or one step, and record expectancy. Then test the costs: add extra slippage per unit and extra charges per trade. Slippage on one lot of 65 units is the extra price per unit multiplied by 65, paid on entry and again on exit. If the edge disappears with a small extra cost, the live result will probably be worse than the backtest because real fills are rarely perfect. Chart the results so you can see which input matters most.` ,
      eg: { title: 'Cost sensitivity', text: `Base expectancy is ₹585 per trade. Extra slippage of ₹1 per unit on entry and exit for one lot of 65 costs 2 × 65 = ₹130 per trade, leaving ₹455. At ₹3 per unit it costs 2 × 3 × 65 = ₹390, leaving ₹195. The edge is still positive but has shrunk by two-thirds, so execution quality matters more than another indicator.` },
      tip: `Assume live fills are worse than your backtest and see whether the edge survives.`,
      calc: { id: 'spread-cost', preset: { bid: 100, ask: 101, qty: 1, lotSize: 65 }, why: `Turns a per-unit spread or slippage into rupees per lot.` },
      visual: { kind: 'bars', title: 'Expectancy per trade vs extra slippage (₹, illustrative)', unit: ' ₹', items: [{ label: 'None', value: 585, tone: 'gold' }, { label: '₹1/unit', value: 455, tone: 'ice' }, { label: '₹3/unit', value: 195, tone: 'neutral' }] },
    },
    {
      t: 10,
      def: `Robustness testing asks whether the strategy still works when the data, period, instrument or assumptions change, and whether a handful of lucky trades is carrying the whole result.`,
      hi: `Robustness testing poochta hai ki jab data, period, instrument ya assumptions badlein tab bhi strategy chalti hai ya nahi, aur kya sirf kuch lucky trades poora result utha rahe hain.`,
      how: `Use a checklist: test other periods, test a related instrument (BANKNIFTY or SENSEX if you built the idea on NIFTY), double the costs, remove the best five trades, shift entries by a few minutes and check the drawdown against your risk limit. A robust edge usually survives most of these in weaker form. Also confirm the sample size, because 30 trades prove very little. After all tests, write down the conditions under which you will stop trading the rule. SEBI studies on individual F&O traders show most lose money after costs, which is a reminder to hold your own strategy to a hard standard.` ,
      eg: { title: 'Remove the best trades', text: `100 trades with expectancy ₹585 give total profit 100 × 585 = ₹58,500. The five best trades add up to ₹30,000. Without them, profit is 58,500 − 30,000 = ₹28,500, still positive but 51% of the total came from five trades. If the remaining figure had been negative, the strategy would depend on luck (illustrative).` },
      tip: `If removing the five best trades turns the result negative, you have a lottery ticket, not a strategy.`,
      calc: { id: 'return-calc', preset: { start: 500000, end: 558500, years: 1 }, why: `Converts total profit on the account into a percentage return.` },
    },
  ],
  tools: [{ id: 'risk-reward', why: `Expectancy and breakeven win rate for the backtested averages.` }, { id: 'drawdown-recovery', why: `Gain needed to recover a simulated drawdown.` }],
}
export default m
