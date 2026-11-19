import type { ModuleLesson } from '../topicLessonTypes'

/* Module 25.1 - Trade Journaling. Illustrative numbers: NIFTY about 24,000, lot 65 (check current NSE contract specification), VIX 14, r 6.5%. */
const m: ModuleLesson = {
  moduleId: '25.1',
  intro: 'A trade journal is a written record of what you did, why you did it and what happened. It turns scattered memories into data you can study, and it is the base for every later review. This module covers what to record for each trade, from entry and exit to the market context at the time.',
  introHi: 'Trade journal ek likhit record hai ki aapne kya kiya, kyun kiya aur nateeja kya raha. Yeh bikhri hui yaadon ko data bana deta hai jise aap padh sakte ho, aur har review ka aadhaar yahi hai. Yeh module batata hai ki har trade ke liye kya likhna hai, entry aur exit se lekar us waqt ke market context tak.',
  steps: {
    concept: 'Memory is selective: we recall the trades we are proud of and forget the sloppy ones. A journal replaces memory with a fixed record made at the time of the trade. It lets you see patterns in your results and your behaviour that are impossible to see trade by trade.',
    conceptHi: 'Yaaddasht selective hoti hai: hum woh trades yaad rakhte hain jin par garv hai aur sloppy trades bhool jate hain. Journal yaaddasht ki jagah trade ke samay banaya gaya tay record rakhta hai. Isse aapko apne results aur behaviour ke pattern dikhte hain jo ek-ek trade dekhne se nahi dikhte.',
    mechanism: 'Use one fixed template and fill it in three moments: before entry (plan and reason), during the trade (changes) and after exit (result and review). Store the same fields every time so rows can be compared. A spreadsheet is enough: one row per trade, columns for the fields, and a folder of screenshots. The value comes from consistency, not from how detailed one entry is.',
    example: {
      title: 'One journal row (illustrative)',
      text: 'Date 11 Nov. Buy 1 lot 24,000 CE, expiry Tuesday, 7 days left. Entry 150, stop 120, target 210. Reason: breakout above the previous day high with rising volume. VIX 14. Exit 195 on a trailing rule. P&L = (195 − 150) × 65 = ₹2,925 before costs. Planned reward was 60 points (₹3,900); actual 45 points. Note: exited early out of fear. The row takes two minutes and later answers whether early exits cost money.',
    },
    chart: {
      kind: 'flow',
      title: 'The journaling loop',
      caption: 'Record, review, then change the rules.',
      steps: [
        { label: 'Plan', note: 'Reason, stop, target', tone: 'ice' },
        { label: 'Trade', note: 'Entry and exit', tone: 'gold' },
        { label: 'Record', note: 'Same fields, same day', tone: 'neutral' },
        { label: 'Review', note: 'Weekly and monthly', tone: 'ice' },
      ],
    },
    optionChain: 'The option chain is part of the context you record: the strike you chose, its premium, bid-ask spread, OI around spot and IV. Take a snapshot of the chain at entry. Later you can check whether a high-OI level held, whether the spread was wide and whether the IV was rich. OI shows where positions exist, not who opened them.',
    psychology: 'Journaling feels like admin, especially after a loss, which is exactly when it matters most. Be honest about feelings: write if you were anxious, bored or chasing. Writing the reason before the trade reduces impulsive entries, because an unclear reason is hard to write down.',
    scenarios: {
      bullish: 'In a trending, profitable stretch, the journal shows which setup produced it and stops you from crediting luck or skill wrongly. Do not stop journaling when things go well.',
      bearish: 'In a losing stretch, the journal separates bad luck from broken rules. Many losses will trace to the same repeated mistake.',
      sideways: 'In a flat period, the journal shows costs, overtrading and trades without a clear reason. It may tell you to trade less.',
    },
    practice: [
      {
        q: 'A journal records 20 trades: 9 wins totalling ₹28,800 and 11 losses totalling ₹16,500. What is the net P&L? What would it look like if only the 9 wins were recorded?',
        a: 'Net = 28,800 − 16,500 = ₹12,300. With only wins recorded it would show ₹28,800, which overstates the real result by ₹16,500.',
      },
      {
        q: 'Entry 150, exit 195, lot 65. What is the gain and the return on premium?',
        a: 'Gain = 45 × 65 = ₹2,925. Return = 45 ÷ 150 = 30%, before costs.',
      },
      {
        q: 'Your plan was entry 150, target 210, stop 120. What was the planned reward-to-risk, and what was it if you exited at 195?',
        a: 'Planned reward = 60, risk = 30, so 2:1. Actual reward = 45 against the same risk 30, so 1.5:1.',
      },
      {
        q: 'VIX is 14 and Nifty is 24,000. What one-day and seven-day one-standard-deviation moves does that imply?',
        a: 'One day: 24,000 × 0.14 × √(1/365) ≈ 176 points. Seven days: 24,000 × 0.14 × √(7/365) ≈ 465 points. This is expected volatility, not direction.',
      },
    ],
    assignment: 'Build a one-row-per-trade sheet with these columns: date, instrument, strike, expiry, entry, exit, quantity, reason in, reason out, VIX, IV, OI note, P&L, screenshot link, mood. Fill it in for your next five trades on the day they happen, including losses, and keep the sheet for the next modules.',
  },
  topics: [
    {
      t: 1,
      def: 'Recording every trade means writing down all your trades, winners and losers, big and small, including practice and paper trades. A journal with gaps cannot be trusted. It is the base for every statistic you will compute later.',
      hi: 'Har trade record karne ka matlab hai ki saare trades likho, jeetne wale aur haarne wale, bade aur chhote. Adhoora journal bharose ke laayak nahi hota. Aage jo bhi statistics nikalenge unka aadhaar yahi hai.',
      how: 'Make journaling part of closing the trade: the position is not finished until its row is filled. Include trades you wish you had not taken, since those teach the most. Missing losers inflates win rate and expectancy and hides the real cost of mistakes. If you use more than one broker account or segment, journal all of them in one place. Time spent is a few minutes per trade.',
      eg: {
        title: 'Why gaps mislead (illustrative)',
        text: 'Over 20 trades you won 9 for ₹28,800 and lost 11 for ₹16,500, so the real net is ₹12,300. If the five worst losses (say ₹9,000 total) were never written down, the journal would show ₹21,300 and a better-looking win rate. Decisions based on that picture, such as raising size, would rest on wrong numbers.',
      },
      tip: 'If it moved your account, it goes in the journal that same day.',
      visual: {
        kind: 'bars',
        title: 'Full journal vs wins-only (illustrative)',
        caption: 'Net result in rupees.',
        unit: '',
        items: [
          { label: 'All 20 trades', value: 12300, tone: 'gold' },
          { label: 'Wins only', value: 28800, tone: 'bull' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 500000, end: 512300, years: 1 },
        why: 'Net result as a percentage of the starting capital of 5,00,000.',
      },
    },
    {
      t: 2,
      def: 'Entry price is the premium (or futures price) at which your order was actually filled. Record the price you planned, the price you got and the market spread at the time. The difference between them is slippage.',
      hi: 'Entry price woh premium (ya futures price) hai jis par aapka order sach mein fill hua. Jo price aapne socha tha, jo mila aur us waqt ka bid-ask spread teeno likho. Inka antar slippage kehlata hai.',
      how: 'Note the bid and ask, the order type and the time. A market order in a thin option can fill far from the last price. If your entries are regularly worse than planned, the journal will show it and you can switch to limit orders or more liquid strikes. Also record the underlying level at entry, so you can later judge the trade by the index move and not only by the premium.',
      eg: {
        title: 'Slippage on entry (illustrative)',
        text: 'The plan was to buy the 24,000 CE at 150. The quote was 152 by 154 and the order filled at 154. Slippage = 4 points × 65 = ₹260 on one lot. If this happens on 20 trades a month it adds up to ₹5,200, before brokerage and taxes.',
      },
      tip: 'Always write both the planned and the actual entry. The gap is your slippage.',
      visual: {
        kind: 'orderBook',
        title: 'Quote at the time of entry (illustrative)',
        caption: 'Planned 150, filled at the ask 154.',
        bids: [[152, 130], [151, 195], [150, 260]],
        asks: [[154, 130], [155, 195], [156, 260]],
      },
      calc: {
        id: 'spread-cost',
        preset: { bid: 152, ask: 154, qty: 1, lotSize: 65 },
        why: 'Shows the rupee cost of crossing the spread for one lot.',
      },
    },
    {
      t: 3,
      def: 'Exit price is the premium at which you closed the position. Record the planned exit (target or stop), the actual exit and whether the exit was by plan. Comparing the two shows how much you gain or lose by not following your own rules.',
      hi: 'Exit price woh premium hai jis par aapne position band ki. Planned exit (target ya stop), asli exit aur kya exit plan ke hisaab se tha, yeh likho. Dono ko compare karne par pata chalta hai ki apne rules na maanne se kitna faayda ya nuksaan hua.',
      how: 'For each trade store the planned target, planned stop, actual exit and the market price a few minutes after exit. Over many trades, an average of actual exit versus planned exit shows whether you cut winners early or let losers run. The same data feeds the later calculation of average win and average loss. Record gross and net (after charges) results separately.',
      eg: {
        title: 'Planned vs actual exit (illustrative)',
        text: 'Entry 150, target 210, actual exit 195. Planned gain = 60 × 65 = ₹3,900. Actual = 45 × 65 = ₹2,925. The difference is ₹975. If this happens on most winners, the average win is lower than the system assumes and the expectancy falls.',
      },
      tip: 'Track the gap between planned and actual exit. It shows discipline problems in rupees.',
      visual: {
        kind: 'bars',
        title: 'Planned vs actual gain per lot (illustrative)',
        caption: 'Rupees.',
        unit: '',
        items: [
          { label: 'Planned (exit 210)', value: 3900, tone: 'ice' },
          { label: 'Actual (exit 195)', value: 2925, tone: 'gold' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 150, end: 195, years: 1 },
        why: 'Return on the premium from entry 150 to exit 195.',
      },
    },
    {
      t: 4,
      def: 'Strike and expiry identify exactly which contract you traded: the underlying, call or put, the strike price and the expiry date. Also note how far the strike was from spot and how many days were left.',
      hi: 'Strike aur expiry batate hain ki aapne bilkul kaun sa contract trade kiya: underlying, CE ya PE, strike price aur expiry date. Yeh bhi likho ki strike spot se kitna door tha aur kitne din bache the.',
      how: 'The same view can be traded with many strikes and expiries, and results differ a lot. Record the strike, the moneyness (ITM, ATM, OTM), the days to expiry and whether it was a weekly or monthly contract. Later you can group trades by distance and by days left and see where you do best. NSE index options are currently scheduled to expire on Tuesdays, but check the contract list when you trade.',
      eg: {
        title: 'Recording the contract (illustrative)',
        text: 'Nifty 24,000 spot, you buy the 24,200 CE with 7 days left. Journal: strike 24,200, OTM by 200 points (0.83%), 7 days, weekly. Premium paid is lower than ATM, but breakeven is 24,200 plus the premium. Months later you can compare the results of strikes 0 to 100 points out with strikes 200 or more out.',
      },
      tip: 'Add two derived columns: points from spot and days left. They are what you will actually analyse.',
      visual: {
        kind: 'ladder',
        title: 'Strike vs spot 24,000',
        caption: 'Record where your strike sat.',
        optType: 'CE',
        spot: 24000,
        strikes: [23800, 24000, 24200, 24400],
      },
      calc: {
        id: 'moneyness',
        preset: { optType: 'CE', spot: 24000, strike: 24200 },
        why: 'Gives the moneyness and the percentage distance to record.',
      },
    },
    {
      t: 5,
      def: 'Entry reason is the specific condition that made you take the trade. It should be a rule or a setup you can name, such as "breakout above previous day high with volume", and not a feeling such as "looked strong".',
      hi: 'Entry reason woh khaas condition hai jisne aapko trade lene par majboor kiya. Yeh koi rule ya setup hona chahiye jiska naam liya ja sake, jaise "pichle din ke high ke upar breakout with volume", na ki "strong lag raha tha".',
      how: 'Write the reason before you place the order. Use a fixed list of setup names, so trades can be grouped later. Add the checklist items that were true: trend direction, level, volume, VIX and OI context, and the stop and target. If you cannot fill the reason in a sentence, the trade is probably an impulse. The reason column is what lets you measure each setup separately later.',
      eg: {
        title: 'A usable reason (illustrative)',
        text: 'Setup: opening-range breakout. Conditions: Nifty above the first 30-minute high of 24,050, volume above average, VIX flat at 14, no major event today. Stop: below 24,010. Target: 24,150. Compare with the unusable reason "feels like it will go up", which cannot be tested or repeated.',
      },
      tip: 'Name the setup. A setup with no name cannot be measured.',
      visual: {
        kind: 'candles',
        title: 'Breakout reason',
        caption: 'The condition you write down should be visible on the chart.',
        pattern: 'breakout',
        level: { price: 24050, label: 'Opening range high' },
      },
    },
    {
      t: 6,
      def: 'Exit reason records why you closed: target hit, stop hit, time limit, trailing stop, rule change, news or fear. It separates planned exits from emotional ones and lets you count each type.',
      hi: 'Exit reason batata hai ki aapne position kyun band ki: target hit, stop hit, time limit, trailing stop, news ya darr. Isse planned aur emotional exits alag dikhte hain aur har type ginna aasan hota hai.',
      how: 'Use a short list of exit codes, such as T (target), S (stop), TM (time), TR (trailing), D (discretionary, not in plan). Review the totals monthly. A high count of D exits means you are overriding the plan. Compare the average result of each code: if discretionary exits lose more than planned ones, the data says to follow the rule.',
      eg: {
        title: 'Counting exit reasons (illustrative)',
        text: 'Of 20 trades, exits were: target 6, stop 8, time 3, discretionary 3. The 3 discretionary exits lost ₹4,200 in total (average ₹1,400), while the 8 stops lost an average of ₹1,100. The data suggests that unplanned exits cost more than the stops you set.',
      },
      tip: 'If you cannot name the exit reason from your own list, the exit was probably emotional.',
      visual: {
        kind: 'bars',
        title: 'Exit reasons in 20 trades (illustrative)',
        caption: 'Number of trades.',
        unit: '',
        items: [
          { label: 'Target', value: 6, tone: 'bull' },
          { label: 'Stop', value: 8, tone: 'bear' },
          { label: 'Time', value: 3, tone: 'ice' },
          { label: 'Discretionary', value: 3, tone: 'gold' },
        ],
      },
    },
    {
      t: 7,
      def: 'An OI snapshot records the open interest around spot at the time you entered, for example the strikes with the most call and put OI and the put-call ratio (PCR). It captures the context. Open interest shows how many contracts are open, but it cannot say who opened them.',
      hi: 'OI snapshot mein entry ke waqt spot ke aas-paas ka open interest likha jata hai, jaise sabse zyada call aur put OI wale strikes aur PCR. Yeh context pakadta hai. Open interest batata hai kitne contracts khule hain, par yeh nahi batata ki kisne khole.',
      how: 'Take a screenshot or note of the top call-OI and put-OI strikes, any large change since the previous day and the PCR. High OI at a strike is a possible reference level, not a guaranteed support or resistance. Reviewing these notes later shows how often the OI levels mattered for your trades. Also note that OI is not order-flow data and cannot confirm who is buying or selling.',
      eg: {
        title: 'OI note (illustrative)',
        text: 'Spot 24,000. Highest call OI at 24,200 (90 lakh, up from 60 lakh, a rise of 30 lakh or 50%). Highest put OI at 23,800 (80 lakh). Total put OI 135 lakh against total call OI 150 lakh gives PCR = 135 ÷ 150 = 0.90. Note only the facts; do not write "writers are bullish", since OI alone cannot show who opened the position.',
      },
      tip: 'Record the numbers and levels, not conclusions about who is buying or selling.',
      visual: {
        kind: 'oi',
        title: 'OI snapshot (illustrative, lakh contracts)',
        caption: 'Call OI in red, put OI in green.',
        spot: 24000,
        rows: [
          { strike: 23800, ce: 20, pe: 80 },
          { strike: 24000, ce: 55, pe: 60 },
          { strike: 24200, ce: 90, pe: 25 },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 13500000, callOI: 15000000, putVol: 0, callVol: 0 },
        why: 'PCR from total put and call OI.',
      },
    },
    {
      t: 8,
      def: 'A VIX snapshot records India VIX when you entered. India VIX is the market\'s expectation of NIFTY volatility over the next 30 days, computed from option prices. It says how large the moves may be, not which way.',
      hi: 'VIX snapshot mein entry ke waqt India VIX likha jata hai. India VIX agle 30 dinon ke NIFTY volatility ki market ki ummeed hai, jo option prices se nikalti hai. Yeh batata hai ki move kitna bada ho sakta hai, kis disha mein, yeh nahi.',
      how: 'Record the VIX level and whether it was rising or falling that day. High VIX means options are more expensive, which helps sellers and hurts buyers on price, and a fall in VIX hurts the buyer. Over time you can check whether your results differ by VIX range. The VIX also lets you convert to an expected move: spot × VIX × square root of days over 365.',
      eg: {
        title: 'VIX note and expected move (illustrative)',
        text: 'VIX 14, Nifty 24,000. Expected one-standard-deviation move over 7 days = 24,000 × 0.14 × √(7/365) ≈ 465 points, so about 23,535 to 24,465. If the VIX were 20, the range would be about ±665. Your journal then shows whether your stops were wider or tighter than normal daily noise.',
      },
      tip: 'VIX is volatility, not direction. Record it as context, not as a signal.',
      visual: {
        kind: 'gauge',
        title: 'India VIX at entry (illustrative)',
        caption: 'Zones are rough guides, not rules.',
        min: 8,
        max: 35,
        value: 14,
        zones: [
          { from: 8, to: 13, label: 'Low', tone: 'ice' },
          { from: 13, to: 20, label: 'Normal', tone: 'gold' },
          { from: 20, to: 35, label: 'High', tone: 'bear' },
        ],
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 14, days: 7 },
        why: 'Converts the VIX snapshot to an expected range.',
      },
    },
    {
      t: 9,
      def: 'IV and Greeks are the option\'s implied volatility and its sensitivities at entry: delta (price change per index point), gamma (change in delta), theta (daily time decay) and vega (change per 1% IV). Recording them shows what risk you actually took.',
      hi: 'IV aur Greeks entry ke waqt option ki implied volatility aur uski sensitivities hain: delta (index ke ek point par price change), gamma (delta ka change), theta (roz ka time decay) aur vega (1% IV par change). Inhe likhne se pata chalta hai ki aapne asal mein kaun sa risk liya.',
      how: 'Copy them from your broker platform or from a calculator at the time of entry. Two trades with the same strike can carry very different risk if one has 1 day left and the other 7. Over time you can see, for example, whether your losses come mainly from high-theta entries. Keep the numbers as given; they are model estimates, not facts.',
      eg: {
        title: 'Greeks note (illustrative)',
        text: 'Buy the 24,000 CE with 7 days left at IV 14%: price 200.8, delta about 0.53, so a 10-point rise adds roughly 5.3 points (₹344 per lot). Theta is a loss of roughly 15 to 17 points a day in this example (roughly ₹1,000 per lot). Writing this beside the trade makes clear that the position needs a move soon.',
      },
      tip: 'Delta and theta are the two numbers to record every time. They tell you how much move you need and how fast time works against you.',
      visual: {
        kind: 'matrix',
        title: 'What to record about the Greeks',
        caption: 'Four numbers, one line each.',
        xLabels: ['Direction', 'Time and volatility'],
        yLabels: ['First order', 'Second order'],
        cells: [
          { head: 'Delta', note: 'Points per index point', tone: 'ice' },
          { head: 'Theta / Vega', note: 'Daily decay, IV change', tone: 'gold' },
          { head: 'Gamma', note: 'Speed of delta', tone: 'neutral' },
          { head: 'IV', note: 'Price of uncertainty', tone: 'neutral' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 },
        why: 'Fills in the Greeks for the journal row.',
      },
    },
    {
      t: 10,
      def: 'Screenshot documentation means saving a picture of the chart and option chain at entry and at exit. The picture preserves what you saw at the time, which memory and later charts cannot.',
      hi: 'Screenshot documentation ka matlab hai entry aur exit par chart aur option chain ki tasveer save karna. Yeh wahi dikhati hai jo aapne us waqt dekha tha, jo yaaddasht aur baad ke chart nahi dikha sakte.',
      how: 'Take one screenshot at entry (chart with levels, option chain with OI, the order ticket) and one at exit. Name files with the date and trade number so each journal row links to its pictures. Charts redraw and indicators change after the fact, so a later look at the same chart can mislead you about what was visible. Do not post screenshots that show account details.',
      eg: {
        title: 'A screenshot routine (illustrative)',
        text: 'At entry: 5-minute chart with the breakout level marked, option chain around spot, order confirmation. At exit: same chart with the exit marked. Name: 2026-11-11_T07_entry.png and _exit.png. In a monthly review, 20 trades need 40 pictures, about 15 minutes to go through, and you can see for each one whether the setup looked as you described it.',
      },
      tip: 'Take the screenshot before you place the order. After the move, you will remember a cleaner chart than the one you had.',
      visual: {
        kind: 'flow',
        title: 'Screenshot routine',
        caption: 'Two pictures per trade, linked to the row.',
        steps: [
          { label: 'Entry shot', note: 'Chart, chain, ticket', tone: 'ice' },
          { label: 'Trade', note: 'Plan runs', tone: 'gold' },
          { label: 'Exit shot', note: 'Chart with exit', tone: 'ice' },
          { label: 'Link', note: 'Filename in the row', tone: 'neutral' },
        ],
      },
    },
  ],
  tools: [{ id: 'risk-reward', preset: { winRate: 45, avgWin: 3200, avgLoss: 1500 }, why: 'Once the journal has data, test your win rate and averages here.' }],
}
export default m
