import { gaussian, mulberry32, type Candle } from '@/lib/rng'

/** Simulated NIFTY 5-minute session generator. Everything is seeded and deterministic. */
export const BARS = 75
export const RESISTANCE = 24000
export const SUPPORT = 23900
export const SESSION_START_MIN = 9 * 60 + 15

export const barTime = (i: number) => {
  const m = SESSION_START_MIN + i * 5
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

export type ScenarioId = 'genuine' | 'false' | 'range' | 'breakdown'
type Anchor = [number, number]
interface Clamp { from: number; to: number; lo?: number; hi?: number; hMax?: number; lMin?: number }

export interface ScenarioDef {
  id: ScenarioId
  label: string
  blurb: string
  /** Which level this scenario puts on trial. */
  side: 'up' | 'down'
  seed: number
  anchors: Anchor[]
  clamps: Clamp[]
  pinClose?: Record<number, number>
  pinHigh?: Record<number, number>
  pinLow?: Record<number, number>
  volMult: Anchor[]
  /** OI (lakh contracts) at the level on trial: CE OI at 24,000 for 'up', PE OI at 23,900 for 'down'. */
  oi: Anchor[]
  vix: Anchor[]
  noise: number
}

export const SCENARIOS: ScenarioDef[] = [
  {
    id: 'genuine', label: 'Genuine breakout', side: 'up', seed: 11, noise: 3.2,
    blurb: 'Price compresses under resistance, closes beyond it on a volume surge, retests the level on light volume and holds.',
    anchors: [[0, 23948], [8, 23935], [16, 23960], [24, 23945], [30, 23972], [33, 23984], [34, 24009], [35, 24015], [38, 24008], [42, 24004], [44, 24004], [50, 24030], [60, 24056], [70, 24074], [74, 24086]],
    clamps: [{ from: 0, to: 33, lo: 23915, hi: 23993, hMax: 23997 }, { from: 35, to: 74, lo: 24003, lMin: 24001 }],
    pinClose: { 34: 24009, 44: 24005 }, pinLow: { 44: 24001 },
    volMult: [[0, 1], [33, 1], [34, 2.9], [35, 1.9], [37, 1.2], [43, 0.7], [45, 0.8], [50, 1.3], [74, 1]],
    oi: [[0, 60], [33, 66], [34, 65.6], [38, 61.5], [50, 57], [74, 50]],
    vix: [[0, 14.6], [30, 14.5], [34, 14.4], [50, 13.9], [74, 13.4]],
  },
  {
    id: 'false', label: 'False breakout (failed)', side: 'up', seed: 23, noise: 3,
    blurb: 'Equal highs build stops above 23,990. Price sweeps them, tags 24,000, then closes back inside: trapped buyers feed the reversal.',
    anchors: [[0, 23948], [5, 23962], [10, 23978], [14, 23991], [18, 23972], [22, 23978], [26, 23992], [30, 23975], [34, 23982], [36, 23991], [37, 24004], [38, 23981], [40, 23970], [46, 23950], [55, 23935], [65, 23917], [74, 23904]],
    clamps: [{ from: 0, to: 36, lo: 23915, hi: 23992, hMax: 23996 }, { from: 38, to: 74, lo: 23899, hi: 23992, hMax: 23995 }],
    pinClose: { 14: 23991, 26: 23992, 37: 24004, 38: 23981 }, pinHigh: { 14: 23994, 26: 23995, 37: 24019 },
    volMult: [[0, 1], [35, 1], [36, 1.5], [37, 3.1], [38, 2.3], [40, 1.6], [48, 1.2], [74, 1]],
    oi: [[0, 58], [30, 62], [36, 63], [37, 66], [45, 72], [74, 79]],
    vix: [[0, 14.8], [34, 14.8], [37, 15.1], [50, 15.7], [74, 16.2]],
  },
  {
    id: 'range', label: 'Range-bound', side: 'up', seed: 37, noise: 3.4,
    blurb: 'Price rotates between support and resistance on fading volume. Neither level gets accepted; nothing confirms.',
    anchors: [[0, 23948], [10, 23922], [20, 23975], [30, 23930], [40, 23978], [50, 23925], [60, 23970], [74, 23950]],
    clamps: [{ from: 0, to: 74, lo: 23912, hi: 23986, hMax: 23996, lMin: 23903 }],
    volMult: [[0, 1], [30, 0.85], [74, 0.7]],
    oi: [[0, 60], [74, 68]],
    vix: [[0, 14.5], [74, 14.0]],
  },
  {
    id: 'breakdown', label: 'Breakdown & retest', side: 'down', seed: 41, noise: 3,
    blurb: 'Price leans on 23,900, closes below it on heavy volume, pulls back to retest from underneath and is rejected.',
    anchors: [[0, 23948], [8, 23935], [16, 23916], [22, 23936], [28, 23915], [32, 23920], [35, 23909], [36, 23891], [40, 23884], [44, 23892], [46, 23892], [52, 23872], [62, 23852], [74, 23836]],
    clamps: [{ from: 0, to: 35, lo: 23906, hi: 23985, lMin: 23902, hMax: 23990 }, { from: 37, to: 74, hi: 23894, hMax: 23897 }],
    pinClose: { 36: 23891, 46: 23892 }, pinLow: { 16: 23904, 28: 23905, 36: 23887 }, pinHigh: { 46: 23897 },
    volMult: [[0, 1], [34, 1], [36, 3], [37, 2], [41, 1.1], [45, 0.7], [47, 1.1], [52, 1.4], [74, 1]],
    oi: [[0, 55], [30, 62], [35, 63], [40, 58], [60, 48], [74, 44]],
    vix: [[0, 14.5], [34, 14.6], [38, 15.0], [60, 15.5], [74, 15.9]],
  },
]

const interp = (a: Anchor[], x: number) => {
  if (x <= a[0][0]) return a[0][1]
  for (let k = 1; k < a.length; k++) {
    if (x <= a[k][0]) {
      const [x0, y0] = a[k - 1]
      const [x1, y1] = a[k]
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0 || 1)
    }
  }
  return a[a.length - 1][1]
}
const clampTo = (v: number, lo?: number, hi?: number) => Math.min(hi ?? Infinity, Math.max(lo ?? -Infinity, v))

export interface Session { candles: Candle[]; oi: number[]; vix: number[]; def: ScenarioDef }

const cache = new Map<ScenarioId, Session>()
export function buildSession(id: ScenarioId): Session {
  const hit = cache.get(id)
  if (hit) return hit
  const def = SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0]
  const rng = mulberry32(def.seed)
  const candles: Candle[] = []
  let prev = def.anchors[0][1]
  let n = 0
  for (let i = 0; i < BARS; i++) {
    n = n * 0.5 + gaussian(rng) * def.noise
    let c = interp(def.anchors, i) + n
    const k = def.clamps.find((q) => i >= q.from && i <= q.to)
    c = clampTo(c, k?.lo, k?.hi)
    if (def.pinClose?.[i] !== undefined) c = def.pinClose[i]
    const o = prev
    let h = Math.max(o, c) + Math.abs(gaussian(rng)) * 2.4 + 0.6
    let l = Math.min(o, c) - Math.abs(gaussian(rng)) * 2.4 - 0.6
    if (k?.hMax !== undefined) h = Math.max(Math.max(o, c), Math.min(h, k.hMax))
    if (k?.lMin !== undefined) l = Math.min(Math.min(o, c), Math.max(l, k.lMin))
    if (def.pinHigh?.[i] !== undefined) h = Math.max(def.pinHigh[i], o, c)
    if (def.pinLow?.[i] !== undefined) l = Math.min(def.pinLow[i], o, c)
    const session = 1 + 0.9 * Math.exp(-i / 6) + 0.4 * Math.exp(-(BARS - 1 - i) / 6)
    const v = Math.round(90000 * (0.75 + rng() * 0.5) * (1 + (Math.abs(c - o) / 6) * 0.3) * session * interp(def.volMult, i))
    candles.push({ t: i, o: Math.round(o * 20) / 20, h: Math.round(h * 20) / 20, l: Math.round(l * 20) / 20, c: Math.round(c * 20) / 20, v })
    prev = candles[i].c
  }
  const oi = Array.from({ length: BARS }, (_, i) => Math.round((interp(def.oi, i) + gaussian(rng) * 0.12) * 10) / 10)
  const vix = Array.from({ length: BARS }, (_, i) => Math.round((interp(def.vix, i) + gaussian(rng) * 0.03) * 100) / 100)
  const s = { candles, oi, vix, def }
  cache.set(id, s)
  return s
}
