import { useEffect, useState } from 'react'
import { PageHeader, Disclaimer, cn } from '@/components/ui'
import { ToolSection } from '@/components/risk/tools/shared'
import { SizingTool } from '@/components/risk/tools/SizingTool'
import { ExpectancyTool } from '@/components/risk/tools/ExpectancyTool'
import { RuinTool } from '@/components/risk/tools/RuinTool'
import { DrawdownTool } from '@/components/risk/tools/DrawdownTool'
import { StopLossTool } from '@/components/risk/tools/StopLossTool'
import { BuyerSellerTool } from '@/components/risk/tools/BuyerSellerTool'
import { PsychologySection } from '@/components/risk/PsychologySection'
import { JournalSection } from '@/components/risk/JournalSection'

const NAV = [
  { id: 'sizing', label: 'Position sizing' },
  { id: 'expectancy', label: 'Expectancy' },
  { id: 'ruin', label: 'Risk of ruin' },
  { id: 'drawdown', label: 'Drawdown' },
  { id: 'stops', label: 'Stop-loss' },
  { id: 'buyer-seller', label: 'Buyer vs seller' },
  { id: 'psychology', label: 'Psychology' },
  { id: 'journal', label: 'Journal' },
] as const

function SectionNav() {
  const [active, setActive] = useState<string>(NAV[0].id)
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e)
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(`[data-risk-nav="${active}"]`)
    el?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [active])
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    setActive(id)
    history.replaceState(null, '', `#${id}`)
  }
  return (
    <nav aria-label="Risk management sections" className="sticky top-16 z-30 border-b border-line bg-bg/85 backdrop-blur-xl">
      <div className="container-x">
        <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {NAV.map((n, i) => (
            <li key={n.id} className="shrink-0">
              <a
                href={`#${n.id}`}
                data-risk-nav={n.id}
                onClick={go(n.id)}
                aria-current={active === n.id ? 'true' : undefined}
                className={cn('inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-[0.84rem] whitespace-nowrap transition-colors', active === n.id ? 'bg-fg text-bg' : 'text-fg-2 hover:text-fg')}
              >
                <span className="num text-[0.68rem] opacity-60">{String(i + 1).padStart(2, '0')}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default function Risk() {
  return (
    <>
      <PageHeader
        eyebrow="Level 22 · Risk management"
        title="Professional risk management — mandatory before live trading"
        description="Six calculators and reference tools, then the psychology and journalling habits that decide whether any of it gets followed. All figures are simulations or illustrations; none is a prediction, and options can lose their entire value."
      />
      <SectionNav />
      <ToolSection id="sizing" eyebrow="01 · Position sizing" title="Size the trade from the loss you can accept" lead="Work backwards from a maximum rupee loss to a quantity, then check the result against lot size and margin.">
        <SizingTool />
      </ToolSection>
      <ToolSection id="expectancy" eyebrow="02 · Expectancy" title="A win rate alone says nothing about edge" lead="Combine win rate with average win and loss. Positive expectancy in past trades does not guarantee future results.">
        <ExpectancyTool />
      </ToolSection>
      <ToolSection id="ruin" eyebrow="03 · Risk of ruin" title="How fast does risking too much end the account?" lead="A capped, seeded Monte Carlo of repeated trades. Real markets have costs, gaps and changing edge that this does not capture.">
        <RuinTool />
      </ToolSection>
      <ToolSection id="drawdown" eyebrow="04 · Drawdown" title="Why drawdowns are harder to climb out of than to fall into" lead="Losses compound against a smaller base, so recovery needs a larger percentage gain than the fall.">
        <DrawdownTool />
      </ToolSection>
      <ToolSection id="stops" eyebrow="05 · Stop-loss management" title="Ten ways to exit, and how each one can fail" lead="No stop removes risk. Each type trades one problem for another, and any stop can be filled beyond its level.">
        <StopLossTool />
      </ToolSection>
      <ToolSection id="buyer-seller" eyebrow="06 · Buyer vs seller risk" title="Different roles, different ways to lose" lead="Buying options limits the loss to the premium; selling them can expose you to losses far larger than the premium collected.">
        <BuyerSellerTool />
      </ToolSection>
      <PsychologySection />
      <JournalSection />
      <div className="container-x py-12">
        <Disclaimer />
      </div>
    </>
  )
}
