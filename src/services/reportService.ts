import { apiClient, dedupedGet } from '../config/api';
import { ReportItem } from '../types';

const MOCK_REPORTS: ReportItem[] = [
  {
    id: 'rep_101',
    title: 'Fake IRS Tax Refund SMS Campaign',
    category: 'sms',
    description: 'SMS text claiming: "IRS Alert: You have an unclaimed tax refund of $840. Claim via irs-gov-portal.com". Phishing form captures SSN and credit card details.',
    evidenceUrl: 'https://irs-gov-portal.com',
    reportedBy: 'security_analyst_01',
    status: 'VERIFIED',
    timestamp: '2026-07-25T08:15:00Z',
    upvotes: 42
  },
  {
    id: 'rep_102',
    title: 'WhatsApp Crypto Trading Bot Scam',
    category: 'whatsapp',
    description: 'Group invite link promising 300% daily returns via fake Web3 dApp wallet drainer script.',
    evidenceUrl: 'https://whatsapp.com/channel/fake-crypto-bot',
    reportedBy: 'cryptoguard_usr',
    status: 'PENDING',
    timestamp: '2026-07-24T18:30:00Z',
    upvotes: 18
  },
  {
    id: 'rep_103',
    title: 'Spoofed Netflix Subscription Renewal Email',
    category: 'email',
    description: 'Email claiming payment declined for Netflix Premium, leading to spoofed payment gateway page.',
    evidenceUrl: 'https://netflix-account-update-sec.io',
    reportedBy: 'cyber_shield',
    status: 'UNDER INVESTIGATION',
    timestamp: '2026-07-23T12:00:00Z',
    upvotes: 65
  },
  {
    id: 'rep_104',
    title: 'Malicious Bank Account Lockdown URL',
    category: 'url',
    description: 'Fake banking portal asking users to input 2FA SMS OTP codes to verify identity.',
    evidenceUrl: 'https://chase-security-verify-88.top',
    reportedBy: 'threat_hunter_99',
    status: 'VERIFIED',
    timestamp: '2026-07-22T09:40:00Z',
    upvotes: 31
  },
  {
    id: 'rep_105',
    title: 'AI Voice Vishing Impersonating Fraud Dept',
    category: 'voice',
    description: 'Automated voice call alleging suspicious Zelle transfer of $1,250 and requesting credit card PIN confirmation.',
    evidenceUrl: '+1 (800) 555-0199',
    reportedBy: 'vishing_alert',
    status: 'UNDER INVESTIGATION',
    timestamp: '2026-07-21T14:20:00Z',
    upvotes: 27
  }
];

export const reportService = {
  async getReports(): Promise<ReportItem[]> {
    try {
      const response = await dedupedGet('/reports');
      const data = response.data as any;
      if (Array.isArray(data)) {
        return data;
      }
      if (data && Array.isArray(data.reports)) {
        return data.reports;
      }
      return MOCK_REPORTS;
    } catch {
      return MOCK_REPORTS;
    }
  },

  async submitReport(data: { title: string; category: ReportItem['category']; description: string; evidenceUrl?: string }): Promise<ReportItem> {
    try {
      const response = await apiClient.post('/reports', data);
      return response.data;
    } catch {
      return {
        id: 'rep_' + Date.now(),
        ...data,
        reportedBy: 'Current User',
        status: 'PENDING',
        timestamp: new Date().toISOString(),
        upvotes: 1
      };
    }
  },

  async upvoteReport(id: string): Promise<number> {
    try {
      const response = await apiClient.post(`/reports/${id}/upvote`);
      return response.data.upvotes;
    } catch {
      return Math.floor(Math.random() * 10) + 20;
    }
  }
};
