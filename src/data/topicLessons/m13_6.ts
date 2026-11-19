import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '13.6',
  intro:
    `A writer is trapped when the market moves against a crowded position and every exit, whether buying back, hedging or waiting, costs money. Traps are not a fault of the exchange; they are a result of selling premium with a small gain and a large possible loss. This module describes the common trap patterns and how to spot the conditions that may create them, without claiming that any trap can be predicted.`,
  introHi:
    `Writer tab trapped hota hai jab market crowded position ke khilaf jata hai aur har exit, chahe buy back ho, hedge ho ya wait, paisa kharch karta hai. Traps exchange ki galti nahi hote; yeh tab hote hain jab chhote gain ke badle bada possible loss uthaya jata hai. Is module mein common trap patterns aur unhe banane wali conditions dekhenge, yeh claim kiye bina ki koi bhi trap predict ho sakta hai.`,
  steps: {
    concept:
      `A trap has three parts: a crowd that is positioned the same way, a trigger that moves price against the crowd, and a lack of easy exits. Option writers are exposed because their profit is capped at the premium while the loss can be several times larger. When many writers must act at once, their own buying or hedging can make the move bigger.`,
    conceptHi:
      `Trap ke teen hisse hote hain: ek crowd jo ek hi taraf positioned hai, ek trigger jo price ko crowd ke khilaf le jata hai, aur easy exit ka na hona. Option writers exposed hote hain kyunki profit premium tak limited hota hai aur loss kai guna bada ho sakta hai. Jab bahut saare writers ek saath action lete hain, toh unki apni buying ya hedging move ko aur bada kar sakti hai.`,
    mechanism:
      `Losses build through four channels: the underlying moves, implied volatility rises, time decay stops helping because the option is now near the money, and margin goes up. SPAN margin is recalculated by NSCCL several times a day, so a trapped writer may need more cash when the position is already losing. A stop-loss is a buy order that may fill at a worse price in a thin book. Brokers can also square off positions on a margin shortfall. All of these happen at the same time, which is why the loss from a trap is often bigger than a simple calculation suggests.`,
    example: {
      title: 'A call writer is caught (illustrative)',
      text: `A writer sells the 7-day 24,300 CE at ₹81.99 with Nifty at 24,000. A strong move takes Nifty to 24,500 with the option at ₹325.68, so the loss is (325.68 − 81.99) = ₹243.69 per unit, ₹15,839.85 per lot of 65, which is about 3 times the premium. Part of that move can also come from a rise in implied volatility, and a stop at ₹163.98 could fill at a worse price if the book is thin.`,
    },
    chart: {
      kind: 'timeline',
      title: 'How a writer trap often unfolds',
      caption: 'The order and speed vary; the loop is the point.',
      events: [
        { when: 'Setup', what: 'Crowd writes the same strike; premium looks safe', tone: 'gold' },
        { when: 'Trigger', what: 'News, gap or a break of the level', tone: 'bear' },
        { when: 'Squeeze', what: 'Premium jumps; IV rises; margin increases', tone: 'bear' },
        { when: 'Forced exits', what: 'Stops and margin calls add buying', tone: 'bear' },
        { when: 'Aftermath', what: 'Move fades or continues; OI is reset', tone: 'neutral' },
      ],
    },
    optionChain:
      `Possible trapped positions show up on the chain as high OI at a strike that spot is now crossing, rising premium with falling OI (covering), rising IV across strikes, and a fast widening of bid-ask spreads. None of these identifies the writers by name or tells their risk limits. Use them as warnings to reduce size or hedge, and not as a trading signal on their own. OI alone cannot show who initiated a trade.`,
    psychology:
      `Traps combine fear and denial: writers hope the move reverses, then panic when it continues. A trapped writer may add to the loss, move the stop, or exit at the worst point. Buyers who see writers in trouble may chase, and the crowd on both sides can overreact. A trader who has pre-set rules and hedges is far less likely to be forced into a bad exit.`,
    scenarios: {
      bullish:
        `A sharp rally is the call writers' trap. Premiums jump, stops trigger, and some writers hedge or cover with futures. If the rally fades, covered writers locked in a loss on the top.`,
      bearish:
        `A sharp fall is the put writers' trap. Premiums jump, IV rises and margin grows. If the fall reverses, writers who exited at the low locked a loss and then watched it recover.`,
      sideways:
        `A range is kind to writers, but volatility can rise inside a range, and a failed breakout or breakdown can trap both writers and breakout traders. The danger is the exit from the range.`,
    },
    practice: [
      {
        q: `A writer sold the 7-day 23,700 PE at ₹64.57. Nifty falls to 23,500 with the same 7 days left and the put is ₹280.19. What is the loss per lot of 65?`,
        a: `Loss per unit = 280.19 − 64.57 = ₹215.62. Per lot = 215.62 × 65 = ₹14,015.30. That is about 3.3 times the premium of ₹4,197.05 per lot (64.57 × 65).`,
      },
      {
        q: `The 24,300 CE was sold at ₹81.99. IV rises from 14% to 20% with spot and time unchanged (7 days left) and the call becomes ₹153.22. What is the mark-to-market loss per lot of 65?`,
        a: `Loss per unit = 153.22 − 81.99 = ₹71.23. Per lot = 71.23 × 65 = ₹4,629.95. The index has not moved at all; the loss came only from higher implied volatility.`,
      },
      {
        q: `A stop-loss buy order for 100 lots (6,500 units) triggers at ₹105. The asks are 1,300 at 105, 1,950 at 108, 1,950 at 112 and 1,300 at 118. What is the average fill and the extra cost versus ₹105?`,
        a: `Value = (105 × 1,300) + (108 × 1,950) + (112 × 1,950) + (118 × 1,300) = 136,500 + 210,600 + 218,400 + 153,400 = ₹7,18,900. Average = 7,18,900 / 6,500 = ₹110.60. Extra cost = 5.60 × 6,500 = ₹36,400 versus filling all at ₹105.`,
      },
      {
        q: `A writer who sold the 24,300 CE at ₹81.99 buys the 24,500 CE at ₹39.46 with 3 days left (Nifty 24,250). What are the credit and the maximum loss per lot of 65 after this adjustment?`,
        a: `Credit = 81.99 − 39.46 = ₹42.53 per unit. Maximum loss = 200 − 42.53 = ₹157.47 per unit = ₹10,235.55 per lot. The adjustment cost ₹39.46 × 65 = ₹2,564.90 per lot but ends the unlimited risk.`,
      },
    ],
    assignment:
      `Choose one past trading day when Nifty moved more than 1% and write what a writer at the nearest strike on the side of the move would have felt, using your broker's historical option prices if available. Note: premium before and after, the loss per lot, whether IV moved, and which exit you would have preferred (hold, cover, hedge). Then write the rule that would have kept the loss to your risk limit.`,
  },
  topics: [
    {
      t: 1,
      def: `Call writers are trapped above resistance when the index rises through the strike they sold, instead of stopping at it. The premium they sold turns into a large loss and the exits are costly.`,
      hi: `Call writers resistance ke upar tab trap hote hain jab index unke bechhe hue strike ko todke upar chala jata hai, rukta nahi. Jo premium becha tha woh bada loss ban jata hai aur exit costly hota hai.`,
      how: `Writers choose a strike because it looks like resistance, often from OI. If price breaks above it, short calls turn from out-of-the-money to near or in-the-money, delta rises, time decay stops helping and margin grows. Writers must buy back or hedge into a rising market. Writers with spreads have a capped loss; naked writers do not. A trap does not require a huge move; a modest break with rising IV can cause big mark-to-market losses.`,
      eg: {
        title: 'Break above 24,300 (illustrative)',
        text: `A writer sold the 7-day 24,300 CE at ₹81.99. Nifty rallies to 24,500 and the call becomes ₹325.68. The loss is 243.69 per unit, ₹15,839.85 per lot of 65, which is about 3 times the premium collected (₹5,329.35). An exit at ₹163.98 (twice the premium) would have limited the loss to ₹5,329.35.`,
      },
      tip: `A strike that looks like resistance is a choice, not a guarantee. Decide your exit premium before entry.`,
      visual: {
        kind: 'candles',
        title: 'Break above a call-OI strike',
        caption: 'Call writers above price are caught when price breaks through.',
        pattern: 'breakout',
        level: { price: 24300, label: '24,300 CE strike' },
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24300, premium: 81.99, expiryPrice: 24500, lotSize: 65, lots: 1 },
        why: 'The expiry loss if Nifty settles at 24,500; mark-to-market before expiry was ₹243.69 per unit at 7 days.',
      },
    },
    {
      t: 2,
      def: `Put writers are trapped below support when the index falls through the strike they sold. The put premium rises as the market falls, and the loss can grow fast in a sell-off.`,
      hi: `Put writers support ke neeche tab trap hote hain jab index unke bechhe hue strike ko todke neeche chala jata hai. Market girne par put premium badhta hai aur sell-off mein loss tezi se grow karta hai.`,
      how: `Falls tend to bring a rise in implied volatility at the same time, so put premiums rise because of both the move and the volatility. This double effect is why a fall can hurt put writers more than an equal rise hurts call writers. Margin rises with volatility, and some writers are forced to exit. Hedged writers lose a capped amount. A trap does not mean the market will keep falling; it only means that those short the put are under pressure now.`,
      eg: {
        title: 'Fall through 23,700 (illustrative)',
        text: `A writer sold the 7-day 23,700 PE at ₹64.57. Nifty falls to 23,500 with the same days left and the put is ₹280.19, a loss of 215.62 per unit, or ₹14,015.30 per lot of 65. That is about 3.3 times the premium of ₹4,197.05, even though the market fell only 2.1% (500 / 24,000 = 2.08%).`,
      },
      tip: `Put losses build faster than most writers expect because volatility rises when markets fall.`,
      visual: {
        kind: 'candles',
        title: 'Break below a put-OI strike',
        caption: 'Put writers below price are caught when price breaks through.',
        pattern: 'breakdown',
        level: { price: 23700, label: '23,700 PE strike' },
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 23700, premium: 64.57, expiryPrice: 23500, lotSize: 65, lots: 1 },
        why: 'The expiry loss if Nifty settles at 23,500.',
      },
    },
    {
      t: 3,
      def: `A failed breakout is when price moves above a key level, then falls back below it. It traps those who bought the breakout and also writers who covered or hedged at the top.`,
      hi: `Failed breakout matlab price kisi key level ke upar jaata hai aur phir wapas neeche aa jata hai. Isse breakout buy karne wale phas jaate hain, aur woh writers bhi jo top par cover ya hedge kar chuke the.`,
      how: `A call writer who panics as price spikes above the strike may buy back near the high. If price then reverses, the writer has locked in a loss that would have turned into a profit. This is the "sold the bottom, bought the top" problem. Failed breakouts are common near crowded strikes and near expiry, because the move is driven by forced orders, not by new information. Distinguishing a real breakout from a failed one is hard in real time.`,
      eg: {
        title: 'Cover at the high, then reversal (illustrative)',
        text: `A writer sold the 24,300 CE at ₹81.99. With 3 days left Nifty spikes to 24,330; the call is ₹145.77 and the writer covers, locking a loss of 63.78 per unit (₹4,145.70 per lot of 65). Nifty then drops back to 24,150, where the call is worth ₹66.10. Holding would have earned 15.89 per unit (₹1,032.85). The cover cost the writer ₹5,178.55 per lot compared with holding (79.67 × 65), but holding also carried a risk of the other outcome.`,
      },
      tip: `A cover at the extreme can lock a loss that was temporary. A hedge decided in advance is less emotional than a panic buy.`,
      visual: {
        kind: 'candles',
        title: 'False breakout',
        caption: 'Price crosses the level and fails to hold.',
        pattern: 'falseBreakout',
        level: { price: 24300, label: 'Level' },
      },
      calc: {
        id: 'return-calc',
        preset: { start: 81.99, end: 145.77, years: 1 },
        why: 'The premium rose 77.8% during the spike; use years = 1 to read the plain percentage.',
      },
    },
    {
      t: 4,
      def: `A failed breakdown is when price moves below a key level and then rises back above it. It can trap put writers who exited or hedged at the low, and sellers who sold the break.`,
      hi: `Failed breakdown matlab price kisi key level ke neeche jaata hai aur phir wapas upar aa jata hai. Isse woh put writers phas sakte hain jinhone low par exit ya hedge kiya, aur woh sellers bhi jinhone break par becha.`,
      how: `When price dips under a heavy put-OI strike, put writers feel the loss and may buy back or sell futures to hedge. If the dip is a short-lived sweep of stop-losses and price recovers, these writers have paid a high price for a protection they did not need. Meanwhile writers who held may earn. Stop-hunting is a popular word for this, but it is hard to prove; what can be shown is that stops and hedges cluster near obvious levels and make quick reversals possible.`,
      eg: {
        title: 'Cover at the low, then rebound (illustrative)',
        text: `A writer sold the 23,700 PE at ₹64.57. With 3 days left Nifty dips to 23,680 and the put is ₹123.63; the writer covers and locks in a loss of 59.06 per unit (₹3,838.90 per lot of 65). Nifty then recovers to 23,900, where the put is ₹42.84. Holding would have earned 21.73 per unit (₹1,412.45), a difference of 80.79 per unit, or ₹5,251.35 per lot, but a continued fall would have made holding costlier.`,
      },
      tip: `A level that breaks for a few minutes is not yet a breakdown. A pre-set rule on closing prices or on size can be better than reacting to every tick.`,
      visual: {
        kind: 'candles',
        title: 'False breakdown',
        caption: 'Price dips below the level and recovers.',
        pattern: 'falseBreakout',
        level: { price: 23700, label: 'Level' },
      },
      calc: {
        id: 'return-calc',
        preset: { start: 64.57, end: 123.63, years: 1 },
        why: 'The put premium rose 91.5% in the dip; read it as a plain percentage change.',
      },
    },
    {
      t: 5,
      def: `A short squeeze in options is a sharp jump in the premium of a heavily sold option, driven by writers forced to buy back and by the rise in delta. The index move that causes it may be modest.`,
      hi: `Options mein short squeeze matlab zyada becha gaya option premium achanak tezi se badh jata hai, kyunki writers ko buy back karna padta hai aur delta badhta hai. Isse jo index move hota hai woh modest bhi ho sakta hai.`,
      how: `A crowded strike with many naked writers, a quick gap and low liquidity can create a squeeze. Stops are triggered in sequence, each fill pushes the price up, and the next stop is hit. Hedging desks may buy futures, which adds to the index move. The squeeze normally ends when the forced sellers are gone, after which prices can fall back. A squeeze is a danger to those who are short, and a trap to those who chase it late.`,
      eg: {
        title: 'Gap with 3 days left (illustrative)',
        text: `The 24,300 CE sold at ₹81.99 has fallen to ₹28.76 with 3 days left at Nifty 24,000. A 350-point gap (1.46%) takes Nifty to 24,350 and the call to ₹157.18. Compared with ₹28.76 the premium is 5.5 times higher (157.18 / 28.76). The loss from the sale price is 75.19 per unit, ₹4,887.35 per lot of 65, and the open profit of ₹53.23 per unit disappeared in one move.`,
      },
      tip: `A squeeze is quick, and the exit price you assume is rarely the one you get.`,
      visual: {
        kind: 'bars',
        title: '24,300 CE with 3 days left (₹)',
        caption: 'Illustrative, IV 14%.',
        unit: ' ₹',
        items: [
          { label: 'Nifty 24,000', value: 28.76, tone: 'gold' },
          { label: 'Nifty 24,150', value: 66.1, tone: 'gold' },
          { label: 'Nifty 24,330', value: 145.77, tone: 'gold' },
          { label: 'Nifty 24,350', value: 157.18, tone: 'gold' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24350, strike: 24300, days: 3, iv: 14, rate: 6.5 },
        why: 'See the price and the high delta and gamma after the gap.',
      },
    },
    {
      t: 6,
      def: `Sudden hedging demand is a rush by large holders to buy protection, such as index puts, after bad news or a rise in fear. It lifts put prices and puts pressure on those who sold them.`,
      hi: `Sudden hedging demand matlab bade holders achanak protection khareedne lagte hain, jaise index puts, kisi buri khabar ya dar badhne ke baad. Isse put prices badhte hain aur jinhone puts becha tha unpar pressure aata hai.`,
      how: `Institutions that hold large equity portfolios hedge using index options and futures; when risk rises they buy puts in size. The demand pushes put IV up, so a put writer sees losses even if the index has not moved. Market makers who sell those puts hedge by selling futures, which can push the index lower. The size of this effect is not published; it is an inference from price and IV moves. Hedging demand can be seasonal, event-linked or random.`,
      eg: {
        title: 'IV jump with spot unchanged (illustrative)',
        text: `The 23,700 PE sold at ₹64.57 (IV 14%, 7 days left) rises to ₹130.74 if IV goes to 20% with Nifty still at 24,000. The writer's mark-to-market loss is 66.17 per unit, ₹4,301.05 per lot of 65, with zero move in the index. If the writer is near a margin limit, a rising IV can trigger a margin call by itself.`,
      },
      tip: `Watch India VIX and put IV, not only the index level. Losses can come from volatility alone.`,
      visual: {
        kind: 'gauge',
        title: 'India VIX rising from calm to stressed (illustrative)',
        caption: 'Zones are a teaching scale, not an official band.',
        min: 8,
        max: 35,
        value: 20,
        zones: [
          { from: 8, to: 13, label: 'Calm', tone: 'ice' },
          { from: 13, to: 20, label: 'Normal', tone: 'neutral' },
          { from: 20, to: 35, label: 'Stressed', tone: 'gold' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'PE', spot: 24000, strike: 23700, days: 7, iv: 20, rate: 6.5 },
        why: 'The put at IV 20% is about ₹130.74; set IV to 14 to see the original ₹64.57.',
      },
    },
    {
      t: 7,
      def: `Volatility expansion is a rise in implied volatility (and often in real volatility). Option premiums rise for both calls and puts, which hurts every short option position, particularly near-the-money and long-dated ones.`,
      hi: `Volatility expansion matlab implied volatility (aur aksar real volatility bhi) badhna. Calls aur puts dono ke premium badhte hain, jisse har short option position ko nuksan hota hai, khaaskar near-the-money aur long-dated ones ko.`,
      how: `Vega is the rise in option price for a 1-point rise in IV. Short options have negative vega, so a rise in IV is a mark-to-market loss even if the index stays put. Events like the Union Budget, RBI policy, election results, global shocks and big earnings can expand volatility. After the event IV often falls, which helps writers who sold before it. Those who sold earlier and waited the event out are exposed to the jump. Margin also rises with volatility.`,
      eg: {
        title: 'IV from 14% to 20% on a short call (illustrative)',
        text: `A writer sold the 24,300 CE at ₹81.99 (IV 14%, 7 days). IV rises to 20% and spot is unchanged; the call is ₹153.22. The mark-to-market loss is 71.23 per unit, ₹4,629.95 per lot of 65. The expected one-sigma weekly move also widens from about 465 points to about 665 points, so the strike is now 0.45 standard deviations away instead of 0.64.`,
      },
      tip: `Selling premium is selling volatility. If you cannot bear a volatility rise, you cannot bear the position.`,
      visual: {
        kind: 'curve',
        title: 'Vega: option price rises with IV',
        caption: 'Short options lose when IV rises.',
        curve: 'vega',
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 20, days: 7 },
        why: 'The expected weekly move at VIX 20 is about 665 points.',
      },
    },
    {
      t: 8,
      def: `A liquidity shortage means few buyers and sellers are quoting, so the bid-ask spread is wide and large orders move the price. Writers are hurt because their exit is a buy order in a thin book.`,
      hi: `Liquidity shortage matlab bahut kam buyers aur sellers quote kar rahe hain, isliye bid-ask spread wide hota hai aur bade orders price ko hila dete hain. Writers ko nuksan hota hai kyunki unka exit thin book mein buy order hota hai.`,
      how: `NIFTY and BANKNIFTY options at nearby strikes are liquid on most days, but far strikes, other series and stock options can have wide spreads. In a fast move, market makers widen their quotes or step back. A stop-loss order, if it is a market order, takes the best available asks one after another; if it is a stop-limit, it may not fill at all. Writers can reduce this risk by trading liquid strikes, using limit orders carefully, keeping size small and hedging in advance.`,
      eg: {
        title: 'Walking a thin book (illustrative)',
        text: `A stop on 100 lots (6,500 units) triggers at ₹105. The asks are 1,300 at 105, 1,950 at 108, 1,950 at 112 and 1,300 at 118. The average fill is ₹718,900 / 6,500 = ₹110.60, so the slippage is 5.60 per unit, or ₹36,400 on 6,500 units, before charges.`,
      },
      tip: `Size your position for the exit, not for the entry. The exit is the order that matters when it hurts.`,
      visual: {
        kind: 'orderBook',
        title: 'A thin ask side (illustrative)',
        caption: 'A large buy order walks up the asks.',
        bids: [
          [103, 650],
          [102, 400],
          [100, 500],
        ],
        asks: [
          [105, 1300],
          [108, 1950],
          [112, 1950],
          [118, 1300],
        ],
      },
      calc: {
        id: 'order-book-impact',
        preset: { side: 'buy', qty: 6500, refPrice: 105, book: '105:1300;108:1950;112:1950;118:1300' },
        why: 'Average fill and impact cost of the 100-lot stop-loss order.',
      },
    },
    {
      t: 9,
      def: `Position adjustment is what a trapped writer does to change the risk: hedge with a bought option, roll the strike, reduce lots or exit. Each choice has a cost.`,
      hi: `Position adjustment matlab trapped writer risk badalne ke liye jo karta hai: bought option se hedge, strike roll, lots kam ya exit. Har choice ka cost hota hai.`,
      how: `Hedging with a farther option caps the loss at the width less the credit but costs a premium. Rolling gives room but may lock in a loss and increase total exposure. Reducing lots lowers the risk while keeping part of the trade. Exiting stops the loss but ends any chance of recovery. Adjustments should be planned before the trade; adjusting in a panic often adds cost and size. Remember that charges, STT and slippage are paid again for each leg.`,
      eg: {
        title: 'Hedging a trapped call (illustrative)',
        text: `A writer sold the 24,300 CE at ₹81.99. With 3 days left and Nifty at 24,250 the call is ₹105.26 and the writer buys the 24,500 CE at ₹39.46 (cost ₹2,564.90 per lot of 65). The net credit is ₹42.53, the maximum loss is 200 − 42.53 = ₹157.47 per unit, ₹10,235.55 per lot, and the breakeven is 24,342.53. The unlimited tail is gone, but the loss so far is not undone.`,
      },
      tip: `Adjusting does not fix a bad trade; it changes the risk of the next move. Check the worst case after the adjustment.`,
      visual: {
        kind: 'payoff',
        title: 'After hedging: short 24,300 CE, long 24,500 CE',
        caption: 'The loss is capped after the adjustment.',
        spot: 24250,
        legs: [
          { type: 'CE', side: -1, strike: 24300, premium: 81.99 },
          { type: 'CE', side: 1, strike: 24500, premium: 39.46 },
        ],
      },
      calc: {
        id: 'breakeven',
        preset: { optType: 'CE', side: 'sell', strike: 24300, premium: 42.53 },
        why: 'Use the net credit as the premium to find the post-hedge breakeven.',
      },
    },
    {
      t: 10,
      def: `Possible trapped positions can be flagged by a mix of signals: price crossing a high-OI strike, a fast jump in the option premium, falling OI with rising premium, a rise in IV and wide spreads. They are warnings, not proof.`,
      hi: `Possible trapped positions kuch signals ke mix se pehchani ja sakti hain: price ka high-OI strike cross karna, option premium ka tez jump, premium badhte hue OI girna, IV badhna aur wide spreads. Yeh warnings hain, proof nahi.`,
      how: `Check five things together: where spot is relative to the largest OI strikes, the change in the premium of those strikes, the change in OI, India VIX and IV, and bid-ask spreads. If spot is crossing a big strike with rising premium, falling OI and rising IV, writers there are likely under pressure. But OI does not show who is naked, so some may be fully hedged. The market can also reverse. A possible trap is a reason to be careful, not a reason to take a large trade in the opposite direction.`,
      eg: {
        title: 'Reading the signals (illustrative)',
        text: `With 3 days left, Nifty moves from 24,000 to 24,250 and crosses near the 24,300 CE, the biggest call OI strike (130 lakh). Its premium rises from ₹81.99 (at 7 days) to ₹105.26, up 28.4% (23.27 / 81.99). OI at the strike rises 40 lakh (30.8%) over the same period while VIX moves up. Rising OI with a rising premium may be fresh writing or fresh buying; the signals are mixed, which is itself the lesson.`,
      },
      tip: `One signal means little. Look for several at once and still keep your own risk small.`,
      visual: {
        kind: 'layers',
        title: 'Signals that writers may be under pressure',
        caption: 'Each layer adds some evidence; none is proof.',
        layers: [
          { label: 'Price crosses a high-OI strike', note: 'Crowded level breaks', tone: 'gold' },
          { label: 'Premium rises sharply', note: 'Mark-to-market loss', tone: 'gold' },
          { label: 'OI falls as premium rises', note: 'Possible covering', tone: 'ice' },
          { label: 'IV and VIX rise', note: 'Vega loss and margin', tone: 'ice' },
          { label: 'Spreads widen', note: 'Exits cost more', tone: 'neutral' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 81.99, end: 105.26, years: 1 },
        why: 'The premium change in percent: ₹81.99 to ₹105.26.',
      },
    },
  ],
}

export default m
