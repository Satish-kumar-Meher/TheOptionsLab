import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionHeader, cn } from '../ui'

const B = '#00E58A', R = '#F04444', G = '#C9A86A', I = '#8FB4D9'

/** Draw-on line that animates once when scrolled into view. */
function Draw({ d, stroke, w = 2, delay = 0 }: { d: string; stroke: string; w?: number; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.path d={d} fill="none" stroke={stroke} strokeWidth={w} strokeLinecap="round" initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }} />
}

const GreeksViz = () => (
  <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden>
    <path d="M0 96H240" stroke="rgba(255,255,255,.1)" />
    <Draw d="M0 94 C60 92 84 80 120 18 C156 80 180 92 240 94" stroke={G} w={2.4} />
    <Draw d="M0 92 C70 90 100 70 120 56 C150 38 190 20 240 14" stroke={B} delay={0.2} />
    <Draw d="M0 14 C60 20 90 38 120 56 C150 72 180 90 240 92" stroke={R} delay={0.35} />
    <line x1="120" x2="120" y1="10" y2="96" stroke="rgba(255,255,255,.18)" strokeDasharray="3 4" />
    <text x="126" y="14" fill={G} fontSize="8" fontFamily="monospace">Γ peaks ATM</text>
  </svg>
)
const ChainViz = () => {
  const rows = [[22, 6], [30, 10], [58, 16], [36, 26], [18, 40], [10, 62], [6, 40]]
  return (
    <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden>
      {rows.map(([ce, pe], i) => (
        <g key={i}>
          <rect x={120 - ce * 1.9} y={6 + i * 14.5} width={ce * 1.9} height="9" rx="2" fill={R} fillOpacity="0.75" />
          <rect x="122" y={6 + i * 14.5} width={pe * 1.9} height="9" rx="2" fill={B} fillOpacity="0.75" />
        </g>
      ))}
      <line x1="121" x2="121" y1="2" y2="108" stroke="rgba(255,255,255,.3)" />
    </svg>
  )
}
const OiViz = () => (
  <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden>
    {[['Long build-up', '▲ ▲', B, 0, 0], ['Short build-up', '▼ ▲', R, 1, 0], ['Short covering', '▲ ▼', B, 0, 1], ['Long unwinding', '▼ ▼', R, 1, 1]].map(([t, a, c, x, y]) => (
      <g key={t as string} transform={`translate(${(x as number) * 122},${(y as number) * 56})`}>
        <rect width="114" height="50" rx="8" fill={c as string} fillOpacity="0.08" stroke={c as string} strokeOpacity="0.4" />
        <text x="10" y="21" fill="#F4F7FA" fontSize="10" fontFamily="Inter, sans-serif">{t as string}</text>
        <text x="10" y="39" fill={c as string} fontSize="10" fontFamily="monospace">{a as string}</text>
      </g>
    ))}
  </svg>
)
const InstViz = () => (
  <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden>
    {[['FII', 78, B], ['DII', 52, I], ['Pro', 64, G], ['Retail', 36, R]].map(([n, v, c], i) => (
      <g key={n as string}>
        <text x="0" y={20 + i * 25} fill="#929DA9" fontSize="9" fontFamily="monospace">{n as string}</text>
        <rect x="40" y={11 + i * 25} width="190" height="12" rx="6" fill="rgba(255,255,255,.05)" />
        <motion.rect x="40" y={11 + i * 25} height="12" rx="6" fill={c as string} fillOpacity=".8" initial={{ width: 0 }} whileInView={{ width: (v as number) * 2.2 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }} />
      </g>
    ))}
  </svg>
)
const GammaViz = () => (
  <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden>
    <defs><linearGradient id="gm" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={G} stopOpacity=".35" /><stop offset="1" stopColor={G} stopOpacity="0" /></linearGradient></defs>
    <path d="M0 100H240" stroke="rgba(255,255,255,.1)" />
    <path d="M0 90 C90 86 150 70 190 40 C212 22 226 12 240 4 V100 H0Z" fill="url(#gm)" />
    <Draw d="M0 90 C90 86 150 70 190 40 C212 22 226 12 240 4" stroke={G} w={2.4} />
    <rect x="186" y="0" width="54" height="104" fill={R} fillOpacity="0.07" />
    <text x="190" y="102" fill="#929DA9" fontSize="8" fontFamily="monospace">2:50–3:15 PM</text>
  </svg>
)
const RiskViz = () => (
  <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden>
    <Draw d="M0 30 C30 24 50 18 70 22 C90 28 100 60 120 82 C140 100 160 70 175 52 C195 28 215 20 240 14" stroke={I} />
    <line x1="0" x2="240" y1="22" y2="22" stroke="rgba(255,255,255,.14)" strokeDasharray="3 5" />
    <rect x="98" y="22" width="44" height="64" fill={R} fillOpacity=".12" />
    <text x="100" y="98" fill={R} fontSize="9" fontFamily="monospace">▼ drawdown</text>
  </svg>
)
const QuantViz = () => (
  <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden>
    {[[0, 0.5], [1, 0.8], [2, 0.3]].map(([k]) => <Draw key={k} d={`M0 ${98 - k * 4} C50 ${90 - k * 8} 90 ${70 - k * 6} 130 ${52 - k * 5} S 200 ${28 + k * 8} 240 ${18 + k * 18}`} stroke={I} w={1} delay={k * 0.1} />)}
    <Draw d="M0 96 C50 88 90 66 130 50 S200 22 240 12" stroke={G} w={2.4} />
    <text x="4" y="12" fill="#929DA9" fontSize="8" fontFamily="monospace">Monte Carlo paths · simulated</text>
  </svg>
)

interface Card { to: string; level: string; title: string; text: string; viz: ReactNode; span: string; accent: string }
const cards: Card[] = [
  { to: '/labs/greeks', level: 'Levels 4 · 6 · 9', title: 'Option Greeks', text: 'Delta, gamma, theta, vega and rho — priced live as you move spot, time and volatility.', viz: <GreeksViz />, span: 'lg:col-span-2 lg:row-span-2', accent: 'from-gold/15' },
  { to: '/labs/option-chain', level: 'Levels 8 · 13 · 15', title: 'Option Chain Analysis', text: 'Every column, OI walls, change in OI, PCR — across a simulated session.', viz: <ChainViz />, span: 'lg:col-span-2', accent: 'from-bear/10' },
  { to: '/labs/open-interest', level: 'Levels 7 · 12', title: 'Open Interest', text: 'Build-up, unwinding and the ten scenarios — with their alternative explanations.', viz: <OiViz />, span: 'lg:col-span-2', accent: 'from-bull/10' },
  { to: '/curriculum/16', level: 'Levels 13 · 16', title: 'Institutional Trading', text: 'Writers, buyers, market makers and dealer positioning — who is on the other side.', viz: <InstViz />, span: 'lg:col-span-2', accent: 'from-ice/10' },
  { to: '/labs/expiry-gamma', level: 'Level 19', title: 'Expiry-Day Gamma', text: 'Gamma and theta into the close, two-sided buying, and the days it simply fails.', viz: <GammaViz />, span: 'lg:col-span-2', accent: 'from-gold/15' },
  { to: '/risk', level: 'Levels 22 · 23', title: 'Risk Management', text: 'Sizing, ruin, drawdown and stops — before a single live trade.', viz: <RiskViz />, span: 'lg:col-span-3', accent: 'from-bear/10' },
  { to: '/quant', level: 'Level 24', title: 'Quantitative Backtesting', text: 'Costs, walk-forward, Monte Carlo and overfitting — on synthetic data, honestly labelled.', viz: <QuantViz />, span: 'lg:col-span-3', accent: 'from-ice/10' },
]

export function FeaturedModules() {
  return (
    <section className="section border-t border-line bg-bg-2/40" aria-labelledby="mods-h">
      <div className="container-x">
        <Reveal><SectionHeader eyebrow="Featured modules" title={<span id="mods-h">Seven ideas that carry the whole course.</span>} lead="Each one is a hands-on tool, not a reading list. Open one and move something." /></Reveal>
        <div className="mt-14 grid auto-rows-[minmax(15rem,auto)] gap-4 lg:grid-cols-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.08} className={c.span}>
              <Link to={c.to} className="group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-line-strong">
                <div aria-hidden className={cn('pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-80', c.accent)} />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">{c.level}</span>
                  <ArrowUpRight className="size-4 text-fg-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </div>
                <div className={cn('relative my-4 flex-1', i === 0 ? 'min-h-40' : 'min-h-24')}>{c.viz}</div>
                <h3 className="relative font-display text-[1.25rem] font-semibold">{c.title}</h3>
                <p className="relative mt-1.5 max-w-md text-[0.88rem] leading-relaxed text-fg-2">{c.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
