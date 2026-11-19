import type { ReactNode } from 'react'
import { SimulatedBadge, cn } from '@/components/ui'

/** Compact intro strip shown at the top of every lab: 1–2 sentences plus the simulated-data badge. */
export function IntroStrip({ children, badge = 'Simulated data' }: { children: ReactNode; badge?: string }) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <p className="max-w-3xl text-[0.94rem] leading-relaxed text-fg-2">{children}</p>
      <div className="shrink-0"><SimulatedBadge label={badge} /></div>
    </div>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('font-mono text-[0.68rem] uppercase tracking-[0.14em] text-gold', className)}>{children}</p>
}

/** ▲ / ▼ sign cue with a screen-reader word. Neutral colour on purpose: a Greek's sign is not market direction. */
export function SignCue({ value, className }: { value: number; className?: string }) {
  const up = value > 0
  const flat = Math.abs(value) < 1e-12
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span aria-hidden>{flat ? '–' : up ? '▲' : '▼'}</span>
      <span className="sr-only">{flat ? 'zero' : up ? 'positive' : 'negative'}</span>
    </span>
  )
}

/** Plain-language takeaway list that sits beside a chart. */
export function Takeaways({ title = 'What to take from this', items }: { title?: string; items: ReactNode[] }) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>{title}</Eyebrow>
      <ul className="flex flex-col gap-3">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3 text-[0.88rem] leading-relaxed text-fg-2">
            <span aria-hidden className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-gold" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Callout({ title, children, tone = 'gold', className }: { title?: ReactNode; children: ReactNode; tone?: 'gold' | 'ice'; className?: string }) {
  return (
    <div className={cn('rounded-xl border px-4 py-3.5 text-[0.86rem] leading-relaxed text-fg-2', tone === 'gold' ? 'border-gold/25 bg-gold/[0.06]' : 'border-ice/25 bg-ice/[0.06]', className)} role="note">
      {title && <p className={cn('mb-1 font-medium', tone === 'gold' ? 'text-gold' : 'text-ice')}>{title}</p>}
      {children}
    </div>
  )
}
