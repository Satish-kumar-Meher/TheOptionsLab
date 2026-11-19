import type { ModuleLesson } from '../topicLessonTypes'

/* Module 24.5 - Strategy Performance Analysis.
 * One illustrative 10-trade log (Rs): +3,250, -1,950, +2,600, -1,300, -1,950, +4,550, -1,300, +1,950, -2,600, +2,600.
 * Wins 5 = 14,950 (avg 2,990); losses 5 = 9,100 (avg 1,820); net 5,850. Equity: 3,250 1,300 3,900 2,600 650 5,200 3,900 5,850 3,250 5,850.
 * Max drawdown 3,250 (3,900 -> 650). Longest win run 1, longest loss run 2.
 * Monthly returns (%), 12 months: 2.0 -1.0 3.0 1.5 -2.5 4.0 0.5 -1.5 2.5 1.0 -0.5 3.5 (mean 1.0417, sample SD 2.0830), risk-free 6.5% a year = 0.5417% a month.
 * Sharpe monthly 0.240, annualised 0.832. Downside deviation (target = risk-free, divide by 12) 1.186; Sortino monthly 0.422, annualised 1.460. */
const m: ModuleLesson = {
  moduleId: '24.5',
  intro: `A list of trades is not yet knowledge. Performance statistics turn it into a few numbers that describe how often a strategy wins, how large wins and losses are, how deep the drops were and how much return came for each unit of risk. This module explains the common statistics, how to compute them, and what each one hides.`,
  introHi: `Trades ki list akeli knowledge nahi hoti. Performance statistics use kuch numbers mein badal dete hain jo batate hain ki strategy kitni baar jeetti hai, wins aur losses kitne bade hain, drops kitne gehre the aur har unit risk par kitna return mila. Is module mein common statistics, unhe compute karna aur har ek kya chhupata hai, yeh dekhenge.`,
  steps: {
    concept: `Every statistic looks at the same trade log from a different side. Win rate counts how often; average win and loss measure how much; profit factor and expectancy combine the two; drawdown measures pain; Sharpe and Sortino measure return per unit of volatility; streaks show how long bad runs last. No single number is enough.`,
    conceptHi: `Har statistic ek hi trade log ko alag angle se dekhta hai. Win rate batata hai kitni baar; average win aur loss batate hain kitna; profit factor aur expectancy dono ko jodte hain; drawdown dard naapta hai; Sharpe aur Sortino volatility ke hisaab se return naapte hain; streaks batate hain ki bure daur kitne lambe chalte hain. Akela koi ek number kaafi nahi hai.`,
    mechanism: `Start from the trade log with net P&L per trade (after charges and slippage). Split wins and losses, compute counts and averages, then build the equity curve (running total) to measure drawdown and streaks. For Sharpe and Sortino convert P&L into periodic returns on capital (daily or monthly), subtract the risk-free rate (for example 6.5% a year as an assumption), and divide by volatility (all returns for Sharpe, only the downside for Sortino).`,
    example: {
      title: 'A 10-trade log (illustrative)',
      text: `Net P&L in ₹: +3,250, −1,950, +2,600, −1,300, −1,950, +4,550, −1,300, +1,950, −2,600, +2,600. Wins: 5, totalling ₹14,950 (average ₹2,990). Losses: 5, totalling ₹9,100 (average ₹1,820). Win rate = 50%. Profit factor = 14,950 / 9,100 = 1.64. Expectancy = (14,950 − 9,100) / 10 = ₹585 per trade. The equity curve peaks at ₹3,900 after trade 3 and falls to ₹650 after trade 5, so maximum drawdown is ₹3,250 (0.65% of a ₹5,00,000 account). Ten trades is a very small sample; treat the numbers as an illustration of the method.`,
    },
    chart: {
      kind: 'bars',
      title: 'Cumulative P&L after each trade (₹, illustrative)',
      caption: 'The running total makes the drawdown visible: from 3,900 after trade 3 down to 650 after trade 5.',
      unit: ' ₹',
      items: [
        { label: 'T1', value: 3250, tone: 'bull' },
        { label: 'T2', value: 1300, tone: 'bull' },
        { label: 'T3', value: 3900, tone: 'bull' },
        { label: 'T4', value: 2600, tone: 'bull' },
        { label: 'T5', value: 650, tone: 'bear' },
        { label: 'T6', value: 5200, tone: 'bull' },
        { label: 'T7', value: 3900, tone: 'bull' },
        { label: 'T8', value: 5850, tone: 'bull' },
        { label: 'T9', value: 3250, tone: 'bull' },
        { label: 'T10', value: 5850, tone: 'bull' },
      ],
    },
    optionChain: `The option chain does not give these statistics directly; they come from your trade log. What the chain adds is context for each trade: the strike and expiry, the spread you paid and the OI and IV at the time. Grouping the log by expiry day, by strike distance or by IV level (covered in later modules) shows which conditions produced the numbers.`,
    psychology: `People prefer a high win rate because it feels good, but a strategy can win 70% of the time and still lose money if the average loss is large. The opposite also exists: trend-style rules lose often and pay on a few big wins. Know which type you are running and size so you can live through its normal losing streaks.`,
    scenarios: {
      bullish: `Strong trending phases flatter long-biased rules: win rate, profit factor and Sharpe all rise together. Check the same statistics in a flat or falling phase before concluding anything.`,
      bearish: `In a sharp fall, drawdown and the longest losing streak are the numbers that matter. Compare them with your worst-case tolerance, not with the average.`,
      sideways: `Range phases show up as a lower win rate and a lower profit factor for breakout rules, and as a higher win rate but fatter rare losses for premium-selling rules.`,
    },
    practice: [
      {
        q: `A strategy has 40 trades, 22 winners averaging ₹2,500 and 18 losers averaging ₹2,200. Compute win rate, profit factor and expectancy.`,
        a: `Win rate = 22 / 40 = 55%. Gross profit = 22 × 2,500 = ₹55,000; gross loss = 18 × 2,200 = ₹39,600. Profit factor = 55,000 / 39,600 = 1.39. Expectancy = (55,000 − 39,600) / 40 = ₹385 per trade.`,
      },
      {
        q: `A system wins 35% of trades with average win ₹4,000 and average loss ₹1,500. Is the expectancy positive?`,
        a: `Expectancy = 0.35 × 4,000 − 0.65 × 1,500 = 1,400 − 975 = +₹425 per trade. Reward-to-risk is 4,000 / 1,500 = 2.67, so the breakeven win rate is 1 / (1 + 2.67) = 27.3%, and 35% is above it.`,
      },
      {
        q: `An account of ₹5,00,000 falls from a peak of ₹5,80,000 to ₹5,22,000. What is the drawdown, and what gain is needed to return to the peak?`,
        a: `Drawdown = (5,80,000 − 5,22,000) / 5,80,000 = 58,000 / 5,80,000 = 10.0%. Gain needed from the lower level = 58,000 / 5,22,000 = 11.1%.`,
      },
      {
        q: `A strategy wins 55% of trades. What is the chance of 5 losses in a row on any given run of 5 trades, assuming independent trades?`,
        a: `P(loss) = 0.45. Five in a row = 0.45^5 = 0.0185, or about 1.8%. Over hundreds of trades such a run will still occur, so size positions to survive it.`,
      },
    ],
    assignment: `Take the trade log of any strategy you tested (even 20 paper trades). In a spreadsheet compute win rate, average win, average loss, profit factor, expectancy, the equity curve, maximum drawdown and the longest win and loss streaks. Write one sentence on what the numbers show and one on what they cannot show.`,
  },
  topics: [
    {
      t: 1,
      def: `Win rate is the share of trades that ended in profit: winning trades divided by total trades. It says how often you win, not how much.`,
      hi: `Win rate matlab kitne percent trades profit mein gaye: winning trades ko total trades se divide karo. Yeh batata hai ki aap kitni baar jeete, kitna jeete yeh nahi.`,
      how: `Count a trade as a win if its net P&L (after charges and slippage) is above zero. Win rate must always be read next to the average win and average loss, because the same 50% can be profitable or ruinous. High win-rate systems, such as many premium-selling rules, tend to have small wins and rare large losses; low win-rate systems, such as many breakout rules, tend to have small losses and rare large wins. Use at least 100 trades before trusting a win rate; with 10 trades the uncertainty is very large.`,
      eg: { title: 'Win rate on the 10-trade log', text: `Five of the ten trades are positive (3,250, 2,600, 4,550, 1,950, 2,600), so win rate = 5 / 10 = 50%. The loss rate is the remaining 50%. Because the average win (₹2,990) exceeds the average loss (₹1,820), this 50% is profitable; with an average win of ₹1,500 it would not be.` },
      tip: `Never quote a win rate alone; always pair it with the average win and average loss.`,
      visual: { kind: 'bars', title: 'Trades by result (10-trade log)', unit: ' trades', items: [{ label: 'Wins', value: 5, tone: 'bull' }, { label: 'Losses', value: 5, tone: 'bear' }] },
    },
    {
      t: 2,
      def: `Average profit is the mean P&L of the winning trades: total profit from winners divided by the number of winners.`,
      hi: `Average profit matlab winning trades ka mean P&L: winners se total profit ko winners ki ginti se divide karna.`,
      how: `Compute it on winners only and in rupees after costs. A few outsized winners can lift the average, so also look at the median win and the largest win as a share of total profit. If one trade supplies most of the profit, the strategy depends on luck or on rare events. In options, average win is influenced by your exit style: fixed targets cap it, trailing stops let it vary.`,
      eg: { title: 'Average win', text: `Winners: 3,250 + 2,600 + 4,550 + 1,950 + 2,600 = ₹14,950 over 5 trades, so the average profit is ₹2,990. The biggest win (₹4,550) is 30.4% of gross profit, which is a healthy spread; if it were 70%, the result would depend on one trade.` },
      tip: `Check what share of total profit comes from the single best trade; dependence on one trade means fragility.`,
      visual: { kind: 'bars', title: 'Winning trades (₹)', unit: ' ₹', items: [{ label: '4,550', value: 4550, tone: 'bull' }, { label: '3,250', value: 3250, tone: 'bull' }, { label: '2,600', value: 2600, tone: 'bull' }, { label: '2,600', value: 2600, tone: 'bull' }, { label: '1,950', value: 1950, tone: 'bull' }] },
    },
    {
      t: 3,
      def: `Average loss is the mean size of the losing trades: total loss divided by the number of losing trades, written as a positive number.`,
      hi: `Average loss matlab losing trades ka mean size: total loss ko losing trades ki ginti se divide karna, aur use positive number likhna.`,
      how: `Compare the average loss with your planned stop. If the plan was ₹1,950 and the average loss is ₹2,400, the stops are slipping or you are not following them. Look also at the worst single loss, because survival depends on it. For premium sellers, the average loss may look fine until one event produces a loss many times the average, so study the tail separately.`,
      eg: { title: 'Average loss vs plan', text: `Losses: 1,950 + 1,300 + 1,950 + 1,300 + 2,600 = ₹9,100 over 5 trades, average ₹1,820. The worst loss of ₹2,600 is 1.43 times the average. If the plan allowed a maximum of ₹2,000 a trade, one loss broke that rule and deserves a note in the journal.` },
      tip: `Compare average and worst loss with the loss you planned; a gap means your stop discipline or fills are off.`,
      visual: { kind: 'bars', title: 'Losing trades (₹)', unit: ' ₹', items: [{ label: '2,600', value: 2600, tone: 'bear' }, { label: '1,950', value: 1950, tone: 'bear' }, { label: '1,950', value: 1950, tone: 'bear' }, { label: '1,300', value: 1300, tone: 'bear' }, { label: '1,300', value: 1300, tone: 'bear' }] },
    },
    {
      t: 4,
      def: `Profit factor is gross profit divided by gross loss. A value above 1 means winners paid for losers; below 1 means the strategy lost money overall.`,
      hi: `Profit factor matlab gross profit ko gross loss se divide karna. 1 se upar ka matlab winners ne losers ka paisa bhar diya; 1 se neeche matlab strategy overall loss mein rahi.`,
      how: `Use net figures after costs. Profit factor ignores how many trades there were and how deep the drawdown was, so two strategies with PF 1.6 can feel very different. Very high values from a small sample (PF above 3 on 20 trades) usually fall back toward earth on new data. Many practitioners look for a PF clearly above 1 after costs and with enough trades, but there is no threshold that guarantees future profit.`,
      eg: { title: 'Profit factor', text: `Gross profit ₹14,950 and gross loss ₹9,100 give PF = 14,950 / 9,100 = 1.64. Now add ₹150 of extra cost per trade (10 × 150 = ₹1,500): PF = (14,950 − 750) / (9,100 + 750) is not how it works; simply deduct costs from every trade, giving net ₹5,850 − ₹1,500 = ₹4,350 in total, so costs trimmed net profit by 25.6%.` },
      tip: `A profit factor from fewer than about 100 trades is a rough guide, not a measurement.`,
      calc: { id: 'risk-reward', preset: { winRate: 50, avgWin: 2990, avgLoss: 1820 }, why: `Shows reward-to-risk and expectancy for the same averages that produce the profit factor.` },
    },
    {
      t: 5,
      def: `Expectancy is the average amount you expect to make per trade: win rate times average win, minus loss rate times average loss.`,
      hi: `Expectancy matlab har trade par aap average kitna kamane ki ummeed rakh sakte ho: win rate ko average win se multiply karo, aur loss rate ko average loss se multiply karke minus karo.`,
      how: `Expectancy is the single most useful summary because it works per trade and in rupees. Multiply it by the number of trades per month to see the rough monthly result before luck. Compare expectancy with costs: if it is ₹585 and costs are ₹280, the edge after costs is thin and depends on accurate cost assumptions. Expressing expectancy in R (multiples of the planned risk) lets you compare strategies of different size.`,
      eg: { title: 'Expectancy per trade', text: `With win rate 50%, average win ₹2,990 and average loss ₹1,820: expectancy = 0.5 × 2,990 − 0.5 × 1,820 = 1,495 − 910 = ₹585 per trade. In R terms, with a planned risk of ₹1,950 per trade, it is 585 / 1,950 = 0.30R. At 20 trades a month the rough expected result is 20 × 585 = ₹11,700 before the effect of luck, which on only ten observed trades is very uncertain.` },
      tip: `Positive expectancy after costs on a large sample is the minimum requirement; anything less is a coin toss.`,
      calc: { id: 'risk-reward', preset: { winRate: 50, avgWin: 2990, avgLoss: 1820 }, why: `Computes expectancy and the breakeven win rate.` },
    },
    {
      t: 6,
      def: `Maximum drawdown is the largest fall from a peak in your equity to the next low, before a new peak is made.`,
      hi: `Maximum drawdown matlab aapke equity ke peak se agle low tak ka sabse bada girna, naya peak banne se pehle.`,
      how: `Build the equity curve, track the running peak, and at every point measure peak minus current value. The largest value is the maximum drawdown; express it in rupees and as a percentage of peak equity. Drawdown is path-dependent: the same trades in a different order give different drawdowns (the Monte Carlo topic in the next module explores this). Recovery is asymmetric: a 20% fall needs a 25% gain to recover and a 50% fall needs 100%.`,
      eg: { title: 'Drawdown in the log', text: `Equity after each trade: 3,250, 1,300, 3,900, 2,600, 650, 5,200, 3,900, 5,850, 3,250, 5,850. The peak at 3,900 (after trade 3) falls to 650 after trade 5, so maximum drawdown = 3,900 − 650 = ₹3,250. The later fall from 5,850 to 3,250 is ₹2,600. A drawdown of ₹3,250 on a ₹5,00,000 account is 0.65%, small only because the account is large compared with the risk per trade.` },
      tip: `Judge a strategy by whether you can live through its maximum drawdown, not by its profit.`,
      calc: { id: 'drawdown-recovery', preset: { drawdownPct: 20 }, why: `Shows how much larger the gain must be than the drawdown.` },
      visual: { kind: 'curve', title: 'Drawdown shape', curve: 'drawdown' },
    },
    {
      t: 7,
      def: `The Sharpe ratio is the average return above the risk-free rate divided by the standard deviation of returns. It measures return per unit of total volatility.`,
      hi: `Sharpe ratio matlab risk-free rate se upar ka average return, jise returns ke standard deviation se divide kiya jaata hai. Yeh har unit volatility par return naapta hai.`,
      how: `Convert P&L into returns on capital for equal periods (monthly here), subtract the risk-free rate per period (for example 6.5% a year ≈ 0.5417% a month, an assumption), take the average excess return and divide by the standard deviation of returns. Multiply by the square root of periods per year to annualise (√12 for monthly). Sharpe treats upside and downside swings alike and can look flattering for strategies that sell options, which earn small steady returns until a rare large loss arrives. Use it as one number among many.`,
      eg: { title: 'Monthly Sharpe', text: `Twelve monthly returns in %: 2.0, −1.0, 3.0, 1.5, −2.5, 4.0, 0.5, −1.5, 2.5, 1.0, −0.5, 3.5. Mean = 1.0417%, sample standard deviation = 2.083%. Risk-free = 0.5417% a month. Sharpe (monthly) = (1.0417 − 0.5417) / 2.083 = 0.24. Annualised = 0.24 × √12 = 0.83.` },
      tip: `Sharpe can hide tail risk; a strategy that sells options can show a lovely Sharpe until the day it does not.`,
      visual: { kind: 'gauge', title: 'Annualised Sharpe of the example (illustrative scale)', min: 0, max: 3, value: 0.83, zones: [{ from: 0, to: 0.5, label: 'Weak', tone: 'bear' }, { from: 0.5, to: 1, label: 'Modest', tone: 'gold' }, { from: 1, to: 2, label: 'Good', tone: 'ice' }, { from: 2, to: 3, label: 'Excellent', tone: 'bull' }] },
    },
    {
      t: 8,
      def: `The Sortino ratio is like Sharpe but divides by downside deviation only, so it penalises losses and not upside swings.`,
      hi: `Sortino ratio Sharpe jaisa hi hai, lekin yeh sirf downside deviation se divide karta hai, isliye yeh losses ko penalise karta hai, upside ke swings ko nahi.`,
      how: `Pick a target return (here the monthly risk-free rate of 0.5417%). For each period, take the shortfall below the target (zero if above it), square it, average over all periods, and take the square root. That is the downside deviation. Sortino = (average return − target) / downside deviation. It suits strategies where big gains are welcome and only losses are a worry. Different software uses slightly different conventions (the divisor, the target), so compare numbers only when computed the same way.`,
      eg: { title: 'Monthly Sortino', text: `Using the same twelve returns and a target of 0.5417%, the months below target give a downside deviation of 1.186% (squared shortfalls averaged over all 12 months). Sortino (monthly) = (1.0417 − 0.5417) / 1.186 = 0.42, annualised 0.42 × √12 = 1.46. It is higher than the annualised Sharpe of 0.83 because the volatility came partly from positive months.` },
      tip: `Compare Sortino only with Sortino computed the same way; conventions differ between tools.`,
      visual: { kind: 'compare', title: 'Sharpe vs Sortino', left: { head: 'Sharpe', tone: 'ice', points: ['Divides by all volatility', 'Upside swings count against you', 'Example: 0.83 annualised'] }, right: { head: 'Sortino', tone: 'gold', points: ['Divides by downside only', 'Gains do not count as risk', 'Example: 1.46 annualised'] } },
    },
    {
      t: 9,
      def: `Risk-reward ratio compares what you stand to gain on a trade with what you stand to lose: average win divided by average loss, or target distance divided by stop distance.`,
      hi: `Risk-reward ratio compare karta hai ki trade par aap kitna kama sakte ho aur kitna kho sakte ho: average win ko average loss se divide karna, ya target distance ko stop distance se.`,
      how: `Planned risk-reward is set before the trade (target distance / stop distance); realised risk-reward is measured from the log (average win / average loss). The breakeven win rate is 1 / (1 + R:R). A ratio of 2 needs only a 33.3% win rate to break even before costs. High ratios are not free: wider targets are hit less often, so there is a trade-off with win rate.`,
      eg: { title: 'Breakeven win rate', text: `Average win ₹2,990 and average loss ₹1,820 give R:R = 1.64. Breakeven win rate = 1 / (1 + 1.64) = 37.8%. The observed 50% is 12.2 percentage points above it. With a planned stop of ₹1,950 and target of ₹3,900 the planned R:R is 2.0, and the breakeven rate is 33.3%.` },
      tip: `Always compute the breakeven win rate for your reward-to-risk and compare it with your honest, after-cost win rate.`,
      calc: { id: 'risk-reward', preset: { winRate: 50, avgWin: 2990, avgLoss: 1820 }, why: `Gives reward-to-risk and the breakeven win rate.` },
      visual: { kind: 'bars', title: 'Breakeven win rate by reward-to-risk', unit: '%', items: [{ label: '1 : 1', value: 50, tone: 'neutral' }, { label: '1.64 : 1', value: 37.8, tone: 'gold' }, { label: '2 : 1', value: 33.3, tone: 'ice' }, { label: '3 : 1', value: 25, tone: 'ice' }] },
    },
    {
      t: 10,
      def: `Consecutive wins and losses are the longest runs of winning or losing trades in a row. They show how bad a normal bad patch can feel.`,
      hi: `Consecutive wins aur losses matlab lagatar jeet ya haar ki sabse lambi run. Yeh dikhata hai ki ek normal kharab daur kitna bhaari lag sakta hai.`,
      how: `Read the sequence of results (W for win, L for loss) and record the longest run of each. Losing streaks are a normal feature of randomness: a 50% strategy will often show runs of 5 or more over a hundred trades (the expected longest run in 100 fair coin tosses is about 6). The streak length decides whether your position size is survivable: five consecutive stops at 1% risk each cost about 5% of capital, while at 5% risk each they cost about 23%. Plan the maximum streak you must endure before you start.`,
      eg: { title: 'Streaks in the log', text: `The sequence is W L W L L W L W L W. The longest win run is 1 and the longest loss run is 2 (trades 4 and 5). With risk of ₹3,900 per trade (2 lots) on ₹5,00,000, two losses in a row cost ₹7,800, or 1.56%. At a 45% loss chance per trade, five losses in a row has a probability of 0.45^5 = 1.8% on any given five trades.` },
      tip: `Choose position size for the losing streak you expect over hundreds of trades, not the one you saw in ten.`,
      visual: { kind: 'timeline', title: 'Sequence of the 10 trades', events: [{ when: 'T1-T3', what: 'W L W', tone: 'neutral' }, { when: 'T4-T5', what: 'L L (longest loss run = 2)', tone: 'bear' }, { when: 'T6-T10', what: 'W L W L W', tone: 'neutral' }] },
    },
  ],
  tools: [{ id: 'risk-reward', why: `Expectancy and breakeven win rate.` }, { id: 'drawdown-recovery', why: `Gain needed to recover a drawdown.` }],
}
export default m
