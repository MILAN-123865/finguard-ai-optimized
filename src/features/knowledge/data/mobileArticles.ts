import { Article } from './articles';

export const mobileArticles: Article[] = [
  {
    id: 'mobile-scam-1',
    title: 'Smishing (SMS Phishing) & Package Delivery Traps',
    category: 'Mobile Security',
    readTime: '4 min read',
    date: 'Jan 05, 2025',
    author: 'Mobile Threat Defense Team',
    severity: 'High',
    difficultyLevel: 'Beginner',
    tags: ['Smishing', 'SMS', 'USPS', 'Delivery Scam', 'Malicious Link'],
    heroImage: 'Mobile Alert Message',
    description: 'Deceptive text messages masquerading as urgent alerts from USPS, FedEx, or banks trick users into clicking links that harvest credit card numbers or install mobile spyware.',
    howItWorks: [
      'You receive an SMS text: "USPS: Your parcel is on hold due to $1.20 unpaid customs fee. Update address here: usps-track-deliver.com".',
      'The link opens a convincing clone of the official logistics portal.',
      'You enter your address and credit card details to pay the $1.20 fee.',
      'The scammers instantly capture your card credentials and charge recurring fraudulent transactions.'
    ],
    warningSigns: [
      'Unsolicited text messages containing shortened or unusual URL domain extensions (.top, .xyz, .info).',
      'Urgent threats of package returns, fee penalties, or account closures.',
      'SMS messages originating from 10-digit random mobile numbers instead of official corporate shortcodes.'
    ],
    preventionTips: [
      'Do not click embedded links in unsolicited text messages.',
      'Navigate directly to the official logistics provider website and type your tracking code manually.',
      'Enable spam text filtering options on iOS and Android devices.'
    ],
    realExample: {
      title: 'The Fake Customs Fee Trap',
      description: 'A victim clicked an SMS link expecting a birthday gift parcel. Entering card details for a $2 customs fee resulted in $1,500 charged to her credit card in under an hour.'
    },
    faqs: [
      { question: 'Can I get hacked just by opening a text message?', answer: 'Simply opening an SMS text message is safe. The danger occurs when you click links, download files, or call phone numbers contained in the message.' }
    ],
    relatedIds: ['mobile-scam-2', 'mobile-scam-3'],
    isTrending: true
  },
  {
    id: 'mobile-scam-2',
    title: 'Rogue App Store Clones & Malicious APK Sideloading',
    category: 'Mobile Security',
    readTime: '6 min read',
    date: 'Jan 18, 2025',
    author: 'Android Malware Audit Division',
    severity: 'Critical',
    difficultyLevel: 'Intermediate',
    tags: ['Sideloading', 'APK', 'Android Malware', 'App Store Clone'],
    heroImage: 'Mobile Code Operating System',
    description: 'Unofficial app download portals distribute APK installation files infected with banking Trojans and spyware that bypass traditional Google Play Store security checks.',
    howItWorks: [
      'You search for a premium mobile game or modified app online and find an "APK Download" link.',
      'The website prompts you to enable "Install from Unknown Sources" in Android settings.',
      'The app installs successfully, but executes background malware that harvests SMS 2FA codes.',
      'The malware sends your banking codes to remote command-and-control servers.'
    ],
    warningSigns: [
      'Websites prompting you to change Android system security settings to "Allow Unknown Installs".',
      'Utility apps (flashlights, PDF converters) demanding permissions to access SMS or Call Logs.',
      'Unusual battery drain or overheating while your phone is idle.'
    ],
    preventionTips: [
      'Keep "Install from Unknown Sources" disabled in Android security settings.',
      'Only download mobile software from official application stores (Google Play, Apple App Store).',
      'Review app permission requests carefully before granting access.'
    ],
    realExample: {
      title: 'Modded WhatsApp APK Banking Spyware',
      description: 'A user downloaded a modified "Pink WhatsApp" APK from a forum. The malware quietly read incoming banking OTPs, resulting in a $6,000 bank account drain.'
    },
    faqs: [
      { question: 'Is Play Protect sufficient to catch all mobile malware?', answer: 'Google Play Protect provides strong baseline protection, but sideloaded APKs bypass store validation completely.' }
    ],
    relatedIds: ['mobile-scam-1', 'banking-scam-8'],
    isTrending: true
  },
  {
    id: 'mobile-scam-3',
    title: 'Stolen Device Passcode Exploitation & iCloud/Google Account Takeovers',
    category: 'Mobile Security',
    readTime: '7 min read',
    date: 'Feb 02, 2025',
    author: 'Mobile Physical Security Research',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Passcode Theft', 'Shoulder Surfing', 'iCloud Lock', 'Device Theft'],
    heroImage: 'Mobile Screen Lock Keypad',
    description: 'Thieves shoulder-surf your 4-digit device passcode in crowded bars before stealing your physical smartphone, using the passcode to reset Apple ID/Google passwords and access bank apps.',
    howItWorks: [
      'A thief watches you type your numeric device passcode in a crowded venue.',
      'They steal your physical smartphone minutes later.',
      'Using your device passcode, they reset your master Apple ID / Google account password instantly.',
      'They disable "Find My Phone", access stored password managers, and drain mobile banking apps.'
    ],
    warningSigns: [
      'Strangers standing unusually close or recording video while you unlock your phone in public.',
      'Surprise physical loss of your mobile device in crowded environments.'
    ],
    preventionTips: [
      'Use alphanumeric passcodes (letters and numbers) instead of simple 4-digit PINs.',
      'Enable "Stolen Device Protection" on iOS, requiring Face ID for sensitive security changes.',
      'Rely on Face ID or fingerprint biometrics for unlocking your phone in public places.'
    ],
    realExample: {
      title: 'Bar Shoulder-Surfing Theft Spree',
      description: 'A thief memorized a victim\'s passcode at a bar, stole his iPhone, and used the passcode to change his Apple ID password and steal $18,000 across financial apps in 2 hours.'
    },
    faqs: [
      { question: 'What is iOS Stolen Device Protection?', answer: 'It is a security setting that enforces a 1-hour biometric delay for security setting changes when away from familiar locations.' }
    ],
    relatedIds: ['mobile-scam-1', 'banking-scam-5']
  },
  {
    id: 'mobile-scam-4',
    title: 'Juice Jacking & Compromised Public USB Charging Stations',
    category: 'Mobile Security',
    readTime: '5 min read',
    date: 'Feb 15, 2025',
    author: 'Hardware Cyber Interception Lab',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Juice Jacking', 'Public USB', 'Data Exfiltration', 'Charging Port'],
    heroImage: 'USB Charging Cable Port',
    description: 'Tampered public USB charging kiosks in airports load data-skimming malware onto smartphones through standard USB data transfer pins while charging.',
    howItWorks: [
      'Hackers modify public USB charging ports in airports or train stations with micro-controllers.',
      'You plug your phone directly into the public USB port using a standard cable.',
      'While your phone charges, the hidden chip initiates MTP data transfer, copying photos, messages, and saved keys.',
      'Malicious code can also be pushed directly to vulnerable operating systems.'
    ],
    warningSigns: [
      'Your phone displays a "Trust This Computer?" prompt upon plugging into a wall charger.',
      'USB charging ports that feel loose, warm, or physically modified.',
      'Pop-up prompts requesting file transfer authorization while charging.'
    ],
    preventionTips: [
      'Use physical AC wall outlets with your own personal power adapter block.',
      'Carry a USB "Data Blocker" dongle that physically disconnects data transfer pins.',
      'Utilize portable power bank batteries when traveling.'
    ],
    realExample: {
      title: 'Airport Kiosk Data Exfiltration',
      description: 'Travelers using an unverified USB station at an international airport had their mobile photo galleries and browser cookies silently copied by rogue hardware.'
    },
    faqs: [
      { question: 'What is a USB Data Blocker?', answer: 'A USB Data Blocker is an inexpensive physical adapter that connects power pins while severing data transfer lines completely.' }
    ],
    relatedIds: ['mobile-scam-1', 'mobile-scam-2']
  },
  {
    id: 'mobile-scam-5',
    title: 'Stalkerware & Hidden Parental Monitoring Abuse',
    category: 'Mobile Security',
    readTime: '6 min read',
    date: 'Mar 01, 2025',
    author: 'Privacy Rights & Digital Safety Group',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Stalkerware', 'Spyware', 'Location Tracking', 'Privacy'],
    heroImage: 'Mobile GPS Location Map',
    description: 'Commercial "parental tracking" or covert stalkerware applications installed without consent track physical location, log keypresses, and record ambient microphone audio.',
    howItWorks: [
      'An abuser gains physical access to your unlocked phone for 5 minutes.',
      'They install a hidden background monitoring application that hides its app icon.',
      'The stalkerware continuously uploads GPS coordinates, text messages, photos, and call logs to a remote web dashboard.',
      'The app operates silently without displaying notifications.'
    ],
    warningSigns: [
      'Phone battery draining rapidly even when the device is unused.',
      'Unusual spikes in background mobile data consumption.',
      'Surprise location alerts or someone knowing exact private conversations.'
    ],
    preventionTips: [
      'Never leave your phone unlocked or unattended around untrusted individuals.',
      'Perform regular checks of installed applications in system settings.',
      'Run specialized anti-stalkerware mobile antivirus scans.'
    ],
    realExample: {
      title: 'Covert Location Tracking Discovery',
      description: 'A victim noticed her phone battery dying in 3 hours. A settings audit revealed a hidden "System Service" app sending continuous GPS logs to an external cloud server.'
    },
    faqs: [
      { question: 'How can I detect hidden stalkerware on my smartphone?', answer: 'Check battery usage statistics in settings for unknown applications consuming excessive background power.' }
    ],
    relatedIds: ['mobile-scam-2', 'mobile-scam-3']
  },
  {
    id: 'mobile-scam-6',
    title: 'AirTag & Bluetooth Low Energy (BLE) Unwanted Tracking',
    category: 'Mobile Security',
    readTime: '5 min read',
    date: 'Mar 16, 2025',
    author: 'Wireless Signal Security Unit',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['AirTag', 'BLE', 'Unwanted Tracking', 'Bluetooth'],
    heroImage: 'Bluetooth Wireless Signal',
    description: 'Stalkers and vehicle thieves slip tiny Bluetooth tracking devices (AirTags, SmartTags) into bags or underneath cars to track movements in real time.',
    howItWorks: [
      'A stalker drops a small Bluetooth tracker into your purse, jacket, or car bumper.',
      'The tracker broadcasts BLE signals to nearby smartphones in the crowds, updating its location on the stalker\'s map.',
      'The stalker monitors your home address, workplace, and daily routines.',
      'Automated anti-tracking alerts trigger on your smartphone after a delayed period.'
    ],
    warningSigns: [
      'Receiving "AirTag Found Moving With You" alerts on your iPhone or Android device.',
      'Hearing faint chirping sounds coming from your bag or vehicle bumper.',
      'Unfamiliar Bluetooth devices constantly appearing in close proximity scans.'
    ],
    preventionTips: [
      'If you receive a tracking alert, use the "Play Sound" feature to locate the hidden tracker.',
      'Remove the tracker\'s battery by twisting the metal backing counter-clockwise.',
      'Report persistent unwanted tracking to local law enforcement.'
    ],
    realExample: {
      title: 'Vehicle Bumper Tracking Discovery',
      description: 'A driver received an iPhone alert that an unknown AirTag had been tracking her for 12 miles. She located the device hidden inside her car\'s rear bumper wheel well.'
    },
    faqs: [
      { question: 'Do Android phones alert users to hidden Apple AirTags?', answer: 'Yes. Modern Android operating systems include built-in "Unknown Tracker Alerts" that detect nearby AirTags and BLE trackers.' }
    ],
    relatedIds: ['mobile-scam-5', 'mobile-scam-1']
  },
  {
    id: 'mobile-scam-7',
    title: 'Fake Mobile Security & Antivirus Cleaner Scams',
    category: 'Mobile Security',
    readTime: '4 min read',
    date: 'Apr 01, 2025',
    author: 'Adware & Scareware Audit Group',
    severity: 'Medium',
    difficultyLevel: 'Beginner',
    tags: ['Scareware', 'Fake Antivirus', 'Pop-Up', 'Adware'],
    heroImage: 'Mobile Security Shield',
    description: 'Deceptive web pop-ups claim "Your Phone is Infected with 13 Viruses!", scaring users into downloading bogus $9.99/week cleaner apps that contain malware.',
    howItWorks: [
      'While browsing a website, your screen vibrates with urgent red pop-ups: "WARNING! Your Battery is Damaged by Viruses!".',
      'It prompts you to click "Clean Now" to download a recommended antivirus app.',
      'The app requests expensive weekly subscriptions and bombards your device with intrusive full-screen ads.',
      'Your phone had zero viruses initially—the warning was 100% fake advertising scareware.'
    ],
    warningSigns: [
      'Browser pop-ups claiming your phone hardware or battery is infected.',
      'Websites triggering device vibration and countdown timers urging downloads.',
      'Apps charging absurd weekly subscription fees for basic storage cleaning.'
    ],
    preventionTips: [
      'Close scareware browser tabs immediately—never click links on virus warning pop-ups.',
      'Clear your browser cache and history if pop-ups persist.',
      'Remember that websites CANNOT scan your mobile filesystem for viruses through a browser.'
    ],
    realExample: {
      title: 'Scareware Subscription Trap',
      description: 'An elderly user panicked at a "17 Viruses Found!" pop-up and installed a cleaner app that billed $14.99 per week for 3 months before being noticed.'
    },
    faqs: [
      { question: 'Can a website scan my iPhone for malware?', answer: 'No. Web browsers operate inside strict sandboxes and have zero access to scan your smartphone file system.' }
    ],
    relatedIds: ['mobile-scam-2', 'payments-scam-11']
  },
  {
    id: 'mobile-scam-8',
    title: 'Rogue Wi-Fi Captive Portal & Credential Harvesting',
    category: 'Mobile Security',
    readTime: '5 min read',
    date: 'Apr 15, 2025',
    author: 'Network Communication Security',
    severity: 'Medium',
    difficultyLevel: 'Intermediate',
    tags: ['Captive Portal', 'Rogue WiFi', 'Phishing', 'Public Network'],
    heroImage: 'Wi-Fi Signal Tower',
    description: 'Rogue Wi-Fi networks present fake login "Captive Portals" asking users to sign in with Google or Facebook credentials to gain free internet access.',
    howItWorks: [
      'A hacker sets up an open Wi-Fi network named "Hotel_Guest_Free_WiFi".',
      'Upon connecting, your phone automatically launches a "Captive Portal" login screen.',
      'The page requires you to "Log in with Google" or enter your credit card number to activate internet.',
      'The page captures your Google credentials and multi-factor codes, locking you out of your account.'
    ],
    warningSigns: [
      'Public Wi-Fi networks requiring full social media account logins to access free internet.',
      'Captive portal pages with broken image links or subtle domain typos.',
      'HTTP non-secure browser address bar warnings on login screens.'
    ],
    preventionTips: [
      'Never log into social media or primary email accounts to access public Wi-Fi.',
      'If a captive portal requires a login, use a disposable guest email address.',
      'Use cellular mobile data instead of untrusted public Wi-Fi networks.'
    ],
    realExample: {
      title: 'Hotel Lobby Captive Portal credential Harvest',
      description: 'Hotel guests connected to an "Evil Twin" Wi-Fi network that prompted for Google logins, resulting in 40 compromised Gmail accounts.'
    },
    faqs: [
      { question: 'What is an Evil Twin Wi-Fi attack?', answer: 'An Evil Twin is a rogue wireless access point that masquerades as a legitimate, trusted public Wi-Fi network.' }
    ],
    relatedIds: ['banking-scam-12', 'mobile-scam-1']
  },
  {
    id: 'mobile-scam-9',
    title: 'Zero-Click Exploits & Mobile Operating System Flaws',
    category: 'Mobile Security',
    readTime: '7 min read',
    date: 'May 02, 2025',
    author: 'Advanced Mobile Vulnerability Lab',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['Zero-Click', 'Pegasus', 'iOS Exploit', 'Baseband'],
    heroImage: 'Mobile Hardware Processor',
    description: 'State-sponsored spyware tools utilize zero-click vulnerability exploits in mobile messaging frameworks to compromise smartphones without requiring any user interaction.',
    howItWorks: [
      'Attackers send a specially crafted hidden image or data packet via iMessage or WhatsApp.',
      'The phone\'s operating system attempts to process the image preview in the background.',
      'A buffer overflow memory flaw executes code, installing commercial spyware (e.g. Pegasus).',
      'The user sees no notifications, receives no calls, and clicks zero links, yet the device is fully compromised.'
    ],
    warningSigns: [
      'Targeted individuals (journalists, executives) experiencing unexpected device reboots.',
      'Security advisories issued by Apple/Google urging immediate emergency OS updates.',
      'System crash logs indicating recurring memory allocation faults in messaging services.'
    ],
    preventionTips: [
      'Keep mobile operating system software updated to the absolute latest version immediately upon release.',
      'Enable "Lockdown Mode" on iOS for high-risk individuals.',
      'Restart your smartphone daily to disrupt memory-resident volatile exploits.'
    ],
    realExample: {
      title: 'iMessage ForcedEntry Zero-Click Attack',
      description: 'A zero-click exploit compromised iPhones via malicious PDF files hidden inside iMessage attachments, requiring zero user interaction.'
    },
    faqs: [
      { question: 'What does iOS Lockdown Mode do?', answer: 'Lockdown Mode turns off complex web rendering, blocks message attachments, and disables incoming FaceTime calls from unknown contacts.' }
    ],
    relatedIds: ['mobile-scam-2', 'mobile-scam-3']
  },
  {
    id: 'mobile-scam-10',
    title: 'Fake eSIM Profile Transfer Attacks',
    category: 'Mobile Security',
    readTime: '6 min read',
    date: 'May 17, 2025',
    author: 'Telecom Cyber Security Council',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['eSIM', 'QR Code', 'Carrier Hijack', 'Port Out'],
    heroImage: 'Mobile SIM Card Chip',
    description: 'Hackers trick cellular carrier support representatives into generating new eSIM activation QR codes, transferring target phone numbers to rogue devices in seconds.',
    howItWorks: [
      'Attacker impersonates you using personal info gathered from data leaks.',
      'They contact your mobile carrier requesting an emergency device upgrade to an eSIM.',
      'The carrier emails an eSIM activation QR code to an updated email address.',
      'The attacker scans the QR code, instantly activating your mobile line on their phone.'
    ],
    warningSigns: [
      'Your phone suddenly displays "No SIM" or loses cellular service completely.',
      'Carrier emails confirming eSIM profile creation you did not request.',
      'Inability to send SMS messages or receive incoming calls.'
    ],
    preventionTips: [
      'Set up a carrier security PIN that must be spoken to authorize any account changes.',
      'Enable carrier account "SIM Transfer Lock" online.',
      'Act immediately if your cellular service abruptly drops.'
    ],
    realExample: {
      title: 'eSIM Hijack Crypto Theft',
      description: 'An attacker transferred an executive\'s eSIM profile, intercepted SMS 2FA codes, and stole $80,000 in cryptocurrency within 30 minutes.'
    },
    faqs: [
      { question: 'Is an eSIM more secure than a physical SIM card?', answer: 'eSIMs eliminate physical SIM theft, but carrier account social engineering risks remain identical.' }
    ],
    relatedIds: ['banking-scam-5', 'mobile-scam-1']
  },
  {
    id: 'mobile-scam-11',
    title: 'Mobile Wallet Tap-to-Pay Fraud & Token Hijacking',
    category: 'Mobile Security',
    readTime: '5 min read',
    date: 'Jun 01, 2025',
    author: 'Digital Payment Security Watch',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Apple Pay', 'Google Wallet', 'Tokenization', 'Card Provisioning'],
    heroImage: 'Mobile Wallet Tap Payment',
    description: 'Scammers trick credit card holders into sharing SMS verification codes needed to add stolen card numbers onto rogue Apple Pay or Google Wallet devices.',
    howItWorks: [
      'Scammers buy stolen credit card numbers online.',
      'They attempt to add the card to Apple Pay on their own device.',
      'The bank sends an SMS verification code to the real cardholder\'s phone.',
      'The scammer calls or texts the cardholder posing as bank fraud prevention, asking for the code to "cancel an unauthorized charge".',
      'Once entered, the scammer\'s Apple Pay is authorized to make unlimited tap-to-pay purchases.'
    ],
    warningSigns: [
      'Receiving SMS verification codes for Apple Pay or Google Wallet when you aren\'t setting up a device.',
      'Callers asking for verification codes to "stop" a card activation.',
      'Unfamiliar contactless charges appearing on credit card statements.'
    ],
    preventionTips: [
      'NEVER share card provisioning verification codes over the phone.',
      'Read SMS verification messages carefully—they state clearly what action the code authorizes.',
      'Call your bank immediately if you receive unexpected card wallet setup alerts.'
    ],
    realExample: {
      title: 'Apple Pay Provisioning Fraud Ring',
      description: 'A fraud syndicate added 30 stolen credit cards to Apple Pay by tricking cardholders into revealing SMS activation codes during spoofed phone calls.'
    },
    faqs: [
      { question: 'Why do scammers want cards on Apple Pay?', answer: 'Apple Pay transactions bypass physical card chip requirements and allow high-value contactless in-store shopping sprees.' }
    ],
    relatedIds: ['payments-scam-2', 'mobile-scam-1']
  },
  {
    id: 'mobile-scam-12',
    title: 'Rogue Keyboard Extensions & Keylogger Surveillance',
    category: 'Mobile Security',
    readTime: '5 min read',
    date: 'Jun 14, 2025',
    author: 'Mobile Input Security Team',
    severity: 'High',
    difficultyLevel: 'Intermediate',
    tags: ['Keyboard Extension', 'Keylogger', 'Input Theft', 'Password Capture'],
    heroImage: 'Mobile Keyboard Display',
    description: 'Third-party custom keyboard apps request "Full Access" permissions to log every keypress, recording passwords, credit card numbers, and private messages.',
    howItWorks: [
      'You download a fun custom theme or GIF keyboard app from an app store.',
      'During setup, the app requests "Allow Full Access" in system keyboard settings.',
      'The custom keyboard logs every keystroke typed across all applications.',
      'Logged text (including banking passwords and SSNs) is transmitted to remote servers.'
    ],
    warningSigns: [
      'Keyboard apps demanding "Full Access" or internet permissions to function.',
      'Unusual delays or lagging when typing text on your phone touchscreen.',
      'Keyboards that send network traffic in background battery audits.'
    ],
    preventionTips: [
      'Stick to default system keyboards (iOS Keyboard, Gboard, SwiftKey).',
      'Never grant "Full Access" permissions to unverified third-party keyboard extensions.',
      'Ensure secure password fields trigger the OS system password manager rather than custom keyboards.'
    ],
    realExample: {
      title: 'Emoji Keyboard Keylogger Discovery',
      description: 'A popular third-party emoji keyboard with 500,000 downloads was found exfiltrating user keystrokes and credit card numbers to an unencrypted server.'
    },
    faqs: [
      { question: 'What does "Full Access" mean for iOS keyboard extensions?', answer: 'Full Access allows the keyboard extension to access network data and transmit typed keys outside the device.' }
    ],
    relatedIds: ['mobile-scam-2', 'banking-scam-7']
  },
  {
    id: 'mobile-scam-13',
    title: 'Push Notification Spam & Calendar Phishing Invasions',
    category: 'Mobile Security',
    readTime: '4 min read',
    date: 'Jul 01, 2025',
    author: 'Browser & OS Hygiene Group',
    severity: 'Low',
    difficultyLevel: 'Beginner',
    tags: ['Calendar Spam', 'Notification Spam', 'Browser Spam', 'Scareware'],
    heroImage: 'Mobile Notification Screen',
    description: 'Deceptive websites trick users into allowing web push notifications or subscribing to spam calendar feeds that flood lockscreens with virus alerts.',
    howItWorks: [
      'A website prompts: "Click Allow to verify you are not a robot".',
      'Clicking "Allow" grants the website permission to send push notifications.',
      'Your phone lockscreen is flooded with endless pop-ups: "Your iPhone has 5 viruses! Click here to clean!".',
      'Or a malicious script injects daily spam events into your native Calendar app.'
    ],
    warningSigns: [
      'Endless lockscreen notifications claiming virus infections or prize winnings.',
      'Surprise calendar events filling your schedule with spam links.',
      'Websites demanding notification permissions before displaying content.'
    ],
    preventionTips: [
      'Always deny push notification permission prompts on unfamiliar websites.',
      'Remove unwanted calendar subscriptions in Settings > Calendar > Accounts.',
      'Reset browser site settings if push notifications persist.'
    ],
    realExample: {
      title: 'iCloud Calendar Invite Infiltration',
      description: 'A user\'s calendar was filled with 50 daily events stating "Your iPhone is Unprotected!" after clicking an invite link on a streaming site.'
    },
    faqs: [
      { question: 'How do I remove spam calendar invites on iPhone?', answer: 'Go to Settings > Calendar > Accounts > Subscribed Calendars and delete the unrecognized calendar feed.' }
    ],
    relatedIds: ['mobile-scam-7', 'mobile-scam-1']
  },
  {
    id: 'mobile-scam-14',
    title: 'Mobile Device Management (MDM) Profile Exploitation',
    category: 'Mobile Security',
    readTime: '6 min read',
    date: 'Jul 15, 2025',
    author: 'Enterprise Mobile Security Audit',
    severity: 'Critical',
    difficultyLevel: 'Advanced',
    tags: ['MDM', 'Configuration Profile', 'Enterprise iOS', 'Remote Control'],
    heroImage: 'Enterprise Device Management',
    description: 'Attackers trick victims into installing malicious Mobile Device Management (MDM) configuration profiles that grant full remote control over iOS/Android settings.',
    howItWorks: [
      'A website offers "Free Paid App Access" or "VIP Beta Testing".',
      'It prompts you to download and install a custom iOS "Configuration Profile" in settings.',
      'The profile grants an external server MDM administrator control over your device.',
      'Attackers can silently install rogue apps, intercept web traffic, or wipe the device remotely.'
    ],
    warningSigns: [
      'Websites asking you to install "Configuration Profiles" or "MDM Profiles".',
      'System alerts stating "This profile will allow remote management of your iPhone".',
      'Unusual VPN icons or proxy configurations appearing in system settings.'
    ],
    preventionTips: [
      'NEVER install configuration profiles from unknown websites.',
      'Only install MDM profiles provided directly by your official corporate IT department.',
      'Audit Settings > General > VPN & Device Management regularly.'
    ],
    realExample: {
      title: 'Fake Gaming Beta MDM Hijack',
      description: 'Gamers installed an MDM profile to access an unreleased game. The profile redirected all web traffic through a hacker proxy, capturing banking credentials.'
    },
    faqs: [
      { question: 'Where can I see installed configuration profiles on iPhone?', answer: 'Check Settings > General > VPN & Device Management to view and remove unauthorized profiles.' }
    ],
    relatedIds: ['mobile-scam-2', 'mobile-scam-3']
  },
  {
    id: 'mobile-scam-15',
    title: 'Cellular Tower Spoofing & IMSI Catcher Interception (Stingrays)',
    category: 'Mobile Security',
    readTime: '7 min read',
    date: 'Aug 01, 2025',
    author: 'Cellular Protocol Research Lab',
    severity: 'High',
    difficultyLevel: 'Advanced',
    tags: ['IMSI Catcher', 'Stingray', '2G Downgrade', 'Cellular Intercept'],
    heroImage: 'Cellular Network Tower',
    description: 'Rogue cellular transmitters (Stingrays) force nearby mobile phones to downgrade to unencrypted 2G protocols, capturing calls, SMS texts, and location coordinates.',
    howItWorks: [
      'Rogue actors operate portable IMSI catcher radio hardware in a vehicle.',
      'The device broadcasts a signal mimicking a legitimate mobile cell tower at maximum power.',
      'Nearby phones automatically disconnect from real towers and connect to the Stingray.',
      'The Stingray forces a downgrade to 2G, disabling encryption and intercepting SMS messages and calls.'
    ],
    warningSigns: [
      'Smartphone suddenly dropping from 5G/LTE down to 2G or "E" (Edge) in a modern urban area.',
      'Unexplained drop in call quality accompanied by rapid battery depletion.',
      'Inability to establish encrypted data connections.'
    ],
    preventionTips: [
      'Disable 2G network support in phone cellular settings if supported by your carrier.',
      'Use end-to-end encrypted messaging applications (Signal, WhatsApp) for all communications.',
      'Utilize encrypted voice calls over Wi-Fi/cellular data rather than unencrypted cellular voice.'
    ],
    realExample: {
      title: 'Downtown IMSI Catcher Smishing Attack',
      description: 'Criminals drove through downtown streets with an IMSI catcher, forcing thousands of nearby phones onto 2G and blasting untraceable phishing texts.'
    },
    faqs: [
      { question: 'How can I turn off 2G on my Android phone?', answer: 'Go to Settings > Network & Internet > SIMs and toggle off "Allow 2G".' }
    ],
    relatedIds: ['mobile-scam-1', 'banking-scam-5']
  }
];
