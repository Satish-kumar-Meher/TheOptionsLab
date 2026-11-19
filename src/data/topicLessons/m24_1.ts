import type { ModuleLesson } from '../topicLessonTypes'

/* Module 24.1 - Trading Data Fundamentals.
 * All numbers illustrative: NIFTY about 24,000, lot 65 (check the current NSE contract specification).
 * Option values from Black-Scholes with r = 6.5 percent, no dividend, 30 calendar days. */
const m: ModuleLesson = {
  moduleId: '24.1',
  intro: `Every backtest, dashboard or journal is only as good as the data under it. This module lists the kinds of market data an options trader uses (prices, futures, option chains, OI, volume, IV, VIX and Greeks) and how often each is recorded. Knowing what each field really means, and what it does not, prevents the most common data mistakes.`,
  introHi: `Har backtest, dashboard ya journal utna hi achha hota hai jitna uske neeche ka data. Is module mein aap dekhoge ki options trader kaun-sa market data use karta hai (prices, futures, option chain, OI, volume, IV, VIX aur Greeks) aur har ek kitni baar record hota hai. Har field ka sahi matlab pata hone se data ki aam galtiyon se bach jaate ho.`,
  steps: {
    concept: `Market data is a record of what traded and what was quoted. Some fields are observed directly (open, high, low, close, volume, open interest). Others are derived by a formula (implied volatility and Greeks). Knowing which is which tells you how much trust to place in each.`,
    conceptHi: `Market data ek record hai ki kya trade hua aur kya quote hua. Kuch fields seedhe observe hote hain (open, high, low, close, volume, open interest). Baaki formula se nikalte hain (implied volatility aur Greeks). Kaun-sa kaisa hai yeh pata ho toh har field par kitna bharosa karna hai yeh samajh aata hai.`,
    mechanism: `Exchange systems such as NSE record each trade and publish end-of-day files, often called bhavcopy, and live feeds through brokers and data vendors. Prices and volume come from the matching engine. Open interest is reported by the clearing corporation. IV is solved backwards from an option's price with a model such as Black-Scholes, and Greeks are then computed from that IV, so they depend on assumptions about rate, dividends and the time convention.`,
    example: {
      title: 'One option, two data types (illustrative)',
      text: `With NIFTY at 24,000, 30 calendar days to expiry, r = 6.5 percent and IV = 14 percent, the Black-Scholes price of the 24,000 CE is about ₹451, with delta 0.56 and theta about −₹8.6 per day. Price is observed; the 14 percent IV and the Greeks are model outputs. If IV rose to 18 percent, the model price would be about ₹559, a rise of roughly ₹108 from the IV change alone.`,
    },
    chart: {
      kind: 'layers',
      title: 'Data layers, from raw to derived',
      caption: 'Higher layers depend on assumptions made in the lower ones.',
      layers: [
        { label: 'Derived: Greeks', note: 'delta, gamma, theta, vega', tone: 'gold' },
        { label: 'Derived: implied volatility', note: 'solved from option price', tone: 'gold' },
        { label: 'Reported: open interest', note: 'clearing corporation', tone: 'ice' },
        { label: 'Observed: price and volume', note: 'matching engine', tone: 'ice' },
      ],
    },
    optionChain: `A chain snapshot combines all these layers for each strike: LTP, bid and ask, OI, OI change, volume and IV, sometimes Greeks. Saving snapshots at fixed times is the only way to rebuild a chain's history, because most free sources show only the current state. Note that the figures on a chain are as of the snapshot time, so always store the timestamp.`,
    psychology: `Traders often trust a number because it is on a screen. Ask where it came from. A derived value such as IV may differ between vendors because of different models and inputs. Treat data as evidence with an error margin, not as truth.`,
    scenarios: {
      bullish: `In a rising market, OI and volume at higher strikes grow. Stored snapshots let you check later whether that was a pattern or a one-off.`,
      bearish: `In a falling market, VIX and put IV tend to rise. Having historical IV lets you see whether current IV is high compared with its own past.`,
      sideways: `In a range, IV and volume often drift lower. Without history, you cannot tell whether the quiet is normal or unusual.`,
    },
    practice: [
      {
        q: `The NSE session is 9:15 to 15:30. How many one-minute and five-minute bars does a full day have?`,
        a: `The session is 6 hours 15 minutes = 375 minutes. One-minute bars = 375. Five-minute bars = 375 / 5 = 75.`,
      },
      {
        q: `OI at a strike was 80 lakh units yesterday and 92 lakh today. What is the OI change in units and percent?`,
        a: `Change = 92 − 80 = 12 lakh units. Percent = 12 / 80 = 15 percent. This tells you contracts increased, not who bought or sold.`,
      },
      {
        q: `India VIX is 14 and its 1-year low and high are 11 and 21. What is the IV rank?`,
        a: `IV rank = (14 − 11) / (21 − 11) = 3 / 10 = 30 percent. VIX is in the lower part of its past-year range. It does not predict direction.`,
      },
      {
        q: `Spot closes at 24,060 and the near-month futures close at 24,110. What is the basis?`,
        a: `Basis = futures − spot = 24,110 − 24,060 = 50 points. A positive basis is normal because futures include the cost of carry.`,
      },
    ],
    assignment: `Open any free source of NSE end-of-day data and download one day's option-chain or bhavcopy file. Make a list of every column in it and mark each as observed, reported or derived. Note which columns you would need to store to rebuild the chain later.`,
  },
  topics: [
    {
      t: 1,
      def: `OHLC stands for open, high, low and close: the first price, highest price, lowest price and last price of a period. Historical NIFTY OHLC is the base of most charts and index-level backtests.`,
      hi: `OHLC ka matlab open, high, low aur close: kisi period ka pehla price, sabse high, sabse low aur aakhri price. Historical Nifty OHLC zyadatar charts aur index-level backtests ki buniyaad hota hai.`,
      how: `The NIFTY 50 index is calculated by NSE (through NSE Indices) from its constituents' free-float market capitalisation and published continuously. Index data is a calculated number, not a tradable contract, so you cannot buy it directly. Daily OHLC gives range and close-to-close change; intraday OHLC bars give the path. Always check whether the series is adjusted or whether the data vendor fills gaps on holidays.`,
      eg: {
        title: 'Reading a day of OHLC',
        text: `NIFTY: open 24,000, high 24,120, low 23,940, close 24,060. Range = 24,120 − 23,940 = 180 points. Body = 24,060 − 24,000 = 60 points up. The classic pivot (high + low + close) / 3 = (24,120 + 23,940 + 24,060) / 3 = 24,040. Illustrative numbers.`,
      },
      tip: `Index OHLC cannot be traded directly. Backtest on futures or options prices for anything you intend to trade.`,
      visual: {
        kind: 'bars',
        title: 'One day of NIFTY, in points (illustrative)',
        unit: '',
        items: [
          { label: 'Open', value: 24000, tone: 'neutral' },
          { label: 'High', value: 24120, tone: 'bull' },
          { label: 'Low', value: 23940, tone: 'bear' },
          { label: 'Close', value: 24060, tone: 'gold' },
        ],
      },
      calc: { id: 'pivot-levels', preset: { high: 24120, low: 23940, close: 24060 }, why: 'Derives pivot levels from the day OHLC.' },
    },
    {
      t: 2,
      def: `Historical futures OHLC is the price history of a futures contract. Unlike the index, a futures contract expires, so a long history needs several contracts joined together.`,
      hi: `Historical futures OHLC ek futures contract ka price history hota hai. Index ke ulat, futures contract expire hota hai, isliye lamba history banane ke liye kai contracts ko jodna padta hai.`,
      how: `NIFTY futures trade in near-month, next-month and far-month series, and each has its own price. A continuous series is built by switching from one contract to the next at a roll date, which creates a jump equal to the price difference between contracts. This jump is not a real market move. Some vendors adjust for it, so you should know which method your data uses before backtesting.`,
      eg: {
        title: 'The roll gap',
        text: `On expiry the old contract closes at 24,060 while the next contract closes at 24,110. A continuous chart joined without adjustment shows a gap of 50 points that never traded. Adjusting back-history by 50 points removes it. Illustrative figures.`,
      },
      tip: `If your strategy trades the index through futures, build the series with an explicit roll rule and check it.`,
      visual: {
        kind: 'timeline',
        title: 'Rolling futures into a continuous series',
        events: [
          { when: 'Day 1', what: 'Near contract used', tone: 'ice' },
          { when: 'Roll day', what: 'Switch to next contract; gap appears', tone: 'gold' },
          { when: 'After', what: 'Next contract becomes the near month', tone: 'ice' },
        ],
      },
      calc: { id: 'basis-fair-value', preset: { spot: 24060, futures: 24110, rate: 6.5, days: 20, dividend: 1.3 }, why: 'Compares the futures price with its cost-of-carry fair value.' },
    },
    {
      t: 3,
      def: `Historical option-chain data records the prices, OI, volume and IV of all strikes and expiries at a given moment. It lets you rebuild what the chain looked like on a past day.`,
      hi: `Historical option-chain data kisi pichhle waqt par saare strikes aur expiries ke prices, OI, volume aur IV ka record hota hai. Isse aap rebuild kar sakte ho ki kisi purane din chain kaisi dikhti thi.`,
      how: `NSE end-of-day files give one record per contract per day. Intraday chain history is not freely available in a complete form, so many traders store their own snapshots, taken at a fixed interval through a broker API. A record is defined by the underlying, expiry, strike, option type and timestamp. Missing out-of-the-money strikes that did not trade and illiquid quotes are common, so deal with them explicitly.`,
      eg: {
        title: 'Size of a chain history',
        text: `A snapshot of 100 strikes for one expiry has 100 × 2 = 200 rows (CE and PE). Taking one every minute for 375 minutes gives 200 × 375 = 75,000 rows a day for one expiry. Over 250 trading days that is 1,87,50,000 rows, so storage design matters.`,
      },
      tip: `Start storing chain snapshots today. Past intraday chains are hard to get later.`,
      visual: {
        kind: 'flow',
        title: 'One record in a chain history',
        steps: [
          { label: 'Timestamp', note: 'date and time', tone: 'ice' },
          { label: 'Expiry and strike', tone: 'ice' },
          { label: 'CE or PE', tone: 'ice' },
          { label: 'LTP, OI, volume, IV', tone: 'gold' },
        ],
      },
    },
    {
      t: 4,
      def: `Historical OI is the record of open interest at each strike or futures contract over time. Open interest counts contracts that are still open, not contracts traded.`,
      hi: `Historical OI har strike ya futures contract ka open interest time ke saath ka record hota hai. Open interest un contracts ko ginta hai jo abhi khule hain, jo trade hue unko nahi.`,
      how: `OI is reported by the exchange and clearing corporation and is usually available end of day, with intraday updates in live feeds. OI at a strike rises when new contracts are created and falls when contracts are closed. Remember: OI alone cannot show who initiated a trade, and high OI marks a potential level, not guaranteed support or resistance. Store OI together with price to interpret it.`,
      eg: {
        title: 'OI at three strikes',
        text: `At a given close, the 24,200 CE has 1.2 crore units of OI, the 24,000 PE has 1.1 crore and the 24,000 CE has 0.7 crore. The call strike with the most OI is a level to watch above spot, and the put strike with the most OI is a level to watch below. Illustrative.`,
      },
      tip: `Compare OI with its own history. A figure that looks large may be normal for that strike near expiry.`,
      visual: {
        kind: 'oi',
        title: 'OI snapshot (lakh units, illustrative)',
        spot: 24050,
        rows: [
          { strike: 23800, ce: 30, pe: 95 },
          { strike: 24000, ce: 70, pe: 110 },
          { strike: 24200, ce: 120, pe: 35 },
        ],
      },
    },
    {
      t: 5,
      def: `Historical OI change is the difference in open interest between two times, usually day to day. It shows where contracts were added or removed.`,
      hi: `Historical OI change do alag waqt ke beech open interest ka fark hota hai, aam taur par din-ba-din. Isse pata chalta hai ki kahan contracts add hue ya hate.`,
      how: `OI change is computed by you from stored OI, or provided by the data source. It is more informative when paired with price change, but for options the same OI increase can come from a new buyer and a new seller of any kind. Roll days and expiry days produce large changes that are mechanical, so exclude them from naive analysis.`,
      eg: {
        title: 'OI change at a strike',
        text: `The 24,200 CE had 80 lakh units yesterday and 92 lakh today. OI change = +12 lakh units, or 15 percent. In lots of 65 that is about 18,462 lots added (12,00,000 / 65). The figure shows added contracts; it does not show direction.`,
      },
      tip: `Store raw OI and compute changes yourself so you can choose the period.`,
      visual: {
        kind: 'bars',
        title: 'OI change by strike (lakh units, illustrative)',
        unit: '',
        items: [
          { label: '24,000 CE', value: 5, tone: 'gold' },
          { label: '24,100 CE', value: 12, tone: 'gold' },
          { label: '24,200 CE', value: 12, tone: 'gold' },
        ],
      },
    },
    {
      t: 6,
      def: `Historical volume is the number of contracts traded in a period. Volume shows activity and liquidity, while open interest shows outstanding positions.`,
      hi: `Historical volume ek period mein trade hue contracts ki sankhya hai. Volume activity aur liquidity dikhata hai, jabki open interest bachi hui positions dikhata hai.`,
      how: `Volume resets each day and counts both sides of each trade once. It can be many times OI, because a contract can be opened and closed within the day. High volume at a strike signals interest and generally tighter spreads, while very low volume suggests wide spreads and unreliable prices. Some historical data labels volume in units and others in lots, so check the unit before comparing.`,
      eg: {
        title: 'Volume larger than OI',
        text: `A strike has OI of 80 lakh units but traded 2 crore units during the day. That is 2.5 times OI. It means many intraday trades opened and closed, so the day's volume says little about the end-of-day position.`,
      },
      tip: `Never compare volume across sources without checking whether the unit is lots or units.`,
      visual: {
        kind: 'compare',
        title: 'Volume versus open interest',
        left: { head: 'Volume', tone: 'ice', points: ['Contracts traded in the period', 'Resets every day', 'Shows activity and liquidity'] },
        right: { head: 'Open interest', tone: 'gold', points: ['Contracts still open', 'Carries across days', 'Shows outstanding positions'] },
      },
    },
    {
      t: 7,
      def: `Historical implied volatility (IV) is the series of IVs implied by option prices over time. It tells you whether options are currently expensive or cheap relative to their own history.`,
      hi: `Historical implied volatility (IV) option prices se nikalne wali IV ka time series hai. Isse pata chalta hai ki options abhi apni khud ki history ke hisaab se mehenge hain ya sasti.`,
      how: `IV is not published as a raw trade; it is calculated from an option's price with a model, so the value depends on the model inputs (rate, dividend, time to expiry). Vendors differ slightly, so do not mix IV series from two sources. ATM IV is usually used as a single summary number; the IV smile across strikes shows the shape. Compare IV with realised volatility to see whether options were cheap or expensive in hindsight.`,
      eg: {
        title: 'IV changes the price',
        text: `For the 24,000 CE with 30 days left and r = 6.5 percent, IV of 14 percent gives a model price near ₹451, and IV of 18 percent gives near ₹559. A 4-point rise in IV adds about ₹108 per unit, which is about ₹7,000 per lot of 65 (108 × 65 = 7,020). Illustrative.`,
      },
      tip: `IV is relative. Always ask what level is high or low for this index, using its own past data.`,
      visual: {
        kind: 'curve',
        title: 'IV smile across strikes',
        curve: 'iv-smile',
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 30, iv: 14, rate: 6.5 }, why: 'Prices the option at a chosen IV and shows its Greeks.' },
    },
    {
      t: 8,
      def: `Historical India VIX is the past record of the volatility index NSE computes from NIFTY option prices. It expresses expected annualised volatility over the next 30 days, not direction.`,
      hi: `Historical India VIX NSE ke volatility index ka purana record hai jo NIFTY option prices se nikalta hai. Yeh agle 30 din ki annualised expected volatility batata hai, direction nahi.`,
      how: `India VIX is calculated from the best bid and ask prices of near and next-month NIFTY options. A reading of 14 means the market expects roughly a 14 percent annualised move, which can be scaled to a daily or weekly range. VIX tends to rise when markets fall quickly and fall in calm uptrends, but it can also rise before known events. Over long history it spikes in crises such as March 2020 and then mean-reverts.`,
      eg: {
        title: 'Turning VIX into a range',
        text: `With NIFTY at 24,000 and VIX 14, the expected one-standard-deviation move over 1 calendar day is 24,000 × 0.14 × √(1/365) ≈ 176 points, and over 7 days is 24,000 × 0.14 × √(7/365) ≈ 465 points. These are statistical ranges, not predictions.`,
      },
      tip: `VIX measures expected size of moves, not their direction. Use it to size and structure trades, not to pick a side.`,
      visual: {
        kind: 'gauge',
        title: 'India VIX (illustrative zones)',
        min: 8,
        max: 40,
        value: 14,
        zones: [
          { from: 8, to: 12, label: 'Low', tone: 'ice' },
          { from: 12, to: 20, label: 'Normal', tone: 'neutral' },
          { from: 20, to: 40, label: 'High', tone: 'gold' },
        ],
      },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 7 }, why: 'Scales VIX into an expected range.' },
    },
    {
      t: 9,
      def: `Historical Greeks are the series of delta, gamma, theta, vega and rho for options over time. Exchanges do not usually publish them as data, so they are normally computed by you from price and IV.`,
      hi: `Historical Greeks options ke delta, gamma, theta, vega aur rho ka time series hote hain. Exchange aam taur par inhe data ke roop mein publish nahi karta, isliye inhe aap price aur IV se khud calculate karte ho.`,
      how: `To compute Greeks you need spot, strike, time to expiry, a risk-free rate, a dividend assumption and IV. Changing the day-count convention or the rate changes the numbers slightly. Greeks are model sensitivities for small changes: delta for the spot, gamma for delta, theta for time, vega for IV. They are only approximations, so large moves need re-computation.`,
      eg: {
        title: 'Greeks of the 24,000 CE',
        text: `With 30 days left, IV 14 percent and r = 6.5 percent: price about ₹451, delta 0.56, gamma about 0.0004, theta about −₹8.6 per day and vega about ₹27 per 1 vol point. A 1-point IV rise adds about ₹27 per unit, or about ₹1,760 per lot (27.1 × 65 ≈ 1,763).`,
      },
      tip: `Record the inputs along with each Greek so you can reproduce the number later.`,
      visual: {
        kind: 'curve',
        title: 'Delta changes with spot',
        curve: 'delta',
      },
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 30, iv: 14, rate: 6.5 }, why: 'Calculates the Greeks used in the example.' },
    },
    {
      t: 10,
      def: `Data frequency is how often a value is recorded: once a day, every 5 minutes, every minute or at every trade (tick). Higher frequency gives more detail and much more data.`,
      hi: `Data frequency ka matlab hai ki koi value kitni baar record hoti hai: din mein ek baar, har 5 minute, har minute ya har trade par (tick). Zyada frequency se detail badhta hai aur data bahut zyada ho jaata hai.`,
      how: `Daily data is enough for swing-style rules and long backtests. 5-minute and 1-minute bars suit intraday strategies; tick data records every trade and quote and is needed for studying slippage and order-book behaviour. Higher frequency data is more expensive to get, store and clean. Choose the lowest frequency that can still test the rule, because rules that act within a minute cannot be tested on daily data.`,
      eg: {
        title: 'Bars in one session',
        text: `A session of 375 minutes gives 1 daily bar, 75 five-minute bars or 375 one-minute bars for the index. For an option chain with 200 rows per snapshot, one-minute snapshots mean 75,000 rows a day, as computed in topic 3, while tick data may be many times that number.`,
      },
      tip: `Match data frequency to the rule. An exit rule at 15:20 cannot be tested on daily bars.`,
      visual: {
        kind: 'bars',
        title: 'Bars per 375-minute session',
        unit: '',
        items: [
          { label: 'Daily', value: 1, tone: 'neutral' },
          { label: '5-minute', value: 75, tone: 'ice' },
          { label: '1-minute', value: 375, tone: 'gold' },
        ],
      },
    },
  ],
}
export default m
