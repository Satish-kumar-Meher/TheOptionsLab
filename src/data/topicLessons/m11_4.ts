import type { ModuleLesson } from '../topicLessonTypes'

/* Module 11.4 — Order Flow Analysis.
 * All numbers illustrative: NIFTY futures ≈ 24,000, lot 65 (check the current NSE contract specification).
 * Order flow here means reading who was the aggressor in each trade. NSE does not publish the identity of traders
 * and does not tag trades as buyer- or seller-initiated in its public data; most tools infer it from bid/ask ticks. */
const m: ModuleLesson = {
  moduleId: '11.4',
  intro: `Every trade has a buyer and a seller, but only one of them was in a hurry. Order flow analysis studies that hurry: who crossed the spread, how much, and whether price moved or stalled as a result. It is a short-term tool that works best on liquid instruments such as NIFTY futures, and its tags are inferences, not exchange-certified facts.`,
  introHi: `Har trade mein ek buyer aur ek seller hota hai, lekin jaldi sirf ek ko hoti hai. Order flow analysis isi jaldi ko padhta hai: kisne spread cross kiya, kitna, aur price chali ya ruk gayi. Yeh short-term tool hai jo NIFTY futures jaise liquid instruments par best chalta hai, aur iske tags inference hain, exchange ke certified facts nahi.`,
  steps: {
    concept: `Order flow splits volume into trades done at the ask (buyer was the aggressor) and trades done at the bid (seller was the aggressor). The difference is called delta, and its running total is cumulative volume delta (CVD). When price and flow agree, a move is healthy. When price keeps rising but aggressive buying dries up, or price stalls despite heavy aggression, the flow is warning that something is changing. It describes pressure, not intention, and not who the trader is.`,
    conceptHi: `Order flow volume ko do hisson mein baantta hai: ask par hue trades (buyer aggressive tha) aur bid par hue trades (seller aggressive tha). Dono ka difference delta hai aur uska running total cumulative volume delta (CVD). Jab price aur flow ek hi taraf hon toh move healthy hai. Jab price badhta rahe par aggressive buying sookh jaye, ya heavy aggression ke bawajood price ruk jaye, toh flow warning de raha hai. Yeh pressure dikhata hai, intention ya trader ki pehchaan nahi.`,
    mechanism: `NSE matches orders on price-time priority. A resting limit order waits in the book; an incoming order that crosses the spread executes against it at once. The incoming order is the aggressor. Charting tools take the tick feed, compare each trade price with the prevailing best bid and ask, and tag it as buy-initiated or sell-initiated. This tagging is an approximation: orders can be split, hidden by iceberg-style slicing, or matched inside the spread. Delta and CVD are therefore estimates built on a rule, and different vendors can show slightly different numbers.`,
    example: {
      title: 'Five minutes of NIFTY futures flow (illustrative)',
      text: `Minute-wise, contracts traded at the ask minus contracts traded at the bid: minute 1 is 620 − 380 = +240; minute 2 is 540 − 460 = +80; minute 3 is 330 − 480 = −150; minute 4 is 250 − 570 = −320; minute 5 is 470 − 410 = +60. CVD builds as 240, 320, 170, −150, −90. The first two minutes show buyers pressing, minute 4 shows a clear flip to sellers, and total volume of 4,110 contracts nets to −90, which is almost balanced. A trader looking only at total volume would see activity but not the shift in who was pushing.`,
    },
    chart: {
      kind: 'bars',
      title: 'Delta per minute (illustrative)',
      caption: 'Green bars are net aggressive buying, red bars net aggressive selling, in contracts. CVD is the running total of these bars.',
      unit: ' contracts',
      items: [
        { label: 'Min 1', value: 240, tone: 'bull' },
        { label: 'Min 2', value: 80, tone: 'bull' },
        { label: 'Min 3', value: -150, tone: 'bear' },
        { label: 'Min 4', value: -320, tone: 'bear' },
        { label: 'Min 5', value: 60, tone: 'bull' },
      ],
    },
    optionChain: `Order-flow tags are most reliable in NIFTY futures, where volume is deep and tick data is continuous. They are much less reliable on individual option strikes, where spreads are wider and a single order can distort the numbers. The option chain shows OI and volume, not aggressor side, and OI cannot show who initiated a trade. Use futures order flow for timing, and the chain only for context about possible levels.`,
    psychology: `Aggressive buyers are willing to pay the offer because they fear missing the move. Aggressive sellers accept the bid because they want out or want in short now. A passive limit order is the opposite mood: patience, a price target, and tolerance for not getting filled. When flow and price diverge, someone is being surprised, and that surprise is often what moves the next few candles. The beginner mistake is to treat every delta spike as a signal rather than as evidence that needs a location, such as a known level.`,
    scenarios: {
      bullish: `Price rises, delta is positive and CVD makes higher highs along with price. Aggressive buyers keep lifting offers and passive sellers are being absorbed upward. The idea weakens if CVD flattens while price keeps rising.`,
      bearish: `Price falls with negative delta and CVD making lower lows. Sellers are hitting bids and buyers are not stepping in. The idea weakens if heavy selling appears but price stops falling, which suggests absorption by passive buyers.`,
      sideways: `Price oscillates, delta flips sign candle to candle and CVD drifts near flat. Neither side is in control. A burst of one-sided delta that finally moves price out of the range is the signal to watch, not the noise inside it.`,
    },
    practice: [
      { q: `In one minute, 700 contracts trade at the ask and 520 at the bid. What is the delta and total volume?`, a: `Delta = 700 − 520 = +180 contracts. Total volume = 700 + 520 = 1,220 contracts. Net aggression favoured buyers by 180 contracts, which is 180 × 65 = 11,700 units of NIFTY.` },
      { q: `Deltas over four minutes are +300, −500, −200, +100. Give the CVD after each minute.`, a: `After minute 1: 300. After minute 2: 300 − 500 = −200. After minute 3: −200 − 200 = −400. After minute 4: −400 + 100 = −300. CVD ends at −300, so sellers were net more aggressive over the window.` },
      { q: `A market buy order of 500 contracts walks asks of 200 at 24,010.0 and 300 at 24,010.5. What is its average price and impact versus the best ask?`, a: `Cost = 200 × 24,010.0 + 300 × 24,010.5 = 48,02,000 + 72,03,150 = 1,20,05,150. Average = 1,20,05,150 / 500 = 24,010.30. Impact versus best ask 24,010.0 is 0.30 points per unit.` },
      { q: `Why can a vendor's CVD differ from another vendor's for the same contract?`, a: `Neither number is an exchange-published fact. Each vendor applies its own rule to tag ticks as buy or sell (for example by comparing the trade price with the quote at that instant) and may sample at different speeds, so small differences are expected.` },
    ],
    assignment: `Open a one-minute chart of NIFTY futures on a platform that shows volume at bid and ask (or, if you do not have one, note the top-5 depth and trade ticks by hand for 15 minutes). Record delta for each minute and the running CVD. Mark every moment where price made a new high or low but CVD did not, and check what price did over the next 10 minutes. Treat the result as a diary, not as proof.`,
  },
  topics: [
    {
      t: 1,
      def: `Aggressive buying is when a buyer chooses speed over price and takes the best available offer instead of waiting. The order crosses the spread and executes immediately against sellers who were resting in the book.`,
      hi: `Aggressive buying matlab buyer ne price se zyada speed ko choose kiya aur best available offer ko seedha le liya, wait nahi kiya. Order spread cross karke turant un sellers ke saath execute ho jata hai jo book mein baithe the.`,
      how: `On NSE the book holds resting limit sell orders (asks) sorted by price, then time. A buy order priced at or above the best ask matches at once, and the trade is tagged buy-initiated. If the order is larger than the quantity at the best ask, it walks up to the next price. Aggression is not the same as being right: a large aggressive buy shows urgency, and it may be a short seller covering a loss or an institution executing a basket.`,
      eg: {
        title: 'Lifting the offers (illustrative)',
        text: `NIFTY futures asks: 200 contracts at 24,010.0 and 300 at 24,010.5. A trader sends a buy for 500 at a limit of 24,011. It fills 200 at 24,010.0 and 300 at 24,010.5. Cost is 48,02,000 + 72,03,150 = 1,20,05,150, so the average is 24,010.30, which is 0.30 points above the best ask. The buyer paid 0.30 × 500 × 65 = ₹9,750 more than if all had filled at 24,010.0 (illustrative, before charges).`,
      },
      tip: `Aggressive buying shows urgency, not correctness. Watch what price does after it.`,
      visual: { kind: 'orderBook', title: 'A buy order lifting the offers', caption: 'The incoming buy consumes both ask levels.', bids: [[24009.5, 150], [24009.0, 250], [24008.5, 300]], asks: [[24010.0, 200], [24010.5, 300], [24011.0, 400]] },
      calc: { id: 'order-book-impact', preset: { side: 'buy', qty: 500, refPrice: 24010, book: '24010:200;24010.5:300' }, why: 'Shows the average fill and impact for the example buy.' },
    },
    {
      t: 2,
      def: `Aggressive selling is when a seller accepts the best available bid instead of waiting for a better price. The order crosses the spread and executes immediately against buyers who were resting in the book.`,
      hi: `Aggressive selling matlab seller ne better price ka wait nahi kiya aur best bid par seedha bech diya. Order spread cross karke turant un buyers ke saath execute ho jata hai jo book mein baithe the.`,
      how: `A sell order priced at or below the best bid matches immediately, and the trade is tagged sell-initiated. Sellers become aggressive for many reasons: stop-loss triggers, long positions being closed, margin pressure, fresh shorts, or institutional hedging. The tag cannot tell these apart. What it does show is that sellers were willing to concede price to get done now, and that the bid side had to absorb it.`,
      eg: {
        title: 'Hitting the bids (illustrative)',
        text: `Bids: 150 contracts at 24,009.5 and 250 at 24,009.0. A sell of 400 at market-with-protection fills 150 at 24,009.5 and 250 at 24,009.0. Proceeds = 36,01,425 + 60,02,250 = 96,03,675, so the average is 24,009.1875, about 24,009.19. That is 0.31 points below the best bid. The seller gave up 0.3125 × 400 × 65 = ₹8,125 compared with filling everything at the best bid.`,
      },
      tip: `A burst of selling that moves price little means buyers are absorbing it. Do not read the volume alone.`,
      visual: { kind: 'orderBook', title: 'A sell order hitting the bids', caption: 'The incoming sell consumes both bid levels.', bids: [[24009.5, 150], [24009.0, 250], [24008.5, 300]], asks: [[24010.0, 200], [24010.5, 300], [24011.0, 400]] },
      calc: { id: 'order-book-impact', preset: { side: 'sell', qty: 400, refPrice: 24009.5, book: '24009.5:150;24009:250' }, why: 'Walks the bid side for the example sell.' },
    },
    {
      t: 3,
      def: `A market order says "execute now at whatever the book offers", while a limit order says "execute only at my price or better". A market buy is aggressive buying; a market sell is aggressive selling. Limit orders provide liquidity and market orders consume it.`,
      hi: `Market order ka matlab hai "abhi jo price mil raha hai us par execute karo", jabki limit order ka matlab "sirf mera price ya usse behtar". Market buy aggressive buying hai aur market sell aggressive selling. Limit orders liquidity dete hain, market orders liquidity khate hain.`,
      how: `Every trade pairs one resting order with one incoming order. The incoming order is the aggressor, whether it was typed as a market order or as a limit order priced through the spread. Many brokers restrict plain market orders in options or convert them to limit orders with price protection, because in thin contracts an unrestricted market order can fill at a very poor price. In practice, a marketable limit order is the safer way to be aggressive.`,
      eg: {
        title: 'Same trade, two roles (illustrative)',
        text: `A limit buy sits at 24,008.5 and a market sell for 100 contracts arrives. The trade prints at 24,008.5 with 100 contracts: the seller was the aggressor and the buyer the passive side. Had a market buy arrived instead and hit an ask at 24,010.0, the aggressor would be the buyer. The 1.5 point gap between those two prices is 1.5 × 65 = ₹97.50 per contract, the price of impatience in this example.`,
      },
      tip: `For liquidity, prefer a limit order that crosses by a point or two over a naked market order, especially in options.`,
      visual: { kind: 'compare', title: 'Market order vs limit order', left: { head: 'Market (marketable) order', tone: 'gold', points: ['Fills now', 'Pays the spread', 'Takes liquidity', 'Slippage risk in thin books'] }, right: { head: 'Limit order', tone: 'ice', points: ['Fills only at your price', 'May not fill at all', 'Provides liquidity', 'Waits in the queue'] } },
    },
    {
      t: 4,
      def: `Delta volume is the volume traded at the ask minus the volume traded at the bid over a period, such as one candle. A positive number means buyers were more aggressive; a negative number means sellers were. It is unrelated to option delta, which is a Greek.`,
      hi: `Delta volume matlab ek period (jaise ek candle) mein ask par hua volume minus bid par hua volume. Positive matlab buyers zyada aggressive the, negative matlab sellers. Yeh option delta (Greek) se bilkul alag cheez hai.`,
      how: `Platforms split each candle's volume into buy-initiated and sell-initiated using the tick feed, then subtract. Delta is read together with price. A green candle with positive delta is agreement; a green candle with negative delta means price rose even though sellers were more aggressive, which may signal passive buyers absorbing or thin offers. Delta depends on the candle length you choose, so compare like with like.`,
      eg: {
        title: 'One-minute delta (illustrative)',
        text: `In one minute NIFTY futures trade 620 contracts at the ask and 380 at the bid. Delta = 620 − 380 = +240, total volume = 1,000, and delta is 24% of volume. Next minute: 540 and 460, delta +80 or 8% of volume. The buying pressure faded from 24% to 8% of volume even though both candles may be green.`,
      },
      tip: `Delta as a percentage of volume is easier to compare across time than raw delta.`,
      visual: { kind: 'bars', title: 'Volume at ask vs bid (minute 1)', unit: ' contracts', items: [{ label: 'At ask (buy-initiated)', value: 620, tone: 'bull' }, { label: 'At bid (sell-initiated)', value: 380, tone: 'bear' }] },
    },
    {
      t: 5,
      def: `Cumulative Volume Delta (CVD) is the running total of delta since a chosen start, usually the session open. A rising CVD means buyers have been net aggressive; a falling CVD means sellers have. Its shape, not its absolute level, is what you read.`,
      hi: `Cumulative Volume Delta (CVD) matlab delta ka running total, jo aam taur par session ke open se shuru hota hai. CVD badh raha hai toh buyers net aggressive hain, gir raha hai toh sellers. Iska shape dekhte hain, absolute level nahi.`,
      how: `CVD is simply the sum of the per-candle deltas. Because it resets with the start point you choose (session, day, week), the same data can look different on different setups. Traders compare the CVD line with price: if both trend the same way, flow supports the move. If price makes a new high and CVD does not, the move had less aggressive buying behind it. This is evidence to combine with levels, not a trade by itself.`,
      eg: {
        title: 'Building the line (illustrative)',
        text: `Minute deltas: +240, +80, −150, −320, +60. CVD after each minute: 240, 320, 170, −150, −90. Price may still be higher than at the start, but CVD has gone from +320 to −90 within three minutes, a swing of 410 contracts (410 × 65 = 26,650 units). That swing is the useful information: aggression changed side.`,
      },
      tip: `Always note where CVD started counting. A different start can give a different story.`,
      visual: { kind: 'curve', title: 'CVD follows price in a healthy trend', caption: 'Shape only: when price and CVD rise together, flow agrees with the move.', curve: 'equity' },
    },
    {
      t: 6,
      def: `Bid-ask volume imbalance compares the quantity waiting on the bid side with the quantity waiting on the ask side, or the trades at ask with trades at bid, at one price or across a few levels. A large lopsidedness hints at which side may be stronger in the next few ticks.`,
      hi: `Bid-ask volume imbalance matlab bid side par kitni quantity wait kar rahi hai aur ask side par kitni, ya ask aur bid par hue trades ka comparison. Bahut lopsided ratio hint deta hai ki agle kuch ticks mein kaun sa side strong ho sakta hai.`,
      how: `A simple measure is (bid qty − ask qty) ÷ (bid qty + ask qty) over the top few levels, which ranges from −100% to +100%. Large resting quantities can be placed and cancelled quickly, so a heavy bid can vanish when price approaches it. The imbalance is a very short-horizon clue. It is a weak signal alone and should not be mistaken for the intention of any named participant.`,
      eg: {
        title: 'Top-five imbalance (illustrative)',
        text: `Total bid quantity across the top five levels is 8,000 contracts and total ask quantity is 2,000. Imbalance = (8,000 − 2,000) ÷ 10,000 = 60%, a ratio of 4 to 1. It looks bullish, but if the 4,000-contract bid at the third level disappears when price drops towards it, the imbalance falls to (4,000 − 2,000) ÷ 6,000 = 33%. That is why such depth is treated as a clue and not a floor.`,
      },
      tip: `Resting quantity can be cancelled. Executed trades are more reliable evidence than displayed depth.`,
      visual: { kind: 'bars', title: 'Top-5 depth (illustrative)', unit: ' contracts', items: [{ label: 'Bid quantity', value: 8000, tone: 'bull' }, { label: 'Ask quantity', value: 2000, tone: 'bear' }] },
    },
    {
      t: 7,
      def: `Absorption happens when a lot of aggressive volume hits one side of the book yet price barely moves, because large passive orders on the other side soak it up. The aggressor is spending effort and getting little progress.`,
      hi: `Absorption tab hota hai jab ek taraf se bahut zyada aggressive volume aata hai par price zyada nahi hilta, kyunki doosri taraf ke bade passive orders use sokh lete hain. Aggressor mehnat kar raha hai par progress nahi mil raha.`,
      how: `Large participants often work big orders using many small clips, and a limit order refilled over and over at the same price can absorb a lot of market orders. On the footprint or delta display this appears as heavy delta in one direction with a small price range. If aggressive buyers are absorbed at a level and stop pushing, price may turn down from there; if the absorber is exhausted first, price breaks through. The outcome is not known in advance, so wait for price to confirm.`,
      eg: {
        title: 'Buying into a wall (illustrative)',
        text: `NIFTY futures stall at 24,050. Over ten minutes, delta is +3,500 contracts (3,500 × 65 = 2,27,500 units bought aggressively), yet price moves only from 24,047 to 24,050, a gain of 3 points. If the next candle closes back below 24,045 and delta turns negative, the absorption read gains weight. If price pushes through 24,060 on the same buying, the read was wrong.`,
      },
      tip: `Absorption needs a location and a confirmation. Heavy delta with no price progress is a question, not an answer.`,
      visual: { kind: 'candles', title: 'Absorption at a level', caption: 'Repeated pushes into a level without progress.', pattern: 'accumulation', level: { price: 24050, label: 'Resting supply' } },
    },
    {
      t: 8,
      def: `Exhaustion is when a move keeps going in price but each push is backed by less aggressive volume, so the pressure that drove it runs out. It tends to appear near the end of a leg, but it can also appear and fail in a strong trend.`,
      hi: `Exhaustion tab hota hai jab price chalta rehta hai par har push ke peeche aggressive volume kam hota jata hai, matlab move ko chalane wala pressure khatam ho raha hai. Yeh aam taur par leg ke ant mein dikhta hai, par strong trend mein bhi dikh kar fail ho sakta hai.`,
      how: `Compare the delta of successive pushes. If a rally prints higher highs while delta on each push shrinks, fewer aggressive buyers are left. Sometimes a final spike with very high volume (a climax) marks the end as late buyers and stop-loss orders are all executed together. There is no fixed number that defines exhaustion; judge it relative to the earlier pushes in the same move and wait for price to stop making progress.`,
      eg: {
        title: 'Shrinking pushes (illustrative)',
        text: `NIFTY futures rally 24,000 → 24,060 → 24,100 → 24,125. Delta on the three pushes is +900, +500 and +150 contracts. The third push made a new high with only 150 ÷ 900 = about 17% of the first push's net buying. If price then closes below the last candle's low, a pause or pullback becomes more likely. It is not certain: a trend can restart after a pause.`,
      },
      tip: `Exhaustion is a warning to tighten risk, not an automatic signal to trade against the trend.`,
      visual: { kind: 'bars', title: 'Delta on each push (illustrative)', unit: ' contracts', items: [{ label: 'Push to 24,060', value: 900, tone: 'bull' }, { label: 'Push to 24,100', value: 500, tone: 'bull' }, { label: 'Push to 24,125', value: 150, tone: 'bull' }] },
    },
    {
      t: 9,
      def: `A footprint chart shows, inside each candle, how many contracts traded at each price at the bid and at the ask. It turns a single candle into a small map of who was aggressive at which price.`,
      hi: `Footprint chart har candle ke andar dikhata hai ki har price par bid aur ask par kitne contracts trade hue. Isse ek candle ek chhote map mein badal jati hai jo batata hai kis price par kaun aggressive tha.`,
      how: `Each price row of a candle shows two numbers, typically sell-initiated volume on the left and buy-initiated on the right. Traders look for stacked imbalances (several rows in a row with a big lean one way), for unfinished auctions where the last row has volume only on one side, and for the point of control, the row with the most volume. Footprints need tick-level data and a platform that supports them; availability and data quality depend on the vendor. They do not identify who traded.`,
      eg: {
        title: 'Reading one row (illustrative)',
        text: `In a one-minute candle at 24,010 the cell shows 120 sold at bid and 340 bought at ask, delta +220. At 24,009 it shows 410 × 90, delta −320. The candle's total delta is +220 − 320 = −100 even if the candle closed up a point. The row view shows that buyers lifted offers at 24,010 while sellers hit the bids hard at 24,009, so the picture inside the candle is more balanced than the colour suggests.`,
      },
      tip: `A footprint is a magnifier, not a crystal ball. Use it on liquid futures at known levels.`,
      visual: { kind: 'bars', title: 'Delta by price row (illustrative)', caption: 'Row delta = bought at ask minus sold at bid.', unit: ' contracts', items: [{ label: '24,010 row (340 − 120)', value: 220, tone: 'bull' }, { label: '24,009 row (90 − 410)', value: -320, tone: 'bear' }] },
    },
    {
      t: 10,
      def: `Order-flow divergence is when price and flow disagree: for example, price makes a new high while CVD makes a lower high, or price makes a new low while CVD does not. It hints that the move has less aggressive support than it appears to.`,
      hi: `Order-flow divergence tab hota hai jab price aur flow alag baat karte hain: jaise price naya high banaye par CVD lower high banaye, ya price naya low banaye par CVD nahi. Yeh hint deta hai ki move ke peeche utna aggressive support nahi hai jitna dikh raha hai.`,
      how: `Divergence is a comparison of two peaks (or troughs) on the same chart. It is most meaningful at a key level and after a sustained move. Divergences can last a long time in strong trends, so traders usually wait for price to break a recent swing before acting, and they define where the idea is wrong in advance. Divergence on its own cannot tell who is on the other side of the trade.`,
      eg: {
        title: 'Higher high, lower CVD (illustrative)',
        text: `NIFTY futures make a high at 24,100 with CVD at +3,100. Later price makes 24,150, a higher high by 50 points, but CVD peaks at only +2,400, which is 700 contracts (about 23%) lower. The new high came with weaker net aggression. If price then breaks below the pullback low of 24,110, the divergence read is supported; if it holds above, the read has failed and the trend may continue.`,
      },
      tip: `Divergence says pressure is weakening, not that price must reverse. Wait for price to confirm.`,
      visual: { kind: 'compare', title: 'Price vs CVD at the second peak', left: { head: 'Price', tone: 'bull', points: ['First high 24,100', 'Second high 24,150', 'Higher high'] }, right: { head: 'CVD', tone: 'gold', points: ['First peak +3,100', 'Second peak +2,400', 'Lower high = divergence'] } },
    },
  ],
  tools: [{ id: 'order-book-impact', why: 'Walk the book for a given order size.' }, { id: 'vwap-twap', why: 'Average execution price of split fills.' }],
}
export default m
