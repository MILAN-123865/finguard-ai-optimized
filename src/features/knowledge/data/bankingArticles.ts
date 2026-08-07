import { Article } from './articles';

export const bankingArticles: Article[] = [
  {
    id: 'banking-scam-1',
    title: 'The Anatomy of a Banking Scam: How Cybercriminals Steal Credentials',
    category: 'Banking',
    readTime: '6 min read',
    date: 'Oct 24, 2024',
    author: 'Chief Risk Analyst Mark Vance',
    severity: 'Critical',
    difficultyLevel: 'Intermediate',
    tags: ['Banking', 'Phishing', 'OTP', 'Credentials', 'Account Takeover'],
    heroImage: 'Landmark Bank Security',
    description: 'Banking scams often involve impersonation of legitimate financial institutions to trick you into handing over your login credentials, OTPs, or credit card numbers. These scams are highly sophisticated and leverage fear or urgency.',
    content: 'Banking cybercrime has evolved into a multi-billion dollar enterprise. Fraudsters employ psychological triggers such as account suspension threats or fraudulent transaction alerts to prompt victims into fast, unconsidered action. They deploy realistic domain clones and spoofed SMS headers to mirror authentic banking communications.',
    howItWorks: [
      'The scammer contacts you via phone, SMS, or email pretending to be your bank fraud department.',
      'They claim there is suspicious activity on your account or that your account will be frozen within 1 hour.',
      'You are directed to a cloned login portal or asked to verify your identity by sharing a one-time passcode (OTP).',
      'Once they have your credentials and session OTP, they execute unauthorized wire transfers or wire funds out.'
    ],
    warningSigns: [
      'Unexpected calls or messages asking for OTPs, PINs, or full card numbers.',
      'Urgent threats that your account will be permanently closed or frozen.',
      'Links pointing to domain names that look slightly altered (e.g. citi-bank-secure-auth.com).'
    ],
    preventionTips: [
      'Never share your OTP, PIN, or password with anyone, even if caller ID displays your bank\'s number.',
      'Always type your bank\'s URL directly into the browser instead of clicking embedded text links.',
      'Call your bank directly using the hotline printed on the back of your physical debit card.'
    ],
    realExample: {
      title: 'The Fake Account Lockout Alert',
      description: 'A user received an SMS: "Chase Bank: Suspicious charge of $1,420 detected. Verify now at chase-alert-verify.com to block." Upon entering credentials and the 6-digit 2FA code, $3,000 was drained from their checking account.'
    },
    faqs: [
      { question: 'Will my bank ever ask for my password or PIN?', answer: 'No. Legitimate banks will never ask for your password, PIN, or multi-factor authentication code over the phone or email.' },
      { question: 'What should I do if I clicked a fake banking link?', answer: 'Immediately contact your bank\'s official helpline, freeze your accounts, and update all banking credentials from a clean device.' }
    ],
    relatedIds: ['banking-scam-2', 'banking-scam-3'],
    isTrending: true
  },
  {
    id: 'banking-scam-2',
    title: 'Bank Wire Transfer Fraud & Fake Invoice Interception',
    category: 'Banking',
    readTime: '7 min read',
    date: 'Nov 12, 2024',
    author: 'Elena Rostova, Threat Intel Lead',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Wire Fraud', 'BCC', 'Invoices', 'Escrow', 'SWIFT'],
    heroImage: 'Bank Wire Vault',
    description: 'Cybercriminals intercept real estate, escrow, or vendor emails to swap wire routing details, directing major house payments or supplier funds to fraudulent offshore accounts.',
    content: 'Business Email Compromise (BEC) and wire fraud target high-value transactions. Scammers monitor compromised email threads between buyers, escrow officers, or suppliers until a closing date approaches, then inject modified wiring instructions.',
    howItWorks: [
      'Hackers gain silent access to an escrow officer or closing attorney\'s email account.',
      'They monitor conversation threads regarding pending high-dollar wire transfers.',
      'Just before payment, they send an urgent update with altered routing and account numbers.',
      'The buyer completes the wire transfer directly into the scammer\'s mule account.'
    ],
    warningSigns: [
      'Last-minute changes to wiring or bank account instructions.',
      'Requests to send wire payments to an entity with a different name.',
      'High urgency demanding immediate wire execution without phone confirmation.'
    ],
    preventionTips: [
      'Always verbally confirm wire instructions over a trusted, pre-verified phone number.',
      'Never rely solely on email updates for bank account number modifications.',
      'Utilize dual-authorization workflows for all enterprise wire transfers.'
    ],
    realExample: {
      title: 'Home Buyer Escrow Wire Interception',
      description: 'A home buyer wired $180,000 down payment after receiving an email from "escrow@title-closings.com" (a typo-domain) with updated routing details. The funds were immediately converted to cryptocurrency.'
    },
    faqs: [
      { question: 'Can a wire transfer be reversed?', answer: 'Wire transfers are executed in real time and are almost impossible to recall once processed.' }
    ],
    relatedIds: ['banking-scam-1', 'banking-scam-4'],
    isTrending: true
  },
  {
    id: 'banking-scam-3',
    title: 'ATM Skimming and Overlay Attack Tactics',
    category: 'Banking',
    readTime: '5 min read',
    date: 'Dec 01, 2024',
    author: 'David K., Hardware Security Researcher',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['ATM', 'Skimmer', 'Debit Card', 'PIN Theft'],
    heroImage: 'ATM Hardware Terminal',
    description: 'Physical ATM skimmers and hidden pinhole cameras clone magnetic stripes and record PIN entry at rogue or tampered bank cash machines.',
    content: 'ATM skimming hardware matches the exact color and mold of original manufacturer card slots. Coupled with micro pinhole cameras or fake keypad overlays, thieves capture both card data and secret PINs simultaneously.',
    howItWorks: [
      'Criminals attach a subtle card reader overlay onto an ATM card entry slot.',
      'They mount a miniature camera hidden in a false brochure holder above the keypad.',
      'When you insert your card, the skimmer copies magnetic stripe data while the camera records your PIN.',
      'Thieves clone the debit card and withdraw cash at secondary ATMs.'
    ],
    warningSigns: [
      'Card reader slot feels loose, bulky, or misaligned.',
      'Keypad buttons feel unusually thick or sticky.',
      'Nearby objects or signs appear awkwardly placed right above the keypad.'
    ],
    preventionTips: [
      'Cover the keypad with your free hand whenever entering your PIN.',
      'Use contactless NFC or drive-thru bank ATMs located inside secure lobbies.',
      'Inspect the card slot by giving it a firm tug before inserting your card.'
    ],
    realExample: {
      title: 'Gas Station ATM Clone Spree',
      description: 'Dozens of customers had their cards cloned after using an off-grid ATM in a convenience store where a subtle Bluetooth skimmer had been installed.'
    },
    faqs: [
      { question: 'Does tap-to-pay protect against skimmers?', answer: 'Yes! Contactless chip/NFC payments generate a one-time security token, making magnetic stripe skimmers completely useless.' }
    ],
    relatedIds: ['banking-scam-1', 'banking-scam-5']
  },
  {
    id: 'banking-scam-4',
    title: 'Fake Bank Representative Phone Calls (Vishing)',
    category: 'Banking',
    readTime: '6 min read',
    date: 'Dec 15, 2024',
    author: 'Sarah Jenkins, Behavioral Cyber Specialist',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Vishing', 'Caller ID Spoofing', 'Bank Fraud Department'],
    heroImage: 'Secure Voice Call',
    description: 'Scammers spoof official bank telephone numbers to call victims, claiming fraudulent activity is taking place and guiding them to transfer funds into "safe security accounts".',
    howItWorks: [
      'Scammers use caller ID spoofing software so your phone displays "Bank Fraud Department".',
      'The caller speaks professionally, referencing your full name and address acquired from data breaches.',
      'They convince you that your account is compromised and you must transfer funds to a "protected vault account".',
      'In reality, the vault account is owned by a fraud syndicate.'
    ],
    warningSigns: [
      'Callers telling you to move funds to a new or temporary "safe account".',
      'Refusal to allow you to hang up and call back on the official bank number.',
      'Requests to keep the telephone conversation completely confidential.'
    ],
    preventionTips: [
      'Hang up immediately if asked to transfer money for security purposes.',
      'Banks will NEVER ask you to move money into another account to protect it.',
      'Manually dial your bank\'s customer service phone number after hanging up.'
    ],
    realExample: {
      title: 'The "Safe Vault Account" Scam',
      description: 'An executive received a spoofed call from her bank warning that internal employees were trying to steal her deposits. She moved $45,000 to a "federal holding account" provided by the caller.'
    },
    faqs: [
      { question: 'Can caller ID display an official bank number accurately?', answer: 'Yes. Caller ID information is easily manipulated by spoofing tools. Never rely on caller ID alone.' }
    ],
    relatedIds: ['banking-scam-1', 'banking-scam-2']
  },
  {
    id: 'banking-scam-5',
    title: 'Account Takeover via SIM Swapping Attacks',
    category: 'Banking',
    readTime: '8 min read',
    date: 'Jan 04, 2025',
    author: 'Mobile Cyber Security Division',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['SIM Swap', 'SMS OTP', '2FA Hijack', 'Telecom'],
    heroImage: 'Mobile Cellular Network',
    description: 'Attackers trick mobile carriers into transferring your phone number to their SIM card, intercepting SMS 2FA codes to compromise online banking accounts.',
    howItWorks: [
      'Attackers gather personal details (SSN, birthdate, address) from public data breaches.',
      'They contact your mobile carrier posing as you, claiming your phone was lost or damaged.',
      'The carrier transfers your phone number to a new SIM card in the attacker\'s device.',
      'The attacker triggers password resets on your banking apps and receives the SMS verification codes.'
    ],
    warningSigns: [
      'Your mobile device suddenly loses all cellular signal and shows "No Service" unexpectedly.',
      'Receiving notifications that your mobile plan or device was updated.',
      'Inability to make calls or send text messages while in a normal service area.'
    ],
    preventionTips: [
      'Set up a secondary security PIN or passcode directly with your mobile carrier.',
      'Switch bank 2FA from SMS text messages to authenticator apps or hardware keys.',
      'Act immediately if your mobile signal drops without explanation.'
    ],
    realExample: {
      title: 'Midnight SIM Swap Robbery',
      description: 'A victim woke up to find no mobile network signal. Overnight, attackers swapped his SIM, reset his banking password via SMS, and drained $22,000 across four instant zelle transfers.'
    },
    faqs: [
      { question: 'How can I lock my SIM card against unauthorized transfers?', answer: 'Contact your mobile carrier and enable "Port Out Lock" and a strict verbal security PIN.' }
    ],
    relatedIds: ['banking-scam-1', 'mobile-scam-1']
  },
  {
    id: 'banking-scam-6',
    title: 'Fake Overpayment and Refund Cheque Frauds',
    category: 'Banking',
    readTime: '5 min read',
    date: 'Jan 12, 2025',
    author: 'Financial Intelligence Group',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Cheque Fraud', 'Overpayment', 'Cashier Cheque'],
    heroImage: 'Bank Cheque Processing',
    description: 'Victims receive an oversized official-looking cashier\'s cheque and are instructed to deposit it and wire back the difference before the cheque bounces days later.',
    howItWorks: [
      'Scammers send a counterfeit cheque for an amount greater than what is owed.',
      'They instruct you to deposit it and immediately wire back the surplus funds.',
      'Your bank temporarily makes funds available before clearing the cheque.',
      'Days later, the cheque fails verification, the bank clawbacks the entire amount, and you lose the wired funds.'
    ],
    warningSigns: [
      'Receiving a cheque for significantly more than the agreed purchase price.',
      'Pressure to wire back excess funds immediately upon deposit.',
      'Cheques issued from unknown overseas companies or third-party entities.'
    ],
    preventionTips: [
      'Never accept a cheque for more than the selling price.',
      'Wait until a cheque fully clears (up to 10 business days) before assuming funds are safe.',
      'Inform your bank teller if you suspect a cheque might be fraudulent.'
    ],
    realExample: {
      title: 'The Rental Deposit Overpayment',
      description: 'A landlord received a $5,000 cashier\'s cheque for a $1,500 rental deposit. The tenant asked for $3,500 back via wire. The cheque bounced a week later.'
    },
    faqs: [
      { question: 'Why does my bank account show available funds if a cheque hasn\'t cleared?', answer: 'Federal laws require banks to make funds available quickly, but full clearance verification takes several additional days.' }
    ],
    relatedIds: ['banking-scam-1', 'fraud-scam-1']
  },
  {
    id: 'banking-scam-7',
    title: 'Credential Stuffing Attacks on Banking Portals',
    category: 'Banking',
    readTime: '6 min read',
    date: 'Jan 18, 2025',
    author: 'Cyber Defense Operations',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Credential Stuffing', 'Password Reuse', 'Automated Bots'],
    heroImage: 'Database Security Shield',
    description: 'Automated botnets test millions of leaked username and password pairs against bank portals to exploit users who reuse passwords across websites.',
    howItWorks: [
      'Hackers obtain credentials leaked from non-financial website data breaches.',
      'They deploy automated scripts to test these credentials on major banking platforms.',
      'When a matching pair is found, the bot logs into the account automatically.',
      'Attackers configure automatic forwarders or add new transfer beneficiaries.'
    ],
    warningSigns: [
      'Receiving unexpected password reset emails from your bank.',
      'Alerts about logins from unfamiliar locations or unrecognized devices.',
      'Security notifications regarding added transfer recipients you did not create.'
    ],
    preventionTips: [
      'Use a unique, complex password for every single bank and financial account.',
      'Utilize a password manager to generate and store strong credentials.',
      'Enable multi-factor authentication (MFA) on all financial accounts.'
    ],
    realExample: {
      title: 'E-commerce Breach Leads to Bank Hack',
      description: 'A user reused their retail password on their credit union account. After the retailer suffered a breach, automated bots logged into his credit union and drained $4,200.'
    },
    faqs: [
      { question: 'Is reusing passwords safe if I change a single character?', answer: 'No. Automated botnet algorithms easily calculate predictable variation patterns.' }
    ],
    relatedIds: ['banking-scam-1', 'identity-scam-1']
  },
  {
    id: 'banking-scam-8',
    title: 'Fake Mobile Banking App Malware (Trojan Horses)',
    category: 'Banking',
    readTime: '7 min read',
    date: 'Feb 02, 2025',
    author: 'App Security Audit Team',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Android Trojan', 'Overlay Attack', 'Malware', 'APK'],
    heroImage: 'Mobile Application Code',
    description: 'Malicious Android applications installed outside official app stores render invisible login overlays on top of legitimate banking apps to harvest passwords.',
    howItWorks: [
      'Users download a third-party app (e.g. utility, PDF reader, flash game) from unofficial sites.',
      'The Trojan operates silently, waiting for the user to open a real banking app.',
      'It instantly draws an identical fake login screen directly over the real app.',
      'The user enters credentials into the overlay, sending them straight to the hacker.'
    ],
    warningSigns: [
      'Banking apps asking for login details twice in a row.',
      'Unusual battery drain or excessive pop-ups on your mobile device.',
      'Apps requesting invasive "Accessibility Service" permissions during installation.'
    ],
    preventionTips: [
      'Only download applications from official app stores (Google Play, Apple App Store).',
      'Never enable "Install from Unknown Sources" on Android devices.',
      'Use mobile anti-malware tools to scan your smartphone regularly.'
    ],
    realExample: {
      title: 'Anatsa Banking Trojan Infiltration',
      description: 'Over 100,000 users downloaded a rogue "QR Scanner" app that subsequently injected overlay screens onto 50+ European banking apps.'
    },
    faqs: [
      { question: 'Can iPhones get banking Trojan overlays?', answer: 'iOS sandbox restrictions make overlay malware extremely rare on non-jailbroken iPhones.' }
    ],
    relatedIds: ['mobile-scam-1', 'banking-scam-1']
  },
  {
    id: 'banking-scam-9',
    title: 'Exploiting Zelle & Instant Payment peer-to-peer Networks',
    category: 'Banking',
    readTime: '5 min read',
    date: 'Feb 10, 2025',
    author: 'Instant Payment Risk Unit',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Zelle', 'P2P', 'Instant Transfer', 'Social Engineering'],
    heroImage: 'Peer to Peer Network',
    description: 'Scammers trick account holders into sending Zelle payments to "me-to-me" accounts, exploiting the instant and irreversible nature of P2P transfers.',
    howItWorks: [
      'Scammer calls warning that fraudulent Zelle transfers were attempted on your account.',
      'They tell you to open your banking app and send a Zelle transfer to your own phone number to "cancel the fraud".',
      'The scammer has actually bound your phone number to their rogue bank account.',
      'The instant transfer lands directly in the scammer\'s bank account.'
    ],
    warningSigns: [
      'Callers telling you to Zelle money to yourself to stop a transaction.',
      'Requests to verify instant transfers via text confirmation codes.',
      'Claims that Zelle support requires a test transaction.'
    ],
    preventionTips: [
      'Understand that you NEVER need to transfer money to protect your account.',
      'Treat Zelle transfers like physical cash—once sent, funds cannot be retrieved.',
      'Only use P2P instant payments with friends and family you know personally.'
    ],
    realExample: {
      title: 'The "Zelle Reverse Transfer" Fraud',
      description: 'A customer was guided step-by-step over the phone to send $2,000 to "reverse a pending charge". The money was transferred instantly with zero recourse.'
    },
    faqs: [
      { question: 'Are Zelle transactions protected by buyer protection policies?', answer: 'No. Zelle is designed for instant peer-to-peer transfers and does not offer buyer purchase protection.' }
    ],
    relatedIds: ['payments-scam-1', 'banking-scam-4']
  },
  {
    id: 'banking-scam-10',
    title: 'Mule Accounts & Unwitting Money Laundering Schemes',
    category: 'Banking',
    readTime: '6 min read',
    date: 'Feb 20, 2025',
    author: 'Anti-Money Laundering (AML) Compliance',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Money Mule', 'AML', 'Illegal Transfer', 'Federal Offense'],
    heroImage: 'Global Banking Network',
    description: 'Fraud rings recruit unsuspecting individuals to receive stolen funds into their personal bank accounts and transfer them abroad for a small commission fee.',
    howItWorks: [
      'Scammers advertise remote "Payment Processing Agent" or "Fund Transfer Specialist" positions.',
      'They deposit stolen funds into your legitimate bank account.',
      'You are instructed to keep 10% and convert/wire the rest via crypto or wire transfer.',
      'When the stolen funds are traced, your account is frozen and you face criminal prosecution.'
    ],
    warningSigns: [
      'Job offers asking you to use your personal bank account to handle corporate transactions.',
      'Earning money simply for receiving and forwarding wire transfers.',
      'Instructions to buy gift cards or crypto with received funds.'
    ],
    preventionTips: [
      'Never allow third parties or online acquaintances to use your bank account.',
      'Refuse any job that involves receiving and forwarding money on behalf of others.',
      'Report unsolicited money transfer requests to legal authorities.'
    ],
    realExample: {
      title: 'The Work-From-Home Finance Agent Trap',
      description: 'A student earned $300 a week forwarding incoming bank deposits. Six months later, federal law enforcement arrested him for laundering stolen wire funds.'
    },
    faqs: [
      { question: 'Is being a money mule illegal even if I didn\'t know the money was stolen?', answer: 'Yes. Operating as a money mule is a federal crime that leads to account termination, civil liability, and criminal prosecution.' }
    ],
    relatedIds: ['employment-scam-1', 'banking-scam-2']
  },
  {
    id: 'banking-scam-11',
    title: 'Mortgage and Refinance Closing Payment Fraud',
    category: 'Banking',
    readTime: '7 min read',
    date: 'Mar 01, 2025',
    author: 'Real Estate Fraud Prevention Taskforce',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Mortgage', 'Refinance', 'Closing Costs', 'Title Company'],
    heroImage: 'Real Estate Settlement',
    description: 'Attackers spoof title company emails right before property settlement, sending updated bank routing details that hijack closing wire transfers.',
    howItWorks: [
      'Scammers monitor home buyers nearing closing date through compromised email threads.',
      'They send a bogus update stating that the settlement escrow bank account has changed.',
      'The home buyer wires their down payment or total home payoff directly to the fake bank.',
      'The fraud is discovered at the closing table when the title company reports no funds received.'
    ],
    warningSigns: [
      'Emails announcing sudden changes in settlement wire instructions.',
      'Discrepancies in email domain names (e.g., info@first-title.com vs info@firsttitle.com).',
      'High-pressure requests asking for immediate wiring to secure closing discounts.'
    ],
    preventionTips: [
      'Obtain wire instructions in person or via a verified phone call before wiring funds.',
      'Call the title company using a phone number verified from independent public records.',
      'Perform a test wire of $10 and verify receipt before sending full funds.'
    ],
    realExample: {
      title: 'Lost Savings at the Closing Table',
      description: 'A couple wired $125,000 for their dream home following updated email instructions. The funds vanished into an overseas bank account within minutes.'
    },
    faqs: [
      { question: 'Who is liable if escrow wire instructions are spoofed?', answer: 'In most legal jurisdictions, the sender who wired funds without independent phone verification bears the loss.' }
    ],
    relatedIds: ['banking-scam-2', 'banking-scam-1']
  },
  {
    id: 'banking-scam-12',
    title: 'Man-in-the-Middle (MitM) Wi-Fi Interception of Bank Portals',
    category: 'Banking',
    readTime: '5 min read',
    date: 'Mar 15, 2025',
    author: 'Network Security Audit Team',
    severity: 'Medium',
    difficultyLevel: 'Intermediate',
    tags: ['WiFi', 'MitM', 'Public Network', 'SSL Strip'],
    heroImage: 'Wireless Access Point',
    description: 'Rogue Wi-Fi hotspots in airports and coffee shops intercept unencrypted mobile traffic to capture online banking credentials and session tokens.',
    howItWorks: [
      'Hackers set up an open Wi-Fi network named "Airport_Free_HighSpeed_WiFi".',
      'Unsuspecting users connect and open their online banking applications.',
      'The hacker\'s router inspects HTTP traffic, strips SSL security encryption, and intercepts credentials.',
      'Session cookies are hijacked to bypass login prompts.'
    ],
    warningSigns: [
      'Public Wi-Fi networks requiring no password or terms confirmation.',
      'Browser warnings showing "Connection is Not Private" or SSL certificate invalid errors.',
      'Unusual redirect pages when accessing secure banking domains.'
    ],
    preventionTips: [
      'Never access sensitive online banking portals over open public Wi-Fi networks.',
      'Always use a reputable Virtual Private Network (VPN) when traveling.',
      'Stick to mobile cellular data (LTE/5G) for financial transactions.'
    ],
    realExample: {
      title: 'Coffee Shop Network Session Theft',
      description: 'A traveler logged into her bank on free coffee shop Wi-Fi. A rogue device intercepted her session cookie, allowing the hacker to transfer funds without needing her password.'
    },
    faqs: [
      { question: 'Does HTTPS protect me on public Wi-Fi?', answer: 'HTTPS provides encryption, but SSL-stripping tools used by hackers can degrade connections if strict HSTS policies are missing.' }
    ],
    relatedIds: ['mobile-scam-1', 'banking-scam-1']
  },
  {
    id: 'banking-scam-13',
    title: 'Fake Debit Card Freeze Alerts & Voice Response Traps',
    category: 'Banking',
    readTime: '5 min read',
    date: 'Apr 02, 2025',
    author: 'Consumer Financial Protection Unit',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['IVR', 'Automated Voice', 'Debit Card', 'Freeze Alert'],
    heroImage: 'Telephone Keypad Alert',
    description: 'Interactive Voice Response (IVR) phone calls inform victims that their debit card is deactivated, prompting them to enter card numbers and CVV codes on their phone keypad.',
    howItWorks: [
      'An automated call states: "Your Visa debit card ending in 4012 has been frozen due to security alerts."',
      'It asks you to press 1 and enter your 16-digit card number, expiration date, and 3-digit CVV to reactivate.',
      'An automated script captures the key tones and immediately executes online purchases.'
    ],
    warningSigns: [
      'Automated calls asking you to type full card details onto your phone dial pad.',
      'Messages threatening card deactivation unless immediate phone action is taken.',
      'Robocalls originating from non-bank toll-free numbers.'
    ],
    preventionTips: [
      'Hang up instantly on any automated call demanding credit or debit card entry.',
      'Check card status directly inside your bank\'s official mobile application.',
      'Enable instant card transaction notification alerts on your phone.'
    ],
    realExample: {
      title: 'Keypad Capture Robocall',
      description: 'A retiree entered his debit card details during an automated "card restoration" call, losing $1,800 in fraudulent online retail purchases within 10 minutes.'
    },
    faqs: [
      { question: 'Do banks use automated calls to freeze cards?', answer: 'Banks send automated security alerts via SMS or push notifications asking you to confirm "YES" or "NO", but never demand full card details via keypad.' }
    ],
    relatedIds: ['banking-scam-4', 'banking-scam-1']
  },
  {
    id: 'banking-scam-14',
    title: 'Corporate Treasury & Payroll Account Takeovers',
    category: 'Banking',
    readTime: '7 min read',
    date: 'Apr 18, 2025',
    author: 'Enterprise Cyber Risk Advisory',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Payroll', 'Treasury', 'ACH', 'Corporate Banking'],
    heroImage: 'Corporate Headquarters',
    description: 'Attackers spear-phish HR and payroll managers to alter employee direct deposit bank accounts, diverting company payrolls into rogue accounts.',
    howItWorks: [
      'Attackers send spoofed emails pretending to be executives requesting an urgent direct deposit update.',
      'The email provides new bank account details for upcoming payroll distributions.',
      'HR updates the payroll system without verbal verification.',
      'On payday, direct deposit funds flow straight into cybercriminal accounts.'
    ],
    warningSigns: [
      'Emails requesting direct deposit account updates sent from external domains or altered addresses.',
      'Employees asking for immediate payroll updates right before cutoff dates.',
      'Requests prohibiting verbal or multi-channel confirmation.'
    ],
    preventionTips: [
      'Require mandatory self-service portal updates or multi-factor verbal confirmation for all direct deposit updates.',
      'Implement strict internal audit controls on corporate payroll modifications.',
      'Train HR personnel on executive spear-phishing tactics.'
    ],
    realExample: {
      title: 'Company Payroll Diversion Attack',
      description: 'An HR manager changed direct deposit routing for three C-suite executives based on spoofed emails, diverting $65,000 in monthly salary payments.'
    },
    faqs: [
      { question: 'Can ACH direct deposits be recalled?', answer: 'ACH recall requests must be submitted within strict time windows (usually 5 days), but success depends on whether funds remain in the target account.' }
    ],
    relatedIds: ['banking-scam-2', 'employment-scam-1']
  },
  {
    id: 'banking-scam-15',
    title: 'Synthetic Identity Creation for Fraudulent Bank Credit',
    category: 'Banking',
    readTime: '6 min read',
    date: 'May 01, 2025',
    author: 'Credit Bureau & Identity Threat Research',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Synthetic Identity', 'Credit Fraud', 'SSN Manipulation'],
    heroImage: 'Digital Identity Matrix',
    description: 'Cybercriminals combine real Social Security Numbers with fake names and birthdates to build synthetic credit profiles and max out bank loans.',
    howItWorks: [
      'Criminals harvest unassigned SSNs (often belonging to children or elderly individuals).',
      'They pair the SSN with a fake name and apply for credit, generating a blank credit file.',
      'Over months or years, they cultivate a positive credit score with small payments.',
      'Once high credit limits are granted, they max out credit lines and vanish ("bust-out fraud").'
    ],
    warningSigns: [
      'Credit bureau notices sent to your address for names of people who never lived there.',
      'Children receiving pre-approved credit card mailers.',
      'Inquiries on your credit report from unknown financial institutions.'
    ],
    preventionTips: [
      'Freeze credit bureau files for yourself and your minor children.',
      'Monitor credit reports regularly through official credit reporting services.',
      'Shred all physical documents containing sensitive identification info.'
    ],
    realExample: {
      title: 'Child SSN Synthetic Identity Ring',
      description: 'A syndicate generated 200 synthetic identities using SSNs of minors, accumulating over $3 million in fraudulent credit card debt before discovery.'
    },
    faqs: [
      { question: 'How do I know if my child\'s SSN is being used synthetically?', answer: 'Request a manual credit file search from credit bureaus for your child\'s SSN.' }
    ],
    relatedIds: ['identity-scam-1', 'banking-scam-1']
  }
];
