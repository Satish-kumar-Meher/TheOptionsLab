import { Check as CheckIcon, Clock, X } from 'lucide-react'
import { cn } from '@/components/ui'
import type { Analysis, Check, ChecklistItem } from './analysis'

const STATE_LABEL: Record<Check, string> = { pass: 'Confirmed', fail: 'Not confirmed', wait: 'Waiting' }

function StateIcon({ state }: { state: Check }) {
  return (
    <span
      aria-hidden
      className={cn(
        'mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border',
        state === 'pass' && 'border-gold bg-gold text-bg',
        state === 'fail' && 'border-line-strong bg-white/[0.04] text-fg-2',
        state === 'wait' && 'border-dashed border-line-strong text-fg-3',
      )}
    >
      {state === 'pass' ? <CheckIcon className="size-3.5" strokeWidth={3} /> : state === 'fail' ? <X className="size-3.5" strokeWidth={2.5} /> : <Clock className="size-3" />}
    </span>
  )
}

function Row({ item }: { item: ChecklistItem }) {
  return (
    <li className="flex gap-3 py-3.5">
      <StateIcon state={item.state} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="text-[0.9rem] font-medium text-fg">{item.title}</p>
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-3">{STATE_LABEL[item.state]}</span>
        </div>
        <p className="mt-1 text-[0.8rem] leading-relaxed text-fg-2">{item.detail}</p>
        {item.sub && (
          <ul className="mt-2 grid gap-1 sm:grid-cols-3">
            {item.sub.map((s) => (
              <li key={s.label} className="rounded-lg border border-line bg-white/[0.02] px-2.5 py-1.5">
                <p className="flex items-center justify-between font-mono text-[0.68rem] text-fg-2">
                  <span>{s.label}</span>
                  <span className={cn(s.state === 'pass' ? 'text-gold' : 'text-fg-3')}>{s.state === 'pass' ? '✓ beyond' : s.state === 'fail' ? '✗ inside' : '… wait'}</span>
                </p>
                <p className="mt-0.5 text-[0.68rem] leading-snug text-fg-3">{s.detail}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export function Checklist({ a }: { a: Analysis }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gold">Live confirmation checklist</p>
          <p className="mt-2 font-display leading-none text-fg" aria-live="polite">
            <span className="num text-[2.6rem]">Evidence {a.score}</span>
            <span className="text-lg text-fg-2"> of {a.total}</span>
          </p>
        </div>
        <div className="flex gap-1.5 pb-1.5" aria-hidden>
          {a.items.map((it) => <span key={it.id} className={cn('h-2 w-5 rounded-full sm:w-6', it.state === 'pass' ? 'bg-gold' : 'bg-white/10')} />)}
        </div>
      </div>
      <ul className="mt-3 divide-y divide-line border-t border-line" aria-label={`Confirmation checks for the ${a.levelName} at ${a.level}`}>
        {a.items.map((it) => <Row key={it.id} item={it} />)}
      </ul>
    </div>
  )
}
