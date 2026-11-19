import type { ModuleLesson } from '../topicLessonTypes'

/* Module 10.2 — Market Structure.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). Option premiums in the examples are
 * Black-Scholes values (IV 14%, r 6.5%, q 1.3%, 3 calendar days to expiry) rounded to whole points; real premiums differ. */
const m: ModuleLesson = {
  moduleId: '10.2',
  intro: `Market structure is the pattern of swing highs and swing lows that price leaves behind. Rising highs and lows describe an uptrend, falling highs and lows describe a downtrend, and a flat pattern describes a range. Reading structure first tells an option trader which side to favour and which price proves the idea wrong.`,
  introHi: `Market structure woh pattern hai jo price apne swing highs aur swing lows ke roop mein chhodta hai. Badhte highs aur lows uptrend dikhate hain, girte highs aur lows downtrend, aur flat pattern range. Structure pehle padhne se option trader ko pata chalta hai ki kaun si side favour karni hai aur kaun sa price batayega ki idea galat hai.`,
  steps: {
    concept: `A swing high is a peak with lower prices on both sides; a swing low is a trough with higher prices on both sides. Structure is simply the order of these points. Higher highs and higher lows (HH, HL) mean buyers keep winning higher ground. Lower highs and lower lows (LH, LL) mean sellers keep winning lower ground. When the sequence breaks, the character of the market may be changing. Structure is a description of what has happened, not a forecast.`,
    conceptHi: `Swing high woh peak hai jiske dono taraf lower prices hote hain; swing low woh trough hai jiske dono taraf higher prices hote hain. Structure bas in points ka order hai. Higher highs aur higher lows (HH, HL) matlab buyers lagatar upar ki zameen jeet rahe hain. Lower highs aur lower lows (LH, LL) matlab sellers lagatar neeche ki zameen jeet rahe hain. Jab sequence tootta hai, toh market ka character badal sakta hai. Structure jo ho chuka hai uska description hai, forecast nahi.`,
    mechanism: `To mark structure, choose one timeframe (for example 15-minute for intraday, daily for positional) and mark swing points that stand out, ignoring tiny wiggles. Then label each new swing relative to the previous one. A trend continues while the last swing low (in an uptrend) or last swing high (in a downtrend) holds. When price closes beyond that protective swing, the trend is at risk. Different timeframes can disagree: a 5-minute downtrend can sit inside a daily uptrend, so say which timeframe you are using.`,
    example: {
      title: 'A clean uptrend and the failure of its last higher low (illustrative)',
      text: `Swing lows: 23,800, 23,860, 23,920. Swing highs: 23,950, 24,020, 24,090. Each is higher than the one before: an uptrend. Price then closes at 23,915, below the last higher low of 23,920, and later bounces only to 23,985, a lower high. A trader who buys a 24,000 PE (3 days left, IV 14%) at about ₹162 with spot 23,915 may exit if spot closes above 23,990, where the put is worth about ₹121. Loss per lot = (162 − 121) × 65 = ₹2,665. With a ₹5,000 risk budget that is 5,000 / 2,665 = 1.88, so 1 lot.`,
    },
    chart: {
      kind: 'candles',
      title: 'Uptrend: higher highs and higher lows',
      caption: 'Each pullback ends above the previous pullback low; the first close under that low is the first warning.',
      pattern: 'uptrend',
    },
    optionChain: `The option chain does not show structure; it shows where option positions are concentrated. Use structure to pick direction and the stop, then look at the chain for a reality check: a rising structure with fresh put OI building at strikes below price is consistent with traders defending that area, but OI cannot show who initiated the trades and high OI is only a potential level. Also use structure to choose the strike: in a clean trend an ATM or slightly ITM option follows price more reliably than a far OTM one.`,
    psychology: `In an uptrend, dip buyers are rewarded and sellers get squeezed, so confidence grows and people chase near highs. In a downtrend, bounce sellers are rewarded and buyers get trapped. The most expensive mistake is calling a top or bottom on the first sign. Experienced traders wait for the structure to prove itself, accepting a worse entry in exchange for evidence.`,
    scenarios: {
      bullish: `HH and HL continue; the last higher low holds and each breakout closes above the previous high. Call buying on pullbacks to the last higher low may be considered, with the stop under that low. A close below it puts the idea on watch.`,
      bearish: `LH and LL continue; each bounce fails under the previous high. Put buying on weak bounces may be considered, with the stop above the last lower high. A close above that high signals a possible change.`,
      sideways: `Highs and lows stay inside a band, and breaks fail. Structure gives no trend to follow; option buyers face decay while sellers face the risk of a sudden break. Trade only the edges of the range with small size, or stay out.`,
    },
    practice: [
      {
        q: `Swing highs 24,100, 24,060, 24,020 and swing lows 23,950, 23,920, 23,880. What is the structure?`,
        a: `Highs are falling (24,100 → 24,060 → 24,020) and lows are falling (23,950 → 23,920 → 23,880): lower highs and lower lows, a downtrend. A close above 24,020 (the last lower high) would be the first sign of a possible change.`,
      },
      {
        q: `In an uptrend with last higher low at 23,920, price closes at 23,905. What has happened?`,
        a: `A close below the last higher low breaks the HH/HL sequence by 15 points. It is a warning, usually called a change of character. It is confirmed as a shift only if price then makes a lower high and a lower low.`,
      },
      {
        q: `A range holds between 23,900 and 24,100. What is its width in points and in percent of the midpoint 24,000?`,
        a: `Width = 200 points; 200 / 24,000 = 0.83%. A NIFTY daily 1-standard-deviation move at India VIX 14 is about 176 points, so the range is roughly one day's expected move and a break is easily possible.`,
      },
      {
        q: `Why must you state the timeframe when calling a trend?`,
        a: `Because structure repeats at every scale. A 5-minute lower-high-lower-low sequence can sit inside a daily uptrend. Without the timeframe, two traders can both be right and still disagree.`,
      },
    ],
    assignment: `On a NIFTY 15-minute chart for the last five sessions, mark every swing high and low you can defend and label them HH, HL, LH or LL. Write the current structure in one sentence, name the price that would change your view, and check it again after the next two sessions.`,
  },
  topics: [
    {
      t: 1,
      def: `A higher high (HH) is a swing high that is above the previous swing high. It shows buyers were able to push price beyond the last peak. A series of higher highs is one half of an uptrend.`,
      hi: `Higher high (HH) woh swing high hai jo pichle swing high se upar hota hai. Yeh dikhata hai ki buyers price ko pichle peak ke paar le jaa paaye. Higher highs ki series uptrend ka aadha hissa hai.`,
      how: `Mark the previous swing high and watch whether price trades and, better, closes above it. A wick above followed by a close back below is weaker than a close above. Each new higher high shows demand is still strong enough to absorb sellers waiting at the old peak. On its own a higher high says little; it matters together with higher lows.`,
      eg: {
        title: 'Peaks 23,950 → 24,020 → 24,090 (illustrative)',
        text: `The second peak is 24,020 − 23,950 = 70 points above the first, the third is 24,090 − 24,020 = 70 points above the second. A close above 24,090 would make a fourth higher high. If price instead reaches 24,085 and falls back, there is no new higher high, a sign of weakening momentum rather than proof of reversal.`,
      },
      tip: `A higher high needs acceptance above the old peak. A close above counts for more than a brief spike.`,
      visual: { kind: 'bars', title: 'Successive swing highs (illustrative)', caption: 'Each peak is above the last.', unit: '', items: [
        { label: 'Swing high 1', value: 23950, tone: 'neutral' },
        { label: 'Swing high 2', value: 24020, tone: 'bull' },
        { label: 'Swing high 3', value: 24090, tone: 'bull' },
      ] },
    },
    {
      t: 2,
      def: `A higher low (HL) is a swing low that stays above the previous swing low. It shows that buyers stepped in earlier than before, so dips are being bought at rising prices. It is the more important half of an uptrend because it marks the level to protect.`,
      hi: `Higher low (HL) woh swing low hai jo pichle swing low se upar rehta hai. Yeh dikhata hai ki buyers pehle se jaldi, ooncha price par aaye, yaani dips ooncha price par kharide ja rahe hain. Yeh uptrend ka zyada important hissa hai kyunki yahi woh level hai jise bachana hai.`,
      how: `After a rise, price pulls back and finds buyers above the previous pullback low. Traders then place stop-losses just below that low, so the higher low becomes the line between "trend intact" and "trend in doubt". Entries on pullbacks to a higher low give a small distance to the stop, which allows more lots for the same risk. Once a close occurs below it, the HH/HL sequence is broken.`,
      eg: {
        title: 'Buying the pullback to a higher low (illustrative)',
        text: `Lows: 23,860 then 23,920. Price pulls back to 23,930 and a trader buys the 24,000 CE at about ₹95 (3 days left, IV 14%), with a stop on a close below 23,920. Risk distance in spot = 10 points plus a buffer, say 30 points; at a delta of about 0.38 that is about 11 premium points, or 11 × 65 = ₹715 per lot (illustrative). A tight stop is only useful if the trend holds, and gaps can skip it.`,
      },
      tip: `The higher low is your reference for risk. Place stops on a closing break of it, not inside the noise above it.`,
      visual: { kind: 'bars', title: 'Successive swing lows (illustrative)', caption: 'Each dip finds buyers at a higher price.', unit: '', items: [
        { label: 'Swing low 1', value: 23800, tone: 'neutral' },
        { label: 'Swing low 2', value: 23860, tone: 'bull' },
        { label: 'Swing low 3', value: 23920, tone: 'bull' },
      ] },
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 95, stop: 84, lotSize: 65 }, why: 'Small stop distance at a higher low allows more lots within the same 1% risk.' },
    },
    {
      t: 3,
      def: `A lower high (LH) is a swing high that stays below the previous swing high. It shows sellers appeared earlier than before, so bounces are failing at falling prices. It marks the level to watch in a downtrend.`,
      hi: `Lower high (LH) woh swing high hai jo pichle swing high se neeche rehta hai. Yeh dikhata hai ki sellers pehle se jaldi aa gaye, yaani bounces girte hue prices par fail ho rahe hain. Downtrend mein yeh woh level hai jis par nazar rakhni hoti hai.`,
      how: `After a fall, price bounces but sellers appear below the previous peak. Short sellers and put buyers use the lower high as their reference: a close above it says the bounce is not just a bounce. In option terms, call writers sit above the lower high with a defined level where they know they are wrong. A rejection candle, such as a shooting star or a long upper wick, at the lower high strengthens the case.`,
      eg: {
        title: 'Falling peaks 24,100 → 24,060 → 24,020 (illustrative)',
        text: `Each peak is 40 points under the previous one. A bounce to 24,015 that closes at 23,990 is another lower high. A put buyer would treat a close above 24,020 as the line where the idea fails. If the 24,000 PE is ₹133 with 4 days left (IV 14%) and falls to about ₹100 on a stop, the loss is (133 − 100) × 65 = ₹2,145 per lot (illustrative).`,
      },
      tip: `Sellers show their hand at the lower high. A close above it means the sequence has failed.`,
      visual: { kind: 'candles', title: 'Lower highs in a downtrend', caption: 'Each bounce stops below the previous peak.', pattern: 'downtrend' },
    },
    {
      t: 4,
      def: `A lower low (LL) is a swing low below the previous swing low. It shows sellers pushed price through the last floor. A series of lower lows is the other half of a downtrend.`,
      hi: `Lower low (LL) woh swing low hai jo pichle swing low ke neeche jaata hai. Yeh dikhata hai ki sellers ne price ko pichle floor ke paar dhakel diya. Lower lows ki series downtrend ka doosra hissa hai.`,
      how: `When price closes beneath the previous swing low, the stops resting there trigger and add selling, which often extends the candle. A lower low is strongest when it comes with a bounce that fails below the previous high (lower high). After several lower lows, prices can be stretched and a sharp bounce is possible, so chasing late can be costly. Put buyers should remember that a stretched fall carries expensive premiums if volatility has risen.`,
      eg: {
        title: 'Floors 23,950 → 23,920 → 23,880 (illustrative)',
        text: `Steps of 30 and 40 points. A fall to 23,860 closing at 23,870 sets a fourth lower low. If India VIX rises from 14 to 17 during the fall, put premiums can be inflated; a put bought into the fall may lose on a bounce even if the trend later continues. The expected one-day move at VIX 17 is 24,000 × 0.17 × √(1/365) ≈ 214 points, against 176 at VIX 14.`,
      },
      tip: `A lower low confirms selling but does not tell you how much of the fall is left. Late entries have worse reward to risk.`,
      visual: { kind: 'candles', title: 'Breakdown to a lower low', caption: 'Price closes under the previous swing low.', pattern: 'breakdown', level: { price: 23920, label: 'Previous swing low' } },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 17, days: 1 }, why: 'Shows how much larger the expected one-day move is when VIX has risen to 17.' },
    },
    {
      t: 5,
      def: `An uptrend is a market that keeps making higher highs and higher lows over the chosen timeframe. Buyers are in control on that scale. The trend lasts until the pattern of higher lows is broken.`,
      hi: `Uptrend woh market hai jo chune hue timeframe par higher highs aur higher lows banata rehta hai. Us scale par buyers ke haath mein control hota hai. Trend tab tak chalta hai jab tak higher lows ka pattern tootta nahi.`,
      how: `Trend followers buy pullbacks and hold while the last higher low survives. Moving averages are often used as a helper, but they follow structure and do not lead it. Within an uptrend there are impulse legs (strong, fast) and corrective legs (slow, overlapping); healthy trends show impulses with larger candles and volume and pullbacks with smaller ones. Call buyers benefit from direction but pay time decay on every slow pullback, so strike and expiry choice matter.`,
      eg: {
        title: 'Trend with decay cost (illustrative)',
        text: `NIFTY rises from 23,800 to 24,090 over three days (+290 points, 1.2%). A 24,000 CE bought at about ₹147 with 4 days left (spot 24,000) may be worth about ₹205 on 24,100 with 4 days left, but if price instead stalls for two days at 24,000 the call may drop toward ₹103 (illustrative, 2 days left). Direction right but slow still costs money.`,
      },
      tip: `Identifying an uptrend is only half the job. Entry on a pullback and an expiry with enough time protect against slow trends.`,
      visual: { kind: 'candles', title: 'Uptrend', caption: 'Rising swing highs and lows.', pattern: 'uptrend' },
    },
    {
      t: 6,
      def: `A downtrend is a market that keeps making lower highs and lower lows on the chosen timeframe. Sellers are in control on that scale. It lasts until the pattern of lower highs is broken.`,
      hi: `Downtrend woh market hai jo chune hue timeframe par lower highs aur lower lows banata rehta hai. Us scale par sellers ka control hota hai. Yeh tab tak chalta hai jab tak lower highs ka pattern tootta nahi.`,
      how: `Falls are usually faster than rises because fear acts quicker than greed, and stop-loss selling cascades. India VIX tends to rise during falls, which lifts put premiums even when direction is right; when the fall pauses, VIX can drop and put premiums can fall faster than expected. A trader buying puts in a downtrend therefore watches both direction and volatility. Downtrends also end with sharp bounces, which hurt late sellers.`,
      eg: {
        title: 'Put value in a fall with falling VIX (illustrative)',
        text: `Spot falls from 24,000 to 23,880 over two days with 3 days left on the 24,000 PE. At constant IV 14% the put rises from about ₹133 (4 days left, spot 24,000) to about ₹171 (3 days left, spot 23,900). If IV also drops 3 points the gain shrinks. The index move is +120 points against you only if you are short; for the buyer the gain is (171 − 133) × 65 ≈ ₹2,470 under constant IV, less if IV falls.`,
      },
      tip: `In a downtrend watch India VIX as well as price. A fall with a drop in IV can be less rewarding to put buyers than expected.`,
      visual: { kind: 'candles', title: 'Downtrend', caption: 'Falling swing highs and lows.', pattern: 'downtrend' },
    },
    {
      t: 7,
      def: `A sideways market, also called a range, moves between a fairly steady upper and lower boundary without making clear higher or lower swings. It shows balance between buyers and sellers. It usually ends with a breakout in either direction.`,
      hi: `Sideways market, jise range bhi kehte hain, ek lagbhag steady upar aur neeche ki boundary ke beech chalta hai aur saaf higher ya lower swings nahi banata. Yeh buyers aur sellers ke balance ko dikhata hai. Yeh aam taur par kisi bhi taraf ke breakout par khatam hota hai.`,
      how: `Price oscillates between support and resistance, and indicators that suit trends fail. Range trading means buying near the bottom and selling near the top with stops just outside the band; it is a lower-risk plan only when the stop is small. Option sellers may favour such periods as time decay works for them, but a break can cause a large loss, so risk must be defined. Options buyers pay decay with no trend, and ranges tend to end in sharp moves that may reward those who wait for a closing break.`,
      eg: {
        title: 'A 200-point range (illustrative)',
        text: `NIFTY trades between 23,900 and 24,100 for six sessions. Width = 200 points (0.83% of 24,000). A trader who buys the 24,000 CE for ₹147 on day one with 4 days left, and sees spot at 24,000 two days later, holds a call worth about ₹103 (2 days left), a fall of (147 − 103) × 65 = ₹2,860 per lot with no change in spot (illustrative).`,
      },
      tip: `A range punishes option buyers with decay. Trade the edges with defined stops, or wait for a closing break.`,
      visual: { kind: 'candles', title: 'Sideways range', caption: 'Price bounces between two boundaries.', pattern: 'range', level: { price: 24100, label: 'Range top' } },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 147, expiryPrice: 24000, lotSize: 65, lots: 1 }, why: 'Shows the loss at expiry for a call bought into a range if price ends at the strike.' },
    },
    {
      t: 8,
      def: `A market structure shift (MSS) is when the pattern of swings flips from one trend to the other: for example, an uptrend that makes a lower low and a lower high. Many traders use the term for a confirmed change, not just the first warning.`,
      hi: `Market structure shift (MSS) tab hota hai jab swings ka pattern ek trend se doosre mein palat jata hai: jaise uptrend jo lower low aur lower high banane lage. Kai traders is term ko confirmed badlaav ke liye use karte hain, sirf pehle warning ke liye nahi.`,
      how: `Sequence: an uptrend's last higher low breaks, price bounces to a lower high, then falls to a lower low. At that point the structure has flipped. Terms are used loosely by educators: some call the first break an MSS, others reserve it for the confirmed flip, so state your own definition. Confirmation costs a worse entry, but it filters many false alarms. The stop for the new direction sits beyond the lower high.`,
      eg: {
        title: 'From uptrend to downtrend (illustrative)',
        text: `Uptrend lows 23,860, 23,920; highs 24,020, 24,090. Price drops to 23,890 (below 23,920), bounces to 24,000 (lower than 24,090), then falls to 23,850 (below 23,890). The sequence 24,090 → 24,000 and 23,920 → 23,890 → 23,850 is a downtrend. A put idea has its stop above 24,000, a distance of 150 points from 23,850.`,
      },
      tip: `Wait for the lower high and lower low. The first break alone may just be a deep pullback.`,
      visual: { kind: 'flow', title: 'Shift in four steps', caption: 'From higher swings to lower swings.', steps: [
        { label: 'HH and HL', note: 'Uptrend', tone: 'bull' },
        { label: 'Higher low breaks', note: 'Warning', tone: 'gold' },
        { label: 'Lower high', note: 'Bounce fails', tone: 'bear' },
        { label: 'Lower low', note: 'Shift confirmed', tone: 'bear' },
      ] },
    },
    {
      t: 9,
      def: `A break of structure (BOS) is a close beyond the previous swing high or swing low in the direction of the existing trend. It shows the trend continues and has made a new extreme. It is a continuation signal, not a reversal.`,
      hi: `Break of structure (BOS) tab hota hai jab price existing trend ki direction mein pichle swing high ya low ke paar close karta hai. Yeh dikhata hai ki trend chal raha hai aur naya extreme bana hai. Yeh continuation ka signal hai, reversal ka nahi.`,
      how: `In an uptrend, a close above the last swing high is a BOS and a new higher high; in a downtrend, a close below the last swing low is a BOS. Many traders then wait for a pullback toward the broken level, which often becomes the new support, rather than buying the break itself. A BOS on strong volume and with a large body is more convincing than one on small volume. A BOS without follow-through can turn into a false breakout.`,
      eg: {
        title: 'BOS above 24,090 with a retest (illustrative)',
        text: `Price closes at 24,125, above the last swing high of 24,090: a BOS of 35 points. It pulls back to 24,095 and holds. A trader buys the 24,100 CE (2 days left) at about ₹98 with spot 24,090 and exits on a close below 24,005, where the call is worth about ₹62. Loss per lot = (98 − 62) × 65 = ₹2,340.`,
      },
      tip: `A BOS is a continuation, not a reason to buy any price. Look for acceptance and a retest.`,
      visual: { kind: 'candles', title: 'Break of structure', caption: 'A close above the previous high continues the trend.', pattern: 'breakout', level: { price: 24090, label: 'Previous swing high' } },
    },
    {
      t: 10,
      def: `A change of character (CHoCH) is the first break in the opposite direction of the existing trend: in an uptrend, the first close below the last higher low. It signals the character of the market is changing, but it does not confirm a new trend.`,
      hi: `Change of character (CHoCH) existing trend ki ulti direction mein pehla break hai: uptrend mein, last higher low ke neeche pehla close. Yeh batata hai ki market ka character badal raha hai, lekin naya trend confirm nahi karta.`,
      how: `Before a CHoCH, every dip was bought; after it, the first dip was not. The reaction is to protect profits, tighten stops and avoid new trend trades, rather than to rush into the opposite side. Compare BOS (continuation) with CHoCH (first warning) and MSS (confirmed flip). A CHoCH inside a higher timeframe trend often turns out to be only a deeper pullback.`,
      eg: {
        title: 'The first close under the higher low (illustrative)',
        text: `Uptrend with last higher low 23,920. A 15-minute candle closes at 23,905: CHoCH by 15 points. A call holder with a stop planned under 23,920 exits. Whether a put is worth buying depends on what comes next; if price bounces back above 23,990 within a few candles the warning has failed.`,
      },
      tip: `CHoCH is a warning, not an entry. Use it to protect what you have; wait for a lower high before betting on a reversal.`,
      visual: { kind: 'compare', title: 'BOS vs CHoCH', caption: 'Same chart idea, opposite meaning.', left: { head: 'Break of structure', tone: 'bull', points: ['Break in trend direction', 'Trend continues', 'Look for retest'] }, right: { head: 'Change of character', tone: 'bear', points: ['First break against trend', 'Trend in doubt', 'Protect and wait'] } },
    },
  ],
}
export default m
