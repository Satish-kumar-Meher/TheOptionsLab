import type { ModuleLesson } from '../topicLessonTypes'

/* Module 14.1 — Types of Option Buyers.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). Premiums are Black-Scholes values
 * (IV 14% unless stated, r 6.5%, q 1.3%) rounded; real premiums differ. SEBI study figures (about 91% of individual F&O traders lost money in FY25)
 * are as published by SEBI in July 2025 - verify the latest study. */
const m: ModuleLesson = {
  moduleId: '14.1',
  intro: `Option buyers are not one crowd. A retail trader buying a weekly call for a quick move, a fund buying puts to protect a portfolio, and a trader buying a call because a breakout just printed are all buyers, yet their goals, holding periods and exits are very different. Knowing the type helps you read what an OI or volume change may mean and, more importantly, which type you are yourself.`,
  introHi: `Option buyers ek hi type ke nahi hote. Retail trader jo weekly call quick move ke liye khareedta hai, fund jo portfolio bachane ke liye put khareedta hai, aur woh trader jo breakout dekhkar call leta hai, sab buyers hain, lekin unke goals, holding period aur exits bilkul alag hote hain. Type samajhne se OI ya volume change ka matlab samajhna aasaan hota hai, aur sabse zaroori, yeh pata chalta hai ki aap khud kis type ke buyer ho.`,
  steps: {
    concept: `An option buyer pays a premium and gets the right, not the obligation, to buy (call) or sell (put) at the strike. The most the buyer can lose is the premium paid, but that can be 100% of it, and it happens often because time decay works against the buyer every day. Buyers can be grouped by direction (CE or PE), by holding period (intraday or positional), by trigger (momentum, breakout, event) and by purpose (speculation or hedging).`,
    conceptHi: `Option buyer premium deta hai aur strike par khareedne (call) ya bechne (put) ka haq paata hai, obligation nahi. Buyer ka maximum loss premium tak hi hota hai, lekin woh poora 100% ho sakta hai, aur aisa aksar hota hai kyunki time decay har din buyer ke khilaf kaam karta hai. Buyers ko direction (CE ya PE), holding period (intraday ya positional), trigger (momentum, breakout, event) aur purpose (speculation ya hedging) ke hisaab se group kar sakte hain.`,
    mechanism: `Every buyer faces the same three forces: direction (delta), time (theta) and volatility (vega). What differs is how long they stay and why. A scalper holds for minutes, so delta and the bid-ask spread matter most. A positional buyer holds for days, so theta and IV matter more. A hedger does not expect to profit from the option at all; the premium is an insurance cost. On the exchange the buyer's order simply meets a writer's order, so the chain cannot tell you which type bought.`,
    example: {
      title: 'Same option, three buyers (illustrative)',
      text: `The 24,100 CE with 3 days left, IV 14%, costs about ₹82, so one lot (65) costs 82 × 65 = ₹5,330. A scalper buys at 10:00 and sells at ₹95 for 13 × 65 = ₹845. A positional buyer holds it and, if NIFTY stays at 24,000, finds it worth about ₹101.6 with 4 days left on a 7-day contract bought at ₹150.4, a loss of 48.8 × 65 = ₹3,172. A fund that owns stocks would not buy this call at all; it would buy puts. The instrument is the same, the use is not.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Buyer types by holding period and purpose',
      caption: 'Most retail activity sits in the top-left; institutions use the right column more.',
      xLabels: ['Speculating', 'Protecting'],
      yLabels: ['Short holding', 'Longer holding'],
      cells: [
        { head: 'Scalpers, intraday', note: 'Minutes to hours; spread and delta matter', tone: 'gold' },
        { head: 'Tactical hedges', note: 'Puts bought into an event', tone: 'ice' },
        { head: 'Positional, event buyers', note: 'Days; theta and IV matter', tone: 'gold' },
        { head: 'Portfolio insurance', note: 'Rolled puts; premium is a cost', tone: 'ice' },
      ],
    },
    optionChain: `The option chain shows OI, volume and price change per strike, but not who bought. Rising volume and OI in a call may come from fresh buying, fresh writing or a switch between strikes, and OI alone cannot show who initiated the trade. NSE publishes participant-wise OI (Client, DII, FII, Pro) after market hours, which gives a broad picture of who holds what, but it is end-of-day and aggregated. Use the chain for levels and activity, not to identify a buyer type.`,
    psychology: `Retail buyers are drawn by the small outlay and the story of a large multiple, and by the thrill of a quick result. Hedgers are driven by fear of loss and accept a small certain cost. Both can be wrong in behaviour: the speculator by buying cheap far-out options on hope, the hedger by dropping protection after it has "wasted" premium. SEBI studies of individual F&O traders have found that a large majority lost money (about 91% in FY25), which is a reason to be honest about your own type and edge.`,
    scenarios: {
      bullish: `Call buyers (scalpers, breakout and momentum traders) may gain if the move is fast enough to beat decay. Put buyers who were hedging lose a little premium, which is the price of protection. Late call buyers after a big rise may find that IV and premium are already high.`,
      bearish: `Put buyers and hedgers may gain, and hedging puts may do the job they were bought for. Call buyers who hold on without a stop can lose most of the premium. Fast falls also lift IV, which can help put buyers beyond delta.`,
      sideways: `Almost every buyer type loses to time decay in a quiet market, positional buyers most. Scalpers may pay spread repeatedly for no gain. Hedgers lose their premium and, in this case, that is the expected outcome and not a mistake.`,
    },
    practice: [
      {
        q: `A retail trader buys one lot (65) of the 24,100 CE at ₹82. Find the cost, the breakeven at expiry and the profit if NIFTY expires at 24,300.`,
        a: `Cost = 82 × 65 = ₹5,330. Breakeven = 24,100 + 82 = 24,182. At 24,300 the option is worth 200, profit = (200 − 82) × 65 = 118 × 65 = ₹7,670.`,
      },
      {
        q: `An intraday buyer enters at ₹82, targets ₹95 and stops at ₹72. Find the profit and loss per lot and the reward-to-risk ratio.`,
        a: `Profit = 13 × 65 = ₹845. Loss = 10 × 65 = ₹650. Reward to risk = 13 / 10 = 1.3. He needs to be right more than 10/23 = 43.5% of the time just to break even, before charges.`,
      },
      {
        q: `A hedger holds a portfolio matching 3 NIFTY lots (3 × 65 × 24,000 = ₹46,80,000) and buys three 23,800 puts at ₹94. What is the cost and what percentage of the portfolio is it?`,
        a: `Cost = 94 × 195 = ₹18,330. As a share of the portfolio = 18,330 / 46,80,000 = 0.39%. This is the insurance cost for about a week of protection below 23,800 (illustrative).`,
      },
    ],
    assignment: `Look back at your last ten option trades (or paper trades). For each, write down the type (CE or PE, intraday or positional, momentum, breakout, event, hedge or speculation) and the result. Count which type made or lost most. Then decide which one type you will focus on for the next month and write the entry, stop and exit rules in three lines.`,
  },
  topics: [
    {
      t: 1,
      def: `A retail CE buyer is an individual trader who buys call options because he expects the market to rise. He pays a premium and profits only if the index rises enough, before expiry, to cover that premium. Most of this activity is in weekly options with a small premium per lot.`,
      hi: `Retail CE buyer ek individual trader hota hai jo call option isliye khareedta hai kyunki use lagta hai market upar jayega. Woh premium deta hai aur tabhi kamata hai jab index expiry se pehle itna upar jaye ki premium nikal jaye. Zyadatar yeh activity weekly options mein hoti hai jahan ek lot ka premium chhota hota hai.`,
      how: `The trader picks a strike, usually ATM or slightly OTM, and pays the full premium upfront to the broker; under SEBI's 2024 measures on index derivatives, buyers must pay the premium in full. Profit at expiry is the index minus strike minus premium, per unit, times the lot size. Before expiry the price also depends on time decay and IV, so the index can rise slightly and the option can still lose. Retail call buying is often most crowded when the market has already risen.`,
      eg: {
        title: 'Buying the 24,100 CE (illustrative)',
        text: `NIFTY 24,000, the 24,100 CE with 3 days left costs about ₹82. One lot (65) costs 82 × 65 = ₹5,330. The breakeven at expiry is 24,100 + 82 = 24,182, which is 182 points (0.76%) above spot. If NIFTY expires at 24,300, profit = (200 − 82) × 65 = ₹7,670. If it expires at or below 24,100, the loss is the full ₹5,330.`,
      },
      tip: `Before buying, compute the breakeven and ask whether the market can realistically reach it in the time left, not just whether it will go up.`,
      visual: { kind: 'payoff', title: 'Long 24,100 CE at expiry', caption: 'Loss limited to the premium; profit starts above 24,182.', spot: 24000, legs: [{ type: 'CE', side: 1, strike: 24100, premium: 82 }] },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 82, expiryPrice: 24300, lotSize: 65, lots: 1 }, why: 'Reproduces the ₹7,670 profit at 24,300 and the ₹5,330 maximum loss.' },
    },
    {
      t: 2,
      def: `A retail PE buyer buys put options because he expects the market to fall, or to protect holdings. A put gains value when the index goes down. Put buyers often act after a sharp fall has started, when fear is already visible.`,
      hi: `Retail PE buyer put option isliye khareedta hai kyunki use lagta hai market girega, ya apne holdings ko bachana chahta hai. Index neeche jaye toh put ki value badhti hai. Put buyers aksar tab aate hain jab girawat shuru ho chuki hoti hai aur dar dikhne lagta hai.`,
      how: `Falls are usually faster than rises, and India VIX tends to rise as the index falls, so a put can gain from both delta and vega. The flip side is that once fear is high the put is already expensive, and if the market bounces the premium can drop quickly as IV falls. Put buying also appears on event days (budget, policy, results) when traders fear a gap down.`,
      eg: {
        title: 'Buying the 23,900 PE (illustrative)',
        text: `NIFTY 24,000, the 23,900 PE with 3 days left costs about ₹74, so one lot costs 74 × 65 = ₹4,810. Breakeven = 23,900 − 74 = 23,826, which is 174 points (0.73%) below spot. If NIFTY expires at 23,700, profit = (200 − 74) × 65 = ₹8,190. If NIFTY expires above 23,900 the whole ₹4,810 is lost.`,
      },
      tip: `A put bought after a big fall may already carry high IV. Check whether you are paying for fear before you pay the premium.`,
      visual: { kind: 'payoff', title: 'Long 23,900 PE at expiry', caption: 'Loss limited to the premium; profit starts below 23,826.', spot: 24000, legs: [{ type: 'PE', side: 1, strike: 23900, premium: 74 }] },
      calc: { id: 'breakeven', preset: { optType: 'PE', side: 'buy', strike: 23900, premium: 74 }, why: 'Gives the put buyer breakeven of 23,826.' },
    },
    {
      t: 3,
      def: `An intraday option buyer opens and closes the position on the same day, usually within minutes to a few hours. The aim is to capture a small move in the option premium, not to hold for the expiry result. Positions are squared off before the close.`,
      hi: `Intraday option buyer ek hi din mein position kholta aur band karta hai, aksar kuch minutes se kuch ghanton mein. Maqsad option premium mein chhota move pakadna hota hai, expiry ka result nahi. Position market close se pehle square off ho jati hai.`,
      how: `Because the holding period is short, time decay over the day is small compared with the delta move, but the bid-ask spread and brokerage matter a lot since they are paid on every trade. Intraday buyers use tight stops on the option price or on the index chart, and often need a high hit rate or a good reward-to-risk to be profitable after charges. SEBI has also tightened intraday monitoring of position limits in index options, so very large positions are watched through the day.`,
      eg: {
        title: 'A scalp with a stop (illustrative)',
        text: `The trader buys the 24,100 CE at ₹82, target ₹95, stop ₹72. Profit if target hits = 13 × 65 = ₹845; loss if stop hits = 10 × 65 = ₹650. Reward to risk = 1.3. Break-even win rate = 10 / (13 + 10) = 43.5%, and brokerage, STT and the spread push the true figure higher.`,
      },
      tip: `Intraday buying works only if the win rate and reward-to-risk together beat costs. Track costs per trade, not just gross profit.`,
      visual: { kind: 'timeline', title: 'An intraday option trade', events: [{ when: '9:45', what: 'Setup forms; entry at ₹82' }, { when: '10:05', what: 'Stop at ₹72 placed at entry', tone: 'bear' }, { when: '10:40', what: 'Target ₹95 reached; exit', tone: 'bull' }, { when: '15:15', what: 'Rule: flat before close', tone: 'gold' }] },
      calc: { id: 'risk-reward', preset: { winRate: 45, avgWin: 845, avgLoss: 650 }, why: 'Shows the expectancy of the 1.3 reward-to-risk scalp at a 45% win rate.' },
    },
    {
      t: 4,
      def: `A positional option buyer holds options for several days or until expiry, based on a view that plays out over time. The buyer accepts overnight gaps and daily time decay in exchange for a bigger possible move. Longer-dated options decay slower per day but cost more.`,
      hi: `Positional option buyer options ko kai din ya expiry tak hold karta hai, aise view par jo time ke saath play out hota hai. Woh overnight gap aur roz ka time decay accept karta hai, badle mein bade move ki umeed rakhta hai. Door expiry wale options roz kam decay hote hain par mehange hote hain.`,
      how: `Theta is the daily cost of holding. For an ATM-ish option it is small in the first days of a 7-day contract and accelerates as expiry approaches. Overnight risk includes global moves and news. A positional buyer therefore sizes smaller and prefers options with more time, accepting a higher premium. If the view needs two weeks to play out, a 2-day option is the wrong instrument.`,
      eg: {
        title: 'The cost of waiting (illustrative)',
        text: `The 24,100 CE with 7 days left costs about ₹150.4. Three days later, if NIFTY is still at 24,000, only 4 days remain and the option is worth about ₹101.6. The loss is 48.8 points = 48.8 × 65 = ₹3,172 per lot with no change in the index. NIFTY would have to rise roughly 125 points just to recover that decay at a delta near 0.4.`,
      },
      tip: `Match the expiry to the time your view needs, and add a day or two of buffer. Time you do not buy is time you cannot wait.`,
      visual: { kind: 'curve', title: 'Time value falls faster near expiry', curve: 'timeValue' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24100, days: 7, iv: 14, rate: 6.5 }, why: 'Shows the ₹150 price and a theta of roughly ₹14.6 per day.' },
    },
    {
      t: 5,
      def: `A momentum trader buys in the direction a price is already moving, expecting the move to continue. The signal can be a strong candle, a rising volume or a new intraday high. The trade is a bet on continuation, not on value.`,
      hi: `Momentum trader woh hota hai jo price jis direction mein pehle se chal raha hai usi mein khareedta hai, is umeed mein ki move jaari rahega. Signal strong candle, badhta volume ya naya intraday high ho sakta hai. Yeh continuation par bet hai, value par nahi.`,
      how: `In options, a momentum trader likes ATM or slightly ITM strikes because delta is higher and the premium follows the index more closely. The risk is entering late: after a strong run, premiums are higher and a pullback hits quickly. The stop is normally placed beyond the pullback low or based on a fixed fraction of the premium. Momentum is a behaviour, so it works for some periods and fails in others.`,
      eg: {
        title: 'Momentum entry with delta 0.58 (illustrative)',
        text: `NIFTY pushes up to 24,150. The 24,100 CE (3 days, IV 14%) is worth about ₹154.6 with a delta of about 0.58. A further 40-point rise adds roughly 0.58 × 40 = ₹23 (more with gamma). A 40-point pullback removes about the same. The trade needs the move to continue by more than the decay and the spread.`,
      },
      tip: `Enter on a pullback inside the move rather than at the top of a spike, and decide the stop before entering.`,
      visual: { kind: 'candles', title: 'Momentum: trend continuing', pattern: 'uptrend' },
    },
    {
      t: 6,
      def: `A breakout trader buys when price moves out of a defined range or above a resistance, expecting a fast move to follow. The idea is that trapped sellers cover and new buyers join. Many breakouts fail, so the exit rule matters more than the entry.`,
      hi: `Breakout trader tab khareedta hai jab price kisi range ya resistance se bahar nikalta hai, is umeed mein ki tez move aayega. Soch yeh hoti hai ki phase hue sellers cover karenge aur naye buyers judenge. Bahut saare breakouts fail ho jate hain, isliye exit rule entry se zyada important hai.`,
      how: `The trader marks a level (previous day high, range top, round number), waits for a close or strong push through it, and buys a call. A close back inside the range is the failure signal. Because breakouts often come with a jump in volume and IV, the premium can already be higher at entry, which raises the breakeven. Option OI at the nearby strike may hint at where sellers are positioned but cannot prove a breakout will hold.`,
      eg: {
        title: 'A breakout that fails (illustrative)',
        text: `Resistance is 24,200. NIFTY breaks to 24,210 and the 24,200 CE (2.5 days left) costs about ₹121.4. If price falls back to 24,170, the call is worth about ₹94. Loss = 27.4 × 65 = ₹1,781 per lot. The rule, "exit on a close back below the level", limits the loss to a small, known amount instead of waiting for a recovery.`,
      },
      tip: `Treat a close back inside the range as the exit. A breakout trade has no reason to be held once the breakout fails.`,
      visual: { kind: 'candles', title: 'Breakout above resistance', pattern: 'breakout', level: { price: 24200, label: 'Resistance 24,200' } },
    },
    {
      t: 7,
      def: `An event trader buys options around a scheduled event such as the Union Budget, an RBI policy decision, results or election results. The trade is about a possible large move. The cost is that option prices usually already include extra volatility before the event.`,
      hi: `Event trader kisi scheduled event ke aas-paas options khareedta hai, jaise Union Budget, RBI policy, results ya election results. Trade bade move ki sambhavna par hota hai. Dikkat yeh hai ki event se pehle option prices mein extra volatility pehle se chadh chuki hoti hai.`,
      how: `Before known events, IV usually rises because the market expects larger moves. After the event the uncertainty disappears and IV can fall sharply even if the index moves, which is called IV crush. A buyer therefore needs the move to be larger than what the options already imply. On election result day, 4 June 2024, NIFTY fell sharply intraday and recovered later, and India VIX moved up and down very fast, an example of how event days can whip both direction and IV.`,
      eg: {
        title: 'Event premium and IV drop (illustrative)',
        text: `Before the event, the 24,000 CE with 2 days left at IV 16% costs about ₹116.8. After the event NIFTY is unchanged at 24,000, IV is 12% and 1.5 days remain: the option is worth about ₹76.2. Loss = 40.6 × 65 = ₹2,639 per lot even though the index did not move against the buyer.`,
      },
      tip: `Compare the implied move (the ATM straddle) with how far the market might realistically go. If the straddle already prices it in, the buyer needs more.`,
      visual: { kind: 'timeline', title: 'IV around a scheduled event', events: [{ when: 'Days before', what: 'IV drifts up as traders buy options' }, { when: 'Event day', what: 'IV at its peak; premiums rich', tone: 'gold' }, { when: 'Just after', what: 'IV falls (IV crush), even if direction is right', tone: 'bear' }] },
      calc: { id: 'straddle-move', preset: { spot: 24000, cePrice: 117, pePrice: 117, strike: 24000 }, why: 'Turns the event-day straddle into the implied move the buyer must beat.' },
    },
    {
      t: 8,
      def: `A hedging buyer buys options, usually puts, to protect something he already owns, such as a stock portfolio. He does not expect profit from the option; he is paying a known premium to limit a possible loss. The cost of protection is part of the plan.`,
      hi: `Hedging buyer option, aksar put, isliye khareedta hai ki jo cheez uske paas pehle se hai, jaise stock portfolio, use bacha sake. Woh option se profit ki umeed nahi rakhta; woh ek tay premium deke possible loss ko limit karta hai. Protection ka cost plan ka hissa hota hai.`,
      how: `The hedger estimates the portfolio value to protect, chooses a strike below the market (the deductible), and buys puts in lots that match the exposure. Index options are cash-settled and European, so no shares change hands and the hedge works at expiry or by selling it back before. The hedge is imperfect if the portfolio does not move like NIFTY, which is why beta matters. Many hedgers roll the puts each week or month and treat the premium like an insurance bill.`,
      eg: {
        title: 'Hedging three lots of exposure (illustrative)',
        text: `A portfolio similar to 3 NIFTY lots is worth 3 × 65 × 24,000 = ₹46,80,000. The 23,800 PE with 7 days left costs about ₹94, so three lots cost 94 × 195 = ₹18,330, which is 0.39% of the portfolio. If NIFTY expires at 23,500, each put is worth 300 points, a payoff of 300 × 195 = ₹58,500 before premium, offsetting part of the portfolio fall.`,
      },
      tip: `A hedge that never pays out is still working. Judge it by the loss it prevents in a bad week, not by the premium it costs in a good one.`,
      visual: { kind: 'payoff', title: 'Portfolio + put = floor', caption: 'The put limits loss below the strike; the premium lowers the upside.', spot: 24000, legs: [{ type: 'FUT', side: 1, strike: 24000 }, { type: 'PE', side: 1, strike: 23800, premium: 94 }] },
      calc: { id: 'hedge-ratio', preset: { portfolio: 4680000, beta: 1, futuresNotional: 1560000 }, why: 'Confirms that 3 lots (₹15,60,000 each) match a ₹46,80,000 portfolio.' },
    },
    {
      t: 9,
      def: `A speculative buyer buys options purely to make a profit from a price view, often with cheap far-out-of-the-money options. The appeal is a large percentage gain for a small outlay. The cost is a low probability of winning.`,
      hi: `Speculative buyer sirf price view par profit kamane ke liye options khareedta hai, aksar sasti far OTM options. Aakarshan yeh hota hai ki chhote paise mein bada percentage gain mil sakta hai. Kimat yeh hoti hai ki jeetne ki probability kam hoti hai.`,
      how: `Far OTM options are cheap because the market gives them a small chance of finishing in the money. A lottery-style buyer expects most trades to lose and one to pay for them, but psychologically it is hard to sustain. SEBI studies show that most individual F&O traders lose money, and that losses come with frequent trading and high costs. Position size has to be small enough that a long run of 100% losses does not hurt.`,
      eg: {
        title: 'The cheap 24,400 CE (illustrative)',
        text: `With 2 days left the 24,400 CE costs about ₹6.3, so a lot costs 6.3 × 65 = ₹409.5. Breakeven at expiry = 24,406.3, which is 406.3 points (1.69%) above 24,000 in two days. NIFTY would need an unusually large move; the occasional win has to repay many full losses of ₹409.5 each.`,
      },
      tip: `A cheap option is not a good-value option. Judge it by the distance needed to reach breakeven, not by the rupee price.`,
      visual: { kind: 'ladder', title: 'How far OTM is far?', caption: 'The further from spot, the cheaper and the less likely to expire in the money.', optType: 'CE', spot: 24000, strikes: [24000, 24100, 24200, 24300, 24400] },
      calc: { id: 'moneyness', preset: { optType: 'CE', spot: 24000, strike: 24400 }, why: 'Shows the 24,400 call is 400 points (1.67%) out of the money.' },
    },
    {
      t: 10,
      def: `Institutional option buyers are funds, insurers, FPIs, mutual funds and proprietary desks that buy options in large size. Many of them buy for protection or to shape risk, not for a lottery payoff. Their orders are often split into smaller pieces to avoid moving the price.`,
      hi: `Institutional option buyers fund, insurer, FPI, mutual fund aur proprietary desks hote hain jo bade size mein options khareedte hain. Inme se bahut saare protection ya risk shape karne ke liye khareedte hain, lottery payoff ke liye nahi. Unke orders aksar chhote tukdon mein todkar diye jate hain taaki price na hile.`,
      how: `Institutions work with risk limits and mandates, so an options purchase may be a hedge on a large equity book, not a view. NSE publishes participant-wise OI (Client, DII, FII, Pro) daily after market hours, so you can see the broad positioning of each group, but it is aggregated and delayed and does not tell you the purpose of each trade. A large put position by FPIs can be a hedge against equity holdings, not necessarily a bearish bet.`,
      eg: {
        title: 'Sizing a fund hedge (illustrative)',
        text: `A fund holds ₹500 crore of NIFTY-linked stocks. One lot is 65 × 24,000 = ₹15,60,000, so full cover needs 5,00,00,00,000 / 15,60,000 ≈ 3,205 lots. At ₹94 per 23,800 PE, cost = 3,205 × 65 × 94 ≈ ₹1.96 crore, about 0.39% of the book. The fund buys this because the mandate requires limited downside, not because it forecasts a crash.`,
      },
      tip: `Never read an institutional put purchase as a prediction. Protection and view look identical in OI data.`,
      visual: { kind: 'layers', title: 'Who buys options', caption: 'Roughly in order of how often each group appears in daily activity; sizes are not to scale.', layers: [{ label: 'Retail individuals', note: 'Many small speculative trades', tone: 'gold' }, { label: 'Proprietary desks / Pro', note: 'Short-term trading, arbitrage', tone: 'ice' }, { label: 'DII (funds, insurers)', note: 'Hedges and rebalancing', tone: 'neutral' }, { label: 'FPI', note: 'Hedges and index views', tone: 'neutral' }] },
    },
  ],
  tools: [{ id: 'option-pnl' }, { id: 'breakeven' }],
}
export default m
