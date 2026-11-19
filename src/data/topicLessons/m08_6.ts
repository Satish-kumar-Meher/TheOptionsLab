import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '8.6',
  intro:
    `The Put-Call Ratio (PCR) compresses the Put side and Call side of the chain into a single number. It is popular because it is easy to compute and easy to compare across days, but it is also easy to misread. PCR describes positioning, not direction: the same value can be read as bullish or bearish depending on whether you think Puts are being written or bought. All numbers here are illustrative (Nifty about 24,000, rate 6.5%, lot 65 - check the current NSE contract specification).`,
  introHi:
    `Put-Call Ratio (PCR) chain ke Put side aur Call side ko ek hi number mein dikhata hai. Yeh isliye popular hai kyunki nikalna aasan hai aur din-ba-din compare karna bhi, lekin galat padhna bhi utna hi aasan hai. PCR positioning dikhata hai, direction nahi: wahi value bullish ya bearish padhi ja sakti hai, is par depend karta hai ki Puts likhe ja rahe hain ya kharide ja rahe hain. Saare numbers illustrative hain (Nifty lagbhag 24,000, rate 6.5%, lot 65 - current NSE contract specification check karein).`,
  steps: {
    concept:
      `PCR is Put activity divided by Call activity. A value above 1 means there are more Puts than Calls, and below 1 means more Calls than Puts. It can be built from open interest (positions outstanding), from volume (contracts traded today), for one strike or for all strikes and expiries. Because the number carries no information about who initiated the trades, it can only be a clue about crowd positioning. Treat it as one of several inputs and never as a stand-alone buy or sell signal.`,
    conceptHi:
      `PCR matlab Put activity ko Call activity se divide karna. 1 se upar ka matlab Puts zyada hain Calls se, aur 1 se neeche matlab Calls zyada. Ise open interest (outstanding positions), volume (aaj ke traded contracts), kisi ek strike ya saare strikes aur expiries ke liye banaya ja sakta hai. Number yeh nahi batata ki trade kisne initiate kiya, isliye yeh sirf crowd positioning ka ek clue hai. Ise ek input ki tarah dekhein, akele buy ya sell signal ki tarah nahi.`,
    mechanism:
      `Take the total Put figure and divide it by the total Call figure. OI PCR changes slowly because it counts open positions; volume PCR changes fast because it counts today's trading. A rise in PCR can come from Put writing (often read as bullish), Put buying for protection (often read as bearish or worried), or Call unwinding. The mix of expiries also matters: nearest-expiry PCR reacts to short-term traders, while all-expiry PCR is weighed down by long-dated hedges held by institutions.`,
    example: {
      title: 'PCR three ways on one illustrative chain',
      text: `Nearest weekly expiry: Put OI 232,000 lots, Call OI 313,000 lots, so OI PCR = 232 / 313 = 0.74. Today's volume: Puts 14,00,000 and Calls 15,00,000 units, so volume PCR = 1.4 / 1.5 = 0.93. Adding the monthly and later series (Put 1,150,000 and Call 1,000,000 lots) gives an overall OI PCR of (232,000 + 1,150,000) / (313,000 + 1,000,000) = 1.05. Same market, three different numbers; each answers a different question.`,
    },
    chart: {
      kind: 'gauge',
      title: 'A common PCR reading scale (a rule of thumb, not an official standard)',
      caption: 'Many traders treat below 0.7 as Call-heavy, 0.7-1.3 as balanced and above 1.3 as Put-heavy. Extremes are sometimes read as contrarian. Thresholds vary by trader and by index.',
      min: 0.4,
      max: 1.8,
      value: 0.74,
      zones: [
        { from: 0.4, to: 0.7, label: 'Call-heavy', tone: 'bear' },
        { from: 0.7, to: 1.3, label: 'Balanced', tone: 'neutral' },
        { from: 1.3, to: 1.8, label: 'Put-heavy', tone: 'bull' },
      ],
    },
    optionChain:
      `The NSE chain does not always show PCR directly, but it gives you the totals: add up the OI column for Calls and Puts, or read the totals row if your platform shows it. For strike-wise PCR divide each row's Put OI by its Call OI. Always note which expiry and which time of day you used, and compare like with like, for instance this morning's weekly PCR with yesterday's, not with the monthly number.`,
    psychology:
      `A rising PCR can mean confident Put writers or nervous hedgers; the number cannot tell you which. Traders who like a simple signal often pick the reading that fits their existing view. A good habit is to write your interpretation before you look at price, then check whether it was supported. Extreme readings attract contrarian stories, but crowds can stay extreme for a long time.`,
    scenarios: {
      bullish:
        `PCR rises steadily as Put writing builds below the market while the index rises; the writers appear to be confident. Rising PCR from Put buying during a falling market is a different story.`,
      bearish:
        `PCR falls as Call writing builds above the market and the index weakens; writers appear to be capping rallies. A fall in PCR from Put unwinding during a rally is not bearish by itself.`,
      sideways:
        `PCR hovers in the balanced zone and changes slowly. It then adds little information, and premium decay and OI levels are more useful.`,
    },
    practice: [
      {
        q: 'Put OI is 232,000 lots and Call OI is 313,000 lots. Find the OI PCR and say what the common scale suggests.',
        a: `PCR = 232,000 / 313,000 = 0.74. On the common scale this is at the lower edge of balanced (0.7-1.3), slightly Call-heavy. By itself it does not say the market will rise or fall.`,
      },
      {
        q: 'Put volume is 14,00,000 and Call volume 15,00,000. What is the volume PCR, and how is it different from OI PCR?',
        a: `Volume PCR = 14,00,000 / 15,00,000 = 0.93. OI PCR counts all open positions built over days; volume PCR counts only today's trading, so it can differ a lot and swing quickly.`,
      },
      {
        q: 'A hedger buys 20,000 lots of far OTM Puts, raising Put OI from 232,000 to 252,000 with Call OI unchanged at 313,000. What is the new PCR?',
        a: `New PCR = 252,000 / 313,000 = 0.805, up from 0.741. The number rose by 0.064 although nothing about Call positions changed, which shows why PCR can mislead when large hedges are involved.`,
      },
    ],
    assignment:
      `For five trading days, record at the same time each day the OI PCR and the volume PCR for the nearest NIFTY expiry, plus the index close. At the end write down on which days PCR agreed with the next day's direction and on which days it did not. Count the hits honestly; do not trade on the result.`,
  },
  topics: [
    {
      t: 1,
      def: `Put-Call Ratio (PCR) is the number of Put contracts divided by the number of Call contracts. It is a sentiment indicator that shows how the crowd is positioned between downside protection (Puts) and upside bets or income writing (Calls).`,
      hi: `Put-Call Ratio (PCR) Put contracts ko Call contracts se divide karne par milta hai. Yeh ek sentiment indicator hai jo dikhata hai ki crowd downside protection (Puts) aur upside bets ya income writing (Calls) ke beech kaise positioned hai.`,
      how: `PCR can be computed from open interest, volume, or premium. Exchanges and data vendors publish it for indices and stocks, and many brokers show it on their chain page. A rising PCR means the Put side is growing faster than the Call side. It does not by itself say whether Puts were bought or sold, and it has no fixed meaning for direction. Readers treat it as a thermometer of positioning, to be checked against price and OI changes.`,
      eg: {
        title: 'Computing PCR (illustrative)',
        text: `The nearest weekly chain holds Put OI of 232,000 lots and Call OI of 313,000 lots. In units that is 232,000 x 65 = 1,50,80,000 and 313,000 x 65 = 2,03,45,000. PCR = 1,50,80,000 / 2,03,45,000 = 0.74. Lots or units give the same ratio because the lot size cancels.`,
      },
      tip: `PCR is a ratio, so lots or units do not matter, but always say which expiry and which measure (OI or volume) you used.`,
      visual: {
        kind: 'gauge',
        title: 'PCR on a common reading scale (illustrative value 0.74)',
        min: 0.4,
        max: 1.8,
        value: 0.74,
        zones: [
          { from: 0.4, to: 0.7, label: 'Call-heavy', tone: 'bear' },
          { from: 0.7, to: 1.3, label: 'Balanced', tone: 'neutral' },
          { from: 1.3, to: 1.8, label: 'Put-heavy', tone: 'bull' },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 15080000, callOI: 20345000, putVol: 1400000, callVol: 1500000 },
        why: 'Compute both OI PCR and volume PCR for the illustrative chain.',
      },
    },
    {
      t: 2,
      def: `OI PCR is total Put open interest divided by total Call open interest. It describes positions that remain open, so it changes slowly and reflects what traders are holding rather than what they did today.`,
      hi: `OI PCR matlab total Put open interest ko total Call open interest se divide karna. Yeh un positions ko dikhata hai jo abhi bhi open hain, isliye yeh dheere badalta hai aur batata hai ki traders ne kya pakad rakha hai, aaj kya kiya woh nahi.`,
      how: `Because OI accumulates, OI PCR is smoother than volume PCR and is better for day-to-day comparison. A rise between two days shows that Put OI grew faster or Call OI shrank. As an expiry approaches, OI of expiring contracts falls as traders close, so OI PCR of the expiring series can swing near the end for mechanical reasons. Also remember that OI cannot show who initiated the trade, so a rising OI PCR is not proof that writers are bullish.`,
      eg: {
        title: 'OI PCR rising over three days (illustrative)',
        text: `Day 1: Put OI 85,00,000 and Call OI 1,00,00,000 units, PCR 0.85. Day 3: Put OI 1,15,00,000 and Call OI 1,00,00,000, PCR 1.15. Put OI grew by 30,00,000 units (+35.3%) while Call OI was unchanged. Whether that was Put writing or Put buying must be checked with the premium change and price action.`,
      },
      tip: `Compare OI PCR with its own recent history rather than with a fixed number; the trend is more informative than the level.`,
      visual: {
        kind: 'bars',
        title: 'OI PCR over three days (illustrative)',
        items: [
          { label: 'Day 1', value: 0.85, tone: 'ice' },
          { label: 'Day 2', value: 1.0, tone: 'ice' },
          { label: 'Day 3', value: 1.15, tone: 'gold' },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 11500000, callOI: 10000000, putVol: 1400000, callVol: 1500000 },
        why: 'Day-3 figures: Put OI 1,15,00,000 and Call OI 1,00,00,000 units give 1.15.',
      },
    },
    {
      t: 3,
      def: `Volume PCR is the number of Put contracts traded today divided by the number of Call contracts traded today. It reflects the activity of the day, not the positions carried forward.`,
      hi: `Volume PCR aaj trade hue Put contracts ko aaj trade hue Call contracts se divide karna hai. Yeh din ki activity dikhata hai, aage carry hui positions nahi.`,
      how: `Volume counts every trade, including intraday round-trips and traders closing positions, so it moves quickly and is noisy. A spike in volume PCR on a falling day shows heavy Put trading, but it could be Put buying for protection or profit-taking by Put writers. It is most useful as a same-day pulse and less useful as a trend signal. Because buy and sell volumes are equal for every contract, volume PCR cannot show which side initiated the trades.`,
      eg: {
        title: 'A noisy intraday reading (illustrative)',
        text: `By 11:00 Put volume is 14,00,000 and Call volume 15,00,000 units, so volume PCR = 0.93. By 2:30 Put volume is 32,00,000 and Call volume 24,00,000, so volume PCR = 1.33. The change is large, but if the index dropped sharply meanwhile, Put volume may only reflect panic buying; it says nothing yet about how positions will carry into tomorrow.`,
      },
      tip: `Use volume PCR as a same-day pulse and OI PCR as the slower trend. When the two disagree, find out why before acting.`,
      visual: {
        kind: 'compare',
        title: 'OI PCR vs volume PCR',
        left: { head: 'OI PCR', tone: 'gold', points: ['Counts open positions', 'Changes slowly', 'Better for day-to-day trend', 'Distorted near expiry as contracts close'] },
        right: { head: 'Volume PCR', tone: 'ice', points: ['Counts today\'s trades', 'Changes fast', 'Better as an intraday pulse', 'Noisy; includes round-trip trades'] },
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 15080000, callOI: 20345000, putVol: 3200000, callVol: 2400000 },
        why: 'Afternoon volume of 32,00,000 Puts and 24,00,000 Calls gives volume PCR 1.33.',
      },
    },
    {
      t: 4,
      def: `Strike-wise PCR is the Put OI divided by the Call OI at one strike. It shows where Put and Call interest is concentrated and which strikes lean one way.`,
      hi: `Strike-wise PCR ek strike par Put OI ko Call OI se divide karke nikalta hai. Yeh dikhata hai ki Put aur Call ka interest kahan concentrated hai aur kaun se strikes kis taraf jhuke hain.`,
      how: `Strikes below spot naturally carry more Put OI and strikes above spot carry more Call OI, so strike-wise PCR is high at low strikes and low at high strikes. Interesting information lies in departures from that pattern, for example a strike above spot with high Put OI, or the strike where PCR crosses 1. Strike-wise PCR also helps to locate the zones where OI is heavy on one side, an input into support and resistance work.`,
      eg: {
        title: 'Strike-wise PCR on the map (illustrative)',
        text: `From the illustrative chain: 23,500 = 58 / 9 = 6.44; 23,800 = 71 / 15 = 4.73; 24,000 = 55 / 48 = 1.15; 24,200 = 21 / 57 = 0.37; 24,300 = 14 / 63 = 0.22; 24,500 = 9 / 82 = 0.11. PCR crosses 1 near 24,000, the spot level, and falls away above it, as expected.`,
      },
      tip: `Do not compare the PCR of a far OTM strike with an ATM strike; low-OI strikes make ratios jump around.`,
      visual: {
        kind: 'bars',
        title: 'Strike-wise PCR (illustrative)',
        caption: 'High below spot, low above spot is the normal shape. The strike where it crosses 1 is near spot.',
        items: [
          { label: '23,500', value: 6.44, tone: 'ice' },
          { label: '23,800', value: 4.73, tone: 'ice' },
          { label: '24,000', value: 1.15, tone: 'gold' },
          { label: '24,200', value: 0.37, tone: 'ice' },
          { label: '24,500', value: 0.11, tone: 'ice' },
        ],
      },
    },
    {
      t: 5,
      def: `Overall PCR is the ratio of total Put OI to total Call OI across all strikes (and often all expiries). It is the headline number most websites show.`,
      hi: `Overall PCR saare strikes (aur aksar saari expiries) ka total Put OI total Call OI se divide karke milta hai. Yeh woh headline number hai jo zyadatar websites dikhati hain.`,
      how: `The overall number blends every expiry. Near-expiry contracts are traded by short-term participants; far expiries hold hedges and structured positions of larger investors and funds. So the all-expiry PCR may stay high while the weekly PCR is falling, or the opposite. Compare the weekly, monthly and overall values before drawing any conclusion, and note that stock-option PCR and index-option PCR have different meaning. For NSE index options the nearest-expiry numbers are usually the most relevant for short-term trading.`,
      eg: {
        title: 'Weekly vs overall (illustrative)',
        text: `Weekly: Put 232,000 and Call 313,000 lots, PCR 0.74. Monthly and later: Put 1,150,000 and Call 1,000,000 lots, PCR 1.15. Overall = (232,000 + 1,150,000) / (313,000 + 1,000,000) = 1,382,000 / 1,313,000 = 1.05. The overall number looks balanced, while the weekly number leans Call-heavy.`,
      },
      tip: `Always ask which expiry a PCR is for. The same market can show 0.74 and 1.15 at once.`,
      visual: {
        kind: 'bars',
        title: 'The same market, three PCRs (illustrative)',
        items: [
          { label: 'Weekly', value: 0.74, tone: 'ice' },
          { label: 'Monthly and later', value: 1.15, tone: 'ice' },
          { label: 'Overall', value: 1.05, tone: 'gold' },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 1382000, callOI: 1313000, putVol: 1400000, callVol: 1500000 },
        why: 'Overall PCR in lots: 1,382,000 / 1,313,000 = 1.05.',
      },
    },
    {
      t: 6,
      def: `A bullish interpretation of PCR reads a rising PCR as growing Put writing: traders selling Puts expect the index to stay above their strikes, so the crowd is positioned for support.`,
      hi: `PCR ki bullish interpretation mein badhte PCR ko Put writing badhna maana jata hai: Puts bechne wale traders ko lagta hai ki index unke strikes ke upar rahega, yaani crowd support ke liye positioned hai.`,
      how: `The reasoning: Put writers are paid to accept downside risk, so heavy Put writing signals confidence. The reading is stronger if PCR rises while the Put premium falls and the index holds or rises. It is weaker if PCR rises because buyers rush to buy Puts for protection, which is a worried crowd, not a confident one. Also, PCR above about 1.3 is sometimes read bullish because it shows an oversold crowd; the conventions differ, so say which one you are using.`,
      eg: {
        title: 'A bullish-looking rise (illustrative)',
        text: `Over three days PCR goes from 0.85 to 1.15, Put OI rises by 35.3%, Put premiums at 23,800 fall from Rs 110 to Rs 92 and Nifty edges up from 23,900 to 24,100. All the clues line up with Put writing. If Put premiums had risen and the index had fallen instead, the same PCR rise would read as protective Put buying.`,
      },
      tip: `A rising PCR is bullish only if the Puts are being written. Check premium and price before deciding.`,
      visual: {
        kind: 'flow',
        title: 'How a bullish PCR reading is built',
        steps: [
          { label: 'PCR rises', note: 'Put OI grows', tone: 'ice' },
          { label: 'Put premium falls', note: 'sellers dominate', tone: 'gold' },
          { label: 'Index holds or rises', note: 'price agrees', tone: 'bull' },
          { label: 'Possible bullish bias', note: 'not a guarantee', tone: 'bull' },
        ],
      },
    },
    {
      t: 7,
      def: `A bearish interpretation of PCR reads a falling PCR as growing Call writing: traders selling Calls expect the index to stay below their strikes, so the crowd is positioned to cap rallies.`,
      hi: `PCR ki bearish interpretation mein girte PCR ko Call writing badhna maana jata hai: Calls bechne wale traders ko lagta hai ki index unke strikes ke neeche rahega, yaani crowd rally ko cap karne ke liye positioned hai.`,
      how: `If Call OI grows faster than Put OI and the Call premium falls while the index weakens, the PCR drop is read as a bearish positioning. The signal is weaker if PCR falls only because Puts were closed after a rally (Put unwinding), which is simply profit-taking. Another false signal arises in a strong uptrend, where traders add Calls to speculate on the rise; there the PCR also falls but the view is bullish. As with the bullish case, premium and price must agree.`,
      eg: {
        title: 'A bearish-looking fall (illustrative)',
        text: `PCR slides from 1.0 to 0.70 as Put OI barely changes at 91,00,000 units while Call OI jumps from 91,00,000 to 1,30,00,000 units (+42.9%). Call premiums fall and Nifty drifts from 24,100 to 23,950. Fresh Call writing is the likely driver. If Call premiums had risen while Nifty rallied instead, the same PCR fall would mean Call buying.`,
      },
      tip: `A falling PCR is not automatically bearish. In a rally, traders buy Calls and PCR falls for a bullish reason.`,
      visual: {
        kind: 'compare',
        title: 'The same PCR fall, two meanings',
        left: { head: 'Call writing', tone: 'bear', points: ['Call OI up, premium falling', 'Index weak or capped', 'Writers expect it to stay below'] },
        right: { head: 'Call buying', tone: 'bull', points: ['Call OI up, premium rising', 'Index rallying', 'Buyers expect it to go higher'] },
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 9100000, callOI: 13000000, putVol: 1400000, callVol: 1500000 },
        why: 'Put OI 91,00,000 and Call OI 1,30,00,000 units give PCR 0.70.',
      },
    },
    {
      t: 8,
      def: `Overbought and oversold interpretations use extreme PCR values as a contrarian clue. A very low PCR may suggest too many Call bets and an overbought market; a very high PCR may suggest too many Put bets and an oversold market.`,
      hi: `Overbought aur oversold interpretation mein extreme PCR values ko contrarian clue ki tarah dekha jata hai. Bahut kam PCR ka matlab ho sakta hai ki Call bets zyada hain aur market overbought hai; bahut zyada PCR ka matlab ho sakta hai ki Put bets zyada hain aur market oversold hai.`,
      how: `The idea is that when nearly everyone is on one side, there are few new buyers or sellers left, so a turn becomes more likely. Many traders use numbers like below 0.5 for overbought and above 1.5 for oversold, but there is no official definition, the levels depend on the index and the expiry, and a crowd can stay extreme for weeks in a strong trend. So the signal needs confirmation, for example a reversal candle or a change in OI, and a stop-loss. Never trade an extreme PCR alone.`,
      eg: {
        title: 'An oversold-looking reading (illustrative)',
        text: `After a three-day fall of Nifty from 24,300 to 23,600 (-2.9%), Put OI is 1,55,00,000 and Call OI is 1,00,00,000 units, PCR = 1.55. Traders reading it as oversold may look for a bounce. But if the fall continues to 23,200 and PCR reaches 1.8, the "extreme" was not the end. Without a stop-loss, a contrarian view can be very expensive.`,
      },
      tip: `Extremes can get more extreme. Use overbought/oversold PCR only as a prompt to look for confirmation.`,
      visual: {
        kind: 'gauge',
        title: 'PCR extremes as a contrarian prompt (illustrative value 1.55)',
        caption: 'Zone cut-offs are rules of thumb used by some traders, not exchange definitions.',
        min: 0.2,
        max: 2.0,
        value: 1.55,
        zones: [
          { from: 0.2, to: 0.5, label: 'Possible overbought', tone: 'bear' },
          { from: 0.5, to: 1.5, label: 'Normal range', tone: 'neutral' },
          { from: 1.5, to: 2.0, label: 'Possible oversold', tone: 'bull' },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 15500000, callOI: 10000000, putVol: 1400000, callVol: 1500000 },
        why: 'Put OI 1,55,00,000 and Call OI 1,00,00,000 units give PCR 1.55.',
      },
    },
    {
      t: 9,
      def: `PCR has several limitations: it ignores who initiated trades, mixes hedges with bets, depends on the expiry chosen, can be distorted by a few large positions and has no fixed meaning for direction.`,
      hi: `PCR ki kai limitations hain: yeh nahi batata ki trade kisne initiate kiya, hedges aur bets ko mila deta hai, chuni hui expiry par depend karta hai, kuch bade positions se distort ho sakta hai aur direction ke liye iska koi fixed meaning nahi hai.`,
      how: `Exchange data shows OI and volume but not whether a trade was opened by the buyer or the seller, and OI does not distinguish a speculative position from a hedge or a leg of a spread. Institutions hold Puts as portfolio insurance, and an expiring series loses OI mechanically as traders close. A single large trade in a far OTM strike can move the ratio. PCR also uses simple counts, not rupee value or delta, so a far OTM contract counts the same as an ATM one. Because of all this, PCR may lag or mislead.`,
      eg: {
        title: 'One hedger moves the ratio (illustrative)',
        text: `The weekly chain has Put OI 232,000 and Call OI 313,000 lots (PCR 0.741). A fund buys 20,000 lots of far OTM Puts as protection. Put OI becomes 252,000 and PCR rises to 252 / 313 = 0.805, a jump of 0.064. The crowd did not turn bullish; one hedge changed the number. In a rupee-weighted view that trade would carry very little weight because far OTM Puts are cheap.`,
      },
      tip: `Before trusting a PCR change, ask what could produce it besides a change in market view. Usually there are two or three alternatives.`,
      visual: {
        kind: 'layers',
        title: 'What can hide inside a PCR number',
        layers: [
          { label: 'Put writers (confident)', tone: 'bull' },
          { label: 'Put buyers (protection or bets)', tone: 'bear' },
          { label: 'Call unwinding', tone: 'neutral' },
          { label: 'Spread legs and hedges', tone: 'neutral' },
          { label: 'Expiry roll mechanics', tone: 'gold' },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 16380000, callOI: 20345000, putVol: 1400000, callVol: 1500000 },
        why: 'After the 20,000 lot hedge: Put OI 252,000 x 65 = 1,63,80,000 units; PCR 0.805.',
      },
    },
    {
      t: 10,
      def: `PCR divergence happens when PCR moves in a way that does not match price. For example the index makes a new high while PCR keeps falling, or the index falls while PCR keeps rising. A divergence is a prompt to check what is changing underneath.`,
      hi: `PCR divergence tab hota hai jab PCR price ke saath match nahi karta. Jaise index naya high banaye aur PCR girta rahe, ya index gire aur PCR badhta rahe. Divergence ka matlab hai ki neeche kya badal raha hai woh check karo.`,
      how: `Divergences are interesting because they show that participants disagree with price, but they are not reliable timing tools. A rally with a falling PCR may mean Call writers are leaning against the rally, so the rally may be less supported, or it may mean traders are buying Calls in a healthy uptrend. A fall with a rising PCR may reflect Put writers buying the dip or hedgers adding protection. Check the OI by strike and the premium before calling the divergence bullish or bearish. Confirm with price action.`,
      eg: {
        title: 'New high, falling PCR (illustrative)',
        text: `Nifty rises from 24,000 to a new high of 24,300 in four sessions. Over the same period PCR falls from 1.10 (Put OI 1,10,00,000, Call OI 1,00,00,000 units) to 0.80 (Put OI 88,00,000, Call OI 1,10,00,000). Put OI dropped by 22,00,000 units (-20%) and Call OI rose by 10,00,000 (+10%). Put writers are leaving and Call writers are arriving: the rally is being met with resistance underneath, and a pause or pullback is plausible but not certain.`,
      },
      tip: `A divergence is a question, not an answer. Write down the two possible explanations and wait for price to choose between them.`,
      visual: {
        kind: 'timeline',
        title: 'A PCR divergence (illustrative)',
        events: [
          { when: 'Day 1', what: 'Nifty 24,000; PCR 1.10', tone: 'neutral' },
          { when: 'Day 2', what: 'Nifty 24,120; PCR 1.00; Put OI starting to fall', tone: 'gold' },
          { when: 'Day 3', what: 'Nifty 24,230; PCR 0.90; Call OI rising', tone: 'gold' },
          { when: 'Day 4', what: 'Nifty 24,300 new high; PCR 0.80; divergence', tone: 'bear' },
        ],
      },
      calc: {
        id: 'pcr',
        preset: { putOI: 8800000, callOI: 11000000, putVol: 1400000, callVol: 1500000 },
        why: 'Day-4 figures: Put OI 88,00,000 and Call OI 1,10,00,000 units give PCR 0.80.',
      },
    },
  ],
  tools: [{ id: 'pcr', why: 'OI PCR and volume PCR from raw numbers.' }],
}
export default m
