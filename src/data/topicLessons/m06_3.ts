import type { ModuleLesson } from '../topicLessonTypes'

/* Module 6.3. Generated from Black-Scholes model values (src/lib/bs.ts); NIFTY 24,000 unless stated, r 6.5%, no dividend, lot 65 (check the current NSE contract specification). Illustrative model values, not live premiums. */
const m: ModuleLesson = {
  "moduleId": "6.3",
  "intro": "Gamma tells you how fast delta changes as the index moves. A long option with positive gamma sees its delta grow when the index goes its way, while a short option with negative gamma sees its delta turn against it. Gamma is why a quiet option position can become a fast-moving one, and why short options near expiry are the most dangerous to hold. Examples use NIFTY 24,000, 7 days to expiry (unless stated), IV 14%, rate 6.5%, lot 65 (check the current NSE contract specification) and Black-Scholes model values, which are illustrative.",
  "introHi": "Gamma batata hai ki index hilne par delta kitni tezi se badalta hai. Positive gamma wale long option ka delta tab badhta hai jab index uske favour mein jata hai, jabki negative gamma wale short option ka delta uske khilaaf ho jata hai. Isi wajah se ek shaant option position achanak tez ho sakti hai, aur expiry ke paas short options sabse khatarnak hote hain. Examples NIFTY 24,000, expiry mein 7 din (jahan alag na likha ho), IV 14%, rate 6.5%, lot 65 (current NSE contract specification check karein) aur Black-Scholes model values par hain, jo illustrative hain.",
  "steps": {
    "concept": "Gamma is the change in delta for a one-point move in the index. The 24,000 CE here has gamma 0.000855, so its delta of 0.5295 rises by about 0.000855 for each point NIFTY goes up and falls by the same amount when NIFTY goes down. Gamma is the same for a call and a put at the same strike and expiry. It is positive for buyers and negative for sellers, and it is the biggest at the money close to expiry.",
    "conceptHi": "Gamma ek point index move par delta ka badlav hai. Yahan 24,000 CE ka gamma 0.000855 hai, isliye NIFTY har ek point upar jaane par uska delta 0.5295 se lagbhag 0.000855 badhta hai aur utna hi girta hai jab NIFTY neeche jaye. Same strike aur expiry par call aur put ka gamma same hota hai. Buyer ke liye yeh positive aur seller ke liye negative hota hai, aur expiry ke paas ATM par sabse zyada hota hai.",
    "mechanism": "In Black-Scholes, gamma = N'(d1) / (S x sigma x sqrt(T)), where N' is the normal density. It is highest where the strike is close to the forward index level and falls on both sides, so the gamma curve is a bell shape while the delta curve is an S shape. Shorter time shrinks sqrt(T) and makes the bell taller and narrower; higher volatility makes it lower and wider. Position gamma = option gamma x lot size x lots x (+1 long, -1 short). A market maker who is short options is short gamma and must buy index futures as the index rises and sell as it falls to stay delta-neutral, so gamma links option positions to futures-market flows.",
    "example": {
      "title": "Delta drifts as the index moves (model, illustrative)",
      "text": "24,000 CE, 7 days, IV 14%: delta 0.5295 at 24,000, 0.5719 at 24,050, 0.6135 at 24,100 and 0.4438 at 23,900. The gamma estimate for +100 points is 0.5295 + 0.000855 x 100 = 0.6150, close to the actual 0.6135. One lot of 65 therefore changes from 34.4 units of delta to 39.9 units after a 100-point rally, a gain of 5.5 units of exposure."
    },
    "chart": {
      "kind": "curve",
      "title": "Gamma versus index level",
      "caption": "Gamma is a bell: it peaks near the strike and fades on both sides, steeper and taller when expiry is near.",
      "curve": "gamma"
    },
    "optionChain": "Many broker chains show a Gamma column. Reading across strikes, it is largest near the at-the-money strike and smaller on both sides, for calls and puts alike. If your platform shows several expiries, compare the same strike: the near expiry carries visibly larger gamma than the far one. OI and volume do not carry gamma information, and NSE does not publish who is long or short, so a chain cannot tell you the market's total gamma position, only the per-option gamma estimated by the platform.",
    "psychology": "Sellers like the steady daily theta of a short at-the-money option and tend to forget that gamma works against them in a sharp move. The first 50 points feel harmless, the next 100 feel painful, and panic arrives when delta has doubled. Buyers dislike the same days because nothing happens, then a fast move makes gamma pay off. Fear of that fast move is exactly what gamma prices in.",
    "scenarios": {
      "bullish": "In a sharp rally, a long call's delta rises, so each next point earns more (positive gamma). A short call's delta turns more negative, so each next point costs more (negative gamma). A short put gains, but its delta shrinks towards zero and its position becomes safer as the rally proceeds.",
      "bearish": "In a sharp fall, a long put's delta becomes more negative, so the gain per point grows. A short put's delta turns more positive and the loss per point grows, and the position keeps getting worse as the index drops.",
      "sideways": "If the index goes nowhere, gamma does not pay or cost much and theta dominates. A long ATM option slowly loses premium while a short one collects it; neither feels gamma until the index breaks out of its range. This is the calm that tempts sellers to take on too much size."
    },
    "practice": [
      {
        "q": "Gamma of the 24,000 CE is 0.000855 and delta is 0.5295. Estimate the delta after NIFTY rises 60 points.",
        "a": "New delta = 0.5295 + 0.000855 x 60 = 0.5808. The exact model value at 24,060 is 0.5803."
      },
      {
        "q": "You are short 2 lots of the 24,000 CE. What is the position gamma in units of delta per index point?",
        "a": "Option gamma 0.000855 x lot size 65 x 2 lots = 0.1112, and being short gives -0.1112 delta units per index point. After a 100-point rally the position has picked up about 11.1 units of additional negative delta."
      },
      {
        "q": "Why is gamma of the 24,000 strike 8.6 (x 10,000) but only 6.3 for 24,400 with NIFTY at 24,000 and 7 days left?",
        "a": "The 24,400 strike is 400 points away; with only 7 days left the index is unlikely to reach it, so delta there changes slowly. The ATM strike is where delta is balanced near 0.5 and moves most per point."
      },
      {
        "q": "A short 24,000 CE lot has delta 0.5295 per unit. NIFTY rises 100 points. Delta-only loss versus full reprice loss?",
        "a": "Delta-only: 0.5295 x 100 x 65 = ₹3,442. Full model reprice: premium rises from ₹200.85 to ₹258.03, a rise of ₹57.18, so the loss is ₹3,717. The extra ₹7,158 is the gamma effect."
      }
    ],
    "assignment": "In the Greeks calculator set NIFTY 24,000, strike 24,000, IV 14%, and note gamma and delta for 7, 3 and 1 day to expiry. Then set days to 1 and move spot to 23,950, 24,000, 24,050 and 24,100, noting delta each time. Plot or write the five deltas and describe in three sentences how the delta curve differs from the 7-day case."
  },
  "topics": [
    {
      "t": 1,
      "def": "Gamma is the rate at which delta changes when the index moves by one point. It is the second derivative of the option price with respect to the index, in plain words the \"acceleration\" to delta's \"speed\". It is always positive for a long option and negative for a short one.",
      "hi": "Gamma woh rate hai jisse ek point index move par delta badalta hai. Simple shabdon mein yeh delta ki \"speed\" ke saamne \"acceleration\" hai. Long option ke liye yeh hamesha positive aur short option ke liye negative hota hai.",
      "how": "If delta is the speedometer, gamma is how hard the accelerator is pressed. A gamma of 0.000855 means delta moves by about 0.000855 per index point. Gamma is the same for a call and a put with the same strike and expiry. Platforms compute it from the model, so you will see small differences between brokers. Gamma is small in absolute terms because delta only changes slowly per point, which is why it is often shown with 4-6 decimals or multiplied by 100.",
      "eg": {
        "title": "One number, two readings (model, illustrative)",
        "text": "24,000 CE, NIFTY 24,000, 7 days, IV 14%: gamma 0.000855. A 100-point rally adds about 0.0855 to delta (0.5295 to 0.6150). One lot has gamma 0.0556 units of delta per point, so after 100 points the exposure has grown by about 5.6 units."
      },
      "tip": "Gamma is small as a number but large in effect, because it compounds over every point of the move.",
      "visual": {
        "kind": "curve",
        "title": "Gamma and delta together",
        "caption": "Gamma is the slope of the delta curve: steepest where gamma is at its peak.",
        "curve": "gamma"
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
        "why": "Shows the gamma of the example option; raise spot by 50 and compare the new delta."
      }
    },
    {
      "t": 2,
      "def": "Delta tells you how much the premium moves per point; gamma tells you how much delta itself moves per point. Delta is the first-order effect and gamma the second-order effect. Together they make a better estimate of the premium change than delta alone.",
      "hi": "Delta batata hai ki premium ek point par kitna hilta hai; gamma batata hai ki delta khud ek point par kitna hilta hai. Delta first-order effect hai aur gamma second-order. Dono milkar sirf delta se behtar premium change ka estimate dete hain.",
      "how": "A good approximation for a move of x points is: premium change = delta x x + 0.5 x gamma x x squared. The gamma term grows with the square of the move, so it is small for 10 points and meaningful for 100. For a long option the gamma term is always positive: the option gains slightly more than delta predicts on a favourable move and loses slightly less on an adverse one. For a short option the effect is reversed. The formula breaks down for very large moves and near expiry, when you should recompute the model.",
      "eg": {
        "title": "Delta only versus delta plus gamma (model, illustrative)",
        "text": "24,000 CE at ₹200.85, delta 0.5295, gamma 0.000855. For +100 points: delta only = 52.95; gamma term = 0.5 x 0.000855 x 100 x 100 = 4.28; sum 57.22. Full model reprice: 57.18. For -100 points the full change is -48.66: the call loses 48.66, less than the 52.95 delta alone suggests."
      },
      "tip": "Gamma is a correction to delta, not a separate profit source. It matters when the move is big relative to the time left.",
      "visual": {
        "kind": "bars",
        "title": "Delta of the 24,000 CE at different index levels",
        "caption": "Illustrative, 7 days, IV 14%. Delta rises as the index rises: that is gamma at work.",
        "items": [
          {
            "label": "NIFTY 23,900",
            "value": 0.4438,
            "tone": "gold"
          },
          {
            "label": "NIFTY 24,000",
            "value": 0.5295,
            "tone": "gold"
          },
          {
            "label": "NIFTY 24,050",
            "value": 0.5719,
            "tone": "gold"
          },
          {
            "label": "NIFTY 24,100",
            "value": 0.6135,
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "greeks",
        "preset": {
          "optType": "CE",
          "spot": 24100,
          "strike": 24000,
          "days": 7,
          "iv": 14,
          "rate": 6.5
        },
        "why": "Re-prices the call at 24,100 so you can compare the new delta with the estimate."
      }
    },
    {
      "t": 3,
      "def": "Gamma is highest for at-the-money options because that is where delta is changing fastest, between about 0.5 on the way up and about 0.5 on the way down. For deep in-the-money or far out-of-the-money options delta is already close to 1 or 0 and barely changes, so gamma is low.",
      "hi": "Gamma ATM options mein sabse zyada hota hai kyunki wahin delta sabse tezi se badal raha hota hai, lagbhag 0.5 ke aaspaas. Deep ITM ya bahut far OTM options mein delta pehle se 1 ya 0 ke paas hota hai aur kam badalta hai, isliye gamma kam hota hai.",
      "how": "Think of the delta curve as an S: it is flat at the bottom (far OTM), flat at the top (deep ITM) and steep in the middle. Gamma is the slope, so it peaks in the middle. The middle is wherever the strike is close to the current index level, and it shifts as the index moves. Choosing an ATM option gives the most gamma per point but also the highest theta per rupee of premium, so a buyer pays for gamma with time decay.",
      "eg": {
        "title": "Gamma by strike (model, illustrative)",
        "text": "NIFTY 24,000, 7 days, IV 14%. Gamma x 10,000 for 23,600, 23,800, 24,000, 24,200, 24,400: 5.51, 7.54, 8.55, 8.05, 6.33. The 24,000 strike has about 1.4 times the gamma of the 24,400 strike. For one lot, the ATM position changes its delta by 0.0556 units per point against 0.0412 for the 24,400."
      },
      "tip": "Buying a far-OTM option for its \"big gamma\" is a mistake: it has little gamma until the index is already near the strike.",
      "visual": {
        "kind": "bars",
        "title": "Gamma by strike (x 10,000, illustrative)",
        "caption": "NIFTY 24,000, 7 days, IV 14%. Calls and puts share the same gamma.",
        "items": [
          {
            "label": "23600",
            "value": 5.51,
            "tone": "ice"
          },
          {
            "label": "23800",
            "value": 7.54,
            "tone": "ice"
          },
          {
            "label": "24000",
            "value": 8.55,
            "tone": "gold"
          },
          {
            "label": "24200",
            "value": 8.05,
            "tone": "ice"
          },
          {
            "label": "24400",
            "value": 6.33,
            "tone": "ice"
          }
        ]
      },
      "calc": {
        "id": "greeks",
        "preset": {
          "optType": "CE",
          "spot": 24000,
          "strike": 24400,
          "days": 7,
          "iv": 14,
          "rate": 6.5
        },
        "why": "Compare the gamma of the 24,400 strike with the ATM strike by changing the strike."
      }
    },
    {
      "t": 4,
      "def": "As expiry nears, the gamma of at-the-money options rises sharply because a small index move decides whether the option ends in or out of the money. The gamma of out-of-the-money options does the opposite: it fades, as there is too little time to reach the strike.",
      "hi": "Expiry paas aate hi ATM options ka gamma tezi se badhta hai kyunki chhota sa index move tay kar deta hai ki option ITM ya OTM khatam hoga. OTM options ka gamma ulta ghat jata hai, kyunki strike tak pahunchne ka time bahut kam bachta hai.",
      "how": "With little time left, the range of likely index levels at expiry narrows, so the delta curve becomes almost a step: 0 below the strike and 1 above it. The slope in the middle gets very steep, which is high gamma. On NSE the weekly NIFTY contract expires on Tuesday as per currently published schedules, so ATM gamma is largest on expiry day itself. OTM options get a different treatment: with the strike far away and time almost gone, delta is near zero and nothing changes it, until a fast move brings the strike back into reach.",
      "eg": {
        "title": "ATM and 24,200 gamma as expiry nears (model, illustrative)",
        "text": "NIFTY 24,000, IV 14%. Gamma x 10,000 of the 24,000 strike at 30, 7, 3 and 1 day left: 4.09, 8.55, 13.08, 22.68. For the 24,200 strike: 4.14, 8.05, 10.90, 12.33. The ATM option's gamma at 1 day is 5.5 times its 30-day gamma, while the 24,200 strike's gamma at 1 day is only 153% of its 7-day value."
      },
      "tip": "Gamma grows for the strike nearest to the index and shrinks for the others, so the \"hot\" strike moves as the index moves on expiry day.",
      "visual": {
        "kind": "bars",
        "title": "ATM gamma by days to expiry (x 10,000, illustrative)",
        "caption": "24,000 CE, NIFTY 24,000, IV 14%.",
        "items": [
          {
            "label": "30 days",
            "value": 4.09,
            "tone": "gold"
          },
          {
            "label": "7 days",
            "value": 8.55,
            "tone": "gold"
          },
          {
            "label": "3 days",
            "value": 13.08,
            "tone": "gold"
          },
          {
            "label": "1 days",
            "value": 22.68,
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
        "why": "Set days to 30, 7, 3 and 1 to see ATM gamma grow."
      }
    },
    {
      "t": 5,
      "def": "An option seller has negative gamma: when the index moves in either direction the position's delta turns against them, so losses accelerate while gains stay capped at the premium collected. The closer to expiry and to the strike, the larger this risk.",
      "hi": "Option seller ka gamma negative hota hai: index kisi bhi direction mein jaye toh position ka delta uske khilaaf ho jata hai, isliye loss tez hota jata hai jabki gain sirf collected premium tak limited rehta hai. Expiry aur strike jitne paas honge, risk utna bada.",
      "how": "A short call loses premium to the buyer as the index rises, and its delta moves from, say, -0.53 towards -1, so it behaves more and more like a short futures position. SPAN margin charged by the clearing corporation (NSCCL) rises as the position gets riskier, which can force a broker to ask for more funds or square off. Sellers manage gamma with stop-losses, hedges such as buying a further OTM option or futures, smaller size near expiry, or by avoiding naked short options on event days. SEBI rules require upfront collection of margin, so sizing by margin only is a trap: the margin is not the maximum loss.",
      "eg": {
        "title": "Short one lot of the 24,000 CE (model, illustrative)",
        "text": "Sold at ₹200.85 per unit (premium received ₹13,055), delta 0.5295. NIFTY rises 100 points (time and IV held constant): the call is worth ₹258.03, so the loss is ₹57.18 x 65 = ₹3,717. Delta alone would have said ₹3,442. If NIFTY instead falls 100 points, the call is worth ₹152.18 and the seller gains ₹48.66 x 65 = ₹3,163, less than ₹3,442. Loss on the way up (₹3,717) is larger than gain on the way down (₹3,163): that gap is negative gamma."
      },
      "tip": "Collected premium is the most you can make, not the most you can lose. Size short options by the loss at a 2-3 times larger move than you expect, not by margin.",
      "visual": {
        "kind": "bars",
        "title": "Short 24,000 CE: gain or loss for a 100-point move (₹ per lot)",
        "caption": "Illustrative, time and IV held constant. The loss on the upside exceeds the gain on the downside.",
        "items": [
          {
            "label": "NIFTY -100",
            "value": 3163,
            "tone": "bull"
          },
          {
            "label": "NIFTY +100 (loss)",
            "value": 3717,
            "tone": "bear"
          }
        ]
      },
      "calc": {
        "id": "option-pnl",
        "preset": {
          "optType": "CE",
          "side": "sell",
          "strike": 24000,
          "premium": 200.85,
          "expiryPrice": 24100,
          "lotSize": 65,
          "lots": 1
        },
        "why": "Shows the expiry loss of the short call if NIFTY finishes at 24,100 (expiry payoff, which differs from the 7-day model loss)."
      }
    },
    {
      "t": 6,
      "def": "Gamma explosion is the sudden jump in gamma and delta of an at-the-money option on the last day or hours before expiry. A few dozen points can change the option from a coin toss into a near-certain winner or loser, and its premium can move by several times in minutes.",
      "hi": "Gamma explosion matlab expiry ke last din ya ghanton mein ATM option ke gamma aur delta ka achanak kood jaana. Kuch dozen points ek coin toss jaise option ko lagbhag sure winner ya loser bana sakte hain, aur premium kuch hi minute mein kai guna badal sakta hai.",
      "how": "With one day left, the delta of an ATM option swings from about 0.5 to near 0 or 1 with a move of about 100 points. This is the logic behind big gains and big losses on expiry day. Sellers who hold at-the-money strikes face the most violent swings, and their brokers' risk systems raise margin and can square off positions. NSE index options are European and cash-settled, so there is no delivery, only the final settlement price against strike. Remember that these model numbers use a full day; in the last hours the effect is even larger.",
      "eg": {
        "title": "Delta of the 24,000 CE with 1 day left (model, illustrative)",
        "text": "NIFTY 24,000, IV 14%, 1 day to expiry. Delta at 23,900, 23,950, 24,000, 24,050, 24,100: 0.2940, 0.3987, 0.5112, 0.6225, 0.7242. Gamma at 24,000 is 0.002268, about 2.7 times the 7-day gamma. A seller of one lot at 24,000 sees delta change from 33.2 to 47.1 units after a 100-point rally, i.e. 13.8 units of extra exposure."
      },
      "tip": "On expiry day, treat any short ATM position as a live wire. A move of one or two percent can wipe out days of collected premium.",
      "visual": {
        "kind": "bars",
        "title": "Delta of the 24,000 CE with 1 day left (illustrative)",
        "caption": "NIFTY moves from 23,900 to 24,100. Delta goes from about 0.1 to about 0.9 across just 200 points.",
        "items": [
          {
            "label": "23900",
            "value": 0.294,
            "tone": "gold"
          },
          {
            "label": "23950",
            "value": 0.3987,
            "tone": "gold"
          },
          {
            "label": "24000",
            "value": 0.5112,
            "tone": "gold"
          },
          {
            "label": "24050",
            "value": 0.6225,
            "tone": "gold"
          },
          {
            "label": "24100",
            "value": 0.7242,
            "tone": "gold"
          }
        ]
      },
      "calc": {
        "id": "greeks",
        "preset": {
          "optType": "CE",
          "spot": 24050,
          "strike": 24000,
          "days": 1,
          "iv": 14,
          "rate": 6.5
        },
        "why": "Try spots around 24,000 with days set to 1 to see delta jump."
      }
    },
    {
      "t": 7,
      "def": "Positive gamma means delta moves in your favour as the index moves, which is the position of a buyer of options. Negative gamma means delta moves against you, which is the position of a seller. Positive gamma pays when the index moves a lot; negative gamma pays when it stays quiet.",
      "hi": "Positive gamma matlab index ke hilne par delta aapke favour mein badalta hai, jo option buyer ki position hai. Negative gamma matlab delta aapke khilaaf badalta hai, jo seller ki position hai. Positive gamma tab kamata hai jab index bahut hilta hai; negative gamma tab jab shaant rehta hai.",
      "how": "A long ATM straddle (call plus put) is long gamma: its delta is near zero at the start, but after a rally the call delta rises and the put delta fades, so the position turns long, and after a fall it turns short. The short straddle is the mirror image. Positive gamma costs theta every day and negative gamma earns it, so you can view theta as the price of gamma. Market-wide, dealers and market makers who are net short options carry negative gamma and have to hedge in the direction of the move, which can amplify it, while those net long gamma hedge against the move and may dampen it. NSE does not publish dealer positions, so any such reading is an estimate.",
      "eg": {
        "title": "Long versus short 24,000 straddle, 1 lot (model, illustrative)",
        "text": "Straddle premium = ₹200.85 + ₹170.95 = ₹371.79 per unit (₹24,167 per lot). Net delta at 24,000: 3.8 units, net gamma 0.1112 units per point. After NIFTY +100 the net delta is 14.8 units; the straddle is worth +14.36 per unit (₹933 per lot) for the buyer, who is now long about 15 units. After NIFTY -100 the straddle value changes by +2.68 per unit. The seller's results are the opposite."
      },
      "tip": "Positive gamma is not free: you pay for it in theta every day. It pays off only if the index moves more than the market was pricing.",
      "visual": {
        "kind": "matrix",
        "title": "Gamma and what it likes",
        "caption": "Long options earn from movement and pay for time; short options earn from time and pay for movement.",
        "xLabels": [
          "Quiet market",
          "Big move"
        ],
        "yLabels": [
          "Long gamma (buyer)",
          "Short gamma (seller)"
        ],
        "cells": [
          {
            "head": "Loses to theta",
            "note": "Delta stays near start",
            "tone": "bear"
          },
          {
            "head": "Gains as delta grows",
            "note": "Each point pays more",
            "tone": "bull"
          },
          {
            "head": "Keeps theta",
            "note": "Premium decays in seller's favour",
            "tone": "bull"
          },
          {
            "head": "Loses as delta turns",
            "note": "Each point costs more",
            "tone": "bear"
          }
        ]
      },
      "calc": {
        "id": "straddle-move",
        "preset": {
          "spot": 24000,
          "cePrice": 200.85,
          "pePrice": 170.95,
          "strike": 24000
        },
        "why": "Gives the straddle premium and expiry breakevens for the example."
      }
    },
    {
      "t": 8,
      "def": "Gamma scalping is a strategy where a trader owns options (positive gamma) and repeatedly trades the index or futures to bring delta back to zero. Each hedge locks in a small profit from the movement, and the total must beat the theta paid for holding the options.",
      "hi": "Gamma scalping aisi strategy hai jismein trader options khareedta hai (positive gamma) aur baar-baar index ya futures trade karke delta ko wapas zero par laata hai. Har hedge movement se chhota profit lock karta hai, aur kul profit us theta se zyada hona chahiye jo options hold karne par dena padta hai.",
      "how": "You buy a straddle and hedge its small delta with futures. When the index rises, delta turns positive and you sell futures (selling high); when it falls, delta turns negative and you buy futures (buying low). Each swing leaves a gain of roughly 0.5 x gamma x move squared. The break-even daily move is about the square root of (2 x theta / gamma), which is close to the daily move implied by IV. You make money only if the index moves more than IV implied. Costs matter on NSE: brokerage, STT, exchange charges, slippage and the futures lot size of 65 make frequent hedging expensive, so this is mostly a professional strategy.",
      "eg": {
        "title": "Two hedge steps on a 24,000 straddle (model, illustrative)",
        "text": "Buy 1 lot of the 24,000 straddle at ₹371.79 per unit; net delta 3.8 units, hedged with futures. NIFTY rises 100 points: straddle gains ₹933, the small futures hedge loses ₹383, so P&L = ₹550. Re-hedge at 24,100 (net delta 14.8 units short futures), then NIFTY falls back to 24,000: P&L this leg = ₹542. Total gamma gain over the round trip is ₹1,092 (time frozen). One day of theta for the straddle is -1731 per lot, i.e. a cost of ₹1,731. Break-even daily move = sqrt(2 x 26.63 / 0.001710) = 176 points, close to the IV-implied daily move of 176 points."
      },
      "tip": "Gamma scalping is a bet that realised volatility will exceed implied volatility. If it does not, theta wins and the scalper loses.",
      "visual": {
        "kind": "flow",
        "title": "Gamma scalping loop",
        "caption": "Illustrative sequence: own options, hedge delta, repeat as the index swings.",
        "steps": [
          {
            "label": "Buy straddle",
            "note": "Long gamma, pay theta",
            "tone": "ice"
          },
          {
            "label": "Hedge delta",
            "note": "Futures to near zero",
            "tone": "neutral"
          },
          {
            "label": "Index swings",
            "note": "Delta drifts from zero",
            "tone": "gold"
          },
          {
            "label": "Re-hedge",
            "note": "Sell high, buy low",
            "tone": "bull"
          },
          {
            "label": "Compare",
            "note": "Gains vs theta and costs",
            "tone": "bear"
          }
        ]
      },
      "calc": {
        "id": "straddle-move",
        "preset": {
          "spot": 24000,
          "cePrice": 200.85,
          "pePrice": 170.95,
          "strike": 24000
        },
        "why": "The straddle price implies how far NIFTY must move at expiry for the long straddle to break even."
      }
    },
    {
      "t": 9,
      "def": "A gamma squeeze is a self-reinforcing move: when option sellers (such as market makers) are short gamma and the index moves, they must buy or sell futures to hedge, and that hedging pushes the index further in the same direction. It is a hypothesis about flows, not something NSE publishes.",
      "hi": "Gamma squeeze ek self-reinforcing move hai: jab option sellers (jaise market makers) short gamma hote hain aur index hilta hai, toh unhe hedge ke liye futures kharidne ya bechne padte hain, aur woh hedging index ko usi direction mein aur dhakel deti hai. Yeh flows ke baare mein ek hypothesis hai, NSE isko publish nahi karta.",
      "how": "If dealers are short calls and the index rises, call delta rises and they must buy futures to stay neutral; that buying lifts the index, delta rises again, and so on. The effect is strongest when the open interest is concentrated near the money, time to expiry is short and the hedgers' futures trading is large compared with the market's depth. Whether a squeeze actually happens depends on who is positioned, how much liquidity there is and what other participants do; none of this is visible from OI data. It is documented mainly in US single-stock options; claims of one in a given Indian session should be treated as hypotheses.",
      "eg": {
        "title": "Hedge buying from a hypothetical short-call book (illustrative)",
        "text": "Suppose a dealer is short 2,000 lots of the 24,100 CE with 3 days left, IV 14%, delta-hedged with futures. NIFTY rises from 24,000 to 24,200: the call delta moves from 0.3901... per unit to 0.6461. Extra futures to buy = (0.6461 - 0.3901) x 2,000 x 65 = 33,279 units, about 512 futures lots or 81 crore rupees of notional at 24,200. This is a made-up book for teaching; it does not describe any real participant."
      },
      "tip": "A strong rally near a heavily traded strike is not proof of a gamma squeeze. Many things move the index, and hedging flows are one hypothesis among several.",
      "visual": {
        "kind": "flow",
        "title": "The squeeze feedback loop (hypothesis)",
        "caption": "Short-gamma hedgers buy as the index rises, which can add to the rise. Not guaranteed.",
        "steps": [
          {
            "label": "Index rises",
            "note": "Calls move towards ITM",
            "tone": "bull"
          },
          {
            "label": "Call delta rises",
            "note": "Short calls turn more negative",
            "tone": "gold"
          },
          {
            "label": "Hedgers buy futures",
            "note": "To get back to neutral",
            "tone": "ice"
          },
          {
            "label": "Buying lifts index",
            "note": "Further push up",
            "tone": "bull"
          },
          {
            "label": "Loop repeats",
            "note": "Until time or flows run out",
            "tone": "neutral"
          }
        ]
      }
    },
    {
      "t": 10,
      "def": "Gamma exposure (GEX) is an estimate of the total gamma held in the options market, usually in money terms per 1% move of the index. It is built by adding up gamma x open interest x lot size x price for each strike, with an assumption about who is long and short. NSE does not publish dealer positioning, so GEX is a model, not a measurement.",
      "hi": "Gamma exposure (GEX) options market mein jama kul gamma ka estimate hai, aam taur par index ke 1% move par paison mein. Ise har strike ke gamma x open interest x lot size x price ko jodkar banate hain, aur isme yeh assumption hota hai ki kaun long hai aur kaun short. NSE dealer positioning publish nahi karta, isliye GEX ek model hai, measurement nahi.",
      "how": "The common recipe: for each strike take gamma, multiply by OI in units, by the index level squared and by 0.01; count call gamma as positive and put gamma as negative (assuming customers are net long puts and short calls from a dealer's point of view, or the reverse in other versions). A positive total is read as dealers being net long gamma, which may dampen moves, and a negative total as short gamma, which may amplify them. These assumptions are unverified: OI cannot show who initiated a trade, positions change daily and hedges outside the options (other futures, spreads) are invisible. Treat GEX as one more hypothesis for where reactions might be stronger, not as a signal.",
      "eg": {
        "title": "GEX on a five-strike illustrative chain (model)",
        "text": "Gamma-OI weights per strike (OI in lots as in the chain below, 7 days, IV 14%, convention: call +, put -, crore rupees per 1% move): 23800: call 734, put -2712; 23900: call 1170, put -2216; 24000: call 2689, put -2593; 24100: call 2511, put -1399; 24200: call 3377, put -935. Totals: call 10481, put -9854, net 627 crore. Under the usual assumption a positive net suggests dealers are long gamma; but with the opposite positioning assumption the sign flips, which shows how fragile the reading is."
      },
      "tip": "Never trade GEX as a signal. Use it, if at all, to ask \"where might hedging flows matter?\" and then confirm with price and volume.",
      "visual": {
        "kind": "oi",
        "title": "Illustrative OI strip used for GEX, thousand lots",
        "caption": "OI is not gamma: gamma weights each strike by how close it is to the index. Call = red, put = green.",
        "rows": [
          {
            "strike": 23800,
            "ce": 26,
            "pe": 96
          },
          {
            "strike": 23900,
            "ce": 38,
            "pe": 72
          },
          {
            "strike": 24000,
            "ce": 84,
            "pe": 81
          },
          {
            "strike": 24100,
            "ce": 79,
            "pe": 44
          },
          {
            "strike": 24200,
            "ce": 112,
            "pe": 31
          }
        ],
        "spot": 24000
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
      "why": "Black-Scholes price and gamma for any strike and expiry."
    },
    {
      "id": "straddle-move",
      "preset": {
        "spot": 24000,
        "cePrice": 200.85,
        "pePrice": 170.95,
        "strike": 24000
      },
      "why": "Implied move and breakevens of a straddle."
    }
  ]
}
export default m
