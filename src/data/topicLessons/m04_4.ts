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

/* ---------- Module 4.4 computations ---------- */
const S1 = 24150
const ce_itm = bs('CE', S1, 24000, 7)
const ce_otm = bs('CE', S1, 24300, 7)
const pe_itm = bs('PE', S1, 24300, 7)
const pe_otm = bs('PE', S1, 24000, 7)
const ceA = bs('CE', SP, SP, 7)
const peA = bs('PE', SP, SP, 7)
const straddle = ceA.price + peA.price
const rule = 0.8 * SP * (IV / 100) * Math.sqrt(7 / 365)
const ceI = bs('CE', SP, 23800, 7)
const peI = bs('PE', SP, 24200, 7)
const ceO = bs('CE', SP, 24200, 7)
const peO = bs('PE', SP, 23800, 7)
const T7 = 7 / 365
const parity = SP * Math.exp(-0.013 * T7) - 24000 * Math.exp(-0.065 * T7)
const parityGap = ceA.price - peA.price
const ceMid = bs('CE', SP, 24100, 7)
const bid = Math.round((ceMid.price + 1.2) * 20) / 20
const ask = Math.round((ceMid.price + 2.7) * 20) / 20
const mid = (bid + ask) / 2
function ivSolve(t: 'CE' | 'PE', target: number, S: number, K: number, days: number) {
  let lo = 1, hi = 80
  for (let i = 0; i < 60; i++) { const m2 = (lo + hi) / 2; if (bs(t, S, K, days, m2).price < target) lo = m2; else hi = m2 }
  return (lo + hi) / 2
}
const ivImp = ivSolve('CE', mid, SP, 24100, 7)
const ex6 = bs('CE', SP + 50, 24200, 5)
const ex6lot = ex6.price * LOT
const ex6be = 24200 + Math.round(ex6.price * 100) / 100
const g100 = bs('CE', SP, 24200, 7)

const m: ModuleLesson = {
  moduleId: '4.4',
  intro: `This module turns the idea "premium = intrinsic value + time value" into actual rupee numbers. You will compute the premium split for calls and puts, see how ATM, ITM and OTM options differ, work a full example from quote to lot cost to breakeven, and learn why a model's theoretical price is not the price you will trade at. Examples use NIFTY near ${f(SP)}, lot ${LOT} (check the current NSE contract specification) and illustrative Black-Scholes values at VIX ${IV}.`,
  introHi: `Is module mein "premium = intrinsic value + time value" ko asli rupee numbers mein badla jaata hai. Aap call aur put dono ka premium split nikalna seekhenge, ATM, ITM aur OTM ka fark dekhenge, quote se lot cost aur breakeven tak ek poora example karenge, aur samjhenge ki model ki theoretical price aur market ki traded price alag kyun hoti hain. Examples NIFTY ~${f(SP)}, lot ${LOT} (current NSE contract specification check karein) aur VIX ${IV} par illustrative Black-Scholes values hain.`,
  steps: {
    concept: `Every option premium can be taken apart. Intrinsic value is what the option is worth if settled now, time value is the rest. The split tells you what you are really paying for: a cushion that is already there, or a chance that has yet to happen. A fair-value model such as Black-Scholes estimates the total; the market then trades around it.`,
    conceptHi: `Har option premium ko tod kar dekha ja sakta hai. Intrinsic value woh hai jo option abhi settle karne par banti hai, baaki time value hai. Is split se pata chalta hai ki aap kis cheez ke paise de rahe ho: jo cushion pehle se maujood hai ya jo chance abhi aana baaki hai. Black-Scholes jaisa model total ka andaza deta hai; market uske aas-paas trade karta hai.`,
    mechanism: `Step 1: find intrinsic value with the formula (call: index minus strike, put: strike minus index, floor at zero). Step 2: take the premium (model value or the market quote) and subtract intrinsic value to get time value. Step 3: multiply per-unit amounts by the lot size for rupees per lot. A model needs five inputs: index level, strike, days to expiry, volatility, and interest rate (plus dividend yield for an index). The market quote is set by orders in the book, so it carries the bid-ask spread and demand, supply and skew that the model ignores.`,
    example: {
      title: 'Calls and puts with NIFTY at 24,150 (illustrative, 7 days, VIX 14)',
      text: `24,000 CE: premium ₹${r2(ce_itm.price)} = intrinsic ${f(ce_itm.intr)} + time value ₹${r2(ce_itm.tv)}. 24,300 CE: premium ₹${r2(ce_otm.price)}, intrinsic 0, all time value. 24,300 PE: premium ₹${r2(pe_itm.price)} = intrinsic ${f(pe_itm.intr)} + time value ₹${r2(pe_itm.tv)}. 24,000 PE: premium ₹${r2(pe_otm.price)}, all time value. The 24,000 CE costs ₹${f(ce_itm.price * LOT)} per lot of ${LOT}.`,
    },
    chart: {
      kind: 'bars',
      title: 'Premium split at NIFTY 24,150 (7 days)',
      unit: ' ₹',
      caption: 'Illustrative model values per unit: ITM options carry intrinsic value, OTM options are all time value.',
      items: [
        { label: '24,000 CE intrinsic', value: ce_itm.intr, tone: 'ice' },
        { label: '24,000 CE time value', value: Math.round(ce_itm.tv * 100) / 100, tone: 'gold' },
        { label: '24,300 CE time value', value: Math.round(ce_otm.tv * 100) / 100, tone: 'gold' },
        { label: '24,300 PE intrinsic', value: pe_itm.intr, tone: 'ice' },
        { label: '24,300 PE time value', value: Math.round(pe_itm.tv * 100) / 100, tone: 'gold' },
      ],
    },
    optionChain: `The chain gives you the right-hand side of the equation (the LTP). You supply the left-hand side: compute intrinsic value from the strike and the index, and subtract. Do this for a few strikes on both the call and put side. If a deep ITM quote shows time value that is zero or negative against the live index, the quote is stale or the spread is wide, so use bid and ask rather than LTP.`,
    psychology: `People anchor on the number they see. A ₹${f(ce_itm.price)} option feels expensive and a ₹${f(ce_otm.price)} option feels cheap, but one is mostly intrinsic value and the other is purely time value. Looking at the split changes the question from "can I afford this?" to "what am I paying for, and can the market deliver it before expiry?".`,
    scenarios: {
      bullish: `NIFTY rises 100 points to ${f(S1 + 100)} with the same 7 days: the 24,000 CE moves from ₹${r2(ce_itm.price)} to ₹${r2(bs('CE', S1 + 100, 24000, 7).price)} (mostly intrinsic gain), and the 24,300 CE from ₹${r2(ce_otm.price)} to ₹${r2(bs('CE', S1 + 100, 24300, 7).price)} (time value rising as it nears the money).`,
      bearish: `NIFTY falls 100 points to ${f(S1 - 100)}: the 24,300 PE moves from ₹${r2(pe_itm.price)} to ₹${r2(bs('PE', S1 - 100, 24300, 7).price)}; the 24,000 CE falls to ₹${r2(bs('CE', S1 - 100, 24000, 7).price)}, losing intrinsic value point for point and some time value.`,
      sideways: `With NIFTY unchanged at ${f(S1)} but only 4 days left, the 24,000 CE is ₹${r2(bs('CE', S1, 24000, 4).price)} (from ₹${r2(ce_itm.price)}): intrinsic is unchanged at ${f(ce_itm.intr)}, time value alone shrinks. The 24,300 CE drops from ₹${r2(ce_otm.price)} to ₹${r2(bs('CE', S1, 24300, 4).price)}.`,
    },
    practice: [
      { q: `NIFTY is ${f(S1)}. The 24,300 PE is quoted at ₹${r2(pe_itm.price)}. Find intrinsic value, time value and the one-lot cost at lot ${LOT}.`, a: `Intrinsic = 24,300 - ${f(S1)} = ${f(pe_itm.intr)}. Time value = ${r2(pe_itm.price)} - ${f(pe_itm.intr)} = ₹${r2(pe_itm.tv)}. One lot = ${r2(pe_itm.price)} x ${LOT} = ₹${f(pe_itm.price * LOT)}.` },
      { q: `NIFTY is ${f(SP)}. The ATM 7-day call is ₹${r2(ceA.price)} and the ATM put is ₹${r2(peA.price)} in the model. What is the straddle cost per unit and per lot, and the two breakevens?`, a: `Straddle = ${r2(ceA.price)} + ${r2(peA.price)} = ₹${r2(straddle)} per unit; per lot = ${r2(straddle)} x ${LOT} = ₹${f(straddle * LOT)}. Breakevens at expiry: ${f(SP)} + ${r2(straddle)} = ${r2(SP + straddle)} and ${f(SP)} - ${r2(straddle)} = ${r2(SP - straddle)}.` },
      { q: `A trader sees the 24,100 CE (7 days) at bid ₹${r2(bid)}, ask ₹${r2(ask)}. Model value is ₹${r2(ceMid.price)}. Where does the quote sit versus the model?`, a: `Mid = (${r2(bid)} + ${r2(ask)}) / 2 = ₹${r2(mid)}, which is ₹${r2(mid - ceMid.price)} above the model. The spread is ${r2(ask - bid)} per unit (₹${f((ask - bid) * LOT)} per lot). The quote implies a volatility of about ${r1(ivImp)}% against ${IV}% used in the model.` },
      { q: `Use put-call parity (with the model's rate and dividend inputs): at ${f(SP)}, strike 24,000, 7 days, what should call minus put be?`, a: `C - P = S x e^(-qT) - K x e^(-rT) = ${r2(parity)}. The model gives ${r2(ceA.price)} - ${r2(peA.price)} = ${r2(parityGap)}. They match, which is how a put can be priced from a call.` },
    ],
    assignment: `On today's chain pick an ATM, an ITM and an OTM call and the matching puts. For each, write intrinsic value, time value, per-lot cost and breakeven at expiry. Then compute bid-ask spread per lot, and note whether the mid-price looks high or low compared with the strikes on either side.`,
  },
  topics: [
    {
      t: 1,
      def: `A call (CE) premium equals its intrinsic value plus its time value. Intrinsic value is the index level minus the strike, if positive. Time value is whatever remains of the quoted premium.`,
      hi: `Call (CE) ka premium = intrinsic value + time value. Intrinsic value index minus strike hoti hai, agar positive ho. Quoted premium mein se jo bacha woh time value hai.`,
      how: `Compute max(S - K, 0) for intrinsic value, then subtract it from the premium. A model such as Black-Scholes gives the total premium from index, strike, time, volatility, rate and dividend. The call premium rises when the index rises, when time or volatility rises, and falls as time passes. Premium is quoted per unit; multiply by lot size for rupees.`,
      eg: {
        title: 'The 24,000 CE at NIFTY 24,150 (illustrative)',
        text: `Model premium ₹${r2(ce_itm.price)}. Intrinsic = ${f(S1)} - 24,000 = ${f(ce_itm.intr)}. Time value = ${r2(ce_itm.price)} - ${f(ce_itm.intr)} = ₹${r2(ce_itm.tv)}. One lot: ₹${f(ce_itm.price * LOT)}; breakeven at expiry = 24,000 + ${r2(ce_itm.price)} = ${r2(24000 + ce_itm.price)}.`,
      },
      tip: `Breakeven for a call buyer is strike plus premium, so an ITM call that already has intrinsic value still needs the index to stay above that level at expiry.`,
      visual: { kind: 'layers', title: 'Call premium = intrinsic + time', caption: 'Illustrative 24,000 CE, NIFTY 24,150.', layers: [{ label: `Premium ₹${r2(ce_itm.price)}`, tone: 'gold' }, { label: `Intrinsic ${f(ce_itm.intr)}`, tone: 'ice' }, { label: `Time value ₹${r2(ce_itm.tv)}`, tone: 'neutral' }] },
      calc: { id: 'premium-split', preset: { optType: 'CE', spot: S1, strike: 24000, premium: Math.round(ce_itm.price * 100) / 100 }, why: 'Split the call premium into its two parts.' },
    },
    {
      t: 2,
      def: `A put (PE) premium also equals intrinsic value plus time value, but intrinsic value is the strike minus the index, if positive. A put gains value when the index falls.`,
      hi: `Put (PE) ka premium bhi intrinsic + time value hota hai, lekin intrinsic value strike minus index hoti hai, agar positive ho. Index girne par put ki value badhti hai.`,
      how: `Compute max(K - S, 0). Put and call prices at the same strike and expiry are linked by put-call parity: C - P = S x e^(-qT) - K x e^(-rT). So if you know the call, you can estimate the put. Put premiums on NIFTY are often higher than equal-distance calls in practice because traders pay more for downside protection, which shows up as volatility skew. That difference is a market effect, not part of the basic formula.`,
      eg: {
        title: 'The 24,300 PE at NIFTY 24,150 (illustrative)',
        text: `Model premium ₹${r2(pe_itm.price)}. Intrinsic = 24,300 - ${f(S1)} = ${f(pe_itm.intr)}. Time value = ₹${r2(pe_itm.tv)}. One lot costs ₹${f(pe_itm.price * LOT)}. Breakeven at expiry = 24,300 - ${r2(pe_itm.price)} = ${r2(24300 - pe_itm.price)}.`,
      },
      tip: `Put breakeven is strike minus premium. Do not copy the call formula for a put.`,
      visual: { kind: 'layers', title: 'Put premium = intrinsic + time', caption: 'Illustrative 24,300 PE, NIFTY 24,150.', layers: [{ label: `Premium ₹${r2(pe_itm.price)}`, tone: 'gold' }, { label: `Intrinsic ${f(pe_itm.intr)}`, tone: 'ice' }, { label: `Time value ₹${r2(pe_itm.tv)}`, tone: 'neutral' }] },
      calc: { id: 'put-call-parity', preset: { spot: SP, strike: 24000, days: 7, rate: 6.5, call: Math.round(ceA.price * 100) / 100, put: Math.round(peA.price * 100) / 100 }, why: 'Check how call and put prices tie together.' },
    },
    {
      t: 3,
      def: `ATM (at-the-money) premium is the price of an option whose strike is at or nearest the index level. It has no intrinsic value, so the whole premium is time value, and it is the largest time value on the chain.`,
      hi: `ATM premium us option ki price hai jiska strike index ke barabar ya sabse paas hota hai. Isme intrinsic value nahi hoti, isliye poora premium time value hai aur chain mein sabse zyada time value yahi hoti hai.`,
      how: `For an ATM option a handy approximation is premium ≈ 0.4 x index x volatility x square root of time, using the model's own scale. ATM call and put are close in value, and their sum (the straddle) is an estimate of the move the market expects by expiry. Weekly ATM premiums drop quickly as expiry nears. Always check the live quote, because the approximation ignores skew and demand.`,
      eg: {
        title: 'ATM 7-day call and put (illustrative)',
        text: `NIFTY ${f(SP)}, VIX ${IV}. ATM call ₹${r2(ceA.price)}, ATM put ₹${r2(peA.price)}. Straddle ₹${r2(straddle)} per unit, or ₹${f(straddle * LOT)} per lot. The approximation 0.8 x 24,000 x 0.14 x sqrt(7/365) = ₹${r2(rule)}, which is close to the straddle. Break-even band at expiry: ${r2(SP - straddle)} to ${r2(SP + straddle)}.`,
      },
      tip: `ATM premium is about volatility and time, not direction. It is the market's priced-in move.`,
      visual: { kind: 'bars', title: 'ATM premium, 7 days', unit: ' ₹', caption: 'Illustrative model values per unit.', items: [{ label: 'ATM CE', value: Math.round(ceA.price * 100) / 100, tone: 'gold' }, { label: 'ATM PE', value: Math.round(peA.price * 100) / 100, tone: 'gold' }, { label: 'Straddle', value: Math.round(straddle * 100) / 100, tone: 'ice' }] },
      calc: { id: 'straddle-move', preset: { spot: SP, cePrice: Math.round(ceA.price * 100) / 100, pePrice: Math.round(peA.price * 100) / 100, strike: SP }, why: 'Turn the ATM straddle into an implied move and breakevens.' },
    },
    {
      t: 4,
      def: `ITM (in-the-money) premium is a premium that includes real intrinsic value because the index is already beyond the strike. A call is ITM when the index is above the strike; a put is ITM when the index is below it.`,
      hi: `ITM premium mein asli intrinsic value shamil hoti hai kyunki index strike ke paar ja chuka hai. Call tab ITM hota hai jab index strike se upar ho; put tab jab index strike se neeche ho.`,
      how: `ITM premium = intrinsic value + a smaller time value. Because the premium is large, the rupee amount at risk is larger, but it moves almost one-for-one with the index when deep ITM (high delta). The time value part is the part exposed to decay, so a deep ITM option decays less in percentage terms. Deep ITM index options can also have wider quotes on the less-active strikes.`,
      eg: {
        title: 'ITM call and put at NIFTY 24,000 (illustrative)',
        text: `7 days, VIX ${IV}. 23,800 CE ₹${r2(ceI.price)} = intrinsic ${f(ceI.intr)} + time value ₹${r2(ceI.tv)}. 24,200 PE ₹${r2(peI.price)} = intrinsic ${f(peI.intr)} + time value ₹${r2(peI.tv)}. Delta of the call is about ${r2(ceI.delta)}, so a 50-point rise adds about ₹${r2(ceI.delta * 50)}.`,
      },
      tip: `ITM does not mean safer: a larger premium means a larger rupee loss if the market reverses.`,
      visual: { kind: 'bars', title: 'ITM premium parts', unit: ' ₹', caption: 'Illustrative, NIFTY 24,000, 7 days.', items: [{ label: '23,800 CE intrinsic', value: ceI.intr, tone: 'ice' }, { label: '23,800 CE time value', value: Math.round(ceI.tv * 100) / 100, tone: 'gold' }, { label: '24,200 PE intrinsic', value: peI.intr, tone: 'ice' }, { label: '24,200 PE time value', value: Math.round(peI.tv * 100) / 100, tone: 'gold' }] },
      calc: { id: 'premium-split', preset: { optType: 'PE', spot: SP, strike: 24200, premium: Math.round(peI.price * 100) / 100 }, why: 'Split an ITM put premium.' },
    },
    {
      t: 5,
      def: `OTM (out-of-the-money) premium has no intrinsic value because the index has not crossed the strike. The whole premium is time value, the price of the chance of reaching the strike.`,
      hi: `OTM premium mein intrinsic value nahi hoti kyunki index strike tak nahi pahuncha. Poora premium time value hai, yaani strike tak pahunchne ke chance ki price.`,
      how: `OTM premium depends on distance to the strike in units of expected volatility, and on time left. The further away the strike, the smaller the premium. For the buyer, a profit requires a move beyond strike plus premium by expiry. Percentage returns can be large if the move comes, but the probability of the option finishing in the money is lower, and decay works against the buyer daily.`,
      eg: {
        title: 'OTM call and put at NIFTY 24,000 (illustrative)',
        text: `7 days, VIX ${IV}. 24,200 CE ₹${r2(ceO.price)}, so one lot ₹${f(ceO.price * LOT)}; breakeven ${r2(24200 + ceO.price)}, which is ${f(24200 + ceO.price - SP)} points (${pc((24200 + ceO.price - SP) / SP)}) away. 23,800 PE ₹${r2(peO.price)}, breakeven ${r2(23800 - peO.price)}. Model chance of the call finishing in the money is about ${pc(g100.itm)}.`,
      },
      tip: `Compute the breakeven, not just the premium. A cheap option may still need a large move.`,
      visual: { kind: 'payoff', title: 'Long 24,200 CE at expiry', caption: `Illustrative: premium ₹${r2(ceO.price)}; loss limited to premium.`, spot: SP, legs: [{ type: 'CE', side: 1, strike: 24200, premium: Math.round(ceO.price * 100) / 100 }] },
      calc: { id: 'breakeven', preset: { optType: 'CE', side: 'buy', strike: 24200, premium: Math.round(ceO.price * 100) / 100 }, why: 'Breakeven for the OTM call.' },
    },
    {
      t: 6,
      def: `A premium calculation example walks one option from the index level to its premium, rupee cost per lot, breakeven and a result at expiry. It is the routine every trader should do before placing an order.`,
      hi: `Premium calculation example mein ek option ko index level se premium, per lot rupee cost, breakeven aur expiry result tak step by step nikala jaata hai. Order lagane se pehle har trader ko yeh routine karni chahiye.`,
      how: `Steps: (1) note index, strike, days left; (2) get premium from the live quote (use the ask if you will buy, the bid if you will sell); (3) intrinsic and time value; (4) multiply by lot size and lots; (5) breakeven: strike plus premium for a call buy, strike minus premium for a put buy; (6) payoff at a few expiry levels. Add brokerage and statutory charges, which reduce the result (check current rates).`,
      eg: {
        title: 'Buy one lot of the 24,200 CE, 5 days left (illustrative)',
        text: `NIFTY ${f(SP + 50)}, VIX ${IV}. Model premium ₹${r2(ex6.price)} (intrinsic 0). One lot costs ${r2(ex6.price)} x ${LOT} = ₹${f(ex6lot)}. Breakeven = 24,200 + ${r2(ex6.price)} = ${r2(ex6be)}. If NIFTY expires at 24,400: intrinsic 200, profit per unit ${r2(200 - ex6.price)}, per lot ₹${f((200 - ex6.price) * LOT)}. If it expires at or below 24,200 the loss is the full ₹${f(ex6lot)} plus charges.`,
      },
      tip: `Write the worst case in rupees before you buy. For a long option it is the premium paid.`,
      visual: { kind: 'flow', title: 'Premium calculation routine', caption: 'Six steps, every time.', steps: [{ label: 'Index, strike, days', tone: 'ice' }, { label: 'Live bid / ask', tone: 'ice' }, { label: 'Intrinsic + time value', tone: 'gold' }, { label: 'x lot size x lots', tone: 'gold' }, { label: 'Breakeven', tone: 'neutral' }, { label: 'Payoff at expiry', tone: 'neutral' }] },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24200, premium: Math.round(ex6.price * 100) / 100, expiryPrice: 24400, lotSize: LOT, lots: 1 }, why: 'Payoff of the worked example at 24,400.' },
    },
    {
      t: 7,
      def: `A theoretical price is what a model (such as Black-Scholes) says an option should be worth, given its inputs. The actual traded premium is the price at which a real buyer and seller trade on NSE. The two are close but rarely identical.`,
      hi: `Theoretical price woh hai jo model (jaise Black-Scholes) inputs ke hisaab se option ki value batata hai. Actual traded premium woh hai jis par NSE par asli buyer aur seller trade karte hain. Dono paas-paas hote hain lekin barabar kam hi hote hain.`,
      how: `The model assumes a single volatility, smooth continuous trading and no costs. The real market has a bid-ask spread, different implied volatilities by strike (skew), event premiums, demand-supply imbalance and finite liquidity. Traders often work backwards: given the market price, solve for the implied volatility (IV) that makes the model match. Comparing IV across strikes and expiries says more than comparing rupee prices.`,
      eg: {
        title: 'Model versus quote on the 24,100 CE (illustrative)',
        text: `Model value at IV ${IV}: ₹${r2(ceMid.price)}. Assume a hypothetical quote of bid ₹${r2(bid)} and ask ₹${r2(ask)}, so mid ₹${r2(mid)} and spread ₹${r2(ask - bid)} (₹${f((ask - bid) * LOT)} per lot). Solving the model for the mid gives an implied volatility of about ${r1(ivImp)}%, slightly above India VIX ${IV}. Buying at the ask means paying ₹${r2(ask - ceMid.price)} above the model.`,
      },
      tip: `Use a model as a reference, not a promise. The price you get is the book's price.`,
      visual: { kind: 'compare', title: 'Model versus market', left: { head: 'Theoretical price', tone: 'ice', points: ['Single volatility input', 'No spread, no costs', 'Smooth and continuous'] }, right: { head: 'Traded premium', tone: 'gold', points: ['Bid and ask spread', 'Skew, events, demand', 'Depends on liquidity'] } },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: SP, strike: 24100, days: 7, iv: IV, rate: 6.5 }, why: 'Reproduce the model value, then try a higher IV.' },
    },
  ],
  tools: [{ id: 'premium-split', preset: { optType: 'CE', spot: S1, strike: 24000, premium: Math.round(ce_itm.price * 100) / 100 }, why: 'Intrinsic and time value of any quote.' }],
}
export default m
