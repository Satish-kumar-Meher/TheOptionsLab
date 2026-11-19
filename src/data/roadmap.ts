/** Closing sections of the PDF (roadmap, exercises, misconceptions, study method), transcribed verbatim in meaning. */

export const ecosystemQuestions = [
  'Who participates in the options market?',
  'Why do buyers and sellers enter positions?',
  'How do option writers manage their positions?',
  'How do option premiums change?',
  'How do big participants hedge their exposure?',
  'How can we interpret OI, volume, VIX and option-chain data?',
  'How does market psychology influence intraday movements?',
  'How do we identify genuine breakouts versus false breakouts?',
  'How can we develop, backtest and validate a profitable trading strategy?',
]

export const courseStructure = [
  { metric: '25', spec: 'Learning levels', focus: 'Structured step-by-step mastery across 24 parts' },
  { metric: '150+', spec: 'Detailed topics', focus: 'Comprehensive module-by-module market coverage' },
  { metric: 'Basic → Expert', spec: 'Learning progression', focus: 'From financial market basics to quantitative backtesting' },
  { metric: 'Practical', spec: 'Chart and option-chain exercises', focus: 'Real-world NIFTY, BANKNIFTY & SENSEX application' },
]

export const roadmapStages = [
  { stage: 'Beginner', levels: '1–5', objective: 'Understand financial markets and options' },
  { stage: 'Intermediate', levels: '6–9', objective: 'Master Greeks, OI, option chain and VIX' },
  { stage: 'Advanced', levels: '10–12', objective: 'Price action, order flow and futures' },
  { stage: 'Professional analysis', levels: '13–18', objective: 'Writer psychology, institutional activity and market structure' },
  { stage: 'Specialist', levels: '19–21', objective: 'Expiry, strategies and intraday execution' },
  { stage: 'Risk and discipline', levels: '22–23', objective: 'Capital protection and psychology' },
  { stage: 'Quantitative trading', levels: '24–25', objective: 'Backtesting, algo trading and performance' },
]

export const exercises = [
  { n: 1, title: 'Understand four option positions', text: 'Calculate profit and loss for CE buyer, CE seller, PE buyer and PE seller using real Nifty examples.', tool: { to: '/strategies/long-call', label: 'Open payoff explorer' } },
  { n: 2, title: 'Read an option chain', text: 'Take one Nifty option-chain snapshot and identify ATM, ITM, OTM, highest CE OI and highest PE OI.', tool: { to: '/labs/option-chain', label: 'Open Option Chain Lab' } },
  { n: 3, title: 'Track OI changes', text: 'Save option-chain snapshots every minute and compare OI changes across strikes.', tool: { to: '/labs/option-chain', label: 'Step the simulated snapshot' } },
  { n: 4, title: 'Track VIX and premiums', text: 'Observe how India VIX, individual option IV and CE/PE premiums change together.', tool: { to: '/labs/greeks', label: 'Open Greeks Lab' } },
  { n: 5, title: 'Identify writers', text: 'Use price, OI, volume and premium movement to develop hypotheses about writing and unwinding.', tool: { to: '/labs/open-interest', label: 'Open OI Lab' } },
  { n: 6, title: 'Identify breakouts', text: 'Observe whether a 24,000 resistance level is accepted or rejected, and check what happens to CE and PE positions.', tool: { to: '/labs/market-structure', label: 'Open Market Structure Lab' } },
  { n: 7, title: 'Paper trading', text: 'Record hypothetical entries, exits, stop-losses and profit booking without risking actual capital.', tool: { to: '/risk#journal', label: 'Open trade journal' } },
  { n: 8, title: 'Backtesting', text: 'Test your trading rules against historical data, including brokerage, slippage and realistic execution.', tool: { to: '/quant', label: 'Open Backtesting Studio' } },
]

export const misconceptions = [
  { n: 1, title: 'OI does not reveal who is bullish or bearish', text: 'Every open contract has both a buyer and a seller. You need additional evidence to infer whether positions are being initiated, closed, hedged or transferred.' },
  { n: 2, title: 'High Call OI does not guarantee resistance', text: 'It is a potential positioning level, not a guaranteed barrier.' },
  { n: 3, title: 'High Put OI does not guarantee support', text: 'Put writers can exit or hedge when the market moves against them.' },
  { n: 4, title: 'Rising OI does not always mean fresh writing', text: 'It can represent fresh buying and selling together.' },
  { n: 5, title: 'India VIX does not predict direction', text: 'It measures expected volatility, not whether Nifty will rise or fall.' },
  { n: 6, title: 'Writers do not always win', text: 'Option sellers receive premium but face potentially substantial directional, gamma and volatility risks.' },
  { n: 7, title: 'Max Pain is not a guaranteed expiry target', text: 'Treat it as an analytical reference, not a prediction.' },
  { n: 8, title: 'OI data is not a substitute for order-flow data', text: 'Public option-chain snapshots cannot always tell you who initiated a transaction or what a particular institution is doing.' },
]

export const studyMethod = [
  { k: 'Concept', v: 'Detailed explanation in simple Hinglish.' },
  { k: 'Mechanism', v: 'How it actually works in the market.' },
  { k: 'Example', v: 'Realistic Nifty 50 numerical examples.' },
  { k: 'Chart', v: 'Visual explanation wherever useful.' },
  { k: 'Option chain', v: 'Practical CE/PE data interpretation.' },
  { k: 'Psychology', v: 'What buyers, sellers and institutions might be thinking.' },
  { k: 'Scenarios', v: 'Bullish, bearish and sideways situations.' },
  { k: 'Practice', v: 'Questions and numerical exercises.' },
  { k: 'Assignment', v: 'A practical task before moving to the next module.' },
]

export const finalAdvice = 'Do not start with live option buying or selling. Complete the foundational levels, paper trade, and validate your setups on historical data before risking capital.'

export const ultimateQuestions = [
  'Where is the market?',
  'Who is building positions?',
  'Who may be exiting?',
  'Where is liquidity concentrated?',
  'Is volatility expanding or contracting?',
  'What evidence supports a breakout or reversal?',
  'What would prove my analysis wrong?',
]
