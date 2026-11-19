import type { ModuleLesson } from '../topicLessonTypes'

/* Module 11.2 — Price + Volume + OI Analysis.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification).
 * The build-up labels (long build-up, short covering, ...) are rules for FUTURES; they are not applied blindly to option OI. */
const m: ModuleLesson = {
  moduleId: '11.2',
  intro: `Price tells you what happened, volume tells you how many traders took part, and open interest (OI) tells you whether positions were being added or removed. Reading the three together gives a much fuller picture than any one alone. The classic price and OI combinations are rules for futures; for options they are only a starting point.`,
  introHi: `Price batata hai kya hua, volume batata hai kitne traders ne hissa liya, aur open interest (OI) batata hai ki positions add ho rahi thi ya hat rahi thi. Teeno ek saath dekhne se akele kisi ek se kaafi behtar picture milti hai. Price aur OI ke classic combinations futures ke rules hain; options mein yeh sirf shuruaat ka point hain.`,
  steps: {
    concept: `Each combination of price direction and OI direction describes a different kind of activity. Price up with OI up means new positions were added while price rose (a long build-up in futures). Price up with OI down means shorts were closing (short covering). The same logic works for falls. Volume then shows how strong the participation was. Together these give a hint about the quality of a move, never a certainty.`,
    conceptHi: `Price direction aur OI direction ka har combination alag kism ki activity dikhata hai. Price upar aur OI upar ka matlab naye positions add hue jab price badha (futures mein long build-up). Price upar aur OI neeche ka matlab shorts band ho rahe the (short covering). Girne par bhi yahi logic hai. Volume batata hai participation kitni strong thi. Milakar yeh move ki quality ka hint dete hain, certainty nahi.`,
    mechanism: `OI rises when new contracts are opened (a buyer and a seller both new) and falls when existing contracts are closed. In futures, every long has an equal short, so OI alone cannot show who initiated the trade. The standard reading assumes the price direction reveals the aggressor: a rising price with rising OI is read as buying pressure creating new longs. That is an inference, not data. Volume and the next days' price action should confirm it.`,
    example: {
      title: 'Four futures days (illustrative)',
      text: `Start: NIFTY futures at 24,000, OI 1,50,000 lots. Day 1: price 24,144 (+0.6%), OI 1,65,000 (+10%, 15,000 lots) reads as long build-up. Day 2: price 24,264 (+0.5%), OI 1,53,000 (−7.3%) reads as short covering. Day 3: price 24,143 (−0.5%), OI 1,44,000 (−5.9%) reads as long unwinding. Day 4: price 23,975 (−0.7%), OI 1,58,000 (+9.7%) reads as short build-up. OI changes of 15,000 lots equal 15,000 × 65 = 9,75,000 units.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Price and OI in futures',
      caption: 'The four classic combinations. These are futures reading rules, and the labels are inferences.',
      xLabels: ['OI falls', 'OI rises'],
      yLabels: ['Price rises', 'Price falls'],
      cells: [
        { head: 'Short covering', note: 'Shorts closing', tone: 'bull' },
        { head: 'Long build-up', note: 'New longs', tone: 'bull' },
        { head: 'Long unwinding', note: 'Longs closing', tone: 'bear' },
        { head: 'Short build-up', note: 'New shorts', tone: 'bear' },
      ],
    },
    optionChain: `The option chain adds a second layer: OI and change in OI per strike. Rising futures OI with rising price, plus fresh put OI added below the market, is consistent with a supported advance, but the chain cannot tell whether put buyers or put writers created the OI. Treat option OI as potential levels. Do not apply futures build-up labels strike by strike without checking whether the option was bought or sold.`,
    psychology: `Rising price with rising OI makes new buyers feel safe and pulls in late buyers. Rising price with falling OI is often shorts running for cover, which can feel violent but is fuel that burns out. Beginners often label every up day a bullish signal. Ask whether the move came from new money or from old positions closing.`,
    scenarios: {
      bullish: `Price rises, volume is above average and futures OI also rises. New longs are being added and the market is building a base. The idea stays valid while price holds above the day's breakout level and OI does not fall back sharply.`,
      bearish: `Price falls with higher volume and rising OI. New shorts are being added. If price then bounces and OI falls, the bounce is short covering and may not last; a lower high with rising OI would support the bearish view.`,
      sideways: `Price barely moves while OI rises. Positions are building on both sides in a narrow range, and a large move can follow when one side gives way. Direction cannot be known in advance, so plan both breakouts.`,
    },
    practice: [
      { q: `Futures: price rises from 24,000 to 24,144, OI rises from 1,50,000 to 1,65,000 lots. Give the percentage changes and the label.`, a: `Price: 144 / 24,000 = 0.6%. OI: 15,000 / 1,50,000 = 10%. Price up and OI up reads as long build-up. Added units = 15,000 × 65 = 9,75,000.` },
      { q: `Price falls 0.5% while OI falls 6%. What is the label, and what does it say about conviction?`, a: `Price down with OI down is long unwinding. Existing longs are exiting rather than new shorts being added, which is a weaker bearish signal than a short build-up.` },
      { q: `Why can't OI show who started a futures trade?`, a: `Every futures contract has one long and one short with equal size. OI only counts open contracts. It does not record which side was the aggressor, so build-up labels are inferences from price direction.` },
      { q: `Put OI at 24,000 PE is 9,00,000 contracts and call OI is 7,50,000. Find the OI-based PCR.`, a: `PCR = 9,00,000 / 7,50,000 = 1.2. This describes the mix of OI and is not a forecast.` },
    ],
    assignment: `Pick the last 10 trading days of NIFTY futures. For each day write down price change %, volume relative to average and OI change %, then label the day with one of the four combinations. Count how often the next day's close agreed with the label, and note that this is a small sample and no proof.`,
  },
  topics: [
    {
      t: 1,
      def: `Price increase with volume increase means the market rose while more contracts than usual changed hands. It suggests broader participation behind the rise.`,
      hi: `Price badhna aur saath mein volume badhna matlab market upar gayi aur usual se zyada contracts trade hue. Yeh dikhata hai ki rise ke peeche zyada participation thi.`,
      how: `Volume is compared with the average for the same time of day. If price moves up on above-average volume, more buyers than sellers were willing to transact at rising prices. It is stronger when the candle closes near its high and weaker when it leaves a long upper wick. The volume itself does not say whether new positions were opened; that is why OI is checked next.`,
      eg: {
        title: 'Rise on heavy volume (illustrative)',
        text: `NIFTY futures rise from 24,000 to 24,144 (+0.6%) on 4,50,000 contracts against an average of 3,00,000, which is 1.5 times. The close is at 24,138, near the day's high of 24,150. Wide participation with a strong close makes this a stronger up day than the same move on 1.8 lakh contracts.`,
      },
      tip: `Volume strength is relative. Always compare with the usual volume for that day and time.`,
      visual: { kind: 'candles', title: 'Rise with expanding participation', pattern: 'uptrend' },
    },
    {
      t: 2,
      def: `Price increase with OI increase means the market rose and the number of open contracts also rose. In futures this is read as a long build-up: fresh buyers entering faster than existing shorts leave.`,
      hi: `Price badhna aur OI badhna matlab market upar gayi aur open contracts bhi badhe. Futures mein ise long build-up kehte hain: naye buyers aaye, purane shorts se zyada tezi se.`,
      how: `Each new open contract needs both a new buyer and a new seller, so rising OI means new positions on both sides. Reading it as a long build-up assumes buyers were the aggressors, because price rose. This is an inference. It is stronger when volume is high and the move continues the next day. If OI is rising while price stalls, longs may be getting crowded.`,
      eg: {
        title: 'Long build-up (illustrative)',
        text: `Futures: price 24,000 to 24,144 (+0.6%), OI 1,50,000 to 1,65,000 lots (+10%). That is 15,000 new lots, or 15,000 × 65 = 9,75,000 units. Margin is blocked on these positions, so the participants are committed rather than day-trading out within minutes.`,
      },
      tip: `Rising OI with rising price is better evidence than price alone, but the new longs could still be wrong.`,
      visual: { kind: 'compare', title: 'Long build-up', left: { head: 'Price rises', tone: 'bull', points: ['Buyers more aggressive', 'Closes near high'] }, right: { head: 'OI rises', tone: 'bull', points: ['New contracts opened', 'Participants committed'] } },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.6, oiChangePct: 10 }, why: 'Classifies the combination from the example (futures).' },
    },
    {
      t: 3,
      def: `Price decrease with volume increase means the market fell while participation was above normal. It suggests that selling was broad, not just a few orders pushing through thin buyers.`,
      hi: `Price girna aur volume badhna matlab market giri aur participation normal se zyada thi. Yeh dikhata hai ki selling broad thi, sirf chhote orders ne thin buyers ke beech price nahi gira diya.`,
      how: `A fall on heavy volume at a support zone makes a break more credible. A fall on heavy volume after a long decline may be a climax instead. The deciding factors are location (is it at support, after a long trend?) and the close (near the low means sellers stayed in control). Option buyers of puts benefit when the fall is steady; sudden heavy falls raise India VIX and option premiums, so late put buyers pay more.`,
      eg: {
        title: 'Fall on heavy volume (illustrative)',
        text: `NIFTY futures fall from 24,000 to 23,760 (−240 points, −1.0%) on 4,80,000 contracts versus a 3,00,000 average (1.6 times). The close is at 23,775, just above the low of 23,755. Selling had broad participation, so a bounce into 23,900 may meet new sellers.`,
      },
      tip: `Heavy volume on a fall can mean continuation or exhaustion. Look at where it happened and how the candle closed.`,
      visual: { kind: 'candles', title: 'Fall with expanding participation', pattern: 'downtrend' },
    },
    {
      t: 4,
      def: `Price decrease with OI increase means the market fell while open contracts rose. In futures this is read as a short build-up: new sellers entering as price falls.`,
      hi: `Price girna aur OI badhna matlab market giri aur open contracts badhe. Futures mein ise short build-up kehte hain: price girte waqt naye sellers aaye.`,
      how: `As with long build-up, both a new buyer and a new seller exist for each added contract. The label assumes sellers were more aggressive because price fell. Short build-ups can end with a squeeze if price reverses and the new shorts must buy back. Watch whether price makes lower highs while OI keeps rising; that supports the bearish read. A sharp reversal with falling OI signals shorts running for cover.`,
      eg: {
        title: 'Short build-up (illustrative)',
        text: `Futures: price from 24,000 to 23,832 (−0.7%, 168 points), OI from 1,50,000 to 1,62,000 lots (+8%, 12,000 lots). The new 12,000 lots equal 12,000 × 65 = 7,80,000 units of short-side commitment. If the index rallies 1% the next day, those shorts face losses and may buy back.`,
      },
      tip: `New shorts mean fuel for a fall and fuel for a squeeze. The reversal risk is part of the picture.`,
      visual: { kind: 'compare', title: 'Short build-up', left: { head: 'Price falls', tone: 'bear', points: ['Sellers more aggressive', 'Closes near low'] }, right: { head: 'OI rises', tone: 'bear', points: ['New contracts opened', 'Squeeze risk if price reverses'] } },
      calc: { id: 'oi-buildup', preset: { priceChangePct: -0.7, oiChangePct: 8 }, why: 'Classifies the short build-up example (futures).' },
    },
    {
      t: 5,
      def: `Price increase with OI decrease means the market rose while open contracts fell. In futures this is called short covering: sellers closing positions by buying back.`,
      hi: `Price badhna aur OI ghatna matlab market upar gayi lekin open contracts kam hue. Futures mein ise short covering kehte hain: sellers ne buy karke apni positions band ki.`,
      how: `Closing a short means buying, which pushes price up even without new bullish interest. OI falls because contracts disappear. Short-covering rallies can be sharp but tend to fade once the covering ends, because no new longs were added. A rally that continues with rising OI later is more convincing than one that ends when OI stops falling.`,
      eg: {
        title: 'Short covering (illustrative)',
        text: `Futures: price from 24,000 to 24,120 (+0.5%), OI from 1,50,000 to 1,38,000 lots (−8%, 12,000 lots closed = 7,80,000 units). The rise came from shorts exiting, not new long money. If the next day OI rises again with price, the move gains support; if price stalls, the rally may have been the covering alone.`,
      },
      tip: `Short covering is a real move but a short-lived reason. Do not extrapolate it.`,
      visual: { kind: 'candles', title: 'Short-covering spike', pattern: 'gapUp' },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.5, oiChangePct: -8 }, why: 'Classifies the short-covering example (futures).' },
    },
    {
      t: 6,
      def: `Price decrease with OI decrease means the market fell while open contracts fell. In futures this is long unwinding: holders of long positions are selling to exit.`,
      hi: `Price girna aur OI ghatna matlab market giri aur open contracts kam hue. Futures mein ise long unwinding kehte hain: long holders apni positions bech kar nikal rahe hain.`,
      how: `Long positions closing mean selling pressure without new shorts being created. Because OI falls, the fall is a result of exits rather than fresh bearish bets, so it is usually a weaker signal than a short build-up. Longs may be reducing before an event or after hitting stops. The decline may stop when exits are done.`,
      eg: {
        title: 'Long unwinding (illustrative)',
        text: `Futures: price from 24,000 to 23,880 (−0.5%, 120 points), OI from 1,50,000 to 1,41,000 lots (−6%, 9,000 lots = 5,85,000 units). Holders exited, but nobody added a fresh bearish bet. A stronger bearish case would need OI to start rising again on further falls.`,
      },
      tip: `Falling price with falling OI is exit selling. It tells you old longs are leaving, not that new shorts are confident.`,
      visual: { kind: 'candles', title: 'Long unwinding', pattern: 'gapDown' },
      calc: { id: 'oi-buildup', preset: { priceChangePct: -0.5, oiChangePct: -6 }, why: 'Classifies the long-unwinding example (futures).' },
    },
    {
      t: 7,
      def: `Combining futures and options OI means checking both: futures OI tells you about directional positioning, and option OI at strikes tells you about potential levels and hedging. Agreement between them is more informative than either alone.`,
      hi: `Futures aur options OI ko combine karne ka matlab dono dekhna: futures OI directional positioning batata hai, aur strike-wise option OI potential levels aur hedging batata hai. Dono ek hi direction dikhayein toh akele kisi ek se zyada information milti hai.`,
      how: `Start with futures: price, volume and OI change. Then look at option OI change at strikes near the money. Put OI building below the market and call OI building above is a typical pattern in a range. If futures show a long build-up while put OI rises below and call OI at nearby strikes falls, the picture agrees. But OI cannot show whether options were bought or sold, so treat it as potential levels only.`,
      eg: {
        title: 'Agreement and disagreement (illustrative)',
        text: `Futures: long build-up with price at 24,144. 24,000 PE adds 8,00,000 contracts of OI; 24,200 CE adds 2,00,000. PCR from total put OI 9,00,000 and call OI 7,50,000 is 1.2. The 8,00,000 added put OI equals 8,00,000 × 65 = 5,20,00,000 units. The picture is consistent with a supported market, but the added puts may also be hedges bought by longs, so no certainty.`,
      },
      tip: `Use futures for direction and options for levels. Treat disagreement as a reason to wait, not a trade.`,
      visual: { kind: 'oi', title: 'Illustrative OI change (lakh contracts)', rows: [
        { strike: 23900, ce: 1, pe: 5 },
        { strike: 24000, ce: 2, pe: 8 },
        { strike: 24100, ce: 3, pe: 2 },
        { strike: 24200, ce: 5, pe: 1 },
      ], spot: 24144 },
      calc: { id: 'pcr', preset: { putOI: 900000, callOI: 750000, putVol: 650000, callVol: 600000 }, why: 'PCR from the example OI (1.2).' },
    },
    {
      t: 8,
      def: `Potential accumulation is a phase where buyers may be quietly building positions, often in a sideways range. Typical signs are a flat price, rising volume on up moves and lower volume on down moves.`,
      hi: `Potential accumulation woh phase hai jab buyers shayad chupke se positions bana rahe hain, aksar sideways range mein. Typical signs: flat price, up moves par zyada volume aur down moves par kam volume.`,
      how: `Accumulation is a hypothesis, not a fact; nobody publishes who is accumulating. You test it by splitting volume into up-day and down-day averages within a range, watching OI, and seeing whether dips are bought at higher lows. It is confirmed only if price later breaks out. Many ranges that looked like accumulation turned into distribution, so keep a stop.`,
      eg: {
        title: 'A range with quiet buying (illustrative)',
        text: `NIFTY moves in 23,900 to 24,050 for eight sessions. Average volume on up days is 3,40,000 contracts and on down days 2,40,000. The ratio is 3.4 / 2.4 = 1.42. Lows are slightly higher each time (23,900, 23,920, 23,935). This is consistent with accumulation, but only a close above 24,050 on strong volume would confirm it.`,
      },
      tip: `Accumulation is only visible in hindsight. Trade the breakout, not the hope.`,
      visual: { kind: 'candles', title: 'Possible accumulation range', pattern: 'accumulation', level: { price: 24050, label: 'Range top 24,050' } },
    },
    {
      t: 9,
      def: `Potential distribution is a phase where holders may be selling into strength, often near highs. Typical signs are a flat or stalling price, heavy volume on down moves and weaker volume on up moves.`,
      hi: `Potential distribution woh phase hai jab holders shayad strength mein bech rahe hain, aksar highs ke paas. Typical signs: price ruka hua ya flat, down moves par heavy volume aur up moves par kamzor volume.`,
      how: `Distribution is the mirror of accumulation and carries the same limits: it is an inference. You test it by comparing volume on down days and up days near a prior high, watching for lower highs and for OI being added as price stalls. A close below the range bottom with volume supports the idea. Strong trends can pause for weeks and then continue, so a stop above the range matters.`,
      eg: {
        title: 'A range with quiet selling (illustrative)',
        text: `NIFTY stalls between 24,350 and 24,500 for seven sessions. Average volume on down days is 3,60,000 and on up days 2,50,000; the ratio is 3.6 / 2.5 = 1.44. Highs are 24,500, 24,480, 24,450. A close below 24,350 with volume above average would support a distribution call; a close above 24,500 would cancel it.`,
      },
      tip: `Heavy volume near a high is not automatically selling. It is distribution only if price then fails to advance.`,
      visual: { kind: 'candles', title: 'Possible distribution range', pattern: 'distribution', level: { price: 24350, label: 'Range bottom 24,350' } },
    },
    {
      t: 10,
      def: `Confirming market direction means checking that price, volume, futures OI and option OI broadly agree before trusting a view. The more independent clues point the same way, the stronger the case, though no combination is certain.`,
      hi: `Market direction confirm karne ka matlab yeh dekhna ki price, volume, futures OI aur option OI mote taur par ek hi taraf ishara kar rahe hain ya nahi. Jitne zyada independent clues ek direction mein hon, case utna strong hota hai, lekin koi combination certain nahi hota.`,
      how: `Use a short checklist: (1) price at or beyond a key level, (2) volume above average, (3) futures OI moving in line, (4) option OI levels not blocking the path. Count how many agree. Three or four of four is stronger than one or two. Stay aware that clues are correlated, so four signals may be fewer independent pieces of evidence than they seem. Always fix the invalidation level beforehand.`,
      eg: {
        title: 'A four-point check (illustrative)',
        text: `NIFTY closes above 24,100 resistance (1), volume 1.5 times average (2), futures OI +8% (3) and 24,200 CE OI unchanged while 24,000 PE OI rises (4). Four of four agree, 100%. A trader may buy the 24,150 CE with a stop on a close below 24,080. If only three agreed (75%), the trader would take a smaller position or wait. Neither outcome guarantees follow-through.`,
      },
      tip: `Confirmation lowers the odds of being wrong; it does not remove them. Size accordingly.`,
      visual: { kind: 'flow', title: 'Direction checklist', steps: [
        { label: 'Price', note: 'Beyond key level', tone: 'gold' },
        { label: 'Volume', note: 'Above average', tone: 'ice' },
        { label: 'Futures OI', note: 'In line with price', tone: 'ice' },
        { label: 'Option OI', note: 'No wall in the way', tone: 'neutral' },
      ] },
    },
  ],
  tools: [{ id: 'oi-buildup', why: 'Price and OI classifier for futures.' }, { id: 'pcr', why: 'Put-call ratio from OI and volume.' }],
}
export default m
