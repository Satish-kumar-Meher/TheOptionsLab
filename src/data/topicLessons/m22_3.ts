import type { ModuleLesson } from '../topicLessonTypes'

/* Module 22.3 - Stop-Loss Management. Illustrative numbers: NIFTY about 24,000, lot 65 (check current NSE contract specification), IV 14%, r 6.5%. */
const m: ModuleLesson = {
  "moduleId": "22.3",
  "intro": "A stop-loss is a pre-decided exit that limits how much a trade can lose. In options, stops are harder than in shares because premiums are noisy, spreads are wide and prices can jump past your level. This module covers the main types of stop, how to place them sensibly, and why every stop can fail.",
  "introHi": "Stop-loss ek pehle se tay kiya hua exit hai jo trade ka loss seemit karta hai. Options mein stop shares se mushkil hai kyunki premium noisy hota hai, spread chauda hota hai aur price aapke level ko kood kar paar kar sakta hai. Yeh module stops ke mukhya prakar, unhe samajhdari se kaise lagayein, aur har stop kyun fail ho sakta hai, yeh batata hai.",
  "steps": {
    "concept": "A stop-loss is a rule that says where you will leave a trade if it goes wrong. It turns a vague hope into a fixed loss. It can be based on a price, a percentage, a time, the underlying's level or volatility. No stop guarantees the exit price, because the market can move past it.",
    "conceptHi": "Stop-loss ek rule hai jo batata hai ki trade galat jaye toh aap kahan se nikloge. Yeh ummeed ko ek tay loss mein badal deta hai. Yeh price, percentage, time, underlying ke level ya volatility par based ho sakta hai. Koi bhi stop exit price ki gaarantee nahi deta, kyunki market stop se aage nikal sakta hai.",
    "mechanism": "A stop is usually an order held by the broker or exchange that becomes a market or limit order when a trigger price is touched. A stop-market order aims to exit at the next available price; a stop-limit order exits only at or better than the limit and may not fill at all. Some traders place stops on the underlying and exit manually when it is touched. Fast markets, wide spreads and gaps cause slippage, which means the exit is worse than the trigger.",
    "example": {
      "title": "Same trade, different stops (illustrative)",
      "text": "Buy the 24,000 CE at 197.7 with spot 24,000 and 7 days left. A premium stop at 150 risks 47.7 × 65 = ₹3,100. An underlying stop at 23,950 equals a 50-point fall, which at that time would put the option near 172.6, a loss of 25.1 × 65 = ₹1,632. A time stop exits at the end of the day if neither level is reached. Each stop fits a different idea of why the trade was wrong."
    },
    "chart": {
      "kind": "timeline",
      "title": "How a stop works in a trade",
      "caption": "The stop is placed with the entry, not after the loss has started.",
      "events": [
        {
          "when": "Entry",
          "what": "Buy at 150",
          "tone": "ice"
        },
        {
          "when": "Stop set",
          "what": "Trigger at 120",
          "tone": "gold"
        },
        {
          "when": "Price falls",
          "what": "Trigger touched, order sent",
          "tone": "bear"
        },
        {
          "when": "Fill",
          "what": "Exit at or near 120, maybe worse",
          "tone": "neutral"
        }
      ]
    },
    "optionChain": "The chain shows the bid and ask for each strike. A wide spread means a stop will probably fill poorly, because the exit sells at the bid and the bid can be far below the last price. Prefer liquid strikes close to the money for trades that rely on stops. Check the quoted depth: if only a few lots are bid, a larger stop order may walk down the book.",
    "psychology": "The hardest part is respecting the stop. Traders move stops lower to give the trade more room, which breaks the risk plan. Others set stops so tight that normal noise triggers them repeatedly. A stop that comes from a reason about the trade, and not from a wish to feel safe, tends to be followed more calmly.",
    "scenarios": {
      "bullish": "The trade works and a trailing or partial exit locks gains. A stop that is too tight may still take you out on a normal pullback before the move continues.",
      "bearish": "The stop triggers and you take the planned loss. In a gap-down the fill may be much below the stop, so size trades assuming the worst case could be larger than the plan.",
      "sideways": "The option loses value from time decay without hitting a price stop. A time stop closes it before decay eats the premium."
    },
    "practice": [
      {
        "q": "Entry 150, stop at 20% below. What is the stop premium and loss per lot (lot 65)?",
        "a": "Stop = 150 × 0.80 = 120. Loss = 30 × 65 = ₹1,950 per lot, before costs."
      },
      {
        "q": "You want a fixed loss of ₹2,000 per lot on a CE bought at 150. Where does the stop go?",
        "a": "2,000 ÷ 65 = 30.8 points. Stop = 150 − 30.8 = 119.2, so about 119."
      },
      {
        "q": "A trade has entry 150, initial stop 120 and a trailing rule of 30 points below the highest premium. The premium peaks at 230 and then falls. Where does the trailing stop sit, and what is locked in?",
        "a": "Stop = 230 − 30 = 200. Locked gain = (200 − 150) × 65 = ₹3,250 per lot, before costs, if the stop fills at 200."
      },
      {
        "q": "Your stop is 120 but the premium gaps from 125 to 90 with no trades in between. Compare planned and actual loss per lot.",
        "a": "Planned = 30 × 65 = ₹1,950. Actual = 60 × 65 = ₹3,900, twice the plan. A stop is not a guarantee of the exit price."
      }
    ],
    "assignment": "Choose three past option trades. For each, write which kind of stop (price, percentage, underlying, time) would have fit the reason you entered. Compute the loss it would have capped and the loss it might have caused by exiting too early. Decide which style suits your usual trades and write one sentence on why."
  },
  "topics": [
    {
      "t": 1,
      "def": "A fixed stop-loss is an exit at a set rupee loss per lot or per trade, decided in advance.",
      "hi": "Fixed stop-loss ek tay kiya hua rupaye ka loss hai per lot ya per trade, jo pehle se decide hota hai.",
      "how": "You choose the maximum rupee loss, convert it into points by dividing by the lot size, and place the stop that many points below entry. It is simple and ties directly to a risk budget. It ignores how the option actually behaves, so a stop that is very tight can be hit by ordinary noise while one that is too wide breaks the budget. Choose the amount from your risk per trade.",
      "eg": {
        "title": "A ₹2,000 fixed stop (illustrative)",
        "text": "CE bought at 150, lot 65. ₹2,000 ÷ 65 = 30.8 points, so the stop is 150 − 30.8 = 119.2. If it fills there, the loss is 30.8 × 65 = ₹2,000. With a ₹5,00,000 account that is 0.4% of capital."
      },
      "tip": "Pick the rupee loss from your risk plan first, then see if the chart supports the level.",
      "visual": {
        "kind": "bars",
        "title": "Fixed stop of ₹2,000 (illustrative)",
        "caption": "Entry 150, stop about 119.",
        "unit": "",
        "items": [
          {
            "label": "Entry",
            "value": 150,
            "tone": "ice"
          },
          {
            "label": "Stop",
            "value": 119.2,
            "tone": "bear"
          }
        ]
      },
      "calc": {
        "id": "position-size",
        "preset": {
          "capital": 500000,
          "riskPct": 0.4,
          "entry": 150,
          "stop": 119.2,
          "lotSize": 65
        },
        "why": "Finds lots that keep the fixed stop inside the risk budget."
      }
    },
    {
      "t": 2,
      "def": "A percentage-based stop exits when the premium falls by a set percentage from your entry, such as 20% or 30%.",
      "hi": "Percentage-based stop tab exit karta hai jab premium entry se tay percent gir jaye, jaise 20% ya 30%.",
      "how": "The stop scales with the premium, so a bigger premium gets a bigger stop in rupees. This fits beginners because it is easy to compute. The weakness is that option premiums swing widely: a 20% fall in a cheap, near-expiry option can be a normal fluctuation of a few rupees. Always compare the stop with the typical swing of that option and with its bid-ask spread.",
      "eg": {
        "title": "A 20% premium stop (illustrative)",
        "text": "Entry 150, stop at 20% = 120, loss ₹1,950 per lot. If the entry were 15 for a far OTM option, the stop would be 12, only 3 points, and the spread alone (say 1 point) plus noise could trigger it."
      },
      "tip": "A percentage stop on a very cheap option is mostly noise. Check the spread first.",
      "visual": {
        "kind": "compare",
        "title": "20% stop on two premiums",
        "caption": "Same percentage, very different practical meaning.",
        "left": {
          "head": "Entry 150",
          "tone": "ice",
          "points": [
            "Stop 120",
            "30 points of room",
            "Loss ₹1,950 per lot"
          ]
        },
        "right": {
          "head": "Entry 15",
          "tone": "gold",
          "points": [
            "Stop 12",
            "3 points of room",
            "Loss ₹195 per lot, but noise-prone"
          ]
        }
      }
    },
    {
      "t": 3,
      "def": "A premium-based stop uses a specific premium level, such as exit if the option trades at 120, regardless of what the index does.",
      "hi": "Premium-based stop mein ek khaas premium level hota hai, jaise option 120 par aaye toh exit, chahe index kuch bhi kar raha ho.",
      "how": "It directly caps the rupee loss on the option, which is what hits your account. It reacts to everything that moves the premium: spot, time decay and IV. That can be good, because a falling IV is a real cost, but it can trigger exits when only implied volatility drops. Spreads on option quotes can be wide, so an order based on the last traded price may fill at a worse bid.",
      "eg": {
        "title": "Premium stop and its slippage (illustrative)",
        "text": "CE bought at 150 with a stop at 120. The bid at the time is 118 while the last traded price is 120. A sell fills at 118, a loss of 32 × 65 = ₹2,080 rather than ₹1,950. The extra ₹130 per lot is the spread cost."
      },
      "tip": "The stop level is on the last traded price, but you sell at the bid.",
      "visual": {
        "kind": "orderBook",
        "title": "Bid-ask around the stop (illustrative)",
        "caption": "A sell stop fills against bids, not at the last price.",
        "bids": [
          [
            118,
            260
          ],
          [
            117.5,
            390
          ],
          [
            117,
            650
          ]
        ],
        "asks": [
          [
            119,
            200
          ],
          [
            119.5,
            325
          ],
          [
            120,
            500
          ]
        ]
      }
    },
    {
      "t": 4,
      "def": "An underlying-based stop is placed on the index level, not the option price. You exit the option when NIFTY crosses a chosen level.",
      "hi": "Underlying-based stop option ke price par nahi, balki index ke level par lagta hai. NIFTY jab ek tay level paar kare toh aap option se nikalte ho.",
      "how": "The reason for a directional trade is a view on the index, so the view fails when the index crosses a level, whatever the option premium says. You set the level on the chart, for example below the opening range low, and exit manually or by an alert, since most exchange stop orders are on the option contract itself. You must translate the index move into premium using delta to know the rupee loss.",
      "eg": {
        "title": "A 50-point index stop (illustrative)",
        "text": "Buy the 24,000 CE at 197.7. The stop is a fall in NIFTY to 23,950. At delta near 0.5, the option would be about 172.6 (a drop of 25.1 points). Loss = 25.1 × 65 = ₹1,632 per lot. Time passing and IV changes will move this a little."
      },
      "tip": "Convert the index stop into rupees before entering. The option loss depends on delta.",
      "visual": {
        "kind": "candles",
        "title": "Stop below the opening range",
        "caption": "The idea is invalid when price closes back below the level.",
        "pattern": "breakout",
        "level": {
          "price": 23950,
          "label": "Stop level 23,950"
        }
      },
      "calc": {
        "id": "greeks",
        "preset": {
          "optType": "CE",
          "spot": 24000,
          "strike": 24000,
          "days": 7,
          "iv": 14,
          "rate": 6.5
        },
        "why": "Gives delta to translate an index stop into premium loss."
      }
    },
    {
      "t": 5,
      "def": "A trailing stop moves in the direction of profit, so it locks in gains as the trade works but never moves back against you.",
      "hi": "Trailing stop profit ki direction mein aage badhta hai, isse gain lock hota hai par yeh kabhi wapas aapke khilaf nahi jaata.",
      "how": "The stop is set a fixed distance below the highest price reached, or below a rising chart level. If the price makes a new high, the stop moves up; if the price falls, the stop stays. It protects profit but may exit during a normal pullback. In options the premium can drop sharply on a small reversal because of time decay, so the trail distance needs to be wide enough for noise.",
      "eg": {
        "title": "A 30-point trail (illustrative)",
        "text": "Entry 150, initial stop 120. The premium rises to 230. The trailing stop is 230 − 30 = 200, locking (200 − 150) × 65 = ₹3,250 per lot. If the premium then falls to 200 and fills there, the trade earns ₹3,250. If the premium keeps rising to 260, the stop moves to 230."
      },
      "tip": "Trail by a distance that suits the option's normal swings, not by a feeling.",
      "visual": {
        "kind": "timeline",
        "title": "A trailing stop in motion (illustrative)",
        "caption": "The stop only moves up.",
        "events": [
          {
            "when": "Entry 150",
            "what": "Stop 120",
            "tone": "neutral"
          },
          {
            "when": "Peak 190",
            "what": "Stop moves to 160",
            "tone": "gold"
          },
          {
            "when": "Peak 230",
            "what": "Stop moves to 200",
            "tone": "bull"
          },
          {
            "when": "Fall to 200",
            "what": "Exit with a profit",
            "tone": "ice"
          }
        ]
      }
    },
    {
      "t": 6,
      "def": "A time-based stop exits a trade after a set period if it has not worked, regardless of price.",
      "hi": "Time-based stop trade ko ek tay samay ke baad band kar deta hai agar woh kaam nahi kiya, price chahe kuch bhi ho.",
      "how": "Option buyers lose value each day through time decay (theta), and the decay speeds up as expiry nears. If the move you expected has not happened within a window, the reason for the trade is weaker and the premium is eroding. Set the time in advance, such as 45 minutes, end of the day or two days. A time stop is especially useful for buying options close to expiry.",
      "eg": {
        "title": "The cost of waiting (illustrative)",
        "text": "The ATM 24,000 CE with 2 days left is about 102.7; one day later with spot unchanged it is about 71.9, a loss of 30.8 × 65 = ₹2,002 per lot just from time. At 1 day left, theta is about -36.8 points per day."
      },
      "tip": "A flat trade is not neutral for a buyer. Every hour costs premium.",
      "visual": {
        "kind": "curve",
        "title": "Time value decay",
        "caption": "Decay accelerates toward expiry.",
        "curve": "theta"
      },
      "calc": {
        "id": "greeks",
        "preset": {
          "optType": "CE",
          "spot": 24000,
          "strike": 24000,
          "days": 1,
          "iv": 14,
          "rate": 6.5
        },
        "why": "Shows the theta per day for a one-day-to-expiry option."
      }
    },
    {
      "t": 7,
      "def": "A volatility-based stop sets the distance according to how much the market normally moves, so the stop is wider on volatile days and tighter on calm ones.",
      "hi": "Volatility-based stop distance us hisaab se tay karta hai ki market aam taur par kitna chalta hai, taaki volatile din par stop chauda aur shaant din par tang ho.",
      "how": "Use a measure such as the daily expected move from India VIX, or the average true range from the chart. A fixed fraction of that move, for example a quarter, gives a stop distance that adjusts automatically. It avoids stops that are too tight on active days. When the stop gets wider, reduce the number of lots to keep the rupee risk the same.",
      "eg": {
        "title": "Stop as a fraction of the expected move (illustrative)",
        "text": "At VIX 14 the one-day expected move is 24,000 × 0.14 × √(1/365) = about 176 points, so a quarter is 44 points. At VIX 20 the move is about 251 points and a quarter is 63 points. The stop is 19 points wider at the higher VIX, so lots may need to fall by about 30% to keep the same rupee risk."
      },
      "tip": "A wider stop needs a smaller size. Otherwise the risk grows.",
      "visual": {
        "kind": "bars",
        "title": "Quarter of the one-day move (points)",
        "caption": "Stop widens as volatility rises.",
        "unit": " pts",
        "items": [
          {
            "label": "VIX 14",
            "value": 44,
            "tone": "ice"
          },
          {
            "label": "VIX 20",
            "value": 63,
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "expected-move",
        "preset": {
          "spot": 24000,
          "vix": 14,
          "days": 1
        },
        "why": "Gives the one-day move used as the stop yardstick."
      }
    },
    {
      "t": 8,
      "def": "A partial exit sells part of the position at a target and keeps the rest running, usually with the stop moved to cost.",
      "hi": "Partial exit mein position ka kuch hissa target par bech dete ho aur baaki chalne dete ho, aam taur par stop ko cost par le jaakar.",
      "how": "It reduces risk after a favourable move and lets part of the trade benefit from a bigger run. The trade needs at least two lots to be split, which is a constraint when lots are large. The remaining lot's stop is moved to entry only if the trade logic still holds; moving it just to feel safe can take you out of a good trade. Costs apply to each leg.",
      "eg": {
        "title": "Splitting two lots (illustrative)",
        "text": "Two lots bought at 150, initial stop 120. At 180 (a 1:1 move), sell one lot: (180 − 150) × 65 = ₹1,950 booked. Move the stop on the second lot to 150. Worst case for the full trade is about ₹1,950 profit before costs (booked gain, with the second lot at cost). If the second lot runs to 240, it adds ₹5,850."
      },
      "tip": "Partial exits trade some upside for peace of mind. Decide the plan before entry.",
      "visual": {
        "kind": "flow",
        "title": "Partial exit plan",
        "caption": "Book half at 1R, protect the rest.",
        "steps": [
          {
            "label": "Buy 2 lots at 150",
            "note": "Stop 120",
            "tone": "ice"
          },
          {
            "label": "Sell 1 lot at 180",
            "note": "Book ₹1,950",
            "tone": "gold"
          },
          {
            "label": "Stop on rest at 150",
            "note": "Worst case is cost",
            "tone": "neutral"
          }
        ]
      }
    },
    {
      "t": 9,
      "def": "Slippage is the gap between the price you expected and the price you actually got. During stop-loss exits it can be large.",
      "hi": "Slippage aapke expected price aur actual mile hue price ke beech ka farak hai. Stop-loss exit mein yeh bada ho sakta hai.",
      "how": "A stop-market order fills at the next available prices, which in a fast move may be well below the trigger. A stop-limit order sets a floor price and may not fill if the price skips through the limit. Wide spreads, thin books, news and expiry-day moves increase slippage. Allow for slippage when sizing: plan for the loss to be somewhat larger than the stop distance.",
      "eg": {
        "title": "Slippage on a stop (illustrative)",
        "text": "Stop trigger 120, stop-market fills at 112 in a fast move. Loss = 38 × 65 = ₹2,470 instead of ₹1,950, which is ₹520 extra. A stop-limit with limit 118 would not fill if the price jumped from 121 to 112."
      },
      "tip": "Expect slippage. Size so that a worse-than-planned fill does not hurt.",
      "visual": {
        "kind": "bars",
        "title": "Planned versus actual loss per lot (₹)",
        "caption": "Eight points of slippage.",
        "unit": "",
        "items": [
          {
            "label": "Planned",
            "value": 1950,
            "tone": "gold"
          },
          {
            "label": "Actual",
            "value": 2470,
            "tone": "bear"
          }
        ]
      },
      "calc": {
        "id": "spread-cost",
        "preset": {
          "bid": 118,
          "ask": 119,
          "qty": 1,
          "lotSize": 65
        },
        "why": "Shows what a one-point spread costs per lot."
      }
    },
    {
      "t": 10,
      "def": "Stop-loss execution failure is when a stop does not protect you: a gap, a halt, a price-band rejection, a platform outage or no buyers at your level.",
      "hi": "Stop-loss execution failure tab hota hai jab stop aapko bacha nahi paata: gap, halt, price-band rejection, platform outage ya aapke level par buyer na hona.",
      "how": "Exchanges apply price bands and checks to option orders, so orders far from the market can be rejected. Overnight gaps skip any stop, since the market reopens at a new price. Brokers' platforms or your internet can fail at the worst time. Illiquid strikes may have no buyer at all. Keep the position size small enough that a worse-than-planned exit is survivable, and know your broker's backup methods, such as a phone dealing desk.",
      "eg": {
        "title": "A gap through the stop (illustrative)",
        "text": "Stop at 120, last trade 125. News hits and the premium trades next at 90. The loss is (150 − 90) × 65 = ₹3,900 per lot against ₹1,950 planned. A 4-lot position loses ₹15,600 instead of ₹7,800, which is 0.8% of ₹5,00,000 instead of 0.4% plan."
      },
      "tip": "Assume your stop will sometimes fail, and size for that day.",
      "visual": {
        "kind": "matrix",
        "title": "When stops fail",
        "caption": "Different causes, same lesson: size small.",
        "xLabels": [
          "Market-caused",
          "System-caused"
        ],
        "yLabels": [
          "Sudden",
          "Slow"
        ],
        "cells": [
          {
            "head": "Gap or halt",
            "note": "Price jumps past the stop",
            "tone": "gold"
          },
          {
            "head": "Platform or network outage",
            "note": "Order never reaches exchange",
            "tone": "gold"
          },
          {
            "head": "Thin book",
            "note": "No buyer near the stop",
            "tone": "neutral"
          },
          {
            "head": "Order rejection",
            "note": "Price band or margin check",
            "tone": "neutral"
          }
        ]
      }
    }
  ]
}
export default m
