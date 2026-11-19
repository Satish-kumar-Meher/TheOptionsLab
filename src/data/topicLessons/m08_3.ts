import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '8.3',
  intro:
    `The Call side of the chain holds ten numbers and behaviours worth reading: OI, change in OI, volume, LTP, IV, bid-ask and four activity patterns (fresh writing, unwinding, short covering, buying). Each is a clue about what happened to Call positions, not a guarantee of what comes next. All numbers are illustrative (Nifty about 24,000, rate 6.5%, lot 65 - check the current NSE contract specification; platforms differ on showing OI in lots or in units).`,
  introHi:
    `Call side par dus cheezein padhni hoti hain: OI, change in OI, volume, LTP, IV, bid-ask aur chaar activity patterns (fresh writing, unwinding, short covering, buying). Har ek sirf ek clue hai ki Call positions ke saath kya hua, aage kya hoga uski guarantee nahi. Saare numbers illustrative hain (Nifty lagbhag 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein; kuch platforms OI lots mein dikhate hain aur kuch units mein).`,
  steps: {
    concept:
      `A Call option gains when the underlying rises. On the chain, Call data answers: how many Call contracts are open (OI), how many were added or removed today (change in OI), how much traded (volume), what it costs (LTP), how expensive it is (IV) and how easy it is to trade (bid-ask). Reading the four activity patterns together with premium direction tells you whether Calls were being sold, bought or closed. It does not tell you who the buyer or seller was.`,
    conceptHi:
      `Call option tab faayda deta hai jab underlying upar jaye. Chain par Call data batata hai: kitne Call contracts open hain (OI), aaj kitne add ya kam hue (change in OI), kitna trade hua (volume), kya price hai (LTP), kitna mehnga hai (IV) aur trade karna kitna aasaan hai (bid-ask). Premium ki direction ke saath activity patterns dekhne se pata chalta hai ki Calls bech jaye gaye, kharide gaye ya close hue. Yeh nahi pata chalta ki buyer ya seller kaun tha.`,
    mechanism:
      `Every Call trade has a buyer and a seller. Open interest rises when a new contract is created (a new buyer meets a new seller) and falls when an existing contract is closed by both sides. If OI rises while the premium falls, sellers were probably more aggressive, which is read as fresh writing. If OI rises with a rising premium, buyers were probably more aggressive. If OI falls, positions are being closed; whether it is long unwinding or short covering depends on whether the premium fell or rose. These are inferences from price and OI together, because the exchange data does not label the initiator.`,
    example: {
      title: 'One Call strike through the day (illustrative)',
      text: `Nifty 24,000, 7 days to expiry. The 24,500 CE has OI 64,000 lots (41.6 lakh units), up 8,000 lots from yesterday's 56,000, which is +14.3%. LTP is Rs 31, so one lot costs 31 x 65 = Rs 2,015. IV is about 13%. Bid 30.5 and ask 32 give a spread of Rs 1.5, or Rs 97.50 per lot. Rising OI with a premium that fell from 38 to 31 is read as fresh Call writing at that strike.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Reading Call activity: OI direction x premium direction',
      caption: 'This is an inference table, not a fact. IV changes and spot moves also change the premium, so use it as a starting hypothesis.',
      xLabels: ['Premium falls', 'Premium rises'],
      yLabels: ['OI rises', 'OI falls'],
      cells: [
        { head: 'Fresh writing', note: 'new sellers added', tone: 'bear' },
        { head: 'Buying', note: 'new buyers added', tone: 'bull' },
        { head: 'Unwinding', note: 'longs exiting', tone: 'neutral' },
        { head: 'Short covering', note: 'writers buying back', tone: 'gold' },
      ],
    },
    optionChain:
      `On the NSE chain the Call block shows OI, Chng in OI, Volume, IV, LTP and Bid/Ask. Start at the strike with the highest Call OI, then check its change in OI and the premium change on the same row. Compare it with the strikes above and below to see whether activity is isolated or spread out.`,
    psychology:
      `Call writers often expect the index to stay below a strike, and Call buyers expect a rise above it. Sellers collect premium and feel safe until the market surprises them, then rush to cover. Buyers chase fast rises and exit in a panic when decay bites. Short covering can therefore make a rally look stronger than the real buying behind it.`,
    scenarios: {
      bullish:
        `Calls near spot gain, volume jumps and OI may fall as writers cover. A premium that rises while OI falls is a short-covering sign; rising premium with rising OI suggests fresh buying.`,
      bearish:
        `Call premiums fall, fresh writing builds at strikes above spot and buyers unwind. Rising Call OI above spot is often read as a cap, but it is only a possible level.`,
      sideways:
        `Premiums bleed with time and IV slips. Writers at far strikes keep premium; buyers lose to decay. OI changes are small and volume is thin.`,
    },
    practice: [
      {
        q: 'The 24,500 CE OI goes from 56,000 to 64,000 lots. What is the change in OI in lots and per cent?',
        a: `64,000 - 56,000 = 8,000 lots. 8,000 / 56,000 = 14.3%. It means more Call contracts were opened than closed.`,
      },
      {
        q: 'The 24,500 CE premium falls from 38 to 31 while OI rises. How would you read it, and what is the fall in per cent?',
        a: `Fall = 7 / 38 = 18.4%. Falling premium with rising OI is read as fresh Call writing. It is an inference; a fall in IV can cause the same pattern.`,
      },
      {
        q: 'A trader sold the 24,500 CE at 31 and Nifty settles at 24,600 at expiry. What is the result per lot of 65?',
        a: `The Call is worth 24,600 - 24,500 = 100. Result = (31 - 100) x 65 = -69 x 65 = -Rs 4,485. The breakeven is 24,500 + 31 = 24,531.`,
      },
    ],
    assignment:
      `On a live NIFTY chain pick one Call strike above spot. Record its OI, change in OI, volume, LTP and IV at 10:00, 12:00 and 2:00. At each time classify the activity (fresh writing, buying, unwinding or short covering) and note what spot did meanwhile.`,
  },
  topics: [
    {
      t: 1,
      def: `CE OI is the total number of Call contracts at a strike that are still open, meaning not yet closed or expired. It measures how many Call positions exist, not how many traded today.`,
      hi: `CE OI ek strike par abhi tak open Call contracts ki total sankhya hai, yaani jo na close hue na expire. Yeh batata hai ki kitni Call positions maujood hain, aaj kitna trade hua woh nahi.`,
      how: `Each open Call contract has one buyer and one seller, so OI counts pairs, not people. NSE publishes OI per strike and the clearing corporation tracks it. A large Call OI at one strike shows many participants have positions there, which makes it a level of interest. It does not say whether the majority are buyers or sellers, and it does not guarantee that price will stall there.`,
      eg: {
        title: 'A heavy Call strike (illustrative)',
        text: `The 24,500 CE shows OI of 64,000 lots. At 65 units a lot that is 64,000 x 65 = 41,60,000 units, or about Rs 100 crore of notional at Nifty 24,000 per... computing exactly: 41,60,000 x 24,000 = Rs 9,984 crore notional. The strike is clearly crowded, but the OI alone cannot show who is on which side.`,
      },
      tip: `High Call OI is a potential level, not a wall. Always ask which way OI is changing before treating it as resistance.`,
      visual: {
        kind: 'oi',
        title: 'Call OI by strike (illustrative, lakh units)',
        spot: 24000,
        rows: [
          { strike: 24000, ce: 22, pe: 0 },
          { strike: 24200, ce: 30, pe: 0 },
          { strike: 24500, ce: 42, pe: 0 },
          { strike: 24800, ce: 18, pe: 0 },
        ],
      },
    },
    {
      t: 2,
      def: `CE change in OI is today's net addition or reduction in open Call contracts at a strike, compared with the previous day's close. A positive number means more contracts were opened than closed.`,
      hi: `CE change in OI ek strike par pichhle din ke close se aaj tak open Call contracts mein net kitna add ya kam hua, yeh batata hai. Plus ka matlab zyada contracts khule, band kam hue.`,
      how: `Change in OI is the more current signal because total OI includes old positions from many days. A big positive number shows new positions are entering that strike now. A big negative number shows positions are leaving. Combine it with the premium move to guess the type of activity. Very high change in OI on an expiry day can also be due to positions being rolled or squared off, so it needs context.`,
      eg: {
        title: 'Reading the change (illustrative)',
        text: `The 24,500 CE OI was 56,000 lots yesterday and is 64,000 today. Change in OI is +8,000 lots, which is +14.3%. The 24,200 CE moved from 61,000 to 53,000, a change of -8,000 lots or -13.1%. New positions are entering the higher strike while some are leaving the nearer one.`,
      },
      tip: `Change in OI is a flow, total OI is a stock. Use the flow to see what is new today.`,
      visual: {
        kind: 'bars',
        title: 'Change in Call OI today (illustrative, lots)',
        unit: ' lots',
        items: [
          { label: '24,200 CE', value: -8000, tone: 'ice' },
          { label: '24,500 CE', value: 8000, tone: 'gold' },
          { label: '24,800 CE', value: 2500, tone: 'ice' },
        ],
      },
    },
    {
      t: 3,
      def: `CE volume is the number of Call contracts that traded during the day at a strike. Every trade is counted, whether it opens a position, closes one or just passes it from one trader to another.`,
      hi: `CE volume ek strike par aaj din mein kitne Call contracts trade hue yeh hai. Har trade count hota hai, chahe woh nayi position khole, purani band kare ya sirf haath badle.`,
      how: `Volume shows activity and liquidity; OI shows what remains open. A strike can have huge volume and little change in OI if traders are in and out quickly (day trading). A volume far above OI points to heavy intraday churn. Volume near the money is naturally highest because that is where most traders participate.`,
      eg: {
        title: 'Volume against OI (illustrative)',
        text: `The 24,500 CE traded 1,20,000 lots today against an OI of 64,000 lots, so volume is 120 / 64 = 1.9 times OI. Most of that activity was opened and closed within the day, which is why change in OI is only +8,000.`,
      },
      tip: `Volume tells you how busy a strike is. It does not tell you whether the activity was buying or selling.`,
      visual: {
        kind: 'bars',
        title: 'Volume versus OI at the 24,500 CE (illustrative)',
        unit: ' lots',
        items: [
          { label: 'Volume today', value: 120000, tone: 'ice' },
          { label: 'Open interest', value: 64000, tone: 'gold' },
          { label: 'Change in OI', value: 8000, tone: 'neutral' },
        ],
      },
    },
    {
      t: 4,
      def: `CE LTP, or Last Traded Price, is the price of the most recent trade in that Call option. It is the premium per unit; multiply by the lot size to get the cost of one lot.`,
      hi: `CE LTP matlab us Call option ka last traded price, yaani sabse recent trade ka premium per unit. Ek lot ki cost ke liye ise lot size se multiply karo.`,
      how: `LTP is only the last deal and may be stale in thin strikes; for a real entry check the best bid and ask. The premium splits into intrinsic value (how far in the money) and time value (the rest). A Call above spot has zero intrinsic value, so its whole price is time value, which decays to zero by expiry if the strike stays out of the money.`,
      eg: {
        title: 'LTP into rupees (illustrative)',
        text: `Nifty is 24,000. The 24,500 CE LTP is Rs 31. Intrinsic value = max(24,000 - 24,500, 0) = 0, so all 31 is time value. One lot costs 31 x 65 = Rs 2,015. The 24,000 CE at LTP 201 costs 201 x 65 = Rs 13,065 and also has zero intrinsic value, since spot equals strike.`,
      },
      tip: `LTP is history, not an offer. Trade at the bid or ask, not at the number on the screen.`,
      visual: {
        kind: 'ladder',
        title: 'Which Calls have intrinsic value at spot 24,000',
        optType: 'CE',
        spot: 24000,
        strikes: [23600, 23800, 24000, 24200, 24500],
      },
      calc: { id: 'premium-split', preset: { optType: 'CE', spot: 24000, strike: 24500, premium: 31 }, why: 'Splits the Rs 31 premium into intrinsic and time value.' },
    },
    {
      t: 5,
      def: `CE IV is the implied volatility of that Call, the volatility the market's price implies. A higher IV means a more expensive option for the same strike and expiry.`,
      hi: `CE IV us Call ki implied volatility hai, yaani price se market jo volatility maan raha hai. Same strike aur expiry par IV zyada ka matlab option mehnga.`,
      how: `IV is backed out of the traded price using a pricing model such as Black-Scholes; the NSE chain shows it per strike. IV differs from strike to strike (skew) and expiry to expiry. Higher IV raises both Calls and Puts. If IV falls after an event, a Call can lose value even if spot is unchanged. Compare a strike's IV with its own recent range, not with another strike's.`,
      eg: {
        title: 'IV moves the premium (illustrative)',
        text: `The 24,500 CE with 7 days left and Nifty at 24,000 is worth about Rs 31.4 at IV 13% and about Rs 47.6 at IV 15%. The 2-point IV rise adds 16.2 per unit, or about Rs 1,054 per lot of 65, without any move in the index.`,
      },
      tip: `A Call can lose money while the index goes up if IV falls enough. Check IV before you buy, not only direction.`,
      visual: {
        kind: 'curve',
        title: 'IV across strikes (smile / skew shape)',
        caption: 'Each strike carries its own IV; the shape across strikes is called the smile or skew.',
        curve: 'iv-smile',
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24500, days: 7, iv: 13, rate: 6.5 }, why: 'Change IV from 13 to 15 and see the price move.' },
    },
    {
      t: 6,
      def: `CE bid and ask are the best prices at which someone will buy (bid) and sell (ask) that Call right now. The gap between them is the spread, a cost every trader pays to get in and out.`,
      hi: `CE bid aur ask woh best prices hain jis par abhi koi Call khareedne (bid) aur bechne (ask) ko ready hai. Dono ke beech ka gap spread hai, jo har trader ko entry aur exit mein dena padta hai.`,
      how: `A buyer paying the ask and later selling at the bid loses the spread immediately. Spreads are tight near the money, where many market participants quote, and wide for far strikes and thin expiries. The depth (quantity at each price) matters too: a small best bid may not absorb a larger order. Use limit orders so you control the price.`,
      eg: {
        title: 'Cost of the spread (illustrative)',
        text: `The 24,500 CE has bid 30.5 and ask 32. The spread is Rs 1.5, which is 1.5 / 31.25 = 4.8% of the mid price. On one lot of 65 it is 1.5 x 65 = Rs 97.50 to get in and out once, before brokerage and other charges.`,
      },
      tip: `A wide spread is a hidden fee. If the spread is a large share of the premium, the strike is poor to trade.`,
      visual: {
        kind: 'orderBook',
        title: '24,500 CE depth (illustrative, price, quantity)',
        bids: [[30.5, 650], [30.0, 1300], [29.5, 2600]],
        asks: [[32.0, 520], [32.5, 1170], [33.0, 1950]],
      },
      calc: { id: 'spread-cost', preset: { bid: 30.5, ask: 32, qty: 1, lotSize: 65 }, why: 'Spread cost per lot in rupees.' },
    },
    {
      t: 7,
      def: `CE fresh writing means new traders are selling (writing) Call options, so OI rises while the premium usually falls. The sellers receive premium and keep the position as long as the index stays below the strike plus premium.`,
      hi: `CE fresh writing ka matlab hai naye traders Call options bech (write) rahe hain, isliye OI badhta hai aur premium aam taur par girta hai. Seller ko premium milta hai aur jab tak index strike plus premium se neeche rahe, woh faayde mein rehta hai.`,
      how: `A Call writer takes the obligation to settle if the buyer exercises, and index options are cash-settled. The seller needs margin (SPAN plus exposure) blocked with the broker and the clearing corporation. The writer's profit is capped at the premium while the loss can be large if the index rises sharply. Rising OI with a falling premium is read as writing, but this is an inference from price and OI together.`,
      eg: {
        title: 'A Call writer on the 24,500 strike (illustrative)',
        text: `A trader sells one lot of the 24,500 CE at 31. If Nifty ends at 24,300, the option expires worthless and profit is 31 x 65 = Rs 2,015. Breakeven is 24,531. If Nifty ends at 24,600, the loss is (100 - 31) x 65 = Rs 4,485, and it keeps growing for every point above.`,
      },
      tip: `Writers do not always win. Their reward is limited and small, their risk is large and open. Never read heavy writing as a guarantee that the level will hold.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,500 CE at 31 (per unit)',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24500, premium: 31 }],
      },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'sell', strike: 24500, premium: 31, expiryPrice: 24600, lotSize: 65, lots: 1 }, why: 'Seller P&L at any expiry level.' },
    },
    {
      t: 8,
      def: `CE unwinding is a fall in Call OI. Existing positions are being closed. If the premium also falls, the usual reading is that Call buyers are exiting (long unwinding).`,
      hi: `CE unwinding ka matlab Call OI ghat raha hai, yaani purani positions band ho rahi hain. Agar premium bhi gir raha hai toh aam taur par Call buyers nikal rahe hain (long unwinding).`,
      how: `OI falls only when both the buyer and the seller of a contract close, or when the contract expires. A drop in OI with a drop in premium suggests holders are selling out, often after a rise has failed or as time decay hurts. The read is not certain: sellers can also cover at lower prices. Use the spot trend and IV together with it.`,
      eg: {
        title: 'Unwinding at the 24,500 CE (illustrative)',
        text: `OI falls from 64,000 to 58,000 lots, a change of -6,000, which is -9.4%. The premium falls from 31 to 22, a drop of 9 or 29%. A buyer who paid 31 and exits at 22 loses 9 x 65 = Rs 585 per lot.`,
      },
      tip: `Falling OI means positions are leaving, not that the market is turning bearish or bullish. Look at the premium and spot to tell who was leaving.`,
      visual: {
        kind: 'flow',
        title: 'How unwinding shows up',
        steps: [
          { label: 'Holders close positions', tone: 'neutral' },
          { label: 'OI falls', note: 'fewer open contracts', tone: 'ice' },
          { label: 'Premium also falls', note: 'sellers hitting bids', tone: 'bear' },
          { label: 'Read: long unwinding', note: 'inference only', tone: 'gold' },
        ],
      },
    },
    {
      t: 9,
      def: `CE short covering happens when Call writers buy back the Calls they sold, typically after the index rises. OI falls while the premium rises, because the writers are buyers at that moment.`,
      hi: `CE short covering tab hoti hai jab Call writers apne bechhe hue Calls wapas khareedte hain, aam taur par jab index upar jata hai. OI girta hai aur premium badhta hai, kyunki us waqt writers hi buyer hote hain.`,
      how: `A writer facing a rising index and growing loss closes the trade by buying the same Call. Because many writers do this at once, the buying can push premiums and spot higher for a while. It can also trigger stop-losses of other writers. This is an inference from falling OI plus rising premium, so check that the spot actually moved up.`,
      eg: {
        title: 'A writer covers (illustrative)',
        text: `A trader sold the 24,500 CE at 31. Nifty rises to 24,100, the Call trades at 48.5 and the trader buys it back. Loss = (48.5 - 31) x 65 = 17.5 x 65 = Rs 1,137.50. OI at the strike falls by 5,000 lots as such trades close.`,
      },
      tip: `Short covering rallies can be sharp but short-lived. Once the covering is over, there is no fresh buyer left behind it.`,
      visual: {
        kind: 'candles',
        title: 'Short covering: a sharp climb into a Call strike',
        pattern: 'breakout',
        level: { price: 24500, label: 'Call strike' },
      },
    },
    {
      t: 10,
      def: `CE buying means traders are opening long Call positions, hoping the index will rise. OI rises along with the premium, because buyers are the more aggressive side.`,
      hi: `CE buying ka matlab traders long Call positions khol rahe hain, is umeed mein ki index upar jayega. OI aur premium dono badhte hain, kyunki buyers zyada aggressive hote hain.`,
      how: `The buyer pays the premium and has limited risk (the premium) with unlimited upside. Fresh buying usually shows as rising premium, rising OI and rising volume together with a rising index. Be careful: option sellers also hedge by buying Calls, so rising OI with rising premium is not proof of bullish intent. Use confirmation from spot, volume and other strikes.`,
      eg: {
        title: 'A Call buyer (illustrative)',
        text: `A trader buys one lot of the 24,500 CE at 31, paying 31 x 65 = Rs 2,015. If Nifty ends at 24,700 the Call is worth 200, profit = (200 - 31) x 65 = Rs 10,985. If Nifty ends at 24,500 or lower, the loss is the full Rs 2,015. Breakeven is 24,531.`,
      },
      tip: `Cheap far-OTM Calls win rarely. Size them so that losing the full premium is acceptable.`,
      visual: {
        kind: 'payoff',
        title: 'Long 24,500 CE at 31 (per unit)',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24500, premium: 31 }],
      },
    },
  ],
  tools: [{ id: 'breakeven', preset: { optType: 'CE', side: 'sell', strike: 24500, premium: 31 }, why: 'Breakeven for a Call writer at the 24,500 strike.' }],
}
export default m
