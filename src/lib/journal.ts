/**
 * Strikewick trade journal — pure logic (types, validation, statistics, CSV, storage).
 * No React and no path aliases here, so it can be sanity-checked with plain Node.
 * Storage is browser-only (localStorage) and every access is wrapped in try/catch.
 */

export const JOURNAL_KEY = 'strikewick.journal.v1'

export const INSTRUMENTS = ['NIFTY', 'BANKNIFTY', 'SENSEX', 'FINNIFTY'] as const
export type Instrument = (typeof INSTRUMENTS)[number]

export const OPTION_TYPES = ['CE', 'PE', 'FUT'] as const
export type OptionType = (typeof OPTION_TYPES)[number]

export const SIDES = ['buy', 'sell'] as const
export type Side = (typeof SIDES)[number]

/** Module 25.3 mistake taxonomy. */
export const MISTAKES = [
  'none',
  'late entry',
  'early exit',
  'no stop-loss',
  'overtrading',
  'emotional trading',
  'wrong strike selection',
  'ignoring VIX',
  'misreading OI',
  'ignoring liquidity',
  'breaking rules',
] as const
export type Mistake = (typeof MISTAKES)[number]

/** Editable defaults. NIFTY 65 per the brief; the rest are placeholders the user must verify. */
export const DEFAULT_LOT_SIZE: Record<Instrument, number> = { NIFTY: 65, BANKNIFTY: 30, SENSEX: 20, FINNIFTY: 60 }

export interface Trade {
  id: string
  /** Entry date-time, local, `YYYY-MM-DDTHH:mm`. */
  datetime: string
  /** Optional exit date-time, same format. Used only for holding time. */
  exitDatetime: string
  instrument: Instrument
  /** `YYYY-MM-DD`. */
  expiry: string
  /** 0 for futures. */
  strike: number
  type: OptionType
  side: Side
  lots: number
  lotSize: number
  entryPrice: number
  exitPrice: number
  entryReason: string
  exitReason: string
  setup: string
  oiNote: string
  /** India VIX at entry; null when not recorded. */
  vix: number | null
  ivNote: string
  mistake: Mistake
  /** Screenshot URL or free-text notes. Text only, never rendered as a link. */
  notes: string
  sample: boolean
}

export interface TradeDraft {
  datetime: string
  exitDatetime: string
  instrument: string
  expiry: string
  strike: string
  type: string
  side: string
  lots: string
  lotSize: string
  entryPrice: string
  exitPrice: string
  entryReason: string
  exitReason: string
  setup: string
  oiNote: string
  vix: string
  ivNote: string
  mistake: string
  notes: string
}

export const TEXT_LIMITS = { reason: 400, setup: 60, note: 300 } as const

/* ------------------------------------------------------------------ P&L */

export const quantity = (t: Pick<Trade, 'lots' | 'lotSize'>): number => t.lots * t.lotSize
/** Buy: exit − entry. Sell: entry − exit. Gross of brokerage, taxes and slippage. */
export const tradePnl = (t: Pick<Trade, 'side' | 'entryPrice' | 'exitPrice' | 'lots' | 'lotSize'>): number => {
  const perUnit = t.side === 'buy' ? t.exitPrice - t.entryPrice : t.entryPrice - t.exitPrice
  return round2(perUnit * t.lots * t.lotSize)
}
const round2 = (n: number): number => Math.round(n * 100) / 100

/* ------------------------------------------------------------ validation */

const DT_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/
const D_RE = /^\d{4}-\d{2}-\d{2}$/

const validDate = (s: string): boolean => {
  if (!D_RE.test(s)) return false
  const [y, m, d] = s.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d
}
const validDateTime = (s: string): boolean => DT_RE.test(s) && validDate(s.slice(0, 10)) && Number(s.slice(11, 13)) < 24 && Number(s.slice(14, 16)) < 60

const num = (s: string): number => (s.trim() === '' ? Number.NaN : Number(s))
const isOneOf = <T extends string>(list: readonly T[], v: string): v is T => (list as readonly string[]).includes(v)
const clip = (s: string, n: number): string => s.trim().slice(0, n)

export type DraftErrors = Partial<Record<keyof TradeDraft, string>>

export function validateDraft(d: TradeDraft): { errors: DraftErrors; trade: Omit<Trade, 'id' | 'sample'> | null } {
  const e: DraftErrors = {}
  if (!validDateTime(d.datetime)) e.datetime = 'Enter a valid entry date and time.'
  if (d.exitDatetime !== '') {
    if (!validDateTime(d.exitDatetime)) e.exitDatetime = 'Enter a valid exit date and time, or leave it blank.'
    else if (validDateTime(d.datetime) && d.exitDatetime < d.datetime) e.exitDatetime = 'Exit cannot be before entry.'
  }
  const instrument = isOneOf(INSTRUMENTS, d.instrument) ? d.instrument : null
  if (!instrument) e.instrument = 'Choose an instrument.'
  const type = isOneOf(OPTION_TYPES, d.type) ? d.type : null
  if (!type) e.type = 'Choose CE, PE or Future.'
  const side = isOneOf(SIDES, d.side) ? d.side : null
  if (!side) e.side = 'Choose buy or sell.'
  if (!validDate(d.expiry)) e.expiry = 'Enter a valid expiry date.'
  else if (validDateTime(d.datetime) && d.expiry < d.datetime.slice(0, 10)) e.expiry = 'Expiry cannot be before the trade date.'

  let strike = 0
  if (type !== 'FUT') {
    strike = num(d.strike)
    if (!Number.isFinite(strike) || strike <= 0 || strike > 1_000_000) e.strike = 'Enter a strike greater than 0.'
  }
  const lots = num(d.lots)
  if (!Number.isInteger(lots) || lots < 1 || lots > 10_000) e.lots = 'Whole number of lots, 1 to 10,000.'
  const lotSize = num(d.lotSize)
  if (!Number.isInteger(lotSize) || lotSize < 1 || lotSize > 100_000) e.lotSize = 'Whole number, 1 to 1,00,000.'
  const entryPrice = num(d.entryPrice)
  if (!Number.isFinite(entryPrice) || entryPrice <= 0 || entryPrice > 10_000_000) e.entryPrice = 'Entry price must be greater than 0.'
  const exitPrice = num(d.exitPrice)
  if (!Number.isFinite(exitPrice) || exitPrice < 0 || exitPrice > 10_000_000) e.exitPrice = 'Exit price must be 0 or more.'
  let vix: number | null = null
  if (d.vix.trim() !== '') {
    const v = num(d.vix)
    if (!Number.isFinite(v) || v < 1 || v > 100) e.vix = 'India VIX is usually 8–40. Enter 1–100 or leave blank.'
    else vix = v
  }
  const mistake = isOneOf(MISTAKES, d.mistake) ? d.mistake : null
  if (!mistake) e.mistake = 'Choose a mistake tag (or "none").'
  if (d.entryReason.trim() === '') e.entryReason = 'Write down why you entered. Future you will want to know.'
  if (d.exitReason.trim() === '') e.exitReason = 'Write down why you exited.'

  if (Object.keys(e).length > 0 || !instrument || !type || !side || !mistake) return { errors: e, trade: null }
  return {
    errors: e,
    trade: {
      datetime: d.datetime,
      exitDatetime: d.exitDatetime,
      instrument,
      expiry: d.expiry,
      strike: type === 'FUT' ? 0 : strike,
      type,
      side,
      lots,
      lotSize,
      entryPrice,
      exitPrice,
      entryReason: clip(d.entryReason, TEXT_LIMITS.reason),
      exitReason: clip(d.exitReason, TEXT_LIMITS.reason),
      setup: clip(d.setup, TEXT_LIMITS.setup),
      oiNote: clip(d.oiNote, TEXT_LIMITS.note),
      vix,
      ivNote: clip(d.ivNote, TEXT_LIMITS.note),
      mistake,
      notes: clip(d.notes, TEXT_LIMITS.note),
    },
  }
}

export const tradeToDraft = (t: Trade): TradeDraft => ({
  datetime: t.datetime,
  exitDatetime: t.exitDatetime,
  instrument: t.instrument,
  expiry: t.expiry,
  strike: t.type === 'FUT' ? '' : String(t.strike),
  type: t.type,
  side: t.side,
  lots: String(t.lots),
  lotSize: String(t.lotSize),
  entryPrice: String(t.entryPrice),
  exitPrice: String(t.exitPrice),
  entryReason: t.entryReason,
  exitReason: t.exitReason,
  setup: t.setup,
  oiNote: t.oiNote,
  vix: t.vix === null ? '' : String(t.vix),
  ivNote: t.ivNote,
  mistake: t.mistake,
  notes: t.notes,
})

export const newId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`

/* -------------------------------------------------------------- storage */

const isRec = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const str = (v: unknown): v is string => typeof v === 'string'
const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)

export function isTrade(v: unknown): v is Trade {
  if (!isRec(v)) return false
  return (
    str(v.id) && str(v.datetime) && validDateTime(v.datetime) && str(v.exitDatetime) && (v.exitDatetime === '' || validDateTime(v.exitDatetime)) &&
    str(v.instrument) && isOneOf(INSTRUMENTS, v.instrument) && str(v.expiry) && str(v.type) && isOneOf(OPTION_TYPES, v.type) &&
    str(v.side) && isOneOf(SIDES, v.side) && fin(v.strike) && fin(v.lots) && fin(v.lotSize) && fin(v.entryPrice) && fin(v.exitPrice) &&
    str(v.entryReason) && str(v.exitReason) && str(v.setup) && str(v.oiNote) && (v.vix === null || fin(v.vix)) && str(v.ivNote) &&
    str(v.mistake) && isOneOf(MISTAKES, v.mistake) && str(v.notes) && typeof v.sample === 'boolean'
  )
}

export interface LoadResult { trades: Trade[]; available: boolean; dropped: number }

export function loadTrades(): LoadResult {
  try {
    const raw = window.localStorage.getItem(JOURNAL_KEY)
    if (raw === null) return { trades: [], available: true, dropped: 0 }
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return { trades: [], available: true, dropped: 0 }
    const trades = parsed.filter(isTrade)
    return { trades, available: true, dropped: parsed.length - trades.length }
  } catch {
    // Storage blocked/unavailable, or corrupt JSON. Treat both as "memory only" rather than crash.
    return { trades: [], available: false, dropped: 0 }
  }
}

export function saveTrades(trades: Trade[]): boolean {
  try {
    window.localStorage.setItem(JOURNAL_KEY, JSON.stringify(trades))
    return true
  } catch {
    return false
  }
}

/* ------------------------------------------------------------ date utils */

const pad = (n: number): string => String(n).padStart(2, '0')
export const toLocalDateTime = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
export const toLocalDate = (d: Date): string => toLocalDateTime(d).slice(0, 10)

const utcOf = (day: string): Date => {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}
/** Monday of the week containing `day` (YYYY-MM-DD). */
export const weekStart = (day: string): string => {
  const dt = utcOf(day)
  dt.setUTCDate(dt.getUTCDate() - ((dt.getUTCDay() + 6) % 7))
  return dt.toISOString().slice(0, 10)
}
const minutesBetween = (a: string, b: string): number => {
  const ms = (s: string) => Date.UTC(Number(s.slice(0, 4)), Number(s.slice(5, 7)) - 1, Number(s.slice(8, 10)), Number(s.slice(11, 13)), Number(s.slice(14, 16)))
  return (ms(b) - ms(a)) / 60000
}

/* ----------------------------------------------------------- statistics */

export interface PeriodRow { key: string; pnl: number; trades: number }
export interface CurvePoint { n: number; label: string; cum: number; pnl: number }
export interface SetupRow { setup: string; trades: number; winRate: number; total: number; avg: number; profitFactor: number }
export interface MistakeRow { mistake: Mistake; count: number; pnl: number }

export interface Stats {
  count: number
  total: number
  wins: number
  losses: number
  breakeven: number
  winRate: number
  lossRate: number
  /** Average winning trade (positive) and average losing trade (negative); 0 when none. */
  avgWin: number
  avgLoss: number
  /** Gross profit ÷ gross loss. Infinity when there are wins but no losses; NaN with no wins and no losses. */
  profitFactor: number
  /** Average ₹ per trade. */
  expectancy: number
  /** Largest peak-to-trough fall of the cumulative P&L curve (positive magnitude, starts from a 0 baseline). */
  maxDrawdown: number
  best: Trade | null
  worst: Trade | null
  avgHoldMinutes: number | null
  curve: CurvePoint[]
  daily: PeriodRow[]
  weekly: PeriodRow[]
  monthly: PeriodRow[]
  bySetup: SetupRow[]
  mistakes: MistakeRow[]
}

const pf = (win: number, loss: number): number => (loss === 0 ? (win > 0 ? Number.POSITIVE_INFINITY : Number.NaN) : win / Math.abs(loss))

function bucket(trades: Trade[], pnls: Map<string, number>, keyOf: (t: Trade) => string): PeriodRow[] {
  const m = new Map<string, PeriodRow>()
  for (const t of trades) {
    const k = keyOf(t)
    const r = m.get(k) ?? { key: k, pnl: 0, trades: 0 }
    r.pnl = round2(r.pnl + (pnls.get(t.id) ?? 0))
    r.trades += 1
    m.set(k, r)
  }
  return [...m.values()].sort((a, b) => (a.key < b.key ? 1 : -1)) // newest first
}

export const sortTrades = (trades: Trade[]): Trade[] => [...trades].sort((a, b) => (a.datetime === b.datetime ? 0 : a.datetime < b.datetime ? -1 : 1))

export function computeStats(input: Trade[]): Stats {
  const trades = sortTrades(input)
  const pnls = new Map<string, number>()
  for (const t of trades) pnls.set(t.id, tradePnl(t))
  const p = (t: Trade): number => pnls.get(t.id) ?? 0

  let total = 0, grossWin = 0, grossLoss = 0, wins = 0, losses = 0, peak = 0, maxDd = 0
  let best: Trade | null = null
  let worst: Trade | null = null
  const curve: CurvePoint[] = [{ n: 0, label: 'Start', cum: 0, pnl: 0 }]
  let holdSum = 0, holdN = 0
  trades.forEach((t, i) => {
    const x = p(t)
    total = round2(total + x)
    if (x > 0) { wins++; grossWin += x } else if (x < 0) { losses++; grossLoss += x }
    peak = Math.max(peak, total)
    maxDd = Math.max(maxDd, peak - total)
    if (best === null || x > p(best)) best = t
    if (worst === null || x < p(worst)) worst = t
    curve.push({ n: i + 1, label: t.datetime.slice(0, 10), cum: total, pnl: x })
    if (t.exitDatetime !== '') { holdSum += minutesBetween(t.datetime, t.exitDatetime); holdN++ }
  })
  const n = trades.length

  const setupMap = new Map<string, Trade[]>()
  for (const t of trades) {
    const k = t.setup === '' ? 'Unlabelled' : t.setup
    setupMap.set(k, [...(setupMap.get(k) ?? []), t])
  }
  const bySetup: SetupRow[] = [...setupMap.entries()].map(([setup, ts]) => {
    const vals = ts.map(p)
    const sum = vals.reduce((a, b) => a + b, 0)
    return {
      setup,
      trades: ts.length,
      winRate: vals.filter((v) => v > 0).length / ts.length,
      total: round2(sum),
      avg: round2(sum / ts.length),
      profitFactor: pf(vals.filter((v) => v > 0).reduce((a, b) => a + b, 0), vals.filter((v) => v < 0).reduce((a, b) => a + b, 0)),
    }
  }).sort((a, b) => b.total - a.total)

  const mistakes: MistakeRow[] = MISTAKES.map((mistake) => {
    const ts = trades.filter((t) => t.mistake === mistake)
    return { mistake, count: ts.length, pnl: round2(ts.reduce((a, t) => a + p(t), 0)) }
  })

  return {
    count: n,
    total,
    wins,
    losses,
    breakeven: n - wins - losses,
    winRate: n ? wins / n : 0,
    lossRate: n ? losses / n : 0,
    avgWin: wins ? grossWin / wins : 0,
    avgLoss: losses ? grossLoss / losses : 0,
    profitFactor: pf(grossWin, grossLoss),
    expectancy: n ? total / n : 0,
    maxDrawdown: round2(maxDd),
    best,
    worst,
    avgHoldMinutes: holdN ? holdSum / holdN : null,
    curve,
    daily: bucket(trades, pnls, (t) => t.datetime.slice(0, 10)),
    weekly: bucket(trades, pnls, (t) => weekStart(t.datetime.slice(0, 10))),
    monthly: bucket(trades, pnls, (t) => t.datetime.slice(0, 7)),
    bySetup,
    mistakes,
  }
}

/* ------------------------------------------------------------------ CSV */

/**
 * Text cell: neutralise spreadsheet formula triggers (leading = + - @, tab, CR) by prefixing an apostrophe,
 * then quote when the cell contains a comma, quote or line break.
 */
export function csvText(value: string): string {
  let s = value
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}
const csvNum = (n: number | null): string => (n === null || !Number.isFinite(n) ? '' : String(n))

export const CSV_HEADER = [
  'entry_datetime', 'exit_datetime', 'instrument', 'expiry', 'strike', 'type', 'side', 'lots', 'lot_size', 'quantity',
  'entry_price', 'exit_price', 'pnl_inr', 'setup', 'entry_reason', 'exit_reason', 'oi_snapshot', 'india_vix', 'iv_greeks_note', 'mistake', 'screenshot_or_notes', 'sample',
] as const

export function tradesToCsv(trades: Trade[]): string {
  const rows = sortTrades(trades).map((t) =>
    [
      csvText(t.datetime), csvText(t.exitDatetime), csvText(t.instrument), csvText(t.expiry), csvNum(t.type === 'FUT' ? null : t.strike), csvText(t.type), csvText(t.side),
      csvNum(t.lots), csvNum(t.lotSize), csvNum(quantity(t)), csvNum(t.entryPrice), csvNum(t.exitPrice), csvNum(tradePnl(t)),
      csvText(t.setup), csvText(t.entryReason), csvText(t.exitReason), csvText(t.oiNote), csvNum(t.vix), csvText(t.ivNote), csvText(t.mistake), csvText(t.notes), t.sample ? 'yes' : 'no',
    ].join(','),
  )
  return [CSV_HEADER.join(','), ...rows].join('\r\n') + '\r\n'
}

/* -------------------------------------------------------------- samples */

interface SampleSpec {
  day: number // trading days back from `today`
  time: string
  ins: Instrument
  strikeOff: number // strike offset from the spot proxy
  type: OptionType
  side: Side
  lots: number
  entry: number
  exit: number
  setup: string
  mistake: Mistake
  vix: number
  entryReason: string
  exitReason: string
  oi: string
  held: number // minutes
}

const SAMPLE_SPOT: Record<Instrument, number> = { NIFTY: 24000, BANKNIFTY: 52000, SENSEX: 79000, FINNIFTY: 25000 }
const SAMPLE_STEP: Record<Instrument, number> = { NIFTY: 50, BANKNIFTY: 100, SENSEX: 100, FINNIFTY: 50 }

const SAMPLES: SampleSpec[] = [
  { day: 27, time: '09:42', ins: 'NIFTY', strikeOff: 0, type: 'CE', side: 'buy', lots: 2, entry: 118, exit: 152, setup: 'Opening range breakout', mistake: 'none', vix: 13.8, entryReason: 'Broke above first 15-min high with rising volume.', exitReason: 'Trailed stop under 5-min swing low.', oi: 'Put OI building at the strike below spot.', held: 65 },
  { day: 24, time: '10:20', ins: 'NIFTY', strikeOff: 100, type: 'CE', side: 'buy', lots: 2, entry: 74, exit: 49, setup: 'Opening range breakout', mistake: 'late entry', vix: 14.2, entryReason: 'Chased the breakout after a 60-point run.', exitReason: 'Stop hit when price fell back inside the range.', oi: 'Call OI heavy one strike above.', held: 38 },
  { day: 21, time: '11:05', ins: 'BANKNIFTY', strikeOff: -200, type: 'PE', side: 'sell', lots: 1, entry: 96, exit: 61, setup: 'OI wall fade', mistake: 'none', vix: 15.1, entryReason: 'Sold put below a large put-OI strike; VIX flat.', exitReason: 'Closed at 65% of max premium captured.', oi: 'Large put OI at 51,800; no fresh unwinding.', held: 190 },
  { day: 19, time: '09:30', ins: 'NIFTY', strikeOff: 50, type: 'PE', side: 'buy', lots: 3, entry: 92, exit: 66, setup: 'Trend pullback', mistake: 'no stop-loss', vix: 15.6, entryReason: 'Pullback to VWAP in a down-trending session.', exitReason: 'Exited late after holding through the stop level.', oi: 'Mixed; OI alone did not show who initiated.', held: 120 },
  { day: 17, time: '13:10', ins: 'NIFTY', strikeOff: 0, type: 'CE', side: 'sell', lots: 2, entry: 41, exit: 12, setup: 'Expiry-day scalp', mistake: 'none', vix: 13.4, entryReason: 'Expiry afternoon, price pinned between two OI levels.', exitReason: 'Bought back as premium decayed past target.', oi: 'Highest call OI at +100, put OI at -100.', held: 75 },
  { day: 14, time: '14:05', ins: 'NIFTY', strikeOff: 150, type: 'CE', side: 'buy', lots: 4, entry: 14, exit: 5, setup: 'Expiry-day scalp', mistake: 'emotional trading', vix: 14.9, entryReason: 'Cheap OTM call after a morning loss, hoping to recover.', exitReason: 'Decayed to near zero by close.', oi: 'Not checked.', held: 85 },
  { day: 12, time: '10:35', ins: 'SENSEX', strikeOff: 0, type: 'PE', side: 'buy', lots: 2, entry: 210, exit: 262, setup: 'Trend pullback', mistake: 'none', vix: 14.4, entryReason: 'Lower-high structure confirmed on 15-min.', exitReason: 'Target hit at prior day low.', oi: 'Put writers retreating at the nearest strike.', held: 95 },
  { day: 10, time: '09:55', ins: 'NIFTY', strikeOff: 0, type: 'CE', side: 'buy', lots: 2, entry: 131, exit: 118, setup: 'Opening range breakout', mistake: 'early exit', vix: 13.1, entryReason: 'Range break with supportive OI shift.', exitReason: 'Exited on first dip; price later reached the target.', oi: 'Put OI added at spot strike.', held: 22 },
  { day: 7, time: '11:40', ins: 'BANKNIFTY', strikeOff: 300, type: 'CE', side: 'sell', lots: 1, entry: 58, exit: 104, setup: 'OI wall fade', mistake: 'ignoring VIX', vix: 17.3, entryReason: 'Sold call above a call-OI wall.', exitReason: 'Stopped out when VIX spiked and the wall broke.', oi: 'Call OI wall at 52,500 was unwound mid-session.', held: 70 },
  { day: 5, time: '10:15', ins: 'NIFTY', strikeOff: -50, type: 'PE', side: 'sell', lots: 3, entry: 63, exit: 35, setup: 'OI wall fade', mistake: 'none', vix: 13.6, entryReason: 'Put OI support intact, VIX drifting lower.', exitReason: 'Booked at planned 45% decay.', oi: 'Put OI rising at and below the strike.', held: 140 },
  { day: 3, time: '12:20', ins: 'NIFTY', strikeOff: 0, type: 'CE', side: 'buy', lots: 3, entry: 88, exit: 71, setup: 'Trend pullback', mistake: 'overtrading', vix: 14.0, entryReason: 'Third trade of the day, no clear pullback.', exitReason: 'Closed out of boredom at a small loss.', oi: 'Neutral.', held: 30 },
  { day: 1, time: '09:48', ins: 'NIFTY', strikeOff: 50, type: 'CE', side: 'buy', lots: 2, entry: 96, exit: 133, setup: 'Opening range breakout', mistake: 'none', vix: 13.5, entryReason: 'Gap-and-hold above the previous day high.', exitReason: 'Scaled out into resistance.', oi: 'Call OI thin above; put OI strong below.', held: 55 },
]

/** Walk back `n` weekdays from `from` (exchange holidays are ignored in these samples). */
function tradingDayBack(from: Date, n: number): Date {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  let left = n
  while (left > 0) {
    d.setDate(d.getDate() - 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) left--
  }
  return d
}
/** Next Tuesday on/after `d` (used only as a plausible sample expiry). */
function nextTuesday(d: Date): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  x.setDate(x.getDate() + ((2 - x.getDay() + 7) % 7))
  return x
}

export function makeSampleTrades(today: Date = new Date()): Trade[] {
  return SAMPLES.map((s, i) => {
    const day = tradingDayBack(today, s.day)
    const [hh, mm] = s.time.split(':').map(Number)
    const entry = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hh, mm)
    const exit = new Date(entry.getTime() + s.held * 60000)
    const step = SAMPLE_STEP[s.ins]
    return {
      id: `sample-${i + 1}-${newId()}`,
      datetime: toLocalDateTime(entry),
      exitDatetime: toLocalDateTime(exit),
      instrument: s.ins,
      expiry: toLocalDate(nextTuesday(day)),
      strike: SAMPLE_SPOT[s.ins] + s.strikeOff - ((SAMPLE_SPOT[s.ins] + s.strikeOff) % step),
      type: s.type,
      side: s.side,
      lots: s.lots,
      lotSize: DEFAULT_LOT_SIZE[s.ins],
      entryPrice: s.entry,
      exitPrice: s.exit,
      entryReason: s.entryReason,
      exitReason: s.exitReason,
      setup: s.setup,
      oiNote: s.oi,
      vix: s.vix,
      ivNote: '',
      mistake: s.mistake,
      notes: 'Sample entry — illustrative, not a real trade.',
      sample: true,
    }
  })
}
