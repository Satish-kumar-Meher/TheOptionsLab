import type { ModuleLesson } from '../topicLessonTypes'

/* Module 17.4 — Market Day Types.
 * Day-type vocabulary follows Market Profile (J. Peter Steidlmayer; popularised by James Dalton). The definitions are descriptive
 * conventions, not laws; different authors draw the lines slightly differently.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification), India VIX ≈ 14 (one-day 1σ ≈ 176 points).
 * Initial Balance (IB) = the range of the first 60 minutes of the session. */
const m: ModuleLesson = {
  moduleId: '17.4',
  intro: `Every trading day has a shape. Some days stay in a narrow box, some run one way from the open, some break and then re-balance. Market day types give names to these shapes so you can recognise early which one is developing and size, strike and time your trade accordingly. They are classifications after the fact that you try to read in real time, so confirm with price and volume and never assume the day type from the open alone.`,
  introHi: `Har trading din ki ek shape hoti hai. Kuch din narrow box mein rehte hain, kuch open se ek hi direction mein bhaagte hain, kuch break karke dobara balance bana lete hain. Day types in shapes ko naam dete hain taaki aap jaldi pehchan sako ki aaj kaunsa din ban raha hai aur uske hisaab se size, strike aur timing chuno. Yeh classification aksar din ke baad confirm hoti hai, isliye sirf open dekhkar day type mat maan lo.`,
  steps: {
    concept: `A day type describes how the session's range developed relative to the first hour. The first hour range is the Initial Balance (IB). After it forms, the day either stays inside it (normal), pushes out on one side (normal variation, trend), pushes out on both sides (neutral), builds a second area of value (double distribution) or barely moves at all (non-trend). Gaps and rotation are additional labels for how the day starts and behaves.`,
    conceptHi: `Day type batata hai ki session ki range pehle ghante ke mukable kaise bani. Pehle ghante ki range ko Initial Balance (IB) kehte hain. Uske baad din ya toh IB ke andar rehta hai (normal), ek taraf nikalta hai (normal variation, trend), dono taraf nikalta hai (neutral), doosra value area banata hai (double distribution) ya bahut kam move karta hai (non-trend). Gap aur rotation yeh batate hain ki din kaise shuru hua aur kaise chala.`,
    mechanism: `Mark the high and low of the first 60 minutes (9:15 AM to 10:15 AM). Then track what happens next. Does price stay inside the IB? Does it break one side and keep going, with volume? Does it break both sides? Does it build a second cluster away from the first? Compare the range with a one-day 1σ move implied by India VIX (spot × VIX × sqrt(1/365)); at VIX 14 and NIFTY 24,000 that is about 176 points. A day that uses a small fraction of that range is quiet; a day that uses more than it is expanding. Also note where the open sits relative to yesterday's close and value, because a gap changes the odds.`,
    example: {
      title: 'Five illustrative days against the same 60-point IB',
      text: `IB = 24,000 to 24,060 (60 points). Normal: day range 24,000 to 24,070 (70 points), the IB is 60 ÷ 70 = 86% of the day. Normal variation: price extends only above the IB to 24,120, range 120 points, IB = 50% of it. Trend: IB is narrower (24,000 to 24,030, 30 points), the day runs to 24,260 and closes at 24,250, range 260 points, close at 250 ÷ 260 = 96% of the range from the low. Neutral: extends down to 23,970 and up to 24,100, range 130 points, close 24,040, near the middle of the range (mid 24,035). Non-trend: total range 40 points, about 23% of the 176-point 1σ move. Day types are only known fully at the end.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Day types by IB break and conviction',
      caption: 'Left to right: inside the IB or broken out. Top to bottom: weak participation or strong. This is a simplified map; real days blend types.',
      xLabels: ['Stays near the IB', 'Breaks out of the IB'],
      yLabels: ['Low participation', 'High participation'],
      cells: [
        { head: 'Non-trend', note: 'Narrow range, thin volume', tone: 'neutral' },
        { head: 'Normal variation / neutral', note: 'One or both sides extend', tone: 'ice' },
        { head: 'Normal', note: 'Wide IB, then rotation inside', tone: 'gold' },
        { head: 'Trend / double distribution', note: 'Strong, one-sided or two-block day', tone: 'gold' },
      ],
    },
    optionChain: `The day type should change what you do on the chain, not just on the chart. On a possible trend day, premium of the direction you favour can keep expanding, while the opposite side decays quickly. On a rotational or non-trend day, short-dated premium decays and breakouts often fail. The chain also helps confirm: a trend day usually shows premium and OI shifting steadily in one direction, but OI alone cannot show who initiated the trade, so use it as supporting evidence only.`,
    psychology: `On a trend day buyers (or sellers) are urgent and the other side steps back, so pullbacks are shallow and many traders are left behind. On a rotational day both sides are willing to trade at both ends of the range, so every breakout feels strong and then fails. Beginners often pick the wrong style for the day: they fade a trend and get hurt, or chase a breakout in a rotational day and get whipsawed.`,
    scenarios: {
      bullish: `A narrow IB, price breaking above it with rising volume, shallow pullbacks and a close near the high of the day is the pattern of a bullish trend day. It cannot be confirmed in advance; a fall back inside the IB would weaken it.`,
      bearish: `The mirror: a narrow IB, a break below it, lower highs and a close near the low is a bearish trend day. The same caveat applies; a sharp recovery into the IB would weaken it.`,
      sideways: `Price stays inside the IB or rotates between two edges on modest volume. Breakouts of the IB fail and return. Long option premium tends to decay in such a day.`,
    },
    practice: [
      { q: `NIFTY's IB is 24,000 to 24,060 and the day finishes at a high of 24,070 and a low of 24,000. Which type is most likely, and what share of the range does the IB make up?`, a: `IB range = 60 points; day range = 70 points; 60 ÷ 70 = 85.7%, about 86%. Most of the day was the IB itself, so it looks like a normal day.` },
      { q: `Spot is 24,000 and VIX is 14. What is the one-day 1σ range, and what fraction does a 40-point day use?`, a: `24,000 × 0.14 × sqrt(1/365) ≈ 176 points. 40 ÷ 176 ≈ 0.23 = 23%. That is a quiet day, close to a non-trend day.` },
      { q: `Yesterday closed at 24,000 and today opens at 24,120. Compute the gap in points and percent. What would gap-fill mean?`, a: `Gap = 24,120 − 24,000 = 120 points; 120 ÷ 24,000 = 0.5%. A gap-fill means price trades back down to about 24,000 (yesterday's close) during the day.` },
      { q: `A trend day closes at 24,250 with a low of 24,000 and a high of 24,260. Where in the range did it close?`, a: `Range = 260 points; close is 250 points above the low, 250 ÷ 260 = 96%. A close in the top few percent of the range is typical of a trend day, not a rule.` },
    ],
    assignment: `For the last 10 trading days, record the IB high and low, the day's high and low, the close and the open versus the previous close. Label each day with the type that fits best and note what you could have known by 10:15 AM and what only became clear later. Count how many days stayed inside the IB. Do not trade on it yet.`,
  },
  topics: [
    {
      t: 1,
      def: `A normal day is one where one big player sets a wide range in the first hour (the Initial Balance) and the rest of the day stays mostly inside it. Prices rotate between the two edges and the day's high and low are close to the IB edges.`,
      hi: `Normal day mein pehle ghante mein hi badi range ban jaati hai (Initial Balance) aur baaki din zyadatar usi ke andar chalta hai. Price dono edges ke beech ghoomta rehta hai aur din ka high aur low IB ke edges ke aas-paas hi rehte hain.`,
      how: `It tends to happen when large participants act early, often on news or an event, and then the market agrees that the range is fair. Later sessions bring few new decisions, and the late-day volume is lower. Range extension beyond the IB is small and short-lived. For option sellers this is the friendlier environment, because premium decays; for option buyers it is a day of paying time value with little to show. The label is only certain after the close.`,
      eg: {
        title: 'IB is most of the day',
        text: `Illustrative: IB is 24,000 to 24,060, and the day's range ends at 24,000 to 24,070. IB ÷ day range = 60 ÷ 70 = 86%. An ATM 24,050 CE bought at ₹70 in the morning shows slow decay when price chops inside the range; if it is worth ₹45 at the close, a lot (65) lost 25 × 65 = ₹1,625.`,
      },
      tip: `After a wide first hour, expect rotation more often than extension, but keep a stop. A single volume surge can turn a normal day into something else.`,
      visual: { kind: 'candles', title: 'Normal day: range set early, then rotation', pattern: 'range' },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24050, premium: 70, expiryPrice: 24040, lotSize: 65, lots: 1 }, why: 'Check the loss from a long call when price stays inside the range.' },
    },
    {
      t: 2,
      def: `A normal variation day starts like a normal day, but later in the day price pushes beyond one edge of the Initial Balance and holds there, creating a wider range on one side. The other side of the IB stays untouched.`,
      hi: `Normal variation day normal day ki tarah shuru hota hai, lekin din mein baad mein price IB ke ek edge ke bahar nikalkar wahin tikta hai, jisse ek taraf range badh jaati hai. Doosri taraf ka IB edge touch nahi hota.`,
      how: `The extension usually comes from new information or from fresh participants arriving after the first hour, such as foreign investors or a trader repositioning after a global cue. A common sign is the day's range being about twice the IB or more, with a new, higher or lower cluster of volume. It still has a balance area; it is not a trend day because the move is not sustained or one-sided from the start. Treat the extension as a possible new reference zone.`,
      eg: {
        title: 'One-sided extension',
        text: `Illustrative: IB 24,000 to 24,060. At 1:30 PM price lifts above 24,060 and holds, ending at 24,120, with a day range of 120 points and a close at 24,110. The IB (60) is half of the day's range (60 ÷ 120 = 50%). The lower IB edge at 24,000 was never tested after the first hour. A bought 24,100 CE could have gained, but only if bought after the extension began, not at the open.`,
      },
      tip: `Wait for the extension to hold above (or below) the IB edge before acting. A poke that returns inside is not an extension.`,
      visual: { kind: 'candles', title: 'Normal variation: late extension above the IB', pattern: 'breakout', level: { price: 24060, label: 'IB high' } },
    },
    {
      t: 3,
      def: `A trend day is one where price moves in one direction for almost the whole session. It often opens near one extreme and closes near the other, with a narrow first-hour range and very shallow pullbacks.`,
      hi: `Trend day woh hota hai jisme price lagbhag poore session ek hi direction mein chalta hai. Aksar ek extreme ke paas open hota hai aur doosre extreme ke paas close hota hai, pehle ghante ki range chhoti hoti hai aur pullbacks bahut kam gehre hote hain.`,
      how: `Trend days often arrive with a strong catalyst: a global sell-off, a policy surprise or a large institutional order worked through the day. A narrow IB followed by a break with volume is a possible early sign, but only a possible one. On such days ATM and near-OTM options of the trend direction can gain quickly because delta and gamma both help, while the other side loses value fast. These days are rare, so planning every day as a trend day is a mistake. Exit rules matter more than entry rules.`,
      eg: {
        title: 'Narrow IB, strong run',
        text: `Illustrative: IB 24,000 to 24,030 (30 points). Price breaks up, runs to 24,260 and closes at 24,250, a range of 260 points. The close sits 250 ÷ 260 = 96% from the low. NIFTY moved 250 points from the low; a long futures lot (65) would have gained about 250 × 65 = ₹16,250, and a short position at the open would have lost the same. This is why the day type decides which style is safe.`,
      },
      tip: `Do not fade a suspected trend day on a hunch ("it has gone too far"). Trade it only with a stop, and let the market show a failure before you assume one.`,
      visual: { kind: 'candles', title: 'Trend day: narrow start, steady push', pattern: 'uptrend' },
      calc: { id: 'futures-pnl', preset: { side: 'long', entry: 24000, exit: 24250, lotSize: 65, lots: 1 }, why: 'Check the size of a one-lot move on a 250-point trend day.' },
    },
    {
      t: 4,
      def: `A double distribution day forms two separate areas of heavy trading with a thin zone between them. The market first balances around one price, then moves quickly to another level and balances again.`,
      hi: `Double distribution day mein do alag heavy trading areas ban jaate hain aur beech mein patla zone rehta hai. Market pehle ek price ke aas-paas balance banata hai, phir tezi se doosre level par jaata hai aur wahan dobara balance banata hai.`,
      how: `It often follows a mid-session shock: a news headline, a surprise data print or an order from a large participant. The profile has two humps separated by a low-volume zone, which is a volume gap. After it forms, the thin zone between the two humps may act as a fast corridor on the next test. Traders use the lower hump as support and the upper hump as a reference in a rally, but both are only reference zones, not guarantees.`,
      eg: {
        title: 'Two humps in one session',
        text: `Illustrative: from 9:15 AM to 12:30 PM NIFTY futures trade between 24,000 and 24,060 (hump one). At 12:45 PM a headline lifts price 80 points within 15 minutes, and it then trades 24,120 to 24,160 until the close (hump two). Between the humps, 24,070 to 24,110, volume is thin. If tomorrow price falls back through that zone, expect speed rather than hesitation.`,
      },
      tip: `The thin zone is where the day changed gear. If you enter inside it, your stop gets less room to breathe.`,
      visual: {
        kind: 'layers',
        title: 'Double distribution (top to bottom)',
        layers: [
          { label: 'Upper hump 24,120 to 24,160', note: 'Afternoon value', tone: 'gold' },
          { label: 'Thin zone 24,070 to 24,110', note: 'Moved through quickly', tone: 'ice' },
          { label: 'Lower hump 24,000 to 24,060', note: 'Morning value', tone: 'gold' },
        ],
      },
    },
    {
      t: 5,
      def: `A neutral day is one where price goes beyond both sides of the Initial Balance during the day, but ends near the middle of the day's range. It signals that neither buyers nor sellers won control.`,
      hi: `Neutral day mein price din ke dauran IB ke dono taraf nikalta hai, lekin din ke end tak range ke beech ke aas-paas wapas aa jaata hai. Yeh batata hai ki na buyers ne control liya na sellers ne.`,
      how: `Both sides test the IB and are rejected, so you see an up-extension and a down-extension in the same session. In the "neutral extreme" variant the day closes near one end of its range, which hints that one side won late in the day. Neutral days are common before big events or in a market waiting for a new catalyst. They punish breakout buyers on both sides: the long call bought on the up-break and the long put bought on the down-break may both lose.`,
      eg: {
        title: 'Both edges tested, no winner',
        text: `Illustrative: IB 24,000 to 24,060. At 11:30 AM price breaks down to 23,970 and returns; at 1:45 PM it breaks up to 24,100 and returns; it closes at 24,040. Day range = 24,100 − 23,970 = 130 points; midpoint = 24,035; the close at 24,040 sits right in the middle. A trader who bought a 24,100 CE on the up-break and a 23,950 PE on the down-break saw both lose value into the close.`,
      },
      tip: `If price pokes both sides of the IB and fails each time, stop trading breakouts for the day. Two failed breakouts are information.`,
      visual: { kind: 'candles', title: 'Neutral day: both edges rejected', pattern: 'falseBreakout' },
    },
    {
      t: 6,
      def: `A non-trend day is a very quiet day with a small range and low volume. Price barely leaves the Initial Balance, and there is little interest from large participants.`,
      hi: `Non-trend day bahut shaant din hota hai jisme range chhoti aur volume kam hota hai. Price IB se bahar mushkil se jaata hai aur bade participants ki dilchaspi kam hoti hai.`,
      how: `These days often occur around holidays, in the quiet stretch before major events, or when the market has no fresh information. Intraday option premium decays steadily, and the option buyer pays for a move that does not come. A non-trend day is a lower-risk day for some option sellers, but selling premium has unlimited-loss potential in naked positions, so a surprise headline can change the day at once. Position size and a defined-risk structure matter more here than the quiet appearance.`,
      eg: {
        title: 'Very small range',
        text: `Illustrative: the whole day trades 24,010 to 24,050, a 40-point range. One-day 1σ at VIX 14 is about 176 points, so the day used 40 ÷ 176 = 23% of it. An ATM straddle of ₹140 in the morning (one-day expected move) may fall steeply by the close as no move comes, yet a headline in the last hour could reverse that. The quiet is no guarantee.`,
      },
      tip: `A quiet day looks like free money for sellers and a waste for buyers. Neither is risk-free; keep size modest.`,
      visual: {
        kind: 'bars',
        title: 'Day range vs one-day 1σ (points)',
        unit: ' pts',
        items: [
          { label: 'Non-trend day', value: 40, tone: 'neutral' },
          { label: 'Normal day', value: 70, tone: 'neutral' },
          { label: 'Neutral day', value: 130, tone: 'ice' },
          { label: '1σ at VIX 14', value: 176, tone: 'gold' },
          { label: 'Trend day', value: 260, tone: 'ice' },
        ],
      },
      calc: { id: 'straddle-move', preset: { spot: 24000, cePrice: 70, pePrice: 70, strike: 24000 }, why: 'See the implied move from an ATM straddle and compare it with the day that actually happened.' },
    },
    {
      t: 7,
      def: `A gap-and-go day opens with a gap (above or below the previous close) and the market keeps moving in the direction of the gap without filling it. The gap area is not revisited during the day.`,
      hi: `Gap-and-go day mein market pichhle close se upar ya neeche gap ke saath khulta hai aur gap bharne ki jagah usi direction mein chalta rehta hai. Din ke dauran gap wali jagah dobara touch nahi hoti.`,
      how: `A gap occurs when overnight news, global markets (GIFT Nifty, US market, Asian cues) or a big event shifts the opening price. The gap goes on if participants who were waiting think the new price is still too low or too high. Signs are a strong first 30 minutes in the gap direction, volume above average, and price staying above (for an up-gap) the opening range. Gap-and-go does not mean "always buy gaps". Many gaps fill; the first hour decides which kind it is.`,
      eg: {
        title: 'A 0.5% gap that holds',
        text: `Yesterday NIFTY closed at 24,000. Today it opens at 24,120, a gap of 120 points = 0.5% (120 ÷ 24,000). The first hour stays above 24,100 and the day ends at 24,230. The gap was never filled and the rise from the open was a further 110 points. A call bought at the open would have gained; one bought after a pullback near 24,100 would have gained more, but there was no certainty at the time.`,
      },
      tip: `Judge a gap by the first hour, not by the open. A gap that cannot hold its first pullback is more likely to fill.`,
      visual: { kind: 'candles', title: 'Gap up and go', pattern: 'gapUp', level: { price: 24000, label: 'Prev close' } },
      calc: { id: 'return-calc', preset: { start: 24000, end: 24120, years: 1 }, why: 'Express the gap in points and percent.' },
    },
    {
      t: 8,
      def: `A gap-fill day opens with a gap but then trades back to the previous day's close, closing the gap. The gap acts as a temporary move that the market did not accept.`,
      hi: `Gap-fill day mein market gap ke saath khulta hai, lekin phir pichhle din ke close tak wapas aa jaata hai, jisse gap bhar jaata hai. Matlab market ne gap wale prices ko accept nahi kiya.`,
      how: `A gap fills when the open is driven by excitement or fear that fades, or when large participants use the gap to trade against it. A common pattern is an opening spike, then weak follow-through, and then a steady drift back. Gap-fill is not guaranteed: some gaps remain unfilled for days or weeks, and a fill can take several sessions. Gap fills are a good example of why fading an open should be done with a stop: if the gap-and-go starts, the fade loses quickly.`,
      eg: {
        title: 'A gap that closes',
        text: `Yesterday close 24,000, today open 24,120. After a 10-minute spike to 24,140 buyers fade away and NIFTY slides to 24,000 by 1:30 PM. The gap of 120 points filled. A long futures lot bought at the open (24,120) would have lost 120 × 65 = ₹7,800 at 24,000. A short at 24,130 would have gained ₹130 × 65 = ₹8,450 at 24,000 only if it was taken with a stop above the spike.`,
      },
      tip: `The first 30 minutes usually show whether a gap is being accepted or rejected. If price cannot make a new high after the open, a fill becomes more likely, but still not certain.`,
      visual: { kind: 'candles', title: 'Gap up, then fill', pattern: 'gapDown', level: { price: 24000, label: 'Prev close (gap fill target)' } },
    },
    {
      t: 9,
      def: `A rotational day is one where price moves back and forth between a high and a low inside a range, without a lasting direction. Each push to one edge fails and is followed by a rotation to the other edge.`,
      hi: `Rotational day mein price ek range ke andar high aur low ke beech aage-peeche ghoomta rehta hai aur koi lasting direction nahi banti. Har baar ek edge par push fail hota hai aur doosre edge ki taraf rotation shuru ho jaata hai.`,
      how: `Rotation shows up when buyers and sellers disagree about direction but agree about value, so each side takes profits at the edges. It is typical in a market that is waiting for a trigger. A range-bound trader can buy near the lower edge and sell near the upper edge with a stop beyond the range, but the trade fails when the range breaks. Rotation days are an important reminder that a breakout needs acceptance: a close or a hold beyond the edge, not just a poke.`,
      eg: {
        title: 'Four swings in a box',
        text: `Illustrative: NIFTY rotates 24,020 to 24,080 four times in a day, a 60-point box. A bought call each time price reaches 24,020 could be sold at 24,080 only if a stop is also placed below the box. An ATM option bought at ₹80 that loses ₹10 per rotation due to theta can lose ₹40 in four rotations, which is 40 × 65 = ₹2,600 per lot, even though price ends where it began.`,
      },
      tip: `In a rotating market, time works against option buyers. If your trade needs a trend, wait for the range to break and hold.`,
      visual: { kind: 'candles', title: 'Rotation inside a box', pattern: 'range' },
    },
    {
      t: 10,
      def: `Identifying the day's developing structure means reading, as the day unfolds, which type of day is forming. You use the opening location, the first-hour range, volume, and how price behaves at the edges.`,
      hi: `Day ka developing structure pehchanne ka matlab hai ki din chalte-chalte yeh padhna ki kaunsa day type ban raha hai. Iske liye aap open ki location, pehle ghante ki range, volume aur edges par price ka behaviour dekhte ho.`,
      how: `A simple checklist: (1) Where did price open versus yesterday's value and close? (2) How wide is the first-hour range compared with the one-day 1σ? (3) After the IB, does price stay inside, push out on one side, or both? (4) Is volume rising on the push? (5) Does a pullback hold above or below the IB edge? Update the answers every 30 minutes and change the plan only when two or more answers change. Pivot levels computed from yesterday's high, low and close add reference prices for the same plan.`,
      eg: {
        title: 'Reading the day by 11:00 AM',
        text: `Illustrative: NIFTY opens at 24,090 above yesterday's VAH 24,070. The IB is a narrow 24,085 to 24,115 (30 points, vs 176 for a 1σ day). At 10:30 AM it breaks 24,115 with strong volume. The checklist says possible trend day. You buy a call with a stop below the IB low, say a NIFTY level of 24,085. By 12:30 PM price falls back into the IB: the signal has failed, you exit. The plan said so in advance.`,
      },
      tip: `Write the day-type hypothesis and its failure condition before the trade. If the failure condition triggers, exit. The point is to be wrong small.`,
      visual: {
        kind: 'flow',
        title: 'Day-type checklist, refreshed each 30 minutes',
        steps: [
          { label: 'Open vs value', note: 'Inside or outside?', tone: 'ice' },
          { label: 'IB width', note: 'Narrow or wide?', tone: 'gold' },
          { label: 'IB break', note: 'One side, both, none?', tone: 'neutral' },
          { label: 'Volume', note: 'Rising on the push?', tone: 'gold' },
          { label: 'Pullback holds?', note: 'Failure condition', tone: 'ice' },
        ],
      },
      calc: { id: 'pivot-levels', preset: { high: 24100, low: 23900, close: 24000 }, why: 'Add classic pivot reference levels to the day-type plan.' },
    },
  ],
  tools: [{ id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: 'One-day 1σ range to compare day-type ranges with.' }],
}
export default m
