import { bs } from '@/lib/bs'
import { fmtCompactIN } from '@/lib/format'
import {
  type CalcDef, type Ctx, NUM, ENUM, TEXT, OPT_TYPE, SIDE_BS, Row, Rows, Hint, Note, bad, parseRows, StackBar, PayoffMini,
  r2, r0, dp, pct, money, signed, pnlTone, classify, LOT_DEFAULT,
} from './calcKit'

const ot = (c: Ctx): 'CE' | 'PE' => (c.s('optType') === 'PE' ? 'PE' : 'CE')
const intrinsicAt = (t: 'CE' | 'PE', x: number, k: number) => (t === 'CE' ? Math.max(x - k, 0) : Math.max(k - x, 0))
const LOT_NOTE = 'Lot size is editable; check the current NSE contract specification.'

export type IdsA = 'lot-value' | 'futures-pnl' | 'option-pnl' | 'breakeven' | 'premium-split' | 'moneyness' | 'greeks' | 'expected-move' | 'pcr' | 'oi-buildup' | 'max-pain' | 'order-book-impact' | 'vwap-twap'

export const DEFS_A: Record<IdsA, CalcDef> = {
  'lot-value': {
    title: 'Lot value and outlay',
    blurb: 'What a lot costs to buy, how big the exposure is, and a rough margin.',
    defaults: { premium: 150, lotSize: LOT_DEFAULT, lots: 1, spot: 24000, marginPct: 12 },
    fields: [NUM('premium', 'Premium (₹ per unit)'), NUM('lotSize', 'Lot size (units)', LOT_NOTE), NUM('lots', 'Lots'), NUM('spot', 'Index spot'), NUM('marginPct', 'Rough margin (% of notional)')],
    formula: 'Outlay = premium × lot size × lots · Notional = spot × lot size × lots · Margin ≈ notional × margin %',
    caveat: 'Option buyers pay the premium up front. Sellers’ margin is set by the exchange and broker (SPAN + exposure) and changes daily; the % here is only a rough stand-in.',
    result: (c) => {
      const e = bad(c, { premium: 'nonneg', lotSize: 'pos', lots: 'pos', spot: 'pos', marginPct: 'nonneg' })
      if (e) return e
      const q = c.n('lotSize') * c.n('lots')
      const notional = c.n('spot') * q
      return (
        <Rows>
          <Row label="Premium outlay (buyer pays)" value={money(c.n('premium') * q, 2)} tone="gold" big />
          <Row label="Units" value={r0(q)} />
          <Row label="Notional exposure" value={money(notional)} />
          <Row label="Rough margin (seller)" value={money((notional * c.n('marginPct')) / 100)} tone="ice" />
        </Rows>
      )
    },
  },

  'futures-pnl': {
    title: 'Futures P&L',
    blurb: 'Gross profit or loss on a futures trade, before charges.',
    defaults: { side: 'long', entry: 24000, exit: 24150, lotSize: LOT_DEFAULT, lots: 1 },
    fields: [ENUM('side', 'Position', [['long', 'Long'], ['short', 'Short']]), NUM('entry', 'Entry price'), NUM('exit', 'Exit / current price'), NUM('lotSize', 'Lot size (units)', LOT_NOTE), NUM('lots', 'Lots')],
    formula: 'Points = (exit − entry) × (+1 long, −1 short) · P&L = points × lot size × lots',
    caveat: 'Gross of brokerage, STT and other charges. Futures are marked to market daily, so cash moves every day, not only at exit.',
    result: (c) => {
      const e = bad(c, { entry: 'pos', exit: 'pos', lotSize: 'pos', lots: 'pos' })
      if (e) return e
      const dir = c.s('side') === 'short' ? -1 : 1
      const pts = (c.n('exit') - c.n('entry')) * dir
      const q = c.n('lotSize') * c.n('lots')
      const pl = pts * q
      return (
        <Rows>
          <Row label="Gross P&L" value={signed(pl, (v) => money(v))} tone={pnlTone(pl)} big />
          <Row label="Points captured" value={signed(pts, (v) => r2(v))} tone={pnlTone(pts)} />
          <Row label="% of notional at entry" value={signed((pl / (c.n('entry') * q)) * 100, (v) => pct(v))} tone={pnlTone(pl)} />
        </Rows>
      )
    },
  },

  'option-pnl': {
    title: 'Option P&L at expiry',
    blurb: 'Profit or loss for a bought or sold call or put at a chosen expiry price.',
    defaults: { optType: 'CE', side: 'buy', strike: 24000, premium: 150, expiryPrice: 24200, lotSize: LOT_DEFAULT, lots: 1 },
    fields: [OPT_TYPE, SIDE_BS, NUM('strike', 'Strike'), NUM('premium', 'Premium (₹ per unit)'), NUM('expiryPrice', 'Index at expiry'), NUM('lotSize', 'Lot size (units)', LOT_NOTE), NUM('lots', 'Lots')],
    formula: 'Per unit = (intrinsic at expiry − premium) × (+1 buy, −1 sell) · Total = per unit × lot size × lots',
    caveat: 'Expiry payoff only. Before expiry the premium also depends on time and volatility. Gross of charges.',
    result: (c) => {
      const e = bad(c, { strike: 'pos', premium: 'nonneg', expiryPrice: 'pos', lotSize: 'pos', lots: 'pos' })
      if (e) return e
      const t = ot(c)
      const dir = c.s('side') === 'sell' ? -1 : 1
      const K = c.n('strike')
      const p = c.n('premium')
      const fn = (x: number) => (intrinsicAt(t, x, K) - p) * dir
      const unit = fn(c.n('expiryPrice'))
      const q = c.n('lotSize') * c.n('lots')
      const be = t === 'CE' ? K + p : K - p
      const long = dir === 1
      const maxTxt = long
        ? `Max loss ${money(p * q)} (premium) · ${t === 'CE' ? 'gain theoretically unlimited' : `max gain ${money(Math.max(K - p, 0) * q)}`}`
        : `Max gain ${money(p * q)} (premium) · ${t === 'CE' ? 'loss theoretically unlimited' : `loss large, up to ${money(Math.max(K - p, 0) * q)}`}`
      const span = Math.max(p * 3, K * 0.015)
      const lo = Math.min(K, c.n('expiryPrice'), be) - span
      const hi = Math.max(K, c.n('expiryPrice'), be) + span
      return (
        <>
          <Rows>
            <Row label="Total P&L" value={signed(unit * q, (v) => money(v))} tone={pnlTone(unit)} big />
            <Row label="Per unit" value={signed(unit, (v) => r2(v))} tone={pnlTone(unit)} />
            <Row label="Breakeven at expiry" value={r2(be)} tone="ice" />
          </Rows>
          <Note>{maxTxt}</Note>
          <PayoffMini fn={fn} lo={lo} hi={hi} breakeven={be} marker={c.n('expiryPrice')} />
        </>
      )
    },
  },

  breakeven: {
    title: 'Breakeven and payoff limits',
    blurb: 'Breakeven and the best and worst case for the four core positions.',
    defaults: { optType: 'CE', side: 'buy', strike: 24000, premium: 150 },
    fields: [OPT_TYPE, SIDE_BS, NUM('strike', 'Strike'), NUM('premium', 'Premium (₹ per unit)')],
    formula: 'Call: strike + premium · Put: strike − premium (same breakeven for the buyer and the seller)',
    caveat: 'Breakeven is measured at expiry. Before expiry you can be profitable or not at very different index levels.',
    result: (c) => {
      const e = bad(c, { strike: 'pos', premium: 'nonneg' })
      if (e) return e
      const t = ot(c)
      const buy = c.s('side') !== 'sell'
      const K = c.n('strike')
      const p = c.n('premium')
      const be = t === 'CE' ? K + p : K - p
      const floor = Math.max(K - p, 0)
      let maxP: string
      let maxL: string
      if (buy) {
        maxL = `${r2(p)} per unit (the premium paid)`
        maxP = t === 'CE' ? 'Theoretically unlimited' : `${r2(floor)} per unit (index to zero)`
      } else {
        maxP = `${r2(p)} per unit (the premium received)`
        maxL = t === 'CE' ? 'Theoretically unlimited' : `Large, up to ${r2(floor)} per unit (strike − premium)`
      }
      return (
        <>
          <Rows>
            <Row label="Breakeven at expiry" value={r2(be)} tone="gold" big />
            <Row label="Max profit" value={maxP} tone="bull" />
            <Row label="Max loss" value={maxL} tone="bear" />
          </Rows>
          <Note>{t === 'CE' ? 'Index above' : 'Index below'} {r2(be)} at expiry is profitable for the {buy ? 'buyer' : 'seller’s counterparty — i.e. a loss for the seller'}.</Note>
        </>
      )
    },
  },

  'premium-split': {
    title: 'Intrinsic vs time value',
    blurb: 'Splits an option premium into what is “in the money” now and what is time value.',
    defaults: { optType: 'CE', spot: 24000, strike: 23900, premium: 210 },
    fields: [OPT_TYPE, NUM('spot', 'Index spot'), NUM('strike', 'Strike'), NUM('premium', 'Premium (₹ per unit)')],
    formula: 'Intrinsic = max(S − K, 0) call, max(K − S, 0) put · Time value = premium − intrinsic',
    caveat: 'A premium below intrinsic usually means a stale quote or a deep-ITM contract with a wide spread, not free money.',
    result: (c) => {
      const e = bad(c, { spot: 'pos', strike: 'pos', premium: 'nonneg' })
      if (e) return e
      const t = ot(c)
      const intr = intrinsicAt(t, c.n('spot'), c.n('strike'))
      const prem = c.n('premium')
      const tv = prem - intr
      const m = classify(t, c.n('spot'), c.n('strike'))
      return (
        <>
          <Rows>
            <Row label="Moneyness" value={m} tone="gold" big />
            <Row label="Intrinsic value" value={r2(intr)} />
            <Row label="Time value" value={r2(tv)} tone="ice" />
            <Row label="Time value share of premium" value={prem > 0 ? pct((tv / prem) * 100, 1) : '—'} />
          </Rows>
          {tv < 0 ? <Note>Premium is below intrinsic value — check the quote; it is likely stale or the contract is illiquid.</Note> : <StackBar parts={[{ label: 'Intrinsic', value: intr, cls: 'bg-gold' }, { label: 'Time value', value: tv, cls: 'bg-ice' }]} />}
        </>
      )
    },
  },

  moneyness: {
    title: 'Moneyness check',
    blurb: 'ITM, ATM or OTM, and how far the strike is from spot.',
    defaults: { optType: 'CE', spot: 24000, strike: 24200 },
    fields: [OPT_TYPE, NUM('spot', 'Index spot'), NUM('strike', 'Strike')],
    formula: 'Call is ITM if S > K, put is ITM if S < K · distance = K − S (points) and (K − S) / S (%)',
    caveat: 'ATM here means within half a strike step (25 points for a 50-point step). Exchanges and data vendors define ATM slightly differently.',
    result: (c) => {
      const e = bad(c, { spot: 'pos', strike: 'pos' })
      if (e) return e
      const t = ot(c)
      const S = c.n('spot')
      const K = c.n('strike')
      const m = classify(t, S, K)
      const why = m === 'ATM'
        ? 'Strike is at (or within half a step of) spot, so intrinsic value is about zero and the premium is nearly all time value.'
        : m === 'ITM'
          ? `${t === 'CE' ? 'Spot is above the strike' : 'Spot is below the strike'}, so the option has intrinsic value today.`
          : `${t === 'CE' ? 'Spot is below the strike' : 'Spot is above the strike'}, so the premium is all time value — the index must move to the strike first.`
      return (
        <>
          <Rows>
            <Row label="Status" value={m} tone="gold" big />
            <Row label="Strike − spot" value={`${K - S > 0 ? '+' : K - S < 0 ? '−' : ''}${r2(Math.abs(K - S))} pts`} />
            <Row label="Distance from spot" value={pct((Math.abs(K - S) / S) * 100)} />
          </Rows>
          <Note>{why}</Note>
        </>
      )
    },
  },

  greeks: {
    title: 'Black–Scholes and Greeks',
    blurb: 'Theoretical price with delta, gamma, theta, vega and rho.',
    defaults: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 },
    fields: [OPT_TYPE, NUM('spot', 'Index spot'), NUM('strike', 'Strike'), NUM('days', 'Days to expiry'), NUM('iv', 'Implied volatility (%)'), NUM('rate', 'Risk-free rate (%)')],
    formula: 'Black–Scholes–Merton (European, no dividends) · T = days / 365 · theta per calendar day · vega per 1 vol point · rho per 1% rate',
    caveat: 'An educational model. Real premiums differ because of volatility skew, supply and demand, and the bid–ask spread.',
    result: (c) => {
      const e = bad(c, { spot: 'pos', strike: 'pos', days: 'nonneg', iv: 'pos', rate: 'num' })
      if (e) return e
      const g = bs(ot(c), c.n('spot'), c.n('strike'), c.n('days') / 365, c.n('rate') / 100, c.n('iv') / 100)
      return (
        <Rows>
          <Row label="Model price" value={`₹${r2(g.price)}`} tone="gold" big />
          <Row label="Delta" value={dp(g.delta, 4)} />
          <Row label="Gamma" value={dp(g.gamma, 6)} />
          <Row label="Theta / day" value={dp(g.theta, 2)} sub="₹ per unit per calendar day" />
          <Row label="Vega / vol-pt" value={dp(g.vega, 2)} sub="₹ per unit per 1% IV" />
          <Row label="Rho / 1% rate" value={dp(g.rho, 2)} />
        </Rows>
      )
    },
  },

  'expected-move': {
    title: 'Expected move from VIX',
    blurb: 'One- and two-sigma index range implied by a volatility number.',
    defaults: { spot: 24000, vix: 14, days: 7 },
    fields: [NUM('spot', 'Index spot'), NUM('vix', 'India VIX / IV (%)'), NUM('days', 'Days ahead')],
    formula: '1σ = spot × (VIX / 100) × √(days / 365) · 2σ = 2 × 1σ',
    caveat: 'VIX is an annualised expected volatility — it describes the likely size of moves, not their direction. Roughly 68% of outcomes fall inside 1σ if returns were normal; real markets have fatter tails.',
    result: (c) => {
      const e = bad(c, { spot: 'pos', vix: 'pos', days: 'pos' })
      if (e) return e
      const S = c.n('spot')
      const s1 = S * (c.n('vix') / 100) * Math.sqrt(c.n('days') / 365)
      return (
        <Rows>
          <Row label="1σ move" value={`± ${r2(s1)} pts (${pct((s1 / S) * 100)})`} tone="gold" big />
          <Row label="1σ range" value={`${r0(S - s1)} – ${r0(S + s1)}`} tone="ice" />
          <Row label="2σ move" value={`± ${r2(2 * s1)} pts (${pct((2 * s1 / S) * 100)})`} />
          <Row label="2σ range" value={`${r0(S - 2 * s1)} – ${r0(S + 2 * s1)}`} tone="ice" />
        </Rows>
      )
    },
  },

  pcr: {
    title: 'Put–call ratio',
    blurb: 'PCR from open interest and from volume, with neutral reading bands.',
    defaults: { putOI: 9500000, callOI: 8200000, putVol: 1400000, callVol: 1500000 },
    fields: [NUM('putOI', 'Put open interest'), NUM('callOI', 'Call open interest'), NUM('putVol', 'Put volume'), NUM('callVol', 'Call volume')],
    formula: 'PCR (OI) = put OI ÷ call OI · PCR (volume) = put volume ÷ call volume',
    caveat: 'PCR is context, not a signal. Bands: below 0.7 call-heavy, 0.7–1.3 balanced, above 1.3 put-heavy. Open interest cannot show who initiated the positions or whether they are hedges.',
    result: (c) => {
      const e = bad(c, { putOI: 'nonneg', callOI: 'pos', putVol: 'nonneg', callVol: 'pos' })
      if (e) return e
      const band = (x: number) => (x < 0.7 ? 'Call-heavy (< 0.7)' : x <= 1.3 ? 'Balanced (0.7–1.3)' : 'Put-heavy (> 1.3)')
      const a = c.n('putOI') / c.n('callOI')
      const b = c.n('putVol') / c.n('callVol')
      return (
        <Rows>
          <Row label="PCR (open interest)" value={dp(a, 2)} tone="gold" big sub={band(a)} />
          <Row label="PCR (volume)" value={dp(b, 2)} tone="ice" sub={band(b)} />
        </Rows>
      )
    },
  },

  'oi-buildup': {
    title: 'OI build-up classifier',
    blurb: 'Reads price change against open-interest change for a futures contract.',
    defaults: { priceChangePct: 0.6, oiChangePct: 4 },
    fields: [NUM('priceChangePct', 'Price change (%)'), NUM('oiChangePct', 'Open-interest change (%)')],
    formula: 'Price ↑ & OI ↑ long build-up · Price ↓ & OI ↑ short build-up · Price ↑ & OI ↓ short covering · Price ↓ & OI ↓ long unwinding',
    caveat: 'This rule is for FUTURES, where each contract has a buyer and a seller. In options, rising OI alone does not say whether buyers or sellers initiated it.',
    result: (c) => {
      const e = bad(c, { priceChangePct: 'num', oiChangePct: 'num' })
      if (e) return e
      const p = c.n('priceChangePct')
      const o = c.n('oiChangePct')
      if (p === 0 || o === 0) return <Hint>One of the changes is zero, so there is no clear classification. Enter a non-zero price and OI change.</Hint>
      const up = p > 0
      const oiUp = o > 0
      const name = up && oiUp ? 'Long build-up' : !up && oiUp ? 'Short build-up' : up ? 'Short covering' : 'Long unwinding'
      const bull = up
      const txt = up && oiUp
        ? 'New buying outweighs selling: fresh positions are being added as price rises.'
        : !up && oiUp
          ? 'New selling outweighs buying: fresh positions are being added as price falls.'
          : up
            ? 'Rising price with falling OI suggests existing shorts closing out, not fresh buying.'
            : 'Falling price with falling OI suggests existing longs closing out, not fresh selling.'
      return (
        <>
          <Rows>
            <Row label="Classification" value={`${bull ? '▲' : '▼'} ${name}`} tone={bull ? 'bull' : 'bear'} big />
          </Rows>
          <Note>{txt}</Note>
        </>
      )
    },
  },

  'max-pain': {
    title: 'Max pain from an OI strip',
    blurb: 'The strike at which option buyers, in aggregate, would collect the least at expiry.',
    defaults: { strip: '23600:1500000:9000000;23800:2500000:6500000;24000:7000000:5500000;24200:8500000:2500000;24400:6000000:1200000' },
    fields: [TEXT('strip', 'Strip: strike:callOI:putOI; …', 'Separate strikes with “;”. Example 24000:7000000:5500000')],
    formula: 'For each candidate expiry K: Σ callOI × max(K − strike, 0) + Σ putOI × max(strike − K, 0). Max pain = the K with the smallest total.',
    caveat: 'Max Pain is not a price target. It is an arithmetic curiosity of the OI strip; nothing makes the index gravitate to it.',
    result: (c) => {
      const { rows, skipped } = parseRows(c.s('strip'), 3)
      if (rows.length < 2) return <Hint>Enter at least two strikes as strike:callOI:putOI separated by “;”.</Hint>
      const calc = rows.map(([K]) => ({ K, pay: rows.reduce((a, [s, ce, pe]) => a + ce * Math.max(K - s, 0) + pe * Math.max(s - K, 0), 0) }))
      const best = calc.reduce((a, b) => (b.pay < a.pay ? b : a))
      const maxPay = Math.max(...calc.map((x) => x.pay), 1)
      return (
        <>
          <Rows>
            <Row label="Max-pain strike" value={r0(best.K)} tone="gold" big />
            <Row label="Buyers’ total payout there" value={`${fmtCompactIN(best.pay)} pt·contracts`} />
          </Rows>
          <ul className="mt-3 space-y-1.5" aria-label="Total payout to option buyers by expiry strike">
            {calc.map((x) => (
              <li key={x.K} className="flex items-center gap-2 text-[0.75rem]">
                <span className="num w-14 shrink-0 text-fg-2">{r0(x.K)}</span>
                <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                  <span className={x.K === best.K ? 'block h-full bg-gold' : 'block h-full bg-ice/60'} style={{ width: `${(x.pay / maxPay) * 100}%` }} />
                </span>
                <span className="num w-16 shrink-0 text-right text-fg-2">{fmtCompactIN(x.pay)}</span>
              </li>
            ))}
          </ul>
          {skipped > 0 && <Note>{skipped} malformed chunk{skipped > 1 ? 's were' : ' was'} skipped.</Note>}
        </>
      )
    },
  },

  'order-book-impact': {
    title: 'Order book impact',
    blurb: 'Walk the book to see your average fill price and impact cost.',
    defaults: { side: 'buy', qty: 650, refPrice: 100, book: '100.5:200;101:300;102:400' },
    fields: [SIDE_BS, NUM('qty', 'Quantity (units)'), NUM('refPrice', 'Reference price (e.g. mid / LTP)'), TEXT('book', 'Book side consumed: price:qty; … (best first)', 'Buy consumes asks; sell consumes bids.')],
    formula: 'Fill level by level until qty is done · average = Σ price × qty ÷ filled · slippage = average − ref (buy) or ref − average (sell)',
    caveat: 'A static snapshot. A real book changes while you trade, and hidden or iceberg orders are not shown.',
    result: (c) => {
      const e = bad(c, { qty: 'pos', refPrice: 'pos' })
      if (e) return e
      const { rows, skipped } = parseRows(c.s('book'), 2)
      if (rows.length === 0) return <Hint>Enter book levels as price:qty separated by “;”, best price first.</Hint>
      let left = c.n('qty')
      let cost = 0
      let filled = 0
      for (const [px, q] of rows) {
        if (left <= 0) break
        const take = Math.min(left, q)
        cost += take * px
        filled += take
        left -= take
      }
      if (filled === 0) return <Hint>The book has no quantity to fill against.</Hint>
      const avg = cost / filled
      const ref = c.n('refPrice')
      const slip = c.s('side') === 'sell' ? ref - avg : avg - ref
      return (
        <>
          <Rows>
            <Row label="Average price" value={`₹${r2(avg)}`} tone="gold" big />
            <Row label="Filled / unfilled" value={`${r0(filled)} / ${r0(Math.max(left, 0))}`} tone={left > 0 ? 'gold' : 'fg'} />
            <Row label="Slippage vs reference" value={`${slip < 0 ? '−' : ''}${r2(Math.abs(slip))} pts`} />
            <Row label="Impact cost" value={`${pct((slip / ref) * 100, 3)} · ₹${r2(slip * filled)}`} tone="ice" sub="positive = worse than reference" />
          </Rows>
          {left > 0 && <Note tone="gold">Only {r0(filled)} units are available in the levels given; {r0(left)} would remain unfilled or need deeper levels.</Note>}
          {skipped > 0 && <Note>{skipped} malformed level{skipped > 1 ? 's were' : ' was'} skipped.</Note>}
        </>
      )
    },
  },

  'vwap-twap': {
    title: 'VWAP and TWAP of fills',
    blurb: 'Volume-weighted and simple average price of a set of fills.',
    defaults: { fills: '24010:50;24025:100;24040:30' },
    fields: [TEXT('fills', 'Fills: price:qty; …', 'Example 24010:50;24025:100')],
    formula: 'VWAP = Σ price × qty ÷ Σ qty · TWAP = simple average of the fill prices',
    caveat: 'This TWAP assumes the fills are evenly spaced in time; a true TWAP uses time-sliced prices.',
    result: (c) => {
      const { rows, skipped } = parseRows(c.s('fills'), 2)
      const q = rows.reduce((a, r) => a + r[1], 0)
      if (rows.length === 0 || q <= 0) return <Hint>Enter fills as price:qty separated by “;”, with a quantity above zero.</Hint>
      const vwap = rows.reduce((a, r) => a + r[0] * r[1], 0) / q
      const twap = rows.reduce((a, r) => a + r[0], 0) / rows.length
      return (
        <>
          <Rows>
            <Row label="VWAP" value={r2(vwap)} tone="gold" big />
            <Row label="TWAP" value={r2(twap)} tone="ice" />
            <Row label="VWAP − TWAP" value={`${vwap - twap < 0 ? '−' : '+'}${r2(Math.abs(vwap - twap))}`} />
            <Row label="Total quantity" value={r0(q)} />
          </Rows>
          {skipped > 0 && <Note>{skipped} malformed fill{skipped > 1 ? 's were' : ' was'} skipped.</Note>}
        </>
      )
    },
  },
}
