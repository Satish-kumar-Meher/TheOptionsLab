import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '13.4',
  intro:
    `Option writers do not act on a single rule. Their choices to defend, add, shift, exit, book profit or hedge come from margin, fear of a large loss, the time left to expiry and the volatility around them. This module explains the usual reasons behind each behaviour so that changes on the option chain can be read as possible human decisions, not as certainties.`,
  introHi:
    `Option writers ek hi rule par nahi chalte. Defend karna, position add karna, shift karna, exit karna, profit book karna ya hedge karna, yeh sab margin, bade loss ke dar, expiry tak bacha time aur volatility se aate hain. Is module mein har behaviour ke usual reasons samjhenge, taaki option chain ke changes ko possible human decisions ki tarah padh sakein, certainty ki tarah nahi.`,
  steps: {
    concept:
      `Writer psychology is the study of why a person who has sold an option acts as the trade moves. A writer is paid up front and then waits, so the main emotions are the wish to keep the premium and the fear of an open-ended loss. Most behaviour (defending, rolling, hedging, exiting early) is a way of managing that fear within the margin the broker allows.`,
    conceptHi:
      `Writer psychology matlab yeh samajhna ki option bechne wala trade ke chalte waqt kaise react karta hai. Writer ko premium pehle mil jata hai aur phir woh wait karta hai, isliye do hi bade emotions hote hain: premium rakhne ki ichha aur open-ended loss ka dar. Zyadatar behaviour (defend, roll, hedge, early exit) is dar ko broker ke margin ke andar manage karne ka tareeka hai.`,
    mechanism:
      `After the sale, the writer's profit is the premium minus the cost of buying back, so every move in the premium is a mark-to-market gain or loss. The clearing corporation (NSCCL) recalculates SPAN and exposure margin daily and intraday, so a losing short position can demand more cash just when the writer is under stress. Time decay helps the writer, but gamma and implied volatility can hurt quickly. The writer therefore chooses from a short list: do nothing, buy back, add, roll to another strike or expiry, or buy a hedge. Each choice shows up on the option chain as a change in OI and premium, but the chain does not say who made it.`,
    example: {
      title: 'One writer, one week (illustrative)',
      text: `A writer sells the 7-day 24,300 CE at ₹81.99 with Nifty at 24,000, collecting ₹5,329.35 per lot of 65. Three days later Nifty is at 24,250 and the call trades at ₹105.26. The writer can hold (loss so far (105.26 − 81.99) = ₹23.27 per unit, ₹1,512.55), roll up to the 24,400 CE at ₹66.58 for a net debit of 105.26 − 66.58 = ₹38.68 per unit, or buy the 24,500 CE at ₹39.46 as a hedge. Each option reflects a different tolerance for loss.`,
    },
    chart: {
      kind: 'flow',
      title: 'What a writer can do after the sale',
      caption: 'The decision path repeats every day until expiry.',
      steps: [
        { label: 'Sell option', note: 'Collect premium', tone: 'gold' },
        { label: 'Watch premium and margin', note: 'Daily mark-to-market', tone: 'ice' },
        { label: 'Move against?', note: 'Defend, add, roll or hedge', tone: 'bear' },
        { label: 'Move in favour?', note: 'Book part or reduce risk', tone: 'bull' },
        { label: 'Expiry', note: 'Keep premium or pay intrinsic value', tone: 'neutral' },
      ],
    },
    optionChain:
      `On the chain, writer actions appear as rising or falling OI at a strike together with a change in the premium. Rising OI with a falling premium is consistent with fresh writing, and falling OI with a rising premium can be short covering. But OI alone cannot show who initiated a trade, and one strike's OI is the sum of many people, some of them hedged. Use these changes as questions to ask, not as proof of a writer's mind.`,
    psychology:
      `Loss aversion is strong: people dislike a loss more than they like an equal gain, so writers often hold losers hoping to recover and book winners too early. The "premium is mine" feeling can make a writer add to a losing short. After a loss, some traders increase size to win it back, which is the most dangerous reaction. Hedged writers tend to stay calmer because the worst case is fixed. Good writers decide the exit before the sale.`,
    scenarios: {
      bullish:
        `A rally pressures call writers. Some defend by rolling up, some hedge and some exit with a loss. Put writers feel comfortable and may add. Fresh call writing usually moves to higher strikes.`,
      bearish:
        `A fall pressures put writers. Some roll down, some hedge with a bought put and some exit. Call writers book profit, and fresh put writing appears only if the fall slows.`,
      sideways:
        `Both writers gain from time decay. They book part of the profit as the premium shrinks and many reduce size before expiry because the remaining premium is small compared with gap risk.`,
    },
    practice: [
      {
        q: `A writer sells the 24,300 CE at ₹81.99 and decides to exit if the premium reaches double the entry. What is the exit premium and the loss per lot of 65?`,
        a: `Exit premium = 2 × 81.99 = ₹163.98. Loss per unit = 163.98 − 81.99 = ₹81.99. Per lot = 81.99 × 65 = ₹5,329.35, equal to the premium collected. A stop at "2 times premium" therefore caps the loss at 100% of the premium, if the order can be filled at that price.`,
      },
      {
        q: `With Nifty at 24,250 and 3 days left, a writer rolls from the 24,300 CE (bought back at ₹105.26) to the 24,400 CE (sold at ₹66.58). The original sale was at ₹81.99. What is the combined breakeven?`,
        a: `Net credit across the legs = 81.99 − 105.26 + 66.58 = ₹43.31 per unit. Breakeven = 24,400 + 43.31 = 24,443.31. The roll cost ₹38.68 per unit in debit, which is ₹2,514.20 per lot of 65, and moved the writer's risk 100 points higher.`,
      },
      {
        q: `A writer sells the 24,300 CE at ₹81.99 and buys the 24,500 CE at ₹39.20. What are the credit, the maximum loss and the maximum profit per lot of 65?`,
        a: `Credit = 81.99 − 39.20 = ₹42.79 per unit. Maximum profit = 42.79 × 65 = ₹2,781.35. Width = 200, so maximum loss = 200 − 42.79 = ₹157.21 per unit = ₹10,218.65 per lot. Breakeven = 24,300 + 42.79 = 24,342.79.`,
      },
      {
        q: `After 3 days with Nifty unchanged at 24,000, the 24,300 CE sold at ₹81.99 is worth ₹28.76. What share of the premium has been earned and what is the rupee gain per lot of 65?`,
        a: `Gain per unit = 81.99 − 28.76 = ₹53.23. Share earned = 53.23 / 81.99 = about 64.9%. Per lot = 53.23 × 65 = ₹3,459.95. The remaining ₹28.76 per unit (₹1,869.40 per lot) is the most that can still be earned.`,
      },
    ],
    assignment:
      `Pick one NIFTY short option you would consider selling on paper. Before entering, write down: your entry premium, an exit premium for a loss, a profit target as a percentage of the premium, the rupee loss per lot at each, and the action you would take if Nifty moved 1% against you in one session. After expiry, compare what you wrote with what a real writer might have felt and note one rule you would change.`,
  },
  topics: [
    {
      t: 1,
      def: `Defending a strike means a writer acts to keep a short option from becoming a loss, for example by adding a hedge, rolling, or buying back when the index approaches it. A strike is "defended" when the writer cares more about that level than the premium alone.`,
      hi: `Strike defend karna matlab writer apne short option ko loss banne se rokne ke liye action leta hai, jaise hedge add karna, roll karna ya index paas aane par buy back. Jab writer ko sirf premium se zyada us level ki fikar hoti hai, tab woh strike "defend" hota hai.`,
      how: `Writers usually defend strikes for three reasons: the strike was chosen from a view (say, "Nifty will not cross 24,300 this week"), the margin is already committed, or a large number of position-holders share the same view. Defence is not a guarantee that the level will hold, since the writer can also give up. It is visible on the chain when OI at the strike stays high or grows as spot approaches it, but OI cannot tell whether the people holding are fresh writers, hedged traders or arbitrageurs. A strike with a strong defence can still break on a big move or on news.`,
      eg: {
        title: 'Defence rule for a 24,300 CE (illustrative)',
        text: `A writer sells the 24,300 CE at ₹81.99 with Nifty at 24,000 and sets a rule: if Nifty trades above 24,200, buy a hedge. The 24,200 level is 100 points below the strike, so the hedge is bought before the strike is touched. A hedge bought only after Nifty reaches 24,300 would face a much higher premium, because the call is then at the money (with 7 days left, about ₹203 against ₹81.99 at the sale).`,
      },
      tip: `A defence rule must be written before entry. Defending by hope is just holding a loser.`,
      visual: {
        kind: 'ladder',
        title: 'Strike chosen against spot 24,000',
        caption: 'A writer defends the strike line, not the spot.',
        optType: 'CE',
        spot: 24000,
        strikes: [24000, 24100, 24200, 24300, 24400],
      },
      calc: {
        id: 'breakeven',
        preset: { optType: 'CE', side: 'sell', strike: 24300, premium: 81.99 },
        why: 'The writer\'s breakeven is the level that really needs defending.',
      },
    },
    {
      t: 2,
      def: `Adding positions means a writer sells more of the same option, or another strike, after the first sale. It is either scaling in on a plan or increasing size to recover a loss.`,
      hi: `Positions add karna matlab writer pehli sale ke baad wahi option ya doosra strike aur bechta hai. Yeh ya toh plan ke hisaab se scaling in hota hai, ya loss recover karne ke liye size badhana hota hai.`,
      how: `Writers add for different reasons. A planned writer splits an entry into parts, adding when premium rises because the strike now pays more. A fearful or impatient writer adds to a losing short to lower the average price, which raises exposure when the view is already wrong. Margin also rises, and a gap can cause a loss on every lot. Added OI at one strike with rising premium is consistent with this but is not proof, since buyers may be driving the premium.`,
      eg: {
        title: 'Averaging up a short (illustrative)',
        text: `A writer sells one lot of the 24,300 CE at ₹81.99, then a second lot at ₹120 as Nifty rises. At 24,700 expiry, lot 1 loses (400 − 81.99) = ₹318.01 and lot 2 loses (400 − 120) = ₹280 per unit. Total = 598.01 × 65 = ₹38,870.65, against ₹20,670.65 for the single lot. The average sale price of ₹100.99 looks better, but the rupee exposure almost doubled.`,
      },
      tip: `Adding to a winner on a plan is a method. Adding to a loser to feel better is a trap.`,
      visual: {
        kind: 'bars',
        title: 'Loss at 24,700 expiry, per lots of 65 (₹)',
        caption: 'Doubling the lots nearly doubles the loss.',
        unit: ' ₹',
        items: [
          { label: '1 lot at 81.99', value: 20670.65, tone: 'bear' },
          { label: '2 lots at 81.99 and 120', value: 38870.65, tone: 'bear' },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24300, premium: 100.995, expiryPrice: 24700, lotSize: 65, lots: 2 },
        why: 'Two lots at the average premium of ₹100.995 show the combined loss.',
      },
    },
    {
      t: 3,
      def: `Shifting a position (rolling) means closing the current short option and selling another strike or expiry. Rolling up or down changes the strike; rolling out changes the date.`,
      hi: `Position shift (rolling) matlab current short option band karke doosra strike ya expiry bechna. Roll up/down strike badalta hai; roll out date badalta hai.`,
      how: `A writer rolls to give the trade more room. Rolling up a call moves the strike higher so spot has farther to travel, but the buy-back realises the loss on the old leg. Rolling out to a later expiry adds time value and more days of risk. Each roll can cost a net debit, the total margin may rise and the writer pays brokerage, STT and other charges again. On the chain, OI shrinks at the old strike and grows at the new one, which can be mistaken for "resistance shifting".`,
      eg: {
        title: 'Rolling the 24,300 CE up to 24,400 (illustrative)',
        text: `With 3 days left and Nifty at 24,250, buy back the 24,300 CE at ₹105.26 and sell the 24,400 CE at ₹66.58. The net debit is 105.26 − 66.58 = ₹38.68 per unit, ₹2,514.20 per lot of 65. Including the original sale at ₹81.99, the total credit is ₹43.31 and the new breakeven is 24,443.31, 100 points above the old one.`,
      },
      tip: `Rolling resets the risk, not the loss. Check the total credit across all legs before you congratulate yourself.`,
      visual: {
        kind: 'flow',
        title: 'Roll up from 24,300 CE to 24,400 CE',
        caption: 'Two orders; premiums are illustrative.',
        steps: [
          { label: 'Sold 24,300 CE', note: '₹81.99 credit', tone: 'gold' },
          { label: 'Buy back 24,300 CE', note: '₹105.26 debit', tone: 'bear' },
          { label: 'Sell 24,400 CE', note: '₹66.58 credit', tone: 'gold' },
          { label: 'Net credit so far', note: '₹43.31 per unit', tone: 'ice' },
        ],
      },
      calc: {
        id: 'breakeven',
        preset: { optType: 'CE', side: 'sell', strike: 24400, premium: 43.31 },
        why: 'Use the total credit as the premium to find the new breakeven.',
      },
    },
    {
      t: 4,
      def: `Exiting means the writer buys back the short option and closes the position, either to stop a loss or to avoid a risk. The exit price decides the profit or loss.`,
      hi: `Exit karna matlab writer short option buy back karke position band karta hai, ya loss rokne ke liye ya kisi risk se bachne ke liye. Exit price se profit ya loss decide hota hai.`,
      how: `Writers exit when a pre-set loss limit is hit, when margin is short, when the reason for the trade is gone, or when news arrives. A stop-loss on a short option is a buy order, and in a fast move it can fill far from the trigger because the sellers have moved up the book. Index options are cash-settled and European, so there is no assignment before expiry; the only way out early is a buy-back. If many writers exit together, the buying can push the premium higher, which is called a short squeeze (see 13.5).`,
      eg: {
        title: 'Premium stop at twice the entry (illustrative)',
        text: `Sell the 24,300 CE at ₹81.99 and place a stop at ₹163.98. If triggered, the loss is 81.99 × 65 = ₹5,329.35 per lot, equal to the premium collected. On a one-lot position with ₹5,00,000 capital, that is 1.07% of the capital (5,329.35 / 5,00,000). If the stop fills at ₹175 in a fast market, the loss is (175 − 81.99) × 65 = ₹6,045.65.`,
      },
      tip: `The exit is part of the trade plan. Write the number before entering, not after the premium moves.`,
      visual: {
        kind: 'bars',
        title: 'Loss per lot for different exit premiums (₹)',
        caption: 'Entry at 81.99; lot of 65.',
        unit: ' ₹',
        items: [
          { label: 'Exit at 120', value: 2470.65, tone: 'bear' },
          { label: 'Exit at 163.98 (2x)', value: 5329.35, tone: 'bear' },
          { label: 'Exit at 175 (gap fill)', value: 6045.65, tone: 'bear' },
        ],
      },
      calc: {
        id: 'position-size',
        preset: { capital: 500000, riskPct: 1, entry: 81.99, stop: 163.98, lotSize: 65 },
        why: 'Check whether a lot fits inside a 1% risk budget; it does not, so size is the problem.',
      },
    },
    {
      t: 5,
      def: `Booking profit means buying back a short option for less than the sale price, locking in part of the premium, instead of waiting for expiry. The profit is the difference between the premium sold and the premium paid.`,
      hi: `Profit book karna matlab short option ko sale price se kam mein buy back karke premium ka kuch hissa lock karna, expiry ka wait kiye bina. Profit sale premium aur buy back premium ka difference hota hai.`,
      how: `As time passes, the premium of an out-of-the-money option falls. Writers book early because the remaining premium is small compared with the risk of a sudden move (gamma risk). A usual habit is to buy back when 50% to 70% of the premium is earned, but this is a habit and not a rule, and it also frees margin for other trades. A writer who books too early gives up some profit; one who waits for the last rupee holds large risk for little.`,
      eg: {
        title: 'Earning about 65% of the premium (illustrative)',
        text: `Sold the 24,300 CE at ₹81.99; 3 days later, with Nifty still at 24,000, it trades at ₹28.76. Buying back earns 81.99 − 28.76 = ₹53.23 per unit, ₹3,459.95 per lot of 65, which is 64.9% of the premium. The remaining reward is only ₹28.76 × 65 = ₹1,869.40, while a 250-point rally in a day could add far more loss than that.`,
      },
      tip: `The last 20% of the premium is often the riskiest to earn.`,
      visual: {
        kind: 'bars',
        title: 'Premium of 24,300 CE with Nifty at 24,000 (₹)',
        caption: 'Time decay, illustrative, IV 14%.',
        unit: ' ₹',
        items: [
          { label: '7 days left', value: 81.99, tone: 'gold' },
          { label: '3 days left', value: 28.76, tone: 'gold' },
          { label: '1 day left', value: 3.47, tone: 'gold' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 81.99, end: 28.76, years: 1 },
        why: 'The percentage change from 81.99 to 28.76 shows how much premium decayed.',
      },
    },
    {
      t: 6,
      def: `Hedging means a writer buys another option or a futures contract to limit the loss on a short option. A bought option farther from the money turns a naked short into a spread with fixed maximum loss.`,
      hi: `Hedge karna matlab writer short option ka loss limit karne ke liye doosra option ya futures khareedta hai. Door ka bought option naked short ko spread bana deta hai jisme maximum loss fixed hota hai.`,
      how: `Writers hedge to reduce margin, to sleep during events and to survive a gap. A short 24,300 CE plus a long 24,500 CE is a bear call spread: less credit, lower margin and a loss that cannot exceed the width minus the credit. NSE and SEBI margin rules give lower margins to hedged positions than to naked ones, but check the broker's margin calculator for the actual figure. The cost of hedging is lower premium income and, for dynamic hedges with futures, repeated trading.`,
      eg: {
        title: 'Naked versus hedged call (illustrative)',
        text: `Sell the 24,300 CE at ₹81.99 and buy the 24,500 CE at ₹39.20, giving a credit of ₹42.79 per unit (₹2,781.35 per lot of 65). Maximum loss = 200 − 42.79 = ₹157.21 per unit = ₹10,218.65 per lot. A naked short at 24,700 expiry loses ₹20,670.65, and at 25,000 it loses ₹40,170.65, so the hedge removes the tail.`,
      },
      tip: `A hedge is paid for with premium. The cheaper the hedge, the less protection you may be buying.`,
      visual: {
        kind: 'payoff',
        title: 'Bear call spread: short 24,300 CE, long 24,500 CE',
        caption: 'Loss is capped at the strike gap less credit.',
        spot: 24000,
        legs: [
          { type: 'CE', side: -1, strike: 24300, premium: 81.99 },
          { type: 'CE', side: 1, strike: 24500, premium: 39.20 },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24500, premium: 39.20, expiryPrice: 24700, lotSize: 65, lots: 1 },
        why: 'The hedge leg\'s result at 24,700; add it to the short leg\'s loss to see the net.',
      },
    },
    {
      t: 7,
      def: `Reducing exposure before expiry means a writer closes part or all of a short position in the last days, often when the premium is small. The aim is to avoid a late spike more than to earn the final rupees.`,
      hi: `Expiry se pehle exposure kam karna matlab writer aakhri dino mein short position ka kuch ya poora hissa band kar deta hai, jab premium chhota hota hai. Maqsad aakhri rupaye kamaane se zyada late spike se bachna hota hai.`,
      how: `Close to expiry, gamma is high: a small move in Nifty changes the option's delta and price sharply. A far option that looks dead can come alive in one session. Weekly expiry day is a time of heavy volume and big intraday swings, so many writers close early or hedge with cheap options. The writer also frees margin and avoids exit-order slippage in a fast market. Not every writer reduces, so OI at a strike may remain high into the last hour.`,
      eg: {
        title: 'One day to expiry (illustrative)',
        text: `The 24,300 CE sold at ₹81.99 is worth ₹3.47 with one day left and Nifty at 24,000, so 95.8% of the premium is earned (78.52 / 81.99). The remaining reward is 3.47 × 65 = ₹225.55. If Nifty gaps to 24,350, the same option is worth ₹101.55, which is a rise of 98.08 per unit, ₹6,375.20 per lot. Risking about ₹6,375 to earn ₹226 is a poor trade.`,
      },
      tip: `Compare what is left to earn with what a one-day move can cost. Near expiry, the ratio is usually poor.`,
      visual: {
        kind: 'curve',
        title: 'Gamma rises as expiry approaches',
        caption: 'Near-the-money options react sharply in the last days.',
        curve: 'gamma',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24300, days: 1, iv: 14, rate: 6.5 },
        why: 'See the one-day price and delta, then raise spot to see how fast they change.',
      },
    },
    {
      t: 8,
      def: `Writers often avoid high-volatility environments because large price swings can cause losses that are bigger than the extra premium. India VIX measures expected volatility, not direction, and writers look at it before selling.`,
      hi: `Writers aksar high-volatility environment avoid karte hain kyunki bade price swings extra premium se bada loss kara sakte hain. India VIX expected volatility batata hai, direction nahi, aur writers bechne se pehle ise dekhte hain.`,
      how: `When India VIX is high, premiums are richer, but the market expects bigger moves, so the chance of a strike being crossed is higher. Events like the Union Budget, RBI policy, election results and global shocks can cause IV to jump and gaps to appear. Writers who sell small premiums in calm times may skip those days or hedge. Others prefer high IV because premium is large and IV often falls after the event. Both views exist; neither is guaranteed to work.`,
      eg: {
        title: 'Same strike, two volatility levels (illustrative)',
        text: `With 7 days left, the 24,300 CE is worth ₹81.99 at IV 14% and ₹153.22 at IV 20%. The 1-standard-deviation weekly move is about 24,000 × 0.14 × √(7/365) = 465 points at 14% and 665 points at 20%. At 14% the strike is 300 points away (0.64 standard deviations); at 20% it is only 0.45 standard deviations away. The premium nearly doubles, but so does the chance that the strike is reached.`,
      },
      tip: `High premium is a price for high risk. It is not a gift.`,
      visual: {
        kind: 'gauge',
        title: 'India VIX reading (illustrative)',
        caption: 'Zones are a teaching scale, not an official band.',
        min: 8,
        max: 35,
        value: 14,
        unit: '',
        zones: [
          { from: 8, to: 13, label: 'Calm', tone: 'ice' },
          { from: 13, to: 20, label: 'Normal', tone: 'neutral' },
          { from: 20, to: 35, label: 'Stressed', tone: 'gold' },
        ],
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 20, days: 7 },
        why: 'The expected one-sigma move at VIX 20 for a week is about 665 points.',
      },
    },
    {
      t: 9,
      def: `Losses change how a writer behaves. After a loss, a person may become either too cautious or too aggressive, and both reactions can hurt future trades.`,
      hi: `Loss se writer ka behaviour badal jata hai. Loss ke baad insaan ya toh bahut darta hai ya bahut aggressive ho jata hai, aur dono reactions aage ke trades ko nuksan pahuncha sakte hain.`,
      how: `Loss aversion and the wish to "get it back" push traders to hold losers, add size or sell closer strikes for more premium. A short-option loss is also public on the chain as rising premium, which adds pressure. Experienced writers risk a small fixed share of capital per trade, take a break after a hit and review the rule that was broken. Losses cannot be changed, but the next position size can be controlled. A drawdown also needs a larger gain to recover, so early cuts are cheaper.`,
      eg: {
        title: 'Revenge sizing (illustrative)',
        text: `A writer with ₹5,00,000 loses ₹20,670.65 on one lot of the 24,300 CE (4.13% of capital). To "recover", the writer sells two lots next week. A similar move would now lose ₹41,341.30, which is 8.62% of the remaining ₹4,79,329.35 (41,341.30 / 4,79,329.35). The trade did not become better; it became twice as risky.`,
      },
      tip: `After a loss, cut size, not just the strike distance.`,
      visual: {
        kind: 'curve',
        title: 'Drawdown needs a larger gain to recover',
        caption: 'A 20% loss needs a 25% gain.',
        curve: 'drawdown',
      },
      calc: {
        id: 'drawdown-recovery',
        preset: { drawdownPct: 20 },
        why: 'Shows how much gain a 20% drawdown needs to return to the start.',
      },
    },
    {
      t: 10,
      def: `Hedging changes behaviour because a writer whose worst loss is fixed can hold through noise, take more trades and think more clearly. The cost is a smaller credit and a more complicated position.`,
      hi: `Hedging se behaviour badalta hai kyunki jis writer ka worst loss fixed hai woh noise mein bhi position hold kar sakta hai, zyada trades le sakta hai aur zyada clear soch sakta hai. Iska cost chhota credit aur zyada complicated position hota hai.`,
      how: `A hedged writer knows the maximum loss in advance, so a sharp move is less likely to force a panic exit. The margin is lower, which leaves cash for other uses and reduces the chance of a margin call. But hedging can create its own behaviour: some writers sell more lots because each lot "feels safe", which brings the total rupee risk back up. The hedge also has a cost in brokerage, bid-ask spread and, if it is exited separately, a timing risk.`,
      eg: {
        title: 'Calm because the loss is fixed (illustrative)',
        text: `Compare the 24,300 CE naked (₹81.99 credit) with the 24,300 / 24,500 call spread (₹42.79 credit). At 24,700 the naked loss is ₹318.01 per unit (₹20,670.65 per lot); the spread loss is ₹157.21 (₹10,218.65 per lot), and it stays at ₹157.21 at 25,000 too, while the naked loss rises to ₹618.01 (₹40,170.65). The spread writer gave up ₹39.20 of credit per unit (₹2,548 per lot) to buy that certainty.`,
      },
      tip: `If hedging makes you add more lots, the total risk may be back where it started.`,
      visual: {
        kind: 'compare',
        title: 'Naked versus hedged writer',
        caption: 'Same strike, different mindset.',
        left: {
          head: 'Naked writer',
          tone: 'gold',
          points: ['Credit ₹81.99', 'Loss unlimited', 'Higher margin', 'Tempted to defend late'],
        },
        right: {
          head: 'Hedged writer',
          tone: 'ice',
          points: ['Credit ₹42.79', 'Loss capped at ₹157.21', 'Lower margin', 'Can follow the plan more easily'],
        },
      },
      calc: {
        id: 'risk-reward',
        preset: { winRate: 70, avgWin: 2781.35, avgLoss: 10218.65 },
        why: 'A capped loss per lot lets you test whether a 70% win rate is enough for this spread.',
      },
    },
  ],
}

export default m
