import type { ModuleLesson } from '../topicLessonTypes'

/* Module 8.7 - Advanced Option Chain Reading.
 * All chain numbers are an illustrative snapshot (NIFTY spot 24,000, OI in lakh units, lot 65 - check the current NSE contract specification).
 * Premiums are Black-Scholes values (r 6.5%, q 1.3%) rounded; real quotes differ. */
const m: ModuleLesson = {
  moduleId: '8.7',
  intro: `Reading one strike at a time tells you little. Advanced chain reading looks at several strikes together, at both calls and puts, at OI and its change, and at IV, and then asks how the picture is moving through the day. This module shows how to combine those pieces without over-claiming: OI alone cannot show who initiated a trade, and a big OI number is a potential level, not a guaranteed wall.`,
  introHi: `Ek strike ko akela dekhne se zyada kuch pata nahi chalta. Advanced chain reading mein hum kai strikes ek saath dekhte hain, call aur put dono, OI aur uska change, aur IV, phir dekhte hain ki din bhar picture kaise badal rahi hai. Is module mein seekhenge ki bina zyada claim kiye yeh sab kaise combine karein: sirf OI se yeh nahi pata chalta ki trade kisne shuru kiya, aur bada OI ek possible level hai, guaranteed deewar nahi.`,
  steps: {
    concept: `An option chain lists every strike with its call and put data: LTP, volume, OI, change in OI and IV. Advanced reading means treating it as a map instead of a list. You look for clusters of OI, where fresh OI is being added or removed, whether calls and puts are changing together, and how premium and IV respond. The goal is a working hypothesis about the likely trading range and what would change it, not a prediction.`,
    conceptHi: `Option chain mein har strike ka call aur put data hota hai: LTP, volume, OI, OI change aur IV. Advanced reading ka matlab hai ise list ki tarah nahi, map ki tarah dekhna. Aap dekhte hain ki OI kahan cluster ho raha hai, naya OI kahan add ya remove ho raha hai, call aur put saath mein badal rahe hain ya nahi, aur premium aur IV kaise react kar rahe hain. Maqsad ek working hypothesis banana hai ki range kahan rahegi aur kya cheez ise badlegi, prediction nahi.`,
    mechanism: `Every new contract has a buyer and a seller, so OI rises when a new buyer and a new seller are matched and falls when both close. The chain does not say who was the aggressor. OI change must therefore be read with price: a call whose premium rises while its OI rises may have seen fresh buying; a call whose premium falls while OI rises may have seen fresh selling. Even then it is a probability, because one lot can be a hedge for another position. The futures build-up table (long build-up, short build-up and so on) is a futures idea and must not be copied blindly onto option OI.`,
    example: {
      title: 'An illustrative snapshot, NIFTY 24,000',
      text: `OI in lakh units (change in brackets). 23,800: CE 12 (-1), PE 48 (+9). 23,900: CE 18 (+2), PE 55 (+14). 24,000: CE 40 (+11), PE 46 (+6). 24,100: CE 52 (+16), PE 22 (-4). 24,200: CE 61 (+9), PE 15 (-1). Total CE 183, PE 186, so PCR = 186 / 183 = 1.02. Fresh CE OI is added at 24,000-24,200 (+36 combined) and fresh PE OI at 23,800-24,000 (+29). One reading: a band of roughly 23,900-24,100 is being defended, with 24,200 and 23,800 as outer markers. This is a hypothesis to test, not a forecast.`,
    },
    chart: {
      kind: 'oi',
      title: 'Illustrative OI by strike (lakh units)',
      caption: 'Calls cluster above spot, puts below. Read the shape, then read the change column to see what is new today.',
      rows: [
        { strike: 23800, ce: 12, pe: 48 },
        { strike: 23900, ce: 18, pe: 55 },
        { strike: 24000, ce: 40, pe: 46 },
        { strike: 24100, ce: 52, pe: 22 },
        { strike: 24200, ce: 61, pe: 15 },
      ],
      spot: 24000,
    },
    optionChain: `This module is about the chain itself. A practical order of reading: first total OI and PCR for the overall tilt; then the three largest OI strikes on each side; then the change in OI to see what is fresh; then LTP direction at those strikes to guess buying or selling; finally IV by strike to see where the market is paying up for protection. Re-read every 30 to 60 minutes and note what changed, because a single snapshot hides direction of travel.`,
    psychology: `Most beginners look for the one number that gives the answer, such as the highest OI strike, and then treat it as certain. Option writers hold positions for different reasons, some hedged, some not, and they can all be wrong together. A calm approach: write your hypothesis, write what would prove it wrong, and accept a small loss when it does. Confirmation bias is strong here, since every chain can be read to support the view you already have.`,
    scenarios: {
      bullish: `Spot rises through a strike with heavy CE OI, that CE's OI falls (writers closing or rolling) and its premium rises, while PE OI is added at higher strikes. That pattern is consistent with a level that did not hold and support moving up, but the chain cannot prove it.`,
      bearish: `Spot slips below a strike with heavy PE OI, PE OI there stops growing or falls, fresh CE OI appears at lower strikes and put IV rises. The level may have failed and resistance may be coming down.`,
      sideways: `OI changes are small, premium decays on both sides, IV drifts lower and the highest OI strikes stay the same through the day. The band may hold, but time decay is doing most of the work and one sharp move can end it.`,
    },
    practice: [
      {
        q: `Using the snapshot, compute total change in CE OI and PE OI and say which side saw more fresh OI.`,
        a: `CE change = -1 + 2 + 11 + 16 + 9 = +37 lakh. PE change = 9 + 14 + 6 - 4 - 1 = +24 lakh. Fresh CE OI is larger, but the chain does not say whether it came from fresh writing or fresh buying.`,
      },
      {
        q: `Which strike has the highest total (CE + PE) OI, and what does that tell you?`,
        a: `24,000: 40 + 46 = 86 lakh; 24,100 = 74; 24,200 = 76; 23,900 = 73; 23,800 = 60. So 24,000 is the busiest strike. It marks a strike where many positions exist, which may attract price, but it is not a guaranteed pin.`,
      },
      {
        q: `PCR is 186 / 183. Is that bullish?`,
        a: `PCR = 1.016, roughly balanced. A PCR near 1 gives no strong tilt. PCR is also a positioning measure and not a forecast, so it must be read with price and the OI change.`,
      },
      {
        q: `The highest CE OI strike moves from 24,200 to 24,000 over two days while spot falls from 24,150 to 23,950. How would you describe it?`,
        a: `Call OI is migrating down by 200 points, roughly following spot. This may mean resistance is moving down with price, which is consistent with a weakening market. It is a hypothesis that needs price confirmation.`,
      },
    ],
    assignment: `Take a screenshot of the NIFTY weekly chain at 10:00, 12:00 and 14:00 on one day (or use the paper-trading feed). For each time write the three biggest CE OI and PE OI strikes, total change in OI, PCR and the ATM IV. Then write four sentences: what changed, what you think the likely band is, what would prove you wrong, and what the chain cannot tell you.`,
  },
  topics: [
    {
      t: 1,
      def: `OI buildup at multiple strikes means that open interest is rising across a group of neighbouring strikes, not just at one. It shows where many new positions are being created and gives a broader picture than a single big number.`,
      hi: `Multiple strikes par OI buildup ka matlab hai ki OI ek hi strike par nahi, aas-paas ke kai strikes par badh raha hai. Isse pata chalta hai ki naye positions kahan ban rahe hain, aur yeh ek akele bade number se zyada achhi picture deta hai.`,
      how: `Add the OI change across a zone, for example 24,000 to 24,200 for calls, and compare with the same zone width on the put side. A wide cluster is more informative than one spike because one strike's OI can be a single large position, while a cluster suggests broad participation. The chain still cannot say whether the new OI is writing or buying. Pair it with LTP direction: OI up and premium down often points to writing, OI up and premium up to buying, but this is a probability and not a fact.`,
      eg: {
        title: 'Reading a cluster',
        text: `Call OI change at 24,000 / 24,100 / 24,200 is +11 / +16 / +9 = +36 lakh units, which is 36,00,000 / 65 = about 55,385 lots. Put OI change at 23,800 / 23,900 / 24,000 is +9 / +14 / +6 = +29 lakh. The call build is spread over three strikes, a broader signal than one spike. Illustrative numbers.`,
      },
      tip: `Look at a cluster of 3-5 strikes and at the change in OI, not just the single biggest OI number.`,
      visual: {
        kind: 'oi',
        title: 'Cluster of CE OI above spot, PE OI below',
        caption: 'Illustrative OI (lakh units): the shape matters more than any one bar.',
        rows: [
          { strike: 23800, ce: 12, pe: 48 },
          { strike: 23900, ce: 18, pe: 55 },
          { strike: 24000, ce: 40, pe: 46 },
          { strike: 24100, ce: 52, pe: 22 },
          { strike: 24200, ce: 61, pe: 15 },
        ],
        spot: 24000,
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 186, callOI: 183, putVol: 140, callVol: 150 },
        why: 'Overall tilt of the snapshot: total put OI over total call OI.',
      },
    },
    {
      t: 2,
      def: `Simultaneous CE and PE writing means fresh OI is being added on both the call side and the put side at around the same time. It often suggests that participants expect a range, but the chain cannot confirm who the writers are.`,
      hi: `CE aur PE dono mein ek saath writing ka matlab hai ki call aur put dono side naya OI add ho raha hai. Aksar isse lagta hai ki log range ki ummeed kar rahe hain, lekin chain yeh confirm nahi kar sakti ki writers kaun hain.`,
      how: `One participant may be selling a straddle or strangle, or two different groups may be selling calls and puts independently. If calls at 24,100 and puts at 23,900 both gain OI, the zone between them is where those writers feel comfortable. Their breakeven points are the premium collected away from those strikes, so the real comfort zone is wider. Both sides gaining OI also means both sides carry risk if the market breaks out, because a sharp move forces one side to cover.`,
      eg: {
        title: 'A 200-point band',
        text: `24,100 CE OI +16 lakh and 23,900 PE OI +14 lakh. The band between strikes is 24,100 - 23,900 = 200 points, which is 200 / 24,000 = 0.83% of spot. With India VIX 14 the one-day expected move is about 24,000 x 0.14 x sqrt(1/365) = 176 points, so the band is a little wider than one day of normal movement (illustrative).`,
      },
      tip: `Two-sided writing says "range expected", not "range guaranteed". Note the strikes and decide in advance what happens if spot closes outside them.`,
      visual: {
        kind: 'compare',
        title: 'Two-sided writing: calm or crowded?',
        left: { head: 'What it may mean', tone: 'ice', points: ['Range expected by writers', 'Premium decay favours sellers if spot stays inside', 'Band edges are the strikes with fresh OI'] },
        right: { head: 'What it cannot tell you', tone: 'gold', points: ['Who initiated the trades', 'Whether the writers are hedged', 'Whether the band will hold on a news move'] },
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 14, days: 1 },
        why: 'Compare the width of the OI band with a normal one-day move.',
      },
    },
    {
      t: 3,
      def: `Simultaneous CE and PE unwinding means OI is falling on both sides at once. Positions are being closed or expired, so the band that was being defended is being given up or has simply played out.`,
      hi: `CE aur PE dono mein ek saath unwinding ka matlab hai ki dono side OI gir raha hai. Positions band ho rahi hain, yaani jo band defend ho rahi thi woh chhodi ja rahi hai ya expiry ke saath khatam ho rahi hai.`,
      how: `OI falls when existing buyers and sellers close against each other. Near expiry this is normal: positions are squared off and the next expiry's OI starts to build. During the week it can mean writers are booking profit or cutting risk before an event. Price direction at the time matters: a quiet market with falling OI is profit booking; a fast market with falling OI may be stop-losses. Falling OI on both sides can also come before a larger move, when nobody wants to hold risk.`,
      eg: {
        title: 'Before an event',
        text: `24,100 CE OI falls from 52 to 36 lakh (-16) and 23,900 PE OI falls from 55 to 41 lakh (-14). Together 30 lakh units closed, about 30,00,000 / 65 = 46,154 lots. Premiums on both sides remain similar. A reading: writers are reducing exposure ahead of a result or policy announcement (illustrative).`,
      },
      tip: `Do not read unwinding as direction. It says positions are leaving, not which way the market will go.`,
      visual: {
        kind: 'flow',
        title: 'Two ways OI can fall',
        steps: [
          { label: 'Writers buy back', note: 'Close short positions', tone: 'ice' },
          { label: 'Buyers sell out', note: 'Close long positions', tone: 'ice' },
          { label: 'OI falls', note: 'Both sides close', tone: 'gold' },
        ],
      },
    },
    {
      t: 4,
      def: `CE writing with PE unwinding means call OI is rising while put OI is falling. It may mean resistance is being added overhead while support is being removed, which can lean cautious.`,
      hi: `CE writing ke saath PE unwinding ka matlab hai ki call OI badh raha hai aur put OI gir raha hai. Isse lagta hai ki upar resistance ban rahi hai aur neeche ka support hat raha hai, jo thoda cautious lean ho sakta hai.`,
      how: `When call OI rises with falling premium, new call sellers may be capping the upside. When put OI falls at the same time, put writers may be closing, which removes the cushion below. Together this can mean the market sees limited upside and fewer defenders below. It is not certain: the put unwinding could be profit booking after a rise, and the call OI could be hedges against a long portfolio.`,
      eg: {
        title: 'A lean-cautious chain',
        text: `24,100 CE OI +16 lakh with its LTP falling, and 24,000 PE OI from 46 to 38 lakh (-8, which is 8,00,000 / 65 = about 12,308 lots). Spot is flat at 24,000. A reading: sellers cap upside, put writers step back. Needs price to break 23,900 to confirm (illustrative).`,
      },
      tip: `Treat this as a lean, not a signal. Confirm with price breaking the put-OI strike before acting.`,
      visual: {
        kind: 'matrix',
        title: 'Four combinations of OI change',
        xLabels: ['Calls', 'Puts'],
        yLabels: ['OI rising', 'OI falling'],
        cells: [
          { head: 'CE OI up', note: 'Resistance building', tone: 'bear' },
          { head: 'PE OI up', note: 'Support building', tone: 'bull' },
          { head: 'CE OI down', note: 'Resistance easing', tone: 'bull' },
          { head: 'PE OI down', note: 'Support easing', tone: 'bear' },
        ],
      },
    },
    {
      t: 5,
      def: `PE writing with CE unwinding means put OI is rising while call OI is falling. It may mean support is being built while resistance is easing, which can lean constructive.`,
      hi: `PE writing ke saath CE unwinding ka matlab hai ki put OI badh raha hai aur call OI gir raha hai. Isse lagta hai ki support ban raha hai aur resistance halki ho rahi hai, jo thoda constructive lean ho sakta hai.`,
      how: `Put writers add OI at a strike below spot, effectively saying they are comfortable owning risk there. Call writers closing above spot reduces the overhead supply. This is the mirror of the previous topic. The caveats are the same: put OI can be a hedge instead of a view, and call unwinding can be short covering after a rise, which may itself be a sign of pressure on sellers.`,
      eg: {
        title: 'A lean-constructive chain',
        text: `23,900 PE OI +14 lakh and 24,100 CE OI from 52 to 46 lakh (-6). Spot at 24,040. If spot then holds above 24,000 and the 24,100 CE LTP rises, writers above may be under pressure. If spot falls through 23,900 the PE writers are the ones in trouble (illustrative).`,
      },
      tip: `Support built by puts below spot can fail. Always ask where the put writers would be wrong and watch that level.`,
      visual: {
        kind: 'compare',
        title: 'Mirror images',
        left: { head: 'CE writing + PE unwinding', tone: 'bear', points: ['Resistance building', 'Support easing', 'Lean cautious'] },
        right: { head: 'PE writing + CE unwinding', tone: 'bull', points: ['Support building', 'Resistance easing', 'Lean constructive'] },
      },
    },
    {
      t: 6,
      def: `Strike-wise IV changes show which strikes the market is paying more or less for. A rise in IV at one strike with no change elsewhere points to demand or fear around that level.`,
      hi: `Strike-wise IV changes se pata chalta hai ki market kis strike ke liye zyada ya kam paisa de rahi hai. Kisi ek strike par IV badhe aur baaki jagah na badhe, toh us level ke aas-paas demand ya darr ho sakta hai.`,
      how: `Each strike's IV is computed from its traded price, so heavy buying at one strike lifts its IV. In falling markets, out-of-the-money puts usually carry higher IV than equally distant calls (skew), and the gap widens when fear rises. A single-strike jump can also be a thin-liquidity effect, so check volume. Compare each strike's IV with its own value some hours earlier, and with the ATM IV.`,
      eg: {
        title: 'Put IV jumps, call IV drifts down',
        text: `7 days to expiry, spot 24,000. The 23,800 PE at IV 14% is about ₹94.03; if IV rises to 17% it is about ₹129.98, a gain of 35.95 per unit, or 35.95 x 65 = ₹2,336.75 per lot with spot unchanged. The 24,200 CE at IV 14% is about ₹111.40 and at 13% about ₹99.07, a fall of ₹12.33. Put IV rising while call IV falls shows the market paying for downside protection (illustrative, Black-Scholes).`,
      },
      tip: `Always compare IV with the same strike earlier, not only with other strikes. A level shift in the whole chain is volatility; a shift in one strike is a story about that strike.`,
      visual: {
        kind: 'bars',
        title: 'IV at selected strikes (illustrative, %)',
        unit: '%',
        items: [
          { label: '23,800 PE', value: 17, tone: 'bear' },
          { label: '24,000 ATM', value: 14, tone: 'gold' },
          { label: '24,200 CE', value: 13, tone: 'bull' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'PE', spot: 24000, strike: 23800, days: 7, iv: 17, rate: 6.5 },
        why: 'Price the 23,800 PE at IV 14 and 17 to see the premium effect of an IV jump.',
      },
    },
    {
      t: 7,
      def: `OI migration means the strikes with the largest OI shift over hours or days. If the highest call OI moves lower, resistance may be moving down; if the highest put OI moves higher, support may be moving up.`,
      hi: `OI migration ka matlab hai ki sabse zyada OI wale strikes ghante ya dinon mein khisakte hain. Agar highest call OI neeche aata hai toh resistance neeche aa rahi ho sakti hai, aur agar highest put OI upar jaata hai toh support upar ja raha ho sakta hai.`,
      how: `Record the top CE and top PE OI strike at each reading. When the pair moves in the same direction as price, the market is repositioning with the move. When they move against price, for instance spot rises but the top call OI strike stays put, the call writers are still betting on the old level. Migration is slower than price and best read across days. It is based on end-of-interval snapshots; the chain does not show the intraday path of each position.`,
      eg: {
        title: 'Walls that follow price',
        text: `Day 1: spot 24,150, top CE OI 24,200, top PE OI 23,900. Day 3: spot 23,950, top CE OI 24,000, top PE OI 23,800. Both shifted down by 100-200 points, matching a fall of 200 points in spot (24,150 to 23,950). The band is still about 200 points wide, just lower (illustrative).`,
      },
      tip: `Track the top strikes in a small table each day. A wall that keeps moving with price is following the market, not controlling it.`,
      visual: {
        kind: 'timeline',
        title: 'Migration of the top OI strikes',
        events: [
          { when: 'Day 1', what: 'Spot 24,150. Top CE 24,200, top PE 23,900', tone: 'ice' },
          { when: 'Day 2', what: 'Spot 24,050. Top CE 24,100, top PE 23,900', tone: 'ice' },
          { when: 'Day 3', what: 'Spot 23,950. Top CE 24,000, top PE 23,800', tone: 'bear' },
        ],
      },
    },
    {
      t: 8,
      def: `Writer position shifting means a writer closes a short option at one strike and sells another, often further away, instead of simply waiting. It shows up as OI falling at one strike and rising at another.`,
      hi: `Writer position shifting ka matlab hai ki writer ek strike ka short option band karke doosre strike par, aksar door wale par, naya sell karta hai. Chain mein yeh ek strike par OI girne aur doosre par badhne ki tarah dikhta hai.`,
      how: `When spot moves towards a written strike, the writer's loss grows. To limit it, some close the short and open a new one at a safer strike (rolling). Rolling crystallises the loss on the old position and collects a new premium on the new one. The chain sees OI fall at the old strike and rise at the new one, usually with some volume. It cannot show that it is the same trader, so it stays an inference.`,
      eg: {
        title: 'Rolling a short call',
        text: `A trader sold the 24,100 CE at ₹45 and spot rises to 24,090, where it trades at ₹95. Loss to close = (95 - 45) x 65 = ₹3,250. He sells the 24,200 CE at ₹52, receiving 52 x 65 = ₹3,380. The new position still carries unlimited upside risk. In the chain 24,100 CE OI falls, 24,200 CE OI rises (illustrative).`,
      },
      tip: `A roll does not remove risk, it moves it. Rolling a losing short for a bigger position or a further strike is how small losses grow.`,
      visual: {
        kind: 'flow',
        title: 'Rolling a short call',
        steps: [
          { label: 'Sell 24,100 CE', note: 'at 45', tone: 'ice' },
          { label: 'Spot rises', note: 'CE now 95', tone: 'bull' },
          { label: 'Buy back 24,100', note: 'loss 3,250', tone: 'bear' },
          { label: 'Sell 24,200 CE', note: 'at 52', tone: 'gold' },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24100, premium: 45, expiryPrice: 24195, lotSize: 65, lots: 1 },
        why: 'Short call result at a given expiry price; try 24,195 (loss 50 per unit) and 24,100.',
      },
    },
    {
      t: 9,
      def: `A potential trap is a setup where many participants have positioned the same way and a move against them forces them to exit quickly. In option chains this looks like heavy OI that is suddenly breached.`,
      hi: `Potential trap ek aisa setup hai jahan bahut se participants ne ek hi direction mein position li hai aur ulta move unhe jaldi exit karne par majboor karta hai. Option chain mein yeh heavy OI ke achanak toot jaane ki tarah dikhta hai.`,
      how: `If thousands of put writers sit at 23,900 and spot closes below it, they face growing losses and the pressure to buy back or hedge adds to selling. The same works for call writers above resistance. Signs: large OI at a strike, price testing it, premium of the written side rising quickly, volume surging, OI starting to fall as positions are closed. A trap is only clear afterwards; before that it is a risk to watch, not a trade.`,
      eg: {
        title: 'Put writers at 23,900',
        text: `A put writer sold the 23,900 PE at ₹40 with spot 24,050. The market drops to 23,880 and the put trades at ₹130. Loss = (130 - 40) x 65 = ₹5,850 per lot, on a premium receipt of 40 x 65 = ₹2,600. If many writers close at once, buying pressure in puts lifts premium further (illustrative).`,
      },
      tip: `A level with a lot of OI is a level where people will be forced to act if it breaks. Decide beforehand what you will do if price closes beyond it.`,
      visual: {
        kind: 'candles',
        title: 'A level that breaks',
        pattern: 'breakdown',
        level: { price: 23900, label: 'Heavy PE OI' },
        caption: 'Writers below the broken level face rising losses.',
      },
    },
    {
      t: 10,
      def: `Reading the chain dynamically means taking repeated snapshots through the day and watching what changes, instead of judging from one picture. Direction of change matters more than any single level.`,
      hi: `Chain ko dynamically padhne ka matlab hai din bhar baar baar snapshot lena aur dekhna ki kya badal raha hai, ek picture se judge nahi karna. Kisi ek level se zyada change ki direction matter karti hai.`,
      how: `A simple routine: note PCR, top OI strikes, OI change, ATM IV and the straddle price at a few fixed times. Add what spot did in between. Changes that agree (price, OI, IV all pointing the same way) deserve more weight than ones that disagree. NSE refreshes the option chain during market hours and data vendors differ in their refresh rates, so use one source consistently. The chain is a tool for context; entries and exits still need a price-based plan.`,
      eg: {
        title: 'Three readings in a day',
        text: `10:00: spot 24,000, ATM straddle 150, PCR 1.02, top CE 24,200, top PE 23,900. 12:00: spot 24,060, PCR 1.05, top CE 24,200, ATM IV down one point. 14:00: spot 24,110, 24,100 CE OI falling, 24,100 CE LTP rising, top PE now 24,000. Spot is above 24,100 for the first time and the wall is thinning, so the upper band is being tested. A trader waits for a close above 24,100 before leaning long (illustrative).`,
      },
      tip: `Write down what would change your view, before the market changes it. A chain read without an exit rule is a story, not a plan.`,
      visual: {
        kind: 'flow',
        title: 'A repeatable reading routine',
        steps: [
          { label: 'PCR and totals', note: 'Overall tilt', tone: 'gold' },
          { label: 'Top OI strikes', note: 'Potential levels', tone: 'ice' },
          { label: 'OI change + LTP', note: 'Fresh vs old', tone: 'ice' },
          { label: 'IV by strike', note: 'Where fear is', tone: 'gold' },
          { label: 'Compare to last snapshot', note: 'Direction of change', tone: 'ice' },
        ],
      },
      calc: {
        id: 'max-pain',
        preset: { strip: '23800:12:48;23900:18:55;24000:40:46;24100:52:22;24200:61:15' },
        why: 'Max pain for the snapshot (24,000 here). It is a statistic, not a target.',
      },
    },
  ],
  tools: [
    { id: 'pcr', preset: { putOI: 186, callOI: 183, putVol: 140, callVol: 150 } },
    { id: 'max-pain', preset: { strip: '23800:12:48;23900:18:55;24000:40:46;24100:52:22;24200:61:15' } },
  ],
}
export default m
