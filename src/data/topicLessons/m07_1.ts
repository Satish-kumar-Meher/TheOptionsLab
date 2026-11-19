import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '7.1',
  intro:
    `Open Interest (OI) counts the contracts that are still alive: bought and sold, but not yet closed or expired. It is one of the most quoted numbers on an option chain, and also one of the most misread. This module builds the vocabulary (open, closed, outstanding, volume, change in OI) so that the later modules on build-up and unwinding rest on solid ground. Lot size is taken as 65 for NIFTY; check the current NSE contract specification.`,
  introHi:
    `Open Interest (OI) ka matlab hai woh contracts jo abhi bhi zinda hain: kharide aur beche ja chuke hain, lekin abhi tak close ya expire nahi hue. Option chain mein yeh sabse zyada dekha jaane wala number hai, aur sabse zyada galat samjha bhi jaata hai. Is module mein hum words clear karenge: open, closed, outstanding, volume, OI change. NIFTY ka lot 65 maana gaya hai; current NSE contract specification zaroor check karein.`,
  steps: {
    concept:
      `Open Interest is the total number of derivative contracts that have been traded but not yet squared off (closed by an opposite trade) or settled at expiry. Each contract has exactly one buyer and one seller, and it is counted once. OI therefore measures how many positions are still carrying risk in the market, while volume measures how many contracts changed hands during the day.`,
    conceptHi:
      `Open Interest un derivative contracts ki total ginti hai jo trade ho chuke hain lekin abhi tak square off ya expiry par settle nahi hue. Har contract mein ek buyer aur ek seller hota hai, aur contract ek hi baar count hota hai. Matlab OI batata hai kitni positions abhi bhi market mein risk utha rahi hain, jabki volume batata hai din mein kitne contracts haath badle.`,
    mechanism:
      `A trade matches a buyer and a seller on the NSE order book. The clearing corporation, NSCCL, becomes the counterparty to both sides, so each side's position is tracked in its own clearing member's account. OI rises when both sides of a trade are opening new positions, falls when both are closing, and stays unchanged when one side opens while the other closes (the position simply changes hands). Official end-of-day OI is published by the exchange after the close; platforms also show intraday OI refreshed from the exchange feed at intervals that differ by platform.`,
    example: {
      title: 'Three trades, 30 lots of volume, only 10 lots of OI (illustrative)',
      text: `Take the NIFTY 24,100 CE. Trade 1: P buys 10 lots from Q, both opening, so OI = 10 lots. Trade 2: P sells 10 lots to new buyer R. P closes and R opens, so OI stays 10. Trade 3: Q buys 10 lots from new seller S. Q closes and S opens, so OI stays 10. Volume = 10 + 10 + 10 = 30 lots = 30 × 65 = 1,950 units, yet OI is just 10 lots (650 units). The three trades moved risk around; only the first added any.`,
    },
    chart: {
      kind: 'flow',
      title: 'From a trade to Open Interest',
      caption: 'OI is a running total of live positions, not a count of trades.',
      steps: [
        { label: 'Buyer and seller match', note: 'On the NSE order book', tone: 'ice' },
        { label: 'NSCCL novates', note: 'Becomes counterparty to both', tone: 'gold' },
        { label: 'Position tracked', note: 'Long and short, in clearing accounts', tone: 'neutral' },
        { label: 'OI updated', note: 'Up, down or unchanged', tone: 'gold' },
        { label: 'Expiry or square-off', note: 'OI falls as positions end', tone: 'ice' },
      ],
    },
    optionChain:
      `Every strike row on the chain shows OI for its CE and its PE separately, and usually a "Change in OI" beside it. The CE and PE columns are different contracts, so their OIs are never added together as one position. Check the unit your platform uses: some show contracts (lots), others show quantity (lots × 65). A row with OI of 12,000 lots means 7,80,000 units of NIFTY exposure are open at that strike.`,
    psychology:
      `A big OI number feels like "everyone believes in this level". In truth it only says many contracts are open there; it does not say who holds the long or the short side, or why. Traders who treat a large OI figure as proof of support or resistance often act on a story they invented. Treat OI as a map of where positions are, and ask what could make those positions change.`,
    scenarios: {
      bullish:
        `If NIFTY rises through a strike with heavy call OI, those call positions may be closed or rolled, so OI at that strike can fall even though the move has been strong. A falling OI alone does not tell you whether the holders were buyers taking profit or sellers covering losses.`,
      bearish:
        `If NIFTY falls, put OI at lower strikes may rise as new positions are opened, or fall as old ones are closed. Without price, volume and direction data you cannot tell which; the OI number on its own is incomplete.`,
      sideways:
        `In a quiet range, volume can be high from intraday churn while OI barely changes. That pattern simply means contracts are being passed between participants without much new risk being added.`,
    },
    practice: [
      {
        q: `A and B open a new position of 20 lots in a NIFTY option. What is the change in OI and what is it in units (lot 65)?`,
        a: `Both are new, so OI rises by 20 lots. Units = 20 × 65 = 1,300. The contract is counted once, not twice, even though two people are involved.`,
      },
      {
        q: `During a day, 50 lots trade in a strike but OI moves from 8,000 to 8,010 lots. Explain.`,
        a: `Volume is 50 lots, but OI changed only by +10 lots. Most trades were transfers or closings against openings; the net addition of live contracts was just 10 lots.`,
      },
      {
        q: `Volume of a strike is 400 lots. What is the traded quantity in units at lot 65?`,
        a: `Traded quantity = 400 × 65 = 26,000 units. Volume in lots and traded quantity in units are the same activity in different units.`,
      },
      {
        q: `Yesterday OI of the 24,200 CE was 20,000 lots; today it is 26,500 lots. Find change in OI and percentage change.`,
        a: `Change = 26,500 − 20,000 = +6,500 lots. Percentage = 6,500 ÷ 20,000 = 32.5%. It says contracts were added; it does not say whether buyers or sellers drove it.`,
      },
    ],
    assignment:
      `Open today's NIFTY chain for the nearest expiry. For three strikes note CE OI, PE OI, change in OI and volume. Write down the unit used by your platform, convert OI to units (× 65) and, for each strike, state whether volume is larger or smaller than OI and what that suggests about intraday churn.`,
  },
  topics: [
    {
      t: 1,
      def: `Open Interest is the total number of option or futures contracts that are still open: they have been traded, but not yet closed by an opposite trade or settled at expiry. Each contract is counted once, however many trades it passed through.`,
      hi: `Open Interest woh total contracts hain jo abhi open hain: trade ho chuke hain, lekin abhi tak kisi ulte trade se close ya expiry par settle nahi hue. Ek contract ek hi baar count hota hai, chahe woh kitne bhi trades se guzra ho.`,
      how: `OI is kept by the exchange and its clearing corporation, NSCCL, from the positions held by clearing members. A contract is created only when a buyer and a seller both take a new position, and it disappears when both sides close or when it expires. OI is reported separately for every strike, option type (CE/PE) and expiry. It is a stock figure (a balance at a point in time), unlike volume, which is a flow (activity over a period).`,
      eg: {
        title: 'NIFTY 24,100 CE open positions (illustrative)',
        text: `Suppose the 24,100 CE shows OI of 12,000 lots. That is 12,000 × 65 = 7,80,000 units of NIFTY exposure open on that strike. There are 12,000 lots of buyers and exactly 12,000 lots of sellers, because each contract has one of each. The figure says nothing yet about who they are or why they hold.`,
      },
      tip: `OI tells you how many contracts are alive, not who is right. Never read a large OI as proof of a direction.`,
      visual: {
        kind: 'layers',
        title: 'What sits inside one OI number',
        caption: 'Illustrative: 12,000 lots at the 24,100 CE.',
        layers: [
          { label: 'Open contracts: 12,000 lots', note: 'Counted once each', tone: 'gold' },
          { label: 'Long side: 12,000 lots', note: 'Buyers of the option', tone: 'ice' },
          { label: 'Short side: 12,000 lots', note: 'Writers of the option', tone: 'neutral' },
        ],
      },
    },
    {
      t: 2,
      def: `OI is created when a new buyer and a new seller trade with each other and both are opening fresh positions. Neither of them held this contract before the trade.`,
      hi: `OI tab banta hai jab ek naya buyer aur ek naya seller aapas mein trade karte hain aur dono apni nayi position khol rahe hote hain. Trade se pehle dono ke paas yeh contract nahi tha.`,
      how: `When the trade prints, the clearing system checks each side's existing position in that contract. If the buyer's position goes from 0 to long and the seller's from 0 to short, one new contract exists. If the buyer was short, the buy first closes that short; if the seller was long, the sell first closes that long. OI rises only by the part of the trade where both sides are opening. This is why a single trade's size can be larger than its OI effect.`,
      eg: {
        title: 'A fresh position of 10 lots',
        text: `Rahul has no position in the 24,200 CE and buys 10 lots at ₹80. Meera has no position and sells the same 10 lots. OI rises by 10 lots (650 units). The premium paid by Rahul is 80 × 650 = ₹52,000, received by Meera (before charges). From now on both carry risk until they close or expiry arrives.`,
      },
      tip: `Only "new buyer meets new seller" adds OI. Do not assume every buy order increases OI.`,
      visual: {
        kind: 'flow',
        title: 'New buyer + new seller',
        steps: [
          { label: 'Rahul: 0 lots', note: 'No position', tone: 'neutral' },
          { label: 'Buys 10 lots', note: 'Rahul now long 10', tone: 'bull' },
          { label: 'Meera sells 10 lots', note: 'Meera now short 10', tone: 'bear' },
          { label: 'OI + 10 lots', note: 'One new contract set', tone: 'gold' },
        ],
      },
    },
    {
      t: 3,
      def: `Every open contract has exactly one buyer (the long) and one seller (the short, or writer). Total long positions always equal total short positions, so OI is both the sum of all longs and the sum of all shorts.`,
      hi: `Har open contract ka ek buyer (long) aur ek seller (short ya writer) hota hai. Total long positions hamesha total short positions ke barabar hoti hain, isliye OI dono ka sum hai, dono ko mila kar nahi.`,
      how: `There is no such thing as a contract with only a buyer. The exchange's matching engine pairs each buy with a sell, and NSCCL guarantees both sides. This also means OI cannot, by itself, say whether the market is "net long" or "net short": every long is balanced by a short somewhere. What can differ is which kind of participant holds each side (for example retail, proprietary traders, FPIs, hedgers), and that information is not in the OI number.`,
      eg: {
        title: 'Balanced books at one strike (illustrative)',
        text: `The 24,000 PE has OI of 9,000 lots. Longs: 9,000 lots held by hedgers and speculators who bought puts. Shorts: 9,000 lots held by writers. If the total longs were counted as 9,000 and total shorts as 9,000, OI is still 9,000, not 18,000. Counting both sides would double the true figure.`,
      },
      tip: `Never add the buyer and seller sides to get OI. One contract means one buyer and one seller, counted once.`,
      visual: {
        kind: 'compare',
        title: 'Two sides of the same contract',
        left: { head: 'Buyer (long)', tone: 'ice', points: ['Pays premium', 'Right, no obligation', 'Loss limited to premium'] },
        right: { head: 'Seller (short)', tone: 'gold', points: ['Receives premium', 'Obligation if exercised', 'Margin blocked with broker'] },
      },
    },
    {
      t: 4,
      def: `Open contracts are those positions that exist right now: they have not been squared off and have not expired. They are what OI counts.`,
      hi: `Open contracts woh positions hain jo abhi exist karti hain: na square off hui hain, na expire hui hain. Yahi cheez OI count karta hai.`,
      how: `A position stays open overnight in the clearing system, and margin stays blocked for it. The exchange publishes OI at end of day based on those carried-over positions. Intraday positions that are opened and closed the same day never appear in the end-of-day OI. This is one reason heavy intraday trading can show large volume and little OI.`,
      eg: {
        title: 'Open versus intraday-only (illustrative)',
        text: `A trader buys 5 lots of a NIFTY CE at 10:15 and sells them at 14:00. Another buys 5 lots at 14:30 and holds overnight. Volume that day includes both trades. End-of-day OI includes only the second trader's 5 lots (5 × 65 = 325 units), assuming the seller on that trade also carries the position.`,
      },
      tip: `OI is a snapshot of positions carried; it ignores trades that opened and closed within the day.`,
    },
    {
      t: 5,
      def: `A contract is closed when the holder takes an opposite position in the same contract (a long sells, a short buys back) or when it expires. Closing reduces that trader's position, but OI falls only if the other side of the trade is closing too.`,
      hi: `Contract tab close hota hai jab holder usi contract mein ulta trade karta hai (long hai toh sell, short hai toh buy back) ya jab woh expire ho jata hai. Closing se us trader ki position kam hoti hai, lekin OI tabhi girta hai jab trade ki doosri side bhi close kar rahi ho.`,
      how: `Closing is called squaring off. Suppose A is long 10 lots and sells 10 lots. If the buyer of A's lots is a brand-new participant, A's long disappears but a new long appears, so OI is unchanged. If the buyer was a seller closing a short, both positions vanish and OI falls by 10 lots. So the same act of closing can lower OI or leave it unchanged depending on the counterparty.`,
      eg: {
        title: 'Same closing, two different OI results (illustrative)',
        text: `A is long 10 lots of the 24,300 CE and sells them. Case 1: the buyer is B, who was short 10 lots and is covering. Both positions end and OI falls by 10 lots (650 units). Case 2: the buyer is C, a fresh buyer. A's long is replaced by C's long and OI does not change. The screen shows the same sell order in both cases.`,
      },
      tip: `A sell by a long holder does not automatically reduce OI. Look at who bought it.`,
      visual: {
        kind: 'compare',
        title: 'Closing a long: what happens to OI?',
        left: { head: 'Buyer is a short covering', tone: 'gold', points: ['Both positions end', 'OI falls by the quantity', 'Pure closing trade'] },
        right: { head: 'Buyer is brand new', tone: 'ice', points: ['One long replaces another', 'OI unchanged', 'Position only transferred'] },
      },
    },
    {
      t: 6,
      def: `Outstanding contracts is another name for open contracts: all positions that remain unsettled at a point in time. The word "outstanding" stresses that someone still owes or is owed settlement.`,
      hi: `Outstanding contracts matlab bhi open contracts hi hai: woh saari positions jo kisi bhi time par unsettled hain. "Outstanding" word yeh batata hai ki kisi ka settlement abhi baaki hai.`,
      how: `Outstanding positions are settled in one of two ways: closed out earlier through an offsetting trade, or carried to expiry. NIFTY, BANKNIFTY and other index options are European and cash-settled, so at expiry the difference to the final settlement price is paid in cash and OI goes to zero for that expiry. Stock options are physically settled as per current NSE rules (verify before trading), which is why stock OI in the last days before expiry often behaves differently from index OI.`,
      eg: {
        title: 'OI at expiry (illustrative)',
        text: `On a Tuesday expiry, the 24,000 CE may show 15,000 lots outstanding in the morning. Through the day many are closed. After the close, the remaining in-the-money contracts are cash-settled against the settlement price, and OI for that expiry becomes zero. Next day the chain shows the following expiry with its own fresh OI.`,
      },
      tip: `After expiry, that expiry's OI is gone. Do not compare a new expiry's OI with the old one as if it were a continuous series.`,
    },
    {
      t: 7,
      def: `Volume is how many contracts traded during a period; OI is how many contracts are open at a moment. Volume can be large while OI barely moves, and OI can persist for days while volume is low.`,
      hi: `Volume matlab ek period mein kitne contracts trade hue; OI matlab ek moment par kitne contracts open hain. Volume bahut ho sakta hai aur OI zyada nahi hilta, aur OI kai din tak rehta hai jab ki volume kam ho.`,
      how: `Volume increases with every trade, no matter whether it opens, closes or transfers a position. OI changes only through the opening and closing mix. Dividing volume by OI gives a rough sense of churn: a ratio far above 1 means the contracts changed hands many times, as in short-term trading near expiry. Volume tells you where activity is; OI tells you where positions are held; each answers a different question.`,
      eg: {
        title: 'Churn at a strike (illustrative)',
        text: `The 24,100 CE has volume of 60,000 lots and OI of 12,000 lots by the close. Volume ÷ OI = 60,000 ÷ 12,000 = 5. On average each open contract changed hands about five times, which suggests heavy intraday trading rather than fresh long-term positioning. If volume were 6,000 lots (ratio 0.5), most open contracts would not have traded that day at all.`,
      },
      tip: `Use volume for activity and OI for positions. High volume with flat OI is a sign of churn, not necessarily conviction.`,
      visual: {
        kind: 'bars',
        title: 'Volume versus OI at the 24,100 CE',
        unit: ' lots',
        caption: 'Illustrative day. Volume is a flow; OI is a stock.',
        items: [
          { label: 'Volume', value: 60000, tone: 'ice' },
          { label: 'Open interest', value: 12000, tone: 'gold' },
        ],
      },
    },
    {
      t: 8,
      def: `Traded quantity is the number of units (contracts × lot size) that changed hands; volume is often shown in lots. Both describe trading activity, while OI describes open positions. Platforms differ in whether they show lots or units.`,
      hi: `Traded quantity matlab kitne units (contracts × lot size) haath badle; volume aksar lots mein dikhta hai. Dono trading activity batate hain, jabki OI open positions batata hai. Platforms alag-alag hote hain: kuch lots dikhate hain, kuch units.`,
      how: `One NIFTY lot is 65 units (check the current NSE contract specification, since lot sizes are revised). So 100 lots of volume is 6,500 units. If one screen shows volume in lots and another shows OI in units, comparing them directly gives a number 65 times off. Always bring both to the same unit before computing ratios like volume ÷ OI.`,
      eg: {
        title: 'Same activity, two units',
        text: `A strike shows volume of 2,40,000 units and OI of 52,000 lots. Convert volume: 2,40,000 ÷ 65 = 3,692.3 lots (about 3,692). Volume ÷ OI = 3,692 ÷ 52,000 ≈ 0.07, so only about 7% of the open contracts' worth of trading happened. Mixing units would have suggested 240,000 ÷ 52,000 = 4.6, a completely wrong picture.`,
      },
      tip: `Before comparing any two option-chain numbers, check that both are in lots or both in units.`,
      calc: {
        id: 'lot-value',
        preset: { premium: 1, lotSize: 65, lots: 100, spot: 24000, marginPct: 12 },
        why: 'Shows how lots turn into units (lots × 65) so you can match volume and OI units.',
      },
    },
    {
      t: 9,
      def: `Total OI is the sum of OI across all strikes for calls, for puts, or for both within an expiry. It shows how much positioning exists overall, and the ratio of put to call OI is used as the Put-Call Ratio (PCR).`,
      hi: `Total OI matlab saare strikes ka OI jod kar nikala gaya number, calls ka, puts ka ya dono ka, kisi ek expiry mein. Isse pata chalta hai overall kitni positioning hai, aur put OI aur call OI ka ratio PCR kehlata hai.`,
      how: `Platforms add the OI of every listed strike for CE and PE separately and display "Total Call OI" and "Total Put OI". PCR by OI = total put OI ÷ total call OI. A PCR above 1 means more put contracts open than call contracts; it does not say whether puts are mostly bought (hedging) or written (bullish support). Total OI also depends on the expiry chosen: weekly and monthly totals are different pools.`,
      eg: {
        title: 'Total OI on a small strip (illustrative)',
        text: `Calls: 24,000 = 10,000; 24,100 = 15,000; 24,200 = 8,000, so total call OI = 33,000 lots. Puts: 23,900 = 12,000; 23,800 = 9,000; 23,700 = 14,000, so total put OI = 35,000 lots. PCR = 35,000 ÷ 33,000 = 1.06. A real chain has dozens of strikes; this is only a three-strike sample.`,
      },
      tip: `Totals hide the strike-level story. A high PCR does not by itself mean bullish or bearish.`,
      calc: {
        id: 'pcr',
        preset: { putOI: 35000, callOI: 33000, putVol: 0, callVol: 0 },
        why: 'Computes the put-call ratio from the total OI figures in the example.',
      },
    },
    {
      t: 10,
      def: `Change in OI is today's OI minus the previous day's OI for the same contract. A positive change means net contracts were added; a negative change means net contracts were closed.`,
      hi: `Change in OI matlab aaj ka OI minus pichle din ka OI, usi contract ke liye. Positive change ka matlab net contracts add hue; negative ka matlab net contracts close hue.`,
      how: `The exchange compares the end-of-day OI with the previous day's. During the day, platforms estimate the change from the live feed, so the number can move around before settling at the official close. Change in OI shows net addition, not who added: heavy buying and heavy selling can both appear as positive change because the added contracts always have one of each. Read it together with price, volume and, for options, implied volatility.`,
      eg: {
        title: 'OI change at the 24,200 CE (illustrative)',
        text: `Yesterday: 20,000 lots. Today: 26,500 lots. Change in OI = +6,500 lots = 6,500 × 65 = 4,22,500 units. Percentage change = 6,500 ÷ 20,000 = 32.5%. If the premium also rose and volume was high, it may point to fresh buying; if the premium fell, fresh writing becomes more plausible. Either remains an inference, not a fact.`,
      },
      tip: `Positive OI change means contracts were added, never "buyers won" or "sellers won".`,
      calc: {
        id: 'return-calc',
        preset: { start: 20000, end: 26500, years: 1 },
        why: 'The percentage change formula is the same one used for percentage change in OI.',
      },
    },
  ],
}
export default m
