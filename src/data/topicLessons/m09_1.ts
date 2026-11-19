import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '9.1',
  intro:
    `Volatility is the size of price movement, not its direction. It decides how expensive options are, how wide a sensible stop-loss should be and how big a position you can carry. This module separates the four kinds of volatility you will meet (historical, realized, implied, expected) and shows how volatility differs from direction and from momentum. All numbers are illustrative (Nifty 24,000, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `Volatility matlab price kitna hilta hai, kis direction mein hilta hai woh nahi. Isi se decide hota hai ki option kitna mehnga hoga, stop-loss kitna wide hona chahiye aur position kitni badi honi chahiye. Is module mein historical, realized, implied aur expected volatility ka fark samjhenge, aur yeh bhi ki volatility direction aur momentum se alag cheez kyun hai. Saare numbers illustrative hain (Nifty 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `Volatility measures how much and how fast a price moves around its average, usually written as the standard deviation of returns. A calm market has small, similar daily moves; a nervous market has large, uneven ones. It is quoted as a percentage and, by convention, scaled to a one-year figure so different markets can be compared. Volatility says nothing about whether the next move is up or down, which is why a trader can be right about volatility and wrong about direction, or the reverse.`,
    conceptHi:
      `Volatility yeh naapti hai ki price apne average ke aaspaas kitna aur kitni tezi se hilta hai, aam taur par returns ka standard deviation. Calm market mein daily moves chhote aur ek jaise hote hain; ghabraye hue market mein bade aur uneven. Ise percentage mein likhte hain aur saal ke hisaab se scale karte hain taaki alag alag markets compare ho sakein. Volatility yeh nahi batati ki agla move upar hoga ya neeche, isliye aap volatility par sahi aur direction par galat ho sakte hain.`,
    mechanism:
      `Four numbers are used. Historical volatility is calculated from past closing prices over a chosen window. Realized volatility is what actually happened over the period that matters to a trade, such as the life of an option. Implied volatility (IV) is the value you must put into an option pricing model to reproduce the traded premium, so it is a price expressed as a percentage. Expected volatility is the market's forward-looking estimate, summarised for Nifty by India VIX. Daily volatility is scaled to annual by multiplying by the square root of the number of trading days, about 252 in a year.`,
    example: {
      title: 'From daily moves to an annual number (illustrative)',
      text: `Six closes: 24,000, 24,120, 23,940, 24,060, 23,880, 24,100. The five daily log returns are +0.50%, -0.75%, +0.50%, -0.75% and +0.92%. Their sample standard deviation is about 0.78% a day. Multiplying by the square root of 252 (about 15.87) gives about 12.4% annualised. On a 24,000 index, 0.78% is about 187 points, the typical size of a daily move in this window.`,
    },
    chart: {
      kind: 'bars',
      title: 'One-standard-deviation Nifty move at VIX 14 (points, 365-day basis)',
      caption: 'The same annual number gives a small daily range and a wide monthly range, because volatility scales with the square root of time.',
      unit: ' pts',
      items: [
        { label: '1 day', value: 176, tone: 'ice' },
        { label: '7 days', value: 465, tone: 'ice' },
        { label: '30 days', value: 963, tone: 'gold' },
      ],
    },
    optionChain:
      `The option chain shows volatility as the IV column next to each strike's premium. A higher IV at the same strike and expiry means a costlier option. The chain does not show historical or realized volatility; for that you need the price chart. Comparing the chain's IV with what the index has actually been doing is the first practical use of this module.`,
    psychology:
      `Beginners watch only direction and treat premium as a fixed price. Experienced traders see premium as a quote for volatility. Fear makes people overpay for options after a sharp fall; boredom makes them under-price risk after weeks of quiet. A calm chart tends to make traders confident just when volatility is cheapest and likeliest to expand, and a violent chart makes them sell hedges just when they are most expensive.`,
    scenarios: {
      bullish:
        `A slow, steady rally can have very low volatility. The index gains but option premiums stay cheap, so a call buyer may profit less than the move suggests, and a sharp rally with rising volatility pays more.`,
      bearish:
        `Falls are usually faster than rallies, so volatility tends to rise in them. Put premiums can expand quickly, which helps a put buyer but makes protection costly for anyone who waited.`,
      sideways:
        `A range can be quiet (low volatility) or choppy (high volatility with no trend). Both go nowhere, yet they price options differently, which is why volatility and direction must be judged separately.`,
    },
    practice: [
      {
        q: `Daily log returns over five days are +0.50%, -0.75%, +0.50%, -0.75%, +0.92%. Find the daily standard deviation and annualise it.`,
        a: `Mean = 0.083%. Squared deviations sum to about 2.43. Divide by n-1 = 4: 0.608. Square root: about 0.78% a day. Annualised: 0.78 × √252 = 0.78 × 15.87 = about 12.4%.`,
      },
      {
        q: `India VIX is 14 and Nifty is 24,000. What is the one-standard-deviation daily move on a 252-day basis?`,
        a: `24,000 × 0.14 / √252 = 24,000 × 0.14 / 15.875 = about 211.7 points. On a 365-day basis it is about 175.9 points; state which convention you use.`,
      },
      {
        q: `The 7-day 24,000 ATM straddle costs ₹371.80 (CE 200.85 + PE 170.95). Where must Nifty finish at expiry for the buyer to break even?`,
        a: `Lower: 24,000 - 371.80 = 23,628.20. Upper: 24,000 + 371.80 = 24,371.80. The direction does not matter; the size of the move does.`,
      },
      {
        q: `An option is priced at IV 14% but the index then moves like 10% annualised volatility. Who tends to benefit, and is it guaranteed?`,
        a: `The option seller tends to benefit, because less movement than priced is a smaller payout. It is not guaranteed: one large gap can reverse many small gains, and realized volatility can also come in above 14%.`,
      },
    ],
    assignment:
      `Download 21 daily Nifty closes from the NSE website. Calculate the 20 daily log returns, their standard deviation and the annualised figure (× √252). Write the result next to today's India VIX and one sentence saying whether the options market is pricing more or less movement than the last month delivered.`,
  },
  topics: [
    {
      t: 1,
      def: `Volatility is a measure of how widely a price moves around its average over a period. It is usually calculated as the standard deviation of returns and shown as a percentage. High volatility means large swings; low volatility means small ones.`,
      hi: `Volatility yeh batati hai ki price ek period mein apne average ke aaspaas kitna failta hai. Ise aam taur par returns ke standard deviation se naapte hain aur percentage mein dikhate hain. Zyada volatility matlab bade swings, kam volatility matlab chhote swings.`,
      how: `Take each day's percentage change in the index, find how far the changes spread around their average, and that spread is volatility. Because spread grows with the square root of time, traders convert a daily figure into an annual one by multiplying by about √252, the number of NSE trading days in a year. Volatility is a statistical average, so a quiet stretch can still contain a surprise day. It describes the size of moves, never the sign.`,
      eg: {
        title: 'Five days of Nifty moves (illustrative)',
        text: `Closes 24,000, 24,120, 23,940, 24,060, 23,880, 24,100 give daily log returns of +0.50%, -0.75%, +0.50%, -0.75%, +0.92%. The standard deviation is about 0.78% a day, which is 0.78 × √252 = about 12.4% annualised. A typical day moved roughly 187 points on a 24,000 index.`,
      },
      tip: `Volatility is size, not direction. A market that drops 2% a day for three days and one that rises 2% a day for three days have about the same volatility.`,
      visual: {
        kind: 'bars',
        title: 'Size of each daily move (illustrative, % absolute)',
        caption: 'Volatility cares about the length of the bars, not whether the day was up or down.',
        unit: '%',
        items: [
          { label: 'Day 1', value: 0.5, tone: 'ice' },
          { label: 'Day 2', value: 0.75, tone: 'ice' },
          { label: 'Day 3', value: 0.5, tone: 'ice' },
          { label: 'Day 4', value: 0.75, tone: 'ice' },
          { label: 'Day 5', value: 0.92, tone: 'gold' },
        ],
      },
    },
    {
      t: 2,
      def: `Volatility matters because it sets the price of options, the likely size of daily moves and how much risk a position really carries. Two traders with the same view pay very different premiums if volatility differs.`,
      hi: `Volatility isliye matter karti hai kyunki option ka daam, daily move ka size aur position ka asli risk isi se decide hota hai. Same view hone par bhi agar volatility alag ho toh premium bahut alag dena padta hai.`,
      how: `Premium rises with volatility for both calls and puts, so volatility is a direct cost to the buyer and income to the seller. Volatility also sizes stops: a stop 50 points away is sensible on a quiet day and meaningless on a day when the average swing is 200 points. Brokers and the clearing corporation (NSCCL) use volatility in SPAN margin, so margin for short options usually rises when markets get wilder. Ignoring volatility means mispricing cost, risk and margin together.`,
      eg: {
        title: 'Same strike, different volatility (illustrative)',
        text: `A 7-day 24,000 CE at spot 24,000 costs about ₹174.41 at IV 12% and ₹280.23 at IV 20%. That is ₹105.82 more per unit, or ₹6,878 more for one lot of 65, for exactly the same strike and expiry. The only difference is how much movement the market expects.`,
      },
      tip: `Before you buy or sell an option, ask what volatility you are paying or collecting, not just whether you are bullish or bearish.`,
      visual: {
        kind: 'bars',
        title: '7-day ATM call premium by IV (₹, illustrative)',
        unit: ' ₹',
        items: [
          { label: 'IV 12%', value: 174.41, tone: 'ice' },
          { label: 'IV 20%', value: 280.23, tone: 'gold' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 12, rate: 6.5 },
        why: `Move IV from 12 to 20 and watch the same strike's premium change.`,
      },
    },
    {
      t: 3,
      def: `Historical volatility (HV) is volatility calculated from past prices over a fixed window, such as the last 20 trading days. It looks backward: it tells you how much the market did move, not how much it will.`,
      hi: `Historical volatility past prices se nikalti hai, jaise pichhle 20 trading days ki. Yeh peeche dekhti hai: market kitna hila, yeh batati hai, aage kitna hilega yeh nahi.`,
      how: `Collect daily closing prices, convert to log returns, take their standard deviation, then multiply by √252 for an annual figure. The window length matters: a 10-day window reacts quickly and a 60-day window is smoother. One big day enters the calculation and then drops out when the window moves past it, so HV can jump and fall back without anything changing today. Most charting platforms and the NSE website provide HV or the data to compute it.`,
      eg: {
        title: 'A calm ten-day window (illustrative)',
        text: `Ten closes rise from 24,000 to 24,340 with small daily changes. The nine daily log returns have a standard deviation of about 0.33%, so HV = 0.33 × √252 = about 5.2% annualised. If the options market is quoting IV near 14% for the same period, it is pricing about three times the movement that recently occurred.`,
      },
      tip: `HV is a rear-view mirror. Always say which window you used; 10-day and 60-day HV can disagree a lot.`,
      visual: {
        kind: 'timeline',
        title: 'How historical volatility is built',
        events: [
          { when: 'Step 1', what: 'Collect daily closing prices for the window', tone: 'neutral' },
          { when: 'Step 2', what: 'Convert to daily log returns', tone: 'ice' },
          { when: 'Step 3', what: 'Standard deviation of those returns', tone: 'ice' },
          { when: 'Step 4', what: 'Multiply by √252 to annualise', tone: 'gold' },
        ],
      },
    },
    {
      t: 4,
      def: `Realized volatility is the volatility that actually occurred over the period you care about, for example the life of the option you traded. It is historical volatility measured over exactly that period, so it is known only after the fact.`,
      hi: `Realized volatility woh volatility hai jo us period mein actually hui jo aapke trade ke liye matter karta hai, jaise option ki life. Yeh us period ki historical volatility hi hai, isliye iska pata baad mein chalta hai.`,
      how: `An option seller earns when realized volatility ends below the implied volatility they sold, and a buyer earns when realized ends above what they paid. Realized volatility can be measured from close-to-close returns or from intraday data, and the two give different numbers because overnight gaps and intraday swings are counted differently. For a weekly Nifty option, the relevant realized figure covers only those few sessions, so it is noisy. Comparing implied with later realized is the basis of the volatility risk premium.`,
      eg: {
        title: 'Priced at 14%, delivered about 10% (illustrative)',
        text: `A trader sells a 7-day straddle at IV 14%, which implies a daily move of about 0.88% (14 ÷ √252). Over the next five sessions the closes are 24,000, 24,150, 23,980, 24,090, 23,930, 24,020. Realized volatility is about 10.3% annualised, a daily standard deviation of about 0.65%. The market delivered less movement than it priced, which favoured the seller in this case; a different week could go the other way.`,
      },
      tip: `You only know realized volatility afterwards. Do not confuse the number you estimate beforehand with the one the market actually delivers.`,
      visual: {
        kind: 'compare',
        title: 'Priced versus delivered',
        left: { head: 'Implied (priced)', tone: 'gold', points: ['Known today', 'Embedded in the premium', 'About 14% in this example'] },
        right: { head: 'Realized (delivered)', tone: 'ice', points: ['Known only afterwards', 'Measured from actual closes', 'About 10.3% in this example'] },
      },
    },
    {
      t: 5,
      def: `Implied volatility (IV) is the volatility number that makes an option pricing model match the premium actually trading in the market. It is not observed directly; it is worked backwards from price, so it is the option's price quoted in volatility terms.`,
      hi: `Implied volatility woh volatility number hai jo option pricing model mein daalne par market mein chal rahe premium ke barabar price deta hai. Yeh directly dikhti nahi, price se peeche calculate hoti hai, yaani option ka price volatility ki language mein.`,
      how: `Brokers and the NSE option chain run an iterative solver (Black-Scholes for European index options) that adjusts volatility until model price equals the last traded or mid price. When demand for options rises, premiums rise and IV rises with them. IV differs by strike and expiry, so there is no single IV for Nifty; India VIX is one summary of it. IV reflects supply and demand as well as expectations, so it can be higher than any sensible forecast of movement.`,
      eg: {
        title: 'Solving backwards from a premium (illustrative)',
        text: `With Nifty 24,000, 7 days to expiry and rate 6.5%, the model gives ₹200.85 for the 24,000 CE at IV 14%. If the CE trades at ₹210 instead, the IV that matches is about 14.7%. If it trades at ₹190, IV is about 13.2%. A ₹1 move in this premium shifts IV by roughly 0.07 of a point, so the screen IV is simply the premium restated.`,
      },
      tip: `IV is an output of the market price, not an input of nature. A high IV means options are expensive relative to a model, not that a big move is certain.`,
      visual: {
        kind: 'flow',
        title: 'How the chain computes IV',
        steps: [
          { label: 'Market premium', note: 'Traded or mid price', tone: 'gold' },
          { label: 'Pricing model', note: 'Spot, strike, days, rate', tone: 'neutral' },
          { label: 'Solve for volatility', note: 'Iterate until prices match', tone: 'ice' },
          { label: 'IV shown on chain', note: 'e.g. 14.7%', tone: 'gold' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14.7, rate: 6.5 },
        why: `At IV 14.7% the 24,000 CE is about ₹210; try other IV values to see premium respond.`,
      },
    },
    {
      t: 6,
      def: `Expected volatility is the market's forward-looking estimate of how much the index will move over a coming period. For Nifty it is summarised by India VIX, which expresses the expected annualised movement over the next 30 days.`,
      hi: `Expected volatility market ka aage ka andaaza hai ki index agle period mein kitna hilega. Nifty ke liye ise India VIX ek number mein dikhata hai, jo agle 30 din ki expected annualised movement hai.`,
      how: `You turn an annual volatility into a range for any horizon by scaling with the square root of time: expected move = spot × volatility × √(days ÷ 365). Many traders use 252 trading days instead; the two conventions differ slightly, so state yours. The result is a one-standard-deviation range: roughly two out of three outcomes should fall inside it if the estimate is right, and the rest outside. It is a reference for sizing and strike selection, not a limit on where the index can go.`,
      eg: {
        title: 'VIX 14 turned into points (illustrative)',
        text: `With Nifty at 24,000 and VIX 14, one standard deviation over 1 day is about 24,000 × 0.14 × √(1/365) = ₹175.9 points (212 points on a 252 basis). Over 7 days it is about 465 points, and over 30 days about 963 points. That puts a 7-day one-sigma band at roughly 23,535 to 24,465.`,
      },
      tip: `An expected-move band is not a boundary. Roughly one day in three can close outside the one-sigma range if the estimate is right.`,
      visual: {
        kind: 'bars',
        title: 'One-sigma Nifty move at VIX 14 (points)',
        unit: ' pts',
        items: [
          { label: '1 day', value: 176, tone: 'ice' },
          { label: '7 days', value: 465, tone: 'ice' },
          { label: '30 days', value: 963, tone: 'gold' },
        ],
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 14, days: 7 },
        why: `Enter the current VIX and days to expiry to get a reference range.`,
      },
    },
    {
      t: 7,
      def: `Direction is whether the price goes up or down; volatility is how far it travels either way. They are independent: you can be correct about one and wrong about the other.`,
      hi: `Direction matlab price upar jayega ya neeche; volatility matlab woh kitna door tak jaata hai, kisi bhi taraf. Dono alag cheezein hain: ek par aap sahi ho sakte hain aur doosre par galat.`,
      how: `A call or put bought outright depends on direction and also on volatility. A straddle (a CE and a PE at the same strike) depends mainly on the size of the move, since either side can supply the profit. Selling options is a view that volatility will stay below what was priced. Because index options are cash-settled and European on NSE, a position can be right on direction mid-week and still finish unprofitable if the final move is too small or the premium paid was too high.`,
      eg: {
        title: 'Up or down, the straddle only cares about size (illustrative)',
        text: `Buy the 7-day 24,000 straddle for ₹371.80 (about ₹24,167 for one lot of 65). If Nifty finishes at 24,500 the payoff is 500 minus 371.80 = ₹128.20 per unit, about ₹8,333 per lot. If Nifty finishes at 23,500 the payoff is the same. If it finishes at 24,100 the straddle is worth only ₹100 and the buyer loses ₹271.80 per unit.`,
      },
      tip: `Ask two separate questions: which way, and how far. Many losing option trades are right on the first and wrong on the second.`,
      visual: {
        kind: 'payoff',
        title: 'Long 24,000 straddle at expiry',
        caption: 'Profit comes from a large move in either direction, beyond the cost of ₹371.80.',
        spot: 24000,
        legs: [
          { type: 'CE', side: 1, strike: 24000, premium: 200.85 },
          { type: 'PE', side: 1, strike: 24000, premium: 170.95 },
        ],
      },
      calc: {
        id: 'straddle-move',
        preset: { spot: 24000, cePrice: 200.85, pePrice: 170.95, strike: 24000 },
        why: `Shows the move and breakevens the straddle price implies.`,
      },
    },
    {
      t: 8,
      def: `Momentum is persistent movement in one direction; volatility is the size of the swings. A market can trend steadily with low volatility, or swing wildly with no net progress.`,
      hi: `Momentum matlab ek hi direction mein lagataar chalna; volatility matlab swings ka size. Market kam volatility ke saath steadily trend kar sakta hai, ya bahut hilta rahe aur kahin pahunche nahi.`,
      how: `Momentum is usually measured by net return over a window or by moving averages. Volatility is measured by the spread of daily returns. Strong momentum with low volatility gives smooth trends that trend-followers prefer. High volatility with no momentum is choppy and tends to stop out directional traders on both sides. For option buyers, smooth momentum is cheaper to trade because premiums are low, while violent chop is costly because premiums are high and movement cancels itself.`,
      eg: {
        title: 'Two ten-day paths (illustrative)',
        text: `Path A climbs from 24,000 to 24,600 in ten sessions with small, steady steps: a net gain of 2.50% and an annualised volatility of about 1.5%. Path B swings between about 23,950 and 24,210 and ends at 24,020: a net gain of 0.08% with annualised volatility near 15.4%. Path A has momentum and almost no volatility; Path B has the reverse.`,
      },
      tip: `Do not treat a big move as a trend or a trend as high volatility. Measure net progress and swing size separately.`,
      visual: {
        kind: 'compare',
        title: 'Momentum versus volatility',
        left: { head: 'Path A: steady trend', tone: 'bull', points: ['Net +2.50% in 10 days', 'Annualised volatility about 1.5%', 'Smooth, low premiums'] },
        right: { head: 'Path B: wide chop', tone: 'neutral', points: ['Net +0.08% in 10 days', 'Annualised volatility about 15.4%', 'Large swings, no progress'] },
      },
    },
  ],
  tools: [
    { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 7 }, why: `Turn a volatility figure into a points range.` },
    { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: `See premium and vega for any IV.` },
  ],
}
export default m
