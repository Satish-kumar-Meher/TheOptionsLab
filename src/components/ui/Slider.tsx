import { useId, type CSSProperties } from 'react'

export function Slider({ label, value, min, max, step = 1, onChange, format, hint }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; format?: (v: number) => string; hint?: string }) {
  const id = useId()
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.82rem] text-fg-2">{label}</label>
        <output htmlFor={id} className="num text-[0.9rem] text-fg">{format ? format(value) : value}</output>
      </div>
      <input id={id} className="slider" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ '--fill': `${fill}%` } as CSSProperties} aria-describedby={hint ? `${id}-h` : undefined} />
      {hint && <p id={`${id}-h`} className="text-[0.74rem] leading-snug text-fg-3">{hint}</p>}
    </div>
  )
}
