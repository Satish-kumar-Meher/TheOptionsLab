import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { cn } from '../ui'
import { levels, pdfStages } from '@/data/curriculum'

export function levelStatus(level: number, done: readonly string[]) {
  const l = levels[level - 1]
  const n = l.modules.filter((m) => done.includes(m.id)).length
  return { n, total: l.modules.length, state: n === 0 ? 'Not started' : n === l.modules.length ? 'Completed' : 'In progress' } as const
}

export function LevelSidebar({ active, done, className }: { active: number; done: readonly string[]; className?: string }) {
  return (
    <nav aria-label="Levels" className={cn('space-y-6', className)}>
      {pdfStages.map((s) => (
        <div key={s.id}>
          <p className="mb-2 px-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-gold">{s.label}</p>
          <ul className="space-y-0.5">
            {levels.filter((l) => l.level >= s.from && l.level <= s.to).map((l) => {
              const st = levelStatus(l.level, done)
              const isActive = l.level === active
              return (
                <li key={l.level}>
                  <Link to={`/curriculum/${l.level}`} aria-current={isActive ? 'page' : undefined} className={cn('group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors', isActive ? 'bg-white/[0.07] text-fg' : 'text-fg-2 hover:bg-white/[0.04] hover:text-fg')}>
                    <span className={cn('num grid w-7 shrink-0 place-items-center text-[0.8rem]', isActive ? 'text-gold' : 'text-fg-3')}>{String(l.level).padStart(2, '0')}</span>
                    <span className="min-w-0 flex-1 text-[0.86rem] leading-snug">{l.title}</span>
                    {st.state === 'Completed' ? <Check aria-label="Completed" className="size-3.5 shrink-0 text-gold" strokeWidth={3} /> : st.state === 'In progress' ? <span aria-label="In progress" className="size-1.5 shrink-0 rounded-full bg-gold" /> : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
