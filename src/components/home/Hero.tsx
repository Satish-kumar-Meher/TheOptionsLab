import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { HeroCanvas } from '../three/HeroCanvas'
import { LinkButton } from '../ui'
import { counts } from '@/data/curriculum'

const chips = [
  { k: 'NIFTY 50', v: '24,012', t: '▲', tone: 'bull', pos: 'right-[6%] top-[22%]', d: 0 },
  { k: 'CE OI WALL', v: '24,100', t: '', tone: 'bear', pos: 'right-[32%] top-[14%]', d: 1.2 },
  { k: 'PE OI WALL', v: '23,900', t: '', tone: 'bull', pos: 'right-[3%] top-[52%]', d: 2.1 },
  { k: 'INDIA VIX', v: '14.2', t: '▼', tone: 'ice', pos: 'right-[38%] top-[62%]', d: 0.6 },
] as const
const toneCls = { bull: 'text-bull', bear: 'text-bear', ice: 'text-ice' }

export function Hero() {
  const reduce = useReducedMotion()
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] as const } })
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-h">
      <div className="market-grid -z-20" aria-hidden />
      <div className="absolute inset-0 -z-10" aria-hidden><HeroCanvas /></div>
      {/* legibility veil: strong on the left where the headline sits, clear on the right where candles live */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(90deg,#070a0d_0%,rgb(7_10_13/0.92)_28%,rgb(7_10_13/0.35)_55%,transparent_75%)] max-lg:bg-[linear-gradient(180deg,rgb(7_10_13/0.88)_0%,rgb(7_10_13/0.55)_45%,rgb(7_10_13/0.2)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="container-x relative flex flex-1 flex-col justify-center pb-24 pt-32 lg:pt-28">
        <div className="max-w-[46rem]">
          <motion.span {...rise(0.1)} className="eyebrow">Options &amp; option-chain academy</motion.span>
          <motion.h1 id="hero-h" {...rise(0.2)} className="mt-6 font-display text-[clamp(2.5rem,4.5vw,4.1rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            <span className="block text-gradient">Understand the Market.</span>
            <span className="block text-gradient">Decode the Options.</span>
            <span className="block text-gold-gradient">Master the Trade.</span>
          </motion.h1>
          <motion.p {...rise(0.38)} className="mt-7 max-w-[34rem] text-[clamp(1rem,1.5vw,1.18rem)] leading-relaxed text-fg-2">
            An advanced learning journey from financial market fundamentals to professional options analysis, institutional positioning and quantitative trading.
          </motion.p>
          <motion.div {...rise(0.52)} className="mt-9 flex flex-wrap items-center gap-3.5">
            <LinkButton to="/curriculum" size="lg" iconRight={<ArrowRight className="size-4" />}>Explore Curriculum</LinkButton>
            <LinkButton to="/learn/1.1" size="lg" variant="secondary">Start Learning</LinkButton>
          </motion.div>
          <motion.dl {...rise(0.68)} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {[[counts.levels, 'levels'], [counts.modules, 'modules'], [5, 'live labs']].map(([n, l]) => (
              <div key={l}><dt className="sr-only">{l}</dt><dd className="m-0"><span className="num text-[1.7rem] font-medium text-fg">{n}</span><span className="ml-1.5 text-[0.8rem] text-fg-3">{l}</span></dd></div>
            ))}
          </motion.dl>
        </div>

        {/* floating market-related chips (illustrative) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          {chips.map((c) => (
            <div key={c.k} className={`absolute ${c.pos}`}>
              <div className="glass animate-[float_7s_ease-in-out_infinite] rounded-xl px-3.5 py-2.5" style={{ animationDelay: `${c.d}s` }}>
                <div className="font-mono text-[0.62rem] tracking-[0.14em] text-fg-3">{c.k}</div>
                <div className={`num mt-0.5 text-[1.05rem] ${toneCls[c.tone]}`}>{c.v} <span className="text-[0.75rem]">{c.t}</span></div>
              </div>
            </div>
          ))}
          <p className="absolute bottom-24 right-[4%] font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-3">Illustrative values · not live data</p>
        </div>
      </div>
      <a href="#stats" aria-label="Scroll to course statistics" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-fg-3 transition-colors hover:text-fg sm:block"><ChevronDown className="size-6 animate-bounce [animation-duration:2.4s]" /></a>
    </section>
  )
}
