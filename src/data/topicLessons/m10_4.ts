import type { ModuleLesson } from '../topicLessonTypes'

/* Module 10.4 — Breakout and Breakdown.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). Option prices are Black-Scholes values
 * (IV 14% unless stated, r 6.5%, q 1.3%) rounded; real premiums differ. The 24,150 resistance and every volume figure are constructed. */
const m: ModuleLesson = {
  moduleId: '10.4',
  intro: `A breakout is a close beyond a level the market has respected before, and a breakdown is the same thing on the downside. These moves are where option buyers hope to catch a quick run and where they are most often trapped, because many breakouts fail. This module teaches how to tell a confirmed move from a spike, and what the option premium does meanwhile.`,
  introHi: `Breakout ka matlab hai ki price ek aise level ke bahar close kare jisko market pehle respect kar chuka hai, aur breakdown iska ulta hai. Option buyers yahin quick move pakadne ki koshish karte hain aur yahin sabse zyada fasste bhi hain, kyunki bahut saare breakouts fail ho jaate hain. Is module mein seekhenge ki confirmed move aur sirf spike mein farak kaise pehchaanein, aur is beech option premium kya karta hai.`,
  steps: {
    concept: `A level is a price zone where buyers or sellers acted before: a swing high, a swing low, the previous day high or an opening range edge. A breakout is a decisive move above such a zone, a breakdown a decisive move below it. The word decisive matters. A brief poke through the level that reverses is a false move, and a trader who acted on it first and confirmed later pays for it.`,
    conceptHi: `Level ek price zone hota hai jahan buyers ya sellers pehle active rahe hain, jaise swing high, swing low, pichhle din ka high ya opening range ka edge. Breakout us level ke upar decisive move hai, breakdown neeche. Decisive shabd important hai. Level ko thodi der chhoo kar wapas aa jana false move hai, aur jisne confirmation se pehle trade kiya use iski keemat chukani padti hai.`,
    mechanism: `Above a swing high sit buy-stop orders from shorts covering and from breakout traders, so price can accelerate once the level trades. If fresh buyers keep arriving the move holds; if the orders were only a one-time burst, price falls back inside the range and the traders who entered at the top are now losing. Confirmation tools (a closing price beyond the level, rising volume, supportive OI and a retest that holds) each remove one way the move can fail, but none removes all of them.`,
    example: {
      title: 'A 24,150 breakout and the 24,200 CE (illustrative)',
      text: `NIFTY has failed at 24,150 twice. At 11:30 a 15-minute candle closes at 24,176, above 24,150 plus a buffer of 0.1% (24,150 × 1.001 = 24,174.15), on futures volume of 1,85,000 against a 1,00,000 average. The 24,200 CE with 2 days left costs about ₹92 (₹5,980 per lot of 65). Next day, if NIFTY has run to 24,330, the call is worth about ₹157, a gain of 65 × 65 = ₹4,225. If instead NIFTY slips back to 24,120, the call is about ₹39, a loss of 53 × 65 = ₹3,445. The same entry, two outcomes, and no way to know in advance.`,
    },
    chart: {
      kind: 'candles',
      title: 'Breakout above resistance',
      caption: 'Price closes above the level, often retests it from above, then continues. A close back inside the range cancels the signal.',
      pattern: 'breakout',
      level: { price: 24150, label: 'Resistance 24,150' },
    },
    optionChain: `On the chain, a real breakout often shows the call writers at the broken strike (24,150 or 24,200) covering, so their OI may fall while the call premium rises, and fresh put OI may build a strike or two below as new support. That pattern is suggestive, not proof, because OI alone cannot show who initiated a trade and a high OI level is a potential level, not guaranteed support or resistance. Also watch IV: a breakout that lifts premiums mainly through IV is less reliable than one that moves spot cleanly.`,
    psychology: `Breakout buyers fear missing the move, so many enter on the first touch. Shorts above the level fear the loss growing and buy back, which feeds the move. After a failure the same crowd is trapped: buyers hold hoping for a retest while stop-losses below trigger more selling. Patient traders wait for the close and the retest, accept a slightly worse entry, and in return avoid many false starts.`,
    scenarios: {
      bullish: `NIFTY closes above 24,174 on a 15-minute candle with strong volume, retests 24,150 and holds. The 24,200 CE may gain from delta and from the day closing near highs, while theta slowly erodes the premium.`,
      bearish: `The poke above 24,150 fails and price closes back below, a false breakout. Call buyers lose as delta and time value both drop, and put buyers who waited for the failure may find a good short-term entry.`,
      sideways: `Price hovers around 24,150 without a clear close beyond it. No breakout has occurred; option buyers lose to theta while they wait, which is the cost of an unconfirmed signal.`,
    },
    practice: [
      {
        q: `Resistance is 24,150 and you require a close 0.1% beyond it. What close confirms a breakout? Does a 15-minute close of 24,168 qualify?`,
        a: `0.1% of 24,150 = 24.15, so the level is 24,150 + 24.15 = 24,174.15. A close of 24,168 is below it, so it does not qualify. A close of 24,176 does.`,
      },
      {
        q: `You buy the 24,200 CE at ₹92 on the breakout and it falls to ₹39 after the move fails. What is the loss per lot of 65?`,
        a: `Loss per unit = 92 − 39 = ₹53. Per lot = 53 × 65 = ₹3,445.`,
      },
      {
        q: `Breakout-bar futures volume is 1,85,000 against an average of 1,00,000. What is the ratio, and is it enough on its own?`,
        a: `1,85,000 / 1,00,000 = 1.85 times average. It is supportive, but volume alone does not prove the move will hold; a retest and a closing confirmation still matter.`,
      },
      {
        q: `The trade in the example gains ₹4,225 if it works and loses ₹3,445 if it fails. What is the reward-to-risk ratio and the win rate needed to break even?`,
        a: `Reward to risk = 4,225 / 3,445 = 1.23. Breakeven win rate = 3,445 / (4,225 + 3,445) = 3,445 / 7,670 = 44.9%, before charges.`,
      },
    ],
    assignment: `Open a 15-minute NIFTY chart, mark the previous swing high and low, and find three recent breakouts. For each, note whether the 15-minute close, volume and retest confirmed it, and whether price held ten candles later. Count how many were genuine and write one rule that would have filtered out the false ones.`,
  },
  topics: [
    {
      t: 1,
      def: `A breakout is a move of price above a resistance level, such as a swing high, the previous day high or the top of a range. It suggests that buyers are strong enough to absorb the sellers who stopped the price earlier. It is only a suggestion until the move holds.`,
      hi: `Breakout ka matlab hai price ka resistance level ke upar nikal jana, jaise swing high, pichhle din ka high ya range ka top. Yeh isharaa deta hai ki buyers itne strong hain ki pehle price rokne wale sellers ko absorb kar gaye. Lekin yeh sirf ishara hai, jab tak move tikta nahi.`,
      how: `Resistance forms where sellers or call writers acted before. Above it sit stop-loss orders of short sellers and entry orders of breakout traders, so once the level trades there is a burst of buying. If the buying continues from new participants, the old resistance often becomes support. On an option chain this may show as call OI at the nearby strike shrinking. A breakout is judged by where price closes and what it does afterwards, not by the high of one candle.`,
      eg: {
        title: 'NIFTY clears 24,150 (illustrative)',
        text: `NIFTY had stalled at 24,150 on two earlier days. A 15-minute candle closes at 24,176, which is 26 points or about 0.11% above the level. The next three candles stay above 24,150. The 24,200 CE moves from about ₹92 to ₹157 if NIFTY reaches 24,330 the next day, a gain of 65 × 65 = ₹4,225 per lot.`,
      },
      tip: `Judge a breakout by the close and by what happens next, not by the intraday high that touched the level.`,
      visual: { kind: 'candles', title: 'Breakout', caption: 'A close above 24,150 followed by a hold above it.', pattern: 'breakout', level: { price: 24150, label: 'Resistance 24,150' } },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24200, premium: 92, expiryPrice: 24330, lotSize: 65, lots: 1 }, why: 'Shows the payoff of the 24,200 CE at an expiry value of 24,330; the ₹4,225 gain in the lesson is the one-day-before-expiry case, so the calculator shows the expiry number instead.' },
    },
    {
      t: 2,
      def: `A breakdown is a move of price below a support level, such as a swing low, the previous day low or the bottom of a range. It suggests that sellers have overpowered the buyers who held the price up before. Like a breakout, it needs confirmation.`,
      hi: `Breakdown ka matlab hai price ka support level ke neeche nikal jana, jaise swing low, pichhle din ka low ya range ka bottom. Yeh batata hai ki sellers ne un buyers ko haraa diya jo pehle price ko sambhaale hue the. Breakout ki tarah ise bhi confirmation chahiye.`,
      how: `Below support sit stop-losses of long holders and put buyers' entry orders, so a break can feed itself. Falls are often faster than rises and India VIX tends to rise during them, which can lift put premiums beyond what delta alone explains. The risk is a quick bounce: if IV spikes and then falls, put premiums can drop even when the index is still lower than where the put was bought.`,
      eg: {
        title: 'NIFTY loses 23,800 (illustrative)',
        text: `NIFTY held 23,800 on three days. A 15-minute candle closes at 23,772, 28 points below. The 23,800 PE with 2 days left costs about ₹95 with NIFTY at 23,800. If NIFTY reaches 23,720 the next day, the put is worth about ₹114, a rise of about ₹19 or 19 × 65 = ₹1,235 per lot, small for an 80-point fall because a day of time decay was subtracted. If NIFTY bounces back above 23,800 the put gives back all of it.`,
      },
      tip: `Falling markets also raise IV, so a put may gain more than delta suggests, but the same IV can fall quickly on a bounce.`,
      visual: { kind: 'candles', title: 'Breakdown', caption: 'A close below support followed by a failure to recover it.', pattern: 'breakdown', level: { price: 23800, label: 'Support 23,800' } },
    },
    {
      t: 3,
      def: `A genuine breakout is one where price moves beyond the level and stays there, usually with higher volume and often with supportive OI changes. New participants have taken over from the old sellers. It is genuine only in hindsight, but several signs raise the odds.`,
      hi: `Genuine breakout woh hota hai jahan price level ke bahar jaakar wahin tikta hai, aksar zyada volume ke saath aur kabhi kabhi OI ke supportive badlav ke saath. Matlab naye participants purane sellers ki jagah le lete hain. Yeh genuine hai ya nahi, yeh pakka baad mein hi pata chalta hai, lekin kuch signs se chance badh jaate hain.`,
      how: `Signs often seen: a candle close beyond the level, volume well above the recent average, the move sustained for several candles, and a retest of the old level that holds as new support. On the option chain, call writers at the broken strike may buy back, which can show as falling call OI. None of these is a guarantee. A genuine breakout can still reverse later; the claim is only that it was not a trap at the first test.`,
      eg: {
        title: 'Checking a breakout (illustrative)',
        text: `Close 24,176 against the buffered level 24,174.15, volume 1.85 times average, next candle low 24,152 (above the old level), 24,200 CE OI down 6% while 24,100 PE OI is up 9%. Four of four checks line up. The 24,200 CE costing ₹92 is a ₹5,980 outlay per lot; the stop could be a close back below 24,150.`,
      },
      tip: `Write the checks down before the trade. If only one of four lines up, treat the setup as unconfirmed.`,
      visual: { kind: 'flow', title: 'Breakout checklist', steps: [{ label: 'Close beyond level', note: 'plus a small buffer', tone: 'gold' }, { label: 'Volume above average', note: 'use futures volume', tone: 'gold' }, { label: 'OI supportive', note: 'writers covering', tone: 'ice' }, { label: 'Retest holds', note: 'old resistance as support', tone: 'ice' }] },
    },
    {
      t: 4,
      def: `A false breakout is a move beyond a level that quickly reverses back inside the range. Traders who entered on the break are trapped and their exits add fuel in the opposite direction. It is also called a fakeout or a bull trap when it happens above resistance.`,
      hi: `False breakout mein price level ke bahar jaakar jaldi hi wapas range ke andar aa jaata hai. Jinhone break par entry li woh fass jaate hain aur unke stop-loss ka selling ulte direction ko aur taakat deta hai. Resistance ke upar hota hai toh ise bull trap bhi kehte hain.`,
      how: `It often happens when the first burst comes from stop-loss orders and not from real new demand, or when the move arrives on low volume, near a news event or in the last hour of a thin session. Price closes back below the level and may then fall quickly. For call buyers the damage is double: delta shrinks and, if IV had risen, IV also falls. Option writers who had sold calls at that strike benefit when this happens.`,
      eg: {
        title: 'The 24,176 close that failed (illustrative)',
        text: `A trader buys the 24,200 CE at ₹92 after the 24,176 close. By the next day NIFTY is back at 24,120 and the call is worth about ₹39. Loss = (92 − 39) × 65 = ₹3,445 per lot, or 58% of the premium paid, even though NIFTY fell only 56 points. Time decay and a smaller delta took the rest.`,
      },
      tip: `A close back inside the range within a few candles is the cleanest exit signal; keep the stop at the level, not at a hopeful distance below it.`,
      visual: { kind: 'candles', title: 'False breakout', caption: 'Price pokes above 24,150 and closes back below.', pattern: 'falseBreakout', level: { price: 24150, label: 'Resistance 24,150' } },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24200, premium: 92, expiryPrice: 24120, lotSize: 65, lots: 1 }, why: 'At expiry value 24,120 the call is worthless: a loss of the full ₹5,980 premium, which is the worst case of the failed trade.' },
    },
    {
      t: 5,
      def: `A failed breakdown is a move below support that quickly reverses and closes back above it. Short sellers and put buyers who entered on the break are trapped. It can lead to a sharp bounce as they exit.`,
      hi: `Failed breakdown mein price support ke neeche jaakar jaldi wapas upar close ho jaata hai. Jo short sellers ya put buyers break par entry kar chuke the woh fass jaate hain. Unke exit se kabhi kabhi tez bounce aata hai.`,
      how: `It is the mirror of a false breakout. Sellers push price under support, find no follow-through, and buyers step in. The shorts' buy-backs add to the rise. On the chain, put writers at the support strike who held their positions look right, and put premiums fall quickly as IV cools. The signal is more reliable when the recovery candle has strong volume and price holds above the level on the next candles.`,
      eg: {
        title: 'The dip under 23,800 (illustrative)',
        text: `NIFTY trades to 23,785, below the 23,800 support, then closes the 15-minute candle at 23,832. A put buyer who paid about ₹95 for the 23,800 PE sees it fall to about ₹80 on the recovery close. If NIFTY then moves to 23,890 next day the put is about ₹33, a loss of (95 − 33) × 65 = ₹4,030 per lot. The call buyer who bought the recovery has the opposite experience.`,
      },
      tip: `A failed breakdown is a possible entry only after price reclaims the level and holds; buying the first wick is a guess.`,
      visual: { kind: 'candles', title: 'Failed breakdown', caption: 'A wick under support, then a close back above it.', pattern: 'hammer', level: { price: 23800, label: 'Support 23,800' } },
    },
    {
      t: 6,
      def: `A breakout retest is when price returns to the broken level after the breakout, to check whether it now works as support. If it holds and bounces, the breakout gains credibility. If price falls back through, the breakout has failed.`,
      hi: `Breakout retest mein price breakout ke baad toote hue level par wapas aata hai taaki dekha jaaye ki woh ab support ban gaya ya nahi. Agar level hold karke bounce aaye toh breakout ka bharosa badhta hai. Agar price level ke neeche chala jaaye toh breakout fail ho gaya.`,
      how: `Early buyers book some profit and late buyers wait for a better price, so price drifts back toward the level. Old resistance sellers have usually been absorbed, so buyers defend it. A retest gives a defined risk: the stop sits just below the level, so the trader risks little if wrong. The cost of waiting is that strong breakouts sometimes never retest and run away without you.`,
      eg: {
        title: 'Retest of 24,150 (illustrative)',
        text: `After the close at 24,176 NIFTY runs to 24,230, comes back to 24,155 and bounces to 24,210. A buyer entering the 24,200 CE at the retest low area risks roughly 24,155 to 24,130 on spot, about 25 points. With delta near 0.45 that is about 11 option points or 11 × 65 = ₹715 per lot, compared with a far larger stop if he had entered at 24,230.`,
      },
      tip: `Waiting for a retest improves the risk but may cost you the trade; decide beforehand which you prefer and stay consistent.`,
      visual: { kind: 'timeline', title: 'Breakout, retest, continuation', events: [{ when: '11:30', what: 'Close at 24,176 above 24,150', tone: 'gold' }, { when: '12:15', what: 'High at 24,230', tone: 'bull' }, { when: '13:00', what: 'Pullback to 24,155 (retest)', tone: 'ice' }, { when: '13:30', what: 'Bounce to 24,210 holds', tone: 'bull' }] },
    },
    {
      t: 7,
      def: `Volume confirmation means checking whether a breakout comes with more traded quantity than usual. Heavier volume suggests more participants are willing to trade at the new price. Low-volume breakouts are more likely to fail.`,
      hi: `Volume confirmation ka matlab hai dekhna ki breakout ke saath normal se zyada quantity trade ho rahi hai ya nahi. Zyada volume ka matlab hai ki zyada log naye price par trade karne ko ready hain. Kam volume ke breakout zyada fail hote hain.`,
      how: `The NIFTY spot index has no traded volume of its own, so traders use NIFTY futures volume (or the heavily traded stocks' volumes) as a proxy. Compare the breakout candle's volume with the average of the last 20 candles at the same time of day, because the morning and closing sessions are always busier than midday. Volume also rises when stop-losses trigger, so high volume on its own does not prove real demand; check that the price stays beyond the level.`,
      eg: {
        title: 'Volume ratio (illustrative)',
        text: `Average 15-minute NIFTY futures volume at this time of day is 1,00,000 contracts, and the breakout candle trades 1,85,000, a ratio of 1.85. A candle at 1.1 times average would be a weak confirmation; one above 1.5 times is usually seen as meaningful. The threshold is a personal rule, not an official one.`,
      },
      tip: `Compare volume with the same time of day, not with the whole-day average.`,
      visual: { kind: 'bars', title: 'Breakout candle volume vs average', unit: ' contracts', caption: 'Illustrative 15-minute NIFTY futures volume.', items: [{ label: '20-candle average', value: 100000, tone: 'neutral' }, { label: 'Breakout candle', value: 185000, tone: 'gold' }, { label: 'Weak breakout candle', value: 110000, tone: 'neutral' }] },
    },
    {
      t: 8,
      def: `OI confirmation means checking whether open interest changes support the move. In futures, price up with OI up suggests fresh long positions; price up with OI down suggests short covering. In options, falling call OI at the broken strike may mean writers are covering.`,
      hi: `OI confirmation ka matlab hai dekhna ki open interest ka badlav move ko support karta hai ya nahi. Futures mein price up aur OI up ka matlab fresh long positions ho sakta hai; price up aur OI down ka matlab short covering. Options mein broken strike par call OI girna matlab writers cover kar rahe ho sakte hain.`,
      how: `The futures build-up rules apply to futures, not blindly to option OI. A rise in call OI at a strike could be writing or buying, and OI alone cannot show who initiated a trade. NSE updates OI during the day, so compare the change since the open and look at the pattern across several strikes. Short covering moves can be fast but may fade, since no new buyers have arrived; fresh long build-up usually holds better.`,
      eg: {
        title: 'Futures OI on the breakout (illustrative)',
        text: `NIFTY futures price rises 0.3% (24,150 to 24,222) and OI rises 2.1% over the same period. By the build-up rule this is a long build-up in futures, a stronger sign than price up with OI down by 1.5%, which would be short covering. The Greeks of the option do not change; only the reading of the participants does.`,
      },
      tip: `Use OI to split a rise into fresh buying and short covering, but remember it only describes futures positions clearly.`,
      visual: { kind: 'matrix', title: 'Futures price and OI', caption: 'The four classic readings; they are for futures and only a guide for options.', xLabels: ['OI up', 'OI down'], yLabels: ['Price up', 'Price down'], cells: [{ head: 'Long build-up', note: 'Fresh buyers', tone: 'bull' }, { head: 'Short covering', note: 'Sellers exiting', tone: 'gold' }, { head: 'Short build-up', note: 'Fresh sellers', tone: 'bear' }, { head: 'Long unwinding', note: 'Buyers exiting', tone: 'gold' }] },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.3, oiChangePct: 2.1 }, why: 'Classifies the price and OI change as a long build-up in futures.' },
    },
    {
      t: 9,
      def: `A sustained breakout is one where price keeps trading beyond the level for a meaningful time, such as an hour, a whole session or several days, and does not slip back inside the old range. The longer it holds, the more weight it carries.`,
      hi: `Sustained breakout woh hota hai jahan price level ke bahar kaafi der tikta hai, jaise ek ghanta, poora session ya kai din, aur purani range mein wapas nahi aata. Jitni der tikta hai, utna zyada bharosemand hota hai.`,
      how: `Sustained moves usually show higher lows after the break, closes in the upper part of each candle and a daily close near the day's high. They also change the option picture: call writers at lower strikes lose their role as resistance, and OI may migrate to higher strikes. For an option buyer, time matters: a breakout that takes many hours to develop gives theta more time to cut the premium, so a longer-dated option or a spread may suit better than the weekly.`,
      eg: {
        title: 'Held for the whole session (illustrative)',
        text: `NIFTY closes the day at 24,215, above the 24,150 level, and the next day opens at 24,230 and stays above 24,150. Two daily closes above the level are a stronger sign than a single intraday close. Meanwhile, if NIFTY had simply stood still at 24,176, the 24,200 CE bought at ₹92 would be worth about ₹61 a day later, ₹31 lower from time alone, so waiting costs money even when the thesis is right.`,
      },
      tip: `Time is a cost for the buyer; a thesis that needs several days may call for a later expiry.`,
      visual: { kind: 'candles', title: 'Sustained breakout', caption: 'Higher lows after the break and closes near the highs.', pattern: 'uptrend' },
    },
    {
      t: 10,
      def: `Closing confirmation means waiting for a 5-minute, 15-minute or 30-minute candle to close beyond the level before acting. A longer candle filters out more noise but gives a later and often costlier entry. A shorter candle is quicker but produces more false signals.`,
      hi: `Closing confirmation ka matlab hai ki action lene se pehle 5-minute, 15-minute ya 30-minute candle ke level ke bahar close hone ka intezaar karna. Lambi candle noise zyada filter karti hai par entry der se aur mehngi milti hai. Chhoti candle jaldi signal deti hai par false signals bhi zyada aate hain.`,
      how: `A wick through the level can be stop-hunting or a thin-market spike; a close means that buyers were still in charge when the candle ended. The trade-off: a 5-minute close is quick but noisy, a 30-minute close is safer but may already be 50 points past the level. Many traders use the 15-minute close with a small buffer. Choose one rule, test it on past charts and apply it every time; switching the rule after a loss defeats the purpose.`,
      eg: {
        title: 'Same breakout, three timeframes (illustrative)',
        text: `Level 24,150. The 5-minute candle closes at 24,162 at 11:20 (entry for the 24,200 CE roughly ₹85). The 15-minute candle closes at 24,176 at 11:30 (₹92). The 30-minute candle closes at 24,188 at 11:45, at about ₹97. The later entry pays more per lot: 12 more points is 12 × 65 = ₹780, but it avoided an earlier wick.`,
      },
      tip: `The best timeframe is the one you test and follow consistently; the rule matters less than the discipline.`,
      visual: { kind: 'bars', title: 'Entry premium by confirmation candle', unit: '', caption: 'Illustrative 24,200 CE price at each confirmation close.', items: [{ label: '5-min close 24,162', value: 85, tone: 'neutral' }, { label: '15-min close 24,176', value: 92, tone: 'gold' }, { label: '30-min close 24,188', value: 97, tone: 'neutral' }] },
      calc: { id: 'risk-reward', preset: { winRate: 45, avgWin: 4225, avgLoss: 3445 }, why: 'Turns the breakout trade into an expectancy figure so the cost of a later entry can be compared.' },
    },
  ],
}
export default m
