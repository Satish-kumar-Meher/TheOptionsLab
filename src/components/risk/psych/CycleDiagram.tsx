import { useState, type KeyboardEvent } from 'react'
import { Badge, Segmented, cn } from '@/components/ui'
import { CYCLE, EXPIRY_PHASES } from '@/data/psychology'

const W = 760
const H = 300
const PADX = 36
const PADY = 34
const px = (t: number) => PADX + t * (W - PADX * 2)
const py = (level: number) => H - PADY - (level / 100) * (H - PADY * 2)

/** Smooth curve through the phase points (Catmull-Rom converted to cubic Béziers). */
function curvePath(): string {
  const pts: [number, number][] = [[px(0), py(14)], ...CYCLE.map((c): [number, number] => [px(c.t), py(c.level)]), [px(1), py(14)]]
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}
const PATH = curvePath()

export function CycleDiagram() {
  const [sel, setSel] = useState(CYCLE[2].id)
  const [exp, setExp] = useState(EXPIRY_PHASES[2].id)
  const phase = CYCLE.find((c) => c.id === sel) ?? CYCLE[0]
  const ex = EXPIRY_PHASES.find((p) => p.id === exp) ?? EXPIRY_PHASES[0]
  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(id) }
  }
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="glass-solid min-w-0 p-4 sm:p-6 lg:col-span-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-[1.02rem] font-semibold text-fg">The fear–greed cycle</h3>
          <Badge tone="neutral">Conceptual, not data</Badge>
        </div>
        <p className="mt-1 text-[0.84rem] leading-relaxed text-fg-2">A stylised sketch of how crowd mood can swing. Select a phase to read the option-market symptoms often associated with it.</p>
        <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Fear to greed cycle with six phases" className="mt-4 h-auto w-full">
          <text x={10} y={py(100) + 4} className="fill-fg-3" fontSize="11" fontFamily="'JetBrains Mono Variable', monospace">GREED</text>
          <text x={10} y={py(0) + 4} className="fill-fg-3" fontSize="11" fontFamily="'JetBrains Mono Variable', monospace">FEAR</text>
          <line x1={PADX} x2={W - PADX} y1={py(50)} y2={py(50)} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 6" />
          <path d={PATH} fill="none" stroke="#C9A86A" strokeWidth="2.25" strokeLinecap="round" />
          {CYCLE.map((c, i) => {
            const active = c.id === sel
            const above = c.level >= 50
            return (
              <g
                key={c.id}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={`${c.name}, phase ${i + 1} of ${CYCLE.length}`}
                onClick={() => setSel(c.id)}
                onKeyDown={(e) => onKey(e, c.id)}
                className="cursor-pointer outline-offset-4"
              >
                <circle cx={px(c.t)} cy={py(c.level)} r={20} fill="transparent" />
                <circle cx={px(c.t)} cy={py(c.level)} r={active ? 9 : 6} fill={active ? '#F4F7FA' : '#111820'} stroke={active ? '#C9A86A' : '#929DA9'} strokeWidth="2" />
                <text x={px(c.t)} y={py(c.level) + (above ? -18 : 28)} textAnchor="middle" fontSize="12" fontWeight={active ? 600 : 400} className={active ? 'fill-fg' : 'fill-fg-2'}>{c.name}</text>
              </g>
            )
          })}
        </svg>
        <div className="mt-2 rounded-xl border border-line bg-white/[0.025] p-4" aria-live="polite">
          <div className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-gold">{phase.name}</div>
          <p className="mt-1.5 text-[0.92rem] leading-relaxed text-fg">{phase.summary}</p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {phase.symptoms.map((s) => (
              <li key={s} className="flex gap-2.5 text-[0.86rem] leading-relaxed text-fg-2"><span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-gold" />{s}</li>
            ))}
          </ul>
        </div>
        <p role="note" className="mt-4 rounded-xl border border-gold/25 bg-gold/[0.06] px-4 py-3 text-[0.84rem] leading-relaxed text-fg-2">
          <strong className="font-medium text-fg">Honest caveat.</strong> Crowd behaviour is probabilistic. Phases blur, last for unpredictable lengths and are clearest in hindsight. Use this as a mirror for your own emotions, not as a timing tool.
        </p>
      </div>

      <div className="min-w-0 lg:col-span-5">
        <div className="glass-solid h-full p-5 sm:p-6">
          <span className="eyebrow">Behaviour near expiry</span>
          <h3 className="mt-3 font-display text-[1.4rem] font-semibold leading-tight text-fg">Pressure rises as time runs out</h3>
          <div className="mt-4 -mx-1 overflow-x-auto px-1 pb-1">
            <Segmented
              ariaLabel="Time to expiry"
              value={exp}
              onChange={setExp}
              options={EXPIRY_PHASES.map((p) => ({ value: p.id, label: p.label }))}
            />
          </div>
          <div aria-live="polite" className="mt-5">
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-3">{ex.when}</div>
            <ul className="mt-3 flex flex-col gap-2.5">
              {ex.behaviour.map((b) => (
                <li key={b} className={cn('border-l border-gold/50 pl-3.5 text-[0.9rem] leading-relaxed text-fg')}>{b}</li>
              ))}
            </ul>
            <p className="mt-4 text-[0.84rem] leading-relaxed text-fg-2">{ex.note}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
