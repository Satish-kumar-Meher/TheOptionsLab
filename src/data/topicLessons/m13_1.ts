import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '13.1',
  intro:
    `Every option has a buyer and a seller. The seller, called the option writer, takes the other side: collects the premium and accepts an obligation. This module introduces who the writers actually are, from retail traders to market makers, and why their capital, hedges and goals make them behave differently. Option writers do not always win; their gains are limited to the premium while their risk can be large. All numbers are illustrative Black-Scholes values (Nifty 24,000, 7 days, IV 14%, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `Har option ka ek buyer aur ek seller hota hai. Seller, yaani option writer, doosri taraf khada hota hai: premium leta hai aur ek obligation uthata hai. Is module mein dekhenge ki writers asal mein kaun hote hain, retail traders se market makers tak, aur unki capital, hedges aur goals unhe alag tarah se behave kyun karwate hain. Option writers hamesha jeette nahi; unka profit premium tak limited hota hai jabki risk bada ho sakta hai. Saare numbers illustrative Black-Scholes values hain (Nifty 24,000, 7 days, IV 14%, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `An option writer is the person who sells (sells to open) an option contract. In return for the premium, the writer takes on an obligation: a call writer must deliver the upside if the buyer exercises, and a put writer must absorb the downside. Writers are not one group. A retail trader selling a weekly option, a fund selling covered calls against holdings and a market maker quoting two-way prices all write options, but for different reasons and with different risks.`,
    conceptHi:
      `Option writer woh hota hai jo option contract sell karta hai (sell to open). Premium ke badle writer ek obligation leta hai: call writer ko buyer ke exercise karne par upside dena padta hai, aur put writer ko downside uthana padta hai. Writers ek jaisa group nahi hain. Weekly option bechne wala retail trader, holdings ke against covered call bechne wala fund aur two-way price dene wala market maker, teeno options write karte hain, lekin alag wajah aur alag risk ke saath.`,
    mechanism:
      `When you write an option on NSE, your broker blocks margin (SPAN plus exposure margin, computed by the clearing corporation NSCCL and the exchange) and the premium is credited to you. Your profit is capped at the premium; your loss depends on how far the index moves against you: unlimited for a naked call, large (down to zero) for a naked put. Index options are European and cash-settled, so there is no delivery for NIFTY, only the settlement difference at expiry. Margins are marked to market daily, so a losing writer faces cash calls before expiry. Rules and margin figures change, so always check the current NSE and broker margin calculators.`,
    example: {
      title: 'Writing a 24,000 CE (illustrative)',
      text: `A trader sells one lot (65) of the 7-day 24,000 CE at ₹200.85 and receives ₹200.85 × 65 = ₹13,055.25. If Nifty ends at or below 24,000 the option expires worthless and the writer keeps the premium. If Nifty ends at 24,300 the option is worth ₹300, so the writer loses 300 − 200.85 = ₹99.15 per unit, which is ₹6,444.75 per lot. At 24,900 the loss would be ₹45,444.75 per lot, about 3.5 times the premium received.`,
    },
    chart: {
      kind: 'payoff',
      title: 'Short 24,000 CE at expiry',
      caption: 'Profit is capped at the premium; loss grows as Nifty rises.',
      spot: 24000,
      legs: [{ type: 'CE', side: -1, strike: 24000, premium: 200.85 }],
    },
    optionChain:
      `On the option chain, writers show up indirectly as open interest and as the premium collected at each strike. Rising OI at a strike with a falling price is consistent with writing, but OI alone cannot show who initiated a trade: the same OI increase can come from buyers opening longs. Never read "OI up" as "writers are in control". Look at both CE and PE sides, the premium, the IV and the price behaviour near the strike.`,
    psychology:
      `Writers are paid for patience and punished for surprises. The steady small gains make many feel safe, which is exactly when position size grows. Retail writers often anchor on "the probability of profit is high" and forget the size of the tail. Professional writers worry more about the worst day than the average day and hedge for it. Fear, margin calls and the urge to recover losses drive the worst writer decisions.`,
    scenarios: {
      bullish:
        `A strong rally hurts call writers: their short calls gain intrinsic value and losses can grow fast. Put writers do well: their options lose value and they may keep the premium.`,
      bearish:
        `A sharp fall hurts put writers, whose losses grow as the index drops and as IV spikes. Call writers do well and may keep the premium.`,
      sideways:
        `A range-bound market with falling IV is the friendliest case for writers on both sides: options decay and the premium is kept. The risk is a sudden breakout from the range.`,
    },
    practice: [
      {
        q: `A trader sells one lot (65) of a 24,000 CE at ₹200.85. What premium is received, and what is the loss per lot if Nifty settles at 24,300?`,
        a: `Premium = 200.85 × 65 = ₹13,055.25. At 24,300 the option's value is 300, so the loss per unit is 300 − 200.85 = ₹99.15. Per lot: 99.15 × 65 = ₹6,444.75.`,
      },
      {
        q: `What is the breakeven at expiry for the writer of the 24,000 CE sold at ₹200.85, and for the writer of a 23,800 PE sold at ₹92.18?`,
        a: `Call writer: strike + premium = 24,000 + 200.85 = 24,200.85. Put writer: strike − premium = 23,800 − 92.18 = 23,707.82. Beyond those levels each writer starts losing money at expiry.`,
      },
      {
        q: `A put writer sells a 23,800 PE at ₹92.18. Nifty settles at 23,400. What is the loss per lot of 65?`,
        a: `Intrinsic value = 23,800 − 23,400 = 400. Loss per unit = 400 − 92.18 = ₹307.82. Per lot: 307.82 × 65 = ₹20,008.30.`,
      },
      {
        q: `Why is the call writer's maximum loss described as unlimited, and the put writer's as very large but finite?`,
        a: `Nifty has no theoretical upper limit, so a short call can lose without bound as the index rises. Nifty cannot fall below zero, so a short put's worst loss is the strike (times lot size) minus the premium received.`,
      },
    ],
    assignment:
      `Pick one NIFTY option from the live chain. Write down its premium, compute the amount received for one lot, the breakeven and the loss per lot if Nifty finishes 300 points beyond the strike. Then check your broker's margin calculator for the margin needed to sell it, note the figure and the date, and write two lines on how that margin compares with the premium you would collect.`,
  },
  topics: [
    {
      t: 1,
      def: `Option writing means selling an option to open a position. The writer receives the premium upfront and takes on the obligation to settle if the buyer exercises. Writer is the same as option seller.`,
      hi: `Option writing ka matlab hai option ko sell karke position kholna. Writer ko premium pehle mil jaata hai aur buyer exercise kare toh settle karne ki obligation uske upar aati hai. Writer aur option seller ek hi cheez hai.`,
      how: `The writer's side of the trade is: collect premium now, owe the payoff later. On NSE the writer must keep margin with the broker, calculated using SPAN and exposure margins, and the position is marked to market daily. The maximum profit is the premium. For NIFTY options, which are European and cash-settled, the obligation is settled in cash at expiry based on the settlement price. The clearing corporation guarantees the trade so the buyer does not depend on the writer personally.`,
      eg: {
        title: 'Selling one lot of a 24,000 CE (illustrative)',
        text: `Sell 1 lot (65) of the 7-day 24,000 CE at ₹200.85 and receive ₹13,055.25. At expiry with Nifty at 24,300, the writer owes 300 points: loss of 300 − 200.85 = ₹99.15 per unit, or ₹6,444.75 per lot. At 24,100 the writer still profits: 200.85 − 100 = ₹100.85 per unit, or ₹6,555.25 per lot.`,
      },
      tip: `Receiving premium feels like earning income, but it is the price of accepting a risk. The risk stays with you until the position is closed or expires.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,000 CE',
        caption: 'Maximum profit equals the premium received.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24000, premium: 200.85 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24000, premium: 200.85, expiryPrice: 24300, lotSize: 65, lots: 1 },
        why: 'Check the writer\'s profit or loss at any expiry level.',
      },
    },
    {
      t: 2,
      def: `A call writer sells call options. They expect the index to stay below the strike (or not rise much) and profit if it does. They lose if the index rises beyond the strike plus the premium collected.`,
      hi: `Call writer call options bechta hai. Use lagta hai ki index strike ke neeche rahega (ya zyada nahi badhega) aur tab use profit hota hai. Index strike plus collected premium se upar chala jaaye toh use loss hota hai.`,
      how: `A call writer is short the right to buy: if the buyer exercises, the writer pays the gain above the strike. Call writers cluster at strikes above the market, which is why high CE OI is often read as potential resistance. That is only a possible reference level, not a wall: if the index rises, writers hedge or close, and heavy CE OI can be unwound quickly. Losses for a naked call writer are open-ended as Nifty rises.`,
      eg: {
        title: 'Selling a 24,200 CE (illustrative)',
        text: `The 7-day 24,200 CE trades at ₹113.55; the writer receives ₹7,380.75 for one lot of 65. Breakeven is 24,200 + 113.55 = 24,313.55. At expiry 24,500 the loss is (24,500 − 24,200) − 113.55 = ₹186.45 per unit, which is ₹12,119.25 per lot, about 1.6 times the premium received.`,
      },
      tip: `A call writer's profit is capped but the loss is not. Sizing for the big rally day matters more than the average day.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,200 CE',
        caption: 'Loss grows rupee for rupee above the breakeven.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24200, premium: 113.55 }],
      },
      calc: {
        id: 'breakeven',
        preset: { optType: 'CE', side: 'sell', strike: 24200, premium: 113.55 },
        why: 'Find the call writer\'s breakeven level.',
      },
    },
    {
      t: 3,
      def: `A put writer sells put options. They expect the index to stay above the strike and profit if it does. They lose if the index falls below the strike minus the premium collected.`,
      hi: `Put writer put options bechta hai. Use lagta hai ki index strike ke upar rahega aur tab use profit hota hai. Index strike minus collected premium se neeche gir jaaye toh use loss hota hai.`,
      how: `A put writer is short the right to sell: if the buyer exercises, the writer pays the shortfall below the strike. Put writers cluster at strikes below the market, so high PE OI is often read as potential support. Again, only a reference level, not a guarantee. Falls tend to come with rising IV and fast moves, so put writers face higher margins and quick losses together. The worst case is the strike minus the premium (times lot size), if the index went to zero.`,
      eg: {
        title: 'Selling a 23,800 PE (illustrative)',
        text: `The 7-day 23,800 PE trades at ₹92.18; the writer receives ₹5,991.70 for one lot. Breakeven is 23,800 − 92.18 = 23,707.82. At expiry 23,400 the loss is 400 − 92.18 = ₹307.82 per unit, ₹20,008.30 per lot, about 3.3 times the premium received.`,
      },
      tip: `Put writing pays small and often until it does not. A far strike is not "safe", it is a larger loss waiting for a rarer day.`,
      visual: {
        kind: 'payoff',
        title: 'Short 23,800 PE',
        caption: 'Loss grows as Nifty falls below the breakeven.',
        spot: 24000,
        legs: [{ type: 'PE', side: -1, strike: 23800, premium: 92.18 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 23800, premium: 92.18, expiryPrice: 23400, lotSize: 65, lots: 1 },
        why: 'Check the put writer\'s result at 23,400.',
      },
    },
    {
      t: 4,
      def: `Retail option sellers are individual traders using their own savings, usually with small to medium capital. They often sell weekly options because the premium decays quickly.`,
      hi: `Retail option sellers woh individual traders hain jo apni savings se trade karte hain, aam taur par chhoti se medium capital ke saath. Woh aksar weekly options bechte hain kyunki unka premium tezi se decay hota hai.`,
      how: `Retail writers face limits that bigger players do not: smaller capital relative to margin, higher costs, less access to hedging tools and less diversification. SEBI's study of FY2024-25 found that about 91% of individual equity derivatives traders had net losses, with total losses of more than ₹1 lakh crore; the study covers all individual F&O traders, not only writers. Option selling is not automatically the winning side, because tail losses can erase many small wins. Check SEBI's published study for exact figures.`,
      eg: {
        title: 'Small premium, large tail (illustrative)',
        text: `A trader sells the 23,500 PE at ₹28.56, collecting ₹1,856.40 per lot of 65, because it feels far away. If Nifty falls 6.25% to 22,500 by expiry, the loss is (1,000 − 28.56) = ₹971.44 per unit, which is ₹63,143.60 per lot, about 34 times the premium collected. One bad week can cancel about 34 weeks of such premiums.`,
      },
      tip: `Cheap, far-away puts feel safe because of the high win rate. The risk is in the size of the loss on the one day it fails.`,
      visual: {
        kind: 'bars',
        title: 'Premium collected versus loss in a 6.25% fall (illustrative, per lot of 65)',
        caption: 'Selling the 23,500 PE; Nifty to 22,500.',
        unit: ' ₹',
        items: [
          { label: 'Premium collected', value: 1856.4, tone: 'ice' },
          { label: 'Loss at 22,500', value: 63143.6, tone: 'bear' },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 23500, premium: 28.56, expiryPrice: 22500, lotSize: 65, lots: 1 },
        why: 'See the tail loss against the small premium.',
      },
    },
    {
      t: 5,
      def: `HNI (high net worth) option sellers are wealthy individuals trading large size, often through the broker's dealing desk or a family office. They can afford large margin and hold hedged or defined structures.`,
      hi: `HNI (high net worth) option sellers dhani individuals hain jo bade size mein trade karte hain, aksar broker ke dealing desk ya family office ke through. Woh bada margin afford kar sakte hain aur hedged ya defined structures rakhte hain.`,
      how: `HNIs can post large margin, spread risk across strikes and expiries and sometimes hedge with the cash portfolio or with futures. Many sell strangles or spreads with a plan for adjustment. Their size means their own trading can move liquidity at specific strikes in less liquid contracts. Wealth does not remove risk: large size also means large absolute losses, and margin calls can come in fast markets.`,
      eg: {
        title: 'A short strangle (illustrative)',
        text: `Sell the 23,600 PE (₹43.72) and the 24,400 CE (₹57.54): credit ₹101.26 per unit, ₹6,581.90 per lot of 65. Breakevens are 23,498.74 and 24,501.26. If Nifty ends at 24,800 the loss is (800 − 101.26) = ₹698.74 per unit, ₹45,418.10 per lot, about 6.9 times the credit. With 20 lots the loss would be about ₹9.08 lakh.`,
      },
      tip: `Big capital allows bigger positions, not safer ones. Position size relative to the worst day is what keeps a writer solvent.`,
      visual: {
        kind: 'payoff',
        title: 'Short 23,600 PE and 24,400 CE (strangle)',
        caption: 'Profit inside the breakevens, losses beyond them.',
        spot: 24000,
        legs: [
          { type: 'PE', side: -1, strike: 23600, premium: 43.72 },
          { type: 'CE', side: -1, strike: 24400, premium: 57.54 },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24400, premium: 57.54, expiryPrice: 24800, lotSize: 65, lots: 1 },
        why: 'Check the call-side loss of the strangle at 24,800 (add the put side separately).',
      },
    },
    {
      t: 6,
      def: `Institutional option sellers are mutual funds, insurers, pension funds, foreign portfolio investors and banks. They usually write options for income or to adjust risk on large holdings, within regulatory and mandate limits.`,
      hi: `Institutional option sellers mein mutual funds, insurers, pension funds, foreign portfolio investors aur banks aate hain. Woh aam taur par income ke liye ya apni badi holdings ka risk adjust karne ke liye options bechte hain, regulatory aur mandate limits ke andar.`,
      how: `Institutions are governed by regulations and by their scheme or fund mandates. SEBI allows mutual funds to write covered call options on stocks they hold, under specified conditions, so their writing is mostly hedged by the underlying holding. Institutions manage risk with limits, stress tests and approved strategy lists. Their positions can be large in aggregate, but they are often not naked directional bets. Do not assume every large OI build-up is institutional; OI does not reveal the participant.`,
      eg: {
        title: 'Covered call on a Nifty-linked holding (illustrative)',
        text: `A fund holds a Nifty-linked portfolio worth about ₹15,60,000 (24,000 × 65) and sells one lot of the 7-day 24,500 CE at ₹39.20, earning ₹2,548. That is about 0.16% of the holding for the week. Upside is capped above 24,500 + 39.20 = 24,539.20, and the fund still bears the downside of the holding, reduced only by the premium.`,
      },
      tip: `Institutional writing is usually tied to something they own or must hedge. Do not copy their structure without copying their underlying holding.`,
      visual: {
        kind: 'layers',
        title: 'Who writes options (rough ladder by capital and risk tools)',
        caption: 'An illustrative ordering, not an official classification.',
        layers: [
          { label: 'Institutions', note: 'Mandates, hedged by holdings', tone: 'ice' },
          { label: 'Market makers and prop desks', note: 'Two-way quotes, delta hedging', tone: 'ice' },
          { label: 'HNI traders', note: 'Large margin, structured positions', tone: 'gold' },
          { label: 'Retail traders', note: 'Small capital, high cost, fewer tools', tone: 'gold' },
        ],
      },
    },
    {
      t: 7,
      def: `Proprietary (prop) traders are firms or individuals who trade the firm's own capital for profit instead of clients' money. They often write options to capture price differences between implied and realized volatility.`,
      hi: `Proprietary (prop) traders woh firms ya individuals hain jo clients ke paise ki jagah firm ki apni capital se trade karte hain. Woh aksar implied aur realized volatility ke fark ko pakadne ke liye options write karte hain.`,
      how: `Prop traders usually run systematic strategies: they sell options when implied volatility looks high relative to expected realized volatility, and hedge the index exposure (delta) with futures or other options. They are fast, well-capitalised and sensitive to costs, margin and risk limits. Their profits depend on small edges repeated many times and on controlling the rare large loss. They may also sell premium one day and buy it the next, so their positions are not a permanent "view".`,
      eg: {
        title: 'Selling volatility, delta hedged (illustrative)',
        text: `A prop desk sells the 7-day 24,000 straddle at IV 15%, about ₹398.24, believing realized volatility will be nearer 12%, where the straddle would be worth about ₹318.92. The difference of ₹79.32 per unit (about ₹5,156 per lot of 65) is the targeted edge. It hedges delta with Nifty futures; if realized volatility turns out high instead, the desk loses.`,
      },
      tip: `Prop traders trade volatility and price differences, not just direction. Their OI footprint may not mean what retail traders assume.`,
      visual: {
        kind: 'flow',
        title: 'A prop volatility trade',
        caption: 'Sell expensive volatility, hedge delta, manage risk.',
        steps: [
          { label: 'Spot option IV vs expected realized', note: 'IV 15% vs expectation 12%', tone: 'ice' },
          { label: 'Sell straddle', note: 'Collect ₹398.24 per unit', tone: 'gold' },
          { label: 'Hedge delta', note: 'Futures keep exposure near zero', tone: 'ice' },
          { label: 'Manage', note: 'Limits on loss and gamma', tone: 'gold' },
        ],
      },
      calc: {
        id: 'straddle-move',
        preset: { spot: 24000, cePrice: 199.12, pePrice: 199.12, strike: 24000 },
        why: 'Read the breakevens implied by the 398.24 straddle (illustrative even split).',
      },
    },
    {
      t: 8,
      def: `Market makers continuously quote both a buy price (bid) and a sell price (ask) for options, earning the spread and providing liquidity. They are often net writers at some strikes because they sell to buyers who want to buy.`,
      hi: `Market makers options ke liye lagatar buy price (bid) aur sell price (ask) dono quote karte hain, spread kamate hain aur liquidity dete hain. Woh kuch strikes par net writers ban jaate hain kyunki woh un buyers ko bechte hain jo khareedna chahte hain.`,
      how: `A market maker earns the bid-ask spread on high volumes and hedges the resulting delta, gamma and vega exposure as quickly as possible with futures and other options. They do not take a view on direction; they aim to stay near-neutral. In stressed conditions, market makers widen spreads or step back, which is why option prices can jump around in fast markets. Exchanges have market-making schemes for some contracts; check NSE for the current ones.`,
      eg: {
        title: 'Spread earnings (illustrative)',
        text: `A market maker quotes an option at ₹99.50 bid and ₹100.50 ask. Buying at the bid and selling at the ask earns ₹1 per unit, or ₹65 per lot. Over 200 lots of round trips that is 200 × 65 = ₹13,000 of gross spread before costs and hedging expenses. A single unhedged gap move can cost many times that, which is why hedging comes first.`,
      },
      tip: `Wide spreads on your screen mean the market makers see higher risk. Trade with limit orders and check the spread before entering.`,
      visual: {
        kind: 'orderBook',
        title: 'A market maker\'s two-way quote (illustrative option, ₹)',
        caption: 'The gap between the best bid and best ask is the market maker\'s compensation.',
        bids: [[99.5, 650], [99.25, 1300], [99.0, 1950]],
        asks: [[100.5, 650], [100.75, 1300], [101.0, 1950]],
      },
      calc: {
        id: 'spread-cost',
        preset: { bid: 99.5, ask: 100.5, qty: 200, lotSize: 65 },
        why: 'Round-trip spread value for 200 lots at a ₹1 spread.',
      },
    },
    {
      t: 9,
      def: `Hedged option sellers write an option and buy another option or hold a position that limits the maximum loss. The hedge reduces the risk but also reduces the net premium collected.`,
      hi: `Hedged option sellers ek option bechte hain aur doosra option khareedte hain ya aisi position rakhte hain jo maximum loss ko limit karti hai. Hedge risk ghatata hai, lekin net premium bhi kam kar deta hai.`,
      how: `Common forms are spreads and condors, where a bought option caps the loss on the sold one. Margin is lower than for naked positions because the loss is defined. A hedge is paid for with the premium of the bought option, so the maximum profit shrinks. Hedges can lose money in calm markets (the bought option decays), but they protect the account on the bad day, which is the point.`,
      eg: {
        title: 'Bear call spread (illustrative)',
        text: `Sell the 24,200 CE at ₹113.55 and buy the 24,400 CE at ₹57.54: net credit ₹56.01 per unit (₹3,640.65 per lot of 65). Maximum loss is the 200-point width minus the credit: 200 − 56.01 = ₹143.99 per unit, ₹9,359.35 per lot. Breakeven is 24,200 + 56.01 = 24,256.01. The loss cannot get worse than this however far Nifty rises.`,
      },
      tip: `A hedge buys you a known worst case. Compare that worst case with your account size before the trade, not after.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,200 CE hedged with long 24,400 CE',
        caption: 'Loss is capped at the width minus the credit.',
        spot: 24000,
        legs: [
          { type: 'CE', side: -1, strike: 24200, premium: 113.55 },
          { type: 'CE', side: 1, strike: 24400, premium: 57.54 },
        ],
      },
      calc: {
        id: 'risk-reward',
        preset: { winRate: 60, avgWin: 3640.65, avgLoss: 9359.35 },
        why: 'Compare the win rate this spread needs with the payoff (illustrative 60% win rate).',
      },
    },
    {
      t: 10,
      def: `Unhedged (naked) option sellers write options with no protective position. The maximum profit is the premium; the loss can be very large, and for a naked call it is unlimited.`,
      hi: `Unhedged (naked) option sellers bina kisi protective position ke options bechte hain. Maximum profit premium hota hai; loss bahut bada ho sakta hai, aur naked call mein unlimited hota hai.`,
      how: `Naked writing needs high margin because the exchange must cover the potential loss. In a fast move the margin requirement can rise suddenly while the loss grows, and brokers may square off positions if the margin falls short. Gap moves, such as on Budget day or an election result, can jump past any stop-loss. Naked writing is the approach responsible for most of the very large retail losses; it requires strict sizing and rules, and is not suitable for beginners.`,
      eg: {
        title: 'A naked call on a big up day (illustrative)',
        text: `Sell the 7-day 24,000 CE at ₹200.85 (₹13,055.25 per lot of 65). Nifty ends at 24,900, up 3.75%. The loss is 900 − 200.85 = ₹699.15 per unit, ₹45,444.75 per lot, about 3.5 times the premium. A stop-loss at, say, 2 times the premium may not execute at the intended price in a gap.`,
      },
      tip: `Never sell naked options without knowing, in rupees, what a 5% gap against you costs, and being able to afford it.`,
      visual: {
        kind: 'payoff',
        title: 'Naked short 24,000 CE',
        caption: 'No cap on the loss on the upside.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24000, premium: 200.85 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24000, premium: 200.85, expiryPrice: 24900, lotSize: 65, lots: 1 },
        why: 'See a naked call\'s loss at 24,900.',
      },
    },
  ],
}

export default m
