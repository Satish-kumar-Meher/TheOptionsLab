import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '4.1',
  intro:
    `Premium is the price of an option: the money the buyer pays and the seller receives for the right the option carries. This module explains why that price exists, who pays and receives it, how it is quoted per unit, how it becomes a rupee amount for one lot, and why it moves differently from the index. Examples use NIFTY near 24,000, a lot of 65 (check the current NSE contract specification) and illustrative Black-Scholes premiums at India VIX 14, rate 6.5%.`,
  introHi:
    `Premium option ki price hoti hai: woh paisa jo buyer deta hai aur seller leta hai us right ke badle jo option deta hai. Is module mein hum dekhenge ki yeh price kyun hoti hai, kaun deta hai aur kaun leta hai, per unit kaise quote hoti hai, ek lot ke liye rupees mein kaise banti hai, aur index se alag kyun chalti hai. Examples NIFTY ~24,000, lot 65 (current NSE contract specification check karein) aur illustrative Black-Scholes premiums par hain.`,
  steps: {
    concept:
      `An option is a right, and a right has a price. That price is the premium. The buyer pays it upfront and can never lose more than that, while the seller receives it upfront and takes on the obligation. Premium is quoted per unit of the index, so the cash amount for a trade is premium times the lot size times the number of lots.`,
    conceptHi:
      `Option ek right hai, aur right ki ek price hoti hai. Wahi price premium hai. Buyer yeh upfront deta hai aur isse zyada kabhi nahi kho sakta; seller yeh upfront leta hai aur obligation uthata hai. Premium index ke per unit ke hisaab se quote hota hai, toh trade ka cash amount = premium x lot size x lots.`,
    mechanism:
      `When you buy an option on NSE, your broker debits the full premium from your account and the exchange matches you with a seller. NSCCL, the clearing corporation, becomes the counterparty to both sides, so you never depend on the seller personally. The seller's premium is credited, but the broker also blocks margin (SPAN plus exposure margin) because the seller's loss can exceed the premium. Prices are set by the live order book: the best bid and best ask, in steps of ₹0.05, with the last traded price shown as LTP.`,
    example: {
      title: 'One lot of the 24,100 CE (illustrative)',
      text: `NIFTY 24,000, 7 days to expiry, India VIX 14. A Black-Scholes model gives the 24,100 CE about ₹150 per unit. One lot of 65 costs 150 x 65 = ₹9,750. The buyer's maximum loss is ₹9,750 (plus charges). The seller receives ₹9,750 but must also keep margin blocked, because if NIFTY rallies the loss on the short call has no upper limit. Real traded premiums will differ from the model.`,
    },
    chart: {
      kind: 'flow',
      title: 'Where the premium travels',
      caption: 'The buyer pays upfront; NSCCL stands in the middle; the seller receives but also locks margin. Illustrative amounts.',
      steps: [
        { label: 'Buyer pays', note: '₹150 x 65 = ₹9,750 debited', tone: 'ice' },
        { label: 'NSE matches order', note: 'Best bid meets best ask', tone: 'gold' },
        { label: 'NSCCL guarantees', note: 'Counterparty to both sides', tone: 'gold' },
        { label: 'Seller receives', note: '₹9,750 credited, margin blocked', tone: 'neutral' },
      ],
    },
    optionChain:
      `On the chain, the LTP column beside each strike is the premium per unit. The bid and ask (and their quantities) show where buyers and sellers are waiting right now. Multiply any premium by the lot size for the rupee cost. OI and volume tell you how many contracts exist or traded, not who paid the premium or who collected it.`,
    psychology:
      `A low-priced option feels cheap, so beginners buy it by the dozen lots without asking why it is cheap. A high premium feels expensive, though it may simply reflect real uncertainty. Sellers see premium credited and feel they have already earned it, forgetting that it is only partly theirs until expiry. Price alone says nothing about value: judge premium against the move needed to profit.`,
    scenarios: {
      bullish:
        `A rise in NIFTY from 24,000 to 24,100 lifts the 24,200 CE (7 days left) from about ₹111 to ₹151 in this model, a gain of about ₹40 per unit or ₹2,585 per lot. Percentage-wise the option gained about 36% while the index rose 0.42%.`,
      bearish:
        `A fall in NIFTY to 23,900 drops the same call to about ₹80, a loss of roughly ₹32 per unit or ₹2,066 per lot for the buyer. The seller gains that amount, but the seller's loss on a sharp rally can be much bigger.`,
      sideways:
        `If NIFTY stays near 24,000, the premium of an out-of-the-money option generally shrinks as days pass, because there is less time left for a move. That helps the seller and hurts the buyer, even though the index did not fall.`,
    },
    practice: [
      {
        q: `A NIFTY option shows LTP ₹82.40. What is the cost of 2 lots at a lot size of 65?`,
        a: `Premium per unit = ₹82.40. One lot = 82.40 x 65 = ₹5,356. Two lots = 5,356 x 2 = ₹10,712, before brokerage and other charges.`,
      },
      {
        q: `Bid is ₹149.85 and ask is ₹150.20. If you buy at market and sell back immediately at the same quotes, what does it cost for one lot of 65?`,
        a: `Spread = 150.20 - 149.85 = ₹0.35 per unit. For one lot = 0.35 x 65 = ₹22.75, before charges. That is the immediate cost of crossing the spread.`,
      },
      {
        q: `The 24,200 CE moves from ₹111.40 to ₹151.17 when NIFTY rises 100 points. What is the percentage change in the option and in the index?`,
        a: `Option change = 151.17 - 111.40 = 39.77; 39.77 / 111.40 = 35.7%. Index change = 100 / 24,000 = 0.42%. The option moved about 85 times as much in percentage terms, which is why premiums are volatile.`,
      },
    ],
    assignment:
      `Open today's NIFTY chain. For five strikes (two below, ATM, two above) note the CE LTP, bid and ask. Convert each LTP to one-lot cost at the current lot size, compute the bid-ask spread in rupees per lot, and write one sentence on which strike has the widest spread and why.`,
  },
  topics: [
    {
      t: 1,
      def: `Premium is the price of an option contract. It is what the buyer pays to get the right (call or put) and what the seller receives for taking on the obligation. It is quoted in rupees per unit of the underlying index.`,
      hi: `Premium option contract ki price hai. Buyer yeh deta hai right paane ke liye (call ya put), aur seller yeh leta hai obligation lene ke badle. Yeh index ke per unit ke rupees mein quote hota hai.`,
      how: `Unlike a share price, which reflects ownership of a business, premium reflects the value of a right that expires. It is formed on the exchange order book by the interaction of buyers and sellers, and it moves with the index, time, volatility and demand. It is not a deposit or margin: once paid, the buyer does not get it back unless the option is sold or has value at expiry. Every option on the NSE chain, call or put, has its own premium.`,
      eg: {
        title: 'The 24,100 CE at ₹150 (illustrative)',
        text: `With NIFTY at 24,000 and seven days to expiry, the 24,100 CE is quoted around ₹150 per unit. That ₹150 is the premium. For one lot of 65 the buyer pays 150 x 65 = ₹9,750. In return the buyer gets the right to profit if NIFTY ends above 24,100 plus the premium, i.e. above 24,250.`,
      },
      tip: `Premium is the price of the right, not the value of the index. A premium of ₹150 says nothing about NIFTY being at 24,000.`,
      visual: {
        kind: 'layers',
        title: 'What sits inside a premium',
        caption: 'Every premium is intrinsic value plus time value (covered in 4.2 and 4.3).',
        layers: [
          { label: 'Premium (what you pay)', note: 'Quoted per unit in ₹', tone: 'gold' },
          { label: 'Intrinsic value', note: 'Already earned if exercised now', tone: 'ice' },
          { label: 'Time value', note: 'Price of remaining chance', tone: 'neutral' },
        ],
      },
    },
    {
      t: 2,
      def: `An option has a price because it gives one side a valuable right and the other side a risk. The buyer may gain a lot while losing only the premium; the seller must be paid for taking the open-ended risk. The price is the market's estimate of how likely and how large a favourable move may be.`,
      hi: `Option ki price isliye hoti hai kyunki ek side ko valuable right milta hai aur doosri side ko risk uthana padta hai. Buyer ka loss premium tak limited hai par gain bada ho sakta hai; seller ko us risk ke liye paisa milna chahiye. Price market ka andaza hai ki favourable move kitna aur kitni sambhavna se aa sakta hai.`,
      how: `Two things build the price. First, intrinsic value: how much the option would be worth if exercised right now. Second, time value: payment for the chance that the index moves further before expiry. Time value grows when there is more time and when expected volatility (India VIX, or the option's implied volatility) is higher, because bigger swings make a favourable move more likely. Models such as Black-Scholes turn these inputs into a theoretical value, and traders then compete around it.`,
      eg: {
        title: 'Why a 100-point out-of-the-money call is not free',
        text: `NIFTY 24,000. The 24,100 CE has zero intrinsic value, yet it trades near ₹150 (illustrative, 7 days, VIX 14). Why would anyone pay ₹9,750 per lot? A one-standard-deviation move over 7 days is about 24,000 x 0.14 x sqrt(7/365) = 465 points, so a rise above 24,100 is quite plausible. The seller wants ₹150 for the risk that this happens.`,
      },
      tip: `If an option looks too cheap, ask what the market knows: usually it needs an unlikely move or very little time remains.`,
      visual: {
        kind: 'compare',
        title: 'Buyer and seller see the same price differently',
        left: { head: 'Buyer', tone: 'ice', points: ['Pays for a right', 'Maximum loss is premium', 'Gain can be large'] },
        right: { head: 'Seller', tone: 'gold', points: ['Paid for taking risk', 'Maximum gain is premium', 'Loss can be large'] },
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 14, days: 7 },
        why: 'Shows the one-standard-deviation move that justifies paying for an out-of-the-money option.',
      },
    },
    {
      t: 3,
      def: `The buyer of an option pays the premium. It is paid in full, in cash, at the time of the trade, and it is the most the buyer can lose on a long option.`,
      hi: `Option ka buyer premium deta hai. Yeh poora, cash mein, trade ke waqt hi dena padta hai, aur long option par buyer ka maximum loss yahi hota hai.`,
      how: `The broker debits the premium plus charges (brokerage, exchange transaction charges, GST, STT on sale, stamp duty on buy; check current rates) from your trading balance. No margin is blocked for a plain long option, because the premium itself is the full risk. The buyer does not pay anything further at expiry: if the option finishes in the money, the cash settlement credits the intrinsic value. If it expires worthless, the buyer simply loses what was paid.`,
      eg: {
        title: 'Buying 2 lots of the 23,900 PE at ₹130 (illustrative)',
        text: `Premium 130 per unit, lot 65, 2 lots. Cost = 130 x 65 x 2 = ₹16,900. That is debited at once. If NIFTY expires at 24,200, the put is worthless and the loss is ₹16,900 plus charges. If it expires at 23,500, intrinsic = 400, value = 400 x 130 = ₹52,000, so net = 52,000 - 16,900 = +₹35,100 before charges.`,
      },
      tip: `Buyers pay the whole risk upfront, so position size should be an amount you can afford to lose entirely, not a hope.`,
      visual: {
        kind: 'bars',
        title: 'Buyer cash flow on 2 lots',
        unit: ' ₹',
        caption: 'Illustrative: 23,900 PE bought at ₹130, lot 65, 2 lots.',
        items: [
          { label: 'Premium paid', value: 16900, tone: 'bear' },
          { label: 'Value at 23,500 expiry', value: 52000, tone: 'bull' },
          { label: 'Net profit at 23,500', value: 35100, tone: 'bull' },
        ],
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 130, lotSize: 65, lots: 2, spot: 24000 },
        why: 'Converts a quoted premium into the exact amount debited.',
      },
    },
    {
      t: 4,
      def: `The seller (also called the writer) of an option receives the premium. In return the seller takes the obligation to settle if the buyer's option finishes in the money.`,
      hi: `Option ka seller (writer) premium receive karta hai. Badle mein agar buyer ka option in the money finish ho, toh settle karne ki obligation seller par aati hai.`,
      how: `The premium is credited to the seller, but it is not free money. The broker blocks margin (SPAN plus exposure, set by NSCCL and the broker) because the seller's possible loss is far larger than the premium. As prices move, the position is marked to market daily and the margin can rise, so a seller may need more funds. The seller's profit is capped at the premium; the loss on a short call is open-ended, and a short put's loss is large (down to zero for the index). Most sellers close positions before expiry.`,
      eg: {
        title: 'Writing the 24,100 CE at ₹150 (illustrative)',
        text: `Seller receives 150 x 65 = ₹9,750. If NIFTY expires at 24,100 or below, the seller keeps all ₹9,750 before charges. At 24,250 the seller breaks even. At 24,600, intrinsic = 500, so the loss = (500 - 150) x 65 = ₹22,750. The required margin is typically many times the premium; always see the broker's margin calculator before trading.`,
      },
      tip: `Receiving premium is not the same as earning it. A seller earns it only if the option decays or expires without costing more than was collected.`,
      visual: {
        kind: 'payoff',
        title: 'Short call: premium is the best case',
        caption: 'Sell 24,100 CE at ₹150: maximum profit ₹150 per unit, loss rises above 24,250.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24100, premium: 150 }],
      },
    },
    {
      t: 5,
      def: `Premium quotation means how the price is displayed and traded: in rupees per unit, with a minimum price step of ₹0.05, shown as bid (best buy price), ask (best sell price) and LTP (last traded price).`,
      hi: `Premium quotation ka matlab hai price kaise dikhai aur trade hoti hai: rupees per unit mein, minimum tick ₹0.05 ka, aur bid (best buy price), ask (best sell price) aur LTP (last traded price) ke roop mein.`,
      how: `NSE publishes the order book as bids and asks with quantities. A market order fills against the best opposite price; a limit order waits at your price. The difference between ask and bid is the spread, which is a direct cost to someone who trades immediately. LTP is only the last trade and can be stale on a quiet strike, so for entering or exiting a position the bid and ask are more reliable than the LTP. Tick size is ₹0.05 for index options at present; confirm in the NSE contract specification.`,
      eg: {
        title: 'Reading a quote on the 24,100 CE (illustrative)',
        text: `Bid ₹149.85 (500 qty), ask ₹150.20 (650 qty), LTP ₹150.00. The spread is ₹0.35, which for one lot of 65 is 0.35 x 65 = ₹22.75. If you buy at the ask and sell at the bid immediately, you lose ₹22.75 before charges, even though nothing in the market moved.`,
      },
      tip: `Use limit orders near the mid price on thinly traded strikes; a market order there can fill several ticks away from LTP.`,
      visual: {
        kind: 'orderBook',
        title: 'A quote on the 24,100 CE',
        caption: 'Illustrative bid and ask ladder: price, quantity.',
        bids: [[149.85, 500], [149.8, 650], [149.75, 975]],
        asks: [[150.2, 650], [150.25, 1300], [150.3, 975]],
      },
      calc: {
        id: 'spread-cost',
        preset: { bid: 149.85, ask: 150.2, qty: 1, lotSize: 65 },
        why: 'Computes the immediate cost of crossing the spread for one lot.',
      },
    },
    {
      t: 6,
      def: `Because premium is quoted per unit, the actual rupee amount of a trade is premium multiplied by the lot size and then by the number of lots. Lot size is the fixed quantity of one contract set by NSE.`,
      hi: `Premium per unit mein quote hota hai, isliye trade ka asli rupee amount = premium x lot size x lots. Lot size NSE ka fixed quantity hota hai ek contract ke liye.`,
      how: `You cannot buy one unit of NIFTY options; you trade in multiples of the lot size. The NIFTY lot is 65 under the current contract specification (check the NSE circular, since lot sizes are revised from time to time). This means a ₹1 change in premium is ₹65 per lot. Notional value, by contrast, is spot times lot size: it describes the exposure the option controls, not what you pay.`,
      eg: {
        title: 'The same ₹3 and ₹300 premium (illustrative)',
        text: `A far OTM option at ₹3 costs 3 x 65 = ₹195 per lot. An ITM option at ₹300 costs 300 x 65 = ₹19,500. Two lots of the ₹300 option cost ₹39,000. The notional value of one lot at NIFTY 24,000 is 24,000 x 65 = ₹15,60,000. The buyer risks only the premium, not the notional.`,
      },
      tip: `Always compute rupees per lot before you click. A one-point move in premium is the lot size in rupees.`,
      visual: {
        kind: 'bars',
        title: 'Premium to one-lot cost',
        unit: ' ₹',
        caption: 'Lot 65. Cost = premium x 65.',
        items: [
          { label: '₹3 option', value: 195, tone: 'neutral' },
          { label: '₹82.40 option', value: 5356, tone: 'neutral' },
          { label: '₹150 option', value: 9750, tone: 'gold' },
          { label: '₹300 option', value: 19500, tone: 'gold' },
        ],
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 150, lotSize: 65, lots: 1, spot: 24000 },
        why: 'Premium x lot size x lots, plus the notional value of the contract.',
      },
    },
    {
      t: 7,
      def: `Premium fluctuation is the constant change in an option's price during the trading day. It happens because the index moves, time passes, expected volatility changes and orders arrive.`,
      hi: `Premium fluctuation matlab trading day mein option ki price ka lagatar badalna. Yeh isliye hota hai kyunki index hilta hai, time guzarta hai, expected volatility badalti hai aur naye orders aate hain.`,
      how: `Each tick in the index changes the option's value by roughly its delta (the share of the index move the option captures). A call with delta 0.40 gains about 40 paise for each point the index rises, other things equal. Premium also moves when implied volatility changes or when order flow shifts the bid and ask, even with a flat index. Because premium can be small and the percentage moves large, a position can show large percentage profit or loss within minutes.`,
      eg: {
        title: 'A 100-point intraday move on the 24,200 CE (illustrative)',
        text: `7 days to expiry, VIX 14. At NIFTY 24,000 the 24,200 CE is about ₹111.40; at 24,100 it is about ₹151.17, a gain of ₹39.77 per unit or 39.77 x 65 = ₹2,585 per lot. At 23,900 it is about ₹79.62, a loss of ₹31.78 per unit or ₹2,066 per lot. The gain is bigger than the loss because delta rises as the option moves closer to the money.`,
      },
      tip: `Mark-to-market swings are normal. Decide your exit rules before entry, otherwise every tick will test your discipline.`,
      visual: {
        kind: 'bars',
        title: '24,200 CE premium as NIFTY moves',
        unit: ' ₹',
        caption: 'Model value per unit, 7 days, VIX 14.',
        items: [
          { label: 'NIFTY 23,800', value: 55.08, tone: 'bear' },
          { label: 'NIFTY 23,900', value: 79.62, tone: 'bear' },
          { label: 'NIFTY 24,000', value: 111.4, tone: 'neutral' },
          { label: 'NIFTY 24,100', value: 151.17, tone: 'bull' },
          { label: 'NIFTY 24,200', value: 199.34, tone: 'bull' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24200, days: 7, iv: 14, rate: 6.5 },
        why: 'See the model premium and delta, then change spot to watch the premium move.',
      },
    },
    {
      t: 8,
      def: `The option price and the underlying price are two different numbers. The index may be 24,000 while an option on it costs ₹150. The option moves by only a fraction of the index move (its delta), but in percentage terms the option moves much more.`,
      hi: `Option ki price aur underlying ki price do alag cheezein hain. Index 24,000 ho sakta hai aur uska option ₹150 ka. Option index ke move ka sirf ek hissa (delta) move karta hai, lekin percentage mein option kaafi zyada move karta hai.`,
      how: `An ATM option has delta near 0.5, so a 100-point index move changes the premium by roughly ₹50. A far OTM option has a small delta, so its premium changes by only a few rupees, yet that few rupees can be a large percentage of a tiny premium. This gearing is why options are called leveraged: a small amount of capital gets exposure to a large index value. The same gearing works in reverse on the way down. Also, the option can lose value even when the index does not move, because time passes.`,
      eg: {
        title: 'Index +0.42%, option +36% (illustrative)',
        text: `NIFTY moves from 24,000 to 24,100, +100 points or +0.42%. The 24,200 CE moves from ₹111.40 to ₹151.17, +₹39.77 or +35.7%. A buyer who invested ₹7,241 (111.40 x 65) now holds ₹9,826 (151.17 x 65). If the index had instead fallen 0.42% to 23,900, the same buyer would hold 79.62 x 65 = ₹5,175, a loss of 28.5%.`,
      },
      tip: `Leverage cuts both ways. A 0.4% index move can produce a 30% to 35% swing in a short-dated out-of-the-money option.`,
      visual: {
        kind: 'compare',
        title: 'Index move vs option move',
        left: { head: 'NIFTY 24,000 to 24,100', tone: 'ice', points: ['Index: +0.42%', 'Absolute: +100 points', 'Scale: 24,000'] },
        right: { head: '24,200 CE (7 days)', tone: 'gold', points: ['Premium: +35.7%', 'Absolute: +₹39.77', 'Scale: ₹111'] },
      },
      calc: {
        id: 'return-calc',
        preset: { start: 111.4, end: 151.17, years: 1 },
        why: 'Percentage change in the premium from the example.',
      },
    },
  ],
  tools: [{ id: 'lot-value', preset: { premium: 150, lotSize: 65, lots: 1, spot: 24000 }, why: 'Premium to rupees per lot.' }],
}
export default m
