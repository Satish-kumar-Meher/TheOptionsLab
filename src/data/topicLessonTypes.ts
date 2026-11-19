/** Topic-by-topic lesson schema.
 *
 *  Every curriculum module gets ONE file  src/data/topicLessons/m<LL>_<M>.ts  (e.g. m06_2.ts for module 6.2)
 *  that `export default`s a ModuleLesson. The curriculum text itself (topic names, tables, checklists) is NEVER
 *  altered or removed — a TopicLesson is attached to a topic by its 1-based number `t`, and the page renders the
 *  original topic text as the heading with the lesson underneath.
 *
 *  The nine-step method comes straight from the curriculum PDF ("How to study each module"):
 *  Concept · Mechanism · Example · Chart · Option chain · Psychology · Scenarios · Practice · Assignment.
 */

/* ───────────────────────────── Visuals (illustrations) ─────────────────────────────
 * Data-driven SVG illustrations. No photographs, no external images: each topic picks a kind + params.
 * Renderer: src/components/lesson/Visual.tsx                                                         */
export type Tone = 'bull' | 'bear' | 'gold' | 'ice' | 'neutral'

export type VisualSpec =
  /** Boxes joined by arrows. Best for processes: order → exchange → clearing → settlement. */
  | { kind: 'flow'; title: string; caption?: string; steps: { label: string; note?: string; tone?: Tone }[] }
  /** Two columns compared side by side (e.g. futures vs options, bulk vs block deal). */
  | { kind: 'compare'; title: string; caption?: string; left: { head: string; tone?: Tone; points: string[] }; right: { head: string; tone?: Tone; points: string[] } }
  /** Horizontal bars. Values are plain numbers; `unit` is appended in labels. */
  | { kind: 'bars'; title: string; caption?: string; unit?: string; items: { label: string; value: number; tone?: Tone }[] }
  /** Strike ladder showing ITM / ATM / OTM for a call or put at a given spot. */
  | { kind: 'ladder'; title: string; caption?: string; optType: 'CE' | 'PE'; spot: number; strikes: number[] }
  /** Expiry payoff of up to 4 legs. side: 1 = long/buy, -1 = short/sell. premium per unit. */
  | { kind: 'payoff'; title: string; caption?: string; spot: number; legs: { type: 'CE' | 'PE' | 'FUT'; side: 1 | -1; strike: number; premium?: number }[] }
  /** Stylised candles for a named situation. */
  | { kind: 'candles'; title: string; caption?: string; pattern: 'uptrend' | 'downtrend' | 'range' | 'breakout' | 'breakdown' | 'falseBreakout' | 'gapUp' | 'gapDown' | 'doji' | 'hammer' | 'engulfing' | 'accumulation' | 'distribution'; level?: { price: number; label: string } }
  /** Back-to-back OI bars per strike (call = bear colour, put = bull colour, as in the curriculum PDF). */
  | { kind: 'oi'; title: string; caption?: string; rows: { strike: number; ce: number; pe: number }[]; spot?: number }
  /** A named curve. */
  | { kind: 'curve'; title: string; caption?: string; curve: 'delta' | 'gamma' | 'theta' | 'vega' | 'timeValue' | 'iv-smile' | 'payoff-call' | 'payoff-put' | 'normal' | 'drawdown' | 'equity' | 'sCurve' }
  /** 2×2 matrix with four labelled cells (cells order: top-left, top-right, bottom-left, bottom-right). */
  | { kind: 'matrix'; title: string; caption?: string; xLabels: [string, string]; yLabels: [string, string]; cells: { head: string; note?: string; tone?: Tone }[] }
  /** Half-circle gauge with coloured zones, e.g. India VIX or PCR. */
  | { kind: 'gauge'; title: string; caption?: string; min: number; max: number; value: number; unit?: string; zones: { from: number; to: number; label: string; tone?: Tone }[] }
  /** Bid / ask ladder. price, qty. */
  | { kind: 'orderBook'; title: string; caption?: string; bids: [number, number][]; asks: [number, number][] }
  /** Dated or ordered steps down a vertical line. */
  | { kind: 'timeline'; title: string; caption?: string; events: { when: string; what: string; tone?: Tone }[] }
  /** Concentric / stacked layers, widest first — participant hierarchy, market structure. */
  | { kind: 'layers'; title: string; caption?: string; layers: { label: string; note?: string; tone?: Tone }[] }

/* ───────────────────────────── Calculators ─────────────────────────────
 * Ids must exist in src/components/calc/registry.tsx. `preset` overrides a calculator's default inputs so it
 * opens with the topic's own worked example; keys must be that calculator's input keys (see registry).  */
export type CalcId =
  | 'lot-value' // premium × lot size × lots, contract value, margin %
  | 'futures-pnl' // long/short futures P&L and MTM
  | 'option-pnl' // option P&L at an expiry price (buy/sell CE/PE), breakeven
  | 'breakeven' // breakeven for the four core positions
  | 'premium-split' // intrinsic vs time value
  | 'moneyness' // ITM / ATM / OTM and % distance
  | 'greeks' // Black–Scholes price + Greeks
  | 'expected-move' // VIX / IV → 1σ move
  | 'pcr' // put-call ratio from OI / volume
  | 'oi-buildup' // price × OI classifier (futures)
  | 'max-pain' // max pain from an OI strip (with caveat)
  | 'order-book-impact' // walk the book: average price, impact cost
  | 'vwap-twap' // VWAP / TWAP of fills
  | 'hedge-ratio' // beta hedge: contracts to sell
  | 'basis-fair-value' // futures fair value, basis, cash-and-carry
  | 'charges' // brokerage + STT + exchange + GST + stamp
  | 'position-size' // capital × risk % → lots
  | 'risk-reward' // R:R, breakeven win rate, expectancy
  | 'drawdown-recovery' // gain needed to recover a drawdown
  | 'pivot-levels' // classic floor pivots from H/L/C
  | 'put-call-parity' // C − P vs S − K·e^(−rT)
  | 'index-weight' // index point contribution from weight & move
  | 'return-calc' // % return, CAGR, absolute change
  | 'spread-cost' // bid-ask spread and slippage cost
  | 'portfolio-delta' // net delta of several positions
  | 'straddle-move' // ATM straddle → implied move & breakevens
  | 'kelly' // Kelly fraction from win rate and payoff

export interface CalcRef {
  id: CalcId
  /** Overrides for the calculator's default inputs (keys listed in registry.tsx). */
  preset?: Record<string, number | string>
  /** One line explaining why this tool belongs on this topic. */
  why?: string
}

/* ───────────────────────────── Lesson content ───────────────────────────── */
export interface TopicLesson {
  /** 1-based number of the topic inside the module — must match the curriculum's numbered list. */
  t: number
  /** Simple-English definition, 2–4 sentences. Plain words first, jargon defined. */
  def: string
  /** The same idea explained in Roman-script Hinglish (natural spoken style, 2–4 sentences). */
  hi: string
  /** How it actually works in the market — mechanism, 3–6 sentences. */
  how: string
  /** A real-life / Indian-market example with actual numbers (Nifty ≈ 24,000, lot 65 unless the topic says otherwise). */
  eg: { title: string; text: string }
  /** One key takeaway or the most common mistake. */
  tip: string
  visual?: VisualSpec
  calc?: CalcRef
}

export interface NineSteps {
  /** 1 Concept — what it is and why it matters (simple English). */
  concept: string
  conceptHi: string
  /** 2 Mechanism — how it works inside the market. */
  mechanism: string
  /** 3 Example — a worked Nifty example with numbers. */
  example: { title: string; text: string }
  /** 4 Chart — an illustration plus a sentence on how to read it. */
  chart: VisualSpec
  /** 5 Option chain — how this shows up (or doesn't) on a chain. */
  optionChain: string
  /** 6 Psychology — what buyers, sellers and institutions may be thinking. */
  psychology: string
  /** 7 Scenarios — bullish, bearish, sideways. */
  scenarios: { bullish: string; bearish: string; sideways: string }
  /** 8 Practice — 3–4 questions with complete answers. */
  practice: { q: string; a: string }[]
  /** 9 Assignment — one concrete task before the next module. */
  assignment: string
}

export interface ModuleLesson {
  /** e.g. "6.2" */
  moduleId: string
  /** 2–3 sentences: what the module is about and why it matters. */
  intro: string
  introHi: string
  steps: NineSteps
  /** One TopicLesson per numbered curriculum topic. Modules whose curriculum has no numbered list (3.4) use the
   *  topics array given in the task brief instead. */
  topics: TopicLesson[]
  /** Extra calculators for the module as a whole (shown in a "Tools for this module" strip). */
  tools?: CalcRef[]
}
