import { Article } from './articles';

export const socialArticles: Article[] = [
  {
    id: 'social-scam-1',
    title: 'WhatsApp & Telegram Hijacking and Family Impersonation',
    category: 'Social Media',
    readTime: '5 min read',
    date: 'Dec 12, 2024',
    author: 'Social Network Defense Lab',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['WhatsApp', 'Telegram', 'Impersonation', '2FA', 'Account Hijack'],
    heroImage: 'Social Messaging Network',
    description: 'Scammers compromise social messaging profiles to impersonate trusted family members or friends, claiming urgent emergencies that require immediate wire transfers.',
    howItWorks: [
      'Scammers take over a contact\'s messaging account by tricking them into sharing a 6-digit SMS verification code.',
      'They browse past message logs to learn the voice and conversational tone of the victim.',
      'They text you: "I\'m in an emergency at the hospital/police station and need $600 sent right now!"',
      'Because the message comes from your friend\'s real profile, victims wire money without double-checking.'
    ],
    warningSigns: [
      'Friends or relatives asking for urgent monetary transfers via unverified channels or crypto.',
      'Receiving unexpected SMS 6-digit verification codes for WhatsApp or Telegram.',
      'Messages from close contacts that use strange phrasing or refuse voice/video calls.'
    ],
    preventionTips: [
      'Enable Two-Step Verification (2FA PIN) inside messaging app security settings.',
      'NEVER share 6-digit SMS login codes with anyone, even close friends.',
      'Call your relative directly on their mobile phone or landline to verify emergency claims.'
    ],
    realExample: {
      title: 'The "Hi Mom, I Lost My Phone" Scam',
      description: 'A parent received a WhatsApp text from an unknown number: "Hi Mom, my phone fell in the river, this is my temporary number. I need $1,200 for urgent car repairs." The parent sent money before realizing her child was safe at home.'
    },
    faqs: [
      { question: 'How do I regain control of a hacked WhatsApp account?', answer: 'Re-install WhatsApp and log in with your phone number. The incoming SMS code will immediately kick out the scammer.' }
    ],
    relatedIds: ['social-scam-2', 'social-scam-3'],
    isTrending: true
  },
  {
    id: 'social-scam-2',
    title: 'Pig Butchering Romance & Investment Traps (Sha Zhu Pan)',
    category: 'Social Media',
    readTime: '8 min read',
    date: 'Dec 28, 2024',
    author: 'Global Cybercrime Taskforce',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Romance Scam', 'Pig Butchering', 'Crypto', 'Dating Apps', 'Tinder'],
    heroImage: 'Digital Connectivity Heart',
    description: 'Fraud rings build months-long romantic or friendship bonds with victims on dating apps (Tinder, Bumble, Hinge) before "fattening" them up for catastrophic crypto investment fraud.',
    howItWorks: [
      'Scammers initiate contact on dating platforms or Instagram, projecting wealthy lifestyles.',
      'Over weeks or months, they build deep trust, affection, and daily emotional contact.',
      'They casually mention making thousands on a specialized, private crypto trading app.',
      'They guide you to deposit $500, showing fake 300% gains. You deposit your life savings, but withdrawals are permanently blocked.'
    ],
    warningSigns: [
      'Online romantic interests who refuse in-person meetings or live video chats.',
      'Quick attempts to move conversations off dating apps onto WhatsApp or Telegram.',
      'Unsolicited financial advice and invitations to invest in unverified trading apps.'
    ],
    preventionTips: [
      'Never invest money based on advice from individuals met exclusively online.',
      'Perform reverse-image searches on profile photos of online acquaintances.',
      'Remember: If a trading platform promises guaranteed massive returns, it is a scam.'
    ],
    realExample: {
      title: 'The $450,000 "Pig Butchering" Tragedy',
      description: 'A professional met a smooth-talking investor on Hinge. Over 4 months, he was convinced to transfer his 401(k) into a rogue trading platform, losing his entire retirement savings.'
    },
    faqs: [
      { question: 'Why is it called "Pig Butchering"?', answer: 'The term originates from the translation "Sha Zhu Pan", reflecting how scammers groom ("fatten") victims emotionally before stealing ("butchering") their financial assets.' }
    ],
    relatedIds: ['social-scam-1', 'investment-scam-1'],
    isTrending: true
  },
  {
    id: 'social-scam-3',
    title: 'Instagram & Facebook Account Takeover via "Help Me Verify" Messages',
    category: 'Social Media',
    readTime: '5 min read',
    date: 'Jan 10, 2025',
    author: 'Identity & Social Security Analyst',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Instagram', 'Facebook', 'Account Takeover', 'Help Link'],
    heroImage: 'Social Profile Matrix',
    description: 'Attackers hijack social accounts by messaging friends asking them to receive and forward a "recovery link" to help get into their account.',
    howItWorks: [
      'A compromised friend\'s Instagram account messages you: "I\'m locked out of my account, can you help me get a recovery link?"',
      'The scammer triggers a password reset on YOUR account, sending a recovery SMS link to your phone.',
      'You forward the link or code thinking it helps your friend.',
      'The scammer clicks the link, resets your password, and locks you out of your account.'
    ],
    warningSigns: [
      'Friends asking you to receive or forward SMS links sent to your phone.',
      'Instagram alerts stating "Password Reset Requested" when you didn\'t initiate one.',
      'Messages urging fast assistance with social media verification.'
    ],
    preventionTips: [
      'NEVER forward links or security codes sent to your phone number.',
      'Set up two-factor authentication using an authenticator app (Duo, Google Authenticator).',
      'Verify strange requests by calling your friend outside of social media.'
    ],
    realExample: {
      title: 'Instagram Verification Link Cascade',
      description: 'A student forwarded a recovery link to a friend. Within 2 hours, the scammer hijacked her account and used it to trick 14 more of her followers.'
    },
    faqs: [
      { question: 'What should I do if my Instagram account is stolen?', answer: 'Use Instagram\'s "Request Support" feature to verify your identity via video selfie verification.' }
    ],
    relatedIds: ['social-scam-1', 'social-scam-4']
  },
  {
    id: 'social-scam-4',
    title: 'LinkedIn & Professional Networking Phishing Attacks',
    category: 'Social Media',
    readTime: '6 min read',
    date: 'Jan 22, 2025',
    author: 'Corporate Threat Intelligence Group',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['LinkedIn', 'Recruiter Scam', 'Malicious PDF', 'Spear Phishing'],
    heroImage: 'Professional Network Connections',
    description: 'Scammers create fake executive profiles on LinkedIn to send malicious "job description PDFs" that install info-stealing malware on corporate laptops.',
    howItWorks: [
      'Attackers create polished profiles pretending to be recruiters for Fortune 500 firms.',
      'They message target employees with attractive job offers or consulting gigs.',
      'They send a PDF or zip file containing "Salary and Position Details".',
      'Opening the file executes a hidden Trojan script that steals browser session cookies and company access keys.'
    ],
    warningSigns: [
      'Recruiters offering compensation far above industry standards for brief roles.',
      'Job descriptions sent as executable (.exe, .scr) or password-protected zip archives.',
      'Recruiter profiles created recently with few connections or generic stock photos.'
    ],
    preventionTips: [
      'Never open executable files or password-protected archives from unknown contacts.',
      'Verify recruiter identities on official company website employee directories.',
      'Use isolated sandbox environments to inspect unsolicited attachments.'
    ],
    realExample: {
      title: 'Fake Google Recruiter Malware Attack',
      description: 'An engineer opened a "Role_Details.pdf.exe" sent by a fake LinkedIn recruiter, leading to a network breach that compromised internal source code.'
    },
    faqs: [
      { question: 'Are LinkedIn InMail messages always verified?', answer: 'No. Anyone can purchase Premium LinkedIn accounts to send InMail messages regardless of identity verification.' }
    ],
    relatedIds: ['social-scam-3', 'employment-scam-1']
  },
  {
    id: 'social-scam-5',
    title: 'Deepfake Voice & AI Video Social Media Scams',
    category: 'Social Media',
    readTime: '7 min read',
    date: 'Feb 05, 2025',
    author: 'AI Security & Synthetic Media Lab',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Deepfake', 'AI Voice', 'Synthetic Media', 'Celebrity Scam'],
    heroImage: 'AI Synthetic Face Generator',
    description: 'Generative AI tools synthesize realistic voice clones and video streams of celebrities or loved ones to trick social media users into sending money.',
    howItWorks: [
      'Scammers harvest short 15-second audio samples from public Instagram reels or TikTok videos.',
      'AI cloning tools generate an identical voice reading an emergency distress script.',
      'They call family members using the synthesized voice: "Dad, I got into an accident and need money!"',
      'Or they livestream AI deepfake videos of Elon Musk promising double-your-crypto promos.'
    ],
    warningSigns: [
      'Voices sounding slightly robotic or lacking emotional cadence during urgent calls.',
      'Livestreams on TikTok/YouTube promising free money or crypto multipliers.',
      'Calls from unknown numbers featuring familiar voices demanding instant wire transfers.'
    ],
    preventionTips: [
      'Establish a secret family "Safe Word" that must be spoken to confirm real emergencies.',
      'Ask the caller a personal question that only the real individual would know.',
      'Be extremely skeptical of live videos promoting crypto giveaways.'
    ],
    realExample: {
      title: 'AI Voice Clone Kidnapping Hoax',
      description: 'A mother received a call featuring her daughter\'s exact voice crying for help. A fake kidnapper demanded $10,000 before the mother called her daughter\'s school and verified she was safe in class.'
    },
    faqs: [
      { question: 'How much audio does AI need to clone a human voice?', answer: 'Modern generative AI voice models can create a convincing voice clone from as little as 3 seconds of clear audio.' }
    ],
    relatedIds: ['social-scam-1', 'mobile-scam-1']
  },
  {
    id: 'social-scam-6',
    title: 'TikTok & Reel "Get-Rich-Quick" Crypto & Glitch Exploits',
    category: 'Social Media',
    readTime: '4 min read',
    date: 'Feb 18, 2025',
    author: 'Youth Digital Safety Watch',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['TikTok', 'Glitch', 'ATM Hack', 'Get Rich Quick'],
    heroImage: 'Short Form Video Feed',
    description: 'Viral social media videos promote illegal "ATM cheque glitches" or "infinite money hacks" that trick teenagers into committing felony bank fraud.',
    howItWorks: [
      'Short-form creators post videos claiming to reveal a "secret ATM glitch" that gives free cash.',
      'They instruct viewers to deposit fake cheques into ATMs and immediately withdraw cash balances.',
      'Viewers perform the act, thinking it\'s a victimless software loophole.',
      'Banks prosecute the individuals for felony cheque fraud, ruining their credit and criminal records.'
    ],
    warningSigns: [
      'Videos claiming to share "infinite money glitches" or secret bank loopholes.',
      'Instructions to deposit unknown cheques or share bank account access.',
      'Creators offering to "clear bank debt" for a 50% cut.'
    ],
    preventionTips: [
      'Understand that there are NO legal "glitches" that provide free bank money.',
      'Depositing bad cheques or exploiting bank timing delays is felony bank fraud.',
      'Report viral social media videos promoting illegal financial exploits.'
    ],
    realExample: {
      title: 'Viral Chase Bank Glitch Craze',
      description: 'Hundreds of social media users deposited counterfeit cheques at ATMs after watching viral TikTok videos, resulting in frozen accounts and criminal charges.'
    },
    faqs: [
      { question: 'Is exploiting a bank glitch considered a crime?', answer: 'Yes. Intentionally withdrawing funds backed by fraudulent deposits is illegal bank fraud.' }
    ],
    relatedIds: ['banking-scam-6', 'social-scam-1']
  },
  {
    id: 'social-scam-7',
    title: 'Fake E-Commerce Stores Promoted via Meta Social Ads',
    category: 'Social Media',
    readTime: '5 min read',
    date: 'Mar 03, 2025',
    author: 'Consumer Protection Bureau',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Meta Ads', 'Instagram Shop', 'Fake Store', 'Counterfeit'],
    heroImage: 'Social Shopping Interface',
    description: 'Scammers run targeted Facebook and Instagram ads featuring luxury items at 90% discounts, taking credit card payments for online stores that never deliver.',
    howItWorks: [
      'Fraudsters create flash e-commerce websites stealing photos from boutique brands.',
      'They buy targeted ad campaigns on Instagram and Facebook showing "Going Out of Business Sales".',
      'Customers click the ad and pay via credit card or debit card.',
      'No merchandise is ever shipped, and the website vanishes within days.'
    ],
    warningSigns: [
      'Prices that are unrealistically cheap (e.g. $300 leather boots for $19).',
      'Websites created within the last 30 days without physical contact addresses.',
      'Stores lacking official privacy policies or operating strictly via social ad clicks.'
    ],
    preventionTips: [
      'Research store domain registration dates using WHOIS lookup tools.',
      'Check review aggregators like Trustpilot before buying from social media ads.',
      'Pay via credit card or PayPal so you can file chargebacks if goods fail to arrive.'
    ],
    realExample: {
      title: 'The 90% Off Outdoor Gear Ad Campaign',
      description: 'Over 5,000 users ordered discounted camping gear from an Instagram ad store. None received products, accumulating over $200,000 in fraudulent card charges.'
    },
    faqs: [
      { question: 'Does Meta verify all advertisers on Facebook and Instagram?', answer: 'While Meta uses automated review systems, thousands of rogue advertiser accounts bypass checks daily.' }
    ],
    relatedIds: ['payments-scam-2', 'social-scam-3']
  },
  {
    id: 'social-scam-8',
    title: 'X (Twitter) Crypto Bot Account & Blue Check Impersonation',
    category: 'Social Media',
    readTime: '5 min read',
    date: 'Mar 19, 2025',
    author: 'Web3 Threat Monitoring Group',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['X', 'Twitter', 'Crypto Bot', 'Verified Badge', 'Airdrop'],
    heroImage: 'Microblogging Feed Interface',
    description: 'Bot networks with purchased verified checkmarks impersonate popular crypto projects and figures to reply to tweets with malicious airdrop drainer links.',
    howItWorks: [
      'Scammers buy verified blue checkmark handles mimicking real founders (e.g., @VitalikButer1n).',
      'Automated bots monitor viral tweets and instantly reply with: "Claim your free token airdrop here!"',
      'Victims click the link and connect their Web3 wallet.',
      'A malicious smart contract drains all NFTs and crypto tokens instantly from the wallet.'
    ],
    warningSigns: [
      'Twitter/X handles containing subtle typos or extra digits.',
      'Promotional links offering "Free Token Airdrops" in reply threads.',
      'Smart contracts requesting "SetApprovalForAll" permissions on Web3 wallets.'
    ],
    preventionTips: [
      'Inspect Twitter/X handle spellings carefully—verified checkmarks do NOT equal safety.',
      'Never connect Web3 crypto wallets to links posted in social media reply sections.',
      'Use wallet security browser extensions (like Pocket Universe) that simulate transaction approvals.'
    ],
    realExample: {
      title: 'The Verified Airdrop Wallet Drainer',
      description: 'A verified impostor account posted a fake token claim link under an official announcement. Users connected wallets and lost $1.2 million in Ethereum within 4 hours.'
    },
    faqs: [
      { question: 'What is a wallet drainer?', answer: 'A wallet drainer is a malicious script that prompts users to sign a token approval transaction, transferring all assets to the hacker.' }
    ],
    relatedIds: ['investment-scam-1', 'social-scam-1']
  },
  {
    id: 'social-scam-9',
    title: 'Discord Server Hijacking & Rogue Moderator Bot Scams',
    category: 'Social Media',
    readTime: '6 min read',
    date: 'Apr 02, 2025',
    author: 'Community Security Operations',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Discord', 'Webhook', 'Moderator Bot', 'Community Hijack'],
    heroImage: 'Gaming Chat Server',
    description: 'Hackers hijack Discord server owner accounts via token stealer malware, using server announcement bots to broadcast phishing links to thousands of members.',
    howItWorks: [
      'Hackers trick a Discord server owner or moderator into running a malicious game demo script.',
      'The script steals the owner\'s Discord session token, bypassing password and 2FA prompts.',
      'The hacker uses the owner account to post @everyone announcements promoting fake mints or sales.',
      'Trusting members click the official server announcement and lose funds.'
    ],
    warningSigns: [
      'Surprise @everyone announcements offering unexpected discounts or free mints.',
      'Server administrators requesting members to download executable files for testing.',
      'Discord bots messaging users privately with exclusive invites.'
    ],
    preventionTips: [
      'Turn off Direct Messages from server members in Discord privacy settings.',
      'Server owners should enforce mandatory SMS/authenticator 2FA for all staff roles.',
      'Never test unverified game files or executable code sent by community contacts.'
    ],
    realExample: {
      title: 'Gaming Guild Discord Announcement Hack',
      description: 'A 50,000-member Discord server was compromised when a moderator clicked a fake sponsor link. The resulting malicious announcement drained $300,000 from members.'
    },
    faqs: [
      { question: 'What is a Discord token?', answer: 'A Discord token is a unique alphanumeric key generated when you log in that allows full API access to your account.' }
    ],
    relatedIds: ['social-scam-3', 'social-scam-8']
  },
  {
    id: 'social-scam-10',
    title: 'Reddit Karma & Account Farming for Scam Credibility',
    category: 'Social Media',
    readTime: '5 min read',
    date: 'Apr 16, 2025',
    author: 'Social Platform Integrity Lab',
    severity: 'Low',
    difficultyLevel: 'Beginner',
    tags: ['Reddit', 'Karma Farming', 'Botnet', 'Astroturfing'],
    heroImage: 'Social Discussion Board',
    description: 'Syndicates use automated botnets to build high-karma Reddit accounts, using them to post fake product recommendations and astroturf fraudulent services.',
    howItWorks: [
      'Bots cross-post popular content across subreddits to amass thousands of karma points.',
      'The high-karma aged accounts are sold on online marketplaces to scammers.',
      'Scammers use these accounts to post fake testimonials: "This review service saved my business!"',
      'Users trust the high karma count and fall victim to the promoted scam.'
    ],
    warningSigns: [
      'Reddit accounts with high karma but post histories consisting solely of reposted memes.',
      'Multiple accounts replying with identical enthusiastic product endorsements in threads.',
      'Posts directing users to unverified Telegram groups or custom payment sites.'
    ],
    preventionTips: [
      'Examine user comment histories—look for sudden shifts in post topics and tone.',
      'Do not rely on Reddit karma score as a guarantee of trustworthiness.',
      'Be wary of threads where every comment unanimously praises a single obscure product.'
    ],
    realExample: {
      title: 'Astroturfed Essay Writing Scam Ring',
      description: 'Dozens of aged Reddit accounts were used to push students to an essay service that stole credit card numbers and delivered plagiarized papers.'
    },
    faqs: [
      { question: 'What is astroturfing on social media?', answer: 'Astroturfing is the practice of masking sponsor or scam messages as genuine, grassroots user opinions.' }
    ],
    relatedIds: ['social-scam-7', 'employment-scam-1']
  },
  {
    id: 'social-scam-11',
    title: 'Influencer Brand Sponsorship & Contract Phishing',
    category: 'Social Media',
    readTime: '6 min read',
    date: 'May 01, 2025',
    author: 'Creator Economy Security Unit',
    severity: 'Medium',
    difficultyLevel: 'Intermediate',
    tags: ['Creator Economy', 'Influencer', 'Sponsorship Scam', 'PDF Malware'],
    heroImage: 'Video Creator Studio',
    description: 'Scammers target YouTubers and Instagram creators with lucrative sponsorship offers, sending contract archives that steal channel session cookies.',
    howItWorks: [
      'Scammers send professional email inquiries offering $5,000 to promote a new software or VPN.',
      'They attach a password-protected zip file labeled "Sponsorship_Agreement_and_Guidelines.zip".',
      'When the creator unzips and runs the enclosed file, an info-stealer Trojan harvests session cookies.',
      'The attacker hijacks the YouTube or Instagram channel, renaming it to promote crypto scams.'
    ],
    warningSigns: [
      'Sponsorship emails sent from generic domain addresses (e.g., brand-sponsorships@gmail.com).',
      'Contracts sent as executable files (.exe, .scr) or requiring zip passwords.',
      'Unusually high payment offers without requiring subscriber count audits.'
    ],
    preventionTips: [
      'Use dedicated, air-gapped devices to review sponsorship files.',
      'Only accept agreement documentation in standard PDF or Google Docs format.',
      'Enable hardware security key (YubiKey) 2FA protection on primary creator channels.'
    ],
    realExample: {
      title: '1 Million Subscriber Tech Channel Hijack',
      description: 'A popular reviewer opened a fake sponsorship PDF, resulting in his YouTube channel being hijacked and turned into a fake SpaceX crypto livestream.'
    },
    faqs: [
      { question: 'How do hackers bypass 2FA on social media accounts?', answer: 'Info-stealer malware steals active browser session cookies, allowing hackers to clone logged-in sessions without needing passwords or 2FA.' }
    ],
    relatedIds: ['social-scam-4', 'social-scam-3']
  },
  {
    id: 'social-scam-12',
    title: 'Dating App Verification Code & Catfishing Traps',
    category: 'Social Media',
    readTime: '4 min read',
    date: 'May 14, 2025',
    author: 'Online Safety Council',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Catfishing', 'Dating App', 'Tinder', 'Verification Code'],
    heroImage: 'Mobile Dating Swipe',
    description: 'Scammers on Tinder and Bumble claim you must verify your identity on a "safe dating portal" before meeting, charging recurring credit card fees.',
    howItWorks: [
      'You match with an attractive profile on a dating app.',
      'After brief messaging, the match says: "I only meet people who are verified on DateSafe-Shield.com for my safety."',
      'You click the link, enter your card details for a "free $0 verification", and get billed $49.99 monthly.',
      'The match instantly unmatches and disappears.'
    ],
    warningSigns: [
      'Matches demanding third-party website verification before agreeing to meet.',
      'Websites asking for credit card details for "free safety verification".',
      'Profiles using stock model photos that refuse phone or video calls.'
    ],
    preventionTips: [
      'Only use official in-app verification features provided directly by Tinder, Bumble, or Hinge.',
      'NEVER enter credit card details on third-party verification sites recommended by matches.',
      'Meet in well-lit, public locations for first-time dates.'
    ],
    realExample: {
      title: 'Fake Safety Verification Portal Scam',
      description: 'A user entered card details on a match\'s recommended "dating badge site" and was billed $60/month by a shell company located overseas.'
    },
    faqs: [
      { question: 'Do official dating apps require paid third-party verification badges?', answer: 'No. Major dating apps offer free, built-in selfie verification tools inside their official applications.' }
    ],
    relatedIds: ['social-scam-2', 'payments-scam-11']
  },
  {
    id: 'social-scam-13',
    title: 'Snapchat & Private Content Extortion (Sextortion)',
    category: 'Social Media',
    readTime: '6 min read',
    date: 'May 28, 2025',
    author: 'Cyber Exploitation Prevention Taskforce',
    severity: 'Critical',
    difficultyLevel: 'Intermediate',
    tags: ['Sextortion', 'Snapchat', 'Extortion', 'Blackmail'],
    heroImage: 'Mobile Camera Interface',
    description: 'Coerced or stolen intimate photos on Snapchat are used by blackmailers to extort victims under threats of sending photos to family and school contacts.',
    howItWorks: [
      'A scammer creates a fake attractive profile on Snapchat or Instagram.',
      'They engage in flirting and persuade the victim to send explicit images.',
      'The scammer instantly reveals their identity, shows screenshots of the victim\'s family/friend follower list, and demands $500.',
      'They threaten to send the photos to everyone on the list unless paid immediately via gift cards or Zelle.'
    ],
    warningSigns: [
      'New contacts quickly turning conversations explicitly intimate.',
      'Requests to move to Snapchat for "disappearing" media exchanges.',
      'Demands for money coupled with screenshots of your social media contacts.'
    ],
    preventionTips: [
      'Never send explicit photos or videos to individuals met online.',
      'If targeted, DO NOT PAY. Paying rarely stops extortionists and leads to higher demands.',
      'Block the extortionist, take screenshots of threats, and report immediately to law enforcement (NCMEC/TakeItDown).'
    ],
    realExample: {
      title: 'High School Sextortion Scheme',
      description: 'A teenager was blackmailed for $1,000 after sharing a single photo. His parents contacted local police and the FBI, who intervened and shut down the overseas blackmail network.'
    },
    faqs: [
      { question: 'What is TakeItDown?', answer: 'TakeItDown is a free tool operated by NCMEC that creates unique digital fingerprints (hashes) of explicit images to prevent their upload across major platforms.' }
    ],
    relatedIds: ['social-scam-1', 'mobile-scam-1']
  },
  {
    id: 'social-scam-14',
    title: 'Fake Giveaways & Fan Club Impersonation on YouTube & Facebook',
    category: 'Social Media',
    readTime: '4 min read',
    date: 'Jun 10, 2025',
    author: 'Digital Rights Protection Unit',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Giveaway', 'YouTube Comment', 'Fan Club', 'Shipping Fee'],
    heroImage: 'Video Comment Section',
    description: 'Bots impersonate famous YouTubers in comment sections, notifying fans they won a prize but must pay a "small shipping fee" on Telegram.',
    howItWorks: [
      'Bots create accounts using the exact avatar photo and name of a popular YouTuber.',
      'They reply to comment section posts: "Congratulations! You won a PS5/iPhone! Text my Telegram @YouTuberPrize to claim!"',
      'The victim contacts the Telegram handle and is instructed to pay $35 for express courier delivery.',
      'Once paid, the scammer requests more money or blocks the victim.'
    ],
    warningSigns: [
      'Comment replies asking you to contact a Telegram or WhatsApp number to claim prizes.',
      'Prize notifications requiring you to pay shipping or customs fees upfront.',
      'User handles in comment replies that lack official channel verification badges.'
    ],
    preventionTips: [
      'Real content creators list giveaway winners inside official videos, not random comment replies.',
      'Never pay shipping or processing fees to receive a free contest prize.',
      'Report fake impersonation channels directly to platform moderation.'
    ],
    realExample: {
      title: 'Tech Reviewer Giveaway Comment Trap',
      description: 'Over 200 subscribers paid $25 "courier fees" to a fake Telegram account thinking they won iPhones in a tech reviewer\'s contest.'
    },
    faqs: [
      { question: 'How can I tell a real creator comment from a bot reply?', answer: 'Official creators have a highlighted channel background or checkmark badge next to their comment name.' }
    ],
    relatedIds: ['social-scam-1', 'payments-scam-5']
  },
  {
    id: 'social-scam-15',
    title: 'Crowdfunding & Charity Fraud Following Natural Disasters',
    category: 'Social Media',
    readTime: '5 min read',
    date: 'Jun 22, 2025',
    author: 'Humanitarian Fraud Monitoring Group',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Charity Scam', 'GoFundMe', 'Disaster Relief', 'Fake Fundraiser'],
    heroImage: 'Humanitarian Relief Symbol',
    description: 'Disaster opportunists create fake GoFundMe pages and emotional social media posts, hijacking natural disaster relief funds for personal gain.',
    howItWorks: [
      'Following a hurricane, earthquake, or conflict, scammers download emotional tragedy photos.',
      'They launch fake GoFundMe campaigns claiming to support local victim families or animal shelters.',
      'They run emotional social media ads asking for urgent crypto or cash donations.',
      '100% of donated funds flow directly into personal offshore accounts.'
    ],
    warningSigns: [
      'Newly formed charity pages without registered non-profit EIN numbers.',
      'Individual GoFundMe campaigns claiming to distribute funds directly without verification.',
      'Pressure to donate exclusively via crypto, Venmo, or cash apps.'
    ],
    preventionTips: [
      'Donate to established, vetted non-profit organizations (Red Cross, UNICEF, Doctors Without Borders).',
      'Verify non-profit tax status on CharityNavigator.org or GuideStar.',
      'Avoid clicking unsolicited donation links embedded in viral social posts.'
    ],
    realExample: {
      title: 'Fake Wildfire Victim Fundraiser',
      description: 'An opportunist raised $80,000 on social media claiming to rebuild an animal sanctuary destroyed by wildfires. Investigations revealed the sanctuary never existed.'
    },
    faqs: [
      { question: 'How can I check if a charity is legitimate?', answer: 'Search the IRS Tax-Exempt Organization Search tool or Charity Navigator to confirm official non-profit accreditation.' }
    ],
    relatedIds: ['social-scam-7', 'fraud-scam-1']
  }
];
