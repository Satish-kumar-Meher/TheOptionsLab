import { Link } from 'react-router-dom'
import { BookOpen, Check } from 'lucide-react'
import { Badge, Button, Tex, cn } from '../ui'
import type { CurriculumModule } from '@/data/curriculum'
import { lessons } from '@/data/lessons'

export function ModuleHeader({ m, done }: { m: CurriculumModule; done: boolean }) {
  const deep = !!lessons[m.id]
  return (
    <span className="flex min-w-0 items-center gap-3.5">
      <span className={cn('grid size-6 shrink-0 place-items-center rounded-full border transition-colors', done ? 'border-gold bg-gold text-bg' : 'border-line-strong text-transparent')} aria-hidden><Check className="size-3.5" strokeWidth={3} /></span>
      <span className="num w-10 shrink-0 text-[0.8rem] text-gold">{m.id}</span>
      <span className="min-w-0 flex-1 truncate font-display text-[1.02rem] font-medium text-fg sm:whitespace-normal">{m.title}</span>
      {deep && <Badge tone="gold" className="hidden sm:inline-flex">Full lesson</Badge>}
      <span className="sr-only">{done ? 'Completed' : 'Not completed'}</span>
    </span>
  )
}
export function ModuleMeta({ m }: { m: CurriculumModule }) {
  const n = m.topics.length
  return <span className="num hidden text-[0.74rem] text-fg-3 sm:inline">{n ? `${n} topics` : 'framework'}</span>
}

export function ModuleBody({ m, done, onToggle }: { m: CurriculumModule; done: boolean; onToggle: () => void }) {
  const deep = !!lessons[m.id]
  return (
    <div className="space-y-5 pt-1">
      {m.intro && <p className="text-[0.92rem] leading-relaxed text-fg-2">{m.intro}</p>}
      {m.formula && <div className="rounded-xl border border-gold/25 bg-gold/[0.06] px-4 py-3 text-center font-mono text-[0.92rem] text-fg">{m.formula}</div>}
      {m.table && (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[0.86rem]">
            <thead><tr className="border-b border-line bg-white/[0.03]">{m.table.headers.map((h) => <th key={h} scope="col" className="px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-2">{h}</th>)}</tr></thead>
            <tbody>{m.table.rows.map((r, i) => <tr key={i} className="border-b border-line/60 last:border-0">{r.map((c, j) => <td key={j} className={cn('px-4 py-2.5', j === 0 ? 'font-medium text-fg' : 'text-fg-2')}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
      {m.topics.length > 0 && (
        <ol className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
          {m.topics.map((t, i) => (
            <li key={i} className="flex gap-3 py-1 text-[0.9rem] leading-snug text-fg-2"><span className="num w-6 shrink-0 text-right text-[0.74rem] text-fg-3">{i + 1}.</span><span>{t}</span></li>
          ))}
        </ol>
      )}
      {m.checklist && (
        <div className="rounded-xl border border-line bg-bg/50 p-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-gold">{m.checklist.title}</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">{m.checklist.items.map((c) => <li key={c} className="flex gap-2.5 text-[0.88rem] text-fg-2"><span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-gold" />{c}</li>)}</ul>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <Link to={`/learn/${m.id}`} className="inline-flex h-9 items-center gap-2 rounded-full bg-fg px-4 text-[0.82rem] font-medium text-bg transition-transform hover:-translate-y-0.5"><BookOpen className="size-4" />{deep ? 'Open full lesson' : 'Open module'}</Link>
        <Button size="sm" variant="secondary" aria-pressed={done} onClick={onToggle} icon={<Check className="size-4" />}>{done ? 'Completed — undo' : 'Mark complete'}</Button>
      </div>
    </div>
  )
}
export { Tex }
