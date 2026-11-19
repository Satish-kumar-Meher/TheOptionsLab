import { useId } from 'react'

/** Labelled numeric input with a 44px touch target. Keeps a local-free controlled value; clamps on blur. */
export function NumField({ label, value, min, max, step = 1, onChange, hint }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; hint?: string }) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.82rem] text-fg-2">{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={Number.isFinite(value) ? value : ''}
        onChange={(e) => { const v = e.target.valueAsNumber; if (Number.isFinite(v)) onChange(v) }}
        onBlur={(e) => { const v = e.target.valueAsNumber; onChange(Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : min) }}
        aria-describedby={hint ? `${id}-h` : undefined}
        className="num h-11 w-full rounded-xl border border-line-strong bg-white/[0.03] px-3 text-[0.95rem] text-fg"
      />
      {hint && <p id={`${id}-h`} className="text-[0.74rem] leading-snug text-fg-3">{hint}</p>}
    </div>
  )
}
