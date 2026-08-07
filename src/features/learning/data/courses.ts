export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  fallbackVideoUrl?: string;
  duration: string;
  notes: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  modulesCount: number;
  description: string;
  thumbnail: string;
  instructor: string;
  videoUrl?: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  isContinueLearning?: boolean;
  progress?: number;
}

export const courses: Course[] = [
  {
    id: 'cyber-awareness',
    title: 'Cyber Awareness Masterclass',
    category: 'Security',
    duration: '1 hr 05 min',
    modulesCount: 6,
    description: 'Learn fundamental concepts of cybersecurity, threat landscapes, and how to protect your digital identity against modern cyber attacks.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Security Lab',
    videoUrl: 'https://www.youtube-nocookie.com/embed/sdpxddDzXfE',
    lessons: [
      {
        id: 'cyber-awareness-0',
        title: 'Introduction to Cyber Threats',
        duration: '10:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/sdpxddDzXfE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/bPVaOlJ6LN0',
        description: 'Overview of the modern digital threat landscape, attack surfaces, and why defensive awareness is essential.',
        notes: '• Cybersecurity safeguards systems, networks, and confidential data from digital adversaries.\n• Over 85% of security breaches involve human interaction or credential theft.\n• Maintain a verification-first mindset before opening links, attachments, or entering credentials.'
      },
      {
        id: 'cyber-awareness-1',
        title: 'Understanding Social Engineering',
        duration: '12:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/1b7X8A6-3uY',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/hXSFdwIOfnE',
        description: 'Deep dive into how attackers use psychological manipulation, urgency, and fear to breach human defenses.',
        notes: '• Social engineering targets human psychology rather than software vulnerabilities.\n• Common tactics: Phishing, Pretexting, Baiting, Quid Pro Quo, and Impersonation.\n• Never bypass established protocol or security controls due to high-pressure demands.'
      },
      {
        id: 'cyber-awareness-2',
        title: 'Identifying Malware and Ransomware',
        duration: '11:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/0S_O17f41jI',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/_2f928z15x0',
        description: 'Learn how trojans, spyware, and extortionate ransomware infect devices and encrypt critical data.',
        notes: '• Ransomware encrypts user files and demands cryptocurrency payments for decryption keys.\n• Prevention: Avoid untrusted downloads, keep OS updated, and maintain offline 3-2-1 backups.\n• Paying ransoms does not guarantee data recovery and funds criminal networks.'
      },
      {
        id: 'cyber-awareness-3',
        title: 'Securing Your Digital Identity',
        duration: '09:45',
        videoUrl: 'https://www.youtube-nocookie.com/embed/bPVaOlJ6LN0',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
        description: 'Best practices for safeguarding personal accounts, credentials, and minimizing digital footprints.',
        notes: '• Digital identity includes online credentials, PII (Personally Identifiable Information), and metadata.\n• Never reuse passwords across critical accounts.\n• Periodically audit connected apps and revoke unneeded OAuth permissions.'
      },
      {
        id: 'cyber-awareness-4',
        title: 'Multi-Factor Authentication & Cyber Hygiene',
        duration: '11:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/431A4mI8m2c',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
        description: 'Master Multi-Factor Authentication (MFA), authenticator apps, passkeys, and routine safety checks.',
        notes: '• MFA adds a secondary barrier requiring something you know and something you have.\n• App-based authenticators and FIDO2 passkeys are far safer than SMS OTPs.\n• Enable MFA on primary email, financial portals, and social media accounts immediately.'
      },
      {
        id: 'cyber-awareness-5',
        title: 'Phishing & Email Threat Detection',
        duration: '10:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/L5x3m1A0gT8',
        description: 'Recognizing malicious email headers, domain spoofing, and dangerous embedded attachments.',
        notes: '• Inspect raw email headers when sender authenticity is questionable.\n• Look for subtle domain typosquatting in incoming financial emails.\n• Utilize email sandboxing and report suspicious messages to security operations.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the primary objective of social engineering attacks?',
        options: [
          'To damage physical hardware',
          'To manipulate individuals into exposing confidential information',
          'To speed up network bandwidth',
          'To automatically install anti-virus software'
        ],
        correctAnswerIndex: 1
      },
      {
        id: 'q2',
        question: 'Which authentication method provides the highest defense against phishing?',
        options: [
          'Standard SMS OTP',
          'Hardware Security Key / FIDO2 Passkey',
          'Mother\'s maiden name answer',
          '4-digit static PIN'
        ],
        correctAnswerIndex: 1
      },
      {
        id: 'q3',
        question: 'What does the 3-2-1 backup strategy specify for ransomware protection?',
        options: [
          '3 passwords, 2 emails, 1 computer',
          '3 copies of data, on 2 different media types, with 1 copy stored offsite/offline',
          '3 anti-virus apps, 2 firewalls, 1 router',
          '3 daily scans, 2 weekly reboots, 1 monthly report'
        ],
        correctAnswerIndex: 1
      }
    ],
    isContinueLearning: true,
    progress: 40
  },
  {
    id: 'beginner-guide',
    title: 'Internet Safety for Beginners',
    category: 'Basics',
    duration: '55 min',
    modulesCount: 6,
    description: 'Essential rules for browsing safely, spotting fake websites, managing passwords, and avoiding online traps.',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Safety Team',
    videoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
    lessons: [
      {
        id: 'beginner-guide-0',
        title: 'Safe Browsing Habits & Protocols',
        duration: '09:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/sdpxddDzXfE',
        description: 'Fundamentals of secure web connections, HTTPS encryption, and safe search habits.',
        notes: '• HTTPS encrypts data in transit between your browser and the website server.\n• Always verify the padlock icon in the URL bar when entering personal details.\n• Avoid clicking on deceptive pop-up banner ads offering free prizes or software.'
      },
      {
        id: 'beginner-guide-1',
        title: 'How to Spot a Fake Website',
        duration: '10:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/z5nc9MDbv0A',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/L5x3m1A0gT8',
        description: 'Detecting lookalike domain names, typosquatting, and fraudulent login pages.',
        notes: '• Scammers create fake sites with subtle domain typos (e.g., paypa1.com vs paypal.com).\n• Always inspect the domain extension carefully before entering credentials.\n• Bookmark official banking and shopping portals to bypass search engine ad spoofing.'
      },
      {
        id: 'beginner-guide-2',
        title: 'Basic Email Security & Phishing Defense',
        duration: '08:45',
        videoUrl: 'https://www.youtube-nocookie.com/embed/L5x3m1A0gT8',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
        description: 'Spotting suspicious emails, deceptive sender addresses, and malicious attachments.',
        notes: '• Inspect the actual email header address, not just the displayed sender name.\n• Hover cursor over embedded links to preview the destination URL before clicking.\n• Never download unexpected attachments (.exe, .zip, .macro-enabled docs).'
      },
      {
        id: 'beginner-guide-3',
        title: 'Creating & Managing Passwords Safely',
        duration: '08:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/L9X8n5u3u9M',
        description: 'Building memorable passphrases and using password vaults to eliminate credential reuse.',
        notes: '• Combine 4+ random words into a passphrase (e.g., "purple-cactus-orbit-dance").\n• Never reuse the same password across multiple online platforms.\n• Use an encrypted password manager to generate and auto-fill credentials safely.'
      },
      {
        id: 'beginner-guide-4',
        title: 'Public Wi-Fi Risks & Protection',
        duration: '08:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/66S1O-vPms0',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/S8fXf92x3_8',
        description: 'Understanding man-in-the-middle attacks on public networks and using VPN protection.',
        notes: '• Unencrypted public Wi-Fi in cafes or airports allows traffic eavesdropping.\n• Always connect through a trusted Virtual Private Network (VPN) on public Wi-Fi.\n• Disable auto-connect for open wireless networks on mobile devices.'
      },
      {
        id: 'beginner-guide-5',
        title: 'Understanding Malware and Viruses',
        duration: '09:40',
        videoUrl: 'https://www.youtube-nocookie.com/embed/u018AAnCj-8',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/0S_O17f41jI',
        description: 'Learn how viruses, keyloggers, and spyware operate and how to keep operating systems protected.',
        notes: '• Install automatic security patches to patch newly discovered system vulnerabilities.\n• Enable built-in real-time anti-malware scanning (e.g., Windows Defender, XProtect).\n• Never download software from third-party mirrors or cracked torrent portals.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What does HTTPS indicate when visible in your browser address bar?',
        options: [
          'The website is running on a supercomputer',
          'The connection between your device and the site is encrypted',
          'The website cannot be taken offline',
          'The company is registered in the United States'
        ],
        correctAnswerIndex: 1
      },
      {
        id: 'q2',
        question: 'What is "typosquatting"?',
        options: [
          'Typing very fast on a keyboard',
          'Registering misspelled domains mimicking popular brands to scam users',
          'A computer virus that deletes text files',
          'An automatic spell checker tool'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'senior-citizen-guide',
    title: 'Senior Citizen Digital Safety Guide',
    category: 'Demographic',
    duration: '1 hr 25 min',
    modulesCount: 6,
    description: 'A gentle, step-by-step guide tailored for older adults to navigate digital services safely and protect retirement funds.',
    thumbnail: 'https://images.unsplash.com/photo-1581579438747-1dc8d1e292c9?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Community Support',
    videoUrl: 'https://www.youtube-nocookie.com/embed/z5nc9MDbv0A',
    lessons: [
      {
        id: 'senior-citizen-guide-0',
        title: 'Recognizing Scams Targeting Seniors',
        duration: '14:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/z5nc9MDbv0A',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/sdpxddDzXfE',
        description: 'Identifying government impersonators, fake lottery winnings, and artificial emergency calls.',
        notes: '• Government agencies (IRS, SSA, Police) NEVER demand instant wire transfers or gift cards.\n• Scammers rely on artificial urgency to prevent you from calling family or advisors.\n• Take a deep breath and verify independently before sending money to anyone.'
      },
      {
        id: 'senior-citizen-guide-1',
        title: 'Handling Tech Support Fraud',
        duration: '15:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/dK9C2vI-R4I',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/z5nc9MDbv0A',
        description: 'How pop-up screen locks and phone callers trick users into installing remote access software.',
        notes: '• Microsoft, Apple, or anti-virus companies will NEVER call you uninvited about errors.\n• Never allow unexpected phone callers to install remote desktop tools (AnyDesk, TeamViewer).\n• If a red pop-up locks your screen, force shutdown your computer or close the browser.'
      },
      {
        id: 'senior-citizen-guide-2',
        title: 'Grandparent & Emergency Scam Defense',
        duration: '13:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/1b7X8A6-3uY',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/hXSFdwIOfnE',
        description: 'Detecting voice clones and distress calls claiming a family member needs bail money.',
        notes: '• Scammers impersonate distressed relatives claiming crash injuries or arrest.\n• Always hang up and dial your family member directly on their known phone number.\n• Establish a secret family passphrase to verify identity during alleged emergencies.'
      },
      {
        id: 'senior-citizen-guide-3',
        title: 'Safe Online Shopping & Payment Rules',
        duration: '12:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
        description: 'How to shop online securely, verify sellers, and utilize credit card fraud protections.',
        notes: '• Prefer credit cards over debit cards for online purchases due to federal chargeback protections.\n• Be wary of ads offering popular merchandise at absurdly low discounts.\n• Verify merchant reviews on independent consumer protection portals.'
      },
      {
        id: 'senior-citizen-guide-4',
        title: 'Protecting Your Phone from SMS Smishing',
        duration: '12:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/L5x3m1A0gT8',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
        description: 'Spotting text message scams regarding fake package deliveries or blocked bank accounts.',
        notes: '• Postal services do not send text messages demanding custom fees through shortened links.\n• Never click web links inside unsolicited text messages.\n• Forward spam messages to carrier number 7726 (SPAM) to report fraudulent senders.'
      },
      {
        id: 'senior-citizen-guide-5',
        title: 'Identity Theft Prevention for Seniors',
        duration: '11:45',
        videoUrl: 'https://www.youtube-nocookie.com/embed/bPVaOlJ6LN0',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
        description: 'Freezing credit reports with credit bureaus and preventing unauthorized loan applications.',
        notes: '• Place a free credit freeze at major credit bureaus (Equifax, Experian, TransUnion).\n• Shred physical bank statements and Medicare letters containing Social Security details.\n• Regularly inspect credit reports for unrecognized accounts or inquiries.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'If a caller claims to be from Microsoft technical support claiming your PC has viruses, what should you do?',
        options: [
          'Grant them remote desktop access immediately',
          'Buy gift cards to pay for clean-up software',
          'Hang up immediately',
          'Read them your credit card details over the phone'
        ],
        correctAnswerIndex: 2
      }
    ],
    isContinueLearning: true,
    progress: 60
  },
  {
    id: 'student-guide',
    title: 'Student Guide to Online Security',
    category: 'Demographic',
    duration: '55 min',
    modulesCount: 6,
    description: 'Avoid fake scholarship listings, remote job scams, and identity theft while living a connected campus life.',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Campus Team',
    videoUrl: 'https://www.youtube-nocookie.com/embed/bPVaOlJ6LN0',
    lessons: [
      {
        id: 'student-guide-0',
        title: 'Avoiding Scholarship & Financial Aid Scams',
        duration: '09:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/z5nc9MDbv0A',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/1b7X8A6-3uY',
        description: 'How to spot fraudulent grant offers demanding upfront application or processing fees.',
        notes: '• Legitimate scholarships NEVER demand processing or application fees.\n• Beware of guaranteed win promises or unsolicited grant award letters.\n• Apply exclusively through official university financial aid portals and verified directories.'
      },
      {
        id: 'student-guide-1',
        title: 'Protecting Identity on Campus & Shared Devices',
        duration: '09:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/66S1O-vPms0',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
        description: 'Logging out of lab terminals, securing dorm Wi-Fi routers, and locking device screens.',
        notes: '• Always log out completely from shared library or campus computer workstations.\n• Enable automatic screen locking after 1–2 minutes of inactivity.\n• Never save personal passwords inside guest browser user profiles.'
      },
      {
        id: 'student-guide-2',
        title: 'Device Hardening & Mobile Hardware Protection',
        duration: '08:45',
        videoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/431A4mI8m2c',
        description: 'Safeguarding laptops and smartphones against physical theft and unauthorized access.',
        notes: '• Enable remote tracking ("Find My") and remote wipe features on all portable devices.\n• Enable full-disk encryption (BitLocker for Windows, FileVault for macOS).\n• Keep operating system updates set to automatic installation.'
      },
      {
        id: 'student-guide-3',
        title: 'Safe Online Job & Internship Searching',
        duration: '08:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/1b7X8A6-3uY',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/L5x3m1A0gT8',
        description: 'Recognizing fake employment offers that mail overpaid cheques or demand equipment payments.',
        notes: '• Watch for remote job offers sending fake cashier cheques to buy home office gear.\n• Legitimate employers conduct interviews via corporate video platforms, not anonymous chat apps.\n• Never pay for job application reviews or background checks upfront.'
      },
      {
        id: 'student-guide-4',
        title: 'Social Media Footprint & Privacy Management',
        duration: '09:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/hXSFdwIOfnE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/bPVaOlJ6LN0',
        description: 'Managing what you share to keep security question answers and personal whereabouts private.',
        notes: '• Details like high school names, pet names, and birth dates match standard security questions.\n• Restrict post visibility to confirmed personal friends.\n• Audit third-party web apps connected to your social media accounts.'
      },
      {
        id: 'student-guide-5',
        title: 'Passkeys and Passwordless Campus Access',
        duration: '10:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/K-1y3G3hO98',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/L9X8n5u3u9M',
        description: 'Modern cryptographic passkeys for university portals and personal Google/Apple accounts.',
        notes: '• Passkeys replace passwords with biometric cryptographic pairs.\n• Passkeys cannot be phished by fraudulent web forms.\n• Store passkeys safely in your device cloud keychain or security key.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which of the following is a key warning sign of a scholarship scam?',
        options: [
          'Requiring an academic essay',
          'Asking for an application fee upfront',
          'Requesting high school transcripts',
          'Requiring a recommendation letter'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'business-guide',
    title: 'Cybersecurity for Small Businesses',
    category: 'Business',
    duration: '1 hr 30 min',
    modulesCount: 6,
    description: 'Defend your enterprise against Business Email Compromise (BEC), ransomware, and unauthorized network breaches.',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Enterprise Defense',
    videoUrl: 'https://www.youtube-nocookie.com/embed/9wA-2w0U30k',
    lessons: [
      {
        id: 'business-guide-0',
        title: 'Understanding Business Email Compromise (BEC)',
        duration: '15:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/9wA-2w0U30k',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/1b7X8A6-3uY',
        description: 'How spoofed executive emails trick accounting teams into executing fraudulent wire transfers.',
        notes: '• BEC attacks impersonate C-level executives or trusted vendors to divert payments.\n• Require out-of-band phone confirmation for any change in vendor bank account details.\n• Implement SPF, DKIM, and DMARC email security protocols to stop domain spoofing.'
      },
      {
        id: 'business-guide-1',
        title: 'Building Employee Security Awareness',
        duration: '14:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/hXSFdwIOfnE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/1b7X8A6-3uY',
        description: 'Cultivating a security-first workforce with ongoing phishing drills and clear escalation paths.',
        notes: '• Employees represent the first line of defense against targeted social engineering.\n• Conduct regular, educational phishing simulation exercises.\n• Establish clear, non-punitive reporting mechanisms for accidental clicks.'
      },
      {
        id: 'business-guide-2',
        title: 'Ransomware Defense & Data Backup Strategies',
        duration: '15:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/0S_O17f41jI',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/_2f928z15x0',
        description: 'Implementing immutable backups, endpoint protection, and the 3-2-1 backup standard.',
        notes: '• Keep 3 copies of critical business data, on 2 distinct media types, with 1 offline/offsite copy.\n• Test backup recovery procedures quarterly under simulated emergency conditions.\n• Restrict administrative rights on staff workstations to limit malware execution.'
      },
      {
        id: 'business-guide-3',
        title: 'Incident Response & Crisis Management',
        duration: '16:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/3p8-S7oJ2R4',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/bPVaOlJ6LN0',
        description: 'Step-by-step containment protocol when a network breach or data exposure occurs.',
        notes: '• Disconnect compromised machines from network switches immediately to prevent lateral spread.\n• Preserve forensic logs and notify legal, insurance, and cyber incident responders.\n• Prepare communications templates for customer transparency and regulatory compliance.'
      },
      {
        id: 'business-guide-4',
        title: 'Zero Trust & Remote Workforce Security',
        duration: '14:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/L_R6a66T1n0',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/66S1O-vPms0',
        description: 'Enforcing Least Privilege access controls and encrypted VPN tunnels for distributed teams.',
        notes: '• Zero Trust Architecture operates on "Never trust, always verify" principles.\n• Enforce strict Multi-Factor Authentication across all enterprise SaaS tools.\n• Restrict employee access strictly to data required for their specific role.'
      },
      {
        id: 'business-guide-5',
        title: 'Network Security & Hardware Firewalls',
        duration: '15:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/sdpxddDzXfE',
        description: 'Securing corporate Wi-Fi networks, isolating guest VLANs, and configuring firewalls.',
        notes: '• Segment guest networks away from core business servers and point-of-sale systems.\n• Enable Next-Generation Firewall (NGFW) deep packet inspection.\n• Audit network entry points and disable legacy unencrypted protocols.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is Business Email Compromise (BEC)?',
        options: [
          'Unsolicited newsletter marketing emails',
          'When attackers hijack or spoof business email accounts to direct fraudulent bank transfers',
          'A corporate email server hardware failure',
          'An encrypted email service protocol'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'safe-banking',
    title: 'Safe Banking & Payment Security Guide',
    category: 'Finance',
    duration: '1 hr 00 min',
    modulesCount: 6,
    description: 'Master best practices for digital banking, mobile payment security, and recognizing spoofed bank notifications.',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Financial Security',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dK9C2vI-R4I',
    lessons: [
      {
        id: 'safe-banking-0',
        title: 'Securing Mobile & Online Banking Apps',
        duration: '10:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/dK9C2vI-R4I',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/sdpxddDzXfE',
        description: 'Essential security settings for official banking applications and login protection.',
        notes: '• Download banking applications exclusively from official Apple App Store or Google Play Store.\n• Enable biometric login (fingerprint/Face ID) paired with strong app passcodes.\n• Always manually log out after completing online banking sessions.'
      },
      {
        id: 'safe-banking-1',
        title: 'Recognizing Bank Phishing & Vishing Scams',
        duration: '11:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/L5x3m1A0gT8',
        description: 'How fraudsters spoof bank phone numbers and SMS messages to steal OTPs and PINs.',
        notes: '• Bank representatives will NEVER call demanding your One-Time Password (OTP) or PIN.\n• Phone number spoofing allows callers to display your bank\'s genuine customer service number.\n• Hang up and call the official support number on the back of your payment card.'
      },
      {
        id: 'safe-banking-2',
        title: 'Safe Online Card Transactions & Virtual Cards',
        duration: '09:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/431A4mI8m2c',
        description: 'Utilizing virtual card numbers, tokenization, and secure payment gateways.',
        notes: '• Tokenization replaces actual card numbers with secure encrypted tokens during checkout.\n• Use virtual cards with set spend limits for unfamiliar online merchants.\n• Never save debit card details on public or shared e-commerce accounts.'
      },
      {
        id: 'safe-banking-3',
        title: 'Configuring Account Alerts & Transaction Limits',
        duration: '09:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/431A4mI8m2c',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
        description: 'Setting up real-time SMS/push alerts and reducing daily debit card withdrawal limits.',
        notes: '• Turn on instant push/SMS alerts for all debit and credit card transactions.\n• Lower daily ATM withdrawal and online transaction limits via your mobile app.\n• Disable international transaction permissions if you do not travel abroad.'
      },
      {
        id: 'safe-banking-4',
        title: 'Emergency Recovery & Unauthorized Transfer Reporting',
        duration: '10:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/sdpxddDzXfE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/vG8N8zN0n20',
        description: 'Immediate action plan when fraudulent charges appear on your bank statements.',
        notes: '• Freeze payment cards immediately through your mobile banking application.\n• Notify bank fraud departments within 24 hours to enforce zero-liability protections.\n• File an official report with local law enforcement and national cybercrime portals.'
      },
      {
        id: 'safe-banking-5',
        title: 'ATM Skimming & Physical Banking Safety',
        duration: '09:45',
        videoUrl: 'https://www.youtube-nocookie.com/embed/z5nc9MDbv0A',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
        description: 'Detecting magnetic card skimmers, hidden pinhole cameras, and keypad overlays at ATMs.',
        notes: '• Inspect ATM card slots for loose or misaligned plastic attachments before inserting cards.\n• Shield the keypad with your hand when entering your PIN to block hidden camera recordings.\n• Prefer ATMs located inside well-lit bank branches rather than standalone outdoor kiosks.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Is it safe to check online banking balances over unencrypted public Wi-Fi without a VPN?',
        options: [
          'Yes, public Wi-Fi is completely safe',
          'Only if the Wi-Fi requires an email login',
          'No, unencrypted Wi-Fi allows attackers to intercept data',
          'Yes, if using a smartphone'
        ],
        correctAnswerIndex: 2
      }
    ]
  },
  {
    id: 'password-security',
    title: 'Password Security & Identity Management',
    category: 'Security',
    duration: '50 min',
    modulesCount: 6,
    description: 'Stop using weak passwords. Learn to generate unbreakable credentials and manage vaults effectively.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Identity Team',
    videoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
    lessons: [
      {
        id: 'password-security-0',
        title: 'Anatomy of an Unbreakable Password',
        duration: '08:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/ul_xmyUAtxY',
        description: 'Understanding password entropy, length advantages, and passphrase construction.',
        notes: '• Length contributes far more entropy than artificial character complexity.\n• Avoid personal identifiers like birth dates, names, or dictionary words.\n• Never reuse credentials across work and personal services.'
      },
      {
        id: 'password-security-1',
        title: 'How Password Managers Protect You',
        duration: '08:45',
        videoUrl: 'https://www.youtube-nocookie.com/embed/L9X8n5u3u9M',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
        description: 'Why encrypted password vaults defeat keyloggers and auto-fill phishing traps.',
        notes: '• Password managers auto-generate 20+ character random passwords for every account.\n• They protect against phishing because they refuse to auto-fill on lookalike fake domains.\n• Protect your master password passphrase with zero-knowledge local encryption.'
      },
      {
        id: 'password-security-2',
        title: 'Implementing Multi-Factor Authentication (MFA)',
        duration: '07:45',
        videoUrl: 'https://www.youtube-nocookie.com/embed/431A4mI8m2c',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/K-1y3G3hO98',
        description: 'Comparing SMS OTPs, Authenticator Apps, and FIDO2 Hardware Security Keys.',
        notes: '• App-based TOTP authenticators generate offline time-based codes unaffected by SIM-swaps.\n• Hardware security keys (YubiKey) offer cryptographic resistance against phishing.\n• Safely store offline backup recovery codes in a secure physical location.'
      },
      {
        id: 'password-security-3',
        title: 'Detecting Data Breaches & Credential Leaks',
        duration: '07:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/bPVaOlJ6LN0',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/sdpxddDzXfE',
        description: 'Monitoring if your email or passwords appeared in dark web database dumps.',
        notes: '• Use verified breach alert tools (e.g., HaveIBeenPwned) to track credential leaks.\n• When a service reports a breach, change passwords across all accounts immediately.\n• Enable dark web monitoring options built into reputable password managers.'
      },
      {
        id: 'password-security-4',
        title: 'Biometric Security & The Passkey Revolution',
        duration: '08:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/K-1y3G3hO98',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/431A4mI8m2c',
        description: 'The future of passwordless authentication using WebAuthn passkeys and biometrics.',
        notes: '• Passkeys replace passwords using public-key cryptography tied to device biometrics.\n• They are immune to phishing attacks because private keys never leave your local hardware.\n• Passkeys synchronize end-to-end encrypted across personal ecosystem devices.'
      },
      {
        id: 'password-security-5',
        title: 'How Hacking Passwords Works',
        duration: '09:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/ul_xmyUAtxY',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
        description: 'Understanding brute-force attacks, rainbow tables, credential stuffing, and salt hashing.',
        notes: '• Credential stuffing bots test leaked password pairs across millions of portals.\n• Modern salted hashes (Argon2, bcrypt) slow down GPU password cracking attempts.\n• Complex 16+ character passphrases require centuries to crack using current technology.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What factor contributes most significantly to password strength against brute-force attacks?',
        options: [
          'Using exactly 8 characters',
          'Password length and randomness',
          'Using dictionary words spelled backwards',
          'Changing it every 3 days to simple variants'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'upi-safety',
    title: 'Digital Payment & UPI Safety Protocol',
    category: 'Payments',
    duration: '45 min',
    modulesCount: 6,
    description: 'Master golden rules of digital payments, QR code safety, and handling collect requests securely.',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a670f4a45e1?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Payment Systems',
    videoUrl: 'https://www.youtube-nocookie.com/embed/vG8N8zN0n20',
    lessons: [
      {
        id: 'upi-safety-0',
        title: 'Golden Rule of UPI: Send vs Receive',
        duration: '07:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/vG8N8zN0n20',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
        description: 'The single most critical payment rule: UPI PIN is ONLY entered to send/debit money.',
        notes: '• Entering your UPI PIN ALWAYS debits money from your bank account.\n• You NEVER need to enter a PIN or scan a QR code to RECEIVE money.\n• If someone claims you must enter your PIN to claim a prize or refund, it is a scam.'
      },
      {
        id: 'upi-safety-1',
        title: 'Identifying Fake Collect Requests & QR Scams',
        duration: '07:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/vG8N8zN0n20',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
        description: 'How fraudsters send unsolicited "Collect Money" requests disguised as refunds.',
        notes: '• Immediately decline unexpected "Collect Requests" on Google Pay, PhonePe, or Paytm.\n• Scanning a QR code sends money out; it does not receive cash.\n• Never scan a QR code sent via WhatsApp or email to receive a buyer\'s payment.'
      },
      {
        id: 'upi-safety-2',
        title: 'Protecting UPI PINs, OTPs, and App Locks',
        duration: '06:45',
        videoUrl: 'https://www.youtube-nocookie.com/embed/431A4mI8m2c',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
        description: 'Preventing shoulder surfing, keeping payment PINs secret, and setting app locks.',
        notes: '• Never reveal your UPI PIN or OTP to anyone, including bank representatives or buyers.\n• Do not use predictable PINs like birth years or 1111/1234.\n• Set biometric or passcode locks on all payment applications.'
      },
      {
        id: 'upi-safety-3',
        title: 'Verifying Merchant VPA Addresses & Payee Names',
        duration: '06:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/vG8N8zN0n20',
        description: 'Checking payee names and Virtual Payment Addresses (VPAs) before sending funds.',
        notes: '• Always verify the actual account holder name displayed on the confirmation screen.\n• Verify merchant verification badges on payment portals.\n• Confirm VPA addresses carefully when making high-value transfers.'
      },
      {
        id: 'upi-safety-4',
        title: 'Immediate Reporting Protocol for Payment Fraud',
        duration: '07:15',
        videoUrl: 'https://www.youtube-nocookie.com/embed/sdpxddDzXfE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/vG8N8zN0n20',
        description: 'How to file disputes with NPCI, payment apps, and cybercrime authorities within 1 hour.',
        notes: '• Flag fraudulent transactions inside the payment application immediately.\n• Block the scammer\'s phone number and VPA address.\n• File an official dispute ticket with NPCI and report to national cybercrime authorities.'
      },
      {
        id: 'upi-safety-5',
        title: 'Cyber Crime Helpline 1930 & Dispute Filing',
        duration: '08:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/z5nc9MDbv0A',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/3p8-S7oJ2R4',
        description: 'Emergency reporting channels for financial cybercrime and blocking compromised bank accounts.',
        notes: '• Call national cyber crime helpline 1930 immediately after noticing financial fraud.\n• Reporting within the "golden hour" increases chances of freezing stolen money before cash-out.\n• Save transaction IDs, screenshots, and bank UTR numbers for official reports.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Do you need to enter your UPI PIN to receive money into your bank account?',
        options: [
          'Yes, always',
          'No, UPI PIN is ONLY required to send money or check balance',
          'Only for transactions over $100',
          'Only if the sender demands it'
        ],
        correctAnswerIndex: 1
      },
      {
        id: 'q2',
        question: 'What should you do if an unknown user sends a "Collect Request" on a payment app?',
        options: [
          'Enter your PIN to check the amount',
          'Decline the request and block the sender',
          'Accept it if it looks small',
          'Forward it to a friend'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'social-media',
    title: 'Social Media Safety & Privacy Masterclass',
    category: 'Social',
    duration: '1 hr 00 min',
    modulesCount: 6,
    description: 'Protect your digital footprint, configure privacy controls, and recognize romance scams and impersonators.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Social Intelligence',
    videoUrl: 'https://www.youtube-nocookie.com/embed/hXSFdwIOfnE',
    lessons: [
      {
        id: 'social-media-0',
        title: 'Audit & Tighten Social Media Privacy Controls',
        duration: '10:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/hXSFdwIOfnE',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/bPVaOlJ6LN0',
        description: 'Step-by-step privacy configuration for Instagram, Facebook, and LinkedIn.',
        notes: '• Set profile visibility to "Private" or "Friends Only" to prevent OSINT scrapers.\n• Prevent search engines from indexing your personal profile page.\n• Disable precise location tagging on photos and status updates.'
      },
      {
        id: 'social-media-1',
        title: 'Detecting Impersonators & Romance Scams',
        duration: '10:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/L5x3m1A0gT8',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/1b7X8A6-3uY',
        description: 'How fraudsters build fake relationships to solicit money or fake crypto investments.',
        notes: '• Romance scammers avoid live video calls or in-person meetings with elaborate excuses.\n• Never send money, gift cards, or crypto to someone met exclusively online.\n• Conduct reverse image searches on profile photos to identify stolen modeling pictures.'
      },
      {
        id: 'social-media-2',
        title: 'Avoiding Oversharing & OSINT Exploits',
        duration: '09:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/bPVaOlJ6LN0',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/hXSFdwIOfnE',
        description: 'How open-source intelligence gathering harvests personal posts to guess security questions.',
        notes: '• Avoid viral quizzes that ask for your first pet, mother\'s maiden name, or first car.\n• Do not post photos of boarding passes, house keys, or driver\'s licenses containing barcodes.\n• Be mindful of visible address numbers or badges in background scenery.'
      },
      {
        id: 'social-media-3',
        title: 'Protecting Accounts from Hijacking & Cloning',
        duration: '10:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/431A4mI8m2c',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/yr_mD5q5d5k',
        description: 'How cloned profiles copy your photos to solicit emergency funds from your friend list.',
        notes: '• Hide your friend/follower list from public view to prevent cloned account targeting.\n• If a friend sends a message asking for urgent money or gift cards, verify via phone call.\n• Enable two-factor authentication and login alerts on all social profiles.'
      },
      {
        id: 'social-media-4',
        title: 'Spotting Malicious Ads & Fake Giveaways',
        duration: '10:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/1b7X8A6-3uY',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
        description: 'Identifying rogue sponsored ads promoting fake celebrity crypto giveaways or malware apps.',
        notes: '• Sponsored ads on social platforms are not automatically vetted for security.\n• Check verification badges, domain URLs, and page creation dates before clicking.\n• Never enter login credentials or credit card info on sites linked from social ads.'
      },
      {
        id: 'social-media-5',
        title: 'Digital Identity & Footprint Cleanup',
        duration: '09:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
        fallbackVideoUrl: 'https://www.youtube-nocookie.com/embed/L9X8n5u3u9M',
        description: 'How to request data deletion, remove old inactive accounts, and manage online privacy.',
        notes: '• Delete unused old accounts on forgotten forums and social media platforms.\n• Submit opt-out data broker deletion requests to stop public people-search listings.\n• Regularly audit third-party apps with access to your social media accounts.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why is oversharing personal details (like pet names and school names) dangerous on social media?',
        options: [
          'It uses too much internet bandwidth',
          'It provides attackers with answers to your account recovery security questions',
          'It violates basic terms of service',
          'It slows down your smartphone'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'identity-theft',
    title: 'Identity Theft & Biometric Protection',
    category: 'Identity',
    duration: '1 hr 10 min',
    modulesCount: 5,
    description: 'Safeguard your Social Security details, national ID documents, and biometric records from identity fraud rings.',
    thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Identity Defense',
    videoUrl: 'https://www.youtube-nocookie.com/embed/K-1y3G3hO98',
    lessons: [
      {
        id: 'identity-theft-0',
        title: 'Understanding Identity Theft Vectors',
        duration: '12:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/K-1y3G3hO98',
        description: 'How identity thieves harvest SSNs, tax records, and utility bills to open synthetic bank lines.',
        notes: '• Synthetic identity fraud combines real and fake credentials to forge new credit profiles.\n• Freeze credit files with Experian, Equifax, and TransUnion to block fraudulent accounts.'
      },
      {
        id: 'identity-theft-1',
        title: 'Biometric Security & Fingerprint Protection',
        duration: '11:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/ul_xmyUAtxY',
        description: 'Securing facial recognition data and fingerprint authenticators against spoofing.',
        notes: '• Biometric templates are stored securely inside device hardware Secure Enclaves.\n• Use Liveness Detection features when enrolling in digital KYC identity portals.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the most effective measure to prevent unauthorized loans opened in your name?',
        options: [
          'Deleting your email app',
          'Placing a free credit freeze at major credit bureaus',
          'Changing your phone ringtone',
          'Buying a new laptop'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'email-phishing',
    title: 'Email Phishing & Spoofing Defense',
    category: 'Security',
    duration: '50 min',
    modulesCount: 5,
    description: 'Master header analysis, domain verification, and sandboxing to defeat dangerous email attacks.',
    thumbnail: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Threat Research',
    videoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
    lessons: [
      {
        id: 'email-phishing-0',
        title: 'Analyzing Raw Email Headers & Typosquatting',
        duration: '10:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE',
        description: 'Decoding Return-Path headers and DKIM signatures to spot fake corporate emails.',
        notes: '• Always check the actual sending domain in raw message headers.\n• Look for homograph attacks where Cyrillic letters mimic Latin letters.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Where can you confirm the authentic sender domain of a suspicious email?',
        options: [
          'The font color of the subject line',
          'Raw RFC822 message headers (Return-Path and DKIM)',
          'The length of the email text',
          'The signature image graphic'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'mobile-security',
    title: 'Mobile Device & Smartphone Security',
    category: 'Basics',
    duration: '45 min',
    modulesCount: 5,
    description: 'Harden iOS and Android smartphones against malicious apps, sideloading threats, and rogue chargers.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Mobile Lab',
    videoUrl: 'https://www.youtube-nocookie.com/embed/L5x3m1A0gT8',
    lessons: [
      {
        id: 'mobile-security-0',
        title: 'Managing App Permissions & Juice Jacking',
        duration: '09:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/L5x3m1A0gT8',
        description: 'Revoking intrusive background camera/mic permissions and using USB data blockers.',
        notes: '• Audit app permission manager periodically to restrict microphone and location access.\n• Use USB data blockers ("USB condoms") when charging phones at public airport stations.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What device protects your phone from data theft when plugging into public USB charging ports?',
        options: [
          'A screen protector',
          'A USB data blocker (charge-only adapter)',
          'A phone case',
          'A bluetooth earbud'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'bec-defense',
    title: 'Business Email Compromise (BEC) Masterclass',
    category: 'Business',
    duration: '1 hr 15 min',
    modulesCount: 5,
    description: 'Stop executive impersonation, wire transfer fraud, and invoice manipulation in corporate environments.',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Corporate Risk',
    videoUrl: 'https://www.youtube-nocookie.com/embed/9wA-2w0U30k',
    lessons: [
      {
        id: 'bec-defense-0',
        title: 'Dual Control Protocol for Wire Payments',
        duration: '12:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/9wA-2w0U30k',
        description: 'Mandating two-person authorization for wire transfers above $1,000.',
        notes: '• Never execute urgent wire transfer requests received exclusively via email.\n• Establish mandatory voice callback verification on trusted pre-recorded phone lines.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What protocol best prevents executive impersonation wire fraud?',
        options: [
          'Sending a quick reply asking "Is this real?"',
          'Mandatory out-of-band voice verification and dual authorization',
          'Ignoring the wire request for 2 weeks',
          'Paying via gift cards'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'ransomware-protection',
    title: 'Ransomware Protection & Backup Masterclass',
    category: 'Security',
    duration: '1 hr 10 min',
    modulesCount: 5,
    description: 'Defend workstations against data encryption extortion, C2 malware beacons, and catastrophic data loss.',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Incident Response',
    videoUrl: 'https://www.youtube-nocookie.com/embed/0S_O17f41jI',
    lessons: [
      {
        id: 'ransomware-protection-0',
        title: 'Immutable Backups & Endpoint Isolation',
        duration: '11:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/0S_O17f41jI',
        description: 'Configuring WORM (Write Once Read Many) cloud backups and network isolation.',
        notes: '• Air-gapped and immutable cloud backups prevent ransomware from encrypting restore points.\n• Isolate infected endpoints from network switches immediately upon anomaly detection.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why are immutable air-gapped backups critical for ransomware defense?',
        options: [
          'They compress files to save disk space',
          'Ransomware malware cannot alter or delete immutable offline restore points',
          'They speed up internet connection speeds',
          'They convert all files into PDF format'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'data-privacy',
    title: 'Data Privacy & Encryption Rules',
    category: 'Basics',
    duration: '50 min',
    modulesCount: 5,
    description: 'Learn end-to-end encryption principles, GDPR/CCPA consumer rights, and zero-knowledge data storage.',
    thumbnail: 'https://images.unsplash.com/photo-1526374870839-e155464bb9b2?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Privacy Lab',
    videoUrl: 'https://www.youtube-nocookie.com/embed/u018AAnCj-8',
    lessons: [
      {
        id: 'data-privacy-0',
        title: 'End-to-End Encryption & Key Management',
        duration: '10:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/u018AAnCj-8',
        description: 'Understanding AES-256 encryption at rest and TLS 1.3 encryption in transit.',
        notes: '• Zero-knowledge encryption ensures cloud providers cannot read your stored documents.\n• Always verify public key fingerprints when initializing secure messaging channels.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What does zero-knowledge encryption guarantee?',
        options: [
          'The cloud provider holds all master decryption keys',
          'Only the data owner possesses the private decryption key',
          'Data is stored unencrypted in public folders',
          'Files are automatically deleted every 24 hours'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'two-factor-auth',
    title: '2FA, MFA & Passkey Authentication',
    category: 'Security',
    duration: '40 min',
    modulesCount: 5,
    description: 'Upgrade account security beyond standard passwords using TOTP authenticator apps and passkeys.',
    thumbnail: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Identity Team',
    videoUrl: 'https://www.youtube-nocookie.com/embed/431A4mI8m2c',
    lessons: [
      {
        id: 'two-factor-auth-0',
        title: 'Phishing-Resistant WebAuthn Passkeys',
        duration: '09:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/431A4mI8m2c',
        description: 'How public-key cryptographic passkeys eliminate password interception.',
        notes: '• Passkeys bind authentication strictly to the verified origin domain name.\n• Authenticator apps like Google Authenticator or Bitwarden generate 30-second TOTP codes.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why are passkeys immune to phishing websites?',
        options: [
          'Passkeys require typing a 30-character password',
          'Passkeys cryptographically verify the website domain origin before signing in',
          'Passkeys only work during daylight hours',
          'Passkeys require sending SMS text messages'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'wifi-security',
    title: 'Wi-Fi & Public Network Security',
    category: 'Basics',
    duration: '45 min',
    modulesCount: 5,
    description: 'Protect internet traffic from rogue access points, Evil Twin APs, and public Wi-Fi sniffing.',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Network Operations',
    videoUrl: 'https://www.youtube-nocookie.com/embed/66S1O-vPms0',
    lessons: [
      {
        id: 'wifi-security-0',
        title: 'Spotting Evil Twin Hotspots & Enforcing VPNs',
        duration: '09:30',
        videoUrl: 'https://www.youtube-nocookie.com/embed/66S1O-vPms0',
        description: 'How open Wi-Fi networks in airports or cafes intercept unencrypted web traffic.',
        notes: '• Always tunnel public Wi-Fi internet connections through a trusted WireGuard or OpenVPN tunnel.\n• Disable "Auto-Join Open Networks" in mobile Wi-Fi settings.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What tool encrypts your internet traffic when connecting to open public Wi-Fi?',
        options: [
          'A web browser extension',
          'A Virtual Private Network (VPN)',
          'An offline calculator app',
          'A PDF reader'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'shopping-safety',
    title: 'Online Shopping & E-Commerce Safety',
    category: 'Finance',
    duration: '50 min',
    modulesCount: 5,
    description: 'Shop safely online, spot fake merchandise stores, use virtual card numbers, and claim chargeback refunds.',
    thumbnail: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Consumer Protection',
    videoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
    lessons: [
      {
        id: 'shopping-safety-0',
        title: 'Virtual Credit Cards & Merchant Verification',
        duration: '10:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/inWWhr5tnEA',
        description: 'Creating single-use merchant cards to prevent subscription billing traps and fraud.',
        notes: '• Virtual credit cards generate isolated card numbers tied to a single merchant with spend caps.\n• Verify merchant domain age and domain WHOIS records before making large online purchases.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is a key benefit of using virtual card numbers for online shopping?',
        options: [
          'They double your bank account balance',
          'They allow setting spend limits and can be burned instantly if compromised',
          'They guarantee free shipping on all orders',
          'They eliminate sales tax charges'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'investment-scams',
    title: 'Investment Scam & Crypto Fraud Awareness',
    category: 'Finance',
    duration: '1 hr 00 min',
    modulesCount: 5,
    description: 'Expose fake crypto trading platforms, guaranteed return schemes, and "Pig Butchering" investment fraud.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Financial Intelligence',
    videoUrl: 'https://www.youtube-nocookie.com/embed/1b7X8A6-3uY',
    lessons: [
      {
        id: 'investment-scams-0',
        title: 'Exposing Pig Butchering & Fake Trading Apps',
        duration: '12:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/1b7X8A6-3uY',
        description: 'How fraudulent trading portals manipulate fake profit charts before locking withdrawals.',
        notes: '• Promises of "Guaranteed 10%+ daily returns" are ALWAYS fraudulent ponzi schemes.\n• Fake trading platforms show manipulated account balances but demand "taxes" when withdrawing funds.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is an immediate red flag of an investment scam?',
        options: [
          'The firm is registered with financial regulators (SEC / FINRA)',
          'Guaranteed high financial returns with zero risk',
          'Detailed risk disclosure documents',
          'Standard bank transfer options'
        ],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: 'job-scams',
    title: 'Job & Employment Scam Prevention',
    category: 'Demographic',
    duration: '45 min',
    modulesCount: 5,
    description: 'Detect fake remote job offers, overpayment cheque scams, and pay-for-training hiring traps.',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1280&q=80',
    instructor: 'FinGuard Career Defense',
    videoUrl: 'https://www.youtube-nocookie.com/embed/z5nc9MDbv0A',
    lessons: [
      {
        id: 'job-scams-0',
        title: 'Detecting Overpayment Cheque & Equipment Scams',
        duration: '09:00',
        videoUrl: 'https://www.youtube-nocookie.com/embed/z5nc9MDbv0A',
        description: 'How scammers send fake cashier cheques and instruct candidates to wire funds to "approved vendors".',
        notes: '• Legitimate employers NEVER send advance cheques asking you to wire money back to vendors.\n• Verify job offers directly on official corporate career portals before sharing identity documents.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What should you do if a new remote employer sends a cheque and asks you to wire money back?',
        options: [
          'Deposit the cheque and wire the money immediately',
          'Recognize it as a fake cheque scam, stop contact, and report to authorities',
          'Ask for a bigger cheque',
          'Buy gift cards with the money'
        ],
        correctAnswerIndex: 1
      }
    ]
  }
];
