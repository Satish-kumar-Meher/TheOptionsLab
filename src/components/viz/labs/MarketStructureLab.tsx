import { useMemo, useState } from 'react'
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react'
import { Accordion, Button, GlassPanel, Segmented, Slider, cn } from '@/components/ui'
import { CandleChart, type ChartMarker, type ChartZone } from '@/components/viz/CandleChart'
import { fmtIN } from '@/lib/format'
import { Callout, Eyebrow, IntroStrip } from './parts/LabKit'
import { analyse, computeSwings } from './parts-ms/analysis'
import { Checklist } from './parts-ms/Checklist'
import { ProfilePanel } from './parts-ms/ProfilePanel'
import { BARS, RESISTANCE, SCENARIOS, SUPPORT, barTime, buildSession, type ScenarioId } from './parts-ms/session'
import { useReplay } from './parts-ms/useReplay'

const START_VIS = 36
const LEVELS = [
  { price: RESISTANCE, label: 'Resistance · highest CE OI', tone: 'gold' as const },
  { price: SUPPORT, label: 'Support · PE OI', tone: 'ice' as const },
]

export default function MarketStructureLab() {
  const [scenario, setScenario] = useState<ScenarioId>('false')
  const [showSwings, setShowSwings] = useState(true)
  const [showVolume, setShowVolume] = useState(true)
  const { vis, playing, toggle, seek, step, reset } = useReplay(BARS, START_VIS)

  const session = useMemo(() => buildSession(scenario), [scenario])
  const a = useMemo(() => analyse(session, vis), [session, vis])
  const swings = useMemo(() => computeSwings(session.candles, vis, 4), [session, vis])
  const def = session.def

  const markers = useMemo<ChartMarker[]>(() => {
    const m: ChartMarker[] = a.events.map((e) => ({ index: e.index, label: e.label, tone: e.tone, below: e.below }))
    if (showSwings) {
      const taken = new Set(a.events.map((e) => e.index))
      for (const s of swings) {
        if (!s.label || taken.has(s.index)) continue
        m.push({ index: s.index, label: s.label, tone: s.label === 'HH' || s.label === 'HL' ? 'bull' : 'bear', below: s.kind === 'low' })
      }
    }
    return m
  }, [a.events, swings, showSwings])

  const zones = useMemo<ChartZone[]>(() => (a.sweep ? [{ from: a.sweep.eqPrice, to: a.sweep.sweepHigh, label: 'Liquidity above equal highs', tone: 'gold' }] : []), [a.sweep])
  const notes = a.events.filter((e) => e.note)
  const lastBar = vis > 0 ? session.candles[vis - 1] : null
  const lastSwings = swings.filter((s) => s.label).slice(-4)

  const pickScenario = (id: ScenarioId) => { setScenario(id); reset(START_VIS) }
  const endVis = vis >= BARS

  return (
    <div className="flex flex-col gap-8">
      <IntroStrip>
        Replay a simulated 75-bar, 5-minute NIFTY session around two potential levels. Watch a breakout get tested against five checks, see where liquidity sits, and read swing structure and volume-by-price from the bars revealed so far.
      </IntroStrip>

      <div className="flex flex-col gap-3">
        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <Segmented ariaLabel="Scenario" value={scenario} onChange={pickScenario} options={SCENARIOS.map((s) => ({ value: s.id, label: s.label }))} />
        </div>
        <p className="max-w-3xl text-[0.88rem] leading-relaxed text-fg-2"><span className="text-fg">{def.label}.</span> {def.blurb}</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <GlassPanel className="flex min-w-0 flex-col gap-4 !p-4 sm:!p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Eyebrow>NIFTY · 5-min · simulated session</Eyebrow>
            <p className="num text-[0.78rem] text-fg-2">{vis === 0 ? 'Not started' : `${barTime(vis - 1)} · bar ${vis} of ${BARS}`}{lastBar ? ` · ${fmtIN(lastBar.c, 2)}` : ''}</p>
          </div>
          <CandleChart candles={session.candles} height={400} levels={LEVELS} zones={zones} markers={markers} showVolume={showVolume} visibleCount={vis} timeLabel={barTime} summaryLabel={`Simulated NIFTY 5-minute session, ${def.label}`} />

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Replay controls">
            <Button size="sm" variant="primary" onClick={toggle} icon={playing ? <Pause className="size-4" /> : <Play className="size-4" />} aria-pressed={playing}>{playing ? 'Pause' : endVis ? 'Replay' : 'Play'}</Button>
            <Button size="sm" variant="secondary" onClick={() => step(-1)} disabled={vis <= 0} aria-label="Step back one bar" icon={<SkipBack className="size-4" />} />
            <Button size="sm" variant="secondary" onClick={() => step(1)} disabled={endVis} aria-label="Step forward one bar" icon={<SkipForward className="size-4" />} />
            <Button size="sm" variant="ghost" onClick={() => reset(START_VIS)} icon={<RotateCcw className="size-4" />}>Reset</Button>
            <div className="ml-auto flex flex-wrap gap-2">
              <ToggleChip on={showSwings} onChange={setShowSwings} label="Swing labels" />
              <ToggleChip on={showVolume} onChange={setShowVolume} label="Volume" />
            </div>
          </div>
          <Slider label="Bars revealed" value={vis} min={0} max={BARS} step={1} onChange={seek} format={(v) => (v === 0 ? 'none' : `${barTime(v - 1)} · ${v}/${BARS}`)} />

          {(notes.length > 0 || lastSwings.length > 0) && (
            <div className="grid gap-4 border-t border-line pt-4 md:grid-cols-2">
              {notes.length > 0 && (
                <div>
                  <Eyebrow>What the data shows</Eyebrow>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {notes.map((n, i) => <li key={i} className="text-[0.8rem] leading-relaxed text-fg-2"><span className="font-mono text-fg">{n.label}</span> · {n.note}</li>)}
                  </ul>
                </div>
              )}
              {lastSwings.length > 0 && (
                <div>
                  <Eyebrow>Swing structure (confirmed pivots)</Eyebrow>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {lastSwings.map((s) => (
                      <li key={s.index} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[0.72rem] text-fg-2">
                        <span aria-hidden>{s.label === 'HH' || s.label === 'HL' ? '▲' : '▼'} </span><span className="text-fg">{s.label}</span> {fmtIN(s.price)} <span className="text-fg-3">{barTime(s.index)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[0.74rem] leading-snug text-fg-3">A pivot needs 4 bars on each side, so it appears about 20 minutes after it forms. HH/HL = higher highs and lows, LH/LL = lower.</p>
                </div>
              )}
            </div>
          )}
        </GlassPanel>

        <div className="flex min-w-0 flex-col gap-5">
          <GlassPanel className="!p-4 sm:!p-5"><Checklist a={a} /></GlassPanel>
          <GlassPanel className={cn('flex flex-col gap-3 !p-4 sm:!p-5', 'border-gold/25')}>
            <Eyebrow>Plain verdict</Eyebrow>
            <h3 className="font-display text-lg font-semibold text-fg" aria-live="polite">{a.verdictHead}</h3>
            <p className="text-[0.86rem] leading-relaxed text-fg-2">{a.verdict}</p>
            <div className="border-t border-line pt-3">
              <p className="text-[0.84rem] font-medium text-fg">What would invalidate this?</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {a.invalidation.map((t) => <li key={t} className="flex gap-2.5 text-[0.82rem] leading-relaxed text-fg-2"><span aria-hidden className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-gold" />{t}</li>)}
              </ul>
            </div>
          </GlassPanel>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <GlassPanel className="flex flex-col gap-4">
          <div>
            <Eyebrow>Volume profile · revealed bars only</Eyebrow>
            <p className="mt-2 text-[0.84rem] leading-relaxed text-fg-2">Volume traded at each price, in 5-point bins. The point of control (POC) is the busiest bin; the value area holds about 70% of volume. Dashed lines mark the two levels.</p>
          </div>
          <ProfilePanel candles={session.candles} vis={vis} />
          <p className="text-[0.76rem] leading-relaxed text-fg-3">High-volume nodes (HVN) are prices the market accepted and can act as potential magnets or support/resistance. Low-volume nodes (LVN) are prices it moved through quickly. Neither is a guarantee.</p>
        </GlassPanel>

        <div className="flex flex-col gap-5">
          <Callout title="Levels are potential, not guaranteed">
            24,000 is shown as the strike with the highest simulated CE open interest, so it is a potential resistance. 23,900 is a potential support. Open interest alone cannot show who initiated positions or whether they are writers defending or buyers hedging.
          </Callout>
          <Accordion
            defaultOpen={['liq']}
            items={[
              { id: 'liq', title: 'Liquidity and equal highs (18.1)', content: <p className="text-[0.86rem] leading-relaxed text-fg-2">When price makes two highs at nearly the same level, many traders place stop-losses just above them, and breakout traders place buy orders there. That cluster of resting orders is liquidity. Large participants may find it easier to trade size where such orders sit, so price can briefly run through the highs to reach it. In the false-breakout scenario, the bar that trades above the equal highs and closes back inside is a liquidity sweep.</p> },
              { id: 'trap', title: 'Traps and how they form (18.3)', content: <p className="text-[0.86rem] leading-relaxed text-fg-2">A bull trap happens when buyers enter on a break above resistance and price returns below it. Their exits and stops then add selling pressure, which can accelerate the move down. A bear trap is the mirror image at support. A trap is only visible in hindsight: the checklist helps you see how little confirmation a failed break had, not predict it.</p> },
              { id: 'close', title: 'Why closes matter more than wicks', content: <p className="text-[0.86rem] leading-relaxed text-fg-2">A wick through a level shows price was rejected there. A candle that closes beyond the level shows it was accepted for that interval. Requiring closes on 5, 15 and 30 minutes filters out single-bar spikes, at the cost of a later entry.</p> },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function ToggleChip({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={cn('h-9 rounded-full border px-3.5 text-[0.78rem] font-medium transition-colors', on ? 'border-gold/50 bg-gold/10 text-gold' : 'border-line text-fg-2 hover:text-fg')}
    >
      <span aria-hidden>{on ? '● ' : '○ '}</span>{label}
    </button>
  )
}
