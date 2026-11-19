// Validates src/data/topicLessons/m*.ts against the curriculum. Usage: node scripts/check-lessons.mjs [m06_2 ...]  (no args = all)
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
const root = path.resolve(import.meta.dirname, '..')
const cur = JSON.parse(fs.readFileSync(path.join(root, 'src/data/curriculum.generated.json'), 'utf8'))
const mods = new Map(cur.levels.flatMap((l) => l.modules).map((m) => [m.id, m]))
const KINDS = ['flow','compare','bars','ladder','payoff','candles','oi','curve','matrix','gauge','orderBook','timeline','layers']
const CALCS = ['lot-value','futures-pnl','option-pnl','breakeven','premium-split','moneyness','greeks','expected-move','pcr','oi-buildup','max-pain','order-book-impact','vwap-twap','hedge-ratio','basis-fair-value','charges','position-size','risk-reward','drawdown-recovery','pivot-levels','put-call-parity','index-weight','return-calc','spread-cost','portfolio-delta','straddle-move','kelly']
const BAD = [/lorem/i, /coming soon/i, /guaranteed profit/i, /risk[- ]free profit/i, /\bTODO\b/, /\bTBD\b/, /https?:\/\//]
export function expectedCount(m) {
  if (m.topics.length) return m.topics.length
  if (m.id === '3.4') return 10
  return (m.table?.rows.length) || (m.checklist?.items.length) || 0
}
const dir = path.join(root, 'src/data/topicLessons')
const arg = process.argv.slice(2)
const mode = arg.includes('--list')
const files = fs.readdirSync(dir).filter((f) => /^m\d\d_\d+\.ts$/.test(f)).filter((f) => !arg.filter((a) => !a.startsWith('--')).length || arg.some((a) => f.startsWith(a)))
let errs = 0, ok = 0
const err = (f, s) => { errs++; console.log(`✗ ${f}: ${s}`) }
const str = (f, w, v, min) => { if (typeof v !== 'string' || v.trim().length < min) err(f, `${w} missing/too short (<${min})`); else for (const r of BAD) if (r.test(v)) err(f, `${w} matches ${r}`) }
function visual(f, w, v) {
  if (!v) return
  if (!KINDS.includes(v.kind)) return err(f, `${w}: bad visual kind ${v.kind}`)
  if (!v.title) err(f, `${w}: visual without title`)
  const need = { flow: 'steps', compare: 'left', bars: 'items', ladder: 'strikes', payoff: 'legs', candles: 'pattern', oi: 'rows', curve: 'curve', matrix: 'cells', gauge: 'zones', orderBook: 'bids', timeline: 'events', layers: 'layers' }[v.kind]
  if (v[need] == null) err(f, `${w}: visual ${v.kind} missing ${need}`)
  if (v.kind === 'matrix' && v.cells?.length !== 4) err(f, `${w}: matrix needs 4 cells`)
  if (v.kind === 'payoff' && (v.legs.length < 1 || v.legs.length > 4)) err(f, `${w}: payoff needs 1-4 legs`)
}
for (const file of files) {
  const id = file.replace(/\.ts$/, '')
  let m
  try { m = (await import(pathToFileURL(path.join(dir, file)).href)).default } catch (e) { err(id, 'import failed: ' + e.message.split('\n')[0]); continue }
  const mid = id.replace(/^m0?(\d+)_(\d+)$/, '$1.$2')
  const cm = mods.get(mid)
  if (!cm) { err(id, `no curriculum module ${mid}`); continue }
  if (m.moduleId !== mid) err(id, `moduleId ${m.moduleId} != ${mid}`)
  str(id, 'intro', m.intro, 60); str(id, 'introHi', m.introHi, 60)
  const s = m.steps || {}
  for (const k of ['concept','conceptHi','mechanism','optionChain','psychology','assignment']) str(id, 'steps.' + k, s[k], 40)
  str(id, 'steps.example.text', s.example?.text, 60)
  visual(id, 'steps.chart', s.chart); if (!s.chart) err(id, 'steps.chart missing')
  for (const k of ['bullish','bearish','sideways']) str(id, 'scenarios.' + k, s.scenarios?.[k], 30)
  if (!Array.isArray(s.practice) || s.practice.length < 3) err(id, 'practice needs ≥3 Q&A'); else s.practice.forEach((p, i) => { str(id, `practice[${i}].q`, p.q, 10); str(id, `practice[${i}].a`, p.a, 20) })
  const n = expectedCount(cm)
  if (m.topics.length !== n) err(id, `topics ${m.topics.length} != curriculum ${n}`)
  let vis = 0, calc = 0
  m.topics.forEach((t, i) => {
    const w = `t${t.t}`
    if (t.t !== i + 1) err(id, `${w} out of order (expected ${i + 1})`)
    str(id, w + '.def', t.def, 50); str(id, w + '.hi', t.hi, 50); str(id, w + '.how', t.how, 80)
    str(id, w + '.eg.title', t.eg?.title, 5); str(id, w + '.eg.text', t.eg?.text, 60); str(id, w + '.tip', t.tip, 25)
    if (t.visual) { vis++; visual(id, w, t.visual) }
    if (t.calc) { calc++; if (!CALCS.includes(t.calc.id)) err(id, `${w}: bad calc id ${t.calc.id}`) }
    if (t.hi && !/\b(hai|hota|hoti|ho|aap|toh|ka|ki|ke|se|mein|nahi|jab|kar)\b/i.test(t.hi)) err(id, `${w}.hi does not look like Hinglish`)
  })
  for (const c of m.tools || []) if (!CALCS.includes(c.id)) err(id, `bad tools calc ${c.id}`)
  const vp = Math.round((100 * vis) / Math.max(1, n)), cp = Math.round((100 * calc) / Math.max(1, n))
  if (vp < 40) console.log(`! ${id}: only ${vp}% topics have visuals`)
  if (cp < 10) console.log(`! ${id}: only ${cp}% topics have calculators`)
  ok++
}
if (mode) {
  const have = new Set(fs.readdirSync(dir).map((f) => f.replace(/\.ts$/, '')))
  const miss = [...mods.keys()].filter((id) => { const [l, m] = id.split('.'); return !have.has(`m${l.padStart(2, '0')}_${m}`) })
  console.log(`modules with lessons: ${mods.size - miss.length}/${mods.size}; missing: ${miss.join(' ') || 'none'}`)
}
console.log(errs ? `\n${errs} problem(s) in ${files.length} file(s)` : `OK — ${ok} file(s) clean`)
process.exit(errs ? 1 : 0)
