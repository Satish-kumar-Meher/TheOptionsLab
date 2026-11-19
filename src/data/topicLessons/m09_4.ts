import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '9.4',
  intro:
    `India VIX is one summary number for the whole NIFTY options market, but every strike and every expiry has its own implied volatility (IV). This module separates the two and shows why strikes and expiries are priced with different IV, what skew, smile and term structure mean, and how IV percentile, rank, expansion, contraction and crush affect what you pay and what you can earn. All option values are illustrative Black-Scholes numbers (Nifty 24,000, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `India VIX poore NIFTY options market ka ek summary number hai, lekin har strike aur har expiry ki apni implied volatility (IV) hoti hai. Is module mein dono ko alag karenge aur dekhenge ki strikes aur expiries alag IV par kyun price hote hain, skew, smile aur term structure ka kya matlab hai, aur IV percentile, rank, expansion, contraction aur crush aapke paise par kaise asar daalte hain. Saare option values illustrative Black-Scholes numbers hain (Nifty 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `India VIX is a market-wide volatility number built from NIFTY option prices over a 30-day horizon. Implied volatility of an individual option is the volatility that, put into an option pricing model, gives that option's current market price. Because supply and demand differ by strike and expiry, the IVs are not equal. Reading VIX together with the strike-wise and expiry-wise IV tells you where the market is paying up for protection or movement and where it is not.`,
    conceptHi:
      `India VIX 30 din ke horizon ke liye NIFTY option prices se bana market-wide volatility number hai. Kisi ek option ki implied volatility woh volatility hai jo option pricing model mein daalne par us option ka current market price deti hai. Strike aur expiry ke hisaab se demand-supply alag hoti hai, isliye IV barabar nahi hoti. VIX ke saath strike-wise aur expiry-wise IV padhne se pata chalta hai ki market kahan protection ya movement ke liye zyada paise de raha hai.`,
    mechanism:
      `IV is not observed directly; it is backed out from the traded price. If a 7-day ATM call trades at ₹200.85, the model solves for the IV that produces that price, here about 14%. Strike-wise IV depends on demand: index puts are heavily used for hedging, so downside strikes usually carry higher IV than equally distant calls (skew). Expiry-wise IV depends on the time and on events: the nearest expiry reacts most to news, farther expiries are steadier. IV percentile and IV rank tell you whether current IV is high or low compared with its own history, which helps decide between buying and selling premium.`,
    example: {
      title: 'Same strike distance, different IV (illustrative)',
      text: `With spot at 24,000 and 7 days left, a 24,500 CE (500 points OTM) priced at IV 13% costs about ₹31.38, while a 23,500 PE (500 points OTM) priced at IV 17% costs about ₹51.42. At a flat 14% for both they would cost ₹39.20 and ₹28.56. The market is paying about 64% more for the put than for the equidistant call, and that gap is skew.`,
    },
    chart: {
      kind: 'curve',
      title: 'Volatility smile / skew shape',
      caption: 'IV is lowest near the money and higher in the wings. In Indian index options, the downside wing is usually higher than the upside wing.',
      curve: 'iv-smile',
    },
    optionChain:
      `On an option chain the IV column is where this module lives. Read down the column: IV usually changes from strike to strike, often rising for far-OTM puts. Switch the expiry and compare ATM IV across weekly and monthly expiries. Compare ATM IV with India VIX. Do not compare the premium of two different strikes without comparing their IV, because a cheaper-looking premium may carry a higher IV. Many brokers show IV history, percentile or rank; check how their lookback period is defined.`,
    psychology:
      `Hedgers pay up for downside puts, which lifts put IV. Option sellers like high IV rank because it feels like paying well for taking risk, though risk rises with IV as well. Buyers prefer cheap-looking premiums and forget that a low premium can simply mean low probability. Around events, everyone knows IV will drop afterwards, yet many still buy options on the event day, hoping the move will be big enough.`,
    scenarios: {
      bullish:
        `A rally with falling IV: calls gain on delta and give back some on vega. If IV expands during a rally, calls gain on both. Skew may flatten as put hedges are removed.`,
      bearish:
        `A fall with rising IV: puts gain on delta and vega, and put skew steepens as downside protection gets dearer. After the fall, IV contraction can cut put gains even if the index stays low.`,
      sideways:
        `A sideways market with falling IV and passing time tends to shrink premiums on both sides. If IV is at the low end of its range and an event is near, expansion is possible; if IV is high with no event, contraction is more likely, but neither is guaranteed.`,
    },
    practice: [
      {
        q: `Over the last 252 trading days, India-VIX-linked ATM IV was lower than today's value on 189 days. What is today's IV percentile?`,
        a: `Percentile = 189 / 252 = 0.75, so 75%. Today's IV is higher than IV on three quarters of the days in the lookback.`,
      },
      {
        q: `In the past year ATM IV ranged from a low of 12 to a high of 28. Today it is 16. What is the IV rank?`,
        a: `Rank = (current − low) / (high − low) = (16 − 12) / (28 − 12) = 4 / 16 = 0.25, so 25%.`,
      },
      {
        q: `A 23,500 PE trades at ₹51.42 (IV 17%) and a 24,500 CE at ₹31.38 (IV 13%), both 7 days from expiry at spot 24,000. By how much, and how many times, is the put dearer?`,
        a: `Difference = 51.42 − 31.38 = ₹20.04 per unit. Ratio = 51.42 / 31.38 = about 1.64 times. For one lot of 65 the difference is about ₹1,303.`,
      },
      {
        q: `A 7-day 24,000 CE is priced at IV 14% (₹200.85). IV rises to 17% with spot and days unchanged (₹240.53). What is the gain per lot of 65?`,
        a: `Gain = 240.53 − 200.85 = ₹39.68 per unit. For one lot: 39.68 × 65 = ₹2,579.20, purely from IV expansion.`,
      },
    ],
    assignment:
      `Open a live option chain for NIFTY on the NSE website or your broker. Note ATM IV for the nearest weekly expiry and for the monthly expiry, and note IV at two strikes 500 points below and 500 points above spot. Write a table, mark the lowest IV strike, and write two sentences on whether the downside wing carried a higher IV than the upside wing and by how much.`,
  },
  topics: [
    {
      t: 1,
      def: `India VIX is a single index value that summarises expected 30-day volatility across the whole NIFTY options market. An option's own IV is the volatility implied by the price of that one strike and expiry. They are related but never identical.`,
      hi: `India VIX ek index value hai jo poore NIFTY options market ki agle 30 din ki expected volatility batati hai. Kisi option ki apni IV us ek strike aur expiry ke price se nikli volatility hoti hai. Dono judi hui hain, lekin kabhi bilkul barabar nahi hoti.`,
      how: `NSE computes India VIX from the best bid and ask prices of NIFTY options in the near and next expiry, blending them to a constant 30-day horizon. A single option's IV comes from solving the pricing model for one traded price. VIX is therefore a broad average, while the IV on your screen is specific. Near an expiry or event, the IV of the nearest weekly options can sit well above or below VIX. When you trade an option, its own IV decides the price you pay, so VIX is only the reference.`,
      eg: {
        title: 'VIX 14 but your option at IV 18 (illustrative)',
        text: `India VIX shows about 14. A 7-day ATM call is quoted at IV 18, because an event falls inside the week. The same 24,000 CE costs about ₹200.85 at IV 14 but about ₹253.76 at IV 18, which is ₹52.91 more per unit (₹3,439 for a lot of 65). A trader who judges the call using VIX alone would think it is fairly priced when it is not.`,
      },
      tip: `Always read the IV of the exact option you are trading. VIX is the weather report for the whole country; the option's IV is the temperature outside your door.`,
      visual: {
        kind: 'compare',
        title: 'India VIX versus option IV',
        caption: 'Related, but measured at different levels.',
        left: { head: 'India VIX', tone: 'gold', points: ['One number for NIFTY options as a whole', 'Built from near and next expiry quotes', 'Fixed 30-day horizon', 'A market mood gauge'] },
        right: { head: 'Option IV', tone: 'ice', points: ['One number per strike and expiry', 'Backed out from that option\'s own price', 'Horizon is that option\'s own time to expiry', 'Directly decides your premium'] },
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 18, rate: 6.5 },
        why: 'Price the same option at IV 14 and IV 18 to see why own-IV matters.',
      },
    },
    {
      t: 2,
      def: `Strike-wise IV is the implied volatility of each strike on the chain for one expiry. It usually differs from strike to strike because demand is not the same at every strike.`,
      hi: `Strike-wise IV ka matlab hai ek expiry ke har strike ki alag implied volatility. Yeh strike se strike badalti hai kyunki har strike par demand ek jaisi nahi hoti.`,
      how: `Heavy hedging in index puts raises the demand for downside strikes, so their IV often exceeds that of ATM and upside strikes. Far-OTM options carry extra IV because sellers want compensation for tail risk. Illiquid strikes can show odd or stale IV because of wide bid-ask spreads, so IV at a far strike may not be tradable. Always check if the IV is calculated from a recent trade or from a mid-price of a wide quote.`,
      eg: {
        title: 'Same expiry, three strikes (illustrative)',
        text: `Spot 24,000, 7 days left. The 23,500 PE shows IV 16.2% and costs about ₹44.87. At a flat 14% it would cost about ₹28.56, so the extra 2.2 IV points add about ₹16.31 per unit (about ₹1,060 per lot of 65). The 24,500 CE at IV 13.1% costs about ₹32.13 against ₹39.20 at 14%.`,
      },
      tip: `A "cheap" far-OTM option may still have the highest IV on the chain. Compare IV, not just rupees.`,
      visual: {
        kind: 'bars',
        title: 'Strike-wise IV on one expiry (illustrative)',
        caption: 'Downside strike carries the highest IV in this example.',
        unit: '%',
        items: [
          { label: '23,500 PE', value: 16.2, tone: 'gold' },
          { label: '24,000 ATM', value: 14, tone: 'neutral' },
          { label: '24,500 CE', value: 13.1, tone: 'ice' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'PE', spot: 24000, strike: 23500, days: 7, iv: 16.2, rate: 6.5 },
        why: 'Compare the put premium at IV 16.2 and at the flat ATM 14.',
      },
    },
    {
      t: 3,
      def: `Expiry-wise IV is the implied volatility of options with the same strike but different expiry dates. Weekly, next weekly and monthly expiries can each have a different IV.`,
      hi: `Expiry-wise IV ka matlab hai same strike par alag expiry dates ki IV. Weekly, next weekly aur monthly expiry ki IV alag alag ho sakti hai.`,
      how: `Each expiry carries its own expectation. An expiry that includes an event (RBI policy, Budget, election result, US Fed) will often be priced at higher IV than later expiries. Expiries further out are steadier and move less with daily news. IV and premium are different: a 30-day option has a higher premium than a 7-day option even at a lower IV, because of more time value. Compare IV across expiries to see where the event premium sits.`,
      eg: {
        title: 'Weekly versus monthly (illustrative)',
        text: `Spot 24,000. The 7-day ATM CE at IV 16% costs about ₹227.30. The 30-day ATM CE at IV 14.5% costs about ₹464.14. The weekly has the higher IV because of an event, yet it is the cheaper option since it has far less time to run. If the monthly were also at IV 16%, it would cost about ₹504.89.`,
      },
      tip: `Higher IV does not always mean higher premium. Premium depends on both IV and time. Compare IV across expiries and premium within one expiry.`,
      visual: {
        kind: 'bars',
        title: 'ATM IV by expiry (illustrative)',
        caption: 'The nearest expiry carries the event premium in this example.',
        unit: '%',
        items: [
          { label: '7-day expiry', value: 16, tone: 'gold' },
          { label: '30-day expiry', value: 14.5, tone: 'neutral' },
          { label: '60-day expiry', value: 14, tone: 'ice' },
        ],
      },
    },
    {
      t: 4,
      def: `IV skew is the pattern where options at different strikes (same expiry) have different IV. In index options the usual skew is that OTM puts have higher IV than OTM calls at the same distance.`,
      hi: `IV skew ka matlab hai ki same expiry ke alag strikes ki IV alag hoti hai. Index options mein aam skew yeh hota hai ki OTM puts ki IV, same distance ke OTM calls se zyada hoti hai.`,
      how: `Skew exists because investors buy puts to insure portfolios against falls, and falls tend to be quicker than rallies. The result is a downward-sloping IV pattern across strikes: the lower the strike, the higher the IV. When fear rises, skew steepens; when markets relax, skew flattens. Skew affects the price of any strategy that uses different strikes, such as spreads, strangles and iron condors, so look at it before choosing strikes.`,
      eg: {
        title: 'Put dearer than call at equal distance (illustrative)',
        text: `Spot 24,000, 7 days left. 23,500 PE at IV 17% costs about ₹51.42 and the 24,500 CE at IV 13% costs about ₹31.38. At a flat 14% they would be ₹28.56 and ₹39.20, so skew makes the put 80% dearer than its flat-IV value and the call 20% cheaper. Someone selling a strangle at these strikes collects more on the put side for a reason: the market charges for downside risk.`,
      },
      tip: `A put that looks richly paid may simply carry downside risk that the market is charging for. High premium is compensation, not a free gift.`,
      visual: {
        kind: 'curve',
        title: 'Typical index skew',
        caption: 'Downside strikes carry higher IV than upside strikes.',
        curve: 'iv-smile',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'PE', spot: 24000, strike: 23500, days: 7, iv: 17, rate: 6.5 },
        why: 'Price the 23,500 PE at IV 17 and at 14 to see the skew premium.',
      },
    },
    {
      t: 5,
      def: `A volatility smile is a plot of IV against strike that curves up on both sides, like a smile, with the lowest IV near the money. It shows that far-OTM options on both sides are priced at higher IV than ATM.`,
      hi: `Volatility smile ek graph hai jisme strike ke saamne IV dono taraf upar curve hoti hai, smile ki tarah, aur sabse kam IV ATM ke paas hoti hai. Yeh dikhata hai ki dono taraf ke far-OTM options ATM se zyada IV par price hote hain.`,
      how: `Standard pricing models assume one volatility for all strikes, which would give a flat line. Real prices show a curve because extreme moves happen more often than the simple model assumes, so far-OTM options are priced higher. For Indian index options the curve often tilts to a skew (higher on the downside) rather than a symmetric smile. The shape changes with market mood: it becomes steeper in stress and flatter in calm times. It is the visual form of "the market charges more for the tails".`,
      eg: {
        title: 'Reading a smile (illustrative)',
        text: `Suppose the 23,500 PE is at IV 17%, ATM 24,000 at 14% and the 24,500 CE at 15%. Priced at 15% instead of a flat 14%, the 24,500 CE costs about ₹47.60 against ₹39.20, so the wing premium adds about ₹8.40 per unit (about ₹546 per lot of 65). Both wings sit above ATM, which is the smile.`,
      },
      tip: `If the model price (flat IV) and the market price differ at the wings, that gap is the smile, not a mispricing waiting to be harvested.`,
      visual: {
        kind: 'curve',
        title: 'Volatility smile',
        caption: 'IV is lowest ATM and rises toward both wings.',
        curve: 'iv-smile',
      },
    },
    {
      t: 6,
      def: `Volatility term structure is the way IV changes across expiries for the same strike, for example from the weekly to the monthly to the far-month expiry.`,
      hi: `Volatility term structure ka matlab hai ki same strike ke liye alag alag expiry par IV kaise badalti hai, jaise weekly se monthly se far-month tak.`,
      how: `In calm markets, IV usually rises slightly with time because longer horizons carry more uncertainty (upward-sloping or "contango"). In stressed markets or before an event, near-term IV jumps above longer-term IV (downward-sloping or "backwardation"), because fear is concentrated in the short term. The slope tells you where the market expects the turbulence. After the event, the front end falls back and the curve normalises.`,
      eg: {
        title: 'Inverted term structure before an event (illustrative)',
        text: `Spot 24,000. The 7-day ATM call at IV 20% costs about ₹280.23, the 30-day at IV 15% about ₹477.72 and the 60-day at IV 14.5% about ₹696.57. IV falls from 20% to 14.5% as you move out, meaning the market expects the turbulence soon and calm afterwards. Premium still rises with time even though IV falls.`,
      },
      tip: `A steeply inverted term structure says "the event is near". If you buy the front expiry, you are paying the event premium.`,
      visual: {
        kind: 'bars',
        title: 'Term structure of ATM IV (illustrative)',
        caption: 'Front-end IV is higher than the later expiries: an inverted structure.',
        unit: '%',
        items: [
          { label: '7-day', value: 20, tone: 'gold' },
          { label: '30-day', value: 15, tone: 'neutral' },
          { label: '60-day', value: 14.5, tone: 'ice' },
        ],
      },
    },
    {
      t: 7,
      def: `IV percentile tells you the percentage of days in a chosen lookback period (often one year) on which IV was lower than today's IV. A high percentile means IV is high compared with its own history.`,
      hi: `IV percentile batata hai ki ek chune hue lookback period (aksar ek saal) mein kitne percent din IV aaj ki IV se kam thi. High percentile ka matlab hai ki IV apni history ke hisaab se high hai.`,
      how: `Formula: count the days with IV below today's IV, divide by total days, multiply by 100. It depends on the lookback you choose, 6 months and 1 year can give different answers. Percentile is useful for judging if premiums are expensive or cheap relative to normal, which matters to both buyers and sellers. It does not say what IV will do next; high percentiles can stay high in a stressful period.`,
      eg: {
        title: '200 of 250 days (illustrative)',
        text: `Over the last 250 trading days, ATM IV was lower than today's 14 on 200 days. Percentile = 200 / 250 = 80%. So 14 is high for this stock or index in the past year even though 14 may sound ordinary. If the lookback was only 60 days, the answer could be quite different.`,
      },
      tip: `State the lookback whenever you quote a percentile. An 80th percentile over six months is not the same statement as over five years.`,
      visual: {
        kind: 'gauge',
        title: 'IV percentile reading (illustrative: 80)',
        caption: 'Zones are teaching bands only.',
        min: 0,
        max: 100,
        value: 80,
        unit: '%',
        zones: [
          { from: 0, to: 30, label: 'IV low vs history', tone: 'ice' },
          { from: 30, to: 70, label: 'Middle', tone: 'neutral' },
          { from: 70, to: 100, label: 'IV high vs history', tone: 'gold' },
        ],
      },
    },
    {
      t: 8,
      def: `IV rank shows where today's IV sits between the lowest and highest IV of the lookback period: (current − low) / (high − low). It is a position in a range, not a count of days.`,
      hi: `IV rank batata hai ki aaj ki IV lookback period ki sabse kam aur sabse zyada IV ke beech kahan hai: (current − low) / (high − low). Yeh range mein position hai, dino ki ginti nahi.`,
      how: `Because it uses only the highest and lowest IV, one extreme spike (such as March 2020 or an election day) can stretch the range and push rank down for months even when IV is high on most days. That is why rank and percentile can disagree. Many traders read both together: a high percentile with a low rank often means a past spike is distorting the range, while a high value on both suggests IV is truly rich.`,
      eg: {
        title: 'Same IV, different story (illustrative)',
        text: `ATM IV over the past year: low 11, high 25, today 14. Rank = (14 − 11) / (25 − 11) = 3 / 14 = 21.43%. The percentile for the same 14 was 80% in the previous topic, because on most days IV was lower. The one-time spike to 25 holds rank down, so rank says "cheap" while percentile says "high".`,
      },
      tip: `Never use rank alone. Check percentile too, and see whether one old spike is stretching the range.`,
      visual: {
        kind: 'compare',
        title: 'IV rank versus IV percentile',
        caption: 'Same IV of 14, two different readings (illustrative).',
        left: { head: 'IV rank = 21.43%', tone: 'ice', points: ['Position between low 11 and high 25', 'Distorted by one spike to 25', 'Says: near the bottom of the range'] },
        right: { head: 'IV percentile = 80%', tone: 'gold', points: ['Share of days with lower IV', 'Not distorted by a single day', 'Says: higher than most days'] },
      },
    },
    {
      t: 9,
      def: `IV expansion is a rise in implied volatility. Option premiums increase even if the spot price does not move.`,
      hi: `IV expansion ka matlab hai implied volatility ka badhna. Spot price na hile tab bhi option premium badh jaata hai.`,
      how: `IV expands before events, during sell-offs, when uncertainty rises or when hedge demand increases. All long options benefit through vega, with ATM options of longer expiry gaining the most in rupees. Option sellers lose on paper as premiums expand, and margin requirements for sellers often rise too. Expansion can reverse quickly once the uncertainty is resolved, so a gain from expansion is not guaranteed to hold.`,
      eg: {
        title: 'IV 14 to 17 ahead of an event (illustrative)',
        text: `A 7-day 24,000 CE bought at IV 14% for about ₹200.85 is worth about ₹240.53 if IV rises to 17% with spot and days unchanged, a gain of ₹39.68 per unit (₹2,579 per lot of 65). The ATM vega is about ₹13.22 per IV point, so 3 points × 13.22 = 39.66, which matches closely.`,
      },
      tip: `Buying ahead of an event can work if IV is still low, but the same expansion can reverse right after the news.`,
      visual: {
        kind: 'bars',
        title: '7-day 24,000 CE premium as IV expands (illustrative)',
        caption: 'Spot and days unchanged.',
        unit: ' ₹',
        items: [
          { label: 'IV 14%', value: 200.85, tone: 'ice' },
          { label: 'IV 17%', value: 240.53, tone: 'gold' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 17, rate: 6.5 },
        why: 'Compare price and vega at IV 14 and 17.',
      },
    },
    {
      t: 10,
      def: `IV contraction is a fall in implied volatility. Option premiums fall even if the spot price does not move.`,
      hi: `IV contraction ka matlab hai implied volatility ka girna. Spot price na hile tab bhi option premium ghat jaata hai.`,
      how: `IV contracts when uncertainty fades, the market calms or an event passes. Long options lose on vega on top of theta, which is why buyers can lose money even when the market moves in their favour but too slowly. Sellers benefit from contraction, but only while the market also stays within their breakevens. Contraction is often fastest in the first sessions after a shock.`,
      eg: {
        title: 'IV 17 to 14 over two days (illustrative)',
        text: `A 24,000 CE with 7 days left at IV 17% costs about ₹240.53. Two days later, spot is unchanged, 5 days remain, and IV is 14%: the option costs about ₹167.73, a loss of ₹72.80 per unit (₹4,732 per lot of 65). Of that, time decay is ₹39.24 (₹201.29 at 5 days and IV 17%) and the IV fall is ₹33.56.`,
      },
      tip: `Theta and vega can work together against a buyer. Count both before you pay for premium.`,
      visual: {
        kind: 'bars',
        title: '24,000 CE value as IV contracts and time passes (illustrative)',
        caption: 'Spot is 24,000 throughout.',
        unit: ' ₹',
        items: [
          { label: '7 days, IV 17%', value: 240.53, tone: 'gold' },
          { label: '5 days, IV 17%', value: 201.29, tone: 'neutral' },
          { label: '5 days, IV 14%', value: 167.73, tone: 'ice' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 5, iv: 14, rate: 6.5 },
        why: 'Reprice the option at 5 days and IV 14, then at IV 17 to separate time and IV effects.',
      },
    },
    {
      t: 11,
      def: `IV crush is a sudden, sharp fall in implied volatility right after a known event, such as RBI policy, results or Budget. Option premiums fall quickly because the uncertainty has been resolved.`,
      hi: `IV crush ka matlab hai kisi known event ke turant baad implied volatility ka achanak tezi se girna, jaise RBI policy, results ya Budget. Uncertainty khatam ho jaati hai toh option premium tezi se gir jaata hai.`,
      how: `Before the event, option sellers demand extra premium to take the risk of a gap, so IV is lifted. Once the news is out, that extra premium evaporates immediately, whichever way the market moves. A buyer needs the move to be larger than the crush, not just in the right direction. Selling before the event looks attractive for this reason, but event-day gaps can be large, so naked selling carries real tail risk.`,
      eg: {
        title: 'Right direction, still a loss (illustrative)',
        text: `The day before an event, spot is 24,000, 2 days remain, IV is 22% and the 24,000 CE costs about ₹160.21. After the event Nifty rises 120 points to 24,120, 1 day remains and IV falls to 14%. The CE is worth about ₹149.25, a loss of ₹10.96 per unit (about ₹712 per lot of 65). Had IV stayed at 22%, it would be about ₹183.59, so the crush cost ₹34.34.`,
      },
      tip: `Buying options just before an event means you pay the event premium. You need a move bigger than that premium, not just the right direction.`,
      visual: {
        kind: 'flow',
        title: 'Event IV crush (illustrative numbers)',
        caption: 'The call rose with spot, but the IV crush outweighed the gain.',
        steps: [
          { label: 'Before event', note: 'IV 22%, CE ₹160.21', tone: 'gold' },
          { label: 'Event: Nifty +120', note: 'Spot gain adds value', tone: 'ice' },
          { label: 'Uncertainty gone', note: 'IV 14%, CE ₹149.25', tone: 'ice' },
          { label: 'Net result', note: '−₹10.96 per unit', tone: 'bear' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24120, strike: 24000, days: 1, iv: 14, rate: 6.5 },
        why: 'Price the call after the event at IV 14, then at IV 22 to see the crush.',
      },
    },
  ],
}

export default m
