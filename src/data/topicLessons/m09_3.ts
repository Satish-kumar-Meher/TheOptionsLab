import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '9.3',
  intro:
    `India VIX is a single number, but the way it moves tells a story: calm, nervous, panicking or recovering. This module teaches you to read VIX the way you read a price chart, by its direction, its speed and its level, and to link each pattern to what happens to option premiums. VIX shows expected size of movement, never direction. All option values below are illustrative Black-Scholes numbers (Nifty 24,000, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `India VIX ek number hai, lekin uski chaal market ka mood batati hai: shaant, ghabrahat, panic ya recovery. Is module mein aap VIX ko price chart ki tarah padhna seekhenge, uski direction, speed aur level se, aur dekhenge ki har pattern ka option premium par kya asar padta hai. VIX sirf expected movement ka size batata hai, direction nahi. Saare option values illustrative Black-Scholes numbers hain (Nifty 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `India VIX is NSE's volatility index. It is calculated from the best bid and ask prices of NIFTY options (near and next expiry) and expresses the annualised volatility the market expects over the next 30 calendar days. A rising VIX means option buyers are paying more for protection and potential movement. A falling VIX means the market expects calmer conditions. Because it is a market-derived number, it reacts to fear, events and demand for hedges, not just to the index level.`,
    conceptHi:
      `India VIX NSE ka volatility index hai. Yeh NIFTY options (near aur next expiry) ke best bid aur ask prices se nikala jaata hai aur agle 30 calendar days ke liye market jo annualised volatility expect kar raha hai, woh batata hai. VIX badhne ka matlab option buyers protection aur movement ke liye zyada paise de rahe hain. VIX girne ka matlab market ko shaanti expect hai. Yeh market se nikla number hai, isliye yeh fear, events aur hedge demand par react karta hai, sirf index level par nahi.`,
    mechanism:
      `VIX changes because the prices of NIFTY options change. When traders rush to buy puts or calls, those premiums rise and the implied volatility behind them rises, which lifts VIX. When demand fades or events pass, premiums deflate and VIX falls. VIX is often negatively correlated with Nifty, because falls usually bring hedge buying, but this is a tendency and not a law. Three things to track: direction (up, down, flat), speed (a slow drift or a sudden jump) and level (low, normal, high relative to its own recent history).`,
    example: {
      title: 'Same Nifty, different VIX (illustrative)',
      text: `Nifty is at 24,000 with a 7-day ATM straddle. At VIX 13 the straddle (24,000 CE + 24,000 PE) costs about ₹345.35. At VIX 16 it costs about ₹424.70. The index did not move, yet the straddle is ₹79.35 (about 23%) dearer. For one lot of 65, that is roughly ₹5,158 of extra premium paid purely because expected volatility rose.`,
    },
    chart: {
      kind: 'gauge',
      title: 'India VIX reading bands used in this lesson',
      caption: 'These bands are rule-of-thumb teaching zones, not official NSE categories. Compare today\'s VIX with its own last few months, not with a fixed number.',
      min: 8,
      max: 40,
      value: 14,
      zones: [
        { from: 8, to: 12, label: 'Low', tone: 'ice' },
        { from: 12, to: 18, label: 'Normal', tone: 'neutral' },
        { from: 18, to: 25, label: 'Elevated', tone: 'gold' },
        { from: 25, to: 40, label: 'High / stress', tone: 'gold' },
      ],
    },
    optionChain:
      `On the option chain, VIX shows up as the general level of the IV column. When VIX rises, IV rises across most strikes and the premium of both CE and PE goes up for the same spot. Compare ATM IV on the chain with the VIX number: they are close but not identical, because VIX blends near and next expiry while the chain shows one expiry. Near-expiry strikes can show much higher or lower IV than VIX around events and on expiry day.`,
    psychology:
      `Rising VIX usually reflects fear or uncertainty: hedgers buying puts, buyers rushing in before an event. Falling VIX reflects relief and complacency. Buyers often buy options when VIX is already high because the move feels urgent, and sellers sell when VIX is low because premiums look boring. Both can be late. The useful question is not "is VIX high?" but "high compared to what, and what is already priced in?"`,
    scenarios: {
      bullish:
        `In a calm, steady rally VIX often drifts down, so a call buyer gains from delta but loses a little to falling vega. In a sharp, fast rally VIX can rise too, which helps long options on both counts. A rally with falling VIX is usually seen as a comfortable one.`,
      bearish:
        `Falls typically push VIX up as puts get bought. A put buyer then gains from delta and vega together. The danger is for those who buy puts after VIX has already spiked: if the market stabilises, VIX cools and the put can lose value even if Nifty stays lower.`,
      sideways:
        `A flat market with flat VIX means premiums mainly decay with time. A flat market with rising VIX means someone expects a move or is buying hedges; a flat market with falling VIX is the usual time-decay environment that tends to suit sellers, with their own risk of a sudden move.`,
    },
    practice: [
      {
        q: `India VIX is 16. Using VIX as the annual volatility, what is the one-standard-deviation expected Nifty move for one calendar day from 24,000?`,
        a: `Move = 24,000 × 0.16 × √(1/365). √(1/365) = 0.05234, so 24,000 × 0.16 = 3,840; 3,840 × 0.05234 = about 200.99 points (about 0.84%). It is a statistical estimate, not a limit.`,
      },
      {
        q: `VIX rises from 14 to 18. What is the percentage change in VIX?`,
        a: `(18 − 14) / 14 = 0.2857, so VIX rose about 28.57%. The same 4-point rise from 24 to 28 would be only 16.7%, so always note the base level.`,
      },
      {
        q: `A 7-day 24,000 straddle costs ₹345.35 at IV 13 and ₹424.70 at IV 16 (spot unchanged). What is the rupee and percentage change, and what is it for one lot of 65?`,
        a: `Change = 424.70 − 345.35 = ₹79.35 per unit. Percentage = 79.35 / 345.35 = 22.98%. For one lot: 79.35 × 65 = ₹5,157.75.`,
      },
      {
        q: `Compare the 7-day one-standard-deviation Nifty move at VIX 24 (797.67 points) and VIX 11 (365.60 points). How many times bigger is the first?`,
        a: `797.67 / 365.60 = about 2.18 times. The expected move scales in direct proportion to volatility when the time period is the same, so the range at VIX 24 is about 2.18 times the range at VIX 11 (24 / 11 = 2.18).`,
      },
    ],
    assignment:
      `Download or note India VIX closing values for the last 30 trading days from the NSE website. Mark each day as up, down or flat versus the previous day, count how many of each, and write down the highest and lowest values. Then note, for the five biggest one-day VIX changes, what Nifty did that day. Write three sentences on whether VIX and Nifty moved in opposite directions.`,
  },
  topics: [
    {
      t: 1,
      def: `Rising VIX means the market is paying more for options and expects bigger movement over the next 30 days. It is a message about expected volatility, not about which way Nifty will go.`,
      hi: `VIX badhne ka matlab hai ki market options ke liye zyada paise de raha hai aur agle 30 din mein bada movement expect kar raha hai. Yeh volatility ka message hai, Nifty kis direction mein jayega, yeh nahi.`,
      how: `VIX rises when demand for NIFTY options rises, most often put buying for protection, or call and put buying ahead of an event such as a Budget, RBI policy or election result. NSE recomputes it continuously from the best bid and ask of NIFTY options. A slow, steady rise suggests growing caution; a sharp rise suggests urgency. For option buyers, rising VIX helps through vega; for sellers, existing short positions lose value on paper as premiums expand.`,
      eg: {
        title: 'VIX 13 to 16 before an event (illustrative)',
        text: `Spot 24,000, 7 days left. The 24,000 CE costs about ₹187.62 at VIX 13 and about ₹227.30 at VIX 16, a rise of ₹39.68 per unit, or about ₹2,579 for one lot of 65. The one-day expected move also widens from about 163 points to about 201 points. Nothing about direction has been decided; only the size of the expected swing.`,
      },
      tip: `Rising VIX raises premium for both CE and PE. Do not read it as "bullish" or "bearish", read it as "bigger moves expected".`,
      visual: {
        kind: 'bars',
        title: '7-day 24,000 straddle at rising VIX (illustrative)',
        caption: 'Same spot, same days: expected volatility alone makes the straddle dearer.',
        unit: ' ₹',
        items: [
          { label: 'VIX 13', value: 345.35, tone: 'ice' },
          { label: 'VIX 16', value: 424.7, tone: 'gold' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 16, rate: 6.5 },
        why: 'Change the IV from 13 to 16 and watch the premium and vega.',
      },
    },
    {
      t: 2,
      def: `Falling VIX means the market is becoming more relaxed and expects smaller movement. Option premiums shrink because the expected range narrows.`,
      hi: `VIX girne ka matlab hai market relax ho raha hai aur chhota movement expect kar raha hai. Expected range chhoti hoti hai toh option premium bhi ghat jaata hai.`,
      how: `VIX falls when hedge demand fades, an event passes without a shock, or the market has been quiet for several sessions. Option IVs drop across strikes and both calls and puts lose time value beyond normal time decay. Buyers of options feel this as a loss even when direction is right. Sellers benefit if the move stays small, but a fall to very low levels can also mean premiums are thin compared to the risk of a sudden reversal.`,
      eg: {
        title: 'VIX 18 to 14 as nerves settle (illustrative)',
        text: `Spot 24,000, 7 days left, no spot change. The 24,000 CE falls from about ₹253.76 at VIX 18 to about ₹200.85 at VIX 14, a drop of ₹52.91 per unit, about ₹3,439 for one lot of 65. The 24,000 PE falls by the same ₹52.91 (₹223.86 to ₹170.95). This is before counting time decay.`,
      },
      tip: `Falling VIX hurts every long option, calls and puts alike. A buyer needs the market to move more than the falling VIX has already taken out.`,
      visual: {
        kind: 'bars',
        title: '7-day 24,000 CE premium as VIX falls (illustrative)',
        caption: 'Spot is held at 24,000. A calmer market makes the same option cheaper.',
        unit: ' ₹',
        items: [
          { label: 'VIX 18', value: 253.76, tone: 'gold' },
          { label: 'VIX 14', value: 200.85, tone: 'ice' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 },
        why: 'Compare the premium at IV 18 and IV 14.',
      },
    },
    {
      t: 3,
      def: `A sideways VIX is flat or moves in a tight band for several sessions. The market's expectation of volatility is stable, so premiums mostly change because of time passing and spot moving.`,
      hi: `Sideways VIX ka matlab hai VIX kuch din se lagbhag ek hi band mein hai. Market ki volatility expectation stable hai, isliye premium zyadatar time guzarne aur spot ke hilne se badalta hai.`,
      how: `When VIX is flat, the vega effect on premiums is small and theta (time decay) becomes the main force for option buyers. A flat VIX during a trending market tells you volatility is not being repriced even though price moves, often a sign of orderly trends. A flat, low VIX often precedes a larger move, but this is not a reliable timing signal. It only says that options are not yet pricing a change.`,
      eg: {
        title: 'Flat VIX, one day of decay (illustrative)',
        text: `Spot 24,000, VIX stays 14, Nifty ends the day at 24,000. The 7-day 24,000 CE goes from about ₹200.85 to ₹184.89, a loss of ₹15.96 per unit or about ₹1,037 for one lot of 65. The straddle drops from ₹371.79 to ₹344.14, a loss of ₹27.65. Nothing else changed, only time.`,
      },
      tip: `Flat VIX does not mean safe. It means time decay, not volatility, is doing the work against an option buyer.`,
      visual: {
        kind: 'candles',
        title: 'Quiet range with stable VIX',
        caption: 'When the index drifts in a range and VIX stays flat, premiums mostly erode with time.',
        pattern: 'range',
      },
    },
    {
      t: 4,
      def: `A sudden VIX spike is a quick, large jump in India VIX in a day or even within hours. It shows that fear or uncertainty entered the market suddenly.`,
      hi: `Sudden VIX spike ka matlab hai VIX ek din mein, ya kuch ghanton mein hi, bahut tezi se upar chala gaya. Yeh dikhata hai ki market mein achanak darr ya uncertainty aa gayi.`,
      how: `Spikes follow shocks: surprise election outcomes, global sell-offs, sudden policy announcements or geopolitical news. Option writers pull quotes or widen them and hedgers buy protection, so premiums jump. On 4 June 2024, the day of the general election results, Nifty fell nearly 6% in a day and India VIX jumped sharply. The spike lifts both CE and PE premiums, so buying after the spike means paying a high price for protection or movement.`,
      eg: {
        title: 'VIX 14 to 20, a 43% jump (illustrative)',
        text: `VIX rises 6 points from 14 to 20, which is 6 / 14 = 42.86%. With spot at 24,000 and 7 days left, the 24,000 CE rises from about ₹200.85 to ₹280.23 (+₹79.38) and the 24,000 PE from ₹170.95 to ₹250.33 (+₹79.38). For one lot of 65 each side moves about ₹5,160. Anyone who sold options just before the spike sees that much loss on paper.`,
      },
      tip: `After a spike, premiums already carry the fear. Chasing a spike with option buying often means paying the peak price.`,
      visual: {
        kind: 'timeline',
        title: 'Anatomy of a VIX spike (illustrative day)',
        caption: 'Spikes arrive fast and fade slower. The cooling phase is covered next.',
        events: [
          { when: 'Before', what: 'VIX 14, calm, premiums normal', tone: 'ice' },
          { when: 'Shock', what: 'Event or news; VIX jumps to 20 within hours', tone: 'gold' },
          { when: 'Peak', what: 'Premiums at their dearest, spreads wide', tone: 'gold' },
          { when: 'After', what: 'VIX starts cooling as the market digests the news', tone: 'ice' },
        ],
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 20, rate: 6.5 },
        why: 'Price the same option at IV 14 and IV 20 to see the spike effect.',
      },
    },
    {
      t: 5,
      def: `VIX cooling after a spike means VIX is coming down from a high level as the shock fades. Premiums that had swollen start to shrink again.`,
      hi: `Spike ke baad VIX cooling ka matlab hai VIX high level se neeche aa raha hai kyunki shock kam ho raha hai. Jo premium phool gaye the woh dheere dheere wapas sikudte hain.`,
      how: `After a shock, hedgers stop buying, market makers tighten spreads and traders who sold premium at the top return. IV falls first in near-term options, and the fall in VIX is typically faster when the index stops falling. For option buyers who bought at the peak, falling IV can erase gains from a favourable move. This pattern is why buying options after a spike is dangerous even when the original direction view is correct.`,
      eg: {
        title: 'VIX 24 to 17 over a week (illustrative)',
        text: `Suppose VIX drops 7 points, from 24 to 17 (a 29.17% fall). A 7-day 24,000 straddle that costs about ₹636.47 at VIX 24 costs about ₹451.16 at VIX 17 with spot unchanged, a drop of ₹185.31 per unit. For one lot of 65 that is about ₹12,045. A buyer needed a large move merely to break even from the cooling alone.`,
      },
      tip: `A cooling VIX usually means vega loss for option buyers and relief for option sellers. Check if you are on the right side of that before entering.`,
      visual: {
        kind: 'bars',
        title: '7-day 24,000 straddle as VIX cools (illustrative)',
        caption: 'Spot unchanged at 24,000; only expected volatility falls.',
        unit: ' ₹',
        items: [
          { label: 'VIX 24', value: 636.47, tone: 'gold' },
          { label: 'VIX 17', value: 451.16, tone: 'ice' },
        ],
      },
      calc: {
        id: 'straddle-move',
        preset: { spot: 24000, cePrice: 318.24, pePrice: 318.23, strike: 24000 },
        why: 'See the implied move implied by a high-VIX straddle (an illustrative even split of the 636.47 straddle).',
      },
    },
    {
      t: 6,
      def: `A high VIX environment is one where India VIX is well above its recent normal. Options are expensive and the market expects wide daily swings.`,
      hi: `High VIX environment ka matlab hai India VIX apne recent normal se kaafi upar hai. Options mehnge hote hain aur market se badi daily swings expect hoti hain.`,
      how: `There is no official line for "high". Many traders compare today's VIX with the last three to six months and with its long-run history. In high-VIX periods, the one-day expected Nifty move is large, spreads on options widen, margins for sellers are usually higher and option premiums are costly for buyers. Position size should shrink, because the same stop-loss in points now sits inside normal noise.`,
      eg: {
        title: 'VIX 24 versus VIX 14 (illustrative)',
        text: `At VIX 24, the one-day one-standard-deviation Nifty move from 24,000 is about 301.49 points (1.26%) and the 7-day move about 797.67 points. At VIX 14 the one-day move is about 175.87 points (0.73%). The expected daily swing is about 1.7 times larger, so a stop-loss placed 100 points away is far more likely to be hit by noise.`,
      },
      tip: `In high VIX, cut position size and widen your stop logic. Expensive options punish buyers who are right too slowly.`,
      visual: {
        kind: 'gauge',
        title: 'VIX at 24: elevated',
        caption: 'Teaching bands only. Compare with VIX history of recent months before calling it high.',
        min: 8,
        max: 40,
        value: 24,
        zones: [
          { from: 8, to: 12, label: 'Low', tone: 'ice' },
          { from: 12, to: 18, label: 'Normal', tone: 'neutral' },
          { from: 18, to: 25, label: 'Elevated', tone: 'gold' },
          { from: 25, to: 40, label: 'High / stress', tone: 'gold' },
        ],
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24000, vix: 24, days: 1 },
        why: 'Compute the one-day expected move at VIX 24 and compare with VIX 14.',
      },
    },
    {
      t: 7,
      def: `A low VIX environment is one where India VIX is near the bottom of its recent range. Option premiums are cheap and the market expects small movement.`,
      hi: `Low VIX environment ka matlab hai India VIX apni recent range ke neeche ke paas hai. Option premium sasta hota hai aur market chhota movement expect karta hai.`,
      how: `Low VIX makes options cheap for buyers, but it also means the market is complacent, and big moves from a low base can still happen. For sellers the premium collected is small compared with the risk of a spike, so risk per rupee of premium is not attractive. A low VIX also means expected daily ranges are small, so intraday targets should be small too. VIX can stay low for months; "low" alone is not a signal to buy options.`,
      eg: {
        title: 'VIX 11 on a quiet week (illustrative)',
        text: `At VIX 11 the one-day one-standard-deviation move from 24,000 is about 138.18 points (0.58%), and the 7-day move about 365.60 points. A 7-day 24,000 straddle costs about ₹292.50, compared with ₹371.79 at VIX 14. A buyer pays less, but the break-even range is also narrower, around 23,707.50 to 24,292.50.`,
      },
      tip: `Cheap options are not the same as good options. Low VIX gives low cost, but time decay still works against a buyer every day.`,
      visual: {
        kind: 'bars',
        title: '7-day 24,000 straddle at different VIX (illustrative)',
        caption: 'The straddle price scales with VIX; the break-even band does too.',
        unit: ' ₹',
        items: [
          { label: 'VIX 11', value: 292.5, tone: 'ice' },
          { label: 'VIX 14', value: 371.79, tone: 'neutral' },
          { label: 'VIX 24', value: 636.47, tone: 'gold' },
        ],
      },
    },
    {
      t: 8,
      def: `During a market crash VIX usually surges because everyone rushes to buy protection and sellers withdraw. The crash and the VIX spike tend to arrive together, with VIX often peaking near the worst of the panic.`,
      hi: `Market crash mein VIX aam taur par tezi se upar jaata hai kyunki sab protection khareedne bhagte hain aur sellers peeche hat jaate hain. Crash aur VIX spike saath aate hain, aur VIX aksar panic ke sabse bure phase ke aas-paas peak karta hai.`,
      how: `Falls bring losses to long holders, who buy puts to hedge, while writers face margin pressure and cut positions, which pushes IV up. Put IV usually rises faster than call IV, so downside strikes get very expensive. In March 2020, during the COVID crash, India VIX went above 80, far above any other period in its history. A put bought after the spike may profit less than expected even if the index falls further, because IV can come down quickly.`,
      eg: {
        title: 'A 5% drop with VIX 15 to 35 (illustrative)',
        text: `Spot 24,000, 23,500 PE with 7 days left, VIX 15: premium about ₹35.64 (₹2,317 per lot of 65). Next day spot is 22,800 (a 5% fall), VIX is 35 and 6 days remain: premium about ₹836.17 (about ₹54,351 per lot). If VIX had stayed at 15 the same put would be about ₹687.45; the VIX spike added about ₹148.72 per unit on top of the delta gain. Such a move is an extreme illustration.`,
      },
      tip: `In a crash, both the spot move and the VIX spike pay the put buyer, and both can reverse sharply. Selling into such a spike without defined risk can mean very large losses.`,
      visual: {
        kind: 'candles',
        title: 'Breakdown with panic',
        caption: 'Sharp falls tend to come with a sharp rise in VIX; the VIX peak often arrives near the low.',
        pattern: 'breakdown',
      },
      calc: {
        id: 'option-pnl',
        preset: { optType: 'PE', side: 'buy', strike: 23500, premium: 35.64, expiryPrice: 22800, lotSize: 65, lots: 1 },
        why: 'Expiry-value view of the 23,500 PE if Nifty were 22,800 (excludes the remaining time value and the VIX effect).',
      },
    },
    {
      t: 9,
      def: `During strong rallies VIX often stays flat or falls, because the market feels comfortable and sees little need for protection. A fast rally can also lift VIX if traders chase calls or hedge against reversal.`,
      hi: `Strong rally mein VIX aksar flat rehta hai ya girta hai, kyunki market comfortable feel karta hai aur protection ki zaroorat kam lagti hai. Tez rally mein agar log calls chase karein ya reversal ka hedge lein toh VIX badh bhi sakta hai.`,
      how: `The usual relationship is inverse: rising Nifty with falling VIX. This is because put demand drops as the index rises, so overall IV falls. For call buyers, the gain from delta is partly offset by vega loss. A rally with rising VIX is a more nervous one, often seen near events. Check VIX direction while a rally is on; a rally where VIX does not fall is a signal to be careful about complacency, but not a timing tool by itself.`,
      eg: {
        title: 'A 2% rally with VIX falling (illustrative)',
        text: `Spot goes from 24,000 to 24,480 (+2%) and VIX falls from 15 to 13 with one day gone. The 24,200 CE moves from about ₹126.06 to about ₹358.63. If VIX had stayed at 15 it would be about ₹378.08, so the VIX fall cost the buyer about ₹19.45 per unit, roughly ₹1,264 on one lot of 65, while delta did the heavy lifting.`,
      },
      tip: `A call buyer in a calm rally gets paid on delta but loses some on vega. Pick strikes and expiry that can absorb that.`,
      visual: {
        kind: 'candles',
        title: 'Steady uptrend',
        caption: 'In a calm uptrend VIX usually drifts lower; calls gain on delta and give back a little to falling vega.',
        pattern: 'uptrend',
      },
      calc: {
        id: 'greeks',
        preset: { optType: 'CE', spot: 24480, strike: 24200, days: 6, iv: 13, rate: 6.5 },
        why: 'Price the 24,200 CE after the rally at IV 13, then at IV 15, to see the vega give-back.',
      },
    },
    {
      t: 10,
      def: `VIX divergence from Nifty means VIX and the index move in a way that does not match their usual opposite pattern, for example Nifty rising while VIX also rises. It signals that options traders and spot traders may be reading risk differently.`,
      hi: `VIX divergence ka matlab hai VIX aur Nifty apne usual ulte pattern se alag chal rahe hain, jaise Nifty badh raha hai aur VIX bhi badh raha hai. Yeh batata hai ki options traders aur spot traders risk ko alag tarah se dekh rahe hain.`,
      how: `Normally Nifty up means VIX down and vice versa. When Nifty rises and VIX rises too, option traders may be buying protection or expecting a big event while the cash market is still rising. When Nifty falls and VIX stays low, hedging demand is weak and the fall may be orderly. Divergences are clues, not signals. They often resolve either with VIX falling back or with the index changing direction, and there is no fixed time frame. Always confirm with price action and OI.`,
      eg: {
        title: 'Nifty +1% but VIX 15 to 16.5 (illustrative)',
        text: `Nifty moves from 24,000 to 24,240 (+1%) while VIX rises from 15 to 16.5 (+10%). The one-day one-standard-deviation move widens from about 188.43 points to about 207.28 points. Options traders are paying more for movement even as price rises, which hints at nervousness about an event or about the rally's durability. It does not say the index must fall.`,
      },
      tip: `Treat divergence as a yellow flag: reduce size and look for confirmation. It is not a standalone sell or buy signal.`,
      visual: {
        kind: 'matrix',
        title: 'Nifty and VIX: normal and divergent combinations',
        caption: 'The two off-diagonal cells are the usual pairs; the diagonal ones are divergences worth a closer look.',
        xLabels: ['VIX falls', 'VIX rises'],
        yLabels: ['Nifty rises', 'Nifty falls'],
        cells: [
          { head: 'Calm rally', note: 'The usual pairing', tone: 'ice' },
          { head: 'Nervous rally', note: 'Divergence: protection being bought', tone: 'gold' },
          { head: 'Orderly fall', note: 'Divergence: little hedge demand', tone: 'gold' },
          { head: 'Fear fall', note: 'The usual pairing', tone: 'ice' },
        ],
      },
      calc: {
        id: 'expected-move',
        preset: { spot: 24240, vix: 16.5, days: 1 },
        why: 'See how the expected daily range widens when VIX rises even as price rises.',
      },
    },
  ],
}

export default m
