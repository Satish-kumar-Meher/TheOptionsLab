import type { ModuleLesson } from '../topicLessonTypes'

/* Module 11.5 — Market Microstructure.
 * All numbers illustrative: NIFTY futures ≈ 24,000, lot 65 (check the current NSE contract specification).
 * NSE matches orders on price-time priority. The equity pre-open call auction (9:00-9:15) is described for stocks;
 * for derivatives, check the current NSE circulars. Tick sizes and trading hours can change. */
const m: ModuleLesson = {
  moduleId: '11.5',
  intro: `Market microstructure is the plumbing under the price: how orders are matched, who supplies liquidity, what the spread costs, and why a large order moves the price. A trader who ignores it pays hidden costs on every trade. This module explains those costs in plain numbers using NSE-style order books.`,
  introHi: `Market microstructure price ke neeche ki plumbing hai: orders kaise match hote hain, liquidity kaun deta hai, spread ki kya cost hai, aur bada order price ko kyun hilata hai. Jo trader isko ignore karta hai woh har trade par chhupi hui cost bharta hai. Yeh module NSE jaise order books ke numbers se yeh costs saaf tareeke se samjhata hai.`,
  steps: {
    concept: `A price is not one number. At any moment there is a best bid (the highest price a buyer will pay) and a best ask (the lowest price a seller will accept), and the gap is the spread. Liquidity providers rest orders on both sides and earn the spread; liquidity takers cross it and pay it. Larger orders walk through several price levels, which creates market impact and slippage. Price discovery is the process by which all these orders settle on a price.`,
    conceptHi: `Price ek number nahi hota. Har waqt ek best bid hota hai (buyer ka sabse high price) aur ek best ask (seller ka sabse low price), aur dono ke beech ka gap spread hai. Liquidity providers dono taraf orders rakhte hain aur spread kamate hain; liquidity takers spread cross karke use bharte hain. Bade orders kai price levels se guzarte hain, isse market impact aur slippage hota hai. Price discovery woh process hai jisse yeh saare orders ek price par aate hain.`,
    mechanism: `The exchange keeps an order book for each contract. Orders are ranked by price first, then by the time they arrived (price-time priority). When an incoming order can trade against the best opposite order, the trade happens at the resting order's price. The trading system is continuous from 9:15 to 15:30 on the NSE cash and F&O segments, with a call auction in the equity pre-open session before that. Market participants include retail traders, institutions, proprietary trading firms and, in some contracts, designated market makers. Check the NSE website for current timings and rules.`,
    example: {
      title: 'One sell order meets the book (illustrative)',
      text: `Bids: Trader A 100 contracts at 24,009.5 (placed 9:20:01), Trader B 200 at 24,009.5 (placed 9:20:05), Trader C 300 at 24,009.0. A sell of 250 contracts arrives. Price priority picks the 24,009.5 level; time priority fills A first (100), then B (150). The trade price is 24,009.5. B still has 50 contracts waiting, and C is untouched. Had the seller wanted 24,009.0 or lower, C would have been reached only after both orders at 24,009.5 were exhausted.`,
    },
    chart: {
      kind: 'orderBook',
      title: 'A sample NIFTY futures book (illustrative)',
      caption: 'Bids on the left side, asks on the right. The spread here is 0.5 points; the mid price is 24,009.75.',
      bids: [[24009.5, 300], [24009.0, 300], [24008.5, 450], [24008.0, 500]],
      asks: [[24010.0, 200], [24010.5, 300], [24011.0, 400], [24011.5, 500]],
    },
    optionChain: `The option chain shows last traded price, bid, ask, volume and OI per strike. The bid-ask columns are the microstructure part: ATM strikes of NIFTY usually have narrow spreads, while far OTM strikes can have spreads that are a large fraction of the premium. LTP is not a tradable price; the bid and ask are. Always check the spread before placing an option order and use limit orders.`,
    psychology: `Takers feel urgency and fear missing the move, so they pay the spread without noticing it. Providers feel inventory risk: every fill leaves them with a position they must offload. When the market gets fast, providers widen quotes or pull them away, and the book thins. Beginners often blame the broker for poor fills when the real cause is trading a thin strike or sending a large market order in a fast market.`,
    scenarios: {
      bullish: `Offers are lifted steadily, the ask side thins and the bid side refills at higher prices. Price discovery moves up with narrow spreads. Danger: if offers disappear faster than they refill, price can jump several points between trades.`,
      bearish: `Bids are hit and providers step back, spreads widen and depth near the market falls. Sellers who use market orders will get worse fills at each level. Stop-loss orders in this environment can execute far from the trigger.`,
      sideways: `Spreads stay tight and both sides refill. Order sizes are absorbed with little impact. The main cost is the spread itself paid on every entry and exit, which adds up for frequent traders.`,
    },
    practice: [
      { q: `Bid is 24,009.5 and ask is 24,010.0. What are the spread and the mid price? What is the cost of buying and selling 10 lots at market (lot 65)?`, a: `Spread = 24,010.0 − 24,009.5 = 0.5 points. Mid = (24,009.5 + 24,010.0) / 2 = 24,009.75. Buying at the ask costs 0.25 above mid per unit and selling at the bid another 0.25, so the round trip costs 0.5 × 10 × 65 = ₹325 before brokerage and taxes.` },
      { q: `An option shows bid 2.00 and ask 2.50. What fraction of the mid price is the spread?`, a: `Mid = 2.25 and spread = 0.50, so spread / mid = 0.50 / 2.25 = 22.2%. The contract needs to move more than a fifth in your favour just to recover the spread on a round trip, which is why far OTM options are expensive to trade.` },
      { q: `Asks: 100 at 24,010 and 300 at 24,030. You buy 250. Find the average price and slippage versus the best ask.`, a: `Cost = 100 × 24,010 + 150 × 24,030 = 24,01,000 + 36,04,500 = 60,05,500. Average = 60,05,500 / 250 = 24,022. Slippage versus 24,010 = 12 points, so 12 × 250 × 65 = ₹1,95,000.` },
      { q: `In a pre-open auction, why is the price not simply the highest bid?`, a: `The auction picks the single price at which the maximum quantity can be matched. Orders are stacked cumulatively, and the equilibrium is where matched quantity is greatest. A highest bid with too few sellers at that level would match little.` },
    ],
    assignment: `For one trading session, pick a liquid ATM option and a far OTM option of NIFTY. At three times of the day (just after open, midday, near close) note the bid, ask and spread for each, and compute the spread as a percentage of mid. Write two sentences on which was cheaper to trade and when spreads were widest.`,
  },
  topics: [
    {
      t: 1,
      def: `An exchange matches buy and sell orders using a fixed rule. On NSE the rule is price-time priority: the best price is served first, and among orders at the same price the earliest one is served first. The trading system does this automatically.`,
      hi: `Exchange buy aur sell orders ko ek fixed rule se match karta hai. NSE par rule hai price-time priority: pehle best price wala order, aur same price par jo pehle aaya woh pehle. Yeh kaam trading system apne aap karta hai.`,
      how: `Every order enters the exchange system and is placed in a book for that contract. The matching engine compares an incoming order with the best opposite orders. If prices cross, a trade is created at the resting order's price and reported to both brokers, then sent to the clearing corporation (NSCCL) for novation and settlement. If no match is possible, a limit order waits in the book. Orders can be modified or cancelled, but changing the price or increasing the quantity usually sends the order to the back of the time queue.`,
      eg: {
        title: 'Queue at one price (illustrative)',
        text: `Two buyers bid 24,009.5: A for 100 contracts at 9:20:01 and B for 200 at 9:20:05. A seller hits with 250. A is filled for 100 first, B for the remaining 150. B's leftover 50 stays in the book. If B had modified the order at 9:20:30, it would have lost its time priority.`,
      },
      tip: `Placing a limit order early at a sensible price matters. Priority is earned by time.`,
      visual: { kind: 'flow', title: 'From order to trade', steps: [{ label: 'Order enters book', note: 'Price and time stamped', tone: 'ice' }, { label: 'Matching engine', note: 'Price, then time', tone: 'gold' }, { label: 'Trade printed', note: 'At resting price', tone: 'gold' }, { label: 'Clearing (NSCCL)', note: 'Novation, margin, settlement', tone: 'neutral' }] },
    },
    {
      t: 2,
      def: `Liquidity providers are traders or firms that place limit orders on both sides of the market and wait for others to trade with them. They earn the spread and are paid for the risk of holding inventory.`,
      hi: `Liquidity providers woh traders ya firms hain jo market ke dono taraf limit orders lagate hain aur doosron ke trade karne ka wait karte hain. Woh spread kamate hain aur inventory hold karne ke risk ka muavza paate hain.`,
      how: `On NSE the main providers are proprietary trading firms and, in some contracts, designated market makers. They quote a bid and an ask close together and update them continuously as the index, futures and volatility change. Every fill leaves them long or short, so they hedge using futures or other options. In calm markets they quote tightly and in size. In fast markets they widen or pull quotes, so liquidity is least available just when it is most needed.`,
      eg: {
        title: 'Spread capture (illustrative)',
        text: `A provider quotes 24,009.5 bid and 24,010.0 ask. Over a session they buy 1,000 contracts at the bid and sell 1,000 at the ask. Gross spread capture = 0.5 × 1,000 × 65 = ₹32,500. That is before exchange charges, technology costs and the losses when price moves against inventory. It is revenue for taking a risk, not a sure gain.`,
      },
      tip: `Liquidity you see in a book is not a promise. Providers can cancel quickly.`,
      visual: { kind: 'layers', title: 'Who supplies and who takes', layers: [{ label: 'Exchange and clearing', note: 'NSE and NSCCL: rules, matching, guarantee', tone: 'gold' }, { label: 'Liquidity providers', note: 'Prop firms, market makers: quotes both sides', tone: 'ice' }, { label: 'Liquidity takers', note: 'Retail, funds, hedgers: cross the spread', tone: 'neutral' }] },
    },
    {
      t: 3,
      def: `Market takers are traders who use market-style orders or limit orders that cross the spread, so their orders execute immediately against resting orders. They pay for speed with the spread.`,
      hi: `Market takers woh traders hain jo market-style orders ya spread cross karne wale limit orders lagate hain, toh unka order turant resting orders ke saath execute ho jata hai. Woh speed ke liye spread ka paisa dete hain.`,
      how: `A taker buys at the ask and sells at the bid. Compared with the mid price, a taker pays half the spread on entry and half on exit. For small orders in liquid contracts that is small. For large orders or wide-spread options it is a major cost. Takers are not always retail: institutions use takers' orders when they must hedge quickly. A taker's cost is the provider's revenue.`,
      eg: {
        title: 'Cost of 10 lots at market (illustrative)',
        text: `Bid 24,009.5, ask 24,010.0, mid 24,009.75. A taker buys 10 lots (650 units) at 24,010.0: that is 0.25 above mid, or 0.25 × 650 = ₹162.50. Selling later at the bid costs another ₹162.50, so the round trip costs ₹325. A trader who does this 20 times a month spends ₹6,500 on spreads alone, apart from brokerage and taxes.`,
      },
      tip: `If you do not need to be filled right now, use a limit order at or inside the spread.`,
      visual: { kind: 'compare', title: 'Taker vs provider', left: { head: 'Taker', tone: 'gold', points: ['Crosses the spread', 'Certain fill, uncertain price', 'Pays half-spread each way'] }, right: { head: 'Provider', tone: 'ice', points: ['Rests orders', 'Uncertain fill, controlled price', 'Earns the spread, bears inventory risk'] } },
      calc: { id: 'spread-cost', preset: { bid: 24009.5, ask: 24010, qty: 10, lotSize: 65 }, why: 'Computes the round-trip spread cost for 10 lots.' },
    },
    {
      t: 4,
      def: `The market-maker spread is the gap between the price a provider will buy at and the price they will sell at. It pays them for taking the other side of your trade and carrying the resulting risk.`,
      hi: `Market-maker spread woh gap hai jo us price ke beech hota hai jis par provider khareedega aur jis par bechega. Yeh unhe aapke trade ki doosri taraf lene aur us se bane risk ko sambhalne ka paisa deta hai.`,
      how: `Spreads are not set arbitrarily. They widen when volatility is high, when the contract is far from the money, when the time to expiry is short and gamma is high, and when the underlying is moving fast. Option tick size on NSE is ₹0.05, so even a small spread in rupee terms can be large relative to a cheap premium. Spread in percentage of premium, not in rupees, is the useful number for comparing contracts.`,
      eg: {
        title: 'Same ₹0.50 spread, two options (illustrative)',
        text: `ATM call: bid 140.00, ask 140.50, mid 140.25. Spread 0.50 = 0.36% of mid. Far OTM call: bid 2.00, ask 2.50, mid 2.25. Same 0.50 spread = 22.2% of mid. On 10 lots (650 units) the round-trip spread is 0.5 × 650 = ₹325 in both cases, but it is 0.36% of the ATM position's ₹91,162.50 value and 22.2% of the OTM position's ₹1,462.50 value.`,
      },
      tip: `Judge spreads as a percentage of premium. A cheap option with a wide percentage spread is costly to trade.`,
      visual: { kind: 'bars', title: 'Spread as % of mid (illustrative)', unit: '%', items: [{ label: 'ATM call 140.00 / 140.50', value: 0.36, tone: 'ice' }, { label: 'Far OTM call 2.00 / 2.50', value: 22.2, tone: 'gold' }] },
      calc: { id: 'spread-cost', preset: { bid: 2, ask: 2.5, qty: 10, lotSize: 65 }, why: 'Shows how a 0.50 spread weighs on a 2.25 mid.' },
    },
    {
      t: 5,
      def: `Liquidity depth is how much quantity is waiting at prices near the best bid and ask. Deep books can absorb large orders with little price change; thin books cannot.`,
      hi: `Liquidity depth matlab best bid aur ask ke aas-paas kitni quantity wait kar rahi hai. Deep book bade orders ko kam price change ke saath absorb kar leti hai, thin book nahi kar paati.`,
      how: `Depth is read from the order book: sum the quantity at each level moving away from the best price. Retail terminals usually show five levels; some show more. Depth is not static. Displayed orders can be cancelled in milliseconds and hidden size can sit behind small displayed quantities. A useful practical check is to compute the average price you would get for your intended size by walking the displayed book.`,
      eg: {
        title: 'Walking five levels (illustrative)',
        text: `Asks: 200 at 24,010.0; 300 at 24,010.5; 400 at 24,011.0; 500 at 24,011.5; 600 at 24,012.0. A buy of 1,000 contracts takes 200 + 300 + 400 and then 100 of the fourth level. Cost = 48,02,000 + 72,03,150 + 96,04,400 + 24,01,150 = 2,40,10,700 (in units of price × contracts). Average = 24,010.70, which is 0.70 above the best ask, about 0.0029% of the price.`,
      },
      tip: `Depth on the screen is a snapshot. Size your order in slices if it is large compared to the top levels.`,
      visual: { kind: 'orderBook', title: 'Ask depth (illustrative)', bids: [[24009.5, 300], [24009.0, 300]], asks: [[24010.0, 200], [24010.5, 300], [24011.0, 400], [24011.5, 500], [24012.0, 600]] },
      calc: { id: 'order-book-impact', preset: { side: 'buy', qty: 1000, refPrice: 24010, book: '24010:200;24010.5:300;24011:400;24011.5:500;24012:600' }, why: 'Walks the five ask levels for a 1,000 contract buy.' },
    },
    {
      t: 6,
      def: `A liquidity vacuum is a situation where there are few or no orders close to the market price, so a small trade can push price a long way before meeting the next orders. It happens in thin contracts and in fast markets.`,
      hi: `Liquidity vacuum woh situation hai jab market price ke paas bahut kam ya koi order nahi hota, toh chhota trade bhi price ko door tak dhakel deta hai jab tak agle orders na mil jayein. Yeh thin contracts mein aur tez markets mein hota hai.`,
      how: `Vacuums arise when providers pull quotes ahead of uncertainty (results, policy announcements, sharp index moves) or when a contract was never liquid. Stop-loss orders clustered at one level can also drain the book and leave a gap behind. In options, the far OTM or very deep ITM strikes and strikes just introduced are prone to gaps. Index-wide, a sudden fall such as on election-result day, 4 June 2024, showed how fast books can thin and spreads widen when many participants rush to adjust at once.`,
      eg: {
        title: 'A gap in the asks (illustrative)',
        text: `Asks: 100 contracts at 24,010 and the next level 300 at 24,030. A market buy for 250 fills 100 at 24,010 and 150 at 24,030. Cost = 24,01,000 + 36,04,500 = 60,05,500, average 24,022. That is 12 points above the best ask, or 12 × 250 × 65 = ₹1,95,000 of extra cost compared with a deep book.`,
      },
      tip: `In a vacuum a limit order protects the price; a market order does not. Use limits with a sensible cap.`,
      visual: { kind: 'orderBook', title: 'A gap in the book (illustrative)', bids: [[24009.5, 150], [24009.0, 200]], asks: [[24010.0, 100], [24030.0, 300], [24030.5, 400]] },
      calc: { id: 'order-book-impact', preset: { side: 'buy', qty: 250, refPrice: 24010, book: '24010:100;24030:300' }, why: 'Prices the example buy through a gap.' },
    },
    {
      t: 7,
      def: `Market impact is the price movement caused by your own order. A bigger order, relative to the depth, moves the price further against you before it is completely filled.`,
      hi: `Market impact woh price movement hai jo aapke apne order ki wajah se hota hai. Order jitna bada hoga depth ke muqabale, price utna zyada aapke khilaf jayega order poora fill hone se pehle.`,
      how: `Impact comes from walking the book: each higher ask level you consume raises your average fill. There is also a temporary and a lasting part. After a large buy, price may drift back (temporary) or stay higher (lasting) if others read it as information. Institutions manage impact by slicing orders over time and using benchmarks such as VWAP and TWAP. For a retail trader, impact matters when trading far OTM options or large lot counts.`,
      eg: {
        title: 'Impact of size (illustrative)',
        text: `Using the same asks as in the depth example: 200 lots average 24,010.0 (zero impact). 500 lots fill 200 at 24,010.0 and 300 at 24,010.5, average 24,010.30. 1,000 lots average 24,010.70. Impact per unit goes from 0 to 0.30 to 0.70 as size goes up. For 1,000 lots that is 0.70 × 1,000 × 65 = ₹45,500 above the best ask.`,
      },
      tip: `Impact grows faster than size when the book is thin. Slice big orders.`,
      visual: { kind: 'bars', title: 'Average price above best ask (illustrative)', unit: ' pts', items: [{ label: '200 lots', value: 0, tone: 'neutral' }, { label: '500 lots', value: 0.3, tone: 'gold' }, { label: '1,000 lots', value: 0.7, tone: 'gold' }] },
      calc: { id: 'order-book-impact', preset: { side: 'buy', qty: 500, refPrice: 24010, book: '24010:200;24010.5:300;24011:400;24011.5:500' }, why: 'Change qty to see impact rise with size.' },
    },
    {
      t: 8,
      def: `Slippage is the difference between the price you expected and the price you actually got. It comes from the spread, from market impact and from price moving between your decision and the fill.`,
      hi: `Slippage matlab jo price aapne expect kiya tha aur jo price actual mein mila uska difference. Yeh spread, market impact, aur decision aur fill ke beech price badalne se aata hai.`,
      how: `Slippage is largest on market orders, in fast markets and on stop-loss orders. A stop-loss order only activates at its trigger price and then becomes a market or limit order; in a fast move the fill can be far beyond the trigger. A stop-loss limit order caps the price but may not execute at all. Slippage cannot be removed, only budgeted: include it in the cost of every trade when judging a strategy.`,
      eg: {
        title: 'Stop-loss slippage (illustrative)',
        text: `A trader long 3 lots (195 units) of NIFTY futures sets a stop at 23,980. Price drops quickly, the stop triggers and the sell fills at 23,972. Slippage = 8 points × 195 = ₹1,560 beyond the planned loss. In another case, a limit stop at 23,975 might have remained unfilled while price kept falling, which would be a different risk.`,
      },
      tip: `Include slippage in backtests and plans. A strategy that works only with zero slippage is not tested yet.`,
      visual: { kind: 'flow', title: 'Where slippage comes from', steps: [{ label: 'Decision price', note: '23,980 stop', tone: 'ice' }, { label: 'Trigger and delay', note: 'Price moves on', tone: 'gold' }, { label: 'Walk the book', note: 'Next levels', tone: 'gold' }, { label: 'Actual fill', note: '23,972', tone: 'bear' }] },
      calc: { id: 'futures-pnl', preset: { side: 'long', entry: 24000, exit: 23972, lotSize: 65, lots: 3 }, why: 'Compares the loss at the actual fill with the planned stop at 23,980.' },
    },
    {
      t: 9,
      def: `Price discovery is how the market arrives at a price that reflects what buyers and sellers collectively think something is worth. Each trade is a small vote, and new information moves the votes.`,
      hi: `Price discovery woh process hai jisse market ek aisa price dhoondhta hai jo buyers aur sellers ki collective soch dikhata hai. Har trade ek chhota vote hai aur nayi information se votes badal jaate hain.`,
      how: `For NIFTY, price discovery happens across the constituent stocks, index futures and options at once; arbitrage keeps them linked. Index futures often react first because they are cheap to trade in size, and the spot index follows. News arrives, providers re-quote, takers cross the spread, and trades print at new prices until supply and demand balance again. Orders in the opening call auction help set the first price of the day.`,
      eg: {
        title: 'News moves the price (illustrative)',
        text: `At 11:00 a sudden positive headline appears. NIFTY futures trade at 24,000 at 11:00:00, 24,012 at 11:00:20 after providers lift their asks, 24,030 at 11:01:00 as takers keep buying, and 24,025 at 11:03:00 as profit-taking balances demand. The 30-point rise (30 × 65 = ₹1,950 per lot) is the market's re-pricing, not a prediction of the future.`,
      },
      tip: `Price is the result of a process. A fast jump is information plus thin books, not proof of a trend.`,
      visual: { kind: 'timeline', title: 'A re-pricing in four minutes (illustrative)', events: [{ when: '11:00:00', what: 'Futures at 24,000', tone: 'neutral' }, { when: '11:00:20', what: '24,012: offers lifted', tone: 'bull' }, { when: '11:01:00', what: '24,030: takers keep buying', tone: 'bull' }, { when: '11:03:00', what: '24,025: profit-taking balances', tone: 'gold' }] },
    },
    {
      t: 10,
      def: `An auction mechanism collects orders for a period and then sets one price at which the largest quantity can trade. NSE uses a call auction in the equity pre-open session so the first price of the day is fair to all orders, not set by whoever clicks fastest.`,
      hi: `Auction mechanism mein kuch der tak orders collect hote hain aur phir ek price tay hota hai jis par sabse zyada quantity trade ho sake. NSE equity pre-open session mein call auction chalata hai taaki din ka pehla price sabhi orders ke liye fair ho, jo sabse tez click kare uske liye nahi.`,
      how: `In the equity pre-open window, order entry runs 9:00 to 9:08, matching (equilibrium price calculation) runs 9:08 to 9:12 and a buffer to 9:15 prepares for normal trading. The equilibrium price is the one that maximises the matched quantity; if there is a tie, the price with the smallest imbalance is chosen. All matched orders trade at that one price. Rules for derivatives sessions and any closing auction are set by NSE circulars, so check the current rules before relying on them.`,
      eg: {
        title: 'Finding the equilibrium (illustrative stock)',
        text: `Cumulative buy quantity at or above each price and cumulative sell quantity at or below: at ₹500.00 buy 9,000, sell 3,000, matched 3,000. At ₹500.50 buy 7,000, sell 6,000, matched 6,000. At ₹501.00 buy 5,000, sell 8,000, matched 5,000. At ₹501.50 buy 2,000, sell 10,000, matched 2,000. The most matched is 6,000 at ₹500.50, so that becomes the opening price and 6,000 shares trade at it.`,
      },
      tip: `In an auction, placing a limit at a sensible price, not a market order, avoids a surprise.`,
      visual: { kind: 'bars', title: 'Matched quantity by price (illustrative)', unit: ' shares', caption: 'The highest bar is the equilibrium price.', items: [{ label: '₹500.00', value: 3000, tone: 'neutral' }, { label: '₹500.50', value: 6000, tone: 'gold' }, { label: '₹501.00', value: 5000, tone: 'neutral' }, { label: '₹501.50', value: 2000, tone: 'neutral' }] },
    },
  ],
  tools: [{ id: 'spread-cost', why: 'Round-trip cost of crossing the spread.' }, { id: 'order-book-impact', why: 'Walk the book for any order size.' }],
}
export default m
