import type { ModuleLesson } from '../topicLessonTypes'

/* Module 10.3 — Support and Resistance.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). Option premiums in the examples are
 * Black-Scholes values (IV 14%, r 6.5%, q 1.3%, 3-4 calendar days to expiry) rounded to whole points; real premiums differ. */
const m: ModuleLesson = {
  moduleId: '10.3',
  intro: `Support and resistance are price zones where buying or selling interest has shown up before, so traders watch them again. They are zones, not exact lines, and they are made from past prices, previous-day figures, round numbers and several timeframes. For an option trader they matter because they give a place to enter and, more importantly, a place where the idea is proven wrong.`,
  introHi: `Support aur resistance woh price zones hain jahan pehle buying ya selling aayi thi, isliye traders unhe dobara dekhte hain. Yeh zones hote hain, exact lines nahi, aur yeh purane prices, previous day ke figures, round numbers aur alag-alag timeframes se bante hain. Option trader ke liye yeh isliye important hain ki entry ki jagah milti hai aur, usse bhi zyada, woh jagah milti hai jahan trade ka idea galat saabit ho jata hai.`,
  steps: {
    concept: `Support is a price area where falling prices have repeatedly paused or turned up because buyers stepped in. Resistance is an area where rising prices have paused or turned down because sellers stepped in. They work partly because many traders remember the same levels and place orders there, so the level can become self-fulfilling for a while. No level is guaranteed: each touch uses up some of the orders waiting there, and a level that breaks often flips its role.`,
    conceptHi: `Support woh price area hai jahan girta hua price baar-baar ruka ya palta, kyunki buyers aaye. Resistance woh area hai jahan badhta hua price ruka ya palta, kyunki sellers aaye. Yeh isliye kaam karte hain ki bahut saare traders ek hi levels yaad rakhte hain aur wahin orders lagate hain, toh kuch der ke liye level khud-b-khud kaam karne lagta hai. Koi bhi level guaranteed nahi hai: har touch par wahan khade orders kuch kam ho jate hain, aur toot jaye toh aksar level ka role ulta ho jata hai.`,
    mechanism: `Levels form from three sources. First, past turning points on the chart (swing highs and lows). Second, reference prices that the whole market computes: previous day high, low and close, the opening range and pivot points. Third, human habit: round numbers such as 24,000 attract orders and option strikes. A zone gains weight when several of these land within a few points of each other, and when it was tested on higher timeframes. Treat a level as a zone of roughly 10 to 30 NIFTY points rather than a single price.`,
    example: {
      title: 'A support zone and a stop below it (illustrative)',
      text: `NIFTY has bounced from 23,845 to 23,860 three times this week, so 23,840 to 23,860 is a support zone. Price returns to 23,880 and a trader buys the 24,000 CE (4 days left, IV 14%) at about ₹93. The idea is wrong if a 15-minute candle closes below 23,820: at that spot the call is worth about ₹72. Loss per lot = (93 − 72) × 65 = ₹1,365. If the trader risks 1% of ₹5,00,000 = ₹5,000, the position size is 5,000 / 1,365 = 3.66, so 3 lots. The stop sits where the level fails, not at a rupee amount chosen from feelings.`,
    },
    chart: {
      kind: 'candles',
      title: 'Support tested, held, then used as a base',
      caption: 'Price falls to the same zone twice and turns up. The zone is where the idea is tested; a close below it cancels the idea.',
      pattern: 'range',
      level: { price: 23850, label: 'Support zone 23,840-23,860' },
    },
    optionChain: `On the option chain, large put OI at a strike below the market and large call OI above it are often watched as possible support and resistance. Treat them as potential levels only: high OI is not a guarantee, OI cannot show who initiated the trades, and writers can exit when the level is threatened. A chart level that coincides with a big OI strike is more interesting than either alone. Always check the strike list for the actual strikes available.`,
    psychology: `Buyers at support are afraid of missing the bounce; sellers at resistance are afraid of giving back gains. Traders who bought below the level wait to exit at breakeven when price comes back up to it, which is one reason resistance forms. The common mistake is placing a stop exactly at the round number, where many other stops sit; a small spike through the level then removes everyone before price turns back.`,
    scenarios: {
      bullish: `Price holds support and breaks resistance on a closing basis. The old resistance may then act as support on a pullback, which gives a lower-risk place to look for a call entry. If the break fails and price falls back inside the range, the idea is cancelled.`,
      bearish: `Price closes below support. The broken support may now act as resistance, and put buyers or call writers may use a retest to enter. A weak bounce that stops under the old support is more convincing than a strong one that climbs back above it.`,
      sideways: `Price swings between support and resistance. Option sellers may favour such conditions but face a large loss if either side breaks. Buyers lose to time decay while price oscillates in the middle of the range, so entries near the edges with clear stops make more sense than entries in the middle.`,
    },
    practice: [
      {
        q: `Previous day: high 24,112, low 23,968, close 24,020. Compute the classic pivot, R1 and S1.`,
        a: `Pivot = (24,112 + 23,968 + 24,020) / 3 = 24,033.33. R1 = 2 × 24,033.33 − 23,968 = 24,098.67. S1 = 2 × 24,033.33 − 24,112 = 23,954.67.`,
      },
      {
        q: `A trader buys a call at support 23,850 with a stop at a close below 23,820. What is the index distance to the stop from an entry at 23,880?`,
        a: `23,880 − 23,820 = 60 points. The risk is that distance times the option delta; with delta about 0.38, roughly 23 premium points, or about ₹1,500 per lot before gaps and slippage (illustrative).`,
      },
      {
        q: `The 24,000 level lies 120 points above spot 23,880. What is the percentage distance?`,
        a: `120 / 23,880 = 0.50%. The round number is only half a percent away, which is why it is easy to reach during a single volatile session.`,
      },
      {
        q: `Why is a level seen on both the 15-minute and the daily chart stronger than one seen on only the 15-minute chart?`,
        a: `Because more participants (positional traders as well as intraday traders) watch the daily chart and may place orders there, so more orders may cluster. It is still not a guarantee; it only means the zone is more likely to be reacted to.`,
      },
    ],
    assignment: `On a NIFTY 15-minute chart, mark one support zone and one resistance zone using the last five sessions. Write down the previous day high, low and close, and the first 15-minute range. For the next two sessions, note how price reacted at each level and whether any closing break happened. Record at least one level that failed.`,
  },
  topics: [
    {
      t: 1,
      def: `Horizontal support is a flat price zone where falling prices have stopped or reversed more than once. It is drawn through two or more past lows that sit at about the same price. Buyers are thought to be waiting there.`,
      hi: `Horizontal support ek seedha flat price zone hai jahan girta hua price ek se zyada baar ruka ya palta hai. Isko do ya zyada purane lows ke through draw karte hain jo lagbhag ek hi price par hote hain. Maana jata hai ki wahan buyers intezaar kar rahe hain.`,
      how: `Traders mark swing lows on a 15-minute, hourly or daily chart and join those that cluster within a narrow band. Each time price returns and holds, more people trust the zone and place buy orders and stops nearby. Each retest also uses up the resting buy orders, so a zone tested many times can weaken. The zone confirms only when price rejects it (a long lower wick or a close back above); a close below invalidates it.`,
      eg: {
        title: 'Three bounces from 23,850 (illustrative)',
        text: `NIFTY lows: 23,845, 23,860 and 23,850 on three separate days. Zone = 23,840 to 23,860, 20 points wide. A call bought near 23,880 at about ₹93 (24,000 CE, 4 days, IV 14%) falls to about ₹72 if spot closes at 23,820. Loss per lot = 21 × 65 = ₹1,365. With ₹5,00,000 capital and 1% risk (₹5,000), size = 5,000 / 1,365 = 3 lots.`,
      },
      tip: `A support is proven only when price rejects it. Wait for the reaction, and place the stop beyond the zone rather than inside it.`,
      visual: { kind: 'candles', title: 'Horizontal support', caption: 'Two or more lows at about the same price form the zone.', pattern: 'range', level: { price: 23850, label: 'Support 23,850' } },
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 93, stop: 72, lotSize: 65 }, why: 'Turns the support stop into a lot count: ₹5,000 risk / ₹1,365 per lot = 3 lots.' },
    },
    {
      t: 2,
      def: `Horizontal resistance is a flat price zone where rising prices have stopped or reversed more than once. It is drawn through two or more past highs at about the same price. Sellers are thought to be waiting there.`,
      hi: `Horizontal resistance ek flat price zone hai jahan badhta hua price ek se zyada baar ruka ya palta hai. Isko do ya zyada purane highs ke through draw karte hain jo lagbhag ek hi price par hote hain. Maana jata hai ki wahan sellers intezaar kar rahe hain.`,
      how: `Highs cluster because traders who bought near the top and got stuck often sell when price returns to their cost. Fresh sellers and call writers also place orders there. A close above the zone suggests the supply has been absorbed, and the old resistance may become support. A rejection (an upper wick and a close back below) supports a bearish or range idea for that session. Neither outcome is certain.`,
      eg: {
        title: 'Resistance at 24,150 and a put trade (illustrative)',
        text: `NIFTY highs: 24,148, 24,155 and 24,150 over three sessions. Price returns to 24,130 and a trader buys the 24,100 PE (4 days, IV 14%) at about ₹120. The idea fails on a close above 24,180, where the put is worth about ₹99, a loss of 21 × 65 = ₹1,365 per lot. Premium at 24,050 would be about ₹160, a gain of 40 × 65 = ₹2,600. The index risk is 50 points against a target 80 points away.`,
      },
      tip: `Resistance that has been tested many times can break. Do not assume a fourth touch will fail the way the first three did.`,
      visual: { kind: 'candles', title: 'Horizontal resistance', caption: 'Repeated highs near the same price form the ceiling.', pattern: 'falseBreakout', level: { price: 24150, label: 'Resistance 24,150' } },
      calc: { id: 'breakeven', preset: { optType: 'PE', side: 'buy', strike: 24100, premium: 120 }, why: 'The put bought at ₹120 breaks even at an expiry value of 23,980.' },
    },
    {
      t: 3,
      def: `Dynamic support and resistance are levels that move with time instead of staying flat. Examples are a rising or falling trendline and moving averages. Price may pause or bounce from them as they slope.`,
      hi: `Dynamic support aur resistance woh levels hain jo time ke saath chalte rehte hain, flat nahi rehte. Jaise rising ya falling trendline aur moving averages. Price in par ruk sakta hai ya bounce kar sakta hai jaise-jaise yeh slope hote hain.`,
      how: `A rising trendline joins higher lows; a 20-period moving average is the average of the last 20 closes and shifts with each new bar. Many traders watch the same averages (20, 50, 200), so orders may cluster around them. The level has to be re-read each bar because it changes. In a sideways market moving averages flatten and give frequent false touches, so they work better when the market is trending.`,
      eg: {
        title: 'A rising 20-day average (illustrative)',
        text: `The 20-day average of NIFTY closes is 23,900 and has been rising 15 points a day. Five sessions later, at the same slope, it will be 23,900 + 5 × 15 = 23,975. A trader who buys a pullback to the average must expect the "support" to be 75 points higher than the earlier reading, so a flat horizontal level drawn at 23,900 would be misleading.`,
      },
      tip: `Update the level every bar. A sloping support drawn once and left alone quickly becomes wrong.`,
      visual: { kind: 'candles', title: 'Dynamic support in an uptrend', caption: 'Price pulls back to a rising line and continues while the line holds.', pattern: 'uptrend' },
    },
    {
      t: 4,
      def: `Previous day high (PDH) is the highest price NIFTY traded the day before. Traders use it as a reference where selling may appear, and as a breakout level if price closes above it. Because every trader can see it, it is a widely shared level.`,
      hi: `Previous day high matlab kal NIFTY ka sabse upar ka traded price. Traders ise reference ki tarah dekhte hain jahan selling aa sakti hai, aur agar price uske upar close ho toh breakout level ki tarah. Yeh sabko dikhta hai, isliye yeh ek shared level hai.`,
      how: `Platforms show PDH as a line on intraday charts. When price opens near it, the first test often sets the tone for the morning. A break and hold above PDH on rising volume suggests buyers are controlling the day; a quick move above followed by a fall back inside yesterday's range is a false break. PDH is also an input to the classic pivot formulas, along with PDL and the previous close.`,
      eg: {
        title: 'PDH and pivot levels (illustrative)',
        text: `Previous day: high 24,112, low 23,968, close 24,020. Pivot = (24,112 + 23,968 + 24,020) / 3 = 24,033.33. R1 = 2 × 24,033.33 − 23,968 = 24,098.67. S1 = 2 × 24,033.33 − 24,112 = 23,954.67. Today's PDH of 24,112 sits just above R1, so 24,098 to 24,112 is a 14-point resistance cluster.`,
      },
      tip: `A shared level is crowded. Wait for a closing confirmation instead of buying the first touch.`,
      visual: { kind: 'bars', title: 'Reference levels from yesterday', unit: '', items: [
        { label: 'PDH', value: 24112, tone: 'gold' },
        { label: 'R1', value: 24099, tone: 'ice' },
        { label: 'Pivot', value: 24033, tone: 'neutral' },
        { label: 'Close', value: 24020, tone: 'neutral' },
        { label: 'S1', value: 23955, tone: 'ice' },
        { label: 'PDL', value: 23968, tone: 'gold' },
      ] },
      calc: { id: 'pivot-levels', preset: { high: 24112, low: 23968, close: 24020 }, why: 'Reproduces pivot 24,033.33, R1 24,098.67 and S1 23,954.67.' },
    },
    {
      t: 5,
      def: `Previous day low (PDL) is the lowest price NIFTY traded the day before. It is used as support, and a close below it is read as weakness. Like PDH, it is a shared reference that many traders place orders around.`,
      hi: `Previous day low matlab kal NIFTY ka sabse neeche ka traded price. Ise support ki tarah use karte hain, aur uske neeche close hona kamzori ki nishani maana jata hai. PDH ki tarah yeh bhi shared reference hai jiske aas-paas bahut traders orders lagate hain.`,
      how: `If price drops below PDL early in the session and recovers, it may mean sellers failed and stops below the low were cleared. If it breaks and holds for several candles, many traders see it as a trend day downward. PDL and PDH together frame yesterday's range; a trade that opens inside the range may chop until one side breaks. Closing confirmation on 5 or 15 minutes reduces false signals.`,
      eg: {
        title: 'PDL break and a put (illustrative)',
        text: `PDL = 23,968. A 15-minute candle closes at 23,955, 13 points below it. A trader buys the 23,900 PE (3 days left, IV 14%) at about ₹91. If spot later reaches 23,900 the put is worth about ₹116: a gain of 25 × 65 = ₹1,625 per lot. If price returns above 23,990 the idea is wrong and the trader exits.`,
      },
      tip: `A wick below PDL that closes back above it is information too. It may show that sellers failed.`,
      visual: { kind: 'candles', title: 'Break below the previous day low', pattern: 'breakdown', level: { price: 23968, label: 'PDL 23,968' } },
    },
    {
      t: 6,
      def: `Previous close is the last settled price of NIFTY on the prior trading day. Today's opening is compared with it to see a gap. It acts as a reference level because many traders judge the day as up or down relative to it.`,
      hi: `Previous close matlab pichle trading din ka last price. Aaj ki opening ko isse compare karke gap dekha jata hai. Yeh ek reference level hai kyunki bahut traders din ko isse upar ya neeche ke hisaab se judge karte hain.`,
      how: `The index is up or down on the day by comparing the current price with the previous close, which is the figure displayed by exchanges and news channels. After a gap, price often tests the previous close (a "gap fill") but does not always. When price opens above and holds the previous close during the first hour, traders consider that mildly strong; falling below it suggests the opening strength was sold. It is a reference, not a forecast.`,
      eg: {
        title: 'A 55-point gap (illustrative)',
        text: `Previous close 24,020, open 24,075: gap = 55 points = 55 / 24,020 = 0.23%. If price falls back to 24,020 within the first hour, the gap is "filled". A call held through the gap with delta 0.5 gained about 27 premium points, 27 × 65 = ₹1,755 per lot, before the open; filling the gap would take that back.`,
      },
      tip: `A gap does not have to fill. Judge the reaction at the previous close rather than assuming it will happen.`,
      visual: { kind: 'flow', title: 'From the close to the open', steps: [
        { label: 'Prev close 24,020', note: 'Reference', tone: 'neutral' },
        { label: 'Open 24,075', note: 'Gap +55 (0.23%)', tone: 'gold' },
        { label: 'Test of 24,020?', note: 'Gap fill or hold', tone: 'ice' },
      ] },
    },
    {
      t: 7,
      def: `The opening range is the high and low of the first part of the session, usually the first 15 or 30 minutes after the 9:15 open. A move beyond either side is watched as a possible direction for the day. It is a short-term reference only.`,
      hi: `Opening range matlab session ke shuru ke 15 ya 30 minute ka high aur low, 9:15 ke open ke baad. Agar price kisi ek side ke bahar nikle toh usse din ki direction ka ishara maana jata hai. Yeh sirf short-term reference hai.`,
      how: `The first minutes carry overnight news, gap-driven orders and a lot of volatility, so the range often sets the borders for the morning. Traders wait for a candle to close beyond the range, then place a stop at the other side or the midpoint. A narrow range allows a tight stop but is more likely to give a false break; a wide range uses up much of the day's typical move. Targets are often measured as a multiple of the range, as a working rule.`,
      eg: {
        title: 'First 15 minutes (illustrative)',
        text: `9:15 to 9:30: high 24,085, low 24,040, range 45 points. A 5-minute close above 24,085 gives an entry; a measured target equal to one range = 24,085 + 45 = 24,130. Stop at the midpoint 24,062.5 means 22.5 points of risk against a 45-point target: 2 to 1 on the index. A ₹80 at-the-money option moves roughly half as much as the index, so allow for delta.`,
      },
      tip: `A tight opening range is an invitation to size down, because false breaks are common and stops are close.`,
      visual: { kind: 'candles', title: 'Opening-range breakout', pattern: 'breakout', level: { price: 24085, label: 'ORB high 24,085' } },
    },
    {
      t: 8,
      def: `Psychological levels are prices that traders pay attention to because they are easy to remember, such as 24,000 or 24,500. They are not chart-derived, but they attract orders, option strikes and targets. Price often hesitates near them.`,
      hi: `Psychological levels woh prices hain jin par traders dhyan dete hain kyunki yaad rakhna aasan hai, jaise 24,000 ya 24,500. Yeh chart se nahi nikalte, lekin yahan orders, option strikes aur targets jama hote hain. Price aksar inke paas hichkichata hai.`,
      how: `Round numbers are often strikes with large OI because traders choose them for convenience. Options sellers may defend them and buyers may target them, creating reaction around expiry. The effect is behavioural, so it can fade; a strike with large OI is a potential level, not a guarantee. A level backed by both a chart reaction and a high-OI strike is worth more attention than a round number alone.`,
      eg: {
        title: 'Strike OI around 24,000 (illustrative, in lakh contracts)',
        text: `24,000 CE has 18 lakh OI and its neighbours 23,950 CE and 24,050 CE have 6 and 7 lakh. The 24,000 strike alone holds 18 / (18 + 6 + 7) = 58% of these three strikes' call OI. In units that is 18,00,000 × 65 = 11.7 crore. This means the strike is popular, not that the index will stop there.`,
      },
      tip: `Popular is not the same as strong. Check whether price actually reacted there before trusting it.`,
      visual: { kind: 'oi', title: 'Illustrative OI around 24,000 (lakh)', caption: 'OI concentrates at the round strike.', rows: [
        { strike: 23950, ce: 6, pe: 9 },
        { strike: 24000, ce: 18, pe: 16 },
        { strike: 24050, ce: 7, pe: 5 },
      ], spot: 23880 },
    },
    {
      t: 9,
      def: `Round-number levels are prices ending in 00 or 500 (and, on smaller timeframes, 50). They are a subset of psychological levels and are tracked because strikes and targets are usually set there.`,
      hi: `Round-number levels woh prices hain jo 00 ya 500 par khatam hote hain (aur chhote timeframe par 50 par bhi). Yeh psychological levels ka hi ek hissa hain, aur inhe track karte hain kyunki strikes aur targets aksar wahin set hote hain.`,
      how: `NIFTY option strikes step by 50 near the money, so every 50 is a strike with its own OI and its own writers. Stop-loss orders also cluster just beyond round numbers (for example 23,995 or 24,005). Price can therefore overshoot a round number briefly and then reverse, so allow a buffer. The hundred-point and 500-point marks are usually more visible than the 50s.`,
      eg: {
        title: 'How far is 24,000 and what does it mean for a call (illustrative)',
        text: `Spot 23,880, 24,000 CE. Distance = 120 points = 0.50% of spot, so the call is out of the money. At 4 days to expiry and IV 14% its value is about ₹93, all time value, so the call needs a move of more than 120 + 93 = 213 points, to 24,093, to break even at expiry.`,
      },
      tip: `Put stops a little beyond the round number, not exactly on it, and accept the smaller position that a wider stop requires.`,
      visual: { kind: 'ladder', title: 'Round strikes around spot (call side)', optType: 'CE', spot: 23880, strikes: [23800, 23850, 23900, 23950, 24000, 24050] },
      calc: { id: 'moneyness', preset: { optType: 'CE', spot: 23880, strike: 24000 }, why: 'Shows the 24,000 call is 120 points (0.5%) out of the money.' },
    },
    {
      t: 10,
      def: `Multiple timeframe levels are support and resistance zones taken from different chart timeframes, such as the 15-minute, hourly, daily and weekly. A level that appears on more than one timeframe is usually given more weight.`,
      hi: `Multiple timeframe levels alag-alag chart timeframes se liye gaye support aur resistance zones hain, jaise 15-minute, hourly, daily aur weekly. Jo level ek se zyada timeframe par dikhe use zyada importance dete hain.`,
      how: `Start from the higher timeframe to find the large zones, then use the lower timeframe to time entries and stops. If the daily chart shows support at 23,940 and the 15-minute chart shows a swing low at 23,950, the combined zone is 23,940 to 23,950. The higher timeframe wins when signals conflict. Too many lines on a chart creates noise; keep to the few nearest levels above and below price.`,
      eg: {
        title: 'Combining two timeframes (illustrative)',
        text: `Daily support 23,940 and a 15-minute swing low 23,950 form a 10-point zone. A weekly low at 23,700 is 240 points below the zone. A call entry near 23,960 with a stop below 23,935 risks 25 points on the index; a position of 2 lots with a delta of 0.4 risks about 25 × 0.4 × 65 × 2 = ₹1,300 (illustrative, before slippage).`,
      },
      tip: `Higher timeframe sets the map, lower timeframe sets the entry. Do not take a 15-minute long straight into a daily resistance.`,
      visual: { kind: 'layers', title: 'Timeframe hierarchy', layers: [
        { label: 'Weekly zone', note: 'Largest, slowest', tone: 'gold' },
        { label: 'Daily zone', note: 'Main map', tone: 'ice' },
        { label: '15-minute zone', note: 'Entry and stop', tone: 'neutral' },
      ] },
    },
  ],
  tools: [{ id: 'pivot-levels', why: 'Quick floor pivots from yesterday high, low and close.' }],
}
export default m
