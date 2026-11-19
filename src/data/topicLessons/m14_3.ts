import type { ModuleLesson } from '../topicLessonTypes'

/* Module 14.3 — Buyer Psychology.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification), India VIX ≈ 14.
 * Option prices are rounded Black-Scholes-style values (IV 14%, r 6.5%) and are only examples; real premiums differ. */
const m: ModuleLesson = {
  moduleId: '14.3',
  intro: `Option buying is a small-money, fast-feedback activity, which makes it a perfect playground for emotion. The same few behaviours (chasing, hoping, panicking, revenge-trading, gambling on expiry day) show up again and again in how retail buyers lose. This module names each behaviour, shows the arithmetic of what it costs, and gives a simple rule to counter it.`,
  introHi: `Option buying mein paisa chhota lagta hai aur result jaldi aata hai, isliye yahan emotions sabse zyada kaam karte hain. Chasing, hope, panic, revenge trading aur expiry-day jua, yeh behaviours baar baar retail buyers ke losses ke peeche dikhte hain. Is module mein har behaviour ka naam, uski arithmetic cost aur usse rokne ka ek simple rule samjhaya gaya hai.`,
  steps: {
    concept: `Buyer psychology is the study of how fear, greed, hope and impatience change decisions that a written plan would have made differently. Option buying magnifies these emotions: premiums move in percentages of 20 to 50 within minutes, the loss is capped but can be 100% of the premium, and every tick is visible on a live screen. A plan written before the trade is the main defence, because a mind under live P&L pressure rarely makes a better decision than the one made calmly.`,
    conceptHi: `Buyer psychology ka matlab hai ki dar, laalach, umeed aur jaldbaazi kaise aapke wo decisions badal dete hain jo ek likhe hue plan se alag hote. Option buying mein premium minutes mein 20 se 50 percent hil jata hai, loss capped hota hai par premium ka 100% ho sakta hai, aur har tick screen par dikhta hai, isliye emotions bade ho jaate hain. Trade se pehle likha hua plan sabse bada bachav hai, kyunki live P&L ke pressure mein dimaag shaayad hi calm decision se behtar decision leta hai.`,
    mechanism: `Three things combine. First, small lot cost (a lot of a far-out weekly option can cost a few hundred rupees) removes the natural brake that a large outlay creates. Second, the result arrives within hours, so the lesson of each decision is noisy: a bad trade can win and a good trade can lose. Third, theta works against the buyer every hour, which creates time pressure and pushes people to act. Plans, fixed risk per trade and a written stop are tools that put a gap between emotion and click.`,
    example: {
      title: 'One morning, four emotions (illustrative)',
      text: `Capital ₹2,00,000. NIFTY jumps from 24,000 to 24,200 by 10:15. The trader feels FOMO and buys 3 lots of the 24,250 CE at ₹105, which costs 105 × 195 = ₹20,475. The market stalls and the option falls to ₹70, so he is down 35 × 195 = ₹6,825 (3.4% of capital). He holds, hoping, and it falls to ₹45, a loss of 60 × 195 = ₹11,700 (5.9%). Angry, he buys 5 lots of a put to recover, and so on. The first decision, not the last, did the damage: the plan allowed 1% (₹2,000) risk per trade, and he had no stop.`,
    },
    chart: {
      kind: 'flow',
      title: 'The emotional loop of a losing session',
      caption: 'Each step makes the next one more likely. A written stop and a daily loss limit cut the loop open.',
      steps: [
        { label: 'Sharp move', note: 'Price runs without you', tone: 'gold' },
        { label: 'FOMO entry', note: 'Late, large, no stop', tone: 'gold' },
        { label: 'Loss', note: 'Option falls, hope starts', tone: 'bear' },
        { label: 'Revenge trade', note: 'Bigger size to recover', tone: 'bear' },
        { label: 'Bigger loss', note: 'Discipline gone for the day', tone: 'bear' },
      ],
    },
    optionChain: `The option chain shows the footprints of a crowd's emotions in aggregate: sudden volume in far OTM strikes on expiry day, premiums inflating after a sharp move, and wide bid-ask spreads in illiquid strikes. It does not show your psychology or anyone else's intent, and OI alone cannot show who initiated a trade. Use the chain to check the price you are paying: an option whose premium has already doubled is a worse deal than the one you wanted to buy an hour ago.`,
    psychology: `The buyer's brain is pulled by loss aversion (a loss hurts more than an equal gain pleases), the disposition effect (selling winners early and holding losers), the sunk-cost fallacy (I have already lost so much that I must stay) and the lottery appeal of a small price with a big possible multiple. SEBI's studies of individual F&O traders have repeatedly found that a large majority lose money; behaviour, costs and lack of a plan are part of the reason. The cure is mechanical: risk a fixed percentage, set the exit first, and stop after a fixed daily loss.`,
    scenarios: {
      bullish: `A strong rally breeds FOMO and late call buying. If the rally continues, late buyers may profit but at poorer reward-to-risk; if it pauses, they hold the maximum decay with the highest premium. Disciplined buyers plan the entry at a pullback or skip the trade.`,
      bearish: `A sharp fall triggers panic put buying at inflated IV. A bounce can reverse the trade quickly and the high premium falls faster than delta suggests. Those holding losing calls tend to hope for a recovery rather than exit.`,
      sideways: `Range days punish overtrading: each entry costs spread and charges, and many small losses accumulate. On an expiry day, far OTM options lose their value hour by hour and the gambling-type buyer loses the whole small premium repeatedly.`,
    },
    practice: [
      {
        q: `Entry setup: buy at 24,000-level breakout, stop 24,000 − 50 = 23,950, target 24,150. A late entry is taken at 24,120 with the same stop and target (index terms). Compare the reward-to-risk ratios.`,
        a: `Planned entry: risk 50, reward 150, ratio 150/50 = 3.0. Late entry: risk 24,120 − 23,950 = 170, reward 24,150 − 24,120 = 30, ratio 30/170 = 0.18. The same idea became a bad trade because of timing.`,
      },
      {
        q: `A trader's capital is ₹2,00,000 and the rule is 1% risk per trade. He buys at ₹100 with a stop at ₹75. How many lots (65) fit the rule?`,
        a: `Risk allowed = ₹2,000. Loss per lot = 25 × 65 = ₹1,625. Lots = 2,000 / 1,625 = 1.23, so 1 lot. Taking 3 lots would risk 3 × 1,625 = ₹4,875 = 2.4% of capital.`,
      },
      {
        q: `An option bought at ₹100 falls to ₹40. What percentage loss is that, and what gain is needed to get back to ₹100?`,
        a: `Loss = 60/100 = 60%. Recovery = 60/40 = 150%. This is why holding a losing option and hoping is far more expensive than exiting at a small planned loss.`,
      },
      {
        q: `Spot 24,000, India VIX 14. How many points is a one-day one-standard-deviation move, and how many such moves is a 24,400 strike?`,
        a: `1σ for one calendar day = 24,000 × 0.14 × √(1/365) ≈ 24,000 × 0.14 × 0.0523 ≈ 176 points. 400 / 176 ≈ 2.3 standard deviations, a rare move for one day, so a 24,400 call priced at a few rupees is cheap for a reason.`,
      },
    ],
    assignment: `For one week, keep a trade journal with four columns: reason for entry, planned stop, planned target and your emotion before clicking (calm, FOMO, anger, boredom). At the end of the week count the trades in each emotion and compare their average result. Write one rule that would have removed your worst emotion-led trade.`,
  },
  topics: [
    {
      t: 1,
      def: `Fear of missing out (FOMO) is the urge to enter a trade because the price is already moving and you do not want to be left behind. It replaces analysis with anxiety. In options it usually means buying after the move has happened, when the premium has become expensive.`,
      hi: `FOMO matlab fear of missing out, yaani price chal raha hai aur aapko lagta hai ki aap peeche reh jaoge. Isme analysis ki jagah anxiety trade karwati hai. Options mein iska matlab aksar yeh hota hai ki move ho chuka hai aur aap mehenge premium par entry le lete ho.`,
      how: `When NIFTY rallies quickly, call premiums rise through delta and often through higher IV as well, and the screen shows green option prices and social-media chatter. A trader without a plan enters late because the move seems certain to continue. The entry then has two disadvantages: a higher premium and a stop that must be wide or non-existent because the nearby support is far below. If the move merely pauses, theta eats the premium.`,
      eg: {
        title: 'Chasing a 200-point rally (illustrative)',
        text: `NIFTY goes from 24,000 to 24,200 in the first hour. The trader buys the 24,250 CE (3 days left) at about ₹105 (one lot costs 105 × 65 = ₹6,825). The breakeven at expiry is 24,355. If the market drifts sideways and the option falls to ₹70, he loses 35 × 65 = ₹2,275, which is 33% of the premium, even though NIFTY has not fallen.`,
      },
      tip: `If you did not have the trade on your watchlist before the move, you probably do not have a stop for it either. Skip it and wait for a pullback.`,
      visual: { kind: 'candles', title: 'Entry after the run', caption: 'The FOMO buyer enters near the top of the impulse, where the stop is far away.', pattern: 'breakout', level: { price: 24200, label: 'Late entry zone' } },
    },
    {
      t: 2,
      def: `Greed is the wish to extract more from a winning trade than the plan allowed. A buyer sees a profit and removes his target, hoping for a larger one. Greed shows up as moving targets, adding to a position near a top, and ignoring decay when the option is already deep in profit.`,
      hi: `Greed ka matlab hai jo plan mein target tha usse zyada nikalne ki ichha. Buyer profit dekhta hai, target hata deta hai aur aur zyada ki umeed karta hai. Yeh moving targets, top ke paas position badhane aur profit mein hone par bhi decay ko ignore karne ke roop mein dikhta hai.`,
      how: `An option is a wasting asset. Once a buyer is in profit, the premium contains more time value that can vanish and also a bigger gain that can be given back in a quick reversal. Because option prices are volatile, a profit of 90 points can become a loss within an hour. A greedy holder confuses a paper profit with a booked one. A pre-set rule such as booking half at 1R and trailing the rest prevents this.`,
      eg: {
        title: 'The round trip (illustrative)',
        text: `A trader buys at ₹60 with a target of ₹110. The option reaches ₹150, so the paper gain is 90 × 65 = ₹5,850. He cancels the target hoping for ₹200. The market reverses and the option closes at ₹30, a loss of 30 × 65 = ₹1,950. The give-back from the peak was 120 × 65 = ₹7,800, and the plan's ₹3,250 profit (50 × 65) was lost.`,
      },
      tip: `Decide the target before entering and never move it further away while the trade is open. If you want more, trail a stop instead.`,
      visual: { kind: 'curve', title: 'Equity of a trade that gives back its gains', caption: 'Peak to trough is where greed costs money, not entry to exit.', curve: 'drawdown' },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 60, expiryPrice: 24030, lotSize: 65, lots: 1 }, why: 'Shows the loss at ₹30 against the ₹5,850 paper profit that was available.' },
    },
    {
      t: 3,
      def: `Panic buying is rushing to buy options, usually puts, after a sudden fall, or calls after a sudden spike, because of fear that the move will continue. It happens at the point when premiums are most inflated because IV has jumped and the spread has widened.`,
      hi: `Panic buying matlab achanak girawat ya spike ke baad dar ke maare jaldi jaldi option khareedna, aam taur par puts. Yeh tab hota hai jab IV badh chuka hota hai aur premium sabse mehenge hote hain, aur spread bhi chauda hota hai.`,
      how: `After a sharp fall India VIX rises, market makers widen quotes and put premiums increase through delta and vega both. A panic buyer pays for both. If the market then bounces, delta works against him and vega also turns negative as IV falls, so the put can fall faster than the index move suggests. The buyer is paying the highest price for protection at the moment when protection is most expensive.`,
      eg: {
        title: 'A put bought into a spike (illustrative)',
        text: `NIFTY drops about 150 points in 30 minutes and VIX rises from 14 to 18. The ATM put (3 days left) goes from about ₹116 to about ₹230 (illustrative). A trader buys at ₹230 (cost 230 × 65 = ₹14,950). NIFTY recovers 100 points and VIX eases to 16. The put falls to about ₹160, a loss of 70 × 65 = ₹4,550 even though the index is still below the opening level.`,
      },
      tip: `If you are buying because you are scared and not because a setup triggered, look at VIX first. A high IV makes the buyer's job harder.`,
      visual: { kind: 'gauge', title: 'India VIX after a shock (illustrative)', caption: 'High VIX means options are pricier; panic buyers pay it.', min: 8, max: 30, value: 18, zones: [{ from: 8, to: 13, label: 'Calm', tone: 'ice' }, { from: 13, to: 18, label: 'Normal', tone: 'gold' }, { from: 18, to: 30, label: 'Stress', tone: 'bear' }] },
    },
    {
      t: 4,
      def: `A late entry is a trade taken when most of the expected move has already happened. The direction may be right but the reward left is small compared with the risk to a sensible stop. Late entries are common with breakouts and news events.`,
      hi: `Late entry woh trade hai jo tab liya jaata hai jab expected move ka bada hissa ho chuka hota hai. Direction sahi ho sakti hai, lekin bacha hua reward, stop tak ke risk ke muqable chhota hota hai. Breakouts aur news events mein late entries bahut common hain.`,
      how: `A trade has a reward-to-risk ratio that depends on distance to the stop and distance to the target. When the entry moves toward the target the reward shrinks and the risk grows, unless the stop is moved closer, which then makes a stop-out likely on a small pullback. There is also a premium effect: option delta is higher after the move but the premium is higher, and any consolidation lets theta take its share. A planned entry waits for a pullback or a retest of the breakout level.`,
      eg: {
        title: 'Same setup, two entries (illustrative)',
        text: `The setup is a breakout above 24,000 with stop 23,950 and target 24,150. Entry at 24,000 gives risk 50, reward 150, ratio 3.0. Entry at 24,120 (after the breakout) gives risk 170, reward 30, ratio 0.18. To make that second trade worth taking at a 1:2 ratio the target would need to be at 24,120 + 340 = 24,460.`,
      },
      tip: `Compute reward-to-risk at your actual entry, not at the entry you wish you had. If it is below 1.5, pass.`,
      calc: { id: 'risk-reward', preset: { winRate: 40, avgWin: 30, avgLoss: 170 }, why: 'Shows the poor expectancy of the 24,120 late entry (in index points).' },
    },
    {
      t: 5,
      def: `Overtrading means taking more trades than the plan has setups for. It usually comes from boredom, the wish to be in action, or a need to win back losses. More trades mean more costs and more chances for emotional mistakes.`,
      hi: `Overtrading matlab plan mein jitne setups hain usse zyada trades lena. Yeh aksar boredom, action mein rehne ki ichha ya loss wapas jeetne ke chakkar mein hota hai. Zyada trades ka matlab zyada cost aur emotional galtiyon ke zyada mauke.`,
      how: `Every round trip pays brokerage, STT on the sell side of options, exchange and SEBI charges, GST and stamp duty on the buy side, plus the bid-ask spread and slippage. On small option premiums these costs form a large share of an average trade. A trader who takes 10 trades for a plan with 2 good setups adds 8 trades with a worse edge and the same cost. Check the current rate card of your broker and the exchange; do not assume the numbers.`,
      eg: {
        title: 'Twelve trades a day (illustrative)',
        text: `Suppose the all-in cost of one round trip on a one-lot option, including brokerage, statutory charges and spread, is about ₹150 (illustrative). Twelve trades cost 12 × 150 = ₹1,800 a day, or ₹36,000 over 20 trading days. A strategy that makes an average of ₹100 per trade before costs loses money after them.`,
      },
      tip: `Set a maximum number of trades per day (for example three) and stop when you hit it, win or lose.`,
      visual: { kind: 'bars', title: 'Cost of extra trades per month (₹, illustrative)', caption: 'At ₹150 per round trip and 20 days.', unit: '₹', items: [{ label: '2 trades/day', value: 6000, tone: 'neutral' }, { label: '5 trades/day', value: 15000, tone: 'gold' }, { label: '12 trades/day', value: 36000, tone: 'bear' }] },
      calc: { id: 'charges', preset: { premium: 100, lotSize: 65, lots: 1, side: 'buy', brokerage: 20 }, why: 'Check the real charge on a ₹100 premium one-lot trade against the ₹150 illustration.' },
    },
    {
      t: 6,
      def: `Revenge trading is entering a new trade, often larger and less planned, mainly to win back money lost in the previous one. The market is treated like an opponent. The trader's aim changes from good decisions to getting even.`,
      hi: `Revenge trading matlab pichhle loss ko wapas jeetne ke liye naya trade lena, aksar bada size aur bina plan ke. Market ko dushman samajh liya jaata hai. Maqsad achha decision lena nahi, balki badla lena ho jaata hai.`,
      how: `After a loss the stress response raises risk taking. The trader doubles the lot size, switches direction suddenly or buys a cheaper far-OTM option for a big multiple. Each of these breaks the risk rule. Because the premium is capped at zero but position size is not, size escalation is what turns a bad day into a damaging one. Brokers' risk systems and your own daily loss limit are the only effective brakes.`,
      eg: {
        title: 'Size doubling after a loss (illustrative)',
        text: `Capital ₹2,00,000, risk rule 1% = ₹2,000. A trade loses ₹1,950 (one lot, ₹30 loss). The trader then buys 3 lots with the same ₹30 risk: 30 × 195 = ₹5,850, which is 2.9% of capital. If it loses, the day's loss is 1,950 + 5,850 = ₹7,800, nearly 4% of capital.`,
      },
      tip: `After a stop-out, close the terminal for 30 minutes. Write the next trade down on paper before you are allowed to place it.`,
      calc: { id: 'position-size', preset: { capital: 200000, riskPct: 1, entry: 100, stop: 70, lotSize: 65 }, why: 'Shows that the plan allowed 1 lot, not the 3 lots taken in revenge.' },
    },
    {
      t: 7,
      def: `Holding a losing option means refusing to exit when the trade has failed, hoping the market will turn back. The loss is only on paper, so the trader feels it is not real, while the option continues to decay.`,
      hi: `Losing option hold karna matlab trade fail ho gaya hai phir bhi exit nahi karna, is umeed mein ki market wapas palat jayega. Loss sirf paper par hai toh asli nahi lagta, jabki option ka decay chalta rehta hai.`,
      how: `The buyer faces two losses at once: the market moves against him, and each day takes time value from the option. The percentage recovery needed grows faster than the percentage loss: a 50% loss needs a 100% gain, and 75% needs 300%. For an option near expiry, even a favourable move may not restore the premium. The usual defence is a stop in terms of the premium (for example 25–30%) or a time stop (exit if the move has not come by a fixed time).`,
      eg: {
        title: 'Recovery arithmetic (illustrative)',
        text: `Bought at ₹100 (₹6,500 per lot). The option falls to ₹40, a loss of 60 × 65 = ₹3,900 or 60%. To get back to ₹100 it must rise by 150%. A planned stop at ₹75 would have limited the loss to 25 × 65 = ₹1,625.`,
      },
      tip: `A loss you hold is not smaller than a loss you take; it is only a loss you have not yet admitted.`,
      visual: { kind: 'bars', title: 'Gain needed to recover a loss (%)', caption: 'Recovery needs grow faster than the loss.', unit: '%', items: [{ label: '20% loss', value: 25, tone: 'gold' }, { label: '40% loss', value: 67, tone: 'gold' }, { label: '60% loss', value: 150, tone: 'bear' }, { label: '80% loss', value: 400, tone: 'bear' }] },
      calc: { id: 'drawdown-recovery', preset: { drawdownPct: 60 }, why: 'Gives the 150% gain needed after a 60% premium loss.' },
    },
    {
      t: 8,
      def: `Early profit booking is closing a winner too soon, at a small gain, while the same trader holds losers much longer. It feels safe but damages the long-run balance between average win and average loss.`,
      hi: `Early profit booking matlab winner ko bahut jaldi chhote profit par band kar dena, jabki loser ko bahut der tak hold karna. Yeh safe lagta hai lekin average win aur average loss ka balance bigaad deta hai.`,
      how: `Behavioural finance calls it the disposition effect: people sell winners to lock in the pleasure of a gain and hold losers to avoid the pain of a loss. In options, the result is a high win rate with small wins and a few large losses. For the account to grow, the win rate must exceed average loss divided by the sum of average win and average loss. With 16-point wins and 40-point losses the required win rate is 40 / 56 = 71%.`,
      eg: {
        title: 'The 60% win rate that loses (illustrative)',
        text: `A trader buys at ₹80 and sells at ₹96 for a win of 16 × 65 = ₹1,040. Losers are held to an average of ₹40 loss = ₹2,600. With a 60% win rate, expectancy per trade = 0.6 × 1,040 − 0.4 × 2,600 = 624 − 1,040 = −₹416. The option he sold at ₹96 later went to ₹200, a gain of 120 × 65 = ₹7,800 he did not capture.`,
      },
      tip: `Do not choose between booking early and holding forever: take part profit at a fixed multiple of risk and trail the rest.`,
      calc: { id: 'risk-reward', preset: { winRate: 60, avgWin: 1040, avgLoss: 2600 }, why: 'Shows the negative expectancy of small wins with large losses.' },
    },
    {
      t: 9,
      def: `Stop-loss avoidance means entering without an exit level, or moving or removing the stop once the trade goes wrong. It leaves the loss size to be decided in the middle of stress.`,
      hi: `Stop-loss avoidance matlab bina exit level ke trade lena, ya trade galat jaane par stop ko hata dena ya door kar dena. Isse loss kitna hoga yeh decision stress ke beech mein hota hai.`,
      how: `An option buyer's maximum loss is the premium, so many believe a stop is unnecessary. But losing 100% of a premium on repeated trades is a huge drain, and a normal stop reduces the average loss to about 25–30% of premium. Stops can be on the option price, on the underlying level, or on time. Option stops can slip when spreads are wide, so use liquid strikes and avoid placing stops in the opening minutes when spreads are widest.`,
      eg: {
        title: 'Stop or no stop (illustrative)',
        text: `Buy at ₹100, stop at ₹75: the loss is 25 × 65 = ₹1,625. Without a stop the option decays to zero: ₹6,500, four times larger. Over ten losing trades the difference is ₹16,250 against ₹65,000.`,
      },
      tip: `Write the stop in the order ticket before you press buy. If you cannot name it, you do not have a trade.`,
      visual: { kind: 'compare', title: 'With and without a stop (one lot, illustrative)', caption: 'Same entry at ₹100, same wrong view.', left: { head: 'Stop at ₹75', tone: 'ice', points: ['Loss = ₹1,625', 'Capital preserved for next setup', 'Decision made calmly'] }, right: { head: 'No stop', tone: 'bear', points: ['Loss can reach ₹6,500', 'Hope replaces analysis', 'Decision made under stress'] } },
      calc: { id: 'position-size', preset: { capital: 200000, riskPct: 1, entry: 100, stop: 75, lotSize: 65 }, why: 'Turns a 25-point stop into the number of lots that fits a 1% risk rule.' },
    },
    {
      t: 10,
      def: `Expiry-day gambling behaviour is buying very cheap, far out-of-the-money options on expiry day hoping for a big multiple. The outlay is small, but the chance of success is also small, and repeated attempts drain capital.`,
      hi: `Expiry-day gambling matlab expiry ke din bahut sasti, door ke out-of-the-money options khareedna is umeed mein ki bada multiple milega. Paisa kam lagta hai, lekin jeetne ki chance bhi kam hoti hai, aur baar baar try karne se capital khatam hota hai.`,
      how: `NSE's index weekly contracts expire on Tuesdays as per current schedule (verify the expiry calendar). In the last hours, time value collapses; a far OTM option will become worthless unless the index makes an unusually large move. When rare moves happen, the winners are visible and remembered, while thousands of small losses are not. Remember that the 2.3σ-type move needed in a day has a low probability, and rupee-cheap options are cheap because the market prices that probability.`,
      eg: {
        title: 'The ₹2 option (illustrative)',
        text: `Expiry morning, NIFTY 24,000. A 24,400 CE trades at about ₹2, so one lot costs 2 × 65 = ₹130. It needs NIFTY above 24,402 at expiry, 402 points or 1.7% up. A one-day 1σ move at VIX 14 is about 176 points, so this needs about 2.3σ. If he buys it on 20 expiries, the cost is 20 × 130 = ₹2,600; he needs one win of more than ₹2,600 / 65 = 40 points of intrinsic value to break even, which needs NIFTY above 24,440 in one of those twenty.`,
      },
      tip: `Cheap is not the same as value. Ask: what move do I need, and how often does the market make it?`,
      visual: { kind: 'bars', title: 'Premium of 24,400 CE with time left (₹, illustrative)', caption: 'Decay is steepest in the last hours.', unit: '₹', items: [{ label: '3 days', value: 15, tone: 'gold' }, { label: '1 day', value: 0.8, tone: 'neutral' }, { label: 'Last hours', value: 0.1, tone: 'bear' }] },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: 'Gives the ~176 point one-day 1σ move to compare against the 400 points needed.' },
    },
  ],
}
export default m
