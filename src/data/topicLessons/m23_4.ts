import type { ModuleLesson } from '../topicLessonTypes'

/* Module 23.4 - Developing a Trader's Mindset.
 * All numbers illustrative: NIFTY about 24,000, lot 65 (check the current NSE contract specification). */
const m: ModuleLesson = {
  moduleId: '23.4',
  intro: `Good analysis is wasted if emotion overrides it at the moment of execution. This module covers the habits that separate a process from a gamble: thinking in probabilities, planning for scenarios, accepting small losses and following written rules. Nothing here makes trading safe; it helps you manage how you behave when the outcome is uncertain.`,
  introHi: `Achha analysis bekaar ho jaata hai agar execution ke waqt emotion usse override kar de. Is module mein aap probability mein sochna, scenarios ki planning, chhote losses accept karna aur likhe hue rules follow karna seekhoge. Isse trading safe nahi ho jaati, lekin yeh aapko uncertain outcome mein apna behaviour sambhalne mein madad karta hai.`,
  steps: {
    concept: `A trader's mindset is a set of habits applied before, during and after each trade. You cannot control whether a single trade wins, but you can control the size of the risk, the quality of the entry and whether you follow your plan. Over many trades, these controllable parts determine the result more than any single call.`,
    conceptHi: `Trader mindset matlab har trade se pehle, dauran aur baad mein apnaye jaane wali aadatein. Ek trade jeetega ya haarega yeh aap control nahi kar sakte, lekin risk ka size, entry ki quality aur plan follow karna aap control kar sakte ho. Bahut saare trades mein yahi controllable cheezein kisi ek call se zyada result decide karti hain.`,
    mechanism: `The mindset works through rules. Before the trade you fix the setup, entry, stop-loss, target and size. During the trade you only act on those rules. After the trade you record the outcome and review whether you followed the process. The rules take the decision out of the emotional moment, which is when most errors happen.`,
    example: {
      title: 'Same setup, ten trades (illustrative)',
      text: `A setup wins 4 times in 10 and each winner makes ₹3,000 while each loser costs ₹1,500. Expectancy per trade = 0.4 × 3,000 − 0.6 × 1,500 = 1,200 − 900 = ₹300. Over 10 trades the expected gain is about ₹3,000, but a run of 5 losses (−₹7,500) can occur by chance. A trader who abandons the setup after 5 losses never collects the expected edge, if the edge is real.`,
    },
    chart: {
      kind: 'flow',
      title: 'A process loop',
      caption: 'The loop repeats on every trade. The outcome feeds the review, not the next emotion.',
      steps: [
        { label: 'Plan: setup, size, stop, target', tone: 'ice' },
        { label: 'Execute only what the plan says', tone: 'gold' },
        { label: 'Record the trade and the reason', tone: 'ice' },
        { label: 'Review the process, not just the P&L', tone: 'gold' },
      ],
    },
    optionChain: `The chain does not create the mindset, but it tests it. Wide bid-ask spreads tempt you to chase, cheap far-OTM premiums tempt you to gamble, and a sudden OI change tempts you to abandon your plan. Decide your strike, size and exit before you open the chain so that the chain informs the plan instead of replacing it.`,
    psychology: `The mind dislikes certain losses and loves the idea of recovering them quickly, which leads to oversized trades after a loss. Winning streaks produce overconfidence and larger positions. The practical remedy is a written rule that holds in both cases, such as a fixed percentage risk per trade and a daily loss limit.`,
    scenarios: {
      bullish: `A strong rally makes late entries feel urgent. Process answer: wait for your setup or skip. A missed move is not a loss; a chased entry with no stop can be.`,
      bearish: `A sharp fall brings fear and the urge to flip direction. Process answer: follow the stop, accept the loss and look only for a valid setup.`,
      sideways: `A quiet range tests patience. Process answer: trade less, not more. Overtrading in a range often costs more in charges and slippage than it earns.`,
    },
    practice: [
      {
        q: `A setup wins 45 percent of the time with an average win of ₹4,000 and an average loss of ₹2,500. What is the expectancy per trade?`,
        a: `Expectancy = 0.45 × 4,000 − 0.55 × 2,500 = 1,800 − 1,375 = ₹425 per trade. It is positive but small, and charges and slippage must be subtracted before judging it.`,
      },
      {
        q: `An account falls 30 percent. What gain is needed to get back to the starting value?`,
        a: `Remaining = 70 percent of the start. Gain needed = 100 / 70 − 1 = 42.86 percent. Losses are harder to recover than they are to take, so protecting capital matters.`,
      },
      {
        q: `Capital is ₹5,00,000 and you risk 1 percent per trade. You buy a call at ₹120 with a stop at ₹90 (lot 65). How many lots?`,
        a: `Risk budget = 1 percent of 5,00,000 = ₹5,000. Risk per lot = (120 − 90) × 65 = ₹1,950. Lots = 5,000 / 1,950 = 2.56, so trade 2 lots (maximum risk ₹3,900). Round down, never up.`,
      },
      {
        q: `A trade has a reward of twice the risk. What win rate is needed to break even, ignoring costs?`,
        a: `Breakeven win rate = risk / (risk + reward) = 1 / (1 + 2) = 33.3 percent. Above this, the strategy has a positive expectancy in theory; real costs raise the bar.`,
      },
    ],
    assignment: `Write a one-page trading plan with five lines: your setup, entry trigger, stop-loss rule, profit rule and maximum risk per trade and per day in rupees. Keep it beside your screen for one week and tick each trade as "followed" or "broke the rule".`,
  },
  topics: [
    {
      t: 1,
      def: `Probability-based thinking means judging a trade by the chance of each outcome and the size of each win and loss, not by whether it will work this time. A strategy is good if its average result over many trades is positive after costs.`,
      hi: `Probability-based thinking ka matlab hai trade ko is nazariye se dekhna ki har outcome ka chance kitna hai aur jeet ya haar kitni badi hai, yeh nahi ki is baar chalega ya nahi. Strategy tab achhi hai jab bahut saare trades ka average result costs ke baad positive ho.`,
      how: `You estimate the win rate from past data and the average win and loss from your trades or a backtest. Expectancy combines them: win rate × average win − loss rate × average loss. A low win rate can still be profitable if winners are large, and a high win rate can lose money if one loss wipes out many wins. Small samples mislead, so estimates should be treated as ranges, not exact numbers.`,
      eg: {
        title: 'Expectancy of a 40 percent setup',
        text: `Win rate 40 percent, average win ₹3,000, average loss ₹1,500. Expectancy = 0.4 × 3,000 − 0.6 × 1,500 = ₹300 per trade. The reward-to-risk is 2 and the breakeven win rate is 33.3 percent, so the setup is above breakeven in this illustration.`,
      },
      tip: `Never judge a strategy on three trades. Ask how many trades the numbers are based on.`,
      visual: {
        kind: 'bars',
        title: 'Expectancy built from parts (₹ per trade)',
        unit: '',
        items: [
          { label: 'Average win × 40%', value: 1200, tone: 'bull' },
          { label: 'Average loss × 60%', value: 900, tone: 'bear' },
          { label: 'Expectancy', value: 300, tone: 'gold' },
        ],
      },
      calc: { id: 'risk-reward', preset: { winRate: 40, avgWin: 3000, avgLoss: 1500 }, why: 'Shows breakeven win rate and expectancy for the setup.' },
    },
    {
      t: 2,
      def: `Thinking in scenarios means writing down what you will do if price goes up, down or sideways before you enter. It replaces a single prediction with a plan for several outcomes.`,
      hi: `Scenarios mein sochne ka matlab hai entry se pehle likhna ki price upar, neeche ya sideways jaaye toh aap kya karoge. Isse ek hi prediction ki jagah kai outcomes ka plan ban jaata hai.`,
      how: `For each trade, you write the three scenarios, a rough probability for each and the result of the position in each. Multiply and add to get an expected value. If the expected value is negative or the worst case is larger than your limit, you skip or change the trade. The probabilities are your estimates, so the output is a thinking tool, not a forecast.`,
      eg: {
        title: 'A long call with three scenarios',
        text: `Buy a call at ₹50 (cost 50 × 65 = ₹3,250). Scenarios: rally 30 percent chance, net +100 points = +₹6,500; sideways 40 percent, loses all = −₹3,250; fall 30 percent, loses all = −₹3,250. Expected value = 0.3 × 6,500 − 0.4 × 3,250 − 0.3 × 3,250 = 1,950 − 1,300 − 975 = −₹325. With these guesses the trade is not worth taking.`,
      },
      tip: `If you cannot name what you will do in the sideways case, you do not yet have a plan.`,
      visual: {
        kind: 'matrix',
        title: 'Scenario planning grid',
        xLabels: ['Price goes my way', 'Price goes against me'],
        yLabels: ['Fast', 'Slow'],
        cells: [
          { head: 'Trail or book part', note: 'follow the exit rule', tone: 'bull' },
          { head: 'Stop hits', note: 'accept the loss', tone: 'bear' },
          { head: 'Hold to target', note: 'watch time decay', tone: 'gold' },
          { head: 'Time exit', note: 'exit before decay', tone: 'ice' },
        ],
      },
    },
    {
      t: 3,
      def: `Accepting losses means treating a small, planned loss as a normal business cost of trading and exiting at the stop without negotiating. Losses are unavoidable, so the aim is to keep them small and controlled.`,
      hi: `Losses accept karne ka matlab hai chhote, planned loss ko trading ka normal kharcha maanna aur stop par bina bahas ke exit karna. Loss avoidable nahi hai, isliye maqsad unhe chhota aur control mein rakhna hai.`,
      how: `A loss is mathematically harder to recover than it is to take: a 10 percent loss needs 11.1 percent to recover, a 20 percent loss needs 25 percent and a 50 percent loss needs 100 percent. That is why the stop-loss is decided before entry, with a size that keeps each loss to a small fraction of capital. Moving a stop further away after entry breaks the plan.`,
      eg: {
        title: 'Recovery arithmetic',
        text: `Starting capital ₹5,00,000. After a 20 percent drawdown it is ₹4,00,000. To get back to ₹5,00,000 you need 1,00,000 / 4,00,000 = 25 percent. After a 50 percent drawdown the capital is ₹2,50,000 and you need a 100 percent gain.`,
      },
      tip: `A loss within your plan is a success of process. A loss that exceeds your plan is the real failure.`,
      visual: {
        kind: 'curve',
        title: 'Gain needed to recover a drawdown',
        curve: 'drawdown',
      },
      calc: { id: 'drawdown-recovery', preset: { drawdownPct: 20 }, why: 'Shows the gain required to recover from a given drawdown.' },
    },
    {
      t: 4,
      def: `Prediction bias is the habit of fixing a belief about direction and then only noticing evidence that supports it. It is also the belief that you must be right about the next move to make money.`,
      hi: `Prediction bias ka matlab hai direction ke baare mein ek raay bana lena aur phir sirf wahi evidence dekhna jo us raay ko support kare. Yeh bhi ek galatfehmi hai ki paisa kamane ke liye agle move ka sahi andaza lagana zaroori hai.`,
      how: `Confirmation bias makes a bullish trader read every OI change as support. The fix is to write down what would prove you wrong before entering and to track a trigger rather than an opinion. Rules such as "enter on a close above 24,150, exit below 24,050" do not need a prediction, only a response.`,
      eg: {
        title: 'Opinion versus rule',
        text: `A trader feels NIFTY will rise above 24,150 and buys at 24,080 early. A rule-based trader waits for the close above 24,150 and risks the stop at 24,050. If price falls to 24,000, the first trader loses 80 points, which is 80 × 65 = ₹5,200 per lot, while the second never enters.`,
      },
      tip: `Write the line that proves you wrong before you click buy. If you cannot name it, do not enter.`,
      visual: {
        kind: 'compare',
        title: 'Prediction versus rule',
        left: { head: 'Prediction', tone: 'gold', points: ['Needs you to be right', 'Enters early on opinion', 'Stop is flexible'] },
        right: { head: 'Rule', tone: 'ice', points: ['Needs a trigger to occur', 'Enters on confirmation', 'Stop is fixed in advance'] },
      },
    },
    {
      t: 5,
      def: `A trading plan is a written set of rules covering setup, entry, stop-loss, target, position size and daily limits. Following it means acting the same way each time the same conditions appear.`,
      hi: `Trading plan ek likha hua rulebook hai jisme setup, entry, stop-loss, target, position size aur daily limits hote hain. Ise follow karne ka matlab hai ki jab bhi same conditions aaye, aap same tarah se act karo.`,
      how: `The plan converts risk into lots. Risk per trade is a percentage of capital; the stop distance multiplied by the lot size gives the loss per lot; the number of lots is the budget divided by that loss, rounded down. Put the plan in writing, review it at the weekend and change it only then, not in the middle of a trade.`,
      eg: {
        title: 'Sizing from the plan',
        text: `Capital ₹5,00,000, risk 1 percent = ₹5,000. Buy a call at ₹120 with the stop at ₹90: risk per lot = 30 × 65 = ₹1,950. Lots = 5,000 / 1,950 = 2.56, so trade 2 lots, with a maximum risk of 2 × 1,950 = ₹3,900.`,
      },
      tip: `Change your plan only at the weekend review. Edits during market hours are usually emotions in disguise.`,
      visual: {
        kind: 'flow',
        title: 'From plan to order size',
        steps: [
          { label: 'Capital × risk %', note: '₹5,00,000 × 1% = ₹5,000', tone: 'ice' },
          { label: 'Stop distance × lot size', note: '30 × 65 = ₹1,950', tone: 'ice' },
          { label: 'Budget ÷ risk per lot', note: '2.56, round down to 2', tone: 'gold' },
        ],
      },
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 120, stop: 90, lotSize: 65 }, why: 'Converts a risk percentage into a number of lots.' },
    },
    {
      t: 6,
      def: `A revenge trade is an impulsive trade taken to win back a recent loss, usually larger and with no valid setup. It is driven by anger and the wish to be right, not by the plan.`,
      hi: `Revenge trade woh impulsive trade hai jo kisi haale hue loss ko jaldi wapas jeetne ke liye liya jaata hai, aam taur par bada size aur bina valid setup ke. Isme gussa aur galat sabit na hone ki zid hoti hai, plan nahi.`,
      how: `After a loss, the brain wants quick recovery, so size increases and quality falls. Because losses compound, one revenge trade can turn a small planned loss into a large one. Brokers and exchanges apply risk controls, but they do not protect you from your own sizing, so your own rule must do it: stop for the day after a set number of losses or a set rupee loss.`,
      eg: {
        title: 'The chain of revenge',
        text: `Planned risk is 1 percent of ₹5,00,000 = ₹5,000. After a first loss of ₹5,000, the trader triples size on a poor setup and loses ₹15,000. The day total is ₹20,000, which is 4 percent of capital instead of the planned 1 percent.`,
      },
      tip: `After a loss, walk away for a fixed time, such as 30 minutes. The best revenge is a small, planned loss.`,
      visual: {
        kind: 'timeline',
        title: 'How revenge builds',
        events: [
          { when: '10:05', what: 'Planned loss of ₹5,000', tone: 'gold' },
          { when: '10:20', what: 'Triples size, no setup', tone: 'bear' },
          { when: '10:45', what: 'Loses ₹15,000, total ₹20,000', tone: 'bear' },
          { when: '10:46', what: 'Daily loss limit should have stopped trading', tone: 'ice' },
        ],
      },
    },
    {
      t: 7,
      def: `Consistency means repeating the same process in the same way each time, in wins and in losses. Consistent execution is what makes the results of a strategy measurable.`,
      hi: `Consistency ka matlab hai har baar wahi process ek hi tarah se repeat karna, jeet mein bhi aur haar mein bhi. Consistent execution se hi strategy ke results naap paate hain.`,
      how: `If you vary size, entries and exits from trade to trade, you cannot tell whether the strategy or the variation caused a result. Consistency is not about making the same profit each month. It is about applying the same rules, so that a month of losses can be separated into a bad run or a flawed rule.`,
      eg: {
        title: 'Two traders, same setup',
        text: `Both traders see 20 signals. Trader A takes all 20 with 2 lots each. Trader B skips some after a loss and takes 4 lots after a win. Trader A's results can be compared against the backtest. Trader B's results mix the strategy with mood, so they say nothing reliable about the setup.`,
      },
      tip: `Aim for consistent behaviour, not consistent profit. Profit is an outcome; behaviour is yours to control.`,
      visual: {
        kind: 'compare',
        title: 'Consistent versus erratic',
        left: { head: 'Consistent', tone: 'ice', points: ['Same size by rule', 'Every signal taken', 'Results are measurable'] },
        right: { head: 'Erratic', tone: 'gold', points: ['Size follows mood', 'Skips trades after losses', 'Results cannot be judged'] },
      },
    },
    {
      t: 8,
      def: `Patience in trading means waiting for your setup to appear and waiting for the trade to reach its target, instead of acting out of boredom or fear of missing out.`,
      hi: `Trading mein patience ka matlab hai apne setup ka intezaar karna aur trade ke target tak pahunchne ka wait karna, bore hokar ya chhoot jaane ke dar se action nahi lena.`,
      how: `Most days offer few clean setups. Trading outside them adds brokerage, STT, exchange charges, GST and slippage, which are costs you pay regardless of direction. An option buyer also pays time decay for every hour spent in a range-bound market. Waiting is therefore an active choice that saves money; check the current published charges with your broker.`,
      eg: {
        title: 'Cost of impatience',
        text: `Suppose a trader takes 10 extra low-quality trades a week and each costs about ₹200 in charges and slippage on one lot. The extra cost is 10 × 200 = ₹2,000 a week, or about ₹8,000 a month, before any trading loss. Illustrative figure; use the charges calculator for your own costs.`,
      },
      tip: `If you have been waiting for an hour and have no setup, the correct trade is no trade.`,
      visual: {
        kind: 'candles',
        title: 'Waiting in a range',
        caption: 'The range is where patience is tested. The setup is the breakout, not the waiting.',
        pattern: 'range',
      },
    },
    {
      t: 9,
      def: `Discipline is following your own rules when you do not feel like it. It is the habit of acting on the plan even when emotion, a tip or a news headline pushes you to do something else.`,
      hi: `Discipline ka matlab hai apne rules tab bhi follow karna jab man na kare. Plan par action lena chahe emotion, koi tip ya news headline kuch aur karne ko kahe.`,
      how: `Discipline is easier with hard limits that exist before the heat of the moment: a maximum loss per day, a maximum number of trades, a mandatory stop on every position. Some traders use broker features such as stop-loss orders and daily loss limits; check what your broker supports. A rule that you can overrule easily is a suggestion, not discipline.`,
      eg: {
        title: 'A daily loss limit',
        text: `With capital of ₹5,00,000 and a daily loss limit of 2 percent, the limit is ₹10,000. After two losses of ₹5,000 each, the day is over. The rule forces a stop at ₹10,000 instead of a possible spiral.`,
      },
      tip: `Write rules as numbers, not feelings. "Stop at ₹10,000" works better than "stop if I feel bad".`,
      visual: {
        kind: 'flow',
        title: 'Hard stops of a disciplined day',
        steps: [
          { label: 'Stop-loss on every position', tone: 'bear' },
          { label: 'Max trades per day', tone: 'gold' },
          { label: 'Daily loss limit reached', tone: 'bear' },
          { label: 'Close the platform', tone: 'ice' },
        ],
      },
    },
    {
      t: 10,
      def: `Process-oriented trading means judging yourself on whether you followed the plan, not on whether the trade made money. A good process can still lose on one trade; a bad process can win by luck.`,
      hi: `Process-oriented trading ka matlab hai khud ko is par judge karna ki aapne plan follow kiya ya nahi, is par nahi ki trade se paisa bana ya nahi. Achha process ek trade mein haar sakta hai, aur kharab process kismat se jeet sakta hai.`,
      how: `You record each trade with a tag for the setup and a flag for whether the rules were followed. After a month, you separate the results into "followed plan" and "broke plan". If the first group is profitable and the second is not, the plan works and your discipline needs work. If both lose, the plan needs review.`,
      eg: {
        title: 'Sorting a month of trades',
        text: `Out of 20 trades, 15 followed the plan and made +₹9,000 in total; 5 broke it and made −₹12,000. The plan itself made money. The rule-breaking trades turned the month negative at −₹3,000.`,
      },
      tip: `Give yourself a score for process after each trade, not for profit. Profit follows over time, if the plan has an edge.`,
      visual: {
        kind: 'matrix',
        title: 'Process and outcome',
        xLabels: ['Good outcome', 'Bad outcome'],
        yLabels: ['Good process', 'Poor process'],
        cells: [
          { head: 'Deserved', note: 'repeat it', tone: 'bull' },
          { head: 'Bad luck', note: 'keep the process', tone: 'ice' },
          { head: 'Lucky', note: 'dangerous', tone: 'gold' },
          { head: 'Deserved', note: 'fix the process', tone: 'bear' },
        ],
      },
    },
  ],
}
export default m
