import { Article } from './articles';

export const identityArticles: Article[] = [
  {
    id: 'identity-scam-1',
    title: 'KYC & Government ID Renewal Phishing Frauds',
    category: 'Identity Theft',
    readTime: '5 min read',
    date: 'Feb 14, 2025',
    author: 'Identity Theft Prevention Council',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['KYC', 'Passport', 'Driver License', 'Identity Phishing', 'SSN'],
    heroImage: 'Identity Document Passport',
    description: 'Scammers issue fraudulent warnings claiming your Know-Your-Customer (KYC) records, passport, or driver\'s license have expired, tricking you into uploading high-res ID photos to illegal portals.',
    howItWorks: [
      'You receive an urgent SMS or email stating: "Bank/Government KYC Update Pending. Account will be suspended in 24 hours."',
      'You click the link to a fake identity portal.',
      'The site prompts you to upload front and back photos of your Driver\'s License, Passport, and SSN card.',
      'Scammers harvest these high-res document scans to open fraudulent loan and bank accounts globally.'
    ],
    warningSigns: [
      'Urgent threats that your bank account or driver\'s license will be cancelled within 24 hours.',
      'Requests to upload photos of government ID documents via non-official web domains.',
      'Communications originating from generic email addresses (@gmail.com, @outlook.com).'
    ],
    preventionTips: [
      'Never upload photos of government identity documents via links received in text messages.',
      'Verify KYC requests by logging into your official bank mobile app directly.',
      'Watermark uploaded document photos with purpose-specific text (e.g., "For Bank X KYC Only").'
    ],
    realExample: {
      title: 'The "Driver License Expired" Text Scam',
      description: 'A driver clicked an SMS link to "renew" his license, uploading photos of his passport and SSN. Within a month, three credit cards were opened in his name.'
    },
    faqs: [
      { question: 'Do government agencies request document uploads over SMS text?', answer: 'No. Official government agencies communicate through physical mail or official government web portals (.gov).' }
    ],
    relatedIds: ['identity-scam-2', 'identity-scam-3'],
    isTrending: true
  },
  {
    id: 'identity-scam-2',
    title: 'Dark Web Identity Package Bundles (Fullz) & Synthetic Credit',
    category: 'Identity Theft',
    readTime: '7 min read',
    date: 'Mar 02, 2025',
    author: 'Cyber Threat Intelligence Bureau',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Dark Web', 'Fullz', 'Identity Bundle', 'SSN Theft', 'Credit Line'],
    heroImage: 'Dark Web Binary Matrix',
    description: 'Cybercrime syndicates compile complete personal dossiers ("Fullz") containing SSNs, birthdates, addresses, and credit histories stolen from corporate data breaches for sale on dark web marketplaces.',
    howItWorks: [
      'Hackers breach health insurance or credit bureau databases, acquiring millions of identity records.',
      'They package these into "Fullz" dossiers and list them for sale on dark web forums for $10 to $50 each.',
      'Buyers purchase Fullz bundles to file fraudulent tax returns, claim unemployment benefits, and lease vehicles.',
      'Victims discover the theft only after receiving debt collection letters or IRS delinquency notices.'
    ],
    warningSigns: [
      'Receiving tax notices from the IRS stating multiple tax returns were filed using your SSN.',
      'Unexplained credit inquiries on your credit report from unknown auto lenders.',
      'Mail arriving at your home addressed to unfamiliar names using your SSN.'
    ],
    preventionTips: [
      'Place a permanent freeze on your credit reports with Equifax, Experian, and TransUnion.',
      'File your tax returns early in the tax season before fraudsters can submit fake filings.',
      'Enroll in identity monitoring services that scan dark web forums for your SSN.'
    ],
    realExample: {
      title: 'Dark Web Fullz Tax Refund Fraud',
      description: 'A teacher discovered a fraudster had filed a fake $8,000 tax return using her SSN after her identity record was leaked in a healthcare data breach.'
    },
    faqs: [
      { question: 'What does "Fullz" mean in cybersecurity?', answer: 'Fullz is a dark web term for a complete set of stolen personal information needed to impersonate an individual fully.' }
    ],
    relatedIds: ['identity-scam-1', 'banking-scam-15'],
    isTrending: true
  },
  {
    id: 'identity-scam-3',
    title: 'Medical Identity Theft & Fraudulent Insurance Claims',
    category: 'Identity Theft',
    readTime: '6 min read',
    date: 'Mar 20, 2025',
    author: 'Healthcare Fraud Protection Alliance',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Medical Theft', 'Insurance Fraud', 'Health Records', 'Medicare'],
    heroImage: 'Healthcare Medical Cross',
    description: 'Thieves use your health insurance card details to obtain expensive medical treatments, prescription drugs, or surgery, polluting your official medical history records.',
    howItWorks: [
      'Scammers steal your medical insurance card number or buy health data leaks.',
      'They or their accomplices present your insurance details at hospitals or pharmacies.',
      'Insurers are billed tens of thousands of dollars for procedures you never received.',
      'The imposter\'s medical conditions (blood type, allergies, diagnoses) get mixed into your permanent medical file.'
    ],
    warningSigns: [
      'Explanation of Benefits (EOB) statements listing doctor visits or surgeries you never had.',
      'Invoices from medical clinics or laboratories you have never visited.',
      'Rejection of legitimate insurance coverage because annual limits were exhausted by fraud.'
    ],
    preventionTips: [
      'Review every Explanation of Benefits (EOB) mailer thoroughly upon receipt.',
      'Treat your health insurance card with the same security as a credit card.',
      'Report suspicious medical billings to your healthcare provider\'s fraud department immediately.'
    ],
    realExample: {
      title: 'Stolen Insurance Number Surgery Fraud',
      description: 'A victim received a $35,000 hospital bill for knee replacement surgery performed on an imposter using his stolen insurance credentials.'
    },
    faqs: [
      { question: 'Can medical identity theft affect my physical safety?', answer: 'Yes. If an imposter\'s blood type or medical allergies are mistakenly recorded in your chart, it poses severe risks during medical emergencies.' }
    ],
    relatedIds: ['identity-scam-1', 'identity-scam-2']
  },
  {
    id: 'identity-scam-4',
    title: 'Child Identity Theft & Clean-Slate Credit Exploitation',
    category: 'Identity Theft',
    readTime: '5 min read',
    date: 'Apr 04, 2025',
    author: 'Child Digital Safety Foundation',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Child Identity', 'SSN Theft', 'Clean Slate', 'Credit Freeze'],
    heroImage: 'Child Protection Shield',
    description: 'Scammers target Social Security Numbers of children because clean-slate credit records can go undetected for decades until the child applies for college loans.',
    howItWorks: [
      'Thieves steal a child\'s SSN from school databases or medical records.',
      'They pair the SSN with a fake birthdate to open credit cards, utility accounts, and mortgages.',
      'Because children do not check credit reports, the fraud continues unchecked for 10-15 years.',
      'At age 18, the victim discovers ruined credit scores and massive debt collections when applying for student loans.'
    ],
    warningSigns: [
      'Minor children receiving credit card offers or bank statements in the mail.',
      'Collection agency calls demanding payment from a teenager.',
      'Rejection of government benefits for a child because their SSN is listed as employed.'
    ],
    preventionTips: [
      'Freeze your child\'s credit file with all three credit bureaus as soon as they receive an SSN.',
      'Be cautious when sharing your child\'s SSN on school or sports registration forms.',
      'Store physical Social Security cards in a fireproof home safe.'
    ],
    realExample: {
      title: 'Teenager Discovers $40,000 Debt at College Entry',
      description: 'An 18-year-old applied for college financial aid and was rejected due to $40,000 in unpaid credit card debt accumulated on his SSN since age 7.'
    },
    faqs: [
      { question: 'Can parents legally freeze a minor child\'s credit file?', answer: 'Yes. Credit bureaus allow parents and legal guardians to freeze credit files for children under age 16 for free.' }
    ],
    relatedIds: ['identity-scam-2', 'banking-scam-15']
  },
  {
    id: 'identity-scam-5',
    title: 'Deceased Identity Theft (Ghosting) & Estate Fraud',
    category: 'Identity Theft',
    readTime: '5 min read',
    date: 'Apr 19, 2025',
    author: 'Estate Protection & Elder Security',
    severity: 'Medium',
    difficultyLevel: 'Intermediate',
    tags: ['Ghosting', 'Estate Fraud', 'Deceased Theft', 'Obituary'],
    heroImage: 'Estate Legal Seal',
    description: 'Fraudsters extract personal information from recent obituaries to open fraudulent accounts and steal assets in the name of recently deceased individuals.',
    howItWorks: [
      'Scammers monitor newspaper obituaries and public death notices.',
      'They cross-reference the deceased person\'s name, birthdate, and town to locate their SSN.',
      'They open new credit accounts or file fraudulent tax returns before death indexes update.',
      'Grieving families discover the theft months later during estate probate proceedings.'
    ],
    warningSigns: [
      'Credit card bills or debt collection calls addressed to a deceased family member.',
      'Notice from the IRS that a tax return was filed for the deceased person.',
      'Unusual withdrawals from the deceased individual\'s bank accounts after death.'
    ],
    preventionTips: [
      'Avoid listing full birthdates, maiden names, or home addresses in public obituaries.',
      'Promptly send death certificate copies to credit bureaus, banks, and the SSA.',
      'Request a "Deceased Alert" flag on the deceased person\'s credit bureau files.'
    ],
    realExample: {
      title: 'Obituary Ghosting Credit Spree',
      description: 'Within three weeks of a grandfather\'s passing, scammers used his details gathered from an obituary to open $12,000 in retail store credit lines.'
    },
    faqs: [
      { question: 'How do credit bureaus learn about a person\'s death?', answer: 'The Social Security Administration maintains the Death Master File, but sending direct certificates accelerates protection.' }
    ],
    relatedIds: ['identity-scam-2', 'identity-scam-1']
  },
  {
    id: 'identity-scam-6',
    title: 'Synthetic Identity Fraud in Auto Financing & Mortgages',
    category: 'Identity Theft',
    readTime: '7 min read',
    date: 'May 03, 2025',
    author: 'Financial Crime & Credit Risk Division',
    severity: 'High',
    difficultyLevel: 'Advanced',
    tags: ['Synthetic Identity', 'Auto Loan', 'Mortgage Fraud', 'Credit Bust Out'],
    heroImage: 'Automotive Financial Contract',
    description: 'Organized crime rings combine real stolen SSNs with fictitious names and addresses, cultivating synthetic credit profiles over years before executing massive "bust-out" loans.',
    howItWorks: [
      'Fraudsters pair an unassigned SSN with a fake identity profile.',
      'They open small store credit cards, paying bills promptly to build a 750+ credit score.',
      'Once high credit scores are established, they apply for $50,000 auto loans or mortgages.',
      'They take possession of vehicles or funds and abandon the synthetic identity completely.'
    ],
    warningSigns: [
      'Credit bureau files containing multiple mismatched aliases attached to your SSN.',
      'Lenders contacting you regarding unpaid car loans for individuals you do not know.',
      'Mail for unfamiliar names arriving at your residence consistently.'
    ],
    preventionTips: [
      'Audit your credit report\'s "Personal Information" section for unauthorized names and addresses.',
      'Challenge any incorrect name variations attached to your SSN with credit bureaus.',
      'Utilize SSN verification tools offered by financial services.'
    ],
    realExample: {
      title: 'Synthetic Identity Luxury Auto Bust-Out',
      description: 'A syndicate built 15 synthetic credit identities, leased $1.2 million in luxury sports cars, and shipped the vehicles overseas before abandoning the accounts.'
    },
    faqs: [
      { question: 'Why is synthetic identity theft harder to detect than traditional theft?', answer: 'Because no single real person reports the entire profile as stolen, allowing the synthetic identity to operate for years unnoticed.' }
    ],
    relatedIds: ['banking-scam-15', 'identity-scam-2']
  },
  {
    id: 'identity-scam-7',
    title: 'Unemployment & Government Benefit Identity Hijacking',
    category: 'Identity Theft',
    readTime: '6 min read',
    date: 'May 18, 2025',
    author: 'Public Benefit Integrity Board',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Unemployment Fraud', 'Government Benefits', '1099-G', 'State Portal'],
    heroImage: 'Government Treasury Building',
    description: 'Fraudsters use stolen employee details to file fake unemployment claims with state labor departments, directing benefit payouts to prepaid debit cards.',
    howItWorks: [
      'Criminals acquire stolen employee lists containing names, SSNs, and birthdates.',
      'They submit fraudulent unemployment benefit applications on state labor portals.',
      'State agencies deposit benefit funds onto prepaid debit cards controlled by the criminals.',
      'Employed victims discover the fraud when receiving unexpected 1099-G tax forms or employer alerts.'
    ],
    warningSigns: [
      'Receiving mail from state unemployment agencies when you are currently employed.',
      'Receiving a 1099-G tax form reporting unemployment benefits you never applied for.',
      'HR notifying you that an unemployment claim was filed in your name.'
    ],
    preventionTips: [
      'Report fraudulent unemployment claims to your state department of labor immediately.',
      'Request a revised 1099-G tax form showing $0 in received benefits.',
      'Freeze credit files to prevent secondary loan applications.'
    ],
    realExample: {
      title: 'Corporate Employee List Unemployment Hijack',
      description: 'A company\'s HR database leak resulted in 300 active employees having fake unemployment claims filed in their names across four state portals.'
    },
    faqs: [
      { question: 'Will I owe taxes on fraudulent unemployment benefits paid in my name?', answer: 'No, provided you report the fraud to the issuing state agency and request a corrected 1099-G form.' }
    ],
    relatedIds: ['identity-scam-1', 'identity-scam-2']
  },
  {
    id: 'identity-scam-8',
    title: 'Change of Address Mail Redirection & Postal Hijacking',
    category: 'Identity Theft',
    readTime: '5 min read',
    date: 'Jun 02, 2025',
    author: 'Postal Inspection Security Team',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Mail Fraud', 'USPS', 'Change of Address', 'Credit Cards'],
    heroImage: 'Postal Mailbox Terminal',
    description: 'Scammers submit fraudulent Change-of-Address forms to postal services, redirecting physical bank statements, new credit cards, and tax documents to rogue mailboxes.',
    howItWorks: [
      'A scammer submits an online or physical Change-of-Address form in your name.',
      'Your physical mail is rerouted to the scammer\'s drop address or rented P.O. Box.',
      'They intercept replacement credit cards, pre-approved bank offers, and tax documents.',
      'You notice the theft only when physical mail delivery stops completely at your home.'
    ],
    warningSigns: [
      'Sudden, complete stop of regular postal mail delivery at your home address.',
      'Receiving a confirmation letter from the postal service regarding a move you didn\'t request.',
      'Missing bank statements or expected replacement credit cards.'
    ],
    preventionTips: [
      'Sign up for official postal notification services (e.g. USPS Informed Delivery).',
      'Act immediately if physical mail stops arriving for more than 3 consecutive days.',
      'Inquire with your local post office if you suspect an unauthorized move order.'
    ],
    realExample: {
      title: 'Mail Rerouting Credit Card Interception',
      description: 'A scammer redirected a victim\'s mail for 3 weeks, intercepting two new replacement credit cards and spending $15,000 before the owner realized mail had stopped.'
    },
    faqs: [
      { question: 'What is USPS Informed Delivery?', answer: 'Informed Delivery is a free postal service that emails digital preview images of incoming mail arriving at your home daily.' }
    ],
    relatedIds: ['identity-scam-1', 'identity-scam-2']
  },
  {
    id: 'identity-scam-9',
    title: 'Biometric Identity Spoofing & AI Face-Swap KYC Bypass',
    category: 'Identity Theft',
    readTime: '7 min read',
    date: 'Jun 18, 2025',
    author: 'Biometric Security & AI Research Lab',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Biometric Spoofing', 'Face Swap', 'Liveness Check', 'Deepfake KYC'],
    heroImage: 'Biometric Facial Scan',
    description: 'Advanced fraudsters use 3D generative AI face-swapping software to bypass automated video selfie "liveness checks" on fintech banking onboarding portals.',
    howItWorks: [
      'Attackers combine stolen ID photos with generative AI 3D face animation models.',
      'When an online bank requires a "live video selfie" to open an account, the attacker injects the AI animated face stream.',
      'The AI model blinks, smiles, and turns its head on command, tricking automated biometric verification systems.',
      'The bank approves the account opening for the imposter.'
    ],
    warningSigns: [
      'Notifications from digital banks confirming account setups you never initiated.',
      'Hard credit pulls from online fintech lenders requiring biometric verification.'
    ],
    preventionTips: [
      'Protect high-resolution photos of your face on public social media profiles.',
      'Freeze credit files so lenders cannot open accounts even if biometric verification passes.',
      'Utilize banks that enforce multi-modal biometric checks (voice, face, and hardware token).'
    ],
    realExample: {
      title: 'AI Face-Swap Fintech Account Creation',
      description: 'A criminal syndicate used real-time AI face-swapping tools to open 80 fraudulent online bank accounts using stolen ID photos.'
    },
    faqs: [
      { question: 'How do advanced liveness checks stop AI face swaps?', answer: 'Advanced liveness systems project dynamic colored light patterns onto faces and analyze 3D skin texture reflection dynamics.' }
    ],
    relatedIds: ['identity-scam-1', 'social-scam-5']
  },
  {
    id: 'identity-scam-10',
    title: 'Driver\'s License Duplicate Creation & Traffic Fine Dumping',
    category: 'Identity Theft',
    readTime: '5 min read',
    date: 'Jul 01, 2025',
    author: 'Motor Vehicle Fraud Bureau',
    severity: 'Medium',
    difficultyLevel: 'Intermediate',
    tags: ['Driver License', 'DMV', 'Traffic Fines', 'Warrant Fraud'],
    heroImage: 'Driver License Identification',
    description: 'Criminals order duplicate physical driver\'s licenses using stolen identity data, presenting them to police during traffic stops to dump tickets and arrest warrants onto victims.',
    howItWorks: [
      'A criminal orders a duplicate driver\'s license using your stolen personal details and their photo.',
      'When pulled over by police for speeding or reckless driving, they present your license.',
      'Traffic citations and court appearance notices are issued in your name.',
      'When tickets go unpaid, judges issue arrest warrants for YOU, leading to surprise arrests during routine traffic checks.'
    ],
    warningSigns: [
      'Receiving unpaid traffic citation notices or toll violation bills for locations you never visited.',
      'DMV notices confirming duplicate license orders you did not request.',
      'Suspension of your real driver\'s license due to unpaid court fines.'
    ],
    preventionTips: [
      'Set up a online PIN or two-factor password on your state DMV portal profile.',
      'Address any unrecognized traffic citation notice immediately with the issuing court.',
      'Report stolen or lost physical driver\'s licenses to the police immediately.'
    ],
    realExample: {
      title: 'Surprise Arrest Warrant at Traffic Stop',
      description: 'A driver was arrested during a routine taillight check due to an outstanding warrant for a reckless driving charge racked up by an imposter using a duplicate license.'
    },
    faqs: [
      { question: 'What should I do if an imposter receives traffic tickets in my name?', answer: 'Obtain an official police report for identity theft and present it to the traffic court clerk to dismiss citations.' }
    ],
    relatedIds: ['identity-scam-1', 'identity-scam-8']
  },
  {
    id: 'identity-scam-11',
    title: 'Social Security Number Randomization Exploits',
    category: 'Identity Theft',
    readTime: '6 min read',
    date: 'Jul 16, 2025',
    author: 'SSN Integrity & Fraud Audit Division',
    severity: 'High',
    difficultyLevel: 'Advanced',
    tags: ['SSN', 'Social Security', 'Randomization', 'Credit Fraud'],
    heroImage: 'Social Security Document',
    description: 'Exploiting SSN randomization algorithms introduced in 2011, fraudsters guess unassigned SSNs and validate active profiles via soft credit pulls.',
    howItWorks: [
      'Prior to 2011, SSNs indicated geographic state origins. Post-2011 SSNs are completely randomized.',
      'Scammers generate random 9-digit SSN sequences using algorithmic scripts.',
      'They run automated soft credit checks to see which generated SSNs match living individuals.',
      'Valid SSNs are targeted for synthetic identity creation and loan applications.'
    ],
    warningSigns: [
      'Unexpected credit monitoring alerts for SSNs matching family members.',
      'Inquiries on credit reports from unfamiliar financial institutions.'
    ],
    preventionTips: [
      'Keep credit reports locked or frozen at all times unless actively applying for credit.',
      'Create a mySocialSecurity online account to monitor your official earnings record.',
      'Never share your full SSN unless legally mandated.'
    ],
    realExample: {
      title: 'Algorithmic SSN Generation Ring',
      description: 'An automated botnet tested 500,000 random SSN combinations, identifying 12,000 valid active profiles for downstream financial fraud.'
    },
    faqs: [
      { question: 'Can I get a new Social Security Number if mine is compromised?', answer: 'The SSA grants new SSNs only in extreme cases where severe ongoing financial harm is proven and all other remedies failed.' }
    ],
    relatedIds: ['identity-scam-2', 'banking-scam-15']
  },
  {
    id: 'identity-scam-12',
    title: 'Passport Copy Theft & Offshore Shell Company Creation',
    category: 'Identity Theft',
    readTime: '6 min read',
    date: 'Aug 01, 2025',
    author: 'International Financial Crime Unit',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Passport', 'Shell Company', 'Offshore', 'International Fraud'],
    heroImage: 'International Passport Stamps',
    description: 'Scammers steal scanned passport copies from hotel check-in desks or travel sites, using them as nominee director identification to form illegal offshore shell companies.',
    howItWorks: [
      'Unencrypted passport scans are stolen from compromised boutique hotel databases or travel agents.',
      'Crime syndicates submit the passport scan to offshore jurisdiction registrars.',
      'They form shell companies listing you as the beneficial owner or managing director.',
      'The shell company is used to launder money, leaving you liable for international tax evasion investigations.'
    ],
    warningSigns: [
      'Notices from foreign tax authorities or international banking regulators.',
      'Inquiries from corporate registrars regarding offshore company filings in your name.',
      'Inability to open legitimate foreign bank accounts due to compliance flags.'
    ],
    preventionTips: [
      'Never email unencrypted PDF passport copies to travel agents or hotels.',
      'When providing passport copies, overlay a clear physical watermark across the document image.',
      'Store digital copies in encrypted zero-knowledge password vaults.'
    ],
    realExample: {
      title: 'Hotel Passport Leak Shell Company Scheme',
      description: 'A traveler\'s passport scan stolen from a hotel check-in desk was used to register three offshore trade companies involved in $4 million of money laundering.'
    },
    faqs: [
      { question: 'Is it safe to let hotels photocopy my passport overseas?', answer: 'Many countries legally require hotels to verify passports, but you should request that copies be stored securely and deleted after stay verification.' }
    ],
    relatedIds: ['identity-scam-1', 'banking-scam-10']
  },
  {
    id: 'identity-scam-13',
    title: 'Student Financial Aid & Grant Identity Theft',
    category: 'Identity Theft',
    readTime: '5 min read',
    date: 'Aug 15, 2025',
    author: 'Higher Education Fraud Watch',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['FAFSA', 'Student Aid', 'Pell Grant', 'College Fraud'],
    heroImage: 'University Graduation Cap',
    description: 'Cybercriminals enroll fake students ("straw students") in online community colleges using stolen identities, collecting federal Pell Grants and student loan refund checks.',
    howItWorks: [
      'Scammers buy stolen identities of individuals who have never attended college.',
      'They submit online college applications and FAFSA student aid requests.',
      'Once federal grants and loans are approved, tuition is paid and surplus "refund checks" are issued.',
      'Scammers cash the refund checks, leaving the victim with thousands in federal student loan debt.'
    ],
    warningSigns: [
      'IRS notices regarding unreported student loan interest or grants.',
      'Letters from colleges confirming enrollment in courses you never registered for.',
      'Student loan debt collection notices from the Department of Education.'
    ],
    preventionTips: [
      'Create an official StudentAid.gov FSA ID profile to lock your identity within the federal aid portal.',
      'Monitor credit reports for federal student loan disbursements.',
      'Report unauthorized college enrollments to the Department of Education Inspector General.'
    ],
    realExample: {
      title: 'Community College Straw Student Ring',
      description: 'A fraud ring used 200 stolen identity records to enroll in online courses, netting $1.8 million in federal Pell Grant disbursements before detection.'
    },
    faqs: [
      { question: 'How can I report federal student loan identity theft?', answer: 'Submit a fraud complaint with the U.S. Department of Education Office of Inspector General (OIG) hotline.' }
    ],
    relatedIds: ['identity-scam-4', 'identity-scam-2']
  },
  {
    id: 'identity-scam-14',
    title: 'Utility Account Hijacking & Unpaid Debt Accumulation',
    category: 'Identity Theft',
    readTime: '4 min read',
    date: 'Sep 01, 2025',
    author: 'Consumer Utility Protection Board',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Utility Theft', 'Electric Bill', 'Identity Theft', 'Collections'],
    heroImage: 'Electric Power Grid',
    description: 'Fraudsters use your SSN and name to open electricity, water, and broadband accounts for illegal grow houses or rental properties, abandoning months of unpaid bills.',
    howItWorks: [
      'Scammers set up residential electric, gas, or internet accounts using your SSN.',
      'Utility providers perform quick soft credit checks without requiring physical ID verification.',
      'The scammers run up thousands in unpaid utility bills over 6-12 months.',
      'When services are cut, debt collection agencies target your credit record.'
    ],
    warningSigns: [
      'Utility collection letters for addresses where you have never resided.',
      'Rejection of utility setups at your real home due to past-due balances linked to your SSN.',
      'Unexplained drops in credit scores caused by utility collection accounts.'
    ],
    preventionTips: [
      'Check credit reports regularly for utility company collection items.',
      'Place security PINs on your accounts with local electric and telecom utilities.',
      'Dispute unauthorized utility accounts immediately with credit reporting agencies.'
    ],
    realExample: {
      title: 'Illegal Rental Utility Debt Scheme',
      description: 'A victim discovered $6,000 in unpaid electric bills accumulated across three rental properties where squatters used her SSN to activate power.'
    },
    faqs: [
      { question: 'Do utility companies perform credit checks?', answer: 'Yes. Most utility companies perform soft credit checks to determine whether a deposit is required before activating service.' }
    ],
    relatedIds: ['identity-scam-1', 'identity-scam-2']
  },
  {
    id: 'identity-scam-15',
    title: 'Simulated Public Wi-Fi Identity Harvest at Conferences',
    category: 'Identity Theft',
    readTime: '5 min read',
    date: 'Sep 15, 2025',
    author: 'Event Cyber Security Operations',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Conference WiFi', 'Identity Harvest', 'Packet Sniffing', 'MitM'],
    heroImage: 'Conference Event Hall',
    description: 'Cybercriminals deploy high-powered rogue Wi-Fi access points at professional conventions to harvest badge registration info, passwords, and corporate credentials.',
    howItWorks: [
      'Hackers set up an open Wi-Fi network named "Official_Tech_Expo_Guest_WiFi".',
      'Attendees connect and complete a fake registration form asking for full name, corporate email, job title, and phone number.',
      'The rogue access point sniffs unencrypted network traffic and logs attendee details.',
      'Targeted spear-phishing attacks are launched against attendees and their employers post-event.'
    ],
    warningSigns: [
      'Multiple public Wi-Fi networks possessing identical names at event venues.',
      'Conference Wi-Fi requiring overly detailed personal identity information to connect.',
      'Browser warnings indicating invalid SSL certificates during registration.'
    ],
    preventionTips: [
      'Use cellular mobile hot-spots rather than event public Wi-Fi networks.',
      'Always connect through a trusted VPN if public event Wi-Fi must be used.',
      'Provide minimal required information on public network registration forms.'
    ],
    realExample: {
      title: 'Tech Convention Rogue Wi-Fi Data Harvest',
      description: 'A rogue Wi-Fi station deployed at an executive summit captured personal details and passwords for 400 attending corporate leaders.'
    },
    faqs: [
      { question: 'Are conference Wi-Fi networks safer than coffee shop networks?', answer: 'No. Large public event networks attract high-level attackers specifically due to the concentration of valuable corporate targets.' }
    ],
    relatedIds: ['banking-scam-12', 'mobile-scam-8']
  }
];
