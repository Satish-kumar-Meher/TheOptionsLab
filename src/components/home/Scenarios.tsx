import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal, SectionHeader, Segmented, SimulatedBadge } from '../ui'

type K = 'bull' | 'bear' | 'side'
const data: Record<K, { title: string; path: string; ce: string; pe: string; read: string[]; invalid: string }> = {
  bull: { title: 'Bullish breakout', path: 'M0 90 C40 88 70 80 100 76 C130 72 150 74 170 64 L200 30 L240 14', ce: 'CE OI falling at resistance ▼', pe: 'PE OI building below ▲', read: ['Close beyond resistance on several time frames', 'Volume above its recent average', 'Call writers covering or exiting, not adding', 'Retest of the broken level holds'], invalid: 'A close back below the level, with fresh CE writing, undoes the thesis.' },
  bear: { title: 'Bearish breakdown', path: 'M0 20 C40 22 70 28 100 34 C130 40 150 38 170 52 L200 76 L240 92', ce: 'CE OI building above ▲', pe: 'PE OI falling at support ▼', read: ['Close below support, not just a wick', 'Volume expansion on the break', 'Put writers exiting, call writers adding', 'Failed retest from below'], invalid: 'A reclaim of support with PE writing returning invalidates the breakdown.' },
  side: { title: 'Sideways range', path: 'M0 54 C20 30 40 30 60 52 C80 76 100 76 120 54 C140 32 160 34 180 54 C200 72 220 70 240 52', ce: 'CE OI stable at the upper wall ●', pe: 'PE OI stable at the lower wall ●', read: ['Price rejecting both edges of the range', 'Falling VIX and decaying premiums', 'Writers comfortable on both sides', 'Low-volume drift between the walls'], invalid: 'A volume-backed close outside either wall ends the range — and punishes sellers.' },
}
const stroke: Record<K, string> = { bull: '#00E58A', bear: '#F04444', side: '#8FB4D9' }

export function Scenarios() {
  const [k, setK] = useState<K>('bull')
  const d = data[k]
  return (
    <section className="section border-t border-line bg-bg-2/40" aria-labelledby="scen-h">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="Trading scenarios" title={<span id="scen-h">Three markets. Three ways to read the same chain.</span>} lead="The course trains you to ask the same questions in every regime — and to know what would prove you wrong." />
          <Segmented ariaLabel="Scenario" value={k} onChange={setK} options={[{ value: 'bull', label: '▲ Bullish', tone: 'bull' }, { value: 'bear', label: '▼ Bearish', tone: 'bear' }, { value: 'side', label: '◆ Sideways' }]} />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="glass-solid p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3"><h3 className="font-display text-xl font-semibold">{d.title}</h3><SimulatedBadge label="Illustrative" /></div>
            <svg viewBox="0 0 240 110" className="mt-6 h-56 w-full" role="img" aria-label={`${d.title} schematic price path`}>
              <g stroke="rgba(255,255,255,.07)">{[20, 45, 70, 95].map((y) => <line key={y} x1="0" x2="240" y1={y} y2={y} />)}</g>
              <line x1="0" x2="240" y1="30" y2="30" stroke="#F04444" strokeOpacity=".5" strokeDasharray="4 4" /><text x="4" y="25" fill="#F04444" fontSize="7" fontFamily="monospace">highest CE OI — potential resistance</text>
              <line x1="0" x2="240" y1="84" y2="84" stroke="#00E58A" strokeOpacity=".5" strokeDasharray="4 4" /><text x="4" y="95" fill="#00E58A" fontSize="7" fontFamily="monospace">highest PE OI — potential support</text>
              <path key={k} d={d.path} fill="none" stroke={stroke[k]} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1}><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.4s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" keyTimes="0;1" /></path>
            </svg>
            <div className="mt-4 grid gap-2 font-mono text-[0.78rem] sm:grid-cols-2"><span className="rounded-lg border border-line bg-bg/60 px-3 py-2 text-fg-2">{d.ce}</span><span className="rounded-lg border border-line bg-bg/60 px-3 py-2 text-fg-2">{d.pe}</span></div>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-[var(--radius-xl)] border border-line bg-surface/50 p-6 sm:p-8">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">Evidence to look for</p>
              <ul className="mt-4 space-y-3">{d.read.map((r) => <li key={r} className="flex gap-3 text-[0.94rem] leading-snug text-fg-2"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />{r}</li>)}</ul>
              <p className="mt-6 rounded-xl border border-line bg-bg/50 p-4 text-[0.88rem] leading-relaxed text-fg-2"><span className="font-medium text-fg">What would invalidate it? </span>{d.invalid}</p>
            </div>
            <Link to="/labs/market-structure" className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-fg hover:text-gold">Replay these in the Market Structure Lab <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
