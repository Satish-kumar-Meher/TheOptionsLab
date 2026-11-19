import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '4.5',
  intro:
    `An option's premium is not set by one thing. It is the market's running answer to several questions at once: where is the index, how far is the strike, how much time is left, how much movement is expected, and how easy is it to trade. This module lists the factors one by one so that, when a premium moves, you can say which factor did it. Examples use NIFTY 24,000, strike gap 50, lot 65 (check the current NSE contract specification), India VIX/IV 14%, rate 6.5% and Black-Scholes model values, which are illustrative and differ from live quotes.`,
  introHi:
    `Option ka premium kisi ek cheez se nahi banta. Yeh market ka ek saath kai sawalon ka jawab hota hai: index kahan hai, strike kitna door hai, kitna time bacha hai, kitni movement expected hai, aur trade karna kitna aasan hai. Is module mein hum factors ek-ek karke dekhte hain, taaki jab premium hile toh aap bata sako ki kaunsa factor zimmedar hai. Examples NIFTY 24,000, strike gap 50, lot 65 (current NSE contract specification check karein), IV 14%, rate 6.5% aur Black-Scholes model values par hain, jo illustrative hain aur live quotes se alag hote hain.`,
  steps: {
    concept:
      `Premium = intrinsic value + time value. Intrinsic value comes from the index level versus the strike. Time value comes from everything else: days left, expected volatility, interest rates, dividends and the simple fact that buyers and sellers must agree on a price. Twelve factors are covered here, and the first eight are exactly what the Greeks (Delta, Gamma, Theta, Vega) measure. Knowing the list stops you from blaming "the market" for every premium move.`,
    conceptHi:
      `Premium = intrinsic value + time value. Intrinsic value index aur strike ke beech ke farak se aati hai. Time value baaki sab se aati hai: bacha hua time, expected volatility, interest rate, dividend, aur yeh ki buyer aur seller ko ek price par agree karna padta hai. Yahan baarah factors hain, aur pehle aath wahi hain jo Greeks (Delta, Gamma, Theta, Vega) naap te hain. Yeh list pata ho toh har premium move ka ilzaam "market" par nahi daalna padta.`,
    mechanism:
      `Option pricing models such as Black-Scholes take five inputs for a European index option: spot, strike, time to expiry, volatility and the interest rate (plus the dividend yield for an index). Four of these are known or observable. Volatility is not, so traders work backwards: they take the premium the market is quoting and solve for the implied volatility (IV) that produces it. Supply and demand then push the quoted premium around the model value, and the bid-ask spread decides the price you actually deal at. On NSE, orders from all participants meet in one order book per contract; a market maker's quotes are anchored to the model, but a rush of buyers can lift the whole strip.`,
    example: {
      title: 'Which factor moved the premium? (NIFTY 24,000 CE, model values)',
      text: `Base case: NIFTY 24,000, 7 days left, IV 14%, rate 6.5%. The 24,000 CE is worth about ₹200.85 (₹13,055 per lot of 65). Change one factor at a time: spot +100 gives about ₹258.03; a strike of 24,200 gives ₹113.55; 3 days left gives ₹128.01; IV of 18% gives ₹253.76. The same premium can therefore rise because of direction, because of volatility, or both, and fall because of time. Only by separating the factors can you see which one is paying you and which one is charging you.`,
    },
    chart: {
      kind: 'bars',
      title: 'One factor at a time: 24,000 CE premium (base ₹200.85)',
      caption: 'Illustrative model values, 7 days, IV 14%, rate 6.5%. Each bar changes only one input from the base case.',
      unit: ' ₹',
      items: [
        { label: 'Spot +100 (24,100)', value: 258.03, tone: 'bull' },
        { label: 'Spot -100 (23,900)', value: 152.18, tone: 'bear' },
        { label: 'IV 14% to 18%', value: 253.76, tone: 'gold' },
        { label: 'IV 14% to 10%', value: 148, tone: 'gold' },
        { label: 'Time 7 to 3 days', value: 128.01, tone: 'ice' },
        { label: 'Strike 24,200', value: 113.55, tone: 'neutral' },
        { label: 'Base case', value: 200.85, tone: 'neutral' },
      ],
    },
    optionChain:
      `On an option chain every column hints at a factor: the strike ladder shows the strike effect, the expiry selector shows time, the IV column shows the volatility the market is paying, and the Delta/Theta/Vega columns (when your broker shows them) give the sensitivity to each. The bid and ask columns, and the volume and OI columns, speak to liquidity and demand. Interest rates and dividends do not have their own column: they are buried inside the premium and matter most for longer expiries and for put-call comparisons.`,
    psychology:
      `Most beginners watch only the index and expect the premium to follow like a shadow. When a call loses value on a day the index rose, they feel cheated. The factors explain it: IV may have fallen, a day of time value may have gone, or the strike may have been far out of the money. Traders who learn the list begin to ask "which factor am I really betting on?" before they buy, and that single question removes a lot of confusion and regret.`,
    scenarios: {
      bullish:
        `If NIFTY rises 100 points with other factors unchanged, the 24,000 CE gains about ₹57.18 per unit (₹3,717 per lot). But a rally that arrives with falling IV, say a post-event relief move, can give back part of that gain. Direction helps the call; volatility and time may help or hurt it.`,
      bearish:
        `If NIFTY falls 100 points, the 24,000 CE loses about ₹48.67 per unit (₹3,164 per lot) while the 24,000 PE gains. A fall usually comes with rising IV, which lifts both options, so the put may gain more than delta alone suggests and the call may lose less.`,
      sideways:
        `If NIFTY goes nowhere, the factors that remain are time and volatility. Time pulls premium down every day. A drift in IV can offset or add to it. A buyer in a quiet market is paying for the time that passes; a seller is being paid for it, and carries the risk of a sudden move.`,
    },
    practice: [
      {
        q: `The 24,000 CE is ₹200.85 with 7 days left. With nothing else changed except 4 days passing (3 days left) the model value is ₹128.01. What is the loss per lot of 65, and which factor caused it?`,
        a: `Loss per unit = 200.85 - 128.01 = ₹72.84. Per lot = 72.84 x 65 = ₹4,734.60. The factor is time to expiry (time decay): spot, strike, IV and rate were all held constant.`,
      },
      {
        q: `Raise IV from 14% to 18% on the same call (7 days, spot 24,000). By how much does the premium change per unit and per lot, and how many rupees per volatility point?`,
        a: `New premium 253.76 versus 200.85: +₹52.91 per unit. Per lot: 52.91 x 65 = ₹3,439. Per volatility point: 52.91 / 4 = about ₹13.23, which is the option's Vega.`,
      },
      {
        q: `A 24,500 CE has a model value of ₹39.20 at IV 14% but the market ask is ₹44. What does that tell you?`,
        a: `A premium of ₹44 corresponds to an implied volatility of about 14.6%, above the 14% in the model. Demand, a skew premium or event risk may be pushing the price. The extra ₹4.80 per unit (4.80 x 65 = ₹312 per lot) is not an error; it is the market pricing a higher volatility.`,
      },
      {
        q: `Does a rise in interest rates raise or lower the value of a NIFTY call and a put with 30 days to expiry?`,
        a: `Higher rates raise the call and lower the put, all else equal. Model values at 30 days, ATM, IV 14%: rate 5.5%: CE 439.95, PE 331.71; rate 7.5%: CE 461.34, PE 313.85. The effect is small compared with direction and volatility for short expiries.`,
      },
    ],
    assignment:
      `Open the Greeks calculator with spot 24,000, strike 24,000, 7 days, IV 14%, rate 6.5%. Record the premium. Then change only one input at a time (spot +/-100, days 7 to 3, IV 14 to 18, rate 6.5 to 7.5) and write the resulting premium next to a one-line explanation of why. Finish with a sentence naming the single factor you would never ignore for a weekly NIFTY option, and why.`,
  },
  topics: [
    {
      t: 1,
      def: `The underlying price is the current index level (or share price) on which the option is written. For a call, a higher underlying raises the premium; for a put, a lower underlying raises it. It is the biggest single driver of intrinsic value and of day-to-day premium changes.`,
      hi: `Underlying price matlab us index ya share ka current level jis par option bana hai. Call ke liye underlying upar jaye toh premium badhta hai; put ke liye underlying neeche jaye toh premium badhta hai. Roz ke premium moves ka sabse bada driver yahi hota hai.`,
      how: `For NIFTY options the underlying is the NIFTY 50 index, and index options are cash-settled and European on NSE. The premium does not move one-for-one with the index. It moves by roughly delta times the index move, so an at-the-money option may move about half a rupee per point while a far out-of-the-money option moves a few paise. During the day, market makers re-price their quotes continuously as the NIFTY futures and index tick, so the option chain follows the index in near real time.`,
      eg: {
        title: 'A 100-point move on the 24,000 CE (model, illustrative)',
        text: `7 days to expiry, IV 14%, rate 6.5%. At NIFTY 24,000 the 24,000 CE is ₹200.85. At 24,100 it is ₹258.03 (+₹57.18, ₹3,717 per lot of 65). At 23,900 it is ₹152.18 (-₹48.67, ₹3,164 per lot). The gain on the way up is larger than the loss on the way down because delta rises as the option gets deeper in the money.`,
      },
      tip: `Direction is only one of the twelve factors. A correct view on the index can still lose money on the option if IV falls or time runs out first.`,
      visual: {
        kind: 'compare',
        title: 'Same 100 points, different outcomes',
        caption: '24,000 CE, 7 days, IV 14%, illustrative model values.',
        left: { head: 'NIFTY 24,100', tone: 'bull', points: ['Premium about ₹258.03', 'Gain +₹57.18 per unit', '+₹3,717 per lot'] },
        right: { head: 'NIFTY 23,900', tone: 'bear', points: ['Premium about ₹152.18', 'Loss -₹48.67 per unit', '-₹3,164 per lot'] },
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24100, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Move spot up and down and watch the premium and delta change.' },
    },
    {
      t: 2,
      def: `The strike price is the fixed level at which the option holder can buy (call) or sell (put) the index at expiry. Its distance from the current index level decides the option's intrinsic value, and how likely it is to end up in the money. Lower call strikes cost more; higher call strikes cost less.`,
      hi: `Strike price woh fixed level hai jahan option holder expiry par index buy (call) ya sell (put) kar sakta hai. Current index se uski doori decide karti hai ki option mein intrinsic value kitni hai aur woh in the money jaane ki kitni sambhavna rakhta hai. Call ka strike jitna neeche, premium utna zyada; strike jitna upar, premium utna kam.`,
      how: `NSE lists a ladder of strikes at fixed gaps, and the gap can widen further from the index, so always inspect the actual strike list before placing an order. A call struck below the index has intrinsic value and costs more; a call struck above has only time value and costs less. For puts the pattern is reversed. Since the strike sets how far the index must travel to reach the option's breakeven, it also sets the probability-weighted price the market is willing to pay.`,
      eg: {
        title: 'Four call strikes at the same moment (model, illustrative)',
        text: `NIFTY 24,000, 7 days, IV 14%. 23,800 CE: ₹321.83 (₹200 intrinsic plus ₹121.83 time value). 24,000 CE: ₹200.85 (all time value). 24,200 CE: ₹113.55. 24,500 CE: ₹39.20. One lot of 65 costs about ₹20,919, ₹13,055, ₹7,381 and ₹2,548 respectively. Cheaper does not mean better: the 24,500 CE needs a move of more than 539 points to break even at expiry (24,500 + 39.20).`,
      },
      tip: `Compare strikes by what the index must do to make you money (the breakeven), not only by the rupees you pay.`,
      visual: { kind: 'ladder', title: 'Call strikes around NIFTY 24,000', caption: 'ITM below spot, ATM at spot, OTM above spot for a call.', optType: 'CE', spot: 24000, strikes: [23800, 23900, 24000, 24100, 24200, 24500] },
      calc: { id: 'moneyness', preset: { optType: 'CE', spot: 24000, strike: 24200 }, why: 'Check where a chosen strike sits relative to spot.' },
    },
    {
      t: 3,
      def: `Time to expiry is the number of days left before the contract ends. More time gives the index more chances to move, so options with longer expiries cost more. As days pass the time value shrinks, and the shrinking speeds up near expiry.`,
      hi: `Time to expiry matlab contract khatam hone mein kitne din bache hain. Zyada time ka matlab index ko move karne ke zyada chances, isliye lambi expiry ke options mehnge hote hain. Din guzarte hain toh time value ghatti hai, aur expiry ke paas yeh ghatna tez ho jata hai.`,
      how: `Time value does not fall in a straight line. For an at-the-money option it behaves roughly like the square root of the time left, so the last few days lose proportionally more. NSE index options expire on a fixed weekday (currently Tuesday for NIFTY, as per the NSE contract specification; the previous trading day applies if it is a holiday). In the model, each calendar day is counted, so weekends reduce time in the formula even though the exchange is closed.`,
      eg: {
        title: 'The same 24,000 CE as the days run out (model, spot fixed)',
        text: `IV 14%, spot 24,000: 30 days ₹450.57; 15 days ₹304.58; 7 days ₹200.85; 3 days ₹128.01; 1 day ₹72.31. From 7 days to 3 days, 4 days cost ₹72.84. From 3 days to 1 day, only 2 days cost ₹55.70. The per-day loss is growing: about ₹18 a day in the first stretch against about ₹28 a day in the second.`,
      },
      tip: `A buyer holding an option into the final days is fighting the steepest decay of its life. Pay for the time you need, not the time you hope for.`,
      visual: {
        kind: 'bars',
        title: '24,000 CE premium versus days left',
        caption: 'Illustrative model values, spot 24,000, IV 14%, rate 6.5%.',
        unit: ' ₹',
        items: [
          { label: '30 days', value: 450.57, tone: 'ice' },
          { label: '15 days', value: 304.58, tone: 'ice' },
          { label: '7 days', value: 200.85, tone: 'ice' },
          { label: '3 days', value: 128.01, tone: 'gold' },
          { label: '1 day', value: 72.31, tone: 'gold' },
        ],
      },
    },
    {
      t: 4,
      def: `Implied volatility (IV) is the amount of future movement the market is pricing into an option, expressed as an annual percentage. Higher IV means a more expensive option, for both calls and puts. India VIX is the market's headline measure of expected NIFTY volatility; it describes expected size of movement, not direction.`,
      hi: `Implied volatility (IV) woh movement hai jo market option ke price mein pehle se daal chuka hai, saalana percentage mein. IV zyada hoga toh call aur put dono mehnge honge. India VIX NIFTY ki expected volatility ka headline measure hai; yeh movement ka size batata hai, direction nahi.`,
      how: `IV is not observed; it is backed out from the traded premium using a model. When IV rises, the premium rises, even if the index has not moved. IV tends to jump before scheduled events (Budget, RBI policy, election results, results season) and fall sharply once the event passes, which is called IV crush. Because IV differs by strike and by expiry, the option chain is not priced at one single volatility.`,
      eg: {
        title: 'Same call, three volatilities (model, illustrative)',
        text: `24,000 CE, 7 days, spot 24,000, rate 6.5%. IV 10%: ₹148.00. IV 14%: ₹200.85. IV 18%: ₹253.76. Each extra volatility point adds about ₹13.2 per unit, which is ₹859 per lot of 65. A buyer who bought at 18% and sees IV return to 14% loses about ₹52.91 per unit (₹3,439 per lot) before the index has moved at all.`,
      },
      tip: `Check IV (or at least India VIX) before buying. Paying an expensive IV and being right on direction can still end in a loss if IV later normalises.`,
      visual: {
        kind: 'gauge',
        title: 'India VIX as a mood gauge (illustrative bands)',
        caption: 'Bands are rough teaching ranges, not official thresholds. VIX shows expected movement size, not direction.',
        min: 8,
        max: 35,
        value: 14,
        unit: '',
        zones: [
          { from: 8, to: 12, label: 'Calm', tone: 'ice' },
          { from: 12, to: 18, label: 'Normal', tone: 'gold' },
          { from: 18, to: 35, label: 'Stressed', tone: 'neutral' },
        ],
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 18, rate: 6.5 }, why: 'Change the IV input and watch the premium respond at a fixed spot.' },
    },
    {
      t: 5,
      def: `Delta is how many rupees the premium is expected to move for a one-point move in the index. It tells you the option's directional exposure. A 0.53 delta call gains about ₹0.53 for each index point.`,
      hi: `Delta batata hai ki index ek point hilne par premium kitne rupaye hilega. Yeh option ki directional exposure dikhata hai. 0.53 delta wale call ka premium index ke har point par lagbhag ₹0.53 badhta hai.`,
      how: `Delta is a sensitivity estimated by the model, not a published exchange number, so different brokers may show slightly different figures. Call delta runs from 0 to +1 and put delta from -1 to 0. It changes as the index, time and IV change. Delta is a sensitivity first; it is only loosely a probability of finishing in the money.`,
      eg: {
        title: 'Delta of three strikes (model, illustrative)',
        text: `NIFTY 24,000, 7 days, IV 14%. 23,800 CE delta 0.6934, 24,000 CE 0.5295, 24,200 CE 0.3617, 24,500 CE 0.1612. A 50-point rally suggests gains of roughly 34.67, 26.47, 18.09 and 8.06 rupees per unit. For one lot of 65, the 24,000 CE gain is about ₹1,721.`,
      },
      tip: `Delta says how sensitive, not which direction the index will go.`,
      visual: { kind: 'curve', title: 'Delta against index level', caption: 'An S-shaped curve: near 0 far OTM, near 0.5 at the money, near 1 deep ITM.', curve: 'delta' },
    },
    {
      t: 6,
      def: `Gamma is how fast delta changes when the index moves by one point. It is highest for at-the-money options with little time left. High gamma means the option's directional exposure can change quickly.`,
      hi: `Gamma batata hai ki index ek point hilne par delta kitni tezi se badalta hai. Yeh at-the-money options mein aur expiry ke paas sabse zyada hota hai. Zyada gamma ka matlab option ki directional exposure jaldi badal sakti hai.`,
      how: `Gamma is the second-order effect: it makes premium gains accelerate for long options and losses accelerate for short options. It is the reason an ATM option on expiry day can jump several times its value on a small index move. Option buyers are long gamma; sellers are short gamma. Gamma is highest near the strike and shrinks quickly for strikes far from the index.`,
      eg: {
        title: 'Gamma shows up as delta drift (model, illustrative)',
        text: `24,000 CE, 7 days: delta 0.5295, gamma about 0.00086 per point. A 100-point rise should lift delta by about 0.086 (0.5295 to about 0.615); the model shows 0.6135. With 1 day left, gamma is 0.00227, so the same 100-point move lifts delta much more, which is why expiry-day premiums are so jumpy.`,
      },
      tip: `Gamma is what makes expiry-day moves feel wild: the option's sensitivity changes within minutes.`,
      visual: { kind: 'curve', title: 'Gamma against index level', caption: 'A bell shape that peaks near the strike.', curve: 'gamma' },
    },
    {
      t: 7,
      def: `Theta is the rupees an option loses per day just because time passes, with everything else unchanged. For buyers, theta is a daily cost; for sellers, it is a daily income earned in return for taking risk.`,
      hi: `Theta batata hai ki sirf time guzarne se option har din kitne rupaye khota hai, baaki sab same rehne par. Buyer ke liye theta roz ka cost hai; seller ke liye yeh roz ki kamai hai, jiske badle woh risk uthata hai.`,
      how: `Theta is largest for at-the-money options and grows as expiry approaches, because that is where time value is concentrated. It is quoted per calendar day. Far out-of-the-money options have small rupee theta because their premium is small, but their percentage decay can be harsh. Theta is the price buyers pay for gamma and vega.`,
      eg: {
        title: 'Theta of the 24,000 CE (model, illustrative)',
        text: `7 days: theta about -₹15.45 per unit per day, which is ₹1,004 per lot of 65. With 1 day left: -₹37.24 per unit per day, or ₹2,421 per lot. That is 7.7% of the 7-day premium (200.85) in one day, against 51.5% of the 1-day premium (72.31).`,
      },
      tip: `Theta is a steady drip for sellers and a steady leak for buyers. Always read it as a percentage of the premium, not only in rupees.`,
      visual: { kind: 'curve', title: 'Time value against time to expiry', caption: 'Decay is slow at first and steepens near expiry.', curve: 'timeValue' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Read theta for any strike and expiry.' },
    },
    {
      t: 8,
      def: `Vega is how many rupees the premium changes for a one-point change in implied volatility. Long options have positive vega, so rising IV helps buyers; short options have negative vega.`,
      hi: `Vega batata hai ki implied volatility ek point badalne par premium kitne rupaye badalta hai. Long options ka vega positive hota hai, isliye IV badhne par buyer ko fayda hota hai; short options ka vega negative hota hai.`,
      how: `Vega is largest for at-the-money options and for longer expiries; it shrinks as expiry approaches. It is the Greek that explains why a quiet index can still move your premium: a falling India VIX lowers option values, a rising one lifts them. Vega is not the same for every strike and expiry, and IV itself can differ by strike, so a one-point change in India VIX does not translate evenly across the chain.`,
      eg: {
        title: 'Vega across expiries (model, illustrative)',
        text: `ATM 24,000 CE, IV 14%: 30 days: vega 27.13; 7 days: 13.22; 1 day: 5.01 rupees per unit per volatility point. For one lot of 65 and 7 days left, a 2-point IV drop costs about 13.22 x 2 x 65 = ₹1,719. With 30 days left, the same 2-point drop costs about ₹3,527.`,
      },
      tip: `Longer-dated options carry more vega; if you buy them you are also buying a view on volatility.`,
      visual: { kind: 'curve', title: 'Vega against index level', caption: 'Highest near the strike, lower far away.', curve: 'vega' },
    },
    {
      t: 9,
      def: `Interest rates affect option premiums because the buyer of a call keeps money in the bank instead of buying the index now, while a put buyer is delayed in receiving sale proceeds. Higher rates slightly raise call premiums and lower put premiums. The effect is small for short expiries.`,
      hi: `Interest rate option premium ko isliye prabhavit karta hai kyunki call buyer index abhi kharidne ki jagah paisa bank mein rakhta hai. Rate zyada ho toh call premium thoda badhta hai aur put premium thoda ghatta hai. Chhoti expiry mein yeh asar bahut kam hota hai.`,
      how: `The model uses a risk-free rate, usually linked to government securities or the RBI policy rate. It matters through the forward price: the NIFTY future trades at spot plus the cost of carry (interest minus dividends). Rho measures the sensitivity (module 6.6). Weekly traders can usually ignore rate changes, but anyone comparing a call and put at the same strike (put-call parity) must account for it.`,
      eg: {
        title: 'Rate shift on a 30-day ATM option (model, illustrative)',
        text: `NIFTY 24,000, strike 24,000, 30 days, IV 14%. Rate 5.5%: CE ₹439.95, PE ₹331.71. Rate 6.5%: CE ₹450.57, PE ₹322.69. Rate 7.5%: CE ₹461.34, PE ₹313.85. A one percentage point rise lifts the call by about ₹10.6 and lowers the put by about ₹9.0 per unit.`,
      },
      tip: `Rates matter little for a weekly option but become noticeable for longer expiries; ignore them early, respect them later.`,
      visual: {
        kind: 'compare',
        title: 'Rate rise: who gains?',
        caption: '30 days, ATM, illustrative, per 1 percentage point.',
        left: { head: 'Call (CE)', tone: 'bull', points: ['Premium rises about ₹10.6', 'Reason: lower cost of carrying the long position', 'Rho is positive'] },
        right: { head: 'Put (PE)', tone: 'bear', points: ['Premium falls about ₹9.0', 'Reason: delayed receipt of sale proceeds', 'Rho is negative'] },
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 30, iv: 14, rate: 7.5 }, why: 'Change the rate input and see the call and put values shift.' },
    },
    {
      t: 10,
      def: `Dividends and cost of carry change the forward price of the index. An index pays dividends through its constituent shares, which makes the forward slightly lower than it would otherwise be and so lowers call values and lifts put values. Carry is the net of the interest cost and the dividends you give up.`,
      hi: `Dividend aur cost of carry index ke forward price ko badalte hain. Index ke shares dividend dete hain, jisse forward price thoda kam ho jata hai, isliye call ki value ghatti hai aur put ki value badhti hai. Carry matlab interest ka cost minus dividend jo aap chhod dete ho.`,
      how: `For an index, the dividend is expressed as a yield on the whole basket (roughly 1.3% a year for NIFTY in the lessons' assumptions). The futures fair value is spot x e^((rate - dividend yield) x time). Option pricing for an index uses this forward. Large dividend payments concentrated before an expiry matter more for stock options, which are also physically settled, than for NIFTY.`,
      eg: {
        title: 'Dividend yield 1.3% on a 30-day ATM option (model, illustrative)',
        text: `NIFTY 24,000, strike 24,000, 30 days, IV 14%, rate 6.5%. With no dividend yield the CE is ₹450.57 and the PE ₹322.69. With a 1.3% dividend yield the CE is ₹436.33 (-₹14.24) and the PE ₹334.08 (+₹11.39). The forward price is pulled down, which helps the put and hurts the call.`,
      },
      tip: `Dividends and rates work in opposite directions on the forward price; ignoring both is fine for weekly trades but not for long-dated ones.`,
      visual: {
        kind: 'flow',
        title: 'From spot to forward price',
        caption: 'Carry = interest cost minus dividends given up.',
        steps: [
          { label: 'Spot index', note: '24,000', tone: 'neutral' },
          { label: '+ Interest (6.5%)', note: 'raises the forward', tone: 'gold' },
          { label: '- Dividends (1.3%)', note: 'lowers the forward', tone: 'ice' },
          { label: 'Forward / futures fair value', tone: 'neutral' },
        ],
      },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24100, rate: 6.5, days: 30, dividend: 1.3 }, why: 'See how rate and dividend set the fair futures price.' },
    },
    {
      t: 11,
      def: `Demand and supply decide the price you actually pay. Models give a fair value, but if many traders want to buy a strike, its price can rise above the model value. If many want to sell, it can trade below.`,
      hi: `Demand aur supply decide karti hai ki aap asal mein kitna price dete ho. Model ek fair value deta hai, lekin agar bahut log ek strike kharidna chahein toh uska price model value se upar chala jata hai. Agar bahut log bechna chahein toh price neeche aa jata hai.`,
      how: `NSE matches buy and sell orders in each strike's order book. Heavy buying in out-of-the-money puts before a feared event pushes their IV above that of calls (skew). Market makers hedge with futures but also widen quotes when the order flow is one-sided. Open interest and volume tell you where activity is, but OI alone cannot tell you who initiated a trade or whether they were buying or selling.`,
      eg: {
        title: 'Demand lifts a strike above model value (illustrative)',
        text: `The 24,500 CE has a model value of ₹39.20 at IV 14%. If heavy buying lifts the ask to ₹44, the implied volatility is about 14.6%. If sellers push the bid down to ₹36, the implied volatility is about 13.6%. A 1% IV move is about ₹8.1 on this option at 7 days, so a ₹4.80 premium is only about 0.6 volatility points.`,
      },
      tip: `A premium above model value is a message about demand, not proof of a coming move.`,
      visual: {
        kind: 'matrix',
        title: 'Demand and supply on one strike',
        caption: 'Illustrative reading of order-book pressure.',
        xLabels: ['Few sellers', 'Many sellers'],
        yLabels: ['Many buyers', 'Few buyers'],
        cells: [
          { head: 'Premium rises above model', note: 'IV pushed up', tone: 'gold' },
          { head: 'Premium near model', note: 'balanced', tone: 'neutral' },
          { head: 'Wide spread, thin book', note: 'hard to trade', tone: 'ice' },
          { head: 'Premium falls below model', note: 'IV pushed down', tone: 'gold' },
        ],
      },
    },
    {
      t: 12,
      def: `Liquidity is how easily you can buy or sell without moving the price. The bid-ask spread is the gap between the best price buyers will pay (bid) and the lowest price sellers will accept (ask). A wide spread is a hidden cost every time you trade.`,
      hi: `Liquidity matlab aap bina price hilaye kitni aasani se buy ya sell kar sakte ho. Bid-ask spread best buyer ke price (bid) aur best seller ke price (ask) ke beech ka gap hai. Wide spread har trade par chhupa hua cost hota hai.`,
      how: `ATM and near-ATM NIFTY options usually carry tight spreads, a rupee or less. Far out-of-the-money strikes, far expiries and stock options often show wide gaps. Market orders in thin strikes can fill at poor prices (slippage); limit orders protect you but may not fill. You pay the spread when you enter and again when you exit, so round-trip cost is about twice the quoted gap.`,
      eg: {
        title: 'Two strikes, two spreads (illustrative quotes)',
        text: `ATM 24,000 CE: bid ₹200.80, ask ₹201.00, spread ₹0.20, which costs about ₹13 per lot of 65 per side. A thin far strike quoted bid ₹37.20, ask ₹41.00 has a spread of ₹3.80, about ₹247 per lot per side, and that is 9.7% of the mid price. The cheap-looking option is the expensive one to trade.`,
      },
      tip: `Check bid, ask and volume before the order, and use a limit price between them rather than a market order in thin strikes.`,
      visual: {
        kind: 'orderBook',
        title: 'A tight book versus a thin book',
        caption: 'Illustrative quotes for a thin 24,500 CE: wide gap, small quantities.',
        bids: [[37.2, 130], [36.5, 65], [35.0, 195]],
        asks: [[41.0, 65], [41.8, 130], [43.0, 65]],
      },
      calc: { id: 'spread-cost', preset: { bid: 37.2, ask: 41, qty: 1, lotSize: 65 }, why: 'Turn a quoted spread into rupees per lot.' },
    },
  ],
  tools: [{ id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Change one input at a time to see each factor.' }],
}
export default m
