import type { ModuleLesson } from '../topicLessonTypes'

/* Module 14.5 — Understanding Market Psychology.
 * Numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification), India VIX ≈ 14.
 * SEBI has published studies of individual F&O traders showing that a large majority lose money; exact percentages change by study, so none are quoted here. */
const m: ModuleLesson = {
  moduleId: '14.5',
  intro: `Prices are made by people, and people repeat the same emotional patterns: fear when prices fall, greed when they rise, and a strong urge to follow the crowd. This module names those patterns so that you can spot them in the market and in your own trading. Psychology does not give a trade signal on its own, but it explains why good plans break down at the worst moment.`,
  introHi: `Price insaan banate hain, aur insaan baar-baar wahi emotions repeat karte hain: girte market mein dar, badhte market mein lalach, aur crowd ke peeche chalne ki aadat. Yeh module in patterns ko naam deta hai taaki aap inhe market mein aur apni trading mein pehchaan sako. Psychology akele trade signal nahi deti, lekin yeh batati hai ki achhe plan galat waqt par kyun toot jaate hain.`,
  steps: {
    concept: `Market psychology is the study of how emotions and mental shortcuts push traders to act. Every trade has two sides, and each side believes it is right. The market keeps moving between optimism and pessimism, and options make those swings sharper because premium is cheap to buy, loses value with time and can double or vanish within hours.`,
    conceptHi: `Market psychology yeh dekhti hai ki emotions aur mental shortcuts traders ko kaise action lene par majboor karte hain. Har trade ke do sides hote hain aur dono ko lagta hai ki woh sahi hain. Market optimism aur pessimism ke beech jhoolta rehta hai, aur options in jhoolon ko aur tez bana dete hain kyunki premium sasta lagta hai, time ke saath ghat'ta hai aur kuch hi ghanton mein double ya zero ho sakta hai.`,
    mechanism: `Three things link emotion to price. First, crowds act together: when many people buy because prices are rising, the rise continues until buyers run out. Second, mental biases (overconfidence, confirmation bias, loss aversion) make individuals trade too often and hold losers too long. Third, positioning leaves a trail: India VIX, put-call ratio and OI show how crowded one side has become, though none of them shows who initiated a trade or guarantees a reversal. A trader who reads these footprints sees where emotion is stretched.`,
    example: {
      title: 'One illustrative week of emotion',
      text: `NIFTY rises from 24,000 to 24,400 in four sessions (+1.67%, since 400 ÷ 24,000 = 0.0167). By day four, a retail trader who ignored the rise on day one buys a 24,500 CE at ₹80 because "everyone is bullish". One lot of 65 costs 80 × 65 = ₹5,200. If NIFTY then drifts back to 24,300 by expiry, the option expires at 0 and the whole ₹5,200 is lost, even though the market was only 100 points lower than where the buyer entered. The loss came from entering late on emotion, with time working against the position.`,
    },
    chart: {
      kind: 'gauge',
      title: 'India VIX as a fear gauge (illustrative bands)',
      caption: 'VIX shows expected volatility, not direction. High VIX means the market is paying more for protection; low VIX means calm, and calm can end quickly.',
      min: 8,
      max: 40,
      value: 14,
      zones: [
        { from: 8, to: 13, label: 'Calm', tone: 'ice' },
        { from: 13, to: 20, label: 'Normal', tone: 'gold' },
        { from: 20, to: 40, label: 'Fear', tone: 'neutral' },
      ],
    },
    optionChain: `The option chain shows where emotion has settled in the form of open interest. Heavy call OI above spot may reflect a crowd expecting a cap; heavy put OI below may reflect a crowd expecting support. Do not read this as a promise. OI alone cannot show who initiated the trade, and a crowded strike can be breached as easily as it can hold. Use the chain to see where the crowd is leaning, then ask what happens if it is wrong.`,
    psychology: `Fear and greed are not flaws to remove but forces to manage. Buyers fear missing out, so they chase. Sellers fear a large loss, so they cut winners early and hold losers. Institutions trade size, so they must accumulate or distribute slowly and often take the other side of an emotional crowd. Your edge is a written plan made before the trade, when you are calm.`,
    scenarios: {
      bullish: `In a rally, greed grows: late buyers join, VIX falls and every dip is bought. This can continue longer than expected, but the later you join, the less room remains before a pause. Define risk before entry.`,
      bearish: `In a fall, fear grows: VIX jumps, put premiums expand, and many traders sell at the lows. Panic selling can overshoot, yet catching a falling market without a stop-loss is equally emotional.`,
      sideways: `In a range, impatience builds. Buyers lose to theta and start to overtrade, hoping for a move. Writers feel safe and may size up just before the range breaks. Boredom is a risk too.`,
    },
    practice: [
      { q: `You buy a 24,500 CE at ₹80, lot 65. What is the premium paid, and what is the most you can lose in rupees?`, a: `Premium paid = 80 × 65 = ₹5,200. The most a buyer can lose is the full premium, ₹5,200, if the option expires worthless (before charges).` },
      { q: `After a 4-day rally from 24,000 to 24,400, what is the percentage gain?`, a: `(24,400 − 24,000) ÷ 24,000 = 400 ÷ 24,000 = 0.01667, so about 1.67%.` },
      { q: `Your account is ₹2,00,000 and you set a loss limit of 2% per trade. What is the maximum loss in rupees?`, a: `2% of 2,00,000 = 0.02 × 2,00,000 = ₹4,000 per trade.` },
      { q: `Spot falls and India VIX jumps from 14 to 22. Does this tell you the market will rise or fall next?`, a: `No. VIX measures expected volatility, not direction. A high VIX shows fear and expensive options; the market can fall further or rebound.` },
    ],
    assignment: `For one week, write a one-line note before every trade: "Why am I entering, and what would make me exit?" At the end of the week, tag each trade as plan-based, fear-based or greed-based and count them.`,
  },
  topics: [
    {
      t: 1,
      def: `Bulls expect prices to rise and buy; bears expect prices to fall and sell. Both groups are always present, and price moves when one side becomes more eager than the other. Neither side is permanently right.`,
      hi: `Bulls ko lagta hai price badhega toh woh buy karte hain; bears ko lagta hai price girega toh woh sell karte hain. Dono groups hamesha market mein hote hain, aur price tab chalta hai jab ek side zyada aggressive ho jaati hai. Koi bhi side hamesha sahi nahi hoti.`,
      how: `On NSE every trade needs a buyer and a seller, so a bull is matched with someone who thinks otherwise or has a different time frame. In options, a bull may buy a CE or sell a PE; a bear may buy a PE or sell a CE. The same position can come from different motives, such as a hedge, so you cannot assume a trader is bullish from the instrument alone. The exchange matches orders by price and time, and the balance of eagerness shows up as the direction of the next trades.`,
      eg: {
        title: 'Same market, two views',
        text: `NIFTY is at 24,000. A bull buys a 24,000 CE at ₹150 (lot 65 = ₹9,750 premium) expecting 24,300. A bear buys a 24,000 PE at ₹140 (₹9,100) expecting 23,700. At expiry NIFTY is 24,300: the CE is worth 300 and gains (300 − 150) × 65 = ₹9,750; the PE expires at 0 and loses ₹9,100. Both traders were confident; only one was right this time.`,
      },
      tip: `Do not label yourself a permanent bull or bear. Trade what the price is doing, with a stop-loss for the case you are wrong.`,
      visual: { kind: 'compare', title: 'Bulls and bears', left: { head: 'Bulls', tone: 'bull', points: ['Expect higher prices', 'Buy CE or sell PE', 'Fear missing the rally'] }, right: { head: 'Bears', tone: 'bear', points: ['Expect lower prices', 'Buy PE or sell CE', 'Fear being caught long'] } },
    },
    {
      t: 2,
      def: `Buyers pay to own a position; sellers (writers) collect that payment and take on the risk. In options, a buyer has limited loss and a seller has a limited gain but potentially large loss.`,
      hi: `Buyer premium dekar position kharidta hai; seller (writer) woh premium leta hai aur risk apne upar le leta hai. Options mein buyer ka loss limited hota hai, aur seller ka profit limited hota hai lekin loss bahut bada ho sakta hai.`,
      how: `A buyer's mindset is hope with a cost: premium decays with time, so the buyer needs a quick, large move. A seller's mindset is probability with a risk: sellers win small amounts often and must manage rare large moves. Sellers need margin (SPAN plus exposure, set by the exchange and clearing corporation), so they are usually better capitalised, but writers do not always win; a sharp move can erase many small gains. Neither side is better, they carry different risks.`,
      eg: {
        title: 'A buyer and a writer on the same strike',
        text: `NIFTY 24,500 CE is sold at ₹30 by a writer and bought by a buyer. One lot = 65. The writer collects 30 × 65 = ₹1,950. If NIFTY expires at 24,400, the option is worth 0, the writer keeps ₹1,950 and the buyer loses ₹1,950. If NIFTY expires at 24,700, the option is worth 200, so the writer loses (200 − 30) × 65 = ₹11,050, and the buyer gains the same ₹11,050.`,
      },
      tip: `Compare the two sides by risk: the buyer's loss is capped at the premium, the writer's is not. Never confuse a high win rate with a safe strategy.`,
      visual: { kind: 'compare', title: 'Option buyer vs writer', left: { head: 'Buyer', tone: 'ice', points: ['Pays premium', 'Loss limited to premium', 'Needs a big move fast', 'Time works against'] }, right: { head: 'Writer', tone: 'gold', points: ['Receives premium', 'Gain limited to premium', 'Loss can be large', 'Time works for'] } },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'sell', strike: 24500, premium: 30, expiryPrice: 24700, lotSize: 65, lots: 1 }, why: 'Check the writer\'s loss when the market moves through the strike.' },
    },
    {
      t: 3,
      def: `Fear and greed alternate in cycles. Greed grows as prices rise and makes people take larger risks; fear grows as prices fall and makes people sell. Extremes of either often appear near turning points, but not always.`,
      hi: `Fear aur greed cycle mein chalte hain. Price badhne par greed badhta hai aur log bade risk lete hain; price girne par fear badhta hai aur log bech dete hain. In dono ki extreme jagah aksar turning point ke paas hoti hai, lekin hamesha nahi.`,
      how: `A typical cycle runs: doubt, hope, optimism, euphoria, anxiety, fear, panic, relief. In options the cycle shows in India VIX (low in euphoria, high in panic), in the volume of cheap OTM options bought near highs, and in put premium after a fall. The cycle has no fixed timing, so an extreme can stay extreme. Use it as a map of crowd mood, not as a timer.`,
      eg: {
        title: 'VIX through a sharp fall',
        text: `Illustrative: NIFTY drops from 24,000 to 23,000 (−4.17%, since 1,000 ÷ 24,000 = 0.0417) in a week while VIX goes from 14 to 24. The one-day 1σ expected move at VIX 14 was 24,000 × 0.14 × √(1/365) = 176 points; at VIX 24 it is 24,000 × 0.24 × √(1/365) = 301 points. Fear almost doubled the expected daily swing, so option premiums became far more expensive exactly when buyers felt most urgent.`,
      },
      tip: `When everyone is afraid, premiums are expensive. When everyone is calm, premiums are cheap. Buying fear at its peak is a costly habit.`,
      visual: { kind: 'timeline', title: 'The emotional cycle', events: [{ when: 'Early', what: 'Doubt and hope', tone: 'ice' }, { when: 'Rally', what: 'Optimism turns to greed', tone: 'bull' }, { when: 'Top', what: 'Euphoria; VIX low', tone: 'gold' }, { when: 'Fall', what: 'Anxiety turns to panic', tone: 'bear' }, { when: 'Bottom', what: 'Despair; VIX high', tone: 'gold' }] },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 24, days: 1 }, why: 'See how fear widens the expected daily move.' },
    },
    {
      t: 4,
      def: `Herd mentality is the tendency to copy what the crowd is doing, assuming that so many people cannot all be wrong. It feels safe but often means joining a move late.`,
      hi: `Herd mentality ka matlab hai crowd jo kar raha hai wahi karna, yeh soch kar ki itne saare log galat nahi ho sakte. Yeh safe lagta hai, lekin aksar move ke late hone par join karna hota hai.`,
      how: `Herding spreads through social media tips, WhatsApp and Telegram groups, TV headlines and the sight of green option-chain numbers. In options it shows as a rush into the same weekly strike, thin liquidity beyond it and wide bid-ask spreads. Late herd buyers pay inflated premium, and when the crowd exits together there are few buyers, so the exit price is worse than the screen price. SEBI has repeatedly warned retail investors about unregistered tipsters, which is one channel through which herding spreads.`,
      eg: {
        title: 'Everyone buys the same strike',
        text: `Illustrative: a tip group tells followers to buy a 24,300 CE at ₹60. If 5,000 followers each buy 1 lot of 65, that is 325,000 units. The bid-ask for this strike was ₹59.5 and ₹60.5 (spread ₹1); under the rush the ask moves to ₹64. Each buyer pays ₹4 more than the earlier price: 4 × 65 = ₹260 per lot extra, or ₹13,00,000 across 5,000 lots, before the position has had any chance to work.`,
      },
      tip: `Ask "who is on the other side of this trade, and why did they sell to me?" If the answer is "a professional with better information", rethink.`,
      visual: { kind: 'flow', title: 'How a herd forms', steps: [{ label: 'Price moves up', tone: 'bull' }, { label: 'Tips spread online', note: 'groups, headlines', tone: 'ice' }, { label: 'Late buyers rush in', note: 'ask rises', tone: 'gold' }, { label: 'Buyers run out', note: 'price stalls', tone: 'neutral' }, { label: 'Exit together', note: 'wide spreads', tone: 'bear' }] },
    },
    {
      t: 5,
      def: `Retail positioning is how individual small traders are placed in the market. In options, retail is often seen as buying short-dated OTM contracts in large numbers, though the exact mix changes with time.`,
      hi: `Retail positioning ka matlab hai chhote individual traders market mein kaise placed hain. Options mein retail aksar short-dated OTM contracts bade number mein kharidta dikhta hai, lekin yeh mix time ke saath badalta rehta hai.`,
      how: `NSE publishes participant-wise data (client, proprietary, FII and DII) for index futures and options; it is an end-of-day dataset with broad categories, so it cannot tell you what one trader is doing, and the "client" category is wider than retail alone. SEBI's published studies of individual F&O traders have found that a large majority lose money, mostly through repeated small losses and charges. Treat retail positioning as context for crowding, never as a rule that retail is always wrong.`,
      eg: {
        title: 'A retail trader\'s cost of frequent trading',
        text: `Illustrative: a trader buys 1 lot (65) of an option at ₹50 and sells at ₹55, 10 times a month. Gross gain per trade = 5 × 65 = ₹325, so ₹3,250 in total. Suppose brokerage, STT, exchange fees and GST come to ₹120 per round trip (illustrative; check current rates): 10 × 120 = ₹1,200. Net = ₹2,050. If three of the ten trades are ₹10 losses instead, those lose 10 × 65 = ₹650 each, wiping out ₹1,950 of gains. Small edges are fragile.`,
      },
      tip: `Use participant data to see crowding, not to fade (bet against) retail blindly. Crowds can be right for a long time.`,
      visual: { kind: 'layers', title: 'Who trades NSE index options', layers: [{ label: 'Institutions (FII/DII)', note: 'large, hedged and directional', tone: 'ice' }, { label: 'Proprietary desks and market makers', note: 'liquidity, arbitrage', tone: 'gold' }, { label: 'Individual clients', note: 'many small positions', tone: 'neutral' }] },
      calc: { id: 'charges', preset: { premium: 50, lotSize: 65, lots: 1, side: 'buy', brokerage: 20 }, why: 'Frequent trading carries a visible cost; compute it for one lot.' },
    },
    {
      t: 6,
      def: `Institutional positioning means how large players such as FIIs, DIIs, mutual funds and proprietary desks are placed. They trade large size, so they act in stages and often use derivatives to hedge a cash portfolio.`,
      hi: `Institutional positioning ka matlab hai bade players jaise FII, DII, mutual funds aur proprietary desks kaise placed hain. Yeh bade size mein trade karte hain, isliye stage-wise kaam karte hain aur aksar cash portfolio ko hedge karne ke liye derivatives use karte hain.`,
      how: `NSE publishes participant-wise open interest after the close. If an FII holds a large short index futures position, it may be hedging a cash portfolio rather than being bearish, so the position alone does not give direction. Long-short ratios of FII index futures are widely followed but are noisy. Institutions use options for hedging (buying puts), income (selling covered calls) and views. The data lag by a day, and big players also trade through others, so treat it as one input.`,
      eg: {
        title: 'Hedge or view?',
        text: `Illustrative: an institution holds ₹100 crore of equities with a beta of 1 and sells NIFTY futures worth ₹20 crore. Hedge ratio = 20 ÷ 100 = 20% of the portfolio hedged. A fall of 5% on the index would lose about ₹5 crore on the portfolio and gain about 0.05 × 20 = ₹1 crore on the short futures, so the hedge offsets only a part. Reading this as "FII is bearish" would be a misreading.`,
      },
      tip: `A big short position is not automatically a bearish bet. Ask whether it could be a hedge before you act on it.`,
      visual: { kind: 'compare', title: 'Reading a large institutional position', left: { head: 'Possible view', tone: 'gold', points: ['Directional bet', 'Expects a fall or rise', 'Usually fresh capital'] }, right: { head: 'Possible hedge', tone: 'ice', points: ['Protects a cash portfolio', 'Offsets existing exposure', 'Not a market call'] } },
      calc: { id: 'hedge-ratio', preset: { portfolio: 1000000000, beta: 1, futuresNotional: 200000000 }, why: 'Compute how much of a portfolio a futures hedge actually covers.' },
    },
    {
      t: 7,
      def: `Crowd behaviour is how a large group reacts together to price moves and news. It tends to over-react to fresh news and to extrapolate the latest move into the future.`,
      hi: `Crowd behaviour ka matlab hai ek bada group price moves aur news par ek saath kaise react karta hai. Crowd fresh news par over-react karta hai aur haal ke move ko aage bhi chalta hua maan leta hai.`,
      how: `Examples are a gap up after a result, a sharp reaction on Budget day, or a sudden fall during a global sell-off. In the first minutes the crowd pushes price past fair value, then the reaction often partly reverses once professionals respond. On option chains, crowd behaviour appears as volume spikes in a few strikes and sudden jumps in IV. The crowd is right about direction more often than its timing and size, so crowded entries are usually the expensive ones.`,
      eg: {
        title: 'Event reaction with numbers',
        text: `Illustrative: before an event, an ATM NIFTY 24,000 CE costs ₹150 at IV 14. After a surprise, spot rises 150 points to 24,150 but IV climbs from 14 to 18 in the panic of buying. A trader chasing at the top pays a much larger premium than the delta alone suggests: with delta around 0.5, 150 points adds about ₹75, plus vega of about ₹11 per IV point times 4 = ₹44, so the option may rise to roughly ₹269 on paper. If IV then falls back from 18 to 14 by the next day, the same ₹44 is lost.`,
      },
      tip: `After news, separate the move in price from the move in IV. Buying when both are stretched costs you twice.`,
      visual: { kind: 'candles', title: 'Over-reaction and partial retracement', pattern: 'falseBreakout' },
    },
    {
      t: 8,
      def: `Overconfidence is believing you know more than you do, usually after a few winning trades. It makes traders increase size, skip stop-losses and trade more often.`,
      hi: `Overconfidence ka matlab hai yeh maan lena ki aap jitna jaante ho usse zyada jaante ho, aksar kuch jeet ke baad. Isse trader size badhata hai, stop-loss chhod deta hai aur zyada trade karne lagta hai.`,
      how: `A short winning streak can come from luck, especially in leveraged option buying where one big move can pay for several losses. The trader mistakes luck for skill and raises the lot count, which makes the next normal losing streak much more damaging. Professional risk control limits risk per trade to a fixed small percentage of capital, regardless of recent results. A journal with all trades, not only the winners, is the cure because it shows the real hit rate.`,
      eg: {
        title: 'Winning streak, then a size jump',
        text: `A trader has ₹2,00,000 capital and wins 4 trades in a row, each of about ₹4,000. Feeling sure, they raise the risk per trade from 1% to 10% of capital. A 1% risk is ₹2,000; 10% is ₹20,000. Three normal losses in a row at 10% cost 3 × 20,000 = ₹60,000, which is 30% of capital; at 1% the same three losses would cost ₹6,000, which is 3%. To recover a 30% loss, you need 0.30 ÷ 0.70 = 42.9% gain.`,
      },
      tip: `Raise size only on a long, honest record and on rules, never on the feeling of "I cannot lose now".`,
      visual: { kind: 'bars', title: 'Same three losses, different risk per trade', unit: '% of capital', items: [{ label: '1% risk', value: 3, tone: 'ice' }, { label: '10% risk', value: 30, tone: 'bear' }] },
      calc: { id: 'drawdown-recovery', preset: { drawdownPct: 30 }, why: 'See why a large drawdown needs a much larger gain to recover.' },
    },
    {
      t: 9,
      def: `Confirmation bias is looking only for information that supports your existing view and ignoring what disagrees. A trader who is bullish reads only bullish news and sees only support levels.`,
      hi: `Confirmation bias ka matlab hai sirf woh information dhoondhna jo aapke existing view ko support kare, aur jo against hai use ignore karna. Bullish trader sirf bullish news padhta hai aur sirf support levels dekhta hai.`,
      how: `In options, it appears when a trader sees high put OI below spot and calls it a floor, but skips the large call OI above, the rising VIX or a weak global cue. The same data can be read two ways, so you must check the evidence against your view, not for it. A useful habit is to write down what would prove you wrong before entering, and to list at least two points that disagree with your idea.`,
      eg: {
        title: 'Reading the same chain two ways',
        text: `Illustrative chain: PE OI at 23,800 is 80 lakh and CE OI at 24,200 is 90 lakh, spot 24,000. A bullish trader says "80 lakh put OI is a strong floor". A bearish trader says "90 lakh call OI is a ceiling". Both statements are selective: the PCR for these two strikes is 80 ÷ 90 = 0.89, which is near neutral, and OI alone cannot show who initiated those positions or whether they will hold.`,
      },
      tip: `Before entry, write one fact that disagrees with your trade. If you cannot find one, you have not looked hard enough.`,
      visual: { kind: 'oi', title: 'The same OI, two readings', rows: [{ strike: 23800, ce: 20, pe: 80 }, { strike: 24000, ce: 60, pe: 60 }, { strike: 24200, ce: 90, pe: 25 }], spot: 24000 },
    },
    {
      t: 10,
      def: `Contrarian positioning means taking the opposite side of an extreme crowd mood, such as selling or hedging when everyone is euphoric, or looking for buys when there is panic. It needs evidence of extremes, not just disagreement.`,
      hi: `Contrarian positioning ka matlab hai extreme crowd mood ke ulta side lena, jaise sab khush hon toh hedge ya sell, aur panic mein buying ke mauke dekhna. Isme extreme ka saboot chahiye, sirf disagree karna kaafi nahi.`,
      how: `Contrarian tools include a very high or very low put-call ratio, an extreme India VIX, and one-sided OI. They are context, not a trigger: an extreme can last for weeks. A common mistake is to fade a trend too early and be run over. A cautious contrarian waits for a sign that the crowd is wrong, such as price failing to make a new high on strong news, and risks only a small amount until then.`,
      eg: {
        title: 'PCR at an extreme',
        text: `Illustrative: total put OI 1.2 crore and call OI 1.0 crore give PCR = 1.2 ÷ 1.0 = 1.2; this means more puts than calls. If PCR falls to 0.6 (e.g. puts 60 lakh and calls 1.0 crore), the crowd has many more calls: that may mean complacent bullishness, but in a strong uptrend PCR can stay low for weeks, so it is not a sell signal on its own.`,
      },
      tip: `Contrarian does not mean "always opposite". Wait for the crowd to be extreme and for price to stop confirming it.`,
      visual: { kind: 'gauge', title: 'PCR (illustrative reading bands)', min: 0.3, max: 1.8, value: 0.6, zones: [{ from: 0.3, to: 0.7, label: 'Call-heavy', tone: 'neutral' }, { from: 0.7, to: 1.2, label: 'Balanced', tone: 'gold' }, { from: 1.2, to: 1.8, label: 'Put-heavy', tone: 'neutral' }] },
      calc: { id: 'pcr', preset: { putOI: 6000000, callOI: 10000000, putVol: 0, callVol: 0 }, why: 'Compute PCR from OI and judge whether it is extreme.' },
    },
  ],
  tools: [{ id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: 'Turn a VIX reading into an expected one-day move.' }],
}
export default m
