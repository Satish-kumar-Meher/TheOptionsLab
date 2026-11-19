import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '7.2',
  intro:
    `Every trade has a buyer and a seller, and each of them is either opening a new position or closing an old one. That gives exactly four combinations, and only two of them change OI. Once you can classify a trade into these four boxes, the daily "change in OI" number stops being mysterious. Lot size is 65 for NIFTY; verify the current NSE contract specification.`,
  introHi:
    `Har trade mein ek buyer aur ek seller hota hai, aur dono ya toh nayi position khol rahe hote hain ya purani close kar rahe hote hain. Isse sirf chaar combinations bante hain, aur unmein se sirf do OI ko badalte hain. Jab aap kisi bhi trade ko in chaar boxes mein daal sakte ho, toh roz ka "change in OI" number samajh aane lagta hai. NIFTY ka lot 65 hai; current NSE contract specification check karein.`,
  steps: {
    concept:
      `OI changes only according to whether each side of a trade is opening or closing. New buyer with new seller adds OI. Both sides closing reduces OI. When one side opens and the other closes, a position is transferred and OI stays the same. The curriculum's four cases are read here as: (1) both opening, (2) existing long exits to a new buyer, (3) existing short exits to a new seller, (4) both closing.`,
    conceptHi:
      `OI tabhi badalta hai jab trade ki dono sides ka status dekhte hain: open kar rahe hain ya close. Naya buyer aur naya seller mile toh OI badhta hai. Dono close kar rahe hon toh OI ghatta hai. Ek side open kare aur doosri close, toh position sirf transfer hoti hai aur OI same rehta hai. Curriculum ke chaar cases yahan aise padhe gaye hain: (1) dono open, (2) existing long naye buyer ko nikalta hai, (3) existing short naye seller ko nikalta hai, (4) dono close.`,
    mechanism:
      `The clearing system keeps one net position per contract per account. When a trade arrives, it nets against the account's existing position. A buy by an account that is short reduces that short (closing); a buy by an account that is flat or long adds to the long (opening). The same logic applies for sells. The exchange then sums across accounts: OI = total of all long positions (equal to total of all short positions). Only the net effect across the day is published as "change in OI".`,
    example: {
      title: 'A day of trades at the 24,100 CE (illustrative, in lots)',
      text: `Opening 10: Asha buys 10 lots from Bala, both new, OI +10. Transfer 10: Asha sells 10 lots to new buyer Chetan, OI 0. Transfer 10: Bala buys back 10 lots from new seller Divya, OI 0. Closing 10: Chetan sells 10 lots to Divya's counterpart Esha, who was short 10 and is covering, OI −10. Net OI change = +10 + 0 + 0 − 10 = 0. The day's volume was 40 lots (2,600 units), yet the open positions ended where they began.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Four ways a trade can change OI',
      caption: 'Rows: what the buyer is doing. Columns: what the seller is doing.',
      xLabels: ['Seller opens (new short)', 'Seller closes (exits long)'],
      yLabels: ['Buyer opens (new long)', 'Buyer closes (covers short)'],
      cells: [
        { head: 'OI rises', note: 'New buyer + new seller', tone: 'gold' },
        { head: 'OI unchanged', note: 'New buyer takes over a long', tone: 'ice' },
        { head: 'OI unchanged', note: 'New seller takes over a short', tone: 'ice' },
        { head: 'OI falls', note: 'Both positions end', tone: 'neutral' },
      ],
    },
    optionChain:
      `The chain's "Change in OI" column is the net result of every such trade through the day for that strike. A positive number does not say which of the four combinations dominated, and two very different days can produce the same net change. Pair it with volume: large volume with a small OI change suggests many transfers or offsetting open/close trades.`,
    psychology:
      `It is tempting to read a rising OI as "big players are entering" or a falling OI as "big players are running". Both stories ignore that the same OI change can come from very different mixes of trades. Pause before narrating: ask which of the four combinations is more plausible given price and volume, and accept that you cannot be sure.`,
    scenarios: {
      bullish:
        `In a rally, traders who sold calls may buy them back (closing) while fresh buyers enter (opening). If the buyers are new and the closing sellers are existing, OI can stay flat even though the market is lively.`,
      bearish:
        `In a fall, put buyers may open fresh longs from writers who open fresh shorts (OI rises), or holders of earlier puts may sell to new buyers (OI unchanged). The chain cannot tell these apart by OI alone.`,
      sideways:
        `A quiet market near expiry often shows both sides closing as people square off, so OI at that expiry falls while volume stays modest. It reflects position clearing, not a view.`,
    },
    practice: [
      {
        q: `Classify: a trader short 20 lots buys back 20 lots from a trader who is long 20 lots and selling. Effect on OI?`,
        a: `Buyer is closing a short and seller is closing a long, so both close. OI falls by 20 lots (1,300 units at lot 65).`,
      },
      {
        q: `A long holder of 15 lots sells to a buyer who had no position. Effect on OI?`,
        a: `The seller closes a long; the buyer opens a long. One long replaces another, so OI is unchanged.`,
      },
      {
        q: `A day has 40 lots of opening-opening trades, 90 lots of transfers and 25 lots of closing-closing trades. Find the net OI change and the volume.`,
        a: `Net OI change = +40 + 0 − 25 = +15 lots. Volume = 40 + 90 + 25 = 155 lots = 155 × 65 = 10,075 units.`,
      },
      {
        q: `Yesterday OI was 5,000 lots. Today's trades: opening 120 lots, closing 200 lots. What is today's OI?`,
        a: `Change = +120 − 200 = −80 lots. New OI = 5,000 − 80 = 4,920 lots. OI fell although opening trades happened too, because closings were larger.`,
      },
    ],
    assignment:
      `Invent a short list of ten trades at one strike (buyer opening or closing, seller opening or closing, quantity in lots). Classify each into the four cases, compute the OI change after each trade, and compare the total volume with the final OI change. Write one sentence about what the volume-to-OI-change gap tells you.`,
  },
  topics: [
    {
      t: 1,
      def: `When a new buyer and a new seller trade, and neither held the contract before, a fresh contract is created and OI rises by the traded quantity.`,
      hi: `Jab ek naya buyer aur ek naya seller trade karte hain aur dono ke paas pehle yeh contract nahi tha, toh ek fresh contract banta hai aur OI traded quantity jitna badhta hai.`,
      how: `Both accounts go from flat to a non-zero position in opposite directions. The clearing system registers one new long and one new short, and the sum of longs (and of shorts) rises by the quantity. This is the only case in which OI is genuinely added, which is why OI increase is often read as "new participation". It still cannot tell you whether the buyer or the seller was the aggressor who hit the other's price.`,
      eg: {
        title: '20 lots of fresh participation',
        text: `Nitin (flat) buys 20 lots of the NIFTY 24,300 CE at ₹60 from Omkar (flat), who sells. OI rises by 20 lots = 20 × 65 = 1,300 units. Nitin pays 60 × 1,300 = ₹78,000, Omkar receives it (before charges) and must keep margin as a seller. Neither had any prior exposure to that strike.`,
      },
      tip: `OI increases only when both sides are new. Everything else either moves or removes positions.`,
      visual: {
        kind: 'flow',
        title: 'Case 1: both opening',
        steps: [
          { label: 'Buyer flat', note: 'Opens long', tone: 'bull' },
          { label: 'Seller flat', note: 'Opens short', tone: 'bear' },
          { label: 'Trade of 20 lots', note: 'Matched on NSE', tone: 'neutral' },
          { label: 'OI +20 lots', note: 'New contracts exist', tone: 'gold' },
        ],
      },
    },
    {
      t: 2,
      def: `An existing buyer (long holder) exits by selling to a new buyer. One long position replaces another with the same quantity, so OI does not change. The seller side of the contract is untouched.`,
      hi: `Existing buyer (long holder) apni position naye buyer ko bech kar nikalta hai. Ek long ki jagah doosri long aa jaati hai, quantity same, toh OI nahi badalta. Seller wali side wahi rehti hai.`,
      how: `The exiting holder's long is netted to zero while the new buyer's long is created. The short side belonging to the original writer remains outstanding and now faces the new buyer. In effect the contract was transferred. A common example is a trader who bought a call earlier, books profit when premium rises, and sells to someone who now enters. NSCCL's guarantee continues unchanged for the original writer.`,
      eg: {
        title: 'Profit booked, OI unchanged',
        text: `Faiz bought 10 lots of the 24,200 CE at ₹70 and sells them at ₹95 to Gita, who buys fresh. Faiz's gain = (95 − 70) × 650 = ₹16,250 before charges. Writer Hari is still short 10 lots, only now to Gita. OI stays at its earlier level for this strike. Volume rose by 10 lots.`,
      },
      tip: `A long exiting to a new buyer looks like activity on the screen but does not change OI.`,
      visual: {
        kind: 'flow',
        title: 'Case 2: long exits, new buyer enters',
        steps: [
          { label: 'Faiz long 10', note: 'Existing buyer', tone: 'ice' },
          { label: 'Sells to Gita', note: 'Gita was flat', tone: 'neutral' },
          { label: 'Gita long 10', note: 'Hari still short 10', tone: 'ice' },
          { label: 'OI unchanged', note: 'Position transferred', tone: 'gold' },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24200, premium: 70, expiryPrice: 24295, lotSize: 65, lots: 10 },
        why: 'Compare with the example: a premium gain of 25 per unit (95 − 70) gives the same 25 × 650 rupees.',
      },
    },
    {
      t: 3,
      def: `An existing seller (short holder) buys back to close and a new seller takes the other side. One short position replaces another, so OI does not change. The long side of the contract is untouched.`,
      hi: `Existing seller (short holder) buy back karke position close karta hai aur ek naya seller doosri side leta hai. Ek short ki jagah doosra short aa jaata hai, toh OI nahi badalta. Long wali side wahi rehti hai.`,
      how: `The covering writer's short is netted to zero, and the new writer's short is created against the same long holder. Margin that was blocked for the first writer is released and a fresh margin requirement applies to the second. This is common when a writer has earned most of the premium and exits early, or when a writer is stopped out and a different writer sees the higher premium as attractive.`,
      eg: {
        title: 'Writer hands over the short (illustrative)',
        text: `Hari sold 10 lots of the 24,200 CE at ₹70 and buys them back at ₹40 from new writer Ira. Hari's gain = (70 − 40) × 650 = ₹19,500 before charges. Ira is now short 10 lots at ₹40, and long holder Gita's position is unaffected. OI at that strike is unchanged. Ira's risk starts now; Hari's ends.`,
      },
      tip: `A writer closing does not reduce OI if someone else writes the same contract at that moment.`,
      visual: {
        kind: 'flow',
        title: 'Case 3: short exits, new seller enters',
        steps: [
          { label: 'Hari short 10', note: 'Existing seller', tone: 'gold' },
          { label: 'Buys back from Ira', note: 'Ira was flat', tone: 'neutral' },
          { label: 'Ira short 10', note: 'Gita still long 10', tone: 'gold' },
          { label: 'OI unchanged', note: 'Short transferred', tone: 'ice' },
        ],
      },
    },
    {
      t: 4,
      def: `When an existing long sells and an existing short buys back in the same trade, both positions disappear and OI falls by the traded quantity. This is the only case of a pure reduction caused by one trade.`,
      hi: `Jab ek existing long sell karta hai aur ek existing short usi trade mein buy back karta hai, toh dono positions khatam ho jaati hain aur OI traded quantity jitna ghatta hai. Ek trade se pure reduction ka yehi ek case hai.`,
      how: `Longs and shorts shrink by the same amount, so the two totals stay equal but both are smaller. Near expiry this happens a lot, as buyers and writers both square off to avoid settlement or to release margin. Exchange-level OI can also fall at expiry without any trade, simply because contracts are settled and drop out of the open count.`,
      eg: {
        title: 'Both exit (illustrative)',
        text: `Gita is long 10 lots of the 24,200 CE and Ira is short 10. Gita sells at ₹55 to Ira, who buys back. Gita's P&L = (55 − 40) × 650 = ₹9,750 (she had bought at ₹40 from Ira's trade above), and Ira's P&L = (40 − 55) × 650 = −₹9,750. OI falls by 10 lots (650 units). The two sides of one contract now both have zero exposure.`,
      },
      tip: `A falling OI with a premium rise or fall does not say who was happier; the closers could be gaining or losing.`,
      visual: {
        kind: 'flow',
        title: 'Case 4: both closing',
        steps: [
          { label: 'Long 10', note: 'Gita sells', tone: 'ice' },
          { label: 'Short 10', note: 'Ira buys back', tone: 'gold' },
          { label: 'Trade of 10 lots', note: 'Both positions end', tone: 'neutral' },
          { label: 'OI − 10 lots', note: 'Contracts disappear', tone: 'gold' },
        ],
      },
    },
    {
      t: 5,
      def: `OI addition means the total OI rose during the day. It happens when opening-opening trades exceed closing-closing trades. It tells you net contracts were added, not who is bullish or bearish.`,
      hi: `OI addition ka matlab din mein total OI badha. Aisa tab hota hai jab opening-opening trades closing-closing trades se zyada hon. Yeh batata hai net contracts add hue, yeh nahi ki kaun bullish ya bearish hai.`,
      how: `Net OI change = quantity of opening-opening trades − quantity of closing-closing trades. Transfers add nothing. Because both sides of each added contract are counted once, an addition always has a long and a short that are new. To guess what the addition means you need price, premium change and volume. For example, an addition in a call with a rising premium is more consistent with new buying; with a falling premium it is more consistent with new writing. Both remain inferences.`,
      eg: {
        title: 'Net addition from a mixed day',
        text: `At a strike: opening-opening 300 lots, transfers 500 lots, closing-closing 120 lots. Net OI change = 300 − 120 = +180 lots = 180 × 65 = 11,700 units. Volume = 300 + 500 + 120 = 920 lots. Only about 20% of the volume (180 ÷ 920) ended up as net new open contracts.`,
      },
      tip: `An OI addition is a fact; the story you attach to it is a guess until price and volume support it.`,
      visual: {
        kind: 'bars',
        title: 'Where the day’s 920 lots of volume went',
        unit: ' lots',
        items: [
          { label: 'Opening-opening', value: 300, tone: 'gold' },
          { label: 'Transfers', value: 500, tone: 'ice' },
          { label: 'Closing-closing', value: 120, tone: 'neutral' },
        ],
      },
    },
    {
      t: 6,
      def: `OI reduction means total OI fell, because closing-closing trades and expiry settlements were larger than new openings. It tells you positions were exited, not whether buyers or sellers led.`,
      hi: `OI reduction matlab total OI ghata, kyunki closing-closing trades aur expiry settlement naye openings se zyada the. Yeh batata hai positions nikli hain, yeh nahi ki buyers ne lead kiya ya sellers ne.`,
      how: `Common triggers: profit booking, stop-loss hits, margin release before expiry, and positions settled at expiry. A falling OI together with a rising price at a call strike can mean short writers are covering; with a falling price it can mean call buyers are giving up. Either reading is a hypothesis. NSE's published OI is a net figure, so it cannot separate those two groups.`,
      eg: {
        title: 'Net reduction on a mixed day',
        text: `At a strike: opening-opening 150 lots, transfers 400 lots, closing-closing 350 lots. Net change = 150 − 350 = −200 lots = −200 × 65 = −13,000 units. If yesterday's OI was 2,000 lots, today it is 1,800 lots, a fall of 10%.`,
      },
      tip: `Falling OI means contracts were removed. It does not say sellers are bullish or buyers are scared.`,
      calc: {
        id: 'return-calc',
        preset: { start: 2000, end: 1800, years: 1 },
        why: 'The 10% fall in the example is a simple percentage-change calculation.',
      },
    },
    {
      t: 7,
      def: `A contract is transferred when one participant exits and another enters in the same contract and the same side. Total OI does not change, but the people holding it do. Some platforms and brokers also let positions move between accounts.`,
      hi: `Contract transfer tab hota hai jab ek participant nikalta hai aur doosra usi contract mein usi side par aata hai. Total OI nahi badalta, lekin holders badal jaate hain. Kuch platforms aur brokers accounts ke beech position shift bhi allow karte hain.`,
      how: `Transfers happen constantly through normal trading (cases 2 and 3). A separate administrative kind exists: a client may move positions between demat or trading accounts through a broker's process, and a clearing member can reassign trades through the clearing system's rules. These carry procedures and deadlines set by the exchange and clearing corporation, so check them with your broker. For OI analysis the point is simple: transfers inflate volume, not OI, and they hide who ended up holding the position.`,
      eg: {
        title: 'A busy day with zero net OI (illustrative)',
        text: `A strike shows 5,000 lots of volume, yet OI is 8,000 lots at both yesterday's and today's close. Suppose all 5,000 lots were transfers: each long that left was replaced by a new long, each short that left by a new short. The chain shows heavy activity but no net positioning change. Volume ÷ OI = 5,000 ÷ 8,000 = 0.625.`,
      },
      tip: `Heavy volume with unchanged OI usually means positions changed hands. It is not evidence of new conviction.`,
      visual: {
        kind: 'compare',
        title: 'Transfer versus addition',
        left: { head: 'Transfer', tone: 'ice', points: ['One side exits, another enters', 'OI unchanged', 'Volume rises'] },
        right: { head: 'Addition', tone: 'gold', points: ['Both sides are new', 'OI rises', 'Volume rises'] },
      },
    },
  ],
}
export default m
