import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { GlassPanel, Segmented, cn } from '@/components/ui'
import { Callout, Eyebrow } from './LabKit'

interface Pair { id: string; buyer: string; seller: string }
interface Case { id: string; label: string; title: string; text: string; before: Pair[]; after: Pair[]; changed: string[]; note: string }
const BASE: Pair[] = [{ id: 'p1', buyer: 'A', seller: 'B' }, { id: 'p2', buyer: 'C', seller: 'D' }, { id: 'p3', buyer: 'E', seller: 'F' }]
const CASES: Case[] = [
  { id: 'c1', label: 'New + new', title: 'New buyer + new seller', text: 'G buys 1 contract from H, and neither held the contract before. A brand-new contract is created.', before: BASE, after: [...BASE, { id: 'p4', buyer: 'G', seller: 'H' }], changed: ['p4'], note: 'OI rises by 1. Volume is also 1.' },
  { id: 'c2', label: 'Buyer transfers', title: 'Existing buyer sells to a new buyer', text: 'A, who is long, sells their position to a new buyer G. Seller B is untouched and still short.', before: BASE, after: [{ id: 'p1', buyer: 'G', seller: 'B' }, BASE[1], BASE[2]], changed: ['p1'], note: 'OI is unchanged: the contract only changed hands. Volume is still 1.' },
  { id: 'c3', label: 'Seller transfers', title: 'Existing seller hands over to a new seller', text: 'D, who is short, closes by passing the position to a new seller H. Buyer C is untouched and still long.', before: BASE, after: [BASE[0], { id: 'p2', buyer: 'C', seller: 'H' }, BASE[2]], changed: ['p2'], note: 'OI is unchanged: the short side transferred. Volume is still 1.' },
  { id: 'c4', label: 'Both close', title: 'Both existing participants close', text: 'A (long) sells to B (short), who buys back. Both are exiting and the contract is extinguished.', before: BASE, after: [BASE[1], BASE[2]], changed: [], note: 'OI falls by 1. Volume is 1 even though OI went down.' },
]

function Ledger({ title, pairs, changed, highlight }: { title: string; pairs: Pair[]; changed: string[]; highlight: boolean }) {
  const reduce = useReducedMotion()
  return (
    <div className="flex flex-col gap-2.5">
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">{title} · {pairs.length} open {pairs.length === 1 ? 'contract' : 'contracts'}</p>
      <ul className="flex flex-col gap-2 min-h-[10.5rem]">
        <AnimatePresence initial={false} mode="popLayout">
          {pairs.map((p) => (
            <motion.li layout={!reduce} key={`${p.id}-${p.buyer}-${p.seller}`}
              initial={reduce ? false : { opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={cn('flex items-center gap-2 rounded-xl border px-3 py-2 text-[0.82rem]', highlight && changed.includes(p.id) ? 'border-gold bg-gold/10' : 'border-line bg-surface/70')}>
              <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-fg">{p.buyer}</span>
              <span className="text-[0.66rem] uppercase tracking-wider text-fg-3">long</span>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-line-strong via-gold/50 to-line-strong" />
              <span className="text-[0.66rem] uppercase tracking-wider text-fg-3">short</span>
              <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-fg">{p.seller}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export function OiCreation() {
  const [id, setId] = useState('c1')
  const c = CASES.find((x) => x.id === id) ?? CASES[0]
  const delta = c.after.length - c.before.length
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
      <div className="flex flex-col gap-4">
        <Eyebrow>One trade, four possible effects</Eyebrow>
        <div role="radiogroup" aria-label="Transaction case" className="flex flex-col gap-2">
          {CASES.map((x, i) => (
            <button key={x.id} type="button" role="radio" aria-checked={x.id === id} onClick={() => setId(x.id)}
              className={cn('flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors', x.id === id ? 'border-gold bg-gold/[0.08]' : 'border-line bg-surface/60 hover:border-line-strong')}>
              <span className="num text-[0.8rem] text-gold">{i + 1}</span>
              <span className="text-[0.9rem] text-fg">{x.title}</span>
            </button>
          ))}
        </div>
        <Callout tone="ice">A trade needs both a buyer and a seller. OI counts the contracts that stay open, so it only changes when a trade opens or closes a position, not when one changes hands.</Callout>
      </div>
      <GlassPanel className="flex flex-col gap-5">
        <div>
          <h3 className="font-display text-xl font-semibold text-fg">{c.title}</h3>
          <p className="mt-1.5 text-[0.9rem] leading-relaxed text-fg-2">{c.text}</p>
        </div>
        <div className="grid items-start gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <Ledger title="Before" pairs={c.before} changed={c.changed} highlight={false} />
          <ArrowRight aria-hidden className="mx-auto mt-8 size-5 rotate-90 text-gold sm:rotate-0" />
          <Ledger title="After" pairs={c.after} changed={c.changed} highlight />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-bg-2/70 px-4 py-3" aria-live="polite">
          <div>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">Open interest</p>
            <p className="num mt-1 text-3xl text-fg">
              {c.before.length} <span aria-hidden className="text-fg-3">→</span> <motion.span key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="inline-block text-gold">{c.after.length}</motion.span>
              <span className="ml-3 text-base text-fg-2">{delta === 0 ? 'no change' : `${delta > 0 ? '▲ +' : '▼ −'}${Math.abs(delta)}`}</span>
            </p>
          </div>
          <p className="max-w-xs text-[0.84rem] leading-relaxed text-fg-2">{c.note}</p>
        </div>
        <p className="sr-only">Open interest goes from {c.before.length} to {c.after.length} contracts.</p>
        <Segmented ariaLabel="Jump to case" value={c.id} onChange={setId} options={CASES.map((x) => ({ value: x.id, label: x.label }))} className="self-start max-w-full overflow-x-auto" />
      </GlassPanel>
    </div>
  )
}
