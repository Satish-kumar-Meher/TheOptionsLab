import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '6.4',
  intro:
    `Theta is the Greek for time. Every option is a wasting asset: as expiry gets closer, the time value in the premium shrinks. This module shows how much an option can lose per day, why the loss speeds up near expiry, and why theta helps sellers and hurts buyers. All numbers are illustrative Black-Scholes values (Nifty 24,000, IV 14%, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `Theta time ka Greek hai. Har option ek wasting asset hai: expiry paas aati hai toh premium ki time value ghatti jaati hai. Is module mein dekhenge ki ek option din mein kitna loss kar sakta hai, expiry ke paas yeh loss tez kyun hota hai, aur theta seller ko kaise help aur buyer ko kaise hurt karta hai. Saare numbers illustrative Black-Scholes values hain (Nifty 24,000, IV 14%, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `Theta measures how much an option's premium falls with one more day of time passing, if spot and implied volatility do not change. It is negative for anyone who owns an option and positive for anyone who has sold one. Only the time value part of a premium decays; intrinsic value does not decay by itself. At expiry, time value is zero.`,
    conceptHi:
      `Theta batata hai ki ek din aur guzarne par option ka premium kitna kam hoga, agar spot aur implied volatility na badle. Option khareedne wale ke liye theta negative hota hai aur bechne wale ke liye positive. Sirf time value decay hoti hai; intrinsic value apne aap decay nahi hoti. Expiry par time value zero ho jaati hai.`,
    mechanism:
      `Time value depends roughly on the square root of time left, so it falls slowly when expiry is far and fast when expiry is near. ATM options have the most time value, so they lose the most rupees per day. Deep ITM and deep OTM options have little time value to lose. Expiry on NSE index options is on Tuesday, so the last day carries the sharpest decay. The Black-Scholes model counts calendar days; in real markets, traders and market makers often price weekends and holidays differently, so treat model numbers as a guide.`,
    example: {
      title: 'ATM 24,000 CE as expiry approaches (illustrative)',
      text: `With Nifty flat at 24,000 and IV 14%: 30 days left ₹450.57 (theta -₹8.65/day), 14 days ₹293.15 (-₹11.59), 7 days ₹200.85 (-₹15.45), 3 days ₹128.01 (-₹22.43), 1 day ₹72.31 (-₹37.24). One lot of 65 loses about ₹562 a day at 30 days left but about ₹2,421 a day on the last day. The same option decays faster each day.`,
    },
    chart: {
      kind: 'bars',
      title: 'Daily theta of the ATM 24,000 CE (illustrative, ₹ per unit per day)',
      caption: 'The time cost per day rises as expiry gets closer. Multiply by 65 for one lot.',
      unit: ' ₹',
      items: [
        { label: '30 days left', value: 8.65, tone: 'ice' },
        { label: '14 days left', value: 11.59, tone: 'ice' },
        { label: '7 days left', value: 15.45, tone: 'gold' },
        { label: '3 days left', value: 22.43, tone: 'gold' },
        { label: '1 day left', value: 37.24, tone: 'bear' },
      ],
    },
    optionChain:
      `The chain does not show theta by default; many platforms add it as an optional Greeks column. You can still see time decay by comparing the same strike's LTP at the same spot on different days. Compare ATM and OTM rows: ATM loses the most rupees, while far-OTM rows are already close to zero. On expiry day, the premiums of strikes that are not near spot collapse towards ₹0.05 to ₹1.`,
    psychology:
      `Buyers feel time decay as a slow leak that they only notice when the premium falls despite a correct view. Sellers like theta because it works for them every day, but may forget that a sharp move can wipe out many days of decay. Holding a long option in a quiet market with the hope that the move will come tomorrow is a common and expensive habit.`,
    scenarios: {
      bullish:
        `A call buyer needs a rise large enough to beat theta. After 3 flat days the ATM call is down ₹51.87, so spot must rise about 90 points just to get back to the original premium. A fast rally can outrun theta; a slow grind may not.`,
      bearish:
        `A put buyer faces the same decay. If the fall comes late in the week, theta has already removed a large part of the premium. A call seller gains from theta and from a fall in spot, but is exposed if the market rallies.`,
      sideways:
        `Sideways is the best case for theta-positive sellers and the worst case for buyers. Premiums of both CE and PE melt as expiry nears, and the last day is the fastest.`,
    },
    practice: [
      {
        q: `The ATM 24,000 CE has theta -₹15.45 per unit at 7 days. What does one lot of 65 lose per day from time decay alone?`,
        a: `15.45 × 65 = ₹1,004.25 per day, other things unchanged.`,
      },
      {
        q: `On the last day the same option has theta -₹37.24. What fraction of its ₹72.31 price is that, compared with 7 days left (₹15.45 on ₹200.85)?`,
        a: `Last day: 37.24 ÷ 72.31 = 51.5%. At 7 days: 15.45 ÷ 200.85 = 7.7%. Decay per day as a share of price is about 6.7 times larger on the last day.`,
      },
      {
        q: `A trader sells the 24,000 CE at ₹200.85 with 7 days left. After 3 days with Nifty unchanged the option is ₹148.98. What is the gain per lot? What happens if Nifty has risen 200 points instead (option ₹275.22)?`,
        a: `Flat: 200.85 − 148.98 = ₹51.87 per unit × 65 = ₹3,371.55. After a 200-point rise: 275.22 − 200.85 = ₹74.37 loss per unit × 65 = ₹4,834.05. Theta gain does not protect against a large move.`,
      },
      {
        q: `A call buyer holds a 24,000 CE bought at ₹200.85 with 7 days left. Roughly where must Nifty be after 3 days for the option to be worth the same?`,
        a: `With 4 days left and IV 14%, the model gives ₹200.53 at 24,090 and ₹203.02 at 24,094, so about 24,090. That is a rise of about 90 points just to be even.`,
      },
    ],
    assignment:
      `Use the Greeks calculator. For the 24,000 CE and PE with Nifty fixed at 24,000, enter days = 7, 6, 5, 4, 3, 2, 1 and record the premium and theta each time. Plot or tabulate the daily loss as a percentage of the day's starting premium. Write three sentences on which days of the week a premium buyer should be most careful.`,
  },
  topics: [
    {
      t: 1,
      def: `Theta (Θ) is the Greek that measures how much an option's price falls with one day passing, if spot and implied volatility stay the same. It is the price you pay for holding an option and the income you earn for selling one.`,
      hi: `Theta (Θ) woh Greek hai jo batata hai ki ek din guzarne par option ka price kitna girta hai, agar spot aur implied volatility same rahein. Option hold karne ka yeh cost hai aur option bechne par yeh aapki kamai hai.`,
      how: `Theta is quoted per unit per calendar day. Multiply by the lot size to get rupees per lot. A buyer sees theta as negative (the premium shrinks) and a seller as positive. Theta is not a separate cash charge: it is part of how the premium is re-priced as the market closes each day, so it shows up in the mark-to-market of the position. Brokers' platforms may show it per day; check whether yours uses calendar days or trading days.`,
      eg: {
        title: 'Theta of an ATM call (illustrative)',
        text: `Nifty 24,000, 7 days left, IV 14%: the 24,000 CE is ₹200.85 with theta -₹15.45. One lot (65) loses about 15.45 × 65 = ₹1,004.25 a day from time passing alone. The same 24,000 PE has theta -₹11.18, about ₹726.70 a lot.`,
      },
      tip: `Theta is a daily bill for buyers. Before you buy an option, ask: how much do I pay every day, and how fast must the market move to cover it?`,
      visual: { kind: 'curve', title: 'Theta curve', caption: 'Theta (time decay) becomes steeper as expiry approaches.', curve: 'theta' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Read theta for the 7-day ATM call and multiply by the lot size.' },
    },
    {
      t: 2,
      def: `Time decay is the gradual fall in the time-value part of an option's premium as expiry gets closer. It happens because there is less time left for the underlying to make a big move.`,
      hi: `Time decay ka matlab hai ki expiry paas aate-aate option premium ka time value wala hissa dheere-dheere kam hota jaata hai. Aisa isliye hota hai kyunki underlying ko bada move karne ke liye time kam bachta hai.`,
      how: `Premium = intrinsic value + time value. Time value is high when many days remain and when volatility is high. It does not fall in a straight line: because it is related to the square root of time, an option loses little per day at first and much more per day at the end. When spot and IV are constant, an option bought today is worth less tomorrow. If the market rises or IV expands, those gains can offset the decay.`,
      eg: {
        title: 'ATM call losing time value (illustrative)',
        text: `Nifty stays at 24,000 and IV at 14%. The 24,000 CE: 7 days ₹200.85, 6 days ₹184.89 (-15.96), 5 days ₹167.73 (-17.16), 3 days ₹128.01, 2 days ₹103.54, 1 day ₹72.31, expiry ₹0. The final day removes ₹72.31, more than the first four days put together (about ₹72.8 in the first four days).`,
      },
      tip: `Time decay is certain; the move you hope for is not. Hold an option only as long as you have a reason for the move to arrive soon.`,
      visual: { kind: 'curve', title: 'Time value falls as expiry approaches', caption: 'Slow at first, fast at the end.', curve: 'timeValue' },
    },
    {
      t: 3,
      def: `Daily theta decay is the rupee amount an option loses each day. It is small when expiry is far away and large near expiry, so the cost of holding an option changes every day.`,
      hi: `Daily theta decay woh rupee amount hai jo option har din khota hai. Expiry door ho toh yeh kam hota hai aur expiry ke paas zyada, isliye option hold karne ka cost har din badalta rehta hai.`,
      how: `The decay is not the same each day. An ATM Nifty option with 30 days left loses a little under ₹9 a day per unit; with 1 day left it loses over ₹37 per unit. A weekly NIFTY option on a Tuesday expiry therefore spends most of its decay in the last two or three sessions. Always read theta in the context of how many days are left, not as a fixed number.`,
      eg: {
        title: 'Theta per lot per day, ATM CE (illustrative)',
        text: `Theta per unit: 30 days -8.65, 14 days -11.59, 7 days -15.45, 3 days -22.43, 1 day -37.24. Per lot of 65: ₹562.25, ₹753.35, ₹1,004.25, ₹1,457.95 and ₹2,420.6 a day. Holding for the last three days of the week costs far more than the first three.`,
      },
      tip: `Do not average theta across the week. The last two days cost many times more than the first two.`,
      visual: { kind: 'bars', title: 'Theta per lot per day, ATM CE (illustrative, ₹)', caption: 'Rupees lost per lot per day from time alone.', unit: ' ₹', items: [{ label: '30 days left', value: 562, tone: 'ice' }, { label: '14 days left', value: 753, tone: 'ice' }, { label: '7 days left', value: 1004, tone: 'gold' }, { label: '3 days left', value: 1458, tone: 'gold' }, { label: '1 day left', value: 2421, tone: 'bear' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 3, iv: 14, rate: 6.5 }, why: 'Change the days input and watch theta rise as expiry nears.' },
    },
    {
      t: 4,
      def: `ATM options carry the most time value, so they lose the most rupees per day. OTM options have less time value to lose, but their decay is a larger share of what they cost.`,
      hi: `ATM option mein sabse zyada time value hoti hai, isliye woh rupees mein din ka sabse zyada decay deta hai. OTM option mein time value kam hoti hai, lekin unki lagat ke hisaab se decay ka hissa bada hota hai.`,
      how: `Time value is largest when spot is near the strike, since the option has roughly a 50-50 chance of finishing in the money. As the strike moves away, the chance falls, so does the premium, and so does the rupee theta. But theta as a percentage of the premium rises: an OTM option has little to lose in rupees, yet it is losing a bigger share of its price every day. This is why far-OTM options often go to zero near expiry if the market does not move.`,
      eg: {
        title: 'Theta for three strikes, 7 days left (illustrative)',
        text: `24,000 CE ₹200.85, theta -₹15.45 (7.7% of price). 24,300 CE ₹81.99, theta -₹12.50 (15.2%). 24,600 CE ₹25.91, theta -₹6.94 (26.8%). The ATM loses the most rupees; the 24,600 loses the largest share of its price each day.`,
      },
      tip: `Cheap OTM options are not safe from decay. A small premium can vanish quickly in percentage terms.`,
      visual: { kind: 'bars', title: 'Daily theta as % of premium, 7 days left (illustrative)', caption: 'Further OTM options lose a larger share of their price each day.', unit: '%', items: [{ label: '24,000 CE (ATM)', value: 7.7, tone: 'gold' }, { label: '24,300 CE', value: 15.2, tone: 'ice' }, { label: '24,600 CE', value: 26.8, tone: 'neutral' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24600, days: 7, iv: 14, rate: 6.5 }, why: 'Compare the 24,600 CE theta with the ATM theta.' },
    },
    {
      t: 5,
      def: `Theta near expiry is the very rapid decay in the last day or two. ATM options can lose half their value in the final day even if the market does not move.`,
      hi: `Theta near expiry ka matlab hai expiry ke aakhri din ya do din mein bahut tez decay. ATM option agar market na hile toh bhi aakhri din mein apni aadhi value kho sakta hai.`,
      how: `With a few hours left, the model premium of an ATM option falls toward zero fast, while gamma becomes very high. This means a small spot move can swing the premium sharply either way, but if spot ends on the strike or a little against you, the option expires near zero. For weekly NIFTY options expiring on Tuesday, the last session is when sellers collect decay and when buyers of lottery-ticket positions mostly lose. High gamma and fast theta together make expiry-day trading risky.`,
      eg: {
        title: 'ATM CE through the last day (illustrative)',
        text: `Spot stays at 24,000, IV 14%. With 1 day left the 24,000 CE is ₹72.31; with half a day left ₹50.69; with a quarter of a day ₹35.62; at expiry ₹0. If spot is 24,000 at the close, one lot bought at ₹72.31 loses 72.31 × 65 = ₹4,700.15. The 24,300 CE, only ₹3.47 a day earlier, is already close to zero.`,
      },
      tip: `On expiry day you are not buying time, you are buying a quick move. If you are wrong for a few hours, the option can be nearly worthless.`,
      visual: { kind: 'curve', title: 'Theta accelerates near expiry', caption: 'The curve steepens as days to expiry fall to zero.', curve: 'theta' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 1, iv: 14, rate: 6.5 }, why: 'See premium, theta and gamma for the last day.' },
    },
    {
      t: 6,
      def: `For an option buyer, theta is a cost. The buyer pays the premium upfront and then that premium shrinks each day unless spot or volatility move in the buyer's favour.`,
      hi: `Option buyer ke liye theta ek cost hai. Buyer premium pehle deta hai aur phir har din woh premium kam hota rehta hai, jab tak spot ya volatility buyer ke favour mein na jaye.`,
      how: `The buyer's profit equals delta gains plus vega gains minus theta, roughly. To make money, the market must move far enough and early enough that delta gains exceed the time decay paid. The longer a buyer waits for a move, the more theta accumulates. Many buyers choose more days to expiry (the next week or month) to reduce theta per day, at the cost of paying a higher premium.`,
      eg: {
        title: 'Call buyer after 3 flat days (illustrative)',
        text: `A buyer pays ₹200.85 for the 24,000 CE with 7 days left (₹13,055.25 per lot). Three days later with Nifty unchanged the option is ₹148.98. The loss is ₹51.87 per unit, ₹3,371.55 per lot. Nifty would have to rise to about 24,090 for the option to return to ₹200.85.`,
      },
      tip: `Match the option's life to your expected move. If you expect the move over 3 days, do not buy an option with 1 day left.`,
      visual: { kind: 'payoff', title: 'Long 24,000 CE at expiry (premium 200.85)', caption: 'At expiry the buyer needs spot above 24,200.85 to profit. Theta decides how much of the premium remains before that.', spot: 24000, legs: [{ type: 'CE', side: 1, strike: 24000, premium: 200.85 }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24090, strike: 24000, days: 4, iv: 14, rate: 6.5 }, why: 'Check that at 24,090 with 4 days left the call is back near ₹200.' },
    },
    {
      t: 7,
      def: `For an option seller, theta is the income. The seller receives the premium upfront and keeps the part that decays, if the market does not move enough against the position.`,
      hi: `Option seller ke liye theta kamai hai. Seller ko premium pehle mil jaata hai, aur agar market uske khilaf zyada na chale toh jo hissa decay hota hai woh uska profit hota hai.`,
      how: `A seller is short theta in the sense of being paid by it: positive theta. But the seller is also short gamma, which means that a large move against the position can create losses much bigger than the decay collected. Sellers must post margin (SPAN plus exposure) with the broker, and the loss can be many times the premium. Selling is not risk-free just because theta is positive.`,
      eg: {
        title: 'Call seller: flat vs sharp rise (illustrative)',
        text: `A trader sells the 24,000 CE at ₹200.85 with 7 days left. Three days later: Nifty flat, option ₹148.98, gain 51.87 × 65 = ₹3,371.55. Nifty up 100 points, option ₹206.80, loss 5.95 × 65 = ₹386.75. Nifty up 200 points, option ₹275.22, loss 74.37 × 65 = ₹4,834.05. A few days of theta can disappear in one move.`,
      },
      tip: `Positive theta does not mean a safe trade. Always ask how big a move would wipe out the collected decay, and where your stop is.`,
      visual: { kind: 'payoff', title: 'Short 24,000 CE at expiry (premium 200.85)', caption: 'Maximum gain is the premium; the loss is open-ended above the breakeven.', spot: 24000, legs: [{ type: 'CE', side: -1, strike: 24000, premium: 200.85 }] },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'sell', strike: 24000, premium: 200.85, expiryPrice: 24300, lotSize: 65, lots: 1 }, why: 'See how a rise at expiry turns the seller from gain to loss.' },
    },
    {
      t: 8,
      def: `Weekend and holiday decay is the question of what happens to option time value when the market is closed for two days or more. Calendar time passes, but no trading happens.`,
      hi: `Weekend aur holiday decay ka sawaal yeh hai ki jab market do ya zyada din band rehta hai toh option ki time value ka kya hota hai. Calendar time toh guzarta hai, par trading nahi hoti.`,
      how: `Textbook Black-Scholes counts calendar days, so Friday to Monday looks like three days of decay. In practice, market makers know that no price-moving news is traded over a weekend, and they often reduce implied volatility or price in the lost days earlier, which can make premiums fall during Friday and Monday rather than only over the weekend. The exact pattern is not fixed and depends on events. A weekend also carries news risk (global markets, events), which can lift IV. Check the NSE trading holiday list; a mid-week holiday also changes expiry dates.`,
      eg: {
        title: 'Friday close to Monday close (illustrative, calendar-day model)',
        text: `Expiry is Tuesday. On Friday close the 24,000 ATM CE has 4 days left and is ₹148.98. By Monday close, with Nifty and IV unchanged, there is 1 day left and the model gives ₹72.31, a fall of ₹76.67 per unit (₹4,983.55 per lot). Real markets often show part of this fall already on Friday afternoon.`,
      },
      tip: `Do not assume the weekend is free of decay or that it is fully charged on Saturday. Compare Friday and Monday prices for your own strike.`,
      visual: { kind: 'timeline', title: 'ATM CE, Friday to expiry Tuesday (model, illustrative)', events: [{ when: 'Fri close', what: '4 days left, ATM CE ₹148.98' }, { when: 'Sat-Sun', what: 'Market closed; calendar time still passes in the model' }, { when: 'Mon close', what: '1 day left, ATM CE ₹72.31' }, { when: 'Tue expiry', what: 'Time value reaches zero' }] },
    },
    {
      t: 9,
      def: `Accelerated time decay is the sharp increase in the speed of decay during the final days. In percentage terms, an ATM option can lose a few percent of its value in a day at first and about half of it on the last day.`,
      hi: `Accelerated time decay ka matlab hai aakhri dino mein decay ki speed bahut badh jaati hai. Percentage mein dekhein toh ATM option shuru mein din mein kuch percent khota hai aur aakhri din mein lagbhag aadha.`,
      how: `Decay speeds up because time value depends on the square root of the time left, and the square root changes fastest when time is close to zero. Gamma is highest at the same time, so direction risk and time decay both peak near expiry. This is why short-dated sellers often prefer to sell the final days and why buyers of weekly options need a strong, quick view.`,
      eg: {
        title: 'Daily decay as % of premium, ATM CE (illustrative)',
        text: `30 days left: 8.65 on 450.57 (1.9%). 14 days: 11.59 on 293.15 (4.0%). 7 days: 15.45 on 200.85 (7.7%). 3 days: 22.43 on 128.01 (17.5%). 2 days: 26.97 on 103.54 (26.0%). 1 day: 37.24 on 72.31 (51.5%). The share of premium lost per day rises about 27 times between the first and last rows.`,
      },
      tip: `Time is on the seller's side most in the final days, and against the buyer most then too. Plan the exit before the final session, not during it.`,
      visual: { kind: 'bars', title: 'Daily theta as % of ATM premium (illustrative)', caption: 'Decay accelerates as expiry nears.', unit: '%', items: [{ label: '30 days left', value: 1.9, tone: 'ice' }, { label: '14 days left', value: 4.0, tone: 'ice' }, { label: '7 days left', value: 7.7, tone: 'gold' }, { label: '3 days left', value: 17.5, tone: 'gold' }, { label: '2 days left', value: 26.0, tone: 'bear' }, { label: '1 day left', value: 51.5, tone: 'bear' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 2, iv: 14, rate: 6.5 }, why: 'Check theta and premium with 2 days left.' },
    },
  ],
  tools: [{ id: 'greeks', preset: { optType: 'PE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 } }],
}
export default m
