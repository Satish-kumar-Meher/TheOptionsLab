import type { ReactNode } from 'react'
import { cn } from '@/components/ui'

/** Big-numeral tile used across the expiry lab. */
export function Stat({ label, value, sub, className }: { label: string; value: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <div className={cn('min-w-0', className)}>
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">{label}</p>
      <p className="num mt-1 text-[1.5rem] leading-none text-fg sm:text-[1.8rem]">{value}</p>
      {sub && <p className="mt-1.5 text-[0.76rem] leading-snug text-fg-2">{sub}</p>}
    </div>
  )
}

/** Profit/loss number with ▲/▼ cue (not colour alone). Green/red here mean profit/loss only. */
export function Pnl({ value, fmt, className }: { value: number; fmt: (v: number) => string; className?: string }) {
  const zero = Math.abs(value) < 0.5
  return (
    <span className={cn('num inline-flex items-center gap-1', zero ? 'text-fg-2' : value > 0 ? 'text-bull' : 'text-bear', className)}>
      <span aria-hidden className="text-[0.7em]">{zero ? '–' : value > 0 ? '▲' : '▼'}</span>
      {fmt(value)}
      <span className="sr-only">{zero ? 'flat' : value > 0 ? 'profit' : 'loss'}</span>
    </span>
  )
}
