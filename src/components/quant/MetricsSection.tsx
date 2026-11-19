import { useMemo } from 'react'
import { Info } from 'lucide-react'
import { Tex, Tip } from '@/components/ui'
import { fmtNum, fmtPct, fmtRupee } from '@/lib/format'
import { TRADES_PER_YEAR, computeMetrics, type Trade } from '@/lib/backtest'
import { CAPITAL, QSection, Stat, SyntheticBanner, sign } from './shared'

const I = () => <Info className="size-3.5 text-fg-3" aria-hidden />

export function MetricsSection({ trades }: { trades: Trade[] }) {
  const m = useMemo(() => computeMetrics(trades.map((t) => t.net), CAPITAL), [trades])
  const ratio = (n: number, dp = 2) => (Number.isFinite(n) ? fmtNum(n, dp) : n === Infinity ? '∞' : '—')

  const cells = [
    { label: 'Win rate', value: fmtPct(m.winRate, 1), sub: `${m.wins} wins · ${m.losses} losses`, tip: 'Share of trades with net P&L above zero. Meaningless without payoff size: a 40% win rate can profit and a 70% one can lose.', tex: String.raw`\frac{N_{win}}{N}` },
    { label: 'Average win', value: fmtRupee(m.avgWin), sub: 'Mean net P&L of winners', tone: 'bull' as const, tip: 'Average net profit on winning trades, after costs.', tex: String.raw`\overline{P}_{win}` },
    { label: 'Average loss', value: fmtRupee(-m.avgLoss), sub: 'Mean net P&L of losers', tone: 'bear' as const, tip: 'Average net loss on losing trades, after costs.', tex: String.raw`\overline{P}_{loss}` },
    { label: 'Profit factor', value: ratio(m.profitFactor), sub: 'Gross profit ÷ gross loss', tip: 'Above 1 means profits exceeded losses. A high value on few trades can be luck.', tex: String.raw`\frac{\sum P_{win}}{\left|\sum P_{loss}\right|}` },
    { label: 'Expectancy / trade', value: fmtRupee(m.expectancy), sub: 'Mean net P&L per trade', tone: sign(m.expectancy), tip: 'Average net rupees per trade. The number that must stay positive after costs.', tex: String.raw`E = w\,\overline{W} - (1-w)\,\overline{L}` },
    { label: 'Risk-reward', value: ratio(m.riskReward), sub: 'Average win ÷ average loss', tip: 'Payoff ratio. Pair it with win rate: break-even win rate is 1 ÷ (1 + RR) before costs.', tex: String.raw`RR = \overline{W}/\overline{L}` },
    { label: 'Max drawdown ₹', value: fmtRupee(-m.maxDD), sub: 'Deepest fall from an equity peak', tone: 'bear' as const, tip: 'Largest peak-to-trough fall of the equity curve in rupees.', tex: String.raw`\max_t\,(\text{Peak}_t - \text{Equity}_t)` },
    { label: 'Max drawdown %', value: fmtPct(-m.maxDDPct, 1), sub: `On ${fmtRupee(CAPITAL)} starting capital`, tone: 'bear' as const, tip: 'Same fall as a percentage of the peak equity it fell from.', tex: String.raw`\max_t \frac{\text{Peak}_t-\text{Equity}_t}{\text{Peak}_t}` },
    { label: 'Sharpe (annualised)', value: ratio(m.sharpe), sub: `√${TRADES_PER_YEAR} scaling · rf = 0`, tip: `Per-trade return ÷ its standard deviation, scaled by √${TRADES_PER_YEAR} on the assumption of about one trade per trading day. Risk-free rate is taken as 0.`, tex: String.raw`\frac{\bar r}{\sigma_r}\sqrt{250}` },
    { label: 'Sortino (annualised)', value: ratio(m.sortino), sub: 'Downside deviation only', tip: 'Like Sharpe, but only below-zero returns count as risk. Same annualisation and zero risk-free rate.', tex: String.raw`\frac{\bar r}{\sigma_{down}}\sqrt{250}` },
    { label: 'Longest win streak', value: String(m.maxWinStreak), sub: 'Consecutive winning trades', tip: 'Streaks in random data are common. Do not read skill into them.' },
    { label: 'Longest loss streak', value: String(m.maxLossStreak), sub: 'Consecutive losing trades', tone: 'bear' as const, tip: 'Size your capital for the losing run you can tolerate, not the average.' },
  ]

  return (
    <QSection id="metrics" tint eyebrow="24.5 — Performance metrics" title={<>Eleven numbers, <span className="text-gold-gradient">each with a blind spot</span></>} lead="Computed live from the trades in the studio above. Change the inputs there and every cell here updates.">
      <SyntheticBanner />
      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line lg:grid-cols-4">
        {cells.map((c) => (
          <Stat key={c.label} label={c.label} value={c.value} sub={c.sub} tone={c.tone} tip={<Tip content={c.tip} side="bottom"><span className="inline-flex" aria-label={`About ${c.label}`}><I /></span></Tip>} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="glass-solid overflow-x-auto p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold">Formulas</h3>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {cells.filter((c) => c.tex).map((c) => (
              <li key={c.label} className="min-w-0 border-t border-line pt-3">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg-2">{c.label}</div>
                <div className="mt-1 overflow-x-auto text-[0.95rem]"><Tex>{c.tex as string}</Tex></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-[0.9rem] leading-relaxed text-fg-2">
          <h3 className="font-display text-lg font-semibold text-fg">Read the assumptions before the ratios</h3>
          <p><strong className="text-fg">Annualisation.</strong> Sharpe and Sortino use per-trade returns on a fixed {fmtRupee(CAPITAL)} base, a zero risk-free rate and an assumed {TRADES_PER_YEAR} trades a year. If your strategy trades less often, that scaling flatters the ratio.</p>
          <p><strong className="text-fg">Drawdown is path-dependent.</strong> The same trades in a different order give a different maximum drawdown. The Monte Carlo section below shows by how much.</p>
          <p><strong className="text-fg">Sample size.</strong> {m.n} trades is a small sample. Ratios from a few dozen trades carry wide error bars, and a high Sharpe from random data is not evidence of an edge.</p>
        </div>
      </div>
    </QSection>
  )
}
