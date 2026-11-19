import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '6.8',
  intro:
    `Greeks are most useful when read together. Delta says how much the premium moves with the index, gamma says how fast delta itself changes, theta is the daily cost of time and vega is the sensitivity to implied volatility. This module shows how they interact during a breakout, a sideways market and expiry day, and how a trader adds them up across positions and reduces unwanted ones. All numbers are illustrative Black-Scholes values (Nifty 24,000, rate 6.5%, lot 65 - check the current NSE contract specification); real premiums differ with skew and demand.`,
  introHi:
    `Greeks tab kaam aate hain jab unhe ek saath padha jaye. Delta batata hai premium index ke saath kitna hilta hai, gamma batata hai delta khud kitni tezi se badalta hai, theta time ka daily cost hai aur vega implied volatility ke prati sensitivity hai. Is module mein dekhenge ki breakout, sideways market aur expiry day par yeh sab ek doosre ke saath kaise behave karte hain, aur ek trader positions ka total Greeks kaise nikalta aur unwanted Greeks ko kaise kam karta hai. Saare numbers illustrative Black-Scholes values hain (Nifty 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein); real premium skew aur demand ki wajah se alag ho sakte hain.`,
  steps: {
    concept:
      `A single Greek never tells the full story of an option trade. A long call has positive delta and positive gamma, but it also pays theta every day and is exposed to a fall in IV. Practical Greek reading means asking four things together: how much do I make per index point (delta), how quickly does that change (gamma), what does waiting cost me (theta) and what happens if volatility changes (vega). A position that looks good on one Greek can be fragile on another.`,
    conceptHi:
      `Sirf ek Greek option trade ki poori kahani nahi batata. Long call mein delta aur gamma positive hote hain, lekin har din theta bhi dena padta hai aur IV girne ka risk bhi rehta hai. Practical Greek reading ka matlab hai chaar sawal ek saath poochna: index ke har point par kitna kamaunga (delta), woh kitni tezi se badlega (gamma), intezaar karne ka cost kya hai (theta), aur volatility badli toh kya hoga (vega). Ek Greek par achhi dikhne wali position doosre Greek par kamzor ho sakti hai.`,
    mechanism:
      `The Greeks are linked through the option price model. Long options have positive gamma and negative theta: you are paid for movement and charged for time, and the two roughly offset when the index moves by about one day's implied move. Vega is largest for at-the-money options with more days left, while gamma and theta are largest for at-the-money options close to expiry. For a position with several legs, the Greeks of each leg are multiplied by signed quantity and added up. Platforms and brokers show these numbers; the NSE option chain itself shows IV but not the other Greeks.`,
    example: {
      title: 'One ATM call, three Greeks at work (illustrative)',
      text: `Nifty 24,000, 7 days to expiry, IV 14%. The 24,000 CE costs about Rs 200.85 with delta 0.529, gamma 0.00086, theta -15.45 per day and vega 13.22. Spot rises 100 points: delta rises to about 0.614 (gamma added 0.085) and the premium becomes about Rs 258.03, a gain of Rs 57.18 or Rs 3,717 per lot of 65. The same call loses about Rs 15.45 (Rs 1,004 per lot) for every day with no movement, and gains or loses about Rs 13.22 (Rs 859 per lot) for each 1-point change in IV.`,
    },
    chart: {
      kind: 'bars',
      title: 'ATM 24,000 straddle theta per day by days to expiry (illustrative, Rs of premium)',
      caption: 'The closer to expiry, the faster time value leaks. The same straddle that loses about Rs 13 a day with 30 days left loses about Rs 50 a day with 2 days left.',
      unit: ' Rs',
      items: [
        { label: '30 days left', value: 13.05, tone: 'ice' },
        { label: '7 days left', value: 26.63, tone: 'gold' },
        { label: '2 days left', value: 49.67, tone: 'bear' },
      ],
    },
    optionChain:
      `The NSE chain gives you IV and LTP per strike, but not delta, gamma, theta or vega, so use a broker or analytics platform for those columns. A practical routine: pick the strike, read its delta to see how directional it is, compare its theta with its premium to see how many days of decay the premium can absorb, and check vega against how much IV has moved in the last session. Strikes near spot carry the highest gamma and theta near expiry; far OTM strikes carry low delta and look cheap but lose most of their value quickly if the move does not come.`,
    psychology:
      `Beginners buy a far OTM call because the premium is small and the Greeks feel harmless. Sellers collect theta every day and feel in control until one fast move turns the gamma against them. Pros think in trade-offs: more gamma means more theta, and more vega means more exposure to an IV drop. The discipline is to know which Greek you are paid for and which one you are paying.`,
    scenarios: {
      bullish:
        `A fast rise helps a long call through delta, and through gamma as delta grows; a rising IV helps through vega. A slow grind up with falling IV can disappoint, because theta and negative vega eat part of the delta gain.`,
      bearish:
        `Sharp falls usually come with rising IV, so a long put gains from delta, gamma and vega together. A short strangle in the same fall can lose from all three at once, which is why its risk is shaped by gamma and vega, not only theta.`,
      sideways:
        `Long options lose theta and, if IV drifts down, vega as well. Short options collect theta and a falling IV helps them, but a late sharp move can erase several days of collected premium. Neither side is "safe".`,
    },
    practice: [
      {
        q: 'An ATM call has delta 0.529 and gamma 0.00086. After a 100-point rise, what is the new delta and the first-order gain per unit?',
        a: `New delta = 0.529 + 0.00086 x 100 = 0.615 (the model gives about 0.614). Average delta over the move is about 0.572, so the gain is about 0.572 x 100 = Rs 57 per unit, or about Rs 3,717 per lot of 65. A delta-only estimate would have been 0.529 x 100 = Rs 52.9.`,
      },
      {
        q: 'A 30-day ATM call has theta -8.65 and vega 27.13. IV falls by 2 points overnight with spot unchanged. Compare the IV loss with one day of theta per lot of 65.',
        a: `IV loss = 2 x 27.13 = Rs 54.26 per unit = 54.26 x 65 = Rs 3,527 per lot. One day of theta = 8.65 x 65 = Rs 562. The IV drop is about 6.3 times one day of decay, so for a long-dated option vega can matter more than theta.`,
      },
      {
        q: 'A short strangle has net delta -3.28 units now, but after Nifty rises 300 points the net delta is about -29.6 units. Roughly how much delta did gamma add, and what does it mean?',
        a: `Change = -29.6 - (-3.28) = about -26.3 units. The position became more short as the index rose, so each further point costs the writer about Rs 29.6. That is negative gamma: losses accelerate when the market runs against the position.`,
      },
    ],
    assignment:
      `Open a broker or analytics platform that shows Greeks. Pick the nearest-expiry ATM straddle and note delta, gamma, theta and vega for the call and the put. Work out the straddle's theta per day and gamma, then calculate sqrt(2 x theta / gamma) as the approximate daily move needed to cover one day of decay. Compare it with one day of implied move, spot x VIX / 100 / sqrt(365).`,
  },
  topics: [
    {
      t: 1,
      def: `Delta tells you how much an option premium changes for a one-point move in the index. Gamma tells you how much delta itself changes for that one-point move. Together they describe both the direction exposure and how quickly that exposure grows or shrinks.`,
      hi: `Delta batata hai ki index ke ek point hilne par option premium kitna badlega. Gamma batata hai ki us ek point mein delta khud kitna badlega. Dono milkar bataate hain ki aapki direction exposure kitni hai aur woh kitni tezi se badh ya ghat rahi hai.`,
      how: `A call with delta 0.50 gains about half a point of premium per index point. If gamma is 0.001, a 100-point rise adds about 0.10 to delta, so the next 100 points pay more than the first. This is why long options gain faster than a straight delta estimate when the move continues, and why short options lose faster than expected. Gamma is highest for at-the-money options close to expiry and low for deep ITM and far OTM options. Because delta is a snapshot, a trader who sizes a position only by today's delta is ignoring how the position will look after a big move.`,
      eg: {
        title: 'Delta grows as the index runs (illustrative)',
        text: `The 24,000 CE with 7 days left has delta 0.529 and gamma 0.00086. After Nifty rises to 24,100 its delta is about 0.614 and the premium moves from Rs 200.85 to Rs 258.03, a gain of Rs 57.18, which is Rs 3,717 per lot of 65. A delta-only estimate (0.529 x 100 = 52.9) would have shown Rs 3,439 per lot, so gamma added about Rs 278 per lot.`,
      },
      tip: `Delta is where you are today, gamma is how fast that changes. A position with small delta but big gamma can turn directional very quickly.`,
      visual: {
        kind: 'curve',
        title: 'Delta of a call rises as the option moves into the money',
        caption: 'The steepest part of the curve is near the money, which is where gamma is highest.',
        curve: 'delta',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 },
        why: 'Change the spot by 100 points and see the new delta and gamma for this exact call.',
      },
    },
    {
      t: 2,
      def: `Theta is the premium an option loses per day just from time passing. Vega is the premium change for a one-point change in implied volatility. Combined, they tell you what happens when the market does nothing and when expectations of volatility change.`,
      hi: `Theta woh premium hai jo option har din sirf time guzarne se khota hai. Vega implied volatility mein ek point ke badlav par premium ka badlav hai. Dono milkar batate hain ki jab market kuch nahi karta tab kya hota hai aur jab volatility ki expectation badalti hai tab kya hota hai.`,
      how: `Long options have negative theta and positive vega: you pay daily for time and gain if IV rises. Short options are the mirror image. Vega is bigger for options with more time left, while theta per day is bigger as expiry nears for at-the-money options. So a long-dated option is more exposed to an IV change, and a near-expiry option is more exposed to time. In India IV usually jumps before events such as Budget day or election results and then drops sharply once the event passes, which can hurt long options even when the index moves in the expected direction.`,
      eg: {
        title: 'Same call, two expiries (illustrative)',
        text: `At Nifty 24,000 and IV 14% the 24,000 CE with 30 days left costs about Rs 450.57 with theta -8.65 and vega 27.13. With 7 days left it costs about Rs 200.85 with theta -15.45 and vega 13.22. If IV falls 2 points the 30-day call loses about Rs 54.26, or Rs 3,527 per lot of 65, versus Rs 562 for one day of theta. The 7-day call loses about Rs 26.44 (Rs 1,719 per lot) on the same IV fall, versus Rs 1,004 for a day of theta.`,
      },
      tip: `Before buying an option ask: if nothing happens and IV drops two points, what do I lose per lot? That is the price of being wrong on timing.`,
      visual: {
        kind: 'matrix',
        title: 'Theta and vega: who is paid and who pays',
        caption: 'Long options pay theta and benefit from IV rises; short options collect theta and suffer when IV rises.',
        xLabels: ['Theta', 'Vega'],
        yLabels: ['Long option', 'Short option'],
        cells: [
          { head: 'Pays every day', note: 'negative theta', tone: 'bear' },
          { head: 'Gains if IV rises', note: 'positive vega', tone: 'bull' },
          { head: 'Collects every day', note: 'positive theta', tone: 'bull' },
          { head: 'Loses if IV rises', note: 'negative vega', tone: 'bear' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 30, iv: 14, rate: 6.5 },
        why: 'Compare theta and vega for 30 days against 7 days by changing the days field.',
      },
    },
    {
      t: 3,
      def: `Gamma and theta pull against each other. Owning gamma (being long options) pays you when the index moves but costs theta every day. Selling gamma earns theta every day but loses when the index moves a lot.`,
      hi: `Gamma aur theta ek doosre ke khilaaf kaam karte hain. Gamma kharidna (long options) index hilne par paisa deta hai lekin roz theta kaat-ta hai. Gamma bechna roz theta kamata hai lekin index bada hile toh loss deta hai.`,
      how: `For a long option, a move of m points earns roughly half of gamma times m squared, while one day of waiting costs theta. Setting the two equal gives a break-even move of about the square root of 2 x theta / gamma. Because option prices are built on the same implied volatility, this break-even daily move comes out close to one day of implied move, which is spot x IV / sqrt(365). So a buyer needs the index to move by roughly what the market already expects, and a writer needs it to move less. Theta here includes a small interest-carry part, so the figure is an approximation.`,
      eg: {
        title: 'The break-even daily move (illustrative)',
        text: `ATM 24,000 straddle, IV 14%, 7 days left: theta is -15.45 + -11.18 = -26.63 per day (Rs 1,731 per lot of 65) and gamma is 0.00086 x 2 = 0.00172. Break-even move = sqrt(2 x 26.63 / 0.00172) = about 176 points. One day of implied move = 24,000 x 0.14 / sqrt(365) = 175.9 points. The straddle with 2 days left has theta -49.67 and gamma 0.0032, and gives the same answer, about 176 points.`,
      },
      tip: `A long straddle buyer is not betting on movement in general; they are betting on more movement than the market already priced in.`,
      visual: {
        kind: 'compare',
        title: 'Long gamma vs short gamma',
        left: { head: 'Long options (long gamma)', tone: 'bull', points: ['Pays theta every day', 'Gains when the index moves more than implied', 'Loss limited to premium paid', 'Delta moves in your favour as the trend continues'] },
        right: { head: 'Short options (short gamma)', tone: 'bear', points: ['Collects theta every day', 'Loses when the index moves more than implied', 'Loss can exceed premium collected', 'Delta moves against you as the trend continues'] },
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 14, days: 1 },
        why: 'One day of implied move is the benchmark that long gamma has to beat.',
      },
    },
    {
      t: 4,
      def: `In a breakout the index moves fast in one direction. The Greeks change quickly together: delta rises towards the direction of the move, IV often rises, and time decay becomes a smaller part of the story.`,
      hi: `Breakout mein index ek direction mein tezi se chalta hai. Greeks saath mein tezi se badalte hain: delta us direction mein badhta hai, IV aksar badhta hai, aur time decay ka asar chhota ho jata hai.`,
      how: `As spot approaches and crosses a strike, that option's delta moves from small to large, so out-of-the-money options gain much faster in percentage terms than at-the-money options. Breakouts also tend to bring IV up, which adds vega gains to the buyer and vega losses to the writer. For a buyer all three Greeks help at once; for a writer all three can hurt at once. After the breakout, if the index stalls and IV cools, the same Greeks can reverse, so a profit seen at the high is not locked in until the position is closed.`,
      eg: {
        title: 'A 300-point breakout in one day (illustrative)',
        text: `Nifty goes from 24,000 to 24,300 with IV rising from 14% to 16% and one day passing. The 24,300 CE (7 days left, premium about Rs 81.99, delta 0.285) becomes about Rs 212.00 with delta 0.525: a gain of Rs 130.01 or 158.6%, worth Rs 8,451 per lot of 65. The 24,000 CE goes from Rs 200.85 to Rs 401.59 (+Rs 200.74, +100%, Rs 13,048 per lot). A writer of the 24,300 CE would have lost the same Rs 8,451 per lot.`,
      },
      tip: `OTM options show the largest percentage gains in a breakout, but they also lose the most percentage if the breakout fails. Size them as small bets.`,
      visual: {
        kind: 'bars',
        title: 'Premium change after a 300-point breakout (illustrative, %)',
        caption: 'OTM options gain more in percentage; ATM options gain more in rupees per unit.',
        unit: ' %',
        items: [
          { label: '24,000 CE (ATM)', value: 100, tone: 'gold' },
          { label: '24,300 CE (OTM)', value: 158.6, tone: 'bull' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24300, strike: 24300, days: 6, iv: 16, rate: 6.5 },
        why: 'Open the 24,300 CE after the breakout and compare its delta and vega with the starting values.',
      },
    },
    {
      t: 5,
      def: `In a sideways market the index drifts in a narrow range. Delta stays small for a straddle, gamma gains are small, theta keeps working and IV often drifts lower. Sellers are usually favoured in the short run and buyers are usually hurt.`,
      hi: `Sideways market mein index ek chhoti range mein ghoomta hai. Straddle ka delta chhota rehta hai, gamma se fayda kam milta hai, theta chalta rehta hai aur IV aksar neeche aata hai. Short term mein sellers ko aam taur par fayda hota hai aur buyers ko nuksaan.`,
      how: `With no big move, a long option collects no delta profit while theta eats premium each day. If IV also slips, vega adds a second loss for the buyer; the writer benefits twice. The risk for the writer is that sideways markets can end with a sudden event, so premium collected is not safe until the position is closed. Option sellers also face margin, which NSE clearing sets with SPAN plus exposure requirements, so a sharp move can mean a margin call as well as a mark-to-market loss.`,
      eg: {
        title: 'Three quiet days (illustrative)',
        text: `Nifty is 24,000 with 7 days left and IV 14%. Three days later it is 24,010, 4 days remain and IV has slipped to 12%. The 24,000 CE falls from Rs 200.85 to Rs 134.29 and the 24,000 PE from Rs 170.95 to Rs 107.20. The straddle goes from Rs 371.80 to Rs 241.49, a fall of Rs 130.31 or 35.0%. A short straddle writer keeps Rs 8,470 per lot of 65; a buyer loses the same amount even though the index ended almost where it began.`,
      },
      tip: `A flat market is not free money for sellers; it is the calm before a possible move. Collected premium is only real after the position is closed.`,
      visual: {
        kind: 'candles',
        title: 'A sideways range, where theta works and gamma sleeps',
        pattern: 'range',
      },
      calc: {
        id: 'straddle-move',
        preset: { spot: 24000, cePrice: 200.85, pePrice: 170.95, strike: 24000 },
        why: 'Compute the breakevens of the 7-day straddle to see how far the index must leave the range to hurt the writer.',
      },
    },
    {
      t: 6,
      def: `On expiry day gamma and theta become very large for at-the-money options, while vega almost disappears. Premiums can swing wildly with small index moves, and an option that looks cheap can lose all of its value within hours.`,
      hi: `Expiry day par ATM options ka gamma aur theta bahut bada ho jata hai aur vega lagbhag khatam ho jata hai. Index ke chhote move par bhi premium bahut hil sakta hai, aur sasta dikhne wala option kuch ghanton mein poora zero ho sakta hai.`,
      how: `As expiry nears, time value of an ATM option collapses and its delta swings from near 0 to near 1 over a few strikes. NSE index options expire on Tuesday (the previous trading day if it is a holiday) and are cash-settled in rupees on the final settlement price, so there is no delivery risk, but there is an all-or-nothing feel for strikes near spot. Because gamma is so large, hedging a short position becomes difficult: a 100-point move can change its delta by far more than on a normal day. Many traders therefore reduce size or close early on expiry day.`,
      eg: {
        title: 'The 24,200 call on the last day (illustrative)',
        text: `With 1 day left and IV 14%, the 24,200 CE (spot 24,000) costs about Rs 11.92 with delta 0.135. If Nifty rises 200 points to 24,200 it becomes an ATM option worth about Rs 72.92 with delta 0.511: a gain of Rs 61.00 per unit, or Rs 3,965 per lot of 65, on a Rs 775 outlay (11.92 x 65). Gamma of the ATM 1-day option is 0.00227, about 2.6 times the 0.00086 of the same option with 7 days left.`,
      },
      tip: `Expiry-day gains and losses come from gamma, not from forecasting. If you cannot afford a total loss of premium, or a fast gap against a short position, do not trade near-the-money on expiry.`,
      visual: {
        kind: 'curve',
        title: 'Gamma peaks at the money and sharpens near expiry',
        curve: 'gamma',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24200, days: 1, iv: 14, rate: 6.5 },
        why: 'Try spot 24,000 and then 24,200 on this 1-day option to see delta and gamma jump.',
      },
    },
    {
      t: 7,
      def: `Portfolio Greeks are the sum of the Greeks of every position, each multiplied by its signed quantity. They show your total directional, time, volatility and gamma exposure in one view, instead of looking at each trade separately.`,
      hi: `Portfolio Greeks matlab har position ke Greeks ko uski signed quantity se multiply karke jodna. Isse aapki total direction, time, volatility aur gamma exposure ek jagah dikhti hai, har trade ko alag dekhne ki zarurat nahi padti.`,
      how: `Long options are positive quantity and short options are negative. Net delta in units tells you the rupee change per index point: net delta -30 units means about Rs 30 lost per point of rise. Net theta, vega and gamma are summed the same way. Many positions that look diversified can add to the same exposure, for example short calls and short puts are both short vega and short gamma. Many broker platforms show a combined Greeks table for open positions; check how yours treats lot size and units.`,
      eg: {
        title: 'A short strangle added up (illustrative)',
        text: `Nifty 24,000, 7 days, IV 14%. Sell the 24,300 CE (premium 81.99, delta 0.285, theta -12.50, vega 11.29) and the 23,700 PE (premium 64.57, delta -0.235, theta -9.20, vega 10.21), one lot of 65 each. Net delta = 65 x (-0.285 + 0.235) = about -3.3 units, nearly neutral. Net theta = +21.69 x 65 = about +Rs 1,410 a day. Net vega = -21.50 x 65 = about -Rs 1,398 per IV point. Credit = 146.56 x 65 = Rs 9,527. It is flat in delta but heavily short gamma and vega.`,
      },
      tip: `Zero net delta does not mean zero risk. Check net gamma and vega as well.`,
      visual: {
        kind: 'bars',
        title: 'Short strangle Greeks per lot of 65 (illustrative)',
        caption: 'Delta is near zero, but theta is positive and vega is negative: the position is short volatility. Units: Rs per day for theta, Rs per IV point for vega, units for delta.',
        items: [
          { label: 'Net delta (units)', value: 3.3, tone: 'neutral' },
          { label: 'Theta gained (Rs/day)', value: 1410, tone: 'bull' },
          { label: 'Vega exposure (Rs per IV point, short)', value: 1398, tone: 'bear' },
        ],
      },
      calc: {
        id: 'portfolio-delta',
        preset: { d1: 0.285, q1: -65, d2: -0.235, q2: -65, d3: 0, q3: 0 },
        why: 'Add up the delta of the two short legs and then change spot-based deltas to test a move.',
      },
    },
    {
      t: 8,
      def: `Hedging Greeks means adding positions that cancel the exposure you do not want. Delta can be hedged with futures, and gamma and vega can be reduced by buying further out-of-the-money options that cap the risk.`,
      hi: `Greeks hedge karne ka matlab hai aisi positions jodna jo unwanted exposure ko cancel karein. Delta futures se hedge ho sakta hai, aur gamma aur vega ko door ke OTM options kharid kar kam kiya ja sakta hai jo risk cap kar dete hain.`,
      how: `A delta hedge uses Nifty futures: a position with net delta of -118 units can be offset by buying 2 lots (130 units) of futures. This removes first-order direction risk only; gamma will change the delta again as the index moves, so the hedge needs rebalancing, each time with brokerage, STT on options and bid-ask costs. A vega or gamma hedge is done with options: buying a further OTM call and put turns a short strangle into an iron condor, which has a defined maximum loss and lower vega, at the cost of giving up some premium. Hedging reduces risk, but it never removes it and always costs something.`,
      eg: {
        title: 'Strangle to iron condor (illustrative)',
        text: `Starting with the short strangle above (credit 146.56), buy the 24,600 CE at 25.91 and the 23,400 PE at 17.97. Net credit falls to 102.68 (Rs 6,674 per lot of 65), a cost of Rs 2,852 per lot for the wings. Net vega falls from -21.50 to -9.93 and gamma from -0.00139 to -0.00064. Maximum loss at expiry = (300 - 102.68) x 65 = Rs 12,826. Breakevens at expiry are 24,402.68 and 23,597.32. For a delta hedge, a strangle held at 4 lots with delta about -118 units after a rise could be offset by buying 2 lots of futures (+130 units), leaving about +12 units.`,
      },
      tip: `Every hedge has a price: lower reward, extra costs, or the need to rebalance. Decide how much risk reduction is worth it before you trade, not after the market moves.`,
      visual: {
        kind: 'payoff',
        title: 'Iron condor expiry payoff (illustrative, per unit)',
        caption: 'Short 24,300 CE and 23,700 PE, long 24,600 CE and 23,400 PE: limited profit, limited loss.',
        spot: 24000,
        legs: [
          { type: 'CE', side: -1, strike: 24300, premium: 81.99 },
          { type: 'PE', side: -1, strike: 23700, premium: 64.57 },
          { type: 'CE', side: 1, strike: 24600, premium: 25.91 },
          { type: 'PE', side: 1, strike: 23400, premium: 17.97 },
        ],
      },
      calc: {
        id: 'hedge-ratio',
        preset: { portfolio: 2841600, beta: 1, futuresNotional: 1560000 },
        why: 'A delta of -118.4 units x 24,000 = Rs 28,41,600 of exposure; one futures lot is 65 x 24,000 = Rs 15,60,000, so the answer is about 1.8 lots, rounded to 2.',
      },
    },
  ],
  tools: [
    { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Test any Greek relationship in this module.' },
    { id: 'portfolio-delta', why: 'Sum delta across positions.' },
  ],
}
export default m
