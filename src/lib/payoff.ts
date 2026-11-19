/** Strategy payoff engine (educational). Black–Scholes premiums from `@/lib/bs`; single flat IV; European index options.
 *  Units: everything is computed per ONE unit of the underlying (index points) and multiplied by lot size for rupees.
 *  Convention: a leg's `strikeOffset` is counted in "width units" (1 unit = `inputs.unit` strike steps of `inputs.step` points)
 *  from the at-the-money strike. FUT / UNDERLYING legs are assumed entered at the current spot (no carry modelled).
 *  Far-dated legs are valued by Black–Scholes at (far − near) = `farGapDays` remaining when the near expiry arrives.
 *  Excludes taxes, brokerage, slippage and margin. */
import { bs } from '@/lib/bs'

export type LegType = 'CE' | 'PE' | 'FUT' | 'UNDERLYING'
export interface Leg {
  type: LegType
  side: 1 | -1
  /** Strike offset from ATM, in width units (see file header). */
  strikeOffset: number
  /** Ratio / quantity multiplier (in lots). */
  qty: number
  expiry: 'near' | 'far'
}

export interface PayoffInputs {
  spot: number
  /** Annualised implied volatility as a decimal (0.15 = 15%). */
  iv: number
  /** Calendar days to the near expiry (>= 1). */
  dte: number
  /** Risk-free rate as a decimal. */
  r: number
  /** Strike step in index points (Nifty: 50). */
  step: number
  /** Strike steps per width unit. */
  unit: number
  lotSize: number
  /** Extra calendar days between near and far expiry. */
  farGapDays: number
}

export const DEFAULT_LOT_SIZE = 65
export const DEFAULT_INPUTS: PayoffInputs = { spot: 24000, iv: 0.15, dte: 7, r: 0.065, step: 50, unit: 2, lotSize: DEFAULT_LOT_SIZE, farGapDays: 28 }

export interface ResolvedLeg extends Leg {
  strike: number
  /** Entry premium (options) or entry price (FUT / UNDERLYING), per unit. */
  entry: number
  isOption: boolean
}

export type Extreme = number | 'Unlimited' | 'Very large'

export interface NetGreeks {
  delta: number
  gamma: number
  /** Per calendar day, per unit of underlying. */
  theta: number
  /** Per 1 volatility point, per unit of underlying. */
  vega: number
}

export interface Analysis {
  legs: ResolvedLeg[]
  xs: number[]
  expiry: number[]
  today: number[]
  /** Positive = net debit paid, negative = net credit received (₹ per lot × lot size). */
  netPremium: number
  maxProfit: Extreme
  maxLoss: Extreme
  breakevens: number[]
  /** Reward : risk ratio, only when both extremes are finite and loss is non-zero. */
  rewardRisk: number | null
  /** True when the best case is the index going to ~0 (long put, synthetic short): shown with a caveat. */
  maxProfitAtZero: boolean
  /** True when max profit / loss / breakevens were measured within the charted range only (calendar-type structures). */
  rangeLimited: boolean
  greeks: NetGreeks
  lo: number
  hi: number
  atm: number
}

export const atmStrike = (inp: PayoffInputs) => Math.round(inp.spot / inp.step) * inp.step

const nearT = (inp: PayoffInputs) => Math.max(inp.dte, 0) / 365
const farT = (inp: PayoffInputs) => (Math.max(inp.dte, 0) + inp.farGapDays) / 365

export function resolveLegs(legs: Leg[], inp: PayoffInputs): ResolvedLeg[] {
  const atm = atmStrike(inp)
  return legs.map((l) => {
    const isOption = l.type === 'CE' || l.type === 'PE'
    const strike = atm + l.strikeOffset * inp.unit * inp.step
    if (!isOption) return { ...l, strike: atm, entry: inp.spot, isOption }
    const T = l.expiry === 'near' ? nearT(inp) : farT(inp)
    return { ...l, strike, entry: bs(l.type as 'CE' | 'PE', inp.spot, strike, T, inp.r, inp.iv).price, isOption }
  })
}

/** Value of one unit of a resolved leg at spot S. `at` = 'expiry' (near expiry day) or 'today' (T+0). */
function legValue(l: ResolvedLeg, S: number, at: 'expiry' | 'today', inp: PayoffInputs): number {
  if (!l.isOption) return S
  const type = l.type as 'CE' | 'PE'
  if (l.expiry === 'near') {
    if (at === 'expiry') return type === 'CE' ? Math.max(S - l.strike, 0) : Math.max(l.strike - S, 0)
    return bs(type, S, l.strike, nearT(inp), inp.r, inp.iv).price
  }
  const T = at === 'expiry' ? inp.farGapDays / 365 : farT(inp)
  return bs(type, S, l.strike, T, inp.r, inp.iv).price
}

/** P&L per ONE unit (index points) of the whole position at spot S. */
export function pnlPerUnit(legs: ResolvedLeg[], S: number, at: 'expiry' | 'today', inp: PayoffInputs): number {
  let p = 0
  for (const l of legs) p += l.side * l.qty * (legValue(l, S, at, inp) - l.entry)
  return p
}

export function netPremiumPerUnit(legs: ResolvedLeg[]): number {
  let p = 0
  for (const l of legs) if (l.isOption) p += l.side * l.qty * l.entry
  return p
}

export function netGreeks(legs: ResolvedLeg[], inp: PayoffInputs): NetGreeks {
  const g: NetGreeks = { delta: 0, gamma: 0, theta: 0, vega: 0 }
  for (const l of legs) {
    if (!l.isOption) {
      g.delta += l.side * l.qty
      continue
    }
    const T = l.expiry === 'near' ? nearT(inp) : farT(inp)
    const x = bs(l.type as 'CE' | 'PE', inp.spot, l.strike, T, inp.r, inp.iv)
    g.delta += l.side * l.qty * x.delta
    g.gamma += l.side * l.qty * x.gamma
    g.theta += l.side * l.qty * x.theta
    g.vega += l.side * l.qty * x.vega
  }
  return g
}

/** Sensible visible spot range: enough to show every strike and the wings flattening. */
export function chartRange(legs: ResolvedLeg[], inp: PayoffInputs): [number, number] {
  const em = inp.spot * inp.iv * Math.sqrt(Math.max(inp.dte, 5) / 365)
  const strikes = legs.filter((l) => l.isOption).map((l) => Math.abs(l.strike - inp.spot))
  const far = strikes.length ? Math.max(...strikes) : 0
  const half = Math.max(em * 3, far * 1.7, inp.spot * 0.03)
  const roundTo = inp.step
  return [Math.floor((inp.spot - half) / roundTo) * roundTo, Math.ceil((inp.spot + half) / roundTo) * roundTo]
}

function linspace(lo: number, hi: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => lo + ((hi - lo) * i) / (n - 1))
}

function mergeKnots(xs: number[], knots: number[], lo: number, hi: number): number[] {
  const all = [...xs, ...knots.filter((k) => k > lo && k < hi)].sort((a, b) => a - b)
  return all.filter((v, i) => i === 0 || v - all[i - 1] > 1e-9)
}

const SLOPE_TOL = 0.04

/** Max profit / max loss / breakevens evaluated over a wide domain [1, 2×spot]; open-ended wings detected from slope at the edges. */
export function expiryStats(legs: ResolvedLeg[], inp: PayoffInputs, domain?: [number, number]): { maxProfit: Extreme; maxLoss: Extreme; breakevens: number[]; rewardRisk: number | null; maxProfitAtZero: boolean } {
  const lo = domain ? domain[0] : 1
  const hi = domain ? domain[1] : inp.spot * 2
  const xs = mergeKnots(linspace(lo, hi, 1200), legs.map((l) => l.strike), lo, hi)
  const ys = xs.map((x) => pnlPerUnit(legs, x, 'expiry', inp) * inp.lotSize)
  const n = xs.length
  const perPt = (a: number, b: number) => (ys[b] - ys[a]) / (xs[b] - xs[a]) / inp.lotSize
  const slopeL = perPt(0, 1)
  const slopeR = perPt(n - 2, n - 1)
  const yMax = Math.max(...ys)
  const yMin = Math.min(...ys)

  const profitOpenRight = slopeR > SLOPE_TOL && ys[n - 1] > 0
  const lossOpenRight = slopeR < -SLOPE_TOL && ys[n - 1] < 0
  const lossOpenLeft = slopeL > SLOPE_TOL && ys[0] < 0

  const maxProfitAtZero = !domain && !profitOpenRight && slopeL < -SLOPE_TOL && ys[0] > 0 && ys[0] >= yMax - 1e-6
  const maxProfit: Extreme = profitOpenRight ? 'Unlimited' : Math.max(yMax, 0)
  const maxLoss: Extreme = lossOpenRight ? 'Unlimited' : lossOpenLeft ? 'Very large' : Math.min(yMin, 0)

  const breakevens: number[] = []
  for (let i = 1; i < n; i++) {
    const a = ys[i - 1]
    const b = ys[i]
    if (a === 0 && i - 1 > 0) breakevens.push(xs[i - 1])
    else if ((a < 0 && b > 0) || (a > 0 && b < 0)) breakevens.push(xs[i - 1] + ((xs[i] - xs[i - 1]) * (0 - a)) / (b - a))
  }
  const be = breakevens.filter((v, i) => i === 0 || v - breakevens[i - 1] > 0.5)

  let rewardRisk: number | null = null
  if (typeof maxProfit === 'number' && typeof maxLoss === 'number' && maxLoss < 0 && maxProfit > 0 && !maxProfitAtZero) rewardRisk = maxProfit / Math.abs(maxLoss)
  return { maxProfit, maxLoss, breakevens: be, rewardRisk, maxProfitAtZero }
}

export function analyze(legDefs: Leg[], inp: PayoffInputs): Analysis {
  const legs = resolveLegs(legDefs, inp)
  const [lo, hi] = chartRange(legs, inp)
  const xs = mergeKnots(linspace(lo, hi, 241), [...legs.filter((l) => l.isOption).map((l) => l.strike), inp.spot], lo, hi)
  const expiry = xs.map((x) => pnlPerUnit(legs, x, 'expiry', inp) * inp.lotSize)
  const today = xs.map((x) => pnlPerUnit(legs, x, 'today', inp) * inp.lotSize)
  const st = expiryStats(legs, inp)
  const g = netGreeks(legs, inp)
  return {
    legs,
    xs,
    expiry,
    today,
    netPremium: netPremiumPerUnit(legs) * inp.lotSize,
    ...st,
    rangeLimited: legs.some((l) => l.expiry === 'far' && l.isOption),
    greeks: g,
    lo,
    hi,
    atm: atmStrike(inp),
  }
}

/** Expiry payoff only, on a fixed coarse grid — cheap enough for sparklines. */
export function sparkCurve(legDefs: Leg[], inp: PayoffInputs, n = 48): { xs: number[]; ys: number[] } {
  const legs = resolveLegs(legDefs, inp)
  const [lo, hi] = chartRange(legs, inp)
  const xs = mergeKnots(linspace(lo, hi, n), legs.filter((l) => l.isOption).map((l) => l.strike), lo, hi)
  return { xs, ys: xs.map((x) => pnlPerUnit(legs, x, 'expiry', inp)) }
}

/** Interpolate a curve at spot x (clamped to the grid). */
export function sampleAt(xs: number[], ys: number[], x: number): number {
  if (x <= xs[0]) return ys[0]
  if (x >= xs[xs.length - 1]) return ys[ys.length - 1]
  let lo = 0
  let hi = xs.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (xs[mid] <= x) lo = mid
    else hi = mid
  }
  const t = (x - xs[lo]) / (xs[hi] - xs[lo])
  return ys[lo] + (ys[hi] - ys[lo]) * t
}
