/** Deterministic randomness so "simulated" visuals are stable between renders. */
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Box–Muller standard normal from a uniform rng. */
export function gaussian(rng: () => number) {
  let u = 0
  let v = 0
  while (u === 0) u = rng()
  while (v === 0) v = rng()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

export interface Candle {
  t: number
  o: number
  h: number
  l: number
  c: number
  v: number
}

/** Seeded OHLC random walk. `drift` and `vol` are per-bar fractions of price. */
export function genCandles(seed: number, n: number, start: number, drift = 0, vol = 0.0016): Candle[] {
  const rng = mulberry32(seed)
  const out: Candle[] = []
  let p = start
  for (let i = 0; i < n; i++) {
    const o = p
    const c = o * (1 + drift + gaussian(rng) * vol)
    const wick = Math.abs(gaussian(rng)) * vol * 0.55
    const h = Math.max(o, c) * (1 + wick)
    const l = Math.min(o, c) * (1 - Math.abs(gaussian(rng)) * vol * 0.55)
    const v = Math.round(60000 * (0.6 + rng() * 0.9) * (1 + (Math.abs(c - o) / o) / vol))
    out.push({ t: i, o, h, l, c, v })
    p = c
  }
  return out
}

export const percentile = (sorted: number[], p: number) => {
  if (!sorted.length) return NaN
  const idx = (sorted.length - 1) * p
  const lo = Math.floor(idx)
  const hi = Math.ceil(idx)
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo)
}
