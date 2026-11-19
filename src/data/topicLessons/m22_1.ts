import type { ModuleLesson } from '../topicLessonTypes'

/* Module 22.1 - Capital Management. Illustrative numbers: capital ₹5,00,000, NIFTY about 24,000, lot 65 (check current NSE contract specification), margin figures illustrative (use broker margin calculator). */
const m: ModuleLesson = {
  "moduleId": "22.1",
  "intro": "Capital management decides how much money you put at risk, how much margin you use and when you stop trading for the day, week or month. Most account blow-ups in options come from sizing and margin mistakes, not from a wrong market view. This module builds a set of written limits that keep one bad stretch from ending your trading.",
  "introHi": "Capital management tay karta hai ki aap kitna paisa risk par lagate ho, kitna margin use karte ho aur din, hafte ya mahine mein kab trading rok dete ho. Options mein zyadatar account sizing aur margin ki galtiyon se doobte hain, galat market view se kam. Yeh module likhit limits banata hai taaki ek kharab daur aapki trading khatam na kar de.",
  "steps": {
    "concept": "Capital management is the set of rules that limits how much you can lose before you stop and reassess. It covers how much money is allotted to trading, how much margin you use, the size of each position, and loss limits per day, week and month. It does not make trades profitable; it keeps losses survivable.",
    "conceptHi": "Capital management un rules ka set hai jo tay karte hain ki aap kitna loss sehkar ruk kar sochoge. Isme shaamil hai trading ke liye kitna paisa alag rakha hai, kitna margin use ho raha hai, har position ka size, aur din, hafte, mahine ki loss limit. Isse trades profitable nahi hote, bas losses jhelne layak rehte hain.",
    "mechanism": "Start with trading capital, the amount you can afford to lose. Margin used by short positions is blocked out of that capital by the broker (SPAN plus exposure margin, collected through the clearing corporation system), and available margin is what remains. Position size is then set from a fixed risk per trade, and daily, weekly and monthly limits stop further trades once losses reach a fixed percentage. Each layer is smaller than the one above it.",
    "example": {
      "title": "A ₹5,00,000 account with written limits (illustrative)",
      "text": "Capital ₹5,00,000. Risk per trade 1% (₹5,000), daily limit 2% (₹10,000), weekly 5% (₹25,000), monthly drawdown 10% (₹50,000). A long CE bought at 150 with a stop at 120 risks 30 × 65 = ₹1,950 per lot, so the budget allows floor(5,000 ÷ 1,950) = 2 lots, with a planned loss of ₹3,900. Two such stopped-out trades in a day reach the daily limit and trading ends for that day."
    },
    "chart": {
      "kind": "layers",
      "title": "Capital and loss limits, widest first",
      "caption": "Each limit sits inside the one above it.",
      "layers": [
        {
          "label": "Total savings",
          "note": "Not all of it is trading capital",
          "tone": "neutral"
        },
        {
          "label": "Trading capital",
          "note": "Money you can afford to lose",
          "tone": "ice"
        },
        {
          "label": "Margin in use",
          "note": "Blocked by the broker for short positions",
          "tone": "gold"
        },
        {
          "label": "Risk per trade",
          "note": "About 1% in this example",
          "tone": "gold"
        }
      ]
    },
    "optionChain": "The option chain shows premiums, which become your position cost and risk per lot. A wide bid-ask spread on a strike raises the real cost of entering and exiting, so factor it into size. Margin for short options changes with spot, VIX and the strike distance. Always use your broker's margin calculator on the exact strikes before sizing, because the numbers here are illustrative.",
    "psychology": "Limits are easy to set when calm and hard to follow after losses. The common failure is raising size after a loss to win it back. Writing limits in advance, and treating the daily limit as a rule rather than a suggestion, protects against revenge trading and the belief that the next trade will fix everything.",
    "scenarios": {
      "bullish": "A winning streak tempts you to increase size sharply. Increase risk per trade only on a schedule you set in advance, never because of a feeling of being on a roll.",
      "bearish": "A losing run tests the limits. If the daily or weekly limit is reached, stop. A smaller account recovers more slowly, so protecting what is left matters more than recovering fast.",
      "sideways": "Few good setups can lead to forcing trades. It is acceptable to take no trade; capital kept intact is a position too."
    },
    "practice": [
      {
        "q": "Capital ₹5,00,000, risk 1% per trade, CE entry 150, stop 120, lot 65. How many lots?",
        "a": "Budget = ₹5,000. Risk per lot = 30 × 65 = ₹1,950. Lots = floor(5,000 ÷ 1,950) = 2. Planned loss = ₹3,900."
      },
      {
        "q": "A broker margin calculator shows ₹1,40,000 per lot for a short strangle (illustrative). What is the utilisation for 2 lots on ₹5,00,000, and what if margin rises 20%?",
        "a": "2 × 1,40,000 = ₹2,80,000, which is 56% of capital. After a 20% rise, margin = ₹3,36,000, which is 67.2%. Less headroom is left for further losses."
      },
      {
        "q": "You hit five consecutive 1% losses. What is your capital, and what if the risk had been 2% each time?",
        "a": "At 1%: 5,00,000 × 0.99^5 = about ₹4,75,495. At 2%: 5,00,000 × 0.98^5 = about ₹4,51,960. Larger risk compounds the damage faster."
      },
      {
        "q": "Monthly drawdown limit is 10% of ₹5,00,000. What is the limit in rupees, and what gain restores capital after it is hit?",
        "a": "10% = ₹50,000. Capital falls to ₹4,50,000. Recovery needs 50,000 ÷ 4,50,000 = 11.1%."
      }
    ],
    "assignment": "Write a one-page capital plan with five numbers: trading capital, risk per trade, daily limit, weekly limit and monthly drawdown limit, each in rupees and in percent. Add the maximum margin utilisation you will allow. Check your last twenty trades against it and mark each one that broke a limit."
  },
  "topics": [
    {
      "t": 1,
      "def": "Trading capital is the money you set aside purely for trading, which you can lose without hurting your living costs, emergency fund or loans. It is not your total savings.",
      "hi": "Trading capital woh paisa hai jo aap sirf trading ke liye alag rakhte ho aur jise khone par aapka ghar ka kharcha, emergency fund ya EMI par asar nahi padta. Yeh aapki poori savings nahi hoti.",
      "how": "Keep trading capital in a separate bank-linked broker account so you can see it clearly. Money needed for rent, school fees or loan instalments does not belong here. A fixed capital figure also gives a base for percentage limits. If you add money after a loss to keep trading the same size, you are not managing capital, you are hiding losses.",
      "eg": {
        "title": "Separating trading capital (illustrative)",
        "text": "Total savings ₹20,00,000. Emergency fund and goals ₹15,00,000; trading capital ₹5,00,000, which is 25%. One ATM weekly CE (24,000 strike, 7 days, IV 14%) costs about ₹197.7 × 65 = ₹12,851 per lot, which is 2.6% of that capital."
      },
      "tip": "If losing the capital would change your life, it is not trading capital.",
      "visual": {
        "kind": "bars",
        "title": "Where ₹20 lakh sits (illustrative)",
        "caption": "Only the smaller slice is trading capital.",
        "unit": " lakh",
        "items": [
          {
            "label": "Emergency and goals",
            "value": 15,
            "tone": "neutral"
          },
          {
            "label": "Trading capital",
            "value": 5,
            "tone": "gold"
          }
        ]
      }
    },
    {
      "t": 2,
      "def": "Available margin is the cash and collateral in your account that is not already blocked by open positions or pending orders. It is the room you have for new trades or for adverse moves.",
      "hi": "Available margin aapke account ka woh cash aur collateral hai jo abhi open positions ya pending orders mein blocked nahi hai. Yeh naye trades ya khilaaf moves ke liye bachi hui jagah hai.",
      "how": "Buying an option needs the full premium paid up front, so it uses cash. Selling an option or futures position needs margin: SPAN margin (a risk-based figure computed by the exchange's system) plus exposure margin, collected by the broker for the clearing corporation. Your broker's dashboard shows used and available margin live. Margin requirements change when spot, volatility or exchange rules change, so available margin can shrink without any new trade from you.",
      "eg": {
        "title": "Used and available margin (illustrative)",
        "text": "Account value ₹5,00,000. A short strangle needs ₹1,40,000 per lot as shown by the broker calculator (illustrative). With 2 lots, used margin is ₹2,80,000 and available margin is ₹2,20,000. If a VIX spike raises margin by 20% to ₹3,36,000, available margin falls to ₹1,64,000 with no change in position."
      },
      "tip": "Available margin is not spare money. It is your buffer against losses and margin changes.",
      "visual": {
        "kind": "bars",
        "title": "Account split (illustrative, ₹ thousand)",
        "caption": "Used margin versus what is left.",
        "unit": "k",
        "items": [
          {
            "label": "Used margin",
            "value": 280,
            "tone": "gold"
          },
          {
            "label": "Available",
            "value": 220,
            "tone": "ice"
          }
        ]
      }
    },
    {
      "t": 3,
      "def": "Margin utilisation is the share of your capital that is blocked as margin. A high figure leaves little buffer if margin is raised or losses mount.",
      "hi": "Margin utilisation aapke capital ka woh hissa hai jo margin mein blocked hai. Zyada figure ka matlab hai margin badhne ya loss badhne par bachne ki jagah kam.",
      "how": "Utilisation = margin used ÷ total capital. Sellers face the largest swings in this figure, because margin rises when the position moves against them or when volatility jumps. Exchange rules also change; for example, extra margin and removal of calendar-spread benefit on expiry day have been introduced in recent years, so check current NSE and broker rules. A common personal rule is to use well below the full capital, but the right level is your own decision.",
      "eg": {
        "title": "Utilisation before and after a volatility jump (illustrative)",
        "text": "Capital ₹5,00,000, used margin ₹2,80,000 = 56%. After a 20% margin rise to ₹3,36,000, utilisation is 67.2%. If the position is also down ₹60,000, the equity falls to ₹4,40,000 and utilisation becomes 3,36,000 ÷ 4,40,000 = 76.4%."
      },
      "tip": "Measure utilisation after a bad move, not only before it.",
      "visual": {
        "kind": "gauge",
        "title": "Margin utilisation (illustrative)",
        "caption": "Zones are one trader's choice, not a rule.",
        "min": 0,
        "max": 100,
        "value": 56,
        "unit": "%",
        "zones": [
          {
            "from": 0,
            "to": 40,
            "label": "Comfortable",
            "tone": "ice"
          },
          {
            "from": 40,
            "to": 70,
            "label": "Watch",
            "tone": "gold"
          },
          {
            "from": 70,
            "to": 100,
            "label": "Stretched",
            "tone": "bear"
          }
        ]
      }
    },
    {
      "t": 4,
      "def": "Capital allocation is how you split your trading capital between different purposes: a cash buffer, defined-risk trades and directional trades.",
      "hi": "Capital allocation matlab trading capital ko alag-alag kaam mein baantna: cash buffer, defined-risk trades aur directional trades.",
      "how": "Allocation prevents one idea from using everything. A buffer of cash absorbs margin increases and gives room to act on a new opportunity. Defined-risk structures (such as spreads) have a known maximum loss, so they can be sized from that loss. Directional long options risk the premium paid. The split is a personal plan; there is no right answer, and it should be written and reviewed.",
      "eg": {
        "title": "A 60/25/15 split (illustrative)",
        "text": "On ₹5,00,000: ₹3,00,000 stays as cash buffer (60%), ₹1,25,000 for defined-risk spreads (25%) and ₹75,000 for long-option trades (15%). Even if the whole ₹75,000 is lost, that is 15% of capital, and the buffer remains."
      },
      "tip": "Decide the split before you see a trade you like.",
      "visual": {
        "kind": "layers",
        "title": "Allocation of ₹5,00,000 (illustrative)",
        "caption": "Buffer is the largest layer.",
        "layers": [
          {
            "label": "Cash buffer ₹3,00,000",
            "note": "60%",
            "tone": "neutral"
          },
          {
            "label": "Defined-risk ₹1,25,000",
            "note": "25%",
            "tone": "ice"
          },
          {
            "label": "Long options ₹75,000",
            "note": "15%",
            "tone": "gold"
          }
        ]
      }
    },
    {
      "t": 5,
      "def": "Position sizing is deciding how many lots to trade so that a stop-loss hit costs only a planned percentage of capital.",
      "hi": "Position sizing ka matlab hai kitne lots lene hain taaki stop-loss hit hone par sirf capital ka tay kiya hua percent hi jaye.",
      "how": "Work backwards from the loss you accept. Risk budget = capital × risk %. Risk per lot = (entry − stop) × lot size. Lots = budget ÷ risk per lot, rounded down. If one lot risks more than the budget, skip the trade or use a tighter stop. The formula assumes the stop fills at its price; slippage or a gap can make the actual loss larger.",
      "eg": {
        "title": "Sizing a ₹150 CE (illustrative)",
        "text": "Capital ₹5,00,000, risk 1% = ₹5,000. Entry 150, stop 120, risk per lot = 30 × 65 = ₹1,950. Lots = floor(5,000 ÷ 1,950) = 2, planned loss ₹3,900. If the premium gaps to 100, the loss is 50 × 65 × 2 = ₹6,500, which is 1.3% of capital, above plan."
      },
      "tip": "Size from the stop distance, never from how confident you feel.",
      "visual": {
        "kind": "flow",
        "title": "Sizing steps",
        "caption": "Round lots down.",
        "steps": [
          {
            "label": "Capital × risk %",
            "note": "₹5,000",
            "tone": "gold"
          },
          {
            "label": "Risk per lot",
            "note": "30 × 65 = ₹1,950",
            "tone": "ice"
          },
          {
            "label": "Lots",
            "note": "floor(5,000 ÷ 1,950) = 2",
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "position-size",
        "preset": {
          "capital": 500000,
          "riskPct": 1,
          "entry": 150,
          "stop": 120,
          "lotSize": 65
        },
        "why": "Gives the lots for the example directly."
      }
    },
    {
      "t": 6,
      "def": "Lot sizing is understanding that options trade in fixed lots, so you cannot take half a lot. The lot sets the smallest unit of risk.",
      "hi": "Lot sizing ka matlab hai samajhna ki options fixed lots mein chalte hain, aadha lot nahi le sakte. Lot hi risk ki sabse chhoti unit tay karta hai.",
      "how": "NSE sets lot sizes for each contract and revises them periodically. NIFTY's current lot is 65 as per recent NSE revision; check the current contract specification before trading. One lot of NIFTY at 24,000 has a notional value of 24,000 × 65 = ₹15,60,000, though a long option's cost is only the premium. Because lots are lumpy, a small account may find that even one lot risks more than its budget, which is a signal to wait, not to oversize.",
      "eg": {
        "title": "What one lot means (illustrative)",
        "text": "Notional of one lot = 24,000 × 65 = ₹15,60,000. The ATM weekly CE premium is about ₹197.7, so one lot costs ₹12,851. A 10-point move in the premium changes the position by 10 × 65 = ₹650. On ₹5,00,000 that is 0.13%."
      },
      "tip": "Know the rupee value of one point before you click buy.",
      "visual": {
        "kind": "compare",
        "title": "Notional versus premium paid",
        "caption": "Exposure is large; the cash at risk for a buyer is the premium.",
        "left": {
          "head": "Notional value",
          "tone": "ice",
          "points": [
            "24,000 × 65",
            "₹15,60,000",
            "Shows the size of the exposure"
          ]
        },
        "right": {
          "head": "Premium paid",
          "tone": "gold",
          "points": [
            "About 197.7 × 65",
            "About ₹12,851",
            "Maximum loss for a buyer"
          ]
        }
      },
      "calc": {
        "id": "lot-value",
        "preset": {
          "premium": 197.7,
          "lotSize": 65,
          "lots": 1,
          "spot": 24000,
          "marginPct": 12
        },
        "why": "Shows the cost and notional of one lot."
      }
    },
    {
      "t": 7,
      "def": "Risk per trade is the maximum amount, usually a small percentage of capital, you accept losing if a trade fails.",
      "hi": "Risk per trade woh maximum rakam hai, aam taur par capital ka chhota percent, jo trade fail hone par aap khone ko taiyaar ho.",
      "how": "Many traders use 1% or less, but the figure is a personal choice that depends on win rate and payoff size. The cost of a wrong number compounds. Five losses in a row at 1% leave about 95.1% of capital; at 5% they leave about 77.4%. A fixed percentage also shrinks your size automatically after losses and grows it after gains, which is a built-in discipline.",
      "eg": {
        "title": "Five losses in a row (illustrative)",
        "text": "Capital ₹5,00,000. At 1% risk: 5,00,000 × 0.99^5 = ₹4,75,495. At 2%: 5,00,000 × 0.98^5 = ₹4,51,960. At 5%: 5,00,000 × 0.95^5 = ₹3,86,890. Higher risk per trade shortens the time you can stay in the game."
      },
      "tip": "Choose risk per trade so that a long losing run is still survivable.",
      "visual": {
        "kind": "curve",
        "title": "Capital after a drawdown path",
        "caption": "Losses compound against a smaller base.",
        "curve": "drawdown"
      },
      "calc": {
        "id": "drawdown-recovery",
        "preset": {
          "drawdownPct": 25
        },
        "why": "Shows what recovery a deeper loss streak demands."
      }
    },
    {
      "t": 8,
      "def": "Maximum daily loss is a limit on how much you can lose in one trading day. When it is reached, you stop trading until the next day.",
      "hi": "Maximum daily loss ek din mein kitna loss sehna hai uski limit hai. Jab yeh limit lag jaye, toh agle din tak trading band.",
      "how": "The limit turns a bad day into a bounded day. Without it, losses push traders to larger and more reckless trades. Set it as a percentage of capital, for example 2%, and have it as a rule you follow even if you feel a good setup is coming. Some brokers offer tools to block new orders after a loss limit, which helps enforce it, but the discipline is yours.",
      "eg": {
        "title": "A 2% daily limit (illustrative)",
        "text": "Capital ₹5,00,000, daily limit 2% = ₹10,000. Trade 1 loses ₹4,000, trade 2 loses ₹5,500, total ₹9,500. The next trade could lose ₹3,000, taking the day to ₹12,500, so the rule says no more trades once you are at or close to the limit."
      },
      "tip": "The limit works only if you actually stop. Close the terminal.",
      "visual": {
        "kind": "bars",
        "title": "Daily loss against the limit (illustrative)",
        "caption": "The limit is ₹10,000; further trading is not allowed.",
        "unit": " ₹",
        "items": [
          {
            "label": "Trade 1",
            "value": 4000,
            "tone": "bear"
          },
          {
            "label": "Trade 2",
            "value": 5500,
            "tone": "bear"
          },
          {
            "label": "Daily limit",
            "value": 10000,
            "tone": "gold"
          }
        ]
      }
    },
    {
      "t": 9,
      "def": "Maximum weekly loss is a limit on the total loss over a week. It catches slow bleeding that daily limits do not stop.",
      "hi": "Maximum weekly loss ek hafte ka total loss limit hai. Yeh dheere dheere hone wale nuksaan ko pakadta hai jo daily limit nahi rok pata.",
      "how": "Five days at the daily limit would be 10% in a week, so the weekly limit is set lower than five daily limits. Once it is reached, you take the rest of the week off to review the trades. This pause is when mistakes in a plan are noticed. Weekly expiries for NIFTY mean a week often has a natural cycle, so review at the end of each expiry week.",
      "eg": {
        "title": "Weekly limit hit by Wednesday (illustrative)",
        "text": "Capital ₹5,00,000, weekly limit 5% = ₹25,000. Monday loss ₹8,000, Tuesday loss ₹9,500, Wednesday loss ₹7,500 gives ₹25,000 total. Trading stops until the next week, and the three trades are reviewed. Without the weekly cap, each of those days would have looked acceptable on its own."
      },
      "tip": "A weekly limit is a signal to review, not just to rest.",
      "visual": {
        "kind": "timeline",
        "title": "A week ending at the limit (illustrative)",
        "caption": "Losses add up even when each day stays within its limit.",
        "events": [
          {
            "when": "Monday",
            "what": "Loss ₹8,000",
            "tone": "bear"
          },
          {
            "when": "Tuesday",
            "what": "Loss ₹9,500, total ₹17,500",
            "tone": "bear"
          },
          {
            "when": "Wednesday",
            "what": "Loss ₹7,500, total ₹25,000, stop for the week",
            "tone": "gold"
          }
        ]
      }
    },
    {
      "t": 10,
      "def": "Maximum monthly drawdown is the largest fall from your account's peak that you accept in a month before you pause, cut size and review the entire approach.",
      "hi": "Maximum monthly drawdown account ke peak se sabse bada girawat hai jo aap ek mahine mein sehne ko tayyar ho, uske baad aap ruk kar size ghatate ho aur poora approach review karte ho.",
      "how": "A drawdown is measured from the highest account value to the lowest value after it. Recovery needs a bigger gain than the loss: 10% down needs about 11.1% up, 25% needs 33.3% and 50% needs 100%. A monthly limit therefore protects against a hole that is hard to climb out of. Reaching it should trigger a defined action, such as trading at half size for the next month.",
      "eg": {
        "title": "A 10% monthly limit (illustrative)",
        "text": "Peak capital ₹5,00,000, monthly limit 10% = ₹50,000, so stop at ₹4,50,000. Recovery needs 50,000 ÷ 4,50,000 = 11.1%. If the loss were 30% (₹1,50,000), the account would be at ₹3,50,000 and need a 42.9% gain to return to ₹5,00,000."
      },
      "tip": "The deeper the hole, the steeper the climb. Stop early.",
      "visual": {
        "kind": "curve",
        "title": "Gain needed to recover a loss",
        "caption": "Recovery needs rise faster than the drawdown.",
        "curve": "drawdown"
      },
      "calc": {
        "id": "drawdown-recovery",
        "preset": {
          "drawdownPct": 10
        },
        "why": "Shows the gain needed after a 10% drawdown."
      }
    }
  ]
}
export default m
