import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, GitCompare, Search } from 'lucide-react'
import { Badge, Button, DataTable, Disclaimer, GlassPanel, LinkButton, PageHeader, Segmented, Slider, Tabs, cn, type Column } from '@/components/ui'
import { PayoffChart } from '@/components/viz/PayoffChart'
import { Sparkline } from '@/components/strategies/Sparkline'
import { CATEGORY_LABEL, DEFAULT_SLUG, MODULE_TITLE, OUTLOOK_LABEL, STRATEGIES, STRATEGY_BY_SLUG, type Bias, type Outlook, type Strategy, type StrategyCategory } from '@/data/strategies'
import { DEFAULT_INPUTS, analyze, type Extreme, type ResolvedLeg } from '@/lib/payoff'
import { fmtIN, fmtRupee, fmtSigned } from '@/lib/format'

type CatFilter = 'all' | StrategyCategory
type OutFilter = 'all' | Outlook

const OUT_TONE: Record<Outlook, 'bull' | 'bear' | 'ice' | 'gold' | 'neutral'> = { bullish: 'bull', bearish: 'bear', neutral: 'neutral', volatile: 'ice', 'range-bound': 'gold' }
const OUT_MARK: Record<Outlook, string> = { bullish: '▲ ', bearish: '▼ ', neutral: '', volatile: '', 'range-bound': '' }
const BIAS: Record<Bias, string> = { long: 'Long', short: 'Short', neutral: 'Neutral', mixed: 'Mixed' }

const money = (v: Extreme, abs = false) => (typeof v === 'number' ? fmtRupee(abs ? Math.abs(v) : v) : v)

function Tile({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: 'bull' | 'bear' }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-line bg-surface/60 p-4">
      <div className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-2">{label}</div>
      <div className={cn('num mt-2 text-[1.35rem] font-medium leading-tight sm:text-[1.5rem]', tone === 'bull' && 'text-bull', tone === 'bear' && 'text-bear')}>{value}</div>
      {sub && <div className="mt-1 text-[0.74rem] leading-snug text-fg-3">{sub}</div>}
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[var(--radius-xl)] border border-line bg-surface/40 p-5">
      <h3 className="eyebrow mb-3">{title}</h3>
      {children}
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[0.9rem] leading-relaxed text-fg-2">
      {items.map((t) => (
        <li key={t} className="flex gap-2.5">
          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-gold" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Strategies() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [cat, setCat] = useState<CatFilter>('all')
  const [out, setOut] = useState<OutFilter>('all')
  const [q, setQ] = useState('')
  const [iv, setIv] = useState(15)
  const [dte, setDte] = useState(7)
  const [spot, setSpot] = useState(24000)
  const [lot, setLot] = useState(DEFAULT_INPUTS.lotSize)
  const [units, setUnits] = useState<Record<string, number>>({})
  const [compare, setCompare] = useState(false)
  const [otherSlug, setOtherSlug] = useState('long-straddle')

  const strat: Strategy | undefined = slug ? STRATEGY_BY_SLUG[slug] : STRATEGY_BY_SLUG[DEFAULT_SLUG]
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return STRATEGIES.filter((s) => (cat === 'all' || s.category === cat) && (out === 'all' || s.outlook === out) && (!t || `${s.name} ${s.tagline} ${OUTLOOK_LABEL[s.outlook]}`.toLowerCase().includes(t)))
  }, [cat, out, q])

  const unit = strat ? (units[strat.slug] ?? strat.defaultUnit) : 2
  const inp = useMemo(() => ({ ...DEFAULT_INPUTS, spot, iv: iv / 100, dte, unit, lotSize: lot }), [spot, iv, dte, unit, lot])
  const analysis = useMemo(() => (strat ? analyze(strat.legs, inp) : null), [strat, inp])
  const other = STRATEGY_BY_SLUG[otherSlug]
  const otherAnalysis = useMemo(() => (compare && other ? analyze(other.legs, { ...inp, unit: units[other.slug] ?? other.defaultUnit }) : undefined), [compare, other, inp, units])

  if (!strat || !analysis) return <Navigate to="/strategies" replace />
  const idx = STRATEGIES.findIndex((s) => s.slug === strat.slug)
  const prev = STRATEGIES[(idx - 1 + STRATEGIES.length) % STRATEGIES.length]
  const next = STRATEGIES[(idx + 1) % STRATEGIES.length]
  const a = analysis
  const credit = a.netPremium < 0
  const hasFar = strat.legs.some((l) => l.expiry === 'far')
  const hasOpt = strat.legs.some((l) => l.type === 'CE' || l.type === 'PE')
  const go = (s: string) => navigate(`/strategies/${s}`)

  const legCols: Column<ResolvedLeg>[] = [
    { key: 'side', header: 'Action', render: (l) => <span className={cn('font-mono', l.side > 0 ? 'text-bull' : 'text-bear')}>{l.side > 0 ? '▲ Buy' : '▼ Sell'}</span> },
    { key: 'type', header: 'Instrument', render: (l) => (l.type === 'UNDERLYING' ? 'Underlying' : l.type === 'FUT' ? 'Future' : `${fmtIN(l.strike)} ${l.type}`) },
    { key: 'qty', header: 'Lots', align: 'right', mono: true, render: (l) => l.qty },
    { key: 'exp', header: 'Expiry', render: (l) => (l.isOption ? (l.expiry === 'near' ? 'Near' : 'Far') : '—') },
    { key: 'entry', header: 'Entry price', align: 'right', mono: true, render: (l) => fmtIN(l.entry, 2) },
  ]

  return (
    <>
      <PageHeader eyebrow="Strategy library" title={<>Payoffs you can <span className="text-gold-gradient">stress-test.</span></>} description="Every Level 20 structure with its construction, Greeks profile and risk. Drag the controls and watch expiry and today curves move. Black–Scholes on simulated inputs; illustrations, not forecasts.">
        <Disclaimer>Shown at expiry using the Black–Scholes model on simulated inputs. Excludes taxes, brokerage, slippage and margin. Sellers can lose far more than the premium received. Nothing here is guaranteed or advice.</Disclaimer>
      </PageHeader>

      <div className="container-x section !pt-10">
        <div className="mb-6 flex flex-col gap-4">
          <Tabs ariaLabel="Strategy category" size="sm" value={cat} onChange={(v) => setCat(v as CatFilter)} tabs={[{ id: 'all', label: 'All' }, ...(Object.keys(CATEGORY_LABEL) as StrategyCategory[]).map((c) => ({ id: c, label: CATEGORY_LABEL[c] }))]} />
          <div className="flex flex-wrap items-center gap-3">
            <div className="max-w-full overflow-x-auto [scrollbar-width:none]">
              <Segmented<OutFilter> ariaLabel="Outlook" value={out} onChange={setOut} options={[{ value: 'all', label: 'Any outlook' }, ...(Object.keys(OUTLOOK_LABEL) as Outlook[]).map((o) => ({ value: o, label: `${OUT_MARK[o]}${OUTLOOK_LABEL[o]}` }))]} />
            </div>
            <label className="relative block w-full sm:w-64">
              <span className="sr-only">Search strategies</span>
              <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-3" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search strategies" className="h-10 w-full rounded-full border border-line bg-white/[0.03] pl-10 pr-4 text-[0.88rem] text-fg placeholder:text-fg-3" />
            </label>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[19rem_minmax(0,1fr)] xl:grid-cols-[21rem_minmax(0,1fr)]">
          <nav aria-label="Strategies" className="min-w-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
            <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
              {filtered.map((s) => {
                const active = s.slug === strat.slug
                return (
                  <li key={s.slug} className="shrink-0 lg:shrink">
                    <button type="button" aria-current={active ? 'true' : undefined} onClick={() => go(s.slug)} className={cn('flex min-h-14 w-48 items-center gap-3 rounded-2xl border p-3 text-left transition-colors lg:w-full', active ? 'border-gold/50 bg-gold/[0.07]' : 'border-line bg-surface/50 hover:border-line-strong')}>
                      <Sparkline strategy={s} active={active} className="h-9 w-16 shrink-0" />
                      <span className="min-w-0">
                        <span className="block truncate text-[0.88rem] font-medium text-fg">{s.name}</span>
                        <span className="block font-mono text-[0.66rem] uppercase tracking-[0.08em] text-fg-2">{OUT_MARK[s.outlook]}{OUTLOOK_LABEL[s.outlook]}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
              {!filtered.length && <li className="p-4 text-[0.88rem] text-fg-2">No strategies match these filters.</li>}
            </ul>
          </nav>

          <div className="min-w-0 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={OUT_TONE[strat.outlook]}>{OUT_MARK[strat.outlook]}{OUTLOOK_LABEL[strat.outlook]}</Badge>
                <Badge>{CATEGORY_LABEL[strat.category]}</Badge>
              </div>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight text-fg">{strat.name}</h2>
              <p className="mt-2 max-w-3xl text-[1rem] leading-relaxed text-fg-2">{strat.construction}</p>
            </div>

            <GlassPanel className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-[1.05rem] font-semibold">Payoff</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" variant={compare ? 'primary' : 'secondary'} icon={<GitCompare className="size-4" />} aria-pressed={compare} onClick={() => setCompare((c) => !c)}>Compare</Button>
                  {compare && (
                    <label className="flex items-center gap-2 text-[0.82rem] text-fg-2">
                      <span>with</span>
                      <select value={otherSlug} onChange={(e) => setOtherSlug(e.target.value)} className="h-9 rounded-full border border-line bg-surface px-3 text-[0.82rem] text-fg">
                        {STRATEGIES.filter((s) => s.slug !== strat.slug).map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                      </select>
                    </label>
                  )}
                </div>
              </div>
              <PayoffChart analysis={a} spot={spot} compare={otherAnalysis} name={strat.name} compareName={other?.name} showToday={hasOpt && !compare} />
              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                <Slider label="Spot" value={spot} min={22000} max={26000} step={50} onChange={setSpot} format={fmtIN} />
                <Slider label="Implied volatility" value={iv} min={8} max={40} step={0.5} onChange={setIv} format={(v) => `${v.toFixed(1)}%`} hint="India VIX sample is about 13–16." />
                <Slider label="Days to expiry" value={dte} min={1} max={45} onChange={setDte} format={(v) => `${v} d`} />
                <Slider label="Strike width" value={unit} min={1} max={6} onChange={(v) => setUnits((u) => ({ ...u, [strat.slug]: v }))} format={(v) => `${v * 50} pts`} hint="Distance per strike offset." />
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="lot" className="text-[0.82rem] text-fg-2">Lot size (units)</label>
                  <input id="lot" type="number" min={1} step={1} value={lot} onChange={(e) => setLot(Math.max(1, Math.round(Number(e.target.value) || 1)))} className="num h-10 w-32 rounded-xl border border-line bg-white/[0.03] px-3 text-fg" />
                  <p className="text-[0.74rem] text-fg-3">Default 65. Check the current NSE contract specification.</p>
                </div>
              </div>
              {hasFar && <p className="text-[0.78rem] text-fg-3">Far-dated legs are valued with Black–Scholes at the remaining time when the near expiry arrives. Statistics are for the charted range.</p>}
            </GlassPanel>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              <Tile label={credit ? 'Net credit' : a.netPremium === 0 ? 'Net premium' : 'Net debit'} value={fmtRupee(Math.abs(a.netPremium))} sub={hasOpt ? `Per lot of ${lot}` : 'No premium; underlying at spot'} />
              <Tile label="Max profit" value={money(a.maxProfit)} tone="bull" sub={a.maxProfitAtZero ? 'Only if the index fell to zero' : undefined} />
              <Tile label="Max loss" value={typeof a.maxLoss === 'number' ? fmtRupee(Math.abs(a.maxLoss)) : a.maxLoss} tone="bear" sub={typeof a.maxLoss === 'number' ? undefined : 'Not capped'} />
              <Tile label="Breakeven" value={a.breakevens.length ? a.breakevens.map((b) => fmtIN(b)).join(' · ') : 'None'} sub="At expiry" />
              <Tile label="Reward : risk" value={a.rewardRisk !== null ? `${a.rewardRisk.toFixed(2)} : 1` : 'n/a'} sub={a.rewardRisk !== null ? 'Not a probability' : 'Needs finite profit and loss'} />
              <Tile label="Net delta" value={fmtSigned(a.greeks.delta, 2)} sub="Per unit of underlying" />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div>
                <h3 className="eyebrow mb-3">Legs</h3>
                <DataTable caption={`${strat.name} legs`} columns={legCols} rows={a.legs} rowKey={(_, i) => i} dense />
              </div>
              <div>
                <h3 className="eyebrow mb-3">Net Greeks (per unit)</h3>
                <DataTable
                  caption="Net Greeks"
                  dense
                  rows={[
                    { k: 'Delta', v: fmtSigned(a.greeks.delta, 3), p: BIAS.mixed },
                    { k: 'Gamma', v: fmtSigned(a.greeks.gamma * 1000, 3) + ' ×10⁻³', p: BIAS[strat.greeks.gamma] },
                    { k: 'Theta / day', v: fmtSigned(a.greeks.theta, 2), p: BIAS[strat.greeks.theta] },
                    { k: 'Vega / IV pt', v: fmtSigned(a.greeks.vega, 2), p: BIAS[strat.greeks.vega] },
                  ]}
                  rowKey={(r) => r.k}
                  columns={[
                    { key: 'k', header: 'Greek' },
                    { key: 'v', header: 'Net', align: 'right', mono: true },
                    { key: 'p', header: 'Profile', align: 'right' },
                  ]}
                />
                <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-2">{strat.greeks.note}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Block title="Suitable conditions"><Bullets items={strat.conditions} /><p className="mt-3 text-[0.86rem] leading-relaxed text-fg-2"><span className="text-fg">VIX / IV regime: </span>{strat.regime}</p></Block>
              <Block title="Margin and risk"><p className="text-[0.9rem] leading-relaxed text-fg-2"><span className="text-fg">Max risk: </span>{strat.maxRisk}</p><p className="mt-3 text-[0.9rem] leading-relaxed text-fg-2"><span className="text-fg">Margin: </span>{strat.margin}</p></Block>
              <Block title="When it goes wrong"><Bullets items={strat.wrong} /></Block>
              {strat.variants && <Block title="Playbook variants"><ul className="space-y-3">{strat.variants.map((v) => <li key={v.name} className="text-[0.88rem] leading-relaxed text-fg-2"><span className="font-medium text-fg">{v.name}. </span>{v.note}</li>)}</ul></Block>}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <LinkButton to={`/learn/${strat.module}`} variant="secondary" size="sm">Module {strat.module}: {MODULE_TITLE[strat.module]}</LinkButton>
              <LinkButton to="/labs/greeks" variant="ghost" size="sm">Greeks lab</LinkButton>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
              <Button variant="ghost" size="sm" icon={<ArrowLeft className="size-4" />} onClick={() => go(prev.slug)}>{prev.name}</Button>
              <Button variant="ghost" size="sm" iconRight={<ArrowRight className="size-4" />} onClick={() => go(next.slug)}>{next.name}</Button>
            </div>
            <Disclaimer>Expiry illustration using Black–Scholes on simulated inputs. Excludes taxes, brokerage, slippage and margin. Sellers can lose more than the premium. Nothing is guaranteed.</Disclaimer>
          </div>
        </div>
      </div>
    </>
  )
}
