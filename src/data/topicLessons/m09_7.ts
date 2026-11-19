import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '9.7',
  intro:
    `Intraday traders do not need VIX to predict the day; they need it to size the day. This module shows how VIX and option IV can be used through the trading session: before the open, during the opening burst, in consolidations, on breakouts and breakdowns, on expiry day, and in combination with OI, premiums and Greeks to filter trades. VIX is a context tool, not a signal. Numbers are illustrative Black-Scholes values (Nifty 24,000, rate 6.5%, lot 65 - check the current NSE contract specification; NIFTY weekly expiry is currently on Tuesday as per NSE).`,
  introHi:
    `Intraday traders ko VIX se din predict nahi karna hota, din ka size samajhna hota hai. Is module mein dekhenge ki VIX aur option IV session ke dauran kaise use ho sakte hain: open se pehle, opening burst mein, consolidation mein, breakout aur breakdown par, expiry day par, aur OI, premium aur Greeks ke saath trades filter karne ke liye. VIX context tool hai, signal nahi. Numbers illustrative Black-Scholes values hain (Nifty 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein; NIFTY weekly expiry abhi NSE ke hisaab se Tuesday ko hai).`,
  steps: {
    concept:
      `Within a day, India VIX tells you how big a move the options market is pricing and whether that expectation is rising or falling. Used well, it sets realistic targets and stop sizes, warns you when premiums are expensive, and helps you decide whether a breakout is being believed by the options market. It does not tell you direction, and its intraday changes are small compared with price, so it is a filter and not a trigger.`,
    conceptHi:
      `Din ke andar India VIX batata hai ki options market kitna bada move price kar raha hai aur yeh expectation badh rahi hai ya ghat rahi hai. Sahi tarah use karein toh yeh realistic target aur stop size set karne mein, premium mehnge hone par warning dene mein, aur breakout ko options market maan raha hai ya nahi, yeh dekhne mein madad karta hai. Yeh direction nahi batata, aur intraday change price ke comparison mein chhote hote hain, isliye yeh filter hai, trigger nahi.`,
    mechanism:
      `Three links matter. First, VIX sets the size of the day: one-day expected move = Spot × VIX × √(1/365). Second, VIX direction during a move shows whether options traders are paying up: a breakout with rising VIX is being "bought" by the options market, while a breakout with falling VIX is less convincing. Third, option premium reacts to VIX through vega, to time through theta and to spot through delta and gamma, so a rise in VIX can change a premium by as much as a small spot move. India VIX is a 30-day measure; near-expiry option IV can behave differently from it.`,
    example: {
      title: 'Using VIX to size an intraday stop (illustrative)',
      text: `Spot 24,000. At VIX 14 the one-day expected move is about 175.87 points; at VIX 24 about 301.49 points. If a trader uses half of the expected daily move as the stop distance, that is about 87.94 points at VIX 14 and about 150.75 points at VIX 24. With ₹20,00,000 capital risking 1% (₹20,000), the position is 3 lots at VIX 14 and 2 lots at VIX 24, because the stop is wider.`,
    },
    chart: {
      kind: 'timeline',
      title: 'VIX through an intraday session',
      caption: 'A checklist for each phase of the day, not a prediction of what VIX will do.',
      events: [
        { when: 'Before open', what: 'Note previous VIX close, global cues, GIFT Nifty and scheduled events', tone: 'ice' },
        { when: 'Opening burst', what: 'IV and spreads are noisy; wait for them to settle', tone: 'gold' },
        { when: 'Midday', what: 'Consolidation: premiums decay, VIX tends to drift', tone: 'neutral' },
        { when: 'Breakout / breakdown', what: 'Check if VIX confirms the move', tone: 'gold' },
        { when: 'Close', what: 'On expiry days, gamma and theta dominate the last hours', tone: 'ice' },
      ],
    },
    optionChain:
      `Keep the option chain open next to VIX. Watch ATM IV and the ATM straddle: if the straddle price rises while spot is flat, IV is rising. Compare the same-strike premium across the day, not just the LTP. Check bid-ask spreads at the strikes you intend to trade, especially in the first minutes and on expiry day when quotes can be wide. Strike-wise IV near the money tells you more about the weekly options you trade than the 30-day VIX does.`,
    psychology:
      `Intraday traders are tempted to treat every VIX tick as news. Most of it is noise. The more useful habit is to define in advance what VIX level or change will make you trade smaller, skip a setup, or take profit sooner. Emotions peak in the opening and closing minutes, when VIX, premiums and spreads move fastest, so rules that you set before the open protect you from decisions made in the heat of the move.`,
    scenarios: {
      bullish:
        `A bullish breakout with VIX stable or falling is calm and orderly; calls gain mainly on delta. A breakout with rising VIX is faster but costlier: calls gain more, and so do the risk and the chance of a sharp reversal. Do not chase a call whose IV has already jumped.`,
      bearish:
        `A breakdown with rising VIX is typical: puts gain on delta and vega. A breakdown with flat VIX is orderly and puts gain on delta alone. If VIX spikes and the index stops falling, put premiums can deflate quickly.`,
      sideways:
        `In consolidation with flat VIX, option buyers face time decay hour after hour and sellers benefit as long as price stays within range. A sudden VIX rise inside a range is a warning that a move may be near, not a promise.`,
    },
    practice: [
      {
        q: `Previous VIX close was 14.0 and the market opens with VIX at 15.4. What is the percentage change, and how does the one-day expected move change from 24,000?`,
        a: `Change = (15.4 − 14.0) / 14.0 = 10%. One-day move at 14: 24,000 × 0.14 × √(1/365) = about 175.87 points. At 15.4: about 193.46 points, an increase of about 17.59 points.`,
      },
      {
        q: `At VIX 24 the one-day expected move is 301.49 points. A trader uses half of it as stop distance. What stop distance results, and how many lots can be held if risk is ₹20,000 and lot size is 65?`,
        a: `Stop = 301.49 / 2 = 150.745 points. Risk per lot = 150.745 × 65 = ₹9,798.43. Lots = 20,000 / 9,798.43 = 2.04, so 2 whole lots (total risk about ₹19,597).`,
      },
      {
        q: `A 24,100 CE with 1 day left costs ₹32.57 with spot at 24,000 and IV 14%. After a breakout, spot is 24,100 and IV is 15.5%, and the call costs ₹80.16. What is the total gain per lot of 65, and how much of it came from the IV rise (spot 24,100 at IV 14% is ₹72.61)?`,
        a: `Total gain = 80.16 − 32.57 = ₹47.59 per unit; × 65 = ₹3,093.35. IV part = 80.16 − 72.61 = ₹7.55 per unit; × 65 = ₹490.75, about 16% of the gain.`,
      },
      {
        q: `ATM vega with 2 days left is ₹7.08 per IV point and theta is about −₹26.97 per day. How many VIX points must rise to offset one day of theta, other things equal?`,
        a: `26.97 / 7.08 = about 3.8 IV points. A call buyer needs a large rise in IV, or a spot move, to offset a single day of decay near expiry.`,
      },
    ],
    assignment:
      `For five trading days, note India VIX at 9:20, 12:00 and 15:00, plus Nifty at the same times and the ATM straddle price for the nearest weekly expiry. For each day, write whether VIX moved with, against or independently of Nifty, and compare the day's actual high-low range with the one-day expected move from the morning VIX. Summarise in four lines.`,
  },
  topics: [
    {
      t: 1,
      def: `Before the market opens, VIX gives you context from the previous day: the last close shows how nervous the options market was. It cannot give a fresh intraday reading until the new session's option quotes are available.`,
      hi: `Market khulne se pehle VIX ka previous close batata hai ki kal options market kitna nervous tha. Naye session ke option quotes aane tak fresh intraday reading nahi milti.`,
      how: `India VIX is computed from live NIFTY option quotes, so the number you can check before the open is the previous day's close. Use it with other pre-open inputs: GIFT Nifty, US and Asian markets, crude oil, the rupee and the event calendar (RBI policy, Budget, results, US data). If a big event is due, assume option premiums already include a risk premium, and think about position size before direction. After the open, the first VIX prints can jump around as quotes settle.`,
      eg: {
        title: 'Planning with last night\'s VIX (illustrative)',
        text: `Previous close VIX 14.0. Global markets fell overnight and Nifty is expected to open about 0.7% lower. The one-day expected move at VIX 14 is about 175.87 points, and 0.7% of 24,000 is 168 points, nearly the entire expected daily range in the first minute. The trader decides to trade half the usual size and wait for VIX and spreads to settle.`,
      },
      tip: `Pre-open, VIX tells you yesterday's mood, not today's. Decide your size and rules first, then watch what the open actually does.`,
      visual: {
        kind: 'flow',
        title: 'A pre-open routine with VIX',
        caption: 'Context first, trade second.',
        steps: [
          { label: 'Yesterday\'s VIX close', note: 'Level and change', tone: 'ice' },
          { label: 'Global cues, GIFT Nifty', note: 'Likely gap size', tone: 'ice' },
          { label: 'Event calendar', note: 'Is an event today?', tone: 'gold' },
          { label: 'Decide size and rules', note: 'Before the bell', tone: 'gold' },
        ],
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 14, days: 1 },
        why: 'Compare the expected day range with the likely gap at the open.',
      },
    },
    {
      t: 2,
      def: `The opening phase is the first few minutes after 9:15, when prices, spreads and IV are most unsettled. VIX and option premiums can jump around before they settle.`,
      hi: `Opening phase 9:15 ke baad ke pehle kuch minute hote hain jab prices, spreads aur IV sabse zyada unsettled hote hain. VIX aur option premium settle hone se pehle idhar-udhar jump kar sakte hain.`,
      how: `Overnight news is digested all at once, orders from both retail and institutions meet, and option market makers widen quotes until they are comfortable. VIX can open higher or lower than the previous close and then drift. Wide bid-ask spreads mean market orders can fill at poor prices. Many traders wait 10 to 15 minutes and watch whether VIX keeps rising, steadies or fades before taking a view.`,
      eg: {
        title: 'A nervous open (illustrative)',
        text: `VIX opens at 15.4 against a 14.0 close. The 1-day 24,000 straddle moves from about ₹140.35 to about ₹154.38, a rise of ₹14.03 per unit (about ₹912 per lot of 65), before Nifty has moved at all. Someone who buys the straddle at the open pays the extra for that nervousness; if VIX settles back to 14, that part of the premium disappears.`,
      },
      tip: `The first minutes are for observing. Wide spreads and jumpy IV make entries costly; use limit orders if you must trade.`,
      visual: {
        kind: 'bars',
        title: '1-day ATM straddle before and after a VIX jump at the open (illustrative)',
        caption: 'Spot is unchanged at 24,000.',
        unit: ' ₹',
        items: [
          { label: 'VIX 14.0', value: 140.35, tone: 'ice' },
          { label: 'VIX 15.4', value: 154.38, tone: 'gold' },
        ],
      },
      calc: {
        id: 'straddle-move',
        preset: { spot: 24000, cePrice: 77.19, pePrice: 77.19, strike: 24000 },
        why: 'Read the implied move from the 1-day straddle at VIX 15.4 (illustrative even split of 154.38).',
      },
    },
    {
      t: 3,
      def: `During consolidation, price trades in a narrow range for a long time. VIX usually drifts lower or stays flat, and option premiums mainly lose time value.`,
      hi: `Consolidation mein price kaafi der ek tight range mein rehta hai. VIX aam taur par thoda gir jaata hai ya flat rehta hai, aur option premium zyadatar time value kho deta hai.`,
      how: `With no direction, demand for options fades and IV eases. Time decay accelerates as the day goes on, so an option bought in the morning and held through a quiet midday loses value even if nothing happens. A flat or falling VIX during consolidation does not predict the breakout direction. A VIX that starts rising while price is still inside the range can be an early hint that traders are buying premium in anticipation, but that is a hint to watch, not to trade blind.`,
      eg: {
        title: 'Premium melting in a range (illustrative)',
        text: `Spot sits at 24,000 with VIX at 14. A 1-day 24,000 CE is worth about ₹72.31 in the morning. With half a day left and spot and IV unchanged, it is worth about ₹50.69, a fall of ₹21.62 per unit (about ₹1,405 per lot of 65). With a quarter-day left it is about ₹35.62, down another ₹15.07. Nothing moved except the clock.`,
      },
      tip: `Buying options into a lunchtime range is paying theta for no reason. Wait for the move to start, or size for the decay.`,
      visual: {
        kind: 'candles',
        title: 'Intraday consolidation',
        caption: 'Narrow range, flat VIX; premiums decay hour by hour.',
        pattern: 'range',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 0.5, iv: 14, rate: 6.5 },
        why: 'Reprice the call with half a day left and compare with one day left.',
      },
    },
    {
      t: 4,
      def: `On a breakout above resistance, VIX confirms or fails to confirm the move: a rising VIX means options traders are paying up for movement, while a falling or flat VIX means the move is being treated calmly.`,
      hi: `Resistance ke upar breakout par VIX move ko confirm ya fail karta hai: VIX badh raha hai toh options traders movement ke liye zyada paise de rahe hain, aur VIX gir raha ya flat hai toh move ko shaanti se liya ja raha hai.`,
      how: `A breakout with rising VIX draws more participation, premiums on calls rise on delta and vega, but spreads widen and false breakouts can reverse fast. A breakout with falling VIX is often more orderly and sustained, but calls gain less on the volatility side. VIX alone neither confirms nor denies a breakout; combine it with volume, price follow-through and OI around the broken strike. Always define in advance what you will do if the breakout fails.`,
      eg: {
        title: 'A 100-point breakout (illustrative)',
        text: `The 24,100 CE with 1 day left costs about ₹32.57 at spot 24,000, IV 14%. After a breakout to 24,100 with IV still 14% it is worth about ₹72.61. If VIX also rises so that IV is 15.5%, it is about ₹80.16, which means ₹7.55 per unit (about ₹491 per lot of 65) came from IV. Total gain is ₹47.59 per unit, about ₹3,093 per lot.`,
      },
      tip: `A breakout that comes with a big VIX jump can mean you are paying peak premium. Check if the spot move still leaves you a profit if IV settles back.`,
      visual: {
        kind: 'candles',
        title: 'Breakout',
        caption: 'Watch whether VIX rises with the move or stays calm.',
        pattern: 'breakout',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24100, strike: 24100, days: 1, iv: 15.5, rate: 6.5 },
        why: 'Price the 24,100 CE at IV 14 and at 15.5 after the breakout.',
      },
    },
    {
      t: 5,
      def: `On a breakdown below support, VIX usually rises as put buying and hedging increase. A rising VIX with a falling index is the typical pairing; a falling index with a flat VIX is a calmer breakdown.`,
      hi: `Support ke neeche breakdown par VIX aam taur par badhta hai kyunki put buying aur hedging badhti hai. Index girte waqt VIX ka badhna typical pairing hai; index girte waqt VIX flat rehna calm breakdown hota hai.`,
      how: `Falls attract hedgers and speculators to puts, so put IV rises faster than call IV and skew steepens. Put buyers gain from delta and vega together, but entry after the VIX jump is expensive. If the index stops falling and VIX starts cooling, put premiums can shrink even if the index stays below the broken level. Sellers of puts in a breakdown face rising margins and fast losses, which can add to the move.`,
      eg: {
        title: 'A 100-point breakdown (illustrative)',
        text: `The 23,900 PE with 1 day left costs about ₹29.89 at spot 24,000, IV 14%. After a breakdown to 23,900 with IV at 14% it is worth about ₹67.76. If VIX rises so that IV is 16%, it is about ₹77.73, with ₹9.97 per unit (about ₹648 per lot of 65) from IV alone. Total gain is ₹47.84 per unit, about ₹3,110 per lot.`,
      },
      tip: `In a breakdown both direction and VIX favour the put, but late entries pay for both. Decide your exit before you enter.`,
      visual: {
        kind: 'candles',
        title: 'Breakdown',
        caption: 'Put premiums gain on delta and, usually, on a rising VIX.',
        pattern: 'breakdown',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'PE', spot: 23900, strike: 23900, days: 1, iv: 16, rate: 6.5 },
        why: 'Price the 23,900 PE at IV 14 and at 16 after the breakdown.',
      },
    },
    {
      t: 6,
      def: `On expiry day, time left is very short, so gamma and theta dominate. India VIX is a 30-day measure and does not describe what is happening to the expiring options, whose own IV can behave very differently.`,
      hi: `Expiry day par time bahut kam bacha hota hai, isliye gamma aur theta dominate karte hain. India VIX 30-din ka measure hai aur expiring options mein kya ho raha hai woh nahi batata; unki apni IV bahut alag behave kar sakti hai.`,
      how: `NSE index options are European and cash-settled, and NIFTY weekly expiry is currently on Tuesday as per NSE; check the current contract specification. In the last hours, ATM options lose time value extremely fast and gain or lose rapidly with small spot moves, because gamma is high. Premiums can double or collapse within minutes. Spreads widen, and stop orders can slip. Use the expiring strike's own IV and the ATM straddle on the chain, not VIX, for pricing, and cut size accordingly.`,
      eg: {
        title: 'Six hours left versus seven days left (illustrative)',
        text: `At IV 14% the 24,000 CE costs about ₹35.62 with 6 hours (0.25 day) left. If spot rises 50 points to 24,050 it is worth about ₹66.40, a gain of ₹30.78 per unit, or 86%. With 7 days left, the same 50-point rise takes the call from about ₹200.85 to about ₹228.38, a 13.7% gain. The ATM gamma with a quarter-day left (0.00454) is about 5.3 times that at 7 days (0.00086).`,
      },
      tip: `Expiry-day percentage swings are huge because the base premium is tiny. A big percentage gain on a tiny premium is easy to lose back just as fast.`,
      visual: {
        kind: 'curve',
        title: 'Gamma rises sharply near expiry for ATM options',
        caption: 'High gamma makes delta swing quickly; premiums react more to each point of spot.',
        curve: 'gamma',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 0.25, iv: 14, rate: 6.5 },
        why: 'See gamma and theta for an ATM call with a quarter-day left.',
      },
    },
    {
      t: 7,
      def: `VIX plus OI combines the volatility mood with where positions are concentrated. OI shows open contracts at strikes; VIX shows how much movement is being priced. Neither tells you who initiated a trade.`,
      hi: `VIX plus OI volatility ke mood ko is baat ke saath jodta hai ki positions kahan concentrated hain. OI strikes par open contracts dikhata hai; VIX dikhata hai ki kitna movement price ho raha hai. Dono mein se koi bhi yeh nahi batata ki trade kisne initiate kiya.`,
      how: `High OI at a strike is a potential reference level, not a guaranteed support or resistance. When VIX is low and OI is heavy on one side at a nearby strike, the market may be treating that level as sticky, but a VIX rise can mean positions are being repriced or hedged. A large OI change plus a VIX jump may point to fresh hedging or repositioning. OI alone cannot show who initiated the trade, and option OI cannot be read like futures build-up rules.`,
      eg: {
        title: 'Heavy CE OI with rising VIX (illustrative)',
        text: `Nifty is near 24,100. The 24,200 CE shows OI up by 12,00,000 units (about 18,462 lots of 65) while VIX rises from 14 to 15. This could be writers adding at 24,200 or buyers adding calls; OI cannot tell which. The rising VIX says the market is paying more for movement. The trader treats 24,200 as a level to watch with extra care, not as a wall.`,
      },
      tip: `Combine, do not conclude. VIX plus OI gives context for levels; it does not identify who is right.`,
      visual: {
        kind: 'oi',
        title: 'Illustrative OI strip near spot',
        caption: 'Heavy CE OI at 24,200 and PE OI at 23,900; read with VIX and price, not alone.',
        spot: 24100,
        rows: [
          { strike: 23900, ce: 520000, pe: 1450000 },
          { strike: 24000, ce: 880000, pe: 1120000 },
          { strike: 24100, ce: 1010000, pe: 760000 },
          { strike: 24200, ce: 1620000, pe: 430000 },
          { strike: 24300, ce: 1150000, pe: 250000 },
        ],
      },
    },
    {
      t: 8,
      def: `VIX plus premium combines volatility with option prices. The ATM straddle price gives the expected move; VIX tells you if that expectation is rising or falling.`,
      hi: `VIX plus premium volatility ko option prices ke saath jodta hai. ATM straddle price expected move deta hai; VIX batata hai ki yeh expectation badh rahi hai ya ghat rahi hai.`,
      how: `The ATM straddle is roughly 80% of the one-standard-deviation move for its remaining time, so intraday you can read the expected range directly from the chain. If spot moves little but the straddle price rises, IV is rising. If spot moves a lot but the straddle price falls, IV is falling or time is passing faster than movement. Comparing the straddle with how far price has actually travelled shows whether the day's range is already "used up".`,
      eg: {
        title: 'Straddle against the day\'s travel (illustrative)',
        text: `With 1 day left, the 24,000 straddle costs about ₹140.35 at IV 14%, close to 0.8 × 175.87 = 140.70. If Nifty has already travelled 150 points by midday, the day's range has used most of what the market priced. If IV rises to 17%, the straddle becomes about ₹170.41, up ₹30.06 per unit (about ₹1,954 per lot of 65).`,
      },
      tip: `The straddle is a live scoreboard of expected movement. Compare it to how far the market has moved before chasing more.`,
      visual: {
        kind: 'bars',
        title: '1-day 24,000 straddle at two IV levels (illustrative)',
        caption: 'Roughly 0.8 times the one-day expected move.',
        unit: ' ₹',
        items: [
          { label: 'IV 14%', value: 140.35, tone: 'ice' },
          { label: 'IV 17%', value: 170.41, tone: 'gold' },
        ],
      },
      calc: {
        id: 'straddle-move',
        preset: { spot: 24000, cePrice: 70.18, pePrice: 70.17, strike: 24000 },
        why: 'Read the implied one-day move from the 140.35 straddle (illustrative even split).',
      },
    },
    {
      t: 9,
      def: `VIX plus Greeks means reading how a change in volatility interacts with vega, theta, delta and gamma in your option. VIX rising helps vega; time passing hurts theta; spot moving works through delta and gamma.`,
      hi: `VIX plus Greeks ka matlab hai samajhna ki volatility ka badlav aapke option ke vega, theta, delta aur gamma ke saath kaise interact karta hai. VIX badhna vega ko help karta hai; time guzarna theta ko hurt karta hai; spot hilna delta aur gamma ke through kaam karta hai.`,
      how: `Close to expiry, theta and gamma are large and vega is small, so a VIX move matters less than spot and time. With more time left, vega is larger and VIX matters more. Before buying, compare how many IV points are needed to offset one day of theta, and how many points of spot are needed to do the same. That turns vague hopes into numbers you can check against the chain.`,
      eg: {
        title: 'Two days left, ATM call (illustrative)',
        text: `At IV 14% with 2 days left: price about ₹103.54, delta 0.516, gamma 0.0016, theta about −₹26.97 per day, vega about ₹7.08 per IV point. One day of theta needs about 26.97 / 7.08 = 3.8 IV points to offset, or roughly 26.97 / 0.516 = 52 points of favourable spot move. Both are large relative to a typical intraday VIX change of well under a point.`,
      },
      tip: `Intraday VIX moves are usually small compared with theta near expiry. Rely on spot movement for short-dated options and on vega for longer-dated ones.`,
      visual: {
        kind: 'compare',
        title: 'Which Greek dominates?',
        caption: 'Near expiry versus with time left.',
        left: { head: 'Near expiry (hours to 2 days)', tone: 'gold', points: ['Theta and gamma are large', 'Vega is small', 'VIX changes matter little', 'Spot and time decide the result'] },
        right: { head: 'More time left (weeks)', tone: 'ice', points: ['Vega is larger', 'Theta is smaller per day', 'VIX changes matter more', 'Direction and volatility both count'] },
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 2, iv: 14, rate: 6.5 },
        why: 'Read delta, gamma, theta and vega for the 2-day ATM call.',
      },
    },
    {
      t: 10,
      def: `VIX-based trading filters are simple rules that use VIX to decide whether to trade, how big to trade and how wide the stop should be. They keep you from using one set of rules in every volatility condition.`,
      hi: `VIX-based trading filters simple rules hote hain jo VIX se decide karte hain ki trade karna hai ya nahi, kitna bada, aur stop kitna door. Yeh aapko har volatility condition mein ek hi rules use karne se bachate hain.`,
      how: `Examples of filters: scale the stop distance to a fraction of the one-day expected move; reduce the lot count when VIX is high; skip option buying when VIX has just jumped sharply; avoid selling naked options when VIX is rising fast; accept smaller targets when VIX is low. Test any filter on past data before using it with money, and keep the numbers modest, since the thresholds are your choice and no threshold is official. Filters protect the process; they do not remove risk.`,
      eg: {
        title: 'Stop and size scale with VIX (illustrative)',
        text: `Rule: stop = half of the one-day expected move, risk 1% of ₹20,00,000 = ₹20,000. At VIX 14 the stop is about 87.94 points; risk per lot is about ₹5,716; 20,000 / 5,716 = 3.5, so 3 lots. At VIX 24 the stop is about 150.75 points; risk per lot is about ₹9,798; 20,000 / 9,798 = 2.04, so 2 lots. The rule automatically trades smaller in a more volatile market.`,
      },
      tip: `Write the filter before the session. A rule made during a fast market is usually a rationalisation.`,
      visual: {
        kind: 'matrix',
        title: 'A simple VIX filter grid (illustrative rules)',
        caption: 'Thresholds are examples for you to test, not official rules.',
        xLabels: ['VIX falling or flat', 'VIX rising'],
        yLabels: ['VIX level low / normal', 'VIX level high'],
        cells: [
          { head: 'Normal size', note: 'Standard stops and targets', tone: 'ice' },
          { head: 'Smaller size', note: 'Watch for expansion; avoid chasing', tone: 'gold' },
          { head: 'Reduced size', note: 'Wide stops; premium is dear', tone: 'gold' },
          { head: 'Minimum size or skip', note: 'Fast, costly, gap-prone', tone: 'gold' },
        ],
      },
      calc: {
        id: 'position-size',
        preset: { capital: 2000000, riskPct: 1, entry: 24000, stop: 23912.06, lotSize: 65 },
        why: 'Size the position with a stop equal to half the VIX-14 expected daily move.',
      },
    },
  ],
}

export default m
