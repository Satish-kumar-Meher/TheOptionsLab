import type { ModuleLesson } from '../topicLessonTypes'

/* Module 7.6 — Important OI Limitations.
 * Illustrative NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). OI in lots. All derived numbers computed below. */
const f = (n: number) => n.toLocaleString('en-IN')
const p1 = (n: number) => n.toFixed(1)
const p2 = (n: number) => n.toFixed(2)
const LOT = 65
const pct = (a: number, b: number) => ((b - a) / a) * 100

// t1: one 500-lot trade, same OI effect whoever initiates
const trade = { lots: 500, px: 96.4 }
const tradeUnits = trade.lots * LOT
const tradeValue = tradeUnits * trade.px
// t2: a strike with 40,000 lots OI
const oi = 40000
const oiUnits = oi * LOT
// premium mirror P&L: 24,100 CE sold/bought at 96.40, expiry 24,300
const K = 24100, prem = 96.4, exp = 24300
const intrinsic = Math.max(exp - K, 0)
const buyerPnl = (intrinsic - prem) * LOT
const sellerPnl = -buyerPnl
// t3: a call spread adds OI on both legs
const spreadLots = 800
const spreadOiAdded = spreadLots * 2
// t4: falling OI possibilities
const strikeBefore = 90000, strikeAfter = 72000
const fall = strikeBefore - strikeAfter
const fallPct = pct(strikeBefore, strikeAfter)
// t5: delay: OI shown vs final
const shown = 81000, finalOi = 84500
const gap = finalOi - shown
const gapPct = (gap / finalOi) * 100
// t6: combine
const oiAdd = 12000
const prem0 = 80, prem1 = 68
const premPct = pct(prem0, prem1)
// t7: total vs change
const tot = 1500000, chg = 30000
const prevTot = tot - chg
const chgPct = (chg / prevTot) * 100
const tot2 = 60000, chg2 = 30000
const prevTot2 = tot2 - chg2
const chg2Pct = (chg2 / prevTot2) * 100

const m: ModuleLesson = {
  moduleId: '7.6',
  intro: `Open interest is useful, but it is easy to ask too much of it. It counts open contracts, not who started them, not why, and not whether the counterparty is the same type of trader. This module lists seven limits so that you treat every OI reading as a hypothesis to be confirmed with price, volume, IV and the wider picture.`,
  introHi: `Open interest kaam ki cheez hai, lekin isse zyada umeed karna aasaan hai. Yeh sirf open contracts ginta hai, yeh nahi batata ki trade kisne shuru kiya, kyun kiya, ya samne wala kis type ka trader hai. Is module mein saat limits hain, taaki aap har OI reading ko ek hypothesis maanein jise price, volume, IV aur bade picture se confirm karna hai.`,
  steps: {
    concept: `OI is the count of contracts that are open and not yet closed or settled. Because each contract is a pair of one buyer and one seller, a change in OI cannot say which of the two initiated the trade. Rising OI does not equal writing, falling OI does not equal sellers leaving, and data can arrive late. The cure is to combine OI with price, volume, IV and trade direction, and to read total OI and its change together.`,
    conceptHi: `OI woh contracts ki ginti hai jo open hain, close ya settle nahi hue. Har contract ek buyer aur ek seller ki jodi hota hai, isliye OI ka change yeh nahi bata sakta ki trade kisne initiate kiya. OI badhna matlab writing nahi hota, OI ghatna matlab sellers nikal gaye yeh bhi nahi, aur data late bhi aa sakta hai. Ilaaj yeh hai ki OI ko price, volume, IV aur trade direction ke saath milakar padhein, aur total OI aur uske change ko saath dekhein.`,
    mechanism: `When any trade matches, the exchange records a buyer and a seller. If both are opening, OI rises by the traded quantity. If both are closing, OI falls. If one is opening and the other closing, OI is unchanged. The record shows the match, not who aggressed, since aggressor data sits in the order book and trade feed, not in OI. NSE and the clearing corporation NSCCL publish OI with the ongoing session and a final end-of-day figure, and vendors repackage it with their own delay.`,
    example: {
      title: 'One trade, three possible stories (illustrative)',
      text: `A ${f(trade.lots)}-lot trade in the 24,100 CE prints at ₹${trade.px}, which is ${f(tradeUnits)} units and ₹${f(Math.round(tradeValue))} of premium. OI at that strike rises ${f(trade.lots)} lots if both sides are new. The same +${f(trade.lots)} lots can come from a buyer lifting a seller's offer, from a writer hitting a buyer's bid, or from a pair of institutions agreeing a price, and OI looks identical in all three. Only the trade feed, the premium behaviour and IV can help tell the stories apart, and even then not with certainty.`,
    },
    chart: {
      kind: 'layers',
      title: 'What OI can and cannot tell you',
      caption: 'Top layers need other data. OI itself only counts open contracts.',
      layers: [
        { label: 'Who is right', note: 'Not visible at all', tone: 'bear' },
        { label: 'Who initiated the trade', note: 'Needs the trade feed, not OI', tone: 'gold' },
        { label: 'Whether OI is writing or buying', note: 'Needs premium, IV, volume', tone: 'ice' },
        { label: 'How many contracts are open', note: 'This is what OI says', tone: 'bull' },
      ],
    },
    optionChain: `On the chain, OI, Change in OI, Volume, LTP and IV are separate columns precisely because OI alone is not enough. Check the data timestamp, then compare Change in OI with volume (is the change large relative to trading?), the LTP change (up or down?), and IV (rising or falling?) for the same strike. A strike where OI rose, premium fell and IV eased is more consistent with writing. A strike where OI rose, premium rose and IV rose is more consistent with buying. Neither is proof.`,
    psychology: `The mind wants a clean story, and OI looks like a clean number. A trader sees OI rising at 24,200 CE and says writers are active, then sees premium rising too and ignores it. The discipline is to name your alternative explanations before acting: could it be buying, could it be a spread, could it be a hedge, could the data be late.`,
    scenarios: {
      bullish: `A strike's call OI rises while the index rises. It can be writers selling into strength, a spread, or buyers chasing the move. Without premium and IV you cannot choose between them, so treat the rally and the OI as two separate facts.`,
      bearish: `Put OI rises while the index falls. It can be protective put buying, put writing by someone who thinks support is near, or a spread. The same OI number can describe an anxious crowd or a confident one.`,
      sideways: `In a range, OI rises across strikes as both sides add. Total OI growing says participation is growing, not who will win. Near expiry, OI at far strikes falls as contracts settle, which says nothing about direction.`,
    },
    practice: [
      {
        q: `A ${f(trade.lots)}-lot trade happens in a NIFTY option with lot size ${LOT}. How many units is that, and what is the premium value at ₹${trade.px}?`,
        a: `Units = ${f(trade.lots)} × ${LOT} = ${f(tradeUnits)}. Premium value = ${f(tradeUnits)} × ${trade.px} = ₹${f(Math.round(tradeValue))}.`,
      },
      {
        q: `A strike has ${f(oi)} lots of OI. How many long lots and short lots exist, and how many units each?`,
        a: `Every contract has a buyer and a seller, so ${f(oi)} long lots and ${f(oi)} short lots exist. Each side is ${f(oi)} × ${LOT} = ${f(oiUnits)} units.`,
      },
      {
        q: `OI at a strike drops from ${f(strikeBefore)} to ${f(strikeAfter)} lots. What is the percentage fall, and name two stories that fit.`,
        a: `Fall = ${f(fall)} lots = ${p1(Math.abs(fallPct))}%. Stories: writers buying back to book profit or cut losses, buyers selling out, or contracts settling or rolling around expiry. OI alone cannot choose.`,
      },
      {
        q: `A strike's OI rises ${f(oiAdd)} lots and its premium falls from ₹${prem0} to ₹${prem1} (${p1(premPct)}%). What does the combination suggest, and what would change your mind?`,
        a: `Rising OI with a falling premium is more consistent with fresh writing. Rising IV on that strike, a premium that starts rising, or a spread leg elsewhere in the chain would make you doubt it.`,
      },
    ],
    assignment: `Pick one strike with a large change in OI. At three times during the day, write its OI, change in OI, volume, LTP and IV. Then write two different explanations that all numbers fit, and state which extra data (trade feed, other strikes, futures OI) would help choose between them.`,
  },
  topics: [
    {
      t: 1,
      def: `OI counts open contracts. It does not record who initiated the trade, the buyer or the seller. A new contract can be created by either side being more aggressive, and OI shows the same number.`,
      hi: `OI sirf open contracts ginta hai. Yeh record nahi karta ki trade kisne initiate kiya, buyer ne ya seller ne. Naya contract kisi bhi side ke aggressive hone se ban sakta hai, aur OI mein same number dikhta hai.`,
      how: `When an order arrives on the exchange, one side rests in the order book and the other side takes it. The resting side is called the passive side and the taking side the aggressor. OI only records that a contract was created; the aggressor information is in the trade feed, which retail option chains rarely show. Some analytics try to infer the aggressor by comparing trade price to bid and ask, which is an estimate. Large block trades may also be negotiated off both sides.`,
      eg: {
        title: 'Same OI, three initiators',
        text: `A ${f(trade.lots)}-lot trade prints at ₹${trade.px} in the 24,100 CE. Case 1: a buyer lifts the offer. Case 2: a writer hits the bid. Case 3: two desks agree a price. OI rises ${f(trade.lots)} lots, ${f(tradeUnits)} units, in every case. The chain shows the same figure, so the story depends on information that is not in OI.`,
      },
      tip: `Never write 'buyers added' or 'sellers added' about an OI number without extra evidence.`,
      visual: { kind: 'flow', title: 'Three routes to the same OI rise', steps: [{ label: 'Buyer lifts offer', note: 'Aggressor: buyer', tone: 'bull' }, { label: 'Writer hits bid', note: 'Aggressor: seller', tone: 'bear' }, { label: 'Negotiated trade', note: 'No clear aggressor', tone: 'gold' }, { label: 'OI +' + f(trade.lots) + ' lots', note: 'Same on the chain', tone: 'neutral' }] },
    },
    {
      t: 2,
      def: `Every open contract has exactly one buyer and exactly one seller. So total long positions equal total short positions at every strike. OI is a count of such pairs, not a count of bullish or bearish traders.`,
      hi: `Har open contract mein ek buyer aur ek seller hamesha hota hai. Isliye har strike par total long positions aur total short positions barabar hote hain. OI in jodiyon ki ginti hai, bullish ya bearish traders ki nahi.`,
      how: `The clearing corporation NSCCL becomes the counterparty to both sides of every trade (novation), and the buyer and seller are matched by that guarantee. This is why OI 40,000 lots means 40,000 lots long and 40,000 lots short. It also means that for the buyer of an option, the seller's gain or loss is the exact mirror: option trading among all participants is a zero-sum game before charges. A strike with huge OI therefore does not mean one side dominates; it means a lot of pairs exist.`,
      eg: {
        title: 'The mirror P&L (illustrative)',
        text: `A strike holds ${f(oi)} lots OI, so ${f(oi)} lots long and ${f(oi)} short (${f(oiUnits)} units each). Take one lot of the 24,100 CE bought and sold at ₹${prem}. If NIFTY expires at ${f(exp)}, intrinsic value is ${f(exp)} − ${f(K)} = ${intrinsic} points. Buyer: (${intrinsic} − ${prem}) × ${LOT} = ₹${f(Math.round(buyerPnl))}. Seller: exactly ₹${f(Math.round(sellerPnl))}. Charges and taxes then reduce both, so the net sum is slightly negative.`,
      },
      tip: `If a chain screen says 'bulls' or 'bears' at a strike, ask what data they used, because OI itself has both on every lot.`,
      visual: { kind: 'compare', title: 'Every lot has both sides', left: { head: 'Buyer (long)', tone: 'bull', points: [`${f(oi)} lots`, 'Pays the premium', 'Loss limited to premium'] }, right: { head: 'Seller (short)', tone: 'bear', points: [`${f(oi)} lots`, 'Receives the premium', 'Risk can be large; margin is blocked'] } },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: K, premium: prem, expiryPrice: exp, lotSize: LOT, lots: 1 }, why: 'Shows the buyer P&L; the seller at the same price is the exact negative.' },
    },
    {
      t: 3,
      def: `A rise in OI does not automatically mean option writing. It only means more contracts were opened than closed. New buyers, new writers, hedgers and spread traders all raise OI.`,
      hi: `OI badhne ka matlab apne aap option writing nahi hota. Matlab sirf itna hai ki closing se zyada contracts khule. Naye buyers, naye writers, hedgers aur spread traders sab OI badha sakte hain.`,
      how: `In every new contract one person is long and one is short, so rising OI means both a new long and a new short were created. Which of them you call the 'main' participant depends on who is more motivated, and that needs other data. A bull call spread, for instance, buys one strike and sells another, so OI rises at both strikes even though the position is not simple writing at all. Hedgers and market makers also add OI as they create and offset exposure. Reading rising OI as writing without checking premium and IV is a frequent beginner error.`,
      eg: {
        title: 'A spread that raises OI at two strikes',
        text: `A trader buys ${f(spreadLots)} lots of the 24,000 CE and sells ${f(spreadLots)} lots of the 24,200 CE. The chain may show OI +${f(spreadLots)} at both strikes, together +${f(spreadOiAdded)} lots. Someone reading only the 24,200 CE column might say writers are bearish, but half of the trade is a purchase, and the net position is a limited-risk bullish spread.`,
      },
      tip: `Rising OI plus falling premium leans to writing; rising OI plus rising premium leans to buying; check at neighbouring strikes for spreads.`,
      visual: { kind: 'matrix', title: 'OI up: premium and volume help choose a story', caption: 'Columns: premium change. Rows: volume relative to the strike\'s usual level.', xLabels: ['Premium up', 'Premium down'], yLabels: ['Volume high', 'Volume low'], cells: [{ head: 'Leans to buying', note: 'Still not proof', tone: 'gold' }, { head: 'Leans to writing', note: 'Still not proof', tone: 'gold' }, { head: 'Thin trade, weak signal', note: 'Could be one small order', tone: 'neutral' }, { head: 'Thin trade, weak signal', note: 'Check neighbouring strikes for spreads', tone: 'neutral' }] },
    },
    {
      t: 4,
      def: `A fall in OI does not automatically mean sellers are exiting. OI falls only when contracts are closed, and closing involves one buyer and one seller together. It could also be settlement at expiry or a roll to another strike.`,
      hi: `OI ghatne ka matlab apne aap yeh nahi ki sellers nikal rahe hain. OI tabhi ghatta hai jab contracts close hote hain, aur closing mein ek buyer aur ek seller dono shamil hote hain. Yeh expiry par settlement ya doosre strike par roll bhi ho sakta hai.`,
      how: `For a contract to close, a buyer sells it back and a seller buys it back, or they offset each other. So a fall in OI says both a long and a short disappeared, and the narrative about who was keener to leave needs premium behaviour: a rising premium with falling OI hints at writers covering, a falling premium with falling OI hints at buyers selling out. Rolling is another cause: a writer closes the 24,200 CE and sells the 24,300 CE, so OI falls at one strike and rises at another. At expiry, in-the-money contracts settle in cash, and OI collapses, which is not about sentiment.`,
      eg: {
        title: 'OI down, many possible reasons',
        text: `A strike falls from ${f(strikeBefore)} to ${f(strikeAfter)} lots, a drop of ${f(fall)} lots (${p1(Math.abs(fallPct))}%), or ${f(fall * LOT)} units. If the premium also rose, writers covering is plausible. If the premium fell, buyers exiting is plausible. If a neighbouring strike gained ${f(fall)} lots, a roll is plausible. OI alone cannot decide.`,
      },
      tip: `Before saying 'writers are leaving', check whether another strike gained the same lots.`,
      visual: { kind: 'bars', title: 'Strike OI before and after (lots)', unit: ' lots', items: [{ label: 'Before', value: strikeBefore, tone: 'neutral' }, { label: 'After', value: strikeAfter, tone: 'ice' }, { label: 'Closed', value: fall, tone: 'gold' }] },
      calc: { id: 'return-calc', preset: { start: strikeBefore, end: strikeAfter, years: 1 }, why: `Gives the ${p1(Math.abs(fallPct))}% fall in OI.` },
    },
    {
      t: 5,
      def: `OI numbers can arrive late. The figure on a chain is a snapshot with a time stamp, and the final end-of-day figure may differ. Third-party platforms may add further delay. Decisions based on a stale snapshot can be wrong.`,
      hi: `OI ke numbers late aa sakte hain. Chain par jo figure dikhta hai woh ek snapshot hai jiske saath time hota hai, aur din ke end ka final figure alag ho sakta hai. Third-party platforms thoda aur delay add kar sakte hain. Purane snapshot par trade karna galat pad sakta hai.`,
      how: `NSE's own live option chain refreshes at intervals, and broker or vendor apps may take a further few seconds or minutes to display it, depending on how they fetch and process data. Change in OI is usually measured against the previous day's final OI, and some platforms re-base it differently, so two platforms can show different changes. End-of-day files and participant-wise OI are published after the session. Always check the timestamp and the platform's note, and treat exact timing claims as platform-specific.`,
      eg: {
        title: 'A stale snapshot (illustrative)',
        text: `You read a strike's OI as ${f(shown)} lots at 14:50. The figure that the exchange later finalised is ${f(finalOi)} lots, a gap of ${f(gap)} lots, ${p1(gapPct)}% of the final. If you had counted a ${f(gap)}-lot change as 'no change', you would have missed ${f(gap * LOT)} units of positions being added.`,
      },
      tip: `Write the time next to every OI number you note down, and compare numbers from the same snapshot.`,
      visual: { kind: 'timeline', title: 'Where OI numbers may lag', events: [{ when: 'Trade happens', what: 'Exchange matches the order' }, { when: 'Seconds to minutes', what: 'NSE live chain refreshes', tone: 'gold' }, { when: 'Seconds to minutes more', what: 'Broker or vendor app displays it', tone: 'gold' }, { when: 'After the session', what: 'Final end-of-day OI is available', tone: 'ice' }] },
    },
    {
      t: 6,
      def: `OI should be read together with price, volume, IV and trade direction. Each adds a piece the others lack. OI shows positions, price shows direction, volume shows activity, IV shows how expensive options are, trade direction shows who was aggressive.`,
      hi: `OI ko price, volume, IV aur trade direction ke saath milakar padhna chahiye. Har ek woh cheez batata hai jo baaki nahi batate. OI positions batata hai, price direction, volume activity, IV batata hai ki options kitne mehnge hain, aur trade direction batata hai ki aggressive kaun tha.`,
      how: `A reliable habit is a short checklist for any strike: (1) change in OI against volume, (2) premium change, (3) IV change, (4) the index move, (5) neighbouring strikes for spreads, (6) futures OI. If four of six point the same way you have a stronger hypothesis, but it is still not proof. The checklist also protects you from reading one column in isolation. Price shows where the market is, IV shows what is being paid for uncertainty, and OI shows how many contracts that uncertainty is spread over.`,
      eg: {
        title: 'Reading one strike with a checklist (illustrative)',
        text: `At the 24,200 CE, OI rose ${f(oiAdd)} lots (${f(oiAdd * LOT)} units). Premium fell ${prem0} to ${prem1} (${p1(premPct)}%), IV eased by about 0.6 points, NIFTY was flat. Together this leans to writing. If NIFTY had jumped 100 points instead and the premium had risen, the same OI would lean to buying. The OI number never changed, but the reading did.`,
      },
      tip: `One column is a clue, three columns agreeing is a hypothesis, and neither is a prediction.`,
      visual: { kind: 'flow', title: 'A six-step read of one strike', steps: [{ label: 'OI change vs volume' }, { label: 'Premium change' }, { label: 'IV change' }, { label: 'Index move' }, { label: 'Neighbouring strikes' }, { label: 'Futures OI', note: 'Then form a hypothesis', tone: 'gold' }] },
    },
    {
      t: 7,
      def: `Total OI is the stock of open contracts at a strike. OI change is the flow added or removed today. They must be read together, because a big change on a tiny base is a different thing from the same change on a big base.`,
      hi: `Total OI ek strike par open contracts ka stock hai. OI change aaj kitna add ya kam hua woh flow hai. Dono ko saath padhna zaroori hai, kyunki chhote base par bada change aur bade base par wahi change alag baat hai.`,
      how: `Total OI tells you whether a strike matters at all, and change in OI tells you whether it is currently in play. A strike with large total OI and no change is a standing position that has not been touched today. A strike with small total OI and a large percentage change may just be a small player. Compare the percentage change to see relative size and the absolute lots to see real size. The previous total is today's total minus today's change.`,
      eg: {
        title: 'Same change, different base',
        text: `Strike A: total ${f(tot)} lots, change +${f(chg)}, previous ${f(prevTot)}, so +${p2(chgPct)}%. Strike B: total ${f(tot2)} lots, change +${f(chg2)}, previous ${f(prevTot2)}, so +${p1(chg2Pct)}%. The change is ${f(chg)} lots in both, equal to ${f(chg * LOT)} units, but at B it doubles the strike's OI, while at A it is a small addition to a big existing pile.`,
      },
      tip: `Ask two questions: how big is the strike (total), and how new is the activity (change).`,
      visual: { kind: 'bars', title: 'Same +30,000 lots, different base (lots)', unit: ' lots', items: [{ label: 'A: previous OI', value: prevTot, tone: 'neutral' }, { label: 'A: today', value: tot, tone: 'ice' }, { label: 'B: previous OI', value: prevTot2, tone: 'neutral' }, { label: 'B: today', value: tot2, tone: 'ice' }] },
      calc: { id: 'return-calc', preset: { start: prevTot2, end: tot2, years: 1 }, why: `Shows the ${p1(chg2Pct)}% jump on the small base at strike B.` },
    },
  ],
  tools: [{ id: 'oi-buildup', why: 'Classify price and OI moves, then remember its limits for options.' }, { id: 'pcr', why: 'PCR is built from OI, so it inherits the same limitations.' }],
}
export default m
