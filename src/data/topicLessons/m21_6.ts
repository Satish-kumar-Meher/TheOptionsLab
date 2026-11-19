import type { ModuleLesson } from '../topicLessonTypes'

/* Module 21.6 - Full Market Scenario Analysis. All numbers illustrative: NIFTY about 24,000, lot 65 (check current NSE contract specification), VIX about 14. Premiums are Black-Scholes (r 6.5%, q 1.3%). */
const m: ModuleLesson = {
  "moduleId": "21.6",
  "intro": "Full scenario analysis means reading one trading setup from every side before putting money in: who is participating, where the option chain shows interest, what spot, futures, India VIX and implied volatility are doing, and what would prove you wrong. This module turns those twelve questions into a checklist you answer for every setup, so a trade rests on evidence rather than on one indicator.",
  "introHi": "Full scenario analysis ka matlab hai ek setup ko har angle se padhna: kaun participate kar raha hai, option chain mein interest kahan hai, spot, futures, India VIX aur IV kya kar rahe hain, aur kaunsi cheez aapko galat saabit karegi. Yeh module in barah sawaalon ko ek checklist bana deta hai, taaki har trade ek indicator par nahi, balki evidence par tike.",
  "steps": {
    "concept": "A scenario analysis is a short written answer to twelve questions about one setup. No single answer decides the trade. The value comes from checking whether the answers agree with each other, and from writing down in advance what would invalidate the idea. If the answers conflict, the right decision is often to wait or to trade smaller.",
    "conceptHi": "Scenario analysis barah sawaalon ke chhote likhit jawab hain, ek setup ke baare mein. Koi ek jawab trade decide nahi karta. Asli faayda tab hai jab aap dekhte ho ki jawab ek doosre se match karte hain ya nahi, aur pehle se likh lete ho ki kya galat saabit karega. Agar jawab aapas mein takrate hain, toh aksar ruk jaana ya size chhoti rakhna sahi hota hai.",
    "mechanism": "Each question looks at a different layer. Participants and OI show where contracts are being opened or closed (but not who initiated them). Spot and futures show the actual price. India VIX and IV show how much movement the market is paying for. The breakout and invalidation questions turn the evidence into rules. A trade is worth considering only when the layers broadly agree and the loss at the invalidation point fits your risk budget.",
    "example": {
      "title": "A twelve-question read of a NIFTY setup (illustrative)",
      "text": "Spot is 24,090 after opening at 24,000, up 90 points. The 24,100 CE has the highest OI (1,30,000 lots) and its OI is falling, the 24,000 PE OI is rising, futures trade at 24,115, India VIX is up from 14.0 to 15.2 and ATM IV has risen with it. The picture is mixed: price strength and falling call OI support a bullish read, while rising VIX warns that premiums are already more expensive. The ATM 24,000 CE with 7 days left would cost about ₹213.6 per unit against ₹197.7 at VIX 14. A sensible answer is a smaller, defined-risk long with a stop below 24,040, or no trade if the 24,100 breakout does not hold."
    },
    "chart": {
      "kind": "flow",
      "title": "The twelve-question scenario read",
      "caption": "Participants, then option chain, then price and volatility, then breakout and invalidation.",
      "steps": [
        {
          "label": "Who and which side",
          "note": "Entering, exiting, pressure",
          "tone": "gold"
        },
        {
          "label": "Option chain",
          "note": "Highest OI, rising and falling OI",
          "tone": "ice"
        },
        {
          "label": "Price and volatility",
          "note": "Spot, futures, VIX, IV",
          "tone": "ice"
        },
        {
          "label": "Breakout test",
          "note": "Genuine or a trap?",
          "tone": "gold"
        },
        {
          "label": "Invalidation",
          "note": "What proves me wrong",
          "tone": "neutral"
        }
      ]
    },
    "optionChain": "The option chain feeds six of the twelve questions: the highest OI strike, where OI is increasing, where it is decreasing, and clues about who is entering or exiting and which side is under pressure. Remember the limits: OI shows open contracts, not who bought or sold; a high OI strike is a possible reference level, not a guaranteed wall; and a change in OI says contracts opened or closed, not the intent behind them. Always read the chain together with spot, futures and IV.",
    "psychology": "Having a checklist guards against the most common error: falling in love with one signal. A trader who sees a rising call OI wall may ignore the rising VIX and a falling futures premium. Writing down the answers, including the awkward ones, forces honesty. Writing the invalidation point before entry also removes the urge to move it once the trade goes against you.",
    "scenarios": {
      "bullish": "Spot above the highest call OI strike, call OI at that strike falling, put OI rising below, futures leading spot and VIX flat or easing. Most answers agree, so a defined-risk long can be considered with the stop under the breakout level.",
      "bearish": "Spot below a rising put OI base, put OI falling while price drops, futures at a discount and VIX rising. The risk for put sellers is highest here, so size small or prefer defined-risk structures.",
      "sideways": "Spot stays between the two highest OI strikes, VIX drifts lower and IV falls. Buyers lose time value; sellers with defined risk may benefit, but only if the range is respected until the exit time."
    },
    "practice": [
      {
        "q": "Spot is 24,090 and the one-day expected move at India VIX 14 is about 176 points. How large is the day's 90-point rise in standard-deviation terms?",
        "a": "One-day move = 24,000 × 0.14 × √(1/365) = about 176 points. 90 ÷ 176 = about 0.51 of a standard deviation, a normal-sized move rather than a shock."
      },
      {
        "q": "India VIX rises from 14.0 to 15.2. What is the percentage change, and what is the new one-day expected move at spot 24,000?",
        "a": "(15.2 − 14.0) ÷ 14.0 = 8.6%. New one-day move = 24,000 × 0.152 × √(1/365) = about 191 points, against 176 before."
      },
      {
        "q": "Total call OI across five strikes is 3,95,000 lots and put OI is 3,25,000 lots. Compute the PCR and say what it does and does not tell you.",
        "a": "PCR = 3,25,000 ÷ 3,95,000 = 0.82. It compares open contracts on the two sides. It does not say who bought or sold them, and a value below 1 is not a forecast of direction."
      },
      {
        "q": "You buy the 24,100 CE at ₹206.5 with a stop on the underlying at 24,060 after a break at 24,115. Using delta 0.54, what is the approximate premium loss per lot if the stop hits?",
        "a": "Underlying risk = 24,115 − 24,060 = 55 points. Premium change is about 55 × 0.54 = 29.7 points. Per lot (65) = 29.7 × 65 = ₹1,931. Delta changes as price moves, so this is approximate, and a gap can cause a larger loss."
      }
    ],
    "assignment": "Choose one recent NIFTY session. Fill in all twelve questions in writing using the end-of-day OI table, the futures close, India VIX and spot data. Then add a one-line decision (trade, smaller trade, or no trade) and the exact invalidation level you would have used. Compare it with how the next session actually unfolded and note which answers were useful."
  },
  "topics": [
    {
      "t": 1,
      "def": "This question asks who is opening new positions. In index options you cannot see their names; you infer participation from changes in open interest, price, volume and, for futures, the participant-wise data NSE publishes after the close.",
      "hi": "Yeh sawaal poochta hai ki naye positions kaun khol raha hai. Index options mein naam nahi dikhte; aap OI, price, volume ke badlav se andaza lagate ho, aur NSE din ke baad jo participant-wise data publish karta hai woh bhi dekhte ho.",
      "how": "When OI at a strike rises, new contracts were created, because every open contract has a buyer and a seller. OI alone cannot say who initiated the trade. If a call's premium falls while its OI rises, writing is a more likely explanation, and if the premium rises with rising OI, buying is more likely; both are inferences, not proof. NSE's participant-wise OI (FII, DII, Pro, Client) is published after market hours, so it describes yesterday, not the live market.",
      "eg": {
        "title": "Reading entry from OI (illustrative)",
        "text": "The 24,100 CE OI rises from 40,000 to 52,000 lots, an addition of 12,000 lots or 30%, while its premium falls from 80 to 68. That is 7,80,000 units of new contracts (12,000 × 65). With the premium falling, fresh call writing is the likelier reading, but a buyer-seller split cannot be confirmed from OI alone."
      },
      "tip": "Say \"likely writing\" or \"likely buying\", never \"writers entered\". OI does not carry the initiator's name.",
      "visual": {
        "kind": "bars",
        "title": "Change in 24,100 CE open interest",
        "caption": "OI rose by 12,000 lots, but OI does not say who initiated.",
        "unit": " lots",
        "items": [
          {
            "label": "Earlier OI",
            "value": 40000,
            "tone": "neutral"
          },
          {
            "label": "Later OI",
            "value": 52000,
            "tone": "gold"
          },
          {
            "label": "Added",
            "value": 12000,
            "tone": "ice"
          }
        ]
      }
    },
    {
      "t": 2,
      "def": "This question asks who is leaving: positions being squared off, covered or allowed to expire. When open contracts fall, those exits show up as a drop in OI.",
      "hi": "Yeh sawaal poochta hai ki kaun bahar nikal raha hai: positions square off ho rahi hain, cover ho rahi hain ya expire ho rahi hain. Jab open contracts ghat'te hain, toh OI mein girawat dikhti hai.",
      "how": "OI falls only when a buyer and a seller both close an existing contract, or when contracts expire. A fall in OI with a rising premium can mean short covering (writers buying back), and a fall with a falling premium can mean long unwinding (buyers selling). The same drop can also come from simple roll-overs to the next expiry, so check the next expiry's OI before concluding. Exits are often as informative as entries because they remove a possible wall.",
      "eg": {
        "title": "Reading exits from OI (illustrative)",
        "text": "The 23,900 PE OI falls from 60,000 to 45,000 lots, a drop of 15,000 lots or 25%, while the premium falls from 40 to 31. Long unwinding by put holders is one reading, but part of it could be positions shifted to 23,800. The 9,75,000 units that left (15,000 × 65) tell you the support at that strike is weaker than it was."
      },
      "tip": "A fall in OI is not automatically a reversal. Check whether the OI moved to another strike or expiry.",
      "visual": {
        "kind": "matrix",
        "title": "Premium and OI together (option-level hint)",
        "caption": "Hints, not rules. Confirm with price action and other data.",
        "xLabels": [
          "OI rising",
          "OI falling"
        ],
        "yLabels": [
          "Premium rising",
          "Premium falling"
        ],
        "cells": [
          {
            "head": "Fresh buying likely",
            "note": "New longs",
            "tone": "ice"
          },
          {
            "head": "Short covering likely",
            "note": "Writers exit",
            "tone": "gold"
          },
          {
            "head": "Fresh writing likely",
            "note": "New shorts",
            "tone": "gold"
          },
          {
            "head": "Long unwinding likely",
            "note": "Buyers exit",
            "tone": "ice"
          }
        ]
      }
    },
    {
      "t": 3,
      "def": "This question asks which participants are losing money and may be forced to act, such as writers whose positions are moving against them. Pressure builds where a position is being tested and the loss is growing.",
      "hi": "Yeh sawaal poochta hai ki kis side ka paisa doob raha hai aur kise majboori mein action lena pad sakta hai, jaise woh writers jinki position unke khilaf ja rahi hai. Pressure wahan banta hai jahan position test ho rahi ho aur loss badh raha ho.",
      "how": "Compute the breakeven of the crowded side. A call writer who sold the 24,100 CE at 68 breaks even at 24,168 (strike plus premium). As spot approaches and passes that level, the loss grows and margin requirement rises, which may lead some to cover or hedge. That buying can add to the move, but only if enough open interest is on that side and the move continues. It is a possibility to watch, not a certain squeeze.",
      "eg": {
        "title": "Where the call writer starts losing (illustrative)",
        "text": "A writer sells the 24,100 CE at 68. Breakeven = 24,100 + 68 = 24,168. At expiry spot 24,250 the option is worth 150, so the loss per unit is 150 − 68 = 82 and per lot 82 × 65 = ₹5,330. Between 24,100 and 24,168 the writer is still profitable but with a shrinking cushion."
      },
      "tip": "Pressure is a zone, not a point. Mark the breakeven of the crowded strike, not just the strike itself.",
      "visual": {
        "kind": "payoff",
        "title": "Short 24,100 CE at 68",
        "caption": "Loss begins above 24,168 and grows without a limit.",
        "spot": 24000,
        "legs": [
          {
            "type": "CE",
            "side": -1,
            "strike": 24100,
            "premium": 68
          }
        ]
      },
      "calc": {
        "id": "breakeven",
        "preset": {
          "optType": "CE",
          "side": "sell",
          "strike": 24100,
          "premium": 68
        },
        "why": "Shows the writer breakeven where pressure starts."
      }
    },
    {
      "t": 4,
      "def": "This question finds the strike with the largest open interest in calls and in puts. These strikes are reference levels where many contracts are open, not guaranteed support or resistance.",
      "hi": "Yeh sawaal us strike ko dhoondhta hai jahan calls aur puts mein sabse zyada OI hai. Yeh strikes reference levels hain jahan bahut contracts open hain, guaranteed support ya resistance nahi.",
      "how": "Sort the chain by OI for calls and puts separately and note the top one or two strikes on each side. A large call OI above spot is a possible ceiling; a large put OI below spot is a possible floor. These levels can break, and OI at a strike can be hedged elsewhere, so treat them as areas to watch. Compare the same strike with last session's OI to see whether the level is strengthening or weakening.",
      "eg": {
        "title": "Finding the highest OI (illustrative)",
        "text": "Across five strikes, call OI peaks at 24,100 (1,30,000 lots) and put OI peaks at 23,900 (1,10,000 lots). With spot at 24,000, the market has a possible range of 23,900 to 24,100, 200 points wide. The PCR for these strikes is 3,25,000 ÷ 3,95,000 = 0.82. Price can still close outside the range."
      },
      "tip": "Highest OI is a level to watch, not a prediction that price will stop there.",
      "visual": {
        "kind": "oi",
        "title": "Strike-wise OI (illustrative, lots)",
        "caption": "Largest call OI at 24,100 and largest put OI at 23,900.",
        "rows": [
          {
            "strike": 23800,
            "ce": 30000,
            "pe": 70000
          },
          {
            "strike": 23900,
            "ce": 45000,
            "pe": 110000
          },
          {
            "strike": 24000,
            "ce": 90000,
            "pe": 85000
          },
          {
            "strike": 24100,
            "ce": 130000,
            "pe": 40000
          },
          {
            "strike": 24200,
            "ce": 100000,
            "pe": 20000
          }
        ],
        "spot": 24000
      },
      "calc": {
        "id": "pcr",
        "preset": {
          "putOI": 325000,
          "callOI": 395000
        },
        "why": "Turns the OI strip into a PCR, with its limits in mind."
      }
    },
    {
      "t": 5,
      "def": "This question looks for strikes where OI is rising. Rising OI means new contracts are being created there, which may mark a fresh area of interest.",
      "hi": "Yeh sawaal un strikes ko dekhta hai jahan OI badh raha hai. OI badhne ka matlab hai wahan naye contracts ban rahe hain, jo naye interest ka sanket ho sakta hai.",
      "how": "Rising OI is more informative than a static level because it shows what is happening now. Check the change in OI against the previous close and against the premium move. Rising put OI below spot with a stable premium may mean put writers see support there. Rising call OI right at spot may mean writers are capping the move, or hedgers are buying protection. Rising OI says contracts are being opened but not who initiated them.",
      "eg": {
        "title": "New OI at 24,000 PE (illustrative)",
        "text": "The 24,000 PE OI goes from 60,000 to 78,000 lots (+18,000 lots, +30%) while spot trades at 24,090. That is 11,70,000 units of new contracts. Rising put OI below a rising market may indicate that sellers consider 24,000 a base, but a fall through 24,000 would put those writers under pressure."
      },
      "tip": "Fresh OI near spot matters more than old OI far away.",
      "visual": {
        "kind": "bars",
        "title": "OI change by strike (illustrative, lots)",
        "caption": "Longest bar is where new contracts are being created.",
        "unit": " lots",
        "items": [
          {
            "label": "24,100 CE",
            "value": 12000,
            "tone": "neutral"
          },
          {
            "label": "24,000 PE",
            "value": 18000,
            "tone": "gold"
          },
          {
            "label": "23,900 PE (fell)",
            "value": 15000,
            "tone": "ice"
          }
        ]
      }
    },
    {
      "t": 6,
      "def": "This question looks for strikes where OI is falling. Falling OI means contracts are being closed or rolled, so a level that looked strong may be weakening.",
      "hi": "Yeh sawaal un strikes ko dekhta hai jahan OI gir raha hai. OI girne ka matlab hai contracts band ho rahe hain ya roll ho rahe hain, yaani jo level mazboot lagta tha woh kamzor ho sakta hai.",
      "how": "Falling OI at a call strike while spot rises towards it can mean writers are covering, which may help a breakout. Falling OI at a put strike while spot falls can mean put holders are booking profit. Before drawing a conclusion, check whether OI shifted to a neighbouring strike (rolling) or to the next expiry. Contracts that expire do not leave OI in a way that signals intent.",
      "eg": {
        "title": "24,100 CE writers leaving (illustrative)",
        "text": "The 24,100 CE OI drops from 1,30,000 to 1,04,000 lots, a fall of 26,000 lots or 20%, as spot rises from 24,000 to 24,090. The 16,90,000 units that closed (26,000 × 65) are most likely covering by writers, which supports a bullish read, but it can also be long unwinding if the premium is falling."
      },
      "tip": "Check the premium move before deciding whether falling OI means covering or unwinding.",
      "visual": {
        "kind": "bars",
        "title": "24,100 CE OI before and after",
        "caption": "A 20% fall in the biggest call strike.",
        "unit": " lots",
        "items": [
          {
            "label": "Before",
            "value": 130000,
            "tone": "neutral"
          },
          {
            "label": "After",
            "value": 104000,
            "tone": "gold"
          }
        ]
      }
    },
    {
      "t": 7,
      "def": "This question asks what the underlying index is doing: trend, range, speed and how far it has moved compared with a normal day.",
      "hi": "Yeh sawaal poochta hai ki underlying index kya kar raha hai: trend, range, raftaar aur ek normal din ke muqable kitna chala hai.",
      "how": "Spot is the foundation of every option price, so check it first. Measure the move against the expected move implied by India VIX: the one-day 1σ at VIX 14 is 24,000 × 0.14 × √(1/365) = about 176 points. A rise of 90 points is about half that, which is ordinary, while a move of 250 points is above one standard deviation. Also note where price is relative to the day's opening range and the previous day's high and low.",
      "eg": {
        "title": "Is 90 points a big move? (illustrative)",
        "text": "Spot goes from 24,000 to 24,090, a rise of 0.375% (90 ÷ 24,000). The one-day expected move at VIX 14 is 176 points, so the rise is about 0.51 of that. Nothing unusual yet. A bigger move, say 300 points or 1.25%, would be about 1.7 times the expected move and deserves a closer look."
      },
      "tip": "Always size a move against the expected move, not against how it feels.",
      "visual": {
        "kind": "candles",
        "title": "A steady uptrend",
        "caption": "Higher highs and higher lows, with moves that fit within the expected range.",
        "pattern": "uptrend"
      },
      "calc": {
        "id": "expected-move",
        "preset": {
          "spot": 24000,
          "vix": 14,
          "days": 1
        },
        "why": "Puts the 90-point rise in context of one day."
      }
    },
    {
      "t": 8,
      "def": "This question checks the futures price. Futures show what the market pays for the index to be delivered later, and their basis against spot gives clues about positioning and funding costs.",
      "hi": "Yeh sawaal futures price check karta hai. Futures dikhate hain ki market index ko baad mein deliver hone ke liye kitna de raha hai, aur spot ke muqable basis se positioning aur funding cost ke sanket milte hain.",
      "how": "Futures normally trade above spot by roughly the cost of carry: interest minus expected dividends. If futures lead spot higher with rising OI, it suggests fresh directional positioning, but remember that build-up rules are for futures, not for option OI. A futures premium much below its fair value can reflect weak demand or heavy short positions. Compare the premium with the fair value formula before reading anything into it.",
      "eg": {
        "title": "Futures premium against fair value (illustrative)",
        "text": "Spot 24,090, futures 24,115, so the premium is 25 points. With 20 days to expiry, r = 6.5% and dividend yield 1.3%, fair value premium is about 24,090 × 0.052 × 20/365 = 69 points. The futures are trading at roughly 44 points below that carry value, which may mean demand for long exposure is modest."
      },
      "tip": "Premium alone is not a signal. Always compare it with the carry formula.",
      "visual": {
        "kind": "bars",
        "title": "Futures premium vs fair carry (illustrative)",
        "caption": "Actual premium 25 points against about 69 points of carry.",
        "unit": " pts",
        "items": [
          {
            "label": "Actual premium",
            "value": 25,
            "tone": "gold"
          },
          {
            "label": "Fair carry",
            "value": 69,
            "tone": "neutral"
          }
        ]
      },
      "calc": {
        "id": "basis-fair-value",
        "preset": {
          "spot": 24090,
          "futures": 24115,
          "rate": 6.5,
          "days": 20,
          "dividend": 1.3
        },
        "why": "Compares the 25-point premium with its carry value."
      }
    },
    {
      "t": 9,
      "def": "India VIX is NSE's measure of the volatility the NIFTY options market expects over the next 30 days. This question asks whether it is rising, falling or flat, and how that fits with price.",
      "hi": "India VIX NSE ka woh measure hai jo batata hai ki NIFTY options market agle 30 din mein kitna volatility expect kar raha hai. Yeh sawaal poochta hai ki VIX badh raha hai, gir raha hai ya flat hai, aur price ke saath kaisa fit baithta hai.",
      "how": "VIX is derived from NIFTY option prices and shows expected movement, not direction. A rising market with a falling VIX is calm; a rising market with a rising VIX suggests buyers are paying more for options, perhaps for protection. A falling market with a sharply rising VIX usually means fear. Large VIX changes lift or lower option premiums across strikes, so they change the cost of every trade.",
      "eg": {
        "title": "VIX up 8.6% on a rising day (illustrative)",
        "text": "VIX moves from 14.0 to 15.2, a rise of 1.2 points or 8.6%. The one-day expected move grows from 176 to 191 points. The ATM 24,000 CE with 7 days left is worth about ₹197.7 at IV 14% and ₹213.6 at IV 15.2% with spot unchanged, a rise of ₹15.9 per unit, or ₹1,034 per lot."
      },
      "tip": "VIX shows how expensive options are and how much movement is expected, not which way price will go.",
      "visual": {
        "kind": "gauge",
        "title": "India VIX reading (illustrative zones)",
        "caption": "Zones are rough guides; there is no fixed threshold.",
        "min": 8,
        "max": 30,
        "value": 15.2,
        "unit": "",
        "zones": [
          {
            "from": 8,
            "to": 13,
            "label": "Calm",
            "tone": "ice"
          },
          {
            "from": 13,
            "to": 18,
            "label": "Normal",
            "tone": "neutral"
          },
          {
            "from": 18,
            "to": 30,
            "label": "Elevated",
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "expected-move",
        "preset": {
          "spot": 24000,
          "vix": 15.2,
          "days": 1
        },
        "why": "Shows how a VIX rise widens the expected one-day move."
      }
    },
    {
      "t": 10,
      "def": "Implied volatility (IV) is the volatility an individual option's price implies. This question asks whether option prices are getting more or less expensive, apart from the effect of spot and time.",
      "hi": "Implied volatility (IV) woh volatility hai jo kisi ek option ka price imply karta hai. Yeh sawaal poochta hai ki option prices mehnge ho rahe hain ya sasta, spot aur time ke asar ko alag karke.",
      "how": "IV is found by working backwards from an option's market price using a model such as Black-Scholes. Compare the IV of the strike you want with its recent range and with other strikes and expiries. Buying when IV is high means a fall in IV can hurt the position even if direction is right. Selling when IV is low gives little premium for the risk. Vega measures the sensitivity: at the money, about 13 to 14 rupees per IV point for a one-week option near 24,000.",
      "eg": {
        "title": "What a 1.2 point IV rise does (illustrative)",
        "text": "The 24,000 CE with 7 days left is worth ₹197.7 at IV 14.0% and ₹213.6 at IV 15.2%. A buyer gains ₹15.9 per unit from IV alone, ₹1,034 per lot. If IV later returns to 14%, that gain is lost even if spot is unchanged."
      },
      "tip": "Check IV before you buy. Being right on direction and wrong on IV still loses money.",
      "visual": {
        "kind": "curve",
        "title": "Option value rises with IV",
        "caption": "Vega is largest near the money and falls away at distant strikes.",
        "curve": "vega"
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
        "why": "Shows vega, the price change per IV point."
      }
    },
    {
      "t": 11,
      "def": "A genuine breakout is a move beyond a level that continues, instead of returning inside the range. This question asks for evidence that the break is real rather than a false breakout.",
      "hi": "Genuine breakout woh move hai jo kisi level ke paar jaakar chalta rehta hai, wapas range ke andar nahi aata. Yeh sawaal evidence maangta hai ki break asli hai, false breakout nahi.",
      "how": "Look for several confirmations together: a candle close beyond the level rather than just a wick, volume above the recent average, futures moving with spot, falling OI in the call strike that was the ceiling, and a VIX that is not spiking. Absence of confirmation does not prove a trap, but it makes the trade lower quality. A false breakout often reverses quickly and traps late buyers.",
      "eg": {
        "title": "Testing the 24,100 break (illustrative)",
        "text": "Spot closes a 15-minute candle at 24,115, above the 24,100 call OI strike. The 24,100 CE OI is falling and futures are at 24,115. The 24,100 CE costs about ₹206.5 with delta 0.54. If price falls back below 24,060, the breakout has failed. That is 55 points of underlying risk, about 29.7 points of premium, or ₹1,931 per lot."
      },
      "tip": "One strong candle is not a breakout. Wait for a close and a hold.",
      "visual": {
        "kind": "candles",
        "title": "Breakout versus false breakout",
        "caption": "A hold above the level supports the breakout; a fall back inside the range does not.",
        "pattern": "falseBreakout",
        "level": {
          "price": 24100,
          "label": "24,100"
        }
      }
    },
    {
      "t": 12,
      "def": "Invalidation is the specific level or event that tells you the analysis was wrong. This question forces you to write it before you enter, so the exit is a rule rather than a feeling.",
      "hi": "Invalidation woh khaas level ya event hai jo batata hai ki aapka analysis galat tha. Yeh sawaal aapko entry se pehle hi likhne par majboor karta hai, taaki exit ek rule ho, mood nahi.",
      "how": "State the invalidation in terms of the underlying (for example, a close below 24,040), not only the option premium, and add a time limit if the idea needs movement soon. Then size the trade so that hitting the invalidation costs no more than your planned risk per trade. Gaps and fast moves can fill worse than planned, so the real loss can exceed the plan. If you cannot name an invalidation, you do not yet have a trade.",
      "eg": {
        "title": "Sizing against invalidation (illustrative)",
        "text": "Capital ₹3,00,000 and risk per trade 1% gives a budget of ₹3,000. A CE bought at 120 with a stop at 90 risks 30 × 65 = ₹1,950 per lot, so floor(3,000 ÷ 1,950) = 1 lot. If the premium gaps to 70 instead, the loss is 50 × 65 = ₹3,250, above the plan."
      },
      "tip": "A stop is a plan, not a guarantee. Size for the plan, and accept that gaps can exceed it.",
      "visual": {
        "kind": "flow",
        "title": "From setup to invalidation",
        "caption": "Define the exit before the entry.",
        "steps": [
          {
            "label": "Idea",
            "note": "Bullish above 24,100",
            "tone": "gold"
          },
          {
            "label": "Entry",
            "note": "After a held close",
            "tone": "ice"
          },
          {
            "label": "Invalidation",
            "note": "Close below 24,040",
            "tone": "neutral"
          },
          {
            "label": "Size",
            "note": "Loss within 1% of capital",
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "position-size",
        "preset": {
          "capital": 300000,
          "riskPct": 1,
          "entry": 120,
          "stop": 90,
          "lotSize": 65
        },
        "why": "Finds the lots that keep the stop within the risk budget."
      }
    }
  ]
}
export default m
