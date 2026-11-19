import type { ModuleLesson } from '../topicLessonTypes'

/* Module 8.2 — Every Option Chain Column.
 * Curriculum has no numbered topics: t1-12 = the twelve table rows (OI, Change in OI, Volume, IV, LTP, Net Change,
 * Bid Price, Ask Price, Bid Quantity, Ask Quantity, Strike, PCR).
 * All numbers are illustrative: NIFTY 24,000, lot 65 (check the current NSE contract specification). One reference row:
 * the 24,100 CE — OI 31,20,000 units (48,000 lots), change +3,25,000, volume 19,50,000, IV 13.8%, LTP 96.40, bid 96.35 x 650, ask 96.45 x 130.
 * Platforms differ on whether OI/volume are shown in lots or in units (contracts x lot size) — confirm before comparing. */
const m: ModuleLesson = {
  moduleId: '8.2',
  intro: `An option chain looks crowded because each strike carries a dozen numbers on each side. Each column answers one narrow question: how many contracts are open, how many were traded, what is the price, what volatility does it imply, and what can I actually buy or sell at right now. This module takes the twelve columns one by one so that you know what each really says, and what it does not.`,
  introHi: `Option chain pehli baar kholo toh numbers ki bheed lagti hai, kyunki har strike par dono side bahut saare columns hote hain. Lekin har column sirf ek chhota sawaal poochta hai: kitne contracts open hain, kitne trade hue, price kya hai, IV kya keh rahi hai, aur abhi asal mein kis rate par buy-sell ho sakta hai. Is module mein hum baarah columns ek-ek karke samjhenge, aur yeh bhi ki woh kya nahi batate.`,
  steps: {
    concept: `The chain is a table with strikes in the middle, call (CE) data on the left and put (PE) data on the right. Every column is one measurement of the same contract. Some measure positions (OI, change in OI), some measure activity (volume), some measure price (LTP, net change, IV) and some measure the live order book (bid, ask and their quantities). No single column is enough: you read them together.`,
    conceptHi: `Chain ke beech mein strike hota hai, left mein CE ka data aur right mein PE ka. Har column usi contract ka ek alag measurement hai. Kuch columns positions batate hain (OI, change in OI), kuch activity (volume), kuch price (LTP, net change, IV) aur kuch live order book (bid, ask aur unki quantity). Akela koi column kaafi nahi hota, hamesha milakar padhna hota hai.`,
    mechanism: `The exchange (NSE) updates the chain from its trading system as orders match. Volume adds up every trade today. Open interest is different: it is a position count that the exchange and clearing corporation (NSCCL) update from the net open contracts, so it only changes when a contract is created or closed, and the "change in OI" column compares it with the previous trading day's close. LTP is the last matched price. Bid and ask come from the live order book, so they change every moment even when no trade happens. Implied volatility is not quoted by anyone; the platform calculates it from the premium using an option pricing model, so different platforms can show slightly different IV.`,
    example: {
      title: 'One strike, every column (illustrative)',
      text: `Take the 24,100 CE with NIFTY at 24,000 (lot 65). OI = 31,20,000 units = 48,000 lots. Change in OI = +3,25,000 units, which is 3,25,000 / 27,95,000 = 11.6% on the previous day's OI of 27,95,000. Volume = 19,50,000 units (30,000 lots), so volume / OI = 0.625: about 62% of the open interest traded again today. LTP = ₹96.40 against yesterday's close of ₹112.15, so net change = -₹15.75 (-14.0%). Bid ₹96.35 for 650 units, ask ₹96.45 for 130 units: spread ₹0.10, which is 0.10% of the price, so a round trip on one lot costs about 0.10 x 65 = ₹6.50 in spread. IV 13.8%.`,
    },
    chart: {
      kind: 'oi',
      title: 'Open interest by strike (illustrative, in lots)',
      caption: 'Call OI (red) sits mostly above spot and put OI (green) mostly below, which is the usual shape. Each bar is only a count of open contracts; it does not say who holds them.',
      rows: [
        { strike: 23600, ce: 12000, pe: 61000 },
        { strike: 23800, ce: 21000, pe: 48000 },
        { strike: 24000, ce: 55000, pe: 52000 },
        { strike: 24200, ce: 68000, pe: 24000 },
        { strike: 24400, ce: 47000, pe: 11000 },
      ],
      spot: 24000,
    },
    optionChain: `On the NSE option chain the central column is the strike. Calls are on the left and puts on the right, usually showing OI, change in OI, volume, IV, LTP, change in price, bid quantity, bid, ask and ask quantity for each side, plus total OI and volume at the bottom. Other platforms reorder or hide some columns and some add Greeks. First check the unit: some screens show OI in lots and some in units (contracts), and comparing across them gives a factor-of-65 error.`,
    psychology: `Beginners usually fixate on the biggest OI number and treat it as a verdict. Experienced traders treat each column as a clue: OI shows where positions are crowded, volume shows where the action is, bid-ask shows what it costs to act. The risk is reading more certainty into the table than the data holds, for example assuming that every contract in OI is a fresh trade by writers.`,
    scenarios: {
      bullish: `NIFTY rises through 24,100. The 24,100 CE LTP jumps and its net change turns positive, volume rises, and the bid-ask may widen briefly as sellers re-price. A drop in call OI near the money while the index rises can reflect covering or exits, but OI alone cannot tell which.`,
      bearish: `NIFTY falls towards 23,900. CE premiums fall and PE premiums rise, put volume climbs, and IV on puts may rise faster than on calls. Rising put OI says contracts were opened, not whether buyers or sellers drove it.`,
      sideways: `NIFTY drifts in a narrow range. LTPs decay, volume dries up, IV tends to ease and OI changes stay small. Spreads usually stay tight at ATM strikes but remain wide in far OTM ones.`,
    },
    practice: [
      {
        q: `The 24,100 CE had OI of 27,95,000 yesterday and 31,20,000 today. What is the change in OI and the percentage change?`,
        a: `Change = 31,20,000 - 27,95,000 = +3,25,000 units. Percentage = 3,25,000 / 27,95,000 = 11.6%. In lots (65 per lot) that is 5,000 lots.`,
      },
      {
        q: `An option has volume 19,50,000 and OI 31,20,000. What is volume / OI and what does it hint at?`,
        a: `19,50,000 / 31,20,000 = 0.625. About 62% of the open positions' size traded today, so activity is high relative to the open base. It hints at heavy trading in the strike, but not at its direction.`,
      },
      {
        q: `A far OTM put quotes bid ₹2.10 and ask ₹2.60. What is the spread as a percentage of the mid price, and the round-trip spread cost for one lot?`,
        a: `Spread = 2.60 - 2.10 = ₹0.50. Mid = 2.35. Spread % = 0.50 / 2.35 = 21.3%. One lot (65 units): 0.50 x 65 = ₹32.50 for a full buy-and-sell round trip if you cross the spread both times.`,
      },
      {
        q: `LTP is ₹96.40 and yesterday's close was ₹112.15. What is the net change and percentage change?`,
        a: `96.40 - 112.15 = -₹15.75. Percentage = -15.75 / 112.15 = -14.0%.`,
      },
    ],
    assignment: `Open a live NIFTY option chain and pick one ATM strike. Write down all twelve columns for its CE, convert OI and volume into lots (divide by 65 if your platform shows units), compute change in OI as a percentage, the spread as a percentage of mid and volume / OI. Then pick one far OTM strike and compare its spread percentage with the ATM one.`,
  },
  topics: [
    {
      t: 1,
      def: `Open Interest (OI) is the total number of option contracts at a strike that are still open and have not been squared off or expired. Every open contract has one buyer and one seller, so OI counts contracts, not people and not money.`,
      hi: `OI ka matlab hai us strike ke kitne contracts abhi bhi open hain, yaani jinhe abhi tak square off nahi kiya gaya. Har contract ke peeche ek buyer aur ek seller hota hai. Isliye OI contracts ki ginti hai, yeh nahi batata ki kaun buyer hai aur kaun seller.`,
      how: `When a new buyer and a new seller trade, OI rises by one contract. When an existing holder and an existing writer both close, OI falls by one. If one new participant takes over from an old one, OI does not change. NSE and the clearing corporation NSCCL compile it from the positions of all clearing members, and it is published for each strike and expiry. High OI shows where positions are crowded and potential levels where many participants may react. It does not say whether the holders there are net buyers or sellers.`,
      eg: {
        title: 'Reading OI of 48,000 lots',
        text: `Illustrative: the 24,000 CE has OI of 55,000 lots and the 24,200 CE has 68,000 lots (lot 65). In units that is 55,000 x 65 = 35,75,000 and 68,000 x 65 = 44,20,000. The 24,200 strike has the higher call OI, so it is the stronger candidate for a potential resistance zone, but nothing says the index must stop there.`,
      },
      tip: `High OI is a potential level, not a guaranteed one. OI alone cannot show who initiated the contracts or whether they are hedges.`,
      visual: {
        kind: 'oi',
        title: 'OI is a count of open contracts per strike',
        caption: 'Illustrative OI in lots. The largest call bar is at 24,200 and the largest put bar at 23,600.',
        rows: [
          { strike: 23600, ce: 12000, pe: 61000 },
          { strike: 23800, ce: 21000, pe: 48000 },
          { strike: 24000, ce: 55000, pe: 52000 },
          { strike: 24200, ce: 68000, pe: 24000 },
          { strike: 24400, ce: 47000, pe: 11000 },
        ],
        spot: 24000,
      },
    },
    {
      t: 2,
      def: `Change in OI is today's open interest minus the previous trading day's closing OI at the same strike. A positive number means contracts were added net; a negative number means contracts were closed net.`,
      hi: `Change in OI aaj ka OI minus pichhle trading day ke close wale OI ka farak hai. Plus ho toh net naye contracts bane, minus ho toh net contracts band hue. Yeh dikhata hai ki us strike par positions badh rahi hain ya kam ho rahi hain.`,
      how: `The column compares two end-of-day position counts, so during the day it is a running estimate and settles after the close. A rising OI with rising volume says new contracts are being opened. A falling OI says existing contracts are being closed or expiring. What it cannot say is which side initiated: a +3,25,000 change could be fresh writing, fresh buying or a mix. To get a hint you must combine it with the premium move, IV and spot, and even then it stays an inference.`,
      eg: {
        title: 'The 24,100 CE adds 5,000 lots',
        text: `Yesterday's OI was 27,95,000 units and today's is 31,20,000, so the change is +3,25,000 units = 5,000 lots (lot 65), or +11.6%. If the same day shows a premium fall from ₹112.15 to ₹96.40 with NIFTY flat, writing is one plausible reading, but a buyer opening a position at a lower price is also possible. Treat it as a hypothesis.`,
      },
      tip: `A big change in OI at a far OTM strike with tiny volume is usually less meaningful than a moderate change at a strike near the money.`,
      visual: {
        kind: 'bars',
        title: 'Change in call OI by strike (illustrative, lots)',
        caption: 'Positive bars: contracts added net. Negative: closed net. Direction of the initiator is not in this data.',
        unit: ' lots',
        items: [
          { label: '23,800 CE', value: -2500, tone: 'neutral' },
          { label: '24,000 CE', value: 4000, tone: 'gold' },
          { label: '24,100 CE', value: 5000, tone: 'gold' },
          { label: '24,200 CE', value: 7500, tone: 'gold' },
          { label: '24,400 CE', value: 1500, tone: 'ice' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 2795000, end: 3120000, years: 1 },
        why: `Gives the percentage change from 27,95,000 to 31,20,000 (11.6%).`,
      },
    },
    {
      t: 3,
      def: `Volume is the number of contracts traded in a strike during the current session so far. It resets every day. Unlike OI, one contract can be traded many times and counted every time.`,
      hi: `Volume yeh batata hai ki aaj us strike mein kitne contracts trade hue. Yeh har din zero se shuru hota hai. Ek hi contract baar-baar trade ho sakta hai aur har baar count hota hai, isliye volume aur OI alag cheezein hain.`,
      how: `Every matched trade at NSE adds its quantity to the strike's volume, whether it opens a new position or closes an old one. So high volume with a small OI change usually means a lot of in-and-out trading (intraday traders), while high volume with a large OI increase means many new positions stayed open. Volume is a measure of activity and liquidity, which is why traders prefer strikes with good volume for entry and exit. Platforms may show it in lots or units.`,
      eg: {
        title: 'Same OI, very different activity',
        text: `Two strikes each have OI of 31,20,000 units. The 24,100 CE traded 19,50,000 units today (volume / OI = 0.625). The 25,000 CE traded 1,30,000 (0.04). The first strike is far more active, so its LTP and spread are more reliable; the second may show a stale last price.`,
      },
      tip: `Compare volume with that strike's own OI and with its neighbours. A strike with large OI and almost no volume today may be showing yesterday's picture.`,
      visual: {
        kind: 'compare',
        title: 'OI versus volume',
        caption: 'They answer different questions and move on different clocks.',
        left: { head: 'Open interest', tone: 'gold', points: ['Contracts still open', 'Rises only when a contract is created', 'Carries over from day to day', 'A position count'] },
        right: { head: 'Volume', tone: 'ice', points: ['Contracts traded today', 'Counts every trade, open or close', 'Resets each session', 'An activity count'] },
      },
    },
    {
      t: 4,
      def: `Implied Volatility (IV) is the volatility the market is pricing into an option, backed out of its premium. It is expressed as an annual percentage, for example 13.8%. It describes the expected size of movement, not its direction.`,
      hi: `IV woh volatility hai jo option ke premium mein market ne price kar rakhi hai. Isse premium se calculate kiya jata hai aur annual percentage mein dikhaya jata hai, jaise 13.8%. IV yeh batati hai ki move kitna bada ho sakta hai, upar ya neeche woh nahi batati.`,
      how: `Nobody quotes IV directly. Platforms take the market premium, spot, strike, time to expiry and interest rate, and solve a pricing model (Black-Scholes type) backwards for the volatility that matches. Higher IV means a higher premium for the same strike and expiry. Different strikes carry different IVs (the smile or skew), and IV tends to rise before big events and fall after them. A rough one-standard-deviation move is spot x IV x square root of (days / 365).`,
      eg: {
        title: 'What 13.8% IV implies',
        text: `Illustrative: NIFTY 24,000, ATM IV 13.8%, 7 days to expiry. One-standard-deviation move = 24,000 x 0.138 x sqrt(7/365) = about 459 points. That is a pricing statement, roughly a 68% range if returns were normal; real markets have fatter tails. It says nothing about whether NIFTY goes to 24,459 or 23,541.`,
      },
      tip: `Compare IV with the same strike's own recent range and with neighbouring strikes. A single IV number means little without that context.`,
      visual: {
        kind: 'curve',
        title: 'IV across strikes: the smile',
        caption: 'OTM puts often carry higher IV than ATM, because of demand for downside protection; shape varies day to day.',
        curve: 'iv-smile',
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 13.8, days: 7 },
        why: `Turns the chain's IV into a one-sigma expected range for the week.`,
      },
    },
    {
      t: 5,
      def: `LTP (Last Traded Price) is the price of the most recent trade in that option. It is the premium in rupees per unit. It may not be the price you can trade at now.`,
      hi: `LTP matlab us option ka last traded price, yaani aakhri baar jis rate par trade hua. Yeh per unit premium hota hai rupees mein. Zaroori nahi ki abhi aap isi price par buy ya sell kar sako.`,
      how: `The exchange updates LTP whenever two orders match. For liquid ATM strikes it is almost always close to the mid of bid and ask. For illiquid strikes LTP can be minutes or hours old and far from the current bid-ask, so decisions based on it can mislead. The premium is the sum of intrinsic value and time value, and one lot costs LTP x lot size (65) before charges. For a buy you pay the ask; for a sell you receive the bid.`,
      eg: {
        title: 'Splitting the LTP of the 24,100 CE',
        text: `Spot 24,000, strike 24,100, LTP ₹96.40. A call is OTM when spot is below the strike, so intrinsic value = max(24,000 - 24,100, 0) = 0 and the whole ₹96.40 is time value. One lot costs 96.40 x 65 = ₹6,266. If this strike's last trade was 20 minutes ago, check the bid-ask before assuming ₹96.40 is available.`,
      },
      tip: `Never place an order from LTP alone. Look at the bid and ask, because that is the price that will actually fill.`,
      calc: {
        id: 'premium-split',
        preset: { optType: 'CE', spot: 24000, strike: 24100, premium: 96.4 },
        why: `Shows that a 24,100 CE at spot 24,000 is 100 percent time value.`,
      },
    },
    {
      t: 6,
      def: `Net Change is the difference between the current LTP and the previous day's closing price of that option, shown in rupees and often as a percentage. It tells you how much the premium has moved since yesterday.`,
      hi: `Net Change aaj ke LTP aur kal ke closing price ka farak hai, rupees mein aur kai jagah percentage mein bhi. Yeh batata hai ki kal se premium kitna badla. Premium sirf index ki wajah se nahi, IV aur time decay se bhi badalta hai.`,
      how: `A premium moves because of three things: the change in spot (delta effect), the change in IV (vega effect) and the passage of time (theta). Net change blends all three, which is why a call can fall even when the index rises slightly if IV drops more. Percentage changes look huge on cheap far OTM options (a move from ₹2 to ₹3 is +50%), so the rupee value and the strike's liquidity matter. Compare the net change of CE and PE at the same strike to see which side the market priced more.`,
      eg: {
        title: 'Premium falls though NIFTY is flat',
        text: `Illustrative: the 24,100 CE closed yesterday at ₹112.15 and trades at ₹96.40 now, a net change of -₹15.75 or -14.0%. NIFTY is unchanged. The fall came from a day of time decay and a small drop in IV, not from any change in direction. One lot of 65 units has lost 15.75 x 65 = ₹1,023.75 in value.`,
      },
      tip: `Do not read a falling premium as bearish or a rising premium as bullish without checking what happened to spot and IV.`,
      visual: {
        kind: 'bars',
        title: 'Net change in premium (illustrative, ₹)',
        caption: 'Same day, same expiry. Calls lost value as NIFTY slipped slightly; puts gained a little.',
        unit: '',
        items: [
          { label: '24,000 CE', value: -22.4, tone: 'bear' },
          { label: '24,100 CE', value: -15.75, tone: 'bear' },
          { label: '24,000 PE', value: 14.1, tone: 'bull' },
          { label: '23,900 PE', value: 9.35, tone: 'bull' },
        ],
      },
    },
    {
      t: 7,
      def: `Bid Price is the highest price at which someone is currently willing to buy the option. If you want to sell right now, the bid is the price you will receive.`,
      hi: `Bid price woh sabse high price hai jis par abhi koi buyer option kharidne ko tayyar hai. Agar aapko turant sell karna hai toh aapko yahi bid price milega.`,
      how: `Bids are resting buy orders in the exchange's order book. The best bid is the top one; lower bids queue behind it in price-time priority (better price first, then earlier order first). A market sell order or an aggressive limit sell matches the best bid first, then walks down. Placing your own buy limit order at the best bid makes you part of the queue and earns the better price, but you may not be filled if the market moves away.`,
      eg: {
        title: 'Selling at the bid',
        text: `Illustrative: the 24,100 CE shows bid ₹96.35. You hold 2 lots (130 units) and need out now. A market sell fills at about ₹96.35 if the bid quantity covers you, giving 96.35 x 130 = ₹12,525.50 gross. If you instead place a sell limit at ₹96.45, you may earn ₹0.10 x 130 = ₹13 more, but only if a buyer comes.`,
      },
      tip: `The bid, not the LTP, is the price a seller actually gets. On thin strikes the bid can sit well below the last trade.`,
      visual: {
        kind: 'orderBook',
        title: 'The best bid sits at the top of the buy queue',
        caption: 'Quantities in units (65 per lot). A sell order fills at 96.35 first, then moves down.',
        bids: [[96.35, 650], [96.3, 390], [96.25, 520]],
        asks: [[96.45, 130], [96.5, 130], [96.6, 260]],
      },
    },
    {
      t: 8,
      def: `Ask Price (also called offer) is the lowest price at which someone is currently willing to sell the option. If you want to buy right now, the ask is the price you will pay.`,
      hi: `Ask price woh sabse kam price hai jis par abhi koi seller option bechne ko tayyar hai. Agar aapko turant buy karna hai toh aapko yahi ask price dena padega. Ask hamesha bid se thoda upar hota hai.`,
      how: `Asks are resting sell orders. The best ask is the lowest. The difference between best ask and best bid is the spread, the price of immediacy. In ATM NIFTY options the spread is often a few paise to a few rupees; in far OTM or illiquid stock options it can be a large share of the premium. The ask is the real cost of a buy, which is why you should compare the cost of buying at the ask and selling at the bid, not only the LTP.`,
      eg: {
        title: 'Buying at the ask',
        text: `Illustrative: bid ₹96.35, ask ₹96.45 on the 24,100 CE. Buying 1 lot at the ask costs 96.45 x 65 = ₹6,269.25. Selling it straight back at the bid returns 96.35 x 65 = ₹6,262.75, so the instant round trip loses ₹6.50 before brokerage and other charges. On a ₹2.10 / ₹2.60 far OTM put, the same round trip would cost 0.50 x 65 = ₹32.50, which is 21% of the mid price.`,
      },
      tip: `Spread cost is paid on every entry and exit. Wide spreads can wipe out small expected edges.`,
      calc: {
        id: 'spread-cost',
        preset: { bid: 96.35, ask: 96.45, qty: 1, lotSize: 65 },
        why: `Computes the round-trip spread cost of one lot of the 24,100 CE (₹6.50).`,
      },
    },
    {
      t: 9,
      def: `Bid Quantity is the number of units (or lots, depending on the platform) waiting to be bought at the best bid price. It shows how much buying interest is available at that price right now.`,
      hi: `Bid quantity batati hai ki best bid price par kitne units kharidne ke liye line mein khade hain. Isse pata chalta hai ki us price par aap kitna sell kar sakte ho bina price neeche gaye. Yeh number second-by-second badalta hai.`,
      how: `If you sell more units than the best bid quantity, the rest executes at the next lower bid prices, and your average price falls. That is slippage, or impact cost. Bid quantity is also fleeting: resting orders can be cancelled or modified at any moment, and large players may split orders or show only part of their size. So it is a snapshot of liquidity, not a promise. It is not the same as OI or volume.`,
      eg: {
        title: 'Selling more than the best bid',
        text: `Illustrative bids: ₹96.35 x 650, ₹96.30 x 390, ₹96.25 x 520. You sell 1,040 units (16 lots, which is 1,040 / 65). First 650 units at 96.35 = ₹62,627.50; next 390 at 96.30 = ₹37,557.00. Total ₹1,00,184.50, so the average is 96.3327, about ₹0.0173 below the best bid. For a small size that is trivial; on a thin strike it can be large.`,
      },
      tip: `A big bid quantity can disappear in a moment. Judge liquidity over time, not from one screenshot.`,
      visual: {
        kind: 'orderBook',
        title: 'Depth behind the best bid',
        caption: 'The sell of 16 lots eats the first two bid levels. Quantities in units.',
        bids: [[96.35, 650], [96.3, 390], [96.25, 520]],
        asks: [[96.45, 130], [96.5, 130], [96.6, 260]],
      },
    },
    {
      t: 10,
      def: `Ask Quantity is the number of units available for sale at the best ask price. If you buy more than that quantity, the extra part fills at higher ask prices.`,
      hi: `Ask quantity batati hai ki best ask price par kitne units bechne ke liye available hain. Agar aap isse zyada kharidte ho, toh baaki quantity agle mehnge ask prices par fill hoti hai, isliye aapka average price upar chala jata hai.`,
      how: `A buy order walks up the ask side: it takes everything at the best ask, then the next price, and so on until it is filled. The average fill price is the quantity-weighted average of those levels. When the ask quantity is small relative to your order, expect an impact cost. Splitting the order into slices or using a limit price can reduce it, at the risk of a partial fill. Compare bid quantity with ask quantity only lightly: a thin ask next to a thick bid is a snapshot, and it can flip quickly.`,
      eg: {
        title: 'Buying 4 lots into a thin ask',
        text: `Asks: ₹96.45 x 130, ₹96.50 x 130, ₹96.60 x 260. You buy 4 lots = 260 units. 130 x 96.45 = ₹12,538.50 and 130 x 96.50 = ₹12,545.00, total ₹25,083.50, so the average is 96.475. Against a mid price of ₹96.40 the impact is ₹0.075 per unit, ₹19.50 on 260 units. Had you bought 6 lots (390 units), the last 130 units would go at ₹96.60.`,
      },
      tip: `Check ask quantity before a large buy. If it is smaller than your order, use limit orders or slices.`,
      calc: {
        id: 'order-book-impact',
        preset: { side: 'buy', qty: 260, refPrice: 96.4, book: '96.45:130;96.5:130;96.6:260' },
        why: `Walks the ask levels to show the average fill of 96.475.`,
      },
    },
    {
      t: 11,
      def: `Strike is the fixed price at which an option can be exercised. It is the row key of the chain: every CE and PE contract of an expiry is listed against its strike.`,
      hi: `Strike woh fixed price hai jis par option exercise ho sakta hai. Option chain mein har row ek strike ka hota hai, jiske left mein CE aur right mein PE ka data hota hai. Spot ke sabse paas wala strike ATM kehlata hai.`,
      how: `NSE lists strikes at fixed intervals; for NIFTY near the money the step is commonly 50 points, and it can be wider further away, so always inspect the actual strike list. Relative to spot, a call is ITM below spot, ATM near spot and OTM above spot, and the reverse for a put. The strikes near the money are usually the most liquid; deep ITM and far OTM strikes are thin. Index options are European and cash-settled, so an ITM option at expiry is settled in cash at the index settlement price.`,
      eg: {
        title: 'Classifying strikes at spot 24,000',
        text: `With NIFTY at 24,000 and step 50: the 23,900 CE is ITM by 100 points (intrinsic 100), the 24,000 CE is ATM, and the 24,100 CE is OTM by 100 points (0.42% above spot, 100 / 24,000). For puts it flips: the 24,100 PE is ITM, the 23,900 PE is OTM.`,
      },
      tip: `ATM changes as spot moves. Re-check which strike is ATM before comparing OI or IV across the chain.`,
      visual: {
        kind: 'ladder',
        title: 'Call strikes around spot 24,000',
        caption: 'Below spot the call is ITM, at spot ATM, above spot OTM.',
        optType: 'CE',
        spot: 24000,
        strikes: [23800, 23900, 24000, 24100, 24200],
      },
      calc: {
        id: 'moneyness',
        preset: { optType: 'CE', spot: 24000, strike: 24100 },
        why: `Confirms that the 24,100 CE is OTM by 100 points.`,
      },
    },
    {
      t: 12,
      def: `PCR (Put-Call Ratio) is put open interest divided by call open interest (the OI version), or put volume divided by call volume (the volume version). It is a single summary of how the chain's puts compare with its calls.`,
      hi: `PCR matlab put ka OI ya volume divide call ke OI ya volume. Yeh poori chain ko ek number mein summarise karta hai. PCR akele koi signal nahi hai, kyunki OI mein buyer aur seller dono hote hain, aur hedging bhi hoti hai.`,
      how: `NSE-style chains and many platforms print a total-OI PCR at the bottom or top. A PCR above 1 means more put OI than call OI. Traders often read very high values as put-heavy and very low as call-heavy, and some read the extremes contrarily, but any such rule is a rough heuristic, not a law. Each contract has a buyer and a seller, so a high PCR could reflect put writers (supportive view) or put buyers (hedging or bearish view). PCR changes with expiry choice, so compare the same expiry across days.`,
      eg: {
        title: 'PCR from the illustrative chain',
        text: `Strip (OI in lots): total call OI = 12,000 + 21,000 + 55,000 + 68,000 + 47,000 = 2,03,000. Total put OI = 61,000 + 48,000 + 52,000 + 24,000 + 11,000 = 1,96,000. PCR = 1,96,000 / 2,03,000 = 0.97, close to balanced. It does not become bullish or bearish only because it is below or above 1.`,
      },
      tip: `Read PCR as context, and watch how it changes over several days rather than treating one reading as a signal.`,
      visual: {
        kind: 'gauge',
        title: 'PCR (OI) reading, illustrative zones',
        caption: 'The zones are common rules of thumb, not official thresholds. The needle shows 0.97.',
        min: 0,
        max: 2,
        value: 0.97,
        zones: [
          { from: 0, to: 0.7, label: 'Call-heavy', tone: 'neutral' },
          { from: 0.7, to: 1.3, label: 'Balanced', tone: 'ice' },
          { from: 1.3, to: 2, label: 'Put-heavy', tone: 'gold' },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 196000, callOI: 203000, putVol: 1400000, callVol: 1500000 },
        why: `Computes the 0.97 OI PCR from the strip's totals.`,
      },
    },
  ],
  tools: [
    { id: 'spread-cost', preset: { bid: 96.35, ask: 96.45, qty: 1, lotSize: 65 }, why: `Quantify the bid-ask cost before any entry.` },
    { id: 'pcr', preset: { putOI: 196000, callOI: 203000, putVol: 1400000, callVol: 1500000 }, why: `Summarise a chain's put and call OI.` },
  ],
}
export default m
