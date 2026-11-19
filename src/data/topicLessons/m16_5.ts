import type { ModuleLesson } from '../topicLessonTypes'

/* Module 16.5 — Liquidity and Institutional Behaviour.
 * All price levels and quantities are illustrative (NIFTY ≈ 24,000, lot 65, check the current NSE contract specification).
 * Book walk: buy 3,000 units against 1,000@24,100.00, 1,000@24,100.50, 1,000@24,101.00 → average 24,100.50, impact 0.5 point.
 * Imbalance: (60,000 − 20,000) ÷ 80,000 = 50%. Risk per lot for a 30-point stop = 30 × 65 = ₹1,950. Trapped buyer 50 points × 65 = ₹3,250. */
const m: ModuleLesson = {
  moduleId: '16.5',
  intro: `Liquidity is the amount that can be bought or sold near the current price without moving it much. Large participants cannot trade their whole size at once, so they behave in ways shaped by where liquidity sits. This module teaches the vocabulary and, just as important, the discipline of separating what you can actually observe (prices, volume, OI, order-book depth) from stories about who is doing it and why.`,
  introHi: `Liquidity ka matlab hai ki current price ke aas-paas kitna maal bina price hilaye kharida ya becha ja sakta hai. Bade participants apna poora size ek saath trade nahi kar sakte, isliye unka behaviour is baat se bantaa hai ki liquidity kahan hai. Yeh module vocabulary sikhata hai, aur us se bhi zaroori, yeh discipline ki jo aap observe kar sakte ho (price, volume, OI, order-book depth) use us kahaniyon se alag rakho ki kaun kya kar raha hai aur kyun.`,
  steps: {
    concept: `Every price level has orders waiting: resting limit orders and pending stop orders. Levels with many orders are liquidity pools. A large participant needs a counterparty, so it may trade where there are plenty of orders. Seeing this is useful; claiming to know the intent behind a move is not.`,
    conceptHi: `Har price level par orders intezaar karte hain: resting limit orders aur pending stop orders. Jin levels par bahut orders hote hain woh liquidity pools hain. Bade participant ko counterparty chahiye, isliye woh wahan trade kar sakta hai jahan orders zyada hain. Yeh dekhna useful hai; move ke peeche ka intent jaanne ka daava karna useful nahi.`,
    mechanism: `Orders cluster at obvious levels: previous day high and low, round numbers like 24,000, and swing points. Breakout traders place buy orders above resistance, and holders of short positions place stop-losses (buy orders) there. When price reaches the level these orders trigger together, volume spikes, and price may overshoot. Once the orders are exhausted and there is no new demand, price can reverse quickly. The exchange order book shows resting limit orders (depth) but not stop orders that have not yet been triggered.`,
    example: {
      title: 'A sweep above the previous day high',
      text: `Illustrative: the previous day high is 24,180. At 11:10 Nifty trades up to 24,185, a 5-point break, and volume doubles as breakout buyers and short stop-losses trigger. Price then falls back below 24,180 and by 11:20 trades at 24,140, 45 points under the high. A trader who bought the breakout at 24,182 with a 30-point stop at 24,152 loses 30 × 65 = ₹1,950 per lot. Whether this was a deliberate hunt for stops or just a failed breakout cannot be told from the chart.`,
    },
    chart: {
      kind: 'candles',
      title: 'False breakout above a prior high',
      pattern: 'falseBreakout',
      level: { price: 24180, label: 'Previous day high' },
      caption: 'Price goes through the level, stalls and closes back inside. This is the pattern; the cause is not visible.',
    },
    optionChain: `The option chain shows where open interest sits, and large OI at a strike can mark a level where hedging or positioning is concentrated. It does not tell you who is long or short, and high OI is a potential level, not guaranteed support or resistance. Watch the premium and OI change at the strikes near a swept level: fresh writing after a sweep and a quick reversal may support a failed-breakout reading, but it is evidence, not proof.`,
    psychology: `Traders feel that "the market came to get my stop" because stops cluster at obvious points and a spike through them is painful and memorable. That is loss aversion plus confirmation bias. A stop placed at the same obvious level as everyone else's is likely to be hit by ordinary noise, so placing stops at a level that invalidates your idea, with a buffer, is a rational response and needs no conspiracy.`,
    scenarios: {
      bullish: `Price sweeps below a prior low, quickly returns above it and holds with rising volume: this may mark a failed breakdown. Confirmation matters: wait for acceptance back inside the range, and size for the chance it keeps falling.`,
      bearish: `Price sweeps above a prior high and returns below it with heavy volume: a possible failed breakout. If price holds above the level instead, the breakout was real and the reversal idea is wrong.`,
      sideways: `In a range, both edges get tested and swept repeatedly without follow-through. Fading the edges may work until the day it does not; keep stops beyond the swept zone, not just beyond the obvious line.`,
    },
    practice: [
      { q: `Previous day high is 24,180. Price spikes to 24,185 and falls back to 24,140. How far above the level did it go and how far did it reverse from the peak?`, a: `It went 24,185 − 24,180 = 5 points above. The reversal from the peak was 24,185 − 24,140 = 45 points.` },
      { q: `You have ₹5,00,000 and risk 1% per trade with a 30-point stop on a lot of 65. How many lots?`, a: `Risk per trade = ₹5,000. Risk per lot = 30 × 65 = ₹1,950. Lots = 5,000 ÷ 1,950 = 2.56, so 2 lots (round down).` },
      { q: `A market buy order of 3,000 units hits 1,000 at 24,100, 1,000 at 24,100.50 and 1,000 at 24,101. Find the average price and impact against a reference of 24,100.`, a: `Total = 24,100 + 24,100.50 + 24,101 = 72,301.50 per 1,000, so average = 24,100.50. Impact = 0.50 point.` },
      { q: `Bid quantity is 60,000 and ask quantity 20,000. Compute the imbalance and say what it does not prove.`, a: `(60,000 − 20,000) ÷ (60,000 + 20,000) = 50%. It does not prove the price will rise: resting orders can be cancelled, and displayed depth is not the same as intent.` },
    ],
    assignment: `Mark the previous day high and low on a Nifty 5-minute chart for five sessions. Note every time price broke one of them, whether it closed back inside within 15 minutes, and the volume on the break. Write which breaks held and which failed, without guessing who was behind them.`,
  },
  topics: [
    {
      t: 1,
      def: `A liquidity pool is a price area where many orders are waiting, such as stop-losses, breakout orders and resting limit orders. It is a place where a large trade can find counterparties. It is not an entity; it is a description of where orders may be concentrated.`,
      hi: `Liquidity pool woh price area hai jahan bahut saare orders intezaar kar rahe hote hain, jaise stop-loss, breakout orders aur resting limit orders. Yahan bade trade ko counterparties mil sakte hain. Yeh koi entity nahi hai; yeh sirf yeh batata hai ki orders kahan concentrated ho sakte hain.`,
      how: `Common pools sit just above previous highs and below previous lows, at round numbers (24,000, 24,500) and around heavy-OI strikes where hedgers act. When price reaches a pool, volume and speed usually rise because many orders trigger together. You can see the pool's past through volume at price and the depth shown in the order book; you cannot see the unfilled stop orders themselves, because exchanges do not display them.`,
      eg: {
        title: 'Where orders may be waiting',
        text: `Illustrative: Nifty at 24,100. The day's high is 24,150 and the previous day's low is 24,020. Shorts from earlier hold stop-buy orders above 24,150; breakout traders place buy orders at 24,155; long holders place sell-stops below 24,020. The areas just above 24,150 and just below 24,020 are the likely pools, and a round number at 24,000 sits close to the lower one.`,
      },
      tip: `A pool is where orders probably are, not proof that anyone is targeting them. Mark them, then wait for price to show what it does there.`,
      visual: { kind: 'layers', title: 'Where orders cluster around price', caption: 'Illustrative layout for a Nifty session.', layers: [{ label: 'Above 24,150: stop-buys and breakout buys', note: 'shorts exiting, breakout entries', tone: 'gold' }, { label: 'Current price 24,100', note: 'resting limit orders both sides', tone: 'neutral' }, { label: 'Below 24,020: sell-stops', note: 'long holders exiting', tone: 'gold' }] },
    },
    {
      t: 2,
      def: `A liquidity sweep is a quick move through a level where orders were clustered, followed by a return back across it. The move uses up the orders at that level. Afterwards price often moves the other way, because the pending orders have been filled and no new demand has come in.`,
      hi: `Liquidity sweep ek tez move hota hai jo us level se guzarta hai jahan orders cluster the, aur phir wapas us level ke paar aa jata hai. Is move mein us level ke orders khatam ho jaate hain. Uske baad price aksar ulti taraf chalta hai kyunki pending orders fill ho chuke hote hain aur naya demand nahi aaya.`,
      how: `The sweep itself is just stop-loss and breakout orders being triggered: short stops buy, breakout buyers buy, and price is pushed up for a moment. If there are no new buyers after that, price slips back below the level. A sweep is judged only after the fact: a sweep that returns inside the range is a failed breakout; one that holds is a real breakout. The speed, volume and where the candle closes help, and so does what happens next at nearby option strikes.`,
      eg: {
        title: 'Sweep or breakout?',
        text: `Illustrative: previous high 24,180. Price spikes to 24,185 on a volume of 3.1 lakh units against a typical 1.5 lakh, then closes the 5-minute candle at 24,172, back under the level. That candle is a sweep-type bar. If instead the next three candles closed at 24,190, 24,198 and 24,205 with steady volume, it would be a breakout and the sweep label would be wrong.`,
      },
      tip: `Do not trade the spike. Wait for the close back inside (or for acceptance above), and decide your stop before entry.`,
      visual: { kind: 'candles', title: 'Sweep and return', pattern: 'falseBreakout', level: { price: 24180, label: 'Level swept' }, caption: 'The wick goes through the level; the close is back inside the range.' },
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 24160, stop: 24190, lotSize: 65 }, why: 'Sizes a fade of the sweep with a stop just beyond the swept high.' },
    },
    {
      t: 3,
      def: `Stop-loss clusters are groups of stop orders placed at the same obvious levels, for example just below a swing low or above a previous high. When price reaches that level these orders turn into market orders at the same time. This can cause a fast, one-directional burst.`,
      hi: `Stop-loss clusters woh jagah hain jahan bahut saare traders ke stop-loss orders ek hi obvious level par rakhe hote hain, jaise swing low ke neeche ya previous high ke upar. Price wahan pahunchte hi yeh orders ek saath market orders ban jaate hain. Isse tez, ek-direction wala burst aa sakta hai.`,
      how: `A stop order sits in the broker or exchange system until its trigger price trades. Then it becomes a market (or stop-limit) order, so many stops at one price lead to a burst of orders at once. In thin markets this can run price past the trigger, and a stop-limit order may not fill at all. Exchanges and brokers do not publish where stops are; clusters are inferred from obvious chart levels.`,
      eg: {
        title: 'A 30-point stop in a cluster',
        text: `Illustrative: a trader buys one lot at 24,010 with a stop at 23,990, just below the round number 24,000. Many others do the same. Price dips to 23,988, triggering the stops, and the sell orders push it briefly to 23,975 before it recovers to 24,040. The stop-out loses (24,010 − 23,980 average fill) × 65 = ₹1,950 per lot, and the position would have gained 30 × 65 = ₹1,950 had the stop been wider.`,
      },
      tip: `The obvious level is where everyone's stop is. Place yours by what invalidates the trade, and allow for some noise beyond the level.`,
      visual: { kind: 'orderBook', title: 'Stops stacked below a round number', caption: 'Resting bids below 24,000 are thin; stop-sells below 24,000 are not shown.', bids: [[24001, 4200], [24000, 12000], [23995, 1800], [23990, 1500]], asks: [[24002, 3000], [24003, 2500], [24005, 4000]] },
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 24010, stop: 23980, lotSize: 65 }, why: 'Shows how stop distance sets lot count.' },
    },
    {
      t: 4,
      def: `Absorption means large passive orders take in the aggressive orders hitting them, so price does not move much even though a lot of volume trades. Sellers keep hitting a level and a big buyer keeps taking the stock. It is seen as high volume with little price progress.`,
      hi: `Absorption ka matlab hai ki bade passive orders aggressive orders ko absorb kar lete hain, isliye bahut volume trade hone ke baad bhi price zyada nahi hilta. Sellers ek level ko baar-baar hit karte hain aur koi bada buyer maal leta rehta hai. Yeh high volume aur kam price progress ke roop mein dikhta hai.`,
      how: `On the order book you may see a bid that keeps refilling after being hit, or on the tape many large prints at one price with no further decline. Absorption can come from a patient institution, from market makers, or from option-hedging flows. It is a description of what the tape shows, and it can fail: if the passive side stops refilling, price may drop fast through the level.`,
      eg: {
        title: 'Volume without progress',
        text: `Illustrative: Nifty futures at 24,100. Over 10 minutes, 45,000 units trade at the bid of 24,100 (market sell orders), yet the price holds 24,100 to 24,101. Normally, 45,000 units would have moved the price a few points. The bid refilled each time. If after those 10 minutes price rises to 24,140, the zone was absorption; if it breaks to 24,070 then absorption has failed.`,
      },
      tip: `Absorption is judged by what price does next. Do not label it until price leaves the zone.`,
      visual: { kind: 'candles', title: 'High volume, little progress', pattern: 'accumulation', caption: 'Heavy trading in a tight band before price leaves it.' },
    },
    {
      t: 5,
      def: `Aggressive execution means trading at the opposite side's price: buying at the ask or selling at the bid with market orders. It demands immediate execution and pays the spread. A large aggressive order can walk through several price levels.`,
      hi: `Aggressive execution ka matlab hai ki aap samne waale ke price par trade karte ho: ask par buy ya bid par sell, market orders se. Yeh turant execution maangta hai aur spread bhi pay karta hai. Bada aggressive order kai price levels cross kar sakta hai.`,
      how: `A market buy order matches with the lowest asks first, then the next levels up as quantity is exhausted. The average price is above the best ask, and the gap to the reference price is the impact cost. Institutions slice big orders over time (VWAP or TWAP algos) to limit this, so a single huge aggressive print is more typical of urgency, such as an expiry-day hedge or a stop cascade.`,
      eg: {
        title: 'Walking the book',
        text: `Best asks: 1,000 units at 24,100, 1,000 at 24,100.50, 1,500 at 24,101 and 2,000 at 24,102. A market buy for 3,000 fills 1,000 at 24,100, 1,000 at 24,100.50 and 1,000 at 24,101: average 24,100.50, impact 0.50 point from the 24,100 reference. A 5,000-unit order would also use the 24,102 level and the average would rise further. Illustrative.`,
      },
      tip: `A market order is a decision to pay for speed. In thin option strikes the cost can be much larger than the brokerage.`,
      visual: { kind: 'orderBook', title: 'A buy walks up the ask side', bids: [[24099.5, 1800], [24099, 2200], [24098.5, 2500]], asks: [[24100, 1000], [24100.5, 1000], [24101, 1500], [24102, 2000]] },
      calc: { id: 'order-book-impact', preset: { side: 'buy', qty: 3000, refPrice: 24100, book: '24100:1000;24100.5:1000;24101:1500;24102:2000' }, why: 'Computes the average fill and impact cost.' },
    },
    {
      t: 6,
      def: `Hidden liquidity is quantity that trades but is not fully displayed in the order book. A common form is the iceberg or disclosed-quantity order, where only part of the order is shown and the rest appears as each shown part fills. The visible book can therefore understate real size.`,
      hi: `Hidden liquidity woh quantity hai jo trade hoti hai par order book mein poori dikhai nahi deti. Iska aam roop iceberg ya disclosed-quantity order hai, jisme order ka sirf ek hissa dikhta hai aur baaki tab aata hai jab dikhne wala hissa fill ho jaye. Isliye visible book asli size se kam dikha sakti hai.`,
      how: `NSE supports disclosed-quantity orders in segments where the rules allow, subject to exchange minimums. A trader enters 10,000 units but discloses 1,000; as each 1,000 fills, the next 1,000 appears. A level that keeps refilling after being hit is a hint of hidden size. Exchange rules and SEBI circulars on order types change, so check the current NSE rules rather than assuming.`,
      eg: {
        title: 'A bid that keeps coming back',
        text: `Illustrative: a 10,000-unit buy order with 1,000 disclosed sits at 24,100. Sellers hit it for 1,000 and the bid refills at once, ten times: 10,000 ÷ 1,000 = 10 refills. The screen showed only 1,000 each time, but the tape printed 10,000 units at 24,100. A trader who sold at the bid thinking only 1,000 was there was selling into 10,000.`,
      },
      tip: `Repeated refills at one price suggest size, but they are only evidence of what traded. They do not show who or why.`,
      visual: { kind: 'flow', title: 'How a disclosed-quantity order appears', steps: [{ label: 'Order 10,000', note: 'shown 1,000', tone: 'gold' }, { label: '1,000 fills', note: 'sellers hit the bid', tone: 'neutral' }, { label: 'Next 1,000 appears', note: 'bid refills', tone: 'gold' }, { label: 'Repeat to 10,000', note: '10 refills', tone: 'ice' }] },
    },
    {
      t: 7,
      def: `Order imbalance is a difference between buy and sell interest, such as much more resting bid quantity than ask quantity, or more aggressive buying than selling over a period. It may point to short-term pressure on price. It is not a prediction.`,
      hi: `Order imbalance buy aur sell interest ka difference hai, jaise ask se kaafi zyada bid quantity ya kisi period mein aggressive buying ka sell se zyada hona. Yeh short-term price pressure ka sanket de sakta hai. Yeh prediction nahi hai.`,
      how: `Compute imbalance as (bid quantity − ask quantity) ÷ (bid + ask). A positive value means more resting buyers. Orders can be cancelled in a moment, and large non-genuine orders placed to mislead (spoofing) are prohibited, so depth is an unreliable signal on its own. Better is imbalance in executed trades: how much traded at the ask versus the bid. NSE shows only the top levels of depth publicly; full order-book data is not part of the ordinary option chain.`,
      eg: {
        title: 'A 50% bid imbalance',
        text: `Top five levels: bids 60,000 units, asks 20,000 units. Imbalance = (60,000 − 20,000) ÷ 80,000 = 50%. Price may tick up in the next few seconds, but if the 60,000 bids are cancelled as price approaches, there was no demand. A trader acting on this alone, buying 24,110 and getting stopped at 24,080, loses 30 × 65 = ₹1,950 a lot. Illustrative.`,
      },
      tip: `Resting orders are promises that can be withdrawn. Trust trades that happened more than orders that are displayed.`,
      visual: { kind: 'orderBook', title: 'A bid-heavy book (illustrative)', bids: [[24100, 22000], [24099.5, 14000], [24099, 12000], [24098.5, 7000], [24098, 5000]], asks: [[24100.5, 6000], [24101, 5000], [24101.5, 4000], [24102, 3000], [24102.5, 2000]] },
    },
    {
      t: 8,
      def: `A failed auction is when price moves beyond the day's recent range to test for new buyers or sellers, finds none, and returns inside. In auction-market thinking, price travels to find where trade is accepted; a failed auction says that area was rejected.`,
      hi: `Failed auction tab hota hai jab price din ki recent range ke bahar jata hai taaki naye buyers ya sellers mile, par koi nahi milta aur price wapas andar aa jata hai. Auction-market ki soch mein price woh jagah dhundta hai jahan trade accept hota hai; failed auction batata hai ki us area ko reject kiya gaya.`,
      how: `Signs are: a move beyond a prior high or low, volume that does not expand or spikes and then dies, a return into the old range, and no time spent trading outside it. The balance area then often acts as the destination: price may travel to the other side of the range. It can still be wrong. If price returns and then re-breaks the level with volume, the earlier failure was a pause.`,
      eg: {
        title: 'Range 24,000 to 24,120',
        text: `Illustrative: Nifty trades 24,000 to 24,120 all morning. At 1:00 PM it pokes to 24,150 for 15 minutes, back inside by 1:15 and falls to 24,040 by 2:00. The 30-point probe above the range found no acceptance, and the distance back to the middle (24,060) was 90 points from the 24,150 high. A long entered at 24,125 and stopped at 24,100 loses 25 × 65 = ₹1,625.`,
      },
      tip: `Acceptance means time and volume outside the range. A quick return is a failed auction; a retest that holds is the start of a new one.`,
      visual: { kind: 'candles', title: 'Failed auction above the range', pattern: 'falseBreakout', level: { price: 24120, label: 'Range high' } },
    },
    {
      t: 9,
      def: `Trapped participants are traders who entered in one direction and then saw price turn against them quickly, so they sit on losses and many must exit. Buyers trapped at the top of a failed breakout are an example. Their forced exits add to the move against them.`,
      hi: `Trapped participants woh traders hain jinhone ek direction mein entry li aur phir price tezi se unke khilaf chala gaya, toh woh loss mein phans gaye aur kaafiyon ko exit karna padta hai. Failed breakout ke top par phansne wale buyers iska example hain. Unke forced exits move ko aur badhate hain.`,
      how: `A breakout draws in buyers near the high. If price falls back under the breakout level, those buyers are underwater, and their stops (below the breakout) become sell orders. That selling pushes price further down and may trigger more stops. Trapped participants are inferred from price behaviour; you cannot see them directly, and not every failed breakout creates a cascade.`,
      eg: {
        title: 'Breakout buyers at 24,150',
        text: `Illustrative: Nifty breaks 24,150 and buyers enter at 24,152. Price reverses to 24,100, so each lot is down 52 points, or 52 × 65 = ₹3,380 per lot. Stops placed at 24,120 (a 32-point loss, ₹2,080 a lot) trigger on the way down and add selling. A buyer who stayed in with no stop is now carrying the entire loss.`,
      },
      tip: `Buying a breakout is only a trade if you know the exact price that proves you wrong, and act on it.`,
      visual: { kind: 'matrix', title: 'Who is trapped after a failed breakout', xLabels: ['Price falls back', 'Price holds above'], yLabels: ['Breakout buyers', 'Short sellers'], cells: [{ head: 'Buyers trapped', note: 'stops become sell orders', tone: 'bear' }, { head: 'Buyers fine', note: 'breakout accepted', tone: 'bull' }, { head: 'Shorts relieved', note: 'price back below', tone: 'bull' }, { head: 'Shorts trapped', note: 'stops become buy orders', tone: 'bear' }] },
      calc: { id: 'futures-pnl', preset: { side: 'long', entry: 24152, exit: 24100, lotSize: 65, lots: 1 }, why: 'Quantifies the loss on a trapped breakout buyer.' },
    },
    {
      t: 10,
      def: `Observable evidence is what the market data actually shows: prices, volume, open interest, bid-ask depth and time. Speculation about manipulation is an assumption about who did it and why. Good analysis stays with the first and labels the second as a hypothesis. Manipulation is a legal matter decided by SEBI and the courts, not by a chart.`,
      hi: `Observable evidence woh hai jo market data sach mein dikhata hai: price, volume, open interest, bid-ask depth aur time. Manipulation ki speculation ek assumption hai ki kisne kiya aur kyun. Achha analysis pehle par tikta hai aur doosre ko hypothesis kehta hai. Manipulation ka faisla SEBI aur courts karte hain, chart nahi.`,
      how: `Separate three layers. Observed: price spiked 5 points above the high on double volume and closed back inside. Inferred: stops and breakout orders were triggered. Speculated: a specific player engineered it. Regulators have taken action in some cases (for example SEBI's July 2025 interim order alleging manipulative expiry-day practices in index options by a foreign trading firm, which the firm contested; check the latest status), but those findings came from detailed order-level data that retail traders do not have. Without that data, the correct statement is what the tape shows.`,
      eg: {
        title: 'Three sentences about one spike',
        text: `Observed: at 11:10 Nifty spiked from 24,172 to 24,185 and back to 24,140 by 11:20 on volume twice the average. Inferred: stops above 24,180 and breakout buys were probably triggered. Speculated: a large player pushed the price to trigger them. Only the first two are supported by what you can see, and only the first is a fact. Writing the third as fact in a trading journal trains a habit of excuses.`,
      },
      tip: `Blaming manipulation is the easiest way to avoid reviewing your own stop placement. Ask what the data shows and what you would change.`,
      visual: { kind: 'layers', title: 'Three layers of a market story', layers: [{ label: 'Observed', note: 'prices, volume, OI, depth', tone: 'ice' }, { label: 'Inferred', note: 'orders probably triggered', tone: 'gold' }, { label: 'Speculated', note: 'who did it and why', tone: 'neutral' }] },
    },
  ],
  tools: [
    { id: 'order-book-impact', why: 'See how market orders walk the book.' },
    { id: 'position-size', why: 'Set size from the stop distance.' },
  ],
}
export default m
