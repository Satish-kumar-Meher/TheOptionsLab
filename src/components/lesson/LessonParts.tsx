import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { Badge, DataTable, SimulatedBadge, Tex, cn } from '../ui'
import type { ChainExample, Concept, FormulaBlock, PracticeQuestion, Scenario, WorkedExample } from '@/data/lessonTypes'
import { fmtCompactIN, fmtSigned } from '@/lib/format'

export function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0">
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={`${id}-h`} className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function Objectives({ items }: { items: string[] }) {
  return <ul className="space-y-3">{items.map((o) => <li key={o} className="flex gap-3.5 text-[1rem] leading-relaxed text-fg-2"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-gold" />{o}</li>)}</ul>
}

export function Concepts({ items }: { items: Concept[] }) {
  return <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">{items.map((c) => <div key={c.term} className="bg-surface p-5"><dt className="font-display text-[1.02rem] font-semibold text-fg">{c.term}</dt><dd className="mt-1.5 text-[0.9rem] leading-relaxed text-fg-2">{c.definition}</dd></div>)}</dl>
}

export function Formulas({ items }: { items: FormulaBlock[] }) {
  return (
    <div className="space-y-4">
      {items.map((f) => (
        <figure key={f.label} className="m-0 rounded-2xl border border-gold/20 bg-[linear-gradient(180deg,rgb(201_168_106/0.07),transparent)] p-5 sm:p-6">
          <figcaption className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-gold">{f.label}</figcaption>
          <Tex block className="mt-3 text-[1.15rem]">{f.tex}</Tex>
          {f.note && <p className="mt-2 text-[0.84rem] leading-relaxed text-fg-2">{f.note}</p>}
        </figure>
      ))}
    </div>
  )
}

export function Examples({ items }: { items: WorkedExample[] }) {
  return (
    <div className="space-y-6">
      {items.map((e, i) => (
        <article key={e.title} className="overflow-hidden rounded-2xl border border-line bg-surface/70">
          <header className="flex items-center justify-between gap-3 border-b border-line bg-white/[0.025] px-5 py-3.5"><h3 className="font-display text-[1.05rem] font-semibold"><span className="num mr-2 text-gold">Ex {i + 1}</span>{e.title}</h3><SimulatedBadge label="Illustrative numbers" /></header>
          <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[0.8fr_1.4fr]">
            <div><p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">Given</p><ul className="mt-3 space-y-1.5">{e.given.map((g) => <li key={g} className="num text-[0.86rem] text-fg">{g}</li>)}</ul></div>
            <div><p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">Working</p><ol className="mt-3 space-y-2">{e.steps.map((s, j) => <li key={j} className="flex gap-3 text-[0.9rem] leading-relaxed text-fg-2"><span className="num mt-px w-5 shrink-0 text-fg-3">{j + 1}</span><span>{s}</span></li>)}</ol></div>
          </div>
          <p className="border-t border-line bg-gold/[0.05] px-5 py-3.5 text-[0.9rem] leading-relaxed text-fg"><span className="font-medium text-gold">Takeaway · </span>{e.takeaway}</p>
        </article>
      ))}
    </div>
  )
}

export function Scenarios({ s }: { s: { bullish: Scenario; bearish: Scenario; sideways: Scenario } }) {
  const items = [
    { k: 'Bullish', glyph: '▲', cls: 'border-bull/25 text-bull', t: s.bullish.text },
    { k: 'Bearish', glyph: '▼', cls: 'border-bear/25 text-bear', t: s.bearish.text },
    { k: 'Sideways', glyph: '◆', cls: 'border-ice/25 text-ice', t: s.sideways.text },
  ]
  return <div className="grid gap-4 md:grid-cols-3">{items.map((i) => <div key={i.k} className={cn('rounded-2xl border bg-surface/60 p-5', i.cls)}><p className="font-mono text-[0.72rem] uppercase tracking-[0.12em]">{i.glyph} {i.k}</p><p className="mt-3 text-[0.9rem] leading-relaxed text-fg-2">{i.t}</p></div>)}</div>
}

export function Chain({ c }: { c: ChainExample }) {
  type Row = ChainExample['rows'][number]
  const chg = (v: number) => <span className={v > 0 ? 'text-bear' : v < 0 ? 'text-bull' : 'text-fg-3'}>{v > 0 ? '▲' : v < 0 ? '▼' : ''} {fmtSigned(v / 1000, 0)}K</span>
  const pchg = (v: number) => <span className={v > 0 ? 'text-bull' : v < 0 ? 'text-bear' : 'text-fg-3'}>{v > 0 ? '▲' : v < 0 ? '▼' : ''} {fmtSigned(v / 1000, 0)}K</span>
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3"><p className="text-[0.9rem] text-fg-2">{c.caption}</p><SimulatedBadge /></div>
      <DataTable<Row> dense caption={c.caption} rows={c.rows} rowKey={(r) => r.strike} columns={[
        { key: 'ceOI', header: 'CE OI', mono: true, align: 'right', render: (r) => fmtCompactIN(r.ceOI) },
        { key: 'ceChg', header: 'CE ΔOI', mono: true, align: 'right', render: (r) => chg(r.ceChg) },
        { key: 'ceLTP', header: 'CE LTP', mono: true, align: 'right', render: (r) => r.ceLTP.toFixed(1) },
        { key: 'strike', header: 'Strike', mono: true, align: 'center', className: 'bg-white/[0.04] font-medium text-fg', render: (r) => r.strike.toLocaleString('en-IN') },
        { key: 'peLTP', header: 'PE LTP', mono: true, align: 'right', render: (r) => r.peLTP.toFixed(1) },
        { key: 'peChg', header: 'PE ΔOI', mono: true, align: 'right', render: (r) => pchg(r.peChg) },
        { key: 'peOI', header: 'PE OI', mono: true, align: 'right', render: (r) => fmtCompactIN(r.peOI) },
      ]} />
      <ul className="space-y-2">{c.reading.map((r) => <li key={r} className="flex gap-3 text-[0.9rem] leading-relaxed text-fg-2"><span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-gold" />{r}</li>)}</ul>
    </div>
  )
}

export function Pitfalls({ items }: { items: string[] }) {
  return <ul className="space-y-3">{items.map((p) => <li key={p} className="flex gap-4 rounded-2xl border border-bear/20 bg-bear/[0.045] p-4 text-[0.92rem] leading-relaxed text-fg-2"><span aria-hidden className="mt-0.5 text-bear">⚠</span>{p}</li>)}</ul>
}

export function Practice({ items }: { items: PracticeQuestion[] }) {
  const [open, setOpen] = useState<number[]>([])
  return (
    <ol className="space-y-3">
      {items.map((p, i) => {
        const o = open.includes(i)
        return (
          <li key={i} className="overflow-hidden rounded-2xl border border-line bg-surface/60">
            <div className="flex gap-4 p-5"><span className="num text-gold">Q{i + 1}</span><p className="text-[0.96rem] leading-relaxed text-fg">{p.q}</p></div>
            <button type="button" aria-expanded={o} onClick={() => setOpen((x) => (o ? x.filter((k) => k !== i) : [...x, i]))} className="flex w-full items-center justify-between border-t border-line px-5 py-3 text-left text-[0.84rem] text-fg-2 transition-colors hover:bg-white/[0.04] hover:text-fg">{o ? 'Hide answer' : 'Think first — then reveal the answer'}<ChevronDown className={cn('size-4 transition-transform', o && 'rotate-180')} /></button>
            {o && <div className="border-t border-line bg-gold/[0.05] px-5 py-4 text-[0.9rem] leading-relaxed text-fg-2"><Badge tone="gold" className="mb-2">Answer</Badge><p className="whitespace-pre-line">{p.a}</p></div>}
          </li>
        )
      })}
    </ol>
  )
}
