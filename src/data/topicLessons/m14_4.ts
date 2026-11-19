import type { ModuleLesson } from '../topicLessonTypes'

/* Module 14.4 — Buyer Profit and Loss Behaviour.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification), India VIX ≈ 14, r = 6.5%.
 * Option prices are Black-Scholes values (IV as stated, r 6.5%, no dividend) rounded for readability; real premiums differ. */
const m: ModuleLesson = {
  moduleId: '14.4',
  intro: `An option buyer's result is decided less by the entry than by how profits and losses are handled afterwards. This module looks at the buyer's exits (scalping, intraday, positional), tools such as partial booking and trailing stops, and the two silent leaks of buying: time decay and IV crush. It also explains why a buyer can be right about direction and still lose money.`,
  introHi: `Option buyer ka result entry se zyada is baat par depend karta hai ki profit aur loss ko baad mein kaise handle kiya gaya. Is module mein scalping, intraday aur positional exits, partial booking aur trailing stop jaise tools, aur time decay tatha IV crush jaise do chhupe hue leaks samjhaye gaye hain. Yeh bhi dikhega ki direction sahi hone par bhi buyer loss mein kyun reh sakta hai.`,
  steps: {
    concept: `A buyer pays the premium up front, so the worst loss is the premium and the profit is open-ended. The practical question is when to leave. A scalper leaves in minutes for a few points, an intraday trader leaves by the close, a positional buyer holds for days. Each style needs its own exit rules, and each is attacked by theta (time decay) and by changes in implied volatility (IV).`,
    conceptHi: `Buyer pehle premium deta hai, isliye maximum loss premium tak hi hota hai aur profit open-ended hota hai. Asli sawal yeh hai ki nikalna kab hai. Scalper minutes mein kuch points lekar nikalta hai, intraday trader close tak, positional buyer kai din hold karta hai. Har style ko apne exit rules chahiye, aur teeno par theta aur IV ke change ka asar padta hai.`,
    mechanism: `Option value = intrinsic value + time value. As expiry nears, time value shrinks (theta), and the shrinkage speeds up for at-the-money options. When IV falls, for example after an event, time value shrinks even if the index has not moved (IV crush). A long option earns from delta (index moves your way), gamma (delta itself grows as the move continues) and vega (IV rises). It loses from theta and from falling IV. The net of all four decides the exit price.`,
    example: {
      title: 'Same idea, three holding styles (illustrative)',
      text: `NIFTY 24,000. A trader buys one lot (65) of the 24,000 CE at ₹100. Scalper: exits at ₹106 after 4 minutes, a gain of 6 × 65 = ₹390 before costs. Intraday trader: sets stop ₹80 and target ₹140, risking 20 × 65 = ₹1,300 to make 40 × 65 = ₹2,600 (reward to risk 2.0). Positional buyer: buys the 7-day 24,000 CE at about ₹201 instead and holds 2 days; if NIFTY is unchanged it is worth about ₹168 with 5 days left, a loss of 33 × 65 = ₹2,145. The same trade is judged differently by each style, which is why the exit rule must be written before entry.`,
    },
    chart: {
      kind: 'timeline',
      title: 'A winning buy, managed in stages',
      caption: 'Book part of the profit, move the stop to cost, then trail the rest. The numbers are illustrative premiums per unit.',
      events: [
        { when: 'Entry ₹100', what: 'Initial stop ₹80, so risk is ₹20 per unit', tone: 'gold' },
        { when: '₹130', what: 'Book half the position, locking in 30 points on that half', tone: 'bull' },
        { when: 'Stop to ₹100', what: 'The remaining half can no longer lose money (apart from gaps and slippage)', tone: 'ice' },
        { when: '₹170', what: 'Trail the stop to ₹150, 20 below the high', tone: 'bull' },
        { when: 'Exit ₹150', what: 'Stop hit; the remaining half earns 50 points', tone: 'neutral' },
      ],
    },
    optionChain: `On the chain, check three things before booking or holding: the bid-ask spread of your strike (a wide spread eats the profit at exit), the IV shown for that strike compared with its earlier value (a falling IV warns of crush), and the days left to expiry. The chain shows the current price, not your cost. Your P&L lives in your own journal and broker statement, not on the chain.`,
    psychology: `Buyers tend to sell winners too early (fear of giving back profit) and hold losers too long (hope). This is the disposition effect and it produces many small wins and a few large losses. Partial booking and a trailing stop are mechanical answers: they let part of the position satisfy the urge to book while the rest is allowed to run. Overconfidence after a win and revenge after a loss are the other two traps.`,
    scenarios: {
      bullish: `NIFTY trends up through the day. A buyer with a trailing stop captures most of the move; a buyer who exits at the first 10% gain leaves the larger part of it. If the rally is slow, theta may still reduce the gain, so the option can lag the index.`,
      bearish: `NIFTY falls against a call buyer. A written stop limits the loss to a planned amount; without one, hope can take a 25% loss to a 70% loss as the option decays and delta shrinks. A put buyer in the same move may profit, but a bounce plus IV fall can erase a good part of it.`,
      sideways: `Nothing happens and time passes. The option loses value every hour with no index move needed. This is the buyer's most common loss and the reason a time stop (exit if the move has not happened by a set time) belongs in every plan.`,
    },
    practice: [
      {
        q: `Two lots (130 units) are bought at ₹100. One lot is sold at ₹130 and the stop for the other is moved to ₹100. Give the total result if the stop is hit, and if the rest is later sold at ₹190.`,
        a: `Booked part: 30 × 65 = ₹1,950. If the stop is hit at ₹100 the second lot gives 0, total ₹1,950. If the second lot is sold at ₹190 it gives 90 × 65 = ₹5,850, total ₹7,800. Selling both lots at ₹130 would have given 30 × 130 = ₹3,900.`,
      },
      {
        q: `A premium of ₹100 rises to a high of ₹170 and the trailing stop is 20 points below the high. Where is the stop, and what is the profit per lot if it is hit?`,
        a: `Stop = 170 − 20 = ₹150. Profit = (150 − 100) × 65 = ₹3,250 per lot, before costs and slippage.`,
      },
      {
        q: `An ATM option has a theta of about −₹27 per unit per day. What does one day of unchanged price cost one lot, and what does a three-day hold cost if theta stayed constant?`,
        a: `One day: 27 × 65 = ₹1,755. Three days: 3 × 1,755 = ₹5,265. In practice theta rises as expiry nears, so the true figure for an ATM option can be larger.`,
      },
      {
        q: `You bought the 24,200 CE at ₹114. NIFTY expires at 24,280. Was your direction right? What is your P&L for one lot?`,
        a: `Direction was right (up 280 points from 24,000). Intrinsic value = 24,280 − 24,200 = 80. P&L = (80 − 114) × 65 = −₹2,210. Breakeven was 24,200 + 114 = 24,314, which the index never reached.`,
      },
    ],
    assignment: `Take your last ten option-buying trades (or ten imagined ones). For each, write the planned stop, the planned target and the actual exit. Mark which trades ended by plan, by hope or by panic. Then write one rule for partial booking and one rule for a time stop that you will follow next week.`,
  },
  topics: [
    {
      t: 1,
      def: `A scalper buys an option and sells it within minutes for a small gain, often a few percent of the premium. The idea is to take many small, quick profits rather than wait for a big move. Brokerage, charges and the bid-ask spread are a large part of each trade.`,
      hi: `Scalper option buy karke kuch hi minutes mein chhote profit par bech deta hai, aksar premium ka kuch percent. Idea yeh hai ki bade move ka wait karne ke bajaye bahut saare chhote profit lo. Brokerage, charges aur bid-ask spread har trade ka bada hissa kha jaate hain.`,
      how: `Scalpers use liquid ATM or near-ATM strikes of NIFTY or BANKNIFTY because the spread is a rupee or less and orders fill fast. Entries are tied to very short-term levels, such as the previous candle's high, and the exit is a few points away. Because the target is small, the cost of each round trip (brokerage, exchange charges, STT on the sell side, GST) is a meaningful share of the gain. A scalper needs a high win rate or a tight stop, and needs to size small enough that one slip does not erase many wins.`,
      eg: {
        title: 'Ten scalps in one morning (illustrative)',
        text: `Two lots (130 units) at about ₹100. Six scalps win 6 points each (36 points) and four lose 4 points each (16 points). Net = 36 − 16 = 20 points, or 20 × 130 = ₹2,600 before costs. If each round trip costs about ₹90 in total charges, ten trades cost ₹900, so the net is ₹1,700. The average win of 6 and loss of 4 with a 60% win rate gives an expectancy of 0.6 × 6 − 0.4 × 4 = 2 points per trade, and about a third of the gross edge went to costs.`,
      },
      tip: `Scalping profits are small and costs are fixed, so calculate the net edge after charges before you scale up the number of trades.`,
      visual: {
        kind: 'bars',
        title: 'Ten scalps: where the ₹2,600 goes (illustrative)',
        caption: 'Gross profit is cut by charges; a smaller edge can disappear completely.',
        unit: ' ₹',
        items: [
          { label: 'Gross gain (6 wins)', value: 4680, tone: 'bull' },
          { label: 'Gross loss (4 losses)', value: 2080, tone: 'bear' },
          { label: 'Net before costs', value: 2600, tone: 'gold' },
          { label: 'Costs (10 × ₹90)', value: 900, tone: 'neutral' },
          { label: 'Net after costs', value: 1700, tone: 'ice' },
        ],
      },
      calc: { id: 'risk-reward', preset: { winRate: 60, avgWin: 6, avgLoss: 4 }, why: 'Shows the expectancy per scalp in points.' },
    },
    {
      t: 2,
      def: `An intraday option buyer opens and closes the trade on the same day. The exit is decided by a stop, a target or the clock. No position is carried overnight, so overnight gaps do not apply.`,
      hi: `Intraday buyer trade usi din shuru aur khatam karta hai. Exit stop, target ya time se decide hota hai. Raat bhar position carry nahi hoti, isliye overnight gap ka risk nahi rehta.`,
      how: `The intraday buyer usually plans around the day's structure: opening range, previous day's high and low, and key option-chain levels. The stop and target are placed in option premium or in index points, and the position is closed before the broker's auto square-off time. Theta still acts during the day, but it hurts less than on a multi-day hold. Many intraday buyers choose a reward-to-risk of at least 2 so that a win rate below 50% can still be profitable.`,
      eg: {
        title: 'Planned 1 to 2 trade (illustrative)',
        text: `The trader buys one lot of the 24,000 CE at ₹90. Stop ₹70 (risk 20 × 65 = ₹1,300), target ₹130 (reward 40 × 65 = ₹2,600). If the win rate is 40%, expectancy per unit = 0.4 × 40 − 0.6 × 20 = 16 − 12 = +4 points, or 4 × 65 = ₹260 per trade before costs. At a 30% win rate the same plan gives 0.3 × 40 − 0.7 × 20 = 12 − 14 = −2 points, a loss.`,
      },
      tip: `Decide the stop, the target and the latest exit time before you click buy, and write them down.`,
      calc: { id: 'risk-reward', preset: { winRate: 40, avgWin: 40, avgLoss: 20 }, why: 'Reward-to-risk 2 with a 40% win rate.' },
    },
    {
      t: 3,
      def: `A positional buyer holds an option for several days, often waiting for a larger move or an event. Because the holding period is long, time decay and changes in IV matter more than they do intraday. The stop is usually based on index levels rather than on premium alone.`,
      hi: `Positional buyer option ko kai din hold karta hai, aksar bade move ya kisi event ka wait karte hue. Holding lambi hoti hai, isliye time decay aur IV ke change ka asar intraday se zyada padta hai. Stop aksar sirf premium par nahi, index levels par rakha jata hai.`,
      how: `A positional buyer prefers more time to expiry, for example next week's or next month's contract, so that theta per day is smaller. An option with 25 to 30 days left decays slowly at first and faster in the last week. The buyer also needs the move to happen in time: a right view with the wrong timing is a loss. Overnight gaps, news and global markets can move the index before the buyer can react, so the position size should be smaller than for an intraday trade.`,
      eg: {
        title: 'Holding a call for two days (illustrative)',
        text: `NIFTY 24,000. The 24,000 CE with 7 days to expiry is about ₹201 (IV 14%), so one lot costs 201 × 65 = ₹13,065. Two days later NIFTY is 24,150 with 5 days left and the option is about ₹258. Gain = (258 − 201) × 65 = ₹3,705, a return of about 28%. If the index had stayed at 24,000, the option with 5 days left would be about ₹168, a loss of 33 × 65 = ₹2,145 from decay alone.`,
      },
      tip: `Positional buying needs the right direction, the right size of move and the right timing, so size it smaller than an intraday trade.`,
      visual: {
        kind: 'compare',
        title: 'Intraday buyer vs positional buyer',
        left: { head: 'Intraday', tone: 'gold', points: ['No overnight gap risk', 'Theta small within the day', 'Needs fast, clear exits', 'Result known the same day'] },
        right: { head: 'Positional', tone: 'ice', points: ['Gap and news risk overnight', 'Theta accumulates daily', 'Stop usually on index levels', 'Needs the right timing, not only direction'] },
      },
      calc: { id: 'return-calc', preset: { start: 201, end: 258, years: 1 }, why: 'Percentage return from 201 to 258 per unit.' },
    },
    {
      t: 4,
      def: `Partial profit booking means selling part of the position when it is in profit and keeping the rest. It locks some gain and leaves room for a bigger move. It is a middle path between exiting everything early and holding everything.`,
      hi: `Partial profit booking ka matlab hai ki profit mein position ka ek hissa bech do aur baaki rakh lo. Isse kuch gain lock ho jata hai aur bade move ka mauka bhi bacha rehta hai. Yeh sab kuch jaldi bechne aur sab kuch hold karne ke beech ka raasta hai.`,
      how: `You can only book partially if the position is at least two lots, or if you trade in a way that allows splitting. The usual pattern is to sell a portion at the first target, move the stop on the remainder to cost, and trail the rest. It reduces regret in both directions: if the price reverses you have booked something, and if it runs you still participate. The cost is that the total result in a quick one-way move is lower than holding everything. Each exit also pays charges and crosses the spread.`,
      eg: {
        title: 'Booking half at ₹130 (illustrative)',
        text: `Two lots (130 units) bought at ₹100. One lot sold at ₹130 books (130 − 100) × 65 = ₹1,950. The stop on the other lot moves to ₹100. If it is stopped at ₹100 the total is ₹1,950. If it runs to ₹190 the second lot adds 90 × 65 = ₹5,850, for a total of ₹7,800. Selling both at ₹130 would have given ₹3,900; holding both to ₹190 would have given 90 × 130 = ₹11,700.`,
      },
      tip: `Partial booking trades some upside for peace of mind; decide the fraction (for example half) before the trade, not during it.`,
      visual: {
        kind: 'bars',
        title: 'Three ways to exit a two-lot trade (rounded to a ₹ total)',
        caption: 'Entry ₹100 for 130 units. Illustrative.',
        unit: ' ₹',
        items: [
          { label: 'Sell all at ₹130', value: 3900, tone: 'gold' },
          { label: 'Half at ₹130, rest at ₹190', value: 7800, tone: 'ice' },
          { label: 'Hold all to ₹190', value: 11700, tone: 'bull' },
          { label: 'Half at ₹130, rest stopped at ₹100', value: 1950, tone: 'neutral' },
        ],
      },
    },
    {
      t: 5,
      def: `A trailing stop-loss is a stop that moves in the direction of profit and never moves back. It protects part of the gain while letting the trade continue. It exits you when the price falls a fixed distance from its best level.`,
      hi: `Trailing stop-loss woh stop hai jo profit ki direction mein aage badhta hai aur kabhi peeche nahi aata. Yeh gain ka kuch hissa bachata hai aur trade ko chalne deta hai. Price apne best level se fixed distance neeche aate hi aap nikal jaate ho.`,
      how: `You can trail by a fixed number of premium points, by a percentage, by the index's swing lows or by a moving average. Too tight a trail gets stopped by normal noise; too loose a trail gives back most of the profit. A stop-loss market order can fill worse than the trigger in a fast fall, and in options the spread widens in such moments, so allow for slippage. Some brokers offer trailing orders, but many traders adjust manually or use a stop-loss limit order.`,
      eg: {
        title: 'A 20-point trail (illustrative)',
        text: `Entry ₹100. The premium rises to ₹150, so the stop moves to ₹130. It rises to ₹180, so the stop moves to ₹160. It then falls and hits ₹160. Profit = (160 − 100) × 65 = ₹3,900 per lot, while the best price (₹180) would have given ₹5,200. The trail gave back 20 × 65 = ₹1,300 for the safety of an exit rule.`,
      },
      tip: `A trailing stop only moves one way; if you widen it when the price turns against you, it is no longer a stop.`,
      visual: {
        kind: 'timeline',
        title: 'A 20-point trailing stop',
        events: [
          { when: 'Entry ₹100', what: 'Initial stop ₹80', tone: 'gold' },
          { when: 'High ₹150', what: 'Stop trails to ₹130', tone: 'bull' },
          { when: 'High ₹180', what: 'Stop trails to ₹160', tone: 'bull' },
          { when: 'Price falls', what: 'Stop at ₹160 is hit; profit 60 points', tone: 'neutral' },
        ],
      },
    },
    {
      t: 6,
      def: `Time decay loss is the loss a buyer suffers because the option's time value shrinks every day, even when the index does not move. Theta is the measure of this daily loss. It is greatest for at-the-money options near expiry.`,
      hi: `Time decay loss woh loss hai jo option buyer ko isliye hota hai ki option ki time value har din ghat-ti hai, chahe index na hile. Theta is daily loss ka measure hai. At-the-money options mein expiry ke paas yeh sabse zyada hota hai.`,
      how: `An option is a wasting asset: its time value falls to zero at expiry. For an at-the-money option, the decay is roughly proportional to one divided by the square root of time left, so it accelerates as expiry nears. NIFTY weekly options therefore lose value quickly in the last two days. A buyer needs the index to move enough to outrun theta. The cost is hidden because the screen shows only a premium that is lower than yesterday's.`,
      eg: {
        title: 'One day of decay with no move (illustrative)',
        text: `NIFTY 24,000, IV 14%, rate 6.5%. The 24,000 CE with 2 days left is about ₹103.5. With 1 day left and spot unchanged it is about ₹72.3. The loss is 103.5 − 72.3 = ₹31.2 per unit, or 31.2 × 65 = ₹2,028 per lot, in one day of nothing happening.`,
      },
      tip: `Before buying an ATM weekly option, ask: how many points must NIFTY move just to cover tomorrow's decay?`,
      visual: { kind: 'curve', title: 'Time value shrinks faster near expiry', curve: 'timeValue' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 2, iv: 14, rate: 6.5 }, why: 'Read theta for a 2-day ATM call.' },
    },
    {
      t: 7,
      def: `IV crush is a sharp fall in implied volatility, usually after a known event such as a result or a policy announcement passes. Option premiums fall even if the index moves in your favour. Vega measures how much a premium changes for a one-point change in IV.`,
      hi: `IV crush matlab implied volatility ka achanak gir jana, aksar kisi known event ke baad jaise results ya policy announcement. Index aapke favour mein bhi chale, tab bhi premium gir sakta hai. Vega batata hai ki IV ke ek point badalne par premium kitna badalta hai.`,
      how: `Before an event, option prices include an uncertainty premium and IV rises. When the outcome is known the uncertainty is gone and IV drops, often quickly. A buyer who bought before the event paid the high IV and now holds an option whose time value has deflated. This is common around stock results, Union Budget day and other scheduled events. India VIX is an expectation of volatility, not direction, so a falling VIX after an event says the market expects calmer conditions, not a lower index.`,
      eg: {
        title: 'IV 20% falls to 14% (illustrative)',
        text: `NIFTY 24,000, 7 days left. The 24,200 CE at IV 20% is about ₹189.8. After the event IV falls to 14% and NIFTY is unchanged (time left also unchanged for the comparison): the option is about ₹113.6. The loss is 189.8 − 113.6 = ₹76.2 per unit, or about 76.2 × 65 = ₹4,954 per lot, with no change in the index.`,
      },
      tip: `When IV is high before an event, buying options means you are paying for the news twice: once in the premium and once if IV falls.`,
      visual: {
        kind: 'bars',
        title: 'Same strike, same spot, different IV (premium per unit)',
        caption: '24,200 CE, 24,000 spot, 7 days to expiry. Illustrative Black-Scholes values.',
        unit: ' ₹',
        items: [
          { label: 'IV 20%', value: 190, tone: 'gold' },
          { label: 'IV 14%', value: 114, tone: 'ice' },
          { label: 'IV 11%', value: 77, tone: 'neutral' },
        ],
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24200, days: 7, iv: 20, rate: 6.5 }, why: 'Change IV to 14 and compare the price.' },
    },
    {
      t: 8,
      def: `A trade can be directionally correct and still lose money. The index must move enough, in time, to cover the premium paid and the daily decay. A small move in the right direction is often not enough.`,
      hi: `Direction sahi hone par bhi trade loss mein ja sakta hai. Index ko itna move karna hota hai, sahi time par, ki woh premium aur daily decay cover kar sake. Sahi direction mein chhota move aksar kaafi nahi hota.`,
      how: `A call buyer needs spot to finish above strike plus premium to make a profit at expiry. Before expiry the same logic applies in softer form: the option's price must rise by more than the decay and any IV fall. Three common reasons for a right-direction loss are: the move was too small, the move came too late, and IV fell. Buying a far out-of-the-money option makes this worse because the breakeven is far away.`,
      eg: {
        title: 'Up 280 points, still a loss (illustrative)',
        text: `NIFTY 24,000. A trader buys one lot of the 24,200 CE at ₹114 (cost 114 × 65 = ₹7,410). The index rises 280 points and expires at 24,280. Intrinsic value = 80. P&L = (80 − 114) × 65 = −₹2,210. Breakeven was 24,200 + 114 = 24,314. The view was right; the trade needed 314 points and got 280.`,
      },
      tip: `Compute the breakeven before you buy and ask whether your expected move is comfortably larger than it.`,
      visual: {
        kind: 'payoff',
        title: '24,200 CE bought at ₹114',
        caption: 'Breakeven at expiry is 24,314.',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24200, premium: 114 }],
      },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24200, premium: 114, expiryPrice: 24280, lotSize: 65, lots: 1 }, why: 'Shows the loss at 24,280.' },
    },
    {
      t: 9,
      def: `Gamma is the rate at which an option's delta changes as the index moves. A buyer of a near-the-money option with little time left has high gamma, so a sharp move can turn a small premium into a much larger one. The same sensitivity can also take the premium to zero.`,
      hi: `Gamma batata hai ki index ke move ke saath option ka delta kitni tezi se badalta hai. Expiry ke paas near-the-money option ka gamma zyada hota hai, isliye tez move mein chhota premium bada ho sakta hai. Wahi sensitivity premium ko zero par bhi le ja sakti hai.`,
      how: `When the index moves toward your strike, delta rises, so each further point earns more than the one before. That is positive convexity and it is why long options can pay disproportionately in sharp moves. Gamma is highest near the money close to expiry, but so is theta, so the buyer is paying for it every hour. Gamma gains need a fast, sustained move; in a slow drift the decay wins.`,
      eg: {
        title: 'OTM becomes ATM (illustrative)',
        text: `NIFTY 24,000, 2 days left, IV 14%. The 24,100 CE is about ₹60. NIFTY rises 100 points to 24,100 (time effect ignored for clarity), where the same option is at the money and worth about ₹104. The gain is about 44 per unit, or 44 × 65 = ₹2,860 per lot, about 73% on a ₹3,900 outlay. If NIFTY had stayed at 24,000 the option would have kept losing value.`,
      },
      tip: `Gamma profits need speed; if you expect a slow grind, a high-gamma option will mostly give you decay.`,
      visual: { kind: 'curve', title: 'Gamma peaks near the strike', curve: 'gamma' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24100, days: 2, iv: 14, rate: 6.5 }, why: 'Read the delta and gamma of the 24,100 CE.' },
    },
    {
      t: 10,
      def: `Managing winners and losers means following a written plan for both: when to add, reduce or exit a winning trade, and when to cut a losing one. The aim is to keep average losses smaller than average wins. Plans work better than decisions made under live P&L pressure.`,
      hi: `Winners aur losers manage karna matlab dono ke liye likha hua plan follow karna: jeetne wale trade mein kab add, reduce ya exit karna hai, aur haarne wale ko kab kaatna hai. Maqsad hai ki average loss, average win se chhota rahe. Live P&L ke pressure mein liye gaye decision se plan behtar kaam karta hai.`,
      how: `For winners, use partial booking, a trailing stop and a time exit. For losers, use the stop (premium or index level) and the time stop. Do not add to a loser to average down, because the premium decays and the decision stacks risk on a view that is already wrong. Size positions so that one loss is a small fraction of capital, such as 1%. Review trades weekly, because the pattern across many trades shows more than any single result.`,
      eg: {
        title: 'Sizing and stops (illustrative)',
        text: `Capital ₹2,00,000, risk 1% = ₹2,000 per trade. Entry ₹100, stop ₹75, so loss per lot = 25 × 65 = ₹1,625. Lots = 2,000 / 1,625 = 1.23, so take 1 lot. If this trade loses, the loss is 0.81% of capital. If instead the trader averages down at ₹60 with 2 more lots, the total quantity is 195, and a fall to ₹30 costs (100 − 30) × 65 + (60 − 30) × 130 = 4,550 + 3,900 = ₹8,450, or 4.2% of capital.`,
      },
      tip: `Cut losers by rule and never add to a losing option: a 60% fall needs a 150% rise to recover.`,
      visual: {
        kind: 'compare',
        title: 'Winners and losers: a simple rulebook',
        left: { head: 'Winner', tone: 'bull', points: ['Book part at the first target', 'Move stop to cost', 'Trail the remainder', 'Exit by time if it stalls'] },
        right: { head: 'Loser', tone: 'bear', points: ['Exit at the planned stop', 'Never average down', 'Respect the time stop', 'Log the reason in a journal'] },
      },
      calc: { id: 'position-size', preset: { capital: 200000, riskPct: 1, entry: 100, stop: 75, lotSize: 65 }, why: 'Lots that fit a 1% risk rule.' },
    },
  ],
}
export default m
