import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionHeader } from '../ui'
import { journey, levels } from '@/data/curriculum'

/** The learning path as five ascending candles: each stage is a taller, brighter body, with its level range as the wick. */
export function Journey() {
  return (
    <section className="section" aria-labelledby="journey-h">
      <div className="container-x">
        <Reveal><SectionHeader eyebrow="Learning journey" title={<span id="journey-h">Five stages. One rising trend.</span>} lead="Every stage assumes the one before it. Skip nothing, and each level will feel like a natural next step rather than a leap." /></Reveal>

        {/* desktop: candle staircase */}
        <ol className="mt-16 hidden grid-cols-5 items-end gap-4 lg:grid" style={{ minHeight: 440 }}>
          {journey.map((s, i) => {
            const lv = levels.filter((l) => l.level >= s.from && l.level <= s.to)
            const h = 190 + i * 52
            return (
              <Reveal as="li" key={s.id} delay={i * 0.09} className="group relative flex flex-col items-center justify-end">
                <Link to={`/curriculum/${s.from}`} className="flex w-full flex-col items-center outline-offset-8" aria-label={`${s.label}: levels ${s.from} to ${s.to}`}>
                  <span className="num mb-3 text-[0.72rem] tracking-[0.12em] text-gold">LEVELS {s.from}–{s.to}</span>
                  <span aria-hidden className="h-8 w-px bg-gradient-to-b from-transparent to-gold/70" />
                  <div className="relative w-full overflow-hidden rounded-2xl border border-bull/25 bg-[linear-gradient(100deg,#04271a_0%,#07382a_38%,#04271a_60%,#03160f_100%)] p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_30px_60px_-28px_rgb(0_229_138/0.35)] transition-transform duration-500 group-hover:-translate-y-1.5" style={{ height: h }}>
                    <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[14%] w-[7%] bg-gradient-to-b from-white/25 via-white/5 to-transparent blur-[2px]" />
                    <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bull/70 to-transparent" />
                    <div className="relative flex h-full flex-col">
                      <span className="font-mono text-[0.68rem] text-bull/80">0{i + 1}</span>
                      <h3 className="mt-1 font-display text-[1.35rem] font-semibold leading-tight">{s.label}</h3>
                      <p className="mt-2 text-[0.82rem] leading-snug text-fg-2">{s.blurb}</p>
                      <span className="mt-auto inline-flex items-center gap-1 text-[0.8rem] text-fg">{lv.length} levels <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                    </div>
                  </div>
                  <span aria-hidden className="h-6 w-px bg-gradient-to-b from-bull/50 to-transparent" />
                </Link>
              </Reveal>
            )
          })}
        </ol>

        {/* mobile / tablet: vertical rail */}
        <ol className="relative mt-12 space-y-4 lg:hidden">
          <span aria-hidden className="absolute bottom-3 left-[1.05rem] top-3 w-px bg-gradient-to-b from-gold/60 via-line-strong to-transparent" />
          {journey.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.06} className="relative pl-12">
              <span aria-hidden className="absolute left-0 top-5 grid size-9 place-items-center rounded-full border border-gold/40 bg-bg font-mono text-[0.72rem] text-gold">0{i + 1}</span>
              <Link to={`/curriculum/${s.from}`} className="block rounded-2xl border border-line bg-surface/70 p-5 transition-colors hover:border-line-strong">
                <div className="flex items-baseline justify-between gap-3"><h3 className="font-display text-xl font-semibold">{s.label}</h3><span className="num text-[0.72rem] text-gold">L{s.from}–{s.to}</span></div>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-fg-2">{s.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
