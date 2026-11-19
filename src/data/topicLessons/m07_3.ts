import type { ModuleLesson } from '../topicLessonTypes'

/* Module 7.3 — Four Major Futures Positioning Patterns.
 * Curriculum has no numbered topics: t1-4 = the four table rows (Long build-up, Short build-up, Short covering, Long unwinding).
 * Illustrative NIFTY futures, lot 65 (check the current NSE contract specification). OI in lots. All derived numbers are computed here. */
const f = (n: number) => n.toLocaleString('en-IN')
const p1 = (n: number) => n.toFixed(1)
const p2 = (n: number) => n.toFixed(2)
const LOT = 65
const base = { px: 24000, oi: 150000 }
const pct = (a: number, b: number) => ((b - a) / a) * 100
const cases = {
  lb: { px: 24120, oi: 162000 },
  sb: { px: 23880, oi: 161000 },
  sc: { px: 24100, oi: 142000 },
  lu: { px: 23900, oi: 141000 },
}
const c = (k: keyof typeof cases) => ({
  ...cases[k],
  dpx: cases[k].px - base.px,
  pxPct: pct(base.px, cases[k].px),
  doi: cases[k].oi - base.oi,
  oiPct: pct(base.oi, cases[k].oi),
  lotVal: cases[k].px * LOT,
})
const lb = c('lb'), sb = c('sb'), sc = c('sc'), lu = c('lu')
const notional = (lots: number, px: number) => lots * LOT * px
const crore = (n: number) => (n / 1e7).toFixed(1)
// option-chain contrast: call strike OI up while index rises
const optCall = { oldOi: 60000, newOi: 78000, prem0: 92, prem1: 74 }
const optDoi = optCall.newOi - optCall.oldOi
const optPct = pct(optCall.oldOi, optCall.newOi)
// P&L of a short at 24,000 closing at 23,880 (one lot)
const shortPnl = (base.px - sb.px) * LOT
const longPnl = (lb.px - base.px) * LOT

const m: ModuleLesson = {
  moduleId: '7.3',
  intro: `In futures, price and open interest (OI) can each rise or fall, which gives four combinations: long build-up, short build-up, short covering and long unwinding. Traders use this four-way label as a quick read on which side looks more active. It was designed for futures, where there is one contract per expiry, and it cannot be copied blindly onto option-chain OI.`,
  introHi: `Futures mein price aur open interest (OI) dono upar ya neeche ja sakte hain, isse chaar combinations bante hain: long build-up, short build-up, short covering aur long unwinding. Traders is chaar-tarah ke label se jaldi andaaza lagate hain ki kaunsi side zyada active lag rahi hai. Yeh label futures ke liye bana hai, jahan ek expiry ka ek hi contract hota hai, aur ise option-chain OI par seedha apply nahi kar sakte.`,
  steps: {
    concept: `Compare two things over the same period for a futures contract: did the price rise or fall, and did OI rise or fall. Price up with OI up is called long build-up. Price down with OI up is short build-up. Price up with OI down is short covering. Price down with OI down is long unwinding. Each label is a plausible story about the dominant side, not proof of who traded, because every open contract has exactly one buyer and one seller.`,
    conceptHi: `Futures contract ke liye same period mein do cheezein dekhiye: price badha ya ghata, aur OI badha ya ghata. Price upar aur OI upar ho toh long build-up. Price neeche aur OI upar ho toh short build-up. Price upar aur OI neeche ho toh short covering. Price neeche aur OI neeche ho toh long unwinding. Har label sirf ek possible kahani hai ki kaunsi side dominant lag rahi hai, proof nahi, kyunki har open contract mein ek buyer aur ek seller hamesha hota hai.`,
    mechanism: `OI rises when a new buyer and a new seller create a contract, and falls when both close. Price moves because one side is more aggressive in crossing the spread. So price up with OI up means new contracts were created while buyers were the more urgent side. Price up with OI down means contracts were closed while buyers were more urgent, which is consistent with shorts buying back. NSE publishes futures OI, and the clearing corporation NSCCL holds the positions behind it, with margin collected under SPAN. Option OI differs because each strike and each CE or PE is a separate contract, and its premium depends on IV and time decay as well as the index.`,
    example: {
      title: 'Four sessions on NIFTY futures (illustrative)',
      text: `Start: price ${f(base.px)}, OI ${f(base.oi)} lots. Long build-up: price ${f(lb.px)} (+${p2(lb.pxPct)}%), OI ${f(lb.oi)} lots (+${p1(lb.oiPct)}%). Short build-up: price ${f(sb.px)} (${p2(sb.pxPct)}%), OI ${f(sb.oi)} (+${p1(sb.oiPct)}%). Short covering: price ${f(sc.px)} (+${p2(sc.pxPct)}%), OI ${f(sc.oi)} (${p1(sc.oiPct)}%). Long unwinding: price ${f(lu.px)} (${p2(lu.pxPct)}%), OI ${f(lu.oi)} (${p1(lu.oiPct)}%). At 65 units a lot, the ${f(lb.doi)} lots added in the first case are ${f(lb.doi * LOT)} units, about ₹${crore(notional(lb.doi, lb.px))} crore of notional.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Futures: price and OI together',
      caption: 'Columns: OI change. Rows: price change. These labels fit futures; they are not rules for option-chain OI.',
      xLabels: ['OI rises', 'OI falls'],
      yLabels: ['Price rises', 'Price falls'],
      cells: [
        { head: 'Long build-up', note: 'Buyers look more active, new contracts created', tone: 'bull' },
        { head: 'Short covering', note: 'Contracts closing as price rises', tone: 'ice' },
        { head: 'Short build-up', note: 'Sellers look more active, new contracts created', tone: 'bear' },
        { head: 'Long unwinding', note: 'Contracts closing as price falls', tone: 'neutral' },
      ],
    },
    optionChain: `On the option chain, do not apply these four labels to the OI of a strike without thinking. A call strike's OI can rise while the index rises, because call writers sell into the rally, and a put strike's OI can rise while the index falls, because of hedging buyers. Option reading adds the premium and IV, which is what Module 7.4 covers. The futures chain itself is a separate table showing price, OI and change in OI per expiry month, and that is where these four labels belong.`,
    psychology: `Labels feel like answers. A trader sees long build-up and thinks buyers are winning, forgetting the sellers on the other side of every contract. Another trader chases a short covering rally as if it were fresh buying, and gets caught when the covering ends and OI stops falling. The useful attitude is to treat the label as a question: who is more urgent right now, and will they still be tomorrow.`,
    scenarios: {
      bullish: `A steady rally with OI rising day after day is read as long build-up and may continue while fresh participation keeps coming. A rally where OI falls is read as short covering, which can fade quickly once the covering is done.`,
      bearish: `A steady fall with OI rising is read as short build-up and may continue while sellers keep adding. A fall where OI shrinks is read as long unwinding, which can end when the exits are complete.`,
      sideways: `In a range, price oscillates and OI drifts. The four labels flip from session to session and carry little information. Near expiry, OI also falls because of rollover to the next month, which is not unwinding.`,
    },
    practice: [
      {
        q: `NIFTY futures move from ${f(base.px)} to ${f(lb.px)} while OI goes from ${f(base.oi)} to ${f(lb.oi)} lots. Name the pattern and compute both percentage changes.`,
        a: `Price up, OI up: long build-up. Price change = ${f(lb.px)} − ${f(base.px)} = +${lb.dpx} points = +${p2(lb.pxPct)}%. OI change = ${f(lb.doi)} lots = +${p1(lb.oiPct)}%.`,
      },
      {
        q: `Price falls ${f(base.px)} to ${f(lu.px)} and OI falls ${f(base.oi)} to ${f(lu.oi)} lots. Name the pattern, and the OI change in units.`,
        a: `Price down, OI down: long unwinding. OI change = ${f(lu.doi)} lots × ${LOT} = ${f(lu.doi * LOT)} units (a reduction of ${f(Math.abs(lu.doi * LOT))} units).`,
      },
      {
        q: `A trader shorted one lot at ${f(base.px)} and the market fell to ${f(sb.px)}. What was the P&L before charges, and why is the 'short build-up' label not proof that she profited?`,
        a: `P&L = (${f(base.px)} − ${f(sb.px)}) × ${LOT} = ${sb.dpx === 0 ? 0 : f(shortPnl)} rupees profit before charges. The label describes the overall market. Her own entry price, size and exit decide her result, and some of the sellers who built the OI may have sold lower or covered early.`,
      },
      {
        q: `A call strike's OI rises ${f(optDoi)} lots (${p1(optPct)}%) while its premium falls from ₹${optCall.prem0} to ₹${optCall.prem1}. Why is this not a 'long build-up'?`,
        a: `OI up with premium down is more consistent with fresh call writing, which is bearish-to-neutral on that strike. The futures label looks only at the index and would call a rising index with rising OI bullish. Option OI needs the premium, IV and strike context.`,
      },
    ],
    assignment: `Open the NIFTY futures page of any broker or NSE for the current month. For five consecutive sessions, write price change and OI change at the close, and tag each day with one of the four labels. At the end, write one session where the label seemed right next day and one where it did not, and one reason it may have failed.`,
  },
  topics: [
    {
      t: 1,
      def: `Long build-up is when futures price rises and OI also rises. New contracts are being created and buyers are the more urgent side. Traders read it as fresh long positions entering.`,
      hi: `Long build-up tab hota hai jab futures price badhta hai aur OI bhi badhta hai. Naye contracts ban rahe hain aur buyers zyada jaldi mein dikh rahe hain. Traders ise naye long positions ke aane ka sanket maante hain.`,
      how: `Each new lot of OI is one new buyer and one new seller. Price rises when buyers accept sellers' asking prices, so aggression is on the buy side. Because new contracts are being created, money is being committed, with margin collected under SPAN and exposure margin. Participants also include hedgers and arbitrageurs, so some of the new longs may be offset by a cash-market position. The pattern says buyers were more urgent, not that the move will last.`,
      eg: {
        title: 'A long build-up day (illustrative)',
        text: `Price ${f(base.px)} to ${f(lb.px)} (+${p2(lb.pxPct)}%), OI ${f(base.oi)} to ${f(lb.oi)} lots (+${p1(lb.oiPct)}%). One lot costs about ₹${f(lb.lotVal)} of notional at ${f(lb.px)} × ${LOT}. A trader who bought one lot at ${f(base.px)} gains ${f(lb.dpx)} × ${LOT} = ₹${f(longPnl)} before charges. The ${f(lb.doi)} added lots are ${f(lb.doi * LOT)} units.`,
      },
      tip: `Every long has a short; long build-up only says buyers were more aggressive, not that sellers lost.`,
      visual: { kind: 'candles', title: 'Long build-up: rising price, rising OI', caption: 'Candles climb while OI keeps adding.', pattern: 'uptrend' },
      calc: { id: 'oi-buildup', preset: { priceChangePct: Number(p2(lb.pxPct)), oiChangePct: Number(p1(lb.oiPct)) }, why: 'Classifies the price and OI change of the example as long build-up.' },
    },
    {
      t: 2,
      def: `Short build-up is when futures price falls and OI rises. New contracts are being created and sellers are the more urgent side. Traders read it as fresh short positions entering.`,
      hi: `Short build-up tab hota hai jab futures price girta hai aur OI badhta hai. Naye contracts ban rahe hain aur sellers zyada jaldi mein dikh rahe hain. Traders ise naye short positions ke aane ka sanket maante hain.`,
      how: `New OI means a new buyer and a new seller. Price falls because sellers are hitting bids, so aggression is on the sell side. Shorts in futures are used both for directional views and for hedging a cash portfolio, so not every short build-up is a bearish opinion. A beta hedge by a fund is also a short build-up. Margin for shorts is collected under the same SPAN framework as for longs.`,
      eg: {
        title: 'A short build-up day (illustrative)',
        text: `Price ${f(base.px)} to ${f(sb.px)} (${p2(sb.pxPct)}%), OI ${f(base.oi)} to ${f(sb.oi)} lots (+${p1(sb.oiPct)}%). A trader who sold one lot at ${f(base.px)} gains ${f(Math.abs(sb.dpx))} × ${LOT} = ₹${f(shortPnl)} before charges. If price had instead risen the same ${f(Math.abs(sb.dpx))} points, the same short would have lost ₹${f(shortPnl)}.`,
      },
      tip: `A fund hedging a cash portfolio also creates short build-up, so it is not always a bearish bet.`,
      visual: { kind: 'candles', title: 'Short build-up: falling price, rising OI', pattern: 'downtrend' },
      calc: { id: 'oi-buildup', preset: { priceChangePct: Number(p2(sb.pxPct)), oiChangePct: Number(p1(sb.oiPct)) }, why: 'Classifies the example as short build-up.' },
    },
    {
      t: 3,
      def: `Short covering is when futures price rises and OI falls. Contracts are being closed, and the closing is consistent with short sellers buying back. It can lift price without new buyers arriving.`,
      hi: `Short covering tab hoti hai jab futures price badhta hai aur OI ghatta hai. Contracts close ho rahe hain aur yeh shorts ke wapas khareedne se match karta hai. Isse naye buyers aaye bina bhi price upar ja sakta hai.`,
      how: `OI falls only when both sides close. A short closes by buying, and that buying pushes price up while OI shrinks. The rise lasts only while shorts still need to cover. Once the shorts are gone, the buying pressure disappears, which is why such rallies can stall. Because both sides close, the label is a guess: some of the lots closed may be longs selling to shorts who are covering.`,
      eg: {
        title: 'A short covering day (illustrative)',
        text: `Price ${f(base.px)} to ${f(sc.px)} (+${p2(sc.pxPct)}%), OI ${f(base.oi)} to ${f(sc.oi)} lots (${p1(sc.oiPct)}%). ${f(Math.abs(sc.doi))} lots closed, equal to ${f(Math.abs(sc.doi) * LOT)} units. Compare with the long build-up case: price rose more there (+${p2(lb.pxPct)}%) and OI rose, so more fresh money backed the move than here.`,
      },
      tip: `A rally with falling OI has no fresh money behind it, so do not treat it like a long build-up.`,
      visual: { kind: 'bars', title: 'OI before and after (lots)', unit: ' lots', caption: 'Price up while OI shrinks.', items: [{ label: 'OI before', value: base.oi, tone: 'neutral' }, { label: 'OI after', value: sc.oi, tone: 'ice' }] },
      calc: { id: 'oi-buildup', preset: { priceChangePct: Number(p2(sc.pxPct)), oiChangePct: Number(p1(sc.oiPct)) }, why: 'Classifies the example as short covering.' },
    },
    {
      t: 4,
      def: `Long unwinding is when futures price falls and OI also falls. Contracts are being closed, and the closing is consistent with long holders selling out. It can push price down without new sellers arriving.`,
      hi: `Long unwinding tab hoti hai jab futures price girta hai aur OI bhi ghatta hai. Contracts close ho rahe hain aur yeh longs ke bechkar nikalne se match karta hai. Isse naye sellers aaye bina bhi price neeche aa sakta hai.`,
      how: `A long closes by selling, and that selling pushes price down while OI shrinks. It is often driven by profit booking, stop-losses or margin calls. When the exits are complete, the selling stops, so such falls can end quickly. As with short covering, the closing lots can be longs and shorts both, so the label is a reasonable guess, not a measurement. Around expiry, falling OI is also due to rollover to the next month and settlement, and should not be tagged as unwinding.`,
      eg: {
        title: 'A long unwinding day (illustrative)',
        text: `Price ${f(base.px)} to ${f(lu.px)} (${p2(lu.pxPct)}%), OI ${f(base.oi)} to ${f(lu.oi)} lots (${p1(lu.oiPct)}%). ${f(Math.abs(lu.doi))} lots closed, ${f(Math.abs(lu.doi) * LOT)} units. A trader who was long one lot from ${f(base.px)} and exits at ${f(lu.px)} loses ${f(Math.abs(lu.dpx))} × ${LOT} = ₹${f(Math.abs(lu.dpx) * LOT)} before charges.`,
      },
      tip: `Check the date: near expiry, OI drops because of rollover, and that is not long unwinding.`,
      visual: { kind: 'compare', title: 'Unwinding versus build-up on a fall', left: { head: 'Long unwinding', tone: 'neutral', points: ['Price down, OI down', 'Contracts closing', 'Selling may fade when exits end'] }, right: { head: 'Short build-up', tone: 'bear', points: ['Price down, OI up', 'New contracts opening', 'Fresh sellers behind the move'] } },
      calc: { id: 'oi-buildup', preset: { priceChangePct: Number(p2(lu.pxPct)), oiChangePct: Number(p1(lu.oiPct)) }, why: 'Classifies the example as long unwinding.' },
    },
  ],
}
export default m
