import type { ModuleLesson } from '../topicLessonTypes'

/* Module 16.1 — Institutional Trading Behaviour.
 * All sizes, prices and margins are constructed for teaching (illustrative). NIFTY ≈ 24,000, futures lot 65 (check the current NSE contract specification).
 * One NIFTY futures lot at 24,000 = 24,000 × 65 = ₹15,60,000 notional. Rules and windows for block deals, algos and margins change: verify with NSE/SEBI. */
const m: ModuleLesson = {
  moduleId: '16.1',
  intro: `Institutions (mutual funds, insurers, pension funds, foreign portfolio investors, proprietary desks) trade in sizes that move prices if done carelessly. This module explains how they split orders, use algorithms, hedge, rebalance, accumulate and distribute, and manage liquidity and risk. The aim is to understand motives, not to guess what any single institution is doing.`,
  introHi: `Institutions (mutual funds, insurers, pension funds, foreign portfolio investors, proprietary desks) itne bade size mein trade karte hain ki laparwahi se karne par price hil jaye. Is module mein samjhaya gaya hai ki woh orders kaise todte hain, algorithms, hedging, rebalancing, accumulation, distribution aur liquidity tatha risk kaise manage karte hain. Maqsad unke motives samajhna hai, kisi ek institution ka kya kar raha hai yeh guess karna nahi.`,
  steps: {
    concept: `An institution's problem is size. Buying ₹500 crore of NIFTY exposure in one order would push the price against it, so institutions spread the order over time, venues and instruments. Their motives are also different from a retail trader's: many are hedging, rebalancing or meeting inflows and redemptions, not predicting direction. Their footprints are visible only in aggregate data such as participant-wise OI and block or bulk deal disclosures.`,
    conceptHi: `Institution ki problem size hai. ₹500 crore ka NIFTY exposure ek order mein khareedne se price unke khilaf chali jaati, isliye woh order ko time, venues aur instruments mein baant dete hain. Unke motives bhi retail trader se alag hote hain: kai hedge, rebalance ya inflow-redemption manage kar rahe hote hain, direction predict nahi kar rahe. Unke footprints sirf aggregate data mein dikhte hain, jaise participant-wise OI aur block ya bulk deal disclosures.`,
    mechanism: `Orders go through the broker or direct market access to NSE's matching engine; the trade is guaranteed by the clearing corporation (NSE Clearing), which collects margin (SPAN plus exposure for derivatives). Large orders are cut into child orders by execution algorithms (TWAP, VWAP, participation-rate) that aim to match the market's volume and keep the impact small. Hedges are put on in futures or options, since futures are cheap in cash terms; a position is closed by an opposite trade. All of it is subject to exchange risk controls and SEBI rules.`,
    example: {
      title: 'Buying ₹500 crore of NIFTY exposure through futures (illustrative)',
      text: `One NIFTY futures lot at 24,000 is 24,000 × 65 = ₹15,60,000 of exposure. ₹500 crore = 5,00,00,00,000 rupees divided by 15,60,000 is about 3,205 lots. A fund that sent 3,205 lots as one order would clear many price levels. Instead, an algorithm might send about 32 lots at a time, 100 times over the day, aiming to stay a small share of the volume and finish near the day's VWAP.`,
    },
    chart: {
      kind: 'flow',
      title: 'From a portfolio decision to executed trades',
      caption: 'Each step is designed to hide size and limit market impact.',
      steps: [
        { label: 'Decision', note: 'Fund manager or risk team', tone: 'gold' },
        { label: 'Execution plan', note: 'Algo type, limits, time window', tone: 'ice' },
        { label: 'Child orders', note: 'Small slices at the exchange', tone: 'neutral' },
        { label: 'Clearing', note: 'NSE Clearing guarantees; margin collected', tone: 'ice' },
        { label: 'Reporting', note: 'Disclosures and participant data', tone: 'gold' },
      ],
    },
    optionChain: `Institutional activity appears on the option chain mainly as hedging: protective puts, covered calls and collars, and as the balancing trades of market makers who serve them. Large OI at a strike can be an institution's hedge and not a directional bet. Participant-wise OI data (from NSE after the close) gives category totals in index options and futures, but never the intent or the pairs.`,
    psychology: `Institutions are rule-bound: mandates, risk limits and benchmarks drive them as much as views. Their pressure points are redemptions in a fall (forced selling), benchmark tracking (they cannot hold too much cash) and quarter-end window dressing. A retail trader's mistake is to imagine a single smart investor behind every move; most days the flow is the sum of many mechanical decisions.`,
    scenarios: {
      bullish: `Steady inflows into funds lead to continued buying in slices, so dips may be bought, but the buying is paced and not a promise. A sudden rise on news is chased by retail while institutions work their orders over days.`,
      bearish: `Redemptions or a risk-off event force selling. Institutions often hedge with index futures or puts first because they are quicker than selling hundreds of stocks. That hedging can show up as rising put OI and short futures.`,
      sideways: `In quiet markets institutions rebalance, roll hedges and sell covered calls for income. This can dampen movement, but it ends when volatility returns.`,
    },
    practice: [
      {
        q: `NIFTY futures price is 24,000 and lot size 65. How many lots are needed for ₹500 crore of exposure? (1 crore = 1,00,00,000)`,
        a: `Notional per lot = 24,000 × 65 = ₹15,60,000. ₹500 crore = ₹5,00,00,00,000. Lots = 5,00,00,00,000 / 15,60,000 = 3,205.1, about 3,205 lots.`,
      },
      {
        q: `A ₹50 crore equity portfolio has a beta of 0.9. How many NIFTY futures lots at 24,000 (lot 65) fully hedge its market risk?`,
        a: `Hedge value = 0.9 × ₹50 crore = ₹45 crore = 45,00,00,000. Lots = 45,00,00,000 / 15,60,000 = 288.5, so about 288 lots short. Basis risk and beta changes mean the hedge is approximate.`,
      },
      {
        q: `A fund has ₹1,000 crore, 60% equity and 40% debt. Equity falls 10% and debt is unchanged. How much equity must it buy to return to 60%?`,
        a: `Equity becomes 600 × 0.9 = 540; debt stays 400; total 940. Equity share = 540 / 940 = 57.4%. Target equity = 0.6 × 940 = 564. Buy 564 − 540 = ₹24 crore of equity (funded by selling debt).`,
      },
    ],
    assignment: `Download one day's participant-wise OI data from NSE for index futures and index options. Write the long, short and net numbers for FPI, DII, Pro and Client, and list two non-directional reasons (such as hedging or arbitrage) that could produce each net number. Do not write a market forecast from it.`,
  },
  topics: [
    {
      t: 1,
      def: `Institutional order execution is the process of getting a very large order done with as little price impact as possible. The order is split into many small pieces and spread over time. The aim is to get an average price close to the market's average.`,
      hi: `Institutional order execution ka matlab hai bahut bade order ko kam se kam price impact ke saath poora karna. Order ko kai chhote tukdon mein baant kar time mein faila diya jata hai. Maqsad hai ki average price market ke average ke kareeb rahe.`,
      how: `A trader or an execution algorithm decides how much to trade each minute, usually as a small part of the market volume. Orders are placed passively (waiting in the book at a limit price) or aggressively (taking the best available price), depending on urgency. Costs include the bid-ask spread, the market impact, brokerage and statutory charges. Success is judged against a benchmark such as the day's VWAP or the arrival price.`,
      eg: {
        title: 'Splitting 3,205 lots (illustrative)',
        text: `A fund wants about 3,205 NIFTY futures lots (₹500 crore at 24,000, lot 65). It sends roughly 32 lots every few minutes, 100 times through the day. If each slice moved the price by only 0.3 point instead of the whole order moving it by 10 points, the cost saving per unit is large: 10 − 0.3 = 9.7 points × 65 = ₹630 per lot, a saving of about ₹20 lakh across 3,205 lots, before adding other costs.`,
      },
      tip: `Large orders are priced by the impact they make, so a calm tape may hide a large order being worked.`,
      visual: {
        kind: 'bars',
        title: 'Slicing reduces the average impact (illustrative points)',
        unit: ' pts',
        items: [
          { label: 'One large order', value: 10, tone: 'bear' },
          { label: 'Sliced into 100', value: 0.3, tone: 'ice' },
        ],
      },
      calc: { id: 'lot-value', preset: { premium: 24000, lotSize: 65, lots: 3205, spot: 24000, marginPct: 12 }, why: 'Contract value of 3,205 lots (the exposure) and an illustrative margin.' },
    },
    {
      t: 2,
      def: `A large block order is a single trade that is much bigger than the usual size on the screen. In the cash market, exchanges allow block deals in a special window at a price close to the market; in derivatives, large orders are usually split. Large blocks can move prices or show up in the data afterwards.`,
      hi: `Large block order ek aisa trade hai jo screen ke usual size se bahut bada hota hai. Cash market mein exchanges block deal ke liye ek alag window deti hain, market price ke kareeb; derivatives mein bade orders aksar todkar diye jaate hain. Bade blocks price hila sakte hain ya baad mein data mein dikhte hain.`,
      how: `If a big buy order meets a thin book, it walks up the ask side: the first slice trades at the best ask, the next at a higher price. The average price paid is above the best ask, and the difference is impact cost. NSE publishes bulk and block deal data for the cash market after the close, with rules on minimum size and timing set by the exchange; check the current NSE circulars for the window and size. Disclosures show a trade took place, not what the buyer will do next.`,
      eg: {
        title: 'Walking the ask side (illustrative)',
        text: `A buyer takes 650 units (10 lots) of NIFTY futures against asks of 195 at 24,010, 260 at 24,011 and 325 at 24,012. It fills 195 at 24,010, 260 at 24,011 and the last 195 at 24,012. Average = (195 × 24,010 + 260 × 24,011 + 195 × 24,012) / 650 = 15,607,150 / 650 = 24,011.0. The best ask was 24,010, so the impact is 1.0 point or ₹65 per lot.`,
      },
      tip: `Impact cost grows faster than order size, which is why institutions rarely hit the book with the whole order.`,
      visual: {
        kind: 'orderBook',
        title: 'A 650-unit buy walks the ask side (illustrative)',
        bids: [[24009, 300], [24008, 450], [24007, 520]],
        asks: [[24010, 195], [24011, 260], [24012, 325]],
      },
      calc: { id: 'order-book-impact', preset: { side: 'buy', qty: 650, refPrice: 24010, book: '24010:195;24011:260;24012:325' }, why: 'Average price and impact cost for the 650-unit buy.' },
    },
    {
      t: 3,
      def: `Algorithmic execution uses programs to place and manage orders by rules, for instance to match the time-weighted or volume-weighted average price. Institutions use algos to spread size and avoid leaving a signature. They also run under exchange and broker risk checks.`,
      hi: `Algorithmic execution mein programs rules ke hisaab se orders lagate aur manage karte hain, jaise time-weighted ya volume-weighted average price match karna. Institutions algos se size faila kar apna signature chhupate hain. Yeh exchange aur broker ke risk checks ke andar chalte hain.`,
      how: `Common algos are TWAP (equal slices over time), VWAP (slices in proportion to the expected intraday volume curve) and participation (a fixed percentage of the live volume). Some add price limits and pause when the spread widens. In India, algorithmic trading is regulated by SEBI and the exchanges, with approvals and order-level checks required; the exact framework for each category of participant keeps evolving, so verify the current rules. A regular pattern of slices can sometimes be detected, but the evidence is statistical.`,
      eg: {
        title: 'VWAP of three fills (illustrative)',
        text: `An algo buys 130 units at 24,010, 130 at 24,012 and 130 at 24,011. VWAP = (130 × 24,010 + 130 × 24,012 + 130 × 24,011) / 390 = 9,364,290 / 390 = 24,011.0. TWAP with equal quantities gives the same value here. If the market's own VWAP for the period is 24,011.5, the algo beat it by 0.5 point.`,
      },
      tip: `An algo's goal is to match an average, not to catch a top or bottom.`,
      visual: {
        kind: 'compare',
        title: 'TWAP vs VWAP',
        left: { head: 'TWAP', tone: 'gold', points: ['Equal slices over time', 'Simple, predictable', 'Ignores the volume pattern'] },
        right: { head: 'VWAP', tone: 'ice', points: ['Slices follow the volume curve', 'Trades more at busy times', 'Needs a volume forecast'] },
      },
      calc: { id: 'vwap-twap', preset: { fills: '24010:130;24012:130;24011:130' }, why: 'VWAP and TWAP of the algo fills.' },
    },
    {
      t: 4,
      def: `Hedging is taking an opposite position to reduce the risk of an existing holding. An institution with a big stock portfolio can sell index futures or buy puts so that a market fall is offset. Hedging does not aim for profit; it reduces exposure.`,
      hi: `Hedging ka matlab hai maujooda holding ka risk kam karne ke liye ulti position lena. Bada stock portfolio rakhne wala institution index futures bech sakta hai ya puts khareed sakta hai, taaki market girne par nuksan kam ho. Hedging ka maqsad profit nahi, exposure kam karna hai.`,
      how: `The hedge ratio is the portfolio value times its beta (sensitivity to the index) divided by the value of one futures contract. A hedge with futures gives up the upside on the hedged part; a hedge with puts costs a premium but keeps the upside. Hedges are imperfect: the portfolio may not follow the index (basis and tracking risk) and beta changes. Institutional hedges are one reason why put OI and short futures positions rise without any bearish view.`,
      eg: {
        title: 'Hedging a ₹50 crore portfolio (illustrative)',
        text: `Portfolio ₹50 crore, beta 0.9. Hedge value = 0.9 × 50 crore = ₹45 crore. One futures lot = 24,000 × 65 = ₹15,60,000. Lots = 45,00,00,000 / 15,60,000 = 288.5, about 288 lots short. If NIFTY falls 5% the futures gain about 5% × ₹45 crore = ₹2.25 crore, offsetting about the same fall in the portfolio's expected loss (0.9 × 5% × ₹50 crore = ₹2.25 crore).`,
      },
      tip: `Short futures or long puts by an institution is often protection, not a bearish forecast.`,
      visual: {
        kind: 'flow',
        title: 'How a portfolio hedge is sized',
        steps: [
          { label: 'Portfolio value', note: '₹50 crore', tone: 'gold' },
          { label: 'Times beta', note: '0.9 gives ₹45 crore', tone: 'ice' },
          { label: 'Divide by lot value', note: '₹15,60,000', tone: 'neutral' },
          { label: 'Sell lots', note: 'About 288', tone: 'bear' },
        ],
      },
      calc: { id: 'hedge-ratio', preset: { portfolio: 500000000, beta: 0.9, futuresNotional: 1560000 }, why: 'Lots to sell for the beta hedge.' },
    },
    {
      t: 5,
      def: `Portfolio rebalancing is trading back to target weights after prices have moved. If equities rise, a fund that wants 60% in equity sells some. If they fall, it buys. It is a rule-based reaction to price, not a market call.`,
      hi: `Portfolio rebalancing matlab prices badalne ke baad wapas target weights par aana. Equities badhein toh 60% equity chahne wala fund kuch bechta hai; girein toh kharidta hai. Yeh price ka rule-based jawab hai, market call nahi.`,
      how: `Funds with fixed allocations, such as balanced or asset-allocation schemes and pension portfolios, have bands (for example 60% plus or minus 2%). When the weight leaves the band, they trade the difference. Rebalancing creates counter-trend flows: buying after falls, selling after rises. Quarter-end and month-end are common times. Timing is spread out, so it rarely appears as one visible trade.`,
      eg: {
        title: 'A 60:40 fund after a 10% fall (illustrative)',
        text: `Start ₹1,000 crore: equity 600 and debt 400. Equity falls 10% to 540; total is 940; equity share is 540 / 940 = 57.4%, outside a 58 to 62 band. Target equity = 0.6 × 940 = ₹564 crore. The fund buys 564 − 540 = ₹24 crore of equity, selling debt to fund it. It buys into the fall because its rule says so.`,
      },
      tip: `Rebalancing flows lean against the trend by design; do not read them as a bullish view.`,
      visual: {
        kind: 'bars',
        title: 'Equity weight before and after a 10% fall (₹ crore)',
        unit: ' cr',
        items: [
          { label: 'Equity at start', value: 600, tone: 'ice' },
          { label: 'Equity after fall', value: 540, tone: 'bear' },
          { label: 'Equity target', value: 564, tone: 'gold' },
        ],
      },
      calc: { id: 'drawdown-recovery', preset: { drawdownPct: 10 }, why: 'Gain needed to recover a 10% fall (11.1%).' },
    },
    {
      t: 6,
      def: `Risk reduction is cutting exposure when risk limits are hit, a volatility spike occurs or events approach. Institutions do this by selling holdings, selling futures or buying protection. It is driven by limits and not always by a change of view.`,
      hi: `Risk reduction matlab jab risk limits touch ho jaayein, volatility achanak badhe ya events paas hon, tab exposure kam karna. Institutions yeh holdings bech kar, futures bech kar ya protection kharid kar karte hain. Yeh limits se chalta hai, view badalne se zaroori nahi.`,
      how: `Desks have limits on value at risk, drawdown and exposure. When volatility rises, the same position has a bigger risk number, so a limit can be breached without any new trade, and positions are cut. The fastest way to reduce index exposure is to sell futures, because it takes one order instead of hundreds of stock orders. Such de-risking can add to a fall, which is why sharp declines often feel self-reinforcing.`,
      eg: {
        title: 'Cutting exposure with futures (illustrative)',
        text: `A desk with ₹150 crore of long equity exposure decides to cut 10% quickly. It needs to sell futures worth ₹15 crore (₹15,00,00,000). Lots = 15,00,00,000 / 15,60,000 = 96.2, so about 96 lots at 24,000. One order does the job in minutes; the stock-by-stock sales can follow later.`,
      },
      tip: `Risk cutting is driven by limits, so a quick fall in the index can be partly mechanical.`,
      visual: {
        kind: 'flow',
        title: 'Why a volatility jump leads to selling',
        steps: [
          { label: 'Volatility rises', note: 'VIX jumps', tone: 'bear' },
          { label: 'Risk number rises', note: 'Same position, higher VaR', tone: 'gold' },
          { label: 'Limit breached', note: 'Risk team acts', tone: 'bear' },
          { label: 'Sell futures or stocks', note: 'Adds to the fall', tone: 'bear' },
        ],
      },
    },
    {
      t: 7,
      def: `Position accumulation is the gradual building of a large holding, normally when buyers do not want to move the price. It happens over days or weeks. On a chart it may look like a quiet sideways range with supportive volume.`,
      hi: `Position accumulation ka matlab dheere dheere bada holding banana, jab buyers price ko hilana nahi chahte. Yeh dinon ya hafton mein hota hai. Chart par yeh shaant sideways range jaisa dikh sakta hai jisme volume support karta hai.`,
      how: `An accumulating buyer limits the share of daily volume it takes, for example 2%, and buys on dips with passive orders. This keeps the price from rising. A range with higher volume on up moves and lower volume on pullbacks is the textbook sign, but it can also be a pause before a fall. It is visible only in hindsight, and the same chart can come from many unrelated participants.`,
      eg: {
        title: 'Two days at 2% of volume (illustrative)',
        text: `A fund wants 2,000 lots. If the typical daily volume is 50,000 lots and it caps itself at 2%, it can buy 50,000 × 0.02 = 1,000 lots a day, finishing in two days. At 10% participation it would finish in 0.4 day but would push the price more.`,
      },
      tip: `Accumulation is a hypothesis you can only judge afterwards; do not label a range as accumulation in real time without evidence.`,
      visual: { kind: 'candles', title: 'Quiet range sometimes read as accumulation', pattern: 'accumulation' },
    },
    {
      t: 8,
      def: `Position distribution is the gradual selling of a large holding, typically into strength or high volume, so that the seller does not push the price down. It is the mirror image of accumulation.`,
      hi: `Position distribution matlab bade holding ko dheere dheere bechna, aksar strength ya high volume mein, taaki seller price ko neeche na dhakele. Yeh accumulation ka ulta hai.`,
      how: `A seller who wants to exit a large holding gives out supply into rallies and into news-driven volume where buyers are plentiful. Price may stall at a high with heavy volume and repeated failures to go higher. The same pattern can also be profit taking before a continuation, so a high-volume stall is a question and not an answer. Confirm with a break below the range and with other data.`,
      eg: {
        title: 'Selling into strength (illustrative)',
        text: `A fund wants to sell 2,000 lots. On a day when NIFTY rallies 200 points and volume is 1.5 times normal (75,000 lots), it sells 2% of the volume = 1,500 lots without much impact. On a quiet day with 50,000 lots the same 2% would be 1,000 lots, so it would take longer.`,
      },
      tip: `Heavy volume with no progress may be distribution, but wait for price to confirm it.`,
      visual: { kind: 'candles', title: 'Stall at highs, sometimes read as distribution', pattern: 'distribution' },
    },
    {
      t: 9,
      def: `Liquidity management is making sure an institution has enough cash and easy-to-sell holdings to meet margin calls, redemptions and new opportunities. Derivative positions need margin even when they are hedges.`,
      hi: `Liquidity management ka matlab yeh pakka karna ki institution ke paas margin calls, redemptions aur naye mauke ke liye kaafi cash aur aasaani se bik sakne wale holdings ho. Derivative positions ke liye hedge hone par bhi margin chahiye hota hai.`,
      how: `Funds hold a cash buffer, short-dated instruments and liquid stocks for redemptions. Derivatives need margin deposited with the clearing member (SPAN plus exposure margin; rates change, so check NSE). When volatility rises, margins can rise and require more cash at a time when prices are falling. Illiquid holdings are hard to sell quickly, so funds may sell the liquid ones first, which hits blue chips in a fall even if they were not the problem.`,
      eg: {
        title: 'Margin on a futures hedge (illustrative rate)',
        text: `A hedge of 288 lots has a notional of 288 × ₹15,60,000 = ₹44.93 crore. At an illustrative combined margin of 12%, the cash or collateral needed is about ₹5.39 crore. If margins rise to 15% in a volatile week, the need rises to about ₹6.74 crore, an extra ₹1.35 crore, just when the portfolio may be losing value. The percentages are examples; actual margins are set by the exchange and clearing corporation.`,
      },
      tip: `Margin is a hidden cost of hedging: plan the cash before you open the hedge.`,
      visual: {
        kind: 'bars',
        title: 'Margin need at 12% and 15% for 288 lots (illustrative, ₹ crore)',
        unit: ' cr',
        items: [
          { label: 'At 12%', value: 5.39, tone: 'ice' },
          { label: 'At 15%', value: 6.74, tone: 'gold' },
        ],
      },
      calc: { id: 'lot-value', preset: { premium: 24000, lotSize: 65, lots: 288, spot: 24000, marginPct: 12 }, why: 'Contract value and an illustrative margin for 288 lots.' },
    },
    {
      t: 10,
      def: `Institutional derivatives positioning is how large investors hold futures and options, mostly as hedges, income strategies and arbitrage. NSE publishes participant-wise data (FPI, DII, Pro and Client) for open interest and volumes after the close. It shows category totals, not the reasons.`,
      hi: `Institutional derivatives positioning ka matlab hai ki bade investors futures aur options kaise hold karte hain, zyada tar hedge, income strategies aur arbitrage ke liye. NSE close ke baad participant-wise data (FPI, DII, Pro aur Client) OI aur volume ke liye publish karta hai. Yeh category ke totals dikhata hai, wajah nahi.`,
      how: `Participant data lists long and short contracts per category in index futures, stock futures, and index and stock options. A large net short in index futures by an FPI category may be a hedge against its cash equity holdings; a net long in index futures could be an arbitrage leg. So the number alone does not give direction. Changes over several days, and comparison with the FPI cash-market flows, add context. Since the data is end-of-day, it does not show intraday moves.`,
      eg: {
        title: 'Reading a net number (illustrative)',
        text: `FPI index futures: long 1,20,000 contracts and short 1,80,000 contracts. Net = 1,20,000 − 1,80,000 = −60,000. Long to short ratio = 120 / 180 = 0.67. If the FPI cash portfolio is large, the net short may be a hedge. A rising net short over a week while the index rises might just reflect more hedging against stock purchases.`,
      },
      tip: `Never read participant data as a direct instruction: a net short is often a hedge, not a bearish bet.`,
      visual: {
        kind: 'bars',
        title: 'FPI index futures (illustrative contracts, thousands)',
        unit: 'k',
        items: [
          { label: 'Long', value: 120, tone: 'bull' },
          { label: 'Short', value: 180, tone: 'bear' },
          { label: 'Net (short)', value: 60, tone: 'gold' },
        ],
      },
    },
  ],
}
export default m
