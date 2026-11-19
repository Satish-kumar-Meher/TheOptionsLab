import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { AlertTriangle, ShieldCheck } from 'lucide-react'
import { Badge, cn } from '@/components/ui'
import { BIASES } from '@/data/psychology'

export function BiasExplorer() {
  const [id, setId] = useState(BIASES[0].id)
  const reduce = useReducedMotion()
  const bias = BIASES.find((b) => b.id === id) ?? BIASES[0]
  return (
    <div className="grid gap-5 lg:grid-cols-[17rem_1fr] lg:gap-8">
      <div role="group" aria-label="Choose a bias" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-1">
        {BIASES.map((b, i) => {
          const active = b.id === id
          return (
            <button
              key={b.id}
              type="button"
              aria-pressed={active}
              onClick={() => setId(b.id)}
              className={cn(
                'flex min-h-11 items-center gap-3 rounded-xl border px-3.5 py-2 text-left text-[0.9rem] transition-colors',
                active ? 'border-gold/50 bg-gold/[0.08] text-fg' : 'border-line bg-white/[0.02] text-fg-2 hover:border-line-strong hover:text-fg',
              )}
            >
              <span className="num w-5 shrink-0 text-[0.72rem] text-fg-3">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-medium">{b.name}</span>
            </button>
          )
        })}
      </div>

      <div className="glass-solid min-w-0 p-5 sm:p-8" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={bias.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge tone="gold">In options trading</Badge>
            <h3 className="mt-4 font-display text-[clamp(1.6rem,3.4vw,2.3rem)] font-semibold leading-tight text-fg">{bias.name}</h3>
            <p className="mt-2 max-w-prose text-[1rem] leading-relaxed text-fg-2">{bias.gist}</p>

            <h4 className="mt-7 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-3">How it can show up</h4>
            <ul className="mt-3 flex flex-col gap-2.5">
              {bias.options.map((o) => (
                <li key={o} className="flex gap-3 text-[0.94rem] leading-relaxed text-fg">
                  <span aria-hidden className="mt-[0.62em] h-px w-4 shrink-0 bg-gold" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-white/[0.025] p-4">
                <div className="flex items-center gap-2 text-[0.78rem] font-medium text-gold"><AlertTriangle aria-hidden className="size-4" />Warning sign</div>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-fg-2">{bias.warning}</p>
              </div>
              <div className="rounded-xl border border-line bg-white/[0.025] p-4">
                <div className="flex items-center gap-2 text-[0.78rem] font-medium text-ice"><ShieldCheck aria-hidden className="size-4" />Counter-measure</div>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-fg-2">{bias.counter}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
