import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from './cn'

export interface TabDef {
  id: string
  label: ReactNode
  icon?: ReactNode
}
/** Accessible tablist (arrow keys / Home / End). Render the active panel yourself, with role="tabpanel". */
export function Tabs({ tabs, value, onChange, className, ariaLabel, size = 'md' }: { tabs: TabDef[]; value: string; onChange: (id: string) => void; className?: string; ariaLabel: string; size?: 'sm' | 'md' }) {
  const uid = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: KeyboardEvent, i: number) => {
    const n = tabs.length
    let j = -1
    if (e.key === 'ArrowRight') j = (i + 1) % n
    else if (e.key === 'ArrowLeft') j = (i - 1 + n) % n
    else if (e.key === 'Home') j = 0
    else if (e.key === 'End') j = n - 1
    if (j >= 0) {
      e.preventDefault()
      onChange(tabs[j].id)
      refs.current[j]?.focus()
    }
  }
  return (
    <div role="tablist" aria-label={ariaLabel} className={cn('flex gap-1 overflow-x-auto rounded-full border border-line bg-white/[0.03] p-1 [scrollbar-width:none]', className)}>
      {tabs.map((t, i) => {
        const active = t.id === value
        return (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el }}
            role="tab"
            id={`${uid}-tab-${t.id}`}
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn('relative inline-flex shrink-0 items-center gap-2 rounded-full whitespace-nowrap font-medium transition-colors', size === 'sm' ? 'h-8 px-3.5 text-[0.8rem]' : 'h-10 px-4 text-[0.88rem]', active ? 'text-bg' : 'text-fg-2 hover:text-fg')}
          >
            {active && <motion.span layoutId={`${uid}-pill`} className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 420, damping: 38 }} />}
            <span className="relative inline-flex items-center gap-2">{t.icon}{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
