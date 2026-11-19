import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '4.2',
  intro:
    `Intrinsic value is the part of an option's premium that is already real: what the option would be worth if it were settled right now. It is never negative, it is zero for out-of-the-money options and it moves point for point with the index once an option is in the money. Examples use NIFTY near 24,000 and a lot of 65 (check the current NSE contract specification).`,
  introHi:
    `Intrinsic value premium ka woh hissa hai jo abhi ke abhi real hai: agar option abhi settle ho jaye toh uski kitni value banegi. Yeh kabhi negative nahi hoti, out-of-the-money options ke liye zero hoti hai, aur option in the money aane ke baad index ke saath point-for-point chalti hai. Examples NIFTY ~24,000 aur lot 65 par hain (current NSE contract specification check karein).`,
  steps: {
    concept:
      `Intrinsic value answers one question: if I could exercise this option this second, how much would I receive? For a call it is the amount by which the index is above the strike, for a put the amount by which the index is below the strike. If that number would be negative, intrinsic value is simply zero, because an option is a right and nobody is forced to use a right that loses money.`,
    conceptHi:
      `Intrinsic value ek sawaal ka jawab hai: agar main abhi is option ko exercise kar sakta, toh mujhe kitna milta? Call ke liye yeh index minus strike hai, put ke liye strike minus index. Agar number negative aaye toh intrinsic value zero hoti hai, kyunki option ek right hai aur loss wala right use karne ke liye koi majboor nahi.`,
    mechanism:
      `The formulas are Call: max(S - K, 0) and Put: max(K - S, 0), where S is the index level and K the strike. On NSE, index options are European and cash-settled, so at expiry the exchange applies exactly this formula to the final settlement price and credits the buyer the result per unit, multiplied by the lot size. Before expiry nobody receives intrinsic value in cash; it is only the floor that the premium tends to sit above, with time value on top.`,
    example: {
      title: 'Intrinsic value of calls and puts at NIFTY 24,150 (illustrative)',
      text: `NIFTY 24,150. 24,000 CE: 24,150 - 24,000 = 150. 24,100 CE: 50. 24,200 CE: 24,150 - 24,200 is negative, so 0. 24,300 PE: 24,300 - 24,150 = 150. 24,100 PE: 24,100 - 24,150 is negative, so 0. One lot of 65 of the 24,000 CE has intrinsic value 150 x 65 = ₹9,750 if settled at 24,150.`,
    },
    chart: {
      kind: 'curve',
      title: 'Intrinsic value of a call as the index rises',
      caption: 'Flat at zero up to the strike, then rising one point for every point of index move.',
      curve: 'payoff-call',
    },
    optionChain:
      `Most option-chain screens shade the in-the-money strikes. For calls, the shaded rows are the strikes below the index; for puts, the shaded rows are above it. The difference between the index and the strike on a shaded row is its intrinsic value. If the LTP of an ITM option is higher than that gap, the excess is time value. If a screen shows LTP below the gap for a real traded strike, check the quote: a stale or illiquid price is the usual reason.`,
    psychology:
      `Beginners often buy ITM options because they feel safer: the option already has value. But a high intrinsic value means a high premium, so the rupees at risk are larger, and a fall in the index erodes intrinsic value point for point. Intrinsic value is real, but it is not protected: it can vanish if the index reverses before expiry.`,
    scenarios: {
      bullish:
        `If NIFTY rises from 24,000 to 24,300, a 24,000 CE goes from intrinsic 0 to 300, gaining 300 points on intrinsic alone, so ₹19,500 per lot at lot 65 before any change in time value.`,
      bearish:
        `If NIFTY falls from 24,000 to 23,700, a 24,000 CE intrinsic stays at 0, while a 24,000 PE intrinsic rises from 0 to 300, which is ₹19,500 per lot.`,
      sideways:
        `If NIFTY hovers around 24,000, intrinsic values of nearby strikes stay near zero or small, so most of the premium is time value, which decays. The ITM option's intrinsic value is unchanged, but its time value shrinks.`,
    },
    practice: [
      {
        q: `NIFTY is 24,350. Find intrinsic value of the 24,200 CE, 24,400 CE, 24,500 PE and 24,300 PE.`,
        a: `24,200 CE: 24,350 - 24,200 = 150. 24,400 CE: 24,350 - 24,400 = -50, so 0. 24,500 PE: 24,500 - 24,350 = 150. 24,300 PE: 24,300 - 24,350 = -50, so 0.`,
      },
      {
        q: `The 23,800 CE trades at ₹317.69 when NIFTY is 24,000. What is its intrinsic value, time value and one-lot premium cost at lot 65?`,
        a: `Intrinsic = 24,000 - 23,800 = 200. Time value = 317.69 - 200 = ₹117.69. One lot costs 317.69 x 65 = ₹20,649.85, about ₹20,650. Of that, 200 x 65 = ₹13,000 is intrinsic and ₹7,650 (rounded) is time value.`,
      },
      {
        q: `At expiry NIFTY settles at 24,260. A trader holds one lot (65) of the 24,100 CE bought at ₹150. What is the net result?`,
        a: `Intrinsic = 24,260 - 24,100 = 160. Net per unit = 160 - 150 = +10. For one lot = 10 x 65 = +₹650 before charges. Breakeven is 24,250.`,
      },
    ],
    assignment:
      `Pick today's NIFTY level. Choose three CE strikes and three PE strikes (some in the money, some out). For each, calculate intrinsic value by hand, then subtract it from the live LTP to get time value. Present the six rows in a table and mark which ones have zero intrinsic value.`,
  },
  topics: [
    {
      t: 1,
      def: `Intrinsic value is the amount an option would be worth if it were exercised immediately. It measures how far the option is already in the money, and it can never be less than zero.`,
      hi: `Intrinsic value woh amount hai jo option ki hogi agar usse abhi exercise kar diya jaye. Yeh batati hai ki option kitna in the money hai, aur yeh zero se neeche kabhi nahi jaati.`,
      how: `It depends only on the index level and the strike, not on time, volatility or interest rates. At expiry, the premium of an option equals its intrinsic value, because time value has run out. Before expiry, premium is intrinsic value plus time value, and intrinsic value is the part that depends on where the index is now.`,
      eg: {
        title: 'A 23,900 CE with NIFTY at 24,000 (illustrative)',
        text: `Intrinsic value = 24,000 - 23,900 = 100 points. For one lot of 65 that is 100 x 65 = ₹6,500. If the option trades at ₹253.55 (7 days, VIX 14), the other 153.55 is time value.`,
      },
      tip: `Intrinsic value is a floor-type concept, not a profit number. Your profit also depends on the premium you paid.`,
      visual: {
        kind: 'layers',
        title: 'Intrinsic value inside the premium',
        caption: '23,900 CE at spot 24,000: premium 253.55 = 100 intrinsic + 153.55 time value. Illustrative model.',
        layers: [
          { label: 'Premium 253.55', tone: 'gold' },
          { label: 'Intrinsic value 100', note: 'Spot 24,000 minus strike 23,900', tone: 'ice' },
          { label: 'Time value 153.55', tone: 'neutral' },
        ],
      },
      calc: {
        id: 'premium-split',
        preset: { optType: 'CE', spot: 24000, strike: 23900, premium: 253.55 },
        why: 'Splits the premium into intrinsic and time value.',
      },
    },
    {
      t: 2,
      def: `For a call option, intrinsic value = index level minus strike, if that is positive; otherwise it is zero. A call has intrinsic value only when the index trades above its strike.`,
      hi: `Call option ke liye intrinsic value = index level minus strike, agar yeh positive ho; warna zero. Call mein intrinsic value tabhi hoti hai jab index strike ke upar ho.`,
      how: `The call buyer has the right to buy at the strike. If the index is higher than the strike, that right is worth the difference. If the index is lower, using the right would be a loss, so the right is worth nothing today. Every extra point of the index above the strike adds one point to the call's intrinsic value. For index options, the real payoff is in cash at settlement.`,
      eg: {
        title: 'Three call strikes at NIFTY 24,150',
        text: `24,000 CE: 150. 24,100 CE: 50. 24,200 CE: 0. One lot of 65: 150 x 65 = ₹9,750, 50 x 65 = ₹3,250, 0 x 65 = ₹0. A 24,100 CE bought at ₹150 and settled at 24,150 shows an intrinsic value of 50, so the buyer is still down 100 per unit (₹6,500 per lot).`,
      },
      tip: `Compare intrinsic value with what you paid, not with zero. An in-the-money call can still be a losing trade.`,
      visual: {
        kind: 'bars',
        title: 'Call intrinsic value at NIFTY 24,150',
        unit: ' pts',
        items: [
          { label: '24,000 CE', value: 150, tone: 'bull' },
          { label: '24,100 CE', value: 50, tone: 'bull' },
          { label: '24,200 CE', value: 0, tone: 'neutral' },
          { label: '24,300 CE', value: 0, tone: 'neutral' },
        ],
      },
      calc: {
        id: 'moneyness',
        preset: { optType: 'CE', spot: 24150, strike: 24000 },
        why: 'Check whether a call is in the money and by how many points.',
      },
    },
    {
      t: 3,
      def: `For a put option, intrinsic value = strike minus index level, if positive; otherwise zero. A put has intrinsic value only when the index trades below its strike.`,
      hi: `Put option ke liye intrinsic value = strike minus index level, agar positive ho; warna zero. Put mein intrinsic value tabhi hoti hai jab index strike ke neeche ho.`,
      how: `The put buyer has the right to sell at the strike. If the index has fallen below the strike, selling at the higher strike is worth the difference. If the index is above the strike, the put is worth nothing today. A put on an index is cash-settled, so the buyer receives money rather than delivering shares. As the index falls, a put's intrinsic value rises point for point.`,
      eg: {
        title: 'Three put strikes at NIFTY 23,850',
        text: `24,000 PE: 24,000 - 23,850 = 150. 23,900 PE: 50. 23,800 PE: 0. For lot 65: 150 x 65 = ₹9,750, 50 x 65 = ₹3,250, 0 = ₹0. A put buyer pays for the right to sell high and benefits from a fall; below the strike each point lower adds one point of value.`,
      },
      tip: `A put's intrinsic value rises when the index falls. Do not mix up the direction: call = index minus strike, put = strike minus index.`,
      visual: {
        kind: 'curve',
        title: 'Intrinsic value of a put',
        caption: 'Zero above the strike; rises as the index falls below it.',
        curve: 'payoff-put',
      },
      calc: {
        id: 'moneyness',
        preset: { optType: 'PE', spot: 23850, strike: 24000 },
        why: 'Check a put against the index and read the in-the-money gap.',
      },
    },
    {
      t: 4,
      def: `An in-the-money (ITM) option is one that already has intrinsic value. Its premium is intrinsic value plus some time value. The deeper the option is in the money, the larger the intrinsic share of its price.`,
      hi: `In the money (ITM) option woh hai jisme intrinsic value pehle se hai. Uska premium intrinsic value plus thodi time value hota hai. Option jitna deep ITM hoga, premium mein intrinsic ka hissa utna bada hoga.`,
      how: `A deep ITM option tracks the index almost one for one (delta close to 1 for calls, close to -1 for puts), so it behaves like holding the underlying with a small time-value cost. Its premium is large in rupees because intrinsic value is large, so it needs more capital per lot. Margin for selling such an option is also high. The time value in an ITM option is usually smaller than in an ATM option with the same expiry.`,
      eg: {
        title: 'ITM call and ITM put at NIFTY 24,000 (illustrative)',
        text: `7 days, VIX 14 (model). 23,800 CE = 317.69 = 200 intrinsic + 117.69 time value. 24,200 PE = 287.23 = 200 intrinsic + 87.23 time value. 24,500 PE = 513.71 = 500 intrinsic + 13.71 time value. One lot of the 23,800 CE costs 317.69 x 65 = about ₹20,650.`,
      },
      tip: `Deep ITM options cost more in rupees but carry little time value. They are not 'safer': a fall in the index still costs you point for point.`,
      visual: {
        kind: 'bars',
        title: 'Premium split of ITM puts (spot 24,000, 7 days)',
        unit: ' pts',
        caption: 'Intrinsic share grows with depth. Illustrative model.',
        items: [
          { label: '24,200 PE: intrinsic', value: 200, tone: 'ice' },
          { label: '24,200 PE: time', value: 87.23, tone: 'neutral' },
          { label: '24,500 PE: intrinsic', value: 500, tone: 'ice' },
          { label: '24,500 PE: time', value: 13.71, tone: 'neutral' },
        ],
      },
      calc: {
        id: 'premium-split',
        preset: { optType: 'CE', spot: 24000, strike: 23800, premium: 317.69 },
        why: 'See how much of an ITM premium is intrinsic value.',
      },
    },
    {
      t: 5,
      def: `An out-of-the-money (OTM) option has zero intrinsic value, because exercising it now would produce a loss. Its entire premium is time value, the price of the chance that it becomes profitable before expiry.`,
      hi: `Out of the money (OTM) option ki intrinsic value zero hoti hai, kyunki ise abhi exercise karne par loss hota. Uska poora premium time value hota hai, yaani expiry se pehle profitable ho jaane ke chance ki price.`,
      how: `The option is a right, not an obligation, so its worst case at settlement is zero, never a negative number. That is why intrinsic value is floored at zero. An OTM option gains value only if the index moves through its strike, which gets harder as expiry nears, so its premium usually shrinks over time. At expiry, if it stays OTM, it expires worthless and the buyer loses the whole premium.`,
      eg: {
        title: '24,200 CE and 23,800 PE at NIFTY 24,000 (illustrative)',
        text: `7 days, VIX 14 (model). 24,200 CE = 111.40, all time value; one lot = 111.40 x 65 = ₹7,241. 23,800 PE = 94.03, all time value; one lot about ₹6,112. At expiry, if NIFTY settles at 24,200 or below, the call is worth zero and the buyer loses the ₹7,241 premium.`,
      },
      tip: `An OTM option needs a big enough move, not just the right direction. Check the breakeven, strike plus premium for calls, before buying.`,
      visual: {
        kind: 'ladder',
        title: 'Calls above the index are OTM',
        optType: 'CE',
        spot: 24000,
        strikes: [23800, 23900, 24000, 24100, 24200],
      },
      calc: {
        id: 'premium-split',
        preset: { optType: 'CE', spot: 24000, strike: 24200, premium: 111.4 },
        why: 'Confirms that an OTM option has zero intrinsic value and all time value.',
      },
    },
    {
      t: 6,
      def: `As the index moves, the intrinsic value of options changes: calls gain when the index rises above their strike, puts gain when it falls below. Once an option is in the money, intrinsic value changes point for point with the index.`,
      hi: `Jaise index move karta hai, options ki intrinsic value badalti hai: call tab gain karta hai jab index strike ke upar jaye, put tab jab neeche jaye. Option in the money hone ke baad intrinsic value index ke saath point-for-point badalti hai.`,
      how: `Intrinsic value is a hockey-stick: flat at zero while the option is OTM, then a straight diagonal once it crosses the strike. The total premium is smoother than that, because time value is largest near the strike and fades on either side. So an ATM option's premium moves by about half of each index point, while a deep ITM option moves almost a full point. Always remember that intrinsic value is not your profit: the premium you paid is subtracted from it.`,
      eg: {
        title: '24,000 CE intrinsic value as NIFTY moves',
        text: `NIFTY 23,800: 0. 23,900: 0. 24,000: 0. 24,100: 100. 24,200: 200. 24,300: 300. In rupees for lot 65: 0, 0, 0, ₹6,500, ₹13,000, ₹19,500. For the 24,000 PE the picture reverses: at 23,700 it is 300 points, ₹19,500 per lot.`,
      },
      tip: `Intrinsic value is a payoff line. Premium paid shifts your profit line down; do not confuse the two.`,
      visual: {
        kind: 'bars',
        title: '24,000 CE intrinsic value by NIFTY level',
        unit: ' pts',
        items: [
          { label: 'NIFTY 23,900', value: 0, tone: 'neutral' },
          { label: 'NIFTY 24,000', value: 0, tone: 'neutral' },
          { label: 'NIFTY 24,100', value: 100, tone: 'bull' },
          { label: 'NIFTY 24,200', value: 200, tone: 'bull' },
          { label: 'NIFTY 24,300', value: 300, tone: 'bull' },
        ],
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 436.33, expiryPrice: 24300, lotSize: 65, lots: 1 },
        why: 'Intrinsic value at expiry minus the premium paid gives the real net result.',
      },
    },
  ],
}
export default m
