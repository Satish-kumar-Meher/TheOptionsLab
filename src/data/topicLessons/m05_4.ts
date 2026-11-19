import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '5.4',
  intro:
    `Strikes do not all behave the same way. At-the-money, in-the-money and out-of-the-money options react differently to a move in Nifty, and traders crowd into some strikes while ignoring others. This module shows how premiums behave strike by strike and how activity migrates as spot moves. All premiums are illustrative Black-Scholes values (Nifty 24,000, 7 days to expiry, IV 14%, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `Saare strikes ek jaisa behave nahi karte. ATM, ITM aur OTM option Nifty ke move par alag tarah se react karte hain, aur traders kuch strikes mein bheed laga dete hain jabki baaki ko ignore karte hain. Is module mein dekhenge ki premium strike ke hisaab se kaise badalta hai aur spot ke saath activity ek strike se doosre strike par kaise shift hoti hai. Saare premiums illustrative Black-Scholes values hain (Nifty 24,000, 7 din, IV 14%, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `A strike is the fixed price in an option contract. How an option's premium responds to the index depends on how far its strike sits from the current spot. The ATM strike responds quickly in rupees and is the most actively traded. ITM strikes move almost point for point with the index but cost a lot. OTM strikes are cheap, move less in rupees, but can change a lot in percentage terms.`,
    conceptHi:
      `Strike option contract ka fixed price hota hai. Premium index ke move par kitna react karega, yeh is par depend karta hai ki strike spot se kitna door hai. ATM strike rupees mein tezi se react karta hai aur sabse zyada trade hota hai. ITM strike index ke lagbhag barabar chalta hai par mehnga hota hai. OTM strike sasta hota hai, rupees mein kam hilta hai, lekin percentage mein bahut badal sakta hai.`,
    mechanism:
      `Delta tells how many rupees the premium changes for a one-point move in Nifty. An ATM option has delta near 0.50, an ITM call is higher (0.70 to 0.90), an OTM call is lower (0.05 to 0.35). As spot moves, delta itself changes (gamma), so a strike that was OTM can become ATM within hours. Market participants also shift their positions: when spot moves, open interest and volume move to the new nearby strikes, and the ATM strike is re-defined as the strike closest to spot.`,
    example: {
      title: 'Nifty rises 100 points: ITM, ATM and OTM calls compared (illustrative)',
      text: `At spot 24,000 and 7 days left, the 23,800 CE costs ₹321.83, the 24,000 CE ₹200.85 and the 24,500 CE ₹39.20. If Nifty moves to 24,100 with IV unchanged, they become ₹394.79, ₹258.03 and ₹58.13. Gains: ITM +₹72.96 (+22.7%), ATM +₹57.18 (+28.5%), OTM +₹18.93 (+48.3%). The ITM option made the most rupees; the OTM made the biggest percentage, but starting from a small base.`,
    },
    chart: {
      kind: 'bars',
      title: 'Percentage gain in a call premium when Nifty rises 100 points (illustrative)',
      caption: 'Same 100-point move, same day. Cheaper, further-OTM strikes show the largest percentage swing - and the largest risk of losing the whole premium.',
      unit: '%',
      items: [
        { label: '23,800 CE (ITM)', value: 22.7, tone: 'ice' },
        { label: '24,000 CE (ATM)', value: 28.5, tone: 'gold' },
        { label: '24,200 CE (OTM)', value: 35.5, tone: 'neutral' },
        { label: '24,500 CE (OTM)', value: 48.3, tone: 'neutral' },
        { label: '25,000 CE (far OTM)', value: 75.6, tone: 'neutral' },
      ],
    },
    optionChain:
      `On the chain, the ATM row is highlighted and usually carries the highest volume and the tightest bid-ask spread. Scan 5 to 6 strikes above and below it: LTP falls quickly as you move away, delta shrinks, and far strikes show tiny premiums such as 0.15 to 5. Look at where volume and OI are thick and whether that cluster is moving up or down through the day.`,
    psychology:
      `Beginners are drawn to cheap far-OTM strikes because "it only costs a few rupees", forgetting that a low price usually means a low probability. Experienced traders prefer liquid strikes near ATM where spreads are tight and exits are easy. Sellers often favour OTM strikes for the higher chance of expiring worthless, but accept the risk of a sudden move.`,
    scenarios: {
      bullish:
        `Nifty trends up: ATM and ITM calls give steadier rupee gains; OTM calls can multiply in percentage terms if the move is large and fast, but expire worthless if it is not. Put premiums fall, far OTM puts fastest.`,
      bearish:
        `Nifty falls: puts gain, with ATM and ITM puts moving most in rupees. Activity migrates to lower strikes, and the ATM strike shifts down as spot moves.`,
      sideways:
        `Nifty stays in a range: OTM strikes decay to near zero, ATM loses time value fastest in rupees, and OI stays clustered near round-number strikes like 24,000.`,
    },
    practice: [
      {
        q: `A 24,000 CE has delta 0.53. Nifty rises 100 points. What is the first-order estimate of the premium change, and why is the actual change (₹57.18) a little bigger?`,
        a: `Estimate = 0.53 × 100 = ₹53. The actual is ₹57.18 because delta rises as spot rises (gamma), so the later points of the move add more than 0.53 each.`,
      },
      {
        q: `The 24,500 CE goes from ₹39.20 to ₹58.13. What is the percentage gain and the gain for one lot of 65?`,
        a: `Gain per unit = 58.13 − 39.20 = ₹18.93. Percentage = 18.93 ÷ 39.20 = 48.3%. One lot = 18.93 × 65 = ₹1,230.45.`,
      },
      {
        q: `A trader buys the 25,000 CE at ₹3.61 (illustrative). What is the cost of one lot and the expiry breakeven? How far must Nifty rise from 24,000, in percent?`,
        a: `Cost = 3.61 × 65 = ₹234.65. Breakeven = 25,000 + 3.61 = 25,003.61. Required rise = 1,003.61 ÷ 24,000 = 4.18%.`,
      },
      {
        q: `Nifty is at 24,138. Which strike is ATM if the strike step is 50?`,
        a: `Nearest strikes are 24,100 (distance 38) and 24,150 (distance 12). ATM = 24,150.`,
      },
    ],
    assignment:
      `On a live option chain (or the Greeks calculator), pick Nifty spot and note the premium, delta and volume of five CE strikes: two ITM, ATM, two OTM. Recompute after changing spot by +100 and -100. Make a table of rupee change and percentage change per strike and write two sentences on which strike you would prefer for a short-term view and why.`,
  },
  topics: [
    {
      t: 1,
      def: `ATM premium sensitivity is how much the premium of the at-the-money option (strike closest to spot) changes when the index moves. ATM options have a delta near 0.50, so each Nifty point moves the premium by about half a point.`,
      hi: `ATM premium sensitivity ka matlab hai ki jab index hilta hai toh ATM option (jiska strike spot ke sabse paas ho) ka premium kitna badalta hai. ATM ka delta lagbhag 0.50 hota hai, yaani Nifty ke har point par premium lagbhag aadha point badalta hai.`,
      how: `ATM options have only time value; all of the premium is the price of uncertainty. They have the highest gamma and highest vega of any strike, so both spot and volatility changes show up quickly in their price. This is also where theta (time decay) in rupee terms is greatest. Because of this balance of sensitivity, most intraday traders and NSE volume centre on the ATM strike. Premium is roughly proportional to spot × IV × square root of time.`,
      eg: {
        title: 'ATM 24,000 CE after a 100-point move (illustrative)',
        text: `At 24,000 spot, 7 days, IV 14%: 24,000 CE = ₹200.85, delta 0.53. If Nifty goes to 24,100 the CE is ₹258.03 (+₹57.18); if Nifty goes to 23,900 it is ₹152.18 (-₹48.67). For one lot of 65, that is +₹3,716.70 or -₹3,163.55. Gains are slightly bigger than losses for the same move because of gamma.`,
      },
      tip: `ATM is the most responsive strike, in both directions. It makes money quickest and loses quickest. Do not size it as if it were a cheap option.`,
      visual: { kind: 'curve', title: 'Delta of a call across strikes', caption: 'Delta rises from near 0 (far OTM) through about 0.50 at ATM to near 1 (deep ITM).', curve: 'delta' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'See premium, delta, gamma, theta and vega of the ATM call in one place.' },
    },
    {
      t: 2,
      def: `An in-the-money (ITM) call has a strike below spot; an ITM put has a strike above spot. Its premium is intrinsic value (real, exercisable worth) plus a smaller time value. ITM premiums move almost point for point with the index.`,
      hi: `ITM call ka strike spot se neeche hota hai, aur ITM put ka strike spot se upar. Iska premium intrinsic value (asli value) plus thodi si time value hota hai. ITM premium index ke lagbhag barabar chalta hai, isliye rupees mein gain-loss bada hota hai.`,
      how: `Because most of an ITM premium is intrinsic value, it behaves like holding a piece of the index, with delta of 0.70 to 0.90. Time value is small, so theta and vega are lower than for ATM. The cost is a bigger upfront outlay and so a bigger rupee loss if the view is wrong. Deep ITM options can also have wider bid-ask spreads and lower volume on the chain.`,
      eg: {
        title: 'ITM 23,800 CE (illustrative)',
        text: `With Nifty at 24,000, the 23,800 CE costs ₹321.83. Intrinsic = 24,000 − 23,800 = ₹200, so time value = 321.83 − 200 = ₹121.83. Delta is 0.69. After a 100-point rise it is ₹394.79 (+₹72.96). One lot costs 321.83 × 65 = ₹20,918.95.`,
      },
      tip: `ITM does not mean cheap or safe. You pay for intrinsic value upfront, so the money at risk is higher than with ATM or OTM.`,
      visual: { kind: 'ladder', title: 'Call strikes at spot 24,000', caption: 'Strikes below spot are ITM for calls, strikes above are OTM.', optType: 'CE', spot: 24000, strikes: [23600, 23800, 24000, 24200, 24400] },
      calc: { id: 'premium-split', preset: { optType: 'CE', spot: 24000, strike: 23800, premium: 321.83 }, why: 'Split the ₹321.83 premium into intrinsic and time value.' },
    },
    {
      t: 3,
      def: `An out-of-the-money (OTM) call has a strike above spot; an OTM put has a strike below spot. Its premium is entirely time value. It is cheap in rupees and changes a lot in percentage terms, but most OTM options expire worthless.`,
      hi: `OTM call ka strike spot se upar hota hai, aur OTM put ka strike spot se neeche. Iska poora premium time value hota hai. Yeh rupees mein sasta hota hai aur percentage mein bahut badal sakta hai, lekin zyadatar OTM options zero par expire hote hain.`,
      how: `An OTM option needs spot to cross its strike before it has intrinsic value. Its delta is small, so rupee moves are small until spot approaches the strike, when delta and gamma pick up. Theta eats a large part of a small premium. Percentage swings are big because the base price is low; this is why OTM options look exciting and why most buyers of them lose money over many trades.`,
      eg: {
        title: 'OTM 24,500 CE, 7 days (illustrative)',
        text: `At 24,000 spot, the 24,500 CE costs ₹39.20 (delta 0.16). If spot rises 100 points, it becomes ₹58.13 (+48.3%). If spot falls 100 points, it becomes ₹25.53 (-34.9%). One lot costs 39.20 × 65 = ₹2,548. If Nifty ends the week at 24,400, the option expires worthless, a 100% loss.`,
      },
      tip: `Percentage gain is not profit. A 48% gain on ₹2,548 is about ₹1,230; a 100% loss is ₹2,548. Think in rupees and probability.`,
      visual: { kind: 'bars', title: 'Premium of calls at different strikes (illustrative, ₹)', caption: 'Premium falls fast as the strike moves away from spot.', unit: ' ₹', items: [{ label: '24,000 CE', value: 200.85, tone: 'gold' }, { label: '24,200 CE', value: 113.55, tone: 'ice' }, { label: '24,500 CE', value: 39.2, tone: 'ice' }, { label: '25,000 CE', value: 3.61, tone: 'neutral' }] },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24500, premium: 39.2, expiryPrice: 24600, lotSize: 65, lots: 1 }, why: 'Check what an OTM call actually earns at expiry once spot passes the strike.' },
    },
    {
      t: 4,
      def: `Strike migration is the shift of trading activity, volume and open interest from one strike to another as the market moves or as expectations change. For example, call OI that was highest at 24,500 may build up at 24,300 later in the week.`,
      hi: `Strike migration ka matlab hai ki jaise market hilta hai ya expectations badalti hain, volume aur open interest ek strike se doosre strike par shift ho jaata hai. Jaise jo call OI 24,500 par sabse zyada tha, woh hafte ke baad 24,300 par bhi build ho sakta hai.`,
      how: `Traders open new positions at strikes close to the current spot, because those carry meaningful premium and liquidity. When spot drifts, old strikes become far-OTM and new ones near ATM, so writers and buyers roll to new strikes. NSE publishes strike-wise OI and volume; compare today's chain with yesterday's. Migration alone cannot tell you who initiated the trade, and it is a clue, not a signal.`,
      eg: {
        title: 'Call OI migration through a week (illustrative numbers)',
        text: `Monday: highest call OI at 24,500 (about 80 lakh contracts). By Thursday spot has slid from 24,100 to 23,900 and the highest call OI is at 24,200 and 24,000 (about 70 lakh each). Highest put OI moves from 23,800 to 23,600. Both walls have moved down by about 200 to 300 points, in line with spot.`,
      },
      tip: `Track the direction of migration, but also ask whether it is fresh positions or just old strikes being abandoned.`,
      visual: { kind: 'timeline', title: 'Strike migration over a week (illustrative)', events: [{ when: 'Mon', what: 'Highest call OI 24,500; highest put OI 23,800' }, { when: 'Wed', what: 'Spot slips; new call OI appears at 24,200' }, { when: 'Thu', what: 'Highest call OI 24,200; highest put OI 23,600' }, { when: 'Tue expiry', what: 'Activity packs around the strikes nearest spot' }] },
    },
    {
      t: 5,
      def: `ATM shifting means the at-the-money strike changes as spot moves. The ATM strike is simply the listed strike closest to the current Nifty level, so it is not a fixed number.`,
      hi: `ATM shifting ka matlab hai ki spot ke saath ATM strike badalta rehta hai. ATM strike woh listed strike hota hai jo current Nifty level ke sabse paas ho, isliye yeh fixed number nahi hai.`,
      how: `With a strike step of 50 near the money, the ATM changes each time spot crosses the midpoint between two strikes, for example 24,125 between 24,100 and 24,150. Traders must re-check which strike is ATM before pricing a straddle or reading the chain. Delta, gamma and vega peak at ATM, so the whole risk profile of a position can change as it shifts. The strike step can vary; always inspect the actual strike list for the expiry.`,
      eg: {
        title: 'ATM strike as Nifty moves',
        text: `Nifty at 24,020: ATM = 24,000. At 24,070: nearest are 24,050 (20 away) and 24,100 (30 away), so ATM = 24,050. At 24,120: 24,100 (20 away) vs 24,150 (30 away), so ATM = 24,100. A sold 24,000 straddle at the open can be 120 points in-the-money on one leg by afternoon.`,
      },
      tip: `Recheck the ATM strike every time you add to or adjust a position. It is not where you traded earlier.`,
      visual: { kind: 'ladder', title: 'Strikes at spot 24,120', caption: 'ATM is now 24,100, not 24,000. Calls below spot are ITM.', optType: 'CE', spot: 24120, strikes: [23900, 24000, 24100, 24200, 24300] },
      calc: { id: 'moneyness', preset: { optType: 'CE', spot: 24120, strike: 24000 }, why: 'Check how far a strike is from spot and whether it is ITM, ATM or OTM.' },
    },
    {
      t: 6,
      def: `Nearby strike concentration is the tendency for most volume and open interest to sit in a handful of strikes close to the current spot, often at round numbers such as 24,000 or 24,500.`,
      hi: `Nearby strike concentration ka matlab hai ki zyadatar volume aur open interest spot ke paas ke kuch strikes mein hi hota hai, aksar round numbers jaise 24,000 ya 24,500 par.`,
      how: `Liquidity is attracted to strikes where premiums are meaningful and spreads are tight. Round-number strikes (multiples of 100 or 500) act as natural reference points, so many orders land there. This concentration helps in two ways: it keeps the spread narrow at those strikes and it shows where large players have positioned. But concentration also means liquidity can vanish quickly if spot moves away, so exits in far strikes can be costly.`,
      eg: {
        title: 'Volume by strike (illustrative)',
        text: `Suppose total call volume for the day is 100 units. The 24,000 strike has 28, 24,100 has 15, 24,200 has 18, 24,300 has 9 and 24,500 has 14. Together these five strikes hold 84 percent of the volume. The remaining 16 percent is scattered across 20 or more other strikes.`,
      },
      tip: `Check volume and the bid-ask spread before choosing a strike. A strike with no depth can trap you even if your view is right.`,
      visual: { kind: 'oi', title: 'OI concentrates near spot (illustrative, lakh contracts)', rows: [{ strike: 23800, ce: 12, pe: 55 }, { strike: 23900, ce: 20, pe: 48 }, { strike: 24000, ce: 62, pe: 70 }, { strike: 24100, ce: 40, pe: 22 }, { strike: 24200, ce: 58, pe: 10 }, { strike: 24500, ce: 75, pe: 6 }], spot: 24000 },
    },
    {
      t: 7,
      def: `Far OTM speculative activity is buying very cheap, distant strikes in the hope of a big move, like buying a lottery ticket. The premium is tiny but the chance of the option finishing in the money is also tiny.`,
      hi: `Far OTM speculative activity ka matlab hai bahut door ke sasta strikes khareedna is umeed mein ki bada move aayega, bilkul lottery ticket ki tarah. Premium bahut kam hota hai lekin option ke paise mein aane ka chance bhi bahut kam hota hai.`,
      how: `Far-OTM options trade at a few rupees, so a small price move looks like a large percentage gain. The spread as a share of the price is wide, and brokerage and taxes can eat a big part of any gain. Such options gain real value only on a sudden large event: a gap, a surprise announcement or a crash. Sellers of these options collect small premiums but face large losses if an extreme move occurs, so exchanges require margin. Also, the model price can be 0.15 while the market quotes the tick size minimum.`,
      eg: {
        title: 'Buying 25,000 CE for ₹3.61 (illustrative)',
        text: `Nifty is 24,000, 7 days left. One lot of the 25,000 CE costs 3.61 × 65 = ₹234.65. Breakeven at expiry is 25,003.61, which is 4.18% above spot. If Nifty ends at 24,800 the option expires worthless and the trader loses all ₹234.65. The loss is small in rupees, but repeated weekly such losses add up.`,
      },
      tip: `Cheap is not the same as good value. Check the distance to breakeven in percent, not the price in rupees.`,
      visual: { kind: 'payoff', title: 'Long 25,000 CE at expiry (illustrative)', caption: 'Flat loss of the small premium until the strike, then profit only after the breakeven.', spot: 24000, legs: [{ type: 'CE', side: 1, strike: 25000, premium: 3.61 }] },
      calc: { id: 'breakeven', preset: { optType: 'CE', side: 'buy', strike: 25000, premium: 3.61 }, why: 'Find the breakeven of a far-OTM call and compare it with spot.' },
    },
  ],
  tools: [{ id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24200, days: 7, iv: 14, rate: 6.5 } }],
}
export default m
