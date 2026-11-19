import type { ModuleLesson } from '../topicLessonTypes'

/* Module 15.1 — Fresh Position Identification.
 * All OI, volume and premium figures are constructed for teaching (illustrative). NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification).
 * ATM values come from Black-Scholes (IV 14%, r 6.5%, 2 days to expiry). OI units differ by platform (contracts or quantity): check yours. */
const m: ModuleLesson = {
  moduleId: '15.1',
  intro: `Option-chain analysis becomes useful when you stop reading a single snapshot and start reading change. This module teaches how to spot where new positions are being created, using the change in open interest (OI), the direction of the premium and the volume. Every conclusion here is a probability, because OI alone cannot show who initiated a trade.`,
  introHi: `Option chain tab kaam ki hoti hai jab aap ek snapshot ki jagah badlav ko padhna seekhte ho. Is module mein OI ka change, premium ki direction aur volume dekhkar yeh pehchanna sikhaya gaya hai ki naye positions kahan ban rahe hain. Har conclusion ek probability hai, kyunki sirf OI se yeh nahi pata chalta ki trade kisne initiate kiya.`,
  steps: {
    concept: `A fresh position is a new contract created in the market: one trader opens a long and another opens a short, and open interest rises by one. Fresh positions are the market's new commitments, so they say more about current views than old OI built over weeks. The skill is to guess, from OI change plus premium change plus volume, whether the new activity looks like writing or buying, and then to treat that guess with caution.`,
    conceptHi: `Fresh position matlab market mein ek naya contract bana: ek trader ne long kiya, doosre ne short, aur OI ek se badh gaya. Fresh positions market ki naye commitments hain, isliye hafton purane OI se zyada current views dikhate hain. Kaam yeh hai ki OI change, premium change aur volume se andaza lagao ki yeh writing jaisa lagta hai ya buying jaisa, aur us andaze ko savdhani se lo.`,
    mechanism: `Open interest counts contracts that are still open, and NSE's clearing corporation (NSCCL) records it end of day and through the day. For a new contract, one side is always a buyer and the other a seller, so OI rise cannot name an initiator. The premium gives a hint: if the OI rises while the premium falls, sellers were probably more aggressive; if the OI rises while the premium rises, buyers were probably more aggressive. This is a heuristic, not a fact. Volume tells you how much trading took place, and a small OI change with huge volume suggests churn: the same traders opening and closing within the day.`,
    example: {
      title: 'Reading one strike (illustrative)',
      text: `The 24,200 CE shows OI 10.0 lakh in the morning and 12.5 lakh at noon, a rise of 2.5 lakh (25%). The CE premium has fallen from ₹62 to ₹51 while NIFTY is flat near 24,050. OI up with premium down is consistent with fresh call writing. Volume for the strike is 30 lakh, 2.4 times the OI of 12.5 lakh, so there was a lot of intraday churn too. A reasonable note: possible writing at 24,200, confidence medium, confirm with the next snapshot.`,
    },
    chart: {
      kind: 'matrix',
      title: 'Reading OI change with premium change',
      caption: 'A heuristic for a single strike. Other explanations (hedges, spreads, market-maker positions) always exist.',
      xLabels: ['Premium falls', 'Premium rises'],
      yLabels: ['OI rises', 'OI falls'],
      cells: [
        { head: 'Fresh writing likely', note: 'New contracts, sellers aggressive', tone: 'gold' },
        { head: 'Fresh buying likely', note: 'New contracts, buyers aggressive', tone: 'ice' },
        { head: 'Long exit or writer covering', note: 'Contracts closing; premium falls with buyers leaving', tone: 'neutral' },
        { head: 'Short covering likely', note: 'Writers closing; premium rises', tone: 'neutral' },
      ],
    },
    optionChain: `On the chain, read the Change in OI column together with LTP change and Volume for the same strike and compare two time-stamped snapshots, not one. Look first at the ATM and the two or three strikes on each side, then at the strikes where OI is largest. The chain does not label contracts as buyer-initiated or seller-initiated; any such label is your inference, and spreads or hedges can make a single strike misleading.`,
    psychology: `Writers (sellers) often expect a level to hold and collect time decay; buyers expect a move and accept the decay. Institutions may hold the other side as hedgers or market makers, so a rising OI strike is not a message that someone is betting on a level. The common retail error is turning a rise in OI into a prediction with certainty. Treat it as one piece of evidence.`,
    scenarios: {
      bullish: `NIFTY rises and fresh PE writing appears at lower strikes (OI up, put premium down). That can mean sellers are comfortable with the market staying above those strikes. It is also consistent with hedging by call buyers. If price falls through the strike and OI there starts unwinding, the idea is invalid.`,
      bearish: `NIFTY falls and fresh CE writing appears above (OI up, call premium falls). Sellers may expect a cap. A fast reversal through that strike with OI falling suggests short covering, which can add to the move.`,
      sideways: `Both sides add OI near the ATM with premiums falling and volume steady. This is consistent with writers of both calls and puts earning decay, but a sudden shock (news, VIX jump) can hurt them quickly. Do not conclude that writers always win.`,
    },
    practice: [
      {
        q: `The 24,300 CE OI changes from 8.0 lakh to 9.6 lakh while LTP falls from ₹30 to ₹24. Compute the OI change in percent and the premium change in percent, and say what the heuristic suggests.`,
        a: `OI change = 1.6 / 8.0 = 20%. Premium change = −6 / 30 = −20%. OI up with premium down suggests fresh call writing, but it is only a likely reading and needs confirmation.`,
      },
      {
        q: `A strike has OI change +0.3 lakh and volume 24 lakh with OI of 6 lakh. What is the volume to OI ratio and what does it hint at?`,
        a: `24 / 6 = 4.0. Most of the volume closed within the day (intraday churn); only 0.3 lakh of net new contracts remain. It is not strong evidence of a fresh positioning.`,
      },
      {
        q: `PE 23,900: OI 8.0 lakh → 10.4 lakh. LTP 55 → 44 while NIFTY rises 60 points. Compute the OI and premium change in percent. What does the pattern look like?`,
        a: `OI change = 2.4 / 8.0 = +30%. Premium change = −11 / 55 = −20%. Premium fell because NIFTY rose (delta effect), so the OI rise looks like fresh put writing or put-selling into a rally. Another reading is hedging by someone who is long the index.`,
      },
    ],
    assignment: `Open a live NIFTY chain on a weekday. Note the change in OI, LTP and volume for the ATM and the three strikes above and below at 9:30 and 11:30. In a table write the likely reading (fresh writing, fresh buying, unclear) and your confidence. At the close, check whether the readings that were wrong share a reason.`,
  },
  topics: [
    {
      t: 1,
      def: `Fresh CE writing means new call contracts are being sold, so the number of open call contracts at a strike rises while sellers dominate. The sellers (writers) collect premium and take on the risk of a rise above the strike. OI up and call premium down is the usual clue.`,
      hi: `Fresh CE writing matlab naye call contracts bech rahe hain, yaani us strike par call OI badh raha hai aur sellers zyada active hain. Writer premium lete hain aur strike ke upar jaane ka risk lete hain. OI upar aur call premium neeche, yeh usual clue hai.`,
      how: `When writers sell calls, they add new contracts and the call's price tends to fall or lag the index. The writer is paid the premium and loses if the index rises well above strike plus premium. Margin (SPAN plus exposure) is blocked by the clearing corporation for every short position, so serious writing has a funding cost. Writing at a strike may reflect a view of a ceiling, but hedgers, spread traders and market makers can also be on the writing side. The signal is stronger when it repeats on neighbouring strikes and on the next snapshot.`,
      eg: {
        title: '24,200 CE writing (illustrative)',
        text: `At 11:00, 24,200 CE OI is 10.0 lakh and LTP ₹62. At 12:00 OI is 12.5 lakh and LTP ₹51 while NIFTY is steady at 24,050. OI +25% with LTP −18% (11/62 = 17.7%). Fresh writing is a fair first read. If NIFTY rises to 24,200 and OI falls, the writers are covering and the read must be updated.`,
      },
      tip: `OI up with premium down suggests writing, but the same contract also has a buyer, so call it a probable reading, not a fact.`,
      visual: {
        kind: 'flow',
        title: 'How fresh CE writing shows up',
        steps: [
          { label: 'Writers sell calls', note: 'New contracts opened', tone: 'gold' },
          { label: 'OI rises', note: 'Change in OI is positive', tone: 'ice' },
          { label: 'Premium falls or lags', note: 'Sellers aggressive', tone: 'bear' },
          { label: 'Check next snapshot', note: 'Does it persist?', tone: 'neutral' },
        ],
      },
      calc: { id: 'oi-buildup', preset: { priceChangePct: -18, oiChangePct: 25 }, why: 'Classifies price and OI change (a futures rule shown for the heuristic only).' },
    },
    {
      t: 2,
      def: `Fresh PE writing means new put contracts are being sold. The writer collects premium and takes the risk of a fall below the strike. OI up and put premium down is the usual clue, and it often appears in a rising or steady market.`,
      hi: `Fresh PE writing matlab naye put contracts bech rahe hain. Writer premium leta hai aur strike ke neeche girne ka risk leta hai. OI upar aur put premium neeche, yeh usual clue hai, aur yeh aksar badhte ya steady market mein dikhta hai.`,
      how: `Put writers are paid to take on downside risk. When NIFTY is rising, put premiums fall by delta and by time decay, so a premium fall alone proves little; the OI rise is the more important clue. Put writing at a strike can mean the writer believes the index will stay above it, or it can be part of a spread or a covered structure. Large put OI is a possible zone of interest, not a guaranteed floor. If the index falls below the strike, put writers may buy back or hedge, which can add to the move.`,
      eg: {
        title: '23,900 PE writing (illustrative)',
        text: `NIFTY rises from 24,000 to 24,060. The 23,900 PE OI goes from 8.0 lakh to 10.4 lakh (+30%) and LTP from ₹55 to ₹44 (−20%). The premium drop is partly delta and decay, but the OI growth indicates new contracts. A fair read is fresh put writing at 23,900, perhaps with a floor expectation near there. If NIFTY drops to 23,950 and OI starts falling, the writers may be covering.`,
      },
      tip: `In a rising market put premiums fall anyway, so lean on the OI change and a second snapshot, not on the premium alone.`,
      visual: {
        kind: 'oi',
        title: 'Put OI building below the market (illustrative lakh contracts)',
        spot: 24060,
        rows: [
          { strike: 23800, ce: 3, pe: 9 },
          { strike: 23900, ce: 3.5, pe: 10.4 },
          { strike: 24000, ce: 9, pe: 11 },
          { strike: 24100, ce: 11, pe: 5 },
          { strike: 24200, ce: 12.5, pe: 2.5 },
        ],
      },
    },
    {
      t: 3,
      def: `Fresh CE buying means new call contracts are being bought. Open interest rises and the call premium rises faster than a delta-only move would suggest. Buyers pay premium for the chance of an upward move.`,
      hi: `Fresh CE buying matlab naye call contracts kharide ja rahe hain. OI badhta hai aur call premium sirf delta se jitna badhna chahiye usse zyada badhta hai. Buyers upar ke move ke chance ke liye premium dete hain.`,
      how: `Call buyers add demand, so the premium can rise together with OI, and IV at that strike may tick up. Buying is more common in OTM strikes, where one lot costs a few thousand rupees. However, a rising premium and rising OI can also arise from writers covering one strike and rolling to another, from hedgers, or from market makers adjusting. Volume is the guard: a rise on tiny volume is weaker evidence. Also compare with the index: a call premium rising while the index is flat shows an IV rise.`,
      eg: {
        title: '24,300 CE buying (illustrative)',
        text: `NIFTY rises 80 points in an hour. The 24,300 CE OI goes from 12 lakh to 13.8 lakh (+15%) and LTP from ₹40 to ₹58 (+45%). Volume is 22 lakh. The rising OI with a premium that rose faster than the move alone might explain suggests fresh buying. If the index then falls back and the premium collapses, the buyers may be shaken out and OI will fall.`,
      },
      tip: `Check the IV of the strike: a premium rise with no index move means IV rose, not that the market was about to rally.`,
      visual: {
        kind: 'compare',
        title: 'Writing vs buying footprints at a call strike',
        left: { head: 'Fresh writing', tone: 'gold', points: ['OI up', 'Premium falls or lags', 'IV flat or falling', 'Often near key ceilings'] },
        right: { head: 'Fresh buying', tone: 'ice', points: ['OI up', 'Premium rises faster than delta', 'IV may tick up', 'Often in OTM strikes'] },
      },
    },
    {
      t: 4,
      def: `Fresh PE buying means new put contracts are being bought. It can be a directional bet on a fall or a hedge by someone who owns shares or futures. The OI rises along with the put premium.`,
      hi: `Fresh PE buying matlab naye put contracts kharide ja rahe hain. Yeh girne par bet ho sakti hai ya un logon ka hedge jo shares ya futures hold karte hain. OI aur put premium dono badhte hain.`,
      how: `Put buying has two common sources: speculators expecting a fall and investors insuring a portfolio. Both raise OI and premium. Because a hedge is not a bearish view, a rise in put OI does not by itself say the market will fall. In a falling market, put premiums rise by delta and by a higher IV (the VIX usually rises in a fall). Cross-check with the futures and with the call side: if call OI is also rising at the same time, the picture is mixed.`,
      eg: {
        title: '23,900 PE buying in a fall (illustrative)',
        text: `NIFTY falls from 24,000 to 23,920. The 23,900 PE OI goes from 15 lakh to 17.4 lakh (+16%) and LTP from ₹60 to ₹96 (+60%). IV also rises. This looks like fresh buying, either speculative or hedging. It does not say the fall will continue; a bounce would reduce both the premium and the buyers' enthusiasm.`,
      },
      tip: `Put buying can be insurance, not a bet. Do not turn every rise in put OI into a bearish prediction.`,
      visual: {
        kind: 'matrix',
        title: 'Why put OI rises',
        xLabels: ['Directional', 'Protective'],
        yLabels: ['Buyers add puts', 'Writers add puts'],
        cells: [
          { head: 'Bearish bet', note: 'Speculator expects a fall', tone: 'bear' },
          { head: 'Portfolio hedge', note: 'Investor insures holdings', tone: 'ice' },
          { head: 'Floor expectation', note: 'Writer expects the level to hold', tone: 'gold' },
          { head: 'Spread leg', note: 'Short put paired with another leg', tone: 'neutral' },
        ],
      },
    },
    {
      t: 5,
      def: `Confirming a fresh position means checking the OI change against volume and the premium, and repeating it across time. Volume shows how much traded; OI change shows how much remained open. High volume with a small OI change means the trading was mostly in and out within the day.`,
      hi: `Fresh position confirm karna matlab OI change ko volume aur premium ke saath check karna, aur alag-alag time par dobara dekhna. Volume batata hai kitna trade hua, OI change batata hai kitna khula reh gaya. Zyada volume aur chhota OI change ka matlab hai ki trading zyada tar usi din mein in aur out ho gayi.`,
      how: `Compare change in OI with volume. If OI change is a large share of volume, much of the trading created lasting positions. If it is a tiny share, most of it was day trading. Check that the change persists in the next snapshots and appears on neighbouring strikes. Be careful with the end of the day: the final OI numbers are published after close, and live OI can lag or be revised. Do not mix a futures build-up rule (price up with OI up is long build-up) with option strike OI without care, because option OI at a strike has two sides.`,
      eg: {
        title: 'Two strikes with the same OI change (illustrative)',
        text: `Strike A: OI 12 lakh, change +2.5 lakh, volume 4 lakh. Change is 62.5% of volume (2.5 / 4), so most trades created lasting contracts. Strike B: OI 12 lakh, change +0.2 lakh, volume 30 lakh. Change is 0.7% of volume (0.2 / 30) and volume is 2.5 times OI, so churn dominates. Strike A gives a stronger positioning clue.`,
      },
      tip: `Use change in OI divided by volume as a quick filter: a low ratio means churn, not conviction.`,
      visual: {
        kind: 'bars',
        title: 'Net new contracts as a share of volume',
        caption: 'Illustrative: higher share means more lasting positions.',
        unit: '%',
        items: [
          { label: 'Strike A (+2.5L on 4L volume)', value: 62.5, tone: 'gold' },
          { label: 'Strike B (+0.2L on 30L volume)', value: 0.7, tone: 'neutral' },
        ],
      },
      calc: { id: 'pcr', preset: { putOI: 1740000, callOI: 1380000, putVol: 2200000, callVol: 1800000 }, why: 'Compares put and call OI and volume together.' },
    },
    {
      t: 6,
      def: `A position transfer is when OI falls at one strike and rises at another close by, which may mean the same writers or buyers moved their position. It may also be unrelated traders. The curriculum asks you to call it a possibility, never a certainty.`,
      hi: `Position transfer matlab ek strike par OI ghata aur paas ke doosre strike par badha, jisse lag sakta hai ki wahi log apni position shift kar rahe hain. Yeh alag-alag traders bhi ho sakte hain. Ise possibility kehna chahiye, certainty nahi.`,
      how: `Writers who are threatened by a rising index may close the short strike and sell a higher one (rolling up). Buyers may sell one strike and buy another. In the chain this appears as a fall in OI at the old strike and a similar rise at the new one, within the same period. NSE data does not identify accounts, so you cannot prove that the same trader did both. Possible rolls are more convincing when the sizes are similar and the timing is close.`,
      eg: {
        title: 'Rolling up from 24,200 CE to 24,300 CE (illustrative)',
        text: `Between 10:00 and 11:00 NIFTY moves from 24,100 to 24,190. The 24,200 CE OI falls from 14 lakh to 12 lakh (−2.0 lakh) while the 24,300 CE OI rises from 9 lakh to 11.1 lakh (+2.1 lakh). The sizes are close, which hints at a roll up by writers who feel pressured. It may also be coincidence. Look at whether the 24,200 CE premium rose (covering) and whether the 24,300 CE premium fell (writing).`,
      },
      tip: `A similar fall at one strike and rise at the next is a hint of a roll, not proof of one trader.`,
      visual: {
        kind: 'oi',
        title: 'Possible roll: OI falls at 24,200, rises at 24,300 (illustrative lakh)',
        spot: 24190,
        rows: [
          { strike: 24100, ce: 7, pe: 6 },
          { strike: 24200, ce: 12, pe: 4 },
          { strike: 24300, ce: 11.1, pe: 2 },
          { strike: 24400, ce: 8, pe: 1 },
        ],
      },
    },
    {
      t: 7,
      def: `Tracking multiple strikes means reading a band of strikes together instead of one. A single strike can be moved by one large trader or a spread; a band shows the shape of the new positioning.`,
      hi: `Multiple strikes track karna matlab ek strike ki jagah strikes ke poore band ko saath padhna. Ek strike ko ek bada trader ya spread hila sakta hai; band poori positioning ka shape dikhata hai.`,
      how: `Sum the change in OI across a band, for example five strikes above and below the ATM, for calls and puts separately. Compare the totals, and check where the largest additions are. The shape tells more than a single reading: additions clustered above spot hint at a resistance zone, additions clustered below hint at a support zone. A band also reduces the effect of a single spread trade that adds to two strikes at once.`,
      eg: {
        title: 'Summing a band (illustrative)',
        text: `Between 24,100 and 24,300 CE the OI changes are +1.0, +2.5, +1.5 lakh, a sum of +5.0 lakh. Between 23,700 and 23,900 PE the changes are +0.5, +0.8, +1.2 lakh, a sum of +2.5 lakh. Call additions are twice put additions in this window (5.0 / 2.5), so new writing above the market dominates. That says what is being added, not where NIFTY will go.`,
      },
      tip: `Always add up a band before drawing a conclusion from one big strike.`,
      visual: {
        kind: 'bars',
        title: 'Change in OI by strike band (illustrative lakh)',
        unit: 'L',
        items: [
          { label: 'CE 24,100', value: 1.0, tone: 'bear' },
          { label: 'CE 24,200', value: 2.5, tone: 'bear' },
          { label: 'CE 24,300', value: 1.5, tone: 'bear' },
          { label: 'PE 23,900', value: 1.2, tone: 'bull' },
          { label: 'PE 23,800', value: 0.8, tone: 'bull' },
          { label: 'PE 23,700', value: 0.5, tone: 'bull' },
        ],
      },
    },
    {
      t: 8,
      def: `ATM activity is the trading and OI change in the strikes closest to the index. These options carry the highest gamma and the most volume, and they set the price of the straddle, which is the market's quote for the coming move.`,
      hi: `ATM activity matlab index ke sabse paas wale strikes mein trading aur OI ka change. In options mein gamma aur volume sabse zyada hota hai, aur inse straddle ka price banta hai, jo aane wale move ka market ka quote hai.`,
      how: `ATM options have the highest liquidity and the tightest spread, but also the fastest decay. A rise in the ATM straddle price, the sum of ATM call and put premiums, tells you the market expects a larger move or IV is rising. Market makers hedge ATM positions often, so a lot of the ATM OI is not a directional view. As the index drifts, the ATM strike changes, so compare to the current ATM, not the one from the morning.`,
      eg: {
        title: 'Reading the ATM straddle (illustrative)',
        text: `With 2 days left and IV 14%, the 24,000 CE is about ₹103.5 and the 24,000 PE about ₹95.0. The straddle is 103.5 + 95.0 = ₹198.5, so the market implies about 199 points either way, with breakevens near 23,801 and 24,199. If IV rises to 16% the straddle price will increase; a change in the straddle with no index move shows IV is changing.`,
      },
      tip: `Watch the ATM straddle: its change shows how the market is pricing the coming move even when OI numbers are quiet.`,
      visual: {
        kind: 'payoff',
        title: 'ATM straddle bought at ₹198.5 (24,000 CE + 24,000 PE)',
        caption: 'Breakevens at 23,801.5 and 24,198.5.',
        spot: 24000,
        legs: [
          { type: 'CE', side: 1, strike: 24000, premium: 103.5 },
          { type: 'PE', side: 1, strike: 24000, premium: 95 },
        ],
      },
      calc: { id: 'straddle-move', preset: { spot: 24000, cePrice: 103.5, pePrice: 95, strike: 24000 }, why: 'Implied move and breakevens from the ATM straddle.' },
    },
  ],
}
export default m
