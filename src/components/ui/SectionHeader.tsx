import type { ReactNode } from 'react'
import { cn } from './cn'

export function SectionHeader({ eyebrow, title, lead, align = 'left', className, actions }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; align?: 'left' | 'center'; className?: string; actions?: ReactNode }) {
  return (
    <header className={cn('flex flex-col gap-4', align === 'center' && 'items-center text-center', className)}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={cn('font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.05] text-fg', align === 'center' ? 'max-w-3xl' : 'max-w-4xl')}>{title}</h2>
      {lead && <p className={cn('max-w-2xl text-[1.02rem] leading-relaxed text-fg-2', align === 'center' && 'mx-auto')}>{lead}</p>}
      {actions}
    </header>
  )
}
