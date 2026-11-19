import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '3.3',
  intro:
    `Every options strategy, however complicated, is built from four basic positions: buy a call, sell a call, buy a put, sell a put. This module takes each one apart: what you pay or receive, where you break even, how much you can make and how much you can lose. All examples use NIFTY near 24,000 and the supplied course's illustrative lot of 75; the current NIFTY lot is 65, so scale the rupee figures accordingly and always check the live NSE contract specification.`,
  introHi:
    `Har options strategy, chahe kitni bhi complicated ho, chaar basic positions se bani hoti hai: call buy, call sell, put buy, put sell. Is module mein hum har position ko alag se kholenge: kitna paisa dena ya lena hai, breakeven kahan hai, maximum profit aur maximum loss kitna ho sakta hai. Saare examples NIFTY ~24,000 aur course ke illustrative lot 75 par hain; abhi NIFTY ka current lot 65 hai, toh rupee figures usi hisaab se scale karein aur live NSE contract specification zaroor check karein.`,
  steps: {
    concept:
      `A call (CE) is the right to buy at the strike; a put (PE) is the right to sell at the strike. The buyer of either pays a premium and holds the right. The seller of either collects that premium and carries the obligation if the buyer exercises. That gives four positions: Long Call, Short Call, Long Put, Short Put. Two of them have a capped loss (the buyers) and two have a capped profit (the sellers).`,
    conceptHi:
      `Call (CE) ka matlab strike par buy karne ka right, put (PE) ka matlab strike par sell karne ka right. Dono ka buyer premium deta hai aur right rakhta hai. Dono ka seller premium leta hai aur agar buyer exercise kare toh obligation nibhata hai. Isse chaar positions bante hain: Long Call, Short Call, Long Put, Short Put. Buyers ka loss capped hota hai, sellers ka profit capped hota hai.`,
    mechanism:
      `At expiry the exchange computes each option's intrinsic value from the final settlement price: max(S − K, 0) for a call and max(K − S, 0) for a put. The buyer's net result is that intrinsic value minus the premium paid; the seller's net result is the premium received minus the same intrinsic value. Because NSCCL, the clearing corporation, stands behind every trade, sellers must keep margin with the broker, and that margin can rise when volatility rises. Before expiry the premium also moves with time and implied volatility, so the expiry formulas are a map of the destination, not of every step on the road.`,
    example: {
      title: 'The same ₹100 premium on four positions (illustrative)',
      text: `NIFTY 24,000, lot 75 (illustrative; the current lot is 65). Premium for the 24,100 CE and the 23,900 PE is ₹100 each, so 100 × 75 = ₹7,500 changes hands on each. At expiry 24,400: Long Call (300 − 100) × 75 = +₹15,000; Short Call = −₹15,000. At expiry 23,500: Long Put (400 − 100) × 75 = +₹22,500; Short Put = −₹22,500. Breakevens are 24,200 (call) and 23,800 (put). Each pair is a mirror image: what the buyer makes, the seller loses, and the reverse.`,
    },
    chart: {
      kind: 'matrix',
      title: 'The four positions at a glance',
      caption: 'Rows: who pays the premium. Columns: call or put. Outlooks are general tendencies, not predictions.',
      xLabels: ['Call (CE)', 'Put (PE)'],
      yLabels: ['Buyer (pays premium)', 'Seller (receives premium)'],
      cells: [
        { head: 'Long Call', note: 'Wants a rise. Loss capped at premium.', tone: 'bull' },
        { head: 'Long Put', note: 'Wants a fall. Loss capped at premium.', tone: 'bear' },
        { head: 'Short Call', note: 'Wants price to stay below breakeven. Loss open-ended.', tone: 'gold' },
        { head: 'Short Put', note: 'Wants price to stay above breakeven. Loss can be very large.', tone: 'ice' },
      ],
    },
    optionChain:
      `On the chain, the call side (CE) sits on one half and the put side (PE) on the other, with the strike in the middle. Clicking Buy on a CE row creates a Long Call; clicking Sell creates a Short Call; the same applies on the PE side. The LTP is the premium per unit, so multiply by the lot size for the rupee amount. OI on a row counts open contracts, but it does not tell you whether the people holding them are buyers or sellers of that strike.`,
    psychology:
      `Buyers feel the pull of a small, fixed cost against a large imagined gain, and often ignore how likely a total loss is. Sellers feel the comfort of premium arriving upfront and a high frequency of small wins, and often ignore the rare large loss. Neither side is automatically right: sellers do not always win, and buyers do not always lose. What matters is whether the size and probability of outcomes match the capital and risk you can bear.`,
    scenarios: {
      bullish:
        `NIFTY rising sharply favours Long Call and Short Put, and hurts Short Call and Long Put. With the 24,100 CE bought at ₹100, an expiry at 24,500 gives (400 − 100) × 75 = +₹22,500, while a Short Call at the same strike loses ₹22,500.`,
      bearish:
        `NIFTY falling sharply favours Long Put and Short Call, and hurts Long Call and Short Put. With the 23,900 PE bought at ₹100, an expiry at 23,000 gives (900 − 100) × 75 = +₹60,000, while the Short Put loses ₹60,000.`,
      sideways:
        `If NIFTY expires between the two strikes (say 24,000), both options expire worthless: buyers lose ₹7,500 each and sellers keep ₹7,500 each, before charges. Even before expiry, time decay generally works for sellers and against buyers in a flat market.`,
    },
    practice: [
      {
        q: `You buy a 24,100 CE at ₹100, lot 75. NIFTY expires at 24,260. What is your net P&L?`,
        a: `Intrinsic = 24,260 − 24,100 = 160. Net per unit = 160 − 100 = 60. Total = 60 × 75 = +₹4,500 before charges. Breakeven is 24,200, so 60 points above it gives 60 × 75.`,
      },
      {
        q: `You sell a 23,900 PE at ₹100, lot 75. NIFTY expires at 23,650. What is your P&L?`,
        a: `Intrinsic = 23,900 − 23,650 = 250. Seller P&L per unit = 100 − 250 = −150. Total = −150 × 75 = −₹11,250 before charges. Breakeven is 23,800; 150 points below it gives 150 × 75.`,
      },
      {
        q: `You sell a 24,100 CE at ₹100, lot 75. What do you make if NIFTY expires at 24,000, and what do you lose at 24,500?`,
        a: `At 24,000 the call is worthless, so you keep 100 × 75 = ₹7,500. At 24,500 intrinsic = 400, so P&L per unit = 100 − 400 = −300 and total = −300 × 75 = −₹22,500. Your maximum profit stayed at ₹7,500 but the loss keeps growing with every point above 24,200.`,
      },
      {
        q: `Bull call spread: buy 24,000 CE at ₹200 and sell 24,300 CE at ₹80, lot 75. Find net cost, maximum loss, maximum profit and breakeven.`,
        a: `Net premium = 200 − 80 = ₹120 per unit, so cost = 120 × 75 = ₹9,000 = maximum loss. Maximum profit = (300 − 120) × 75 = 180 × 75 = ₹13,500, reached at 24,300 or above. Breakeven = 24,000 + 120 = 24,120. The short call turns an open-ended gain into a capped one in exchange for a lower cost.`,
      },
    ],
    assignment:
      `On today's NIFTY chain, pick one CE and one PE about 100 points out of the money. For each, write the four positions (buy and sell) in a table: premium per unit, premium for one lot at the current lot size, breakeven, maximum profit, maximum loss. Then compute the P&L of all four at three expiry levels of your choice, and check that every buyer's gain equals the seller's loss.`,
  },
  topics: [
    {
      t: 1,
      def: `A Call Option (CE) is a contract that gives its buyer the right, but not the obligation, to buy the underlying at a fixed strike price under the contract's exercise and settlement rules. A call buyer generally expects the underlying to rise. The price paid for this right is the premium.`,
      hi: `Call Option (CE) buyer ko ek fixed strike price par underlying kharidne ka right deta hai, obligation nahi. Jab aapko lagta hai market upar jayega, tab aap CE buy karte ho. Is right ke liye jo paisa dete ho woh premium kehlata hai.`,
      how: `You pick a strike, pay the premium, and the position is live. On NSE index options are European, so the call is exercised only at expiry, and the final value is based on the settlement price. At expiry the call is worth max(S − K, 0). Your net profit is that value minus the premium, which gives a breakeven of strike + premium. Between the strike and the breakeven the option finishes in the money yet you still lose part of the premium. Before expiry the premium also carries time value and implied volatility, so the expiry breakeven is not where you are flat today.`,
      eg: {
        title: 'NIFTY 24,100 CE bought at ₹100 (illustrative)',
        text: `Spot 24,000, lot 75 (illustrative; current lot 65). Premium paid = 100 × 75 = ₹7,500. Breakeven = 24,100 + 100 = 24,200. If NIFTY expires at 24,400, intrinsic = 300, net = (300 − 100) × 75 = +₹15,000. If it expires at 24,000 or anywhere at or below 24,100, the loss is the full ₹7,500. At the current lot of 65 the premium is ₹6,500 and the 24,400 profit is ₹13,000.`,
      },
      tip: `Finishing in the money is not the same as making money. The call buyer needs the index above strike plus premium, not just above the strike.`,
      visual: {
        kind: 'payoff',
        title: 'Long Call: capped loss, open profit',
        caption: 'Buy 24,100 CE at ₹100. Flat loss up to 24,100, breakeven 24,200. Illustrative.',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24100, premium: 100 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 100, expiryPrice: 24400, lotSize: 75, lots: 1 },
        why: 'Change the expiry level and watch the buyer cross breakeven at 24,200.',
      },
    },
    {
      t: 2,
      def: `A Put Option (PE) gives its buyer the right, but not the obligation, to sell the underlying at a fixed strike price. A put buyer generally expects the underlying to fall. Like a call, it costs a premium, and the buyer's loss is limited to that premium.`,
      hi: `Put Option (PE) buyer ko ek fixed strike par underlying sell karne ka right deta hai. Jab aapko lagta hai market neeche girega, tab aap PE buy karte ho. Call ki tarah isme bhi premium dena padta hai aur buyer ka loss usi premium tak limited rehta hai.`,
      how: `You buy a put at a strike, say 23,900, and pay the premium. At expiry it is worth max(K − S, 0). Profit begins once the index is below strike minus premium, which is the breakeven. As the index falls, the put gains roughly point for point below the strike, but the index cannot go below zero, so the gain is large but finite. Index puts are cash-settled by NSE, so you receive money, not shares. A put is also the standard hedge for a portfolio, which is why demand for puts can rise before events.`,
      eg: {
        title: 'NIFTY 23,900 PE bought at ₹100 (illustrative)',
        text: `Spot 24,000, lot 75 (illustrative). Premium paid = 100 × 75 = ₹7,500. Breakeven = 23,900 − 100 = 23,800. If NIFTY expires at 23,500, intrinsic = 400, net = (400 − 100) × 75 = +₹22,500. If NIFTY expires at 24,000 the put is worthless and the loss is ₹7,500. With the current lot of 65 these become ₹6,500 and +₹19,500.`,
      },
      tip: `A put does not need the market to crash. It needs a fall large enough to cover the premium; a small dip leaves you at a loss.`,
      visual: {
        kind: 'payoff',
        title: 'Long Put: capped loss, profit as price falls',
        caption: 'Buy 23,900 PE at ₹100. Breakeven 23,800. Illustrative.',
        spot: 24000,
        legs: [{ type: 'PE', side: 1, strike: 23900, premium: 100 }],
      },
    },
    {
      t: 3,
      def: `Calls and puts exist because market participants want different things: upside exposure, downside exposure, protection for shares they already own, income from selling premium, and the ability to combine legs into defined-risk strategies. Futures give you a straight line of profit and loss in both directions; options let you reshape that line.`,
      hi: `CE aur PE isliye hain kyunki sabki zaroorat alag hoti hai: kisi ko upar ka exposure chahiye, kisi ko neeche ka, kisi ko apne shares ko protect karna hai, kisi ko premium se income chahiye. Futures mein profit-loss ek seedhi line hota hai; options se aap is line ka shape badal sakte ho.`,
      how: `A speculator uses a call or put to take a view with a known maximum loss. An investor holding a portfolio can buy index puts to put a floor under losses without selling the shares: this is a protective put. A seller of calls or puts collects premium and accepts an obligation, which carries real risk. Combining legs creates spreads, straddles and condors. Institutions, proprietary desks, hedgers and retail traders are all in the same order book, matched by NSE and guaranteed by NSCCL. Each use has a cost: protection costs premium, and income strategies cost tail risk.`,
      eg: {
        title: 'Protecting an ₹18 lakh portfolio with one put (illustrative)',
        text: `Assume a portfolio worth ₹18,00,000 that moves exactly like NIFTY (a simplification). You buy one lot (75, illustrative) of the 23,700 PE at ₹90, costing 90 × 75 = ₹6,750. If NIFTY falls 10% from 24,000 to 21,600, the portfolio loses ₹1,80,000. The put's intrinsic value is 23,700 − 21,600 = 2,100, so its net gain = (2,100 − 90) × 75 = ₹1,50,750. Net loss = 1,80,000 − 1,50,750 = ₹29,250. Below 23,700 the loss stays near (300 + 90) × 75 = ₹29,250, before charges. If NIFTY rises instead, you lose only the ₹6,750 premium while the portfolio gains.`,
      },
      tip: `Protection is not free. Every hedge has a premium, and in a quiet market that premium simply expires worthless.`,
      visual: {
        kind: 'bars',
        title: 'Loss if NIFTY falls 10% (₹, illustrative)',
        caption: 'Unhedged portfolio versus the same portfolio with one 23,700 PE. Assumes the portfolio tracks NIFTY exactly.',
        unit: '₹',
        items: [
          { label: 'Unhedged loss', value: 180000, tone: 'bear' },
          { label: 'With put (net)', value: 29250, tone: 'ice' },
          { label: 'Put premium paid', value: 6750, tone: 'gold' },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'buy', strike: 23700, premium: 90, expiryPrice: 21600, lotSize: 75, lots: 1 },
        why: 'Shows the put leg of the hedge: +₹1,50,750 at 21,600.',
      },
    },
    {
      t: 4,
      def: `The call buyer, also called Long Call, buys a CE and pays the premium. The call buyer generally expects the underlying to rise. The maximum loss is the premium; the maximum profit is theoretically unlimited because a price has no upper limit.`,
      hi: `Call buyer ko Long Call bhi kehte hain. Jab aapko lagta hai market upar jayega aur aap CE buy karte ho, toh aap Long Call position create karte ho. Maximum loss premium tak limited hai, profit theoretically unlimited ho sakta hai.`,
      how: `The long call's expiry result is [max(S − K, 0) − C] × Q, where C is the premium and Q the total quantity. Below the strike you lose the whole premium; between the strike and breakeven you lose part of it; above breakeven you gain one rupee for every extra index point per unit. Time decay generally works against you and a rise in implied volatility generally helps you. The position needs the market to move up enough and soon enough, because time is spent every day.`,
      eg: {
        title: 'Long Call P&L table (illustrative)',
        text: `Buy 24,100 CE at ₹100, lot 75. Expiry 24,000 to 24,100: −₹7,500. At 24,150: (50 − 100) × 75 = −₹3,750. At 24,200: ₹0 (breakeven). At 24,300: (200 − 100) × 75 = +₹7,500. At 24,400: +₹15,000. At 24,500: (400 − 100) × 75 = +₹22,500. Each 100 points above breakeven adds ₹7,500 with lot 75, or ₹6,500 with the current lot of 65.`,
      },
      tip: `The buyer's loss is capped, but capped at 100% of the premium. A series of full-premium losses can drain an account even if each looks small.`,
      visual: {
        kind: 'payoff',
        title: 'Long Call payoff at expiry',
        caption: 'P&L per unit = max(S − 24,100, 0) − 100. Illustrative.',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24100, premium: 100 }],
      },
    },
    {
      t: 5,
      def: `The call seller, also called Short Call or call writer, sells a CE and receives the premium. The seller generally expects the underlying to stay below the strike plus premium. The maximum profit is the premium received; the loss is theoretically unlimited if the position is uncovered (naked).`,
      hi: `Call seller ko Short Call ya call writer kehte hain. Woh CE sell karke premium leta hai. Seller ko aam taur par lagta hai ki market strike plus premium se neeche rahega. Maximum profit sirf premium hai, lekin naked position mein loss theoretically unlimited hota hai.`,
      how: `The short call's expiry result is [C − max(S − K, 0)] × Q. The breakeven is the same as the buyer's, strike plus premium, because the two sides are mirror images. The seller must keep margin with the broker (SPAN plus exposure margin, set by the exchange and clearing corporation), and that margin can increase when volatility rises or the position moves against you. A short call does not have to be bearish: it only needs the index to stay below its breakeven. The risk is real: the premium is small, while the loss grows with every point above the breakeven.`,
      eg: {
        title: 'A ₹7,500 premium against a ₹1,35,000 loss (illustrative)',
        text: `Sell 24,100 CE at ₹100, lot 75. Premium received = ₹7,500 (the maximum profit). If NIFTY ends at 24,000, you keep ₹7,500. If it ends at 26,000, intrinsic = 1,900, loss per unit = 1,900 − 100 = 1,800, total loss = 1,800 × 75 = ₹1,35,000, which is 18 times the premium. With the current lot of 65 the same move costs ₹1,17,000. Margin requirements may also rise before you reach such levels.`,
      },
      tip: `A short call earns a small fixed amount and risks an open-ended loss. Without a hedge or a stop plan, one sharp rally can erase many months of premium.`,
      visual: {
        kind: 'payoff',
        title: 'Short Call: capped profit, open loss',
        caption: 'Sell 24,100 CE at ₹100. Breakeven 24,200. Illustrative.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24100, premium: 100 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24100, premium: 100, expiryPrice: 26000, lotSize: 75, lots: 1 },
        why: 'Move the expiry level to see the loss grow with no ceiling.',
      },
    },
    {
      t: 6,
      def: `The put buyer, also called Long Put, buys a PE and pays the premium. The put buyer generally expects the underlying to fall. The maximum loss is the premium; the maximum profit is large but finite, because the underlying cannot fall below zero.`,
      hi: `Put buyer ko Long Put kehte hain. Jab aapko lagta hai market neeche girne wala hai aur aap PE buy karte ho, toh Long Put banta hai. Maximum loss premium hai. Profit bada ho sakta hai, lekin finite hai kyunki price zero se neeche nahi ja sakta.`,
      how: `The long put's expiry result is [max(K − S, 0) − P] × Q. The breakeven is strike minus premium. Time decay generally works against the buyer, and a rise in implied volatility generally helps. In a fast fall, implied volatility often rises as well, which can help the put's value before expiry. The put's upside is bounded by the strike, in theory, because the underlying's lowest possible value is zero; for an index like NIFTY that is a mathematical limit, not a forecast.`,
      eg: {
        title: 'Long Put P&L table (illustrative)',
        text: `Buy 23,900 PE at ₹100, lot 75. Expiry 24,400 down to 23,900: −₹7,500. At 23,800: ₹0. At 23,700: (200 − 100) × 75 = +₹7,500. At 23,500: (400 − 100) × 75 = +₹22,500. At 23,000: (900 − 100) × 75 = +₹60,000. In theory, if the index went to zero, the profit would be (23,900 − 100) × 75 = ₹17,85,000, a figure that shows the formula's limit, not a realistic outcome.`,
      },
      tip: `Both Long Call and Long Put lose the entire premium if the index finishes on the wrong side of the strike. Direction alone is not enough; size and timing matter.`,
      visual: {
        kind: 'payoff',
        title: 'Long Put payoff at expiry',
        caption: 'P&L per unit = max(23,900 − S, 0) − 100. Illustrative.',
        spot: 24000,
        legs: [{ type: 'PE', side: 1, strike: 23900, premium: 100 }],
      },
    },
    {
      t: 7,
      def: `The put seller, also called Short Put, sells a PE and receives the premium. The seller generally expects the underlying to stay above the strike minus premium. The maximum profit is the premium; the loss is large but finite, because the underlying cannot fall below zero.`,
      hi: `Put seller ko Short Put kehte hain. Woh PE sell karke premium leta hai. Seller ko lagta hai market strike minus premium se upar rahega. Maximum profit premium hai. Loss bahut bada ho sakta hai, finite hai kyunki price zero se neeche nahi jata, lekin practically yeh bahut bhaari hota hai.`,
      how: `The short put's expiry result is [P − max(K − S, 0)] × Q, with breakeven at strike minus premium. The seller keeps the whole premium if the index finishes at or above the strike. Below the breakeven the loss grows point for point. NSCCL takes margin from the seller, and the broker can square off positions if margin falls short. A short put is not a guaranteed-income strategy: a sudden crash can produce very large losses in a short time, and gaps can jump over any stop level.`,
      eg: {
        title: 'A ₹7,500 premium and a ₹1,35,000 loss (illustrative)',
        text: `Sell 23,900 PE at ₹100, lot 75. Premium received = ₹7,500. If NIFTY expires at 23,700, intrinsic = 200, P&L = (100 − 200) × 75 = −₹7,500. At 23,000: (100 − 900) × 75 = −₹60,000. At 22,000: intrinsic = 1,900, loss per unit = 1,800, total = 1,800 × 75 = ₹1,35,000. With the current lot of 65 the loss at 22,000 is ₹1,17,000. Compare that with the maximum gain of ₹7,500 (₹6,500 at lot 65).`,
      },
      tip: `Put selling looks calm until the day it is not. Size every short put as if the worst day will come, because eventually it may.`,
      visual: {
        kind: 'payoff',
        title: 'Short Put: capped profit, large loss',
        caption: 'Sell 23,900 PE at ₹100. Breakeven 23,800. Illustrative.',
        spot: 24000,
        legs: [{ type: 'PE', side: -1, strike: 23900, premium: 100 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 23900, premium: 100, expiryPrice: 22000, lotSize: 75, lots: 1 },
        why: 'Drag the expiry level down to see how fast the loss outgrows the premium.',
      },
    },
    {
      t: 8,
      def: `Every basic option position is one of four: Long Call (buy CE), Short Call (sell CE), Long Put (buy PE), Short Put (sell PE). Two are buyers who pay premium and two are sellers who receive it. Their outlooks overlap but are not identical, because they also express views on how far and how fast the market will move.`,
      hi: `Har basic option position in chaar mein se ek hoti hai: Long Call (CE buy), Short Call (CE sell), Long Put (PE buy), Short Put (PE sell). Do positions buyer ki hain jo premium dete hain, do seller ki hain jo premium lete hain. Outlook milte-julte hain par bilkul same nahi, kyunki yeh is par bhi depend karte hain ki market kitna aur kitni jaldi hilega.`,
      how: `Remember it as: Long Call wants an upward move; Short Call wants the price to stay below the call's breakeven; Long Put wants a downward move; Short Put wants the price to stay above the put's breakeven. A seller does not have to be strongly bearish or bullish: a call seller may just expect a range, and a put seller may just expect stability. How risky a seller's position is also depends on whether it is naked or hedged by another leg. Every trade has one buyer and one seller of the same contract, matched by the exchange.`,
      eg: {
        title: 'Four expectations around NIFTY 24,000 (illustrative)',
        text: `A call buyer may expect a breakout above 24,200. A call seller may expect NIFTY to stay below 24,200. A put buyer may expect a breakdown below 23,800. A put seller may expect NIFTY to stay above 23,800. If NIFTY stays inside 23,800 to 24,200, the call seller and the put seller (if they hold separate positions) can both profit, and both buyers lose some or all of their premium. So the four positions are not just four ways to guess direction.`,
      },
      tip: `Ask two questions before any trade: which way do I expect it to go, and how far and how soon? A correct direction with the wrong size or timing still loses.`,
      visual: {
        kind: 'matrix',
        title: 'Buyer or seller, call or put',
        caption: 'Colours show direction only: green for a bullish stance, red for a bearish one.',
        xLabels: ['Call (CE)', 'Put (PE)'],
        yLabels: ['Buyer', 'Seller'],
        cells: [
          { head: 'Long Call', note: 'Buy CE, pay premium. Bullish.', tone: 'bull' },
          { head: 'Long Put', note: 'Buy PE, pay premium. Bearish.', tone: 'bear' },
          { head: 'Short Call', note: 'Sell CE, receive premium. Neutral to bearish.', tone: 'bear' },
          { head: 'Short Put', note: 'Sell PE, receive premium. Neutral to bullish.', tone: 'bull' },
        ],
      },
    },
    {
      t: 9,
      def: `Payoff is the value of the option position at expiry before the premium is counted. Profit and loss (P&L) is the final result after the premium paid or received and after costs. The two are different: a payoff of ₹300 on an option bought at ₹100 is a profit of ₹200.`,
      hi: `Payoff matlab expiry par option ki value, premium ginne se pehle. Profit and Loss (P&L) matlab premium aur charges ke baad ka final result. Dono alag hote hain: agar option ₹100 mein kharida aur expiry par payoff ₹300 hai, toh profit ₹200 hai.`,
      how: `The four formulas are: Long Call [max(S − K, 0) − C] × Q; Short Call [C − max(S − K, 0)] × Q; Long Put [max(K − S, 0) − P] × Q; Short Put [P − max(K − S, 0)] × Q. For the same strike and premium, the buyer's and seller's P&L add up to zero, before charges. All of these are expiry results. Before expiry the position can be sold at a market premium that includes time value, so its P&L can differ from the expiry formula.`,
      eg: {
        title: 'All four at two expiry levels (illustrative)',
        text: `Positions: 24,100 CE at ₹100 and 23,900 PE at ₹100, lot 75. At expiry 24,300: Long Call (200 − 100) × 75 = +₹7,500; Short Call −₹7,500; Long Put (0 − 100) × 75 = −₹7,500; Short Put +₹7,500. At expiry 23,700 the picture flips: Long Call −₹7,500; Short Call +₹7,500; Long Put (200 − 100) × 75 = +₹7,500; Short Put −₹7,500. In both cases buyer and seller of the same option sum to zero.`,
      },
      tip: `Always separate payoff from P&L. Quoting "the option was worth ₹300" without the ₹100 you paid hides your real result.`,
      visual: {
        kind: 'compare',
        title: 'Payoff versus profit and loss',
        caption: '24,100 CE bought at ₹100 and expiring at 24,400, lot 75 (illustrative).',
        left: { head: 'Payoff (value at expiry)', tone: 'ice', points: ['Intrinsic value = 24,400 − 24,100 = ₹300 per unit', 'Before premium and costs', 'Total = 300 × 75 = ₹22,500'] },
        right: { head: 'P&L (what you keep)', tone: 'gold', points: ['300 − premium 100 = ₹200 per unit', 'Before brokerage and taxes', 'Total = 200 × 75 = ₹15,000'] },
      },
    },
    {
      t: 10,
      def: `Maximum profit and maximum loss are the best and worst expiry results of a position, ignoring charges. Buyers have a capped loss (the premium); sellers have a capped profit (the premium). A long call has theoretically unlimited gain and a short call theoretically unlimited loss. Puts are bounded because the underlying cannot fall below zero.`,
      hi: `Maximum profit aur maximum loss kisi position ke expiry par best aur worst result hote hain, charges ko chhod kar. Buyer ka loss premium tak capped hai, seller ka profit premium tak capped hai. Long call ka profit theoretically unlimited aur short call ka loss theoretically unlimited hai. Put mein limit hai kyunki price zero se neeche nahi jata.`,
      how: `Compare the four on one set of numbers (strikes 24,100 CE and 23,900 PE, premium ₹100, lot 75). Long Call: loss ₹7,500, profit unlimited. Short Call: profit ₹7,500, loss unlimited. Long Put: loss ₹7,500, profit up to (23,900 − 100) × 75 = ₹17,85,000 in theory. Short Put: profit ₹7,500, loss up to the same ₹17,85,000 in theory. These are standalone, uncovered positions; a hedged strategy has different limits. Brokers and NSCCL margin rules exist because the seller's side can be so much larger than the premium received.`,
      eg: {
        title: 'Risk and reward side by side (illustrative)',
        text: `Per lot of 75 with a ₹100 premium: premium = ₹7,500 for all four. Long Call: max loss ₹7,500 and breakeven 24,200. Short Call: max profit ₹7,500 and breakeven 24,200. Long Put: max loss ₹7,500, breakeven 23,800, theoretical max profit ₹17,85,000. Short Put: max profit ₹7,500, breakeven 23,800, theoretical max loss ₹17,85,000. The zero-price case is a mathematical limit, not a forecast for NIFTY. With lot 65 the premium is ₹6,500 and the theoretical bound is 23,800 × 65 = ₹15,47,000.`,
      },
      tip: `Never judge a trade by its premium. Judge it by the worst loss you could take, and by whether you can survive taking it.`,
      visual: {
        kind: 'compare',
        title: 'Who has capped and who has open risk',
        caption: 'Standalone positions, 24,100 CE and 23,900 PE at ₹100, lot 75. Illustrative.',
        left: { head: 'Buyers (pay premium)', tone: 'ice', points: ['Max loss = premium, ₹7,500', 'Long Call: profit open-ended', 'Long Put: profit large but finite'] },
        right: { head: 'Sellers (receive premium)', tone: 'gold', points: ['Max profit = premium, ₹7,500', 'Short Call: loss open-ended', 'Short Put: loss large but finite'] },
      },
      calc: {
        id: 'breakeven',
        preset: { optType: 'PE', side: 'sell', strike: 23900, premium: 100 },
        why: 'Shows breakeven and the best and worst case for any of the four positions.',
      },
    },
  ],
  tools: [
    { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 100, expiryPrice: 24400, lotSize: 75, lots: 1 }, why: 'Flip buy/sell and CE/PE to check all four formulas.' },
    { id: 'breakeven', preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 100 }, why: 'Breakeven and limits for each position.' },
  ],
}
export default m
