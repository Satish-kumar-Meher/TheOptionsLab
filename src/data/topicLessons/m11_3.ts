import type { ModuleLesson } from '../topicLessonTypes'

/* Module 11.3 — Order Book Fundamentals.
 * All numbers illustrative: a made-up 24,100 CE book, lot 65 (check the current NSE contract specification), option tick size Rs 0.05.
 * The displayed book is typically the best five price levels; iceberg/disclosed-quantity, market-order and stop-order rules differ by
 * exchange segment and broker - verify with the broker's order-type page and NSE circulars. */
const m: ModuleLesson = {
  moduleId: '11.3',
  intro: `Every price on your screen is the result of buy and sell orders meeting in the exchange's order book. If you understand what sits in the book and how an order of a given type is matched, you can predict what a market order will really cost you and why a stop-loss sometimes fills far from its trigger. This is the plumbing under every option trade.`,
  introHi: `Screen par dikhne wala har price exchange ke order book mein buy aur sell orders ke milne ka nateeja hota hai. Agar aap samajh lo ki book mein kya baitha hai aur har type ka order kaise match hota hai, toh aap pehle se bata sakte ho ki market order ki asli keemat kya padegi aur stop-loss kabhi kabhi trigger se itni door kyun fill hota hai. Yeh har option trade ke neeche ka plumbing hai.`,
  steps: {
    concept: `The order book is a live list of all unmatched buy orders (bids) and sell orders (asks) for one contract, sorted by price. The highest bid and the lowest ask are the best quotes; the gap between them is the spread. A trade happens when a buyer and a seller agree on a price, which means a new order meets a resting order of the opposite side.`,
    conceptHi: `Order book ek live list hai jisme ek contract ke saare unmatched buy orders (bids) aur sell orders (asks) price ke order mein hote hain. Sabse upar ki bid aur sabse neeche ka ask best quotes hain, aur dono ka farak spread hai. Trade tab hota hai jab ek naya order opposite side ke resting order se milta hai.`,
    mechanism: `The exchange matching engine uses price-time priority: the best price is served first, and among equal prices the order that arrived earlier is served first. An aggressive order (market order, or a limit order priced at or through the opposite best quote) takes liquidity and trades at once. A passive limit order rests in the book and waits for someone to trade against it. Stop orders stay with the system until their trigger price is reached and then turn into a market or limit order.`,
    example: {
      title: 'A market buy walks the book (illustrative)',
      text: `The 24,100 CE book: asks 80.10 × 585, 80.15 × 1,170, 80.20 × 780; bids 80.00 × 650, 79.95 × 1,300. A market buy for 20 lots (1,300 units) takes 585 at 80.10 and 715 at 80.15. Cost = 585 × 80.10 + 715 × 80.15 = 46,858.50 + 57,307.25 = ₹1,04,165.75, an average of 80.1275, which is 0.0275 above the best ask. Small here; in a thin strike with fewer orders it can be much more.`,
    },
    chart: {
      kind: 'orderBook',
      title: '24,100 CE order book (illustrative)',
      caption: 'Quantities are in units; one lot is 65. Best bid 80.00, best ask 80.10, spread 0.10.',
      bids: [[80.0, 650], [79.95, 1300], [79.9, 975], [79.85, 2600], [79.8, 1950]],
      asks: [[80.1, 585], [80.15, 1170], [80.2, 780], [80.25, 1625], [80.3, 910]],
    },
    optionChain: `The option chain's LTP, bid and ask columns are the top of each strike's order book. A wide bid-ask gap, small quantities on the best quotes and a low volume figure tell you that strike is thin and market orders there will cost more. OI is a different thing: it counts open contracts, not resting orders, so a large OI strike can still have a poor order book on a given morning.`,
    psychology: `Beginners treat the last traded price as the price they will get. It is not: it is the price of the last trade, which may be seconds old. Impatient traders use market orders and pay the spread every time; patient ones use limit orders and sometimes miss the move. Neither is right always. The skill is knowing the cost of each choice before pressing the button.`,
    scenarios: {
      bullish: `In a fast rise, offers get lifted and the ask side thins out. A market buy walks up several levels and pays more than the screen showed; a limit buy below the market may never fill.`,
      bearish: `In a fast fall, bids are pulled or consumed. A stop-loss triggers, becomes a market or limit sell and may fill at a worse price than the trigger, especially in an option with wide spreads.`,
      sideways: `In a quiet market the book is stable and the spread narrows. Limit orders at the bid or ask get filled slowly and the cost of crossing the spread is the main expense.`,
    },
    practice: [
      {
        q: `Best bid is 80.00 and best ask is 80.10. What are the spread, the mid price and the spread as a percentage of mid?`,
        a: `Spread = 80.10 − 80.00 = 0.10. Mid = 80.05. Percentage = 0.10 / 80.05 = 0.125%.`,
      },
      {
        q: `Using the asks in the lesson, what is the average price of a market buy of 1,300 units?`,
        a: `585 × 80.10 = 46,858.50 and 715 × 80.15 = 57,307.25. Total = 1,04,165.75. Average = 1,04,165.75 / 1,300 = 80.1275.`,
      },
      {
        q: `A market sell of 975 units meets bids 80.00 × 650 and 79.95 × 1,300. What is the average sale price?`,
        a: `650 × 80.00 = 52,000. 325 × 79.95 = 25,983.75. Total = 77,983.75. Average = 77,983.75 / 975 = 79.9808.`,
      },
      {
        q: `You bought one lot at 80.10 with a stop-loss trigger 76.00 and limit 75.50. If it fills at 75.50 what is the loss, and if price gaps and you are filled at 70.00?`,
        a: `At 75.50: (80.10 − 75.50) × 65 = 4.60 × 65 = ₹299. At 70.00: (80.10 − 70.00) × 65 = 10.10 × 65 = ₹656.50. A stop-limit that does not fill gives no exit at all, which is a third and worse outcome.`,
      },
    ],
    assignment: `Pick an ATM and an OTM NIFTY option during market hours. Note the five bid and ask levels and quantities at three different times of day. Compute the spread, total bid and ask quantity and the average price of buying 10 lots at market. Which strike was costlier to trade, and at what time?`,
  },
  topics: [
    {
      t: 1,
      def: `An order book is the exchange's list of all open buy and sell orders for a contract, arranged by price. Buyers' orders (bids) are listed from the highest price down, sellers' orders (asks) from the lowest price up. The best bid and best ask at the top are the live market.`,
      hi: `Order book exchange ki woh list hai jisme ek contract ke saare open buy aur sell orders price ke hisaab se rakhe hote hain. Buyers ke orders (bids) sabse ooncha price pehle, sellers ke orders (asks) sabse kam price pehle. Upar ki best bid aur best ask hi live market hai.`,
      how: `Orders from all brokers flow to the NSE trading system, which sorts them and matches them continuously from 9:15 to 15:30. The system shows a depth of the best five levels on both sides in the standard feed; deeper levels exist but are not shown, and some data vendors sell more. The book changes many times a second as orders are placed, changed, cancelled and matched. A screenshot is therefore a moment, not a rule.`,
      eg: {
        title: 'Reading the five levels (illustrative)',
        text: `Bids total 650 + 1,300 + 975 + 2,600 + 1,950 = 7,475 units and asks total 585 + 1,170 + 780 + 1,625 + 910 = 5,070 units. The ratio is 7,475 / 5,070 = 1.47, so more units are waiting to buy than to sell within five levels. That is a snapshot, not a forecast: orders can be cancelled in a second.`,
      },
      tip: `Treat the visible book as a moment in time; resting orders can disappear before they are ever hit.`,
      visual: { kind: 'orderBook', title: 'Order book', caption: 'Bids below, asks above; the gap is the spread.', bids: [[80.0, 650], [79.95, 1300], [79.9, 975], [79.85, 2600], [79.8, 1950]], asks: [[80.1, 585], [80.15, 1170], [80.2, 780], [80.25, 1625], [80.3, 910]] },
      calc: { id: 'spread-cost', preset: { bid: 80.0, ask: 80.1, qty: 1, lotSize: 65 }, why: 'Spread 0.10 means one lot costs 0.10 × 65 = ₹6.50 round trip against mid.' },
    },
    {
      t: 2,
      def: `Bid quantity is the number of units that buyers have placed at a price, waiting to buy. The best bid is the highest price at which someone is willing to buy right now. It is the price a seller gets by hitting the bid with a market sell.`,
      hi: `Bid quantity woh quantity hai jo buyers ne kisi price par khareedne ke liye lagayi hui hai. Best bid us waqt sabse ooncha price hai jis par koi khareedne ko tayyar hai. Market sell karne wale ko yahi price milta hai.`,
      how: `Large bid quantity at one price may become a short-term floor only if the orders stay and are not cancelled when price comes near. Bid quantity can be genuine demand, an algorithm's passive order or a hedge. Because bids can be pulled instantly, they say little about direction on their own. For options, the best bid is also what the exit of a long position will realise, not the last traded price.`,
      eg: {
        title: 'Why your exit price is the bid (illustrative)',
        text: `You hold one lot bought at 80.10. The screen shows last price 80.05, best bid 80.00. A market sell fills at 80.00 for the first 650 units, so your 65 units exit at 80.00: (80.00 − 80.10) × 65 = −₹6.50 before charges, a loss from the spread alone.`,
      },
      tip: `Judge your exit by the best bid, not by the last price, especially in thin strikes.`,
      visual: { kind: 'bars', title: 'Bid quantity by level (units)', unit: '', caption: 'Illustrative; level 1 is the best bid.', items: [{ label: '80.00', value: 650, tone: 'bull' }, { label: '79.95', value: 1300, tone: 'bull' }, { label: '79.90', value: 975, tone: 'bull' }, { label: '79.85', value: 2600, tone: 'bull' }, { label: '79.80', value: 1950, tone: 'bull' }] },
    },
    {
      t: 3,
      def: `Ask quantity is the number of units that sellers have offered at a price. The best ask is the lowest price at which someone will sell now, and it is what a buyer pays with a market buy. Asks are also called offers.`,
      hi: `Ask quantity woh quantity hai jo sellers ne kisi price par bechne ke liye lagayi hui hai. Best ask sabse kam price hai jis par koi abhi bechne ko tayyar hai, aur market buy karne wale ko yahi price dena padta hai. Asks ko offers bhi kehte hain.`,
      how: `A thin ask side means that a buyer of a given size will walk up through several price levels. Market makers and writers place much of the ask quantity in options, so it also reflects their view of the premium. Quantities are shown in units; the lot size converts them to lots, so 585 units is 585 / 65 = 9 lots. Because the book shows only five levels, do not assume that an ask above the fifth level is far away.`,
      eg: {
        title: 'Counting lots on the ask (illustrative)',
        text: `The asks are 585, 1,170, 780, 1,625 and 910 units, which is 9, 18, 12, 25 and 14 lots. Buying 30 lots at market takes 9 lots at 80.10, 18 lots at 80.15 and 3 lots at 80.20: 585 × 80.10 + 1,170 × 80.15 + 195 × 80.20 = 46,858.50 + 93,775.50 + 15,639 = ₹1,56,273, which averages 80.1400 per unit over 1,950 units.`,
      },
      tip: `Convert units into lots before you judge whether the book can absorb your order.`,
      visual: { kind: 'bars', title: 'Ask quantity by level (lots)', unit: ' lots', caption: 'Units divided by the lot size of 65.', items: [{ label: '80.10', value: 9, tone: 'bear' }, { label: '80.15', value: 18, tone: 'bear' }, { label: '80.20', value: 12, tone: 'bear' }, { label: '80.25', value: 25, tone: 'bear' }, { label: '80.30', value: 14, tone: 'bear' }] },
      calc: { id: 'order-book-impact', preset: { side: 'buy', qty: 1950, refPrice: 80.1, book: '80.10:585;80.15:1170;80.20:780;80.25:1625;80.30:910' }, why: 'Walks the asks for a 30-lot buy and reports the average of 80.14.' },
    },
    {
      t: 4,
      def: `A market order says "execute now at the best available price". It is filled against the opposite side of the book immediately, but the final price is not guaranteed. In a thin option, the last fill can be far from the price you saw.`,
      hi: `Market order ka matlab hai "abhi ke best available price par execute karo". Yeh opposite side ke book se turant fill ho jaata hai, lekin final price guaranteed nahi hota. Patle option mein aakhri fill us price se kaafi door ho sakta hai jo aapne screen par dekha tha.`,
      how: `A market order takes liquidity, so it pays the spread and, if large, walks through several levels. Exchanges and brokers apply protections against extreme prices in derivatives, and many brokers restrict or convert market orders in options into limit orders within a band; check how your broker handles it. A market order's certainty is that it executes; its cost is uncertainty about price. It suits liquid contracts such as ATM weekly NIFTY options during active hours.`,
      eg: {
        title: 'A market sell in a thin strike (illustrative)',
        text: `A far-OTM put shows bid 3.00 × 130, then 2.80 × 130, then 2.50 × 650. You sell 5 lots (325 units) at market: 130 at 3.00, 130 at 2.80, 65 at 2.50 = 390 + 364 + 162.50 = ₹916.50, average 2.82, which is 6% below the screen's 3.00. In a ₹3 option a few paise are a large percentage.`,
      },
      tip: `Use market orders only where the spread is tiny and depth is large; otherwise price your own limit.`,
      visual: { kind: 'flow', title: 'Market order path', steps: [{ label: 'You send market buy', tone: 'gold' }, { label: 'Hits best ask', note: 'fills at once', tone: 'ice' }, { label: 'Quantity left?', note: 'walks next level', tone: 'gold' }, { label: 'Average price', note: 'worse than screen', tone: 'bear' }] },
      calc: { id: 'order-book-impact', preset: { side: 'sell', qty: 325, refPrice: 3.0, book: '3.00:130;2.80:130;2.50:650' }, why: 'Reproduces the average sale price of 2.82 for the thin put.' },
    },
    {
      t: 5,
      def: `A limit order sets the worst price you will accept: a buy limit will not pay more than the limit price and a sell limit will not accept less. It rests in the book if it cannot trade immediately. It gives price control but no certainty of being filled.`,
      hi: `Limit order mein aap worst price tay karte ho: buy limit us price se upar nahi khareedega aur sell limit us price se neeche nahi bechega. Agar turant trade nahi ho sakta toh woh book mein baitha rehta hai. Isme price par control milta hai par fill hone ki guarantee nahi.`,
      how: `A limit order priced at or through the opposite best quote trades immediately like a market order, up to its limit. One priced inside the spread improves the quote and becomes the new best bid or ask. One priced behind the best quote joins the queue by time priority. Many traders place a limit one tick (₹0.05) better than the best quote to be first. The risk is that the market runs away and the order is never filled, while a trade that moved without you leaves you out.`,
      eg: {
        title: 'Limit inside the spread (illustrative)',
        text: `Best bid 80.00, best ask 80.10. A buy limit at 80.05 rests as the new best bid and, if a seller comes, fills at 80.05, saving 0.05 × 65 = ₹3.25 per lot against buying at 80.10. If the option runs to 82 without trading at 80.05 the order is never filled and you missed the move.`,
      },
      tip: `The price you save with a limit order must be weighed against the trade you may miss.`,
      visual: { kind: 'compare', title: 'Market vs limit', left: { head: 'Market order', tone: 'gold', points: ['Fills now', 'Pays the spread', 'Price not guaranteed'] }, right: { head: 'Limit order', tone: 'ice', points: ['Price guaranteed', 'May not fill', 'Rests in the book'] } },
      calc: { id: 'spread-cost', preset: { bid: 80.0, ask: 80.1, qty: 10, lotSize: 65 }, why: 'Shows the cost of crossing the spread for 10 lots (₹32.50 one way against mid).' },
    },
    {
      t: 6,
      def: `A stop-loss order is an instruction that stays inactive until the market reaches a trigger price and then becomes an order to exit. It helps limit a loss without watching the screen all the time. A stop-loss can be a stop-loss market (SL-M) or a stop-loss limit (SL).`,
      hi: `Stop-loss order ek instruction hai jo tab tak inactive rehta hai jab tak market trigger price tak na pahunche, aur phir exit order ban jaata hai. Isse screen dekhe bina loss limit kar sakte hain. Stop-loss SL-M (market) ya SL (limit) ho sakta hai.`,
      how: `The trigger is a price, not a guarantee of the fill price. When the last traded price touches the trigger, the order is sent as a market order (SL-M) or a limit order (SL). In fast moves the fill can be well beyond the trigger. In options, where spreads are wide, a stop placed too tight can be hit by the spread or by a brief spike, and the exit price comes from the bid at that moment. Check whether your broker holds the stop on its own system or sends it to the exchange.`,
      eg: {
        title: 'Stop at 76 (illustrative)',
        text: `Bought one lot at 80.10 with a stop trigger of 76. The price falls through 76 and the first available bid is 75.40, so an SL-M fills at about 75.40: loss = (80.10 − 75.40) × 65 = ₹305.50, which is ₹6.50 worse than the planned (80.10 − 76) × 65 = ₹266.50 loss... a difference of about ₹39 on this lot.`,
      },
      tip: `Plan the loss at the fill you may get, not at the trigger.`,
      visual: { kind: 'timeline', title: 'How a stop-loss triggers', events: [{ when: 'Placed', what: 'Trigger 76.00, order waiting', tone: 'ice' }, { when: 'Price touches 76.00', what: 'Order is sent to the exchange', tone: 'gold' }, { when: 'Matching', what: 'Fills against the current bid', tone: 'bear' }, { when: 'Result', what: 'Fill may be below trigger', tone: 'bear' }] },
    },
    {
      t: 7,
      def: `A stop-limit order has two prices: a trigger and a limit. When the trigger is touched, a limit order is placed at the limit price, so you will not sell below it. The danger is that the market may skip past your limit and the order never fills.`,
      hi: `Stop-limit order mein do price hote hain: trigger aur limit. Trigger chhoone par limit price par ek limit order lag jaata hai, matlab aap us se neeche nahi bechoge. Khatra yeh hai ki market aapke limit se aage nikal sakta hai aur order fill hi nahi hota.`,
      how: `A sell stop-limit with trigger 76.00 and limit 75.50 will sell at 75.50 or better. If price gaps from 76.20 to 74.00 the limit order rests unfilled while the option keeps falling. You then hold a loser with no protection, exactly when you thought you were covered. The wider the gap between trigger and limit, the more likely a fill, but the worse the price. Gap openings and fast news moves are the cases where it fails.`,
      eg: {
        title: 'Stop-limit that did not fill (illustrative)',
        text: `Bought at 80.10, trigger 76.00, limit 75.50. NIFTY gaps down overnight and the option opens at 70.00. The limit order sits at 75.50 and never trades; the option falls to 62 by evening. Loss at 62 would be (80.10 − 62) × 65 = ₹1,176.50, against ₹299 planned at 75.50.`,
      },
      tip: `A stop-limit protects the price but not the exit; for a hard exit prefer a stop-market and accept some slippage.`,
      visual: { kind: 'compare', title: 'SL-M vs SL', left: { head: 'Stop-market', tone: 'gold', points: ['Exit is near-certain', 'Fill price uncertain'] }, right: { head: 'Stop-limit', tone: 'ice', points: ['Fill price capped', 'May never fill in a gap'] } },
    },
    {
      t: 8,
      def: `An iceberg order is a large order shown to the market in small slices. Only the disclosed quantity appears in the book; when it is filled the next slice is shown. It is used to hide size and reduce market impact.`,
      hi: `Iceberg order ek bada order hota hai jo market ko chhote tukdon mein dikhaya jaata hai. Book mein sirf disclosed quantity dikhti hai; woh fill ho jaaye toh agla hissa dikhta hai. Isse size chhupti hai aur market impact kam hota hai.`,
      how: `Institutions and algorithms use icebergs, often through time-sliced execution, so that a 100-lot order does not scare the market. Exchanges allow a disclosed quantity feature, and brokers offer iceberg orders for some segments, with their own limits; check yours. The practical effect for observers is that a level that keeps refilling after being hit may hide much more size than it shows, and a quantity that looks small may not be the whole story. Hidden size cannot be read from the screen.`,
      eg: {
        title: 'A 100-lot order shown as 10 (illustrative)',
        text: `A fund wants to sell 100 lots (6,500 units) of a call at 80.00. It shows 10 lots (650 units). Each time 650 units trade, another 650 appear. Observers see the best bid of 650 get hit again and again at 80.00 and may wrongly think demand is endless, while the visible quantity was never the full picture.`,
      },
      tip: `A level that keeps refilling suggests hidden size but cannot tell you whose or why.`,
      visual: { kind: 'layers', title: 'Visible versus hidden', layers: [{ label: 'Total order: 100 lots', note: 'known only to the trader and system', tone: 'neutral' }, { label: 'Disclosed slice: 10 lots', note: 'what the book shows', tone: 'gold' }] },
    },
    {
      t: 9,
      def: `A partial fill happens when only part of an order can be traded at once because the book does not have enough quantity at your price. The rest stays open, waiting, or is cancelled depending on the order validity. Both fills together form your position.`,
      hi: `Partial fill tab hota hai jab aapke price par book mein poori quantity nahi hoti aur sirf hissa trade hota hai. Baaki order open rehta hai ya order validity ke hisaab se cancel ho jaata hai. Dono fills milkar aapki position banate hain.`,
      how: `If you send a day limit buy for 1,300 units at 80.10 and only 585 are offered at that price, 585 fill and 715 rest as a bid at 80.10. With an IOC (immediate or cancel) order the unfilled part is cancelled instead. You may end up with a position smaller than planned, or filled at several prices; the average price of the fills is your entry. Brokerage and charges may apply per executed order or trade, so check how your broker counts partial fills.`,
      eg: {
        title: 'Limit order with a partial fill (illustrative)',
        text: `Buy 20 lots (1,300 units) at limit 80.10. 585 units (9 lots) fill at 80.10: ₹46,858.50. The remaining 715 (11 lots) rest at 80.10 as the new best bid. If price moves up to 80.50 you hold only 9 lots, and the 11 lots stay unfilled until you cancel or modify them.`,
      },
      tip: `Check the order status and the filled quantity after every limit order, not only the price.`,
      visual: { kind: 'flow', title: 'A partially filled limit order', steps: [{ label: 'Buy 1,300 at 80.10', tone: 'gold' }, { label: '585 filled', note: 'at 80.10', tone: 'bull' }, { label: '715 rest in the book', note: 'new best bid', tone: 'ice' }, { label: 'Wait, modify or cancel', tone: 'neutral' }] },
      calc: { id: 'vwap-twap', preset: { fills: '80.10:585;80.15:715' }, why: 'Gives the average price of the two fills in the walk-the-book example, 80.1275.' },
    },
    {
      t: 10,
      def: `Order matching is the process by which the exchange pairs buy and sell orders into trades. NSE uses price-time priority: a better price gets served first, and at the same price the older order goes first. Every trade happens at a price at which both sides had agreed.`,
      hi: `Order matching woh process hai jisse exchange buy aur sell orders ko jodkar trade banata hai. NSE price-time priority use karta hai: behtar price pehle serve hota hai, aur same price par purana order pehle. Har trade us price par hota hai jis par dono side raazi the.`,
      how: `An incoming order is compared with the best opposite resting order; if prices cross, a trade occurs at the resting order's price, and the incoming order continues down the book until it is complete or its limit is reached. Orders at the same price are served in the sequence they were entered, so cancelling and re-entering to change a price sends you to the back of the queue, and modifying only quantity upward may do the same. The matching engine is anonymous: you do not see who is on the other side.`,
      eg: {
        title: 'Price-time priority (illustrative)',
        text: `Two buyers sit at 80.00: A with 650 units entered at 10:01:02, B with 650 units at 10:01:09. A seller hits the bid for 650: A is filled first, B is untouched. A third buyer at 80.05 would be served before both, since a better price comes first. A market sell of 975 would take 650 at 80.00 and then 325 at 79.95, averaging 79.9808.`,
      },
      tip: `Queue position is valuable; re-entering an order to chase a tick may move you to the back.`,
      visual: { kind: 'flow', title: 'Matching sequence', steps: [{ label: 'Order arrives', tone: 'gold' }, { label: 'Best price first', note: 'price priority', tone: 'ice' }, { label: 'Earlier order first', note: 'time priority', tone: 'ice' }, { label: 'Trade at resting price', tone: 'bull' }] },
    },
  ],
  tools: [{ id: 'order-book-impact', preset: { side: 'buy', qty: 1300, refPrice: 80.1, book: '80.10:585;80.15:1170;80.20:780;80.25:1625;80.30:910' }, why: 'Walk the lesson book for any size.' }],
}
export default m
