export type ScanType = 'sms' | 'email' | 'whatsapp' | 'url' | 'image' | 'qr' | 'voice' | 'SMS' | 'Email' | 'URL' | 'QR Text' | 'Custom Text' | 'Screenshot' | 'Voice';

export type RiskLevel = 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'SUSPICIOUS' | 'DANGEROUS' | 'CRITICAL' | 'Safe' | 'Low' | 'Medium' | 'High' | 'Critical';

export interface ScanResult {
  id: string;
  hash?: string;
  type: string;
  content: string;
  timestamp: string | number;
  score: number; // 0-100%
  riskScore?: number; // 0-100%
  level: RiskLevel;
  riskLevel?: RiskLevel;
  threatLevel?: 'Safe' | 'Low' | 'Medium' | 'High' | 'Critical';
  verdict?: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS' | 'CRITICAL';
  scamType?: string;
  scamCategory?: string;
  confidence: number;
  language?: string;
  summary?: string;
  explanation?: string;
  reasoning?: string;
  indicators?: string[];
  keywords: string[];
  redFlags?: string[];
  recommendation: string | {
    title: string;
    actions: { text: string; type: 'safe' | 'danger' | 'neutral' }[];
  };
  recommendations?: string[];
  timeline?: string[];
  detectedUrls?: string[];
  extractedUrls?: string[];
  phoneNumbers?: string[];
  extractedPhoneNumbers?: string[];
  emails?: string[];
  extractedEmails?: string[];
  entities?: string[];
  extractedEntities?: string[];
  breakdown?: {
    language: number;
    domain: number;
    social: number;
    intelligence: number;
  };
  highlights?: {
    word: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  phishKitDetected?: boolean;
  isScam?: boolean;
  safe?: boolean;
  sender?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  mfaEnabled: boolean;
  apiKey: string;
  createdAt: string;
}

export interface DashboardStats {
  totalScans: number;
  threatsNeutralized: number;
  accuracyRate: number;
  activeMonitors: number;
  riskDistribution: {
    safe: number;
    suspicious: number;
    dangerous: number;
    critical: number;
  };
  recentScans: ScanResult[];
  threatTelemetry: {
    time: string;
    scans: number;
    threats: number;
  }[];
}

export interface ReportItem {
  id: string;
  title: string;
  category: ScanType;
  description: string;
  evidenceUrl?: string;
  reportedBy: string;
  status: 'PENDING' | 'VERIFIED' | 'RESOLVED' | 'UNDER INVESTIGATION';
  timestamp: string;
  upvotes: number;
}

export interface ScamReport {
  id: string;
  type: ScanType;
  title: string;
  description: string;
  scamUrl?: string;
  senderInfo?: string;
  status: 'PENDING' | 'VERIFIED' | 'RESOLVED' | 'REJECTED';
  createdAt: string;
  reporterName?: string;
}
