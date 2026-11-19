import type { ModuleLesson } from '../topicLessonTypes'

/* Module 2.4 - How Institutions Influence Market Movements.
 * Follows the supplied course text (Module 2.4). Numbers are the text's illustrative numbers, recomputed.
 * Note: the text gives the 3-level fill average as 1,000.125; recomputing gives 1,000.1125 (used here).
 * Where a NIFTY futures contract value matters, the text's illustrative Rs 12 lakh is kept; the current NIFTY lot is 65
 * (65 x 24,000 = Rs 15.6 lakh), which is mentioned in the hedging topic. */
const m: ModuleLesson = {
  moduleId: '2.4',
  intro: `Large institutions cannot buy or sell millions of shares the way a retail trader buys 50. Their orders eat through the order book, so they slice orders, use algorithms, trade block deals and hedge with index futures. This module shows how that activity can move prices, and how to avoid the common mistake of reading every big number as a directional bet.`,
  introHi: `Bade institutions retail trader ki tarah ek click mein lakhs shares nahi kharid ya bech sakte. Unke order order book ko khaa jate hain, isliye woh order todte hain, algorithm, block deal aur index futures hedge use karte hain. Is module mein samjhenge ki yeh sab price ko kaise hila sakta hai, aur yeh galti kaise avoid karni hai ki har bada number directional bet maan liya jaye.`,
  steps: {
    concept: `Every trade has a buyer and a seller, so price does not move because "more people buy than sell". It moves when an aggressive order uses up the quantity waiting at the best prices and the next trade happens at a worse price. Institutions place orders that are big enough for this to matter, so they manage how they trade. Understanding their execution, hedging and arbitrage helps you read data such as FII futures positions without jumping to conclusions.`,
    conceptHi: `Har trade mein ek buyer aur ek seller hota hai, isliye price is wajah se nahi badhta ki "buyers zyada hain". Price tab move karta hai jab koi aggressive order best price par pada saara quantity kha leta hai aur agla trade kharab price par hota hai. Institutions ke order itne bade hote hain ki yeh effect dikhta hai, isliye woh apna execution manage karte hain. Unka execution, hedging aur arbitrage samajhne se FII futures jaise data ko bina soche-samjhe bearish ya bullish padhne se bach sakte ho.`,
    mechanism: `Four mechanisms matter. (1) Order book: a marketable order consumes resting orders level by level and pushes the average fill price away from the best price. (2) Execution tools: order slicing, VWAP, TWAP, iceberg and participation algorithms spread a big order over time and venues to cut impact. (3) Negotiated routes: bulk deals are ordinary large trades that get reported once they cross the exchange threshold (0.5% of listed shares in the course text); block deals use a separate window. (4) Derivatives: institutions hedge cash portfolios with index futures and arbitrageurs link futures and cash, so a futures position in the data may be a hedge or an arbitrage leg, not a view.`,
    example: {
      title: 'One institution, one order book',
      text: `Illustrative book for a stock near Rs 1,000: best ask Rs 1,000.05 (400 shares), then Rs 1,000.10 (700) and Rs 1,000.15 (1,200). A buy order for 2,000 shares fills 400 + 700 + 900. Average price = (1,000.05 x 400 + 1,000.10 x 700 + 1,000.15 x 900) / 2,000 = Rs 1,000.1125. That is Rs 0.1125 above Rs 1,000.00, about 0.011 percent, or roughly Rs 225 on 2,000 shares. Small here, but at Rs 100 crore of order value even 0.20 percent impact would cost Rs 20 lakh.`,
    },
    chart: {
      kind: 'orderBook',
      title: 'Illustrative order book near Rs 1,000',
      caption: 'A 2,000-share buy sweeps the asks at 1,000.05, 1,000.10 and part of 1,000.15, so the best ask moves up and the average fill is above the first price.',
      bids: [[999.95, 500], [999.9, 800], [999.85, 1000], [999.8, 1500]],
      asks: [[1000.05, 400], [1000.1, 700], [1000.15, 1200], [1000.2, 1800]],
    },
    optionChain: `The option chain shows strike-wise OI, volume and IV, but not who is behind them. Institutional hedging can sit in index options too (for example protective puts), yet a rise in put OI does not tell you whether a fund, a proprietary desk or a retail crowd created it. Use the chain together with futures OI, participant-wise data and India VIX rather than on its own. Wide bid-ask spreads and thin depth on far strikes also show why institutions trade mainly liquid index contracts.`,
    psychology: `Retail traders like a simple story: "FIIs are selling, so the market must fall." Institutions think in portfolios, benchmarks and execution cost, so one visible trade may be a hedge, a rebalancing, an arbitrage leg or a client redemption. The two risks are over-reading a data point and chasing a move after the large order is already done. A good habit is to say "the motive cannot be determined from this data" when the evidence is mixed.`,
    scenarios: {
      bullish: `NIFTY is rising with futures OI increasing, FII long futures rising and the premium to fair value normal. Price is breaking a known resistance with strong volume and good breadth. This is consistent with fresh buying, but it is still not proof of an institutional motive, and a failed breakout can reverse it.`,
      bearish: `NIFTY is falling with futures OI rising, FII shorts increasing, India VIX up and cash-market selling. This looks like a bearish positioning picture, yet FIIs with large cash portfolios may simply be hedging. Check cash exposure, options and expiry before calling it a directional bet.`,
      sideways: `NIFTY ranges for days with steady volume. Some traders call this possible accumulation or distribution, but a range can also be pure indecision, a lack of news or two institutions trading with each other. Wait for a breakout or breakdown with volume and follow-through instead of assuming who is behind the range.`,
    },
    practice: [
      {
        q: `A buy order for 2,000 shares meets asks of 400 at Rs 1,000.05, 700 at Rs 1,000.10 and 1,200 at Rs 1,000.15. What is the average price?`,
        a: `Fills: 400 at 1,000.05, 700 at 1,000.10 and 900 at 1,000.15 (the rest of the third level). Sum = 400,020 + 700,070 + 900,135 = 2,000,225. Divide by 2,000: Rs 1,000.1125.`,
      },
      {
        q: `A company has 12 crore listed shares. How many shares must a client trade in a day to cross the 0.5 percent bulk-deal reporting threshold in the course text?`,
        a: `0.5% of 12,00,00,000 = 12,00,00,000 x 0.005 = 6,00,000 shares. Trading more than 6 lakh shares may qualify as a bulk deal, subject to the applicable exchange rules.`,
      },
      {
        q: `A fund holds a Rs 500 crore equity portfolio with beta 1.0. One NIFTY futures contract is worth Rs 12 lakh (the course text's illustrative figure). How many contracts hedge it fully?`,
        a: `N = beta x portfolio value / contract value = 1.0 x 5,00,00,00,000 / 12,00,000 = 4,166.67, so about 4,167 contracts. With the current NIFTY lot of 65 at 24,000 the contract is worth 65 x 24,000 = Rs 15.6 lakh and the same hedge is about 3,205 contracts. Real hedges also depend on beta, basis and limits.`,
      },
      {
        q: `FII index futures: long 90,000 and short 100,000 before; long 75,000 and short 1,30,000 now. What changed in net position and long-short ratio?`,
        a: `Net before = 90,000 - 100,000 = -10,000; net now = 75,000 - 130,000 = -55,000, so net short rose by 45,000 contracts. Ratio before = 0.90; now 75,000 / 130,000 = about 0.58. The book is more short-heavy, but hedging, arbitrage and direction can all produce this.`,
      },
    ],
    assignment: `Download the latest NSE participant-wise open interest report and a day's NIFTY futures OI and price change. Write down FII long, short, net and long-short ratio for two consecutive days, and list at least three possible explanations (directional, hedge, arbitrage) with one piece of evidence that would support or reject each. End with a conclusion that says how confident you are and why.`,
  },
  topics: [
    {
      t: 1,
      def: `A large institutional order can move a stock's price because it uses up the quantity waiting at the best prices and then trades at the next worse price. Price impact is the price movement caused by executing an order. Every trade has both a buyer and a seller; what pushes price is aggressive demand meeting limited available liquidity.`,
      hi: `Bada institutional order stock ka price isliye hila sakta hai kyunki woh best price par pada saara quantity khatam kar deta hai aur phir agle, mehenge price par trade hota hai. Har trade mein buyer aur seller dono hote hain; price tab move karta hai jab aggressive demand ko limited quantity milti hai. Isi movement ko price impact kehte hain.`,
      how: `An order book lists resting bids and asks. The best bid is the highest price a buyer will pay and the best ask is the lowest price a seller will accept; their difference is the bid-ask spread. A marketable buy order takes the lowest asks first, then moves to higher ones, so the average price is above the first price. After the sweep the best ask is higher, so new trades print higher. You cannot assign the whole price move to one order, because other participants and news also act. Institutions therefore prefer limit orders or algorithms to one giant market order.`,
      eg: {
        title: 'Rs 1,000 stock, 2,000-share buy',
        text: `Spread: 1,000.05 - 999.95 = Rs 0.10. A marketable 2,000-share buy fills 400 at 1,000.05, 700 at 1,000.10 and 900 at 1,000.15. Average = Rs 1,000.1125, against the first ask of Rs 1,000.05. After the sweep, 300 shares remain at 1,000.15 and the new best ask is 1,000.15, so the visible price has stepped up. If the price later reaches Rs 1,005, that Rs 5 move cannot be credited to this one order alone. Quantities are illustrative.`,
      },
      tip: `A big green candle is not proof that "institutions bought". Price moves when aggressive orders exhaust the nearby quantity; the same move can come from many small traders or a thin book.`,
      visual: {
        kind: 'orderBook',
        title: 'Order book before the 2,000-share buy',
        caption: 'The buyer must climb three ask levels. Gaps between levels and small quantities are what create price impact.',
        bids: [[999.95, 500], [999.9, 800], [999.85, 1000], [999.8, 1500]],
        asks: [[1000.05, 400], [1000.1, 700], [1000.15, 1200], [1000.2, 1800]],
      },
      calc: {
        id: 'order-book-impact',
        preset: { side: 'buy', qty: 2000, refPrice: 1000, book: '1000.05:400;1000.10:700;1000.15:1200;1000.20:1800' },
        why: `Reproduces the sweep: average fill Rs 1,000.1125 against a Rs 1,000 reference.`,
      },
    },
    {
      t: 2,
      def: `Accumulation is a period in which an investor builds a position gradually, often without moving price much. Distribution is the opposite: gradually selling an existing position. Traders look for clues on charts, but high volume alone does not show who is buying or selling or why.`,
      hi: `Accumulation matlab koi investor dheere-dheere position banata hai, taki price na bhage. Distribution matlab dheere-dheere apni holding bechna. Chart par traders iske clue dhundhte hain, lekin sirf high volume se yeh nahi pata chalta ki kaun kharid raha hai ya kyun.`,
      how: `An institution wanting 10 lakh shares may buy a little each session to limit price impact, avoid paying higher prices and reduce execution risk. Possible accumulation clues: a range with strong up-volume, failed new lows, higher lows, relative strength against the sector or benchmark and a volume-backed breakout. Possible distribution clues: repeated failure near resistance, lower highs, heavy volume on declines and eventually a support break. These are clues, not proof. The same volume bar may come from a large buyer, a large seller, two institutions swapping exposure, news or short covering.`,
      eg: {
        title: 'Stock in a Rs 480 to Rs 520 range',
        text: `Illustrative: a stock trades between Rs 480 and Rs 520 for six weeks. Each dip to about Rs 480 is bought, the lows rise to Rs 485 and Rs 490, and up-days show higher volume than down-days. It also beats its sector index. This is consistent with possible accumulation, but it could equally be retail buying or short covering. A close above Rs 520 on strong volume would add evidence; a close below Rs 480 would weaken the idea.`,
      },
      tip: `Treat accumulation and distribution as hypotheses to test with price, volume and follow-through, never as facts you can see on one volume bar.`,
      visual: {
        kind: 'candles',
        title: 'Possible accumulation pattern',
        caption: 'Sideways range, rising lows and a breakout. A stylised picture of the clues, not a signal.',
        pattern: 'accumulation',
      },
    },
    {
      t: 3,
      def: `A bulk deal is a large client trade that crosses the exchange's reporting threshold in a day (0.5 percent of a company's listed shares in the course text). A block deal is a large negotiated trade executed in a separate block-deal window. Both are published by the exchange, but neither shows the buyer's reason or future view.`,
      hi: `Bulk deal mein ek client ek din mein company ke listed shares ka 0.5% se zyada kharidta ya bechta hai aur exchange use report karta hai. Block deal ek alag window mein negotiate hokar hone wali badi deal hai. Dono se pata chalta hai ki badi deal hui, lekin yeh nahi ki khareedne wala bullish hai ya kitne time hold karega.`,
      how: `Bulk deals happen in the normal market and are disclosed afterwards. Block deals use a dedicated window so large quantities need not hit the visible order book; the exchange sets conditions on timing, minimum size and price range, which can be revised, so check current NSE rules before relying on any number. Reasons for a large deal include long-term investment, portfolio rebalancing, promoter stake sale, index-related changes and arbitrage. The reports are historical, so use them as research input, not as a trade signal.`,
      eg: {
        title: 'ABC Ltd. with 10 crore listed shares',
        text: `0.5% of 10,00,00,000 = 5,00,000 shares. A client buys 8 lakh shares in a day, above the 5 lakh threshold, so the trade may be reported as a bulk deal. What you can conclude: a big transaction occurred and the seller reduced its holding. What you cannot conclude: that the buyer will hold for years, is bullish, or that the stock must rise. The buyer could be rebalancing a fund or taking over a stake from a promoter. Illustrative company.`,
      },
      tip: `A bulk-deal headline is a lead for research, not a reason to buy. Ask who sold, why, at what price, and what the stock and fundamentals were doing.`,
      visual: {
        kind: 'compare',
        title: 'Bulk deal vs block deal',
        caption: 'Both are disclosed; they differ in how the trade is executed.',
        left: { head: 'Bulk deal', tone: 'ice', points: [`Large client trade in the regular market`, `Reported when it crosses the threshold (0.5% of listed shares in the course text)`, `Disclosed by the exchange`, `Says a big trade happened, not why`] },
        right: { head: 'Block deal', tone: 'gold', points: [`Negotiated trade in a separate window`, `Subject to size, price and timing conditions`, `Disclosed by the exchange`, `Lets large size trade without sweeping the book`] },
      },
    },
    {
      t: 4,
      def: `Market depth is the quantity available to buy or sell at different price levels. Impact cost is the extra cost of executing a given order compared with a reference price because of available liquidity. A deeper book generally means a lower impact cost.`,
      hi: `Market depth batata hai ki alag-alag price par kitna buy aur sell quantity available hai. Impact cost batata hai ki ek order execute karne mein reference price ke mukable kitna extra cost aaya. Depth zyada ho toh impact cost aam taur par kam hota hai.`,
      how: `Simplified buy-side impact cost = (average execution price - reference price) / reference price x 100; for a sell order you compare the reference price with the lower average sell price. Stock A with tens of thousands of shares near the best prices can absorb a 15,000-share buy near the current price, while Stock B with a few hundred shares per level would have to climb many levels. Displayed depth is not a guarantee: orders can be cancelled or changed before yours arrives, hidden quantity may exist, and liquidity thins in news and volatile moments. Liquidity risk is the risk of not being able to trade the size you need at a fair price.`,
      eg: {
        title: 'A 15,000-share buy in a thin book',
        text: `Illustrative: reference price Rs 100. Asks: 5,000 at Rs 100.10, 5,000 at Rs 100.20 and 5,000 at Rs 100.30. Average = (100.10 + 100.20 + 100.30) / 3 = Rs 100.20. Impact cost = (100.20 - 100) / 100 x 100 = 0.20%. On a Rs 100 crore order that is Rs 20 lakh (100 crore x 0.002 = Rs 2,00,000... in crore terms 0.2 crore), which is why institutions prefer liquid stocks or spread the order over time.`,
      },
      tip: `Check the spread and the quantity at the first few levels before you size a trade. Thin depth means your own order becomes the price.`,
      visual: {
        kind: 'compare',
        title: 'Deep book vs thin book',
        caption: 'Same order size, very different cost. Based on the course text example.',
        left: { head: 'Stock A (deep)', tone: 'ice', points: [`18,000 to 28,000 shares at each ask level`, `Narrow spread`, `A 15,000-share buy stays near the best ask`, `Lower impact cost`] },
        right: { head: 'Stock B (thin)', tone: 'gold', points: [`400 to 500 shares at each ask level`, `Wider effective spread for size`, `A 15,000-share buy climbs many levels`, `Higher impact cost`] },
      },
      calc: {
        id: 'order-book-impact',
        preset: { side: 'buy', qty: 15000, refPrice: 100, book: '100.10:5000;100.20:5000;100.30:5000' },
        why: `Gives the average Rs 100.20 and the 0.20 percent impact cost used in the example.`,
      },
    },
    {
      t: 5,
      def: `Institutions cut price impact by slicing a big order into many small ones and by using algorithms: VWAP (volume-weighted average price), TWAP (time-weighted schedule), iceberg orders (only part of the size shown) and participation algorithms (a fixed share of market volume).`,
      hi: `Institutions bade order ko chhote tukdon mein todte hain aur algorithm use karte hain taki price par asar kam ho. VWAP volume ke hisaab se, TWAP time ke hisaab se chalta hai, iceberg mein poora size nahi dikhta, aur participation algorithm market volume ka ek fixed hissa leta hai.`,
      how: `Example: 20 lakh shares can be sliced into 200 orders of 10,000. VWAP = sum(price x volume) / sum(volume), a benchmark; a VWAP algorithm trades more when volume is high. A simple TWAP splits the quantity evenly over time, for instance 10,000 shares every 10 minutes between 10 AM and 11 AM. An iceberg may show 2,000 of a 1 lakh order at a time (where the exchange and broker support it). A 10 percent participation algorithm trades about 10,000 shares when 1 lakh trade. None of these is a profit strategy, and repeated slices may be noticed by others, so impact is reduced, not removed.`,
      eg: {
        title: 'VWAP of three fills',
        text: `Trades: 1,000 shares at Rs 100, 2,000 at Rs 101 and 1,000 at Rs 102. VWAP = (100 x 1,000 + 101 x 2,000 + 102 x 1,000) / 4,000 = 404,000 / 4,000 = Rs 101. A plain average of the three prices is also Rs 101 here, but if the Rs 100 fill were 3,000 shares VWAP would fall below the simple average. The goal of a VWAP algorithm is to finish near this benchmark, not to guarantee a gain.`,
      },
      tip: `VWAP and TWAP describe how an order is executed, not what the institution thinks. A steady stream of buying may be execution, not a changing view.`,
      visual: {
        kind: 'flow',
        title: 'From one big order to many small fills',
        caption: 'A simplified algorithm pipeline.',
        steps: [
          { label: 'Parent order', note: '20 lakh shares to buy', tone: 'gold' },
          { label: 'Slicing', note: 'e.g. 200 child orders of 10,000', tone: 'ice' },
          { label: 'Schedule', note: 'by volume (VWAP), time (TWAP) or % participation', tone: 'ice' },
          { label: 'Display', note: 'optionally an iceberg: show a small part', tone: 'neutral' },
          { label: 'Fills', note: 'average compared with the benchmark', tone: 'gold' },
        ],
      },
      calc: {
        id: 'vwap-twap',
        preset: { fills: '100:1000;101:2000;102:1000' },
        why: `Computes the Rs 101 VWAP from the three fills.`,
      },
    },
    {
      t: 6,
      def: `Support and resistance are price zones where buying or selling interest has previously slowed or reversed a move. Some institutions and algorithms may act near such zones, but not all use them. Volume rising near a level does not prove that a particular institution is buying or selling.`,
      hi: `Support aur resistance woh price zones hain jahan pehle buying ya selling ne move ko rokha tha. Kuch institutions aur algorithms in levels ke aas-paas kaam kar sakte hain, par sab nahi karte. Level ke paas volume badhne ka matlab yeh nahi ki koi khaas institution hi khareed ya bech raha hai.`,
      how: `Near support you may see selling slow, a recovery, higher volume and a higher low, which is consistent with demand but also with short covering or news. Near resistance, repeated failures and lower highs suggest supply. When a level breaks with volume, stops get triggered, shorts cover or add, and trend-following algorithms may join, which can extend the move; a false breakout or breakdown reverses quickly. Judge closing price, volume, market breadth, futures OI and VIX, and wait for follow-through rather than one tick through the level.`,
      eg: {
        title: 'NIFTY and a 24,500 resistance',
        text: `Illustrative: NIFTY is rejected from the 24,500 zone three times in two weeks, each time with higher volume on the fall, and prints lower highs at 24,480, 24,450 and 24,420. That may show supply near resistance, but it does not prove FIIs are selling. If NIFTY then closes above 24,500 with strong volume and breadth, sellers may cover and momentum traders may buy; if it dips above and closes back below, it is a possible false breakout.`,
      },
      tip: `Do not name the participant from a chart. Say "supply appeared near 24,500" instead of "FIIs sold at 24,500".`,
      visual: {
        kind: 'candles',
        title: 'False breakout above resistance',
        caption: 'Price pokes above the level and falls back below it. The close, volume and follow-through decide.',
        pattern: 'falseBreakout',
        level: { price: 24500, label: 'Resistance 24,500' },
      },
    },
    {
      t: 7,
      def: `Portfolio hedging means taking an extra position to reduce the risk of holdings you already own. An institution with a large share portfolio can sell index futures so that a market fall in the portfolio is partly offset by a gain on the futures.`,
      hi: `Portfolio hedging matlab apni existing holding ka risk kam karne ke liye extra position lena. Jis institution ke paas bahut saare shares hain, woh index futures sell karke market girne par hone wale loss ko partly offset kar sakta hai.`,
      how: `Hedge size is roughly N = beta x portfolio value / notional of one futures contract. This hedges index risk only; stock-specific risk, basis and rollover cost remain. The futures selling adds supply in the futures market; if futures drift above or below fair value, arbitrageurs buy the cheaper side and sell the dearer one (cash-and-carry when futures are dear: sell futures, buy the share basket), which links futures and spot. So rising FII short futures do not automatically mean a bearish view: the cash portfolio may stay net long. For example a Rs 500 crore portfolio with Rs 200 crore of short futures is still net long.`,
      eg: {
        title: 'Rs 500 crore portfolio, 2% market fall',
        text: `Illustrative (course text): portfolio Rs 500 crore, beta 1.0. A 2% fall costs about Rs 10 crore. A short futures hedge sized to earn about Rs 9 crore leaves a net loss of about Rs 1 crore, before costs and basis changes. Contracts needed at Rs 12 lakh each (illustrative): 5,00,00,00,000 / 12,00,000 = about 4,167. At today's NIFTY lot of 65 and spot 24,000 one contract is Rs 15.6 lakh, so the number is about 3,205.`,
      },
      tip: `A short futures position is half a story. Ask what the institution holds in cash before treating it as a bearish call.`,
      visual: {
        kind: 'bars',
        title: 'Hedged vs unhedged result of a 2% fall (Rs crore)',
        caption: 'Illustrative numbers from the course example, before costs and basis.',
        unit: ' Cr',
        items: [
          { label: 'Portfolio loss', value: -10, tone: 'bear' },
          { label: 'Futures hedge gain', value: 9, tone: 'bull' },
          { label: 'Net after hedge', value: -1, tone: 'gold' },
        ],
      },
      calc: {
        id: 'hedge-ratio',
        preset: { portfolio: 5000000000, beta: 1, futuresNotional: 1200000 },
        why: `Gives the 4,167-contract hedge from the course text.`,
      },
    },
    {
      t: 8,
      def: `The same increase in FII short futures can come from a bearish directional view, a portfolio hedge or an arbitrage position. Your job is to test which explanation fits the evidence, and to say "cannot be determined" when the data is not enough.`,
      hi: `FII ke short futures badhne ke teen kaaran ho sakte hain: bearish view, portfolio hedge ya arbitrage. Aapka kaam hai evidence se check karna ki kaun sa explanation fit hota hai. Data kaafi na ho toh seedha kehna ki "motive pata nahi chal sakta" bhi sahi conclusion hai.`,
      how: `Directional: new shorts plus falling long positions, falling price with rising futures OI and weakness elsewhere. Hedge: large cash holdings, shorts that reduce overall beta, protective options. Arbitrage: futures at a premium to fair value with cash buying alongside, positions unwound as expiry nears. Checklist: cash flows, long futures, long-short ratio, price, futures OI, premium to fair value, options, expiry timing and counterparties. Public data usually cannot show the full portfolio, so a probability-style conclusion is better than a certain one.`,
      eg: {
        title: 'Shorts rise by 20,000 contracts',
        text: `FII index futures shorts rise by 20,000. A: they expect a fall and sell. B: they hold a large share portfolio and sell futures to cut beta. C: they buy the share basket and sell dear futures. All three raise reported shorts. Course snapshot (illustrative): NIFTY -1.1%, India VIX +8%, FII cash net -Rs 3,000 crore, DII +Rs 2,500 crore, FII long 90,000 to 75,000, short 100,000 to 130,000: net -10,000 to -55,000, ratio 0.90 to about 0.58. That looks bearish, but hedging cannot be ruled out from this alone.`,
      },
      tip: `Write the three hypotheses down and ask what evidence would separate them. If you cannot separate them, do not trade the story.`,
      visual: {
        kind: 'compare',
        title: 'Directional vs hedging vs arbitrage',
        caption: 'Same reported short position, different purpose and different main risk.',
        left: { head: 'Directional bearish', tone: 'bear', points: [`Sells futures expecting a fall`, `Net exposure becomes more negative`, `Main risk: market rises`, `Often with falling price and rising OI`] },
        right: { head: 'Hedge or arbitrage', tone: 'gold', points: [`Hedge: offsets an existing portfolio`, `Arbitrage: sells dear futures, buys the basket`, `Main risks: basis and mismatch, financing`, `Total exposure may be neutral or net long`] },
      },
      calc: {
        id: 'basis-fair-value',
        preset: { spot: 24000, futures: 24100, rate: 6.5, days: 30, dividend: 1.3 },
        why: `Fair value is about 24,102.8 at 30 days, so a 100-point premium is normal carry, not a signal.`,
      },
    },
  ],
  tools: [
    { id: 'order-book-impact', preset: { side: 'buy', qty: 2000, refPrice: 1000, book: '1000.05:400;1000.10:700;1000.15:1200;1000.20:1800' }, why: `See how a large order walks the book and what it costs.` },
    { id: 'hedge-ratio', preset: { portfolio: 5000000000, beta: 1, futuresNotional: 1560000 }, why: `Same Rs 500 crore hedge using today's NIFTY contract value (65 x 24,000).` },
  ],
}
export default m
