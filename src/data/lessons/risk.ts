import type { Lesson } from '../lessonTypes'
import { LOT, f, sg } from './util'

const MODEL = 'Illustrative numbers only; not a recommendation. Excludes taxes, brokerage and slippage.'

// 22.1 capital management
const CAP = 500000
const riskPct = 0.01
const riskRs = CAP * riskPct
const stopPts = 40
const lossPerLot = stopPts * LOT
const lots = Math.floor(riskRs / lossPerLot)

export const lesson221: Lesson = {
  moduleId: '22.1',
  summary:
    'Capital management decides how much you can afford to lose before you decide how much you hope to make. It sets the size of each position, the loss you accept in a day, a week and a month, and how much of your capital is tied up as margin. It does not make a losing idea profitable; it keeps one bad run from ending your ability to trade.',
  objectives: [
    'Separate trading capital from money needed for living costs and emergencies.',
    'Distinguish available margin from margin utilisation and explain why high utilisation leaves no room for adverse moves.',
    'Size a position in lots from a fixed risk per trade and a defined stop.',
    'Set and write down maximum daily loss, weekly loss and monthly drawdown limits.',
  ],
  concepts: [
    { term: 'Trading capital', definition: 'Money you can afford to put at risk. It should exclude funds needed for expenses, emergencies and debt. Capital you cannot afford to lose pushes decisions towards fear.' },
    { term: 'Available margin', definition: 'The part of your account balance not currently blocked against open positions. Margin requirements are set by the exchange and your broker and can change with volatility; check your broker’s margin calculator.' },
    { term: 'Margin utilisation', definition: 'The share of capital blocked as margin. A high figure leaves little buffer: an adverse move raises the requirement and can force positions to be closed at a bad time.' },
    { term: 'Capital allocation', definition: 'Dividing capital across strategies and time, and keeping part in reserve. Not every rupee should be deployed at once.' },
    { term: 'Position sizing', definition: 'Choosing how many lots to trade so that the loss if your stop or invalidation level is hit stays inside a fixed limit.' },
    { term: 'Lot sizing', definition: 'Positions are traded in whole lots, so the smallest unit of risk is one lot. If one lot already risks more than your limit, the trade is too big for the account, not the limit too small. Check the current NSE contract specification for the lot size.' },
    { term: 'Risk per trade', definition: 'The maximum loss you accept on one trade, often stated as a small percentage of capital. It is a limit you set, not a forecast.' },
    { term: 'Maximum daily and weekly loss', definition: 'A pre-set loss at which you stop trading for the day or week. It exists to break a spiral of revenge trades.' },
    { term: 'Maximum monthly drawdown', definition: 'The fall from the month’s peak equity at which you reduce size or pause and review. Defined in advance, it removes the decision from an emotional moment.' },
  ],
  formulas: [
    { label: 'Lots from fixed risk', tex: String.raw`\text{Lots}=\left\lfloor \frac{\text{Capital}\times r}{\text{Stop distance (points)}\times\text{Lot size}}\right\rfloor`, note: 'r is risk per trade as a decimal. Round down, never up.' },
    { label: 'Margin utilisation', tex: String.raw`U=\frac{\text{Margin blocked}}{\text{Trading capital}}` },
  ],
  examples: [
    {
      title: 'Sizing a defined-risk trade',
      given: [MODEL, `Trading capital = ${f(CAP)} rupees`, `Risk per trade = ${f(riskPct * 100, 0)}% = ${f(riskRs)} rupees`, `Lot size = ${LOT}; planned stop = ${stopPts} points on the position`],
      steps: [
        `Loss per lot if the stop is hit = ${stopPts} x ${LOT} = ${f(lossPerLot)} rupees.`,
        `Lots = ${f(riskRs)} / ${f(lossPerLot)} = ${f(riskRs / lossPerLot, 2)}, rounded down to ${lots}.`,
        `Worst planned loss = ${lots} x ${f(lossPerLot)} = ${f(lots * lossPerLot)} rupees, inside the ${f(riskRs)} limit.`,
        'A gap through the stop, slippage or a fast market can make the real loss larger than planned.',
      ],
      takeaway: 'Size comes from the loss you accept, not from the profit you want.',
    },
  ],
  scenarios: {
    bullish: { text: 'A run of wins tempts you to raise size. Raising size after gains, without a rule, increases exposure just when luck is most likely to turn.' },
    bearish: { text: 'A losing streak with a fixed risk per trade costs a bounded amount per trade. Without sizing rules, each loss tends to be followed by a larger bet.' },
    sideways: { text: 'Slow markets produce small losses from costs and time decay. Capital rules still matter: many small losses are a drawdown too.' },
  },
  pitfalls: [
    'Using all available margin. Utilisation near the maximum leaves no room for adverse moves.',
    'Sizing up after a loss to "recover". This is how small losses become large ones.',
    'Treating the stop as a guarantee. Gaps and fast markets can fill beyond it.',
    'Mixing living money with trading capital.',
    'Setting limits but not writing them down or not obeying them.',
  ],
  practice: [
    { q: `Capital 3,00,000 rupees, risk 1% per trade, stop 30 points, lot size ${LOT}. How many lots?`, a: `Risk = 3,000. Loss per lot = 30 x ${LOT} = ${f(30 * LOT)}. Lots = ${f(3000 / (30 * LOT), 2)}, rounded down to ${Math.floor(3000 / (30 * LOT))}.` },
    { q: 'Why is margin utilisation of 90% a concern even if no position is losing?', a: 'Margin requirements can rise with volatility or adverse moves, and almost no buffer remains, so you may be forced to reduce positions at unfavourable prices.' },
    { q: 'What problem do maximum daily and weekly loss limits solve?', a: 'They stop a spiral of emotional trades by forcing a pause once a pre-set loss is reached.' },
  ],
  assignment: 'Write a one-page capital plan: trading capital, risk per trade, maximum daily loss, weekly loss, monthly drawdown, maximum margin utilisation and what you will do when each limit is reached.',
  lab: { to: '/risk', label: 'Open the Risk page' },
}

// 22.2 risk-reward
const win = 0.4
const rr = 2
const exp = win * rr - (1 - win) * 1
const winB = 0.7
const rrB = 0.3
const expB = winB * rrB - (1 - winB) * 1

export const lesson222: Lesson = {
  moduleId: '22.2',
  summary:
    'Risk-reward compares what a position can lose with what it can make, and probability of profit tells how often each is expected. Neither number is enough alone: a high win rate with tiny gains and large losses can have negative expectancy. The figures come from a model or from past data and are not promises.',
  objectives: [
    'Compute risk-reward ratio, maximum profit, maximum loss and breakeven for a defined-risk position.',
    'Combine win probability and reward-to-risk into expected return per trade.',
    'Explain why probability of profit and reward-to-risk trade off against each other.',
    'Describe drawdown, recovery factor and risk of ruin in plain terms.',
  ],
  concepts: [
    { term: 'Risk-reward ratio', definition: 'Maximum possible profit divided by maximum possible loss (reward : risk). It is only defined when both are finite.' },
    { term: 'Maximum possible loss and profit', definition: 'For defined-risk structures these are fixed at entry. For naked short options the loss is very large and for long calls the profit is open-ended; state this instead of inventing a number.' },
    { term: 'Breakeven', definition: 'The expiry level where profit and loss are zero. Costs move it further away.' },
    { term: 'Probability of profit', definition: 'A model-based estimate of finishing above breakeven. It depends on the volatility input and assumes a distribution; reality differs.' },
    { term: 'Expected return', definition: 'Probability-weighted average result per trade. Positive expectancy needs honest inputs, and inputs estimated from few trades are unreliable.' },
    { term: 'Reward vs probability', definition: 'Strategies with a high chance of a small gain usually accept a small chance of a large loss, and the reverse. The trade-off is structural, not a flaw to be removed.' },
    { term: 'Drawdown', definition: 'Fall from a peak in account value to a later low.' },
    { term: 'Recovery factor', definition: 'Net profit divided by maximum drawdown. It shows how much return was earned per unit of pain.' },
    { term: 'Risk of ruin', definition: 'The chance of losing so much that you cannot continue. It rises with larger position size, lower win rate and larger losses.' },
  ],
  formulas: [
    { label: 'Risk-reward ratio', tex: String.raw`RR=\frac{\text{Max profit}}{\text{Max loss}}` },
    { label: 'Expected return per trade', tex: String.raw`E=p\,W-(1-p)\,L`, note: 'p = win probability, W = average win, L = average loss (positive number).' },
    { label: 'Break-even win rate', tex: String.raw`p^{\ast}=\frac{L}{W+L}=\frac{1}{1+RR}` },
    { label: 'Recovery of a drawdown', tex: String.raw`\text{Gain needed}=\frac{d}{1-d}`, note: 'A 50% fall needs a 100% gain to recover.' },
  ],
  examples: [
    {
      title: 'Two profiles with the same shape of trade-off',
      given: [MODEL, `A: win rate ${f(win * 100)}%, reward ${rr} per 1 risked`, `B: win rate ${f(winB * 100)}%, reward ${rrB} per 1 risked`],
      steps: [
        `A expectancy = ${win} x ${rr} - ${1 - win} x 1 = ${sg(exp, 2)} per unit risked.`,
        `B expectancy = ${winB} x ${rrB} - ${f(1 - winB, 1)} x 1 = ${sg(expB, 2)} per unit risked.`,
        `Break-even win rates: A needs ${f(100 / (1 + rr), 1)}%, B needs ${f(100 / (1 + rrB), 1)}%.`,
        'B wins often but needs a win rate near 77% just to break even; its edge disappears with a few extra losses.',
      ],
      takeaway: 'A high win rate is not an edge by itself. Judge win rate and reward-to-risk together, after costs.',
    },
    {
      title: 'Drawdown arithmetic',
      given: ['Account falls 20% from its peak'],
      steps: ['Remaining = 80% of peak.', `Gain needed to recover = 0.20 / 0.80 = ${f(25)}%.`, 'A 50% fall needs 100%.'],
      takeaway: 'Losses are harder to recover than they look, so controlling the size of drawdowns matters more than chasing returns.',
    },
  ],
  scenarios: {
    bullish: { text: 'A bull call spread has a fixed maximum loss and gain, so its reward-to-risk can be read at entry. Whether the probability justifies it depends on the volatility estimate.' },
    bearish: { text: 'A short put has a high probability of a small gain and a large possible loss. Reward-to-risk below one is acceptable only with a win rate that holds up after costs.' },
    sideways: { text: 'A flat market favours sellers of time but gives buyers losses to decay. Probability of profit differs sharply between the two even on the same chain.' },
  },
  pitfalls: [
    'Quoting reward-to-risk without probability, or probability without reward-to-risk.',
    'Treating a model probability as a guarantee.',
    'Computing expectancy from a handful of trades.',
    'Ignoring costs, which shift breakevens and lower expectancy.',
    'Sizing up because the ratio looks attractive. Risk of ruin depends on size.',
  ],
  practice: [
    { q: 'Max profit 3,000, max loss 6,000. Reward-to-risk and break-even win rate?', a: `RR = 0.5. Break-even win rate = 1 / 1.5 = ${f(100 / 1.5, 1)}%.` },
    { q: 'Win rate 55%, average win 1,000, average loss 1,200. Expectancy?', a: `0.55 x 1,000 - 0.45 x 1,200 = ${sg(0.55 * 1000 - 0.45 * 1200)} per trade, negative despite a win rate above 50%.` },
    { q: 'Why does a 40% drawdown need more than a 40% gain to recover?', a: 'Gain needed = 0.4 / 0.6 = 66.7%, because the gain applies to a smaller base.' },
  ],
  assignment: 'Pick three strategies from the Strategies page. For each, record max profit, max loss, breakeven and reward-to-risk, then write the win rate each would need to break even before costs.',
  lab: { to: '/strategies', label: 'Open the Strategies page' },
}

// 24.5 strategy performance analysis
export const lesson245: Lesson = {
  moduleId: '24.5',
  summary:
    'Performance analysis turns a list of trades into a handful of numbers: how often you win, how big wins and losses are, how deep the worst fall was and how smooth the ride was. These numbers describe the past sample only. With few trades, or rules tuned to the same data, they say very little about the future.',
  objectives: [
    'Compute win rate, average profit, average loss, profit factor and expectancy from a trade list.',
    'Measure maximum drawdown and consecutive losing streaks.',
    'Explain Sharpe and Sortino ratios and what each penalises.',
    'State why sample size, costs and out-of-sample testing limit every metric.',
  ],
  concepts: [
    { term: 'Win rate', definition: 'Winning trades divided by total trades.' },
    { term: 'Average profit and average loss', definition: 'Mean result of winning trades and of losing trades. Together with win rate they define expectancy.' },
    { term: 'Profit factor', definition: 'Gross profit divided by gross loss. Above 1 means gains exceeded losses in the sample; thin margins disappear with costs.' },
    { term: 'Expectancy', definition: 'Average net result per trade: win rate x average win minus loss rate x average loss.' },
    { term: 'Maximum drawdown', definition: 'The largest peak-to-trough fall in the equity curve. It is the pain test of a strategy.' },
    { term: 'Sharpe ratio', definition: 'Average excess return divided by the standard deviation of returns. It treats upside and downside swings alike.' },
    { term: 'Sortino ratio', definition: 'Like Sharpe but divides by downside deviation only, so upside volatility is not penalised.' },
    { term: 'Risk-reward ratio', definition: 'Average win divided by average loss in the realised trades. Compare it with the planned figure.' },
    { term: 'Consecutive wins and losses', definition: 'The longest runs. A long losing streak is normal for many strategies; can you size and stay disciplined through it?' },
  ],
  formulas: [
    { label: 'Profit factor', tex: String.raw`PF=\frac{\sum \text{wins}}{\left|\sum \text{losses}\right|}` },
    { label: 'Expectancy', tex: String.raw`E=p\,\overline{W}-(1-p)\,\overline{L}` },
    { label: 'Sharpe ratio', tex: String.raw`\text{Sharpe}=\frac{\bar r-r_f}{\sigma}` },
    { label: 'Sortino ratio', tex: String.raw`\text{Sortino}=\frac{\bar r-r_f}{\sigma_{d}}` },
  ],
  examples: [
    {
      title: 'Metrics from ten hypothetical trades',
      given: [MODEL, 'Results in rupees: +2,400, -1,500, +1,800, -1,500, -1,500, +3,000, -1,500, +900, -1,500, +2,100'],
      steps: (() => {
        const t = [2400, -1500, 1800, -1500, -1500, 3000, -1500, 900, -1500, 2100]
        const w = t.filter((x) => x > 0)
        const l = t.filter((x) => x < 0)
        const gp = w.reduce((a, b) => a + b, 0)
        const gl = Math.abs(l.reduce((a, b) => a + b, 0))
        let eq = 0
        let pk = 0
        let dd = 0
        let run = 0
        let maxRun = 0
        for (const x of t) {
          eq += x
          pk = Math.max(pk, eq)
          dd = Math.max(dd, pk - eq)
          run = x < 0 ? run + 1 : 0
          maxRun = Math.max(maxRun, run)
        }
        return [
          `Wins: ${w.length}, losses: ${l.length}; win rate ${f((w.length / t.length) * 100)}%.`,
          `Average win ${f(gp / w.length)}, average loss ${f(gl / l.length)}; realised reward-to-risk ${f(gp / w.length / (gl / l.length), 2)}.`,
          `Profit factor = ${f(gp)} / ${f(gl)} = ${f(gp / gl, 2)}.`,
          `Expectancy = net ${f(gp - gl)} / ${t.length} trades = ${sg((gp - gl) / t.length)} per trade, before costs.`,
          `Maximum drawdown in the sequence = ${f(dd)} rupees; longest losing streak = ${maxRun}.`,
          'Ten trades are far too few to trust any of these figures.',
        ]
      })(),
      takeaway: 'Every metric needs a large sample, costs and out-of-sample confirmation before it means anything.',
    },
  ],
  scenarios: {
    bullish: { text: 'A strategy tuned in a rising market can show a smooth equity curve and a strong Sharpe ratio that fades when conditions change.' },
    bearish: { text: 'In a falling market the same rules can show a deep drawdown. Look at the worst period of the test, not the average.' },
    sideways: { text: 'Sideways periods often produce many small results and rising costs. Check that expectancy survives costs here.' },
  },
  pitfalls: [
    'Reporting results without costs, slippage and taxes.',
    'Drawing conclusions from a small number of trades.',
    'Optimising rules on the whole sample and calling it a result. Hold out data.',
    'Reading Sharpe as safety; it assumes returns are roughly symmetric, which short-option strategies are not.',
    'Hiding the drawdown behind the average.',
  ],
  practice: [
    { q: 'Gross profit 12,000 and gross loss 9,000. Profit factor?', a: `12,000 / 9,000 = ${f(12000 / 9000, 2)}.` },
    { q: 'Why might Sortino be preferred to Sharpe for an option-buying strategy?', a: 'Buying options gives large occasional gains; Sharpe counts that upside variance as risk, whereas Sortino only penalises downside deviation.' },
    { q: 'A backtest shows a 78% win rate. What else must you check?', a: 'Average loss versus average win, expectancy after costs, maximum drawdown, sample size and out-of-sample behaviour.' },
  ],
  assignment: 'Take any trade log (yours or a simulated one of at least 30 trades). Compute win rate, average win and loss, profit factor, expectancy, maximum drawdown and longest losing streak, and write a paragraph on what the sample cannot tell you.',
  lab: { to: '/quant', label: 'Open the Quant page' },
}
