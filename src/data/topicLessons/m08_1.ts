import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '8.1',
  intro:
    `An option chain is the live menu of every option contract on one underlying for one expiry, laid out strike by strike. Before you can read OI, IV or PCR you must know where each column sits and what the rows mean. This module builds that map. All numbers are illustrative (Nifty about 24,000, India VIX about 14, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `Option chain ek live menu hai jisme ek underlying ke ek expiry ke saare option contracts strike ke hisaab se dikhte hain. OI, IV ya PCR padhne se pehle yeh pata hona chahiye ki kaunsa column kahan hai aur har row ka matlab kya hai. Yeh module wahi map banata hai. Saare numbers illustrative hain (Nifty lagbhag 24,000, India VIX lagbhag 14, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `An option chain lists all the Call (CE) and Put (PE) contracts of one underlying for a chosen expiry, with one row per strike price. Calls sit on one side, Puts on the other and the strike prices run down the middle. Each side shows price, volume, open interest and implied volatility for that contract. It is the single screen where you compare cost, liquidity and positioning across strikes.`,
    conceptHi:
      `Option chain mein ek underlying ke ek expiry ke saare Call (CE) aur Put (PE) contracts hote hain, har strike ki ek row. Ek taraf Calls, doosri taraf Puts aur beech mein strike price. Har side par price, volume, open interest aur implied volatility dikhti hai. Yeh ek screen hai jahan aap alag alag strikes ka cost, liquidity aur positioning compare karte ho.`,
    mechanism:
      `The exchange (NSE) publishes the live data for every listed contract. Your broker or the NSE website arranges it into rows. Pick the underlying (NIFTY, BANKNIFTY, a stock), pick the expiry, and the chain redraws for that expiry only. The row nearest to the current index level is the at-the-money (ATM) strike; calls above it and puts below it are out of the money, and the reverse is in the money. The numbers refresh as trades happen, though some columns such as open interest are updated with a small delay.`,
    example: {
      title: 'Reading one row (illustrative)',
      text: `Nifty spot is 24,038. In the 24,050 row the CE LTP is 190 and the PE LTP is 175. One lot is 65 units, so buying the 24,050 CE costs 190 x 65 = Rs 12,350 and buying the 24,050 PE costs 175 x 65 = Rs 11,375. The same row also tells you how many contracts traded (volume) and how many remain open (OI), which is what makes the chain more than a price list.`,
    },
    chart: {
      kind: 'ladder',
      title: 'Strike ladder for a Call at Nifty 24,038',
      caption: 'Strikes below spot are in the money for a Call, the nearest strike to spot is ATM, and strikes above spot are out of the money. A Put reads the opposite way.',
      optType: 'CE',
      spot: 24038,
      strikes: [23900, 23950, 24000, 24050, 24100, 24150, 24200],
    },
    optionChain:
      `This module is the option chain itself. Practise locating five things on any chain: the underlying and its spot or futures price, the expiry selector, the strike column, the Call block on the left and the Put block on the right. Then find the ATM row first, because every other row is described relative to it.`,
    psychology:
      `A chain full of numbers invites two mistakes. Beginners stare at the biggest number and trade on it; others feel overwhelmed and ignore everything but LTP. Experienced traders read the chain in a fixed order and always remember that each number is a snapshot of what many participants did, not a prediction.`,
    scenarios: {
      bullish:
        `If you expect a rise, you look at the Call side near and slightly above ATM, compare premiums and spreads, and check whether the expiry gives enough time. The chain does not tell you the rise will happen.`,
      bearish:
        `If you expect a fall, you read the Put side the same way. In a falling market, ATM shifts to lower strikes during the day, so re-identify ATM instead of using the morning's row.`,
      sideways:
        `In a quiet market the ATM row barely changes, premiums decay and spreads stay tight. The chain then mainly shows how expensive time is for buyers and how much is on offer for sellers.`,
    },
    practice: [
      {
        q: 'Nifty is at 24,038 and strikes are 50 apart. Which strike is ATM?',
        a: `Candidates are 24,000 (38 points away) and 24,050 (12 points away). 24,050 is nearer, so it is the ATM strike.`,
      },
      {
        q: 'The 24,050 CE trades at 190. What does one lot cost to buy at lot size 65?',
        a: `190 x 65 = Rs 12,350. This is the maximum a buyer can lose on that position, apart from charges.`,
      },
      {
        q: 'A chain shows weekly and monthly expiries. Why does the 24,000 CE cost more in the later expiry?',
        a: `More days to expiry mean more time value. With IV 14% and 6.5% rate, an ATM Call is about Rs 201 with 7 days left and about Rs 451 with 30 days left (illustrative Black-Scholes values).`,
      },
    ],
    assignment:
      `Open the live NIFTY option chain on NSE or your broker. Write down spot, the selected expiry, the ATM strike, and the CE and PE LTP of the ATM row. Then switch to the next expiry and note how the same strike's premiums change.`,
  },
  topics: [
    {
      t: 1,
      def: `An option chain is a table of all option contracts available on one underlying for a given expiry. Each row is a strike price, with Call (CE) data on one side and Put (PE) data on the other. It is how traders see every available contract at once.`,
      hi: `Option chain ek table hai jisme ek underlying ke ek expiry ke saare option contracts dikhte hain. Har row ek strike price hoti hai, ek side Call (CE) aur doosri side Put (PE). Isse aap ek saath saare available contracts dekh sakte ho.`,
      how: `NSE lists a set of strikes for each expiry and disseminates live prices, volumes and open interest for every contract. Brokers and the NSE website group these into one table per underlying and expiry. The chain is not a separate product; it is simply a view over many separate contracts, each of which can be bought or sold on its own.`,
      eg: {
        title: 'One screen, many contracts (illustrative)',
        text: `For NIFTY with a Tuesday expiry, you may see strikes from 23,500 to 24,500 in 50-point steps, which is 21 rows. Each row has a CE and a PE, so that one expiry shows 42 separate contracts on one screen.`,
      },
      tip: `The chain is a view, not a signal. Each row is a separate contract you can trade independently.`,
      visual: {
        kind: 'compare',
        title: 'Layout of an option chain',
        left: { head: 'Call (CE) side', tone: 'gold', points: ['OI, change in OI, volume', 'IV and LTP', 'Bid and ask'] },
        right: { head: 'Put (PE) side', tone: 'ice', points: ['Bid and ask', 'LTP and IV', 'Volume, change in OI, OI'] },
      },
    },
    {
      t: 2,
      def: `Option chains matter because one screen shows what each contract costs, how actively it trades and how many positions are open. That lets you pick a strike by evidence instead of guessing.`,
      hi: `Option chain isliye zaroori hai kyunki ek screen par dikh jaata hai ki har contract ka price kya hai, kitna trade ho raha hai aur kitni positions open hain. Isse strike andaze se nahi, data dekh kar chunte ho.`,
      how: `Before placing a trade you can check premium for cost, bid-ask gap for liquidity, volume for today's activity, OI for accumulated positions and IV for how expensive the option is. Traders also use it to see where large positions sit. None of this proves where the market will go, but it removes avoidable mistakes such as buying an illiquid strike with a wide spread.`,
      eg: {
        title: 'Choosing between two strikes (illustrative)',
        text: `The 24,000 CE has bid 199 and ask 201 with heavy volume. The 24,400 CE has bid 18 and ask 24. The second looks cheap, but its spread of 6 on a price of 21 is about 29% of the premium. At lot 65, crossing that spread costs about 6 x 65 = Rs 390 before the trade has moved at all.`,
      },
      tip: `Check liquidity (bid, ask, volume) before you check price. A cheap but illiquid option can cost more to trade than it looks.`,
      visual: {
        kind: 'flow',
        title: 'What one chain row lets you check',
        steps: [
          { label: 'Premium', note: 'what it costs', tone: 'gold' },
          { label: 'Bid-ask', note: 'how easy to trade', tone: 'ice' },
          { label: 'Volume', note: 'today\'s activity', tone: 'ice' },
          { label: 'OI', note: 'open positions', tone: 'neutral' },
          { label: 'IV', note: 'how rich it is', tone: 'gold' },
        ],
      },
      calc: { id: 'spread-cost', preset: { bid: 18, ask: 24, qty: 1, lotSize: 65 }, why: 'Turns the bid-ask gap of the cheap strike into rupees per lot.' },
    },
    {
      t: 3,
      def: `The CE columns describe Call options and the PE columns describe Put options. A Call gains when the underlying rises; a Put gains when it falls. The two blocks mirror each other around the strike column.`,
      hi: `CE columns Call options ke hain aur PE columns Put options ke. Call tab faayda deta hai jab underlying upar jaye, Put tab jab neeche jaye. Dono blocks strike column ke dono taraf mirror image mein hote hain.`,
      how: `In the common NSE layout the Call block is on the left and the Put block on the right, so OI and volume are on the outer edges and bid-ask is next to the strikes. The same names repeat on both sides, so always confirm which side you are reading before acting. A CE number says nothing about the Put in the same row, because they are different contracts.`,
      eg: {
        title: 'Same strike, two contracts (illustrative)',
        text: `At the 24,000 strike with Nifty at 24,000, the CE might show OI 1,10,000 lots and the PE OI 95,000 lots. Those are two separate sets of open positions. The CE number counts Calls held open and the PE number counts Puts held open.`,
      },
      tip: `Misreading a CE column as a PE column is a classic beginner error. Say the side out loud before you read the number.`,
      visual: {
        kind: 'compare',
        title: 'CE versus PE at a glance',
        left: { head: 'CE (Call)', tone: 'bull', points: ['Right to buy at the strike', 'Gains if price rises', 'ITM when strike is below spot'] },
        right: { head: 'PE (Put)', tone: 'bear', points: ['Right to sell at the strike', 'Gains if price falls', 'ITM when strike is above spot'] },
      },
    },
    {
      t: 4,
      def: `The strike price column is the middle column. It is the fixed price at which the option holder can buy (Call) or sell (Put) the underlying. Moving down the column goes to higher strikes.`,
      hi: `Strike price column beech ka column hota hai. Yeh woh fixed price hai jis par option holder underlying ko buy (Call) ya sell (Put) kar sakta hai. Neeche jaate jao toh strike badhta jata hai.`,
      how: `Strikes are set by the exchange at fixed intervals, for example 50 points for NIFTY near the money, and the gaps can differ further from spot, so always check the actual strike list. A Call is in the money when its strike is below spot; a Put is in the money when its strike is above spot. The strike also drives the premium: the further out of the money, the lower the chance of finishing in the money and the cheaper the option.`,
      eg: {
        title: 'Moneyness at spot 24,038 (illustrative)',
        text: `The 23,950 CE is ITM by 24,038 - 23,950 = 88 points. The 24,050 CE is OTM by 12 points. The 23,950 PE is OTM by 88 points and the 24,150 PE is ITM by 112 points. The same strike can be ITM for one side and OTM for the other.`,
      },
      tip: `Strike is only a fixed price. Whether it helps you depends on where spot is relative to it.`,
      visual: {
        kind: 'ladder',
        title: 'Put ladder at Nifty 24,038',
        optType: 'PE',
        spot: 24038,
        strikes: [23900, 23950, 24000, 24050, 24100, 24150],
      },
      calc: { id: 'moneyness', preset: { optType: 'CE', spot: 24038, strike: 23950 }, why: 'Shows ITM/OTM and the percentage distance for any strike.' },
    },
    {
      t: 5,
      def: `Expiry selection means choosing which expiry date's contracts to display and trade. Near expiries are cheaper but lose value quickly; far expiries cost more but give time for the view to work.`,
      hi: `Expiry selection ka matlab hai ki kaunsi expiry date ke contracts dikhane aur trade karne hain. Paas wali expiry sasti hoti hai par time value tezi se khatam hoti hai; door wali mehngi hoti hai par view ko time milta hai.`,
      how: `NSE index options have weekly and monthly expiries, and NSE index derivative expiries are scheduled on Tuesday (if it is a holiday, the previous trading day). Premium has two parts, intrinsic value and time value. With more days left, time value is larger. Theta, the daily loss of time value, is faster as expiry approaches for ATM options. Pick the expiry by how long you expect your view to need, not by the cheapest price.`,
      eg: {
        title: 'Same strike, two expiries (illustrative)',
        text: `With Nifty 24,000, IV 14% and rate 6.5%, a 24,000 CE is worth about Rs 201 with 7 days left and about Rs 451 with 30 days left. Per lot of 65 that is Rs 13,055 versus Rs 29,287. The 7-day option is cheaper but needs a faster move because its time value drops by about Rs 15 a day.`,
      },
      tip: `Cheaper expiry is not cheaper risk. If your view needs a week and you buy a 2-day option, time can run out before the move arrives.`,
      visual: {
        kind: 'bars',
        title: 'ATM Call premium by days to expiry (illustrative)',
        caption: 'Black-Scholes with Nifty 24,000, IV 14%, rate 6.5%.',
        unit: ' Rs',
        items: [
          { label: '7 days', value: 201, tone: 'ice' },
          { label: '30 days', value: 451, tone: 'gold' },
        ],
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Change days to 30 and watch premium and theta change.' },
    },
    {
      t: 6,
      def: `The ATM strike is the strike closest to the current price of the underlying. It is the reference row of the chain, and the Call and Put there are usually the most actively traded.`,
      hi: `ATM strike woh strike hai jo underlying ke current price ke sabse paas ho. Yeh chain ki reference row hoti hai, aur yahan ke Call aur Put aam taur par sabse zyada trade hote hain.`,
      how: `Take the spot (or, for some platforms, the futures price) and pick the strike with the smallest absolute difference. Because spot moves, the ATM strike changes during the day. At ATM, the option's premium is almost all time value, and its delta is close to 0.5. The sum of the ATM Call and Put premiums is the ATM straddle, a market estimate of the expected move.`,
      eg: {
        title: 'Finding ATM and the straddle (illustrative)',
        text: `Spot 24,038: the 24,050 strike is 12 points away and 24,000 is 38 points away, so ATM is 24,050. If the 24,050 CE is 190 and the PE is 175, the straddle is 365 points. That is about 1.5% of spot (365 / 24,038 = 1.52%) and approximates the market's expected move to expiry.`,
      },
      tip: `Recheck ATM whenever spot moves by more than half a strike gap. A stale ATM row misleads every comparison.`,
      visual: {
        kind: 'ladder',
        title: 'ATM is the nearest strike to spot',
        optType: 'CE',
        spot: 24038,
        strikes: [24000, 24050, 24100],
      },
      calc: { id: 'straddle-move', preset: { spot: 24038, cePrice: 190, pePrice: 175, strike: 24050 }, why: 'Converts the ATM CE + PE price into an implied move and breakevens.' },
    },
    {
      t: 7,
      def: `Understanding the entire chain means reading it in an order instead of jumping to one number. Start with spot and expiry, find ATM, then look at liquidity, OI, change in OI, volume and IV on both sides.`,
      hi: `Poori chain samajhne ka matlab hai ek order mein padhna, sirf ek number par kood na. Pehle spot aur expiry, phir ATM, phir dono taraf liquidity, OI, change in OI, volume aur IV dekho.`,
      how: `A workable order: 1) confirm underlying and expiry; 2) mark ATM; 3) check bid-ask on the strikes you care about; 4) scan OI to see where positions are concentrated; 5) look at change in OI for what is new today; 6) compare IV across strikes; 7) only then decide. Large OI shows where many contracts are open, but OI does not show who initiated them, so it marks possible levels, not guaranteed support or resistance.`,
      eg: {
        title: 'A first pass over a chain (illustrative)',
        text: `Spot 24,038, expiry Tuesday. Call OI is highest at 24,500 (about 42 lakh units) and Put OI is highest at 23,800 (about 36 lakh units). That suggests a range of 23,800 to 24,500 where positioning is thickest, about 238 points below and 462 points above spot. It is a map of where positions sit, not a forecast.`,
      },
      tip: `Always finish by asking what the chain cannot tell you, such as who opened the positions and what they plan to do next.`,
      visual: {
        kind: 'oi',
        title: 'OI by strike (illustrative, lakh units)',
        spot: 24038,
        rows: [
          { strike: 23800, ce: 8, pe: 36 },
          { strike: 24000, ce: 22, pe: 28 },
          { strike: 24200, ce: 30, pe: 14 },
          { strike: 24500, ce: 42, pe: 6 },
        ],
      },
    },
    {
      t: 8,
      def: `Reading multiple expiries means comparing the same strikes across the weekly and monthly expiries. Differences in premium, OI and IV show how the market treats the near term versus the later term.`,
      hi: `Multiple expiries padhne ka matlab hai weekly aur monthly expiry mein same strikes ko compare karna. Premium, OI aur IV ka fark dikhata hai ki market near term aur door ke term ko kaise dekh raha hai.`,
      how: `The nearest expiry usually has the most volume and the fastest time decay. Later expiries hold more OI from longer-term positions and hedges and have higher premiums. If IV in the near expiry is much higher than in the later one, the market is pricing an event or short-term stress. If it is lower, the market is calm now but cautious about later. OI in a near expiry is wiped out at expiry, so compare it with a later expiry to see which positions persist.`,
      eg: {
        title: 'IV across expiries (illustrative)',
        text: `The 24,000 CE shows IV 15.5% for this week, 14.2% for the next week and 13.6% for the monthly expiry. The higher near-term IV hints that traders are paying up for an event this week, such as a policy announcement. After the event passes, that extra premium can fall even if Nifty does not move.`,
      },
      tip: `Compare like with like: the same strike and the same side across expiries. Never compare OI of the current week with the monthly OI as if they were one number.`,
      visual: {
        kind: 'bars',
        title: 'ATM IV by expiry (illustrative)',
        unit: '%',
        items: [
          { label: 'This week', value: 15.5, tone: 'gold' },
          { label: 'Next week', value: 14.2, tone: 'ice' },
          { label: 'Monthly', value: 13.6, tone: 'ice' },
        ],
      },
    },
  ],
  tools: [{ id: 'expected-move', preset: { spot: 24000, vix: 14, days: 7 }, why: 'Compare the ATM straddle on your chain with the VIX-based 7-day move (about 465 points).' }],
}
export default m
