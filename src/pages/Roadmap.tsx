import { Link } from 'react-router-dom'
import { ArrowRight, Compass, ShieldAlert } from 'lucide-react'
import { Badge, GlassPanel, LinkButton, PageHeader, Reveal, SectionHeader } from '@/components/ui'
import { counts, pdfStages } from '@/data/curriculum'
import { courseStructure, ecosystemQuestions, exercises, finalAdvice, misconceptions, roadmapStages, studyMethod, ultimateQuestions } from '@/data/roadmap'

export default function Roadmap() {
  return (
    <>
      <PageHeader
        eyebrow="Roadmap & method"
        title={<>The route from <span className="text-gold-gradient">first principles</span> to a validated process.</>}
        description="The curriculum's own learning sequence, the eight practical exercises, the misconceptions to unlearn early, and the method every module follows."
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton to="/curriculum" iconRight={<ArrowRight className="size-4" />}>Open the curriculum</LinkButton>
          <LinkButton to="/learn/1.1" variant="secondary">Start Level 1</LinkButton>
        </div>
      </PageHeader>

      {/* The ecosystem, not just the Greeks */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <SectionHeader eyebrow="The objective" title="Not just CE, PE and Greeks — the whole ecosystem." lead="The curriculum is designed around understanding the market from the option writer's perspective: tracking OI changes, identifying support and resistance, detecting writer exits and anticipating intraday breakouts and breakdowns." />
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="divide-y divide-line rounded-[var(--radius-xl)] border border-line bg-surface/50">
              {ecosystemQuestions.map((q, i) => (
                <li key={q} className="flex gap-4 px-5 py-3.5 text-[0.95rem] text-fg">
                  <span className="num w-6 shrink-0 text-gold">{String(i + 1).padStart(2, '0')}</span>
                  {q}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Structure + stages */}
      <section className="section border-y border-line bg-bg-2/60">
        <div className="container-x">
          <Reveal><SectionHeader eyebrow="Course structure" title="Seven stages, twenty-five levels." lead={`${counts.levels} levels · ${counts.modules} modules · ${counts.topics.toLocaleString('en-IN')} numbered topics. The PDF groups them into ${counts.parts} parts — Part 1 holds Levels 1 and 2, and every later Part holds one Level — so this site navigates by level.`} /></Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {courseStructure.map((c, i) => (
              <Reveal key={c.spec} delay={i * 0.06}>
                <GlassPanel className="h-full">
                  <div className="num text-3xl font-semibold text-fg">{c.metric}</div>
                  <div className="mt-2 text-[0.9rem] font-medium text-fg">{c.spec}</div>
                  <p className="mt-1.5 text-[0.84rem] leading-relaxed text-fg-2">{c.focus}</p>
                </GlassPanel>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-line bg-surface/50">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <caption className="sr-only">Recommended learning sequence</caption>
                <thead>
                  <tr className="border-b border-line bg-white/[0.025] font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg-2">
                    <th scope="col" className="px-5 py-3 font-medium">Stage</th>
                    <th scope="col" className="px-5 py-3 font-medium">Levels</th>
                    <th scope="col" className="px-5 py-3 font-medium">Objective</th>
                    <th scope="col" className="px-5 py-3"><span className="sr-only">Open</span></th>
                  </tr>
                </thead>
                <tbody>
                  {roadmapStages.map((s, i) => {
                    const from = pdfStages[i]?.from ?? 1
                    return (
                      <tr key={s.stage} className="border-b border-line/70 transition-colors last:border-0 hover:bg-white/[0.025]">
                        <td className="px-5 py-4 font-display text-[0.98rem] font-medium text-fg">{s.stage}</td>
                        <td className="num px-5 py-4 text-gold">{s.levels}</td>
                        <td className="px-5 py-4 text-[0.9rem] text-fg-2">{s.objective}</td>
                        <td className="px-5 py-4 text-right"><Link to={`/curriculum/${from}`} className="inline-flex items-center gap-1.5 text-[0.84rem] text-fg hover:text-gold" aria-label={`Open ${s.stage} levels`}>Open <ArrowRight className="size-3.5" /></Link></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Exercises */}
      <section id="exercises" className="section scroll-mt-20">
        <div className="container-x">
          <Reveal><SectionHeader eyebrow="Practical work" title="Eight exercises that turn reading into skill." lead="Each exercise from the curriculum has a place to practise it here — on simulated data, so nothing depends on a live feed." /></Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-line bg-line md:grid-cols-2">
            {exercises.map((e, i) => (
              <Reveal key={e.n} delay={(i % 2) * 0.06} className="bg-bg-2">
                <div className="flex h-full flex-col gap-3 p-6 sm:p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="num text-4xl font-semibold text-gold-dim">{String(e.n).padStart(2, '0')}</span>
                    <h3 className="font-display text-lg font-semibold text-fg">{e.title}</h3>
                  </div>
                  <p className="text-[0.92rem] leading-relaxed text-fg-2">{e.text}</p>
                  <Link to={e.tool.to} className="mt-auto inline-flex items-center gap-2 pt-2 text-[0.88rem] font-medium text-fg transition-colors hover:text-gold">
                    {e.tool.label}<ArrowRight className="size-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Misconceptions */}
      <section id="misconceptions" className="section scroll-mt-20 border-y border-line bg-bg-2/60">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader eyebrow="Unlearn early" title="Eight misconceptions that quietly cost money." lead="Most of them come from treating a data point as a verdict. Each one is a reason to combine evidence instead of trusting a single number." />
            <p className="mt-6 flex items-start gap-2.5 text-[0.84rem] leading-relaxed text-fg-3"><ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />Every lab and lesson on this site is written to respect these eight points.</p>
          </Reveal>
          <ol className="flex flex-col gap-3">
            {misconceptions.map((m, i) => (
              <Reveal key={m.n} as="li" delay={i * 0.04}>
                <GlassPanel className="flex gap-5">
                  <span className="num text-2xl font-semibold leading-none text-gold-dim">{m.n}</span>
                  <div>
                    <h3 className="font-display text-[1.02rem] font-semibold text-fg">{m.title}</h3>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-fg-2">{m.text}</p>
                  </div>
                </GlassPanel>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Study method */}
      <section className="section">
        <div className="container-x">
          <Reveal><SectionHeader eyebrow="How each module teaches" title="Nine steps, from idea to assignment." lead="Every lesson follows the same method so you always know where you are." /></Reveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studyMethod.map((s, i) => (
              <Reveal key={s.k} as="li" delay={(i % 3) * 0.05}>
                <div className="h-full rounded-[var(--radius-xl)] border border-line p-5">
                  <span className="num text-[0.72rem] text-gold">STEP {String(i + 1).padStart(2, '0')}</span>
                  <div className="mt-2 font-display text-[1.05rem] font-semibold text-fg">{s.k}</div>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-fg-2">{s.v}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Ultimate questions + final advice */}
      <section className="section border-t border-line bg-bg-2/60">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeader eyebrow="The seven questions" title="Where the whole curriculum is heading." lead="By the end, every analysis should answer these before a trade is considered." />
            <ol className="mt-8 flex flex-col gap-2.5">
              {ultimateQuestions.map((q, i) => (
                <li key={q} className="flex items-center gap-4 rounded-xl border border-line px-4 py-3 text-[0.95rem] text-fg">
                  <Badge tone="gold">{i + 1}</Badge>{q}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassPanel variant="glass" className="flex h-full flex-col justify-center gap-5 p-8 sm:p-10">
              <Compass aria-hidden className="size-7 text-gold" />
              <h2 className="font-display text-2xl font-semibold leading-snug text-fg sm:text-3xl">Before you risk capital</h2>
              <p className="text-[1.02rem] leading-relaxed text-fg-2">{finalAdvice}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <LinkButton to="/risk" variant="secondary">Risk & psychology</LinkButton>
                <LinkButton to="/quant" variant="secondary">Backtesting studio</LinkButton>
              </div>
            </GlassPanel>
          </Reveal>
        </div>
      </section>
    </>
  )
}
