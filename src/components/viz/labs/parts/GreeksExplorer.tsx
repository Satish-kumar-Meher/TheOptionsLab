import { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts'
import { ChartContainer, Tabs } from '@/components/ui'
import { axisProps, chart, gridProps, tooltipStyle } from '@/lib/chartTheme'
import { bs, type Greeks, type OptType } from '@/lib/bs'
import { fmtIN, fmtNum } from '@/lib/format'
import { Takeaways } from './LabKit'

type GreekKey = 'delta' | 'gamma' | 'theta' | 'vega' | 'rho'
export interface GreekInputs { type: OptType; spot: number; strike: number; dte: number; iv: number; rate: number; g: Greeks }

interface LineDef { key: string; name: string; color: string; dash?: string }
interface ChartSpec {
  data: Record<string, number>[]
  lines: LineDef[]
  xLabel: string
  xDomain: [number, number]
  xFmt: (v: number) => string
  yFmt: (v: number) => string
  markerX: number
  markerY: number
  markerKey: string
  reversed?: boolean
  title: string
  subtitle: string
  summary: string
}

const TABS: { id: GreekKey; label: string }[] = [
  { id: 'delta', label: 'Delta Δ' },
  { id: 'gamma', label: 'Gamma Γ' },
  { id: 'theta', label: 'Theta Θ' },
  { id: 'vega', label: 'Vega ν' },
  { id: 'rho', label: 'Rho ρ' },
]

const SPOT_MIN = 22000
const SPOT_MAX = 26000

function build(tab: GreekKey, p: GreekInputs): ChartSpec {
  const { type, spot, strike, dte, iv, rate, g } = p
  const T = dte / 365
  const T1 = Math.min(1, dte) / 365
  const showOneDay = Math.abs(dte - 1) > 0.05
  const oneLabel = '1 day to expiry'
  const dteLabel = `${fmtNum(dte, dte < 10 ? 1 : 0)} days to expiry`

  if (tab === 'delta' || tab === 'gamma') {
    const data: Record<string, number>[] = []
    for (let s = SPOT_MIN; s <= SPOT_MAX; s += 40) {
      const a = bs(type, s, strike, T, rate, iv)
      const b = bs(type, s, strike, T1, rate, iv)
      data.push({ x: s, a: tab === 'delta' ? a.delta : a.gamma, b: tab === 'delta' ? b.delta : b.gamma })
    }
    const lines: LineDef[] = [{ key: 'a', name: dteLabel, color: chart.gold }]
    if (showOneDay) lines.push({ key: 'b', name: oneLabel, color: chart.ice, dash: '5 4' })
    const isDelta = tab === 'delta'
    return {
      data, lines, xLabel: 'Spot (Nifty)', xDomain: [SPOT_MIN, SPOT_MAX], xFmt: (v) => fmtIN(v), yFmt: (v) => v.toFixed(isDelta ? 2 : 4),
      markerX: spot, markerY: isDelta ? g.delta : g.gamma, markerKey: 'a',
      title: isDelta ? 'Delta against spot' : 'Gamma against spot',
      subtitle: isDelta ? `Strike ${fmtIN(strike)} ${type}. The dot is your current inputs; the dashed curve shows how much steeper delta gets with one day left.` : `Strike ${fmtIN(strike)} ${type}. Gamma peaks at the money and sharpens into a spike as expiry approaches.`,
      summary: isDelta ? `Delta of the ${type} runs from ${type === 'CE' ? '0 to +1' : '−1 to 0'} as spot moves across the strike.` : 'Gamma is highest when spot is near the strike and falls away on both sides.',
    }
  }
  if (tab === 'theta') {
    const step = type === 'CE' ? 1 : -1
    const atm = Math.round(spot / 50) * 50
    const ks = [atm, atm + step * 100, atm + step * 200]
    const data: Record<string, number>[] = []
    const N = 70
    for (let i = 0; i <= N; i++) {
      const d = Math.max(0.1, 60 * Math.pow(i / N, 2))
      const row: Record<string, number> = { x: Number(d.toFixed(3)) }
      ks.forEach((k, j) => { row[`k${j}`] = bs(type, spot, k, d / 365, rate, iv).theta })
      data.push(row)
    }
    const markY = bs(type, spot, ks[0], dte / 365, rate, iv).theta
    return {
      data, reversed: true, xLabel: 'Days to expiry (time passes left → right)', xDomain: [0, 60], xFmt: (v) => `${Math.round(v)}d`, yFmt: (v) => v.toFixed(0),
      lines: [
        { key: 'k0', name: `ATM ${fmtIN(ks[0])}`, color: chart.gold },
        { key: 'k1', name: `OTM ${fmtIN(ks[1])}`, color: chart.ice },
        { key: 'k2', name: `OTM ${fmtIN(ks[2])}`, color: chart.fg2, dash: '5 4' },
      ],
      markerX: dte, markerY: markY, markerKey: 'k0',
      title: 'Theta decay against days to expiry', subtitle: 'Rupees of premium lost per calendar day (per unit), for the at-the-money strike and two strikes further out of the money. Spot, IV and rate are held at your inputs.',
      summary: 'ATM theta grows steeper as expiry approaches; OTM options lose fewer rupees per day but a larger share of their small premium.',
    }
  }
  if (tab === 'vega') {
    const data: Record<string, number>[] = []
    for (let v = 6; v <= 40; v += 0.5) {
      data.push({ x: v, a: bs(type, spot, strike, T, rate, v / 100).vega, b: bs(type, spot, strike, T1, rate, v / 100).vega })
    }
    const lines: LineDef[] = [{ key: 'a', name: dteLabel, color: chart.gold }]
    if (showOneDay) lines.push({ key: 'b', name: oneLabel, color: chart.ice, dash: '5 4' })
    return {
      data, lines, xLabel: 'Implied volatility (%)', xDomain: [6, 40], xFmt: (v) => `${v}%`, yFmt: (v) => v.toFixed(1),
      markerX: iv * 100, markerY: g.vega, markerKey: 'a',
      title: 'Vega against implied volatility', subtitle: `Rupees gained or lost per 1-point IV change for the ${fmtIN(strike)} ${type}, spot ${fmtIN(spot)}.`,
      summary: 'Vega is largest for longer-dated options near the money and shrinks sharply with little time left.',
    }
  }
  const data: Record<string, number>[] = []
  for (let r = 0; r <= 12; r += 0.25) data.push({ x: r, a: bs(type, spot, strike, T, r / 100, iv).rho })
  return {
    data, lines: [{ key: 'a', name: dteLabel, color: chart.gold }], xLabel: 'Interest rate (%)', xDomain: [0, 12], xFmt: (v) => `${v}%`, yFmt: (v) => v.toFixed(2),
    markerX: rate * 100, markerY: g.rho, markerKey: 'a',
    title: 'Rho against interest rate', subtitle: `Rupees gained or lost per 1-point change in the interest rate for the ${fmtIN(strike)} ${type}.`,
    summary: `Rho for the ${type} is ${type === 'CE' ? 'positive' : 'negative'} and very small for short-dated index options.`,
  }
}

function takeaways(tab: GreekKey, p: GreekInputs): string[] {
  const { type, dte, g } = p
  switch (tab) {
    case 'delta':
      return [
        `Delta is roughly the rupees the premium moves for each 1-point move in Nifty. Yours is ${fmtNum(g.delta, 2)}, so a 100-point move shifts the premium by about ₹${fmtNum(Math.abs(g.delta) * 100, 0)}.`,
        `A CE delta runs from 0 to +1 and a PE delta from −1 to 0. At the money it sits near ±0.5; deep in the money the option tracks the index almost one-for-one.`,
        'Buyers hold the delta as directional exposure; sellers hold the opposite sign. A far-OTM option barely reacts until spot moves toward the strike.',
        'Delta is sometimes read as a rough, model-based chance of finishing in the money. Treat that as an approximation, not a forecast.',
      ]
    case 'gamma':
      return [
        `Gamma is how fast delta itself changes. Yours is ${fmtNum(g.gamma, 5)} per point: delta shifts by about ${fmtNum(g.gamma * 100, 3)} for a 100-point move.`,
        `It peaks at the money and fades on both sides. With ${fmtNum(dte, dte < 10 ? 1 : 0)} days left versus 1 day, compare the two curves: the spike gets taller and narrower.`,
        'Buyers are long gamma: the position gains delta in their favour as the move extends. Sellers are short gamma: delta can turn against them quickly, which is why expiry-day risk can feel abrupt.',
        'Gamma and theta travel together: the options with the most gamma also tend to lose the most time value each day.',
      ]
    case 'theta':
      return [
        `Theta is premium lost per calendar day from time passing alone. Yours is ₹${fmtNum(Math.abs(g.theta), 2)} per unit per day, all else equal.`,
        'Decay is not a straight line. At-the-money options lose rupees faster the closer expiry gets, while OTM options lose less in rupees but a larger share of what they are worth.',
        'Buyers pay theta and need movement, or an IV rise, to outrun it. Sellers collect it but accept gamma and gap risk in exchange; it is not free income.',
        'The model charges decay by calendar day, so weekends and holidays are priced in gradually rather than all at once in this simulation.',
      ]
    case 'vega':
      return [
        `Vega is the premium change for a 1-point change in IV. Yours is ₹${fmtNum(g.vega, 2)} per unit, so a 3-point IV rise adds roughly ₹${fmtNum(g.vega * 3, 1)} (both CE and PE gain when IV rises).`,
        'Vega is greatest near the money and for longer-dated options. With little time left there is less time for volatility to matter, so vega shrinks.',
        'Buyers are long vega: an IV fall, or IV crush after an event, can cut the premium even when direction was right. Sellers are short vega.',
        'IV is the market’s price for expected movement, not a prediction of direction.',
      ]
    default:
      return [
        `Rho is the premium change for a 1-point change in the interest rate. Yours is ₹${fmtNum(g.rho, 3)} per unit.`,
        `A CE has positive rho and a PE negative rho in this model, because carrying cost shifts the forward price.`,
        'For weekly index options the effect is tiny next to delta, theta and vega. It grows with time to expiry, so longer-dated contracts feel it more.',
        `Rates move rarely and in small steps, so rho is usually the least actionable Greek for ${type === 'CE' ? 'short-dated calls' : 'short-dated puts'}.`,
      ]
  }
}

export function GreeksExplorer(props: GreekInputs) {
  const [tab, setTab] = useState<GreekKey>('delta')
  const { type, spot, strike, dte, iv, rate } = props
  const spec = useMemo(() => build(tab, props), [tab, type, spot, strike, dte, iv, rate]) // eslint-disable-line react-hooks/exhaustive-deps
  const notes = takeaways(tab, props)
  return (
    <div className="flex flex-col gap-4">
      <Tabs ariaLabel="Choose a Greek" size="sm" value={tab} onChange={(id) => setTab(id as GreekKey)} tabs={TABS} className="self-start max-w-full" />
      <div role="tabpanel" aria-label={`${tab} explorer`} className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <ChartContainer title={spec.title} subtitle={spec.subtitle} height={300} footer={<span className="sr-only">{spec.summary}</span>}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spec.data} margin={{ top: 12, right: 16, bottom: 18, left: 0 }} accessibilityLayer>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="x" type="number" domain={spec.xDomain} reversed={spec.reversed} tickFormatter={spec.xFmt} {...axisProps} tickCount={6} label={{ value: spec.xLabel, position: 'insideBottom', offset: -12, fill: chart.fg2, fontSize: 11 }} allowDataOverflow />
              <YAxis tickFormatter={spec.yFmt} {...axisProps} width={52} domain={['auto', 'auto']} />
              <RTooltip {...tooltipStyle} formatter={(v, n) => [spec.yFmt(Number(v)), String(n)]} labelFormatter={(l) => `${spec.xLabel.split(' (')[0]}: ${spec.xFmt(Number(l))}`} />
              {spec.lines.map((l) => (
                <Line key={l.key} dataKey={l.key} name={l.name} type="monotone" stroke={l.color} strokeWidth={2} strokeDasharray={l.dash} dot={false} isAnimationActive={false} />
              ))}
              <ReferenceLine x={spec.markerX} stroke={chart.fg2} strokeDasharray="3 4" />
              <ReferenceDot x={spec.markerX} y={spec.markerY} r={6} fill={chart.fg} stroke="#0b1015" strokeWidth={2} ifOverflow="extendDomain" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-line bg-surface/40 p-5 sm:p-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.72rem] text-fg-2" aria-label="Chart legend">
            {spec.lines.map((l) => (
              <li key={l.key} className="inline-flex items-center gap-2">
                <svg width="22" height="6" aria-hidden><line x1="0" y1="3" x2="22" y2="3" stroke={l.color} strokeWidth="2" strokeDasharray={l.dash} /></svg>
                {l.name}
              </li>
            ))}
            <li className="inline-flex items-center gap-2"><span aria-hidden className="size-2.5 rounded-full bg-fg" />Your inputs</li>
          </ul>
          <Takeaways items={notes} />
          <span className="sr-only">Current {tab} value {fmtNum(spec.markerY, 4)} at {spec.xFmt(spec.markerX)}.</span>
        </div>
      </div>
    </div>
  )
}
