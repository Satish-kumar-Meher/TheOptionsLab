import { lazy, Suspense, type ComponentType } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, ChartCandlestick, Layers, Sigma, TableProperties, Timer } from 'lucide-react'
import { PageHeader, Tabs, Reveal, GlassPanel, Disclaimer } from '@/components/ui'
import { ErrorBoundary } from '@/components/layout/ErrorBoundary'
import { PageFallback } from '@/components/layout/Layout'

interface LabDef { id: string; label: string; short: string; blurb: string; learn: string[]; levels: string; icon: ComponentType<{ className?: string }>; Component: ReturnType<typeof lazy> }
const labs: LabDef[] = [
  { id: 'greeks', label: 'Greeks Lab', short: 'Greeks', icon: Sigma, levels: 'Levels 4, 6, 9', blurb: 'Price any option with Black–Scholes and watch delta, gamma, theta, vega and rho respond as you move spot, time and volatility.', learn: ['Delta sensitivity and moneyness', 'Gamma peaking at the money', 'Theta decay accelerating into expiry', 'Vega and the IV relationship'], Component: lazy(() => import('@/components/viz/labs/GreeksLab')) },
  { id: 'option-chain', label: 'Option Chain Lab', short: 'Option chain', icon: TableProperties, levels: 'Levels 8, 13, 15', blurb: 'A simulated NIFTY option chain with every column from the curriculum. Step the snapshot forward and watch OI walls, change in OI and PCR evolve.', learn: ['CE / PE columns, bid-ask, IV, LTP', 'Highest-OI walls as potential levels', 'OI PCR and volume PCR', 'Comparing snapshots over time'], Component: lazy(() => import('@/components/viz/labs/OptionChainLab')) },
  { id: 'open-interest', label: 'Open Interest Lab', short: 'Open interest', icon: Layers, levels: 'Levels 7, 12, 15', blurb: 'Classify futures build-up, then work through the ten option-chain OI scenarios — including why each one has alternative explanations.', learn: ['Long / short build-up, covering, unwinding', 'Call and put writing versus unwinding', 'Ten OI scenarios with invalidation signals', 'Why OI alone cannot show who initiated'], Component: lazy(() => import('@/components/viz/labs/OpenInterestLab')) },
  { id: 'market-structure', label: 'Market Structure Lab', short: 'Market structure', icon: ChartCandlestick, levels: 'Levels 10, 11, 17, 18', blurb: 'Interactive price action: support and resistance, genuine versus failed breakouts, liquidity zones and a live volume profile.', learn: ['Breakouts, breakdowns and retests', 'Volume and OI confirmation', 'Value area, POC and nodes', 'Liquidity sweeps and trapped traders'], Component: lazy(() => import('@/components/viz/labs/MarketStructureLab')) },
  { id: 'expiry-gamma', label: 'Expiry-Day Gamma Lab', short: 'Expiry gamma', icon: Timer, levels: 'Level 19', blurb: 'Step through an expiry afternoon: gamma accelerating, theta bleeding, two-sided option buying with a trailing stop — and the paths where both legs lose.', learn: ['Gamma and theta into the close', 'ATM versus OTM premium behaviour', 'Two-sided buying and trailing stops', 'Why pinning days punish buyers'], Component: lazy(() => import('@/components/viz/labs/ExpiryGammaLab')) },
]

export default function Labs() {
  const { labId } = useParams()
  const navigate = useNavigate()
  const active = labs.find((l) => l.id === labId)
  if (labId && !active) return <Navigate to="/labs" replace />

  if (!active) {
    return (
      <>
        <PageHeader eyebrow="Interactive labs" title="Concepts you can move with your hands." description="Five dedicated visual tools. Each runs on clearly labelled simulated data so you can build intuition before risking a rupee.">
          <Disclaimer>Labs use Black–Scholes pricing and seeded simulated market data. They teach mechanics — they do not predict or replay real markets.</Disclaimer>
        </PageHeader>
        <section className="container-x grid gap-5 py-14 md:grid-cols-2 lg:grid-cols-3">
          {labs.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.06} className={i === 0 ? 'lg:col-span-2' : ''}>
              <Link to={`/labs/${l.id}`} className="group block h-full">
                <GlassPanel className="flex h-full flex-col gap-5 transition-[transform,border-color] duration-500 group-hover:-translate-y-1 group-hover:border-line-strong">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-white/[0.04] text-gold"><l.icon className="size-5" /></span>
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-fg-3">{l.levels}</span>
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{l.label}</h2>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-2">{l.blurb}</p>
                  </div>
                  <ul className="mt-auto grid gap-1.5 text-[0.84rem] text-fg-2 sm:grid-cols-2">
                    {l.learn.map((x) => <li key={x} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-gold" />{x}</li>)}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-fg">Open lab <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </GlassPanel>
              </Link>
            </Reveal>
          ))}
        </section>
      </>
    )
  }

  const { Component } = active
  return (
    <>
      <PageHeader eyebrow={`Lab · ${active.levels}`} title={active.label} description={active.blurb} />
      <section className="container-x py-10">
        <Tabs ariaLabel="Choose a lab" value={active.id} onChange={(id) => navigate(`/labs/${id}`)} tabs={labs.map((l) => ({ id: l.id, label: l.short, icon: <l.icon className="size-4" /> }))} className="mb-8 max-w-full" />
        <div role="tabpanel" aria-label={active.label}>
          <ErrorBoundary label={active.id}>
            <Suspense fallback={<PageFallback />}><Component /></Suspense>
          </ErrorBoundary>
        </div>
      </section>
    </>
  )
}
