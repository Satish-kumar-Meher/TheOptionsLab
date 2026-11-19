import { Reveal } from '../ui'
import { ecosystemQuestions } from '@/data/roadmap'

const points = [
  { h: 'The whole ecosystem, not just CE, PE and Greeks', t: 'Who participates, why they enter, how writers manage risk, how big players hedge — the market from the option writer’s point of view.' },
  { h: 'Honest about what the data cannot tell you', t: 'Eight common misconceptions are taught explicitly: OI alone can’t show who initiated, a wall isn’t a guarantee, VIX isn’t direction, Max Pain isn’t a target.' },
  { h: 'Analysis that ends in validation', t: 'Every idea is meant to be written as a rule, backtested with costs and slippage, and tested out-of-sample before capital is risked.' },
  { h: 'Built around Indian index options', t: 'NIFTY, BANKNIFTY and SENSEX — expiries, lot sizes, participant-wise data and India VIX are part of the lesson, not an afterthought.' },
]

export function WhyDifferent() {
  return (
    <section className="section" aria-labelledby="why-h">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">Why this curriculum is different</span>
          <h2 id="why-h" className="mt-5 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.04]">Most courses teach a strategy. This one teaches the market that makes it work — or fail.</h2>
          <div className="mt-10 rounded-[var(--radius-xl)] border border-line bg-surface/60 p-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">Nine questions it answers</p>
            <ol className="mt-4 space-y-2.5">
              {ecosystemQuestions.map((q, i) => (
                <li key={q} className="flex gap-3 text-[0.9rem] leading-snug text-fg-2"><span className="num mt-px w-5 shrink-0 text-fg-3">{String(i + 1).padStart(2, '0')}</span>{q}</li>
              ))}
            </ol>
          </div>
        </Reveal>
        <ul className="flex flex-col">
          {points.map((p, i) => (
            <Reveal as="li" key={p.h} delay={i * 0.06} className="border-t border-line py-9 first:border-t-0 first:pt-0">
              <span className="num text-[0.78rem] text-gold">0{i + 1}</span>
              <h3 className="mt-2 font-display text-[1.5rem] font-semibold leading-snug">{p.h}</h3>
              <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-fg-2">{p.t}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
