import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '6.7',
  intro:
    `Beyond delta, gamma, theta, vega and rho there is a second layer of Greeks that explains how the main Greeks themselves change. They are used mostly by market makers and risk desks, but they explain real surprises, such as a delta that melts overnight or a vega that grows as volatility rises. All numbers are illustrative Black-Scholes values (Nifty 24,000, IV 14%, rate 6.5%, lot 65) estimated by small finite changes, so treat them as orders of magnitude.`,
  introHi:
    `Delta, gamma, theta, vega aur rho ke baad Greeks ki ek doosri layer hoti hai jo batati hai ki main Greeks khud kaise badalte hain. Inka use zyadatar market makers aur risk desks karte hain, lekin yeh un surprises ko samjhate hain jaise raat bhar mein delta ka kam ho jaana ya volatility badhne par vega ka badh jaana. Saare numbers illustrative Black-Scholes values hain (Nifty 24,000, IV 14%, rate 6.5%, lot 65) jo chhote changes se estimate kiye gaye hain, isliye unhe orders of magnitude samjhein.`,
  steps: {
    concept:
      `First-order Greeks tell you how the option price changes when spot, time, volatility or rates move. Second-order Greeks tell you how those sensitivities change. Vanna links delta and volatility, vomma links vega and volatility, charm links delta and time, speed links gamma and spot, color links gamma and time, and zomma links gamma and volatility. They matter most for OTM options, large moves and positions held into events.`,
    conceptHi:
      `Pehle order ke Greeks batate hain ki spot, time, volatility ya rate badalne par option price kaise badalta hai. Second-order Greeks batate hain ki yeh sensitivities khud kaise badalti hain. Vanna delta aur volatility ko jodta hai, vomma vega aur volatility ko, charm delta aur time ko, speed gamma aur spot ko, color gamma aur time ko, aur zomma gamma aur volatility ko. Yeh OTM options, bade moves aur event tak hold ki hui positions mein zyada matter karte hain.`,
    mechanism:
      `Each higher-order Greek is a derivative of a lower one. Because the option price is curved, a straight-line estimate using delta, gamma and vega becomes wrong for big moves. For example, if volatility rises, vega itself rises for OTM options (vomma), and delta changes (vanna). As days pass, delta of OTM options fades (charm) and gamma near the money builds up (color). Trading platforms in India rarely display these, so traders use them as a mental model, or through risk tools of brokers and desks.`,
    example: {
      title: 'A large gap with higher IV, 24,500 CE (illustrative)',
      text: `The 24,500 CE is ₹39.20 with delta 0.1612, vega 8.13. Suppose Nifty gaps up 300 points to 24,300 and IV rises 4 points to 18%. A delta-plus-vega estimate gives 39.20 + 48.36 + 32.52 = ₹120.08. Adding the gamma term brings the estimate to about ₹143.71. The full model price is ₹167.11. The remaining gap (about ₹23.40) is from higher-order effects such as speed, vanna and vomma. For one lot of 65, the first estimate misses by about ₹3,057.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Second-order Greeks: what changes with what',
      caption: 'Each cell names the Greek that links a first-order sensitivity to a driver.',
      xLabels: ['Spot / time', 'Volatility'],
      yLabels: ['Delta', 'Gamma / Vega'],
      cells: [
        { head: 'Charm (delta vs time)', note: 'Delta of OTM options fades as days pass', tone: 'ice' },
        { head: 'Vanna (delta vs vol)', note: 'Delta of OTM options changes with IV', tone: 'gold' },
        { head: 'Speed and color', note: 'Gamma changes with spot (speed) and time (color)', tone: 'ice' },
        { head: 'Vomma and zomma', note: 'Vega changes with IV (vomma); gamma changes with IV (zomma)', tone: 'gold' },
      ],
    },
    optionChain:
      `The chain will not show these Greeks, but you can see their effect. Note a far-OTM strike's delta in the morning and in the afternoon of an event day: it may jump after an IV spike (vanna). Watch the 24,300 CE across a week: its delta fades from 0.2854 with 7 days left to 0.0477 with 1 day left at flat spot (charm). Skew in IV across strikes also feeds vanna and vomma effects.`,
    psychology:
      `Traders often feel that "delta changed by itself" or "vega suddenly became bigger" in a fast market. That is the second-order effect at work. The risk is a false sense of precision: reading delta and vega as constants and assuming a stable hedge. Humility helps: stress the position at bigger moves than you expect and re-check.`,
    scenarios: {
      bullish:
        `A sharp rally often lifts spot and IV together for OTM calls (positive vanna): delta rises on both counts, gamma builds (speed), and premiums jump more than a delta estimate suggests.`,
      bearish:
        `A crash raises IV, especially for puts. OTM puts gain delta quickly as spot falls and IV rises, so hedges built with the earlier delta can be too small.`,
      sideways:
        `Spot is flat and days pass: charm removes delta from OTM options, color shifts gamma towards the ATM strike, and vega falls as time passes. OTM positions fade quietly.`,
    },
    practice: [
      {
        q: `The 24,500 CE has delta 0.1612 at IV 14% and 0.1782 at IV 15% (spot and time unchanged). What is its vanna per IV point and what does it mean?`,
        a: `0.1782 − 0.1612 = +0.017 delta per IV point. If IV rises 1 point, the call behaves as if Nifty is 0.017 units more exposed per point: a little more delta, so a larger position equivalent.`,
      },
      {
        q: `The 24,300 CE has delta 0.2854 with 7 days left and 0.2665 with 6 days left (spot flat). What is charm, and what is the effect on a long 10-lot position?`,
        a: `Charm = 0.2665 − 0.2854 = −0.0189 per day. For 10 lots of 65 = 650 units, the delta falls by about 0.0189 × 650 = 12.3 units per day (equal to about 12.3 Nifty units of exposure).`,
      },
      {
        q: `The 24,500 CE vega is 8.13 at IV 14% and 9.90 at IV 18%. What is the average vomma per IV point?`,
        a: `(9.90 − 8.13) ÷ 4 = 0.4425 per IV point. The option becomes more sensitive to volatility as volatility rises.`,
      },
      {
        q: `Using the example, by how much does a delta-plus-vega estimate (₹120.08) miss the full price (₹167.11) for one lot of 65?`,
        a: `167.11 − 120.08 = ₹47.03 per unit × 65 = ₹3,056.95 per lot.`,
      },
    ],
    assignment:
      `Use the Greeks calculator on this site with the 24,500 CE. Record delta, gamma and vega at (a) base, (b) IV +1, (c) spot +100, (d) one day less. Calculate vanna, vomma, speed and charm yourself from the differences. Then pick a gap scenario (spot +300, IV +4) and compare the Greek-based estimate with the full recalculated premium.`,
  },
  topics: [
    {
      t: 1,
      def: `Vanna measures how delta changes when implied volatility changes (and, equally, how vega changes when spot changes). It tells you that an option's directional exposure is not fixed when volatility moves.`,
      hi: `Vanna batata hai ki implied volatility badalne par delta kaise badalta hai (aur barabar se, spot badalne par vega kaise badalta hai). Matlab volatility hilne par option ki direction wali exposure fixed nahi rehti.`,
      how: `For an OTM call, a rise in IV widens the range of possible outcomes, so the chance of finishing in the money rises and delta rises: vanna is positive. For an OTM put, the absolute value of delta rises, so the signed delta becomes more negative. For ATM options vanna is close to zero. Market makers hedging a large book of options must adjust their futures hedge when IV moves, which can feed price moves; but this is a market-structure idea and not something to trade on directly.`,
      eg: {
        title: 'Vanna of the 24,500 CE (illustrative)',
        text: `Spot 24,000, 7 days. At IV 14% the 24,500 CE has delta 0.1612; at IV 15% delta 0.1782. Vanna is about +0.017 per IV point. A 4-point IV rise adds about 0.07 to delta. For the 23,700 PE the delta goes from −0.2349 to −0.2495 for the same 1-point IV rise.`,
      },
      tip: `If you hedge an OTM option with a fixed number of futures, a volatility spike can leave you under-hedged even if spot has not moved.`,
      visual: { kind: 'bars', title: 'Delta of the 24,500 CE at different IV (illustrative)', caption: 'OTM call delta rises with IV: vanna is positive.', items: [{ label: 'IV 14%', value: 0.1612, tone: 'ice' }, { label: 'IV 15%', value: 0.1782, tone: 'gold' }], unit: '' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24500, days: 7, iv: 15, rate: 6.5 }, why: 'Compare delta at IV 14% and 15% for the OTM call.' },
    },
    {
      t: 2,
      def: `Vomma (also called Volga) measures how vega changes when implied volatility changes. It is the "convexity" of the option price with respect to volatility.`,
      hi: `Vomma (jise Volga bhi kehte hain) batata hai ki implied volatility badalne par vega kaise badalta hai. Yeh option price ki volatility ke saath convexity hai.`,
      how: `Vomma is positive for OTM options: when volatility rises, vega rises, so gains accelerate. ATM options have near-zero vomma. A long OTM option therefore gains more from a volatility rise than it loses from an equal fall, which is why such options are used as a cheap volatility hedge. A short OTM option has the opposite exposure: losses from rising volatility accelerate. The effect is sizable only for big IV moves.`,
      eg: {
        title: 'Vomma of the 24,500 CE (illustrative)',
        text: `At IV 14% the 24,500 CE has vega 8.13; at IV 15% it is 8.67; at IV 18% it is 9.90. Vomma is roughly +0.5 per IV point near 14%. A 4-point IV rise adds ₹36.38 to the price (₹39.20 to ₹75.58), a little more than 4 × 8.13 = ₹32.52.`,
      },
      tip: `For OTM options vega is not constant. Do not scale a vega estimate linearly across a large IV jump.`,
      visual: { kind: 'bars', title: 'Vega of the 24,500 CE at different IV (illustrative)', unit: ' ₹', items: [{ label: 'IV 14%', value: 8.13, tone: 'ice' }, { label: 'IV 15%', value: 8.67, tone: 'ice' }, { label: 'IV 18%', value: 9.9, tone: 'gold' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24500, days: 7, iv: 18, rate: 6.5 }, why: 'See vega rise as IV rises for the OTM call.' },
    },
    {
      t: 3,
      def: `Charm measures how delta changes as time passes, with spot and volatility unchanged. It is often called delta decay.`,
      hi: `Charm batata hai ki time guzarne par delta kaise badalta hai, jab spot aur volatility same ho. Ise delta decay bhi kehte hain.`,
      how: `As expiry nears, an OTM option becomes less likely to finish in the money, so its delta falls toward zero; an ITM option's delta rises toward one. Charm is the daily rate of that change. It is large for OTM options near expiry and over weekends, since the calendar days pass at once. A hedger who sold calls and hedged with futures must reduce the futures hedge as delta fades, or become over-hedged.`,
      eg: {
        title: 'Delta fading of the 24,300 CE (illustrative)',
        text: `Spot stays at 24,000, IV 14%. Delta of the 24,300 CE: 7 days 0.2854, 6 days 0.2665, 4 days 0.2143, 1 day 0.0477. Charm is about −0.019 per day early on. Between Friday (4 days left) and Monday (1 day left) delta falls by 0.1666. For a 10-lot (650 units) position, that is about 108 units of delta lost over the weekend.`,
      },
      tip: `A bought OTM call can lose delta each day even when spot does not move. Recheck your directional exposure daily.`,
      visual: { kind: 'bars', title: 'Delta of the 24,300 CE as days pass, spot flat (illustrative)', items: [{ label: '7 days left', value: 0.2854, tone: 'ice' }, { label: '6 days left', value: 0.2665, tone: 'ice' }, { label: '4 days left', value: 0.2143, tone: 'gold' }, { label: '1 day left', value: 0.0477, tone: 'bear' }], unit: '' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24300, days: 4, iv: 14, rate: 6.5 }, why: 'Check how delta changes as you lower the days input.' },
    },
    {
      t: 4,
      def: `Speed measures how gamma changes when spot changes. It is the third derivative of the option price with respect to spot, and tells you how quickly your delta changes accelerate.`,
      hi: `Speed batata hai ki spot badalne par gamma kaise badalta hai. Yeh option price ka spot ke respect mein teesra derivative hai, aur batata hai ki aapka delta kitni tezi se tez ho raha hai.`,
      how: `Gamma is highest at the strike and falls on both sides. For an OTM option, a rise in spot moves it toward the strike where gamma is larger, so speed is positive. For an ITM option the reverse holds. A position that is balanced in delta today can become unbalanced after a modest move if speed is large, so market makers watch it for big books. For small retail positions, it is mainly a reason to rebalance more often in fast markets.`,
      eg: {
        title: 'Speed of the 24,500 CE (illustrative)',
        text: `Spot 24,000: gamma of the 24,500 CE is 0.000525. After spot +100 gamma is 0.000632 (+0.000107, the speed over 100 points); after spot −100 it is 0.000417. Delta moves from 0.1612 to 0.2192 on the rise and to 0.1141 on the fall: the delta change on the way up (+0.058) is bigger than on the way down (−0.047).`,
      },
      tip: `Delta hedges are for small moves. In a big move, gamma and speed make the hedge stale; stress larger moves too.`,
      visual: { kind: 'curve', title: 'Gamma curve', caption: 'Gamma peaks at the money; speed is the slope of this curve against spot.', curve: 'gamma' as never },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24100, strike: 24500, days: 7, iv: 14, rate: 6.5 }, why: 'See gamma at spot 24,100 against 24,000.' },
    },
    {
      t: 5,
      def: `Color measures how gamma changes as time passes. It shows how an option's convexity builds up or fades as expiry nears.`,
      hi: `Color batata hai ki time guzarne par gamma kaise badalta hai. Yeh dikhata hai ki expiry paas aane par option ki convexity kaise badhti ya ghatti hai.`,
      how: `For options near the money, gamma rises sharply as expiry approaches, because a small spot move can decide whether the option finishes in or out of the money. For options far from the strike, gamma falls to zero as time runs out. This is why expiry-day ATM options are so twitchy. Short-gamma sellers face an increasing risk each day, while far-OTM sellers see risk fade.`,
      eg: {
        title: 'ATM gamma through the last week (illustrative)',
        text: `The 24,000 CE gamma at spot 24,000, IV 14%: 7 days 0.000855, 3 days 0.001308, 1 day 0.002268... (2 days 0.001603, 12 hours 0.003207). The same strike's gamma nearly quadruples between 7 days and 12 hours. For one lot of 65, a 50-point move at 7 days changes delta by about 0.000855 × 50 × 65 = 2.78 units; at 12 hours about 0.003207 × 50 × 65 = 10.42 units.`,
      },
      tip: `A strike that looked calm earlier in the week can become the most reactive one on expiry day.`,
      visual: { kind: 'bars', title: 'ATM gamma as expiry nears (illustrative, x 1000)', items: [{ label: '7 days', value: 0.855, tone: 'ice' }, { label: '3 days', value: 1.308, tone: 'ice' }, { label: '2 days', value: 1.603, tone: 'gold' }, { label: '1 day', value: 2.268, tone: 'gold' }, { label: '12 hours', value: 3.207, tone: 'bear' }], unit: '' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 1, iv: 14, rate: 6.5 }, why: 'Read gamma for the last day.' },
    },
    {
      t: 6,
      def: `Zomma measures how gamma changes when implied volatility changes. It shows how the curvature of an option's price responds to volatility shifts.`,
      hi: `Zomma batata hai ki implied volatility badalne par gamma kaise badalta hai. Yeh dikhata hai ki volatility hilne par option price ki curvature kaise react karti hai.`,
      how: `For ATM options, higher IV flattens the distribution of outcomes, so gamma falls; lower IV concentrates it and raises gamma. For far OTM options, higher IV can raise gamma instead. This is why an ATM position that is short gamma becomes less dangerous when IV spikes (the gamma is lower), and more dangerous when IV collapses (gamma higher, especially near expiry).`,
      eg: {
        title: 'Zomma of the ATM call (illustrative)',
        text: `Spot 24,000, 7 days. ATM gamma at IV 14% is 0.000855, at IV 15% it is 0.000798 and at IV 20% it is 0.000599. Zomma is about −0.00006 per IV point. A 50-point move changes one lot's delta by 2.78 units at IV 14% and by only about 1.95 units at IV 20%.`,
      },
      tip: `Gamma risk of an ATM position is higher when IV is low. Sellers in a quiet market face sharper delta swings than they may expect.`,
      visual: { kind: 'bars', title: 'ATM gamma at different IV, 7 days (illustrative, x 1000)', items: [{ label: 'IV 14%', value: 0.855, tone: 'ice' }, { label: 'IV 15%', value: 0.798, tone: 'ice' }, { label: 'IV 20%', value: 0.599, tone: 'gold' }], unit: '' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 20, rate: 6.5 }, why: 'Read gamma at IV 20% and compare with 14%.' },
    },
    {
      t: 7,
      def: `Cross-Greek interactions are the effects that appear when two or more drivers change at once, such as spot rising while volatility also rises. The result is not simply the sum of separate effects.`,
      hi: `Cross-Greek interactions woh effects hain jo tab dikhte hain jab do ya zyada cheezein ek saath badalti hain, jaise spot badhna aur saath mein volatility bhi badhna. Result alag-alag effects ka seedha jod nahi hota.`,
      how: `Real markets move spot, IV and time together. A rally with falling volatility behaves very differently from a rally with rising volatility. In a typical stress, correlations matter: for Nifty, falls usually come with rising IV, so a long put gains through delta, gamma and vega together, while a short put loses through all three. A practical approach is full revaluation: change spot, IV and days together in a calculator and read the new premium, rather than adding up Greek terms.`,
      eg: {
        title: 'Spot +100, IV +2, one day later (illustrative)',
        text: `The 24,500 CE is ₹39.20 (delta 0.1612, gamma 0.000525, vega 8.13, theta −8.81). The Greek estimate for spot 24,100, IV 16%, 6 days: 39.20 + 16.12 + 2.63 + 16.26 − 8.81 = ₹65.40. Full revaluation gives ₹65.31. For small moves the estimate works well; for the 300-point gap with IV +4 the same method missed by ₹23 or more.`,
      },
      tip: `For anything beyond a small move, reprice with a calculator instead of adding up Greeks.`,
      visual: { kind: 'flow', title: 'Reading a combined move', steps: [{ label: 'Spot move', note: 'Delta and gamma' }, { label: 'Volatility move', note: 'Vega, vanna, vomma' }, { label: 'Time passing', note: 'Theta, charm, color' }, { label: 'Full repricing', note: 'Check with a calculator' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24100, strike: 24500, days: 6, iv: 16, rate: 6.5 }, why: 'Full-reprice the combined scenario and compare with the Greek estimate.' },
    },
    {
      t: 8,
      def: `Second-order and higher-order risks are the extra risks that remain after you account for delta, gamma, theta and vega. They matter in large, fast moves, near expiry and for positions with many strikes.`,
      hi: `Second-order aur higher-order risks woh extra risks hain jo delta, gamma, theta aur vega ginne ke baad bhi bache rehte hain. Yeh bade, tez moves mein, expiry ke paas aur kai strikes wali positions mein matter karte hain.`,
      how: `A portfolio can be delta-neutral and vega-neutral today and still lose money tomorrow because gamma, vanna or charm change the exposure. Gap events (overnight news, global sell-offs, election-day moves) are the typical trigger, because rebalancing is impossible while the market is closed. Practical defence: keep position sizes small relative to capital, use defined-risk spreads, keep margin buffers and stress-test at moves larger than normal.`,
      eg: {
        title: 'A gap and the estimate gap (illustrative)',
        text: `The 24,500 CE (₹39.20) with a delta-plus-vega estimate of ₹120.08 for a 300-point gap and IV +4 is actually ₹167.11 in the model. A short position of one lot (65 units) that looked like a ₹5,265 loss on delta and vega (120.08 − 39.20 = 80.88 per unit... × 65) is really ₹8,321.15 (127.91 × 65). The extra loss of ₹3,056.95 is the higher-order effect.`,
      },
      tip: `The risks you do not measure are the ones that appear in a gap. Size so that a bad gap hurts but does not break your account.`,
      visual: { kind: 'bars', title: 'Premium of the 24,500 CE after a 300-point gap and IV +4 (illustrative, ₹)', caption: 'Estimates built from lower-order Greeks understate the move.', unit: ' ₹', items: [{ label: 'Today', value: 39.2, tone: 'ice' }, { label: 'Delta + vega estimate', value: 120.08, tone: 'neutral' }, { label: 'Plus gamma term', value: 143.71, tone: 'gold' }, { label: 'Full repricing', value: 167.11, tone: 'bear' }] },
    },
  ],
  tools: [{ id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24500, days: 7, iv: 14, rate: 6.5 } }],
}
export default m
