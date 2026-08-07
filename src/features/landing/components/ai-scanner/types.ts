import { ScanResult as GlobalScanResult } from '../../../../types';

export type ScanStatus = 'idle' | 'analyzing' | 'completed' | 'error';
export type ScanType = 'SMS' | 'Email' | 'WhatsApp' | 'URL' | 'Screenshot' | 'QR Code' | 'Voice' | 'QR Text' | 'Custom Text';

export interface ScanResult extends GlobalScanResult {
  id: string;
  type: any;
  content: string;
  timestamp: string | number;
  riskScore: number;
  threatLevel: 'Safe' | 'Low' | 'Medium' | 'High' | 'Critical';
  confidence: number;
  reasons: string[];
  breakdown: {
    language: number;
    domain: number;
    social: number;
    intelligence: number;
  };
  highlights: {
    word: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  recommendation: {
    title: string;
    actions: { text: string; type: 'safe' | 'danger' | 'neutral' }[];
  } | string;
}

export interface AnalysisStage {
  id: number;
  label: string;
}
