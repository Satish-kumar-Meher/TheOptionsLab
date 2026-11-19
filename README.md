# Strikewick — Options & Option-Chain Analysis Academy

React 19 · TypeScript (strict) · Tailwind CSS v4 · Motion (Framer Motion) · React Three Fiber / drei / postprocessing · Recharts · KaTeX · lucide-react.

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # typecheck + production build to dist/
    npm run preview

## What is in it
- `/` Landing page with a 3D glass-candlestick hero (adaptive: full reflections/bloom → light → static SVG fallback), stats, learning journey, featured modules, strategies, scenarios.
- `/curriculum`, `/curriculum/:level` All 25 levels / 132 modules / 1,239 topics parsed directly from the supplied PDF, with search, accordions and browser-local progress.
- `/learn/:moduleId` Lesson reader for every module; 15 modules have full authored lessons (formulas, computed worked examples, scenarios, practice, assignment).
- `/labs/*` Greeks, Option Chain, Open Interest, Market Structure, Expiry-Day Gamma.
- `/strategies/:slug` 30 strategies with interactive payoff diagrams (expiry + T+0), Greeks, risk notes, compare mode.
- `/risk` Position sizing, expectancy, risk of ruin (Monte Carlo), drawdown, stop-loss types, buyer vs seller risk, psychology, working trade journal (localStorage, CSV export).
- `/quant` Backtesting Studio: data, pipeline, synthetic backtest with costs, metrics, walk-forward, Monte Carlo, regimes, algo architecture, engine blueprint.
- `/roadmap` The PDF's 7-stage roadmap, 8 exercises, 8 misconceptions, study method.

## Data honesty
All market data, option chains, backtests and results are SIMULATED and labelled. No live data, no backend. Progress and journal entries live in this browser only (localStorage).
Nifty lot size defaults to 65 and is editable — check the current NSE contract specification.

## Curriculum label reconciliation
The PDF has 24 "Parts" but 25 "Levels" (Part 1 holds Levels 1 and 2). The site navigates by Level and shows the Part as a secondary label.

## Topic-by-topic lessons
Every module (133) now has a lesson file in `src/data/topicLessons/m<LL>_<M>.ts`: the nine-step method, plus per-topic definition (English + Hinglish), mechanism, Indian-market worked example, takeaway, an SVG illustration and (where relevant) a calculator. Schema: `src/data/topicLessonTypes.ts`. Validate with `node scripts/check-lessons.mjs --list`. Module 2.4 (institutional activity) is a supplement added from the supplied lessons text. Illustrations are generated SVG (no photographs). Lot sizes, STT/charges and expiry rules change — verify on NSE/SEBI before relying on them.
