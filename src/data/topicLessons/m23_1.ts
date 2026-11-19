import type { ModuleLesson } from '../topicLessonTypes'

/* Module 23.1 - Individual Trading Psychology.
 * All numbers illustrative: NIFTY about 24,000, lot 65 (check the current NSE contract specification).
 * SEBI's FY25 study of individual equity-derivative traders (published July 2025) found over 91% made net losses
 * after costs, with an aggregate net loss of about Rs 1,05,603 crore (FY24: about Rs 74,812 crore). */
const m: ModuleLesson = {
  moduleId: '23.1',
  intro: `Most option losses are not caused by a wrong view alone but by what the trader does with the view: exiting in fear, holding in greed, doubling after a loss. This module names the ten most common emotions and biases and shows the rule that contains each one. SEBI's own FY25 study found that over 91% of individual traders in equity derivatives made net losses after costs, so behaviour is not a side topic.`,
  introHi: `Zyadatar option losses sirf galat view se nahi hote, balki is baat se hote hain ki trader apne view ke saath kya karta hai: dar mein exit, lalach mein hold, loss ke baad double. Yeh module das sabse common emotions aur biases ko naam deta hai aur har ek ko control karne wala rule dikhata hai. SEBI ki FY25 study mein 91% se zyada individual derivatives traders ka net loss tha, toh behaviour koi side topic nahi hai.`,
  steps: {
    concept: `Trading psychology is the study of how your emotions and mental shortcuts change your decisions when money is at stake. A bias is a repeatable error, not a one-off mistake, so it can be listed, tracked and fenced with rules. You cannot remove emotion, but you can decide in advance what you will do when the emotion arrives.`,
    conceptHi: `Trading psychology ka matlab hai ki paisa daav par ho toh aapke emotions aur mental shortcuts aapke decisions ko kaise badalte hain. Bias ek repeat hone wali galti hai, ek baar ki chook nahi, isliye usse list kiya ja sakta hai, track kiya ja sakta hai aur rules se bandha ja sakta hai. Emotion ko hataya nahi ja sakta, lekin aap pehle se tay kar sakte ho ki emotion aane par kya karoge.`,
    mechanism: `Options make emotions louder in three ways. Premium moves in percentage terms far faster than the index, so a small index move can swing your P&L by 30% to 50% within minutes. Time decay (theta) creates a ticking clock that pushes buyers to act. Leverage means one oversized trade can erase many small wins. Each bias then sits at a specific decision point: entry (FOMO, overconfidence), holding (greed, anchoring, loss aversion), exit (fear) and after the exit (revenge, recency).`,
    example: {
      title: 'One day, four emotions (illustrative)',
      text: `A trader with ₹2,00,000 buys one lot (65) of the 24,000 CE at ₹120, a cost of ₹7,800. It dips to ₹90 and fear makes him exit: loss (120 − 90) × 65 = ₹1,950. It then rallies to ₹190 and FOMO makes him buy 3 lots at ₹190, which is 3 × 65 × 190 = ₹37,050. The premium falls to ₹150 and he exits with a loss of (190 − 150) × 65 × 3 = ₹7,800. Total damage ₹9,750, which is 4.9% of capital, from one view that was right at the start.`,
    },
    chart: {
      kind: 'flow',
      title: 'Where each bias strikes in a trade',
      caption: 'Match the bias to the stage, then place a rule at that stage.',
      steps: [
        { label: 'Before entry', note: 'FOMO, overconfidence, confirmation bias', tone: 'gold' },
        { label: 'While holding', note: 'Greed, anchoring, loss aversion', tone: 'ice' },
        { label: 'At exit', note: 'Fear, early exit, no exit', tone: 'bear' },
        { label: 'After exit', note: 'Revenge trade, recency bias', tone: 'neutral' },
      ],
    },
    optionChain: `The option chain does not show your emotions, but it triggers them. Seeing a premium double on a far-OTM strike invites FOMO, and a fat OI number at a strike invites confirmation bias because you read it as support for your view. Remember that OI alone cannot show who initiated a trade and that high OI is a potential level, not a guaranteed one. Pick your strike and exit level before opening the chain screen, not after watching it tick.`,
    psychology: `Fear and greed are mirror images: fear cuts winners short and greed lets losers run. Loss aversion makes a loss feel roughly twice as painful as an equal gain feels good (a well-known finding in behavioural economics), so people hold losers to avoid pain. Writers feel the same pressures from the other side: a writer who is down on a short option may add lots to average the price, which is revenge in a different form.`,
    scenarios: {
      bullish: `A rally tests greed and FOMO. The disciplined plan is to enter on your own setup, book part of the profit at the planned target and trail the rest. Chasing after a 150-point candle usually means buying the most expensive premium of the day.`,
      bearish: `A sharp fall tests fear and loss aversion. Put buyers may exit too early out of nervousness, and call holders may refuse to exit hoping for a bounce. A written stop-loss decides for you before the stress arrives.`,
      sideways: `A dull market tests patience and breeds overtrading. Premium bleeds with theta, so boredom trades often lose to costs alone. Doing nothing is a valid position.`,
    },
    practice: [
      {
        q: `You bought 1 lot (65) of a call at ₹120 and exit at ₹90 out of fear. What is the loss, and what would the profit have been if you had held to ₹190?`,
        a: `Loss at exit = (120 − 90) × 65 = ₹1,950. Profit at ₹190 would have been (190 − 120) × 65 = ₹4,550. The swing is ₹6,500, but the exit may have been correct if your stop-loss said so. The error is exiting from fear without a rule, not exiting.`,
      },
      {
        q: `Your account is ₹5,00,000. You lose 20% in a bad month. What gain do you need to recover, and what if the loss were 50%?`,
        a: `Recovery = 1 / (1 − loss) − 1. For 20%: 1 / 0.8 − 1 = 25%. For 50%: 1 / 0.5 − 1 = 100%. Deeper holes need disproportionately bigger gains, which is why cutting a loss early matters more than the pain of booking it.`,
      },
      {
        q: `You lose ₹4,000 on one lot, then take a revenge trade with 3 lots that loses ₹4,000 per lot. What is the total loss as a percentage of ₹2,00,000?`,
        a: `Revenge loss = 3 × 4,000 = ₹12,000. Total = 4,000 + 12,000 = ₹16,000. Percentage = 16,000 / 2,00,000 = 8%. The first loss was 2%, so the emotional trade quadrupled the damage.`,
      },
      {
        q: `With ₹5,00,000 capital, a 1% risk rule, entry ₹120 and stop ₹90 on a 65-lot, how many lots may you buy?`,
        a: `Risk allowed = 1% × 5,00,000 = ₹5,000. Risk per lot = (120 − 90) × 65 = ₹1,950. Lots = 5,000 / 1,950 = 2.56, so 2 lots (rounding down). Total risk = 2 × 1,950 = ₹3,900.`,
      },
    ],
    assignment: `For the next ten trades, add one line in your journal: which emotion did I feel at entry and at exit (fear, greed, FOMO, boredom, anger, none)? After ten trades count the emotions and write one rule against the most frequent one.`,
  },
  topics: [
    {
      t: 1,
      def: `Fear is the urge to avoid loss, and in trading it makes you exit a good trade too early or skip a valid setup. It is a natural response, but when it decides instead of a rule, it cuts winners short.`,
      hi: `Fear matlab loss se bachne ki ghabrahat. Trading mein yeh aapko achhe trade se jaldi bahar nikal deta hai ya valid setup ko skip karwa deta hai. Yeh natural hai, lekin jab rule ki jagah fear decide karta hai toh winners chhote reh jaate hain.`,
      how: `An option premium can fall 25% on a 30-point index wobble, which feels like a crisis even when your plan allows it. The brain reads the red number as danger and wants it to stop. Traders then exit at the exact point where the stop-loss was not yet hit, and the move continues. The fix is to size small enough that a normal wobble does not hurt, and to place the exit level before entering.`,
      eg: { title: 'Exit on a wobble', text: `You buy one lot (65) of the 24,000 CE at ₹120 with a planned stop at ₹80. It dips to ₹90 and you exit at ₹90, a loss of 30 × 65 = ₹1,950. The stop was ₹40 away, so you gave up ₹650 of room (10 × 65) and the option later trades at ₹190. The loss was real, but nothing in your plan asked for it.` },
      tip: `Decide your exit before you enter; if a normal wobble scares you, your size is too large.`,
      visual: { kind: 'flow', title: 'Fear loop', caption: 'The loop ends when a written exit replaces the feeling.', steps: [{ label: 'Premium dips', tone: 'bear' }, { label: 'Fear spikes', tone: 'gold' }, { label: 'Exit early', tone: 'neutral' }, { label: 'Price recovers, regret', tone: 'ice' }] },
    },
    {
      t: 2,
      def: `Greed is the urge to take more profit than your plan says. It makes you ignore targets, add to winners at the wrong time and hold until a gain turns into a loss.`,
      hi: `Greed matlab plan se zyada profit ka lalach. Isme aap target ignore karte ho, galat jagah par winner mein add karte ho aur tab tak hold karte ho jab tak gain loss mein na badal jaye.`,
      how: `Greed is strongest after a quick gain because the mind treats the new profit as already earned and the next target as a right. Option buyers face an extra trap: theta and mean-reverting premiums mean a paper gain can disappear quickly, especially on expiry day. A rule such as booking half at 1R and trailing the rest turns greed into a plan.`,
      eg: { title: 'Gain that vanished', text: `A trader buys 1 lot (65) of a 24,000 CE at ₹100. It peaks at ₹160, a paper profit of 60 × 65 = ₹3,900, but he waits for ₹250. By the close the option expires at ₹40, a loss of 60 × 65 = ₹3,900. A plan of trading 2 lots and selling one at ₹150 would have locked (150 − 100) × 65 = ₹3,250 on that lot, even if the second lot later expired worthless.` },
      tip: `A target you do not write down will move up every time price gets near it.`,
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 100, expiryPrice: 24040, lotSize: 65, lots: 1 }, why: `Shows how a gain on paper differs from the result at expiry.` },
    },
    {
      t: 3,
      def: `FOMO, the fear of missing out, is the pull to enter a move that is already under way because others seem to be profiting. It is usually felt after a big candle, not before it.`,
      hi: `FOMO ka matlab hai move chhoot jaane ka dar. Jab market ek bade candle mein bhaag chuka hota hai aur lagta hai sab kama rahe hain, tab aap bina setup ke entry maar dete ho. Yeh aksar bade candle ke baad feel hota hai, usse pehle nahi.`,
      how: `After a 150-point NIFTY run, OTM call premiums have already repriced, implied volatility is often higher and the move is mature. A late entry pays a bigger premium and sits closer to an area where early buyers book profit. Social media and broker apps with top-gainer lists amplify the feeling. A simple filter is to ask whether you would take the trade if the last candle had not happened.`,
      eg: { title: 'Chasing a rally', text: `NIFTY rises from 24,000 to 24,150 in an hour. You buy the 24,200 CE at ₹95, costing 95 × 65 = ₹6,175. The index slips back to 24,080 and the option falls to ₹60. You lose 35 × 65 = ₹2,275, which is 37% of the money you put in, on an index move of only 70 points.` },
      tip: `If your entry reason is "it is running", you are the liquidity for someone who bought earlier.`,
      visual: { kind: 'candles', title: 'Late entry after the move', caption: 'The best risk-to-reward was before the big candle.', pattern: 'breakout', level: { price: 24100, label: 'Entry here is late' } },
    },
    {
      t: 4,
      def: `Revenge trading is taking a quick, often larger trade right after a loss to win the money back. The trade is driven by anger or the wish to be right, not by a setup.`,
      hi: `Revenge trading ka matlab hai loss ke turant baad bada trade lena taaki paisa jaldi wapas aa jaye. Yeh trade setup se nahi, gusse ya sahi sabit hone ki zid se hota hai.`,
      how: `After a loss, adrenaline and wounded pride shorten the time horizon, so traders raise quantity and drop selectivity. Because options are leveraged, the second loss is usually bigger than the first. The control is mechanical: a daily loss limit that closes the terminal and a mandatory pause after two losses in a row. Many brokers let you set a max-loss alert; use it.`,
      eg: { title: 'Doubling into a hole', text: `Capital ₹2,00,000. Trade 1 loses ₹4,000 (2%). Trade 2 is 3 lots on no setup and loses the same ₹4,000 per lot, so ₹12,000. Total ₹16,000, which is 8% of capital in one morning. At that point 8% needs a gain of 1 / 0.92 − 1 ≈ 8.7% to recover.` },
      tip: `Write a daily loss limit (for example 2% of capital) and treat hitting it as the end of the day.`,
      calc: { id: 'position-size', preset: { capital: 200000, riskPct: 1, entry: 100, stop: 70, lotSize: 65 }, why: `Keeps the next trade at a fixed risk regardless of how you feel.` },
    },
    {
      t: 5,
      def: `Overconfidence is believing your skill or view is better than the evidence shows, often after a short winning streak. It leads to larger size, looser stops and less checking.`,
      hi: `Overconfidence ka matlab hai evidence se zyada apne skill par bharosa karna, aksar kuch jeet ke baad. Iska nateeja hota hai bada size, dheele stop aur kam checking.`,
      how: `A run of five wins in options can come from a favourable market phase rather than skill, because small samples are noisy. The trader then raises lots, which raises the size of the one loss that eventually comes. Because loss size is chosen by you and win rate is not, the safest habit is to keep position size tied to capital and to the rule, not to the recent streak.`,
      eg: { title: 'Streak then a big lot', text: `Five trades with 1 lot each win ₹2,000, so ₹10,000 in all. Feeling invincible, he trades 5 lots on the sixth, where each lot loses ₹3,000 on a stop. The loss is 5 × 3,000 = ₹15,000, which erases the whole streak and ₹5,000 more.` },
      tip: `Size should depend on risk per trade, never on how well the last few trades went.`,
      visual: { kind: 'curve', title: 'Equity after a streak and an oversized loss', caption: 'One large loss undoes many small wins.', curve: 'drawdown' },
    },
    {
      t: 6,
      def: `Loss aversion means a loss hurts more than an equal gain pleases. In trading it makes people hold losing positions hoping to break even, and book small gains too soon.`,
      hi: `Loss aversion ka matlab hai ki same size ka loss gain se zyada dard deta hai. Trading mein isliye log losing position ko breakeven ke intezaar mein pakde rehte hain aur chhote gain jaldi book kar lete hain.`,
      how: `Booking a loss makes it real, so people avoid doing so. But the maths is harsh: a loss of 50% needs a 100% gain to recover. Long options also lose time value every day, so waiting for a recovery fights theta. A fixed stop-loss, sized as a small percent of capital, moves the decision from the moment of pain to the moment of planning.`,
      eg: { title: 'Holding to hope', text: `You bought a call at ₹100 and it falls to ₹20. If you sell now, the loss is 80 × 65 = ₹5,200. You wait for ₹100 again, but that needs a 400% rise from ₹20 and the option has two days left. It expires at ₹0 and the loss is 100 × 65 = ₹6,500.` },
      tip: `A loss you refuse to book is still a loss, and the longer you wait the worse the maths gets.`,
      calc: { id: 'drawdown-recovery', preset: { drawdownPct: 50 }, why: `Shows how much gain a given loss needs to recover.` },
    },
    {
      t: 7,
      def: `Confirmation bias is the habit of noticing only the information that agrees with your existing view. The rest is ignored or explained away.`,
      hi: `Confirmation bias ka matlab hai sirf wahi information dekhna jo aapke view se match karti hai. Baaki sab ko ignore ya justify kar dena.`,
      how: `A trader who is bullish reads falling call OI as a sign of unwinding and ignores that heavy call OI still sits just above. The option chain has many numbers, so almost any view can find a supporting row. The cure is to write down what would prove you wrong before entering, and to look at the opposing evidence on purpose.`,
      eg: { title: 'Cherry-picked OI', text: `A bullish trader quotes put OI of 80 lakh at 23,900. He skips that call OI at 24,100 is 1.1 crore. Put-call ratio of these two strikes is 80 / 110 = 0.73, which on its own does not support the bullish view. OI shows positions, not who initiated them, and neither strike is guaranteed support or resistance.` },
      tip: `Before you enter, write down the one fact that would make you exit, and check it first.`,
      calc: { id: 'pcr', preset: { putOI: 8000000, callOI: 11000000, putVol: 0, callVol: 0 }, why: `Forces a look at both sides of the OI picture.` },
    },
    {
      t: 8,
      def: `Recency bias is giving too much weight to what happened recently and assuming it will continue. A few big days make you expect big days, and a quiet week makes you expect calm.`,
      hi: `Recency bias ka matlab hai haal ki ghatnaon ko zyada weight dena aur maan lena ki wahi chalta rahega. Kuch bade din aaye toh lagta hai roz bade aayenge, aur ek shaant hafta aaya toh lagta hai calm hi rahega.`,
      how: `Volatility moves in clusters, so recent behaviour has some information, but not enough to ignore the longer record. Traders who just saw three large expiry-day moves may buy expensive options and those who saw quiet days may sell cheap ones. Compare any belief to a longer sample and to the volatility the market is pricing through India VIX.`,
      eg: { title: 'Three days vs twenty', text: `The last three NIFTY expiry days (illustrative) moved 150, 170 and 140 points, an average of 153. Across the last 20 sessions the average daily range was about 95 points. With VIX at 14 and spot 24,000, the one-day one-standard-deviation move is 24,000 × 0.14 × √(1/365) ≈ 176 points. Treating 153 as the new normal ignores the other 17 sessions.` },
      tip: `Always compare "what happened lately" with a longer sample before changing your strategy.`,
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: `Compares recent moves with what the market is pricing.` },
    },
    {
      t: 9,
      def: `Anchoring bias is fixating on a specific number, such as your buy price or an old index high, and judging every later price against it. The anchor has no connection to what the market will do next.`,
      hi: `Anchoring bias ka matlab hai kisi ek number par atak jaana, jaise aapka buy price ya purana index high, aur har naye price ko usi se compare karna. Us number ka market ke aage ke move se koi lena dena nahi hota.`,
      how: `Your entry price matters to your P&L but not to the market. A trader who says "I will exit when it comes back to my cost" is letting a past price decide a future action. Better anchors are the current value of the option, the stop-loss level and your plan. Ask: would I buy this option now at this price, with this much time left?`,
      eg: { title: 'Waiting for cost', text: `You bought a call at ₹150 and it trades at ₹60 with one day left. Exiting costs (150 − 60) × 65 = ₹5,850. Waiting for ₹150 needs a rise of (150 − 60) / 60 = 150% in a day. Your buy price is the anchor, and the market does not care about it.` },
      tip: `Ask "would I enter this trade now at this price?" If not, your buy price is just an anchor.`,
      visual: { kind: 'bars', title: 'Premium needed to get back to cost', caption: 'The lower the premium, the larger the percentage rise needed.', unit: '%', items: [{ label: 'From ₹120', value: 25, tone: 'gold' }, { label: 'From ₹90', value: 67, tone: 'gold' }, { label: 'From ₹60', value: 150, tone: 'bear' }, { label: 'From ₹30', value: 400, tone: 'bear' }] },
    },
    {
      t: 10,
      def: `Emotional discipline is following your written rules when you feel the opposite urge. It is not the absence of feeling but a system that does not depend on feeling.`,
      hi: `Emotional discipline ka matlab hai ki jab man ulta karne ko kare tab bhi apne likhe hue rules follow karna. Isme emotion khatam nahi hota, bas aap aisa system banate ho jo emotion par depend nahi karta.`,
      how: `Practical discipline is made of small hard limits: risk per trade (for example 1% of capital), a daily loss cap (for example 2%), a maximum number of trades, a pre-trade checklist and a journal. Many traders also set broker alerts and avoid trading when stressed, tired or after a loss. SEBI's FY25 study found that over 91% of individual equity-derivative traders had net losses after costs, which suggests that process matters more than a single clever idea.`,
      eg: { title: 'Rules on paper', text: `Capital ₹5,00,000. Rules: risk 1% per trade (₹5,000), stop trading at 2% daily loss (₹10,000). A trade with entry ₹120 and stop ₹90 on a lot of 65 risks 30 × 65 = ₹1,950 per lot, so 2 lots risk ₹3,900. If three stops hit in a day you lose about ₹11,700, so the cap is reached after the third and the day ends.` },
      tip: `Put your limits in writing before the market opens; a rule made in the heat of a loss is not a rule.`,
      calc: { id: 'position-size', preset: { capital: 500000, riskPct: 1, entry: 120, stop: 90, lotSize: 65 }, why: `Turns the risk rule into a number of lots.` },
    },
  ],
}
export default m
