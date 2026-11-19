import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '9.6',
  intro:
    `Once you know what VIX and IV are, the next step is to understand how volatility behaves: why implied volatility is usually priced above what actually happens, why calm and stormy days come in clusters, how to turn volatility into an expected move, and why no forecast is reliable. This module covers the ideas professional option traders use every day, in plain words. Everything is for learning, not a trading signal. Numbers are illustrative Black-Scholes values (Nifty 24,000, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `VIX aur IV samajhne ke baad agla kadam hai yeh samajhna ki volatility behave kaise karti hai: implied volatility aam taur par asli movement se zyada kyun price hoti hai, shaant aur toofani din group mein kyun aate hain, volatility ko expected move mein kaise badlein, aur koi bhi forecast bharosemand kyun nahi hota. Professional option traders yeh ideas roz use karte hain, yahan simple shabdon mein. Sab kuch seekhne ke liye hai, trading signal nahi. Numbers illustrative Black-Scholes values hain (Nifty 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `Implied volatility is what the market expects; realized volatility is what actually happens. Advanced volatility thinking is about the gap between the two, and about the patterns in how volatility behaves: it clusters, it shifts between regimes, it jumps around events and it tends to drift back toward a normal level after extremes. None of this lets you predict the next day's move; it helps you judge whether the price of an option looks rich or cheap relative to what is likely.`,
    conceptHi:
      `Implied volatility woh hai jo market expect karta hai; realized volatility woh hai jo asal mein hota hai. Advanced volatility ka matlab hai in dono ke beech ka gap aur volatility ke patterns samajhna: yeh clusters mein aati hai, regimes badalti hai, events ke aas-paas jump karti hai aur extreme ke baad normal level ki taraf lautne ki tendency rakhti hai. Isse agle din ka move predict nahi hota; bas yeh judge karne mein madad milti hai ki option ka price mehnga hai ya sasta.`,
    mechanism:
      `Expected move = Spot × volatility × √(days / 365). Realized volatility is the standard deviation of daily returns, annualised (usually × √252 for trading days). Comparing implied with realized shows whether sellers are being paid more than the market actually delivered. On average, implied volatility has tended to be above realized volatility, because buyers pay for insurance, but this average hides rare, very costly exceptions. Skew and the volatility surface show how that expectation differs by strike and expiry.`,
    example: {
      title: 'Expected move at VIX 14 (illustrative)',
      text: `Spot 24,000, VIX 14. One-standard-deviation move over 7 days = 24,000 × 0.14 × √(7/365) = about 465.31 points (1.94%). The 7-day ATM straddle costs about ₹371.79, which is roughly 0.8 times that 465.31 move. About two-thirds of the time (under the normal-distribution assumption) the index would be expected to stay within 23,535 to 24,465, but the tails are fatter in real markets.`,
    },
    chart: {
      kind: 'curve',
      title: 'Normal distribution behind the expected move',
      caption: 'One standard deviation covers about 68% of outcomes in the model. Real index returns have fatter tails.',
      curve: 'normal',
    },
    optionChain:
      `The chain shows the ingredients: ATM IV (compare with recent realized volatility), the IV at different strikes (skew) and across expiries (term structure). The ATM straddle price on the chain is a quick read of the expected move: roughly 80% of the one-standard-deviation move. If the ATM straddle for the week costs ₹372, the market is pricing about a ±372-point range at expiry.`,
    psychology:
      `Sellers like the idea that implied volatility is usually higher than realized, and may become overconfident after a calm stretch. Buyers see the pattern of occasional huge moves and over-pay for protection. After a large shock, many assume volatility will "settle" quickly and are caught again by a second shock because of clustering. Humility about forecasts is part of professional risk management.`,
    scenarios: {
      bullish:
        `In a persistent, orderly uptrend realized volatility can stay below implied, and call buyers often find the premium decaying faster than the index rises. In a fast, news-driven rally realized volatility can overtake implied.`,
      bearish:
        `Sharp falls bring volatility clustering: a big down day tends to be followed by more large moves. Realized volatility can jump well above implied, hurting sellers and helping buyers who are positioned early.`,
      sideways:
        `In a tight range, realized falls below implied, which is when the volatility risk premium shows up for sellers. It is also when complacency and thin premium can build before a breakout.`,
    },
    practice: [
      {
        q: `VIX is 14 and Nifty is 24,000. What is the one-standard-deviation expected move over 30 days, in points and in percent?`,
        a: `Move = 24,000 × 0.14 × √(30/365). √(30/365) = 0.28669, so 3,360 × 0.28669 = about 963.28 points. Percent = 963.28 / 24,000 = about 4.01%.`,
      },
      {
        q: `The 7-day ATM straddle costs ₹371.79 at IV 14% and ₹292.50 at IV 11%. If realized volatility turns out to be 11%, how much more did the straddle seller collect than the "fair" realized-vol price, and what is that percentage over the realized-vol price?`,
        a: `Difference = 371.79 − 292.50 = ₹79.29 per unit. Percentage = 79.29 / 292.50 = about 27.1%. Per lot of 65 it is about ₹5,154. This is the volatility risk premium in one example; it is not guaranteed and can turn negative.`,
      },
      {
        q: `Compare the 30-day one-standard-deviation move at VIX 28 (1,926.56 points) and VIX 16 (1,100.89 points). What is the ratio, and does it match the ratio of the volatilities?`,
        a: `1,926.56 / 1,100.89 = 1.75. VIX ratio is 28 / 16 = 1.75. The expected move scales linearly with volatility for a given time period.`,
      },
      {
        q: `Ten daily Nifty returns have a standard deviation of 0.514%. What is the annualised realized volatility using 252 trading days, and how does it compare with a VIX of 14?`,
        a: `Annualised = 0.514% × √252 = 0.514 × 15.875 = about 8.16%. Implied (VIX 14) is about 5.84 points higher than this short-sample realized value. Ten days is a very small sample, so treat the comparison with caution.`,
      },
    ],
    assignment:
      `Download 60 daily Nifty closing prices from NSE. Compute the daily percentage returns, their standard deviation and annualise it (× √252) to get 60-day realized volatility. Compare it with the average India VIX over the same period. Write three sentences: was implied above or below realized, by how much, and what you would need to be careful about before concluding that sellers were paid well.`,
  },
  topics: [
    {
      t: 1,
      def: `The volatility risk premium (VRP) is the extra amount by which implied volatility has tended to exceed the realized volatility that actually follows. It is like an insurance premium: buyers pay a bit more than the average claim.`,
      hi: `Volatility risk premium (VRP) woh extra hissa hai jisse implied volatility, baad mein asal mein aane wali realized volatility se aam taur par zyada rehti hai. Yeh insurance premium jaisa hai: buyers average claim se thoda zyada dete hain.`,
      how: `Option buyers, especially hedgers who buy puts to protect portfolios, are willing to pay more than the statistical cost of the risk. Sellers need compensation for taking the tail risk, so implied volatility is priced above the average realized volatility. The premium is an average over many periods; in a stress event realized volatility can far exceed implied and wipe out many months of collected premium. It is not a guaranteed edge and it is not the same on every day or in every market.`,
      eg: {
        title: 'IV 14 against realized 11 (illustrative)',
        text: `The 7-day 24,000 straddle at IV 14% costs about ₹371.79. If volatility turns out to be 11%, the same straddle would be worth about ₹292.50. The gap is ₹79.29 per unit, or about ₹5,154 per lot of 65. A seller could keep that gap if the market stays within breakevens, but one week of realized volatility at 22% would turn it into a loss.`,
      },
      tip: `The VRP is an average, not a promise. Sellers collect it slowly and can lose it quickly.`,
      visual: {
        kind: 'bars',
        title: '7-day ATM straddle at implied versus realized volatility (illustrative)',
        caption: 'Gap between the two bars is the premium sellers are paid, if the market behaves.',
        unit: ' ₹',
        items: [
          { label: 'Priced at IV 14%', value: 371.79, tone: 'gold' },
          { label: 'Worth at realized 11%', value: 292.5, tone: 'ice' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 11, rate: 6.5 },
        why: 'Price the call at IV 11 and at IV 14 to see the premium gap.',
      },
    },
    {
      t: 2,
      def: `Volatility clustering means large moves tend to be followed by large moves and small moves by small moves. Calm and stormy periods come in groups instead of being spread evenly.`,
      hi: `Volatility clustering ka matlab hai ki bade moves ke baad aksar bade moves aate hain aur chhote moves ke baad chhote. Shaant aur toofani periods group mein aate hain, barabar failay hue nahi.`,
      how: `After a shock, uncertainty stays: traders adjust positions, margins change, news follows, so the next days stay active. After a long quiet spell, the market slips into low-volatility habits. This is why a single big day does not mean volatility is "over" the next morning. It also helps explain why realized volatility measured on the last few days is a better short-term guide than the long-run average, and why the options market raises IV after a big day.`,
      eg: {
        title: 'Five active days (illustrative)',
        text: `Daily Nifty moves of +1.6%, −1.9%, +2.1%, −2.4% and +1.8% have a standard deviation of about 2.20%. Annualised (× √252) that is about 34.9%, far above a normal-market VIX in the teens. Five consecutive large moves is the cluster; a trader who assumed the next day would be quiet would underestimate the range.`,
      },
      tip: `After a big move, assume more movement is likely, not less. Size positions for the cluster you are in, not the calm you wish for.`,
      visual: {
        kind: 'timeline',
        title: 'A volatility cluster (illustrative)',
        caption: 'Quiet, shock, cluster, slow calming.',
        events: [
          { when: 'Weeks of calm', what: 'Daily moves under 0.5%, VIX low', tone: 'ice' },
          { when: 'Shock day', what: 'Index moves 2% or more; VIX jumps', tone: 'gold' },
          { when: 'Next days', what: 'More 1% to 2% swings in both directions', tone: 'gold' },
          { when: 'Weeks later', what: 'Moves shrink gradually; VIX cools', tone: 'ice' },
        ],
      },
    },
    {
      t: 3,
      def: `A volatility regime is a period in which volatility stays in a broadly similar range, such as a low-vol regime, a normal regime or a high-vol regime. Markets switch from one regime to another from time to time.`,
      hi: `Volatility regime ek aisa period hai jisme volatility lagbhag ek jaisi range mein rehti hai, jaise low-vol, normal ya high-vol regime. Market samay samay par ek regime se doosre mein badalta hai.`,
      how: `In a low-vol regime, daily ranges are small, premiums are thin and trend-following works with tight stops. In a high-vol regime, daily ranges are wide, premiums are expensive and the same stop-loss is hit by noise. Many strategies that work in one regime fail in another, which is why traders check VIX, realized volatility and daily range before choosing size and strategy. Regime changes are clear only in hindsight, so use rules (like position size scaling with VIX) rather than predictions.`,
      eg: {
        title: 'One-day expected move in three regimes (illustrative)',
        text: `From 24,000, the one-day one-standard-deviation move is about 150.75 points at VIX 12, about 226.12 points at VIX 18 and about 376.87 points at VIX 30. The same 100-point stop is well inside the daily range at VIX 30 but reasonably far at VIX 12. Position sizes and strike selection should change with the regime.`,
      },
      tip: `Scale position size to the regime. A stop that is sensible at VIX 12 is noise at VIX 30.`,
      visual: {
        kind: 'bars',
        title: 'One-day expected Nifty move by regime (illustrative, points)',
        caption: 'The range widens roughly in proportion to volatility.',
        unit: ' pts',
        items: [
          { label: 'Low (VIX 12)', value: 150.75, tone: 'ice' },
          { label: 'Normal (VIX 18)', value: 226.12, tone: 'neutral' },
          { label: 'Stress (VIX 30)', value: 376.87, tone: 'gold' },
        ],
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 30, days: 1 },
        why: 'Compare the one-day expected move at VIX 12, 18 and 30.',
      },
    },
    {
      t: 4,
      def: `Event-driven volatility is the extra implied volatility that builds into option prices before a known event, such as RBI policy, Union Budget, election results, quarterly results or a US Fed decision, and then drops after it.`,
      hi: `Event-driven volatility woh extra implied volatility hai jo kisi known event, jaise RBI policy, Union Budget, election results, quarterly results ya US Fed decision, se pehle option prices mein jud jaati hai aur event ke baad gir jaati hai.`,
      how: `Sellers know a gap is possible, so they raise the price of options expiring after the event. Short-dated options that span the event carry the largest event premium, and options that expire before it carry none. After the announcement the extra premium disappears (the IV crush). If the actual move is larger than what was priced, buyers gain; if it is smaller, sellers gain. The straddle price before the event gives the market's estimate of the event move.`,
      eg: {
        title: 'Two-day option spanning an event (illustrative)',
        text: `With 2 days left, the 24,000 CE costs about ₹103.54 at IV 14% and about ₹160.21 at IV 22%, a difference of ₹56.67 per unit (about ₹3,684 per lot of 65). The 24,000 straddle goes from about ₹198.53 to about ₹311.86, a difference of ₹113.33 (about ₹7,366 per lot). That extra amount is the event premium that disappears once the event passes.`,
      },
      tip: `Before an event, ask what move is already priced in. The straddle gives you that number; your edge, if any, is in judging whether it is too high or too low.`,
      visual: {
        kind: 'bars',
        title: '2-day 24,000 straddle with and without event premium (illustrative)',
        caption: 'The event premium sits on top of the normal price.',
        unit: ' ₹',
        items: [
          { label: 'No event (IV 14%)', value: 198.53, tone: 'ice' },
          { label: 'Event priced (IV 22%)', value: 311.86, tone: 'gold' },
        ],
      },
      calc: {
        id: 'straddle-move',
        preset: { spot: 24000, cePrice: 160.21, pePrice: 151.65, strike: 24000 },
        why: 'Read the implied event move from the 2-day straddle (about ₹311.86).',
      },
    },
    {
      t: 5,
      def: `Expected move calculation turns volatility into a price range: Spot × volatility × √(days / 365). It gives the one-standard-deviation range that the market is pricing, not a forecast of direction.`,
      hi: `Expected move calculation volatility ko price range mein badalta hai: Spot × volatility × √(days / 365). Yeh market ki priced one-standard-deviation range deta hai, direction ka forecast nahi.`,
      how: `Use VIX or an option's own IV as the volatility, convert days to years and multiply. One standard deviation covers about 68% of outcomes under a normal distribution; two standard deviations about 95%. A fast shortcut is the ATM straddle price, which is roughly 80% of the one-standard-deviation move. Real index returns have fatter tails than the normal curve, so breaches of the range are more common than the model suggests.`,
      eg: {
        title: 'Nifty 24,000, VIX 14 (illustrative)',
        text: `For 1 day: 24,000 × 0.14 × √(1/365) = about 175.87 points. For 7 days: about 465.31 points. For 30 days: about 963.28 points. The 7-day straddle at about ₹371.79 is 0.80 times the 465.31-point move, which agrees with the shortcut.`,
      },
      tip: `The range is a one-standard-deviation estimate, so about a third of outcomes fall outside it. Never treat it as a boundary.`,
      visual: {
        kind: 'bars',
        title: 'Expected Nifty move at VIX 14 by horizon (points)',
        caption: 'Grows with the square root of time, not linearly.',
        unit: ' pts',
        items: [
          { label: '1 day', value: 175.87, tone: 'ice' },
          { label: '7 days', value: 465.31, tone: 'neutral' },
          { label: '30 days', value: 963.28, tone: 'gold' },
        ],
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 14, days: 7 },
        why: 'Compute the 1σ range for any VIX and horizon.',
      },
    },
    {
      t: 6,
      def: `Comparing realized with implied volatility asks: is what the market actually did smaller or larger than what the options priced in? Implied is the forward expectation; realized is the measured past movement.`,
      hi: `Realized aur implied volatility ki tulna yeh poochti hai: market ne asal mein jo kiya, woh options ke priced move se chhota tha ya bada? Implied aage ki expectation hai; realized beeta hua measured movement hai.`,
      how: `Realized volatility is computed as the standard deviation of daily percentage returns over a window (for example 10, 20 or 60 days) multiplied by √252 to annualise. Put it next to ATM IV or VIX. If implied is well above realized, options are rich compared with recent behaviour; if realized is above implied, options are cheap compared with recent behaviour. The window choice matters, and a short window can mislead. Past realized volatility does not tell you what future realized volatility will be.`,
      eg: {
        title: 'Ten quiet days against VIX 14 (illustrative)',
        text: `Ten daily returns of +0.5, −0.8, +0.3, −0.4, +0.6, −0.2, +0.7, −0.5, +0.1 and −0.3 per cent have a standard deviation of about 0.514%. Annualised: 0.514 × √252 ≈ 8.16%. VIX is 14, so implied is about 5.84 points above this recent realized figure. Ten days is a short sample, so this says options look rich versus the last two weeks, not that they are mispriced.`,
      },
      tip: `Always state the window. Realized volatility over 10 days and over 60 days can tell different stories.`,
      visual: {
        kind: 'compare',
        title: 'Implied versus realized volatility',
        caption: 'One looks forward, the other looks back.',
        left: { head: 'Implied (IV, VIX)', tone: 'gold', points: ['Backed out from option prices', 'A forward expectation', 'Includes risk premium and event premium'] },
        right: { head: 'Realized', tone: 'ice', points: ['Std. deviation of past daily returns', 'Annualised by √252', 'Depends on the window you pick'] },
      },
    },
    {
      t: 7,
      def: `Volatility skew is the difference in IV across strikes for a given expiry. For index options, downside strikes usually carry higher IV than upside strikes, so OTM puts are priced richer than equidistant OTM calls.`,
      hi: `Volatility skew ek expiry ke alag strikes ki IV ka difference hai. Index options mein downside strikes ki IV aam taur par upside strikes se zyada hoti hai, isliye OTM puts equidistant OTM calls se zyada mehnge hote hain.`,
      how: `Skew reflects demand for downside protection and the observation that falls tend to be faster than rallies. A simple measure is put IV minus call IV at equal distance from spot (for example 500 points each side). A larger gap means more fear priced in. The gap changes with mood: it widens in sell-offs and narrows in rallies. For traders it matters because skew changes the price of spreads and risk reversals, and it makes selling puts look richer than selling calls for a reason.`,
      eg: {
        title: 'A 4-point skew (illustrative)',
        text: `23,500 PE at IV 17% costs about ₹51.42 and the 24,500 CE at IV 13% costs about ₹31.38 with 7 days left at spot 24,000. The skew is 17 − 13 = 4 volatility points. A trader who sells both (a strangle) collects ₹82.80 per unit (about ₹5,382 per lot of 65), with the put side providing about 62% of the credit.`,
      },
      tip: `Skew is a price for tail risk. The richer put premium is not free money; it reflects how markets fall.`,
      visual: {
        kind: 'curve',
        title: 'Volatility skew across strikes',
        caption: 'Downside strikes carry the higher IV.',
        curve: 'iv-smile',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'PE', spot: 24000, strike: 23500, days: 7, iv: 17, rate: 6.5 },
        why: 'Price the put at the skewed IV of 17 and at the flat 14.',
      },
    },
    {
      t: 8,
      def: `A volatility surface is a three-dimensional map of implied volatility across strikes (one axis) and expiries (the other axis). It combines skew and term structure in one picture.`,
      hi: `Volatility surface strikes (ek axis) aur expiries (doosri axis) par implied volatility ka three-dimensional map hai. Isme skew aur term structure ek hi picture mein aa jaate hain.`,
      how: `Each point on the surface is the IV of one strike and expiry. Professional desks and market makers watch the whole surface because spreads, calendars and hedges involve several points at once. Moving along strikes gives skew; moving along expiries gives term structure. When fear rises the surface lifts and steepens, especially at the front end and the downside wing. A retail trader can build a small version by tabulating IV for three strikes and three expiries from the option chain.`,
      eg: {
        title: 'A 3 × 3 surface (illustrative IV %)',
        text: `7-day expiry: 23,500 at 17.5, 24,000 at 14.0, 24,500 at 13.5. 30-day: 16.5, 14.5, 14.0. 60-day: 16.0, 14.5, 14.2. Reading across a row gives skew; reading down a column gives term structure. The highest value, 17.5, sits at the nearest expiry and the lowest strike, where fear is concentrated. The 30-day 24,000 CE at 14.5% costs about ₹464.14.`,
      },
      tip: `Looking at only one IV number misses most of the information. Check strike and expiry before judging whether an option is rich.`,
      visual: {
        kind: 'matrix',
        title: 'Corners of the volatility surface (illustrative IV %)',
        caption: 'Cells show IV at the corners of the surface: near and far expiry, downside and upside strike.',
        xLabels: ['Downside strike (23,500)', 'Upside strike (24,500)'],
        yLabels: ['Near expiry (7 days)', 'Far expiry (60 days)'],
        cells: [
          { head: '17.5%', note: 'Highest: near, downside', tone: 'gold' },
          { head: '13.5%', note: 'Near, upside', tone: 'ice' },
          { head: '16.0%', note: 'Far, downside', tone: 'neutral' },
          { head: '14.2%', note: 'Far, upside', tone: 'ice' },
        ],
      },
    },
    {
      t: 9,
      def: `Volatility mean reversion is the tendency of volatility to drift back toward its long-run average after unusually high or low levels. It is a tendency, not a timetable.`,
      hi: `Volatility mean reversion ka matlab hai ki volatility bahut zyada ya bahut kam hone ke baad apne long-run average ki taraf wapas aane ki tendency rakhti hai. Yeh ek tendency hai, koi fixed timetable nahi.`,
      how: `After a spike, hedging demand fades and uncertainty resolves, so IV and VIX usually come back down over days or weeks. After a long low period, VIX can drift up as complacency fades. Mean reversion is why selling premium after a spike can be tempting and why buying options in very low VIX is sometimes popular. But a spike can extend, and low VIX can last for months, so mean reversion alone is not a trade signal.`,
      eg: {
        title: 'VIX 28 back to 16 (illustrative)',
        text: `A 30-day ATM straddle on 24,000 costs about ₹1,536.06 at IV 28% and about ₹881.90 at IV 16%. If VIX mean-reverts and spot ends up unchanged (ignoring decay), the straddle loses ₹654.16 per unit, about ₹42,520 per lot of 65. A buyer at the top of the spike loses that, while a seller who sold at the top gains it, if no further shock arrives.`,
      },
      tip: `Mean reversion says where volatility tends to go, not when. A seller early into a spike can be hit hard if the spike keeps extending.`,
      visual: {
        kind: 'bars',
        title: '30-day ATM straddle at spike and normal IV (illustrative)',
        caption: 'Spot unchanged at 24,000.',
        unit: ' ₹',
        items: [
          { label: 'IV 28% (spike)', value: 1536.06, tone: 'gold' },
          { label: 'IV 16% (normal)', value: 881.9, tone: 'ice' },
        ],
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 28, days: 30 },
        why: 'See the 30-day range at VIX 28, then at VIX 16.',
      },
    },
    {
      t: 10,
      def: `Volatility forecasting limitations: no model can reliably predict future volatility or when a spike will arrive. Forecasts help to frame ranges but fail in the moments that matter most.`,
      hi: `Volatility forecasting ki limitations: koi bhi model future volatility ya spike kab aayega, yeh bharosemand tareeke se predict nahi kar sakta. Forecast range banane mein madad karte hain, lekin sabse zaroori waqt par aksar fail ho jaate hain.`,
      how: `Methods such as historical averages, GARCH-type models or the market's own VIX are all based on the past or on current prices. Shocks like surprise election results, wars or sudden policy changes cannot be forecast from price history. Models also assume return distributions that underestimate tail events. The practical response is risk management: position sizing, defined-risk structures, and treating volatility ranges as probabilities, not limits.`,
      eg: {
        title: 'Priced 14, delivered 22 (illustrative)',
        text: `The 7-day ATM straddle sold at IV 14% brings in about ₹371.79. If realized volatility is 22% over that week, the one-standard-deviation 7-day move is about 731.20 points, nearly twice the credit received. Realized volatility was 22/14 = about 1.57 times the forecast, and a naked seller of that straddle would on average (in this model) lose money, not just in a rare tail case.`,
      },
      tip: `Use forecasts to set ranges, not to remove risk. The loss that ends a trading account comes from the move that the model said was unlikely.`,
      visual: {
        kind: 'compare',
        title: 'Forecast versus what can happen',
        caption: 'Models describe the typical; risk management covers the rest.',
        left: { head: 'What a forecast gives', tone: 'ice', points: ['A typical range', 'A way to compare options', 'Probabilities, not certainties'] },
        right: { head: 'What it cannot give', tone: 'gold', points: ['The date of a shock', 'The size of a tail move', 'Protection for an undefined-risk position'] },
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 22, days: 7 },
        why: 'Compute the 7-day range at realized volatility 22 and compare with the 14 forecast.',
      },
    },
  ],
}

export default m
