import type { ModuleLesson } from '../topicLessonTypes'

/* Module 17.2 — Market Profile.
 * All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification), TPO tick 10 points, 30-minute brackets.
 * Market Profile was developed by J. Peter Steidlmayer at the Chicago Board of Trade and popularised for wider use by James Dalton. It describes
 * where the market spent TIME; it does not predict direction. */
const m: ModuleLesson = {
  moduleId: '17.2',
  intro: `Market Profile redraws the day as a sideways histogram of time spent at each price, instead of price against the clock. The fat part shows where buyers and sellers agreed on value; thin parts and tails show where the market moved fast and was rejected. For an options trader it is a way to find the levels the market has accepted, so strikes and stop-losses are placed against structure rather than a round number.`,
  introHi: `Market Profile din ko ek sideways histogram bana deta hai jo dikhata hai ki market ne kis price par kitna time bitaya, na ki price vs clock. Jo hissa mota hai wahan buyers aur sellers value par agree hue, aur patle hisse ya tails batate hain ki market tezi se gaya aur wapas dhakela gaya. Options trader ke liye yeh accepted levels dhoondhne ka tareeka hai, taaki strike aur stop-loss round number par nahi balki structure ke hisaab se lage.`,
  steps: {
    concept: `Market Profile groups price into small rows and the day into 30-minute brackets named A, B, C and so on. Each bracket that trades at a price drops a letter (a TPO, Time Price Opportunity) into that row. Over a day the letters pile up into a shape. Prices with many letters are accepted value; prices with one or two letters were visited quickly and the market did not stay.`,
    conceptHi: `Market Profile price ko chhoti rows mein aur din ko 30-minute ke brackets (A, B, C...) mein baant deta hai. Jis bracket mein jis price par trade hua, us row mein ek letter (TPO) lag jaata hai. Din ke end tak letters milkar ek shape bana lete hain. Jis price par bahut letters hain woh accepted value hai; jahan sirf ek-do letters hain, wahan market jaldi se guzar gaya aur ruka nahi.`,
    mechanism: `The NSE cash session runs 9:15 to 15:30, which gives 13 brackets: A = 9:15, B = 9:45, C = 10:15, D = 10:45, E = 11:15, F = 11:45, G = 12:15, H = 12:45, I = 13:15, J = 13:45, K = 14:15, L = 14:45 and a short M from 15:15 (check current NSE timings, which have been revised for some contracts). The row with the most letters is the Point of Control. Rows holding about 70% of all letters form the Value Area. The first hour (A and B) sets the Initial Balance. A profile can be built on the NIFTY index itself because it needs time, not volume; many traders use NIFTY futures to match what they can trade.`,
    example: {
      title: 'One illustrative NIFTY day',
      text: `Rows are 10 points. The day ends with 120 letters in total. The row at 24,060 has 22 letters, the most, so POC = 24,060. Seventy percent of 120 is 84. Start at POC (22), add the pair above (24,070 with 18 and 24,080 with 14 = 32): 54. Compare the next pair above (24,090 with 9 and 24,100 with 6 = 15) with the pair below (24,050 with 17 and 24,040 with 13 = 30); take the larger, 30: 54 + 30 = 84. Value Area is 24,040 to 24,080, with VAH 24,080, VAL 24,040. Tomorrow, an open above 24,080 or below 24,040 is a first clue about whether the market accepts new value.`,
    },
    chart: {
      kind: 'bars',
      title: 'Letters (TPOs) per row — illustrative day',
      caption: 'The longest bar is POC (24,060). Rows 24,040 to 24,080 hold 84 of 120 letters = the 70% Value Area. Thin rows at the ends are the tails.',
      unit: ' TPO',
      items: [
        { label: '24,110', value: 3, tone: 'neutral' },
        { label: '24,100', value: 6, tone: 'neutral' },
        { label: '24,090', value: 9, tone: 'neutral' },
        { label: '24,080 VAH', value: 14, tone: 'gold' },
        { label: '24,070', value: 18, tone: 'gold' },
        { label: '24,060 POC', value: 22, tone: 'gold' },
        { label: '24,050', value: 17, tone: 'gold' },
        { label: '24,040 VAL', value: 13, tone: 'gold' },
        { label: '24,030', value: 8, tone: 'neutral' },
        { label: '24,020', value: 5, tone: 'neutral' },
        { label: '24,010', value: 3, tone: 'neutral' },
        { label: '24,000', value: 2, tone: 'neutral' },
      ],
    },
    optionChain: `A profile and an option chain answer different questions. The profile says where the underlying spent time; the chain says where contracts are open. When the POC or VAH of the last few days sits near a strike with large OI, that strike may attract attention, but high OI is a potential level, not a guaranteed support or resistance, and OI alone cannot show who initiated the trade. Use the profile to pick the zone, then use the chain to choose strikes and judge how much premium is on offer there.`,
    psychology: `Time spent at a price means both sides were willing to trade there for long enough, so it is called fair value. A quick move away that leaves one or two letters means one side was far more eager than the other and the other side did not follow. Traders who ignore this often chase the quick move after it is over, and buy options at inflated premium just where the market is most likely to retest value.`,
    scenarios: {
      bullish: `Price opens above yesterday's VAH, builds a new row of letters there and the POC moves up through the day. That is higher value migration. It supports a bullish view but does not guarantee it; a close back inside the old Value Area warns the move was not accepted.`,
      bearish: `Price opens below yesterday's VAL and keeps printing a new cluster lower, with the POC drifting down, and with single prints on the way down left unrevisited. Sellers are accepting lower value. A quick return into the old range would weaken the case.`,
      sideways: `Price stays inside yesterday's value, forms a fat, symmetrical profile with POC mid-range and tails at both ends. The market agrees on fair value and mean-reverts; long option premium then loses to time unless range edges give a clean risk-defined entry.`,
    },
    practice: [
      { q: `A day has 150 TPOs in total. What number of TPOs must the Value Area hold?`, a: `70% of 150 = 0.70 × 150 = 105 TPOs. You start at the POC and add the larger pair above or below until you reach at least 105.` },
      { q: `The NSE session is 9:15 to 15:30. Which bracket letter covers 12:15 to 12:45?`, a: `A = 9:15, B = 9:45, C = 10:15, D = 10:45, E = 11:15, F = 11:45, G = 12:15. So the bracket is G (check current exchange timings).` },
      { q: `The Initial Balance high is 24,060 and the low is 24,000. What is the IB range, and how large is it against a one-day 1σ move of about 176 points (VIX 14)?`, a: `IB range = 24,060 − 24,000 = 60 points. 60 ÷ 176 ≈ 0.34, so the first hour covered about a third of a one-sigma day. VIX is expected volatility, not a forecast of direction.` },
      { q: `Yesterday's Value Area was 24,040 to 24,080. Today opens at 24,120 and the first hour holds above 24,080. What may this suggest, and what could prove it wrong?`, a: `It may suggest the market is looking for higher value (higher value migration). It is wrong if price falls back into 24,040 to 24,080 and builds the day's profile there; that is a failed attempt to leave value.` },
    ],
    assignment: `Pick the last 5 trading days of NIFTY (spot or futures). On a free charting platform that has TPO, or by hand with 30-minute candles in 10-point rows, mark POC, VAH, VAL and the Initial Balance for each day. For each next morning write whether the open was inside value, above or below, and what happened in the first hour. Count how many times an open outside value was accepted or rejected. Do not trade on it yet; only record.`,
  },
  topics: [
    {
      t: 1,
      def: `A TPO chart plots price on the vertical axis and stacks letters sideways, one letter for each 30-minute bracket that traded at that price. It shows how much time the market spent at each price, not how many contracts traded. The finished shape is called the profile.`,
      hi: `TPO chart mein price vertical hota hai aur har 30-minute bracket jis price par trade hua, us row mein ek letter sideways lag jaata hai. Isse dikhta hai ki market ne kis price par kitna time bitaya, kitne contracts trade hue yeh nahi. Din ke end mein jo shape banta hai use profile kehte hain.`,
      how: `The chart software divides price into rows (a TPO tick, for example 10 points for NIFTY) and the day into brackets. If the 9:15 to 9:45 candle covered 24,000 to 24,050, every row from 24,000 to 24,050 gets an A. Next bracket gets a B in every row it touched, and so on. Because letters depend on time only, a profile can be built even for the NIFTY index, which has no volume of its own. The tick and bracket length are settings, so two traders can see slightly different profiles of the same day.`,
      eg: {
        title: 'Reading a small TPO column',
        text: `Suppose 24,060 holds the letters A B C D E F G H I J (10 letters, since the price was visited in 10 brackets) and 24,100 holds only F. Ten brackets at 24,060 means about 10 × 30 = 300 minutes were spent there; one bracket at 24,100 means the market touched it for part of one half-hour and left.`,
      },
      tip: `A TPO is time, not volume. Do not call the fattest row "the most traded price" unless you have checked volume as well.`,
      visual: { kind: 'flow', title: 'How the letters are built', steps: [{ label: '30-min bracket trades', note: 'A = 9:15 to 9:45', tone: 'ice' }, { label: 'Mark every row touched', note: 'one letter per row', tone: 'gold' }, { label: 'Repeat B, C, D...', note: 'until 15:30', tone: 'gold' }, { label: 'Profile emerges', note: 'wide = accepted, thin = rejected', tone: 'neutral' }] },
    },
    {
      t: 2,
      def: `Time Price Opportunity is the full name of one letter on the profile. It marks that a price was available to trade in a given time bracket. Counting TPOs per row tells you how long the market remained interested in that price.`,
      hi: `Time Price Opportunity us ek letter ka poora naam hai jo profile par lagta hai. Iska matlab hai ki us bracket mein woh price trade karne ke liye available tha. Har row ke TPOs gin kar pata chalta hai ki market kitni der tak us price mein interested raha.`,
      how: `The idea is that a price which attracted trade bracket after bracket gave both buyers and sellers repeated opportunity, and the market kept using it: that is where it considers value fair. A price touched in a single bracket did not hold participants for long. Steidlmayer designed this at the Chicago Board of Trade as a way to see the auction process; on NSE it is applied to NIFTY and BANKNIFTY futures and index spot. TPO counts can only describe the past; they never promise the next move.`,
      eg: {
        title: 'Counting opportunities',
        text: `In the illustrative day, row 24,060 holds 22 TPOs, row 24,100 holds 6 and row 24,000 holds 2. The ratio 22 : 2 = 11 : 1 says 24,060 was used eleven times as often as 24,000. Total across all rows is 120, so 24,060 alone is 22 ÷ 120 = 18.3% of the day's TPOs.`,
      },
      tip: `Count TPOs per row before you call a level important. A level touched once is a mention, not a conversation.`,
      visual: { kind: 'bars', title: 'TPO count per row', unit: ' TPO', items: [{ label: '24,100', value: 6, tone: 'neutral' }, { label: '24,070', value: 18, tone: 'gold' }, { label: '24,060', value: 22, tone: 'gold' }, { label: '24,030', value: 8, tone: 'neutral' }, { label: '24,000', value: 2, tone: 'neutral' }] },
    },
    {
      t: 3,
      def: `The Point of Control (POC) is the price row with the most TPOs. It is the price at which the market spent the most time during the session, so it acts as the day's centre of fair value.`,
      hi: `Point of Control (POC) woh price row hai jisme sabse zyada TPOs hote hain. Matlab din mein market ne sabse zyada time isi price par bitaya, isliye ise din ke fair value ka centre maana jaata hai.`,
      how: `You find the longest row of the profile. If two rows tie, many platforms take the one closer to the middle of the range, but check your software. Yesterday's POC is often carried to the next day's chart as a reference, because the market may revisit it to test whether value is still accepted. A level being a POC does not guarantee a bounce; price can move through it quickly if news or flows change the view.`,
      eg: {
        title: 'Using yesterday\'s POC',
        text: `Yesterday's POC was 24,060. Today NIFTY gaps up to 24,140 and the call strikes you look at are 24,150 and 24,200. A fall back to 24,060 would be 80 points, or 0.33% of spot, and is a natural level to watch. Illustrative: if you were short the 24,200 CE and price returned to the POC, the premium would fall, but nothing says it must stop there.`,
      },
      tip: `POC is a reference, not a prediction. Treat it as the price the market considers fair, and ask whether today's trading is accepting it or leaving it.`,
      visual: { kind: 'bars', title: 'Finding POC', caption: 'POC is the longest bar.', unit: ' TPO', items: [{ label: '24,080', value: 14, tone: 'neutral' }, { label: '24,070', value: 18, tone: 'neutral' }, { label: '24,060 POC', value: 22, tone: 'gold' }, { label: '24,050', value: 17, tone: 'neutral' }, { label: '24,040', value: 13, tone: 'neutral' }] },
    },
    {
      t: 4,
      def: `Value Area High (VAH) is the top edge of the Value Area, the range that holds about 70% of the day's TPOs. It marks the upper boundary of where the market agreed on value.`,
      hi: `Value Area High (VAH) us Value Area ka upar wala kinara hai jisme din ke lagbhag 70% TPOs aate hain. Yeh batata hai ki upar ki taraf market kahan tak value par agree hua.`,
      how: `The 70% figure comes from the idea of about one standard deviation under a normal curve. The calculation starts at the POC and adds rows in pairs above and below, always taking the larger pair, until 70% of TPOs are covered; the upper end is VAH. An open above the previous VAH, if accepted, may start a new higher value; if price re-enters the old Value Area, traders often look toward the opposite edge, which is a rule of thumb, not a law.`,
      eg: {
        title: 'VAH from the worked day',
        text: `Using the profile with 120 TPOs: 70% = 84. Starting at POC 24,060 (22), adding 24,070 and 24,080 (18 + 14 = 32) gives 54; adding 24,050 and 24,040 (17 + 13 = 30) gives 84. The highest row included is 24,080, so VAH = 24,080. If NIFTY opens at 24,095 tomorrow, it is 15 points above VAH.`,
      },
      tip: `Wait for acceptance above VAH (price stays there for a couple of brackets) before calling it a breakout; a poke above and a fall back inside is not acceptance.`,
      visual: { kind: 'candles', title: 'Test of VAH', caption: 'Price probes above VAH, fails to hold and returns into value.', pattern: 'falseBreakout', level: { price: 24080, label: 'VAH 24,080' } },
    },
    {
      t: 5,
      def: `Value Area Low (VAL) is the bottom edge of the Value Area. It marks the lower boundary of where the market agreed on value for the session.`,
      hi: `Value Area Low (VAL) Value Area ka neeche wala kinara hai. Yeh batata hai ki neeche ki taraf market kahan tak value par agree hua tha.`,
      how: `It is found with the same pairs method as VAH but taking the lowest row included. A move below the previous VAL that is accepted may start lower value; one that is rejected may revert to the POC or VAH. Traders also combine VAL with prior-day lows and, for options, with the nearest strike carrying large put OI, but a big OI is only a potential level and not a promise of support.`,
      eg: {
        title: 'VAL as a risk line',
        text: `With VAL = 24,040, suppose you buy a 24,000 CE only if NIFTY pulls back to 24,050 and holds. You place your invalidation just below VAL at 24,035. If NIFTY breaks 24,035 and holds below for two brackets, your idea is wrong. Distance from entry = 24,050 − 24,035 = 15 points; at delta 0.5 that is about ₹7.5 per unit, or 7.5 × 65 = ₹487.5 per lot, before costs (illustrative).`,
      },
      tip: `Use VAL to define where your idea fails, not just where you hope to enter. A level with no invalidation is a guess.`,
      visual: { kind: 'candles', title: 'Acceptance below VAL', caption: 'A close and hold below VAL may start lower value.', pattern: 'breakdown', level: { price: 24040, label: 'VAL 24,040' } },
      calc: { id: 'option-pnl', preset: { optType: 'CE', side: 'buy', strike: 24000, premium: 70, expiryPrice: 24035, lotSize: 65, lots: 1 }, why: 'Shows what a long 24,000 CE is worth if the VAL idea fails and price expires around 24,035.' },
    },
    {
      t: 6,
      def: `The Initial Balance (IB) is the price range of the first hour of trading (brackets A and B, 9:15 to 10:15 on NSE). It is the market's first attempt at balance between buyers and sellers each day.`,
      hi: `Initial Balance (IB) pehle ek ghante (bracket A aur B, yaani 9:15 se 10:15) ka price range hota hai. Yeh din ke shuru mein buyers aur sellers ka balance dhoondhne ka pehla prayas hai.`,
      how: `The IB high and low are drawn once the first hour ends. How the rest of the day relates to the IB tells you the type of day. If price stays inside the IB, the day is likely balanced. If it pushes beyond one side and holds, the day is extending. A narrow IB relative to recent days hints that a larger move may come, but this is a tendency, not a rule. The first hour on NSE also carries the opening gap, overnight global cues and the burst of orders at the open, so IB size changes with event days.`,
      eg: {
        title: 'IB against expected move',
        text: `IB high 24,060, low 24,000: range 60 points. The one-day 1σ move at VIX 14 is 24,000 × 0.14 × √(1/365) ≈ 176 points. The IB is 60 ÷ 176 ≈ 34% of that. If by 1 pm NIFTY is at 24,150, price is 90 points above IB high, 150 above IB low, and has already travelled more than the IB itself: an extension.`,
      },
      tip: `The IB is a reference frame for the day, not a signal. Note whether price is inside, extending or rejecting the IB before you think about options.`,
      visual: { kind: 'timeline', title: 'Initial Balance on NSE', events: [{ when: '9:15 to 9:45 (A)', what: 'First bracket; opening range forms' }, { when: '9:45 to 10:15 (B)', what: 'Second bracket completes the IB', tone: 'gold' }, { when: 'After 10:15', what: 'Inside IB = balance; beyond IB = extension', tone: 'ice' }] },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: 'Gives the one-day 1σ range (about 176 points) to compare with the IB.' },
    },
    {
      t: 7,
      def: `The developing POC is the POC as it stands at the moment, updated bracket by bracket as new TPOs are added. Watching it move shows whether the day's centre of value is rising, falling or stationary.`,
      hi: `Developing POC woh POC hai jo abhi tak ke TPOs ke hisaab se chal raha hai aur har bracket ke saath badalta rehta hai. Ise dekhkar pata chalta hai ki din ka value centre upar ja raha hai, neeche ja raha hai ya ek jagah tika hai.`,
      how: `At 10:15 the POC may be 24,030. By 12:15 it may have moved to 24,060 and by close to 24,070. A steadily rising developing POC means each new bracket is trading higher than the last, which may be accepted higher value, and a flat one means the market is balancing. A sudden jump in the POC often comes after a trend leg or news. Because the final POC is known only after close, the developing POC is a live guide and may still shift.`,
      eg: {
        title: 'POC drifting up through the day',
        text: `Illustrative: POC at 10:15 = 24,030; 12:45 = 24,050; 15:30 = 24,070. The move is 24,070 − 24,030 = 40 points, 0.17% of spot, across 5 hours and 15 minutes. Compare a day with POC fixed at 24,050 throughout: same range perhaps, but much more balanced.`,
      },
      tip: `Look at the direction of the developing POC, not just the price. Price can rise on thin trade while POC stays put, and that rise is weaker.`,
      visual: { kind: 'timeline', title: 'Developing POC (illustrative)', events: [{ when: '10:15', what: 'POC 24,030' }, { when: '12:45', what: 'POC 24,050', tone: 'gold' }, { when: '15:30', what: 'POC 24,070; value has migrated up', tone: 'bull' }] },
    },
    {
      t: 8,
      def: `Single prints are price rows where only one TPO letter sits, in the middle of a profile. They mark a part of the move where price travelled fast and no one stopped to trade. They show up as a thin strip joining two thicker parts.`,
      hi: `Single prints woh rows hain jahan profile ke beech mein sirf ek hi letter hota hai. Yahan price bahut tezi se guzra aur kisi ne ruk kar trade nahi kiya. Yeh do mote hisson ko jodne wali patli patti jaisa dikhte hain.`,
      how: `A single-print zone usually forms after a burst of aggressive buying or selling, such as a results surprise, a news headline or a stop-loss run. Because little business was done there, later sessions may revisit the zone to trade it properly, and it can act as support or resistance or be filled in. This is a tendency; many single prints stay unfilled for days. Do not confuse them with tails: single prints at the very end of a range are an excess, while single prints inside the profile separate two areas of value.`,
      eg: {
        title: 'A strip of single prints',
        text: `Illustrative: at 11:15 NIFTY moves from 24,060 to 24,110 in one 30-minute bracket (E), then trades at 24,110 onward in later brackets. Rows 24,070, 24,080, 24,090, 24,100 each have only an E. That is a 40-point gap in time. If NIFTY falls back next day to 24,100 to 24,070 and trades there for several brackets, the single prints are being filled.`,
      },
      tip: `Mark single-print zones on the chart but do not assume they must be filled. They are areas of interest, and the reaction on arrival is what matters.`,
      visual: { kind: 'candles', title: 'Fast move leaves a gap in time', caption: 'A rapid move upward with no rest leaves single prints behind.', pattern: 'breakout' },
    },
    {
      t: 9,
      def: `Excess highs and lows are tails at the extreme of a profile: two or more single prints at the top or bottom where price pushed out and was quickly rejected. They show that the market tried a price and decided it was not acceptable.`,
      hi: `Excess highs aur lows profile ke sabse upar ya neeche ke tails hote hain: do ya zyada single prints jahan price dhakka maarkar jaldi wapas aa gaya. Isse pata chalta hai ki market ne woh price try kiya aur use accept nahi kiya.`,
      how: `A tail at the high suggests buyers pushed too far and sellers took over; a tail at the low suggests the opposite. The longer and cleaner the tail, the stronger the rejection, but the interpretation depends on the context: a tail after a long trend can be exhaustion, and a tail in a balanced day shows the edge of the range. Some traders place invalidation just beyond the tail. Tails are also where stop-loss orders may have been triggered, so they overlap with liquidity ideas covered in the next module.`,
      eg: {
        title: 'A tail at the high',
        text: `Illustrative day: NIFTY spikes to 24,110 in the last bracket before returning to 24,070. Rows 24,110, 24,100 and 24,090 carry one letter each: a 3-row tail of 20 points above the previous high row. Tomorrow, an open below 24,090 and failure to climb back above the tail supports the idea that the high was rejected; a move above 24,110 on volume says it was not.`,
      },
      tip: `A tail is a clue, not a signal. Confirm with what price does the next session, especially whether it returns to the tail zone.`,
      visual: { kind: 'candles', title: 'Excess high: spike and reject', pattern: 'falseBreakout', level: { price: 24100, label: 'Tail zone' } },
    },
    {
      t: 10,
      def: `Value migration is the movement of the Value Area from one day to the next. If each day's value sits higher, value is migrating up; if lower, down; if overlapping, the market is balanced.`,
      hi: `Value migration ka matlab hai ek din se doosre din Value Area ka khisakna. Agar har din ki value pichle din se upar hai toh value upar migrate ho rahi hai, neeche hai toh neeche, aur overlap ho toh market balanced hai.`,
      how: `You compare today's Value Area with yesterday's. If today's VAL is above yesterday's VAH, there is no overlap, and the shift is strong. Partial overlap is a milder shift. Several days of rising value alongside rising price describe an uptrend accepted by the market; price rising while value stays behind suggests a weaker move. For option traders it helps in deciding which side to favour and when a range-based approach is more suitable.`,
      eg: {
        title: 'Three days of value (illustrative)',
        text: `Day 1 VA: 24,040 to 24,080. Day 2 VA: 24,070 to 24,120. Day 3 VA: 24,110 to 24,160. Day 2 overlaps day 1 by 10 points, day 3 overlaps day 2 by 10 points: value migrated up about 40 points per day for 2 days. Mean of day 1 to day 3 VAH moved from 24,080 to 24,160, a 80-point climb (0.33%). A day 4 profile back at 24,060 to 24,100 would break the pattern.`,
      },
      tip: `Value migration tells you where the market is agreeing, not where it must go. Always note the first day it stops migrating.`,
      visual: { kind: 'bars', title: 'Value Area highs over three days', unit: '', items: [{ label: 'Day 1 VAH', value: 24080, tone: 'gold' }, { label: 'Day 2 VAH', value: 24120, tone: 'gold' }, { label: 'Day 3 VAH', value: 24160, tone: 'gold' }] },
      calc: { id: 'return-calc', preset: { start: 24080, end: 24160, years: 1 }, why: 'Quantifies the 80-point upward migration in percentage terms (0.33%).' },
    },
  ],
  tools: [{ id: 'expected-move' }, { id: 'pivot-levels' }],
}
export default m
