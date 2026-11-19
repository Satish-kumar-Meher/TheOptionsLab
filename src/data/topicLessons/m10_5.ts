import type { ModuleLesson } from '../topicLessonTypes'

/* Module 10.5 — Intraday Market Behaviour.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). Option values are Black-Scholes
 * (IV 14% unless stated, r 6.5%, q 1.3%) rounded; clock times map "days left" onto calendar fractions and are only a rough guide.
 * Cash-market session 9:15 to 15:30 IST; NSE index derivative expiries are on Tuesday. Verify timings and rules on nseindia.com. */
const m: ModuleLesson = {
  moduleId: '10.5',
  intro: `A trading day is not one uniform stretch. The open, the first hour, the quiet midday, the final hour and, on Tuesdays, the expiry session each have a different pace and different risks for an option buyer or writer. Knowing the rhythm of the day helps you decide when a premium is cheap, when it is inflated and when to stay out.`,
  introHi: `Trading din ek jaisa nahi hota. Opening, pehla ghanta, dopahar ki shaanti, aakhri ghanta aur Tuesday ko expiry session, sabki speed aur risk alag hoti hai. Din ki rhythm samajhne se pata chalta hai ki premium kab sasta hai, kab fula hua hai aur kab bahar rehna better hai.`,
  steps: {
    concept: `Intraday behaviour is the repeating pattern of activity across the session of 9:15 to 15:30. Volume and volatility are usually heaviest at the open and into the close, and lightest around midday. For options this matters because the premium has three moving parts (price, time and IV) and each of them behaves differently at different hours.`,
    conceptHi: `Intraday behaviour ka matlab hai 9:15 se 15:30 ke session mein activity ka repeat hone wala pattern. Volume aur volatility aam taur par opening aur closing ke aas paas zyada hoti hai aur dopahar mein kam. Options ke liye yeh isliye important hai kyunki premium ke teen hisse hain, price, time aur IV, aur teeno alag alag ghanton mein alag behave karte hain.`,
    mechanism: `Overnight news and global cues accumulate and are priced in at the open, so gaps appear. In the first hour, orders left over from the night, institutional execution and stop-losses create the day's widest swings. Around midday, participation thins and price often ranges. Later, positional traders square off and funds execute, which lifts activity into the close. On expiry day, option premiums decay quickly and gamma rises, so small index moves create large percentage changes in premium.`,
    example: {
      title: 'Gap-up open and the 24,100 CE (illustrative)',
      text: `NIFTY closes at 24,000. Overnight cues are positive and it opens at 24,090, a gap of 90 points (0.375%). The 24,100 CE with one day left was worth about ₹32 at the previous close (about ₹2,080 per lot of 65) and is worth about ₹67 at the open, a rise of 35 × 65 = ₹2,275 for someone who held it overnight. A trader who buys at the open pays ₹67 and now needs the market to keep rising to profit; the gap is already in the price.`,
    },
    chart: {
      kind: 'timeline',
      title: 'A typical NIFTY trading day',
      caption: 'General pattern only; individual days differ. Times are IST.',
      events: [
        { when: '9:15', what: 'Open: gaps and widest spreads', tone: 'gold' },
        { when: '9:15 - 10:15', what: 'First hour: high volume, trend or reversal set', tone: 'bull' },
        { when: '11:30 - 13:30', what: 'Midday: lower volume, often range-bound', tone: 'ice' },
        { when: '14:30 - 15:30', what: 'Closing hour: square-offs and fund activity', tone: 'gold' },
        { when: 'Tuesday', what: 'Expiry: fast decay, high gamma', tone: 'bear' },
      ],
    },
    optionChain: `Intraday, the chain shows premium changes and OI changes strike by strike. In the morning the first OI changes are often noise: a lot of adjustments happen before direction is clear. By midday, strikes with the largest fresh OI become more meaningful as possible levels, though high OI is a potential level, not guaranteed support or resistance. On expiry day, watch spreads: far OTM premiums can be a few rupees and bid-ask gaps matter a lot.`,
    psychology: `The open is emotional: gap traders chase or fade, and stop-losses trigger. Midday is boring, which tempts traders to overtrade for action and bleed charges and theta. Late in the day, losers hope to recover and winners fear giving profits back. On expiry day, cheap far-OTM options attract lottery-ticket buying, a behaviour pattern SEBI studies on individual F&O traders have repeatedly linked to losses.`,
    scenarios: {
      bullish: `A gap-up that holds the first 15-minute low and builds in the first hour can trend into the afternoon. Call buyers may gain, but the premium already contains the gap, so the move needed to profit is from the new level.`,
      bearish: `A gap-up that closes the gap and breaks the opening low shows sellers in control, and a gap-down that extends lower in the first hour can trend. Put buyers may gain, with IV usually rising during the fall.`,
      sideways: `A narrow midday range lets premiums bleed. Buyers lose to theta; writers collect it but face a sudden breakout at the end of the range.`,
    },
    practice: [
      {
        q: `NIFTY closes at 24,000 and opens at 24,090. What is the gap in points and as a percentage?`,
        a: `Gap = 24,090 − 24,000 = 90 points. Percentage = 90 / 24,000 = 0.375%.`,
      },
      {
        q: `The 24,100 CE was ₹32 at the close and ₹67 at the open. What is the overnight gain per lot of 65?`,
        a: `Gain per unit = 67 − 32 = ₹35. Per lot = 35 × 65 = ₹2,275.`,
      },
      {
        q: `With India VIX at 14, what is the one-standard-deviation expected move of NIFTY (24,000) in one day, and roughly in one trading hour (6.25-hour session)?`,
        a: `Daily = 24,000 × 0.14 × √(1/365) = 175.9 points. One trading hour is about 175.9 / √6.25 = 175.9 / 2.5 = 70.3 points. This is a rough statistical guide, not a forecast.`,
      },
      {
        q: `On expiry day the 24,000 straddle costs about ₹63 at 10:42 and about ₹31 at 14:18 with NIFTY unchanged. What is the fall per lot?`,
        a: `Fall = 63 − 31 = ₹32 per unit. Per lot = 32 × 65 = ₹2,080, caused only by time passing.`,
      },
    ],
    assignment: `Track NIFTY for five sessions. For each, write the gap, the first-15-minute range, the high and low of the first hour, the midday range and the move in the last hour. Note on which days the first-hour direction held to the close. Do not trade; just record how many of the five matched your expectation.`,
  },
  topics: [
    {
      t: 1,
      def: `A gap-up opening is when the first price of the day is clearly above the previous day's close. It happens because buyers outnumber sellers in the opening call auction after positive overnight news or global cues. The price between the close and the open was never traded.`,
      hi: `Gap-up opening ka matlab hai ki din ka pehla price pichhle din ke close se saaf upar hai. Yeh tab hota hai jab positive overnight news ya global cues ke baad opening auction mein buyers zyada hote hain. Close aur open ke beech ke price par koi trade hua hi nahi.`,
      how: `Before 9:15 the cash market runs a pre-open session in which orders are collected and an opening price is set by a call auction, and the index opening is calculated from its constituents' opening prices. Index options then trade from 9:15 with fresh premiums. Gaps can be filled, meaning price returns to the previous close, or can hold. A gap with strong follow-through in the first 15 minutes is read differently from one that fades at once. As an option buyer you pay for the gap at the open.`,
      eg: {
        title: 'Gap of 90 points (illustrative)',
        text: `Previous close 24,000, open 24,090. The 24,100 CE moves from about ₹32 to ₹67. A buyer at ₹67 pays ₹4,355 per lot (67 × 65). If NIFTY drifts back to 24,000 during the day, the call falls toward ₹29 (with 0.9 days left), a loss of about 38 × 65 = ₹2,470 for the buyer at the open.`,
      },
      tip: `Never judge a gap by the opening print; wait for the first 15 minutes to see whether buyers defend it.`,
      visual: { kind: 'candles', title: 'Gap-up opening', caption: 'The open is above the previous close; the gap may hold or be filled.', pattern: 'gapUp', level: { price: 24000, label: 'Previous close 24,000' } },
      calc: { id: 'return-calc', preset: { start: 24000, end: 24090, years: 1 }, why: 'Gives the gap as a percentage: 90 points on 24,000 is 0.375%.' },
    },
    {
      t: 2,
      def: `A gap-down opening is when the first price is clearly below the previous close, usually after negative overnight news, weak global markets or an event. Sellers dominate the opening auction. Put premiums and India VIX usually jump at the open.`,
      hi: `Gap-down opening ka matlab hai ki pehla price pichhle close se saaf neeche hai, aksar negative news, kamzor global markets ya kisi event ke baad. Opening mein sellers hawi rehte hain. Put premium aur India VIX aksar open par uchhal jaate hain.`,
      how: `A fall tends to lift implied volatility, so put premiums rise by more than delta alone suggests. After a gap-down some traders sell the open aggressively, while others wait for a 15-minute candle to see whether buyers show up. An open near the day's low can lead to a trend day; a quick recovery through the first candle can show strong dip buying. Option buyers arriving late pay for both the fall and the higher IV.`,
      eg: {
        title: 'Gap-down to 23,910 (illustrative)',
        text: `Close 24,000, open 23,910, gap of 90 points. The 23,900 PE with one day left moves from about ₹30 to ₹60 at 14% IV, and to about ₹74 if IV rises to 17%. A holder gains up to 44 × 65 = ₹2,860 per lot overnight. A new buyer at ₹74 pays ₹4,810 per lot and loses if volatility falls back while the index stalls.`,
      },
      tip: `On a gap-down, high IV makes puts expensive; a rebound with IV dropping can hurt a put buyer even if NIFTY ends lower than the entry.`,
      visual: { kind: 'candles', title: 'Gap-down opening', caption: 'Open below the previous close at 24,000.', pattern: 'gapDown', level: { price: 24000, label: 'Previous close 24,000' } },
    },
    {
      t: 3,
      def: `An opening range breakout (ORB) is a trade taken when price breaks above the high or below the low of the first part of the day, commonly the first 15 or 30 minutes. The range marks the early balance between buyers and sellers. A break suggests one side is winning.`,
      hi: `Opening range breakout (ORB) woh trade hai jo din ke shuruaati hisse, aam taur par pehle 15 ya 30 minute, ke high ke upar ya low ke neeche price jaane par liya jaata hai. Range early buyers aur sellers ke balance ko dikhati hai. Break ka matlab hai ki ek side jeet rahi hai.`,
      how: `Mark the high and low of the opening window, then act on a candle close beyond it, with the other end of the range as a stop. Wide ranges give wide stops and poor reward-to-risk, so many traders skip days when the first range is already large. False breaks are common, especially on expiry days and event days. An ORB needs a loss limit as strict as its entry rule.`,
      eg: {
        title: 'ORB on 24,105 (illustrative)',
        text: `The 9:15 to 9:30 range is 24,060 to 24,105. A 15-minute close at 24,108 triggers a call buy of the 24,100 CE with 1 day left at about ₹76 (₹4,940 per lot). If NIFTY reaches 24,160 later that session the call may be worth about ₹103, a gain of 27 × 65 = ₹1,755. If price falls back to 24,060 the stop is hit.`,
      },
      tip: `A narrow opening range gives a cheap stop; a wide one means the day's move may already be used up.`,
      visual: { kind: 'candles', title: 'Opening-range breakout', caption: 'Price breaks the first 15-minute high and closes above it.', pattern: 'breakout', level: { price: 24105, label: 'ORB high 24,105' } },
    },
    {
      t: 4,
      def: `The first hour of trading, roughly 9:15 to 10:15, is when volume and swings are usually the largest. Overnight orders, institutional execution and stop-losses all meet in the same short window. It often sets the direction or the range for the rest of the day.`,
      hi: `Trading ka pehla ghanta, lagbhag 9:15 se 10:15, aksar sabse zyada volume aur swings wala hota hai. Raat ke orders, institutions ki execution aur stop-loss sab isi chhote window mein milte hain. Yeh aksar baaki din ka direction ya range tay kar deta hai.`,
      how: `Spreads are wider at the very open and narrow as liquidity arrives. The first-hour high and low become reference levels for the rest of the day: a close beyond them later is often read as a trend signal. Option premiums can be rich in IV terms because uncertainty is highest. Weekly option writers often wait for the first hour to pass before selling.`,
      eg: {
        title: 'First-hour levels (illustrative)',
        text: `NIFTY trades 24,040 to 24,115 in the first hour (a range of 75 points, close to the 70-point hourly one-sigma estimate). At 13:00 it closes a candle at 24,120, above the first-hour high. The first-hour range is the yardstick: a break of 5 points beyond it is weak, a break of 30 points with volume is more meaningful.`,
      },
      tip: `Note the first-hour high and low every day; they are free reference levels that traders widely watch.`,
      visual: { kind: 'bars', title: 'Typical activity through the day', unit: '', caption: 'Stylised relative volume (index), not actual data.', items: [{ label: '9:15 - 10:15', value: 100, tone: 'gold' }, { label: '10:15 - 11:30', value: 65, tone: 'neutral' }, { label: '11:30 - 13:30', value: 40, tone: 'ice' }, { label: '13:30 - 14:30', value: 55, tone: 'neutral' }, { label: '14:30 - 15:30', value: 85, tone: 'gold' }] },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: 'One-day one-sigma move is about 176 points; divide by 2.5 for a rough hourly figure.' },
    },
    {
      t: 5,
      def: `Midday consolidation is the quieter, often range-bound phase between the morning and the afternoon, roughly 11:30 to 13:30. Fewer participants trade and price tends to move sideways. It is where many impatient traders lose money to theta and charges.`,
      hi: `Midday consolidation matlab subah aur dopahar ke beech ka shaant, aksar range mein chalne wala phase, lagbhag 11:30 se 13:30. Kam log trade karte hain aur price side mein chalta hai. Yahin bahut se bechain traders theta aur charges mein paisa ganwaate hain.`,
      how: `Volume falls, so price can drift slowly with small candles, and breakouts are less reliable because few participants support them. For option buyers, premiums erode while the index goes nowhere. Writers earn theta but can be caught if a news item breaks the range. Many traders use this window to review the morning and plan, not to enter. Ranges that form here often resolve in the afternoon session.`,
      eg: {
        title: 'Two quiet hours (illustrative)',
        text: `NIFTY stays between 24,075 and 24,105 from 11:30 to 13:30, a 30-point range. A trader holding the 24,100 CE bought for ₹76 the day before sees its premium fall from about ₹55 (0.7 days left) to about ₹46 (0.5 days left) with NIFTY at 24,090, a fall of ₹9 or 9 × 65 = ₹585 per lot. The day-fractions are illustrative; real decay is not even through the day. Charges and bid-ask costs come on top if he trades in and out of the range.`,
      },
      tip: `If you do not have a plan for midday, the best trade may be none; theta and charges reward patience.`,
      visual: { kind: 'candles', title: 'Midday consolidation', caption: 'A tight range between the morning move and the afternoon.', pattern: 'range', level: { price: 24105, label: 'Range top 24,105' } },
    },
    {
      t: 6,
      def: `Trend continuation is when price keeps moving in the direction of the existing trend after a pause. A trend day shows higher highs and higher lows (or lower highs and lower lows) and few deep pullbacks. Continuations are the base of many intraday option-buying setups.`,
      hi: `Trend continuation ka matlab hai ki thodi der ruk kar price existing trend ki direction mein hi chalta rehta hai. Trend day mein higher highs aur higher lows (ya lower highs aur lower lows) dikhte hain aur gehre pullback kam hote hain. Bahut se intraday option-buying setups ka aadhaar yahi hai.`,
      how: `After an impulsive move, price pauses in a small range or a shallow pullback; buyers who missed the first leg enter and the move resumes. A pullback that stays above VWAP or the rising short-term average is read as healthy. The risk is that the continuation is the last leg: late buyers enter just as the early ones exit. An option's premium may not keep up, because theta runs while price pauses.`,
      eg: {
        title: 'Pullback and resume (illustrative)',
        text: `NIFTY goes from 24,040 to 24,110, pulls back to 24,085 and resumes to 24,160. A call bought at the pullback with 1 day left, the 24,100 CE at roughly ₹65 at 24,085, is worth about ₹103 at 24,160 (0.9 days left). That is a gain of about 38 × 65 = ₹2,470 per lot for a 75-point rise.`,
      },
      tip: `A pullback entry gives a tighter stop than chasing, but you must accept that some trends never pull back.`,
      visual: { kind: 'candles', title: 'Trend continuation', caption: 'Pauses and shallow pullbacks inside a rising trend.', pattern: 'uptrend' },
    },
    {
      t: 7,
      def: `A reversal is when the direction of price changes, for example a morning fall turning into an afternoon rise. Reversals show up as failed breaks, long wicks, engulfing candles and loss of momentum. Catching one early gives a good reward but picking tops and bottoms often fails.`,
      hi: `Reversal matlab price ki direction badal jaana, jaise subah ki girawat dopahar mein tezi mein badal jaaye. Reversal failed breaks, lambi wicks, engulfing candles aur momentum ke kam hone se dikhta hai. Jaldi pakad lo toh reward achha milta hai, lekin top ya bottom pakadne ki koshish aksar fail hoti hai.`,
      how: `Exhaustion near a level, a failed breakout and a strong candle against the trend are early clues. Confirmation is a close beyond the last swing. Reversals trigger stop-losses of the earlier trend followers, which adds fuel. The risk is that most "reversals" are only pullbacks. Option buyers should rely on defined risk, since both direction and timing must be right for the premium to pay.`,
      eg: {
        title: 'Morning fall, afternoon recovery (illustrative)',
        text: `NIFTY falls from 24,050 to 23,940 by 11:15, holds above the previous day low of 23,925 and rises to 24,010 by 14:00, closing above the 13:30 swing high of 23,985. A trader who sold the early low is wrong; one who waited for the close above 23,985 enters with a stop near 23,940, 45 points away, which is about 45 × 0.45 delta ≈ 20 option points, or ₹1,300 per lot.`,
      },
      tip: `Wait for the close beyond the last swing; the first reversal candle is a hint, not a signal.`,
      visual: { kind: 'candles', title: 'Hammer reversal', caption: 'A long lower wick shows buyers rejecting lower prices.', pattern: 'hammer', level: { price: 23925, label: 'Previous day low 23,925' } },
    },
    {
      t: 8,
      def: `Closing-hour movements are the price actions between about 14:30 and 15:30. Traders square off intraday positions, funds execute orders and some positional traders act before the close. The last 30 minutes also decide the closing price.`,
      hi: `Closing-hour movements matlab lagbhag 14:30 se 15:30 ke beech ka price action. Traders intraday positions square off karte hain, funds apne orders execute karte hain aur kuch positional traders close se pehle action lete hain. Aakhri 30 minute closing price bhi tay karte hain.`,
      how: `The equity closing price on NSE is derived from the weighted average price of the last 30 minutes, and the index closing value is built from those prices, which is why many traders watch this window. Volume often rises, and so can sharp moves in either direction. For options held overnight, the close fixes the starting point for the next day's gap. Many traders avoid fresh entries in the last 15 minutes because spreads and sudden swings can hurt.`,
      eg: {
        title: 'Last-hour swing (illustrative)',
        text: `At 14:30 NIFTY is at 24,060. By 15:00 it is at 24,110 and it closes at 24,085. A weekly-option buyer who bought at 14:30 and sold at 15:00 gained on the rise but a holder who waited for the close saw 25 points of it disappear. A near-the-money call moves roughly half as much as the index, so 25 points is about 12 option points, or 12 × 65 = ₹780 per lot.`,
      },
      tip: `Decide before 14:30 whether you will carry a position overnight; deciding at 15:25 is a rushed choice.`,
      visual: { kind: 'timeline', title: 'Last hour', events: [{ when: '14:30', what: 'Positional traders reposition', tone: 'ice' }, { when: '15:00', what: 'Volume often rises', tone: 'gold' }, { when: '15:00 - 15:30', what: 'Closing price built from last 30 minutes', tone: 'gold' }, { when: '15:30', what: 'Close sets the next gap reference', tone: 'neutral' }] },
    },
    {
      t: 9,
      def: `Expiry-day movement is the behaviour of the index and its options on a Tuesday when weekly NIFTY contracts expire (the previous trading day if Tuesday is a holiday). Time value falls fast, gamma rises and a small move in NIFTY can cause a big percentage change in premium. Index options are cash-settled and European.`,
      hi: `Expiry-day movement matlab Tuesday ko, jab weekly NIFTY contracts expire hote hain (Tuesday holiday ho toh pichhla trading day), index aur uske options ka behaviour. Time value tezi se girti hai, gamma badhta hai aur NIFTY ke chhote move se premium mein bada percentage change aa sakta hai. Index options cash-settled aur European hote hain.`,
      how: `As the expiry approaches, ATM options carry only a little time value, so the premium moves almost one-for-one with the index when it is near the strike and collapses to zero on the other side. Intraday position monitoring and extra margins for expiry-day short options were introduced by SEBI and exchanges in 2024; check the current NSE and broker rules before trading. Writers can be caught by quick spikes, buyers by the fast decay. Far-OTM options may trade at a few rupees with wide spreads.`,
      eg: {
        title: 'Expiry-day gamma (illustrative)',
        text: `At about 14:18 with NIFTY at 24,100 the 24,100 CE costs about ₹16 (₹1,040 per lot). If NIFTY rises 40 points the call becomes about ₹43, a gain of 27 × 65 = ₹1,755. If NIFTY falls 40 points it becomes about ₹3, a loss of 13 × 65 = ₹845. The at-the-money straddle at 24,000 falls from about ₹63 at 10:42 to about ₹31 at 14:18 if the index does not move.`,
      },
      tip: `Expiry-day gains look huge in percentage terms and so do losses; size the trade so the whole premium is a loss you accept.`,
      visual: { kind: 'curve', title: 'Time value shrinks faster near expiry', caption: 'Schematic of the time-value curve; the steepest fall is in the final hours.', curve: 'timeValue' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24100, strike: 24100, days: 0.05, iv: 14, rate: 6.5 }, why: 'Shows the premium and the high gamma of an at-the-money option with a few hours left.' },
    },
    {
      t: 10,
      def: `Intraday volatility is how much the index moves within one session. It is shown by candle size, the day's range and India VIX, which gives the market's expectation of annualised volatility over the next 30 days. VIX is expected volatility, not direction.`,
      hi: `Intraday volatility ka matlab hai ki ek session mein index kitna hilta hai. Yeh candle ke size, din ki range aur India VIX se dikhta hai, jo agle 30 din ke annualised volatility ki market expectation hai. VIX expected volatility hai, direction nahi.`,
      how: `A VIX of 14 implies roughly 14%/√365 ≈ 0.73% as one standard deviation for a day, about 176 points on NIFTY at 24,000. Moves bigger than that happen on event days. Realised intraday ranges vary by day type: trend days have large ranges, rangebound days small ones. Option premiums reflect the expected range; if the actual range turns out smaller, buyers lose and writers gain, and the opposite if it is larger.`,
      eg: {
        title: 'Reading the day range (illustrative)',
        text: `VIX 14 gives a one-day one-sigma move of about 176 points. If NIFTY's range on a day is only 70 points, buyers of ATM options almost certainly lost. If it is 300 points, buyers likely gained and writers faced losses. Over many days, the range exceeds the one-sigma figure less than a third of the time, since one sigma covers about 68% of outcomes.`,
      },
      tip: `Compare the actual day range with the VIX-implied move to learn whether options were cheap or expensive that day.`,
      visual: { kind: 'gauge', title: 'India VIX reading', caption: 'Illustrative zones; they are conventions, not exchange rules.', min: 8, max: 30, value: 14, zones: [{ from: 8, to: 13, label: 'Calm', tone: 'ice' }, { from: 13, to: 18, label: 'Normal', tone: 'gold' }, { from: 18, to: 30, label: 'Stressed', tone: 'bear' }] },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: 'Produces the 176-point one-day one-sigma move that the lesson compares with actual ranges.' },
    },
  ],
}
export default m
