import type { ModuleLesson } from '../topicLessonTypes'

/* Module 22.2 - Risk-Reward. Illustrative numbers: NIFTY about 24,000, lot 65 (check current NSE contract specification), IV 14%, r 6.5%, q 1.3%. */
const m: ModuleLesson = {
  "moduleId": "22.2",
  "intro": "Risk-reward is about comparing what a trade can lose with what it can gain, and how likely each outcome is. A trade with a large payoff and a tiny chance of success, or a high chance of success and a ruinous loss, can both be poor. This module links payoff size, probability, expectancy, drawdown and recovery into one way of judging a trade before you place it.",
  "introHi": "Risk-reward ka matlab hai trade mein kitna loss ho sakta hai aur kitna gain, aur dono ke hone ki sambhavna kitni hai. Bada payoff par bahut kam chance, ya bahut chance par barbaad kar dene wala loss, dono hi kharab trade ho sakte hain. Yeh module payoff, probability, expectancy, drawdown aur recovery ko jodkar trade ko lagane se pehle parakhna sikhata hai.",
  "steps": {
    "concept": "Risk-reward judges a trade on two things together: how much you can win compared with how much you can lose, and how often each is likely to happen. A good-looking ratio with a low probability, or a high win rate with a very large loss, can both have a negative average result. Expectancy puts both together in one number.",
    "conceptHi": "Risk-reward trade ko do cheezon par saath mein parakhta hai: jitna jeet sakte ho uske muqable kitna haar sakte ho, aur dono kitni baar hone ki ummeed hai. Achha dikhta ratio par kam probability, ya zyada win rate par bahut bada loss, dono ka average result negative ho sakta hai. Expectancy dono ko ek number mein jodta hai.",
    "mechanism": "For any option position, the expiry payoff gives the maximum loss, maximum profit and breakevens. A model such as Black-Scholes gives an approximate probability of finishing beyond the breakeven. Multiply each outcome by its probability to get an expected value, then compare it with the premium or margin tied up. Over many trades, the actual result depends on your win rate, average win, average loss, and how you survive losing runs.",
    "example": {
      "title": "A bull call spread on NIFTY (illustrative)",
      "text": "Buy the 24,000 CE at 197.7 and sell the 24,200 CE at 111.4 with 7 days left (Black-Scholes, IV 14%, spot 24,000). Net debit = 197.7 − 111.4 = 86.3 points, so the maximum loss is 86.3 × 65 = ₹5,609.5. The maximum profit is (200 − 86.3) × 65 = ₹7,390.5. Breakeven = 24,000 + 86.3 = 24,086.3. Reward to risk is 1.32 to 1, but both ends depend on where spot finishes at expiry."
    },
    "chart": {
      "kind": "payoff",
      "title": "Bull call spread 24,000 / 24,200",
      "caption": "Loss limited to the net debit, profit limited to the strike gap minus the debit.",
      "spot": 24000,
      "legs": [
        {
          "type": "CE",
          "side": 1,
          "strike": 24000,
          "premium": 197.7
        },
        {
          "type": "CE",
          "side": -1,
          "strike": 24200,
          "premium": 111.4
        }
      ]
    },
    "optionChain": "The chain gives the premiums needed for every calculation: bid and ask for each leg, not just the last traded price. Wide spreads cut your real reward-to-risk. The chain's implied volatility also feeds probability estimates. Compare strikes: moving further out of the money raises the potential multiple on premium but lowers the chance of profit.",
    "psychology": "People love large payoffs and ignore probabilities, which is why far out-of-the-money options attract buyers. Sellers love high win rates and ignore the rare large loss. Both forget that the average outcome is what pays the bills. Judging each trade by expectancy removes the thrill of either extreme.",
    "scenarios": {
      "bullish": "Spot rises beyond the breakeven: the spread reaches its maximum profit above 24,200. The ratio looked good and the direction was right, but profit is capped, so a sharp rally does not add more.",
      "bearish": "Spot falls: the spread loses its debit, never more. Defined risk means the bad scenario is known before entry, which is the main benefit of a spread.",
      "sideways": "Spot ends between the strikes: partial profit or loss depending on the breakeven. Time decay hurts the long leg and helps the short leg, so the net effect is smaller than for a single option."
    },
    "practice": [
      {
        "q": "Long CE at 150, target 240, stop 120. Find the reward-to-risk and the win rate needed to break even.",
        "a": "Reward 90, risk 30, so 3 : 1. Breakeven win rate = 1 ÷ (1 + 3) = 25%. Any lower win rate loses over time, before costs."
      },
      {
        "q": "Win rate 40%, average win ₹3,000, average loss ₹1,500. What is the expectancy per trade?",
        "a": "0.40 × 3,000 − 0.60 × 1,500 = 1,200 − 900 = +₹300 per trade, before brokerage and taxes."
      },
      {
        "q": "The bull call spread above has net debit 86.3. What are the maximum loss, maximum profit and breakeven per lot?",
        "a": "Maximum loss = 86.3 × 65 = ₹5,609.5. Maximum profit = (200 − 86.3) × 65 = ₹7,390.5. Breakeven = 24,086.3."
      },
      {
        "q": "A short 23,700 PE earns 66 points. If it wins 85% of the time with average win ₹4,290 and a loss of ₹12,000 otherwise, is the expectancy positive?",
        "a": "Expectancy = 0.85 × 4,290 − 0.15 × 12,000 = 3,647 − 1,800 = 1,847. It is negative despite the high win rate, so the rare loss matters more than the win rate."
      }
    ],
    "assignment": "Take any three trades from your history or paper trades. For each one, write the maximum loss, maximum profit, breakeven and an estimated probability of profit. Then compute the expectancy using your actual win rate and average win and loss over your last 20 trades, and say whether the numbers justify the trade style."
  },
  "topics": [
    {
      "t": 1,
      "def": "The risk-reward ratio compares what you stand to gain with what you stand to lose in a trade, written as reward to risk, such as 3 to 1.",
      "hi": "Risk-reward ratio batata hai ki trade mein jitna jeetne ki ummeed hai woh jitna haarne ka risk hai uske muqable kitna hai, jaise 3 ke muqable 1.",
      "how": "Reward is the distance from entry to target; risk is the distance from entry to stop. The ratio alone does not say whether the trade is good, because a high ratio can come with a low chance of reaching the target. The ratio tells you the win rate you need to break even: 1 ÷ (1 + ratio). Use it as a filter, not a verdict.",
      "eg": {
        "title": "A 3 to 1 option trade (illustrative)",
        "text": "Buy a CE at 150, target 240, stop 120. Reward = 90 points, risk = 30 points, ratio 3 : 1. Per lot of 65: potential gain ₹5,850, potential loss ₹1,950. The break-even win rate is 1 ÷ 4 = 25%, meaning you need to win more than one trade in four to come out ahead before costs."
      },
      "tip": "A good ratio on paper is worthless if the target is rarely reached.",
      "visual": {
        "kind": "compare",
        "title": "Reward versus risk",
        "caption": "3 to 1 in this example.",
        "left": {
          "head": "Reward",
          "tone": "bull",
          "points": [
            "Target 240",
            "+90 points",
            "₹5,850 per lot"
          ]
        },
        "right": {
          "head": "Risk",
          "tone": "bear",
          "points": [
            "Stop 120",
            "−30 points",
            "₹1,950 per lot"
          ]
        }
      },
      "calc": {
        "id": "risk-reward",
        "preset": {
          "winRate": 30,
          "avgWin": 5850,
          "avgLoss": 1950
        },
        "why": "Computes the expectancy and break-even win rate of the 3 to 1 trade."
      }
    },
    {
      "t": 2,
      "def": "Expected return is the average result per trade over many trades, found by weighing each outcome by how often it happens.",
      "hi": "Expected return woh average result hai jo bahut saare trades mein per trade milta hai, har outcome ko uske hone ki frequency se tolkar nikala jaata hai.",
      "how": "Expected return = (win rate × average win) − (loss rate × average loss). It uses your own history or a model's probabilities, so it is only as good as those inputs. A small sample or a few outsized wins can mislead. A positive figure means the approach may have an edge before costs; subtract brokerage, STT, exchange charges and slippage to see the net.",
      "eg": {
        "title": "Computing expectancy (illustrative)",
        "text": "Over 50 trades: 20 wins averaging ₹3,000 and 30 losses averaging ₹1,500. Win rate 40%. Expectancy = 0.40 × 3,000 − 0.60 × 1,500 = +₹300 per trade, or ₹15,000 over 50 trades. If costs and slippage are ₹250 per trade, the net is +₹50 per trade, nearly nothing."
      },
      "tip": "Always subtract costs. A thin edge can disappear after charges.",
      "visual": {
        "kind": "bars",
        "title": "Average result of one trade (₹, illustrative)",
        "caption": "Weighted wins minus weighted losses.",
        "unit": "",
        "items": [
          {
            "label": "Wins 0.40 × 3,000",
            "value": 1200,
            "tone": "bull"
          },
          {
            "label": "Losses 0.60 × 1,500",
            "value": 900,
            "tone": "bear"
          },
          {
            "label": "Expectancy",
            "value": 300,
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "risk-reward",
        "preset": {
          "winRate": 40,
          "avgWin": 3000,
          "avgLoss": 1500
        },
        "why": "Gives expectancy and breakeven win rate for these inputs."
      }
    },
    {
      "t": 3,
      "def": "Probability of profit is the estimated chance that a trade finishes with a gain at expiry. It comes from a model or from history, and it is an estimate, not a promise.",
      "hi": "Probability of profit ek estimate hai ki trade expiry par profit mein khatam hone ka kitna chance hai. Yeh model ya history se aata hai, gaarantee nahi hota.",
      "how": "For an option you find the breakeven, then estimate the chance of finishing beyond it using implied volatility and a lognormal model. Short out-of-the-money options have high probabilities but small payoffs; long options have low probabilities and larger potential multiples. Models assume smooth price paths and ignore gaps, skew and early exits. Treat the number as a rough guide.",
      "eg": {
        "title": "Two trades, two probabilities (illustrative)",
        "text": "With spot 24,000, 7 days and IV 14%: a long 24,000 CE bought at 197.7 breaks even at 24,197.7. The model chance of finishing above that is about 35%. A short 23,700 PE sold at 66 breaks even at 23,634, and the model chance of finishing above it is about 80%. The second trade wins more often, but its loss when it fails is much larger."
      },
      "tip": "A high probability of profit is not safety. Look at the size of the loss in the other 20%.",
      "visual": {
        "kind": "bars",
        "title": "Model probability of profit (illustrative)",
        "caption": "Estimates from Black-Scholes with flat IV 14%.",
        "unit": "%",
        "items": [
          {
            "label": "Long 24,000 CE",
            "value": 35,
            "tone": "ice"
          },
          {
            "label": "Short 23,700 PE",
            "value": 80,
            "tone": "gold"
          }
        ]
      }
    },
    {
      "t": 4,
      "def": "Maximum possible loss is the largest amount a position can lose. Knowing it before entry decides whether the trade is acceptable at all.",
      "hi": "Maximum possible loss woh sabse bada nuksaan hai jo ek position kar sakti hai. Entry se pehle isse jaanna tay karta hai ki trade kabool karne layak hai ya nahi.",
      "how": "A bought option can lose at most the premium paid. A spread has a known maximum loss. A sold option, especially a naked call, has no fixed upper limit for a call and a very large one for a put, since price cannot fall below zero but can fall a long way. Futures can lose more than the margin deposited. Compare the maximum loss to your capital, not only to the premium collected.",
      "eg": {
        "title": "Maximum loss for three positions (illustrative)",
        "text": "Long 24,000 CE: premium 197.7 × 65 = ₹12,851. Bull call spread: 86.3 × 65 = ₹5,609.5. Short 23,700 PE: if the index falls to 23,000, loss = (23,700 − 23,000 − 66) × 65 = ₹41,210.0, and it grows further below that."
      },
      "tip": "If you cannot state the maximum loss in rupees, do not place the trade.",
      "visual": {
        "kind": "payoff",
        "title": "Short 23,700 PE",
        "caption": "Limited profit, large loss on a fall.",
        "spot": 24000,
        "legs": [
          {
            "type": "PE",
            "side": -1,
            "strike": 23700,
            "premium": 66
          }
        ]
      }
    },
    {
      "t": 5,
      "def": "Maximum possible profit is the most a position can earn. For buyers it can be large; for sellers it is capped at the premium received.",
      "hi": "Maximum possible profit woh sabse zyada kamai hai jo position kar sakti hai. Buyers ke liye yeh badi ho sakti hai; sellers ke liye yeh sirf mili hui premium tak seemit hai.",
      "how": "A long CE has theoretically unlimited profit, a long PE profit up to the strike less the premium, and a spread profit equal to the strike gap minus the net debit. A short option earns at most its premium. In practice the maximum is reached only at certain expiry prices, and exits before expiry usually capture less. Do not size a trade on the best case.",
      "eg": {
        "title": "Maximum profit per lot (illustrative)",
        "text": "Short 23,700 PE: premium 66 × 65 = ₹4,290, which is the most it can earn. Bull call spread: (200 − 86.3) × 65 = ₹7,390.5 at any expiry above 24,200. A long CE has no cap, but the move required is large."
      },
      "tip": "The maximum is a ceiling, not an expectation.",
      "visual": {
        "kind": "payoff",
        "title": "Bull call spread 24,000 / 24,200",
        "caption": "Profit is flat above 24,200.",
        "spot": 24000,
        "legs": [
          {
            "type": "CE",
            "side": 1,
            "strike": 24000,
            "premium": 197.7
          },
          {
            "type": "CE",
            "side": -1,
            "strike": 24200,
            "premium": 111.4
          }
        ]
      }
    },
    {
      "t": 6,
      "def": "The breakeven is the expiry price at which a position makes neither profit nor loss. It sets the move the market must deliver for you to be paid.",
      "hi": "Breakeven woh expiry price hai jahan position na profit karti hai na loss. Yeh batata hai ki aapko paisa milne ke liye market ko kitna chalna padega.",
      "how": "For a long CE, breakeven = strike + premium; for a long PE, strike − premium. For a short CE it is the same strike + premium, and for a short PE strike − premium. A straddle has two breakevens. Costs such as brokerage and STT move the true breakeven slightly further away. Compare the breakeven distance with the one-day or weekly expected move to judge how realistic it is.",
      "eg": {
        "title": "Breakevens of three positions (illustrative)",
        "text": "Long 24,000 CE at 197.7: 24,197.7. Bull call spread, debit 86.3: 24,086.3. Long 24,000 straddle at 197.7 + 173.8 = 371.5 points: breakevens at 23,628.5 and 24,371.5."
      },
      "tip": "Always compute breakeven before entering. It is the real target.",
      "visual": {
        "kind": "ladder",
        "title": "Long 24,000 CE and its breakeven",
        "caption": "The option must finish beyond strike plus premium to pay off.",
        "optType": "CE",
        "spot": 24000,
        "strikes": [
          23800,
          23900,
          24000,
          24100,
          24200
        ]
      },
      "calc": {
        "id": "breakeven",
        "preset": {
          "optType": "CE",
          "side": "buy",
          "strike": 24000,
          "premium": 197.7
        },
        "why": "Gives the breakeven of the long call."
      }
    },
    {
      "t": 7,
      "def": "Reward versus probability is the trade-off that bigger potential rewards usually come with a lower chance of reaching them. A trade should be judged on both.",
      "hi": "Reward versus probability ka trade-off yeh hai ki bada reward aam taur par milne ka chance kam hota hai. Trade ko dono par parakhna chahiye.",
      "how": "Far out-of-the-money options pay a high multiple of a tiny premium but expire worthless most of the time. Near-the-money sold options win often but lose big occasionally. The market prices this trade-off already, which is why consistent edge is hard. Your own edge must come from better estimates, from lower costs or from disciplined sizing, not from picking a side of the trade-off.",
      "eg": {
        "title": "High win rate, negative expectancy (illustrative)",
        "text": "A short 23,700 PE earns ₹4,290 (66 × 65) with about 85% win rate in this style, but when it loses the average loss is ₹12,000. Expectancy = 0.85 × 4,290 − 0.15 × 12,000 = 1,847. The breakeven win rate for these payoffs is 12,000 ÷ (12,000 + 4,290) = 73.7%."
      },
      "tip": "Win rate alone tells you nothing about profit.",
      "visual": {
        "kind": "matrix",
        "title": "Win rate against payoff size",
        "caption": "Edge needs the combination, not one side.",
        "xLabels": [
          "Small payoff",
          "Large payoff"
        ],
        "yLabels": [
          "High win rate",
          "Low win rate"
        ],
        "cells": [
          {
            "head": "Fragile",
            "note": "One big loss wipes gains",
            "tone": "gold"
          },
          {
            "head": "Strong if real",
            "note": "Rare in practice",
            "tone": "ice"
          },
          {
            "head": "Poor",
            "note": "Loses slowly",
            "tone": "neutral"
          },
          {
            "head": "Lottery-like",
            "note": "Needs patience and small size",
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "risk-reward",
        "preset": {
          "winRate": 85,
          "avgWin": 4290,
          "avgLoss": 12000
        },
        "why": "Shows that an 85% win rate can still have negative expectancy."
      }
    },
    {
      "t": 8,
      "def": "Risk of ruin is the chance of losing so much capital that you can no longer trade. It depends on your win rate, payoff size and, above all, how much you risk per trade.",
      "hi": "Risk of ruin woh sambhavna hai ki aap itna capital kho do ki trading chalana mushkil ho jaye. Yeh win rate, payoff size aur sabse zyada har trade mein kitna risk lete ho us par nirbhar karta hai.",
      "how": "Even a trader with a positive edge can suffer long losing streaks. With a 45% win rate, the chance of six losses in a row is 0.55^6, about 2.8%, and over many trades such streaks do occur. If each loss is 10% of capital, six losses leave 53% of the account; if each is 1%, they leave 94%. Lower risk per trade is the main way to keep ruin probability low.",
      "eg": {
        "title": "Six losses in a row (illustrative)",
        "text": "Win rate 45%, so loss rate 55%. Chance of six straight losses = 0.55^6 = 2.8%. At 10% risk per trade, capital falls to 53.1% of its start, or ₹2,65,721 from ₹5,00,000. At 1% risk it falls to 94.1%, or ₹4,70,740."
      },
      "tip": "Survive first. Edge only pays if you are still in the game.",
      "visual": {
        "kind": "bars",
        "title": "Capital left after 6 straight losses (₹ lakh)",
        "caption": "Same streak, different risk per trade.",
        "unit": " lakh",
        "items": [
          {
            "label": "1% risk",
            "value": 4.7,
            "tone": "ice"
          },
          {
            "label": "10% risk",
            "value": 2.7,
            "tone": "bear"
          }
        ]
      },
      "calc": {
        "id": "kelly",
        "preset": {
          "winRate": 45,
          "payoffRatio": 2
        },
        "why": "Shows the maximum growth-optimal fraction, usually far above a safe size."
      }
    },
    {
      "t": 9,
      "def": "Drawdown is the fall in account value from a peak to the lowest point after it. It measures the pain of a losing stretch, not only the final result.",
      "hi": "Drawdown account value ke peak se uske baad ke sabse neeche point tak ki girawat hai. Yeh sirf final result nahi, kharab daur ki takleef ko napta hai.",
      "how": "Maximum drawdown is the largest such fall over a period. It is reported in rupees and in percent of the peak. Two traders with the same profit can have very different drawdowns, and the one with the lower drawdown is easier to continue with. Because recovery needs a larger percentage than the loss, controlling drawdown matters more than chasing returns.",
      "eg": {
        "title": "Measuring a drawdown (illustrative)",
        "text": "The account peaks at ₹6,00,000, falls to ₹5,10,000, then recovers. Drawdown = 90,000, which is 90,000 ÷ 6,00,000 = 15%. To return from ₹5,10,000 to ₹6,00,000 needs 90,000 ÷ 5,10,000 = 17.6%."
      },
      "tip": "Judge a strategy by its worst drawdown, not only its average month.",
      "visual": {
        "kind": "curve",
        "title": "Equity curve and drawdown",
        "caption": "Drawdown is the gap between the previous peak and the dip.",
        "curve": "drawdown"
      },
      "calc": {
        "id": "drawdown-recovery",
        "preset": {
          "drawdownPct": 15
        },
        "why": "Shows the gain required after a 15% drawdown."
      }
    },
    {
      "t": 10,
      "def": "Recovery factor is net profit divided by maximum drawdown. It tells you how much profit a system made for each rupee of its worst fall.",
      "hi": "Recovery factor net profit ko maximum drawdown se bhaag dene par milta hai. Yeh batata hai ki system ne apne sabse bure girawat ke har rupaye ke muqable kitna profit banaya.",
      "how": "A recovery factor of 1 means total profit just equals the worst fall; higher is better. It is a quick check of how efficiently a strategy earns relative to the pain. It depends heavily on the period tested and on the sample of trades, and a single strong month can inflate it. Compare it with other strategies tested over the same period and market conditions.",
      "eg": {
        "title": "Computing recovery factor (illustrative)",
        "text": "Net profit over a year ₹90,000, maximum drawdown ₹45,000. Recovery factor = 90,000 ÷ 45,000 = 2.0. Another approach earns ₹1,20,000 with a drawdown of ₹1,00,000, a factor of 1.2. The first earned less but with far less pain per rupee."
      },
      "tip": "More profit is not better if it came with a much deeper hole.",
      "visual": {
        "kind": "bars",
        "title": "Recovery factor (illustrative)",
        "caption": "Profit per rupee of maximum drawdown.",
        "unit": "",
        "items": [
          {
            "label": "Approach A",
            "value": 2,
            "tone": "ice"
          },
          {
            "label": "Approach B",
            "value": 1.2,
            "tone": "neutral"
          }
        ]
      }
    }
  ]
}
export default m
