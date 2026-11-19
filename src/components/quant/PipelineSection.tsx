import { useState } from 'react'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { GlassPanel, cn } from '@/components/ui'
import { QSection } from './shared'

const STAGES = [
  { id: 'ingest', n: 'Ingest', sub: 'CSV · JSON · API', risk: 'Rate-limited or partial downloads', body: 'Raw files arrive in different shapes and zones. Keep the untouched raw copy forever so every later fix can be replayed.', wrong: ['A rate-limited job stops halfway and nobody notices a missing day.', 'Mixed time zones or a mix of cumulative and per-bar volume.', 'Overwriting raw files with cleaned ones, so errors cannot be traced.'] },
  { id: 'clean', n: 'Clean', sub: 'dedupe · gaps · ticks', risk: 'Bad ticks and silent gaps', body: 'Remove duplicates, flag missing bars, align timestamps. Decide a rule for each fix and log it rather than patching by eye.', wrong: ['Bad ticks (a price far outside the day range) trigger fake stop-outs.', 'Forward-filling a gap invents prices that never traded.', 'Deleting every outlier also deletes genuine fast markets, which flatters the result.'] },
  { id: 'organise', n: 'Organise', sub: 'strike · expiry', risk: 'Look-ahead bias', body: 'Index by expiry, then strike, then timestamp. Every row should carry the time it became known, not only the time it describes.', wrong: ['Using the end-of-day OI to decide an entry at 10:15: that is look-ahead bias.', 'Using a later-revised value instead of what was visible then.', 'Joining a strike to the wrong expiry after a weekly roll.'] },
  { id: 'store', n: 'Store', sub: 'DB · snapshots', risk: 'Survivorship and schema drift', body: 'Partition snapshots by date and expiry; keep contracts that have since expired. A schema that only holds today’s listed strikes cannot reproduce history.', wrong: ['Keeping only contracts that still exist (survivorship bias).', 'Lot size or strike step changed, but old rows are read with new rules.', 'No version on the dataset, so a result cannot be reproduced later.'] },
  { id: 'backtest', n: 'Backtest', sub: 'rules · costs', risk: 'Unrealistic fills', body: 'Apply entry, exit, stop and sizing rules bar by bar, using only information available at that bar, with costs and slippage.', wrong: ['Filling at the bar’s best price or at a strike that had no trades.', 'Ignoring brokerage, taxes and slippage, which can erase a thin edge.', 'Tuning rules while looking at the same data used to judge them.'] },
  { id: 'evaluate', n: 'Evaluate', sub: 'metrics · robustness', risk: 'Overfitting', body: 'Judge on out-of-sample data, across regimes, with drawdown and variability, not just the headline return.', wrong: ['Reporting the best of fifty parameter sets as if it were the only one tried.', 'Too few trades to tell skill from luck.', 'Only looking at average results and ignoring worst-case drawdown.'] },
  { id: 'deploy', n: 'Deploy', sub: 'paper → small live', risk: 'Live differs from test', body: 'Paper-trade first, then size small. Compare live fills with backtest fills; a widening gap means the model of execution was too kind.', wrong: ['Latency, partial fills and rejected orders that the test never modelled.', 'Data feed in production differs from the research data.', 'No kill-switch if the strategy behaves out of character.'] },
] as const

export function PipelineSection() {
  const [i, setI] = useState(2)
  const s = STAGES[i]
  return (
    <QSection id="pipeline" tint eyebrow="24.3 — Data engineering" title={<>From raw file to <span className="text-gold-gradient">trusted</span> result</>} lead="Most backtest failures are pipeline failures. Select a stage to see what typically goes wrong there.">
      <div role="tablist" aria-label="Pipeline stages" className="-mx-5 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <ol className="flex min-w-max items-stretch gap-0 lg:min-w-0">
          {STAGES.map((st, k) => {
            const on = k === i
            return (
              <li key={st.id} className="flex flex-1 items-center">
                <button
                  type="button"
                  role="tab"
                  id={`stg-${st.id}`}
                  aria-selected={on}
                  aria-controls="stg-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setI(k)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') { e.preventDefault(); setI((k + 1) % STAGES.length); document.getElementById(`stg-${STAGES[(k + 1) % STAGES.length].id}`)?.focus() }
                    if (e.key === 'ArrowLeft') { e.preventDefault(); const p = (k + STAGES.length - 1) % STAGES.length; setI(p); document.getElementById(`stg-${STAGES[p].id}`)?.focus() }
                  }}
                  className={cn('flex min-h-[5.25rem] w-[8.2rem] flex-1 flex-col justify-between rounded-2xl border p-3.5 text-left transition-colors lg:w-auto', on ? 'border-gold/60 bg-gold/[0.09]' : 'border-line bg-surface hover:border-line-strong')}
                >
                  <span className="num text-[0.68rem] text-fg-3">{String(k + 1).padStart(2, '0')}</span>
                  <span>
                    <span className={cn('block text-[0.95rem] font-semibold', on ? 'text-gold' : 'text-fg')}>{st.n}</span>
                    <span className="block font-mono text-[0.66rem] text-fg-2">{st.sub}</span>
                  </span>
                </button>
                {k < STAGES.length - 1 && <ChevronRight aria-hidden className="mx-0.5 size-4 shrink-0 text-fg-3" />}
              </li>
            )
          })}
        </ol>
      </div>
      <GlassPanel id="stg-panel" role="tabpanel" aria-labelledby={`stg-${s.id}`} className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">Stage {i + 1} of {STAGES.length}</p>
          <h3 className="mt-4 font-display text-3xl font-semibold">{s.n}</h3>
          <p className="mt-2 font-mono text-[0.8rem] text-gold">Main risk: {s.risk}</p>
          <p className="mt-4 text-[0.96rem] leading-relaxed text-fg-2">{s.body}</p>
        </div>
        <div>
          <p className="eyebrow">What can go wrong</p>
          <ul className="mt-4 flex flex-col gap-3">
            {s.wrong.map((w) => (
              <li key={w} className="flex gap-3 rounded-xl border border-line bg-white/[0.02] p-3.5 text-[0.9rem] leading-relaxed text-fg">
                <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-gold" />{w}
              </li>
            ))}
          </ul>
        </div>
      </GlassPanel>
      <p className="mt-6 max-w-3xl text-[0.86rem] leading-relaxed text-fg-2">
        Also on this stage of the curriculum: CSV and JSON handling, missing-data rules, duplicate removal, timestamp alignment, strike-wise and expiry-wise layout, and database design for historical snapshots.
      </p>
    </QSection>
  )
}
