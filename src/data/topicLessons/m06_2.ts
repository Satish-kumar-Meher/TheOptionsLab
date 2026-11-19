import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '6.2',
  intro:
    `Delta tells you how much an option's premium is expected to change when the index moves by one point, and, in the same breath, how much directional exposure the option carries. It is the first Greek every trader learns because it links the option back to the index you are actually watching. Examples use NIFTY at 24,000, 7 days to expiry, India VIX/IV 14%, rate 6.5%, lot 65 (check the current NSE contract specification) and Black-Scholes model values, which are illustrative and differ from live premiums.`,
  introHi:
    `Delta batata hai ki index ek point hilne par option ka premium kitna badalne ki ummeed hai, aur saath hi option kitni directional exposure rakhta hai. Yeh sabse pehla Greek hai kyunki yeh option ko us index se jodta hai jise aap actually dekh rahe ho. Examples NIFTY 24,000, expiry mein 7 din, IV 14%, rate 6.5%, lot 65 (current NSE contract specification check karein) aur Black-Scholes model values par hain, jo illustrative hain aur live premium se alag hote hain.`,
  steps: {
    concept:
      `Delta is the approximate change in an option's premium for a one-point change in the underlying, everything else held equal. A call with delta 0.53 gains about ₹0.53 per unit when NIFTY rises one point. Calls have delta between 0 and +1, puts between -1 and 0. For the buyer the sign is as listed; for the seller it flips. Delta is a local estimate: it is accurate for small moves and drifts as the index, time and volatility change.`,
    conceptHi:
      `Delta ek point index move par option premium ke approximate change ko kehte hain, baaki sab cheezein same maan kar. 0.53 delta wala call index ek point badhne par lagbhag ₹0.53 per unit kamata hai. Call ka delta 0 se +1 ke beech, put ka -1 se 0 ke beech hota hai. Buyer ke liye sign yahi rehta hai, seller ke liye ulta ho jata hai. Delta chhote moves ke liye theek hai; index, time aur volatility badalne par yeh khud badalta rehta hai.`,
    mechanism:
      `In the Black-Scholes model, call delta is N(d1) and put delta is N(d1) - 1, where N is the standard normal cumulative distribution and d1 grows when the option is deeper in the money, when volatility is lower or when time is shorter. An option's market maker on NSE hedges the delta of the options they sell by trading NIFTY futures, so delta also describes how many index units a dealer must hold against one contract. Position delta = option delta x signed quantity (+ for long, - for short). Because delta changes with spot, a hedge or a view built on delta has to be reviewed as the market moves; that rate of change is gamma (module 6.3).`,
    example: {
      title: 'A 50-point rally on the 24,000 CE (model values)',
      text: `NIFTY 24,000, 7 days, IV 14%, r 6.5%. The 24,000 CE is worth about ₹200.85 with delta 0.5295. If NIFTY rises 50 points to 24,050 (time and IV unchanged), the model value becomes about ₹228.38, a gain of ₹27.54 per unit. Delta alone predicted 0.5295 x 50 = ₹26.47. For one lot of 65 the gain is about 27.54 x 65 = ₹1,790. The small gap is delta rising from 0.53 to 0.57 during the move.`,
    },
    chart: {
      kind: 'curve',
      title: 'Delta versus index level',
      caption: 'Call delta is an S-shaped curve from 0 (far OTM) to 1 (deep ITM), passing near 0.5 at the money.',
      curve: 'delta',
    },
    optionChain:
      `Many broker chains show a Delta column beside each strike (it is often computed by the platform, not published by NSE, so check which IV and model it uses). Reading down the call side from the lowest strike, delta falls from near 1 to near 0; on the put side it rises in absolute value as strikes go up. The strike where call delta is close to 0.5 is the at-the-money region. OI and volume columns do not contain delta information, and delta shown on a chain is a model estimate, not a traded quantity.`,
    psychology:
      `Beginners read delta as a probability: a 0.20 delta option "has a 20% chance" and therefore looks like a cheap lottery ticket. It is a sensitivity first and only a loose probability proxy second. Sellers like low-delta strikes because they seem safe, but a quick move can double a small delta within hours. Traders who hedge delta can feel neutral and become careless about the gamma, theta and vega that remain.`,
    scenarios: {
      bullish:
        `Long calls and short puts carry positive delta. With NIFTY +100 points, a long 24,200 CE (delta 0.36) may gain roughly ₹36 per unit in a first-order estimate, about ₹2,340 per lot, and more if delta rises during the move. A short put also gains on a rally but carries downside risk if the rally fails.`,
      bearish:
        `Long puts and short calls carry negative delta. With NIFTY -100 points, a long 24,000 PE (delta -0.47) may gain roughly ₹47 per unit in a first-order estimate, about ₹3,058 per lot. A short call also benefits from a fall, but only up to the premium collected.`,
      sideways:
        `A delta-neutral book, such as one hedged with futures, has little directional exposure, so a quiet market changes its value mainly through time decay and volatility. A sharp breakout, up or down, changes delta quickly and the neutral position becomes directional again.`,
    },
    practice: [
      {
        q: `A 24,200 CE has delta 0.36 and premium ₹113.55. Estimate its premium if NIFTY rises 40 points, and the gain for one lot of 65.`,
        a: `Change = 0.36 x 40 = ₹14.40 per unit, so the premium is about 113.55 + 14.40 = ₹127.95. One lot: 14.40 x 65 = ₹936. Gamma and time would adjust this slightly.`,
      },
      {
        q: `You are short 3 lots of a 24,000 PE with delta -0.47. What is your position delta in index units?`,
        a: `The put's delta is -0.47; being short flips the sign to +0.47. Units = 3 x 65 = 195. Position delta = 0.47 x 195 = +91.65 units, i.e. net long exposure of about 91.65 NIFTY units.`,
      },
      {
        q: `The 24,200 CE has delta 0.36 with 7 days left but 0.13 with 1 day left (same spot and IV). Why?`,
        a: `With one day left the index is much less likely to travel the 200 points to the strike, so the option's sensitivity to the index falls. Model values: 0.3617 at 7 days versus 0.1347 at 1 day.`,
      },
      {
        q: `You are long 3 lots of the 24,400 CE (delta 0.2181). How many futures lots would you sell to be delta-neutral, and is that possible exactly?`,
        a: `Delta = 0.2181 x 3 x 65 = 42.53 units. One futures lot is 65 units, so the exact hedge is 42.53 / 65 = 0.65 lot, which cannot be traded. Selling one lot overshoots to 42.53 - 65 = -22.47 units of net delta.`,
      },
    ],
    assignment:
      `Open the Greeks calculator at spot 24,000, IV 14%, rate 6.5%. For five strikes (23,800 to 24,400) record call and put delta at 7 days and at 1 day. Check that call delta minus put delta at each strike is close to 1. Then pick one position (two or three legs), compute its net delta in index units by hand and compare with the portfolio-delta calculator. Write three sentences on what would happen to that delta if NIFTY moved 150 points.`,
  },
  topics: [
    {
      t: 1,
      def: `Delta is the approximate change in an option's price for a one-point change in the underlying index, other factors unchanged. It measures the option's sensitivity to direction. If a call has delta 0.50, its premium rises about ₹0.50 when NIFTY rises by one point.`,
      hi: `Delta ek point index move par option ki price mein approximate change hai, baaki factors same rehne par. Yeh batata hai ki option direction ke prati kitna sensitive hai. Agar call ka delta 0.50 hai, toh NIFTY ek point badhne par premium lagbhag ₹0.50 badhta hai.`,
      how: `Delta is the first partial derivative of the option value with respect to the index level. In practice you multiply it by the index move to get a quick estimate of the premium change, and by lot size to get rupees per lot. Exchanges do not set delta: brokers and data vendors compute it from a pricing model using spot, strike, time, rate and implied volatility. Because the model inputs change every second, so does delta. It is a snapshot, not a fixed property of a strike.`,
      eg: {
        title: 'Delta of the 24,000 CE at 24,000 (model, illustrative)',
        text: `7 days to expiry, IV 14%, rate 6.5%: the 24,000 CE is about ₹200.85 and delta is 0.5295. A rise of 10 points suggests a premium gain of about 0.5295 x 10 = ₹5.30 per unit, which for one lot of 65 is about 5.30 x 65 = ₹344. A fall of 10 points suggests a similar loss for the buyer.`,
      },
      tip: `Delta answers "how much will the premium move for each index point?", not "will the index go up?". It says nothing about direction by itself.`,
      visual: {
        kind: 'compare',
        title: 'One index point, two prices',
        caption: 'Illustrative model values, 24,000 CE, 7 days, IV 14%.',
        left: { head: 'NIFTY index', tone: 'ice', points: ['+1 point', 'Scale: 24,000', 'The thing you watch'] },
        right: { head: '24,000 CE premium', tone: 'gold', points: ['About +₹0.53', 'Scale: ₹200.85', 'That ratio is delta 0.53'] },
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 },
        why: 'Shows the model price and delta of the example; change spot to see delta move.',
      },
    },
    {
      t: 2,
      def: `A call option gains when the index rises, so its delta is positive and lies between 0 and +1. A far out-of-the-money call has delta near 0, an at-the-money call near 0.5, and a deep in-the-money call near 1.`,
      hi: `Call option tab kamata hai jab index badhta hai, isliye uska delta positive hota hai aur 0 se +1 ke beech rehta hai. Bahut OTM call ka delta 0 ke paas, ATM call ka 0.5 ke paas aur deep ITM call ka 1 ke paas hota hai.`,
      how: `Black-Scholes call delta is N(d1), a probability-like number between 0 and 1. A deep ITM call moves almost one-for-one with the index because it is nearly certain to be exercised, so it behaves like a position in the index itself. A far OTM call barely responds because the index is unlikely to reach the strike. For a seller of the call, the same figures apply with a negative sign. Note that this is the delta of the option; your position delta also depends on lots and on whether you are long or short.`,
      eg: {
        title: 'Call deltas down the 7-day ladder (model, illustrative)',
        text: `NIFTY 24,000, 7 days, IV 14%. The 23,600 CE has delta 0.8266, 24,000 CE 0.5295, 24,200 CE 0.3617 and 24,400 CE 0.2181. Buying one lot of the 24,000 CE gives you about 0.5295 x 65 = 34.4 units of index exposure; one lot of the 24,400 CE gives about 0.2181 x 65 = 14.2 units.`,
      },
      tip: `Higher call delta means more index-like behaviour and a higher premium. Compare delta per rupee of premium before choosing, not delta alone.`,
      visual: {
        kind: 'bars',
        title: 'Call delta by strike',
        caption: 'Model values at NIFTY 24,000, 7 days, IV 14%.',
        items: [
          { label: '23,600 CE', value: 0.8266, tone: 'gold' },
          { label: '24,000 CE', value: 0.5295, tone: 'gold' },
          { label: '24,200 CE', value: 0.3617, tone: 'gold' },
          { label: '24,400 CE', value: 0.2181, tone: 'gold' },
        ],
      },
    },
    {
      t: 3,
      def: `A put option gains when the index falls, so its delta is negative and lies between -1 and 0. At the same strike and expiry, call delta minus put delta is about 1 for European options without dividends.`,
      hi: `Put option tab kamata hai jab index girta hai, isliye uska delta negative hota hai aur -1 se 0 ke beech rehta hai. Same strike aur expiry par call delta minus put delta lagbhag 1 hota hai (European option, bina dividend ke).`,
      how: `Put delta = call delta - 1 in the Black-Scholes model. A deep ITM put sits near -1: when the index falls one point, the put gains about one point. A far OTM put has delta near 0. A long put therefore has negative position delta (it gains when the index falls), while a short put has positive position delta, because the writer gains when the index rises. NSE index options are European and cash-settled, so this relationship is a good fit; real chains add dividends and skew, so the sum can differ a little.`,
      eg: {
        title: 'Put deltas and the call-put link (model, illustrative)',
        text: `NIFTY 24,000, 7 days, IV 14%. The 24,000 PE has delta -0.4705 and the 24,000 CE has 0.5295; 0.5295 - (-0.4705) = 1.0000. The 23,800 PE has delta -0.3066. A buyer of 2 lots of it holds about -0.3066 x 130 = -39.9 units of delta, so a 50-point fall would give a first-order gain of about 0.3066 x 50 = ₹15.33 per unit or ₹996 per lot.`,
      },
      tip: `Do not drop the minus sign on puts. Short put equals positive delta; people forget this and think they are hedged when they are not.`,
      visual: {
        kind: 'bars',
        title: 'Put delta by strike',
        caption: 'Model values at NIFTY 24,000, 7 days, IV 14%. Negative sign dropped for the bars; all values are negative.',
        items: [
          { label: '23,600 PE', value: 0.1734, tone: 'gold' },
          { label: '23,800 PE', value: 0.3066, tone: 'gold' },
          { label: '24,000 PE', value: 0.4705, tone: 'gold' },
          { label: '24,200 PE', value: 0.6383, tone: 'gold' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'PE', spot: 24000, strike: 23800, days: 7, iv: 14, rate: 6.5 },
        why: 'Reproduces the 23,800 PE delta of -0.3066 used in the example.',
      },
    },
    {
      t: 4,
      def: `Delta has fixed outer limits: 0 to +1 for calls and -1 to 0 for puts. It approaches these limits only for very deep in-the-money or far out-of-the-money options, and it moves towards them as expiry nears.`,
      hi: `Delta ki limits fixed hain: call ke liye 0 se +1 aur put ke liye -1 se 0. Yeh in limits ke paas tabhi pahunchta hai jab option bahut deep ITM ya bahut far OTM ho, aur expiry paas aane par delta in limits ki taraf badhta hai.`,
      how: `The limits follow from what an option is: one unit of a call can never behave more than one-for-one with the index, and a call cannot gain when the index falls. Close to expiry the model's uncertainty collapses, so an option is nearly certain either to finish in the money (delta near 1 in absolute terms) or to expire worthless (delta near 0). That is why the delta of the same strike changes so sharply in the last day. The ATM region is the steepest part of the curve, where small index moves change delta the most.`,
      eg: {
        title: 'The same strike at different times (model, illustrative)',
        text: `The 24,200 CE with NIFTY at 24,000 and IV 14% has delta 0.1347 with 1 day left, 0.3617 with 7 days left and 0.4786 with 30 days left. The strike has not changed, only the time. Three lots held with 1 day to go carry 0.1347 x 195 = 26.3 units of delta, but with 30 days to go the same lots would carry 0.4786 x 195 = 93.3 units.`,
      },
      tip: `A "0.1 delta" strike in a weekly expiry and a "0.1 delta" strike in a monthly expiry sit at very different distances from spot. Always compare delta together with days left.`,
      visual: {
        kind: 'bars',
        title: '24,200 CE delta as expiry changes',
        caption: 'Model values, NIFTY 24,000, IV 14%. Fewer days left means smaller delta for an OTM strike.',
        items: [
          { label: '1 day left', value: 0.1347, tone: 'ice' },
          { label: '7 days left', value: 0.3617, tone: 'ice' },
          { label: '30 days left', value: 0.4786, tone: 'ice' },
        ],
      },
    },
    {
      t: 5,
      def: `Moneyness decides delta. At-the-money options have delta around 0.5 (absolute), in-the-money options have higher absolute delta and behave more like the index, and out-of-the-money options have lower absolute delta and respond weakly.`,
      hi: `Delta moneyness se decide hota hai. ATM option ka delta lagbhag 0.5 (absolute) hota hai, ITM ka zyada hota hai aur woh index jaisa behave karta hai, aur OTM ka kam hota hai aur kamzor response deta hai.`,
      how: `ITM means the option has intrinsic value (a call with strike below spot, a put with strike above spot). The deeper in the money, the more the option tracks the index and the smaller the time value. OTM options have only time value and respond slowly until spot nears the strike. ATM delta is a little above 0.5 for calls in the model because of the interest-rate and volatility terms, which is why you see 0.53 rather than exactly 0.50 here. Remember that moneyness is relative to the current spot, so an option changes class as the index moves.`,
      eg: {
        title: 'Three calls at NIFTY 24,000, 7 days (model, illustrative)',
        text: `ITM: 23,600 CE costs about ₹473.12 and has delta 0.8266 (one lot 473.12 x 65 = ₹30,753). ATM: 24,000 CE costs ₹200.85 with delta 0.5295 (₹13,055 per lot). OTM: 24,400 CE costs ₹57.54 with delta 0.2181 (₹3,740 per lot). Delta per ₹1,000 of lot cost is roughly 0.027 for the ITM, 0.041 for the ATM and 0.058 for the OTM call, so cheaper options give more delta per rupee but need a bigger move to build value.`,
      },
      tip: `A far OTM option can look like the best value because of the high percentage gains it can show. It also loses all its value far more often. Do not choose by premium alone.`,
      visual: {
        kind: 'ladder',
        title: 'Call strikes against NIFTY 24,000',
        caption: 'ITM strikes have higher delta; OTM strikes have lower delta.',
        optType: 'CE',
        spot: 24000,
        strikes: [23600, 23800, 24000, 24200, 24400],
      },
      calc: {
        id: 'moneyness',
        preset: { optType: 'CE', spot: 24000, strike: 24400 },
        why: 'Classifies the strike as ITM, ATM or OTM and shows its distance from spot.',
      },
    },
    {
      t: 6,
      def: `Delta as directional sensitivity means treating it as the number of index units your position behaves like. A long call with delta 0.53 on one lot of 65 behaves like holding about 34 units of NIFTY, for small moves.`,
      hi: `Delta ko directional sensitivity ki tarah dekhne ka matlab hai ki aapki position kitne index units jaisi behave kar rahi hai. Ek lot (65) ka long call jiska delta 0.53 hai, chhote moves ke liye lagbhag 34 units NIFTY hold karne jaisa behave karta hai.`,
      how: `Position delta in units = option delta x quantity x direction. Multiply by a point move to get a first-order rupee estimate. The estimate is good for small moves; for larger moves delta itself changes (gamma), so a long option gains a little more than delta predicts on a favourable move and loses a little less on an adverse one. Time passing (theta) and IV changes (vega) also move the premium, so delta explains only the directional part of the day's change.`,
      eg: {
        title: 'Estimate versus model on a 50-point move (illustrative)',
        text: `Long one lot of the 24,000 CE. Delta 0.5295, so units = 0.5295 x 65 = 34.4. A 50-point rise gives a first-order gain of 34.4 x 50 = ₹1,721. The full model reprice (premium ₹200.85 to ₹228.38) gives 27.54 x 65 = ₹1,790. The extra ₹69 comes from delta rising during the move. On a 50-point fall the full reprice (premium ₹175.44) loses 25.40 x 65 = ₹1,651, less than the first-order ₹1,721.`,
      },
      tip: `Delta is a speedometer reading, not a distance: it says how fast the premium moves right now. After the index moves, the reading has changed.`,
      visual: {
        kind: 'bars',
        title: 'Gain per unit on a +50 point move',
        unit: ' ₹',
        caption: 'Illustrative: 24,000 CE, 7 days, IV 14%. Delta alone slightly underestimates the actual gain.',
        items: [
          { label: 'Delta only', value: 26.47, tone: 'ice' },
          { label: 'Full model reprice', value: 27.54, tone: 'bull' },
        ],
      },
    },
    {
      t: 7,
      def: `Delta-based strike selection uses delta as a ruler: instead of picking a strike by round numbers, you choose the delta that matches how much directional exposure and how much cost you want. A higher delta means a more expensive, more index-like option; a lower delta means a cheaper option that needs a larger move.`,
      hi: `Delta-based strike selection mein delta ko ek ruler ki tarah use karte hain: round number dekhne ke bajay aap woh delta chunte ho jo aapko chahiye exposure aur cost ke hisaab se. Zyada delta matlab mehenga aur index jaisa option; kam delta matlab sasta option jise bada move chahiye.`,
      how: `Traders often pick calls around delta 0.30 to 0.50 for a directional view and lower deltas for lottery-style trades; sellers often pick lower deltas for more distance from spot. Using delta normalises strikes across expiries and volatility levels, since the same 0.30 delta sits at different point distances in a weekly and a monthly contract. Delta is also a loose probability proxy for finishing in the money, but it is not a forecast. Always check the premium, bid-ask spread and your maximum loss before selecting a strike.`,
      eg: {
        title: 'Picking a 0.30 delta call (model, illustrative)',
        text: `NIFTY 24,000, 7 days, IV 14%. Call deltas: 24,000 CE 0.5295, 24,100 CE 0.4441, 24,200 CE 0.3617, 24,300 CE 0.2854, 24,400 CE 0.2181. The 24,300 CE is closest to 0.30; its model premium is ₹81.99, so one lot costs 81.99 x 65 = ₹5,329 and NIFTY needs to finish above 24,300 + 81.99 = 24,381.99 for the buyer to break even at expiry. Compare: the 24,000 CE costs ₹13,055 per lot with breakeven 24,200.85.`,
      },
      tip: `Choose delta from the loss you can accept and the move you expect, not from a number you read somewhere. Delta is a guide to sensitivity, not a promise of probability.`,
      visual: {
        kind: 'bars',
        title: 'Call delta by strike, 7 days',
        caption: 'Model values at NIFTY 24,000, IV 14%. The 24,300 CE is the closest to delta 0.30.',
        items: [
          { label: '24,000 CE', value: 0.5295, tone: 'gold' },
          { label: '24,100 CE', value: 0.4441, tone: 'gold' },
          { label: '24,200 CE', value: 0.3617, tone: 'gold' },
          { label: '24,300 CE', value: 0.2854, tone: 'ice' },
          { label: '24,400 CE', value: 0.2181, tone: 'gold' },
        ],
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 81.99, lotSize: 65, lots: 1, spot: 24000 },
        why: 'Converts the 24,300 CE model premium into the cash cost of one lot.',
      },
    },
    {
      t: 8,
      def: `Portfolio delta is the sum of the deltas of all your positions, expressed in index units. It tells you how many NIFTY units your whole book behaves like, and therefore how much it gains or loses per index point, to a first approximation.`,
      hi: `Portfolio delta aapki saari positions ke deltas ka total hai, index units mein. Yeh batata hai ki aapki poori book kitne NIFTY units jaisi behave kar rahi hai, aur isliye per index point kitna gain ya loss hoga, first approximation mein.`,
      how: `For each position, multiply the option delta by lots x lot size and by +1 (long) or -1 (short), then add them up. Short puts and long calls add positive delta; short calls and long puts add negative delta. Positions on different expiries or strikes are added the same way, though their deltas change at different speeds. The sum is a snapshot: it must be recomputed after the market moves. A net delta near zero does not mean zero risk, because gamma, theta and vega remain.`,
      eg: {
        title: 'A two-leg book (model, illustrative)',
        text: `Long 2 lots of the 24,200 CE (delta 0.3617) and short 1 lot of the 23,800 PE (delta -0.3066). Units: 0.3617 x 130 = +47.02. For the short put: -0.3066 x -65 = +19.93. Net delta = 47.02 + 19.93 = +66.95 units, so the book behaves like being long about 67 NIFTY units. A 30-point fall suggests a first-order loss of about 66.95 x 30 = ₹2,009.`,
      },
      tip: `Both legs here are bullish. Many beginners think "one call, one put" must be balanced, but a long call plus a short put points the same way.`,
      visual: {
        kind: 'bars',
        title: 'Delta contribution in index units',
        caption: 'Illustrative book at NIFTY 24,000. Both legs add positive delta.',
        items: [
          { label: 'Long 2 x 24,200 CE', value: 47.02, tone: 'bull' },
          { label: 'Short 1 x 23,800 PE', value: 19.93, tone: 'bull' },
          { label: 'Net delta (units)', value: 66.95, tone: 'gold' },
        ],
      },
      calc: {
        id: 'portfolio-delta',
        preset: { d1: 0.3617, q1: 130, d2: -0.3066, q2: -65, d3: 0, q3: 0 },
        why: 'Adds the two legs into one net delta and estimates the P&L per index point.',
      },
    },
    {
      t: 9,
      def: `Delta hedging means adding an offsetting position, usually NIFTY futures, so that the combined delta is close to zero. It removes the exposure to small index moves, but not the exposure to time decay, volatility or large moves.`,
      hi: `Delta hedging ka matlab hai ek offsetting position (aam taur par NIFTY futures) jodna taaki combined delta zero ke paas aa jaye. Isse chhote index moves ka exposure hat jata hai, par time decay, volatility aur bade moves ka exposure nahi hatta.`,
      how: `To hedge a net long delta of 68.83 units you sell futures worth about that many units; futures have delta 1 per unit, but trade in lots of 65, so the hedge is lumpy. Market makers and option desks delta-hedge continuously and re-balance as the index moves, which costs brokerage, impact and margin. A hedged long option keeps its gamma and vega but also keeps paying theta; a hedge also locks you out of the directional profit you may have wanted. Futures need margin, and rolling them near expiry adds cost.`,
      eg: {
        title: 'Hedging two lots of the 24,000 CE (model, illustrative)',
        text: `Long 2 lots of the 24,000 CE, delta 0.5295 x 130 = 68.83 units. Sell 1 NIFTY futures lot (65 units): net delta = 68.83 - 65 = +3.83 units, near neutral. If NIFTY rises 50 points, the call delta becomes 0.5719, i.e. 74.35 units, so net delta is +9.35 units and a re-hedge would need more futures. If NIFTY falls 50 points, call delta becomes 0.4866 (63.26 units) and net delta is -1.74 units.`,
      },
      tip: `A delta hedge is a hedge for today's delta. After a big move you must re-balance, and every re-balance has a cost.`,
      visual: {
        kind: 'flow',
        title: 'Delta hedge cycle',
        caption: 'Illustrative sequence for the long 24,000 CE position.',
        steps: [
          { label: 'Hold options', note: '2 lots, delta +68.83 units', tone: 'ice' },
          { label: 'Sell futures', note: '1 lot = 65 units', tone: 'gold' },
          { label: 'Net delta', note: 'About +3.83 units', tone: 'neutral' },
          { label: 'Index moves', note: 'Delta changes (gamma)', tone: 'gold' },
          { label: 'Re-balance', note: 'Adjust futures, pay costs', tone: 'ice' },
        ],
      },
      calc: {
        id: 'hedge-ratio',
        preset: { portfolio: 1652000, beta: 1, futuresNotional: 1560000 },
        why: 'Delta exposure of 68.83 units x 24,000 = ₹16,52,000 against one futures lot of 24,000 x 65 = ₹15,60,000 gives about 1.06 lots, i.e. one lot in practice.',
      },
    },
  ],
  tools: [
    { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Black-Scholes price and delta for any strike.' },
    { id: 'portfolio-delta', preset: { d1: 0.3617, q1: 130, d2: -0.3066, q2: -65, d3: 0, q3: 0 }, why: 'Net delta of a multi-leg book.' },
  ],
}
export default m
