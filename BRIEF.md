# Strikewick — build brief (read fully before writing code)

Product: an advanced **options trading & option-chain analysis** learning platform for the Indian market (NIFTY / BANKNIFTY / SENSEX), built from a 33-page curriculum (25 levels, 132 modules, 1,239 topics — see `src/data/curriculum.ts`).
Stack: React 19 · TypeScript (strict) · Tailwind v4 · `motion/react` (Framer Motion) · React Three Fiber · Recharts · lucide-react · KaTeX. Path alias `@/` → `src/`.

## Visual identity (non-negotiable)
Dark institutional terminal + 3D glass candlesticks. Palette tokens exist as Tailwind colours:
`bg #070A0D · bg-2 · surface #111820 · surface-2 · fg #F4F7FA · fg-2 #929DA9 · fg-3 · line · line-strong · bull #00E58A · bull-deep #00C878 · bear #F04444 · bear-deep #A91626 · gold #C9A86A (chrome accent) · ice #8FB4D9 (neutral data series)`.
Use as `bg-surface`, `text-fg-2`, `border-line`, `text-bull`, `bg-bear/10`, etc.

**Rule: green and red mean MARKET DIRECTION ONLY** — bull/bear, profit/loss, CE(call)=bull-ish / PE(put)=bear-ish only where the content is directional, rising/falling OI. Never use green/red to decorate, as button colours, or for generic emphasis. Chrome (eyebrows, focus, dividers, highlights, selected states) uses **ivory (`fg`) and champagne (`gold`)**. Non-directional data series use `ice` or `gold`.
Avoid neon. Avoid generic SaaS-card repetition: vary layout — asymmetric grids, big numerals, full-bleed sections, dense terminal-style tables next to airy typography.
Fonts: `font-display` (Manrope) for headings, `font-sans` (Inter) body, `font-mono` / `.num` (JetBrains Mono, tabular) for ALL numbers in tables, prices, Greeks.

## Shared building blocks — USE THESE, do not reinvent, do NOT edit them
`import { … } from '@/components/ui'`:
`Button, LinkButton, GlassPanel(variant 'solid'|'glass', tone 'bull'|'bear'|'none'), Badge(tone neutral|bull|bear|gold|ice), SimulatedBadge, ProgressBar, ProgressRing, Accordion, Tabs, Tip, DataTable<T>, ChartContainer, Slider, Segmented, Reveal, CountUp, Tex (KaTeX; `<Tex block>{String.raw`...`}</Tex>`), SectionHeader, PageHeader, Disclaimer, cn`.
Libs: `@/lib/bs` (Black–Scholes + Greeks, conventions documented at the top of the file), `@/lib/rng` (seeded `mulberry32`, `gaussian`, `genCandles`, `percentile`), `@/lib/format` (Indian grouping `fmtIN`, `fmtRupee`, `fmtCompactIN`, …), `@/lib/chartTheme` (`chart` colours, `axisProps`, `gridProps`, `tooltipStyle` — **all Recharts charts must use these**).
CSS helpers in `src/index.css`: `.glass`, `.glass-solid`, `.num`, `.eyebrow`, `.container-x`, `.section`, `.market-grid`, `.text-gradient`, `.text-gold-gradient`.
Charts: Recharts (`ResponsiveContainer` inside `ChartContainer`) or hand-built SVG for bespoke visuals (payoff curves, candles, profiles). Use `<ChartContainer title subtitle height>` as the frame.

## Honesty & safety rules
- Every simulated dataset shows `SimulatedBadge` (ChartContainer does this by default). Never imply live data or real performance. No fake testimonials/stats.
- Never present a strategy as guaranteed/likely profitable. Show risk (max loss, margin, gap risk) next to reward. Use phrases like "can", "may", "in this simulation".
- Do not invent course content that contradicts the PDF curriculum. Pedagogy must be accurate: OI alone cannot reveal who initiated; high OI is a potential level, not a guarantee; India VIX measures expected volatility not direction; Max Pain is not a target.
- Nifty lot size is user-editable, default **65** (revised from Dec 2025) with the note "check the current NSE contract specification". Sample spot level ≈ 24,000; India VIX sample ≈ 13–16; r ≈ 6.5%; Nifty strike step 50.
- Progress/journal data persists only in this browser (`localStorage`) — label it that way. No backend.

## Quality bar
Premium fintech product. Generous spacing, clear hierarchy, subtle motion (`motion/react`; keep durations 0.3–0.9s, ease `[0.16,1,0.3,1]`; animate 1–2 key things per view; ALWAYS respect `useReducedMotion`).
Responsive from 360px → 1920px (stack on mobile; tables scroll horizontally inside their container; touch targets ≥ 40px).
Accessibility: real `<label>`s, `aria-*` for custom widgets, keyboard operable, visible focus (global style exists), text contrast ≥ 4.5:1, do not rely on colour alone (add ▲/▼ or text), charts get a text summary or table fallback where cheap.
Performance: memoise heavy computation (`useMemo`), no per-frame React state, cap Monte Carlo sizes, lazy where sensible.
No console errors/warnings. No `any`. No placeholder / lorem / "coming soon" / dead buttons. Every control must do something real.
Self-critique before finishing: does it look like an institutional-grade fintech product? is the hierarchy excellent? does it still look great at 390px?

## Ground rules for parallel work
- Each worker OWNS specific files (listed in its task). Do not edit files you don't own — including `src/components/ui/*`, `src/index.css`, `src/lib/*`, `src/data/curriculum*.ts`, `App.tsx`. If you need a helper, create it inside your own folder.
- Verify with `cd /home/claude/optionslab && npx tsc --noEmit` and ignore errors in files you do not own (others are mid-edit). Do NOT run `vite build`, `npm install`, or start servers. Do not add dependencies.
- Route files export `default` components. Use named exports for sub-components.
- End with a SHORT report: files created, exported API, anything incomplete, any decision a reviewer must know.
