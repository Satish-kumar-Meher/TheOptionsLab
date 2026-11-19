import type { ModuleLesson } from '../topicLessonTypes'

/* Module 22.4 - Option Seller Risk. Illustrative numbers: NIFTY about 24,000, lot 65 (check current NSE contract specification), IV 14%, r 6.5%, no dividend. Option values from Black-Scholes. */
const m: ModuleLesson = {
  moduleId: '22.4',
  intro: 'An option seller (writer) collects a premium today in return for taking on an obligation that can become very large later. Most days the premium is kept, which makes selling feel safe. This module shows the specific ways it can hurt: unlimited or very large loss, gaps, gamma, volatility spikes, margin calls, illiquidity, expiry settlement and how hedging changes the picture.',
  introHi: 'Option seller premium pehle le leta hai, lekin badle mein ek aisi zimmedari uthata hai jo baad mein bahut badi ho sakti hai. Zyadatar din premium bach jata hai, isliye selling safe lagti hai. Yeh module batata hai ki nuksaan kahan se aa sakta hai: unlimited ya bahut bada loss, gap, gamma, volatility spike, margin call, illiquidity, expiry settlement, aur hedging se tasveer kaise badalti hai.',
  steps: {
    concept: 'Selling an option gives you a small, capped reward (the premium) and a large, sometimes unlimited, risk. A seller wins when the market stays quiet or moves slowly and loses when it moves fast, gaps or when volatility jumps. A high win rate does not make selling safe, because a few large losses can erase many small gains.',
    conceptHi: 'Option bechne par aapko chhota, tay reward milta hai (premium) aur risk bada, kabhi kabhi unlimited hota hai. Market shaant ya dheere chale toh seller jeetta hai; tez chale, gap aaye ya volatility badhe toh seller haarta hai. Win rate zyada hone se selling safe nahi ho jaati, kyunki kuch bade loss bahut saare chhote profit mita sakte hain.',
    mechanism: 'When you sell, you receive the premium and the exchange clearing corporation (NSCCL) blocks margin from your broker account, calculated by SPAN plus exposure rules. Each day the position is marked to market. If it moves against you, the loss is deducted and the margin requirement can rise at the same time. If the margin is short, the broker may square off your position, often at a bad price. Index options are cash-settled at expiry; stock options are physically settled as per currently published NSE rules.',
    example: {
      title: 'Short 24,400 CE against a sudden rally (illustrative)',
      text: 'Spot 24,000, 7 days to expiry, IV 14%. You sell the 24,400 CE at 57.5 and collect 57.5 × 65 = ₹3,737.50. If Nifty finishes at 25,000, the option is worth 600 points, so the loss is (600 − 57.5) × 65 = ₹35,262.50, about 9.4 times the premium you collected. Breakeven for the seller is 24,457.5. There is no upper limit to the loss if Nifty keeps rising.',
    },
    chart: {
      kind: 'payoff',
      title: 'Short 24,400 CE at expiry',
      caption: 'Reward is flat and capped at the premium. The loss line keeps sloping down to the right.',
      spot: 24000,
      legs: [{ type: 'CE', side: -1, strike: 24400, premium: 57.5 }],
    },
    optionChain: 'On the chain, check four things before selling a strike: the bid-ask spread (your exit cost), the open interest and volume (can you get out), the IV of that strike versus its neighbours, and the premium relative to the distance from spot. A far OTM strike with a tiny premium pays little for a tail loss that is still large. Remember that high OI at your strike does not protect you; it is only a possible reaction level.',
    psychology: 'Premium collected feels like profit already earned, so sellers tend to relax, add lots, skip stops and avoid hedges after a run of wins. Then one sharp move arrives and the loss comes quickly. Selling suits traders who plan the worst case first, size small and accept a stop even when it hurts.',
    scenarios: {
      bullish: 'A strong up move hurts a short call badly, and a short put gains because it becomes worthless faster. Short calls need a defined exit or a bought call above them.',
      bearish: 'A sharp fall hurts a short put badly and usually raises IV at the same time, which makes the loss larger. Short puts are the classic source of large losses in crashes.',
      sideways: 'This is where sellers earn. Time decay works in your favour and the premium shrinks. Even here, a late gap, an event or a volatility jump can change the result.',
    },
    practice: [
      {
        q: 'You sell the 24,400 CE at 57.5, lot 65. What premium do you collect, and what is your breakeven at expiry?',
        a: 'Premium = 57.5 × 65 = ₹3,737.50. Breakeven = 24,400 + 57.5 = 24,457.5. Above that level the position loses money.',
      },
      {
        q: 'Same trade. Nifty expires at 24,900. What is the loss per lot?',
        a: 'Intrinsic = 24,900 − 24,400 = 500. Loss per unit = 500 − 57.5 = 442.5. Per lot = 442.5 × 65 = ₹28,762.50.',
      },
      {
        q: 'You sell the 23,600 PE at 43.7. Nifty expires at 22,000. What is the loss per lot?',
        a: 'Intrinsic = 23,600 − 22,000 = 1,600. Loss per unit = 1,600 − 43.7 = 1,556.3. Per lot = 1,556.3 × 65 = ₹1,01,159.50, about 35 times the premium of ₹2,840.50.',
      },
      {
        q: 'Spread: sell 24,400 CE at 57.5, buy 24,600 CE at 25.9. What is the net credit and the maximum loss per lot?',
        a: 'Net credit = 57.5 − 25.9 = 31.6 points. Width = 200. Maximum loss = (200 − 31.6) × 65 = 168.4 × 65 = ₹10,946. Maximum profit = 31.6 × 65 = ₹2,054, before costs.',
      },
    ],
    assignment: 'Pick one option you might sell on the current chain. Write down its premium, breakeven, the loss if Nifty moves 3% against you at expiry, and the margin the broker asks for. Then write the exact exit rule you will follow and the hedge you could buy against it. Decide whether the premium is worth that worst case.',
  },
  topics: [
    {
      t: 1,
      def: 'Unlimited naked call risk means that if you sell a call without owning a hedge, your loss grows point for point as the index rises, with no upper limit. The most you can earn is the premium. A naked position is one with no other leg or holding that offsets the risk.',
      hi: 'Naked call bechne ka matlab hai bina kisi hedge ke CE sell karna. Index jitna upar jayega, aapka loss utna badhta jayega aur uski koi upar seema nahi hai. Aapka maximum profit sirf premium hai.',
      how: 'A short call has a payoff of premium minus the amount spot finishes above the strike. For every point above the breakeven, you lose one point per unit. Because an index can in theory rise without limit, the loss has no ceiling. In practice the exchange margin and your broker limit how big a position you can hold, and they can close it when funds fall short. Delta also grows as the index rises, so the loss speeds up.',
      eg: {
        title: 'Naked 24,400 CE (illustrative)',
        text: 'Sell at 57.5, collect ₹3,737.50. At expiry 24,457.5 is breakeven. At 24,700 the loss is (300 − 57.5) × 65 = ₹15,762.50. At 25,000 it is ₹35,262.50. At 25,500 it is (1,100 − 57.5) × 65 = ₹67,762.50. The reward never grows beyond ₹3,737.50.',
      },
      tip: 'Decide the exit level and the maximum rupee loss before you sell, not after the index starts moving.',
      visual: {
        kind: 'payoff',
        title: 'Naked short call: capped reward, open loss',
        caption: 'Premium 57.5 on the 24,400 strike.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24400, premium: 57.5 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24400, premium: 57.5, expiryPrice: 25000, lotSize: 65, lots: 1 },
        why: 'Shows the 25,000 outcome and lets you change the expiry price.',
      },
    },
    {
      t: 2,
      def: 'Large put-selling risk means that a short put can lose a very big amount when the index falls sharply. The loss is not unlimited because an index cannot go below zero, but the worst case is still many times the premium. Falls are often fast and come with higher volatility, so put sellers are hit twice.',
      hi: 'Put bechne mein loss unlimited nahi hota kyunki index zero se neeche nahi ja sakta, lekin worst case premium se kai guna bada hota hai. Market girta hai toh aksar volatility bhi badhti hai, isliye put seller ko do taraf se maar padti hai.',
      how: 'A short put profits only while spot stays above the strike minus premium. Below that level the loss grows point for point. Falls tend to be sharper than rises, and fear lifts IV, which raises the put price further. A rule of thumb is to compare the premium with the loss in a fall of a few percent, not only with the chance of the fall. Margin for short puts also rises in volatile markets.',
      eg: {
        title: 'Short 23,600 PE (illustrative)',
        text: 'Spot 24,000, 7 days, IV 14%: the 23,600 PE is 43.7, so you collect ₹2,840.50. If Nifty expires at 22,000 (down 8.3%), the loss is (1,600 − 43.7) × 65 = ₹1,01,159.50. In theory the worst case is spot at zero: (23,600 − 43.7) × 65 = ₹15,31,159.50. Such a fall is extremely unlikely, but a loss of this size is possible.',
      },
      tip: 'The premium is tiny next to the tail loss. Ask what you lose in a 5% fall, not how often falls happen.',
      visual: {
        kind: 'payoff',
        title: 'Short 23,600 PE',
        caption: 'Gain limited to 43.7; loss rises as spot falls.',
        spot: 24000,
        legs: [{ type: 'PE', side: -1, strike: 23600, premium: 43.7 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 23600, premium: 43.7, expiryPrice: 22000, lotSize: 65, lots: 1 },
        why: 'Computes the loss when Nifty expires at 22,000.',
      },
    },
    {
      t: 3,
      def: 'Gap risk is the chance that the market opens far from the previous close, so there is no price in between at which you could have exited. A stop-loss cannot protect you from the gap because the order only triggers after the new open. Gaps come from overnight news, global markets, results and policy events.',
      hi: 'Gap risk ka matlab hai ki market pichle close se bahut door khulta hai aur beech ke price par exit ka mauka hi nahi milta. Stop-loss gap se bacha nahi sakta kyunki order naye open ke baad hi trigger hota hai. Gap raat ki khabar, global market, results ya policy se aa sakta hai.',
      how: 'The Indian cash and F&O market trades in sessions, so news after the close is priced at the next open. A short option that was fine at 3:30 pm can open much worse at 9:15 am. A stop-market order then fills at the first available price, not at your stop. This is why the loss you plan from a stop is only a target, and why position size must allow for a worse outcome. Hedging with a bought option is the only way to cap a gap loss in advance.',
      eg: {
        title: 'A gap through a stop (illustrative)',
        text: 'You sell the 24,400 CE at 57.5 and set a stop at 115, a planned loss of 57.5 × 65 = ₹3,737.50. Next morning Nifty opens at 24,400 with 6 days left; the option is about 188. Your stop fills near 188: loss = (188 − 57.5) × 65 = ₹8,482.50, more than twice the plan.',
      },
      tip: 'A stop sets where you want to exit. A gap decides where you actually exit. Size the position for the worse number.',
      visual: {
        kind: 'bars',
        title: 'Planned loss vs gap loss per lot',
        caption: 'Illustrative, short 24,400 CE.',
        unit: ' rupees',
        items: [
          { label: 'Planned (stop 115)', value: 3737.5, tone: 'gold' },
          { label: 'After gap (fill 188)', value: 8482.5, tone: 'bear' },
        ],
      },
    },
    {
      t: 4,
      def: 'Gamma risk is the risk that your delta changes quickly as the index moves. For a short option, gamma works against you: when the market moves against you, the position gets worse faster. It is largest for at-the-money options close to expiry.',
      hi: 'Gamma risk ka matlab hai ki index hilne par aapka delta tezi se badalta hai. Short option mein gamma aapke khilaaf kaam karta hai: market galat disha mein jaye toh position aur tezi se bigadti hai. Expiry ke paas ATM option mein gamma sabse zyada hota hai.',
      how: 'Delta tells you how much the option moves per point of the index. Gamma tells you how fast delta itself changes. A short ATM option on expiry day has high gamma, so a 100-point move can turn a calm position into a large loss. Sellers often hold the last day for the quick decay, but that is when gamma is strongest. The usual defence is to reduce size, hedge with a bought option, or close before the final hours.',
      eg: {
        title: 'Short ATM call with 1 day left (illustrative)',
        text: 'Spot 24,000, IV 14%. The 24,000 CE is worth 72.3 and has a delta near 0.51. If spot rises to 24,100 the option is about 134.4 (delta about 0.72). At 24,200 it is about 215.1 (delta about 0.88). A short lot loses (134.4 − 72.3) × 65 = ₹4,036.50 for the first 100 points and (215.1 − 72.3) × 65 = ₹9,282 for 200 points, so the second 100 points cost more than the first.',
      },
      tip: 'The closer to expiry and to the strike, the more violent the losses. Do not size a short ATM option as if delta stays fixed.',
      visual: { kind: 'curve', title: 'Gamma is highest at the money', caption: 'Delta changes fastest near the strike.', curve: 'gamma' },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 1, iv: 14, rate: 6.5 },
        why: 'See the delta and gamma of the ATM option with one day left.',
      },
    },
    {
      t: 5,
      def: 'Vega risk is the risk that implied volatility (IV) rises after you sell. IV is the volatility the market is pricing into the option. When it rises, option prices rise even if the index does not move, so a short option loses money.',
      hi: 'Vega risk ka matlab hai ki option bechne ke baad implied volatility (IV) badh jaye. IV woh volatility hai jo market option ke price mein laga raha hai. IV badhne par index na bhi hile toh option mahanga ho jata hai aur seller ko loss hota hai.',
      how: 'Option price has two parts: intrinsic value and time value. IV drives the time value. India VIX measures expected volatility of NIFTY over the next 30 days and is not a direction signal. IV usually rises before events and in sudden falls. A seller who sold at low IV has less cushion if it rises. Vega is larger for longer-dated options, so the risk is bigger in monthly contracts than in the last days of a weekly.',
      eg: {
        title: 'IV from 14% to 20% (illustrative)',
        text: 'Short the 24,000 CE with 7 days left at 200.8 (IV 14%). Spot is unchanged but IV rises to 20%: the option is about 280.2. Loss = (280.2 − 200.8) × 65 = 79.4 × 65 = ₹5,161, with Nifty at the same level.',
      },
      tip: 'Check where IV sits relative to its own recent range before selling. Selling when IV is already low leaves little reward for the vega risk.',
      visual: {
        kind: 'bars',
        title: 'Same strike, same spot, different IV',
        caption: '24,000 CE with 7 days left (illustrative).',
        unit: '',
        items: [
          { label: 'IV 14%', value: 200.8, tone: 'ice' },
          { label: 'IV 20%', value: 280.2, tone: 'bear' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 20, rate: 6.5 },
        why: 'Re-price at the higher IV to see the change.',
      },
    },
    {
      t: 6,
      def: 'Overnight risk is the risk of holding a short option while the market is closed. News, global markets or an announcement can change prices before you can act. The seller keeps the position through the night and cannot adjust until the open.',
      hi: 'Overnight risk ka matlab hai market band hone par bhi short option position ka khula rehna. Raat mein khabar, global market ya koi announcement price badal sakta hai aur aap open tak kuch kar nahi sakte. Position raat bhar aapke paas hi rehti hai.',
      how: 'Time passes overnight, so decay helps you slightly, but that gain is small compared with a gap. Weekends and holidays add more days of news without trading. Event days such as a Union Budget, RBI policy, election results (for example 4 June 2024) or major global moves have produced large opening gaps before. Day traders avoid this risk by closing everything before the close. Positional sellers should size and hedge for it.',
      eg: {
        title: 'Short put held overnight (illustrative)',
        text: 'You sold the 23,600 PE at 43.7 on a Friday afternoon. A weekend event pushes Nifty to open at 23,300 with 6 days left and IV rising to 18%. The put is about 380.4. Loss = (380.4 − 43.7) × 65 = 336.7 × 65 = ₹21,885.50 before you can place the first order.',
      },
      tip: 'Before the close, ask whether you could live with the position if the market opened 2% away. If not, reduce or hedge.',
      visual: {
        kind: 'timeline',
        title: 'The overnight gap',
        caption: 'There is no trading between 3:30 pm and 9:15 am.',
        events: [
          { when: 'Fri 3:30 pm', what: 'Close 24,000, put 43.7', tone: 'ice' },
          { when: 'Weekend', what: 'News arrives, no trading', tone: 'gold' },
          { when: 'Mon 9:15 am', what: 'Open 23,300, put about 380', tone: 'bear' },
        ],
      },
    },
    {
      t: 7,
      def: 'Margin expansion is the rise in the margin your broker blocks against a short position. It can happen when volatility jumps or the position moves against you. If your free balance is not enough, you may face a margin call or forced square-off.',
      hi: 'Margin expansion ka matlab hai ki short position par broker jo margin rokta hai woh badh jata hai. Volatility ya position ke galat jaane par aisa hota hai. Free balance kam pada toh margin call ya forced square-off ho sakta hai.',
      how: 'The clearing corporation computes margin using SPAN (a risk-scenario model) plus exposure margin, and revises it as volatility and prices change. A position that moves against you loses money through mark-to-market and needs more margin, so two pressures arrive together. If the account falls short, the broker can close the position, usually at the worst moment. Keep a buffer of cash well above the initial margin. Current numbers come from the exchange and broker margin calculators, so verify before trading.',
      eg: {
        title: 'Margin jump on a volatility spike (illustrative)',
        text: 'Assume a short position needs ₹1,20,000 margin and your account holds ₹1,40,000. A spike lifts margin by 25% to ₹1,50,000 (1,20,000 × 1.25) while the position also shows a loss of ₹8,000. Your free balance is now ₹1,40,000 − ₹8,000 = ₹1,32,000 against ₹1,50,000 required, a shortfall of ₹18,000.',
      },
      tip: 'Never use all of your capital as margin. Keep cash for the day margin rises while you are losing.',
      visual: {
        kind: 'bars',
        title: 'Margin before and after a spike (illustrative)',
        caption: 'Rupees. Account balance 1,40,000 less a loss of 8,000.',
        unit: '',
        items: [
          { label: 'Margin before', value: 120000, tone: 'ice' },
          { label: 'Margin after', value: 150000, tone: 'bear' },
          { label: 'Balance after loss', value: 132000, tone: 'gold' },
        ],
      },
    },
    {
      t: 8,
      def: 'Liquidity risk is the risk that you cannot close a position at a fair price because few buyers and sellers are quoting. For a short option, you must buy it back, and a thin market makes you pay the ask, which may be far from the last price.',
      hi: 'Liquidity risk ka matlab hai ki kam buyers aur sellers hone se aap position fair price par band nahi kar paate. Short option ko wapas kharidna padta hai, aur thin market mein aapko ask price dena padta hai jo last price se kaafi door ho sakta hai.',
      how: 'Check bid-ask spread, quoted quantity and traded volume before selling. Far OTM strikes and strikes of stocks or later expiries can have thin depth. In a fast market, market makers widen quotes or step back. Buying to close a short at the ask raises your loss in a rush. Use limit orders and avoid illiquid strikes, especially for large size.',
      eg: {
        title: 'Cost of a wide quote (illustrative)',
        text: 'You sold an option that now quotes bid 8, ask 12, and you want to close 2 lots (130 units). Buying at the ask 12 instead of the mid 10 costs 2 × 130 = ₹260 more. A full round trip against the spread, 4 × 130 = ₹520, is gone before the market has moved.',
      },
      tip: 'If you cannot explain how you would exit in a hurry, do not enter.',
      visual: {
        kind: 'orderBook',
        title: 'A thin quote (illustrative)',
        caption: 'Small quantities on both sides and a wide gap.',
        bids: [[8, 65], [7, 65], [5, 130]],
        asks: [[12, 65], [14, 65], [17, 130]],
      },
      calc: {
        id: 'spread-cost',
        preset: { bid: 8, ask: 12, qty: 2, lotSize: 65 },
        why: 'Puts a rupee figure on crossing the spread.',
      },
    },
    {
      t: 9,
      def: 'Expiry settlement risk is the risk that an option you sold finishes in the money and settles against you. NSE index options are European and cash-settled, so you pay the difference in cash. Stock options are physically settled, so a short in-the-money option can mean delivering or taking shares.',
      hi: 'Expiry settlement risk ka matlab hai ki jo option aapne becha woh expiry par in-the-money khatam ho aur aapke khilaaf settle ho. NSE ke index options European aur cash-settled hote hain, yaani difference cash mein dena padta hai. Stock options physically settle hote hain, yaani shares dene ya lene pad sakte hain.',
      how: 'At expiry the exchange uses a final settlement price for the index. A short ITM option is settled in cash and the loss is debited. For stock options, an ITM position leads to delivery obligations, so you need the shares or the money, and an unhedged short can create a large demand on your account. Brokers often square off positions near expiry if margin is short. Check the current NSE contract specification and the rules on in-the-money expiry charges before holding to expiry.',
      eg: {
        title: 'Short 24,000 CE settled in cash (illustrative)',
        text: 'You sold the 24,000 CE at 40. The final settlement price is 24,150, so the option is worth 150. Loss = (150 − 40) × 65 = ₹7,150, debited in cash. If it were a stock option on a lot of, say, 500 shares at ₹1,000, an in-the-money short call would mean delivering shares worth ₹5,00,000 (illustrative lot) unless closed earlier.',
      },
      tip: 'Close short options before expiry unless you have planned for the settlement, especially stock options.',
      visual: {
        kind: 'compare',
        title: 'How expiry settles',
        caption: 'Check current NSE specifications.',
        left: { head: 'Index options', tone: 'ice', points: ['European, exercised only at expiry', 'Cash-settled', 'Loss debited from account'] },
        right: { head: 'Stock options', tone: 'gold', points: ['Physically settled', 'ITM short can mean delivery', 'Needs shares or full funds'] },
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24000, premium: 40, expiryPrice: 24150, lotSize: 65, lots: 1 },
        why: 'Computes the cash-settled loss at expiry.',
      },
    },
    {
      t: 10,
      def: 'Hedging means adding another position that offsets part of the risk. For a short option, the usual hedge is to buy a farther option in the same direction, which creates a spread with a fixed worst case. A hedge costs premium and cuts the reward, but it limits the loss.',
      hi: 'Hedging ka matlab hai doosri position jodna jo risk ka ek hissa kaat de. Short option ke liye aam hedge hai door ka option kharidna, jisse spread ban jata hai aur worst case tay ho jata hai. Hedge mein premium lagta hai aur reward kam hota hai, par loss seemit ho jata hai.',
      how: 'In a bear call spread you sell a nearer call and buy a farther call. The maximum loss is the strike width minus the net credit. Margin for a hedged position is also usually much lower than for a naked one, which frees capital and avoids forced exits. A hedge does not remove all risk: costs, spreads and early closing still apply. A hedge that is too far away offers less help.',
      eg: {
        title: 'Hedging the 24,400 CE (illustrative)',
        text: 'Sell 24,400 CE at 57.5 and buy 24,600 CE at 25.9. Net credit = 31.6 points = ₹2,054. Maximum loss = (200 − 31.6) × 65 = ₹10,946, compared with ₹35,262.50 for the naked call at 25,000. The price of that cap is that the maximum profit drops from ₹3,737.50 to ₹2,054.',
      },
      tip: 'Compare the cost of the hedge with the loss it prevents, not only with the premium you give up.',
      visual: {
        kind: 'payoff',
        title: 'Bear call spread',
        caption: 'Sell 24,400 CE, buy 24,600 CE. Loss is capped.',
        spot: 24000,
        legs: [
          { type: 'CE', side: -1, strike: 24400, premium: 57.5 },
          { type: 'CE', side: 1, strike: 24600, premium: 25.9 },
        ],
      },
    },
  ],
  tools: [{ id: 'expected-move', preset: { spot: 24000, vix: 14, days: 7 }, why: 'Compare your strike distance with a one-standard-deviation move.' }],
}
export default m
