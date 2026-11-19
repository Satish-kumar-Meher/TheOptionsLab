import type { ModuleLesson } from '../topicLessonTypes'

/* Module 15.6 — Intraday Option Chain Monitoring.
 * All OI, IV and VIX figures are constructed for teaching (illustrative; lakh = 1,00,000). NIFTY ≈ 24,000, lot 65, rate 6.5%.
 * Refresh rate and OI units differ by data source: check yours. */
const m: ModuleLesson = {
  moduleId: '15.6',
  intro: `During the day the option chain is a stream of changes, and the skill is to read the stream at the right time scale. This module covers the opening snapshot, change over one, five, fifteen and thirty minutes, cumulative change since the open, and tracking of the top OI strikes, the highest additions, sudden unwinding, IV and India VIX. It is a monitoring routine, not a signal system.`,
  introHi: `Din bhar option chain badlav ka ek stream hoti hai, aur kaam hai us stream ko sahi time scale par padhna. Is module mein opening snapshot, 1, 5, 15 aur 30 minute ke change, open se cumulative change, top OI strikes, highest additions, sudden unwinding, IV aur India VIX track karna aata hai. Yeh ek monitoring routine hai, signal system nahi.`,
  steps: {
    concept: `Monitoring means recording the same few numbers at fixed times and comparing them. A single frame of the chain shows positions; the difference between two frames shows what changed. Short windows (1 to 5 minutes) are noisy and show the pace; longer windows (15 to 30 minutes) are more reliable; the cumulative change since the open gives the day's net positioning.`,
    conceptHi: `Monitoring ka matlab hai kuch fixed numbers ko fixed time par note karna aur unki tulna karna. Chain ka ek frame positions dikhata hai; do frames ka fark dikhata hai ki kya badla. Chhoti windows (1 se 5 minute) noisy hoti hain aur speed dikhati hain; lambi windows (15 se 30 minute) zyada reliable hoti hain; open se cumulative change din ki net positioning batata hai.`,
    mechanism: `NSE publishes derivative data continuously and data vendors refresh their option-chain views at their own rate, often about once a minute or faster. OI is updated as trades are cleared, so it can lag the price a little. Each snapshot is a table: strike, OI, change in OI (usually against the previous close), volume, LTP, IV. You build your own difference tables between times. Always keep the same expiry, and note the VIX and index level at the time of each snapshot.`,
    example: {
      title: 'One strike at four time scales (illustrative)',
      text: `The 24,100 CE: 9:15 OI 8.0 lakh. 11:30 OI 9.0 lakh. 11:35 OI 9.3 lakh (+0.3 lakh or 3.3% in five minutes). 11:45 OI 9.9 lakh (+0.9 lakh or 10% in fifteen minutes). 12:00 OI 10.8 lakh (+1.8 lakh or 20% in thirty minutes). Cumulative since the open: 10.8 − 8.0 = +2.8 lakh (+35%). The one-minute changes of +0.04, −0.02, +0.06, +0.01 and −0.03 lakh add to 0.06 lakh and show the noise inside one five-minute step.`,
    },
    chart: {
      kind: 'bars',
      title: 'Same strike, growing window (24,100 CE OI change, illustrative lakh)',
      caption: 'Longer windows smooth the noise: the trend is clearer at 15 to 30 minutes.',
      unit: 'L',
      items: [
        { label: '1-min sum of 5 steps', value: 0.06, tone: 'neutral' },
        { label: '5-min', value: 0.3, tone: 'gold' },
        { label: '15-min', value: 0.9, tone: 'ice' },
        { label: '30-min', value: 1.8, tone: 'gold' },
        { label: 'Since open', value: 2.8, tone: 'ice' },
      ],
    },
    optionChain: `Build a one-page dashboard with spot, ATM, top-three call strikes and top-three put strikes by total OI, top-three by change in OI, ATM IV, India VIX and PCR. Refresh it at fixed times. Always read the chain at the same expiry, and when the weekly expiry is within two days remember that OI levels and decay change rapidly.`,
    psychology: `Watching a chain every minute invites overreaction: each flicker looks like a signal. Fixed review times (such as every 15 minutes) protect from noise and from the fear of missing something. Also beware of confirmation bias: looking at only the strikes that agree with your view.`,
    scenarios: {
      bullish: `Over several 15-minute windows put OI additions grow near spot, call OI additions slow or fall, and IV eases. The monitoring picture is supportive of a steady advance, but it fails if the next windows show call additions and a rising VIX.`,
      bearish: `Call OI additions rise at strikes just above, put OI falls at the nearest support and VIX climbs. The picture is of a cap forming and support leaving. A sharp rebound with call OI dropping would change it.`,
      sideways: `Changes are small in each window, additions are balanced and the ATM straddle premium drifts down with time. The day may be a range; an unscheduled announcement can still break it.`,
    },
    practice: [
      {
        q: `OI of a strike is 8.0 lakh at 9:15, 9.9 lakh at 11:45 and 10.8 lakh at 12:00. Compute the 15-minute change at 12:00 and the cumulative change from the open.`,
        a: `15-minute change = 10.8 − 9.9 = +0.9 lakh, which is 0.9 / 9.9 = 9.1%. Cumulative = 10.8 − 8.0 = +2.8 lakh, which is 35%.`,
      },
      {
        q: `A strike falls from 16 lakh to 12 lakh in 10 minutes. What percent is that, and what should you check before calling it unwinding?`,
        a: `Fall = 4 / 16 = 25%. Check the premium and the index (covering or liquidation), whether the OI rose at a nearby strike (a roll), whether the same happens at other strikes and whether the data source is lagging.`,
      },
      {
        q: `ATM IV rises from 13.5% to 15.0% with 2 days left. If vega of the ATM call is about ₹7.08 per IV point per unit, what is the premium effect for one lot of 65?`,
        a: `IV change = 1.5 points. Premium effect = 1.5 × 7.08 = ₹10.62 per unit, and 10.62 × 65 = ₹690 per lot, all else equal.`,
      },
    ],
    assignment: `For one full trading day, record every thirty minutes: spot, VIX, ATM IV, the top call and put OI strikes, the largest call and put OI additions, and PCR. At the end write three observations on what the day's positioning looked like at 10:30 and whether it still held at 14:30.`,
  },
  topics: [
    {
      t: 1,
      def: `The opening snapshot is the record of the chain at or just after the market opens. It becomes the base for the day. It shows the carried-over positions: top OI strikes, PCR, ATM and implied volatility.`,
      hi: `Opening snapshot market khulte hi ya uske turant baad chain ka record hai. Yeh din ka base ban jaata hai. Isme carry-forward positions dikhti hain: top OI strikes, PCR, ATM aur implied volatility.`,
      how: `At the start of the day the OI is the previous day's close, and the Change in OI column compares against the previous close, so it is zero or small until trading builds. The early minutes have wide spreads and unstable IV, so many traders take the base snapshot at around 9:30 to 9:45 after the opening noise. Save the top call and put strikes, total OI and PCR. All later changes are measured from here.`,
      eg: {
        title: 'A 9:30 base (illustrative)',
        text: `Total put OI 120 lakh, total call OI 100 lakh, so PCR = 120 / 100 = 1.2. Highest call OI at 24,200 and highest put OI at 23,900, with spot 24,020 and ATM 24,000. These numbers are the day's reference. Later changes such as +0.9 lakh at 24,200 are read against them.`,
      },
      tip: `Take your base snapshot after the opening noise, and write down the time and VIX with it.`,
      visual: {
        kind: 'flow',
        title: 'What goes in the base snapshot',
        steps: [
          { label: 'Spot, ATM, VIX', note: 'With time stamp', tone: 'gold' },
          { label: 'Top call and put OI', note: 'Strike and size', tone: 'ice' },
          { label: 'PCR', note: 'Total OI ratio', tone: 'neutral' },
          { label: 'ATM IV and straddle', note: 'Market quote of the move', tone: 'gold' },
        ],
      },
      calc: { id: 'pcr', preset: { putOI: 12000000, callOI: 10000000, putVol: 2000000, callVol: 1800000 }, why: 'PCR of the opening snapshot (120 / 100 lakh).' },
    },
    {
      t: 2,
      def: `Every-minute OI changes are the smallest time step many chains offer. They show the immediate pace of trading but contain a lot of noise. A single one-minute change on its own means little.`,
      hi: `Har minute ka OI change woh sabse chhota time step hai jo kai chains deti hain. Yeh turant ki speed dikhata hai par isme bahut noise hota hai. Ek akela one-minute change zyada kuch nahi batata.`,
      how: `One-minute changes jump up and down as orders match and clear. A few large trades or a spread can create a spike that disappears. Use the one-minute view to notice acceleration (several same-direction minutes in a row) and then verify on a longer window. Also note the data source's refresh rate, which may not actually be one minute.`,
      eg: {
        title: 'Noise in five minutes (illustrative)',
        text: `The 24,100 CE one-minute OI changes are +0.04, −0.02, +0.06, +0.01 and −0.03 lakh. The sum is 0.04 − 0.02 + 0.06 + 0.01 − 0.03 = +0.06 lakh. Three of five minutes were positive, but the net is tiny, so there is no real message in this window.`,
      },
      tip: `Use the one-minute view to spot acceleration, never to place a trade.`,
      visual: {
        kind: 'bars',
        title: 'One-minute OI changes (illustrative lakh)',
        unit: 'L',
        items: [
          { label: 'Min 1', value: 0.04, tone: 'bull' },
          { label: 'Min 2', value: 0.02, tone: 'bear' },
          { label: 'Min 3', value: 0.06, tone: 'bull' },
          { label: 'Min 4', value: 0.01, tone: 'bull' },
          { label: 'Min 5', value: 0.03, tone: 'bear' },
        ],
      },
    },
    {
      t: 3,
      def: `Five-minute OI changes smooth the noise a little while still showing the pace. They suit scalpers and quick intraday traders. A single five-minute change is still easily distorted.`,
      hi: `Paanch minute ke OI change noise ko thoda smooth karte hain aur phir bhi speed dikhate hain. Yeh scalpers aur quick intraday traders ke kaam aate hain. Ek akela paanch minute ka change phir bhi aasaani se distort ho sakta hai.`,
      how: `Compare each five-minute change with the typical size for that strike. A change that is three times the usual is worth noting. Look at the neighbouring strikes: a genuine move often appears in two or three strikes. Match with premium and index moves in the same five minutes before drawing even a tentative conclusion.`,
      eg: {
        title: 'A five-minute step (illustrative)',
        text: `At 11:30 the 24,100 CE OI is 9.0 lakh and at 11:35 it is 9.3 lakh, an increase of 0.3 lakh or 3.3% (0.3 / 9.0). The usual five-minute change is about 0.1 lakh, so this is three times normal. LTP rose from ₹70 to ₹76 and NIFTY moved 15 points up. Worth a note, not yet a conclusion.`,
      },
      tip: `Compare a five-minute change with its usual size for that strike, not with zero.`,
      visual: {
        kind: 'timeline',
        title: 'Reading a five-minute step',
        events: [
          { when: '11:30', what: 'OI 9.0 lakh, LTP ₹70', tone: 'neutral' },
          { when: '11:35', what: 'OI 9.3 lakh, LTP ₹76, spot +15', tone: 'gold' },
          { when: 'Check', what: 'Three times usual size; confirm in the next window', tone: 'ice' },
        ],
      },
    },
    {
      t: 4,
      def: `Fifteen-minute changes are the workhorse window for intraday monitoring. They are long enough to remove most noise and short enough to be timely. Many traders review the chain at this rhythm.`,
      hi: `Pandrah minute ke change intraday monitoring ki workhorse window hain. Yeh itni lambi hoti hain ki zyada noise hat jaye aur itni chhoti ki timely rahe. Kai traders isi rhythm par chain review karte hain.`,
      how: `Aligning your review with 15-minute candles lets you read OI changes beside the price candle: did the OI add while price rose or while it fell? Two consecutive 15-minute windows pointing the same way are a better sign than one. Keep the same rule for all strikes so that you do not cherry-pick.`,
      eg: {
        title: 'Fifteen-minute window (illustrative)',
        text: `24,100 CE OI goes 9.0 lakh at 11:30 to 9.9 lakh at 11:45, +0.9 lakh or +10%. The 24,200 CE adds 0.7 lakh and the 24,300 CE adds 0.4 lakh. The three strikes add 2.0 lakh together, so the building is broad, not one spike.`,
      },
      tip: `Pick one review rhythm (for example 15 minutes) and apply it to every strike.`,
      visual: { kind: 'candles', title: 'Review OI at each 15-minute candle close', pattern: 'range' },
      calc: { id: 'return-calc', preset: { start: 9, end: 9.9, years: 1 }, why: 'Percent change of OI (9.0 to 9.9 lakh).' },
    },
    {
      t: 5,
      def: `Thirty-minute changes show the more settled trend of positioning and are less affected by random trades. They suit a slower style and confirmation of what shorter windows suggested.`,
      hi: `Tees minute ke change positioning ka zyada settled trend dikhate hain aur random trades se kam prabhavit hote hain. Yeh dheemi style ke liye aur chhoti windows ki baat confirm karne ke liye achhe hain.`,
      how: `A thirty-minute change that points the same way as the 15-minute and 5-minute windows means the move is persistent. A mismatch (short window up, long window flat) means the recent burst has not changed the broader picture. Thirty minutes is also a good interval for updating a written note on the market's structure.`,
      eg: {
        title: 'Thirty-minute window (illustrative)',
        text: `24,100 CE OI is 9.0 lakh at 11:30 and 10.8 lakh at 12:00, +1.8 lakh or +20%. Five-minute and fifteen-minute windows also showed additions, so the three scales agree. If the five-minute change had been negative while the thirty-minute was positive, the burst would have reversed.`,
      },
      tip: `When the 5, 15 and 30-minute windows agree, the change is persistent; when they disagree, wait.`,
      visual: {
        kind: 'matrix',
        title: 'Short and long window agreement',
        xLabels: ['Short window up', 'Short window down'],
        yLabels: ['Long window up', 'Long window down'],
        cells: [
          { head: 'Persistent build', note: 'Scales agree', tone: 'gold' },
          { head: 'Pause in a build', note: 'Recent exit within a larger rise', tone: 'neutral' },
          { head: 'Early re-build', note: 'Recent add within a larger fall', tone: 'neutral' },
          { head: 'Persistent exit', note: 'Scales agree', tone: 'ice' },
        ],
      },
    },
    {
      t: 6,
      def: `Cumulative OI change is the total change in a strike's OI since a chosen starting point, usually the previous close or the day's first snapshot. It gives the net positioning of the day. It can hide a burst in the morning that was reversed in the afternoon, so look at the path too.`,
      hi: `Cumulative OI change ek strike ke OI ka kisi starting point se total change hai, aksar pichhle close ya din ke pehle snapshot se. Yeh din ki net positioning dikhata hai. Isme subah ka koi burst jo dopahar ko reverse ho gaya, chhup sakta hai, isliye raste ko bhi dekho.`,
      how: `Most chains show Change in OI against the previous close, which is cumulative for the whole day. Compute your own from your 9:30 base if you want to ignore the opening gap. Rank strikes by cumulative change to see where most positions were added or removed. Compare call and put totals for the day to see the net tilt.`,
      eg: {
        title: 'A day net build (illustrative)',
        text: `A strike starts at 8.0 lakh and reaches 10.4 lakh by 12:00, a change of +2.4 lakh or +30%. If at 14:00 it is 9.2 lakh, the cumulative change is +1.2 lakh (+15%), showing that half of the morning's addition has already left.`,
      },
      tip: `Always record both the cumulative change and its peak: the gap between them shows what unwound.`,
      visual: {
        kind: 'timeline',
        title: 'Cumulative change for one strike (illustrative)',
        events: [
          { when: '9:30', what: 'OI 8.0 lakh (base)', tone: 'neutral' },
          { when: '12:00', what: 'OI 10.4 lakh, +2.4 lakh (+30%)', tone: 'gold' },
          { when: '14:00', what: 'OI 9.2 lakh, +1.2 lakh (+15%): half unwound', tone: 'ice' },
        ],
      },
      calc: { id: 'return-calc', preset: { start: 8, end: 10.4, years: 1 }, why: 'Percent change from 8.0 to 10.4 lakh.' },
    },
    {
      t: 7,
      def: `Comparing the current and previous snapshots means building a difference table: what changed between two saved frames of the chain. It turns a full chain into a short list of strikes that moved.`,
      hi: `Current aur previous snapshots ki tulna matlab ek difference table banana: do saved frames ke beech kya badla. Isse poori chain ek chhoti list ban jaati hai ki kaun se strikes hile.`,
      how: `Save the chain at each review time (or use a platform's snapshot comparison feature). Subtract strike by strike: OI, LTP, IV and volume. Sort by the largest absolute change. Then read the top few lines together with the index. The method is also helpful for checking a vendor's numbers against the exchange's end-of-day files.`,
      eg: {
        title: 'Two snapshots (illustrative)',
        text: `At 11:00 the 24,200 CE has OI 12.0 lakh and the 24,000 PE has OI 11.0 lakh. At 11:30 they are 12.9 and 10.2 lakh. The changes are +0.9 lakh (+7.5%, 0.9 / 12.0) and −0.8 lakh (−7.3%, 0.8 / 11.0). Call writing is building above while put OI is falling at the money.`,
      },
      tip: `A diff table is more useful than a full chain: sort by absolute change and read the top five lines.`,
      visual: {
        kind: 'bars',
        title: 'Change in OI between 11:00 and 11:30 (illustrative lakh)',
        unit: 'L',
        items: [
          { label: '24,200 CE', value: 0.9, tone: 'bear' },
          { label: '24,000 PE', value: 0.8, tone: 'bull' },
        ],
        caption: 'Call OI rose 0.9 lakh; put OI fell 0.8 lakh (shown as a magnitude).',
      },
    },
    {
      t: 8,
      def: `Tracking top OI strikes means watching which strikes have the largest total open interest on the call and put sides and whether that ranking changes. These strikes are the reference levels of the chain.`,
      hi: `Top OI strikes track karna matlab dekhna ki call aur put side par kin strikes ka total open interest sabse bada hai aur kya yeh ranking badalti hai. Yeh strikes chain ke reference levels hain.`,
      how: `Keep a list of the top three call and top three put strikes with their OI and time. When the order changes (the second strike overtakes the first), it is a sign of migration. Compare total OI (old plus new) with the change in OI (new today). A top strike mostly made of old OI is static; one with a large change is dynamic.`,
      eg: {
        title: 'Ranking by total OI (illustrative lakh)',
        text: `Calls: 24,200 at 15.0, 24,300 at 13.0, 24,100 at 11.0. Puts: 23,900 at 14.0, 24,000 at 12.5, 23,800 at 12.0. At noon 24,300 CE rises to 15.8 and overtakes 24,200, which stays at 15.0. The top call strike has moved up by 100 points; this is the kind of change worth logging.`,
      },
      tip: `Log when the ranking changes, not only the numbers themselves.`,
      visual: {
        kind: 'oi',
        title: 'Top OI strikes (illustrative lakh)',
        spot: 24050,
        rows: [
          { strike: 23800, ce: 2, pe: 12 },
          { strike: 23900, ce: 3, pe: 14 },
          { strike: 24000, ce: 6, pe: 12.5 },
          { strike: 24100, ce: 11, pe: 5 },
          { strike: 24200, ce: 15, pe: 3 },
          { strike: 24300, ce: 13, pe: 2 },
        ],
      },
    },
    {
      t: 9,
      def: `Tracking the highest OI addition means finding the strikes where the most new contracts were created today. This points to the current action, not to old positions.`,
      hi: `Highest OI addition track karna matlab un strikes ko dhundhna jahan aaj sabse zyada naye contracts bane. Yeh purani positions nahi, abhi ka action dikhata hai.`,
      how: `Sort the chain by change in OI instead of total OI. The top additions tell where traders are committing now. Compare the share of the top strike in all additions on that side to see whether activity is concentrated. Note that additions at a deep OTM strike can be speculative and small in value, so also think in terms of rupee premium, not only contracts.`,
      eg: {
        title: 'Share of additions (illustrative lakh)',
        text: `Total call additions today are 12 lakh: 24,200 CE +3.5, 24,300 CE +2.1, 24,100 CE +1.5 and others +4.9. Share of 24,200 = 3.5 / 12 = 29.2%. About 30% of the day's new calls sit at a single strike, making 24,200 the focal point of new call activity.`,
      },
      tip: `Sort by change in OI, not by total OI, to see what is happening today.`,
      visual: {
        kind: 'bars',
        title: 'Call OI additions by strike (illustrative lakh)',
        unit: 'L',
        items: [
          { label: '24,200', value: 3.5, tone: 'bear' },
          { label: '24,300', value: 2.1, tone: 'bear' },
          { label: '24,100', value: 1.5, tone: 'bear' },
          { label: 'Others', value: 4.9, tone: 'neutral' },
        ],
      },
    },
    {
      t: 10,
      def: `Sudden OI unwinding is a rapid fall in OI at a strike, in a short window. It suggests positions are being closed fast, possibly under pressure. You must still check the cause before reading anything into it.`,
      hi: `Sudden OI unwinding kisi strike par thode time mein OI ka tezi se girna hai. Isse lagta hai ki positions jaldi band ho rahi hain, shaayad pressure mein. Kuch bhi padhne se pehle phir bhi wajah check karni zaroori hai.`,
      how: `Define a threshold for yourself, such as a fall of 15 to 20% in 15 minutes at a major strike. When it triggers, check the premium and index move (cover or liquidation), the neighbouring strikes (roll), IV and the VIX. A fast fall near the index price often appears when writers are stopped out together; a slow fall is typically profit booking. Both are probable readings only.`,
      eg: {
        title: '25% in ten minutes (illustrative)',
        text: `The 24,200 CE falls from 16 lakh to 12 lakh in ten minutes: 4 / 16 = 25%. NIFTY has just touched 24,195 and the premium jumped from ₹18 to ₹36. This pairing fits stressed covering. If the 24,300 CE OI had risen by about 4 lakh at the same time the likelier reading would be a roll.`,
      },
      tip: `Set a numeric threshold in advance so that you act on a rule, not on a feeling.`,
      visual: {
        kind: 'flow',
        title: 'When the unwinding alarm triggers',
        steps: [
          { label: 'Fall over threshold', note: 'For example 20% in 15 min', tone: 'gold' },
          { label: 'Check premium and index', note: 'Cover or liquidation', tone: 'ice' },
          { label: 'Check neighbours', note: 'Roll or broad exit', tone: 'neutral' },
          { label: 'Check VIX and IV', note: 'Stress or relief', tone: 'gold' },
        ],
      },
    },
    {
      t: 11,
      def: `IV is the volatility implied by option prices. When IV rises, premiums rise even if the index does not move; when it falls, premiums fall. Watching ATM IV through the day shows whether demand for options is growing or fading.`,
      hi: `IV woh volatility hai jo option prices se nikalti hai. IV badhe toh index na hile tab bhi premium badhta hai; IV gire toh premium girta hai. Din bhar ATM IV dekhne se pata chalta hai ki options ki demand badh rahi hai ya ghat rahi hai.`,
      how: `Track ATM IV at each snapshot and compare with the previous one. A rise in IV with rising OI and a rise in premium suggests buying demand; a fall in IV with rising OI suggests writing. Vega, the premium change per point of IV, converts the IV change to rupees. IV also tends to be higher at lower strikes (the skew), so compare the same strike with itself.`,
      eg: {
        title: 'IV from 13.5% to 15.0% (illustrative)',
        text: `For the ATM call with 2 days to expiry, vega is about ₹7.08 per IV point per unit. A rise of 1.5 points adds about 1.5 × 7.08 = ₹10.6 per unit, or about ₹690 per lot (65 units), with the index unchanged. A buyer's profit can come purely from this, and so can a writer's loss.`,
      },
      tip: `Compare IV of the same strike over time, not across strikes, and convert it to rupees with vega.`,
      visual: { kind: 'curve', title: 'Vega is largest near the money', curve: 'vega' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 2, iv: 13.5, rate: 6.5 }, why: 'Read vega, then change IV to 15 and compare prices.' },
    },
    {
      t: 12,
      def: `India VIX is NSE's volatility index. It shows the market's expected annualised volatility from NIFTY option prices, not the direction. Reading it with OI helps separate calm positioning from fear.`,
      hi: `India VIX NSE ka volatility index hai. Yeh NIFTY option prices se market ki expected annualised volatility dikhata hai, direction nahi. OI ke saath padhne par calm positioning aur fear mein farq samajhne mein madad milti hai.`,
      how: `VIX often rises when the index falls sharply and falls when the market is calm, but this is a tendency, not a rule. A rising VIX with rising put OI and a falling index is consistent with hedging demand. A rising VIX with a rising index can mean fear of missing out or event risk. Convert VIX into an expected move to judge whether the day's range is large or small for the level of VIX.`,
      eg: {
        title: 'VIX 14 to 15.4 (illustrative)',
        text: `VIX rises from 14.0 to 15.4, a 10% increase (1.4 / 14.0). The one-day one-sigma move changes from 24,000 × 0.14 × √(1/365) = about 176 points to 24,000 × 0.154 × √(1/365) = about 193 points. Put OI is rising and NIFTY is falling. Together these are consistent with hedging demand, but they do not guarantee that the fall extends.`,
      },
      tip: `VIX tells you how expensive options are and how big a move is expected, not which way.`,
      visual: {
        kind: 'gauge',
        title: 'India VIX reading (illustrative)',
        min: 8,
        max: 30,
        value: 15.4,
        unit: '',
        zones: [
          { from: 8, to: 13, label: 'Calm', tone: 'ice' },
          { from: 13, to: 18, label: 'Normal', tone: 'gold' },
          { from: 18, to: 30, label: 'Stressed', tone: 'bear' },
        ],
      },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 15.4, days: 1 }, why: 'One-day one-sigma move at VIX 15.4.' },
    },
  ],
}
export default m
