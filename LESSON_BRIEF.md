# Strikewick — lesson-authoring brief (read fully; it is short)

You are writing **detailed, topic-by-topic lessons** for an Indian options-trading learning site (NIFTY / BANKNIFTY / SENSEX). The curriculum (25 levels, 133 modules, 1,247 topics) already exists in `src/data/curriculum.generated.json` — **never edit it**. You add lesson content on top of it.

## What you deliver
One file per module: `src/data/topicLessons/m<LL>_<M>.ts` (zero-padded level, e.g. `m06_2.ts` = module 6.2, `m19_5.ts`, `m02_4.ts`). Each file:

```ts
import type { ModuleLesson } from '../topicLessonTypes'
const m: ModuleLesson = { moduleId: '6.2', intro: '…', introHi: '…', steps: {…}, topics: [ {t:1, def, hi, how, eg:{title,text}, tip, visual?, calc?}, … ] }
export default m
```
The full type (with every visual kind and calculator id) is in `src/data/topicLessonTypes.ts` — read it first.

**Coverage rule:** `topics` must contain exactly one TopicLesson per numbered topic of that module in the curriculum JSON (`t` = 1-based position). Modules whose JSON has no numbered topics: **3.4** (t1–4 = table rows Buy CE, Sell CE, Buy PE, Sell PE; t5–10 = the six "understand each position" checklist items), **7.3** (t1–4 = the four table rows), **8.2** (t1–12 = the twelve column rows), **21.6** (t1–12 = the twelve checklist questions). Read the module's `table` / `checklist` fields in the JSON.

## Per topic (what makes it "detailed")
- `def` — simple English definition, 2–4 sentences, jargon defined the first time.
- `hi` — the same idea in natural Roman-script **Hinglish** (like a friendly Mumbai trading mentor: "Jab aapko lagta hai market upar jayega…"). Not a literal translation; explain it as you would to a friend. 2–4 sentences.
- `how` — how it really works in the Indian market: mechanism, who does what, 3–6 sentences. Name real institutions/instruments where relevant (NSE, SEBI, NSDL/CDSL, clearing corporation NSCCL, SPAN margin, etc.).
- `eg` — a **real-life or realistic Indian example with actual numbers** (Nifty ≈ 24,000, strike step 50, lot 65, India VIX ≈ 14, rate 6.5%, ₹ with Indian digit grouping). Every number must be arithmetically correct — **compute, don't guess**. Where you cite a real historical event (e.g. 2008 crisis, COVID crash March 2020, Budget day, Adani-Hindenburg Jan 2023, election-result day 4 Jun 2024), only use facts you are certain about or have verified; say "illustrative" for constructed numbers.
- `tip` — the single most useful takeaway or most common beginner mistake.
- `visual` — an illustration for the topic **whenever one would genuinely help** (aim for ≥ 60 % of topics; vary the kinds; never decorate). Colour rule: green/red only for bullish/bearish, profit/loss, CE/PE-as-direction; otherwise use `gold`/`ice`/`neutral`.
- `calc` — attach a calculator **only where a calculation genuinely belongs** to that topic (aim ≈ 25–40 % of topics). Use `preset` so it opens with the topic's own example (keys below). `why` = one line.

## Per module — the 9-step method (`steps`)
Concept (+ `conceptHi`) · Mechanism · Example · Chart (one `VisualSpec`) · Option chain · Psychology · Scenarios (bullish/bearish/sideways) · Practice (3–4 Q&A with full working) · Assignment (one concrete task). Plus `intro` / `introHi` (2–3 sentences each). If a step is genuinely not applicable (e.g. "Option chain" for the Stock-market-structure module), say honestly **how the topic relates to option trading** in 2–3 sentences instead of padding.
`tools` — optional module-wide calculators.

## Accuracy & safety (non-negotiable)
- Educational only. Never promise profit, never call a strategy safe/guaranteed, show risk next to reward ("can", "may", "in this example").
- Curriculum truths: OI alone cannot show who initiated a trade; high OI = potential level, not guaranteed support/resistance; India VIX = expected volatility, not direction; Max Pain is not a target; option writers do not always win; OI ≠ order-flow data; futures build-up rules are for futures, not blindly for option OI.
- **Regulatory / contract facts change** (lot sizes, expiry days, STT/charges, margin, quantity freeze, SEBI circulars, index constituents). Use the **FACTS** below; for anything else, verify with WebSearch/WebFetch against NSE/SEBI/official sources before stating specifics, and otherwise write "as per currently published NSE rules — verify before trading" instead of a number you are unsure of. Never invent a rule, rate, date or statistic. Illustrative numbers must be labelled illustrative.
- No lorem, no filler, no "in this lesson we will…" padding, no emoji. Short paragraphs. Plain words.
- No external image URLs. Illustrations = `visual` specs only.
- Do not copy text from the sources verbatim — paraphrase.

## FACTS (use these; flag if you find them outdated)
- NIFTY 50 lot size **65** (NSE revision effective Dec 2025). The supplied lessons PDF uses **75 as an illustrative** lot size in Levels 2–3 worked examples — in Levels 1–3 follow the PDF's numbers (it says "illustrative") and add a note that the current NIFTY lot is 65 where lot size matters. From Level 4 onward use 65 and say "check the current NSE contract specification".
- NSE index derivative expiries are scheduled on **Tuesday** (holiday → previous trading day). Strike step NIFTY 50 (can vary by distance — "always inspect the actual strike list"). Index options are **European, cash-settled**; stock options are **physically settled** (as per the supplied PDF, Module 3.5).
- Spot ≈ 24,000, VIX ≈ 14, r = 6.5%, dividend yield ≈ 1.3 % for NIFTY if needed. Black–Scholes conventions are in `src/lib/bs.ts`.
- Charges, STT, GST rates: the supplied PDF Module 3.5 §10 has the current numbers (lines ≈ 7479–7645 of the lessons text file); level 3 authors read it, others should say "check current rates".

## Hinglish style sample (from the author's own lessons)
"Jab aapko lagta hai market upar jayega aur aap CE buy karte ho, toh aap Long Call position create karte ho."
"Derivative ka apna independent value source nahi hota. Iski value kisi doosre asset ke price se derive hoti hai."

## Calculators — ids and `preset` keys (values are numbers unless noted)
lot-value: premium, lotSize, lots, spot, marginPct · futures-pnl: side('long'|'short'), entry, exit, lotSize, lots · option-pnl: optType('CE'|'PE'), side('buy'|'sell'), strike, premium, expiryPrice, lotSize, lots · breakeven: optType, side, strike, premium · premium-split: optType, spot, strike, premium · moneyness: optType, spot, strike · greeks: optType, spot, strike, days, iv(%), rate(%) · expected-move: spot, vix, days · pcr: putOI, callOI, putVol, callVol · oi-buildup: priceChangePct, oiChangePct · max-pain: strip (string "strike:ceOI:peOI;strike:ceOI:peOI;…") · order-book-impact: side('buy'|'sell'), qty, refPrice, book (string "price:qty;price:qty;…" — the side being consumed, best first) · vwap-twap: fills (string "price:qty;…") · hedge-ratio: portfolio, beta, futuresNotional · basis-fair-value: spot, futures, rate(%), days, dividend(%) · charges: premium, lotSize, lots, side('buy'|'sell'), brokerage · position-size: capital, riskPct, entry, stop, lotSize · risk-reward: winRate(%), avgWin, avgLoss · drawdown-recovery: drawdownPct · pivot-levels: high, low, close · put-call-parity: spot, strike, days, rate(%), call, put · index-weight: weight(%), move(%), indexLevel · return-calc: start, end, years · spread-cost: bid, ask, qty, lotSize · portfolio-delta: d1,q1,d2,q2,d3,q3 (delta and signed quantity per position) · straddle-move: spot, cePrice, pePrice, strike · kelly: winRate(%), payoffRatio

## Process
1. Read `topicLessonTypes.ts`, then the curriculum JSON for YOUR modules only (use node/python to print them compactly).
2. For each module: write its file in one go. Compute every number in a scratch script (Node 22 runs `.ts`; use `src/lib/bs.ts` for option values) — keep scratch files in the scratchpad directory, never in the project.
3. After each file run `node scripts/check-lessons.mjs m<LL>_<M>` from the project root — it validates the schema, topic coverage, visual/calculator ids and flags suspicious text. Fix everything it reports.
4. Do not edit any file except your own `m*.ts` files. Do not run `npm install`, `vite build` or start servers. Keep the final report to ≤ 8 lines: modules done, anything you could not verify.
