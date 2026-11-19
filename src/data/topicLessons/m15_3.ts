import type { ModuleLesson } from '../topicLessonTypes'

/* Module 15.3 — Strike Migration.
 * All OI figures are constructed for teaching (illustrative; lakh = 1,00,000 contracts or quantity, depending on the platform). NIFTY ≈ 24,000, lot 65, strike step 50 (check the actual strike list).
 * Expected move uses spot × VIX × sqrt(days/365). */
const m: ModuleLesson = {
  moduleId: '15.3',
  intro: `Strike migration is the movement of the strikes with the largest open interest over time. When the busiest call or put strike changes from 24,200 to 24,300, the market's reference level has shifted. This module shows how to track those shifts across minutes and days and how to read them without treating any OI level as a guarantee.`,
  introHi: `Strike migration ka matlab hai ki sabse zyada OI wale strikes time ke saath khisakte hain. Jab sabse busy call strike 24,200 se 24,300 ho jata hai, toh market ka reference level badal gaya. Is module mein minutes aur dinon mein in badlav ko track karna aur kisi bhi OI level ko guarantee maane bina padhna sikhaya gaya hai.`,
  steps: {
    concept: `The strike with the highest call OI is often read as the nearest resistance zone and the strike with the highest put OI as the nearest support zone. These zones are not fixed. As the index moves and writers adjust, the heavy strikes migrate. Following the migration shows how the market's expectation of a range is changing, which is more useful than a one-time snapshot.`,
    conceptHi: `Sabse zyada call OI wala strike aksar nearest resistance zone aur sabse zyada put OI wala strike nearest support zone maana jata hai. Yeh zones fixed nahi hote. Index chalne aur writers ke adjust karne se heavy strikes khisakte hain. Is migration ko follow karne se pata chalta hai ki market ka range expectation kaise badal raha hai, jo ek snapshot se zyada kaam ka hai.`,
    mechanism: `Heavy OI at a strike represents contracts that remain open. When the index nears or crosses it, the holders act: writers cover or roll, buyers book profit. Rolling creates OI at the next strike, so the peak migrates. Fresh writing in a new direction can also create a new peak. Migration is therefore the outcome of many closings and openings, and its direction (upwards for both strikes, downwards for both, or a narrowing range) summarises how participants are repositioning.`,
    example: {
      title: 'A three-day support migration (illustrative)',
      text: `Monday: NIFTY closes 23,950 and the highest put OI is at 23,800 (11.0 lakh), 150 points below. Tuesday: NIFTY 24,040, highest put OI at 23,900 (12.5 lakh), 140 points below. Wednesday: NIFTY 24,130, highest put OI at 24,000 (13.0 lakh), 130 points below. The support zone rose by 200 points in two days while spot rose by 180. That fits writers following the market up. A close below the new level with OI falling would signal the migration is reversing.`,
    },
    chart: {
      kind: 'timeline',
      title: 'Support migrating upward (highest put OI strike)',
      caption: 'Illustrative. The zone follows the market; it does not guarantee a floor.',
      events: [
        { when: 'Mon', what: 'Spot 23,950, top put OI 23,800 (11.0 lakh)', tone: 'neutral' },
        { when: 'Tue', what: 'Spot 24,040, top put OI 23,900 (12.5 lakh)', tone: 'gold' },
        { when: 'Wed', what: 'Spot 24,130, top put OI 24,000 (13.0 lakh)', tone: 'bull' },
      ],
    },
    optionChain: `Sort or scan the chain for the highest OI and the highest change in OI on each side, and keep a table with the time. Mark the highest call strike above spot and the highest put strike below spot. Do not compare OI levels of different expiries, and do not ignore strikes far from spot that have large legacy OI built in earlier weeks. The chain is also affected by rollover from the previous expiry.`,
    psychology: `Writers choose strikes where they feel comfortable. As the market moves, the comfort zone shifts, and so does the OI. Traders who watch the chain may then cluster their own entries and stops near the heavy strikes, which can reinforce the level for a while. Fear shows in rapid migration (writers running); calm shows in steady, small shifts.`,
    scenarios: {
      bullish: `Both call and put peaks move up. The market is trending up and writers are repositioning. If the call peak stays put while the put peak rises, the range is narrowing under a ceiling. A close above the call peak with falling call OI is a possible breakout.`,
      bearish: `Both peaks move down. Writers of calls are pulling the ceiling lower and put writers are retreating. If the put peak drops quickly with spot, support is being abandoned, not defended.`,
      sideways: `Peaks stay at the same strikes for days and OI at them grows. The market is being held in a range by positioning, but a range can break at any time on news.`,
    },
    practice: [
      {
        q: `Highest put OI strikes on three days are 23,800, 23,900 and 24,000. Spot is 23,950, 24,040 and 24,130. Compute the distance from spot to the put peak each day and how far the zone moved overall.`,
        a: `Distances: 23,950 − 23,800 = 150; 24,040 − 23,900 = 140; 24,130 − 24,000 = 130. The put peak moved from 23,800 to 24,000, a rise of 200 points, while spot rose 180 points.`,
      },
      {
        q: `Spot is 24,070 and the strike step is 50. What is the ATM strike? What if spot becomes 24,130?`,
        a: `24,070 / 50 = 481.4, nearest strike = 481 × 50 = 24,050. At 24,130: 24,130 / 50 = 482.6, nearest = 483 × 50 = 24,150. The ATM migrated by 100 points.`,
      },
      {
        q: `Total call OI is 80 lakh, with 20 lakh at 24,200. Later the total is 90 lakh, with 31.5 lakh at 24,200. Compute the concentration at each time.`,
        a: `Before: 20 / 80 = 25%. After: 31.5 / 90 = 35%. Concentration at 24,200 rose by 10 percentage points, which makes it a more important reference level, but not a guaranteed ceiling.`,
      },
    ],
    assignment: `For five trading days, note each day at 11:00 and 15:00 the strike with the highest call OI above spot, the highest put OI below spot, and the ATM strike. Build a small table and draw the three lines against the day's high and low. Write what the migration said at 11:00 and whether it held by the close.`,
  },
  topics: [
    {
      t: 1,
      def: `Call OI shifting upward means the strike with the most call open interest moves to a higher strike, for example from 24,200 to 24,300. It suggests the market's perceived ceiling has risen. It may follow a rally or a roll of short calls to higher strikes.`,
      hi: `Call OI upar shift hone ka matlab hai ki sabse zyada call OI wala strike ooncha ho gaya, jaise 24,200 se 24,300. Isse lagta hai ki market ka perceived ceiling upar chala gaya hai. Yeh rally ke baad ya short calls ke upar roll hone se ho sakta hai.`,
      how: `As the index climbs towards a call-heavy strike, writers face losses. Some cover, and some roll up by buying the old call and selling the next strike. The old peak shrinks and the new strike gains OI. The shift also appears when fresh writers prefer a higher strike after a rally. It does not mean that the index will reach the new level; it says where writers are willing to hold risk now.`,
      eg: {
        title: 'Call peak 24,200 to 24,300 (illustrative)',
        text: `In a week NIFTY goes from 24,000 to 24,180. The highest call OI moves from 24,200 (14 lakh) to 24,300 (12.8 lakh), with 24,200 falling to 9 lakh. The ceiling zone rose by 100 points while spot rose 180. A rise in the 24,300 CE premium while OI falls would suggest stress instead.`,
      },
      tip: `An upward call shift says writers have moved their risk limit up; check whether put OI is also rising before calling it bullish.`,
      visual: {
        kind: 'oi',
        title: 'Call peak moving from 24,200 to 24,300 (illustrative lakh)',
        spot: 24180,
        rows: [
          { strike: 24100, ce: 6, pe: 7 },
          { strike: 24200, ce: 9, pe: 4 },
          { strike: 24300, ce: 12.8, pe: 3 },
          { strike: 24400, ce: 8, pe: 2 },
        ],
      },
    },
    {
      t: 2,
      def: `Call OI shifting downward means the heaviest call strike moves to a lower strike, such as from 24,300 to 24,200. The ceiling the writers accept has fallen. It often appears in a weakening market or when writers become more cautious.`,
      hi: `Call OI neeche shift hone ka matlab hai ki sabse heavy call strike neeche ke strike par aa gaya, jaise 24,300 se 24,200. Writers jo ceiling accept kar rahe hain woh gir gayi. Yeh kamzor hote market mein ya writers ke zyada savdhan hone par dikhta hai.`,
      how: `If the index weakens, far OTM calls lose value and some writers cover them cheaply, while fresh writers come in at a nearer strike to collect meaningful premium. The new peak then sits lower. It is also common as expiry nears, since the strikes with the real chance of finishing in the money become fewer. The shift does not predict a further fall, but it shows that writers see less upside.`,
      eg: {
        title: 'Call peak 24,300 to 24,200 (illustrative)',
        text: `NIFTY slips from 24,150 to 24,050 over two days. The highest call OI moves from 24,300 (13 lakh) to 24,200 (14.5 lakh) as the 24,300 CE premium drops from ₹30 to ₹17 and writers add nearer strikes. A rise in the index back above 24,200 with falling OI would reverse the story.`,
      },
      tip: `A falling call peak shows lower-risk appetite on the upside, not a certain fall.`,
      visual: { kind: 'candles', title: 'Fading index with a lower call ceiling', pattern: 'downtrend', level: { price: 24200, label: 'New call OI peak' } },
    },
    {
      t: 3,
      def: `Put OI shifting upward means the strike with the highest put OI moves to a higher strike, such as 23,800 to 23,900. The level where put writers feel safe has risen with the market. It is commonly seen in an uptrend.`,
      hi: `Put OI upar shift hone ka matlab hai ki sabse zyada put OI wala strike upar chala gaya, jaise 23,800 se 23,900. Jahan put writers khud ko safe samajhte hain woh level market ke saath upar aa gaya. Yeh aksar uptrend mein dikhta hai.`,
      how: `As the index rises, lower puts lose value and writers sell puts at higher strikes where the premium is worth the risk. The put peak climbs. It can also happen when buyers of a hedge reduce protection at old strikes and add it nearer. The shift tells you that people are willing to commit nearer to the market, not that they cannot be wrong.`,
      eg: {
        title: 'Put peak 23,800 to 23,900 (illustrative)',
        text: `NIFTY rises from 23,950 to 24,040. Put OI at 23,900 grows from 8 lakh to 12.5 lakh while 23,800 stays near 11 lakh. The put peak has moved up 100 points. If spot falls under 23,900 and the put premium jumps, writers there will be under pressure.`,
      },
      tip: `A rising put peak lifts the zone of interest, but a fast fall through it can trigger covering and extend the move.`,
      visual: {
        kind: 'bars',
        title: 'Put OI by strike, two days apart (illustrative lakh)',
        unit: 'L',
        items: [
          { label: '23,800 (day 1)', value: 11, tone: 'bull' },
          { label: '23,900 (day 1)', value: 8, tone: 'bull' },
          { label: '23,800 (day 3)', value: 11, tone: 'ice' },
          { label: '23,900 (day 3)', value: 12.5, tone: 'ice' },
        ],
      },
    },
    {
      t: 4,
      def: `Put OI shifting downward means the heaviest put strike moves lower, such as 23,900 to 23,800. Put writers are keeping a wider distance, or the lower strike has gained new protection. It tends to follow falling or uncertain markets.`,
      hi: `Put OI neeche shift hone ka matlab hai ki sabse heavy put strike neeche chala gaya, jaise 23,900 se 23,800. Put writers zyada doori rakh rahe hain, ya neeche ke strike par naya protection aa gaya. Yeh gire hue ya uncertain market ke baad dikhta hai.`,
      how: `If the index falls, writers of the upper puts are in trouble. They cover or roll down, and the new peak forms lower. Buyers also purchase puts at lower strikes for cheaper protection. The result is that the heavy put strike sits further from spot. A bigger gap between spot and the put peak means there is less nearby OI to act as a reference.`,
      eg: {
        title: 'Put peak 23,900 to 23,800 (illustrative)',
        text: `NIFTY drops from 24,000 to 23,880. The put peak moves from 23,900 (12 lakh) to 23,800 (13.5 lakh) and the 23,900 PE premium jumps from ₹40 to ₹68. The put reference is 80 points below spot, but the level above it has been given up.`,
      },
      tip: `When the put peak falls with the market, the old support has already been tested; do not keep quoting it.`,
      visual: { kind: 'candles', title: 'Breakdown and a lower put peak', pattern: 'breakdown', level: { price: 23800, label: 'New put OI peak' } },
    },
    {
      t: 5,
      def: `Support migration is the movement of the OI-based support zone over time. It is tracked by the strike with the highest put OI, or a band of high put strikes. It shows how the level of market comfort is shifting.`,
      hi: `Support migration matlab OI-based support zone ka time ke saath khisakna. Ise sabse zyada put OI wale strike ya high put strikes ke band se track karte hain. Yeh dikhata hai ki market ka comfort level kaise badal raha hai.`,
      how: `Use the same time-stamp each day, such as 11:00, and record the top put strike. Plot it against spot. A zone that rises with spot is dynamic support; one that stays fixed while spot moves away is static. Because OI support is not a price level that the exchange defends, price can break through, and then the support can swing into resistance as old writers become nervous.`,
      eg: {
        title: 'Support rising with spot (illustrative)',
        text: `Mon 23,800 (11.0 lakh), Tue 23,900 (12.5 lakh), Wed 24,000 (13.0 lakh). Spot 23,950, 24,040, 24,130. Gap to spot: 150, 140, 130. The zone rose 200 points while spot rose 180, so the market has stayed above the support throughout. If Thursday opens at 23,980 with the 24,000 PE premium jumping, the support is under test.`,
      },
      tip: `Support is a zone built from positions, not a promise; keep your own stop outside it.`,
      visual: {
        kind: 'timeline',
        title: 'Support migration log',
        events: [
          { when: 'Mon', what: '23,800 | 11.0 lakh | gap 150', tone: 'neutral' },
          { when: 'Tue', what: '23,900 | 12.5 lakh | gap 140', tone: 'gold' },
          { when: 'Wed', what: '24,000 | 13.0 lakh | gap 130', tone: 'bull' },
        ],
      },
      calc: { id: 'moneyness', preset: { optType: 'PE', spot: 24130, strike: 24000 }, why: 'Shows how far the put peak is out of the money.' },
    },
    {
      t: 6,
      def: `Resistance migration is the movement of the OI-based resistance zone, measured by the heaviest call strike or a band of call strikes. If the zone drops, the writers see a lower ceiling; if it rises, they accept a higher one.`,
      hi: `Resistance migration matlab OI-based resistance zone ka khisakna, jo sabse heavy call strike ya call strikes ke band se napa jata hai. Zone neeche aaye toh writers ko lower ceiling dikhta hai; upar jaye toh woh higher ceiling accept karte hain.`,
      how: `Track the top call strike at the same time each day and watch the gap to spot. A shrinking gap with rising OI means writers are defending a nearby level. A shrinking gap with falling OI means writers are covering, and the level may fail. An index that has stayed below a resistance zone for several days has a better-defined range, but a news shock can break it.`,
      eg: {
        title: 'Resistance falling with spot (illustrative)',
        text: `Mon top call strike 24,300 (13 lakh), Tue 24,200 (14.5 lakh), Wed 24,150 (12.0 lakh). Spot 24,150, 24,050, 24,020. Gap to spot: 150, 150, 130. The ceiling has moved down 150 points in three days. A close above 24,150 with the OI falling would be a possible sign of covering.`,
      },
      tip: `A resistance zone that moves lower as price falls is following price; it is not forecasting it.`,
      visual: {
        kind: 'oi',
        title: 'Resistance zone dropping to 24,150 (illustrative lakh)',
        spot: 24020,
        rows: [
          { strike: 24000, ce: 7, pe: 10 },
          { strike: 24100, ce: 9, pe: 5 },
          { strike: 24150, ce: 12, pe: 3 },
          { strike: 24200, ce: 8, pe: 2 },
        ],
      },
    },
    {
      t: 7,
      def: `ATM migration is the shift of the at-the-money strike as the index moves. It is not a view but a reference point: the ATM strike has the highest gamma and its straddle price shows the expected move. Many traders and market makers hedge around it.`,
      hi: `ATM migration matlab index ke chalne par at-the-money strike ka badalna. Yeh view nahi, ek reference point hai: ATM strike par gamma sabse zyada hota hai aur uska straddle price expected move dikhata hai. Kai traders aur market makers isi ke aas-paas hedge karte hain.`,
      how: `The ATM strike is the strike nearest to spot, for NIFTY normally a multiple of 50 near the money. When spot crosses the midpoint between two strikes, the ATM changes. The OI at the new ATM may be small at first and grow as traders reposition. Pin-like behaviour is sometimes seen on expiry day when heavy OI at a strike coincides with the ATM, but that is an observation, not a rule.`,
      eg: {
        title: 'ATM changing from 24,050 to 24,150 (illustrative)',
        text: `At spot 24,070 with step 50, the ATM is 24,050 (24,070 / 50 = 481.4). When spot is 24,130 (24,130 / 50 = 482.6) the ATM is 24,150. The ATM moved by 100 points in an hour, and any straddle you track must be re-struck at the new ATM.`,
      },
      tip: `Update the ATM strike whenever spot moves by half a strike step, or your straddle comparison will be stale.`,
      visual: {
        kind: 'ladder',
        title: 'ATM strike at spot 24,070',
        optType: 'CE',
        spot: 24070,
        strikes: [23950, 24000, 24050, 24100, 24150],
      },
      calc: { id: 'moneyness', preset: { optType: 'CE', spot: 24130, strike: 24150 }, why: 'Distance of the ATM strike from spot.' },
    },
    {
      t: 8,
      def: `OI concentration is how much of the total open interest sits in a few strikes. High concentration makes those strikes more important reference levels. A change in concentration shows whether positioning is getting sharper or more spread out.`,
      hi: `OI concentration matlab total open interest ka kitna hissa kuch hi strikes par hai. Concentration zyada ho toh woh strikes zyada important reference level ban jaate hain. Concentration ka change dikhata hai ki positioning tez ho rahi hai ya failti ja rahi hai.`,
      how: `Compute the share of the top strike or the top three strikes in total call OI and put OI. A rising share with growing absolute OI means traders are crowding into the same level. A falling share means participants are spreading out or exiting. Remember that near expiry, OI concentrates naturally in the strikes that still matter. Also compare the same expiry, as the next series is thinner at first.`,
      eg: {
        title: 'Concentration rises from 25% to 35% (illustrative)',
        text: `Total call OI is 80 lakh with 20 lakh at 24,200 (25%). Later the total is 90 lakh with 31.5 lakh at 24,200 (31.5 / 90 = 35%). The share rose by 10 percentage points and 24,200 became more of a focus. That raises its relevance as a reference level, and also the risk of sharp moves if it breaks.`,
      },
      tip: `Concentration at a strike raises its importance, not its reliability.`,
      visual: {
        kind: 'bars',
        title: 'Share of total call OI at 24,200 (illustrative)',
        unit: '%',
        items: [
          { label: 'Earlier', value: 25, tone: 'neutral' },
          { label: 'Later', value: 35, tone: 'gold' },
        ],
      },
      calc: { id: 'return-calc', preset: { start: 25, end: 35, years: 1 }, why: 'Change in concentration (25% to 35%) as a relative rise.' },
    },
    {
      t: 9,
      def: `Tracking the strongest nearby strikes means keeping a short list of the highest-OI strikes within a reasonable distance of spot on each side. The list is a map of where positions sit. Strikes far from spot rarely matter for the day.`,
      hi: `Strongest nearby strikes track karna matlab spot ke paas ke har side ke highest-OI strikes ki ek chhoti list rakhna. Yeh list dikhati hai ki positions kahan baithi hain. Spot se bahut door ke strikes us din shaayad hi matter karte hain.`,
      how: `Limit the window to about 2 to 3 per cent of spot, or the day's expected move multiplied by two. Rank calls above and puts below. Also add the change in OI so that old legacy OI does not hide new action. Max Pain, the strike where option buyers would lose the most at expiry, is sometimes quoted too, but it is a calculation from OI and not a target price, so treat it as extra context.`,
      eg: {
        title: 'Ranking a strip (illustrative, lakh)',
        text: `OI strip: 23,800 (CE 3, PE 12), 23,900 (4, 10), 24,000 (8, 11), 24,100 (11, 6), 24,200 (15, 3). Strongest calls above spot: 24,200, then 24,100. Strongest puts at or below spot: 23,800, then 24,000. Using these numbers the Max Pain calculation gives 24,000, where the total payout is lowest, but this is a mathematical output, not a forecast.`,
      },
      tip: `Keep your strike list short and time-stamped; a long list is just the whole chain.`,
      visual: {
        kind: 'oi',
        title: 'Strip used for ranking (illustrative lakh)',
        spot: 24000,
        rows: [
          { strike: 23800, ce: 3, pe: 12 },
          { strike: 23900, ce: 4, pe: 10 },
          { strike: 24000, ce: 8, pe: 11 },
          { strike: 24100, ce: 11, pe: 6 },
          { strike: 24200, ce: 15, pe: 3 },
        ],
      },
      calc: { id: 'max-pain', preset: { strip: '23800:3:12;23900:4:10;24000:8:11;24100:11:6;24200:15:3' }, why: 'Max Pain is a calculation from OI, not a price target.' },
    },
    {
      t: 10,
      def: `Changing market expectations are what migration tells you in summary: whether the market is expecting a higher range, a lower range or a narrower one. It is a reading of positioning, not a prediction of price.`,
      hi: `Badalti market expectations woh hain jo migration aapko summary mein batati hai: market higher range, lower range ya narrow range expect kar raha hai. Yeh positioning ki reading hai, price ki prediction nahi.`,
      how: `Compare the zone between the put peak and the call peak with the expected move from implied volatility. If the OI zone is narrower than the volatility-implied range, positioning is more confident than the options price; if wider, it is more cautious. Watch the width and the centre of the zone daily. Add India VIX, because VIX is an expectation of volatility, not direction.`,
      eg: {
        title: 'Zone width against the expected move (illustrative)',
        text: `On Monday the zone is 23,800 to 24,200 (400 points wide). By Wednesday it is 23,900 to 24,200 (300 points wide). With VIX at 14 the one-standard-deviation move over 2 days is 24,000 × 0.14 × √(2/365) ≈ 249 points, so the one-sigma range is about 498 points wide. The OI zone is narrower than the implied range, which means positioning is clustered tighter than the price of options suggests. It may be a range, or it may be a stretched spring.`,
      },
      tip: `Compare the OI zone with the implied move; a tight zone with a wide implied move is a warning, not comfort.`,
      visual: {
        kind: 'bars',
        title: 'Width of range (points)',
        unit: ' pts',
        items: [
          { label: 'OI zone Monday', value: 400, tone: 'neutral' },
          { label: 'OI zone Wednesday', value: 300, tone: 'gold' },
          { label: '2-day 1-sigma range (VIX 14)', value: 498, tone: 'ice' },
        ],
      },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 2 }, why: 'One-sigma move from VIX.' },
    },
  ],
}
export default m
