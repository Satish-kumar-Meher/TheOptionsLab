import type { ReactNode } from 'react'
import { cn } from './cn'

const tones = {
  neutral: 'border-line-strong bg-white/[0.05] text-fg-2',
  bull: 'border-bull/30 bg-bull/10 text-bull',
  bear: 'border-bear/30 bg-bear/10 text-bear',
  gold: 'border-gold/30 bg-gold/10 text-gold',
  ice: 'border-ice/30 bg-ice/10 text-ice',
}
export function Badge({ tone = 'neutral', children, className, icon }: { tone?: keyof typeof tones; children: ReactNode; className?: string; icon?: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] whitespace-nowrap', tones[tone], className)}>
      {icon}
      {children}
    </span>
  )
}
/** Every simulated dataset on the site carries this so nobody mistakes it for live market data. */
export function SimulatedBadge({ label = 'Simulated data' }: { label?: string }) {
  return <Badge tone="gold">{label}</Badge>
}
