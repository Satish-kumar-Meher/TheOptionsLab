import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '6.6',
  intro:
    `Rho is the Greek for interest rates. It measures how an option's price changes when the risk-free interest rate changes by one percentage point. For short-dated Nifty options, rho is the smallest of the main Greeks, but it grows with time to expiry. Numbers below are illustrative Black-Scholes values (Nifty 24,000, IV 14%, rate 6.5% as a model input, lot 65 - check the current NSE contract specification).`,
  introHi:
    `Rho interest rate ka Greek hai. Yeh batata hai ki risk-free interest rate ek percentage point badalne par option ka price kitna badalta hai. Chhote expiry wale Nifty options ke liye rho main Greeks mein sabse chhota hota hai, lekin time badhne ke saath yeh badhta hai. Neeche ke numbers illustrative Black-Scholes values hain (Nifty 24,000, IV 14%, rate 6.5% model input, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `Rho tells you how many rupees an option's premium changes if the interest rate used in pricing changes by one percentage point. Call premiums rise with interest rates and put premiums fall. The effect comes from the cost of money: buying the index through a call ties up less capital than owning it, and the saved interest has a value.`,
    conceptHi:
      `Rho batata hai ki pricing mein use hone wala interest rate ek percentage point badalne par option premium kitne rupees badalega. Interest rate badhne par call premium badhta hai aur put premium ghatta hai. Iska reason paise ki cost hai: call khareedna index khareedne se kam capital rokta hai, aur bachi hui interest ki value hoti hai.`,
    mechanism:
      `In the Black-Scholes model the strike is discounted at the risk-free rate, so a higher rate lowers the present value of the strike. That lifts calls and lowers puts. The effect is proportional to the time left, which is why a 90-day option has far more rho than a 7-day option. In India, rates move in steps (for example, the RBI changes the policy repo rate in steps of 0.25 percentage point at its scheduled meetings), and many index option prices are tied to the futures price, which already includes the cost of carry. As a result, rho is rarely the main driver of a Nifty option trade.`,
    example: {
      title: 'Rho by expiry for the ATM 24,000 options (illustrative)',
      text: `Per one percentage point change in rate: 7 days: CE +₹2.40, PE -₹2.20. 30 days: CE +₹10.69, PE -₹8.93. 90 days: CE +₹33.64, PE -₹24.60. For one lot of 65 on the 90-day CE that is about ₹2,187 per point of interest rate; on the 7-day CE it is about ₹156.`,
    },
    chart: {
      kind: 'bars',
      title: 'Rho of the ATM 24,000 CE by days to expiry (illustrative, ₹ per 1% rate)',
      caption: 'Rho grows with time. For weekly options it is tiny compared with delta, theta and vega.',
      unit: ' ₹',
      items: [
        { label: '7 days', value: 2.4, tone: 'ice' },
        { label: '30 days', value: 10.69, tone: 'ice' },
        { label: '90 days', value: 33.64, tone: 'gold' },
      ],
    },
    optionChain:
      `The chain does not show rho for index options, and most retail platforms do not display it. You will not see rate effects directly. What you can see is that deeper in-the-money and longer-dated options may show premiums slightly different from a simple intrinsic-plus-time estimate, and that futures prices on the same expiry reflect the cost of carry.`,
    psychology:
      `Beginners usually ignore rho, and for weekly options that is a fair simplification. The mistake is to assume that RBI policy days move options only through rho. In practice, the policy announcement affects IV and spot far more than the small change in the discount rate.`,
    scenarios: {
      bullish:
        `If interest rates rise while spot is unchanged, a long call gains slightly and a long put loses slightly. The size is small for weekly options and noticeable only for long-dated ones.`,
      bearish:
        `If rates fall, long calls lose a little and long puts gain a little. A rate cut that boosts equities may still help a call through delta and vega far more than it hurts through rho.`,
      sideways:
        `With spot and IV flat, a small rate change causes a small drift in premiums. Theta typically outweighs rho for short-dated options.`,
    },
    practice: [
      {
        q: `The 7-day ATM CE has rho ₹2.40 and the PE has rho -₹2.20. What is the change in the CE per unit and per lot if the rate falls from 6.5% to 6.25%?`,
        a: `Change in rate = -0.25 point. CE change ≈ 2.40 × (−0.25) = −₹0.60 per unit. One lot of 65 = −0.60 × 65 = about −₹39 (the model price moves from ₹200.85 to ₹200.25).`,
      },
      {
        q: `The 90-day ATM CE is ₹868.45 at 6.5% and ₹902.45 at 7.5%. What is the change per lot and how does it compare with rho 33.64?`,
        a: `Change = 902.45 − 868.45 = ₹34.00 per unit, × 65 = ₹2,210 per lot. Rho of 33.64 predicts ₹33.64, close to the full repricing.`,
      },
      {
        q: `Why is the put rho negative while the call rho is positive?`,
        a: `A higher interest rate reduces the present value of the strike. A call, which gives the right to pay the strike later, gains. A put, which gives the right to receive the strike later, loses. Hence call rho is positive and put rho negative.`,
      },
    ],
    assignment:
      `Open the Greeks calculator for the 24,000 CE and PE. Keep spot, IV and strike fixed and vary the rate from 5.5% to 7.5% in 0.5 steps for 7, 30 and 90 days. Record premium changes in a table and note for which expiry the rate effect becomes visible. Write two sentences on whether rho should matter in your weekly trading.`,
  },
  topics: [
    {
      t: 1,
      def: `Rho (ρ) is the Greek that measures how much an option's premium changes when the risk-free interest rate changes by one percentage point, other things constant. It is positive for calls and negative for puts.`,
      hi: `Rho (ρ) woh Greek hai jo batata hai ki risk-free interest rate ek percentage point badalne par option ka premium kitna badalta hai, baaki cheezein same rakhein toh. Call ke liye yeh positive hota hai aur put ke liye negative.`,
      how: `Rho is quoted per unit per one percentage point of interest rate. In models such as Black-Scholes the rate is a risk-free rate like a government treasury yield; the exact choice differs between desks. Rho is computed as a derivative of the price with respect to the rate, so it gives a first-order estimate. It grows roughly with time to expiry and with how far the option is in the money.`,
      eg: {
        title: 'Rho of the 7-day ATM call (illustrative)',
        text: `For the 24,000 CE with 7 days left and IV 14%, rho is ₹2.40. If the model rate rises from 6.5% to 7.5% the price should rise by about ₹2.40 per unit, from ₹200.85 to about ₹203.25. For one lot of 65 that is about ₹156 for a full 1 percentage point change.`,
      },
      tip: `Rho is real but small for weekly options. Know what it is, and do not spend more attention on it than on delta, theta and vega.`,
      visual: { kind: 'flow', title: 'Rate change to option price', steps: [{ label: 'Interest rate rises', note: 'Cost of money goes up' }, { label: 'Present value of strike falls', note: 'Discounting at a higher rate' }, { label: 'Call premium up, put premium down', note: 'Size set by rho' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Read rho on the Greeks panel for the 7-day ATM call.' },
    },
    {
      t: 2,
      def: `Interest-rate sensitivity is how much an option's price reacts to changes in interest rates. It is stronger for options with a long time to expiry and weak for short-dated ones.`,
      hi: `Interest-rate sensitivity ka matlab hai ki interest rate badalne par option ka price kitna react karta hai. Lamba expiry ho toh yeh zyada hoti hai aur chhote expiry mein bahut kam.`,
      how: `Money has a time value. For a short option you hold only for a few days, the interest on the strike or the premium is tiny. For a three-month option it is substantial. RBI policy decisions change market yields and so the discount rate used in models, but a typical RBI move is 0.25 percentage point. Index futures already embed the financing cost, so the same effect shows up in the futures price and the put-call parity relation.`,
      eg: {
        title: 'One point of interest rate, 30-day ATM options (illustrative)',
        text: `Spot 24,000, IV 14%, 30 days. At a rate of 6.5% the 24,000 CE is ₹450.57 and the PE ₹322.69. At 7.5% the CE is ₹461.34 (+₹10.77, ₹700.05 per lot) and the PE is ₹313.85 (−₹8.84, ₹574.60 per lot). The call gained and the put lost, by a similar amount.`,
      },
      tip: `Time multiplies rho. If you plan to hold long-dated options, notice rate changes; for weekly options they rarely matter.`,
      visual: { kind: 'bars', title: '30-day ATM premium at 6.5% vs 7.5% interest rate (illustrative, ₹)', unit: ' ₹', items: [{ label: 'CE at 6.5%', value: 450.57, tone: 'ice' }, { label: 'CE at 7.5%', value: 461.34, tone: 'gold' }, { label: 'PE at 6.5%', value: 322.69, tone: 'ice' }, { label: 'PE at 7.5%', value: 313.85, tone: 'gold' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 30, iv: 14, rate: 7.5 }, why: 'Change the rate input and see the call premium move.' },
    },
    {
      t: 3,
      def: `Rho for a call option (CE) is positive: when interest rates rise, call premiums tend to rise slightly. A higher rate lowers the present value of the strike you will pay, which makes the call more valuable.`,
      hi: `CE ka rho positive hota hai: interest rates badhne par call premium thoda badh jaata hai. Rate zyada hone par jo strike aapko baad mein dena hai uski present value kam ho jaati hai, isliye call zyada valuable ho jaata hai.`,
      how: `Another way to see it: a call lets you control the index while keeping the money in an interest-bearing account until expiry. The higher the interest rate, the bigger the benefit of that delay. Rho of a call grows with strike and time and is highest for ITM, long-dated calls. For a weekly call it may be only a couple of rupees per percentage point.`,
      eg: {
        title: '90-day ATM call (illustrative)',
        text: `Spot 24,000, IV 14%, 90 days, rate 6.5%: the 24,000 CE is ₹868.45 with rho 33.64. At 7.5% the model gives ₹902.45, a rise of ₹34.00 per unit (₹2,210 per lot of 65). The 7-day call with rho 2.40 changes by only about ₹156 per lot for the same 1 point.`,
      },
      tip: `Positive rho for calls is a model effect. Do not buy a call because rates may rise; for index options, direction and volatility matter far more.`,
      visual: { kind: 'bars', title: 'CE rho by days to expiry (illustrative, ₹ per 1% rate)', unit: ' ₹', items: [{ label: '7 days', value: 2.4, tone: 'ice' }, { label: '30 days', value: 10.69, tone: 'ice' }, { label: '90 days', value: 33.64, tone: 'gold' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 90, iv: 14, rate: 6.5 }, why: 'See rho of a long-dated call.' },
    },
    {
      t: 4,
      def: `Rho for a put option (PE) is negative: when interest rates rise, put premiums tend to fall slightly. A put gives the right to receive the strike later, and a higher rate lowers the present value of that cash.`,
      hi: `PE ka rho negative hota hai: interest rates badhne par put premium thoda ghat jaata hai. Put se strike ka paisa baad mein milta hai, aur zyada rate par us paise ki present value kam ho jaati hai.`,
      how: `A put holder gives up the interest that could have been earned on the sale proceeds if the underlying were sold today. The higher the rate, the more that delay costs, so the put is worth less. Put rho is generally smaller in magnitude than call rho at the same strike and spot in the model, because the ATM call is a little more in the money in forward terms. Again, the effect is small for weekly options.`,
      eg: {
        title: '90-day ATM put (illustrative)',
        text: `Spot 24,000, IV 14%, 90 days: the 24,000 PE is ₹486.86 at a rate of 6.5% with rho −24.60. At 7.5% the model gives ₹462.69, a fall of ₹24.17 per unit (₹1,571.05 per lot of 65). For a 7-day put at 6.25% instead of 6.5%, the price rises just ₹0.55 (from ₹170.95 to ₹171.50).`,
      },
      tip: `Rate cuts slightly help puts and rate hikes slightly hurt them in the model; the effect is overshadowed by what the same event does to spot and IV.`,
      visual: { kind: 'compare', title: 'Rho sign by option type', left: { head: 'Call (CE)', tone: 'bull', points: ['Rho positive', 'Higher rates: premium up', 'Largest for long-dated ITM calls'] }, right: { head: 'Put (PE)', tone: 'bear', points: ['Rho negative', 'Higher rates: premium down', 'Still small for weekly options'] } },
    },
    {
      t: 5,
      def: `The practical relevance of rho for index options is low. Weekly and monthly Nifty options are short-dated, interest rates change slowly, and volatility, time and direction move prices much more.`,
      hi: `Index options ke liye rho ki practical importance kam hai. Weekly aur monthly Nifty options chhote expiry ke hote hain, interest rate dheere badalti hai, aur volatility, time aur direction price ko kaafi zyada hilate hain.`,
      how: `Compare typical moves: a 0.25 point rate change moves a 7-day ATM call by about ₹0.60, while a 1-point IV change moves it by about ₹13.22, and a day of theta takes about ₹15. Rates matter more for long-dated contracts, for dividend and carry assumptions in arbitrage, and in how futures are priced against spot. For a retail option trader on Nifty weeklies, a good habit is to know rho exists but rank it last.`,
      eg: {
        title: 'Ranking Greeks effects for a 7-day ATM call (illustrative)',
        text: `Rate 6.5% to 6.25%: −₹0.60. IV 14% to 13%: −₹13.22 (about). One day of theta: −₹15.45. Nifty 50 points up (delta 0.53): about +₹26.5. A 25-bp rate cut is worth about 0.60 ÷ 15.45 = about 4% of one day's theta.`,
      },
      tip: `Spend your attention where the money is: delta, theta, vega first. Revisit rho only for long-dated positions.`,
      visual: { kind: 'bars', title: 'Typical one-event effects on a 7-day ATM CE (illustrative, ₹)', caption: 'Rate change of 0.25 point vs 1 IV point vs 1 day of theta vs a 50-point spot move.', unit: ' ₹', items: [{ label: 'Rate -0.25 pt', value: 0.6, tone: 'neutral' }, { label: 'IV -1 pt', value: 13.22, tone: 'ice' }, { label: 'One day of theta', value: 15.45, tone: 'ice' }, { label: 'Spot +50 pts', value: 26.5, tone: 'gold' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 5.5 }, why: 'Set the rate 1 point lower and check how little a 7-day option changes.' },
    },
  ],
  tools: [{ id: 'greeks', preset: { optType: 'PE', spot: 24000, strike: 24000, days: 90, iv: 14, rate: 6.5 } }],
}
export default m
