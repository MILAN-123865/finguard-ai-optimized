import { Article } from './articles';

export const fraudArticles: Article[] = [
  {
    id: 'fraud-scam-1',
    title: 'Government Agency Impersonation (IRS, Social Security, Police)',
    category: 'General Fraud',
    readTime: '5 min read',
    date: 'Dec 05, 2024',
    author: 'Federal Consumer Protection Taskforce',
    severity: 'Critical',
    difficultyLevel: 'Beginner',
    tags: ['IRS', 'Social Security', 'Government Impersonation', 'Arrest Threat', 'Gift Card'],
    heroImage: 'Government Treasury Seal',
    description: 'Impostors spoof official government agency phone numbers, threatening immediate arrest or license suspension unless outstanding tax debts or fines are paid in gift cards or Bitcoin.',
    howItWorks: [
      'You receive an urgent phone call: "This is Officer Davis from the Social Security Administration. Your SSN has been linked to drug trafficking in Texas."',
      'The caller threatens that local police will arrive at your home within 30 minutes to execute an arrest warrant.',
      'To "suspend the warrant", you are ordered to withdraw $3,000 cash and purchase Target/Apple gift cards or deposit cash at a Bitcoin kiosk.',
      'Panicked victims comply, transmitting untraceable codes over the phone.'
    ],
    warningSigns: [
      'Callers claiming to be from the IRS, SSA, or police demanding immediate payment to avoid arrest.',
      'Demands for payment via non-standard methods: Gift cards, Bitcoin, wire transfers, or Zelle.',
      'Callers instructing you to stay on the phone while traveling to retail stores or ATMs.'
    ],
    preventionTips: [
      'Government agencies NEVER call threatening immediate arrest or demanding gift cards/crypto.',
      'If you receive a suspicious call, hang up immediately.',
      'Call the agency\'s official phone number listed on .gov websites to verify your account status.'
    ],
    realExample: {
      title: 'The Social Security Warrant Extortion',
      description: 'A victim received a call showing "Social Security Admin" on caller ID. Panicked by arrest threats, she bought $4,000 in gift cards before realizing the call was spoofed.'
    },
    faqs: [
      { question: 'Does caller ID prove a government agency is calling me?', answer: 'No. Scammers routinely spoof caller ID phone numbers to display official police or agency names.' }
    ],
    relatedIds: ['payments-scam-5', 'identity-scam-1'],
    isTrending: true
  },
  {
    id: 'fraud-scam-2',
    title: 'Overpayment Cheque & Wire Refund Return Traps',
    category: 'General Fraud',
    readTime: '6 min read',
    date: 'Dec 22, 2024',
    author: 'Financial Fraud Operations Unit',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Overpayment', 'Fake Cheque', 'Refund Scam', 'Bounced Cheque'],
    heroImage: 'Financial Transaction Receipt',
    description: 'Scammers "accidental overpay" for items listed online or send accidental Venmo/Zelle transfers, asking you to wire back the surplus before their initial payment bounces.',
    howItWorks: [
      'You list a piano online for $500. A buyer sends a cashier\'s cheque for $2,500, claiming an "assistant error".',
      'The buyer asks you to deposit the cheque and wire the $2,000 surplus back via Zelle or wire transfer.',
      'You deposit the cheque, see funds in your provisional balance, and wire $2,000 to the buyer.',
      'A week later, the cheque fails clearance verification, and the bank deducts the full $2,500 from your account.'
    ],
    warningSigns: [
      'Buyers sending cheques or payments exceeding the agreed transaction purchase price.',
      'Urgent requests to return overpaid balances via irreversible wire or peer-to-peer transfers.',
      'Buyers refusing in-person pickup or cash payment on local listings.'
    ],
    preventionTips: [
      'NEVER accept cheques for more than the agreed purchase price.',
      'If someone sends an overpayment cheque, destroy it and refuse the transaction.',
      'If you receive an unsolicited Zelle transfer, do NOT transfer money back—contact bank customer support.'
    ],
    realExample: {
      title: 'Overpaid Classifieds Furniture Loss',
      description: 'A seller accepted a $3,000 cheque for a $600 table and wired back $2,400. The cheque bounced 6 days later, leaving her bank account $2,400 negative.'
    },
    faqs: [
      { question: 'Why should I not send back accidental Zelle transfers myself?', answer: 'Scammers use stolen credit cards for initial Zelle transfers. When the bank reverses the stolen transaction, any manual return transfer you sent comes out of your own pocket.' }
    ],
    relatedIds: ['financial-scam-4', 'payments-scam-1'],
    isTrending: true
  },
  {
    id: 'fraud-scam-3',
    title: 'Utility Service Disconnection & Meter Tampering Threats',
    category: 'General Fraud',
    readTime: '4 min read',
    date: 'Jan 10, 2025',
    author: 'Utility Protection & Energy Audit',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Utility Scam', 'Electric Disconnect', 'Power Cut', 'Urgent Payment'],
    heroImage: 'Electric Power Grid Terminal',
    description: 'Callers impersonate local electric or gas utility companies, threatening that power will be shut off in 30 minutes unless overdue bills are paid immediately via GreenDot or Zelle.',
    howItWorks: [
      'A caller targets a restaurant during peak lunch hours, claiming to be "City Electric Utility".',
      'They state: "Your electric bill is past due. Technicians will shut off your main power grid in 45 minutes."',
      'To prevent the shutdown, the business owner must buy prepaid reload cards or Zelle money right away.',
      'The panicked owner transfers $1,500 to keep their business running; the call was completely fake.'
    ],
    warningSigns: [
      'Threats of immediate power or water shutoff within 30-60 minutes.',
      'Utility callers demanding payment via prepaid debit cards, gift cards, or Zelle.',
      'Calls targeted at small businesses during their busiest operating hours.'
    ],
    preventionTips: [
      'Legitimate utility companies send multiple written disconnect notices via mail weeks in advance.',
      'Utility workers never demand instant payment over the phone via gift cards or Zelle.',
      'Hang up and call the official customer service phone number printed on your real utility bill.'
    ],
    realExample: {
      title: 'Restaurant Rush Hour Power Cut Threat',
      description: 'A restaurant manager paid $1,800 via Zelle during a busy Friday dinner rush after a caller threatened to shut off electric power in 30 minutes.'
    },
    faqs: [
      { question: 'Do utility companies shut off power without prior mail notices?', answer: 'No. Public utility regulations mandate written postal mail warnings before executing service disconnections.' }
    ],
    relatedIds: ['fraud-scam-1', 'payments-scam-5']
  },
  {
    id: 'fraud-scam-4',
    title: 'Jury Duty Absence & Court Arrest Warrant Extortion',
    category: 'General Fraud',
    readTime: '5 min read',
    date: 'Jan 25, 2025',
    author: 'Judicial & Law Enforcement Protection Unit',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Jury Duty', 'Court Warrant', 'Contempt of Court', 'Fine Scam'],
    heroImage: 'Courtroom Legal Bench',
    description: 'Scammers call claiming you missed mandatory Jury Duty and that a judge issued a "Contempt of Court" arrest warrant, demanding you pay bail fines over the phone.',
    howItWorks: [
      'A caller posing as a Deputy Sheriff states: "You failed to report for federal Jury Duty this morning."',
      'They warn that a judge signed an arrest warrant carrying a $1,500 fine or 30 days in jail.',
      'They tell you to pay the "court failure fine" at a local kiosk or over the phone to clear the warrant.',
      'Once paid, the scammer claims the warrant is cleared; in reality, no jury summons ever existed.'
    ],
    warningSigns: [
      'Callers identifying as Sheriff deputies demanding fine payments for missed jury duty over the phone.',
      'Threats of immediate jail arrest if you hang up the phone.',
      'Requests to pay court fines via wire transfers, prepaid debit cards, or Bitcoin.'
    ],
    preventionTips: [
      'Jury duty summons and failure-to-appear notices are ALWAYS handled exclusively via postal mail.',
      'Court officers and police will NEVER call demanding phone fine payments to clear warrants.',
      'Contact your local county clerk of courts directly to confirm jury service schedules.'
    ],
    realExample: {
      title: 'The Fake Jury Duty Fine Extortion',
      description: 'A caller claiming to be a county deputy convinced a victim to pay $1,200 in "court fines" via gift cards to avoid being arrested for missing jury duty.'
    },
    faqs: [
      { question: 'How do courts handle missed jury duty legally?', answer: 'Courts issue formal written notices or orders to show cause via postal mail, requiring physical court appearances.' }
    ],
    relatedIds: ['fraud-scam-1', 'identity-scam-10']
  },
  {
    id: 'fraud-scam-5',
    title: 'Tech Support "Lockscreen Virus" & Remote Access Exploits',
    category: 'General Fraud',
    readTime: '6 min read',
    date: 'Feb 08, 2025',
    author: 'Cyber Incident & Tech Support Response',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Tech Support', 'Remote Access', 'AnyDesk', 'Microsoft Support', 'Pop Up'],
    heroImage: 'Computer Desktop Monitor Warning',
    description: 'Browser pop-ups lock your screen with loud audio alarms claiming "Windows/Mac Security Warning", instructing you to call a toll-free number that installs remote control trojans.',
    howItWorks: [
      'While browsing the web, your screen locks with full-screen red alerts and loud siren sounds: "COMPUTER INFECTED! Call Microsoft at 1-800-XXX-XXXX immediately!".',
      'You call the number and speak to a fake "Support Technician".',
      'They instruct you to download remote desktop software (AnyDesk, TeamViewer) to "clean viruses".',
      'Once connected, they access your online bank accounts, transfer funds, and charge $500 for fake cleanup.'
    ],
    warningSigns: [
      'Full-screen browser pop-ups that refuse to close and play blaring alarm sounds.',
      'Callers asking you to install remote access tools (AnyDesk, TeamViewer, LogMeIn).',
      'Tech support demanding hundreds of dollars in gift cards or wire transfers to fix software.'
    ],
    preventionTips: [
      'Microsoft, Apple, and antivirus companies NEVER put phone numbers on pop-ups telling you to call them.',
      'If your browser freezes, force-close it using Task Manager (Ctrl+Alt+Del) or Activity Monitor on Mac.',
      'NEVER grant remote control of your computer to unsolicited telephone callers.'
    ],
    realExample: {
      title: 'Remote Access Banking Account Drain',
      description: 'An elderly user called a fake Microsoft pop-up number and granted remote access. The scammer accessed her bank account and transferred $22,000 out before she disconnected.'
    },
    faqs: [
      { question: 'What should I do if I gave a scammer remote access to my computer?', answer: 'Disconnect your Wi-Fi immediately, shut down the computer, call your bank to freeze accounts, and take the device to a professional technician.' }
    ],
    relatedIds: ['fraud-scam-1', 'mobile-scam-7']
  },
  {
    id: 'fraud-scam-6',
    title: 'Grandparent Emergency & Bail Bond Impersonation',
    category: 'General Fraud',
    readTime: '5 min read',
    date: 'Feb 22, 2025',
    author: 'Elder Financial Safety & Abuse Watch',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Grandparent Scam', 'Bail Bond', 'Emergency', 'Elder Fraud', 'Cash Courier'],
    heroImage: 'Telephone Receiver Handset',
    description: 'Scammers target elderly individuals, crying over the phone while posing as a grandchild in jail following a car accident, demanding cash picked up by a "court courier".',
    howItWorks: [
      'An elderly person receives a distress call: "Grandma, I\'m in jail! I got into a car crash and hit a pregnant woman! Please help me!"',
      'A fake "Public Defender" takes the phone, stating $9,000 cash bail is needed immediately.',
      'They tell the victim: "Keep this secret because of a court gag order. Put cash in an envelope and a court courier will pick it up at your house in 1 hour."',
      'A real driver arrives at the house, collects the cash envelope, and delivers it to crime rings.'
    ],
    warningSigns: [
      'Distress calls from relatives claiming to be in foreign jails or police custody.',
      'Callers begging you to keep the situation secret from other family members.',
      'Demands for physical cash pickup at your residence by "couriers" or "bail bondsmen".'
    ],
    preventionTips: [
      'Always hang up and call your grandchild or their parents directly on known phone numbers.',
      'Never hand envelopes of physical cash to unknown couriers arriving at your home.',
      'Establish a secret family passcode to confirm identity during alleged emergencies.'
    ],
    realExample: {
      title: 'In-Person Cash Courier Bail Trap',
      description: 'An 81-year-old grandmother handed $10,000 in cash to a "bail courier" at her front door, thinking her grandson was in jail. Her real grandson was safe at work.'
    },
    faqs: [
      { question: 'Do courts or police send couriers to homes to collect cash bail?', answer: 'No. Bail payments must be posted officially at court clerks\' offices or law enforcement facilities.' }
    ],
    relatedIds: ['social-scam-1', 'social-scam-5']
  },
  {
    id: 'fraud-scam-7',
    title: 'Unsolicited Brushing Packages & E-Commerce Review Fraud',
    category: 'General Fraud',
    readTime: '4 min read',
    date: 'Mar 08, 2025',
    author: 'E-Commerce Integrity & Logistics Watch',
    severity: 'Low',
    difficultyLevel: 'Beginner',
    tags: ['Brushing', 'Unsolicited Package', 'Amazon Review', 'Fake Order'],
    heroImage: 'Cardboard Delivery Package',
    description: 'You receive cheap unsolicited items (seeds, ring light, socks) in the mail from Amazon sellers using your name to post fake "Verified Buyer" positive product reviews.',
    howItWorks: [
      'Rogue e-commerce sellers find your name and address in public data leaks.',
      'They create fake buyer accounts in your name and order cheap items to your address.',
      'The package arrives at your home unexpectedly.',
      'Because the tracking shows "Delivered", the seller posts glowing 5-star product reviews under your verified name to boost sales.'
    ],
    warningSigns: [
      'Receiving low-value merchandise packages in the mail that you never ordered.',
      'Packages lacking packing slips or sender return addresses.',
      'Notices from e-commerce platforms confirming orders you didn\'t make.'
    ],
    preventionTips: [
      'Under FTC regulations, you are legally entitled to keep unsolicited merchandise sent to your home for free.',
      'Check your credit card statements to ensure you were not actually billed for the items.',
      'Report brushing packages to major platforms (like Amazon or eBay) to ban review manipulators.'
    ],
    realExample: {
      title: 'Unsolicited Seed & Jewelry Brushing Wave',
      description: 'A homeowner received 12 unsolicited packages containing cheap jewelry over three weeks as foreign sellers farmed verified positive reviews.'
    },
    faqs: [
      { question: 'Am I required to return brushing packages to the sender?', answer: 'No. Federal law allows you to keep any unsolicited physical items mailed to your address as free gifts.' }
    ],
    relatedIds: ['mobile-scam-1', 'social-scam-7']
  },
  {
    id: 'fraud-scam-8',
    title: 'Extortion Sextortion Emails & Stolen Password Dump Claims',
    category: 'General Fraud',
    readTime: '5 min read',
    date: 'Mar 22, 2025',
    author: 'Cyber Extortion & Privacy Audit Group',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Sextortion', 'Extortion Email', 'Stolen Password', 'Pegasus Spyware'],
    heroImage: 'Email Inbox Security',
    description: 'Mass phishing emails include an old leaked password of yours, claiming hackers recorded adult webcam footage of you and demanding $1,000 in Bitcoin to delete it.',
    howItWorks: [
      'You receive an email with the subject line: "Security Breach: I know your password [your_old_password]".',
      'The email claims hackers installed "Pegasus spyware" on your device, recording video while you visited adult websites.',
      'They threaten to send the video to all your email and Facebook contacts within 48 hours unless you pay $1,500 in Bitcoin.',
      'The email is a total mass-bluff spam campaign—they bought old password leaks from dark web databases and recorded zero footage.'
    ],
    warningSigns: [
      'Emails citing an old password of yours alongside threats of video leaks.',
      'Claims that "Pegasus malware" or keyloggers were installed on your computer.',
      'Demands for Bitcoin payments accompanied by 48-hour countdown threats.'
    ],
    preventionTips: [
      'Understand that these mass-extortion emails are 100% automated spam bluffs.',
      'If the email contains a password you still use, change it immediately across all accounts.',
      'Do NOT respond to or pay the email—simply delete it and report as spam.'
    ],
    realExample: {
      title: 'Mass Email Password Leak Extortion',
      description: 'A user panicked when an email cited his real password from a 2018 LinkedIn data leak. He almost paid $1,000 in Bitcoin before learning it was a mass spam campaign.'
    },
    faqs: [
      { question: 'How did the scammer get my old password in the email?', answer: 'Scammers buy dark web database dumps of past corporate data breaches (like Yahoo or LinkedIn) to automatically populate mass spam emails.' }
    ],
    relatedIds: ['social-scam-13', 'identity-scam-2']
  },
  {
    id: 'fraud-scam-9',
    title: 'Fake Moving Company Hostage Cargo & Price Inflation Extortion',
    category: 'General Fraud',
    readTime: '6 min read',
    date: 'Apr 05, 2025',
    author: 'Interstate Freight & Consumer Protection',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Rogue Movers', 'Hostage Goods', 'Moving Scam', 'Price Inflation'],
    heroImage: 'Moving Truck Transport',
    description: 'Rogue moving companies offer low estimates online, load all your furniture into their truck, and then demand $5,000 extra cash on delivery day, holding your belongings hostage.',
    howItWorks: [
      'You hire a moving broker online offering a cheap $2,000 estimate for interstate relocation.',
      'Movers arrive, load your household furniture, and drive away.',
      'The next day, they call stating: "Your cargo weight exceeded estimates. Pay an extra $4,500 in cash right now or we will auction off your furniture."',
      'Your belongings are held hostage in an undisclosed warehouse until you pay the extortion fee.'
    ],
    warningSigns: [
      'Moving companies offering online quotes without conducting in-person or video home inventory audits.',
      'Movers demanding cash-only or postal money order payments upon delivery.',
      'Companies lacking valid DOT (Department of Transportation) registration numbers.'
    ],
    preventionTips: [
      'Verify interstate movers on the official Federal Motor Carrier Safety Administration (FMCSA) portal (protectyourmove.gov).',
      'Insist on binding physical estimates before allowing furniture to be loaded onto trucks.',
      'Avoid moving brokers who re-sell your contract to unverified third-party truckers.'
    ],
    realExample: {
      title: 'Interstate Hostage Moving Extortion',
      description: 'A family\'s furniture was held hostage in a truck for two weeks while a rogue moving company demanded an extra $6,000 cash fee above the agreed contract.'
    },
    faqs: [
      { question: 'What is protectyourmove.gov?', answer: 'Protectyourmove.gov is the official US DOT website to check moving company licensing, safety ratings, and complaint histories.' }
    ],
    relatedIds: ['payments-scam-14', 'fraud-scam-1']
  },
  {
    id: 'fraud-scam-10',
    title: 'Pet Purchase & Purebreed Adoption Shipping Traps',
    category: 'General Fraud',
    readTime: '5 min read',
    date: 'Apr 19, 2025',
    author: 'Animal Welfare & Consumer Protection',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Pet Scam', 'Puppy Fraud', 'Climate Crate', 'Shipping Fee'],
    heroImage: 'Purebred Pet Puppy',
    description: 'Fake breeder websites list adorable purebred puppies or kittens for adoption, constantly demanding extra money for "temperature-controlled shipping crates" and "pet insurance".',
    howItWorks: [
      'You find a beautiful French Bulldog puppy advertised online for $600 adoption fee.',
      'You pay the $600 fee via Zelle.',
      'The breeder states the puppy is at the airport, but you must wire $800 for a "special climate-controlled shipping crate".',
      'Subsequent demands arrive for $500 "pet vaccine insurance"; the puppy does not exist.'
    ],
    warningSigns: [
      'Breeders refusing live video calls or in-person visits to see the pet before payment.',
      'Demands for sequential payments for "special crates", "flight insurance", or "customs clearance".',
      'Sellers insisting on payment via cash apps, Zelle, or gift cards.'
    ],
    preventionTips: [
      'Never buy or adopt a pet without seeing the animal in person or via live video calls.',
      'Perform reverse-image searches on photos listed on breeder websites.',
      'Adopt pets locally through recognized animal shelters or verified regional rescue groups.'
    ],
    realExample: {
      title: 'French Bulldog Adoption Crate Scam',
      description: 'A buyer paid $500 for a puppy and $1,200 in sequential "climate crate" fees before realizing the puppy photos were stolen from an Instagram account.'
    },
    faqs: [
      { question: 'How can I test if a pet listing is real?', answer: 'Ask the seller to take a video holding the pet while holding a piece of paper with today\'s date written on it.' }
    ],
    relatedIds: ['social-scam-7', 'payments-scam-5']
  },
  {
    id: 'fraud-scam-11',
    title: 'Home Solar Panel Installation & False Utility Rebate Traps',
    category: 'General Fraud',
    readTime: '6 min read',
    date: 'May 03, 2025',
    author: 'Consumer Energy & Solar Inspection Board',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Solar Scam', 'Free Solar', 'Utility Rebate', 'Predatory Financing'],
    heroImage: 'Residential Solar Roof Panels',
    description: 'Door-to-door sales reps claim "The Government is installing FREE solar panels on your roof!", tricking homeowners into signing 25-year $40,000 high-interest solar leases.',
    howItWorks: [
      'A salesperson visits claiming your home qualifies for a "100% Free Government Solar Program".',
      'They present a tablet computer, asking for a signature to "check eligibility".',
      'The signature is secretly applied to a binding 25-year, $45,000 solar financing lease contract.',
      'Panels are installed improperly, electric bills double, and a property lien is placed on your home.'
    ],
    warningSigns: [
      'Claims that solar panels are "completely free" under government mandate programs.',
      'Salespeople pressuring you to sign contracts immediately on a digital tablet without reading.',
      'Promises that your electric bill will be permanently $0.'
    ],
    preventionTips: [
      'Understand that NO government program provides completely free solar installation.',
      'Never sign tablet documents without receiving complete printed paper copies to read overnight.',
      'Obtain multiple quotes from licensed local solar contractors.'
    ],
    realExample: {
      title: 'Elderly Homeowner Solar Lease Lien',
      description: 'An elderly homeowner was tricked into signing a $50,000 solar lease on a tablet. The monthly solar payment exceeded her electric bill and placed a lien on her house.'
    },
    faqs: [
      { question: 'Is the Federal Solar Tax Credit a check sent directly to me?', answer: 'No. The Federal ITC is a tax credit that reduces federal income tax liability—it is not an upfront cash refund.' }
    ],
    relatedIds: ['financial-scam-11', 'fraud-scam-12']
  },
  {
    id: 'fraud-scam-12',
    title: 'Home Improvement Contractor Upfront Cash Deposit Frauds',
    category: 'General Fraud',
    readTime: '5 min read',
    date: 'May 17, 2025',
    author: 'Contractor Licensing & Consumer Protection',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Contractor Fraud', 'Home Repair', 'Upfront Cash', 'Unlicensed Contractor'],
    heroImage: 'Construction Tools Home Repair',
    description: 'Unlicensed contractors solicit roof or driveway repairs following storms, demanding 50% upfront cash deposits for materials before abandoning the job site.',
    howItWorks: [
      'A contractor knocks on your door claiming: "I just finished a job down the street and have extra materials to fix your roof cheap."',
      'They demand a $3,500 cash deposit to purchase supplies.',
      'You pay the cash deposit.',
      'The contractor does 1 hour of light demolition work, leaves the job site, and never returns.'
    ],
    warningSigns: [
      'Contractors soliciting door-to-door demanding large cash deposits upfront.',
      'Unwillingness to provide written contracts or state contractor license numbers.',
      'Vehicles lacking official business branding or license information.'
    ],
    preventionTips: [
      'Verify contractor licenses and insurance coverage with your state licensing board.',
      'Never pay more than 10-15% or $1,000 as an initial deposit before work starts.',
      'Never pay contractors in cash—use checks or credit cards linked to milestone completions.'
    ],
    realExample: {
      title: 'Post-Storm Roof Deposit Fraud',
      description: 'Following a hail storm, an unlicensed contractor collected $4,000 cash deposits from six homeowners on one street and vanished without doing repairs.'
    },
    faqs: [
      { question: 'How much upfront deposit is reasonable for home repairs?', answer: 'Most state consumer laws cap reasonable contractor upfront deposits at 10% to 30% of total project costs.' }
    ],
    relatedIds: ['fraud-scam-11', 'fraud-scam-1']
  },
  {
    id: 'fraud-scam-13',
    title: 'Online Event Ticket & Concert Pass Counterfeit Schemes',
    category: 'General Fraud',
    readTime: '4 min read',
    date: 'Jun 01, 2025',
    author: 'Event Ticket Consumer Protection',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Concert Ticket', 'Event Scam', 'Fake Ticket', 'Barcode Fraud'],
    heroImage: 'Concert Stage Ticket Pass',
    description: 'Fraudsters sell duplicated digital PDF concert tickets on social media classifieds, resulting in fans being denied entry at venue turnstiles.',
    howItWorks: [
      'Concert tickets sell out instantly for a popular tour.',
      'A seller lists 2 mobile tickets on Facebook Marketplace for $200 each.',
      'You send payment via Zelle and receive a digital PDF ticket barcode.',
      'At the venue entrance, the scanner rejects your ticket—the seller emailed the same PDF barcode to 15 different buyers.'
    ],
    warningSigns: [
      'Sellers offering sold-out concert tickets at face-value prices on social media.',
      'Refusal to use official ticket transfer systems (like Ticketmaster Mobile Transfer).',
      'Demands for payment via non-protected payment methods (Zelle, Venmo, gift cards).'
    ],
    preventionTips: [
      'Buy resale tickets exclusively through verified platforms offering buyer guarantees (SeatGeek, StubHub, official app transfers).',
      'Avoid buying raw PDF ticket files from individuals met on Facebook or Craigslist.',
      'Insist on official app-to-app mobile ticket transfers.'
    ],
    realExample: {
      title: 'Sold-Out Tour PDF Ticket Duplicate Loss',
      description: 'A fan bought two PDF concert tickets for $400 via Zelle. At the venue gate, venue staff informed her the barcode had already been scanned hours earlier.'
    },
    faqs: [
      { question: 'Why are raw PDF tickets risky to buy privately?', answer: 'PDF tickets can be printed or emailed an infinite number of times, but only the first person to scan at the gate gets in.' }
    ],
    relatedIds: ['payments-scam-4', 'social-scam-7']
  },
  {
    id: 'fraud-scam-14',
    title: 'Vehicle History Report & Fake VIN Inspection Websites',
    category: 'General Fraud',
    readTime: '4 min read',
    date: 'Jun 15, 2025',
    author: 'Automotive VIN Safety Watch',
    severity: 'Low',
    difficultyLevel: 'Beginner',
    tags: ['VIN Scam', 'Vehicle History', 'Carfax Fake', 'Phishing Portal'],
    heroImage: 'Automotive Engine Hood',
    description: 'Sellers listing cars online receive messages from buyers demanding a "vehicle history check" from a specific obscure website that steals credit card information.',
    howItWorks: [
      'You list your used car for sale online.',
      'A prospective buyer messages: "I\'m interested! But I only buy cars with a report from SafeCarVINCheck.com. Buy one and send me the PDF."',
      'You visit the site and pay $25 by credit card to generate a report.',
      'The buyer vanishes; the website was a phishing setup designed to steal your credit card details.'
    ],
    warningSigns: [
      'Buyers insisting you use a specific, unknown vehicle history website rather than Carfax or AutoCheck.',
      'Buyers refusing to talk on the phone until you purchase the requested report.',
      'History check websites charging unusual subscription recurring fees.'
    ],
    preventionTips: [
      'Rely exclusively on recognized vehicle history providers (Carfax, AutoCheck, or official NMVTIS providers).',
      'If a buyer demands an obscure report, tell them to purchase it themselves.',
      'Never enter credit card details on unverified automotive history sites.'
    ],
    realExample: {
      title: 'Fake VIN Report Credit Harvest',
      description: 'A seller paid $20 for an obscure VIN report requested by a buyer. The site stolen her credit card number and charged $800 in fraudulent online purchases.'
    },
    faqs: [
      { question: 'What is NMVTIS?', answer: 'NMVTIS (National Motor Vehicle Title Information System) is the official federal database designed to protect consumers from vehicle fraud.' }
    ],
    relatedIds: ['payments-scam-2', 'fraud-scam-2']
  },
  {
    id: 'fraud-scam-15',
    title: 'Charity Impersonation & Fake Veteran Relief Organizations',
    category: 'General Fraud',
    readTime: '5 min read',
    date: 'Jul 01, 2025',
    author: 'Charity Oversight & Non-Profit Integrity',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Charity Fraud', 'Veteran Scam', 'Telemarketing', 'Fake Non-Profit'],
    heroImage: 'Charity Heart Donation Box',
    description: 'High-pressure telemarketers raise funds for names mimicking famous police or veteran charities, pocketing 90% of donations for telemarketer salaries and founder perks.',
    howItWorks: [
      'You receive a phone call: "Help us support disabled police officers and wounded veterans in your local area!"',
      'The charity uses a name nearly identical to a famous national non-profit.',
      'You donate $100 over the phone using a credit card.',
      'Tax filings reveal 92% of all collected funds pay telemarketing agency salaries, leaving $0 for actual veterans.'
    ],
    warningSigns: [
      'Telemarketers demanding instant credit card donations over the phone.',
      'Charities using names that sound almost identical to famous national non-profits ("Soundalike Names").',
      'Refusal to send written informational brochures via mail before receiving a donation.'
    ],
    preventionTips: [
      'Never donate over the phone during unsolicited incoming calls.',
      'Research charity ratings and financial breakdowns on CharityNavigator.org or Give.org.',
      'Donate directly on the official website of vetted non-profit organizations.'
    ],
    realExample: {
      title: 'Soundalike Veteran Charity Telemarket Trap',
      description: 'A telemarketing syndicate raised $10 million using a soundalike veteran charity name. Investigations showed 95% of donations funded telemarketer commissions.'
    },
    faqs: [
      { question: 'How can I check how much of my donation goes to actual program work?', answer: 'Look up the non-profit on Charity Navigator or GuideStar to review their IRS Form 990 program expense ratio.' }
    ],
    relatedIds: ['social-scam-15', 'fraud-scam-1']
  }
];
