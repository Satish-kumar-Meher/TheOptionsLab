import type { ModuleLesson } from '../topicLessonTypes'

/* Module 22.5 - Option Buyer Risk. Illustrative numbers: NIFTY about 24,000, lot 65 (check current NSE contract specification), IV 14%, r 6.5%, no dividend. Option values from Black-Scholes. */
const m: ModuleLesson = {
  moduleId: '22.5',
  intro: 'An option buyer pays a premium and can lose at most that premium, which makes buying look safe. In practice buyers lose money often, because they must be right about direction, size and timing, and because time decay, falling volatility and trading costs work against them. This module covers the ways a buyer actually loses.',
  introHi: 'Option buyer premium deta hai aur uska maximum loss wahi premium hota hai, isliye buying safe lagti hai. Practice mein buyers aksar paisa gawate hain kyunki unhe direction, size aur timing teeno sahi chahiye, aur time decay, girti volatility aur costs unke khilaaf kaam karte hain. Yeh module batata hai ki buyer asal mein kaise haarta hai.',
  steps: {
    concept: 'A buyer risks only the premium paid, but that premium can be lost in full, and quickly. The buyer needs the market to move far enough and fast enough, before time decay and volatility changes take the value away. Limited loss does not mean small loss: repeating a full-premium loss many times can drain an account.',
    conceptHi: 'Buyer sirf premium risk karta hai, lekin woh poora premium doob sakta hai aur tezi se. Buyer ko chahiye ki market itni door aur itni jaldi chale ki time decay aur volatility ka asar usse na mitaye. Loss limited hai matlab chhota nahi; baar baar poora premium doobne se account khaali ho sakta hai.',
    mechanism: 'An option price is intrinsic value plus time value. Time value falls as expiry approaches (theta) and with a drop in implied volatility (vega). For the buyer to profit at expiry the index must finish beyond the strike by more than the premium paid. Before expiry, the option can profit sooner if the move is large and quick. On exit, you sell at the bid, so the spread is an extra cost on top of brokerage and taxes.',
    example: {
      title: 'ATM call that goes nowhere (illustrative)',
      text: 'Spot 24,000, IV 14%, 7 days left. You buy the 24,000 CE at 200.8 and pay 200.8 × 65 = ₹13,052. Three days later Nifty is still at 24,000 and the option is worth about 149.0, a loss of 51.8 × 65 = ₹3,367 with no move in the index. If it expires at 24,000 the whole ₹13,052 is lost.',
    },
    chart: {
      kind: 'payoff',
      title: 'Long 24,000 CE at expiry',
      caption: 'Loss is limited to the premium; breakeven is strike plus premium (24,200.8).',
      spot: 24000,
      legs: [{ type: 'CE', side: 1, strike: 24000, premium: 200.8 }],
    },
    optionChain: 'Use the chain to check the premium, the bid-ask spread, volume and OI before buying. Compare the cost of an ATM option with the cost of an OTM one and with how far the index must move for each to pay. A tiny premium for a far strike looks cheap but the chance of finishing in the money is small. Look at the IV as well: buying at high IV means paying a rich price.',
    psychology: 'Buyers are drawn by small outlays and large possible rewards, so they hold losing trades hoping for a bounce, average down, and buy again after a loss. Cheap options feel like lottery tickets. A buyer who sets a stop, a time limit and a maximum number of trades per day usually lasts longer than one who trades on feel.',
    scenarios: {
      bullish: 'A quick, large rise can multiply a call premium. A slow rise often disappoints: time decay and falling IV can eat most of the gain even when the direction is right.',
      bearish: 'A call buyer loses as the index falls. A put buyer gains, but must still beat time decay and the spread, and should watch IV, which often rises in falls and helps puts.',
      sideways: 'This is the buyer\'s worst case. The index goes nowhere and theta reduces the premium day by day. Expiry then brings the value toward zero.',
    },
    practice: [
      {
        q: 'You buy the 24,000 CE at 200.8, lot 65. What is the maximum loss and the breakeven at expiry?',
        a: 'Maximum loss = 200.8 × 65 = ₹13,052 (the full premium), before costs. Breakeven = 24,000 + 200.8 = 24,200.8.',
      },
      {
        q: 'The same option falls from 200.8 to 161.2 after IV drops from 14% to 11% with spot unchanged. What is the loss per lot?',
        a: 'Fall = 200.8 − 161.2 = 39.6 points. Loss = 39.6 × 65 = ₹2,574.',
      },
      {
        q: 'You buy 1 lot at 100, 1 lot at 70 and 2 lots at 40 (lot 65). What is your average price and loss if the option is 40?',
        a: 'Total cost = 100 + 70 + 2 × 40 = 250 for 4 lots, so average = 62.5. Loss per unit = 62.5 − 40 = 22.5. Loss = 22.5 × 4 × 65 = ₹5,850.',
      },
      {
        q: 'An option quotes bid 22, ask 28. How much of the premium is lost to the spread if you buy at the ask and exit at the bid immediately (1 lot, 65)?',
        a: 'Spread = 6 points. Loss = 6 × 65 = ₹390, which is 6 ÷ 28 = 21.4% of the price paid, before any other cost.',
      },
    ],
    assignment: 'Look at your last ten option purchases. For each, note the days to expiry, the distance of the strike from spot, the spread at entry and what the index did. Count how many lost value mainly from time or IV and not from direction. Write one rule that would have avoided the most frequent cause.',
  },
  topics: [
    {
      t: 1,
      def: 'Total premium loss means the option expires worthless and you lose the entire amount you paid. It is the buyer\'s maximum loss, and it happens whenever the option finishes out of the money. It is limited, but it can happen again and again.',
      hi: 'Total premium loss ka matlab hai ki option bekaar expire ho jaye aur aapne jo poora paisa diya woh doob jaye. Yeh buyer ka maximum loss hai, aur option OTM khatam ho toh hota hai. Loss limited hai, par baar baar ho sakta hai.',
      how: 'A bought option has value at expiry only if it is in the money. A call needs the index above the strike and a put needs it below. The breakeven is the strike plus premium for a call and the strike minus premium for a put. If the index finishes anywhere short of that, you lose part or all of the premium. Because it can happen often, size each purchase so that a string of losses does not threaten your capital.',
      eg: {
        title: 'Premium written off (illustrative)',
        text: 'You buy the 24,400 CE at 57.5 and pay ₹3,737.50. Nifty finishes at 24,300, below the strike. The option expires at 0 and you lose all ₹3,737.50, even though the index rose 300 points from 24,000. The direction was right; the distance was not enough.',
      },
      tip: 'Right direction is not enough. The move must cross the breakeven before expiry.',
      visual: {
        kind: 'payoff',
        title: 'Long 24,400 CE',
        caption: 'Anything below 24,400 at expiry loses the full 57.5.',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24400, premium: 57.5 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24400, premium: 57.5, expiryPrice: 24300, lotSize: 65, lots: 1 },
        why: 'Shows the full-premium loss at 24,300.',
      },
    },
    {
      t: 2,
      def: 'Theta decay is the steady loss of an option\'s time value as expiry gets closer. Every day that passes with the index unchanged lowers the price a buyer holds. Decay speeds up in the last days, especially for at-the-money options.',
      hi: 'Theta decay ka matlab hai ki expiry paas aate hi option ki time value roz kam hoti jati hai. Index na hile toh bhi buyer ka option roz sasta hota hai. Aakhri dinon mein, khaaskar ATM option mein, yeh decay tez ho jata hai.',
      how: 'Time value reflects the chance that the option ends in the money. With less time left, that chance shrinks, so the price falls even if spot stays still. The fall is not even: the last few days remove a larger share of the remaining value. Buyers therefore need the move to happen early. A buyer can reduce the damage by choosing a later expiry or a time-based exit.',
      eg: {
        title: 'Seven days of decay (illustrative)',
        text: 'The 24,000 CE is 200.8 with 7 days left. With spot unchanged it is about 149.0 with 4 days left (loss of 51.8 × 65 = ₹3,367) and about 72.3 with 1 day left (loss of 128.5 × 65 = ₹8,352.50). Of the 128.5 points lost, 77 came in the last three days.',
      },
      tip: 'Plan the time as well as the price. If the move has not come by your deadline, exit.',
      visual: { kind: 'curve', title: 'Time value falls faster near expiry', caption: 'Stylised curve.', curve: 'timeValue' },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 4, iv: 14, rate: 6.5 },
        why: 'Check the price and theta with 4 days left.',
      },
    },
    {
      t: 3,
      def: 'IV crush is a sharp fall in implied volatility, often right after an event the market was waiting for. Option prices drop when IV drops, even if the index moves in your favour. Buyers who bought before the event at high IV can lose money despite the right direction.',
      hi: 'IV crush ka matlab hai ki event ke baad implied volatility achanak gir jaati hai. IV girne par option ka price gir jata hai, chahe index aapke favour mein hi chala ho. Event se pehle high IV par khareedne wale buyers sahi direction mein bhi paisa gawa sakte hain.',
      how: 'Before results, policy or a budget, uncertainty pushes IV up and option prices carry an event premium. Once the news is out, uncertainty is gone and IV falls. The loss from vega can offset or exceed the gain from delta. India VIX describes expected volatility and not direction. Compare the IV with its own recent range before buying into an event, and consider a position that is less sensitive to IV.',
      eg: {
        title: 'Event premium disappears (illustrative)',
        text: 'The 24,000 CE is 200.8 at IV 14% before an event and 161.2 at IV 11%. If spot ends unchanged, the loss is 39.6 × 65 = ₹2,574. If spot rises 30 points the delta gain is only about 0.53 × 30 = 15.9 points, so the net is still a loss of about 23.7 points, around ₹1,540 (approximate).',
      },
      tip: 'Before buying ahead of an event, ask how much of the price is event premium that will be removed after it.',
      visual: {
        kind: 'bars',
        title: 'IV crush on the same option',
        caption: '24,000 CE, 7 days, spot unchanged (illustrative).',
        unit: '',
        items: [
          { label: 'IV 14%', value: 200.8, tone: 'ice' },
          { label: 'IV 11%', value: 161.2, tone: 'bear' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 11, rate: 6.5 },
        why: 'Price at the lower IV and compare with 200.8.',
      },
    },
    {
      t: 4,
      def: 'Low liquidity means few buyers and sellers are quoting, so there is little quantity at each price. When you want to sell, you may have to accept a worse price, and a larger order can move the price against you.',
      hi: 'Low liquidity ka matlab hai ki kam buyers aur sellers quote kar rahe hain, aur har price par quantity thodi hoti hai. Bechna ho toh aapko kharab price lena pad sakta hai, aur badi order price ko aapke khilaaf le ja sakti hai.',
      how: 'Check the market depth: how many lots sit at the best bid and below it. If you sell more than the top level holds, the order walks down the book and your average price falls. Far OTM strikes and later expiries tend to be thinner. Using limit orders, trading smaller size and choosing strikes near the money improve the fill. The last traded price may be far from where you can actually exit.',
      eg: {
        title: 'Selling 3 lots into a thin book (illustrative)',
        text: 'A far OTM option last traded at 25. The bids are 65 units at 22, 65 at 20 and 130 at 17. Selling 3 lots (195 units) fills 65 at 22, 65 at 20 and 65 at 17, an average of (1,430 + 1,300 + 1,105) ÷ 195 = 19.67. That is 5.33 points below 25, about ₹1,040 for the whole order.',
      },
      tip: 'Judge a strike by the depth you can sell into, not by the last price on screen.',
      visual: {
        kind: 'orderBook',
        title: 'Thin bids (illustrative)',
        caption: 'Three lots eat three price levels.',
        bids: [[22, 65], [20, 65], [17, 130]],
        asks: [[28, 65], [30, 65], [33, 130]],
      },
      calc: {
        id: 'order-book-impact',
        preset: { side: 'sell', qty: 195, refPrice: 25, book: '22:65;20:65;17:130' },
        why: 'Walks the book and shows the average fill.',
      },
    },
    {
      t: 5,
      def: 'A wide bid-ask spread is a big gap between the best price a buyer offers and the best price a seller asks. A buyer pays the ask and sells at the bid, so the gap is a cost paid immediately, before any move in the market.',
      hi: 'Wide bid-ask spread ka matlab hai ki khareedne wale ka best price aur bechne wale ka best price bahut alag hain. Buyer ask par kharidta hai aur bid par bechta hai, isliye yeh gap trade shuru hote hi ek cost ban jata hai.',
      how: 'On a liquid ATM Nifty option the spread may be a point or two. On a cheap far OTM option it may be a few points, which is a large share of the price. Judge the spread as a percentage of the mid price, not just in points. A trade that needs the premium to rise 20% just to cover the round-trip spread is hard to win. Entering with limit orders at or near the mid can save part of it.',
      eg: {
        title: 'Spread as a share of price (illustrative)',
        text: 'An ATM option quotes bid 198, ask 200: spread 2 points, 1% of the mid of 199. A far OTM option quotes bid 8, ask 12: spread 4 points, 40% of the mid of 10. For one lot, the round-trip spread cost is 2 × 65 = ₹130 versus 4 × 65 = ₹260, but for the second trade the bid must rise from 8 to 12, a 50% gain, just to get back what you paid.',
      },
      tip: 'Cheap does not mean good value. Compute the spread as a percentage before you trade.',
      visual: {
        kind: 'bars',
        title: 'Spread as a percentage of mid price',
        caption: 'Same cost in points can mean very different weight.',
        unit: '%',
        items: [
          { label: 'ATM (bid 198, ask 200)', value: 1, tone: 'ice' },
          { label: 'Far OTM (bid 8, ask 12)', value: 40, tone: 'bear' },
        ],
      },
      calc: {
        id: 'spread-cost',
        preset: { bid: 8, ask: 12, qty: 1, lotSize: 65 },
        why: 'Gives the round-trip rupee cost for one lot.',
      },
    },
    {
      t: 6,
      def: 'Wrong strike selection means choosing a strike that cannot pay off for the move you expect. A strike too far out of the money needs a large move; a strike deep in the money costs a lot of capital. The right strike matches your view on size, direction and time.',
      hi: 'Wrong strike selection ka matlab hai aisa strike chunna jo aapke expected move par payoff hi nahi de sakta. Bahut door OTM strike ko bada move chahiye; deep ITM strike mein bahut capital lagta hai. Sahi strike aapke view ke size, direction aur time se match karta hai.',
      how: 'A far OTM option has a low delta, so the index must travel a long way for it to gain. A near-the-money option moves more per point but costs more and decays more in rupees. Compare the strike distance with the expected move for your holding period, which you can estimate from India VIX. Choose the breakeven you believe is reachable and make sure the premium is a size you can afford to lose entirely.',
      eg: {
        title: 'OTM vs ATM, same view (illustrative)',
        text: 'You expect Nifty to rise 300 points in a week. The 24,400 CE costs 57.5 (₹3,737.50) and the ATM 24,000 CE costs 200.8 (₹13,052). If Nifty expires at 24,300, the 24,400 CE is worth 0 (loss ₹3,737.50). The 24,000 CE is worth 300, a gain of (300 − 200.8) × 65 = ₹6,448, but it needed 3.5 times the capital.',
      },
      tip: 'A cheap strike is cheap because the market thinks it unlikely to pay. Match the strike to the move you have actual reason to expect.',
      visual: {
        kind: 'ladder',
        title: 'Strikes vs spot 24,000',
        caption: 'ITM, ATM and OTM calls.',
        optType: 'CE',
        spot: 24000,
        strikes: [23800, 24000, 24200, 24400],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 200.8, expiryPrice: 24300, lotSize: 65, lots: 1 },
        why: 'Compare with the OTM 24,400 strike at the same expiry price.',
      },
    },
    {
      t: 7,
      def: 'Wrong expiry selection means buying an option whose life is too short or too long for your idea. A very short-dated option may expire before your move arrives; a long-dated one costs more but gives time.',
      hi: 'Wrong expiry selection ka matlab hai aisa expiry chunna jo aapke idea ke time ke hisaab se bahut chhota ya bahut lamba ho. Bahut chhota expiry aapka move aane se pehle khatam ho sakta hai; lamba expiry mahanga hota hai par time deta hai.',
      how: 'Match the expiry to how long your idea needs. The shorter the life, the faster the decay and the smaller the chance that the move arrives in time. A longer expiry costs more rupees but decays more slowly per day and responds more smoothly. NSE index expiries are currently scheduled on Tuesdays (a holiday moves it earlier); check the current NSE schedule for the contracts available.',
      eg: {
        title: 'Move comes after the short option dies (illustrative)',
        text: 'You expect Nifty to reach 24,200 about a week from now. You buy the 24,300 CE with 2 days left at 15.1 (₹981.50). It expires at 0 well before the move. A 30-day 24,300 CE costs 306.4; if spot reaches 24,200 after 7 days (23 days left) it is about 338.9, a gain of 32.5 × 65 = ₹2,112.50 on ₹19,916 invested.',
      },
      tip: 'Choose the expiry to outlast your idea. The cost of extra time is smaller than the cost of being right too late.',
      visual: {
        kind: 'compare',
        title: 'Short vs longer expiry',
        caption: 'Same strike, different time.',
        left: { head: '2 days left', tone: 'bear', points: ['Cheap in rupees', 'Decays fast', 'Needs the move at once'] },
        right: { head: '30 days left', tone: 'ice', points: ['Higher premium', 'Slower daily decay', 'Time for the idea to play out'] },
      },
    },
    {
      t: 8,
      def: 'Overtrading is taking too many trades, or trades that are too large, beyond what your plan supports. Each trade has costs and a loss chance, so more trades usually means more cost and more mistakes, not more profit.',
      hi: 'Overtrading ka matlab hai plan se zyada trades lena ya bahut bade size mein trade karna. Har trade par cost aur loss ka chance hota hai, isliye zyada trades ka matlab aksar zyada cost aur zyada galtiyan hota hai, zyada profit nahi.',
      how: 'Costs include brokerage, exchange charges, STT on selling premium, GST, stamp duty and the bid-ask spread. They are paid on winning and losing trades alike. Overtrading also drains attention, so decisions get worse during the day. A fixed limit on trades per day and a fixed daily loss limit are the simplest controls. Charges change over time, so check current rates.',
      eg: {
        title: 'Cost of extra trades (assumed numbers)',
        text: 'Assume all-in cost of ₹150 per round trip per lot, including spread. Two trades a day for 20 trading days costs 2 × 150 × 20 = ₹6,000. Ten trades a day costs 10 × 150 × 20 = ₹30,000. The extra ₹24,000 has to be earned back before any profit counts.',
      },
      tip: 'Set a maximum number of trades and a daily loss limit before the market opens.',
      visual: {
        kind: 'bars',
        title: 'Monthly cost by trades per day (assumed)',
        caption: 'Assumed Rs 150 per round trip, 20 trading days.',
        unit: ' rupees',
        items: [
          { label: '2 trades/day', value: 6000, tone: 'ice' },
          { label: '5 trades/day', value: 15000, tone: 'gold' },
          { label: '10 trades/day', value: 30000, tone: 'bear' },
        ],
      },
      calc: {
        id: 'charges',
        preset: { premium: 100, lotSize: 65, lots: 1, side: 'buy', brokerage: 20 },
        why: 'Estimate the cost of one trade with current rates in the tool.',
      },
    },
    {
      t: 9,
      def: 'Averaging a losing position means buying more of an option that has already fallen, to lower your average price. It makes you hold more risk in a trade that is going wrong, and options can go to zero.',
      hi: 'Losing position ko average karne ka matlab hai ki jo option gir chuka hai usme aur kharidna taaki average price kam ho. Isse aap galat chal rahe trade mein aur risk le lete ho, aur option zero bhi ho sakta hai.',
      how: 'A share has no expiry, so a fall can recover over time. An option has a deadline and decays, so a lower price may reflect the idea failing, not a discount. Averaging lowers the average price but raises the loss for every further point down and raises the capital at risk. Averaging down is not the same as planned scaling in, where the sizes are fixed in advance and no losing position is added to.',
      eg: {
        title: 'Averaging down (illustrative)',
        text: 'Buy 1 lot at 100, 1 lot at 70 and 2 lots at 40. Total cost = 250 for 4 lots, average 62.5. At a price of 40 the loss is 22.5 × 4 × 65 = ₹5,850. If you had stopped out the first lot at 70, the loss would be 30 × 65 = ₹1,950.',
      },
      tip: 'Do not add to a trade because it is cheaper. Add only if your plan said so before you entered.',
      visual: {
        kind: 'bars',
        title: 'Loss: stop at 70 vs averaging to 40',
        caption: 'Rupees, lot 65.',
        unit: '',
        items: [
          { label: 'Stopped at 70', value: 1950, tone: 'gold' },
          { label: 'Averaged to 40', value: 5850, tone: 'bear' },
        ],
      },
      calc: {
        id: 'drawdown-recovery',
        preset: { drawdownPct: 60 },
        why: 'A 60% fall in premium needs a 150% gain to recover.',
      },
    },
    {
      t: 10,
      def: 'Expiry-day premium collapse is the rapid loss of option value on the final day, when time value drains toward zero. A buyer needs the index to move sharply in the right direction to overcome it.',
      hi: 'Expiry-day premium collapse ka matlab hai ki expiry ke din option ki value tezi se zero ki taraf girti hai. Buyer ko is girawat se bachne ke liye index ko sahi disha mein tezi se chalna padta hai.',
      how: 'On expiry day the option has only intrinsic value left and some fast-shrinking time value. Out-of-the-money options are worth nothing at the close. ATM options gain or lose very quickly with small index moves because gamma is high. That can reward a sharp move, but a flat or choppy day usually leaves buyers with a loss. Final settlement uses the exchange\'s settlement price, so the close can differ from the last traded level.',
      eg: {
        title: 'Expiry-day ATM call (illustrative)',
        text: 'On expiry morning, with about 0.3 day left, the 24,000 CE is about 39.1 (₹2,541.50 per lot). If Nifty ends the day at 24,000 the option is worth 0 and the loss is ₹2,541.50. If it ends at 24,030 the option is worth 30, still a loss of 9.1 × 65 = ₹591.50. Only above 24,039.1 does the buyer gain.',
      },
      tip: 'On expiry day, the buyer is paying for a fast move. Without one, decay wins by the close.',
      visual: {
        kind: 'timeline',
        title: 'Expiry day premium (illustrative)',
        caption: '24,000 CE with spot unchanged.',
        events: [
          { when: 'Morning', what: 'Premium about 39', tone: 'ice' },
          { when: 'Midday', what: 'Falls as time runs out', tone: 'gold' },
          { when: 'Close', what: 'Worth 0 if spot is at or below 24,000', tone: 'bear' },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 39.1, expiryPrice: 24030, lotSize: 65, lots: 1 },
        why: 'Shows the loss even when spot ends 30 points above strike.',
      },
    },
  ],
  tools: [{ id: 'breakeven', preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 200.8 }, why: 'Find the breakeven of a purchase before you pay.' }],
}
export default m
