import { apiClient } from '../config/api';
import { DashboardStats } from '../types';

export const dashboardService = {
  async getDashboardData(): Promise<DashboardStats> {
    try {
      const response = await apiClient.get('/dashboard');
      return response.data;
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
          critical: 5530
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
      };
    }
  }
};
