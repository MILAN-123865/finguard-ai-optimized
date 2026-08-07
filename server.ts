import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import * as XLSX from "xlsx";
import authRoutes from "./src/server/routes/authRoutes";
import emergencyRoutes from "./src/server/routes/emergencyRoutes";

const app = express();
const PORT = 3000;

// Ensure upload directory exists
const uploadDir = process.env.VERCEL ? path.join("/tmp", "uploads") : path.join(process.cwd(), "uploads");
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (err) {
  console.warn("Upload dir creation handled:", err);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    // Sanitize filename and prepend timestamp
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${uniquePrefix}-${sanitizedOriginalName}`);
  },
});

// Allowed file extensions and MIME types
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".pdf",
  ".txt",
  ".doc",
  ".docx",
]);

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_MIME_TYPES.has(file.mimetype) || ALLOWED_EXTENSIONS.has(ext)) {
      cb(null, true);
    } else {
      cb(new Error("UNSUPPORTED_FILE_TYPE"));
    }
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Custom Auth Routes
app.use("/api/auth", authRoutes);

// Mount Emergency System Routes
app.use("/api/emergency", emergencyRoutes);

// Serve static uploaded files
app.use("/uploads", express.static(uploadDir));

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// File Upload Endpoint
app.post("/api/upload", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            error: "File size exceeds 10MB limit. Please choose a smaller file.",
            code: "LIMIT_FILE_SIZE",
          });
        }
        return res.status(400).json({
          error: `Upload error: ${err.message}`,
          code: err.code,
        });
      } else if (err.message === "UNSUPPORTED_FILE_TYPE") {
        return res.status(400).json({
          error:
            "Unsupported file type. Allowed types: Images (.jpg, .jpeg, .png, .webp), PDF (.pdf), Text (.txt), and Word documents (.doc, .docx).",
          code: "UNSUPPORTED_FILE_TYPE",
        });
      }
      return res.status(400).json({
        error: err.message || "Failed to upload file",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "No file provided in request.",
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({
      success: true,
      fileUrl,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      filename: req.file.filename,
    });
  });
});

// Chat History In-Memory + JSON Persistence
const chatStoreFile = path.join(process.cwd(), "uploads", "chat_history_db.json");

interface ServerChatHistoryItem {
  id: string;
  userId: string;
  title: string;
  userMessage: any;
  aiResponse: any;
  timestamp: string;
}

let chatHistoryMemoryStore: ServerChatHistoryItem[] = [];

try {
  if (fs.existsSync(chatStoreFile)) {
    const rawData = fs.readFileSync(chatStoreFile, "utf-8");
    chatHistoryMemoryStore = JSON.parse(rawData);
  }
} catch (e) {
  console.warn("Failed to load existing chat history file:", e);
  chatHistoryMemoryStore = [];
}

const persistChatStore = () => {
  try {
    fs.writeFileSync(chatStoreFile, JSON.stringify(chatHistoryMemoryStore, null, 2), "utf-8");
  } catch (e) {
    console.warn("Failed to write chat history file:", e);
  }
};

// 1. Save Chat Item Endpoint
app.post("/api/chat/save", (req, res) => {
  const { id, userId, title, userMessage, aiResponse, timestamp } = req.body;

  if (!id || !userId || !userMessage || !aiResponse) {
    return res.status(400).json({ error: "Missing required chat fields (id, userId, userMessage, aiResponse)" });
  }

  const existingIndex = chatHistoryMemoryStore.findIndex(item => item.id === id);
  const newItem: ServerChatHistoryItem = {
    id,
    userId: String(userId),
    title: title || userMessage.text || (userMessage.attachment ? `Attached: ${userMessage.attachment.name}` : "Chat Session"),
    userMessage,
    aiResponse,
    timestamp: timestamp || new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    chatHistoryMemoryStore[existingIndex] = newItem;
  } else {
    chatHistoryMemoryStore.unshift(newItem);
  }

  persistChatStore();

  return res.status(200).json({
    success: true,
    message: "Chat history item saved successfully",
    item: newItem,
  });
});

// 2. Get Chat History Endpoint
app.get("/api/chat/history", (req, res) => {
  const userId = req.query.userId ? String(req.query.userId) : "usr_109283";

  const userChats = chatHistoryMemoryStore
    .filter(item => item.userId === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return res.status(200).json({
    success: true,
    history: userChats,
  });
});

// 3. Delete All History for User
app.delete("/api/chat/history", (req, res) => {
  const userId = req.query.userId ? String(req.query.userId) : "usr_109283";

  chatHistoryMemoryStore = chatHistoryMemoryStore.filter(item => item.userId !== userId);
  persistChatStore();

  return res.status(200).json({
    success: true,
    message: `All chat history deleted for user ${userId}`,
  });
});

// 4. Delete Single Chat Item
app.delete("/api/chat/history/:id", (req, res) => {
  const chatId = req.params.id;
  const userId = req.query.userId ? String(req.query.userId) : undefined;

  chatHistoryMemoryStore = chatHistoryMemoryStore.filter(item => {
    if (item.id !== chatId) return true;
    if (userId && item.userId !== userId) return true;
    return false;
  });
  persistChatStore();

  return res.status(200).json({
    success: true,
    message: `Chat item ${chatId} deleted`,
  });
});

// 4b. Rename Single Chat Item
app.patch("/api/chat/history/:id/rename", (req, res) => {
  const chatId = req.params.id;
  const { newTitle } = req.body;

  if (!newTitle) {
    return res.status(400).json({ error: "Missing required string 'newTitle'" });
  }

  const item = chatHistoryMemoryStore.find(i => i.id === chatId);
  if (item) {
    item.title = newTitle;
    persistChatStore();
    return res.status(200).json({ success: true, item });
  }

  return res.status(404).json({ error: "Chat item not found" });
});

// 5. Scan History Export Endpoint
app.get("/api/history/export", (req, res) => {
  const format = String(req.query.format || "csv").toLowerCase();
  const typeFilter = req.query.type ? String(req.query.type) : "all";
  const riskFilter = req.query.risk ? String(req.query.risk) : "all";
  const searchQuery = req.query.search ? String(req.query.search).toLowerCase() : "";

  // Base mock scan history records for export
  const defaultRecords = [
    {
      id: "scan_001",
      type: "sms",
      sender: "+1 (888) 234-9012",
      content: "URGENT: Your Chase Bank account has been temporarily locked due to unverified activity. Verify now at https://chase-auth-sec.net/login",
      level: "DANGEROUS",
      score: 88,
      confidence: 99.8,
      keywords: ["URGENT ACTION", "BANK SECURE", "LOGIN ATTEMPT"],
      phishKitDetected: true,
      timestamp: "2026-07-23T07:45:10Z",
      reasoning: "Impersonation of Chase Bank combined with urgent account locking language and non-official domain name.",
      recommendation: "Do not click link. Report SMS to Chase fraud department."
    },
    {
      id: "scan_002",
      type: "whatsapp",
      sender: "+1 (415) 890-3312",
      content: "Hi Mom, I dropped my phone in water and this is my temporary number. I urgently need $450 for tuition fee transfer. Please Zelle here.",
      level: "CRITICAL",
      score: 94,
      confidence: 98.9,
      keywords: ["FAMILY IMPERSONATION", "URGENT TRANSFER"],
      phishKitDetected: false,
      timestamp: "2026-07-22T19:20:00Z",
      reasoning: "Classic family impersonation script requesting immediate non-reversible P2P funds.",
      recommendation: "Contact family member directly on their known regular phone line."
    },
    {
      id: "scan_003",
      type: "email",
      sender: "no-reply@billing-services-cloud.com",
      content: "Your invoice #FG-88912 for $1,299.00 has been processed. If you did not authorize this order, view your statement attached.",
      level: "SUSPICIOUS",
      score: 65,
      confidence: 95.2,
      keywords: ["INVOICE HOOK", "PDF PAYLOAD"],
      phishKitDetected: true,
      timestamp: "2026-07-21T14:10:00Z",
      reasoning: "Phantom invoice scam designed to induce panic.",
      recommendation: "Do not download attachments or call phone numbers in email."
    },
    {
      id: "scan_004",
      type: "url",
      sender: "Web Scanner",
      content: "https://paypal-security-verification-portal-99.com/signin",
      level: "CRITICAL",
      score: 96,
      confidence: 99.9,
      keywords: ["SPOOFED BRAND", "SENSITIVE INPUT"],
      phishKitDetected: true,
      timestamp: "2026-07-20T11:05:00Z",
      reasoning: "Newly registered domain spoofing PayPal authentication endpoints.",
      recommendation: "Domain flagged as malicious phishing host."
    },
    {
      id: "scan_005",
      type: "sms",
      sender: "AMZN-NOTIF",
      content: "Your Amazon delivery package #78901 is out for delivery. Track driver progress in your app.",
      level: "SAFE",
      score: 5,
      confidence: 99.1,
      keywords: ["GENUINE NOTIFICATION"],
      phishKitDetected: false,
      timestamp: "2026-07-19T09:30:00Z",
      reasoning: "Standard logistics update with no external link triggers.",
      recommendation: "Legitimate message."
    }
  ];

  let filtered = defaultRecords.filter(r => {
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (riskFilter !== "all" && r.level.toLowerCase() !== riskFilter) return false;
    if (searchQuery) {
      const matchContent = r.content.toLowerCase().includes(searchQuery);
      const matchSender = r.sender.toLowerCase().includes(searchQuery);
      const matchKeywords = r.keywords.some(k => k.toLowerCase().includes(searchQuery));
      if (!matchContent && !matchSender && !matchKeywords) return false;
    }
    return true;
  });

  const dateStr = new Date().toISOString().split("T")[0];

  if (format === "json") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename="finguard_scan_history_${dateStr}.json"`);
    return res.status(200).json({
      system: "FinGuard AI Cyber Threat Intelligence",
      exportDate: new Date().toISOString(),
      totalRecords: filtered.length,
      records: filtered
    });
  }

  if (format === "xlsx" || format === "excel") {
    try {
      const formatted = filtered.map(r => ({
        "Scan ID": r.id,
        "Vector": r.type.toUpperCase(),
        "Sender": r.sender,
        "Content": r.content,
        "Risk Level": r.level,
        "Score (%)": r.score,
        "Confidence (%)": r.confidence,
        "Keywords": r.keywords.join(", "),
        "Status": r.phishKitDetected ? "PhishKit Detected" : "Clean",
        "Timestamp": r.timestamp,
        "Reasoning": r.reasoning,
        "Recommendation": r.recommendation
      }));
      const worksheet = XLSX.utils.json_to_sheet(formatted);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Scan History");
      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="finguard_scan_history_${dateStr}.xlsx"`);
      return res.status(200).send(buffer);
    } catch (e) {
      console.error("XLSX export error:", e);
    }
  }

  // Fallback / Default CSV Format
  const sanitizeCsvCell = (val: any) => {
    let str = String(val ?? "");
    if (/^[=+\-@\t\r]/.test(str)) {
      str = `'${str}`;
    }
    return `"${str.replace(/"/g, '""')}"`;
  };

  const headers = ["Scan ID", "Vector", "Sender", "Content", "Risk Level", "Score (%)", "Confidence (%)", "Keywords", "Timestamp", "Reasoning", "Recommendation"];
  const csvRows = filtered.map(r => [
    sanitizeCsvCell(r.id),
    sanitizeCsvCell(r.type.toUpperCase()),
    sanitizeCsvCell(r.sender),
    sanitizeCsvCell(r.content),
    sanitizeCsvCell(r.level),
    sanitizeCsvCell(r.score),
    sanitizeCsvCell(r.confidence),
    sanitizeCsvCell(r.keywords.join(", ")),
    sanitizeCsvCell(r.timestamp),
    sanitizeCsvCell(r.reasoning || ""),
    sanitizeCsvCell(r.recommendation || "")
  ].join(","));

  const csvContent = "\uFEFF" + [headers.map(h => `"${h}"`).join(","), ...csvRows].join("\r\n");
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="finguard_scan_history_${dateStr}.csv"`);
  return res.status(200).send(csvContent);
});

// Dynamic Threat Telemetry & Analyzer Helper Function
function analyzeContentServer(type: string, content: string) {
  const text = (content || '').trim();
  const lower = text.toLowerCase();

  const keywords: string[] = [];
  let extractedUrls: string[] = [];

  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(com|net|org|io|xyz|top|info|site|cn|ru|cc|tk)[^\s]*)/gi;
  const matches = text.match(urlRegex);
  if (matches) {
    extractedUrls = Array.from(new Set(matches.map(m => m.startsWith('http') ? m : `https://${m}`)));
  }

  const knownSafeDomains = ['google.com', 'github.com', 'apple.com', 'microsoft.com', 'wikipedia.org', 'amazon.com', 'youtube.com', 'finguard.ai', 'chase.com', 'bankofamerica.com', 'paypal.com', 'wellsfargo.com', 'gov.in', 'nic.in'];
  const isExplicitlySafeUrl = (type === 'url' || extractedUrls.length > 0) && knownSafeDomains.some(d => lower.includes(d));

  let riskPoints = 0;

  // 1. Urgency & Coercion Lures
  const urgencyLures = ['urgent', 'urgently', 'immediately', 'account suspended', 'account locked', 'account blocked', 'verify now', 'action required', 'within 24 hours', 'deactivated', 'legal action', 'police', 'arrest', 'warrant', 'fine', 'penalty', 'disconnection', 'electricity bill'];
  urgencyLures.forEach(lure => {
    if (lower.includes(lure)) {
      riskPoints += 25;
      if (!keywords.includes('URGENT COERCION')) keywords.push('URGENT COERCION');
    }
  });

  // 2. Credential Harvesting & OTP
  const credentialLures = ['enter password', 'provide password', 'verify otp', 'send otp', 'share otp', 'enter otp', 'pin number', 'cvv', 'pan card', 'kyc update', 'netbanking', 'login here', 'update details', 'verify account', 'unauthorized access', 'security alert'];
  credentialLures.forEach(lure => {
    if (lower.includes(lure)) {
      riskPoints += 30;
      if (!keywords.includes('CREDENTIAL HARVESTING')) keywords.push('CREDENTIAL HARVESTING');
    }
  });

  // 3. Financial Fraud / Impersonation
  const financialLures = ['wire transfer', 'send money', 'transfer money', 'claim prize', 'lottery', 'winner', 'gift card', 'cashback', 'part time job', 'earn money', 'crypto', 'bitcoin', 'investment', 'telegram', 'zelle', 'upi id', 'gpay', 'paytm', 'phonepe', 'dropped phone', 'temporary number', 'need money'];
  financialLures.forEach(lure => {
    if (lower.includes(lure)) {
      riskPoints += 25;
      if (!keywords.includes('FINANCIAL FRAUD LURE')) keywords.push('FINANCIAL FRAUD LURE');
    }
  });

  // 4. Domain Anomalies & Link Scams
  if ((type === 'url' || extractedUrls.length > 0) && !isExplicitlySafeUrl) {
    riskPoints += 20;
    const urlsToCheck = type === 'url' ? [text, ...extractedUrls] : extractedUrls;
    urlsToCheck.forEach(u => {
      const uLower = u.toLowerCase();
      if (uLower.includes('bit.ly') || uLower.includes('tinyurl') || uLower.includes('.xyz') || uLower.includes('.top') || uLower.includes('.site') || uLower.includes('-net') || uLower.includes('-sec') || uLower.includes('auth') || uLower.includes('verify')) {
        riskPoints += 25;
        if (!keywords.includes('SPOOFED PHISHING DOMAIN')) keywords.push('SPOOFED PHISHING DOMAIN');
      }
    });
  }

  let score = 0;
  if (riskPoints === 0) {
    score = 0;
    keywords.push('LEGITIMATE / BENIGN CONTENT');
  } else if (riskPoints <= 25) {
    score = 35;
  } else if (riskPoints <= 50) {
    score = 58;
  } else if (riskPoints <= 75) {
    score = 78;
  } else {
    score = Math.min(98, 85 + Math.floor(riskPoints / 5));
  }

  let riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'SAFE';
  if (score >= 81) riskLevel = 'CRITICAL';
  else if (score >= 61) riskLevel = 'HIGH';
  else if (score >= 41) riskLevel = 'MEDIUM';
  else if (score >= 21) riskLevel = 'LOW';
  else riskLevel = 'SAFE';

  const isScam = score >= 60;
  const confidence = 98.5;

  let hashVal = 0;
  const combined = text + '_' + type + '_' + Date.now();
  for (let i = 0; i < combined.length; i++) hashVal = (hashVal << 5) - hashVal + combined.charCodeAt(i);
  const hash = `0x${Math.abs(hashVal).toString(16).padStart(8, '0')}${Math.abs(hashVal * 17).toString(16).padStart(8, '0')}`;

  let reasoning = isScam
    ? `Multiple malicious threat indicators identified: ${keywords.join(', ')}. Evidence suggests phishing, spoofed links, or social engineering.`
    : `No phishing links, credential harvesting, or coercion detected. Communication is benign.`;
  let recommendation = isScam
    ? `Do not click links or respond. Block the sender immediately.`
    : `Safe content. Maintain standard security awareness.`;

  return {
    id: `scan_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    hash,
    type,
    content: text,
    timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
    score,
    riskLevel,
    level: riskLevel,
    confidence,
    isScam,
    safe: !isScam,
    keywords,
    urls: extractedUrls,
    extractedUrls,
    phishKitDetected: score > 75,
    reasoning,
    recommendation,
    sender: type === 'sms' ? '+1 (800) 555-0199' : type === 'email' ? 'security-alert@verify-auth.com' : 'Direct Sender'
  };
}

// 5. Dashboard & Analytics Endpoints
app.get("/api/dashboard/summary", (_req, res) => {
  return res.json({
    securityScore: 92,
    securityRating: 'EXCELLENT PROTECTION',
    totalScansToday: 1482,
    threatsNeutralizedToday: 124,
    safeMessagesToday: 1358,
    avgRiskScore: 14.2,
  });
});

app.get("/api/dashboard/analytics", (_req, res) => {
  return res.json({
    weeklyActivity: [
      { day: 'Mon', scans: 1240, threats: 98, safe: 1142 },
      { day: 'Tue', scans: 1580, threats: 134, safe: 1446 },
      { day: 'Wed', scans: 1890, threats: 182, safe: 1708 },
      { day: 'Thu', scans: 2100, threats: 210, safe: 1890 },
      { day: 'Fri', scans: 1950, threats: 165, safe: 1785 },
      { day: 'Sat', scans: 1320, threats: 88, safe: 1232 },
      { day: 'Sun', scans: 1482, threats: 124, safe: 1358 },
    ],
    riskDistribution: {
      safe: 82100,
      suspicious: 24330,
      dangerous: 12890,
      critical: 5530,
    },
    threatCategories: [
      { category: 'Banking & Financial Scams', count: 7420, percentage: 40.2 },
      { category: 'Brand Impersonation (Phishing)', count: 5120, percentage: 27.8 },
      { category: 'WhatsApp / Family Distress', count: 3290, percentage: 17.8 },
      { category: 'Malicious URLs & Malvertising', count: 2590, percentage: 14.2 },
    ],
  });
});

app.get("/api/dashboard/notifications", (_req, res) => {
  return res.json([
    {
      id: 'notif_1',
      title: 'Critical PhishKit Signature Intercepted',
      message: 'An active credential harvesting kit targeting Chase Bank was blocked automatically.',
      type: 'critical',
      timestamp: '10m ago',
      read: false,
    },
    {
      id: 'notif_2',
      title: 'Weekly SOC Intelligence Digest',
      message: 'Threat detection accuracy reached 99.8% across 14,800 analyzed messages this week.',
      type: 'info',
      timestamp: '2h ago',
      read: false,
    },
    {
      id: 'notif_3',
      title: 'New WhatsApp Scam Pattern',
      message: 'Emerging distress lure targeting elderly contacts identified in North American region.',
      type: 'warning',
      timestamp: '5h ago',
      read: true,
    },
  ]);
});

app.get("/api/dashboard", (_req, res) => {
  return res.json({
    totalScans: 124850,
    threatsNeutralized: 18420,
    accuracyRate: 99.8,
    activeMonitors: 24,
    riskDistribution: {
      safe: 82100,
      suspicious: 24330,
      dangerous: 12890,
      critical: 5530,
    },
    recentScans: [
      {
        id: 'scan_001',
        type: 'sms',
        content: 'URGENT: Your Chase Bank account has been temporarily locked due to unverified activity. Verify now at https://chase-auth-sec.net/login',
        timestamp: '10 mins ago',
        score: 88,
        level: 'DANGEROUS',
        confidence: 99.8,
        keywords: ['URGENT ACTION', 'BANK SECURE'],
        extractedUrls: ['https://chase-auth-sec.net/login'],
        reasoning: 'Impersonation of Chase Bank combined with urgent account locking language.',
        recommendation: 'Do not click link.',
        sender: '+1 (888) 234-9012'
      },
      {
        id: 'scan_002',
        type: 'whatsapp',
        content: 'Hi Mom, I dropped my phone in water and this is my temporary number. I urgently need $450.',
        timestamp: '25 mins ago',
        score: 94,
        level: 'CRITICAL',
        confidence: 98.9,
        keywords: ['FAMILY IMPERSONATION', 'URGENT TRANSFER'],
        reasoning: 'Family in need impersonation scam.',
        recommendation: 'Contact directly.',
        sender: '+1 (415) 890-3312'
      },
      {
        id: 'scan_003',
        type: 'url',
        content: 'https://paypal-security-verification-portal-99.com/signin',
        timestamp: '1 hour ago',
        score: 96,
        level: 'CRITICAL',
        confidence: 99.9,
        keywords: ['SPOOFED BRAND', 'SENSITIVE INPUT'],
        extractedUrls: ['https://paypal-security-verification-portal-99.com/signin'],
        reasoning: 'Newly registered domain spoofing PayPal.',
        recommendation: 'Domain flagged.',
        sender: 'Web Scanner'
      }
    ],
    threatTelemetry: [
      { time: '00:00', scans: 4200, threats: 310 },
      { time: '04:00', scans: 2100, threats: 140 },
      { time: '08:00', scans: 8900, threats: 820 },
      { time: '12:00', scans: 14200, threats: 1410 },
      { time: '16:00', scans: 11800, threats: 980 },
      { time: '20:00', scans: 7400, threats: 590 },
    ]
  });
});

// 6. History & Reports Endpoints
function generateSeedScanHistory() {
  const now = new Date();
  const getPastDate = (daysAgo: number, hoursAgo = 0) => {
    const d = new Date(now.getTime() - (daysAgo * 24 + hoursAgo) * 60 * 60 * 1000);
    return d.toISOString();
  };

  return [
    // Today / Recent 24h
    {
      id: 'scan_001',
      type: 'sms',
      content: 'URGENT: Your Chase Bank account has been temporarily locked due to unverified activity. Verify now at https://chase-auth-sec.net/login',
      timestamp: getPastDate(0, 2),
      score: 88,
      level: 'DANGEROUS',
      confidence: 99.8,
      keywords: ['URGENT ACTION', 'BANK SECURE', 'LOGIN ATTEMPT'],
      extractedUrls: ['https://chase-auth-sec.net/login'],
      phishKitDetected: true,
      reasoning: 'Impersonation of Chase Bank combined with urgent account locking language.',
      recommendation: 'Do not click link. Report SMS to Chase fraud department.',
      sender: '+1 (888) 234-9012'
    },
    {
      id: 'scan_002',
      type: 'whatsapp',
      content: 'Hi Mom, I dropped my phone in water and this is my temporary number. I urgently need $450 for tuition fee transfer. Please Zelle here.',
      timestamp: getPastDate(0, 5),
      score: 94,
      level: 'CRITICAL',
      confidence: 98.9,
      keywords: ['FAMILY IMPERSONATION', 'URGENT TRANSFER', 'UNVERIFIED NUMBER'],
      extractedUrls: [],
      phishKitDetected: false,
      reasoning: 'Classic family impersonation script requesting immediate non-reversible P2P funds.',
      recommendation: 'Contact family member directly on their known regular phone line.',
      sender: '+1 (415) 890-3312'
    },
    {
      id: 'scan_003',
      type: 'url',
      content: 'https://finguard.ai/documentation/security-best-practices',
      timestamp: getPastDate(0, 8),
      score: 4,
      level: 'SAFE',
      confidence: 99.9,
      keywords: ['DOCUMENTATION', 'VERIFIED DOMAIN'],
      extractedUrls: ['https://finguard.ai/documentation/security-best-practices'],
      phishKitDetected: false,
      reasoning: 'Verified official documentation endpoint.',
      recommendation: 'Safe resource.',
      sender: 'Web Scanner'
    },

    // 1 Day Ago
    {
      id: 'scan_004',
      type: 'email',
      content: 'Your invoice #FG-88912 for $1,299.00 has been processed. View your statement attached.',
      timestamp: getPastDate(1, 4),
      score: 65,
      level: 'SUSPICIOUS',
      confidence: 95.2,
      keywords: ['INVOICE HOOK', 'PDF PAYLOAD'],
      extractedUrls: ['https://billing-statement-download.org'],
      phishKitDetected: true,
      reasoning: 'Phantom invoice scam designed to induce panic.',
      recommendation: 'Do not download attachments.',
      sender: 'no-reply@billing-services-cloud.com'
    },
    {
      id: 'scan_005',
      type: 'sms',
      content: 'Your Amazon delivery package #78901 is out for delivery. Track driver progress in your app.',
      timestamp: getPastDate(1, 10),
      score: 5,
      level: 'SAFE',
      confidence: 99.1,
      keywords: ['GENUINE NOTIFICATION'],
      extractedUrls: [],
      phishKitDetected: false,
      reasoning: 'Standard logistics update with no external link triggers.',
      recommendation: 'Legitimate message.',
      sender: 'AMZN-NOTIF'
    },

    // 2 Days Ago
    {
      id: 'scan_006',
      type: 'url',
      content: 'https://paypal-security-verification-portal-99.com/signin',
      timestamp: getPastDate(2, 3),
      score: 96,
      level: 'CRITICAL',
      confidence: 99.9,
      keywords: ['SPOOFED BRAND', 'SENSITIVE INPUT'],
      extractedUrls: ['https://paypal-security-verification-portal-99.com/signin'],
      phishKitDetected: true,
      reasoning: 'Newly registered domain spoofing PayPal authentication endpoints.',
      recommendation: 'Domain flagged as malicious phishing host.',
      sender: 'Web Scanner'
    },
    {
      id: 'scan_007',
      type: 'email',
      content: 'GitHub Security Alert: New SSH key added to your repository account.',
      timestamp: getPastDate(2, 12),
      score: 8,
      level: 'SAFE',
      confidence: 99.5,
      keywords: ['SECURITY NOTICE', 'VERIFIED SENDER'],
      extractedUrls: ['https://github.com/settings/keys'],
      phishKitDetected: false,
      reasoning: 'Official security audit notice from GitHub.',
      recommendation: 'Legitimate notification.',
      sender: 'noreply@github.com'
    },

    // 3 Days Ago
    {
      id: 'scan_008',
      type: 'sms',
      content: 'USPS: Your package delivery has been delayed due to incomplete address. Update now: https://usps-redelivery-post.net/address',
      timestamp: getPastDate(3, 6),
      score: 92,
      level: 'CRITICAL',
      confidence: 99.2,
      keywords: ['POSTAL SCAM', 'FAKE REDELIVERY'],
      extractedUrls: ['https://usps-redelivery-post.net/address'],
      phishKitDetected: true,
      reasoning: 'USPS smishing scam capturing credit card fee details.',
      recommendation: 'Delete SMS immediately.',
      sender: '+1 (800) 412-9011'
    },
    {
      id: 'scan_009',
      type: 'whatsapp',
      content: 'Your weekly team standup meeting summary and notes link.',
      timestamp: getPastDate(3, 14),
      score: 2,
      level: 'SAFE',
      confidence: 99.8,
      keywords: ['TEAM COMMUNICATION'],
      extractedUrls: [],
      phishKitDetected: false,
      reasoning: 'Internal communication without risk factors.',
      recommendation: 'Safe message.',
      sender: '+1 (555) 019-2834'
    },

    // 4 Days Ago
    {
      id: 'scan_010',
      type: 'email',
      content: 'Netflix Notice: We could not process your last monthly subscription payment. Update billing info.',
      timestamp: getPastDate(4, 9),
      score: 84,
      level: 'DANGEROUS',
      confidence: 98.4,
      keywords: ['SUBSCRIPTION EXPIRED', 'CREDENTIAL HARVEST'],
      extractedUrls: ['https://netflix-billing-update-sec.com'],
      phishKitDetected: true,
      reasoning: 'Spoofed Netflix credential harvesting portal.',
      recommendation: 'Do not click billing link.',
      sender: 'service@netflix-billing-alert.com'
    },
    {
      id: 'scan_011',
      type: 'url',
      content: 'https://google.com/search?q=cybersecurity+frameworks',
      timestamp: getPastDate(4, 18),
      score: 1,
      level: 'SAFE',
      confidence: 100,
      keywords: ['SEARCH QUERY', 'TRUSTED DOMAIN'],
      extractedUrls: ['https://google.com/search?q=cybersecurity+frameworks'],
      phishKitDetected: false,
      reasoning: 'Standard Google search query.',
      recommendation: 'Safe domain.',
      sender: 'Web Scanner'
    },

    // 5 Days Ago
    {
      id: 'scan_012',
      type: 'sms',
      content: 'ALERT: Unusual login attempt detected on your Bank of America online banking. Confirm at https://boa-sec-verify.org',
      timestamp: getPastDate(5, 5),
      score: 91,
      level: 'CRITICAL',
      confidence: 99.4,
      keywords: ['BANK SPOOF', 'UNAUTHORIZED ACCESS'],
      extractedUrls: ['https://boa-sec-verify.org'],
      phishKitDetected: true,
      reasoning: 'Malicious domain harvesting bank online credentials.',
      recommendation: 'Report smishing immediately.',
      sender: '+1 (888) 901-3321'
    },
    {
      id: 'scan_013',
      type: 'email',
      content: 'Google Workspace: Security digest for your organization account.',
      timestamp: getPastDate(5, 15),
      score: 3,
      level: 'SAFE',
      confidence: 99.7,
      keywords: ['DIGEST REPORT', 'VERIFIED DOMAIN'],
      extractedUrls: ['https://workspace.google.com'],
      phishKitDetected: false,
      reasoning: 'Authentic security update.',
      recommendation: 'Legitimate email.',
      sender: 'no-reply@accounts.google.com'
    },

    // 6 Days Ago
    {
      id: 'scan_014',
      type: 'whatsapp',
      content: 'CONGRATULATIONS! You have won $10,000 in the Binance crypto raffle. Claim now at https://binance-claim-crypto.xyz',
      timestamp: getPastDate(6, 7),
      score: 95,
      level: 'CRITICAL',
      confidence: 99.9,
      keywords: ['CRYPTO FRAUD', 'LOTTERY WINNER'],
      extractedUrls: ['https://binance-claim-crypto.xyz'],
      phishKitDetected: true,
      reasoning: 'Crypto seed phrase drainer scam.',
      recommendation: 'Block sender immediately.',
      sender: '+1 (305) 882-9901'
    },
    {
      id: 'scan_015',
      type: 'url',
      content: 'https://wikipedia.org/wiki/Phishing',
      timestamp: getPastDate(6, 16),
      score: 0,
      level: 'SAFE',
      confidence: 100,
      keywords: ['ENCYCLOPEDIA', 'TRUSTED DOMAIN'],
      extractedUrls: ['https://wikipedia.org/wiki/Phishing'],
      phishKitDetected: false,
      reasoning: 'Educational reference domain.',
      recommendation: 'Safe resource.',
      sender: 'Web Scanner'
    },

    // 10 Days Ago (Within 30 Days)
    {
      id: 'scan_016',
      type: 'email',
      content: 'Urgent Security Update required for your Apple ID credentials.',
      timestamp: getPastDate(10, 8),
      score: 87,
      level: 'DANGEROUS',
      confidence: 98.7,
      keywords: ['APPLE SPOOF', 'CREDENTIAL HARVEST'],
      extractedUrls: ['https://apple-id-verification-icloud.net'],
      phishKitDetected: true,
      reasoning: 'Fake Apple ID authentication portal.',
      recommendation: 'Do not submit credentials.',
      sender: 'security@apple-id-verify.com'
    },
    {
      id: 'scan_017',
      type: 'sms',
      content: 'Your appointment reminder with Dr. Smith for Thursday at 2:00 PM.',
      timestamp: getPastDate(10, 14),
      score: 2,
      level: 'SAFE',
      confidence: 99.8,
      keywords: ['APPOINTMENT REMINDER'],
      extractedUrls: [],
      phishKitDetected: false,
      reasoning: 'Legitimate medical calendar alert.',
      recommendation: 'Safe SMS.',
      sender: '+1 (800) 555-0122'
    },

    // 15 Days Ago
    {
      id: 'scan_018',
      type: 'sms',
      content: 'Wells Fargo: Your debit card ending in 4021 has been restricted due to suspicious charge.',
      timestamp: getPastDate(15, 11),
      score: 89,
      level: 'DANGEROUS',
      confidence: 99.1,
      keywords: ['CARD RESTRICTED', 'BANK SCAM'],
      extractedUrls: ['https://wellsfargo-card-auth.org'],
      phishKitDetected: true,
      reasoning: 'Wells Fargo banking impersonation.',
      recommendation: 'Call phone number on physical debit card.',
      sender: '+1 (888) 332-1109'
    },
    {
      id: 'scan_019',
      type: 'email',
      content: 'Receipt for your recent purchase at Home Depot online store.',
      timestamp: getPastDate(15, 19),
      score: 6,
      level: 'SAFE',
      confidence: 99.2,
      keywords: ['PURCHASE RECEIPT'],
      extractedUrls: ['https://homedepot.com/orders'],
      phishKitDetected: false,
      reasoning: 'Standard store receipt.',
      recommendation: 'Legitimate order.',
      sender: 'orders@homedepot.com'
    },

    // 20 Days Ago
    {
      id: 'scan_020',
      type: 'whatsapp',
      content: 'Exclusive job offer: Earn $500/day working from home doing simple online reviews.',
      timestamp: getPastDate(20, 4),
      score: 93,
      level: 'CRITICAL',
      confidence: 99.0,
      keywords: ['JOB SCAM', 'TASK FRAUD'],
      extractedUrls: ['https://task-earnings-vip.top'],
      phishKitDetected: true,
      reasoning: 'Task scam requiring advance payment / deposit.',
      recommendation: 'Report scam seller.',
      sender: '+1 (212) 401-9920'
    },
    {
      id: 'scan_021',
      type: 'url',
      content: 'https://microsoft.com/en-us/security',
      timestamp: getPastDate(20, 13),
      score: 1,
      level: 'SAFE',
      confidence: 100,
      keywords: ['OFFICIAL VENDOR'],
      extractedUrls: ['https://microsoft.com/en-us/security'],
      phishKitDetected: false,
      reasoning: 'Official Microsoft Security site.',
      recommendation: 'Safe link.',
      sender: 'Web Scanner'
    },

    // 25 Days Ago
    {
      id: 'scan_022',
      type: 'email',
      content: 'Warning: Your cloud storage account is 98% full. Upgrade storage now or files will be deleted.',
      timestamp: getPastDate(25, 7),
      score: 72,
      level: 'SUSPICIOUS',
      confidence: 96.1,
      keywords: ['STORAGE LIMIT', 'PAYMENT PRESSURE'],
      extractedUrls: ['https://cloud-storage-upgrade-pay.net'],
      phishKitDetected: true,
      reasoning: 'Storage upgrade phishing attempt.',
      recommendation: 'Verify storage directly in account settings.',
      sender: 'billing@cloud-storage-alert.com'
    },
    {
      id: 'scan_023',
      type: 'sms',
      content: 'Your verification code for Zoom login is 891204. Do not share this code.',
      timestamp: getPastDate(25, 17),
      score: 4,
      level: 'SAFE',
      confidence: 99.6,
      keywords: ['OTP CODE'],
      extractedUrls: [],
      phishKitDetected: false,
      reasoning: 'Genuine 2FA authentication SMS.',
      recommendation: 'Keep code private.',
      sender: 'ZOOM-AUTH'
    },

    // 45 Days Ago (All Time Range)
    {
      id: 'scan_024',
      type: 'email',
      content: 'Wire Transfer Confirmation request for Q2 vendor invoices.',
      timestamp: getPastDate(45, 10),
      score: 86,
      level: 'DANGEROUS',
      confidence: 98.2,
      keywords: ['BEC FRAUD', 'WIRE TRANSFER'],
      extractedUrls: [],
      phishKitDetected: false,
      reasoning: 'Business Email Compromise impersonating CFO.',
      recommendation: 'Verify out-of-band via phone call.',
      sender: 'executive-cfo@company-corp.co'
    },
    {
      id: 'scan_025',
      type: 'url',
      content: 'https://github.com/facebook/react',
      timestamp: getPastDate(45, 18),
      score: 0,
      level: 'SAFE',
      confidence: 100,
      keywords: ['OPEN SOURCE', 'VERIFIED REPO'],
      extractedUrls: ['https://github.com/facebook/react'],
      phishKitDetected: false,
      reasoning: 'Official open source codebase repository.',
      recommendation: 'Safe URL.',
      sender: 'Web Scanner'
    },

    // 75 Days Ago (All Time Range)
    {
      id: 'scan_026',
      type: 'sms',
      content: 'Internal Revenue Service tax levy notice. Final warning before asset seizure.',
      timestamp: getPastDate(75, 11),
      score: 97,
      level: 'CRITICAL',
      confidence: 99.9,
      keywords: ['IRS IMPERSONATION', 'THREATENING LANGUAGE'],
      extractedUrls: ['https://irs-tax-levy-settlement.org'],
      phishKitDetected: true,
      reasoning: 'Government agency impersonation fraud.',
      recommendation: 'Report government imposter scam.',
      sender: '+1 (800) 912-0044'
    },
    {
      id: 'scan_027',
      type: 'email',
      content: 'Your monthly statement for Chase Sapphire Preferred credit card.',
      timestamp: getPastDate(75, 15),
      score: 5,
      level: 'SAFE',
      confidence: 99.4,
      keywords: ['BANK STATEMENT', 'AUTHENTIC HEADER'],
      extractedUrls: ['https://chase.com'],
      phishKitDetected: false,
      reasoning: 'Authentic banking e-statement notification.',
      recommendation: 'Legitimate email.',
      sender: 'no-reply@chase.com'
    },

    // 110 Days Ago (All Time Range)
    {
      id: 'scan_028',
      type: 'url',
      content: 'https://meta-facebook-appeal-auth.xyz',
      timestamp: getPastDate(110, 9),
      score: 95,
      level: 'CRITICAL',
      confidence: 99.8,
      keywords: ['BRAND SPOOF', 'CRITICAL RISK'],
      extractedUrls: ['https://meta-facebook-appeal-auth.xyz'],
      phishKitDetected: true,
      reasoning: 'Meta Business account phishing page.',
      recommendation: 'Do not enter passwords.',
      sender: 'Web Scanner'
    },
    {
      id: 'scan_029',
      type: 'email',
      content: 'AWS Cloud Monthly Usage Summary & Billing Statement.',
      timestamp: getPastDate(110, 14),
      score: 3,
      level: 'SAFE',
      confidence: 99.7,
      keywords: ['AWS BILLING', 'AUTHENTIC SENDER'],
      extractedUrls: ['https://aws.amazon.com/console'],
      phishKitDetected: false,
      reasoning: 'Legitimate cloud infrastructure billing invoice.',
      recommendation: 'Safe email.',
      sender: 'no-reply@amazon.com'
    }
  ];
}

let scanHistoryStore = generateSeedScanHistory();

app.get("/api/history", (req, res) => {
  const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : undefined;
  if (limit && !isNaN(limit)) {
    return res.json(scanHistoryStore.slice(0, limit));
  }
  return res.json(scanHistoryStore);
});

// Analytics Endpoint supporting range=7d | 30d | all
app.get("/api/history/analytics", (req, res) => {
  const range = (req.query.range as string) || "7d";
  const now = new Date();

  // Filter scan records based on requested range
  let startTime = 0;
  if (range === "7d") {
    startTime = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  } else if (range === "30d") {
    startTime = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  } else {
    startTime = 0; // all time
  }

  // Filter scanHistoryStore
  const filteredStore = scanHistoryStore.filter((item) => {
    if (startTime === 0) return true;
    const t = new Date(item.timestamp).getTime();
    return !isNaN(t) && t >= startTime;
  });

  // Calculate metrics
  let totalSafe = 0;
  let totalThreats = 0;

  filteredStore.forEach((item) => {
    const isThreat = item.score >= 70 || item.level === "CRITICAL" || item.level === "DANGEROUS" || item.level === "SUSPICIOUS";
    if (isThreat) {
      totalThreats++;
    } else {
      totalSafe++;
    }
  });

  const totalScans = filteredStore.length;
  const safePercentage = totalScans > 0 ? Math.round((totalSafe / totalScans) * 100) : 0;
  const threatPercentage = totalScans > 0 ? Math.round((totalThreats / totalScans) * 100) : 0;
  const accuracy = 99.8;

  // Generate chart points based on range
  let chartData: Array<{ date: string; fullDate?: string; safe: number; threat: number; total: number }> = [];

  if (range === "7d") {
    // Generate 7 day buckets (Mon - Sun or Last 7 days)
    const daysMap: { [key: string]: { safe: number; threat: number; total: number; label: string } } = {};
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create 7 day buckets starting from 6 days ago up to today
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateKey = d.toISOString().split("T")[0]; // YYYY-MM-DD
      const dayLabel = dayNames[d.getDay()];
      daysMap[dateKey] = { safe: 0, threat: 0, total: 0, label: dayLabel };
    }

    filteredStore.forEach((item) => {
      const itemDateKey = new Date(item.timestamp).toISOString().split("T")[0];
      if (daysMap[itemDateKey]) {
        const isThreat = item.score >= 70 || item.level === "CRITICAL" || item.level === "DANGEROUS" || item.level === "SUSPICIOUS";
        if (isThreat) {
          daysMap[itemDateKey].threat++;
        } else {
          daysMap[itemDateKey].safe++;
        }
        daysMap[itemDateKey].total++;
      }
    });

    chartData = Object.keys(daysMap).map((dateKey) => ({
      date: daysMap[dateKey].label,
      fullDate: dateKey,
      safe: daysMap[dateKey].safe,
      threat: daysMap[dateKey].threat,
      total: daysMap[dateKey].total,
    }));
  } else if (range === "30d") {
    // Generate 30 daily buckets for last 30 days
    const daysMap: { [key: string]: { safe: number; threat: number; total: number; label: string } } = {};

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateKey = d.toISOString().split("T")[0];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayLabel = `${monthNames[d.getMonth()]} ${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`;
      daysMap[dateKey] = { safe: 0, threat: 0, total: 0, label: dayLabel };
    }

    filteredStore.forEach((item) => {
      const itemDateKey = new Date(item.timestamp).toISOString().split("T")[0];
      if (daysMap[itemDateKey]) {
        const isThreat = item.score >= 70 || item.level === "CRITICAL" || item.level === "DANGEROUS" || item.level === "SUSPICIOUS";
        if (isThreat) {
          daysMap[itemDateKey].threat++;
        } else {
          daysMap[itemDateKey].safe++;
        }
        daysMap[itemDateKey].total++;
      }
    });

    chartData = Object.keys(daysMap).map((dateKey) => ({
      date: daysMap[dateKey].label,
      fullDate: dateKey,
      safe: daysMap[dateKey].safe,
      threat: daysMap[dateKey].threat,
      total: daysMap[dateKey].total,
    }));
  } else {
    // Range === 'all'
    // Group by week or month based on date span
    const weekMap: { [key: string]: { safe: number; threat: number; total: number; label: string } } = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Sort items chronologically
    const sorted = [...scanHistoryStore].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    if (sorted.length > 0) {
      sorted.forEach((item) => {
        const itemDate = new Date(item.timestamp);
        if (isNaN(itemDate.getTime())) return;
        const weekNum = Math.ceil(itemDate.getDate() / 7);
        const groupKey = `${itemDate.getFullYear()}-${itemDate.getMonth() + 1}-W${weekNum}`;
        const groupLabel = `${monthNames[itemDate.getMonth()]} W${weekNum}`;

        if (!weekMap[groupKey]) {
          weekMap[groupKey] = { safe: 0, threat: 0, total: 0, label: groupLabel };
        }

        const isThreat = item.score >= 70 || item.level === "CRITICAL" || item.level === "DANGEROUS" || item.level === "SUSPICIOUS";
        if (isThreat) {
          weekMap[groupKey].threat++;
        } else {
          weekMap[groupKey].safe++;
        }
        weekMap[groupKey].total++;
      });

      chartData = Object.keys(weekMap).map((key) => ({
        date: weekMap[key].label,
        safe: weekMap[key].safe,
        threat: weekMap[key].threat,
        total: weekMap[key].total,
      }));
    }
  }

  const pieData = [
    { name: "Safe Detections", value: totalSafe, color: "#10b981" },
    { name: "Threat Detections", value: totalThreats, color: "#ef4444" },
  ];

  return res.json({
    success: true,
    range,
    totalScans,
    totalSafe,
    totalThreats,
    safePercentage,
    threatPercentage,
    accuracy,
    chartData,
    pieData,
  });
});

app.delete("/api/history/:id", (req, res) => {
  const { id } = req.params;
  scanHistoryStore = scanHistoryStore.filter(item => item.id !== id);
  return res.json({ success: true, message: `History item ${id} deleted` });
});

let reportsStore = [
  {
    id: 'rep_001',
    type: 'sms',
    title: 'Fake IRS Tax Refund SMS Scam',
    description: 'SMS claiming $1,420 IRS tax refund with spoofed link demanding SSN.',
    scamUrl: 'https://irs-tax-refund-gov-verify.net',
    senderInfo: '+1 (800) 901-2241',
    status: 'RESOLVED',
    createdAt: '2026-07-22T14:20:00Z',
    reporterName: 'John Doe',
    upvotes: 42
  },
  {
    id: 'rep_002',
    type: 'whatsapp',
    title: 'Fake Zelle Support Money Request',
    description: 'Attacker impersonated Zelle customer desk asking to confirm code.',
    senderInfo: '+1 (312) 402-8819',
    status: 'PENDING',
    createdAt: '2026-07-23T08:12:00Z',
    reporterName: 'Anonymous',
    upvotes: 18
  },
  {
    id: 'rep_003',
    type: 'url',
    title: 'Cloned Crypto Wallet Login Page',
    description: 'Fake Metamask browser extension pop-up harvesting 12-word seed phrases.',
    scamUrl: 'https://metamask-extension-vault-sec.io',
    status: 'RESOLVED',
    createdAt: '2026-07-21T11:05:00Z',
    reporterName: 'Alex Rivera',
    upvotes: 56
  }
];

app.get("/api/report/list", (_req, res) => {
  return res.json(reportsStore);
});

app.get("/api/reports", (_req, res) => {
  return res.json(reportsStore);
});

app.post("/api/reports", (req, res) => {
  const newReport = {
    id: `rep_${Date.now()}`,
    type: req.body.type || 'other',
    title: req.body.title || 'Community Scam Alert',
    description: req.body.description || '',
    scamUrl: req.body.scamUrl || '',
    senderInfo: req.body.senderInfo || '',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    reporterName: req.body.reporterName || 'Anonymous',
    upvotes: 1
  };
  reportsStore.unshift(newReport);
  return res.status(201).json(newReport);
});

app.post("/api/reports/:id/upvote", (req, res) => {
  const { id } = req.params;
  const report = reportsStore.find(r => r.id === id);
  if (report) {
    report.upvotes = (report.upvotes || 0) + 1;
    return res.json({ success: true, upvotes: report.upvotes });
  }
  return res.status(404).json({ error: "Report not found" });
});

// 7. Dynamic Scanner Analyze Endpoint
app.post(["/api/scan", "/scan", "/api/scanner/analyze", "/scanner/analyze"], async (req, res) => {
  const content = req.body.content || req.body.message || req.body.payload || "";
  const type = req.body.type || req.body.scanType || 'sms';
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: "Missing required string field 'content' or 'message'" });
  }

  const scanType = (type || 'sms').toLowerCase();
  let scanOutput: any = null;

  try {
    if (process.env.GEMINI_API_KEY) {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `You are FinGuard AI, an elite cybersecurity scanning and threat detection engine.

Analyze the input payload (${scanType.toUpperCase()}).

IMPORTANT SCORING GUIDELINES:
1. SAFE (0-20): Legitimate everyday, business, or personal messages without phishing or malicious links/coercion.
2. LOW (21-40): Minor spam or promotional wording, but no threat indicators.
3. MEDIUM (41-60): Moderate suspicious patterns or unverified sender links.
4. HIGH (61-80): Likely scam, urgent pressure, spoofed links, credential harvest attempts.
5. CRITICAL (81-100): Confirmed high-harm phishing, malware/phishkit link, impersonation, wire transfer fraud.

Return JSON strictly adhering to this schema:
{
  "score": number,
  "riskLevel": "SAFE | LOW | MEDIUM | HIGH | CRITICAL",
  "confidence": number,
  "scamType": "string (e.g. Phishing Email, SMS Smishing, Tech Support Scam, Legitimate Communication)",
  "summary": "string (1-2 sentence executive summary)",
  "explanation": "string (detailed breakdown of findings)",
  "indicators": ["array of detected threat red flags or phrases"],
  "recommendations": ["array of step-by-step security action recommendations"],
  "timeline": ["array of sequential attack vector stages, e.g. Step 1: Initial contact, Step 2: Lure, Step 3: Exploitation"],
  "urls": ["array of extracted URLs"],
  "phoneNumbers": ["array of extracted phone numbers"],
  "emails": ["array of extracted email addresses"],
  "entities": ["array of recognized organizations/brands, e.g. Chase Bank, IRS, Apple"],
  "breakdown": {
    "language": number (0-100),
    "domain": number (0-100),
    "social": number (0-100),
    "intelligence": number (0-100)
  },
  "highlights": [
    { "word": "string", "severity": "low | medium | high" }
  ]
}`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Analyze this ${scanType} payload:\n\n${content}`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
        },
      });

      const responseText = aiResponse.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        const score = Math.max(0, Math.min(100, Number(parsed.score) ?? 10));
        let riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = parsed.riskLevel || 'SAFE';
        if (!['SAFE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(riskLevel)) {
          riskLevel = score >= 81 ? 'CRITICAL' : score >= 61 ? 'HIGH' : score >= 41 ? 'MEDIUM' : score >= 21 ? 'LOW' : 'SAFE';
        }
        const isScam = typeof parsed.isScam === 'boolean' ? parsed.isScam : score >= 61;

        // Regex fallbacks for extracted URLs, Phones, Emails
        const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(com|net|org|io|xyz|top|info|site|cn|ru|cc|tk)[^\s]*)/gi;
        const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

        const extractedUrls = Array.isArray(parsed.urls) && parsed.urls.length > 0
          ? parsed.urls
          : Array.from(new Set(content.match(urlRegex) || []));

        const extractedPhones = Array.isArray(parsed.phoneNumbers) && parsed.phoneNumbers.length > 0
          ? parsed.phoneNumbers
          : Array.from(new Set(content.match(phoneRegex) || []));

        const extractedEmails = Array.isArray(parsed.emails) && parsed.emails.length > 0
          ? parsed.emails
          : Array.from(new Set(content.match(emailRegex) || []));

        const indicators = Array.isArray(parsed.indicators) ? parsed.indicators : [];
        const recommendationsList = Array.isArray(parsed.recommendations) ? parsed.recommendations : [
          isScam
            ? 'Do not click links or reply. Block sender immediately.'
            : 'Maintain standard security hygiene when reviewing digital messages.'
        ];

        const scamTypeStr = parsed.scamType || (isScam ? 'Suspected Phishing / Social Engineering' : 'Legitimate Communication');
        const explanationStr = parsed.explanation || parsed.reasoning || 'Full neural threat analysis completed.';
        const summaryStr = parsed.summary || explanationStr.substring(0, 120);

        const primaryRecommendation = recommendationsList[0] || 'Exercise standard digital safety precautions.';

        scanOutput = {
          id: `scan_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
          hash: `0x${Date.now().toString(16)}${Math.random().toString(16).substring(2, 10)}`,
          type: scanType,
          content,
          timestamp: new Date().toISOString(),
          score,
          riskScore: score,
          level: riskLevel,
          riskLevel,
          threatLevel: riskLevel === 'CRITICAL' ? 'Critical' : riskLevel === 'HIGH' ? 'High' : riskLevel === 'MEDIUM' ? 'Medium' : riskLevel === 'LOW' ? 'Low' : 'Safe',
          verdict: riskLevel === 'CRITICAL' ? 'CRITICAL' : riskLevel === 'HIGH' ? 'DANGEROUS' : riskLevel === 'MEDIUM' ? 'SUSPICIOUS' : 'SAFE',
          confidence: Number(parsed.confidence) || 98.5,
          scamType: scamTypeStr,
          scamCategory: scamTypeStr,
          summary: summaryStr,
          explanation: explanationStr,
          reasoning: explanationStr,
          indicators,
          keywords: indicators.length > 0 ? indicators : ['ANALYSIS COMPLETE'],
          redFlags: indicators,
          recommendation: primaryRecommendation,
          recommendations: recommendationsList,
          timeline: Array.isArray(parsed.timeline) ? parsed.timeline : [
            `1. Payloads received for ${scanType.toUpperCase()} inspection`,
            `2. Semantic entity and threat vector extraction completed`,
            `3. Neural safety risk score finalized: ${score}%`
          ],
          detectedUrls: extractedUrls,
          extractedUrls,
          phoneNumbers: extractedPhones,
          extractedPhoneNumbers: extractedPhones,
          emails: extractedEmails,
          extractedEmails,
          entities: Array.isArray(parsed.entities) ? parsed.entities : [],
          extractedEntities: Array.isArray(parsed.entities) ? parsed.entities : [],
          breakdown: parsed.breakdown || {
            language: isScam ? 85 : 5,
            domain: extractedUrls.length > 0 ? (isScam ? 90 : 10) : 0,
            social: isScam ? 80 : 10,
            intelligence: isScam ? 92 : 8
          },
          highlights: Array.isArray(parsed.highlights) ? parsed.highlights : [],
          phishKitDetected: score > 75,
          isScam,
          safe: !isScam,
          sender: scanType === 'sms' ? (extractedPhones[0] || '+1 (800) 555-0199') : scanType === 'email' ? (extractedEmails[0] || 'security-alert@verify-auth.com') : 'Direct Ingestion'
        };
      }
    }
  } catch (err) {
    console.warn("Gemini scanner API error, generating fallback response:", err);
  }

  if (!scanOutput) {
    const fallback = analyzeContentServer(scanType, content);
    scanOutput = {
      ...fallback,
      riskScore: fallback.score,
      riskLevel: fallback.level,
      threatLevel: fallback.level === 'CRITICAL' ? 'Critical' : fallback.level === 'HIGH' ? 'High' : fallback.level === 'MEDIUM' ? 'Medium' : fallback.level === 'LOW' ? 'Low' : 'Safe',
      verdict: fallback.level === 'CRITICAL' ? 'CRITICAL' : fallback.level === 'HIGH' ? 'DANGEROUS' : fallback.level === 'MEDIUM' ? 'SUSPICIOUS' : 'SAFE',
      scamType: fallback.score >= 60 ? 'Suspected Phishing / Social Engineering' : 'Legitimate Communication',
      summary: `${scanType.toUpperCase()} payload scan analysis completed.`,
      explanation: fallback.reasoning || 'Payload analyzed using local heuristics engine.',
      indicators: fallback.keywords || [],
      redFlags: fallback.keywords || [],
      recommendations: [fallback.recommendation || 'Maintain vigilance.'],
      timeline: [
        `1. Received ${scanType.toUpperCase()} content payload`,
        `2. Analyzed threat indicators and keyword signatures`,
        `3. Finalized safety assessment: ${fallback.score}% risk score`
      ],
      detectedUrls: fallback.extractedUrls || [],
      urls: fallback.extractedUrls || [],
      phoneNumbers: [],
      emails: [],
      entities: [],
      breakdown: {
        language: fallback.score >= 60 ? 75 : 10,
        domain: fallback.extractedUrls.length > 0 ? 80 : 0,
        social: fallback.score >= 60 ? 70 : 10,
        intelligence: fallback.score >= 60 ? 85 : 5
      },
      highlights: (fallback.keywords || []).map((k: string) => ({ word: k, severity: 'high' as const })),
      safe: fallback.level === 'SAFE'
    };
  }

  // Save to scan history store
  scanHistoryStore.unshift(scanOutput);

  // Return formatted JSON wrapping data, result, and analysis for total compatibility
  return res.json({
    success: true,
    data: scanOutput,
    result: scanOutput,
    analysis: scanOutput,
    ...scanOutput
  });
});

async function startServer() {
  if (process.env.VERCEL) {
    return;
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;


