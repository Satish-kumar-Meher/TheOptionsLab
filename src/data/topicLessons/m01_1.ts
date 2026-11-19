import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '1.1',
  intro:
    'A financial market is simply a place (today, mostly a screen) where buyers and sellers meet to trade things of value: company shares, bonds, gold, currencies and contracts built on them. This module gives you the map of the whole territory, so that when you reach options you know exactly which corner of the market they live in and why they exist.',
  introHi:
    'Financial market ek aisi jagah hai (aajkal zyadatar screen par) jahan buyers aur sellers value wali cheezein trade karte hain: shares, bonds, gold, currency aur unse bane contracts. Is module mein hum poora naksha samjhenge, taaki jab aap options tak pahunchein toh aapko pata ho ki options market ke kis hisse mein hain aur kyun bane.',
  steps: {
    concept:
      'Think of a big vegetable mandi. Farmers bring produce, shopkeepers bring cash, and the price is settled by how many people want to buy versus sell. A financial market is the same idea for money-related things. It does two jobs: it helps businesses raise money from savers, and it gives savers a place to buy or sell their holdings later. Options are one product inside this big mandi, and they are a contract whose value depends on something else (like the Nifty), so you first need to know what that "something else" is.',
    conceptHi:
      'Ek bade sabzi mandi ki tarah socho. Kisan maal laate hain, dukandaar paisa laate hain, aur bhaav is baat se tay hota hai ki kitne log kharidna chahte hain aur kitne bechna. Financial market bhi yahi hai, bas paise se jude products ke liye. Iska kaam do hai: companies ko savers se paisa jutane mein madad karna, aur savers ko apne holdings baad mein buy ya sell karne ka platform dena. Options is mandi ka ek product hai, aur uski value kisi aur cheez (jaise Nifty) par depend karti hai, isliye pehle us "aur cheez" ko samajhna zaroori hai.',
    mechanism:
      'Money flows from people who have extra (savers and investors) to those who need it (companies, governments). In return the saver gets a claim: a share (ownership), a bond (a loan to be repaid with interest), or a contract. The first sale of such a claim by the issuer is the primary market. Every later resale between investors is the secondary market, run by exchanges like NSE and BSE under SEBI rules. Derivatives are a third layer: they do not raise money for anyone, they let people transfer or take price risk on an existing asset.',
    example: {
      title: 'One company, three markets',
      text: 'Suppose an illustrative company, Sundaram Foods, lists on the exchange at an IPO price of ₹100 (primary market: money goes to the company). A month later you buy 50 shares from another investor at ₹130 on NSE: ₹6,500 changes hands between the two of you and the company gets nothing (secondary market). If you only want to speculate on Nifty rather than own shares, you could instead trade a Nifty option, which is a derivative: no company receives your money, and the contract simply tracks the index.',
    },
    chart: {
      kind: 'flow',
      title: 'How money and risk move through the market',
      caption: 'Read left to right: savings become capital, capital becomes tradable claims, and derivatives sit on top of those claims.',
      steps: [
        { label: 'Savers and investors', note: 'households, funds, institutions', tone: 'ice' },
        { label: 'Primary market', note: 'IPO, bonds: issuer gets the money', tone: 'gold' },
        { label: 'Secondary market', note: 'NSE / BSE: investors trade with each other', tone: 'ice' },
        { label: 'Derivatives', note: 'futures and options on those assets', tone: 'neutral' },
      ],
    },
    optionChain:
      'An option chain is a list of option contracts on one underlying (for example NIFTY) for different strikes and expiries. It belongs to the derivatives market, so this module does not need it yet, but it is useful to see where it fits: the chain is built on the equity market (the Nifty is made of 50 company shares), and its prices only make sense when you know the spot index it follows. When you open a chain later, remember that the "underlying" printed at the top is an equity-market number.',
    psychology:
      'Beginners often treat the market like a casino because prices flicker all day. Long-term investors see it as part-ownership of businesses, hedgers see it as insurance, and speculators see it as a probability game. The same screen is read in three different ways. Knowing which role you are playing, and which role the person on the other side is playing, stops you from copying someone whose goal is different from yours.',
    scenarios: {
      bullish:
        'If you expect businesses to do well, the equity market is the natural place: buy shares or an index fund and hold. An options trader with the same view could buy a call option, which can gain if the index rises but can also lose the whole premium if it does not.',
      bearish:
        'If you expect a fall, a long-term investor may simply reduce holdings, while a hedger may use index futures or put options to protect a portfolio. Short-selling and derivatives are the tools that let you benefit or protect when prices fall, which the cash market alone makes hard.',
      sideways:
        'When the market goes nowhere, long-term investors lose little and simply wait. Option buyers face losses from time decay while sellers may collect premium, but sellers carry large risk if a sharp move eventually comes. Sideways does not mean safe.',
    },
    practice: [
      {
        q: 'You buy 100 shares of a listed company from another investor on NSE at ₹250. Is this the primary or the secondary market, and how much does the company receive?',
        a: 'Secondary market. Total value = 100 × ₹250 = ₹25,000, but the company receives ₹0 from this trade, because the money goes to the investor who sold. A company is paid only when it issues new shares (IPO, FPO, rights issue and similar).',
      },
      {
        q: 'Name the market (equity, commodity, currency or derivatives) for each: (a) buying Reliance shares, (b) a USD-INR futures contract, (c) a Nifty call option.',
        a: '(a) Equity market (cash segment). (b) Currency market, specifically a currency derivative. (c) Derivatives market, an option whose underlying is an equity index. Note that (b) and (c) are both derivatives, which shows that "derivatives" cuts across asset classes.',
      },
      {
        q: 'A friend says: "Derivatives raise money for companies." Correct him in two sentences.',
        a: 'Derivatives do not raise capital for the underlying company or government. They are contracts between two traders about the future price of an asset, used to hedge risk or to speculate, and the premium or margin paid stays between the market participants and the clearing system.',
      },
    ],
    assignment:
      'Open the NSE website (nseindia.com) and note down, in a notebook, five sections you can see: for example Equity, Derivatives, Currency, Commodity, Debt. For each, write one line on what is traded there and one real example (a company, an index or a currency pair). Do not place any trade.',
  },
  topics: [
    {
      t: 1,
      def: 'A financial market is a marketplace, physical or online, where people buy and sell financial assets such as shares, bonds, currencies, commodities and contracts based on them. Prices are set by demand and supply. Its two main jobs are to move money from savers to those who can put it to use, and to let holders sell when they need cash.',
      hi: 'Financial market ek aisi jagah hai jahan log shares, bonds, currency, commodity jaise financial assets buy aur sell karte hain. Price demand aur supply se tay hota hai. Iska kaam hai savers ka paisa un logon tak pahunchana jinhe uski zaroorat hai, aur jab holder ko cash chahiye ho toh use bechne ka rasta dena.',
      how: 'In India the main regulator is SEBI for securities markets, RBI for money, government securities and currency markets, and separate bodies for insurance and pensions. Trades happen on exchanges like NSE and BSE through registered brokers, and are guaranteed by clearing corporations. The market also gives "price discovery": thousands of buyers and sellers reveal what an asset is worth right now. Without that, a business owner or a farmer would not know a fair price to work with.',
      eg: {
        title: 'Kirana store vs the market',
        text: 'Your local kirana store owner needs ₹5 lakh to expand. He can borrow from a bank or, if he were a large company, invite thousands of people to put in small amounts by buying his shares. A market is the system that lets those thousands of strangers trust the deal, pay, and later sell their stake to someone else. The price they later get is not fixed by the store owner: it is whatever buyers and sellers agree to on that day.',
      },
      tip: 'Remember that a market is only a meeting place. It does not create value by itself and it does not guarantee that a price will go up.',
      visual: {
        kind: 'flow',
        title: 'The purpose of a financial market',
        caption: 'Savings flow to businesses; claims flow back to savers; the market lets claims be resold.',
        steps: [
          { label: 'Savers', note: 'have extra money', tone: 'ice' },
          { label: 'Market', note: 'matches buyers and sellers, discovers price', tone: 'gold' },
          { label: 'Businesses / government', note: 'need capital to grow', tone: 'ice' },
        ],
      },
    },
    {
      t: 2,
      def: 'The stock market is the part of the financial market where shares of listed companies are bought and sold. A share is a small piece of ownership in a company. In India the two main stock exchanges are the NSE and the BSE.',
      hi: 'Stock market financial market ka woh hissa hai jahan listed companies ke shares buy aur sell hote hain. Share ka matlab hai company ki ownership ka ek chhota tukda. India mein do main stock exchanges hain: NSE aur BSE.',
      how: 'A company becomes "listed" after meeting SEBI and exchange rules and offering shares to the public. From then on its shares trade every market day (normal cash-market session 9:15 am to 3:30 pm IST, as per current NSE timings, verify on the NSE site). You place an order through your broker, the exchange matches it with an opposite order, and the shares arrive in your demat account. If the company does well, the share price may rise and it may pay dividends; if it does badly, the price may fall and you can lose part or all of what you invested.',
      eg: {
        title: 'Owning a slice of a company',
        text: 'Illustrative: a company has 10 crore shares and the market price is ₹200, so its market capitalisation is 10,00,00,000 × ₹200 = ₹2,000 crore. If you buy 100 shares for ₹20,000, you own 100 / 10,00,00,000 = 0.00001% of it. If the price rises to ₹230 your holding is worth ₹23,000 (+₹3,000, or 15%); if it falls to ₹170 it is worth ₹17,000 (-₹3,000, or 15%).',
      },
      tip: 'A cheap-looking share price (₹20) does not mean a cheap company, and an expensive price (₹5,000) does not mean an expensive one. Compare value, not the number on the screen.',
      visual: {
        kind: 'flow',
        title: 'A share trade from tap to demat',
        steps: [
          { label: 'You place order', note: 'via broker app', tone: 'ice' },
          { label: 'Exchange matches', note: 'NSE / BSE', tone: 'gold' },
          { label: 'Clearing', note: 'trade guaranteed', tone: 'neutral' },
          { label: 'Demat credit', note: 'shares in your account', tone: 'ice' },
        ],
      },
      calc: {
        id: 'return-calc',
        preset: { start: 20000, end: 23000, years: 1 },
        why: 'Checks the 15% gain in the example: (23,000 - 20,000) / 20,000.',
      },
    },
    {
      t: 3,
      def: 'The primary market is where a company sells its shares or bonds for the first time and receives the money. The secondary market is where those already-issued securities are resold between investors. The IPO (Initial Public Offering) is the best-known primary-market event.',
      hi: 'Primary market woh hai jahan company pehli baar apne shares ya bonds bechti hai aur paisa company ko milta hai. Secondary market woh hai jahan pehle se issue ho chuke shares investors ke beech resell hote hain. IPO primary market ki sabse famous event hai.',
      how: 'In an IPO the company, with merchant bankers, sets a price band and opens the issue for a few days; you apply through your broker or bank using UPI or ASBA, and shares are allotted by a process regulated by SEBI. After listing, the shares move to the secondary market, where the price is set by trading every second. Almost everything you do as a trader, including all index options, happens in the secondary or derivatives market, not the primary one.',
      eg: {
        title: 'IPO application vs normal buying',
        text: 'Illustrative IPO: price band ₹95 to ₹100, lot of 150 shares. The minimum application at the top of the band is 150 × ₹100 = ₹15,000. If you are allotted shares, the money goes to the company (after issue expenses). Three months later, if you sell those 150 shares on NSE at ₹120 for ₹18,000, the buyer, not the company, pays you; the company is not involved at all.',
      },
      tip: 'IPO means the company is selling, not that it is cheap. Read the offer document (DRHP / RHP) before applying, because allotment is not a guarantee of listing gain.',
      visual: {
        kind: 'compare',
        title: 'Primary vs secondary market',
        left: {
          head: 'Primary market',
          tone: 'gold',
          points: ['New shares or bonds issued', 'Money goes to the company', 'Price band decided by company and bankers', 'Example: IPO, rights issue'],
        },
        right: {
          head: 'Secondary market',
          tone: 'ice',
          points: ['Existing shares resold', 'Money goes to the selling investor', 'Price set by live demand and supply', 'Example: buying on NSE / BSE'],
        },
      },
    },
    {
      t: 4,
      def: 'The equity market deals in equity, which means ownership shares of companies. An equity holder is a part-owner who shares in profits (through dividends and price growth) and also in losses. Equity is usually riskier than a fixed deposit but has historically offered higher long-term growth potential.',
      hi: 'Equity market mein companies ki ownership ke shares trade hote hain. Equity holder company ka partner hota hai, toh profit mein bhi hissa milta hai aur loss mein bhi. Equity usually fixed deposit se risky hoti hai, lekin long term mein growth ka potential zyada rehta hai, guarantee nahi.',
      how: 'Equity can be traded in two ways in India. In the cash segment you pay the full price and the shares are delivered to your demat account (settled T+1 as per current rules, meaning one working day after the trade). In the derivatives segment you trade contracts based on shares or indices without taking delivery. Index funds and ETFs, which follow indices like the Nifty 50, are also equity products. The Nifty 50 is the "underlying" for the most popular index options.',
      eg: {
        title: 'Equity vs fixed deposit',
        text: 'Illustrative only, not a forecast. ₹1,00,000 in an FD at 7% grows to ₹1,07,000 in one year with the amount known in advance. ₹1,00,000 in an equity index fund could end the year at ₹1,15,000 (+15%) in a good year or ₹88,000 (-12%) in a bad year. The FD gives certainty, equity gives a range of outcomes that includes losses.',
      },
      tip: 'Higher return potential always comes with higher uncertainty. Equity money should be money you can leave alone for years.',
      visual: {
        kind: 'compare',
        title: 'Equity vs fixed deposit (illustrative)',
        left: { head: 'Equity', tone: 'ice', points: ['Ownership stake', 'Return not fixed', 'Can fall as well as rise', 'Tradable daily'] },
        right: { head: 'Fixed deposit', tone: 'gold', points: ['A loan to the bank', 'Return fixed in advance', 'Principal protected up to bank limits', 'Premature withdrawal may carry a penalty'] },
      },
    },
    {
      t: 5,
      def: 'The derivatives market trades contracts whose value is derived from another asset, called the underlying: a stock, an index, a commodity or a currency. Futures and options are the two main types. A derivative has no independent value; it moves because the underlying moves.',
      hi: 'Derivatives market mein aise contracts trade hote hain jinki value kisi doosre asset (underlying) se derive hoti hai, jaise stock, index, commodity ya currency. Futures aur options do main types hain. Derivative ki apni independent value nahi hoti, woh underlying ke saath move karti hai.',
      how: 'Think of paying a small token amount to book a flat: you control a big asset by paying a small part of its value, and your profit or loss depends on how the asset moves until the deal ends. In India, derivatives trade on NSE and BSE and are regulated by SEBI; the clearing corporation guarantees performance and collects margin. Index derivatives such as Nifty options are cash-settled: no shares change hands, only rupees. Because small money controls a big position, gains and losses are both magnified.',
      eg: {
        title: 'Small premium, big exposure',
        text: 'Illustrative: Nifty is at 24,000 and the lot size is 65. One lot of Nifty exposure is 24,000 × 65 = ₹15,60,000. A call option on that lot may cost, say, ₹120 per unit, so you pay 120 × 65 = ₹7,800. You get exposure to a ₹15.6 lakh index move for ₹7,800, but if the option expires worthless you lose the whole ₹7,800. Lot sizes are revised by NSE from time to time, so check the current contract specification.',
      },
      tip: 'Leverage works in both directions. Learn how a contract behaves before you worry about how to profit from it.',
      visual: {
        kind: 'layers',
        title: 'Derivatives sit on top of an underlying',
        caption: 'The derivative cannot exist without the asset beneath it.',
        layers: [
          { label: 'Futures and options', note: 'contracts, cash or physical settlement', tone: 'gold' },
          { label: 'Underlying: index, stock, commodity, currency', note: 'where the price really comes from', tone: 'ice' },
          { label: 'Real economy', note: 'companies, farmers, importers, exporters', tone: 'neutral' },
        ],
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 120, lotSize: 65, lots: 1, spot: 24000 },
        why: 'Shows premium paid versus total contract value for one Nifty lot.',
      },
    },
    {
      t: 6,
      def: 'The commodity market trades physical goods such as gold, silver, crude oil, natural gas, metals and farm produce, mostly through futures contracts. Prices follow global and local supply and demand. In India the main commodity exchanges are MCX and NCDEX.',
      hi: 'Commodity market mein gold, silver, crude oil, metals aur kheti ki cheezein jaise physical goods ke contracts trade hote hain, zyadatar futures ke form mein. Price global aur local demand-supply se chalta hai. India mein main commodity exchanges MCX aur NCDEX hain.',
      how: 'A gold futures contract, for instance, lets a jeweller lock a price today for a purchase later, while a trader can take a view on gold without ever seeing a bar. Commodity prices are driven by weather, crop size, global demand, the US dollar and geopolitics. SEBI regulates commodity derivatives, and exchanges such as MCX list contracts with fixed lot sizes and expiry dates. Some contracts settle in cash and some by physical delivery, so always check the contract specification.',
      eg: {
        title: 'A jeweller locks a gold price',
        text: 'Illustrative: a jeweller expects to buy gold in three months and fears prices will rise. If he buys a gold futures contract now at ₹72,000 per 10 grams and the price later moves to ₹75,000, his futures gain of ₹3,000 per 10 grams offsets the higher cost of buying real gold. If gold instead falls to ₹69,000 he loses ₹3,000 on the contract but buys the real metal cheaper. He gave up the chance of a bargain in return for certainty.',
      },
      tip: 'Commodity prices can be very sensitive to global news. Trade them only after reading how the specific contract settles and what its lot size is.',
      visual: {
        kind: 'compare',
        title: 'Equity vs commodity market',
        left: { head: 'Equity', tone: 'ice', points: ['Underlying: company shares', 'Value from business profits', 'NSE, BSE'] },
        right: { head: 'Commodity', tone: 'gold', points: ['Underlying: gold, crude, metals, crops', 'Value from supply and demand', 'MCX, NCDEX'] },
      },
    },
    {
      t: 7,
      def: 'The currency (forex) market is where one currency is exchanged for another, for example US dollars for Indian rupees. The price of one currency in terms of another is the exchange rate. In India, exchange-traded currency derivatives such as USD-INR futures and options are available on NSE and BSE.',
      hi: 'Currency market mein ek currency ko doosri currency se exchange kiya jaata hai, jaise US dollar ko rupee se. Ek currency ka doosri currency mein price exchange rate kehlata hai. India mein NSE aur BSE par USD-INR jaise currency futures aur options trade hote hain.',
      how: 'Exchange rates move with trade flows, interest-rate differences, foreign investment flows and RBI action in the market. Importers who must pay dollars later, and exporters who will receive dollars later, use currency derivatives to fix their rate. Retail traders can trade the exchange-listed currency derivatives, which are regulated by SEBI and RBI under the permitted pairs. Trading in unauthorised overseas forex platforms is not permitted for Indian residents, so check the current RBI and SEBI position before acting.',
      eg: {
        title: 'Importer and the rupee',
        text: 'Illustrative: an Indian company must pay $1,00,000 in three months. At ₹85 per dollar that costs ₹85,00,000. If the rupee weakens to ₹88 the same bill becomes ₹88,00,000, an extra ₹3,00,000. By fixing the rate today using a currency futures contract, the company removes this surprise, at the cost of also giving up any gain if the rupee strengthens.',
      },
      tip: 'Exchange rates are a ratio, so there are always two sides to every move. A weaker rupee helps exporters and hurts importers.',
      visual: {
        kind: 'matrix',
        title: 'Who gains when the rupee weakens (USD-INR rises)?',
        xLabels: ['Pays in dollars', 'Earns in dollars'],
        yLabels: ['Rupee weakens', 'Rupee strengthens'],
        cells: [
          { head: 'Importer pays more', note: 'cost rises in rupees', tone: 'bear' },
          { head: 'Exporter earns more', note: 'revenue rises in rupees', tone: 'bull' },
          { head: 'Importer pays less', note: 'cost falls in rupees', tone: 'bull' },
          { head: 'Exporter earns less', note: 'revenue falls in rupees', tone: 'bear' },
        ],
      },
    },
    {
      t: 8,
      def: 'In the cash market you pay the full price for an asset and get it delivered to you (shares go to your demat account). In the derivatives market you trade a contract on that asset by paying only a margin or a premium, and the contract ends on an expiry date. Cash market is "own the asset"; derivatives is "own a contract about the asset".',
      hi: 'Cash market mein aap poora paisa dekar asset kharidte ho aur woh aapke demat account mein aa jaata hai. Derivatives market mein aap asset ka contract trade karte ho, jisme sirf margin ya premium dena padta hai, aur contract expiry par khatam ho jaata hai. Cash market matlab asset ke maalik; derivatives matlab asset ke upar ek contract.',
      how: 'In the cash segment a stock bought with delivery is settled on T+1 and stays yours for as long as you like. In the derivatives segment a contract has a fixed expiry (index options on NSE expire on a weekly or monthly schedule per current NSE rules; verify the day on the NSE site). Futures need margin; option buyers pay the full premium, while sellers need margin. Index derivatives are settled in cash, so no shares are delivered. Also, a derivative has a time limit, so even a correct view can lose money if it arrives late.',
      eg: {
        title: 'Same view, two ways',
        text: 'Illustrative: you think a stock now at ₹2,000 will rise. Buying 100 shares in the cash market costs ₹2,00,000 and you may hold forever. Using one derivatives lot of, say, 100 shares needs only a margin of roughly 15 to 20 percent or a small option premium, but it expires, so if the rise takes two extra months you may miss it. Actual margins are set by the exchange and brokers; check live numbers.',
      },
      tip: 'Cash market rewards patience. Derivatives reward being right about direction and timing, and punish being right too late.',
      visual: {
        kind: 'compare',
        title: 'Cash market vs derivatives market',
        left: { head: 'Cash market', tone: 'ice', points: ['Full payment', 'Asset delivered to demat', 'No expiry', 'Loss limited to money invested'] },
        right: { head: 'Derivatives market', tone: 'gold', points: ['Margin or premium only', 'Contract, not the asset', 'Fixed expiry date', 'Loss can exceed margin for sellers'] },
      },
      calc: {
        id: 'lot-value',
        preset: { premium: 120, lotSize: 65, lots: 1, spot: 24000, marginPct: 12 },
        why: 'Compare the cash needed to own the exposure with the money needed for a derivatives lot (margin % here is only illustrative).',
      },
    },
    {
      t: 9,
      def: 'Investing means buying assets to hold for years, expecting them to grow with the business or the economy. Trading means buying and selling over short periods (minutes to weeks) to profit from price movements. Investors focus on value and growth; traders focus on price, timing and risk control.',
      hi: 'Investing ka matlab hai asset ko saalon tak hold karna, is umeed mein ki business ya economy ke saath woh badhega. Trading ka matlab hai chhote time (minutes se weeks) mein price movement se profit kamana. Investor value aur growth dekhta hai; trader price, timing aur risk control dekhta hai.',
      how: 'Investors make money mainly from business growth, dividends and compounding, and they earn it slowly with fewer transactions and lower costs. Traders make money (or lose it) from price swings, so they pay brokerage, taxes and charges again and again, and they need strict stop-losses. SEBI studies of the Indian F&O segment have repeatedly found that a large majority of individual traders lose money, so options trading is not a shortcut to wealth. Tax treatment also differs: short-term gains, long-term gains and business income on derivatives are taxed differently, so check current rules or consult a tax professional.',
      eg: {
        title: 'Same ₹1,00,000, two styles',
        text: 'Illustrative: an investor puts ₹1,00,000 in an index fund and it grows to ₹2,00,000 over 7 years, a compound return of about 10.4% a year. A trader uses the same ₹1,00,000 to take 40 trades a month. If each trade costs about ₹300 in charges, that is 40 × 300 = ₹12,000 a month or ₹1,44,000 a year in costs alone, more than the entire capital, before any price losses. Costs and discipline decide outcomes.',
      },
      tip: 'Decide whether you are investing or trading before you click buy; do not let a failed trade turn into a "long-term investment".',
      visual: {
        kind: 'compare',
        title: 'Investing vs trading',
        left: { head: 'Investing', tone: 'ice', points: ['Years', 'Business value and growth', 'Few transactions', 'Lower costs'] },
        right: { head: 'Trading', tone: 'gold', points: ['Minutes to weeks', 'Price movement and timing', 'Many transactions', 'Higher costs, strict stop-loss needed'] },
      },
      calc: {
        id: 'return-calc',
        preset: { start: 100000, end: 200000, years: 7 },
        why: 'Gives the compound annual growth rate (CAGR) of the investor example.',
      },
    },
    {
      t: 10,
      def: 'Speculation is taking a risk on a price move hoping to profit. Hedging is taking a position that reduces an existing risk, like insurance. Arbitrage is exploiting a small price difference for the same asset in two places or forms, trying to earn with little or no price risk.',
      hi: 'Speculation mein aap price move par risk lekar profit ki umeed karte ho. Hedging mein aap aisa position lete ho jo pehle se maujood risk ko kam kare, bilkul insurance ki tarah. Arbitrage mein aap ek hi asset ke do jagah ya do form mein price difference se kam risk mein kamane ki koshish karte ho.',
      how: 'Speculators provide much of the trading activity and liquidity, but they carry the risk of loss. Hedgers, such as an investor holding a large share portfolio, may sell index futures or buy puts to cut the effect of a market fall; the hedge has a cost or gives up some gains. Arbitrageurs, usually professional firms with fast systems, buy in the cheaper place and sell in the costlier one, which keeps prices aligned (for example between spot and futures). Retail traders often call something an arbitrage when it still has real risks like execution gaps, so be careful with the word.',
      eg: {
        title: 'Car insurance logic',
        text: 'Illustrative hedge: you hold shares worth ₹31,20,000 that behave like the Nifty. One Nifty future lot at 24,000 with lot size 65 covers ₹15,60,000, so selling 2 lots hedges the whole portfolio. If Nifty falls 5% (24,000 to 22,800, which is 1,200 points) your shares lose about ₹1,56,000 but the short futures gain 2 × 65 × 1,200 = ₹1,56,000. You are protected, but if the market had risen you would have lost the same amount on futures, and a mismatch (beta, basis) makes real hedges imperfect. Arbitrage illustration: a share at ₹500.00 on NSE and ₹500.60 on BSE gives ₹0.60 × 1,000 = ₹600 before costs, which charges can easily eat.',
      },
      tip: 'The same instrument can be speculation for one person and a hedge for another. What matters is whether it adds risk or removes it from your overall position.',
      visual: {
        kind: 'compare',
        title: 'Speculation vs hedging',
        caption: 'Arbitrage is a third role: locking a small price gap, which needs speed and low costs.',
        left: { head: 'Speculation', tone: 'gold', points: ['Adds risk', 'Hopes to gain from a move', 'Loss is possible'] },
        right: { head: 'Hedging', tone: 'ice', points: ['Reduces existing risk', 'Like insurance: has a cost', 'May give up some gains'] },
      },
      calc: {
        id: 'hedge-ratio',
        preset: { portfolio: 3120000, beta: 1, futuresNotional: 1560000 },
        why: 'Gives the number of futures lots needed to hedge the portfolio in the example.',
      },
    },
  ],
}
export default m
