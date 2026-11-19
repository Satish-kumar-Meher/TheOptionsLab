import type { ModuleLesson } from '../topicLessonTypes'

/* Module 15.4 — Dynamic Support and Resistance.
 * All OI figures and index moves are constructed for teaching (illustrative; lakh = 1,00,000). NIFTY ≈ 24,000, lot 65, strike step 50 (check the actual strike list).
 * Pivot levels: classic floor pivots from the previous day's H/L/C. */
const m: ModuleLesson = {
  moduleId: '15.4',
  intro: `Option-chain support and resistance are zones where large open interest sits. Some of these zones are old and fixed (static), others are built and changed during the day (dynamic). This module teaches how to tell them apart, how to see a zone strengthen or weaken, and how to judge whether price accepts or rejects a level. No OI level is a guaranteed barrier.`,
  introHi: `Option chain ke support aur resistance woh zones hain jahan bada open interest baitha hota hai. Kuch zones purane aur fixed (static) hote hain, kuch din bhar ban-badal (dynamic) hote hain. Is module mein dono ka farq, zone kab strong ya weak hota hai, aur price level ko accept ya reject kar rahi hai yeh kaise judge karein, yeh sikhaya gaya hai. Koi bhi OI level guaranteed barrier nahi hota.`,
  steps: {
    concept: `High OI at a put strike below the market is read as a possible support zone and high OI at a call strike above as a possible resistance zone. The idea is that writers at the strike have a reason to defend it, and that their hedging can make price slow down there. But writers can also give up, and hedgers hold the other side. OI marks a place where something may happen; it never promises a bounce.`,
    conceptHi: `Market ke neeche put strike par high OI ko possible support zone aur upar call strike par high OI ko possible resistance zone maana jata hai. Idea yeh hai ki us strike par writers ke paas defend karne ka reason hota hai aur unka hedging price ko slow kar sakta hai. Lekin writers haar maan sakte hain, aur doosri side par hedgers hote hain. OI woh jagah batata hai jahan kuch ho sakta hai; bounce ka wada nahi karta.`,
    mechanism: `Static OI is old OI at far strikes that has built over weeks and changes slowly; it matters mainly as context. Dynamic OI is built near spot and changes through the day; it matters for the trading session. A zone is stronger when OI grows, when the OI sits in a cluster of strikes, and when price is tested and holds. It is weaker when OI falls as price approaches or when price closes beyond it and stays there. Price decides in the end: acceptance beyond a level means the level has failed.`,
    example: {
      title: 'Support tested and held, then weakened (illustrative)',
      text: `Morning: 24,000 PE OI is 10 lakh. By noon it rises to 13 lakh (+30%) as NIFTY dips to 24,010 and bounces 60 points: support strengthened. By 2:30 pm the OI falls to 9.1 lakh (−30%) as NIFTY slides from 24,040 to 24,005: the writers are leaving. A close below 24,000 with the OI still falling would show the zone has failed and that old put writers may be covering.`,
    },
    chart: {
      kind: 'oi',
      title: 'A static and a dynamic zone (illustrative lakh)',
      caption: 'Large old OI far below (static) and a nearer, recently built cluster (dynamic).',
      spot: 24050,
      rows: [
        { strike: 23500, ce: 2, pe: 25 },
        { strike: 23800, ce: 3, pe: 12 },
        { strike: 23900, ce: 4, pe: 11 },
        { strike: 24000, ce: 9, pe: 13 },
        { strike: 24200, ce: 15, pe: 3 },
        { strike: 24500, ce: 22, pe: 1 },
      ],
    },
    optionChain: `Read the chain in two views: total OI for the static map and the change in OI since the open for the dynamic map. A strike with large OI and a negative change is losing defenders; a strike with large OI and a positive change is gaining them. Look at three strikes together, not one. Make a note of the time, because dynamic zones change within hours.`,
    psychology: `Writers defend because losing the strike costs real money, so they may add or hedge. Buyers who bought puts below a market have an incentive for price to fall through it. When a level breaks, the pain is shared by both sides: writers rush to cover, and buyers rush to take profit. This explains why moves are often quick once a heavy strike is crossed. It is not guaranteed; sometimes writers absorb the pressure and price returns.`,
    scenarios: {
      bullish: `Price pulls back to a put zone whose OI is rising and bounces. The zone gains credibility. If it then pushes through the nearest call zone with call OI falling, the old resistance becomes a possible support.`,
      bearish: `Price falls into a put zone whose OI is falling and closes below it. The zone is abandoned and the next lower zone matters. If call OI is rising just above, the market may be capped.`,
      sideways: `Price oscillates between a put zone and a call zone, both with steady or rising OI. The range may persist, but keep a stop outside it because an event can break it quickly.`,
    },
    practice: [
      {
        q: `Spot is 24,000. A static put OI of 25 lakh sits at 23,500 and a static call OI of 22 lakh at 24,500. What percent distance is each from spot?`,
        a: `500 / 24,000 = 2.08% on each side. Both are fairly far from the market and matter for background rather than for the day's trade.`,
      },
      {
        q: `24,200 CE OI goes from 12 lakh to 15 lakh while the index makes a high of 24,195 and falls 70 points. Compute the OI change and describe the reading.`,
        a: `Change = 3 / 12 = +25%. OI grew into the test and price was rejected near the strike, consistent with strengthening resistance. Not guaranteed: a later close above 24,200 would invalidate it.`,
      },
      {
        q: `Previous day's H = 24,180, L = 23,940, C = 24,050. Compute the pivot and S1 and compare S1 with the put OI at 23,900.`,
        a: `Pivot = (24,180 + 23,940 + 24,050) / 3 = 24,056.7. S1 = 2 × 24,056.7 − 24,180 = 23,933.3. S1 is 33 points above the 23,900 PE strike, so the two levels are in the same area, which adds weight to that zone. Still not a guarantee.`,
      },
    ],
    assignment: `On three different days, mark at 9:30 the largest put strike below and call strike above, and note whether each is static (large before today) or dynamic (large change today). At 3:00 pm check whether price respected, rejected or accepted beyond each. Write how the dynamic zones behaved compared with the static ones.`,
  },
  topics: [
    {
      t: 1,
      def: `Static OI support is a large put OI at a strike that has been built over many sessions and changes slowly. It often sits at a round strike below the market. It gives background context rather than a precise trading level.`,
      hi: `Static OI support ek bada put OI hota hai jo kai sessions mein ban chuka hota hai aur dheere badalta hai. Yeh aksar market ke neeche kisi round strike par hota hai. Yeh background context deta hai, exact trading level nahi.`,
      how: `Large put OI at a far strike like 23,500 accumulates because the strike is cheap for writers and attractive for hedgers. It does not move with each day's price. Its influence grows only when price comes close to it. Because it is far, the premium of the 23,500 put is small, and the writers there are not under pressure unless the market falls fast. Treat it as the outer boundary of what market participants have prepared for.`,
      eg: {
        title: 'The 23,500 PE (illustrative)',
        text: `With NIFTY at 24,000, the 23,500 PE holds 25 lakh OI, the highest on the put side. The strike is 500 points or 2.08% below spot. It tells you where large put positions exist but, at that distance, not where a one-day move will stop.`,
      },
      tip: `A big OI far from spot is context, not a trading signal; nearer, newer OI is what shapes the day.`,
      visual: {
        kind: 'bars',
        title: 'Distance of static levels from spot 24,000',
        unit: ' pts',
        items: [
          { label: 'Static put 23,500', value: 500, tone: 'bull' },
          { label: 'Static call 24,500', value: 500, tone: 'bear' },
        ],
      },
      calc: { id: 'moneyness', preset: { optType: 'PE', spot: 24000, strike: 23500 }, why: 'Distance of the static put strike from spot.' },
    },
    {
      t: 2,
      def: `Dynamic OI support is a put OI zone that is built, grown or cut during the trading session near the index. It changes with price and time. It describes what traders are doing now.`,
      hi: `Dynamic OI support woh put OI zone hai jo trading session ke dauran index ke paas ban raha hai, badh raha hai ya kat raha hai. Yeh price aur time ke saath badalta hai. Yeh dikhata hai ki traders abhi kya kar rahe hain.`,
      how: `Use the change in OI since the open for strikes within about 100 to 200 points below spot. Rising put OI near spot, with a premium that stays low as the index holds, suggests writers are comfortable. Falling OI as the index approaches the strike suggests the opposite. Dynamic support can disappear within the hour, so refresh the data often and do not hold a view that the chain no longer supports.`,
      eg: {
        title: '23,900 PE builds (illustrative)',
        text: `At 9:30 the 23,900 PE OI is 7 lakh. At 1:30 pm it is 10.5 lakh, an increase of 3.5 lakh or 50%, while NIFTY holds above 24,000. New writers are choosing that strike. If it drops back to 8 lakh by 3:00 pm while the index drifts lower, the support has been withdrawn.`,
      },
      tip: `Dynamic support is only as good as the last snapshot; use change in OI, not just total OI.`,
      visual: {
        kind: 'timeline',
        title: 'A dynamic support zone through the day',
        events: [
          { when: '9:30', what: '23,900 PE OI 7 lakh', tone: 'neutral' },
          { when: '1:30', what: 'OI 10.5 lakh (+50%), index above 24,000', tone: 'bull' },
          { when: '3:00', what: 'OI back at 8 lakh as the index slips', tone: 'bear' },
        ],
      },
    },
    {
      t: 3,
      def: `Static OI resistance is a large call OI at a strike built over many sessions, often at a round level above the market. Like static support it is background context. It matters most when price actually reaches it.`,
      hi: `Static OI resistance ek bada call OI hota hai jo kai sessions mein bana hota hai, aksar market ke upar kisi round level par. Static support ki tarah yeh background context hai. Yeh tab sabse zyada matter karta hai jab price sach mein wahan pahunchti hai.`,
      how: `Calls at 24,500 are cheap, so many writers sell them for small premium. Over weeks the OI builds. It tells you that many participants did not expect a close above that level when they wrote, which may or may not still hold. If the market approaches it quickly, writers face rapid losses and the level can fail dramatically. If it approaches slowly with time decay running, the writers may stay safe.`,
      eg: {
        title: 'The 24,500 CE (illustrative)',
        text: `With NIFTY at 24,000 the 24,500 CE holds 22 lakh OI, the largest on the call side. It is 500 points or 2.08% above spot. If NIFTY rallies 400 points in a week, those writers come under pressure and the OI may drop as they cover.`,
      },
      tip: `Large call OI is a place where writers could lose, not a ceiling the market must respect.`,
      visual: { kind: 'candles', title: 'Price approaching a heavy call strike', pattern: 'uptrend', level: { price: 24500, label: 'Static call OI 24,500' } },
    },
    {
      t: 4,
      def: `Dynamic OI resistance is a call OI zone built or changed during the session close to the index. It shows where writers are adding or cutting near the market right now.`,
      hi: `Dynamic OI resistance woh call OI zone hai jo session ke dauran index ke paas bana ya badla hai. Yeh dikhata hai ki abhi market ke paas writers kahan add ya cut kar rahe hain.`,
      how: `Look at the change in call OI at strikes 100 to 200 points above spot. A strong rise in OI together with falling premium suggests fresh writing at a nearby ceiling. A fall suggests writers leaving or covering. Dynamic resistance may shift upward on strong days. Compare it with the day's highs: if price has already rejected from that strike once, the zone has more evidence behind it.`,
      eg: {
        title: '24,150 CE builds (illustrative)',
        text: `At 9:30 the 24,150 CE OI is 6 lakh; by noon it is 9.3 lakh, a gain of 3.3 lakh or 55%. NIFTY touches 24,145 twice and pulls back 40 points each time. The ceiling at 24,150 has been tested and held so far; a close above with falling OI would end it.`,
      },
      tip: `A nearby call OI that grows while price is rejected there is more credible than the same OI with no test.`,
      visual: {
        kind: 'oi',
        title: 'Dynamic call cluster near the market (illustrative lakh)',
        spot: 24100,
        rows: [
          { strike: 24050, ce: 5, pe: 6 },
          { strike: 24100, ce: 7, pe: 5 },
          { strike: 24150, ce: 9.3, pe: 3 },
          { strike: 24200, ce: 8, pe: 2 },
        ],
      },
    },
    {
      t: 5,
      def: `Support strengthening is when the put OI at a support zone rises and the price holds near it. More writers are committing to the level. It makes the zone more significant, though still not certain.`,
      hi: `Support strengthening matlab support zone par put OI badh raha hai aur price uske paas tik rahi hai. Zyada writers us level par commitment kar rahe hain. Isse zone zyada significant hota hai, par phir bhi certain nahi.`,
      how: `Signs of strengthening: put OI rising at the strike and its neighbours, the put premium falling or flat as the index tests the strike, price bouncing on the test, and a rising total put OI on the day. Together these show that new writers and hedgers accept the risk at the level. Still check that the call side is not also rising at the same strike, which would make it a battleground rather than a floor.`,
      eg: {
        title: '24,000 PE strengthens (illustrative)',
        text: `24,000 PE OI goes from 10 lakh to 13 lakh (+30%). NIFTY dips to 24,010 and bounces 60 points to 24,070. Put premium at the low was ₹28 and is ₹19 after the bounce. These pieces fit a strengthening support. An hour later a break below 24,000 on rising volume would show it was not enough.`,
      },
      tip: `Look for a rise in OI and a successful test; OI without a test is only a claim.`,
      visual: {
        kind: 'flow',
        title: 'Signs of strengthening support',
        steps: [
          { label: 'Put OI rises', note: 'At the strike and neighbours', tone: 'bull' },
          { label: 'Price tests', note: 'Index dips to the strike', tone: 'gold' },
          { label: 'Bounce', note: 'Rejected from below', tone: 'bull' },
          { label: 'Premium eases', note: 'Writers comfortable', tone: 'ice' },
        ],
      },
      calc: { id: 'pcr', preset: { putOI: 1300000, callOI: 1100000, putVol: 2000000, callVol: 1900000 }, why: 'Put/call OI ratio at the zone.' },
    },
    {
      t: 6,
      def: `Support weakening is when put OI at the support zone falls as price approaches it, or when price closes below it and stays there. Defenders are leaving. The zone is less likely to hold.`,
      hi: `Support weakening matlab support zone par put OI gir raha hai jab price uske paas aa rahi hai, ya price uske neeche close hokar wahan tik jaati hai. Defenders nikal rahe hain. Zone ke tikne ki sambhavna kam ho jati hai.`,
      how: `Writers who are losing may buy back their puts, which removes OI and raises the put premium. Buyers may also sell to take profit. A falling OI together with a rising put premium as price approaches shows the covering. After a clean break, an old support can turn into a resistance zone because writers who were trapped may sell the index on a bounce to reduce losses. This is a possibility, not a rule.`,
      eg: {
        title: '24,000 PE weakens (illustrative)',
        text: `24,000 PE OI falls from 13 lakh to 9.1 lakh (−30%) between noon and 2:30 pm. NIFTY slides from 24,040 to 24,005 and the put premium goes up from ₹19 to ₹33. The defenders are leaving while the price comes in. A close below 24,000 would confirm that the old support is not working.`,
      },
      tip: `If OI at support falls while price approaches, do not rely on that support.`,
      visual: { kind: 'candles', title: 'Support giving way', pattern: 'breakdown', level: { price: 24000, label: 'Put OI zone 24,000' } },
    },
    {
      t: 7,
      def: `Resistance strengthening is when call OI at the resistance zone rises and the price is rejected near it. More writers are committing to the ceiling. It increases the importance of that zone but does not guarantee the rejection.`,
      hi: `Resistance strengthening matlab resistance zone par call OI badh raha hai aur price wahan se reject ho rahi hai. Zyada writers ceiling par commitment kar rahe hain. Isse us zone ki importance badhti hai, par rejection guaranteed nahi hoti.`,
      how: `The pattern is rising call OI at the strike and neighbours, a call premium that stays low as the index approaches, and a rejection candle with a long upper wick. A volume surge at the rejection helps. As expiry draws near, time decay helps the writers, so strengthening zones near expiry are more likely to hold in a quiet market, but a gap or news move can still go through them.`,
      eg: {
        title: '24,200 CE strengthens (illustrative)',
        text: `24,200 CE OI goes from 12 lakh to 15 lakh (+25%). NIFTY makes a high of 24,195 and falls 70 points to 24,125. Premium of the 24,200 CE falls from ₹22 to ₹11. This is consistent with a strengthening ceiling. A close above 24,200 would show it failed.`,
      },
      tip: `A rejection with rising OI is a stronger sign than OI alone: both are needed.`,
      visual: { kind: 'candles', title: 'Rejection at a heavy call strike', pattern: 'falseBreakout', level: { price: 24200, label: 'Call OI zone 24,200' } },
    },
    {
      t: 8,
      def: `Resistance weakening is when call OI at the resistance zone falls as price approaches, or price closes above it. Writers are covering or rolling. The zone is less likely to hold.`,
      hi: `Resistance weakening matlab resistance zone par call OI gir raha hai jab price paas aa rahi hai, ya price uske upar close ho jaati hai. Writers cover ya roll kar rahe hain. Zone ke tikne ki sambhavna kam ho jati hai.`,
      how: `Call writers who are losing buy back the calls, which removes OI and lifts the call premium. Some roll up, so OI appears at the next strike. A close above the zone for two or more candles, with falling OI, signals acceptance above. The old resistance may then behave as support on a retest, but that is again a pattern, not a law. Check the put side: rising put OI under the new price strengthens the case.`,
      eg: {
        title: '24,200 CE weakens (illustrative)',
        text: `24,200 CE OI falls from 15 lakh to 10.5 lakh (−30%) while NIFTY closes at 24,215 and the call premium rises from ₹11 to ₹38. The ceiling at 24,200 is being given up. The 24,300 CE OI rises by 2 lakh, hinting at some rolling. A fall back below 24,200 with OI rebuilt would void it.`,
      },
      tip: `Falling call OI plus a close above the strike is a weakening ceiling; falling OI alone is not enough.`,
      visual: { kind: 'candles', title: 'Breakout through a heavy call strike', pattern: 'breakout', level: { price: 24200, label: 'Call OI zone 24,200' } },
    },
    {
      t: 9,
      def: `Multiple strike confirmation means checking that several strikes in a band show the same story, and that other tools agree, before trusting a zone. One strike can be a single large trader or a spread. A band, plus a price-based level, is stronger evidence.`,
      hi: `Multiple strike confirmation matlab bharosa karne se pehle yeh dekhna ki band ke kai strikes ek hi kahani bata rahe hain aur doosre tools bhi sehmat hain. Ek strike ek bade trader ya spread ki wajah se ho sakta hai. Poora band aur ek price-based level milke zyada strong evidence dete hain.`,
      how: `Add up OI across three adjacent strikes. Compare the band with a price-based level such as the previous day's pivot, a swing low or a VWAP. When the OI band and the price-based level overlap, the zone has two independent reasons to matter. Be aware that a zone can still fail; confirmation only improves the odds. Also check that both calls and puts are not equally heavy at the same strikes, which would hide the net story.`,
      eg: {
        title: 'OI band plus pivot (illustrative)',
        text: `Put OI at 23,800, 23,900 and 24,000 is 12, 11 and 13 lakh, a band total of 36 lakh. Previous day's H 24,180, L 23,940, C 24,050 give pivot (24,180 + 23,940 + 24,050) / 3 = 24,056.7 and S1 = 2 × 24,056.7 − 24,180 = 23,933.3. S1 lies inside the 23,900 to 24,000 band, so two methods point to the same area.`,
      },
      tip: `Two independent reasons at one level beat one big number at one strike.`,
      visual: {
        kind: 'bars',
        title: 'Put OI band by strike (illustrative lakh)',
        unit: 'L',
        items: [
          { label: '23,800', value: 12, tone: 'bull' },
          { label: '23,900', value: 11, tone: 'bull' },
          { label: '24,000', value: 13, tone: 'bull' },
        ],
      },
      calc: { id: 'pivot-levels', preset: { high: 24180, low: 23940, close: 24050 }, why: 'Price-based levels to compare with the OI band.' },
    },
    {
      t: 10,
      def: `Price acceptance means price stays beyond a level for a meaningful time (several candles or a close) and trades there. Rejection means price touches the level and is pushed back, often leaving a wick. Acceptance beats OI: if price accepts beyond a zone, the zone has failed.`,
      hi: `Price acceptance matlab price kisi level ke paar meaningful time tak (kai candles ya ek close) tik kar trade karti hai. Rejection matlab price level ko chhoo kar wapas dhakel di jati hai, aksar ek wick chhodkar. Acceptance OI se bada hota hai: agar price zone ke paar accept ho jaaye, toh zone fail ho gaya.`,
      how: `Define your own rule in advance, for example two consecutive 15-minute closes beyond the level, with volume at or above average. Rejection is a wick beyond the level and a close back inside. Combine with OI: acceptance plus falling OI at the zone is confirmation of a breakout; rejection plus rising OI is confirmation of the zone. A single spike through a level that closes back inside (a false breakout) can trap early entrants.`,
      eg: {
        title: 'Acceptance vs rejection at 24,200 (illustrative)',
        text: `Acceptance: 15-minute closes at 24,212 and 24,225, both above 24,200, with call OI at 24,200 falling. Rejection: a candle with a high of 24,215 and a close of 24,185, leaving a 30-point upper wick and a close 15 points below the level. The first set suggests the level was crossed and held; the second says it was refused.`,
      },
      tip: `Decide the acceptance rule before the test, for example two closes beyond the level, and then follow it.`,
      visual: {
        kind: 'compare',
        title: 'Acceptance vs rejection',
        left: { head: 'Acceptance', tone: 'bull', points: ['Closes beyond the level', 'Holds on a retest', 'OI at the zone falls', 'Volume stays high'] },
        right: { head: 'Rejection', tone: 'bear', points: ['Wick beyond, close inside', 'Return through the level', 'OI at the zone holds or rises', 'Volume spike then fades'] },
      },
    },
  ],
}
export default m
