import type { ModuleLesson } from '../topicLessonTypes'

/* Module 7.5 — OI Data Interpretation.
 * Illustrative chain, NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). OI is quoted in lots here;
 * check whether your platform shows lots or units. Every derived number is computed below, not typed by hand. */
const f = (n: number) => n.toLocaleString('en-IN')
const d1 = (n: number) => n.toFixed(1)
const LOT = 65
type Row = { k: number; ce: number; ceChg: number; pe: number; peChg: number }
const chain: Row[] = [
  { k: 23600, ce: 15000, ceChg: 500, pe: 58000, peChg: 7000 },
  { k: 23700, ce: 19000, ceChg: 1000, pe: 66000, peChg: 5500 },
  { k: 23800, ce: 26000, ceChg: 1500, pe: 96000, peChg: 14000 },
  { k: 23900, ce: 38000, ceChg: 2500, pe: 72000, peChg: 6000 },
  { k: 24000, ce: 84000, ceChg: 9000, pe: 81000, peChg: 8000 },
  { k: 24100, ce: 79000, ceChg: 7000, pe: 44000, peChg: -2500 },
  { k: 24200, ce: 112000, ceChg: 18000, pe: 31000, peChg: -1500 },
  { k: 24300, ce: 67000, ceChg: 6500, pe: 20000, peChg: 500 },
  { k: 24400, ce: 74000, ceChg: 9500, pe: 15000, peChg: -500 },
]
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0)
const totCE = sum(chain.map((r) => r.ce))
const totPE = sum(chain.map((r) => r.pe))
const totCEchg = sum(chain.map((r) => r.ceChg))
const totPEchg = sum(chain.map((r) => r.peChg))
const pcr = totPE / totCE
const r200 = chain.find((r) => r.k === 24200)!
const r23800 = chain.find((r) => r.k === 23800)!
const prev200 = r200.ce - r200.ceChg
const pct200 = (r200.ceChg / prev200) * 100
const r23600 = chain.find((r) => r.k === 23600)!
const pct236 = (r23600.ceChg / (r23600.ce - r23600.ceChg)) * 100
// topic 3 contrast: a small strike with a big percentage change
const small = { oi: 3000, chg: 2400 }
const smallPct = (small.chg / (small.oi - small.chg)) * 100
// expiry-wise
const exp = { cur: 514000, nxt: 232000, mon: 641000 }
const expTot = exp.cur + exp.nxt + exp.mon
// intraday at 24,200 CE (change vs previous close)
const intra = [
  { t: '11:00', chg: 6000 },
  { t: '12:30', chg: 11000 },
  { t: '14:00', chg: 15000 },
  { t: '15:15', chg: 18000 },
]
const steps = intra.map((x, i) => x.chg - (i ? intra[i - 1].chg : 0))
// cumulative over five sessions at 24,200 CE
const daily = [6000, 9000, -4000, 7000, 18000]
const cumChg = sum(daily)
const cumStart = r200.ce - cumChg
const cumPct = (cumChg / cumStart) * 100
const running: number[] = []
daily.reduce((a, x) => { running.push(a + x); return a + x }, 0)
// distribution / concentration
const sortedCE = [...chain].sort((a, b) => b.ce - a.ce)
const top3CE = sum(sortedCE.slice(0, 3).map((r) => r.ce))
const top1ShareCE = (sortedCE[0].ce / totCE) * 100
const top3ShareCE = (top3CE / totCE) * 100
const sortedPE = [...chain].sort((a, b) => b.pe - a.pe)
const top1SharePE = (sortedPE[0].pe / totPE) * 100
const evenShare = 100 / chain.length
const oiRows = chain.map((r) => ({ strike: r.k, ce: r.ce / 1000, pe: r.pe / 1000 }))

const m: ModuleLesson = {
  moduleId: '7.5',
  intro: `OI data arrives as a pile of numbers: totals, daily changes, percentages, strike-by-strike and expiry-by-expiry. This module is about reading that pile in an orderly way, from the broad picture down to a single strike. Every reading is a hypothesis about where positions are, because OI never shows who initiated a trade. NIFTY lot size is 65; verify the current NSE contract specification.`,
  introHi: `OI data ek bade dher ki tarah aata hai: total, daily change, percentage, strike-wise aur expiry-wise. Is module mein hum is dher ko ek sahi order mein padhna seekhenge, pehle bada picture, phir ek strike. Har reading sirf ek hypothesis hai ki positions kahan hain, kyunki OI yeh nahi batata ki trade kisne initiate kiya. NIFTY ka lot 65 hai; current NSE contract specification check karein.`,
  steps: {
    concept: `Total OI says how many contracts are open. OI change says how many were added or removed since the previous close. Percentage change scales that against the starting level. Strike-wise and expiry-wise views say where the contracts sit. Intraday and cumulative views say how the picture builds over hours and days. Distribution, concentration and divergence describe the shape of the picture and whether it agrees with price. None of these identifies buyers versus sellers, and a high OI strike is a potential level, not a guarantee.`,
    conceptHi: `Total OI batata hai ki kitne contracts open hain. OI change batata hai ki pichle close se kitne add ya kam hue. Percentage change usko starting level ke hisaab se scale karta hai. Strike-wise aur expiry-wise view batate hain ki contracts kahan baithe hain. Intraday aur cumulative view batate hain ki picture ghanton aur dino mein kaise banti hai. Distribution, concentration aur divergence picture ka shape batate hain aur yeh bhi ki woh price se match karti hai ya nahi. Inme se koi bhi buyer aur seller alag nahi batata, aur high OI strike sirf potential level hai, guarantee nahi.`,
    mechanism: `Open interest rises when a new buyer and a new seller create a contract, falls when both close, and stays unchanged when a position only changes hands. NSE publishes OI per strike and expiry; vendors and broker platforms add change, percentage and totals on top. The change column is measured against the previous close, so it resets each day. For a series, OI also disappears at expiry as contracts settle, so cumulative comparisons only make sense inside one expiry. Because OI is a stock of positions and volume is a flow of trades, the two must be read side by side.`,
    example: {
      title: 'One chain, read top-down (illustrative)',
      text: `NIFTY 24,000, lot 65, current weekly expiry, OI in lots. Total call OI = ${f(totCE)} lots, total put OI = ${f(totPE)} lots, so the OI PCR is ${f(totPE)} ÷ ${f(totCE)} = ${pcr.toFixed(2)}. Day's change: calls +${f(totCEchg)}, puts +${f(totPEchg)}. The largest call OI is at 24,200 (${f(r200.ce)} lots, ${f(r200.ceChg)} added); the largest put OI is at 23,800 (${f(r23800.pe)} lots). That outlines a potential range of 23,800 to 24,200 where positions are heaviest, not a forecast that the index will stay in it.`,
    },
    chart: {
      kind: 'oi',
      title: 'Strike-wise OI, in thousand lots (illustrative)',
      caption: 'Calls in red, puts in green. Heaviest call strike 24,200, heaviest put strike 23,800. Heaviest means most positions, not a wall.',
      rows: oiRows,
      spot: 24000,
    },
    optionChain: `On the chain, the OI column is total contracts, the Change in OI column is the day's addition or reduction, and some platforms add a percentage change. Start with the totals at the bottom, then scan the OI column for the biggest strikes, then the change column for where today's activity is, and only then look at premiums and IV. Switch the expiry selector to compare the current week, next week and month. Check whether your platform shows OI in lots or in units, because the same number then differs by a factor of 65.`,
    psychology: `Big numbers look important. A trader sees 1,12,000 lots at one strike and treats it as a fact about the future. The numbers only describe a past and present stock of contracts. A good habit is to ask three questions before using any OI figure: is it total or change, is it for this expiry or all expiries, and what would make it stop mattering.`,
    scenarios: {
      bullish: `In a rally, call OI at strikes below the index may fall as short call positions are closed, while put OI at lower strikes tends to grow if put writers feel comfortable. A shift of the heaviest OI strikes upward is often what traders watch for, though it only describes positions.`,
      bearish: `In a fall, put OI at strikes above the index may shrink as puts are closed, and call OI near the index may grow. The heaviest strikes tend to shift downward. Protective put buying also raises put OI, so a growing put total is not automatically bullish.`,
      sideways: `In a range, total OI keeps rising as positions are added, and the heaviest strikes tend to stay put. Intraday changes are small relative to totals. As expiry nears, OI at far strikes thins out and the picture concentrates near the index.`,
    },
    practice: [
      {
        q: `Call OI at a strike is ${f(r200.ce)} lots after adding ${f(r200.ceChg)} lots today. What was the previous close OI and the percentage change?`,
        a: `Previous = ${f(r200.ce)} − ${f(r200.ceChg)} = ${f(prev200)} lots. Change % = ${f(r200.ceChg)} ÷ ${f(prev200)} × 100 = ${d1(pct200)}%.`,
      },
      {
        q: `Total put OI is ${f(totPE)} lots and total call OI is ${f(totCE)} lots. Compute the OI PCR, and say what it does not tell you.`,
        a: `${f(totPE)} ÷ ${f(totCE)} = ${pcr.toFixed(2)}. It does not tell you who holds the contracts, whether puts are written or bought, or which direction the index will move.`,
      },
      {
        q: `One strike holds ${f(sortedCE[0].ce)} lots out of ${f(totCE)} lots of call OI. What is its share, and how does it compare with an even spread across ${chain.length} strikes?`,
        a: `Share = ${f(sortedCE[0].ce)} ÷ ${f(totCE)} × 100 = ${d1(top1ShareCE)}%. An even spread would be 100 ÷ ${chain.length} = ${d1(evenShare)}% per strike, so this strike holds about ${(top1ShareCE / evenShare).toFixed(1)} times the even share.`,
      },
      {
        q: `A strike's OI rises ${f(5000)} lots in a day, and the strike holds 5,00,000 lots. A second strike adds the same ${f(5000)} lots but holds only 20,000 lots. Which change matters more?`,
        a: `First: 5,000 ÷ (5,00,000 − 5,000) = ${d1((5000 / 495000) * 100)}%. Second: 5,000 ÷ (20,000 − 5,000) = ${d1((5000 / 15000) * 100)}%. The second is far larger in percentage terms, but the first strike carries far more total positions. Read both numbers.`,
      },
    ],
    assignment: `Pick the current weekly expiry. On one trading day, note at 10:00 and 15:00 the total call OI, total put OI, the strike with the highest call OI, the strike with the highest put OI, and the five largest OI changes. Write which of these moved most between the two times and one thing that could make you wrong about what it means.`,
  },
  topics: [
    {
      t: 1,
      def: `Total OI is the number of open contracts, which are positions not yet closed or settled. It is usually shown for each strike and as a total for calls and for puts. It describes the size of the market's positions, not their direction.`,
      hi: `Total OI ka matlab woh contracts jo abhi open hain, yaani jinki position close ya settle nahi hui. Yeh har strike ke liye aur calls aur puts ke total ke liye dikhta hai. Yeh positions ka size batata hai, direction nahi.`,
      how: `Each open contract has one buyer and one seller, so 1 lot of OI means 1 long lot and 1 short lot both exist. NSE publishes OI per strike per expiry, and the clearing corporation (NSCCL) tracks the positions behind it. Totals across the chain are used to compute ratios such as PCR. A big total means many positions exist; it does not say whether they are hedges, spreads or outright bets. Totals also drop sharply at expiry as contracts settle.`,
      eg: {
        title: 'Totals on the illustrative chain',
        text: `Call OI over nine strikes = ${f(totCE)} lots = ${f(totCE * LOT)} units. Put OI = ${f(totPE)} lots = ${f(totPE * LOT)} units. The put total is ${f(totPE - totCE)} lots lower than calls, giving OI PCR ${pcr.toFixed(2)}. A PCR near 1 says call and put positions are about equal in number; it does not say anything about who is long or short.`,
      },
      tip: `Always say whether an OI number is in lots or in units, and whether it covers one expiry or all.`,
      visual: {
        kind: 'bars',
        title: 'Total OI, thousand lots',
        unit: 'k',
        items: [
          { label: 'Call OI', value: totCE / 1000, tone: 'bear' },
          { label: 'Put OI', value: totPE / 1000, tone: 'bull' },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: totPE, callOI: totCE, putVol: 1, callVol: 1 },
        why: 'Gives the OI PCR of the example chain; the volume inputs are placeholders.',
      },
    },
    {
      t: 2,
      def: `OI change is the difference between today's OI and the previous close's OI for a strike. A positive number means more contracts were opened than closed. A negative number means more were closed than opened.`,
      hi: `OI change matlab aaj ka OI minus pichle close ka OI. Positive ka matlab opening zyada hui closing se. Negative ka matlab closing zyada hui opening se.`,
      how: `The change is net, so it hides churn: 50,000 lots opened and 40,000 closed shows only +10,000. It also resets every day because it is measured against the previous close. A transfer, where one side opens and the other closes, leaves OI unchanged. For that reason OI change is always lower than or equal to the day's volume at that strike, and it should be read with volume. Rising OI says contracts were added; it does not say whether buyers or sellers initiated them.`,
      eg: {
        title: 'Which strikes saw activity',
        text: `Today's call OI change: 24,200 +${f(r200.ceChg)}, 24,400 +${f(chain[8].ceChg)}, 24,000 +${f(chain[4].ceChg)}. Put OI change: 23,800 +${f(r23800.peChg)}, 24,000 +${f(chain[4].peChg)}, 24,100 ${f(chain[5].peChg)}. Total calls added ${f(totCEchg)} lots, puts ${f(totPEchg)} lots, a difference of ${f(totCEchg - totPEchg)} lots. At 65 units a lot, call additions equal ${f(totCEchg * LOT)} units.`,
      },
      tip: `A big change on thin volume is a different story from the same change on heavy volume; check both.`,
      visual: {
        kind: 'bars',
        title: "Today's OI change, thousand lots",
        unit: 'k',
        items: [
          { label: '24,200 CE', value: r200.ceChg / 1000, tone: 'bear' },
          { label: '24,400 CE', value: chain[8].ceChg / 1000, tone: 'bear' },
          { label: '23,800 PE', value: r23800.peChg / 1000, tone: 'bull' },
          { label: '24,000 PE', value: chain[4].peChg / 1000, tone: 'bull' },
        ],
      },
    },
    {
      t: 3,
      def: `Percentage OI change is the OI change divided by the previous close's OI, times 100. It tells you how large the change is relative to what was already there. It helps compare strikes of very different sizes.`,
      hi: `Percentage OI change matlab OI change ko pichle close ke OI se divide karke 100 se multiply karna. Yeh batata hai ki change pehle se maujood OI ke mukable kitna bada hai. Alag-alag size ke strikes ko compare karne mein madad milti hai.`,
      how: `Percentages are easily inflated at illiquid strikes: adding a small number of lots to a tiny base looks like a huge jump. The percentage can also be negative. Use it to spot where activity is new, and use the absolute number to judge whether it matters in size. The denominator is the previous close's OI, which is current OI minus today's change.`,
      eg: {
        title: 'Same lots, very different percentages',
        text: `24,200 CE: previous OI ${f(prev200)}, change +${f(r200.ceChg)}, so ${d1(pct200)}%. 23,600 CE: previous OI ${f(r23600.ce - r23600.ceChg)}, change +${f(r23600.ceChg)}, so ${d1(pct236)}%. A far strike with ${f(small.oi)} lots now and +${f(small.chg)} lots added shows ${d1(smallPct)}%, but it is only ${f(small.chg * LOT)} units of new positions, which hardly moves anything.`,
      },
      tip: `A giant percentage on a tiny base is noise. Look for a decent percentage on a decent base.`,
      visual: {
        kind: 'compare',
        title: 'Percentage versus absolute change',
        left: { head: 'Small base, big %', tone: 'gold', points: [`${f(small.oi)} lots now`, `+${f(small.chg)} lots = ${d1(smallPct)}%`, 'Easy to inflate, often noise'] },
        right: { head: 'Large base, modest %', tone: 'ice', points: [`${f(r200.ce)} lots now`, `+${f(r200.ceChg)} lots = ${d1(pct200)}%`, 'Large in contracts, more meaningful'] },
      },
      calc: {
        id: 'return-calc',
        preset: { start: prev200, end: r200.ce, years: 1 },
        why: `Shows the ${d1(pct200)}% rise in the 24,200 CE OI from ${f(prev200)} to ${f(r200.ce)} lots.`,
      },
    },
    {
      t: 4,
      def: `Strike-wise OI is the OI at each individual strike price, shown separately for calls and for puts. It is the main way to see where positions are concentrated. Traders use it to find strikes that may matter as levels.`,
      hi: `Strike-wise OI matlab har strike price par alag-alag OI, calls aur puts dono ke liye. Isse pata chalta hai ki positions kahan concentrate hain. Traders isse un strikes ko dhoondte hain jo level ban sakte hain.`,
      how: `Because options on NIFTY have many strikes at a 50-point gap (always inspect the actual strike list), OI is spread across a lot of columns. Strikes at round numbers like 24,000 and 24,500 often attract more OI. The heaviest call strike above the index is a potential resistance area and the heaviest put strike below it a potential support area, because writers there may defend or adjust. These are potential levels only, since price can pass through them, and OI shows neither who is short nor how they will react.`,
      eg: {
        title: 'Reading the ladder',
        text: `On the chain: calls peak at 24,200 (${f(r200.ce)} lots) and puts at 23,800 (${f(r23800.pe)} lots). That is a ${24200 - 23800}-point band around spot 24,000. The 24,000 strike itself holds ${f(chain[4].ce)} call lots and ${f(chain[4].pe)} put lots, nearly equal, which is common at the money. A close above 24,200 would test the call side, but OI does not tell you whether the index will get there.`,
      },
      tip: `Strike-wise OI shows where positions are. It does not say that price must stop there.`,
      visual: { kind: 'oi', title: 'Strike-wise OI (thousand lots)', rows: oiRows, spot: 24000 },
    },
    {
      t: 5,
      def: `Expiry-wise OI is OI split by expiry date: the current week, the next week, the monthly series and beyond. Each expiry has its own set of positions. Mixing them can give a misleading picture.`,
      hi: `Expiry-wise OI matlab OI ko expiry date ke hisaab se alag karna: current week, next week, monthly series aur uske aage. Har expiry ki apni positions hoti hain. Sabko mila dena galat picture de sakta hai.`,
      how: `NSE index options expire on Tuesdays (verify the current schedule), so there is a weekly series, plus the last-Tuesday monthly series, plus longer ones. Weekly OI is dominated by short-term traders and by positions that will vanish within days. Monthly OI is larger for hedgers and for spreads, and it persists longer. Use the current expiry for tactical reading and the monthly series for the bigger positioning. An all-expiry total hides which one a strike's OI belongs to.`,
      eg: {
        title: 'Three expiries (illustrative)',
        text: `Total call OI: current week ${f(exp.cur)} lots (${d1((exp.cur / expTot) * 100)}%), next week ${f(exp.nxt)} lots (${d1((exp.nxt / expTot) * 100)}%), monthly ${f(exp.mon)} lots (${d1((exp.mon / expTot) * 100)}%). The three together are ${f(expTot)} lots. If you read only the all-expiry number, the current week's concentration at 24,200 would be diluted. Never compare an OI figure from one expiry with a figure from another.`,
      },
      tip: `Check which expiry is selected before reading any OI number.`,
      visual: {
        kind: 'bars',
        title: 'Call OI by expiry, thousand lots',
        unit: 'k',
        items: [
          { label: 'Current week', value: exp.cur / 1000, tone: 'gold' },
          { label: 'Next week', value: exp.nxt / 1000, tone: 'ice' },
          { label: 'Monthly', value: exp.mon / 1000, tone: 'neutral' },
        ],
      },
    },
    {
      t: 6,
      def: `Intraday OI changes are changes in OI taken at different times during the same day. They show how the day's building or unwinding evolved. They are more reactive than end-of-day figures.`,
      hi: `Intraday OI changes matlab ek hi din mein alag-alag time par OI ka change. Isse pata chalta hai ki din bhar building ya unwinding kaise hui. End-of-day figure se yeh jaldi react karta hai.`,
      how: `The change shown on most platforms is measured against the previous close, so each snapshot is cumulative for the day. To see how much was added between two times, subtract one snapshot from the next. OI figures update periodically, not tick by tick, and the exact refresh depends on the source, so intraday values can lag the market. Final numbers are settled after the close, so intraday readings can differ from them. Use them as a guide to the day's direction of activity, not as an exact count.`,
      eg: {
        title: 'The 24,200 CE through the day (illustrative)',
        text: `Change vs previous close: 11:00 +${f(intra[0].chg)}, 12:30 +${f(intra[1].chg)}, 14:00 +${f(intra[2].chg)}, 15:15 +${f(intra[3].chg)} lots. Added in each window: ${steps.map((s) => '+' + f(s)).join(', ')}. The additions slow in each window, so the build-up is losing pace even though the total keeps growing. That is a hypothesis to check against price and volume, not a conclusion.`,
      },
      tip: `Snapshots are cumulative from the previous close. Subtract to find what happened in a window.`,
      visual: {
        kind: 'timeline',
        title: 'Cumulative change at 24,200 CE (lots)',
        events: intra.map((x, i) => ({ when: x.t, what: `+${f(x.chg)} (window +${f(steps[i])})`, tone: 'gold' as const })),
      },
    },
    {
      t: 7,
      def: `Cumulative OI changes add the daily changes over several sessions to show the build-up from a starting point. They show whether a position has been growing for days or built up in a single burst. They only make sense inside one expiry series.`,
      hi: `Cumulative OI changes matlab kai sessions ke daily changes ko jodna, taaki starting point se kitna build-up hua woh dikhe. Isse pata chalta hai ki position kai din se badh rahi hai ya ek hi burst mein bani. Yeh sirf ek hi expiry series ke andar sense banata hai.`,
      how: `A day's change resets each close, so a position built slowly over a week can look unremarkable on any one day. Add the daily changes, or simply subtract the OI from the first day from the current OI. Do this inside one expiry, because when a series expires its OI drops to zero and the comparison breaks. A steady multi-day build says more about persistence than a single large day, though both are still positions of unknown ownership.`,
      eg: {
        title: 'Five sessions at the 24,200 CE (illustrative)',
        text: `Daily changes: ${daily.map((x) => (x > 0 ? '+' : '') + f(x)).join(', ')} lots. Running total: ${running.map(f).join(', ')}. Cumulative change = ${f(cumChg)} lots. OI today = ${f(r200.ce)} lots, so the start was ${f(cumStart)} lots, a ${d1(cumPct)}% rise over five sessions. One day (${f(daily[2])}) was a reduction, which shows the build was not smooth.`,
      },
      tip: `Compare within one expiry only. After expiry the series is gone.`,
      visual: {
        kind: 'bars',
        title: 'Daily OI change at 24,200 CE (k lots)',
        unit: 'k',
        items: daily.map((x, i) => ({ label: `Day ${i + 1}`, value: Math.abs(x) / 1000, tone: x >= 0 ? ('gold' as const) : ('ice' as const) })),
        caption: 'Day 3 is a reduction of 4k lots, drawn as a bar of length 4.',
      },
      calc: {
        id: 'return-calc',
        preset: { start: cumStart, end: r200.ce, years: 1 },
        why: `Cumulative ${d1(cumPct)}% increase from ${f(cumStart)} to ${f(r200.ce)} lots.`,
      },
    },
    {
      t: 8,
      def: `OI distribution across strikes is the shape of OI when you look at all strikes at once. It may be one heavy peak, two peaks, a plateau, or a smooth hill. The shape suggests how widely or narrowly positions are spread around the index.`,
      hi: `OI distribution across strikes matlab saare strikes ko ek saath dekhne par OI ka shape. Yeh ek heavy peak, do peaks, plateau ya smooth hill ho sakta hai. Shape batata hai ki positions index ke aas-paas kitni failaav ya concentration mein hain.`,
      how: `Calls are usually heaviest above the index and puts below it, because that is where writers collect premium that decays if the index stays inside. A wide plateau suggests views are spread; a sharp peak suggests many positions share one strike. Use distribution to find the strikes that matter, then check their change. The shape alone does not predict the move, and it changes as new positions arrive or old ones close.`,
      eg: {
        title: 'Shape of the example chain',
        text: `Call OI: peak at 24,200 (${f(r200.ce)}), a plateau at 24,000 to 24,100 (${f(chain[4].ce)} and ${f(chain[5].ce)}), and a secondary bulge at 24,400 (${f(chain[8].ce)}). Put OI: peak at 23,800 (${f(r23800.pe)}) with a second hump at 24,000 (${f(chain[4].pe)}). Calls sit above spot, puts below, with the two overlapping near 24,000. That layout describes a potential range of ${24200 - 23800} points, not a forecast.`,
      },
      tip: `Describe the shape in words first (peak, plateau, two humps), then check what changed.`,
      visual: { kind: 'oi', title: 'A two-sided distribution (thousand lots)', rows: oiRows, spot: 24000 },
    },
    {
      t: 9,
      def: `OI concentration means a large share of the total OI sits in just a few strikes. Higher concentration means more positions depend on the same level. It tells you which strike deserves attention, not what will happen there.`,
      hi: `OI concentration ka matlab total OI ka bada hissa sirf kuch strikes mein baitha hai. Zyada concentration ka matlab zyada positions ek hi level par depend karti hain. Yeh batata hai ki kaun sa strike dhyan dene layak hai, wahan kya hoga yeh nahi.`,
      how: `A simple measure is the share of the top one or three strikes in the total. If a strike holds more than an even share, many positions rest on it. Writers there may manage their risk as price approaches (rolling, hedging or closing), which can add to the activity around the level. That is also why concentrated strikes can break: a breach forces a rush of adjustments. High concentration is a potential level, not a guarantee that price will stop.`,
      eg: {
        title: 'Concentration in the call OI',
        text: `Top call strike 24,200 holds ${f(sortedCE[0].ce)} of ${f(totCE)} lots, ${d1(top1ShareCE)}%. The top three (${sortedCE.slice(0, 3).map((r) => f(r.k)).join(', ')}) hold ${f(top3CE)} lots, ${d1(top3ShareCE)}%. An even spread across ${chain.length} strikes would give ${d1(evenShare)}% each. The put side's top strike 23,800 holds ${d1(top1SharePE)}% of put OI.`,
      },
      tip: `A concentrated strike deserves a watchlist spot, not a prediction.`,
      visual: {
        kind: 'bars',
        title: 'Share of call OI, %',
        unit: '%',
        items: [
          { label: 'Top strike', value: Number(d1(top1ShareCE)), tone: 'gold' },
          { label: 'Top three', value: Number(d1(top3ShareCE)), tone: 'ice' },
          { label: 'Even share/strike', value: Number(d1(evenShare)), tone: 'neutral' },
        ],
      },
    },
    {
      t: 10,
      def: `OI divergence is when OI and price tell different stories. For example, price rises but OI falls, or price makes a new high while the OI at a nearby strike keeps building against it. It is a prompt to investigate, not a signal.`,
      hi: `OI divergence tab hota hai jab OI aur price alag kahani sunate hain. Jaise price badhe lekin OI gire, ya price naya high banaye jabki paas ke strike par OI uske against badhta rahe. Yeh jaanch karne ka ishara hai, signal nahi.`,
      how: `In futures, price up with OI down means shorts closing rather than fresh buying, so the rally has less new participation behind it. In options, compare the index move with OI at nearby strikes: a rally into a strike while its call OI keeps rising can mean writers are still defending, and the same rally with that OI falling can mean they are giving up. These readings come from net OI, which hides who did what, so confirm with volume, IV and the price reaction itself.`,
      eg: {
        title: 'Rally with falling futures OI (illustrative)',
        text: `NIFTY futures rise 0.5% (24,000 to 24,120) while futures OI falls 3.2%. Price up with OI down is the short-covering pattern for futures: fewer new positions behind the move. Meanwhile 24,200 CE OI adds +${f(r200.ceChg)} lots while the premium keeps holding, so call writers are still adding as the index approaches. The two readings disagree about how much conviction is behind the rise.`,
      },
      tip: `Divergence raises a question. Do not trade the question without an answer from volume, IV and price.`,
      visual: {
        kind: 'matrix',
        title: 'Does OI confirm price?',
        xLabels: ['OI rising', 'OI falling'],
        yLabels: ['Price rising', 'Price falling'],
        cells: [
          { head: 'Confirms', note: 'New positions behind the move', tone: 'gold' },
          { head: 'Diverges', note: 'Move driven by closing', tone: 'ice' },
          { head: 'Confirms', note: 'New positions behind the move', tone: 'gold' },
          { head: 'Diverges', note: 'Move driven by closing', tone: 'ice' },
        ],
      },
      calc: {
        id: 'oi-buildup',
        preset: { priceChangePct: 0.5, oiChangePct: -3.2 },
        why: 'Futures-only classifier: price up, OI down is short covering.',
      },
    },
  ],
  tools: [{ id: 'pcr', why: 'OI PCR from totals; context only.' }],
}
export default m
