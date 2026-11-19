import { useState } from 'react'
import { Database, Gauge, Clock, Server } from 'lucide-react'
import { Badge, GlassPanel, cn } from '@/components/ui'
import { QSection } from './shared'

type Lvl = 'ok' | 'heavy' | 'na'
interface Row { id: string; name: string; f: [Lvl, Lvl, Lvl, Lvl]; storage: string; pitfall: string }
const FREQ = ['Daily', '5-min', '1-min', 'Tick'] as const

const ROWS: Row[] = [
  { id: 'spot', name: 'Nifty OHLC', f: ['ok', 'ok', 'ok', 'heavy'], storage: 'Smallest dataset here. A year of 1-minute bars is roughly 90,000 rows.', pitfall: 'The index has no traded volume of its own, so volume-based logic must use futures. Index values are computed from constituents, not a tradable price.' },
  { id: 'fut', name: 'Futures OHLC', f: ['ok', 'ok', 'ok', 'heavy'], storage: 'One series per expiry. Keep each contract separate and build a continuous series as a derived view.', pitfall: 'Stitching expiries together needs an explicit roll rule. The jump at the roll is not a return, and ignoring it fakes P&L.' },
  { id: 'chain', name: 'Option-chain snapshots', f: ['ok', 'heavy', 'heavy', 'na'], storage: 'The heaviest dataset: every strike, CE and PE, every snapshot. Compress and partition by date and expiry.', pitfall: 'A snapshot is not atomic. Strikes may be stamped a few seconds apart, so a spread priced from two stale legs can show an edge that never existed.' },
  { id: 'oi', name: 'Open interest (OI)', f: ['ok', 'ok', 'heavy', 'na'], storage: 'One integer per strike per snapshot. Cheap alone, large across a full chain.', pitfall: 'OI refreshes on the exchange schedule and lags price. Storing it beside a price bar as if simultaneous leaks information in a backtest.' },
  { id: 'oichg', name: 'OI change', f: ['ok', 'ok', 'heavy', 'na'], storage: 'Derive it from stored OI instead of storing it, so the baseline is never lost.', pitfall: 'The baseline matters: change versus previous close, or versus the prior snapshot, are different numbers. OI alone cannot show who initiated the position.' },
  { id: 'vol', name: 'Volume', f: ['ok', 'ok', 'ok', 'heavy'], storage: 'Store per-bar volume, not the running total, or keep both and label them.', pitfall: 'Cumulative day volume and per-bar volume are easy to mix up. Low-volume strikes give noisy prices that a backtest will happily fill.' },
  { id: 'iv', name: 'Implied volatility', f: ['ok', 'ok', 'heavy', 'na'], storage: 'Derived from price by a model. Store the inputs (price, rate, expiry) next to it.', pitfall: 'IV from last-traded price on an illiquid strike is unreliable. Different rate and dividend assumptions give different IVs for the same price.' },
  { id: 'vix', name: 'India VIX', f: ['ok', 'ok', 'ok', 'na'], storage: 'Tiny. One value per bar.', pitfall: 'It measures expected 30-day volatility, not direction. Using a VIX level as a bullish or bearish signal is a category mistake.' },
  { id: 'greeks', name: 'Greeks', f: ['ok', 'heavy', 'heavy', 'na'], storage: 'Usually computed, not published. Recompute from stored prices so you control the model.', pitfall: 'A vendor and your own Black–Scholes can disagree. Record which model, rate and day-count produced each Greek.' },
]

const sym: Record<Lvl, { g: string; t: string; c: string }> = {
  ok: { g: '●', t: 'Commonly available', c: 'text-gold' },
  heavy: { g: '◐', t: 'Available but heavy to store or noisy', c: 'text-ice' },
  na: { g: '○', t: 'Rare or not meaningful', c: 'text-fg-3' },
}

const SOURCES = [
  { icon: Database, h: 'NSE market data', p: 'The exchange is the reference for official end-of-day bhavcopy-style files, contract specifications and the lot-size notices. Treat the exchange file as the source of truth and everything else as a copy that you reconcile against it.' },
  { icon: Server, h: 'Broker APIs, including DhanHQ', p: 'Broker data APIs offer historical candles and option-chain snapshots through authenticated endpoints. Coverage, look-back and intraday depth differ by provider, so read the current API documentation before designing around any one of them. Credentials never belong in a repository or a browser.' },
  { icon: Gauge, h: 'Rate limits', p: 'Every API throttles requests. Collection jobs should queue, back off and resume, and record what is missing instead of silently skipping it. A hole you know about is better than one you discover in a result.' },
  { icon: Clock, h: 'Timestamp synchronisation', p: 'Decide one clock and one zone (IST, exchange time) for everything. Differences of even a few seconds between a price feed and an OI feed can shift a signal by a whole bar.' },
]

export function DataSection() {
  const [sel, setSel] = useState(ROWS[2].id)
  const row = ROWS.find((r) => r.id === sel) ?? ROWS[0]
  return (
    <QSection id="data" eyebrow="24.1 · 24.2 — Data" title={<>Garbage in, <span className="text-gold-gradient">confident</span> garbage out</>} lead="A backtest is only as honest as its data. Pick a row to see how it is stored and where it goes wrong. The matrix shows what is typically available at each frequency, not a promise about any one vendor.">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0">
          <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-line bg-surface/60">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">Data types by frequency. Select a row for storage and pitfall notes.</caption>
              <thead>
                <tr className="border-b border-line bg-white/[0.025] font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg-2">
                  <th scope="col" className="px-4 py-3 font-medium">Data type</th>
                  {FREQ.map((f) => <th key={f} scope="col" className="px-3 py-3 text-center font-medium">{f}</th>)}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => {
                  const on = r.id === sel
                  return (
                    <tr key={r.id} className={cn('border-b border-line/70 last:border-0', on && 'bg-gold/[0.06]')}>
                      <th scope="row" className="p-0 text-left font-normal">
                        <button type="button" onClick={() => setSel(r.id)} aria-pressed={on} className={cn('flex min-h-11 w-full items-center px-4 py-2.5 text-left text-[0.9rem] transition-colors hover:text-fg', on ? 'text-fg' : 'text-fg-2')}>
                          {r.name}
                        </button>
                      </th>
                      {r.f.map((l, i) => (
                        <td key={i} className={cn('px-3 text-center text-[1rem]', sym[l].c)}>
                          <span aria-hidden>{sym[l].g}</span>
                          <span className="sr-only">{FREQ[i]}: {sym[l].t}</span>
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.76rem] text-fg-2">
            {(Object.keys(sym) as Lvl[]).map((k) => <li key={k}><span aria-hidden className={cn('mr-1.5', sym[k].c)}>{sym[k].g}</span>{sym[k].t}</li>)}
          </ul>
        </div>
        <GlassPanel aria-live="polite" className="flex flex-col gap-5 lg:sticky lg:top-40 lg:self-start">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-xl font-semibold">{row.name}</h3>
            <Badge tone="ice">Concept</Badge>
          </div>
          <div>
            <p className="eyebrow">Storage</p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-2">{row.storage}</p>
          </div>
          <div className="border-t border-line pt-5">
            <p className="eyebrow">Pitfall</p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-fg">{row.pitfall}</p>
          </div>
        </GlassPanel>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {SOURCES.map((s) => (
          <article key={s.h} className="flex flex-col gap-3 bg-surface p-5 sm:p-6">
            <s.icon aria-hidden className="size-5 text-gold" />
            <h3 className="text-[1rem] font-semibold">{s.h}</h3>
            <p className="text-[0.86rem] leading-relaxed text-fg-2">{s.p}</p>
          </article>
        ))}
      </div>
    </QSection>
  )
}
