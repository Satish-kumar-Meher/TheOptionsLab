import type { ModuleLesson } from '../topicLessonTypes'

/* Module 6.1. Generated from Black-Scholes model values (src/lib/bs.ts); NIFTY 24,000 unless stated, r 6.5%, no dividend, lot 65 (check the current NSE contract specification). Illustrative model values, not live premiums. */
const m: ModuleLesson = {
  "moduleId": "6.1",
  "intro": "Greeks are the numbers that explain why an option's premium changes. The premium does not move only because the index moves: time passing, a change in implied volatility and even the interest rate all push it. Each Greek isolates one of those pushes, so you can see what you are really exposed to. Examples use NIFTY 24,000, 7 days to expiry, IV 14%, rate 6.5%, lot 65 (check the current NSE contract specification) and Black-Scholes model values, which are illustrative and differ from live premiums.",
  "introHi": "Greeks woh numbers hain jo batate hain ki option ka premium kyun badalta hai. Premium sirf index ke hilne se nahi badalta: time ka guzarna, implied volatility ka badalna aur interest rate bhi usse dhakkelte hain. Har Greek ek dhakke ko alag karke dikhata hai, taaki aap samjho ki aap actually kis cheez ke exposure mein ho. Examples NIFTY 24,000, expiry mein 7 din, IV 14%, rate 6.5%, lot 65 (current NSE contract specification check karein) aur Black-Scholes model values par hain, jo illustrative hain aur live premium se alag hote hain.",
  "steps": {
    "concept": "Option Greeks are sensitivities: each one says how much the option's premium is expected to change for a small change in one input, with the others held equal. Delta covers the index level, gamma covers how delta itself changes, theta covers one day passing, vega covers one point of implied volatility and rho covers the interest rate. Together they turn a single premium into a map of risks. Greeks are model outputs, estimated from spot, strike, time, rate and IV; they are not facts published by NSE.",
    "conceptHi": "Option Greeks sensitivities hain: har ek batata hai ki ek input mein chhota badlav hone par premium kitna badalne ki ummeed hai, baaki sab same rehne par. Delta index level ke liye, gamma delta ke khud badalne ke liye, theta ek din guzarne ke liye, vega IV ke ek point ke liye aur rho interest rate ke liye hota hai. Milkar yeh ek premium ko risks ka map bana dete hain. Greeks model ke outputs hain, spot, strike, time, rate aur IV se nikle hue; NSE inhe fact ki tarah publish nahi karta.",
    "mechanism": "A pricing model such as Black-Scholes takes five inputs (spot, strike, time to expiry, interest rate, volatility) and gives a premium. The Greeks are the slopes of that premium with respect to each input. Brokers and data vendors recompute them continuously, so the numbers change every tick. They are local estimates: they work for small changes and drift for large ones, which is why the second-order effect of gamma matters. The premium you see on NSE is set by buyers and sellers, so the model value and the traded price can differ; the Greeks tell you the sensitivities around whatever price and IV you use.",
    "example": {
      "title": "One premium, four pushes (model, illustrative)",
      "text": "The 24,000 CE with NIFTY at 24,000, 7 days, IV 14% is worth about ₹200.85 per unit. Its Greeks: delta 0.5295, gamma 0.000855, theta -15.45 per day, vega 13.22 per IV point, rho 2.40 per rate point. Now let NIFTY rise 100 points, one day pass and IV fall 1 point. Delta adds +52.95, gamma +4.28, theta -15.45 and vega -13.22, a total estimate of +28.55. The full model reprice gives +29.59 (premium ₹230.44). One lot of 65 gains about ₹1,924. The index gain was partly eaten by time and falling volatility."
    },
    "chart": {
      "kind": "bars",
      "title": "Where the premium change came from (₹ per unit, illustrative)",
      "caption": "Spot +100, one day passes, IV -1 point, 24,000 CE. Green adds to the premium, red takes away.",
      "items": [
        {
          "label": "Delta",
          "value": 52.95,
          "tone": "bull"
        },
        {
          "label": "Gamma",
          "value": 4.28,
          "tone": "bull"
        },
        {
          "label": "Theta (cost)",
          "value": 15.45,
          "tone": "bear"
        },
        {
          "label": "Vega (cost)",
          "value": 13.22,
          "tone": "bear"
        },
        {
          "label": "Total (full reprice)",
          "value": 29.59,
          "tone": "gold"
        }
      ]
    },
    "optionChain": "Broker option chains often add Delta, Gamma, Theta, Vega and IV columns next to each strike. NSE's own chain shows premiums, OI, volume and IV, so check whether the Greeks you see are computed by your platform and with which model and IV. Scan across strikes: delta falls from the in-the-money side to the out-of-the-money side, gamma and vega peak near the at-the-money strike, and theta is largest in rupees near the money. Greeks do not appear in OI data; OI says how many contracts are open, not how sensitive they are.",
    "psychology": "Beginners buy options looking only at the index chart and the premium. When the index moves their way and the option still loses money, they blame luck or the broker. The Greeks explain it: time and volatility moved the other way. Sellers fall into the opposite trap and watch only theta income, forgetting that gamma and vega can reverse it quickly. A trader who checks the Greeks before entry knows which risk they are paid to take.",
    "scenarios": {
      "bullish": "A long call gains from delta if the index rises and loses to theta each day it takes. With NIFTY +100 over several days, delta and gamma work for the buyer, while falling IV (vega) and time decay work against. A short put profits from the same rally through delta and theta, but carries gamma and vega risk if the rally reverses.",
      "bearish": "A long put gains from negative delta as the index falls, and often gains vega too because IV tends to rise in sharp falls (a tendency, not a rule). A short call gains from the fall and from theta, but its loss is open-ended if the index rises instead.",
      "sideways": "In a quiet market delta contributes little, so theta and vega dominate. A long option loses about ₹15.45 per unit per day (₹1,004 per lot) for this ATM call, shown by theta. A short option collects that decay, but a sudden breakout turns gamma and vega against the seller."
    },
    "practice": [
      {
        "q": "The 24,000 CE has delta 0.5295. Estimate the premium change for a 20-point rise and the gain for one lot of 65.",
        "a": "Change = 0.5295 x 20 = ₹10.59 per unit. One lot: 10.59 x 65 = ₹688. Gamma would add a little more, theta would subtract."
      },
      {
        "q": "Theta of the 24,000 CE is -15.45 per day. If nothing else changes, what is the expected premium change over 2 days, per unit and per lot?",
        "a": "2 x -15.45 = -30.90 per unit, so about ₹2,009 lost per lot over 2 days. Theta is not constant: it usually grows as expiry nears, so this is a rough first-order figure."
      },
      {
        "q": "Vega is 13.22. If IV rises from 14% to 16% with everything else unchanged, estimate the premium change and the effect on one lot.",
        "a": "2 points x 13.22 = 26.45 per unit. One lot: 26.45 x 65 = ₹1,719. Check: the full reprice at IV 16% is ₹26.45 higher."
      },
      {
        "q": "Which Greek tells you how much your option's delta changes when the index moves 1 point, and what is its value for the 24,000 CE here?",
        "a": "Gamma. Its value is 0.000855, so delta rises by about 0.000855 per index point, or about 0.086 for a 100-point move (from 0.5295 to roughly 0.615)."
      }
    ],
    "assignment": "Open the Greeks calculator with NIFTY 24,000, strike 24,000, 7 days, IV 14%, rate 6.5%. Write down price, delta, gamma, theta, vega and rho for the call and the put. Then change one input at a time (spot +50, days 6, IV 15) and record the new price each time. Check that the sum of the three one-factor changes is close to the combined change, and write two sentences on which factor mattered most."
  },
  "topics": [
    {
      "t": 1,
      "def": "Option Greeks are numbers that measure how sensitive an option's premium is to one factor at a time: the index level (delta), the change in delta (gamma), time (theta), implied volatility (vega) and the interest rate (rho). They are named after Greek letters. They are calculated from a pricing model and describe the position at this moment.",
      "hi": "Option Greeks woh numbers hain jo napte hain ki option ka premium ek-ek factor par kitna sensitive hai: index level (delta), delta ka badlav (gamma), time (theta), implied volatility (vega) aur interest rate (rho). Inke naam Greek letters par hain. Yeh pricing model se nikalte hain aur abhi ke moment ki position ko describe karte hain.",
      "how": "A model such as Black-Scholes takes spot, strike, time, rate and volatility and returns a premium; each Greek is the slope of that premium to one input. NSE publishes premiums, OI and IV, and your broker or data vendor computes the Greeks on top, so two platforms can show slightly different values. Delta and gamma are about price, theta about time, vega about volatility and rho about the rate. Use them as dashboard readings, not predictions.",
      "eg": {
        "title": "The five Greeks of one option (model, illustrative)",
        "text": "24,000 CE, NIFTY 24,000, 7 days, IV 14%, rate 6.5%: premium ₹200.85, delta 0.5295, gamma 0.000855, theta -15.45 per day, vega 13.22 per IV point, rho 2.40 per 1% rate change. For one lot of 65 the daily theta is about -15.45 x 65 = ₹1,004 lost per day, and 1 IV point is worth about ₹860."
      },
      "tip": "Greeks are a dashboard of sensitivities, not forecasts. They tell you what the premium reacts to, not which way the market will go.",
      "visual": {
        "kind": "flow",
        "title": "Five Greeks, five inputs (24,000 CE, illustrative)",
        "caption": "Each Greek is the premium change for a small move in one input.",
        "steps": [
          {
            "label": "Delta",
            "note": "0.53 per index point",
            "tone": "gold"
          },
          {
            "label": "Gamma",
            "note": "delta +0.0009 per point",
            "tone": "gold"
          },
          {
            "label": "Theta",
            "note": "-15.45 per day",
            "tone": "bear"
          },
          {
            "label": "Vega",
            "note": "13.22 per IV point",
            "tone": "ice"
          },
          {
            "label": "Rho",
            "note": "2.40 per 1% rate",
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
        "why": "Shows all five Greeks for the example option so you can change one input and watch the others."
      }
    },
    {
      "t": 2,
      "def": "Greeks matter because the premium you pay is exposed to several risks at once, and the index direction is only one of them. They show how much you may gain or lose from a move, from one day of time decay or from a one-point volatility change. Without them you cannot tell why a trade made or lost money.",
      "hi": "Greeks isliye zaroori hain kyunki aap jo premium dete ho woh ek saath kai risks ke exposure mein hota hai, aur index ki direction unmein se sirf ek hai. Yeh batate hain ki ek move, ek din ke time decay ya IV ke ek point badlav se kitna gain ya loss ho sakta hai. Inke bina aap nahi samajh sakte ki trade ne paisa kyun banaya ya kyun gaya.",
      "how": "Traders use Greeks to size a trade (how many index units does this lot behave like?), to compare strikes (which gives the most delta per rupee of theta?), to choose expiries and to explain results afterwards, which is called P&L attribution. Risk teams at brokers and market makers track the Greeks of the whole book, not only each trade. For a retail trader the useful habit is to check delta, theta and vega before every entry and ask what each will do over the holding period.",
      "eg": {
        "title": "Attributing a day (model, illustrative)",
        "text": "Start: 24,000 CE at ₹200.85. NIFTY +100, one day passes, IV -1 point. Delta explains +52.95, gamma +4.28, theta -15.45, vega -13.22: estimate +28.55. Full reprice: +29.59. Unexplained remainder +1.04 comes from higher-order terms. On one lot that is ₹1,924 gained, but delta and gamma alone would have shown ₹3,720, so theta and vega cost about ₹1,864."
      },
      "tip": "Before entering, ask which Greek you are paid for and which two you are paying. A trade you cannot explain in Greeks is a trade you cannot manage.",
      "visual": {
        "kind": "bars",
        "title": "Same trade, with and without time and vega (₹ per unit)",
        "caption": "Illustrative 24,000 CE, spot +100, one day, IV -1.",
        "items": [
          {
            "label": "Delta + gamma only",
            "value": 57.22,
            "tone": "ice"
          },
          {
            "label": "After theta and vega",
            "value": 29.59,
            "tone": "gold"
          }
        ]
      }
    },
    {
      "t": 3,
      "def": "The premium has two parts, intrinsic value and time value, and the Greeks describe how each part reacts. Index moves change the premium through delta and gamma, passing days reduce time value through theta, a volatility change moves it through vega and rates through rho. The premium at any moment is the net result of all of them.",
      "hi": "Premium ke do hisse hote hain, intrinsic value aur time value, aur Greeks batate hain ki har hissa kaise react karta hai. Index move delta aur gamma ke through premium badalta hai, guzarte din theta se time value ghatate hain, volatility badlav vega se aur rate rho se premium ko hilata hai. Kisi bhi pal ka premium in sab ka net result hota hai.",
      "how": "If you change one input at a time, the premium reprices in a way the Greek for that input predicts. In real trading all inputs move together, so effects overlap and sometimes cancel: an index rally can be offset by an IV drop. Near expiry, theta and gamma dominate; further from expiry, vega is larger. The effect of rho is small for weekly index options because the time to expiry is short.",
      "eg": {
        "title": "One factor at a time (model, illustrative)",
        "text": "24,000 CE at ₹200.85. Spot +50 alone: +27.54 per unit. One day passing alone: -15.96. IV +1 point alone: +13.22. If all three happen together the premium changes by about +23.66, close to but not exactly the sum +24.80 because the factors interact."
      },
      "tip": "A premium that falls while the index moves your way is not a broken option. It usually means time or volatility moved against you faster than delta helped.",
      "visual": {
        "kind": "bars",
        "title": "Premium change from one factor each (₹ per unit)",
        "caption": "Illustrative 24,000 CE. Spot +50, one day passes, IV +1 point.",
        "items": [
          {
            "label": "Spot +50",
            "value": 27.54,
            "tone": "bull"
          },
          {
            "label": "One day passes",
            "value": 15.96,
            "tone": "bear"
          },
          {
            "label": "IV +1 point",
            "value": 13.22,
            "tone": "ice"
          }
        ]
      },
      "calc": {
        "id": "greeks",
        "preset": {
          "optType": "CE",
          "spot": 24050,
          "strike": 24000,
          "days": 7,
          "iv": 14,
          "rate": 6.5
        },
        "why": "Re-prices the call after a 50-point rise; change days or IV one at a time to isolate each effect."
      }
    },
    {
      "t": 4,
      "def": "Calls and puts share the same set of Greeks but with different signs and sizes in some of them. A call has positive delta and a put has negative delta. Gamma and vega are the same for a call and a put with the same strike and expiry, while theta and rho differ a little and rho has opposite signs.",
      "hi": "Call aur put ke Greeks ka set same hota hai, bas kuch Greeks ke sign aur size alag hote hain. Call ka delta positive aur put ka delta negative hota hai. Same strike aur expiry par gamma aur vega call aur put ke liye same hote hain, jabki theta aur rho thode alag hote hain aur rho ke sign ulte hote hain.",
      "how": "In the Black-Scholes model put delta = call delta - 1, and gamma and vega are identical for the pair because put-call parity ties the two prices together. Call rho is positive (higher rates raise a call a little) and put rho is negative. For NSE index options, which are European and cash-settled, this picture is a good fit; real chains add dividends and skew, so values can differ slightly. A long call and a long put both have positive gamma and positive vega but opposite delta.",
      "eg": {
        "title": "24,000 call versus put (model, illustrative)",
        "text": "NIFTY 24,000, 7 days, IV 14%. Call: premium ₹200.85, delta 0.5295, gamma 0.000855, theta -15.45, vega 13.22, rho 2.40. Put: premium ₹170.95, delta -0.4705, gamma 0.000855, theta -11.18, vega 13.22, rho -2.20. Check: call delta - put delta = 0.5295 - (-0.4705) = 1.0000."
      },
      "tip": "Call and put are mirror images in direction but twins in gamma and vega. Both buyers gain from volatility; they differ in which way they want the index to go.",
      "visual": {
        "kind": "compare",
        "title": "24,000 CE versus 24,000 PE (illustrative)",
        "caption": "NIFTY 24,000, 7 days, IV 14%.",
        "left": {
          "head": "Call (CE)",
          "tone": "bull",
          "points": [
            "Delta +0.529",
            "Gamma 0.00086",
            "Theta -15.45",
            "Vega 13.22",
            "Rho +2.40"
          ]
        },
        "right": {
          "head": "Put (PE)",
          "tone": "bear",
          "points": [
            "Delta -0.471",
            "Gamma 0.00086",
            "Theta -11.18",
            "Vega 13.22",
            "Rho -2.20"
          ]
        }
      },
      "calc": {
        "id": "greeks",
        "preset": {
          "optType": "PE",
          "spot": 24000,
          "strike": 24000,
          "days": 7,
          "iv": 14,
          "rate": 6.5
        },
        "why": "Switch between CE and PE to compare the signs of each Greek."
      }
    },
    {
      "t": 5,
      "def": "Buyers and sellers of the same option hold exactly opposite Greeks. A buyer of a call has positive delta, positive gamma, negative theta and positive vega. The seller of that call has negative delta, negative gamma, positive theta and negative vega. What one earns from a Greek, the other pays.",
      "hi": "Same option ke buyer aur seller ke Greeks bilkul ulte hote hain. Call buyer ka delta positive, gamma positive, theta negative aur vega positive hota hai. Usi call ke seller ka delta negative, gamma negative, theta positive aur vega negative hota hai. Jo ek Greek se kamata hai, doosra wahi bharta hai.",
      "how": "Multiply each Greek by the signed quantity (+ for long, - for short) and by the lot size to get position Greeks. The buyer's maximum loss is the premium paid, while the seller's maximum loss is not capped for calls and is very large for puts, so the seller needs SPAN plus exposure margin at the broker. A seller's positive theta is the payment for taking negative gamma and negative vega. It is not free income.",
      "eg": {
        "title": "Long versus short one lot of the 24,000 CE (model, illustrative)",
        "text": "Per lot of 65: delta 34.4 units, theta -1004.28 per day (₹1,004 lost per day by the buyer), vega 859.51 per IV point. The buyer holds +34.4 delta, -1004.28/day theta, +859.51 vega. The seller holds the opposite: -34.4 delta, +1004.28/day theta, -859.51 vega. If IV jumps 3 points, the seller loses about 3 x 859.51 = ₹2,579 before any index move."
      },
      "tip": "Theta income is compensation for being short gamma and vega. A seller who ignores the other two Greeks is selling insurance without reading the policy.",
      "visual": {
        "kind": "matrix",
        "title": "Signs of the Greeks for a call position",
        "caption": "Rows: Greek. Columns: buyer (long) and seller (short) of the same call.",
        "xLabels": [
          "Buyer (long)",
          "Seller (short)"
        ],
        "yLabels": [
          "Delta and gamma",
          "Theta and vega"
        ],
        "cells": [
          {
            "head": "Delta +, gamma +",
            "note": "Gains from a move",
            "tone": "bull"
          },
          {
            "head": "Delta -, gamma -",
            "note": "Hurt by a big move",
            "tone": "bear"
          },
          {
            "head": "Theta -, vega +",
            "note": "Pays time, likes IV rising",
            "tone": "ice"
          },
          {
            "head": "Theta +, vega -",
            "note": "Earns time, hurt by IV rising",
            "tone": "gold"
          }
        ]
      }
    },
    {
      "t": 6,
      "def": "As expiry approaches, Greeks of the same strike change sharply: gamma and theta of the at-the-money option grow, while vega shrinks. Delta of out-of-the-money options falls towards zero and delta of in-the-money options rises towards one.",
      "hi": "Expiry paas aane par same strike ke Greeks tezi se badalte hain: ATM option ka gamma aur theta badhta hai, jabki vega ghat jata hai. OTM option ka delta zero ki taraf girta hai aur ITM option ka delta ek ki taraf badhta hai.",
      "how": "With little time left, the market has less room to move, so a small distance from the strike decides whether the option ends in or out of the money. That is why the delta curve gets steeper (higher gamma) and why time value drains faster per day (higher theta) at the money. Vega shrinks because there is little time left for volatility to matter. On NSE the weekly NIFTY contract expires on Tuesday, as per the currently published schedule, so the last two days of the week show these effects most clearly.",
      "eg": {
        "title": "The same ATM call as expiry nears (model, illustrative)",
        "text": "NIFTY 24,000, IV 14%, 24,000 CE. At 30 days: premium ₹450.57, gamma 0.000409, theta -8.65, vega 27.13. At 7 days: ₹200.85, 0.000855, -15.45, 13.22. At 3 days: ₹128.01, 0.001308, -22.43, 8.67. At 1 day: ₹72.31, 0.002268, -37.24, 5.01. Gamma rises about 5.5 times from 30 days to 1 day while vega falls to 18% of its 30-day value."
      },
      "tip": "The last day of an expiry is not \"the same option, just cheaper\". Its Greeks are a different animal: big gamma, big theta, little vega.",
      "visual": {
        "kind": "bars",
        "title": "ATM call gamma as expiry nears (gamma x 10,000, illustrative)",
        "caption": "24,000 CE, NIFTY 24,000, IV 14%. Higher bar means delta changes faster per point.",
        "items": [
          {
            "label": "30 days left",
            "value": 4.1,
            "tone": "gold"
          },
          {
            "label": "7 days left",
            "value": 8.6,
            "tone": "gold"
          },
          {
            "label": "3 days left",
            "value": 13.1,
            "tone": "gold"
          },
          {
            "label": "1 days left",
            "value": 22.7,
            "tone": "gold"
          }
        ]
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
        "why": "Set days to 1, 3, 7 and 30 to see gamma, theta and vega change."
      }
    },
    {
      "t": 7,
      "def": "When implied volatility is high, option premiums are larger and the Greeks change in size: vega and theta in rupees grow, while gamma at the money falls. Volatility is also unstable, so IV itself can move a lot, which makes vega a bigger part of the trade.",
      "hi": "Jab implied volatility high hoti hai, option premium bade hote hain aur Greeks ka size badalta hai: vega aur theta rupees mein badhte hain, jabki ATM gamma ghat jata hai. Volatility khud bhi unstable hoti hai, isliye IV bahut hil sakti hai aur vega trade ka bada hissa ban jata hai.",
      "how": "India VIX shows the expected annualised volatility of NIFTY over the next 30 days implied by index option prices; it describes expected volatility, not direction. A higher IV means a wider expected range, so far-out strikes are worth more and the ATM delta curve is flatter. Theta rises in rupees because there is more premium to decay, and vega rises because the premium is bigger. Sellers get paid more theta but face bigger swings if IV keeps expanding; buyers pay more for the same strike and need a bigger move to profit.",
      "eg": {
        "title": "ATM call at IV 14%, 25% and 35% (model, illustrative)",
        "text": "NIFTY 24,000, 7 days, 24,000 CE. IV 14%: premium ₹200.85, theta -15.45, vega 13.22, gamma 0.000855. IV 25%: ₹346.43, -25.81, 13.24, 0.000479. IV 35%: ₹478.85, -35.24, 13.24, 0.000343. A one-standard-deviation 7-day move implied by IV 14% is about ₹465 points, versus ₹1,163 points at 35%. At IV 35% the lot costs about ₹31,125 against ₹13,055 at 14%."
      },
      "tip": "High IV makes options expensive for buyers and tempting for sellers. Expensive is not the same as overpriced: the market may be right that a big move is coming.",
      "visual": {
        "kind": "bars",
        "title": "ATM 7-day call premium by IV (₹ per unit, illustrative)",
        "caption": "NIFTY 24,000, 24,000 CE. Premium scales roughly in proportion to IV for ATM options.",
        "items": [
          {
            "label": "IV 14%",
            "value": 200.85,
            "tone": "ice"
          },
          {
            "label": "IV 25%",
            "value": 346.43,
            "tone": "ice"
          },
          {
            "label": "IV 35%",
            "value": 478.85,
            "tone": "ice"
          }
        ]
      },
      "calc": {
        "id": "expected-move",
        "preset": {
          "spot": 24000,
          "vix": 25,
          "days": 7
        },
        "why": "Turns the IV level into the expected one-standard-deviation move over the 7 days."
      }
    }
  ],
  "tools": [
    {
      "id": "greeks",
      "preset": {
        "optType": "CE",
        "spot": 24000,
        "strike": 24000,
        "days": 7,
        "iv": 14,
        "rate": 6.5
      },
      "why": "Black-Scholes price and all five Greeks."
    }
  ]
}
export default m
