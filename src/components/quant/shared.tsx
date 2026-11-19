import type { ReactNode } from 'react'
import { SectionHeader, cn } from '@/components/ui'

export const CAPITAL = 500000

export function QSection({ id, eyebrow, title, lead, children, tint }: { id: string; eyebrow: string; title: ReactNode; lead?: ReactNode; children: ReactNode; tint?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={cn('scroll-mt-32 border-b border-line py-16 sm:py-24', tint && 'bg-white/[0.012]')}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} title={<span id={`${id}-h`}>{title}</span>} lead={lead} />
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  )
}

/** Terminal-style stat cell. `tone` is for direction only (profit/loss). */
export function Stat({ label, value, sub, tone, tip }: { label: ReactNode; value: ReactNode; sub?: ReactNode; tone?: 'bull' | 'bear' | 'neutral'; tip?: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 bg-surface p-4 sm:p-5">
      <div className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg-2">{label}{tip}</div>
      <div className={cn('num text-[1.55rem] font-medium leading-none sm:text-[1.8rem]', tone === 'bull' && 'text-bull', tone === 'bear' && 'text-bear', (!tone || tone === 'neutral') && 'text-fg')}>{value}</div>
      {sub && <div className="text-[0.74rem] leading-snug text-fg-3">{sub}</div>}
    </div>
  )
}

export function SyntheticBanner({ children }: { children?: ReactNode }) {
  return (
    <p role="note" className="flex items-start gap-3 rounded-[var(--radius-xl)] border border-gold/40 bg-gold/[0.07] px-4 py-3 text-[0.86rem] font-semibold leading-snug text-gold">
      <span aria-hidden className="mt-0.5 font-mono text-[0.7rem]">◆</span>
      <span>{children ?? 'Synthetic trades — not the performance of any real strategy.'}</span>
    </p>
  )
}

/** Visually-hidden text alternative for charts. */
export function ChartSummary({ children }: { children: ReactNode }) {
  return <p className="sr-only">{children}</p>
}

export const sign = (n: number) => (n > 0 ? 'bull' : n < 0 ? 'bear' : 'neutral') as 'bull' | 'bear' | 'neutral'
