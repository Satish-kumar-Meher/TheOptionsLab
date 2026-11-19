import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '5.2',
  intro:
    `Moneyness describes where a strike sits relative to the current index level: at the money (ATM), in the money (ITM) or out of the money (OTM). It decides how much of a premium is real value you could claim today (intrinsic value) and how much is a price paid for time and uncertainty. Examples use NIFTY at 24,000, 7 days to expiry, India VIX/IV 14%, rate 6.5%, lot 65 (check the current NSE contract specification) and Black-Scholes model values, which are illustrative and differ from live premiums.`,
  introHi:
    `Moneyness batata hai ki strike abhi ke index level ke relative kahan baitha hai: ATM, ITM ya OTM. Isse pata chalta hai ki premium ka kitna hissa aaj claim hone wali real value (intrinsic) hai aur kitna sirf time aur uncertainty ki keemat. Examples NIFTY 24,000, expiry mein 7 din, IV 14%, rate 6.5%, lot 65 (current NSE contract specification check karein) aur Black-Scholes model values par hain, jo illustrative hain aur live premium se alag hote hain.`,
  steps: {
    concept:
      `Moneyness compares the strike with the underlying price. A call is ITM when the index is above its strike, a put is ITM when the index is below its strike. An option whose strike equals (or is nearest to) the index is ATM; everything else is OTM. Moneyness is not a fixed label: it changes every time the index moves, so a strike that was OTM in the morning can be ITM by afternoon.`,
    conceptHi:
      `Moneyness strike ko underlying ke price se compare karta hai. Call ITM tab hota hai jab index uske strike se upar ho; put ITM tab hota hai jab index uske strike se neeche ho. Jo strike index ke barabar ya sabse paas ho wo ATM hai, baaki sab OTM. Yeh label fixed nahi hai: index hilte hi badal jata hai, isliye subah ka OTM strike dopahar tak ITM ho sakta hai.`,
    mechanism:
      `Premium = intrinsic value + time value. Intrinsic value for a call is max(index - strike, 0) and for a put is max(strike - index, 0). Time value is the rest: it is largest at the money, where the outcome at expiry is most uncertain, and shrinks as an option moves deeper ITM or deeper OTM, and as expiry approaches. NSE lists strikes at fixed steps (NIFTY commonly 50 points near the index, wider far away), so the ATM strike is simply the listed strike nearest to spot. Index options are European and cash-settled, so an ITM option at expiry is settled in cash for its intrinsic value and an OTM one expires worthless.`,
    example: {
      title: 'One NIFTY strike ladder at 24,000 (model values, 7 days)',
      text: `Calls: 23,800 CE is ITM, premium about ₹321.83 = intrinsic 200 + time value 121.83. 24,000 CE is ATM, ₹200.85, all time value. 24,200 CE is OTM, ₹113.55, all time value. For one lot of 65, the ATM call costs about 200.85 x 65 = ₹13,055 and the 24,200 call about 113.55 x 65 = ₹7,381. Puts mirror this: the 24,200 PE is ITM at about ₹283.40 (intrinsic 200 + time value 83.40) while the 23,800 PE is OTM at about ₹92.18.`,
    },
    chart: {
      kind: 'ladder',
      title: 'Call strikes around NIFTY 24,000',
      caption: 'For calls, strikes below spot are ITM, the strike at spot is ATM and strikes above spot are OTM. For puts the picture flips.',
      optType: 'CE',
      spot: 24000,
      strikes: [23600, 23800, 24000, 24200, 24400],
    },
    optionChain:
      `On a standard chain the ATM strike sits in the middle row, usually highlighted. Call ITM strikes appear above it (lower strike numbers) and put ITM strikes below it, so the shading forms a staircase on each side. Premiums are highest in the ITM rows but that is mostly intrinsic value; look at time value (premium minus intrinsic) to see how much you are really paying for the option part. OI and volume are usually busiest near ATM and a few strikes either side, but a busy strike is not automatically a support or resistance.`,
    psychology:
      `ITM options feel expensive, so beginners avoid them even though most of what they pay is real value. Far OTM options feel cheap and attract buyers who confuse a low rupee price with a low risk of loss; in fact a cheap option can lose 100% of its premium very quickly. ATM options feel balanced but carry the most time value, which is why time decay hurts them most in rupees.`,
    scenarios: {
      bullish:
        `If NIFTY rallies 100 points to 24,100 (time and IV unchanged), the model value of the 24,000 CE rises from ₹200.85 to about ₹258.03, a gain of ₹57.18 or 28.5%. The OTM 24,500 CE rises from ₹39.20 to about ₹58.13, a gain of ₹18.93 but 48.3%. Percentage gains are larger on OTM options, rupee gains and the probability of keeping value are larger on ATM and ITM ones.`,
      bearish:
        `If NIFTY falls 100 points to 23,900, the 24,000 CE drops to about ₹152.18 and the OTM 24,500 CE to about ₹25.53, a loss of 34.9% of its premium. ITM puts such as the 24,200 PE gain close to point for point, because their delta is high.`,
      sideways:
        `If NIFTY stays near 24,000, the ITM option keeps its intrinsic value and loses only time value, the ATM option loses its whole time value by expiry, and the OTM option decays towards zero. Sellers of ATM and OTM options keep the premium in that case, but they carry large risk if the index breaks out.`,
    },
    practice: [
      {
        q: `NIFTY is at 24,030. Classify the 23,900 CE, the 24,050 CE and the 24,000 PE (strike step 50).`,
        a: `23,900 CE: strike below spot by 130, so ITM. 24,050 CE: strike is 20 above spot and is the listed strike nearest to 24,030, so it is the ATM strike (technically 20 points OTM). 24,000 PE: strike is below spot, so a put is OTM by 30 points.`,
      },
      {
        q: `The 23,800 CE trades at ₹321.83 with NIFTY at 24,000. Split the premium and state the rupee value of each part for one lot of 65.`,
        a: `Intrinsic = 24,000 - 23,800 = 200. Time value = 321.83 - 200 = 121.83. Per lot: intrinsic 200 x 65 = ₹13,000; time value 121.83 x 65 = ₹7,919 (rounded). Only the time value is at risk of decaying if NIFTY stays flat.`,
      },
      {
        q: `A trader buys the 24,200 PE at ₹283.40. NIFTY is 24,000 and finishes expiry at 24,000. What is the result per lot?`,
        a: `At expiry the put is worth intrinsic 24,200 - 24,000 = 200. The loss per unit is 283.40 - 200 = 83.40, which is exactly the time value paid. Per lot: 83.40 x 65 = ₹5,421 loss (ignoring charges).`,
      },
      {
        q: `Compare the ₹ and % gain of the 24,000 CE and the 24,500 CE when NIFTY rises 100 points (model values: 200.85 to 258.03, and 39.20 to 58.13).`,
        a: `24,000 CE: 258.03 - 200.85 = ₹57.18, i.e. 57.18 / 200.85 = 28.5%. 24,500 CE: 58.13 - 39.20 = ₹18.93, i.e. 18.93 / 39.20 = 48.3%. Per lot: ₹3,717 versus ₹1,230. The cheaper option gained more in percent but far less in rupees, and it would have lost everything had NIFTY stayed flat to expiry.`,
      },
    ],
    assignment:
      `Open the Moneyness and Premium-split calculators. Pick spot 24,000 and the strikes 23,500, 23,800, 24,000, 24,200 and 24,500. For each, record CE and PE: ITM/ATM/OTM, intrinsic value and time value from the model (7 days, IV 14%). Draw the two time-value columns as a bar chart and write three sentences on where time value is highest and why.`,
  },
  topics: [
    {
      t: 1,
      def: `An option is at the money (ATM) when its strike price equals, or is the listed strike nearest to, the current index level. An ATM option has no intrinsic value, so its whole premium is time value. It is the reference point from which ITM and OTM are measured.`,
      hi: `Option ATM tab hota hai jab uska strike index ke current level ke barabar ho, ya listed strikes mein sabse paas ho. ATM option mein intrinsic value zero hoti hai, isliye poora premium time value hota hai. Isi ko reference maan kar ITM aur OTM naapte hain.`,
      how: `NSE lists NIFTY strikes at fixed steps (50 points near the index), so spot is rarely exactly on a strike; traders call the nearest listed strike the ATM strike. Many brokers highlight it on the chain and recompute as spot ticks. Because ATM options have the highest time value, they are the most sensitive to volatility and to time decay in rupee terms, and their delta is close to 0.5. The ATM strike keeps changing intraday, so "ATM" in a plan must be defined at a specific moment.`,
      eg: {
        title: 'Spot 24,030: which strike is ATM?',
        text: `With NIFTY at 24,030 and a 50-point strike step, the nearest strike is 24,050 (20 away; 24,000 is 30 away). Model values at 7 days, IV 14%: the 24,050 CE is about ₹190.85 and the 24,050 PE about ₹180.88, so the ATM straddle costs about ₹371.73 per unit. For a lot of 65 that is 371.73 x 65 = ₹24,162 (rounded). Both premiums are close to each other because neither side is far from spot.`,
      },
      tip: `"ATM" is a moving target. If you plan a trade at the ATM strike, note the spot at which you chose it, because an hour later a different strike may be ATM.`,
      visual: {
        kind: 'ladder',
        title: 'The ATM strike at spot 24,030',
        caption: 'The ATM strike is the listed strike nearest to spot. Here that is 24,050; strikes on either side are ITM or OTM.',
        optType: 'CE',
        spot: 24030,
        strikes: [23950, 24000, 24050, 24100, 24150],
      },
      calc: { id: 'moneyness', preset: { optType: 'CE', spot: 24030, strike: 24050 }, why: 'Shows how far the chosen strike is from spot and what it is called.' },
    },
    {
      t: 2,
      def: `An option is in the money (ITM) when exercising it would give a positive payoff right now: a call with strike below the index, or a put with strike above the index. Its premium contains intrinsic value plus some time value. ITM means "has value if settled today", not "will make a profit".`,
      hi: `Option ITM tab hota hai jab abhi settle karne par positive payoff mile: call ka strike index se neeche ho, ya put ka strike index se upar ho. Premium mein intrinsic value aur thodi time value dono hoti hain. ITM ka matlab hai "aaj settle ho toh value hai", yeh nahi ki profit pakka hai.`,
      how: `For a call, intrinsic value = index minus strike; for a put, strike minus index. This part moves almost one-for-one with the index when the option is well in the money, which is why ITM options have high delta. The buyer still pays the time value on top, so the break-even is the strike plus (or minus) the whole premium, not the strike itself. At expiry, NSE settles an ITM index option in cash at the settlement price; no shares or index units are delivered.`,
      eg: {
        title: 'The 23,800 CE with NIFTY at 24,000',
        text: `Model premium about ₹321.83 (7 days, IV 14%): intrinsic 24,000 - 23,800 = ₹200 and time value ₹121.83. One lot of 65 costs about 321.83 x 65 = ₹20,919. The break-even at expiry is 23,800 + 321.83 = 24,121.83. So although the call is already ITM by 200 points, the buyer needs NIFTY above about 24,122 at expiry to profit.`,
      },
      tip: `Do not confuse ITM with profitable. Compare the index with strike plus premium paid, not with the strike alone.`,
      visual: {
        kind: 'bars',
        title: 'Premium of the 23,800 CE split in two',
        caption: 'Illustrative model values per unit, NIFTY 24,000, 7 days, IV 14%.',
        unit: '₹',
        items: [
          { label: 'Intrinsic value', value: 200, tone: 'gold' },
          { label: 'Time value', value: 121.83, tone: 'ice' },
          { label: 'Total premium', value: 321.83, tone: 'neutral' },
        ],
      },
      calc: { id: 'premium-split', preset: { optType: 'CE', spot: 24000, strike: 23800, premium: 321.83 }, why: 'Splits the ITM premium into intrinsic and time value.' },
    },
    {
      t: 3,
      def: `An option is out of the money (OTM) when exercising it today would give nothing: a call with strike above the index, or a put with strike below it. Its premium is entirely time value, the price of the chance that the index moves far enough before expiry.`,
      hi: `Option OTM tab hota hai jab abhi exercise karne par kuch na mile: call ka strike index se upar, ya put ka strike index se neeche. Iska poora premium time value hota hai, yaani expiry se pehle index ke door tak jaane ke chance ki keemat.`,
      how: `An OTM option has zero intrinsic value, so if it expires OTM the buyer loses the entire premium and the seller keeps it. Its value depends on how likely the index is to cross the strike, which is driven by distance, time left and implied volatility. Because the premium is small, a given rupee move is a large percentage change, which is why OTM options look attractive and are also the most likely to expire worthless. The further OTM, the lower the delta and the smaller the chance of a payoff.`,
      eg: {
        title: 'The 24,200 CE with NIFTY at 24,000',
        text: `Model premium about ₹113.55 (7 days, IV 14%), all time value. One lot costs 113.55 x 65 = ₹7,381 (rounded). Break-even at expiry is 24,200 + 113.55 = 24,313.55, which is 313.55 points (about 1.3%) above spot. If NIFTY closes at 24,250 on expiry the call is worth 50 but the buyer still loses 63.55 per unit, about ₹4,131 per lot.`,
      },
      tip: `A low premium is not low risk. An OTM buyer can lose the full amount paid, and often does if the move arrives late or not at all.`,
      visual: {
        kind: 'payoff',
        title: 'Long 24,200 CE at expiry',
        caption: 'Loss is capped at the ₹113.55 premium; profit starts only above 24,313.55. Illustrative.',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24200, premium: 113.55 }],
      },
      calc: { id: 'breakeven', preset: { optType: 'CE', side: 'buy', strike: 24200, premium: 113.55 }, why: 'Finds the index level where this OTM buyer breaks even.' },
    },
    {
      t: 4,
      def: `A deep ITM option has a strike far below the index (for a call) or far above it (for a put). Its premium is almost all intrinsic value and its delta is close to 1 in absolute terms, so it behaves much like holding the underlying itself.`,
      hi: `Deep ITM option ka strike index se bahut door ITM side mein hota hai (call ke liye bahut neeche, put ke liye bahut upar). Iska premium lagbhag poora intrinsic value hota hai aur delta 1 ke kaafi paas hota hai, toh yeh underlying hold karne jaisa behave karta hai.`,
      how: `There is no fixed rule for "deep"; many traders use roughly 2% or more ITM, or a delta above about 0.8. Time value is small because the outcome is nearly certain, so decay hurts little and vega is low. The cost is a large capital outlay and low leverage compared with ATM or OTM options. Liquidity in deep ITM strikes on NSE is usually thinner, so bid-ask spreads can be wider; always check before trading.`,
      eg: {
        title: 'The 23,500 CE with NIFTY at 24,000',
        text: `Strike is 500 points (2.08%) below spot. Model premium about ₹557.84 = intrinsic 500 + time value 57.84, delta about 0.877. One lot costs 557.84 x 65 = ₹36,260 (rounded). If NIFTY rises 100 points the model value is about ₹647.54 (a gain of about ₹89.70 as delta rises towards 0.92), a move of about 16%, compared with 28.5% for the ATM call; the deep ITM call moves nearly point for point but needs much more capital.`,
      },
      tip: `Deep ITM options give high delta with little decay, but you pay for it in capital. They are not "safer"; a 500-point fall in NIFTY would still remove most of their value.`,
      visual: {
        kind: 'compare',
        title: 'Deep ITM vs ATM call (per unit, 7 days)',
        caption: 'Illustrative model values, NIFTY 24,000, IV 14%.',
        left: { head: '23,500 CE (deep ITM)', tone: 'gold', points: ['Premium about ₹557.84', 'Intrinsic ₹500, time value ₹57.84', 'Delta about 0.88', 'Lot cost about ₹36,260'] },
        right: { head: '24,000 CE (ATM)', tone: 'ice', points: ['Premium about ₹200.85', 'Intrinsic ₹0, time value ₹200.85', 'Delta about 0.53', 'Lot cost about ₹13,055'] },
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 23500, days: 7, iv: 14, rate: 6.5 }, why: 'Confirms the high delta and small time value of a deep ITM call.' },
    },
    {
      t: 5,
      def: `A deep OTM option has a strike far from the index on the unprofitable side. Its premium is tiny, its delta is close to zero and it needs a very large move to pay off. It behaves like a lottery ticket: small cost, small chance, possibly large percentage gain.`,
      hi: `Deep OTM option ka strike index se bahut door, unprofitable side mein hota hai. Premium bahut chhota, delta zero ke paas, aur payoff ke liye bahut bada move chahiye. Yeh lottery ticket jaisa hai: kam cost, kam chance, kabhi kabhi bada percentage gain.`,
      how: `Deep OTM options are cheap because the market assigns a low probability to the index reaching the strike before expiry. Their price reacts strongly to volatility: a jump in implied volatility can multiply the premium even without much index movement. They also lose value fast as expiry nears, because the time left to travel the distance shrinks. Sellers collect small premiums on them and face a risk that is small most days and very large on a shock day, which is why exchanges and brokers ask for margin on written options.`,
      eg: {
        title: 'The 24,500 CE with NIFTY at 24,000',
        text: `Strike is 500 points (2.08%) above spot. Model premium about ₹39.20 (IV 14%, 7 days), delta about 0.16, lot cost 39.20 x 65 = ₹2,548. If implied volatility rises to 20% with spot unchanged, the model premium becomes about ₹95.98, an increase of about 145%. With one day left and spot unchanged at 24,000, the same call is worth about ₹0.14, close to nothing.`,
      },
      tip: `Cheap does not mean good value. Count how often the required move actually happens and how fast time erodes the premium before you pay for a far OTM option.`,
      visual: {
        kind: 'bars',
        title: '24,500 CE premium under three conditions',
        caption: 'Illustrative model values per unit, spot 24,000.',
        unit: '₹',
        items: [
          { label: '7 days, IV 14%', value: 39.2, tone: 'neutral' },
          { label: '7 days, IV 20%', value: 95.98, tone: 'gold' },
          { label: '1 day, IV 14%', value: 0.14, tone: 'ice' },
        ],
      },
      calc: { id: 'lot-value', preset: { premium: 39.2, lotSize: 65, lots: 1, spot: 24000 }, why: 'Shows how small the capital at risk is, and that it can all be lost.' },
    },
    {
      t: 6,
      def: `CE moneyness uses this rule: a call is ITM if index > strike, ATM if index is at the strike, OTM if index < strike. Lower strikes are more in the money for calls. A call gains value as the index rises.`,
      hi: `CE ke liye rule yeh hai: index > strike ho toh ITM, index strike ke barabar ho toh ATM, index < strike ho toh OTM. Call ke liye jitna neeche strike, utna zyada ITM. Index badhne par call ki value badhti hai.`,
      how: `On the call side of an NSE chain, the strikes below the index are ITM and the strikes above are OTM. Intrinsic value = max(index - strike, 0). The call buyer's profit at expiry = max(index - strike, 0) minus the premium paid; the writer's result is the reverse. Moneyness changes the call's delta: deep ITM calls approach 1, ATM calls are near 0.5, far OTM calls approach 0.`,
      eg: {
        title: 'Four calls, one index level',
        text: `NIFTY 24,000, 7 days, IV 14% (model): 23,500 CE ITM at ₹557.84, delta 0.877; 23,800 CE ITM at ₹321.83, delta 0.693; 24,000 CE ATM at ₹200.85, delta 0.530; 24,200 CE OTM at ₹113.55, delta 0.362; 24,500 CE OTM at ₹39.20, delta 0.161. Delta falls steadily as the strike rises.`,
      },
      tip: `Calls: strike below spot means ITM, above spot means OTM. Say it out loud once and you will not mix it up with puts.`,
      visual: {
        kind: 'ladder',
        title: 'CE moneyness at spot 24,000',
        caption: 'Calls become more ITM as the strike falls below spot.',
        optType: 'CE',
        spot: 24000,
        strikes: [23500, 23800, 24000, 24200, 24500],
      },
      calc: { id: 'moneyness', preset: { optType: 'CE', spot: 24000, strike: 23800 }, why: 'Classifies a call strike and shows its percentage distance from spot.' },
    },
    {
      t: 7,
      def: `PE moneyness is the mirror image: a put is ITM if index < strike, ATM if index is at the strike, OTM if index > strike. Higher strikes are more in the money for puts. A put gains value as the index falls.`,
      hi: `PE ke liye rule ulta hai: index < strike ho toh ITM, index strike ke barabar ho toh ATM, index > strike ho toh OTM. Put ke liye jitna upar strike, utna zyada ITM. Index girne par put ki value badhti hai.`,
      how: `On the put side of the chain the ITM strikes are the ones above the index. Intrinsic value = max(strike - index, 0). Because the index cannot fall below zero, a put's maximum possible value is its strike (less the premium paid), whereas a call's upside has no fixed ceiling. Put premiums near ATM are usually a little different from call premiums because of interest rates, dividends and the volatility skew, which makes puts slightly richer in many markets.`,
      eg: {
        title: 'Four puts, one index level',
        text: `NIFTY 24,000, 7 days, IV 14% (model): 24,500 PE ITM at ₹508.68, delta -0.839; 24,200 PE ITM at ₹283.40, delta -0.638; 24,000 PE ATM at ₹170.95, delta -0.471; 23,800 PE OTM at ₹92.18, delta -0.307; 23,500 PE OTM at ₹28.56, delta -0.123. Note that the model uses a flat IV, while the real market often charges more for downside puts.`,
      },
      tip: `Puts are ITM when the strike is above spot. The sign of the index move you want is the opposite of a call buyer's.`,
      visual: {
        kind: 'ladder',
        title: 'PE moneyness at spot 24,000',
        caption: 'Puts become more ITM as the strike rises above spot.',
        optType: 'PE',
        spot: 24000,
        strikes: [23500, 23800, 24000, 24200, 24500],
      },
      calc: { id: 'moneyness', preset: { optType: 'PE', spot: 24000, strike: 24200 }, why: 'Classifies a put strike and shows how far ITM it is.' },
    },
    {
      t: 8,
      def: `Moneyness affects premium in two ways. First, ITM options carry intrinsic value, so their premium is higher. Second, time value is largest at the money and falls as the option moves ITM or OTM. So premium falls steadily for calls as the strike rises, but the portion that is time value peaks near ATM.`,
      hi: `Moneyness premium ko do tareeke se affect karta hai. Pehla, ITM options mein intrinsic value hoti hai, isliye premium zyada. Doosra, time value ATM par sabse zyada hoti hai aur ITM ya OTM jaane par ghatti hai. Isliye call ka premium strike badhne par girta hai, lekin time value ka hissa ATM ke paas sabse bada hota hai.`,
      how: `Move along the chain and two things change at once. Total premium follows intrinsic value plus a bell-shaped time value centred near ATM. Delta also changes with moneyness, which is why ITM premiums move more in rupees but OTM premiums move more in percent. Implied volatility (IV) and days to expiry scale the whole time-value curve: higher IV or more days raise it, and the curve narrows and sharpens as expiry nears. In real markets the skew adds a further pattern, with IV often differing across strikes, so model values are a guide, not a quote.`,
      eg: {
        title: 'Time value across the call strikes',
        text: `NIFTY 24,000, 7 days, IV 14% (model): 23,500 CE time value ₹57.84; 23,800 CE ₹121.83; 24,000 CE ₹200.85; 24,200 CE ₹113.55; 24,500 CE ₹39.20. Time value peaks at the ATM strike and is smaller on both sides. A trader who buys the 23,500 CE pays mostly for intrinsic value, whereas the buyer of the 24,000 CE pays only for time and uncertainty.`,
      },
      tip: `Before buying any strike, compute time value (premium minus intrinsic). It tells you how much of your money can decay away if the index does not move.`,
      visual: {
        kind: 'bars',
        title: 'Time value of calls by strike',
        caption: 'Time value per unit, NIFTY 24,000, 7 days, IV 14%. Illustrative model values.',
        unit: '₹',
        items: [
          { label: '23,500 CE (deep ITM)', value: 57.84, tone: 'ice' },
          { label: '23,800 CE (ITM)', value: 121.83, tone: 'ice' },
          { label: '24,000 CE (ATM)', value: 200.85, tone: 'gold' },
          { label: '24,200 CE (OTM)', value: 113.55, tone: 'ice' },
          { label: '24,500 CE (deep OTM)', value: 39.2, tone: 'ice' },
        ],
      },
      calc: { id: 'premium-split', preset: { optType: 'CE', spot: 24000, strike: 24200, premium: 113.55 }, why: 'Lets you compare the time value of different strikes one by one.' },
    },
  ],
  tools: [{ id: 'premium-split', preset: { optType: 'CE', spot: 24000, strike: 24000, premium: 200.85 }, why: 'Intrinsic and time value for any strike.' }],
}
export default m
