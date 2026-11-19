import {
  type CalcDef, NUM, SIDE_BS, Row, Rows, Hint, Note, bad,
  r2, r0, dp, pct, money, signed, pnlTone, LOT_DEFAULT,
} from './calcKit'

const LOT_NOTE = 'Lot size is editable; check the current NSE contract specification.'

export type IdsB = 'hedge-ratio' | 'basis-fair-value' | 'charges' | 'position-size' | 'risk-reward' | 'drawdown-recovery' | 'pivot-levels' | 'put-call-parity' | 'index-weight' | 'return-calc' | 'spread-cost' | 'portfolio-delta' | 'straddle-move' | 'kelly'

export const DEFS_B: Record<IdsB, CalcDef> = {
  'hedge-ratio': {
    title: 'Beta hedge ratio',
    blurb: 'How many index futures contracts offset a portfolio’s market exposure.',
    defaults: { portfolio: 5000000, beta: 1.1, futuresNotional: 24000 * LOT_DEFAULT },
    fields: [NUM('portfolio', 'Portfolio value (₹)'), NUM('beta', 'Portfolio beta vs the index'), NUM('futuresNotional', 'Notional of ONE futures contract (₹)', 'Futures price × lot size. ' + LOT_NOTE)],
    formula: 'Contracts to sell ≈ (portfolio value × beta) ÷ notional of one futures contract',
    caveat: 'Beta is estimated from history and drifts. You cannot trade fractional contracts, so a hedge is rarely exact, and it hedges index moves only, not stock-specific risk. Margin and rollover costs apply.',
    result: (c) => {
      const e = bad(c, { portfolio: 'pos', beta: 'nonneg', futuresNotional: 'pos' })
      if (e) return e
      const exact = (c.n('portfolio') * c.n('beta')) / c.n('futuresNotional')
      const k = Math.round(exact)
      const hedged = k * c.n('futuresNotional')
      return (
        <Rows>
          <Row label="Exact contracts (short)" value={dp(exact, 2)} tone="gold" big />
          <Row label="Rounded to whole contracts" value={r0(k)} />
          <Row label="Exposure hedged" value={money(hedged)} />
          <Row label="Beta-adjusted exposure left" value={signed(c.n('portfolio') * c.n('beta') - hedged, (v) => money(v))} sub="± residual after rounding" />
        </Rows>
      )
    },
  },

  'basis-fair-value': {
    title: 'Futures fair value and basis',
    blurb: 'Cost-of-carry fair value versus the traded futures price.',
    defaults: { spot: 24000, futures: 24120, rate: 6.5, days: 30, dividend: 1.2 },
    fields: [NUM('spot', 'Index spot'), NUM('futures', 'Futures price'), NUM('rate', 'Risk-free rate (%)', undefined, 'rates'), NUM('days', 'Days to expiry'), NUM('dividend', 'Dividend yield (%)', undefined, 'rates')],
    formula: 'Fair value = spot × e^((r − dividend yield) × days / 365) · Basis = futures − spot · Mispricing = futures − fair value',
    caveat: 'A theoretical anchor. Real futures trade near it, not on it: transaction costs, borrowing limits, dividend timing and demand all move the gap, so an apparent mispricing is not automatically free profit.',
    result: (c) => {
      const e = bad(c, { spot: 'pos', futures: 'pos', rate: 'num', days: 'nonneg', dividend: 'nonneg' })
      if (e) return e
      const T = c.n('days') / 365
      const fair = c.n('spot') * Math.exp(((c.n('rate') - c.n('dividend')) / 100) * T)
      const basis = c.n('futures') - c.n('spot')
      const mis = c.n('futures') - fair
      return (
        <Rows>
          <Row label="Fair value" value={r2(fair)} tone="gold" big />
          <Row label="Basis (futures − spot)" value={`${basis < 0 ? '−' : '+'}${r2(Math.abs(basis))} pts`} />
          <Row label="Fair basis" value={`${fair - c.n('spot') < 0 ? '−' : '+'}${r2(Math.abs(fair - c.n('spot')))} pts`} tone="ice" />
          <Row label="Futures vs fair value" value={`${mis < 0 ? '−' : '+'}${r2(Math.abs(mis))} pts`} sub={mis > 0 ? 'Trading at a premium to fair value' : mis < 0 ? 'Trading at a discount to fair value' : 'At fair value'} />
        </Rows>
      )
    },
  },

  charges: {
    title: 'Trading charges estimator',
    blurb: 'Brokerage, STT, exchange fees, GST and stamp duty for an index option order.',
    defaults: { premium: 150, lotSize: LOT_DEFAULT, lots: 1, side: 'buy', brokerage: 20, sttPct: 0.1, exchPct: 0.03503, sebiPct: 0.0001, gstPct: 18, stampPct: 0.003 },
    fields: [
      NUM('premium', 'Premium (₹ per unit)'), NUM('lotSize', 'Lot size (units)', LOT_NOTE), NUM('lots', 'Lots'), SIDE_BS, NUM('brokerage', 'Brokerage per order (₹)'),
      NUM('sttPct', 'STT on sell premium (%)', undefined, 'rates'),
      NUM('exchPct', 'Exchange transaction charge (% of premium)', undefined, 'rates'),
      NUM('sebiPct', 'SEBI turnover fee (%)', undefined, 'rates'),
      NUM('gstPct', 'GST on brokerage + exchange + SEBI (%)', undefined, 'rates'),
      NUM('stampPct', 'Stamp duty on buy premium (%)', undefined, 'rates'),
    ],
    formula: 'Turnover = premium × units · STT (sell only) + exchange + SEBI + stamp (buy only) + brokerage + GST × (brokerage + exchange + SEBI)',
    caveat: 'Illustrative; verify current rates with your broker and the exchange. Rates are editable above and change from time to time. Excludes DP and other incidental charges.',
    result: (c) => {
      const e = bad(c, { premium: 'pos', lotSize: 'pos', lots: 'pos', brokerage: 'nonneg', sttPct: 'nonneg', exchPct: 'nonneg', sebiPct: 'nonneg', gstPct: 'nonneg', stampPct: 'nonneg' })
      if (e) return e
      const units = c.n('lotSize') * c.n('lots')
      const turnover = c.n('premium') * units
      const leg = (sell: boolean) => {
        const brk = c.n('brokerage')
        const exch = (turnover * c.n('exchPct')) / 100
        const sebi = (turnover * c.n('sebiPct')) / 100
        const gst = ((brk + exch + sebi) * c.n('gstPct')) / 100
        const stt = sell ? (turnover * c.n('sttPct')) / 100 : 0
        const stamp = sell ? 0 : (turnover * c.n('stampPct')) / 100
        return { brk, exch, sebi, gst, stt, stamp, total: brk + exch + sebi + gst + stt + stamp }
      }
      const one = leg(c.s('side') === 'sell')
      const rt = leg(false).total + leg(true).total
      return (
        <>
          <Rows>
            <Row label="Total charges, this order" value={money(one.total, 2)} tone="gold" big />
            <Row label="Brokerage" value={money(one.brk, 2)} />
            <Row label="STT" value={money(one.stt, 2)} />
            <Row label="Exchange + SEBI" value={money(one.exch + one.sebi, 2)} />
            <Row label="GST" value={money(one.gst, 2)} />
            <Row label="Stamp duty" value={money(one.stamp, 2)} />
            <Row label="Round trip (buy + sell, same price)" value={money(rt, 2)} tone="ice" sub={`≈ ${r2(rt / units)} pts per unit to break even on costs`} />
          </Rows>
        </>
      )
    },
  },

  'position-size': {
    title: 'Position size from risk',
    blurb: 'How many lots keep the loss at a stop within a fixed share of capital.',
    defaults: { capital: 500000, riskPct: 1, entry: 150, stop: 120, lotSize: LOT_DEFAULT },
    fields: [NUM('capital', 'Trading capital (₹)'), NUM('riskPct', 'Risk per trade (% of capital)'), NUM('entry', 'Entry price'), NUM('stop', 'Stop-loss price'), NUM('lotSize', 'Lot size (units)', LOT_NOTE)],
    formula: 'Risk budget = capital × risk % · Risk per lot = |entry − stop| × lot size · Lots = floor(budget ÷ risk per lot)',
    caveat: 'Assumes the stop fills at its price. Gaps and fast markets can fill worse, so the real loss can exceed the budget. A stop does not remove risk; it caps the planned one.',
    result: (c) => {
      const e = bad(c, { capital: 'pos', riskPct: 'pos', entry: 'pos', stop: 'pos', lotSize: 'pos' })
      if (e) return e
      const per = Math.abs(c.n('entry') - c.n('stop')) * c.n('lotSize')
      if (per === 0) return <Hint>Entry and stop are the same price, so the risk per lot is zero. Set a stop away from entry.</Hint>
      const budget = (c.n('capital') * c.n('riskPct')) / 100
      const lots = Math.floor(budget / per)
      return (
        <>
          <Rows>
            <Row label="Lots you can take" value={r0(lots)} tone="gold" big />
            <Row label="Risk budget" value={money(budget)} />
            <Row label="Risk per lot" value={money(per, 2)} />
            <Row label="Planned loss at stop" value={`${lots > 0 ? '▼ −' : ''}${money(lots * per, 2)}`} tone={lots > 0 ? 'bear' : 'fg'} />
            <Row label="Position value at entry" value={money(lots * c.n('entry') * c.n('lotSize'))} />
          </Rows>
          {lots === 0 && <Note tone="gold">Even one lot risks more than your budget. Reduce the stop distance, raise the risk budget, or skip the trade.</Note>}
        </>
      )
    },
  },

  'risk-reward': {
    title: 'Risk–reward and expectancy',
    blurb: 'Whether a win rate and payoff size add up to a positive average outcome.',
    defaults: { winRate: 45, avgWin: 3000, avgLoss: 1500 },
    fields: [NUM('winRate', 'Win rate (%)'), NUM('avgWin', 'Average win (₹)'), NUM('avgLoss', 'Average loss (₹, positive number)')],
    formula: 'R:R = avg win ÷ avg loss · Breakeven win rate = 1 ÷ (1 + R:R) · Expectancy = win% × avg win − loss% × avg loss',
    caveat: 'Based on past averages you supply. A small sample, a changing market or a few outsized trades can make an apparent edge disappear.',
    result: (c) => {
      const e = bad(c, { winRate: 'nonneg', avgWin: 'pos', avgLoss: 'pos' })
      if (e) return e
      if (c.n('winRate') > 100) return <Hint>Win rate cannot be more than 100%.</Hint>
      const w = c.n('winRate') / 100
      const rr = c.n('avgWin') / c.n('avgLoss')
      const be = (1 / (1 + rr)) * 100
      const ex = w * c.n('avgWin') - (1 - w) * c.n('avgLoss')
      return (
        <Rows>
          <Row label="Expectancy per trade" value={signed(ex, (v) => money(v, 2))} tone={pnlTone(ex)} big />
          <Row label="Reward : risk" value={`${dp(rr, 2)} : 1`} tone="gold" />
          <Row label="Breakeven win rate" value={pct(be, 1)} tone="ice" />
          <Row label="Your win rate vs breakeven" value={`${c.n('winRate') - be < 0 ? '−' : '+'}${dp(Math.abs(c.n('winRate') - be), 1)} pts`} />
        </Rows>
      )
    },
  },

  'drawdown-recovery': {
    title: 'Drawdown recovery',
    blurb: 'The gain needed to climb back after a loss — always larger than the loss.',
    defaults: { drawdownPct: 20 },
    fields: [NUM('drawdownPct', 'Drawdown (%)')],
    formula: 'Gain needed = 1 ÷ (1 − drawdown) − 1',
    caveat: 'Losses compound against a smaller base, which is why avoiding deep drawdowns matters more than chasing quick recovery.',
    result: (c) => {
      const e = bad(c, { drawdownPct: 'nonneg' })
      if (e) return e
      const d = c.n('drawdownPct')
      if (d >= 100) return <Hint>A 100% drawdown leaves nothing to grow back from. Enter a value below 100.</Hint>
      const need = (1 / (1 - d / 100) - 1) * 100
      const table = [5, 10, 20, 30, 40, 50, 60, 75, 90]
      return (
        <>
          <Rows>
            <Row label="Gain needed to recover" value={`▲ +${pct(need, 1)}`} tone="bull" big />
            <Row label="Drawdown" value={`▼ −${pct(d, 1)}`} tone="bear" />
          </Rows>
          <div className="mt-3 overflow-x-auto">
            <table className="num w-full min-w-[16rem] text-left text-[0.78rem]">
              <caption className="sr-only">Gain needed for common drawdowns</caption>
              <thead>
                <tr className="text-fg-3">
                  <th scope="col" className="py-1 pr-3 font-normal">Drawdown</th>
                  <th scope="col" className="py-1 font-normal">Gain needed</th>
                </tr>
              </thead>
              <tbody>
                {table.map((x) => (
                  <tr key={x} className="border-t border-line/60 text-fg-2">
                    <td className="py-1 pr-3">−{x}%</td>
                    <td className="py-1">+{pct((1 / (1 - x / 100) - 1) * 100, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )
    },
  },

  'pivot-levels': {
    title: 'Pivot levels',
    blurb: 'Classic floor-pivot support and resistance from the previous session.',
    defaults: { high: 24250, low: 23900, close: 24100 },
    fields: [NUM('high', 'Previous high'), NUM('low', 'Previous low'), NUM('close', 'Previous close')],
    formula: 'P = (H + L + C) ÷ 3 · R1 = 2P − L · S1 = 2P − H · R2 = P + (H − L) · S2 = P − (H − L) · R3 = H + 2(P − L) · S3 = L − 2(H − P)',
    caveat: 'Pivots are widely watched reference levels, not predictions. Price may respect, ignore or slice through them.',
    result: (c) => {
      const e = bad(c, { high: 'pos', low: 'pos', close: 'pos' })
      if (e) return e
      const H = c.n('high')
      const L = c.n('low')
      const C = c.n('close')
      if (H < L) return <Hint>The high should be at or above the low.</Hint>
      const P = (H + L + C) / 3
      return (
        <Rows>
          <Row label="R3" value={r2(H + 2 * (P - L))} tone="ice" />
          <Row label="R2" value={r2(P + (H - L))} tone="ice" />
          <Row label="R1" value={r2(2 * P - L)} tone="ice" />
          <Row label="Pivot (P)" value={r2(P)} tone="gold" big />
          <Row label="S1" value={r2(2 * P - H)} tone="ice" />
          <Row label="S2" value={r2(P - (H - L))} tone="ice" />
          <Row label="S3" value={r2(L - 2 * (H - P))} tone="ice" />
        </Rows>
      )
    },
  },

  'put-call-parity': {
    title: 'Put–call parity check',
    blurb: 'Compares call minus put with spot minus the discounted strike.',
    defaults: { spot: 24000, strike: 24000, days: 7, rate: 6.5, call: 150, put: 120 },
    fields: [NUM('spot', 'Index spot'), NUM('strike', 'Strike'), NUM('days', 'Days to expiry'), NUM('rate', 'Risk-free rate (%)', undefined, 'rates'), NUM('call', 'Call price (₹)'), NUM('put', 'Put price (₹)')],
    formula: 'C − P should equal S − K × e^(−r × days/365) · gap = (C − P) − (S − K × e^(−rT))',
    caveat: 'Holds for European options without dividends. Small gaps are normal: bid–ask spreads, charges, dividends and the futures-versus-spot choice all matter. A gap is not automatically an arbitrage.',
    result: (c) => {
      const e = bad(c, { spot: 'pos', strike: 'pos', days: 'nonneg', rate: 'num', call: 'nonneg', put: 'nonneg' })
      if (e) return e
      const T = c.n('days') / 365
      const lhs = c.n('call') - c.n('put')
      const rhs = c.n('spot') - c.n('strike') * Math.exp((-c.n('rate') / 100) * T)
      const gap = lhs - rhs
      return (
        <Rows>
          <Row label="Gap (C − P) − (S − PV(K))" value={`${gap < 0 ? '−' : '+'}${r2(Math.abs(gap))} pts`} tone="gold" big />
          <Row label="Call − put" value={r2(lhs)} />
          <Row label="Spot − discounted strike" value={r2(rhs)} />
          <Row label="Reading" value={Math.abs(gap) <= Math.max(1, c.n('spot') * 0.0002) ? 'Within normal tolerance' : gap > 0 ? 'Call rich vs put' : 'Put rich vs call'} tone="ice" />
        </Rows>
      )
    },
  },

  'index-weight': {
    title: 'Index weight contribution',
    blurb: 'How many index points one heavyweight stock’s move adds or removes.',
    defaults: { weight: 13, move: 2, indexLevel: 24000 },
    fields: [NUM('weight', 'Stock weight in index (%)'), NUM('move', 'Stock price move (%)'), NUM('indexLevel', 'Index level')],
    formula: 'Contribution (%) = weight × move · Points ≈ index level × weight % × move %',
    caveat: 'A first-order estimate that uses the weight at the start of the move; weights change with prices and free-float updates.',
    result: (c) => {
      const e = bad(c, { weight: 'nonneg', move: 'num', indexLevel: 'pos' })
      if (e) return e
      const w = c.n('weight')
      if (w > 100) return <Hint>Weight cannot be more than 100%.</Hint>
      const m = c.n('move')
      const contribPct = (w / 100) * m
      const pts = (c.n('indexLevel') * contribPct) / 100
      return (
        <Rows>
          <Row label="Index points" value={signed(pts, (v) => r2(v))} tone={pnlTone(pts)} big />
          <Row label="Index move from this stock" value={signed(contribPct, (v) => pct(v, 3))} tone={pnlTone(contribPct)} />
        </Rows>
      )
    },
  },

  'return-calc': {
    title: 'Return and CAGR',
    blurb: 'Absolute change, percentage return and annualised growth rate.',
    defaults: { start: 100000, end: 150000, years: 3 },
    fields: [NUM('start', 'Starting value'), NUM('end', 'Ending value'), NUM('years', 'Years held')],
    formula: 'Return = (end − start) ÷ start · CAGR = (end ÷ start)^(1 / years) − 1',
    caveat: 'CAGR smooths out the path; the ride in between may have included large drawdowns. Past returns do not indicate future ones.',
    result: (c) => {
      const e = bad(c, { start: 'pos', end: 'nonneg', years: 'pos' })
      if (e) return e
      const ch = c.n('end') - c.n('start')
      const ret = (ch / c.n('start')) * 100
      const cagr = (Math.pow(c.n('end') / c.n('start'), 1 / c.n('years')) - 1) * 100
      return (
        <Rows>
          <Row label="CAGR" value={signed(cagr, (v) => pct(v))} tone={pnlTone(cagr)} big />
          <Row label="Total return" value={signed(ret, (v) => pct(v))} tone={pnlTone(ret)} />
          <Row label="Absolute change" value={signed(ch, (v) => money(v))} tone={pnlTone(ch)} />
        </Rows>
      )
    },
  },

  'spread-cost': {
    title: 'Bid–ask spread cost',
    blurb: 'What crossing the spread costs on entry, and on a full round trip.',
    defaults: { bid: 148, ask: 152, qty: 2, lotSize: LOT_DEFAULT },
    fields: [NUM('bid', 'Best bid (₹)'), NUM('ask', 'Best ask (₹)'), NUM('qty', 'Quantity (lots)'), NUM('lotSize', 'Lot size (units)', LOT_NOTE)],
    formula: 'Spread = ask − bid · Mid = (bid + ask) ÷ 2 · One-way cost vs mid = ½ × spread × units · Round trip = spread × units',
    caveat: 'Assumes you cross the spread with market-style orders and fill at the best quote. Larger sizes may walk deeper into the book; limit orders can save the spread but may not fill.',
    result: (c) => {
      const e = bad(c, { bid: 'pos', ask: 'pos', qty: 'pos', lotSize: 'pos' })
      if (e) return e
      if (c.n('ask') < c.n('bid')) return <Hint>The ask is below the bid, which suggests a crossed or stale quote. Check the two prices.</Hint>
      const sp = c.n('ask') - c.n('bid')
      const mid = (c.n('ask') + c.n('bid')) / 2
      const units = c.n('qty') * c.n('lotSize')
      return (
        <Rows>
          <Row label="Round-trip spread cost" value={money(sp * units, 2)} tone="gold" big />
          <Row label="One-way cost vs mid" value={money((sp / 2) * units, 2)} />
          <Row label="Spread" value={`${r2(sp)} pts · ${pct((sp / mid) * 100)} of mid`} tone="ice" />
          <Row label="Mid price" value={r2(mid)} />
        </Rows>
      )
    },
  },

  'portfolio-delta': {
    title: 'Portfolio net delta',
    blurb: 'Adds up the delta of several positions into one directional exposure.',
    defaults: { d1: 0.5, q1: 65, d2: -0.3, q2: 65, d3: 0.25, q3: -130 },
    fields: [NUM('d1', 'Position 1 delta'), NUM('q1', 'Position 1 units (− for short)'), NUM('d2', 'Position 2 delta'), NUM('q2', 'Position 2 units (− for short)'), NUM('d3', 'Position 3 delta'), NUM('q3', 'Position 3 units (− for short)')],
    formula: 'Net delta (units) = Σ delta × signed units · ₹ change per 1-point index move ≈ net delta units',
    caveat: 'Delta is a snapshot that changes as the index moves (gamma), as time passes and as volatility shifts. Leave unused rows at zero units.',
    result: (c) => {
      const e = bad(c, { d1: 'num', q1: 'num', d2: 'num', q2: 'num', d3: 'num', q3: 'num' })
      if (e) return e
      for (const k of ['d1', 'd2', 'd3']) if (Math.abs(c.n(k)) > 1) return <Hint>“{c.label(k)}” should be between −1 and +1.</Hint>
      const net = c.n('d1') * c.n('q1') + c.n('d2') * c.n('q2') + c.n('d3') * c.n('q3')
      return (
        <>
          <Rows>
            <Row label="Net delta (units)" value={signed(net, (v) => r2(v))} tone={pnlTone(net)} big />
            <Row label="P&L for +1 index point" value={signed(net, (v) => money(v, 2))} tone={pnlTone(net)} sub="First-order estimate" />
            <Row label="P&L for +50 index points" value={signed(net * 50, (v) => money(v))} tone={pnlTone(net)} />
          </Rows>
          <Note>{Math.abs(net) < 1e-9 ? 'Delta-neutral right now, but gamma and vega risk remain.' : net > 0 ? 'Net long: gains if the index rises, loses if it falls.' : 'Net short: gains if the index falls, loses if it rises.'}</Note>
        </>
      )
    },
  },

  'straddle-move': {
    title: 'Straddle-implied move',
    blurb: 'Reads the market’s expected range from the ATM straddle price.',
    defaults: { spot: 24000, cePrice: 190, pePrice: 175, strike: 24000 },
    fields: [NUM('spot', 'Index spot'), NUM('cePrice', 'Call price (₹)'), NUM('pePrice', 'Put price (₹)'), NUM('strike', 'Strike')],
    formula: 'Straddle = call + put · Implied move ≈ straddle ÷ spot · Breakevens = strike ± straddle',
    caveat: 'A rough rule: the straddle price approximates the market’s expected absolute move, and it implies size, not direction. It is not a guarantee that the index stays in the range.',
    result: (c) => {
      const e = bad(c, { spot: 'pos', cePrice: 'nonneg', pePrice: 'nonneg', strike: 'pos' })
      if (e) return e
      const st = c.n('cePrice') + c.n('pePrice')
      return (
        <Rows>
          <Row label="Straddle price" value={r2(st)} tone="gold" big />
          <Row label="Implied move" value={`± ${r2(st)} pts (${pct((st / c.n('spot')) * 100)})`} />
          <Row label="Upper breakeven" value={r2(c.n('strike') + st)} tone="ice" />
          <Row label="Lower breakeven" value={r2(c.n('strike') - st)} tone="ice" />
        </Rows>
      )
    },
  },

  kelly: {
    title: 'Kelly fraction',
    blurb: 'The theoretical bet size that maximises long-run growth for a given edge.',
    defaults: { winRate: 55, payoffRatio: 1.5 },
    fields: [NUM('winRate', 'Win rate (%)'), NUM('payoffRatio', 'Payoff ratio (avg win ÷ avg loss)')],
    formula: 'Kelly f* = p − (1 − p) ÷ b, where p = win probability and b = payoff ratio',
    caveat: 'Kelly assumes your win rate and payoff are known exactly — they never are. Full Kelly is very aggressive and produces deep drawdowns; many practitioners use a fraction of it, or less. This is not a position recommendation.',
    result: (c) => {
      const e = bad(c, { winRate: 'nonneg', payoffRatio: 'pos' })
      if (e) return e
      if (c.n('winRate') > 100) return <Hint>Win rate cannot be more than 100%.</Hint>
      const p = c.n('winRate') / 100
      const f = p - (1 - p) / c.n('payoffRatio')
      if (f <= 0) {
        return (
          <>
            <Rows>
              <Row label="Kelly fraction" value={pct(f * 100, 1)} tone="gold" big />
            </Rows>
            <Note tone="gold">No positive edge at these numbers: Kelly says to risk nothing. Re-check the inputs rather than the formula.</Note>
          </>
        )
      }
      return (
        <Rows>
          <Row label="Full Kelly (of capital at risk)" value={pct(f * 100, 1)} tone="gold" big />
          <Row label="Half Kelly" value={pct((f * 100) / 2, 1)} tone="ice" />
          <Row label="Quarter Kelly" value={pct((f * 100) / 4, 1)} tone="ice" />
        </Rows>
      )
    },
  },
}
