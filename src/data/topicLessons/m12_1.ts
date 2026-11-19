import type { ModuleLesson } from '../topicLessonTypes'

/* Module 12.1 — Futures Fundamentals.
 * Illustrative: NIFTY spot 24,000, lot 65 (check the current NSE contract specification), r = 6.5%, dividend yield 1.3%.
 * Fair value uses continuous compounding: F = S × e^((r − q) × days/365). Expiry day and available series are as per
 * currently published NSE rules (monthly index futures expire on the last Tuesday) — verify before trading. */
const m: ModuleLesson = {
  moduleId: '12.1',
  intro: `A futures contract is an agreement to buy or sell an asset at a fixed price on a fixed future date. Index futures let you take a view on NIFTY or SENSEX with one contract and without owning 50 stocks. This module covers how the futures price is built, why it differs from spot, how it converges at expiry and how traders roll positions forward.`,
  introHi: `Futures contract ek agreement hai jisme kisi asset ko ek fixed price par ek fixed future date par kharidna ya bechna tay hota hai. Index futures se aap ek hi contract mein NIFTY ya SENSEX par view le sakte ho, 50 stocks khareede bina. Is module mein dekhenge futures price kaise banta hai, spot se alag kyun hota hai, expiry par kaise converge karta hai, aur traders position ko aage kaise roll karte hain.`,
  steps: {
    concept: `An index future is a standardised contract on an index such as NIFTY 50. One lot is 65 units, so at NIFTY 24,000 one lot controls a notional value of 24,000 × 65 = ₹15,60,000. You pay only margin up front, not the full value. Profit or loss moves 1:1 with the index points, which makes futures a linear and leveraged instrument. Unlike an option buyer, a futures holder pays no premium, but the loss is not capped at a premium: it grows with every point the index moves against the position.`,
    conceptHi: `Index future ek standardised contract hai jaise NIFTY 50 par. Ek lot 65 units ka hota hai, toh NIFTY 24,000 par ek lot ki notional value 24,000 × 65 = ₹15,60,000 hoti hai. Aap sirf margin dete ho, poori value nahi. Profit ya loss index points ke saath 1:1 chalta hai, isliye futures linear aur leveraged instrument hai. Options ke ulat, futures mein premium nahi dena padta, par galat direction mein loss bahut bada ho sakta hai.`,
    mechanism: `Futures trade on NSE and are cleared by NSCCL, which becomes the counterparty to both sides and collects margin (SPAN plus exposure margin). Every day positions are marked to market: the gain or loss from the previous settlement price is credited or debited in cash. Index futures are cash-settled, so no shares change hands. On expiry the final settlement price equals the closing value of the index that day, and the contract ends. Futures price at any time is anchored to spot by the cost of carry.`,
    example: {
      title: 'One lot, one move (illustrative)',
      text: `A trader buys 1 lot of NIFTY futures at 24,000. Notional = 24,000 × 65 = ₹15,60,000. If margin is about 11% (a rough illustrative figure; check your broker's margin calculator), the blocked amount is about ₹1,71,600. NIFTY futures rise to 24,120: profit = 120 × 65 = ₹7,800, which is about 4.5% on the margin. If instead futures fall to 23,880, the loss is also ₹7,800. Brokerage, STT on the sell side and other charges apply in addition.`,
    },
    chart: {
      kind: 'payoff',
      title: 'Long NIFTY futures at 24,000 (expiry payoff)',
      caption: 'A straight line: profit rises and loss falls 1:1 with the index. There is no premium, and no cap on either side except zero.',
      spot: 24000,
      legs: [{ type: 'FUT', side: 1, strike: 24000 }],
    },
    optionChain: `The option chain and futures are linked by put-call parity: a synthetic future (long call, short put at the same strike) behaves like a future. The futures price is often shown at the top of the chain and is what the chain's strikes are priced against, not spot. When futures trade at a premium, call premiums are a little richer and puts a little cheaper at the same strike than spot alone would suggest. OI of futures is shown separately from option OI and tells something different.`,
    psychology: `Futures feel simple, and that is the trap. With no premium to lose, traders forget that the real cost is the margin call when the market moves against them. Leverage turns a 1% index fall into a loss of roughly 9% of margin at an 11% margin rate. Hedgers feel relief, speculators feel excitement, and arbitrageurs feel nothing because they hold the opposite side in cash stocks. Plan the stop-loss and the worst-day loss before the entry.`,
    scenarios: {
      bullish: `Index rises. A long future gains 65 rupees per point per lot and the basis stays near fair value. The risk is a sharp reversal; there is no premium cap, so the stop-loss must be your own.`,
      bearish: `Index falls. A short future gains 65 per point. Risk: a sharp rally or gap up against the short, with losses that are theoretically unlimited. Rising margins can force an exit at a bad price.`,
      sideways: `Index stays flat. The futures price drifts towards spot as expiry nears because the premium decays to zero. A long future at a premium loses that premium over time even if spot does not move; a short gains it.`,
    },
    practice: [
      { q: `NIFTY futures at 24,000 and lot size 65. What is the notional value of 2 lots, and what is the profit if the index goes up 80 points?`, a: `Notional = 24,000 × 65 × 2 = ₹31,20,000. Profit = 80 × 65 × 2 = ₹10,400 for a long position, before charges.` },
      { q: `Spot 24,000, r = 6.5%, dividend yield 1.3%, 30 days to expiry. Find the fair futures price.`, a: `F = 24,000 × e^((0.065 − 0.013) × 30/365) = 24,000 × e^0.004274 = 24,000 × 1.004283 ≈ 24,102.79. The fair basis is about +102.79 points.` },
      { q: `Futures 24,103 today. On expiry day the index closes at 24,050. What is a long futures holder's P&L per lot?`, a: `Final settlement = 24,050. P&L = (24,050 − 24,103) × 65 = −53 × 65 = −₹3,445, even though spot is 50 points above 24,000, because the 103-point premium converged to zero.` },
      { q: `Why does OI not change when a trader exits by selling to a new buyer?`, a: `The exiting long hands his contract to the new buyer, while the short side is unchanged. One long leaves and one long arrives against the same short, so the number of open contracts stays the same.` },
    ],
    assignment: `On NSE or your broker terminal, note NIFTY spot, current-month futures price and next-month futures price at the same time. Compute basis for each, then compute fair value using your assumption of the interest rate and 1.3% dividend yield. Write down the gap between market price and fair value and what could explain it.`,
  },
  topics: [
    {
      t: 1,
      def: `An index future is a standardised contract to buy or sell the value of an index, such as NIFTY 50, on a fixed future date at a price agreed today. Because an index cannot be delivered, the contract settles in cash.`,
      hi: `Index future ek standardised contract hai jisme kisi index (jaise NIFTY 50) ki value ko ek fixed future date par aaj tay hue price par kharidna ya bechna hota hai. Index deliver nahi ho sakta, isliye settlement cash mein hota hai.`,
      how: `NSE lists contracts for fixed expiries with a set lot size. A buyer and a seller trade at an agreed futures price; the clearing corporation NSCCL steps in as the counterparty to each and demands initial margin (SPAN plus exposure). Every evening the position is marked to market against the settlement price and the difference is paid in cash. At expiry, the contract settles in cash against the index closing value. No shares are delivered, and no premium is paid, unlike in an option.`,
      eg: {
        title: 'Long one lot (illustrative)',
        text: `Buy 1 lot NIFTY futures at 24,000. Lot = 65, so notional = 24,000 × 65 = ₹15,60,000. If the index settles at 24,120, profit = 120 × 65 = ₹7,800; if it settles at 23,880, loss = ₹7,800. Compare with buying a call: the call buyer's loss is limited to the premium paid, the futures buyer's is not.`,
      },
      tip: `Futures give linear exposure: every point is worth lot size in rupees, up or down.`,
      visual: { kind: 'payoff', title: 'Long and short futures payoff', spot: 24000, legs: [{ type: 'FUT', side: 1, strike: 24000 }] },
      calc: { id: 'futures-pnl', preset: { side: 'long', entry: 24000, exit: 24120, lotSize: 65, lots: 1 }, why: 'Computes the profit in the example: 120 points × 65.' },
    },
    {
      t: 2,
      def: `The futures price is the price today for buying or selling the index at expiry. It is linked to the spot index by the cost of carry: spot grown at the financing rate and reduced by the dividends you would have collected.`,
      hi: `Futures price woh price hai jo aaj expiry par index kharidne ya bechne ke liye tay hota hai. Yeh spot se cost of carry ke zariye juda hota hai: spot par financing rate ka bhaar aur milne wale dividends ka ghatav.`,
      how: `If futures were far above fair value, arbitrageurs would buy the index stocks, sell the future and pocket the difference at expiry. If far below, they would do the reverse. Their activity keeps the futures price close to fair value, but not exactly, because of costs, borrowing limits and demand. The formula in continuous compounding is F = S × e^((r − q) × T), where T is days to expiry divided by 365.`,
      eg: {
        title: 'Fair value for 30 days (illustrative)',
        text: `Spot 24,000, r = 6.5%, q = 1.3%, 30 days. Net carry = 5.2% a year. T = 30/365 = 0.08219. F = 24,000 × e^(0.052 × 0.08219) = 24,000 × e^0.004274 ≈ 24,102.79. If the market quotes 24,120, futures are about 17.21 points above fair value. That small gap does not by itself offer a risk-free trade after costs.`,
      },
      tip: `Fair value is a model anchor. Real futures trade near it, and sentiment can push them away briefly.`,
      visual: { kind: 'flow', title: 'Building the futures price', steps: [{ label: 'Spot 24,000', tone: 'ice' }, { label: '+ Financing 6.5%', note: 'cost of money', tone: 'bear' }, { label: '− Dividends 1.3%', note: 'income you forgo', tone: 'bull' }, { label: 'Fair 24,102.79', note: '30 days', tone: 'gold' }] },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24120, rate: 6.5, days: 30, dividend: 1.3 }, why: 'Computes fair value and the gap to the quoted futures price.' },
    },
    {
      t: 3,
      def: `Spot is the current value of the index. Futures is the price for settlement at a future date. You cannot trade the spot index directly; you trade the stocks, an ETF or the futures. The two move together but are not the same number.`,
      hi: `Spot index ki abhi ki value hai. Futures woh price hai jo future date ke settlement ke liye tay hota hai. Spot index ko seedha trade nahi kar sakte; aap stocks, ETF ya futures trade karte ho. Dono saath chalte hain par ek number nahi hain.`,
      how: `Spot is calculated by NSE Indices from the live prices of the 50 stocks. Futures trade on their own order book, driven by arbitrage, hedging demand and sentiment. The gap between them (the basis) narrows as expiry approaches, and on expiry day the final settlement price is the closing index value, so futures and spot converge. This is why a long futures holder can lose money even when spot has risen, if the premium shrinks more than spot gained.`,
      eg: {
        title: 'Convergence cost (illustrative)',
        text: `Spot 24,000, futures 24,103 with 30 days left. On expiry spot closes at 24,050 and futures settle at 24,050. A long futures holder: (24,050 − 24,103) × 65 = −53 × 65 = −₹3,445, although spot rose by 50 points. Someone who bought the cash stocks gained 50 points of index plus dividends, but paid full price and financing.`,
      },
      tip: `Futures P&L depends on the futures entry price, not on spot at the time you entered.`,
      visual: { kind: 'compare', title: 'Spot vs futures', left: { head: 'Spot index', tone: 'ice', points: ['Calculated from 50 stocks', 'Cannot be traded directly', 'Reference for settlement'] }, right: { head: 'Index futures', tone: 'gold', points: ['Traded contract with a lot size', 'Priced by cost of carry', 'Converges to spot at expiry'] } },
    },
    {
      t: 4,
      def: `A futures premium means the futures price is above spot; a discount means it is below. Normally futures trade at a small premium because carrying costs exceed dividends. A discount is unusual and can signal heavy hedging or bearish sentiment.`,
      hi: `Futures premium ka matlab futures price spot se upar hai; discount ka matlab neeche. Aam taur par futures thode premium par trade karte hain kyunki carrying cost dividends se zyada hota hai. Discount kam dikhta hai aur heavy hedging ya bearish sentiment ka ishara ho sakta hai.`,
      how: `Premium as a percentage of spot, converted to an annual rate, can be compared with the interest rate. If the implied annual rate is well above fair carry, buyers are eager, perhaps because of leveraged long positions. If it is below or negative, sellers or hedgers are dominant. The premium shrinks to zero by expiry, regardless of what the index does, so it is not a prediction of direction.`,
      eg: {
        title: 'Premium and discount (illustrative)',
        text: `Spot 24,000, futures 24,103: premium = 103 points = 103 / 24,000 = 0.43% for 30 days, or about 0.43 × 365 / 30 = 5.2% a year, close to the net carry of 5.2%. Another day: futures 23,980 against spot 24,000 is a discount of 20 points (−0.083%), which sits below fair value and says that sellers or hedgers are paying up to be short.`,
      },
      tip: `Compare the premium with fair value, not with zero. A premium of 100 points can be normal.`,
      visual: { kind: 'gauge', title: 'Futures premium, annualised (illustrative)', min: -5, max: 15, value: 5.2, unit: '%', zones: [{ from: -5, to: 3, label: 'Cheap / hedging', tone: 'bear' }, { from: 3, to: 7, label: 'Near fair', tone: 'gold' }, { from: 7, to: 15, label: 'Rich', tone: 'bull' }] },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24103, rate: 6.5, days: 30, dividend: 1.3 }, why: 'Premium versus fair value for the example.' },
    },
    {
      t: 5,
      def: `Cost of carry is the net cost of holding the underlying until the future date: the interest you pay to finance the purchase minus the dividends you receive. It explains why futures are normally above spot.`,
      hi: `Cost of carry underlying ko future date tak hold karne ki net cost hai: purchase finance karne par jo interest dena padta hai, usme se jo dividends milte hain woh ghata do. Isse samajh aata hai ki futures normally spot se upar kyun hote hain.`,
      how: `A trader who buys the 50 stocks today and sells the future locks a result at expiry. Their cost is interest on the money tied up, and their income is dividends. The futures price must give them at least that to be worth doing. For NIFTY the dividend yield is low, around 1% to 1.5%, while borrowing rates are higher, so the carry is positive. Dividend timing matters: a heavy dividend season can reduce the premium.`,
      eg: {
        title: 'Components for 30 days (illustrative)',
        text: `On 24,000 for 30 days: financing at 6.5% = 24,000 × 0.065 × 30/365 = ₹128.22 per unit; dividends at 1.3% = 24,000 × 0.013 × 30/365 = ₹25.64. Net carry = 128.22 − 25.64 = 102.58 points, close to the compounded figure of 102.79. One lot's net carry = 102.79 × 65 ≈ ₹6,681 over the 30 days.`,
      },
      tip: `The futures premium is mostly carry, not a forecast. Do not read it as a bullish signal by itself.`,
      visual: { kind: 'bars', title: 'Carry components over 30 days (points)', unit: ' pts', items: [{ label: 'Financing (6.5%)', value: 128.22, tone: 'bear' }, { label: 'Dividends (1.3%)', value: 25.64, tone: 'bull' }, { label: 'Net carry', value: 102.58, tone: 'gold' }] },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24102.79, rate: 6.5, days: 30, dividend: 1.3 }, why: 'Shows fair value built from the two carry components.' },
    },
    {
      t: 6,
      def: `Futures expiry is the date on which a futures contract ends and is settled. After that date the contract no longer trades. NIFTY futures settle in cash against the index closing value of that day.`,
      hi: `Futures expiry woh date hai jab futures contract khatam hota hai aur settle hota hai. Uske baad contract trade nahi hota. NIFTY futures us din ke index closing value ke against cash mein settle hote hain.`,
      how: `NSE lists several expiries in advance. Index futures expire on the last Tuesday of the month as per current NSE schedule; if that is a holiday, the previous trading day. Verify the current expiry rules before trading, because the exchange can change them. On expiry the final settlement price is the closing index value, positions are closed automatically and MTM is settled in cash. You do not need to do anything to square off, but holding to expiry means you accept that final price.`,
      eg: {
        title: 'Holding to expiry (illustrative)',
        text: `A trader buys 1 lot at 24,100 in the current-month contract. On expiry day the index closes at 24,150, which is the final settlement price. Profit = (24,150 − 24,100) × 65 = 50 × 65 = ₹3,250. Daily MTM would have credited or debited the account each day; the final cash movement settles the remainder.`,
      },
      tip: `Close or roll before expiry day unless you want exposure to the final settlement price.`,
      visual: { kind: 'timeline', title: 'Life of a monthly contract', events: [{ when: 'Listing', what: 'Contract available to trade', tone: 'neutral' }, { when: 'Daily', what: 'Marked to market at settlement price', tone: 'gold' }, { when: 'Last week', what: 'Rollover to next month', tone: 'ice' }, { when: 'Expiry day', what: 'Cash settlement at index close', tone: 'gold' }] },
      calc: { id: 'futures-pnl', preset: { side: 'long', entry: 24100, exit: 24150, lotSize: 65, lots: 1 }, why: 'Computes the P&L at the final settlement price.' },
    },
    {
      t: 7,
      def: `Futures volume is the number of contracts traded in a period, usually a day. It counts every trade once, whether positions were opened or closed.`,
      hi: `Futures volume ek period (aam taur par ek din) mein trade hue contracts ki sankhya hai. Har trade ek baar gina jata hai, chahe position khuli ho ya band hui ho.`,
      how: `Volume shows how active and liquid the contract is. High volume means narrow spreads and easier exits. It does not tell whether positions were being added; that is the job of open interest. Compare today's volume with a recent average to judge whether participation was unusual. Near expiry volume shifts from the current-month to the next-month contract, so look at the series that most traders use.`,
      eg: {
        title: 'Volume to value (illustrative)',
        text: `Suppose 3,00,000 NIFTY futures contracts trade in a day. Units = 3,00,000 × 65 = 1,95,00,000. At an index level of 24,000 the notional turnover is 1,95,00,000 × 24,000 = ₹46,800 crore. Next day volume falls to 1,80,000, which is 60% of the previous day, so participation is lower.`,
      },
      tip: `Volume is activity, OI is commitment. Do not mix them.`,
      visual: { kind: 'bars', title: 'Volume vs average (illustrative)', unit: ' contracts', items: [{ label: '20-day average', value: 250000, tone: 'neutral' }, { label: 'Today', value: 300000, tone: 'gold' }, { label: 'Yesterday', value: 180000, tone: 'neutral' }] },
    },
    {
      t: 8,
      def: `Futures open interest (OI) is the total number of contracts that are open and not yet closed or expired. Each contract has one long and one short, so OI counts each pair once.`,
      hi: `Futures open interest (OI) un contracts ki total sankhya hai jo abhi open hain, band ya expire nahi hue. Har contract mein ek long aur ek short hota hai, isliye OI har pair ko ek hi baar ginta hai.`,
      how: `OI rises when a new buyer and a new seller create a fresh contract. It falls when both sides close, and stays unchanged when one trader exits to a new one. At the end of the day NSE publishes OI per contract. Reading price and OI together gives hints about build-up or unwinding (the futures rules in Module 11.2), but OI cannot show who initiated the trade, and not every OI increase is bullish.`,
      eg: {
        title: 'Three trades, three OI results (illustrative)',
        text: `Start OI 1,00,000 lots. (1) A new buyer and a new seller trade 500 lots: OI = 1,00,500. (2) A long exits 200 lots to a new buyer: OI stays 1,00,500. (3) Two traders both close 300 lots against each other: OI = 1,00,200. In lot terms the 1,00,200 lots equal 1,00,200 × 65 = 65,13,000 units.`,
      },
      tip: `Rising OI means money is being committed. It does not tell you which side is right.`,
      visual: { kind: 'matrix', title: 'What happens to OI', xLabels: ['Buyer is new', 'Buyer is exiting'], yLabels: ['Seller is new', 'Seller is exiting'], cells: [{ head: 'OI rises', note: 'New contract created', tone: 'gold' }, { head: 'OI unchanged', note: 'Seller replaced by buyer', tone: 'neutral' }, { head: 'OI unchanged', note: 'Buyer replaced by seller', tone: 'neutral' }, { head: 'OI falls', note: 'Contract closed', tone: 'ice' }] },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.6, oiChangePct: 10 }, why: 'Classifies a price and OI combination (futures rules).' },
    },
    {
      t: 9,
      def: `Basis is the futures price minus the spot price. It is positive when futures are at a premium and negative when at a discount. It shrinks to zero at expiry.`,
      hi: `Basis futures price minus spot price hota hai. Futures premium par hon toh positive, discount par hon toh negative. Expiry tak yeh zero ho jata hai.`,
      how: `Basis has two parts: the fair basis from cost of carry, and the extra premium or discount caused by sentiment and positioning. Comparing actual basis with fair basis shows whether futures are rich or cheap relative to carry. A sharply falling basis with price falling can mean long positions being unwound; a basis stretched above fair value can mean eager leveraged buyers. Because basis converges at expiry, traders who hold a calendar spread between two months are trading basis, not direction.`,
      eg: {
        title: 'Actual vs fair basis (illustrative)',
        text: `Spot 24,000, futures 24,120, 30 days to expiry. Actual basis = +120 points. Fair basis = 102.79 points. Excess = 120 − 102.79 = +17.21 points (0.07% of spot). If next week the same futures trade at 24,060 with spot 24,000 and 23 days left, fair basis is 24,000 × (e^(0.052 × 23/365) − 1) = 78.6 points, so the excess has gone to about −18.6 and futures are cheaper than fair.`,
      },
      tip: `Track basis relative to fair value. A raw basis number without the days left is meaningless.`,
      visual: { kind: 'bars', title: 'Actual vs fair basis (points)', unit: ' pts', items: [{ label: 'Actual basis', value: 120, tone: 'gold' }, { label: 'Fair basis', value: 102.79, tone: 'ice' }, { label: 'Excess', value: 17.21, tone: 'neutral' }] },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24120, rate: 6.5, days: 30, dividend: 1.3 }, why: 'Actual basis, fair basis and excess in one view.' },
    },
    {
      t: 10,
      def: `Rollover means closing a position in the expiring contract and opening the same position in the next month's contract, so that you keep exposure after expiry. The price gap between the two months is the cost or income of rolling.`,
      hi: `Rollover ka matlab expiring contract ki position band karke next month ke contract mein wahi position kholna, taaki expiry ke baad bhi exposure bana rahe. Dono months ke price ka gap hi rolling ki cost ya income hai.`,
      how: `Traders roll in the days before expiry, usually when liquidity in the next month is good. Rolling a long means selling the near month and buying the far month: you pay the calendar spread, which is mostly the extra carry for another month. Rolling a short earns that spread. The percentage of OI shifted to the next series is tracked by the market as rollover data, and heavy rollover with long positions is often read as continued participation. It is a clue, not a guarantee. Brokerage and STT apply on both legs.`,
      eg: {
        title: 'Cost of rolling a long (illustrative)',
        text: `Spot 24,000. Current month (30 days) fair value 24,102.79; next month (60 days) fair value 24,206.03. Rolling 1 lot long costs the spread 24,206.03 − 24,102.79 = 103.24 points, which is 103.24 × 65 ≈ ₹6,710 per month of exposure (plus transaction costs). In a rising market the new contract's profit can be larger than this cost; in a flat market it is a drag.`,
      },
      tip: `Rolling a long position has a cost every month. Include it when you plan to hold futures long term.`,
      visual: { kind: 'flow', title: 'Rolling a long position', steps: [{ label: 'Sell near month', note: '24,102.79', tone: 'bear' }, { label: 'Buy next month', note: '24,206.03', tone: 'bull' }, { label: 'Pay the spread', note: '103.24 pts', tone: 'gold' }, { label: 'Exposure continues', note: 'Next expiry', tone: 'ice' }] },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24206.03, rate: 6.5, days: 60, dividend: 1.3 }, why: 'Fair value of the next-month contract.' },
    },
  ],
  tools: [{ id: 'futures-pnl', why: 'P&L of a futures position.' }, { id: 'basis-fair-value', why: 'Fair value, basis and premium.' }, { id: 'hedge-ratio', why: 'Contracts needed to hedge a portfolio.' }],
}
export default m
