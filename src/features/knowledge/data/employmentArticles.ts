import { Article } from './articles';

export const employmentArticles: Article[] = [
  {
    id: 'employment-scam-1',
    title: 'Remote Work "Equipment Purchase Cheque" Job Traps',
    category: 'Employment Scams',
    readTime: '6 min read',
    date: 'Dec 01, 2024',
    author: 'Employment Fraud Watch Council',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Remote Work', 'Fake Cheque', 'Equipment Scam', 'Data Entry Job'],
    heroImage: 'Remote Work Laptop Office',
    description: 'Scammers offer lucrative fake remote data-entry jobs, sending counterfeit cheques to "buy home office equipment" from an approved vendor who is actually the scammer.',
    howItWorks: [
      'You interview for a $35/hour remote job via Telegram or text messaging.',
      'You are hired immediately without video interviews and sent a $3,500 digital cheque to buy a specialized home office laptop and printer.',
      'You deposit the cheque into your bank account and wire $3,000 to the "authorized vendor".',
      'The cheque bounces days later, leaving you responsible for the $3,000 wired to the scammer.'
    ],
    warningSigns: [
      'Job offers extended without phone calls, video interviews, or formal background checks.',
      'Employers sending cheques prior to starting work to purchase equipment from specific vendors.',
      'Interviews conducted exclusively via messaging platforms (Telegram, WhatsApp, Signal).'
    ],
    preventionTips: [
      'Legitimate corporate employers supply equipment directly or reimburse expenses after hire.',
      'Never accept job offers that involve depositing cheques and wiring funds to third parties.',
      'Insist on live video interviews with corporate HR representatives.'
    ],
    realExample: {
      title: 'The Data Entry Cheque Trap',
      description: 'A job seeker deposited a $4,200 "home office stipend" cheque and wired $3,500 to a designated equipment supplier. The cheque bounced, wiping out her personal savings.'
    },
    faqs: [
      { question: 'Why do fake cheques show up in my bank account balance initially?', answer: 'Federal banking regulations require provisional funds availability within 1-2 days, but final clearing takes up to two weeks.' }
    ],
    relatedIds: ['employment-scam-2', 'banking-scam-6'],
    isTrending: true
  },
  {
    id: 'employment-scam-2',
    title: 'Task Scam Optimization Platforms & Digital Asset Staking',
    category: 'Employment Scams',
    readTime: '7 min read',
    date: 'Dec 18, 2024',
    author: 'Digital Labor & Gig Safety Group',
    severity: 'Critical',
    difficultyLevel: 'Intermediate',
    tags: ['Task Scam', 'App Optimization', 'Crypto Staking', 'Gig Worker'],
    heroImage: 'Mobile Task Completion Matrix',
    description: 'Fraudulent work platforms hire workers to click buttons "optimizing mobile apps", requiring workers to deposit crypto to unlock higher commission task sets.',
    howItWorks: [
      'You are recruited via WhatsApp for a part-time job "rating apps" for $200/day.',
      'You complete 38 out of 40 daily rating tasks on a web platform.',
      'Task 39 is a "Combination Task" requiring you to deposit $500 in crypto to reset your wallet balance and complete the set.',
      'As you deposit money, the platform demands larger $2,000 deposits to unlock your "accumulated $8,000 earnings".'
    ],
    warningSigns: [
      'Jobs that require YOU to pay or deposit money/crypto in order to receive your earned salary.',
      'Repetitive tasks involving clicking buttons to "boost product ratings" or "optimize app listings".',
      'Salaries paid exclusively via cryptocurrency wallets.'
    ],
    preventionTips: [
      'NO legitimate job requires employees to pay money to complete work duties or access earnings.',
      'If a work platform asks for crypto deposits to unlock tasks, stop immediately.',
      'Report task scam web domains to federal cybercrime portals.'
    ],
    realExample: {
      title: 'The App Rating Combination Task Loop',
      description: 'A worker deposited $8,000 across 5 progressive "combination tasks" trying to withdraw $14,000 in earned commissions. The platform froze her account and demanded another $5,000.'
    },
    faqs: [
      { question: 'How do task scam platforms build initial trust?', answer: 'They allow small $50 withdrawals on your first day to convince you the platform is legitimate before trapping you with large deposits.' }
    ],
    relatedIds: ['employment-scam-1', 'financial-scam-2'],
    isTrending: true
  },
  {
    id: 'employment-scam-3',
    title: 'Reshipping Mule & Illicit Goods Packaging Scams',
    category: 'Employment Scams',
    readTime: '5 min read',
    date: 'Jan 08, 2025',
    author: 'Postal & Freight Logistics Inspectorate',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Reshipping', 'Money Mule', 'Package Logistics', 'Stolen Goods'],
    heroImage: 'Logistics Package Shipping Box',
    description: 'Scammers hire "Package Inspection Managers" to receive merchandise purchased with stolen credit cards at their homes and reship it overseas, making them accomplices to felony fencing.',
    howItWorks: [
      'You apply online for a "Work-from-Home Package Quality Inspector" role paying $3,000/month.',
      'High-value goods (laptops, phones) arrive at your home daily.',
      'You inspect packages, print prepaid shipping labels, and forward boxes to addresses overseas.',
      'At the end of the month, the employer vanishes without paying salary, and police knock on your door to arrest you for receiving stolen property.'
    ],
    warningSigns: [
      'Work-from-home positions where your primary duty is receiving and reshipping packages.',
      'Shipping labels provided addressed to overseas locations (Eastern Europe, West Africa).',
      'Lack of formal corporate tax forms (W-2 or 1099) during onboarding.'
    ],
    preventionTips: [
      'Legitimate logistics firms operate out of commercial warehouses, not residential homes.',
      'Never accept or reship packages sent to your personal home address by unknown companies.',
      'If you suspect you are in a reshipping scheme, contact postal inspectors immediately.'
    ],
    realExample: {
      title: 'Reshipping Mule Arrest',
      description: 'A job seeker spent two months reshipping 40 electronics packages from her home. She was arrested after police traced stolen credit card purchases directly to her address.'
    },
    faqs: [
      { question: 'Is reshipping stolen packages considered a felony crime?', answer: 'Yes. Acting as a package mule involves receiving and forwarding stolen property, which carries severe felony penalties.' }
    ],
    relatedIds: ['employment-scam-1', 'banking-scam-2']
  },
  {
    id: 'employment-scam-4',
    title: 'Fake Recruiting Firm Phishing & Personal Identity Harvest',
    category: 'Employment Scams',
    readTime: '5 min read',
    date: 'Jan 22, 2025',
    author: 'Recruitment & HR Safety Alliance',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Recruiter Scam', 'Identity Theft', 'Direct Deposit', 'Background Check'],
    heroImage: 'Job Resume Document',
    description: 'Impostors host realistic job listings on Indeed and LinkedIn to harvest SSNs, driver\'s licenses, and banking direct deposit details during fake "onboarding".',
    howItWorks: [
      'You apply for a job posting on a major career site.',
      'You receive an email offer letter signed by a real HR executive found on LinkedIn.',
      'During "onboarding", you fill out online PDF forms requiring your SSN, banking details for direct deposit, and photo ID.',
      'The company never existed—the scammers use your onboarding packet to commit identity theft.'
    ],
    warningSigns: [
      'Offers received without thorough interviews or technical assessments.',
      'Job portals asking for banking direct deposit info before an official contract is finalized.',
      'Emails sent from lookalike domains (e.g. hr-googlejobs.com instead of google.com).'
    ],
    preventionTips: [
      'Verify open job vacancies directly on the official employer\'s corporate careers website.',
      'Check the exact email header domain of the recruiting team.',
      'Do not provide SSN or direct deposit forms until you verify corporate credentials.'
    ],
    realExample: {
      title: 'Fake HR Onboarding Identity Theft',
      description: 'An applicant submitted onboarding forms for a fake design role. A week later, two loan applications were opened using his SSN and direct deposit details.'
    },
    faqs: [
      { question: 'When should a legitimate employer ask for my Social Security Number?', answer: 'Legitimate employers request SSNs for official W-2 tax forms and background checks ONLY after an official job offer is formally accepted.' }
    ],
    relatedIds: ['social-scam-4', 'identity-scam-1']
  },
  {
    id: 'employment-scam-5',
    title: 'Secret Shopper & Mystery Evaluator Wire Transfer Frauds',
    category: 'Employment Scams',
    readTime: '4 min read',
    date: 'Feb 05, 2025',
    author: 'Consumer Evaluation Safety Board',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Mystery Shopper', 'Secret Shopper', 'Wire Transfer', 'Fake Cheque'],
    heroImage: 'Retail Shopping Center',
    description: 'Applicants are hired as "Mystery Shoppers" to evaluate wire transfer services (Western Union, MoneyGram), depositing a fake cheque and wiring funds back to the scammer.',
    howItWorks: [
      'You receive a letter and a $2,500 cashier\'s cheque hiring you as a "Secret Shopper".',
      'Your assignment: Deposit the cheque, keep $300 as your commission, and test Western Union by wiring $2,200 to a designated address.',
      'You complete the evaluation and send the wire transfer.',
      'The cashier\'s cheque bounces days later, leaving your bank account negative $2,200.'
    ],
    warningSigns: [
      'Unsolicited letters containing physical cashier\'s cheques for mystery shopping assignments.',
      'Assignments requiring you to test wire transfer or gift card services.',
      'Pressure to complete evaluations within 24 hours of receiving the cheque.'
    ],
    preventionTips: [
      'Legitimate mystery shopping firms never require employees to wire money or buy gift cards.',
      'Join mystery shopping associations (like MSPA Americas) to find legitimate agencies.',
      'Never deposit surprise cheques received in the mail from unknown companies.'
    ],
    realExample: {
      title: 'Secret Shopper MoneyGram Trap',
      description: 'A college student was sent a $1,800 cheque to "evaluate local MoneyGram locations". She wired $1,500 and was left owing her bank the full amount when the cheque bounced.'
    },
    faqs: [
      { question: 'Are all mystery shopping jobs fake?', answer: 'No. Legitimate mystery shopping opportunities exist, but they NEVER involve depositing cheques and wiring money back to employers.' }
    ],
    relatedIds: ['employment-scam-1', 'banking-scam-6']
  },
  {
    id: 'employment-scam-6',
    title: 'High-Commission Pyramidal Insurance Recruiting Traps',
    category: 'Employment Scams',
    readTime: '6 min read',
    date: 'Feb 20, 2025',
    author: 'Insurance & Career Integrity Unit',
    severity: 'Medium',
    difficultyLevel: 'Intermediate',
    tags: ['Insurance Scam', 'MLM Job', 'Commission Only', 'Course Fee'],
    heroImage: 'Corporate Business Conference',
    description: 'Deceptive insurance agencies post vague "Management Trainee" listings, luring applicants into multi-level marketing pyramid structures where they must pay for mandatory training courses.',
    howItWorks: [
      'You attend a group webinar interview for an advertised "Executive Sales Director" position.',
      'The job requires you to pay $500 for mandatory state licensing study materials and software fees.',
      'Once hired, you discover there is no base salary—income relies entirely on selling policy products to your family and recruiting friends into your "downline".',
      'Most recruits spend thousands on courses while making zero net income.'
    ],
    warningSigns: [
      'Group "interview" webinars where company reps focus on luxurious lifestyles rather than job duties.',
      'Mandatory upfront payments for training materials, licensing, or portal access fees.',
      'Listings promising $100k+ salaries without requiring relevant industry experience.'
    ],
    preventionTips: [
      'Legitimate corporate employers cover licensing and training costs for sales staff.',
      'Ask directly during interviews: "Is there a guaranteed base hourly wage?"',
      'Research company names on Glassdoor and Reddit before paying course fees.'
    ],
    realExample: {
      title: 'Group Webinar Insurance Course Trap',
      description: 'A job seeker paid $650 for insurance licensing materials after a group webinar. She earned $0 commission over 3 months while being pressured to recruit her friends.'
    },
    faqs: [
      { question: 'Should I ever pay money to get a job?', answer: 'No. Legitimate employers pay YOU for your work; requiring money upfront to secure employment is a major red flag.' }
    ],
    relatedIds: ['financial-scam-9', 'employment-scam-1']
  },
  {
    id: 'employment-scam-7',
    title: 'Modeling Agency & Talent Casting Upfront Fee Fraud',
    category: 'Employment Scams',
    readTime: '5 min read',
    date: 'Mar 05, 2025',
    author: 'Media & Talent Industry Watch',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Modeling Scam', 'Talent Agency', 'Portfolio Fee', 'Casting Fraud'],
    heroImage: 'Fashion Photography Studio',
    description: 'Fake modeling agencies scout individuals on Instagram, claiming they have "huge brand campaigns waiting" but forcing candidates to pay $1,500 for mandatory photoshoot portfolios.',
    howItWorks: [
      'A scout messages you on Instagram: "Our modeling agency loves your look! We want you for a major brand shoot!"',
      'You visit their studio and are told you must buy a $1,200 "official agency composite portfolio photoshoot".',
      'You pay for the portfolio photos.',
      'The promised brand campaigns never materialize, and the agency vanishes or ignores your calls.'
    ],
    warningSigns: [
      'Agencies scouting non-models on social media promising immediate high-paying gigs.',
      'Demands that you use their in-house photographer and pay upfront portfolio fees.',
      'Agencies that accept 100% of applicants who walk through the door.'
    ],
    preventionTips: [
      'Reputable modeling agencies earn money by taking a commission from actual client bookings, not upfront portfolio fees.',
      'Beware of agencies requiring you to pay cash before securing client auditions.',
      'Research talent agencies with the Better Business Bureau (BBB).'
    ],
    realExample: {
      title: 'Instagram Talent Scout Portfolio Trap',
      description: 'A student paid $1,500 for a required photo portfolio after being scouted on social media. She never received a single modeling audition call.'
    },
    faqs: [
      { question: 'Do legitimate modeling agencies charge setup fees?', answer: 'Top legitimate agencies do not charge upfront fees; they deduct portfolio costs from your earned modeling campaign checks.' }
    ],
    relatedIds: ['social-scam-7', 'employment-scam-1']
  },
  {
    id: 'employment-scam-8',
    title: 'Government Job Exam Prep & Guaranteed Placement Scams',
    category: 'Employment Scams',
    readTime: '5 min read',
    date: 'Mar 19, 2025',
    author: 'Public Sector Workforce Integrity',
    severity: 'Low',
    difficultyLevel: 'Beginner',
    tags: ['Postal Job', 'Government Job', 'Exam Fee', 'USPS Scam'],
    heroImage: 'Postal Mail Sorting Facility',
    description: 'Fraudulent career portals offer "Guaranteed US Postal Service or Federal Job Placements", charging $125 for useless exam study booklets for jobs that are actually free to apply for.',
    howItWorks: [
      'You search online for "USPS Postal Jobs" and click a sponsored search result.',
      'The site guarantees postal hiring if you purchase their "Official Postal Exam Prep Package" for $149.',
      'You pay for the study guide.',
      'The guide consists of outdated free materials, and the website has zero connection to the official postal service.'
    ],
    warningSigns: [
      'Websites charging fees to apply for government or postal positions.',
      'Guarantees of passing federal civil service exams or securing government job placement.',
      'Websites using official-looking seals that lack .gov web domains.'
    ],
    preventionTips: [
      'ALL official federal job applications are 100% free at USAJOBS.gov and USPS.com/careers.',
      'Federal agencies NEVER charge application or exam preparation fees.',
      'Ignore third-party job portals asking for money to secure government roles.'
    ],
    realExample: {
      title: 'Fake Postal Job Application Fee',
      description: 'An applicant paid $125 to an online portal promising postal job placement, only to discover postal hiring applications are free on official government sites.'
    },
    faqs: [
      { question: 'Is USAJOBS.gov the only official portal for federal jobs?', answer: 'Yes. USAJOBS.gov is the official employment portal for the United States federal government.' }
    ],
    relatedIds: ['employment-scam-1', 'identity-scam-7']
  },
  {
    id: 'employment-scam-9',
    title: 'Overseas Nursing & Healthcare Visa Sponsorship Exploits',
    category: 'Employment Scams',
    readTime: '7 min read',
    date: 'Apr 02, 2025',
    author: 'International Healthcare Migration Lab',
    severity: 'High',
    difficultyLevel: 'Advanced',
    tags: ['Visa Scam', 'Nurse Sponsorship', 'H-1B', 'Healthcare Job'],
    heroImage: 'Hospital Medical Ward',
    description: 'Rogue recruitment agencies target foreign nurses with promises of guaranteed US work visas and hospital contracts, extracting $5,000 in illegal "visa processing fees".',
    howItWorks: [
      'International healthcare workers are offered $80,000 nursing jobs in the US.',
      'The agency demands $5,000 for "expedited H-1B / Green Card sponsorship processing".',
      'The applicant wires the money.',
      'The agency issues fake visa petitions or disappears, leaving the nurse stranded without funds.'
    ],
    warningSigns: [
      'Agencies charging job applicants for US work visa sponsorship fees (federal law mandates employers pay H-1B fees).',
      'Guarantees of obtaining green cards or work visas within unrealistically short timeframes.',
      'Contracts requiring wire transfers to personal bank accounts overseas.'
    ],
    preventionTips: [
      'Under US immigration law, it is ILLEGAL for agencies or employers to charge applicants H-1B visa fees.',
      'Verify recruitment agencies with official state nursing boards and CGFNS International.',
      'Check visa petition status directly on the official USCIS.gov portal.'
    ],
    realExample: {
      title: 'Overseas Nurse Sponsorship Fee Extortion',
      description: 'A nurse wired $6,000 to an agency promising a hospital contract in Texas. The visa filing was completely fabricated and the agency vanished.'
    },
    faqs: [
      { question: 'Who is legally required to pay H-1B visa filing fees in the US?', answer: 'US federal law mandates that the sponsoring employer MUST pay all government H-1B filing fees.' }
    ],
    relatedIds: ['employment-scam-1', 'identity-scam-1']
  },
  {
    id: 'employment-scam-10',
    title: 'Unpaid Internship Exploitation & Work-Product Theft',
    category: 'Employment Scams',
    readTime: '5 min read',
    date: 'Apr 18, 2025',
    author: 'Labor Rights & Youth Workforce Watch',
    severity: 'Low',
    difficultyLevel: 'Intermediate',
    tags: ['Unpaid Internship', 'Labor Rights', 'Work Theft', 'FLSA'],
    heroImage: 'Modern Tech Office Workspace',
    description: 'Rogue startups hire students for 3-month "Unpaid Internships", assigning full-time core business duties to extract free commercial work before ghosting interns without references.',
    howItWorks: [
      'A startup recruits interns for "unpaid experience in software development or marketing".',
      'Instead of educational training, interns build core production software or manage client accounts full-time.',
      'After 12 weeks of free labor, the startup fires the interns and hires a new batch of unpaid candidates.',
      'The company obtains free commercial work in violation of Fair Labor Standards Act (FLSA) regulations.'
    ],
    warningSigns: [
      'Unpaid internships where you perform routine core work without direct educational oversight.',
      'Internships requiring 40 hours per week of production work without academic credit options.',
      'Startups replacing full-time paid employees with rotating batches of unpaid interns.'
    ],
    preventionTips: [
      'Review US Department of Labor FLSA "Primary Beneficiary Test" guidelines for unpaid internships.',
      'Ensure unpaid internships offer genuine educational curriculum tied to university credits.',
      'Report wage and hour labor violations to state labor departments.'
    ],
    realExample: {
      title: 'Startup Unpaid Code Theft Scheme',
      description: 'A tech startup used four unpaid interns to build their commercial web app over four months, discharging them without pay or references once the product launched.'
    },
    faqs: [
      { question: 'What is the FLSA Primary Beneficiary Test?', answer: 'It is a 7-factor legal test used by courts to determine whether an intern is legally an employee entitled to minimum wage.' }
    ],
    relatedIds: ['employment-scam-1', 'employment-scam-4']
  },
  {
    id: 'employment-scam-11',
    title: 'Freelance "Test Assignment" Theft & Ghostwriting Exploits',
    category: 'Employment Scams',
    readTime: '4 min read',
    date: 'May 02, 2025',
    author: 'Freelancers Rights Protection Guild',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Freelance Scam', 'Test Assignment', 'Work Theft', 'Upwork'],
    heroImage: 'Digital Design Studio Desk',
    description: 'Clients post freelance job listings requiring applicants to complete "unpaid trial tests" that consist of full production work, using the submissions commercially without paying.',
    howItWorks: [
      'A client posts a job for a website redesign or 2,000-word article on Upwork or Fiverr.',
      'They ask 10 applicants to complete a "custom paid test project" as part of the application.',
      'Applicants submit completed designs and articles.',
      'The client rejects all applicants claiming "unsuitable quality", then uses the submitted work on their commercial website for free.'
    ],
    warningSigns: [
      'Clients requesting extensive, custom test assignments prior to contract hiring.',
      'Test projects that require full, production-ready deliverables rather than portfolio reviews.',
      'Clients refusing to sign paid micro-contracts for application trial work.'
    ],
    preventionTips: [
      'Rely on your existing portfolio to demonstrate skill capabilities.',
      'If a client demands a custom test, insist on a paid micro-contract through official freelance platforms.',
      'Watermark graphic design trial submissions heavily across the canvas.'
    ],
    realExample: {
      title: 'Unpaid Article Test Assignment Harvest',
      description: 'An agency asked eight freelance writers to submit "sample articles" as part of hiring. The agency published all eight articles on client blogs without paying a dime.'
    },
    faqs: [
      { question: 'Should freelancers ever perform free trial work?', answer: 'Short 15-minute basic skills tests are acceptable, but custom multi-hour production deliverables should ALWAYS be paid.' }
    ],
    relatedIds: ['employment-scam-4', 'employment-scam-10']
  },
  {
    id: 'employment-scam-12',
    title: 'Fake Virtual Assistant Job & Money Laundering Accounts',
    category: 'Employment Scams',
    readTime: '6 min read',
    date: 'May 16, 2025',
    author: 'Virtual Assistant Security Watch',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Virtual Assistant', 'Money Laundering', 'Bank Account', 'Financial Mule'],
    heroImage: 'Virtual Assistant Laptop',
    description: 'Remote "Executive Virtual Assistant" roles require workers to process client payments through their personal bank accounts, converting the employee into an unwitting money laundering mule.',
    howItWorks: [
      'You are hired as a remote Virtual Assistant for an overseas executive.',
      'Your boss asks you to receive client payments into your personal bank account and forward funds via Bitcoin or wire transfers.',
      'The client payments are sourced from stolen credit cards and hacked corporate accounts.',
      'When victims report the theft, law enforcement freezes YOUR personal bank account for money laundering.'
    ],
    warningSigns: [
      'Job duties that involve receiving company funds into your personal bank account.',
      'Employers asking you to buy crypto or send wire transfers on their behalf.',
      'Lack of corporate bank accounts for business operational expenses.'
    ],
    preventionTips: [
      'NEVER allow an employer to route business transactions through your personal bank account.',
      'Legitimate companies process payroll and client funds through registered corporate bank accounts.',
      'Report financial mule recruitment listings to career board managers.'
    ],
    realExample: {
      title: 'Virtual Assistant Bank Account Freeze',
      description: 'A Virtual Assistant processed $20,000 of "client payments" through her checking account over three weeks. The funds were stolen, leading to criminal money laundering charges.'
    },
    faqs: [
      { question: 'Can I be prosecuted if I didn\'t know I was laundering stolen money?', answer: 'Yes. "Willful blindness" is not a legal defense against money laundering accomplice charges.' }
    ],
    relatedIds: ['employment-scam-3', 'banking-scam-2']
  },
  {
    id: 'employment-scam-13',
    title: 'High-Priced Career Coaching & Resume Optimization Traps',
    category: 'Employment Scams',
    readTime: '5 min read',
    date: 'Jun 01, 2025',
    author: 'Executive Coaching Advisory Council',
    severity: 'Low',
    difficultyLevel: 'Beginner',
    tags: ['Career Coach', 'Resume Scam', 'Executive Trap', 'Upfront Fee'],
    heroImage: 'Corporate Career Advisory',
    description: 'Unsolicited messages on LinkedIn critique job seekers\' resumes, promising guaranteed placement in $200k+ executive roles if they purchase $2,500 "resume optimizations".',
    howItWorks: [
      'A "Career Strategist" messages you on LinkedIn claiming your resume is failing ATS filters for high-paying roles.',
      'They guarantee executive job placements if you enroll in their $2,500 "Executive VIP Accelerator".',
      'You pay the fee and receive generic, AI-generated resume rewrites.',
      'The executive placement guarantees are non-existent, and refunds are refused under buried contract clauses.'
    ],
    warningSigns: [
      'Unsolicited LinkedIn critiques guaranteeing high-salary executive job placements.',
      'High-pressure sales calls urging immediate $2,000+ payments for resume formatting.',
      'Coaches lacking verifiable executive recruiting track records.'
    ],
    preventionTips: [
      'Utilize free ATS resume checkers online or trusted university career counseling tools.',
      'Never pay thousands for guaranteed job placements—no coach controls hiring decisions.',
      'Check coach credentials with the International Coaching Federation (ICF).'
    ],
    realExample: {
      title: 'Executive Resume Package Loss',
      description: 'An unemployed manager paid $2,200 for a guaranteed executive placement package. He received a single ChatGPT-formatted PDF resume and zero job interviews.'
    },
    faqs: [
      { question: 'Can a career coach guarantee job placement?', answer: 'No legitimate career coach can guarantee job placement because final hiring decisions belong solely to employers.' }
    ],
    relatedIds: ['social-scam-4', 'employment-scam-6']
  },
  {
    id: 'employment-scam-14',
    title: 'Warehouse & Shipping Job "Background Check Fee" Scams',
    category: 'Employment Scams',
    readTime: '4 min read',
    date: 'Jun 15, 2025',
    author: 'Workforce Onboarding Watch',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Background Check', 'Warehouse Job', 'Onboarding Fee', 'Phishing'],
    heroImage: 'Warehouse Shipping Logistics',
    description: 'Fake warehouse job listings require applicants to pay $49 for a "mandatory background check" via a link controlled by the scammer, stealing money and card details.',
    howItWorks: [
      'You apply for an entry-level $22/hour warehouse job on Craigslist or Facebook.',
      'The employer emails: "You are hired! Click this link to complete your $49 required background check before starting Monday."',
      'You enter your credit card number on the third-party background check site.',
      'The job is non-existent; the scammers pocket the $49 fee and harvest your credit card number.'
    ],
    warningSigns: [
      'Employers requiring candidates to pay for their own background check via specific links.',
      'Job offers extended prior to physical interviews or phone screenings.',
      'Payment sites demanding credit card details for background screening.'
    ],
    preventionTips: [
      'Under standard employment practices, employers absorb background check costs directly.',
      'If an employer requires you to pay for background checks, walk away.',
      'Verify warehouse hiring centers by visiting location facilities in person.'
    ],
    realExample: {
      title: 'Warehouse Background Check Link Scam',
      description: 'Over 100 job applicants paid a $45 "background check fee" for a fake logistics warehouse listing, losing $4,500 collectively.'
    },
    faqs: [
      { question: 'Do legitimate companies ever make applicants pay for background checks?', answer: 'Reputable employers cover background check expenses as a standard business recruitment cost.' }
    ],
    relatedIds: ['employment-scam-4', 'employment-scam-1']
  },
  {
    id: 'employment-scam-15',
    title: 'MLM Energy & Utility Door-to-Door Sales Traps',
    category: 'Employment Scams',
    readTime: '5 min read',
    date: 'Jul 01, 2025',
    author: 'Direct Sales Integrity Alliance',
    severity: 'Medium',
    difficultyLevel: 'Intermediate',
    tags: ['Door to Door', 'Energy Scam', 'Slamming', '100% Commission'],
    heroImage: 'Residential Neighborhood Street',
    description: 'Vague "Marketing Management" jobs force recruits into 12-hour unpaid door-to-door solicitation, tricking homeowners into switching energy providers under false pretenses.',
    howItWorks: [
      'You are hired for a "Junior Marketing Manager" role after a 5-minute interview.',
      'On day one, you are driven to a residential neighborhood and instructed to knock on doors for 12 hours.',
      'Your task: Ask homeowners to see their electric bill and switch them to alternative energy suppliers ("slamming").',
      'Pay is 100% commission-based; if homeowners cancel, your earnings are retroactively clawed back.'
    ],
    warningSigns: [
      'Vague job descriptions promising "Rapid Advancement to Management" within 60 days.',
      '12-hour workday expectations without guaranteed base hourly wages.',
      'Daily mandatory morning motivation meetings focusing on aggressive sales pressure.'
    ],
    preventionTips: [
      'Inquire directly during interviews: "What percentage of time is spent doing door-to-door sales?"',
      'Ensure employment contracts comply with minimum wage labor laws.',
      'Avoid sales roles that force unethical "slamming" tactics on consumers.'
    ],
    realExample: {
      title: 'Door-to-Door Energy Sales Exploitation',
      description: 'A college graduate worked 60 hours a week doing door-to-door energy sales. After retroactive clawbacks for client cancellations, he earned $120 total for a month of work.'
    },
    faqs: [
      { question: 'What is energy "slamming"?', answer: 'Slamming is the illegal practice of switching a consumer\'s electric or gas provider without their explicit consent.' }
    ],
    relatedIds: ['employment-scam-6', 'financial-scam-9']
  }
];
