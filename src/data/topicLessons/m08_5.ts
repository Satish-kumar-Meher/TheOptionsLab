import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '8.5',
  intro:
    `Open interest is often used to mark potential support and resistance: strikes where many Put or Call contracts are open. The idea is useful as a map of where positions are crowded, but it is only a hypothesis. OI cannot show who initiated a trade or whether a position is a bet, a hedge or part of a spread, and a strike with high OI is a possible level, not a guaranteed wall. All numbers here are illustrative (Nifty about 24,000, rate 6.5%, lot 65 - check the current NSE contract specification; OI figures are in lots).`,
  introHi:
    `Open interest ka use aksar potential support aur resistance dikhane ke liye hota hai: woh strikes jahan bahut saare Put ya Call contracts open hain. Yeh idea ek map ki tarah kaam aata hai ki positions kahan crowded hain, lekin yeh sirf ek hypothesis hai. OI se yeh nahi pata chalta ki trade kisne initiate kiya ya position bet hai, hedge hai ya spread ka hissa, aur high OI wala strike ek possible level hai, guaranteed deewar nahi. Saare numbers illustrative hain (Nifty lagbhag 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein; OI lots mein diya gaya hai).`,
  steps: {
    concept:
      `A strike with very high Call OI means many Call contracts are open there; one common reading is that sellers of those Calls would defend the level, so it may act as resistance. A strike with very high Put OI is read the same way as possible support. The important word is "may". The same OI can include buyers, sellers, hedgers and spread traders, and traders can close or shift positions during the day. OI levels are a place to pay attention, then confirm with price, change in OI and volume.`,
    conceptHi:
      `Jis strike par Call OI bahut zyada hai, wahan kaafi Call contracts open hain; ek common reading yeh hai ki un Calls ke sellers us level ko bachane ki koshish karenge, isliye woh resistance ban sakta hai. Bahut zyada Put OI wale strike ko possible support padha jata hai. Yahan sabse zaroori shabd hai "sakta hai". Wahi OI mein buyers, sellers, hedgers aur spread traders sab ho sakte hain, aur din ke beech positions close ya shift ho sakti hain. OI levels ek dhyaan dene ki jagah hain, phir price, change in OI aur volume se confirm karna padta hai.`,
    mechanism:
      `A Call writer collects premium and loses when the index finishes above strike plus premium, so a writer with a large position has an incentive to hedge or exit as the index nears the strike. That hedging or exiting can slow a rise, which is why high Call OI is linked to resistance. Put writers face the same logic below the index. But writers may hold hedges in futures or other options, may be market makers, and may roll positions to another strike or expiry, so the OI number alone cannot say how they will behave. Treat the OI map as a probability aid, not a rule.`,
    example: {
      title: 'An illustrative OI map (Nifty 24,000, lots)',
      text: `Call OI: 24,000 = 48,000; 24,200 = 57,000; 24,300 = 63,000; 24,500 = 82,000; 24,700 = 39,000. Put OI: 23,500 = 58,000; 23,800 = 71,000; 24,000 = 55,000; 24,200 = 21,000. Highest Call OI is 24,500 (82,000 lots x 65 = 53.3 lakh units), highest Put OI is 23,800 (71,000 lots = 46.15 lakh units). A possible trading range is 23,800 to 24,500, which is 700 points wide. This is a hypothesis; it breaks the moment price closes beyond a level with rising OI on the other side.`,
    },
    chart: {
      kind: 'oi',
      title: 'Illustrative strike-wise OI map (thousand lots)',
      caption: 'Call OI (red) builds above spot, Put OI (green) builds below. The tallest bars are potential levels, not guaranteed walls.',
      spot: 24000,
      rows: [
        { strike: 23500, ce: 9, pe: 58 },
        { strike: 23800, ce: 15, pe: 71 },
        { strike: 24000, ce: 48, pe: 55 },
        { strike: 24200, ce: 57, pe: 21 },
        { strike: 24300, ce: 63, pe: 14 },
        { strike: 24500, ce: 82, pe: 9 },
        { strike: 24700, ce: 39, pe: 4 },
      ],
    },
    optionChain:
      `On the NSE chain, sort or scan the Open Interest column for the largest Call and Put numbers, then read Chng in OI on the same rows to see whether those levels are growing or shrinking today. Compare each level with spot, with the premium of that strike and with volume. A level where OI is falling is weakening even if the total is still large. Note that some platforms display OI in lots and others in units, so compare numbers only within the same view.`,
    psychology:
      `Many traders love a simple "the market cannot cross this" rule, and so they pile into trades at OI levels. Writers feel safe behind a big OI bar and may add size, which makes a breakout more violent when it comes. Buyers who treat OI as a wall sell breakouts too early. The calmer view is that OI shows where positions are crowded and, therefore, where a fast move could hurt many at once.`,
    scenarios: {
      bullish:
        `Index approaches the highest Call OI strike, premiums of those Calls rise and Call OI starts falling: writers are covering and the level may be giving way. A close above it with falling Call OI and rising Put OI below is a stronger sign than OI alone.`,
      bearish:
        `Index falls toward the highest Put OI strike, Put premiums rise and Put OI falls: the support is weakening. If Call OI keeps rising above, the move may stay under pressure, but only price confirms it.`,
      sideways:
        `Index stays between the highest Put OI and highest Call OI strikes, OI at both levels increases slowly, premiums decay. A range is possible, but it is a pattern to observe, not a promise.`,
    },
    practice: [
      {
        q: 'From the map above, find the total Call OI, total Put OI and the OI PCR.',
        a: `Call OI = 9 + 15 + 48 + 57 + 63 + 82 + 39 = 313 thousand lots. Put OI = 58 + 71 + 55 + 21 + 14 + 9 + 4 = 232 thousand lots. PCR = 232 / 313 = 0.74.`,
      },
      {
        q: 'A trader sells the 24,500 CE at Rs 39.20 (7 days to expiry). What is the breakeven and the result per lot of 65 if Nifty expires at 24,700?',
        a: `Breakeven = 24,500 + 39.20 = 24,539.20. At 24,700 the Call is worth 200, so the result = (39.20 - 200) x 65 = -160.80 x 65 = -Rs 10,452 per lot. The "wall" at 24,500 gave no protection.`,
      },
      {
        q: 'How far, in per cent of spot, are the highest Call OI strike (24,500) and highest Put OI strike (23,800) from 24,000?',
        a: `Call: 500 / 24,000 = 2.08% above. Put: 200 / 24,000 = 0.83% below. The Put level is much closer, so a small dip would test it first.`,
      },
    ],
    assignment:
      `On the live NIFTY chain for the nearest weekly expiry, write down the three largest Call OI strikes and the three largest Put OI strikes with their change in OI. Mark them on a daily chart. At the end of the day note whether price respected, pierced or ignored each level and whether OI at that strike rose or fell.`,
  },
  topics: [
    {
      t: 1,
      def: `Highest Call OI is the strike with the largest number of open Call contracts. Many traders treat it as the first potential resistance zone, because Call writers there may defend the level.`,
      hi: `Highest Call OI woh strike hai jahan sabse zyada Call contracts open hain. Kaafi traders ise pehla potential resistance zone maante hain, kyunki wahan ke Call writers us level ko bachane ki koshish kar sakte hain.`,
      how: `NSE publishes OI per strike and the figure updates through the day. The highest Call OI strike is usually out of the money, because writers sell Calls above spot. The logic is that as the index rises towards the strike, the Call premium increases and writers feel pressure to hedge or buy back. But the OI could also belong to buyers or to spread legs, and a breakout through the strike with rising volume can quickly turn the "resistance" into a short-covering trigger. Check change in OI before using the level.`,
      eg: {
        title: 'The 24,500 call strike (illustrative)',
        text: `The 24,500 CE has OI of 82,000 lots (82,000 x 65 = 53,30,000 units), the largest on the chain. It is 500 points above spot, or 2.08% away. With 7 days to expiry the Call trades near Rs 39.20, so one lot costs Rs 2,548 to buy. A seller keeps that Rs 2,548 if Nifty stays below 24,500, and loses more than the premium once it is above 24,539.20.`,
      },
      tip: `Highest Call OI is where resistance may form; it is not where the market must stop.`,
      visual: {
        kind: 'bars',
        title: 'Call OI by strike (illustrative, thousand lots)',
        caption: 'The tallest bar is the highest Call OI strike.',
        items: [
          { label: '24,000', value: 48, tone: 'bear' },
          { label: '24,200', value: 57, tone: 'bear' },
          { label: '24,300', value: 63, tone: 'bear' },
          { label: '24,500', value: 82, tone: 'bear' },
          { label: '24,700', value: 39, tone: 'bear' },
        ],
      },
      calc: {
        id: 'moneyness',
        preset: { optType: 'CE', spot: 24000, strike: 24500 },
        why: 'Check how far the highest Call OI strike is from spot and whether it is OTM.',
      },
    },
    {
      t: 2,
      def: `Highest Put OI is the strike with the largest number of open Put contracts. It is commonly watched as the first potential support zone, since Put writers there may defend the level.`,
      hi: `Highest Put OI woh strike hai jahan sabse zyada Put contracts open hain. Ise aam taur par pehla potential support zone dekha jata hai, kyunki wahan ke Put writers us level ko bachane ki koshish kar sakte hain.`,
      how: `Put writers collect premium and lose if the index falls below strike minus premium. As the index approaches a heavily written Put strike, writers may hedge with futures or buy back, which can slow the fall. This is a possible tendency, not a rule: in a fast market-wide sell-off, such as the COVID crash of March 2020, the index fell through many levels in a short time, so crowded Put strikes offered no guarantee. Also, Put OI can be hedging by investors who hold shares and buy Puts for protection, in which case high OI means worry, not defence.`,
      eg: {
        title: 'The 23,800 put strike (illustrative)',
        text: `The 23,800 PE has OI of 71,000 lots (71,000 x 65 = 46,15,000 units), the largest Put OI. It is 200 points below spot (0.83%). With 7 days to expiry it trades near Rs 92.18, so one lot is Rs 5,992. A Put writer's breakeven is 23,800 - 92.18 = 23,707.82. If Nifty expires at 23,500 the writer loses (300 - 92.18) x 65 = Rs 13,508 per lot.`,
      },
      tip: `A big Put OI bar below spot may mean writers are confident, or that holders are hedged. The OI figure cannot tell you which.`,
      visual: {
        kind: 'bars',
        title: 'Put OI by strike (illustrative, thousand lots)',
        caption: 'The tallest bar is the highest Put OI strike.',
        items: [
          { label: '23,500', value: 58, tone: 'bull' },
          { label: '23,800', value: 71, tone: 'bull' },
          { label: '24,000', value: 55, tone: 'bull' },
          { label: '24,200', value: 21, tone: 'bull' },
        ],
      },
    },
    {
      t: 3,
      def: `Second-highest OI levels are the next biggest Call or Put strikes after the highest. They give a second line of potential resistance or support if the first level breaks.`,
      hi: `Second-highest OI levels pehle ke baad ke sabse bade Call ya Put strikes hote hain. Agar pehla level toot jaye toh yeh doosri line of potential resistance ya support ban sakte hain.`,
      how: `Looking only at the top strike can mislead: a market that crosses the highest Call OI strike may be stopped at the second level, or the second level may already be larger than the first by the next session as OI shifts. Compare the size of the second level with the first. If it is close in size, the zone is wide; if it is far smaller, the first level carries most of the weight. Record both levels with their change in OI.`,
      eg: {
        title: 'Two layers above and below (illustrative)',
        text: `Calls: highest 24,500 (82,000 lots), second-highest 24,300 (63,000 lots), which is 63 / 82 = 76.8% of the first. Puts: highest 23,800 (71,000 lots), second-highest 23,500 (58,000 lots), 58 / 71 = 81.7% of the first. Both second levels are large, so the market has a layered zone on each side, not a single line: roughly 24,300-24,500 above and 23,500-23,800 below.`,
      },
      tip: `Write down at least two levels on each side. A single "key level" is usually too thin to plan around.`,
      visual: {
        kind: 'layers',
        title: 'Potential levels from the illustrative map',
        caption: 'Order is by distance from spot, not by certainty.',
        layers: [
          { label: '24,500 CE (82k lots)', note: 'highest Call OI', tone: 'bear' },
          { label: '24,300 CE (63k lots)', note: 'second-highest Call OI', tone: 'bear' },
          { label: 'Spot 24,000', tone: 'gold' },
          { label: '23,800 PE (71k lots)', note: 'highest Put OI', tone: 'bull' },
          { label: '23,500 PE (58k lots)', note: 'second-highest Put OI', tone: 'bull' },
        ],
      },
    },
    {
      t: 4,
      def: `Call writing as potential resistance means that when many traders sell Calls at a strike, the index may find it hard to rise past that strike, because writers may hedge or defend it.`,
      hi: `Call writing ko resistance maanna matlab yeh ki jab bahut saare traders ek strike par Call bechte hain, toh index ko us strike ke upar jaana mushkil ho sakta hai, kyunki writers hedge ya defend kar sakte hain.`,
      how: `A Call writer earns premium when the index stays below the strike and loses once it is above strike plus premium. Fresh Call writing is read as OI up with premium down. If this builds at a strike above spot, the market is being "priced" to stay below it. Writing is only a signal of belief, not a barrier: when a news event or a large buyer pushes the index higher, writers hurry to buy back, and that buying can fuel the rise. Retail writers should remember that stop-loss and margin rules, such as NSE's SPAN plus exposure margin, are what force them to cover.`,
      eg: {
        title: 'The writer wins only if the level holds (illustrative)',
        text: `A trader sells one lot (65) of the 24,500 CE at Rs 39.20 and collects 39.20 x 65 = Rs 2,548. If Nifty expires at 24,400 the whole premium is kept. If it expires at 24,700 the Call is worth Rs 200, and the loss is (39.20 - 200) x 65 = -Rs 10,452, about 4.1 times the premium collected.`,
      },
      tip: `Call writing builds resistance only while writers keep their nerve. Watch whether the Call OI at the level is growing or shrinking as price approaches it.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,500 CE at expiry (illustrative, per unit)',
        caption: 'Limited reward (the premium), unlimited risk above the breakeven.',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24500, premium: 39.2 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24500, premium: 39.2, expiryPrice: 24700, lotSize: 65, lots: 1 },
        why: 'Move the expiry price around the strike to see where the writer starts losing.',
      },
    },
    {
      t: 5,
      def: `Put writing as potential support means that when many traders sell Puts at a strike, the index may find buyers near that strike, because writers may defend it or hedge.`,
      hi: `Put writing ko support maanna matlab yeh ki jab bahut saare traders ek strike par Put bechte hain, toh us strike ke paas index ko sahara mil sakta hai, kyunki writers use defend ya hedge kar sakte hain.`,
      how: `A Put writer collects premium and loses if the index finishes below strike minus premium. When Put OI builds at a strike below spot with the premium falling, it is read as fresh Put writing, i.e. a view that the index will stay above. The signal is weaker if the OI comes from hedgers and, as in any short option, the risk is lopsided: a fast fall can wipe out many days of premium. Look for Put OI that holds or rises as the index approaches the level; if it drops quickly, writers are leaving.`,
      eg: {
        title: 'The put writer\'s risk (illustrative)',
        text: `One lot (65) of the 23,800 PE is sold at Rs 92.18, collecting Rs 5,992. If Nifty expires at 23,900 the whole premium is kept. If it expires at 23,500 the Put is worth Rs 300 and the loss is (92.18 - 300) x 65 = -Rs 13,508, about 2.3 times the premium. The breakeven is 23,707.82.`,
      },
      tip: `Put writers are paid to take a fall risk. Support from OI lasts only while that risk is being accepted.`,
      visual: {
        kind: 'payoff',
        title: 'Short 23,800 PE at expiry (illustrative, per unit)',
        caption: 'Limited reward, large risk below the breakeven.',
        spot: 24000,
        legs: [{ type: 'PE', side: -1, strike: 23800, premium: 92.18 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 23800, premium: 92.18, expiryPrice: 23500, lotSize: 65, lots: 1 },
        why: 'See the writer\'s loss when the expiry falls through the strike.',
      },
    },
    {
      t: 6,
      def: `Support shifting means that the strike with the highest Put OI moves to a different strike over time, usually higher when the index rises and lower when it falls.`,
      hi: `Support shifting ka matlab hai ki sabse zyada Put OI wala strike samay ke saath doosre strike par chala jata hai, aam taur par index badhne par upar aur girne par neeche.`,
      how: `Put writers who see the index rise will often sell new Puts at higher strikes because their old strikes are now too far to earn much premium. Over days the largest Put OI "climbs". The shift can be confirming a trend, but it can also happen because old low-strike writers closed their positions. Combine the shift with price: if Put OI climbs while the index climbs, the picture is coherent; if Put OI climbs while the index falls, treat it carefully, because those may be traders defending or fresh bottom-fishers.`,
      eg: {
        title: 'Put OI climbing over three days (illustrative)',
        text: `Day 1: 23,800 PE = 71,000 lots, 24,000 PE = 40,000 lots, Nifty 24,000. Day 3: Nifty is 24,150, 24,000 PE = 78,000 lots (+38,000, +95%) and 23,800 PE = 66,000 lots (-5,000). The highest Put OI has shifted from 23,800 to 24,000, which narrows the support distance from 200 points to 150 points.`,
      },
      tip: `A shifting level tells you what the market believes now. Re-draw your levels every session; yesterday's map may be wrong today.`,
      visual: {
        kind: 'timeline',
        title: 'Highest Put OI shifting up (illustrative)',
        events: [
          { when: 'Day 1', what: 'Highest Put OI at 23,800 (71k lots); Nifty 24,000', tone: 'neutral' },
          { when: 'Day 2', what: '24,000 PE builds to 60k lots as Nifty holds above 24,050', tone: 'bull' },
          { when: 'Day 3', what: '24,000 PE is the highest at 78k lots; Nifty 24,150', tone: 'bull' },
        ],
      },
    },
    {
      t: 7,
      def: `Resistance shifting means that the strike with the highest Call OI moves over time, usually lower when the index weakens and higher when it strengthens.`,
      hi: `Resistance shifting ka matlab hai ki sabse zyada Call OI wala strike samay ke saath badalta hai, aam taur par index kamzor hone par neeche aur mazboot hone par upar.`,
      how: `As the index drops, Call writers sell fresh Calls at lower strikes to keep earning, and earlier higher strikes lose OI as positions are closed or lapse. The highest Call OI strike "descends" and is read as a ceiling lowering. A reverse shift upward, with high-strike OI building as the index rises, can mean writers are leaning against the rally. Neither is proof; short covering by earlier writers can also reduce OI, and rollovers to the next expiry can move OI without changing views.`,
      eg: {
        title: 'Call OI moving down (illustrative)',
        text: `Day 1: 24,500 CE = 82,000 lots and 24,300 CE = 63,000 lots, Nifty 24,000. Day 3: Nifty has slipped to 23,900, 24,500 CE = 60,000 lots (-22,000, -26.8%) and 24,300 CE = 85,000 lots (+22,000, +34.9%). The highest Call OI has moved from 24,500 to 24,300, so the possible ceiling is now 400 points above spot instead of 500.`,
      },
      tip: `A descending Call OI level shows writers getting more cautious, not that the market must fall.`,
      visual: {
        kind: 'timeline',
        title: 'Highest Call OI shifting down (illustrative)',
        events: [
          { when: 'Day 1', what: 'Highest Call OI at 24,500 (82k lots); Nifty 24,000', tone: 'neutral' },
          { when: 'Day 2', what: '24,300 CE grows to 74k lots as Nifty slips under 23,950', tone: 'bear' },
          { when: 'Day 3', what: '24,300 CE is the highest at 85k lots; Nifty 23,900', tone: 'bear' },
        ],
      },
    },
    {
      t: 8,
      def: `Multiple resistance levels exist when several Call strikes above spot all carry high OI. Resistance is then a zone, and the index may need to push through several layers.`,
      hi: `Multiple resistance levels tab hote hain jab spot ke upar kai Call strikes par high OI ho. Tab resistance ek zone ban jata hai aur index ko kai layers paar karni pad sakti hain.`,
      how: `A cluster of high Call OI means that writers are spread over several strikes, so a small rally may stall at the first strike, while a bigger rally forces covering at each level in turn. This stair-step structure can slow a rally but, once the first level gives way with rising volume, covering at higher strikes can speed it up. Add up OI across the zone to see its weight versus the whole chain.`,
      eg: {
        title: 'A resistance zone (illustrative)',
        text: `Call OI at 24,200 = 57,000, 24,300 = 63,000, 24,500 = 82,000 lots, a total of 202,000 lots. The whole chain has 313,000 lots of Call OI, so the zone from 24,200 to 24,500 holds 202 / 313 = 64.5% of it. The zone is 300 points wide (1.25% of spot), and a trade planned around "24,500 only" would miss two earlier levels.`,
      },
      tip: `Plan for a zone with a start and end, not a single number. The first level hit is rarely the only one.`,
      visual: {
        kind: 'oi',
        title: 'Call OI cluster above spot (illustrative, thousand lots)',
        spot: 24000,
        rows: [
          { strike: 24000, ce: 48, pe: 55 },
          { strike: 24200, ce: 57, pe: 21 },
          { strike: 24300, ce: 63, pe: 14 },
          { strike: 24500, ce: 82, pe: 9 },
          { strike: 24700, ce: 39, pe: 4 },
        ],
      },
    },
    {
      t: 9,
      def: `Multiple support levels exist when several Put strikes below spot all carry high OI. Support becomes a zone, and a fall may pause at each layer or run through them in turn.`,
      hi: `Multiple support levels tab hote hain jab spot ke neeche kai Put strikes par high OI ho. Support ek zone ban jata hai, aur girawat har layer par ruk sakti hai ya ek ke baad ek tod sakti hai.`,
      how: `With several Put strikes loaded, writers are spread across a range, so a fall may find its first support near the nearest big strike. If that strike gives way, writers at the next level may defend or hedge, and so on. In a fast, panic-driven fall every layer may break, because hedging by Put writers (selling futures) can add to the pressure. Measure the zone's weight and its distance to judge how deep a fall must be before it meets most of the OI.`,
      eg: {
        title: 'A support zone (illustrative)',
        text: `Put OI at 23,500 = 58,000 and 23,800 = 71,000 lots, a total of 129,000 lots. The chain has 232,000 lots of Put OI, so this zone holds 129 / 232 = 55.6%. It lies 200 to 500 points below spot (0.83% to 2.08%). A fall that stops between 23,800 and 23,500 is within the zone, and a close under 23,500 would be outside it.`,
      },
      tip: `The depth of the zone matters as much as the level. If the zone is 300 points wide, a stop-loss sized for a 30-point wobble will not fit.`,
      visual: {
        kind: 'oi',
        title: 'Put OI cluster below spot (illustrative, thousand lots)',
        spot: 24000,
        rows: [
          { strike: 23500, ce: 9, pe: 58 },
          { strike: 23800, ce: 15, pe: 71 },
          { strike: 24000, ce: 48, pe: 55 },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 15080000, callOI: 20345000, putVol: 1400000, callVol: 1500000 },
        why: 'OI PCR of the whole illustrative chain (232,000 / 313,000 lots in units) is 0.74.',
      },
    },
    {
      t: 10,
      def: `An OI wall is a strike where open interest is much larger than at the strikes around it. It looks like a tall bar on the OI chart and is watched as a possible turning point.`,
      hi: `OI wall woh strike hai jahan open interest aas-paas ke strikes se bahut zyada hota hai. OI chart par yeh ek lamba bar dikhta hai aur ise possible turning point ki tarah dekha jata hai.`,
      how: `A wall forms when many participants take positions at one strike, often a round number such as 24,500 or 24,000. It can attract price like a magnet near expiry, or repel it. Walls are tested when price reaches them; if volume rises and the OI at the wall starts falling, the wall is being dismantled. If OI at the wall keeps rising as price pushes against it, new participants are defending it. Do not confuse a wall with Max Pain: Max Pain is a calculation of where option buyers lose most at expiry, and it is not a target for the index.`,
      eg: {
        title: 'Measuring a wall (illustrative)',
        text: `Average Call OI across the seven strikes of the map is 313,000 / 7 = 44,714 lots. The 24,500 strike has 82,000, which is 82,000 / 44,714 = 1.83 times the average and 82 / 63 = 1.30 times its nearest neighbour. It is a wall, but not an extreme one. If Nifty rallies to 24,520 and the 24,500 CE falls to 55,000 lots while volume spikes, the wall is breaking.`,
      },
      tip: `Judge a wall by what its OI does when price reaches it, not by how tall it looked in the morning.`,
      visual: {
        kind: 'bars',
        title: 'Wall strength: strike OI vs the average of the chain (illustrative)',
        unit: ' x',
        items: [
          { label: '24,500 CE (82k)', value: 1.83, tone: 'bear' },
          { label: '24,300 CE (63k)', value: 1.41, tone: 'neutral' },
          { label: '24,200 CE (57k)', value: 1.27, tone: 'neutral' },
          { label: '24,000 CE (48k)', value: 1.07, tone: 'neutral' },
        ],
      },
      calc: {
        id: 'max-pain',
        preset: { strip: '23500:9:58;23800:15:71;24000:48:55;24200:57:21;24300:63:14;24500:82:9;24700:39:4' },
        why: 'Compute Max Pain for this strip and notice that it differs from the wall strike; it is a calculation, not a target.',
      },
    },
    {
      t: 11,
      def: `Weak versus strong support compares how much conviction is behind a Put OI level. Strong support has high and stable or rising OI; weak support has low, falling or recently closed OI.`,
      hi: `Weak aur strong support ka farq yeh dekhta hai ki kisi Put OI level ke peeche kitna conviction hai. Strong support mein OI zyada aur stable ya badhta hua hota hai; weak support mein OI kam, girta hua ya haal hi mein close hua hota hai.`,
      how: `Judge support on four checks: size of OI relative to the chain, direction of change in OI today, the premium of that Put as price approaches (a premium rising fast shows stress), and how the level behaved on earlier tests. A level with large OI that is being unwound as price falls is weak. A moderately sized level where OI keeps growing as price touches it, with price bouncing, is stronger. None of these conditions can be known in advance; the checklist is to update, not to predict.`,
      eg: {
        title: 'Two Put strikes compared (illustrative)',
        text: `At 11:30 the 23,800 PE shows OI 71,000 lots with change +9,000 and the premium falling from 110 to 92: fresh writing, the level is strengthening. The 23,500 PE shows 58,000 lots with change -7,000 (-10.8%): some writers have left. With Nifty at 23,900 the first level looks stronger, but a close below 23,800 with the OI there dropping would downgrade it.`,
      },
      tip: `Support is a status that changes through the day. Re-score it whenever OI and price move.`,
      visual: {
        kind: 'compare',
        title: 'Weak vs strong Put OI support',
        left: { head: 'Stronger support', tone: 'bull', points: ['High OI relative to other strikes', 'OI stable or rising as price falls toward it', 'Put premium not exploding', 'Held on earlier tests'] },
        right: { head: 'Weaker support', tone: 'bear', points: ['Modest OI or falling OI', 'Writers closing as price approaches', 'Put premium jumps quickly', 'Level already pierced earlier'] },
      },
    },
    {
      t: 12,
      def: `Weak versus strong resistance compares the conviction behind a Call OI level in the same way: high and stable or rising OI suggests firmer resistance, falling OI suggests the ceiling is weakening.`,
      hi: `Weak aur strong resistance Call OI level ke peeche ke conviction ko usi tarah compare karta hai: high aur stable ya badhta OI zyada mazboot resistance dikhata hai, girta OI ceiling ke kamzor hone ka ishara hai.`,
      how: `Use the same four checks as for support: relative size, change in OI, premium behaviour, and history. A sudden fall in Call OI while the index climbs and the Call premium jumps is classic short covering and means resistance is giving way. A rising Call premium with rising OI means new buyers have appeared, a different story. Context from the broader chain matters: if Put OI is also rising below, the market is being supported while the ceiling thins, which makes a breakout more plausible. Even then, it is only a probability.`,
      eg: {
        title: 'A ceiling cracking (illustrative)',
        text: `Nifty at 24,420. The 24,500 CE had 82,000 lots at the open; by 1:30 it shows 61,000 (-21,000, -25.6%) while its premium rose from Rs 39.20 to Rs 78. Writers are buying back (short covering). A trader who sold at Rs 39.20 and exits at 78 loses (78 - 39.20) x 65 = Rs 2,522 per lot. The resistance is weaker than the morning map showed.`,
      },
      tip: `Falling Call OI with a rising premium near the level is the clearest sign that a ceiling is weakening.`,
      visual: {
        kind: 'matrix',
        title: 'Call OI at a level: what OI and premium together may suggest',
        caption: 'Inference only; spot and IV changes also move premium.',
        xLabels: ['Premium falls', 'Premium rises'],
        yLabels: ['OI rises', 'OI falls'],
        cells: [
          { head: 'Fresh writing', note: 'resistance building', tone: 'bear' },
          { head: 'Fresh buying', note: 'ceiling being challenged', tone: 'bull' },
          { head: 'Long unwinding', note: 'interest fading', tone: 'neutral' },
          { head: 'Short covering', note: 'resistance weakening', tone: 'bull' },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24500, premium: 39.2, expiryPrice: 24578, lotSize: 65, lots: 1 },
        why: 'Equivalent expiry outcome at 24,578 (strike + Rs 78): a writer who sold at Rs 39.20 loses Rs 2,522 per lot.',
      },
    },
  ],
  tools: [
    { id: 'pcr', why: 'OI and volume PCR for the whole chain.' },
    { id: 'max-pain', why: 'Compute Max Pain and compare with OI levels.' },
  ],
}
export default m
