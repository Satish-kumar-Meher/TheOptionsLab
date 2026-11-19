import type { ModuleLesson } from '../topicLessonTypes'

/* Module 12.3 — Futures and Options Relationship.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification).
 * Option OI changes cannot show whether buyers or sellers initiated the trade; the reads below are hypotheses. */
const m: ModuleLesson = {
  moduleId: '12.3',
  intro: `Futures show where traders are willing to carry a view; options show where they pay or collect for it. Looking at both together can strengthen or weaken a story. Because option OI cannot show who initiated a trade, every combination here is a hypothesis to be checked, not a conclusion.`,
  introHi: `Futures dikhate hain ki traders kahan apna view carry karne ko tayyar hain; options dikhate hain ki woh uske liye kahan premium dete ya lete hain. Dono ko saath dekhne se kahani majboot ya kamzor ho sakti hai. Option OI se yeh nahi pata chalta ki trade kisne shuru kiya, isliye har combination ek hypothesis hai, conclusion nahi.`,
  steps: {
    concept: `When futures move and option activity at strikes moves in a consistent way, the evidence for a view is better than either alone. When they disagree, the market is sending mixed signals and a smaller position or a wait is often the sensible response. The comparison includes futures basis, implied volatility and the hedging flows of option market makers.`,
    conceptHi: `Jab futures ki move aur strikes par option activity ek hi disha mein ho, toh view ke liye saboot akele se behtar hota hai. Jab dono mein matbhed ho, toh market mixed signal de raha hai aur chhoti position ya intezaar aksar samajhdari hoti hai. Isme futures basis, implied volatility aur option market makers ki hedging flows bhi shaamil hain.`,
    mechanism: `Futures price comes from spot plus the cost of carry. Option prices come from spot, strike, time, volatility and rates. Both are linked by arbitrage, so large gaps tend to be closed by traders who buy one and sell the other. Option market makers who take the other side of client trades hedge their delta, often with index futures, so options activity can feed back into futures volume. OI at a strike shows the number of open contracts and not whether they were written or bought.`,
    example: {
      title: 'Consistent futures and chain (illustrative)',
      text: `NIFTY futures rise from 24,000 to 24,120 (+0.5%) on OI +8%. On the chain, 24,000 PE OI rises by 10,00,000 and 24,200 CE OI falls by 6,00,000. One reading: put writers are adding support below and call writers are retreating above. A second reading: put buyers are hedging longs. Both are possible, so the trader checks premium change and price behaviour near 24,000 before acting.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Futures and option OI together',
      caption: 'Hypotheses only; premium change and price action are needed to confirm who was the writer or buyer.',
      xLabels: ['Futures up', 'Futures down'],
      yLabels: ['Put OI rises or call OI falls', 'Call OI rises or put OI falls'],
      cells: [
        { head: 'Supportive', note: 'PE writing or CE unwinding', tone: 'bull' },
        { head: 'Mixed', note: 'Futures fall while puts are added: hedging or dip-buying', tone: 'neutral' },
        { head: 'Mixed', note: 'Futures rise while calls are added: caps or fresh buying', tone: 'neutral' },
        { head: 'Supportive', note: 'CE writing or PE unwinding', tone: 'bear' },
      ],
    },
    optionChain: `The chain gives OI and change in OI per strike, plus premium and IV. Scan for strikes where OI is rising fast and compare with the direction of futures. Check LTP change: if OI rises and premium falls, writers are likelier; if OI rises and premium rises, buyers are likelier. This is a rough guide and not proof, since premium also moves with the index and volatility.`,
    psychology: `Writers who see futures rising against their short calls feel pressure and may cover. Writers of puts feel confident when futures rise and may add more. Option buyers chasing a move can push premiums up. Beginners often assume the strike with the highest OI is where the market must stop. It is a possible level, not a wall.`,
    scenarios: {
      bullish: `Futures rise on a long build-up, put OI rises below, and call OI above stops growing or falls. The picture is consistent. It can fail if the new put OI was buyers hedging and the rally is short covering.`,
      bearish: `Futures fall on a short build-up, call OI rises above and put OI below falls. The picture is consistent with caution. A sharp bounce is possible if the call OI comes from covered writers who are not directional.`,
      sideways: `Futures barely move, OI builds on both sides, and IV drifts down. Writers on both sides are comfortable with a range. A breakout can trigger quick unwinding of one side.`,
    },
    practice: [
      { q: `Total put OI is 1,20,00,000 and call OI is 1,00,00,000 contracts. Find the OI PCR and say what it does and does not show.`, a: `PCR = 1,20,00,000 / 1,00,00,000 = 1.2. It shows more put OI than call OI. It does not show who wrote or bought them, so it is not a forecast.` },
      { q: `A trader sold the 24,200 CE at ₹80. NIFTY expires at 24,300. What is the result for one lot of 65?`, a: `Payoff = 80 − (24,300 − 24,200) = 80 − 100 = −₹20 per unit. Loss = 20 × 65 = ₹1,300, before charges.` },
      { q: `Spot is 24,000. Futures with 30 days left trade at 24,120. Fair value is about 24,103 at r = 6.5% and dividend yield 1.3%. What are the basis and the gap from fair value?`, a: `Basis = 24,120 − 24,000 = 120 points. Gap from fair value = 24,120 − 24,103 = about 17 points. A 17 point gap is small and may be absorbed by costs and demand.` },
      { q: `Why can options activity affect futures volume?`, a: `Market makers who sell options hedge their delta, often with index futures. As the index moves and delta changes, they adjust the hedge, which creates futures trades.` },
    ],
    assignment: `Pick one trading day. Note the NIFTY futures price and OI change, then list the three strikes with the largest change in call OI and put OI. Write one paragraph comparing them, state which interpretation (writers vs buyers) is more likely using the premium change, and add one sentence on what would prove you wrong.`,
  },
  topics: [
    {
      t: 1,
      def: `Futures direction versus CE/PE activity means comparing which way futures are moving with where call and put OI is being added or removed. When both tell the same story the view is stronger.`,
      hi: `Futures direction vs CE/PE activity ka matlab yeh dekhna ki futures kis taraf ja rahe hain aur call-put OI kahan add ya kam ho raha hai. Jab dono ek hi kahani kahein toh view majboot hota hai.`,
      how: `Start with the futures read (price, OI, volume). Then check the chain: where is change in OI largest on the call side and the put side, relative to spot? Fresh put OI below spot with falling or flat call OI above is consistent with a rising futures price. The mirror image is consistent with a fall. Because OI cannot show who initiated the trade, the chain suggests possible levels, not certainty.`,
      eg: {
        title: 'Matching story (illustrative)',
        text: `Futures +0.5% with OI +8%. Total put OI 1,20,00,000 and call OI 1,00,00,000 give an OI PCR of 1.2. Biggest put addition is at 24,000 PE (+10,00,000) and biggest call change is at 24,200 CE (−6,00,000). The chain agrees with the futures, but PCR on its own does not predict direction.`,
      },
      tip: `Agreement between futures and the chain strengthens a view. It never confirms it.`,
      visual: { kind: 'oi', title: 'Chain around spot (illustrative, lakh contracts)', spot: 24100, rows: [
        { strike: 23900, ce: 12, pe: 38 },
        { strike: 24000, ce: 18, pe: 55 },
        { strike: 24100, ce: 30, pe: 32 },
        { strike: 24200, ce: 34, pe: 14 },
        { strike: 24300, ce: 40, pe: 8 },
      ] },
      calc: { id: 'pcr', preset: { putOI: 12000000, callOI: 10000000, putVol: 0, callVol: 0 }, why: 'Compute the OI PCR for the example.' },
    },
    {
      t: 2,
      def: `Futures buying with CE unwinding means futures rise while open interest at call strikes falls. It can mean call writers are buying back their short calls as the market moves against them.`,
      hi: `Futures buying ke saath CE unwinding ka matlab futures upar ja rahe hain aur call strikes par OI gir raha hai. Ho sakta hai call writers market apne khilaf jaane se apne short calls wapas khareed rahe hon.`,
      how: `A call writer loses money as the index rises toward and above the strike. Writers often buy back (cover) to cap losses, and that buying pushes call premiums higher. Falling call OI can also come from call buyers selling, so check premium: a call premium that falls with OI points to buyers exiting, while one that rises while OI falls points to writers covering. Covering can add fuel to a rise but runs out once the writers are out.`,
      eg: {
        title: 'Covering a short call (illustrative)',
        text: `NIFTY futures rise 0.5% to 24,120. A writer sold the 24,200 CE at ₹80 (24,200 CE OI falls 6,00,000 on the day, a 15% fall from 40,00,000). If the index expires at 24,300 the writer loses (100 − 80) × 65 = ₹1,300 per lot. A writer who covered earlier at ₹120 loses (120 − 80) × 65 = ₹2,600.`,
      },
      tip: `Falling call OI is either writers covering or buyers selling. Premium direction helps tell them apart.`,
      visual: { kind: 'flow', title: 'Rising futures and call covering', steps: [
        { label: 'Futures rise', note: 'Index moves up', tone: 'bull' },
        { label: 'Short calls lose', note: 'Writers under pressure', tone: 'neutral' },
        { label: 'Writers buy back', note: 'CE OI falls', tone: 'gold' },
        { label: 'Call premium up', note: 'Adds to buying', tone: 'bull' },
      ] },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'sell', strike: 24200, premium: 80, expiryPrice: 24300, lotSize: 65, lots: 1 }, why: 'Loss of a short 24,200 CE at 24,300.' },
    },
    {
      t: 3,
      def: `Futures selling with PE unwinding means futures fall while open interest at put strikes falls. It can mean put writers are exiting as the market moves against them.`,
      hi: `Futures selling ke saath PE unwinding ka matlab futures gir rahe hain aur put strikes par OI kam ho raha hai. Ho sakta hai put writers market ke khilaf jaane se apni positions se bahar nikal rahe hon.`,
      how: `A put writer loses as the index falls toward and below the strike. When the index nears a heavily written strike, many writers may close or stop out together. Their buying back of puts raises put premiums and removes OI, while their stop-outs are often accompanied by hedging in futures. Falling put OI can also be buyers selling, so premium direction is needed to separate them.`,
      eg: {
        title: 'Put writers exit (illustrative)',
        text: `Futures fall 0.5% to 23,880. The 23,900 PE OI falls from 35,00,000 to 28,00,000 (−7,00,000, a 20% fall). A writer who sold the 23,900 PE at ₹70 and bought it back at ₹150 loses (150 − 70) × 65 = ₹5,200 per lot, before charges.`,
      },
      tip: `Put writers do not always win. When a heavily written strike breaks, the unwinding can speed the fall.`,
      visual: { kind: 'flow', title: 'Falling futures and put exits', steps: [
        { label: 'Futures fall', note: 'Index moves down', tone: 'bear' },
        { label: 'Short puts lose', note: 'Writers under pressure', tone: 'neutral' },
        { label: 'Writers buy back', note: 'PE OI falls', tone: 'gold' },
        { label: 'Put premium up', note: 'More stress', tone: 'bear' },
      ] },
      calc: { id: 'option-pnl', preset: { optType: 'PE', side: 'sell', strike: 23900, premium: 70, expiryPrice: 23750, lotSize: 65, lots: 1 }, why: 'Short 23,900 PE if the index ends at 23,750.' },
    },
    {
      t: 4,
      def: `Futures buying with PE writing means futures rise while put OI rises. It is read as writers selling puts because they expect the index to stay above that strike.`,
      hi: `Futures buying ke saath PE writing ka matlab futures badh rahe hain aur put OI bhi badh raha hai. Ise aise padhte hain ki writers puts bech rahe hain kyunki unhe lagta hai index us strike ke upar rahega.`,
      how: `Put writers collect premium and profit if the index stays above the strike. Their rising presence below the market makes that area a possible support, as many of them defend the strike by adding or hedging. It is less reliable if the OI rise came from put buyers hedging longs. Check that put premiums are falling while OI rises, which would lean toward writers. The level can fail, especially on news.`,
      eg: {
        title: 'Writing puts into strength (illustrative)',
        text: `Futures at 24,120. 24,000 PE OI rises 10,00,000 (from 55,00,000, +18%). A writer sold the 24,000 PE at ₹60. If NIFTY expires at 24,200 the PE expires worthless and the writer keeps 60 × 65 = ₹3,900 per lot. If NIFTY expired at 23,800 the writer would lose (200 − 60) × 65 = ₹9,100.`,
      },
      tip: `Gain is capped at the premium; loss is not. A writer's profit is limited while the downside can be large.`,
      visual: { kind: 'payoff', title: 'Short 24,000 PE at ₹60', spot: 24000, legs: [{ type: 'PE', side: -1, strike: 24000, premium: 60 }] },
      calc: { id: 'option-pnl', preset: { optType: 'PE', side: 'sell', strike: 24000, premium: 60, expiryPrice: 24200, lotSize: 65, lots: 1 }, why: 'Premium kept if the PE expires worthless.' },
    },
    {
      t: 5,
      def: `Futures selling with CE writing means futures fall while call OI rises. It is read as writers selling calls because they expect the index to stay below that strike.`,
      hi: `Futures selling ke saath CE writing ka matlab futures gir rahe hain aur call OI badh raha hai. Ise aise padhte hain ki writers calls bech rahe hain kyunki unhe lagta hai index us strike ke neeche rahega.`,
      how: `Call writers collect premium and profit if the index stays below the strike. A growing amount of call OI above spot during a fall can act as a possible resistance, but call OI could also be buyers speculating on a rebound. Premium behaviour helps: falling call premium with rising OI leans toward writing. The level can break on a strong rally, forcing writers to cover.`,
      eg: {
        title: 'Writing calls into weakness (illustrative)',
        text: `Futures fall to 23,880. The 24,200 CE OI rises by 8,00,000 (from 40,00,000, +20%). A writer sold the 24,200 CE at ₹90. If NIFTY expires at 23,900, the call expires worthless and the writer keeps 90 × 65 = ₹5,850 per lot. If NIFTY expired at 24,500 the loss is (300 − 90) × 65 = ₹13,650.`,
      },
      tip: `Resistance at a heavy call strike is possible, not guaranteed. Strong news can push through it.`,
      visual: { kind: 'payoff', title: 'Short 24,200 CE at ₹90', spot: 24000, legs: [{ type: 'CE', side: -1, strike: 24200, premium: 90 }] },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'sell', strike: 24200, premium: 90, expiryPrice: 23900, lotSize: 65, lots: 1 }, why: 'Premium kept when the call expires worthless.' },
    },
    {
      t: 6,
      def: `Futures and option-chain divergence is when the futures story and the option story disagree. For example futures rise on a long build-up, but call OI also rises sharply just above spot.`,
      hi: `Futures aur option-chain divergence tab hota hai jab futures ki kahani aur option ki kahani ek doosre se alag ho. Jaise futures long build-up ke saath badh rahe hain, lekin spot ke thoda upar call OI bhi tezi se badh raha hai.`,
      how: `Divergence means at least one of the two reads is wrong, or two groups hold different views. Examples: futures up with heavy new call OI above (writers expect a cap), or futures down with heavy put OI added below (writers or hedgers defend a floor). A divergence is a caution flag and a reason to reduce size, wait for a close beyond the level, or look at premium and IV for tie-breaks. It does not mean either side is correct.`,
      eg: {
        title: 'Mixed signals (illustrative)',
        text: `Futures rise 0.4% with OI +5%. The 24,200 CE OI adds 12,00,000 (+30%) while 24,000 PE adds only 2,00,000 (+3.6% of 55,00,000). The futures say buyers, the chain suggests a cap forming near 24,200. A trader may wait for a close above 24,200 with falling call OI before acting.`,
      },
      tip: `When signals disagree, the best action is often a smaller position or no trade.`,
      visual: { kind: 'compare', title: 'Divergence', left: { head: 'Futures say', tone: 'bull', points: ['Price up 0.4%', 'OI up 5%', 'Volume above average'] }, right: { head: 'Chain says', tone: 'neutral', points: ['Call OI +30% at 24,200', 'Put OI little changed', 'Possible cap near 24,200'] } },
    },
    {
      t: 7,
      def: `The spot-futures basis is the futures price minus the spot index. Changes in the basis show how traders are pricing carry and demand for exposure.`,
      hi: `Spot-futures basis ka matlab futures price minus spot index. Basis mein badlav dikhata hai ki traders carry aur exposure ki demand ko kaise price kar rahe hain.`,
      how: `Theory says futures fair value is spot grown at the interest rate less the expected dividend yield for the time left. Real futures trade around this value. A basis wider than fair value can mean strong demand to hold long exposure; a narrower or negative basis can mean hedging or selling pressure. Arbitrageurs buy cash and sell futures (or the reverse) when gaps are large, which pulls prices back. The basis shrinks towards zero as expiry nears.`,
      eg: {
        title: 'Basis check (illustrative)',
        text: `Spot 24,000, futures 24,120, 30 days to expiry. Basis = 120 points (0.5%). At r = 6.5% and dividend yield 1.3%, fair value = 24,000 × e^(0.052 × 30/365) = about 24,103. Futures are about 17 points above fair value. A gap of 17 points is small and may be eaten up by costs.`,
      },
      tip: `An apparent mispricing is not free money. Costs, margins and execution risk matter.`,
      visual: { kind: 'bars', title: 'Spot, fair value and futures (points)', unit: '', items: [
        { label: 'Spot', value: 24000, tone: 'neutral' },
        { label: 'Fair value (30d)', value: 24103, tone: 'ice' },
        { label: 'Futures', value: 24120, tone: 'gold' },
      ] },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24120, rate: 6.5, days: 30, dividend: 1.3 }, why: 'Fair value and basis for the example.' },
    },
    {
      t: 8,
      def: `Futures and IV relationships look at how implied volatility (IV, the volatility priced into options) and India VIX move with futures price. A falling market with rising IV usually shows demand for protection.`,
      hi: `Futures aur IV ke relationship mein dekhte hain ki implied volatility (options mein price hui volatility) aur India VIX futures price ke saath kaise chalte hain. Girta market aur badhta IV aksar protection ki demand dikhata hai.`,
      how: `IV and index price often move in opposite directions: falls bring hedging demand and higher IV; steady rises bring lower IV. India VIX shows expected volatility, not direction. Rising IV with a flat market can mean the market expects an event. IV changes also reshape option premiums regardless of futures direction, so a long option can lose despite the right direction if IV drops (vega). Use expected move to put IV into index points.`,
      eg: {
        title: 'IV into points (illustrative)',
        text: `NIFTY 24,000 with India VIX 14: expected move over 7 days = 24,000 × 0.14 × √(7/365) = about ±465 points (one standard deviation). If VIX rises to 16, the expected move is about ±532 points. The options are pricing a wider range even though futures have not moved.`,
      },
      tip: `VIX measures expected size of moves, not direction. Combine it with futures and OI for context.`,
      visual: { kind: 'gauge', title: 'India VIX (illustrative reading)', min: 8, max: 30, value: 14, zones: [
        { from: 8, to: 13, label: 'Calm', tone: 'ice' },
        { from: 13, to: 20, label: 'Normal', tone: 'neutral' },
        { from: 20, to: 30, label: 'Stressed', tone: 'gold' },
      ] },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 7 }, why: 'Convert VIX into a one-week expected move.' },
    },
    {
      t: 9,
      def: `Futures and dealer hedging describes how market makers who take the other side of option trades hedge their delta using index futures. Their hedge changes as the index moves.`,
      hi: `Futures aur dealer hedging ka matlab option trades ke doosri taraf baithe market makers apna delta index futures se hedge karte hain. Index ke hilne par unka hedge badalta rehta hai.`,
      how: `Delta tells how much an option's price changes for a one-point index move. A dealer who sold calls is net short delta, so he buys futures to become neutral, and adjusts as delta changes with price and time. Gamma shows how fast delta changes. These flows are one part of futures volume and are not directly visible. Do not assume a specific dealer position from OI, since dealers' books also include other trades.`,
      eg: {
        title: 'Delta hedge (illustrative)',
        text: `A dealer sold 100 lots (6,500 units) of the 24,000 CE with 7 days left. Black-Scholes delta is about 0.524, so exposure is −0.524 × 6,500 = −3,406 units. Buying about 52 lots of futures (3,380 units) leaves net delta near −26 units. If NIFTY rises, delta rises and he has to buy more futures.`,
      },
      tip: `Hedging flows exist but cannot be observed from the chain. Treat stories about them as hypotheses.`,
      visual: { kind: 'flow', title: 'Dealer hedge loop', steps: [
        { label: 'Client buys call', note: 'Dealer sells it', tone: 'ice' },
        { label: 'Dealer net short delta', note: '-3,406 units', tone: 'neutral' },
        { label: 'Dealer buys futures', note: '52 lots', tone: 'gold' },
        { label: 'Re-hedge as index moves', note: 'Delta changes', tone: 'ice' },
      ] },
      calc: { id: 'portfolio-delta', preset: { d1: 0.524, q1: -6500, d2: 1, q2: 3380, d3: 0, q3: 0 }, why: 'Net delta after the futures hedge.' },
    },
  ],
  tools: [{ id: 'pcr', why: 'PCR from OI and volume.' }, { id: 'basis-fair-value', why: 'Futures fair value and basis.' }, { id: 'greeks', why: 'Delta and gamma for hedging.' }],
}
export default m
