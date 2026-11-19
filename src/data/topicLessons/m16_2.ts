import type { ModuleLesson } from '../topicLessonTypes'

/* Module 16.2 — Market Makers.
 * Illustrative numbers: NIFTY 24,000, lot 65 (check the current NSE contract specification), VIX 14, r 6.5%, q 1.3%, Black–Scholes values from src/lib/bs.ts
 * (ATM 5-day call: price ≈ 165.49, delta ≈ 0.52, gamma ≈ 0.00101 per point, vega ≈ 11.19 per IV point per unit).
 * Who exactly quotes on NSE, and under what obligations, is set by the exchange's market-making framework and changes; verify current rules. */
const m: ModuleLesson = {
  moduleId: '16.2',
  intro: `Market makers are firms that stand ready to buy and sell at all times, so that you can trade an option whenever you want. They earn the bid-ask spread and manage the risk that comes from holding what others sell them. Understanding how they hedge explains much of what happens to premiums and spot around strikes, especially near expiry.`,
  introHi: `Market makers woh firms hain jo hamesha buy aur sell karne ke liye taiyaar rehti hain, taaki aap koi bhi option kabhi bhi trade kar sako. Yeh bid-ask spread kamate hain aur jo position aap unhe bechte ho uska risk manage karte hain. Unka hedging samajhne se premium aur spot ki kai harkatein, khaaskar expiry ke paas, samajh aati hain.`,
  steps: {
    concept: `A market maker quotes a price to buy (bid) and a price to sell (ask) in size, continuously. The gap between the two is the spread and is the main source of income. The market maker does not want a view on direction; it wants to end each day with small, controlled exposures.`,
    conceptHi: `Market maker ek buy price (bid) aur ek sell price (ask) size ke saath lagatar quote karta hai. Dono ke beech ka gap spread hai aur yahi kamai ka main source hai. Market maker ko direction ka view nahi chahiye; woh chahta hai ki din ke end mein exposure chhota aur control mein ho.`,
    mechanism: `When you buy a call at the ask, the market maker is short that call. It then buys futures or the underlying to offset the delta (delta hedge), and later adjusts as spot moves (gamma), as volatility changes (vega) and as days pass (theta). Because index options are cash-settled and European, hedging is done with NIFTY futures or a basket. The business is a rate of small gains from spread and decay minus the cost of re-hedging and occasional large moves.`,
    example: {
      title: 'A market maker takes the other side of 100 lots',
      text: `Spot 24,000, 5 days to expiry, IV 14%. The 24,000 CE is quoted 164.5 / 165.5. Retail buys 100 lots (100 × 65 = 6,500 units) at 165.5. The market maker is short 6,500 units with delta 0.52, so it is short 6,500 × 0.52 = 3,380 units of delta, and buys 3,380 ÷ 65 = 52 lots of futures. Had it bought and sold the same size at the two quotes, it would have earned 1 × 6,500 = ₹6,500 in spread; being delta-neutral protects against a small spot move, but not against vega, gamma or gaps.`,
    },
    chart: {
      kind: 'flow',
      title: 'From client order to hedge',
      caption: 'The market maker takes the risk, then offsets it in futures and keeps adjusting.',
      steps: [
        { label: 'Client buys 100 lots of CE', note: 'at the ask', tone: 'ice' },
        { label: 'Market maker is short delta', note: '−3,380 units', tone: 'gold' },
        { label: 'Buys 52 lots futures', note: 'delta ≈ 0', tone: 'gold' },
        { label: 'Re-hedges as spot moves', note: 'gamma', tone: 'neutral' },
        { label: 'Collects spread and theta', note: 'pays for gaps', tone: 'neutral' },
      ],
    },
    optionChain: `The chain shows the market maker's work as a bid and an ask on every strike and the quantity at the top of the book. Narrow spreads and large quantities near ATM show that liquidity providers are competing there; wide spreads and thin quantities in far OTM strikes show they charge more or step back. A sudden widening of spreads across the chain usually signals uncertainty, an event or fast markets. Open interest, in contrast, cannot show whether a contract was created by a market maker or by a client.`,
    psychology: `The market maker's psychology is discipline, not forecasting. It accepts small repeated profits, controls inventory and takes a loss quickly when a hedge fails. The retail opposite is hope: holding an unhedged view because it feels right. Retail traders often mistake the market maker's hedging flows for "manipulation"; usually it is mechanical risk management.`,
    scenarios: {
      bullish: `Spot rises: the market maker's short calls gain delta, so it buys more futures to stay neutral. This buying can add to the up-move, especially when it is short a lot of gamma, but it is rarely the main driver of a trend.`,
      bearish: `Spot falls: short calls lose delta, so the maker sells futures to remain neutral, and short puts gain delta in the other direction. Hedge flow depends on its net position, which you cannot see from outside.`,
      sideways: `Spot stays near the strike: the maker collects theta and spread while re-hedging little. This is the condition in which a market maker who is short options earns the most.`,
    },
    practice: [
      { q: `A market maker quotes 164.5 / 165.5. How much spread does it earn on 50 lots (65 each) bought at 164.5 and sold at 165.5?`, a: `Spread = 165.5 − 164.5 = ₹1. Units = 50 × 65 = 3,250. Gain = 1 × 3,250 = ₹3,250, before costs.` },
      { q: `A maker is short 80 lots of calls with delta 0.40. How many lots of futures must it buy to be delta-neutral?`, a: `Short delta = 80 × 0.40 = 32 lots. It buys 32 lots of futures. Delta-neutral at the moment only; it must re-hedge as spot moves.` },
      { q: `Using gamma 0.00101 per point, 100 lots short (6,500 units): how much does the maker's delta change if spot rises 100 points?`, a: `Gamma exposure = 6,500 × 0.00101 = 6.565 delta units per point. For 100 points: 656.5 units, about 10 lots. Being short gamma, the maker's delta becomes more negative by this amount.` },
      { q: `Why does a market maker widen spreads before the Union Budget?`, a: `Uncertainty is higher, so the hedging cost and the chance of a gap are higher; a wider spread is the compensation for taking the risk.` },
    ],
    assignment: `Open the NIFTY option chain at three times: 9:20, 12:00 and 15:00. Note the bid-ask spread of the ATM strike and of a strike 500 points away. Write down which is wider and why.`,
  },
  topics: [
    {
      t: 1,
      def: `A market maker is a firm or desk that continuously quotes both a buy price and a sell price in a security, so that other participants can trade at any time. It profits from the spread and from managing the resulting risk, not from betting on direction.`,
      hi: `Market maker ek firm ya desk hoti hai jo kisi security mein lagatar buy aur sell dono price quote karti hai, taaki doosre participants kabhi bhi trade kar sakein. Isko spread aur risk management se kamai hoti hai, direction par bet se nahi.`,
      how: `In Indian index options, liquidity comes from proprietary trading firms and registered market makers, whose obligations and incentives are set by the exchange; check the current NSE framework for the exact terms. They are not the same as an exchange or broker: a broker routes your order, the exchange matches it, and the market maker is one of the counterparties. A market maker hedges with futures or other options and runs a large book across many strikes at once.`,
      eg: {
        title: 'Why you can always trade',
        text: `At 11:00 you want to sell 1 lot of NIFTY 24,200 CE. A resting bid of ₹82.5 is there for 200 lots. You sell at 82.5 and receive 82.5 × 65 = ₹5,362.50. The buyer was a market maker, which then hedged. Without such standing quotes, you might have waited a long time for a natural buyer.`,
      },
      tip: `A market maker's presence is why spreads are narrow; it is not a guarantee of liquidity in every market condition.`,
      visual: { kind: 'layers', title: 'Who sits where', layers: [{ label: 'You (client)', note: 'places an order', tone: 'neutral' }, { label: 'Broker', note: 'routes the order', tone: 'ice' }, { label: 'Exchange (NSE)', note: 'matches orders', tone: 'ice' }, { label: 'Market maker', note: 'quotes both sides, hedges', tone: 'gold' }, { label: 'Clearing corporation (NSCCL)', note: 'guarantees settlement', tone: 'ice' }] },
    },
    {
      t: 2,
      def: `A market maker quotes a bid (price at which it buys) and an ask (price at which it sells) because the gap between them pays for the risk of holding inventory. It cannot know whether the next trade will be informed.`,
      hi: `Market maker bid (jis price par woh kharidta hai) aur ask (jis price par woh bechta hai) dono quote karta hai, kyunki inka gap inventory rakhne ke risk ka muaavza hai. Use pata nahi hota ki agla trade kisi jaankaar trader ka hai ya nahi.`,
      how: `If the maker bids ₹164.5 and sells at ₹165.5, the spread of ₹1 pays for three costs: the risk that an informed trader picks it off, the cost of hedging in futures, and the cost of capital and technology. Quoting in size lets many orders trade at once; quoting both sides at all times is the obligation that makes the market continuous. The spread is a cost to you every time you trade, and it matters more for scalpers than for positional traders.`,
      eg: {
        title: 'The spread as a percentage of premium',
        text: `ATM call at 165.5 ask with a ₹1 spread: 1 ÷ 165 ≈ 0.6% of premium. A far OTM call quoted 1.5 / 2.5 also has a ₹1 spread, but 1 ÷ 2 = 50% of premium. The same rupee spread is very cheap on one and very costly on the other. One lot of the OTM call costs 2.5 × 65 = ₹162.50 to buy and ₹97.50 to sell right back: a round trip loses ₹65.`,
      },
      tip: `Judge the spread as a percentage of the premium. A ₹1 spread on a ₹2 option is half the price.`,
      visual: { kind: 'orderBook', title: 'ATM call quote (illustrative)', bids: [[164.5, 200], [164.0, 350], [163.5, 400]], asks: [[165.5, 180], [166.0, 300], [166.5, 420]] },
      calc: { id: 'spread-cost', preset: { bid: 1.5, ask: 2.5, qty: 1, lotSize: 65 }, why: 'See what a one-rupee spread costs on a cheap option.' },
    },
    {
      t: 3,
      def: `Spread management is the market maker's job of choosing how wide to quote. A wider spread gives more cushion per trade but fewer trades; a tighter spread attracts more flow but earns less and exposes the maker to being picked off.`,
      hi: `Spread management ka matlab hai market maker kitna wide quote kare. Wide spread mein har trade par zyada cushion milta hai par trade kam aate hain; tight spread mein flow zyada aata hai par kamai kam hoti hai aur galat taraf pakde jaane ka risk badhta hai.`,
      how: `A maker widens spreads when volatility is high, news is due, liquidity is thin, or its own inventory is large. It narrows them when flow is balanced and the hedge is cheap. Competition from other makers pushes spreads down near ATM. You can see this in real time: spreads often widen in the first minutes of the day, around data releases and in the last minutes of expiry.`,
      eg: {
        title: 'Spread before and after an event',
        text: `ATM call quoted 164.5 / 165.5 (spread ₹1) on a calm day. Before a policy announcement it is 163.0 / 167.0 (spread ₹4). A retail trader who buys and sells one lot immediately loses 1 × 65 = ₹65 on the calm day and 4 × 65 = ₹260 around the event. That is four times the friction before any market move.`,
      },
      tip: `Avoid market orders when spreads are wide; use limit orders so that you decide the price you pay.`,
      visual: { kind: 'bars', title: 'Round-trip spread cost of one lot (₹)', unit: ' ₹', items: [{ label: 'Calm day (₹1 spread)', value: 65, tone: 'ice' }, { label: 'Event (₹4 spread)', value: 260, tone: 'gold' }] },
      calc: { id: 'spread-cost', preset: { bid: 163, ask: 167, qty: 1, lotSize: 65 }, why: 'Cost of crossing a wide spread for one lot.' },
    },
    {
      t: 4,
      def: `Inventory management is controlling how much of each position the maker is holding. If it has sold too many calls, it is short; it needs to bring that back toward zero by changing its quotes or hedging.`,
      hi: `Inventory management ka matlab hai maker ke paas kisi position ki kitni quantity hai us par control. Agar usne bahut saari calls bech di hain toh woh short hai; use apne quotes badal kar ya hedge karke is position ko zero ke paas laana padta hai.`,
      how: `If clients keep buying calls, the maker becomes short and raises both its bid and ask (a "skew") to make selling more expensive and buying more attractive. It also hedges with futures. Limits exist by strike, by expiry and in total Greeks, set by the firm's risk system and by exchange and clearing-member limits. Inventory does not disappear; it is transferred to the hedge, so the residual risk is the part that cannot be hedged: gamma, vega and skew.`,
      eg: {
        title: 'Skewing the quote',
        text: `A maker sold 60 lots of the 24,200 CE and bought back 20, so it is net short 40 lots (40 × 65 = 2,600 units). Its neutral quote was 82.0 / 83.0. To discourage more selling and encourage buying, it moves to 82.5 / 83.5. If a client buys 10 lots at 83.5 instead of 83.0, the maker earns an extra 0.5 × 650 = ₹325 on that order for taking more risk.`,
      },
      tip: `A quote that shifts up with heavy buying is mechanics, not a prediction that the market will rise.`,
      visual: { kind: 'flow', title: 'Inventory loop', steps: [{ label: 'Clients buy calls', tone: 'ice' }, { label: 'Maker becomes short', tone: 'gold' }, { label: 'Raises bid and ask', tone: 'gold' }, { label: 'Hedges in futures', tone: 'neutral' }, { label: 'Inventory back near zero', tone: 'neutral' }] },
    },
    {
      t: 5,
      def: `Delta hedging means offsetting the directional exposure of an option position with the underlying (here, NIFTY futures) so that small price moves leave the total value about unchanged.`,
      hi: `Delta hedging ka matlab hai option position ki direction wali exposure ko underlying (yahan NIFTY futures) se offset karna, taaki chhote price moves se total value lagbhag same rahe.`,
      how: `Delta tells how many units of the underlying an option behaves like. A short call with delta 0.52 behaves like being short 0.52 units, so the maker buys 0.52 units of futures per unit sold. Delta changes with spot, time and volatility, so the hedge must be adjusted; each adjustment costs spread and charges. How often to re-hedge is a trade-off: too often is expensive, too rarely leaves risk. A delta-neutral book is not risk-free; it is still exposed to gamma, vega and gaps.`,
      eg: {
        title: 'The delta hedge in numbers',
        text: `Short 100 lots of 24,000 CE (6,500 units, delta 0.5205 from the model). Short delta = 6,500 × 0.5205 = 3,383 units, about 52 lots of futures (52 × 65 = 3,380). After hedging, a 10-point rise loses about 0.52 × 6,500 × 10 = ₹33,800 on the calls and gains 3,380 × 10 = ₹33,800 on futures; the net is almost zero for a small move.`,
      },
      tip: `Delta-neutral only means "neutral for a small move right now". It says nothing about big moves, time or volatility.`,
      visual: { kind: 'compare', title: 'Before and after the hedge', left: { head: 'Short 100 lots CE', tone: 'gold', points: ['Short about 3,380 units of delta', 'Loses if spot rises', 'Collects theta'] }, right: { head: 'Plus long 52 lots futures', tone: 'ice', points: ['Net delta about zero', 'Small moves cancel', 'Gamma and vega remain'] } },
      calc: { id: 'portfolio-delta', preset: { d1: 0.52, q1: -6500, d2: 1, q2: 3380, d3: 0, q3: 0 }, why: 'Net the option delta against the futures hedge.' },
    },
    {
      t: 6,
      def: `Gamma hedging manages the way delta itself changes as spot moves. A maker who is short options is short gamma: its delta becomes more negative as the market rises and more positive as it falls, which forces it to keep re-hedging.`,
      hi: `Gamma hedging us cheez ko manage karta hai jisme spot badalne par delta khud badalta hai. Jo maker options short karta hai woh short gamma hota hai: market badhne par uska delta aur negative hota hai aur girne par positive, isliye use baar-baar re-hedge karna padta hai.`,
      how: `Short gamma means buying futures after the market has risen and selling after it has fallen, which is buying high and selling low and creates a hedging cost. This cost is paid for by theta collected from the options sold. Makers reduce gamma by buying other options (often in other strikes or expiries) or by quoting prices that discourage more gamma in the book. Gamma is largest for ATM options close to expiry.`,
      eg: {
        title: 'Hedging cost of short gamma',
        text: `Short 100 lots (6,500 units) of ATM calls, gamma 0.00101: delta moves 6,500 × 0.00101 = 6.565 units per point. Spot rises 100 points: delta moves 656.5 units, about 10 lots, so the maker must buy another 10 lots of futures at higher prices. If the market then returns, those 10 lots are sold lower. The loss on that round trip is part of the gamma cost.`,
      },
      tip: `Gamma cost grows with the square of the move: a move twice as big costs about four times as much to hedge.`,
      visual: { kind: 'curve', title: 'Gamma peaks at the money', curve: 'gamma' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 5, iv: 14, rate: 6.5 }, why: 'Read gamma and delta for the example contract.' },
    },
    {
      t: 7,
      def: `Vega hedging manages exposure to changes in implied volatility. A maker short options loses when implied volatility (IV) rises and gains when it falls, so it offsets some of this using other options.`,
      hi: `Vega hedging implied volatility (IV) ke badalne se hone wali exposure ko manage karta hai. Short options wala maker IV badhne par loses aur girne par gains karta hai, isliye woh doosre options se is risk ko kuch had tak offset karta hai.`,
      how: `Futures have no vega, so unlike delta, vega cannot be hedged with futures. The maker uses options of other strikes and expiries, balancing the book's total vega, and watches how the volatility surface (the IV across strikes and expiries) moves. Near-dated options have less vega than long-dated ones. A maker might also run a deliberate vega view within limits, but a pure market maker tends to keep it small.`,
      eg: {
        title: 'Vega on 100 lots',
        text: `ATM call vega is 11.19 per IV point per unit (5 days). Short 6,500 units: if IV rises 2 points (14 to 16), the position loses 6,500 × 11.19 × 2 = about ₹1,45,461, with spot unchanged. A 2-point IV fall earns the same. Delta hedges in futures would not change this at all.`,
      },
      tip: `Futures hedge delta only. Vega can be offset only with other options.`,
      visual: { kind: 'curve', title: 'Vega is largest near ATM', curve: 'vega' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 5, iv: 16, rate: 6.5 }, why: 'Reprice at IV 16 and compare with IV 14.' },
    },
    {
      t: 8,
      def: `Managing overnight exposure means the maker decides how much risk to keep when the market closes, because it cannot hedge or trade during the gap until the next open, except in other markets that trade overnight.`,
      hi: `Overnight exposure manage karne ka matlab hai ki maker decide karta hai market close hone par kitna risk rakhe, kyunki agle open tak woh hedge ya trade nahi kar sakta, sirf un doosre markets mein jo raat ko chalte hain.`,
      how: `News after the close (global markets, US data, company results) can open NIFTY with a gap, and delta-hedged short-gamma positions lose on a gap because they cannot re-hedge along the way. Makers therefore reduce size or buy cheap protection (wings) before known events. Theta is also earned overnight: the option loses value for weekends and holidays in calendar-day models, although traders debate how time should be counted. Margin (SPAN plus exposure) must also be funded overnight.`,
      eg: {
        title: 'Gamma loss from a gap versus theta earned',
        text: `Short 6,500 units, gamma 0.00101, 1 day of theta about ₹17.4 per unit: theta earned ≈ 17.4 × 6,500 ≈ ₹1,13,199 per day. For a gap of 176 points (the 1σ daily move at VIX 14), the gamma loss ≈ ½ × 6.565 × 176² ≈ ₹1,01,679, about the same as the theta earned. A 3σ gap of 528 points costs ½ × 6.565 × 528² ≈ ₹9,15,108, which is about 9 times larger.`,
      },
      tip: `Tail moves, not average moves, damage short-gamma books. Size the book for the gap you do not expect.`,
      visual: { kind: 'bars', title: 'Gamma cost of a gap (₹ lakh, 100 lots short)', unit: ' lakh', items: [{ label: '1σ gap (176 pts)', value: 1.02, tone: 'gold' }, { label: '2σ gap (352 pts)', value: 4.07, tone: 'gold' }, { label: '3σ gap (528 pts)', value: 9.15, tone: 'neutral' }] },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: 'Get the 1σ daily move to size a gap scenario.' },
    },
    {
      t: 9,
      def: `Hedging under changing volatility means keeping the hedge sound when implied volatility moves up or down, because delta, gamma and prices all depend on it.`,
      hi: `Changing volatility mein hedging ka matlab hai ki IV upar-neeche hone par bhi hedge sahi rahe, kyunki delta, gamma aur price teeno IV par depend karte hain.`,
      how: `When IV rises, option prices rise, deltas of OTM options increase and those of ITM options fall slightly; gamma at ATM falls. When IV falls, ATM gamma rises. A maker therefore recalculates Greeks continuously on the live volatility surface instead of fixed numbers. It also deals with the link between spot and IV: in equity indices IV often rises when spot falls, so spot and vega moves may hurt at the same time.`,
      eg: {
        title: 'Price at three IV levels',
        text: `5-day ATM call, spot 24,000: at IV 10% price ≈ ₹120.75 and gamma 0.00142; at IV 14% price ≈ ₹165.49 and gamma 0.00101; at IV 20% price ≈ ₹232.65 and gamma 0.00071. For a short of 6,500 units, IV moving from 14 to 20 means a mark-to-market loss of (232.65 − 165.49) × 6,500 ≈ ₹4,36,501 with spot unchanged, which is far larger than a normal day's spread income.`,
      },
      tip: `IV is not a constant. A hedge that is perfect at one IV may be wrong at another.`,
      visual: { kind: 'bars', title: '5-day ATM call premium by IV (₹)', unit: ' ₹', items: [{ label: 'IV 10%', value: 120.75, tone: 'ice' }, { label: 'IV 14%', value: 165.49, tone: 'gold' }, { label: 'IV 20%', value: 232.65, tone: 'gold' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 5, iv: 20, rate: 6.5 }, why: 'Reprice the same option at a higher IV.' },
    },
    {
      t: 10,
      def: `Market-maker risk is the set of things that can lose money despite hedging: gaps, volatility spikes, a sudden loss of liquidity, a model error, operational failure and margin calls.`,
      hi: `Market-maker risk un cheezon ka set hai jo hedging ke baad bhi paisa doba sakti hain: gaps, volatility spikes, achanak liquidity ka khatam hona, model ki galti, operational failure aur margin calls.`,
      how: `A delta-hedged maker is not neutral to everything. The main risks are jump risk (spot moves far between hedges), volatility risk, liquidity risk (the hedge cannot be done at a fair price in a fast market), model risk (Black–Scholes assumes smooth moves and constant volatility) and operational risk (a system or connectivity fault). The clearing corporation and exchange require margin and may impose limits, so a bad day can mean forced reduction. This is why makers charge wider spreads in unstable times and why liquidity can vanish in a crash.`,
      eg: {
        title: 'Why quotes disappear',
        text: `During a fast fall, NIFTY drops 300 points in minutes. A maker short 6,500 units of gamma at 0.001 has its delta shift by 6,500 × 0.001 × 300 = 1,950 units (about 30 lots) in the move; it may widen the ask from ₹1 to ₹10 or pull quotes altogether. A client who wanted to sell a put at that time faces a thin, wide book; this is a normal consequence of the maker protecting itself, not necessarily of a problem with the exchange.`,
      },
      tip: `Liquidity is least reliable when you need it most. Plan exits using limit orders and position sizes that you can hold through a fast market.`,
      visual: { kind: 'matrix', title: 'Where a hedged book still loses', xLabels: ['Small move', 'Large move'], yLabels: ['Vol stable', 'Vol jumps'], cells: [{ head: 'Little risk', note: 'earns spread and theta', tone: 'neutral' }, { head: 'Gamma loss', note: 'hedges lag the move', tone: 'bear' }, { head: 'Vega loss', note: 'marks move against', tone: 'bear' }, { head: 'Worst case', note: 'gap plus IV spike', tone: 'bear' }] },
    },
  ],
  tools: [{ id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 5, iv: 14, rate: 6.5 }, why: 'Delta, gamma and vega for the module\'s example contract.' }],
}
export default m
