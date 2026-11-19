/** Deterministic, seeded NIFTY weekly option-chain simulation (educational, not market data).
 *  12 sequential 5-minute snapshots from 09:20. Premiums are Black–Scholes with an IV smile/skew plus small noise,
 *  OI follows a scripted-but-noisy storyline (fresh writing, unwinding, a writer exit) so each concept is visible. */
import { bs } from '@/lib/bs'
import { mulberry32, gaussian } from '@/lib/rng'

export type Side = 'CE' | 'PE'
export type CompareMode = 'prev' | 'open'

export interface SideData {
  oi: number
  /** Change in OI against the previous snapshot (for snapshot 0 this equals the change vs open). */
  chgPrev: number
  /** Change in OI against the session-open baseline (the day's starting OI). */
  chgOpen: number
  volume: number
  iv: number
  ltp: number
  /** LTP minus the previous session's closing premium for this contract. */
  netChg: number
  bid: number
  bidQty: number
  ask: number
  askQty: number
}
export interface ChainRow { strike: number; ce: SideData; pe: SideData }
export interface ChainSnapshot { index: number; time: string; spot: number; vix: number; rows: ChainRow[]; note: string }

export const CHAIN_STRIKES = Array.from({ length: 21 }, (_, i) => 23500 + i * 50)
export const CHAIN_DTE = 7
export const CHAIN_RATE = 0.065
export const CHAIN_LOT = 65
export const CHAIN_EXPIRY_LABEL = 'Weekly expiry · 7 days to go'

const SPOTS = [24012, 24026, 24041, 24033, 24058, 24084, 24102, 24118, 24096, 24070, 24082, 24107]
const VIX = [14.2, 14.1, 14.0, 13.9, 13.8, 13.8, 13.7, 13.9, 14.0, 14.1, 14.0, 13.9]
const PREV_CLOSE_SPOT = 23982
const PREV_CLOSE_IV = 0.146

interface Adj { side: Side; strike: number; pct: number }
/** Scripted OI storyline, in percent of that strike's current OI. */
const SCRIPT: Adj[][] = [
  [{ side: 'CE', strike: 24100, pct: 9 }, { side: 'PE', strike: 23900, pct: 8 }],
  [{ side: 'PE', strike: 23900, pct: 6 }, { side: 'PE', strike: 24000, pct: 5 }, { side: 'CE', strike: 24150, pct: 4 }],
  [{ side: 'CE', strike: 24100, pct: 5 }, { side: 'CE', strike: 24200, pct: 6 }, { side: 'PE', strike: 23800, pct: 3 }],
  [{ side: 'CE', strike: 24000, pct: -4 }, { side: 'CE', strike: 24050, pct: -3 }],
  [{ side: 'CE', strike: 24000, pct: -8 }, { side: 'CE', strike: 24050, pct: -6 }, { side: 'PE', strike: 24000, pct: 7 }],
  [{ side: 'CE', strike: 24050, pct: -10 }, { side: 'PE', strike: 24050, pct: 9 }, { side: 'PE', strike: 24000, pct: 6 }],
  [{ side: 'CE', strike: 24100, pct: 2 }, { side: 'CE', strike: 24150, pct: 7 }],
  [{ side: 'CE', strike: 24100, pct: -17 }, { side: 'CE', strike: 24150, pct: -5 }, { side: 'PE', strike: 24100, pct: 10 }],
  [{ side: 'CE', strike: 24150, pct: 9 }, { side: 'CE', strike: 24200, pct: 8 }, { side: 'PE', strike: 24000, pct: -6 }],
  [{ side: 'PE', strike: 24100, pct: -5 }, { side: 'PE', strike: 24050, pct: -4 }, { side: 'CE', strike: 24100, pct: 6 }],
  [{ side: 'CE', strike: 24100, pct: 8 }, { side: 'PE', strike: 23950, pct: 5 }],
  [{ side: 'CE', strike: 24200, pct: 5 }, { side: 'PE', strike: 24000, pct: -3 }, { side: 'CE', strike: 24100, pct: 3 }],
]

const NOTES = [
  'Opening snapshot. Heavy call OI sits at 24,100–24,200 and heavy put OI at 23,800–23,900 — the usual first look at where positions are concentrated.',
  'OI is rising at 23,900 and 24,000 puts. That is consistent with fresh put writing, but OI alone cannot show who initiated the trades.',
  'Call OI keeps building at 24,100 and 24,200 while spot edges up. The cluster is a potential resistance zone, not a guarantee.',
  'Spot ticks up and OI falls at 24,000 and 24,050 calls — consistent with call unwinding or short covering; volume and price direction help tell which.',
  'Further call OI reduction near the money as spot rises, with puts at 24,000 adding. Several adjacent strikes moving together is a stronger clue than one strike.',
  'Spot approaches 24,100. Near-the-money calls keep shedding OI while 24,050 puts add — support is shifting up with price.',
  'Spot reaches the 24,100 call cluster. OI at 24,150 calls rises as higher strikes take on new positions.',
  'A sharp OI fall at the 24,100 calls as spot trades through it: a possible writer exit. The level that looked like a wall has weakened for now.',
  'Spot slips back. Fresh OI appears at 24,150 and 24,200 calls while 24,000 puts shed OI; the resistance zone is migrating one strike higher.',
  'OI at 24,100 calls rebuilds as spot eases to 24,070; 24,050–24,100 puts trim. Positions are being re-shaped around the new price.',
  'Call OI at 24,100 climbs again and 23,950 puts add. The picture is mixed — a good moment to cross-check IV and volume, not to force a conclusion.',
  'Spot back near 24,107 with call OI building at 24,100–24,200. Whether this holds depends on price acceptance, volume and IV, not OI alone.',
]

const tick = (x: number) => Math.max(0.05, Math.round(x / 0.05) * 0.05)

const smileIV = (atmIV: number, strike: number, spot: number) => {
  const m = (strike - spot) / spot
  return Math.max(0.06, atmIV - 0.9 * m + 6 * m * m)
}

function baseOI(side: Side, strike: number, rng: () => number): number {
  const bump = (c: number, w: number, h: number) => h * Math.exp(-(((strike - c) / w) ** 2))
  const ceProfile = 38000 + bump(24150, 110, 168000) + bump(24500, 130, 70000) + bump(24000, 90, 40000)
  const peProfile = 38000 + bump(23850, 110, 160000) + bump(23500, 130, 66000) + bump(24000, 90, 52000)
  const p = side === 'CE' ? ceProfile : peProfile
  // far OTM wings thin out a little on the opposite side
  const wing = side === 'CE' ? Math.max(0.35, 1 - Math.max(0, 24000 - strike) / 900) : Math.max(0.35, 1 - Math.max(0, strike - 24000) / 900)
  return Math.round((p * wing * (0.9 + rng() * 0.2)) / 65) * 65 / 65
}

function buildSim(): ChainSnapshot[] {
  const rng = mulberry32(2025_11_07)
  const oiOpen: Record<Side, number[]> = {
    CE: CHAIN_STRIKES.map((k) => Math.round(baseOI('CE', k, rng))),
    PE: CHAIN_STRIKES.map((k) => Math.round(baseOI('PE', k, rng))),
  }
  let oi: Record<Side, number[]> = { CE: [...oiOpen.CE], PE: [...oiOpen.PE] }
  let vol: Record<Side, number[]> = { CE: CHAIN_STRIKES.map(() => 0), PE: CHAIN_STRIKES.map(() => 0) }
  const prevClose = (side: Side, k: number) => bs(side, PREV_CLOSE_SPOT, k, (CHAIN_DTE + 1) / 365, CHAIN_RATE, smileIV(PREV_CLOSE_IV, k, PREV_CLOSE_SPOT)).price
  const out: ChainSnapshot[] = []

  for (let s = 0; s < SPOTS.length; s++) {
    const spot = SPOTS[s]
    const prevOI = { CE: [...oi.CE], PE: [...oi.PE] }
    const T = (CHAIN_DTE - s * 0.0035) / 365
    const sides: Side[] = ['CE', 'PE']
    for (const side of sides) {
      oi[side] = oi[side].map((v, i) => {
        // morning drift: modest net build-up everywhere plus noise
        const drift = s === 0 ? 0.004 + rng() * 0.03 : -0.004 + rng() * 0.016 + gaussian(rng) * 0.004
        const adj = SCRIPT[s].find((a) => a.side === side && a.strike === CHAIN_STRIKES[i])
        return Math.max(260, Math.round(v * (1 + drift + (adj ? adj.pct / 100 : 0))))
      })
      vol[side] = vol[side].map((v, i) => {
        const dist = Math.abs(CHAIN_STRIKES[i] - spot)
        const act = Math.exp(-dist / 260)
        const adj = SCRIPT[s].find((a) => a.side === side && a.strike === CHAIN_STRIKES[i])
        const inc = oi[side][i] * (0.035 + 0.11 * act) * (0.7 + rng() * 0.7) * (adj ? 1.9 : 1)
        return v + Math.round(inc)
      })
    }
    const atmIV = VIX[s] / 100 + gaussian(rng) * 0.0006
    const rows: ChainRow[] = CHAIN_STRIKES.map((k, i) => {
      const mk = (side: Side): SideData => {
        const iv = Math.max(0.06, smileIV(atmIV, k, spot) + (side === 'PE' ? 0.0012 : 0) + gaussian(rng) * 0.0012)
        const theo = bs(side, spot, k, T, CHAIN_RATE, iv).price
        const ltp = tick(theo * (1 + gaussian(rng) * 0.006))
        const dist = Math.abs(k - spot) / 50
        const half = Math.max(0.05, ltp * (0.0015 + 0.0022 * dist) + 0.025 * dist * 0.4)
        const bid = Math.max(0.05, tick(ltp - half))
        const ask = Math.max(bid + 0.05, tick(ltp + half))
        const thin = 1 / (1 + dist * 0.18)
        return {
          oi: oi[side][i],
          chgPrev: s === 0 ? oi[side][i] - oiOpen[side][i] : oi[side][i] - prevOI[side][i],
          chgOpen: oi[side][i] - oiOpen[side][i],
          volume: vol[side][i],
          iv: iv * 100,
          ltp,
          netChg: ltp - prevClose(side, k),
          bid,
          bidQty: Math.round((40 + rng() * 260) * thin + 5) * CHAIN_LOT,
          ask,
          askQty: Math.round((40 + rng() * 260) * thin + 5) * CHAIN_LOT,
        }
      }
      return { strike: k, ce: mk('CE'), pe: mk('PE') }
    })
    const mins = 20 + s * 5
    out.push({ index: s, time: `${String(9 + Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`, spot, vix: VIX[s], rows, note: NOTES[s] })
  }
  return out
}

export const CHAIN_SNAPSHOTS: ChainSnapshot[] = buildSim()

export interface OiMove { strike: number; side: Side; chg: number }
export interface ChainStats {
  atmStrike: number
  totalCE: number
  totalPE: number
  chgCE: number
  chgPE: number
  volCE: number
  volPE: number
  pcrOI: number
  pcrVol: number
  maxCE: { strike: number; oi: number }
  maxPE: { strike: number; oi: number }
  straddle: number
  impliedMovePct: number
  biggestAdd: OiMove
  biggestCut: OiMove
  topCE: number[]
  topPE: number[]
}

export function chainStats(snap: ChainSnapshot, mode: CompareMode): ChainStats {
  const chg = (d: SideData) => (mode === 'prev' ? d.chgPrev : d.chgOpen)
  const atmStrike = Math.round(snap.spot / 50) * 50
  const rows = snap.rows
  const sum = (f: (r: ChainRow) => number) => rows.reduce((a, r) => a + f(r), 0)
  const totalCE = sum((r) => r.ce.oi)
  const totalPE = sum((r) => r.pe.oi)
  const volCE = sum((r) => r.ce.volume)
  const volPE = sum((r) => r.pe.volume)
  const maxOf = (side: 'ce' | 'pe') => rows.reduce((b, r) => (r[side].oi > b.oi ? { strike: r.strike, oi: r[side].oi } : b), { strike: 0, oi: -1 })
  const atm = rows.find((r) => r.strike === atmStrike) ?? rows[0]
  const moves: OiMove[] = rows.flatMap((r) => [
    { strike: r.strike, side: 'CE' as const, chg: chg(r.ce) },
    { strike: r.strike, side: 'PE' as const, chg: chg(r.pe) },
  ])
  const biggestAdd = moves.reduce((b, m) => (m.chg > b.chg ? m : b), moves[0])
  const biggestCut = moves.reduce((b, m) => (m.chg < b.chg ? m : b), moves[0])
  const top = (side: 'ce' | 'pe') => [...rows].sort((a, b) => b[side].oi - a[side].oi).slice(0, 3).map((r) => r.strike)
  const straddle = atm.ce.ltp + atm.pe.ltp
  return {
    atmStrike, totalCE, totalPE, chgCE: sum((r) => chg(r.ce)), chgPE: sum((r) => chg(r.pe)), volCE, volPE,
    pcrOI: totalPE / totalCE, pcrVol: volPE / volCE, maxCE: maxOf('ce'), maxPE: maxOf('pe'),
    straddle, impliedMovePct: (straddle / snap.spot) * 100, biggestAdd, biggestCut, topCE: top('ce'), topPE: top('pe'),
  }
}
