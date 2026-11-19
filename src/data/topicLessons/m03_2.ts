import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '3.2',
  intro:
    `An option is a contract that gives the buyer a right, not an obligation, to buy or sell an underlying at a fixed price (the strike) up to a fixed date (the expiry). This module covers every building block of that contract: buyer and seller, premium, strike, expiry, lot size, contract value, exercise, settlement and the index-versus-stock difference. Option chain reading, Greeks and every strategy later in the course depend on these ideas. Note: the worked examples use an illustrative NIFTY lot of 75; the current NSE NIFTY lot is 65, so rupee figures change if you use 65.`,
  introHi:
    `Option ek contract hai jo buyer ko right deta hai, obligation nahi, ki woh underlying ko ek fixed price (strike) par ek fixed date (expiry) tak buy ya sell kar sake. Is module mein hum buyer aur seller, premium, strike, expiry, lot size, contract value, exercise aur settlement, sab ek-ek karke samjhenge. Option chain, Greeks aur saari strategies isi foundation par tiki hain. Dhyan rahe: examples mein lot size 75 illustrative hai, abhi NIFTY ka current lot 65 hai.`,
  steps: {
    concept:
      `An option separates two things that a share purchase bundles together: the right to benefit from a price move, and the duty to pay the full price. The buyer pays a small amount (the premium) for the right. The seller collects that premium and in return promises to honour the contract. Because the buyer's loss is limited to the premium and the seller's potential loss is large, the two sides have very different risk profiles.`,
    conceptHi:
      `Share khareedne mein aapko profit ka chance bhi milta hai aur poora paisa bhi dena padta hai. Option in dono ko alag kar deta hai. Buyer chhota sa premium dekar sirf right kharidta hai. Seller premium leta hai aur badle mein contract nibhane ki zimmedari leta hai. Isliye buyer ka loss premium tak limited hota hai, aur seller ka potential loss bahut bada ho sakta hai.`,
    mechanism:
      `Every option contract is defined by five things: underlying, type (CE or PE), strike, expiry and lot size. Buyers and sellers never meet; the NSE matches orders and the clearing corporation (NSCCL) becomes the counterparty to both sides, collecting margin from sellers. NSE index and stock options are European style, so exercise happens only at expiry. Index options are cash settled; stock options are physically settled under the exchange rules. The premium you see on screen is per unit, and you pay it for lot size times number of lots.`,
    example: {
      title: 'One full trade: NIFTY 24,100 CE (illustrative)',
      text: `Spot 24,000. You buy the 24,100 CE at ₹100, lot 75 (illustrative), expiry 26 November. Premium paid = 100 × 75 = ₹7,500, which is also your maximum loss before charges. Breakeven at expiry = 24,100 + 100 = 24,200. At expiry 24,400 the intrinsic value is 300, so net = (300 − 100) × 75 = +₹15,000. At 24,150 the intrinsic value is 50, so net = (50 − 100) × 75 = −₹3,750. At or below 24,100 you lose the full ₹7,500. With the current lot of 65, premium would be ₹6,500 and the ₹15,000 profit would be (300 − 100) × 65 = ₹13,000. Hypothetical figures, not a live quote.`,
    },
    chart: {
      kind: 'payoff',
      title: 'Long 24,100 CE bought at ₹100: payoff at expiry',
      caption: 'Flat loss of ₹100 per unit up to the strike, breakeven at 24,200, rising profit above it. Illustrative.',
      spot: 24000,
      legs: [{ type: 'CE', side: 1, strike: 24100, premium: 100 }],
    },
    optionChain:
      `On the chain, each row is a strike and each side shows the CE or PE premium, OI and volume. The LTP column is the premium per unit, so multiply by lot size to know your cash outlay. The expiry selector at the top picks the contract date, and the spot or futures value above it is the underlying. Every term in this module (strike, premium, expiry, lot size) is something you can point at on the chain.`,
    psychology:
      `Buyers are drawn by small outlay and large possible gain, and often forget that the option can expire worthless. Sellers are drawn by premium that arrives upfront and by high win frequency, and often forget one sharp move can wipe out many small gains. A common trap is looking at the ₹7,500 premium and ignoring that the same lot represents ₹18 lakh of notional exposure. Know which side of the contract you are on and what that side can lose.`,
    scenarios: {
      bullish:
        `If NIFTY rises well above 24,200, the 24,100 CE buyer profits (₹15,000 at 24,400 in the illustration) while a call seller at the same strike loses the same amount. Moderate rises that stay below breakeven still leave the buyer at a loss.`,
      bearish:
        `If NIFTY falls, the call buyer loses at most the ₹7,500 premium, while the call seller keeps the premium. A put buyer gains in this scenario; a put seller takes the loss.`,
      sideways:
        `If NIFTY stays near 24,000, the 24,100 CE expires worthless. The buyer loses ₹7,500 and the seller keeps ₹7,500 before charges. Time decay works against buyers in a sideways market.`,
    },
    practice: [
      {
        q: `You buy a 24,100 CE at ₹100, lot 75. NIFTY expires at 24,150. What is your net P&L?`,
        a: `Intrinsic value = 24,150 − 24,100 = 50. Net per unit = 50 − 100 = −50. Net = −50 × 75 = −₹3,750 before charges. The option finished in the money yet still lost money because the premium paid was larger than the intrinsic value.`,
      },
      {
        q: `You sell a 23,900 PE at ₹100, lot 75. NIFTY expires at 23,600. What is the P&L and the breakeven?`,
        a: `Intrinsic value = 23,900 − 23,600 = 300. Seller P&L per unit = 100 − 300 = −200. Total = −200 × 75 = −₹15,000. Breakeven = 23,900 − 100 = 23,800.`,
      },
      {
        q: `NIFTY = 24,300. The 24,100 CE trades at ₹260 and the 24,500 PE at ₹230. Split each premium.`,
        a: `24,100 CE: intrinsic = 24,300 − 24,100 = 200, time value = 260 − 200 = ₹60. 24,500 PE: intrinsic = 24,500 − 24,300 = 200, time value = 230 − 200 = ₹30. The other side of each strike has zero intrinsic value.`,
      },
      {
        q: `A call premium rises from ₹100 to ₹120. What is the profit on 3 lots of 75, and what is the notional of one lot at spot 24,000?`,
        a: `Quantity = 3 × 75 = 225. Profit = 20 × 225 = ₹4,500 before charges. Notional of one lot = 24,000 × 75 = ₹18,00,000, which is exposure, not what you pay.`,
      },
    ],
    assignment:
      `Pick one NIFTY CE and one PE from today's option chain at two strikes you find interesting. For each, write: strike, expiry, premium, lot size (read it from your broker), total premium for one lot, breakeven, and whether it is ITM or OTM. Then split each premium into intrinsic value and time value.`,
  },
  topics: [
    {
      t: 1,
      def: `An option contract gives its buyer the right, but not the obligation, to buy or sell an underlying at a fixed price (the strike) up to a fixed expiry date. A Call Option (CE) is the right to buy; a Put Option (PE) is the right to sell. The buyer pays a price for this right, called the premium.`,
      hi: `Option contract buyer ko right deta hai, obligation nahi, ki woh underlying ko ek fixed price par buy ya sell kar sake. Call (CE) mein buy karne ka right hota hai, Put (PE) mein sell karne ka. Is right ke liye jo paisa dena padta hai usse premium kehte hain.`,
      how: `On NSE, an option is a standardised contract: the exchange fixes the underlying, strike list, expiry dates and lot size, and traders only choose which contract and how many lots. When you buy a NIFTY option you are not buying 75 shares of the index; you hold a contract whose payoff is calculated from the NIFTY level at expiry. The buyer's gross payoff at expiry is the intrinsic value times the lot size. The net result is that payoff minus the premium paid and charges.`,
      eg: {
        title: 'NIFTY 24,100 CE at ₹100 (illustrative)',
        text: `Spot 24,000, lot 75 (illustrative), premium ₹100. Premium paid = 100 × 75 = ₹7,500. If NIFTY expires at 24,400, intrinsic value = 24,400 − 24,100 = 300, so net per unit = 300 − 100 = 200 and net = 200 × 75 = +₹15,000. If NIFTY expires at 24,000, the option is worthless and the loss is ₹7,500. With the current lot of 65 these figures become ₹6,500 premium and ₹13,000 profit.`,
      },
      tip: `Buying one NIFTY option is not buying NIFTY. You own a contract with a defined payoff, and you can lose the entire premium.`,
      visual: {
        kind: 'payoff',
        title: 'Call buyer: loss capped, profit open',
        caption: 'Long 24,100 CE at ₹100. Illustrative.',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24100, premium: 100 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 100, expiryPrice: 24400, lotSize: 75, lots: 1 },
        why: 'Change the expiry price and see how the 24,100 CE trade moves from loss to profit.',
      },
    },
    {
      t: 2,
      def: `The buyer of an option has a right and may walk away; the seller (writer) has an obligation and must perform if the buyer's side is exercised or settled in the money. That asymmetry is why the buyer pays premium and the seller receives it, and why the seller must post margin.`,
      hi: `Buyer ke paas choice hoti hai, seller ke paas zimmedari. Buyer chahe toh right use kare, chahe toh chhod de. Seller ko contract nibhana hi padta hai agar option in the money settle ho. Isi wajah se buyer premium deta hai aur seller premium leta hai, aur seller ko margin bhi dena padta hai.`,
      how: `Think of a house booking. You pay ₹1 lakh to the owner for the right to buy at ₹50 lakh after a month. If the price goes to ₹60 lakh you exercise and net ₹9 lakh (₹10 lakh gain less ₹1 lakh fee); if it falls to ₹40 lakh you walk away and lose only the ₹1 lakh. The owner has to sell at ₹50 lakh if you exercise, whatever the market says. In the exchange market, NSCCL guarantees performance and demands SPAN plus exposure margin from the seller because the seller's loss can be many times the premium received.`,
      eg: {
        title: 'The house booking analogy, in numbers',
        text: `Price agreed ₹50 lakh, booking fee ₹1 lakh. Case A: price rises to ₹60 lakh, benefit = 60 − 50 = ₹10 lakh, less the fee = ₹9 lakh net. Case B: price falls to ₹40 lakh, you skip the purchase and lose ₹1 lakh. The owner's best case is keeping the ₹1 lakh; the owner's bad case is selling a ₹60 lakh house for ₹50 lakh, a ₹10 lakh opportunity loss net of the ₹1 lakh fee.`,
      },
      tip: `Remember one line: the buyer buys a right; the seller sells a right and accepts an obligation.`,
      visual: {
        kind: 'compare',
        title: 'Right versus obligation',
        caption: 'Same contract, two very different positions.',
        left: { head: 'Option buyer', tone: 'ice', points: ['Pays premium', 'Has a right', 'May choose not to exercise', 'Maximum loss is the premium paid'] },
        right: { head: 'Option seller (writer)', tone: 'gold', points: ['Receives premium', 'Has an obligation', 'Must honour the contract if settled in the money', 'Potentially large loss, so margin is required'] },
      },
    },
    {
      t: 3,
      def: `An option buyer is the person who pays the premium and holds the option. A call buyer generally expects the underlying to rise; a put buyer generally expects it to fall. The maximum loss of an outright long option is the premium paid.`,
      hi: `Option buyer woh hai jo premium deta hai aur option hold karta hai. Call buyer ko lagta hai market upar jayega, put buyer ko lagta hai neeche jayega. Outright buy karne par maximum loss sirf premium tak limited rehta hai, lekin woh poora premium doob sakta hai.`,
      how: `A buyer needs the full premium in the account, with no margin beyond that, and no obligation afterwards. Three forces decide whether a long option makes money: the direction of the underlying, the size of the move relative to the premium paid, and the time available. Time decay (theta) and a fall in implied volatility both reduce the premium even when the underlying has not moved against you. Liquidity matters too: a wide bid-ask spread makes entry and exit expensive.`,
      eg: {
        title: 'Call buyer and put buyer, side by side (illustrative)',
        text: `Spot 24,000, lot 75. Call buyer: 24,100 CE at ₹100; at expiry 24,400 the net is (300 − 100) × 75 = +₹15,000; at 24,000 the loss is 100 × 75 = ₹7,500. Put buyer: 23,900 PE at ₹100; at expiry 23,500 the intrinsic value is 23,900 − 23,500 = 400 and the net is (400 − 100) × 75 = +₹22,500. Both buyers risk ₹7,500, but each needs the market to move beyond strike plus or minus premium to profit.`,
      },
      tip: `Limited risk does not mean low risk. A buyer can lose 100% of the premium, and does so often when the move is too small or too late.`,
      visual: {
        kind: 'matrix',
        title: 'What a buyer needs',
        caption: 'Direction, size and timing all have to work.',
        xLabels: ['Move in your direction', 'Move against / none'],
        yLabels: ['Big and quick', 'Small or slow'],
        cells: [
          { head: 'May profit', note: 'Intrinsic value beats premium', tone: 'bull' },
          { head: 'Loss up to full premium', note: 'Option may expire worthless', tone: 'bear' },
          { head: 'May still lose', note: 'Decay eats the premium', tone: 'neutral' },
          { head: 'Loss up to full premium', note: 'Time decay adds to it', tone: 'bear' },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'buy', strike: 23900, premium: 100, expiryPrice: 23500, lotSize: 75, lots: 1 },
        why: 'Reproduces the 23,900 PE buyer example; slide the expiry price to find the breakeven.',
      },
    },
    {
      t: 4,
      def: `An option seller, also called a writer, sells a contract and receives the premium upfront. In return the seller accepts the obligation to settle if the option finishes in the money. Selling calls and selling puts are the two basic forms of writing.`,
      hi: `Option seller ya writer contract bechta hai aur premium pehle hi receive karta hai. Uske badle mein woh obligation leta hai ki agar option in the money gaya toh settlement karna padega. Call write karna aur put write karna, dono seller ke basic forms hain.`,
      how: `The seller's profit is capped at the premium; the loss can be much larger. An uncovered call seller faces a theoretically unlimited loss because the index has no fixed ceiling. An uncovered put seller's loss is large but finite, since the underlying cannot fall below zero. Because of this the exchange and broker block margin (SPAN plus exposure) when you sell, and margin can rise if volatility jumps. Sellers aim to earn premium, benefit from time decay and from falling implied volatility, or to build defined-risk spreads.`,
      eg: {
        title: 'Call writer and put writer (illustrative)',
        text: `Spot 24,000, lot 75. Sell 24,100 CE at ₹100: premium income = 100 × 75 = ₹7,500, breakeven = 24,100 + 100 = 24,200. At expiry 24,400 the intrinsic value is 300, so P&L = (100 − 300) × 75 = −₹15,000. Sell 23,900 PE at ₹100: breakeven = 23,900 − 100 = 23,800. At expiry 23,500 the intrinsic value is 400, so P&L = (100 − 400) × 75 = −₹22,500. Option selling is not guaranteed income; one sharp move can erase many small gains.`,
      },
      tip: `A high chance of a small profit does not make naked selling low risk. Judge a short option by its worst-case loss, not its win rate.`,
      visual: {
        kind: 'payoff',
        title: 'Call seller: capped gain, open loss',
        caption: 'Short 24,100 CE at ₹100. Breakeven 24,200. Illustrative.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24100, premium: 100 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24100, premium: 100, expiryPrice: 24400, lotSize: 75, lots: 1 },
        why: 'See how fast a short call loses once the expiry price passes breakeven.',
      },
    },
    {
      t: 5,
      def: `The option premium is the price per unit paid by the buyer and received by the seller. It has two parts: intrinsic value (what the option would be worth if exercised now) and time value (everything above that). For a call, intrinsic value = max(spot − strike, 0); for a put, max(strike − spot, 0).`,
      hi: `Premium woh price hai jo buyer deta hai aur seller leta hai, per unit. Iske do hisse hote hain: intrinsic value aur time value. Intrinsic value woh hai jo option abhi exercise karne par milta, aur baaki sab time value hai. Call ke liye spot minus strike, put ke liye strike minus spot, aur negative ho toh zero.`,
      how: `Premium is quoted per unit and you pay it times lot size. Time value exists because the underlying can still move before expiry; it generally shrinks as expiry nears (time decay, measured by theta) and generally rises with implied volatility. Other inputs are the strike's distance from spot, interest rates and expected dividends. Time value is highest for at-the-money options and falls for deep in-the-money and far out-of-the-money strikes. We study this properly in the Greeks module.`,
      eg: {
        title: 'Splitting a premium (illustrative)',
        text: `NIFTY = 24,300 and the 24,100 CE trades at ₹260. Intrinsic value = 24,300 − 24,100 = ₹200, so time value = 260 − 200 = ₹60. At the same spot the 24,300 CE and 24,500 CE have zero intrinsic value, so their entire premium is time value. On the put side, the 24,500 PE has intrinsic value 24,500 − 24,300 = ₹200, while the 24,100 PE has none.`,
      },
      tip: `Premium = intrinsic value + time value. If the underlying does not move, time value still melts away as expiry approaches.`,
      visual: {
        kind: 'bars',
        title: 'Splitting the ₹260 premium of the 24,100 CE',
        caption: 'Spot 24,300. Illustrative.',
        unit: ' ₹',
        items: [
          { label: 'Intrinsic value', value: 200, tone: 'gold' },
          { label: 'Time value', value: 60, tone: 'ice' },
          { label: 'Total premium', value: 260, tone: 'neutral' },
        ],
      },
      calc: {
        id: 'premium-split',
        preset: { optType: 'CE', spot: 24300, strike: 24100, premium: 260 },
        why: 'Enter any spot, strike and premium to see intrinsic value and time value.',
      },
    },
    {
      t: 6,
      def: `The expiry date is the last day the contract is valid. After it the option ceases to exist; before it the option still carries time value. On expiry the time value becomes zero and only intrinsic value is settled.`,
      hi: `Expiry date contract ki last valid date hoti hai. Uske baad option exist hi nahi karta. Expiry par time value zero ho jaati hai aur sirf intrinsic value settle hoti hai. Jitna zyada time bacha ho, option mein utni zyada time value hoti hai.`,
      how: `More time means more chance for the underlying to move, so a longer-dated option is generally costlier, all else equal. The decay is not even: it speeds up in the last few days, which is why expiry-week options can lose value fast. NSE lists weekly and monthly contracts on indices; index derivative expiries are currently on Tuesday (the previous trading day if Tuesday is a holiday). Expiry days and the list of weekly products are changed through NSE and SEBI circulars, so never assume an old weekday; check the current contract specification.`,
      eg: {
        title: 'Same strike, different days left (model values, illustrative)',
        text: `Using Black-Scholes with spot 24,000, strike 24,000, India VIX-like volatility 14% and rate 6.5%, a CE with 30 days to expiry is worth about ₹451, with 10 days about ₹244 and with 1 day about ₹72. Spot and volatility are unchanged; only time passes. For a 24,100 CE held at expiry the intrinsic values are: 24,000 → 0, 24,100 → 0, 24,200 → 100, 24,300 → 200, 24,500 → 400.`,
      },
      tip: `Time works against the buyer and for the seller. Before buying, ask whether the move you expect can realistically happen before expiry.`,
      visual: {
        kind: 'bars',
        title: 'ATM call premium by days to expiry',
        caption: 'Black-Scholes, spot 24,000, volatility 14%, rate 6.5%. Illustrative.',
        unit: ' ₹',
        items: [
          { label: '30 days', value: 451, tone: 'ice' },
          { label: '10 days', value: 244, tone: 'ice' },
          { label: '1 day', value: 72, tone: 'gold' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 10, iv: 14, rate: 6.5 },
        why: 'Change days to expiry and watch the premium and theta change.',
      },
    },
    {
      t: 7,
      def: `The strike price is the fixed price in the contract at which the buyer can buy (call) or sell (put) the underlying. It does not change during the life of the contract. Spot price, by contrast, changes all day.`,
      hi: `Strike price contract mein pehle se tay price hota hai jis par buyer buy (call) ya sell (put) kar sakta hai. Contract ki poori life mein yeh change nahi hota. Spot price din bhar badalta rehta hai, strike nahi.`,
      how: `NSE lists a ladder of strikes around spot, and each strike has both a CE and a PE. Strike gaps are decided by the exchange and can be wider far from spot, so always inspect the actual list. Comparing strike with spot gives moneyness: a call is ITM if spot is above strike, ATM near spot and OTM if spot is below; a put is the mirror image. Traders choose strikes by view and risk: an OTM call for a big rally view, an ATM call for a moderate one, an OTM put as portfolio protection.`,
      eg: {
        title: 'Reading a strike ladder at spot 24,000',
        text: `Strikes 23,800 to 24,200 in steps of 100. Calls: 23,800 and 23,900 are ITM, 24,000 is ATM, 24,100 and 24,200 are OTM. Puts: 23,800 and 23,900 are OTM, 24,000 is ATM, 24,100 and 24,200 are ITM. If spot moves to 24,150 tomorrow, the strikes stay the same but the ITM/OTM labels shift.`,
      },
      tip: `Strike is fixed, spot moves. ITM or OTM is a relationship between the two, not a property of the strike alone.`,
      visual: {
        kind: 'ladder',
        title: 'Call strikes against spot 24,000',
        caption: 'Calls above spot are OTM; calls below spot are ITM.',
        optType: 'CE',
        spot: 24000,
        strikes: [23800, 23900, 24000, 24100, 24200],
      },
      calc: {
        id: 'moneyness',
        preset: { optType: 'CE', spot: 24000, strike: 24100 },
        why: 'Check ITM, ATM or OTM and the percentage distance for any strike.',
      },
    },
    {
      t: 8,
      def: `Lot size is the number of units of the underlying that one exchange-traded contract represents. You can trade only in whole lots. Premium per unit times lot size gives the rupees you actually pay or receive.`,
      hi: `Lot size ka matlab hai ek contract mein kitne units hote hain. Aap sirf poore lots mein trade kar sakte ho. Per-unit premium ko lot size se multiply karoge tab asli rupees pata chalenge jo aap pay ya receive karoge.`,
      how: `NSE decides lot sizes and revises them from time to time, so check the current figure on the contract specification page or your broker before every trade. This course's examples use 75 as an illustrative NIFTY lot; the current NIFTY lot is 65. Your P&L scales directly with lots: the same ₹20 premium move earns ₹1,500 on one lot of 75 and ₹7,500 on five. Position sizing should always start from the rupee loss on the full quantity, never from the per-unit premium.`,
      eg: {
        title: 'Premium ₹100 across 1 to 5 lots (lot 75, illustrative)',
        text: `1 lot = 75 units = ₹7,500. 2 lots = 150 units = ₹15,000. 3 lots = 225 units = ₹22,500. 5 lots = 375 units = ₹37,500. If the premium rises from ₹100 to ₹120, profit is 20 × 75 = ₹1,500 on one lot and 20 × 375 = ₹7,500 on five lots. At the current lot of 65, one lot at ₹100 costs ₹6,500.`,
      },
      tip: `Never size a trade from the premium alone. Multiply by the actual quantity to see the true rupee risk.`,
      visual: {
        kind: 'bars',
        title: 'Total premium at ₹100 for 1, 2, 3 and 5 lots',
        caption: 'Lot size 75, illustrative.',
        unit: ' ₹',
        items: [
          { label: '1 lot (75)', value: 7500, tone: 'ice' },
          { label: '2 lots (150)', value: 15000, tone: 'ice' },
          { label: '3 lots (225)', value: 22500, tone: 'ice' },
          { label: '5 lots (375)', value: 37500, tone: 'gold' },
        ],
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 100, lotSize: 75, lots: 5, spot: 24000, marginPct: 12 },
        why: 'Change lots and lot size to see total premium; the 12% margin is only illustrative.',
      },
    },
    {
      t: 9,
      def: `Contract value (notional) is the underlying exposure a contract represents: index level times lot size. For an option buyer the cash actually paid is the premium times lot size, which is far smaller. Notional is exposure, not the amount you can lose.`,
      hi: `Contract value ya notional matlab contract kitne underlying exposure ko represent karta hai: index level into lot size. Option buyer ko sirf premium into lot size dena hota hai, jo notional se bahut chhota hota hai. Notional exposure hai, yeh nahi ki aapka loss utna hi hoga.`,
      how: `For futures, notional = futures price × lot size, but you only deposit margin. For a long option the cash outlay is premium × lot size and that is also your maximum loss. For a short option the margin requirement reflects the risk of the notional, which is why selling needs far more capital than buying. Notional is useful to compare the size of different positions and to understand why a small percentage move in the index can mean a big rupee move.`,
      eg: {
        title: 'Notional versus premium (illustrative)',
        text: `NIFTY futures at 24,000 and lot 75: notional = 24,000 × 75 = ₹18,00,000. A 24,100 CE at ₹100 for the same lot costs 100 × 75 = ₹7,500. The premium is about 0.42% of the notional (7,500 ÷ 18,00,000). A 1% index move changes the notional by ₹18,000, but the option premium change depends on delta and the other factors. With lot 65 the notional would be 24,000 × 65 = ₹15,60,000.`,
      },
      tip: `Do not mistake the ₹7,500 you pay for the ₹18 lakh your lot controls. The gap is leverage, and leverage works both ways.`,
      visual: {
        kind: 'bars',
        title: 'Notional versus premium for one lot',
        caption: 'Spot 24,000, lot 75, premium ₹100. Illustrative.',
        unit: ' ₹',
        items: [
          { label: 'Notional exposure', value: 1800000, tone: 'gold' },
          { label: 'Option premium paid', value: 7500, tone: 'ice' },
        ],
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 100, lotSize: 75, lots: 1, spot: 24000, marginPct: 12 },
        why: 'Compare notional value with the premium for the same lot.',
      },
    },
    {
      t: 10,
      def: `Exercise means using the right in an option. Settlement is how the contract's money or shares are finally exchanged. There are two methods: cash settlement (only the difference is paid) and physical settlement (shares are delivered).`,
      hi: `Exercise ka matlab option ke right ko use karna. Settlement ka matlab contract ke paise ya shares ka final lena-dena. Do tarike hote hain: cash settlement, jisme sirf difference milta hai, aur physical settlement, jisme shares ki delivery hoti hai.`,
      how: `Index options on NSE are cash settled: at expiry an ITM option is settled for intrinsic value times lot size, and a buyer does not need to place an exercise instruction. Stock options are physically settled under current exchange rules: an ITM stock option held to expiry leads to delivery of shares, with funding or stock obligations that can be large. Since being delivered can cost far more than the premium, many traders square off stock options before expiry. Check the current NSE and broker rules on settlement and the related taxes.`,
      eg: {
        title: 'Cash versus physical (illustrative)',
        text: `Cash: an index call with strike 24,000 settles at 24,300. Intrinsic value = 300, settlement = 300 × 75 = ₹22,500 gross; if the premium paid was ₹100, net = (300 − 100) × 75 = ₹15,000. Physical: a stock call with strike ₹1,000 and lot 250 (hypothetical) that is ITM at expiry can lead to a delivery obligation of 1,000 × 250 = ₹2,50,000, which the account must be able to fund.`,
      },
      tip: `Index options end in cash; stock options end in shares. Never hold an ITM stock option into expiry without knowing the delivery obligation.`,
      visual: {
        kind: 'compare',
        title: 'Cash versus physical settlement',
        caption: 'Under current NSE practice for index and stock options.',
        left: { head: 'Cash settlement (index options)', tone: 'ice', points: ['Only the difference is paid', 'No share delivery', 'NIFTY, BANKNIFTY, SENSEX options'] },
        right: { head: 'Physical settlement (stock options)', tone: 'gold', points: ['Shares delivered or received', 'Funds or stock needed in account', 'Reliance, Infosys, TCS options'] },
      },
    },
    {
      t: 11,
      def: `A European-style option can be exercised only at expiry; an American-style option can be exercised on any day up to expiry. The words describe the exercise rule, not where the option is traded.`,
      hi: `European option sirf expiry par exercise ho sakta hai, jabki American option expiry tak kisi bhi din. Yeh naam sirf exercise ke rule ke liye hain, jagah ke liye nahi. NSE ke saare index aur stock options European style hain.`,
      how: `NSE index and stock options are European: the buyer cannot exercise early just because the option is in the money, and the contract is settled under the expiry procedure. An American option can be worth slightly more because early exercise gives extra flexibility. For NSE traders the practical meaning is simple: to realise value before expiry you must sell the option in the market, not exercise it. The standard Black-Scholes model assumes European exercise, which fits these contracts.`,
      eg: {
        title: 'Deep ITM option, mid-month (illustrative)',
        text: `You hold a NIFTY 23,500 CE with spot at 24,200, ten days before expiry. You cannot exercise it today to capture 700 points. You can sell it in the market, where the price will be roughly intrinsic value (24,200 − 23,500 = 700) plus a small time value, or wait for expiry. Under a hypothetical American-style rule you could exercise today.`,
      },
      tip: `European: exercise only at expiry. To exit early on NSE, sell the option in the market.`,
      visual: {
        kind: 'compare',
        title: 'European versus American',
        caption: 'NSE index and stock options are European style.',
        left: { head: 'European style', tone: 'ice', points: ['Exercise only at expiry', 'NSE index and stock options', 'Exit early by selling in the market'] },
        right: { head: 'American style', tone: 'gold', points: ['Exercise any time up to expiry', 'Common in some US equity options', 'May carry extra early-exercise value'] },
      },
    },
    {
      t: 12,
      def: `Index options are based on a market index such as NIFTY 50, BANK NIFTY or SENSEX; stock options are based on one company's shares. Index options are cash settled in India, while stock options are physically settled. Stock options carry more company-specific risk.`,
      hi: `Index options kisi index par based hote hain, jaise NIFTY, BANK NIFTY ya SENSEX. Stock options kisi ek company ke share par hote hain, jaise Reliance ya TCS. Index options cash settle hote hain, stock options physical delivery se. Stock options mein company-specific risk zyada hota hai.`,
      how: `An index spreads risk across its constituents, so a single bad result rarely moves it much, though sector and global shocks still can. A stock can gap sharply on results, regulation or a corporate event while the index barely moves. Stock options have their own lot sizes set by NSE, usually in the hundreds of shares, and usually thinner liquidity than NIFTY options. Index options suit a view on the market or its volatility; stock options suit a view on a specific company if you can handle physical settlement.`,
      eg: {
        title: 'Reliance 1,020 CE at ₹25 (lot 250, hypothetical)',
        text: `Reliance at ₹1,000, you buy the 1,020 CE at ₹25. Premium = 25 × 250 = ₹6,250, and that is the maximum loss. If a company announces poor results and the stock falls 8% while NIFTY stays flat, a Reliance put could gain while a NIFTY put barely moves. That is company-specific risk. Lot size and prices here are hypothetical, not live.`,
      },
      tip: `Neither is better. Choose index options for a market view and stock options only for a company view you can fund and manage.`,
      visual: {
        kind: 'compare',
        title: 'Index options versus stock options',
        caption: 'Contract features as described in this module.',
        left: { head: 'Index options', tone: 'ice', points: ['NIFTY 50, BANK NIFTY, SENSEX', 'Cash settled', 'Diversified across constituents', 'Moves on market, sector and global cues'] },
        right: { head: 'Stock options', tone: 'gold', points: ['One company, e.g. Reliance', 'Physically settled', 'Concentrated company risk', 'Moves on results and corporate events'] },
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 25, lotSize: 250, lots: 1, spot: 1000, marginPct: 12 },
        why: 'Total premium for the hypothetical Reliance example: 25 × 250.',
      },
    },
  ],
  tools: [
    { id: 'option-pnl', why: 'Test any buy or sell, CE or PE trade at different expiry prices.' },
    { id: 'premium-split', why: 'Separate intrinsic value from time value.' },
  ],
}

export default m
