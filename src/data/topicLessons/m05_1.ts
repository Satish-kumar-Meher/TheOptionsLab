import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '5.1',
  intro:
    `The strike price is the fixed level written into every option contract. It decides whether the option has intrinsic value, how much it costs and how far the index must travel for you to profit. This module covers what a strike is, how NSE lists strikes, how far apart they are, how to find the at-the-money strike and how the ATM strike keeps shifting as NIFTY moves. Examples use NIFTY near 24,000, a lot of 65 (check the current NSE contract specification) and illustrative Black-Scholes premiums at 7 days to expiry, India VIX 14, rate 6.5%.`,
  introHi:
    `Strike price woh fixed level hai jo har option contract mein likha hota hai. Yahi decide karta hai ki option mein intrinsic value hai ya nahi, premium kitna hoga aur profit ke liye index ko kitna chalna padega. Is module mein hum dekhenge ki strike kya hota hai, NSE strikes kaise list karta hai, unke beech gap kitna hota hai, ATM strike kaise pehchante hain aur NIFTY ke saath ATM kaise shift hota rehta hai. Examples NIFTY ~24,000, lot 65 (current NSE specification check karein) aur illustrative Black-Scholes premiums par hain.`,
  steps: {
    concept:
      `Every option contract is defined by four things: the underlying, the expiry, the type (CE or PE) and the strike price. The strike is the agreed level against which the final index value is compared at expiry. A 24,100 CE pays off only if NIFTY finishes above 24,100, and a 24,100 PE only if it finishes below. Choosing a strike is therefore choosing how big a move you need, how much you pay and how much risk you take.`,
    conceptHi:
      `Har option contract chaar cheezon se define hota hai: underlying, expiry, type (CE ya PE) aur strike price. Strike woh agreed level hai jis se expiry par final index value compare hoti hai. 24,100 CE tabhi pay karta hai jab NIFTY 24,100 se upar close ho, aur 24,100 PE tabhi jab neeche close ho. Toh strike chunna matlab yeh chunna ki kitna move chahiye, kitna paisa lagega aur kitna risk lena hai.`,
    mechanism:
      `NSE publishes the list of available strikes for each expiry, and your broker's option chain simply displays that list. Strikes are spaced at fixed intervals, and NSE adds new strikes as the index moves so that there are always contracts around the current level. The at-the-money (ATM) strike is the listed strike closest to the current index value, and it changes as the index moves. Everything else on the chain is described relative to it: strikes below are lower, strikes above are higher, and for calls or puts they become in-the-money or out-of-the-money depending on side. The exact strike list, interval and number of strikes can be revised by NSE, so always read the live chain.`,
    example: {
      title: 'Reading a 24,100 CE (illustrative)',
      text: `NIFTY at 24,000, 7 days to expiry, India VIX 14. The 24,100 CE has an illustrative Black-Scholes premium of about ₹153.00. One lot of 65 costs 153 x 65 = ₹9,945. Breakeven at expiry = strike + premium = 24,100 + 153 = 24,253, which is 253 points (1.05%) above spot. Below 24,100 at expiry the option is worthless and the buyer loses the full ₹9,945 plus charges. Real traded premiums will differ from the model.`,
    },
    chart: {
      kind: 'ladder',
      title: 'Strikes around NIFTY 24,037',
      caption: 'Call-side ladder: strikes below spot are in the money, the nearest listed strike is at the money, strikes above are out of the money.',
      optType: 'CE',
      spot: 24037,
      strikes: [23900, 23950, 24000, 24050, 24100, 24150, 24200],
    },
    optionChain:
      `The strike column sits in the middle of the chain, with call data on one side and put data on the other. Rows above and below the highlighted ATM strike show how premium, OI and volume change as you move away from the current level. Premium of the CE falls as the strike rises, while premium of the PE rises as the strike rises. The ATM row is usually the busiest and has the tightest bid-ask spread.`,
    psychology:
      `Beginners often pick a strike by price, not by logic: the cheapest strike feels like a bargain. Others pick a round number like 24,500 because it feels like a target. A strike is not a prediction, it is a contract term. Ask what must happen for this strike to make money, and how likely that move is within the time left.`,
    scenarios: {
      bullish:
        `You expect NIFTY to rise 150 points by expiry. A 24,000 CE costs about ₹200.85 and needs 24,201 for breakeven. A 24,200 CE costs about ₹113.55 and needs 24,314. Lower strikes cost more but need less movement; higher strikes cost less but need more.`,
      bearish:
        `For a fall, the logic is mirrored with puts. A 24,000 PE is about ₹170.95 and breaks even at 23,829; a 23,800 PE is about ₹92.18 and breaks even at 23,708. The put strike you pick sets how far down NIFTY must go.`,
      sideways:
        `If NIFTY hovers near 24,000, strikes near the money keep their time value longest and lose it fastest as expiry nears, while far strikes were never likely to matter. The strike you hold decides how much premium is exposed to that decay.`,
    },
    practice: [
      {
        q: `NIFTY is at 24,037 and strikes are 50 points apart. Which strike is ATM, and is the 24,000 CE in or out of the money?`,
        a: `Distance to 24,000 = 37 points; distance to 24,050 = 13 points. The nearest listed strike is 24,050, so that is ATM. The 24,000 CE has strike below spot, so it is in the money by 37 points (intrinsic value 37).`,
      },
      {
        q: `You buy one lot (65) of the 24,100 CE at ₹153. What is the breakeven and what is the maximum loss?`,
        a: `Breakeven = 24,100 + 153 = 24,253. Maximum loss = premium paid = 153 x 65 = ₹9,945 (plus charges), which happens if NIFTY expires at or below 24,100.`,
      },
      {
        q: `The 24,000 CE is ₹200.85 and the 24,050 CE is ₹175.86. How much cheaper per lot is it to move up one strike?`,
        a: `Difference = 200.85 - 175.86 = ₹24.99 per unit. For one lot = 24.99 x 65 = ₹1,624.35. You save that cash but need 50 more points for the same expiry payoff.`,
      },
      {
        q: `If NIFTY expires at 24,300, what is the profit or loss on one lot of the 24,000 CE bought at ₹200.85?`,
        a: `Value at expiry = 24,300 - 24,000 = 300. Profit per unit = 300 - 200.85 = 99.15. For one lot = 99.15 x 65 = ₹6,444.75 before charges.`,
      },
    ],
    assignment:
      `Open today's NIFTY chain for the nearest Tuesday expiry. Write down the strike interval near the money and the interval 1,000 points away. Note the ATM strike, then list the CE premium for ATM, one strike up and one strike down. For each, compute breakeven (strike + premium) and its distance from spot in points and percent.`,
  },
  topics: [
    {
      t: 1,
      def: `The strike price is the fixed level written in an option contract at which the buyer has the right to buy (call) or sell (put) the underlying. It does not change during the life of the contract. At expiry, the final index value is compared with the strike to decide whether the option has any value.`,
      hi: `Strike price option contract mein likha hua fixed level hai jahan buyer ko underlying buy (call) ya sell (put) karne ka right milta hai. Contract ki life mein yeh badalta nahi. Expiry par final index value ko strike se compare karke dekha jata hai ki option mein value hai ya nahi.`,
      how: `For an index option the contract is cash-settled, so no shares change hands. A 24,100 CE settles for the difference between the final settlement value and 24,100 if that difference is positive, otherwise it expires worthless. The strike also fixes the breakeven for a buyer: strike plus premium for a call, strike minus premium for a put. Each strike on the chain is a separate contract with its own premium, OI and volume. NIFTY index options are European style, so they can be settled only at expiry in the exercise sense.`,
      eg: {
        title: 'The same index, two strikes (illustrative)',
        text: `With NIFTY at 24,000 and 7 days left, the 24,100 CE is about ₹153.00 and the 24,200 CE about ₹113.55. If NIFTY settles at 24,300, the 24,100 CE is worth 200 and the 24,200 CE is worth 100. Same index, same expiry, different strikes, so different payoffs: for one lot the first is worth 200 x 65 = ₹13,000 and the second 100 x 65 = ₹6,500 at expiry.`,
      },
      tip: `A strike is a contract term, not a forecast. Do not choose it because it is a round number; choose it because of the move it needs and the price you pay.`,
      visual: {
        kind: 'payoff',
        title: 'Where the strike sits on the payoff',
        caption: 'Long 24,100 CE bought at ₹153: loss capped at premium below 24,100; breakeven at 24,253.',
        spot: 24000,
        legs: [{ type: 'CE', side: 1, strike: 24100, premium: 153 }],
      },
      calc: {
        id: 'breakeven',
        preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 153 },
        why: 'Breakeven is built directly from the strike and the premium.',
      },
    },
    {
      t: 2,
      def: `Exchanges, not brokers, decide which strikes exist. NSE lists a set of strikes for each expiry around the current index level and adds more as the index moves. Traders can trade only the strikes that are listed.`,
      hi: `Kaun se strikes exist karte hain, yeh exchange decide karti hai, broker nahi. NSE har expiry ke liye current index level ke aas-paas strikes list karta hai aur index move hone par naye strikes add karta hai. Aap sirf wahi strikes trade kar sakte ho jo listed hain.`,
      how: `NSE's contract specification sets the strike interval and how many strikes are available on each side of the current level. When the index moves far enough, new strikes are introduced so that coverage continues. Strikes close to spot usually have the smallest gaps and the most activity; strikes far away may be spaced wider and may trade rarely. Which strikes are listed, and when they are added, is subject to NSE rules that are revised from time to time, so check the current contract specification. Your broker's chain only displays what NSE has made available.`,
      eg: {
        title: 'Strikes appearing as NIFTY rallies (illustrative)',
        text: `Suppose the chain for the nearest expiry shows strikes up to 25,000 on the call side when NIFTY is at 24,000. If NIFTY rallies to 24,900, the 25,000 strike is now only 100 points away, and NSE can list further strikes above it. A trader who wanted a 25,500 CE earlier may find it available only once it has been listed, and the new strike will have no previous OI or volume history.`,
      },
      tip: `A strike you want may not be listed yet, or may be too illiquid to trade. Read the live chain instead of assuming every round number exists.`,
      visual: {
        kind: 'flow',
        title: 'From exchange list to your screen',
        caption: 'The broker displays; the exchange decides what exists.',
        steps: [
          { label: 'NSE contract specification', note: 'Interval and number of strikes', tone: 'gold' },
          { label: 'Strikes listed for expiry', note: 'Around current index level', tone: 'gold' },
          { label: 'New strikes added', note: 'As the index moves', tone: 'ice' },
          { label: 'Broker option chain', note: 'Shows what is listed', tone: 'neutral' },
        ],
      },
    },
    {
      t: 3,
      def: `The strike interval is the fixed gap between two neighbouring strikes. For NIFTY options it is commonly 50 points near the current level, with wider gaps farther away. Other indices such as BANKNIFTY and SENSEX have their own intervals.`,
      hi: `Strike interval do nazdeeki strikes ke beech ka fixed gap hota hai. NIFTY options mein current level ke paas yeh aam taur par 50 points hota hai, door ke strikes mein gap bada ho sakta hai. BANKNIFTY aur SENSEX ke apne intervals hote hain.`,
      how: `The interval controls how finely you can choose your level. A 50-point step on NIFTY at 24,000 is about 0.21% of the index. Moving one strike changes an ATM call's premium by roughly delta times 50, which is about 25 points. Wider intervals reduce the number of contracts and can concentrate liquidity, but give you coarser choices. Intervals can differ by index and by distance from the current level, and NSE can revise them; always inspect the actual strike list for your chosen contract.`,
      eg: {
        title: 'What one strike step costs (illustrative)',
        text: `NIFTY 24,000, 7 days, VIX 14. The 24,000 CE is about ₹200.85 and the 24,050 CE about ₹175.86. One 50-point step lowers premium by ₹24.99, which is 24.99 x 65 = ₹1,624.35 per lot. The step is 50 / 24,000 = 0.21% of the index. Going three steps (150 points) to 24,150 lowers the premium by a larger amount in rupees but a smaller amount per step as delta falls.`,
      },
      tip: `Think in strike steps and in percent of spot, not only in points. 50 points is small at 24,000 but meaningful for a one-day trade.`,
      visual: {
        kind: 'bars',
        title: 'Call premium by strike, NIFTY 24,000',
        caption: 'Illustrative Black-Scholes, 7 days, VIX 14, per unit.',
        unit: ' ₹',
        items: [
          { label: '24,000 CE', value: 200.85, tone: 'gold' },
          { label: '24,050 CE', value: 175.86, tone: 'gold' },
          { label: '24,100 CE', value: 153.0, tone: 'gold' },
          { label: '24,200 CE', value: 113.55, tone: 'ice' },
        ],
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 24.99, lotSize: 65, lots: 1, spot: 24000 },
        why: 'Converts the premium saved by moving one strike into rupees per lot.',
      },
    },
    {
      t: 4,
      def: `The ATM (at-the-money) strike is the listed strike closest to the current index value. Compare the distances of the two nearest strikes to spot and pick the smaller one. When spot is exactly halfway, either neighbouring strike may be treated as ATM, depending on the platform.`,
      hi: `ATM (at-the-money) strike woh listed strike hai jo current index value ke sabse nazdeek ho. Spot se do nazdeeki strikes ki doori nikaalo aur jo chhoti ho wahi ATM hai. Agar spot bilkul beech mein ho toh platform ke hisaab se koi bhi ek strike ATM maana ja sakta hai.`,
      how: `Most chains mark ATM using the spot index value. Some traders and platforms use the nearest futures price or the synthetic forward (strike where call and put prices are closest) instead, which can differ by a strike or so, since futures trade at a premium to spot. For the buyer, ATM options carry the highest time value and have a delta near 0.5. The ATM strike is also the reference for straddles and for reading the chain, so decide which method you use and stay consistent.`,
      eg: {
        title: 'NIFTY at 24,037 (illustrative)',
        text: `Strikes are 24,000 and 24,050. Distance to 24,000 is 37; distance to 24,050 is 13. ATM is 24,050. At that spot the 24,050 CE is about ₹194.45 and the 24,050 PE about ₹177.49 (7 days, VIX 14), so the straddle costs about 194.45 + 177.49 = ₹371.94 per unit. The 24,000 CE, at 37 points in the money, is about ₹221.02, of which 37 is intrinsic value.`,
      },
      tip: `Do not assume ATM is the round thousand. ATM follows the live index, and it can change in minutes on a volatile day.`,
      visual: {
        kind: 'compare',
        title: 'Two neighbouring strikes, spot 24,037',
        caption: 'The nearest listed strike is ATM.',
        left: { head: '24,000 strike', tone: 'neutral', points: ['37 points from spot', 'CE is in the money', 'Not the nearest'] },
        right: { head: '24,050 strike', tone: 'gold', points: ['13 points from spot', 'This is ATM', 'Nearest listed strike'] },
      },
      calc: {
        id: 'moneyness',
        preset: { optType: 'CE', spot: 24037, strike: 24050 },
        why: 'Classifies the strike as ITM, ATM or OTM and shows its distance from spot.',
      },
    },
    {
      t: 5,
      def: `Strike selection is the process of choosing which strike to trade. It balances your view of direction and size of the move, the time available, the premium you can afford and the risk you can accept.`,
      hi: `Strike selection matlab yeh chunna ki kaun sa strike trade karna hai. Isme aapka view (direction aur move ka size), kitna time hai, kitna premium afford kar sakte ho aur kitna risk le sakte ho, sab balance hota hai.`,
      how: `A simple process: first decide the direction and the size of move you expect, and by when. Then compute the breakeven of candidate strikes and check whether your target is beyond it. Next compare the rupee cost per lot with the amount you are willing to risk. Finally check the bid-ask spread and volume so you can exit. Lower (for calls) strikes cost more and need less movement; higher strikes cost less and need a bigger move but can multiply in percentage terms if it happens. Module 5.3 treats this in more detail.`,
      eg: {
        title: 'Three call strikes, one view (illustrative)',
        text: `NIFTY 24,000, 7 days, VIX 14, lot 65. The 24,000 CE costs about ₹200.85 (₹13,055.25 per lot), the 24,100 CE ₹153.00 (₹9,945) and the 24,200 CE ₹113.55 (₹7,380.75). If NIFTY expires at 24,300, the results per lot are +₹6,444.75, +₹3,055 and -₹880.75. If it expires at 24,100, they are -₹6,555.25, -₹9,945 and -₹7,380.75. The cheapest strike is not always the best.`,
      },
      tip: `Judge a strike by the move it needs, not by the premium it costs. A cheap option that needs an unlikely move is expensive in disguise.`,
      visual: {
        kind: 'matrix',
        title: 'Strike choice trade-off',
        caption: 'Lower call strikes cost more but need less; higher strikes cost less but need more.',
        xLabels: ['Lower premium', 'Higher premium'],
        yLabels: ['Needs small move', 'Needs big move'],
        cells: [
          { head: 'Rare', note: 'Cheap and close to money seldom both exist', tone: 'neutral' },
          { head: 'ITM / ATM strikes', note: 'Pay more, need less movement', tone: 'ice' },
          { head: 'OTM strikes', note: 'Pay less, need a bigger move', tone: 'gold' },
          { head: 'Avoid', note: 'Expensive and needs a big move', tone: 'neutral' },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24100, premium: 153, expiryPrice: 24300, lotSize: 65, lots: 1 },
        why: 'Test any strike and expiry price with the numbers from the example.',
      },
    },
    {
      t: 6,
      def: `ATM shifting means the at-the-money strike changes as the index moves. A strike that was ATM becomes in the money or out of the money, and the next strike becomes ATM. Everything described as ATM, ITM or OTM is relative to current spot.`,
      hi: `ATM shifting matlab index ke move hone par at-the-money strike badalta rehta hai. Jo strike pehle ATM tha woh ITM ya OTM ban jata hai aur agla strike ATM ho jata hai. ATM, ITM, OTM sab kuch current spot ke relative hota hai.`,
      how: `If NIFTY rises from 24,000 to 24,100, the 24,100 strike becomes ATM and the 24,000 CE becomes 100 points in the money. The premium of the old ATM call grows because delta rises as it moves into the money. A long call buyer gains from this in a rally, but the gain per point slows if the index stops. Traders who hold positions in a trending market must watch which strike is ATM now, because gamma, theta and bid-ask spreads are largest near it.`,
      eg: {
        title: 'The 24,000 CE as NIFTY climbs (illustrative)',
        text: `7 days, VIX 14, lot 65. At spot 24,000 the 24,000 CE is ATM: ₹200.85, delta 0.53. At 24,100 it is ₹258.03, delta 0.61. At 24,200 it is ₹323.37, delta 0.69. A 200-point rally lifts the call by 122.52 per unit, which is 122.52 x 65 = ₹7,963.80 per lot, while ATM moved from 24,000 to 24,200. This ignores time decay.`,
      },
      tip: `ATM is a moving target. If you sold or bought near the money, recheck the chain after every large move.`,
      visual: {
        kind: 'bars',
        title: '24,000 CE premium as spot climbs',
        caption: 'Illustrative per unit, 7 days, VIX 14.',
        unit: ' ₹',
        items: [
          { label: 'Spot 24,000 (ATM)', value: 200.85, tone: 'gold' },
          { label: 'Spot 24,050', value: 228.38, tone: 'ice' },
          { label: 'Spot 24,100', value: 258.03, tone: 'ice' },
          { label: 'Spot 24,150', value: 289.71, tone: 'ice' },
          { label: 'Spot 24,200', value: 323.37, tone: 'ice' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24100, strike: 24000, days: 7, iv: 14, rate: 6.5 },
        why: 'Change spot to watch the old ATM strike turn in the money and its delta rise.',
      },
    },
  ],
  tools: [{ id: 'moneyness', preset: { optType: 'CE', spot: 24037, strike: 24050 }, why: 'Check whether a strike is ITM, ATM or OTM.' }],
}
export default m
