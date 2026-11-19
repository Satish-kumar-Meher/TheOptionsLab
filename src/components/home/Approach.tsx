import { Reveal, SectionHeader } from '../ui'
import { studyMethod } from '@/data/roadmap'

export function Approach() {
  return (
    <section className="section" aria-labelledby="approach-h">
      <div className="container-x">
        <Reveal><SectionHeader eyebrow="Practical learning approach" title={<span id="approach-h">Nine steps inside every module.</span>} lead="Each module is built the same way, so you always know where you are — from the plain idea to an assignment you do before moving on." /></Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {studyMethod.map((s, i) => (
            <Reveal as="li" key={s.k} delay={(i % 3) * 0.06} className="group relative bg-bg p-7 transition-colors hover:bg-surface">
              <span className="num text-[0.75rem] text-fg-3">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 font-display text-[1.3rem] font-semibold">{s.k}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-2">{s.v}</p>
              <span aria-hidden className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
