import type { ModuleLesson } from '../topicLessonTypes'

/* Module 10.1 — Candlestick Fundamentals.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). Option premiums in the examples are
 * Black-Scholes values (IV 14%, r 6.5%, q 1.3%, 2-3 calendar days to expiry) rounded to whole points; real premiums differ. */
const m: ModuleLesson = {
  moduleId: '10.1',
  intro: `A candlestick packs four prices (open, high, low, close) for one time period into a single shape. Its body and wicks show who controlled the period and how far price was pushed and rejected. For an option trader candles are a way to read the mood of the underlying and to choose a clear point where an idea is proven wrong.`,
  introHi: `Candlestick ek time period ke chaar prices (open, high, low, close) ko ek hi shape mein dikhata hai. Uski body aur wicks batate hain ki us period mein kiska control tha aur price kitna door tak dhakela gaya aur wapas aaya. Option trader ke liye candles underlying ka mood padhne ka tareeka hain, aur woh point chunne ka bhi jahan idea galat saabit ho jata hai.`,
  steps: {
    concept: `Each candle summarises one period (1 minute, 15 minutes, 1 day). The body spans open to close; the thin lines (wicks or shadows) reach the period's high and low. A green candle closes above its open, a red one below. Single candles and small groups are clues about buying and selling pressure, not predictions. They matter most when they form at a level you already care about, such as support, resistance or the previous day's high or low.`,
    conceptHi: `Har candle ek period (1 minute, 15 minute, 1 din) ka summary hai. Body open se close tak hoti hai, aur patli lines (wicks ya shadows) us period ke high aur low tak jaati hain. Green candle open ke upar close hoti hai, red neeche. Ek candle ya chhote groups sirf clues hain buying aur selling pressure ke, prediction nahi. Yeh tab sabse kaam ke hote hain jab woh kisi aise level par bante hain jise aap pehle se dekh rahe ho, jaise support, resistance ya previous day ka high-low.`,
    mechanism: `Candles are built from the trades of the period. Because the NIFTY index is not traded directly, most platforms draw index candles from the computed index value (spot) and futures candles from actual futures trades; their highs and lows differ slightly. A candle is final only when the period closes: a 15-minute candle at 9:40 can still change shape until 9:45. That is why many traders act on candle closes and not on half-formed candles. Volume under the candle tells you how much trading produced the shape.`,
    example: {
      title: 'Reading one 15-minute NIFTY candle (illustrative)',
      text: `Open 24,010, high 24,085, low 23,990, close 24,070. Range = 24,085 − 23,990 = 95 points. Body = 24,070 − 24,010 = 60 points (63% of the range), upper wick = 24,085 − 24,070 = 15, lower wick = 24,010 − 23,990 = 20. Price dipped 20 points, was pushed up and closed near the high: buyers controlled the period. A trader who buys the 24,100 CE needs a rule for being wrong, such as a close below 23,990, the low of this candle.`,
    },
    chart: {
      kind: 'bars',
      title: 'Anatomy of the example candle (points)',
      caption: 'Range 95 = lower wick 20 + body 60 + upper wick 15. A long body with short wicks means one side dominated.',
      unit: ' pts',
      items: [
        { label: 'Lower wick', value: 20, tone: 'neutral' },
        { label: 'Body', value: 60, tone: 'bull' },
        { label: 'Upper wick', value: 15, tone: 'neutral' },
      ],
    },
    optionChain: `The option chain does not show candles, but the two work together. A bullish reversal candle that forms just above a strike carrying large put OI is more interesting than the same candle in empty space, because both point to the same zone. High OI is a potential level only, not a guarantee, and OI cannot show who initiated the trades. Also notice that option premium candles are noisier than index candles: a thinly traded strike can print a long wick on a single order.`,
    psychology: `Every wick is a failed attempt: a long upper wick means buyers pushed up and sellers pushed back. Every long body is conviction: most participants agreed during that period. Beginners over-read single candles and forget that context decides meaning; the same hammer is a signal after a fall to support and noise in the middle of a range. Candle patterns also invite hindsight bias, because every pattern looks obvious after the move.`,
    scenarios: {
      bullish: `Candles show higher closes, long green bodies and lower wicks that get bought quickly. A pullback shows small red bodies that stay above the previous low. This is the setting where call buying on a pullback to a level may be considered, with the stop under the last pullback low.`,
      bearish: `Candles show lower closes, long red bodies and upper wicks that get sold quickly. A bounce shows small green bodies that fail below the previous high. Put buying on a weak bounce may be considered, with the stop above the failed bounce high.`,
      sideways: `Candles are small, overlap heavily and show wicks on both sides, with dojis common. Signals fail often here and option buyers lose to time decay, so patterns in the middle of a range deserve little weight.`,
    },
    practice: [
      {
        q: `A daily candle has open 24,100, high 24,180, low 24,040, close 24,060. Give its colour, body, wicks and range.`,
        a: `Close 24,060 is below open 24,100, so it is red. Body = 40 points. Upper wick = 24,180 − 24,100 = 80. Lower wick = 24,060 − 24,040 = 20. Range = 24,180 − 24,040 = 140 (check: 80 + 40 + 20 = 140). The long upper wick shows buyers were rejected at the top.`,
      },
      {
        q: `A hammer forms at 23,955 (low 23,875). A trader buys a 24,000 CE at ₹105 and exits if spot closes below 23,875, where the call is worth about ₹72. Loss per lot, and lots for a ₹5,000 risk?`,
        a: `Loss per lot = (105 − 72) × 65 = 33 × 65 = ₹2,145. Lots = 5,000 / 2,145 = 2.33, so 2 lots (planned loss ₹4,290). The stop is placed where the hammer idea fails, not where the trader feels comfortable.`,
      },
      {
        q: `Why is a candle on the 5-minute chart less reliable than the same shape on the daily chart?`,
        a: `A 5-minute candle summarises very few trades and is easily moved by one large order or by noise, while a daily candle summarises the whole session and many more participants. Higher timeframe candles carry more information, though neither is a guarantee.`,
      },
      {
        q: `A 15-minute candle at 9:40 looks like a strong bullish engulfing. Should you act on it?`,
        a: `Not yet. The candle is final only at 9:45, and it may still close as a small candle with a long wick. Wait for the close, then check whether the level and volume support the idea.`,
      },
    ],
    assignment: `Pick three trading days of NIFTY on a 15-minute chart. For each day, write the open, high, low and close of the first three candles and calculate body, upper wick, lower wick and range. Mark each as bullish, bearish or indecisive and note what the next candle did. Do not trade on it; the goal is to build the habit of reading before judging.`,
  },
  topics: [
    {
      t: 1,
      def: `OHLC stands for Open, High, Low and Close: the first price, the highest price, the lowest price and the last price traded in a period. Every candle and bar chart is built from these four numbers. The period can be one minute, one hour or one day.`,
      hi: `OHLC ka matlab hai Open, High, Low aur Close: period ka pehla price, sabse ooncha price, sabse neecha price aur aakhri price. Har candle in chaar numbers se bante hain. Period 1 minute, 1 ghanta ya 1 din ho sakta hai.`,
      how: `The exchange matching engine records every trade; the data vendor then groups trades by time and reports the first, highest, lowest and last price. For an index the values are computed from the constituent stocks' prices every few seconds, so the index OHLC is not made of trades but of calculated values. The daily close of an equity is the weighted average price of the last 30 minutes as per NSE rules, and index levels follow from those; always verify the current method on NSE. Close is watched most because it is the price on which the market finally agreed for that period.`,
      eg: {
        title: 'A daily OHLC line (illustrative)',
        text: `Open 24,010, High 24,150, Low 23,960, Close 24,120. Day range = 24,150 − 23,960 = 190 points. Net change from the open = 24,120 − 24,010 = +110. Close position inside the range = (24,120 − 23,960) / 190 = 84%, meaning price finished near the high, a sign of strength during the day. The change versus the previous close needs the previous close as well, which is a different number from the open.`,
      },
      tip: `Open is today's first price, not yesterday's close. A gap exists precisely because the two differ.`,
      visual: { kind: 'bars', title: 'OHLC as levels on one day (illustrative)', caption: 'Four numbers: where the day started, how high and low it went, and where it ended.', unit: '', items: [
        { label: 'High', value: 24150, tone: 'ice' },
        { label: 'Close', value: 24120, tone: 'gold' },
        { label: 'Open', value: 24010, tone: 'neutral' },
        { label: 'Low', value: 23960, tone: 'ice' },
      ] },
      calc: { id: 'return-calc', preset: { start: 24010, end: 24120, years: 1 }, why: 'Quick check of the open-to-close change in points and percent.' },
    },
    {
      t: 2,
      def: `A bullish candle closes above its open, so its body is green (or hollow, depending on the platform). It shows that buyers were stronger than sellers over that period. A long body with small wicks is the strongest version.`,
      hi: `Bullish candle woh hai jo apne open se upar close hoti hai, isliye uski body green (ya hollow) hoti hai. Isse pata chalta hai ki us period mein buyers sellers se zyada strong the. Lambi body aur chhote wicks sabse strong form hai.`,
      how: `Close above open means the last price was higher than the first, regardless of the path. A bullish candle with a long lower wick shows sellers pushed price down but buyers took it back; one with a long upper wick shows buyers ran out of strength near the high. Colours are a display choice: always check the platform's legend, since some charts use red for up moves. A single green candle is weak evidence; several in a row with rising lows is stronger.`,
      eg: {
        title: 'A strong green 15-minute candle (illustrative)',
        text: `Open 23,950, high 24,040, low 23,945, close 24,035. Body = 85 points out of a range of 95 (89%). The close is 5 points under the high, so buyers stayed in control to the end. A call buyer might wait for a small pullback toward 23,990 rather than chase at the top, and place the stop below the candle low of 23,945.`,
      },
      tip: `Judge a green candle by where it closed within its range, not just by its colour.`,
      visual: { kind: 'candles', title: 'Run of bullish candles', caption: 'Higher closes and higher lows describe sustained buying.', pattern: 'uptrend' },
    },
    {
      t: 3,
      def: `A bearish candle closes below its open, so its body is red (or filled). It shows sellers were stronger than buyers over the period. A long red body with short wicks shows sellers dominating from start to finish.`,
      hi: `Bearish candle woh hai jo apne open se neeche close hoti hai, isliye body red (ya filled) hoti hai. Iska matlab hai ki us period mein sellers buyers se zyada strong the. Lambi red body aur chhote wicks ka matlab hai sellers shuru se aakhir tak haavi rahe.`,
      how: `The same logic as the bullish candle, reversed: last price below first price. A long upper wick on a red candle means buyers tried early and failed. A red candle that closes near its low shows no late buying. In a falling market the useful clue is whether each bounce candle fails below the previous candle's high.`,
      eg: {
        title: 'A bearish day (illustrative)',
        text: `Open 24,120, high 24,135, low 23,960, close 23,975. Body = 145 points, range = 175, so the body is 83% of the range and the close is 15 points above the low. Price fell from the open nearly all session. A trader who buys a 24,000 PE would think about where the idea fails, for instance a close above the day's high of 24,135, a distance of 160 points from the close.`,
      },
      tip: `One red candle is not a trend. Look for lower highs and closes near the lows across several candles.`,
      visual: { kind: 'candles', title: 'Run of bearish candles', caption: 'Lower closes and lower highs describe sustained selling.', pattern: 'downtrend' },
    },
    {
      t: 4,
      def: `The body is the thick part of a candle between open and close. Wicks (shadows) are the thin lines above and below the body that reach the high and low. The body shows where the period's trading was accepted; the wicks show prices that were visited and rejected.`,
      hi: `Body candle ka mota hissa hai jo open aur close ke beech hota hai. Wicks (shadows) body ke upar aur neeche ki patli lines hain jo high aur low tak jaati hain. Body batati hai ki kis price par trading accept hui, aur wicks batate hain ki kaun se prices dekhe gaye par reject ho gaye.`,
      how: `Compare the three parts. A big body and tiny wicks mean one side dominated. A small body with long wicks on both sides means a tug of war with no winner. A long upper wick means higher prices were rejected; a long lower wick means lower prices were rejected. Wick length is best judged against the recent average candle size, because 40 points is a long wick on a quiet day and normal on a volatile one.`,
      eg: {
        title: 'Splitting a candle into parts (illustrative)',
        text: `Candle A: O 24,050, H 24,060, L 23,990, C 24,055: body 5, upper wick 5, lower wick 60 (24,050 − 23,990). Candle B: O 24,010, H 24,100, L 24,005, C 24,095: body 85, upper wick 5, lower wick 5. A shows lower prices rejected sharply; B shows one-sided buying. Ratio of lower wick to body in A is 60 / 5 = 12 times.`,
      },
      tip: `Wicks tell you what was rejected, bodies tell you what was accepted. Read both together.`,
      visual: { kind: 'compare', title: 'Body vs wick', caption: 'The two halves of a candle answer different questions.', left: { head: 'Body', tone: 'gold', points: ['Open to close', 'Where price was accepted', 'Long body = conviction'] }, right: { head: 'Wick', tone: 'ice', points: ['Reaches high or low', 'Where price was rejected', 'Long wick = failed push'] } },
    },
    {
      t: 5,
      def: `A doji is a candle whose open and close are almost the same, so its body is very small and it looks like a cross or plus. It shows indecision: buyers and sellers balanced out during the period. It is a pause, not by itself a reversal.`,
      hi: `Doji aisi candle hai jiska open aur close lagbhag same hota hai, isliye body bahut chhoti hoti hai aur woh cross ya plus jaisi dikhti hai. Yeh indecision dikhati hai: us period mein buyers aur sellers barabar rahe. Yeh ek pause hai, akele reversal ka signal nahi.`,
      how: `During a doji both sides tried: price went up and down but returned to where it started. After a long strong move, a doji hints that the push is slowing; in a sideways market it is common and meaningless. Many traders wait for the next candle to confirm: a close beyond the doji's high suggests buyers took over, a close below its low suggests sellers did. Variations such as a long-legged doji, a dragonfly (long lower wick) and a gravestone (long upper wick) carry the same idea with extra detail.`,
      eg: {
        title: 'A doji at the day high (illustrative)',
        text: `After a rise from 23,900 to 24,090 in an hour, one 15-minute candle prints O 24,090, H 24,125, L 24,055, C 24,092. Body = 2 points against a range of 70. The next candle closes at 24,040, below the doji low of 24,055, so the pause was followed by selling. Had the next candle closed above 24,125, the same doji would have been a pause within an uptrend.`,
      },
      tip: `A doji is a question, not an answer. The next candle's close is the answer.`,
      visual: { kind: 'candles', title: 'Doji after a rise', caption: 'A tiny body with wicks on both sides shows balance; wait for the next close.', pattern: 'doji' },
    },
    {
      t: 6,
      def: `A hammer is a candle with a small body near the top and a long lower wick, at least about twice the body. It forms after a fall and shows that sellers pushed price down but buyers took it back before the close. It is a possible sign of a bottom, needing confirmation.`,
      hi: `Hammer aisi candle hai jiski body chhoti hoti hai upar ki taraf aur neeche lamba wick hota hai, kam se kam body ka lagbhag do guna. Yeh girawat ke baad banti hai aur dikhati hai ki sellers ne price neeche dhakela lekin close se pehle buyers wapas le aaye. Yeh bottom ka possible sign hai, par confirmation chahiye.`,
      how: `The long lower wick is the key: price went to a new low and was rejected. The hammer matters only after a decline and ideally at a support area or the previous day's low. Confirmation is the next candle closing above the hammer's high. The hammer's low is the natural invalidation level for a call idea. Colour is secondary; a green hammer is slightly stronger than a red one.`,
      eg: {
        title: 'Hammer at support, with a call (illustrative)',
        text: `NIFTY falls to a hammer: O 23,950, H 23,960, L 23,880, C 23,955. Body 5, lower wick 70 (14 times the body). A trader buys the 24,000 CE (3 days left, IV 14%) at about ₹105 with spot at 23,955, and exits if spot closes below 23,875, where the call is worth about ₹72. Loss per lot = (105 − 72) × 65 = ₹2,145. If the idea works and spot rises to 24,060, the call is worth about ₹160 (illustrative), a gain of (160 − 105) × 65 = ₹3,575. The reward in this example is larger than the risk, but the trade can still lose.`,
      },
      tip: `Never trade a hammer in isolation. It needs a preceding fall, a level and a confirming candle.`,
      visual: { kind: 'candles', title: 'Hammer', caption: 'Long lower wick, small body near the high: sellers rejected.', pattern: 'hammer', level: { price: 23880, label: 'Hammer low = idea fails below' } },
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 105, stop: 72, lotSize: 65 }, why: 'Sizes the call so the loss at the hammer-low stop stays within 1% of capital.' },
    },
    {
      t: 7,
      def: `A shooting star is the mirror of a hammer: a small body near the bottom with a long upper wick, forming after a rise. It shows buyers pushed price up but sellers drove it back down. It is a possible sign of a top, needing confirmation.`,
      hi: `Shooting star hammer ka ulta hai: chhoti body neeche ki taraf aur lamba upper wick, jo badhat ke baad banta hai. Yeh dikhata hai ki buyers ne price upar le gaye lekin sellers ne wapas neeche gira diya. Yeh top ka possible sign hai, par confirmation chahiye.`,
      how: `The long upper wick is rejection of higher prices. It matters after an advance and near a resistance zone or a previous high. Confirmation is the next candle closing below the shooting star's low. The star's high is the invalidation for a put idea: a close above it says buyers won the argument. Remember that in a strong uptrend, such candles often appear and the trend simply continues.`,
      eg: {
        title: 'Shooting star at resistance, with a put (illustrative)',
        text: `After a rise, a candle prints O 24,100, H 24,170, L 24,095, C 24,105. Body 5, upper wick 65. The trader buys the 24,100 PE (3 days left, IV 14%) at about ₹115 with spot at 24,105 and exits if spot closes above 24,175, where the put is worth about ₹84. Loss per lot = (115 − 84) × 65 = ₹2,015. Both the entry and the exit assume the premium follows spot as in a model; real quotes differ.`,
      },
      tip: `Upper wicks in a strong uptrend are often just pauses. The signal needs a level and a confirming close below.`,
      visual: { kind: 'candles', title: 'Shooting star near a high', caption: 'Rejection of higher prices; watch for a close below its low.', pattern: 'distribution', level: { price: 24170, label: 'Star high = idea fails above' } },
    },
    {
      t: 8,
      def: `An engulfing pattern is a two-candle setup in which the second candle's body fully covers the first candle's body in the opposite colour. A bullish engulfing (green over red) hints that buyers have taken control; a bearish one (red over green) hints the opposite.`,
      hi: `Engulfing pattern do candles ka setup hai jismein doosri candle ki body pehli candle ki body ko poora cover kar leti hai aur colour ulta hota hai. Bullish engulfing (red ke upar green) ka hint hai ki buyers ne control le liya; bearish engulfing (green ke upar red) mein ulta.`,
      how: `The pattern is read after a clear move: bullish engulfing after a fall, bearish after a rise. The second candle opens beyond the first candle's close and finishes beyond its open, which shows the earlier side was overwhelmed within one period. It carries more weight on higher timeframes, with higher volume and at a level. The low of the bullish engulfing pattern is where a long idea fails.`,
      eg: {
        title: 'Bullish engulfing, with a call (illustrative)',
        text: `Day 1 (red): O 24,050, C 24,010, body 40. Day 2 (green): O 24,000, C 24,090, body 90, which covers 24,010 to 24,050. The trader buys the 24,100 CE (2 days left, IV 14%) at about ₹98 and uses a stop at spot 24,005 (about ₹62). Loss per lot = (98 − 62) × 65 = ₹2,340. For a ₹5,000 budget that is 5,000 / 2,340 = 2.14, so 2 lots.`,
      },
      tip: `Compare bodies, not wicks. The second body must cover the first body, and a level makes it matter.`,
      visual: { kind: 'candles', title: 'Bullish engulfing', caption: 'The green body covers the previous red body completely.', pattern: 'engulfing' },
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 98, stop: 62, lotSize: 65 }, why: 'Lots for the engulfing-based call with the stop under the pattern low.' },
    },
    {
      t: 9,
      def: `An inside bar is a candle whose high and low both lie within the previous candle's range. The previous candle is the mother bar. It shows a pause or compression, and traders watch for a breakout of the mother bar's high or low.`,
      hi: `Inside bar woh candle hai jiska high aur low dono pichli candle ke range ke andar hote hain. Pichli candle ko mother bar kehte hain. Yeh pause ya compression dikhata hai, aur traders mother bar ke high ya low ke breakout ka intezaar karte hain.`,
      how: `The market stopped expanding: participants are waiting. Direction is unknown until price closes beyond the mother bar's high or low. A trader can place orders on both sides and cancel the other once one triggers, or wait for a close. Inside bars during a news wait (before the RBI policy or a Budget speech) are common. A tight inside bar has a small risk distance, which allows a smaller stop.`,
      eg: {
        title: 'Inside bar on the daily chart (illustrative)',
        text: `Mother bar: high 24,120, low 23,980 (range 140). Next day: high 24,070, low 24,010, which sits inside. A close above 24,120 would suggest an upside break, a close below 23,980 a downside break. The compression distance is 70 / 140 = 50% of the mother range. If a call is bought on a close at 24,130, the stop under the mother low at 23,980 is 150 points away, so size lots for the full distance.`,
      },
      tip: `Use the inside bar to mark both break points in advance, then act only on a close beyond one of them.`,
      visual: { kind: 'candles', title: 'Compression before a break', caption: 'A small candle inside a large one: wait for a close outside.', pattern: 'range' },
    },
    {
      t: 10,
      def: `Candlestick psychology is the idea that every candle records a battle between buyers and sellers, and that its shape reveals who was more eager or more afraid. It explains why patterns work only some of the time: they describe emotions that may or may not be repeated.`,
      hi: `Candlestick psychology ka idea yeh hai ki har candle buyers aur sellers ki ladai ka record hai, aur uski shape batati hai ki kaun zyada utsuk ya daraa hua tha. Isse samajh aata hai ki patterns sirf kabhi-kabhi kaam kyun karte hain: woh emotions dikhate hain jo dobara repeat ho bhi sakte hain, nahi bhi.`,
      how: `Greed shows as long green bodies near highs; fear as long red bodies near lows; doubt as dojis and long wicks. Stop-loss clusters add a mechanical effect: when price breaks a level, stops are triggered and the candle extends. News and expiry days make candles larger without changing their meaning. Because patterns are visible to every trader, they are crowded, and crowded setups fail as often as they work. Probability, not certainty, is the correct frame.`,
      eg: {
        title: 'Why the same candle works once and fails once (illustrative)',
        text: `A hammer forms at 23,950 on a Monday with volume 1.4 times average and the market rises 110 points the next day. The identical hammer forms at 23,950 on a Thursday with 0.7 times average volume and price falls 90 points. If a trader risks ₹2,000 per trade and the first setup wins ₹3,000 while the second loses ₹2,000, net = +₹1,000. A pattern that is right 50% of the time with a 1.5 reward to risk can still produce gains, but only with strict risk control.`,
      },
      tip: `Patterns describe emotion, they do not forecast it. Pair them with a level, volume and a pre-planned stop.`,
      visual: { kind: 'matrix', title: 'What a candle may say', xLabels: ['Small body', 'Large body'], yLabels: ['Long wicks', 'Short wicks'], cells: [
        { head: 'Tug of war', note: 'Both sides tried, none won', tone: 'neutral' },
        { head: 'Rejection', note: 'Big move then pushback', tone: 'gold' },
        { head: 'Quiet', note: 'Low interest, drifting', tone: 'ice' },
        { head: 'Conviction', note: 'One side dominated', tone: 'neutral' },
      ] },
      calc: { id: 'risk-reward', preset: { winRate: 50, avgWin: 3000, avgLoss: 2000 }, why: 'Shows the expectancy of a pattern that wins half the time with a 1.5 reward to risk.' },
    },
  ],
}
export default m
