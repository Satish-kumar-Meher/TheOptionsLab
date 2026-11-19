import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { Badge, GlassPanel, cn } from '@/components/ui'
import { OI_SCENARIOS, READING_CHECKLIST, type Dir, type OiScenario } from '@/data/oiScenarios'
import { Callout, Eyebrow, Takeaways } from './LabKit'

const DirIcon = ({ d }: { d: Dir }) => (d === 'up' ? <ArrowUp aria-hidden className="size-3.5" /> : d === 'down' ? <ArrowDown aria-hidden className="size-3.5" /> : <Minus aria-hidden className="size-3.5" />)
const dirWord = (d: Dir) => (d === 'up' ? 'rises' : d === 'down' ? 'falls' : 'little change')

/** Mini visual: three bars (price, call OI, put OI) that grow or shrink from a baseline. */
function MiniVisual({ s }: { s: OiScenario }) {
  const reduce = useReducedMotion()
  const items: { label: string; d: Dir; fill: string }[] = [
    { label: 'Price', d: s.price, fill: 'bg-ice' },
    { label: 'Call OI', d: s.ce, fill: 'bg-bear/70' },
    { label: 'Put OI', d: s.pe, fill: 'bg-bull/70' },
  ]
  const h = (d: Dir) => (d === 'up' ? 86 : d === 'down' ? 34 : 58)
  return (
    <div role="img" aria-label={`Price ${dirWord(s.price)}, call OI ${dirWord(s.ce)}, put OI ${dirWord(s.pe)}`} className="grid grid-cols-3 gap-4 rounded-xl border border-line bg-bg-2/60 p-4">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center gap-2">
          <div className="relative flex h-24 w-full items-end justify-center">
            <span aria-hidden className="absolute inset-x-0 top-[42%] border-t border-dashed border-line-strong" />
            <motion.span key={s.id + it.label} className={cn('w-10 rounded-t-md', it.fill)} initial={reduce ? false : { height: 58 }} animate={{ height: h(it.d) }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-wider text-fg-2"><DirIcon d={it.d} />{it.label}</span>
        </div>
      ))}
    </div>
  )
}

const FIELDS: { k: keyof OiScenario; label: string }[] = [
  { k: 'priceMove', label: 'Price movement' }, { k: 'oiChange', label: 'OI change' }, { k: 'volume', label: 'Volume' },
  { k: 'premium', label: 'Premium movement' }, { k: 'iv', label: 'IV movement' },
]

export function ScenarioExplorer() {
  const [id, setId] = useState(OI_SCENARIOS[0].id)
  const s = OI_SCENARIOS.find((x) => x.id === id) ?? OI_SCENARIOS[0]
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setChecked((p) => { const n = new Set(p); if (n.has(i)) n.delete(i); else n.add(i); return n })
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
        <div role="radiogroup" aria-label="OI scenario" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          {OI_SCENARIOS.map((x, i) => (
            <button key={x.id} type="button" role="radio" aria-checked={x.id === id} onClick={() => setId(x.id)}
              className={cn('flex min-h-11 shrink-0 items-start gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors lg:shrink', x.id === id ? 'border-gold bg-gold/[0.08]' : 'border-line bg-surface/60 hover:border-line-strong')}>
              <span className="num mt-0.5 text-[0.78rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[0.86rem] leading-snug text-fg max-lg:whitespace-nowrap">{x.title}</span>
            </button>
          ))}
        </div>
        <GlassPanel className="flex flex-col gap-5" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2">
            <Eyebrow>Module 15.5 · scenario {OI_SCENARIOS.indexOf(s) + 1} of {OI_SCENARIOS.length}</Eyebrow>
            <Badge tone="gold">Simulated illustration</Badge>
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold text-fg">{s.title}</h3>
            <p className="mt-1 text-[0.9rem] text-fg-2">{s.short}</p>
          </div>
          <MiniVisual s={s} />
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.k}>
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-gold">{f.label}</dt>
                <dd className="mt-1 text-[0.88rem] leading-relaxed text-fg-2">{String(s[f.k])}</dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-6 sm:grid-cols-2">
            <Takeaways title="Possible participant behaviour" items={s.behaviour} />
            <Takeaways title="Alternative explanations" items={s.alternatives} />
            <Takeaways title="Confirmation signals" items={s.confirm} />
            <Takeaways title="Invalidation signals" items={s.invalidate} />
          </div>
          <Callout title="Caution">{s.caution}</Callout>
        </GlassPanel>
      </div>

      <GlassPanel className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div><Eyebrow>Module 21.6</Eyebrow><h3 className="mt-1 font-display text-xl font-semibold">Twelve questions to answer for every setup</h3></div>
          <p className="num text-[0.8rem] text-fg-2">{checked.size} / {READING_CHECKLIST.length} considered</p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {READING_CHECKLIST.map((q, i) => (
            <li key={q}>
              <label className={cn('flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2 text-[0.86rem] transition-colors', checked.has(i) ? 'border-gold/50 bg-gold/[0.06] text-fg' : 'border-line text-fg-2 hover:border-line-strong')}>
                <input type="checkbox" className="size-4 accent-[#C9A86A]" checked={checked.has(i)} onChange={() => toggle(i)} />
                <span className="num text-[0.72rem] text-fg-3">{String(i + 1).padStart(2, '0')}</span>
                <span>{q}</span>
              </label>
            </li>
          ))}
        </ul>
        <p className="text-[0.76rem] text-fg-3">Ticks are a thinking aid for this session only and are not saved.</p>
      </GlassPanel>
    </div>
  )
}
