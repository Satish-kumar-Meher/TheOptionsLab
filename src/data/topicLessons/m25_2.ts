import type { ModuleLesson } from '../topicLessonTypes'

/* Module 25.2 - Performance Evaluation. Illustrative numbers: NIFTY about 24,000, lot 65 (check current NSE contract specification). Sample journal: 20 trades, capital Rs 5,00,000, all figures before taxes and charges unless stated. */
const m: ModuleLesson = {
  moduleId: '25.2',
  intro: 'Performance evaluation turns a journal into numbers: profit and loss over time, how often you win, how big wins and losses are, and how deep the losing stretches get. No single number tells the whole story, so you read them together. This module covers the main measures and how to avoid being fooled by them.',
  introHi: 'Performance evaluation journal ko numbers mein badalta hai: samay ke saath profit aur loss, kitni baar jeete, jeet aur haar kitni badi, aur loss ke daur kitne gehre rahe. Koi ek number poori kahani nahi batata, isliye sabko saath padhte hain. Yeh module mukhya measures aur unse dhoka na khane ke tareeke batata hai.',
  steps: {
    concept: 'Total profit alone hides how it was earned. Two traders can both make ₹12,000, one with steady small wins and the other with one lucky trade and many losses. Win rate, average win and loss, profit factor, expectancy and drawdown together describe the quality and the risk of results, and tell you whether the edge is likely to repeat.',
    conceptHi: 'Sirf total profit se pata nahi chalta ki kamaai kaise hui. Do traders dono ₹12,000 kama sakte hain, ek chhote steady wins se aur doosra ek lucky trade aur kai losses ke saath. Win rate, average win aur loss, profit factor, expectancy aur drawdown milkar results ki quality aur risk batate hain, aur yeh bhi ki edge dobara aayega ya nahi.',
    mechanism: 'Start from the journal: every closed trade has a net P&L. Group by day, week and month for the equity curve. Compute win rate (wins ÷ trades), average win and average loss, profit factor (gross profit ÷ gross loss), expectancy (average result per trade) and maximum drawdown (largest fall from a peak to a later trough). Use net figures after charges once you have them. A small sample gives unreliable numbers, so treat results from under about 30 trades as a hint, not a conclusion.',
    example: {
      title: 'A 20-trade sample (illustrative)',
      text: 'Wins: 9 trades totalling ₹28,800 (average ₹3,200). Losses: 11 trades totalling ₹16,500 (average ₹1,500). Net = ₹12,300, or 2.46% on ₹5,00,000. Win rate 45%, profit factor 28,800 ÷ 16,500 = 1.75, expectancy = 0.45 × 3,200 − 0.55 × 1,500 = ₹615 per trade. The system wins less than half the time yet is positive because the average win is about 2.1 times the average loss.',
    },
    chart: {
      kind: 'curve',
      title: 'Equity curve and drawdown',
      caption: 'The equity curve is the running total of P&L; drawdown is the fall from its last peak.',
      curve: 'equity',
    },
    optionChain: 'Performance numbers do not come from the chain directly, but the chain is behind them: strike choice, spread and liquidity affect the fill, and IV and time to expiry affect the result. When a statistic looks bad, check whether the trades were in wide-spread strikes or in options with little time left before blaming the setup.',
    psychology: 'Looking at numbers after a loss feels bad, and looking after a win feels like proof. Both reactions bias the review. Decide the review day in advance, calculate the same measures every time and compare with the previous period, not with your hopes. A good week is not proof of skill, and a bad week is not proof of failure.',
    scenarios: {
      bullish: 'In a trending market the numbers may improve for a trend-following setup. Check whether results come from the setup or from the market phase, which may end.',
      bearish: 'In a falling market a long-call buyer will probably show lower win rates and deeper drawdown. Compare with the right benchmark and sample.',
      sideways: 'Sideways periods often show many small losses for buyers. Win rate and average loss will show how costs and decay are eating the result.',
    },
    practice: [
      {
        q: 'You made 9 wins totalling ₹28,800 and 11 losses totalling ₹16,500. What is the profit factor and the win rate?',
        a: 'Profit factor = 28,800 ÷ 16,500 = 1.745, about 1.75. Win rate = 9 ÷ 20 = 45%.',
      },
      {
        q: 'Win rate 45%, average win ₹3,200, average loss ₹1,500. What is the expectancy per trade and the breakeven win rate?',
        a: 'Expectancy = 0.45 × 3,200 − 0.55 × 1,500 = 1,440 − 825 = ₹615. Reward-to-risk = 3,200 ÷ 1,500 = 2.13. Breakeven win rate = 1 ÷ (1 + 2.13) = 31.9%.',
      },
      {
        q: 'Equity goes from ₹5,00,000 to a peak of ₹5,60,000 and then falls to ₹5,12,000. What is the drawdown and the gain needed to reach the peak again?',
        a: 'Drawdown = 48,000 ÷ 5,60,000 = 8.57%. Gain needed = 48,000 ÷ 5,12,000 = 9.38%.',
      },
      {
        q: 'A system wins 70% of trades with average win ₹800 and average loss ₹2,500. Is it positive?',
        a: 'Expectancy = 0.70 × 800 − 0.30 × 2,500 = 560 − 750 = −₹190 per trade. It loses money despite the high win rate.',
      },
    ],
    assignment: 'From your journal pick the last 20 closed trades. Compute win rate, average win, average loss, profit factor, expectancy and maximum drawdown in a sheet. Then write two sentences: what the numbers say about your system and what the sample size does not let you conclude.',
  },
  topics: [
    {
      t: 1,
      def: 'Daily P&L is the total profit or loss from all trades closed (and open positions marked to market) in one trading day. It is the smallest unit of review and shows how a single day went, including the effect of costs.',
      hi: 'Daily P&L ek trading din ke saare trades ka total profit ya loss hai. Yeh review ki sabse chhoti ikai hai aur dikhata hai ki ek din kaisa gaya, costs ke asar ke saath.',
      how: 'Sum the net P&L of every trade closed that day. Compare it with your daily loss limit. A single day is noisy and should not drive big decisions, but the list of daily results is the basis for weekly and monthly figures and for spotting a day when rules were broken. Also note the number of trades per day.',
      eg: {
        title: 'One day (illustrative)',
        text: 'Three trades: +₹2,400, −₹1,100 and +₹600. Daily P&L = 2,400 − 1,100 + 600 = +₹1,900. That is 0.38% of ₹5,00,000. If the daily loss limit was ₹3,000, this day stayed well within it.',
      },
      tip: 'Judge the day by whether you followed the plan, not only by the rupee result.',
      visual: {
        kind: 'bars',
        title: 'Trades in one day (illustrative)',
        caption: 'Rupees.',
        unit: '',
        items: [
          { label: 'Trade 1', value: 2400, tone: 'bull' },
          { label: 'Trade 2', value: -1100, tone: 'bear' },
          { label: 'Trade 3', value: 600, tone: 'bull' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 500000, end: 501900, years: 1 },
        why: 'Daily P&L as a percentage of capital.',
      },
    },
    {
      t: 2,
      def: 'Weekly P&L adds up the daily results for a week. It smooths day-to-day noise and fits a weekly review. A week is still a small sample, so look at how the result was made as well as how much it was.',
      hi: 'Weekly P&L ek hafte ke daily results ka jod hai. Isse din ke noise kam hote hain aur weekly review ke liye theek hai. Phir bhi ek hafta chhota sample hai, isliye kitna bana ke saath kaise bana, yeh bhi dekho.',
      how: 'Add the daily figures from Monday to Friday. Compare the best and the worst day: if one day makes or loses most of the week, the result depends on a single event. Also compare the week with the average of the last four weeks and note the number of trades and rule breaks. Option expiry weeks can look different from other weeks.',
      eg: {
        title: 'One week (illustrative)',
        text: 'Mon +1,900, Tue −2,200, Wed +3,100, Thu −800, Fri +1,500. Weekly P&L = 1,900 − 2,200 + 3,100 − 800 + 1,500 = +₹3,500. Wednesday alone made 3,100, almost the whole week, so the week was driven by one day.',
      },
      tip: 'Ask whether the week would still be positive without its best day.',
      visual: {
        kind: 'bars',
        title: 'Daily results in a week (illustrative)',
        caption: 'Rupees. Total +3,500.',
        unit: '',
        items: [
          { label: 'Mon', value: 1900, tone: 'bull' },
          { label: 'Tue', value: -2200, tone: 'bear' },
          { label: 'Wed', value: 3100, tone: 'bull' },
          { label: 'Thu', value: -800, tone: 'bear' },
          { label: 'Fri', value: 1500, tone: 'bull' },
        ],
      },
    },
    {
      t: 3,
      def: 'Monthly P&L is the sum for a calendar month, shown in rupees and as a percentage of capital. It is the usual unit for judging a strategy, because it contains enough trades to be more meaningful than a day or a week.',
      hi: 'Monthly P&L ek calendar mahine ka total hai, rupaye mein aur capital ke percentage mein. Strategy ko judge karne ka yeh aam unit hai kyunki ismein din ya hafte se zyada trades hote hain.',
      how: 'Add the weekly totals and divide by the capital at the start of the month. Look at the trend over several months, not one month, and at the number of losing months in a row. A return that comes with a large drawdown is worth less than the same return with a small one. Taxes and charges reduce the net figure, so compute both gross and net.',
      eg: {
        title: 'One month (illustrative)',
        text: 'Weekly results: +3,500, −4,200, +6,100, +2,800. Monthly P&L = 3,500 − 4,200 + 6,100 + 2,800 = +₹8,200, which is 1.64% of ₹5,00,000. Without the single losing week, the other three weeks made ₹12,400; the losing week took away about a third of it.',
      },
      tip: 'Compare months with each other and with the drawdown they needed. One good month proves little.',
      visual: {
        kind: 'bars',
        title: 'Weekly results in a month (illustrative)',
        caption: 'Rupees. Total +8,200.',
        unit: '',
        items: [
          { label: 'Week 1', value: 3500, tone: 'bull' },
          { label: 'Week 2', value: -4200, tone: 'bear' },
          { label: 'Week 3', value: 6100, tone: 'bull' },
          { label: 'Week 4', value: 2800, tone: 'bull' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 500000, end: 508200, years: 1 },
        why: 'Monthly P&L as a percentage of capital (1.64%).',
      },
    },
    {
      t: 4,
      def: 'Win rate is the share of trades that closed with a profit. It is wins divided by total trades. A high win rate is not the same as profitability, because it ignores how big wins and losses are.',
      hi: 'Win rate woh hissa hai jo trades profit mein band hue. Yeh wins ko total trades se divide karke nikalta hai. Zyada win rate ka matlab zaroori nahi ki profit hai, kyunki yeh nahi dekhta ki jeet aur haar kitni badi thi.',
      how: 'Count winning trades and divide by all closed trades. Decide before you start what counts as a win (net of costs is best) and keep it fixed. Win rate must be read with the average win and average loss. Strategies that sell options often have a high win rate and small wins but occasional large losses. Trend-following buyers often have a lower win rate and larger wins.',
      eg: {
        title: 'Win rate (illustrative)',
        text: '9 wins in 20 trades gives 45%. The breakeven win rate for an average win of ₹3,200 and an average loss of ₹1,500 is 31.9%, so 45% is comfortably above it. If the average win were only ₹1,500 against a loss of ₹1,500, breakeven would be 50% and 45% would lose money.',
      },
      tip: 'Never quote win rate alone. Always quote it with the average win and average loss.',
      visual: {
        kind: 'matrix',
        title: 'Win rate and payoff together',
        caption: 'Both axes decide profitability.',
        xLabels: ['Small average win', 'Large average win'],
        yLabels: ['High win rate', 'Low win rate'],
        cells: [
          { head: 'Needs small losses', note: 'Typical of premium selling', tone: 'gold' },
          { head: 'Strong', note: 'Both work for you', tone: 'bull' },
          { head: 'Weak', note: 'Loses money', tone: 'bear' },
          { head: 'Needs big wins', note: 'Typical of trend buying', tone: 'gold' },
        ],
      },
      calc: {
        id: 'risk-reward',
        preset: { winRate: 45, avgWin: 3200, avgLoss: 1500 },
        why: 'Shows the breakeven win rate for these averages.',
      },
    },
    {
      t: 5,
      def: 'Loss rate is the share of trades that closed with a loss. For a strategy with only wins and losses it equals 100% minus the win rate. It shows how often you must be ready to be wrong.',
      hi: 'Loss rate woh hissa hai jo trades loss mein band hue. Agar sirf win ya loss ho toh yeh 100% minus win rate hota hai. Yeh dikhata hai ki aapko kitni baar galat hone ke liye taiyaar rehna hai.',
      how: 'Compute losses divided by total trades and also look at the longest losing streak. A 55% loss rate means that on average more than one trade in two loses, and streaks of five or more losses are normal. Your position size must allow for those streaks. Count break-even trades separately so they do not distort the picture.',
      eg: {
        title: 'Loss rate and losing streaks (illustrative)',
        text: '11 losses in 20 trades is a loss rate of 55%. If each loss costs about 0.3% of capital (₹1,500 of ₹5,00,000), five losses in a row cost about 1.5%, which is acceptable. If each loss cost 3% of capital, five in a row would cost nearly 14%.',
      },
      tip: 'Ask not only how often you lose but how many losses in a row your sizing can survive.',
      visual: {
        kind: 'bars',
        title: 'Outcome split in 20 trades (illustrative)',
        caption: 'Number of trades.',
        unit: '',
        items: [
          { label: 'Wins', value: 9, tone: 'bull' },
          { label: 'Losses', value: 11, tone: 'bear' },
        ],
      },
      calc: {
        id: 'drawdown-recovery',
        preset: { drawdownPct: 14 },
        why: 'A 14% drawdown (five 3% losses compounded about) needs about a 16% gain to recover.',
      },
    },
    {
      t: 6,
      def: 'Profit factor is gross profit divided by gross loss. A value above 1 means winners outweigh losers in rupees. It is one number that combines win rate and payoff size.',
      hi: 'Profit factor gross profit ko gross loss se divide karke nikalta hai. 1 se upar ka matlab hai ki rupaye mein jeet haar se zyada hai. Yeh ek number hai jo win rate aur payoff size dono ko milata hai.',
      how: 'Add all winning trades and all losing trades (as a positive number) and divide. A value of 1.0 is breakeven before costs, and costs usually push real results lower. Very high values from a small sample are unreliable because a single large win can lift it. Read it together with the number of trades and with drawdown.',
      eg: {
        title: 'Profit factor (illustrative)',
        text: 'Gross profit ₹28,800, gross loss ₹16,500. Profit factor = 28,800 ÷ 16,500 = 1.75. If total charges were ₹3,000, net profit would be ₹9,300, and counting the charges as part of gross loss would give 28,800 ÷ 19,500 = 1.48.',
      },
      tip: 'Compute it after costs. A profit factor of 1.1 before costs can be below 1 after.',
      visual: {
        kind: 'bars',
        title: 'Gross profit vs gross loss (illustrative)',
        caption: 'Rupees. Ratio = 1.75.',
        unit: '',
        items: [
          { label: 'Gross profit', value: 28800, tone: 'bull' },
          { label: 'Gross loss', value: 16500, tone: 'bear' },
        ],
      },
    },
    {
      t: 7,
      def: 'Expectancy is the average amount you can expect to make or lose per trade, based on your history. It combines win rate, average win and average loss. A positive expectancy over a large sample suggests an edge, though not a promise.',
      hi: 'Expectancy woh average amount hai jo aapko apni history ke hisaab se har trade par milne ya jaane ki ummeed hai. Isme win rate, average win aur average loss teeno aate hain. Bade sample par positive expectancy edge ka sanket hai, gaarantee nahi.',
      how: 'Expectancy = win rate × average win − loss rate × average loss. Multiply by the number of trades to project a result, with the warning that the future may differ. Check it with enough trades, ideally many dozens, and across different market phases. Costs reduce it, so use net figures. It can also be expressed in R, the multiple of the amount you risked.',
      eg: {
        title: 'Expectancy (illustrative)',
        text: '0.45 × 3,200 − 0.55 × 1,500 = 1,440 − 825 = ₹615 per trade. Over 20 trades that is ₹12,300, the actual total. If the average cost were ₹150 per trade, net expectancy would be ₹465. With a ₹1,500 average risk, expectancy is about 0.41R.',
      },
      tip: 'Positive expectancy from 20 trades is a hypothesis. Keep collecting data before raising size.',
      visual: {
        kind: 'flow',
        title: 'How expectancy is built',
        caption: 'Illustrative sample.',
        steps: [
          { label: 'Wins', note: '45% × 3,200 = 1,440', tone: 'bull' },
          { label: 'Losses', note: '55% × 1,500 = 825', tone: 'bear' },
          { label: 'Expectancy', note: '1,440 − 825 = 615', tone: 'gold' },
        ],
      },
      calc: {
        id: 'risk-reward',
        preset: { winRate: 45, avgWin: 3200, avgLoss: 1500 },
        why: 'Calculates the expectancy of this sample.',
      },
    },
    {
      t: 8,
      def: 'Maximum drawdown is the largest fall of your account from a peak to a later low. It shows the worst stretch you actually lived through, and a rough guide to what to expect again.',
      hi: 'Maximum drawdown aapke account ka sabse bada gira hua hissa hai, ek peak se baad ke low tak. Yeh dikhata hai ki aapne sabse kharab daur kaisa jhela, aur aage kya ho sakta hai uska ek andaza deta hai.',
      how: 'Track the running peak of the equity curve and subtract the current value. The largest fall, in rupees and in percent, is the maximum drawdown. Recovering needs a bigger percentage gain than the fall: a 20% fall needs a 25% gain. The future worst drawdown is usually larger than the past one, so keep sizing conservative and keep a plan for what you will do when a drawdown crosses a limit, such as reducing size.',
      eg: {
        title: 'Drawdown (illustrative)',
        text: 'Equity rises from ₹5,00,000 to ₹5,60,000 and then falls to ₹5,12,000. Drawdown = 48,000 ÷ 5,60,000 = 8.57%. To reach ₹5,60,000 again it must gain 48,000 ÷ 5,12,000 = 9.38%.',
      },
      tip: 'Set a drawdown limit in advance and decide what you will do when you reach it.',
      visual: { kind: 'curve', title: 'Drawdown', caption: 'Fall from a peak to a later trough.', curve: 'drawdown' },
      calc: {
        id: 'drawdown-recovery',
        preset: { drawdownPct: 8.57 },
        why: 'Gain needed to recover from the 8.57% drawdown.',
      },
    },
    {
      t: 9,
      def: 'Average holding time is how long, on average, a trade stays open. Compare it for winners and losers and for each setup. It shows whether you hold losers too long or cut winners too soon.',
      hi: 'Average holding time batata hai ki ek trade average kitni der khula rehta hai. Ise winners aur losers ke liye aur har setup ke liye compare karo. Isse pata chalta hai ki aap losers ko zyada der rakhte ho ya winners jaldi kaat dete ho.',
      how: 'Record the entry and exit times and compute the average in minutes or hours. For option buyers a long holding time costs theta, so a losing trade held for hours tends to lose more. If losers are held longer than winners, you may be hoping instead of following the stop. Intraday and positional trades should be measured separately.',
      eg: {
        title: 'Holding times (illustrative)',
        text: 'Six trades were held 25, 40, 90, 15, 150 and 80 minutes, 400 in total, so the average is 400 ÷ 6 = 66.7 minutes. If the winners averaged 35 minutes and the losers 110 minutes, the data says losers are held about three times longer, a sign of not cutting losses.',
      },
      tip: 'If your losers last longer than your winners, work on the exit rule first.',
      visual: {
        kind: 'bars',
        title: 'Holding time per trade (illustrative)',
        caption: 'Minutes.',
        unit: ' min',
        items: [
          { label: 'T1', value: 25, tone: 'ice' },
          { label: 'T2', value: 40, tone: 'ice' },
          { label: 'T3', value: 90, tone: 'ice' },
          { label: 'T4', value: 15, tone: 'ice' },
          { label: 'T5', value: 150, tone: 'ice' },
          { label: 'T6', value: 80, tone: 'ice' },
        ],
      },
    },
    {
      t: 10,
      def: 'Setup-wise performance breaks your results down by the setup used, such as breakout, VWAP pullback or reversal. It shows which of your ideas make money and which do not.',
      hi: 'Setup-wise performance aapke results ko setup ke hisaab se todta hai, jaise breakout, VWAP pullback ya reversal. Isse dikhta hai ki aapke kaun se idea paisa banate hain aur kaun se nahi.',
      how: 'Tag every trade with a setup name and group the journal by that tag. For each, compute the number of trades, win rate, total P&L and expectancy. A setup with few trades gives unreliable numbers, so do not act on one with only a handful of trades. A weak setup is a candidate to remove or fix, and a strong one is a candidate to focus on.',
      eg: {
        title: 'Three setups (illustrative)',
        text: 'Breakout: 8 trades, 5 wins, +₹10,400 (₹1,300 per trade). VWAP pullback: 7 trades, 3 wins, +₹4,900 (₹700 per trade). Reversal: 5 trades, 1 win, −₹3,000 (−₹600 per trade). Total = 10,400 + 4,900 − 3,000 = ₹12,300, matching the sample. The reversal setup is the one to examine.',
      },
      tip: 'Do not drop or promote a setup on fewer than about 20 to 30 trades.',
      visual: {
        kind: 'bars',
        title: 'P&L by setup (illustrative)',
        caption: 'Rupees, 20 trades.',
        unit: '',
        items: [
          { label: 'Breakout', value: 10400, tone: 'bull' },
          { label: 'VWAP pullback', value: 4900, tone: 'bull' },
          { label: 'Reversal', value: -3000, tone: 'bear' },
        ],
      },
      calc: {
        id: 'risk-reward',
        preset: { winRate: 20, avgWin: 2000, avgLoss: 1250 },
        why: 'Reversal setup: 1 win in 5 with similar averages shows negative expectancy.',
      },
    },
  ],
  tools: [{ id: 'kelly', preset: { winRate: 45, payoffRatio: 2.13 }, why: 'Test how aggressive sizing could be, with the warning that Kelly is very sensitive to the inputs.' }],
}
export default m
