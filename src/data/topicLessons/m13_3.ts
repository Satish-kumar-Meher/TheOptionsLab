import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '13.3',
  intro:
    `Option writers use ten common structures, from a single naked short option to a four-leg iron condor. They differ in how much premium they collect, how much risk they carry and what the market has to do for them to profit. This module describes each type with the payoff, the breakevens and the risk, so you can recognise them on the option chain and understand what they mean for the person on the other side. All values are illustrative Black-Scholes numbers (Nifty 24,000, 7 days, IV 14%, rate 6.5%, lot 65 - check the current NSE contract specification). Educational only.`,
  introHi:
    `Option writers das common structures use karte hain, single naked short option se lekar four-leg iron condor tak. Yeh sab alag hain ki kitna premium collect karte hain, kitna risk uthate hain aur profit ke liye market ko kya karna padta hai. Is module mein har type ka payoff, breakeven aur risk dekhenge, taaki aap unhe option chain par pehchaan sakein aur samajh sakein ki doosri taraf wale ke liye iska kya matlab hai. Saare values illustrative Black-Scholes numbers hain (Nifty 24,000, 7 days, IV 14%, rate 6.5%, lot 65 - current NSE contract specification check karein). Sirf educational.`,
  steps: {
    concept:
      `Writer types are defined by two things: what protects the short option (nothing, a holding, cash, or another option) and how many strikes are sold. A naked writer has no protection; a covered or cash-secured writer has an underlying asset or cash behind the trade; a spread seller or iron condor trader has a bought option that caps the loss; a straddle or strangle seller sells both a call and a put; and a market maker handles all of these as inventory to be hedged.`,
    conceptHi:
      `Writer types do cheezon se define hote hain: short option ko kya protect kar raha hai (kuch nahi, holding, cash, ya doosra option) aur kitne strikes bechhe gaye hain. Naked writer ke paas koi protection nahi; covered ya cash-secured writer ke peeche underlying asset ya cash hota hai; spread seller ya iron condor trader ka bought option loss ko cap karta hai; straddle ya strangle seller call aur put dono bechta hai; aur market maker in sabko inventory ki tarah hedge karta hai.`,
    mechanism:
      `Margin (SPAN plus exposure, computed by NSCCL and shown in broker calculators) depends on the structure: naked positions need the most, hedged and defined-risk positions less. Premium collected also differs: the more risk you hedge away, the less credit you keep. Index options are cash-settled and European, while stock options are physically settled, so the covered-call and cash-secured-put ideas mean different things on indices and on stocks. Always check the current contract specifications and margin before a trade.`,
    example: {
      title: 'Same premium, different protection (illustrative)',
      text: `Sell the 24,200 CE at ₹113.55 naked and the loss at 24,700 is (500 − 113.55) = ₹386.45 per unit, ₹25,119.25 per lot of 65, and still growing above that. Sell it with the 24,400 CE bought at ₹57.54 and the credit falls to ₹56.01, but the maximum loss is fixed at 200 − 56.01 = ₹143.99 per unit, ₹9,359.35 per lot, however far Nifty goes.`,
    },
    chart: {
      kind: 'layers',
      title: 'Writer structures from least to most protected',
      caption: 'A teaching ladder: more protection means lower credit and lower margin.',
      layers: [
        { label: 'Naked CE / PE', note: 'No protection, highest margin', tone: 'gold' },
        { label: 'Straddle / strangle', note: 'Two naked legs, one premium pool', tone: 'gold' },
        { label: 'Covered call / cash-secured put', note: 'Backed by holding or cash', tone: 'ice' },
        { label: 'Spreads / iron condor', note: 'Loss capped by a bought option', tone: 'ice' },
        { label: 'Market maker', note: 'Hedged inventory, spread income', tone: 'ice' },
      ],
    },
    optionChain:
      `On the chain, naked writing appears as OI at single strikes, while spreads and condors appear as OI at paired strikes, often 100 to 300 points apart, because the writer buys protection at the farther strike. A high OI at a far strike may be protection bought by a hedged writer, not a bet on that level. This is why OI should never be read as "all writers" or as support and resistance with certainty.`,
    psychology:
      `Naked writers accept a high win rate and a low-probability disaster. Hedged writers accept a lower credit for sleep. Straddle sellers must be comfortable watching premiums swing against them in both directions. Market makers focus on exposure, not on views. The common trap is to choose the structure by premium size and not by worst-case loss: the largest credit usually carries the largest tail.`,
    scenarios: {
      bullish:
        `Naked and covered call writers face limits or losses; put writers, bull put spreads and the put side of strangles profit. Condors lose on the call side if the rally goes past the call spread.`,
      bearish:
        `Naked and cash-secured put writers face losses; call writers and bear call spreads profit. Condors lose on the put side if the fall goes past the put spread.`,
      sideways:
        `Most structures profit: straddles and strangles keep the premium, condors keep a smaller but safer credit, covered calls keep their income. The risk is a breakout in either direction.`,
    },
    practice: [
      {
        q: `A bear call spread sells the 24,200 CE at ₹113.55 and buys the 24,300 CE at ₹81.99. What is the credit, maximum profit, maximum loss per lot of 65 and the breakeven?`,
        a: `Credit = 113.55 − 81.99 = ₹31.56 per unit. Maximum profit per lot = 31.56 × 65 = ₹2,051.40. Width = 100, so maximum loss = 100 − 31.56 = ₹68.44 per unit = ₹4,448.60 per lot. Breakeven = 24,200 + 31.56 = 24,231.56.`,
      },
      {
        q: `A short strangle sells the 23,700 PE (₹64.57) and the 24,300 CE (₹81.99). Find the credit per lot and the breakevens, then the loss per lot if Nifty settles at 24,800.`,
        a: `Credit = 64.57 + 81.99 = ₹146.56 per unit; per lot = 146.56 × 65 = ₹9,526.40. Breakevens: 23,700 − 146.56 = 23,553.44 and 24,300 + 146.56 = 24,446.56. At 24,800 the call is worth 500, so loss = 500 − 146.56 = ₹353.44 per unit = ₹22,973.60 per lot.`,
      },
      {
        q: `An iron condor sells 23,800 PE (₹92.18), buys 23,600 PE (₹43.72), sells 24,200 CE (₹113.55) and buys 24,400 CE (₹57.54). What are the net credit, maximum profit, maximum loss and breakevens per lot of 65?`,
        a: `Net credit = 92.18 − 43.72 + 113.55 − 57.54 = ₹104.47 per unit. Max profit = 104.47 × 65 = ₹6,790.55. Each spread is 200 wide, so max loss = 200 − 104.47 = ₹95.53 per unit = ₹6,209.45 per lot. Breakevens: 23,800 − 104.47 = 23,695.53 and 24,200 + 104.47 = 24,304.47.`,
      },
      {
        q: `A naked 24,300 CE is sold at ₹81.99. What is the loss per lot if Nifty settles at 24,700, and how many times is it the premium collected?`,
        a: `Intrinsic = 400. Loss = 400 − 81.99 = ₹318.01 per unit = ₹20,670.65 per lot. Premium collected = 81.99 × 65 = ₹5,329.35. Ratio = 318.01 / 81.99 = about 3.9 times.`,
      },
    ],
    assignment:
      `On a live NIFTY chain for the nearest weekly expiry, build on paper one of each: a naked short call, a bear call spread 100 points wide, a short strangle and an iron condor. For each, write the credit, maximum loss (or "unlimited"), breakevens and the margin shown by your broker's calculator. Rank the four by margin per rupee of credit and write two sentences on what you notice.`,
  },
  topics: [
    {
      t: 1,
      def: `A naked CE writer sells a call option with no protection: no shares held and no bought option. The profit is limited to the premium and the loss is unlimited if the index rises.`,
      hi: `Naked CE writer bina kisi protection ke call option bechta hai: na shares, na koi bought option. Profit premium tak limited hota hai aur index badhne par loss unlimited ho sakta hai.`,
      how: `The naked call writer needs a high margin and usually believes Nifty will stay below the strike. The trade wins in flat and falling markets and loses in rallies; a gap-up can cause a large loss before any stop-loss can act. Writers often choose a strike far above spot to raise the win rate, which also lowers the premium. In a sudden rally, losses and margin both rise fast.`,
      eg: {
        title: 'Naked 24,300 CE (illustrative)',
        text: `Sell the 7-day 24,300 CE at ₹81.99; collect ₹5,329.35 per lot of 65. Breakeven is 24,381.99. If Nifty settles at 24,700, the loss is (400 − 81.99) = ₹318.01 per unit, which is ₹20,670.65 per lot, about 3.9 times the premium. At 25,000 it would be ₹618.01 per unit, ₹40,170.65 per lot.`,
      },
      tip: `A naked call has no ceiling on loss. Know the rupee loss if Nifty gaps up 3% against you and whether your account can absorb it.`,
      visual: {
        kind: 'payoff',
        title: 'Naked short 24,300 CE',
        caption: 'Capped profit, uncapped loss.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24300, premium: 81.99 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24300, premium: 81.99, expiryPrice: 24700, lotSize: 65, lots: 1 },
        why: 'Compute the naked call writer\'s loss at 24,700.',
      },
    },
    {
      t: 2,
      def: `A naked PE writer sells a put option with no protection. The profit is limited to the premium; the loss is large if the index falls, as far as zero.`,
      hi: `Naked PE writer bina protection ke put option bechta hai. Profit premium tak limited hota hai; index girne par loss bada hota hai, zero tak ja sakta hai.`,
      how: `Put writers are the most common naked writers, often because they believe the market tends to rise. They win in rising and flat markets. Falls come with rising IV and rising margin, so losses build quickly and the position can be squared off by the broker if margin runs short. A far-OTM put has a small premium but a large loss on a crash day.`,
      eg: {
        title: 'Naked 23,700 PE (illustrative)',
        text: `Sell the 7-day 23,700 PE at ₹64.57; collect ₹4,197.05 per lot of 65. Breakeven is 23,635.43. If Nifty settles at 23,300, the loss is (400 − 64.57) = ₹335.43 per unit, ₹21,802.95 per lot, about 5.2 times the premium.`,
      },
      tip: `The put writer's wins are small and frequent; the loss is rare and big. Never size a position by the average day.`,
      visual: {
        kind: 'payoff',
        title: 'Naked short 23,700 PE',
        caption: 'Loss grows as Nifty falls below the breakeven.',
        spot: 24000,
        legs: [{ type: 'PE', side: -1, strike: 23700, premium: 64.57 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 23700, premium: 64.57, expiryPrice: 23300, lotSize: 65, lots: 1 },
        why: 'Compute the naked put writer\'s loss at 23,300.',
      },
    },
    {
      t: 3,
      def: `A covered call writer owns the underlying asset (or an equivalent position) and sells a call against it. The premium is extra income; gains above the strike are given up.`,
      hi: `Covered call writer ke paas underlying asset (ya uske barabar position) hota hai aur woh uske against call bechta hai. Premium extra income hota hai; strike ke upar ke gains chhodne padte hain.`,
      how: `Because the holding covers the short call, the call risk is limited to opportunity cost: if the market rises, the holding gains but the call loses, so the net gain is capped. The downside of the holding remains, reduced only by the premium. On NSE, stock options are physically settled, which fits covered calls on stocks. For indices, a covered call is usually built with a holding of index-tracking assets or futures. SEBI allows mutual funds to write covered calls under specified conditions.`,
      eg: {
        title: 'Holding gains versus covered call (illustrative)',
        text: `A holder of a Nifty-linked position at 24,000 sells the 24,300 CE at ₹81.99. If Nifty ends at 24,600, the holding gains 600 points, but the call costs 300 − 81.99 = 218.01, so the net is 381.99 points, ₹24,829.35 per lot of 65, instead of ₹39,000 without the call. If Nifty ends at 23,800, the holding loses 200 points, partly offset by the 81.99 premium, for a net −118.01.`,
      },
      tip: `A covered call earns a little in flat markets and caps a lot in strong ones. It does not protect against a crash.`,
      visual: {
        kind: 'payoff',
        title: 'Covered call: long holding, short 24,300 CE',
        caption: 'Gain stops rising above the strike plus premium. The futures leg stands in for the holding.',
        spot: 24000,
        legs: [
          { type: 'FUT', side: 1, strike: 24000 },
          { type: 'CE', side: -1, strike: 24300, premium: 81.99 },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24300, premium: 81.99, expiryPrice: 24600, lotSize: 65, lots: 1 },
        why: 'The call leg\'s result at 24,600; add the holding\'s gain for the net.',
      },
    },
    {
      t: 4,
      def: `A cash-secured put writer sells a put and keeps enough cash aside to buy the underlying at the strike if assigned. The idea is to either keep the premium or buy at an effective discount.`,
      hi: `Cash-secured put writer put bechta hai aur itna cash alag rakhta hai ki assign hone par strike par underlying khareed sake. Idea yeh hai ki ya toh premium rakh le ya effectively discount par kharid le.`,
      how: `This idea fits stock options, which are physically settled: if the stock falls below the strike, the writer may have to buy the shares, and the effective cost is the strike minus the premium. NIFTY index options are cash-settled, so there is no purchase; the writer simply pays the loss in cash at expiry. For indices, the equivalent is holding enough cash to cover a loss and avoid margin stress. The risk is that the stock keeps falling after assignment.`,
      eg: {
        title: 'Cash set aside against a put (illustrative)',
        text: `Sell the 23,700 PE at ₹64.57. Cash set aside for one lot of 65 at the strike is 23,700 × 65 = ₹15,40,500. The premium is ₹4,197.05, which is 0.27% of that cash. The effective buy level, if assigned on a physically settled instrument, is 23,700 − 64.57 = 23,635.43. For NIFTY itself no shares change hands; only the cash difference is settled.`,
      },
      tip: `Being cash-secured makes you solvent, not safe. A falling underlying still hurts after you buy it.`,
      visual: {
        kind: 'payoff',
        title: 'Short 23,700 PE',
        caption: 'Same payoff as a naked put; the cash behind it is what makes it "secured".',
        spot: 24000,
        legs: [{ type: 'PE', side: -1, strike: 23700, premium: 64.57 }],
      },
      calc: {
        id: 'breakeven',
        preset: { optType: 'PE', side: 'sell', strike: 23700, premium: 64.57 },
        why: 'Find the effective level at which the put writer starts losing.',
      },
    },
    {
      t: 5,
      def: `A hedged option writer sells an option and buys another option or futures to limit the worst loss. The hedge lowers the credit but gives a known maximum loss.`,
      hi: `Hedged option writer ek option bechta hai aur doosra option ya futures khareedta hai taaki sabse bura loss limit ho. Hedge credit kam karta hai lekin maximum loss pehle se pata hota hai.`,
      how: `The most common hedge is a bought option at a further strike (a vertical spread). The margin required is lower than for the naked version because the maximum loss is known. A writer can also hedge a short put with futures, which removes direction risk but adds other costs and risks. Hedges decay too, so they cost money in calm markets, which is the price of protection on the wild day.`,
      eg: {
        title: 'Bull put spread (illustrative)',
        text: `Sell the 23,800 PE at ₹92.18 and buy the 23,600 PE at ₹43.72: credit ₹48.46 per unit, ₹3,149.90 per lot of 65. Width is 200, so maximum loss is 200 − 48.46 = ₹151.54 per unit, ₹9,850.10 per lot. Breakeven is 23,800 − 48.46 = 23,751.54. A naked 23,800 PE would pay ₹92.18, but its loss at 23,400 would be ₹307.82 per unit, twice the spread's maximum.`,
      },
      tip: `Hedged does not mean risk-free. It means the worst case is known and priced. Compare that worst case with your account size.`,
      visual: {
        kind: 'payoff',
        title: 'Short 23,800 PE with long 23,600 PE',
        caption: 'Loss is capped below 23,600.',
        spot: 24000,
        legs: [
          { type: 'PE', side: -1, strike: 23800, premium: 92.18 },
          { type: 'PE', side: 1, strike: 23600, premium: 43.72 },
        ],
      },
      calc: {
        id: 'risk-reward',
        preset: { winRate: 65, avgWin: 3149.9, avgLoss: 9850.1 },
        why: 'Check whether a 65% win rate (illustrative) breaks even on this payoff.',
      },
    },
    {
      t: 6,
      def: `Spread sellers sell one option and buy another of the same type at a different strike, such as a bear call spread or a bull put spread, to collect a net credit with a capped loss.`,
      hi: `Spread sellers ek option bechte hain aur same type ka doosra option alag strike par khareedte hain, jaise bear call spread ya bull put spread, taaki net credit milega aur loss cap rahega.`,
      how: `A credit spread has a defined maximum profit (the credit) and a defined maximum loss (the width minus the credit). A bear call spread profits if the market stays below the lower call strike; a bull put spread profits if it stays above the higher put strike. A narrower width gives lower credit and lower risk; a wider one gives more of both. Transaction costs, taxes and bid-ask spreads on both legs reduce the real return.`,
      eg: {
        title: 'Bear call spread, 100 points wide (illustrative)',
        text: `Sell the 24,200 CE at ₹113.55 and buy the 24,300 CE at ₹81.99: credit ₹31.56 per unit, ₹2,051.40 per lot of 65. Maximum loss is 100 − 31.56 = ₹68.44 per unit, ₹4,448.60 per lot, so the risk is about 2.2 times the reward. Breakeven is 24,231.56. The writer needs to be right about the market staying below 24,231.56, roughly 1% above spot.`,
      },
      tip: `Check the ratio of maximum loss to maximum profit. A spread that risks 2.2 times what it can earn needs a high win rate to break even.`,
      visual: {
        kind: 'payoff',
        title: 'Bear call spread',
        caption: 'Short 24,200 CE, long 24,300 CE.',
        spot: 24000,
        legs: [
          { type: 'CE', side: -1, strike: 24200, premium: 113.55 },
          { type: 'CE', side: 1, strike: 24300, premium: 81.99 },
        ],
      },
      calc: {
        id: 'risk-reward',
        preset: { winRate: 70, avgWin: 2051.4, avgLoss: 4448.6 },
        why: 'Test the expectancy of this spread at an illustrative 70% win rate.',
      },
    },
    {
      t: 7,
      def: `A straddle seller sells a call and a put at the same strike, usually at the money. The premium is large and the profit is greatest if the index stays at that strike; losses grow in either direction.`,
      hi: `Straddle seller same strike par, aam taur par at the money, call aur put dono bechta hai. Premium bada hota hai aur profit tab sabse zyada hota hai jab index usi strike par rahe; kisi bhi direction mein loss badhta hai.`,
      how: `Selling a straddle is a bet that the market will move less than the premium collected. Breakevens sit at the strike plus and minus the combined premium. The position has large negative gamma and vega: a fast move or a rise in IV hurts both legs together. It needs high margin and active management, and it is often adjusted or hedged.`,
      eg: {
        title: 'Short 24,000 straddle (illustrative)',
        text: `Sell the 24,000 CE (₹200.85) and 24,000 PE (₹170.95): credit ₹371.80, close to the ₹371.79 straddle value, which is ₹24,166.35 per lot of 65. Breakevens: 23,628.21 and 24,371.79. If Nifty settles at 24,800 the loss is (800 − 371.79) = ₹428.21 per unit, ₹27,833.65 per lot.`,
      },
      tip: `A straddle seller needs the market to move less than the credit. Compare the credit with the expected move before selling.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,000 straddle',
        caption: 'Maximum profit at 24,000; losses on both sides beyond the breakevens.',
        spot: 24000,
        legs: [
          { type: 'CE', side: -1, strike: 24000, premium: 200.85 },
          { type: 'PE', side: -1, strike: 24000, premium: 170.95 },
        ],
      },
      calc: {
        id: 'straddle-move',
        preset: { spot: 24000, cePrice: 200.85, pePrice: 170.95, strike: 24000 },
        why: 'See the implied move and breakevens of the straddle.',
      },
    },
    {
      t: 8,
      def: `A strangle seller sells an OTM call and an OTM put, at different strikes. The premium is smaller than a straddle's but the range for profit is wider.`,
      hi: `Strangle seller ek OTM call aur ek OTM put alag strikes par bechta hai. Premium straddle se kam hota hai lekin profit ki range zyada chaudi hoti hai.`,
      how: `The strangle sells both tails. The market can move a fair distance in either direction and the seller still profits, but beyond the breakevens, losses are open-ended on the call side and large on the put side. It is popular because it has a high probability of profit; the cost is exposure to a single large move. Strikes are usually chosen at similar distances or by delta.`,
      eg: {
        title: 'Short strangle 23,700 PE and 24,300 CE (illustrative)',
        text: `Credit is 64.57 + 81.99 = ₹146.56 per unit, ₹9,526.40 per lot of 65. Breakevens: 23,553.44 and 24,446.56. A settlement at 24,800 loses (500 − 146.56) = ₹353.44 per unit, ₹22,973.60 per lot, about 2.4 times the credit. The 893-point-wide profit range is roughly 3.7% of spot.`,
      },
      tip: `A wide strangle has a high win rate and a bad worst day. Define a rupee stop for the worst day before entering.`,
      visual: {
        kind: 'payoff',
        title: 'Short 23,700 PE and 24,300 CE',
        caption: 'Profit between the breakevens, loss beyond.',
        spot: 24000,
        legs: [
          { type: 'PE', side: -1, strike: 23700, premium: 64.57 },
          { type: 'CE', side: -1, strike: 24300, premium: 81.99 },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24300, premium: 81.99, expiryPrice: 24800, lotSize: 65, lots: 1 },
        why: 'Call-side loss at 24,800 (put side expires worthless; subtract the put premium for the net).',
      },
    },
    {
      t: 9,
      def: `An iron condor trader sells an OTM put spread and an OTM call spread together. The credit is smaller than for a strangle, but the loss is capped on both sides.`,
      hi: `Iron condor trader ek OTM put spread aur ek OTM call spread saath mein bechta hai. Credit strangle se kam hota hai lekin dono taraf loss cap rehta hai.`,
      how: `An iron condor is a short strangle with protective wings bought. It profits if the index stays between the short strikes at expiry, with the full credit kept. Because only one side can be breached at a time, the maximum loss is one spread's width minus the total credit. Margin is lower than for a strangle. Four legs mean four sets of costs and four bid-ask spreads, so execution matters.`,
      eg: {
        title: 'Iron condor 23,600 / 23,800 / 24,200 / 24,400 (illustrative)',
        text: `Credit = 92.18 − 43.72 + 113.55 − 57.54 = ₹104.47 per unit, ₹6,790.55 per lot of 65. Maximum loss = 200 − 104.47 = ₹95.53 per unit, ₹6,209.45 per lot. Breakevens: 23,695.53 and 24,304.47. The reward and risk are close to even, so the trade needs a win rate somewhat above 48% before costs just to break even.`,
      },
      tip: `Condors replace unlimited tail risk with a known loss. Check the maximum loss against your risk limit, not just the credit.`,
      visual: {
        kind: 'payoff',
        title: 'Iron condor',
        caption: 'Capped on both sides.',
        spot: 24000,
        legs: [
          { type: 'PE', side: 1, strike: 23600, premium: 43.72 },
          { type: 'PE', side: -1, strike: 23800, premium: 92.18 },
          { type: 'CE', side: -1, strike: 24200, premium: 113.55 },
          { type: 'CE', side: 1, strike: 24400, premium: 57.54 },
        ],
      },
      calc: {
        id: 'risk-reward',
        preset: { winRate: 60, avgWin: 6790.55, avgLoss: 6209.45 },
        why: 'Check expectancy of the condor at an illustrative 60% win rate.',
      },
    },
    {
      t: 10,
      def: `Institutional market makers are large firms that quote prices in many options at once and hold the resulting positions as inventory, hedging the net risk. They earn spread rather than betting on direction.`,
      hi: `Institutional market makers bade firms hote hain jo ek saath kai options mein prices quote karte hain aur us se bani positions ko inventory ki tarah rakhte hain, net risk hedge karte hain. Woh direction par bet nahi lagate, spread kamate hain.`,
      how: `A market maker's book mixes many strikes and expiries, so they track net delta, gamma, vega and theta rather than single trades. They hedge delta with futures, vega with other options, and adjust quotes when inventory builds up. Their activity helps keep spreads tight in normal markets; in stress they widen or reduce quotes. Their OI is not a view, and large OI at a strike may belong to them as inventory.`,
      eg: {
        title: 'Vega exposure of a short call book (illustrative)',
        text: `A market maker is short 100 lots (6,500 units) of the 24,000 CE. ATM vega is about ₹13.22 per IV point per unit, so the book loses about 6,500 × 13.22 = ₹85,930 for each point IV rises, and about ₹1,71,860 if IV rises 2 points, before any hedge. That is why the maker buys other options, or widens quotes, when IV starts rising.`,
      },
      tip: `When you buy an option, remember the person selling it to you is usually managing a whole book, not making a bet. Their price is about hedging cost.`,
      visual: {
        kind: 'flow',
        title: 'A market maker\'s risk loop',
        caption: 'Inventory builds, risk is measured, hedges are placed.',
        steps: [
          { label: 'Quote many strikes', note: 'Two-way prices', tone: 'ice' },
          { label: 'Inventory builds', note: 'Net delta, gamma, vega', tone: 'gold' },
          { label: 'Hedge', note: 'Futures for delta, options for vega', tone: 'ice' },
          { label: 'Adjust quotes', note: 'Skew prices toward balance', tone: 'gold' },
        ],
      },
      calc: {
        id: 'portfolio-delta',
        preset: { d1: -0.53, q1: 100, d2: 1, q2: 53, d3: 0, q3: 0 },
        why: 'Net delta in lots of a short 100-lot call position hedged with 53 lots of futures.',
      },
    },
  ],
}

export default m
