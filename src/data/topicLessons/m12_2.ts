import type { ModuleLesson } from '../topicLessonTypes'

/* Module 12.2 — Futures OI Analysis.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification).
 * The build-up labels are inferences for FUTURES; OI alone cannot show who initiated a trade. */
const m: ModuleLesson = {
  moduleId: '12.2',
  intro: `Futures open interest (OI) is the number of futures contracts still open at the end of the day. Watching how it changes together with price tells you whether a move came from fresh positions or from old positions closing. These labels are inferences from price direction, not a record of who bought or sold.`,
  introHi: `Futures OI matlab din ke end mein kitne futures contracts abhi bhi open hain. OI price ke saath kaise badal raha hai, yeh dekhkar samajh aata hai ki move naye positions se aayi ya purane positions band hone se. Yeh labels price direction se nikale gaye anumaan hain, kisne kya khareeda-becha uska record nahi.`,
  steps: {
    concept: `Four combinations of price direction and OI direction describe four kinds of activity: long build-up, short build-up, short covering and long unwinding. Volume, intraday changes, the spread across expiries and the rollover pace add quality to the reading. The idea is to judge how committed the participants are, not to predict the next candle.`,
    conceptHi: `Price direction aur OI direction ke chaar combinations chaar tarah ki activity dikhate hain: long build-up, short build-up, short covering aur long unwinding. Volume, intraday badlav, alag expiries mein OI ka batwara aur rollover ki speed se reading aur pakki hoti hai. Maqsad yeh jaanna hai ki participants kitne committed hain, agli candle predict karna nahi.`,
    mechanism: `Every futures contract has exactly one long and one short, so OI rises when new contracts are created and falls when existing ones are closed. NSE publishes futures OI and volume per contract after each session, and brokers show live OI with small delays. The standard labels assume the price direction reveals the aggressor. That is an inference: a rising price with rising OI is read as new buying, but each new long also has a new short on the other side.`,
    example: {
      title: 'Four-day futures read (illustrative)',
      text: `NIFTY futures at 24,000 with OI 1,50,000 lots. Day 1: price 24,120 (+0.5%), OI 1,62,000 (+8%) is a long build-up. Day 2: price 24,180 (+0.25%), OI 1,54,000 (−4.9%) is short covering. Day 3: price 24,060 (−0.5%), OI 1,48,000 (−3.9%) is long unwinding. Day 4: price 23,940 (−0.5%), OI 1,61,000 (+8.8%) is a short build-up. The Day 1 OI increase of 12,000 lots equals 12,000 × 65 = 7,80,000 units.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Price and futures OI',
      caption: 'The four classic combinations. They are labels for futures; treat each as a hint, not a fact.',
      xLabels: ['OI falls', 'OI rises'],
      yLabels: ['Price rises', 'Price falls'],
      cells: [
        { head: 'Short covering', note: 'Shorts closing', tone: 'bull' },
        { head: 'Long build-up', note: 'New longs', tone: 'bull' },
        { head: 'Long unwinding', note: 'Longs closing', tone: 'bear' },
        { head: 'Short build-up', note: 'New shorts', tone: 'bear' },
      ],
    },
    optionChain: `Futures OI is not on the option chain, but the two should be read together. A long build-up in futures with fresh put OI rising below the market and call OI not growing above is consistent with a supported advance. The chain still cannot tell whether put OI came from sellers or buyers, so use it for potential levels only, and never copy futures build-up labels onto individual option strikes.`,
    psychology: `New longs entering a rising market feel safe because the crowd agrees, which can pull in late buyers. Short covering feels violent but is a one-time fuel: once the shorts are out, the push fades. Many beginners call every red day bearish. Ask first whether the fall came from new shorts or from longs simply leaving.`,
    scenarios: {
      bullish: `Price rises, volume is above average and futures OI rises. New longs are being added. The view stays reasonable while price holds above the breakout level and OI does not drop sharply. It can fail if a news event reverses sentiment.`,
      bearish: `Price falls with higher volume and OI rises, which reads as a short build-up. If price then bounces with falling OI, the bounce is likely short covering and may not last. A lower high with rising OI supports the bearish case.`,
      sideways: `Price stays in a narrow band while OI keeps rising. Positions are being built on both sides, and a large move can follow once one side gives way. The direction cannot be known in advance, so plan for both breakouts.`,
    },
    practice: [
      { q: `Futures price goes from 24,000 to 24,120 and OI from 1,50,000 to 1,62,000 lots. Find the percentage changes, the label and the units added.`, a: `Price: 120 / 24,000 = 0.5%. OI: 12,000 / 1,50,000 = 8%. Price up and OI up is a long build-up. Units added = 12,000 × 65 = 7,80,000.` },
      { q: `Price rises 0.75% while OI falls from 1,60,000 to 1,48,000 lots. What label applies and how many lots closed?`, a: `Price up with OI down is short covering. OI fell by 12,000 lots, which is 12,000 / 1,60,000 = 7.5%, or 7,80,000 units.` },
      { q: `Why can't OI tell you who initiated a futures trade?`, a: `Each contract has one long and one short of equal size. OI counts open contracts only. It does not record the aggressor, so build-up labels are inferences from the price direction.` },
      { q: `A trader is long one NIFTY futures lot from 24,000. Futures settle at 24,120. What is the gain?`, a: `Gain = (24,120 − 24,000) × 65 = 120 × 65 = ₹7,800, before charges.` },
    ],
    assignment: `For the last 10 trading days, record NIFTY near-month futures close, volume against its 10-day average, and OI. Label each day with one of the four combinations. Count how often the next day's close agreed, and write one line stating that ten days is a tiny sample and not proof.`,
  },
  topics: [
    {
      t: 1,
      def: `A long build-up means price rises and futures OI rises at the same time. It is read as fresh buyers entering faster than sellers can cover, so new long positions are accumulating.`,
      hi: `Long build-up ka matlab price badh raha hai aur futures OI bhi badh raha hai. Ise aise padhte hain ki naye buyers aa rahe hain aur naye long positions ban rahi hain.`,
      how: `New OI needs a new buyer and a new seller, so rising OI shows new positions on both sides. Calling it a long build-up assumes buyers were more aggressive because price went up. That is an inference. It is stronger when volume is above average and when the next session does not give the gains back. If OI keeps rising while price stalls, longs may be getting crowded.`,
      eg: {
        title: 'Long build-up (illustrative)',
        text: `NIFTY futures rise from 24,000 to 24,120 (+0.5%) and OI from 1,50,000 to 1,62,000 lots (+8%). That is 12,000 new lots, or 7,80,000 units. At the new price this is roughly 7,80,000 × 24,120 = ₹1,881 crore of fresh notional exposure. Real money is committed, but it could still be wrong.`,
      },
      tip: `Rising price with rising OI is better evidence than price alone, but fresh longs can still lose.`,
      visual: { kind: 'candles', title: 'Long build-up: rising price, growing participation', pattern: 'uptrend' },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.5, oiChangePct: 8 }, why: 'Classify the price and OI change.' },
    },
    {
      t: 2,
      def: `A short build-up means price falls while futures OI rises. It is read as new sellers entering, so fresh short positions are accumulating.`,
      hi: `Short build-up ka matlab price gir raha hai aur futures OI badh raha hai. Ise aise padhte hain ki naye sellers aa rahe hain aur naye short positions ban rahi hain.`,
      how: `A fall alone could simply be long holders selling. When OI rises at the same time, new contracts are being opened, and since price fell the aggressor is assumed to be the seller. Shorts can be directional bets or hedges against a cash portfolio, and OI cannot separate them. A short build-up near a known support can become the fuel for a sharp bounce if it turns.`,
      eg: {
        title: 'Short build-up (illustrative)',
        text: `NIFTY futures fall from 24,000 to 23,880 (−0.5%) while OI rises from 1,50,000 to 1,63,500 lots (+9%). That is 13,500 new lots, 13,500 × 65 = 8,77,500 units. A trader short one lot from 24,000 would be up 120 × 65 = ₹7,800 at 23,880, before charges.`,
      },
      tip: `Some new shorts are hedges, not bearish bets. Do not assume every short build-up is a forecast of falling prices.`,
      visual: { kind: 'candles', title: 'Short build-up: falling price, growing participation', pattern: 'downtrend' },
      calc: { id: 'oi-buildup', preset: { priceChangePct: -0.5, oiChangePct: 9 }, why: 'Classify a falling price with rising OI.' },
    },
    {
      t: 3,
      def: `Short covering means price rises while futures OI falls. It is read as existing short sellers buying back to close positions, rather than new buyers arriving.`,
      hi: `Short covering ka matlab price badh raha hai lekin futures OI gir raha hai. Matlab naye buyers nahi, balki purane short sellers apni positions band karne ke liye khareed rahe hain.`,
      how: `When a short closes, he must buy, which pushes price up while OI falls because the contract disappears. Because the buying is exits and not fresh conviction, such rallies often fade once the shorts are done. Strong follow-through needs OI to start rising again with price. Short covering is common right after sharp falls and around support levels.`,
      eg: {
        title: 'Short covering (illustrative)',
        text: `Futures rise from 24,000 to 24,180 (+0.75%) while OI falls from 1,60,000 to 1,48,000 lots (−7.5%). 12,000 lots closed, 12,000 × 65 = 7,80,000 units. A short seller who sold at 24,000 and covers at 24,180 loses 180 × 65 = ₹11,700 per lot, before charges.`,
      },
      tip: `A rally with falling OI is fuel burning, not fuel being added. Wait for OI to rise on the next push.`,
      visual: { kind: 'candles', title: 'Short covering spike', pattern: 'gapUp' },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.75, oiChangePct: -7.5 }, why: 'Classify rising price with falling OI.' },
    },
    {
      t: 4,
      def: `Long unwinding means price falls while futures OI falls. It is read as existing long holders selling to exit, not new sellers arriving.`,
      hi: `Long unwinding ka matlab price gir raha hai aur futures OI bhi gir raha hai. Matlab naye sellers nahi aaye, purane long holders apni positions bech kar nikal rahe hain.`,
      how: `Each long that exits sells into the market and removes a contract, so price falls and OI drops together. It shows lost confidence among existing holders rather than a fresh bearish bet. It is usually a weaker bearish signal than a short build-up. It can still be painful when stop-losses cluster just below a popular level and trigger a quick cascade.`,
      eg: {
        title: 'Long unwinding (illustrative)',
        text: `Futures fall from 24,000 to 23,880 (−0.5%) and OI from 1,60,000 to 1,52,000 lots (−5%). 8,000 lots closed, which is 8,000 × 65 = 5,20,000 units. A long from 24,000 closed at 23,880 loses 120 × 65 = ₹7,800 per lot, before charges.`,
      },
      tip: `Falling price with falling OI says the sellers are leaving too. A bounce is possible once selling is exhausted.`,
      visual: { kind: 'candles', title: 'Long unwinding: longs exit on a dip', pattern: 'distribution' },
      calc: { id: 'oi-buildup', preset: { priceChangePct: -0.5, oiChangePct: -5 }, why: 'Classify falling price with falling OI.' },
    },
    {
      t: 5,
      def: `Price and OI combinations put the four labels into one table. Any change in price (up or down) paired with any change in OI (up or down) gives a different story about participation.`,
      hi: `Price aur OI ke combinations chaaron labels ko ek table mein rakhte hain. Price upar ya neeche aur OI upar ya neeche, har jodi alag kahani batati hai ki participation kaisi hai.`,
      how: `Read OI first for the kind of activity: rising OI means new positions, falling OI means exits. Then read price for the direction of the more aggressive side. A small price change with a big OI change often means two sides are building offsetting views. These rules apply to futures. In options, OI rise at a strike can be buyers or sellers, so the same four labels cannot be applied blindly.`,
      eg: {
        title: 'Reading one week (illustrative)',
        text: `Monday: +0.5%, OI +8% (long build-up). Tuesday: +0.25%, OI −4.9% (short covering). Wednesday: −0.5%, OI −3.9% (long unwinding). Thursday: −0.5%, OI +8.8% (short build-up). Two of four days show new money, and the other two show exits. One day of build-up does not make a trend.`,
      },
      tip: `Strong moves usually come with rising OI. Moves with falling OI are weaker and tend to fade sooner.`,
      visual: { kind: 'matrix', title: 'Price × OI map', caption: 'Futures reading only.', xLabels: ['OI falls', 'OI rises'], yLabels: ['Price rises', 'Price falls'], cells: [
        { head: 'Short covering', note: 'Weak rise', tone: 'bull' },
        { head: 'Long build-up', note: 'Stronger rise', tone: 'bull' },
        { head: 'Long unwinding', note: 'Weak fall', tone: 'bear' },
        { head: 'Short build-up', note: 'Stronger fall', tone: 'bear' },
      ] },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.25, oiChangePct: -4.9 }, why: 'Try any pair of price and OI changes.' },
    },
    {
      t: 6,
      def: `Futures volume confirmation means checking that the number of contracts traded supports the price and OI story. High volume shows many participants agree with the move; low volume shows few do.`,
      hi: `Futures volume confirmation ka matlab dekhna ki kitne contracts trade hue aur kya woh price aur OI ki kahani ko support karte hain. Zyada volume matlab bahut log us move se agree karte hain, kam volume matlab kam log.`,
      how: `Compare the day's volume with the recent average, and compare the same time of day for intraday reading, since volume is heavy at the open and close. A long build-up on 1.4 times average volume is better supported than the same move on 0.7 times. Volume counts every trade, including day-traders opening and closing within minutes, so it does not show held positions. OI shows what stays overnight; volume shows how busy the day was.`,
      eg: {
        title: 'Volume check (illustrative)',
        text: `Average daily NIFTY futures volume is 3,00,000 contracts. Today, with a +0.5% move and OI +8%, volume is 4,20,000, which is 4,20,000 / 3,00,000 = 1.4 times average. The same price and OI move on 2,10,000 (0.7 times) would be a weaker confirmation.`,
      },
      tip: `Never judge volume in isolation. Compare with the average for the same time of day.`,
      visual: { kind: 'bars', title: 'Volume vs 10-day average', unit: ' contracts', items: [
        { label: '10-day average', value: 300000, tone: 'neutral' },
        { label: 'Confirming day', value: 420000, tone: 'gold' },
        { label: 'Weak day', value: 210000, tone: 'ice' },
      ] },
      calc: { id: 'return-calc', preset: { start: 300000, end: 420000, years: 1 }, why: 'Percentage difference of volume against average.' },
    },
    {
      t: 7,
      def: `Intraday futures activity is the change in price, volume and OI during the day, not only at the close. It shows where during the session positions were added or exited.`,
      hi: `Intraday futures activity ka matlab sirf din ke close ko nahi, balki din ke dauran price, volume aur OI mein kya badlav hua woh dekhna. Isse pata chalta hai ki session mein kab positions add hui ya nikli.`,
      how: `Brokers and data vendors update futures OI during the day with a short delay. Compare snapshots such as 9:30, 11:30 and 1:30 to see whether OI rose on the rally or on the dip. The close-to-close view can hide that a morning long build-up was fully reversed by afternoon unwinding. Delayed or sampled feeds may be slightly off, so use trends in the snapshots and not exact tick numbers.`,
      eg: {
        title: 'Three snapshots (illustrative)',
        text: `9:30: price 24,000, OI 1,50,000. 11:30: price 24,060 (+0.25%), OI 1,56,000 (+4%) for a long build-up. 1:30: price 24,030, OI 1,53,000 (−1.9%). The afternoon change is long unwinding of 3,000 lots (1,95,000 units). The close-to-close view would show only a small gain and hide this.`,
      },
      tip: `Look at the direction of OI during the session, not just the day-end number.`,
      visual: { kind: 'timeline', title: 'One session in three snapshots', events: [
        { when: '9:30', what: 'Price 24,000, OI 1,50,000 lots', tone: 'neutral' },
        { when: '11:30', what: 'Price 24,060, OI 1,56,000: long build-up', tone: 'bull' },
        { when: '1:30', what: 'Price 24,030, OI 1,53,000: long unwinding', tone: 'bear' },
      ] },
    },
    {
      t: 8,
      def: `Futures positioning is the overall picture of how many contracts are open, on which expiries and (from participant data) by which category of trader. It tells you how crowded the market is.`,
      hi: `Futures positioning ka matlab overall picture ki kitne contracts open hain, kaun si expiry mein hain aur participant data se kis category ke traders ke paas hain. Isse pata chalta hai market kitna crowded hai.`,
      how: `Most futures OI sits in the near-month contract; the next month holds a smaller share until rollover begins. Total OI at a high level means many positions can be unwound together, which can speed up a reversal. NSE also publishes participant-wise OI (clients, DII, FII, proprietary traders), covered in Module 12.4. Positioning is context, not a trigger.`,
      eg: {
        title: 'Spread across expiries (illustrative)',
        text: `Current month OI 1,20,000 lots, next month 25,000, far month 5,000, total 1,50,000. Shares: 80%, about 16.7% and about 3.3%. If total OI is at its highest of the last 3 months while price is flat, many traders hold positions at similar levels, and a break can trigger faster exits.`,
      },
      tip: `Crowded positioning makes moves sharper in either direction. It is context, not a prediction.`,
      visual: { kind: 'bars', title: 'OI by expiry (thousand lots, illustrative)', unit: ' thousand lots', items: [
        { label: 'Current month', value: 120, tone: 'gold' },
        { label: 'Next month', value: 25, tone: 'ice' },
        { label: 'Far month', value: 5, tone: 'neutral' },
      ] },
    },
    {
      t: 9,
      def: `Futures rollover is closing a position in the expiring contract and opening the same position in the next month. Rollover analysis checks how much OI moves to the next series as expiry nears.`,
      hi: `Futures rollover ka matlab expiring contract band karke wahi position agle mahine ke contract mein khol lena. Rollover analysis dekhta hai ki expiry paas aate-aate kitna OI agli series mein shift hua.`,
      how: `One common measure is next-month OI divided by the sum of current and next-month OI, taken close to expiry. A higher percentage suggests more participants are choosing to carry positions. Rollover is priced as the gap between the two futures. That gap reflects cost of carry (interest less expected dividends) and demand, not a fee. Always check the current expiry day in the NSE schedule, since NSE index expiries are currently on Tuesdays and can change.`,
      eg: {
        title: 'Rollover (illustrative)',
        text: `Two days before expiry: current-month OI 48,000 lots, next-month 1,12,000. Rollover = 1,12,000 / (48,000 + 1,12,000) = 70%. A trader long from the current series rolls by selling current futures at 24,000 and buying next at 24,130. The gap is 130 points, or 130 × 65 = ₹8,450 per lot, which is mostly the cost of carry.`,
      },
      tip: `A higher rollover percentage shows willingness to carry positions, not necessarily direction. Check whether longs or shorts rolled using price and OI context.`,
      visual: { kind: 'flow', title: 'Rolling a long futures position', steps: [
        { label: 'Sell current month', note: 'Close the old long', tone: 'ice' },
        { label: 'Buy next month', note: 'Open the new long', tone: 'ice' },
        { label: 'Pay the gap', note: '130 points here', tone: 'gold' },
        { label: 'OI shifts', note: 'To next series', tone: 'neutral' },
      ] },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24130, rate: 6.5, days: 30, dividend: 1.3 }, why: 'Compare the futures gap with cost-of-carry fair value.' },
    },
  ],
  tools: [{ id: 'oi-buildup', why: 'Classify any price and OI change.' }, { id: 'basis-fair-value', why: 'Spot, futures and fair value.' }],
}
export default m
