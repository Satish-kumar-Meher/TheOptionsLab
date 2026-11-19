import { ArrowRight } from 'lucide-react'
import { LinkButton, Reveal, Disclaimer } from '../ui'
import { HeroFallback } from '../three/HeroFallback'
import { ultimateQuestions } from '@/data/roadmap'

export function FinalCta() {
  return (
    <section className="section" aria-labelledby="cta-h">
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-line-strong bg-surface px-6 py-16 sm:px-14 sm:py-24">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(700px_380px_at_85%_100%,rgb(201_168_106/0.16),transparent_70%)]" />
          <HeroFallback className="pointer-events-none absolute -bottom-4 right-[-6%] -z-10 hidden h-[115%] w-[70%] opacity-60 md:block" />
          <div className="max-w-2xl">
            <span className="eyebrow">Begin</span>
            <h2 id="cta-h" className="mt-5 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.02]">Start at Level 1. Finish able to test your own ideas.</h2>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-fg-2">Do not start with live buying or selling. Learn the foundations, paper-trade, and validate on historical data before risking capital.</p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <LinkButton to="/learn/1.1" size="lg" iconRight={<ArrowRight className="size-4" />}>Start learning</LinkButton>
              <LinkButton to="/curriculum" size="lg" variant="secondary">Explore curriculum</LinkButton>
            </div>
            <div className="mt-12 border-t border-line pt-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">The seven questions behind every analysis</p>
              <ul className="mt-4 flex flex-wrap gap-2">{ultimateQuestions.map((q) => <li key={q} className="rounded-full border border-line bg-bg/60 px-3.5 py-1.5 text-[0.8rem] text-fg-2">{q}</li>)}</ul>
            </div>
          </div>
        </Reveal>
        <Disclaimer className="mx-auto mt-8 max-w-3xl" />
      </div>
    </section>
  )
}
