import type { Candle } from '@/lib/rng'
import { RESISTANCE, SUPPORT, barTime, type Session } from './session'

/* ------------------------------------------------------------------ swings */

export type SwingLabel = 'HH' | 'HL' | 'LH' | 'LL'
export interface Swing { index: number; kind: 'high' | 'low'; price: number; label: SwingLabel | null }

/** Confirmed pivots (k bars each side, so a pivot only appears k bars after it forms) labelled against the previous pivot of the same kind. */
export function computeSwings(candles: Candle[], vis: number, k = 4): Swing[] {
  const out: Swing[] = []
  let lastHigh: number | null = null
  let lastLow: number | null = null
  for (let i = k; i + k < vis; i++) {
    let isH = true
    let isL = true
    for (let j = 1; j <= k; j++) {
      if (candles[i].h <= candles[i - j].h || candles[i].h < candles[i + j].h) isH = false
      if (candles[i].l >= candles[i - j].l || candles[i].l > candles[i + j].l) isL = false
    }
    if (isH) {
      const label: SwingLabel | null = lastHigh === null ? null : candles[i].h > lastHigh ? 'HH' : 'LH'
      out.push({ index: i, kind: 'high', price: candles[i].h, label })
      lastHigh = candles[i].h
    } else if (isL) {
      const label: SwingLabel | null = lastLow === null ? null : candles[i].l > lastLow ? 'HL' : 'LL'
      out.push({ index: i, kind: 'low', price: candles[i].l, label })
      lastLow = candles[i].l
    }
  }
  return out
}

/* ------------------------------------------------------------ volume profile */

export interface ProfileBin { lo: number; hi: number; mid: number; vol: number; inValue: boolean; node: 'hvn' | 'lvn' | null }
export interface VolumeProfile {
  bins: ProfileBin[]
  step: number
  poc: ProfileBin | null
  vah: number
  val: number
  total: number
  valueShare: number
}

/** Spreads each bar's volume evenly across the price bins it traded through. */
export function computeProfile(candles: Candle[], vis: number, step = 5): VolumeProfile {
  const seen = candles.slice(0, vis)
  if (seen.length === 0) return { bins: [], step, poc: null, vah: NaN, val: NaN, total: 0, valueShare: 0 }
  const lo = Math.floor(Math.min(...seen.map((c) => c.l)) / step) * step
  const hi = Math.ceil(Math.max(...seen.map((c) => c.h)) / step) * step
  const n = Math.max(1, Math.round((hi - lo) / step))
  const vols = new Array<number>(n).fill(0)
  for (const c of seen) {
    const span = Math.max(c.h - c.l, 0.01)
    const b0 = Math.max(0, Math.floor((c.l - lo) / step))
    const b1 = Math.min(n - 1, Math.floor((c.h - 1e-9 - lo) / step))
    for (let b = b0; b <= b1; b++) {
      const bl = lo + b * step
      const overlap = Math.min(c.h, bl + step) - Math.max(c.l, bl)
      if (overlap > 0) vols[b] += (c.v * overlap) / span
    }
  }
  const total = vols.reduce((s, v) => s + v, 0)
  let pocIdx = 0
  vols.forEach((v, i) => { if (v > vols[pocIdx]) pocIdx = i })
  // 70% value area: grow from the POC toward whichever neighbouring bin holds more volume.
  let a = pocIdx
  let b = pocIdx
  let acc = vols[pocIdx]
  while (acc < total * 0.7 && (a > 0 || b < n - 1)) {
    const up = b < n - 1 ? vols[b + 1] : -1
    const dn = a > 0 ? vols[a - 1] : -1
    if (up >= dn) { b += 1; acc += vols[b] } else { a -= 1; acc += vols[a] }
  }
  const mean = total / n
  const bins: ProfileBin[] = vols.map((vol, i) => {
    const left = i > 0 ? vols[i - 1] : vol
    const right = i < n - 1 ? vols[i + 1] : vol
    let node: ProfileBin['node'] = null
    if (n >= 5 && i > 0 && i < n - 1) {
      if (vol >= left && vol >= right && vol > mean * 1.25) node = 'hvn'
      else if (vol <= left && vol <= right && vol < mean * 0.6) node = 'lvn'
    }
    return { lo: lo + i * step, hi: lo + (i + 1) * step, mid: lo + (i + 0.5) * step, vol, inValue: i >= a && i <= b, node }
  })
  return { bins, step, poc: bins[pocIdx], vah: lo + (b + 1) * step, val: lo + a * step, total, valueShare: total ? acc / total : 0 }
}

/* ------------------------------------------------------ liquidity / sweeps */

export interface Sweep { eqIdx: [number, number]; eqPrice: number; sweepIdx: number; backInsideIdx: number | null; sweepHigh: number }

/** Equal highs (two confirmed swing highs within `tol` points, both below the level) followed by a bar that trades through them and closes back below. */
export function detectSweep(candles: Candle[], vis: number, level: number, tol = 5): Sweep | null {
  const pivots = computeSwings(candles, vis, 2).filter((s) => s.kind === 'high' && s.price < level)
  for (let a = 0; a < pivots.length; a++) {
    for (let b = a + 1; b < pivots.length; b++) {
      if (Math.abs(pivots[a].price - pivots[b].price) > tol || pivots[b].index - pivots[a].index < 4) continue
      const eq = Math.max(pivots[a].price, pivots[b].price)
      for (let j = pivots[b].index + 3; j < vis; j++) {
        if (candles[j].h > eq + 1) {
          let back: number | null = null
          for (let q = j; q < Math.min(vis, j + 3); q++) if (candles[q].c < eq) { back = q; break }
          return { eqIdx: [pivots[a].index, pivots[b].index], eqPrice: eq, sweepIdx: j, backInsideIdx: back, sweepHigh: candles[j].h }
        }
      }
    }
  }
  return null
}

/* ---------------------------------------------------------- confirmations */

export type Check = 'pass' | 'fail' | 'wait'
export interface TfClose { label: string; bars: number; state: Check; detail: string }
export interface ChecklistItem { id: string; title: string; state: Check; detail: string; sub?: TfClose[] }

export interface Analysis {
  side: 'up' | 'down'
  level: number
  levelName: string
  firstBeyond: number | null
  closedBackInside: number | null
  items: ChecklistItem[]
  score: number
  total: number
  verdictTone: 'gold' | 'ice' | 'bear' | 'bull'
  verdictHead: string
  verdict: string
  invalidation: string[]
  /** Event labels for the chart (data-derived). */
  events: { index: number; label: string; tone: 'bull' | 'bear' | 'gold' | 'ice'; below?: boolean; note: string }[]
  sweep: Sweep | null
}

const fmt = (n: number) => n.toLocaleString('en-IN')
const beyond = (side: 'up' | 'down', price: number, level: number) => (side === 'up' ? price > level : price < level)

export function analyse(session: Session, vis: number): Analysis {
  const { candles, oi, vix, def } = session
  const side = def.side
  const level = side === 'up' ? RESISTANCE : SUPPORT
  const levelName = side === 'up' ? 'resistance' : 'support'
  const dir = side === 'up' ? 'above' : 'below'
  const last = vis - 1

  // first 5-min close beyond the level
  let firstBeyond: number | null = null
  for (let i = 0; i < vis; i++) if (beyond(side, candles[i].c, level)) { firstBeyond = i; break }
  const latestBeyond = vis > 0 && beyond(side, candles[last].c, level)
  const closedBackInside = firstBeyond !== null && !latestBeyond ? (() => { for (let i = firstBeyond + 1; i < vis; i++) if (!beyond(side, candles[i].c, level)) return i; return null })() : null

  /* 1. closes on 5 / 15 / 30 min */
  const tfs: [string, number][] = [['5-min', 1], ['15-min', 3], ['30-min', 6]]
  const sub: TfClose[] = tfs.map(([label, bars]) => {
    // last completed block (blocks are anchored to 09:15)
    const end = Math.floor((vis) / bars) * bars - 1
    if (end < 0) return { label, bars, state: 'wait', detail: 'no completed bar yet' }
    const close = candles[end].c
    const ok = beyond(side, close, level)
    return { label, bars, state: ok ? 'pass' : 'fail', detail: `${barTime(end)} bar closed ${fmt(close)}` }
  })
  const closesPass = sub.every((s) => s.state === 'pass')
  const closesState: Check = vis === 0 ? 'wait' : closesPass ? 'pass' : firstBeyond === null ? 'wait' : 'fail'

  /* 2. volume vs average */
  let volState: Check = 'wait'
  let volDetail = `Waiting for a close ${dir} ${fmt(level)}.`
  if (firstBeyond !== null) {
    const prior = candles.slice(Math.max(0, firstBeyond - 20), firstBeyond)
    const avg = prior.length ? prior.reduce((s, c) => s + c.v, 0) / prior.length : candles[firstBeyond].v
    const ratio = candles[firstBeyond].v / avg
    volState = ratio >= 1.5 ? 'pass' : 'fail'
    volDetail = `Breakout bar (${barTime(firstBeyond)}) traded ${ratio.toFixed(1)}× the prior-20-bar average. Rule of thumb here: 1.5× or more.`
  }

  /* 3. OI at the level (simulated) */
  const oiName = side === 'up' ? 'CE' : 'PE'
  let oiState: Check = 'wait'
  let oiDetail = `Waiting for a close ${dir} ${fmt(level)}.`
  if (firstBeyond !== null) {
    let peak = 0
    for (let i = 0; i <= Math.min(last, firstBeyond); i++) peak = Math.max(peak, oi[i])
    const now = oi[last]
    const chg = (now - peak) / peak
    if (!latestBeyond) {
      oiState = 'fail'
      oiDetail = `Price is back inside the range and ${oiName} OI at ${fmt(level)} is ${chg >= 0 ? 'up' : 'down'} ${(Math.abs(chg) * 100).toFixed(1)}% from its pre-break peak. OI cannot say who initiated: this may be fresh writing defending the level.`
    } else if (chg <= -0.03) {
      oiState = 'pass'
      oiDetail = `Simulated ${oiName} OI at ${fmt(level)} has eased ${(Math.abs(chg) * 100).toFixed(1)}% from its pre-break peak: consistent with writers exiting or covering. OI alone cannot show who initiated.`
    } else {
      oiState = 'fail'
      oiDetail = `Simulated ${oiName} OI at ${fmt(level)} has not eased (${chg >= 0 ? '+' : '−'}${(Math.abs(chg) * 100).toFixed(1)}% vs pre-break peak): writers may still be defending the level.`
    }
  }

  /* 4. retest holding */
  let retState: Check = 'wait'
  let retDetail = 'No breakout yet, so nothing to retest.'
  let retestIdx: number | null = null
  if (firstBeyond !== null) {
    for (let i = firstBeyond + 1; i < vis; i++) {
      const touched = side === 'up' ? candles[i].l <= level + 6 : candles[i].h >= level - 6
      if (touched) { retestIdx = i; break }
    }
    if (!latestBeyond) {
      retState = 'fail'
      retDetail = `Price closed back ${side === 'up' ? 'below' : 'above'} ${fmt(level)} at ${barTime(closedBackInside ?? last)}: the level did not hold.`
    } else if (retestIdx === null) {
      retState = 'wait'
      retDetail = `Price has not come back to ${fmt(level)} yet. A retest that holds is the stronger sign; none is not a failure.`
    } else {
      const after = candles.slice(retestIdx, vis)
      const held = after.every((c) => beyond(side, c.c, level))
      retState = held ? 'pass' : 'fail'
      retDetail = held ? `Price came back to ${fmt(level)} at ${barTime(retestIdx)} and every close since stayed ${dir} it.` : `Retest at ${barTime(retestIdx)} was followed by a close back through the level.`
    }
  }

  /* 5. India VIX direction */
  let vixState: Check = 'wait'
  let vixDetail = `Waiting for a close ${dir} ${fmt(level)}.`
  if (firstBeyond !== null) {
    const ref = vix[Math.max(0, firstBeyond - 1)]
    const now = vix[last]
    const d = now - ref
    // Upside break: a calmer VIX is the supportive reading. Downside break: a rising VIX is the usual accompaniment.
    const supportive = side === 'up' ? d <= 0.05 : d >= 0.15
    vixState = latestBeyond ? (supportive ? 'pass' : 'fail') : 'fail'
    vixDetail = `Simulated India VIX ${ref.toFixed(2)} → ${now.toFixed(2)} since the break (${d >= 0 ? '+' : '−'}${Math.abs(d).toFixed(2)}). VIX measures expected volatility, not direction: read it as context, not a signal.`
  }

  const items: ChecklistItem[] = [
    { id: 'close', title: 'Closes beyond the level on 5, 15 and 30 min', state: closesState, detail: firstBeyond === null ? `No 5-minute close ${dir} ${fmt(level)} yet. A wick through the level does not count.` : closesPass ? `All three timeframes have a completed bar closing ${dir} ${fmt(level)}.` : 'At least one timeframe has not closed beyond the level (or has closed back inside).', sub },
    { id: 'vol', title: 'Volume vs average', state: volState, detail: volDetail },
    { id: 'oi', title: `Simulated ${oiName} OI at ${fmt(level)}`, state: oiState, detail: oiDetail },
    { id: 'retest', title: 'Retest holding', state: retState, detail: retDetail },
    { id: 'vix', title: 'India VIX direction', state: vixState, detail: vixDetail },
  ]
  const score = items.filter((i) => i.state === 'pass').length

  /* sweep (false-breakout pattern) */
  const sweep = side === 'up' ? detectSweep(candles, vis, RESISTANCE) : null

  /* verdict */
  let verdictTone: Analysis['verdictTone'] = 'ice'
  let verdictHead = 'Nothing to confirm yet'
  let verdict = `Price is still inside the ${fmt(SUPPORT)}–${fmt(RESISTANCE)} range. No close ${dir} ${fmt(level)} means there is no breakout to confirm; ${fmt(RESISTANCE)} and ${fmt(SUPPORT)} remain potential levels, not guarantees.`
  let invalidation = [`A 5-minute close ${dir} ${fmt(level)} would start the confirmation process. Until then this is simply a range.`]
  if (firstBeyond !== null && closedBackInside !== null && !latestBeyond) {
    verdictTone = 'bear'
    verdictHead = side === 'up' ? 'Failed breakout: a possible bull trap' : 'Failed breakdown: a possible bear trap'
    verdict = `Price closed ${dir} ${fmt(level)} and then closed back inside. Buyers who chased the break${sweep ? ' and stops resting above the equal highs' : ''} may now be trapped, which is how reversals can gain fuel. Possible, not certain.`
    invalidation = [`This read is invalidated if price closes ${dir} ${fmt(level)} again on higher volume and holds a retest.`, 'Fresh closes back inside with rising CE OI would strengthen the failure read instead.']
  } else if (firstBeyond !== null) {
    if (score >= 4) { verdictTone = 'bull'; verdictHead = 'Broad confirmation so far'; verdict = `${score} of 5 checks pass. That raises the odds the ${side === 'up' ? 'breakout' : 'breakdown'} is genuine, but it is evidence, not proof: markets can still reverse.` }
    else if (score >= 2) { verdictTone = 'gold'; verdictHead = 'Mixed evidence'; verdict = `${score} of 5 checks pass. Some confirmation, some missing. Many traders would wait for the retest or a further close before trusting the move.` }
    else { verdictTone = 'bear'; verdictHead = 'Weak confirmation'; verdict = `Only ${score} of 5 checks pass so far. A close beyond the level without support from volume, OI or a held retest is easier to fail.` }
    invalidation = [
      `A 5-minute close back ${side === 'up' ? 'below' : 'above'} ${fmt(level)}, especially on rising volume.`,
      `${oiName} OI at ${fmt(level)} rising again while price stalls: fresh writers may be defending it.`,
      'A retest that is rejected with a long wick back through the level.',
    ]
  }

  /* chart events derived from data */
  const events: Analysis['events'] = []
  if (sweep) {
    events.push({ index: sweep.eqIdx[0], label: 'EQH', tone: 'gold', note: `Equal highs ~${fmt(Math.round(sweep.eqPrice))} (${barTime(sweep.eqIdx[0])} and ${barTime(sweep.eqIdx[1])}): buy-side liquidity, stops resting above.` })
    events.push({ index: sweep.eqIdx[1], label: 'EQH', tone: 'gold', note: '' })
    events.push({ index: sweep.sweepIdx, label: 'Sweep', tone: 'bear', note: `Liquidity sweep at ${barTime(sweep.sweepIdx)}: high ${fmt(sweep.sweepHigh)} runs the stops above the equal highs.` })
    if (sweep.backInsideIdx !== null && sweep.backInsideIdx !== sweep.sweepIdx) events.push({ index: sweep.backInsideIdx, label: 'Back inside', tone: 'bear', below: true, note: `Close back inside at ${barTime(sweep.backInsideIdx)}: breakout buyers and stops are trapped.` })
  }
  if (firstBeyond !== null) {
    const trapped = closedBackInside !== null && !latestBeyond
    events.push({ index: firstBeyond, label: side === 'up' ? (trapped ? 'Break?' : 'Break') : 'Break', tone: side === 'up' ? 'bull' : 'bear', below: side === 'down', note: `First 5-min close ${dir} ${fmt(level)} at ${barTime(firstBeyond)}.` })
  }
  if (retestIdx !== null && latestBeyond) events.push({ index: retestIdx, label: 'Retest', tone: 'ice', below: side === 'up', note: `Retest of ${fmt(level)} at ${barTime(retestIdx)}.` })

  return { side, level, levelName, firstBeyond, closedBackInside, items, score, total: items.length, verdictTone, verdictHead, verdict, invalidation, events, sweep }
}
