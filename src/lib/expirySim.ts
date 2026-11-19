import { bs, type Greeks, type OptType } from '@/lib/bs'
import { gaussian, mulberry32 } from '@/lib/rng'

/** Expiry-day afternoon simulator: 13:00 → 15:30 in 1-minute steps, priced with Black–Scholes.
 *  Educational model only: flat IV (with an optional linear "IV crush"), no skew, no bid-ask, no charges. */
export const OPEN_MIN = 13 * 60
export const CLOSE_MIN = 15 * 60 + 30
export const STEPS = CLOSE_MIN - OPEN_MIN + 1 // 151 points: index 0 = 13:00, index 150 = 15:30
export const MINUTES_PER_YEAR = 525600
export const STRIKE_STEP = 50

export type ExpiryScenario = 'pin' | 'up' | 'down' | 'whip'
export const EXPIRY_SCENARIOS: { id: ExpiryScenario; label: string; blurb: string }[] = [
  { id: 'pin', label: 'Pinning / range', blurb: 'Spot keeps getting pulled back toward the strike and drifts around it. Time value drains from both sides.' },
  { id: 'up', label: 'Trend up late', blurb: 'A quiet start, then a steady late push higher. Calls gain delta fast; puts decay to nothing.' },
  { id: 'down', label: 'Trend down late', blurb: 'A quiet start, then a late slide. Puts gain; calls decay.' },
  { id: 'whip', label: 'Whipsaw', blurb: 'Repeated swings of 50–80 points in both directions that end near where they began. Trailing stops can be hit on the way.' },
]

export interface ModelParams { /** base implied vol, decimal */ iv: number; /** fraction of IV lost linearly by the close (0–0.5) */ crush: number; rate: number; /** realised intraday vol as a multiple of IV (1 = realised matches implied) */ rvMult: number }
export const DEFAULT_MODEL: ModelParams = { iv: 0.14, crush: 0, rate: 0.065, rvMult: 1 }

export const minuteLabel = (idx: number) => {
  const m = OPEN_MIN + idx
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}
export const roundStrike = (spot: number) => Math.round(spot / STRIKE_STEP) * STRIKE_STEP

/** Spot path for an afternoon (length STEPS). Fully determined by scenario + seed. */
export function genPath(scn: ExpiryScenario, seed: number, realisedVol = 0.14): number[] {
  const rng = mulberry32(seed * 7919 + 17)
  const sig = 24000 * realisedVol * Math.sqrt(1 / MINUTES_PER_YEAR) * 0.95 // points per minute
  const start = 24000 + Math.round(gaussian(rng) * 12)
  const k0 = roundStrike(start)
  const out: number[] = [start]
  const phase = rng() * Math.PI * 2
  const amp = 55 + rng() * 25
  const period = 36 + rng() * 22
  const total = 85 + rng() * 70
  let x = start
  for (let i = 1; i < STEPS; i++) {
    const z = gaussian(rng) * sig
    const f = i / (STEPS - 1)
    if (scn === 'pin') x = x + 0.07 * (k0 - x) + z * 0.75
    else if (scn === 'up') x = x + (0.05 + (total / 55) * f * f * 0.9) * 1 + z * 0.8
    else if (scn === 'down') x = x - (0.05 + (total / 55) * f * f * 0.9) * 1 + z * 0.8
    else x = start + amp * Math.sin((2 * Math.PI * i) / period + phase) * (1 - 0.25 * f) + (x - start) * 0.0 + z * 1.1
    out.push(Math.round(x * 20) / 20)
  }
  return out
}

/** Implied vol at step i: base IV falling linearly by `crush` (fraction) towards the close. */
export const ivAt = (p: ModelParams, i: number) => Math.max(0.01, p.iv * (1 - p.crush * (i / (STEPS - 1))))
/** Years remaining, minutes/525600 as the brief specifies. */
export const yearsLeft = (i: number) => (STEPS - 1 - i) / MINUTES_PER_YEAR

export const optionAt = (type: OptType, spot: number, strike: number, i: number, p: ModelParams): Greeks => bs(type, spot, strike, yearsLeft(i), p.rate, ivAt(p, i))
export const premiumSeries = (path: number[], type: OptType, strike: number, p: ModelParams) => path.map((s, i) => optionAt(type, s, strike, i, p).price)

/* ------------------------------------------------------------------ trade */

export interface TradeParams { entry: number; exit: number; lots: number; lotSize: number; slippage: number; trailPct: number }
export interface LegResult { type: OptType; strike: number; entryPrice: number; exitPrice: number; exitIdx: number; reason: 'trailing stop' | 'time exit'; pnl: number }
export interface TradeResult { strike: number; ce: LegResult; pe: LegResult; total: number }

function runLeg(path: number[], p: ModelParams, t: TradeParams, type: OptType, strike: number): LegResult {
  const qty = t.lots * t.lotSize
  const quote = (i: number) => optionAt(type, path[i], strike, i, p).price
  const entryQuote = quote(t.entry)
  const entryPrice = entryQuote + t.slippage
  let peak = entryQuote
  let exitIdx = t.exit
  let reason: LegResult['reason'] = 'time exit'
  let exitQuote = quote(t.exit)
  for (let i = t.entry + 1; i <= t.exit; i++) {
    const q = quote(i)
    if (q > peak) peak = q
    if (q <= peak * (1 - t.trailPct / 100)) { exitIdx = i; exitQuote = q; reason = 'trailing stop'; break }
    if (i === t.exit) exitQuote = q
  }
  const exitPrice = Math.max(0, exitQuote - t.slippage)
  return { type, strike, entryPrice, exitPrice, exitIdx, reason, pnl: (exitPrice - entryPrice) * qty }
}

/** Buy the ATM CE and PE at `entry`, trail each leg's premium from its running peak, force-exit at `exit`. */
export function runTrade(path: number[], p: ModelParams, t: TradeParams): TradeResult {
  const strike = roundStrike(path[t.entry])
  const ce = runLeg(path, p, t, 'CE', strike)
  const pe = runLeg(path, p, t, 'PE', strike)
  return { strike, ce, pe, total: ce.pnl + pe.pnl }
}

/* ----------------------------------------------------------- distribution */

export interface DistBin { from: number; to: number; count: number; label: string }
export interface Distribution {
  n: number
  pnls: number[]
  hitRate: number
  avgWin: number
  avgLoss: number
  expectancy: number
  worst: number
  best: number
  median: number
  bothLoseShare: number
  bins: DistBin[]
}

export const MAX_SIMS = 500
const MIX: ExpiryScenario[] = ['pin', 'up', 'down', 'whip']

export function runDistribution(scn: ExpiryScenario | 'mixed', n: number, p: ModelParams, t: TradeParams): Distribution {
  const count = Math.max(1, Math.min(MAX_SIMS, Math.floor(n)))
  const pnls: number[] = []
  let bothLose = 0
  for (let k = 0; k < count; k++) {
    const s = scn === 'mixed' ? MIX[k % MIX.length] : scn
    const path = genPath(s, 1000 + k, p.iv * p.rvMult)
    const r = runTrade(path, p, t)
    pnls.push(r.total)
    if (r.ce.pnl < 0 && r.pe.pnl < 0) bothLose++
  }
  const sorted = [...pnls].sort((a, b) => a - b)
  const wins = pnls.filter((v) => v > 0)
  const losses = pnls.filter((v) => v <= 0)
  const mean = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0)
  const lo = sorted[0]
  const hi = sorted[sorted.length - 1]
  const nb = 16
  const w = Math.max((hi - lo) / nb, 1)
  const bins: DistBin[] = Array.from({ length: nb }, (_, i) => ({ from: lo + i * w, to: lo + (i + 1) * w, count: 0, label: '' }))
  for (const v of pnls) bins[Math.min(nb - 1, Math.floor((v - lo) / w))].count++
  bins.forEach((b) => { b.label = `${Math.round((b.from + b.to) / 2)}` })
  return {
    n: count, pnls, hitRate: wins.length / count, avgWin: mean(wins), avgLoss: mean(losses),
    expectancy: mean(pnls), worst: lo, best: hi, median: sorted[Math.floor(sorted.length / 2)], bothLoseShare: bothLose / count, bins,
  }
}
