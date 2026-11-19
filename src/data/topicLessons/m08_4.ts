import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '8.4',
  intro:
    `The Put side of the option chain mirrors the Call side, but its clues point the other way: Puts gain when the index falls, so Put activity is often read as a map of where traders expect support or fear a fall. This module covers the ten things to read on the Put side: OI, change in OI, volume, LTP, IV, bid-ask and the four activity patterns (fresh writing, unwinding, short covering, buying). Everything is a clue about positions, never a promise about direction. All numbers are illustrative (Nifty about 24,000, rate 6.5%, lot 65 - check the current NSE contract specification; platforms differ on showing OI in lots or in units).`,
  introHi:
    `Option chain ka Put side Call side ka aaina hai, lekin iske clues ulti taraf ishara karte hain: Put tab faayda deta hai jab index girta hai, isliye Put activity ko aksar support ya girne ke darr ka map samjha jaata hai. Is module mein Put side ki dus cheezein hain: OI, change in OI, volume, LTP, IV, bid-ask aur chaar activity patterns (fresh writing, unwinding, short covering, buying). Sab kuch positions ke baare mein clue hai, direction ki guarantee nahi. Saare numbers illustrative hain (Nifty lagbhag 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein; kuch platforms OI lots mein dikhate hain, kuch units mein).`,
  steps: {
    concept:
      `A Put option gains value when the underlying falls. Buyers use Puts to bet on a fall or to insure a portfolio; sellers (writers) collect premium and take on the risk of a fall. On the chain, Put data answers: how many Put contracts are open (OI), how many were added or removed today (change in OI), how much traded (volume), what a Put costs (LTP), how expensive it is in volatility terms (IV) and how easy it is to trade (bid-ask). Put OI is not automatically bullish or bearish. A large Put OI below spot is often read as a possible support zone only if the OI is mostly written, and OI alone cannot tell you who is on which side.`,
    conceptHi:
      `Put option tab faayda deta hai jab underlying girta hai. Buyer Put se girne par daav lagate hain ya portfolio ka insurance lete hain; seller (writer) premium kamate hain aur girne ka risk lete hain. Chain par Put data batata hai: kitne Put contracts open hain (OI), aaj kitne add ya kam hue (change in OI), kitna trade hua (volume), Put ka price kya hai (LTP), volatility ke hisaab se kitna mehnga hai (IV) aur trade karna kitna aasaan hai (bid-ask). Put OI apne aap bullish ya bearish nahi hota. Spot ke neeche bada Put OI sirf tab support zone maana jaata hai jab zyada tar writing ho, aur akela OI yeh nahi batata ki kaun kis side par hai.`,
    mechanism:
      `Every Put trade has a buyer and a seller. Open interest rises when a new contract is created and falls when an existing one is closed by both sides. On the Put side the four activity patterns come from OI direction and premium direction together. OI up with premium down is read as fresh Put writing (sellers more aggressive). OI up with premium up is read as Put buying. OI down with premium down is read as Put unwinding (buyers exiting). OI down with premium up is read as Put short covering (writers buying back, often in a fall). Because exchange data does not label who initiated a trade, these are inferences. IV changes, time decay and a move in spot also change the premium, so treat the table as a hypothesis, not a fact.`,
    example: {
      title: 'One Put strike through the day (illustrative)',
      text: `Nifty 24,000, 7 days to expiry. The 23,500 PE has OI of 72,000 lots (46,80,000 units), up 9,000 lots from yesterday's 63,000, which is +14.3%. LTP is ₹35.6 (illustrative Black-Scholes value at IV 15%), so one lot costs 35.6 x 65 = ₹2,314. Bid 35 and ask 36.5 give a spread of ₹1.5, or ₹97.50 per lot. The premium fell from yesterday's 44 to 35.6 while OI rose, which is read as fresh Put writing at that strike. Its breakeven for a buyer is 23,500 - 35.6 = 23,464.4.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Reading Put activity: OI direction x premium direction',
      caption: 'An inference table, not a fact. A change in spot or IV can also move the premium, so use it as a starting hypothesis and confirm with other data.',
      xLabels: ['Premium falls', 'Premium rises'],
      yLabels: ['OI rises', 'OI falls'],
      cells: [
        { head: 'Fresh Put writing', note: 'new sellers, support view', tone: 'bull' },
        { head: 'Put buying', note: 'new buyers, fall or hedge view', tone: 'bear' },
        { head: 'Put unwinding', note: 'long Puts exiting', tone: 'neutral' },
        { head: 'Put short covering', note: 'writers buying back', tone: 'gold' },
      ],
    },
    optionChain:
      `On the NSE chain the Put block sits on the right: LTP, IV, Volume, Chng in OI and OI, with Bid and Ask. Start with the Put strike that has the highest OI below spot, then read its change in OI, its premium change and its IV on the same row. Compare with neighbouring strikes: activity at one lonely strike is weaker evidence than activity across several strikes. Also compare Put IV with Call IV at a similar distance from spot; Puts usually carry a higher IV, so a higher Put IV on its own is normal.`,
    psychology:
      `Put writers usually believe the index will stay above their strike and treat the premium as income; they feel calm until a sharp fall forces them to cover. Put buyers are either speculating on a fall or paying for insurance, and they often buy more after a fall has already happened, when premiums are expensive. Institutions may buy Puts to protect a large equity portfolio, which creates Put OI that has nothing to do with a bearish view. This is why Put OI cannot be read as one-sided fear or support.`,
    scenarios: {
      bullish:
        `Put premiums fall, Put writing builds at strikes below spot and long Puts are unwound. Rising Put OI with falling premium is often read as support forming, but it is only a possible level.`,
      bearish:
        `Put premiums rise quickly, volume jumps and Put OI may fall as writers cover (short covering) or rise as buyers add. A fast rise in Put IV shows demand for protection, not a forecast of further falls.`,
      sideways:
        `Put premiums bleed with time and IV eases. Put writers at far strikes keep the premium; Put buyers lose to decay. Change in OI is small and volume is thin.`,
    },
    practice: [
      {
        q: 'The 23,500 PE OI goes from 63,000 to 72,000 lots. What is the change in OI in lots and per cent, and how many units is the new OI?',
        a: `72,000 - 63,000 = 9,000 lots. 9,000 / 63,000 = 14.3%. New OI in units = 72,000 x 65 = 46,80,000 units. More Put contracts were opened than closed.`,
      },
      {
        q: 'The 23,500 PE premium falls from 44 to 35.6 while its OI rises. What is the fall in per cent, and how would you read it?',
        a: `Fall = 8.4 / 44 = 19.1%. Falling premium with rising OI is read as fresh Put writing. It is an inference; a fall in IV or time decay could cause a similar drop.`,
      },
      {
        q: 'A trader sold the 23,500 PE at 35.6 and Nifty settles at 23,400 at expiry. What is the result for one lot of 65, and what is the breakeven?',
        a: `The Put is worth 23,500 - 23,400 = 100. Result = (35.6 - 100) x 65 = -64.4 x 65 = -₹4,186. Breakeven = 23,500 - 35.6 = 23,464.4. Below it, the writer loses ₹65 for every point.`,
      },
      {
        q: 'A buyer paid 35.6 for the same Put and Nifty settles at 23,300. What is the profit per lot, and what is the maximum loss?',
        a: `Intrinsic value = 23,500 - 23,300 = 200. Profit = (200 - 35.6) x 65 = 164.4 x 65 = ₹10,686. Maximum loss = premium paid = 35.6 x 65 = ₹2,314, if Nifty finishes at or above 23,500.`,
      },
    ],
    assignment:
      `On a live NIFTY chain pick one Put strike below spot. Record its OI, change in OI, volume, LTP and IV at 10:00, 12:00 and 2:00. At each time classify the activity (fresh writing, buying, unwinding or short covering), note what spot did, and write one line on what could make your reading wrong.`,
  },
  topics: [
    {
      t: 1,
      def: `PE OI is the total number of Put contracts at a strike that are still open, meaning not yet closed or expired. It counts positions that exist, not how many traded today.`,
      hi: `PE OI ek strike par abhi tak open Put contracts ki total sankhya hai, yaani jo na close hue na expire. Yeh batata hai ki kitni Put positions maujood hain, aaj kitna trade hua woh nahi.`,
      how: `Each open Put contract has one buyer and one seller, so OI counts pairs, not people. NSE publishes OI for every strike and the clearing corporation (NSCCL) tracks the contracts. A large Put OI at a strike below spot shows many positions there, which makes it a level of interest. It does not say whether most of the OI is long or short, and it does not guarantee that price will stop there. Some of it may be hedging by large investors, not a view on the index.`,
      eg: {
        title: 'A crowded Put strike (illustrative)',
        text: `The 23,500 PE shows OI of 72,000 lots. At 65 units a lot that is 72,000 x 65 = 46,80,000 units. At the strike price of 23,500 the notional value is 46,80,000 x 23,500 = ₹10,998 crore. The strike is clearly crowded, but OI alone cannot show who is on which side.`,
      },
      tip: `High Put OI is a possible level, not a floor. Check its change in OI and the premium before calling it support.`,
      visual: {
        kind: 'oi',
        title: 'Put OI by strike (illustrative, lakh units)',
        caption: 'The tallest bar is the most crowded Put strike. Crowded is not the same as safe.',
        spot: 24000,
        rows: [
          { strike: 23000, ce: 0, pe: 38 },
          { strike: 23200, ce: 0, pe: 24 },
          { strike: 23500, ce: 0, pe: 46 },
          { strike: 23800, ce: 0, pe: 26 },
        ],
      },
      calc: { id: 'lot-value', preset: { premium: 35.6, lotSize: 65, lots: 1, spot: 24000, marginPct: 12 }, why: 'Shows the rupee value of one lot of the 23,500 PE at its premium.' },
    },
    {
      t: 2,
      def: `PE change in OI is the net number of Put contracts added or removed at a strike since the previous close. A positive number means more contracts were opened than closed today.`,
      hi: `PE change in OI ek strike par pichhle close ke baad se Put contracts mein net kitna add ya kam hua, yeh batata hai. Plus ka matlab aaj zyada contracts khule aur kam band hue.`,
      how: `Change in OI is the fresher signal, because total OI also contains old positions from many days. A large positive change shows that new positions are entering that strike now; a large negative change shows positions leaving. Pair it with the premium move and the spot move to guess the type of activity. On an expiry day a big negative change often just reflects positions expiring or being squared off, so context matters.`,
      eg: {
        title: 'Reading a change in OI (illustrative)',
        text: `The 23,500 PE OI was 63,000 lots at yesterday's close and is 72,000 lots now. Change = +9,000 lots, which is +9,000 / 63,000 = +14.3%, or 9,000 x 65 = 5,85,000 units. The 23,800 PE shows -6,000 lots on the same day. New Puts are building at 23,500 while Puts at 23,800 are being closed.`,
      },
      tip: `Always read change in OI as a percentage of the previous OI. A change of 5,000 lots means little at 2,00,000 OI and a lot at 20,000 OI.`,
      visual: {
        kind: 'bars',
        title: 'Put change in OI by strike (illustrative, lots)',
        caption: 'Positive = contracts added, negative = contracts removed.',
        unit: ' lots',
        items: [
          { label: '23,000', value: 2000, tone: 'gold' },
          { label: '23,200', value: 1500, tone: 'gold' },
          { label: '23,500', value: 9000, tone: 'ice' },
          { label: '23,800', value: -6000, tone: 'neutral' },
        ],
      },
    },
    {
      t: 3,
      def: `PE volume is the number of Put contracts traded at a strike during the day. It tells you how active the strike was, regardless of whether positions were opened or closed.`,
      hi: `PE volume ek strike par din bhar mein kitne Put contracts trade hue, yeh hai. Isse pata chalta hai strike kitna active tha, chahe positions khule ho ya band hue ho.`,
      how: `Volume counts every trade, including a trader who buys and sells the same Put several times in a day, so it can exceed OI. High volume with a large change in OI suggests new positions; high volume with a small change in OI suggests day traders going in and out. Volume is cumulative through the day, so compare it with the same time on earlier days. Look at volume as turnover in rupees too, because a cheap far strike can show huge contract counts but little money.`,
      eg: {
        title: 'Volume versus OI (illustrative)',
        text: `The 23,500 PE traded 1,45,000 lots against an OI of 72,000 lots, so volume is about 2.0 times OI. In units that is 1,45,000 x 65 = 94,25,000. At an average price of ₹38 the premium turnover is 94,25,000 x 38 = ₹35.8 crore. OI rose only 9,000 lots, so most of the volume was traders opening and closing within the day.`,
      },
      tip: `Volume is activity, OI is stock of positions. A strike with large volume and little change in OI was mostly day trading.`,
      visual: {
        kind: 'compare',
        title: 'Volume versus OI at the same strike',
        left: { head: 'Volume', tone: 'ice', points: ['Counts every trade', 'Resets each day', 'Includes day trading', 'Can exceed OI'] },
        right: { head: 'Open interest', tone: 'gold', points: ['Counts open contracts', 'Carries to next day', 'Falls only when contracts close', 'Ignores same-day round trips'] },
      },
      calc: { id: 'lot-value', preset: { premium: 38, lotSize: 65, lots: 145000, spot: 24000, marginPct: 12 }, why: 'Multiplying one lot by 1,45,000 lots gives the day rupee turnover in premium.' },
    },
    {
      t: 4,
      def: `PE LTP (last traded price) is the price at which the most recent Put trade happened. It is the premium you would see on screen, quoted per unit.`,
      hi: `PE LTP woh price hai jis par us strike ka sabse recent Put trade hua. Yeh screen par dikhne wala premium hai, jo per unit quote hota hai.`,
      how: `A Put premium is made of intrinsic value (strike minus spot, if positive) and time value. A Put below spot has no intrinsic value, so its whole LTP is time value, driven by days left, IV and distance from spot. The LTP is the last trade, not the current bid or ask, so in a thin strike it can be stale. Compare the LTP with yesterday's close and with the bid and ask before judging whether the premium really rose or fell.`,
      eg: {
        title: 'Premium of an OTM Put (illustrative)',
        text: `Nifty 24,000 and the 23,500 PE is 500 points (2.08%) out of the money, so intrinsic value is 0 and the entire ₹35.6 is time value. One lot costs 35.6 x 65 = ₹2,314. Yesterday's close was 44, so the premium has fallen 8.4 / 44 = 19.1%. That fall may come from time decay, lower IV or a rise in spot; LTP alone does not say which.`,
      },
      tip: `Never judge a Put premium move without asking whether spot, IV or time caused it.`,
      visual: {
        kind: 'ladder',
        title: 'Put strikes around Nifty 24,000',
        caption: 'For a Put, strikes above spot are in the money and strikes below spot are out of the money.',
        optType: 'PE',
        spot: 24000,
        strikes: [24500, 24200, 24000, 23800, 23500, 23000],
      },
      calc: { id: 'premium-split', preset: { optType: 'PE', spot: 24000, strike: 23500, premium: 35.6 }, why: 'Splits the premium into intrinsic value and time value.' },
    },
    {
      t: 5,
      def: `PE IV (implied volatility) is the volatility that the Put's current price implies. A higher IV means the market is paying more for the Put for the same strike and time.`,
      hi: `PE IV woh volatility hai jo Put ke current price se nikalti hai. IV zyada ho toh same strike aur same time ke liye market Put ke liye zyada paisa de rahi hai.`,
      how: `IV is not observed directly; it is backed out from the premium using a model such as Black-Scholes. Index Puts usually trade at a higher IV than Calls at the same distance from spot, because investors buy Puts to protect portfolios. This difference is called skew. A rising Put IV while spot is flat means demand for protection is rising. For a Put buyer, rising IV adds to the premium (vega); for a writer, it raises mark-to-market loss and margin.`,
      eg: {
        title: 'Put IV against Call IV (illustrative)',
        text: `At Nifty 24,000 with 7 days left, the 23,500 PE trades at IV 15% (premium about ₹35.64) while the 24,500 CE, the same 500 points away, trades at IV 13% (about ₹31.38). The gap is 2 volatility points. If the Put IV rises from 15% to 16% with spot and time unchanged, the premium goes from 35.64 to 43.28, a gain of 7.64 per unit or ₹496.60 per lot.`,
      },
      tip: `A higher Put IV than Call IV is normal. Watch how Put IV changes from its own earlier level, not how it compares with Call IV.`,
      visual: {
        kind: 'curve',
        title: 'Typical IV shape across strikes',
        caption: 'Index options often show a higher IV on the Put side (lower strikes). The exact shape changes daily.',
        curve: 'iv-smile',
      },
      calc: { id: 'greeks', preset: { optType: 'PE', spot: 24000, strike: 23500, days: 7, iv: 15, rate: 6.5 }, why: 'Change IV from 15 to 16 and watch the Put premium move by vega.' },
    },
    {
      t: 6,
      def: `PE bid and ask are the best price a buyer is currently willing to pay (bid) and the best price a seller is asking (ask) for the Put. The gap between them is the spread, a hidden cost of trading.`,
      hi: `PE bid woh sabse achha price hai jo buyer abhi dene ko taiyaar hai, aur ask woh jo seller maang raha hai. Dono ke beech ka gap spread hai, jo trading ka chhupa hua cost hai.`,
      how: `You buy at the ask and sell at the bid when you use market orders, so a wide spread costs you immediately. Far OTM Puts and weekly strikes on slow days can have a spread of several per cent of the premium, while ATM strikes are usually tight. A thin quantity at the bid or ask shows that a large order can move the price. Using limit orders between bid and ask is the common way to control this cost.`,
      eg: {
        title: 'Spread cost on one lot (illustrative)',
        text: `The 23,500 PE shows bid 35 and ask 36.5. Spread = 36.5 - 35 = ₹1.5 per unit, which is 1.5 x 65 = ₹97.50 per lot, about 4.2% of the mid price 35.75 (1.5 / 35.75). If you buy at 36.5 and the market does not move, selling at 35 immediately loses ₹97.50 before charges.`,
      },
      tip: `Check the spread before the LTP. A wide spread means the LTP may not be a price you can actually trade at.`,
      visual: {
        kind: 'orderBook',
        title: '23,500 PE depth (illustrative)',
        caption: 'The gap between the best bid and best ask is the spread.',
        bids: [[35, 1300], [34.5, 2600], [34, 3900]],
        asks: [[36.5, 1950], [37, 3250], [37.5, 2600]],
      },
      calc: { id: 'spread-cost', preset: { bid: 35, ask: 36.5, qty: 1, lotSize: 65 }, why: 'Gives the spread cost per lot in rupees.' },
    },
    {
      t: 7,
      def: `PE fresh writing means new Put contracts are being sold and added to open interest. It is inferred when Put OI rises while the Put premium falls.`,
      hi: `PE fresh writing ka matlab hai ki naye Put contracts bech kar OI mein add ho rahe hain. Yeh tab maana jaata hai jab Put OI badhe aur Put premium gire.`,
      how: `A writer sells a Put, collects the premium and must buy the index at the strike if it falls below at expiry, so writers usually expect the index to stay above that level. Rising OI with falling premium suggests sellers were more aggressive than buyers. Writers must also pay SPAN plus exposure margin, so size is limited by capital. Fresh writing below spot is often read as a possible support area, but writers can be wrong, and a fall can force them to cover quickly.`,
      eg: {
        title: 'Premium collected by new writers (illustrative)',
        text: `The 23,500 PE adds 9,000 lots while premium falls from 44 to 35.6. Premium collected on the new lots is 9,000 x 65 x 35.6 = 5,85,000 x 35.6 = ₹2.08 crore. A writer of one lot keeps 35.6 x 65 = ₹2,314 if Nifty stays above 23,500, but loses ₹65 for every point below the breakeven 23,464.4.`,
      },
      tip: `Fresh writing shows seller activity, not seller correctness. Writers lose money in sharp falls.`,
      visual: {
        kind: 'payoff',
        title: 'Short 23,500 PE at expiry (illustrative)',
        caption: 'Profit is capped at the premium; loss grows as Nifty falls below the breakeven.',
        spot: 24000,
        legs: [{ type: 'PE', side: -1, strike: 23500, premium: 35.6 }],
      },
      calc: { id: 'option-pnl', preset: { optType: 'PE', side: 'sell', strike: 23500, premium: 35.6, expiryPrice: 23400, lotSize: 65, lots: 1 }, why: 'Writer result at any expiry level.' },
    },
    {
      t: 8,
      def: `PE unwinding means existing Put positions are being closed, so Put OI falls. If the premium also falls, it is read as long Put holders exiting.`,
      hi: `PE unwinding ka matlab hai ki maujooda Put positions band ho rahi hain, isliye Put OI girta hai. Agar premium bhi gire toh samjha jaata hai ki Put buyers exit kar rahe hain.`,
      how: `OI falls only when both the buyer and the seller of a contract close it, or when contracts expire. If premium falls at the same time, the likelier story is that holders of long Puts sold to close, often after a fall has stopped or after they no longer fear one. Unwinding can happen because of profit-taking, stop-losses, rollover or time decay making the position uninteresting. Falling Put OI near spot is sometimes read as protection being removed, which can be mildly bullish, but it is not a signal by itself.`,
      eg: {
        title: 'A Put strike being unwound (illustrative)',
        text: `The 23,500 PE OI falls from 72,000 to 66,000 lots, which is -6,000 lots or -8.3%. The premium drops from 35.6 to 29. A buyer who paid 35.6 and sold at 29 loses 6.6 x 65 = ₹429 per lot. The pattern is read as long Puts being closed.`,
      },
      tip: `Falling Put OI plus falling premium usually means buyers leaving, but it is not a buy signal for the index.`,
      visual: {
        kind: 'flow',
        title: 'How Put unwinding appears on the chain',
        steps: [
          { label: 'Long Put holder sells to close', tone: 'neutral' },
          { label: 'A writer buys to close', note: 'both sides exit', tone: 'neutral' },
          { label: 'OI falls', tone: 'gold' },
          { label: 'Premium also falls', note: 'read as unwinding', tone: 'ice' },
        ],
      },
    },
    {
      t: 9,
      def: `PE short covering means Put writers are buying back the Puts they sold to close their positions. It is inferred when Put OI falls while the Put premium rises.`,
      hi: `PE short covering ka matlab hai ki Put writers apne bechhe hue Put wapas khareed kar position band kar rahe hain. Yeh tab maana jaata hai jab Put OI gire lekin premium badhe.`,
      how: `When the index falls towards a written strike, the Put premium rises and the writer's loss grows, so some writers buy back to stop the loss. Their buying pushes the premium up further while OI falls, because each covered contract closes. It often appears during a sharp fall. It does not mean the fall will stop or continue; it means sellers are in pain. Remember the premium can also rise because of a spike in IV, not only because of covering.`,
      eg: {
        title: 'A writer covers into a fall (illustrative)',
        text: `A trader sold the 23,500 PE at 35.6. Nifty drops towards 23,650 and the premium jumps to 60. The trader buys back at 60. Loss = (35.6 - 60) x 65 = -24.4 x 65 = -₹1,586 per lot. On the chain, the strike shows OI falling by 4,000 lots and the premium rising, the short-covering pattern.`,
      },
      tip: `Short covering is a sign of seller stress, not a promise of a bounce. Do not read it alone.`,
      visual: {
        kind: 'matrix',
        title: 'Put OI and premium together',
        xLabels: ['Premium falls', 'Premium rises'],
        yLabels: ['OI rises', 'OI falls'],
        cells: [
          { head: 'Fresh writing', tone: 'bull' },
          { head: 'Buying', tone: 'bear' },
          { head: 'Unwinding', tone: 'neutral' },
          { head: 'Short covering', note: 'this topic', tone: 'gold' },
        ],
      },
      calc: { id: 'option-pnl', preset: { optType: 'PE', side: 'sell', strike: 23500, premium: 35.6, expiryPrice: 23440, lotSize: 65, lots: 1 }, why: 'Compare the cost of waiting until expiry with covering early at 60.' },
    },
    {
      t: 10,
      def: `PE buying means traders are paying to own Puts, either to profit from a fall or to protect an existing portfolio. It is inferred when Put OI and Put premium both rise.`,
      hi: `PE buying ka matlab hai ki traders Put kharid rahe hain, ya toh girne par kamaane ke liye ya apne portfolio ko protect karne ke liye. Yeh tab maana jaata hai jab Put OI aur Put premium dono badhe.`,
      how: `A Put buyer pays the premium upfront and loses at most that amount. The loss is limited, the profit rises as the index falls below the strike minus premium. Buying can be speculative or protective (hedging), and OI cannot separate the two. A big buyer such as a fund hedging an equity portfolio produces the same data as a bearish speculator. High IV makes Puts expensive, and time decay works against the buyer every day.`,
      eg: {
        title: 'Put buyer outcome (illustrative)',
        text: `A trader buys one lot of the 23,500 PE at 35.6, costing 35.6 x 65 = ₹2,314. If Nifty settles at 23,300 at expiry, the Put is worth 200 and profit = (200 - 35.6) x 65 = 164.4 x 65 = ₹10,686. If Nifty settles at 23,600 or higher, the Put expires worthless and the loss is ₹2,314. Breakeven = 23,464.4.`,
      },
      tip: `Rising Put OI and premium may be hedging, not a bearish bet. Do not assume everyone buying Puts expects a fall.`,
      visual: {
        kind: 'payoff',
        title: 'Long 23,500 PE at expiry (illustrative)',
        caption: 'Loss is limited to the premium; profit grows as Nifty falls below the breakeven.',
        spot: 24000,
        legs: [{ type: 'PE', side: 1, strike: 23500, premium: 35.6 }],
      },
      calc: { id: 'breakeven', preset: { optType: 'PE', side: 'buy', strike: 23500, premium: 35.6 }, why: 'Breakeven of the long 23,500 PE at 35.6.' },
    },
  ],
  tools: [{ id: 'option-pnl', preset: { optType: 'PE', side: 'buy', strike: 23500, premium: 35.6, expiryPrice: 23300, lotSize: 65, lots: 1 }, why: 'Buyer result for the 23,500 PE at any expiry level.' }],
}

export default m
