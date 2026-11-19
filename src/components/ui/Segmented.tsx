import { useId, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from './cn'

export function Segmented<T extends string>({ options, value, onChange, ariaLabel, className }: { options: { value: T; label: ReactNode; tone?: 'bull' | 'bear' }[]; value: T; onChange: (v: T) => void; ariaLabel: string; className?: string }) {
  const uid = useId()
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cn('inline-flex rounded-full border border-line bg-white/[0.03] p-1', className)}>
      {options.map((o) => {
        const active = o.value === value
        return (
          <button key={o.value} type="button" role="radio" aria-checked={active} onClick={() => onChange(o.value)} className={cn('relative h-8 rounded-full px-4 text-[0.8rem] font-medium whitespace-nowrap transition-colors', active ? 'text-bg' : 'text-fg-2 hover:text-fg')}>
            {active && <motion.span layoutId={`${uid}-seg`} className={cn('absolute inset-0 rounded-full', o.tone === 'bull' ? 'bg-bull' : o.tone === 'bear' ? 'bg-bear' : 'bg-fg')} transition={{ type: 'spring', stiffness: 460, damping: 40 }} />}
            <span className="relative">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}
