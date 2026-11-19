import type { ModuleLesson } from '../topicLessonTypes'

/* Module 15.2 — Position Exit Identification.
 * All OI and premium figures are constructed for teaching (illustrative). NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification).
 * OI units differ by platform (contracts or quantity): check yours. */
const m: ModuleLesson = {
  moduleId: '15.2',
  intro: `Open interest falls when traders close positions. This module teaches how to separate the different kinds of exit (unwinding, short covering, long liquidation and profit booking) by reading OI together with the premium and the index. The reading is a probability, not a proof, because the data does not name who closed the contract.`,
  introHi: `Jab traders position close karte hain, tab open interest girta hai. Is module mein OI, premium aur index ko saath padhkar alag-alag exits ko pehchanna sikhaya gaya hai: unwinding, short covering, long liquidation aur profit booking. Yeh ek probability hai, proof nahi, kyunki data yeh nahi batata ki contract kisne close kiya.`,
  steps: {
    concept: `An exit reduces open interest only when both sides close their contract, or when one closes while the other is replaced by no one. So a fall in OI says that contracts disappeared, not who left. The premium direction gives the clue: a premium that rises while OI falls suggests sellers buying back (short covering); a premium that falls while OI falls suggests buyers selling (long liquidation) or writers booking profit on an already decayed option.`,
    conceptHi: `Exit se OI tabhi ghatta hai jab contract ke dono side band ho jaate hain. Isliye OI ka girna sirf yeh batata hai ki contracts khatam hue, yeh nahi ki kaun gaya. Premium ki direction clue deti hai: OI girta hai aur premium badhta hai toh writers ke buy back karne ka shak hota hai (short covering); OI aur premium dono girte hain toh buyers ke bechne ka ya writers ke profit book karne ka shak hota hai.`,
    mechanism: `Short covering: a writer buys back the option, demand for the option rises, the premium goes up, OI goes down. Long liquidation: a buyer sells the option, supply rises, the premium goes down, OI goes down. Profit booking by buyers happens after a premium rise; profit booking by writers happens after a premium fall, when most of the decay has been earned. Expiry also removes OI: contracts settle and disappear, so compare OI on the same expiry only. Data arrives in snapshots, so a fall seen at one time may be partly reversed minutes later.`,
    example: {
      title: 'Call short covering at 24,200 (illustrative)',
      text: `NIFTY rises from 24,100 to 24,190 in an hour. The 24,200 CE OI falls from 14.0 lakh to 11.2 lakh (−20%) while LTP rises from ₹45 to ₹63 (+40%). OI down with premium up is consistent with call writers buying back. A writer who sold at ₹45 and covers at ₹63 loses 18 × 65 = ₹1,170 per lot. If NIFTY then rises beyond 24,200 and OI keeps falling, the covering may feed the rally; if NIFTY falls back and OI is rebuilt, it was a pause.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Exit types on a call strike',
      caption: 'OI is falling in all four cells; the premium and the index decide the label. Heuristic only.',
      xLabels: ['Premium rises', 'Premium falls'],
      yLabels: ['Index rising', 'Index flat or falling'],
      cells: [
        { head: 'Call short covering', note: 'Writers buy back as the index rises', tone: 'bull' },
        { head: 'Buyer profit booking', note: 'Buyers sell after a rise', tone: 'gold' },
        { head: 'Rare: check data', note: 'Premium up with no index support; maybe an IV spike', tone: 'neutral' },
        { head: 'Writer profit booking or long liquidation', note: 'Decayed premium bought back, or buyers exit', tone: 'ice' },
      ],
    },
    optionChain: `On the chain, a negative Change in OI together with the LTP change tells the exit story. Do not look at the largest OI strike only; compare the exit at neighbouring strikes and at the ATM. Keep the same expiry on screen, and remember that near expiry OI can fall naturally as positions are closed to avoid delivery or settlement, so a fall on expiry day is a weaker signal.`,
    psychology: `Exits often come in clusters because traders feel the same pressure at the same level. Writers hurry to cover when a level breaks and losses mount; buyers hurry to sell once a target is reached. A fast fall in OI can therefore be a stress signal (writers escaping) or a relief signal (buyers taking profit). Pressure rises when the stop is near, so exits at round numbers and previous highs are frequent.`,
    scenarios: {
      bullish: `Index rising, call OI falling and call premium rising: covering by call writers may add fuel. If put OI also starts to rise below, the move has new support; if not, the rally may be mostly covering and may fade.`,
      bearish: `Index falling, put OI falling and put premium rising: put writers covering at a broken support. The fall may extend if the covering continues, but a quick bounce with OI rebuilt can show it was a shake-out.`,
      sideways: `OI falls at both calls and puts near the ATM with premiums falling: writers booking profits on decayed options and buyers leaving a dull market. It does not say that a breakout will follow.`,
    },
    practice: [
      {
        q: `The 24,200 CE OI moves from 14.0 lakh to 11.9 lakh and LTP from ₹36 to ₹32 while the index is flat. Compute both percentage changes and name the likely exit type.`,
        a: `OI change = −2.1 / 14.0 = −15%. LTP change = −4 / 36 = −11.1%. OI and premium both fall with a flat index: unwinding by buyers (long liquidation) or by writers booking profit on decayed premium. The data cannot say which.`,
      },
      {
        q: `A writer sold the 23,900 PE at ₹38 and buys it back at ₹55 as NIFTY falls. What is the P&L for one lot of 65?`,
        a: `(38 − 55) × 65 = −₹1,105. The loss comes from the premium rising by 17 points.`,
      },
      {
        q: `A buyer purchases at ₹40 and sells at ₹58. Another writer sold at ₹60 and buys back at ₹18. Compute both profits for one lot.`,
        a: `Buyer: (58 − 40) × 65 = ₹1,170. Writer: (60 − 18) × 65 = ₹2,730. Both exits reduce OI but one happened after a premium rise and the other after a premium fall.`,
      },
      {
        q: `A strike's OI falls from 20 lakh to 14 lakh within 15 minutes. What percent is that, and name two non-directional explanations.`,
        a: `Fall = 6 / 20 = 30%. Possible explanations: a position transfer (OI is rising at a nearby strike) or a data or expiry effect. A large trader closing a spread could also do it.`,
      },
    ],
    assignment: `Over a trading session take OI and LTP snapshots for the two strikes with the largest OI on each side at four times of day. Whenever OI falls, label the exit type with your reasoning, then check what the index did in the next thirty minutes. Count how often the label looked right and write where it failed.`,
  },
  topics: [
    {
      t: 1,
      def: `CE unwinding means call contracts are being closed, so call open interest falls at a strike. It says that positions are leaving, not who is leaving. The index and premium tell you whether writers or buyers are more likely to be exiting.`,
      hi: `CE unwinding matlab call contracts band ho rahe hain, yaani us strike par call OI gir raha hai. Yeh batata hai ki positions nikal rahi hain, yeh nahi ki kaun nikal raha hai. Index aur premium se andaza lagta hai ki writers nikal rahe hain ya buyers.`,
      how: `When a call position is closed, OI falls by one for each contract that disappears. If the premium falls too, the likely exits are buyers selling or writers booking profit; if it rises, writers buying back. Unwinding at a resistance strike is sometimes read as a weakening ceiling, but it can also be the usual end-of-day tidying. Check whether the drop continues over two or three snapshots.`,
      eg: {
        title: '24,200 CE unwinding (illustrative)',
        text: `OI falls from 14.0 lakh to 11.9 lakh, a fall of 2.1 lakh or 15%. LTP slips from ₹36 to ₹32 (−11.1%) with NIFTY flat at 24,050. The pair suggests mild unwinding by buyers or writers, with no sign of stress. Watching the next two snapshots tells whether it continues.`,
      },
      tip: `Falling call OI is a weakening ceiling only if the index also moves up through the strike and the fall persists.`,
      visual: { kind: 'candles', title: 'Index pressing a level as call OI unwinds', pattern: 'breakout', level: { price: 24200, label: 'Call OI strike 24,200' } },
      calc: { id: 'oi-buildup', preset: { priceChangePct: -11, oiChangePct: -15 }, why: 'Classifies a fall in price and OI (a futures rule used as a heuristic).' },
    },
    {
      t: 2,
      def: `PE unwinding means put contracts are being closed and put open interest falls at a strike. It may come from buyers selling the puts or writers buying them back. The premium direction helps to separate the two.`,
      hi: `PE unwinding matlab put contracts band ho rahe hain aur us strike par put OI gir raha hai. Yeh buyers ke bechne se ya writers ke buy back se ho sakta hai. Premium ki direction se dono mein farq samajhne mein madad milti hai.`,
      how: `In a rising market put premiums fall, so a fall in both put OI and put premium usually points to writers booking profit or buyers abandoning hedges. In a falling market, a put OI fall with a rising premium points to put writers covering a broken level. A decline in put OI at a supposed support level means the support is being used or dropped; it does not tell you the next move by itself.`,
      eg: {
        title: '23,900 PE unwinding (illustrative)',
        text: `OI falls from 10.0 lakh to 8.0 lakh (−20%) and LTP from ₹50 to ₹41 (−18%) while NIFTY gains 40 points. This looks like put writers booking profit or put buyers leaving after the index rose. If the index later falls into 23,900 and OI rebuilds, new writers have taken the place of the old ones.`,
      },
      tip: `Support is not a wall: a fall in put OI at a strike tells you traders left, and then you ask why.`,
      visual: {
        kind: 'oi',
        title: 'Put OI thinning at 23,900 (illustrative lakh)',
        spot: 24040,
        rows: [
          { strike: 23800, ce: 2, pe: 9 },
          { strike: 23900, ce: 3, pe: 8 },
          { strike: 24000, ce: 9, pe: 11 },
          { strike: 24100, ce: 11, pe: 4 },
        ],
      },
    },
    {
      t: 3,
      def: `CE short covering is when call writers buy back the calls they sold, usually because the index is rising and they want to cut a loss. Call OI falls while the call premium rises. It can add buying pressure, which is why it is watched during rallies.`,
      hi: `CE short covering tab hoti hai jab call writers apne bechi hui calls wapas khareedte hain, aksar isliye ki index upar ja raha hai aur woh loss cut karna chahte hain. Call OI girta hai aur call premium badhta hai. Isse buying pressure aa sakta hai, isliye rally mein ise dekha jata hai.`,
      how: `A call writer loses when the index climbs. To stop the loss, they buy the call back. The buying lifts the premium and removes an open contract. If many writers cover at the same level, the buying can briefly accelerate the move. Writers who hedge with futures may unwind the hedge at the same time. Large covering usually occurs near a level that writers thought would hold, such as the highest call-OI strike.`,
      eg: {
        title: 'Writers cover as NIFTY nears 24,200 (illustrative)',
        text: `NIFTY goes from 24,100 to 24,190. The 24,200 CE OI falls from 14.0 lakh to 11.2 lakh (−20%) while LTP rises from ₹45 to ₹63 (+40%). A writer who sold at ₹45 and buys at ₹63 loses 18 × 65 = ₹1,170 per lot. If the index crosses 24,200 and OI continues to fall, the covering may feed more buying; if the index reverses, the premium falls again.`,
      },
      tip: `Short covering can fuel a rally for a while, but it ends when the covering ends: check whether new put writing arrives below.`,
      visual: {
        kind: 'flow',
        title: 'The chain of call short covering',
        steps: [
          { label: 'Index rises', note: 'Short calls lose', tone: 'bull' },
          { label: 'Writers buy back', note: 'Demand for calls', tone: 'gold' },
          { label: 'Premium up, OI down', note: 'Visible on the chain', tone: 'ice' },
          { label: 'Extra buying pressure', note: 'May briefly add to the rise', tone: 'bull' },
        ],
      },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.4, oiChangePct: -20 }, why: 'Price up, OI down: short covering pattern.' },
    },
    {
      t: 4,
      def: `PE short covering is when put writers buy back puts they had sold, normally because the index is falling through the strike. Put OI falls and the put premium rises. The covering is a rush to cut a loss, so it can briefly add selling pressure.`,
      hi: `PE short covering tab hoti hai jab put writers apne bechi hui puts wapas khareedte hain, aksar isliye ki index strike ke neeche gir raha hai. Put OI girta hai aur put premium badhta hai. Yeh loss cut karne ki jaldi hoti hai, isliye thodi der ke liye selling pressure aa sakta hai.`,
      how: `A put writer loses when the index falls. They buy back the put to limit the loss, which lifts the put premium and reduces open contracts. Some writers hedge the put by shorting futures, so closing the put can come with covering the futures hedge. The pattern is easiest to read when the index breaks a level with large put OI. It is not a fall forecast: after the covering ends, the market can bounce.`,
      eg: {
        title: 'Put writers cover at 23,900 (illustrative)',
        text: `NIFTY falls from 24,000 to 23,920. The 23,900 PE OI falls from 10.0 lakh to 8.0 lakh (−20%) and LTP rises from ₹38 to ₹55 (+44.7%). A writer who sold at ₹38 and buys back at ₹55 loses 17 × 65 = ₹1,105 per lot. A move below 23,900 with continued OI decline would hint at more covering.`,
      },
      tip: `A put OI fall during a decline means the old support-holders have left; see whether new ones appear lower before calling it a bounce zone.`,
      visual: { kind: 'candles', title: 'Breakdown through a put-OI level', pattern: 'breakdown', level: { price: 23900, label: 'Put OI strike 23,900' } },
    },
    {
      t: 5,
      def: `Long liquidation is when option buyers sell the options they hold, so OI and the premium both fall. The buyers may be taking losses or the market view has changed. It is the mirror of fresh buying.`,
      hi: `Long liquidation tab hoti hai jab option buyers apne options bechte hain, isse OI aur premium dono girte hain. Buyers loss le rahe ho sakte hain ya unka view badal gaya ho sakta hai. Yeh fresh buying ka ulta hai.`,
      how: `When buyers sell, supply of options rises, the premium falls and OI declines because their long contracts end (provided the other side is also closing). Typical reasons are a stop-loss, a target, a time-based exit or a change of mind after news. The pattern is common after an IV drop or when the expected move does not come. Do not assume it is bearish for calls; it only says buyers left.`,
      eg: {
        title: 'Call buyers leave (illustrative)',
        text: `The 24,300 CE OI falls from 9.0 lakh to 7.2 lakh (−20%) and LTP from ₹70 to ₹52 (−25.7%) as NIFTY stalls. A buyer who bought at ₹70 and sells at ₹52 loses 18 × 65 = ₹1,170 per lot. The fall in both suggests long liquidation, not writer covering.`,
      },
      tip: `Falling OI with falling premium describes buyers leaving, not the index falling next.`,
      visual: {
        kind: 'compare',
        title: 'Short covering vs long liquidation (call strike)',
        left: { head: 'Short covering', tone: 'bull', points: ['OI falls', 'Premium rises', 'Writers buy back', 'Adds buying pressure'] },
        right: { head: 'Long liquidation', tone: 'bear', points: ['OI falls', 'Premium falls', 'Buyers sell', 'Adds selling in options'] },
      },
      calc: { id: 'oi-buildup', preset: { priceChangePct: -25, oiChangePct: -20 }, why: 'Price down, OI down pattern.' },
    },
    {
      t: 6,
      def: `Profit booking by option buyers is selling an option after its premium has risen, to keep the gain. OI falls and the premium dips from its high. It is normal after any strong move.`,
      hi: `Option buyers ka profit booking matlab premium badhne ke baad option bech kar gain rakh lena. OI girta hai aur premium apne high se neeche aata hai. Kisi bhi strong move ke baad yeh normal hai.`,
      how: `Buyers often exit at a target or when the move slows. After a strong rise, a premium dip with falling OI shows profit booking, not necessarily a reversal. A reversal also needs the index and other strikes to confirm. Because buyers face theta, they often exit faster than writers. Expect profit booking at round numbers and just after sharp morning moves.`,
      eg: {
        title: 'Buyers book at ₹58 (illustrative)',
        text: `A buyer bought a 24,300 CE at ₹40 and sells at ₹58: (58 − 40) × 65 = ₹1,170 per lot. Many such exits reduce OI from 8.0 lakh to 6.8 lakh (−15%) and the premium eases from a high of ₹58 to ₹50. The index has paused near 24,180. A fresh push needs new buyers or writer covering.`,
      },
      tip: `A premium dip with falling OI after a rally is often profit booking; wait for the index to break the last swing low before reading it as a reversal.`,
      visual: { kind: 'candles', title: 'Strong move, then a pause', pattern: 'uptrend' },
    },
    {
      t: 7,
      def: `Profit booking by option writers is buying back a short option after its premium has fallen, to keep most of the earned premium and free the margin. OI falls while the premium is already low.`,
      hi: `Option writers ka profit booking matlab bechi hui option ka premium gir jaane ke baad use wapas khareed lena, taaki kamayi ka zyada hissa bacha rahe aur margin free ho jaye. OI girta hai aur premium pehle se kam hota hai.`,
      how: `A writer who sold a call at ₹60 and sees it at ₹18 has earned most of the gain; the remaining ₹18 can still hurt if the index spikes. Many writers close at 70 to 90% of the maximum profit to release margin and remove risk. This is rational and not a view change. In the chain it shows as OI declines with low premium near expiry. It is common on the last two days of the weekly expiry.`,
      eg: {
        title: 'Writer closes at ₹18 (illustrative)',
        text: `A writer sold one lot of a far OTM call at ₹60 and buys it back at ₹18. Profit = (60 − 18) × 65 = ₹2,730, which is 70% of the maximum possible ₹3,900 (60 × 65). Keeping the position would add up to ₹1,170 more but exposes the writer to a sudden spike, so many close early.`,
      },
      tip: `Writers do not always hold to expiry; falling OI with a very low premium is often just profit booking.`,
      visual: {
        kind: 'bars',
        title: 'Writer profit at different buy-back prices (sold at ₹60, per lot)',
        unit: ' ₹',
        items: [
          { label: 'Buy back at 42', value: 1170, tone: 'neutral' },
          { label: 'Buy back at 30', value: 1950, tone: 'gold' },
          { label: 'Buy back at 18', value: 2730, tone: 'ice' },
          { label: 'Expires at 0', value: 3900, tone: 'bull' },
        ],
      },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'sell', strike: 24400, premium: 60, expiryPrice: 24400, lotSize: 65, lots: 1 }, why: 'Maximum writer profit if the option expires worthless.' },
    },
    {
      t: 8,
      def: `A sudden OI reduction is a sharp fall in open interest at a strike within a short time. It says many contracts closed quickly. It may be stress, a roll, profit taking, or a data effect, so look at its context.`,
      hi: `Sudden OI reduction matlab kam time mein kisi strike par OI ka tezi se girna. Iska matlab hai ki bahut saare contracts jaldi band hue. Yeh stress, roll, profit booking ya data effect ho sakta hai, isliye context dekhna zaroori hai.`,
      how: `Compare the size with typical changes at that strike. A fall of 30% in 15 minutes is much bigger than the usual noise. Check whether the index crossed the strike, whether OI rose at a nearby strike (a roll), whether the premium moved sharply and whether the fall is on all of the strikes (an expiry or data effect). Also confirm on a second source: data vendors differ in timing, and exchange files are the final reference after close.`,
      eg: {
        title: '30% in fifteen minutes (illustrative)',
        text: `A strike falls from 20 lakh to 14 lakh OI, a 6 lakh or 30% drop. The index has just crossed the strike and the call premium doubled. That fits stressed short covering. If instead OI at the next strike rose by 5.8 lakh, the more likely reading is a roll.`,
      },
      tip: `A sudden fall in OI is a reason to look, not to trade: first find out which of exit, roll or data issue explains it.`,
      visual: {
        kind: 'timeline',
        title: 'Checking a sudden OI drop',
        events: [
          { when: 'Step 1', what: 'Size versus normal change at that strike', tone: 'gold' },
          { when: 'Step 2', what: 'Index crossed the strike?', tone: 'ice' },
          { when: 'Step 3', what: 'OI rose at a nearby strike? (roll)', tone: 'neutral' },
          { when: 'Step 4', what: 'Same on a second data source?', tone: 'neutral' },
        ],
      },
    },
    {
      t: 9,
      def: `Price and OI divergence is when the index moves one way but OI on the supporting side moves the opposite way to what you would expect. It may show that the move lacks new commitment. It is a warning to look closer, not a signal on its own.`,
      hi: `Price aur OI divergence matlab index ek taraf chal raha hai lekin supporting side ka OI us ke ulta chal raha hai jo aap expect karte. Isse lag sakta hai ki move mein naya commitment nahi hai. Yeh dhyaan se dekhne ki warning hai, akele signal nahi.`,
      how: `For example, a rally with put OI falling at the lower strikes may mean that traders are not adding new support while the price rises; it can be the result of covering and profit booking, not new belief. A fall with call OI also falling at higher strikes shows that the move is mostly covering. A divergence is meaningful when it is persistent and appears across several strikes. It can resolve in either direction.`,
      eg: {
        title: 'Rally without new put support (illustrative)',
        text: `NIFTY rises 100 points. The 23,900 PE OI, an earlier support, falls from 12 lakh to 9 lakh (−25%) and no new put OI appears at 24,000 or 24,100. The rally is not accompanied by new put writing. This is a caution: if NIFTY gives back 50 points quickly there is little fresh OI to catch it, but it does not say a fall will happen.`,
      },
      tip: `Treat divergence as a question (who is supporting this move?) and not as an answer.`,
      visual: {
        kind: 'matrix',
        title: 'Price vs support OI',
        xLabels: ['Support OI rises', 'Support OI falls'],
        yLabels: ['Index rises', 'Index falls'],
        cells: [
          { head: 'Confirmed rise', note: 'New puts being written below', tone: 'bull' },
          { head: 'Divergence', note: 'Rise by covering, little new support', tone: 'gold' },
          { head: 'Support tested', note: 'Puts added into the fall', tone: 'ice' },
          { head: 'Confirmed fall', note: 'Support leaving', tone: 'bear' },
        ],
      },
      calc: { id: 'pcr', preset: { putOI: 900000, callOI: 1100000, putVol: 1500000, callVol: 1600000 }, why: 'Put/call ratio after the put OI fall (9 / 11 lakh).' },
    },
    {
      t: 10,
      def: `Exit confirmation means checking that the exit story repeats over time and across data before you act on it. One snapshot can be noise. A confirmed exit has the same direction in OI, premium, volume and the index.`,
      hi: `Exit confirmation matlab exit ki kahani ko time ke saath aur alag data se dobara check karna, action lene se pehle. Ek snapshot noise ho sakta hai. Confirmed exit mein OI, premium, volume aur index sab ek hi direction dikhate hain.`,
      how: `Use a short checklist: the OI fall persists in at least two or three snapshots, the premium moves the way the label says, nearby strikes show something similar, volume is above normal, and the index responds. Also define what would invalidate your reading, for example OI is rebuilt at the same strike. Finally accept that even a confirmed exit can be followed by a reversal; the chain is a map of positioning, not a forecast.`,
      eg: {
        title: 'Three snapshots (illustrative)',
        text: `The 24,200 CE shows OI 14.0, 12.6 and 11.2 lakh at 10:00, 10:30 and 11:00 (a fall of 1.4 lakh each time), and LTP of ₹45, ₹54 and ₹63 while NIFTY moves 24,100, 24,150, 24,190. Every snapshot points the same way, and 24,300 CE also loses OI. This is a confirmed call short covering. An invalidation would be OI climbing back above 13 lakh while NIFTY drops under 24,100.`,
      },
      tip: `Write down the invalidation before acting: if OI rebuilds at the strike, the story is over.`,
      visual: {
        kind: 'flow',
        title: 'Exit confirmation checklist',
        steps: [
          { label: 'Repeat', note: '2-3 snapshots agree', tone: 'gold' },
          { label: 'Premium fits', note: 'Rises for covering, falls for liquidation', tone: 'ice' },
          { label: 'Neighbours agree', note: 'Adjacent strikes similar', tone: 'neutral' },
          { label: 'Index responds', note: 'And invalidation is set', tone: 'bull' },
        ],
      },
    },
  ],
}
export default m
