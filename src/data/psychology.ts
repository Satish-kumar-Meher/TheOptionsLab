/** Content for the psychology section (Level 23). Describes documented behavioural tendencies, never predictions. */

export interface Bias {
  id: string
  name: string
  /** One-line definition. */
  gist: string
  /** How it tends to show up in options trading specifically. */
  options: string[]
  warning: string
  counter: string
}

export const BIASES: Bias[] = [
  {
    id: 'fear',
    name: 'Fear',
    gist: 'Loss-avoidance arousal that shrinks the time horizon to the next tick.',
    options: [
      'Panic-closing a long option during normal theta decay or a routine 20% dip, then watching it recover.',
      'Skipping a valid setup because the last two trades lost.',
      'Closing short-option positions early at a loss the moment VIX jumps, even when the plan allowed for it.',
    ],
    warning: 'Your exit is triggered by how the P&L feels, not by the invalidation level you wrote down.',
    counter: 'Size so that the planned max loss is genuinely tolerable, and write the exit before entry. If the position keeps you from reading the chart calmly, it is too large.',
  },
  {
    id: 'greed',
    name: 'Greed',
    gist: 'Stretching for more after a gain, usually by removing the limits that produced it.',
    options: [
      'Moving a profit target further as the premium rises, then giving the whole gain back.',
      'Adding lots to a winning short-premium trade near expiry for the last few rupees of decay.',
      'Selling closer-to-the-money strikes for bigger credit without recomputing worst-case loss.',
    ],
    warning: 'Targets and size drift upward after a good week, and the plan is edited while a trade is open.',
    counter: 'Pre-define a profit rule (a fixed target or a trailing rule) and scale out in tranches. Review the plan only outside market hours.',
  },
  {
    id: 'fomo',
    name: 'FOMO',
    gist: 'Fear of missing out: entering because price already moved, not because the setup is present.',
    options: [
      'Buying a far-OTM call after a sharp rally because "it is still cheap".',
      'Chasing a breakout after the premium has already doubled, so the risk-reward is poor.',
      'Joining an expiry-day move late, when theta and spreads are working hardest against a buyer.',
    ],
    warning: 'You are staring at a move that has happened and rehearsing what you "would have made".',
    counter: 'Define a maximum chase distance in your entry rule. If price has run beyond it, the trade is skipped, and a missed move is logged as a non-event, not a loss.',
  },
  {
    id: 'revenge',
    name: 'Revenge trading',
    gist: 'Trading to win back a loss rather than to execute an edge.',
    options: [
      'Buying cheap OTM options right after a stop-out, hoping a lottery payoff will cover the loss.',
      'Doubling lots on the next trade to recover quickly.',
      'Taking trades outside your setups in the same session as a large loss.',
    ],
    warning: 'The next trade is bigger, faster or less planned than the last one, and the reason is about the previous trade.',
    counter: 'A hard rule: after a daily loss limit or two consecutive stop-outs, close the terminal for the session. Log the urge in the journal under "emotional trading".',
  },
  {
    id: 'overconfidence',
    name: 'Overconfidence',
    gist: 'Estimating your skill or the precision of your forecast as higher than the evidence supports.',
    options: [
      'Sizing up after a winning streak that may be luck, since options payoffs are highly skewed.',
      'Leaving naked short options unhedged because "it has always worked".',
      'Treating a handful of profitable expiries as proof of an edge.',
    ],
    warning: 'Position size grows faster than your sample of trades does.',
    counter: 'Tie size to a fixed risk budget per trade, not to recent results. Judge an edge by dozens of journaled trades and by expectancy, not by memory.',
  },
  {
    id: 'loss-aversion',
    name: 'Loss aversion',
    gist: 'Losses are felt more strongly than equal gains (a well-documented finding from prospect theory), so people avoid realising them.',
    options: [
      'Averaging down on a losing OTM option instead of accepting that the thesis failed.',
      'Holding a decaying long option "until it comes back", which time can make impossible.',
      'Cutting winners early to lock in a gain while letting losers run.',
    ],
    warning: 'Your average loss is larger than your average win, or you have no stop-loss on trades that went wrong.',
    counter: 'Place the invalidation level before entry, and treat adding to a loser as a new trade that must pass the full checklist. Track average win versus average loss monthly.',
  },
  {
    id: 'confirmation',
    name: 'Confirmation bias',
    gist: 'Seeking and weighing information that supports a view you already hold.',
    options: [
      'Reading rising put OI as proof of support while ignoring that OI alone does not show who initiated the position.',
      'Following only the analysts or posts that agree with your open trade.',
      'Dismissing a rising VIX when you are short premium.',
    ],
    warning: 'You can state the evidence for your trade at length but cannot state what would prove it wrong.',
    counter: 'Write the strongest argument against the trade before entering, and name the data (price, OI shift, VIX) that would make you exit.',
  },
  {
    id: 'recency',
    name: 'Recency bias',
    gist: 'Overweighting the most recent events when judging what is normal.',
    options: [
      'Assuming a calm few weeks mean low VIX will stay low, then selling too much premium.',
      'Expecting last week\'s expiry-day pattern to repeat.',
      'Abandoning a sound setup after a short run of losses that is within normal variance.',
    ],
    warning: 'Your outlook changes with the last session, and not with the broader sample.',
    counter: 'Judge setups on at least 30 logged trades, and compare current VIX with its longer range rather than with last week.',
  },
  {
    id: 'anchoring',
    name: 'Anchoring bias',
    gist: 'Over-relying on a reference number, such as your entry price or a past peak, when deciding what to do next.',
    options: [
      'Refusing to exit until an option "gets back to my buy price of 120".',
      'Judging an option as "cheap" because it was 200 last week, ignoring that spot, IV and days to expiry have changed.',
      'Treating a Max Pain figure or a round-number strike as a price target.',
    ],
    warning: 'Your reason to hold is a number from the past rather than the current state of the trade.',
    counter: 'Ask "would I enter this position now, at this price, with this much time left?" If not, the entry price is an anchor, and holding is a new decision you are making.',
  },
  {
    id: 'discipline',
    name: 'Emotional discipline',
    gist: 'The skill behind all the rest: following the plan when it is uncomfortable.',
    options: [
      'Taking the stop-loss on expiry day when a bounce looks possible.',
      'Passing on a day with no valid setup instead of forcing one.',
      'Keeping the position size fixed after a big win or a big loss.',
    ],
    warning: 'Rule exceptions are becoming frequent, and they cluster on days when you feel strong emotions.',
    counter: 'Make the plan checkable (see the pre-trade checklist below), log every deviation as "breaking rules", and review the count weekly. Discipline is built from small, repeated, observable behaviours.',
  },
]

export interface CyclePhase {
  id: string
  name: string
  /** 0..100, position on the sentiment axis (higher = more greed). */
  level: number
  /** Where along the cycle, 0..1. */
  t: number
  summary: string
  /** Typical option-market symptoms. Descriptive, not predictive. */
  symptoms: string[]
}

export const CYCLE: CyclePhase[] = [
  { id: 'disbelief', name: 'Disbelief', t: 0.04, level: 28, summary: 'Early recovery. Most participants still expect the previous decline to resume.', symptoms: ['Put protection is still expensive and widely held.', 'VIX is easing from a high level but remains elevated.', 'Little appetite for OTM call buying.'] },
  { id: 'optimism', name: 'Optimism', t: 0.2, level: 52, summary: 'The trend is becoming accepted. Hedges are trimmed.', symptoms: ['Put skew flattens as hedging demand falls.', 'India VIX drifts lower.', 'Call volumes rise steadily at nearby strikes.'] },
  { id: 'euphoria', name: 'Euphoria', t: 0.4, level: 92, summary: 'Risk-taking is at its most extreme, and leverage is often highest.', symptoms: ['Surges of far-OTM call buying and very high call volumes.', 'VIX often sits at the low end of its range, so protection is cheap but little is bought.', 'Short-dated lottery-style positions increase.'] },
  { id: 'anxiety', name: 'Anxiety', t: 0.56, level: 66, summary: 'First sharp drops are dismissed as dips; some positions are quietly trimmed.', symptoms: ['VIX makes sudden upward jumps on down days.', 'Call writers start to defend strikes.', 'Hedging demand returns, first at nearby puts.'] },
  { id: 'denial', name: 'Fear', t: 0.72, level: 36, summary: 'Losses grow. Many hold on, waiting to get back to their entry.', symptoms: ['Averaging down in long options.', 'Put volumes climb and VIX rises with them.', 'Wider bid-ask spreads in OTM strikes.'] },
  { id: 'capitulation', name: 'Capitulation', t: 0.88, level: 6, summary: 'Forced and emotional selling. The point of maximum pessimism, identifiable mostly in hindsight.', symptoms: ['Panic put buying and a VIX spike.', 'Very high volumes with large intraday ranges.', 'Short-premium positions are closed under margin pressure.'] },
]

export interface ExpiryPhase {
  id: string
  label: string
  when: string
  behaviour: string[]
  note: string
}

export const EXPIRY_PHASES: ExpiryPhase[] = [
  {
    id: 'early',
    label: 'Several days out',
    when: 'Days before expiry',
    behaviour: ['Positions are built on both sides, with hedging and directional views in the mix.', 'Time decay is gradual, so there is less urgency to act.', 'OI is still building, so it is a weak guide to eventual levels.'],
    note: 'Participants have time to be wrong, and size tends to be larger.',
  },
  {
    id: 'eve',
    label: 'Day before',
    when: 'Expiry minus one',
    behaviour: ['Decisions begin to be driven by the decay curve: some roll positions forward, some close them.', 'Hedges are trimmed on the strikes that now look safe.', 'OI starts to be read as a map of nearby levels, though who holds what is uncertain.'],
    note: 'A rise in rolling activity can be mistaken for fresh conviction.',
  },
  {
    id: 'morning',
    label: 'Expiry morning',
    when: 'First hour',
    behaviour: ['Premiums of near-the-money options reprice fast with each point move in spot.', 'Gamma is high, so small moves change deltas quickly and stress both writers and buyers.', 'Retail buyers often target cheap OTM options for a lottery-type payoff.'],
    note: 'High gamma means outcomes can be large in either direction. The odds of a decaying option finishing worthless are high, and so are the odds of a hedged writer being stopped out.',
  },
  {
    id: 'afternoon',
    label: 'Expiry afternoon',
    when: 'Last two hours',
    behaviour: ['Writers close or hedge shorts that are near the money to remove pin and gap risk.', 'Out-of-the-money premiums collapse; the remaining buyers hold ever-cheaper tickets.', 'Pinning, which means drifting toward large-OI strikes, is sometimes observed but not reliable.'],
    note: 'Decisions made under time pressure are where discipline errors cluster: widened stops, doubled size, and chasing.',
  },
]

export interface CheckItem {
  id: string
  label: string
  prompt: string
  placeholder: string
}

export const CHECKLIST: CheckItem[] = [
  { id: 'reason', label: 'Reason for entry', prompt: 'What setup is present, and what is the edge?', placeholder: 'e.g. Opening-range break with a supportive OI shift' },
  { id: 'invalidation', label: 'Invalidation level', prompt: 'What price or event proves the idea wrong?', placeholder: 'e.g. Close back below 23,950 on the 15-min chart' },
  { id: 'size', label: 'Position size', prompt: 'How many lots, and is that within your risk budget?', placeholder: 'e.g. 2 lots' },
  { id: 'maxloss', label: 'Max loss in ₹', prompt: 'The most you accept losing on this trade.', placeholder: 'e.g. ₹3,000' },
  { id: 'exit', label: 'Exit plan', prompt: 'Target, trailing rule and time stop, decided now.', placeholder: 'e.g. Half at 1:1.5, trail the rest under the 5-min low' },
  { id: 'wrong', label: 'Scenario for being wrong', prompt: 'What do you do if the market goes against you immediately?', placeholder: 'e.g. Exit at the stop, no averaging, pause for 30 minutes' },
]

export const MOOD_LABELS: Record<number, string> = {
  1: 'Agitated or tilted',
  2: 'Stressed or distracted',
  3: 'Neutral',
  4: 'Calm and focused',
  5: 'Calm, rested and unattached to the outcome',
}

export interface ReviewPrompt {
  id: string
  topic: string
  question: string
  detail: string
}

/** Module 25.4 turned into a weekly-review ritual. */
export const REVIEW_PROMPTS: ReviewPrompt[] = [
  { id: 'setups', topic: 'Identify profitable setups', question: 'Which setup has the best expectancy over the full sample?', detail: 'Use the setup-wise table. Prefer a setup with enough trades to mean something, and be wary of a small sample.' },
  { id: 'weak', topic: 'Remove weak setups', question: 'Which setup has lost money or has a profit factor below 1 across many trades?', detail: 'Consider pausing it for a month. Retire it only after you understand why it fails.' },
  { id: 'losers', topic: 'Review losing trades', question: 'Did the loss come from the plan being wrong, or from not following the plan?', detail: 'A good trade can lose. A bad trade can win. Tag each loser with a mistake or "none".' },
  { id: 'entry', topic: 'Improve entry rules', question: 'How many entries were late, chased or taken without a setup?', detail: 'Add one measurable condition, for example a maximum chase distance, and test it next week.' },
  { id: 'exit', topic: 'Improve exit rules', question: 'Did you exit early on winners or hold losers beyond the stop?', detail: 'Compare average win with average loss, then check exit reasons for "hope" or "fear".' },
  { id: 'size', topic: 'Improve position sizing', question: 'Was any single loss bigger than the risk budget you set?', detail: 'Position size should be set by max loss, not by conviction.' },
  { id: 'weekly', topic: 'Review weekly performance', question: 'Which days and weeks carried most of the P&L, and what did you do differently on the bad ones?', detail: 'Open the weekly P&L list. Look for a pattern in day of week, expiry days and number of trades per day.' },
  { id: 'regime', topic: 'Analyse market regimes', question: 'How did results differ between low-VIX and high-VIX days, and expiry versus non-expiry days?', detail: 'Use the VIX field and the date to group trades. Regimes shift, so what worked may not persist.' },
  { id: 'monthly', topic: 'Monthly strategy evaluation', question: 'At month-end: is the equity curve, drawdown and mistake count consistent with the plan?', detail: 'Decide one thing to keep, one to change, and one to stop.' },
  { id: 'playbook', topic: 'Maintain a documented playbook', question: 'Is every setup you trade written down with entry, exit, size and invalidation?', detail: 'If a rule is not written, you cannot audit it, so write it down.' },
]

export interface ParticipantLens {
  id: string
  question: string
  reading: string
  caution: string
}

/** Module 23.3 participant questions: ways to frame what the option chain may be showing. Hypotheses, not facts. */
export const PARTICIPANT_LENSES: ParticipantLens[] = [
  { id: 'trapped', question: 'Who is trapped?', reading: 'Buyers who entered a breakout that failed, or writers whose strike was breached, may be holding positions at a loss they are reluctant to close.', caution: 'You cannot see anyone\'s entry price in aggregate OI. "Trapped" is an inference from price action, not a data field.' },
  { id: 'pressure', question: 'Who is under pressure?', reading: 'Writers near a level that spot is approaching, especially with rising VIX and shrinking time to expiry, face growing margin and hedging needs.', caution: 'Falling premium on the opposite side may simply be time decay.' },
  { id: 'adding', question: 'Who is adding or reducing?', reading: 'Rising OI with rising volume suggests new positions are being opened; falling OI suggests positions are being closed.', caution: 'OI alone does not reveal who initiated the position or whether it is a hedge.' },
  { id: 'hedging', question: 'Who is hedging?', reading: 'Demand for puts that rises while spot is calm can reflect protection buying by holders of the underlying.', caution: 'The same put can be a hedge, a bet or part of a spread.' },
  { id: 'defending', question: 'Who is defending a level?', reading: 'Large OI at a strike that persists while spot tests it is sometimes read as a defended level.', caution: 'High OI is a potential level, not a guarantee. Levels give way, and OI can be unwound quickly.' },
  { id: 'expectations', question: 'Who is changing expectations?', reading: 'A shift of the highest-OI strikes, or a move in India VIX, may reflect participants updating their expected range.', caution: 'VIX measures expected volatility, not direction.' },
]
