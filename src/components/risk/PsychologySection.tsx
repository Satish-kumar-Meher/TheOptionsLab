import { Reveal, SectionHeader } from '@/components/ui'
import { BiasExplorer } from './psych/BiasExplorer'
import { CycleDiagram } from './psych/CycleDiagram'
import { PreTradeChecklist, ScenarioThinking } from './psych/Mindset'

export function PsychologySection() {
  return (
    <section id="psychology" aria-labelledby="psychology-h" className="scroll-mt-28 border-b border-line py-16 sm:py-24">
      <Reveal>
        <SectionHeader
          eyebrow="Level 23 · Psychology"
          title={<span id="psychology-h">The market you have to manage first is you</span>}
          lead="Most options losses trace back to behaviour more than analysis. These are documented tendencies, not pseudo-science, and each comes with a warning sign and a counter-measure you can actually write into your rules."
        />
      </Reveal>

      <div className="mt-10 sm:mt-14">
        <Reveal><BiasExplorer /></Reveal>
      </div>

      <div className="mt-16 sm:mt-24">
        <Reveal><CycleDiagram /></Reveal>
      </div>

      <div className="mt-16 flex flex-col gap-6 sm:mt-24">
        <Reveal>
          <span className="eyebrow">Mindset in practice</span>
          <h3 className="mt-3 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-tight text-fg">Make discipline checkable</h3>
        </Reveal>
        <Reveal><PreTradeChecklist /></Reveal>
        <Reveal><ScenarioThinking /></Reveal>
      </div>
    </section>
  )
}
