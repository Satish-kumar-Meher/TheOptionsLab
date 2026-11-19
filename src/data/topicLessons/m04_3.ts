import type { ModuleLesson } from '../topicLessonTypes'

/* Illustrative Black-Scholes values: NIFTY 24,000, rate 6.5%, dividend yield 1.3%, India VIX/IV 14 unless stated, lot 65
 * (check the current NSE contract specification). Every number in the text below is computed here, not typed by hand.
 * Real traded premiums differ from the model (skew, demand and supply, bid-ask spread). */
const f = (n: number) => Math.round(n).toLocaleString('en-IN')
const r2 = (n: number) => n.toFixed(2)
const r1 = (n: number) => n.toFixed(1)
const pc = (n: number) => (n * 100).toFixed(1) + '%'
const LOT = 65
const SP = 24000
const IV = 14
const N = (x: number) => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x))
  const d = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))))
  return x >= 0 ? 1 - p : p
}
type G = { price: number; delta: number; gamma: number; vega: number; theta: number; itm: number; intr: number; tv: number }
function bs(t: 'CE' | 'PE', S: number, K: number, days: number, iv: number = IV, r = 6.5, q = 1.3): G {
  const T = days / 365, s = iv / 100, rr = r / 100, qq = q / 100, sq = Math.sqrt(T)
  const intr = t === 'CE' ? Math.max(S - K, 0) : Math.max(K - S, 0)
  if (T <= 0) return { price: intr, delta: 0, gamma: 0, vega: 0, theta: 0, itm: intr > 0 ? 1 : 0, intr, tv: 0 }
  const d1 = (Math.log(S / K) + (rr - qq + 0.5 * s * s) * T) / (s * sq), d2 = d1 - s * sq
  const pdf = Math.exp(-0.5 * d1 * d1) / Math.sqrt(2 * Math.PI)
  const e = Math.exp(-rr * T), eq = Math.exp(-qq * T)
  const price = t === 'CE' ? S * eq * N(d1) - K * e * N(d2) : K * e * N(-d2) - S * eq * N(-d1)
  const delta = t === 'CE' ? eq * N(d1) : eq * (N(d1) - 1)
  const gamma = (eq * pdf) / (S * s * sq)
  const vega = (S * eq * pdf * sq) / 100
  const th = t === 'CE'
    ? -(S * eq * pdf * s) / (2 * sq) - rr * K * e * N(d2) + qq * S * eq * N(d1)
    : -(S * eq * pdf * s) / (2 * sq) + rr * K * e * N(-d2) - qq * S * eq * N(-d1)
  return { price, delta, gamma, vega, theta: th / 365, itm: t === 'CE' ? N(d2) : N(-d2), intr, tv: price - intr }
}

/* ---------- Module 4.3 computations ---------- */
const otm = bs('CE', SP, 24100, 7)
const itm = bs('CE', SP, 23900, 7)
const atm7 = bs('CE', SP, 24000, 7)
const DAYS = [30, 14, 7, 3, 1]
const atmBy = DAYS.map((d) => bs('CE', SP, 24000, d))
const atm30 = atmBy[0], atm14 = atmBy[1], atm3 = atmBy[3], atm1 = atmBy[4]
const ratio30v7 = atm30.price / atm7.price
const thetaLot = (g: G) => Math.abs(g.theta) * LOT
const stk = [23800, 23900, 24000, 24100, 24200]
const tvRow = stk.map((k) => ({ k, g: bs('CE', SP, k, 7) }))
const far = [7, 3, 1].map((d) => bs('CE', SP, 24600, d))
const farMove = 600
const em7 = SP * (IV / 100) * Math.sqrt(7 / 365)
const em1 = SP * (IV / 100) * Math.sqrt(1 / 365)
const ne = [1, 0.5, 0.25, 0.1].map((d) => ({ d, atm: bs('CE', SP, 24000, d), o: bs('CE', SP, 24100, d) }))
const IVS = [10, 14, 20, 30]
const volRow = IVS.map((v) => ({ v, g: bs('CE', SP, 24000, 7, v) }))
const atm4 = bs('CE', SP, 24000, 4)
const lossHold3 = (atm7.price - atm4.price) * LOT
const pctLost3 = (atm7.price - atm4.price) / atm7.price

const m: ModuleLesson = {
  moduleId: '4.3',
  intro: `Time value is the part of an option's premium that is not intrinsic value. It is what the market charges for the remaining chance that the index moves in your favour before expiry. It is largest for at-the-money options with plenty of time left, it shrinks as expiry approaches, and it rises and falls with expected volatility. Examples use NIFTY near ${f(SP)}, lot ${LOT} (check the current NSE contract specification) and illustrative Black-Scholes premiums at India VIX ${IV}.`,
  introHi: `Time value premium ka woh hissa hai jo intrinsic value nahi hai. Yeh us chance ki price hai ki expiry se pehle index aapke favour mein move kar sakta hai. Yeh ATM options mein sabse zyada hoti hai jab time zyada bacha ho, expiry paas aate hi kam hoti jati hai, aur expected volatility ke saath upar-neeche hoti hai. Examples NIFTY ~${f(SP)}, lot ${LOT} (current NSE contract specification check karein) aur India VIX ${IV} par illustrative Black-Scholes premiums hain.`,
  steps: {
    concept: `Premium = intrinsic value + time value. Intrinsic value is what the option is worth if settled now; time value is everything above that. An out-of-the-money option has zero intrinsic value, so its entire price is time value: you are paying only for the chance. Because that chance disappears at expiry, time value always ends at zero. This is why a buyer can be right about direction and still lose money if the move comes too slowly.`,
    conceptHi: `Premium = intrinsic value + time value. Intrinsic value woh hai jo option ki abhi settle karne par banti; usse upar jo bhi hai woh time value hai. OTM option ki intrinsic value zero hoti hai, isliye uska poora premium time value hai: aap sirf chance ke paise de rahe ho. Expiry par woh chance khatam ho jata hai, toh time value hamesha zero par jaati hai. Isi wajah se buyer direction sahi pakad kar bhi paisa kho sakta hai agar move der se aaye.`,
    mechanism: `The model price rises with the square root of time, not in a straight line, so time value falls slowly when many days remain and faster as expiry nears. The pace at which an option loses value each day is its theta. Higher expected volatility (India VIX, or the option's implied volatility) makes bigger moves more likely and therefore raises time value; a volatility fall lowers it. On NSE the weekly index expiry concentrates this effect into a few days, and on expiry day the last hours of time value can drain very quickly. Exact premiums are set by the live order book, so they will differ from model values.`,
    example: {
      title: 'Same option, five different expiries away (illustrative)',
      text: `NIFTY ${f(SP)}, the ${f(SP)} CE, VIX ${IV}, index unchanged. With ${DAYS[0]} days left the model gives ₹${r2(atm30.price)}; ${DAYS[1]} days ₹${r2(atm14.price)}; ${DAYS[2]} days ₹${r2(atm7.price)}; ${DAYS[3]} days ₹${r2(atm3.price)}; ${DAYS[4]} day ₹${r2(atm1.price)}. For one lot of ${LOT} that is ₹${f(atm30.price * LOT)} falling to ₹${f(atm1.price * LOT)}. The whole premium is time value because the strike equals the index.`,
    },
    chart: {
      kind: 'bars',
      title: 'ATM call premium by days to expiry',
      unit: ' ₹',
      caption: `Illustrative model values for the ${f(SP)} CE with the index unchanged and VIX ${IV}. Steeper loss per day near the end.`,
      items: atmBy.map((g, i) => ({ label: `${DAYS[i]} day${DAYS[i] > 1 ? 's' : ''} left`, value: Math.round(g.price * 100) / 100, tone: 'gold' as const })),
    },
    optionChain: `On the chain, time value of a strike = LTP minus intrinsic value. For a call, intrinsic = index minus strike (if positive); for a put, strike minus index. Look across strikes: time value is largest near the ATM strike and falls on both sides. Compare the same strike in the current-week and next-week expiry: the far expiry has more time value. Treat stale or wide-spread quotes carefully, because a bad LTP gives a wrong time-value figure.`,
    psychology: `Beginners think of a cheap far-OTM option as a lottery ticket that costs little. They forget that every day the ticket loses a slice of its value, so a slow market is a slow loss. Sellers see decay as a salary and forget that it is payment for risk: one sharp move can cost many days of collected decay. Both sides do better when they price the time, not just the premium.`,
    scenarios: {
      bullish: `If NIFTY rises steadily, the call gains intrinsic value, but time value still drains. A fast rise can beat decay; a slow grind may not. In this model a 7-day ATM call is ₹${r2(atm7.price)}; if the index is up 100 points after 3 days it is ₹${r2(bs('CE', SP + 100, 24000, 4).price)}, whereas the same +100 points on day 0 would have given ₹${r2(bs('CE', SP + 100, 24000, 7).price)}. Waiting costs the buyer part of the gain.`,
      bearish: `If NIFTY falls, the call loses intrinsic or delta-driven value and time value together. After 3 days with the index down 100 points the same call is about ₹${r2(bs('CE', SP - 100, 24000, 4).price)}, a loss of ₹${f((atm7.price - bs('CE', SP - 100, 24000, 4).price) * LOT)} per lot in this model. A put buyer, by contrast, gains from the fall but still fights decay.`,
      sideways: `If NIFTY goes nowhere, the call buyer loses time value daily: ₹${r2(atm7.price)} falls to ₹${r2(atm4.price)} after 3 days, a loss of ₹${f(lossHold3)} per lot (${pc(pctLost3)} of premium) with no move in the index. The option writer benefits from this decay, subject to the risk of a sudden move.`,
    },
    practice: [
      { q: `NIFTY is ${f(SP)} and the ${f(23900)} CE has 7 days left, model premium ₹${r2(itm.price)}. Split the premium into intrinsic and time value, and give the one-lot amounts at lot ${LOT}.`, a: `Intrinsic = ${f(SP)} - ${f(23900)} = ${f(itm.intr)}. Time value = ${r2(itm.price)} - ${f(itm.intr)} = ₹${r2(itm.tv)}. One lot: premium ${r2(itm.price)} x ${LOT} = ₹${f(itm.price * LOT)}; intrinsic ${f(itm.intr)} x ${LOT} = ₹${f(itm.intr * LOT)}; time value ₹${f(itm.tv * LOT)}.` },
      { q: `With 7 days left the ATM call (${f(SP)} strike) has a model theta of about ₹${r2(Math.abs(atm7.theta))} per unit per day. What is the approximate one-day decay for one lot?`, a: `${r2(Math.abs(atm7.theta))} x ${LOT} = ₹${f(thetaLot(atm7))} per lot per day, other things unchanged. With 1 day left theta is about ₹${r2(Math.abs(atm1.theta))} per unit, so ₹${f(thetaLot(atm1))} per lot: decay per day is bigger near expiry for ATM options.` },
      { q: `A trader buys the ${f(SP)} CE with 7 days left at ₹${r2(atm7.price)} and the index is unchanged 3 days later (4 days left, ₹${r2(atm4.price)}). Compute the loss for one lot.`, a: `Loss per unit = ${r2(atm7.price)} - ${r2(atm4.price)} = ₹${r2(atm7.price - atm4.price)}. One lot = ${r2(atm7.price - atm4.price)} x ${LOT} = ₹${f(lossHold3)}, which is ${pc(pctLost3)} of the premium paid, before charges.` },
      { q: `Using the same ATM call with 7 days left, compare the premium at IV 14 and IV 20.`, a: `At IV ${volRow[1].v} it is ₹${r2(volRow[1].g.price)}; at IV ${volRow[2].v} it is ₹${r2(volRow[2].g.price)}. The difference ₹${r2(volRow[2].g.price - volRow[1].g.price)} per unit (₹${f((volRow[2].g.price - volRow[1].g.price) * LOT)} per lot) is entirely extra time value from higher expected volatility.` },
    ],
    assignment: `For today's NIFTY chain pick the current-week expiry and the next expiry. For the ATM call and put plus two strikes either side, note LTP, compute intrinsic value, and subtract to get time value. Make a small table, mark where time value is largest, and write two sentences on how it differs between the two expiries.`,
  },
  topics: [
    {
      t: 1,
      def: `Time value is the portion of an option's premium that is above its intrinsic value. It is what buyers pay for the possibility that the index moves in their favour before expiry. It is never negative and is zero at expiry.`,
      hi: `Time value option ke premium ka woh hissa hai jo intrinsic value se upar hota hai. Buyer yeh isliye deta hai ki expiry se pehle index uske favour mein move kar sakta hai. Yeh kabhi negative nahi hoti aur expiry par zero ho jaati hai.`,
      how: `Time value = premium - intrinsic value. An OTM option's premium is all time value. An ITM option's premium is intrinsic value plus a smaller time value. NSE index options are European and cash-settled, so there is no early-exercise value; time value is driven by days left, expected volatility, the rate and dividends. The market sets it through bids and offers, so it is a price, not a fixed number.`,
      eg: {
        title: 'Time value of an OTM and an ITM call (illustrative)',
        text: `NIFTY ${f(SP)}, 7 days, VIX ${IV}. The ${f(24100)} CE is ₹${r2(otm.price)}: intrinsic 0, so time value ₹${r2(otm.tv)}. The ${f(23900)} CE is ₹${r2(itm.price)}: intrinsic ${f(itm.intr)}, time value ₹${r2(itm.tv)}. One lot of the OTM call carries ₹${f(otm.tv * LOT)} of pure time value.`,
      },
      tip: `For an OTM option, 100% of what you pay is time value, so a flat market costs you the whole amount over time.`,
      visual: { kind: 'layers', title: 'Premium of an ITM call', caption: `Illustrative ${f(23900)} CE: intrinsic ${f(itm.intr)} plus time value ₹${r2(itm.tv)}.`, layers: [{ label: `Premium ₹${r2(itm.price)}`, note: 'What you pay per unit', tone: 'gold' }, { label: `Intrinsic ${f(itm.intr)}`, note: 'Index minus strike', tone: 'ice' }, { label: `Time value ₹${r2(itm.tv)}`, note: 'Chance still ahead', tone: 'neutral' }] },
      calc: { id: 'premium-split', preset: { optType: 'CE', spot: SP, strike: 23900, premium: Math.round(itm.price * 100) / 100 }, why: 'Splits the premium into intrinsic and time value.' },
    },
    {
      t: 2,
      def: `Time to expiry is the number of days (or hours) left before the option stops trading and is settled. More time means more chance for the index to move, so the option is worth more.`,
      hi: `Time to expiry matlab option ke settle hone se pehle kitne din (ya ghante) bache hain. Zyada time ka matlab index ke move hone ka zyada mauka, isliye option ki value zyada hoti hai.`,
      how: `NSE index options have weekly and monthly expiries, so a trader can choose the number of days. Model value depends on the square root of time: roughly, four times the time gives about twice the time value for an ATM option. That is why the ${DAYS[0]}-day call here is ${ratio30v7.toFixed(2)} times the 7-day call, not ${r1(30 / 7)} times.`,
      eg: {
        title: 'ATM call at 30, 14, 7 days (illustrative)',
        text: `At ${f(SP)} with VIX ${IV}: 30 days ₹${r2(atm30.price)}, 14 days ₹${r2(atm14.price)}, 7 days ₹${r2(atm7.price)}. Cutting time from 30 to 7 days (${r1((7 / 30) * 100)}% of the time) leaves ${pc(atm7.price / atm30.price)} of the premium. A lot of ${LOT} falls from ₹${f(atm30.price * LOT)} to ₹${f(atm7.price * LOT)}.`,
      },
      tip: `Buying a further expiry costs more but gives the idea more time to work; choose time to match the thesis, not the cheapest price.`,
      visual: { kind: 'bars', title: 'ATM call premium vs days left', unit: ' ₹', caption: 'Illustrative, VIX 14, index unchanged.', items: atmBy.slice(0, 3).map((g, i) => ({ label: `${DAYS[i]} days`, value: Math.round(g.price * 100) / 100, tone: 'gold' as const })) },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: SP, strike: SP, days: 30, iv: IV, rate: 6.5 }, why: 'Change days to see how premium shrinks with time.' },
    },
    {
      t: 3,
      def: `Time value decay is the steady loss of time value as days pass, assuming nothing else changes. The speed of this daily loss is measured by theta.`,
      hi: `Time value decay ka matlab hai din guzarne ke saath time value ka dheere-dheere khatam hona, agar baaki sab kuch same rahe. Is daily loss ki speed ko theta kehte hain.`,
      how: `Decay is not even. For an ATM option it is slow when many days remain and speeds up in the final days, because the square-root shape drops sharply near zero. Theta is quoted per day per unit; multiply by the lot size for rupees per lot. Buyers pay theta every day; sellers collect it, but take the risk of a large move. Theta shown on a platform is a model estimate and assumes unchanged index and volatility.`,
      eg: {
        title: 'Theta of the ATM call at three points (illustrative)',
        text: `${f(SP)} CE, VIX ${IV}. With 7 days left theta is about ₹${r2(Math.abs(atm7.theta))} per unit, or ₹${f(thetaLot(atm7))} per lot per day. With 3 days left it is ₹${r2(Math.abs(atm3.theta))}, or ₹${f(thetaLot(atm3))} per lot. With 1 day left it is ₹${r2(Math.abs(atm1.theta))}, or ₹${f(thetaLot(atm1))} per lot. The same strike loses more per day as expiry nears.`,
      },
      tip: `Theta is a daily bill. Before you buy, ask how many days of that bill the move can afford.`,
      visual: { kind: 'curve', title: 'Time value shape', caption: 'Time value shrinks slowly at first, then quickly near expiry.', curve: 'timeValue' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: SP, strike: SP, days: 3, iv: IV, rate: 6.5 }, why: 'Read theta per unit and multiply by the lot size.' },
    },
    {
      t: 4,
      def: `ATM (at-the-money) options have a strike close to the current index level. They carry the highest time value because the index is about equally likely to finish above or below the strike, so uncertainty is greatest.`,
      hi: `ATM options ka strike current index ke paas hota hai. Inki time value sabse zyada hoti hai kyunki index strike ke upar ya neeche jaane ka chance lagbhag barabar hota hai, yaani uncertainty sabse zyada.`,
      how: `Moving away from the ATM strike in either direction, intrinsic value rises on the ITM side and the chance of finishing in the money falls on the OTM side. In both cases time value falls. The peak of time value sits at the strike nearest the forward index level. This is also where gamma and theta are highest, so ATM contracts are the most actively traded and tend to have the tightest spreads in absolute and relative terms.`,
      eg: {
        title: 'Time value across strikes, 7-day call (illustrative)',
        text: `NIFTY ${f(SP)}, VIX ${IV}: ${tvRow.map((x) => `${f(x.k)} CE time value ₹${r2(x.g.tv)}`).join('; ')}. The ${f(SP)} strike has the highest of the five. At lot ${LOT}, its time value is ₹${f(tvRow[2].g.tv * LOT)} per lot.`,
      },
      tip: `The ATM strike is the most expensive in time value; ITM and OTM options are cheaper in that respect.`,
      visual: { kind: 'bars', title: 'Time value by strike (7-day call)', unit: ' ₹', caption: 'Illustrative, index 24,000: a hump at the ATM strike.', items: tvRow.map((x) => ({ label: `${f(x.k)} CE`, value: Math.round(x.g.tv * 100) / 100, tone: x.k === SP ? ('gold' as const) : ('neutral' as const) })) },
    },
    {
      t: 5,
      def: `A far out-of-the-money option needs a very large move to reach its strike. With little time left, that move is very unlikely, so the option can fade to near zero and expire worthless.`,
      hi: `Far OTM option ko strike tak pahunchne ke liye bahut bada move chahiye. Kam time bacha ho toh yeh move bahut mushkil hota hai, isliye option lagbhag zero hokar expire ho sakta hai.`,
      how: `The model price of an OTM option depends on the probability of finishing in the money, which depends on distance in units of volatility. As days fall, the one-standard-deviation move shrinks, so the same strike looks further away in standard-deviation terms. Many such options expire worthless; the buyers lose the whole premium. That does not make selling them safe: the occasional large move (an event day, gap or crash) can cause a loss many times the premium collected.`,
      eg: {
        title: `The ${f(24600)} CE as expiry nears (illustrative)`,
        text: `Index ${f(SP)}, the ${f(24600)} CE is ${f(farMove)} points (${pc(farMove / SP)}) away. With 7 days left it is ₹${r2(far[0].price)} and the model chance of finishing in the money is about ${pc(far[0].itm)}. With 3 days ₹${r2(far[1].price)} (${pc(far[1].itm)}); with 1 day ₹${r2(far[2].price)} (${pc(far[2].itm)}). A one-standard-deviation move over 7 days is about ${f(em7)} points and over 1 day about ${f(em1)} points.`,
      },
      tip: `A tiny premium is a probability message: the market thinks the move is unlikely. Cheap is not the same as good value.`,
      visual: { kind: 'bars', title: `${f(24600)} CE premium as expiry nears`, unit: ' ₹', caption: 'Illustrative: index unchanged at 24,000, VIX 14.', items: [7, 3, 1].map((d, i) => ({ label: `${d} day${d > 1 ? 's' : ''}`, value: Math.round(far[i].price * 100) / 100, tone: 'neutral' as const })) },
      calc: { id: 'expected-move', preset: { spot: SP, vix: IV, days: 3 }, why: 'See how a 600-point target compares with a one-standard-deviation move.' },
    },
    {
      t: 6,
      def: `Near expiry, the time still remaining is measured in hours, and time value of OTM and ATM options falls very fast. Almost all the remaining premium of an ATM option is time value that has to vanish by settlement.`,
      hi: `Expiry ke paas time ghanto mein gina jaata hai aur OTM ya ATM options ki time value bahut tezi se girti hai. ATM option ke bache hue premium ka lagbhag poora hissa time value hota hai jo settlement tak khatam ho jaata hai.`,
      how: `On expiry day an index option's price depends on very short-horizon movement. Gamma is large for ATM options, so a few index points can move the premium sharply, while theta drains the rest. The final settlement price of NSE index options is derived from the closing index value on expiry day, so an option's last value is its intrinsic value at that close. Spreads can widen and prices can jump; this is a high-risk period for buyers and writers alike.`,
      eg: {
        title: 'ATM call over the last day (illustrative)',
        text: `${f(SP)} CE, index unchanged, VIX ${IV}: ${ne.map((x) => `${x.d} day ₹${r2(x.atm.price)}`).join('; ')}. Going from 1 day to a quarter-day removes ₹${r2(ne[0].atm.price - ne[2].atm.price)} per unit (₹${f((ne[0].atm.price - ne[2].atm.price) * LOT)} per lot) with no index move. The ${f(24100)} CE falls from ₹${r2(ne[0].o.price)} to ₹${r2(ne[2].o.price)} over the same interval.`,
      },
      tip: `On expiry day, small premiums can look cheap, but they need a quick, large move to pay off before the clock runs out.`,
      visual: { kind: 'bars', title: 'ATM call over the final day', unit: ' ₹', caption: 'Illustrative: fractions of a day left, index unchanged.', items: ne.map((x) => ({ label: `${x.d} day`, value: Math.round(x.atm.price * 100) / 100, tone: 'gold' as const })) },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: SP, strike: SP, days: 1, iv: IV, rate: 6.5 }, why: 'Look at theta and gamma with one day left.' },
    },
    {
      t: 7,
      def: `Higher expected volatility means the index is expected to swing more, so the chance of reaching a strike rises and so does time value. Lower volatility reduces time value. This is measured through implied volatility (IV) and the option's vega.`,
      hi: `Expected volatility zyada ho toh index ke zyada hilne ki ummeed hoti hai, strike tak pahunchne ka chance badhta hai aur time value bhi badhti hai. Volatility kam ho toh time value ghat jaati hai. Ise implied volatility (IV) aur vega se naapte hain.`,
      how: `India VIX is NSE's index of expected NIFTY volatility over the next 30 days, derived from option prices. Event days such as the Union Budget or election results often push implied volatility up beforehand and release it afterwards. Vega is the premium change for a 1-point change in IV; it is greatest for ATM options with more time left. Volatility changes can therefore move time value even when the index and the date are the same.`,
      eg: {
        title: `ATM 7-day call at four volatility levels (illustrative)`,
        text: `${f(SP)} CE, 7 days: ${volRow.map((x) => `IV ${x.v} gives ₹${r2(x.g.price)}`).join('; ')}. Vega is about ₹${r2(volRow[1].g.vega)} per IV point per unit, so one lot gains about ₹${f(volRow[1].g.vega * LOT)} per IV point. Moving from IV ${IVS[1]} to ${IVS[2]} adds ₹${r2(volRow[2].g.price - volRow[1].g.price)} per unit.`,
      },
      tip: `Volatility is a second price tag on time. Check whether you are paying for high implied volatility before buying.`,
      visual: { kind: 'bars', title: 'ATM 7-day call premium vs IV', unit: ' ₹', caption: 'Illustrative values; index unchanged.', items: volRow.map((x) => ({ label: `IV ${x.v}`, value: Math.round(x.g.price * 100) / 100, tone: 'ice' as const })) },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: SP, strike: SP, days: 7, iv: 20, rate: 6.5 }, why: 'Change IV to see premium and vega.' },
    },
  ],
  tools: [{ id: 'premium-split', preset: { optType: 'CE', spot: SP, strike: 23900, premium: Math.round(itm.price * 100) / 100 }, why: 'Intrinsic value versus time value.' }],
}
export default m
