import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '6.5',
  intro:
    `Vega is the Greek for volatility. It tells you how much an option's premium changes when implied volatility (IV) changes by one point. Because India VIX and IV swing a lot around events, vega can matter as much as direction. All numbers are illustrative Black-Scholes values (Nifty 24,000, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `Vega volatility ka Greek hai. Yeh batata hai ki implied volatility (IV) ek point badalne par option ka premium kitna badalta hai. India VIX aur IV events ke aas-paas bahut hilte hain, isliye kabhi-kabhi vega direction jitna hi important ho jaata hai. Saare numbers illustrative Black-Scholes values hain (Nifty 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `Implied volatility is the market's expected size of future price swings, backed out of option prices. A higher IV means a higher premium for both calls and puts. Vega is the rupee change in premium for a one-point change in IV, with spot and time unchanged. A buyer of options is long vega (gains when IV rises); a seller is short vega (loses when IV rises).`,
    conceptHi:
      `Implied volatility market ki expected price swings ka size hai, jo option prices se nikalta hai. IV zyada ho toh call aur put dono ka premium zyada hota hai. Vega batata hai ki IV ek point badalne par premium kitne rupees badlega, jab spot aur time same ho. Option buyer long vega hota hai (IV badhne par kamata hai) aur seller short vega (IV badhne par loss).`,
    mechanism:
      `Vega is largest for ATM options and for options with more time left. It is small for deep ITM, far-OTM and near-expiry options. It has the same sign for calls and puts: both are positive for a long position. India VIX measures the market's expected 30-day volatility of Nifty; the IV of a specific strike and expiry may move by more or less than VIX. IV often rises before events (Budget, RBI policy, results, election days) and falls sharply after them (IV crush).`,
    example: {
      title: 'IV 14% to 18% on the 7-day ATM options (illustrative)',
      text: `Nifty 24,000, 7 days left. At IV 14% the 24,000 CE is ₹200.85 and the PE ₹170.95. At IV 18% they are ₹253.76 and ₹223.86. Each rises ₹52.91 (about 4 × vega 13.22), which is ₹3,439.15 per lot of 65 per leg. Nifty did not move. If IV had fallen to 10%, they would be ₹148.00 and ₹118.10.`,
    },
    chart: {
      kind: 'bars',
      title: 'ATM 24,000 CE vega by days to expiry (illustrative, ₹ per IV point)',
      caption: 'More time left means more vega. Near expiry the option is mostly a bet on spot and time, not volatility.',
      unit: ' ₹',
      items: [
        { label: '30 days', value: 27.13, tone: 'gold' },
        { label: '14 days', value: 18.65, tone: 'gold' },
        { label: '7 days', value: 13.22, tone: 'ice' },
        { label: '3 days', value: 8.67, tone: 'ice' },
        { label: '1 day', value: 5.01, tone: 'neutral' },
      ],
    },
    optionChain:
      `The chain has an IV column for each strike (and some platforms add vega). Note the IV of the ATM strike and compare it with India VIX and with yesterday. If premiums have risen but spot is flat, IV has risen. Compare the IV of calls and puts at similar distances from spot: puts usually carry higher IV in the index (skew), which changes how much each side gains in a volatility spike.`,
    psychology:
      `Many traders believe they lost money because they were wrong about direction, when part of the loss came from falling IV after an event. Buying before a big event feels exciting, but the price already includes the expected move. Sellers who sell volatility at a high IV can feel safe, but they are short vega and short gamma, so a sudden shock can hurt.`,
    scenarios: {
      bullish:
        `A rally with rising IV helps a call buyer twice; a calm rally with falling IV can leave the call with a small gain, as when Nifty rises 100 points but IV drops to 12% and the call gains only ₹3.13.`,
      bearish:
        `Falling markets tend to push IV up, so a put buyer often gains from both delta and vega. A call seller may gain from the fall but loses on the way if IV spikes first.`,
      sideways:
        `If the market is flat and IV falls, both CE and PE lose value, which suits sellers. If IV rises ahead of an event with spot flat, both rise, which suits buyers.`,
    },
    practice: [
      {
        q: `The 7-day ATM call has vega ₹13.22. How much does one lot of 65 gain or lose if IV changes by 3 points?`,
        a: `13.22 × 3 = ₹39.66 per unit. One lot = 39.66 × 65 = ₹2,577.90 (spot and time unchanged; the full model change for 14% to 11% is ₹39.65 per unit, ₹2,577.25 per lot).`,
      },
      {
        q: `You buy the 24,000 CE and PE (straddle) at IV 14%, 7 days left, for ₹371.80 total. IV rises to 18%, spot unchanged. What is the straddle worth and the gain per lot?`,
        a: `Model values at IV 18%: ₹253.76 + ₹223.86 = ₹477.62. Gain = 477.62 − 371.80 = ₹105.82 per unit, × 65 = ₹6,878.30.`,
      },
      {
        q: `The 24,500 CE is ₹39.20 at IV 14%, and ₹75.58 at IV 18%. Compare its percentage change with the ATM call (₹200.85 to ₹253.76).`,
        a: `24,500 CE: (75.58 − 39.20) ÷ 39.20 = 92.8%. ATM: 52.91 ÷ 200.85 = 26.3%. The OTM option moves more in percentage terms but less in rupees (₹36.38 vs ₹52.91).`,
      },
      {
        q: `Which has higher vega at the same strike: 30 days or 1 day to expiry? By how much does the premium change for a 6-point IV rise at the 24,000 CE in each case?`,
        a: `30 days: vega 27.13, premium moves from ₹450.57 to ₹613.77 (+₹163.20). 1 day: vega 5.01, ₹72.31 to ₹102.37 (+₹30.06). Longer-dated options carry much more vega.`,
      },
    ],
    assignment:
      `Open the Greeks calculator. For the 24,000 CE keep spot at 24,000 and change IV through 10, 12, 14, 16, 18, 20 for 30 days and for 7 days. Tabulate the premiums and vegas. Then compute the percentage change in premium for 14% to 20% in each case and write three sentences about which contract a trader should pick before an event.`,
  },
  topics: [
    {
      t: 1,
      def: `Vega (ν) is the Greek that tells you how many rupees an option's premium changes when implied volatility moves by one percentage point, with everything else constant. It is positive for a buyer of an option and negative for a seller.`,
      hi: `Vega (ν) woh Greek hai jo batata hai ki implied volatility ek percentage point badalne par option ka premium kitne rupees badalta hai, baaki sab same rahe toh. Buyer ke liye yeh positive aur seller ke liye negative hota hai.`,
      how: `Vega is quoted per unit per volatility point. The ATM Nifty call with 7 days to expiry has a vega of about ₹13.22, so one lot (65 units) gains or loses about ₹859 for each point of IV. Vega is the same for a call and a put at the same strike and expiry in the Black-Scholes model. It is a first-order estimate: for large IV changes, the real change differs slightly because vega itself changes.`,
      eg: {
        title: 'Vega of an ATM call, one lot (illustrative)',
        text: `At Nifty 24,000, 7 days, IV 14%, the 24,000 CE has vega 13.22. One lot: 13.22 × 65 = ₹859.30 per IV point. If IV rises 2 points the lot gains about ₹1,718.60; if IV falls 2 points it loses about the same, with spot and time unchanged.`,
      },
      tip: `Think of vega as the price of one point of volatility. Know how many rupees per lot it is before you trade around an event.`,
      visual: { kind: 'curve', title: 'Vega curve', caption: 'Vega peaks at the money and falls toward both wings.', curve: 'vega' },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Read the vega of the 7-day ATM call and multiply by 65.' },
    },
    {
      t: 2,
      def: `The relationship between IV and vega is that vega tells you how sensitive the premium is to IV; IV tells you the current level of the market's expectation. When IV rises, both calls and puts get more expensive.`,
      hi: `IV aur vega ka rishta yeh hai ki vega batata hai premium IV ke prati kitna sensitive hai; IV batata hai ki market ki abhi ki expectation kya hai. IV badhta hai toh call aur put dono mehnge ho jaate hain.`,
      how: `A higher IV means a wider range of possible expiry levels, which raises the chance of any strike finishing in the money. That raises the price of both calls and puts. Vega itself depends on spot, strike, time and IV level, so the premium is not a perfect straight line in IV, though it is close for small changes. Indian index options are cash-settled and European, so Black-Scholes is a reasonable educational model, but real prices also reflect supply, demand and skew.`,
      eg: {
        title: 'ATM straddle at three IV levels, 7 days (illustrative)',
        text: `The straddle (24,000 CE + PE) costs ₹266.09 at IV 10%, ₹318.92 at IV 12%, ₹371.80 at IV 14% and ₹477.62 at IV 18%. Going from IV 12% to 14% adds about ₹52.88 per unit; from 14% to 18% adds ₹105.82. Each IV point adds about ₹26.4 to the straddle, equal to the CE vega plus the PE vega.`,
      },
      tip: `Always check IV before you buy. The same strike can be cheap or expensive depending on where IV is.`,
      visual: { kind: 'bars', title: '7-day ATM straddle price by IV (illustrative, ₹)', unit: ' ₹', items: [{ label: 'IV 10%', value: 266.09, tone: 'ice' }, { label: 'IV 12%', value: 318.92, tone: 'ice' }, { label: 'IV 14%', value: 371.8, tone: 'gold' }, { label: 'IV 18%', value: 477.62, tone: 'gold' }] },
      calc: { id: 'greeks', preset: { optType: 'PE', spot: 24000, strike: 24000, days: 7, iv: 18, rate: 6.5 }, why: 'Change IV and watch both call and put premiums respond.' },
    },
    {
      t: 3,
      def: `Positive vega means the position gains when implied volatility rises and loses when it falls. Anyone who buys options, whether a call, a put or a straddle, has positive vega.`,
      hi: `Positive vega ka matlab hai ki implied volatility badhne par position ko faayda hota hai aur girne par nuksan. Jo bhi option khareedta hai, chahe call, put ya straddle, uska vega positive hota hai.`,
      how: `A long option's value is a bet on the amount of movement. If the market starts to expect larger swings (for example before a policy decision or in a sell-off), the premium rises even before spot moves. A long straddle has the highest positive vega because both legs are long. The danger is a fall in IV after an event is out; the buyer may lose even if the index moves.`,
      eg: {
        title: 'Long straddle when IV jumps (illustrative)',
        text: `A trader buys the 24,000 CE and PE (7 days, IV 14%) for ₹371.80 total (₹24,167 per lot). If IV rises to 18% with spot unchanged, the straddle is ₹477.62. Gain = ₹105.82 per unit, ₹6,878.30 per lot, about 28.5%, all from IV. If instead IV falls to 10% the straddle is ₹266.09, a loss of ₹105.71 per unit (₹6,871.15 per lot).`,
      },
      tip: `Long vega is a bet that volatility will rise, not just that the market will move. Be clear which of the two you want.`,
      visual: { kind: 'payoff', title: 'Long 24,000 straddle at expiry (premium 371.80)', caption: 'Profits at expiry beyond the two breakevens; before expiry vega adds or removes value.', spot: 24000, legs: [{ type: 'CE', side: 1, strike: 24000, premium: 200.85 }, { type: 'PE', side: 1, strike: 24000, premium: 170.95 }] },
      calc: { id: 'straddle-move', preset: { spot: 24000, cePrice: 200.85, pePrice: 170.95, strike: 24000 }, why: 'Find the straddle implied move and breakevens.' },
    },
    {
      t: 4,
      def: `Negative vega means the position loses when implied volatility rises and gains when it falls. Anyone who sells options has negative vega.`,
      hi: `Negative vega ka matlab hai ki implied volatility badhne par position ko loss hota hai aur girne par profit. Jo bhi option bechta hai, uska vega negative hota hai.`,
      how: `A short option collects premium and benefits when the market becomes calmer. But if IV rises, the premium that the seller has to buy back becomes larger, even before spot moves. A short straddle or strangle has the largest negative vega, along with negative gamma. Sellers on NSE must maintain SPAN and exposure margin; the margin required can rise when volatility rises, which is an extra pressure at the same time as the loss.`,
      eg: {
        title: 'Short straddle when IV rises (illustrative)',
        text: `A trader sells the 24,000 CE and PE (7 days, IV 14%) for ₹371.80 total. IV rises to 18% with spot unchanged, so the straddle is ₹477.62. The loss is ₹105.82 per unit, ₹6,878.30 per lot, before any move in Nifty. If IV falls to 10% the straddle is ₹266.09 and the gain is ₹105.71 per unit (₹6,871.15 per lot).`,
      },
      tip: `Short vega profits are capped at the premium, while a volatility shock can cost many times more. Size positions for the shock.`,
      visual: { kind: 'compare', title: 'Long vega vs short vega', left: { head: 'Long vega (buyer)', tone: 'ice', points: ['Gains when IV rises', 'Loses when IV falls (IV crush)', 'Pays theta every day', 'Loss limited to premium'] }, right: { head: 'Short vega (seller)', tone: 'gold', points: ['Gains when IV falls', 'Loses when IV rises', 'Earns theta every day', 'Loss can be large; margin required'] } },
    },
    {
      t: 5,
      def: `ATM options have the highest vega, while OTM and ITM options have lower vega in rupee terms. But OTM options can show a larger percentage change in premium for the same IV change because they start from a small price.`,
      hi: `ATM options ka vega sabse zyada hota hai, jabki OTM aur ITM options ka vega rupees mein kam hota hai. Lekin OTM option ka premium chhota hota hai, isliye same IV change par uska percentage change bada dikh sakta hai.`,
      how: `ATM options have the most uncertainty about finishing in or out of the money, so a change in volatility changes their value the most in rupees. Far-OTM options have low probability and low vega, but a rise in IV makes their small probability grow quickly in relative terms. With a longer time left, the whole vega profile is higher and flatter across strikes.`,
      eg: {
        title: 'Vega by strike, 7 days and 30 days (illustrative)',
        text: `7 days: 23,500 CE 6.77, 24,000 CE 13.22, 24,500 CE 8.13, 25,000 CE 1.68. 30 days: 21.82, 27.13, 25.72, 18.90. IV 14% to 18% on the 7-day 24,500 CE takes it from ₹39.20 to ₹75.58, up 92.8% (₹36.38), while the ATM call rises 26.3% (₹52.91).`,
      },
      tip: `Compare rupee vega for risk and percentage change for return. OTM options look dramatic because they start tiny.`,
      visual: { kind: 'bars', title: 'Vega of calls by strike, 7 days left (illustrative, ₹ per IV point)', unit: ' ₹', items: [{ label: '23,500 CE', value: 6.77, tone: 'ice' }, { label: '24,000 CE (ATM)', value: 13.22, tone: 'gold' }, { label: '24,500 CE', value: 8.13, tone: 'ice' }, { label: '25,000 CE', value: 1.68, tone: 'neutral' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24500, days: 7, iv: 14, rate: 6.5 }, why: 'Compare vega of the 24,500 CE with the ATM strike.' },
    },
    {
      t: 6,
      def: `Vega near expiry is small. As time runs out, there is little time left for volatility to matter, so an option's price is mostly about where spot is relative to the strike.`,
      hi: `Expiry ke paas vega chhota ho jaata hai. Time kam bachta hai toh volatility ka asar kam ho jaata hai, aur option ka price zyadatar is par depend karta hai ki spot strike ke relative kahan hai.`,
      how: `Because vega scales with the square root of time left, a 30-day option has about 5 times the vega of a 1-day option at the same strike (27.13 vs 5.01). So traders who want volatility exposure for an event often pick longer-dated options, while expiry-day traders mainly face gamma and theta. However, near expiry, IV on individual strikes can jump around a lot, so one-point moves in IV mean less in rupees but IV itself can swing by many points.`,
      eg: {
        title: 'Same 6-point IV rise, two expiries (illustrative)',
        text: `IV goes from 14% to 20% with spot at 24,000. A 30-day ATM CE goes from ₹450.57 to ₹613.77, a rise of ₹163.20 (₹10,608 per lot). A 1-day ATM CE goes from ₹72.31 to ₹102.37, a rise of ₹30.06 (₹1,953.90 per lot).`,
      },
      tip: `If you want to trade volatility, choose time. If you want to trade a quick move, near expiry works but theta will be heavy.`,
      visual: { kind: 'bars', title: 'ATM CE gain from IV 14% to 20% (illustrative, ₹ per unit)', unit: ' ₹', items: [{ label: '30 days left', value: 163.2, tone: 'gold' }, { label: '1 day left', value: 30.06, tone: 'ice' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 1, iv: 20, rate: 6.5 }, why: 'Check the 1-day option at IV 20% against 14%.' },
    },
    {
      t: 7,
      def: `Volatility expansion is a period when implied volatility rises. It usually comes with uncertainty: sharp sell-offs, big events, surprising news or rising global fear.`,
      hi: `Volatility expansion woh period hai jab implied volatility badhta hai. Yeh aam taur par uncertainty ke saath aata hai: tez sell-off, bade events, surprise news ya global fear.`,
      how: `When IV expands, option sellers demand more premium and buyers rush to protect, so both calls and puts get pricier. India VIX typically rises in sharp falls and ahead of known events. An expanding IV helps long-vega positions and hurts short-vega positions. After an expansion, IV often falls back, so late buyers risk buying at the top. VIX is a measure of expected volatility, not direction.`,
      eg: {
        title: 'Call buyer in an up-move with different IV paths (illustrative)',
        text: `A trader buys the 24,000 CE at ₹200.85 (7 days left). Two days later Nifty is 24,100. If IV is still 14% the option is ₹225.22 (+₹24.37); if IV rose to 16% it is ₹246.76 (+₹45.91, ₹2,984.15 per lot). Expansion nearly doubled the gain.`,
      },
      tip: `When IV has already expanded, the market has priced in the fear. Buying then means paying a high price for protection.`,
      visual: { kind: 'gauge', title: 'India VIX zones (illustrative)', caption: 'Rising VIX signals expanding expected volatility, not direction.', min: 8, max: 30, value: 18, zones: [{ from: 8, to: 13, label: 'Low', tone: 'ice' }, { from: 13, to: 20, label: 'Moderate', tone: 'gold' }, { from: 20, to: 30, label: 'High', tone: 'bear' }] },
    },
    {
      t: 8,
      def: `Volatility contraction is a fall in implied volatility. It often happens after an event, when uncertainty has been resolved, or in a calm, trending market.`,
      hi: `Volatility contraction ka matlab hai implied volatility ka girna. Aisa aksar event ke baad hota hai jab uncertainty khatam ho jaati hai, ya shaant trending market mein.`,
      how: `When IV falls, option premiums fall even if spot does not move. The drop is sharpest just after a scheduled event, which traders call an IV crush. Buyers who bought for the event can lose on volatility even if the direction was right. Sellers who sold before the event gain. A fall in IV also reduces the cost of hedging, so premiums on both sides are lower.`,
      eg: {
        title: 'IV crush after an event (illustrative)',
        text: `Three days before an event a trader buys the 24,000 straddle at IV 16% for ₹277.88 (₹18,062.20 a lot). After the event IV drops to 13% and spot is unchanged; the straddle is ₹225.86. Loss = ₹52.02 per unit, ₹3,381.30 per lot, although time is the same. Also: a call bought at ₹200.85 gains only ₹3.13 after a 100-point rise if IV falls to 12%.`,
      },
      tip: `Before buying ahead of an event, ask how much move is already priced in. If the real move is smaller, IV crush can erase gains.`,
      visual: { kind: 'timeline', title: 'IV around a scheduled event (illustrative)', events: [{ when: '3 days before', what: 'IV builds up as traders buy protection', tone: 'gold' }, { when: 'Event day', what: 'IV at its peak; premiums are rich', tone: 'gold' }, { when: 'Right after', what: 'IV falls sharply (crush); premiums drop even with a flat spot', tone: 'bear' }, { when: 'Next days', what: 'IV settles near normal levels', tone: 'ice' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 11, rate: 6.5 }, why: 'Reprice the ATM call at IV 11% and compare with IV 14%.' },
    },
    {
      t: 9,
      def: `Vega risk management means tracking how much your total position will gain or lose if volatility changes, and keeping that number within what you can afford.`,
      hi: `Vega risk management ka matlab hai yeh track karna ki volatility badalne par aapki poori position kitna gain ya loss karegi, aur is number ko apni risk limit ke andar rakhna.`,
      how: `Add up vega for each leg, multiplied by lot size and signed by long or short, to get net vega in rupees per IV point. Reduce it by spreading: buying one option and selling another at a different strike or expiry cancels part of the vega. Avoid holding large short vega into scheduled events unless you accept a spike. Remember that vega changes as spot moves and time passes, so recheck positions, and that the IV of near and far expiries need not move together.`,
      eg: {
        title: 'Call spread net vega (illustrative)',
        text: `Buy one lot of the 24,000 CE (vega 13.22) and sell one lot of the 24,500 CE (vega 8.13), both 7 days left. Net vega per unit = 13.22 − 8.13 = 5.09, so for 65 units about ₹330.85 per IV point. A 4-point IV rise adds about 20.36 per unit (₹1,323.40). Compared with ₹3,439 for a naked 24,000 CE, the spread has much lower vega risk.`,
      },
      tip: `Know your net vega before an event, not after. If a 5-point IV move would hurt more than you can afford, reduce the position.`,
      visual: { kind: 'flow', title: 'Managing vega', steps: [{ label: 'Measure', note: 'Net vega in ₹ per IV point' }, { label: 'Stress', note: 'What if IV moves 3-5 points?' }, { label: 'Adjust', note: 'Spread, hedge or pick longer or shorter expiry' }, { label: 'Recheck', note: 'Vega changes with spot and time' }] },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: 'Read vega for each leg and combine them.' },
    },
  ],
  tools: [{ id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 30, iv: 14, rate: 6.5 } }],
}
export default m
