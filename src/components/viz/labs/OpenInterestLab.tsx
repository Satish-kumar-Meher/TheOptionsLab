import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { GlassPanel, Tabs } from '@/components/ui'
import { OI_LIMITATIONS } from '@/data/oiScenarios'
import { Eyebrow, IntroStrip } from './parts/LabKit'
import { FuturesBuildup } from './parts/FuturesBuildup'
import { OiCreation } from './parts/OiCreation'
import { ScenarioExplorer } from './parts/ScenarioExplorer'

const TABS = [
  { id: 'futures', label: 'Futures build-up' },
  { id: 'create', label: 'How OI changes' },
  { id: 'scenarios', label: '10 OI scenarios' },
]

export default function OpenInterestLab() {
  const [tab, setTab] = useState('futures')
  return (
    <div className="flex flex-col gap-8">
      <IntroStrip>Open interest counts contracts that are still open. Learn the futures build-up grid, see how single trades create or remove OI, then work through the ten option-chain scenarios, each with alternative explanations.</IntroStrip>

      <GlassPanel className="flex flex-col gap-4 border-gold/30">
        <div className="flex items-center gap-2.5 text-gold"><AlertTriangle aria-hidden className="size-4" /><Eyebrow>Module 7.6 · OI limitations, read first</Eyebrow></div>
        <ul className="grid gap-x-8 gap-y-2.5 md:grid-cols-2">
          {OI_LIMITATIONS.map((l) => (
            <li key={l} className="flex gap-3 text-[0.88rem] leading-relaxed text-fg-2"><span aria-hidden className="mt-[0.62rem] size-1 shrink-0 rounded-full bg-gold" />{l}</li>
          ))}
        </ul>
      </GlassPanel>

      <Tabs ariaLabel="Open interest topics" tabs={TABS} value={tab} onChange={setTab} className="self-start max-w-full" />
      <div role="tabpanel" aria-label={TABS.find((t) => t.id === tab)?.label}>
        {tab === 'futures' && <FuturesBuildup />}
        {tab === 'create' && <OiCreation />}
        {tab === 'scenarios' && <ScenarioExplorer />}
      </div>
    </div>
  )
}
