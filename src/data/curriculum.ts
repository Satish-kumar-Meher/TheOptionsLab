import raw from './curriculum.generated.json'

/** The curriculum below is generated from the supplied 33-page PDF by a parser (see /scripts/parse-curriculum),
 *  not retyped. Integrity checked: 25 levels · 132 modules · 1,239 numbered topic items.
 *
 *  Label reconciliation: the PDF has 24 "Parts" but 25 "Levels" — Part 1 contains Level 1 AND Level 2;
 *  every other Part contains exactly one Level (Part n ↔ Level n−1 for n ≥ 2). We navigate by LEVEL
 *  and show the Part as a secondary label.
 *
 *  Stages: the PDF's own roadmap has 7 stages; the product brief describes a 5-step journey.
 *  Both are kept: `pdfStages` (7, used in the curriculum sidebar) roll up into `journey` (5, used on the landing page). */

export interface ModuleTable {
  headers: string[]
  rows: string[][]
}
export interface ModuleChecklist {
  title: string
  items: string[]
}
export interface CurriculumModule {
  /** true for modules that come from the supplied detailed-lessons PDF and are not in the master curriculum outline */
  supplement?: boolean
  id: string
  title: string
  topics: string[]
  intro?: string
  formula?: string
  table?: ModuleTable
  checklist?: ModuleChecklist
}
export interface Level {
  level: number
  part: number
  partTitle: string
  stage: string
  title: string
  subtitle: string | null
  modules: CurriculumModule[]
}
export interface PdfStage {
  id: string
  label: string
  from: number
  to: number
}

export const levels = raw.levels as Level[]
export const pdfStages = raw.stages as PdfStage[]

export const journey = [
  { id: 'beginner', label: 'Beginner', from: 1, to: 5, blurb: 'Markets, participants, options, premium and strikes.', pdf: ['Beginner'] },
  { id: 'intermediate', label: 'Intermediate', from: 6, to: 9, blurb: 'Greeks, open interest, the option chain and India VIX.', pdf: ['Intermediate'] },
  { id: 'advanced', label: 'Advanced', from: 10, to: 18, blurb: 'Price action, order flow, futures, writers, institutions, market profile, liquidity.', pdf: ['Advanced', 'Professional Analysis'] },
  { id: 'specialist', label: 'Specialist', from: 19, to: 21, blurb: 'Expiry-day gamma, the full strategy library and intraday playbooks.', pdf: ['Specialist'] },
  { id: 'professional', label: 'Professional', from: 22, to: 25, blurb: 'Risk, psychology, backtesting, algo trading and journaling.', pdf: ['Risk & Discipline', 'Quantitative Trading'] },
] as const

export const allModules = levels.flatMap((l) => l.modules.map((m) => ({ ...m, level: l.level })))
export type FlatModule = (typeof allModules)[number]

const moduleIndex = new Map(allModules.map((m, i) => [m.id, i]))
export const getModule = (id: string) => (moduleIndex.has(id) ? allModules[moduleIndex.get(id)!] : undefined)
export const getLevel = (n: number) => levels.find((l) => l.level === n)
export const getLevelOfModule = (id: string) => getLevel(Number(id.split('.')[0]))
export const neighbors = (id: string) => {
  const i = moduleIndex.get(id)
  if (i === undefined) return { prev: undefined, next: undefined }
  return { prev: allModules[i - 1], next: allModules[i + 1] }
}
export const stageOfLevel = (n: number) => pdfStages.find((s) => n >= s.from && n <= s.to)!
export const journeyOfLevel = (n: number) => journey.find((s) => n >= s.from && n <= s.to)!

export const counts = {
  levels: levels.length,
  modules: allModules.length,
  topics: allModules.reduce((a, m) => a + m.topics.length, 0),
  parts: new Set(levels.map((l) => l.part)).size,
}
export const levelTopicCount = (l: Level) => l.modules.reduce((a, m) => a + m.topics.length, 0)

/** One-line orientation for each level, written from that level's own module titles (the PDF gives none). */
export const levelBlurbs: Record<number, string> = {
  1: 'What markets are, how Indian exchanges and regulators fit together, how indices work, and the vocabulary every trader needs.',
  2: 'Retail, HNI, prop, institutional, FII/DII, market makers and algos — what each wants, and how to read the published participant data.',
  3: 'Derivatives, futures versus options, calls and puts, the four core positions and the exchange contract specifications.',
  4: 'Why an option has a price: intrinsic value, time value, what moves premium, and how premium expands, decays or collapses.',
  5: 'Strikes, ATM / ITM / OTM, strike selection for buyers and writers, and how premium behaves across strikes.',
  6: 'Delta, gamma, theta, vega, rho and the second-order Greeks — and how they combine in real trades.',
  7: 'How open interest is created and destroyed, futures build-up patterns, option-specific positioning, and why OI has limits.',
  8: 'Every column of the option chain, the call and put sides, OI-based support and resistance, PCR and dynamic reading.',
  9: 'Realised vs implied volatility, India VIX, IV skew and term structure, VIX with premium, and VIX in intraday trading.',
  10: 'Candlesticks, market structure, support and resistance, genuine versus false breakouts and intraday behaviour.',
  11: 'Volume, price + volume + OI together, the order book, order flow, CVD, absorption and market microstructure.',
  12: 'Index futures, futures OI patterns, how futures and options relate, and institutional positioning data.',
  13: 'Who writes options, why, the types of writers, writer psychology, how writers influence price, and writer traps.',
  14: 'Who buys options and why, buyer psychology, profit and loss behaviour, and crowd psychology.',
  15: 'Spotting fresh positions and exits, strike migration, dynamic support and resistance, ten OI scenarios and intraday monitoring.',
  16: 'Institutional execution, market makers and hedging, dealer gamma exposure, advanced institutional concepts and liquidity.',
  17: 'Auction market theory, Market Profile (TPO), Volume Profile and market day types.',
  18: 'Liquidity concepts, supply and demand zones, and trapped market participants.',
  19: 'Expiry mechanics, expiry-day Greeks and behaviour, gamma trading, a practical expiry-day case study and advanced concepts.',
  20: 'The complete strategy library — buying, selling, spreads, volatility and advanced structures — and how to choose among them.',
  21: 'Bullish, bearish, sideways, breakout and special intraday setups, plus a full scenario-analysis checklist.',
  22: 'Capital and position sizing, risk-reward and risk of ruin, stop-loss design, and the distinct risks of buying versus selling.',
  23: 'Individual and mass psychology, how participant behaviour shifts near expiry, and building a process-oriented mindset.',
  24: 'Trading data, collection and engineering, backtesting, performance metrics, walk-forward and Monte Carlo, algo trading and your own analysis engine.',
  25: 'Trade journaling, performance evaluation, mistake analysis and continuous improvement.',
}

/** Where to practise a level's ideas. Paths are real routes in this app. */
export const levelTools: Record<number, { to: string; label: string }[]> = {
  3: [{ to: '/strategies/long-call', label: 'Payoff of the four core positions' }],
  4: [{ to: '/labs/greeks', label: 'Greeks Lab — price an option' }],
  6: [{ to: '/labs/greeks', label: 'Greeks Lab' }],
  7: [{ to: '/labs/open-interest', label: 'Open Interest Lab' }],
  8: [{ to: '/labs/option-chain', label: 'Option Chain Lab' }],
  9: [{ to: '/labs/greeks', label: 'Greeks Lab — vega & IV' }, { to: '/labs/option-chain', label: 'Option Chain Lab — IV by strike' }],
  10: [{ to: '/labs/market-structure', label: 'Market Structure Lab' }],
  11: [{ to: '/labs/market-structure', label: 'Market Structure Lab — volume profile' }],
  12: [{ to: '/labs/open-interest', label: 'Open Interest Lab — price × OI' }],
  13: [{ to: '/labs/option-chain', label: 'Option Chain Lab — writer walls' }],
  15: [{ to: '/labs/open-interest', label: 'Open Interest Lab — 10 scenarios' }, { to: '/labs/option-chain', label: 'Option Chain Lab' }],
  17: [{ to: '/labs/market-structure', label: 'Market Structure Lab — profile' }],
  18: [{ to: '/labs/market-structure', label: 'Market Structure Lab' }],
  19: [{ to: '/labs/expiry-gamma', label: 'Expiry-Day Gamma Lab' }],
  20: [{ to: '/strategies', label: 'Strategy Library' }],
  21: [{ to: '/labs/open-interest', label: 'Open Interest Lab' }, { to: '/labs/market-structure', label: 'Market Structure Lab' }],
  22: [{ to: '/risk', label: 'Risk & Psychology' }],
  23: [{ to: '/risk#psychology', label: 'Trading psychology' }],
  24: [{ to: '/quant', label: 'Backtesting Studio' }],
  25: [{ to: '/risk#journal', label: 'Trade journal' }],
}
