import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '13.5',
  intro:
    `Option writers do not move the market on their own, but their positions can shape where traders watch, hedge and react. Large call OI is often called resistance and large put OI support, yet these are possible levels and not guarantees. This module explains how writers may influence price through their entries, exits and hedging, and why the influence fails.`,
  introHi:
    `Option writers akele market ko nahi chalate, lekin unki positions se traders ki nazar, hedging aur reaction ke levels ban sakte hain. Bada call OI aksar resistance aur bada put OI support kaha jata hai, par yeh possible levels hain, guarantee nahi. Is module mein dekhenge ki writers apni entries, exits aur hedging se price ko kaise influence kar sakte hain aur yeh influence kab fail hota hai.`,
  steps: {
    concept:
      `A writer's position creates a payoff that changes with price, and a large crowd of writers at one strike can create a visible "line" on the chain. When price nears that line, writers may buy back, hedge or roll, and those actions can slow, stop or speed up the move. The effect is real but conditional: it depends on how many are hedged, what news arrives and how deep the market is.`,
    conceptHi:
      `Writer ki position ka payoff price ke saath badalta hai, aur ek strike par bahut saare writers chain par ek visible "line" bana dete hain. Price us line ke paas aaye toh writers buy back, hedge ya roll kar sakte hain, aur yeh actions move ko slow, stop ya tez kar sakte hain. Asar real hai par conditional hai: kitne hedged hain, kya news aayi aur market kitna deep hai, sab matter karta hai.`,
    mechanism:
      `Three channels exist. First, attention: traders read high OI strikes as levels and place orders around them. Second, writer actions: a naked writer who is losing may buy back, and that buying adds demand for the option. Third, hedging by market makers and arbitrage desks: short options are delta hedged with futures or stocks, and as price moves the hedge must be changed, which can add buying in a rise and selling in a fall. NSE publishes OI by strike, but it does not publish who sold or who is hedged, so every channel is an inference.`,
    example: {
      title: 'An illustrative OI strip (OI in lakh)',
      text: `Spot is 24,000. The 24,300 CE has 130 lakh OI and the 23,700 PE has 110 lakh. Total call OI is 430 lakh and put OI is 410 lakh, so PCR is 410 / 430 = 0.95. The 24,300 CE is 130 / 430 = 30.2% of call OI. Max pain on this strip works out at 24,000, which is the current spot and not a prediction. If Nifty reaches 24,300, a naked writer who sold at ₹81.99 faces a premium near ₹203, so some will buy back or hedge, while others will hold.`,
    },
    chart: {
      kind: 'oi',
      title: 'Illustrative OI strip around spot 24,000',
      caption: 'Call OI (red) sits above spot and put OI (green) below. These are possible levels, not walls.',
      spot: 24000,
      rows: [
        { strike: 23700, ce: 15, pe: 110 },
        { strike: 23800, ce: 20, pe: 90 },
        { strike: 23900, ce: 35, pe: 70 },
        { strike: 24000, ce: 60, pe: 60 },
        { strike: 24100, ce: 75, pe: 40 },
        { strike: 24200, ce: 95, pe: 25 },
        { strike: 24300, ce: 130, pe: 15 },
      ],
    },
    optionChain:
      `On the chain, look for the strikes with the largest OI on each side, how that OI changed since the last session, and whether the premium moved with it. Falling OI at a strike while price moves toward it may be unwinding or short covering; rising OI as price touches it may be fresh writing or fresh buying. OI alone cannot show who initiated the trade, and futures build-up rules do not apply blindly to option OI. Treat a big strike as a level to watch, not a wall.`,
    psychology:
      `Writers near a loss feel pressure to act together: the fear of the loss growing makes many of them buy back in the same minutes. Writers sitting on profit feel relaxed and may hold or add. Buyers watch the same strikes, so a "level" can become self-fulfilling for a while and then fail suddenly when the crowd flips. Beginners often treat OI as a prediction; experienced traders treat it as a map of who may be in pain.`,
    scenarios: {
      bullish:
        `As Nifty rises toward a heavy call-OI strike, writers may buy back or roll, and hedgers may buy futures. If the move continues, the strike can break and the OI migrates higher. If call writers hold and the move stalls, the level seems to work.`,
      bearish:
        `As Nifty falls toward a heavy put-OI strike, put writers may hedge or exit and market makers may sell futures. A break through the strike can speed the fall; a hold can look like support, until it does not.`,
      sideways:
        `Both sides collect premium and OI builds at the nearby strikes. Max pain sometimes sits close to spot, but it is a calculation, not a force. A breakout from the range can hurt whichever side is crowded.`,
    },
    practice: [
      {
        q: `Using the strip in the example (CE total 430 lakh, PE total 410 lakh), find PCR and the share of call OI held by the 24,300 strike.`,
        a: `PCR = put OI / call OI = 410 / 430 = 0.95. Share = 130 / 430 = 30.2%. A PCR below 1 does not by itself mean bearish; it only compares totals.`,
      },
      {
        q: `Compute the max pain for the 24,000 expiry from the strip: strikes 23,700 to 24,300 with CE OI 15, 20, 35, 60, 75, 95, 130 and PE OI 110, 90, 70, 60, 40, 25, 15 (lakh).`,
        a: `At 24,000: call payout = (300 × 15) + (200 × 20) + (100 × 35) = 4,500 + 4,000 + 3,500 = 12,000. Put payout = (100 × 40) + (200 × 25) + (300 × 15) = 4,000 + 5,000 + 4,500 = 13,500. Total = 25,500, the lowest of all seven candidate strikes (24,100 gives 30,500 and 23,900 gives 32,500). Max pain = 24,000. It is not a target price.`,
      },
      {
        q: `With 1 day to expiry, a writer sold the 24,300 CE at ₹3.47. Nifty gaps to 24,350 and the option is ₹101.55. How big is the loss per lot of 65 and how many times is the premium?`,
        a: `Loss per unit = 101.55 − 3.47 = ₹98.08. Per lot = 98.08 × 65 = ₹6,375.20. The premium rose 101.55 / 3.47 = about 29 times. A far-OTM option sold for a tiny premium can have a large loss after a gap of 1.46% (350 / 24,000).`,
      },
      {
        q: `A desk is short 10,000 lots of the 24,300 CE with 7 days left. The delta is 0.2854 at spot 24,000 and 0.3623 at 24,100. How many futures lots must it buy to stay hedged after the rise?`,
        a: `Delta rises by 0.3623 − 0.2854 = 0.0769 per unit of short call. For 10,000 lots, the extra hedge = 10,000 × 0.0769 = about 769 futures lots (each of 65 units). The desk buys more as price rises, adding some demand. This is an illustration; real desks hold many strikes and hedge in different ways.`,
      },
    ],
    assignment:
      `Open the NIFTY option chain at the end of three consecutive sessions and copy the top two call and top two put OI strikes with their OI change. Note where Nifty closed relative to those strikes each day. Write four sentences: did the strikes hold, did OI migrate, what did you not know (who wrote, who hedged), and what you would watch next.`,
  },
  topics: [
    {
      t: 1,
      def: `Call writing is the sale of call options by traders who expect the index to stay below a strike. A large amount of call writing at one strike may become resistance, a price area where rises can slow, but it is only a possible level.`,
      hi: `Call writing matlab woh traders jo index ko strike ke neeche rehta dekhte hain aur call options bechte hain. Ek strike par bahut zyada call writing resistance ban sakti hai, jahan se rise slow ho sakta hai, par yeh sirf ek possible level hai.`,
      how: `Writers who sold the 24,300 CE are happy while Nifty is below the strike plus the premium. As price rises toward it, they face a growing loss, so some buy back, some hedge with a bought option or futures, and some do nothing. Those who hedge by buying futures add demand, which can offset the resistance. Buyers of the call are on the other side and may be hedgers or speculators. A strike with big OI therefore shows where many people have a stake, not that they will win.`,
      eg: {
        title: '24,300 CE with 130 lakh OI (illustrative)',
        text: `Nifty is at 24,000 and the 24,300 CE is the largest call OI strike. A writer who sold at ₹81.99 has a breakeven of 24,381.99. Between 24,000 and 24,300 the call is out-of-the-money by 300 points (1.25% of 24,000). If Nifty settles at 24,200 on expiry, the call expires worthless and the writer keeps the whole premium of ₹5,329.35 per lot of 65 (81.99 × 65). Any settlement at or below 24,300 gives the same result.`,
      },
      tip: `High call OI marks where writers may feel pressure. It does not stop the index from crossing.`,
      visual: {
        kind: 'ladder',
        title: 'Call strikes above spot 24,000',
        caption: 'Every strike above spot is out-of-the-money.',
        optType: 'CE',
        spot: 24000,
        strikes: [24000, 24100, 24200, 24300, 24400],
      },
      calc: {
        id: 'moneyness',
        preset: { optType: 'CE', spot: 24000, strike: 24300 },
        why: 'The distance of the 24,300 call from spot tells how far the market must travel.',
      },
    },
    {
      t: 2,
      def: `Put writing is the sale of put options by traders who expect the index to stay above a strike. A large amount of put writing at one strike may become support, a price area where falls can slow, but it is only a possible level.`,
      hi: `Put writing matlab woh traders jo index ko strike ke upar rehta dekhte hain aur put options bechte hain. Ek strike par bahut zyada put writing support ban sakti hai, jahan se girna slow ho sakta hai, par yeh sirf ek possible level hai.`,
      how: `Put writers win while the index stays above the strike less the premium. As the index falls toward it, they may hedge by selling futures or buying puts farther away. Their hedging adds selling pressure in the fall, which is the reverse of the "support" idea. Many traders write puts partly because they expect the index to hold or rise, but a crash can hit them hard and fast. Heavy put OI is therefore a hint of where traders hope to be paid, not a floor.`,
      eg: {
        title: '23,700 PE with 110 lakh OI (illustrative)',
        text: `Nifty is at 24,000. A writer sold the 7-day 23,700 PE at ₹64.57, with breakeven 23,635.43. The strike is 300 points (1.25%) below spot. If Nifty falls to 23,500 at expiry, the loss is (200 − 64.57) = ₹135.43 per unit, ₹8,802.95 per lot of 65. If Nifty ends at 23,700 or above, the writer keeps ₹4,197.05 per lot.`,
      },
      tip: `Support from put writers can disappear when the writers themselves hit their loss limits.`,
      visual: {
        kind: 'ladder',
        title: 'Put strikes below spot 24,000',
        caption: 'Every strike below spot is out-of-the-money for a put.',
        optType: 'PE',
        spot: 24000,
        strikes: [23600, 23700, 23800, 23900, 24000],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 23700, premium: 64.57, expiryPrice: 23500, lotSize: 65, lots: 1 },
        why: 'The put writer\'s result if Nifty falls through the strike to 23,500.',
      },
    },
    {
      t: 3,
      def: `Writer concentration means a large share of OI sits at one or two strikes. Concentration shows where the crowd is positioned, but it does not say whether the crowd is naked, hedged or paired with buyers.`,
      hi: `Writer concentration matlab OI ka bada hissa ek ya do strikes par baitha hai. Isse pata chalta hai ki crowd kahan positioned hai, par yeh nahi pata chalta ki woh naked hai, hedged hai ya buyers ke saath paired hai.`,
      how: `Concentration is measured as the share of total call or put OI at the top strike. The higher the share, the more traders have a stake in a single level, and the bigger the possible reaction if it breaks. But some OI at far strikes belongs to hedgers (bought protection), so concentration can hide spreads. Also, concentration shifts daily as new expiries start and positions roll. Use it as a rough map and always check the OI change.`,
      eg: {
        title: 'Concentration on the strip (illustrative)',
        text: `The 24,300 CE has 130 of 430 lakh call OI, or 30.2%. The 23,700 PE has 110 of 410 lakh put OI, or 26.8%. If the 24,300 CE falls by 30 lakh, the call total drops to 400 lakh and the strike's share falls to 100 / 400 = 25%. A shrinking share means the crowd is thinning at that level.`,
      },
      tip: `A big OI figure at one strike counts positions, not who made them or whether they are hedged.`,
      visual: {
        kind: 'bars',
        title: 'Top-strike share of OI (%)',
        caption: 'Illustrative strip.',
        unit: '%',
        items: [
          { label: '24,300 CE share of call OI', value: 30.2, tone: 'bear' },
          { label: '23,700 PE share of put OI', value: 26.8, tone: 'bull' },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 410, callOI: 430 },
        why: 'PCR compares total put and call OI on the strip; compare with the strike-level shares.',
      },
    },
    {
      t: 4,
      def: `Call-writer unwinding means call writers are buying back their short calls, so call OI falls. It can happen because writers are taking profit or because the market is moving against them.`,
      hi: `Call-writer unwinding matlab call writers apne short calls buy back kar rahe hain, isliye call OI girta hai. Yeh profit lene ke liye bhi ho sakta hai aur market unke khilaf jaa raha ho toh bhi.`,
      how: `A fall in call OI with a fall in premium can mean writers are booking profit after a quiet move. A fall in call OI with a rising premium and rising price is more consistent with short covering. Both look like "OI down" on the chain, so you need the price and premium to tell them apart. OI also falls when buyers close, which is another reason not to assume the sellers acted. After unwinding, the level can lose its role as a resistance.`,
      eg: {
        title: 'Call OI falls from 130 to 100 lakh (illustrative)',
        text: `The 24,300 CE OI falls 30 lakh in a session, a 23.1% decline (30 / 130). Case A: Nifty is flat and the premium falls from ₹81.99 to ₹60; this fits profit-taking. Case B: Nifty rises 150 points and the premium rises; this fits writers buying back at a loss. The OI number is the same; the story is different.`,
      },
      tip: `Read OI change together with price and premium before choosing a story.`,
      visual: {
        kind: 'compare',
        title: 'Two reasons call OI can fall',
        caption: 'The OI number alone does not tell them apart.',
        left: { head: 'Profit-taking', tone: 'ice', points: ['Price flat or lower', 'Premium falls', 'Little urgency'] },
        right: { head: 'Loss-driven covering', tone: 'bear', points: ['Price rising', 'Premium rises', 'Buying adds pressure'] },
      },
      calc: {
        id: 'return-calc',
        preset: { start: 130, end: 100, years: 1 },
        why: 'The percentage fall in OI; use years = 1 to read the change as a simple percentage.',
      },
    },
    {
      t: 5,
      def: `Put-writer unwinding means put writers are buying back their short puts, so put OI falls. It may be profit booking after a rise, or an exit after a fall.`,
      hi: `Put-writer unwinding matlab put writers apne short puts buy back kar rahe hain, isliye put OI girta hai. Yeh rise ke baad profit booking bhi ho sakti hai aur girne ke baad exit bhi.`,
      how: `When the index rises, put premiums fall and writers may buy back to free margin. When the index falls, writers who were wrong buy back to cut the loss. Their buying is in the option market, so the effect on the index is indirect: it works through the market makers who hedge those options. Falling put OI at a support strike can show a weaker floor, but it can also be a calm profit-taking. Again, price and premium decide the reading.`,
      eg: {
        title: 'Put OI falls from 110 to 80 lakh (illustrative)',
        text: `The 23,700 PE OI falls 30 lakh, a 27.3% decline (30 / 110). If Nifty rose from 24,000 to 24,150 and the put premium fell from ₹64.57 to about ₹36 (illustrative, 7 days left), writers likely booked profit. If Nifty fell to 23,650 and the premium rose to ₹193.42 (7 days left), writers were likely exiting at a loss: (193.42 − 64.57) × 65 = ₹8,375.25 per lot.`,
      },
      tip: `Put OI falling near spot may mean the "floor" is thinning, but confirm with price.`,
      visual: {
        kind: 'bars',
        title: 'Put premium at 23,700 strike with 7 days left (₹)',
        caption: 'Illustrative, IV 14%.',
        unit: ' ₹',
        items: [
          { label: 'Nifty 24,000', value: 64.57, tone: 'gold' },
          { label: 'Nifty 23,700', value: 168.81, tone: 'gold' },
          { label: 'Nifty 23,650', value: 193.42, tone: 'gold' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 110, end: 80, years: 1 },
        why: 'The percentage fall in put OI.',
      },
    },
    {
      t: 6,
      def: `Short covering means sellers buy back what they sold earlier. In options it is a writer buying back a short call or put; it adds demand, and often happens when price moves against the writers.`,
      hi: `Short covering matlab jo bechne wale the woh jo pehle becha tha usse wapas khareedte hain. Options mein yeh writer ka short call ya put buy back karna hai; isse demand badhti hai aur yeh aksar tab hota hai jab price writers ke khilaf jata hai.`,
      how: `Short covering is a buy order. If done in small size, it passes unnoticed. If done by many writers in a short time, it can push the option premium and, through hedgers, the index. In futures it shows as price up with OI down. In options, it shows as premium up with OI down on the strike. It ends when the writers who wanted out have exited, and the move can then fade.`,
      eg: {
        title: 'Covering the 24,300 CE (illustrative)',
        text: `A writer sold the 24,300 CE at ₹81.99. With 3 days left and Nifty at 24,250, the call is ₹105.26. Buying it back locks a loss of 105.26 − 81.99 = ₹23.27 per unit, ₹1,512.55 per lot of 65, but stops further loss. If 1,000 writers each cover one lot, the buy order is 65,000 units; whether that moves the price depends on the order book depth.`,
      },
      tip: `Covering moves are often sharp and short. Do not assume they mark a new trend.`,
      visual: {
        kind: 'flow',
        title: 'How covering can feed itself',
        caption: 'The loop stops when the weakest writers have exited.',
        steps: [
          { label: 'Price rises', note: 'Short calls lose', tone: 'bull' },
          { label: 'Writers buy back', note: 'Demand for options', tone: 'gold' },
          { label: 'Premium rises more', note: 'More losses', tone: 'bear' },
          { label: 'More covering', note: 'Until sellers run out', tone: 'ice' },
        ],
      },
    },
    {
      t: 7,
      def: `A short squeeze is a fast price rise caused by sellers forced to buy back in a hurry. In options, it can show as an option premium that jumps far more than the index.`,
      hi: `Short squeeze matlab sellers ko jaldi mein buy back karna pad jata hai, aur price tezi se upar jata hai. Options mein yeh aisa dikhta hai ki option premium index se kahin zyada tezi se kud jata hai.`,
      how: `A squeeze needs crowded shorts, a trigger (news, a gap, a break of a level), and thin liquidity at the buy side. Margin calls and stop-losses add forced buying. A far OTM option sold for a few rupees can multiply many times in a day, since each point of index move changes the delta and the price (gamma). Squeezes also hit index futures when hedged writers buy back. They usually fade when the buying is done, which makes them risky to chase.`,
      eg: {
        title: 'A 1.46% gap with 1 day left (illustrative)',
        text: `The 24,300 CE is ₹3.47 with Nifty at 24,000 and 1 day to expiry. After a gap to 24,350 it is ₹101.55, a rise of about 29 times (101.55 / 3.47). The writer's loss is (101.55 − 3.47) × 65 = ₹6,375.20 per lot, about 28 times the ₹225.55 premium collected on the lot (3.47 × 65).`,
      },
      tip: `Tiny premiums mean tiny rewards, and the risk of a squeeze is the cost hidden inside them.`,
      visual: {
        kind: 'candles',
        title: 'Gap-up through a crowded strike',
        caption: 'Stylised; price opens beyond the level before writers can act.',
        pattern: 'gapUp',
        level: { price: 24300, label: '24,300 CE strike' },
      },
      calc: {
        id: 'return-calc',
        preset: { start: 3.47, end: 101.55, years: 1 },
        why: 'The percentage change in premium: from ₹3.47 to ₹101.55.',
      },
    },
    {
      t: 8,
      def: `Gamma-related hedging flows are the buying and selling that option dealers do in futures or stocks to keep their delta neutral. When dealers are short options, they buy as price rises and sell as it falls, which can add to a move.`,
      hi: `Gamma-related hedging flows matlab option dealers apna delta neutral rakhne ke liye futures ya stocks mein jo buy-sell karte hain. Jab dealers short options hote hain, toh price badhne par woh khareedte hain aur girne par bechte hain, jisse move aur badh sakta hai.`,
      how: `Gamma is the speed at which delta changes. A dealer who has sold calls is "short gamma": as spot rises, the calls gain delta, so the dealer must buy more futures to stay hedged. This buying can add to the rise. A dealer who is long gamma does the opposite and can calm the market. Near expiry, gamma at the money is highest, so flows are strongest then. How much of the market is short or long gamma is not published, so this effect is an estimate, not a fact.`,
      eg: {
        title: 'A short-gamma desk (illustrative)',
        text: `A desk is short 10,000 lots of the 7-day 24,300 CE. At spot 24,000 the delta is 0.2854, so the hedge is long 10,000 × 0.2854 = 2,854 futures lots. At 24,100 the delta is 0.3623, so the hedge becomes 3,623 lots; the desk bought about 769 more lots (769 × 65 = 49,985 units). At 24,200 the delta is 0.4448, a further 825 lots.`,
      },
      tip: `Short-gamma hedging can add momentum to a move. The size of that effect is uncertain and cannot be read from the option chain alone.`,
      visual: {
        kind: 'flow',
        title: 'Dealer hedging loop',
        caption: 'For a dealer short call options.',
        steps: [
          { label: 'Spot rises', note: 'Short calls gain delta', tone: 'bull' },
          { label: 'Hedge too small', note: 'Net short exposure', tone: 'gold' },
          { label: 'Dealer buys futures', note: 'Back to delta neutral', tone: 'ice' },
          { label: 'Extra demand', note: 'May push spot higher', tone: 'bull' },
        ],
      },
      calc: {
        id: 'portfolio-delta',
        preset: { d1: 0.2854, q1: -650000, d2: 0, q2: 0, d3: 0, q3: 0 },
        why: 'Net delta of 10,000 short lots (650,000 units); the hedge must offset it.',
      },
    },
    {
      t: 9,
      def: `Support and resistance migration is the shifting of high-OI strikes up or down as price moves. When the strike with the most call OI moves higher, the "resistance" has migrated up.`,
      hi: `Support aur resistance migration matlab price ke saath high-OI strikes ka upar ya neeche shift hona. Jab sabse zyada call OI wala strike upar jaata hai, toh "resistance" upar migrate hua hai.`,
      how: `Writers roll their positions as price moves, so OI shifts from the old strike to a new one. A rising market sees call OI move from 24,300 to 24,400 and put OI move up to 24,000 or 24,100. This can reflect traders raising their expectations, but it can also be mere repositioning of hedges. Migration is one of the more useful things to watch because it shows a change over days, but it still does not tell who is trading or whether they are right.`,
      eg: {
        title: 'Call OI migrates upward (illustrative)',
        text: `Day 1: Nifty 24,000; 24,300 CE has 130 lakh and 24,400 CE has 70 lakh. Day 3: Nifty 24,250; 24,300 CE has 90 lakh and 24,400 CE has 120 lakh. The peak call strike moved 100 points higher. The 24,300 CE OI fell by 40 lakh (30.8%) and the 24,400 CE grew by 50 lakh (71.4%).`,
      },
      tip: `A strike that stops being the OI peak has not "broken". It has simply lost some of its crowd.`,
      visual: {
        kind: 'oi',
        title: 'Call OI after migration (day 3, illustrative)',
        caption: 'The peak moved from 24,300 to 24,400.',
        spot: 24250,
        rows: [
          { strike: 24200, ce: 80, pe: 45 },
          { strike: 24300, ce: 90, pe: 30 },
          { strike: 24400, ce: 120, pe: 20 },
          { strike: 24500, ce: 85, pe: 10 },
        ],
      },
      calc: {
        id: 'max-pain',
        preset: { strip: '23700:15:110;23800:20:90;23900:35:70;24000:60:60;24100:75:40;24200:95:25;24300:130:15' },
        why: 'Max pain of the day-1 strip is 24,000; rerun it after the OI moves to see if it shifts.',
      },
    },
    {
      t: 10,
      def: `Writer positioning fails when price crosses the crowded level and keeps going. The crowd was right on average for a while, but a news event, a gap or forced buying broke the level.`,
      hi: `Writer positioning tab fail hoti hai jab price crowded level ko cross karke aage nikal jata hai. Kuch der ke liye crowd sahi tha, par news, gap ya forced buying ne level tod diya.`,
      how: `Failure reasons: unexpected news or data, a gap that skips the stops, hedgers who are not net sellers, expiry-day moves and the fact that OI is one side of a trade whose other side may be an informed buyer. Also OI is a stock, not a flow, so a high OI figure at 10 a.m. may be stale by 2 p.m. Weekly expiries are especially jumpy. The right lesson is to treat OI levels as inputs and have a plan for the day they fail.`,
      eg: {
        title: 'The level fails (illustrative)',
        text: `The 24,300 CE has the highest call OI, yet Nifty settles at 24,550 on expiry. A naked writer from ₹81.99 loses (250 − 81.99) = ₹168.01 per unit, ₹10,920.65 per lot of 65. A spread writer with the 24,500 CE bought at ₹39.20 loses the capped ₹157.21 per unit (₹10,218.65) at this level, a little less. Heavy OI at 24,300 did not prevent the move.`,
      },
      tip: `A level is a hypothesis. Know in advance what you will do if it is wrong.`,
      visual: {
        kind: 'candles',
        title: 'Level fails and price keeps going',
        caption: 'Stylised breakout through a crowded strike.',
        pattern: 'breakout',
        level: { price: 24300, label: 'High call OI' },
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24300, premium: 81.99, expiryPrice: 24550, lotSize: 65, lots: 1 },
        why: 'The naked writer\'s loss if the level fails and Nifty settles at 24,550.',
      },
    },
  ],
}

export default m
