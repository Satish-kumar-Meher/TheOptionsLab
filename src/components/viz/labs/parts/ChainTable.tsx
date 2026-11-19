import { memo, type ReactNode } from 'react'
import { Tip, cn } from '@/components/ui'
import { fmtCompactIN, fmtIN, fmtNum } from '@/lib/format'
import type { ChainRow, ChainSnapshot, ChainStats, CompareMode, SideData } from '@/data/optionChainSim'

const GLOSS: Record<string, string> = {
  OI: 'Open Interest: contracts still open (not yet closed or expired). Bar length compares strikes in this snapshot.',
  'Chg OI': 'Change in open contracts versus the compare-against reference (previous snapshot or the day’s open).',
  Vol: 'Volume: contracts traded so far today. Volume is activity; OI is what remains open.',
  IV: 'Implied volatility the option price implies under Black–Scholes. It differs by strike (skew).',
  Net: 'Net change: LTP minus the previous session’s closing premium for the contract.',
  LTP: 'Last traded price of the contract.',
  Bid: 'Highest price a buyer currently offers.',
  'Bid Qty': 'Quantity (units) available at the best bid.',
  Ask: 'Lowest price a seller currently asks.',
  'Ask Qty': 'Quantity (units) available at the best ask.',
  Strike: 'Contract strike price. The highlighted row is the strike nearest spot (ATM).',
  PCR: 'Put–Call Ratio at this strike: put OI divided by call OI. Per-strike ratios swing a lot when one side is thin.',
}
const H = ({ k, label }: { k: string; label?: string }) => (
  <Tip content={GLOSS[k]} side="bottom"><span className="underline decoration-dotted underline-offset-4">{label ?? k}</span></Tip>
)

type ColKey = 'oi' | 'chg' | 'vol' | 'iv' | 'net' | 'ltp' | 'bid' | 'bq' | 'ask' | 'aq'
const CE_ORDER: ColKey[] = ['oi', 'chg', 'vol', 'iv', 'net', 'ltp', 'bid', 'bq', 'ask', 'aq']
const PE_ORDER: ColKey[] = ['aq', 'ask', 'bq', 'bid', 'ltp', 'net', 'iv', 'vol', 'chg', 'oi']
const HEAD: Record<ColKey, { k: string; label: string }> = {
  oi: { k: 'OI', label: 'OI' }, chg: { k: 'Chg OI', label: 'Chg OI' }, vol: { k: 'Vol', label: 'Volume' }, iv: { k: 'IV', label: 'IV %' }, net: { k: 'Net', label: 'Net chg' },
  ltp: { k: 'LTP', label: 'LTP' }, bid: { k: 'Bid', label: 'Bid' }, bq: { k: 'Bid Qty', label: 'Bid qty' }, ask: { k: 'Ask', label: 'Ask' }, aq: { k: 'Ask Qty', label: 'Ask qty' },
}

const Chg = ({ v }: { v: number }) => {
  if (v === 0) return <span className="text-fg-3">0</span>
  return (
    <span className="inline-flex items-center gap-1 text-fg">
      <span aria-hidden className="text-[0.62rem] text-fg-2">{v > 0 ? '▲' : '▼'}</span>
      <span className="sr-only">{v > 0 ? 'up' : 'down'}</span>
      {fmtCompactIN(Math.abs(v))}
    </span>
  )
}

interface CellCtx { side: 'ce' | 'pe'; d: SideData; mode: CompareMode; maxOI: number; rank: number }
function cell(key: ColKey, c: CellCtx): ReactNode {
  const { d } = c
  switch (key) {
    case 'oi': {
      const pct = (d.oi / c.maxOI) * 100
      return (
        <div className="relative flex h-7 min-w-[7.5rem] items-center">
          <span aria-hidden className={cn('absolute inset-y-0.5 rounded-[3px]', c.side === 'ce' ? 'right-0 bg-bear/30' : 'left-0 bg-bull/30')} style={{ width: `${pct}%` }} />
          <span className={cn('relative flex w-full items-center gap-1.5 px-1.5', c.side === 'ce' ? 'justify-end' : 'justify-start')}>
            {c.side === 'pe' && c.rank > 0 && <RankChip rank={c.rank} />}
            <span className="num text-fg">{fmtCompactIN(d.oi)}</span>
            {c.side === 'ce' && c.rank > 0 && <RankChip rank={c.rank} />}
          </span>
        </div>
      )
    }
    case 'chg': return <Chg v={c.mode === 'prev' ? d.chgPrev : d.chgOpen} />
    case 'vol': return fmtCompactIN(d.volume)
    case 'iv': return fmtNum(d.iv, 1)
    case 'net': return <span className="text-fg-2">{d.netChg > 0 ? '+' : d.netChg < 0 ? '−' : ''}{fmtNum(Math.abs(d.netChg), 2)}</span>
    case 'ltp': return <span className="font-medium text-fg">{fmtNum(d.ltp, 2)}</span>
    case 'bid': return fmtNum(d.bid, 2)
    case 'bq': return <span className="text-fg-2">{fmtIN(d.bidQty)}</span>
    case 'ask': return fmtNum(d.ask, 2)
    case 'aq': return <span className="text-fg-2">{fmtIN(d.askQty)}</span>
  }
}

const RankChip = ({ rank }: { rank: number }) => (
  <span className="rounded border border-gold/40 bg-gold/10 px-1 font-mono text-[0.6rem] leading-4 text-gold" title={`Top ${rank} open interest on this side`}>
    <span aria-hidden>#{rank}</span>
    <span className="sr-only">Number {rank} open interest on this side</span>
  </span>
)

/** Full option chain: every Module 8.2 column on both sides, ATM highlight, inline OI bars, top-3 OI badges. */
export const ChainTable = memo(function ChainTable({ snap, stats, mode }: { snap: ChainSnapshot; stats: ChainStats; mode: CompareMode }) {
  const maxOI = Math.max(...snap.rows.map((r) => Math.max(r.ce.oi, r.pe.oi)))
  const rank = (arr: number[], strike: number) => arr.indexOf(strike) + 1
  const th = 'whitespace-nowrap border-b border-line px-2.5 py-2.5 font-mono text-[0.64rem] font-medium uppercase tracking-[0.08em] text-fg-2'
  const td = 'num whitespace-nowrap px-2.5 py-1 text-[0.8rem] text-fg-2'
  return (
    <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-line bg-surface/60" tabIndex={0} role="region" aria-label="Simulated NIFTY option chain, scrolls horizontally">
      <table className="w-full min-w-[1560px] border-separate border-spacing-0 text-right">
        <caption className="sr-only">Simulated NIFTY weekly option chain at {snap.time}. Call columns on the left, strike in the centre, put columns on the right.</caption>
        <thead className="bg-bg-2">
          <tr>
            <th colSpan={10} scope="colgroup" className={cn(th, 'border-r border-line text-center text-bear')}>Calls (CE)</th>
            <th rowSpan={2} scope="col" className={cn(th, 'sticky left-0 z-20 border-x border-line bg-bg-2 text-center text-gold')}><H k="Strike" /></th>
            <th colSpan={10} scope="colgroup" className={cn(th, 'border-l border-line text-center text-bull')}>Puts (PE)</th>
            <th rowSpan={2} scope="col" className={cn(th, 'border-l border-line text-center')}><H k="PCR" /></th>
          </tr>
          <tr>
            {CE_ORDER.map((k) => <th key={`c${k}`} scope="col" className={th}><H k={HEAD[k].k} label={HEAD[k].label} /></th>)}
            {PE_ORDER.map((k) => <th key={`p${k}`} scope="col" className={th}><H k={HEAD[k].k} label={HEAD[k].label} /></th>)}
          </tr>
        </thead>
        <tbody>
          {snap.rows.map((r: ChainRow) => {
            const atm = r.strike === stats.atmStrike
            const rowBg = atm ? 'bg-gold/[0.09]' : 'hover:bg-white/[0.03]'
            return (
              <tr key={r.strike} className={cn('transition-colors', rowBg)} aria-current={atm ? 'true' : undefined}>
                {CE_ORDER.map((k, i) => (
                  <td key={k} className={cn(td, 'border-b border-line/50', i === 9 && 'border-r border-line/50', r.strike < snap.spot && 'bg-white/[0.018]')}>
                    {cell(k, { side: 'ce', d: r.ce, mode, maxOI, rank: k === 'oi' ? rank(stats.topCE, r.strike) : 0 })}
                  </td>
                ))}
                <th scope="row" className={cn('sticky left-0 z-10 border-x border-b border-line/60 px-3 py-1 text-center font-mono text-[0.86rem] font-semibold', atm ? 'bg-[#1b1a15] text-gold' : 'bg-surface text-fg')}>
                  {fmtIN(r.strike)}
                  {atm && <span className="ml-1.5 rounded bg-gold px-1 text-[0.58rem] font-semibold leading-4 text-bg">ATM</span>}
                </th>
                {PE_ORDER.map((k, i) => (
                  <td key={k} className={cn(td, 'border-b border-line/50', i === 0 && 'border-l border-line/50', r.strike > snap.spot && 'bg-white/[0.018]')}>
                    {cell(k, { side: 'pe', d: r.pe, mode, maxOI, rank: k === 'oi' ? rank(stats.topPE, r.strike) : 0 })}
                  </td>
                ))}
                <td className={cn(td, 'border-b border-l border-line/50 text-center')}>{fmtNum(r.pe.oi / r.ce.oi, 2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
})
