import { useEffect, useId, useState, type ReactNode } from 'react'
import { cn, Reveal, SectionHeader } from '@/components/ui'

/** Numeric text field with a real label, optional prefix/suffix, and tolerant typing (empty / partial values). */
export function NumField({ label, value, onChange, min, max, step = 1, prefix, suffix, hint, className }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; prefix?: string; suffix?: string; hint?: string; className?: string
}) {
  const id = useId()
  const [text, setText] = useState(String(value))
  useEffect(() => {
    setText((t) => (Number(t) === value ? t : String(value)))
  }, [value])
  const commit = (raw: string) => {
    setText(raw)
    const n = Number(raw)
    if (raw.trim() !== '' && Number.isFinite(n)) {
      const lo = min ?? -Infinity
      const hi = max ?? Infinity
      onChange(Math.min(hi, Math.max(lo, n)))
    }
  }
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-[0.82rem] text-fg-2">{label}</label>
      <div className="flex h-11 items-center gap-2 rounded-xl border border-line-strong bg-white/[0.03] px-3 transition-colors focus-within:border-gold/60">
        {prefix && <span aria-hidden className="num text-[0.9rem] text-fg-3">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={text}
          onChange={(e) => commit(e.target.value)}
          onBlur={() => setText(String(value))}
          aria-describedby={hint ? `${id}-h` : undefined}
          className="num min-w-0 flex-1 bg-transparent text-[0.95rem] text-fg outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix && <span aria-hidden className="num text-[0.82rem] text-fg-3">{suffix}</span>}
      </div>
      {hint && <p id={`${id}-h`} className="text-[0.74rem] leading-snug text-fg-3">{hint}</p>}
    </div>
  )
}

/** Big-numeral readout used in result strips. */
export function Stat({ label, value, sub, tone = 'fg', big = false }: { label: string; value: ReactNode; sub?: ReactNode; tone?: 'fg' | 'gold' | 'ice' | 'bull' | 'bear'; big?: boolean }) {
  const color = { fg: 'text-fg', gold: 'text-gold', ice: 'text-ice', bull: 'text-bull', bear: 'text-bear' }[tone]
  return (
    <div className="min-w-0">
      <div className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">{label}</div>
      <div className={cn('num mt-1 truncate font-medium', color, big ? 'text-[clamp(1.8rem,4vw,2.6rem)] leading-none' : 'text-[1.25rem]')}>{value}</div>
      {sub && <div className="mt-1 text-[0.76rem] leading-snug text-fg-2">{sub}</div>}
    </div>
  )
}

/** Shell for one page section: anchor id, header, content. */
export function ToolSection({ id, eyebrow, title, lead, children, className }: { id: string; eyebrow: string; title: ReactNode; lead?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={cn('relative scroll-mt-28 border-b border-line py-16 sm:py-24', className)}>
      <div className="container-x">
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={<span id={`${id}-h`}>{title}</span>} lead={lead} />
        </Reveal>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  )
}

export function Note({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'ice' }) {
  return (
    <div role="note" className={cn('rounded-xl border px-4 py-3 text-[0.84rem] leading-relaxed text-fg-2', tone === 'gold' ? 'border-gold/25 bg-gold/[0.06]' : 'border-ice/25 bg-ice/[0.05]')}>
      {children}
    </div>
  )
}

export const inr = (n: number) => (Number.isFinite(n) ? `${n < 0 ? '−' : ''}₹${Math.abs(Math.round(n)).toLocaleString('en-IN')}` : '—')
