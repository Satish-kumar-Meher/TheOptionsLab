/** Level 15.5 "Advanced OI Scenarios": the ten topics from the curriculum, each analysed on the same eight dimensions.
 *  Language is deliberately hedged: OI alone cannot show who initiated a trade, so every scenario lists alternatives. */

export type Dir = 'up' | 'down' | 'flat'

export interface OiScenario {
  id: string
  /** Exact curriculum topic wording, minus the trailing full stop. */
  title: string
  short: string
  /** Direction of the three things the mini visual draws. */
  price: Dir
  ce: Dir
  pe: Dir
  priceMove: string
  oiChange: string
  volume: string
  premium: string
  iv: string
  behaviour: string[]
  alternatives: string[]
  confirm: string[]
  invalidate: string[]
  /** One-line honest caution shown under the visual. */
  caution: string
}

export const OI_SCENARIOS: OiScenario[] = [
  {
    id: 's1',
    title: 'Nifty rises + CE OI decreases',
    short: 'Rally while call OI shrinks',
    price: 'up', ce: 'down', pe: 'flat',
    priceMove: 'Spot is trending or ticking higher through, or near, strikes that carried call OI.',
    oiChange: 'Open contracts at those call strikes fall. Contracts are being closed, not newly opened.',
    volume: 'Often elevated at the affected calls, because closing trades still print volume.',
    premium: 'Call premiums usually rise with spot, but can rise less than delta suggests if IV is falling.',
    iv: 'Typically flat or easing in a steady grind; may rise briefly if the move is a squeeze.',
    behaviour: [
      'Call writers buying back to cut losses as spot rises into their strikes (short covering).',
      'Earlier call buyers selling to book profit (long unwinding).',
      'Several adjacent strikes shedding OI together is a stronger sign of a broad move than a single strike.',
    ],
    alternatives: [
      'OI may have moved to a higher strike (a roll) rather than disappearing; check the strikes above.',
      'Positions may be closed ahead of expiry for margin or risk reasons unrelated to the view.',
      'OI cannot show whether buyers or sellers did the closing; price and premium behaviour give hints only.',
    ],
    confirm: ['Premiums at those strikes rise while OI falls (consistent with covering under pressure).', 'Call OI at higher strikes does not jump (no sign of a simple roll).', 'Futures price and volume also push higher.'],
    invalidate: ['Call OI at the next strikes up rises sharply, pointing to a roll rather than an exit.', 'Spot falls back below the strike and OI rebuilds.'],
    caution: 'Falling OI means contracts closed; it does not say who was winning or who was forced out.',
  },
  {
    id: 's2',
    title: 'Nifty rises + PE OI increases',
    short: 'Rally while put OI builds',
    price: 'up', ce: 'flat', pe: 'up',
    priceMove: 'Spot moves higher and holds above recently active put strikes.',
    oiChange: 'Put OI rises at strikes at or below spot.',
    volume: 'Usually rises with the new activity; compare it with the day’s average for that strike.',
    premium: 'Put premiums typically fall as spot rises, unless fresh buying or an IV rise offsets it.',
    iv: 'Often steady or lower in a calm rally; a rising IV alongside put OI can hint at hedging demand.',
    behaviour: [
      'Fresh put writing: sellers collecting premium who see the level as holding. If put premiums are falling while OI rises, this reading gains weight.',
      'Hedging: longs buying puts to protect gains. Here put premiums or IV may rise instead.',
      'A put-supported move is sometimes read as a potential support level, never as a guarantee.',
    ],
    alternatives: [
      'Put buyers and put writers both raise OI; the same print can be either one.',
      'Spread legs (for example a bull put spread or a hedge on futures) can add put OI for reasons unrelated to direction.',
    ],
    confirm: ['Put premiums fall or stay soft while OI rises (writing-like behaviour).', 'Spot keeps holding above the put strike on closing basis.', 'Futures OI and price support the advance.'],
    invalidate: ['Put premiums and IV rise together with OI (looks more like buying or hedging).', 'Spot closes below the put strike and the OI begins to unwind.'],
    caution: 'Rising put OI is not automatically bullish; it depends on who initiated.',
  },
  {
    id: 's3',
    title: 'Nifty rises + CE OI increases',
    short: 'Rally while call OI builds',
    price: 'up', ce: 'up', pe: 'flat',
    priceMove: 'Spot rises and approaches or crosses strikes where call OI is growing.',
    oiChange: 'Call OI rises at strikes near or above spot.',
    volume: 'Typically elevated at the rising strikes, especially near spot.',
    premium: 'Call premiums rise if buyers are driving it, but may stay subdued if writers are absorbing demand.',
    iv: 'May rise if buyers are chasing; may stay flat or fall if writers are dominant.',
    behaviour: [
      'Call buyers adding to a directional view as spot advances (long build-up in calls).',
      'Call writers selling into strength at a level they view as a ceiling (fresh call writing).',
      'Both can occur at once, because every new contract has a buyer and a seller.',
    ],
    alternatives: [
      'Covered-call or collar activity by holders of the underlying can add call OI.',
      'Writers may be hedging an opposite position elsewhere in the chain.',
    ],
    confirm: ['Premium rising with OI and IV points to buyer-led activity.', 'Premium lagging or falling while OI climbs points to writer-led activity.', 'Whether spot accepts above the strike (stays, with volume) or rejects it.'],
    invalidate: ['The inference flips if price and premium behaviour change character at the next snapshot.', 'A sharp OI drop at the same strike as spot trades through it (a writer exit).'],
    caution: 'A heavy call strike is a potential resistance zone, not a wall that must hold.',
  },
  {
    id: 's4',
    title: 'Nifty falls + PE OI decreases',
    short: 'Decline while put OI shrinks',
    price: 'down', ce: 'flat', pe: 'down',
    priceMove: 'Spot drifts or drops toward or through put strikes that carried OI.',
    oiChange: 'Put OI falls at those strikes as contracts close.',
    volume: 'Often rises as positions are closed; the volume itself does not reveal the direction of the closing.',
    premium: 'Put premiums commonly rise on the fall; they may rise less than expected if IV is dropping.',
    iv: 'Can rise if the fall is sharp or fearful; may stay flat in a slow drift.',
    behaviour: [
      'Put writers covering as spot approaches their strikes (a support level weakening).',
      'Earlier put buyers booking profits after a decline (long unwinding).',
      'Put writers may also roll down or out rather than close for good.',
    ],
    alternatives: [
      'OI may reappear at lower strikes if the writers rolled.',
      'Expiry-related closure can reduce OI without implying a view.',
    ],
    confirm: ['Put OI at lower strikes does not grow in step (no sign of a roll).', 'Put premiums rise while OI falls (covering under pressure).', 'Futures prices and volume confirm the decline.'],
    invalidate: ['Put OI at lower strikes rises strongly, which points to a roll and a defended lower level.', 'Spot recovers back above the strike on volume.'],
    caution: 'A falling put wall suggests support may be weakening; it does not predict how far price falls.',
  },
  {
    id: 's5',
    title: 'Nifty falls + CE OI increases',
    short: 'Decline while call OI builds',
    price: 'down', ce: 'up', pe: 'flat',
    priceMove: 'Spot slips below earlier levels.',
    oiChange: 'Call OI grows at strikes at or above spot.',
    volume: 'Usually higher at the busy call strikes.',
    premium: 'Call premiums normally fall with spot; if they stay firm while OI rises, buyers may be active.',
    iv: 'Often steady or higher; rising IV can accompany a fear-driven fall.',
    behaviour: [
      'Fresh call writing: sellers adding positions because they expect the market to stay below those levels (a possible resistance).',
      'Call buying as a hedge or a speculative bounce bet is a real alternative.',
      'Short sellers hedging or spread legs can also add call OI.',
    ],
    alternatives: [
      'Writers and buyers both increase OI; the data cannot tell them apart without premium and IV context.',
      'OI at far strikes may simply be lottery-ticket buying.',
    ],
    confirm: ['Call premiums fall while OI rises (writing-like).', 'Spot stays below the call strike for several snapshots.', 'Resistance is respected on closing basis with supportive futures activity.'],
    invalidate: ['Spot rises through the strike and the call OI collapses (a writer exit).', 'Premiums and IV both jump alongside OI (more buyer-like).'],
    caution: 'This is a pattern to test, not a signal to act on by itself.',
  },
  {
    id: 's6',
    title: 'Nifty falls + PE OI increases',
    short: 'Decline while put OI builds',
    price: 'down', ce: 'flat', pe: 'up',
    priceMove: 'Spot falls, often toward round-number put strikes.',
    oiChange: 'Put OI rises at strikes near or above spot.',
    volume: 'Typically elevated, with the busiest strikes close to spot.',
    premium: 'Put premiums rise on a fall; if they are rising faster than delta alone explains, IV is likely up.',
    iv: 'Commonly rises, since downside protection tends to carry a premium.',
    behaviour: [
      'Put buyers adding hedges or directional bets as the fall develops (long build-up in puts).',
      'Put writers selling into the weakness to harvest elevated premium, seeing a lower strike as support.',
      'Both can occur together; the sign of IV and premium helps to lean one way.',
    ],
    alternatives: [
      'Funds may buy puts to hedge a large long book; this is not a bearish view on its own.',
      'A put spread or calendar can create put OI with no outright bearish exposure.',
    ],
    confirm: ['Premium and IV rising together suggests buyers are driving the OI.', 'Premium soft and IV easing suggests writers are dominant.', 'Spot confirms with a decisive close beyond the level.'],
    invalidate: ['The market reverses and put OI starts to unwind quickly.', 'Futures show covering rather than fresh shorts.'],
    caution: 'Rising put OI during a fall can be either fear or conviction in support, so read premium and IV with it.',
  },
  {
    id: 's7',
    title: 'Both CE and PE OI increase',
    short: 'Fresh positions on both sides',
    price: 'flat', ce: 'up', pe: 'up',
    priceMove: 'Often a range-bound or slowly moving market, but price direction on its own is not required.',
    oiChange: 'Total OI is rising on both sides, with OI concentrating near a few strikes.',
    volume: 'Generally healthy, reflecting fresh participation.',
    premium: 'Premiums may hold up if IV is rising, or erode if writers dominate and time passes.',
    iv: 'Can rise if buyers lead (event positioning) or fall if writers lead.',
    behaviour: [
      'Writers selling strangles or condors, defining a range they expect to hold.',
      'Buyers placing straddles or strangles ahead of an expected event.',
      'Mixed participation: different groups taking opposite views in the same session.',
    ],
    alternatives: [
      'The identical OI picture can come from buyers of straddles or writers of strangles; the strategies are opposites.',
      'A broad rise in participation near expiry may mostly reflect rollover activity.',
    ],
    confirm: ['IV direction: rising IV with rising OI points toward event buying.', 'Falling IV with calm price suggests writing.', 'A tight price range with OI clustering across both sides.'],
    invalidate: ['A sudden breakout that forces one side to close.', 'An IV spike that reverses the premium picture.'],
    caution: 'Both sides rising tells you activity is up, not which side is right.',
  },
  {
    id: 's8',
    title: 'Both CE and PE OI decrease',
    short: 'Positions closing on both sides',
    price: 'flat', ce: 'down', pe: 'down',
    priceMove: 'Can occur in any price condition: after a big move, into expiry or after an event.',
    oiChange: 'Total OI falls on both sides as contracts are closed or expire.',
    volume: 'Often subdued, unless positions are being closed aggressively.',
    premium: 'Premiums may fall as time value and event premium bleed away.',
    iv: 'Frequently falls once an event has passed (IV crush) or as expiry nears.',
    behaviour: [
      'Traders closing straddles, strangles or spreads after the event or target is reached.',
      'Participants avoiding expiry-day risk or rolling to the next series.',
      'Reduced conviction: fewer participants willing to hold overnight risk.',
    ],
    alternatives: [
      'OI may simply have shifted to the next expiry.',
      'Expiry itself automatically removes open contracts from the chain.',
    ],
    confirm: ['Next-expiry OI is building, which indicates a roll.', 'IV is falling along with OI, a typical post-event pattern.', 'Price is range-bound after the event.'],
    invalidate: ['New OI appears at fresh strikes within the same expiry.', 'Volume surges as spot breaks out, hinting at forced closing.'],
    caution: 'Falling total OI is a reduction of exposure, not a directional signal.',
  },
  {
    id: 's9',
    title: 'CE OI decreases while PE OI increases',
    short: 'Calls shrink, puts build',
    price: 'up', ce: 'down', pe: 'up',
    priceMove: 'Spot more often drifts up or holds steady, though it is not guaranteed.',
    oiChange: 'Call OI falls while put OI rises at nearby strikes. The resistance shifts away while support builds.',
    volume: 'Typically active on both sides; check that the put-side activity is at or below spot.',
    premium: 'Call premiums firm or ease and put premiums soften if writers are leading the put side.',
    iv: 'May ease if put writing is dominant; may rise if puts are being bought as hedges.',
    behaviour: [
      'Call writers exiting while put writers add: a picture many analysts read as a more constructive tone.',
      'Participants rolling a bearish book into a bullish or neutral one.',
      'A shift of positions upward in the chain as spot has moved up.',
    ],
    alternatives: [
      'Put OI may rise because buyers are hedging against a fall, which is a cautious, not a bullish, signal.',
      'Call OI may have moved to a higher strike instead of leaving.',
    ],
    confirm: ['Put premiums softening while put OI rises.', 'Spot holding or rising with futures and volume support.', 'Put OI forming at or just below spot.'],
    invalidate: ['IV and put premiums both rise (hedging).', 'Call OI rebuilds at the same strikes.'],
    caution: 'A constructive-looking OI shift still depends on who initiated the trades and what price does next.',
  },
  {
    id: 's10',
    title: 'PE OI decreases while CE OI increases',
    short: 'Puts shrink, calls build',
    price: 'down', ce: 'up', pe: 'down',
    priceMove: 'Spot more often weakens or stalls, though not necessarily.',
    oiChange: 'Put OI falls while call OI rises. Support weakens while resistance builds.',
    volume: 'Typically active on both sides; compare it with prior sessions.',
    premium: 'Put premiums may firm and call premiums soften if call writers are leading.',
    iv: 'May rise if the move is fearful; may stay flat if the shift is a quiet repositioning.',
    behaviour: [
      'Put writers exiting while call writers add: a picture many analysts read as a more cautious tone.',
      'Participants moving positions downward in the chain as spot has fallen.',
      'Hedgers lifting put protection after a move and selling calls for income.',
    ],
    alternatives: [
      'Call OI may be driven by buyers speculating on a rebound.',
      'Put OI may have moved to a lower strike rather than exiting.',
    ],
    confirm: ['Call premiums soft while call OI rises.', 'Spot staying below the call strike across snapshots.', 'Futures show short build-up or long unwinding.'],
    invalidate: ['A sharp rise in spot that triggers call covering.', 'Put OI rebuilding at slightly lower strikes.'],
    caution: 'This is a pattern to cross-check, never a standalone trade signal.',
  },
]

export const READING_CHECKLIST = [
  'Who is entering?',
  'Who is exiting?',
  'Which side is under pressure?',
  'Where is the highest OI?',
  'Where is OI increasing?',
  'Where is OI decreasing?',
  'What is the spot price doing?',
  'What is the futures price doing?',
  'What is VIX doing?',
  'What is IV doing?',
  'Is the breakout genuine?',
  'What would invalidate the analysis?',
] as const

/** Module 7.6 — Important OI limitations. */
export const OI_LIMITATIONS = [
  'OI alone cannot identify whether the buyer or the seller is initiating a trade.',
  'Every open contract has both a buyer and a seller.',
  'Rising OI does not automatically mean writing.',
  'Falling OI does not automatically mean sellers are exiting.',
  'OI updates may be delayed.',
  'OI must be combined with price, volume, IV and trade direction.',
  'Total OI and the change in OI must be interpreted together.',
] as const
