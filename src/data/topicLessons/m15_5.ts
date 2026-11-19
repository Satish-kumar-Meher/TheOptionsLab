import type { ModuleLesson } from '../topicLessonTypes'

/* Module 15.5 — Advanced OI Scenarios.
 * All price, OI and premium figures are constructed for teaching (illustrative; lakh = 1,00,000). NIFTY ≈ 24,000, lot 65.
 * The oi-buildup calculator holds futures build-up rules; here it is used only as a rough label for the strike-level heuristic. */
const m: ModuleLesson = {
  moduleId: '15.5',
  intro: `This module takes ten common combinations of index move and call or put OI change and studies each one separately. For every scenario the lesson asks the same eight questions: price, OI, volume, premium, IV, likely participants, alternative explanations, and what would confirm or invalidate. The answers are always probable readings; open interest never names who is behind a trade.`,
  introHi: `Is module mein index ke move aur call ya put OI ke change ke das common combinations ko alag-alag padha gaya hai. Har scenario mein wahi aath sawal poochhe jaate hain: price, OI, volume, premium, IV, kaun participants ho sakte hain, alternative explanations, aur kya confirm ya invalidate karega. Jawab hamesha probable reading hote hain; open interest kabhi nahi batata ki trade ke peeche kaun hai.`,
  steps: {
    concept: `Every OI scenario is a pair: what the index did and what the OI on one side did. The same pair can have two or three different explanations. For example, falling index with rising call OI can be fresh call writing (a cap) or fresh call buying (a rebound bet). The premium, IV and volume break the tie in most cases, and a second snapshot checks the answer. A good analyst writes the main reading, the alternative and the test that separates them.`,
    conceptHi: `Har OI scenario ek jodi hota hai: index ne kya kiya aur ek side ke OI ne kya kiya. Ek hi jodi ke do ya teen alag explanations ho sakte hain. Jaise index gir raha ho aur call OI badh raha ho, toh yeh fresh call writing (cap) bhi ho sakti hai aur fresh call buying (rebound bet) bhi. Premium, IV aur volume zyada tar tie tod dete hain, aur doosra snapshot jawab check karta hai. Achha analyst main reading, alternative aur woh test likhta hai jo dono ko alag karta hai.`,
    mechanism: `A rise or fall in OI means contracts were created or closed. The premium shows which side was more aggressive. The index move explains part of the premium change through delta, so subtract it mentally: a call premium that rises less than delta suggests would imply is being sold. IV moves show whether the demand for options as insurance is changing. Because market makers hedge with futures and with other options, a part of the OI change is mechanical and not a directional opinion.`,
    example: {
      title: 'Nifty rises and CE OI falls (illustrative)',
      text: `NIFTY goes from 24,000 to 24,120 (+0.5%). The 24,200 CE OI falls from 14.0 to 11.9 lakh (−15%), LTP rises from ₹30 to ₹44 (+46.7%), volume is above normal and IV is up one point. Price: up. OI: down. Premium: up more than the index move alone suggests. The most likely reading is call short covering by writers. Alternative: long calls exited, but then the premium would fall. Confirmation: the index holds above 24,150 while OI keeps falling. Invalidation: OI is rebuilt at 24,200 and the index drops back.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Index direction vs call OI direction',
      caption: 'First-pass labels for a call strike near the market. Premium and volume decide among them; all are probable readings.',
      xLabels: ['Call OI rises', 'Call OI falls'],
      yLabels: ['Index rises', 'Index falls'],
      cells: [
        { head: 'Fresh call buying or writing', note: 'Premium rising suggests buying, flat or falling suggests writing', tone: 'gold' },
        { head: 'Call short covering', note: 'Writers buy back as price rises', tone: 'bull' },
        { head: 'Fresh call writing', note: 'A cap on the rebound, or rebound-bet buying', tone: 'bear' },
        { head: 'Call long liquidation', note: 'Buyers leave as price falls', tone: 'neutral' },
      ],
    },
    optionChain: `Put the call and put sides next to each other and read all four numbers per strike: LTP change, OI change, volume and IV. Do this for the ATM and two strikes each way. A scenario is more reliable when ATM and the neighbouring strikes agree and when the PCR or the net change on both sides tells a consistent story. Use two snapshots, not one.`,
    psychology: `Writers worry about the strike they sold; buyers worry about decay. When the index moves fast, the side that is wrong rushes to exit, and the side that is right adds. That is why OI scenarios often show cascades: covering lifts price, which forces more covering. The retail trap is to read one scenario as a forecast. The market maker and the hedger on the other side may have no opinion at all.`,
    scenarios: {
      bullish: `Rise with falling call OI and rising put OI: possible covering above and new support below. This is the cleanest bullish picture, and it still fails if the index closes back under the new put zone.`,
      bearish: `Fall with rising call OI and falling put OI: possible new ceiling and abandoned support. It fails if the index recovers and call OI falls.`,
      sideways: `Both sides' OI rising with a flat index and falling premiums suggest writing of both calls and puts. It may hold until news arrives or IV jumps; writers do not always win.`,
    },
    practice: [
      {
        q: `NIFTY +0.5%, 24,100 CE OI 9.0 → 10.8 lakh, LTP ₹70 → ₹91. Compute both changes and give the main reading and one alternative.`,
        a: `OI +1.8 / 9.0 = +20%. LTP +21 / 70 = +30%. The premium rise is larger than a delta-only gain on a 0.5% move would suggest, so fresh call buying is the main reading. Alternative: writers rolled in different strikes and the net effect looks like buying. Test: next snapshot shows continued rise and neighbouring strikes agree.`,
      },
      {
        q: `NIFTY −0.4%, 24,100 CE OI 8 → 10 lakh, LTP ₹45 → ₹30. Compute changes and interpret.`,
        a: `OI +2 / 8 = +25%, LTP −15 / 45 = −33.3%. The index fall explains some of the premium drop but the OI rise indicates new contracts, with sellers more aggressive: fresh call writing, a possible cap. Alternative: call buyers betting on a rebound would have pushed the premium up, so less likely here.`,
      },
      {
        q: `NIFTY flat. 24,100 CE OI +15%, 23,900 PE OI +18%, both LTPs down. Name the likely structure and the main risk.`,
        a: `Writing of both sides, a strangle-like short volatility positioning (also may be a hedged market-maker book). Risk: a news shock or a jump in IV hurts writers on whichever side breaks, so the structure is not safe.`,
      },
      {
        q: `On expiry day both call and put OI fall by 10% in the last two hours. Give two possible explanations.`,
        a: `Writers closing to avoid last-minute risk and positions being squared off to avoid settlement. It is also normal as expiring contracts disappear from the data. It does not by itself forecast direction.`,
      },
    ],
    assignment: `Choose five past sessions from your own chart records. For each, label the scenario (one of the ten), write the main reading and one alternative using the eight-point checklist, then check what the index did over the next hour. Count how often the main reading was right, and write which scenario you misread most.`,
  },
  topics: [
    {
      t: 1,
      def: `When the index rises and call OI falls at nearby strikes, call writers are probably buying back their positions, because their losses are growing. This is called call short covering. It can briefly add to the buying pressure.`,
      hi: `Jab index upar jaata hai aur nearby strikes par call OI girta hai, toh shaayad call writers apni positions wapas khareed rahe hain kyunki unke loss badh rahe hain. Ise call short covering kehte hain. Isse thodi der ke liye buying pressure badh sakta hai.`,
      how: `Price is up, call premium is up and OI is down. Writers who sold at lower premiums now buy back at higher prices, which lifts the premium further. IV often ticks up as well. Participants could be both retail writers hitting stops and larger traders reducing hedges. The alternative is long-call profit booking, but that tends to push the premium down, not up, so the premium's direction separates the two. Confirm with the next snapshot and the index holding the gain.`,
      eg: {
        title: 'NIFTY +0.5%, 24,200 CE OI −15% (illustrative)',
        text: `NIFTY 24,000 to 24,120. 24,200 CE OI 14.0 to 11.9 lakh (−15%), LTP ₹30 to ₹44 (+46.7%), IV +1 point. A writer who sold at ₹30 and covers at ₹44 loses 14 × 65 = ₹910 per lot. Confirmation: index holds above 24,150 with OI still falling. Invalidation: OI is rebuilt at 24,200 while the index slips back.`,
      },
      tip: `Covering lifts a market only while there are writers left to cover; look for fresh put support to carry the move.`,
      visual: { kind: 'candles', title: 'Rally while the call ceiling thins', pattern: 'uptrend', level: { price: 24200, label: 'Call OI 24,200 falling' } },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.5, oiChangePct: -15 }, why: 'Price up with OI down: the short-covering label.' },
    },
    {
      t: 2,
      def: `When the index rises and put OI increases, new put contracts are being created while the market goes up. Most often it is put writing, with writers comfortable that the market stays above a level. It can also be hedging or put buying.`,
      hi: `Jab index upar jaata hai aur put OI badhta hai, toh market ke upar jaate hue naye put contracts ban rahe hain. Aksar yeh put writing hoti hai, jisme writers ko lagta hai ki market ek level ke upar rahega. Yeh hedging ya put buying bhi ho sakti hai.`,
      how: `In a rising market a put premium falls from delta and decay. If OI also rises and the premium falls, writers are probably the aggressive side. The strike where OI builds shows where they accept risk. Hedgers buying puts against long portfolios can also raise OI, but in a rising market they tend to be fewer. Check IV: a falling IV is consistent with writers; a rising IV on puts suggests buying demand.`,
      eg: {
        title: 'NIFTY +0.4%, 24,000 PE OI +25% (illustrative)',
        text: `NIFTY 24,000 to 24,096. 24,000 PE OI 10.0 to 12.5 lakh (+25%), LTP ₹55 to ₹38 (−30.9%). Likely fresh put writing and a dynamic support forming. Alternative: a hedge by someone long the market. Confirmation: OI keeps rising on the next snapshot while premiums stay low. Invalidation: index drops through 24,000 with the OI falling.`,
      },
      tip: `Rising put OI in a rising market is the standard supportive pattern, but writers can be wrong and then they sell.`,
      visual: {
        kind: 'oi',
        title: 'Put OI building under a rising market (illustrative lakh)',
        spot: 24096,
        rows: [
          { strike: 23900, ce: 3, pe: 9 },
          { strike: 24000, ce: 8, pe: 12.5 },
          { strike: 24100, ce: 11, pe: 5 },
          { strike: 24200, ce: 13, pe: 2 },
        ],
      },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.4, oiChangePct: 25 }, why: 'Index and OI both up (strike-level heuristic).' },
    },
    {
      t: 3,
      def: `When the index rises and call OI also rises, two readings compete: fresh call buying (momentum) or fresh call writing (a ceiling being set). The premium and volume decide which is more likely.`,
      hi: `Jab index upar jaata hai aur call OI bhi badhta hai, toh do readings aamne-saamne hote hain: fresh call buying (momentum) ya fresh call writing (ceiling ban rahi hai). Premium aur volume batate hain ki kaun zyada probable hai.`,
      how: `If the call premium rises faster than the delta gain and IV rises, buyers are more aggressive: a momentum picture. If the premium lags or falls while OI rises, writers are selling into the rally: a cap. The strike matters too: OI rising at a far OTM strike with a small premium is often speculative buying; OI rising at the nearest strike above with a flat premium is often writing. Since both exist in every contract, call it the dominant side, not the only one.`,
      eg: {
        title: 'NIFTY +0.5%, 24,100 CE OI +20% (illustrative)',
        text: `NIFTY 24,000 to 24,120. 24,100 CE OI 9.0 to 10.8 lakh (+20%), LTP ₹70 to ₹91 (+30%), volume 2.5 times average. The premium gain is large; buying is the main reading. If LTP had stayed near ₹70 with the same OI rise, writing would be the main reading. Confirmation: next snapshot shows premium still strong and the nearby strikes also add OI.`,
      },
      tip: `Premium divided by what delta alone would give is the tie-breaker: stronger than delta means buying, weaker means writing.`,
      visual: {
        kind: 'compare',
        title: 'Same OI rise, two readings',
        left: { head: 'Fresh call buying', tone: 'bull', points: ['Premium rises faster than delta', 'IV ticks up', 'Volume well above normal', 'Often far OTM strikes'] },
        right: { head: 'Fresh call writing', tone: 'bear', points: ['Premium flat or lagging', 'IV flat or lower', 'Concentrated at one strike', 'Often the nearest ceiling'] },
      },
      calc: { id: 'oi-buildup', preset: { priceChangePct: 0.5, oiChangePct: 20 }, why: 'Price up, OI up: either buying or writing.' },
    },
    {
      t: 4,
      def: `When the index falls and put OI decreases, put contracts are closing while the market drops. It may be put writers covering a broken support, or put buyers selling. The put premium direction tells them apart.`,
      hi: `Jab index girta hai aur put OI ghat-ta hai, toh market girte waqt put contracts band ho rahe hain. Yeh toot chuke support par put writers ka cover karna ho sakta hai, ya put buyers ka bechna. Put premium ki direction se farq pata chalta hai.`,
      how: `In a falling market put premiums normally rise. If OI falls and the premium rises, writers are buying back (covering): the support is failing. If OI falls and the premium falls, buyers are leaving and the fall may be tiring. Watch whether lower strikes then see fresh put OI. The first is a warning for the bulls, the second a possible stabilising sign. Neither predicts the next move on its own.`,
      eg: {
        title: 'NIFTY −0.5%, 23,900 PE OI −15% (illustrative)',
        text: `NIFTY 24,000 to 23,880. 23,900 PE OI 11.0 to 9.35 lakh (−15%), LTP ₹60 to ₹78 (+30%). Writers are probably covering. A writer who sold at ₹60 and covers at ₹78 loses 18 × 65 = ₹1,170 per lot. Confirmation: OI at 23,800 does not rise while price keeps falling. Invalidation: new put OI builds at 23,800 and the index bounces.`,
      },
      tip: `Falling put OI with a rising put premium means defenders are being forced out; the next question is who defends lower.`,
      visual: { kind: 'candles', title: 'Fall through an abandoned put zone', pattern: 'breakdown', level: { price: 23900, label: 'Put OI 23,900 falling' } },
      calc: { id: 'oi-buildup', preset: { priceChangePct: -0.5, oiChangePct: -15 }, why: 'Price down, OI down.' },
    },
    {
      t: 5,
      def: `When the index falls and call OI rises, new call contracts are appearing as the market declines. The main reading is fresh call writing: sellers set a cap above. An alternative is call buying in the hope of a rebound.`,
      hi: `Jab index girta hai aur call OI badhta hai, toh market ke girte hue naye call contracts ban rahe hain. Main reading fresh call writing hai: sellers upar ek cap laga rahe hain. Alternative hai rebound ki ummeed mein call buying.`,
      how: `As price falls, calls lose value; writers who sell them at the nearer strike collect premium with delta in their favour. If OI rises while the premium falls faster than the index move alone would justify, the writing reading is stronger. A rebound buyer would push premium up. The new call OI above the market creates a possible ceiling zone for the session, but a sharp reversal can trap the new writers and lead to covering.`,
      eg: {
        title: 'NIFTY −0.4%, 24,100 CE OI +25% (illustrative)',
        text: `NIFTY 24,000 to 23,904. 24,100 CE OI 8 to 10 lakh (+25%), LTP ₹45 to ₹30 (−33.3%). Fresh writing is the main reading. If NIFTY then rallies above 24,100 and OI drops, the new writers are being forced to cover and the cap is gone.`,
      },
      tip: `A cap built in a falling market is only as strong as the first sharp rally it survives.`,
      visual: { kind: 'candles', title: 'Falling market, new call ceiling', pattern: 'downtrend', level: { price: 24100, label: 'Call OI 24,100 rising' } },
      calc: { id: 'oi-buildup', preset: { priceChangePct: -0.4, oiChangePct: 25 }, why: 'Price down, OI up.' },
    },
    {
      t: 6,
      def: `When the index falls and put OI rises, new puts are being created while the market declines. It can be put buying (bearish bets or hedges) or put writing (an expectation of a bounce). The premium and IV help separate them.`,
      hi: `Jab index girta hai aur put OI badhta hai, toh girte market mein naye puts ban rahe hain. Yeh put buying (bearish bets ya hedges) ya put writing (bounce ki ummeed) ho sakti hai. Premium aur IV se farq samajhne mein madad milti hai.`,
      how: `Put premium usually rises in a fall. If it rises more than delta predicts and IV jumps, buyers dominate: fear is being bought. If the premium barely rises or falls and OI climbs, writers are absorbing the fall and may be building a floor. Hedgers add to both. The pattern is therefore the most ambiguous of the ten, and you need the next snapshot and the index reaction at the strike.`,
      eg: {
        title: 'NIFTY −0.6%, 23,900 PE OI +20% (illustrative)',
        text: `NIFTY 24,000 to 23,856. 23,900 PE OI 12.0 to 14.4 lakh (+20%), LTP ₹55 to ₹98 (+78%). The big premium rise points to buying (speculative or hedge) with higher IV. If instead LTP had been ₹55 to ₹50, writers would be the likelier source. Confirmation: put OI keeps rising and the index closes below 23,900.`,
      },
      tip: `Put OI rising in a fall can be fear or insurance, so wait for the index to react at the strike.`,
      visual: {
        kind: 'compare',
        title: 'Falling index, rising put OI: two readings',
        left: { head: 'Puts bought (fear or hedge)', tone: 'bear', points: ['Premium jumps more than delta', 'IV usually rises', 'Volume above normal', 'Hedgers add too'] },
        right: { head: 'Puts written (floor-building)', tone: 'bull', points: ['Premium barely rises or falls', 'IV flat or easing', 'OI concentrated at one strike', 'Expect a bounce, or hedged'] },
      },
      calc: { id: 'oi-buildup', preset: { priceChangePct: -0.6, oiChangePct: 20 }, why: 'Price down, OI up.' },
    },
    {
      t: 7,
      def: `When both call and put OI increase, the market is adding positions on both sides. This may be option writers building a range (selling both a call and a put) or buyers positioning for a big move (buying both). IV and premium direction tell which.`,
      hi: `Jab call aur put dono ka OI badhta hai, toh market dono taraf positions jod raha hai. Yeh option writers ka range banana ho sakta hai (call aur put dono bechna) ya buyers ka bade move ki taiyari (dono khareedna). IV aur premium ki direction se farq pata chalta hai.`,
      how: `If the premiums of both sides fall and IV eases, writers of strangles or straddles are likely: they expect the index to stay between the strikes. If both premiums and IV rise ahead of an event, buyers of straddles or strangles dominate. Market makers also add both sides through client flow. The structure is not safe for writers: a sudden event can move one side far beyond the premium collected.`,
      eg: {
        title: 'Flat index, both sides up (illustrative)',
        text: `NIFTY flat near 24,000. 24,100 CE OI +15% and 23,900 PE OI +18%, both LTP down about 12%. This looks like a writer's strangle with breakevens beyond 24,100 and 23,900 by the premium collected. If a result day or policy announcement arrives and VIX jumps 3 points, both short legs lose together, which is the risk of this structure.`,
      },
      tip: `Both sides rising means range or event positioning: check IV and the calendar before picking which.`,
      visual: {
        kind: 'payoff',
        title: 'Short strangle: sell 24,100 CE at ₹40 and 23,900 PE at ₹36',
        caption: 'Illustrative premiums; breakevens at 24,176 and 23,824.',
        spot: 24000,
        legs: [
          { type: 'CE', side: -1, strike: 24100, premium: 40 },
          { type: 'PE', side: -1, strike: 23900, premium: 36 },
        ],
      },
    },
    {
      t: 8,
      def: `When both call and put OI decrease, participants are closing positions on both sides. Common reasons are expiry approaching, profit booking after a move, risk reduction before an event, and a fall in participation.`,
      hi: `Jab call aur put dono ka OI ghat-ta hai, toh participants dono taraf ki positions band kar rahe hain. Common wajah hain: expiry paas aana, move ke baad profit booking, event se pehle risk kam karna, aur participation ka girna.`,
      how: `In the last hours of expiry day OI disappears naturally as contracts are closed or settled. Earlier in the week, a joint fall suggests that both writers and buyers are stepping back. A smaller OI means fewer reference levels and sometimes more fragile price action. The pattern does not tell you the direction; use the index structure and the VIX to look for what comes next.`,
      eg: {
        title: 'Last two hours of expiry (illustrative)',
        text: `On expiry day the 24,000 CE OI falls 10% and the 24,000 PE OI falls 10% in the last two hours, with the index near 24,010. Writers close the near-expiry options to remove gamma risk and traders square off to avoid settlement. It is a mechanical end-of-life pattern, not a view.`,
      },
      tip: `Compare with the same time on earlier expiry days before calling a joint OI fall unusual.`,
      visual: {
        kind: 'bars',
        title: 'OI by time on expiry day (illustrative, index 100 at 1:30 pm)',
        unit: '',
        items: [
          { label: '1:30 pm', value: 100, tone: 'neutral' },
          { label: '2:30 pm', value: 94, tone: 'gold' },
          { label: '3:30 pm', value: 90, tone: 'ice' },
        ],
      },
    },
    {
      t: 9,
      def: `When call OI decreases while put OI increases, the positioning is shifting from the upper side to the lower side. Call writers may be covering and put writers adding. The picture is constructive for the bulls, though it is only a positioning reading.`,
      hi: `Jab call OI ghat-ta hai aur put OI badhta hai, toh positioning upar wali side se neeche wali side ki taraf shift ho rahi hai. Call writers cover kar rahe hain aur put writers add kar rahe hain. Tasveer bulls ke liye achhi hai, lekin yeh sirf positioning ki reading hai.`,
      how: `This often appears during an advance: the ceiling above thins and a floor builds beneath. The net effect is seen in the PCR rising. It is a shift in the balance of positions, not a promise of further gains. The risk is that a retreat in price makes the new put writers uncomfortable, and then covering can reverse the pattern.`,
      eg: {
        title: 'Call −12%, put +20% (illustrative)',
        text: `24,100 CE OI 10.0 to 8.8 lakh (−12%) and 23,900 PE OI 10.0 to 12.0 lakh (+20%). PCR on those two strikes goes from 10 / 10 = 1.0 to 12 / 8.8 = 1.36. The balance moved toward puts. Confirmation: the index holds above 24,000. Invalidation: close below 23,900 with put OI falling.`,
      },
      tip: `A rising PCR from this pattern is a shift in positioning; do not treat a PCR number alone as a forecast.`,
      visual: {
        kind: 'bars',
        title: 'Strike-level OI change (illustrative lakh)',
        unit: 'L',
        items: [
          { label: '24,100 CE before', value: 10, tone: 'bear' },
          { label: '24,100 CE after', value: 8.8, tone: 'bear' },
          { label: '23,900 PE before', value: 10, tone: 'bull' },
          { label: '23,900 PE after', value: 12, tone: 'bull' },
        ],
      },
      calc: { id: 'pcr', preset: { putOI: 1200000, callOI: 880000, putVol: 1500000, callVol: 1400000 }, why: 'PCR after the shift: 12 / 8.8.' },
    },
    {
      t: 10,
      def: `When put OI decreases while call OI increases, positioning moves from the lower side to the upper side. Put writers may be covering and call writers adding. The picture is cautious or bearish but remains only a positioning reading.`,
      hi: `Jab put OI ghat-ta hai aur call OI badhta hai, toh positioning neeche wali side se upar wali side ki taraf shift hoti hai. Put writers cover kar rahe hain aur call writers add kar rahe hain. Tasveer cautious ya bearish hai, par yeh bhi sirf positioning ki reading hai.`,
      how: `The floor under the market thins as the ceiling above thickens. The PCR falls. It often accompanies a weakening market or a stalled rally. A bounce that closes back above the call zone with call OI falling changes the story quickly. As always, check the next snapshot and IV before acting.`,
      eg: {
        title: 'Put −15%, call +20% (illustrative)',
        text: `23,900 PE OI 12.0 to 10.2 lakh (−15%) and 24,100 CE OI 10.0 to 12.0 lakh (+20%). Ratio of put to call OI on the two strikes goes from 12 / 10 = 1.2 to 10.2 / 12 = 0.85. Positioning has tilted toward calls. Confirmation: index fails to hold above 24,000. Invalidation: index closes above 24,100 with call OI falling.`,
      },
      tip: `A falling PCR from this pattern shows tilt, not certainty; the price decides which side was right.`,
      visual: {
        kind: 'flow',
        title: 'How the tilt builds',
        steps: [
          { label: 'Put OI falls', note: 'Floor thins', tone: 'bull' },
          { label: 'Call OI rises', note: 'Ceiling thickens', tone: 'bear' },
          { label: 'PCR falls', note: '1.2 to 0.85 here', tone: 'gold' },
          { label: 'Check price', note: 'Does the index confirm?', tone: 'neutral' },
        ],
      },
      calc: { id: 'pcr', preset: { putOI: 1020000, callOI: 1200000, putVol: 1400000, callVol: 1500000 }, why: 'PCR after the shift: 10.2 / 12.' },
    },
  ],
}
export default m
