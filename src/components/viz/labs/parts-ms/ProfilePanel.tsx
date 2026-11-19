import { useMemo } from 'react'
import { fmtCompactIN, fmtIN } from '@/lib/format'
import type { Candle } from '@/lib/rng'
import { computeProfile } from './analysis'
import { RESISTANCE, SUPPORT } from './session'

const MONO = "'JetBrains Mono Variable', ui-monospace, monospace"

/** Horizontal volume-by-price profile built only from revealed bars. */
export function ProfilePanel({ candles, vis }: { candles: Candle[]; vis: number }) {
  const p = useMemo(() => computeProfile(candles, vis, 5), [candles, vis])
  const rowH = 13
  const W = 360
  const labelW = 52
  const barMax = W - labelW - 8
  if (!p.poc) return <p className="text-[0.84rem] text-fg-2">Reveal some bars to build the profile.</p>
  const maxVol = Math.max(...p.bins.map((b) => b.vol), 1)
  const rows = [...p.bins].reverse()
  const H = rows.length * rowH + 4
  const hvn = p.bins.filter((b) => b.node === 'hvn').map((b) => fmtIN(b.mid))
  const lvn = p.bins.filter((b) => b.node === 'lvn').map((b) => fmtIN(b.mid))
  const yOf = (price: number) => 2 + ((rows[0].hi - price) / p.step) * rowH
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,13rem)] lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,13rem)]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full max-w-[26rem]" role="img" aria-label={`Volume profile from ${vis} bars. Point of control ${fmtIN(p.poc.mid)}. Value area ${fmtIN(p.val)} to ${fmtIN(p.vah)}, ${Math.round(p.valueShare * 100)} percent of volume.`}>
        {rows.map((b, i) => {
          const w = Math.max(1, (b.vol / maxVol) * barMax)
          const isPoc = b === p.poc || b.lo === p.poc?.lo
          const y = 2 + i * rowH
          return (
            <g key={b.lo}>
              <text x={labelW - 6} y={y + 9.5} textAnchor="end" fontSize={9} fill="#929DA9" fontFamily={MONO}>{fmtIN(b.lo)}</text>
              <rect x={labelW} y={y + 1} width={w} height={rowH - 2.5} rx={1.5} fill={isPoc ? '#C9A86A' : '#8FB4D9'} opacity={isPoc ? 1 : b.inValue ? 0.62 : 0.28} />
              {b.node && <text x={labelW + w + 5} y={y + 9.5} fontSize={8.5} fill={b.node === 'hvn' ? '#C9A86A' : '#929DA9'} fontFamily={MONO}>{b.node.toUpperCase()}</text>}
              {isPoc && <text x={W - 4} y={y + 9.5} textAnchor="end" fontSize={8.5} fill="#C9A86A" fontFamily={MONO}>POC</text>}
            </g>
          )
        })}
        {[RESISTANCE, SUPPORT].map((lv) => (lv <= rows[0].hi && lv >= rows[rows.length - 1].lo ? (
          <line key={lv} x1={labelW} x2={W} y1={yOf(lv)} y2={yOf(lv)} stroke="#F4F7FA" strokeOpacity={0.5} strokeDasharray="3 3" />
        ) : null))}
      </svg>
      <dl className="grid content-start gap-3 text-[0.8rem]">
        {[
          ['POC', fmtIN(p.poc.mid), 'Price bin with the most volume'],
          ['Value area', `${fmtIN(p.val)}–${fmtIN(p.vah)}`, `${Math.round(p.valueShare * 100)}% of volume`],
          ['Total volume', fmtCompactIN(p.total), `${vis} bars`],
        ].map(([k, v, s]) => (
          <div key={k}>
            <dt className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-3">{k}</dt>
            <dd className="num text-[1.05rem] text-fg">{v}</dd>
            <dd className="text-[0.72rem] text-fg-3">{s}</dd>
          </div>
        ))}
        <div>
          <dt className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-fg-3">HVN / LVN</dt>
          <dd className="text-[0.74rem] leading-snug text-fg-2">High-volume nodes: {hvn.length ? hvn.join(', ') : 'none yet'}. Low-volume nodes: {lvn.length ? lvn.join(', ') : 'none yet'}.</dd>
        </div>
      </dl>
    </div>
  )
}
