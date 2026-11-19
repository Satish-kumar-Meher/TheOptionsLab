import { useId, useMemo, useState } from 'react'
import type { CalcId } from '@/data/topicLessonTypes'
import { cn } from '@/components/ui'
import { DEFS_A } from './defsA'
import { DEFS_B } from './defsB'
import type { CalcDef, Ctx, FieldDef, Vals } from './calcKit'

const DEFS: Record<CalcId, CalcDef> = { ...DEFS_A, ...DEFS_B }

export const CALC_IDS: CalcId[] = [
  'lot-value', 'futures-pnl', 'option-pnl', 'breakeven', 'premium-split', 'moneyness', 'greeks', 'expected-move', 'pcr', 'oi-buildup',
  'max-pain', 'order-book-impact', 'vwap-twap', 'hedge-ratio', 'basis-fair-value', 'charges', 'position-size', 'risk-reward',
  'drawdown-recovery', 'pivot-levels', 'put-call-parity', 'index-weight', 'return-calc', 'spread-cost', 'portfolio-delta', 'straddle-move', 'kelly',
]

export const CALC_META: Record<CalcId, { title: string; blurb: string }> = Object.fromEntries(
  CALC_IDS.map((id) => [id, { title: DEFS[id].title, blurb: DEFS[id].blurb }]),
) as Record<CalcId, { title: string; blurb: string }>

type PresetIn = Record<string, number | string> | undefined

function initVals(def: CalcDef, preset: PresetIn): Vals {
  const out: Vals = {}
  for (const f of def.fields) {
    const v = preset && preset[f.key] !== undefined ? preset[f.key] : def.defaults[f.key]
    out[f.key] = v === undefined ? '' : String(v)
  }
  return out
}

const inputCls =
  'h-11 w-full min-w-0 rounded-lg border border-line bg-bg-2/60 px-3 text-[0.9rem] text-fg placeholder:text-fg-3 focus:border-gold/60'

function Field({ f, value, onChange, baseId }: { f: FieldDef; value: string; onChange: (v: string) => void; baseId: string }) {
  const id = `${baseId}-${f.key}`
  const hintId = f.hint ? `${id}-hint` : undefined
  return (
    <div className={cn('min-w-0', f.kind === 'text' && 'sm:col-span-2')}>
      <label htmlFor={id} className="mb-1 block text-[0.75rem] leading-snug text-fg-2">{f.label}</label>
      {f.kind === 'enum' ? (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} aria-describedby={hintId}>
          {f.options?.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : f.kind === 'text' ? (
        <textarea id={id} rows={3} value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false} aria-describedby={hintId} className={cn(inputCls, 'num h-auto resize-y py-2 text-[0.8rem]')} />
      ) : (
        <input id={id} type="text" inputMode="decimal" autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} aria-describedby={hintId} className={cn(inputCls, 'num')} />
      )}
      {f.hint && <p id={hintId} className="mt-1 text-[0.7rem] leading-snug text-fg-3">{f.hint}</p>}
    </div>
  )
}

export function CalcPanel({ id, preset, why, compact }: { id: CalcId; preset?: Record<string, number | string>; why?: string; compact?: boolean }) {
  const def = DEFS[id]
  const baseId = useId()
  const presetKey = `${id}|${preset ? JSON.stringify(preset) : ''}`
  const [vals, setVals] = useState<Vals>(() => initVals(def, preset))
  const [seenKey, setSeenKey] = useState(presetKey)
  // Re-sync when the calculator or its preset changes (derive-state-in-render pattern).
  if (seenKey !== presetKey) {
    setSeenKey(presetKey)
    setVals(initVals(def, preset))
  }

  const ctx: Ctx = useMemo(
    () => ({
      n: (k) => {
        const t = (vals[k] ?? '').trim().replace(/,/g, '').replace(/−/g, '-')
        return t === '' ? NaN : Number(t)
      },
      s: (k) => vals[k] ?? '',
      label: (k) => def.fields.find((f) => f.key === k)?.label ?? k,
    }),
    [vals, def],
  )
  const result = useMemo(() => def.result(ctx), [def, ctx])

  const main = def.fields.filter((f) => f.group !== 'rates')
  const rates = def.fields.filter((f) => f.group === 'rates')
  const set = (k: string) => (v: string) => setVals((p) => ({ ...p, [k]: v }))

  return (
    <section aria-labelledby={`${baseId}-t`} className={cn('glass-solid min-w-0 max-w-full overflow-hidden', compact ? 'p-4' : 'p-5 sm:p-6')}>
      <header>
        <h3 id={`${baseId}-t`} className={cn('font-display font-semibold text-fg', compact ? 'text-[1rem]' : 'text-[1.2rem]')}>{def.title}</h3>
        {!compact && <p className="mt-1 text-[0.85rem] leading-relaxed text-fg-2">{def.blurb}</p>}
        {why && <p className="mt-2 border-l-2 border-gold/50 pl-3 text-[0.8rem] leading-snug text-fg-2">{why}</p>}
      </header>

      <div className={cn('mt-4 grid min-w-0 gap-x-4 gap-y-3', compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2')}>
        {main.map((f) => (
          <Field key={f.key} f={f} value={vals[f.key] ?? ''} onChange={set(f.key)} baseId={baseId} />
        ))}
      </div>

      {rates.length > 0 && (
        <fieldset className="mt-4 min-w-0 rounded-lg border border-line p-3">
          <legend className="px-1.5 text-[0.7rem] tracking-wide text-gold uppercase">Rate assumptions · editable · illustrative; verify current rates</legend>
          <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            {rates.map((f) => (
              <Field key={f.key} f={f} value={vals[f.key] ?? ''} onChange={set(f.key)} baseId={baseId} />
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-5 min-w-0 rounded-xl border border-line bg-white/[0.02] p-4" role="status" aria-live="polite">
        {result}
      </div>

      <p className="num mt-3 text-[0.72rem] leading-snug break-words text-fg-3">
        <span className="font-sans text-fg-2">Formula · </span>
        {def.formula}
      </p>
      {def.caveat && <p className="mt-2 text-[0.75rem] leading-relaxed text-fg-2">{def.caveat}</p>}
      <div className="mt-3">
        <button
          type="button"
          onClick={() => setVals(initVals(def, preset))}
          className="inline-flex h-10 items-center rounded-lg border border-line px-3 text-[0.8rem] text-fg-2 hover:border-gold/50 hover:text-fg"
        >
          Reset inputs
        </button>
      </div>
    </section>
  )
}
