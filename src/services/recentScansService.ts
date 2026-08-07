import { ScanResult, ScanType } from '../types';

const STORAGE_KEY = 'aegis_recent_scans_v1';
const MAX_RECENT = 5;

// Initial default sample scans if localStorage is empty
const INITIAL_SAMPLES: ScanResult[] = [
  {
    id: 'rec_01',
    type: 'url',
    content: 'https://paypal-security-verification-portal-99.com/signin',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    score: 96,
    level: 'CRITICAL',
    confidence: 99.9,
    keywords: ['SPOOFED BRAND', 'SENSITIVE INPUT'],
    extractedUrls: ['https://paypal-security-verification-portal-99.com/signin'],
    phishKitDetected: true,
    recommendation: 'Domain flagged as malicious phishing host.',
    sender: 'Web Scanner'
  },
  {
    id: 'rec_02',
    type: 'sms',
    content: 'URGENT: Your Chase account is locked due to suspicious login. Verify immediately at https://chase-auth-sec.net/login',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    score: 88,
    level: 'DANGEROUS',
    confidence: 99.8,
    keywords: ['URGENT ACTION', 'BANK SECURE'],
    extractedUrls: ['https://chase-auth-sec.net/login'],
    phishKitDetected: true,
    recommendation: 'Do not click link. Report SMS to Chase fraud department.',
    sender: '+1 (888) 234-9012'
  },
  {
    id: 'rec_03',
    type: 'whatsapp',
    content: 'Hi Mom, I broke my phone and using my friend number. URGENT: I need $450 transferred to Zelle right now.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    score: 94,
    level: 'CRITICAL',
    confidence: 98.9,
    keywords: ['FAMILY IMPERSONATION', 'URGENT TRANSFER'],
    extractedUrls: [],
    phishKitDetected: false,
    recommendation: 'Contact family member directly on regular phone line.',
    sender: '+1 (415) 890-3312'
  }
];

export const recentScansService = {
  getRecentScans(): ScanResult[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Seed initial samples on first load
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLES));
        return INITIAL_SAMPLES;
      }
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.slice(0, MAX_RECENT);
      }
      return [];
    } catch (e) {
      console.warn('Failed to parse recent scans from localStorage:', e);
      return INITIAL_SAMPLES;
    }
  },

  addRecentScan(scan: ScanResult): ScanResult[] {
    try {
      const existing = this.getRecentScans();
      // Remove item with same content if it exists to avoid duplicates
      const filtered = existing.filter(
        (item) => item.content.trim().toLowerCase() !== scan.content.trim().toLowerCase()
      );
      
      const updated = [scan, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      
      // Notify listeners
      window.dispatchEvent(new Event('aegis_recent_scans_updated'));
      return updated;
    } catch (e) {
      console.warn('Failed to save scan to localStorage:', e);
      return [];
    }
  },

  removeRecentScan(id: string): ScanResult[] {
    try {
      const existing = this.getRecentScans();
      const updated = existing.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      
      window.dispatchEvent(new Event('aegis_recent_scans_updated'));
      return updated;
    } catch (e) {
      console.warn('Failed to remove scan from localStorage:', e);
      return [];
    }
  },

  clearRecentScans(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('aegis_recent_scans_updated'));
    } catch (e) {
      console.warn('Failed to clear recent scans from localStorage:', e);
    }
  }
};
