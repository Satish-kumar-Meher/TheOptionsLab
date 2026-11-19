import type { ModuleLesson } from '../topicLessonTypes'

const m: ModuleLesson = {
  moduleId: '1.2',
  intro: `Every trade you will ever place passes through a chain of institutions: your broker, the exchange, the clearing corporation, the depository, and the regulator watching over all of them. This module introduces each one in plain words, so that when you click "Buy" on a Nifty option you know who is doing what behind the screen and why your money and shares are safe.`,
  introHi: `Aap jo bhi trade karte ho woh ek chain se guzarta hai: aapka broker, exchange, clearing corporation, depository aur in sab par nazar rakhne wala regulator. Is module mein hum har ek ko simple bhasha mein samjhenge, taaki jab aap Nifty option par "Buy" dabao toh aapko pata ho ki parde ke peeche kaun kya kar raha hai aur aapka paisa aur shares kyun safe rehte hain.`,
  steps: {
    concept: `Think of an IPL match. The stadium (exchange) provides the ground and the rules of play. The BCCI-appointed umpires and the match referee (SEBI) make sure nobody cheats. The ticket counter (stockbroker) is how you, the fan, get in. The strongroom that keeps the trophy and records safely (depository) is separate from the stadium. And the cashier who makes sure every team and sponsor actually gets paid (clearing corporation) works quietly in the back. Our market has the same split of jobs on purpose: no single player both runs the game and holds your money.`,
    conceptHi: `IPL match ke baare mein socho. Stadium (exchange) ground aur rules deta hai. Umpire aur match referee (SEBI) dekhte hain ki koi cheating na kare. Ticket counter (stockbroker) se aap, fan, andar jaate ho. Trophy aur records ko safe rakhne wala strongroom (depository) stadium se alag hota hai. Aur peeche baithkar sabko paisa milna pakka karne wala cashier (clearing corporation) hai. Hamare market mein bhi kaam jaanbujhkar alag-alag baante gaye hain, taaki koi ek party game bhi chalaye aur aapka paisa bhi rakhe, aisa na ho.`,
    mechanism: `You place a buy order with your broker. The broker's system sends it to the exchange (NSE or BSE), where it is matched with a seller electronically. The trade details then go to the clearing corporation (NSE Clearing or Indian Clearing Corporation), which steps in between the two parties, collects margin and guarantees the trade. On settlement day, securities move between depository accounts (NSDL or CDSL) and money moves between bank accounts. SEBI writes the rules for all of these entities and can inspect, fine or bar anyone who breaks them.`,
    example: {
      title: `One buy order, five institutions`,
      text: `Say you buy 20 shares of an illustrative company at ₹1,250 on a Monday. The amount is 20 × ₹1,250 = ₹25,000. Your broker's app sends the order to NSE, where it matches with a seller within a second. The clearing corporation records that you owe ₹25,000 and the seller owes 20 shares. As per the current T+1 cycle, the shares reach your demat account (held with NSDL or CDSL through your broker as depository participant) by the next working day, Tuesday. SEBI is not in the trade at all, but its rules decide how every one of the four parties above must behave.`,
    },
    chart: {
      kind: `flow`,
      title: `Journey of one order through the market`,
      caption: `Read left to right: you talk only to your broker, but four other institutions do their part before the trade is complete.`,
      steps: [
        { label: `You and your broker`, note: `order placed on the app`, tone: `ice` },
        { label: `Stock exchange`, note: `NSE or BSE matches buyer and seller`, tone: `gold` },
        { label: `Clearing corporation`, note: `guarantees and nets the trade`, tone: `neutral` },
        { label: `Depository`, note: `NSDL or CDSL moves the shares`, tone: `ice` },
      ],
    },
    optionChain: `An option chain is a screen published by the exchange, and every contract on it is created, cleared and guaranteed by the institutions in this module. The strikes, expiry dates and lot size you see are decided by NSE under SEBI approval. The margin you must keep to sell an option is calculated by the clearing corporation. And because index options are cash-settled, no shares move through NSDL or CDSL at expiry: only rupees move.`,
    psychology: `Beginners often worry, "What if my broker runs away with my money or shares?" The structure here is designed to answer exactly that fear: shares sit in your own demat account, the clearing corporation guarantees the trade, and SEBI can act against brokers. A new trader who understands this stops obsessing over safety of the system and focuses on the real risk, which is the trade itself. A reasonable habit is still to use only a SEBI-registered broker and to read every contract note.`,
    scenarios: {
      bullish: `You expect the market to rise and buy shares or a Nifty call. The exchange matches you, the clearing corporation collects the money or margin, and shares (for a cash purchase) land in your demat account. If you are right, you may profit, and if you are wrong the structure does not protect you from the loss on the trade itself.`,
      bearish: `You expect a fall. You may sell shares you own, or take a short position in futures or buy a put. The same chain of institutions handles the trade. Selling shares you do not own is a speculative derivatives or intraday matter, and it needs margin that the clearing corporation requires.`,
      sideways: `When the market is quiet the institutions still do their work every day: daily mark-to-market, margin collection and settlement continue. Holding positions in a sideways market has costs (brokerage and, for options, time decay), so a quiet screen is not the same as a free one.`,
    },
    practice: [
      {
        q: `You buy 40 shares at ₹375 on NSE on a Monday. How much money is involved, and where will the shares be held?`,
        a: `Value = 40 × ₹375 = ₹15,000. The trade is matched on NSE and guaranteed by the clearing corporation. The shares are held in electronic form in your demat account with a depository (NSDL or CDSL) through your depository participant, and under the T+1 cycle they should be credited by the next working day. Your broker does not own them.`,
      },
      {
        q: `Match each to its job: (a) SEBI, (b) NSE, (c) NSDL, (d) NSE Clearing. Jobs: 1) keeps shares in electronic form, 2) matches buy and sell orders, 3) guarantees that trades are completed, 4) makes rules and supervises the market.`,
        a: `(a) SEBI: 4, the rule-maker and supervisor. (b) NSE: 2, the trading platform. (c) NSDL: 1, a depository. (d) NSE Clearing: 3, the guarantor of trade completion. Notice that no one institution does two of these jobs.`,
      },
      {
        q: `One lot of NIFTY futures has 65 units and Nifty is at 24,000. What is the contract value, and what would 12% margin (illustrative) be? Which institution collects the margin?`,
        a: `Contract value = 24,000 × 65 = ₹15,60,000. Margin at 12% = 15,60,000 × 0.12 = ₹1,87,200 (illustrative; the real margin is set by the clearing corporation using the SPAN system and changes often). The broker collects it from you on behalf of the clearing corporation, and the lot size should be checked on the current NSE contract specification.`,
      },
      {
        q: `A friend says, "SEBI runs the NSE." Is that correct?`,
        a: `No. NSE is a company that runs a trading platform, a stock exchange recognised under the law. SEBI is the statutory regulator that sets rules for NSE, BSE, brokers, depositories and clearing corporations, and it can inspect and penalise them. The referee does not own the stadium.`,
      },
    ],
    assignment: `Log in to your broker app and find three things: your broker's SEBI registration number (usually shown on the website footer), your demat account number type (DP ID with NSDL or Client ID with CDSL), and the contract note format after any past trade. Then visit sebi.gov.in and use the "Intermediaries" section to confirm your broker is registered. Do not place any trade.`,
  },
  topics: [
    {
      t: 1,
      def: `NSE stands for National Stock Exchange of India. It is a company that runs an electronic marketplace where shares, index and stock derivatives, currency contracts and bonds are traded. Based in Mumbai, it is where NIFTY options, the contracts you will study in this course, are traded.`,
      hi: `NSE ka matlab hai National Stock Exchange of India. Yeh ek company hai jo electronic marketplace chalati hai jahan shares, index aur stock derivatives, currency contracts aur bonds trade hote hain. Yeh Mumbai mein hai aur isi par NIFTY options trade hote hain, jo hum is course mein padhenge.`,
      how: `NSE was set up in 1992, recognised as a stock exchange in 1993, and began screen-based trading in its equity market in 1994. This replaced the old open-outcry pits with computers, so a buyer in Surat and a seller in Chennai can be matched in a fraction of a second. NSE later introduced index futures (2000) and index options (2001). Its flagship index is the NIFTY 50, and its derivatives segment is among the busiest in the world by the number of contracts traded. NSE is regulated by SEBI and its trades are guaranteed by its own clearing arm, NSE Clearing.`,
      eg: {
        title: `A Nifty contract on NSE`,
        text: `One lot of NIFTY has 65 units (check the current NSE contract specification). With Nifty at 24,000, one lot of futures has a notional value of 24,000 × 65 = ₹15,60,000. You do not need ₹15.6 lakh to trade it, only margin, but the exchange lists the contract, publishes live prices and matches every order. That listing, matching and price-publishing job is what an exchange does.`,
      },
      tip: `NSE is the venue, not your broker and not the regulator. You never trade with NSE directly; you trade through a broker who is its member.`,
      visual: {
        kind: `timeline`,
        title: `NSE milestones`,
        caption: `Years as per NSE's own history; check nseindia.com for the full list.`,
        events: [
          { when: `1992`, what: `NSE incorporated`, tone: `neutral` },
          { when: `1994`, what: `Electronic trading begins in the equity market`, tone: `gold` },
          { when: `2000`, what: `Index futures introduced`, tone: `ice` },
          { when: `2001`, what: `Index options introduced`, tone: `ice` },
        ],
      },
      calc: { id: `lot-value`, preset: { spot: 24000, lotSize: 65, lots: 1, premium: 100, marginPct: 12 }, why: `See what one lot of a NIFTY contract is worth on the exchange.` },
    },
    {
      t: 2,
      def: `BSE, formerly the Bombay Stock Exchange, is India's oldest stock exchange, founded in 1875 and based at Dalal Street, Mumbai. Its famous index is the SENSEX, made of 30 large companies. Like NSE, it is a company that provides a platform for trading.`,
      hi: `BSE, yaani pehle ka Bombay Stock Exchange, India ka sabse purana stock exchange hai. Yeh 1875 mein shuru hua tha aur Dalal Street, Mumbai mein hai. Iska famous index SENSEX hai jisme 30 bade companies hain. NSE ki tarah yeh bhi ek company hai jo trading ka platform deti hai.`,
      how: `BSE began as an informal gathering of brokers under a banyan tree and became a formal association in 1875. It moved to electronic trading in 1995. It has the largest number of listed companies in India, many of them small, while NSE tends to see most of the trading volume in shares and derivatives. BSE lists derivatives on SENSEX, and its clearing arm is Indian Clearing Corporation (ICCL). Both exchanges follow the same SEBI framework, so a rule such as T+1 settlement applies to both.`,
      eg: {
        title: `Same company, two exchanges`,
        text: `A large company such as an illustrative Tata or Reliance type stock is usually listed on both NSE and BSE. Suppose it trades at ₹2,400 on NSE and ₹2,400.50 on BSE. The two prices stay close because arbitrage traders buy where it is cheaper and sell where it is dearer. For 10 shares, the price gap of ₹0.50 is ₹5, which is why such tiny differences matter only to high-volume professionals.`,
      },
      tip: `Beginners confuse "BSE" with "SENSEX" and "NSE" with "NIFTY". The exchange is the marketplace; the index is a number computed from selected shares.`,
      visual: {
        kind: `compare`,
        title: `NSE vs BSE at a glance`,
        caption: `Both are SEBI-regulated; the differences are history, indices and where most derivative trading happens.`,
        left: { head: `NSE`, tone: `gold`, points: [`Set up 1992, electronic from 1994`, `Flagship index: NIFTY 50`, `NIFTY and BANKNIFTY options are its big derivative products`, `Clearing arm: NSE Clearing`] },
        right: { head: `BSE`, tone: `ice`, points: [`Founded 1875, Asia's oldest`, `Flagship index: SENSEX (30 stocks)`, `Lists SENSEX derivatives`, `Clearing arm: Indian Clearing Corporation`] },
      },
    },
    {
      t: 3,
      def: `SEBI is the Securities and Exchange Board of India, the government regulator of the securities market. It writes the rules that exchanges, brokers, depositories, mutual funds and listed companies must follow. Its main goal is to protect investors and keep the market fair and orderly.`,
      hi: `SEBI ka matlab hai Securities and Exchange Board of India. Yeh securities market ka sarkari regulator hai. Yeh exchanges, brokers, depositories, mutual funds aur listed companies ke liye rules banata hai. Iska main kaam investors ko protect karna aur market ko fair rakhna hai.`,
      how: `SEBI was formed in 1988 and given statutory powers by the SEBI Act of 1992. It issues regulations and circulars (for example on margins, lot sizes of derivatives, and disclosure norms), registers intermediaries such as brokers, investigates insider trading and price manipulation, and can fine, suspend or bar offenders. It also runs investor education and a complaint system called SCORES. Note that RBI separately looks after banks, currency and the money market, while SEBI handles the securities market.`,
      eg: {
        title: `A rule change that touches traders`,
        text: `SEBI circulars have, over the years, changed things like the settlement cycle (moving equity to T+1 in 2023) and the number of weekly expiries an exchange may offer on index options. A trader who ignores such circulars can wake up to find that a favourite expiry day or contract no longer exists. Always check the SEBI and NSE circular pages before relying on a rule you read in an old article.`,
      },
      tip: `SEBI does not tell you which share to buy and does not guarantee returns. It makes the game fair; it does not make you win.`,
      visual: {
        kind: `layers`,
        title: `Who watches whom`,
        caption: `Regulation sits on top; the layers below do the actual work.`,
        layers: [
          { label: `SEBI`, note: `rule-maker and supervisor`, tone: `gold` },
          { label: `Exchanges, clearing corporations, depositories`, note: `market infrastructure institutions`, tone: `ice` },
          { label: `Brokers, depository participants, mutual funds`, note: `intermediaries registered with SEBI`, tone: `neutral` },
          { label: `Investors and traders`, note: `you`, tone: `neutral` },
        ],
      },
    },
    {
      t: 4,
      def: `A stock exchange is an organised, regulated marketplace where buyers and sellers of securities meet through a common electronic system. It lists securities, shows live prices, matches orders by fixed rules and publishes trade information. In India it must be recognised by SEBI under the Securities Contracts (Regulation) Act.`,
      hi: `Stock exchange ek organised aur regulated marketplace hai jahan securities ke buyers aur sellers ek common electronic system par milte hain. Yeh securities ko list karta hai, live price dikhata hai, orders ko fixed rules se match karta hai aur trade ki jaankari publish karta hai. India mein ise SEBI se recognition lena padta hai.`,
      how: `The exchange runs an order book for every security: buy orders (bids) sit on one side, sell orders (asks) on the other, and the system matches them by price first and then by time. It also sets rules like price bands, trading hours (normal market 9:15 am to 3:30 pm, as per currently published rules) and circuit breakers. It monitors members for misconduct and publishes data such as option chains, volumes and open interest. The exchange itself does not trade for profit in the securities; it earns fees from members and data.`,
      eg: {
        title: `Matching in action`,
        text: `Suppose an illustrative stock has buy orders at ₹499.90 for 300 shares and ₹499.85 for 500 shares, and sell orders at ₹500.00 for 200 shares. When you place a market buy for 100 shares, the exchange matches you with the ₹500.00 seller. You pay 100 × ₹500 = ₹50,000. You did not negotiate, and you did not need to know the seller.`,
      },
      tip: `On an exchange the price is not set by the exchange. It is the result of real buy and sell orders meeting.`,
      visual: {
        kind: `orderBook`,
        title: `An order book for one stock (illustrative)`,
        caption: `Buyers queue at the bid side, sellers on the ask side; a trade happens when they meet.`,
        bids: [[499.9, 300], [499.85, 500], [499.8, 400]],
        asks: [[500.0, 200], [500.05, 350], [500.1, 600]],
      },
    },
    {
      t: 5,
      def: `A stockbroker is a SEBI-registered intermediary who is a member of an exchange and places your buy and sell orders on your behalf. You cannot trade on NSE directly as an individual; the broker is your access point. Examples include full-service brokers and discount brokers with mobile apps.`,
      hi: `Stockbroker ek SEBI-registered intermediary hota hai jo exchange ka member hota hai aur aapki taraf se buy-sell orders daalta hai. Aap individual ke roop mein seedha NSE par trade nahi kar sakte; broker hi aapka access point hai. Full-service broker aur discount broker app wale dono is category mein aate hain.`,
      how: `You open a trading account (plus a demat account and a linked bank account) after KYC. The broker takes your order through an app or website, checks that you have enough funds or margin, and routes it to the exchange. The broker charges brokerage and passes on statutory charges such as STT, exchange fees, GST and stamp duty. Client money and securities are required to be kept separate from the broker's own, and the broker sends you a contract note and periodic statements. Brokers are supervised by SEBI and the exchanges.`,
      eg: {
        title: `Why the broker is not the exchange`,
        text: `Suppose you buy one lot of a Nifty option at a premium of ₹100. Contract value paid is ₹100 × 65 = ₹6,500. Your broker may charge a flat brokerage of ₹20 for the order, plus statutory charges that you can see on the contract note. The ₹6,500 premium itself flows through the exchange and clearing system, not into the broker's pocket. Only the brokerage and fees are the broker's earning.`,
      },
      tip: `Always check that a broker is SEBI-registered, never share your login or OTP, and never give anyone "power of attorney" on your account casually.`,
      visual: {
        kind: `compare`,
        title: `Two kinds of broker`,
        caption: `Choose by what you need, not by advertising.`,
        left: { head: `Full-service broker`, tone: `gold`, points: [`Research and advice, relationship manager`, `Usually higher brokerage`, `Useful for beginners wanting guidance`] },
        right: { head: `Discount broker`, tone: `ice`, points: [`Mostly app-based, low or flat brokerage`, `You decide and trade yourself`, `Suits self-directed traders`] },
      },
      calc: { id: `charges`, preset: { premium: 100, lotSize: 65, lots: 1, side: `buy`, brokerage: 20 }, why: `See the ₹ cost of one small option trade, so the broker's part is visible.` },
    },
    {
      t: 6,
      def: `A depository is an institution that holds your shares and other securities in electronic form, like a bank holds your money. This electronic holding is called a demat (dematerialised) account. Instead of paper certificates, you have entries in a digital ledger.`,
      hi: `Depository ek institution hai jo aapke shares aur dusri securities ko electronic form mein rakhti hai, bilkul waise jaise bank aapka paisa rakhta hai. Is electronic holding ko demat (dematerialised) account kehte hain. Paper certificate ki jagah aapke paas digital ledger mein entry hoti hai.`,
      how: `India has two depositories, NSDL and CDSL, set up under the Depositories Act of 1996. You do not open an account with a depository directly; you open it with a depository participant (DP), usually your broker or a bank. When you buy a share, the depository debits the seller's holding and credits yours. Your name is recorded as the beneficial owner, so even if the broker fails, your holding stays in your own account. Index options and futures are not held in a demat account because they are contracts, not securities you receive.`,
      eg: {
        title: `Demat vs trading vs bank account`,
        text: `Think of three lockers. Your bank account holds ₹50,000 in cash. Your trading account is the counter through which you place orders. Your demat account holds the 20 shares of an illustrative company worth 20 × ₹1,250 = ₹25,000 that you bought last week. When you sell the shares, the depository moves them out of your demat and the money comes back through the bank account.`,
      },
      tip: `Check your demat holding statement from the depository (NSDL or CDSL) now and then. It is the official record of what you own, independent of your broker's app.`,
      visual: {
        kind: `flow`,
        title: `Three accounts you need`,
        caption: `You need all three to trade shares; for derivatives trading the demat is still usually opened alongside.`,
        steps: [
          { label: `Bank account`, note: `holds your cash`, tone: `ice` },
          { label: `Trading account`, note: `places orders through the broker`, tone: `gold` },
          { label: `Demat account`, note: `holds shares electronically`, tone: `neutral` },
        ],
      },
    },
    {
      t: 7,
      def: `NSDL and CDSL are the two depositories of India. NSDL (National Securities Depository Limited) started in 1996 as the first, and CDSL (Central Depository Services (India) Limited) began operating in 1999. Both do the same job of holding securities electronically and transferring them between accounts.`,
      hi: `NSDL aur CDSL India ke do depositories hain. NSDL (National Securities Depository Limited) 1996 mein pehla depository bana, aur CDSL (Central Depository Services (India) Limited) 1999 mein shuru hua. Dono ka kaam same hai: securities ko electronically rakhna aur accounts ke beech transfer karna.`,
      how: `NSDL was promoted by institutions including IDBI, UTI and NSE, while CDSL was promoted by BSE with banks as co-promoters. Both are regulated by SEBI and are listed companies today. Your demat account sits with one of them, through a depository participant, and the ID format differs: an NSDL account usually starts with "IN" followed by a 14-digit number, while a CDSL account has a 16-digit client ID. You can hold accounts at both and transfer shares between them. Neither is better for a trader; pick your broker, not the depository.`,
      eg: {
        title: `Reading your demat ID`,
        text: `If your DP ID reads like "IN301234" followed by an 8-digit client ID, you are with NSDL, and if you have a single 16-digit number such as 1208xxxxxxxxxxxx, that is CDSL (the numbers here are placeholders). Both of them issue you a statement of holdings, and both let you set up an electronic access facility to see holdings and transactions. For a trader the practical difference is nil.`,
      },
      tip: `Which depository you are with is decided by your broker. It does not change your rights or the safety of your shares.`,
      visual: {
        kind: `compare`,
        title: `NSDL and CDSL`,
        caption: `Same job, different history.`,
        left: { head: `NSDL`, tone: `gold`, points: [`Started 1996, the first depository`, `Promoted by IDBI, UTI, NSE and others`, `DP ID plus 8-digit client ID`] },
        right: { head: `CDSL`, tone: `ice`, points: [`Began operations in 1999`, `Promoted by BSE with banks`, `Single 16-digit client ID`] },
      },
    },
    {
      t: 8,
      def: `A clearing corporation is the institution that stands between every buyer and seller after a trade is matched, so that each side only has to trust the clearing corporation and not each other. It calculates what each member owes, collects margin and guarantees that the trade will be completed even if one side defaults.`,
      hi: `Clearing corporation woh institution hai jo trade match hone ke baad har buyer aur seller ke beech aa jaati hai, taaki dono ko ek-dusre par bharosa na karna pade, sirf clearing corporation par. Yeh calculate karti hai ki har member ko kitna dena ya lena hai, margin leti hai, aur guarantee deti hai ki trade poora hoga chahe ek side default kar jaye.`,
      how: `This stepping-in is called novation: the original buyer-seller contract is replaced by two contracts, one between the buyer and the clearing corporation and one between the clearing corporation and the seller. NSE trades are cleared by NSE Clearing (earlier called NSCCL) and BSE trades by Indian Clearing Corporation Limited (ICCL). To keep itself safe, the clearing corporation collects margins (in derivatives, calculated with the SPAN system plus exposure margin), marks positions to market every day, and maintains a Settlement Guarantee Fund. This is why an option buyer in Mumbai need not worry whether the seller in Kolkata can pay.`,
      eg: {
        title: `Daily marking-to-market on a futures lot`,
        text: `Illustrative: you buy one lot of NIFTY futures (65 units) at 24,000. The day ends at 24,060, so your gain is 60 × 65 = ₹3,900, and it is credited to you that day through the clearing system. Next day it ends at 23,990, a fall of 70 points, so you pay 70 × 65 = ₹4,550. The net is 3,900 − 4,550 = −₹650, which equals the total 10-point fall from 24,000 times 65. Daily settlement of gains and losses keeps any one trader's debt from growing unseen.`,
      },
      tip: `Margin is not a fee. It is a security deposit the clearing corporation holds so that your losses, if they come, can be paid.`,
      visual: {
        kind: `flow`,
        title: `Novation: the clearing corporation in the middle`,
        caption: `After matching, buyer and seller no longer face each other.`,
        steps: [
          { label: `Buyer`, note: `trades through a broker`, tone: `ice` },
          { label: `Clearing corporation`, note: `becomes seller to buyer and buyer to seller`, tone: `gold` },
          { label: `Seller`, note: `trades through another broker`, tone: `ice` },
        ],
      },
      calc: { id: `futures-pnl`, preset: { side: `long`, entry: 24000, exit: 24060, lotSize: 65, lots: 1 }, why: `Check the first day's mark-to-market gain on one NIFTY futures lot.` },
    },
    {
      t: 9,
      def: `Settlement is the final step of a trade, when the buyer gets the securities and the seller gets the money. The gap between the trade day (T) and the settlement day is called the settlement cycle. Indian equity markets use T+1, meaning settlement happens on the next working day after the trade.`,
      hi: `Settlement trade ka aakhri step hai, jab buyer ko securities milti hain aur seller ko paisa. Trade day (T) aur settlement day ke beech ke gap ko settlement cycle kehte hain. India ke equity market mein T+1 chalta hai, matlab trade ke agle working day par settlement ho jata hai.`,
      how: `India moved from T+2 to T+1 in phases and completed it for all equity shares on 27 January 2023, among the first large markets to do so. On settlement day, the clearing corporation nets each broker's obligations, the depository moves shares and the bank system moves money. SEBI has also allowed an optional T+0 settlement for a limited set of shares as a beta facility, so check current rules. In derivatives, positions are settled in cash daily (mark-to-market), and at expiry NIFTY index options settle in cash against the final settlement price, so no shares are delivered.`,
      eg: {
        title: `T+1 with real dates`,
        text: `You buy 100 shares at ₹250 on Monday: you pay 100 × ₹250 = ₹25,000. Under T+1 the shares show in your demat by Tuesday. If you sell them on Tuesday itself, the sale money for Tuesday's trade comes to you on Wednesday. If a weekend or a market holiday falls in between, the count skips it, so a Friday trade settles on the next working day, Monday.`,
      },
      tip: `Settlement timing matters for cash planning: money from a sale today is not always instantly usable as withdrawable cash, even if your broker lets you reuse it to trade.`,
      visual: {
        kind: `timeline`,
        title: `T+1 settlement for a Monday purchase`,
        caption: `Illustrative: no holiday in between.`,
        events: [
          { when: `Monday (T)`, what: `You buy 100 shares; trade matched on the exchange`, tone: `gold` },
          { when: `Monday evening`, what: `Clearing corporation nets obligations`, tone: `neutral` },
          { when: `Tuesday (T+1)`, what: `Shares credited to your demat, money paid to the seller`, tone: `ice` },
        ],
      },
    },
    {
      t: 10,
      def: `Exchanges run the marketplace: they list securities, match orders and publish prices. Regulators make and enforce the rules. Together with clearing corporations, depositories and brokers, they split the work so that no one party can both run the game and mark its own homework.`,
      hi: `Exchange marketplace chalate hain: securities list karte hain, orders match karte hain aur price publish karte hain. Regulator rules banate aur enforce karte hain. Clearing corporation, depository aur broker ke saath milkar yeh kaam baant lete hain, taaki koi ek party game bhi chalaye aur apna hi paper bhi check kare, aisa na ho.`,
      how: `SEBI regulates exchanges, brokers, depositories, clearing corporations, mutual funds and listed companies, while the exchanges themselves act as the first-line regulators of their members: they watch for unusual trades, enforce margins and discipline brokers. RBI regulates banks and the money and currency markets, and the Ministry of Finance and Parliament set the wider law. If you have a complaint, you first approach your broker, then the exchange's investor grievance system, and then SEBI's SCORES platform. Penalties for rule-breaking range from fines to bans from the market.`,
      eg: {
        title: `A complaint travelling up the ladder`,
        text: `Suppose an order you placed was executed at a price you believe was wrong. Step one: write to your broker's grievance desk and keep the order time and screenshot. Step two: if unresolved, raise it with the exchange where the broker is a member. Step three: file it on SEBI SCORES. Many problems end at step one, which is why you should keep records of every order.`,
      },
      tip: `If a "tip provider" or "guaranteed returns" scheme is not registered with SEBI, treat it as unsafe. You can verify registration on the SEBI website.`,
      visual: {
        kind: `matrix`,
        title: `Who does what`,
        caption: `Top row: rules and supervision. Bottom row: day-to-day work.`,
        xLabels: [`Securities`, `Money`],
        yLabels: [`Rules and oversight`, `Operations`],
        cells: [
          { head: `SEBI`, note: `regulates the securities market`, tone: `gold` },
          { head: `RBI`, note: `regulates banks, currency and money market`, tone: `ice` },
          { head: `Exchange and depository`, note: `trading platform and share custody`, tone: `neutral` },
          { head: `Clearing corporation and banks`, note: `guarantee and payment`, tone: `neutral` },
        ],
      },
    },
  ],
  tools: [{ id: `lot-value`, preset: { spot: 24000, lotSize: 65, lots: 1, premium: 100, marginPct: 12 }, why: `Contract value and illustrative margin for one lot.` }],
}
export default m
