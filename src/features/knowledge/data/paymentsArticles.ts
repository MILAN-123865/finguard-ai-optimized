import { Article } from './articles';

export const paymentsArticles: Article[] = [
  {
    id: 'payments-scam-1',
    title: 'UPI & Instant QR Code Fraud: The "Collect Money" Trap',
    category: 'Payments',
    readTime: '5 min read',
    date: 'Nov 02, 2024',
    author: 'Rajesh V., Digital Payments Specialist',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['UPI', 'QR Code', 'Collect Request', 'P2P Payments'],
    heroImage: 'Digital Payment Terminal',
    description: 'UPI and QR code scams exploit the instantaneous nature of mobile payments by tricking victims into entering their PIN under the false premise of receiving money.',
    howItWorks: [
      'A scammer poses as an eager buyer on a classifieds platform (OLX, Facebook Marketplace).',
      'They agree to buy your item and offer to pay immediately via UPI or instant transfer app.',
      'Instead of transferring money, they send a "Collect Payment Request" or custom QR code.',
      'They claim: "Scan this and enter your secret PIN to receive your payment." Entering your PIN instantly sends money to them.'
    ],
    warningSigns: [
      'Being asked to enter a PIN, passcode, or biometric scanner to receive money.',
      'Receiving "Collect Request" pop-up alerts on Venmo, UPI, or cash apps.',
      'Sellers or buyers insisting on QR code payment for physical cash pickups.'
    ],
    preventionTips: [
      'Golden Rule: You NEVER need to enter your PIN or password to receive funds.',
      'Carefully inspect payment alert pop-ups before confirming.',
      'Decline unknown collect payment requests on mobile wallet apps.'
    ],
    realExample: {
      title: 'The Marketplace QR Code Scam',
      description: 'A seller listed a couch for $250. A buyer sent a QR code claiming it was a pre-authorized deposit. Scanning and entering a PIN transferred $250 from the seller\'s account.'
    },
    faqs: [
      { question: 'Do I need my PIN to receive funds on PayPal or Venmo?', answer: 'No. Received funds automatically deposit into your wallet balance without requiring PIN confirmation.' }
    ],
    relatedIds: ['payments-scam-2', 'payments-scam-3'],
    isTrending: true
  },
  {
    id: 'payments-scam-2',
    title: 'Credit Card Skimming on E-Commerce Checkout Portals (Magecart)',
    category: 'Payments',
    readTime: '7 min read',
    date: 'Nov 18, 2024',
    author: 'E-Commerce Security Architect',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Magecart', 'Credit Card', 'Checkout Skimmer', 'E-Commerce'],
    heroImage: 'E-Commerce Shopping Cart',
    description: 'Magecart malware injects malicious JavaScript into online store checkouts, quietly stealing credit card numbers and CVVs as customers make purchases.',
    howItWorks: [
      'Hackers breach an online shopping store platform (e.g., Magento, WooCommerce).',
      'They inject hidden JavaScript snippets into the payment checkout page.',
      'When customers type their card number, expiration, and CVV, the code exfiltrates data to a remote hacker server.',
      'The payment processes normally, leaving the customer completely unaware of the theft.'
    ],
    warningSigns: [
      'Unusual checkout form fields asking for PINs or SSNs on basic retail stores.',
      'Browser extensions warning of unverified third-party scripts on store checkouts.',
      'Unauthorized micro-charges appearing on credit card statements days after shopping online.'
    ],
    preventionTips: [
      'Use virtual credit cards with auto-expiring numbers or tokenized payment options (Apple Pay, Google Pay).',
      'Never save credit card details directly on small retail websites.',
      'Monitor monthly card billing statements for unrecognized test charges.'
    ],
    realExample: {
      title: 'Major Airline Checkout Script Breach',
      description: 'A Magecart attack injected 22 lines of malicious code into a major airline\'s checkout page, stealing 380,000 credit card details over two weeks.'
    },
    faqs: [
      { question: 'Why are Apple Pay and Google Pay safer against Magecart?', answer: 'Tokenization replaces real card numbers with one-time dynamic security tokens that are useless to hackers even if intercepted.' }
    ],
    relatedIds: ['payments-scam-1', 'payments-scam-4'],
    isTrending: true
  },
  {
    id: 'payments-scam-3',
    title: 'Fake Payment Confirmation Screenshots & Verification Apps',
    category: 'Payments',
    readTime: '4 min read',
    date: 'Dec 05, 2024',
    author: 'Retail Fraud Prevention Specialist',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Fake Receipt', 'Fake Payment', 'Retail Fraud', 'Spoof App'],
    heroImage: 'Mobile Screen Display',
    description: 'In-person scammers use spoofed mobile apps that generate fake payment success screens and sound effects to trick store owners into releasing merchandise.',
    howItWorks: [
      'A customer enters a store and offers to pay via mobile payment app.',
      'They open a rogue app that generates a realistic payment successful screen showing the store\'s name and exact transaction total.',
      'The app even plays authentic notification chimes.',
      'The scammer leaves with goods before the merchant checks their actual bank balance.'
    ],
    warningSigns: [
      'Customers who push their phone screen close to your face and rush out.',
      'Failure of payment alerts to reflect on the merchant\'s receiver terminal.',
      'Customers refusing to wait 5 seconds for official merchant dashboard confirmation.'
    ],
    preventionTips: [
      'Only release merchandise when payment is confirmed on your own merchant terminal or soundbox device.',
      'Do not rely solely on viewing a customer\'s phone screen as proof of payment.',
      'Install merchant audio notification speakers that announce received amounts.'
    ],
    realExample: {
      title: 'Boutique Electronics Store Spoof App',
      description: 'A thief walked out with $3,000 in headphones using a simulated payment app. The store owner verified his balance 10 minutes later and found zero incoming payments.'
    },
    faqs: [
      { question: 'What is a merchant soundbox?', answer: 'A soundbox is an IoT speaker connected to a merchant bank account that instantly speaks incoming payment amounts loudly.' }
    ],
    relatedIds: ['payments-scam-1', 'payments-scam-5']
  },
  {
    id: 'payments-scam-4',
    title: 'PayPal "Goods and Services" vs "Friends and Family" Abuse',
    category: 'Payments',
    readTime: '6 min read',
    date: 'Dec 20, 2024',
    author: 'Consumer Escrow Rights Group',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['PayPal', 'Buyer Protection', 'Friends and Family', 'Escrow'],
    heroImage: 'Online Transfer Interface',
    description: 'Sellers trick buyers into selecting "Friends & Family" payments for commercial merchandise purchases, stripping away all PayPal purchase protection rights.',
    howItWorks: [
      'You purchase an item online (e.g. concert tickets, collectible cards).',
      'The seller requests payment via PayPal "Friends and Family", claiming it avoids high merchant fees.',
      'You send the payment.',
      'The seller blocks you and never ships the item. PayPal denies your refund dispute because "Friends & Family" transfers are non-refundable.'
    ],
    warningSigns: [
      'Sellers insisting on "Friends & Family" payments for commercial items.',
      'Offers to discount prices if you forgo purchase protection.',
      'Unwillingness to accept standard credit cards or protected checkout systems.'
    ],
    preventionTips: [
      'ALWAYS select "Goods and Services" when buying products or hiring services.',
      'If a seller demands "Friends & Family", pay the extra fee yourself or walk away.',
      'Report suspicious sellers who routinely bypass commerce protection rules.'
    ],
    realExample: {
      title: 'Concert Ticket Buyer Protection Loss',
      description: 'A fan paid $400 for sold-out tickets via PayPal Friends & Family. The tickets were fake, and PayPal refused the claim since no buyer protection applied.'
    },
    faqs: [
      { question: 'Can I dispute a Friends & Family payment with my credit card company?', answer: 'You can attempt a credit card chargeback, but PayPal may place your PayPal account in a negative balance status.' }
    ],
    relatedIds: ['payments-scam-1', 'payments-scam-6']
  },
  {
    id: 'payments-scam-5',
    title: 'Gift Card Payment Exploitation & Money Laundering',
    category: 'Payments',
    readTime: '5 min read',
    date: 'Jan 08, 2025',
    author: 'Financial Intelligence Unit',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Gift Cards', 'Apple Gift Card', 'Razor Gold', 'Untraceable'],
    heroImage: 'Gift Cards Rack',
    description: 'Scammers demand payment in retail gift cards (Apple, Target, Steam) because gift card codes can be liquidated anonymously across global trading platforms.',
    howItWorks: [
      'A scammer poses as the IRS, tech support, or a utility company threatening immediate action.',
      'They instruct you to drive to a store and purchase physical gift cards.',
      'They tell you to scratch off the back codes and read them aloud over the phone.',
      'The moment codes are shared, bots sell them on digital secondary markets within seconds.'
    ],
    warningSigns: [
      'ANY government agency, bank, or utility company asking to be paid in gift cards.',
      'Callers telling you to keep gift card purchases secret from store clerks.',
      'Requests to stay on the phone while buying cards at retail stores.'
    ],
    preventionTips: [
      'Remember: NO legitimate company or government agency accepts gift cards as payment.',
      'If someone asks for gift card codes, it is 100% a scam.',
      'Warn store employees if you observe elderly individuals buying thousands in gift cards.'
    ],
    realExample: {
      title: 'The Fake Tech Support Gift Card Demand',
      description: 'A victim was told his computer contained illegal material and paid $2,500 in Target gift cards to "clear his name". The codes were redeemed in under 3 minutes.'
    },
    faqs: [
      { question: 'Can lost or stolen gift card codes be refunded?', answer: 'Once a gift card code is redeemed on a target platform, retailers cannot reverse the transaction or issue refunds.' }
    ],
    relatedIds: ['payments-scam-1', 'fraud-scam-1']
  },
  {
    id: 'payments-scam-6',
    title: 'Chargeback Extortion & Friendly Fraud for Merchants',
    category: 'Payments',
    readTime: '6 min read',
    date: 'Jan 19, 2025',
    author: 'E-Commerce Merchant Risk Guild',
    severity: 'Medium',
    difficultyLevel: 'Intermediate',
    tags: ['Chargeback', 'Friendly Fraud', 'Dispute', 'Merchant Risk'],
    heroImage: 'Merchant Dashboard Analysis',
    description: 'Fraudulent customers buy high-value items online, receive the delivery, and then falsely file "item not received" chargebacks with their credit card issuers.',
    howItWorks: [
      'A buyer orders expensive luxury goods online using their real name and address.',
      'After the package is delivered, they call their credit card bank claiming their card was stolen or the box arrived empty.',
      'The credit card issuer issues a forced chargeback, pulling funds back from the merchant.',
      'The buyer keeps both the merchandise and the money.'
    ],
    warningSigns: [
      'Customers requesting non-standard delivery instructions or drop-offs.',
      'High order volume from buyers with multiple failed card attempts.',
      'Frequent dispute claims filed right after package tracking shows "Delivered".'
    ],
    preventionTips: [
      'Require physical signature delivery confirmation for high-value orders.',
      'Utilize 3D Secure 2.0 (3DS) authentication on credit card checkouts.',
      'Maintain detailed photo and shipping weight records prior to dispatch.'
    ],
    realExample: {
      title: 'Luxury Watch Friendly Fraud Attack',
      description: 'An online jeweler lost a $12,000 watch when a customer filed a fraudulent chargeback claiming the package was stolen from his porch despite signature delivery proof.'
    },
    faqs: [
      { question: 'What is 3D Secure 2.0?', answer: '3DS2 is a payment protocol that shifts chargeback liability from merchants to card issuers by requiring SMS or biometric authorization.' }
    ],
    relatedIds: ['payments-scam-2', 'payments-scam-7']
  },
  {
    id: 'payments-scam-7',
    title: 'Cryptocurrency ATM Exploitation & Direct Wallet Theft',
    category: 'Payments',
    readTime: '6 min read',
    date: 'Feb 01, 2025',
    author: 'Crypto Intelligence Analyst',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Crypto ATM', 'Bitcoin', 'Wallet Address', 'Irreversible'],
    heroImage: 'Bitcoin Kiosk Terminal',
    description: 'Scammers walk victims to physical Bitcoin kiosks, instructing them to deposit cash and scan the scammer\'s personal QR wallet code.',
    howItWorks: [
      'Victims are panicked by fake law enforcement or bail bond callers.',
      'They are ordered to withdraw cash from their bank and drive to a local Bitcoin ATM kiosk.',
      'The scammer texts a QR code representing the scammer\'s crypto wallet address.',
      'The victim feeds thousands of dollars in cash into the machine, transmitting crypto straight to the scammer.'
    ],
    warningSigns: [
      'Callers directing you to a specific gas station or convenience store Bitcoin kiosk.',
      'Instructions to scan a QR code sent via text message at a crypto machine.',
      'Claims that government fines must be paid in cryptocurrency.'
    ],
    preventionTips: [
      'Government agencies and police NEVER accept cryptocurrency payments.',
      'Never scan a third-party crypto QR code at a Bitcoin kiosk.',
      'Stop and consult a trusted family member before depositing cash into crypto terminals.'
    ],
    realExample: {
      title: 'Senior Citizen Crypto Kiosk Extortion',
      description: 'A 72-year-old was told her grandson was in jail and deposited $14,000 in cash into a Bitcoin kiosk scanning a text-message QR code. The funds vanished into the blockchain.'
    },
    faqs: [
      { question: 'Can Bitcoin ATM transactions be refunded by law enforcement?', answer: 'No. Blockchain transactions are immutable and cannot be reversed by banks or police.' }
    ],
    relatedIds: ['payments-scam-5', 'investment-scam-1']
  },
  {
    id: 'payments-scam-8',
    title: 'Fake Buy-Now-Pay-Later (BNPL) Credit Takeover',
    category: 'Payments',
    readTime: '5 min read',
    date: 'Feb 14, 2025',
    author: 'Fintech Credit Risk Division',
    severity: 'Medium',
    difficultyLevel: 'Intermediate',
    tags: ['BNPL', 'Klarna', 'Afterpay', 'Identity Theft'],
    heroImage: 'Mobile Credit Check',
    description: 'Cybercriminals use stolen identity records to open Buy-Now-Pay-Later (BNPL) credit lines on Klarna or Afterpay, abandoning debt in the victim\'s name.',
    howItWorks: [
      'Scammers purchase stolen personal identity packages (SSN, name, DOB) on dark web forums.',
      'They sign up for BNPL accounts on e-commerce checkouts.',
      'They purchase expensive electronics paying only the initial 25% installment with a stolen debit card.',
      'The remaining installments go unpaid, leading debt collection agencies to target the innocent victim.'
    ],
    warningSigns: [
      'Debt collection notices from Klarna, Affirm, or Afterpay for items you never purchased.',
      'Hard or soft credit inquiries on your credit bureau reports from BNPL providers.',
      'Order confirmation emails for retail deliveries to unknown addresses.'
    ],
    preventionTips: [
      'Place a credit freeze across major credit bureaus (Equifax, Experian, TransUnion).',
      'Regularly check credit monitoring apps for unrecognized credit line approvals.',
      'Dispute unauthorized BNPL debt accounts immediately upon notification.'
    ],
    realExample: {
      title: 'Multi-BNPL Identity Spree',
      description: 'A victim discovered six BNPL credit accounts opened in her name across three retailers, accumulating $4,800 in unpaid debt.'
    },
    faqs: [
      { question: 'Do BNPL services perform credit checks?', answer: 'Most BNPL services perform soft credit pulls that allow fast approvals without rigorous identity verification.' }
    ],
    relatedIds: ['identity-scam-1', 'payments-scam-2']
  },
  {
    id: 'payments-scam-9',
    title: 'Cross-Border Money Transfer App Exploits (Wise, Remitly)',
    category: 'Payments',
    readTime: '6 min read',
    date: 'Mar 02, 2025',
    author: 'Cross-Border Compliance Lead',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Remittance', 'Wise', 'Remitly', 'Wire Transfer'],
    heroImage: 'Global Exchange Currency',
    description: 'Fraudsters exploit international remittance applications using fake payment receipts and stolen credit cards to execute unauthorized currency exchanges.',
    howItWorks: [
      'Scammers initiate an international remittance order using stolen banking credentials.',
      'They send funds across international borders to accomplice accounts in low-regulation countries.',
      'By the time the credit card holder reports the fraud, the international payout has been withdrawn in physical cash.',
      'Remittance services struggle to recover funds once international disbursement occurs.'
    ],
    warningSigns: [
      'Emails from remittance apps regarding foreign transfer setups you didn\'t initiate.',
      'Requests to receive international money transfers on behalf of online acquaintances.',
      'Unfamiliar currency conversion charges on credit card statements.'
    ],
    preventionTips: [
      'Enable two-factor authentication (MFA) on all remittance application profiles.',
      'Set strict daily transaction limits on cross-border money transfers.',
      'Never agree to act as an intermediary for international remittance transfers.'
    ],
    realExample: {
      title: 'Stolen Card Remittance Drain',
      description: 'Attackers compromised a user\'s Wise account and transferred $8,000 to three accounts in Southeast Asia in under an hour.'
    },
    faqs: [
      { question: 'Are international remittance transfers reversible?', answer: 'Once cash is picked up at an agent location overseas, remittance transfers cannot be cancelled or reversed.' }
    ],
    relatedIds: ['payments-scam-1', 'banking-scam-2']
  },
  {
    id: 'payments-scam-10',
    title: 'NFC Contactless Card Relay Attacks',
    category: 'Payments',
    readTime: '5 min read',
    date: 'Mar 18, 2025',
    author: 'Wireless Physical Security Lab',
    severity: 'Medium',
    difficultyLevel: 'Advanced',
    tags: ['NFC', 'Relay Attack', 'RFID', 'Contactless'],
    heroImage: 'Contactless Reader Waves',
    description: 'Two scammers equipped with specialized NFC relay software bridge the distance between your physical contactless card in a pocket and a POS terminal miles away.',
    howItWorks: [
      'Scammer A walks close to you in a crowded subway with an NFC-scanning mobile phone.',
      'Scammer B stands at a store checkout counter miles away with a paired smartphone near a payment reader.',
      'Scammer A\'s phone reads your card via NFC and transmits the signal over 5G to Scammer B\'s phone.',
      'Scammer B\'s phone presents the signal to the checkout counter, approving an unauthorized purchase.'
    ],
    warningSigns: [
      'Unrecognized physical contactless merchant transactions on your card statement.',
      'Unexpected transaction notification pop-ups while riding crowded public transit.'
    ],
    preventionTips: [
      'Carry your contactless cards in RFID-blocking wallets or protective sleeves.',
      'Disable physical card NFC capabilities if you exclusively use smartphone mobile wallets.',
      'Set real-time mobile push notifications for any charge over $1.00.'
    ],
    realExample: {
      title: 'Subway Passenger NFC Relay Theft',
      description: 'A commuter\'s credit card in his back pocket was relayed to purchase a $450 laptop at an electronics store across town while he rode the train.'
    },
    faqs: [
      { question: 'Do RFID-blocking wallets actually work?', answer: 'Yes. RFID-blocking sleeves create a Faraday cage that prevents radio frequencies from reaching your card chips.' }
    ],
    relatedIds: ['payments-scam-2', 'mobile-scam-1']
  },
  {
    id: 'payments-scam-11',
    title: 'Subscription Auto-Renewal Traps & Deceptive Free Trials',
    category: 'Payments',
    readTime: '4 min read',
    date: 'Apr 05, 2025',
    author: 'Consumer Rights Enforcement',
    severity: 'Low',
    difficultyLevel: 'Beginner',
    tags: ['Subscription Trap', 'Free Trial', 'Auto Renewal', 'Dark Patterns'],
    heroImage: 'Digital Calendar Recurring',
    description: 'Deceptive websites offer "$1 free trial" products but bury recurring $99 monthly membership charges in hidden terms, making cancellation nearly impossible.',
    howItWorks: [
      'You sign up for a $1.00 trial bottle of supplements or a digital tool.',
      'The terms page contains hidden dark-pattern text converting the trial into a $99/month recurring subscription.',
      'Cancellation buttons are disabled or require 45-minute phone hold times.',
      'Disreputable merchants re-bill your card under fluctuating business names.'
    ],
    warningSigns: [
      'Promotions offering free products where you must pay shipping with a credit card.',
      'Websites without clear, one-click cancellation settings.',
      'Pre-checked agreement boxes for recurring monthly billing terms.'
    ],
    preventionTips: [
      'Use single-use virtual cards set with a maximum $2 spending limit for online trials.',
      'Take screenshots of cancellation terms during checkout.',
      'Contact your card bank to place a merchant charge block if cancellation is refused.'
    ],
    realExample: {
      title: 'The $1 Skin Cream Subscription Nightmare',
      description: 'A customer ordered a $1 sample bottle and was billed $89 every month for six months due to obscured auto-renewal fine print.'
    },
    faqs: [
      { question: 'What is a dark pattern in UX design?', answer: 'A dark pattern is a user interface trick designed to deceive users into taking unintended actions like signing up for recurring charges.' }
    ],
    relatedIds: ['payments-scam-2', 'payments-scam-4']
  },
  {
    id: 'payments-scam-12',
    title: 'Peer-to-Peer Payment Account Triangulation Fraud',
    category: 'Payments',
    readTime: '6 min read',
    date: 'Apr 20, 2025',
    author: 'P2P Fraud Prevention Taskforce',
    severity: 'High',
    difficultyLevel: 'Advanced',
    tags: ['Triangulation', 'P2P', 'Stolen Card', 'E-Bay'],
    heroImage: 'Network Nodes Intersect',
    description: 'Scammers buy legitimate products for online shoppers using stolen credit cards while pocketing the shopper\'s clean cash payment.',
    howItWorks: [
      'A scammer lists brand new laptops on eBay for 50% off retail price.',
      'You buy the laptop and pay the scammer $500 via legitimate cash transfer.',
      'The scammer orders the laptop from BestBuy using a stolen credit card, shipping it to your house.',
      'BestBuy traces the stolen card to your shipping address, leading police to your door while the scammer keeps your $500.'
    ],
    warningSigns: [
      'Online listings offering brand new high-end goods for half price.',
      'Sellers who insist on external peer-to-peer payment transfers.',
      'Shipments arriving with receipts showing someone else\'s credit card details.'
    ],
    preventionTips: [
      'Only purchase goods through official e-commerce marketplace checkout portals.',
      'Avoid deals that appear dramatically cheaper than realistic market value.',
      'Keep transaction receipts and message transcripts for all online purchases.'
    ],
    realExample: {
      title: 'Triangulation Laptop Trap',
      description: 'A college student bought a $1,200 MacBook for $600. A month later, police seized the laptop because it was purchased with a stolen corporate card.'
    },
    faqs: [
      { question: 'How can I protect myself if I unknowingly bought stolen goods?', answer: 'Provide police with all correspondence, seller profiles, and payment receipts proving you were an innocent purchaser.' }
    ],
    relatedIds: ['payments-scam-1', 'payments-scam-6']
  },
  {
    id: 'payments-scam-13',
    title: 'POS Terminal Tampering & Offline Cash Register Injection',
    category: 'Payments',
    readTime: '5 min read',
    date: 'May 05, 2025',
    author: 'Physical Point of Sale Specialist',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['POS', 'Skimmer', 'Merchant Terminal', 'EMV Chip'],
    heroImage: 'Point of Sale Machine',
    description: 'Physical Point-of-Sale (POS) terminals in busy retail stores are swapped with compromised hardware that records card swipe and chip data.',
    howItWorks: [
      'Scammers distract cashiers and swap the store\'s legitimate POS device with an identical modified terminal.',
      'Customers insert or tap cards, and the compromised POS stores card numbers internally.',
      'At night, the scammer retrieves the device or downloads data via Bluetooth.',
      'Cloned physical cards are created for illegal shopping sprees.'
    ],
    warningSigns: [
      'POS terminals with broken security seal stickers.',
      'Terminals requiring multiple chip re-inserts or forcing magnetic swipe fallbacks.',
      'Mismatched hardware colors between the terminal and its power base.'
    ],
    preventionTips: [
      'Prefer contactless mobile payments (Apple/Google Pay) over inserting physical cards.',
      'If a POS machine forces you to swipe a chip card, decline and pay with cash.',
      'Inspect physical checkout terminals for loose casings or tampered seals.'
    ],
    realExample: {
      title: 'Grocery Store POS Terminal Swap',
      description: 'A gang swapped four checkout terminals at a chain grocery store, capturing 12,000 credit card records before store managers noticed.'
    },
    faqs: [
      { question: 'Why is swiping a card riskier than using the EMV chip?', answer: 'Magnetic swipes transmit unencrypted card data, whereas EMV chips generate unique, single-use encrypted cryptographic keys.' }
    ],
    relatedIds: ['payments-scam-2', 'banking-scam-3']
  },
  {
    id: 'payments-scam-14',
    title: 'Escrow Website Impersonation & Fake Vehicle Sales',
    category: 'Payments',
    readTime: '6 min read',
    date: 'May 18, 2025',
    author: 'Automotive Escrow Audit Group',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Escrow', 'Vehicle Sale', 'Fake Website', 'Wire Transfer'],
    heroImage: 'Automotive Showroom',
    description: 'Scammers advertise cheap cars or heavy machinery online, instructing buyers to deposit payment into a fake third-party "escrow site" that steals the money.',
    howItWorks: [
      'A scammer posts a pristine car for sale at a price far below market value due to "urgent military deployment".',
      'They claim the transaction will be safely handled by an independent escrow service (e.g., eBay Motors Escrow).',
      'They send a link to a polished fake escrow website where you wire your purchase deposit.',
      'The website is completely fake, the car does not exist, and the money disappears.'
    ],
    warningSigns: [
      'Sellers refusing in-person vehicle inspections due to deployment or relocation.',
      'Links to escrow websites sent via email rather than independently navigated.',
      'Escrow websites demanding wire transfers or crypto instead of credit card/ACH.'
    ],
    preventionTips: [
      'Only use licensed, verified escrow services like Escrow.com (independently typed into your browser).',
      'Never send funds for a vehicle you or a trusted mechanic haven\'t physically inspected.',
      'Verify escrow domain licenses with official state banking department registries.'
    ],
    realExample: {
      title: 'The Military Deployment Vehicle Scam',
      description: 'A buyer wired $9,500 to a cloned "eBay Motors Holding" portal for a truck. Neither the seller nor the truck existed.'
    },
    faqs: [
      { question: 'Does eBay Motors offer escrow for third-party classifieds?', answer: 'No. eBay Motors protection only applies to purchases completed directly on the official eBay website platform.' }
    ],
    relatedIds: ['payments-scam-1', 'fraud-scam-1']
  },
  {
    id: 'payments-scam-15',
    title: 'Dynamic QR Code Replacement in Public Parking & Utility Kiosks',
    category: 'Payments',
    readTime: '4 min read',
    date: 'Jun 01, 2025',
    author: 'Municipal Cyber Safety Board',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Parking Meter', 'QR Code', 'Sticker Spoof', 'Mobile Pay'],
    heroImage: 'City Parking Meter',
    description: 'Fraudsters stick fake payment QR code stickers over legitimate municipal parking meter signage, directing motorists to phishing checkout pages.',
    howItWorks: [
      'Scammers print physical QR code stickers that mimic city parking authority logos.',
      'They stick them directly over genuine payment QR codes on public parking meters.',
      'Drivers scan the sticker, land on a fake payment portal, and enter credit card info.',
      'The driver\'s card is stolen, no parking time is registered, and they receive a real parking ticket.'
    ],
    warningSigns: [
      'QR code labels that look like physical stickers pasted over original signs.',
      'Payment websites demanding full card details for nominal $2 parking fees.',
      'URLs that do not match the official city parking department domain.'
    ],
    preventionTips: [
      'Download official city parking apps directly from app stores rather than scanning physical stickers.',
      'Pay with coins or credit card slot readers directly on physical parking meters.',
      'Inspect stickers to ensure they are not placed over underlying signage.'
    ],
    realExample: {
      title: 'Citywide Parking Meter Sticker Attack',
      description: 'Hundreds of drivers in a major metropolitan city scanned fake parking stickers, resulting in over $50,000 in credit card fraud and hundreds of parking fines.'
    },
    faqs: [
      { question: 'How can I verify a parking QR code is official?', answer: 'Check the URL domain carefully before entering card details. Official municipal sites typically end in .gov or official app domains.' }
    ],
    relatedIds: ['payments-scam-1', 'payments-scam-2']
  }
];
