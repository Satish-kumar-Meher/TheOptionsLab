import type { ModuleLesson } from '../topicLessonTypes'

/* Module 24.2 - Data Collection.
 * Illustrative numbers: NIFTY about 24,000, lot 65 (check the current NSE contract specification), India VIX about 14.
 * API limits quoted from the DhanHQ support page at the time of writing - always re-check the live documentation. */
const m: ModuleLesson = {
  moduleId: '24.2',
  intro: `Before you can backtest or build a dashboard you must collect data reliably. This module covers where NSE data comes from, how broker APIs deliver it, how to respect rate limits, and how to store and timestamp what you collect. A small mistake here, such as a missing snapshot or a wrong clock, silently corrupts every result built on top.`,
  introHi: `Backtest ya dashboard banane se pehle aapko data reliably collect karna padta hai. Is module mein dekhoge ki NSE ka data kahan se aata hai, broker API kaise deti hai, rate limits ka dhyaan kaise rakhna hai, aur data store aur timestamp kaise karna hai. Yahan ki chhoti galti, jaise ek snapshot miss ho jaana ya clock galat hona, upar ke har result ko chupke se kharab kar deti hai.`,
  steps: {
    concept: `Data collection is the habit of capturing market data in a repeatable way and saving it with the exact time it was captured. Free screens show only the present moment, so history exists only if you or a vendor recorded it. What you do not collect today cannot be recreated tomorrow.`,
    conceptHi: `Data collection ka matlab hai market data ko ek repeatable tareeke se capture karna aur capture ke exact time ke saath save karna. Free screens sirf abhi ka moment dikhati hain, toh history tabhi hoti hai jab aapne ya kisi vendor ne record ki ho. Jo aaj collect nahi kiya, woh kal wapas nahi banta.`,
    mechanism: `Data reaches you through three routes. NSE publishes end-of-day files and some delayed web pages. Brokers expose REST endpoints (you ask, they answer) and WebSocket feeds (they push ticks). Paid vendors sell cleaned history. Each route has limits on how often you may call it, so a collector is usually a scheduled script that requests data at fixed times, validates the response, stamps it and writes it to storage.`,
    example: {
      title: 'Sizing a one-minute chain collector (illustrative)',
      text: `You track 60 strikes of one NIFTY expiry, both CE and PE, saving one snapshot every minute through the 9:15 to 15:30 session. The session is 375 minutes, so you get 375 snapshots a day. Each snapshot has 60 strikes, giving 60 × 375 = 22,500 strike-rows a day, or 22,500 × 250 trading days = 5,625,000 rows a year for one expiry.`,
    },
    chart: {
      kind: 'flow',
      title: 'A collector pipeline',
      caption: 'Each box can fail on its own, so log what happens at every step.',
      steps: [
        { label: 'Scheduler', note: 'fires at fixed times', tone: 'ice' },
        { label: 'API call', note: 'respects rate limit', tone: 'ice' },
        { label: 'Validate', note: 'status, fields, ranges', tone: 'gold' },
        { label: 'Timestamp', note: 'IST, from synced clock', tone: 'gold' },
        { label: 'Store', note: 'append, never overwrite', tone: 'neutral' },
      ],
    },
    optionChain: `The option chain is the hardest data to rebuild later, because brokers show only the current chain. A snapshot collector that stores strike, type, LTP, bid, ask, OI, volume and IV at each timestamp is the only way to study how the chain evolved through a day. Remember that OI figures arrive with some delay and that OI alone does not reveal who initiated a trade.`,
    psychology: `Collecting data feels boring, so traders skip it and then trust whatever a chart tells them. The discipline is to record first and interpret later. Having your own record also protects you from memory bias, where you recall the winning setups and forget the quiet days.`,
    scenarios: {
      bullish: `On a strong up day, volume and OI shift to higher strikes quickly. A one-minute collector captures the shift, while a once-a-day file shows only the end result.`,
      bearish: `On a sharp fall, India VIX and option bid-ask spreads both widen. Your collector should log spread and VIX too, because fills in your backtest must reflect that wider cost.`,
      sideways: `In a quiet range, little changes minute to minute. Fewer snapshots may be enough, but keep the schedule fixed so quiet days and busy days are comparable.`,
    },
    practice: [
      {
        q: `A broker data API allows 5 requests per second. You need quotes for 400 instruments, one request each. How long does one full sweep take at the limit?`,
        a: `400 requests / 5 per second = 80 seconds. A sweep every minute therefore uses 80 of 60 seconds, which is not possible. You must batch instruments per request, reduce the list or collect less often.`,
      },
      {
        q: `You store 22,500 rows per day with about 60 bytes per row. How much space does one trading year (250 days) need?`,
        a: `Rows = 22,500 × 250 = 5,625,000. Bytes = 5,625,000 × 60 = 337,500,000, about 338 MB before compression or indexes.`,
      },
      {
        q: `Your server clock runs 4 seconds slow. Spot is stamped 10:00:00 but is really from 10:00:04. If NIFTY moved 6 points in those 4 seconds, what error could this add to an ATM option price whose delta is 0.5?`,
        a: `About 0.5 × 6 = 3 rupees per unit, which is 3 × 65 = ₹195 per lot of apparent mispricing. It is small for one row but systematic across thousands of rows.`,
      },
    ],
    assignment: `Write a short script (any language) that calls a free or broker data endpoint once a minute for 30 minutes, saves each response with an IST timestamp to a CSV, and logs any failed call. At the end count how many snapshots you expected, how many you got, and why any are missing.`,
  },
  topics: [
    {
      t: 1,
      def: `NSE market data is the information the National Stock Exchange publishes about prices, volumes, open interest and contracts. It comes as end-of-day files, delayed web pages and paid real-time feeds.`,
      hi: `NSE market data woh information hai jo National Stock Exchange prices, volume, open interest aur contracts ke baare mein publish karta hai. Yeh end-of-day files, delayed web pages aur paid real-time feeds ke roop mein aata hai.`,
      how: `After each session NSE publishes a bhavcopy, a file with one row per contract showing open, high, low, close, settlement price, volume and OI. This is the most dependable free source for daily history. Live data is distributed through licensed vendors and your broker. Scraping NSE web pages is fragile and may break whenever the site changes or may breach its terms of use, so for anything serious use the official files or a broker or vendor API.`,
      eg: {
        title: 'Counting rows in a daily derivatives file',
        text: `Suppose one expiry of NIFTY has 120 strikes listed and each has a CE and a PE, so 240 option contracts. With 4 expiries listed that is 960 option rows for NIFTY, plus the futures rows. Knowing this size tells you what a "full" day looks like, so a file with only 700 rows is a red flag. Counts are illustrative.`,
      },
      tip: `Treat end-of-day files as your ground truth and check that their row counts and totals look normal before you use them.`,
      visual: {
        kind: 'layers',
        title: 'Where NSE data reaches you',
        layers: [
          { label: 'NSE matching engine and clearing corporation', note: 'the source', tone: 'gold' },
          { label: 'Licensed vendors and brokers', note: 'live feeds, APIs', tone: 'ice' },
          { label: 'Your collector script', note: 'calls, validates, stamps', tone: 'ice' },
          { label: 'Your database', note: 'your own history', tone: 'neutral' },
        ],
      },
    },
    {
      t: 2,
      def: `A broker API lets your own program ask the broker for data and send orders, instead of you clicking in an app. It usually has a REST part for requests and a WebSocket part for live pushes.`,
      hi: `Broker API se aapka apna program broker se data maang sakta hai aur orders bhej sakta hai, aapko app mein click nahi karna padta. Ismein aam taur par REST hota hai requests ke liye aur WebSocket live data push ke liye.`,
      how: `You create API credentials in your broker account, receive an access token that expires (often daily) and attach it to each request. REST calls return JSON for quotes, historical candles, positions and the option chain. A WebSocket keeps one connection open and the broker pushes ticks. Under SEBI's framework for retail algo trading, API access is tied to your broker and typically needs a registered static IP, and timelines and thresholds have been revised several times, so verify the current rules with your broker.`,
      eg: {
        title: 'REST versus WebSocket for the same job',
        text: `To watch 20 option strikes for one trading session, polling by REST once a second makes 375 × 60 = 22,500 calls per instrument group per day and still gives only one price per second. A WebSocket subscription pushes every tick for all 20 strikes over one connection. Use REST for snapshots and history, and WebSocket for live ticks. Numbers are illustrative.`,
      },
      tip: `Keep credentials and tokens out of your code files and out of any shared repository.`,
      visual: {
        kind: 'compare',
        title: 'REST versus WebSocket',
        left: { head: 'REST', tone: 'ice', points: ['You ask, broker answers', 'Good for history and snapshots', 'Counts against rate limits'] },
        right: { head: 'WebSocket', tone: 'gold', points: ['Broker pushes ticks to you', 'Good for live dashboards', 'Needs reconnect and resubscribe logic'] },
      },
    },
    {
      t: 3,
      def: `DhanHQ is the API offered by the broker Dhan. It provides market data, historical candles, option-chain data and order endpoints that you call with an access token.`,
      hi: `DhanHQ Dhan broker ki API hai. Ismein market data, historical candles, option-chain data aur order endpoints milte hain jinhe aap access token ke saath call karte ho.`,
      how: `You generate a client ID and access token from the Dhan platform and send them in request headers. Dhan separates endpoint families, such as order APIs, data APIs and non-trading APIs, each with its own rate limit. Instruments are identified by a security ID taken from Dhan's instrument master file, not by the trading symbol, so you must download and map that file. Endpoint names, fields and limits change over time, so read the current DhanHQ documentation before coding.`,
      eg: {
        title: 'Planning calls around a published limit',
        text: `Dhan's support page lists limits of 20 requests per second for non-trading APIs, 10 for order APIs, 5 for data APIs and 1 for quote APIs (verify against the live documentation). If you fetch history for 100 instruments through a data API at 5 per second, the job takes at least 100 / 5 = 20 seconds. If a quote-type endpoint allows only 1 per second, the same 100 instruments take 100 seconds.`,
      },
      tip: `Build your collector around the stricter limit of the endpoint family you use and re-check limits whenever the broker announces an API update.`,
      visual: {
        kind: 'bars',
        title: 'Published request limits, per second (verify before use)',
        unit: ' / s',
        items: [
          { label: 'Non-trading APIs', value: 20, tone: 'ice' },
          { label: 'Order APIs', value: 10, tone: 'gold' },
          { label: 'Data APIs', value: 5, tone: 'ice' },
          { label: 'Quote APIs', value: 1, tone: 'neutral' },
        ],
      },
    },
    {
      t: 4,
      def: `Historical options data is the stored price, volume, OI and sometimes IV history of option contracts, including contracts that have already expired. Each strike and expiry is its own series.`,
      hi: `Historical options data option contracts ka stored price, volume, OI aur kabhi kabhi IV ka history hota hai, un contracts ka bhi jo expire ho chuke hain. Har strike aur expiry apni alag series hoti hai.`,
      how: `Unlike an index, an option has a short life, so a backtest needs data for contracts that no longer exist. Many brokers give history only for live contracts, so you may need a vendor or your own stored snapshots. Data volume grows fast because every strike, type and expiry is a separate series. Check whether the history covers weekly expiries, whether the timestamps are exchange time, and whether illiquid strikes have gaps.`,
      eg: {
        title: 'How big is a day of options minute data?',
        text: `Take 41 strikes around the money for one expiry, both CE and PE, which is 82 contracts. One-minute bars for a 375-minute session give 82 × 375 = 30,750 rows a day. Over 250 trading days that is 7,687,500 rows for just one expiry. Numbers are illustrative.`,
      },
      tip: `Decide first which strikes and timeframe your strategy actually needs, and collect only that.`,
      visual: {
        kind: 'bars',
        title: 'Rows per day by timeframe, 82 contracts (illustrative)',
        items: [
          { label: '1-minute (375 bars)', value: 30750, tone: 'gold' },
          { label: '5-minute (75 bars)', value: 6150, tone: 'ice' },
          { label: 'Daily (1 bar)', value: 82, tone: 'neutral' },
        ],
      },
    },
    {
      t: 5,
      def: `Historical futures data is the price history of NIFTY or BANKNIFTY futures. A futures contract expires, so long histories are made by joining several contracts into a continuous series.`,
      hi: `Historical futures data NIFTY ya BANKNIFTY futures ka price history hota hai. Futures contract expire hota hai, isliye lamba history kai contracts ko jod kar continuous series ke roop mein banate hain.`,
      how: `You pick a roll rule: switch on expiry day, a few days before, or when the next contract has more volume or OI. Each rule gives a slightly different series. Futures price includes cost of carry, so the near and next contracts differ even when spot is the same. Use futures data to test index strategies that you would trade through futures, and compare with spot to study basis.`,
      eg: {
        title: 'Basis on a day (illustrative)',
        text: `Spot closes at 24,060 and the near-month future closes at 24,110, so the basis is 50 points. Next month closes at 24,170, which is 60 points above near month. If you roll on expiry day without adjustment, your series jumps by that 60 points even though no trade could earn it.`,
      },
      tip: `Write down your roll rule. Two backtests with different roll rules can give different answers on the same strategy.`,
      visual: {
        kind: 'compare',
        title: 'Two common roll rules',
        left: { head: 'Roll on expiry day', tone: 'ice', points: ['Simple to code', 'Near contract may thin out', 'Gap on roll day'] },
        right: { head: 'Roll on volume or OI', tone: 'gold', points: ['Follows where trading is', 'Rule needs a clear threshold', 'Roll date varies by month'] },
      },
      calc: { id: 'basis-fair-value', preset: { spot: 24060, futures: 24110, rate: 6.5, days: 30, dividend: 1.3 }, why: 'Shows basis against a model fair value for the same day.' },
    },
    {
      t: 6,
      def: `An option-chain snapshot is a saved copy of the whole chain (all strikes with price, OI, volume and IV) at one moment. A series of snapshots lets you replay how the chain changed.`,
      hi: `Option-chain snapshot poori chain ki ek saved copy hoti hai, saare strikes ke price, OI, volume aur IV ke saath, ek particular moment ka. Snapshots ki series se aap replay kar sakte ho ki chain kaise badli.`,
      how: `Your script requests the chain at a fixed interval, for example every minute, tags it with a timestamp and expiry, and appends it to storage. Use the same interval daily so days are comparable. Store raw values exactly as received, and compute derived fields such as PCR later. Keep the spot price in the same row group, otherwise you cannot tell where the chain stood relative to the market.`,
      eg: {
        title: 'A skipped snapshot',
        text: `Your schedule is every minute from 9:15 to 15:30, so you expect 375 snapshots. At the end of the day the file has 361. Fourteen are missing, which is 14 / 375 = 3.7 percent. Checking the log shows an API timeout around 11:20. Knowing exactly which minutes are missing lets you exclude or fill them deliberately instead of guessing.`,
      },
      tip: `Log every failed call. A gap you know about is a minor issue, and a gap you do not know about is a hidden bug.`,
      visual: {
        kind: 'timeline',
        title: 'A day of snapshots',
        events: [
          { when: '9:15', what: 'First snapshot after open', tone: 'ice' },
          { when: '11:20', what: 'API timeout, 14 snapshots lost', tone: 'bear' },
          { when: '15:29', what: 'Last full-minute snapshot', tone: 'ice' },
          { when: 'After close', what: 'Count rows, compare with 375, save report', tone: 'gold' },
        ],
      },
    },
    {
      t: 7,
      def: `India VIX is an index published by NSE that measures the volatility the option market expects for the next 30 days, quoted as an annual percentage. It is not a forecast of direction.`,
      hi: `India VIX NSE ka publish kiya hua index hai jo batata hai ki option market agle 30 din ke liye kitni volatility expect kar raha hai, annual percentage mein. Yeh direction ka forecast nahi hai.`,
      how: `NSE calculates India VIX from the order-book prices of near and next-month NIFTY options. Collect it at the same times as your option snapshots, plus the daily open, high, low and close. VIX is an annualised number, so a VIX of 14 implies a one-standard-deviation move over a calendar day of roughly spot × 0.14 / √365. It describes expected size of movement, not whether the market will rise or fall.`,
      eg: {
        title: 'Turning VIX into a daily range',
        text: `With NIFTY at 24,000 and VIX at 14, the one-day expected move is 24,000 × 0.14 × √(1/365) = about 176 points, so roughly 23,824 to 24,176 as a one-standard-deviation range. Actual days can and do fall outside this range. Illustrative.`,
      },
      tip: `Store VIX with every snapshot. You will want it later to split your backtest by volatility level.`,
      visual: {
        kind: 'gauge',
        title: 'India VIX reading (illustrative zones)',
        min: 8,
        max: 30,
        value: 14,
        zones: [
          { from: 8, to: 13, label: 'Low', tone: 'ice' },
          { from: 13, to: 18, label: 'Moderate', tone: 'gold' },
          { from: 18, to: 30, label: 'High', tone: 'neutral' },
        ],
      },
      calc: { id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: 'Converts a VIX reading into a one-day expected range.' },
    },
    {
      t: 8,
      def: `An API rate limit is the maximum number of requests a broker lets you send in a time window. If you exceed it the broker rejects calls and may temporarily block you.`,
      hi: `API rate limit woh maximum requests hain jo broker aapko ek time window mein bhejne deta hai. Agar aap isse zyada karte ho toh broker calls reject karta hai aur kabhi kabhi temporarily block bhi kar deta hai.`,
      how: `Limits are usually per second and sometimes per minute, hour or day, and differ for order, data and quote endpoints. A rejected call often returns HTTP status 429 (too many requests). Good collectors use a token-bucket or sleep-based throttle, retry with exponential backoff (wait 1, 2, 4, 8 seconds) and cache anything that does not change, such as the instrument list. Never design a strategy that depends on being able to send bursts of calls.`,
      eg: {
        title: 'Backoff arithmetic',
        text: `A call fails with 429. You retry after 1, 2, 4 and 8 seconds, which spends 1 + 2 + 4 + 8 = 15 seconds before giving up. If a snapshot is due every 60 seconds, 15 seconds of retries still fits, but 5 failed instruments in a row would not. Plan the retry budget against the schedule.`,
      },
      tip: `Stay comfortably below the published limit, since limits can change and shared infrastructure can be slower than expected.`,
      visual: {
        kind: 'flow',
        title: 'Handling a rejected call',
        steps: [
          { label: 'Send request', tone: 'ice' },
          { label: '429 received', note: 'rate limit hit', tone: 'bear' },
          { label: 'Wait', note: '1, 2, 4, 8 seconds', tone: 'gold' },
          { label: 'Retry or log', note: 'give up after N tries', tone: 'neutral' },
        ],
      },
    },
    {
      t: 9,
      def: `Data storage is where you keep collected data so you can read it again later. Choices range from simple CSV files to a proper database.`,
      hi: `Data storage woh jagah hai jahan aap collected data rakhte ho taaki baad mein dobara padh sako. Choices simple CSV files se lekar proper database tak hoti hain.`,
      how: `CSV files are easy to inspect and fine to start with. Columnar formats such as Parquet compress well and read fast for analysis. A relational database such as PostgreSQL gives indexes, constraints and easy queries across dates, strikes and expiries. Whatever you choose, store data append-only, keep timestamps in one fixed timezone, and back it up. Estimate size early, because tick and minute data grow quickly.`,
      eg: {
        title: 'A year of chain rows',
        text: `From the earlier maths, 22,500 rows a day for one expiry is 5,625,000 rows a year. At about 60 bytes a row that is 337,500,000 bytes, roughly 338 MB. If you track two expiries it doubles to about 675 MB. That is small for a database but already awkward to open in a spreadsheet. Illustrative.`,
      },
      tip: `Pick a format you can query. A pile of unlabelled files that you cannot search will not be used.`,
      visual: {
        kind: 'compare',
        title: 'CSV files versus a database',
        left: { head: 'CSV or Parquet files', tone: 'ice', points: ['Easy to start and share', 'You manage structure yourself', 'Good for batch analysis'] },
        right: { head: 'Relational database', tone: 'gold', points: ['Indexes and constraints', 'Query by date, strike, expiry', 'Needs setup and backups'] },
      },
    },
    {
      t: 10,
      def: `Timestamp synchronisation means making sure every piece of data carries a correct time in the same timezone, so records from different sources can be lined up.`,
      hi: `Timestamp synchronisation ka matlab hai ki har data ke saath sahi time ho aur woh ek hi timezone mein ho, taaki alag alag sources ke records ek line mein match ho sakein.`,
      how: `Set your server clock using NTP (network time protocol) and store timestamps in IST or in UTC consistently, never a mix. Record both the exchange time, when the feed provides it, and your own receive time; their difference is your latency. When joining spot, futures, chain and VIX data, match each row with the latest value at or before its time, never a later one, or your backtest will quietly use information from the future.`,
      eg: {
        title: 'Misaligned spot and chain',
        text: `Spot is read at 10:00:00 and the chain at 10:00:03. NIFTY moved 4 points in those 3 seconds. With ATM delta near 0.5, the chain prices are off by about 0.5 × 4 = 2 rupees against the spot you stored. A strategy that depends on small mispricings can be fooled by this, so record both times.`,
      },
      tip: `Always store timezone-aware times. A daylight-saving or timezone mix-up is easy to introduce and hard to find.`,
      visual: {
        kind: 'timeline',
        title: 'Which value belongs to 10:00:00?',
        events: [
          { when: '09:59:58', what: 'Spot tick 24,058', tone: 'ice' },
          { when: '10:00:00', what: 'Decision time: use latest value at or before', tone: 'gold' },
          { when: '10:00:03', what: 'Chain arrives; later than decision, do not use for 10:00:00', tone: 'bear' },
        ],
      },
    },
  ],
  tools: [{ id: 'expected-move', preset: { spot: 24000, vix: 14, days: 1 }, why: 'Quick VIX-to-range check while reviewing collected data.' }],
}
export default m
