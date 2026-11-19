import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '2.1',
  intro:
    `Every price on your screen is the result of many different kinds of people and firms trading for different reasons. This module introduces the twelve main participant types in Indian markets: retail, HNI, ultra-HNI, proprietary firms, institutions, FPIs, DIIs, mutual funds, hedge funds, market makers, arbitrageurs and algorithmic traders. Knowing who is on the other side of your trade is the first step to reading OI, volume and institutional data sensibly.`,
  introHi:
    `Screen par jo price dikhta hai woh alag-alag type ke participants ke trades se banta hai, aur sabka maksad alag hota hai. Is module mein hum 12 main participants dekhenge: retail, HNI, ultra-HNI, prop firms, institutions, FPI, DII, mutual funds, hedge funds, market makers, arbitrageurs aur algo traders. Jab aapko pata ho ki trade ke dusri taraf kaun ho sakta hai, tab OI, volume aur institutional data ko samajhna kaafi aasaan ho jaata hai.`,
  steps: {
    concept:
      `A market participant is anyone who places orders: a person with a phone app, a pension fund, a bank, a robot. They differ in capital, speed, rules they must follow, and above all in what they want. A retail trader may want a quick gain; a mutual fund may want to deploy SIP money; a market maker wants to earn a tiny spread thousands of times. The same price move means different things to each of them.`,
    conceptHi:
      `Market participant matlab koi bhi jo order daalta hai: app par baitha retail trader, pension fund, bank ya ek robot. Inki capital, speed, rules aur sabse zyada inka maksad alag hota hai. Retail ko jaldi profit chahiye, mutual fund ko SIP ka paisa lagana hai, market maker ko chhota sa spread baar-baar kamana hai. Ek hi price move sabke liye alag matlab rakhta hai.`,
    mechanism:
      `All orders meet in the NSE order book. NSE matches buyers and sellers by price and time priority, and the clearing corporation (NSCCL) guarantees settlement after trade. Participants reach the exchange through trading members (brokers); FPIs and mutual funds also use custodians for settlement. NSE classifies derivatives positions into four public categories: Client, DII, FII and Pro. Cash-market flows are reported separately as FII and DII activity. The categories are broad buckets, not a list of named funds.`,
    example: {
      title: 'One NIFTY day, six different motives (illustrative)',
      text: `NIFTY is near 24,000. A retail trader buys 2 lots of the 24,100 CE at ₹80, paying 80 × 65 × 2 = ₹10,400. An HNI with a ₹2 crore portfolio buys 13 lots of a 23,500 PE as insurance. A mutual fund deploys SIP inflow into stocks. An FPI trims India exposure. A market maker quotes both sides of the 24,000 CE. An arbitrageur sells futures and buys the stock basket. Same market, six reasons. Figures are illustrative; the current NIFTY lot is 65, so check the NSE contract specification before trading.`,
    },
    chart: {
      kind: 'layers',
      title: 'Participant ladder, widest to deepest pockets',
      caption: 'Read top to bottom: the base is huge in number of people, the lower layers are fewer but each trades far larger size. Illustrative grouping, not an official NSE hierarchy.',
      layers: [
        { label: 'Retail traders', note: 'Millions of accounts, small size each', tone: 'ice' },
        { label: 'HNI and ultra-HNI', note: 'Large personal wealth, PMS, family offices', tone: 'gold' },
        { label: 'Proprietary firms, market makers, algo traders', note: 'Own capital, speed, spread and arbitrage', tone: 'neutral' },
        { label: 'DIIs and mutual funds', note: 'Domestic institutions, SIP-driven flows', tone: 'ice' },
        { label: 'FPIs and hedge funds', note: 'Global capital, very large size', tone: 'gold' },
      ],
    },
    optionChain:
      `The option chain does not label participants. A big OI number at a strike could come from a retail crowd, a prop desk, a hedger or a market maker. What participant knowledge gives you is better questions: is this OI from hedgers or speculators, is this volume a market maker quoting or someone taking a view? NSE's participant-wise OI report (Client, DII, FII, Pro) is the only official split, and it is end-of-day and at category level.`,
    psychology:
      `Retail traders often chase quick gains and fear missing out. HNIs protect wealth they already have. Institutions follow mandates and committees, so they act slowly and in size. Prop firms and market makers think in probabilities and costs, not in opinions. Arbitrageurs want the gap to close. When you trade an option, ask which of these minds you are standing opposite to, and whether you really have an edge against them.`,
    scenarios: {
      bullish:
        `In a rising market, retail may buy calls late, institutions may add gradually, market makers keep quoting and hedge by buying futures as call deltas rise, and arbitrageurs keep futures close to fair value. A rally does not prove any one group drove it.`,
      bearish:
        `In a falling market, retail put buyers and HNI hedgers become active, FPIs may sell in cash or hedge with futures, and DIIs may buy dips with SIP money. Market makers widen spreads when volatility rises, which raises your trading cost.`,
      sideways:
        `In a range, retail option buyers lose time value, prop firms and sellers collect it, and mutual funds keep investing steadily. Low volatility days are where speed and low costs matter most, which favours professionals.`,
    },
    practice: [
      {
        q: `A retail trader buys 2 lots of a NIFTY call at ₹80 with lot size 65. What is the total premium and the maximum loss?`,
        a: `Premium = 80 × 65 × 2 = ₹10,400. For a bought option the maximum loss is the premium paid, so ₹10,400 plus charges, if the option expires worthless.`,
      },
      {
        q: `An HNI holds a ₹2 crore portfolio with beta 1 and hedges with NIFTY futures at 24,000, lot 65. How many lots, roughly?`,
        a: `One lot notional = 24,000 × 65 = ₹15,60,000. Lots = 2,00,00,000 ÷ 15,60,000 = 12.8, so about 13 lots. Real hedges must also adjust for the portfolio's actual beta and costs.`,
      },
      {
        q: `A mutual fund wants ₹100 crore of a stock at ₹1,000 and the stock trades 50 lakh shares a day. What share of one day's volume is that?`,
        a: `Shares needed = 100,00,00,000 ÷ 1,000 = 10 lakh. 10 lakh ÷ 50 lakh = 20% of one day's volume. That is large, so the fund will spread buying over several days.`,
      },
      {
        q: `Why can the same FII futures short position mean different things for different participants' strategies?`,
        a: `A short futures position may be a bearish view, a hedge on an existing share portfolio or one leg of an arbitrage. Public participant data shows the position but not the motive, so the motive must be inferred carefully, and sometimes it cannot be.`,
      },
    ],
    assignment:
      `Open the NSE participant-wise open interest report for the latest trading day. Write down the four categories (Client, DII, FII, Pro) and, for index futures, their long and short contracts. For each category, write one sentence on who you think it contains and one thing the report cannot tell you.`,
  },
  topics: [
    {
      t: 1,
      def: `A retail trader is an individual who trades with personal savings, usually through a broker app and in small size. Retail accounts are very large in number but each carries little capital. In options, retail traders mostly buy cheap out-of-the-money options and short-term weekly contracts.`,
      hi: `Retail trader matlab aam individual jo apni personal savings se broker app par trade karta hai. Inki sankhya bahut hoti hai lekin ek-ek ki capital chhoti hoti hai. Options mein retail zyada tar sasti OTM calls aur puts aur weekly contracts khareedta hai.`,
      how: `Retail orders reach NSE through brokers such as Zerodha, Angel One, Groww or Dhan. They fall under the Client category in NSE participant data, along with HNIs and any other non-institutional client. Option buyers pay the premium upfront and their loss is limited to it, which is why small accounts are attracted to buying. SEBI's study on individual F&O traders found that about 91% lost money in FY25, with net losses of roughly ₹1.06 lakh crore for the group, after about 93% in FY24. Costs, time decay and overtrading are common reasons.`,
      eg: {
        title: 'A ₹10,400 bet on a quick NIFTY move',
        text: `NIFTY is at 24,000 and a retail trader buys 2 lots of the 24,100 CE at ₹80 (illustrative). Premium = 80 × 65 × 2 = ₹10,400. Breakeven at expiry = 24,100 + 80 = 24,180. If NIFTY expires at 24,300, value = (24,300 − 24,100) × 65 × 2 = ₹26,000 and profit = 26,000 − 10,400 = ₹15,600 before charges. If NIFTY ends at or below 24,100, the full ₹10,400 is lost.`,
      },
      tip: `Being small does not make you protected. The common mistake is buying far out-of-the-money options because they look cheap; cheap usually means low probability.`,
      visual: {
        kind: 'bars',
        title: 'SEBI study: share of individual F&O traders who lost money',
        caption: 'Approximate figures from SEBI studies on FY24 and FY25; check the SEBI publication for exact numbers.',
        unit: '%',
        items: [
          { label: 'FY24 loss-making traders', value: 93, tone: 'bear' },
          { label: 'FY25 loss-making traders', value: 91, tone: 'bear' },
        ],
      },
      calc: { id: 'lot-value', preset: { premium: 80, lotSize: 65, lots: 2, spot: 24000, marginPct: 12 }, why: 'Shows the premium cost and notional value of a typical retail option purchase.' },
    },
    {
      t: 2,
      def: `HNI stands for High Net-worth Individual. There is no single official definition; brokers often treat clients with tens of lakhs to a few crore of investable wealth as HNIs. In IPOs, SEBI calls such applicants non-institutional investors when the bid is above ₹2 lakh.`,
      hi: `HNI ka matlab High Net-worth Individual. Iski koi ek official definition nahi hai, lekin broker aam taur par jinke paas kuch lakh se kuch crore tak investable paisa ho unhe HNI maante hain. IPO mein ₹2 lakh se upar ki application ko SEBI non-institutional investor category mein rakhta hai.`,
      how: `HNIs have more capital and so can use options in different ways: protective puts on a stock portfolio, covered calls, and spreads with defined risk. They also get better service, lower brokerage and access to PMS (Portfolio Management Services, minimum ₹50 lakh as per SEBI rules) or AIFs. In NSE's derivatives participant data they are still counted under Client, so you cannot separate HNI activity from retail. Larger capital helps manage risk, but it does not remove market risk.`,
      eg: {
        title: 'HNI buys insurance on a ₹2 crore portfolio (illustrative)',
        text: `An HNI holds shares worth ₹2,00,00,000 with beta close to 1. NIFTY is 24,000 and one lot is 65, so one lot covers 24,000 × 65 = ₹15,60,000. Lots needed = 2,00,00,000 ÷ 15,60,000 = 12.8, about 13 lots. Suppose the 23,500 PE costs ₹60. Cost = 60 × 65 × 13 = ₹50,700, which is about 0.25% of the portfolio. If NIFTY falls well below 23,500 before expiry, the puts gain and offset part of the share loss. If it does not fall, the ₹50,700 is the cost of protection.`,
      },
      tip: `Hedging has a price. If the hedge never pays off, that is not a failure; it is the insurance premium.`,
      visual: {
        kind: 'compare',
        title: 'Retail account versus HNI account (typical)',
        caption: 'General tendencies, not rules.',
        left: { head: 'Retail', tone: 'ice', points: ['Small capital', 'Mostly buys options', 'Direction-focused', 'Standard brokerage'] },
        right: { head: 'HNI', tone: 'gold', points: ['Larger capital', 'Hedges and spreads', 'Portfolio-focused', 'PMS or AIF access'] },
      },
      calc: { id: 'hedge-ratio', preset: { portfolio: 20000000, beta: 1, futuresNotional: 1560000 }, why: 'Works out how many lots an HNI would need to cover a portfolio.' },
    },
    {
      t: 3,
      def: `Ultra-HNIs are individuals or families with very large wealth. There is no official SEBI definition; wealth managers set their own cut-offs, often starting around ₹25 crore or more of investable assets and going up to thousands of crores. They often invest through family offices, PMS or AIFs.`,
      hi: `Ultra-HNI woh log ya parivaar hote hain jinke paas bahut zyada wealth hoti hai. SEBI ki koi official definition nahi hai, wealth managers apni threshold rakhte hain, aksar ₹25 crore ya usse upar. Yeh log zyada tar family office, PMS ya AIF ke through invest karte hain.`,
      how: `A family office is a private team that manages one family's money across shares, debt, real estate and unlisted companies. Ultra-HNIs may subscribe to pre-IPO deals, buy through block deals and use collars (buy a put and sell a call) to protect big holdings. Positions this large cannot be entered in one order without moving the price, so they are split over time. If they trade through a broker's client code, they still appear under Client in the NSE data.`,
      eg: {
        title: 'Collar on a ₹100 crore holding (illustrative)',
        text: `A family office holds ₹100 crore of equity that behaves like NIFTY. One lot covers 24,000 × 65 = ₹15,60,000, so 100,00,00,000 ÷ 15,60,000 = about 641 lots. It buys the 23,000 PE at ₹35 and sells the 25,000 CE at ₹40 (illustrative). Net credit = 5 × 65 × 641 = ₹2,08,325 before charges. Downside below 23,000 is protected, but gains above 25,000 are given up. A collar trades some upside for lower hedge cost, it does not remove risk.`,
      },
      tip: `At this size, execution matters as much as the view: the bigger the order, the more a participant must plan how to enter and exit.`,
      visual: {
        kind: 'payoff',
        title: 'Collar payoff at expiry (per unit, illustrative)',
        caption: 'Long 23,000 PE and short 25,000 CE on top of the holding limits both losses and gains.',
        spot: 24000,
        legs: [
          { type: 'PE', side: 1, strike: 23000, premium: 35 },
          { type: 'CE', side: -1, strike: 25000, premium: 40 },
        ],
      },
      calc: { id: 'hedge-ratio', preset: { portfolio: 1000000000, beta: 1, futuresNotional: 1560000 }, why: 'Shows how many lots a ₹100 crore hedge needs, and why order slicing is needed.' },
    },
    {
      t: 4,
      def: `A proprietary (prop) trading firm trades with its own money, not client money. It earns from speed, pricing models and small repeatable edges. NSE reports their positions as a separate category called Pro.`,
      hi: `Prop trading firm apne khud ke paise se trade karti hai, client ke paise se nahi. Inki kamai speed, pricing models aur chhote-chhote repeatable edge se aati hai. NSE inke positions ko alag category "Pro" mein dikhata hai.`,
      how: `Prop desks run strategies such as market making, statistical arbitrage and volatility trading, mostly through algorithms and co-located servers at the exchange. They are usually market-neutral: they hedge the direction and keep the small edge. They also supply liquidity, but that liquidity can thin out quickly in a shock. SEBI watches prop and algo activity, especially on expiry days, so rules on lot sizes, surveillance and intraday position limits for index options keep changing; check the current circulars.`,
      eg: {
        title: 'Why a tiny edge matters (illustrative)',
        text: `A prop desk earns an average ₹0.25 per unit on NIFTY options after costs. With lot 65, that is 0.25 × 65 = ₹16.25 per lot per trade. If it trades 2,000 lots in a day, gross edge = 16.25 × 2,000 = ₹32,500. This is not a prediction for any firm; it only shows how a small edge multiplied by volume becomes meaningful, and also how an edge of zero or negative can turn costly quickly.`,
      },
      tip: `Do not read Pro OI as a market opinion. Prop positions are often hedged against each other and against futures.`,
      visual: {
        kind: 'flow',
        title: 'How a prop desk makes money',
        caption: 'Illustrative flow of one small edge.',
        steps: [
          { label: 'Model finds mispricing', note: 'option vs fair value', tone: 'ice' },
          { label: 'Trade and hedge', note: 'neutralise direction', tone: 'gold' },
          { label: 'Collect small edge', note: 'paise to rupees per unit', tone: 'ice' },
          { label: 'Repeat thousands of times', note: 'edge × volume', tone: 'neutral' },
        ],
      },
    },
    {
      t: 5,
      def: `Institutional investors are large organisations that invest other people's money: mutual funds, insurance companies, pension funds, banks and sovereign wealth funds. They have a mandate, a risk committee and rules from SEBI, RBI or IRDAI. Their orders are big enough to move prices.`,
      hi: `Institutional investor badi organisations hoti hain jo doosron ka paisa invest karti hain, jaise mutual funds, insurance companies, pension funds, banks aur sovereign wealth funds. Inke paas mandate, risk committee aur SEBI, RBI ya IRDAI ke rules hote hain. Inke orders itne bade hote hain ki price par asar daal sakte hain.`,
      how: `Institutions think in months and years and are judged against a benchmark such as NIFTY 50. Their decisions go through research, a fund manager and a dealer who executes the order. Domestic institutions are grouped as DIIs and foreign ones as FIIs/FPIs in NSE data. Because they hold so much, they rarely trade in one shot and they use execution algorithms to limit impact; Module 2.4 covers this. Most invest mainly in cash equities and use derivatives mostly to hedge or to adjust exposure.`,
      eg: {
        title: 'Why a fund cannot just click Buy (illustrative)',
        text: `A fund wants to invest ₹100 crore in a stock priced ₹1,000, which is 10 lakh shares. The stock trades about 50 lakh shares a day, so 10 lakh is 20% of a full day's volume. If the fund bought it all at once it would push the price up against itself. It may spread the buying over several days, which shows up on charts as quiet but steady accumulation.`,
      },
      tip: `Institutional size changes how they trade. Their trades are usually slow, planned and spread out.`,
      visual: {
        kind: 'bars',
        title: 'Order of 10 lakh shares versus daily volume',
        caption: 'Illustrative stock trading 50 lakh shares a day.',
        unit: ' lakh shares',
        items: [
          { label: 'Fund order', value: 10, tone: 'gold' },
          { label: 'Average daily volume', value: 50, tone: 'ice' },
        ],
      },
    },
    {
      t: 6,
      def: `FPI stands for Foreign Portfolio Investor; FII (Foreign Institutional Investor) is the older name still used in NSE reports. These are overseas funds that buy Indian shares and bonds through SEBI registration. They are an important source of money for Indian markets.`,
      hi: `FPI ka full form Foreign Portfolio Investor hai, aur FII (Foreign Institutional Investor) purana naam hai jo NSE reports mein ab bhi dikhta hai. Yeh videshi funds hote hain jo SEBI registration ke through Indian shares aur bonds mein invest karte hain. Indian market ke liye yeh paise ka bada source hain.`,
      how: `FPIs register under the SEBI (FPI) Regulations, 2019, trade through a custodian bank and settle via NSDL or CDSL. Each FPI is generally limited to below 10% of a company's paid-up capital, and all FPIs together face the company's aggregate or sectoral limit; check current rules. FPI flows depend on global factors: US interest rates, the dollar, global risk appetite and India's relative valuation, not only on India news. They are active in cash and in index futures and options, so FII data appears in both the cash and the derivatives reports.`,
      eg: {
        title: 'Reading a day of flows (illustrative)',
        text: `Suppose FIIs net sell ₹3,000 crore in cash and DIIs net buy ₹2,500 crore on the same day. Net institutional flow = −3,000 + 2,500 = −₹500 crore. Foreign selling was larger than domestic buying, but a ₹500 crore gap by itself does not tell you where NIFTY will go; prices also depend on retail, prop and arbitrage flows. A single day is noise; look at weeks and context.`,
      },
      tip: `FII selling does not mean FIIs are bearish on India. It may be a global asset-allocation shift or a hedge.`,
      visual: {
        kind: 'flow',
        title: 'Route of foreign money into Indian shares',
        caption: 'Simplified; actual routes depend on the investor type.',
        steps: [
          { label: 'Overseas fund', note: 'pension, sovereign, mutual fund', tone: 'ice' },
          { label: 'SEBI-registered FPI', note: 'through a DDP', tone: 'gold' },
          { label: 'Custodian bank', note: 'settles via NSDL/CDSL', tone: 'ice' },
          { label: 'NSE order book', note: 'cash and F&O', tone: 'neutral' },
        ],
      },
      calc: { id: 'return-calc', preset: { start: 3000, end: 2500, years: 1 }, why: 'Quick percentage and difference check between two flow figures.' },
    },
    {
      t: 7,
      def: `DII stands for Domestic Institutional Investor: Indian mutual funds, insurance companies, banks and pension funds. NSE publishes their daily net buying and selling in the cash market. They are a steady counterweight to foreign flows.`,
      hi: `DII ka matlab Domestic Institutional Investor: Indian mutual funds, insurance companies, banks aur pension funds. NSE roz inka net buy aur sell cash market mein dikhata hai. Yeh foreign flows ke saamne ek stable balance ka kaam karte hain.`,
      how: `DIIs are largely fed by domestic savings, especially mutual fund SIPs, which AMFI data shows to be roughly ₹26,000 to ₹29,000 crore a month in 2025; verify the latest figure. Because SIP money comes in every month regardless of the market level, DIIs often buy when FIIs sell. DIIs mainly trade in cash equities; their F&O activity is limited. In NSE data DII is a separate category from Client, FII and Pro.`,
      eg: {
        title: 'DIIs absorbing FII selling (illustrative)',
        text: `On a day when FIIs sell ₹3,000 crore and DIIs buy ₹2,500 crore, domestic money absorbs 2,500 ÷ 3,000 = 83.3% of the foreign selling. The remaining ₹500 crore is picked up by other participants or shows as price pressure. This is the reason Indian markets often fall less than before when FIIs sell.`,
      },
      tip: `DII buying is not a guarantee of a rise; it only means domestic institutions bought more than they sold that day.`,
      visual: {
        kind: 'bars',
        title: 'One day of cash flows, ₹ crore (illustrative)',
        caption: 'FII selling is partly matched by DII buying.',
        unit: ' Cr',
        items: [
          { label: 'FII net sell', value: 3000, tone: 'bear' },
          { label: 'DII net buy', value: 2500, tone: 'bull' },
        ],
      },
    },
    {
      t: 8,
      def: `A mutual fund pools money from many investors and invests it in a portfolio. Investors hold units, and the fund's value per unit is called NAV (Net Asset Value). In India mutual funds are regulated by SEBI.`,
      hi: `Mutual fund bahut saare investors ka paisa ek jagah jama karke ek portfolio mein lagata hai. Investor ke paas units hote hain aur ek unit ki value ko NAV (Net Asset Value) kehte hain. India mein mutual funds SEBI regulate karta hai.`,
      how: `A fund manager invests in line with the scheme's stated objective. Under SEBI rules, mutual funds can use derivatives for hedging, portfolio balancing and permitted strategies within set limits, not for unlimited speculation. Arbitrage funds are a good example: they buy shares in cash and sell futures to lock a small gap, aiming for low-risk returns, though returns are not guaranteed. Mutual funds are counted as DIIs in NSE data.`,
      eg: {
        title: 'How an arbitrage fund earns its spread (illustrative)',
        text: `Spot NIFTY = 24,000, month-end futures = 24,100. The fund buys the basket and sells futures; at expiry the gap closes. Gain = 24,100 − 24,000 = 100 points × 65 = ₹6,500 per lot on a ₹15,60,000 exposure, which is 0.417% in about 30 days, roughly 5.1% annualised before costs and dividends. Spread, costs and dividends vary daily, so the actual outcome differs.`,
      },
      tip: `A big mutual fund trade is usually about investor inflows and outflows, not a prediction by the fund manager.`,
      visual: {
        kind: 'flow',
        title: 'Mutual fund money loop',
        caption: 'Illustrative.',
        steps: [
          { label: 'Investors', note: 'SIP and lump sum', tone: 'ice' },
          { label: 'Scheme NAV', note: 'units issued', tone: 'gold' },
          { label: 'Fund manager', note: 'buys shares and bonds', tone: 'ice' },
          { label: 'Redemptions', note: 'sell to return cash', tone: 'neutral' },
        ],
      },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24100, rate: 6.5, days: 30, dividend: 1.3 }, why: 'Checks whether the futures premium in the arbitrage example is near fair value.' },
    },
    {
      t: 9,
      def: `A hedge fund is a private pool of money that uses flexible strategies such as long-short, leverage, derivatives and short selling to earn returns. It serves wealthy or institutional investors, not the general public. In India, domestic funds of this type are Category III AIFs.`,
      hi: `Hedge fund ek private pool hota hai jo long-short, leverage, derivatives aur short selling jaisi flexible strategies se return banane ki koshish karta hai. Yeh sirf wealthy ya institutional investors ke liye hota hai, aam public ke liye nahi. India mein aise domestic funds Category III AIF kehlate hain.`,
      how: `Category III AIFs are regulated by SEBI, with a minimum investment of ₹1 crore per investor. Foreign hedge funds typically reach Indian markets through the FPI route, so they appear under FII in NSE data. They may take directional bets, but many run market-neutral or relative-value trades, so one leg of their position (such as a short future) may not be a bearish view. Leverage can magnify both gains and losses.`,
      eg: {
        title: 'Long-short exposure (illustrative)',
        text: `A hedge fund has ₹100 crore of long positions and ₹60 crore of short positions. Gross exposure = 100 + 60 = ₹160 crore. Net exposure = 100 − 60 = ₹40 crore, which is 40% of the ₹100 crore capital. So its direction risk is moderate even though total positions are large. If both legs are right it can profit in a falling market too; if both are wrong, the loss comes from both sides.`,
      },
      tip: `Never judge a hedge fund by one visible leg. A short position may be the offset to a long position you cannot see.`,
      visual: {
        kind: 'compare',
        title: 'Mutual fund versus hedge fund',
        caption: 'General features in India.',
        left: { head: 'Mutual fund', tone: 'ice', points: ['Open to all investors', 'Limited derivative use', 'Daily NAV', 'Counted as DII'] },
        right: { head: 'Hedge fund (Cat III AIF / foreign)', tone: 'gold', points: ['Wealthy and institutional investors', 'Long-short, leverage', 'Flexible strategies', 'Foreign ones count as FII'] },
      },
    },
    {
      t: 10,
      def: `A market maker is a firm that continuously quotes both a buy price (bid) and a sell price (ask) so that others can always trade. It earns the small difference, called the bid-ask spread. Its job is to provide liquidity, not to bet on direction.`,
      hi: `Market maker woh firm hoti hai jo hamesha buy (bid) aur sell (ask) dono price quote karti hai, taaki doosre log kabhi bhi trade kar sakein. Yeh bid-ask ka chhota sa difference kamati hai, jise spread kehte hain. Iska kaam liquidity dena hai, direction par bet lagana nahi.`,
      how: `When someone buys from the market maker at the ask, the market maker is left short and hedges the risk with futures or other options (delta hedging). If many buyers arrive, the market maker raises prices and widens the spread; in sudden volatility, spreads can widen sharply. Liquid NIFTY options have narrow spreads; far strikes and illiquid stocks have wide ones. Market makers are often prop firms, so their positions show up as Pro in the NSE data.`,
      eg: {
        title: 'Spread as a trading cost (illustrative)',
        text: `The 24,000 CE is quoted bid ₹98.50, ask ₹100.00. Spread = 1.50 points. For one lot of 65, the market maker earns up to 1.50 × 65 = ₹97.50 for completing a buy and a sell. If you buy at ₹100 and the bid is ₹98.50, you start with a ₹97.50 per lot disadvantage before any price move. This is a hidden cost for every option trader.`,
      },
      tip: `Always compare bid and ask before you click. A wide spread can eat more of your profit than brokerage does.`,
      visual: {
        kind: 'orderBook',
        title: '24,000 CE book near the best prices (illustrative)',
        caption: 'The gap between best bid and best ask is the market maker\'s spread.',
        bids: [[98.5, 650], [98.0, 1300], [97.5, 1950]],
        asks: [[100.0, 650], [100.5, 1300], [101.0, 1950]],
      },
      calc: { id: 'spread-cost', preset: { bid: 98.5, ask: 100, qty: 1, lotSize: 65 }, why: 'Turns the bid-ask gap into a rupee cost for one lot.' },
    },
    {
      t: 11,
      def: `An arbitrageur looks for the same asset or closely related assets trading at different prices and locks in the gap. For example, buy the cheap one and sell the expensive one at the same time. Their trades pull prices back to fair value.`,
      hi: `Arbitrageur woh hota hai jo ek hi asset ya milte-julte assets ke alag-alag price dekhta hai aur gap lock karta hai. Jaise sasta wala khareedna aur mehenga wala ek saath bechna. Inke trades ki wajah se prices wapas fair value par aate hain.`,
      how: `The classic Indian arbitrage is cash-and-carry: buy the stock or index basket in the cash market and sell the futures when futures are priced above fair value. Fair value depends on the interest rate, the days to expiry and dividends. Arbitrageurs must pay costs: brokerage, STT, financing and slippage. Real arbitrage is never completely risk-free; execution gaps, basis changes and early unwinds can all lose money. Arbitrage activity is one reason futures and spot stay close.`,
      eg: {
        title: 'A cash-futures gap (illustrative)',
        text: `Spot NIFTY = 24,000, futures = 24,200, 30 days to expiry, interest 6.5%, dividend 1.3%. Fair value is about 24,000 × e^((0.065 − 0.013) × 30/365) = about 24,103. Futures trade about 97 points above fair value. Selling futures and buying the basket earns roughly 97 × 65 = ₹6,305 per lot at expiry if executed perfectly, before costs. Costs and slippage can eat a lot of that, so the real profit is smaller.`,
      },
      tip: `Arbitrage profits are small per trade. Costs, not ideas, decide whether it works.`,
      visual: {
        kind: 'flow',
        title: 'Cash-and-carry arbitrage',
        caption: 'Used when futures are priced above fair value.',
        steps: [
          { label: 'Futures expensive', note: '24,200 vs fair 24,103', tone: 'gold' },
          { label: 'Sell futures, buy basket', note: 'both at once', tone: 'ice' },
          { label: 'Hold to expiry', note: 'gap converges', tone: 'ice' },
          { label: 'Square off', note: 'lock the difference', tone: 'neutral' },
        ],
      },
      calc: { id: 'basis-fair-value', preset: { spot: 24000, futures: 24200, rate: 6.5, days: 30, dividend: 1.3 }, why: 'Calculates fair value and the mispricing of the futures.' },
    },
    {
      t: 12,
      def: `An algorithmic trader uses computer programs to decide and place orders automatically based on set rules. The rules can be as simple as "buy when price crosses an average" or as complex as high-frequency market making. Algos can be run by retail, prop firms or institutions.`,
      hi: `Algo trader computer program se rules ke hisaab se orders khud decide karke place karta hai. Rule simple ho sakta hai jaise "average cross hone par buy" ya bahut complex jaise high-frequency market making. Algo retail, prop firms aur institutions, sab chala sakte hain.`,
      how: `An algorithm sends orders to the exchange through the broker's system and API. Institutions use execution algos such as VWAP and TWAP to split big orders into small ones. High-frequency firms use co-location and trade in microseconds. SEBI regulates algo trading, and exchanges approve strategies and require order tagging; rules for retail algo use through brokers' APIs have been evolving, so check the latest SEBI and NSE circulars. Algos remove emotion but not strategy risk: a wrong rule loses money faster.`,
      eg: {
        title: 'Slicing 1,000 lots (illustrative)',
        text: `An institution wants to buy 1,000 lots of NIFTY futures, that is 1,000 × 65 = 65,000 units. An algorithm sends 50 child orders of 20 lots (1,300 units) over an hour. If three child fills were 24,010, 24,012 and 24,015 for equal quantity, the average of those three is (24,010 + 24,012 + 24,015) ÷ 3 = 24,012.33. Smaller orders mean less market impact than one 1,000-lot order. Exchange freeze limits on order size also force splitting; check the current NSE limit.`,
      },
      tip: `A bot is not edge. A bad rule run automatically is still a bad rule.`,
      visual: {
        kind: 'flow',
        title: 'Parent order to child orders',
        caption: 'Illustrative execution algo.',
        steps: [
          { label: 'Parent order', note: '1,000 lots', tone: 'gold' },
          { label: 'Algo splits', note: '50 × 20 lots', tone: 'ice' },
          { label: 'Child orders hit NSE', note: 'over time', tone: 'ice' },
          { label: 'Fills averaged', note: 'VWAP or TWAP', tone: 'neutral' },
        ],
      },
      calc: { id: 'vwap-twap', preset: { fills: '24010:1300;24012:1300;24015:1300' }, why: 'Averages the child-order fills of the sliced order.' },
    },
  ],
  tools: [{ id: 'lot-value', why: 'Check what one lot costs and how much exposure it controls.' }],
}
export default m
