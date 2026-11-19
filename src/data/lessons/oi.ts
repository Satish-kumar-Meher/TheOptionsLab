import type { Lesson } from '../lessonTypes'
import { f, sg } from './util'

// ---------- 7.3 Four futures positioning patterns ----------
export const lesson73: Lesson = {
  moduleId: '7.3',
  summary:
    'In index futures, price direction combined with the direction of open interest gives a widely used four-way classification: long build-up, short build-up, short covering and long unwinding. The same table cannot be copied onto option-chain OI, because an option’s price depends on IV and time as well as the index, and every option contract has a buyer and a seller. This module teaches the table and, more importantly, its boundaries.',
  objectives: [
    'State the four futures patterns from the (price, OI) combination.',
    'Explain why a futures position has a clear directional meaning that an option contract’s OI does not.',
    'Classify a day’s futures move from price and OI change, with percentage changes.',
    'Explain why the same pattern is a tendency, not a prediction.',
    'List at least three reasons the table cannot be applied blindly to option OI.',
  ],
  concepts: [
    { term: 'Long build-up', definition: 'Price rising and OI rising. New long positions are being opened and are being matched by new shorts. It suggests fresh participation on the upside, not a guaranteed continuation.' },
    { term: 'Short build-up', definition: 'Price falling and OI rising. New positions are opening while price falls, which is read as fresh selling pressure. The opposite side holds an equal number of new longs.' },
    { term: 'Short covering', definition: 'Price rising and OI falling. Existing shorts are being closed (bought back), which pushes price up while open positions shrink. Rallies driven by covering tend to be weaker evidence of new buying.' },
    { term: 'Long unwinding', definition: 'Price falling and OI falling. Existing longs are being closed. The fall is driven by exits rather than by new selling.' },
    { term: 'Why futures are different', definition: 'A futures price is the underlying’s forward price, so price direction is a direct signal of buying versus selling pressure, and OI tells you whether positions are being opened or closed.' },
    { term: 'Why options differ', definition: 'An option premium moves with spot, IV and time decay. A rising CE premium can come from a rising index, rising IV, or both; a falling premium may be pure theta. OI at a strike also contains both a buyer and a seller of every contract.' },
    { term: 'Both sides exist', definition: 'Every contract has a long and a short. OI alone cannot show who initiated the trade; the pattern describes net pressure inferred from price, not an identified participant.' },
  ],
  examples: [
    {
      title: 'Classifying four futures days',
      given: ['Nifty futures, illustrative end-of-day values. OI in lots.', 'Day A: 24,000 → 24,120, OI 1,00,000 → 1,08,000', 'Day B: 24,120 → 23,990, OI 1,08,000 → 1,15,000', 'Day C: 23,990 → 24,090, OI 1,15,000 → 1,07,000', 'Day D: 24,090 → 23,960, OI 1,07,000 → 1,01,000'],
      steps: [
        `Day A: price ${sg(120)} points (${f((120 / 24000) * 100, 2)}%), OI ${sg(8000)} lots (${f(8, 1)}%) → price up, OI up → long build-up.`,
        `Day B: price ${sg(-130)} points (${f((-130 / 24120) * 100, 2)}%), OI ${sg(7000)} lots (${f((7000 / 108000) * 100, 1)}%) → price down, OI up → short build-up.`,
        `Day C: price ${sg(100)} points, OI ${sg(-8000)} lots (${f((-8000 / 115000) * 100, 1)}%) → price up, OI down → short covering.`,
        `Day D: price ${sg(-130)} points, OI ${sg(-6000)} lots (${f((-6000 / 107000) * 100, 1)}%) → price down, OI down → long unwinding.`,
      ],
      takeaway: 'The table only needs two signs. Its value comes from also noting the size of the move, whether volume confirms it and where the day sits within the wider trend.',
    },
    {
      title: 'Why the same logic fails on option OI',
      given: ['24,100 CE, illustrative: OI rises 20% while the premium falls from 80 to 60', 'Spot fell 40 points during the same period'],
      steps: [
        'Applying the futures table to the premium would read "price down, OI up → short build-up" and suggest call writing.',
        'But the premium fell partly because spot fell (delta effect) and partly because of time decay, so a falling premium is expected with or without any writing.',
        'Rising OI means new contracts were opened. Opened by whom is not in the data: a trader writing the call and a trader buying the call at a lower price both create OI.',
        'Without trade-direction data (who hit the bid, who lifted the offer) the OI alone cannot separate these.',
      ],
      takeaway: 'Use the table for futures. For options, treat OI changes as hypotheses to be tested against premium, IV, volume and spot behaviour.',
    },
  ],
  scenarios: {
    bullish: { text: 'Futures rise with OI rising (long build-up) and the next day’s OI continues to rise on pullbacks. This supports a view of fresh participation, but it must be checked against the rising level of the index and volume.' },
    bearish: { text: 'Futures fall with OI rising (short build-up) and bounces fade with OI still rising. That points to persistent selling pressure; the risk is a sharp short covering rally if news turns.' },
    sideways: { text: 'Futures drift with OI roughly flat. No pattern is established, and rolling from the near month to the next month can make OI appear to fall without any directional meaning.' },
  },
  pitfalls: [
    'Reading the four patterns as predictions. They describe what happened during a period, not what will happen next.',
    'Ignoring expiry and roll. OI in the expiring contract falls as positions are rolled; compare combined OI across months before calling it unwinding.',
    'Copying the table onto option strikes. A rising OI at a CE strike does not automatically mean writers; a falling premium does not automatically mean writers either.',
    'Using a single day. Patterns across several sessions, with volume, carry more information than one print.',
    'Treating "long" or "short" as identified participants. OI cannot show who initiated or who the traders are.',
  ],
  practice: [
    { q: 'Price up 0.6%, futures OI down 4%. Which pattern is this and what does it suggest?', a: 'Price rising with OI falling is short covering. The rise is partly driven by existing shorts buying back, so it is weaker evidence of new buying.' },
    { q: 'Price down 0.4%, OI up 6%. Which pattern?', a: 'Short build-up: fresh positions opened while price fell.' },
    { q: 'Why is "OI up, premium down → call writing" unreliable for an option strike?', a: 'The premium can fall from theta or from a falling spot alone, and rising OI includes both buyers and writers of new contracts. OI cannot show who initiated the trade.' },
    { q: 'Near-month futures OI falls 10% on expiry day while next-month OI rises 9%. Is this long unwinding?', a: 'Not necessarily. Positions are being rolled forward, so the fall in the expiring contract is offset by next-month OI. Compare combined OI.' },
  ],
  assignment:
    'Take five days of Nifty futures price and OI (from the exchange’s data or your broker). Label each day with one of the four patterns, note the volume, and write two sentences per day on whether the next session followed the pattern. Record where it did not.',
  lab: { to: '/labs/open-interest', label: 'Open the Open Interest lab' },
}

// ---------- 7.6 OI limitations ----------
const rows76 = [
  { strike: 23800, ceOI: 410000, ceChg: 20000, ceLTP: 292.0, peLTP: 42.0, peChg: 55000, peOI: 980000 },
  { strike: 23900, ceOI: 560000, ceChg: 35000, ceLTP: 205.0, peLTP: 55.0, peChg: 70000, peOI: 870000 },
  { strike: 24000, ceOI: 1250000, ceChg: 160000, ceLTP: 140.0, peLTP: 90.0, peChg: 110000, peOI: 1330000 },
  { strike: 24100, ceOI: 1480000, ceChg: 240000, ceLTP: 82.0, peLTP: 132.0, peChg: 20000, peOI: 640000 },
  { strike: 24200, ceOI: 1110000, ceChg: 90000, ceLTP: 50.0, peLTP: 200.0, peChg: -10000, peOI: 420000 },
]
const vol = 1_000_000
const oiChg = 240000

export const lesson76: Lesson = {
  moduleId: '7.6',
  summary:
    'Open interest counts open contracts, and every open contract has a buyer and a seller. That one fact sets the limits of every OI-based inference: OI cannot say who initiated a trade, rising OI does not automatically mean writing, falling OI does not automatically mean writers exiting, and the data can lag. OI is useful when read together with price, volume, IV and trade direction.',
  objectives: [
    'Explain why every open contract has both a buyer and a seller.',
    'Explain why rising OI does not automatically mean writing and falling OI does not automatically mean writer exit.',
    'Relate OI change to volume and explain why OI change cannot exceed volume.',
    'Describe how delayed OI updates can mislead intraday decisions.',
    'Build a checklist that combines OI with price, volume, IV and trade direction.',
    'Interpret total OI and OI change together rather than either alone.',
  ],
  concepts: [
    { term: 'Both sides of every contract', definition: 'Open interest of 10,000 lots at a 24,100 CE means 10,000 lots long and 10,000 lots short exist. The data shows how many contracts are open, not who is who.' },
    { term: 'Initiator problem', definition: 'A new contract is created when a buyer and a seller both open a position. Whether the buyer lifted an offer or the seller hit a bid is trade-direction data that OI does not contain. OI alone cannot reveal who initiated it.' },
    { term: 'Rising OI ≠ writing', definition: 'New OI can come from fresh option buying and fresh option writing alike. It also includes spreads and hedges, in which one leg is not a directional view.' },
    { term: 'Falling OI ≠ writer exit', definition: 'OI falls when both sides close positions, or when buyers close against sellers. Buyers cutting positions also reduces OI.' },
    { term: 'OI vs volume', definition: 'Volume counts contracts traded during the day, including those opened and closed within it. OI change is the net number of contracts opened minus closed. High volume with small OI change signals churn and intraday trading.' },
    { term: 'Delayed or end-of-day updates', definition: 'OI figures are published at exchange intervals and finalised at day end. An intraday OI snapshot may lag the market, and vendors can differ, so a reading may already be stale when you act on it.' },
    { term: 'Total OI plus OI change', definition: 'Total OI shows where positions are concentrated; OI change shows what is happening today. A high total with a falling change can mean a level is being abandoned; a small total with a big jump may be a new level forming.' },
    { term: 'High OI is a potential level, not a guarantee', definition: 'Large OI can attract attention and sometimes acts as support or resistance, but it does not guarantee that price will stop there or reverse.' },
  ],
  examples: [
    {
      title: 'OI change versus volume at the 24,100 CE',
      given: [`24,100 CE, illustrative day: OI change ${sg(oiChg)} contracts; volume ${f(vol)} contracts`, 'Premium moved from 94 to 82'],
      steps: [
        `OI change as a share of volume = ${f(oiChg)} ÷ ${f(vol)} = ${f((oiChg / vol) * 100, 0)}%.`,
        `So at most about ${f((oiChg / vol) * 100, 0)}% of trades could have created net new contracts; the other ${f(100 - (oiChg / vol) * 100, 0)}% or more were closes or intraday churn.`,
        'The premium fell 12 points. That is consistent with call writing, but also with a spot dip plus theta, so it is not proof.',
        'To go further you would check price action, IV at that strike versus neighbours and, if available, trade-direction data.',
      ],
      takeaway: 'OI change shows net positions opened; volume shows activity. Compare them before you build a story from either.',
    },
    {
      title: 'Same OI, different stories',
      given: ['A strike shows OI up 1,00,000 contracts', 'Case 1: a trader writes calls and a hedger buys them', 'Case 2: a trader buys calls and a market maker writes them', 'Case 3: a spread trade opens a 24,100 call long and a 24,300 call short'],
      steps: [
        'In every case OI rises by the same amount at the strike.',
        'Case 1 reads bearish if you assume writers; Case 2 reads bullish if you assume buyers; Case 3 is a defined-risk view that is hardly directional at one strike.',
        'The data cannot distinguish them. A confident one-line interpretation of rising OI is a guess about initiators.',
      ],
      takeaway: 'Treat OI-based readings as hypotheses and test them with price, volume, IV and the wider structure of the chain.',
    },
  ],
  chain: {
    caption: 'Illustrative simulated chain, OI in contracts, spot ≈ 24,050. Not live data.',
    rows: rows76,
    reading: [
      'Highest CE OI is at 24,100 and highest PE OI at 24,000, which makes a potential range, not a prediction that price will stay in it.',
      'The big OI change at 24,100 CE (+2,40,000) could reflect writing, buying or spreads; OI alone does not say which.',
      'Compare the CE premium (82) with neighbours and with IV before concluding anything about writers.',
    ],
  },
  pitfalls: [
    'Saying "OI is up so writers are building" as if it were a fact. It is a hypothesis about initiators.',
    'Assuming falling OI means writers are covering. Buyers closing can reduce OI just as well.',
    'Using stale intraday snapshots as a live signal.',
    'Ignoring volume. Large volume with little OI change is churn; it is not "positioning".',
    'Treating high OI as a wall. Price can and does pass through high-OI strikes.',
    'Reading OI without IV and price, which carry much of the information about who is paying for what.',
  ],
  practice: [
    { q: 'A strike’s OI rises by 50,000 and volume is 4,00,000. What share of volume created net new contracts, at most?', a: '50,000 ÷ 4,00,000 = 12.5%. The rest was closes or intraday trading.' },
    { q: 'Why can OI not tell you who initiated a trade?', a: 'Every new contract has a buyer and a seller, and OI records only that a contract is open. The initiator is shown by trade-direction data, not OI.' },
    { q: 'OI at a PE strike falls by 30,000 and premium rises. Is it safe to conclude put writers are exiting?', a: 'No. Falling OI can come from buyers closing too, and premium can rise from IV or spot. Check volume and price action before drawing a conclusion.' },
    { q: 'Name four things to combine with OI before acting.', a: 'Price (spot and premium), volume, IV, and trade direction (and the OI change alongside total OI).' },
  ],
  assignment:
    'Pick one liquid strike. For three consecutive days record total OI, OI change, volume, premium and IV. Write the three different explanations that fit the OI change, then note which of your checks could rule each one out.',
  lab: { to: '/labs/option-chain', label: 'Open the Option Chain lab' },
}

// ---------- 8.6 PCR ----------
const pcr = {
  putOI: rows76.reduce((a, r) => a + r.peOI, 0),
  callOI: rows76.reduce((a, r) => a + r.ceOI, 0),
}
const putVol = 3_450_000
const callVol = 5_200_000
const oiPcr = pcr.putOI / pcr.callOI
const volPcr = putVol / callVol

export const lesson86: Lesson = {
  moduleId: '8.6',
  summary:
    'The Put-Call Ratio compares put activity with call activity, using open interest or traded volume. It is a crowd-positioning gauge that can be read as supportive or contrarian depending on context, but it is a ratio of totals that hides who holds the contracts and cannot predict direction. Used with price, strike-level OI and VIX, it helps describe sentiment; used alone it misleads.',
  objectives: [
    'Compute OI PCR and volume PCR from option-chain data.',
    'Explain strike-wise PCR versus overall PCR.',
    'Describe the bullish and bearish readings, and the contrarian reading at extremes.',
    'Identify divergence between OI PCR and volume PCR and explain what it may mean.',
    'List the limitations of PCR, including the writer/buyer ambiguity.',
  ],
  concepts: [
    { term: 'PCR', definition: 'Put-Call Ratio: a measure of put activity relative to call activity. It is a ratio of totals, so it does not reveal who holds the contracts.' },
    { term: 'OI PCR', definition: 'Total put open interest divided by total call open interest across selected strikes. It reflects accumulated positions.' },
    { term: 'Volume PCR', definition: 'Put volume divided by call volume over a period. It reflects flow and moves faster than OI PCR.' },
    { term: 'Strike-wise PCR', definition: 'Put OI ÷ call OI at a single strike. It highlights where puts or calls dominate, and it is more meaningful for locating potential levels than for forecasting.' },
    { term: 'Overall PCR', definition: 'PCR for the whole chain or for a chosen band around spot. Choice of band changes the number, so state which strikes are included.' },
    { term: 'Bullish and bearish readings', definition: 'A higher PCR is often read as more puts written (supportive) and a lower PCR as more calls written (resistance). But high PCR can also be put buying for protection, so it can be bearish. OI cannot tell which.' },
    { term: 'Overbought and oversold', definition: 'At extremes, some traders read a very high PCR as excessive fear (oversold, contrarian bullish) and a very low PCR as excessive optimism (overbought, contrarian bearish). Extremes can persist.' },
    { term: 'PCR divergence', definition: 'When price makes a new high while PCR falls (or the reverse), or when OI PCR and volume PCR point in opposite directions. It is a prompt to investigate, not a signal.' },
  ],
  formulas: [
    { label: 'OI PCR', tex: String.raw`\text{PCR}_{OI}=\frac{\sum \text{Put OI}}{\sum \text{Call OI}}` },
    { label: 'Volume PCR', tex: String.raw`\text{PCR}_{vol}=\frac{\sum \text{Put volume}}{\sum \text{Call volume}}` },
    { label: 'Strike-wise PCR', tex: String.raw`\text{PCR}_{K}=\frac{\text{Put OI}_K}{\text{Call OI}_K}` },
  ],
  examples: [
    {
      title: 'Computing OI PCR, volume PCR and strike-wise PCR',
      given: ['Chain on the right (illustrative), five strikes from 23,800 to 24,200', `Total put volume ${f(putVol)}, total call volume ${f(callVol)} (illustrative)`],
      steps: [
        `Total put OI = ${f(pcr.putOI)}; total call OI = ${f(pcr.callOI)}.`,
        `OI PCR = ${f(pcr.putOI)} ÷ ${f(pcr.callOI)} = ${f(oiPcr, 2)}.`,
        `Volume PCR = ${f(putVol)} ÷ ${f(callVol)} = ${f(volPcr, 2)}.`,
        ...rows76.map((r) => `Strike ${f(r.strike)}: ${f(r.peOI)} ÷ ${f(r.ceOI)} = ${f(r.peOI / r.ceOI, 2)}.`),
        `Divergence: OI PCR ${f(oiPcr, 2)} sits near 1 while volume PCR ${f(volPcr, 2)} is clearly below 1, so today’s flow is call-heavy while accumulated OI is balanced.`,
      ],
      takeaway: 'Different PCRs answer different questions. Always say which PCR, over which strikes, and compare with spot and the strike-wise picture.',
    },
    {
      title: 'Two readings of the same PCR',
      given: ['OI PCR rises from 0.8 to 1.2 over three sessions while Nifty rises'],
      steps: [
        'Reading one: more puts are being written as the index rises, a supportive reading.',
        'Reading two: investors are buying puts to protect gains, a cautious reading.',
        'The ratio is identical in both cases. Distinguishing them needs premium and IV behaviour, volume and trade direction.',
      ],
      takeaway: 'PCR describes balance, not intent. Treat each reading as a hypothesis.',
    },
  ],
  chain: {
    caption: 'Illustrative simulated chain used for the PCR calculation. OI in contracts. Not live data.',
    rows: rows76,
    reading: [
      `OI PCR over the five strikes is ${f(oiPcr, 2)}.`,
      'Strike-wise PCR is highest at the lower strikes and lowest at 24,200, as expected for a chain with puts concentrated below spot and calls above.',
      'Such a distribution describes a potential range, not a forecast.',
    ],
  },
  scenarios: {
    bullish: { text: 'PCR rising while price rises, with put OI building at or below spot, can reflect supportive writing; it fails if the same rise comes from protective put buying.' },
    bearish: { text: 'PCR falling while price falls, with call OI building above spot, can reflect resistance forming; it fails if it is simply covering of earlier put positions.' },
    sideways: { text: 'PCR near 1 with balanced strike-wise OI is consistent with a range, but a PCR near 1 can also appear before a breakout.' },
  },
  pitfalls: [
    'Using one PCR threshold ("above 1.2 is bullish") as a rule. Thresholds shift with expiry, strikes included and market regime.',
    'Mixing OI PCR and volume PCR without saying which.',
    'Forgetting that PCR is dominated by far-from-spot strikes if the whole chain is included.',
    'Reading PCR as direction. It is a ratio of positions whose holders are unknown.',
    'Ignoring expiry effects: PCR for the current expiry and for all expiries can differ significantly.',
  ],
  practice: [
    { q: 'Put OI is 18,00,000 and call OI is 24,00,000. Compute OI PCR.', a: '18,00,000 ÷ 24,00,000 = 0.75.' },
    { q: 'Put volume is 6,00,000 and call volume is 4,00,000. Volume PCR, and what does it say?', a: '1.5. More put volume than call volume today, which is a statement about flow, not about who is buying or writing.' },
    { q: 'Why can a rising PCR be both supportive and cautious?', a: 'It can reflect puts being written (supportive) or puts being bought for protection (cautious). The ratio cannot distinguish the two.' },
    { q: 'OI PCR is 1.3 and volume PCR is 0.6. What should you do?', a: 'Treat it as a divergence: accumulated positions lean put-heavy while today’s flow is call-heavy. Check strike-wise OI, spot behaviour and IV before forming a view.' },
  ],
  assignment:
    'For one week, record spot, OI PCR, volume PCR and the strike with the highest put and call OI at the close. Mark each day as supportive, cautious or unclear, and then check whether the next day’s range was inside the OI band. Report how often it was, with the sample size.',
  lab: { to: '/labs/option-chain', label: 'Open the Option Chain lab' },
}
