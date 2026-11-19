import type { ModuleLesson } from '../topicLessonTypes'

/* Module 24.3 - Data Engineering.
 * All numbers illustrative: NIFTY about 24,000, strike step 50, lot 65 (check the current NSE contract specification).
 * Session = 9:15 to 15:30 IST = 375 one-minute candles. About 250 sessions a year (illustrative).
 * Chain strip 23,000 to 25,000 in steps of 50 = 41 strikes x CE and PE = 82 rows per snapshot. */
const m: ModuleLesson = {
  moduleId: '24.3',
  intro: `A backtest or a live engine is only as good as the data under it. This module is about getting market data into a clean, consistent shape: reading files and APIs, removing errors and duplicates, aligning timestamps, and storing everything so you can query it by strike, by expiry and by time. It is plumbing, but bad plumbing quietly produces wrong results.`,
  introHi: `Backtest ya live engine utna hi accha hota hai jitna uske neeche ka data. Is module mein market data ko clean aur consistent shape mein laana seekhenge: files aur APIs padhna, errors aur duplicates hatana, timestamps align karna, aur sab kuch aise store karna ki aap strike, expiry aur time ke hisaab se query kar sako. Yeh plumbing ka kaam hai, lekin kharab plumbing chupke se galat results deti hai.`,
  steps: {
    concept: `Data engineering means collecting raw market data, checking it, reshaping it and storing it so that every later calculation (Greeks, OI change, backtest P&L) reads the same trustworthy numbers. In options the raw data is large: one chain snapshot has dozens of strikes, two option types and several expiries, and it repeats every minute.`,
    conceptHi: `Data engineering ka matlab hai raw market data collect karna, check karna, reshape karna aur store karna taaki aage ki har calculation (Greeks, OI change, backtest P&L) wahi bharosemand numbers padhe. Options mein raw data bada hota hai: ek chain snapshot mein bahut saare strikes, do option types aur kai expiries hoti hain, aur yeh har minute repeat hota hai.`,
    mechanism: `A typical pipeline has five stages. Ingest: read CSV files (for example NSE end-of-day bhavcopy) or call a broker or data-vendor API that returns JSON. Validate: reject impossible values and missing fields. Normalise: one timezone (IST), one naming scheme, numbers as numbers. Deduplicate and align: one row per timestamp, expiry, strike and type, with spot and chain stamped to the same moment. Store: a database table with an index on those keys, so a query for one strike on one expiry is fast.`,
    example: {
      title: 'One day of chain snapshots (illustrative)',
      text: `You save the NIFTY chain for strikes 23,000 to 25,000 every minute. That range has (25,000 − 23,000) / 50 + 1 = 41 strikes, and each has a CE and a PE, so 82 rows per snapshot. A session has 375 one-minute snapshots (9:15 to 15:30), so one day is 82 × 375 = 30,750 rows. Over about 250 sessions that is 30,750 × 250 = 7,687,500 rows for a single expiry view. At roughly 60 bytes a row this is about 461 MB uncompressed, which a normal PostgreSQL database handles easily if the table is indexed and partitioned by month.`,
    },
    chart: {
      kind: 'flow',
      title: 'Market-data pipeline',
      caption: 'Each stage should fail loudly: a rejected row is better than a wrong row that reaches the backtest.',
      steps: [
        { label: 'Ingest', note: 'CSV files, JSON from API', tone: 'ice' },
        { label: 'Validate', note: 'ranges, nulls, types', tone: 'gold' },
        { label: 'Clean', note: 'dupes, gaps, bad ticks', tone: 'gold' },
        { label: 'Align', note: 'one clock, IST', tone: 'ice' },
        { label: 'Store', note: 'indexed database', tone: 'neutral' },
      ],
    },
    optionChain: `The option chain is the main raw material of this module. A chain snapshot is a table keyed by strike and type with LTP, bid, ask, volume, OI and sometimes IV. It is a picture at one instant: if you save it every minute you can later compute OI change, IV change and replay the day. The chain by itself does not store history, so your own saved snapshots are what make research possible.`,
    psychology: `Data work feels boring, so beginners skip it and trust whatever file they downloaded. Then a strategy looks wonderful in the backtest because of a bad tick or a repeated row. The healthy habit is suspicion: assume the data has errors until checks show otherwise, and treat a surprisingly good backtest as a reason to inspect the data first.`,
    scenarios: {
      bullish: `A rising day produces many fast OI changes at upper strikes. If snapshots are missing or late in this period, your OI-change and breakout logic will show stale values exactly when speed matters.`,
      bearish: `On a sharp fall, ticks arrive in bursts and spreads widen. Bad prints and stale quotes become more common, so validation rules (price jump limits, bid-ask sanity) earn their keep.`,
      sideways: `In a range, data is calm and gaps are easy to forward-fill, but illiquid far strikes still show stale last-traded prices. Prefer bid-ask mid for such strikes and mark them as stale.`,
    },
    practice: [
      {
        q: `You store a chain for 21 strikes (CE and PE each) every minute for 375 minutes. How many rows per day?`,
        a: `Rows per snapshot = 21 × 2 = 42. Per day = 42 × 375 = 15,750 rows.`,
      },
      {
        q: `A 1-minute candle series shows closes 24,012, 2,401.3, 24,015. What is the one-minute change of the middle value and what should the cleaner do?`,
        a: `Change = (2,401.3 − 24,012) / 24,012 = −90.0%. A 90% one-minute move in NIFTY is not plausible; it is a decimal slip. Flag the row, do not delete silently: replace it with a null, log it, and then apply your missing-data rule.`,
      },
      {
        q: `A chain snapshot was saved 45 seconds after the spot value it is paired with. NIFTY moved 12 points in that time and the ATM call delta is about 0.52. How large is the premium mismatch?`,
        a: `Mismatch ≈ delta × spot move = 0.52 × 12 = about ₹6.24 per unit. Used in an implied-volatility or Greeks calculation, this makes the IV wrong; so pair every chain with the spot recorded in the same second.`,
      },
      {
        q: `A retry saved the same 82-row snapshot twice. What key removes the duplicates and how many rows remain?`,
        a: `Key = (timestamp, expiry, strike, option type). Sorting by this key and keeping one row per key leaves 82 rows from the 164 saved.`,
      },
    ],
    assignment: `Download one day of NSE bhavcopy or save one full day of your own chain snapshots. Load it into a table or spreadsheet, count rows, find any duplicate (timestamp, expiry, strike, type) keys and any prices that jump more than 5% between consecutive minutes, and write down what you found and how you fixed it.`,
  },
  topics: [
    {
      t: 1,
      def: `CSV (comma-separated values) is a plain-text table where each line is a row and commas separate columns. Many market datasets, such as NSE end-of-day files, come as CSV.`,
      hi: `CSV ek simple text table hota hai jisme har line ek row hoti hai aur columns comma se alag hote hain. Bahut saare market datasets, jaise NSE ke end-of-day files, CSV mein aate hain.`,
      how: `You read a CSV into a table (a dataframe in Python, or rows in Node.js), tell the reader which column is the date and which are numbers, and check the row count against what you expect. Watch for thousands separators, blank cells and dates in day-month-year order. NSE publishes end-of-day derivative data as downloadable files; always check the column names in the file itself, because formats can change. Keep the original file untouched and write cleaned output to a separate folder so you can always re-run the process.`,
      eg: { title: 'Row count sanity check', text: `A one-minute NIFTY spot file for one session should have 375 rows (9:15 to 15:30). Over 250 sessions that is 375 × 250 = 93,750 rows. If your file for a normal month of 20 sessions has 7,200 rows instead of 7,500 (20 × 375), then 300 candles are missing, about 4%, and you should find out where before testing anything.` },
      tip: `Never overwrite the raw file; keep it as the source of truth and write cleaned data elsewhere.`,
      visual: { kind: 'bars', title: 'Expected candles per period (1-minute NIFTY)', unit: ' rows', items: [{ label: '1 session', value: 375, tone: 'ice' }, { label: '20 sessions', value: 7500, tone: 'ice' }, { label: '250 sessions', value: 93750, tone: 'gold' }] },
    },
    {
      t: 2,
      def: `JSON is a text format for nested data: objects with named fields, and lists. Broker and exchange APIs usually return option chains and quotes as JSON.`,
      hi: `JSON ek text format hai jisme nested data hota hai: named fields wale objects aur lists. Broker aur exchange ke APIs aam taur par option chain aur quotes JSON mein dete hain.`,
      how: `An option-chain JSON typically nests strike → CE and PE → fields such as last price, OI, volume and bid-ask. To analyse it you flatten it into one row per strike and type. Always read fields by name, never by position, and handle fields that are missing for illiquid strikes. Store the raw response alongside the flattened table when you can, because if your flattening has a bug you can re-process the original. Field names differ between brokers, so map each provider to your own common schema.`,
      eg: { title: 'Flattening a chain', text: `A response covering 23,000 to 25,000 in steps of 50 holds 41 strike objects, each with a CE and a PE block. After flattening you expect 41 × 2 = 82 rows. If you get 80, two blocks were missing (maybe no trade yet on those contracts); you must decide whether to store them as nulls or skip them, and do it the same way every time.` },
      tip: `Flatten with a fixed schema and count the rows; a changed row count is your earliest warning that the API response changed.`,
      visual: { kind: 'flow', title: 'From nested JSON to rows', steps: [{ label: 'Raw JSON', note: 'strike → CE / PE', tone: 'ice' }, { label: 'Flatten', note: 'one row per strike and type', tone: 'gold' }, { label: 'Typed table', note: 'numbers, not text', tone: 'neutral' }] },
    },
    {
      t: 3,
      def: `Data cleaning means finding and fixing values that are wrong or unusable: impossible prices, wrong types, bad timestamps, and rows from outside market hours.`,
      hi: `Data cleaning ka matlab hai woh values dhundhna aur theek karna jo galat ya kaam ki nahi hain: impossible prices, galat types, bad timestamps, aur market hours ke bahar ki rows.`,
      how: `Write cleaning rules as explicit checks: price must be positive, high must be at least low, a one-minute return above a limit (for example 5% for an index) is flagged, volume cannot be negative, bid cannot exceed ask, time must lie within 9:15 to 15:30 IST for the regular session. Flag first, then decide: fix, drop or keep. Log every change with a count, so you can say how many rows were touched. A rule that drops 0.01% of rows is housekeeping; one that drops 15% means your assumption about the data is wrong.`,
      eg: { title: 'A decimal slip', text: `Closes read 24,012, then 2,401.3, then 24,015. The middle value is a −90.0% change in one minute, so the 5% rule flags it. The cleaner sets it to null and logs the event. A gap-fill rule then carries 24,012 forward, and the cleaned series is 24,012, 24,012, 24,015.` },
      tip: `Flag and log before you delete; silent cleaning hides the very problems you need to know about.`,
      calc: { id: 'return-calc', preset: { start: 24012, end: 2401.3, years: 1 }, why: `Quickly measures how large the jump between two prices is, to test it against your limit.` },
    },
    {
      t: 4,
      def: `Missing data means a value or a whole row that should exist but does not. Handling it means deciding, with a clear rule, whether to fill it, skip it or stop and raise an alarm.`,
      hi: `Missing data matlab woh value ya poori row jo honi chahiye thi lekin nahi hai. Ise handle karne ka matlab hai ek clear rule se tay karna ki fill karna hai, skip karna hai ya alarm bajana hai.`,
      how: `Missing candles can be caused by feed outages, no trades in a minute (common on far strikes) or your own downtime. For a liquid index price, carrying the last close forward for a short gap is reasonable; for a long gap it is not. For an illiquid option strike, a missing last price may simply mean no trade; use the bid-ask mid if a quote exists and mark the value as stale. Never fill OI or volume blindly: OI is updated by the exchange at its own pace, so a carried-forward OI is a different thing from a fresh one. Record a quality flag (observed, filled, stale) next to each value.`,
      eg: { title: 'A missing 12:41 candle', text: `The 12:41 candle is absent; 12:40 closed at 24,018 and 12:42 opened at 24,021. You forward-fill the close as 24,018 with volume 0 and flag it as "filled". Your backtest rule says any day with more than 5 filled candles out of 375 (1.3%) is excluded, so one missing candle is acceptable but a feed outage of 40 minutes is not.` },
      tip: `Decide your missing-data rules before you see backtest results; choosing them afterwards invites quiet cherry-picking.`,
    },
    {
      t: 5,
      def: `Duplicates are rows that repeat the same observation. Removing them means keeping exactly one row for each unique combination of time, contract and type.`,
      hi: `Duplicates woh rows hain jo ek hi observation ko dobara repeat karti hain. Unhe hatane ka matlab hai har unique time, contract aur type ke liye sirf ek hi row rakhna.`,
      how: `Duplicates appear from retries after a network error, overlapping downloads, or a scheduler running twice. Define the natural key for each table, for example (timestamp, expiry, strike, option type), and enforce it with a unique constraint in the database so duplicates cannot even be inserted. When duplicates differ in value, decide which to keep (usually the latest received, or the one with a later exchange timestamp). Counting duplicates before and after is the simplest test that the fix worked.`,
      eg: { title: 'Double-saved snapshot', text: `A retry saved the 10:15 chain twice, so the table holds 164 rows for that minute instead of 82. Without removal, a sum of CE OI would be exactly double and the put-call ratio would still look normal (both sides double), which is why this error hides well. After applying the key (timestamp, expiry, strike, type), 82 rows remain.` },
      tip: `Put a unique constraint on the natural key in the database; it is cheaper than hunting duplicates later.`,
      visual: { kind: 'compare', title: 'Before and after de-duplication', left: { head: 'Before', tone: 'bear', points: ['164 rows for 10:15', 'CE OI sum doubled', 'PCR looks fine, hides the error'] }, right: { head: 'After', tone: 'bull', points: ['82 rows for 10:15', 'One row per timestamp, expiry, strike, type', 'Unique key blocks repeats'] } },
    },
    {
      t: 6,
      def: `Timestamp alignment means making sure every piece of data that describes the same moment carries the same clock time, in the same timezone, so spot, futures and option values can be compared.`,
      hi: `Timestamp alignment ka matlab hai ki jo bhi data ek hi moment ko describe karta hai, uska clock time aur timezone same ho, taaki spot, futures aur option values ko compare kar sako.`,
      how: `Different feeds arrive with different delays. If spot is stamped 10:15:02 and the chain 10:15:47, you are mixing two moments. Store timestamps with timezone (IST, +05:30), round to a common bar such as the minute, and for each chain snapshot join the spot value that was valid at or just before the snapshot time, never after. Joining a future value to a past row is called look-ahead bias and makes backtests look better than reality. Also watch for exchange time versus your own receive time.`,
      eg: { title: '45 seconds of mismatch', text: `Spot is 24,000 at 10:15:02 and 24,012 at 10:15:47, while the chain you saved at 10:15:47 shows the 24,000 CE at about ₹198. With a delta near 0.52, the 12-point move explains 12 × 0.52 = ₹6.24 of the premium. If you calculate IV from ₹198 and the old spot 24,000, the IV is slightly overstated; with the matching spot of 24,012 it is correct.` },
      tip: `Join each snapshot to the latest spot that is at or before it, never after; a join from the future is look-ahead bias.`,
      calc: { id: 'greeks', preset: { optType: 'CE', spot: 24000, strike: 24000, days: 7, iv: 14, rate: 6.5 }, why: `See the delta that translates a spot-time mismatch into a premium error.` },
      visual: { kind: 'timeline', title: 'Two feeds, two moments', events: [{ when: '10:15:02', what: 'Spot 24,000 stamped', tone: 'ice' }, { when: '10:15:47', what: 'Chain saved; spot is now 24,012', tone: 'gold' }, { when: 'Rule', what: 'Join spot at or before chain time', tone: 'neutral' }] },
    },
    {
      t: 7,
      def: `Strike-wise organisation means arranging option data so that each strike, with its CE and PE values side by side, can be read and tracked over time.`,
      hi: `Strike-wise organisation ka matlab hai option data ko aise arrange karna ki har strike ke CE aur PE ke values saath-saath dikhein aur time ke saath track ho sakein.`,
      how: `Most analysis questions are per strike: how did OI at 24,200 CE change since morning, or where is put OI highest? Keep one long table keyed by time, expiry, strike and type, and create views that pivot it to a chain layout (strike in the middle, CE on one side, PE on the other). Also compute helper columns such as distance from spot, moneyness (ITM, ATM, OTM) and the offset from ATM in strike steps (ATM, +1, −1), so a rule like "sell the +4 strike" works on any day regardless of the spot level.`,
      eg: { title: 'ATM-relative strikes', text: `With spot 24,010 and step 50, the nearest strike is 24,000 (ATM). Offsets: 24,100 is +2 and 23,900 is −2. A stored OI strip for 23,900 to 24,100 is CE 8.0, 11.0, 15.0, 13.0, 9.0 lakh and PE 12.0, 14.0, 10.0, 7.0, 5.0 lakh (illustrative), so the total put OI is 48.0 lakh against 56.0 lakh call OI, a ratio of 0.857.` },
      tip: `Store strike offset from ATM next to the absolute strike; it lets one rule run on any day and any spot level.`,
      calc: { id: 'pcr', preset: { putOI: 4800000, callOI: 5600000, putVol: 0, callVol: 0 }, why: `Totals the strike-wise OI into a single put-call ratio for the strip.` },
      visual: { kind: 'oi', title: 'Strike-wise OI strip (illustrative, lakh contracts)', spot: 24010, rows: [{ strike: 23900, ce: 8, pe: 12 }, { strike: 23950, ce: 11, pe: 14 }, { strike: 24000, ce: 15, pe: 10 }, { strike: 24050, ce: 13, pe: 7 }, { strike: 24100, ce: 9, pe: 5 }] },
    },
    {
      t: 8,
      def: `Expiry-wise organisation means keeping each expiry's contracts separate and labelled with days to expiry, because the same strike behaves very differently in different expiries.`,
      hi: `Expiry-wise organisation ka matlab hai har expiry ke contracts ko alag rakhna aur days to expiry ka label dena, kyunki same strike alag expiries mein bilkul alag behave karta hai.`,
      how: `NSE index options have weekly and monthly expiries, scheduled on Tuesday as per current NSE rules (an expiry falling on a holiday moves to the previous trading day; verify the current schedule). Store the expiry date as a column and compute days to expiry (DTE) per row, because theta, gamma and premium depend strongly on it. A backtest on "expiry day" needs a clear definition of which contract counts as the nearest. Keep monthly and weekly series distinguishable and never mix them in one average.`,
      eg: { title: 'Same strike, different DTE', text: `On a Wednesday with spot 24,000 and IV 14%, the nearest Tuesday expiry has 6 days to run, and the next expiry has 13. The ATM call is worth about ₹185 for 6 days and about ₹281 for 13 days in the Black–Scholes model with r = 6.5% and no dividend (illustrative). Averaging these two without the expiry label would give a number that describes neither.` },
      tip: `Always carry DTE as a column; most option behaviour is explained by it.`,
      visual: { kind: 'compare', title: 'Same strike, different expiry', left: { head: 'Near expiry (6 DTE)', tone: 'ice', points: ['Lower premium', 'Higher gamma, faster theta', 'Reacts sharply to spot'] }, right: { head: 'Next expiry (13 DTE)', tone: 'gold', points: ['Higher premium', 'Slower theta', 'Smoother reaction'] } },
    },
    {
      t: 9,
      def: `Database design is deciding the tables, columns, keys and indexes that hold your data, so that it stays consistent and can be queried quickly.`,
      hi: `Database design ka matlab hai tables, columns, keys aur indexes tay karna jinme aapka data rakha jaata hai, taaki woh consistent rahe aur jaldi query ho sake.`,
      how: `A simple design for an options engine has an instruments table (symbol, expiry, strike, type, lot size), a spot_candles table (time, open, high, low, close), an option_snapshots table (time, instrument, LTP, bid, ask, OI, volume, IV) and a trades table for your own orders. Use a unique key on (time, instrument), a composite index matching your most common query (expiry, strike, type, time), and partition the big snapshot table by month. In PostgreSQL, store prices as numeric or double precision and times as timestamptz. Lot size changes over time, so store it with an effective date rather than as one constant.`,
      eg: { title: 'Sizing the snapshot table', text: `One expiry, 41 strikes × 2 types, 375 snapshots a day gives 30,750 rows a day and about 7,687,500 a year (250 sessions). At around 60 bytes per row that is roughly 461 MB a year before indexes. Monthly partitions of about 640,000 rows each (7,687,500 / 12) keep queries and deletions manageable.` },
      tip: `Store lot size with an effective date; a hard-coded 65 will quietly corrupt a backtest that spans a lot-size revision.`,
      visual: { kind: 'layers', title: 'A minimal options schema', layers: [{ label: 'instruments', note: 'symbol, expiry, strike, type, lot size with date', tone: 'ice' }, { label: 'spot_candles', note: 'time, OHLC', tone: 'ice' }, { label: 'option_snapshots', note: 'time, instrument, LTP, bid, ask, OI, volume, IV', tone: 'gold' }, { label: 'trades', note: 'your orders and fills', tone: 'neutral' }] },
    },
    {
      t: 10,
      def: `A historical snapshot is a saved picture of the market (for example the full option chain) at one moment. Storing snapshots builds the history that you cannot get later.`,
      hi: `Historical snapshot matlab market ki ek saved tasveer (jaise poori option chain) ek moment par. Snapshots store karne se aap woh history banate ho jo baad mein milti nahi.`,
      how: `Exchanges publish end-of-day files, but intraday history of the full chain (OI, bid-ask, IV at each minute) is generally not freely available, so many traders collect their own. Decide a frequency (every minute is common), the strike range, and a retention rule. Store raw values as received, plus your computed fields (IV, Greeks) labelled with the model and inputs used so they can be recomputed. Add a daily job that checks the day has about 375 snapshots and alerts if not. Compress older data, but never rewrite it.`,
      eg: { title: 'Daily completeness check', text: `A scheduler expects 375 snapshots from 9:15 to 15:30. On one day your table holds 351 snapshots, so 24 minutes (6.4%) are missing, probably a connection drop. The check marks that day as incomplete and the backtest excludes or flags it. Without the check, a 24-minute hole could contain the biggest move of the day.` },
      tip: `Start collecting snapshots today, even before you know what you will use them for; missing history cannot be recreated.`,
      visual: { kind: 'bars', title: 'Snapshots saved vs expected on a day', unit: '', items: [{ label: 'Expected', value: 375, tone: 'ice' }, { label: 'Saved', value: 351, tone: 'gold' }, { label: 'Missing', value: 24, tone: 'bear' }] },
    },
  ],
  tools: [{ id: 'return-calc', why: `Compare consecutive prices to test cleaning limits.` }],
}
export default m
