import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '5.3',
  intro:
    `Strike selection is the choice of which strike to buy or write once you already have a view on direction, size and timing. The same view can be expressed with an ITM, ATM or OTM option, and each choice trades off cost, delta, time decay, volatility exposure and liquidity differently. Examples use NIFTY at 24,000, 7 days to expiry, India VIX/IV 14%, rate 6.5%, lot 65 (check the current NSE contract specification) and Black-Scholes model values, which are illustrative and differ from live premiums.`,
  introHi:
    `Strike selection ka matlab hai ki view bana lene ke baad kaunsa strike buy ya write karna hai. Ek hi view ko ITM, ATM ya OTM option se express kiya ja sakta hai, aur har choice cost, delta, time decay, volatility exposure aur liquidity mein alag trade-off deti hai. Examples NIFTY 24,000, expiry mein 7 din, IV 14%, rate 6.5%, lot 65 (current NSE contract specification check karein) aur Black-Scholes model values par hain, jo illustrative hain aur live premium se alag hote hain.`,
  steps: {
    concept:
      `There is no single best strike. A buyer picks the strike that balances three things: how much directional sensitivity (delta) is needed, how much premium (and therefore capital at risk) is acceptable, and how much time decay can be tolerated. A writer picks the strike that balances premium collected against the chance and size of a loss. Good selection starts from the trade plan (direction, target, time window, maximum loss) and works backwards to the strike, not from the cheapest premium.`,
    conceptHi:
      `Koi ek "best" strike nahi hota. Buyer teen cheezein balance karta hai: kitni directional sensitivity (delta) chahiye, kitna premium (aur capital at risk) chalega, aur kitna time decay sahan ho sakta hai. Writer premium aur loss ke chance aur size ko balance karta hai. Sahi selection trade plan se shuru hota hai (direction, target, time window, maximum loss), sabse sasta premium dekh kar nahi.`,
    mechanism:
      `Moneyness drives every trade-off. Delta falls from about 0.9 deep ITM to 0.5 ATM to under 0.2 far OTM, so higher-delta strikes follow the index more closely. Theta (time decay) in rupees is largest at the money but, as a share of the premium, largest on OTM options. Vega is largest near ATM, so a volatility change moves ATM premiums the most in rupees. Liquidity (tight bid-ask spread, deep order book) is usually best near ATM on NSE, which lowers the cost of getting in and out. Index options are cash-settled and European, so there is no exercise decision before expiry; the strike only sets the payoff and the price.`,
    example: {
      title: 'Bullish view on NIFTY, three strike choices (model, 7 days)',
      text: `The trader expects NIFTY to rise 100 points within a few days. Buying the 23,800 CE costs ₹321.83 (lot ₹20,919), delta 0.69; ATM 24,000 CE costs ₹200.85 (lot ₹13,055), delta 0.53; OTM 24,200 CE costs ₹113.55 (lot ₹7,381), delta 0.36. If NIFTY rises 100 points with time and IV unchanged, the values become about ₹394.79, ₹258.03 and ₹153.82, i.e. gains of ₹72.96, ₹57.18 and ₹40.27 per unit (22.7%, 28.5%, 35.5%). In rupees per lot: ₹4,742, ₹3,717 and ₹2,618. If the view is wrong and NIFTY ends flat at expiry, the ITM loses its time value of 121.83, the ATM loses all 200.85 and the OTM loses all 113.55.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Strike choice trade-offs for a buyer',
      caption: 'Closer to the money: higher delta and capital, lower percentage swings. Further OTM: cheaper, but needs a larger and quicker move.',
      xLabels: ['Lower premium', 'Higher premium'],
      yLabels: ['Lower delta', 'Higher delta'],
      cells: [
        { head: 'Far OTM', note: 'cheap, low chance, can expire worthless', tone: 'ice' },
        { head: 'ITM', note: 'costly, delta tracks the index', tone: 'gold' },
        { head: 'Near OTM', note: 'moderate cost, moderate delta', tone: 'neutral' },
        { head: 'ATM', note: 'balanced, but highest time value', tone: 'gold' },
      ],
    },
    optionChain:
      `Use the chain to compare strikes side by side: LTP, bid and ask, volume, OI and, if your broker shows them, delta, theta and IV. Check the bid-ask spread in rupees and as a percentage of the premium before choosing; a far OTM option with a spread of ₹2 on a ₹10 premium costs 20% to cross. Note the IV at each strike: it is usually not flat, and buying a strike with unusually high IV means paying more for the same move. High OI at a strike tells you contracts are open there, not who is buying or selling.`,
    psychology:
      `Beginners often choose by price ("₹10 is all I can afford") rather than by plan, which pushes them to the least probable strikes. Some buy ITM only to feel safe and then ignore the large capital at risk. Writers are drawn to far OTM strikes because they win most days, forgetting the rare large loss. Selection should be written before the trade and not changed because the screen has moved.`,
    scenarios: {
      bullish:
        `Call buyers weigh delta against cost: ITM tracks the rally closely, ATM is balanced, OTM pays best in percent only if the move is big and quick. Put writers pick strikes below spot, collecting premium if the index stays above them.`,
      bearish:
        `Put buyers choose among ITM, ATM and OTM puts the same way. Call writers choose strikes above spot, such as 24,500, and keep the premium only if NIFTY stays below it; a sharp rally can produce losses many times the premium.`,
      sideways:
        `Buyers of any strike lose time value as days pass; the OTM buyer loses a larger share of premium per day. Writers of ATM or near-OTM strikes collect the largest premium and benefit most from a quiet market, but breakouts hurt them most.`,
    },
    practice: [
      {
        q: `Compare the break-even and maximum loss per lot for buying the 24,000 CE at ₹200.85 and the 24,200 CE at ₹113.55 (lot 65, held to expiry).`,
        a: `24,000 CE: break-even 24,000 + 200.85 = 24,200.85 (0.84% above spot); maximum loss 200.85 x 65 = ₹13,055. 24,200 CE: break-even 24,200 + 113.55 = 24,313.55 (1.31% above spot); maximum loss 113.55 x 65 = ₹7,381. The OTM risks less money but needs a larger move to profit.`,
      },
      {
        q: `NIFTY rises 100 points. The 24,200 CE goes from ₹113.55 to about ₹153.82. Give the gain per unit, per lot and in percent, and compare with the ATM call's ₹57.18 per unit.`,
        a: `Gain 153.82 - 113.55 = ₹40.27 per unit, 40.27 x 65 = ₹2,618 per lot (rounded), i.e. 35.5%. The ATM call gains 57.18 x 65 = ₹3,717 per lot, or 28.5%. The OTM gave a higher percentage but a smaller rupee gain.`,
      },
      {
        q: `A trader wants about 20 index units of positive delta from one lot of 65. Which call strike fits (model deltas: 24,250 CE 0.323, 24,300 CE 0.285)?`,
        a: `Required delta per unit = 20 / 65 = 0.31. The 24,250 CE gives 0.323 x 65 = 21.0 units and the 24,300 CE gives 0.285 x 65 = 18.5 units. The 24,250 or 24,300 strike is the closest; the 24,250 CE is nearer in delta, but also costs more (₹96.83 versus ₹81.99 per unit).`,
      },
      {
        q: `A writer sells the 24,500 CE at ₹39.20. NIFTY closes at 24,800 at expiry. What is the loss per lot, and what was the maximum profit?`,
        a: `At expiry the call is worth 24,800 - 24,500 = 300. Loss per unit = 300 - 39.20 = ₹260.80; per lot 260.80 x 65 = ₹16,952. Maximum profit is the premium, 39.20 x 65 = ₹2,548, so one bad day wiped out about 6.7 such trades' profits (16,952 / 2,548 = 6.65).`,
      },
    ],
    assignment:
      `Write a one-page trade plan template with fields: view, target index level, time window, maximum loss in rupees, preferred delta, and acceptable bid-ask spread. Fill it for a hypothetical bullish and a bearish trade, then pick a strike from the Greeks calculator (7 days, IV 14%) that fits each plan. Explain in two sentences why you rejected the other two strikes.`,
  },
  topics: [
    {
      t: 1,
      def: `Buyers choose ATM strikes because they combine a delta near 0.5 with a moderate premium and the best liquidity. The option responds meaningfully to index moves without the large capital needed for ITM options. The price paid is high time value, which decays.`,
      hi: `Buyers ATM strike isliye chunte hain kyunki ismein delta lagbhag 0.5 hota hai, premium moderate hota hai aur liquidity sabse achhi hoti hai. Index ke move par option achha respond karta hai aur ITM jaisa bada capital nahi lagta. Iski keemat yeh hai ki time value zyada hoti hai, jo decay hoti hai.`,
      how: `At the money the outcome at expiry is most uncertain, so the market charges the most time value there. That also means ATM options have the highest gamma and vega, so they react quickly to a move and to volatility changes. On NSE, ATM and near-ATM strikes usually have the tightest spreads, which keeps entry and exit costs low. The drawback is theta: in rupees an ATM option decays faster than any other strike, and the decay speeds up in the last days before expiry.`,
      eg: {
        title: 'Buying the 24,000 CE',
        text: `Model premium ₹200.85, delta 0.5295, theta about -₹15.45 per day, lot cost 200.85 x 65 = ₹13,055. Break-even at expiry is 24,200.85. If NIFTY rises 100 points to 24,100 quickly, the model value is about ₹258.03, a gain of about ₹57.18 per unit (₹3,717 per lot). If NIFTY stays flat for a day, theta alone takes about ₹15.45 (7.7% of the premium) away.`,
      },
      tip: `ATM gives the cleanest balance, not a free lunch: you are paying the highest time value on the chain, so the move must arrive soon.`,
      visual: {
        kind: 'curve',
        title: 'Delta by strike (call)',
        caption: 'Delta is near 0.5 at the money, which is why ATM options track a move without needing deep capital.',
        curve: 'delta',
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Shows the ATM call premium, delta and daily theta together.' },
    },
    {
      t: 2,
      def: `Buyers choose OTM strikes for a lower capital outlay and the chance of a large percentage return if the index moves sharply. The trade-off is a lower delta, a lower probability of finishing ITM and a bigger share of the premium lost to time decay.`,
      hi: `Buyers OTM strike kam capital lagne aur bade percentage return ke chance ki wajah se lete hain, agar index tezi se move kare. Iska trade-off hai kam delta, ITM par khatam hone ka kam chance, aur premium ka bada hissa time decay mein jaana.`,
      how: `An OTM option needs the index to cover the distance to the strike plus the premium just to break even. The required move is larger, so the success probability is lower, but because the premium is small the percentage payoff can be large. OTM options are also more exposed to changes in implied volatility as a share of their price, and a quiet market can erode them quickly. Many OTM buyers use them for event days (Budget, RBI policy, election results) where a large move is possible, but the market usually prices that risk into IV beforehand.`,
      eg: {
        title: 'Buying the 24,200 CE',
        text: `Model premium ₹113.55, delta 0.36, theta -₹13.98 per day (12.3% of the premium), lot cost ₹7,381. Break-even at 24,313.55, which is 313.55 points (1.31%) above spot. A 100-point rally with other inputs constant lifts the value to about ₹153.82 (+35.5%). A flat market to expiry loses the full ₹113.55 per unit, ₹7,381 per lot.`,
      },
      tip: `Ask "how far must the index travel, and by when?" before you ask "how cheap is it?". Cheap options are cheap because the market sees a small chance of the move.`,
      visual: {
        kind: 'payoff',
        title: 'Long 24,200 CE versus long 24,000 CE',
        caption: 'The OTM call risks less but breaks even higher. Illustrative premiums, per unit, at expiry.',
        spot: 24000,
        legs: [
          { type: 'CE', side: 1, strike: 24000, premium: 200.85 },
          { type: 'CE', side: 1, strike: 24200, premium: 113.55 },
        ],
      },
      calc: { id: 'breakeven', preset: { optType: 'CE', side: 'buy', strike: 24200, premium: 113.55 }, why: 'Shows how far the index must travel for the OTM buyer to break even.' },
    },
    {
      t: 3,
      def: `Buyers choose ITM strikes when they want high delta, slower decay as a share of premium, and behaviour close to holding the index itself, and are willing to pay more capital. The premium is mostly intrinsic value, so less of it is exposed to time decay.`,
      hi: `Buyers ITM strike tab chunte hain jab unhe high delta, premium ke hisaab se slow decay, aur index hold karne jaisa behaviour chahiye, aur wo zyada capital lagane ko taiyaar hain. Premium mostly intrinsic value hota hai, isliye time decay ka exposure kam hota hai.`,
      how: `An ITM option moves almost one-for-one with the index, so a trader who wants directional exposure with fewer contracts or a more forgiving break-even may use it. Because most of the premium is intrinsic, a flat market costs only the time value. The cost is capital: one lot ties up much more money, and a sharp reversal can still produce a large rupee loss. ITM strikes can also have wider bid-ask spreads and lower volume than ATM strikes.`,
      eg: {
        title: 'Buying the 23,800 CE',
        text: `Model premium ₹321.83 = intrinsic 200 + time value 121.83, delta 0.693, theta about -₹14.57 per day (4.5% of the premium), lot cost 321.83 x 65 = ₹20,919. Break-even at expiry is 24,121.83. A 100-point rally lifts it to about ₹394.79, gaining ₹72.96 per unit (₹4,742 per lot, 22.7%). If NIFTY fell 100 points the loss would be of similar size in rupees.`,
      },
      tip: `ITM is not safer, it is just structured differently: less decay share, more capital. Size the position by the rupees you can lose, not by the lot count.`,
      visual: {
        kind: 'bars',
        title: 'Daily theta as a share of premium',
        caption: 'Illustrative model values, 7 days, IV 14%. Theta per day divided by premium.',
        unit: '%',
        items: [
          { label: '23,800 CE (ITM)', value: 4.5, tone: 'gold' },
          { label: '24,000 CE (ATM)', value: 7.7, tone: 'gold' },
          { label: '24,200 CE (OTM)', value: 12.3, tone: 'gold' },
        ],
      },
      calc: { id: 'lot-value', preset: { premium: 321.83, lotSize: 65, lots: 1, spot: 24000 }, why: 'Shows how much capital the ITM option ties up per lot.' },
    },
    {
      t: 4,
      def: `Writers (sellers) choose strikes by balancing the premium they collect against the probability and size of a loss. Far OTM strikes give small premiums and lower probability of loss; ATM strikes give the largest premiums with the highest chance of the market reaching them. Writers face large or unlimited risk, so strike choice is also about margin and stop-loss discipline.`,
      hi: `Writers (sellers) strike aise chunte hain ki premium aur loss ke chance aur size ke beech balance bane. Far OTM strike chhota premium aur loss ka kam chance dete hain; ATM strike sabse bada premium dete hain lekin market ke wahan pahunchne ka chance sabse zyada. Writers ka risk bada ya unlimited hota hai, isliye strike choice margin aur stop-loss discipline se bhi judi hoti hai.`,
      how: `A writer is paid time value up front and wins if the option expires worthless or decays enough to be bought back cheaper. The writer needs margin: SPAN plus exposure margin, which the clearing corporation (NSCCL) sets and brokers apply; it rises when volatility rises or the position gets closer to the money, so check your broker's margin calculator. Writers often choose strikes outside the expected move implied by VIX, but option writers do not always win: a sudden gap can turn a "safe" far OTM strike into a large loss, as on election-result or global-shock days.`,
      eg: {
        title: 'Writing the 24,500 CE (illustrative)',
        text: `The writer collects about ₹39.20 per unit, 39.20 x 65 = ₹2,548 per lot, and keeps all of it if NIFTY closes at or below 24,500. If NIFTY closes at 24,800, the call is worth 300 and the loss is (300 - 39.20) x 65 = ₹16,952. The maximum profit is ₹2,548, but the loss can keep growing as NIFTY rises, which is why many writers hedge with a bought far-OTM option or use defined-risk spreads.`,
      },
      tip: `A writer's profit is capped at the premium and the loss is not. Win rate alone is a misleading measure; what matters is the size of the bad days.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,500 CE at expiry',
        caption: 'Profit is capped at the premium; the loss grows as NIFTY rises above 24,539.20. Illustrative.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24500, premium: 39.2 }],
      },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'sell', strike: 24500, premium: 39.2, expiryPrice: 24800, lotSize: 65, lots: 1 }, why: 'Computes the writer\'s profit or loss at any expiry level.' },
    },
    {
      t: 5,
      def: `Selecting a strike by delta means choosing the option whose delta matches the exposure you want, for example about 0.30 for moderate directional sensitivity. Delta is also a rough, model-based guide to how far OTM a strike is, and it tells you how many index units one lot behaves like.`,
      hi: `Delta se strike chunne ka matlab hai wo option lena jiska delta aapki chahi hui exposure se match kare, jaise moderate directional sensitivity ke liye lagbhag 0.30. Delta se yeh bhi lagbhag pata chalta hai ki strike kitna OTM hai, aur ek lot kitni index units jaisa behave karta hai.`,
      how: `Position delta = option delta x lot size x number of lots. A lot of 65 units with delta 0.30 behaves like about 19.5 index units. Delta moves with spot, time and volatility, so a delta chosen today will drift: a 0.30-delta strike with 7 days left may be 0.10 with one day left if the index does not move. Delta is often read as a rough probability of finishing ITM, but it is a sensitivity first; treat the probability reading as approximate and model-dependent.`,
      eg: {
        title: 'Finding a 0.30-delta call',
        text: `Model deltas at NIFTY 24,000, 7 days, IV 14%: 24,200 CE 0.362, 24,250 CE 0.323, 24,300 CE 0.285, 24,500 CE 0.161. A trader wanting about 0.30 delta picks 24,250 or 24,300. One lot of the 24,250 CE (premium ₹96.83) has position delta 0.323 x 65 = 21.0 index units, so a 50-point rise adds about 0.323 x 50 = ₹16.15 per unit, ₹1,050 per lot, before gamma.`,
      },
      tip: `Delta changes with time and spot. Re-check it when the day count falls or the index moves; a delta picked on Monday may not hold on Thursday.`,
      visual: {
        kind: 'bars',
        title: 'Call delta by strike (7 days)',
        caption: 'Illustrative model values, NIFTY 24,000, IV 14%.',
        items: [
          { label: '23,800 CE', value: 0.693, tone: 'gold' },
          { label: '24,000 CE', value: 0.53, tone: 'gold' },
          { label: '24,200 CE', value: 0.362, tone: 'gold' },
          { label: '24,300 CE', value: 0.285, tone: 'gold' },
          { label: '24,500 CE', value: 0.161, tone: 'gold' },
        ],
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24250, days: 7, iv: 14, rate: 6.5 }, why: 'Reads the delta of any strike you are considering.' },
    },
    {
      t: 6,
      def: `Strike selection based on volatility means checking implied volatility (IV) before you pay or collect premium. When IV is high, options are expensive and buyers pay more for the same move; when IV is low, options are cheaper but may be pricing in a quiet market. IV differs by strike and expiry, so compare it across the chain.`,
      hi: `Volatility ke hisaab se strike selection ka matlab hai premium dene ya lene se pehle implied volatility (IV) dekhna. IV high ho toh options mehnge hote hain aur buyer ko same move ke liye zyada dena padta hai; IV low ho toh options sasta hota hai lekin shayad shaant market price in kar raha hota hai. IV strike aur expiry ke hisaab se alag hoti hai, isliye chain mein compare karein.`,
      how: `India VIX is NSE's measure of the volatility implied by NIFTY options over the next 30 days; it shows expected volatility, not direction. A buyer wants the realised move to exceed what IV already assumes; a writer wants the opposite. Vega, the premium's sensitivity to IV, is largest near ATM, so a drop in IV after an event ("IV crush") hurts ATM buyers most in rupees. OTM options react more in percentage: the same rise in IV can multiply a cheap option's price.`,
      eg: {
        title: 'Same strike, two volatility levels (model)',
        text: `NIFTY 24,000, 7 days. At IV 14% the 24,000 CE is about ₹200.85; at IV 20% it is about ₹280.23, an increase of ₹79.38 (39.5%). The 24,200 CE moves from ₹113.55 to about ₹189.77. A buyer who pays ₹280.23 needs a much larger move to profit than one who pays ₹200.85. If IV falls from 14% to 11% while NIFTY rises 100 points, the 24,000 CE is worth about ₹220.11 instead of ₹258.03, so the volatility fall takes away about ₹37.92 per unit.`,
      },
      tip: `Buy options when IV is low relative to its own history, not just when it looks cheap in rupees; avoid paying for a big event move that is already in the price.`,
      visual: {
        kind: 'gauge',
        title: 'India VIX as a context gauge',
        caption: 'Illustrative zones only. VIX shows expected volatility, not direction; compare it with its own recent history.',
        min: 8,
        max: 35,
        value: 14,
        zones: [
          { from: 8, to: 13, label: 'Low', tone: 'ice' },
          { from: 13, to: 20, label: 'Moderate', tone: 'gold' },
          { from: 20, to: 35, label: 'High', tone: 'neutral' },
        ],
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 20, rate: 6.5 }, why: 'Change the IV to see how the premium and vega react.' },
    },
    {
      t: 7,
      def: `Selecting by liquidity means choosing strikes where many participants trade, so the bid-ask spread is tight and you can enter and exit at fair prices. A liquid strike costs less to trade and gives a more reliable price. Illiquid strikes look cheap but can be expensive to leave.`,
      hi: `Liquidity ke hisaab se selection ka matlab hai wo strike chunna jahan bahut participants trade karte hain, taaki bid-ask spread tight ho aur aap fair price par entry-exit kar sakein. Liquid strike trade karna sasta padta hai aur price zyada reliable hota hai. Illiquid strike sasta dikhta hai lekin nikalna mehnga ho sakta hai.`,
      how: `Spread cost is paid twice: once on entry and once on exit. NSE option liquidity is concentrated near ATM and in the weekly expiry strikes; far OTM and deep ITM strikes can have thin books where a market order walks through several price levels, causing slippage. Check bid, ask, quantity at the best prices, and recent volume. Use limit orders, and avoid placing large quantities in a thin strike all at once. Exchange freeze limits cap the quantity per order, and the current limits are published by NSE.`,
      eg: {
        title: 'Spread cost: ATM versus far OTM (illustrative quotes)',
        text: `Suppose the 24,000 CE is quoted 200.80 / 201.00 (spread ₹0.20) and a far OTM 24,500 CE is quoted 38.60 / 40.00 (spread ₹1.40). Crossing the spread once on one lot costs 0.20 x 65 = ₹13 for the ATM and 1.40 x 65 = ₹91 for the OTM. As a share of premium that is 0.1% against 3.6%. Entering and exiting at the worst prices doubles those costs, so the cheap-looking far OTM option is far more expensive to trade.`,
      },
      tip: `Always compare the spread with the premium, not just in rupees. A ₹1.40 spread on a ₹39 option is a big cost; the same on a ₹400 option is small.`,
      visual: {
        kind: 'orderBook',
        title: 'A thin far-OTM book (illustrative)',
        caption: 'Few lots on each side and a wide gap between bid and ask mean higher slippage on exit.',
        bids: [
          [38.6, 130],
          [38.2, 65],
          [37.5, 65],
        ],
        asks: [
          [40.0, 65],
          [40.6, 130],
          [41.5, 65],
        ],
      },
      calc: { id: 'spread-cost', preset: { bid: 38.6, ask: 40, qty: 1, lotSize: 65 }, why: 'Turns the bid-ask gap into rupees per lot.' },
    },
    {
      t: 8,
      def: `Strike selection near expiry changes because time value collapses and gamma rises sharply at the money. In the last day or two, OTM options can lose most of their value, ATM options swing wildly and ITM options behave almost like the index. Price, delta and decay all change faster than earlier in the week.`,
      hi: `Expiry ke paas strike selection badal jata hai kyunki time value tezi se khatam hoti hai aur ATM par gamma bahut badh jata hai. Aakhri ek-do din mein OTM options ki value zyadatar ud sakti hai, ATM options bahut jhoolte hain aur ITM options lagbhag index jaise chalte hain. Price, delta aur decay sab pehle se tez badalte hain.`,
      how: `With one day left, model theta of the ATM call is about -₹37 per unit, which is roughly half its premium. Gamma is large, so delta can swing from 0.2 to 0.8 within a small move, creating big percentage gains and losses on both sides. Writers collect rapidly decaying premium but face gap risk and high margin on expiry day; buyers need a move that is both large and quick. NIFTY weekly expiry is currently on Tuesday as per NSE schedule (holiday moves it to the previous trading day), so verify the expiry date before trading.`,
      eg: {
        title: 'Expiry eve: 1 day left (model)',
        text: `NIFTY 24,000, IV 14%. The 24,000 CE is worth about ₹72.31 with theta about -₹37.24 per day. If NIFTY rises 100 points the value goes to about ₹134.40 (+₹62.09, 85.9%); if it falls 100 points, to about ₹32.31 (-₹40.00, -55.3%). The 24,200 CE, worth ₹11.92, would rise to about ₹32.83 on the rally (+175%), but is worth about ₹0.14 at 24,000 on the final day if the rally fails to come. Percentages are large because the base is tiny.`,
      },
      tip: `Near expiry, the question changes from "which strike?" to "can I afford the swings?". Smaller size, tighter plan and limit orders usually matter more than the exact strike.`,
      visual: {
        kind: 'bars',
        title: 'ATM call premium by days to expiry',
        caption: 'Illustrative model values, NIFTY 24,000, IV 14%. Time value shrinks faster as expiry nears.',
        unit: '₹',
        items: [
          { label: '7 days', value: 200.85, tone: 'ice' },
          { label: '5 days', value: 167.73, tone: 'ice' },
          { label: '3 days', value: 128.01, tone: 'ice' },
          { label: '1 day', value: 72.31, tone: 'gold' },
        ],
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 1, iv: 14, rate: 6.5 }, why: 'Shows the one-day premium, high gamma and fast theta.' },
    },
  ],
  tools: [{ id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Compare delta, theta and vega across strikes.' }],
}
export default m
