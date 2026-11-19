/**
 * Pure backtesting maths for the Strikewick "Backtesting Studio".
 * Everything here runs on SYNTHETIC trades from a seeded generator. Nothing models a real strategy.
 *
 * Conventions
 * - P&L is in rupees (₹). Win/loss sizes are quoted per lot; position size is a lot multiplier.
 * - Costs (brokerage + charges, slippage) are per trade per lot and are always subtracted from gross.
 * - Sharpe / Sortino use per-trade returns on a fixed starting capital, risk-free rate 0,
 *   annualised by sqrt(TRADES_PER_YEAR) assuming roughly one trade per trading day.
 */
import { gaussian, mulberry32, percentile } from '@/lib/rng'

export const TRADES_PER_YEAR = 250

export type VixRegime = 'low' | 'mid' | 'high'

export interface TradeParams {
  n: number
  /** 0..1 */
  winRate: number
  /** ₹ per lot */
  avgWin: number
  /** ₹ per lot (positive number) */
  avgLoss: number
  /** 0..1 – dispersion of each trade's size around the average, as a fraction of it */
  noise: number
  /** brokerage + statutory charges, ₹ per lot per trade */
  charges: number
  /** slippage, ₹ per lot per trade */
  slippage: number
  lots: number
  seed: number
  /** 0..0.2 – how strongly the synthetic regimes shift the win probability (0 = regimes are pure noise) */
  regimeTilt: number
}

export interface Trade {
  i: number
  win: boolean
  gross: number
  cost: number
  net: number
  vix: VixRegime
  expiry: boolean
}

export const DEFAULT_PARAMS: TradeParams = {
  n: 400,
  winRate: 0.52,
  avgWin: 1800,
  avgLoss: 1500,
  noise: 0.35,
  charges: 90,
  slippage: 100,
  lots: 2,
  seed: 2401,
  regimeTilt: 0.08,
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

/** Seeded generator. The draw order per trade is fixed, so changing a parameter never reshuffles the luck. */
export function generateTrades(p: TradeParams): Trade[] {
  const rng = mulberry32(p.seed)
  const out: Trade[] = []
  const n = clamp(Math.round(p.n), 1, 2000)
  for (let i = 0; i < n; i++) {
    const rVix = rng()
    const rExp = rng()
    const rWin = rng()
    const z = gaussian(rng)
    const vix: VixRegime = rVix < 0.3 ? 'low' : rVix < 0.82 ? 'mid' : 'high'
    const expiry = rExp < 0.2
    let pWin = p.winRate + p.regimeTilt * (vix === 'low' ? 0.5 : vix === 'high' ? -1 : 0) + p.regimeTilt * (expiry ? -0.5 : 0)
    pWin = clamp(pWin, 0.02, 0.98)
    const win = rWin < pWin
    const base = win ? p.avgWin : p.avgLoss
    const size = Math.max(0.05 * base, base * (1 + p.noise * z))
    const gross = (win ? size : -size) * p.lots
    const cost = (p.charges + p.slippage) * p.lots
    out.push({ i: i + 1, win, gross, cost, net: gross - cost, vix, expiry })
  }
  return out
}

/* ---------------------------- equity & drawdown ---------------------------- */

export interface CurvePoint {
  i: number
  gross: number
  net: number
  dd: number
  ddPct: number
}

/** Cumulative gross / net P&L plus the net drawdown from the running peak of (capital + net P&L). */
export function equityCurve(trades: Trade[], capital: number): CurvePoint[] {
  const out: CurvePoint[] = [{ i: 0, gross: 0, net: 0, dd: 0, ddPct: 0 }]
  let g = 0
  let n = 0
  let peak = capital
  for (const t of trades) {
    g += t.gross
    n += t.net
    const eq = capital + n
    peak = Math.max(peak, eq)
    out.push({ i: t.i, gross: g, net: n, dd: eq - peak, ddPct: peak > 0 ? (eq - peak) / peak : 0 })
  }
  return out
}

/* --------------------------------- metrics -------------------------------- */

export interface Metrics {
  n: number
  wins: number
  losses: number
  winRate: number
  avgWin: number
  avgLoss: number
  profitFactor: number
  expectancy: number
  total: number
  maxDD: number
  maxDDPct: number
  sharpe: number
  sortino: number
  riskReward: number
  maxWinStreak: number
  maxLossStreak: number
}

const mean = (a: number[]) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : NaN)
const stdev = (a: number[]) => {
  if (a.length < 2) return NaN
  const m = mean(a)
  return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1))
}

export function computeMetrics(pnls: number[], capital: number): Metrics {
  const wins = pnls.filter((x) => x > 0)
  const losses = pnls.filter((x) => x <= 0)
  const grossWin = wins.reduce((s, x) => s + x, 0)
  const grossLoss = -losses.reduce((s, x) => s + x, 0)
  const avgWin = mean(wins)
  const avgLoss = losses.length ? -mean(losses) : NaN
  let eq = capital
  let peak = capital
  let maxDD = 0
  let maxDDPct = 0
  let ws = 0
  let ls = 0
  let curW = 0
  let curL = 0
  for (const x of pnls) {
    eq += x
    peak = Math.max(peak, eq)
    const d = peak - eq
    if (d > maxDD) maxDD = d
    if (peak > 0 && d / peak > maxDDPct) maxDDPct = d / peak
    if (x > 0) {
      curW++
      curL = 0
    } else {
      curL++
      curW = 0
    }
    ws = Math.max(ws, curW)
    ls = Math.max(ls, curL)
  }
  const rets = pnls.map((x) => x / capital)
  const sd = stdev(rets)
  const dsd = Math.sqrt(rets.reduce((s, r) => s + Math.min(r, 0) ** 2, 0) / Math.max(1, rets.length))
  const ann = Math.sqrt(TRADES_PER_YEAR)
  return {
    n: pnls.length,
    wins: wins.length,
    losses: losses.length,
    winRate: pnls.length ? wins.length / pnls.length : NaN,
    avgWin,
    avgLoss,
    profitFactor: grossLoss > 0 ? grossWin / grossLoss : grossWin > 0 ? Infinity : NaN,
    expectancy: mean(pnls),
    total: pnls.reduce((s, x) => s + x, 0),
    maxDD,
    maxDDPct,
    sharpe: sd > 0 ? (mean(rets) / sd) * ann : NaN,
    sortino: dsd > 0 ? (mean(rets) / dsd) * ann : NaN,
    riskReward: avgLoss > 0 ? avgWin / avgLoss : NaN,
    maxWinStreak: ws,
    maxLossStreak: ls,
  }
}

/** Gross break-even win rate for a given payoff ratio, optionally with costs folded into both sides. */
export function breakEvenWinRate(avgWin: number, avgLoss: number, costPerTrade: number): number {
  const w = avgWin - costPerTrade
  const l = avgLoss + costPerTrade
  return w + l > 0 ? l / (w + l) : NaN
}

/* ------------------------------- walk-forward ------------------------------ */

export interface WFWindow {
  k: number
  isStart: number
  isEnd: number
  oosEnd: number
  variant: number
  isExp: number
  oosExp: number
  isN: number
  oosN: number
}
export interface WFResult {
  windows: WFWindow[]
  avgIS: number
  avgOOS: number
  /** mean OOS expectancy ÷ mean IS expectancy. NaN when the IS mean is not positive. */
  efficiency: number
  /** share of windows whose OOS expectancy is positive */
  oosPositive: number
}

/**
 * Rolling walk-forward. In each in-sample window we "optimise" by choosing the best of `variants`
 * candidate entry filters (variant 0 = take every trade, the others keep a seeded ~60% subset of trades),
 * then apply the SAME filter to the next out-of-sample window. More candidates = more selection bias,
 * so in-sample looks better and the efficiency falls: that is exactly what overfitting does.
 */
export function walkForward(pnls: number[], isLen: number, oosLen: number, variants: number, seed: number): WFResult {
  const K = clamp(Math.round(variants), 1, 60)
  const masks: Float64Array[] = []
  for (let k = 0; k < K; k++) {
    const r = mulberry32(seed + 977 * (k + 1))
    const m = new Float64Array(pnls.length)
    for (let i = 0; i < pnls.length; i++) m[i] = k === 0 ? 0 : r()
    masks.push(m)
  }
  const keep = (k: number, i: number) => k === 0 || masks[k][i] < 0.6
  const exp = (k: number, a: number, b: number): [number, number] => {
    let s = 0
    let c = 0
    for (let i = a; i < b; i++) if (keep(k, i)) { s += pnls[i]; c++ }
    return [c ? s / c : 0, c]
  }
  const windows: WFWindow[] = []
  let k = 0
  for (let start = 0; start + isLen + oosLen <= pnls.length; start += oosLen) {
    const isEnd = start + isLen
    const oosEnd = isEnd + oosLen
    let best = 0
    let bestExp = -Infinity
    for (let v = 0; v < K; v++) {
      const [e] = exp(v, start, isEnd)
      if (e > bestExp) { bestExp = e; best = v }
    }
    const [oe, on] = exp(best, isEnd, oosEnd)
    const [, inn] = exp(best, start, isEnd)
    windows.push({ k: ++k, isStart: start, isEnd, oosEnd, variant: best, isExp: bestExp, oosExp: oe, isN: inn, oosN: on })
  }
  const avgIS = mean(windows.map((w) => w.isExp))
  const avgOOS = mean(windows.map((w) => w.oosExp))
  return {
    windows,
    avgIS,
    avgOOS,
    efficiency: avgIS > 0 ? avgOOS / avgIS : NaN,
    oosPositive: windows.length ? windows.filter((w) => w.oosExp > 0).length / windows.length : NaN,
  }
}

/* ------------------------------ sensitivity grid --------------------------- */

export type SurfaceKind = 'plateau' | 'spike'
export interface HeatGrid {
  size: number
  xs: number[]
  ys: number[]
  /** values[row][col], row 0 = lowest y */
  values: number[][]
  peak: { r: number; c: number; v: number }
  /** mean of the peak's neighbours as a fraction of the peak (1 = flat, ~0 = needle) */
  neighbourRatio: number
  min: number
  max: number
}

/**
 * Synthetic response surface of expectancy (₹/trade) against two parameters
 * (x: stop-loss multiple, y: profit-target multiple). 'plateau' = broad hill, mild noise;
 * 'spike' = one narrow noisy peak. Real surfaces come from re-running a backtest per cell.
 */
export function heatGrid(kind: SurfaceKind, seed: number, size = 9): HeatGrid {
  const rng = mulberry32(seed)
  const xs = Array.from({ length: size }, (_, i) => +(0.5 + i * 0.25).toFixed(2))
  const ys = Array.from({ length: size }, (_, i) => +(0.5 + i * 0.25).toFixed(2))
  const cx = size * 0.5
  const cy = size * 0.45
  const w = kind === 'plateau' ? size * 0.34 : size * 0.09
  const amp = kind === 'plateau' ? 420 : 900
  const noise = kind === 'plateau' ? 40 : 230
  const base = kind === 'plateau' ? -40 : -150
  const values: number[][] = []
  let min = Infinity
  let max = -Infinity
  for (let r = 0; r < size; r++) {
    const row: number[] = []
    for (let c = 0; c < size; c++) {
      const d = ((c - cx) ** 2 + (r - cy) ** 2) / (2 * w * w)
      const v = base + amp * Math.exp(-d) + gaussian(rng) * noise
      row.push(v)
      min = Math.min(min, v)
      max = Math.max(max, v)
    }
    values.push(row)
  }
  let peak = { r: 0, c: 0, v: -Infinity }
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (values[r][c] > peak.v) peak = { r, c, v: values[r][c] }
  const nb: number[] = []
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue
      const rr = peak.r + dr
      const cc = peak.c + dc
      if (rr >= 0 && rr < size && cc >= 0 && cc < size) nb.push(values[rr][cc])
    }
  const neighbourRatio = peak.v > 0 ? mean(nb) / peak.v : NaN
  return { size, xs, ys, values, peak, neighbourRatio, min, max }
}

/* -------------------------------- Monte Carlo ------------------------------ */

export interface FanPoint {
  i: number
  p5: number
  p25: number
  p50: number
  p75: number
  p95: number
}
export interface MCResult {
  runs: number
  horizon: number
  fan: FanPoint[]
  /** share of runs whose max drawdown (₹) reached the threshold */
  probDD: number
  probLoss: number
  ddP50: number
  ddP95: number
  finalP5: number
  finalP50: number
  finalP95: number
}

/** Resample the trade list with replacement `runs` times (capped at 1000). Trade ORDER is what changes. */
export function monteCarlo(pnls: number[], runs: number, ddThreshold: number, capital: number, seed: number): MCResult {
  const R = clamp(Math.round(runs), 10, 1000)
  const H = pnls.length
  const rng = mulberry32(seed)
  const step = Math.max(1, Math.floor(H / 80))
  const sampleIdx: number[] = []
  for (let i = 0; i <= H; i += step) sampleIdx.push(i)
  if (sampleIdx[sampleIdx.length - 1] !== H) sampleIdx.push(H)
  const snaps: Float64Array[] = sampleIdx.map(() => new Float64Array(R))
  const maxDDs: number[] = []
  const finals: number[] = []
  let hit = 0
  let lossy = 0
  for (let r = 0; r < R; r++) {
    let eq = 0
    let peak = 0
    let dd = 0
    let s = 0
    snaps[0][r] = 0
    for (let i = 1; i <= H; i++) {
      eq += pnls[Math.floor(rng() * H)]
      if (eq > peak) peak = eq
      if (peak - eq > dd) dd = peak - eq
      if (s + 1 < sampleIdx.length && i === sampleIdx[s + 1]) {
        s++
        snaps[s][r] = eq
      }
    }
    maxDDs.push(dd)
    finals.push(eq)
    if (dd >= ddThreshold) hit++
    if (eq < 0) lossy++
  }
  void capital
  const fan: FanPoint[] = sampleIdx.map((i, k) => {
    const sorted = Array.from(snaps[k]).sort((a, b) => a - b)
    return { i, p5: percentile(sorted, 0.05), p25: percentile(sorted, 0.25), p50: percentile(sorted, 0.5), p75: percentile(sorted, 0.75), p95: percentile(sorted, 0.95) }
  })
  const dds = [...maxDDs].sort((a, b) => a - b)
  const fs = [...finals].sort((a, b) => a - b)
  return {
    runs: R,
    horizon: H,
    fan,
    probDD: hit / R,
    probLoss: lossy / R,
    ddP50: percentile(dds, 0.5),
    ddP95: percentile(dds, 0.95),
    finalP5: percentile(fs, 0.05),
    finalP50: percentile(fs, 0.5),
    finalP95: percentile(fs, 0.95),
  }
}

/* --------------------------------- regimes --------------------------------- */

export interface RegimeRow {
  key: string
  label: string
  n: number
  winRate: number
  expectancy: number
  total: number
  /** standard error of the mean net P&L per trade */
  se: number
  /** |expectancy| < 2·se → indistinguishable from noise */
  noisy: boolean
}

function regimeRow(key: string, label: string, ts: Trade[]): RegimeRow {
  const p = ts.map((t) => t.net)
  const sd = stdev(p)
  const se = ts.length > 1 ? sd / Math.sqrt(ts.length) : NaN
  const e = mean(p)
  return {
    key,
    label,
    n: ts.length,
    winRate: ts.length ? ts.filter((t) => t.net > 0).length / ts.length : NaN,
    expectancy: e,
    total: p.reduce((s, x) => s + x, 0),
    se,
    noisy: !(Math.abs(e) >= 2 * se),
  }
}

export function regimeBreakdown(trades: Trade[]): { vix: RegimeRow[]; expiry: RegimeRow[] } {
  return {
    vix: [
      regimeRow('low', 'Low VIX (< 13)', trades.filter((t) => t.vix === 'low')),
      regimeRow('mid', 'Mid VIX (13–18)', trades.filter((t) => t.vix === 'mid')),
      regimeRow('high', 'High VIX (> 18)', trades.filter((t) => t.vix === 'high')),
    ],
    expiry: [
      regimeRow('exp', 'Expiry day', trades.filter((t) => t.expiry)),
      regimeRow('non', 'Non-expiry day', trades.filter((t) => !t.expiry)),
    ],
  }
}
