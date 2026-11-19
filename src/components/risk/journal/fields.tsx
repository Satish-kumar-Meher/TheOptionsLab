import { useId, type ReactNode } from 'react'
import { cn } from '@/components/ui'

const control =
  'w-full rounded-xl border bg-white/[0.03] px-3 text-[0.92rem] text-fg outline-none transition-colors placeholder:text-fg-3 focus:border-gold/60'

interface Base {
  label: string
  error?: string
  hint?: string
  className?: string
}

function Shell({ id, label, error, hint, className, children }: Base & { id: string; children: ReactNode }) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-[0.82rem] text-fg-2">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-d`} className="text-[0.74rem] leading-snug text-fg-3">{hint}</p>}
      {error && <p id={`${id}-d`} className="text-[0.76rem] leading-snug text-gold">{error}</p>}
    </div>
  )
}

export function TextField({ label, error, hint, className, value, onChange, onBlur, type = 'text', inputMode, maxLength, placeholder, step }: Base & {
  value: string; onChange: (v: string) => void; onBlur?: () => void; type?: 'text' | 'number' | 'date' | 'datetime-local'; inputMode?: 'decimal' | 'numeric'; maxLength?: number; placeholder?: string; step?: string
}) {
  const id = useId()
  return (
    <Shell id={id} label={label} error={error} hint={hint} className={className}>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        step={step}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-d` : undefined}
        className={cn(control, 'h-11', type === 'number' && 'num', error ? 'border-gold' : 'border-line-strong')}
      />
    </Shell>
  )
}

export function SelectField({ label, error, hint, className, value, onChange, onBlur, options }: Base & {
  value: string; onChange: (v: string) => void; onBlur?: () => void; options: { value: string; label: string }[]
}) {
  const id = useId()
  return (
    <Shell id={id} label={label} error={error} hint={hint} className={className}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-d` : undefined}
        className={cn(control, 'h-11 appearance-none bg-[length:14px] pr-8', error ? 'border-gold' : 'border-line-strong')}
      >
        {options.map((o) => <option key={o.value} value={o.value} className="bg-surface text-fg">{o.label}</option>)}
      </select>
    </Shell>
  )
}

export function AreaField({ label, error, hint, className, value, onChange, onBlur, maxLength, rows = 2, placeholder }: Base & {
  value: string; onChange: (v: string) => void; onBlur?: () => void; maxLength: number; rows?: number; placeholder?: string
}) {
  const id = useId()
  return (
    <Shell id={id} label={label} error={error} hint={hint} className={className}>
      <textarea
        id={id}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-d` : undefined}
        className={cn(control, 'resize-y py-2.5 leading-relaxed', error ? 'border-gold' : 'border-line-strong')}
      />
    </Shell>
  )
}
