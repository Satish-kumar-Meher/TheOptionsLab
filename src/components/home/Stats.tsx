import { CountUp, Reveal } from '../ui'
import { counts } from '@/data/curriculum'
import { exercises } from '@/data/roadmap'
import { STRATEGIES } from '@/data/strategies'

export function Stats() {
  const tiles = [
    { n: counts.levels, label: 'Learning levels', note: `Across ${counts.parts} parts, step by step`, big: true },
    { n: counts.modules, label: 'Modules', note: 'Each with its own topic list' },
    { n: counts.topics, label: 'Study points', note: 'Individual numbered topics', fmt: true },
    { n: exercises.length, label: 'Practical exercises', note: 'On NIFTY, BANKNIFTY & SENSEX' },
    { n: STRATEGIES.length, label: 'Strategies explored', note: 'With interactive payoff diagrams' },
  ]
  return (
    <section id="stats" className="section border-y border-line bg-bg-2/50">
      <div className="container-x">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">The curriculum, by the numbers</span>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold leading-tight">Beginner to expert. Complete options analysis.</h2>
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-fg-2">From “what is a stock market?” to walk-forward testing and Monte Carlo — in one connected sequence.</p>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          {tiles.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.07} className={`bg-bg px-6 py-9 sm:px-7 ${t.big ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
              <div className={`num leading-none text-fg ${t.big ? 'text-[clamp(3.6rem,8vw,6.5rem)]' : 'text-[clamp(2.2rem,3.2vw,3rem)]'}`}>
                <CountUp to={t.n} />
              </div>
              <div className="mt-4 text-[0.95rem] font-medium text-fg">{t.label}</div>
              <div className="mt-1 text-[0.82rem] text-fg-3">{t.note}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
