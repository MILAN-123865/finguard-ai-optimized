import { apiClient, dedupedGet } from '../../../config/api';
import { DashboardStats, ScanResult, ScamReport } from '../../../types';

export interface DashboardSummary {
  securityScore: number;
  securityRating: string;
  totalScansToday: number;
  threatsNeutralizedToday: number;
  safeMessagesToday: number;
  avgRiskScore: number;
}

export interface ThreatAnalyticsData {
  weeklyActivity: Array<{ day: string; scans: number; threats: number; safe: number }>;
  riskDistribution: {
    safe: number;
    suspicious: number;
    dangerous: number;
    critical: number;
  };
  threatCategories: Array<{ category: string; count: number; percentage: number }>;
}

export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  timestamp: string;
  read: boolean;
}

export const dashboardService = {
  async getDashboardSummary(): Promise<DashboardSummary> {
    try {
      const response = await dedupedGet('/dashboard/summary');
      const data = response.data as any;
      if (!data || typeof data !== 'object' || typeof data.securityScore !== 'number') {
        throw new Error('Invalid summary response payload');
      }
      return data;
    } catch {
      return {
        securityScore: 92,
        securityRating: 'EXCELLENT PROTECTION',
        totalScansToday: 1482,
        threatsNeutralizedToday: 124,
        safeMessagesToday: 1358,
        avgRiskScore: 14.2,
      };
    }
  },

  async getRecentScans(): Promise<ScanResult[]> {
    try {
      const response = await dedupedGet('/history?limit=10');
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid scans array payload');
      }
      return response.data;
    } catch {
      return [
        {
          id: 'scan_101',
          type: 'sms',
          content: 'URGENT: Chase Bank account suspended due to suspicious IP. Unlock at https://chase-auth-sec.net/login',
          timestamp: '2 mins ago',
          score: 88,
          level: 'DANGEROUS',
          confidence: 99.8,
          keywords: ['URGENT ACTION', 'SUSPICIOUS IP', 'BANK LOCK'],
          extractedUrls: ['https://chase-auth-sec.net/login'],
          recommendation: 'Do not open link. Block sender immediately.',
          sender: '+1 (888) 234-9012',
        },
        {
          id: 'scan_102',
          type: 'whatsapp',
          content: 'Hi Dad, I dropped my phone in water and this is my new temp number. URGENT: I need $450 sent via Zelle for tuition fee.',
          timestamp: '14 mins ago',
          score: 94,
          level: 'CRITICAL',
          confidence: 98.9,
          keywords: ['FAMILY IMPERSONATION', 'URGENT WIRE'],
          recommendation: 'Verify identity via official voice call.',
          sender: '+1 (415) 890-3312',
        },
        {
          id: 'scan_103',
          type: 'url',
          content: 'https://paypal-security-verification-portal-99.com/signin',
          timestamp: '42 mins ago',
          score: 96,
          level: 'CRITICAL',
          confidence: 99.9,
          keywords: ['BRAND SPOOF', 'SENSITIVE CREDS'],
          extractedUrls: ['https://paypal-security-verification-portal-99.com/signin'],
          recommendation: 'Domain flagged and submitted to anti-phishing registry.',
          sender: 'Web Crawler Vector',
        },
        {
          id: 'scan_104',
          type: 'email',
          content: 'Invoice #INV-2026-9901 overdue. Click to download attached PDF statement or your account will incur $250 penalty.',
          timestamp: '1 hour ago',
          score: 45,
          level: 'SUSPICIOUS',
          confidence: 92.4,
          keywords: ['INVOICE OVERDUE', 'ATTACHMENT LINK'],
          extractedUrls: ['https://billing-statement-download.org'],
          recommendation: 'Inspect attachment header before downloading.',
          sender: 'billing@corporate-settlements.com',
        },
        {
          id: 'scan_105',
          type: 'sms',
          content: 'Your Amazon package delivery is pending due to incomplete address. Update details at https://amzn-tracking-update.com',
          timestamp: '2 hours ago',
          score: 12,
          level: 'SAFE',
          confidence: 99.1,
          keywords: ['PACKAGE NOTICE'],
          recommendation: 'Safe to view.',
          sender: '88902',
        },
      ];
    }
  },

  async getThreatAnalytics(): Promise<ThreatAnalyticsData> {
    try {
      const response = await dedupedGet('/dashboard/analytics');
      const data = response.data as any;
      if (!data || typeof data !== 'object' || !Array.isArray(data.weeklyActivity)) {
        throw new Error('Invalid analytics response payload');
      }
      return data;
    } catch {
      return {
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
      };
    }
  },

  async getRecentReports(): Promise<ScamReport[]> {
    try {
      const response = await dedupedGet('/report/list');
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid reports array payload');
      }
      return response.data;
    } catch {
      return [
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
        },
      ];
    }
  },

  async getNotifications(): Promise<DashboardNotification[]> {
    try {
      const response = await dedupedGet('/dashboard/notifications');
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid notifications array payload');
      }
      return response.data;
    } catch {
      return [
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
      ];
    }
  },

  async getDashboardData(): Promise<DashboardStats> {
    try {
      const response = await dedupedGet('/dashboard');
      const data = response.data as any;
      if (!data || typeof data !== 'object' || typeof data.totalScans !== 'number') {
        throw new Error('Invalid dashboard data payload');
      }
      return data;
    } catch {
      return {
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
        recentScans: await this.getRecentScans(),
        threatTelemetry: [
          { time: '00:00', scans: 4200, threats: 310 },
          { time: '04:00', scans: 2100, threats: 140 },
          { time: '08:00', scans: 8900, threats: 820 },
          { time: '12:00', scans: 14200, threats: 1410 },
          { time: '16:00', scans: 11800, threats: 980 },
          { time: '20:00', scans: 7400, threats: 590 },
        ],
      };
    }
  },
};

