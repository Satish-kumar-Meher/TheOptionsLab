import type { ModuleLesson } from '../topicLessonTypes'

/* Module 7.4 — Options-Specific Position Analysis.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). OI is quoted in lots (1 lot = 65 units).
 * The four patterns are read on the option PREMIUM (LTP) and the strike's OI change, never on the index alone. Topics 9-12 are the
 * "futures-style" names for the same four patterns, applied to the call or put premium. */
const m: ModuleLesson = {
  moduleId: '7.4',
  intro: `On an option chain you can pair two things for any strike: did its OI go up or down, and did its premium go up or down. That gives four patterns for calls and four for puts: fresh writing, buying, unwinding and short covering. They are useful labels for what may be happening at a strike, but they are inferences, because OI never says who initiated the trade. NIFTY lot size is 65; verify the current NSE contract specification.`,
  introHi: `Option chain mein kisi bhi strike ke liye do cheezein saath dekhi ja sakti hain: OI badha ya ghata, aur premium badha ya ghata. Isse calls ke liye chaar aur puts ke liye chaar patterns bante hain: fresh writing, buying, unwinding aur short covering. Yeh labels batate hain ki us strike par kya ho raha ho sakta hai, lekin yeh sirf andaza hai, kyunki OI yeh nahi batata ki trade kisne initiate kiya. NIFTY ka lot 65 hai; current NSE contract specification check karein.`,
  steps: {
    concept: `Take one strike. Look at the change in OI and the change in premium (LTP) over the same period. Premium up with OI up is consistent with fresh buying. Premium down with OI up is consistent with fresh writing. Premium down with OI down is consistent with long unwinding. Premium up with OI down is consistent with short covering. The same grid works for calls and for puts. Because every contract has a buyer and a seller, "consistent with" is the honest wording: it is a reading of pressure, not a record of intent.`,
    conceptHi: `Ek strike lijiye. Same period mein OI ka change aur premium (LTP) ka change dekhiye. Premium upar aur OI upar ho toh fresh buying ke saath consistent hai. Premium neeche aur OI upar ho toh fresh writing ke saath consistent hai. Premium neeche aur OI neeche ho toh long unwinding ke saath consistent hai. Premium upar aur OI neeche ho toh short covering ke saath consistent hai. Yahi grid calls aur puts dono par lagta hai. Har contract mein buyer aur seller dono hote hain, isliye "consistent with" hi sahi shabd hai: yeh pressure ka reading hai, kisi ke intent ka record nahi.`,
    mechanism: `Option premium moves with the index, with implied volatility (IV) and with time decay. OI moves only when contracts are opened or closed. So a premium rise can come from the index moving, from IV rising, or from aggressive buying, and an OI rise can come from buyers or writers opening. When both numbers are read together, the pairing narrows the possibilities but does not remove them. A call premium that falls while the index is flat and OI rises fits writing; the same fall with the index dropping fits delta loss and the OI rise could be anyone. Use the index move and IV as the third and fourth clues.`,
    example: {
      title: 'Reading four strikes in one session (illustrative)',
      text: `NIFTY 24,000, lot 65. 24,200 CE: OI +2,000 lots (1,30,000 units), premium 80 to 68. Reading: fresh call writing is plausible. 24,100 CE: OI +1,000 lots, premium 90 to 118. Reading: fresh call buying is plausible. 23,900 PE: OI −2,000 lots, premium 88 to 70. Reading: put longs unwinding. 24,000 PE: OI −1,400 lots, premium 95 to 118. Reading: put short covering is plausible. Premium changes are 15%, 31.1%, 20.5% and 24.2%. The labels are working hypotheses to be checked against IV, volume and the index.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Premium and OI together: four patterns (same grid for CE and PE)',
      caption: 'Columns: change in OI. Rows: change in premium (LTP). Read the cell as the most consistent story, not as proof.',
      xLabels: ['OI rises', 'OI falls'],
      yLabels: ['Premium rises', 'Premium falls'],
      cells: [
        { head: 'Buying / long build-up', note: 'New longs likely adding', tone: 'gold' },
        { head: 'Short covering', note: 'Writers buying back', tone: 'ice' },
        { head: 'Fresh writing / short build-up', note: 'New shorts likely adding', tone: 'gold' },
        { head: 'Unwinding', note: 'Longs selling out', tone: 'neutral' },
      ],
    },
    optionChain: `On the chain, find the strike and compare "Change in OI" with the LTP change (net change) of that same strike. The chain shows both numbers side by side, so the grid can be applied in seconds. Do this for the ATM and a few strikes around it rather than for a single row, because one strike moving alone can be a hedge or a spread leg. Remember that spreads create OI in two strikes at once: a call spread adds OI at one strike (long) and another (short), and the chain shows only the totals.`,
    psychology: `Labels feel like knowledge. "Fresh call writing at 24,200, so resistance" is a neat sentence, but it was produced from two numbers and a guess. The trader who treats the label as a fact tends to ignore the evidence that disagrees with it. Keep a rule: write the label, then write one thing that would prove it wrong, for example the premium rising on the next candle.`,
    scenarios: {
      bullish: `In a rally, call premiums rise. Fresh call buying and put writing may increase, while call writers may cover. A call premium rise with OI falling at a strike is the short-covering pattern, which is often seen when the index moves through a level that writers were defending.`,
      bearish: `In a fall, put premiums rise and call premiums fall. Put buying and call writing may increase while long calls unwind. A call premium decline with OI falling is the unwinding pattern, usually longs giving up.`,
      sideways: `In a range, premiums bleed through time decay. Writing patterns (premium down, OI up) are common because writers collect theta, but they can reverse quickly if the range breaks. Unwinding rises as expiry nears and positions are squared off.`,
    },
    practice: [
      {
        q: `24,300 CE: OI +1,500 lots, premium 50 to 62. Name the pattern and the percentage premium change.`,
        a: `Premium up and OI up: consistent with fresh call buying (long build-up). Change = (62 − 50) / 50 = 24%. OI added = 1,500 × 65 = 97,500 units.`,
      },
      {
        q: `23,800 PE: OI +900 lots, premium 60 to 45, index rose from 23,950 to 24,040. Pattern? Per-lot premium change in rupees?`,
        a: `Premium down and OI up: consistent with fresh put writing, supported by the index rising. Per unit fall = 15, per lot = 15 × 65 = ₹975 in the writers' favour (and against buyers).`,
      },
      {
        q: `24,000 CE: OI −2,400 lots, premium 120 to 150. Name the pattern and estimate the writers' loss per lot if a writer who sold at 120 covers at 150.`,
        a: `Premium up and OI down: short covering. Loss per unit = 150 − 120 = 30; per lot = 30 × 65 = ₹1,950 (before charges).`,
      },
      {
        q: `Why might a premium rise with OI rise not be call buying at all?`,
        a: `Because premium also rises when the index rises or IV rises, and OI can rise from writers opening against those buyers. The pairing is a clue only. Check IV and the index move, and note that OI alone cannot show who initiated the trade.`,
      },
    ],
    assignment: `Open an NSE option chain on a trading day. For five strikes around ATM (calls and puts), note change in OI and LTP change at 11:00 and at 14:00. Label each with one of the four patterns, write the one piece of evidence (IV, index move or volume) that supports it, and the one that would contradict it.`,
  },
  topics: [
    {
      t: 1,
      def: `Fresh call writing means new call contracts are being sold. At a given strike the call OI rises while the call premium falls or stays flat. Writers expect NIFTY to stay below that strike, or at least not rise enough to make them lose.`,
      hi: `Fresh call writing ka matlab naye call contracts bech rahe hain. Us strike par call OI badhta hai aur call premium girta hai ya flat rehta hai. Writers ko lagta hai ki NIFTY us strike ke neeche rahega, ya itna nahi badhega ki unhe loss ho.`,
      how: `A call writer sells a CE, receives the premium and must keep SPAN plus exposure margin with the broker and clearing corporation (NSCCL). The writer's maximum profit is the premium; the loss is open-ended if the index rises. A rise in OI together with a falling premium is the usual footprint, because sellers have to accept lower prices to find buyers. It is not proof: a buyer who is also new could be present on the other side, and the premium could be falling mainly from time decay.`,
      eg: {
        title: 'Writers at 24,200 CE (illustrative)',
        text: `24,200 CE: OI +2,000 lots = 1,30,000 units, premium 80 to 68 with the index flat near 24,000. Premium received at ₹68 over all new contracts = 1,30,000 × 68 = ₹88,40,000 across the market. A writer's breakeven at expiry = 24,200 + 68 = 24,268. At an expiry value of 24,400 each lot loses (24,400 − 24,268) × 65 = ₹8,580, and a further move loses more without limit.`,
      },
      tip: `Falling premium plus rising OI at a call strike fits writing, but the strike is only a potential resistance, not a ceiling.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,200 CE at ₹68 (per unit, expiry)',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24200, premium: 68 }],
      },
      calc: {
        id: 'breakeven',
        preset: { optType: 'CE', side: 'sell', strike: 24200, premium: 68 },
        why: 'Gives the writer breakeven 24,268 used in the example.',
      },
    },
    {
      t: 2,
      def: `Fresh put writing means new put contracts are being sold. Put OI rises while the put premium falls or holds. Writers expect NIFTY to stay above that strike, or at least not fall far below it.`,
      hi: `Fresh put writing ka matlab naye put contracts bech rahe hain. Put OI badhta hai aur put premium girta hai ya hold karta hai. Writers ko lagta hai ki NIFTY us strike ke upar rahega ya bahut zyada neeche nahi girega.`,
      how: `A put writer is obliged to take a long position at the strike if the index closes below it at expiry; index options are cash settled, so the writer pays the difference rather than taking delivery. Maximum profit is the premium. Maximum loss is large (strike minus premium, times lot, if the index went to zero), though practically limited by how far the market falls. Rising put OI with a rising index is a typical footprint, since a rising market lowers put premiums and writers feel comfortable. It still does not identify who opened which side.`,
      eg: {
        title: 'Writers at 23,900 PE (illustrative)',
        text: `23,900 PE: OI +1,600 lots = 1,04,000 units, premium 75 to 62, NIFTY 24,000 to 24,060. Premium received at ₹62 = 1,04,000 × 62 = ₹64,48,000 across the market. A writer's breakeven = 23,900 − 62 = 23,838. If NIFTY closes at 23,700 at expiry, each lot loses (23,838 − 23,700) × 65 = ₹8,970. If it closes at or above 23,900, the writer keeps 62 × 65 = ₹4,030 per lot.`,
      },
      tip: `Put writing is often called support, but writers can be wrong and run for exit if the level breaks.`,
      visual: {
        kind: 'payoff',
        title: 'Short 23,900 PE at ₹62 (per unit, expiry)',
        spot: 24000,
        legs: [{ type: 'PE', side: -1, strike: 23900, premium: 62 }],
      },
    },
    {
      t: 3,
      def: `Call buying means new long call positions are being opened. At a strike, call OI rises and the call premium rises. Buyers expect NIFTY to rise above the strike by more than the premium paid.`,
      hi: `Call buying ka matlab naye long call positions khul rahi hain. Strike par call OI badhta hai aur call premium bhi badhta hai. Buyers ko lagta hai ki NIFTY strike ke upar premium se zyada chadhega.`,
      how: `A call buyer pays the premium and risks only that amount. The pattern of rising OI with a rising premium is consistent with buyers lifting offers, which pushes premium up while contracts are added. Check that the index actually moved up or IV rose; otherwise the premium rise may be unrelated to buying pressure. On the other side of every new call there is a writer, so OI added is also writer participation; only price tells you who was more aggressive.`,
      eg: {
        title: 'Buyers at 24,100 CE (illustrative)',
        text: `24,100 CE: OI +1,000 lots = 65,000 units, premium 90 to 118 (+28, +31.1%) as NIFTY rose 24,000 to 24,070. Cost of one lot at 118 = 118 × 65 = ₹7,670. Buyer breakeven = 24,100 + 118 = 24,218. A buyer who entered at 90 and sees 118 holds an unrealised gain of 28 × 65 = ₹1,820 per lot.`,
      },
      tip: `Rising premium and rising OI is call buying only if the index or IV can explain the premium. Otherwise stay sceptical.`,
      visual: {
        kind: 'payoff',
        title: 'Long 24,100 CE at ₹118 (per unit, expiry)',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24100, premium: 118 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 118, expiryPrice: 24400, lotSize: 65, lots: 1 },
        why: 'At an expiry value of 24,400 the buyer earns 300 − 118 = 182 per unit, ₹11,830 per lot.',
      },
    },
    {
      t: 4,
      def: `Put buying means new long put positions are being opened. Put OI rises and the put premium rises. Buyers expect NIFTY to fall below the strike by more than the premium, or they are buying protection.`,
      hi: `Put buying ka matlab naye long put positions khul rahi hain. Put OI badhta hai aur put premium bhi badhta hai. Buyers ko lagta hai ki NIFTY strike ke neeche premium se zyada girega, ya woh protection khareed rahe hain.`,
      how: `Not every put buyer is bearish. Investors with a portfolio often buy puts to insure it, which creates OI without implying that they expect a crash. The premium rise comes mainly from the index falling (delta) and from IV rising (vega), since IV tends to jump when markets fall. Read the pattern with IV: if IV rose sharply alongside, fear or hedging demand is probably part of the story.`,
      eg: {
        title: 'Buyers at 23,900 PE (illustrative)',
        text: `23,900 PE: premium 70 to 96 (+26, +37.1%), OI +1,200 lots, NIFTY 24,000 to 23,880. Cost of one lot at 96 = 96 × 65 = ₹6,240. Buyer breakeven = 23,900 − 96 = 23,804. If NIFTY expires at 23,600, the lot gains (23,900 − 23,600 − 96) × 65 = ₹13,260.`,
      },
      tip: `Put OI rising is not always a bearish bet. A portion is insurance against a long portfolio.`,
      visual: {
        kind: 'payoff',
        title: 'Long 23,900 PE at ₹96 (per unit, expiry)',
        spot: 24000,
        legs: [{ type: 'PE', side: 1, strike: 23900, premium: 96 }],
      },
    },
    {
      t: 5,
      def: `Call unwinding means holders of long calls are selling to exit. Call OI falls and the call premium falls. It signals that previous call buyers are giving up or booking profit.`,
      hi: `Call unwinding ka matlab long call holders sell karke nikal rahe hain. Call OI girta hai aur call premium bhi girta hai. Yeh dikhata hai ki purane call buyers haar maan rahe hain ya profit book kar rahe hain.`,
      how: `When a long exits, the trade closes a position only if the counterparty is a writer who is also closing. If the counterparty is a new buyer the OI does not fall (a transfer). So a net OI fall means closings exceeded openings on the day. Falling premium with falling OI is the usual footprint. It could be profit booking, stop-loss or approaching expiry; the chain cannot tell which.`,
      eg: {
        title: 'Longs leave 24,000 CE (illustrative)',
        text: `24,000 CE: OI −3,000 lots = 1,95,000 units, premium 110 to 84 (−26, −23.6%). A buyer who bought at 110 and exits at 84 loses 26 × 65 = ₹1,690 per lot. If all 1,95,000 units had been bought at 110 and sold at 84, the combined loss would be 1,95,000 × 26 = ₹50,70,000.`,
      },
      tip: `Unwinding is exit, not reversal. It does not say the index will fall.`,
      visual: {
        kind: 'flow',
        title: 'Call unwinding',
        steps: [
          { label: 'Longs sell calls', note: 'Closing', tone: 'ice' },
          { label: 'Writers buy back or new writers', note: 'Offsetting', tone: 'neutral' },
          { label: 'OI falls, premium falls', note: 'Net result', tone: 'gold' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 110, end: 84, years: 1 },
        why: 'Shows the 23.6% premium decline of the example.',
      },
    },
    {
      t: 6,
      def: `Put unwinding means holders of long puts are selling to exit. Put OI falls and the put premium falls. Put buyers are closing, perhaps because a fall did not happen or protection is no longer needed.`,
      hi: `Put unwinding ka matlab long put holders sell karke nikal rahe hain. Put OI girta hai aur put premium bhi girta hai. Put buyers position close kar rahe hain, shayad isliye ki girawat nahi aayi ya protection ki zaroorat nahi rahi.`,
      how: `Hedgers roll or close protection near expiry, which reduces put OI. Speculative put buyers exit when the market does not fall. Because both are possible, a fall in put OI with a falling premium suggests that the bearish or protective stance is lessening, but it is no guarantee of a rise.`,
      eg: {
        title: 'Longs leave 23,900 PE (illustrative)',
        text: `23,900 PE: OI −2,000 lots = 1,30,000 units, premium 88 to 70 (−18, −20.5%) as NIFTY rose 24,000 to 24,090. A holder who bought at 88 and exits at 70 loses 18 × 65 = ₹1,170 per lot. Across all 1,30,000 units, the aggregate premium given up is 1,30,000 × 18 = ₹23,40,000.`,
      },
      tip: `Put unwinding lowers the stored protection in the market, but it does not make the market go up.`,
      visual: {
        kind: 'bars',
        title: 'Put holders exiting 23,900 PE (₹ per unit)',
        unit: ' pts',
        items: [
          { label: 'Premium before', value: 88, tone: 'ice' },
          { label: 'Premium after', value: 70, tone: 'neutral' },
          { label: 'Fall', value: 18, tone: 'gold' },
        ],
      },
    },
    {
      t: 7,
      def: `Call short covering means call writers are buying back calls to close. Call OI falls while the call premium rises. Writers are exiting under pressure, often because the index is moving against them.`,
      hi: `Call short covering ka matlab call writers calls buy back karke close kar rahe hain. Call OI girta hai jabki call premium badhta hai. Writers pressure mein nikal rahe hain, aksar isliye ki index unke against ja raha hai.`,
      how: `A writer who has sold calls loses when the index rises, and margin requirements rise as premium rises. To limit loss, the writer buys the call back, which lifts the offer and the premium. If the other side is also closing, OI falls. Short covering can produce sharp rallies in premium over short periods because buyers (the covering writers) are price-insensitive. It cannot be separated from simple long buying using OI alone.`,
      eg: {
        title: 'Writers cover 24,000 CE (illustrative)',
        text: `24,000 CE: OI −2,400 lots = 1,56,000 units, premium 120 to 150 (+30, +25%) as NIFTY rises 24,000 to 24,080. A writer who sold at 120 and covers at 150 loses 30 × 65 = ₹1,950 per lot. If all 1,56,000 units were covered at a 30-point loss, the total is 1,56,000 × 30 = ₹46,80,000.`,
      },
      tip: `Short covering often fades once the covering is done; do not assume the rally continues just because it started.`,
      visual: {
        kind: 'candles',
        title: 'Rally through a call strike',
        caption: 'Writers at the strike cover as price pushes through it.',
        pattern: 'breakout',
        level: { price: 24000, label: '24,000 CE strike' },
      },
    },
    {
      t: 8,
      def: `Put short covering means put writers are buying back puts to close. Put OI falls while the put premium rises. Writers are exiting under pressure, usually because the index fell sharply.`,
      hi: `Put short covering ka matlab put writers puts buy back karke close kar rahe hain. Put OI girta hai jabki put premium badhta hai. Writers pressure mein nikal rahe hain, aksar isliye ki index tezi se gira.`,
      how: `When the index drops through a strike where put writers were sitting, their losses grow and margin rises. Some cover, which lifts the put premium and reduces OI. This often accompanies a rise in IV, so the premium increase is partly vega. As with the call side, a rising put premium with falling OI is consistent with covering, but a fall in OI could also come from long holders selling at higher prices.`,
      eg: {
        title: 'Writers cover 24,000 PE (illustrative)',
        text: `24,000 PE: OI −1,400 lots = 91,000 units, premium 95 to 118 (+23, +24.2%) as NIFTY slides 24,000 to 23,940. A writer who sold at 95 and covers at 118 loses 23 × 65 = ₹1,495 per lot. For all 91,000 units the loss would be 91,000 × 23 = ₹20,93,000.`,
      },
      tip: `Check IV before calling it covering. A put premium can rise purely because IV spiked.`,
      visual: {
        kind: 'candles',
        title: 'Break below a put strike',
        caption: 'Put writers at the strike are tested as price falls through it.',
        pattern: 'breakdown',
        level: { price: 24000, label: '24,000 PE strike' },
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'sell', strike: 24000, premium: 95, expiryPrice: 23882, lotSize: 65, lots: 1 },
        why: 'At expiry 23,882 the writer loses 118 − 95 = 23 per unit, matching the covering cost.',
      },
    },
    {
      t: 9,
      def: `Long build-up in CE means call premium rises and call OI rises together. It is the futures-style name for the same pattern as call buying: new longs are being added.`,
      hi: `CE mein long build-up ka matlab call premium aur call OI dono saath badh rahe hain. Yeh wahi pattern hai jise hum call buying kehte hain: naye longs add ho rahe hain.`,
      how: `The term is borrowed from futures, where price up with OI up means longs are building. For options the rule must be applied to the premium of a specific strike, not to the index, because the index and the premium can move differently (IV, time decay). The reading is a hypothesis, since a new writer sits on the other side of every new call. A further check is volume: build-up on strong volume is more convincing than on thin volume.`,
      eg: {
        title: 'Long build-up at 24,300 CE (illustrative)',
        text: `24,300 CE: OI +2,600 lots = 1,69,000 units, premium 45 to 62 (+17, +37.8%), volume large. NIFTY +60 points. A lot costs 62 × 65 = ₹4,030. Breakeven at expiry = 24,300 + 62 = 24,362. The gain per lot for a buyer from 45 to 62 is 17 × 65 = ₹1,105 on paper.`,
      },
      tip: `Futures build-up rules apply to futures. For options, use them only on the premium of one strike, and treat the output as a hypothesis.`,
      visual: {
        kind: 'matrix',
        title: 'Long build-up sits in one cell',
        xLabels: ['OI rises', 'OI falls'],
        yLabels: ['Premium rises', 'Premium falls'],
        cells: [
          { head: 'Long build-up', note: 'This topic', tone: 'gold' },
          { head: 'Short covering', tone: 'neutral' },
          { head: 'Short build-up', tone: 'neutral' },
          { head: 'Long unwinding', tone: 'neutral' },
        ],
      },
    },
    {
      t: 10,
      def: `Long build-up in PE means put premium rises and put OI rises together. It is the same pattern as put buying: new put longs are being added, for a bearish view or for protection.`,
      hi: `PE mein long build-up ka matlab put premium aur put OI dono saath badh rahe hain. Yeh put buying wala hi pattern hai: naye put longs add ho rahe hain, bearish view ke liye ya protection ke liye.`,
      how: `Because puts are used both for betting on falls and for insuring portfolios, a put long build-up can be hedging rather than bearishness. A sustained build-up in far OTM puts before an event (Budget, election result, RBI policy) is typically protective demand. It raises IV on the put side, which creates the "skew" you see on the chain. The reading remains a hypothesis; the writers sitting opposite are equally part of OI.`,
      eg: {
        title: 'Long build-up at 23,700 PE (illustrative)',
        text: `23,700 PE: OI +1,500 lots = 97,500 units, premium 40 to 55 (+15, +37.5%), NIFTY down 70 points. A lot costs 55 × 65 = ₹3,575. Breakeven at expiry = 23,700 − 55 = 23,645. A buyer who bought at 40 and sees 55 has an unrealised gain of 15 × 65 = ₹975 per lot.`,
      },
      tip: `Rising put OI is both fear and insurance; do not call it bearish without price and IV context.`,
      visual: {
        kind: 'compare',
        title: 'Why put OI can rise',
        left: { head: 'Directional bet', tone: 'bear', points: ['Expects a fall', 'Buys OTM puts', 'Exit when move done'] },
        right: { head: 'Protection', tone: 'ice', points: ['Holds a stock portfolio', 'Buys puts as insurance', 'Holds regardless of view'] },
      },
    },
    {
      t: 11,
      def: `Short build-up in CE means call premium falls while call OI rises. It is the same pattern as fresh call writing: new short call positions are being added.`,
      hi: `CE mein short build-up ka matlab call premium girta hai jabki call OI badhta hai. Yeh fresh call writing wala hi pattern hai: naye short call positions add ho rahe hain.`,
      how: `Call writers like OTM strikes above the market because the premium decays if NIFTY stays below. If OI at 24,400 CE rises while premium falls, writers are likely active. The caveat is that the premium may fall mainly because of time decay while OI rises for unrelated reasons, and spreads can create call OI as the short leg (the long leg being at a higher strike).`,
      eg: {
        title: 'Short build-up at 24,400 CE (illustrative)',
        text: `24,400 CE: OI +3,100 lots = 2,01,500 units, premium 30 to 22 (−8, −26.7%), NIFTY flat. A writer collects 22 × 65 = ₹1,430 per lot. Breakeven = 24,400 + 22 = 24,422. If NIFTY expires at 24,500, the loss per lot is (24,500 − 24,422) × 65 = ₹5,070.`,
      },
      tip: `Writers get a small premium for open-ended risk. Look at the breakeven, not the premium alone.`,
      visual: {
        kind: 'payoff',
        title: 'Short 24,400 CE at ₹22 (per unit, expiry)',
        spot: 24000,
        legs: [{ type: 'CE', side: -1, strike: 24400, premium: 22 }],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'sell', strike: 24400, premium: 22, expiryPrice: 24500, lotSize: 65, lots: 1 },
        why: 'Confirms the ₹5,070 per-lot loss at an expiry value of 24,500.',
      },
    },
    {
      t: 12,
      def: `Short build-up in PE means put premium falls while put OI rises. It is the same pattern as fresh put writing: new short put positions are being added.`,
      hi: `PE mein short build-up ka matlab put premium girta hai jabki put OI badhta hai. Yeh fresh put writing wala hi pattern hai: naye short put positions add ho rahe hain.`,
      how: `Put writers often sell OTM puts below the market, collecting premium that decays if NIFTY stays above the strike. Rising OI with falling premium fits that. Note again that spread legs, cash-secured stock strategies and hedge adjustments all create put OI; the exchange data does not label them. Read together with the index direction and VIX.`,
      eg: {
        title: 'Short build-up at 23,600 PE (illustrative)',
        text: `23,600 PE: OI +2,200 lots = 1,43,000 units, premium 28 to 21 (−7, −25%), NIFTY edges up. A writer collects 21 × 65 = ₹1,365 per lot. Breakeven = 23,600 − 21 = 23,579. If NIFTY closes at 23,400 at expiry, the loss per lot is (23,579 − 23,400) × 65 = ₹11,635.`,
      },
      tip: `Short put premium is small compared with the loss if the market falls hard. Size positions for the bad day.`,
      visual: {
        kind: 'payoff',
        title: 'Short 23,600 PE at ₹21 (per unit, expiry)',
        spot: 24000,
        legs: [{ type: 'PE', side: -1, strike: 23600, premium: 21 }],
      },
    },
  ],
  tools: [{ id: 'oi-buildup', why: 'Futures-style price and OI classifier; use only as a reference for the four-pattern grid.' }],
}
export default m
