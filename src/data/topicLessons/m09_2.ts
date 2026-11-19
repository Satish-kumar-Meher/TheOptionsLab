import type { ModuleLesson } from '../topicLessonTypes'

/* Module 9.2 — India VIX. All numbers illustrative: NIFTY ≈ 24,000, lot 65 (check the current NSE contract specification). Option values are Black-Scholes (r 6.5%, no dividend), real premiums differ. Computed by script, not typed by hand. */
const m: ModuleLesson = {
  "moduleId": "9.2",
  "intro": "India VIX is NSE's index of how much volatility the Nifty options market expects over the next 30 calendar days. It is built from live Nifty option prices, quoted as an annualised percentage, and it says how big a move is expected, never which way. This module explains what the number means, how NSE builds it, how to turn it into an expected range, and how to read it during the day. All option numbers are illustrative Black-Scholes values (Nifty 24,000, rate 6.5%, lot 65, check the current NSE contract specification).",
  "introHi": "India VIX NSE ka index hai jo batata hai ki Nifty options market agle 30 calendar days mein kitna volatility expect kar raha hai. Yeh live Nifty option prices se banta hai, annualised percentage mein quote hota hai, aur sirf move ka size batata hai, direction nahi. Is module mein dekhenge ki number ka matlab kya hai, NSE ise kaise banata hai, ise expected range mein kaise badlein, aur din bhar ise kaise padhein. Saare option numbers illustrative Black-Scholes values hain (Nifty 24,000, rate 6.5%, lot 65, current NSE contract specification check karein).",
  "steps": {
    "concept": "India VIX is a number such as 14 that means \"the options market expects Nifty to move at an annualised pace of about 14%\". It is computed by NSE from the Nifty option order book, not from the index price itself. A higher number means traders are paying more for options because they expect bigger swings. It measures expected size of movement, not direction.",
    "conceptHi": "India VIX ek number hota hai, jaise 14, jiska matlab hai ki options market ko lagta hai Nifty saal bhar ke pace se lagbhag 14% hilega. Ise NSE Nifty option order book se calculate karta hai, index price se nahi. Number zyada hai toh traders options ke liye zyada daam de rahe hain kyunki unhe bade swings ki ummeed hai. Yeh expected movement ka size hai, direction nahi.",
    "mechanism": "NSE takes best bid and ask quotes of out-of-the-money Nifty calls and puts for the near and next expiry, uses the mid-price of each, and combines them with a model-free formula (similar in spirit to the CBOE VIX) into an expected variance for each expiry. The two figures are blended by time so the result always refers to a constant 30 calendar days, and the result is multiplied by 100. NSE's white paper uses MIBOR as the risk-free rate and the Nifty futures price as the forward level. Check NSE's current India VIX methodology document for any later changes.",
    "example": {
      "title": "Turning VIX 14 into a Nifty range (illustrative)",
      "text": "With Nifty at 24,000 and VIX 14, the one-standard-deviation move over 30 calendar days is 24,000 × 0.14 × √(30/365) = about 963 points, so roughly 23,037 to 24,963. Over one calendar day it is about 176 points. These are model-based ranges: real moves have fatter tails, and the market stays inside a 1σ band only about two times out of three in theory."
    },
    "chart": {
      "kind": "gauge",
      "title": "India VIX at 14 (illustrative zones)",
      "caption": "The zone labels are common rules of thumb, not NSE definitions. Compare today with recent history before calling a level high or low.",
      "min": 8,
      "max": 40,
      "value": 14,
      "zones": [
        {
          "from": 8,
          "to": 12,
          "label": "Low",
          "tone": "ice"
        },
        {
          "from": 12,
          "to": 18,
          "label": "Normal",
          "tone": "neutral"
        },
        {
          "from": 18,
          "to": 25,
          "label": "Elevated",
          "tone": "gold"
        },
        {
          "from": 25,
          "to": 40,
          "label": "Stress",
          "tone": "bear"
        }
      ]
    },
    "optionChain": "India VIX is not a column on the option chain, but it summarises the IV column. If most strikes near the money show IV around 14 to 15 and VIX reads about 14, the two are telling the same story. Compare the ATM IV of the nearest weekly with VIX: weekly strikes can sit above or below VIX because VIX is a blend of near and next month, not a single expiry. Use VIX for the broad mood and the chain for the specific strike you plan to trade.",
    "psychology": "Beginners treat VIX as a direction signal (\"VIX is falling, so buy\"). It is a price of insurance, set by buyers and sellers of options. When it is low, people feel relaxed and sell cheap protection or buy cheap options without thought; when it spikes, fear makes people pay anything for puts. Both feelings can be wrong at the extremes, so decide with numbers, not with the mood.",
    "scenarios": {
      "bullish": "A calm, steady rally usually comes with VIX flat or drifting lower: the market expects only a modest daily swing. A sharp breakout rally can lift VIX at the same time, so VIX alone cannot tell you the market will fall.",
      "bearish": "Falls are usually faster than rises, and people rush to buy protection, so VIX often rises when Nifty falls. On 4 June 2024 it was reported to rise about 27.7% to 26.74 as Nifty fell about 6%. That pattern is common, not a law.",
      "sideways": "In a tight, quiet range VIX tends to drift down as expected movement shrinks and option premiums bleed. A very low VIX can stay low for weeks and is no timing signal for a spike."
    },
    "practice": [
      {
        "q": "Nifty is at 24,000 and VIX is 14. Find the 1σ one-day (calendar) and 7-day move.",
        "a": "1 day: 24,000 × 0.14 × √(1/365) = 175.87 points. 7 days: 24,000 × 0.14 × √(7/365) = 465.31 points."
      },
      {
        "q": "VIX goes from 14 to 21 with Nifty at 24,000. By how much does the 30-day 1σ move grow?",
        "a": "At 14: 963.28. At 21: 1,444.92. The expected move grows by 481.64 points, which is 50%, because the move is proportional to VIX."
      },
      {
        "q": "A strike's best bid is 98.5 and best ask 99.5. What is the mid-price and the spread as a percentage of the mid?",
        "a": "Mid = (98.5 + 99.5) / 2 = 99.00. Spread = 1.0 / 99.00 = 1.01%. NSE's white paper treats a spread above 30% of the mid as unreliable, so this quote is usable."
      },
      {
        "q": "The reported VIX on 4 June 2024 was 26.74 after a 27.70% rise. What was the previous close, roughly?",
        "a": "26.74 / 1.277 = 20.94. The reported rise is from about 20.94 to 26.74."
      }
    ],
    "assignment": "Open NSE's India VIX page and note today's value and the previous close. Using the expected-move calculator, work out the 1-day, 7-day and 30-day 1σ ranges for today's Nifty level, then check the next day's actual high and low against the 1-day range. Write two lines on whether the range was a good guide."
  },
  "topics": [
    {
      "t": 1,
      "def": "India VIX is an index published by NSE that shows the volatility the Nifty options market expects over the next 30 calendar days, expressed as an annualised percentage. It is built from option prices, so it is a forward-looking number, unlike historical volatility which looks at past moves.",
      "hi": "India VIX NSE ka index hai jo batata hai ki Nifty options market agle 30 calendar days ke liye kitna volatility expect kar raha hai, annualised percentage mein. Yeh option prices se banta hai, isliye forward-looking hai, jabki historical volatility purane moves dekhti hai.",
      "how": "NSE computes India VIX from the best bid-ask quotes of Nifty options and publishes it through the trading day. A reading of 14 means options are priced as if Nifty will move at an annualised pace of 14%. To get a move over a shorter period you scale by the square root of time. VIX is not tradable by itself on NSE spot, it is a reference index, and it gives no direction. Different sources may also call it the \"fear gauge\", which is covered in the next topic.",
      "eg": {
        "title": "What VIX 14 implies for the next month (illustrative)",
        "text": "Nifty at 24,000, VIX 14: the 30-day 1σ move is 24,000 × 0.14 × √(30/365) = 963.28 points, i.e. a band of about 23,037 to 24,963. A market inside this band does not prove VIX \"was right\"; it is one probability statement under a normal-distribution assumption."
      },
      "tip": "VIX tells you how far, not which way. Never read a falling or rising VIX as a buy or sell signal on its own.",
      "visual": {
        "kind": "flow",
        "title": "From option prices to one number",
        "steps": [
          {
            "label": "Nifty option quotes",
            "note": "Best bid and ask, OTM strikes",
            "tone": "ice"
          },
          {
            "label": "Mid-prices",
            "note": "Near and next expiry",
            "tone": "ice"
          },
          {
            "label": "Expected variance",
            "note": "Model-free formula",
            "tone": "gold"
          },
          {
            "label": "30-day blend x 100",
            "note": "India VIX, annualised %",
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "expected-move",
        "preset": {
          "spot": 24000,
          "vix": 14,
          "days": 30
        },
        "why": "Turn a VIX reading into a 1σ range for 30 days."
      }
    },
    {
      "t": 2,
      "def": "India VIX is called the fear gauge because it usually rises when markets fall sharply and people rush to buy protective puts, and it eases when the market is calm. It measures the price people pay for insurance, so it reflects fear and uncertainty.",
      "hi": "India VIX ko fear gauge isliye kehte hain kyunki market tezi se girta hai toh log protective puts khareedne daudte hain aur VIX badh jaata hai; market shaant ho toh VIX neeche aata hai. Yeh insurance ka daam hai, isliye yeh dar aur uncertainty dikhata hai.",
      "how": "When institutions and traders fear a fall, they buy index puts to hedge. Heavy demand lifts put prices and the implied volatility behind them, and because VIX is built from option prices, it rises. Selling pressure in the cash market tends to arrive together with this demand. The link is a tendency, not a rule: VIX can rise before an event even when the index is flat, and it can fall during a slow grind lower. It measures uncertainty, and the market can be uncertain on the way up too.",
      "eg": {
        "title": "Election result day, 4 June 2024",
        "text": "Reported figures: India VIX rose about 27.70% to 26.74 and Nifty closed about 1,379 points lower at 21,884 (from about 23,263), a fall of about 5.93%. At 26.74 the 1-day 1σ move was about 336 points versus 263 at the previous close of about 20.94. Event days differ, so do not copy the pattern."
      },
      "tip": "Fear gauge does not mean crash predictor. It tells you how much fear is already priced, not what happens next.",
      "visual": {
        "kind": "compare",
        "title": "What a fear spike usually looks like",
        "left": {
          "head": "Calm market",
          "tone": "ice",
          "points": [
            "Few put hedges bought",
            "Option premiums thin",
            "VIX drifts lower"
          ]
        },
        "right": {
          "head": "Fearful market",
          "tone": "bear",
          "points": [
            "Heavy demand for puts",
            "Premiums and IV expand",
            "VIX rises, often with a falling index"
          ]
        }
      },
      "calc": {
        "id": "return-calc",
        "preset": {
          "start": 23263,
          "end": 21884,
          "years": 0.0027
        },
        "why": "Compute the day's Nifty percentage fall from the reported figures."
      }
    },
    {
      "t": 3,
      "def": "India VIX is calculated by NSE from the order-book prices of Nifty options. It uses the mid-point of the best bid and ask of out-of-the-money calls and puts, blends the near and next expiry to a constant 30 days, and scales the result to a percentage.",
      "hi": "India VIX NSE Nifty options ke order book prices se calculate karta hai. Woh out-of-the-money calls aur puts ke best bid aur ask ka mid-point leta hai, near aur next expiry ko milakar constant 30 days banata hai, aur result ko percentage mein badalta hai.",
      "how": "For each expiry NSE builds an expected variance from a weighted strip of out-of-the-money options: calls above the at-the-money strike, puts below it. A quote with a bid-ask spread above 30% of its mid-price is treated as unreliable and replaced by a spline estimate. The near and next expiry variances are then interpolated to a 30-day horizon, and the square root times 100 gives VIX. Because it uses live quotes, VIX can move even without trades.",
      "eg": {
        "title": "Blending two expiries to 30 days (simplified, illustrative)",
        "text": "Suppose the near expiry has 20 days left with implied vol 13% and the next expiry 48 days with 15%. Using the CBOE-style weighted blend, the 30-day figure comes to 14.18%. The near month gets weight 42.86% and the next month 57.14% of total variance (days-adjusted). NSE's exact steps are in its white paper; this is a simplified teaching version."
      },
      "tip": "VIX is a blend of two expiries. A single weekly strike's IV will rarely match it exactly.",
      "visual": {
        "kind": "flow",
        "title": "India VIX build steps",
        "steps": [
          {
            "label": "OTM calls and puts",
            "note": "Strikes around the ATM strike",
            "tone": "ice"
          },
          {
            "label": "Bid-ask mid-price",
            "note": "Drop quotes with spread above 30% of mid",
            "tone": "neutral"
          },
          {
            "label": "Variance per expiry",
            "note": "Near and next",
            "tone": "gold"
          },
          {
            "label": "Interpolate to 30 days",
            "note": "Square root, multiply by 100",
            "tone": "gold"
          }
        ]
      }
    },
    {
      "t": 4,
      "def": "NSE's India VIX methodology is the written rule set NSE uses to build the index: which options to use, how to price them, which interest rate and forward level to apply, and when to roll from one expiry pair to the next.",
      "hi": "NSE ki India VIX methodology woh likhit rules hain jinse index banta hai: kaun se options use honge, unka price kaise lenge, kaun sa interest rate aur forward level lagega, aur ek expiry pair se doosre par kab roll hoga.",
      "how": "As described in NSE's India VIX white paper: only Nifty options are used; out-of-the-money strikes around K0 (the strike just below the forward level) form the strip; the forward level comes from the latest Nifty futures price; the risk-free rate is the NSE MIBOR rate for the matching tenure; and the near month is generally used until about three trading days before expiry, after which the index moves to the next and far months. If a value cannot be computed, the previous tick or previous day's value is carried forward. Check the current methodology on NSE's website, since it can be revised.",
      "eg": {
        "title": "Choosing K0 (illustrative)",
        "text": "Nifty futures trade at 24,070 with a strike step of 50. K0 is the strike just below the forward: 24,050. Puts at 24,000, 23,950 and lower strikes form the put side, calls at 24,100, 24,150 and higher strikes form the call side, and at 24,050 the average of call and put mid-prices is used. Strike availability and steps vary, so always inspect the actual strike list."
      },
      "tip": "Methodology details matter when VIX behaves oddly, for example near expiry roll. When in doubt, read the NSE document, not a blog summary.",
      "visual": {
        "kind": "layers",
        "title": "Option strip used around K0",
        "layers": [
          {
            "label": "Calls above K0",
            "note": "OTM calls, bid-ask mid",
            "tone": "bull"
          },
          {
            "label": "K0: strike just below forward",
            "note": "Average of call and put mid",
            "tone": "gold"
          },
          {
            "label": "Puts below K0",
            "note": "OTM puts, bid-ask mid",
            "tone": "bear"
          }
        ]
      }
    },
    {
      "t": 5,
      "def": "India VIX and Nifty tend to move in opposite directions: Nifty falls often come with a rising VIX and calm rallies come with a flat or falling VIX. This inverse relationship is a tendency, not a rule.",
      "hi": "India VIX aur Nifty aksar ulti direction mein chalte hain: Nifty girta hai toh VIX badhta hai, aur shaant rally mein VIX flat ya neeche rehta hai. Yeh ek tendency hai, rule nahi.",
      "how": "Falls bring hedging demand and fear, so IV rises; rallies bring complacency, so IV eases. But the link breaks regularly. VIX can rise ahead of an event while Nifty is flat, and VIX can rise on a sharp rally if the market fears the move will reverse. The relationship is also not one-to-one: a 1% Nifty move does not mean a fixed VIX change. Use the relationship to ask whether the volatility move agrees with the price move, not to predict either.",
      "eg": {
        "title": "Four combinations (illustrative)",
        "text": "Nifty down and VIX up (for example 4 June 2024: about 5.93% fall, VIX up about 27.7%) is the classic fear day. Nifty up and VIX down is a calm rally. Nifty up and VIX up is a nervous rally. Nifty down and VIX down is a slow, orderly fall. Each tells a different story about risk appetite."
      },
      "tip": "When Nifty and VIX move in the same direction, pause and ask what the options market sees that the price does not.",
      "visual": {
        "kind": "matrix",
        "title": "Nifty and VIX together",
        "xLabels": [
          "VIX rises",
          "VIX falls"
        ],
        "yLabels": [
          "Nifty up",
          "Nifty down"
        ],
        "cells": [
          {
            "head": "Nervous rally",
            "note": "Up-move with fear of reversal",
            "tone": "gold"
          },
          {
            "head": "Calm rally",
            "note": "Typical trending up-move",
            "tone": "bull"
          },
          {
            "head": "Fear fall",
            "note": "Hedging demand, panic",
            "tone": "bear"
          },
          {
            "head": "Orderly fall",
            "note": "Weakness without panic",
            "tone": "neutral"
          }
        ]
      }
    },
    {
      "t": 6,
      "def": "A VIX reading has meaning only against its own history and against what you plan to trade. Many traders treat a reading below about 12 as low, 12 to 18 as normal, 18 to 25 as elevated and above 25 as stress, but these bands are rules of thumb, not NSE definitions.",
      "hi": "VIX ka koi bhi reading apni history aur aapke trade ke hisaab se hi matlab rakhta hai. Kai traders 12 se neeche ko low, 12 se 18 ko normal, 18 se 25 ko elevated aur 25 se upar ko stress maante hain, par yeh rules of thumb hain, NSE ki definition nahi.",
      "how": "The same VIX level means different things in different years: what felt high in a calm stretch may be average in a stressed one. A useful habit is to compare today's value with its last six to twelve months, and with the percentile of that range. A low VIX makes buying options cheaper and selling them thinner; a high VIX does the reverse. The level also tells you how wide a stop or how big a position is reasonable, since daily moves scale with it.",
      "eg": {
        "title": "One-day 1σ move at three VIX levels (illustrative)",
        "text": "Nifty 24,000: at VIX 11 the 1σ one-day move is about 138 points, at 16 about 201 points, and at 24 about 301 points. A 100-point stop is wider than the typical daily move at VIX 11 but a fraction of it at VIX 24."
      },
      "tip": "Set stops and position sizes by the day's expected move (VIX-scaled), not by a fixed number of points.",
      "visual": {
        "kind": "gauge",
        "title": "Reading VIX levels (rule-of-thumb zones)",
        "min": 8,
        "max": 40,
        "value": 16,
        "zones": [
          {
            "from": 8,
            "to": 12,
            "label": "Low",
            "tone": "ice"
          },
          {
            "from": 12,
            "to": 18,
            "label": "Normal",
            "tone": "neutral"
          },
          {
            "from": 18,
            "to": 25,
            "label": "Elevated",
            "tone": "gold"
          },
          {
            "from": 25,
            "to": 40,
            "label": "Stress",
            "tone": "bear"
          }
        ]
      },
      "calc": {
        "id": "expected-move",
        "preset": {
          "spot": 24000,
          "vix": 16,
          "days": 1
        },
        "why": "Check the one-day expected move at different VIX values."
      }
    },
    {
      "t": 7,
      "def": "India VIX is quoted as an annualised figure: the volatility if the current pace lasted a full year. To get the expected move for a shorter period you multiply by the square root of the fraction of the year.",
      "hi": "India VIX annualised figure mein quote hota hai: agar yahi pace poora saal chale toh volatility kitni hogi. Chhote period ka expected move nikalne ke liye aap year ke fraction ke square root se multiply karte hain.",
      "how": "Volatility scales with the square root of time, not linearly, because independent daily moves partly cancel. If annual volatility is 14%, one calendar day is 14% × √(1/365), one week is 14% × √(7/365) and one month 14% × √(30/365). The Greeks calculator and the expected-move tool use calendar days; some traders use 252 trading days instead, which gives a slightly different one-day figure. State your convention and keep it consistent.",
      "eg": {
        "title": "Scaling VIX 14 (illustrative)",
        "text": "Nifty 24,000: 1 day = 175.87 points (0.73%), 7 days = 465.31 points (1.94%), 30 days = 963.28 points (4.01%), 365 days = 3,360.00 points (14%). The one-month move is not 30 times the one-day move; it is √30 = 5.48 times."
      },
      "tip": "Never multiply the daily figure by 30 to get a monthly one. Use the square root of time.",
      "visual": {
        "kind": "bars",
        "title": "1σ move at VIX 14 for different horizons (points)",
        "unit": " pts",
        "items": [
          {
            "label": "1 day",
            "value": 175.87,
            "tone": "ice"
          },
          {
            "label": "7 days",
            "value": 465.31,
            "tone": "ice"
          },
          {
            "label": "30 days",
            "value": 963.28,
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "expected-move",
        "preset": {
          "spot": 24000,
          "vix": 14,
          "days": 7
        },
        "why": "Change days and watch the range scale with the square root of time."
      }
    },
    {
      "t": 8,
      "def": "The expected range is the band around the current Nifty level that VIX implies for a chosen period, usually one standard deviation. It is a probability statement, not a forecast of the high or low.",
      "hi": "Expected range woh band hai jo VIX se current Nifty level ke around ek chosen period ke liye banta hai, aam taur par ek standard deviation. Yeh probability ki baat hai, high ya low ki forecast nahi.",
      "how": "Under a normal-distribution assumption, about 68% of outcomes fall within 1σ and about 95% within 2σ. Real index returns have fatter tails, so large moves happen more often than the bell curve suggests, and the range is centred on the current price, not on a view. Traders use it to judge whether a strike is far or near, whether a target is realistic in the time left, and whether an option's premium is in line with the range. VIX is a 30-day measure; for a weekly period it is only an approximation.",
      "eg": {
        "title": "Is a 24,500 call realistic in 7 days? (illustrative)",
        "text": "At VIX 14 the 7-day 1σ move is 465.31 points, so the 1σ band is 23,535 to 24,465. A level of 24,500 is 500 points away, about 1.07 times the 1σ move, so a close beyond it in a week would be an unusually large move under this model."
      },
      "tip": "Compare your target distance with the expected move first. If it needs a 2σ move, the odds are low.",
      "visual": {
        "kind": "curve",
        "title": "Normal curve: 1σ and 2σ bands",
        "caption": "Real markets have fatter tails than this curve.",
        "curve": "normal"
      },
      "calc": {
        "id": "expected-move",
        "preset": {
          "spot": 24000,
          "vix": 14,
          "days": 7
        },
        "why": "Compute the 7-day band and compare it with your target."
      }
    },
    {
      "t": 9,
      "def": "VIX historical data is the record of past India VIX values, available from NSE, and it lets you see how high and low VIX has gone and where today's reading sits in that history.",
      "hi": "VIX historical data India VIX ke purane values ka record hai, jo NSE par milta hai, aur isse dikhta hai ki VIX kitna upar aur neeche gaya hai aur aaj ka reading us history mein kahan hai.",
      "how": "NSE publishes daily open, high, low and close for India VIX. Reported landmark readings include about 86.6 touched on 24 March 2020 during the COVID crash (above the 2008 peak, according to press reports) and 26.74 on 4 June 2024. Use the data to find percentile and range for the last six to twelve months, and to see how long spikes usually last. Past levels give context, not a guaranteed cap or floor.",
      "eg": {
        "title": "Where does today sit? (illustrative 10-day series)",
        "text": "Closes: 13.1, 13.6, 14, 14.4, 13.8, 15.2, 16.9, 15.7, 14.9, 14.1. Mean = 14.57. Today's value 14.1 is above 4 of the other 9 days, i.e. in about the 44th percentile of this short window. Use at least six months of real data in practice."
      },
      "tip": "A VIX of 16 can be high in one regime and low in another. Always judge it against its recent range.",
      "visual": {
        "kind": "bars",
        "title": "Illustrative 10-day VIX closes",
        "unit": "",
        "items": [
          {
            "label": "Day 1",
            "value": 13.1,
            "tone": "ice"
          },
          {
            "label": "Day 2",
            "value": 13.6,
            "tone": "ice"
          },
          {
            "label": "Day 3",
            "value": 14,
            "tone": "ice"
          },
          {
            "label": "Day 4",
            "value": 14.4,
            "tone": "ice"
          },
          {
            "label": "Day 5",
            "value": 13.8,
            "tone": "ice"
          },
          {
            "label": "Day 6",
            "value": 15.2,
            "tone": "ice"
          },
          {
            "label": "Day 7",
            "value": 16.9,
            "tone": "ice"
          },
          {
            "label": "Day 8",
            "value": 15.7,
            "tone": "ice"
          },
          {
            "label": "Day 9",
            "value": 14.9,
            "tone": "ice"
          },
          {
            "label": "Day 10",
            "value": 14.1,
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "return-calc",
        "preset": {
          "start": 20.94,
          "end": 26.74,
          "years": 1
        },
        "why": "Percentage change from 20.94 to 26.74 reproduces the reported jump."
      }
    },
    {
      "t": 10,
      "def": "India VIX updates through the trading day as option quotes change, so it can drift or jump within a session. Intraday VIX movement shows how the options market's view of risk changes hour by hour.",
      "hi": "India VIX din bhar option quotes badalne ke saath update hota rehta hai, isliye ek session ke andar bhi drift ya jump kar sakta hai. Intraday VIX movement se dikhta hai ki options market ka risk ka view ghante dar ghante kaise badal raha hai.",
      "how": "VIX often eases through a quiet session as time passes without news, and spikes quickly on a surprise headline or a sharp fall. A move of a few tenths of a point is routine noise; a move of several points in a session is a regime signal. Because strike IV does not move exactly with VIX, a VIX change translates to premium change only approximately. A weekly option near expiry can behave quite differently from the 30-day VIX.",
      "eg": {
        "title": "A quiet-to-nervous day (illustrative)",
        "text": "VIX opens 14.20, drifts to 13.80 by 11:00, rises to 14.90 by 2:00 pm and closes 14.50. From 13.80 to 14.90 is +1.10 points. For a 7-day ATM call with vega 13.22 per IV point, a similar IV rise would add about 14.55 per unit (₹945 per lot of 65), assuming strike IV follows VIX, which it may not."
      },
      "tip": "Look at VIX change from the previous close, not only the level. A one-point rise in an hour is a message; a 0.1 wiggle is noise.",
      "visual": {
        "kind": "timeline",
        "title": "Illustrative intraday VIX path",
        "events": [
          {
            "when": "9:15",
            "what": "Open 14.20",
            "tone": "ice"
          },
          {
            "when": "11:00",
            "what": "13.80, quiet drift lower",
            "tone": "ice"
          },
          {
            "when": "14:00",
            "what": "14.90, nervous bid for options",
            "tone": "gold"
          },
          {
            "when": "15:30",
            "what": "Close 14.50",
            "tone": "neutral"
          }
        ]
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
        "why": "See vega: how much a 1-point IV change moves a 7-day ATM option."
      }
    }
  ],
  "tools": [
    {
      "id": "expected-move",
      "preset": {
        "spot": 24000,
        "vix": 14,
        "days": 7
      },
      "why": "Convert any VIX reading into a 1σ range."
    }
  ]
}
export default m
