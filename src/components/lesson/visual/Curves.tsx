import { useMemo, type ReactNode } from 'react'
import { chart } from '@/lib/chartTheme'
import { fmtIN } from '@/lib/format'
import { bs, ncdf, npdf } from '@/lib/bs'
import { gaussian, mulberry32 } from '@/lib/rng'
import { FG, Frame, Legend, Tag, signed, type Spec } from './shared'
import { Plot, pathOf, type PlotGeom, type Series } from './Plot'
import { PayoffPlot } from './Payoff'

type CurveName = Spec<'curve'>['curve']

const S0 = 24000
const R = 0.065
const IV = 0.14
const T30 = 30 / 365
const T7 = 7 / 365
const spots = (lo: number, hi: number, n = 120) => Array.from({ length: n + 1 }, (_, i) => lo + ((hi - lo) * i) / n)
const sample = (xs: number[], f: (x: number) => number): [number, number][] => xs.map((x) => [x, f(x)])
const extent = (ss: Series[]): [number, number] => {
  const ys = ss.flatMap((s) => s.pts.map((p) => p[1]))
  const lo = Math.min(...ys)
  const hi = Math.max(...ys)
  const pad = (hi - lo || 1) * 0.1
  return [lo - pad, hi + pad]
}

interface Built {
  label: string
  note: string
  legend?: { name: string; color: string; dash?: string }[]
  node: ReactNode
}

const SPOT_X = { xDomain: [22500, 25500] as [number, number], xFmt: (v: number) => fmtIN(v), xLabel: 'Nifty spot (strike 24,000)' }

function spotMarker(g: PlotGeom, text = `Strike ${fmtIN(S0)}`): ReactNode {
  return (
    <g>
      <line x1={g.sx(S0)} x2={g.sx(S0)} y1={g.y0} y2={g.y1} stroke={chart.gold} strokeDasharray="4 4" strokeOpacity={0.8} />
      <Tag x={g.sx(S0)} y={g.y0 + 10} text={text} color={chart.gold} bounds={[g.x0, g.x1]} />
    </g>
  )
}

/** Deterministic illustrative equity path (seeded), plus peak/trough of its worst drawdown. */
function equityPath(seed: number, n: number, drift: number, vol: number) {
  const rng = mulberry32(seed)
  const eq: [number, number][] = []
  let e = 100
  for (let i = 0; i <= n; i++) {
    eq.push([i, e])
    e *= 1 + drift + vol * gaussian(rng)
  }
  let peak = eq[0][1]
  let peakI = 0
  let worst = 0
  let wp = 0
  let wt = 0
  const dd: [number, number][] = eq.map(([i, v]) => {
    if (v > peak) {
      peak = v
      peakI = i
    }
    const d = (v / peak - 1) * 100
    if (d < worst) {
      worst = d
      wp = peakI
      wt = i
    }
    return [i, d]
  })
  return { eq, dd, worst, wp, wt }
}

function build(curve: CurveName): Built {
  switch (curve) {
    case 'delta': {
      const xs = spots(22500, 25500)
      const call = sample(xs, (s) => bs('CE', s, S0, T30, R, IV).delta)
      const put = sample(xs, (s) => bs('PE', s, S0, T30, R, IV).delta)
      const series: Series[] = [
        { name: 'Call delta', pts: call, color: chart.ice },
        { name: 'Put delta', pts: put, color: chart.gold, dash: '6 4' },
      ]
      return {
        label: 'Delta against spot for a 24,000 strike with 30 days left. Call delta rises from 0 to 1 and put delta falls from 0 to minus 1; both are near 0.5 in size at the strike.',
        note: 'Delta is the option price change per 1 point move in Nifty. It grows toward 1 as the option goes deeper in the money. It is not a promise of the probability of expiring in the money.',
        legend: series.map(({ name, color, dash }) => ({ name, color, dash })),
        node: <Plot {...SPOT_X} yDomain={[-1.1, 1.1]} yFmt={(v) => v.toFixed(1)} yLabel="Delta" zeroLine series={series} over={(g) => spotMarker(g)} />,
      }
    }
    case 'gamma': {
      const xs = spots(22500, 25500)
      const f = (T: number) => sample(xs, (s) => bs('CE', s, S0, T, R, IV).gamma * 1000)
      const series: Series[] = [
        { name: '30 days to expiry', pts: f(T30), color: chart.ice },
        { name: '7 days to expiry', pts: f(T7), color: chart.gold },
      ]
      return {
        label: 'Gamma against spot. It peaks at the strike and the peak is much taller and narrower with 7 days left than with 30 days left.',
        note: 'Gamma is how fast delta changes. It is highest at the money and rises sharply close to expiry, so delta can swing quickly near the strike.',
        legend: series.map(({ name, color }) => ({ name, color })),
        node: <Plot {...SPOT_X} yDomain={[0, extent(series)[1]]} yFmt={(v) => v.toFixed(1)} yLabel="Gamma (× 1000)" series={series} over={(g) => spotMarker(g)} />,
      }
    }
    case 'theta': {
      const days = Array.from({ length: 59 }, (_, i) => 30 - (29.5 * i) / 58)
      const pts = sample(days, (d) => bs('CE', S0, S0, d / 365, R, IV).theta)
      const series: Series[] = [{ name: 'At-the-money option, per-day decay', pts, color: chart.ice }]
      return {
        label: 'Theta of an at-the-money option against days left. Daily time decay is small with 30 days left and grows steeply in the last few days.',
        note: 'Read right to left: time passes. Time value does not melt in a straight line; the daily loss for the option buyer accelerates into expiry.',
        legend: series.map(({ name, color }) => ({ name, color })),
        node: <Plot xDomain={[30, 0]} yDomain={extent(series)} xFmt={(v) => `${v}d`} yFmt={(v) => signed(v)} xLabel="Days to expiry (time passes →)" yLabel="Theta (₹ per day)" series={series} />,
      }
    }
    case 'vega': {
      const xs = spots(22500, 25500)
      const f = (T: number) => sample(xs, (s) => bs('CE', s, S0, T, R, IV).vega)
      const series: Series[] = [
        { name: '30 days to expiry', pts: f(T30), color: chart.ice },
        { name: '7 days to expiry', pts: f(T7), color: chart.gold },
      ]
      return {
        label: 'Vega against spot. Sensitivity to implied volatility peaks at the strike and is larger when more time remains.',
        note: 'Vega is the price change for a 1 point change in implied volatility. It is largest at the money and for longer-dated options.',
        legend: series.map(({ name, color }) => ({ name, color })),
        node: <Plot {...SPOT_X} yDomain={[0, extent(series)[1]]} yFmt={(v) => v.toFixed(0)} yLabel="Vega (₹ per 1 IV point)" series={series} over={(g) => spotMarker(g)} />,
      }
    }
    case 'timeValue': {
      const xs = spots(22500, 25500)
      const prem = sample(xs, (s) => bs('CE', s, S0, T30, R, IV).price)
      const intr = sample(xs, (s) => Math.max(s - S0, 0))
      const series: Series[] = [
        { name: 'Call premium', pts: prem, color: chart.ice },
        { name: 'Intrinsic value', pts: intr, color: chart.gold, dash: '6 4' },
      ]
      return {
        label: 'Call premium against spot, split into intrinsic value and time value. The gap between the two lines is time value; it is widest at the money and shrinks in and out of the money.',
        note: 'Premium = intrinsic value + time value. The shaded gap is time value: biggest at the money, small deep in or far out of the money, and zero at expiry.',
        legend: [...series.map(({ name, color, dash }) => ({ name, color, dash })), { name: 'Time value (shaded)', color: 'rgba(201,168,106,0.45)' }],
        node: (
          <Plot
            {...SPOT_X}
            yDomain={[0, extent(series)[1]]}
            yFmt={(v) => fmtIN(v)}
            yLabel="Option value (₹ per unit)"
            series={series}
            under={(g) => (
              <path d={`${pathOf(prem, g.sx, g.sy)}${[...intr].reverse().map(([x, y]) => `L${g.sx(x).toFixed(1)} ${g.sy(y).toFixed(1)}`).join('')}Z`} fill={chart.gold} fillOpacity={0.16} />
            )}
            over={(g) => <Tag x={g.sx(S0)} y={g.sy(bs('CE', S0, S0, T30, R, IV).price) - 20} text="Time value peaks ATM" color={chart.gold} bounds={[g.x0, g.x1]} />}
          />
        ),
      }
    }
    case 'iv-smile': {
      const ks = spots(22000, 26000, 80)
      const iv = (k: number) => 13 + 1.1e-6 * (k - S0) ** 2 - 0.0009 * (k - S0)
      const series: Series[] = [{ name: 'Implied volatility by strike', pts: sample(ks, iv), color: chart.ice }]
      return {
        label: 'Stylised implied volatility smile or skew across strikes. Implied volatility is lowest near the money and higher for far out-of-the-money options, more so on the put side.',
        note: 'Illustrative shape only. Far strikes usually carry higher implied volatility than the at-the-money strike, and index options often show a heavier downside (put) side.',
        legend: series.map(({ name, color }) => ({ name, color })),
        node: <Plot xDomain={[22000, 26000]} yDomain={[11, 22]} xFmt={(v) => fmtIN(v)} yFmt={(v) => `${v}%`} xLabel="Strike" yLabel="Implied volatility" series={series} over={(g) => <Tag x={g.sx(S0)} y={g.sy(iv(S0)) + 22} text="ATM" color={chart.gold} bounds={[g.x0, g.x1]} />} />,
      }
    }
    case 'payoff-call':
    case 'payoff-put': {
      const call = curve === 'payoff-call'
      const legs = [{ type: call ? ('CE' as const) : ('PE' as const), side: 1 as const, strike: S0, premium: 200 }]
      return {
        label: call
          ? 'Expiry payoff of a long 24,000 call bought at 200. Loss is limited to the 200 premium below the strike; profit grows point for point above breakeven at 24,200.'
          : 'Expiry payoff of a long 24,000 put bought at 200. Loss is limited to the 200 premium above the strike; profit grows point for point below breakeven at 23,800.',
        note: call ? 'The buyer risks only the premium. Profit starts after the breakeven, strike plus premium.' : 'The buyer risks only the premium. Profit starts after the breakeven, strike minus premium.',
        legend: [{ name: 'Payoff at expiry', color: FG }, { name: 'Spot', color: chart.gold, dash: '4 4' }],
        node: <PayoffPlot legs={legs} spot={S0} />,
      }
    }
    case 'normal': {
      const xs = Array.from({ length: 121 }, (_, i) => -3 + (6 * i) / 120)
      const pts = sample(xs, npdf)
      const band = (k: number) => {
        const sub = pts.filter(([x]) => Math.abs(x) <= k)
        return (g: PlotGeom) => `${pathOf(sub, g.sx, g.sy)}L${g.sx(sub[sub.length - 1][0]).toFixed(1)} ${g.sy(0).toFixed(1)}L${g.sx(sub[0][0]).toFixed(1)} ${g.sy(0).toFixed(1)}Z`
      }
      const b1 = band(1)
      const b2 = band(2)
      const series: Series[] = [{ name: 'Bell curve of returns', pts, color: chart.ice }]
      return {
        label: 'Normal distribution in standard deviation units. About 68 percent of outcomes fall within plus or minus 1 standard deviation and about 95 percent within plus or minus 2.',
        note: 'A 1σ move is the market-implied range for the period, not a ceiling. Real index returns have fatter tails than this idealised curve.',
        legend: [{ name: 'Probability density', color: chart.ice }, { name: '±1σ ≈ 68%', color: 'rgba(201,168,106,0.7)' }, { name: '±2σ ≈ 95%', color: 'rgba(143,180,217,0.55)' }],
        node: (
          <Plot
            xDomain={[-3, 3]}
            yDomain={[0, 0.44]}
            xTicks={[-3, -2, -1, 0, 1, 2, 3]}
            xFmt={(v) => (v === 0 ? '0' : `${v > 0 ? '+' : '−'}${Math.abs(v)}σ`)}
            yFmt={(v) => v.toFixed(1)}
            xLabel="Move from the mean (σ)"
            yLabel="Density"
            series={series}
            under={(g) => (
              <g>
                <path d={b2(g)} fill={chart.ice} fillOpacity={0.12} />
                <path d={b1(g)} fill={chart.gold} fillOpacity={0.2} />
              </g>
            )}
            over={(g) => (
              <g>
                <Tag x={g.sx(0)} y={g.sy(0.18)} text="≈68% within ±1σ" color={chart.gold} bounds={[g.x0, g.x1]} />
                <Tag x={g.sx(0)} y={g.sy(0.1)} text="≈95% within ±2σ" color={chart.ice} bounds={[g.x0, g.x1]} />
              </g>
            )}
          />
        ),
      }
    }
    case 'sCurve': {
      const xs = Array.from({ length: 121 }, (_, i) => -3 + (6 * i) / 120)
      const pts = sample(xs, (x) => ncdf(x) * 100)
      const series: Series[] = [{ name: 'Cumulative probability', pts, color: chart.ice }]
      return {
        label: 'S-shaped cumulative probability curve. It is flat in both tails and steepest at the middle: 50 percent at zero and about 84 percent at plus 1 standard deviation.',
        note: 'Outcomes bunch near the middle, so probability builds fastest there and slowly in the tails. Call delta across strikes has this same S shape.',
        legend: series.map(({ name, color }) => ({ name, color })),
        node: (
          <Plot
            xDomain={[-3, 3]}
            yDomain={[0, 100]}
            xTicks={[-3, -2, -1, 0, 1, 2, 3]}
            xFmt={(v) => (v === 0 ? '0' : `${v > 0 ? '+' : '−'}${Math.abs(v)}σ`)}
            yFmt={(v) => `${v}%`}
            xLabel="Move from the mean (σ)"
            yLabel="Cumulative probability"
            series={series}
            over={(g) => (
              <g>
                <circle cx={g.sx(0)} cy={g.sy(50)} r={4.5} fill="#0B1015" stroke={chart.gold} strokeWidth={2} />
                <Tag x={g.sx(0) + 12} y={g.sy(50) + 20} anchor="start" text="50% at the middle" color={chart.gold} bounds={[g.x0, g.x1]} />
              </g>
            )}
          />
        ),
      }
    }
    case 'drawdown':
    case 'equity': {
      const p = equityPath(curve === 'drawdown' ? 7 : 11, 120, 0.0012, 0.012)
      const sx0 = p.wp
      if (curve === 'equity') {
        const series: Series[] = [{ name: 'Simulated account value', pts: p.eq, color: chart.ice }]
        const [lo, hi] = extent(series)
        return {
          label: `Simulated equity curve starting at 100 and ending near ${p.eq[p.eq.length - 1][1].toFixed(0)}. It rises unevenly with pauses and dips along the way, including a drawdown of ${Math.abs(p.worst).toFixed(1)} percent.`,
          note: 'Illustrative, seeded simulation. Even a profitable account moves in steps with dips; judge it by how deep the dips go as well as where it ends.',
          legend: [{ name: 'Simulated account value', color: chart.ice }, { name: 'Starting capital', color: chart.gold, dash: '4 4' }],
          node: <Plot xDomain={[0, 120]} yDomain={[lo, hi]} xFmt={(v) => String(v)} yFmt={(v) => v.toFixed(0)} xLabel="Trade number" yLabel="Account value (start = 100)" series={series} under={(g) => <line x1={g.x0} x2={g.x1} y1={g.sy(100)} y2={g.sy(100)} stroke={chart.gold} strokeDasharray="4 4" strokeOpacity={0.8} />} over={(g) => <Tag x={g.sx(p.wt)} y={g.sy(p.eq[p.wt][1]) + 22} text={`Dip −${Math.abs(p.worst).toFixed(1)}%`} color={chart.bear} bounds={[g.x0, g.x1]} />} />,
        }
      }
      const series: Series[] = [{ name: 'Drawdown from last peak', pts: p.dd, color: chart.bear }]
      return {
        label: `Simulated drawdown curve: percentage below the previous account peak over 120 trades. The deepest drawdown is ${Math.abs(p.worst).toFixed(1)} percent.`,
        note: `A drawdown is the fall from the last peak. A ${Math.abs(p.worst).toFixed(0)}% loss needs about ${((1 / (1 + p.worst / 100) - 1) * 100).toFixed(0)}% gain to recover, so deep drawdowns get harder to climb out of.`,
        legend: [{ name: 'Drawdown from last peak', color: chart.bear }],
        node: (
          <Plot
            xDomain={[0, 120]}
            yDomain={[Math.min(p.worst * 1.15, -1), 1]}
            xFmt={(v) => String(v)}
            yFmt={(v) => `${v.toFixed(0)}%`}
            zeroLine
            xLabel="Trade number"
            yLabel="Below peak"
            series={series}
            under={(g) => <path d={`${pathOf(p.dd, g.sx, g.sy)}L${g.sx(120).toFixed(1)} ${g.sy(0).toFixed(1)}L${g.sx(0).toFixed(1)} ${g.sy(0).toFixed(1)}Z`} fill={chart.bear} fillOpacity={0.16} />}
            over={(g) => (
              <g>
                <circle cx={g.sx(p.wt)} cy={g.sy(p.worst)} r={4.5} fill="#0B1015" stroke={FG} strokeWidth={2} />
                <Tag x={g.sx(p.wt)} y={g.sy(p.worst) - 18} text={`Max drawdown −${Math.abs(p.worst).toFixed(1)}%`} bounds={[g.x0, g.x1]} />
                <line x1={g.sx(sx0)} x2={g.sx(sx0)} y1={g.sy(0)} y2={g.sy(0) + 6} stroke={FG} />
              </g>
            )}
          />
        ),
      }
    }
  }
}

export function CurveVisual({ spec }: { spec: Spec<'curve'> }) {
  const b = useMemo(() => build(spec.curve), [spec.curve])
  const simulated = spec.curve === 'drawdown' || spec.curve === 'equity'
  return (
    <Frame title={spec.title} caption={spec.caption} label={`${b.label} ${b.note}`} badge={simulated ? 'Simulated' : 'Illustrative'}>
      {b.node}
      {b.legend ? <Legend items={b.legend} /> : null}
      <p className="mt-2 text-[0.8rem] leading-relaxed text-fg-3">{b.note}</p>
      {!simulated ? <p className="sr-only">Black–Scholes model values, 14% implied volatility, 6.5% interest rate.</p> : null}
    </Frame>
  )
}

