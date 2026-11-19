import { useId, useMemo, useState } from 'react'
import { CheckCircle2, CircleAlert, OctagonX, RotateCcw } from 'lucide-react'
import { Badge, Button, Slider, cn } from '@/components/ui'
import { CHECKLIST, MOOD_LABELS } from '@/data/psychology'
import { fmtRupee } from '@/lib/format'
import { NumField } from '../tools/shared'

type Verdict = 'go' | 'wait' | 'stop'

export function PreTradeChecklist() {
  const uid = useId()
  const [vals, setVals] = useState<Record<string, string>>({})
  const [mood, setMood] = useState(3)
  const filled = (id: string) => (vals[id] ?? '').trim().length >= 3
  const done = CHECKLIST.filter((c) => filled(c.id)).length
  const lossOk = /\d/.test(vals.maxloss ?? '')
  const missing = CHECKLIST.filter((c) => !filled(c.id) || (c.id === 'maxloss' && !lossOk))

  const { verdict, headline, detail } = useMemo((): { verdict: Verdict; headline: string; detail: string } => {
    if (mood <= 2) return { verdict: 'stop', headline: 'No-go for now', detail: 'Your emotional state is flagged as agitated or stressed. Trades taken like this are where revenge trading and rule-breaking cluster. Step away and re-score later.' }
    if (missing.length > 0) return { verdict: 'wait', headline: 'Not ready yet', detail: `Still open: ${missing.map((m) => m.label.toLowerCase()).join(', ')}. A trade you cannot describe in full is not yet a plan.` }
    return { verdict: 'go', headline: 'Ready to proceed', detail: 'Every item is written and your state is acceptable. This confirms the plan is complete, not that the trade will work. Any trade can lose.' }
  }, [mood, missing])

  const tone = { go: 'border-gold/40 bg-gold/[0.07]', wait: 'border-line-strong bg-white/[0.03]', stop: 'border-line-strong bg-white/[0.03]' }[verdict]
  const Icon = verdict === 'go' ? CheckCircle2 : verdict === 'stop' ? OctagonX : CircleAlert

  return (
    <div className="glass-solid p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[1.4rem] font-semibold text-fg">Pre-trade checklist</h3>
          <p className="mt-1 max-w-prose text-[0.88rem] leading-relaxed text-fg-2">Write each answer before you click buy or sell. Nothing here is saved. It lives in memory and clears on refresh.</p>
        </div>
        <Badge tone="neutral">In memory only</Badge>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="flex flex-col gap-4">
          {CHECKLIST.map((c, i) => {
            const id = `${uid}-${c.id}`
            return (
              <div key={c.id}>
                <label htmlFor={id} className="flex items-baseline gap-2.5 text-[0.9rem] font-medium text-fg">
                  <span className="num text-[0.72rem] text-fg-3">{i + 1}</span>
                  {c.label}
                  {filled(c.id) && <CheckCircle2 aria-label="Completed" className="size-3.5 self-center text-gold" />}
                </label>
                <p id={`${id}-p`} className="mt-0.5 text-[0.78rem] text-fg-3">{c.prompt}</p>
                <input
                  id={id}
                  type="text"
                  value={vals[c.id] ?? ''}
                  maxLength={200}
                  placeholder={c.placeholder}
                  aria-describedby={`${id}-p`}
                  onChange={(e) => setVals((v) => ({ ...v, [c.id]: e.target.value }))}
                  className="mt-1.5 h-11 w-full rounded-xl border border-line-strong bg-white/[0.03] px-3 text-[0.92rem] text-fg outline-none transition-colors placeholder:text-fg-3 focus:border-gold/60"
                />
              </div>
            )
          })}
          <div className="mt-1 rounded-xl border border-line bg-white/[0.02] p-4">
            <Slider label="Emotional state, right now" value={mood} min={1} max={5} onChange={setMood} format={(v) => `${v} / 5`} hint="Be honest. 1 is agitated, 5 is calm and unattached to the outcome." />
            <p className="mt-2 text-[0.84rem] text-gold" aria-live="polite">{MOOD_LABELS[mood]}</p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Readiness summary">
          <div className={cn('rounded-2xl border p-5', tone)}>
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-3">Readiness</div>
            <div className="num mt-1 text-[2.6rem] leading-none text-fg">{done}<span className="text-fg-3">/{CHECKLIST.length}</span></div>
            <div role="status" aria-live="polite" className="mt-4">
              <div className="flex items-center gap-2 text-[1.05rem] font-semibold text-fg"><Icon aria-hidden className="size-5 text-gold" />{headline}</div>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-fg-2">{detail}</p>
            </div>
            <Button variant="secondary" size="sm" className="mt-4" icon={<RotateCcw aria-hidden className="size-3.5" />} onClick={() => { setVals({}); setMood(3) }}>Clear checklist</Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

interface Scenario { name: string; prob: number; payoff: number }

export function ScenarioThinking() {
  const [rows, setRows] = useState<Scenario[]>([
    { name: 'Plan works', prob: 35, payoff: 4500 },
    { name: 'Chops sideways', prob: 40, payoff: -1200 },
    { name: 'Plan is wrong', prob: 25, payoff: -3000 },
  ])
  const sum = rows.reduce((a, r) => a + r.prob, 0)
  const ok = sum === 100
  const ev = rows.reduce((a, r) => a + (r.prob / 100) * r.payoff, 0)
  const lossProb = rows.filter((r) => r.payoff < 0).reduce((a, r) => a + r.prob, 0)
  const maxAbs = Math.max(1, ...rows.map((r) => Math.abs((r.prob / 100) * r.payoff)))
  const patch = (i: number, p: Partial<Scenario>) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...p } : r)))
  const normalise = () => {
    if (sum <= 0) { setRows((rs) => rs.map((r, i) => ({ ...r, prob: i === 0 ? 34 : 33 }))); return }
    setRows((rs) => {
      const scaled = rs.map((r) => Math.round((r.prob / sum) * 100))
      const diff = 100 - scaled.reduce((a, b) => a + b, 0)
      const k = scaled.indexOf(Math.max(...scaled))
      scaled[k] += diff
      return rs.map((r, i) => ({ ...r, prob: scaled[i] }))
    })
  }
  return (
    <div className="glass-solid p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[1.4rem] font-semibold text-fg">Thinking in scenarios</h3>
          <p className="mt-1 max-w-prose text-[0.88rem] leading-relaxed text-fg-2">Replace one prediction with three outcomes. Your probabilities are subjective guesses, so the expected value is only as good as they are. It shows the shape of the bet, not a forecast.</p>
        </div>
        <Badge tone="neutral">Your inputs</Badge>
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="flex flex-col gap-4">
          {rows.map((r, i) => {
            const contrib = (r.prob / 100) * r.payoff
            return (
              <fieldset key={i} className="min-w-0 rounded-xl border border-line bg-white/[0.02] p-4">
                <legend className="px-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-3">Scenario {i + 1}</legend>
                <div className="grid gap-4 sm:grid-cols-[1fr_1fr_1fr]">
                  <ScenarioName value={r.name} onChange={(name) => patch(i, { name })} />
                  <Slider label="Probability" value={r.prob} min={0} max={100} onChange={(prob) => patch(i, { prob })} format={(v) => `${v}%`} />
                  <NumField label="Payoff" prefix="₹" value={r.payoff} step={100} min={-10000000} max={10000000} onChange={(payoff) => patch(i, { payoff })} />
                </div>
                <div className="mt-3 flex items-center gap-3" aria-hidden>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className={cn('h-full rounded-full', contrib >= 0 ? 'bg-ice' : 'bg-gold')} style={{ width: `${(Math.abs(contrib) / maxAbs) * 100}%` }} />
                  </div>
                  <span className="num w-24 shrink-0 text-right text-[0.78rem] text-fg-2">{contrib >= 0 ? '▲' : '▼'} {fmtRupee(contrib)}</span>
                </div>
              </fieldset>
            )
          })}
        </div>
        <aside aria-label="Expected value" className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line-strong bg-white/[0.03] p-5">
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-3">Expected value</div>
            <div role="status" aria-live="polite" className="mt-1">
              {ok ? (
                <>
                  <div className={cn('num text-[2.4rem] leading-none', ev >= 0 ? 'text-bull' : 'text-bear')}>{ev >= 0 ? '▲ ' : '▼ '}{fmtRupee(ev)}</div>
                  <p className="mt-3 text-[0.84rem] leading-relaxed text-fg-2">Probability of a losing outcome in your estimate: <span className="num text-fg">{lossProb}%</span>. {ev < 0 ? 'On these numbers the bet loses money on average. Change the plan or skip it.' : 'A positive number depends entirely on probabilities you cannot verify. Stress-test them lower.'}</p>
                </>
              ) : (
                <p className="mt-2 text-[0.86rem] leading-relaxed text-fg-2">Probabilities add up to <span className="num text-fg">{sum}%</span>. They must total exactly 100% to compute an expected value.</p>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 text-[0.8rem]">
              <span className="text-fg-2">Total: <span className={cn('num', ok ? 'text-fg' : 'text-gold')}>{sum}%</span></span>
              {!ok && <Button variant="secondary" size="sm" onClick={normalise}>Scale to 100%</Button>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function ScenarioName({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.82rem] text-fg-2">Name</label>
      <input id={id} type="text" value={value} maxLength={40} onChange={(e) => onChange(e.target.value)} className="h-11 w-full rounded-xl border border-line-strong bg-white/[0.03] px-3 text-[0.92rem] text-fg outline-none transition-colors focus:border-gold/60" />
    </div>
  )
}
