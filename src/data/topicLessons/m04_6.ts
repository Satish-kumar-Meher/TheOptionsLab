import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '4.6',
  intro:
    `Premiums do not move in straight lines. They swell when buyers rush in, shrink as time passes, jump on news, collapse after events and sometimes behave in ways that seem to contradict the index. This module names those behaviours so that you recognise each one when it happens to your position. Examples use NIFTY 24,000, lot 65 (check the current NSE contract specification), rate 6.5% and Black-Scholes model values, which are illustrative and differ from live premiums.`,
  introHi:
    `Premium seedhi line mein nahi chalta. Jab buyers toot padte hain toh phool jata hai, time guzarne par sikud jata hai, news par uchhalta hai, event ke baad gir jata hai, aur kabhi kabhi index ke ulta behave karta hai. Is module mein in behaviours ke naam aur pehchaan hai, taaki jab aapki position ke saath ho toh aap samajh sako. Examples NIFTY 24,000, lot 65 (current NSE contract specification check karein), rate 6.5% aur Black-Scholes model values par hain, jo illustrative hain aur live premium se alag hote hain.`,
  steps: {
    concept:
      `Premium behaviour is the pattern of how an option's price changes through time, volatility shifts and index moves. Expansion and contraction describe the premium growing or shrinking; decay is the steady loss of time value; spikes and IV crush are fast volatility-driven jumps and drops. Two behaviours surprise beginners most: a premium that rises while the index is flat, and a premium that falls while the index moves your way.`,
    conceptHi:
      `Premium behaviour ka matlab hai ki time, volatility aur index moves ke saath option ka price kaise badalta hai. Expansion aur contraction premium ke badhne aur ghatne ko kehte hain; decay time value ka dheere dheere khatam hona hai; spike aur IV crush volatility se aane wale tez jump aur girawat hain. Do behaviours beginners ko sabse zyada chaunkate hain: index flat ho aur premium badhe, aur index aapke favour mein chale phir bhi premium ghate.`,
    mechanism:
      `Change in premium is approximately: delta x index move + half gamma x (index move)^2 + theta x days + vega x IV change. That single sentence explains every behaviour in this module. When the first two terms are larger than the third, premium expands. When theta dominates, premium decays. When the vega term swings sharply, you get a spike or a crush. IV tends to rise into scheduled events and fall right after them, which is why event days show both. On NSE, option writers and market makers re-quote whenever spot or the IV they use changes, so the effects appear immediately on the chain.`,
    example: {
      title: 'One call, five different days (model, illustrative)',
      text: `Start: NIFTY 24,000, 24,000 CE, 7 days, IV 14%: ₹200.85. Day later, NIFTY 24,100, 6 days: ₹242.19 (expansion, +₹41.34). Day later, NIFTY 23,900, 6 days: ₹136.79 (contraction, -₹64.06). Flat NIFTY for three days: ₹148.98 at 4 days (decay of ₹51.87). Flat NIFTY but IV jumps 13% to 17% over two days: ₹187.62 becomes ₹201.29 (+₹13.67). The same option shows four behaviours without any change in strategy.`,
    },
    chart: {
      kind: 'timeline',
      title: 'Premium of one call over a hypothetical week (illustrative)',
      caption: 'Model values for the 24,000 CE: what moves the premium on each step.',
      events: [
        { when: 'Day 0', what: 'Spot 24,000, 7 days left, IV 14%: premium ₹200.85', tone: 'neutral' },
        { when: 'Rally', what: 'Spot 24,100, 6 days left: ₹242.19, expansion from direction', tone: 'bull' },
        { when: 'Pre-event', what: 'IV rises from 15% to 20% with 3 days left: premium adds about ₹43', tone: 'gold' },
        { when: 'After event', what: 'IV falls back, spot unchanged: IV crush removes about ₹84', tone: 'bear' },
        { when: 'Last day', what: 'Spot flat, 1 day left: ₹72.31; decay is fastest here', tone: 'ice' },
      ],
    },
    optionChain:
      `On the option chain these behaviours show as moves in LTP, in the IV column and in the Change columns, all at once. Expansion shows as green LTP with rising IV. A crush shows as a red LTP on both CE and PE across strikes even though the index barely moved, and an IV column that falls in unison. Decay is visible when you compare the same strike at the same index level on consecutive days. Open interest by itself cannot tell you whether premiums are being bought or sold.`,
    psychology:
      `Expansion creates greed: traders add to winners at inflated IV. Decay creates hope: holders "wait for one more day" while the premium bleeds. A crush creates anger and the belief that the market is rigged, when in fact a known event passed. Sellers see steady theta and feel safe until a spike hits. The disciplined habit is to ask, before every trade, which of these behaviours you are exposed to and what the exit is if it goes the wrong way.`,
    scenarios: {
      bullish:
        `A quick rally with steady IV expands the call premium: the 24,000 CE gains about ₹41.34 per unit (₹2,687 per lot) after a 100-point rise and a day of decay. A slow grind up with falling IV may expand it far less, or even shrink it.`,
      bearish:
        `A fall contracts the call and expands the put. The 24,000 CE falls about ₹64.06 on a 100-point drop plus a day of decay (₹4,164 per lot). Falls often lift IV, which may soften the call's loss and enlarge the put's gain.`,
      sideways:
        `A sideways market decays premium day after day: the 24,000 CE loses about ₹16 on day one, ₹17 on day two, ₹19 on day three in the model. Unless IV rises, the buyer is paying for time and the seller is collecting it.`,
    },
    practice: [
      {
        q: `The 24,000 CE falls from ₹200.85 (7 days) to ₹148.98 (4 days) with NIFTY unchanged at 24,000. How much is lost per lot of 65 and what is the average loss per day?`,
        a: `Loss per unit = 200.85 - 148.98 = ₹51.87. Per lot = 51.87 x 65 = ₹3,371.55. Average per day over 3 days = 51.87 / 3 = ₹17.29 per unit (₹1,124 per lot), and the daily loss is increasing.`,
      },
      {
        q: `A trader buys the 24,000 CE two days before an event at ₹146.04 (IV 20%). After the event, one day later, spot is unchanged and IV is 12%. Premium is ₹62.29. What is the loss per lot and which behaviour is it?`,
        a: `Loss per unit = 146.04 - 62.29 = ₹83.75. Per lot = 83.75 x 65 = ₹5,443.75. This is IV crush, helped by one day of decay. The index did not move at all.`,
      },
      {
        q: `Spot is flat but a call with 7 days left and IV 13% (₹187.62) becomes ₹201.29 two days later with IV 17%. Explain the gain.`,
        a: `A 4-point IV rise adds more than two days of decay take away. Gain = 201.29 - 187.62 = ₹13.67 per unit (₹888.55 per lot). Vega beat theta even in a sideways market.`,
      },
      {
        q: `You bought the 24,000 CE at ₹162.70 with 3 days left and IV 18%. NIFTY rises 60 points to 24,060 two days later, IV falls to 13%, premium is ₹130.53. Why a loss on a favourable move?`,
        a: `Loss per unit = 162.70 - 130.53 = ₹32.17 (₹2,091 per lot). The delta gain from 60 points was smaller than the combined loss from 5 points of lower IV and one day of decay. Direction was right, but volatility and time were against the buyer.`,
      },
    ],
    assignment:
      `Using the Greeks calculator, reproduce the table in the example: write down the 24,000 CE premium at (24,000, 7 days, IV 14%), (24,100, 6 days, 14%), (23,900, 6 days, 14%), (24,000, 4 days, 14%) and (24,000, 5 days, 17%). Label each change with its behaviour name from this module. Then watch your own broker's chain for three days around an expiry and note one example of each behaviour you can see.`,
  },
  topics: [
    {
      t: 1,
      def: `Premium expansion is a rise in an option's price. It happens when the index moves in the option's favour, when implied volatility rises, or both. Expansion in a long option is profit, but it can reverse as fast as it came.`,
      hi: `Premium expansion matlab option ke price ka badhna. Yeh tab hota hai jab index option ke favour mein chalta hai, ya implied volatility badhti hai, ya dono. Long option mein expansion profit hota hai, lekin utni hi tezi se palat bhi sakta hai.`,
      how: `Expansion has two engines: delta (the index moving) and vega (IV rising). The delta engine is strongest in at-the-money options and speeds up as gamma builds. The vega engine matters most before events. A third effect, the gamma bonus, adds a little extra on large moves because delta grows as the option goes deeper in the money. Expansion fights theta: the premium only rises on a day if the first two exceed the daily time loss.`,
      eg: {
        title: 'A 100-point rally lifts the 24,000 CE (model, illustrative)',
        text: `At 24,000 with 7 days and IV 14% the call is ₹200.85. A day later NIFTY is 24,100, 6 days remain: ₹242.19. Gain ₹41.34 per unit, ₹2,687 per lot of 65, even after absorbing about ₹16 of time decay.`,
      },
      tip: `Expansion is a gift on a long option, not a promise. Book part of it or tighten the stop rather than assuming it continues.`,
      visual: { kind: 'candles', title: 'Rally days expand call premium', caption: 'A rising index with steady IV is the cleanest expansion.', pattern: 'uptrend' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24100, strike: 24000, days: 6, iv: 14, rate: 6.5 }, why: 'Reprice the call after the move and compare with the base.' },
    },
    {
      t: 2,
      def: `Premium contraction is a fall in an option's price. It happens when the index moves against the option, when time passes, or when implied volatility falls. Contraction is a loss for the buyer and a gain for the seller, subject to the seller's risk.`,
      hi: `Premium contraction matlab option ke price ka girna. Yeh tab hota hai jab index option ke against jata hai, time guzarta hai, ya implied volatility girti hai. Buyer ke liye yeh loss hai aur seller ke liye gain, jis par seller ka risk bhi juda hota hai.`,
      how: `Contraction can come from any of the same factors that cause expansion, working in reverse. Because options are leveraged, the percentage fall in premium is usually larger than the percentage fall in the index. A buyer's maximum loss is the premium paid; a seller's loss can be much larger than the premium received, which is why margin is blocked for sellers.`,
      eg: {
        title: 'A 100-point fall hits the 24,000 CE (model, illustrative)',
        text: `From ₹200.85 (NIFTY 24,000, 7 days) to ₹136.79 (NIFTY 23,900, 6 days): a loss of ₹64.06 per unit, ₹4,164 per lot of 65. The index fell 0.42%, the option fell 31.9%.`,
      },
      tip: `Percent moves in premium are far larger than percent moves in the index. Size the position so that a 30 to 50 percent premium fall does not hurt you.`,
      visual: { kind: 'candles', title: 'Falling index contracts call premium', caption: 'The call loses on both delta and time.', pattern: 'downtrend' },
    },
    {
      t: 3,
      def: `Premium decay (time decay) is the steady loss of an option's time value as expiry approaches, even when the index and IV stay the same. It is measured by theta. Decay is the seller's income and the buyer's cost.`,
      hi: `Premium decay (time decay) matlab expiry paas aane par option ki time value ka lagataar ghatna, chahe index aur IV same rahein. Ise theta se naapte hain. Decay seller ki kamai hai aur buyer ka cost.`,
      how: `Decay is not linear. For an at-the-money option it accelerates in the last few days; for an out-of-the-money option the whole premium decays to zero by expiry. Because NSE index options settle in cash at expiry value, any option that ends out of the money expires worthless. Decay happens every calendar day in the model, including weekends; how markets treat weekends is covered in module 6.4.`,
      eg: {
        title: 'Three quiet days (model, illustrative)',
        text: `NIFTY stays at 24,000. The 24,000 CE goes from ₹200.85 (7 days) to ₹184.89 (6 days), ₹167.73 (5 days) and ₹148.98 (4 days). Daily losses are ₹15.96, ₹17.16 and ₹18.75, a total of ₹51.87 or ₹3,372 per lot of 65.`,
      },
      tip: `Time decay is not a bug in the market; it is the price of optionality. Buy it only when you expect a move soon.`,
      visual: { kind: 'curve', title: 'Time value shrinks towards expiry', caption: 'The curve steepens in the final days.', curve: 'timeValue' },
    },
    {
      t: 4,
      def: `A sudden premium spike is a quick, sharp jump in option prices, usually within minutes. Typical triggers are surprise news, a sharp index move, or a sudden jump in implied volatility. Spikes are exciting for buyers and dangerous for sellers.`,
      hi: `Sudden premium spike matlab option prices ka kuch hi minute mein tez jump. Aam trigger hain achanak aayi khabar, index ka tez move, ya implied volatility ka jump. Spike buyers ke liye exciting hota hai aur sellers ke liye khatarnak.`,
      how: `When the index jumps, market makers widen quotes and raise their IV to protect themselves, so premiums rise faster than the model would suggest. Stop-loss orders of option sellers are triggered, which can add to the spike. Spreads widen, so exit prices may differ from the last traded price. A spike that is based on a volatility jump, not a lasting move, often retraces when the shock fades.`,
      eg: {
        title: 'IV jumps 15% to 20% with 3 days left (model, illustrative)',
        text: `Spot 24,000. The 24,000 CE moves from ₹136.68 to ₹180.04, a gain of ₹43.36 per unit or ₹2,818 per lot of 65, without the index moving. A short seller of that option is down the same amount and may face a margin call.`,
      },
      tip: `In a spike, do not chase the premium. Decide in advance whether you take profit or hold, and use limit orders because spreads widen.`,
      visual: { kind: 'candles', title: 'A news-driven gap', caption: 'A gap leaves no time to react: option prices jump with it.', pattern: 'gapUp' },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'sell', strike: 24000, premium: 136.68, expiryPrice: 24000, lotSize: 65, lots: 1 }, why: 'See what a spike does to a short option.' },
    },
    {
      t: 5,
      def: `IV crush is a fast drop in implied volatility, usually right after an anticipated event has passed. Option prices fall sharply even if the index moves in the buyer's favour, because uncertainty has disappeared.`,
      hi: `IV crush matlab implied volatility ka achanak gir jana, aam taur par kisi expected event ke guzarne ke turant baad. Index buyer ke favour mein bhi chale phir bhi option price girte hain, kyunki uncertainty khatam ho gayi hoti hai.`,
      how: `Before known events such as the Union Budget, RBI policy, election results or earnings season, buyers pay up for protection and IV rises. Once the outcome is known, the unknown is gone and IV falls. Vega is largest for ATM options with more time left, so a crush hurts them the most in rupees. Both calls and puts fall in a crush, which is why a long straddle bought before an event can lose even when the index moves.`,
      eg: {
        title: 'Event passes, premium collapses (model, illustrative)',
        text: `Two days before an event the 24,000 CE is ₹146.04 at IV 20%. The next day the event is over, spot is still 24,000, IV is 12% and the call is ₹62.29. Loss per unit ₹83.75, or ₹5,444 per lot of 65. About ₹14 of that is decay, the rest is the IV drop.`,
      },
      tip: `Buying options just before a well-known event means paying peak volatility. The index must move more than the market already expects for you to profit.`,
      visual: { kind: 'curve', title: 'Vega: price sensitivity to IV', caption: 'When IV falls, premium falls by vega per volatility point.', curve: 'vega' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 1, iv: 12, rate: 6.5 }, why: 'Reprice the call after the event with lower IV.' },
    },
    {
      t: 6,
      def: `A premium can rise even when the index goes nowhere. This happens when implied volatility rises faster than time decay erodes the premium. It is common before events and in nervous markets.`,
      hi: `Index kahin na jaye phir bhi premium badh sakta hai. Aisa tab hota hai jab implied volatility itni tezi se badhe ki time decay ka nuksan chhota pad jaye. Events se pehle aur ghabrahat wale markets mein yeh aam hai.`,
      how: `The premium change is theta times days plus vega times the IV change. If IV rises by more points than the theta loss divided by vega, the premium rises. Market makers lift IV on both calls and puts when they expect bigger swings. This is the reason a long straddle or strangle can gain in a flat market. It also reminds sellers that a calm index is not enough; IV must stay calm too.`,
      eg: {
        title: 'Flat index, rising premium (model, illustrative)',
        text: `NIFTY 24,000 on both days. Day 1: 24,000 CE with 7 days and IV 13% is ₹187.62. Two days later, 5 days left and IV 17%: ₹201.29. Gain ₹13.67 per unit, ₹889 per lot of 65. Two days of decay cost about ₹32, but 4 vega points added about ₹46.`,
      },
      tip: `A sideways chart can still hurt a short option seller if IV rises, so watch India VIX, not just the price chart.`,
      visual: { kind: 'bars', title: 'What drove the flat-market gain', caption: 'Two days, spot unchanged; illustrative ₹ per unit.', unit: ' ₹', items: [{ label: 'Vega: IV 13% to 17%', value: 46, tone: 'gold' }, { label: 'Theta: 2 days', value: -32, tone: 'ice' }, { label: 'Net change', value: 13.67, tone: 'neutral' }] },
    },
    {
      t: 7,
      def: `A premium can fall even when the index moves in your favour. This happens when time decay and a drop in implied volatility outweigh the gain from the index move. It is the classic frustration of the option buyer.`,
      hi: `Index aapke favour mein chale phir bhi premium gir sakta hai. Aisa tab hota hai jab time decay aur IV ki girawat index move ke fayde se zyada ho jaye. Option buyer ki yeh sabse aam jhunjhalahat hai.`,
      how: `Delta gain equals delta times the index move, which can be small for a modest move in an at-the-money or out-of-the-money option. Theta and vega losses are subtracted every day. When IV was high at purchase (before an event) and falls afterwards, vega loss can be larger than the delta gain. Buying out-of-the-money options with a small expected move makes the problem worse because delta is low.`,
      eg: {
        title: 'Right direction, still a loss (model, illustrative)',
        text: `Buy the 24,000 CE at ₹162.70 with 3 days left and IV 18%. Two days later NIFTY is up 60 points at 24,060, IV 13%, premium ₹130.53. Loss ₹32.17 per unit, ₹2,091 per lot of 65. The 60-point rise added about ₹37, but five lost IV points and two days of decay took away about ₹69.`,
      },
      tip: `Being right on direction is not enough. Right direction, enough size of move, in enough time and at a fair IV: all four are needed.`,
      visual: { kind: 'bars', title: 'Why a good move still lost', caption: 'Illustrative approximate attribution, ₹ per unit, 24,000 CE.', unit: ' ₹', items: [{ label: 'Delta: +60 points', value: 37, tone: 'bull' }, { label: 'Vega: IV 18% to 13%', value: -43, tone: 'bear' }, { label: 'Theta: 2 days', value: -26, tone: 'bear' }, { label: 'Net', value: -32.17, tone: 'neutral' }] },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 162.7, expiryPrice: 24060, lotSize: 65, lots: 1 }, why: 'Compare expiry payoff with the mark-to-market premium.' },
    },
    {
      t: 8,
      def: `Premium behaviour during expiry describes how option prices move on the last day. Time value melts fast, gamma is very high near the strike, and small index moves can change premiums by large percentages. Out-of-the-money options are close to worthless while at-the-money options can swing wildly.`,
      hi: `Expiry ke din premium behaviour matlab aakhri din option prices kaise chalte hain. Time value tezi se pighalti hai, strike ke paas gamma bahut zyada hota hai, aur chhote index moves se premium mein bade percentage changes aa sakte hain. Out-of-the-money options lagbhag zero ho jate hain aur at-the-money options bahut uchhal kood karte hain.`,
      how: `NIFTY options expire on a fixed weekday (currently Tuesday as per NSE specifications; verify before trading). On expiry day the contract is cash-settled at the final settlement price, so options that finish out of the money expire worthless. Gamma rises and theta is largest for the ATM strike; far strikes lose nearly everything. Hedging flows from market makers can cause rapid back-and-forth moves in the index near large OI strikes, but OI does not guarantee support or resistance.`,
      eg: {
        title: 'The last day, NIFTY at 24,000 (model, illustrative)',
        text: `24,000 CE with 1 day left: ₹72.31; with about half a day left: ₹50.69; with about six hours left: ₹35.62. A 24,200 CE with the same times: ₹11.92, ₹3.01, ₹0.37. If NIFTY rallies to 24,200 with six hours left, the 24,200 CE is about ₹35.91, nearly a hundredfold jump from ₹0.37; if NIFTY slips to 23,900 it is about ₹0.01.`,
      },
      tip: `On expiry day, gains and losses come in minutes and spreads widen. Size down, use limit orders and avoid holding what you cannot afford to lose entirely.`,
      visual: { kind: 'bars', title: '24,200 CE through the last day, spot 24,000', caption: 'Illustrative model values: spot unchanged, only time passing.', unit: ' ₹', items: [{ label: '1 day left', value: 11.92, tone: 'ice' }, { label: '12 hours left', value: 3.01, tone: 'ice' }, { label: '6 hours left', value: 0.37, tone: 'gold' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24200, days: 1, iv: 14, rate: 6.5 }, why: 'Reprice the 24,200 CE with one day left.' },
    },
  ],
  tools: [{ id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Reproduce each premium behaviour by changing one input at a time.' }],
}
export default m
