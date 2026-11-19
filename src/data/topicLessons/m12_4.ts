import type { ModuleLesson } from '../topicLessonTypes'

/* Module 12.4 — Institutional Positioning.
 * NSE publishes participant-wise open interest and trading volume at the end of each trading day for four categories:
 * Client, DII, FII and Pro, split into index futures, index options (call/put, long/short), stock futures and stock options.
 * All numbers below are illustrative. NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification).
 * Published participant data is gross by category, end-of-day, with no strike-level or intent detail. */
const m: ModuleLesson = {
  moduleId: '12.4',
  intro: `Every evening NSE publishes how many futures and option contracts four groups hold: Clients, DIIs, FIIs and Pro (proprietary) traders. Many traders watch the FII numbers closely. This module shows what those numbers genuinely say, how to read changes day to day, and why they must never be read as a clean buy or sell signal.`,
  introHi: `Har shaam NSE bataata hai ki chaar groups ke paas kitne futures aur option contracts hain: Client, DII, FII aur Pro (proprietary) traders. Bahut se traders FII ke numbers dhyaan se dekhte hain. Is module mein samjhenge ki yeh numbers asal mein kya batate hain, roz ke changes kaise padhein, aur unhe clear buy ya sell signal kyun nahi maanna chahiye.`,
  steps: {
    concept: `Participant-wise data splits the open interest of each F&O segment among four categories. FIIs are foreign portfolio investors registered with SEBI. DIIs are domestic institutions such as mutual funds and insurers. Pro means proprietary traders, who trade on their own account. Clients are everyone else, including retail and HNI traders. Since every contract has a buyer and a seller, the total long and the total short in each segment are equal; the categories simply show who is on which side.`,
    conceptHi: `Participant-wise data har F&O segment ka open interest chaar categories mein baantta hai. FII woh foreign portfolio investors hain jo SEBI ke paas registered hain. DII domestic institutions hain jaise mutual funds aur insurers. Pro matlab proprietary traders jo apne account se trade karte hain. Client baaki sab, jisme retail aur HNI aate hain. Har contract ka ek buyer aur ek seller hota hai, isliye har segment mein total long aur total short barabar hote hain; categories bas dikhati hain ki kaun kis side par hai.`,
    mechanism: `After the close, NSE compiles positions from the clearing data of its members and publishes participant-wise OI and volume. The report lists, for index futures, long and short contracts per category; for index options, call long, call short, put long and put short per category. The numbers are gross contract counts for the whole segment. They do not give strikes, expiries, the purpose of a position (hedge or speculation) or any intraday movement. Because the data is end-of-day, it is useful for context and trend, not for timing an entry.`,
    example: {
      title: 'An illustrative index futures table (contracts)',
      text: `Client long 1,10,000 / short 1,50,000. DII long 15,000 / short 25,000. FII long 1,00,000 / short 70,000. Pro long 75,000 / short 55,000. Total long = 1,10,000 + 15,000 + 1,00,000 + 75,000 = 3,00,000. Total short = 1,50,000 + 25,000 + 70,000 + 55,000 = 3,00,000, so the two sides match as they must. Net positions: Client −40,000, DII −10,000, FII +30,000, Pro +20,000, which sum to zero. FII net long of 30,000 contracts = 19,50,000 units, or about ₹4,680 crore at 24,000. Whether that is a bullish bet or a hedge cannot be told from these numbers alone.`,
    },
    chart: {
      kind: 'bars',
      title: 'Net index futures position by category (illustrative)',
      caption: 'Long minus short in contracts. The four bars add up to zero because every long has a short on the other side.',
      unit: ' contracts',
      items: [
        { label: 'Client', value: -40000, tone: 'bear' },
        { label: 'DII', value: -10000, tone: 'bear' },
        { label: 'FII', value: 30000, tone: 'bull' },
        { label: 'Pro', value: 20000, tone: 'bull' },
      ],
    },
    optionChain: `The option chain shows OI per strike but not who holds it. Participant data shows who holds contracts but only in total, with no strike. The two cannot be joined: you cannot say that the 24,500 call OI belongs to FIIs. Participant data therefore adds only a very rough picture of positioning across the whole option segment, for example whether FIIs are net long or short puts overall. It is not a substitute for strike-level reading and cannot show who initiated any trade.`,
    psychology: `Retail traders like to follow the FII because it feels like following the smart money. But FIIs run many strategies at once: long cash equities hedged with index futures, arbitrage between cash and futures, volatility trades in options and genuine directional views. One long or short number mixes them all. The classic mistake is to see FII net short and assume the market will fall. A short in futures may simply protect a large portfolio of Indian stocks.`,
    scenarios: {
      bullish: `FII index futures long share rises over several days while the index rises and futures premium holds. That agrees with a supported advance. It still does not prove FIIs are directional, because they may be adding longs to cover earlier hedges.`,
      bearish: `FII shorts increase sharply and the long share falls while the index weakens. This may reflect more hedging or genuine bearish views. Without the cash-market position it is unclear which one.`,
      sideways: `FII numbers change little from day to day and the index stays in a range. The data adds no edge. Do not force a conclusion from small changes in positions.`,
    },
    practice: [
      { q: `FII index futures: long 1,00,000 and short 70,000 contracts. Find the net position, the long share and the notional of the net at index 24,000 (lot 65).`, a: `Net = 1,00,000 − 70,000 = +30,000 contracts. Long share = 1,00,000 / 1,70,000 = 58.8%. Net units = 30,000 × 65 = 19,50,000; notional = 19,50,000 × 24,000 = ₹4,680 crore.` },
      { q: `FII was long 1,00,000 and short 70,000 on Monday. On Tuesday long is 1,05,000 and short is 88,000. How did the net position change?`, a: `Monday net +30,000. Tuesday net = 1,05,000 − 88,000 = +17,000. Change = 17,000 − 30,000 = −13,000 contracts. Longs rose by 5,000 but shorts rose by 18,000, so the net fell.` },
      { q: `An FII holds a ₹100 crore portfolio of beta 0.95. How many NIFTY futures (index 24,000, lot 65) fully hedge it?`, a: `Contract value = 24,000 × 65 = ₹15,60,000. Contracts = 100,00,00,000 × 0.95 / 15,60,000 = 609 (approx.). That short position is a hedge, not a bearish view.` },
      { q: `Why can the sum of net positions across the four categories not be anything other than zero?`, a: `Each contract has exactly one long and one short counterparty. If one category is net long, another must be net short by the same amount. The net positions across all categories therefore sum to zero.` },
    ],
    assignment: `Download the latest participant-wise OI file from the NSE website for 5 consecutive trading days. For FII index futures, record long, short, net and long share each day, and note the NIFTY closing level. Write three sentences on what changed, and list two things the data cannot tell you (for example, hedge versus view, strike, intraday timing).`,
  },
  topics: [
    {
      t: 1,
      def: `FII index futures long positions are the number of index futures contracts that foreign portfolio investors hold as buyers at the end of the day. The number tells you how much long exposure that group has in index futures.`,
      hi: `FII index futures long positions matlab din ke ant mein foreign portfolio investors ke paas kitne index futures contracts buyer ke roop mein hain. Yeh batata hai ki us group ka index futures mein kitna long exposure hai.`,
      how: `NSE reports FII long contracts for index futures in its participant-wise data. FIIs may be long futures because they are bullish, because they are covering earlier shorts, because they hold an arbitrage position with a short cash or stock-futures leg, or because they are hedging a short exposure elsewhere. A rise in long contracts is therefore a clue about positioning, not proof of a view. It is more informative when read with FII short contracts and with the index trend.`,
      eg: {
        title: 'Long contracts rising (illustrative)',
        text: `FII long index futures rise from 90,000 to 1,00,000 contracts, an increase of 10,000. In units that is 10,000 × 65 = 6,50,000, with a notional of about 6,50,000 × 24,000 = ₹1,560 crore. If FII shorts fell by 8,000 on the same day, much of this is short covering and not fresh bullishness.`,
      },
      tip: `A rise in longs can be new buying or just short covering. Look at both columns together.`,
      visual: { kind: 'bars', title: 'FII index futures long (illustrative)', unit: ' contracts', items: [{ label: 'Previous day', value: 90000, tone: 'neutral' }, { label: 'Today', value: 100000, tone: 'bull' }] },
    },
    {
      t: 2,
      def: `FII index futures short positions are the contracts that foreign portfolio investors hold as sellers. Shorts are often hedges against a large portfolio of Indian stocks, but they can also be directional bets or one leg of an arbitrage.`,
      hi: `FII index futures short positions woh contracts hain jo foreign portfolio investors ne seller ke roop mein hold kiye hain. Short aksar bade stock portfolio ka hedge hota hai, par yeh directional bet ya arbitrage ka ek leg bhi ho sakta hai.`,
      how: `An FII with a large equity portfolio can sell index futures to cut its market exposure without selling shares, which avoids tax and market impact in the cash market. Others sell futures because they expect a fall. The published data cannot separate these motives. A high FII short count is common when the market looks expensive or global risk is high and has been seen even in rising markets. Reduction in shorts means hedges are being removed or positions closed.`,
      eg: {
        title: 'Shorts rising (illustrative)',
        text: `FII shorts go from 55,000 to 70,000 contracts, an increase of 15,000. In units that is 15,000 × 65 = 9,75,000, notional about 9,75,000 × 24,000 = ₹2,340 crore. If the same day the index rose, those shorts may be hedges added to protect gains rather than a call that the market will fall.`,
      },
      tip: `FII short does not equal FII bearish. Hedging is a major reason for shorts.`,
      visual: { kind: 'bars', title: 'FII index futures short (illustrative)', unit: ' contracts', items: [{ label: 'Previous day', value: 55000, tone: 'neutral' }, { label: 'Today', value: 70000, tone: 'bear' }] },
    },
    {
      t: 3,
      def: `FII options positions are the call and put contracts, long and short, that FIIs hold in index options. NSE reports four numbers: call long, call short, put long and put short.`,
      hi: `FII options positions matlab index options mein FII ke paas jo call aur put contracts hain, long aur short dono. NSE chaar numbers batata hai: call long, call short, put long aur put short.`,
      how: `Net call = call long − call short, and net put = put long − put short. A net long put with a net short call looks bearish, and the reverse looks bullish, but it is only a first impression. Strikes are not shown, so a deep OTM put bought as a hedge counts the same as a near-the-money put bought as a directional bet. Positions are also not delta-adjusted. FIIs use options for hedging, income selling and volatility views, so one number rarely tells the story.`,
      eg: {
        title: 'Reading four numbers (illustrative)',
        text: `FII call long 2,00,000, call short 2,40,000, put long 2,80,000, put short 2,20,000. Net calls = 2,00,000 − 2,40,000 = −40,000 (net short). Net puts = 2,80,000 − 2,20,000 = +60,000 (net long). The combination leans cautious: short calls and long puts. But if the long puts are far out of the money and part of a hedge on a cash portfolio, the net lean may be mostly protective.`,
      },
      tip: `Without strikes and the cash portfolio, option positions only give a rough lean, not a forecast.`,
      visual: { kind: 'bars', title: 'FII index options, net (illustrative)', unit: ' contracts', items: [{ label: 'Net calls', value: -40000, tone: 'bear' }, { label: 'Net puts', value: 60000, tone: 'bull' }] },
    },
    {
      t: 4,
      def: `Participant-wise OI is the open interest in each F&O segment split among Client, DII, FII and Pro. It tells you who holds how many contracts, long and short, in aggregate.`,
      hi: `Participant-wise OI matlab har F&O segment ka open interest Client, DII, FII aur Pro mein baanta hua. Yeh aggregate level par batata hai ki kiske paas kitne contracts hain, long aur short.`,
      how: `NSE publishes it each day after the close. The same data is also published by BSE for its own derivatives. The categories are defined from the clearing and member data: Client means non-institutional customers; DII includes mutual funds, insurance companies and banks; FII refers to foreign portfolio investors; Pro refers to proprietary positions of trading members. For each category the net position is long − short, and the net positions across all categories sum to zero.`,
      eg: {
        title: 'Net by category (illustrative)',
        text: `Index futures: Client long 1,10,000, short 1,50,000, net −40,000. DII 15,000 / 25,000, net −10,000. FII 1,00,000 / 70,000, net +30,000. Pro 75,000 / 55,000, net +20,000. Check: −40,000 − 10,000 + 30,000 + 20,000 = 0. Retail and HNI traders (Client) are net short against institutions and prop traders, which is a snapshot, not a rule.`,
      },
      tip: `Always check that nets sum to zero. It reminds you that someone is on the other side of every position.`,
      visual: { kind: 'bars', title: 'Long and short by category (illustrative, contracts)', unit: ' contracts', items: [{ label: 'Client long', value: 110000, tone: 'bull' }, { label: 'Client short', value: 150000, tone: 'bear' }, { label: 'FII long', value: 100000, tone: 'bull' }, { label: 'FII short', value: 70000, tone: 'bear' }, { label: 'Pro long', value: 75000, tone: 'bull' }, { label: 'Pro short', value: 55000, tone: 'bear' }] },
    },
    {
      t: 5,
      def: `The FII long-short ratio compares FII long contracts with FII short contracts, as a ratio (long ÷ short) or as the long share (long ÷ long + short). A high long share means FIIs hold more long than short exposure in that segment.`,
      hi: `FII long-short ratio FII ke long contracts ko short contracts se compare karta hai, ya to ratio (long ÷ short) ya long share (long ÷ long + short) ke roop mein. Long share zyada hai toh matlab us segment mein FII ke paas long exposure short se zyada hai.`,
      how: `Traders track this ratio over time and look at its changes rather than a single reading. Different websites use different definitions, so use one consistently. A long share around 50% means balanced. Extreme readings, for example below 20% or above 80%, have occurred, but there is no universally agreed threshold and the ratio has coexisted with both rising and falling markets. Because short futures may be hedges, a low long share can also indicate a large hedged cash portfolio.`,
      eg: {
        title: 'Computing the ratio (illustrative)',
        text: `FII index futures: long 1,00,000, short 70,000. Long share = 1,00,000 / 1,70,000 = 58.8%. Long to short ratio = 1,00,000 / 70,000 = 1.43. After a day when shorts rise to 88,000 and longs to 1,05,000: long share = 1,05,000 / 1,93,000 = 54.4%. The share fell 4.4 percentage points, showing a relative shift to shorts.`,
      },
      tip: `Use the change in the ratio and one definition. A single level has no fixed meaning.`,
      visual: { kind: 'gauge', title: 'FII long share of index futures (illustrative)', min: 0, max: 100, value: 58.8, unit: '%', zones: [{ from: 0, to: 30, label: 'Short-heavy', tone: 'bear' }, { from: 30, to: 70, label: 'Mixed', tone: 'gold' }, { from: 70, to: 100, label: 'Long-heavy', tone: 'bull' }] },
    },
    {
      t: 6,
      def: `Client positions are the contracts held by the non-institutional customers of brokers, which is mostly retail and HNI traders. In many published tables they sit on the opposite side of the institutions in index futures.`,
      hi: `Client positions un contracts ko kehte hain jo brokers ke non-institutional customers ke paas hain, jisme zyadatar retail aur HNI traders aate hain. Kai published tables mein yeh index futures mein institutions ke opposite side par dikhte hain.`,
      how: `Client positions are measured the same way as the others: long, short and net per segment. Because the net of all categories is zero, a large client net short in futures means other categories are net long by the same amount. In options, clients are often large net buyers of options by count. That does not mean clients are always wrong: the data is a snapshot of aggregate positions, not of profit or intelligence. It also mixes thousands of different strategies.`,
      eg: {
        title: 'Client vs others (illustrative)',
        text: `Client index futures: long 1,10,000, short 1,50,000, net −40,000. Others: DII −10,000, FII +30,000, Pro +20,000, giving +40,000. The two sums are equal and opposite. The client net of −40,000 contracts is 40,000 × 65 = 26,00,000 units, or about ₹6,240 crore at 24,000.`,
      },
      tip: `Do not turn client positioning into a contrarian rule without testing it. Samples are small and regimes change.`,
      visual: { kind: 'compare', title: 'Clients vs institutions and prop (net, illustrative)', left: { head: 'Client', tone: 'bear', points: ['Long 1,10,000', 'Short 1,50,000', 'Net −40,000'] }, right: { head: 'DII + FII + Pro', tone: 'bull', points: ['Net −10,000 + 30,000 + 20,000', 'Net +40,000', 'Exact opposite of Client'] } },
    },
    {
      t: 7,
      def: `Proprietary (Pro) positions are the holdings of trading members who trade for their own account, not for customers. Many are short-term, arbitrage-driven and hedged, so they say little about direction.`,
      hi: `Proprietary (Pro) positions un trading members ke holdings hain jo customers ke liye nahi, apne account ke liye trade karte hain. Inme se bahut saare short-term, arbitrage-driven aur hedged hote hain, isliye direction ke baare mein kam batate hain.`,
      how: `Prop desks run market making, arbitrage between cash and futures, calendar spreads and volatility strategies. These often hold futures against offsetting stock or option positions that do not appear in the index futures line. As a result, a large Pro long or short in index futures may be fully hedged elsewhere. Changes in Pro positions around expiry are common as spreads are rolled and arbitrage positions unwound.`,
      eg: {
        title: 'A hedged Pro long (illustrative)',
        text: `Pro index futures long 75,000 and short 55,000, net +20,000, which is 20,000 × 65 = 13,00,000 units. If part of this net long is held against a short stock-futures basket that does not show in the index line, the economic exposure to a market rise is far less than 13,00,000 units of NIFTY. The table alone cannot say.`,
      },
      tip: `Treat Pro changes around expiry as rolling and arbitrage first, view second.`,
      visual: { kind: 'flow', title: 'Why a Pro future may not be a view', steps: [{ label: 'Long index future', note: 'Visible in data', tone: 'ice' }, { label: 'Short stock futures', note: 'Not in index line', tone: 'gold' }, { label: 'Hedged position', note: 'Little market exposure', tone: 'neutral' }] },
    },
    {
      t: 8,
      def: `Daily position changes are the day-to-day differences in each category's long and short contracts. Changes often matter more than the level, because they show where positioning is moving.`,
      hi: `Daily position changes matlab har category ke long aur short contracts mein roz ka difference. Aksar level se zyada change maayne rakhta hai, kyunki woh dikhata hai ki positioning kis taraf ja rahi hai.`,
      how: `Subtract yesterday's number from today's for each of long, short and net. A fall in net long may come from longs being sold or from new shorts being added; the table shows long and short separately for this reason. Day-to-day numbers include rollover noise near expiry, so compare similar days in the cycle. A move that continues over several days is more informative than a single day.`,
      eg: {
        title: 'A one-day change (illustrative)',
        text: `Monday FII futures: long 1,00,000, short 70,000, net +30,000. Tuesday: long 1,05,000 (+5,000), short 88,000 (+18,000), net +17,000. Change in net = 5,000 − 18,000 = −13,000 contracts, or −13,000 × 65 = −8,45,000 units. Most of the shift came from new shorts rather than longs being closed. Whether those are hedges is not visible.`,
      },
      tip: `Read the change in long and short separately. The net hides how the move happened.`,
      visual: { kind: 'bars', title: 'FII change Mon to Tue (illustrative)', unit: ' contracts', items: [{ label: 'Change in long', value: 5000, tone: 'bull' }, { label: 'Change in short', value: 18000, tone: 'bear' }, { label: 'Change in net', value: -13000, tone: 'bear' }] },
    },
    {
      t: 9,
      def: `Institutional hedging means using futures or options to reduce the market risk of a large portfolio without selling it. The hedge shows up as a short position in index futures or as long puts, and it reflects caution about risk, not necessarily a forecast.`,
      hi: `Institutional hedging matlab bade portfolio ko beche bina uska market risk kam karne ke liye futures ya options use karna. Hedge index futures mein short position ya long puts ke roop mein dikhta hai, aur yeh risk ke prati savdhani dikhata hai, zaroori nahi ki forecast ho.`,
      how: `The number of futures needed is (portfolio value × beta) ÷ notional of one contract. An institution selling that many futures offsets index moves, while stock-specific returns remain. Hedges are changed when risk appetite changes: more shorts before events and fewer when risk fades. Index puts are an alternative that cap downside at a cost (premium). Because the hedge and the portfolio are in different places, the published futures number captures only one side.`,
      eg: {
        title: 'Sizing a hedge (illustrative)',
        text: `Portfolio ₹100 crore, beta 0.95, one NIFTY lot = 24,000 × 65 = ₹15,60,000. Contracts = 100,00,00,000 × 0.95 / 15,60,000 ≈ 609. If the index falls 5%, the portfolio may fall about 4.75% (₹4.75 crore) while the hedge would gain roughly 609 × 1,200 × 65 = ₹4.75 crore. The hedge is imperfect in practice because beta changes and the portfolio is not the index.`,
      },
      tip: `A hedge reduces risk both ways. Selling futures protects against falls and gives up gains.`,
      visual: { kind: 'flow', title: 'A portfolio hedge', steps: [{ label: 'Hold stocks', note: '₹100 crore, beta 0.95', tone: 'ice' }, { label: 'Sell ~609 futures', note: 'Offsets index moves', tone: 'bear' }, { label: 'Market falls 5%', note: 'Stocks lose, futures gain', tone: 'gold' }, { label: 'Net change small', note: 'Residual risk remains', tone: 'neutral' }] },
      calc: { id: 'hedge-ratio', preset: { portfolio: 1000000000, beta: 0.95, futuresNotional: 1560000 }, why: 'Number of futures that hedge the example portfolio.' },
    },
    {
      t: 10,
      def: `Participant data has limits: it is end-of-day, aggregate, gross by category and gives no strike, purpose or the offsetting position in cash or other contracts. It can add context but cannot reveal intent.`,
      hi: `Participant data ki limits hain: yeh end-of-day hai, aggregate hai, category ke hisaab se gross hai aur isme strike, purpose ya cash ya doosre contracts mein offsetting position nahi dikhti. Yeh context de sakta hai par intent nahi bata sakta.`,
      how: `Key limits: (1) timing, since the data arrives after the close and positions can change by the next morning; (2) hedging, since a short future may protect a stock portfolio; (3) spreads and arbitrage, which show as long and short in different contracts; (4) options, where strike and delta are missing; (5) category mixing, as each category holds hundreds of different strategies; (6) it never tells who initiated a trade, like all OI data. Use it as one input, not a signal, and test any rule you derive on past data with costs.`,
      eg: {
        title: 'Two stories, same data (illustrative)',
        text: `FII net short rises by 25,000 contracts (25,000 × 65 = 16,25,000 units). Story A: FIIs turn bearish. Story B: FIIs bought ₹3,900 crore of stocks in the cash market that week and sold futures to hedge, so net market exposure rose. Both fit the numbers, and the participant table cannot choose between them. Cash-market FII flows and portfolio data would be needed.`,
      },
      tip: `If two opposite stories fit the data, the data is not a signal. Look for confirmation elsewhere.`,
      visual: { kind: 'compare', title: 'What the data shows and does not show', left: { head: 'Shows', tone: 'ice', points: ['Contracts by category', 'Long and short counts', 'Day-to-day changes'] }, right: { head: 'Does not show', tone: 'gold', points: ['Strike or expiry mix', 'Hedge or view', 'Intraday moves', 'Who initiated the trade'] } },
    },
  ],
  tools: [{ id: 'hedge-ratio', why: 'Futures needed to hedge a portfolio.' }, { id: 'pcr', why: 'Put-call ratio from OI.' }],
}
export default m
