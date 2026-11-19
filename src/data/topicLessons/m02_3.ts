import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '2.3',
  intro:
    `NSE and other official sources publish daily data on what foreign investors, domestic institutions, clients and proprietary traders did in the cash and derivatives markets. This module teaches you to read that data: FII and DII cash flows, FII index futures and options positions, participant-wise OI, and the long-short ratio. The data is delayed (end of day) and category-level, so it gives context, not a live signal.`,
  introHi:
    `NSE aur doosre official sources roz publish karte hain ki foreign investors, domestic institutions, clients aur proprietary traders ne cash aur derivatives mein kya kiya. Is module mein FII/DII cash flow, FII index futures aur options positions, participant-wise OI aur long-short ratio padhna seekhenge. Yeh data end-of-day aata hai aur category-level hota hai, isliye yeh live signal nahi, balki context deta hai.`,
  steps: {
    concept:
      `Institutional market data is a daily scorecard of net buying and selling and of open positions by participant category. The cash market data shows rupee value bought and sold by FII and DII. The derivatives data shows how many index futures and option contracts each category holds long and short. It tells you what happened, not why, and not who inside a category did it.`,
    conceptHi:
      `Institutional data ek daily scorecard hai jisme dikhta hai ki kis category ne kitna buy ya sell kiya aur kiske paas kitni open positions hain. Cash data mein FII aur DII ki rupees mein buying-selling hoti hai. Derivatives data mein dikhta hai ki index futures aur options mein kis category ke kitne long aur short contracts hain. Yeh batata hai kya hua, kyun hua yeh nahi, aur category ke andar kisne kiya yeh bhi nahi.`,
    mechanism:
      `After the close, NSE publishes provisional FII/DII cash-market activity in ₹ crore (gross buy, gross sell and net; check the report's note for which exchanges are included). It also publishes participant-wise open interest and participant-wise trading volumes for derivatives in four categories: Client, DII, FII and Pro (proprietary traders). Each report breaks positions into index futures, stock futures, index options (call long, call short, put long, put short) and stock options. Every contract has a buyer and a seller, so across the four categories total long equals total short. The reports carry no names and no information about the portfolios behind a position.`,
    example: {
      title: 'A daily scorecard (illustrative numbers)',
      text: `NIFTY falls 1.1% near 24,000. FII cash: buy ₹12,500 cr, sell ₹15,800 cr, net −₹3,300 cr. DII cash: buy ₹14,200 cr, sell ₹11,700 cr, net +₹2,500 cr. FII index futures: long 75,000, short 130,000, so net −55,000 and a long-short ratio of 75,000 ÷ 130,000 ≈ 0.58, down from 0.90 (90,000 ÷ 100,000) the day before. Foreign selling was partly absorbed by DIIs, and FII futures became more short-heavy. Whether that is a bearish view or a hedge cannot be told from this table alone.`,
    },
    chart: {
      kind: 'bars',
      title: 'FII and DII cash net flow, one illustrative day',
      caption: 'Bars show the size of net flow in ₹ crore: FIIs net sold, DIIs net bought. A net number can hide very large gross buying and selling on both sides.',
      unit: ' cr',
      items: [
        { label: 'FII net sell', value: 3300, tone: 'bear' },
        { label: 'DII net buy', value: 2500, tone: 'bull' },
        { label: 'Combined shortfall absorbed by others', value: 800, tone: 'neutral' },
      ],
    },
    optionChain:
      `The participant data is separate from the option chain, but the two complement each other. The chain shows OI by strike and expiry for all participants together; participant data shows how each category is positioned in total across strikes. Use participant data to ask whether FII options positioning leans bullish or bearish overall, then check the chain for the strikes where OI changed. Do not assume the chain's big strikes belong to FIIs.`,
    psychology:
      `Traders often overreact to a headline such as "FIIs sold ₹3,000 crore" and forget that DIIs bought. Many also read an FII short futures number as a prediction. In practice institutions rebalance, hedge and roll positions for reasons that have nothing to do with a market call. Treat the numbers as evidence that you weigh with price, volume and VIX, not as a signal you must follow.`,
    scenarios: {
      bullish:
        `FII net buying in cash, a rising long-short ratio in index futures and falling VIX would together be consistent with a more positive institutional stance. It supports a bullish view but does not guarantee follow-through.`,
      bearish:
        `FII net selling in cash, rising net short in index futures and rising VIX are consistent with a more cautious or defensive stance. It may reflect a hedge on a large cash book rather than a view.`,
      sideways:
        `Mixed flows, small changes in the long-short ratio and stable VIX suggest no strong institutional push. In that case price action and option-chain levels deserve more weight.`,
    },
    practice: [
      {
        q: `FII cash: buy ₹12,500 cr, sell ₹15,800 cr. DII: buy ₹14,200 cr, sell ₹11,700 cr. What are the nets?`,
        a: `FII net = 12,500 − 15,800 = −₹3,300 cr. DII net = 14,200 − 11,700 = +₹2,500 cr. Combined = −₹800 cr.`,
      },
      {
        q: `FII index futures go from long 90,000 and short 100,000 to long 75,000 and short 130,000. Give the net position and long-short ratio before and after.`,
        a: `Before: net = 90,000 − 100,000 = −10,000; ratio = 90,000 ÷ 100,000 = 0.90. After: net = 75,000 − 130,000 = −55,000; ratio = 75,000 ÷ 130,000 ≈ 0.58. Net short rose by 45,000.`,
      },
      {
        q: `Client net +30,000, DII net +5,000, Pro net +20,000 in index futures. What must FII net be?`,
        a: `Total net across all categories is zero, so FII = −(30,000 + 5,000 + 20,000) = −55,000.`,
      },
      {
        q: `Name two reasons FII short futures can rise without a bearish view.`,
        a: `Hedging a long cash portfolio, and cash-futures arbitrage where the futures leg is short. Position adjustments around expiry are a third reason.`,
      },
    ],
    assignment:
      `For five trading days, download or note the FII/DII cash numbers and the FII index futures long and short contracts from NSE. Build a table with net cash, net futures, long-short ratio and NIFTY close. At the end, write two sentences: what the data suggests, and what it cannot tell you.`,
  },
  topics: [
    {
      t: 1,
      def: `FII cash market activity is the total value of shares that foreign institutional investors bought and sold in the cash (spot) market in a day, reported in ₹ crore. The difference between buy and sell is the net flow: positive means net buying, negative means net selling.`,
      hi: `FII cash market activity matlab ek din mein foreign institutional investors ne cash market mein kitne rupees ke shares khareede aur beche, ₹ crore mein. Buy aur sell ka difference net flow hai: positive matlab net buying, negative matlab net selling.`,
      how: `NSE publishes provisional FII/DII activity after the close, with gross buy, gross sell and net value; verify in the report's note which exchanges the figures cover. A separate and slower source is NSDL's FPI data, which is based on settlement and can differ in coverage and timing from the exchange's provisional numbers. Cash flows move prices in the stocks they buy or sell and can influence sentiment, but a net figure hides gross activity: ₹12,500 cr buy and ₹15,800 cr sell is a very different day from ₹500 cr buy and ₹3,800 cr sell, even if both net to −₹3,300 cr. FPIs also invest via primary issues and block deals, which may not appear the same way in daily cash data.`,
      eg: {
        title: 'Reading one FII cash day (illustrative)',
        text: `FII buy ₹12,500 cr, sell ₹15,800 cr. Net = 12,500 − 15,800 = −₹3,300 cr. Turnover = 12,500 + 15,800 = ₹28,300 cr, so the net sale is about 11.7% of gross turnover (3,300 ÷ 28,300). That means most FII activity was actually two-way trading; the net is a smaller figure than the headline suggests.`,
      },
      tip: `Look at the net and the gross together, and look at several days. One day of FII selling is not a trend.`,
      visual: {
        kind: 'bars',
        title: 'FII cash flow, one illustrative day',
        caption: 'Gross buy and sell are large; the net is the smaller difference.',
        unit: ' cr',
        items: [
          { label: 'Gross buy', value: 12500, tone: 'ice' },
          { label: 'Gross sell', value: 15800, tone: 'ice' },
          { label: 'Net sell', value: 3300, tone: 'bear' },
        ],
      },
    },
    {
      t: 2,
      def: `DII cash market activity is the same type of daily data for domestic institutions: mutual funds, insurance companies, banks and pension funds. DIIs often buy when foreigners sell, partly because mutual funds receive steady SIP money that must be invested.`,
      hi: `DII cash market activity bhi wahi daily data hai, lekin domestic institutions ka: mutual funds, insurance companies, banks aur pension funds. DII aksar tab buy karte hain jab foreigners sell karte hain, kyunki mutual funds ko SIP ka paisa regularly invest karna hota hai.`,
      how: `Mutual funds receive monthly SIP money from retail investors and must deploy it according to their mandates, so their buying can be steady and less sensitive to short-term price moves. Insurance and pension funds invest against long-term liabilities. DII flows can therefore cushion foreign selling, but they do not always match it rupee for rupee. DII data is published together with FII data in the same NSE report and should be read alongside it.`,
      eg: {
        title: 'DIIs absorbing FII selling (illustrative)',
        text: `FII net = −₹3,300 cr, DII net = +₹2,500 cr. Combined = −₹800 cr. DIIs absorbed about 2,500 ÷ 3,300 ≈ 76% of the FII net selling. The remaining ₹800 cr was matched by other participants (for example retail, prop and clients not covered by the two categories).`,
      },
      tip: `DII buying is not automatically a bullish signal; much of it is mechanical SIP deployment.`,
      visual: {
        kind: 'compare',
        title: 'FII versus DII cash behaviour',
        left: { head: 'FII', tone: 'ice', points: ['Global allocation decisions', 'Sensitive to dollar, US yields, risk appetite', 'Large swings in flow'] },
        right: { head: 'DII', tone: 'gold', points: ['Domestic SIP and insurance money', 'More steady and mandate-driven', 'Often buys dips'] },
      },
    },
    {
      t: 3,
      def: `FII index futures positions show how many index futures contracts foreign institutions hold long and short. The net position is long minus short; a negative net means they hold more shorts than longs.`,
      hi: `FII index futures positions batate hain ki foreign institutions ke paas kitne index futures contracts long hain aur kitne short. Net position matlab long minus short; net negative ho toh shorts zyada hain.`,
      how: `Participant-wise open interest lists long and short index futures contracts for FII (and for Client, DII and Pro). FIIs often hold a large cash portfolio, so short index futures may be a hedge. The change from the previous day matters more than the level, because the level contains old positions. Compare the net change with price and with the cash flow, and with the futures basis to see whether pricing is stretched. The data does not say whether an FII short is a view, a hedge or an arbitrage leg.`,
      eg: {
        title: 'Net shorts rise by 45,000 (illustrative)',
        text: `Previous: long 90,000, short 100,000, net −10,000. Now: long 75,000, short 130,000, net −55,000. Net short rose by 45,000. If each contract is one lot of 65 (check the report definition), a NIFTY fall of 100 points would be worth about 55,000 × 65 × 100 = ₹35.75 crore to this net short. A rise of 100 points would cost the same, if it were a pure view; if it is a hedge, the cash portfolio offsets it.`,
      },
      tip: `Always read the change in positions and ask what the same FIIs hold in cash before calling a futures short bearish.`,
      visual: {
        kind: 'bars',
        title: 'FII index futures: long and short contracts',
        caption: 'Longs fell while shorts rose, so the net short grew. Illustrative contracts.',
        items: [
          { label: 'Long before', value: 90000, tone: 'bull' },
          { label: 'Short before', value: 100000, tone: 'bear' },
          { label: 'Long now', value: 75000, tone: 'bull' },
          { label: 'Short now', value: 130000, tone: 'bear' },
        ],
      },
      calc: {
        id: 'futures-pnl',
        preset: { side: 'short', entry: 24000, exit: 23900, lotSize: 65, lots: 55000 },
        why: 'Estimates the P&L on a net short of 55,000 lots for a 100-point move (if one contract = one lot).',
      },
    },
    {
      t: 4,
      def: `FII index options positions show how many call and put contracts FIIs hold long and short. Four numbers matter: call long, call short, put long and put short.`,
      hi: `FII index options positions batate hain ki FII ke paas kitne call aur put contracts long aur short hain. Chaar numbers dekhne hote hain: call long, call short, put long aur put short.`,
      how: `Net call = call long − call short, and net put = put long − put short. Long calls and short puts add bullish delta; short calls and long puts add bearish delta. FIIs can hold spreads, hedges and arbitrage legs, so a single net number can mislead. Because the report is not strike-wise, you cannot tell which strikes the positions are at. A net short put can also be premium-selling income, not a directional view. Use options data as a supporting clue, and never as a standalone signal.`,
      eg: {
        title: 'Four numbers, one reading (illustrative)',
        text: `Call long 2,00,000, call short 1,80,000, put long 1,60,000, put short 2,20,000. Net call = +20,000 (long). Net put = 1,60,000 − 2,20,000 = −60,000 (short). Net long calls and net short puts both lean bullish in delta terms. But the same data could come from an income-selling strategy or a hedged book, so the lean is a hint, not a conclusion.`,
      },
      tip: `Four numbers, not one. Do not mix up long put (bearish or hedge) with short put (bullish or income).`,
      visual: {
        kind: 'matrix',
        title: 'Reading FII option positions',
        caption: 'Each cell is the usual delta lean only. Spreads, hedges and arbitrage can reverse the meaning.',
        xLabels: ['Call', 'Put'],
        yLabels: ['Long (buy)', 'Short (sell)'],
        cells: [
          { head: 'Long call', note: 'Bullish lean', tone: 'bull' },
          { head: 'Long put', note: 'Bearish lean or hedge', tone: 'bear' },
          { head: 'Short call', note: 'Bearish or capped-upside lean', tone: 'bear' },
          { head: 'Short put', note: 'Bullish lean or income', tone: 'bull' },
        ],
      },
    },
    {
      t: 5,
      def: `Client and Pro positions are two of the four NSE participant categories. Client covers individuals, HNIs and other non-member investors trading through brokers. Pro is proprietary trading by brokers and firms using their own money. DII and FII are the other two.`,
      hi: `Client aur Pro NSE ke chaar participant categories mein se do hain. Client mein individuals, HNI aur doosre investors aate hain jo broker ke through trade karte hain. Pro matlab proprietary trading, yaani brokers aur firms ka apne paise se trade. Baaki do FII aur DII hain.`,
      how: `Across the four categories, longs equal shorts, so if FIIs are net short in index futures somebody must be net long: some combination of Client, DII and Pro. Pro includes market makers and arbitrage desks, so its net positions are often hedged and not directional. Client includes both small retail and very large HNIs, so the category is a mix. Looking at who is on the other side of FII helps frame a trade, but it does not reveal individual intent.`,
      eg: {
        title: 'The four nets add to zero (illustrative)',
        text: `Index futures nets: FII −55,000, DII +5,000, Client +30,000, Pro +20,000. Sum = −55,000 + 5,000 + 30,000 + 20,000 = 0. FII's net short is matched by longs across the other three categories. If Pro is mostly arbitrage or market-making, its +20,000 is likely hedged elsewhere, which means the true directional counterparties are mainly Client and DII.`,
      },
      tip: `Net positions across categories always sum to zero. The informative question is who is on the other side and why.`,
      visual: {
        kind: 'bars',
        title: 'Index futures net, by category (contracts, illustrative)',
        caption: 'FII net short is matched by net longs in Client, DII and Pro. Bar size shows the magnitude.',
        items: [
          { label: 'FII net short', value: 55000, tone: 'bear' },
          { label: 'Client net long', value: 30000, tone: 'bull' },
          { label: 'Pro net long', value: 20000, tone: 'bull' },
          { label: 'DII net long', value: 5000, tone: 'bull' },
        ],
      },
    },
    {
      t: 6,
      def: `The participant-wise OI report is NSE's daily file showing open interest by category (Client, DII, FII, Pro) for index futures, stock futures, index options and stock options, with long and short counts.`,
      hi: `Participant-wise OI report NSE ki daily file hai jisme Client, DII, FII aur Pro ke open interest ke long aur short counts hote hain: index futures, stock futures, index options aur stock options ke liye.`,
      how: `NSE releases the report after the market close, and it reflects the previous session. Columns typically include index futures long/short, stock futures long/short, index option call long/short and put long/short, stock options, and totals. You calculate net positions and day-over-day changes yourself. Open interest is the total of open contracts, not volume. The report does not show strikes, expiries or accounts. Download it from the NSE website and check the file layout, because formats can change.`,
      eg: {
        title: 'Building a change table (illustrative)',
        text: `FII index futures yesterday: long 90,000, short 100,000. Today: long 75,000, short 130,000. Change in long = −15,000. Change in short = +30,000. Net change = −15,000 − 30,000 = −45,000. So the report implies FIIs reduced longs and added shorts in the same session, as per the example, which is the kind of change you track each day.`,
      },
      tip: `Track daily changes in a spreadsheet. A single day's level is not useful without the trend.`,
      visual: {
        kind: 'flow',
        title: 'From NSE file to a reading',
        steps: [
          { label: 'Market closes', tone: 'neutral' },
          { label: 'NSE publishes participant OI', note: 'Client, DII, FII, Pro', tone: 'ice' },
          { label: 'You compute net and change', note: 'Long − short, today − yesterday', tone: 'gold' },
          { label: 'Cross-check', note: 'Price, VIX, cash flow, basis', tone: 'ice' },
        ],
      },
    },
    {
      t: 7,
      def: `The FII long-short ratio compares FII long index futures contracts with their short contracts. A ratio below 1 means more shorts than longs, above 1 means more longs than shorts. A related measure is the share of longs in total positions.`,
      hi: `FII long-short ratio FII ke long index futures contracts ko unke short contracts se compare karta hai. Ratio 1 se kam ho toh shorts zyada hain, 1 se zyada ho toh longs zyada hain. Ek aur tareeka hai long share nikalna, yaani long ÷ (long + short).`,
      how: `Ratio = long ÷ short. A falling ratio shows positions moving towards the short side. FIIs also have large cash holdings, so a ratio below 1 does not mean they are net short overall. Different data sources compute it differently (some use long ÷ total), so know the formula before comparing numbers. The ratio is most useful as a trend over days and at extremes relative to its own history. Combine it with price, VIX and cash flow.`,
      eg: {
        title: 'Ratio from 0.90 to 0.58 (illustrative)',
        text: `Before: 90,000 ÷ 100,000 = 0.90. After: 75,000 ÷ 130,000 = 0.577, about 0.58. As a share of total positions the long share fell from 90,000 ÷ 190,000 = 47.4% to 75,000 ÷ 205,000 = 36.6%. Both versions show more short-heavy positioning, but the numbers are not interchangeable.`,
      },
      tip: `State the formula you use. "Long-short ratio" can mean long ÷ short or long ÷ total, and the two give different numbers.`,
      visual: {
        kind: 'gauge',
        title: 'FII long-short ratio (illustrative)',
        caption: 'Below 1 means more shorts than longs. The zones are rules of thumb, not official thresholds.',
        min: 0,
        max: 2,
        value: 0.58,
        zones: [
          { from: 0, to: 0.7, label: 'Short-heavy', tone: 'bear' },
          { from: 0.7, to: 1.3, label: 'Balanced', tone: 'neutral' },
          { from: 1.3, to: 2, label: 'Long-heavy', tone: 'bull' },
        ],
      },
    },
    {
      t: 8,
      def: `NSE participant-wise trading data means two daily reports: participant-wise open interest (positions held) and participant-wise trading volume (contracts traded that day). Together they show both what each category holds and how actively it traded.`,
      hi: `NSE ka participant-wise trading data matlab do daily reports: participant-wise open interest (kaun si position hold hai) aur participant-wise trading volume (us din kitne contracts trade hue). Dono milkar batate hain ki har category ke paas kya hai aur woh kitna active tha.`,
      how: `Open interest shows the stock of positions; volume shows the flow of trades. A category can trade a lot of volume and leave OI unchanged (day trading, rolling). Both reports arrive after the close, use four categories and have no names. Use them as one layer in the full picture: price action, India VIX, futures OI, option chain, cash flows and breadth. For a motive, ask directional trade, hedge or arbitrage, and accept "cannot be determined" when evidence conflicts. Check the NSE website for the current report formats and timing.`,
      eg: {
        title: 'A full reading with limits (illustrative)',
        text: `NIFTY −1.1% near 24,000, VIX +8%, FII cash net −₹3,300 cr, FII net futures −10,000 to −55,000, futures OI rising. Price down with OI rising is commonly read as short build-up. Reading: a defensive institutional stance. Limits: FII might be hedging a cash book, the report shows no strikes and the data is end-of-day, so the conclusion is "consistent with caution", not "FIIs expect a crash".`,
      },
      tip: `Write down what the data supports and what it cannot show. That second line stops you from over-trading a headline.`,
      visual: {
        kind: 'layers',
        title: 'Building the institutional picture',
        caption: 'Start with price, add layers of evidence, then state the limits.',
        layers: [
          { label: 'Price action and VIX', note: 'What the market did', tone: 'gold' },
          { label: 'Futures OI and basis', note: 'Positions and pricing', tone: 'ice' },
          { label: 'Participant data and cash flow', note: 'Who did it, by category', tone: 'ice' },
          { label: 'Option chain', note: 'Strike levels and IV', tone: 'neutral' },
          { label: 'Stated limits', note: 'Hedge, arbitrage, delay', tone: 'neutral' },
        ],
      },
    },
  ],
}
export default m
