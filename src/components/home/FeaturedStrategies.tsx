import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, SectionHeader, Badge, LinkButton } from '../ui'
import { STRATEGY_BY_SLUG, OUTLOOK_LABEL } from '@/data/strategies'
import { DEFAULT_INPUTS, sparkCurve } from '@/lib/payoff'

const slugs = ['long-call', 'bull-call-spread', 'long-straddle', 'iron-condor', 'jade-lizard', 'risk-reversal']
const tone = { bullish: 'bull', bearish: 'bear', neutral: 'neutral', volatile: 'gold', 'range-bound': 'ice' } as const

function Spark({ slug }: { slug: string }) {
  const s = STRATEGY_BY_SLUG[slug]
  const { xs, ys } = useMemo(() => sparkCurve(s.legs, { ...DEFAULT_INPUTS, unit: s.defaultUnit }, 60), [s])
  const W = 240, H = 100
  const x0 = xs[0], x1 = xs[xs.length - 1]
  const lo = Math.min(...ys, 0), hi = Math.max(...ys, 0), pad = (hi - lo) * 0.12 || 1
  const X = (x: number) => ((x - x0) / (x1 - x0)) * W
  const Y = (y: number) => H - ((y - (lo - pad)) / (hi - lo + pad * 2)) * H
  const line = xs.map((x, i) => `${i ? 'L' : 'M'}${X(x).toFixed(1)} ${Y(ys[i]).toFixed(1)}`).join('')
  const z = Y(0)
  const id = `fs-${slug}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-28 w-full" aria-hidden>
      <defs>
        <clipPath id={`${id}-p`}><rect x="0" y="0" width={W} height={z} /></clipPath>
        <clipPath id={`${id}-l`}><rect x="0" y={z} width={W} height={H - z} /></clipPath>
      </defs>
      <path d={`${line}L${W} ${z}L0 ${z}Z`} fill="#00E58A" fillOpacity=".16" clipPath={`url(#${id}-p)`} />
      <path d={`${line}L${W} ${z}L0 ${z}Z`} fill="#F04444" fillOpacity=".16" clipPath={`url(#${id}-l)`} />
      <line x1="0" x2={W} y1={z} y2={z} stroke="rgba(255,255,255,.22)" strokeDasharray="3 4" />
      <path d={line} fill="none" stroke="#F4F7FA" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function FeaturedStrategies() {
  return (
    <section className="section" aria-labelledby="strat-h">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="Featured strategies" title={<span id="strat-h">Every payoff, drawn — with the risk beside the reward.</span>} lead="Six of the structures from the strategy library. Green is profit at expiry, red is loss; each one shows its max loss before its max profit." />
          <LinkButton to="/strategies" variant="secondary">All {Object.keys(STRATEGY_BY_SLUG).length} strategies</LinkButton>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slugs.map((slug, i) => {
            const s = STRATEGY_BY_SLUG[slug]
            return (
              <Reveal key={slug} delay={(i % 3) * 0.07}>
                <Link to={`/strategies/${slug}`} className="group flex h-full flex-col gap-4 rounded-[var(--radius-xl)] border border-line bg-surface/60 p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-line-strong">
                  <div className="flex items-center justify-between"><h3 className="font-display text-[1.15rem] font-semibold">{s.name}</h3><Badge tone={tone[s.outlook]}>{OUTLOOK_LABEL[s.outlook]}</Badge></div>
                  <Spark slug={slug} />
                  <p className="text-[0.86rem] leading-relaxed text-fg-2">{s.tagline}</p>
                  <p className="mt-auto border-t border-line pt-3 font-mono text-[0.72rem] text-fg-3">Max risk: <span className="text-fg-2">{s.maxRisk}</span></p>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
