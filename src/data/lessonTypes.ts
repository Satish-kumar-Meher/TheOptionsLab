/** Schema for authored (deep) lessons. A module WITHOUT an authored lesson still gets a real lesson page,
 *  built from its PDF topics, tables and checklists — nothing is faked or padded. */

export interface Concept {
  term: string
  definition: string
}
export interface FormulaBlock {
  label: string
  /** KaTeX source */
  tex: string
  note?: string
}
export interface WorkedExample {
  title: string
  /** given values, each rendered as a line, e.g. "Nifty spot = 24,000" */
  given: string[]
  /** step-by-step working; each string may contain simple inline math as plain text */
  steps: string[]
  takeaway: string
}
export interface Scenario {
  /** one or two sentences */
  text: string
}
export interface PracticeQuestion {
  q: string
  a: string
}
export interface ChainExample {
  caption: string
  /** simulated rows for a small illustrative chain */
  rows: { strike: number; ceOI: number; ceChg: number; ceLTP: number; peLTP: number; peChg: number; peOI: number }[]
  reading: string[]
}
export interface Lesson {
  moduleId: string
  /** 2–3 sentences: what this module is really about */
  summary: string
  objectives: string[]
  concepts: Concept[]
  formulas?: FormulaBlock[]
  examples?: WorkedExample[]
  scenarios?: { bullish: Scenario; bearish: Scenario; sideways: Scenario }
  chain?: ChainExample
  pitfalls?: string[]
  practice: PracticeQuestion[]
  assignment: string
  lab?: { to: string; label: string }
}
