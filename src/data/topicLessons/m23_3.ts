import type { ModuleLesson } from '../topicLessonTypes'

/* Module 23.3 - Market Participant Behaviour.
 * All numbers illustrative: NIFTY about 24,000, lot 65 (check the current NSE contract specification). */
const m: ModuleLesson = {
  moduleId: '23.3',
  intro: `Every price move has people on the wrong side, people on the right side and people forced to act. This module teaches you to ask who is trapped, who is under pressure and who must buy or sell next. These are questions that frame your analysis, not facts you can read directly off a screen.`,
  introHi: `Har price move mein kuch log galat side par hote hain, kuch sahi side par, aur kuch ko majboori mein action lena padta hai. Is module mein aap seekhoge ki kaun trapped hai, kis par pressure hai aur agla forced buyer ya seller kaun ho sakta hai. Yeh sawaal aapke analysis ka frame hain, screen par seedhe dikhne wale facts nahi.`,
  steps: {
    concept: `Participant behaviour means asking what each group is likely to do given where it stands: in profit, in loss, hedged or unhedged. Price tends to move fastest when someone is forced to act, such as a stop-loss, a margin call or a hedge adjustment. The public data (OI, volume, price) shows footprints, but it cannot name the individual or the intent.`,
    conceptHi: `Participant behaviour ka matlab hai yeh sochna ki har group apni position ke hisaab se kya karega: profit mein, loss mein, hedged ya unhedged. Price sabse tez tab chalta hai jab kisi ko majboori mein action lena pade, jaise stop-loss, margin call ya hedge adjustment. Public data (OI, volume, price) sirf footprints dikhata hai, kisi ka naam ya iraada nahi.`,
    mechanism: `Three kinds of orders move price after the first shock. Stop-loss orders of trapped traders become market orders. Option writers under loss buy back or add futures hedges, which pushes in the same direction. Fresh participants who missed the move may chase it. Exchange risk systems add to this: when the market moves against a writer, SPAN plus exposure margin requirements can rise, and a broker may square off positions if the client cannot meet them.`,
    example: {
      title: 'A failed breakout traps buyers (illustrative)',
      text: `NIFTY breaks above 24,100 and traders buy futures at 24,100. The move fails and the index slips to 23,950. Each lot (65 units) has lost (24,100 − 23,950) × 65 = ₹9,750. Stops placed just below 24,100 trigger, adding selling, and the index may overshoot downward. The same fall helps traders who bought the 23,900 put at ₹80: if NIFTY closes at 23,700 on expiry, the put is worth 200 and the gain is (200 − 80) × 65 = ₹7,800 per lot, before charges.`,
    },
    chart: {
      kind: 'flow',
      title: 'How one shock becomes a chain of forced orders',
      caption: 'Each box is a decision somebody may be forced into. Intent is inferred, never directly visible.',
      steps: [
        { label: 'Price moves against a crowded view', tone: 'gold' },
        { label: 'Stop-loss orders trigger', note: 'longs sell or shorts buy', tone: 'bear' },
        { label: 'Writers see margin and MTM pressure', tone: 'bear' },
        { label: 'Hedges or square-offs add to the move', tone: 'gold' },
        { label: 'Move overshoots, then often pauses', tone: 'ice' },
      ],
    },
    optionChain: `On the chain, trapped buyers show as large OI at a strike that price has just moved away from, with premiums collapsing. Pressure on writers shows as a sharp rise in the premium of the strike being tested, along with falling OI if they buy back. Remember that OI alone cannot show who initiated a trade, so a fall in OI is a hint of closing, not proof of who closed.`,
    psychology: `Trapped traders hope for a return to their entry and often add to losers. Profitable traders fear giving back gains and book early. Writers feel safe while the strike is far and become anxious as it nears. Experienced traders ask which of these groups has no choice in the next hour, because forced behaviour is more predictable than voluntary behaviour.`,
    scenarios: {
      bullish: `A rally traps shorts and put-heavy hedgers. Short covering and writer hedging can extend the move, but once the forced buying is done, momentum may fade quickly.`,
      bearish: `A fall traps late longs and call buyers near highs. Stops and put-writer pressure can accelerate the fall, and a sharp bounce is common once forced selling is exhausted.`,
      sideways: `In a range, nobody is forced, so behaviour is voluntary and noisy. Writers collect premium, buyers lose time value, and trapped traders from earlier moves slowly exit at breakeven.`,
    },
    practice: [
      {
        q: `A trader buys 1 lot of NIFTY futures at 24,100 (lot 65) and is stopped out at 23,950. What is the loss before charges?`,
        a: `Points lost = 24,100 − 23,950 = 150. Loss = 150 × 65 = ₹9,750 per lot.`,
      },
      {
        q: `A writer sold the 24,200 CE at ₹40. The premium rises to ₹100 as NIFTY nears 24,150. What is the mark-to-market loss per lot?`,
        a: `Premium rise = 100 − 40 = 60 points. MTM loss = 60 × 65 = ₹3,900 per lot. The loss is unlimited in theory because a call can keep rising.`,
      },
      {
        q: `A holder of ₹24,00,000 of NIFTY-like stocks (beta 1) wants a full hedge. One NIFTY futures lot at 24,000 is worth 24,000 × 65. How many lots are needed?`,
        a: `One lot notional = 24,000 × 65 = ₹15,60,000. Lots = 24,00,000 / 15,60,000 = 1.54. You can only trade whole lots, so 1 lot gives a partial hedge and 2 lots slightly over-hedge.`,
      },
      {
        q: `Put OI is 90 lakh and call OI is 75 lakh. What is the OI PCR, and what can you conclude?`,
        a: `PCR = 90 / 75 = 1.2. It shows more put than call open interest. It does not tell you who wrote or bought them, so it is context, not a signal.`,
      },
    ],
    assignment: `On any trading day, open the option chain at 9:30, 12:00 and 14:30. At each time note the strike with the highest CE OI, the highest PE OI and the biggest OI change. Write two lines per snapshot on who might be trapped, labelled as a guess.`,
  },
  topics: [
    {
      t: 1,
      def: `A trapped trader is someone who entered expecting a move that failed, and who is now holding a loss they would rather not book. Longs are trapped after a false breakout; shorts are trapped after a false breakdown. Their stop-loss orders can become the fuel for the next move.`,
      hi: `Trapped trader woh hota hai jo kisi move ki umeed mein entry karta hai, lekin move fail ho jaata hai aur ab loss book karna nahi chahta. Galat breakout ke baad longs trapped hote hain, aur galat breakdown ke baad shorts. Inke stop-loss orders aage ke move ka eendhan ban sakte hain.`,
      how: `Traders cluster entries just beyond obvious levels such as the day's high or a round number. When price reverses back inside the range, stops placed on the other side of the entry get hit together, adding to the reversal. You cannot see the trapped traders themselves; you infer them from a quick reversal, a spike in volume at the failed level and premiums collapsing on the strikes near it.`,
      eg: {
        title: 'Failed breakout above 24,100',
        text: `Buyers enter NIFTY futures at 24,100 after a break. Price falls to 23,950, a loss of 150 points, or 150 × 65 = ₹9,750 per lot. Stops below 24,100 add selling pressure. Illustrative numbers.`,
      },
      tip: `Being trapped is a state of mind as much as a position. If you notice yourself saying "it has to come back", you are the trapped trader, so cut the position by your stop, not your hope.`,
      visual: {
        kind: 'candles',
        title: 'False breakout',
        caption: 'Price pokes above a level, fails and closes back below. Longs who bought the break are trapped.',
        pattern: 'falseBreakout',
        level: { price: 24100, label: '24,100' },
      },
    },
    {
      t: 2,
      def: `Profitable participants are those whose position is on the right side of the current move, either in unrealised (open) profit or in realised profit after exit. Who is profitable changes minute to minute, so it is a snapshot, not a type of trader.`,
      hi: `Profitable participant woh hai jiski position abhi chal rahe move ki sahi side par hai, chahe profit unrealised ho ya exit karke realised. Kaun profitable hai yeh har minute badalta hai, isliye yeh ek snapshot hai, trader ka permanent type nahi.`,
      how: `Buyers of options profit when price moves enough to cover the premium paid; writers profit while price stays away from their strike and time value decays. Neither side wins all the time. SEBI's study of FY25 reported that about 91 percent of individual F&O traders had net losses, similar to FY24, which is a reminder that being on the winning side in a single move says little about long-run results.`,
      eg: {
        title: 'Put buyer before an event',
        text: `A trader buys the 23,900 PE at ₹80. NIFTY closes at 23,700 on expiry, so intrinsic value is 23,900 − 23,700 = 200. Profit = (200 − 80) × 65 = ₹7,800 per lot before charges. If NIFTY had closed above 23,900, the loss would be the full 80 × 65 = ₹5,200.`,
      },
      tip: `A winning trade is not proof of a good process. Judge yourself on a large number of trades, not the last one.`,
      visual: {
        kind: 'payoff',
        title: 'Long 23,900 PE at ₹80, expiry payoff',
        caption: 'Profit appears only below the breakeven of 23,820; the maximum loss is the premium.',
        spot: 24000,
        legs: [{ type: 'PE', side: 1, strike: 23900, premium: 80 }],
      },
    },
    {
      t: 3,
      def: `A participant is under pressure when the market is moving against a position and the cost of staying in is rising. Typical cases are option writers facing rising premiums and margin, and leveraged longs near their stop.`,
      hi: `Participant par pressure tab hota hai jab market uski position ke khilaaf chal raha ho aur position mein bane rehne ki keemat badh rahi ho. Jaise option writers jinke premium aur margin badh rahe hain, ya leveraged longs jo stop ke paas hain.`,
      how: `An option writer's loss grows as the premium rises, and the clearing corporation (NSCCL) revalues the position daily with mark-to-market settlement. Margin (SPAN plus exposure) can rise when volatility and the distance to strike change. A writer then has three choices: add margin, buy back or hedge with futures. Each choice puts orders in the market, which is why pressure on writers can extend a move.`,
      eg: {
        title: 'Call writer under pressure',
        text: `A trader sells the 24,200 CE at ₹40. NIFTY rallies and at expiry closes at 24,350, so intrinsic value is 150. Result = (40 − 150) × 65 = −₹7,150 per lot, before charges. Before expiry the writer faces mark-to-market losses and may be forced to decide earlier.`,
      },
      tip: `Pressure shows up first in the premium of the strike being tested. Watch that premium, not just the index.`,
      visual: {
        kind: 'flow',
        title: 'Writer under pressure',
        caption: 'Each step may force an order into the market.',
        steps: [
          { label: 'Spot rises toward the sold strike', tone: 'bull' },
          { label: 'Call premium rises', tone: 'gold' },
          { label: 'MTM loss and margin need grow', tone: 'bear' },
          { label: 'Writer buys back or adds hedge', tone: 'ice' },
        ],
      },
    },
    {
      t: 4,
      def: `Adding positions means participants are opening new contracts, so open interest rises. In futures, the combination of price direction and OI change gives a classic reading of whether new longs or new shorts are being created.`,
      hi: `Positions add karne ka matlab hai participants naye contracts khol rahe hain, isliye open interest badhta hai. Futures mein price direction aur OI change milake yeh padhte hain ki naye longs ban rahe hain ya naye shorts.`,
      how: `Open interest counts outstanding contracts; it rises when a new buyer and a new seller are matched. In futures, price up with OI up is read as long build-up and price down with OI up as short build-up. These rules are for futures; applying them blindly to option OI is a mistake because each option strike has both buyers and writers, and OI alone cannot show who initiated the trade.`,
      eg: {
        title: 'Futures build-up reading',
        text: `NIFTY futures rise 0.6 percent and OI rises 4 percent. This is classified as long build-up, which suggests fresh long positions. If the same day OI had fallen 4 percent with price up 0.6 percent, the reading would be short covering.`,
      },
      tip: `Use the price and OI grid for futures only. For option strikes, treat OI changes as context about levels, not as a verdict on who is bullish.`,
      visual: {
        kind: 'matrix',
        title: 'Futures price and OI grid',
        caption: 'A classic reading for futures contracts. Not a rule for option OI.',
        xLabels: ['OI rising', 'OI falling'],
        yLabels: ['Price up', 'Price down'],
        cells: [
          { head: 'Long build-up', note: 'new longs', tone: 'bull' },
          { head: 'Short covering', note: 'shorts closing', tone: 'gold' },
          { head: 'Short build-up', note: 'new shorts', tone: 'bear' },
          { head: 'Long unwinding', note: 'longs closing', tone: 'gold' },
        ],
      },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.6, oiChangePct: 4 }, why: 'Classifies the price and OI combination for futures.' },
    },
    {
      t: 5,
      def: `Reducing positions means participants are closing contracts, so open interest falls. It can be profit booking, stop-loss exits or writers buying back.`,
      hi: `Positions kam karne ka matlab hai participants contracts band kar rahe hain, isliye open interest girta hai. Yeh profit booking, stop-loss exit ya writers ka buyback ho sakta hai.`,
      how: `OI falls when existing contracts are closed on both sides. A strike's OI also drops as expiry nears because positions are squared off or rolled. The fall in OI tells you that the position count shrank, but not whether buyers or writers did the closing. Compare the OI change with the premium change to guess the cause, and always label it as a guess.`,
      eg: {
        title: 'OI unwinding at 24,200 CE',
        text: `OI at the 24,200 CE falls from 90 lakh units to 70 lakh units. That is 20 lakh units, or 20,00,000 / 65 ≈ 30,769 lots closed. If the premium also rose sharply, writers buying back is a likely reason; if the premium fell, long holders exiting is possible. OI alone does not settle it.`,
      },
      tip: `A falling OI at a strike near expiry is normal. Compare with the same time on previous days before reading anything into it.`,
      visual: {
        kind: 'bars',
        title: '24,200 CE open interest (lakh units, illustrative)',
        unit: ' lakh',
        items: [
          { label: 'Morning', value: 90, tone: 'neutral' },
          { label: 'Afternoon', value: 70, tone: 'gold' },
        ],
      },
    },
    {
      t: 6,
      def: `Hedging means taking an offsetting position to reduce risk from an existing one, for example selling futures against a stock portfolio or buying puts against a long position. A hedger is paying to reduce risk, not trying to predict the market.`,
      hi: `Hedging ka matlab hai kisi existing position ka risk kam karne ke liye ulti position lena, jaise stock portfolio ke against futures bechna ya long position ke against put kharidna. Hedger risk kam karne ke liye paisa de raha hai, market predict karne ke liye nahi.`,
      how: `A mutual fund, a proprietary desk or a retail investor may hedge with NIFTY futures or index options. A futures hedge locks in the portfolio against index moves but also removes upside; a put hedge costs premium but keeps upside. Hedging activity produces OI and volume that is not a directional view, which is one more reason why raw OI cannot be read as sentiment.`,
      eg: {
        title: 'Hedging a ₹24 lakh portfolio',
        text: `A portfolio of ₹24,00,000 with beta 1 and NIFTY futures at 24,000 (notional 24,000 × 65 = ₹15,60,000 per lot). Hedge lots = 24,00,000 / 15,60,000 ≈ 1.54. Selling 2 lots slightly over-hedges, selling 1 lot hedges about 65 percent. Illustrative.`,
      },
      tip: `Not every put buyer is bearish. Many are hedgers, so check whether the strikes suggest protection, not prediction.`,
      visual: {
        kind: 'compare',
        title: 'Two ways to hedge',
        left: { head: 'Sell futures', tone: 'ice', points: ['Costs almost nothing upfront', 'Cuts downside and upside', 'Needs margin and daily MTM'] },
        right: { head: 'Buy puts', tone: 'gold', points: ['Pays a premium', 'Keeps the upside', 'Loss capped at premium'] },
      },
      calc: { id: 'hedge-ratio', preset: { portfolio: 2400000, beta: 1, futuresNotional: 1560000 }, why: 'Gives the number of futures lots to hedge a portfolio.' },
    },
    {
      t: 7,
      def: `Profit booking is the closing of a winning position to turn unrealised profit into real money. It increases supply at higher prices after a rally and demand at lower prices after a fall.`,
      hi: `Profit booking ka matlab hai jeet wali position band karke unrealised profit ko asli paisa banana. Rally ke baad yeh upar ke price par supply badhata hai, aur girawat ke baad neeche ke price par demand.`,
      how: `After a sharp move, many traders hold open profit and fear giving it back, so they sell into strength. This often shows as a pause, a long upper wick or a small pullback after a strong candle. Option buyers book faster because time decay and falling IV can erase gains. It does not mean the trend has ended; it means the easy part of the move may be done.`,
      eg: {
        title: 'Call buyer books half',
        text: `A trader buys the 24,000 CE at ₹120 and it trades at ₹180. Gain = (180 − 120) × 65 = ₹3,900 per lot. Booking half the lots secures part of this, and the rest is trailed with a stop at cost. Charges ignored; illustrative.`,
      },
      tip: `Decide the profit-booking rule before entry. Deciding in the middle of a rally is when greed and fear both distort the choice.`,
      visual: {
        kind: 'bars',
        title: 'Staged exit on a ₹120 call (points gained)',
        unit: ' pts',
        items: [
          { label: 'Sell half at ₹180', value: 60, tone: 'bull' },
          { label: 'Trail the rest', value: 30, tone: 'gold' },
        ],
      },
    },
    {
      t: 8,
      def: `Defending a level means participants take actions that tend to keep price from crossing a strike or price zone. Writers may add hedges, roll positions or place orders near it. It is a tendency, not a guarantee.`,
      hi: `Level defend karne ka matlab hai participants aise action lete hain jo price ko kisi strike ya zone ke paar jaane se rokte hain. Writers hedge add kar sakte hain, positions roll kar sakte hain ya level ke paas orders laga sakte hain. Yeh ek tendency hai, guarantee nahi.`,
      how: `A strike with very high OI attracts attention because many participants hold positions there. Hedging flows near it can slow price, which is why such strikes are watched as potential support or resistance. But heavy OI is not a guarantee of a hold: if price crosses it with volume, writers can switch from defending to buying back, and the move can accelerate.`,
      eg: {
        title: 'Heavy call OI at 24,200',
        text: `The 24,200 CE has 1.2 crore units of OI while NIFTY trades at 24,050. Price stalls near 24,150 twice. A third approach on rising volume pushes through to 24,260, and writers who defended now buy back. The level held twice and failed once, which is typical.`,
      },
      tip: `Treat a high-OI strike as a zone to watch, not a wall. Plan both what you do if it holds and if it breaks.`,
      visual: {
        kind: 'oi',
        title: 'OI by strike (lakh units, illustrative)',
        caption: 'Biggest call OI sits at 24,200 and biggest put OI at 23,800: potential levels only.',
        spot: 24050,
        rows: [
          { strike: 23800, ce: 30, pe: 110 },
          { strike: 23900, ce: 40, pe: 85 },
          { strike: 24000, ce: 70, pe: 70 },
          { strike: 24100, ce: 85, pe: 40 },
          { strike: 24200, ce: 120, pe: 25 },
        ],
      },
    },
    {
      t: 9,
      def: `Participants change market expectations when new information or positioning shifts the price of risk. You can see it in implied volatility, in the put-call ratio and in how the option curve moves relative to spot.`,
      hi: `Jab nayi information aaye ya positioning badle toh participants market ki expectations badal dete hain. Yeh implied volatility, put-call ratio aur spot ke mukable option curve ke move mein dikhta hai.`,
      how: `If buyers pay up for puts, IV rises on the downside strikes and the skew steepens, which suggests demand for protection. A rising PCR can mean more put OI relative to call OI, but it can be hedging, writing or buying, so it is not a clean signal. India VIX shows expected volatility, not direction. Use these tools to describe the mood, not to forecast the next move.`,
      eg: {
        title: 'PCR from OI and volume',
        text: `Put OI is 90 lakh and call OI 75 lakh, giving an OI PCR of 90 / 75 = 1.2. Put volume is 40 lakh and call volume 50 lakh, giving a volume PCR of 0.8. The two readings disagree, which is a reminder that PCR depends on what you measure.`,
      },
      tip: `One indicator rarely tells the full story. If PCR, VIX and price all point the same way, the context is stronger; if they conflict, say so.`,
      visual: {
        kind: 'gauge',
        title: 'PCR reading (illustrative zones)',
        caption: 'Zones describe positioning, not direction.',
        min: 0,
        max: 2,
        value: 1.2,
        zones: [
          { from: 0, to: 0.7, label: 'Call-heavy', tone: 'gold' },
          { from: 0.7, to: 1.3, label: 'Balanced', tone: 'ice' },
          { from: 1.3, to: 2, label: 'Put-heavy', tone: 'gold' },
        ],
      },
      calc: { id: 'pcr', preset: { putOI: 9000000, callOI: 7500000, putVol: 4000000, callVol: 5000000 }, why: 'Computes the OI and volume PCR.' },
    },
    {
      t: 10,
      def: `Near expiry, behaviour changes because time value melts, gamma rises and positions are closed, rolled or settled. Index options in India are cash-settled European contracts, so positions are squared off or settled on expiry day.`,
      hi: `Expiry ke paas behaviour badal jaata hai kyunki time value pighalti hai, gamma badhta hai aur positions band, roll ya settle hoti hain. India mein index options cash-settled European contracts hain, isliye expiry par positions square off ya settle hoti hain.`,
      how: `As expiry nears, an ATM option's delta swings quickly with small moves in spot (high gamma), so writers hedge more often and moves can become sharp. Out-of-the-money options lose value quickly if the strike is not reached. Expiry-day volumes and the bid-ask spread behave differently from other days, so be careful with market orders. NSE index derivatives expire on Tuesdays as per the currently published schedule; check the NSE calendar for holidays.`,
      eg: {
        title: 'One-day expected move',
        text: `With NIFTY at 24,000 and India VIX at 14, the one-standard-deviation move for 1 day is about 24,000 × 0.14 × √(1/365) ≈ 176 points. A 24,200 CE with the index 200 points away needs more than that move, so expiry-day gamma can matter but is not guaranteed to deliver. Illustrative.`,
      },
      tip: `Expiry day offers fast moves and fast losses. Use smaller size and defined risk rather than assuming a pattern repeats.`,
      visual: {
        kind: 'curve',
        title: 'Gamma rises as expiry nears for ATM options',
        curve: 'gamma',
      },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: 'Shows the likely one-day range implied by VIX.' },
    },
  ],
}
export default m
